import BreadCrumbComponent from "@components/breadcrumb/breadcrumb";
import { Button, Form, Input } from "antd";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";

interface ProfileFormProps {
  onCancel: () => void;
}

const ProfileForm = ({ onCancel }: ProfileFormProps) => {
  const [form] = Form.useForm();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", values);
      // Here you would typically save the data to your API
      onCancel(); // Close the form after saving
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const initialValues = {
    memberName: "طارق محمد الفراج",
    memberEmail: "Tareq@gmail.com",
    memberPhone: "+966 56 464 5665",
    organizationName: "أوقاف المدينة",
    organizationNumber: "10775599777",
    organizationTaxNumber: "25987541256987",
    postalCode: "5479",
    organizationEmail: "info@riyadhcharity.org",
    organizationPhone: "+966 11 123 4567",
    organizationWebsite: "www.riyadhcharity.org",
    buildingNumber: "4579",
    city: "مكة المكرمة",
    province: "جدة",
  };

  return (
    <>
      <BreadCrumbComponent
        items={[{ path: null, label: "تعديل الملف الشخصي" }]}
      />
      <div className="bg-white pt-6 shadow-md rounded-md mx-10">
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          className="p-6"
        >
          <section>
            <h1 className="text-second-primary text-xl font-bold relative inline-block px-5">
              تعديل الحساب الشخصي
              <p className="h-1 bg-primary w-[50%] mt-1"></p>
            </h1>
            <div className="p-6">
              <h1 className="text-second-primary text-xl font-semibold relative inline-block">
                بيانات العضو المسجل
                <p className="h-1 bg-primary w-[50%] mt-1"></p>
              </h1>
              <p className="mt-2">تاريخ الانضمام إلى المنصة: 10 أبريل 2025 </p>

              <div className="mt-4 max-w-md">
                <Form.Item
                  label="الاسم الثلاثي"
                  name="memberName"
                  rules={[
                    { required: true, message: "يرجى إدخال الاسم الثلاثي" },
                  ]}
                >
                  <Input size="large" placeholder="الاسم الثلاثي" />
                </Form.Item>
              </div>

              <div className="mt-4 max-w-md">
                <Form.Item
                  label="البريد الإلكتروني"
                  name="memberEmail"
                  rules={[
                    { required: true, message: "يرجى إدخال البريد الإلكتروني" },
                    { type: "email", message: "يرجى إدخال بريد إلكتروني صحيح" },
                  ]}
                >
                  <Input size="large" placeholder="البريد الإلكتروني" />
                </Form.Item>
              </div>

              <div className="mt-4 max-w-md">
                <Form.Item
                  label="رقم الجوال"
                  name="memberPhone"
                  rules={[{ required: true, message: "يرجى إدخال رقم الجوال" }]}
                >
                  <Input size="large" placeholder="رقم الجوال" />
                </Form.Item>
              </div>
            </div>
          </section>

          <section>
            <div className="px-6">
              <h1 className="text-second-primary text-xl font-semibold relative inline-block">
                بيانات المنظمة
                <p className="h-1 bg-primary w-[50%] mt-1"></p>
              </h1>
              <p className="mt-2">تاريخ الانضمام إلى المنصة: 10 أبريل 2025 </p>

              <div className="mt-4 max-w-md">
                <Form.Item
                  label="اسم المنظمة"
                  name="organizationName"
                  rules={[
                    { required: true, message: "يرجى إدخال اسم المنظمة" },
                  ]}
                >
                  <Input size="large" placeholder="اسم المنظمة" />
                </Form.Item>
              </div>

              <div className="mt-4 max-w-md">
                <Form.Item
                  label="رقم المنظمة"
                  name="organizationNumber"
                  rules={[
                    { required: true, message: "يرجى إدخال رقم المنظمة" },
                  ]}
                >
                  <Input size="large" placeholder="رقم المنظمة" />
                </Form.Item>
              </div>

              <div className="mt-4 max-w-md">
                <Form.Item
                  label="الرقم الضريبي للمنظمة"
                  name="organizationTaxNumber"
                  rules={[
                    { required: true, message: "يرجى إدخال الرقم الضريبي" },
                  ]}
                >
                  <Input size="large" placeholder="الرقم الضريبي للمنظمة" />
                </Form.Item>
              </div>
            </div>
          </section>

          <section>
            <div className="px-6 mb-4">
              <h1 className="text-second-primary text-xl font-semibold relative inline-block">
                بيانات المنظمة
                <p className="h-1 bg-primary w-[50%] mt-1"></p>
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Form.Item
                    label="الرمز البريدي"
                    name="postalCode"
                    rules={[
                      { required: true, message: "يرجى إدخال الرمز البريدي" },
                    ]}
                  >
                    <Input size="large" placeholder="الرمز البريدي" />
                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    label="رقم المبنى"
                    name="buildingNumber"
                    rules={[
                      { required: true, message: "يرجى إدخال رقم المبنى" },
                    ]}
                  >
                    <Input size="large" placeholder="رقم المبنى" />
                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    label="المدينة"
                    name="city"
                    rules={[{ required: true, message: "يرجى إدخال المدينة" }]}
                  >
                    <Input size="large" placeholder="المدينة" />
                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    label="المحافظة"
                    name="province"
                    rules={[{ required: true, message: "يرجى إدخال المحافظة" }]}
                  >
                    <Input size="large" placeholder="المحافظة" />
                  </Form.Item>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-center gap-10 md:gap-40 py-8 px-6">
            <Button
              type="primary"
              size="large"
              icon={<SaveOutlined />}
              className="px-8"
              onClick={handleSave}
            >
              حفظ التعديلات
            </Button>

            <Button
              size="large"
              icon={<CloseOutlined />}
              className="px-8"
              onClick={onCancel}
            >
              إلغاء
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ProfileForm;
