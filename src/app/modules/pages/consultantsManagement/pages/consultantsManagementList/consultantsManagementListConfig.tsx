import type { ColumnsType } from "antd/es/table";
import type { ConsultantItem } from "../../model/consultantsManagementModel";

export const consultantsManagementListColumns: ColumnsType<ConsultantItem> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
];

