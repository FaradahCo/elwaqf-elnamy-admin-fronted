import { EyeOutlined } from "@ant-design/icons";
import RichTextEditor from "@shared/components/richTextEditor/richTextEditor";
import { useApiMutation, useApiQuery } from "@shared/services/api";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Spin,
} from "antd";
import React, { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import type { StaticPageItem } from "../../model/staticPagesModel";
import { staticPagesRoutePath } from "../../staticPagesRoutes";
import {
  createStaticPage,
  getStaticPageById,
  updateStaticPage,
} from "../../staticPagesService";

const StaticPageForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const queryClient = useQueryClient();

  const { data: staticPage, isLoading } = useApiQuery<StaticPageItem>(
    ["static-page", id],
    () => getStaticPageById(+id!),
    {
      enabled: !!id,
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
    (data: StaticPageItem) => updateStaticPage(Number(id!), data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["static-pages"] });
        navigate(staticPagesRoutePath.STATIC_PAGES_LIST);
      },
    }
  );

  const handleSubmit = useCallback(
    (values: any) => {
      const payload: StaticPageItem = {
        ...values,
      };

      if (!!id) {
        updateMutation.mutate(payload);
      } else {
        createMutation.mutate(payload);
      }
    },
    [id, createMutation, updateMutation]
  );

  const handlePreview = useCallback(() => {
    // TODO: Implement preview functionality
  }, []);

  // Compute initial values from staticPage data
  const initialValues = useMemo(() => {
    if (staticPage && !!id) {
      return {
        title: staticPage.title,
        slug: staticPage.slug,
        content: staticPage.content,
        is_published:
          staticPage.status === "active" || staticPage.status === "published",
        show_in_registration: staticPage.show_in_registration,
        show_in_footer: staticPage.show_in_footer,
        show_in_menu: staticPage.show_in_menu,
        scope: staticPage.scope || "both",
      };
    }
    return {
      scope: "both",
      show_in_registration: false,
      show_in_footer: false,
      show_in_menu: false,
      is_published: false,
    };
  }, [staticPage, id]);

  if (isLoading && !!id) {
    return (
      <div className="flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="py-10">
      <Card>
        <div>
          <h1 className="text-xl font-bold text-second-primary">
            {!!id ? "تعديل الصفحة" : "صفحة جديدة"}
          </h1>
          <p className="w-16 h-1 bg-primary mt-2 rounded mb-10"></p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={initialValues}
          key={staticPage?.id || "new"}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            <Form.Item name="show_in_registration" valuePropName="checked">
              <Checkbox>عرض في صفحة التسجيل</Checkbox>
            </Form.Item>

            <Form.Item name="show_in_footer" valuePropName="checked">
              <Checkbox>عرض في تذييل الصفحة</Checkbox>
            </Form.Item>

            <Form.Item name="show_in_menu" valuePropName="checked">
              <Checkbox>عرض في قائمة الصفحة</Checkbox>
            </Form.Item>

            <Form.Item
              name="scope"
              label="نوع المستخدم"
              rules={[{ required: true, message: "يرجى اختيار نوع المستخدم" }]}
            >
              <Radio.Group size="large" className="main-radio">
                <Radio.Button value="both">كلاهما</Radio.Button>
                <Radio.Button value="client">عميل</Radio.Button>
                <Radio.Button value="provider">مزود خدمة</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="is_published" valuePropName="checked">
              <Checkbox>نشر الصفحة</Checkbox>
            </Form.Item>
          </div>

          {/* Rich Text Content */}
          <Form.Item
            name="content"
            label="محتوى الصفحة"
            rules={[{ required: true, message: "يرجى إدخال محتوى الصفحة" }]}
          >
            <RichTextEditor placeholder="أدخل محتوى الصفحة..." />
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
