import { providerRoutePath } from "@/app/modules/provider/provider.routes";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { servicesManagementsPaths } from "../../servisesManagements.routes";

const ServcieManagementList = () => {
  const navigation = useNavigate();
  return (
    <div className="flex gap-4">
      <Button
        type="primary"
        onClick={() => navigation(providerRoutePath.ADD_SERVICE)}
      >
        إضافة حدمة
      </Button>
      <Button
        onClick={() => navigation(servicesManagementsPaths.EDIT_SERVICE(1))}
      >
        إضافه باقة
      </Button>
    </div>
  );
};
export default ServcieManagementList;
