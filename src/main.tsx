import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider, App as AntApp } from "antd";
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
  },
};

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider theme={theme}>
      <AntApp>
        <App />
      </AntApp>
    </ConfigProvider>
  </QueryClientProvider>
);
