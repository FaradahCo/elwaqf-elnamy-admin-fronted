import { Card } from "antd";

const GeneralStats = ({ data }: { data: any }) => {
  const stats = [
    { label: "عدد الأوقاف", value: data.waqfs, suffix: "وقف", icon: "🏛️" },
    { label: "عدد المزودين", value: data.bidders, suffix: "مزود خدمة", icon: "👥" },
    { label: "عدد المستشارين", value: data.consultants, suffix: "مستشار", icon: "👨‍🏫" },
    { label: "عدد الخدمات", value: data.services, suffix: "خدمة", icon: "📦" },
    { label: "عدد الباقات", value: data.stats, suffix: "باقة", icon: "📊" },
  ];

  return (
    <div className="col-span-12">
         <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-lg">إحصاءات عامة</h3>
             {/* Date Dropdown Placeholder */}
             <div className="border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-500 cursor-pointer">ديسمبر 2024</div>
         </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((item, index) => (
             <Card key={index} className="shadow-sm border-0 bg-white text-center rounded-xl hover:shadow-md transition">
                 <div className="flex flex-col items-center gap-2">
                     <span className="text-2xl mb-1">{item.icon}</span>
                     <span className="text-gray-500 font-medium">{item.label}</span>
                     <div className="flex items-center gap-1">
                        <span className="text-xl font-bold text-gray-800">{item.value}</span>
                        <span className="text-xs text-gray-400">{item.suffix}</span>
                     </div>
                 </div>
             </Card>
        ))}
      </div>
    </div>
  );
};

export default GeneralStats;
