import CustomTable from "@shared/components/customTable/customtable";
import { paymentsProviderColumns } from "./paymentConfig";
import type { WithdrawItem, WithdrawListParams } from "../../wallet.model";
import type { PaginatedResponse } from "@shared/model/shared.model";

interface PaymentsProviderProps {
  paymentsProvider?: PaginatedResponse<WithdrawItem>;
  isLoading: boolean;
  onChangePaymentProviderFilter: (filter: WithdrawListParams) => void;
}

const PaymentsProvider = ({
  paymentsProvider,
  isLoading,
  onChangePaymentProviderFilter,
}: PaymentsProviderProps) => {
  return (
    <CustomTable<WithdrawItem>
      columns={paymentsProviderColumns}
      dataSource={paymentsProvider?.data || []}
      className={["mt-6"]}
      showSelection={false}
      loading={isLoading}
      onPaginationChange={(page, pageSize) => {
        onChangePaymentProviderFilter({ page, per_page: pageSize });
      }}
      paginationMeta={paymentsProvider?.meta}
    />
  );
};

export default PaymentsProvider;
