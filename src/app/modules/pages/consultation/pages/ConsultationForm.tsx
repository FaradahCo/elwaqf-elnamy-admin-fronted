import {
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Tooltip,
  Button,
  Spin,
} from "antd";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import {
  OptionType,
  type ConsulationFormPayload,
  type ConsulationQuestionsResponse,
} from "../model/consultationModel";
import { useApiMutation, useApiQuery } from "@shared/services/api";
import {
  createUpdateQuestions,
  deleteQuestion,
  getAllQuestions,
  transformFormValues,
} from "../consultationService";
import ConsultationPanelHeader from "../components/consultationPanelHeader/consultationPanelHeader";
import { useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
const ConsultationForm = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { data: questionsRes, isLoading } =
    useApiQuery<ConsulationQuestionsResponse>(["questions"], getAllQuestions);
  const deleteQuestionMuation = useApiMutation(
    (id?: number) => deleteQuestion({ status: false }, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["questions"] });
      },
    }
  );

  const initialValues = useMemo(
    () => ({
      questions: transformFormValues(questionsRes?.data),
    }),
    [questionsRes?.data]
  );
  const createUpdateQuestionsMutation = useApiMutation(createUpdateQuestions, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      form.setFieldsValue({
        questions: data,
      });
    },
  });

  const onChangeType = useCallback((value: string, index: number) => {
    const questions = [...form.getFieldValue("questions")];
    const updatedQuestion = { ...questions[index], type: value };
    if (value === OptionType.TEXT) updatedQuestion.options = [];
    questions[index] = updatedQuestion;
    form.setFieldValue("questions", questions);
  }, []);
  const onFinish = (values: ConsulationFormPayload) => {
    createUpdateQuestionsMutation.mutate(values);
  };
  const handleDeleteQuestion = (id?: number) => {
    if (!id) return;
    deleteQuestionMuation.mutate(id);
  };
  if (isLoading) {
    return <Spin />;
  }
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.List name="questions">
          {(fields, { add, remove }) => (
            <>
              <div className="mb-8 flex">
                <Button
                  size="large"
                  onClick={() =>
                    add({
                      text: "",
                      type: OptionType.SINGLE,
                      is_required: false,
                      has_other_option: false,
                      order: fields.length + 1,
                      options: [{ order: 1 }],
                      is_active: true,
                    })
                  }
                  className="bg-white border-2 py-6! border-primary! text-primary! hover:bg-primary! hover:text-white!"
                >
                  + إضافة سؤال جديد
                </Button>
              </div>

              {fields.map((field, index) => {
                const optionType = form.getFieldValue("questions")[index].type;
                return (
                  <div
                    key={field.key}
                    className="shadow-sm mb-8 border-gray-300 border-1 border-solid p-4 rounded-lg"
                  >
                    <ConsultationPanelHeader
                      index={index}
                      remove={remove}
                      field={field}
                      onDeleteQuestion={() =>
                        handleDeleteQuestion(questionsRes?.data[index]?.id)
                      }
                    />
                    <Form.Item name={[field.name, "order"]} hidden />
                    <Form.Item
                      name={[field.name, "text"]}
                      rules={[
                        {
                          required: true,
                          message: "يرجى ادخال السؤال",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        type="text"
                        placeholder="يرجى كتابة السؤال بصياغة مختصرة وسهلة الفهم للعميل"
                      />
                    </Form.Item>
                    <Row className="flex items-center" gutter={24}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          className="font-semibold!"
                          name={[field.name, "type"]}
                          label="نوع الاجابة"
                          rules={[
                            {
                              required: true,
                              message: "يرجى اختيار نوع الاجابة",
                            },
                          ]}
                        >
                          <Select
                            onChange={(value) => onChangeType(value, index)}
                            size="large"
                            placeholder="اختر نوع الاجابة"
                          >
                            <Select.Option value={OptionType.SINGLE}>
                              اجابة واحدة
                            </Select.Option>
                            <Select.Option value={OptionType.MULTIPLE}>
                              اختيار من متعدد
                            </Select.Option>
                            <Select.Option value={OptionType.TEXT}>
                              نص
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      {/* <Col xs={24} md={12}>
                        <Form.Item
                          name={[field.name, "is_required"]}
                          label=" "
                          valuePropName="checked"
                          getValueFromEvent={(checked) => !checked}
                          getValueProps={(value) => ({ checked: !value })}
                        >
                          <Checkbox>إمكانية تخطي هذا السؤال</Checkbox>
                        </Form.Item>
                      </Col> */}
                      <Col xs={24} md={12}>
                        <Form.Item shouldUpdate noStyle>
                          {() => {
                            const isRequired = form.getFieldValue([
                              "questions",
                              field.name,
                              "is_required",
                            ]);
                            return (
                              <div className="ant-form-item">
                                <div className="ant-form-item-label">
                                  <label> </label>
                                </div>
                                <div className="ant-form-item-control">
                                  <Checkbox
                                    checked={!isRequired}
                                    onChange={(e) => {
                                      form.setFieldValue(
                                        [
                                          "questions",
                                          field.name,
                                          "is_required",
                                        ],
                                        !e.target.checked
                                      );
                                    }}
                                  >
                                    إمكانية تخطي هذا السؤال
                                  </Checkbox>
                                </div>
                              </div>
                            );
                          }}
                        </Form.Item>
                      </Col>
                    </Row>
                    {(optionType === OptionType.SINGLE ||
                      optionType === OptionType.MULTIPLE) && (
                      <div className="mt-4">
                        <h2 className="text-start text-base font-semibold my-4">
                          الاجابة
                        </h2>

                        <Form.List name={[field.name, "options"]}>
                          {(subFields, subOpt) => (
                            <>
                              {subFields.map((subField) => (
                                <div
                                  key={subField.key}
                                  className="flex justify-between"
                                >
                                  <Form.Item
                                    name={[subField.name, "option_text"]}
                                    label=""
                                    className="mb-2! flex-1"
                                    rules={[
                                      {
                                        required: true,
                                        message: "يرجى إضافة اجابة",
                                      },
                                    ]}
                                  >
                                    <Input
                                      type="text"
                                      size="large"
                                      placeholder="اضافة خيار اخر"
                                    />
                                  </Form.Item>
                                  <Tooltip placement="right" title="حذف">
                                    <Button
                                      className="rounded-full! bg-transparent! border-0!"
                                      onClick={() =>
                                        subOpt.remove(subField.name)
                                      }
                                      icon={
                                        <img
                                          src="/images/delete-icon-2.svg"
                                          alt="delete icon"
                                        />
                                      }
                                    />
                                  </Tooltip>
                                </div>
                              ))}

                              <Button
                                onClick={() =>
                                  subOpt.add({ order: subFields.length + 1 })
                                }
                                size="large"
                                className="bg-white border-2 py-4! border-primary! text-primary! hover:bg-primary! hover:text-white!"
                                icon={<PlusOutlined />}
                              >
                                إضافة خيار اخر
                              </Button>
                            </>
                          )}
                        </Form.List>

                        <Form.Item
                          name={[field.name, "has_other_option"]}
                          className="mb-0 mt-4!"
                          valuePropName="checked"
                        >
                          <Checkbox className="text-sm text-gray-700">
                            السماح بخيار "أخرى"
                          </Checkbox>
                        </Form.Item>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </Form.List>
        <Row className="justify-between items-center">
          <Button
            className="bg-white border-2 py-6! border-primary! text-primary! hover:bg-primary! hover:text-white!"
            icon={<EyeOutlined />}
          >
            معاينة الأسئلة
          </Button>
          <Button
            className="!p-6 !px-12"
            size="large"
            htmlType="submit"
            type="primary"
            disabled={createUpdateQuestionsMutation.isPending}
          >
            نشر
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default ConsultationForm;
