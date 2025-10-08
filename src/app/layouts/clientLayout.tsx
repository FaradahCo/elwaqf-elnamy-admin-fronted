import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Outlet } from "react-router";
import ClientHeader from "../modules/client/components/clientHeader/clientHeader";
import ClientFooter from "../modules/client/components/clientFooter/clientFooter";

const ClientLayout = () => {
  return (
    <Layout className="h-screen">
      <Header className="p-0! bg-white! py-2!">
        <ClientHeader />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer className="p-0!">
        <ClientFooter />
        <div className="bg-primary p-4 text-center">
          منصة الوقف النامي هي أحد منتجات شركة فَرادة .. جميع الحقوق محفوظة
          لموقع الوقف النامي © 2025
        </div>
      </Footer>
    </Layout>
  );
};

export default ClientLayout;
