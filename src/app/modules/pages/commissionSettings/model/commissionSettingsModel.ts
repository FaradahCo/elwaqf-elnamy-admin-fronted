export type CommissionSettings = {
  main_commission_rate: number;
  offering_provider_commission_rate: number;
  subcontractor_commission_rate: number;
};

export type CommissionSettingsResponse = {
  data: CommissionSettings;
};

export type CommissionSettingsPayload = CommissionSettings;

export type CommissionLog = {
  id?: number;
  date_formatted: string;
  created_at?: string;
  main_commission_rate: string;
  offering_provider_commission_rate: string;
  subcontractor_commission_rate: string;
  raw_rates?: CommissionSettings;
  performed_by: string;
  status?: string;
  status_label: string;
  is_current?: boolean;
};

export type CommissionLogsResponse = {
  data: CommissionLog[];
};
