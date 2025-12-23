import { useParams } from "react-router";
import { useApiQuery } from "@shared/services/api";
import { getServiceProviderDashboard } from "../../../serviceProvidersServices";
import CardStatistic from "@shared/components/cardStatistic/cardStatistic";
import { Spin } from "antd";

const ProviderDashboardTab = () => {
  const { id } = useParams<{ id: string }>();
  const { data: stats, isLoading } = useApiQuery(
    ["getServiceProviderDashboard", id],
    () => getServiceProviderDashboard(id!),
    { enabled: !!id }
  );

  if (isLoading) return <Spin />;

  return (
    <div className="flex gap-5 flex-wrap flex-row flex-center justify-start mt-6">
      <CardStatistic
        title="إجمالي الطلبات"
        icon="/images/elements_1.svg"
        value={stats?.total_service_requests ?? 0}
        classesName={["border border-second-primary p-4 rounded-xl w-64 min-w-64"]}
      />
      <CardStatistic
        title="الطلبات المكتملة"
        icon="/images/elements_2.svg"
        value={stats?.completed_service_requests ?? 0}
        classesName={[
          "border border-green-dark text-green-dark rounded-lg p-4 rounded-xl bg-green-light w-64 min-w-64",
        ]}
      />
      <CardStatistic
        title="جاري العمل"
        icon="/images/elements_3.svg"
        value={stats?.in_progress_service_requests ?? 0}
        classesName={[
          "border border-blue-dark text-blue-dark rounded-lg p-4 rounded-xl bg-blue-light w-64 min-w-64",
        ]}
      />
      <CardStatistic
        title="الرصيد المعلق"
        icon="/images/elements_4.svg"
        value={stats?.locked_balance ?? 0}
        classesName={[
          "border border-orange-dark bg-orange-light text-orange-dark rounded-lg p-4 rounded-xl w-64 min-w-64",
        ]}
      />
    </div>
  );
};
export default ProviderDashboardTab;
