import CardStatistic from "@shared/components/cardStatistic/cardStatistic";
import CustomTable from "@shared/components/customTable/customtable";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { useApiQuery } from "@shared/services/api";
import { useState, useCallback } from "react";
import { useSearchParams } from "react-router";
import ServiceManagementFilter from "../../components/serviceManagementFilter/serviceManagementFilter";
import {
  type ServiceData,
  type ServiceManagementQuery,
} from "../../model/serviceProviderList";
import { getColumnsList } from "./serviceManagementListConfig";
import { getServices } from "../../serviceManagementService";

export const ServiceManagementList = () => {
  const [searchParams] = useSearchParams();
  const [serviceType, setServiceType] = useState<string>("service");

  // Initialize filter from URL params
  const [filter, setFilter] = useState<ServiceManagementQuery>(() => {
    const currentPage = Number(searchParams.get("page")) || 1;
    return {
      type: "service",
      page: currentPage,
    };
  });

  const handleServiceTypeChange = useCallback((type: string) => {
    setServiceType(type);
  }, []);

  const handleSelectionChange = useCallback(
    (_selectedRowKeys: React.Key[], selectedRows: ServiceData[]) => {
      console.log("Selected services:", selectedRows);
    },
    []
  );

  const handlePaginationChange = useCallback((page: number) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      page,
    }));
  }, []);

  const handleFilterChange = useCallback(
    (newFilter: ServiceManagementQuery) => {
      setFilter(() => ({
        ...newFilter,
        page: 1,
      }));
    },
    []
  );

  const { data: serviceData, isLoading } = useApiQuery<
    PaginatedResponse<ServiceData>
  >(["admin/services", filter], () => getServices(filter), {
    retry: false,
  });

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
          onFilterChange={handleFilterChange}
          onServiceTypeChange={handleServiceTypeChange}
        />

        <CustomTable<ServiceData>
          columns={getColumnsList(serviceType)}
          dataSource={serviceData?.data ?? []}
          showSelection={true}
          onSelectionChange={handleSelectionChange}
          className={["mt-6"]}
          loading={isLoading}
          paginationMeta={serviceData?.meta}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default ServiceManagementList;
