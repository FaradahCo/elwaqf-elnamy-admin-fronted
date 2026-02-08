import { useListHook } from "@/app/hooks/listHook";
import CustomFilter, {
  type CustomFilterType,
} from "@shared/components/custom-filter/custom-filter";
import CustomTable from "@shared/components/customTable/customtable";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { useMemo } from "react";
import { getProviderConsultations } from "../../../../serviceProvidersServices";
import type { ServiceProvidersListFilterQuery } from "../../../../serviceProviders.model";
import type { Provider } from "@/app/modules/pages/followRequests/model/followRequestsModel";
import { useOutletContext } from "react-router";
import type { Consultation } from "@/app/modules/pages/alwaqf/alwaqfModel";
import { consultationConfigColumns } from "./consultationConfig";
import { useConsultationStatus } from "@/app/hooks/useConsultationStatus";

const Consultation = () => {
  const providerData = useOutletContext<Provider>();
  const { consultationStatus } = useConsultationStatus();
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
    fetchFn: (filter) =>
      getProviderConsultations(providerData?.profile?.at(0)?.team_id!, filter),
    initialFilter: {
      page: 1,
      per_page: 5,
    },
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
        options: consultationStatus?.map((status) => ({
          value: status.status,
          label: status.label,
        })),
      },
    ],
    [consultationStatus],
  );
  return (
    <div className="pt-8 px-4 bg-white">
      <CustomFilter filters={filters} onFilterChange={handleFilterChange} />
      <CustomTable
        columns={consultationConfigColumns}
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
