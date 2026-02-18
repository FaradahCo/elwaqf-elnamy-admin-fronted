import { Button } from "antd";

type ConfirmProps = {
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  loading?: boolean;
  confirmIcon?: string;
  onConfirm: (bool: boolean) => void;
  onCancel: () => void;
};

const Confirm = ({
  title,
  description,
  confirmText,
  cancelText,
  loading,
  confirmIcon,
  onConfirm,
  onCancel,
}: ConfirmProps) => {
  return (
    <>
      <div className="text-center">
        {confirmIcon && (
          <img src={confirmIcon} alt="confirm" className="w-10 h-10 mx-auto" />
        )}
        <h1 className="mt-4 font-bold text-xl">{title}</h1>
        <p className="mt-3 text-[13px] text-gray-500">{description}</p>
      </div>
      <div className="flex justify-center items-center gap-5 mt-10">
        <Button
          type="primary"
          onClick={() => onConfirm(true)}
          loading={loading}
          disabled={loading}
        >
          {confirmText}
        </Button>
        <Button onClick={onCancel} loading={loading} disabled={loading}>
          {cancelText}
        </Button>
      </div>
    </>
  );
};

export default Confirm;
