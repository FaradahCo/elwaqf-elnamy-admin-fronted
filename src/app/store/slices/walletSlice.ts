import type {
  BankTransferItem,
  WithdrawItem,
} from "@/app/modules/pages/wallet/wallet.model";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
  selectedWithdraw: WithdrawItem | null;
  bankTransfer: BankTransferItem | null;
}

const initialState: WalletState = {
  selectedWithdraw: null,
  bankTransfer: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setSelectedWithdraw: (state, action: PayloadAction<WithdrawItem>) => {
      state.selectedWithdraw = action.payload;
    },
    resetSelectedWithdraw: (state) => {
      state.selectedWithdraw = null;
    },
    setSelectedBankTransfer: (
      state,
      action: PayloadAction<BankTransferItem>
    ) => {
      state.bankTransfer = action.payload;
    },
    resetSelectedBankTransfer: (state) => {
      state.bankTransfer = null;
    },
  },
});

export const {
  setSelectedWithdraw,
  resetSelectedWithdraw,
  setSelectedBankTransfer,
  resetSelectedBankTransfer,
} = walletSlice.actions;
export default walletSlice.reducer;
