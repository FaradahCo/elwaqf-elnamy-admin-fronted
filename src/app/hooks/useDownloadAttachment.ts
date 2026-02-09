import AoiService from "@shared/services/api";
import { useState } from "react";

export const useDownloadAttachment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDownloadAttachment = async (endpoint: string): Promise<void> => {
    try {
      setIsLoading(true);
      const blob = await AoiService.getBlob(endpoint);

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = blobUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // تنظيف الـ blob
      setTimeout(() => URL.revokeObjectURL(blobUrl), 200);
    } catch (error) {
      console.error("Download error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  return { handleDownloadAttachment, isLoading };
};
