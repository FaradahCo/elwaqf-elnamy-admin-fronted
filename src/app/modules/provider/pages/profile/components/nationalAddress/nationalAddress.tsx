import { Form, Input } from "antd";

const NationalAddress = () => {
  return (
    <Form layout="vertical">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Form.Item name="username" label="الدولة">
          <Input placeholder="اسم الدوبة" size="large" />
        </Form.Item>

        <Form.Item name="email" label="المدينة">
          <Input placeholder="البريد الإلكتروني" size="large" />
        </Form.Item>

        <Form.Item name="phone" label="الحي">
          <Input placeholder="الحي" size="large" />
        </Form.Item>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Form.Item name="username" label="الشارع">
          <Input placeholder="اسم الشارع" size="large" />
        </Form.Item>

        <Form.Item name="email" label="الرمز البريدي">
          <Input placeholder="الرمز البريدي" size="large" />
        </Form.Item>

        <Form.Item name="phone" label="رقم المبني">
          <Input placeholder="رقم المبني" size="large" />
        </Form.Item>
      </div>
    </Form>
  );
};

export default NationalAddress;
