import type { Role, TimelineItem } from "../../chat.model";
import DeliverableCard from "./DeliverableCard";
import EventItem from "./EventItem";
import MeetingCard from "./MeetingCard";
import MessageItem from "./MessageItem";
import QuotationCard from "./QuotationCard";
import ServiceCard from "./ServiceCard";

interface TimelineItemRendererProps {
  item: TimelineItem;
  role: Role;
}

const TimelineItemRenderer = ({ item, role }: TimelineItemRendererProps) => {
  if (item.kind === "message") {
    return <MessageItem item={item} role={role} />;
  }

  if (item.kind === "quotation") {
    return <QuotationCard item={item} role={role} />;
  }

  if (item.kind === "meeting") {
    return <MeetingCard item={item} />;
  }

  if (item.kind === "deliverable") {
    return <DeliverableCard item={item} />;
  }

  if (item.kind === "service") {
    return <ServiceCard item={item} />;
  }

  if (item.kind === "event") {
    return <EventItem item={item} />;
  }

  return null;
};

export default TimelineItemRenderer;
