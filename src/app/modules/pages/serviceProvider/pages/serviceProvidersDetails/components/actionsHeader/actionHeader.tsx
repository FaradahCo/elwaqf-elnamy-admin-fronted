import type { Provider } from "@/app/modules/pages/followRequests/model/followRequestsModel";
import { Button, Modal, Tag } from "antd";
import { memo, useState } from "react";
import { Image } from "antd";
import {
  ServiceStatusEnum,
  getStatusTag,
} from "@shared/services/sharedService";
import Confirm from "@shared/components/confirm/confirm";

const ActionHeader = memo(({ providerData }: { providerData: Provider }) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState<string | null>(null);

  const changeProviderStatus = () => {
    if (confirmModalOpen === "inactive") {
      console.log("رفض");
    } else {
      console.log("قبول");
    }
  };
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
            <Button
              className="py-4!"
              type="primary"
              onClick={() => setConfirmModalOpen("active")}
            >
              قبول
            </Button>
            <Button
              className="bg-error! text-white! py-4!"
              onClick={() => setConfirmModalOpen("inactive")}
            >
              رفض
            </Button>
          </>
        )}
        {providerData?.status !== ServiceStatusEnum.review && (
          <Tag color={getStatusTag(providerData?.status!).color}>
            {providerData?.status?.toUpperCase()}
          </Tag>
        )}
      </div>
      <Modal
        open={!!confirmModalOpen}
        onCancel={() => setConfirmModalOpen(null)}
        footer={null}
      >
        <Confirm
          confirmIcon={
            confirmModalOpen === "inactive"
              ? "/images/cancel-circle.svg"
              : undefined
          }
          title={
            confirmModalOpen === "inactive"
              ? "رفض طلب مزوّد الخدمة"
              : "قبول طلب مزوّد الخدمة"
          }
          description={
            confirmModalOpen === "inactive"
              ? "يرجى توضيح سبب الرفض ليتم إخطار المزوّد به"
              : ""
          }
          confirmText="تأكيد"
          cancelText="إلغاء"
          onConfirm={changeProviderStatus}
          onCancel={() => setConfirmModalOpen(null)}
        />
      </Modal>
    </div>
  );
});

ActionHeader.displayName = "ActionHeader";

export default ActionHeader;
