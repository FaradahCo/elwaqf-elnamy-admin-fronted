import { useOutletContext } from "react-router";

import { Form, Input, Collapse } from "antd";
import { DownOutlined } from "@ant-design/icons";

import type { Client } from "../../../../alwaqfModel";
const Profile = () => {
  const [form] = Form.useForm<Client>();
  const clientData = useOutletContext<Client>();

  const onFinish = (values: Client) => {
    console.log("Form values:", values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={clientData}
      disabled
    >
      <Collapse
        defaultActiveKey={["1", "2"]}
        expandIconPosition="end"
        bordered={false}
        expandIcon={({ isActive }) => (
          <DownOutlined rotate={isActive ? 180 : 0} className="text-gray-600" />
        )}
        className="flex flex-col gap-2 rounded-md"
      >
        <Collapse.Panel
          header={
            <span className="text-lg font-semibold text-gray-800">
              المعلومات الأساسية
            </span>
          }
          key="1"
          className="mb-2 bg-white rounded-md!"
        >
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Form.Item
                name="name"
                label="اسم المستخدم"
                rules={[
                  { required: true, message: "الرجاء إدخال اسم المستخدم" },
                ]}
              >
                <Input
                  size="large"
                  className="text-right"
                  placeholder="اسم المستخدم"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="البريد الإلكتروني"
                rules={[
                  { required: true, message: "الرجاء إدخال البريد الإلكتروني" },
                  { type: "email", message: "الرجاء إدخال بريد إلكتروني صحيح" },
                ]}
              >
                <Input size="large" placeholder="example@email.com" />
              </Form.Item>

              <Form.Item name="phone" label="رقم الجوال">
                <Input
                  size="large"
                  className="text-right"
                  placeholder="05XXXXXXXX"
                />
              </Form.Item>
            </div>
          </div>
        </Collapse.Panel>

        <Collapse.Panel
          header={
            <span className="text-lg font-semibold text-gray-800">
              العنوان الوطني
            </span>
          }
          key="2"
          className="bg-white rounded-md!"
        >
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Form.Item name={["profile", "waqf_name"]} label="اسم المنظمة">
                <Input
                  size="large"
                  className="text-right"
                  placeholder="اسم المنظمة"
                />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Form.Item name={["profile", "vat_number"]} label="الرقم الضريبي">
                <Input
                  size="large"
                  className="text-right"
                  placeholder="الرقم الضريبي"
                />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item name="region" label="المدينة">
                <Input
                  size="large"
                  className="text-right"
                  placeholder="المدينة"
                />
              </Form.Item>

              <Form.Item name={["profile", "district"]} label="الحي">
                <Input size="large" className="text-right" placeholder="الحي" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Form.Item name={["profile", "street"]} label="الشارع">
                <Input
                  size="large"
                  className="text-right"
                  placeholder="الشارع"
                />
              </Form.Item>

              <Form.Item
                name={["profile", "postal_code"]}
                label="الرمز البريدي"
              >
                <Input
                  size="large"
                  className="text-right"
                  placeholder="الرمز البريدي"
                />
              </Form.Item>
              <Form.Item
                name={["profile", "building_number"]}
                label="رقم المبنى"
              >
                <Input
                  size="large"
                  className="text-right"
                  placeholder="رقم المبنى"
                />
              </Form.Item>
            </div>
          </div>
        </Collapse.Panel>
      </Collapse>
    </Form>
  );
};
export default Profile;
