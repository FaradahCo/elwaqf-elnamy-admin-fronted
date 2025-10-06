import { useApiMutation } from "@services/api";
import { App, Button, Form, Input } from "antd";
import React, { useState } from "react";
import type {
  SendOTPPayload,
  VerifyOTPPayload,
  VerifyOTPResponse,
} from "../authentication.model";
import { AuthenticationService } from "../authenticationService";

interface VerifyOtpProps {
  changeChannel?: (channel: string) => void;
  virfedChannelType?: string;
  openedForm?: string;
  data?: any;
  functionMutation?: any;
}

const VerifyOtp: React.FC<VerifyOtpProps> = ({
  data,
  functionMutation,
  openedForm = "register",
  changeChannel,
  virfedChannelType,
}) => {
  const { message } = App.useApp();
  const [form] = Form.useForm<VerifyOTPPayload>();
  const [otpValue, setOtpValue] = useState<string>("");
  const [verifyedByEmail, setVerifyedByEmail] = useState<boolean>(
    virfedChannelType === "email" ? true : false
  );

  const VerifyOtpMutation = useApiMutation<VerifyOTPPayload, VerifyOTPResponse>(
    AuthenticationService.verifyOtp,
    {
      onSuccess: (_) => {
        message.success("تم التحقق من الرمز بنجاح!");
        if (openedForm === "forgotPassword") {
          functionMutation();
        } else {
          functionMutation?.mutate({
            ...data,
            is_verified: true,
            channel: verifyedByEmail ? "email" : "whatsapp",
          });
        }
      },
    }
  );

  const SendOTPTo = useApiMutation<SendOTPPayload, any>(
    AuthenticationService.sendOtp,
    {
      onSuccess: (_) => {
        message.success("تم إرسال الرمز بنجاح!");
        setVerifyedByEmail(true);
      },
    }
  );

  const sendOTPToEmail = () => {
    //FORGET PASSWORD FORM
    if (openedForm === "forgotPassword") {
      setVerifyedByEmail(true);
      changeChannel?.("email");
    } else {
      //REGISTER FORM
      SendOTPTo.mutate({
        identifier: data?.email,
        channel: "email",
      });
    }
  };

  const handelChangeChannel = () => {
    if (verifyedByEmail && openedForm === "forgotPassword") {
      setVerifyedByEmail(false);
      changeChannel?.("phone");
    } else {
      sendOTPToEmail();
    }
  };

  const onFinish = async (_values: VerifyOTPPayload) => {
    if (otpValue.length < 4) {
      message.error("يرجى إدخال رمز التحقق المكون من 4 أرقام");
      return;
    }

    VerifyOtpMutation.mutate({
      otp: otpValue,
      identifier: verifyedByEmail ? data?.email : data?.phone,
      channel: verifyedByEmail ? "email" : "whatsapp",
      region: data?.region,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <p>أدخل الرمز المُرسل لرقم الجوال (واتس أب) المسجل في المنصة</p>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item<VerifyOTPPayload>
          name="otp"
          rules={[
            {
              required: true,
              message: "يرجى إدخال رمز التحقق",
            },
          ]}
        >
          <div className="flex justify-center mt-5">
            <Input.OTP
              length={4}
              size="large"
              value={otpValue}
              onChange={(value) => {
                setOtpValue(value);
                form.setFieldsValue({ otp: value });
              }}
            />
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full"
            disabled={VerifyOtpMutation.isPending}
            loading={VerifyOtpMutation.isPending}
          >
            إرسال
          </Button>
          <Button
            htmlType="button"
            size="large"
            className="w-full bg-white text-primary border border-color-primary mt-2"
            onClick={handelChangeChannel}
            disabled={SendOTPTo.isPending}
            loading={SendOTPTo.isPending}
          >
            {verifyedByEmail && openedForm === "forgotPassword"
              ? "أرسل الرمز عبر رقم الهاتف"
              : "أرسل الرمز على البريد الإلكتروني"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyOtp;
