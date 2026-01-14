import { Progress } from "antd";
import type { TopServices } from "../../dashboardModel";

const COLORS = ["#a855f7", "#f97316", "#AC7F5E", "#3b82f6"];
const TopRequestedServices = ({
  most_requested,
}: {
  most_requested?: TopServices;
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex-1">
      <h2 className="text-xl font-bold text-gray-800 mb-8">
        الخدمات الأكثر طلباً
      </h2>

      <div className="space-y-6">
        {most_requested?.map((service, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 text-sm font-medium">
                {service.title}
              </span>
              <span className="text-gray-800 font-bold">
                {service.percentage ?? 0}
                <span className="text-gray-400 text-xs font-normal mr-1">
                  /100
                </span>
              </span>
            </div>
            <Progress
              percent={service.percentage ?? 0}
              strokeColor={COLORS[index % COLORS.length]}
              showInfo={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default TopRequestedServices;
