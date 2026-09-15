import type { Provider } from "@/app/modules/pages/followRequests/model/followRequestsModel";
import { App, Button, Image, Input, Modal, Tag } from "antd";
import { memo, useState } from "react";
import {
  ServiceStatusEnum,
  getStatusTag,
} from "@shared/services/sharedService";
import Confirm from "@shared/components/confirm/confirm";
import { updateServiceProviderStatus } from "../../../../serviceProvidersServices";
import { useApiMutation } from "@shared/services/api";
import { useQueryClient } from "@tanstack/react-query";

const { TextArea } = Input;

const ActionHeader = memo(({ providerData }: { providerData: Provider }) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState<
    "active" | "inactive" | "disable" | null
  >(null);
  const [rejectReason, setRejectReason] = useState("");
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const teamId = providerData?.profile?.at(0)?.team_id;

  const updateStatusMutation = useApiMutation(
    ({ status, note }: { status: ServiceStatusEnum; note?: string }) => {
      return updateServiceProviderStatus(teamId!, {
        status,
        ...(note ? { note } : {}),
      });
    },
    {
      onSuccess: (res) => {
        queryClient.setQueryData(["provider-data", teamId], res);
        setConfirmModalOpen(null);
        setRejectReason("");
      },
    },
  );

  const closeModal = () => {
    setConfirmModalOpen(null);
    setRejectReason("");
  };

  const changeProviderStatus = () => {
    if (!teamId) return;

    if (confirmModalOpen === "inactive" || confirmModalOpen === "disable") {
      if (!rejectReason.trim()) {
        message.warning("يرجى إدخال سبب الرفض");
        return;
      }
      updateStatusMutation.mutate({
        status: ServiceStatusEnum.inactive,
        note: rejectReason.trim(),
      });
      return;
    }

    updateStatusMutation.mutate({
      status: ServiceStatusEnum.active,
    });
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
          <p className="text-lg font-bold mb-2">
            {providerData?.profile?.[0]?.business_name}
          </p>
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
              disabled={updateStatusMutation.isPending}
              loading={updateStatusMutation.isPending}
            >
              قبول
            </Button>
            <Button
              className="bg-error! text-white! py-4!"
              onClick={() => setConfirmModalOpen("inactive")}
              disabled={updateStatusMutation.isPending}
              loading={updateStatusMutation.isPending}
            >
              رفض
            </Button>
          </>
        )}
        {providerData?.status !== ServiceStatusEnum.review &&
          providerData?.status !== ServiceStatusEnum.inactive && (
            <Button
              className="bg-error! text-white! py-4!"
              onClick={() => setConfirmModalOpen("disable")}
              disabled={updateStatusMutation.isPending}
              loading={updateStatusMutation.isPending}
            >
              تعطيل
            </Button>
          )}
        {providerData?.status !== ServiceStatusEnum.review && (
          <Tag
            className="py-1! px-4!"
            color={getStatusTag(providerData?.status ?? "").color}
          >
            <span className="text-sm">{providerData?.status_label}</span>
          </Tag>
        )}
      </div>

      <Modal
        open={confirmModalOpen === "active"}
        onCancel={closeModal}
        footer={null}
      >
        <Confirm
          title="قبول طلب مزوّد الخدمة"
          description=""
          confirmText="تأكيد"
          cancelText="إلغاء"
          onConfirm={changeProviderStatus}
          onCancel={closeModal}
          loading={updateStatusMutation.isPending}
        />
      </Modal>

      <Modal
        open={confirmModalOpen === "inactive" || confirmModalOpen === "disable"}
        onCancel={closeModal}
        footer={null}
      >
        <Confirm
          confirmIcon="/images/cancel-circle.svg"
          title={
            confirmModalOpen === "inactive"
              ? "رفض طلب مزوّد الخدمة"
              : "تعطيل مزوّد الخدمة"
          }
          description={
            confirmModalOpen === "inactive"
              ? "يرجى توضيح سبب الرفض ليتم إخطار المزوّد به"
              : "يرجى توضيح سبب التعطيل ليتم إخطار المزوّد به"
          }
          confirmText="تأكيد"
          cancelText="إلغاء"
          onConfirm={changeProviderStatus}
          onCancel={closeModal}
          loading={updateStatusMutation.isPending}
        >
          <div className="mt-6 text-right">
            <label className="mb-2 block text-sm font-medium">
              سبب {confirmModalOpen === "inactive" ? "الرفض" : "التعطيل"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <TextArea
              rows={8}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder={
                confirmModalOpen === "inactive"
                  ? "اكتب سبب الرفض هنا..."
                  : "اكتب سبب التعطيل هنا..."
              }
              className="min-h-40!"
            />
          </div>
        </Confirm>
      </Modal>
    </div>
  );
});

ActionHeader.displayName = "ActionHeader";

export default ActionHeader;
