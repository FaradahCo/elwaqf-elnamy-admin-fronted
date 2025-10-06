import { Form, Input } from "antd";

const BankAccount = () => {
  return (
    <Form layout="vertical">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item name="username" label="اسم البنك">
          <Input placeholder="اسم البك" size="large" />
        </Form.Item>

        <Form.Item name="email" label="اسم الحساب البنكي">
          <Input placeholder="اسم الحساب البنكي" size="large" />
        </Form.Item>
      </div>
      <Form.Item name="username" label="رقم الآيبان IBAN">
        <Input placeholder="رقم الآيبان IBAN" size="large" />
      </Form.Item>
    </Form>
  );
};

export default BankAccount;
