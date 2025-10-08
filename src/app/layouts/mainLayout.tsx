import { Layout, Menu, Button, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router";

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  // Menu items with navigation
  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "الرئيسية",
      path: "/provider",
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "البروفايل",
      path: "/provider/profile",
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "إدارة الخدمات",
      path: "/",
    },
    {
      key: "4",
      icon: <UploadOutlined />,
      label: "متابعة الطلبات",
      path: "/",
    },
    {
      key: "5",
      icon: <UploadOutlined />,
      label: "المحفظة",
      path: "/",
    },
    {
      key: "6",
      icon: <UploadOutlined />,
      label: "الفاتورة",
      path: "/",
    },
    {
      key: "7",
      icon: <UploadOutlined />,
      label: "مكتبة الوقف",
      path: "/",
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
        <Header className="bg-white! p-0!">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
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
