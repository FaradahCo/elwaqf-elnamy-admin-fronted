import CustomTable from "@shared/components/customTable/customtable";
import { confirmationRequestsColumns } from "./confirmationRequestsTableColumns";

const ConfirmationRequestsTable = ({
  latest_orders,
}: {
  latest_orders?: [];
}) => {
  return (
    <div className="mt-8 overflow-auto">
      <h2 className="font-semibold text-2xl mb-4">طلبات الاعتماد</h2>
      <CustomTable
        className={["divide-y", "divide-gray-100"]}
        showSelection={false}
        dataSource={latest_orders ?? []}
        columns={confirmationRequestsColumns}
        showPagination={false}
        footer={
          <div className="flex justify-end">
            <div className="flex items-center gap-2">
              <img
                className="cursor-pointer"
                src="images/link-square.svg"
                alt="رؤية المزيد"
              />
              <button className="text-primary cursor-pointer">
                رؤية المزيد
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ConfirmationRequestsTable;
