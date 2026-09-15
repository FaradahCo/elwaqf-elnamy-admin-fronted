import type { TimelineDeliverableItem } from "../../chat.model";
import { Tag } from "antd";
import { getStatusTag } from "@shared/services/sharedService";

interface DeliverableCardProps {
  item: TimelineDeliverableItem;
}

const DeliverableCard = ({ item }: DeliverableCardProps) => {
  const card = item.card;
  const statusConfig = card?.status ? getStatusTag(card.status) : null;

  return (
    <div className="my-3 rounded-lg border border-purple-200 bg-purple-50 p-4 text-right">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs text-gray-500">
          {item.created_time ?? item.created_at}
        </span>
        <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
          مُخرج
        </span>
      </div>

      {card?.title ? (
        <h4 className="mb-1 text-sm font-semibold text-second-primary">
          {card.title}
        </h4>
      ) : null}

      {card?.status_label ? (
        <div className="mt-2">
          <Tag
            className="px-2! py-0.5! text-xs!"
            color={statusConfig?.color ?? "default"}
          >
            {card.status_label}
          </Tag>
        </div>
      ) : null}

      {card?.files && card.files.length > 0 ? (
        <div className="mt-3 space-y-2">
          {card.files.map((file) => (
            <a
              key={file.id ?? file.uuid}
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-purple-100 bg-white px-3 py-2 text-sm text-primary hover:bg-purple-50"
            >
              <img src="/images/pdf.svg" alt="" className="h-5 w-5" />
              <span className="truncate">{file.name ?? "ملف المخرج"}</span>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default DeliverableCard;
