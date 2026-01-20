import { DatePicker } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import Card from "../card/card";
import type { DashboardFinancialSummary } from "../../dashboardModel";
import { useApiQuery } from "@shared/services/api";
import { getDashboardFinancialSummary } from "../../dashboardService";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ar";
dayjs.locale("ar");
const DashboardCards = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const onDateChange = (date: Dayjs) => {
    if (date) {
      setSelectedDate(date);
    }
  };
  const { data: dashboardFinancialSummary } =
    useApiQuery<DashboardFinancialSummary>(
      ["dashboardFinancialSummary", selectedDate.format("MM-YYYY")],
      () => getDashboardFinancialSummary(selectedDate),
      {
        retry: false,
      },
    );
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl">المالية</h2>
        <DatePicker
          picker="month"
          value={selectedDate}
          onChange={onDateChange}
          format="MMMM YYYY"
          suffixIcon={<ArrowDownOutlined />}
          size="large"
          className="w-32"
          allowClear={false}
        />
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Card
          type="finance"
          label="إجمالي أرباح المنصة"
          value={`${dashboardFinancialSummary?.platform_revenue?.total ?? 0}`}
          className="bg-white shadow-md"
        >
          <div className="flex gap-1 items-center">
            <p
              className={`${
                dashboardFinancialSummary?.platform_revenue?.trend === "up"
                  ? "text-green-600"
                  : "text-red-600"
              }  font-semibold`}
            >
              %{dashboardFinancialSummary?.platform_revenue?.percentage_change}
            </p>
            <p className="text-gray-500">عن الشهر السابق</p>
          </div>
        </Card>
        <Card
          type="finance"
          label="إجمالي أرباح المزودين"
          value={`${dashboardFinancialSummary?.providers_earnings?.total ?? 0}`}
          className="bg-white shadow-md"
        >
          <div className="flex gap-1 items-center">
            <p
              className={`${
                dashboardFinancialSummary?.providers_earnings?.trend === "up"
                  ? "text-green-600"
                  : "text-red-600"
              }  font-semibold`}
            >
              %
              {dashboardFinancialSummary?.providers_earnings?.percentage_change}
            </p>
            <p className="text-gray-500">عن الشهر السابق</p>
          </div>
        </Card>
        <Card
          type="finance"
          label="الرصيد المحجوز"
          value={`${dashboardFinancialSummary?.pending_balance?.total ?? 0}`}
          className="bg-white shadow-md"
        >
          <div className="flex gap-1 items-center">
            <p
              className={`${
                dashboardFinancialSummary?.pending_balance?.trend === "up"
                  ? "text-green-600"
                  : "text-red-600"
              }  font-semibold`}
            >
              %{dashboardFinancialSummary?.pending_balance?.percentage_change}
            </p>
            <p className="text-gray-500">عن الشهر السابق</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default DashboardCards;
