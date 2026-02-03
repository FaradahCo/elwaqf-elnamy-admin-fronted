import { useServiceFields } from "@/app/hooks/useServiceFields";
import type { Provider } from "@/app/modules/pages/followRequests/model/followRequestsModel";
import type { CustomFilterType } from "@shared/components/custom-filter/custom-filter";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { getStatusTag } from "@shared/services/sharedService";
import { Select } from "antd";
import { useMemo } from "react";
import { useOutletContext } from "react-router";
import type { ServiceProvidersListFilterQuery } from "../../../../serviceProviders.model";
import type { ServiceRequest } from "@/app/modules/pages/alwaqf/alwaqfModel";
import { useListHook } from "@/app/hooks/listHook";
import { getProviderRequests } from "../../../../serviceProvidersServices";
import CustomTable from "@shared/components/customTable/customtable";
import CustomFilter from "@shared/components/custom-filter/custom-filter";
import { requestsConfigColumns } from "./requestsConfig";
import { useRequestsStatus } from "@/app/hooks/useRequestsStatus";

const Requests = () => {
  const providerData = useOutletContext<Provider>();
  const { requestsStatus } = useRequestsStatus();
  const { fields } = useServiceFields();

  const {
    data: requests,
    isLoading,
    handleFilterChange,
    handlePaginationChange,
  } = useListHook<
    PaginatedResponse<ServiceRequest>,
    ServiceProvidersListFilterQuery
  >({
    queryKey: "providerRequests",
    fetchFn: (filter) =>
      getProviderRequests(providerData?.profile?.at(0)?.team_id!, filter),
    initialFilter: {
      page: 1,
      per_page: 5,
    },
    queryOptions: { retry: false },
  });

  const transformedFields = useMemo(
    () =>
      fields?.map((field) => ({
        label: field?.name,
        value: field?.id,
      })),
    [fields],
  );
  const filters = useMemo(
    () => [
      {
        name: "service.title",
        type: "input" as CustomFilterType,
        placeholder: "ابحث عن اسم الخدمة",
        label: "اسم الخدمة",
      },
      {
        type: "select" as CustomFilterType,
        placeholder: "اختر مجال",
        label: "مجال الخدمات",
        name: "service.field_id",
        options: transformedFields,
      },
      {
        type: "select" as CustomFilterType,
        placeholder: "اختر الحالة",
        label: "الحالة",
        name: "status",
        options: (
          <>
            {requestsStatus?.data?.map((option) => (
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
    [requestsStatus?.data, transformedFields],
  );
  return (
    <div className="pt-8 px-4 bg-white">
      <CustomFilter filters={filters} onFilterChange={handleFilterChange} />
      <CustomTable
        columns={requestsConfigColumns}
        dataSource={requests?.data ?? []}
        showSelection={false}
        className={["mt-6 overflow-x-auto"]}
        loading={isLoading}
        paginationMeta={requests?.meta}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
};

export default Requests;
