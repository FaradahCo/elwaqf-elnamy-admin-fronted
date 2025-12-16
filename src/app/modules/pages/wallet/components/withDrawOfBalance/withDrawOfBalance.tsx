import { App, Button, Modal, Upload } from "antd";
import type { WithdrawItem } from "../../wallet.model";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Confirm from "@shared/components/confirm/confirm";
import { useApiMutation } from "@shared/services/api";
import { confirmWithdraw } from "../../walletService";
import { useDispatch } from "react-redux";
import { resetSelectedWithdraw } from "@/app/store/slices/walletSlice";
import { useQueryClient } from "@tanstack/react-query";
import RejectModal from "../rejectModal/rejectModal";

interface WithDrawOfBalanceProps {
  selectedWithdrawData?: WithdrawItem;
}

const WithDrawOfBalance = ({
  selectedWithdrawData,
}: WithDrawOfBalanceProps) => {
  const [uploadedLogo, setUploadedLogo] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { message } = App.useApp();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const handleLogoUpload = (info: any) => {
    const file: File | undefined = info?.file?.originFileObj || info?.file;
    if (file) {
      setUploadedLogo(file);
    }
  };

  const handleDeleteLogo = () => {
    setUploadedLogo(null);
  };

  const handleConfirmWithdraw = () => {
    if (uploadedLogo) {
      setIsModalOpen(true);
    } else {
      message.warning("يرجى رفع الإيصال");
    }
  };
  const confirmWithdrawMutation = useApiMutation<
    { id: number | string; formData: FormData },
    any
  >((payload) => confirmWithdraw(payload.id, payload.formData), {
    onSuccess: () => {
      setIsModalOpen(false);
      dispatch(resetSelectedWithdraw());
      queryClient.invalidateQueries({ queryKey: ["withdraw/list"] });
    },
  });

  const handelSubmitConfirmWithdraw = (bool: boolean): void => {
    if (bool && uploadedLogo) {
      const formData = new FormData();
      formData.append("answer", "complete");
      formData.append("receipt", uploadedLogo as Blob);
      confirmWithdrawMutation.mutate({
        id: selectedWithdrawData?.id!,
        formData,
      });
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-second-primary text-center">
        سحب الرصيد
      </h1>
      <div className="flex items-center justify-start border border-gray-light  rounded-lg p-4 gap-5 mt-6">
        <img src="/images/empty-user.svg" alt="wallet" />
        <div>
          <p className="text-lg">{selectedWithdrawData?.owner?.name}</p>
          <span className="text-gray-500 mt-2 block">
            {selectedWithdrawData?.created_at}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <p className="">نوع المعاملة</p>
        <span className="text-gray-500 mt-3 block">سحب</span>
      </div>
      <div className="mt-4">
        <p className="">قيمة السحب الاجمالية</p>
        <span className="text-gray-500 mt-3 flex items-center gap-2">
          5,700 <img src="/images/SAR.svg" alt="wallet" />
        </span>
      </div>
      <div className="mt-4">
        <p className="">اسم حساب العميل</p>
        <span className="text-gray-500 mt-3 block">
          {selectedWithdrawData?.bank_account?.account_name}
        </span>
      </div>
      <div className="mt-4">
        <p className="">الآيبان</p>
        <span className="text-gray-500 mt-3 block">
          {selectedWithdrawData?.bank_account?.iban}
        </span>
      </div>
      <div className="mt-4">
        <p className="">الإيصال</p>
        {!uploadedLogo ? (
          <Upload
            accept="image/*"
            beforeUpload={() => false}
            maxCount={1}
            onChange={handleLogoUpload}
            showUploadList={false}
          >
            <Button
              icon={<img src="/images/upload.svg" alt="edit" />}
              size="small"
              className="bg-blue-500 hover:bg-blue-600 w-8 h-8 p-0 flex items-center justify-center mt-3"
              title="رفع الإيصال"
            />
          </Upload>
        ) : (
          <div className="relative inline-block mt-3 group w-full">
            <img
              src={URL.createObjectURL(uploadedLogo)}
              className="w-full h-32 object-cover rounded-lg"
              alt="uploaded receipt"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <Upload
                accept="image/*"
                beforeUpload={() => false}
                maxCount={1}
                onChange={handleLogoUpload}
                showUploadList={false}
              >
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  size="small"
                  className="w-8 h-8 p-0 flex items-center justify-center"
                  title="تعديل الإيصال"
                />
              </Upload>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={handleDeleteLogo}
                size="small"
                className="w-8 h-8 p-0 flex items-center justify-center"
                title="حذف الإيصال"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-5 mt-10">
        <Button type="default">رفض</Button>
        <Button type="primary" onClick={handleConfirmWithdraw}>
          تأكيد السحب
        </Button>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Confirm
          title="اعتماد سحب ارباح"
          description="سيتم اعتماد عملية سحب الأرباح وتحويل المبلغ إلى حساب المزوّد المسجل. يرجى التأكد من مطابقة المبلغ وبيانات الحساب قبل المتابعة"
          confirmText="تأكيد السحب"
          cancelText="إلغاء"
          onConfirm={(bool: boolean) => handelSubmitConfirmWithdraw(bool)}
          onCancel={() => setIsModalOpen(false)}
          loading={confirmWithdrawMutation.isPending}
        />
      </Modal>

      <Modal
        open={isRejectModalOpen}
        onCancel={() => setIsRejectModalOpen(false)}
        footer={null}
      >
        <RejectModal
          onCancel={() => setIsRejectModalOpen(false)}
          selectedBankTransferData={selectedWithdrawData}
        />
      </Modal>
    </div>
  );
};

export default WithDrawOfBalance;
