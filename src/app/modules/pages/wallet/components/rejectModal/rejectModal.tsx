import { useApiMutation } from "@shared/services/api";
import { App, Button, Checkbox, Input } from "antd";
import { useState } from "react";
import type {
  BankTransferItem,
  VerifyBankTransferPayload,
  WithdrawItem,
} from "../../wallet.model";
import { verifyBankTransfer } from "../../walletService";
import { useDispatch } from "react-redux";
import { resetSelectedBankTransfer } from "@/app/store/slices/walletSlice";
import { useQueryClient } from "@tanstack/react-query";

const { TextArea } = Input;

interface RejectBankTransferProps {
  onCancel?: () => void;
  selectedBankTransferData?: BankTransferItem | WithdrawItem;
}

const RejectModal = ({
  onCancel,
  selectedBankTransferData,
}: RejectBankTransferProps) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [otherReason, setOtherReason] = useState<string>("");
  const { message } = App.useApp();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const reasons = [
    "المبلغ لا يطابق الفاتورة/الطلب",
    "الإيصال غير واضح أو ناقص البيانات",
    "إيصال غير رسمي",
    "تحويل مكرر لنفس الطلب",
    "بيانات الحساب المحوّل إليه غير مطابقة للبيانات المعتمدة",
    "سبب آخر",
  ];

  const verifyBankTransferMutation = useApiMutation<
    VerifyBankTransferPayload,
    any
  >((payload) => verifyBankTransfer(selectedBankTransferData?.id!, payload), {
    onSuccess: () => {
      dispatch(resetSelectedBankTransfer());
      queryClient.invalidateQueries({ queryKey: ["bank-transfer/list"] });
      onCancel?.();
    },
  });

  const handleCheckboxChange = (reason: string) => {
    if (selectedReason === reason) {
      setSelectedReason("");
      setOtherReason("");
    } else {
      setSelectedReason(reason);
      setOtherReason("");
    }
  };

  const handleConfirm = () => {
    if (!selectedReason) {
      message.warning("يرجى اختيار السبب");
      return;
    }
    if (selectedReason === "سبب آخر" && !otherReason.trim()?.length) {
      message.warning("يرجى كتابة السبب");
      reasons;
    }
    verifyBankTransferMutation.mutate({
      is_approved: false,
      admin_notes: selectedReason === "سبب آخر" ? otherReason : selectedReason,
    });
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-second-primary text-center">
        رفض التحويل
      </h1>
      <p className="text-gray-600 text-center text-sm mt-4">
        سيتم رفض إثبات التحويل وإشعار العميل بسبب الرفض. هذا الإجراء لا يمكن
        التراجع عنه.
      </p>

      <div className="mt-6 space-y-4">
        {reasons.map((reason, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4">
            <Checkbox
              checked={selectedReason === reason}
              onChange={() => handleCheckboxChange(reason)}
            >
              {reason}
            </Checkbox>
          </div>
        ))}
      </div>

      {selectedReason === "سبب آخر" && (
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">
            يرجى كتابة السبب <span className="text-red-500">*</span>
          </label>
          <TextArea
            rows={4}
            value={otherReason}
            onChange={(e) => setOtherReason(e.target.value)}
            placeholder="يرجى كتابة السبب"
          />
        </div>
      )}

      <div className="flex items-center justify-end gap-5 mt-10">
        <Button
          type="default"
          onClick={onCancel}
          disabled={verifyBankTransferMutation.isPending}
          loading={verifyBankTransferMutation.isPending}
        >
          إلغاء
        </Button>
        <Button
          type="primary"
          onClick={handleConfirm}
          loading={verifyBankTransferMutation.isPending}
          disabled={verifyBankTransferMutation.isPending}
        >
          تأكيد
        </Button>
      </div>
    </div>
  );
};

export default RejectModal;
