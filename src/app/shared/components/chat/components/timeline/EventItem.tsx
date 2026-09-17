import type { TimelineEventItem } from "../../chat.model";
import { Tag } from "antd";

interface EventItemProps {
  item: TimelineEventItem;
}

const EventItem = ({ item }: EventItemProps) => {
  const title = item.action_type_label ?? item.title ?? "حدث";
  const description = item.description;

  return (
    <div className="my-3 flex justify-center">
      <div className="max-w-lg rounded-xl bg-gray-100 px-4 py-3 text-center text-sm text-gray-700">
        <p className="font-semibold text-primary">{title}</p>
        {description ? (
          <p className="mt-1 text-xs leading-5 text-gray-600">{description}</p>
        ) : null}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500">
          {item.actor_name ? <span>{item.actor_name}</span> : null}
          {item.status_snapshot?.label ? (
            <Tag className="m-0! px-2! py-0! text-[11px]!">
              {item.status_snapshot.label}
            </Tag>
          ) : null}
          {item.created_at ? <span>{item.created_at}</span> : null}
        </div>
      </div>
    </div>
  );
};

export default EventItem;
