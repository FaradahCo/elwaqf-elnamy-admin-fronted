import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
} from "antd";
import { memo, useRef } from "react";
import type { ReactNode } from "react";

export type CustomFilterType =
  | "select"
  | "input"
  | "date"
  | "number"
  | "checkbox"
  | "radio";

export type CustomFilterProps = {
  filters: {
    type: CustomFilterType;
    placeholder: string;
    options?: { label: string; value: string | number }[] | ReactNode;
    label?: string;
    name: string;
    value?: string | number | boolean;
    props?: { [key: string]: any };
  }[];
  onFilterChange?: (values: any) => void;
};

type FilterConfig = CustomFilterProps["filters"][number];

const CustomFilter = ({ filters, onFilterChange }: CustomFilterProps) => {
  const [form] = Form.useForm();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFormChange = (values: any) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onFilterChange?.(values);
    }, 800);
  };

  const renderFilterInput = (filter: FilterConfig) => {
    // Check if options is JSX (ReactNode) or plain array
    const isCustomOptions =
      filter.options &&
      !Array.isArray(filter.options) &&
      typeof filter.options === "object";

    const filterComponents = {
      select: isCustomOptions ? (
        <Select
          placeholder={filter.placeholder}
          allowClear
          className="w-full"
          value={filter.value}
          {...filter.props}
        >
          {filter.options as ReactNode}
        </Select>
      ) : (
        <Select
          options={
            filter.options as { label: string; value: string | number }[]
          }
          placeholder={filter.placeholder}
          allowClear
          className="w-full"
          value={filter.value}
          {...filter.props}
        />
      ),
      input: <Input placeholder={filter.placeholder} {...filter.props} />,
      date: (
        <DatePicker
          placeholder={filter.placeholder}
          className="w-full"
          {...filter.props}
        />
      ),
      number: (
        <InputNumber
          placeholder={filter.placeholder}
          className="w-full"
          {...filter.props}
        />
      ),
      checkbox: <Checkbox {...filter.props} />,
      radio: (
        <Radio.Group
          options={
            filter.options as { label: string; value: string | number }[]
          }
          {...filter.props}
        />
      ),
    };

    return filterComponents[filter.type] || null;
  };

  return (
    <Form form={form} layout="vertical" onValuesChange={handleFormChange}>
      <Row gutter={16} align="bottom">
        {filters.map((filter, index) => (
          <Col xs={24} md={6} key={index}>
            <Form.Item name={filter.name} label={filter.label}>
              {renderFilterInput(filter)}
            </Form.Item>
          </Col>
        ))}
      </Row>
    </Form>
  );
};

export default memo(CustomFilter);
