import { useOutletContext } from "react-router";

import { Collapse } from "antd";
import { DownOutlined } from "@ant-design/icons";

import type { Client } from "../../../../alwaqfModel";
import LabelContent from "@shared/components/labelContent/labelContent";
import { useMemo } from "react";

const Profile = () => {
  const clientData = useOutletContext<Client>();

  const items = useMemo(
    () => [
      {
        key: "1",
        label: (
          <span className="text-lg font-semibold text-gray-800">
            المعلومات الأساسية
          </span>
        ),
        children: (
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <LabelContent label="اسم المستخدم">
                <p className="p-2 rounded-lg border border-gray-200">
                  {clientData?.name ?? "-"}
                </p>
              </LabelContent>
              <LabelContent label="البريد الإلكتروني">
                <p className="p-2 rounded-lg border border-gray-200">
                  {clientData?.email ?? "-"}
                </p>
              </LabelContent>
              <LabelContent label="رقم الجوال">
                <p className="p-2 rounded-lg border border-gray-200">
                  {clientData?.phone ?? "-"}
                </p>
              </LabelContent>
            </div>
          </div>
        ),
        className: "mb-2 bg-white rounded-md!",
      },
      {
        key: "2",
        label: (
          <span className="text-lg font-semibold text-gray-800">
            العنوان الوطني
          </span>
        ),
        children: (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <LabelContent label="اسم المنظمة">
                <p className="p-2 rounded-lg border border-gray-200">
                  {clientData?.profile?.waqf_name ?? "-"}
                </p>
              </LabelContent>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <LabelContent label="الرقم الضريبي">
                <p className="p-2 rounded-lg border border-gray-200">
                  {clientData?.profile?.vat_number ?? "-"}
                </p>
              </LabelContent>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LabelContent label="المدينة">
                <p className="p-2 rounded-lg border border-gray-200">
                  {clientData?.region ?? "-"}
                </p>
              </LabelContent>
              <LabelContent label="الحي">
                <p className="p-2 rounded-lg border border-gray-200">
                  {clientData?.profile?.district ?? "-"}
                </p>
              </LabelContent>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <LabelContent label="الشارع">
                <p className="p-2 rounded-lg border border-gray-200">
                  {clientData?.profile?.street ?? "-"}
                </p>
              </LabelContent>

              <LabelContent label="الرمز البريدي">
                <p className="p-2 rounded-lg border border-gray-200">
                  {clientData?.profile?.postal_code ?? "-"}
                </p>
              </LabelContent>
              <LabelContent label="رقم المبنى">
                <p className="p-2 rounded-lg border border-gray-200">
                  {clientData?.profile?.building_number ?? "-"}
                </p>
              </LabelContent>
            </div>
          </div>
        ),
        className: "bg-white rounded-md!",
      },
    ],
    [clientData],
  );

  return (
    <Collapse
      defaultActiveKey={["1", "2"]}
      expandIconPosition="end"
      bordered={false}
      expandIcon={({ isActive }) => (
        <DownOutlined rotate={isActive ? 180 : 0} className="text-gray-600" />
      )}
      items={items}
      className="flex flex-col gap-2 rounded-md"
    />
  );
};

export default Profile;
