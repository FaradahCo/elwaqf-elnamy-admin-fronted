import { useParams } from "react-router";
import { useApiQuery } from "@shared/services/api";
import { getServiceProviderRequests } from "../../../serviceProvidersServices";
import CustomTable from "@shared/components/customTable/customtable";
import { Tag } from "antd";
import { getStatusTag } from "@shared/services/sharedService";

const ProviderRequestsTab = () => {
  const { id } = useParams<{ id: string }>();
  const { data: requests, isLoading } = useApiQuery(
    ["getServiceProviderRequests", id],
    () => getServiceProviderRequests(id!),
    { enabled: !!id }
  );

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "الخدمة", dataIndex: ["service", "title"], key: "service" },
    { title: "العميل", dataIndex: ["client", "name"], key: "client" },
    { title: "تاريخ الطلب", dataIndex: "created_at", key: "created_at" },
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
        dataSource={requests?.data ?? []}
        loading={isLoading}
        paginationMeta={requests?.meta}
      />
    </div>
  );
};
export default ProviderRequestsTab;
