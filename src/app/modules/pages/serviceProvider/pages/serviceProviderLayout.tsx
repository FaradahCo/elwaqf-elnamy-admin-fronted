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
          title="إجمالي المزودين"
          icon="/images/user-group-03.svg"
          value={
            id
              ? (serviceProviderDashboard?.total_service_requests ?? 0)
              : (serviceProvidersStatus?.total ?? 0)
          }
          classesName={["border border-primary p-4 w-64 min-w-64"]}
        />
        <CardStatistic
          title="مزود نشط"
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
          title="مزود قيد المراجعة"
          icon="/images/user (1).svg"
          value={
            id
              ? (serviceProviderDashboard?.in_progress_service_requests ?? 0)
              : (serviceProvidersStatus?.data?.find(
                  (item) => item?.status === ServiceStatusEnum.in_progress,
                )?.count ?? 0)
          }
          classesName={[
            "border border-blue-dark text-blue-dark p-4 bg-blue-light w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="مزود غير مكتمل"
          icon="/images/user (2).svg"
          value={
            id
              ? (serviceProviderDashboard?.locked_balance ?? 0)
              : (serviceProvidersStatus?.data?.find(
                  (item) => item?.status === ServiceStatusEnum.review,
                )?.count ?? 0)
          }
          classesName={[
            "border border-orange-dark bg-orange-light text-orange-dark p-4 w-64 min-w-64",
          ]}
        />
      </div>
      <Outlet />
    </>
  );
};
export default ServiceProviderLayout;
