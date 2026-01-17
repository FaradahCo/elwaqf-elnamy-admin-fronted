import CustomTable from "@shared/components/customTable/customtable";
import { confirmationRequestsColumns } from "./confirmationRequestsTableColumns";
import { Link } from "react-router";
import { useApiQuery } from "@shared/services/api";
import type { ApprovelRequests } from "../../dashboardModel";
import { getApprovelRequests } from "../../dashboardService";
import { useMemo } from "react";

const ConfirmationRequestsTable = () => {
  const { data: approvalRequests } = useApiQuery<ApprovelRequests>(
    ["dashboardApprovalRequests"],
    getApprovelRequests,
    {
      retry: false,
    }
  );
  const combinedRequests = useMemo(
    () => [
      ...(approvalRequests?.withdrawals?.items ?? []),
      ...(approvalRequests?.bank_transfers?.items ?? []),
    ],
    [approvalRequests?.withdrawals, approvalRequests?.bank_transfers]
  );
  return (
    <div className="mt-8 overflow-auto">
      <h2 className="font-semibold text-2xl mb-4">طلبات الاعتماد</h2>
      <CustomTable
        className={["divide-y", "divide-gray-100"]}
        showSelection={false}
        dataSource={combinedRequests}
        columns={confirmationRequestsColumns}
        showPagination={false}
        footer={
          <div className="flex justify-end">
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
