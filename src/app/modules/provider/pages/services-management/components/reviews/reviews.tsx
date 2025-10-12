import { Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const Reviews = () => {
  return (
    <div>
      <main>
        <h1 className="text-second-primary text-xl font-semibold mb-2">
          المراجعة والإرسال
        </h1>
      </main>

      <div className="mt-10">
        <h1 className="text-second-primary text-lg font-semibold mb-2">
          تم استكمال جميع بيانات الخدمة بنجاح
        </h1>
        <p className="text-gray-400 mb-3">
          يمكنك معاينة التفاصيل والتأكد منها قبل الإرسال للمراجعة والاعتماد في
          المنصة
        </p>

        <Button
          size="large"
          icon={<EyeOutlined />}
          className="bg-white border-primary! text-primary! hover:bg-primary! hover:text-white! mt-3"
        >
          معاينة الخدمة
        </Button>
      </div>
    </div>
  );
};
export default Reviews;
