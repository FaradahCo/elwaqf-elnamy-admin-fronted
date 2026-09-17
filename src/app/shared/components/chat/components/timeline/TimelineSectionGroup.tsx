import type { Role, TimelineSection } from "../../chat.model";
import TimelineItemRenderer from "./TimelineItemRenderer";

interface TimelineSectionGroupProps {
  section: TimelineSection;
  role: Role;
}

const TimelineSectionGroup = ({
  section,
  role,
}: TimelineSectionGroupProps) => {
  return (
    <div>
      <div className="my-4 flex justify-center">
        <div className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
          {section.label}
        </div>
      </div>

      {section.items.map((item) => (
        <TimelineItemRenderer
          key={`${item.kind}-${item.id}`}
          item={item}
          role={role}
        />
      ))}
    </div>
  );
};

export default TimelineSectionGroup;
