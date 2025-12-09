import { Button, Modal } from "antd";
import type {
  BankTransferItem,
  VerifyBankTransferPayload,
} from "../../wallet.model";
import { useState } from "react";
import Confirm from "@shared/components/confirm/confirm";
import { verifyBankTransfer } from "../../walletService";
import { useApiMutation } from "@shared/services/api";
import { useDispatch } from "react-redux";
import { resetSelectedBankTransfer } from "@/app/store/slices/walletSlice";
import { useQueryClient } from "@tanstack/react-query";
import RejectModal from "../rejectModal/rejectModal";

interface TransactionVerficationProps {
  selectedBankTransferData?: BankTransferItem;
}

const TransactionVerfication = ({
  selectedBankTransferData,
}: TransactionVerficationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const verifyBankTransferMutation = useApiMutation<
    VerifyBankTransferPayload,
    any
  >((payload) => verifyBankTransfer(selectedBankTransferData?.id!, payload), {
    onSuccess: () => {
      setIsModalOpen(false);
      dispatch(resetSelectedBankTransfer());
      queryClient.invalidateQueries({ queryKey: ["bank-transfer/list"] });
    },
  });

  return (
    <div>
      <h1 className="text-xl font-bold text-second-primary text-center">
        التحقق من صحة التحويل
      </h1>

      <div className="mt-4">
        <p className="">تاريخ المعاملة</p>
        <span className="text-gray-500 mt-3 block">
          {selectedBankTransferData?.created_at}
        </span>
      </div>
      <div className="mt-4">
        <p className="">نوع المعاملة</p>
        <span className="text-gray-500 mt-3 flex items-center gap-2">
          {selectedBankTransferData?.payment?.payment_method_label}
        </span>
      </div>
      <div className="mt-4">
        <p className="">قيمة التحويل</p>
        <span className="text-gray-500 mt-3 flex items-center gap-2">
          {selectedBankTransferData?.payment?.total_paid}
          <img src="/images/SAR.svg" alt="wallet" />
        </span>
      </div>
      <div className="mt-4">
        <p className="">اسم صاحب الحساب الذي تم التحويل منه</p>
        <span className="text-gray-500 mt-3 block">
          {selectedBankTransferData?.sender_name}
        </span>
      </div>
      <div className="mt-4">
        <p className="">صورة الايصال</p>
        <img
          src={selectedBankTransferData?.transfer_receipt?.url}
          alt="wallet"
        />
      </div>

      <div className="flex items-center justify-end gap-5 mt-10">
        <Button type="default" onClick={() => setIsRejectModalOpen(true)}>
          رفض
        </Button>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          الموافقة
        </Button>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Confirm
          title="سحب الأرباح"
          description="سيتم اعتماد عملية سحب الأرباح وتحويل المبلغ إلى حساب المزوّد المسجل. يرجى التأكد من مطابقة المبلغ وبيانات الحساب قبل المتابعة"
          confirmText="تأكيد السحب"
          cancelText="إلغاء"
          onConfirm={(bool: boolean) =>
            verifyBankTransferMutation.mutate({
              is_approved: bool,
              admin_notes: "",
            })
          }
          loading={verifyBankTransferMutation.isPending}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <Modal
        open={isRejectModalOpen}
        onCancel={() => setIsRejectModalOpen(false)}
        footer={null}
      >
        <RejectModal
          onCancel={() => setIsRejectModalOpen(false)}
          selectedBankTransferData={selectedBankTransferData}
        />
      </Modal>
    </div>
  );
};

export default TransactionVerfication;
