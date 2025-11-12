import CustomTable from "@shared/components/customTable/customtable";
import { withDrawListColumns } from "./walletList.config";
import type { WithdrawItem, WithdrawListParams } from "../../wallet.model";
import type { PaginatedResponse } from "@shared/model/shared.model";

interface WithdrawListProps {
  withdrawList?: PaginatedResponse<WithdrawItem>;
  isLoading: boolean;
  onChangeWithdrawListFilter: (filter: WithdrawListParams) => void;
}

export const WithdrawList = ({
  withdrawList,
  isLoading,
  onChangeWithdrawListFilter,
}: WithdrawListProps) => {
  return (
    <CustomTable<WithdrawItem>
      columns={withDrawListColumns}
      dataSource={withdrawList?.data || []}
      className={["mt-6"]}
      showSelection={false}
      loading={isLoading}
      onPaginationChange={(page, pageSize) => {
        onChangeWithdrawListFilter({ page, per_page: pageSize });
      }}
      paginationMeta={withdrawList?.meta}
    />
  );
};

export default WithdrawList;
