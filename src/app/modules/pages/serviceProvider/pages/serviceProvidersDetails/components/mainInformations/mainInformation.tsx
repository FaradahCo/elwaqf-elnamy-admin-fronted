import useOpenedHook from "@/app/hooks/openedHook";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import LabelContent from "@shared/components/labelContent/labelContent";
import { memo } from "react";
const MainInformation = memo(() => {
  const { isOpen, setIsOpen } = useOpenedHook();
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
          <LabelContent label="اسم المستخدم" content="John Doe" />
          <LabelContent label="البريد الإلكتروني" content="John Doe" />
          <LabelContent label="رقم الجوال" content="John Doe" />
        </div>
      )}
    </div>
  );
});

MainInformation.displayName = "MainInformation";
export default MainInformation;
