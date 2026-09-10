import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import ActionHeader from "./components/actionsHeader/actionHeader";
import { useApiQuery } from "@shared/services/api";

import { Spin, Tabs } from "antd";
import { getProviderData } from "../../serviceProvidersServices";
import { useCallback, useEffect } from "react";
import { setActiveTab } from "@/app/store/slices/serviceProviderDetailsTab";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";

const TABS_ITEMS = [
  {
    key: "0",
    path: "profile",
    label: "الحساب الشخصي",
  },
  {
    key: "1",
    path: "services",
    label: "الخدمات",
  },
  {
    key: "2",
    path: "requests",
    label: "الطلبات",
  },
  {
    key: "3",
    path: "consultation",
    label: "الاستشارة",
  },
  {
    key: "4",
    path: "wallet",
    label: "المحفظة",
  },
  {
    key: "5",
    path: "invoices",
    label: "الفواتير",
  },
  {
    key: "6",
    path: "reviews",
    label: "المراجعات",
  },
];

const ServiceProviderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = useSelector(
    (state: RootState) => state.serviceProviderDetailsTab.activeTab,
  );
  const { data: providerData, isLoading } = useApiQuery(
    ["provider-data", Number(id)],
    () => getProviderData(Number(id)),
    {
      enabled: !!id,
      retry: false,
    },
  );

  useEffect(() => {
    const matchedTab = TABS_ITEMS.find((item) =>
      location.pathname.endsWith(`/${item.path}`),
    );
    dispatch(setActiveTab(matchedTab ? Number(matchedTab.key) : 0));
  }, [location.pathname, dispatch]);

  const onClickTab = useCallback(
    (key: string) => {
      const tab = TABS_ITEMS.find((item) => item.key === key);
      if (!tab) return;

      dispatch(setActiveTab(Number(tab.key)));
      navigate(tab.path);
    },
    [dispatch, navigate],
  );

  return (
    <div>
      {isLoading ? (
        <div className="flex item-center justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <ActionHeader providerData={providerData!} />
          <Tabs
            className="custom-tabs bg-white rounded-md mt-4! px-4!"
            size="large"
            activeKey={String(activeTab ?? 0)}
            items={TABS_ITEMS}
            onTabClick={onClickTab}
          />
          <Outlet context={providerData} />
        </>
      )}
    </div>
  );
};

export default ServiceProviderDetails;
