import { ConvertToNumber } from "@/app/utilites/transformData";
import { useApiMutation } from "@shared/services/api";
import {
  durationNameConfig,
  getStatusTag,
} from "@shared/services/sharedService";
import { Button, Tag } from "antd";
import React from "react";
import type {
  FollowRequest,
  PreviewQuotationPayload,
  PreviewQuotationsAfterSendQouationsPayload,
} from "../../model/followRequestsModel";
import {
  previewQuotation,
  previewQuotationsAfterSendQouations,
} from "../../followRequestsService";
import OfferDetails from "../offerDetails/offerDetails";

const ServiceDetails = React.memo(
  ({ serviceDetails }: { serviceDetails: FollowRequest }) => {
    const previewQuoat = useApiMutation<
      PreviewQuotationsAfterSendQouationsPayload | PreviewQuotationPayload,
      Blob
    >(
      (
        payload:
          | PreviewQuotationsAfterSendQouationsPayload
          | PreviewQuotationPayload,
      ) => {
        if (serviceDetails?.latest_quotation?.id) {
          return previewQuotationsAfterSendQouations(
            payload as PreviewQuotationsAfterSendQouationsPayload,
          );
        }
        return previewQuotation(payload as PreviewQuotationPayload);
      },
      {
        onSuccess: async (response: Blob) => {
          const blobUrl = window.URL.createObjectURL(response);
          window.open(blobUrl, "_blank", "noopener,noreferrer");
        },
      },
    );

    const onPreivewQuotation = () => {
      if (serviceDetails?.latest_quotation?.id) {
        previewQuoat.mutate({
          quotation_ids: [serviceDetails?.latest_quotation?.id!],
        });
      } else {
        previewQuoat.mutate({
          quotations: [
            {
              service_id: ConvertToNumber(serviceDetails?.service?.id!),
              price: ConvertToNumber(
                serviceDetails?.latest_quotation?.price! as any,
              ),
              valid_until: 3,
            },
          ],
        });
      }
    };
    return (
      <div className="bg-white shadow p-4 mt-4">
        <div className="flex justify-between gap-4 flex-wrap">
          <div className="flex-1">
            <p className="text-lg font-bold text-primary">تفاصيل الخدمة</p>
            <p className="h-1 bg-second-primary w-[5%] mt-1"></p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-4">
            <p className="text-primary">رقم الطلب #{serviceDetails?.id}</p>
            <p className="text-primary">
              تاريخ الطلب {serviceDetails?.created_at}
            </p>
          </div>
          <Tag
            color={getStatusTag(serviceDetails?.status).color}
            className="text-lg!"
          >
            {serviceDetails?.status_label}
          </Tag>
        </div>
        <hr className="mt-4 text-gray-200" />

        <div className="mt-3">
          <p className="flex justify-between">
            <span className="text-primary font-semibold text-lg">الخدمة</span>
            <span> {serviceDetails?.service?.title}</span>
          </p>
          <p className="flex justify-between mt-3">
            <span className="text-primary font-semibold text-lg">المنظمة</span>
            <span>{serviceDetails?.client?.name}</span>
          </p>
          <p className="flex justify-between mt-3">
            <span className="text-primary font-semibold text-lg">
              مسؤول الخدمة
            </span>
            <span>{serviceDetails?.service?.provider?.business_name}</span>
          </p>
          <p className="flex justify-between mt-3">
            <span className="text-primary font-semibold text-lg">
              تاريخ بداية/نهاية الخدمة
            </span>
            {serviceDetails?.start_date ? (
              <span>
                {serviceDetails?.start_date}, {serviceDetails?.end_date ?? "-"}
              </span>
            ) : (
              "--"
            )}
          </p>
          <p className="flex justify-between mt-3">
            <span className="text-primary font-semibold text-lg">
              مدة تنفيذ الخدمة
            </span>
            <span>
              {serviceDetails.service.duration?.time +
                " " +
                durationNameConfig[
                  serviceDetails.service.duration
                    ?.type as keyof typeof durationNameConfig
                ]}
            </span>
          </p>

          <div className="flex justify-between mt-3">
            <span className="text-primary font-semibold text-lg">
              العرض الفني والمالي
            </span>
            {serviceDetails?.latest_quotation ? (
              <Button
                htmlType="button"
                disabled={previewQuoat.isPending}
                loading={previewQuoat.isPending}
                className="flex items-center gap-2 border border-gray-200 rounded-md py-2 px-1 cursor-pointer hover:bg-gray-100"
                onClick={() => onPreivewQuotation()}
              >
                <img src="/images/pdf.svg" alt="file" className="w-6 h-6" />
                العرض الفني والمالي.pdf
              </Button>
            ) : (
              "--"
            )}
          </div>

          <div className="flex justify-between mt-3">
            <span className="text-primary font-semibold text-lg">التكلفة</span>
            <p className="flex items-center">
              {serviceDetails?.invoice?.total_cost ?? "-"}{" "}
              <img src="/images/SAR.svg" alt="sar" className="w-4 h-4" />
            </p>
          </div>
        </div>

        <OfferDetails quotations={serviceDetails?.quotations!} />
      </div>
    );
  },
);
export default ServiceDetails;
