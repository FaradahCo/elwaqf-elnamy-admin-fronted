import type { PaginatedResponse } from "@shared/model/shared.model";
import { useApiQuery } from "@shared/services/api";
import { Tabs } from "antd";
import { useMemo, useState } from "react";
import type {
  PaymentClientItem,
  PaymentClientListParams,
  WithdrawItem,
} from "../../wallet.model";
import { getPaymentClients, getPaymentsProvider } from "../../walletService";
import { getTabsItems } from "./paymentConfig";

const PaymentsList = () => {
  const [filter, setFilter] = useState<PaymentClientListParams>({
    page: 1,
    per_page: 10,
  });

  const [selectedTab, setSelectedTab] = useState<string>("1");

  const { data: paymentClients } = useApiQuery<
    PaginatedResponse<PaymentClientItem>
  >(["payment-clients/list", filter], () => getPaymentClients(filter), {
    retry: false,
    enabled: !!filter && selectedTab === "1",
  });

  const { data: paymentsProvider, isLoading } = useApiQuery<
    PaginatedResponse<WithdrawItem>
  >(["payments-provider/list", filter], () => getPaymentsProvider(filter), {
    retry: false,
    enabled: !!filter && selectedTab === "2",
  });

  const onChangePaymentClientFilter = (filter: PaymentClientListParams) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...filter,
    }));
  };

  const tabsItems = useMemo(
    () =>
      getTabsItems(
        paymentClients!,
        paymentsProvider!,
        isLoading,
        onChangePaymentClientFilter
      ),
    [paymentClients?.data, paymentsProvider, isLoading]
  );

  const onChangeTab = (key: string) => {
    setSelectedTab(key);
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: 1,
    }));
  };

  return (
    <div className="mt-10 bg-white shadow rounded-lg p-4 walet-card">
      <h1 className="text-xl font-bold text-second-primary">
        جدول وبيانات المعاملات المالية
      </h1>
      <Tabs
        defaultActiveKey="1"
        items={tabsItems}
        onChange={(key) => onChangeTab(key)}
      />
    </div>
  );
};

export default PaymentsList;
