import type { User } from "../../modules/authentication/authentication.model";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define the user state interface
interface UserState {
  user: User | null;
}

// Initial state
const initialState: UserState = {
  user: null,
};

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set user data
    setUser: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        user: action.payload,
      };
    },

    // Clear user data
    clearUser: (state) => {
      state.user = null;
    },
  },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
