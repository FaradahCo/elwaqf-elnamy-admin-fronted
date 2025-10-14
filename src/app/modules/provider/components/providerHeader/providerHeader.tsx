import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { providerRoutePath } from "../../provider.routes";
import type { RootState } from "../../../../store";

interface ProviderHeaderProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const ProviderHeader: React.FC<ProviderHeaderProps> = ({
  collapsed = false,
  onToggleCollapse,
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const profileMenuItems = [
    {
      key: "1",
      label: (
        <Link
          to={providerRoutePath.PROFILE}
          className="flex items-center gap-2"
        >
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
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={onToggleCollapse}
            style={{
              fontSize: "16px",
              width: 40,
              height: 40,
            }}
          />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
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
                src={user?.image}
                icon={!user?.image && <UserOutlined />}
                className="bg-green-600 md:!w-8 md:!h-8"
              />
              {user && (
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              )}
              <DownOutlined className="text-gray-500 text-xs hidden md:block" />
            </div>
          </Dropdown>
        </div>
      </div>
    </>
  );
};
export default ProviderHeader;
