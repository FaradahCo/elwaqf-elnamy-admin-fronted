import { useOutletContext } from "react-router";
import { useMemo } from "react";

import { Form, Input, Collapse } from "antd";
import { DownOutlined } from "@ant-design/icons";

import type { Client } from "../../../../alwaqfModel";
// { clientData }: { clientData: Client }
const Profile = () => {
  const [form] = Form.useForm<Client>();
  const clientData = useOutletContext<Client>();
  const onFinish = (values: Client) => {
    console.log("Form values:", values);
  };

  const initialValues = useMemo(
    () => ({ ...clientData, ...clientData?.profile }),
    [clientData],
  );

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
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
              <Form.Item name="waqf_name" label="اسم المنظمة">
                <Input
                  size="large"
                  className="text-right"
                  placeholder="اسم المنظمة"
                />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Form.Item name="vat_number" label="الرقم الضريبي">
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

              <Form.Item name="district" label="الحي">
                <Input size="large" className="text-right" placeholder="الحي" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Form.Item name="street" label="الشارع">
                <Input
                  size="large"
                  className="text-right"
                  placeholder="أختر من خلال"
                />
              </Form.Item>

              <Form.Item name="postalCode" label="الرمز">
                <Input
                  size="large"
                  className="text-right"
                  placeholder="الرمز"
                />
              </Form.Item>
              <Form.Item name="building_number" label="رقم المبنى">
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
