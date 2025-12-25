import { Card, Progress } from "antd";

const CompletionChart = ({ percentage }: { percentage: number }) => {
  return (
    <Card className="shadow-sm border border-gray-100 rounded-xl h-full flex flex-col justify-center items-center">
        <h3 className="w-full text-right font-bold text-gray-800 mb-4">نسبة اكتمال المخرجات في المنصة</h3>
      <div className="relative flex justify-center items-center py-4">
        <Progress
          type="dashboard"
          percent={percentage}
          strokeColor="#2ECC71"
          trailColor="#F0F3F4"
          strokeWidth={10}
          width={180}
          format={(percent) => (
             <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-gray-800">{percent}%</span>
                <span className="text-xs text-gray-400">من أصل 210 مخرج</span>
             </div>
          )}
        />
      </div>
    </Card>
  );
};

export default CompletionChart;
