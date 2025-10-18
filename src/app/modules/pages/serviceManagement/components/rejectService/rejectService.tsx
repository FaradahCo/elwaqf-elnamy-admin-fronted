import { Form, Select, Input } from "antd";
import { forwardRef, useImperativeHandle } from "react";

const { TextArea } = Input;

interface RejectServiceRef {
  validateForm: () => Promise<any>;
  resetForm: () => void;
}

const RejectService = forwardRef<RejectServiceRef>((_props, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    validateForm: async () => {
      try {
        const values = await form.validateFields();
        return values;
      } catch (error) {
        throw error;
      }
    },
    resetForm: () => {
      form.resetFields();
    },
  }));

  const noteLocationOptions = [
    { value: "general", label: "عام" },
    { value: "title", label: "العنوان" },
    { value: "description", label: "الوصف" },
    { value: "requirements", label: "المتطلبات" },
    { value: "outputs", label: "المخرجات" },
    { value: "scopes", label: "النطاقات" },
    { value: "price", label: "السعر" },
    { value: "duration", label: "المدة" },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <img src={"/images/info.svg"} />
      <h1>إرجاع الخدمة مع ملاحظات</h1>
      <p>
        يرجى كتابة الملاحظات أو أسباب الإرجاع ليتمكن المزوّد من مراجعتها
        واستكمال المطلوب قبل إعادة الإرسال
      </p>

      <Form form={form} layout="vertical" className="w-full max-w-lg mt-6">
        <Form.Item name="noteLocation" label="موقع الملاحظة">
          <Select
            placeholder="اختر موقع الملاحظة"
            options={noteLocationOptions}
          />
        </Form.Item>

        <Form.Item
          name="reason"
          label="ملاحظات الإدارة"
          rules={[{ required: true, message: "يرجى إدخال ملاحظات الإدارة" }]}
        >
          <TextArea rows={4} placeholder="اكتب ملاحظات الإدارة هنا..." />
        </Form.Item>
      </Form>
    </div>
  );
});

RejectService.displayName = "RejectService";

export default RejectService;
export type { RejectServiceRef };
