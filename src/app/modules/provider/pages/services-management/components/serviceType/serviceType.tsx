import { Radio } from "antd";
import type { CheckboxGroupProps } from "antd/es/checkbox";

const ServiceType = () => {
  const options: CheckboxGroupProps<string>["options"] = [
    { label: "إضافة خدمة", value: "إضافة خدمة" },
    { label: "إضافة باقة", value: "إضافة باقة" },
  ];

  return (
    <div>
      <h1 className="text-second-primary font-semibold text-xl mb-4">
        اختر ماترغب بإضافته
      </h1>
      <Radio.Group
        options={options}
        className="text-second-primary! text-lg!"
      />
    </div>
  );
};

export default ServiceType;
