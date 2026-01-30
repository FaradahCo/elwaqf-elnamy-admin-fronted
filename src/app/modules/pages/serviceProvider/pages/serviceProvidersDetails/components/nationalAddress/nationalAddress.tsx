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
          <LabelContent
            label="الدولة"
            content={providerData?.profile?.[0]?.country || "-"}
          />
          <LabelContent
            label="المدينة"
            content={providerData?.profile?.[0]?.city || "-"}
          />
          <LabelContent
            label="الحي"
            content={providerData?.profile?.[0]?.district || "-"}
          />
          <LabelContent
            label="الشارع"
            content={providerData?.profile?.[0]?.street || "-"}
          />
          <LabelContent
            label="الرمز البريدي"
            content={providerData?.profile?.[0]?.postal_code || "-"}
          />
          <LabelContent
            label="رقم المبنى"
            content={providerData?.profile?.[0]?.building_number || "-"}
          />
        </div>
      )}
    </div>
  );
});

NationalAddress.displayName = "NationalAddress";
export default NationalAddress;
