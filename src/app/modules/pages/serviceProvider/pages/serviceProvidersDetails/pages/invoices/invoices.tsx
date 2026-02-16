import { useListHook } from "@/app/hooks/listHook";
import type { Invoice } from "@/app/modules/pages/alwaqf/alwaqfModel";
import type { CustomFilterType } from "@shared/components/custom-filter/custom-filter";
import CustomFilter from "@shared/components/custom-filter/custom-filter";
import type { PaginatedResponse } from "@shared/model/shared.model";

import { useMemo } from "react";
import type { ServiceProvidersListFilterQuery } from "../../../../serviceProviders.model";
import { getProviderInvoices } from "../../../../serviceProvidersServices";
import type { Provider } from "@/app/modules/pages/followRequests/model/followRequestsModel";
import { useOutletContext } from "react-router";
import CustomTable from "@shared/components/customTable/customtable";

import { invoicesConfigColumns } from "./invoicesConfig";
const Invoices = () => {
  const providerData = useOutletContext<Provider>();
  const {
    data: consultations,
    isLoading,
    handleFilterChange,
    handlePaginationChange,
  } = useListHook<PaginatedResponse<Invoice>, ServiceProvidersListFilterQuery>({
    queryKey: "providerInvoices",
    fetchFn: (filter) =>
      getProviderInvoices(providerData?.profile?.at(0)?.team_id!, filter),
    initialFilter: {
      page: 1,
      per_page: 10,
    },
    queryOptions: { retry: false },
  });
  const filters = useMemo(
    () => [
      {
        name: "service.title",
        type: "input" as CustomFilterType,
        placeholder: "ابحث عن اسم الفاتورة",
        label: "الفاتورة",
      },
    ],
    [],
  );
  return (
    <div className="pt-8 px-4 bg-white">
      <CustomFilter filters={filters} onFilterChange={handleFilterChange} />
      <CustomTable
        columns={invoicesConfigColumns}
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
export default Invoices;
