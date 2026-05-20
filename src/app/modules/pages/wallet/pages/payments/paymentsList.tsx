import type {
  PaginatedResponse,
  ServiceStatus,
} from "@shared/model/shared.model";
import { useApiQuery } from "@shared/services/api";
import { Tabs } from "antd";
import { useMemo, useState } from "react";
import type {
  PaymentClientItem,
  PaymentClientListParams,
  WithdrawItem,
} from "../../wallet.model";
import {
  getPaymentClients,
  getPaymentsProvider,
  getPaymentsStatus,
  getWithdrawalsStatus,
} from "../../walletService";
import { getTabsItems } from "./paymentConfig";
import CustomFilter, {
  type CustomFilterType,
} from "@shared/components/custom-filter/custom-filter";
import { renderOptionsWithStatusTag } from "@/app/utilites/optionsWithStatusTag/optionsWithStatusTag";

const PaymentsList = () => {
  const [filter, setFilter] = useState<PaymentClientListParams>({
    page: 1,
    per_page: 10,
  });

  const [selectedTab, setSelectedTab] = useState<string>("1");

  const { data: paymentsStatus } = useApiQuery(
    ["payments-status/filter"],
    getPaymentsStatus,
    {
      retry: false,
      enabled: selectedTab === "1",
    },
  );

  const { data: withdrawalsStatus } = useApiQuery(
    ["withdrawals-status/filter"],
    getWithdrawalsStatus,
    {
      retry: false,
      enabled: selectedTab === "2",
    },
  );

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
        onChangePaymentClientFilter,
      ),
    [paymentClients, paymentsProvider, isLoading],
  );

  const onChangeTab = (key: string) => {
    setSelectedTab(key);
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: 1,
      status: undefined,
    }));
  };

  const withdrawalsStatusOptions = useMemo(
    () =>
      withdrawalsStatus?.map((item) => ({
        label: item?.label,
        status: item?.key,
      })) as ServiceStatus[],
    [withdrawalsStatus],
  );

  const paymentsStatusOptions = useMemo(
    () =>
      paymentsStatus?.map((item) => ({
        label: item?.label,
        status: item?.key,
      })) as ServiceStatus[],
    [paymentsStatus],
  );
  const filters = useMemo(
    () => [
      {
        type: "select" as CustomFilterType,
        placeholder: "اختر الحالة",
        label: "الحالة",
        name: "status",
        options: renderOptionsWithStatusTag(
          selectedTab === "1"
            ? paymentsStatusOptions
            : withdrawalsStatusOptions,
        ),
      },
    ],
    [
      filter?.status,
      paymentsStatusOptions,
      withdrawalsStatusOptions,
      selectedTab,
    ],
  );

  return (
    <div className="mt-10 bg-white shadow rounded-lg p-4 walet-card">
      <h1 className="text-xl font-bold text-primary">
        جدول وبيانات المعاملات المالية
      </h1>
      <div className="w-16 h-1 bg-primary mt-2 rounded mb-10"></div>
      <CustomFilter
        key={selectedTab}
        filters={filters}
        onFilterChange={onChangePaymentClientFilter}
      />
      <Tabs
        defaultActiveKey="1"
        items={tabsItems}
        onChange={(key) => onChangeTab(key)}
      />
    </div>
  );
};

export default PaymentsList;
