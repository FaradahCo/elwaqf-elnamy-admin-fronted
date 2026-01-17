import type { LatestActivities } from "../../dashboardModel";
const RecentActivitiesList = ({
  latest_activities,
}: {
  latest_activities?: LatestActivities;
}) => {
  return (
    <div className="row-span-2 bg-white rounded-2xl border border-gray-200">
      <div className="px-3 py-2 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">أحدث الأنشطة</h2>
      </div>

      <div className="divide-y divide-gray-100">
        {latest_activities?.slice(0, 7)?.map((activity) => (
          <div
            key={activity.id}
            className="px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-3">
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center`}
              >
                <img src={activity?.icon} alt="ملصق نشاط" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  {activity.description}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {activity.subject_type}: {activity.actor_type} -
                  {activity.actor_name}
                </p>
              </div>
              <div className="flex-shrink-0 text-xs text-gray-400 mt-0.5">
                {activity.created_at}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivitiesList;
