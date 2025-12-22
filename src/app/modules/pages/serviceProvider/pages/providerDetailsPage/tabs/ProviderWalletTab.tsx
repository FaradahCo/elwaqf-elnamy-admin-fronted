import { useParams } from "react-router";
import { useApiQuery } from "@shared/services/api";
import { getServiceProviderWallet, getServiceProviderWithdrawals } from "../../../serviceProvidersServices";
import CustomTable from "@shared/components/customTable/customtable";
import { Card, Col, Row, Statistic, Tag, Typography } from "antd";

const ProviderWalletTab = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: wallet, isLoading: isWalletLoading } = useApiQuery(
    ["getServiceProviderWallet", id],
    () => getServiceProviderWallet(id!),
    { enabled: !!id }
  );

  const { data: withdrawals, isLoading: isWithdrawalsLoading } = useApiQuery(
    ["getServiceProviderWithdrawals", id],
    () => getServiceProviderWithdrawals(id!),
    { enabled: !!id }
  );

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "المبلغ", dataIndex: "amount", key: "amount", render: (val: string) => `${val} ر.س` },
    { title: "الحساب البنكي", dataIndex: ["bank_account", "bank_name"], key: "bank_name" },
    { title: "الآيبان", dataIndex: ["bank_account", "iban"], key: "iban" },
    { title: "تاريخ الطلب", dataIndex: "created_at", key: "created_at" },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Tag>{status}</Tag>, // Basic tag, can be enhanced
    },
  ];

  return (
    <div className="mt-6">
      <Row gutter={16} className="mb-8">
        <Col span={6}>
          <Card>
            <Statistic title="الرصيد الكلي" value={wallet?.data?.total_balance} suffix="ر.س" loading={isWalletLoading} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="الرصيد المتاح" value={wallet?.data?.available_balance} suffix="ر.س" loading={isWalletLoading} valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="الرصيد المعلق" value={wallet?.data?.pending_balance} suffix="ر.س" loading={isWalletLoading} valueStyle={{ color: '#faad14' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="الرصيد المحجوز" value={wallet?.data?.locked_balance} suffix="ر.س" loading={isWalletLoading} />
          </Card>
        </Col>
      </Row>

      <Typography.Title level={5}>المعاملات المالية</Typography.Title>
      <CustomTable
        columns={columns}
        dataSource={withdrawals?.data ?? []}
        loading={isWithdrawalsLoading}
        paginationMeta={withdrawals?.meta}
      />
    </div>
  );
};
export default ProviderWalletTab;
