import PhoneNumber from "@shared/components/phone-number/phone-number";
import { App, Button, Form, Input } from "antd";
import React, { useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Link, useNavigate } from "react-router";
import { useApiMutation } from "../../../shared/services/api";
import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from "../authentication.model";
import { authenticationRoutePath } from "../authentication.routes";
import { AuthenticationService } from "../authenticationService";
import VerifyOtp from "../verifyOTP/verifyOTP";
import { setItem } from "@shared/services/storageService";

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm<ForgotPasswordPayload>();

  const initialValues = {
    identifier: "",
    region: "sa",
  };
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [showVerifyOTP, setShowVerifyOTP] = React.useState(false);
  const [verifedtoken, setVerifedToken] = React.useState<string>("");
  const [verificationChannelType, setVerificationChannelType] =
    useState<string>("phone");

  const forgotPasswordMutation = useApiMutation<
    ForgotPasswordPayload,
    ForgotPasswordResponse
  >(AuthenticationService.forgotPassword, {
    onSuccess: (res) => {
      message.success("تم إرسال تعليمات استعادة كلمة المرور إن وجد حساب مطابق");
      setVerifedToken(res.token);
      setShowVerifyOTP(true);
    },
  });

  const handelOnVerifed = () => {
    setShowVerifyOTP(false);
    setItem("identifier", form.getFieldValue("identifier"));
    setItem("region", form.getFieldValue("region"));
    navigate(authenticationRoutePath.RESET_PASSWORD + `?token=${verifedtoken}`);
  };

  const handlePhoneNumberChange = (phoneNumber?: string, country?: string) => {
    form.setFieldsValue({
      identifier: phoneNumber,
      region: country,
    });
  };

  const handelChangeChannel = (channel: string) => {
    form.resetFields();
    setVerificationChannelType(channel);
    setShowVerifyOTP(false);
  };

  const onFinish = (values: ForgotPasswordPayload) => {
    forgotPasswordMutation.mutate(values);
  };

  const onFinishFailed = () => {
    message.error("يرجى التحقق من البيانات المدخلة");
  };

  return (
    <>
      {showVerifyOTP ? (
        <VerifyOtp
          openedForm="forgotPassword"
          functionMutation={handelOnVerifed}
          changeChannel={(channel: string) => handelChangeChannel(channel)}
          virfedChannelType={verificationChannelType}
          data={{
            email: form.getFieldValue("identifier"),
            phone: form.getFieldValue("identifier"),
            region: form.getFieldValue("region"),
          }}
        />
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={initialValues}
        >
          {verificationChannelType === "email" ? (
            <Form.Item<ForgotPasswordPayload>
              label="البريد الإلكتروني"
              name="identifier"
              rules={[
                {
                  required: true,
                  message: "يرجى إدخال البريد الإلكتروني",
                },
                {
                  type: "email",
                  message: "يرجى إدخال بريد إلكتروني صحيح",
                },
              ]}
            >
              <Input
                placeholder="ادخل بريدك الإلكتروني"
                size="large"
                className="text-right"
              />
            </Form.Item>
          ) : (
            <Form.Item<ForgotPasswordPayload>
              name="identifier"
              label="رقم الجوال"
              rules={[
                {
                  required: true,
                  message: "يرجى إدخال رقم الجوال",
                },
                {
                  validator: (_, value) => {
                    return new Promise<void>((resolve, reject) => {
                      if (value && !isValidPhoneNumber(value)) {
                        reject(new Error("يرجى إدخال رقم جوال صحيح"));
                      } else {
                        resolve();
                      }
                    });
                  },
                },
              ]}
            >
              <PhoneNumber
                onChange={handlePhoneNumberChange}
                placeholder="ادخل رقم جوالك"
              />
            </Form.Item>
          )}

          {/* Hidden field to store region */}
          <Form.Item<ForgotPasswordPayload> name="region" hidden>
            <Input />
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
              إرسال رابط/رمز الاستعادة
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default ForgotPassword;
