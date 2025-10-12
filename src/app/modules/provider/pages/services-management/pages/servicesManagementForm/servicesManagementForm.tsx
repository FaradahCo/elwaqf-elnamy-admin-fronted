import { Steps, Button } from "antd";
import { useState } from "react";
import ServiceType from "../../components/serviceType/serviceType";
import MainInformation from "../../components/mainInformation/mainInformation";
import ServiceTime from "../../components/serviceTime/serviceTime";
import UserRequiremnts from "../../components/usageRequirments/userRequirements";
import Reviews from "../../components/reviews/reviews";

const ServicesManagementForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  console.log(currentStep);

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <ServiceType />;
      case 1:
        return <MainInformation />;
      case 2:
        return <ServiceTime />;
      case 3:
        return <UserRequiremnts />;
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
        {renderStepContent()}

        <div className="flex justify-end mt-6 gap-4">
          <Button onClick={prevStep} disabled={currentStep === 0} size="large">
            السابق
          </Button>

          <Button type="primary" onClick={nextStep} size="large">
            {currentStep === 4 ? "إرسال" : "متابعة"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesManagementForm;
