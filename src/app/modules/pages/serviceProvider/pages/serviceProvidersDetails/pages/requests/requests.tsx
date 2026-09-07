import { useServiceFields } from "@/app/hooks/useServiceFields";
import type { Provider } from "@/app/modules/pages/followRequests/model/followRequestsModel";
import type { CustomFilterType } from "@shared/components/custom-filter/custom-filter";
import type { PaginatedResponse } from "@shared/model/shared.model";

import { useListHook } from "@/app/hooks/listHook";
import { useRequestsStatus } from "@/app/hooks/useRequestsStatus";
import type { ServiceRequest } from "@/app/modules/pages/alwaqf/alwaqfModel";
import { renderOptionsWithStatusTag } from "@/app/utilites/optionsWithStatusTag/optionsWithStatusTag";
import CustomFilter from "@shared/components/custom-filter/custom-filter";
import CustomTable from "@shared/components/customTable/customtable";
import { useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router";
import type {
  ServiceItem,
  ServiceProvidersListFilterQuery,
} from "../../../../serviceProviders.model";
import { getProviderRequests } from "../../../../serviceProvidersServices";
import { requestsConfigColumns } from "./requestsConfig";
import { followRequestsRoutePath } from "@/app/modules/pages/followRequests/followRequestsRoutes";

const Requests = () => {
  const providerData = useOutletContext<Provider>();
  const { requestsStatus } = useRequestsStatus();
  const { fields } = useServiceFields();
  const navigate = useNavigate();
  const teamId = providerData?.profile?.at(0)?.team_id;

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
    fetchFn: (filter) => getProviderRequests(teamId as number, filter),
    initialFilter: {
      page: 1,
      per_page: 10,
    },
    enabled: typeof teamId === "number",
    queryOptions: { retry: false },
  });

  const transformedFields = useMemo(
    () =>
      fields?.map((field) => ({
        label: field?.name ?? "",
        value: field?.id ?? "",
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
        options: renderOptionsWithStatusTag(requestsStatus?.data),
      },
    ],
    [requestsStatus?.data, transformedFields],
  );

  const viewRequest = (record: ServiceItem) => {
    if (!record.id) return;
    navigate(
      followRequestsRoutePath.FOLLOW_REQUESTS_DETAILS(record.id.toString()),
    );
  };
  return (
    <div className="pt-8 px-4 bg-white">
      <CustomFilter filters={filters} onFilterChange={handleFilterChange} />
      <CustomTable
        columns={requestsConfigColumns(viewRequest)}
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
