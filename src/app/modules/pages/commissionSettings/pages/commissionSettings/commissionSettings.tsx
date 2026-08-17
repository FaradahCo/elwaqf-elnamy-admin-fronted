import { useApiMutation, useApiQuery } from "@shared/services/api";
import CustomTable from "@shared/components/customTable/customtable";
import { useQueryClient } from "@tanstack/react-query";
import { Alert, Button, Card, Form, InputNumber, Spin } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useCallback, useMemo } from "react";
import type {
  CommissionSettings,
  CommissionSettingsPayload,
} from "../../model/commissionSettingsModel";
import {
  getCommissionSettings,
  getCommissionSettingsLogs,
  updateCommissionSettings,
} from "../../commissionSettingsService";
import { commissionSettingsLogsColumns } from "./commissionSettingsConfig";

const CommissionSettingsPage = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { data: settings, isLoading: isSettingsLoading } = useApiQuery(
    ["commission-settings"],
    getCommissionSettings,
    { retry: false },
  );

  const { data: logs = [], isLoading: isLogsLoading } = useApiQuery(
    ["commission-settings-logs"],
    getCommissionSettingsLogs,
    { retry: false },
  );

  const updateMutation = useApiMutation<CommissionSettingsPayload, unknown>(
    updateCommissionSettings,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["commission-settings"],
        });

        queryClient.invalidateQueries({
          queryKey: ["commission-settings-logs"],
        });
      },
    },
  );

  const initialValues = useMemo(() => {
    if (!settings) return undefined;

    return {
      main_commission_rate: settings.main_commission_rate,
      offering_provider_commission_rate:
        settings.offering_provider_commission_rate,
    };
  }, [settings]);

  const handleSubmit = useCallback(
    (
      values: Pick<
        CommissionSettings,
        "main_commission_rate" | "offering_provider_commission_rate"
      >,
    ) => {
      const payload: CommissionSettingsPayload = {
        main_commission_rate: values.main_commission_rate,
        offering_provider_commission_rate:
          values.offering_provider_commission_rate,
        subcontractor_commission_rate:
          settings?.subcontractor_commission_rate ?? 0,
      };

      updateMutation.mutate(payload);
    },
    [settings?.subcontractor_commission_rate, updateMutation],
  );

  if (isSettingsLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Page Title */}
      <div  >
        <h1 className="m-0 text-2xl font-bold text-primary">
          إعدادات نسبة العمولة المزدوجة
        </h1>
        <div className="w-16 h-1 bg-second-primary mt-2 rounded"></div>

      </div>

      {/* Commission Settings */}
      <Card className="!rounded-none !border-[#E5E7EB] !shadow-none">
        {/* Info Alert */}
        <Alert
          type="info"
          showIcon
          icon={<InfoCircleOutlined />}
          message="التغييرات تنطبق على العقود الجديدة فقط - العقود الحالية لا تتأثر"
          className="mb-5! !rounded-none !border-0 !border-r-4 !border-r-[#4D9AFF] !bg-[#F0F6FF] "
        />

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={initialValues}
          key={settings ? "loaded" : "loading"}
        >
          {/* First Commission */}
          <Form.Item
            name="main_commission_rate"
            label={
              <span className="text-sm font-medium text-[#1F2937]">
                نسبة العمولة للمزود الأول (العارض)
              </span>
            }
            className="!mb-5"
            rules={[
              {
                required: true,
                message: "يرجى إدخال نسبة العمولة",
              },
              {
                type: "number",
                min: 0,
                max: 100,
                message: "النسبة يجب أن تكون بين 0 و 100",
              },
            ]}
          >
            <InputNumber
              className="!h-11 !w-full"
              size="large"
              min={0}
              max={100}
              step={0.1}
              suffix="%"
            />
          </Form.Item>

          <p className="mb-6 mt-[-12px] text-xs text-[#6B7280]">
            النسبة الافتراضية المطبقة على المزود الأول الذي يقدم نفس العرض
          </p>

          {/* Second Commission */}
          <Form.Item
            name="offering_provider_commission_rate"
            label={
              <span className="text-sm font-medium text-[#1F2937]">
                نسبة العمولة للمزود الثاني (المستشار)
              </span>
            }
            className="!mb-5"
            rules={[
              {
                required: true,
                message: "يرجى إدخال نسبة العمولة",
              },
              {
                type: "number",
                min: 0,
                max: 100,
                message: "النسبة يجب أن تكون بين 0 و 100",
              },
            ]}
          >
            <InputNumber
              className="!h-11 !w-full"
              size="large"
              min={0}
              max={100}
              step={0.1}
              suffix="%"
            />
          </Form.Item>

          <p className="mb-7 mt-[-12px] text-xs text-[#6B7280]">
            النسبة الثانوية المطبقة على المزود الثاني الذي يقدم العرض
          </p>

          {/* Save Button */}
          <Form.Item className="!mb-0">
            <div className="flex justify-end">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={updateMutation.isPending}
                disabled={updateMutation.isPending}
                className=" !rounded-none !border-0 !bg-brand !px-8 !text-sm !font-medium"
              >
                حفظ التغييرات
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>

      {/* Logs */}
      <Card
        
        className="mt-5 !rounded-none !border-[#E5E7EB] !shadow-none"
      >
        <h2 className="mb-5 text-lg font-bold text-primary">
          سجل تحديثات العمولة
        </h2>

        <CustomTable
          showSelection={false}
          showPagination={false}
          loading={isLogsLoading}
          dataSource={logs}
          columns={commissionSettingsLogsColumns}
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default CommissionSettingsPage;
