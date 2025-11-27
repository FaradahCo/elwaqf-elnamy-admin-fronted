import Alert from "@shared/components/alert/alert";
import { Button, Modal, Tooltip } from "antd";
import type { FormListFieldData } from "antd/es/form";
import { useState } from "react";

type ConsultationPanelHeaderProps = {
  index: number;
  remove: (index: number | number[]) => void;
  field: FormListFieldData;
  onDeleteQuestion(): void;
};

const ConsultationPanelHeader = ({
  remove,
  field,
  onDeleteQuestion,
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
              // disabled={index === 0}
              className="rounded-full! border-none! bg-transparent!"
              icon={<img src="/images/delete-icon.svg" alt="delete icon" />}
            />
          </Tooltip>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onOk={() => {
          remove(field.name);
          onDeleteQuestion();
        }}
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
