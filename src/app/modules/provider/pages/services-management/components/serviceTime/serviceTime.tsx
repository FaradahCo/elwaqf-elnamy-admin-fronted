import { Form, Radio } from "antd";
import { Input } from "antd";
import type {
  ServiceFormData,
  FormnProps,
} from "../../servicesManagement.model";

const ServiceTime = ({ labels }: FormnProps) => {
  return (
    <>
      <div>
        <main>
          <h1 className="text-second-primary text-xl font-semibold mb-2">
            المبلغ
          </h1>
          <p className="text-gray-400">
            اختر طريقة التسعير المناسبة لهذه {labels?.entityGenitive}.
          </p>
        </main>

        <div className="mt-10">
          <h1 className="text-second-primary text-md font-semibold mb-2">
            مدة تنفيذ {labels?.entityGenitive}
          </h1>
          <p className="text-gray-400 mb-3">
            المدّة التي تلتزم فيها بالتسليم النهائي {labels?.entityGenitive}{" "}
            (ضمن ساعات العمل)
          </p>
          <Form.Item<ServiceFormData>
            name="duration_type"
            className="main-radio"
          >
            <Radio.Group size="large">
              <Radio.Button value="day">يوم</Radio.Button>
              <Radio.Button value="month">شهر</Radio.Button>
              <Radio.Button value="year">سنه</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item<ServiceFormData> name="duration_time">
            <Input type="number" size="large" />
          </Form.Item>
        </div>

        <div className="mt-10">
          <h1 className="text-second-primary text-md font-semibold mb-2">
            مبلغ {labels?.entityGenitive} يبدأ من
          </h1>
          <p className="text-gray-400 mb-3">
            ضع الحدّ الأدنى لمبلغ {labels?.entityGenitive}، يظهر للعميل كـ "يبدأ
            من".
          </p>

          <Form.Item<ServiceFormData> name="min_price">
            <Input type="number" size="large" />
          </Form.Item>
        </div>

        <div className="mt-10">
          <h1 className="text-second-primary text-md font-semibold mb-2">
            زمن الاستجابة
          </h1>
          <p className="text-gray-400 mb-3">
            المدّة التي تلتزم فيها بالرد على طلبات التسعير (ضمن ساعات العمل)
          </p>

          <Form.Item<ServiceFormData> name="response_time">
            <Input type="number" size="large" />
          </Form.Item>
        </div>
      </div>
    </>
  );
};

export default ServiceTime;
