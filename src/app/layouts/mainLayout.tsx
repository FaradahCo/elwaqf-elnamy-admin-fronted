import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import MainHeader from "@shared/components/mainHeader/mainHeader";
import { Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useLogOut } from "../hooks/useLogOut";
import { pagesRoutePath } from "../modules/pages/pages.routes";
import { walletRoutePath } from "../modules/pages/wallet/walletRoutes";

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
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
      label: "إدارة الخدمات",
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
    // {
    //   key: "5",
    //   icon: <UploadOutlined />,
    //   label: "مزودي الخدمات",
    //   path: serviceProviderRoutePath.SERVICE_PROVIDERS,
    // },
    {
      key: "5",
      icon: <UploadOutlined />,
      label: "إدارة المحفظة",
      children: [
        {
          key: "5-1",
          label: "المحفظة",
          path: "/admin/wallet",
        },
        {
          key: "5-2",
          label: "المعاملات المالية",
          path: walletRoutePath.PAYMENTS,
        },
        {
          key: "5-3",
          label: "الأرصدة",
          path: walletRoutePath.BALANCES,
        },
      ],
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

  // Helper function to find menu item by key (including nested children)
  const findMenuItemByKey = (items: any[], key: string): any => {
    for (const item of items) {
      if (item.key === key) {
        return item;
      }
      if (item.children) {
        const found = findMenuItemByKey(item.children, key);
        if (found) return found;
      }
    }
    return null;
  };

  // Helper function to find menu item by path (including nested children)
  const findMenuItemByPath = (items: any[], path: string): any => {
    for (const item of items) {
      if (item.path === path) {
        return item;
      }
      if (item.children) {
        const found = findMenuItemByPath(item.children, path);
        if (found) return found;
      }
    }
    return null;
  };

  // Handle menu item click
  const handleMenuClick = ({ key }: { key: string }) => {
    const selectedItem = findMenuItemByKey(menuItems, key);
    if (selectedItem && selectedItem.path) {
      navigate(selectedItem.path);
    }
  };

  // Get current selected key based on location
  const getSelectedKey = () => {
    const currentPath = location.pathname;
    const selectedItem = findMenuItemByPath(menuItems, currentPath);
    if (selectedItem) {
      return [selectedItem.key];
    }
    return ["0"];
  };

  const selectedKeys = getSelectedKey();

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
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
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
