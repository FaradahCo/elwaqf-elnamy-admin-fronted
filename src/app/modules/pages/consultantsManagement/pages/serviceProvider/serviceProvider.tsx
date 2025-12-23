import { useApiQuery } from "@shared/services/api";
import { useParams } from "react-router";
import {
  getServiceProviderProfile,
  getServiceProviderServices,
} from "../../consultantsManagementService";
import ServiceCard from "../../components/serviceCard/serviceCard";

const ServiceProvider = () => {
  const { id } = useParams();
  const { data: serviceProvider } = useApiQuery(
    ["service-provider-profile", Number(id)],
    () => getServiceProviderProfile(id),
    {
      enabled: !!id,
      retry: false,
    }
  );
  const { data: serviceProviderServices } = useApiQuery(
    ["service-provider-services", Number(id)],
    () => getServiceProviderServices(id),
    {
      enabled: !!id,
      retry: false,
    }
  );
  return (
    <div className="flex gap-4">
      <div className="w-1/3 self-start bg-white shadow rounded-xl p-6 py-8 flex flex-col justify-between gap-4">
        <div className="flex flex-col items-center">
          <img
            src={
              serviceProvider?.profile?.at(0)?.logo || "/images/empty-user.svg"
            }
            alt={serviceProvider?.name}
          />
          <h1 className="text-second-primary text-xl font-bold">
            {serviceProvider?.profile?.at(0)?.business_name}
          </h1>
          <p>
            <span>{serviceProvider?.profile?.at(0)?.city}</span>,
            <span>{serviceProvider?.profile?.at(0)?.country}</span>
          </p>
          <p className="text-gray-500">انضم في {serviceProvider?.created_at}</p>
        </div>
        <div>
          <h2 className="text-second-primary font-medium">احصائيات</h2>
          <ul className="flex flex-col gap-3 mt-8">
            <li className="flex justify-between">
              <p>الجلسات الاستشارية</p>
              <p>2</p>
            </li>
            <li className="flex justify-between">
              <p>العروض المرسلة</p>
              <p>12</p>
            </li>
            <li className="flex justify-between">
              <p>المقالات</p>
              <p>22</p>
            </li>
            <li className="flex justify-between">
              <p>الخدمات المعتمدة</p>
              <p>222</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-2/3 p-6 bg-white rounded-xl shadow flex flex-col gap-4">
        <div>
          <h3 className="font-bold text-base">نبذة تعريفية</h3>
          <p>{serviceProvider?.profile?.at(0)?.bio ?? "-"}</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-base">المجالات</h3>
          <p>
            {serviceProvider?.profile?.at(0)?.fields?.map((field) => (
              <span
                key={field.id}
                className="rounded-full inline-block py-2 text-md border ml-2 px-3 border-second-primary"
              >
                {field.name}
              </span>
            ))}
          </p>
          <div>
            <h3 className="font-bold text-base mb-4">الخدمات</h3>
            <div className="grid grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-4">
              {serviceProviderServices?.data?.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServiceProvider;
