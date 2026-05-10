import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider, App as AntApp } from "antd";
import arEG from "antd/locale/ar_EG";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./app/App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store, persistor } from "./app/store";
import ErrorBoundary from "@shared/components/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const theme = {
  token: {
    colorPrimary: "#0d0035",
    fontFamily: "Greta AR, sans-serif",
    borderRadius: 0,
    lineWidth: 0.5,
    controlHeight: 30,
  },
  components: {
    Collapse: {
      borderRadiusLG: 0,
    },
    Form: {
      labelFontSize: 16,
    },
    Input: {
      borderRadius: 0,
      colorPrimary: "#0d0035",
      paddingBlock: 4,
      paddingInline: 8,
      paddingBlockSM: 2,
      paddingInlineSM: 6,
      paddingBlockLG: 6,
      paddingInlineLG: 10,
    },
    Select: {
      borderRadius: 0,
      paddingBlock: 4,
      paddingInline: 8,
      paddingBlockSM: 2,
      paddingInlineSM: 6,
      paddingBlockLG: 6,
      paddingInlineLG: 10,
      colorPrimary: "#0d0035",
    },
    DatePicker: {
      borderRadius: 0,
      paddingBlock: 4,
      paddingInline: 8,
      paddingBlockSM: 2,
      paddingInlineSM: 6,
      paddingBlockLG: 6,
      paddingInlineLG: 10,
      colorPrimary: "#0d0035",
    },
    Steps: {
      colorPrimary: "#0d0035",
    },
  },
};

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={theme} locale={arEG} direction="rtl">
            <AntApp>
              <App />
            </AntApp>
          </ConfigProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);
