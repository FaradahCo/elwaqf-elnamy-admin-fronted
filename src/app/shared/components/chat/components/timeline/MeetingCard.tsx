import { Tag } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import type { TimelineMeetingItem } from "../../chat.model";
import { getStatusTag } from "@shared/services/sharedService";

interface MeetingCardProps {
  item: TimelineMeetingItem;
}

const MeetingCard = ({ item }: MeetingCardProps) => {
  const card = item.card;
  const statusConfig = card?.status ? getStatusTag(card.status) : null;

  return (
    <div className="my-3 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between bg-second-primary/10 p-4">
        <div className="text-right">
          <h2 className="font-bold md:text-xl">
            {item.title || "جلسة استشارية"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {item.created_time ?? item.created_at}
          </p>
        </div>
        {card?.status_label && (
          <Tag
            className="px-3! py-1! text-sm!"
            color={statusConfig?.color ?? "default"}
          >
            {card.status_label}
          </Tag>
        )}
      </div>

      <div className="border-b border-gray-200 py-8 text-center">
        <h2 className="font-bold text-brand md:text-xl">{card?.meeting_at}</h2>
        {card?.duration && (
          <p className="mt-3 font-medium text-gray-500 md:text-xl">
            {card.duration} دقيقة
          </p>
        )}
      </div>

      {card?.meet_url && (
        <div className="p-4">
          <a
            href={card.meet_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-brand"
          >
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-800 md:text-lg">
                رابط الاجتماع
              </span>
            </div>
            <LinkOutlined className="text-primary md:text-[28px]" />
          </a>
        </div>
      )}
    </div>
  );
};

export default MeetingCard;
