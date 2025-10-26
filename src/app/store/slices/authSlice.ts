import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { forceLogout: false },
  reducers: {
    triggerForceLogout(state) {
      state.forceLogout = true;
    },
    resetForceLogout(state) {
      state.forceLogout = false;
    },
  },
});

export const { triggerForceLogout, resetForceLogout } = authSlice.actions;
export default authSlice.reducer;
