import { ClockCircleOutlined, TagFilled } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router";
import type { ServiceItem } from "../../model/consultantsManagementModel";
import { Rate } from "antd/lib";

const ServiceCard = ({ service }: { service: ServiceItem }) => {
  return (
    <div className="relative p-2 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-rating flex flex-col h-full">
      <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
        <img
          src={service.provider?.logo}
          alt={service.provider?.business_name}
          className="h-full w-full object-contain p-4"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="py-8 flex flex-col flex-1 px-2">
        <p className="text-base font-semibold text-second-primary mb-2 break-words whitespace-normal">
          {service?.title}
        </p>
        <h3 className="text-lg font-semibold text-second-primary-900 mb-2 line-clamp-2 break-words whitespace-normal"></h3>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Rate disabled allowHalf className="text-sm!" value={4} />
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 break-words whitespace-normal leading-relaxed">
          {service?.description}
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
            <span className="inline-block text-second-primary-800 px-3 py-2 border border-second-primary rounded-2xl bg-field">
              {service?.field?.name}
            </span>

            <div className="flex items-center gap-1 text-gray-text px-3 py-2 border border-gray-text rounded-2xl bg-field">
              <ClockCircleOutlined />
              {service?.duration?.time + " " + service.duration?.type || ""}
            </div>

            <div className="flex items-center gap-1 text-primary px-3 py-2 border border-primary rounded-2xl bg-field">
              <TagFilled />
              {service?.min_price}
            </div>
          </div>
          <Link to={`/admin/service-management/reviews/${service?.id}`}>
            <Button
              type="primary"
              className="w-full"
              style={{
                backgroundColor: "var(--color-primary)",
                borderColor: "var(--color-primary)",
              }}
            >
              عرض التفاصيل
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
