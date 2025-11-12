import CustomTable from "@shared/components/customTable/customtable";
import { paymentClientsColumns } from "./paymentConfig";
import type {
  PaymentClientItem,
  PaymentClientListParams,
} from "../../wallet.model";
import type { PaginatedResponse } from "@shared/model/shared.model";

interface PaymentClientsListProps {
  paymentClients?: PaginatedResponse<PaymentClientItem>;
  isLoading: boolean;
  onChangePaymentClientFilter: (filter: PaymentClientListParams) => void;
}

const PaymentClientsList = ({
  paymentClients,
  isLoading,
  onChangePaymentClientFilter,
}: PaymentClientsListProps) => {
  return (
    <CustomTable<PaymentClientItem>
      columns={paymentClientsColumns}
      dataSource={paymentClients?.data || []}
      className={["mt-6"]}
      showSelection={false}
      loading={isLoading}
      onPaginationChange={(page, pageSize) => {
        onChangePaymentClientFilter({ page, per_page: pageSize });
      }}
      paginationMeta={paymentClients?.meta}
    />
  );
};

export default PaymentClientsList;
