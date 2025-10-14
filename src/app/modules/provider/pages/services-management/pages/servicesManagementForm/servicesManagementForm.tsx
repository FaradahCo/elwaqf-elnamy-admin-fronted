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
        message.success(
          serviceId ? "تم تحديث الخدمة بنجاح" : "تم إنشاء الخدمة بنجاح"
        );
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
      console.log("serviceData", serviceData);
      const serviceDataUpdate: ServiceFormData = {
        type: serviceData.type,
        title: serviceData.title,
        field_id: serviceData.field?.id!,
        description: serviceData.description,
        outputs: serviceData?.outputs || [],
        requirements: serviceData?.requirements || [],
        scopes: serviceData?.scopes || [],
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
        return <ServiceType />;
      case 1:
        return <MainInformation form={form} />;
      case 2:
        return <ServiceTime />;
      case 3:
        return <UserRequiremnts form={form} />;
      case 4:
        return <Reviews />;
      default:
        return <ServiceType />;
    }
  };

  return (
    <div className="services-steps">
      <Steps
        responsive={true}
        type="navigation"
        current={currentStep}
        onChange={setCurrentStep}
        items={[
          {
            title: "اختيار نوع الإضافة",
          },
          {
            title: "المعلومات الأساسية",
          },
          {
            title: "مدة الخدمة والمبلغ",
          },
          {
            title: "متطلبات الاستفادة",
          },
          {
            title: "المراجعة والإرسال",
          },
        ]}
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
