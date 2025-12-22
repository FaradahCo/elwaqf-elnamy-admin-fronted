import { Card } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import type { OverviewStat } from "../home.model";

const OverviewWidget = ({ data }: { data: OverviewStat }) => {
  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl h-full">
      <h3 className="text-gray-600 font-medium mb-4">{data.label}</h3>
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
            <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-gray-800">{data.value}</span>
                <span className="text-xs text-gray-500">{data.subLabel}</span>
            </div>
            <div className={`flex items-center text-xs ${data.isIncrease ? 'text-green-500' : 'text-red-500'}`}>
                {data.isIncrease ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                <span className="mx-1">%{data.changePercentage}</span>
                <span className="text-gray-400">عن الشهر السابق</span>
            </div>
        </div>
      </div>
    </Card>
  );
};

export default OverviewWidget;
