import { typeOptions } from "@shared/services/sharedService";
import { Card, Col, Form, Row, Select } from "antd";
import React, { useCallback, useMemo, useRef } from "react";
import type { DiscoundListParams } from "../../model/discoundCodesModel";

const { Option } = Select;

interface DiscoundCodesFilterProps {
  onFilterChange?: (filter: DiscoundListParams) => void;
}

const DiscoundCodesFilter = ({ onFilterChange }: DiscoundCodesFilterProps) => {
  const [form] = Form.useForm();
  const debounceTimerRef = useRef<number | null>(null);

  const statusOptions = useMemo(
    () => [
      { value: "active", label: "مفعل" },
      { value: "inactive", label: "غير مفعل" },
    ],
    []
  );

  const handleFormChange = useCallback(() => {
    if (onFilterChange) {
      const values = form.getFieldsValue();
      onFilterChange(values);
    }
  }, [onFilterChange, form]);

  const handleFormChangeWithDebounce = useCallback(() => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer for all form changes
    debounceTimerRef.current = setTimeout(() => {
      handleFormChange();
    }, 500); // 500ms delay for all fields
  }, [handleFormChange]);

  return (
    <Card className="mb-6">
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleFormChangeWithDebounce}
      >
        <Row gutter={16} align="bottom">
          <Col xs={24} md={6}>
            <Form.Item name="status" label="الحالة">
              <Select
                placeholder="اختر الحالة"
                className="w-full"
                size="large"
                allowClear
              >
                {statusOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item name="type" label="التصنيف">
              <Select
                placeholder="اختر التصنيف"
                className="w-full"
                size="large"
                allowClear
              >
                {typeOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default React.memo(DiscoundCodesFilter);
