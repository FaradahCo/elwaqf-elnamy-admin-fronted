import { theme, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import MainHeader from "@shared/components/mainHeader/mainHeader";
import { serviceProviderRoutePath } from "../modules/pages/serviceProvider/serviceProviderRoutes";
import { pagesRoutePath } from "../modules/pages/pages.routes";
import { useLogOut } from "../hooks/useLogOut";

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  useLogOut();

  // Menu items with navigation
  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "الرئيسية",
      path: pagesRoutePath.HOME,
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "إدارج الخدمات",
      path: pagesRoutePath.SERVICE_MANAGEMENT_LIST,
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "متابعه الطلبات",
      path: "/provider/services-management",
    },
    {
      key: "4",
      icon: <UploadOutlined />,
      label: "الإوقاف",
      path: "/waqf/list",
    },
    {
      key: "5",
      icon: <UploadOutlined />,
      label: "مزودي الخدمات",
      path: serviceProviderRoutePath.SERVICE_PROVIDERS,
    },
    {
      key: "6",
      icon: <UploadOutlined />,
      label: "أكواد الخصم",
      path: pagesRoutePath.DISCOUNT_CODES_LIST,
    },
    {
      key: "7",
      icon: <UploadOutlined />,
      label: "جدول العمليات",
      path: "/manage/transactions",
    },
    {
      key: "8",
      path: "/user",
      icon: <UploadOutlined />,
      label: "إدارة المستخدمين",
    },
    {
      key: "9",
      path: "library/waqf",
      icon: <UploadOutlined />,
      label: "مكتبة الوقف",
    },

    {
      key: "10",
      path: "complaints-suggestions",
      icon: <UploadOutlined />,
      label: "الشكاوى والاقتراحات",
    },

    {
      key: "11",
      path: "privacy-policy",
      icon: <UploadOutlined />,
      label: "سياسة الخصوصية",
    },
    {
      key: "12",
      path: "settings",
      icon: <UploadOutlined />,
      label: "الاعدادات",
    },
  ];

  // Handle menu item click
  const handleMenuClick = ({ key }: { key: string }) => {
    const selectedItem = menuItems.find((item) => item.key === key);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  // Get current selected key based on location
  const getSelectedKey = () => {
    const currentPath = location.pathname;
    const selectedItem = menuItems.find((item) => item.path === currentPath);
    return selectedItem ? [selectedItem.key] : ["1"];
  };

  return (
    <Layout className="h-screen main-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={280}
        collapsedWidth={80}
      >
        <img
          src="/images/white-logo.svg"
          alt="logo"
          className="p-5 w-80 text-center!"
        />
        <Menu
          className="py-5!"
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKey()}
          onClick={handleMenuClick}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header className="bg-white! p-0! px-4">
          <MainHeader
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content
          className="h-screen! overflow-auto"
          style={{
            margin: "0 16px",
            padding: "15px 5px",
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
