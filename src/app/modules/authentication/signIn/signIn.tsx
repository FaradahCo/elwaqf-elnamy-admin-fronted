import { App, Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import React from "react";
import type { SignInPayload } from "../authentication.model";
import { Link } from "react-router";
import { authenticationRoutePath } from "../authentication.routes";
const SignIn: React.FC = () => {
  const { message } = App.useApp();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    message.success("تم تسجيل الدخول بنجاح!");
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
        <Form.Item<SignInPayload>
          label="الاسم الثلاثي"
          name="fullName"
          rules={[
            {
              required: true,
              message: "يرجى إدخال الاسم الثلاثي",
            },
            {
              min: 3,
              message: "الاسم يجب أن يكون 3 أحرف على الأقل",
            },
          ]}
        >
          <Input
            placeholder="ادخل اسمك الثلاثي"
            size="large"
            className="text-right"
          />
        </Form.Item>

        <Form.Item<SignInPayload>
          label="رقم الجوال"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "يرجى إدخال رقم الجوال",
            },
            {
              pattern: /^[0-9+\-\s()]+$/,
              message: "يرجى إدخال رقم جوال صحيح",
            },
            {
              min: 10,
              message: "رقم الجوال يجب أن يكون 10 أرقام على الأقل",
            },
          ]}
        >
          <Input
            placeholder="ادخل رقم جوالك"
            size="large"
            className="text-right"
          />
        </Form.Item>

        <Form.Item<SignInPayload>
          label="البريد الإلكتروني"
          name="email"
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

        <Form.Item<SignInPayload>
          label="كلمة المرور"
          name="password"
          rules={[
            {
              required: true,
              message: "يرجى إدخال كلمة المرور",
            },
            {
              min: 6,
              message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
            },
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

        <Form.Item<SignInPayload>
          label="تأكيد كلمة المرور"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "يرجى تأكيد كلمة المرور",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("كلمة المرور غير متطابقة"));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="أعد إدخال كلمة المرور"
            size="large"
            className="text-right"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <p className="text-sm mt-2 mb-4">
          بتسجيلك في المنصّة، فأنت تقرّ باطّلاعك على{" "}
          <span className="text-primary cursor-pointer">الشروط والأحكام</span>{" "}
          والموافقة عليها والالتزام بما ورد فيها.
        </p>

        <hr className="text-gray-200" />

        <p className="mt-4">
          لديك حساب ؟
          <Link className="text-primary!" to={authenticationRoutePath.LOGIN}>
            {" "}
            تسجيل الدخول
          </Link>
        </p>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full mt-8"
          >
            تسجيل
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignIn;
