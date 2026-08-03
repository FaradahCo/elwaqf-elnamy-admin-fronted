import CustomTable from "@shared/components/customTable/customtable";
import { requestHistoryColumns } from "./requestHistoryConfig";
import React, { useMemo } from "react";
import type { Activity } from "../../model/followRequestsModel";
import { Collapse } from "antd";

const RequestHistroy = React.memo(
  ({ activities }: { activities: Activity[] }) => {
    const items = useMemo(
      () => [
        {
          key: "1",
          label: (
            <div>
              <p className="text-xl font-bold text-primary">
                سجل تحديثات الطلب
              </p>
              <p className="h-1 bg-second-primary w-[7%] mt-1"></p>
            </div>
          ),
          children: (
            <>
              <CustomTable
                columns={requestHistoryColumns}
                dataSource={activities}
                showPagination={false}
                showSelection={false}
              />
            </>
          ),
        },
      ],
      [activities],
    );
    return (
      <Collapse
        className="bg-white! my-4!"
        expandIconPosition="end"
        defaultActiveKey={["1"]}
        items={items}
      />
    );
  },
);

export default RequestHistroy;
