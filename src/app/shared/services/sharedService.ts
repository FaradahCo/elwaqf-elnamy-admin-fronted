import { triggerForceLogout } from "@/app/store/slices/authSlice";
import { store } from "@/app/store";
import AoiService from "./api";
import {
  type PaginatedResponse,
  type ServiceStatus,
} from "@shared/model/shared.model";

export const ServiceClassificationConfig: Record<string, { label: string }> = {
  service: { label: "خدمة" },
  package: { label: "باقة" },
};

export const typeOptions = [
  { value: "service", label: "خدمة" },
  { value: "package", label: "باقة" },
];

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

export enum ServiceStatusEnum {
  draft = "draft",
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
  revision_pending = "revision_pending",
  inactive = "inactive",
  disabled = "disabled",
  hidden = "hidden",
  active = "active",
}

export const getStatusTag = (status: ServiceStatusEnum | string) => {
  const statusConfig: Record<
    ServiceStatusEnum,
    { color: string; text: string }
  > = {
    [ServiceStatusEnum.approved]: { color: "#52c41a", text: "معتمد" },
    [ServiceStatusEnum.pending]: { color: "#fa8c16", text: "بانتظار الاعتماد" },
    [ServiceStatusEnum.draft]: { color: "#1890ff", text: "مسودة" },
    [ServiceStatusEnum.rejected]: { color: "#ff4d4f", text: "مرفوض" },
    [ServiceStatusEnum.inactive]: { color: "#ff4d4f", text: "غير نشط" },
    [ServiceStatusEnum.disabled]: { color: "#8c8c8c", text: "معطل" },
    [ServiceStatusEnum.hidden]: { color: "#8c8c8c", text: "مخفي" },
    [ServiceStatusEnum.active]: { color: "#52c41a", text: "مفعل" },
    [ServiceStatusEnum.revision_pending]: {
      color: "#722ed1",
      text: "بانتظار المراجعة",
    },
  };

  const config = statusConfig[status as ServiceStatusEnum] || {
    color: "#8c8c8c",
    text: "غير محدد",
  };

  return config;
};

export const transformFilterParams = <T>(filter: T): Record<string, any> => {
  if (!filter) return {};

  const transformedParams: Record<string, any> = {};

  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      // Send page and per_page directly without filter[] wrapper
      if (key === "page" || key === "per_page") {
        transformedParams[key] = value;
      } else {
        transformedParams[`filter[${key}]`] = value;
      }
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

export const triggerForceLogoutForInterceptor = () => {
  store.dispatch(triggerForceLogout());
};

export const getSeriviceStatus = async (params?: { type: string }) => {
  return await AoiService.get<PaginatedResponse<ServiceStatus>>(
    `/admin/services-status`,
    transformFilterParams(params)
  );
};
