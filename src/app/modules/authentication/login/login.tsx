import React from "react";
import { App, Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import { authenticationRoutePath } from "../authentication.routes";
import { AuthenticationService } from "../authenticationService";
import { useApiMutation } from "../../../shared/services/api";
import type { LoginPayload } from "../authentication.model";

const Login: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();

  const loginMutation = useApiMutation<LoginPayload, any>(
    AuthenticationService.login,
    {
      onSuccess: (response) => {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        message.success("تم تسجيل الدخول بنجاح!");
        
        // Navigate to home page or dashboard
        navigate("/provider/home");
      },
     
    }
  );

  const onFinish = (values: { identifier: string; password: string }) => {
    const loginData: LoginPayload = {
      identifier: values.identifier,
      password: values.password,
    };
    
    loginMutation.mutate(loginData);
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
            loading={loginMutation.isPending}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "جاري تسجيل الدخول..." : "دخول"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
