import useOpenedHook from "@/app/hooks/openedHook";
import { memo } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import LabelContent from "@shared/components/labelContent/labelContent";
import type { Provider } from "@/app/modules/pages/followRequests/model/followRequestsModel";

const NationalAddress = memo(({ providerData }: { providerData: Provider }) => {
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
          <LabelContent label="الدولة">
            <p className="p-2 rounded-lg border border-gray-200">
              {providerData?.profile?.[0]?.country || "-"}
            </p>
          </LabelContent>
          <LabelContent label="المدينة">
            <p className="p-2 rounded-lg border border-gray-200">
              {providerData?.profile?.[0]?.city || "-"}
            </p>
          </LabelContent>
          <LabelContent label="الحي">
            <p className="p-2 rounded-lg border border-gray-200">
              {providerData?.profile?.[0]?.district || "-"}
            </p>
          </LabelContent>
          <LabelContent label="الشارع">
            <p className="p-2 rounded-lg border border-gray-200">
              {providerData?.profile?.[0]?.street || "-"}
            </p>
          </LabelContent>
          <LabelContent label="الرمز البريدي">
            <p className="p-2 rounded-lg border border-gray-200">
              {providerData?.profile?.[0]?.postal_code || "-"}
            </p>
          </LabelContent>
          <LabelContent label="رقم المبنى">
            <p className="p-2 rounded-lg border border-gray-200">
              {providerData?.profile?.[0]?.building_number || "-"}
            </p>
          </LabelContent>
        </div>
      )}
    </div>
  );
});

NationalAddress.displayName = "NationalAddress";
export default NationalAddress;
