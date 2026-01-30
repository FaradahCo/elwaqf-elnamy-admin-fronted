import { useListHook } from "@/app/hooks/listHook";
import type { CustomFilterType } from "@shared/components/custom-filter/custom-filter";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { useMemo } from "react";
import { useParams } from "react-router";
import { getAlWaqfInvoices } from "../../../../alwaqfService";
import type { AlwaqfServiceQuery } from "../../../../alwaqfModel";
import type { Invoice } from "@/app/modules/pages/wallet/wallet.model";
import CustomFilter from "@shared/components/custom-filter/custom-filter";
import CustomTable from "@shared/components/customTable/customtable";
import { invoicesConfigColumns } from "./invoicesConfig";

const Invoices = () => {
  const { id } = useParams();

  const {
    data: invoices,
    isLoading,
    handleFilterChange,
    handlePaginationChange,
  } = useListHook<PaginatedResponse<Invoice>, AlwaqfServiceQuery>({
    queryKey: "alwaqfConsultations",
    fetchFn: (filter) => getAlWaqfInvoices(+id!, filter),
    initialFilter: {
      page: 1,
      per_page: 5,
    },
    queryOptions: { retry: false },
  });
  const filters = useMemo(
    () => [
      {
        name: "code",
        type: "input" as CustomFilterType,
        placeholder: "ابحث عن اسم الفاتورة",
        label: "الفاتورة",
      },
      {
        type: "select" as CustomFilterType,
        placeholder: "اختر المجال",
        label: "التصنيف",
        name: "payment_id",
        // options:,
      },
    ],
    [],
  );
  return (
    <div className="bg-white rounded-md px-4">
      <CustomFilter filters={filters} onFilterChange={handleFilterChange} />
      <CustomTable
        columns={invoicesConfigColumns}
        dataSource={invoices?.data ?? []}
        showSelection={false}
        className={["mt-6 overflow-x-auto"]}
        loading={isLoading}
        paginationMeta={invoices?.meta}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
};
export default Invoices;
