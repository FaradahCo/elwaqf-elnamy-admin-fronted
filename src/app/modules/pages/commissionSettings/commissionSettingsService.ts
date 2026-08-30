import AoiService from "@shared/services/api";
import type {
  CommissionLog,
  CommissionSettings,
  CommissionSettingsPayload,
  CommissionSettingsResponse,
} from "./model/commissionSettingsModel";

export const getCommissionSettings = async (): Promise<CommissionSettings> => {
  return AoiService.get<CommissionSettings>("/admin/settings/commissions");
};

export const updateCommissionSettings = async (
  payload: CommissionSettingsPayload,
) => {
  return AoiService.put<CommissionSettingsPayload, CommissionSettingsResponse>(
    "/admin/settings/commissions",
    payload,
  );
};

export const getCommissionSettingsLogs = async (): Promise<CommissionLog[]> => {
  return AoiService.get<CommissionLog[]>("/admin/settings/commissions/logs");
};
