import BreadCrumbComponent from "@components/breadcrumb/breadcrumb";
import { Button } from "antd";
import { EditOutlined, LockOutlined } from "@ant-design/icons";

interface ProfileViewProps {
  onEdit: () => void;
}

const ProfileView = ({ onEdit }: ProfileViewProps) => {
  return (
    <>
      <BreadCrumbComponent items={[{ path: null, label: "الملف الشخصي" }]} />
      <div className="bg-white pt-6 shadow-md rounded-md mx-10">
        <section>
          <h1 className="text-second-primary text-xl font-bold relative inline-block px-5">
            الحساب الشخصي
            <p className="h-1 bg-primary w-[50%] mt-1"></p>
          </h1>
          <div className="p-6">
            <h1 className="text-second-primary text-xl font-semibold relative inline-block">
              بيانات العضو المسجل
              <p className="h-1 bg-primary w-[50%] mt-1"></p>
            </h1>
            <p className="mt-2">تاريخ الانضمام إلى المنصة: 10 أبريل 2025 </p>
            <div className="mt-4">
              <h1 className="text-second-primary text-xl font-semibold relative inline-block mb-1">
                الاسم الثلاثي
              </h1>
              <p className="text-lg">طارق محمد الفراج</p>
            </div>

            <div className="mt-4">
              <h1 className="text-second-primary text-xl font-semibold relative inline-block mb-1">
                البريد الإلكتروني
              </h1>
              <p className="text-lg"> Tareq@gmail.com</p>
            </div>

            <div className="mt-4">
              <h1 className="text-second-primary text-xl font-semibold relative inline-block mb-1">
                رقم الجوال
              </h1>
              <p className="text-lg">⁦+966 56 464 5665⁩</p>
            </div>
          </div>
        </section>
        <section>
          <div className="px-6">
            <h1 className="text-second-primary text-xl font-semibold relative inline-block">
              بيانات المنظمة
              <p className="h-1 bg-primary w-[50%] mt-1"></p>
            </h1>
            <div className="mt-4">
              <h1 className="text-second-primary text-xl font-semibold relative inline-block mb-1">
                اسم المنظمة
              </h1>
              <p className="text-lg"> أوقاف المدينة</p>
            </div>

            <div className="mt-4">
              <h1 className="text-second-primary text-xl font-semibold relative inline-block mb-1">
                رقم المنظمة
              </h1>
              <p className="text-lg">10775599777</p>
            </div>

            <div className="mt-4">
              <h1 className="text-second-primary text-xl font-semibold relative inline-block mb-1">
                الرقم الضريبي للمنظمة
              </h1>
              <p className="text-lg">25987541256987</p>
            </div>
          </div>
        </section>

        <section>
          <div className="px-6 mb-4">
            <h1 className="text-second-primary text-xl font-semibold relative inline-block">
              بيانات المنظمة
              <p className="h-1 bg-primary w-[50%] mt-1"></p>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h1 className="text-second-primary text-xl font-semibold relative inline-block mb-1">
                  الرمز البريدي
                </h1>
                <p className="text-lg">5479</p>
              </div>

              <div>
                <h1 className="text-second-primary text-xl font-semibold relative inline-block mb-1">
                  رقم المبنى
                </h1>
                <p className="text-lg">4579</p>
              </div>

              <div>
                <h1 className="text-second-primary text-xl font-semibold relative inline-block mb-1">
                  المدينة
                </h1>
                <p className="text-lg">مكة المكرمة</p>
              </div>

              <div>
                <h1 className="text-second-primary text-xl font-semibold relative inline-block mb-1">
                  المحافظة
                </h1>
                <p className="text-lg">جدة</p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons Section */}
        <div className="flex justify-center gap-10 md:gap-40 py-8 px-6">
          <Button
            type="primary"
            size="large"
            icon={<EditOutlined />}
            className="px-8"
            onClick={onEdit}
          >
            تعديل البيانات
          </Button>

          <Button size="large" icon={<LockOutlined />} className="px-8">
            تحديث كلمة المرور
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfileView;
