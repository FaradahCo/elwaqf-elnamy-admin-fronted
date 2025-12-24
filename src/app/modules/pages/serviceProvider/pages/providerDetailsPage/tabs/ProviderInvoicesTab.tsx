import { useParams } from "react-router";
import { useApiQuery } from "@shared/services/api";
import { getServiceProviderWithdrawals } from "../../../serviceProvidersServices";
import CustomTable from "@shared/components/customTable/customtable";
import { Tag } from "antd";
import { getStatusTag } from "@shared/services/sharedService";

const ProviderInvoicesTab = () => {
  const { id } = useParams<{ id: string }>();
  const { data: invoices, isLoading } = useApiQuery(
    ["getServiceProviderWithdrawals", id], // Using same query key cache as withdrawals might be useful or distinct if we want to separate logic
    () => getServiceProviderWithdrawals(id!),
    { enabled: !!id }
  );

  const columns = [
    { title: "رقم المعاملة", dataIndex: "code", key: "code" },
    { title: "التاريخ", dataIndex: "created_at", key: "created_at" },
    { title: "المبلغ", dataIndex: "amount", key: "amount", render: (val: string) => `${val} ر.س` },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => (
        <Tag color={getStatusTag(status).color}>{record.status_label || status}</Tag>
      ),
    },
    {
        title: "البنك",
        dataIndex: ["bank_account", "bank_name"],
        key: "bank_name",
        render: (text: string) => text || "-"
    },
    {
        title: "الايبان",
        dataIndex: ["bank_account", "iban"],
        key: "iban",
        render: (text: string) => text || "-"
    }
  ];

  return (
    <div className="mt-6">
      <CustomTable
        columns={columns}
        dataSource={invoices?.data ?? []}
        loading={isLoading}
        paginationMeta={invoices?.meta}
        className={["mt-6"]}
      />
    </div>
  );
};
export default ProviderInvoicesTab;
