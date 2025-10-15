import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import PhoneNumber from "@components/phone-number/phone-number";
import { useApiMutation } from "@services/api";
import { setFormFieldErrors } from "@services/sharedService";
import { App, Button, Form, Input } from "antd";
import React from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Link, useNavigate, useSearchParams } from "react-router";
import { clientRoutePath } from "../../client/clientRoutes";
import { providerRoutePath } from "../../provider/provider.routes";
import type {
  ApiErrorResponse,
  RegisterPayload,
  RegisterResponse,
} from "../authentication.model";
import { authenticationRoutePath } from "../authentication.routes";
import { AuthenticationService } from "../authenticationService";
import VerifyOtp from "../verifyOTP/verifyOTP";
const Register: React.FC = () => {
  const [form] = Form.useForm<RegisterPayload>();
  const [searchParams] = useSearchParams();
  const [showVerifyOTP, setShowVerifyOTP] = React.useState(false);
  const navigate = useNavigate();

  const RegisterationMutation = useApiMutation<
    RegisterPayload,
    RegisterResponse
  >(
    (payload) =>
      AuthenticationService.register(payload, searchParams.get("type")!),
    {
      onSuccess: (res) => {
        if (res.token) {
          res?.user?.type === "provider"
            ? navigate(providerRoutePath.PROFILE)
            : navigate(clientRoutePath.PROFILE);
        } else {
          setShowVerifyOTP(true);
        }
      },
      onError: (error: any) => {
        const errorResponse: ApiErrorResponse = error?.response?.data;
        setFormFieldErrors<RegisterPayload>(form, errorResponse);
      },
    }
  );

  const handlePhoneNumberChange = (phoneNumber?: string, country?: string) => {
    form.setFieldsValue({
      phone: phoneNumber,
      region: country,
    });
  };

  const onFinish = async (_values: RegisterPayload) => {
    RegisterationMutation.mutate(_values);
  };

  return (
    <>
      {showVerifyOTP ? (
        <VerifyOtp
          data={form.getFieldsValue()}
          functionMutation={RegisterationMutation}
        />
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<RegisterPayload>
            label={
              !searchParams.get("type") ? "الاسم الثلاثي" : "اسم مزود الخدمة"
            }
            name="name"
            rules={[
              {
                required: true,
                message: "يرجى إدخال الاسم الثلاثي",
              },
            ]}
          >
            <Input
              placeholder="ادخل اسمك الثلاثي"
              size="large"
              className="text-right"
            />
          </Form.Item>

          <Form.Item<RegisterPayload>
            name="phone"
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

          {/* Hidden field to store region */}
          <Form.Item<RegisterPayload> name="region" initialValue="sa" hidden>
            <Input />
          </Form.Item>

          <Form.Item<RegisterPayload>
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

          <Form.Item<RegisterPayload>
            label="كلمة المرور"
            name="password"
            rules={[
              {
                required: true,
                message: "يرجى إدخال كلمة المرور",
              },
              {
                min: 8,
                message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
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

          <Form.Item<RegisterPayload>
            label="تأكيد كلمة المرور"
            name="password_confirmation"
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
              disabled={RegisterationMutation.isPending}
              loading={RegisterationMutation.isPending}
            >
              تسجيل
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default Register;
