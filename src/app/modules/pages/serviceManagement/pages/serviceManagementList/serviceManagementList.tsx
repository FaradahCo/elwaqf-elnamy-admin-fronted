import CardStatistic from "@shared/components/cardStatistic/cardStatistic";
import CustomTable from "@shared/components/customTable/customtable";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { useApiQuery } from "@shared/services/api";
import { useState } from "react";
import ServiceManagementFilter from "../../components/serviceManagementFilter/serviceManagementFilter";
import {
  type ServiceData,
  type ServiceManagementQuery,
} from "../../model/serviceProviderList";
import { ServiceManagementService } from "../../serviceManagementService";
import { getColumnsList } from "./serviceManagementListConfig";

export const ServiceManagementList = () => {
  const [serviceType, setServiceType] = useState<string>("service");
  const [filter, setFilter] = useState<ServiceManagementQuery>({
    type: "service",
  });

  const handleServiceTypeChange = (type: string) => {
    console.log("🔄 Service type changed to:", type);
    setServiceType(type);
  };

  const handleSelectionChange = (
    _selectedRowKeys: React.Key[],
    selectedRows: ServiceData[]
  ) => {
    console.log("Selected services:", selectedRows);
  };

  const { data: serviceData, isLoading } = useApiQuery<
    PaginatedResponse<ServiceData>
  >(
    ["admin/services", filter],
    () => ServiceManagementService.getServices(filter),
    {
      retry: false,
    }
  );

  return (
    <div className="py-10">
      <div className="flex gap-5 flex-wrap flex-row flex-center justify-between">
        <CardStatistic
          title="خدمة"
          icon="/images/elements.svg"
          value={35}
          classesName={[
            "border border-second-primary p-4 rounded-xl w-64 min-w-64",
          ]}
        />
        <CardStatistic
          title="نشطة"
          icon="/images/elements.svg"
          value={28}
          classesName={[
            "border border-green-dark text-green-dark rounded-lg p-4 rounded-xl bg-green-light w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="بانتظار الاعتماد"
          icon="/images/elements.svg"
          value={28}
          classesName={[
            "border border-orange-dark bg-orange-light text-orange-dark rounded-lg p-4 rounded-xl w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="معلّقة"
          icon="/images/elements.svg"
          value={20}
          classesName={[
            "border border-gray-dark bg-gray-light text-gray-dark rounded-lg p-4 rounded-xl w-64 min-w-64",
          ]}
        />
      </div>
      <div className="bg-white shadow rounded-lg p-4 mt-5">
        <h1 className="text-lg font-semibold">إدارة الخدمات</h1>
        <div className="w-16 h-1 bg-primary mt-2 rounded mb-10"></div>
        <ServiceManagementFilter
          onFilterChange={setFilter}
          onServiceTypeChange={handleServiceTypeChange}
        />

        <CustomTable<ServiceData>
          columns={getColumnsList(serviceType)}
          dataSource={serviceData?.data ?? []}
          showSelection={true}
          onSelectionChange={handleSelectionChange}
          className={["mt-6"]}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default ServiceManagementList;
