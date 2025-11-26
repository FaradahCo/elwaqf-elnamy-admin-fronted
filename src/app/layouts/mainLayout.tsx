import { UploadOutlined } from "@ant-design/icons";
import MainHeader from "@shared/components/mainHeader/mainHeader";
import { Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useLogOut } from "../hooks/useLogOut";
import { consultationRoutePath } from "../modules/pages/consultation/consultationRoutes";
import { pagesRoutePath } from "../modules/pages/pages.routes";
import { serviceProviderRoutePath } from "../modules/pages/serviceProvider/serviceProviderRoutes";
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
      label: "لوحة التحكم والتحليل",
      type: "group" as const,
      children: [
        {
          key: "1-1",
          icon: <img src="/images/home-icon.svg" alt="home icon" />,
          label: "الرئيسية",
          path: pagesRoutePath.HOME,
        },
      ],
    },

    {
      key: "2",
      label: "إدارة الخدمات والأوقاف",
      type: "group" as const,
      children: [
        {
          key: "2-1",
          icon: (
            <img
              src="/images/services-managemnet-icon.svg"
              alt="services-managemnet"
            />
          ),
          label: "إدارة الخدمات",
          path: pagesRoutePath.SERVICE_MANAGEMENT_LIST,
        },
        {
          key: "2-2",
          icon: <img src="/images/services.svg" alt="services" />,
          label: "متابعه الطلبات",
          path: "/provider/services-management",
        },
        {
          key: "2-3",
          icon: (
            <img
              src="/images/service-providers-icon.svg"
              alt="service providers icon"
            />
          ),
          label: "مزودي الخدمات",
          path: serviceProviderRoutePath.SERVICE_PROVIDERS,
        },
        {
          key: "2-4",
          icon: <img src="/images/awqaf.svg" alt="awqaf icon" />,
          label: "الإوقاف",
          path: "/waqf/list",
        },
      ],
    },

    {
      key: "3",
      icon: <UploadOutlined />,
      label: "الإدارة المالية",
      type: "group" as const,
      children: [
        {
          key: "3-1",
          icon: (
            <img
              src="/images/walet-management.svg"
              alt="walet-management icon"
            />
          ),
          label: "إدارة المحفظة",
          path: walletRoutePath.WALLET,
        },
        {
          key: "3-2",
          icon: <img src="/images/transactions.svg" alt="transactions icon" />,
          label: "المعاملات المالية",
          path: walletRoutePath.PAYMENTS,
        },
        {
          key: "3-3",
          icon: <img src="/images/balances.svg" alt="balances icon" />,
          label: "الأرصدة",
          path: walletRoutePath.BALANCES,
        },
        {
          key: "3-4",
          icon: <img src="/images/discount.svg" alt="discount icon" />,
          label: "أكواد الخصم",
          path: pagesRoutePath.DISCOUNT_CODES_LIST,
        },
        {
          key: "3-5",
          icon: (
            <img
              src="/images/operations-table.svg"
              alt="operations-table icon"
            />
          ),
          label: "جدول العمليات",
          path: "/manage/transactions",
        },
      ],
    },
    {
      key: "4",
      label: "المحتوى والخدمات المساندة",
      type: "group" as const,
      children: [
        {
          key: "4-1",
          path: consultationRoutePath.CONSULTATION,
          icon: (
            <img src="/images/consultations.svg" alt="consultations icon" />
          ),
          label: "الاستشارة",
        },
        {
          key: "4-2",
          path: "/user",
          icon: (
            <img
              src="/images/consultations.svg"
              alt="consultations management icon"
            />
          ),
          label: "إدارة المستشارين",
        },
        {
          key: "4-3",
          path: "library/waqf",
          icon: <img src="/images/ic-library.svg" alt="library icon" />,
          label: "مكتبة الوقف",
        },
      ],
    },
    {
      key: "5",
      label: "النظام والسياسات",
      type: "group" as const,
      children: [
        {
          key: "5-1",
          path: "complaints-suggestions",
          icon: <img src="/images/complents.svg" alt="complaints icon" />,
          label: "الشكاوى والاقتراحات",
        },
        {
          key: "5-2",
          path: "privacy-policy",
          icon: <img src="/images/privacy.svg" alt="privacy icon" />,
          label: "سياسة الخصوصية",
        },
        {
          key: "5-3",
          path: "settings",
          icon: <img src="/images/settings.svg" alt="settings icon" />,
          label: "الاعدادات",
        },
      ],
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
    <Layout className="main-layout">
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
          className="overflow-auto"
          style={{
            margin: "0 16px",
            padding: "15px 5px",
            scrollbarWidth: "none",
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
