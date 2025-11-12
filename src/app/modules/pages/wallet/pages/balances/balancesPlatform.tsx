import CustomTable from "@shared/components/customTable/customtable";
import { balancesColumns } from "./balancesConfig";
import type { Wallet, WalletListParams } from "../../wallet.model";
import type { PaginatedResponse } from "@shared/model/shared.model";

interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  total: number;
  per_page: number;
}

interface BalancesPlatformProps {
  platformWallets?: PaginatedResponse<Wallet>;
  isLoading: boolean;
  onChangeBalanceFilter: (filter: WalletListParams) => void;
  paginationMeta?: PaginationMeta;
}

const BalancesPlatform = ({
  platformWallets,
  isLoading,
  onChangeBalanceFilter,
}: BalancesPlatformProps) => {
  return (
    <CustomTable<Wallet>
      columns={balancesColumns}
      dataSource={platformWallets?.data || []}
      className={["mt-6"]}
      showSelection={false}
      loading={isLoading}
      paginationMeta={platformWallets?.meta}
      onPaginationChange={(page, pageSize) => {
        onChangeBalanceFilter({ page, per_page: pageSize });
      }}
    />
  );
};

export default BalancesPlatform;
