import { createSlice } from "@reduxjs/toolkit";
import type { DiscoundCodeItem } from "@/app/modules/pages/discoundCodes/model/discoundCodesModel";

interface DiscountCodesState {
  editingItem: DiscoundCodeItem | null;
  deleteItem: DiscoundCodeItem | null;
  isEditMode: boolean;
}

const initialState: DiscountCodesState = {
  editingItem: null,
  deleteItem: null,
  isEditMode: false,
};

const discountCodesSlice = createSlice({
  name: "discountCodes",
  initialState,
  reducers: {
    setEditItem: (state, action) => {
      state.editingItem = action.payload;
      state.isEditMode = true;
    },
    setDeleteItem: (state, action) => {
      state.deleteItem = action.payload;
    },
    clearDeleteItem: (state) => {
      state.deleteItem = null;
    },
    clearEditItem: (state) => {
      state.editingItem = null;
      state.isEditMode = false;
    },
    resetDiscountCodesState: (state) => {
      state.editingItem = null;
      state.isEditMode = false;
    },
  },
});

export const {
  setEditItem,
  clearEditItem,
  resetDiscountCodesState,
  clearDeleteItem,
  setDeleteItem,
} = discountCodesSlice.actions;
export default discountCodesSlice.reducer;
