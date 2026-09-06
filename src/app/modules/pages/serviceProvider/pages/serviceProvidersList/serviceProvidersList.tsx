import CustomTable from "@shared/components/customTable/customtable";
import { useApiMutation, useApiQuery } from "@shared/services/api";
import { useQueryClient } from "@tanstack/react-query";
import { ServiceStatusEnum } from "@shared/services/sharedService";
import { useMemo } from "react";
import type {
  ServiceProviders,
  ServiceProvidersListFilterQuery,
  UpdateMarketplaceStatusData,
} from "../../serviceProviders.model";
import {
  getSeriviceProvidersStatus,
  getServiceProviders,
  updateMarketplaceStatus,
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
  const queryClient = useQueryClient();
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
      status: (searchParams.get("status") as ServiceStatusEnum) ?? undefined,
    },
    queryOptions: { retry: false },
  });

  const updateMarketplace = useApiMutation(
    (data: UpdateMarketplaceStatusData) => updateMarketplaceStatus(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["getServiceProviders"],
        });
      },
    },
  );

  const handleToggleChange = (
    record: ServiceProviders,
    field: "is_waqf_market" | "is_consultant",
    checked: boolean,
  ) => {
    if (!record.team_id) return;

    const item = {
      team_id: record.team_id,
      is_waqf_market:
        field === "is_waqf_market" ? checked : Boolean(record.is_waqf_market),
      is_consultant:
        field === "is_consultant" ? checked : Boolean(record.is_consultant),
    };

    updateMarketplace.mutate({
      items: [item],
    });
  };

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

  const handleProviderClick = (record: ServiceProviders) => {
    if (record?.team_id == null) return;

    navigate(
      record.status === ServiceStatusEnum.review
        ? serviceProviderRoutePath.SERVICE_PROVIDER_REVIEWS(record.team_id)
        : serviceProviderRoutePath.SERVICE_PROVIDERS_DETAILS(record.team_id),
    );
  };

  return (
    <div className="py-10">
      <div className="bg-white shadow rounded-lg p-4 mt-5">
        <h1 className="text-lg font-semibold">قائمة مزوديّ الخدمات</h1>
        <div className="w-16 h-1 bg-primary mt-2 rounded mb-10"></div>
        <CustomFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          initialValues={filter}
        />
        <CustomTable
          columns={serviceProvidersListColumns(
            handleToggleChange,
            handleProviderClick,
          )}
          dataSource={serviceProvidersData?.data ?? []}
          showSelection={false}
          className={["mt-6 overflow-x-auto"]}
          loading={isLoading}
          rowKey="user_id"
          paginationMeta={serviceProvidersData?.meta}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default ServiceProvidersList;
