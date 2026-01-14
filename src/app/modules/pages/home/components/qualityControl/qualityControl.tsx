import { Button, Spin } from "antd";
import { getQualityMonitoring } from "../../dashboardService";
import type { QualityMonitoringData } from "../../dashboardModel";
import { useApiQuery } from "@shared/services/api";

const data = [
  {
    id: "1",
    title: "طلب متأخر",
    status: "critical",
    details: "الخدمة: الدليل التنظيمي -- العميل: طارق الفراج",
  },
  {
    id: "2",
    title: "تأخر في الرد على العرض",
    status: "warning",
    details: "الخدمة: الدليل التنظيمي -- العميل: طارق الفراج",
  },
  {
    id: "3",
    title: "طلب متأخر عن المهلة",
    status: "critical",
    details: "الخدمة: الدليل التنظيمي -- العميل: طارق الفراج",
  },
];
const QualityControl = () => {
  const { data: qualityMonitoring, isLoading } =
    useApiQuery<QualityMonitoringData>(
      ["dashboardQualityMonitoring"],
      getQualityMonitoring,
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
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">مراقبة الجودة</h2>
      </div>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-3 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-700">
            الطلبات الحرجة
          </h3>
        </div>
        {qualityMonitoring?.alerts?.length === 0 ? (
          <div className="px-6 py-6 text-center text-gray-500">
            لا يوجد طلبات حرجة
          </div>
        ) : (
          <div>
            {qualityMonitoring?.alerts?.map((item, index) => (
              <div
                key={item.id}
                className={`flex flex-wrap gap-4 items-center justify-between px-6 py-5 hover:bg-blue-50 transition-colors cursor-pointer ${
                  index !== data.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <div className="text-right flex-1 mr-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`rounded-full text-xl ${
                        item.type === "danger"
                          ? "text-red-500"
                          : "text-orange-500"
                      }`}
                    >
                      ●
                    </div>
                    <span className="text-base font-semibold text-gray-800">
                      {item.message}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">{item.detail}</div>
                </div>
                <Button
                  type="default"
                  className="rounded-md! border! text-second-primary! font-medium! border-second-primary!"
                >
                  عرض الخدمة
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QualityControl;
