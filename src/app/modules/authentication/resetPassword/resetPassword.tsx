import React, { useMemo } from "react";
import { App, Button, Form, Input } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { useApiMutation } from "../../../shared/services/api";
import { AuthenticationService } from "../authenticationService";
import type {
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "../authentication.model";
import { authenticationRoutePath } from "../authentication.routes";
import { getItem, removeItem } from "../../../shared/services/storageService";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const queryToken = useMemo(
    () => searchParams.get("token") ?? "",
    [searchParams]
  );

  const resetMutation = useApiMutation<
    ResetPasswordPayload,
    ResetPasswordResponse
  >(AuthenticationService.resetPassword, {
    onSuccess: () => {
      removeItem("identifier");
      navigate(authenticationRoutePath.LOGIN);
    },
  });

  const onFinish = (values: {
    password: string;
    password_confirmation: string;
  }) => {
    const payload: ResetPasswordPayload = {
      token: queryToken,
      identifier: getItem("identifier")!,
      region: getItem("region") || "sa",
      ...values,
    };
    resetMutation.mutate(payload);
  };

  return (
    <>
      <Form layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="كلمة المرور الجديدة"
          name="password"
          rules={[
            { required: true, message: "يرجى إدخال كلمة المرور" },
            { min: 8, message: "الحد الأدنى 8 أحرف" },
          ]}
          hasFeedback
        >
          <Input.Password size="large" className="text-right" />
        </Form.Item>

        <Form.Item
          label="تأكيد كلمة المرور"
          name="password_confirmation"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "يرجى تأكيد كلمة المرور" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("كلمة المرور غير متطابقة");
              },
            }),
          ]}
        >
          <Input.Password size="large" className="text-right" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full mt-4"
            loading={resetMutation.isPending}
            disabled={resetMutation.isPending}
          >
            {resetMutation.isPending
              ? "جاري الحفظ..."
              : "إعادة تعيين كلمة المرور"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ResetPassword;
