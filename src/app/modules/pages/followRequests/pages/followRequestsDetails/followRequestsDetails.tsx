import Chat from "@shared/components/chat/Chat";
import { useApiQuery } from "@shared/services/api";
import { handleDownloadAttachment } from "@shared/services/sharedService";
import { Avatar, Button, Spin } from "antd";
import { useNavigate, useParams } from "react-router";
import { alwaqfRoutePath } from "../../../alwaqf/alwaqfRoutes";
import { serviceProviderRoutePath } from "../../../serviceProvider/serviceProvidersRoutes";
import Box from "../../components/box/box";
import RequestHistroy from "../../components/requestHistory/requestHistory";
import Service from "../../components/service/service";
import ServiceDetails from "../../components/serviceDetails/serviceDetails";
import { getServiceRequestById } from "../../followRequestsService";

const FollowRequestsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: followRequest, isLoading } = useApiQuery(
    ["follow-requests", id],
    () => getServiceRequestById(id!),
    {
      enabled: !!id,
    },
  );
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Box title="الوقف">
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold text-lg">
              {followRequest?.client.name}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">التكلفة</p>
            <p className="flex items-center">
              {followRequest?.accounting?.client?.cost ? (
                <>
                  {followRequest?.accounting?.client?.cost}
                  <img src="/images/SAR.svg" alt="sar" className="w-4 h-4" />
                </>
              ) : (
                "--"
              )}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">طريقة الدفع</p>
            <p>{followRequest?.accounting?.client?.payment_method ?? "--"}</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">الفاتورة</p>
            <p>
              {followRequest?.accounting?.client?.invoice_url ? (
                <Button
                  onClick={() =>
                    handleDownloadAttachment(
                      followRequest?.accounting?.client?.invoice_url ?? "",
                    )
                  }
                >
                  الفاتورة
                </Button>
              ) : (
                "--"
              )}
            </p>
          </div>
          <Button
            onClick={() =>
              navigate(
                alwaqfRoutePath.ALWAQF_REQUESTS(followRequest?.client?.id ?? 0),
              )
            }
            className="mt-6! self-end font-semibold! text-second-primary!"
            type="text"
          >
            الانتقال إلى صفحة الطلب
          </Button>
        </Box>
        <Box title="مزود الخدمة">
          <div className="flex gap-4 items-center">
            <Avatar
              className="shadow-lg"
              size="large"
              src={followRequest?.service.provider?.logo}
              alt={followRequest?.service.provider?.business_name}
            />
            <p className="text-[#0F1A2A] font-semibold text-lg">
              {followRequest?.service.provider?.business_name}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">التكلفة</p>
            <p className="flex items-center">
              {followRequest?.accounting?.provider?.cost ? (
                <>
                  {followRequest?.accounting?.provider?.cost}
                  <img src="/images/SAR.svg" alt="sar" className="w-4 h-4" />
                </>
              ) : (
                "--"
              )}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">الفاتورة</p>
            <p>
              {followRequest?.accounting?.provider?.invoice_url ? (
                <Button
                  onClick={() =>
                    handleDownloadAttachment(
                      followRequest?.accounting?.provider?.invoice_url ?? "",
                    )
                  }
                >
                  الفاتورة
                </Button>
              ) : (
                "--"
              )}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">الحوالة</p>
            <p>
              {followRequest?.accounting?.provider?.transfer_url ? (
                <Button
                  onClick={() =>
                    handleDownloadAttachment(
                      followRequest?.accounting?.provider?.transfer_url ?? "",
                    )
                  }
                >
                  الحوالة
                </Button>
              ) : (
                "--"
              )}
            </p>
          </div>
          <Button
            onClick={() =>
              navigate(
                serviceProviderRoutePath.SERVICE_PROVIDERS_DETAILS(
                  followRequest?.service?.provider?.id ?? 0,
                ),
              )
            }
            className="mt-6! self-end font-semibold! text-second-primary!"
            type="text"
          >
            الانتقال إلى المزود
          </Button>
        </Box>
        <Box title="المنصة">
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">نسبة المنصة</p>
            <p className="flex items-center">
              {followRequest?.accounting?.platform?.percentage}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">القيمة</p>
            <p className="flex items-center">
              {followRequest?.accounting?.platform?.discount_value ? (
                <span className="flex items-center gap-2">
                  <span>
                    {followRequest?.accounting?.platform?.discount_value}
                  </span>
                  <img src="/images/SAR.svg" alt="sar" className="w-4 h-4" />
                </span>
              ) : (
                "--"
              )}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">كود الخصم</p>
            <p>{followRequest?.accounting?.platform?.discount_code ?? "--"}</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">نسبة الخصم</p>
            <p>{followRequest?.accounting?.platform?.discount_percentage}</p>
          </div>
        </Box>
        <Box title="المستشار">
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold text-lg">
              {followRequest?.accounting?.consultant?.name}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">النسبة</p>
            <p>
              {followRequest?.accounting?.consultant?.percentage
                ? followRequest?.accounting?.consultant?.percentage + "%"
                : "0%"}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">القيمة</p>
            <p className="flex items-center">
              {followRequest?.accounting?.consultant?.value || "00"}
              <img src="/images/SAR.svg" alt="sar" className="w-4 h-4" />
            </p>
          </div>
        </Box>
      </div>
      <ServiceDetails serviceDetails={followRequest!} />
      <Service outputs={followRequest?.service?.outputs || []} />
      {followRequest?.chat_id != null && (
        <Chat
          chat_id={followRequest.chat_id}
          role="admin"
          user={{
            name: followRequest.client?.name ?? "",
            image: followRequest.service?.provider?.logo,
            business_name: followRequest.service?.provider?.business_name,
          }}
        />
      )}
      <RequestHistroy activities={followRequest?.activities || []} />
    </div>
  );
};

export default FollowRequestsDetails;
