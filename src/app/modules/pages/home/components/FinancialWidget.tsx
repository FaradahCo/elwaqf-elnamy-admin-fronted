import { Card } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import type { FinancialStat } from "../home.model";

const FinancialWidget = ({ data }: { data: FinancialStat }) => {
  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <span className="text-gray-500 text-sm mb-1">{data.label}</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-800">
              {data.amount.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {data.currency}
            </span>
          </div>
        </div>
        {/* Placeholder for mini-chart/icon - using simple bars for now */}
        <div className="flex items-end gap-1 h-8">
            {data.history.map((h, i) => (
                <div key={i} style={{height: `${h}%`}} className="w-1 bg-blue-100 rounded-t-sm"></div>
            ))}
        </div>
      </div>
      
      <div className={`flex items-center text-sm ${data.isIncrease ? 'text-green-500' : 'text-red-500'}`}>
        {data.isIncrease ? <ArrowUpOutlined className="mr-1" /> : <ArrowDownOutlined className="mr-1" />}
        <span className="font-medium mx-1">%{data.changePercentage}</span>
        <span className="text-gray-400">عن الشهر السابق</span>
      </div>
    </Card>
  );
};

export default FinancialWidget;
