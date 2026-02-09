import { Image, Select } from "antd";
import {
  getStatusTag,
  ServiceStatusEnum,
} from "@shared/services/sharedService";
import type { Client } from "../../../../alwaqfModel";
import { useApiMutation } from "@shared/services/api";
import { updateAlwaqfStatus } from "../../../../alwaqfService";
import type { ServiceStatus } from "@shared/model/shared.model";
import { renderOptionsWithStatusTag } from "@/app/utilites/optionsWithStatusTag/optionsWithStatusTag";
const AlwaqfHeader = ({
  clientData,
  alwaqfStatus,
}: {
  clientData?: Client;
  alwaqfStatus?: ServiceStatus[];
}) => {
  const updateStatusMutation = useApiMutation((status) =>
    updateAlwaqfStatus(clientData?.id!, {
      status: status as ServiceStatusEnum,
    }),
  );
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
          loading={updateStatusMutation.isPending}
          disabled={updateStatusMutation.isPending}
          className="min-w-40"
        >
          {renderOptionsWithStatusTag(alwaqfStatus)}
        </Select>
      </div>
    </div>
  );
};

export default AlwaqfHeader;
