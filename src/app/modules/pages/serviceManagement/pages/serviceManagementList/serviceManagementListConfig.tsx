import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { Link } from "react-router";
import {
  type Duration,
  type ProviderId,
  type ServiceData,
  ServiceStatus,
} from "../../model/serviceProviderList";
import {
  getStatusTag,
  transformDurationName,
} from "../../../../../shared/services/sharedService";

// Columns for Services (خدمات)
export const servicesColumnsList: ColumnsType<ServiceData> = [
  {
    title: "معرف الخدمة",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "اسم الخدمة",
    dataIndex: "title",
    key: "title",
    render: (title: string, record: ServiceData) => (
      <Link
        to={`reviews/${record.id}`}
        className="text-primary! underline! cursor-pointer"
      >
        {title}
      </Link>
    ),
  },
  {
    title: "مزود الخدمة",
    dataIndex: "provider_id",
    key: "provider_id",
    render: (provider_id: ProviderId) => {
      return provider_id?.business_name || "-";
    },
  },
  {
    title: "مجال الخدمة",
    dataIndex: "field",
    key: "field",
    render: (field) => {
      return field?.name || "-";
    },
  },
  {
    title: "السعر يبدأ من",
    dataIndex: "min_price",
    key: "min_price",
    render: (price: number) => {
      return `${price?.toLocaleString() || 0} ريال`;
    },
  },
  {
    title: "مدة التنفيذ",
    dataIndex: "duration",
    key: "duration",
    render: (duration: Duration) => {
      if (!duration) return "-";

      return `${duration?.time} ${transformDurationName(duration?.type)} `;
    },
  },
  {
    title: "الحالة",
    dataIndex: "status",
    key: "status",
    width: 120,
    render: (status: ServiceStatus) => {
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
  },
  {
    title: "اسم الباقة",
    dataIndex: "title",
    key: "title",
    render: (title: string, record: ServiceData) => (
      <Link
        to={`reviews/${record.id}`}
        className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
      >
        {title}
      </Link>
    ),
  },
  {
    title: "مزود الباقة",
    dataIndex: "provider_id",
    key: "provider_id",
    render: (provider_id: ProviderId) => {
      return provider_id?.business_name || "-";
    },
  },
  {
    title: "مجال الباقة",
    dataIndex: "field",
    key: "field",
    render: (field) => {
      return field?.name || "-";
    },
  },
  {
    title: "سعر الباقة",
    dataIndex: "min_price",
    key: "min_price",
    render: (price: number) => {
      return `${price?.toLocaleString() || 0} ريال`;
    },
  },
  {
    title: "مدة الباقة",
    dataIndex: "duration",
    key: "duration",
    render: (duration: Duration) => {
      if (!duration) return "-";

      return `${duration?.time} ${duration?.type} `;
    },
  },
  {
    title: "الحالة",
    dataIndex: "status",
    key: "status",
    width: 120,
    render: (status: ServiceStatus) => {
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
