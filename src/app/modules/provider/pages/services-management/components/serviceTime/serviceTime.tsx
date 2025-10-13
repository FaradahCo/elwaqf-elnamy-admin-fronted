import { Form, InputNumber, Radio } from "antd";
import type { ServiceFormData } from "../../servicesManagement.model";

const ServiceTime = () => {
  return (
    <>
      <div>
        <main>
          <h1 className="text-second-primary text-xl font-semibold mb-2">
            المبلغ
          </h1>
          <p className="text-gray-400">
            اختر طريقة التسعير المناسبة لهذه الخدمة.
          </p>
        </main>

        <div className="mt-10">
          <h1 className="text-second-primary text-md font-semibold mb-2">
            مدة تنفيذ الخدمة
          </h1>
          <p className="text-gray-400 mb-3">
            المدّة التي تلتزم فيها بالتسليم النهائي للخدمة (ضمن ساعات العمل)
          </p>
          <Form.Item<ServiceFormData>
            name="duration_type"
            rules={[{ required: true, message: "يرجى اختيار وحدة المدة" }]}
          >
            <Radio.Group size="large">
              <Radio.Button value="day">يوم</Radio.Button>
              <Radio.Button value="month">شهر</Radio.Button>
              <Radio.Button value="year">سنة</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item<ServiceFormData>
            name="duration_time"
            rules={[
              { required: true, message: "يرجى إدخال مدة الخدمة" },
              {
                type: "number",
                min: 1,
                message: "يجب أن تكون المدة أكبر من صفر",
              },
            ]}
          >
            <InputNumber
              size="large"
              placeholder="أدخل مدة تنفيذ الخدمة"
              style={{ width: "100%" }}
              min={1}
            />
          </Form.Item>
        </div>

        <div className="mt-10">
          <h1 className="text-second-primary text-md font-semibold mb-2">
            مبلغ الخدمة يبدأ من
          </h1>
          <p className="text-gray-400 mb-3">
            ضع الحدّ الأدنى لمبلغ الخدمة، يظهر للعميل كـ "يبدأ من".
          </p>

          <Form.Item<ServiceFormData>
            name="min_price"
            rules={[
              { required: true, message: "يرجى إدخال مبلغ الخدمة" },
              {
                type: "number",
                min: 1,
                message: "يجب أن يكون المبلغ أكبر من صفر",
              },
            ]}
          >
            <InputNumber
              size="large"
              placeholder="أدخل المبلغ بالريال السعودي"
              style={{ width: "100%" }}
              min={1}
              addonAfter="ر.س"
            />
          </Form.Item>
        </div>

        <div className="mt-10">
          <h1 className="text-second-primary text-md font-semibold mb-2">
            زمن الاستجابة
          </h1>
          <p className="text-gray-400 mb-3">
            المدّة التي تلتزم فيها بالرد على طلبات التسعير (ضمن ساعات العمل)
          </p>

          <Form.Item<ServiceFormData>
            name="response_time"
            rules={[
              { required: true, message: "يرجى إدخال زمن الاستجابة" },
              {
                type: "number",
                min: 1,
                message: "يجب أن يكون الزمن أكبر من صفر",
              },
            ]}
          >
            <InputNumber
              size="large"
              placeholder="أدخل زمن الاستجابة بالساعات"
              style={{ width: "100%" }}
              min={1}
              addonAfter="ساعة"
            />
          </Form.Item>
        </div>
      </div>
    </>
  );
};

export default ServiceTime;
