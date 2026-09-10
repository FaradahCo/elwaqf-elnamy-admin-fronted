import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ServiceProviderDetailsTabState = {
  activeTab: number | null;
};

const initialState: ServiceProviderDetailsTabState = {
  activeTab: null,
};

const serviceProviderDetailsTabSlice = createSlice({
  name: "serviceProviderDetailsTab",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<number | null>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = serviceProviderDetailsTabSlice.actions;
export default serviceProviderDetailsTabSlice.reducer;
