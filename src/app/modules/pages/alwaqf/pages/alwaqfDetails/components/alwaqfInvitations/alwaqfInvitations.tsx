import type { PaginatedResponse } from "@shared/model/shared.model";
import { useApiMutation } from "@shared/services/api";
import {
  getStatusTag,
  ServiceStatusEnum,
} from "@shared/services/sharedService";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Tag } from "antd";
import type { ClientInvitation } from "../../../../alwaqfModel";
import { resendClientInvitation } from "../../../../alwaqfService";

interface AlwaqfInvitationsProps {
  clientId: number;
  invitations?: ClientInvitation[];
}

const getInvitationStatusText = (invitation: ClientInvitation) => {
  if (invitation.status === ServiceStatusEnum.registered) {
    return `سجّل الوقف في ${invitation.sent_at}`;
  }

  if (invitation.resends_left_today === 0) {
    return "أُعيد الإرسال 2 مرات اليوم · يمكن الإعادة غدًا";
  }

  if (invitation.resends_left_today < 2) {
    return `أُعيد إرسال الدعوة ${invitation.sent_at} على الواتساب والبريد الإلكتروني`;
  }

  return `أُرسلت الدعوة ${invitation.sent_at} على الواتساب والبريد الإلكتروني`;
};

const AlwaqfInvitations = ({
  clientId,
  invitations,
}: AlwaqfInvitationsProps) => {
  const queryClient = useQueryClient();

  const resendMutation = useApiMutation(
    (invitationId: number) => resendClientInvitation(clientId, invitationId),
    {
      onSuccess: (updatedInvitation) => {
        queryClient.setQueryData<PaginatedResponse<ClientInvitation>>(
          ["clientInvitations", clientId],
          (prev) =>
            prev
              ? {
                  ...prev,
                  data: prev?.data?.map((item) =>
                    item.id === updatedInvitation.id ? updatedInvitation : item,
                  ),
                }
              : prev,
        );
      },
    },
  );

  return (
    <div className="flex flex-col gap-3 my-4">
      {invitations?.map((invitation) => {
        return (
          <div
            key={invitation.id}
            className="bg-white flex flex-wrap gap-4 items-start justify-between rounded-md p-4"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-primary">الدعوة</span>
                <Tag
                  className="px-2! py-1! text-[13px]! m-0!"
                  color={getStatusTag(invitation.status)?.color}
                >
                  {invitation.status_label}
                </Tag>
              </div>

              <p className="text-sm text-gray-800">
                {getInvitationStatusText(invitation)}
              </p>

              <p className="text-xs text-gray-500">
                من {invitation.provider_name} (مزود خدمة) · {invitation.sent_at}
              </p>
            </div>

            {invitation?.can_resend && (
              <Button
                type="link"
                className="text-second-primary! p-0! h-auto! font-medium"
                loading={
                  resendMutation.isPending &&
                  resendMutation.variables === invitation.id
                }
                disabled={resendMutation.isPending}
                onClick={() => resendMutation.mutate(invitation.id)}
              >
                إعادة الإرسال
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AlwaqfInvitations;
