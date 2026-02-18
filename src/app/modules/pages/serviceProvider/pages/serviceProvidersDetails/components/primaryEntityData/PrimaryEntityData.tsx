import useOpenedHook from "@/app/hooks/openedHook";
import { memo } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import LabelContent from "@shared/components/labelContent/labelContent";
import { Image, Radio } from "antd";
import FieldsList from "./fieldsList";
import type { Provider } from "@/app/modules/pages/followRequests/model/followRequestsModel";

const PrimaryEntityData = memo(
  ({ providerData }: { providerData: Provider }) => {
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
            <Image
              width={200}
              alt="basic"
              src={providerData?.profile?.[0]?.logo || "/images/user.png"}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4!">
              <LabelContent label="اسم الشركة أو الكيان بالعربية">
                <p className="p-2 rounded-lg border border-gray-200">
                  {providerData?.profile?.[0]?.business_name}
                </p>
              </LabelContent>
              <LabelContent label="نوع الجهة الأساسية">
                <Radio.Group
                  size="large"
                  className="main-radio"
                  value={providerData?.profile?.[0]?.business_type}
                >
                  <Radio.Button value="institution">مؤسسة</Radio.Button>
                  <Radio.Button value="company">شركة</Radio.Button>
                  <Radio.Button value="individual">فرد</Radio.Button>
                </Radio.Group>
              </LabelContent>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4!">
              <LabelContent label="المجالات">
                <FieldsList
                  fields={
                    providerData?.profile?.[0]?.fields?.map(
                      (field) => field.name!,
                    ) || []
                  }
                />
              </LabelContent>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4!">
              <LabelContent label="رقم السجل التجاري">
                <p className="p-2 rounded-lg border border-gray-200">
                  {providerData?.profile?.[0]?.cr_number}
                </p>
              </LabelContent>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4!">
              <LabelContent label="تاريخ اصدار السجل التجاري">
                <p className="p-2 rounded-lg border border-gray-200">
                  {providerData?.profile?.[0]?.cr_issue_date || "-"}
                </p>
              </LabelContent>
              <LabelContent label="تاريخ انتهاء السجل التجاري">
                <p className="p-2 rounded-lg border border-gray-200">
                  {providerData?.profile?.[0]?.cr_expiry_date || "-"}
                </p>
              </LabelContent>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4!">
              <LabelContent label="الرقم الضريبي (VAT Number)">
                <p className="p-2 rounded-lg border border-gray-200">
                  {providerData?.profile?.[0]?.vat_number}
                </p>
              </LabelContent>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4!">
              <LabelContent label="تاريخ اصدار الرقم الضريبي">
                <p className="p-2 rounded-lg border border-gray-200">
                  {providerData?.profile?.[0]?.vat_issue_date || "-"}
                </p>
              </LabelContent>
              <LabelContent label="تاريخ انتهاء الرقم الضريبي">
                <p className="p-2 rounded-lg border border-gray-200">
                  {providerData?.profile?.[0]?.vat_expiry_date || "-"}
                </p>
              </LabelContent>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4!">
              <LabelContent label="الرقم الموحد">
                <p className="p-2 rounded-lg border border-gray-200">700</p>
              </LabelContent>
            </div>
          </>
        )}
      </div>
    );
  },
);

PrimaryEntityData.displayName = "PrimaryEntityData";
export default PrimaryEntityData;
