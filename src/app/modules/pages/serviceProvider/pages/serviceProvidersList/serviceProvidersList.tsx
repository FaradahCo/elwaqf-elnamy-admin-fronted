import CustomTable from "@shared/components/customTable/customtable";
import { useApiQuery } from "@shared/services/api";
import { ServiceStatusEnum } from "@shared/services/sharedService";
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

import CustomFilter from "@shared/components/custom-filter/custom-filter";
import { useNavigate, useSearchParams } from "react-router";
import { serviceProviderRoutePath } from "../../serviceProvidersRoutes";
import { useServiceFields } from "@/app/hooks/useServiceFields";
import { renderOptionsWithStatusTag } from "@/app/utilites/optionsWithStatusTag/optionsWithStatusTag";

const ServiceProvidersList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: serviceProvidersStatus } = useApiQuery(
    ["serviceProvidersStatus"],
    () => getSeriviceProvidersStatus(),
    { retry: false },
  );

  const { fields } = useServiceFields();

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
        name: "field_id",
        options: fields?.map((field) => ({
          label: field?.name,
          value: field?.id,
        })),
      },
      {
        type: "select" as CustomFilterType,
        placeholder: "اختر الحالة",
        label: "الحالة",
        name: "status",
        options: renderOptionsWithStatusTag(serviceProvidersStatus?.data),
        props: {
          defaultValue: filter?.status,
        },
      },
    ],
    [serviceProvidersStatus?.data, filter?.status, fields],
  );

  const handleRowClick = (record: ServiceProviders) => ({
    onClick: () => {
      navigate(
        record?.status === ServiceStatusEnum.review
          ? serviceProviderRoutePath.SERVICE_PROVIDER_REVIEWS(record?.team_id!)
          : serviceProviderRoutePath.SERVICE_PROVIDERS_DETAILS(
              record?.team_id!,
            ),
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
