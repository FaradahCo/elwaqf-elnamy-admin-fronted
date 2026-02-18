import useOpenedHook from "@/app/hooks/openedHook";
import type { ProviderMedia } from "@/app/modules/pages/consultantsManagement/model/consultantsManagementModel";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import LabelContent from "@shared/components/labelContent/labelContent";
import { memo } from "react";
import AttachmentItem from "./attachmentItem";

const ATTACHMENT_FIELDS: Array<{
  key: keyof ProviderMedia;
  label: string;
}> = [
  { key: "address_certificate", label: "ملف العنوان الوطني للمنشأة" },
  { key: "vat_certificate", label: "الشهادة الضريبية للمنشأة" },
  { key: "cr_certificate", label: "السجل التجاري للمنشأة" },
  {
    key: "vat_registration_certificate",
    label: "الشهادة التسجيل في ضريبية القيمة المضافة للمنشأة",
  },
];

const Attachements = memo(
  ({ attachements }: { attachements: ProviderMedia }) => {
    const { isOpen, setIsOpen } = useOpenedHook();

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
            {ATTACHMENT_FIELDS.map((item) => (
              <LabelContent key={item.key} label={item.label}>
                <AttachmentItem
                  media={attachements[item.key] ?? null}
                  label={item.label}
                />
              </LabelContent>
            ))}
          </div>
        )}
      </div>
    );
  },
);

Attachements.displayName = "Attachements";

export default Attachements;
