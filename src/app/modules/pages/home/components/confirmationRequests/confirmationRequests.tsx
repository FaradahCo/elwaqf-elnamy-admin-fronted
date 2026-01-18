import { useMemo } from "react";
import type { PendingItems } from "../../dashboardModel";
import { useNavigate } from "react-router";

const ChevronLeftIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const GRADIENT_CLASSES = [
  "bg-gradient-to-tr from-indigo-100 from-0% to-white to-70%",
  "bg-gradient-to-tr from-orange-100 from-0% to-white to-70%",
  "bg-gradient-to-tr from-green-100 from-0% to-white to-70%",
  "bg-gradient-to-tr from-blue-100 from-0% to-white to-70%",
];
const ConfirmationRequests = ({
  reviewRequest,
}: {
  reviewRequest?: PendingItems;
}) => {
  const navigate = useNavigate();
  const stats = useMemo(
    () => [
      {
        id: 1,
        label: "مزودون بانتظار التفعيل",
        count: reviewRequest?.pending_providers?.count,
        unit: "مزود",
        path: "service-providers?status=inactive",
      },
      {
        id: 2,
        label: "تحديثات بروفايل بانتظار المراجعة",
        count: reviewRequest?.pending_providers?.count,
        unit: "مزود",
        path: "service-providers?status=review",
      },
      {
        id: 3,
        label: "خدمات بانتظار الاعتماد",
        count: reviewRequest?.pending_services?.count,
        unit: "خدمات",
        path: "service-management?type=service&status=pending",
      },
      {
        id: 4,
        label: "باقات بانتظار الاعتماد",
        count: reviewRequest?.pending_packages?.count,
        unit: "باقة",
        path: "service-management?type=package&status=pending",
      },
    ],
    [reviewRequest],
  );

  return (
    <div>
      <div className="my-6">
        <h2 className="text-lg font-semibold text-gray-900">
          طلبات المراجعة والاعتماد
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            onClick={() => navigate(stat?.path)}
            className={`rounded-lg z-10 p-4 hover:shadow-md transition-shadow cursor-pointer ${GRADIENT_CLASSES[index]}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2 leading-relaxeds">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl font-bold`}>{stat.count}</span>
                  <span className="text-sm text-gray-500">{stat.unit}</span>
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <ChevronLeftIcon />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfirmationRequests;
