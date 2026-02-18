import { useApiQuery } from "@shared/services/api";
import { getServiceFields } from "@shared/services/sharedService";

export const useServiceFields = () => {
  const { data: fields, isLoading } = useApiQuery(
    ["serviceFields"],
    getServiceFields,
    { retry: false },
  );

  return {
    fields,
    isLoading,
  };
};
