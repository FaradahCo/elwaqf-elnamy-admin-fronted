import CardStatistic from "@shared/components/cardStatistic/cardStatistic";
import CustomTable from "@shared/components/customTable/customtable";
import { useApiQuery } from "@shared/services/api";
import {
  getStatusTag,
  ServiceStatusEnum,
} from "@shared/services/sharedService";
import { useMemo } from "react";
import type {
  ServiceProviders,
  ServiceProvidersListFilterQuery,
} from "../../serviceProviders.model";
import {
  getSeriviceProvidersStatus,
  getServiceProviders,
} from "../../serviceProvidersServices";
import { serviceProvidersListColumns } from "./serviceProvidersListConfig";
import type { CustomFilterType } from "@shared/components/custom-filter/custom-filter";
import { useListHook } from "@/app/hooks/listHook";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { Select } from "antd";
import CustomFilter from "@shared/components/custom-filter/custom-filter";
import { useSearchParams } from "react-router";

const ServiceProvidersList = () => {
  const [searchParams] = useSearchParams();
  const { data: serviceProvidersStatus } = useApiQuery(
    ["serviceProvidersStatus"],
    () => getSeriviceProvidersStatus(),
    { retry: false }
  );

  const {
    data: serviceProvidersData,
    isLoading,
    handleFilterChange,
    handlePaginationChange,
    filter,
  } = useListHook<
    PaginatedResponse<ServiceProviders>,
    ServiceProvidersListFilterQuery
  >({
    queryKey: "getServiceProviders",
    fetchFn: getServiceProviders,
    initialFilter: {
      page: 1,
      per_page: 10,
      status: (searchParams.get("status") as ServiceStatusEnum) ?? undefined,
    },
    queryOptions: { retry: false },
  });
  const filters = useMemo(
    () => [
      {
        name: "user_name",
        type: "input" as CustomFilterType,
        placeholder: "ابحث عن مزود الخدمة",
        label: "مزود الخدمة",
      },
      {
        type: "select" as CustomFilterType,
        placeholder: "اختر مجال",
        label: "مجال الخدمات",
        name: "field",
      },
      {
        type: "select" as CustomFilterType,
        placeholder: "اختر الحالة",
        label: "الحالة",
        name: "status",
        options: (
          <>
            {serviceProvidersStatus?.data?.map((option) => (
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
        props: {
          defaultValue: filter?.status,
        },
      },
    ],
    [serviceProvidersStatus?.data, filter?.status]
  );
  return (
    <div className="py-10">
      <div className="flex gap-5 flex-wrap flex-row flex-center justify-start">
        <CardStatistic
          title="إجمالي الخدمات"
          icon="/images/elements_1.svg"
          value={serviceProvidersStatus?.total ?? 0}
          classesName={[
            "border border-second-primary p-4 rounded-xl w-64 min-w-64",
          ]}
        />
        <CardStatistic
          title="الطلبات المكتملة"
          icon="/images/elements_2.svg"
          value={
            serviceProvidersStatus?.data?.find(
              (item) => item?.status === ServiceStatusEnum.active
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
            serviceProvidersStatus?.data?.find(
              (item) => item?.status === ServiceStatusEnum.in_progress
            )?.count ?? 0
          }
          classesName={[
            "border border-blue-dark text-blue-dark rounded-lg p-4 rounded-xl bg-blue-light w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="الرصيد معلق"
          icon="/images/elements_4.svg"
          value={
            serviceProvidersStatus?.data?.find(
              (item) => item?.status === ServiceStatusEnum.review
            )?.count ?? 0
          }
          classesName={[
            "border border-orange-dark bg-orange-light text-orange-dark rounded-lg p-4 rounded-xl w-64 min-w-64",
          ]}
        />
      </div>
      <div className="bg-white shadow rounded-lg p-4 mt-5">
        <h1 className="text-lg font-semibold">قائمة مزوديّ الخدمات</h1>
        <div className="w-16 h-1 bg-primary mt-2 rounded mb-10"></div>
        <CustomFilter filters={filters} onFilterChange={handleFilterChange} />

        <CustomTable
          columns={serviceProvidersListColumns}
          dataSource={serviceProvidersData?.data ?? []}
          showSelection={false}
          className={["mt-6 overflow-x-auto"]}
          loading={isLoading}
          paginationMeta={serviceProvidersData?.meta}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default ServiceProvidersList;
