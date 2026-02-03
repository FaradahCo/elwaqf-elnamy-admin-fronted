import type { Provider } from "@/app/modules/pages/followRequests/model/followRequestsModel";
import { Button, Tag } from "antd";
import { memo } from "react";
import { Image } from "antd";
import {
  ServiceStatusEnum,
  getStatusTag,
} from "@shared/services/sharedService";

const ActionHeader = memo(({ providerData }: { providerData: Provider }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow mt-4">
      <div className="flex items-start gap-4">
        <Image
          width={100}
          alt="basic"
          src={providerData?.profile?.[0]?.logo || "/images/user.png"}
        />

        <div className="mt-4">
          <p className="text-lg font-bold mb-2">{providerData?.name}</p>
          <span className="text-gray-500 text-sm">
            منذ {providerData?.profile?.[0]?.created_at}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {providerData?.status === ServiceStatusEnum.review && (
          <>
            <Button className="py-4!" type="primary">
              قبول
            </Button>
            <Button className="bg-error! text-white! py-4!">رفض</Button>
          </>
        )}
        {providerData?.status !== ServiceStatusEnum.review && (
          <Tag color={getStatusTag(providerData?.status!).color}>
            {providerData?.status?.toUpperCase()}
          </Tag>
        )}
      </div>
    </div>
  );
});

ActionHeader.displayName = "ActionHeader";

export default ActionHeader;
