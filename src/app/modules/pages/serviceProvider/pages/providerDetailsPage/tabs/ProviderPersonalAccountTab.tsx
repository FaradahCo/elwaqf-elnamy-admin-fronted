import { Collapse, Input, theme } from "antd";
import type { CollapseProps } from "antd";
import type { ServiceProviderDetails } from "../../../serviceProviders.model";
import { CaretLeftOutlined } from "@ant-design/icons";

interface ProviderPersonalAccountTabProps {
  provider: ServiceProviderDetails;
}

const ProviderPersonalAccountTab = ({ provider }: ProviderPersonalAccountTabProps) => {
  const { token } = theme.useToken();
  const profile = provider.profile?.[0];

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  const basicInfoItems = [
    { label: "اسم المستخدم", value: provider.name },
    { label: "البريد الإلكتروني", value: provider.email },
    { label: "رقم الجوال", value: provider.phone },
  ];

  const entityItems = profile ? [
    { label: "صورة الشعار التجاري", value: profile.logo, isImage: true },
    { label: "اسم الشركة أو الكيان القانوني", value: profile.business_name },
    { label: "نوع الكيان القانوني", value: profile.business_type === 'company' ? 'شركة' : 'فرد/مؤسسة' },
    { label: "رقم السجل التجاري", value: profile.cr_number },
    { label: "تاريخ اصدار السجل التجاري", value: profile.cr_issue_date },
    { label: "تاريخ انتهاء السجل التجاري", value: profile.cr_expiry_date },
    { label: "الرقم الضريبي (VAT Number)", value: profile.vat_number },
    { label: "تاريخ اصدار الرقم الضريبي", value: profile.vat_issue_date },
    { label: "تاريخ انتهاء الرقم الضريبي", value: profile.vat_expiry_date },
    { label: "الرقم الموحد", value: profile.seven_hundred },
  ] : [];

  const addressItems = profile ? [
    { label: "الدولة", value: profile.country },
    { label: "المدينة", value: profile.city },
    { label: "الحي", value: profile.district },
    { label: "الشارع", value: profile.street },
    { label: "الرمز البريدي", value: profile.postal_code },
    { label: "رقم المبنى", value: profile.building_number },
  ] : [];

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <span className="font-bold text-lg">المعلومات الأساسية</span>,
      style: panelStyle,
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {basicInfoItems.map((item, idx) => (
             <div key={idx} className="flex flex-col gap-2">
                <label className="text-gray-500">{item.label}</label>
                <Input value={item.value || '-'} disabled className="text-gray-800 font-medium" />
             </div>
          ))}
        </div>
      ),
    },
    {
      key: '2',
      label: <span className="font-bold text-lg">بيانات الجهة الأساسية</span>,
      style: panelStyle,
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {entityItems.map((item, idx) => (
             <div key={idx} className={`flex flex-col gap-2 ${item.isImage ? 'col-span-full' : ''}`}>
                <label className="text-gray-500">{item.label}</label>
                {item.isImage ? (
                  item.value ? <img src={item.value} alt="logo" className="w-20 h-20 rounded-full border object-cover" /> : <span>-</span>
                ) : (
                  <Input value={item.value || '-'} disabled className="text-gray-800 font-medium" />
                )}
             </div>
          ))}
        </div>
      ),
    },
    {
      key: '3',
      label: <span className="font-bold text-lg">العنوان الوطني</span>,
      style: panelStyle,
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {addressItems.map((item, idx) => (
             <div key={idx} className="flex flex-col gap-2">
                <label className="text-gray-500">{item.label}</label>
                <Input value={item.value || '-'} disabled className="text-gray-800 font-medium" />
             </div>
          ))}
        </div>
      ),
    },
    {
      key: '4',
      label: <span className="font-bold text-lg">مرفقات هامة</span>,
      style: panelStyle,
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile?.media?.vat_certificate && (
                <div className="flex items-center justify-between p-3 border rounded bg-white">
                    <span>الشهادة الضريبية (ضريبة القيمة المضافة)</span>
                    <a href={profile.media.vat_certificate.url} target="_blank" rel="noreferrer" className="text-blue-600">عرض الملف</a>
                </div>
            )}
             {profile?.media?.cr_certificate && (
                <div className="flex items-center justify-between p-3 border rounded bg-white">
                    <span>السجل التجاري</span>
                    <a href={profile.media.cr_certificate.url} target="_blank" rel="noreferrer" className="text-blue-600">عرض الملف</a>
                </div>
            )}
        </div>
      ),
    },
  ];

  return (
    <div className="mt-8">
      <Collapse
        bordered={false}
        defaultActiveKey={['1', '2', '3', '4']}
        expandIcon={({ isActive }) => <CaretLeftOutlined rotate={isActive ? -90 : 0} />}
        style={{ background: 'transparent' }}
        items={items}
      />
    </div>
  );
};

export default ProviderPersonalAccountTab;
