import type { ServiceStatus } from "@shared/model/shared.model";
import { getStatusTag } from "@shared/services/sharedService";
import { Select } from "antd";

export const renderOptionsWithStatusTag = (options?: ServiceStatus[]) => {
  return (
    <>
      {options?.map((option) => (
        <Select.Option key={option?.status} value={option?.status}>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: getStatusTag(option?.status ?? "")?.color,
              }}
            />
            <span>{option?.label}</span>
          </div>
        </Select.Option>
      ))}
    </>
  );
};
