import { App, Button, Checkbox, Input } from "antd";
import { useState } from "react";
import type { BankTransferItem, WithdrawItem } from "../../wallet.model";

const { TextArea } = Input;

interface RejectBankTransferProps {
  onCancel?: () => void;
  onConfirm?: (reason: string) => void;
  selectedBankTransferData?: BankTransferItem | WithdrawItem;
  reasons: string[];
  title: string;
  subTitle: string;
  isPending: boolean;
}

const RejectModal = ({
  title,
  subTitle,
  onCancel,
  onConfirm,
  isPending,

  reasons,
}: RejectBankTransferProps) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [otherReason, setOtherReason] = useState<string>("");
  const { message } = App.useApp();

  const handleCheckboxChange = (reason: string) => {
    if (selectedReason === reason) {
      setSelectedReason("");
      setOtherReason("");
    } else {
      setSelectedReason(reason);
      setOtherReason("");
    }
  };

  const handelConfirm = () => {
    if (!selectedReason) {
      message.warning("يرجى اختيار السبب");
      return;
    }
    if (selectedReason === "سبب آخر" && !otherReason.trim()?.length) {
      message.warning("يرجى كتابة السبب");
      return;
    }

    onConfirm?.(selectedReason === "سبب آخر" ? otherReason : selectedReason);
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-second-primary text-center">
        {title}
      </h1>
      <p className="text-gray-600 text-center text-sm mt-4">{subTitle}</p>

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
          disabled={isPending}
          loading={isPending}
        >
          إلغاء
        </Button>
        <Button
          type="primary"
          onClick={handelConfirm}
          loading={isPending}
          disabled={isPending}
        >
          تأكيد
        </Button>
      </div>
    </div>
  );
};

export default RejectModal;
