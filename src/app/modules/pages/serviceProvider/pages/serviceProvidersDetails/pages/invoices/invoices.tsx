import type { CustomFilterType } from "@shared/components/custom-filter/custom-filter";
import CustomFilter from "@shared/components/custom-filter/custom-filter";

import { useMemo } from "react";
const Invoices = () => {
  const filters = useMemo(
    () => [
      {
        name: "service.title",
        type: "input" as CustomFilterType,
        placeholder: "ابحث عن اسم الفاتورة",
        label: "الفاتورة",
      },
      {
        type: "select" as CustomFilterType,
        placeholder: "اختر المجال",
        label: "التصنيف",
        name: "status",
      },
    ],
    [],
  );
  return (
    <div className="pt-8 px-4 bg-white">
      <CustomFilter filters={filters} />
    </div>
  );
};
export default Invoices;
