import { CustomTable } from "@shared/components/customTable/customtable";
import { useApiMutation, useApiQuery } from "@shared/services/api";
import {
  getSeriviceStatus,
  getStatusTag,
  ServiceStatusEnum,
} from "@shared/services/sharedService";
import {
  Button,
  Collapse,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Spin,
  Tag,
} from "antd";
import { useNavigate, useParams } from "react-router";
import { type ServiceData } from "../../model/serviceProviderList";
import {
  getService,
  getRevisionsByServiceId,
  approveServiceRevision,
  rejectServiceRevision,
  updateService,
} from "../../serviceManagementService";
import { serviceLogColumns } from "./serviceReviewConfig";
import { useRef, useState } from "react";
import type { RejectServiceRef } from "../../components/rejectService/rejectService";
import RejectService from "../../components/rejectService/rejectService";
import { ConvertToNumber } from "@/app/utilites/transformData";
import { useQueryClient } from "@tanstack/react-query";

const { TextArea } = Input;

const ServiceReview = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rejectServiceRef = useRef<RejectServiceRef>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleOk = async () => {
    const formData = await rejectServiceRef.current?.validateForm();
    rejectServiceRevisionMutation.mutate(formData);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    rejectServiceRef.current?.resetForm();
  };

  const { data: serviceData, isLoading } = useApiQuery(
    ["serviceRevisionData", id],
    () => getService(id!),
    {
      enabled: !!id,
    }
  );

  const { data: revisionsByServiceData } = useApiQuery(
    ["revisions-services-id", id],
    () => getRevisionsByServiceId({ service_id: id }),
    {
      enabled: !!serviceData?.id,
      retry: false,
    }
  );

  const approveServiceRevisionMutation = useApiMutation(
    () => approveServiceRevision(serviceData?.pending_revision?.id!),
    {
      onSuccess: () => {
        navigate("/admin/service-management");
      },
    }
  );

  const rejectServiceRevisionMutation = useApiMutation(
    (formData: any) => {
      return rejectServiceRevision(serviceData?.pending_revision?.id!, {
        reason: formData?.reason,
      });
    },
    {
      onSuccess: () => {
        setIsModalOpen(false);
        rejectServiceRef.current?.resetForm();
        navigate("/admin/service-management");
      },
    }
  );

  const serviceLogCollapseItems = [
    {
      key: "service-log",
      label: "سجل الخدمة",
      children: (
        <CustomTable
          columns={serviceLogColumns}
          dataSource={revisionsByServiceData?.data!}
          showPagination={false}
          showSelection={false}
          className={[]}
        />
      ),
    },
  ];
  const updateStatusMutation = useApiMutation(
    (status) => {
      return updateService(serviceData?.id!, {
        status: status as ServiceStatusEnum,
      });
    },
    {
      onSuccess: (res) => {
        queryClient.setQueryData(["serviceRevisionData", id], {
          ...serviceData,
          status: res.status,
        });
      },
    }
  );

  const { data: serviceStatusOptions } = useApiQuery(
    ["service-status-options"],
    () => getSeriviceStatus({ type: serviceData?.type! }),
    {
      retry: false,
      enabled: !!serviceData,
    }
  );
  const handleStatusChange = (newStatus: ServiceStatusEnum) => {
    updateStatusMutation.mutate(newStatus);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="bg-white shadow rounded-lg p-6">
            <main className="flex gap-4 justify-start items-center">
              <img
                src={serviceData?.provider?.logo}
                className="w-60 object-contain"
              />
              <div>
                <p className="text-lg">
                  {serviceData?.provider?.business_name}
                </p>
                <span className="text-gray-500">
                  منذ {serviceData?.created_at}
                </span>
              </div>
            </main>
            <div className="flex justify-between items-center">
              <p>تم تفعيل الحساب بناء على موافقة الإدارة</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">حالة الخدمة:</span>
                {serviceData?.pending_revision ? (
                  <Tag
                    color={getStatusTag(serviceData?.status as string)?.color}
                  >
                    {serviceData?.status_label}
                  </Tag>
                ) : (
                  <Select
                    value={serviceData?.status}
                    onChange={handleStatusChange}
                    loading={updateStatusMutation.isPending}
                    disabled={updateStatusMutation.isPending}
                    className="min-w-40"
                  >
                    {serviceStatusOptions?.data
                      ?.filter(
                        (item) =>
                          item.status === ServiceStatusEnum.hold ||
                          item.status === ServiceStatusEnum.approved ||
                          item.status === ServiceStatusEnum.inactive ||
                          item.status === ServiceStatusEnum.removed ||
                          item.status === ServiceStatusEnum.pending ||
                          item.status === ServiceStatusEnum.revision_pending ||
                          item.status === ServiceStatusEnum.draft
                      )
                      ?.map((option) => (
                        <Select.Option
                          key={option.status}
                          value={option.status}
                          disabled={
                            option?.status === ServiceStatusEnum?.pending ||
                            option?.status ===
                              ServiceStatusEnum?.revision_pending ||
                            option?.status === ServiceStatusEnum?.draft
                          }
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: getStatusTag(option?.status)
                                  ?.color,
                              }}
                            />
                            <span>{option.label}</span>
                          </div>
                        </Select.Option>
                      ))}
                  </Select>
                )}
              </div>
            </div>
          </div>
          <div className="main-information bg-white shadow rounded-lg p-6 mt-4">
            <h1 className="text-lg font-semibold mb-6">المعلومات الأساسية</h1>

            <Form layout="vertical" className="space-y-4">
              <Form.Item<ServiceData> label="اسم الخدمة">
                <Input
                  value={
                    serviceData?.pending_revision
                      ? serviceData?.pending_revision?.data?.title
                      : serviceData?.title || "-"
                  }
                  readOnly
                  className="bg-gray-50"
                  size="large"
                />
              </Form.Item>

              <Form.Item<ServiceData> label="تصنيف الخدمة">
                <Input
                  value={serviceData?.field?.name || "-"}
                  readOnly
                  className="bg-gray-50"
                  size="large"
                />
              </Form.Item>

              <Form.Item<ServiceData> label="وصف الخدمة">
                <TextArea
                  value={serviceData?.description || "-"}
                  rows={4}
                  readOnly
                  className="bg-gray-50"
                  size="large"
                />
              </Form.Item>

              <Form.Item<ServiceData> label="مخرجات الخدمة">
                <div className="space-y-2">
                  {serviceData?.pending_revision ||
                  serviceData?.outputs?.length ? (
                    (serviceData?.pending_revision
                      ? serviceData?.pending_revision?.data?.items?.outputs
                      : serviceData?.outputs
                    )?.map((output, index) => (
                      <Input
                        key={index}
                        value={output.title || "-"}
                        readOnly
                        className="bg-gray-50 mt-4!"
                        size="large"
                      />
                    ))
                  ) : (
                    <span className="text-[12px]"> لا توجد مخرجات</span>
                  )}
                </div>
              </Form.Item>

              <Form.Item<ServiceData> label="نطاق الخدمة">
                <div className="space-y-2">
                  {serviceData?.scopes?.length ||
                  serviceData?.pending_revision ? (
                    (serviceData?.pending_revision
                      ? serviceData?.pending_revision?.data?.items?.scopes
                      : serviceData?.scopes
                    )?.map((scope, index) => (
                      <Input
                        key={index}
                        value={scope.title || "-"}
                        readOnly
                        className="bg-gray-50 mt-4!"
                        size="large"
                      />
                    ))
                  ) : (
                    <span className="text-[12px]">لا يوجد نطاق</span>
                  )}
                </div>
              </Form.Item>
            </Form>
          </div>
          <div className="main-information bg-white shadow rounded-lg p-6 mt-4">
            <h1 className="text-lg font-semibold mb-6">المبلغ</h1>

            <Form layout="vertical" className="space-y-4">
              <Form.Item<ServiceData> label="نوع المدة" className="main-radio">
                <Radio.Group
                  value={
                    serviceData?.pending_revision
                      ? serviceData?.pending_revision?.data?.duration_type
                      : serviceData?.duration?.type || "day"
                  }
                  size="large"
                  disabled
                >
                  <Radio.Button value="day">يوم</Radio.Button>
                  <Radio.Button value="month">شهر</Radio.Button>
                  <Radio.Button value="year">سنه</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="مدة التنفيذ">
                <Input
                  value={
                    serviceData?.pending_revision
                      ? serviceData?.pending_revision?.data?.duration_time
                      : serviceData?.duration?.time || "-"
                  }
                  type="number"
                  size="large"
                  readOnly
                  className="bg-gray-50"
                />
              </Form.Item>

              <Form.Item<ServiceData> label="مبلغ الخدمة يبدأ من">
                <Input
                  value={ConvertToNumber(
                    serviceData?.pending_revision
                      ? serviceData?.pending_revision?.data?.min_price?.toString()!
                      : serviceData?.min_price?.toString() || "-"
                  )}
                  type="number"
                  readOnly
                  className="bg-gray-50"
                  size="large"
                />
              </Form.Item>

              <Form.Item<ServiceData> label="زمن الاستجابة">
                <Input
                  value={serviceData?.response_time || "-"}
                  type="number"
                  readOnly
                  className="bg-gray-50"
                  size="large"
                />
              </Form.Item>
            </Form>
          </div>

          <div className="main-information bg-white shadow rounded-lg p-6 mt-4">
            <h1 className="text-lg font-semibold mb-6">متطلبات الاستفادة</h1>

            <Form layout="vertical" className="space-y-4">
              <Form.Item<ServiceData> label="متطلبات الاستفادة">
                <div className="space-y-2">
                  {serviceData?.requirements?.length ||
                  serviceData?.pending_revision ? (
                    (serviceData?.pending_revision
                      ? serviceData?.pending_revision?.data?.items?.requirements
                      : serviceData?.requirements
                    )?.map((requirement, index) => (
                      <Input
                        key={index}
                        value={requirement.title || "-"}
                        readOnly
                        className="bg-gray-50 mt-4!"
                        size="large"
                      />
                    ))
                  ) : (
                    <span className="text-[12px]">لا يوجد متطلبات</span>
                  )}
                </div>
              </Form.Item>
            </Form>
          </div>

          {serviceData?.pending_revision && (
            <div className="actions bg-white shadow rounded-lg p-6 mt-4 flex justify-end gap-5">
              <Button
                type="primary"
                className="bg-transparent! text-primary! shadow-none! border-primary!"
                size="large"
                onClick={() => setIsModalOpen(true)}
              >
                إرجاع للمزوّد مع ملاحظات
              </Button>
              <Button
                type="primary"
                className="shadow-none!"
                size="large"
                onClick={() => approveServiceRevisionMutation.mutate(undefined)}
                loading={approveServiceRevisionMutation.isPending}
                disabled={approveServiceRevisionMutation.isPending}
              >
                اعتماد الخدمة
              </Button>
            </div>
          )}

          <div className="service-log bg-white shadow rounded-lg p-6 mt-4">
            <Collapse
              items={serviceLogCollapseItems}
              className="service-log-collapse"
            />
          </div>
        </>
      )}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={rejectServiceRevisionMutation.isPending}
        okText="إرسال"
        cancelText="إلغاء"
      >
        <RejectService ref={rejectServiceRef} />
      </Modal>
    </>
  );
};

export default ServiceReview;
