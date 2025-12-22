import { useParams } from "react-router";
import { useApiQuery } from "@shared/services/api";
import { getServiceProviderServices } from "../../../serviceProvidersServices";
import CustomTable from "@shared/components/customTable/customtable";
import { Tag } from "antd";
import { getStatusTag } from "@shared/services/sharedService";

const ProviderServicesTab = () => {
  const { id } = useParams<{ id: string }>();
  const { data: services, isLoading } = useApiQuery(
    ["getServiceProviderServices", id],
    () => getServiceProviderServices(id!),
    { enabled: !!id }
  );

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "العنوان", dataIndex: "title", key: "title" },
    { title: "النوع", dataIndex: "type", key: "type", render: (t: string) => (t === 'service' ? 'خدمة' : 'باقة') },
    { title: "المجال", dataIndex: ["field", "name"], key: "field" },
    { title: "السعر يبدأ من", dataIndex: "min_price", key: "min_price" },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => (
        <Tag color={getStatusTag(status).color}>{record.status_label}</Tag>
      ),
    },
  ];

  return (
    <div className="mt-6">
      <CustomTable
        columns={columns}
        dataSource={services?.data ?? []}
        loading={isLoading}
        paginationMeta={services?.meta}
      />
    </div>
  );
};
export default ProviderServicesTab;
