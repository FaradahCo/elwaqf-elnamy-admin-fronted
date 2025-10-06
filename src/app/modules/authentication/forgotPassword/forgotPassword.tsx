import React from "react";
import { App, Button, Form, Input } from "antd";
import { Link } from "react-router";
import { authenticationRoutePath } from "../authentication.routes";

const ForgotPassword: React.FC = () => {
  const { message } = App.useApp();

  const onFinish = (values: { emailOrPhone: string }) => {
    console.log("Forgot password submit:", values);
    message.success("تم إرسال تعليمات استعادة كلمة المرور إن وجد حساب مطابق");
  };

  const onFinishFailed = (errorInfo: any) => {
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
          name="emailOrPhone"
          rules={[
            {
              required: true,
              message: "يرجى إدخال البريد الإلكتروني او رقم الجوال",
            },
          ]}
        >
          <Input
            placeholder="ادخل بريدك الإلكتروني او رقم الجوال"
            size="large"
            className="text-right"
          />
        </Form.Item>

        <p className="mt-2 mb-4">
          تذكرت كلمة المرور؟
          <Link className="text-primary!" to={authenticationRoutePath.LOGIN}>
            {" "}
            العودة لتسجيل الدخول
          </Link>
        </p>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full mt-4"
          >
            إرسال رابط/رمز الاستعادة
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgotPassword;
