import useOpenedHook from "@/app/hooks/openedHook";
import type { Provider } from "@/app/modules/pages/followRequests/model/followRequestsModel";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import LabelContent from "@shared/components/labelContent/labelContent";
import { memo } from "react";
const MainInformation = memo(({ providerData }: { providerData: Provider }) => {
  const { isOpen, setIsOpen } = useOpenedHook();
  console.log(providerData);
  return (
    <div className="bg-white shadow rounded-lg p-6 mt-2">
      <h1 className="text-lg font-bold flex justify-between items-center gap-2">
        <span>المعلومات الأساسية</span>
        <p onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          {isOpen ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        </p>
      </h1>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4!">
          <LabelContent
            label="اسم المستخدم"
            content={providerData?.profile?.[0]?.business_name}
          />
          <LabelContent
            label="البريد الإلكتروني"
            content={providerData?.email}
          />
          <LabelContent label="رقم الجوال" content={providerData?.phone} />
        </div>
      )}
    </div>
  );
});

MainInformation.displayName = "MainInformation";
export default MainInformation;
