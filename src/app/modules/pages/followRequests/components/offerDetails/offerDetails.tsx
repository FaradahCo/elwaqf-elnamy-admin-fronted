import React from "react";
import type { Quotation } from "../../model/followRequestsModel";
import CustomTable from "@shared/components/customTable/customtable";
import { offerDetailsColumns } from "./offerDetailsConfig";

const OfferDetails = React.memo(
  ({ quotations }: { quotations: Quotation[] }) => {
    return (
      <>
        <div className="mt-7 flex justify-between items-center mb-6">
          <div>
            <p className="text-lg font-bold text-primary">تفاصيل العرض</p>
            <p className="h-1 bg-second-primary w-[50%] mt-1"></p>
          </div>
        </div>
        <CustomTable
          columns={offerDetailsColumns}
          dataSource={quotations}
          showPagination={false}
          showSelection={false}
        />
      </>
    );
  },
);
export default OfferDetails;
