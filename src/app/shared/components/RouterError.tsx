import { Button, Result } from "antd";
import { useEffect } from "react";
import { useRouteError } from "react-router";

const RouterError = () => {
  const error = useRouteError() as Error;

  // Check if it's a chunk loading error
  const chunkFailedMessage = /Loading chunk [\d]+ failed/;
  const isChunkError =
    error?.message?.includes("Failed to fetch dynamically imported module") ||
    error?.message?.includes("Loading chunk") ||
    error?.message?.includes("Failed to fetch") ||
    chunkFailedMessage.test(error?.message || "");

  // Auto-reload on chunk errors (better performance - only route fails, not entire app)
  if (isChunkError) {
    const hasReloaded = sessionStorage.getItem("chunk-error-reload");
    if (!hasReloaded) {
      console.log("Chunk loading error detected, reloading page...");
      sessionStorage.setItem("chunk-error-reload", "true");
      window.location.reload();
    } else {
      console.error("Chunk loading error persists after reload");
      sessionStorage.removeItem("chunk-error-reload");
    }
  }

  // Clear reload flag for non-chunk errors (means app loaded successfully)
  useEffect(() => {
    if (!isChunkError) {
      sessionStorage.removeItem("chunk-error-reload");
    }
  }, [isChunkError]);

  const handleReload = () => {
    window.location.reload();
  };

  if (isChunkError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Result
          status="info"
          title="جاري تحديث التطبيق..."
          subTitle="يتم تحميل أحدث إصدار. الرجاء الانتظار لحظة."
        />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Result
        status="error"
        title="عذراً، حدث خطأ"
        subTitle={error?.message || "حدث خطأ غير متوقع"}
        extra={
          <Button type="primary" onClick={handleReload}>
            إعادة تحميل الصفحة
          </Button>
        }
      />
    </div>
  );
};

export default RouterError;
