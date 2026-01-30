import useOpenedHook from "@/app/hooks/openedHook";
import { memo } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import LabelContent from "@shared/components/labelContent/labelContent";

const NationalAddress = memo(() => {
  const { isOpen, setIsOpen } = useOpenedHook();
  return (
    <div className="bg-white shadow rounded-lg p-6 mt-2">
      <h1 className="text-lg font-bold flex justify-between items-center gap-2">
        <span>العنوان الوطني</span>
        <p onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          {isOpen ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        </p>
      </h1>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4!">
          <LabelContent label="الدولة" content="المملكة العربية السعودية" />
          <LabelContent label="المدينة" content="الرياض" />
          <LabelContent label="الحي" content="الرياض" />
          <LabelContent label="الشارع" content="المملكة العربية السعودية" />
          <LabelContent label="الرمز البريدي" content="الرياض" />
          <LabelContent label="رقم المبنى" content="الرياض" />
        </div>
      )}
    </div>
  );
});

NationalAddress.displayName = "NationalAddress";
export default NationalAddress;
