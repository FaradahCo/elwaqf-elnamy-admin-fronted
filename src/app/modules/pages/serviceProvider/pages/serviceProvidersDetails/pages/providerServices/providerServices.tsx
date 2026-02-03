import { useListHook } from "@/app/hooks/listHook";
import { useServiceFields } from "@/app/hooks/useServiceFields";
import type { CustomFilterType } from "@shared/components/custom-filter/custom-filter";
import CustomFilter from "@shared/components/custom-filter/custom-filter";
import CustomTable from "@shared/components/customTable/customtable";
import { getStatusTag } from "@shared/services/sharedService";
import { Select } from "antd";
import { useMemo } from "react";
import type {
  ServiceItem,
  ServiceProvidersListFilterQuery,
} from "../../../../serviceProviders.model";

import type { PaginatedResponse } from "@shared/model/shared.model";
import { useOutletContext } from "react-router";
import type { Provider } from "@/app/modules/pages/followRequests/model/followRequestsModel";
import { providerServicesConfigColumns } from "./providerServicesConfig";
import { useServiceStatus } from "@/app/hooks/useServiceStatus";
import { getProviderServices } from "../../../../serviceProvidersServices";

const ProviderServices = () => {
  const providerData = useOutletContext<Provider>();
  const { serviceStatus } = useServiceStatus("service");
  const { fields } = useServiceFields();

  const {
    data: services,
    isLoading,
    handleFilterChange,
    handlePaginationChange,
  } = useListHook<
    PaginatedResponse<ServiceItem>,
    ServiceProvidersListFilterQuery
  >({
    queryKey: "providerServices",
    fetchFn: (filter) =>
      getProviderServices(providerData?.profile?.at(0)?.team_id!, filter),
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
        name: "title",
        type: "input" as CustomFilterType,
        placeholder: "ابحث عن اسم الخدمة",
        label: "اسم الخدمة",
      },
      {
        type: "select" as CustomFilterType,
        placeholder: "اختر مجال",
        label: "مجال الخدمات",
        name: "field_id",
        options: transformedFields,
      },
      {
        type: "select" as CustomFilterType,
        placeholder: "اختر الحالة",
        label: "الحالة",
        name: "status",
        options: (
          <>
            {serviceStatus?.data?.map((option) => (
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
    [serviceStatus?.data, transformedFields],
  );
  return (
    <div className="pt-8 px-4 bg-white">
      <CustomFilter filters={filters} onFilterChange={handleFilterChange} />
      <CustomTable
        columns={providerServicesConfigColumns}
        dataSource={services?.data ?? []}
        showSelection={false}
        className={["mt-6 overflow-x-auto"]}
        loading={isLoading}
        paginationMeta={services?.meta}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
};

export default ProviderServices;
