import { Checkbox, Modal, Tag } from "antd";
import { Link } from "react-router";
import type { ConsultantItem } from "../../model/consultantsManagementModel";
import { getStatusTag } from "@shared/services/sharedService";
import Alert from "@shared/components/alert/alert";
import { useState } from "react";

const ConsultationManagementItem = ({
  consultant,
  onUpdateConsultantStatus,
}: {
  consultant: ConsultantItem;
  onUpdateConsultantStatus: (
    payload: {
      team_id: number;
      status: string;
    },
    options?: { onSuccess: () => void }
  ) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(
    consultant.status === "active"
    // consultant.is_consultant === 1
  );
  return (
    <div className="border border-gray-200 rounded-lg p-4 text-center flex flex-col justify-center items-center gap-4">
      <main className="flex flex-col justify-center items-center">
        <img
          src={consultant.logo || "/images/empty-user.svg"}
          alt=""
          title="شعار سنا"
          className="w-30 h-30 object-cover"
        />
        <p className="mt-2 text-second-primary font-bold">
          {consultant.business_name}
          <Tag color={getStatusTag(consultant.status).color} className="mx-2!">
            {consultant.status_label}
          </Tag>
        </p>
        <p className="text-gray-text text-[12px]">{consultant.created_at}</p>
      </main>
      <div className="flex justify-start flex-wrap items-start gap-2 w-full">
        {consultant.fields.map((field) => (
          <div
            key={field.id}
            className="border border-second-primary rounded-xl p-1 bg-gray-50"
          >
            {field.name}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center gap-2 w-full">
        <Link
          to={""}
          className="text-primary! hover:text-primary-dark! underline!"
        >
          عرض الحساب
        </Link>
        <Checkbox
          onClick={() => setIsModalOpen(true)}
          checked={isCheckboxChecked}
        >
          تعيين كمستشار
        </Checkbox>
        <Modal
          open={isModalOpen}
          onOk={() =>
            onUpdateConsultantStatus(
              {
                team_id: consultant.team_id,
                // status: consultant.is_consultant === 1 ? "inactive" : "active",
                status: consultant.status === "active" ? "inactive" : "active",
              },
              {
                onSuccess: () => {
                  setIsModalOpen(false);
                  setIsCheckboxChecked(
                    (isCheckboxChecked) => !isCheckboxChecked
                  );
                },
              }
            )
          }
          onCancel={() => {
            setIsModalOpen(false);
            setIsCheckboxChecked((isCheckboxChecked) => isCheckboxChecked);
          }}
        >
          <>
            <Alert
              title="هل انت متأكد؟"
              description={`${
                consultant.status === "active"
                  ? "بإلغاء تعيين هذا الفريق كمستشار، فلن يتمكن من الوصول إلى ميزات المستشارين."
                  : "بتعيين هذا الفريق كمستشار، فسوف يتمكن من الوصول إلى ميزات المستشارين."
              } `}
              alertIcon="/images/approved.svg"
            />
          </>
        </Modal>
      </div>
    </div>
  );
};

export default ConsultationManagementItem;
