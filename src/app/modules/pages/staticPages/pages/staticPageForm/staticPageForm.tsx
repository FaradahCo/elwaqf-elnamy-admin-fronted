import React, { useCallback, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Radio,
  Button,
  Card,
  Row,
  Col,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { useApiQuery, useApiMutation } from "@shared/services/api";
import { useQueryClient } from "@tanstack/react-query";
import {
  getStaticPage,
  createStaticPage,
  updateStaticPage,
} from "../../staticPagesService";
import type { StaticPageItem } from "../../model/staticPagesModel";
import { staticPagesRoutePath } from "../../staticPagesRoutes";

const { TextArea } = Input;

const statusOptions = [
  { value: "active", label: "نشط" },
  { value: "inactive", label: "غير نشط" },
  { value: "draft", label: "مسودة" },
];

const userTypeOptions = [
  { value: "provider", label: "مزود خدمة" },
  { value: "waqf", label: "وقف" },
  { value: "both", label: "كلاهما" },
];

const StaticPageForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const queryClient = useQueryClient();
  const isEditMode = !!id;

  const { data: staticPage, isLoading } = useApiQuery<StaticPageItem>(
    ["static-page", id],
    () => getStaticPage(id!),
    {
      enabled: isEditMode,
      retry: false,
    }
  );

  const createMutation = useApiMutation<StaticPageItem, StaticPageItem>(
    (data: StaticPageItem) => createStaticPage(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["static-pages"] });
        navigate(staticPagesRoutePath.STATIC_PAGES_LIST);
      },
    }
  );

  const updateMutation = useApiMutation<StaticPageItem, StaticPageItem>(
    (data: StaticPageItem) =>
      updateStaticPage(Number(id), data).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["static-pages"] });
        navigate(staticPagesRoutePath.STATIC_PAGES_LIST);
      },
    }
  );

  useEffect(() => {
    if (staticPage && isEditMode) {
      form.setFieldsValue({
        title: staticPage.title,
        slug: staticPage.slug,
        content: staticPage.content,
        status: staticPage.status,
        show_in_registration: staticPage.show_in_registration,
        show_in_footer: staticPage.show_in_footer,
        show_in_menu: staticPage.show_in_menu,
        user_type: staticPage.user_type || "both",
      });
    }
  }, [staticPage, isEditMode, form]);

  const handleSubmit = useCallback(
    (values: any) => {
      const payload: StaticPageItem = {
        ...values,
        id: isEditMode ? Number(id) : undefined,
      };

      if (isEditMode) {
        updateMutation.mutate(payload);
      } else {
        createMutation.mutate(payload);
      }
    },
    [isEditMode, id, createMutation, updateMutation]
  );

  const handlePreview = useCallback(() => {
    const values = form.getFieldsValue();
    // TODO: Implement preview functionality
    console.log("Preview page:", values);
  }, [form]);

  if (isLoading && isEditMode) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-10">
      <Card>
        <div>
          <h1 className="text-xl font-bold text-second-primary">
            {isEditMode ? "تعديل الصفحة" : "صفحة جديدة"}
          </h1>
          <p className="w-16 h-1 bg-primary mt-2 rounded mb-10"></p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            user_type: "both",
            show_in_registration: false,
            show_in_footer: false,
            show_in_menu: false,
            status: "draft",
          }}
        >
          {/* First Row: Title and Slug */}
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="title"
                label="عنوان الصفحة"
                rules={[{ required: true, message: "يرجى إدخال عنوان الصفحة" }]}
              >
                <Input placeholder="أدخل عنوان الصفحة" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="slug"
                label="رابط الصفحة"
                rules={[{ required: true, message: "يرجى إدخال رابط الصفحة" }]}
              >
                <Input placeholder="أدخل رابط الصفحة" size="large" />
              </Form.Item>
            </Col>
          </Row>

          {/* Second Row: Checkboxes and Radio */}
          <Row gutter={16}>
            <Col xs={24} md={6}>
              <Form.Item name="show_in_registration" valuePropName="checked">
                <Checkbox>عرض في صفحة التسجيل</Checkbox>
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item name="show_in_footer" valuePropName="checked">
                <Checkbox>عرض في تذييل الصفحة</Checkbox>
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item name="show_in_menu" valuePropName="checked">
                <Checkbox>عرض في قائمة الصفحة</Checkbox>
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                name="user_type"
                label="نوع المستخدم"
                rules={[
                  { required: true, message: "يرجى اختيار نوع المستخدم" },
                ]}
              >
                <Radio.Group options={userTypeOptions} />
              </Form.Item>
            </Col>
          </Row>

          {/* Status Dropdown */}
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="status"
                label="الحالة"
                rules={[{ required: true, message: "يرجى اختيار الحالة" }]}
              >
                <Select
                  placeholder="اختر الحالة"
                  size="large"
                  options={statusOptions}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Markdown Content */}
          <Form.Item
            name="content"
            label="محتوى الصفحة (Markdown)"
            rules={[{ required: true, message: "يرجى إدخال محتوى الصفحة" }]}
          >
            <TextArea
              rows={12}
              placeholder="أدخل محتوى الصفحة بصيغة Markdown..."
              size="large"
            />
          </Form.Item>

          {/* Action Buttons */}
          <Form.Item>
            <div className="flex gap-4 justify-end">
              <Button
                type="default"
                icon={<EyeOutlined />}
                size="large"
                onClick={handlePreview}
              >
                معاينة الصفحة
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={createMutation.isPending || updateMutation.isPending}
              >
                نشر
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default StaticPageForm;
