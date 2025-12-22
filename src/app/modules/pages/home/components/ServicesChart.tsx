import { Card, Progress } from "antd";
import type { ServiceRequestStat } from "../home.model";

const ServicesChart = ({ data }: { data: ServiceRequestStat[] }) => {
  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800">الخدمات الأكثر طلباً</h3>
        <span className="text-gray-400 text-sm">...</span>
      </div>
      
      <div className="flex flex-col gap-6">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="font-medium text-gray-700">{item.label}</span>
              <div className="flex items-center gap-1">
                 <span className="font-bold text-gray-800">{item.value}</span>
                 <span className="text-xs text-gray-400">طلب</span>
              </div>
             
            </div>
            <Progress 
                percent={item.percentage} 
                showInfo={false} 
                strokeColor={item.color} 
                trailColor="#F5F5F5"
                size="small"
                className="m-0 line-height-1"
            />
             <span className="text-xs text-right mt-1 text-gray-400 self-end">من الإجمالي</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ServicesChart;
