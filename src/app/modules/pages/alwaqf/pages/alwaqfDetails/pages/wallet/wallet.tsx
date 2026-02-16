import { useOutletContext } from "react-router";
import type {
  AlwaqfServiceQuery,
  Client,
  Wallet,
} from "../../../../alwaqfModel";
import { getAlWaqfPayments, getAlWaqfWallet } from "../../../../alwaqfService";
import { useApiQuery } from "@shared/services/api";
import type { PaginatedResponse } from "@shared/model/shared.model";
import type { PaymentClientItem } from "@/app/modules/pages/wallet/wallet.model";
import { useListHook } from "@/app/hooks/listHook";
import CustomTable from "@shared/components/customTable/customtable";
import { walletConfigCollumns } from "./walletConfig";

const Wallet = () => {
  const clientData = useOutletContext<Client>();
  const { data: wallet } = useApiQuery(
    ["alwaqfWallet"],
    () => getAlWaqfWallet(clientData?.id),
    { retry: false },
  );

  const {
    data: payments,
    isLoading,
    handlePaginationChange,
  } = useListHook<PaginatedResponse<PaymentClientItem>, AlwaqfServiceQuery>({
    queryKey: "alwaqfPayments",
    fetchFn: (filter) => getAlWaqfPayments(clientData?.id, filter),
    initialFilter: {
      page: 1,
      per_page: 10,
    },
    queryOptions: { retry: false },
  });
  return (
    <div className="px-4 bg-white rounded-md">
      <div className="flex items-center gap-4 flex-wrap justify-between">
        <div className="flex flex-col gap-5 text-2xl">
          <h2>إجمالي المدفوعات</h2>
          <p className="text-second-primary text-4xl">
            {wallet?.total_transactions}
            <span className="inline-block">
              <img className="h-6 w-6" src="/images/SAR.svg" alt="ريال سعودي" />
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-5 text-2xl p-4">
          <h2>رصيد المحفظة</h2>
          <p className="text-second-primary text-4xl">
            {wallet?.available_balance}
            <span className="inline-block">
              <img className="h-6 w-6" src="/images/SAR.svg" alt="ريال سعودي" />
            </span>
          </p>
        </div>
      </div>
      <h1 className="text-2xl text-second-primary font-semibold">
        المعاملات المالية
      </h1>
      <div className="w-16 h-1 bg-primary mt-2 rounded mb-10"></div>
      <CustomTable
        columns={walletConfigCollumns}
        dataSource={payments?.data ?? []}
        showSelection={false}
        className={["mt-6 overflow-x-auto"]}
        loading={isLoading}
        paginationMeta={payments?.meta}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
};
export default Wallet;
