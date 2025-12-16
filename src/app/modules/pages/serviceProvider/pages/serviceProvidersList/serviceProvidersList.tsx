import CardStatistic from "@shared/components/cardStatistic/cardStatistic";
import CustomTable from "@shared/components/customTable/customtable";
import { useApiQuery } from "@shared/services/api";
import { ServiceStatusEnum } from "@shared/services/sharedService";
import { useCallback, useState } from "react";
import type { ServiceProvidersListFilterQuery } from "../../serviceProviders.model";
import {
  getSeriviceProvidersStatus,
  getServiceProviders,
} from "../../serviceProvidersServices";
import { serviceProvidersListColumns } from "./serviceProvidersListConfig";
import ServiceProvidersListFilter from "../../components/serviceProvidersListFilter/serviceProvidersListFilter";

const ServiceProvidersList = () => {
  const [filter, setFilter] = useState<ServiceProvidersListFilterQuery>({
    page: 1,
    per_page: 10,
  });

  const { data: serviceProvidersStatus } = useApiQuery(
    ["serviceProvidersStatus"],
    () => getSeriviceProvidersStatus(),
    { retry: false }
  );

  const handleFilterChange = useCallback(
    (filterValues: ServiceProvidersListFilterQuery) => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        ...filterValues,
      }));
    },
    []
  );

  const handlePaginationChange = useCallback((page: number, size: number) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: page,
      per_page: size,
    }));
  }, []);

  const { data: serviceProvidersData, isLoading } = useApiQuery(
    ["getServiceRequests", filter],
    () => {
      return getServiceProviders(filter!);
    },
    { retry: false, enabled: !!filter }
  );

  return (
    <div className="py-10">
      <div className="flex gap-5 flex-wrap flex-row flex-center justify-start">
        <CardStatistic
          title="إجمالي الخدمات"
          icon="/images/elements_1.svg"
          value={serviceProvidersStatus?.total ?? 0}
          classesName={[
            "border border-second-primary p-4 rounded-xl w-64 min-w-64",
          ]}
        />
        <CardStatistic
          title="الطلبات المكتملة"
          icon="/images/elements_2.svg"
          value={
            serviceProvidersStatus?.data?.find(
              (item) => item?.status === ServiceStatusEnum.active
            )?.count ?? 0
          }
          classesName={[
            "border border-green-dark text-green-dark rounded-lg p-4 rounded-xl bg-green-light w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="جاري العمل"
          icon="/images/elements_3.svg"
          value={
            serviceProvidersStatus?.data?.find(
              (item) => item?.status === ServiceStatusEnum.in_progress
            )?.count ?? 0
          }
          classesName={[
            "border border-blue-dark text-blue-dark rounded-lg p-4 rounded-xl bg-blue-light w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="الرصيد معلق"
          icon="/images/elements_4.svg"
          value={
            serviceProvidersStatus?.data?.find(
              (item) => item?.status === ServiceStatusEnum.review
            )?.count ?? 0
          }
          classesName={[
            "border border-orange-dark bg-orange-light text-orange-dark rounded-lg p-4 rounded-xl w-64 min-w-64",
          ]}
        />
      </div>
      <div className="bg-white shadow rounded-lg p-4 mt-5">
        <h1 className="text-lg font-semibold">قائمة مزوديّ الخدمات</h1>
        <div className="w-16 h-1 bg-primary mt-2 rounded mb-10"></div>
        <ServiceProvidersListFilter
          onFilterChange={handleFilterChange}
          serviceProvidersStatus={serviceProvidersStatus?.data ?? []}
          // serviceProvidersFields={serviceProvidersFields ?? []}
        />

        <CustomTable
          columns={serviceProvidersListColumns}
          dataSource={serviceProvidersData?.data ?? []}
          showSelection={false}
          className={["mt-6 overflow-x-auto"]}
          loading={isLoading}
          paginationMeta={serviceProvidersData?.meta}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default ServiceProvidersList;
