import type { PaginatedResponse } from "@shared/model/shared.model";
import { useApiQuery } from "@shared/services/api";
import { Modal, Tabs } from "antd";
import { useMemo, useState } from "react";
import type {
  BankTransferItem,
  BankTransferListParams,
  WithdrawItem,
  WithdrawListParams,
} from "../../wallet.model";
import {
  getBankTransfers,
  getWithdrawList,
  showBankTransferById,
  showWithdrawById,
} from "../../walletService";
import { getTabsItems } from "./walletList.config";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import {
  resetSelectedBankTransfer,
  resetSelectedWithdraw,
} from "@/app/store/slices/walletSlice";
import WithDrawOfBalance from "../../components/withDrawOfBalance/withDrawOfBalance";
import TransactionVerfication from "../../components/transactionVerfication/transactionVerfication";
import { useListHook } from "@/app/hooks/listHook";

const WalletList = () => {
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState<string>("1");
  const selectedWithdraw = useSelector(
    (state: RootState) => state.wallet.selectedWithdraw
  );

  const selectedBankTransfer = useSelector(
    (state: RootState) => state.wallet.bankTransfer
  );

  const {
    data: withdrawList,
    isLoading,
    handleFilterChange,
  } = useListHook<PaginatedResponse<WithdrawItem>, WithdrawListParams>({
    queryKey: "withdraw/list",
    fetchFn: getWithdrawList,
    initialFilter: {
      page: 1,
      per_page: 10,
      status: "pending",
    },
    queryOptions: { retry: false, enabled: selectedTab === "1" },
  });

  const { data: bankTransferList } = useListHook<
    PaginatedResponse<BankTransferItem>,
    BankTransferListParams
  >({
    queryKey: "bank-transfer/list",
    fetchFn: getBankTransfers,
    initialFilter: {
      page: 1,
      per_page: 10,
      status: "pending",
    },
    queryOptions: { retry: false, enabled: selectedTab === "2" },
  });

  const { data: selectedWithdrawData } = useApiQuery<WithdrawItem>(
    ["withdraw/show", selectedWithdraw?.id],
    () => showWithdrawById(selectedWithdraw?.id!),
    {
      retry: false,
      enabled: !!selectedWithdraw?.id,
    }
  );

  const { data: selectedBankTransferData } = useApiQuery<BankTransferItem>(
    ["bank-transfer/show", selectedBankTransfer?.id],
    () => showBankTransferById(selectedBankTransfer?.id!),
    {
      retry: false,
      enabled: !!selectedBankTransfer?.id,
    }
  );
  const tabsItems = useMemo(
    () =>
      getTabsItems(
        withdrawList!,
        bankTransferList!,
        isLoading,
        handleFilterChange
      ),
    [withdrawList, bankTransferList, handleFilterChange, isLoading]
  );

  const onChangeTab = (key: string) => {
    setSelectedTab(key);
    handleFilterChange({ page: 1, per_page: 10 });
  };

  return (
    <>
      <div className="mt-10 bg-white shadow rounded-lg p-4 walet-card">
        <h1 className="text-xl font-bold text-second-primary">
          تأكيد المعاملات
        </h1>
        <Tabs
          defaultActiveKey="1"
          items={tabsItems}
          onChange={(key) => onChangeTab(key)}
        />
      </div>
      <Modal
        open={!!selectedWithdraw}
        onCancel={() => dispatch(resetSelectedWithdraw())}
        footer={null}
        destroyOnHidden={true}
      >
        <WithDrawOfBalance selectedWithdrawData={selectedWithdrawData!} />
      </Modal>

      <Modal
        open={!!selectedBankTransfer}
        onCancel={() => dispatch(resetSelectedBankTransfer())}
        destroyOnHidden={true}
        footer={null}
      >
        <TransactionVerfication
          selectedBankTransferData={selectedBankTransferData!}
        />
      </Modal>
    </>
  );
};

export default WalletList;
