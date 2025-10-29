import { CustomTable } from "@shared/components/customTable/customtable";
import { useApiMutation, useApiQuery } from "@shared/services/api";
import {
  getSeriviceStatus,
  getStatusTag,
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
} from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import RejectService, {
  type RejectServiceRef,
} from "../../components/rejectService/rejectService";
import {
  type ServiceData,
  type ServiceRevision,
} from "../../model/serviceProviderList";
import {
  approveServiceRevision,
  getRevision,
  getRevisionsByServiceId,
  rejectServiceRevision,
  updateService,
} from "../../serviceManagementService";
import { serviceLogColumns } from "./serviceReviewConfig";

const { TextArea } = Input;

const ServiceReview = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rejectServiceRef = useRef<RejectServiceRef>(null);
  const [serviceRevision, setServiceRevision] = useState<ServiceRevision>();

  const handleOk = async () => {
    const formData = await rejectServiceRef.current?.validateForm();
    rejectServiceRevisionMutation.mutate(formData);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    rejectServiceRef.current?.resetForm();
  };

  const {
    data: serviceRevisionData,
    isLoading,
    refetch,
  } = useApiQuery(["serviceRevision", id], () => getRevision(id!), {
    enabled: !!id,
  });

  // Get available service status options from API
  const { data: serviceStatusOptions } = useApiQuery(
    ["service-status-options"],
    () => getSeriviceStatus({ type: serviceRevision?.service?.type! }),
    {
      retry: false,
      enabled: !!serviceRevision?.service,
    }
  );

  const { data: revisionsByServiceData } = useApiQuery(
    ["revisions-services-id", id],
    () => getRevisionsByServiceId({ service_id: id }),
    {
      enabled: !!serviceRevision?.service?.id,
      retry: false,
    }
  );

  const approveServiceRevisionMutation = useApiMutation(
    () => approveServiceRevision(id!),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const rejectServiceRevisionMutation = useApiMutation(
    (formData: any) => {
      return rejectServiceRevision(id!, {
        reason: formData?.reason,
      });
    },
    {
      onSuccess: () => {
        setIsModalOpen(false);
        rejectServiceRef.current?.resetForm();
        refetch();
      },
    }
  );

  const updateStatusMutation = useApiMutation(
    (status: string) => {
      return updateService(id!, { status: status });
    },
    {
      onSuccess: () => {
        // setServiceRevision(res.data);
      },
    }
  );

  const handleStatusChange = (newStatus: string) => {
    updateStatusMutation.mutate(newStatus);
  };

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

  useEffect(() => {
    if (serviceRevisionData) {
      setServiceRevision(serviceRevisionData);
    }
  }, [serviceRevisionData]);

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
              <img src="/images/alphax.svg" />
              <div>
                <p className="text-lg">مجموعة ألفا للاستشارات المهنية</p>
                <span className="text-gray-500">منذ 13 أكتوبر 2025</span>
              </div>
            </main>
            <div className="flex justify-between items-center">
              <p>تم تفعيل الحساب بناء على موافقة الإدارة</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">حالة الخدمة:</span>
                <Select
                  value={serviceRevision?.status || ""}
                  onChange={handleStatusChange}
                  loading={updateStatusMutation.isPending}
                  disabled={updateStatusMutation.isPending}
                  popupRender={(menu) => menu}
                  className="min-w-40"
                >
                  {serviceStatusOptions?.data?.map((option) => (
                    <Select.Option key={option.status} value={option.status}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: getStatusTag(option.status).color,
                          }}
                        />
                        <span>{option.label}</span>
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className="main-information bg-white shadow rounded-lg p-6 mt-4">
            <h1 className="text-lg font-semibold mb-6">المعلومات الأساسية</h1>

            <Form layout="vertical" className="space-y-4">
              <Form.Item<ServiceData> label="اسم الخدمة">
                <Input
                  value={serviceRevision?.service?.title || "-"}
                  readOnly
                  className="bg-gray-50"
                  size="large"
                />
              </Form.Item>

              <Form.Item<ServiceData> label="تصنيف الخدمة">
                <Input
                  value={serviceRevision?.service?.field?.name || "-"}
                  readOnly
                  className="bg-gray-50"
                  size="large"
                />
              </Form.Item>

              <Form.Item<ServiceData> label="وصف الخدمة">
                <TextArea
                  value={serviceRevision?.service?.description || "-"}
                  rows={4}
                  readOnly
                  className="bg-gray-50"
                  size="large"
                />
              </Form.Item>

              <Form.Item<ServiceData> label="مخرجات الخدمة">
                <div className="space-y-2">
                  {serviceRevision?.service?.outputs?.map((output, index) => (
                    <Input
                      key={index}
                      value={output.title || "-"}
                      readOnly
                      className="bg-gray-50 mt-4!"
                      size="large"
                    />
                  ))}
                </div>
              </Form.Item>

              <Form.Item<ServiceData> label="نطاق الخدمة">
                <div className="space-y-2">
                  {serviceRevision?.service?.scopes?.map((scope, index) => (
                    <Input
                      key={index}
                      value={scope.title || "-"}
                      readOnly
                      className="bg-gray-50 mt-4!"
                      size="large"
                    />
                  ))}
                </div>
              </Form.Item>
            </Form>
          </div>
          <div className="main-information bg-white shadow rounded-lg p-6 mt-4">
            <h1 className="text-lg font-semibold mb-6">المبلغ</h1>

            <Form layout="vertical" className="space-y-4">
              <Form.Item<ServiceData> label="نوع المدة" className="main-radio">
                <Radio.Group
                  value={serviceRevision?.service?.duration?.type || "day"}
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
                  value={serviceRevision?.service?.duration?.time || "-"}
                  type="number"
                  size="large"
                  readOnly
                  className="bg-gray-50"
                />
              </Form.Item>

              <Form.Item<ServiceData> label="مبلغ الخدمة يبدأ من">
                <Input
                  value={serviceRevision?.service?.min_price || "-"}
                  type="number"
                  readOnly
                  className="bg-gray-50"
                  size="large"
                />
              </Form.Item>

              <Form.Item<ServiceData> label="زمن الاستجابة">
                <Input
                  value={serviceRevision?.service?.response_time || "-"}
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
                  {serviceRevision?.service?.requirements?.map(
                    (requirement, index) => (
                      <Input
                        key={index}
                        value={requirement.title || "-"}
                        readOnly
                        className="bg-gray-50 mt-4!"
                        size="large"
                      />
                    )
                  )}
                </div>
              </Form.Item>
            </Form>
          </div>

          {(serviceRevision?.status === "revision_pending" ||
            serviceRevision?.status === "pending") && (
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
