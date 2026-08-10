import { getStatusTag } from "@shared/services/sharedService";
import { Tag } from "antd";
import type { CommissionLog } from "../../model/commissionSettingsModel";

export const commissionSettingsLogsColumns = [
  {
    title: "التاريخ والوقت",
    dataIndex: "date_formatted",
    key: "date_formatted",
  },
  {
    title: "النسبة الأولى",
    dataIndex: "main_commission_rate",
    key: "main_commission_rate",
  },
  {
    title: "النسبة الثانية",
    dataIndex: "offering_provider_commission_rate",
    key: "offering_provider_commission_rate",
  },
  
  {
    title: "من قِبل",
    dataIndex: "performed_by",
    key: "performed_by",
  },
  {
    title: "الحالة",
    dataIndex: "status",
    key: "status",
    render: (_: string, record: CommissionLog) => {
      const status = record.is_current ? "active" : record.status;
      const config = getStatusTag(status ?? "");
      return <Tag color={config.color}>{record.status_label}</Tag>;
    },
  },
];
