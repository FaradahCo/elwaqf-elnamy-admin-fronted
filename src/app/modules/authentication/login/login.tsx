import React from "react";
import { App, Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link } from "react-router";
import { authenticationRoutePath } from "../authentication.routes";

const Login: React.FC = () => {
  const { message } = App.useApp();

  const onFinish = (values: { email: string; password: string }) => {
    message.success("تم تسجيل الدخول بنجاح!");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("يرجى التحقق من البيانات المدخلة");
  };

  return (
    <>
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="البريد الإلكتروني او رقم الجوال"
          name="email"
          rules={[
            {
              required: true,
              message: "يرجى إدخال البريد الإلكتروني او رقم الجوال",
            },
            {
              type: "email",
              message: "يرجى إدخال بريد إلكتروني او رقم جوال صحيح",
            },
          ]}
        >
          <Input
            placeholder="ادخل بريدك الإلكتروني او رقم الجوال"
            size="large"
            className="text-right"
          />
        </Form.Item>

        <Form.Item
          label="كلمة المرور"
          name="password"
          rules={[
            { required: true, message: "يرجى إدخال كلمة المرور" },
            { min: 6, message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" },
          ]}
        >
          <Input.Password
            placeholder="ادخل كلمة المرور"
            size="large"
            className="text-right"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-center sm:text-right">
          <p className="mt-2 mb-2">
            ليس لديك حساب؟
            <Link
              className="text-primary!"
              to={authenticationRoutePath.REGISTER}
            >
              {" "}
              تسجيل حساب جديد
            </Link>
          </p>

          <p className="mt-2 mb-2">
            <Link
              className="text-primary!"
              to={authenticationRoutePath.FORGOT_PASSWORD}
            >
              نسيت كلمة المرور؟
            </Link>
          </p>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full mt-4"
          >
            دخول
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
