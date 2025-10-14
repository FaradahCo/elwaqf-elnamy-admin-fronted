import { EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Reviews = () => {
  return (
    <div>
      <main>
        <h1 className="text-second-primary text-xl font-semibold mb-2">
          المراجعة والإرسال
        </h1>
      </main>

      <div className="mt-6">
        <div className="p-4 rounded-lg">
          <h3 className="text-second-primary text-lg font-semibold mb-2">
            تم استكمال جميع بيانات الخدمة بنجاح
          </h3>
          <p className="mb-3">
            يمكنك مراجعة التفاصيل أعلاه والتأكد منها قبل الإرسال للمراجعة
            والاعتماد في المنصة
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
    </div>
  );
};
export default Reviews;
