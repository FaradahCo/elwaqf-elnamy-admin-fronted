import { ClockCircleOutlined, StarFilled, TagFilled } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router";
import type { ServiceCardProps } from "./serviceCard.model";

const ServiceCard = ({
  id,
  image,
  providerName,
  title,
  rating,
  description,
  field,
  deliveryTime,
  cost,
  type,
}: ServiceCardProps) => {
  const getDetailPath = () => {
    return type === "service" ? `/services/${id}` : `/packages/${id}`;
  };

  return (
    <div className="p-2 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-rating">
      {/* Image */}
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {/* Intentionally empty per current design; wire actual image when API integrates */}
      </div>

      <div className="py-3">
        {/* Provider Name */}
        <p className="text-sm font-semibold text-primary mb-2">
          {providerName}
        </p>

        {/* Title */}
        <h3 className="text-lg font-semibold text-second-primary-900 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, index) => (
              <StarFilled
                key={index}
                className="text-sm"
                style={{
                  color:
                    index < rating
                      ? "var(--color-rating-filled)"
                      : "var(--color-rating)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

        {/* Field, Time, Cost (single line on desktop; wraps on mobile) */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
          <span className="inline-block text-second-primary-800 px-3 py-2 border border-second-primary rounded-2xl bg-field">
            {field}
          </span>

          <div className="flex items-center gap-1 text-gray-text px-3 py-2 border border-gray-text rounded-2xl bg-field">
            <ClockCircleOutlined />
            {deliveryTime}
          </div>

          <div className="flex items-center gap-1 text-primary px-3 py-2 border border-primary rounded-2xl bg-field">
            <TagFilled />
            {cost}
          </div>
        </div>

        {/* View Details Button */}
        <Link to={getDetailPath()}>
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
  );
};

export default ServiceCard;
