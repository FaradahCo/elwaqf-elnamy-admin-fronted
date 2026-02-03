import { Outlet, useNavigate, useParams } from "react-router";
import ActionHeader from "./components/actionsHeader/actionHeader";
import { useApiQuery } from "@shared/services/api";

import { Spin, Tabs } from "antd";
import { getProviderData } from "../../serviceProvidersServices";

const TABS_ITEMS = [
  {
    key: "profile",
    label: "الحساب الشخصي",
  },
  {
    key: "services",
    label: "الخدمات",
  },
  {
    key: "requests",
    label: "الطلبات",
  },
  {
    key: "consultation",
    label: "الاستشارة",
  },
  {
    key: "wallet",
    label: "المحفظة",
  },
  {
    key: "invoices",
    label: "الفواتير",
  },
  {
    key: "reviews",
    label: "المراجعات",
  },
];
const ServiceProviderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: providerData, isLoading } = useApiQuery(
    ["provider-data", Number(id)],
    () => getProviderData(Number(id)),
    {
      enabled: !!id,
      retry: false,
    },
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
            activeKey={window.location.pathname.split("/").pop()}
            items={TABS_ITEMS}
            onTabClick={(key) => navigate(key)}
          />
          <Outlet context={providerData} />
        </>
      )}
    </div>
  );
};

export default ServiceProviderDetails;
