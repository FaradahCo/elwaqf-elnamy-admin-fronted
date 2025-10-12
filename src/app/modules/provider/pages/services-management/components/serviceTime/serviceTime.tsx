import { Form, Radio } from "antd";
import { Input } from "antd";
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
          <Form.Item>
            <Radio.Group size="large">
              <Radio.Button value="equi">يوم</Radio.Button>
              <Radio.Button value="comp">شهر</Radio.Button>
              <Radio.Button value="sing">سنه</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Input type="number" size="large" />
          </Form.Item>
        </div>

        <div className="mt-10">
          <h1 className="text-second-primary text-md font-semibold mb-2">
            مبلغ الخدمة يبدأ من
          </h1>
          <p className="text-gray-400 mb-3">
            ضع الحدّ الأدنى لمبلغ الخدمة، يظهر للعميل كـ “يبدأ من”.
          </p>

          <Form.Item>
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

          <Form.Item>
            <Input type="number" size="large" />
          </Form.Item>
        </div>
      </div>
    </>
  );
};

export default ServiceTime;
