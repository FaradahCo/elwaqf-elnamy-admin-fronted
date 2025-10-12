import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider, App as AntApp } from "antd";
import arEG from "antd/locale/ar_EG";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const theme = {
  token: {
    colorPrimary: "#7ea831",
  },
  components: {
    Collapse: {
      borderRadiusLG: 0,
    },
    Steps: {
      colorPrimary: "#150941",
    },
  },
};

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider theme={theme} locale={arEG} direction="rtl">
      <AntApp>
        <App />
      </AntApp>
    </ConfigProvider>
  </QueryClientProvider>
);
