import { triggerForceLogout } from "@/app/store/slices/authSlice";
import { store } from "@/app/store";
import AoiService from "./api";
import {
  type PaginatedResponse,
  type ServiceStatus,
} from "@shared/model/shared.model";

export const ServiceClassificationConfig: Record<string, { label: string }> = {
  all: { label: "الكل" },
  service: { label: "خدمة" },
  package: { label: "باقة" },
};

export const ownerTypeConfig: Record<string, { label: string }> = {
  Client: { label: "عميل" },
  Provider: { label: "مقدم الخدمة" },
};

export const typeOptions = [
  { value: "all", label: "الكل" },
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
  errorResponse: any,
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
    }),
  );

  return fieldErrors;
};

export const setFormFieldErrors = <T = any>(
  form: any,
  errorResponse: any,
): void => {
  const fieldErrors = handleFormErrors<T>(errorResponse);

  if (fieldErrors.length > 0) {
    form.setFields(fieldErrors);
  }
};

export const convertEnumToArrayList = (
  enumObj: any,
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
  hold = "hold",
  removed = "removed",
  scheduled = "scheduled",
  canceled = "canceled",
  testing = "testing",
  expired = "expired",
  complete = "complete",
  completed = "completed",
  pending_payment = "pending_payment",
  pending_verification = "pending_verification",
  failed = "failed",
  in_progress = "in_progress",
  review = "review",
  exhausted = "exhausted",
  cancelled = "cancelled",
}

export const getStatusTag = (status: ServiceStatusEnum | string) => {
  const statusConfig: Record<
    ServiceStatusEnum,
    { color: string; text: string }
  > = {
    [ServiceStatusEnum.approved]: { color: "#52c41a", text: "معتمد" },
    [ServiceStatusEnum.pending]: { color: "#fa8c16", text: "بانتظار الاعتماد" },
    [ServiceStatusEnum.pending_payment]: {
      color: "#fa8c16",
      text: "بانتظار الدفع",
    },
    [ServiceStatusEnum.pending_verification]: {
      color: "#fa8c16",
      text: "قيد الاعتماد",
    },
    [ServiceStatusEnum.draft]: { color: "#1890ff", text: "مسودة" },
    [ServiceStatusEnum.rejected]: { color: "#ff4d4f", text: "مرفوض" },
    [ServiceStatusEnum.failed]: { color: "#ff4d4f", text: "فاشلة" },
    [ServiceStatusEnum.inactive]: { color: "#ff4d4f", text: "غير نشط" },
    [ServiceStatusEnum.disabled]: { color: "#8c8c8c", text: "معطل" },
    [ServiceStatusEnum.hidden]: { color: "#8c8c8c", text: "مخفي" },
    [ServiceStatusEnum.active]: { color: "#52c41a", text: "مفعل" },
    [ServiceStatusEnum.completed]: { color: "#52c41a", text: "مكتملة" },
    [ServiceStatusEnum.complete]: { color: "#52c41a", text: "مكتملة" },
    [ServiceStatusEnum.hold]: { color: "#fa8c16", text: "معلق" },
    [ServiceStatusEnum.review]: { color: "#fa8c16", text: "معلق" },
    [ServiceStatusEnum.in_progress]: { color: "#fa8c16", text: "جاري العمل" },
    [ServiceStatusEnum.removed]: { color: "#8c8c8c", text: "محذوف" },
    [ServiceStatusEnum.scheduled]: { color: "#fa8c16", text: "مجدول" },
    [ServiceStatusEnum.canceled]: { color: "#ff4d4f", text: "ملغي" },
    [ServiceStatusEnum.cancelled]: { color: "#ff4d4f", text: "ملغي" },
    [ServiceStatusEnum.testing]: { color: "#722ed1", text: "تجريبي" },
    [ServiceStatusEnum.expired]: { color: "#ff4d4f", text: "منتهي" },
    [ServiceStatusEnum.exhausted]: { color: "#8c8c8c", text: "مستنفذ" },

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
    transformFilterParams(params),
  );
};

export const handleDownloadAttachment = async (
  endpoint: string,
): Promise<void> => {
  try {
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
  }
};
