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
import { useNavigate, useSearchParams } from "react-router";
import { serviceProviderRoutePath } from "../../serviceProvidersRoutes";

const ServiceProvidersList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: serviceProvidersStatus } = useApiQuery(
    ["serviceProvidersStatus"],
    () => getSeriviceProvidersStatus(),
    { retry: false },
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
            {serviceProvidersStatus?.data?.map((option, index) => (
              <Select.Option key={index} value={option?.status}>
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
    [serviceProvidersStatus?.data, filter?.status],
  );

  const handleRowClick = (record: ServiceProviders) => ({
    onClick: () => {
      navigate(
        serviceProviderRoutePath.SERVICE_PROVIDERS_DETAILS(record?.team_id!),
      );
    },
    className: "cursor-pointer hover:bg-gray-50",
  });

  return (
    <div className="py-10">
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
          onRow={handleRowClick}
          rowKey="user_id"
          paginationMeta={serviceProvidersData?.meta}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default ServiceProvidersList;
