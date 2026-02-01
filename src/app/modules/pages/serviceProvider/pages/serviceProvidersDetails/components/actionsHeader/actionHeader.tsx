import type { Provider } from "@/app/modules/pages/followRequests/model/followRequestsModel";
import { Button, Image } from "antd";
import { memo } from "react";

const ActionHeader = memo(({ providerData }: { providerData: Provider }) => {
  console.log("render");
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
      <div className="flex items-start gap-4">
        <Image
          width={120}
          src={providerData?.profile?.[0]?.logo || "/images/user.png"}
          alt="delete icon"
        />
        <div className="mt-4">
          <p className="text-lg font-bold mb-2">
            {providerData?.profile?.[0]?.business_name}
          </p>
          <span className="text-gray-500 text-sm">
            منذ {providerData?.profile?.[0]?.created_at}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button className="py-4!" type="primary">
          قبول
        </Button>
        <Button className="bg-error! text-white! py-4!">رفض</Button>
      </div>
    </div>
  );
});

ActionHeader.displayName = "ActionHeader";

export default ActionHeader;
