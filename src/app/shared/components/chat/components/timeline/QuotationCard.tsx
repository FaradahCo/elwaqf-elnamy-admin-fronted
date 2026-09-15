import { useState } from "react";
import { Tag, Spin } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  LoadingOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { getStatusTag } from "@shared/services/sharedService";
import { printQuotation } from "../../chatService";
import type { Role, TimelineQuotationItem } from "../../chat.model";

interface QuotationCardProps {
  item: TimelineQuotationItem;
  role: Role;
}

const QuotationCard = ({ item, role }: QuotationCardProps) => {
  const card = item.card;
  const statusConfig = card?.status ? getStatusTag(card.status) : null;
  const isQuoted = statusConfig?.text === "بانتظار الدفع";
  const isAccepted =
    card?.status === "accepted" || statusConfig?.text === "مقبول";
  const isRejected = statusConfig?.text === "مرفوض";
  const isCancelled = statusConfig?.text === "ملغي";
  const isNegative = isRejected || isCancelled;
  const [isDownloading, setIsDownloading] = useState(false);

  const handleOpenQuotation = async () => {
    if (card?.offer_document) {
      window.open(card.offer_document, "_blank", "noopener,noreferrer");
      return;
    }

    if (!card?.id) return;

    try {
      setIsDownloading(true);
      const blob = await printQuotation(role, card.id);
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(blobUrl), 200);
    } finally {
      setIsDownloading(false);
    }
  };

  const cardStyle = {
    container: isRejected
      ? "border-red-200"
      : isCancelled
        ? "border-gray-300"
        : isQuoted || isAccepted
          ? "border-second-primary"
          : "border-gray-200",
    header: isRejected
      ? "bg-red-50"
      : isCancelled
        ? "bg-gray-100"
        : "bg-second-primary/10",
  };

  return (
    <div
      className={`my-3 rounded-lg border bg-white text-right shadow-sm ${cardStyle.container}`}
    >
      <div
        className={`flex items-center justify-between gap-2 rounded-t-lg p-4 ${cardStyle.header}`}
      >
        <div>
          <h1 className="font-bold md:text-lg">
            عرض سعر
            {card?.quotation_number ? ` #${card.quotation_number}` : ""}
          </h1>
          <p className="text-sm text-gray-500">
            {item.created_time ?? item.created_at}
          </p>
        </div>
        {card?.status_label && (
          <Tag
            className="px-2! py-0.5! text-xs!"
            color={statusConfig?.color ?? "default"}
          >
            {card.status_label}
          </Tag>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-200 p-4">
        <h1 className="font-bold text-gray-500 md:text-lg">إجمالي قيمة العرض</h1>
        {card?.price && (
          <p
            className={`flex items-center justify-center gap-2 text-xl font-bold ${
              isNegative
                ? "text-gray-400 line-through decoration-1"
                : "text-brand"
            }`}
          >
            {card.price}
            <img
              src="/images/SAR.svg"
              alt="price"
              className={`h-5 w-5 ${isNegative ? "opacity-40" : ""}`}
            />
          </p>
        )}
        <p className="font-medium text-gray-500 md:text-md">
          شامل ضريبة القيمة المضافة 15%
        </p>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 p-4 md:flex-row">
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="mt-1 flex items-center justify-center gap-2 text-md font-medium text-gray-500">
            <CalendarOutlined />
            تاريخ إنشاء العرض
          </div>
          <div className="text-xs font-medium text-gray-500">
            {item.created_at}
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="mt-1 flex items-center justify-center gap-2 text-md font-medium text-gray-500">
            <ClockCircleOutlined />
            صالح حتى
          </div>
          <div className="text-xs font-medium text-gray-500">
            {card?.valid_until}
          </div>
        </div>
      </div>

      <div className="m-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between rounded-lg p-3">
          <div className="flex gap-2">
            <img src="/images/pdf.svg" alt="" className="h-6 w-6" />
            <p className="font-semibold text-gray-800">عرض سعر.pdf</p>
          </div>

          <button
            type="button"
            onClick={handleOpenQuotation}
            disabled={isDownloading || (!card?.id && !card?.offer_document)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition hover:bg-brand/10 disabled:opacity-50"
          >
            {isDownloading ? (
              <Spin
                indicator={<LoadingOutlined className="text-xl text-brand!" spin />}
              />
            ) : (
              <DownloadOutlined className="text-2xl text-brand!" />
            )}
          </button>
        </div>
      </div>

      {isAccepted && (
        <div className="mx-4 mb-4 flex items-center justify-center gap-2 rounded-md border border-green-200 bg-green-50 py-2 text-sm font-medium text-green-700">
          <CheckOutlined />
          تم قبول عرض السعر
        </div>
      )}
      {isRejected && (
        <div className="mx-4 mb-4 flex items-center justify-center gap-2 rounded-md border border-red-200 bg-red-50 py-2 text-sm font-medium text-red-600">
          <CloseOutlined />
          تم رفض عرض السعر
        </div>
      )}
      {isCancelled && (
        <div className="mx-4 mb-4 flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-gray-50 py-2 text-sm font-medium text-gray-600">
          <CloseOutlined />
          انتهت صلاحية العرض
        </div>
      )}
    </div>
  );
};

export default QuotationCard;
