import {
  getSeriviceStatus,
  getStatusTag,
} from "@shared/services/sharedService";
import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { type ServiceManagementQuery } from "../../model/serviceProviderList";
import { useApiQuery } from "@shared/services/api";
import type {
  ServiceStatus,
  PaginatedResponse,
} from "@shared/model/shared.model";

const { Option } = Select;

interface ServiceManagementFilterProps {
  onFilterChange?: (filter: ServiceManagementQuery) => void;
  onServiceTypeChange?: (type: string) => void;
}

const ServiceManagementFilter = ({
  onFilterChange,
  onServiceTypeChange,
}: ServiceManagementFilterProps) => {
  const [form] = Form.useForm();
  const [serviceType, setServiceType] = useState("service");
  const debounceTimerRef = useRef<number | null>(null);

  const packageFieldsOptions = useMemo(
    () => [
      { value: "healthcare", label: "الرعاية الصحية" },
      { value: "education", label: "التعليم" },
      { value: "technology", label: "التكنولوجيا" },
      { value: "social", label: "الخدمات الاجتماعية" },
    ],
    []
  );

  const handleFormChange = useCallback(() => {
    if (onFilterChange) {
      const values = form.getFieldsValue();
      const filter: ServiceManagementQuery = {
        type: serviceType,
        ...values,
      };
      onFilterChange(filter);
    }
  }, [onFilterChange, form, serviceType]);

  const handleFormChangeWithDebounce = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer for all form changes
    debounceTimerRef.current = setTimeout(() => {
      handleFormChange();
    }, 500); // 500ms delay for all fields
  }, [handleFormChange]);

  const handleServiceTypeChange = useCallback(
    (type: string) => {
      setServiceType(type);

      if (onServiceTypeChange) {
        onServiceTypeChange(type);
      }

      if (onFilterChange) {
        const values = form.getFieldsValue();
        const filter: ServiceManagementQuery = {
          type,
          ...values,
        };
        onFilterChange(filter);
      }
    },
    [onServiceTypeChange, onFilterChange, form]
  );

  const { data: serviceStatus } = useApiQuery<PaginatedResponse<ServiceStatus>>(
    ["serviceStatus", serviceType],
    () => getSeriviceStatus({ type: serviceType }),
    {
      enabled: !!serviceType,
    }
  );

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <Card className="mb-6">
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleFormChangeWithDebounce}
      >
        <Row gutter={16} align="bottom">
          <Col xs={24} md={6}>
            <Form.Item
              name="title"
              label={serviceType === "service" ? "اسم الخدمة" : "اسم الباقة"}
            >
              <Input
                placeholder={
                  serviceType === "service"
                    ? "ادخل اسم الخدمة"
                    : "ادخل اسم الباقة"
                }
                className="text-right"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item
              name="field"
              label={
                serviceType === "service" ? "مجال الخدمات" : "مجال الباقات"
              }
            >
              <Select
                placeholder={
                  serviceType === "service"
                    ? "اختر مجال الخدمات"
                    : "اختر مجال الباقات"
                }
                className="w-full"
              >
                {packageFieldsOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item name="status" label="الحالة">
              <Select placeholder="اختر الحالة" className="w-full" allowClear>
                {serviceStatus?.data?.map((option) => (
                  <Option key={option.status} value={option.status}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: getStatusTag(option.status).color,
                        }}
                      />
                      <span>{option?.label}</span>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item label="نوع العرض">
              <div className="flex gap-1 w-full">
                <Button
                  type={serviceType === "service" ? "primary" : "default"}
                  onClick={() => handleServiceTypeChange("service")}
                  className="flex-1"
                >
                  خدمات
                </Button>
                <Button
                  type={serviceType === "package" ? "primary" : "default"}
                  onClick={() => handleServiceTypeChange("package")}
                  className="flex-1"
                >
                  باقات
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default React.memo(ServiceManagementFilter);
