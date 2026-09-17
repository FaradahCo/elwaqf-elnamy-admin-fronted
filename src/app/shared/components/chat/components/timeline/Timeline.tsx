import { Spin } from "antd";
import type { Role, TimelineSection } from "../../chat.model";
import TimelineSectionGroup from "./TimelineSectionGroup";

interface TimelineProps {
  sections: TimelineSection[];
  role: Role;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
}

const Timeline = ({
  sections,
  role,
  isLoading = false,
  isFetchingNextPage = false,
}: TimelineProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spin size="large" />
      </div>
    );
  }

  if (!sections.length) {
    return (
      <div className="py-8 text-center text-sm text-gray-500">لا يوجد رسائل</div>
    );
  }

  return (
    <div className="space-y-4">
      {isFetchingNextPage ? (
        <div className="flex justify-center py-2">
          <Spin size="small" />
        </div>
      ) : null}

      {sections.map((section) => (
        <TimelineSectionGroup
          key={section.date_key}
          section={section}
          role={role}
        />
      ))}
    </div>
  );
};

export default Timeline;
