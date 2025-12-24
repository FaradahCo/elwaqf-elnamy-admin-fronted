import React from "react";
import ConsultationManagementItem from "../../components/consultationManagementItem/consultationManagementItem";
import {
  getConsultantsManagement,
  updateConsultantStatus,
} from "../../consultantsManagementService";
import type {
  ConsultantItem,
  ConsultantsListParams,
  UpdateConsultantStatusPayload,
} from "../../model/consultantsManagementModel";
import { useApiMutation } from "@shared/services/api";
import type { PaginatedResponse } from "@shared/model/shared.model";
import { Button, Form, Pagination, Spin } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useListHook } from "@/app/hooks/listHook";

const ConsultantsManagementList: React.FC = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const {
    data: consultantsManagement,
    handlePaginationChange,
    filter,
    isLoading,
  } = useListHook<PaginatedResponse<ConsultantItem>, ConsultantsListParams>({
    queryKey: "consultants-management",
    fetchFn: getConsultantsManagement,
    initialFilter: {
      page: 1,
      per_page: 10,
    },
    queryOptions: { retry: false },
  });
  const updateConsultantStatusMutation = useApiMutation(
    (payload: UpdateConsultantStatusPayload) => {
      return updateConsultantStatus(payload);
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

  const onFinish = (values: UpdateConsultantStatusPayload) => {
    updateConsultantStatusMutation.mutate(values);
  };
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div>
        <h1 className="text-xl font-bold text-second-primary">
          إدارة المستشارين
        </h1>
        <p className="w-16 h-1 bg-primary mt-2 rounded mb-10"></p>
      </div>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {consultantsManagement?.data?.map((consultant, index) => (
            <ConsultationManagementItem
              index={index}
              key={consultant.team_id}
              consultant={consultant}
            />
          ))}
        </div>
        <div className="flex justify-end mt-8">
          <Button
            htmlType="submit"
            size="large"
            type="primary"
            className="py-6! px-8!"
            disabled={updateConsultantStatusMutation.isPending}
          >
            حفظ
          </Button>
        </div>
      </Form>

      <div className="mt-6 flex justify-center">
        <Pagination
          showSizeChanger
          onShowSizeChange={handlePaginationChange}
          defaultCurrent={filter.page || 1}
          current={filter.page || 1}
          pageSize={filter.per_page || 10}
          total={consultantsManagement?.meta?.total || 0}
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default ConsultantsManagementList;
