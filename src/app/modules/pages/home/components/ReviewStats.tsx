import { Card } from "antd";
import { LeftOutlined } from "@ant-design/icons";

const ReviewStats = ({ data }: { data: { providers: number; profiles: number; services: number; files: number } }) => {
  const items = [
    { label: "مزودي بإنتظار التفعيل", value: data.providers, bgColor: "bg-green-50" },
    { label: "تحديثات بروفايل بانتظار المراجعة", value: data.profiles, bgColor: "bg-orange-50" },
    { label: "خدمات بانتظار الاعتماد", value: data.services, bgColor: "bg-blue-50" },
    { label: "ملفات بانتظار الاعتماد", value: data.files, bgColor: "bg-gray-50" },
  ];

  return (
    <div className="col-span-12">
        <h3 className="font-bold text-gray-800 mb-4 text-lg">طلبات المراجعة والاعتماد</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item, index) => (
                <div key={index} className={`relative p-5 rounded-xl ${item.bgColor} flex flex-col justify-between h-32 hover:shadow-md transition-shadow cursor-pointer`}>
                     <div className="absolute top-4 left-4 text-gray-400">
                        <LeftOutlined style={{ fontSize: '12px' }} />
                     </div>
                     <span className="text-gray-600 font-medium">{item.label}</span>
                     <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-3xl font-bold text-gray-800">{item.value}</span>
                        <span className="text-sm text-gray-500">طلب</span>
                     </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ReviewStats;
