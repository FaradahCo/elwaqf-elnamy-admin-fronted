import CustomTable from "@shared/components/customTable/customtable";
import type {
  BankTransferItem,
  BankTransferListParams,
} from "../../wallet.model";
import { bankTransferListColumns } from "./walletList.config";
import type { PaginatedResponse } from "@shared/model/shared.model";

interface DepositeListProps {
  depositeList?: PaginatedResponse<BankTransferItem>;
  isLoading: boolean;
  onChangeDepositeListFilter: (filter: BankTransferListParams) => void;
}

const DepositeList = ({
  depositeList,
  isLoading,
  onChangeDepositeListFilter,
}: DepositeListProps) => {
  return (
    <CustomTable<BankTransferItem>
      columns={bankTransferListColumns}
      dataSource={depositeList?.data || []}
      className={["mt-6"]}
      showSelection={false}
      loading={isLoading}
      onPaginationChange={(page, pageSize) => {
        onChangeDepositeListFilter({ page, per_page: pageSize });
      }}
      paginationMeta={depositeList?.meta}
    />
  );
};

export default DepositeList;
