import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

const MainInformation = () => {
  return (
    <div>
      <main>
        <h1 className="text-second-primary text-xl font-semibold mb-2">
          المعلومات الأساسية
        </h1>
        <p className="text-gray-400">
          أدخِل المعلومات الأساسية الخاصة بخدمتك، بما في ذلك الاسم والوصف
          والتصنيف. تأكد من أن البيانات دقيقة وواضحة لتسهيل مراجعتها واعتمادها.
        </p>
      </main>

      <div className="mt-10">
        <h1 className="text-second-primary text-md font-semibold mb-2">
          اسم الخدمة
        </h1>
        <p className="text-gray-400 mb-3">اكتب اسمًا يصف الخدمة بوضوح </p>

        <Form.Item>
          <Input
            type="text"
            placeholder="اسم واضح يصف المخرجات بدقّة"
            size="large"
          />
        </Form.Item>
      </div>

      <div className="mt-10">
        <h1 className="text-second-primary text-md font-semibold mb-2">
          تصنيف الخدمة
        </h1>
        <p className="text-gray-400 mb-3">
          اختر التصنيف الذي يعبّر عن نوع الخدمة
        </p>

        <Form.Item>
          <Select size="large" placeholder="اختر تصنيف الخدمة">
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
      </div>

      <div className="mt-10">
        <h1 className="text-second-primary text-md font-semibold mb-2">
          وصف الخدمة
        </h1>
        <p className="text-gray-400 mb-3">
          صف الخدمة وآلية تنفيذها والفائدة المتوقعة
        </p>

        <Form.Item>
          <TextArea rows={4} placeholder="يرجى كتابة وصف تفصيلي للخدمة" />
        </Form.Item>
      </div>

      <div className="mt-10">
        <h1 className="text-second-primary text-md font-semibold mb-2">
          مخرجات الخدمة
        </h1>
        <p className="text-gray-400 mb-3">
          اذكر ما سيستلمه العميل بعد تنفيذ الخدمة
        </p>

        <Form.Item>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="مخرجات الخدمة"
              size="large"
              className="flex-1"
            />
            <Button
              size="large"
              icon={<PlusOutlined />}
              className="bg-white border-2 border-primary! text-primary! hover:bg-primary! hover:text-white!"
            >
              إضافة
            </Button>
          </div>
        </Form.Item>
      </div>

      <div className="mt-10">
        <h1 className="text-second-primary text-md font-semibold mb-2">
          نطاق الخدمة
        </h1>
        <p className="text-gray-400 mb-3">وضّح حدود الخدمة وما يشمله التنفيذ</p>

        <Form.Item>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="نطاق الخدمة"
              size="large"
              className="flex-1"
            />
            <Button
              size="large"
              icon={<PlusOutlined />}
              className="bg-white border-2 border-primary! text-primary! hover:bg-primary! hover:text-white!"
            >
              إضافة
            </Button>
          </div>
        </Form.Item>
      </div>
    </div>
  );
};

export default MainInformation;
