import { getStatusTag } from "@shared/services/sharedService";
import { Card, Col, Form, Input, Row, Select } from "antd";
import { memo, useMemo, useRef } from "react";

import type { AlwaqfFilterQuery } from "../../alwaqfModel";
import type { ServiceStatus } from "@shared/model/shared.model";

interface AlwaqfFilterProps {
  onFilterChange?: (filter: AlwaqfFilterQuery) => void;
  onServiceTypeChange?: (type: string) => void;
  aLwaqfStatus?: ServiceStatus[];
}

const AlwaqfListFilter = memo(
  ({ onFilterChange, aLwaqfStatus }: AlwaqfFilterProps) => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleFormChange = useMemo(() => {
      return () => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
          if (onFilterChange) {
            const values = form.getFieldsValue();
            const filter: AlwaqfFilterQuery = {
              ...values,
            };
            onFilterChange(filter);
          }
        }, 600);
      };
    }, [onFilterChange, form]);
    return (
      <Card className="mb-6">
        <Form form={form} layout="vertical" onValuesChange={handleFormChange}>
          <Row gutter={16} align="bottom">
            <Col xs={24} md={6}>
              <Form.Item name="user_name" label="اسم المستخدم أو المنظمة">
                <Input placeholder="ابحث عن اسم الوقف" className="text-right" />
              </Form.Item>
            </Col>

            <Col xs={24} md={6}>
              <Form.Item name="status" label="الحالة">
                <Select placeholder="اختر الحالة" className="w-full" allowClear>
                  {aLwaqfStatus?.map((option) => (
                    <Option key={option?.status} value={option?.status}>
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
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  },
);

export default AlwaqfListFilter;
