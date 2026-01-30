import { Select } from "antd";
import { getStatusTag } from "@shared/services/sharedService";
import type { Client } from "../../../../alwaqfModel";

const DUMY_OPTIONS = [
  {
    status: "completed",
    label: "مكتملة",
  },
  {
    status: "active",
    label: "نشط",
  },
  {
    status: "inactive",
    label: "غير نشط",
  },
];
const AlwaqfHeader = ({ clientData }: { clientData?: Client }) => {
  return (
    <div className="bg-white flex flex-wrap items-center justify-between rounded-md my-4 p-4">
      <div className="flex items-center gap-4 ">
        <img
          className="w-24 h-24"
          src={clientData?.profile?.logo}
          alt="صورة العميل"
        />
        <div>
          <h2 className="text-second-primary text-2xl mb-2">
            {clientData?.name}
          </h2>
          <p className="text-base text-gray-500">{clientData?.created_at}</p>
        </div>
      </div>
      <div>
        <Select
          value={clientData?.status}
          // onChange={handleStatusChange}
          // loading={updateStatusMutation.isPending}
          // disabled={updateStatusMutation.isPending}
          className="min-w-40"
        >
          {DUMY_OPTIONS?.map((option) => (
            <Select.Option key={option.status} value={option.status}>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: getStatusTag(option?.status)?.color,
                  }}
                />
                <span>{option.label}</span>
              </div>
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default AlwaqfHeader;
