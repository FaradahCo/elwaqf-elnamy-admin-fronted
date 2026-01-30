import CardStatistic from "@shared/components/cardStatistic/cardStatistic";
import { useApiQuery } from "@shared/services/api";
import { Spin, Tabs } from "antd";
import { Outlet, useNavigate, useParams } from "react-router";
import type { AlwaqfDashboard, Client } from "../../alwaqfModel";
import { getAlWaqfDashboard, getAlWaqfDetails } from "../../alwaqfService";
import AlwaqfHeader from "./components/alwaqfHeader/alwaqfHeader";

const TABS_ITEMS = [
  {
    key: "profile",
    label: "الحساب الشخصي",
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
const AlwaqfDetailsLayout = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: alwaqfDashboard, isLoading } = useApiQuery<AlwaqfDashboard>(
    ["alwaqfDashboard"],
    () => getAlWaqfDashboard(+id!),
    {
      enabled: !!id,
    },
  );
  const { data: clientData, isLoading: isLoadingClient } = useApiQuery<Client>(
    ["clientData"],
    () => getAlWaqfDetails(+id!),
    {
      enabled: !!id,
    },
  );
  if (isLoading || isLoadingClient)
    return (
      <div className="flex h-1/2 items-center justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <>
      <div className="flex gap-5 flex-wrap flex-row flex-center justify-start">
        <CardStatistic
          title="إجمالي الخدمات"
          icon="/images/elements_1.svg"
          value={alwaqfDashboard?.total_service_requests!}
          classesName={[
            "border border-second-primary p-4 rounded-xl w-64 min-w-64",
          ]}
        />
        <CardStatistic
          title="الطلبات المكتملة"
          icon="/images/elements_2.svg"
          value={alwaqfDashboard?.completed_service_requests!}
          classesName={[
            "border border-green-dark text-green-dark rounded-lg p-4 rounded-xl bg-green-light w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="جاري العمل"
          icon="/images/elements_3.svg"
          value={alwaqfDashboard?.in_progress_service_requests!}
          classesName={[
            "border border-blue-dark text-blue-dark rounded-lg p-4 rounded-xl bg-blue-light w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="الرصيد معلق"
          icon="/images/elements_4.svg"
          value={alwaqfDashboard?.locked_balance!}
          classesName={[
            "border border-gray-dark bg-gray-light text-gray-dark rounded-lg p-4 rounded-xl w-64 min-w-64",
          ]}
        />
      </div>
      <AlwaqfHeader clientData={clientData} />
      <Tabs
        className="alwaqf-tabs bg-white rounded-md mt-4! px-4!"
        size="large"
        activeKey={window.location.pathname.split("/").pop()}
        items={TABS_ITEMS}
        onTabClick={(key) => navigate(key)}
      />
      <Outlet context={clientData} />
    </>
  );
};
export default AlwaqfDetailsLayout;
