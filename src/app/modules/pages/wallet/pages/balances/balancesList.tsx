import { useApiQuery } from "@shared/services/api";
import { Tabs } from "antd";
import { useCallback, useMemo, useState } from "react";
import type { Wallet, WalletListParams } from "../../wallet.model";
import { getWallets } from "../../walletService";
import { getTabsItems } from "./balancesConfig";
import type { PaginatedResponse } from "@shared/model/shared.model";

const BalancesList = () => {
  const [balanceFilter, setBalanceFilter] = useState<WalletListParams>({
    page: 1,
    per_page: 10,
  });

  const [selectedTab, setSelectedTab] = useState<string>("1");

  const { data: platformWalletsResponse, isLoading: isLoadingPlatform } =
    useApiQuery<PaginatedResponse<Wallet>>(
      ["wallets/platform", balanceFilter],
      () => getWallets(balanceFilter),
      {
        retry: false,
        enabled: !!balanceFilter && selectedTab === "1",
      },
    );

  const { data: providerWalletsResponse, isLoading: isLoadingProvider } =
    useApiQuery<PaginatedResponse<Wallet>>(
      ["wallets/provider", balanceFilter],
      () => getWallets({ type: "provider", ...balanceFilter }),
      {
        retry: false,
        enabled: !!balanceFilter && selectedTab === "2",
      },
    );

  const { data: clientWalletsResponse, isLoading: isLoadingClient } =
    useApiQuery<PaginatedResponse<Wallet>>(
      ["wallets/client", balanceFilter],
      () => getWallets({ type: "client", ...balanceFilter }),
      {
        retry: false,
        enabled: !!balanceFilter && selectedTab === "3",
      },
    );

  const onChangeTab = useCallback((key: string) => {
    setSelectedTab(key);
    setBalanceFilter((prevFilter) => ({
      ...prevFilter,
      page: 1,
    }));
  }, []);

  const handelOnChangeBalanceFilter = useCallback(
    (filter: WalletListParams) => {
      setBalanceFilter((prevFilter) => ({
        ...prevFilter,
        ...filter,
      }));
    },
    [],
  );

  const tabsItems = useMemo(
    () =>
      getTabsItems(
        platformWalletsResponse!,
        providerWalletsResponse!,
        clientWalletsResponse!,
        isLoadingPlatform || isLoadingProvider || isLoadingClient,
        handelOnChangeBalanceFilter,
      ),
    [
      handelOnChangeBalanceFilter,
      platformWalletsResponse,
      providerWalletsResponse,
      clientWalletsResponse,
      isLoadingPlatform,
      isLoadingProvider,
      isLoadingClient,
    ],
  );

  return (
    <div className="mt-10 bg-white shadow rounded-lg p-4 walet-card">
      <h1 className="text-xl font-bold text-primary">الأرصدة</h1>
      <div className="w-16 h-1 bg-primary mt-2 rounded mb-10"></div>
      <Tabs
        defaultActiveKey="1"
        items={tabsItems}
        onChange={(key) => onChangeTab(key)}
      />
    </div>
  );
};

export default BalancesList;
