import CardStatistic from "@shared/components/cardStatistic/cardStatistic";
import { useApiQuery } from "@shared/services/api";

import { useState, useCallback } from "react";
import { ServiceStatusEnum } from "@shared/services/sharedService";
import CustomTable from "@shared/components/customTable/customtable";
import { getAlwaqfList, getAlWaqfStatus } from "../../alwaqfService";
import type { Alwaqf, AlwaqfFilterQuery } from "../../alwaqfModel";
import { alwaqfColumns } from "./alwaqfListConfig";
import AlwaqfListFilter from "../../components/alwaqfListFilter/alwaqfListFilter";

const AlwaqfList = () => {
  const [filter, setFilter] = useState<AlwaqfFilterQuery | null>({
    page: 1,
    per_page: 10,
  });

  const { data: alwaqfStatus } = useApiQuery(
    ["alwaqfStatus"],
    () => getAlWaqfStatus(),
    { retry: false }
  );

  const handleFilterChange = useCallback((filterValues: AlwaqfFilterQuery) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...filterValues,
    }));
  }, []);

  const handlePaginationChange = useCallback((page: number, size: number) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: page,
      per_page: size,
    }));
  }, []);

  const { data: alwaqfData, isLoading } = useApiQuery(
    ["getAlwaqfList", filter],
    () => {
      return getAlwaqfList(filter!);
    },
    { retry: false, enabled: !!filter }
  );

  return (
    <div className="py-10">
      <div className="flex gap-5 flex-wrap flex-row flex-center justify-start">
        <CardStatistic
          title="إجمالي الأوقاف"
          icon="/images/elements_1.svg"
          value={alwaqfStatus?.total ?? 0}
          classesName={[
            "border border-second-primary p-4 rounded-xl w-64 min-w-64",
          ]}
        />
        <CardStatistic
          title="الأوقاف النشطة"
          icon="/images/elements_2.svg"
          value={
            alwaqfStatus?.data?.find(
              (item) => item?.status === ServiceStatusEnum.active
            )?.count ?? 0
          }
          classesName={[
            "border border-green-dark text-green-dark rounded-lg p-4 rounded-xl bg-green-light w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="الأوقاف الغير نشطة"
          icon="/images/elements_3.svg"
          value={
            alwaqfStatus?.data?.find(
              (item) => item?.status === ServiceStatusEnum.inactive
            )?.count ?? 0
          }
          classesName={[
            "border border-blue-dark text-blue-dark rounded-lg p-4 rounded-xl bg-blue-light w-64 min-w-64",
          ]}
        />

        <CardStatistic
          title="الأوقاف المعلقة"
          icon="/images/elements_4.svg"
          value={
            alwaqfStatus?.data?.find(
              (item) => item?.status === ServiceStatusEnum.review
            )?.count ?? 0
          }
          classesName={[
            "border border-orange-dark bg-orange-light text-orange-dark rounded-lg p-4 rounded-xl w-64 min-w-64",
          ]}
        />
      </div>
      <div className="bg-white shadow rounded-lg p-4 mt-5">
        <h1 className="text-lg font-semibold">الأوقاف</h1>
        <div className="w-16 h-1 bg-primary mt-2 rounded mb-10"></div>
        <AlwaqfListFilter
          onFilterChange={handleFilterChange}
          aLwaqfStatus={alwaqfStatus?.data ?? []}
        />

        <CustomTable<Alwaqf>
          columns={alwaqfColumns}
          dataSource={alwaqfData?.data ?? []}
          showSelection={false}
          className={["mt-6 overflow-x-auto"]}
          loading={isLoading}
          paginationMeta={alwaqfData?.meta}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default AlwaqfList;
