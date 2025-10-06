import { App, Button, Form, Input } from "antd";
import React from "react";
import { useApiMutation } from "../../../shared/services/api";
import type {
  VerifyOTPPayload,
  VerifyOTPResponse,
} from "../authentication.model";
import { AuthenticationService } from "../authenticationService";

const VerifyOtp: React.FC = () => {
  const { message } = App.useApp();

  const VerifyOtpMutation = useApiMutation<VerifyOTPPayload, VerifyOTPResponse>(
    AuthenticationService.verifyOtp,
    {
      onSuccess: (_) => {
        message.success("تم التحقق من الرمز بنجاح!");
      },
    }
  );

  const onFinish = async (_values: VerifyOTPPayload) => {
    VerifyOtpMutation.mutate(_values);
  };

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
