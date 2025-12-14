import CardStatistic from "@shared/components/cardStatistic/cardStatistic";
import { useApiQuery } from "@shared/services/api";
import { getServiceRequests } from "../../followRequestsService";

import { useState, useCallback } from "react";
import type {
  FollowRequest,
  FollowRequestFilterQuery,
} from "../../model/followRequestsModel";
import {
  getSeriviceStatus,
  ServiceStatusEnum,
} from "@shared/services/sharedService";
import FollowRequestListFilter from "../../components/followRequestsFilter/followRequestListFilter";
import CustomTable from "@shared/components/customTable/customtable";
import { followRequestsColumns } from "./followRequestsListConfig";

const FollowRequestsList = () => {
  // const navigate = useNavigate();
  const [filter, setFilter] = useState<FollowRequestFilterQuery | null>({
    page: 1,
    per_page: 10,
  });

  const { data: serviceStatus } = useApiQuery(
    ["serviceStatus"],
    () => getSeriviceStatus(),
    { retry: false }
  );

  const handleFilterChange = useCallback(
    (filterValues: FollowRequestFilterQuery) => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        ...filterValues,
      }));
    },
    []
  );

  const handlePaginationChange = useCallback((page: number, size: number) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: page,
      per_page: size,
    }));
  }, []);

  const { data: serviceData, isLoading } = useApiQuery(
    ["getServiceRequests", filter],
    () => {
      return getServiceRequests(filter!);
    },
    { retry: false, enabled: !!filter }
  );

  return (
    <div className="py-10">
      <div className="flex gap-5 flex-wrap flex-row flex-center justify-start">
        <CardStatistic
          title="إجمالي الطلبات"
          icon="/images/elements_1.svg"
          value={serviceData?.meta?.total ?? 0}
          classesName={[
            "border border-second-primary p-4 rounded-xl w-64 min-w-64",
          ]}
        />
        <CardStatistic
          title="الطلبات المكتملة"
          icon="/images/elements_2.svg"
          value={
            serviceData?.data?.filter(
              (item) => item.status === ServiceStatusEnum.completed
            ).length ?? 0
          }
          classesName={[
            "border border-green-dark text-green-dark rounded-lg p-4 rounded-xl bg-green-light w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="جاري العمل"
          icon="/images/elements_3.svg"
          value={
            serviceData?.data?.filter(
              (item) => item.status === ServiceStatusEnum.in_progress
            ).length ?? 0
          }
          classesName={[
            "border border-blue-dark text-blue-dark rounded-lg p-4 rounded-xl bg-blue-light w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="بانتظار عرض السعر"
          icon="/images/elements_4.svg"
          value={
            serviceData?.data?.filter(
              (item) => item.status === ServiceStatusEnum.pending
            ).length ?? 0
          }
          classesName={[
            "border border-orange-dark bg-orange-light text-orange-dark rounded-lg p-4 rounded-xl w-64 min-w-64",
          ]}
        />
      </div>
      <div className="bg-white shadow rounded-lg p-4 mt-5">
        <h1 className="text-lg font-semibold">متابعة الطلبات</h1>
        <div className="w-16 h-1 bg-primary mt-2 rounded mb-10"></div>
        <FollowRequestListFilter
          onFilterChange={handleFilterChange}
          serviceStatus={serviceStatus?.data ?? []}
        />

        <CustomTable<FollowRequest>
          columns={followRequestsColumns}
          dataSource={serviceData?.data ?? []}
          showSelection={false}
          className={["mt-6 overflow-x-auto"]}
          loading={isLoading}
          paginationMeta={serviceData?.meta}
          onPaginationChange={handlePaginationChange}
          // onRow={(record) => ({
          //   onClick: () => navigate(`/provider/follow-requests/${record.id}`),
          //   className: "cursor-pointer hover:bg-gray-50",
          // })}
        />
      </div>
    </div>
  );
};

export default FollowRequestsList;
