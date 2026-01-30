import type { PaginatedResponse } from "@shared/model/shared.model";
import { useApiQuery } from "@shared/services/api";
import { useParams } from "react-router";
import type {
  AlwaqfServiceQuery,
  ServiceRequest,
} from "../../../../alwaqfModel";
import {
  getAlWaqfServiceRequests,
  getAlWaqfStatus,
} from "../../../../alwaqfService";
import CustomFilter, {
  type CustomFilterType,
} from "@shared/components/custom-filter/custom-filter";
import CustomTable from "@shared/components/customTable/customtable";
import { Select } from "antd";
import { useMemo } from "react";
import { useListHook } from "@/app/hooks/listHook";
import { getStatusTag } from "@shared/services/sharedService";
import { requestsConfigColumns } from "./requestsConfig";
const FIELDS = [
  { value: "healthcare", label: "الرعاية الصحية" },
  { value: "education", label: "التعليم" },
  { value: "technology", label: "التكنولوجيا" },
  { value: "social", label: "الخدمات الاجتماعية" },
];
const Requests = () => {
  const { id } = useParams();

  const {
    data: serviceRequests,
    isLoading,
    handleFilterChange,
    handlePaginationChange,
  } = useListHook<PaginatedResponse<ServiceRequest>, AlwaqfServiceQuery>({
    queryKey: "alwaqfServiceRequests",
    fetchFn: (filter) => getAlWaqfServiceRequests(+id!, filter),
    initialFilter: {
      page: 1,
      per_page: 5,
    },
    queryOptions: { retry: false },
  });
  const { data: alwaqfStatus } = useApiQuery(
    ["alwaqfDetailsStatus"],
    () => getAlWaqfStatus(),
    { retry: false },
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
        options: FIELDS,
      },
      {
        type: "select" as CustomFilterType,
        placeholder: "اختر الحالة",
        label: "الحالة",
        name: "status",
        options: (
          <>
            {alwaqfStatus?.data?.map((option) => (
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
    [alwaqfStatus?.data],
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
