import CardStatistic from "@shared/components/cardStatistic/cardStatistic";
import { useApiQuery } from "@shared/services/api";
import {
  getFollowRequestseStatus,
  getServiceRequests,
} from "../../followRequestsService";

import { useMemo } from "react";
import type {
  FollowRequest,
  FollowRequestFilterQuery,
} from "../../model/followRequestsModel";
import {
  getStatusTag,
  ServiceStatusEnum,
} from "@shared/services/sharedService";
import CustomTable from "@shared/components/customTable/customtable";
import { followRequestsColumns } from "./followRequestsListConfig";
import { Select } from "antd";
import type { CustomFilterType } from "@shared/components/custom-filter/custom-filter";
import { type PaginatedResponse } from "@shared/model/shared.model";
import { useListHook } from "@/app/hooks/listHook";
import CustomFilter from "@shared/components/custom-filter/custom-filter";

const FollowRequestsList = () => {
  const { data: followRequestseStatus } = useApiQuery(
    ["followRequestseStatus"],
    () => getFollowRequestseStatus(),
    { retry: false }
  );

  const {
    data: serviceData,
    isLoading,
    handleFilterChange,
    handlePaginationChange,
  } = useListHook<PaginatedResponse<FollowRequest>, FollowRequestFilterQuery>({
    queryKey: "getServiceRequests",
    fetchFn: getServiceRequests,
    initialFilter: {
      page: 1,
      per_page: 10,
    },
    queryOptions: { retry: false },
  });

  const filters = useMemo(
    () => [
      {
        type: "input" as CustomFilterType,
        placeholder: "ابحث عن اسم الخدمة أو العميل...",
        label: "ابحث عن",
        name: "service.title",
      },
      {
        type: "select" as CustomFilterType,
        placeholder: "اختر الحالة",
        label: "الحالة",
        name: "status",
        options: (
          <>
            {followRequestseStatus?.data?.map((option) => (
              <Select.Option key={option?.status} value={option?.status}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: getStatusTag(option?.status ?? "")
                        ?.color,
                    }}
                  />
                  <span>{option?.label}</span>
                </div>
              </Select.Option>
            ))}
          </>
        ),
      },
    ],
    [followRequestseStatus?.data]
  );
  return (
    <div className="py-10">
      <div className="flex gap-5 flex-wrap flex-row flex-center justify-start">
        <CardStatistic
          title="إجمالي الطلبات"
          icon="/images/elements_1.svg"
          value={followRequestseStatus?.total ?? 0}
          classesName={[
            "border border-second-primary p-4 rounded-xl w-64 min-w-64",
          ]}
        />
        <CardStatistic
          title="الطلبات المكتملة"
          icon="/images/elements_2.svg"
          value={
            followRequestseStatus?.data?.find(
              (item) => item?.status === ServiceStatusEnum.completed
            )?.count ?? 0
          }
          classesName={[
            "border border-green-dark text-green-dark rounded-lg p-4 rounded-xl bg-green-light w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="جاري العمل"
          icon="/images/elements_3.svg"
          value={
            followRequestseStatus?.data?.find(
              (item) => item?.status === ServiceStatusEnum.in_progress
            )?.count ?? 0
          }
          classesName={[
            "border border-blue-dark text-blue-dark rounded-lg p-4 rounded-xl bg-blue-light w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="بانتظار عرض السعر"
          icon="/images/elements_4.svg"
          value={
            followRequestseStatus?.data?.find(
              (item) => item?.status === ServiceStatusEnum.pending
            )?.count ?? 0
          }
          classesName={[
            "border border-orange-dark bg-orange-light text-orange-dark rounded-lg p-4 rounded-xl w-64 min-w-64",
          ]}
        />
      </div>
      <div className="bg-white shadow rounded-lg p-4 mt-5">
        <h1 className="text-lg font-semibold">متابعة الطلبات</h1>
        <div className="w-16 h-1 bg-primary mt-2 rounded mb-10"></div>
        <CustomFilter filters={filters} onFilterChange={handleFilterChange} />
        <CustomTable<FollowRequest>
          columns={followRequestsColumns}
          dataSource={serviceData?.data ?? []}
          showSelection={false}
          className={["mt-6 overflow-x-auto"]}
          loading={isLoading}
          paginationMeta={serviceData?.meta}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default FollowRequestsList;
