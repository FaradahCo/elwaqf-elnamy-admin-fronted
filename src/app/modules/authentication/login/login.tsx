import React from "react";
import { App, Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import { authenticationRoutePath } from "../authentication.routes";
import { AuthenticationService } from "../authenticationService";
import { useApiMutation } from "@services/api";
import type { LoginPayload, LoginResponse } from "../authentication.model";
import { providerRoutePath } from "../../provider/provider.routes";
import { clientRoutePath } from "../../client/clientRoutes";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/store/slices/userSlice";
import { setItem } from "@shared/services/storageService";

const Login: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginMutation = useApiMutation<LoginPayload, LoginResponse>(
    AuthenticationService.login,
    {
      onSuccess: (response) => {
        message.success("تم تسجيل الدخول بنجاح!");

        setItem("token", response.token);
        setItem("teamId", String(response.user.teams[0]?.id));
        dispatch(setUser(response.user));

        navigate(
          response.user.type === "provider"
            ? providerRoutePath.PROFILE
            : clientRoutePath.PROFILE
        );
      },
    }
  );

  const onFinish = (values: LoginPayload) => {
    loginMutation.mutate(values);
  };

  return (
    <>
      <Form layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item<LoginPayload>
          label="البريد الإلكتروني او رقم الجوال "
          name="identifier"
          rules={[
            {
              required: true,
              message: "يرجى إدخال البريد الإلكتروني او رقم الجوال ",
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

        <Form.Item<LoginPayload>
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
