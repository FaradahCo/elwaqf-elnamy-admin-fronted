import { useNavigate, useParams } from "react-router";
import { useApiQuery } from "@shared/services/api";
import { getServiceProvider } from "../../serviceProvidersServices";
import { Avatar, Button, Spin, Tabs, Tag, Typography } from "antd";
import { ArrowRightOutlined, UserOutlined } from "@ant-design/icons";
import ProviderDashboardTab from "./tabs/ProviderDashboardTab";
import ProviderServicesTab from "./tabs/ProviderServicesTab";
import ProviderRequestsTab from "./tabs/ProviderRequestsTab";
import ProviderWalletTab from "./tabs/ProviderWalletTab";
import ProviderConsultationsTab from "./tabs/ProviderConsultationsTab";
import ProviderReviewsTab from "./tabs/ProviderReviewsTab";
import ProviderInvoicesTab from "./tabs/ProviderInvoicesTab";


const { Title, Text } = Typography;

const ProviderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: provider, isLoading } = useApiQuery(
    ["getServiceProvider", id],
    () => getServiceProvider(id!),
    { enabled: !!id }
  );

  const items = [
    {
      key: "dashboard",
      label: "لوحة المعلومات",
      children: <ProviderDashboardTab />,
    },
    {
      key: "services",
      label: "الخدمات",
      children: <ProviderServicesTab />,
    },
    {
      key: "requests",
      label: "الطلبات",
      children: <ProviderRequestsTab />,
    },
    {
      key: "consultations",
      label: "الاستشارات",
      children: <ProviderConsultationsTab />,
    },
    {
      key: "wallet",
      label: "المحفظة",
      children: <ProviderWalletTab />,
    },
    {
      key: "invoices",
      label: "الفواتير",
      children: <ProviderInvoicesTab />,
    },
    {
      key: "reviews",
      label: "المراجعات",
      children: <ProviderReviewsTab />,
    },
  ];


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!provider) {
    return <div>User not found</div>;
  }

  const profile = provider.data.profile[0];

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
            <Button
                type="text"
                icon={<ArrowRightOutlined />}
                onClick={() => navigate(-1)}
                className="mt-1"
            />
            <Avatar size={64} src={profile?.logo} icon={<UserOutlined />} />
            <div>
                <Title level={4} className="m-0!">{provider.data.name}</Title>
                 {profile?.business_name && <Text className="block text-gray-500">{profile.business_name}</Text>}
                <div className="mt-1">
                     <Tag color={provider.data.status === 'active' ? 'green' : 'default'}>{provider.data.status}</Tag>
                     <Text type="secondary" className="mx-2">{provider.data.email}</Text>
                     <Text type="secondary">{provider.data.phone}</Text>
                </div>
            </div>
        </div>
        <Button onClick={() => navigate(`/admin/service-providers/reviews/${id}`)}>
            عرض تفاصيل التسجيل
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <Tabs defaultActiveKey="dashboard" items={items} />
      </div>
    </div>
  );
};

export default ProviderDetailsPage;
