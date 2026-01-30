import useOpenedHook from "@/app/hooks/openedHook";
import { memo } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import LabelContent from "@shared/components/labelContent/labelContent";
import { Image, Radio } from "antd";
import FieldsList from "./fieldsList";

const PrimaryEntityData = memo(() => {
  const { isOpen, setIsOpen } = useOpenedHook();

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-2">
      <h1 className="text-lg font-bold flex justify-between items-center gap-2">
        <span>بيانات الجهة الأساسية</span>
        <p onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          {isOpen ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        </p>
      </h1>
      {isOpen && (
        <>
          <Image width={200} alt="basic" src="/images/user.png" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4!">
            <LabelContent
              label="اسم الشركة أو الكيان بالعربية"
              content="شركة طارق الفراج "
            />
            <LabelContent
              label="نوع الجهة الأساسية"
              content={
                <Radio.Group
                  size="large"
                  className="main-radio"
                  value="institution"
                >
                  <Radio.Button value="institution">مؤسسة</Radio.Button>
                  <Radio.Button value="company">شركة</Radio.Button>
                  <Radio.Button value="individual">فرد</Radio.Button>
                </Radio.Group>
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4!">
            <LabelContent
              label="المجالات"
              content={<FieldsList fields={["خدمات قانونية", "خدمات شرعية"]} />}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4!">
            <LabelContent label="رقم السجل التجاري" content="1234567890" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4!">
            <LabelContent
              label="تاريخ اصدار السجل التجاري"
              content="12/04/2024"
            />
            <LabelContent
              label="تاريخ انتهاء السجل التجاري"
              content="12/04/2024"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4!">
            <LabelContent
              label="الرقم الضريبي (VAT Number)"
              content="3234557899865"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4!">
            <LabelContent
              label="تاريخ اصدار الرقم الضريبي"
              content="12/04/2024"
            />
            <LabelContent
              label="تاريخ انتهاء الرقم الضريبي"
              content="12/04/2024"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4!">
            <LabelContent label="الرقم الموحد" content="700" />
          </div>
        </>
      )}
    </div>
  );
});

PrimaryEntityData.displayName = "PrimaryEntityData";
export default PrimaryEntityData;
