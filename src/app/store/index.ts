import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import walletReducer from "./slices/walletSlice";
import discountCodesReducer from "./slices/discountCodesSlice";

// Persist configuration
const persistConfig = {
  key: "user",
  storage,
};

// Create persisted reducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Configure store
export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    auth: authReducer,
    discountCodes: discountCodesReducer,
    wallet: walletReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
