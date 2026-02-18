import { useApiQuery } from "@shared/services/api";
import { getConsultationStatus } from "@shared/services/sharedService";

export const useConsultationStatus = () => {
  const { data: consultationStatus, isLoading } = useApiQuery(
    ["consultationStatus"],
    getConsultationStatus,
    { retry: false },
  );

  return {
    consultationStatus,
    isLoading,
  };
};
