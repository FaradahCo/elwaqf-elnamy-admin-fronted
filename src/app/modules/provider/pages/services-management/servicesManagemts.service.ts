import AoiService from "@shared/services/api";
import type { Field, ServiceFormData } from "./servicesManagement.model";

export const ServiceManagenetsService = {
  getFields: async () => {
    return AoiService.get<Field[]>("/provider/fields");
  },

  createService: async (payload: ServiceFormData) => {
    return AoiService.post<ServiceFormData, any>("provider/services", payload);
  },

  updateService: async (serviceId: string, payload: ServiceFormData) => {
    return AoiService.patch<ServiceFormData, any>(
      `provider/services/${serviceId}`,
      payload
    );
  },

  getServiceById: async (serviceId: string) => {
    return AoiService.get<ServiceFormData>(`provider/services/${serviceId}`);
  },
};
