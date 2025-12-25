import { Card, Tag } from "antd";
import type { QualityIssueItem } from "../home.model";

const QualityMonitoring = ({ data }: { data: QualityIssueItem[] }) => {
  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl h-full">
      <h3 className="font-bold text-gray-800 mb-6">مراقبة الجودة</h3>
      <div className="mb-4">
          <h4 className="text-gray-500 text-sm mb-3">الطلبات الحرجة</h4>
          <div className="flex flex-col gap-4">
              {data.map((item, index) => (
                  <div key={index} className="flex flex-col gap-1 border-b border-gray-50 last:border-0 pb-2 last:pb-0">
                      <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                           <span className="font-bold text-gray-700 text-sm">{item.label}</span>
                      </div>
                      <p className="text-xs text-gray-400 mr-3.5 m-0">{item.description}</p>
                  </div>
              ))}
          </div>
      </div>
    </Card>
  );
};

export default QualityMonitoring;
