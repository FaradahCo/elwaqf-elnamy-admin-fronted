import Alert from "@shared/components/alert/alert";
import { Button, Modal, Tooltip } from "antd";
import { useState } from "react";

type ConsultationPanelHeaderProps = {
  onDeleteQuestion(): void;
  isDeleting: boolean;
};

const ConsultationPanelHeader = ({
  onDeleteQuestion,
  isDeleting,
}: ConsultationPanelHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-4">
        <h3 className="flex items-center gap-3">
          <span className="text-base font-medium">السؤال</span>
        </h3>
        <div className="flex items-center gap-2">
          <Tooltip placement="right" title="حذف">
            <Button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="rounded-full! border-none! bg-transparent!"
              icon={<img src="/images/delete-icon.svg" alt="delete icon" />}
            />
          </Tooltip>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        okButtonProps={{
          loading: isDeleting,
          disabled: isDeleting,
        }}
        cancelButtonProps={{
          loading: isDeleting,
          disabled: isDeleting,
        }}
        onOk={onDeleteQuestion}
        onCancel={() => setIsModalOpen(false)}
      >
        <Alert
          title="هل انت متأكد من حذف هذا السؤال؟"
          description="سيتم حذف السؤال نهائيا"
          alertIcon="/images/delete-icon.svg"
        />
      </Modal>
    </>
  );
};

export default ConsultationPanelHeader;
