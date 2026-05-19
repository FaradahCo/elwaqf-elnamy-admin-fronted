import { Avatar, Spin } from "antd";
import { useApiQuery } from "@shared/services/api";
import { getServiceRequestById } from "../../followRequestsService";
import { Link, useParams } from "react-router";
import Box from "../../components/box/box";
import ServiceDetails from "../../components/serviceDetails/serviceDetails";
import Service from "../../components/service/service";
import RequestHistroy from "../../components/requestHistory/requestHistory";
import Chat from "@shared/components/chat/Chat";
import { alwaqfRoutePath } from "../../../alwaqf/alwaqfRoutes";
import { serviceProviderRoutePath } from "../../../serviceProvider/serviceProvidersRoutes";

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
            {followRequest?.accounting?.client?.cost ? (
              <p className="flex items-center">
                {followRequest?.accounting?.client?.cost}
                <img src="/images/SAR.svg" alt="sar" className="w-4 h-4" />
              </p>
            ) : (
              <p>-</p>
            )}
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">طريقة الدفع</p>
            <p>{followRequest?.accounting?.client?.payment_method || "-"}</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">الفاتورة</p>
            {followRequest?.accounting?.client?.invoice_url ? (
              <Link
                to={followRequest?.accounting?.client?.invoice_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 border border-gray! p-2!"
              >
                <img src="/images/pdf.svg" alt="تنزيل الفاتورة" />
                الفاتورة
              </Link>
            ) : (
              <p>-</p>
            )}
          </div>
          <Link
            to={alwaqfRoutePath.ALWAQF_DETAILS(followRequest?.client?.id!)}
            className="mt-6! self-end font-semibold! text-brand!"
          >
            الانتقال إلى الطلب
          </Link>
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
            <div className="text-[#0F1A2A] font-semibold">التكلفة</div>
            {followRequest?.accounting?.provider?.cost ? (
              <p className="flex items-center">
                {followRequest?.accounting?.provider?.cost}
                <img src="/images/SAR.svg" alt="sar" className="w-4 h-4" />
              </p>
            ) : (
              <p>-</p>
            )}
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">الفاتورة</p>
            {followRequest?.accounting?.provider?.invoice_url ? (
              <Link
                to={followRequest?.accounting?.provider?.invoice_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 border border-gray! p-2!"
              >
                <img src="/images/pdf.svg" alt="تنزيل الفاتورة" />
                الفاتورة
              </Link>
            ) : (
              <p>-</p>
            )}
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">الحوالة</p>
            {followRequest?.accounting?.provider?.transfer_url ? (
              <Link
                to={followRequest?.accounting?.provider?.transfer_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 border border-gray! p-2!"
              >
                <img src="/images/pdf.svg" alt="تنزيل الحوالة" />
                الإيصال
              </Link>
            ) : (
              <p>-</p>
            )}
          </div>
          <Link
            to={serviceProviderRoutePath.SERVICE_PROVIDERS_DETAILS(
              followRequest?.service?.provider?.id!,
            )}
            className="mt-6! self-end font-semibold! text-brand!"
          >
            الانتقال إلى طلب المزود
          </Link>
        </Box>
        <Box title="المنصة  ">
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">نسبة المنصة</p>
            <p className="flex items-center">
              {followRequest?.accounting?.platform?.percentage + "%"}
            </p>
            <p>كود الخصم</p>
            <p>{followRequest?.accounting?.platform?.discount_code || "-"}</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold">القيمة</p>
            <p className="flex items-center">
              {followRequest?.accounting?.platform?.percentage_value || "000"}
              <img src="/images/SAR.svg" alt="sar" className="w-4 h-4" />
            </p>
            <p>نسبة الخصم</p>
            <p>
              {followRequest?.accounting?.platform?.discount_percentage + "%"}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#0F1A2A] font-semibold ">القيمة</p>
            <p className="flex items-center">
              {followRequest?.accounting?.platform?.discount_value || "00"}
              <img src="/images/SAR.svg" alt="sar" className="w-4 h-4" />
            </p>
          </div>
        </Box>
        <Box title="المستشار">
          <div className="flex gap-4 items-center">
            {/* <Avatar
              className="shadow-lg"
              size="large"
              src={followRequest?.service.provider?.logo}
              alt={followRequest?.service.provider?.business_name}
            /> */}
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
          {/* <Link
            to="/"
            className="mt-6! self-end font-semibold! text-brand!"
            type="text"
          >
            الانتقال إلى الإسناد المستشار
          </Link> */}
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
