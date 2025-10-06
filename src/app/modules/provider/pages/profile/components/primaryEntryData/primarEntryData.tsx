import { DatePicker, Form, Input, Radio } from "antd";

const PrimaryEntryData = () => {
  return (
    <Form layout="vertical">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item name="username" label="اسم الشركة أو الكيان بالعربية">
          <Input placeholder="اسم الشركة أو الكيان بالعربية" size="large" />
        </Form.Item>

        <Form.Item label="نوع الكيان القانوني">
          <Radio.Group size="large">
            <Radio.Button value="equi">مؤسسة</Radio.Button>
            <Radio.Button value="comp">شركة</Radio.Button>
            <Radio.Button value="sing">فرد</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </div>
      <Form.Item name="username" label="رقم السجل التجاري">
        <Input placeholder=" ادخل رقم السجل التجاري" size="large" />
      </Form.Item>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item name="username" label="تاريخ اصدار السجل التجاري">
          <DatePicker
            size="large"
            className="w-full"
            placeholder="تاريخ اصدار السجل التجاري"
          />
        </Form.Item>
        <Form.Item name="username" label="تاريخ انتهاء الرقم الضريبي">
          <DatePicker
            size="large"
            className="w-full"
            placeholder="تاريخ انتهاء السجل الضريبي"
          />
        </Form.Item>
      </div>
      <Form.Item name="username" label="الرقم الضريبي (VAT Number)">
        <Input placeholder="ادخل الرقم الضريبي (VAT Number) " size="large" />
      </Form.Item>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item name="username" label="تاريخ اصدار السجل التجاري">
          <DatePicker
            size="large"
            className="w-full"
            placeholder="تاريخ اصدار الرقم الضريبي"
          />
        </Form.Item>
        <Form.Item name="username" label="تاريخ انتهاء الرقم الضريبي">
          <DatePicker
            size="large"
            className="w-full"
            placeholder="تاريخ انتهاء الرقم الضريبي"
          />
        </Form.Item>
      </div>
      <Form.Item name="username" label="الرقم الموحد">
        <Input placeholder="ادخل الرقم الموحد" size="large" />
      </Form.Item>
    </Form>
  );
};

export default PrimaryEntryData;
