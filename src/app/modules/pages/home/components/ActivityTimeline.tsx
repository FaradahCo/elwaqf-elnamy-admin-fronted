import { Card, Timeline } from "antd";
import { CheckCircleFilled, CloseCircleFilled, ClockCircleFilled, SyncOutlined } from "@ant-design/icons";
import type { ReferenceItem } from "../home.model";

// Helper to get icon based on data (mock logic)
const getIcon = (item: ReferenceItem) => {
    if (item.icon === 'check') return <CheckCircleFilled className="text-green-500 text-lg" />;
    if (item.icon === 'close') return <CloseCircleFilled className="text-red-500 text-lg" />;
    if (item.icon === 'user-add') return <div className="bg-blue-100 p-1 rounded-full"><span className="text-blue-500">👤</span></div>; // Placeholder
    return <ClockCircleFilled className="text-orange-400 text-lg" />;
};

const ActivityTimeline = ({ data }: { data: ReferenceItem[] }) => {
  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl h-full overflow-hidden">
      <h3 className="font-bold text-gray-800 mb-6">أحدث الأنشطة</h3>
      <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          <ul className="relative border-r border-gray-100 mr-3 list-none p-0">
             {data.map((item, index) => (
                 <li key={index} className="mb-6 mr-4 relative">
                     {/* Dot */}
                     <div className="absolute -right-[23px] top-1 bg-white p-1">
                        {getIcon(item)}
                     </div>
                     <div className="flex flex-col gap-1 ring-offset-2">
                         <div className="flex justify-between items-start">
                             <span className="font-bold text-gray-800 text-sm">{item.description}</span>
                             <span className="text-xs text-gray-400">{item.timestamp}</span>
                         </div>
                         <p className="text-xs text-gray-500 m-0">{item.subDescription}</p>
                     </div>
                 </li>
             ))}
          </ul>
      </div>
    </Card>
  );
};

export default ActivityTimeline;
