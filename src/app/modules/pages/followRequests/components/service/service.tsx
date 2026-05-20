import React, { useMemo } from "react";
import { Collapse } from "antd";
import CustomTable from "@shared/components/customTable/customtable";
import { serviceOutputsColumns } from "./serviceConfig";

const Service = React.memo(({ outputs }: { outputs: any[] }) => {
  const items = useMemo(
    () => [
      {
        key: "1",
        label: (
          <div>
            <p className="text-xl font-bold text-primary">الخدمة</p>
            <p className="h-1 bg-second-primary w-[7%] mt-1"></p>
          </div>
        ),
        children: (
          <>
            <div className="mb-6">
              <p className="text-xl font-bold text-primary">مخرجات الخدمة</p>
              <p className="h-1 bg-second-primary w-[7%] mt-1"></p>
            </div>
            <CustomTable
              columns={serviceOutputsColumns}
              dataSource={outputs || []}
              showPagination={false}
              showSelection={false}
            />
          </>
        ),
      },
    ],
    [outputs],
  );

  return (
    <Collapse
      className="bg-white! my-4!"
      expandIconPosition="end"
      defaultActiveKey={["1"]}
      items={items}
    />
  );
});

export default Service;
