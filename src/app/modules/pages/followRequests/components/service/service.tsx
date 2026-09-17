import React, { useMemo } from "react";
import { Collapse } from "antd";
import CustomTable from "@shared/components/customTable/customtable";
import { serviceOutputsColumns } from "./serviceConfig";
import type { Deliverables } from "../../model/followRequestsModel";
import { useDownloadAttachment } from "@/app/hooks/useDownloadAttachment";

const Service = React.memo(
  ({ deliverables }: { deliverables: Deliverables[] }) => {
    const { handleDownloadAttachment, isLoading } = useDownloadAttachment();
    const items = useMemo(
      () => [
        {
          key: "1",
          label: (
            <div>
              <p className="text-xl font-bold text-primary">مخرجات الخدمة</p>
              <p className="h-1 bg-second-primary w-[7%] mt-1"></p>
            </div>
          ),
          children: (
            <>
              <CustomTable<Deliverables>
                columns={serviceOutputsColumns(
                  handleDownloadAttachment,
                  isLoading,
                )}
                dataSource={deliverables || []}
                showPagination={false}
                showSelection={false}
              />
            </>
          ),
        },
      ],
      [deliverables, handleDownloadAttachment, isLoading],
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

export default Service;
