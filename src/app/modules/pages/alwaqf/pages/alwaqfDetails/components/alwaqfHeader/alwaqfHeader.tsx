import { Image, Select } from "antd";
import {
  getStatusTag,
  ServiceStatusEnum,
} from "@shared/services/sharedService";
import type { AlwaqfStatus, Client } from "../../../../alwaqfModel";
import { useApiMutation } from "@shared/services/api";
import { updateAlwaqfStatus } from "../../../../alwaqfService";
const AlwaqfHeader = ({
  clientData,
  alwaqfStatus,
}: {
  clientData?: Client;
  alwaqfStatus?: AlwaqfStatus[];
}) => {
  const updateStatusMutation = useApiMutation((status) => {
    status;
    return updateAlwaqfStatus(clientData?.id!, {
      status: status as ServiceStatusEnum,
    });
  });
  const handleStatusChange = (newStatus: ServiceStatusEnum) => {
    updateStatusMutation.mutate(newStatus);
  };
  return (
    <div className="bg-white flex flex-wrap gap-4 items-center justify-between rounded-md my-4 p-4">
      <div className="flex items-center gap-4 ">
        <Image
          width={100}
          alt="صورة العميل"
          src={clientData?.image ?? "/images/empty-user.svg"}
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
          defaultValue={clientData?.status as ServiceStatusEnum}
          onChange={handleStatusChange}
          // loading={updateStatusMutation.isPending}
          // disabled={updateStatusMutation.isPending}
          className="min-w-40"
        >
          {alwaqfStatus?.map((option) => (
            <Select.Option key={option.status} value={option.status}>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: getStatusTag(option?.status!)?.color,
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
