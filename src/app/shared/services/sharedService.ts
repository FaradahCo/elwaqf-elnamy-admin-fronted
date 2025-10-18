import { ServiceStatus } from "@/app/modules/pages/serviceManagement/model/serviceProviderList";

export const durationNameConfig = {
  day: "يوم",
  month: "شهر",
  year: "سنة",
} as const;

export type DurationName = keyof typeof durationNameConfig;

export const handleFormErrors = <T = any>(
  errorResponse: any
): Array<{
  name: keyof T;
  errors: string[];
}> => {
  if (
    !errorResponse ||
    !errorResponse.errors ||
    typeof errorResponse.errors !== "object"
  ) {
    return [];
  }

  const fieldErrors = Object.entries(errorResponse.errors).map(
    ([fieldName, errorValue]) => ({
      name: fieldName as keyof T,
      errors: Array.isArray(errorValue) ? errorValue : [errorValue],
    })
  );

  return fieldErrors;
};

export const setFormFieldErrors = <T = any>(
  form: any,
  errorResponse: any
): void => {
  const fieldErrors = handleFormErrors<T>(errorResponse);

  if (fieldErrors.length > 0) {
    form.setFields(fieldErrors);
  }
};

export const convertEnumToArrayList = (
  enumObj: any
): { label: string; value: any }[] => {
  return Object.entries(enumObj).map(([key, value]) => ({
    label: key,
    value: value,
  }));
};

export const getStatusTag = (status: ServiceStatus | string) => {
  const statusConfig: Record<ServiceStatus, { color: string; text: string }> = {
    [ServiceStatus.approved]: { color: "green", text: "معتمد" },
    [ServiceStatus.pending]: { color: "orange", text: "بانتظار الاعتماد" },
    [ServiceStatus.draft]: { color: "blue", text: "مسودة" },
    [ServiceStatus.rejected]: { color: "red", text: "مرفوض" },
    [ServiceStatus.inactive]: { color: "gray", text: "غير نشط" },
    [ServiceStatus.revision_pending]: {
      color: "purple",
      text: "بانتظار المراجعة",
    },
  };

  const config = statusConfig[status as ServiceStatus] || {
    color: "default",
    text: "غير محدد",
  };

  return config;
};

export const transformFilterParams = <T>(filter: T): Record<string, any> => {
  if (!filter) return {};

  const transformedParams: Record<string, any> = {};

  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      transformedParams[`filter[${key}]`] = value;
    }
  });

  // Show example URL
  const urlParams = new URLSearchParams();
  Object.entries(transformedParams).forEach(([key, value]) => {
    urlParams.append(key, String(value));
  });

  return transformedParams;
};

export const transformDurationName = (durationName: DurationName) => {
  return durationNameConfig[durationName];
};
