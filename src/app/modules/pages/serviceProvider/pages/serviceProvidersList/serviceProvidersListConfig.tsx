import { getStatusTag } from "@shared/services/sharedService";
import { Switch, Tag } from "antd";
import type { Fields, ServiceProviders } from "../../serviceProviders.model";
type ToggleField = "is_waqf_market" | "is_consultant";
type ProviderClickHandler = (record: ServiceProviders) => void;
type ToggleChangeHandler = (
  record: ServiceProviders,
  field: ToggleField,
  checked: boolean,
) => void;
export const serviceProvidersListColumns = (
  onToggleChange: ToggleChangeHandler,
  onProviderClick: ProviderClickHandler,
) => [
  {
    title: "ID",
    dataIndex: "user_id",
    key: "user_id",
  },
  {
    title: "مزود الخدمة",
    dataIndex: "business_name",
    key: "business_name",
    render: (business_name: string, record: ServiceProviders) => (
      <span
        className="underline cursor-pointer"
        onClick={(event) => {
          event.stopPropagation();
          onProviderClick(record);
        }}
      >
        {business_name || record?.user_name}
      </span>
    ),
  },
  {
    title: "السوق الوقفي",
    dataIndex: "is_waqf_market",
    key: "is_waqf_market",
    render: (value: boolean, record: ServiceProviders) => (
      <Switch
        checked={value}
        onChange={(checked) =>
          onToggleChange(record, "is_waqf_market", checked)
        }
        className="[&.ant-switch-checked]:!bg-brand"
      />
    ),
  },
  {
    title: "الإستشارة",
    dataIndex: "is_consultant",
    key: "is_consultant",
    render: (value: boolean, record: ServiceProviders) => (
      <Switch
        checked={value}
        onChange={(checked) => onToggleChange(record, "is_consultant", checked)}
        className="[&.ant-switch-checked]:!bg-brand"
      />
    ),
  },
  {
    title: "تاريخ الانضمام",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "مجال الخدمة",
    dataIndex: "fields",
    key: "fields",
    render: (fields: Fields) => (
      <p className="text-xs">{fields?.map((field) => field.name).join(", ")}</p>
    ),
  },
  {
    title: "الحالة",
    dataIndex: "status",
    key: "status",
    render: (status: string, record: ServiceProviders) => (
      <Tag
        className="px-2! py-1! text-[13px]!"
        color={getStatusTag(status).color}
      >
        {record.status_label}
      </Tag>
    ),
  },
];
