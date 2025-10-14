import { Form, Radio } from "antd";
import type { CheckboxGroupProps } from "antd/es/checkbox";
import type { ServiceFormData } from "../../servicesManagement.model";

const ServiceType = () => {
  const options: CheckboxGroupProps<string>["options"] = [
    { label: "إضافة خدمة", value: "service" },
    { label: "إضافة باقة", value: "package" },
  ];

  return (
    <div>
      <h1 className="text-second-primary font-semibold text-xl mb-4">
        اختر ماترغب بإضافته
      </h1>
      <Form.Item<ServiceFormData>
        name="type"
        rules={[{ required: true, message: "يرجى اختيار نوع الإضافة" }]}
      >
        <Radio.Group
          options={options}
          className="text-second-primary! text-lg!"
        />
      </Form.Item>
    </div>
  );
};

export default ServiceType;
