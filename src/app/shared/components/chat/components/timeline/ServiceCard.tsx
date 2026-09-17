import type { TimelineServiceItem } from "../../chat.model";

interface ServiceCardProps {
  item: TimelineServiceItem;
}

const ServiceCard = ({ item }: ServiceCardProps) => {
  return (
    <div className="my-6 flex justify-center">
      <div className="rounded-full bg-gray-100 px-5 py-2 text-center">
        <p className="text-sm text-gray-700">
          بدأت هذه المحادثة عن طريق خدمة{" "}
          <span className="font-semibold text-second-primary">
            {item.title ?? item.card?.title}
          </span>
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {item.created_time ?? item.created_at}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
