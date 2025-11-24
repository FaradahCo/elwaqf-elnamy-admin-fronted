import {
  Checkbox,
  Col,
  Collapse,
  Form,
  Input,
  Row,
  Select,
  Tooltip,
  Button,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { CaretRightFilled, PlusOutlined } from "@ant-design/icons";
import type { ConsulationFormPayload } from "../model/consultationModel";
import ConsultationPanelHeader from "../components/consultationPanelHeader/consultationPanelHeader";

const ConsultationForm = () => {
  const [form] = useForm();
  const onFinish = (values: ConsulationFormPayload) => {
    console.log(values);
  };
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          questions: [
            {
              question: "",
              answerType: undefined,
              canBeSkipped: false,
              allowOther: false,
              options:[{}]
            },
          ],
        }}
        onFinish={onFinish}
      >
        <Form.List name="questions">
          {(fields, { add, remove }) => (
            <>
              <div className="mb-2 flex">
                <Button
                size="large"
                onClick={() => add({options:[{}]})}
                className="bg-white border-2 border-primary! text-primary! hover:bg-primary! hover:text-white!"
                >
                  + اضافة سؤال اخر
                </Button>
              </div>

              {fields.map((field, index) => (
                <Collapse
                  key={field.key}
                  expandIconPosition="end"
                  bordered={false}
                  className="border! !bg-white border-[#D2D2D2]! mb-4"
                  expandIcon={({ isActive }) => (
                    <CaretRightFilled
                      className={`text-lg! mt-2! ${
                        isActive ? "bg-[#028AC01A]!" : "bg-[#D2D2D2]!"
                      } ${
                        isActive ? "text-[#064f6b]!" : "text-[#566a72]!"
                      } p-2 rounded-full!`}
                      rotate={isActive ? 270 : 90}
                    />
                  )}
                >
                  <Collapse.Panel
                    key={index}
                    header={
                      <ConsultationPanelHeader index={index} remove={remove} field={field}/>
                    }
                  >
                    <Form.Item
                      name={[field.name, "question"]}
                      label="السؤال"
                      rules={[
                        {
                          required: true,
                          message: "يرجى ادخال السؤال",
                        },
                      ]}
                    >
                      <Input size="large" type="text" placeholder="يرجى كتابة السؤال بصياغة مختصرة وسهلة الفهم للعميل" />
                    </Form.Item>
                    <Row className="flex items-center" gutter={12}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name={[field.name, "answerType"]}
                          label="نوع الاجابة"
                          rules={[
                            {
                              required: true,
                              message: "يرجى اختيار نوع الاجابة",
                            },
                          ]}
                        >
                          <Select size="large" placeholder="اختيار من متعدد">
                            <Select.Option value="1">1</Select.Option>
                            <Select.Option value="2">2</Select.Option>
                            <Select.Option value="3">3</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name={[field.name, "canBeSkipped"]}
                          label=" "
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox />
                            <p>إمكانية تخطي هذا السؤال</p>
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>
                  <div className="mt-4">
  <h2 className="text-start text-base font-semibold my-4">
    الاجابة  
  </h2>
  
  <Form.List name={[field.name, "options"]}>
    {(subFields, subOpt) => (
      <>
        {subFields.map((subField, subIndex) => (
          <Form.Item 
            key={subField.key}
            name={[subField.name, "option"]} 
            label=""
          >
            <Row gutter={8}>
              <Col xs={20} md={22}>
                <Input type="text"  size="large" placeholder="اضافة خيار اخر"/>
              </Col>
              <Col xs={4} md={2}>
                <Tooltip placement="right" title="حذف">
                  <Button
                    className="rounded-full! bg-transparent! border-0!"
                    onClick={() => subOpt.remove(subField.name)}
                    icon={<img src="/images/delete-icon-2.svg" alt="delete icon" />}
                  />
                </Tooltip>
              </Col>
            </Row>
          </Form.Item>
        ))}
        
        <Button
          onClick={() => subOpt.add()}
          size="large"
          className="bg-white border-2 border-primary! text-primary! hover:bg-primary! hover:text-white!"
          icon={<PlusOutlined />}
        >
          إضافة خيار آخر
        </Button>
      </>
    )}
  </Form.List>
  
  <Form.Item
    name={[field.name, "allowOther"]}
    className="mb-0"
    valuePropName="checked"
  >
    <Checkbox className="text-sm text-gray-700">
      السماح بخيار "أخرى"
    </Checkbox>
  </Form.Item>
</div>
                  </Collapse.Panel>
                </Collapse>
              ))}
            </>
          )}
        </Form.List>
          <Row className="justify-between items-center">
          
        <Button 
        className="bg-white border-2 border-primary! text-primary! hover:bg-primary! hover:text-white!"
        icon={<img  src="/images/eye-icon.svg" alt="eye icon"/>}
        >
          معاينة الأسئلة
        </Button>
                <Form.Item className="flex justify-end">
          <Button
            className="!p-4 !px-12 mt-4"
            size="large"
            htmlType="submit"
            type="primary"
          >
            نشر
          </Button>
        </Form.Item>
          </Row>
      </Form>
    </>
  );
};

export default ConsultationForm;
