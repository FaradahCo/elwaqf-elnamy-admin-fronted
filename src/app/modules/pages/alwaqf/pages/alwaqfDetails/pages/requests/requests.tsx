import { useListHook } from "@/app/hooks/listHook";
import { useRequestsStatus } from "@/app/hooks/useRequestsStatus";
import { useServiceFields } from "@/app/hooks/useServiceFields";
import { renderOptionsWithStatusTag } from "@/app/utilites/optionsWithStatusTag/optionsWithStatusTag";
import CustomFilter, {
  type CustomFilterType,
} from "@shared/components/custom-filter/custom-filter";
import CustomTable from "@shared/components/customTable/customtable";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { useMemo } from "react";
import { useOutletContext } from "react-router";
import type {
  AlwaqfServiceQuery,
  Client,
  ServiceRequest,
} from "../../../../alwaqfModel";
import { getAlWaqfServiceRequests } from "../../../../alwaqfService";
import { requestsConfigColumns } from "./requestsConfig";

const Requests = () => {
  const clientData = useOutletContext<Client>();
  const { requestsStatus } = useRequestsStatus();
  const { fields } = useServiceFields();

  const {
    data: serviceRequests,
    isLoading,
    handleFilterChange,
    handlePaginationChange,
  } = useListHook<PaginatedResponse<ServiceRequest>, AlwaqfServiceQuery>({
    queryKey: "alwaqfServiceRequests",
    fetchFn: (filter) => getAlWaqfServiceRequests(clientData?.id, filter),
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
        placeholder: "اختر مجال الخدمات",
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
    [transformedFields, requestsStatus?.data],
  );

  return (
    <div className="pt-8 px-4 bg-white">
      <CustomFilter filters={filters} onFilterChange={handleFilterChange} />
      <CustomTable
        columns={requestsConfigColumns}
        dataSource={serviceRequests?.data ?? []}
        showSelection={false}
        className={["mt-6 overflow-x-auto"]}
        loading={isLoading}
        paginationMeta={serviceRequests?.meta}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
};
export default Requests;
