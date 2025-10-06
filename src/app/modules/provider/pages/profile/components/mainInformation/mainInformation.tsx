import { Form, Input } from "antd";

const MainInformation = () => {
  return (
    <Form
      layout="vertical"
      initialValues={{
        username: "",
        email: "",
        phone: "",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Form.Item
          name="username"
          label="اسم المستخدم"
          rules={[{ required: true, message: "يرجى إدخال اسم المستخدم" }]}
        >
          <Input placeholder="اسم المستخدم" size="large" />
        </Form.Item>

        <Form.Item
          name="email"
          label="البريد الإلكتروني"
          rules={[
            { required: true, message: "يرجى إدخال البريد الإلكتروني" },
            { type: "email", message: "يرجى إدخال بريد إلكتروني صحيح" },
          ]}
        >
          <Input placeholder="البريد الإلكتروني" size="large" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="رقم الجوال"
          rules={[{ required: true, message: "يرجى إدخال رقم الجوال" }]}
        >
          <Input placeholder="رقم الجوال" size="large" />
        </Form.Item>
      </div>
    </Form>
  );
};

export default MainInformation;
