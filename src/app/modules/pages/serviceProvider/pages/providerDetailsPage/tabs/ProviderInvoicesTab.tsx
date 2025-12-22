import { useParams } from "react-router";
import { useApiQuery } from "@shared/services/api";
import { getServiceProviderInvoices } from "../../../serviceProvidersServices";
import CustomTable from "@shared/components/customTable/customtable";
import { Tag, Button } from "antd";
import { getStatusTag } from "@shared/services/sharedService";
import { DownloadOutlined } from "@ant-design/icons";

const ProviderInvoicesTab = () => {
  const { id } = useParams<{ id: string }>();
  const { data: invoices, isLoading } = useApiQuery(
    ["getServiceProviderInvoices", id],
    () => getServiceProviderInvoices(id!),
    { enabled: !!id }
  );

  const columns = [
    { title: "رقم الفاتورة", dataIndex: "invoice_number", key: "invoice_number" },
    { title: "الخدمة / الباقة", dataIndex: "service_title", key: "service_title" },
    { title: "التاريخ", dataIndex: "issue_date", key: "issue_date" },
    { title: "المبلغ", dataIndex: "amount", key: "amount", render: (val: number) => `${val} ر.س` },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => (
        <Tag color={getStatusTag(status).color}>{record.status_label}</Tag>
      ),
    },
    {
      title: "تحميل",
      key: "action",
      render: (_: any, record: any) => (
        <Button 
          type="link" 
          icon={<DownloadOutlined />} 
          href={record.file_url} 
          target="_blank"
          disabled={!record.file_url}
        />
      ),
    },
  ];

  return (
    <div className="mt-6">
      <CustomTable
        columns={columns}
        dataSource={invoices?.data ?? []}
        loading={isLoading}
        paginationMeta={invoices?.meta}
      />
    </div>
  );
};
export default ProviderInvoicesTab;
