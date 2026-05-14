import { Avatar, Button, Spin } from "antd";
import { useApiQuery } from "@shared/services/api";
import { getServiceRequestById } from "../../followRequestsService";
import { useParams } from "react-router";
import Box from "../../components/box/box";
import ServiceDetails from "../../components/serviceDetails/serviceDetails";
import Service from "../../components/service/service";
import RequestHistroy from "../../components/requestHistory/requestHistory";
import Chat from "@shared/components/chat/Chat";

const followRequestsDetails = () => {
  const { id } = useParams();
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
            {/* <Avatar size="large" src={followRequest?.service.provider?.logo} /> */}
            <p className="text-[#0F1A2A] font-semibold text-lg">
              {followRequest?.client.name}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">التكلفة</p>
            <p className="flex items-center">
              {followRequest?.service.min_price}
              <img src="/images/SAR.svg" alt="sar" className="w-4 h-4" />
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">طريقة الدفع</p>
            <p>-</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">الفاتورة</p>
            <p>-</p>
          </div>
          <Button className="mt-6! self-end font-semibold!" type="text">
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
              {followRequest?.service.min_price}
              <img src="/images/SAR.svg" alt="sar" className="w-4 h-4" />
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">الفاتورة</p>
            <p>-</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">الحوالة</p>
            <p>-</p>
          </div>
          <Button className="mt-6! self-end font-semibold!" type="text">
            الانتقال إلى طلب المزود
          </Button>
        </Box>
        <Box title="المنصة  ">
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">نسبة المنصة</p>
            <p className="flex items-center">
              {followRequest?.service.min_price}
            </p>
            <p>كود الخصم</p>
            <p>-</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">القيمة</p>
            <p className="flex items-center">
              -
              <img src="/images/SAR.svg" alt="sar" className="w-4 h-4" />
            </p>
            <p>نسبة الخصم</p>
            <p>-</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">الحوالة</p>
            <p>-</p>
          </div>
        </Box>
        <Box title="المستشار">
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
              {followRequest?.service.min_price}
              <img src="/images/SAR.svg" alt="sar" className="w-4 h-4" />
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">النسبة</p>
            <p>-</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">القيمة</p>
            <p className="flex items-center">
              -
              <img src="/images/SAR.svg" alt="sar" className="w-4 h-4" />
            </p>
          </div>
          <Button className="mt-6! self-end font-semibold!" type="text">
            الانتقال إلى الإسناد المستشار
          </Button>
        </Box>
      </div>
      <ServiceDetails serviceDetails={followRequest!} />
      <Service outputs={followRequest?.service?.outputs || []} />
      <Chat
        chat_id={followRequest?.chat_id!}
        role="admin"
        user={{
          name: followRequest?.client.name!,
          image: followRequest?.service.provider?.logo,
          business_name: followRequest?.service.provider?.business_name,
        }}
      />
      <RequestHistroy activities={followRequest?.activities || []} />
    </div>
  );
};

export default followRequestsDetails;
