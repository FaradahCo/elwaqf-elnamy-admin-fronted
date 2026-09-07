import { UploadOutlined } from "@ant-design/icons";
import MainHeader from "@shared/components/mainHeader/mainHeader";
import { Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import React, { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useLogOut } from "../hooks/useLogOut";
import { consultationRoutePath } from "../modules/pages/consultation/consultationRoutes";
import { pagesRoutePath } from "../modules/pages/pages.routes";
import { serviceProviderRoutePath } from "../modules/pages/serviceProvider/serviceProvidersRoutes";
import { walletRoutePath } from "../modules/pages/wallet/walletRoutes";
import { consultantsManagementRoutePath } from "../modules/pages/consultantsManagement/consultantsManagementRoutes";
import { staticPagesRoutePath } from "../modules/pages/staticPages/staticPagesRoutes";
import { followRequestsRoutePath } from "../modules/pages/followRequests/followRequestsRoutes";
import { alwaqfRoutePath } from "../modules/pages/alwaqf/alwaqfRoutes";

type MenuNavItem = {
  key?: string;
  path?: string;
  children?: MenuNavItem[];
};

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  useLogOut();

  const groupLabelClass = collapsed
    ? "block text-center text-[10px]! leading-tight whitespace-normal"
    : "block text-[15px]";
  const itemLabelClass = collapsed ? "hidden" : "text-[18px]!";

  // Menu items with navigation
  const menuItems = useMemo(
    () => [
      {
        key: "1",
        label: <span className={groupLabelClass}>لوحة التحكم والتحليل</span>,
        type: "group" as const,
        children: [
          {
            key: "1-1",
            icon: (
              <img
                src="/images/home-icon.svg"
                alt="home icon"
                className="w-6 h-6"
              />
            ),
            label: <span className={itemLabelClass}>الرئيسية</span>,
            path: pagesRoutePath.HOME,
          },
        ],
      },

      {
        key: "2",
        label: (
          <span className={`${groupLabelClass} mt-4!`}>
            إدارة الخدمات والأوقاف
          </span>
        ),
        type: "group" as const,
        children: [
          {
            key: "2-1",
            icon: (
              <img
                src="/images/services-managemnet-icon.svg"
                alt="services-managemnet"
                className="w-6 h-6"
              />
            ),
            label: <span className={itemLabelClass}>إدارة الخدمات</span>,
            path: pagesRoutePath.SERVICE_MANAGEMENT_LIST,
          },
          {
            key: "2-2",
            icon: (
              <img
                src="/images/services.svg"
                alt="services"
                className="w-6 h-6"
              />
            ),
            label: <span className={itemLabelClass}>متابعه الطلبات</span>,
            path: followRequestsRoutePath.FOLLOW_REQUESTS,
          },
          {
            key: "2-3",
            icon: (
              <img
                src="/images/service-providers-icon.svg"
                alt="service providers icon"
                className="w-6 h-6"
              />
            ),
            label: <span className={itemLabelClass}>مزودي الخدمات</span>,
            path: serviceProviderRoutePath.SERVICE_PROVIDERS,
          },
          {
            key: "2-4",
            icon: (
              <img
                src="/images/awqaf.svg"
                alt="awqaf icon"
                className="w-6 h-6"
              />
            ),
            label: <span className={itemLabelClass}>الإوقاف</span>,
            path: alwaqfRoutePath.ALWAQF_LIST,
          },
        ],
      },

      {
        key: "3",
        icon: <UploadOutlined />,
        label: (
          <span className={`${groupLabelClass} mt-4!`}>الإدارة المالية</span>
        ),
        type: "group" as const,
        children: [
          {
            key: "3-1",
            icon: (
              <img
                src="/images/walet-management.svg"
                alt="walet-management icon"
                className="w-6 h-6"
              />
            ),
            label: <span className={itemLabelClass}>إدارة المحفظة</span>,
            path: walletRoutePath.WALLET,
          },
          {
            key: "3-2",
            icon: (
              <img
                src="/images/transactions.svg"
                alt="transactions icon"
                className="w-6 h-6"
              />
            ),
            label: <span className={itemLabelClass}>المعاملات المالية</span>,
            path: walletRoutePath.PAYMENTS,
          },
          {
            key: "3-3",
            icon: (
              <img
                src="/images/balances.svg"
                alt="balances icon"
                className="w-6 h-6"
              />
            ),
            label: <span className={itemLabelClass}>الأرصدة</span>,
            path: walletRoutePath.BALANCES,
          },
          {
            key: "3-4",
            icon: (
              <img
                src="/images/discount.svg"
                alt="discount icon"
                className="w-6 h-6"
              />
            ),
            label: <span className={itemLabelClass}>أكواد الخصم</span>,
            path: pagesRoutePath.DISCOUNT_CODES_LIST,
          },
        ],
      },
      {
        key: "4",
        label: (
          <span className={`${groupLabelClass} mt-4!`}>
            المحتوى والخدمات المساندة
          </span>
        ),
        type: "group" as const,
        children: [
          {
            key: "4-1",
            path: consultationRoutePath.CONSULTATION,
            icon: (
              <img
                src="/images/consultations.svg"
                alt="consultations icon"
                className="w-6 h-6"
              />
            ),
            label: <span className={itemLabelClass}>الاستشارة</span>,
          },
          {
            key: "4-2",
            path: consultantsManagementRoutePath.CONSULTANTS_MANAGEMENT_LIST,
            icon: (
              <img
                src="/images/consultations.svg"
                alt="consultations management icon"
                className="w-6 h-6"
              />
            ),
            label: <span className={itemLabelClass}>إدارة المستشارين</span>,
          },
        ],
      },
      {
        key: "5",
        label: (
          <span className={`${groupLabelClass} mt-4!`}>النظام والسياسات</span>
        ),
        type: "group" as const,
        children: [
          // {
          //   key: "5-1",
          //   path: "complaints-suggestions",
          //   icon: (
          //     <img
          //       src="/images/complents.svg"
          //       alt="complaints icon"
          //       className="w-6 h-6"
          //     />
          //   ),
          //   label: <span className="text-[18px]!">الشكاوى والاقتراحات</span>,
          // },
          {
            key: "5-2",
            icon: (
              <img
                src="/images/privacy.svg"
                alt="privacy icon"
                className="w-6 h-6"
              />
            ),
            label: <span className={itemLabelClass}>الصفحات الثابتة</span>,
            path: staticPagesRoutePath.STATIC_PAGES_LIST,
          },
          {
            key: "5-3",
            path: pagesRoutePath.COMMISSION_SETTINGS,
            icon: (
              <img
                src="/images/settings.svg"
                alt="settings icon"
                className="w-6 h-6"
              />
            ),
            label: <span className={itemLabelClass}>الاعدادات</span>,
          },
        ],
      },
    ],
    [groupLabelClass, itemLabelClass],
  );

  // Helper function to find menu item by key (including nested children)
  const findMenuItemByKey = (
    items: MenuNavItem[],
    key: string,
  ): MenuNavItem | null => {
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
  const findMenuItemByPath = (
    items: MenuNavItem[],
    path: string,
  ): MenuNavItem | null => {
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
  const getSelectedKey = (): string[] => {
    const currentPath = location.pathname;
    const selectedItem = findMenuItemByPath(menuItems, currentPath);
    if (selectedItem?.key) {
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
        <div className="flex items-center justify-center px-2 py-4">
          <img
            src="/images/شعار سواقف.svg"
            alt="logo"
            className={`transition-all duration-200 ${
              collapsed ? "h-10 w-10 object-contain" : "w-auto max-w-45"
            }`}
          />
        </div>
        <Menu
          className={[
            "py-5!",
            collapsed &&
              [
                "[&.ant-menu-inline-collapsed]:w-full!",
                "[&_.ant-menu-item-group-title]:block! [&_.ant-menu-item-group-title]:p-1 [&_.ant-menu-item-group-title]:text-center [&_.ant-menu-item-group-title]:leading-tight [&_.ant-menu-item-group-title]:whitespace-normal [&_.ant-menu-item-group-title]:opacity-75 [&_.ant-menu-item-group-title]:[writing-mode:horizontal-tb]!",
                "[&_.ant-menu-item]:flex! [&_.ant-menu-item]:h-12! [&_.ant-menu-item]:w-12! [&_.ant-menu-item]:items-center! [&_.ant-menu-item]:justify-center! [&_.ant-menu-item]:px-0! [&_.ant-menu-item]:mx-auto!",
                "[&_.ant-menu-item-icon]:me-0!",
                "[&_.ant-menu-item>.ant-menu-title-content]:hidden!",
              ].join(" "),
          ]
            .filter(Boolean)
            .join(" ")}
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
          className="overflow-auto h-screen!"
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
