import CustomTable from "@shared/components/customTable/customtable";
import type { Wallet, WalletListParams } from "../../wallet.model";
import { otherBalancesColumns } from "./balancesConfig";
import type { PaginatedResponse } from "@shared/model/shared.model";

interface BalancesClientProps {
  clientWallets?: PaginatedResponse<Wallet>;
  isLoading: boolean;
  onChangeBalanceFilter: (filter: WalletListParams) => void;
}

const BalancesClient = ({
  clientWallets,
  isLoading,
  onChangeBalanceFilter,
}: BalancesClientProps) => {
  return (
    <CustomTable<Wallet>
      columns={otherBalancesColumns}
      dataSource={clientWallets?.data || []}
      className={["mt-6"]}
      showSelection={false}
      loading={isLoading}
      paginationMeta={clientWallets?.meta}
      onPaginationChange={(page, pageSize) => {
        onChangeBalanceFilter({ page, per_page: pageSize });
      }}
    />
  );
};

export default BalancesClient;
