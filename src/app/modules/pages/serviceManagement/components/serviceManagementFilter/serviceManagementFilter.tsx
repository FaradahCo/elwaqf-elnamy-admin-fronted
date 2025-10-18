import { convertEnumToArrayList } from "@shared/services/sharedService";
import { Input, Select, Form, Row, Col, Card, Button } from "antd";
import { useState } from "react";
import {
  ServiceStatus,
  type ServiceManagementQuery,
} from "../../model/serviceProviderList";

const { Option } = Select;

interface ServiceManagementFilterProps {
  onFilterChange?: (filter: ServiceManagementQuery) => void;
  onServiceTypeChange?: (type: string) => void;
}

export const ServiceManagementFilter = ({
  onFilterChange,
  onServiceTypeChange,
}: ServiceManagementFilterProps) => {
  const [form] = Form.useForm();
  const [serviceType, setServiceType] = useState("service");

  const packageFieldsOptions = [
    { value: "healthcare", label: "الرعاية الصحية" },
    { value: "education", label: "التعليم" },
    { value: "technology", label: "التكنولوجيا" },
    { value: "social", label: "الخدمات الاجتماعية" },
  ];

  const handleFormChange = () => {
    if (onFilterChange) {
      const values = form.getFieldsValue();
      const filter: ServiceManagementQuery = {
        type: serviceType,
        ...values,
      };
      onFilterChange(filter);
    }
  };

  const handleServiceTypeChange = (type: string) => {
    setServiceType(type);

    // Notify parent component about service type change
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
  };

  return (
    <Card className="mb-6">
      <Form form={form} layout="vertical" onValuesChange={handleFormChange}>
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
                {convertEnumToArrayList(ServiceStatus).map((option) => (
                  <Option key={option.label} value={option.value}>
                    {option.label}
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

export default ServiceManagementFilter;
