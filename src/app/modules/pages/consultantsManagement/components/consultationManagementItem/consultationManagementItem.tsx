import { Checkbox, Form, Input, Tag } from "antd";
import { Link } from "react-router";
import type { ConsultantItem } from "../../model/consultantsManagementModel";
import { getStatusTag } from "@shared/services/sharedService";
const ConsultationManagementItem = ({
  consultant,
  index,
}: {
  consultant: ConsultantItem;
  index: number;
}) => {
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
          to={`/admin/consultants-management/${consultant.team_id}`}
          className="text-primary! hover:text-primary-dark! underline!"
        >
          عرض الحساب
        </Link>
        <Form.Item
          name={["items", index, "team_id"]}
          initialValue={consultant.team_id}
          hidden
        >
          <Input type="hidden" />
        </Form.Item>

        <Form.Item
          name={["items", index, "is_consultant"]}
          valuePropName="checked"
          initialValue={!!consultant.is_consultant}
          noStyle
        >
          <Checkbox>تعيين كمستشار</Checkbox>
        </Form.Item>
      </div>
    </div>
  );
};

export default ConsultationManagementItem;
