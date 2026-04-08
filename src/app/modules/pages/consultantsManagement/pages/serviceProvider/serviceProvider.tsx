import { useApiQuery } from "@shared/services/api";
import { Pagination } from "antd";
import { useState } from "react";
import { useParams } from "react-router";
import ServiceCard from "../../components/serviceCard/serviceCard";
import { getServiceProviderProfile } from "../../consultantsManagementService";

const ServiceProvider = () => {
  const { id } = useParams();

  const [filter, setFilter] = useState({
    page: 1,
    per_page: 10,
  });
  const { data: serviceProvider } = useApiQuery(
    ["service-provider-profile", Number(id)],
    () => getServiceProviderProfile(id),
    {
      enabled: !!id,
      retry: false,
    },
  );

  return (
    <>
      <div className="flex gap-4">
        <div className="w-1/3 self-start bg-white shadow rounded-xl p-6 py-8 flex flex-col justify-between gap-4">
          <div className="flex flex-col items-center">
            <img
              src={serviceProvider?.logo || "/images/empty-user.svg"}
              alt={serviceProvider?.user_name}
            />
            <h1 className="text-second-primary text-xl font-bold">
              {serviceProvider?.business_name}
            </h1>
            <p>
              <span>{serviceProvider?.city}</span>,
              <span>{serviceProvider?.country || "-"}</span>
            </p>
            <p className="text-gray-500">
              انضم في {serviceProvider?.created_at || "-"}
            </p>
          </div>
          <div>
            <h2 className="text-second-primary font-medium">احصائيات</h2>
            <ul className="flex flex-col gap-3 mt-8">
              <li className="flex justify-between">
                <p>الجلسات الاستشارية</p>
                <p>{serviceProvider?.consultations_count || "-"}</p>
              </li>
              <li className="flex justify-between">
                <p>العروض المرسلة</p>
                <p>{serviceProvider?.quotations_count || "-"}</p>
              </li>
              <li className="flex justify-between">
                <p>الخدمات المعتمدة</p>
                <p>{serviceProvider?.active_services_count || "-"}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-2/3 p-6 bg-white rounded-xl shadow flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-base">نبذة تعريفية</h3>
            <p>{serviceProvider?.bio ?? "-"}</p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-base">المجالات</h3>
            <p>
              {serviceProvider?.fields?.map((field) => (
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
                {serviceProvider?.active_services?.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <Pagination
          showSizeChanger
          onShowSizeChange={(_, per_page) => {
            setFilter((prevFilter) => ({
              ...prevFilter,
              per_page,
            }));
          }}
          defaultCurrent={filter.page || 1}
          pageSizeOptions={["10", "50", "100", "200"]}
          current={filter.page || 1}
          pageSize={filter.per_page || 3}
          total={serviceProvider?.active_services_count}
          onChange={(page) =>
            setFilter((prevFilter) => ({ ...prevFilter, page }))
          }
        />
      </div>
    </>
  );
};
export default ServiceProvider;
