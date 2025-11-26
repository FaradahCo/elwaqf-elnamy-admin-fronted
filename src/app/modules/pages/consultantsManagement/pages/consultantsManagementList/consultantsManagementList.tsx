import React, { useState } from "react";
import ConsultationManagementItem from "../../components/consultationManagementItem/consultationManagementItem";
import {
  getConsultantsManagement,
  updateConsultantStatus,
} from "../../consultantsManagementService";
import type {
  ConsultantItem,
  ConsultantsListParams,
} from "../../model/consultantsManagementModel";
import { useApiMutation, useApiQuery } from "@shared/services/api";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { Pagination, Spin } from "antd";
import { useQueryClient } from "@tanstack/react-query";

const ConsultantsManagementList: React.FC = () => {
  const [filter, setFilter] = useState<ConsultantsListParams>({
    page: 1,
    per_page: 10,
  });

  const queryClient = useQueryClient();

  const { data: consultantsManagement, isLoading } = useApiQuery<
    PaginatedResponse<ConsultantItem>
  >(
    ["consultants-management", filter],
    () => getConsultantsManagement(filter),
    {
      retry: false,
      enabled: !!filter,
    }
  );

  const updateConsultantStatusMutation = useApiMutation(
    (payload: { team_id: number; status: string }) => {
      return updateConsultantStatus(payload.team_id, {
        status: payload.status,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["consultants-management"] });
      },
    }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div>
        <h1 className="text-xl font-bold text-second-primary">
          إدارة المستشارين
        </h1>
        <p className="w-16 h-1 bg-primary mt-2 rounded mb-10"></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {consultantsManagement?.data?.map((consultant) => (
          <ConsultationManagementItem
            key={consultant.team_id}
            consultant={consultant}
            onUpdateConsultantStatus={updateConsultantStatusMutation.mutate}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination
          showSizeChanger
          onShowSizeChange={(page, pageSize) => {
            setFilter({ ...filter, page, per_page: pageSize });
          }}
          defaultCurrent={filter.page || 1}
          current={filter.page || 1}
          pageSize={filter.per_page || 10}
          total={consultantsManagement?.meta?.total || 0}
          onChange={(page, pageSize) => {
            setFilter({ ...filter, page, per_page: pageSize });
          }}
        />
      </div>
    </div>
  );
};

export default ConsultantsManagementList;
