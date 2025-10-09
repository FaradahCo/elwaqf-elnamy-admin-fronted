import { Dropdown, Avatar } from "antd";
import {
  UserOutlined,
  DownOutlined,
  MenuOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router";
import MobileMenu from "./mobileMenu";
import { clientRoutePath } from "../../clientRoutes";

const ClientHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    "عن الوقف النامي",
    "الإستشارة",
    "الخدمات",
    "الباقات",
  ];

  const profileMenuItems = [
    {
      key: "1",
      label: (
        <Link to={clientRoutePath.PROFILE} className="flex items-center gap-2">
          <UserOutlined />
          الملف الشخصي
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/profile" className="flex items-center gap-2">
          <SettingOutlined />
          الإعدادات
        </Link>
      ),
    },
    {
      type: "divider" as const,
    },
    {
      key: "3",
      label: (
        <Link to="/logout" className="flex items-center gap-2 text-red-600">
          تسجيل الخروج
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/images/logo.svg"
            alt="Logo"
            className="h-8 md:h-10 w-auto"
          />
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              to="#"
              className="font-medium transition-colors cursor-pointer text-sm xl:text-base"
              style={{
                color: "var(--color-second-primary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-second-primary)";
              }}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right Section - Icons and Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Icons - Hidden on small mobile, visible on md+ */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <img
              src="/images/cart.svg"
              alt="Cart"
              className="h-5 w-5 lg:h-6 lg:w-6 cursor-pointer hover:opacity-80 transition-opacity"
            />
            <img
              src="/images/notifications.svg"
              alt="Notifications"
              className="h-5 w-5 lg:h-6 lg:w-6 cursor-pointer hover:opacity-80 transition-opacity"
            />
            <img
              src="/images/envolove.svg"
              alt="Messages"
              className="h-5 w-5 lg:h-6 lg:w-6 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>

          {/* Profile Dropdown */}
          <Dropdown
            menu={{ items: profileMenuItems }}
            placement="bottomRight"
            arrow
          >
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 md:px-3 py-2 rounded-lg transition-colors">
              <Avatar
                size="small"
                icon={<UserOutlined />}
                className="bg-green-600 md:!w-8 md:!h-8"
              />
              <DownOutlined className="text-gray-500 text-xs hidden md:block" />
            </div>
          </Dropdown>

          {/* Mobile Menu Button - Visible only on mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="Open menu"
          >
            <MenuOutlined
              className="text-lg"
              style={{ color: "var(--color-second-primary)" }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigationItems={navigationItems}
      />
    </>
  );
};

export default ClientHeader;
