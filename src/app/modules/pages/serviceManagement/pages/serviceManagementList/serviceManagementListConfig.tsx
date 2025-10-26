import {
  getStatusTag,
  transformDurationName,
} from "@shared/services/sharedService";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router";
import {
  type Duration,
  type ProviderId,
  type ServiceData,
} from "../../model/serviceProviderList";

// Columns for Services (خدمات)
export const servicesColumnsList: ColumnsType<ServiceData> = [
  {
    title: "معرف الخدمة",
    dataIndex: "id",
    key: "id",
    width: 100,
    ellipsis: true,
  },
  {
    title: "اسم الخدمة",
    dataIndex: "title",
    key: "title",
    width: 200,
    ellipsis: true,
    render: (title: string, record: ServiceData) => (
      <Link
        to={`reviews/${record.id}`}
        className="text-primary! underline! cursor-pointer"
        title={title}
      >
        {title}
      </Link>
    ),
  },
  {
    title: "مزود الخدمة",
    dataIndex: "provider_id",
    key: "provider_id",
    width: 150,
    ellipsis: true,
    render: (provider_id: ProviderId) => {
      const businessName = provider_id?.business_name || "-";
      return <span title={businessName}>{businessName}</span>;
    },
  },
  {
    title: "مجال الخدمة",
    dataIndex: "field",
    key: "field",
    width: 120,
    ellipsis: true,
    render: (field) => {
      const fieldName = field?.name || "-";
      return <span title={fieldName}>{fieldName}</span>;
    },
  },
  {
    title: "السعر يبدأ من",
    dataIndex: "min_price",
    key: "min_price",
    width: 120,
    ellipsis: true,
    render: (price: number) => {
      const priceText = `${price?.toLocaleString() || 0} ريال`;
      return <span title={priceText}>{priceText}</span>;
    },
  },
  {
    title: "مدة التنفيذ",
    dataIndex: "duration",
    key: "duration",
    width: 120,
    ellipsis: true,
    render: (duration: Duration) => {
      if (!duration) return "-";

      const durationText = `${duration?.time} ${transformDurationName(
        duration?.type
      )} `;
      return <span title={durationText}>{durationText}</span>;
    },
  },
  {
    title: "الحالة",
    dataIndex: "status",
    key: "status",
    width: 120,
    ellipsis: true,
    render: (status: string) => {
      const config = getStatusTag(status);
      return <Tag color={config.color}>{config.text}</Tag>;
    },
  },
];

// Columns for Packages (باقات)
export const packagesColumnsList: ColumnsType<ServiceData> = [
  {
    title: "معرف الباقة",
    dataIndex: "id",
    key: "id",
    width: 100,
    ellipsis: true,
  },
  {
    title: "اسم الباقة",
    dataIndex: "title",
    key: "title",
    width: 200,
    ellipsis: true,
    render: (title: string, record: ServiceData) => (
      <Link
        to={`reviews/${record.id}`}
        className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
        title={title}
      >
        {title}
      </Link>
    ),
  },
  {
    title: "مزود الباقة",
    dataIndex: "provider_id",
    key: "provider_id",
    width: 150,
    ellipsis: true,
    render: (provider_id: ProviderId) => {
      const businessName = provider_id?.business_name || "-";
      return <span title={businessName}>{businessName}</span>;
    },
  },
  {
    title: "مجال الباقة",
    dataIndex: "field",
    key: "field",
    width: 120,
    ellipsis: true,
    render: (field) => {
      const fieldName = field?.name || "-";
      return <span title={fieldName}>{fieldName}</span>;
    },
  },
  {
    title: "سعر الباقة",
    dataIndex: "min_price",
    key: "min_price",
    width: 120,
    ellipsis: true,
    render: (price: number) => {
      const priceText = `${price?.toLocaleString() || 0} ريال`;
      return <span title={priceText}>{priceText}</span>;
    },
  },
  {
    title: "مدة الباقة",
    dataIndex: "duration",
    key: "duration",
    width: 120,
    ellipsis: true,
    render: (duration: Duration) => {
      if (!duration) return "-";

      const durationText = `${duration?.time} ${duration?.type} `;
      return <span title={durationText}>{durationText}</span>;
    },
  },
  {
    title: "الحالة",
    dataIndex: "status",
    key: "status",
    width: 120,
    ellipsis: true,
    render: (status: string) => {
      const config = getStatusTag(status);
      return <Tag color={config.color}>{config.text}</Tag>;
    },
  },
];

export const getColumnsList = (
  serviceType: string
): ColumnsType<ServiceData> => {
  return serviceType === "packages" ? packagesColumnsList : servicesColumnsList;
};
