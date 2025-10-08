import { LeftOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Link } from "react-router";

export type BreadCrumbItem = {
  path: string | null;
  label: string;
};

interface BreadCrumbProps {
  items: BreadCrumbItem[];
}

const BreadCrumbComponent = ({ items }: BreadCrumbProps) => {
  const breadcrumbItems = [
    {
      title: (
        <Link
          to="/"
          className="flex items-center gap-3! text-white! hover:text-gray-200"
        >
          <span>الرئيسية</span>
        </Link>
      ),
    },
    ...items.map((item, index) => ({
      title: !item.path ? (
        <span key={index} className="text-gray-400!">
          {item.label}
        </span>
      ) : (
        <Link
          key={index}
          to={item.path}
          className="text-white! hover:text-gray-200"
        >
          {item.label}
        </Link>
      ),
    })),
  ];

  return (
    <div className="p-6 bg-second-primary text-white">
      <Breadcrumb
        items={breadcrumbItems}
        className="mb-4 text-white!"
        separator={<LeftOutlined className="text-white! text-xs" />}
      />
    </div>
  );
};

export default BreadCrumbComponent;
