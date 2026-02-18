import { setUser } from "@/app/store/slices/userSlice";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useApiMutation } from "@services/api";
import { setItem } from "@shared/services/storageService";
import { Button, Form, Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { pagesRoutePath } from "../../pages/pages.routes";
import type { LoginPayload, LoginResponse } from "../authentication.model";
import { authenticationRoutePath } from "../authentication.routes";
import { AuthenticationService } from "../authenticationService";
import { resetForceLogout } from "@/app/store/slices/authSlice";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginMutation = useApiMutation<LoginPayload, LoginResponse>(
    AuthenticationService.login,
    {
      onSuccess: (response) => {
        setItem("ADMIN_token", response.token);
        dispatch(setUser(response.user));
        dispatch(resetForceLogout());
        navigate(pagesRoutePath.HOME);
      },
    },
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
            <Link className="text-primary!" to={authenticationRoutePath.LOGIN}>
              تسجيل حساب جديد
            </Link>
          </p>

          <p className="mt-2 mb-2">
            <Link className="text-primary!" to={authenticationRoutePath.LOGIN}>
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
            تسجيل الدخول
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
