import { useNavigate, useParams } from "react-router";
import { useApiQuery, useApiMutation } from "@shared/services/api";
import {
  getServiceProvider,
  updateServiceProviderStatus,
} from "../serviceProvidersServices";
import {
  Button,
  Card,
  Descriptions,
  Spin,
  Tag,
  Image,
  Typography,
  message,
  Popconfirm,
} from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { getStatusTag } from "@shared/services/sharedService";

const { Title } = Typography;

const ReviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: provider, isLoading, refetch } = useApiQuery(
    ["getServiceProvider", id],
    () => getServiceProvider(id!),
    { enabled: !!id }
  );

  const { mutate: updateStatus, isPending: isUpdating } = useApiMutation(
    ({ status }: { status: string }) =>
      updateServiceProviderStatus(id!, { status }),
    {
      onSuccess: () => {
        message.success("تم تحديث الحالة بنجاح");
        refetch();
      },
      onError: () => {
        message.error("حدث خطأ أثناء تحديث الحالة");
      },
    }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!provider) {
    return <div>لم يتم العثور على مزود الخدمة</div>;
  }

  const profile = provider.profile[0];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button
            type="text"
            icon={<ArrowRightOutlined />}
            onClick={() => navigate(-1)}
          />
          <Title level={3} className="m-0!">
            مراجعة مزود الخدمة
          </Title>
        </div>
        <div className="flex gap-2">
          <Tag color={getStatusTag(provider.status).color} className="text-lg py-1 px-3">
            {provider.status_label}
          </Tag>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <Card title="المعلومات الأساسية" className="shadow-sm">
          <Descriptions column={1} bordered>
            <Descriptions.Item label="اسم المستخدم">
              {provider.name}
            </Descriptions.Item>
            <Descriptions.Item label="البريد الإلكتروني">
              {provider.email}
            </Descriptions.Item>
            <Descriptions.Item label="رقم الجوال">
              {provider.phone}
            </Descriptions.Item>
            <Descriptions.Item label="تاريخ التسجيل">
              {provider.created_at}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Commercial Entity Info */}
        {profile && (
          <Card title="بيانات الجهة / المنشأة" className="shadow-sm">
            <div className="flex justify-center mb-4">
              {profile.logo ? (
                <Image
                  width={100}
                  src={profile.logo}
                  fallback="/images/placeholder.png"
                  className="rounded-full border"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  لا يوجد شعار
                </div>
              )}
            </div>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="الاسم التجاري">
                {profile.business_name}
              </Descriptions.Item>
              <Descriptions.Item label="نوع الكيان">
                {profile.business_type === "company" ? "شركة" : "فرد/مؤسسة"}
              </Descriptions.Item>
              <Descriptions.Item label="رقم السجل التجاري">
                {profile.cr_number}
              </Descriptions.Item>
              <Descriptions.Item label="تاريخ انتهاء السجل">
                {profile.cr_expiry_date}
              </Descriptions.Item>
              <Descriptions.Item label="الرقم الضريبي">
                {profile.vat_number}
              </Descriptions.Item>
              <Descriptions.Item label="المجالات">
                {profile.fields?.map((f) => (
                  <Tag key={f.id}>{f.name}</Tag>
                ))}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}

        {/* Address */}
        {profile && (
          <Card title="العنوان الوطني" className="shadow-sm">
             <Descriptions column={1} bordered>
              <Descriptions.Item label="الدولة">
                {profile.country}
              </Descriptions.Item>
              <Descriptions.Item label="المدينة">
                {profile.city}
              </Descriptions.Item>
              <Descriptions.Item label="الحي">
                {profile.district}
              </Descriptions.Item>
               <Descriptions.Item label="الشارع">
                {profile.street}
              </Descriptions.Item>
              <Descriptions.Item label="الرمز البريدي">
                {profile.postal_code}
              </Descriptions.Item>
             </Descriptions>
          </Card>
        )}

        {/* Attachments */}
        {profile && profile.media && (
           <Card title="المرفقات" className="shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                 {profile.media.vat_certificate && (
                    <div className="border p-4 rounded text-center">
                        <p className="mb-2 font-semibold">شهادة الضريبة</p>
                        <Button type="link" href={profile.media.vat_certificate.url} target="_blank">عرض الملف</Button>
                    </div>
                 )}
                  {profile.media.cr_certificate && (
                    <div className="border p-4 rounded text-center">
                        <p className="mb-2 font-semibold">السجل التجاري</p>
                        <Button type="link" href={profile.media.cr_certificate.url} target="_blank">عرض الملف</Button>
                    </div>
                 )}
              </div>
           </Card>
        )}
      </div>

       <div className="mt-8 flex justify-end gap-3 pb-10">
          <Popconfirm
             title="هل أنت متأكد من رفض هذا المزود؟"
             onConfirm={() => updateStatus({ status: 'inactive' })}
             okText="نعم، رفض"
             cancelText="إلغاء"
             okButtonProps={{ danger: true }}
          >
             <Button danger size="large" loading={isUpdating}>رفض الطلب</Button>
          </Popconfirm>

          <Popconfirm
             title="هل أنت متأكد من قبول وتفعيل هذا المزود؟"
             onConfirm={() => updateStatus({ status: 'active' })}
             okText="نعم، تفعيل"
             cancelText="إلغاء"
          >
             <Button type="primary" size="large" loading={isUpdating}>قبول وتفعيل</Button>
          </Popconfirm>
       </div>
    </div>
  );
};

export default ReviewPage;
