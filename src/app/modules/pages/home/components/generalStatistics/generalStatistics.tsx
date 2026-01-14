import { useApiQuery } from "@shared/services/api";
import { DatePicker, Spin } from "antd";
import { getGeneralStatistics } from "../../dashboardService";
import type { GeneralStatisticsData } from "../../dashboardModel";
import { ArrowDownOutlined } from "@ant-design/icons";

const GeneralStatistics = () => {
  const { data: generalStatistics, isLoading } =
    useApiQuery<GeneralStatisticsData>(
      ["dashboardGeneralStatistics"],
      getGeneralStatistics,
      {
        retry: false,
      }
    );

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }
  const stats = [
    {
      id: 1,
      label: "عدد الأوقاف",
      count: generalStatistics?.total_clients,
      unit: "وقف",
      icon: <img src="/images/namilogo.png" alt="شعار الوقف النامي" />,
    },
    {
      id: 2,
      label: "عدد المزودين",
      count: generalStatistics?.total_active_providers,
      unit: "مزود خدمة",
      icon: <img src="/images/namilogo.png" alt="شعار الوقف النامي" />,
    },
    {
      id: 3,
      label: "عدد المستشارين",
      count: generalStatistics?.total_consultations,
      unit: "مستشار",
      icon: <img src="/images/namilogo.png" alt="شعار الوقف النامي" />,
    },
    {
      id: 4,
      label: "عدد الخدمات",
      count: generalStatistics?.total_services,
      unit: "خدمة",
      icon: <img src="/images/namilogo.png" alt="شعار الوقف النامي" />,
    },
    {
      id: 5,
      label: "عدد الباقات",
      count: generalStatistics?.total_packages,
      unit: "باقة",
      icon: <img src="/images/namilogo.png" alt="شعار الوقف النامي" />,
    },
  ];

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">إحصائيات عامة</h2>
        <DatePicker
          picker="date"
          // value={selectedDate}
          // onChange={onDateChange}
          format="MM-YYYY"
          suffixIcon={<ArrowDownOutlined />}
          size="large"
          className="w-48"
          allowClear={false}
        />
      </div>

      <div className="grid grid-cols-5 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col p-2 rounded-2xl bg-white">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mb-3">
              {stat.icon}
            </div>

            <p className="text-xl text-gray-600 mb-2">{stat.label}</p>

            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">
                {stat.count}
              </span>
              <span className="text-base text-gray-500">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralStatistics;
