import CustomTable from "@shared/components/customTable/customtable";
import { confirmationRequestsColumns } from "./confirmationRequestsTableColumns";
import { Link } from "react-router";
import { useApiQuery } from "@shared/services/api";
import type { ApprovelRequests } from "../../dashboardModel";
import { getApprovelRequests } from "../../dashboardService";
import { useMemo, useState } from "react";
import { Select } from "antd";

const ConfirmationRequestsTable = () => {
  const [selectedOption, setSelectedOption] = useState("withdrawals");
  const { data: approvalRequests } = useApiQuery<ApprovelRequests>(
    ["dashboardApprovalRequests"],
    getApprovelRequests,
    {
      retry: false,
    },
  );
  const combinedRequests = useMemo(
    () =>
      selectedOption === "withdrawals"
        ? [...(approvalRequests?.withdrawals?.items ?? [])]
        : [...(approvalRequests?.bank_transfers?.items ?? [])],

    [
      approvalRequests?.withdrawals,
      approvalRequests?.bank_transfers,
      selectedOption,
    ],
  );
  return (
    <div className="mt-4 bg-white overflow-auto p-2 rounded-sm ">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl mb-4">طلبات الاعتماد</h2>
        <Select
          defaultValue="withdrawals"
          className="w-24"
          onChange={(value) => setSelectedOption(value)}
          options={[
            { value: "withdrawals", label: "سحب" },
            { value: "bank_transfers", label: "إيداع" },
          ]}
        />
      </div>
      <CustomTable
        // className={["divide-y", "divide-gray-100"]}
        showSelection={false}
        dataSource={combinedRequests}
        columns={confirmationRequestsColumns}
        showPagination={false}
        footer={
          <div className="flex justify-end bg-transparent!">
            <Link to="wallet" className="flex items-center gap-2">
              <img
                className="cursor-pointer"
                src="images/link-square.svg"
                alt="رؤية المزيد"
              />
              <button className="text-primary cursor-pointer">
                رؤية المزيد
              </button>
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default ConfirmationRequestsTable;
