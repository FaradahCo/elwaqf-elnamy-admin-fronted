import { pagesRoutePath } from "@/app/modules/pages/pages.routes";
import { Button } from "antd";

export const UnderCreation = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={"/images/under_construction.svg"} />
      <p className="text-primary mt-4 text-4xl">الصفحة تحت الإنشاء</p>
      <Button type="primary" className="mt-2" href={pagesRoutePath.HOME}>
        العودة إلى الصفحة الرئيسية
      </Button>
    </div>
  );
};
export default UnderCreation;
