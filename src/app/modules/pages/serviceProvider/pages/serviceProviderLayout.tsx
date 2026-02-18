import CardStatistic from "@shared/components/cardStatistic/cardStatistic";
import { useApiQuery } from "@shared/services/api";
import {
  getProviderDashboard,
  getSeriviceProvidersStatus,
} from "../serviceProvidersServices";
import { ServiceStatusEnum } from "@shared/services/sharedService";
import { Outlet, useParams } from "react-router";

const ServiceProviderLayout = () => {
  const { id } = useParams();

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

  return (
    <>
      <div className="flex gap-5 flex-wrap flex-row flex-center justify-start">
        <CardStatistic
          title="إجمالي الخدمات"
          icon="/images/elements_1.svg"
          value={
            id
              ? serviceProviderDashboard?.total_service_requests!
              : (serviceProvidersStatus?.total ?? 0)
          }
          classesName={[
            "border border-second-primary p-4 rounded-xl w-64 min-w-64",
          ]}
        />
        <CardStatistic
          title="الطلبات المكتملة"
          icon="/images/elements_2.svg"
          value={
            id
              ? serviceProviderDashboard?.completed_service_requests!
              : (serviceProvidersStatus?.data?.find(
                  (item) => item?.status === ServiceStatusEnum.active,
                )?.count ?? 0)
          }
          classesName={[
            "border border-green-dark text-green-dark rounded-lg p-4 rounded-xl bg-green-light w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="جاري العمل"
          icon="/images/elements_3.svg"
          value={
            id
              ? serviceProviderDashboard?.in_progress_service_requests!
              : (serviceProvidersStatus?.data?.find(
                  (item) => item?.status === ServiceStatusEnum.in_progress,
                )?.count ?? 0)
          }
          classesName={[
            "border border-blue-dark text-blue-dark rounded-lg p-4 rounded-xl bg-blue-light w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="الرصيد معلق"
          icon="/images/elements_4.svg"
          value={
            id
              ? serviceProviderDashboard?.locked_balance!
              : (serviceProvidersStatus?.data?.find(
                  (item) => item?.status === ServiceStatusEnum.review,
                )?.count ?? 0)
          }
          classesName={[
            "border border-orange-dark bg-orange-light text-orange-dark rounded-lg p-4 rounded-xl w-64 min-w-64",
          ]}
        />
      </div>
      <Outlet />
    </>
  );
};
export default ServiceProviderLayout;
