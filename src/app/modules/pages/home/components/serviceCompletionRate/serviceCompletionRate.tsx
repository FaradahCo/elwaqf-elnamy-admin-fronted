import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { DeliverablesCompletion } from "../../dashboardModel";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ServiceCompletionRate = ({
  completion_ratio,
}: {
  completion_ratio?: DeliverablesCompletion;
}) => {
  const semicircleData = {
    datasets: [
      {
        data: [
          completion_ratio?.completion_percentage,
          completion_ratio?.completion_percentage
            ? 100 - completion_ratio?.completion_percentage
            : 0,
        ],
        backgroundColor: ["#10B981", "#E5E7EB"],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const semicircleOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "80%",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 pb-2">
      <h2 className="text-xl font-medium text-gray-800 mb-12">
        نسبة اكتمال المخرجات في المنصة
      </h2>
      <div className="flex flex-col items-center justify-center relative lg:top-50">
        <div className="relative w-64 h-32 top-10 lg:-top-40">
          <Doughnut data={semicircleData} options={semicircleOptions} />
        </div>
        <div className="text-3xl font-semibold text-gray-800 relative lg:-top-50">
          <p>{completion_ratio?.completion_percentage}%</p>
          <p className="text-xs font-light text-gray-600">
            من أصل {completion_ratio?.total_deliverables} مُخرج{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCompletionRate;
