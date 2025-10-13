import { Drawer } from "antd";
import { Link } from "react-router";

interface NavigationItem {
  label: string;
  path: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
}

const MobileMenu = ({ isOpen, onClose, navigationItems }: MobileMenuProps) => {
  return (
    <Drawer
      title="القائمة"
      placement="right"
      onClose={onClose}
      open={isOpen}
      width={280}
      className="lg:hidden"
    >
      <div className="flex flex-col gap-4">
        <nav className="flex flex-col gap-4">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="font-medium transition-colors cursor-pointer text-lg py-2 border-b border-gray-100"
              style={{
                color: "var(--color-second-primary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-second-primary)";
              }}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          <img
            src="/images/cart.svg"
            alt="Cart"
            className="h-6 w-6 cursor-pointer hover:opacity-80 transition-opacity"
          />
          <img
            src="/images/notifications.svg"
            alt="Notifications"
            className="h-6 w-6 cursor-pointer hover:opacity-80 transition-opacity"
          />
          <img
            src="/images/envolove.svg"
            alt="Messages"
            className="h-6 w-6 cursor-pointer hover:opacity-80 transition-opacity"
          />
        </div>
      </div>
    </Drawer>
  );
};

export default MobileMenu;