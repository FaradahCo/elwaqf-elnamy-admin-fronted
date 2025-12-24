import CardStatistic from "@shared/components/cardStatistic/cardStatistic";
import { useApiQuery } from "@shared/services/api";

import { useMemo } from "react";
import {
  getStatusTag,
  ServiceStatusEnum,
} from "@shared/services/sharedService";
import CustomTable from "@shared/components/customTable/customtable";
import { getAlwaqfList, getAlWaqfStatus } from "../../alwaqfService";
import type { Alwaqf, AlwaqfFilterQuery } from "../../alwaqfModel";
import { alwaqfColumns } from "./alwaqfListConfig";
import { useListHook } from "@/app/hooks/listHook";
import type { PaginatedResponse } from "@shared/model/shared.model";
import type { CustomFilterType } from "@shared/components/custom-filter/custom-filter";
import { Select } from "antd";
import CustomFilter from "@shared/components/custom-filter/custom-filter";

const AlwaqfList = () => {
  const { data: alwaqfStatus } = useApiQuery(
    ["alwaqfStatus"],
    () => getAlWaqfStatus(),
    { retry: false }
  );

  const {
    data: alwaqfData,
    isLoading,
    handleFilterChange,
    handlePaginationChange,
  } = useListHook<PaginatedResponse<Alwaqf>, AlwaqfFilterQuery>({
    queryKey: "getAlwaqfList",
    fetchFn: getAlwaqfList,
    initialFilter: {
      page: 1,
      per_page: 10,
    },
    queryOptions: { retry: false },
  });

  const filters = useMemo(
    () => [
      {
        type: "input" as CustomFilterType,
        placeholder: "ابحث عن اسم الوقف",
        label: "اسم المستخدم أو المنظمة",
        name: "user_name",
      },
      {
        type: "select" as CustomFilterType,
        placeholder: "اختر الحالة",
        label: "الحالة",
        name: "status",
        options: (
          <>
            {alwaqfStatus?.data?.map((option) => (
              <Select.Option key={option?.status} value={option?.status}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: getStatusTag(option?.status ?? "")
                        ?.color,
                    }}
                  />
                  <span>{option?.label}</span>
                </div>
              </Select.Option>
            ))}
          </>
        ),
      },
    ],
    [alwaqfStatus?.data]
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
        <CustomFilter filters={filters} onFilterChange={handleFilterChange} />
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
