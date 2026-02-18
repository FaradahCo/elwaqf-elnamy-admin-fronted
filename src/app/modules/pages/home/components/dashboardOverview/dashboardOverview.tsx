import type { DashboardOverviewData } from "../../dashboardModel";
import Card from "../card/card";
import TopRequestedServices from "../topRequestedServices/topRequestedServices";
import ServiceCompletionRate from "../serviceCompletionRate/serviceCompletionRate";
import RecentActivitiesList from "../recentActivitiesList/recentActivitiesList";

const DashboardOverview = ({
  dashboardOverview,
}: {
  dashboardOverview?: DashboardOverviewData;
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold my-6">نظرة عامة</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-4">
        <Card
          type="overview"
          label="العملاء الجدد"
          value={`${dashboardOverview?.new_clients?.total ?? 0}`}
          text="عميل جديد"
          className="bg-white p-2 shadow-sm rounded-sm"
        >
          <div className="flex gap-1 items-center">
            <div
              className={`${
                dashboardOverview?.new_clients?.trend === "UP"
                  ? ""
                  : "rotate-180"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.75 0C11.3358 0 11 0.335786 11 0.75C11 1.16421 11.3358 1.5 11.75 1.5H14.9393L11.2197 5.21967C10.7652 5.67411 10.4707 5.96686 10.2258 6.15943C9.99433 6.34146 9.88496 6.36956 9.81729 6.37566C9.77252 6.37969 9.72748 6.37969 9.68271 6.37566C9.61504 6.36956 9.50567 6.34146 9.27419 6.15943C9.02929 5.96686 8.73477 5.67411 8.28033 5.21967L8.24965 5.18899C7.83462 4.77391 7.47686 4.41612 7.15302 4.16146C6.80782 3.89001 6.42576 3.67308 5.95186 3.63039C5.81756 3.6183 5.68244 3.6183 5.54814 3.63039C5.07424 3.67308 4.69218 3.89001 4.34698 4.16146C4.02314 4.41612 3.66537 4.77392 3.25033 5.18901L0.21967 8.21967C-0.0732233 8.51256 -0.0732233 8.98744 0.21967 9.28033C0.512563 9.57322 0.987437 9.57322 1.28033 9.28033L4.28033 6.28033C4.73477 5.82589 5.02929 5.53314 5.27419 5.34057C5.50567 5.15854 5.61504 5.13044 5.68271 5.12434C5.72748 5.12031 5.77252 5.12031 5.81729 5.12434C5.88496 5.13044 5.99433 5.15854 6.22581 5.34057C6.47071 5.53314 6.76523 5.82589 7.21967 6.28033L7.25035 6.31101L7.25036 6.31102C7.66539 6.72609 8.02315 7.08389 8.34698 7.33854C8.69218 7.60999 9.07424 7.82692 9.54814 7.86961C9.68244 7.8817 9.81756 7.8817 9.95186 7.86961C10.4258 7.82692 10.8078 7.60999 11.153 7.33854C11.4769 7.08389 11.8346 6.7261 12.2496 6.31103L12.2496 6.31102L16 2.56066V5.75C16 6.16421 16.3358 6.5 16.75 6.5C17.1642 6.5 17.5 6.16421 17.5 5.75V0.75C17.5 0.558058 17.4268 0.366116 17.2803 0.21967C17.2084 0.147762 17.1255 0.0935089 17.0371 0.0569091C16.9487 0.0202391 16.8517 0 16.75 0H11.75Z"
                  fill={`${
                    dashboardOverview?.new_clients?.trend === "UP"
                      ? "#009951ed"
                      : "#FF0000ed"
                  }`}
                />
              </svg>
            </div>
            <p
              className={`${
                dashboardOverview?.new_clients?.trend === "UP"
                  ? "text-green-600"
                  : "text-red-600"
              } font-semibold`}
            >
              %{dashboardOverview?.new_clients?.percentage_change}
            </p>
            <p className="text-gray-500">عن الشهر السابق</p>
          </div>
        </Card>
        <Card
          type="overview"
          label="الطلبات الجديدة"
          value={`${dashboardOverview?.new_requests?.total ?? 0}`}
          text="طلب جديد"
          className="bg-white p-2 shadow-sm rounded-sm"
        >
          <div className="flex gap-1 items-center">
            <div
              className={`${
                dashboardOverview?.new_requests?.trend === "UP"
                  ? ""
                  : "rotate-180"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.75 0C11.3358 0 11 0.335786 11 0.75C11 1.16421 11.3358 1.5 11.75 1.5H14.9393L11.2197 5.21967C10.7652 5.67411 10.4707 5.96686 10.2258 6.15943C9.99433 6.34146 9.88496 6.36956 9.81729 6.37566C9.77252 6.37969 9.72748 6.37969 9.68271 6.37566C9.61504 6.36956 9.50567 6.34146 9.27419 6.15943C9.02929 5.96686 8.73477 5.67411 8.28033 5.21967L8.24965 5.18899C7.83462 4.77391 7.47686 4.41612 7.15302 4.16146C6.80782 3.89001 6.42576 3.67308 5.95186 3.63039C5.81756 3.6183 5.68244 3.6183 5.54814 3.63039C5.07424 3.67308 4.69218 3.89001 4.34698 4.16146C4.02314 4.41612 3.66537 4.77392 3.25033 5.18901L0.21967 8.21967C-0.0732233 8.51256 -0.0732233 8.98744 0.21967 9.28033C0.512563 9.57322 0.987437 9.57322 1.28033 9.28033L4.28033 6.28033C4.73477 5.82589 5.02929 5.53314 5.27419 5.34057C5.50567 5.15854 5.61504 5.13044 5.68271 5.12434C5.72748 5.12031 5.77252 5.12031 5.81729 5.12434C5.88496 5.13044 5.99433 5.15854 6.22581 5.34057C6.47071 5.53314 6.76523 5.82589 7.21967 6.28033L7.25035 6.31101L7.25036 6.31102C7.66539 6.72609 8.02315 7.08389 8.34698 7.33854C8.69218 7.60999 9.07424 7.82692 9.54814 7.86961C9.68244 7.8817 9.81756 7.8817 9.95186 7.86961C10.4258 7.82692 10.8078 7.60999 11.153 7.33854C11.4769 7.08389 11.8346 6.7261 12.2496 6.31103L12.2496 6.31102L16 2.56066V5.75C16 6.16421 16.3358 6.5 16.75 6.5C17.1642 6.5 17.5 6.16421 17.5 5.75V0.75C17.5 0.558058 17.4268 0.366116 17.2803 0.21967C17.2084 0.147762 17.1255 0.0935089 17.0371 0.0569091C16.9487 0.0202391 16.8517 0 16.75 0H11.75Z"
                  fill={`${
                    dashboardOverview?.new_requests?.trend === "UP"
                      ? "#009951ed"
                      : "#FF0000ed"
                  }`}
                />
              </svg>
            </div>
            <p
              className={`${
                dashboardOverview?.new_requests?.trend === "UP"
                  ? "text-green-600"
                  : "text-red-600"
              } font-semibold`}
            >
              %{dashboardOverview?.new_requests?.percentage_change}
            </p>
            <p className="text-gray-500">عن الشهر السابق</p>
          </div>
        </Card>
        <Card
          type="overview"
          label="الطلبات الجارية"
          value={`${dashboardOverview?.in_progress_requests?.total ?? 0}`}
          text="طلب جاري"
          className="bg-white p-2 shadow-sm rounded-sm"
        >
          <div className="flex gap-1 items-center">
            <div
              className={`${
                dashboardOverview?.new_requests?.trend === "UP"
                  ? ""
                  : "rotate-180"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.75 0C11.3358 0 11 0.335786 11 0.75C11 1.16421 11.3358 1.5 11.75 1.5H14.9393L11.2197 5.21967C10.7652 5.67411 10.4707 5.96686 10.2258 6.15943C9.99433 6.34146 9.88496 6.36956 9.81729 6.37566C9.77252 6.37969 9.72748 6.37969 9.68271 6.37566C9.61504 6.36956 9.50567 6.34146 9.27419 6.15943C9.02929 5.96686 8.73477 5.67411 8.28033 5.21967L8.24965 5.18899C7.83462 4.77391 7.47686 4.41612 7.15302 4.16146C6.80782 3.89001 6.42576 3.67308 5.95186 3.63039C5.81756 3.6183 5.68244 3.6183 5.54814 3.63039C5.07424 3.67308 4.69218 3.89001 4.34698 4.16146C4.02314 4.41612 3.66537 4.77392 3.25033 5.18901L0.21967 8.21967C-0.0732233 8.51256 -0.0732233 8.98744 0.21967 9.28033C0.512563 9.57322 0.987437 9.57322 1.28033 9.28033L4.28033 6.28033C4.73477 5.82589 5.02929 5.53314 5.27419 5.34057C5.50567 5.15854 5.61504 5.13044 5.68271 5.12434C5.72748 5.12031 5.77252 5.12031 5.81729 5.12434C5.88496 5.13044 5.99433 5.15854 6.22581 5.34057C6.47071 5.53314 6.76523 5.82589 7.21967 6.28033L7.25035 6.31101L7.25036 6.31102C7.66539 6.72609 8.02315 7.08389 8.34698 7.33854C8.69218 7.60999 9.07424 7.82692 9.54814 7.86961C9.68244 7.8817 9.81756 7.8817 9.95186 7.86961C10.4258 7.82692 10.8078 7.60999 11.153 7.33854C11.4769 7.08389 11.8346 6.7261 12.2496 6.31103L12.2496 6.31102L16 2.56066V5.75C16 6.16421 16.3358 6.5 16.75 6.5C17.1642 6.5 17.5 6.16421 17.5 5.75V0.75C17.5 0.558058 17.4268 0.366116 17.2803 0.21967C17.2084 0.147762 17.1255 0.0935089 17.0371 0.0569091C16.9487 0.0202391 16.8517 0 16.75 0H11.75Z"
                  fill={`${
                    dashboardOverview?.in_progress_requests?.trend === "UP"
                      ? "#009951ed"
                      : "#FF0000ed"
                  }`}
                />
              </svg>
            </div>
            <p
              className={`${
                dashboardOverview?.in_progress_requests?.trend === "UP"
                  ? "text-green-600"
                  : "text-red-600"
              } font-semibold`}
            >
              %{dashboardOverview?.in_progress_requests?.percentage_change}
            </p>
            <p className="text-gray-500">عن الشهر السابق</p>
          </div>
        </Card>
        <Card
          type="overview"
          label="الطلبات مكتملة"
          value={`${dashboardOverview?.completed_requests?.total ?? 0}`}
          text="طلب مكتمل"
          className="bg-white p-2 shadow-sm rounded-sm"
        >
          <div className="flex gap-1 items-center">
            <div
              className={`${
                dashboardOverview?.completed_requests?.trend === "UP"
                  ? ""
                  : "rotate-180"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.75 0C11.3358 0 11 0.335786 11 0.75C11 1.16421 11.3358 1.5 11.75 1.5H14.9393L11.2197 5.21967C10.7652 5.67411 10.4707 5.96686 10.2258 6.15943C9.99433 6.34146 9.88496 6.36956 9.81729 6.37566C9.77252 6.37969 9.72748 6.37969 9.68271 6.37566C9.61504 6.36956 9.50567 6.34146 9.27419 6.15943C9.02929 5.96686 8.73477 5.67411 8.28033 5.21967L8.24965 5.18899C7.83462 4.77391 7.47686 4.41612 7.15302 4.16146C6.80782 3.89001 6.42576 3.67308 5.95186 3.63039C5.81756 3.6183 5.68244 3.6183 5.54814 3.63039C5.07424 3.67308 4.69218 3.89001 4.34698 4.16146C4.02314 4.41612 3.66537 4.77392 3.25033 5.18901L0.21967 8.21967C-0.0732233 8.51256 -0.0732233 8.98744 0.21967 9.28033C0.512563 9.57322 0.987437 9.57322 1.28033 9.28033L4.28033 6.28033C4.73477 5.82589 5.02929 5.53314 5.27419 5.34057C5.50567 5.15854 5.61504 5.13044 5.68271 5.12434C5.72748 5.12031 5.77252 5.12031 5.81729 5.12434C5.88496 5.13044 5.99433 5.15854 6.22581 5.34057C6.47071 5.53314 6.76523 5.82589 7.21967 6.28033L7.25035 6.31101L7.25036 6.31102C7.66539 6.72609 8.02315 7.08389 8.34698 7.33854C8.69218 7.60999 9.07424 7.82692 9.54814 7.86961C9.68244 7.8817 9.81756 7.8817 9.95186 7.86961C10.4258 7.82692 10.8078 7.60999 11.153 7.33854C11.4769 7.08389 11.8346 6.7261 12.2496 6.31103L12.2496 6.31102L16 2.56066V5.75C16 6.16421 16.3358 6.5 16.75 6.5C17.1642 6.5 17.5 6.16421 17.5 5.75V0.75C17.5 0.558058 17.4268 0.366116 17.2803 0.21967C17.2084 0.147762 17.1255 0.0935089 17.0371 0.0569091C16.9487 0.0202391 16.8517 0 16.75 0H11.75Z"
                  fill={`${
                    dashboardOverview?.completed_requests?.trend === "UP"
                      ? "#009951ed"
                      : "#FF0000ed"
                  }`}
                />
              </svg>
            </div>
            <p
              className={`${
                dashboardOverview?.completed_requests?.trend === "UP"
                  ? "text-green-600"
                  : "text-red-600"
              } font-semibold`}
            >
              %{dashboardOverview?.completed_requests?.percentage_change}
            </p>
            <p className="text-gray-500">عن الشهر السابق</p>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-2 gap-3 mt-6">
        <div className="flex flex-col gap-3 row-span-2">
          <TopRequestedServices
            most_requested={dashboardOverview?.top_services}
          />
          <ServiceCompletionRate
            completion_ratio={dashboardOverview?.deliverables_completion}
          />
        </div>
        <RecentActivitiesList
          latest_activities={dashboardOverview?.latest_activities}
        />
      </div>
    </div>
  );
};
export default DashboardOverview;
