import CustomTable from "@shared/components/customTable/customtable";
import { requestHistoryColumns } from "./requestHistoryConfig";
import React from "react";
import type { Activity } from "../../model/followRequestsModel";

const RequestHistroy = React.memo(
  ({ activities }: { activities: Activity[] }) => {
    return (
      <div className="bg-white shadow p-4 mt-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-lg font-bold text-primary">سجل تحديثات الطلب</p>
            <p className="h-1 bg-second-primary w-[50%] mt-1"></p>
          </div>
        </div>
        <CustomTable
          columns={requestHistoryColumns}
          dataSource={activities}
          showPagination={false}
          showSelection={false}
        />
      </div>
    );
  },
);

export default RequestHistroy;
