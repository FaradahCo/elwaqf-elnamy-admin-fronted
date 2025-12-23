import { useNavigate, useParams } from "react-router";
import { useApiQuery, useApiMutation } from "@shared/services/api";
import { getServiceProvider, getServiceProviderDashboard, updateServiceProviderStatus } from "../../serviceProvidersServices";
import { Avatar, Button, Spin, Tabs, Tag, Typography, Dropdown, Menu, Modal, Input, message } from "antd";
import { ArrowRightOutlined, UserOutlined, DownOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title, Text } = Typography;
const { TextArea } = Input;
import ProviderServicesTab from "./tabs/ProviderServicesTab";
import ProviderRequestsTab from "./tabs/ProviderRequestsTab";
import ProviderWalletTab from "./tabs/ProviderWalletTab";
import ProviderConsultationsTab from "./tabs/ProviderConsultationsTab";
import ProviderReviewsTab from "./tabs/ProviderReviewsTab";
import ProviderInvoicesTab from "./tabs/ProviderInvoicesTab";
import ProviderPersonalAccountTab from "./tabs/ProviderPersonalAccountTab";
import CardStatistic from "@shared/components/cardStatistic/cardStatistic";

const ProviderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState<string>("");
  const [statusNote, setStatusNote] = useState<string>("");

  const { data: provider, isLoading, refetch } = useApiQuery(
    ["getServiceProvider", id],
    () => getServiceProvider(id!),
    { enabled: !!id }
  );

  const { data: stats, isLoading: isStatsLoading } = useApiQuery(
    ["getServiceProviderDashboard", id],
    () => getServiceProviderDashboard(id!),
    { enabled: !!id }
  );

  const { mutate: updateStatus, isPending: isUpdating } = useApiMutation(
    (data: { status: string; note?: string }) =>
      updateServiceProviderStatus(id!, data),
    {
      onSuccess: () => {
        message.success("تم تحديث الحالة بنجاح");
        setIsModalOpen(false);
        setStatusNote("");
        refetch();
      },
      onError: () => {
        message.error("حدث خطأ أثناء تحديث الحالة");
      },
    }
  );

  const handleStatusClick = (e: any) => {
    const status = e.key;
    if (status === 'suspended' || status === 'rejected') {
        setTargetStatus(status);
        setIsModalOpen(true);
    } else {
        updateStatus({ status });
    }
  };

  const menu = (
    <Menu onClick={handleStatusClick} items={[
        { key: 'active', label: <span className="text-green-600">نشط</span> },
        { key: 'pending', label: <span className="text-orange-400">بانتظار الاعتماد</span> },
        { key: 'review', label: <span className="text-blue-400">تحت المراجعة</span> },
        { key: 'suspended', label: <span className="text-gray-500">معلق</span> },
        { key: 'rejected', label: <span className="text-red-500">مرفوض</span> },
    ]} />
  );

  const items = [
    {
      key: "personal_account",
      label: "الحساب الشخصي",
      children: provider ? <ProviderPersonalAccountTab provider={provider} /> : null,
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
      label: "الاستشارة",
      children: <ProviderConsultationsTab />,
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
    {
        key: "wallet",
        label: "المحفظة",
        children: <ProviderWalletTab />,
      },
  ];


  if (isLoading || isStatsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!provider) {
    return <div>User not found</div>;
  }

  // Handle potential data vs direct object (User previous fix removed .data access, assuming service returns object directly)
  // We need to be careful. The service returns <ServiceProviderDetails>. 
  // If the interceptor unwraps 'data', it is ServiceProviderDetails.
  // Let's assume provider is ServiceProviderDetails type directly as fixed in previous step.
  
  const profile = provider.profile?.[0];
  const isPendingApproval = provider.status === 'pending' || provider.status === 'review';

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Top Stats */}
      <div className="flex gap-5 flex-wrap flex-row flex-center justify-start">
            <CardStatistic
            title="إجمالي الخدمات"
            icon="/images/elements_1.svg"
            value={stats?.total_service_requests ?? 0}
            classesName={["border border-second-primary p-4 rounded-xl w-64 min-w-64 bg-white"]}
            />
            <CardStatistic
            title="الطلبات المكتملة"
            icon="/images/elements_2.svg"
            value={stats?.completed_service_requests ?? 0}
            classesName={[
                "border border-green-dark text-green-dark rounded-lg p-4 rounded-xl bg-green-light w-64 min-w-64",
            ]}
            />
            <CardStatistic
            title="جاري العمل"
            icon="/images/elements_3.svg"
            value={stats?.in_progress_service_requests ?? 0}
            classesName={[
                "border border-blue-dark text-blue-dark rounded-lg p-4 rounded-xl bg-blue-light w-64 min-w-64",
            ]}
            />
            <CardStatistic
            title="الرصيد المعلق"
            icon="/images/elements_4.svg"
            value={stats?.locked_balance ?? 0}
            classesName={[
                "border border-orange-dark bg-orange-light text-orange-dark rounded-lg p-4 rounded-xl w-64 min-w-64",
            ]}
            />
      </div>

       {/* Provider Header Info */}
       <div className="bg-white p-6 rounded-lg shadow-sm"> 
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
                            <Title level={4} className="m-0!">{profile?.business_name ?? provider.name}</Title>
                            <Text className="block text-gray-400 text-sm">منذ {provider.created_at}</Text>
                            
                            <div className="mt-2 flex items-center gap-2">
                                <span className={`px-2 py-1 rounded text-sm ${
                                    provider.status === 'active' ? 'bg-green-100 text-green-700' : 
                                    provider.status === 'suspended' ? 'bg-gray-100 text-gray-700' :
                                    provider.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                    'bg-orange-100 text-orange-700'
                                }`}>
                                    {provider.status === 'active' ? 'نشط' : 
                                     provider.status === 'pending' ? 'بانتظار الاعتماد' :
                                     provider.status === 'review' ? 'تحت المراجعة' :
                                     provider.status === 'suspended' ? 'معلق' :
                                     provider.status === 'rejected' ? 'مرفوض' : provider.status
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                    
                     {/* Status Controls */}
                     <div className="flex gap-2 items-center">
                        {isPendingApproval ? (
                            <>
                                <Button 
                                    type="primary" 
                                    className="bg-green-600 hover:bg-green-500" 
                                    icon={<CheckCircleOutlined />}
                                    loading={isUpdating}
                                    onClick={() => updateStatus({ status: 'active' })}
                                >
                                    قبول وتفعيل
                                </Button>
                                <Button 
                                    danger 
                                    icon={<CloseCircleOutlined />}
                                    loading={isUpdating}
                                    onClick={() => {
                                        setTargetStatus('rejected');
                                        setIsModalOpen(true);
                                    }}
                                >
                                    رفض
                                </Button>
                            </>
                        ) : (
                            <Dropdown overlay={menu} trigger={['click']}>
                                <Button loading={isUpdating}>
                                    تغيير الحالة <DownOutlined />
                                </Button>
                            </Dropdown>
                        )}
                        
                        <Button onClick={() => navigate(`/admin/service-providers/reviews/${id}`)}>
                             تفاصيل التسجيل
                        </Button>
                    </div>
            </div>

            {/* Tabs */}
            <Tabs defaultActiveKey="personal_account" items={items} />
      </div>

       {/* Status Change Modal */}
       <Modal
        title={targetStatus === 'rejected' ? "رفض مزود الخدمة" : "تغيير حالة مزود الخدمة"}
        open={isModalOpen}
        onOk={() => updateStatus({ status: targetStatus, note: statusNote })}
        onCancel={() => {
            setIsModalOpen(false);
            setStatusNote("");
        }}
        okText="تأكيد"
        cancelText="إلغاء"
        confirmLoading={isUpdating}
      >
        <div className="py-4">
             {targetStatus === 'suspended' && (
                <div className="mb-4 text-gray-500">
                    سيتم تعطيل حساب المزود مؤقتاً، ولن يتمكن من تقديم أو تعديل أي خدمات إلى حين إعادة تفعيل حسابه.
                </div>
             )}
            <label className="block mb-2 font-medium">
                يرجى كتابة السبب <span className="text-red-500">*</span>
            </label>
            <TextArea 
                rows={4} 
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="اكتب السبب هنا..." 
            />
        </div>
      </Modal>
    </div>
  );
};

export default ProviderDetailsPage;
