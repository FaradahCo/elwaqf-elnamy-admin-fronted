import { useParams } from "react-router";
import { useApiQuery } from "@shared/services/api";
import { getServiceProviderConsultations } from "../../../serviceProvidersServices";
import CustomTable from "@shared/components/customTable/customtable";
import { Tag, Avatar } from "antd";
import { getStatusTag } from "@shared/services/sharedService";
import { UserOutlined } from "@ant-design/icons";

const ProviderConsultationsTab = () => {
  const { id } = useParams<{ id: string }>();
  const { data: consultations, isLoading } = useApiQuery(
    ["getServiceProviderConsultations", id],
    () => getServiceProviderConsultations(id!),
    { enabled: !!id }
  );

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "الخدمة", dataIndex: "service_title", key: "service_title" }, // Assuming a title or similar exists, matching model update
    { 
      title: "العميل", 
      dataIndex: ["client", "name"], 
      key: "client",
      render: (text: string, record: any) => (
        <div className="flex items-center gap-2">
          <Avatar size="small" icon={<UserOutlined />} src={record.client?.avatar} />
          <span>{text}</span>
        </div>
      )
    },
    { title: "تاريخ الموعد", dataIndex: "appointment_date", key: "appointment_date" },
    { title: "المبلغ", dataIndex: "amount", key: "amount", render: (val: number) => `${val} ر.س` },
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
        dataSource={consultations?.data ?? []}
        loading={isLoading}
        paginationMeta={consultations?.meta}
        className={["mt-6"]}
      />
    </div>
  );
};
export default ProviderConsultationsTab;
