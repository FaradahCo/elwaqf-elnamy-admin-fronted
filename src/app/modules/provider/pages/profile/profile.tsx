import { Button, Collapse, type CollapseProps } from "antd";
import MainInformation from "./components/mainInformation/mainInformation";
import PrimaryEntryData from "./components/primaryEntryData/primarEntryData";
import NationalAddress from "./components/nationalAddress/nationalAddress";
import BankAccount from "./components/bankAccount/bankAccount";
import GeneralAttachements from "./components/generalAttachements/generalAttachements";

const Profile = () => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "المعلومات الأساسية",
      children: <MainInformation />,
    },
    {
      key: "2",
      label: "بيانات الجهة الأساسية",
      children: <PrimaryEntryData />,
    },
    {
      key: "3",
      label: "العنوان الوطني",
      children: <NationalAddress />,
    },
    {
      key: "4",
      label: "البيانات البنكية",
      children: <BankAccount />,
    },
    {
      key: "5",
      label: "مرفقات هامة",
      children: <GeneralAttachements />,
    },
  ];
  return (
    <section className="profile">
      <div className="flex justify-between gap-4 mb-4">
        <h1>الحساب الشخصي</h1>
        <Button type="primary">تعديل المعلومات</Button>
      </div>
      <Collapse items={items} defaultActiveKey={["1"]} />
    </section>
  );
};

export default Profile;
