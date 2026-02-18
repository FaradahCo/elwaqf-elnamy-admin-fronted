import { useListHook } from "@/app/hooks/listHook";
import CustomTable from "@shared/components/customTable/customtable";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { useApiQuery } from "@shared/services/api";
import { useOutletContext } from "react-router";
import {
  getProviderWallet,
  getProviderWithdrawals,
} from "../../../../serviceProvidersServices";
import type { Provider } from "@/app/modules/pages/followRequests/model/followRequestsModel";
import type { WithdrawItem } from "@/app/modules/pages/wallet/wallet.model";
import type { ServiceProvidersListFilterQuery } from "../../../../serviceProviders.model";
import { walletConfigColumns } from "./walletConfig";

const Wallet = () => {
  const providerData = useOutletContext<Provider>();
  const { data: wallet } = useApiQuery(
    ["providerWallet"],
    () => getProviderWallet(providerData?.profile?.at(0)?.team_id!),
    { retry: false },
  );

  const {
    data: withdrawals,
    isLoading,
    handlePaginationChange,
  } = useListHook<
    PaginatedResponse<WithdrawItem>,
    ServiceProvidersListFilterQuery
  >({
    queryKey: "providerWithdrawals",
    fetchFn: (filter) =>
      getProviderWithdrawals(providerData?.profile?.at(0)?.team_id!, filter),
    initialFilter: {
      page: 1,
      per_page: 10,
    },
    queryOptions: { retry: false },
  });
  return (
    <div className="px-4 bg-white rounded-md">
      <div className="flex gap-10 flex-wrap py-4 justify-between items-center">
        <div className="flex gap-10">
          <div className="flex border items-center bg-gray-50 border-gray-200 p-4 rounded-3xl flex-col gap-5 text-2xl text-second-primary font-semibold">
            <h2>الرصيد الإجمالي</h2>
            <p className="text-4xl">
              {wallet?.total_balance}
              <span className="inline-block">
                <img
                  className="h-6 w-6"
                  src="/images/SAR.svg"
                  alt="ريال سعودي"
                />
              </span>
            </p>
          </div>
          <div className="flex border items-center bg-gray-50 border-gray-200 p-4 rounded-3xl flex-col gap-5 text-2xl text-second-primary font-semibold">
            <h2>الرصيد المتاح</h2>
            <p className="text-second-primary text-4xl">
              {wallet?.available_balance}
              <span className="inline-block">
                <img
                  className="h-6 w-6"
                  src="/images/SAR.svg"
                  alt="ريال سعودي"
                />
              </span>
            </p>
          </div>
        </div>
        <div className="flex border items-center bg-gray-50 border-gray-200 rounded-3xl flex-col gap-5 text-2xl p-4 text-second-primary font-semibold">
          <h2>الرصيد المعلق</h2>
          <p className="text-second-primary text-4xl">
            {wallet?.pending_balance}
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
        columns={walletConfigColumns}
        dataSource={withdrawals?.data ?? []}
        showSelection={false}
        className={["mt-6 overflow-x-auto"]}
        loading={isLoading}
        paginationMeta={withdrawals?.meta}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
};

export default Wallet;
