import CardStatistic from "@shared/components/cardStatistic/cardStatistic";
import { useApiQuery } from "@shared/services/api";
import {
  getProviderDashboard,
  getSeriviceProvidersStatus,
} from "../serviceProvidersServices";
import { ServiceStatusEnum } from "@shared/services/sharedService";
import { Outlet, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { setActiveTab } from "@/app/store/slices/serviceProviderDetailsTab";
import { useEffect, useMemo } from "react";

const ServiceProviderLayout = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const activeTab = useSelector(
    (state: RootState) => state.serviceProviderDetailsTab.activeTab,
  );

  //STATISTICS FOR ALL SERVICE PROVIDERS
  const { data: serviceProvidersStatus } = useApiQuery(
    ["serviceProvidersStatus"],
    () => getSeriviceProvidersStatus(),
    { retry: false, enabled: !id },
  );

  //STATISTICS FOR SPECIFIC SERVICE PROVIDER
  const { data: serviceProviderDashboard } = useApiQuery(
    ["providerDashboard", Number(id)],
    () => getProviderDashboard(Number(id)),
    { retry: false, enabled: !!id },
  );

  useEffect(() => {
    if (!id) {
      dispatch(setActiveTab(null));
    }
  }, [id, dispatch]);

  const firstCardTitle = useMemo(() => {
    if (!id) return "إجمالي المزودين";
    if (activeTab === 3) return "إجمالي الاستشارات";
    if (activeTab === 0 || activeTab === 1 || activeTab === 2) {
      return "إجمالي الطلبات";
    }
    return "إجمالي المزودين";
  }, [id, activeTab]);

  const secondCardTitle = useMemo(() => {
    if (!id) return "مزود نشط";
    if (activeTab === 3) return "تم ارسال العروض";
    if (activeTab === 0 || activeTab === 1 || activeTab === 2) {
      return "الطلبات المكتملة";
    }
    return "مزود نشط";
  }, [id, activeTab]);

  const thirdCardTitle = useMemo(() => {
    if (!id) return "مزود قيد المراجعة";
    if (activeTab === 3) return "بانتظار تحديد وقت الاجتماع";
    if (activeTab === 0 || activeTab === 1 || activeTab === 2) {
      return "جاري العمل";
    }
    return "مزود قيد المراجعة";
  }, [id, activeTab]);

  const fourthCardTitle = useMemo(() => {
    if (!id) return "مزود غير مكتمل";
    if (activeTab === 3) return "بانتظار عرض السعر";
    if (activeTab === 0 || activeTab === 1 || activeTab === 2) {
      return "بانتظار ارسال العروض";
    }
    return "مزود غير مكتمل";
  }, [id, activeTab]);

  return (
    <>
      <div className="flex gap-5 flex-wrap flex-row flex-center justify-start">
        <CardStatistic
          title={firstCardTitle}
          icon="/images/user-group-03.svg"
          value={
            id
              ? (serviceProviderDashboard?.total_service_requests ?? 0)
              : (serviceProvidersStatus?.total ?? 0)
          }
          classesName={["border border-primary p-4 w-64 min-w-64"]}
        />
        <CardStatistic
          title={secondCardTitle}
          icon="/images/user.svg"
          value={
            id
              ? (serviceProviderDashboard?.completed_service_requests ?? 0)
              : (serviceProvidersStatus?.data?.find(
                  (item) => item?.status === ServiceStatusEnum.active,
                )?.count ?? 0)
          }
          classesName={[
            "border border-green-dark text-green-dark p-4 bg-green-light w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title={thirdCardTitle}
          icon="/images/user (1).svg"
          value={
            id
              ? (serviceProviderDashboard?.in_progress_service_requests ?? 0)
              : (serviceProvidersStatus?.data?.find(
                  (item) => item?.status === ServiceStatusEnum.in_progress,
                )?.count ?? 0)
          }
          classesName={[
            `border ${id ? "border-blue-dark text-blue-dark p-4 bg-blue-light" : " border-orange-dark bg-orange-light text-orange-dark "} w-64 min-w-64`,
          ]}
        />

        <CardStatistic
          title={fourthCardTitle}
          icon="/images/user (2).svg"
          value={
            id
              ? (serviceProviderDashboard?.locked_balance ?? 0)
              : (serviceProvidersStatus?.data?.find(
                  (item) => item?.status === ServiceStatusEnum.review,
                )?.count ?? 0)
          }
          classesName={[
            `border ${id ? "border-orange-dark text-orange-dark p-4 bg-orange-light" : " border-gray-dark bg-gray-light text-gray-dark "} w-64 min-w-64`,
          ]}
        />
      </div>
      <Outlet />
    </>
  );
};
export default ServiceProviderLayout;
