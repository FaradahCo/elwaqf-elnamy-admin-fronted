import { useListHook } from "@/app/hooks/listHook";
import { useConsultationStatus } from "@/app/hooks/useConsultationStatus";
import type { Consultation } from "@/app/modules/pages/alwaqf/alwaqfModel";
import type { Provider } from "@/app/modules/pages/followRequests/model/followRequestsModel";
import { renderOptionsWithStatusTag } from "@/app/utilites/optionsWithStatusTag/optionsWithStatusTag";
import CustomFilter, {
  type CustomFilterType,
} from "@shared/components/custom-filter/custom-filter";
import CustomTable from "@shared/components/customTable/customtable";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { useMemo } from "react";
import { useOutletContext } from "react-router";
import type {
  ServiceItem,
  ServiceProvidersListFilterQuery,
} from "../../../../serviceProviders.model";
import { getProviderConsultations } from "../../../../serviceProvidersServices";
import { consultationConfigColumns } from "./consultationConfig";

const Consultation = () => {
  const providerData = useOutletContext<Provider>();
  const { consultationStatus } = useConsultationStatus();
  const teamId = providerData?.profile?.at(0)?.team_id;

  const {
    data: consultations,
    isLoading,
    handleFilterChange,
    handlePaginationChange,
  } = useListHook<
    PaginatedResponse<Consultation>,
    ServiceProvidersListFilterQuery
  >({
    queryKey: "providerConsultations",
    fetchFn: (filter) => getProviderConsultations(teamId as number, filter),
    initialFilter: {
      page: 1,
      per_page: 10,
      sort: "-created_at",
    },
    enabled: typeof teamId === "number",
    queryOptions: { retry: false },
  });

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
        placeholder: "اختر الحالة",
        label: "الحالة",
        name: "status",
        options: renderOptionsWithStatusTag(consultationStatus?.data),
      },
    ],
    [consultationStatus?.data],
  );

  const viewConsultation = (record: ServiceItem) => {
    console.log(record);
  };
  return (
    <div className="pt-8 px-4 bg-white">
      <CustomFilter filters={filters} onFilterChange={handleFilterChange} />
      <CustomTable
        columns={consultationConfigColumns(viewConsultation)}
        dataSource={consultations?.data ?? []}
        showSelection={false}
        className={["mt-6 overflow-x-auto"]}
        loading={isLoading}
        paginationMeta={consultations?.meta}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
};

export default Consultation;
