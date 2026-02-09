import CardStatistic from "@shared/components/cardStatistic/cardStatistic";
import CustomTable from "@shared/components/customTable/customtable";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { ServiceStatusEnum } from "@shared/services/sharedService";
import { useMemo } from "react";
import {
  type ServiceData,
  type ServiceManagementQuery,
} from "../../model/serviceProviderList";
import { getServices } from "../../serviceManagementService";
import { getColumnsList } from "./serviceManagementListConfig";

import type { CustomFilterType } from "@shared/components/custom-filter/custom-filter";
import { useListHook } from "@/app/hooks/listHook";
import CustomFilter from "@shared/components/custom-filter/custom-filter";
import { useSearchParams } from "react-router";
import { useServiceStatus } from "@/app/hooks/useServiceStatus";
import { renderOptionsWithStatusTag } from "@/app/utilites/optionsWithStatusTag/optionsWithStatusTag";
const TYPE_OPTIONS = [
  { label: "الخدمات", value: "service" },
  { label: "الباقات", value: "package" },
];
const PACKAGE_TYPES = [
  { value: "healthcare", label: "الرعاية الصحية" },
  { value: "education", label: "التعليم" },
  { value: "technology", label: "التكنولوجيا" },
  { value: "social", label: "الخدمات الاجتماعية" },
];
export const ServiceManagementList = () => {
  const [searchParams] = useSearchParams();
  const {
    data: serviceData,
    isLoading,
    handleFilterChange,
    filter,
    handlePaginationChange,
  } = useListHook<PaginatedResponse<ServiceData>, ServiceManagementQuery>({
    queryKey: "admin/services",
    fetchFn: getServices,
    initialFilter: {
      type: searchParams.get("type") ?? "service",
      page: 1,
      per_page: 5,
      status: (searchParams.get("status") as ServiceStatusEnum) ?? undefined,
    },
    queryOptions: { retry: false },
  });
  const { serviceStatus } = useServiceStatus(filter?.type!);
  const filters = useMemo(
    () => [
      {
        name: "title",
        type: "input" as CustomFilterType,
        placeholder:
          filter.type === "service"
            ? "ابحث عن اسم الخدمة"
            : "ابحث عن اسم الباقة",
        label: filter.type === "service" ? "اسم الخدمة" : "اسم الباقة",
      },
      {
        type: "select" as CustomFilterType,
        placeholder:
          filter.type === "service" ? "اختر مجال الخدمات" : "اختر مجال الباقات",
        label: filter.type === "service" ? "مجال الخدمات" : "مجال الباقات",
        name: "field_id",
        options: PACKAGE_TYPES,
      },
      {
        type: "select" as CustomFilterType,
        placeholder: "اختر الحالة",
        label: "الحالة",
        name: "status",
        options: renderOptionsWithStatusTag(serviceStatus?.data),
        props: {
          defaultValue: filter?.status,
        },
      },
      {
        type: "radio" as CustomFilterType,
        name: "type",
        label: "",
        placeholder: "",
        options: TYPE_OPTIONS,
        props: {
          defaultValue: filter?.type,
          buttonStyle: "solid",
          optionType: "button",
        },
      },
    ],
    [serviceStatus?.data, filter?.type, filter?.status],
  );
  return (
    <div className="py-10">
      <div className="flex gap-5 flex-wrap flex-row flex-center justify-between">
        <CardStatistic
          title="خدمة"
          icon="/images/elements.svg"
          value={serviceData?.meta?.total ?? 0}
          classesName={[
            "border border-second-primary p-4 rounded-xl w-64 min-w-64",
          ]}
        />
        <CardStatistic
          title="نشطة"
          icon="/images/elements.svg"
          value={
            serviceStatus?.data?.find((status) => status.status === "approved")
              ?.count ?? 0
          }
          classesName={[
            "border border-green-dark text-green-dark rounded-lg p-4 rounded-xl bg-green-light w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="بانتظار الاعتماد"
          icon="/images/elements.svg"
          value={
            serviceStatus?.data?.find(
              (status) => status.status === "revision_pending",
            )?.count ?? 0
          }
          classesName={[
            "border border-orange-dark bg-orange-light text-orange-dark rounded-lg p-4 rounded-xl w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="معلّقة"
          icon="/images/elements.svg"
          value={
            serviceStatus?.data?.find((status) => status.status === "inactive")
              ?.count ?? 0
          }
          classesName={[
            "border border-gray-dark bg-gray-light text-gray-dark rounded-lg p-4 rounded-xl w-64 min-w-64",
          ]}
        />
      </div>
      <div className="bg-white shadow rounded-lg p-4 mt-5">
        <h1 className="text-lg font-semibold">إدارة الخدمات</h1>
        <div className="w-16 h-1 bg-primary mt-2 rounded mb-10"></div>
        <CustomFilter filters={filters} onFilterChange={handleFilterChange} />

        <CustomTable<ServiceData>
          columns={getColumnsList(filter?.type ?? "service")}
          dataSource={serviceData?.data ?? []}
          showSelection={true}
          className={["mt-6"]}
          loading={isLoading}
          paginationMeta={serviceData?.meta}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default ServiceManagementList;
