import { memo } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import useOpenedHook from "@/app/hooks/openedHook";
import LabelContent from "@shared/components/labelContent/labelContent";

const Attachements = memo(() => {
  const { isOpen, setIsOpen } = useOpenedHook();

  const mapLabelToKey: Array<{ key: string; label: string; val: string }> = [
    {
      key: "address_certificate",
      label: "ملف العنوان الوطني للمنشأة",
      val: "العنوان الوطني",
    },
    {
      key: "vat_certificate",
      label: "الشهادة الضريبية للمنشأة",
      val: "الشهادة الضريبية للمنشأة",
    },
    {
      key: "cr_certificate",
      label: "السجل التجاري للمنشأة",
      val: "السجل التجاري",
    },
    {
      key: "vat_registration_certificate",
      label: "الشهادة التسجيل في ضريبية القيمة المضافة للمنشأة",
      val: "ضريبة القيمة المضافة",
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-2">
      <h1 className="text-lg font-bold flex justify-between items-center gap-2">
        <span>الملفات المرفقة</span>
        <p onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          {isOpen ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        </p>
      </h1>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4!">
          {mapLabelToKey.map((item) => (
            <LabelContent key={item.key} label={item.label}>
              <div className="flex items-center gap-2 border border-gray-200 rounded-md p-2 bg-gray-50">
                <img src="/images/pdf.svg" alt="pdf" className="w-5 h-5" />
                <span>{item.val}</span>
              </div>
            </LabelContent>
          ))}
        </div>
      )}
    </div>
  );
});

Attachements.displayName = "Attachements";

export default Attachements;
