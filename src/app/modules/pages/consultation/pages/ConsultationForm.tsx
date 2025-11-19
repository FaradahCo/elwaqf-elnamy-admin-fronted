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
import CustomList from "@shared/components/customList/CustomList";
import { useState } from "react";
import type { ConsulationFormPayload, Option } from "../model/consultationModel";

const ConsultationForm = () => {
  const [form] = useForm();
  const [optionsData, setOptionsData] = useState<Record<number, Option[]>>({
    0: [{ id: Date.now(), title: "", order: 1 }],
  });
  const handleAddOption = (questionIndex: number) => {
    const currentOptions = optionsData[questionIndex] || [];
    const newOption = {
      id: Date.now(),
      title: "",
      order: currentOptions.length + 1,
    };
    setOptionsData({
      ...optionsData,
      [questionIndex]: [...currentOptions, newOption],
    });
  };

  const handleDeleteOption = (questionIndex: number, optionIndex: number) => {
    const currentOptions = optionsData[questionIndex] || [];
    const updatedOptions = currentOptions.filter(
      (_, idx) => idx !== optionIndex
    );
    setOptionsData({
      ...optionsData,
      [questionIndex]: updatedOptions,
    });
  };

  const handleReorderOptions = (questionIndex: number, newOrder: Option[]) => {
    setOptionsData({
      ...optionsData,
      [questionIndex]: newOrder,
    });
    newOrder.forEach((opt, idx) => {
      form.setFieldValue(
        ["questions", questionIndex, "options", idx, "title"],
        opt.title
      );
    });
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const currentOptions = [...(optionsData[questionIndex] || [])];
    currentOptions[optionIndex] = {
      ...currentOptions[optionIndex],
      title: value,
    };
    setOptionsData({
      ...optionsData,
      [questionIndex]: currentOptions,
    });
  };

  const onFinish = (values: ConsulationFormPayload) => {
    console.log(values);
  };
  return (
    <div>
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
                  type="default"
                  onClick={() => {
                    const newIndex = fields.length;
                    add();
                    setOptionsData({
                      ...optionsData,
                      [newIndex]: [{ id: Date.now(), title: "", order: 1 }],
                    });
                  }}
                  className="border-primary border !py-6"
                >
                  + اضافة سؤال اخر
                </Button>
              </div>

              {fields.map((field, index) => (
                <Collapse
                  key={field.key}
                  expandIconPosition="end"
                  bordered={false}
                  className="border! border-[#D2D2D2]! mb-4"
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
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="flex items-center gap-3">
                          <span className="text-base font-medium">
                            سؤال {index + 1}
                          </span>
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-semibold">
                            {index + 1}
                          </span>
                        </h3>
                        <div className="flex items-center gap-2">
                          <Tooltip placement="right" title="حذف">
                            <Button
                              onClick={() => {
                                remove(field.name);
                                const newOptionsData = { ...optionsData };
                                delete newOptionsData[field.name];
                                setOptionsData(newOptionsData);
                              }}
                              disabled={index === 0}
                              className="rounded-full!"
                              icon={
                                <img
                                  src="/images/delete-icon.svg"
                                  alt="delete icon"
                                />
                              }
                            />
                          </Tooltip>
                        </div>
                      </div>
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
                      <Input placeholder="يرجى كتابة السؤال بصياغة مختصرة وسهلة الفهم للعميل" />
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
                          <Select placeholder="اختيار من متعدد">
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
                      <h2 className="text-start text-base font-semibold mb-3">
                        الاجابة
                      </h2>

                      <div className="space-y-2 mb-3">
                        <CustomList
                          dataSource={optionsData[field.name] || []}
                          enableDragDrop={true}
                          onReorder={(newOrder) =>
                            handleReorderOptions(field.name, newOrder)
                          }
                          onDelete={(optionIndex) =>
                            handleDeleteOption(field.name, optionIndex)
                          }
                          editingIndex={null}
                          title=""
                          showDefaultActions={false}
                          containerClassName="bg-transparent p-0"
                          itemClassName="bg-gray-50 rounded-md border border-gray-200 hover:border-blue-300 transition-colors p-2 mb-2"
                          renderItem={(item, itemIndex) => (
                            <div className="flex items-center gap-2 w-full">
                              <div className="flex-1">
                                <Form.Item
                                  className="!mb-0"
                                  name={[
                                    field.name,
                                    "options",
                                    itemIndex,
                                    "title",
                                  ]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "يرجى ادخال الاجابة",
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder={`الإجابة رقم ${itemIndex + 1}`}
                                    value={item.title}
                                    onChange={(e) =>
                                      handleOptionChange(
                                        field.name,
                                        itemIndex,
                                        e.target.value
                                      )
                                    }
                                    bordered={false}
                                    className="text-right"
                                  />
                                </Form.Item>
                              </div>
                              <Button
                                type="text"
                                danger
                                size="small"
                                onClick={() =>
                                  handleDeleteOption(field.name, itemIndex)
                                }
                                icon={
                                  <img
                                    src="/images/delete-icon-2.svg"
                                    alt="delete icon"
                                  />
                                }
                                className="flex-shrink-0"
                              />
                            </div>
                          )}
                        />
                      </div>

                      <Button
                        type="default"
                        onClick={() => handleAddOption(field.name)}
                        className="border-[#1FC16B] text-[#1FC16B] hover:border-[#1FC16B] hover:text-[#1FC16B] mb-3"
                        icon={<PlusOutlined />}
                      >
                        إضافة خيار آخر
                      </Button>
                      <Form.Item
                        name={[field.name, "allowOther"]}
                        className="mb-0"
                        valuePropName="checked"
                      >
                        <Checkbox className="text-sm text-gray-700">
                          السماح بخيار “أخرى”
                        </Checkbox>
                      </Form.Item>
                    </div>
                  </Collapse.Panel>
                </Collapse>
              ))}
            </>
          )}
        </Form.List>

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
      </Form>
    </div>
  );
};

export default ConsultationForm;
