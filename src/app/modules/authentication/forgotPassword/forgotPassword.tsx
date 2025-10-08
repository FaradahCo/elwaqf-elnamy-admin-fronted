import React from "react";
import { App, Button, Form, Input } from "antd";
import { Link } from "react-router";
import { authenticationRoutePath } from "../authentication.routes";
import { AuthenticationService } from "../authenticationService";
import { useApiMutation } from "../../../shared/services/api";
import type { ForgotPasswordPayload } from "../authentication.model";

const ForgotPassword: React.FC = () => {
  const { message } = App.useApp();

  const forgotPasswordMutation = useApiMutation<ForgotPasswordPayload, any>(
    AuthenticationService.forgotPassword,
    {
      onSuccess: () => {
        message.success("تم إرسال تعليمات استعادة كلمة المرور إن وجد حساب مطابق");
      },
     
    }
  );

  const onFinish = (values: { identifier: string }) => {
    const forgotPasswordData: ForgotPasswordPayload = {
      identifier: values.identifier,
    };
    
    forgotPasswordMutation.mutate(forgotPasswordData);
  };

  const onFinishFailed = () => {
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
          name="identifier"
          rules={[
            {
              required: true,
              message: "يرجى إدخال البريد الإلكتروني او رقم الجوال",
            },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const phoneRegex = /^[0-9+\-()\s]{6,}$/;
                return emailRegex.test(value) || phoneRegex.test(value)
                  ? Promise.resolve()
                  : Promise.reject("يرجى إدخال بريد إلكتروني أو رقم جوال صحيح");
              },
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
            loading={forgotPasswordMutation.isPending}
            disabled={forgotPasswordMutation.isPending}
          >
            {forgotPasswordMutation.isPending ? "جاري الإرسال..." : "إرسال رابط/رمز الاستعادة"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgotPassword;
