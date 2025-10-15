import { Steps, Button, Form, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useState, useLayoutEffect } from "react";
import ServiceType from "../../components/serviceType/serviceType";
import MainInformation from "../../components/mainInformation/mainInformation";
import ServiceTime from "../../components/serviceTime/serviceTime";
import UserRequiremnts from "../../components/usageRequirments/userRequirements";
import Reviews from "../../components/reviews/reviews";
import type { ServiceFormData } from "../../servicesManagement.model";
import { useApiMutation, useApiQuery } from "@shared/services/api";
import { ServiceManagenetsService } from "../../servicesManagemts.service";
import { providerRoutePath } from "@/app/modules/provider/provider.routes";
import { useNavigate, useParams } from "react-router";
import type { ApiErrorResponse } from "@/app/modules/authentication/authentication.model";
import { setFormFieldErrors } from "@shared/services/sharedService";

const ServicesManagementForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ServiceFormData>({});
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { serviceId } = useParams();

  // Watch for form type changes
  const formType = Form.useWatch("type", form);

  // Get appropriate labels based on form type
  const getLabels = (type: string) => {
    return type === "package"
      ? {
          entity: "الباقة",
          entityPlural: "الباقات",
          entityGenitive: "الباقة",
          entityAccusative: "باقة",
        }
      : {
          entity: "الخدمة",
          entityPlural: "الخدمات",
          entityGenitive: "الخدمة",
          entityAccusative: "خدمة",
        };
  };

  const labels = getLabels(formType || formData.type || "service");

  // Get dynamic step titles based on current type
  const getStepTitles = () => {
    const entity = labels.entityGenitive;
    return [
      { title: "اختيار نوع الإضافة" },
      { title: "المعلومات الأساسية" },
      { title: `مدة ${entity} والمبلغ` },
      { title: "متطلبات الاستفادة" },
      { title: "المراجعة والإرسال" },
    ];
  };

  const handleStepData = (stepData: Partial<ServiceFormData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
  };

  const nextStep = async () => {
    if (currentStep < 4) {
      try {
        const values = await form.validateFields();
        handleStepData(values);
        setCurrentStep(currentStep + 1);
      } catch (error) {
        message.error("يرجى إكمال الحقول المطلوبة");
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const serviceMutation = useApiMutation(
    (payload: ServiceFormData) => {
      if (serviceId) {
        return ServiceManagenetsService.updateService(serviceId, payload);
      } else {
        return ServiceManagenetsService.createService(payload);
      }
    },
    {
      onSuccess: () => {
        form.resetFields();
        navigate(providerRoutePath.SERVICES_MANAGEMENT);
      },
      onError: (error: any) => {
        const errorResponse: ApiErrorResponse = error?.response?.data;
        setFormFieldErrors<ServiceFormData>(form, errorResponse);
      },
    }
  );

  const { data: serviceData } = useApiQuery(
    ["service", serviceId],
    () => ServiceManagenetsService.getServiceById(serviceId!),
    {
      enabled: !!serviceId,
      retry: false,
    }
  );

  useLayoutEffect(() => {
    if (serviceData) {
      // Ensure order property exists for existing items, add it if missing
      const ensureOrder = (items: any[] | undefined) => {
        if (!items) return [];
        return items.map((item, index) => ({
          ...item,
          order: item.order || index + 1,
        }));
      };

      const serviceDataUpdate: ServiceFormData = {
        type: serviceData.type,
        title: serviceData.title,
        field_id: serviceData.field?.id!,
        description: serviceData.description,
        outputs: ensureOrder(serviceData?.outputs),
        requirements: ensureOrder(serviceData?.requirements),
        scopes: ensureOrder(serviceData?.scopes),
        duration_type: serviceData?.duration?.type,
        duration_time: Number(serviceData?.duration?.time),
        min_price: Number(serviceData.min_price),
        response_time: Number(serviceData.response_time),
      };
      form.setFieldsValue(serviceDataUpdate);
      setFormData(serviceDataUpdate);
    }
  }, [serviceData]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const finalFormData: any = {
        ...formData,
        ...values,
        items: {
          requirement: formData.requirements || [],
          output: formData.outputs || [],
          scope: formData.scopes || [],
        },
      };

      //DELETED THIS PROPERTIES BECAUSE I ADDED IT ON items OBJECT
      delete finalFormData.requirements;
      delete finalFormData.outputs;
      delete finalFormData.scopes;

      serviceMutation.mutate(finalFormData);
    } catch (error) {
      message.error("يرجى إكمال الحقول المطلوبة");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <ServiceType form={form} />;
      case 1:
        return <MainInformation form={form} labels={labels} />;
      case 2:
        return <ServiceTime form={form} labels={labels} />;
      case 3:
        return <UserRequiremnts form={form} labels={labels} />;
      case 4:
        return (
          <Reviews
            formData={{ ...formData, ...form.getFieldsValue() }}
            labels={labels}
          />
        );
      default:
        return <ServiceType form={form} />;
    }
  };

  return (
    <div className="services-steps">
      <Steps
        responsive={true}
        type="navigation"
        current={currentStep}
        onChange={setCurrentStep}
        items={getStepTitles()}
      />

      <div className="mt-2 bg-white p-4 shadow-md rounded-2xl">
        {serviceId && !serviceData ? (
          <div className="flex justify-center items-center">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </div>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={currentStep === 4 ? handleSubmit : nextStep}
          >
            {renderStepContent()}

            <div className="flex justify-end mt-6 gap-4">
              <Button
                onClick={prevStep}
                disabled={currentStep === 0}
                size="large"
              >
                السابق
              </Button>

              <Button
                type="primary"
                onClick={currentStep === 4 ? handleSubmit : nextStep}
                size="large"
                loading={serviceMutation.isPending}
                disabled={serviceMutation.isPending}
              >
                {currentStep === 4 ? (serviceId ? "تحديث" : "إرسال") : "متابعة"}
              </Button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ServicesManagementForm;
