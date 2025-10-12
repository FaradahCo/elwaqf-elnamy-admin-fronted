import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
const UserRequiremnts = () => {
  return (
    <div>
      <main>
        <h1 className="text-second-primary text-xl font-semibold mb-2">
          متطلبات الاستفادة
        </h1>
      </main>

      <div className="mt-10">
        <h1 className="text-second-primary text-md font-semibold mb-2">
          متطلبات الاستفادة
        </h1>
        <p className="text-gray-400 mb-3">
          الشروط أو الضوابط التي يجب أن تتوفر لدى العميل حتى يتمكّن من طلب
          الخدمة
        </p>

        <Form.Item>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="اكتب متطلب الاستفادة"
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

export default UserRequiremnts;
