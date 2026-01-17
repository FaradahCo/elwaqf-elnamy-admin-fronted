import React from "react";
import { Button, Result } from "antd";

const ErrorFallback: React.FC = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Result
        status="error"
        title="عذراً، حدث خطأ غير متوقع"
        subTitle="نعمل على حل المشكلة. الرجاء المحاولة مرة أخرى."
        extra={
          <Button type="primary" onClick={handleReload}>
            إعادة تحميل الصفحة
          </Button>
        }
      />
    </div>
  );
};

export default ErrorFallback;
