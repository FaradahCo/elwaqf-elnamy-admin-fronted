import type { RootState } from "@/app/store";
import {
  ServiceClassification,
  type PaginatedResponse,
} from "@shared/model/shared.model";
import { useApiQuery } from "@shared/services/api";
import {
  ServiceClassificationConfig,
  convertEnumToArrayList,
} from "@shared/services/sharedService";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import enUS from "antd/es/date-picker/locale/en_US";
import dayjs from "dayjs";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type {
  ServiceData,
  ServiceManagementQuery,
} from "../../../serviceManagement/model/serviceProviderList";
import { getServices } from "../../../serviceManagement/serviceManagementService";
import type { DiscoundCodeItem } from "../../model/discoundCodesModel";

const codeStatusOptions = [
  { value: "active", label: "مفعل" },
  { value: "inactive", label: "غير مفعل" },
  { value: "scheduled", label: "مجدول" },
  { value: "canceled", label: "ملغي" },
  { value: "testing", label: "تجريبي" },
];

interface DiscoundCodesFormProps {
  onSubmit: (values: DiscoundCodeItem) => void;
  onCancel: () => void;
  loading?: boolean;
  onReset?: () => void;
}

const DiscoundCodesForm = ({
  onSubmit,
  onCancel,
  loading = false,
}: DiscoundCodesFormProps) => {
  const editingItem = useSelector(
    (state: RootState) => state.discountCodes.editingItem
  );

  const [form] = Form.useForm();

  const { Option } = Select;
  const [filter, setFilter] = useState<ServiceManagementQuery>({
    type: editingItem?.type || "service",
  });

  const handleSubmit = useCallback(
    (values: DiscoundCodeItem) => {
      // Filter out "select-all" and "clear-all" from service_ids if present
      const filteredServiceIds = Array.isArray(values.service_ids)
        ? values.service_ids.filter((id) => {
            if (typeof id === "string") {
              return id !== "select-all" && id !== "clear-all";
            }
            return true;
          })
        : values.service_ids;

      // Format dates to YYYY-MM-DD for backend
      const formattedValues = {
        ...values,
        service_ids: filteredServiceIds,
        expires_at: values.expires_at
          ? dayjs(values.expires_at).format("YYYY-MM-DD")
          : undefined,
        start_at: values.start_at
          ? dayjs(values.start_at).format("YYYY-MM-DD")
          : undefined,
      };

      onSubmit(formattedValues);
    },
    [onSubmit]
  );

  const { data: serviceData } = useApiQuery<PaginatedResponse<ServiceData>>(
    ["admin/services", filter],
    () => getServices(filter),
    {
      retry: false,
    }
  );

  // Format initial values to handle date fields properly
  const formatInitialValues = (item: DiscoundCodeItem | null) => {
    if (!item) return undefined;

    return {
      ...item,
      percentage: item.percentage ? Number(item.percentage) : undefined,
      expires_at: item.expires_at ? dayjs(item.expires_at) : undefined,
      start_at: item.start_at ? dayjs(item.start_at) : undefined,
    };
  };

  const handleServiceIdsChange = useCallback(
    (selectedValues: (string | number)[]) => {
      const values = selectedValues as (string | number)[];
      if (values.includes("select-all")) {
        const allServiceIds =
          serviceData?.data
            .map((service) => service.id)
            .filter((id): id is string => !!id) || [];
        form.setFieldValue("service_ids", allServiceIds);
      } else if (values.includes("clear-all")) {
        form.setFieldValue("service_ids", []);
      }
    },
    [form, serviceData]
  );
  // Update form values when editingItem changes
  useEffect(() => {
    if (editingItem) {
      // Set form values for edit mode
      const formattedValues = formatInitialValues(editingItem);
      form.setFieldsValue(formattedValues);
    } else {
      // Reset form for create mode
      form.resetFields();
    }
  }, [editingItem, form]);

  return (
    <>
      <main className="flex flex-col items-center justify-center gap-3">
        <img src="/images/coupon-01 (1).svg" alt="discound-code-form" />
        <p className="text-xl font-bold text-second-primary">
          {editingItem ? "تعديل" : "إضافة"} كود خصم
        </p>
        <span className="text-gray-text text-center mb-4">
          قم {editingItem ? "بتعديل" : "بإضافة"} كود خصم جديد لتفعيله في المنصة،
          مع تحديد نوع الخصم ومدّته وقيمته
        </span>
      </main>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="p-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item<DiscoundCodeItem>
            name="code"
            label="الكود"
            rules={[
              { required: true, message: "يرجى إدخال الكود" },
              { min: 3, message: "الكود يجب أن يكون 3 أحرف على الأقل" },
            ]}
          >
            <Input placeholder="أدخل الكود" size="large" />
          </Form.Item>

          <Form.Item<DiscoundCodeItem>
            name="percentage"
            label="نسبة الخصم"
            rules={[
              { required: true, message: "يرجى إدخال نسبة الخصم" },
              {
                type: "number",
                min: 0,
                max: 100,
                message: "النسبة يجب أن تكون بين 0 و 100",
              },
            ]}
          >
            <InputNumber
              placeholder="أدخل نسبة الخصم"
              className="w-full!"
              min={0}
              max={100}
              addonAfter="%"
              size="large"
            />
          </Form.Item>

          <Form.Item<DiscoundCodeItem> name="type" label="نوع الكود">
            <Select
              placeholder="اختر نوع الكود"
              size="large"
              allowClear
              onChange={(value) => setFilter({ ...filter, type: value })}
            >
              {convertEnumToArrayList(ServiceClassification).map((option) => (
                <Option key={option.value} value={option.value}>
                  {ServiceClassificationConfig[option.value].label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="حالة الكود"
            rules={[{ required: true, message: "يرجى اختيار حالة الكود" }]}
          >
            <Select
              placeholder="اختر حالة الكود"
              options={codeStatusOptions}
              size="large"
            />
          </Form.Item>

          <Form.Item<DiscoundCodeItem>
            name="service_ids"
            label={filter.type === "service" ? "اسم الخدمة" : "اسم الباقة"}
            rules={[{ required: true, message: "يرجى إدخال اسم الخدمة" }]}
          >
            <Select
              placeholder={
                filter.type === "service" ? "اختر الخدمة" : "اختر الباقة"
              }
              size="large"
              mode="multiple"
              onChange={handleServiceIdsChange}
              maxTagCount={3}
              maxTagPlaceholder={(omittedValues) =>
                `+ ${omittedValues.length} أخرى`
              }
            >
              <Select.Option key="select-all" value="select-all">
                🔘 جميع الخدمات
              </Select.Option>

              <Select.Option key="clear-all" value="clear-all">
                ✗ إلغاء الكل
              </Select.Option>
              {serviceData?.data.map((service) => (
                <Option key={service.id} value={service.id}>
                  {service.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<DiscoundCodeItem>
            name="start_at"
            label="تاريخ بداية الكود"
            rules={[{ required: true, message: "يرجى اختيار تاريخ البداية" }]}
          >
            <DatePicker
              placeholder="اختر تاريخ البداية"
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              size="large"
              locale={enUS}
            />
          </Form.Item>

          <Form.Item<DiscoundCodeItem>
            name="expires_at"
            label="تاريخ نهاية الكود"
            rules={[{ required: true, message: "يرجى اختيار تاريخ النهاية" }]}
          >
            <DatePicker
              placeholder="اختر تاريخ النهاية"
              format="YYYY-MM-DD"
              size="large"
              className="w-full!"
              locale={enUS}
              disabledDate={(current) => {
                // Disable dates before today
                return current && current < dayjs().startOf("day");
              }}
            />
          </Form.Item>

          <Form.Item<DiscoundCodeItem>
            name="remaining_uses"
            label="عدد مرات الاستخدام"
            rules={[
              { required: true, message: "يرجى إدخال عدد مرات الاستخدام" },
              {
                type: "number",
                min: 1,
                message: "يجب أن يكون العدد أكبر من 0",
              },
            ]}
            // className="md:col-span-2"
          >
            <InputNumber
              placeholder="أدخل عدد مرات الاستخدام"
              min={1}
              size="large"
              className="w-full!"
            />
          </Form.Item>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onCancel} disabled={loading} loading={loading}>
            إلغاء
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            حفظ
          </Button>
        </div>
      </Form>
    </>
  );
};

export default memo(DiscoundCodesForm);
