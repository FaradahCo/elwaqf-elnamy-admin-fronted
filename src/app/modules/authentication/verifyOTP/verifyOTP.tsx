import { Button, Form, Input, message } from "antd";
import React from "react";

const VerifyOtp: React.FC = () => {
  const onFinish = async (values: { otp: string }) => {};

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("يرجى إدخال رمز التحقق كاملاً");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <p>أدخل الرمز المُرسل لرقم الجوال (واتس أب) المسجل في المنصة</p>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          name="otp"
          rules={[
            {
              required: true,
              message: "يرجى إدخال رمز التحقق",
            },
            {
              len: 4,
              message: "رمز التحقق يجب أن يكون 4 أرقام",
            },
          ]}
        >
          <div className="flex justify-center mt-5">
            <Input.OTP length={4} size="large" className="text-center" />
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full"
          >
            إرسال
          </Button>
          <Button
            htmlType="button"
            size="large"
            className="w-full bg-white text-primary border border-color-primary mt-2"
          >
            أرسل الرمز على البريد الإلكتروني
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyOtp;
