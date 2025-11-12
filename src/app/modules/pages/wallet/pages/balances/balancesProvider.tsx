import CustomTable from "@shared/components/customTable/customtable";
import type { Wallet, WalletListParams } from "../../wallet.model";
import { otherBalancesColumns } from "./balancesConfig";
import type { PaginatedResponse } from "@shared/model/shared.model";

interface BalancesProviderProps {
  providerWallets?: PaginatedResponse<Wallet>;
  isLoading: boolean;
  onChangeBalanceFilter: (filter: WalletListParams) => void;
}

const BalancesProvider = ({
  providerWallets,
  isLoading,
  onChangeBalanceFilter,
}: BalancesProviderProps) => {
  return (
    <CustomTable<Wallet>
      columns={otherBalancesColumns}
      dataSource={providerWallets?.data || []}
      className={["mt-6"]}
      showSelection={false}
      loading={isLoading}
      paginationMeta={providerWallets?.meta}
      onPaginationChange={(page, pageSize) => {
        onChangeBalanceFilter({ page, per_page: pageSize });
      }}
    />
  );
};

export default BalancesProvider;
