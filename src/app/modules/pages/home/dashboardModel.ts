export type DashboardFinancialSummary = {
  platform_revenue: PlatformRevenue;
  providers_earnings: ProviderEarnings;
  pending_balance: PendingBalance;
};
export type PlatformRevenue = {
  total?: number;
  previous_month?: number;
  percentage_change?: number;
  trend?: string;
  period?: string;
};
export type ProviderEarnings = {
  total?: number;
  previous_month?: number;
  percentage_change?: number;
  trend?: string;
  period?: string;
};

export type PendingBalance = {
  total?: number;
  previous_month?: number;
  percentage_change?: number;
  trend?: string;
  period?: string;
};
export type DashboardOverviewData = {
  new_clients?: number;
  new_requests?: number;
  in_progress_requests?: number;
  completed_requests?: number;
  top_services?: TopServices;
  latest_activities?: LatestActivities;
  deliverables_completion?: DeliverablesCompletion;
  period?: string;
};
export type TopServices = Array<{
  service_id?: number;
  title?: string;
  type?: string;
  count?: number;
}>;
export type LatestActivities = Array<{
  id?: number;
  description?: string;
  actor_name?: string;
  actor_type?: string;
  subject_type?: string;
  created_at?: string;
  created_at_formatted?: string;
}>;
export type DeliverablesCompletion = {
  total_deliverables?: number;
  uploaded_deliverables?: number;
  pending_deliverables?: number;
  completion_percentage?: number;
  status?: string;
};
export type PendingProvider = {
  id?: number;
  business_name?: string;
  owner_name?: string;
  created_at?: string;
  created_at_formatted?: string;
};

export type PendingWithdrawal = {
  id?: number;
  amount?: string;
  provider_name?: string;
  bank_name?: string;
  created_at?: string;
  created_at_formatted?: string;
};

export type PendingItem = {
  id?: number;
  title?: string;
  provider_name?: string;
  created_at?: string;
  created_at_formatted?: string;
};

export type PendingItems = {
  pending_providers?: {
    count?: number;
    items?: PendingProvider[];
  };
  pending_services?: {
    count?: number;
    items?: PendingItem[];
  };
  pending_packages?: {
    count?: number;
    items?: PendingItem[];
  };
  pending_withdrawals?: {
    count?: number;
    total_amount?: number;
    items?: PendingWithdrawal[];
  };
};
export type GeneralStatisticsData = {
  total_clients?: number;
  total_providers?: number;
  total_active_providers?: number;
  total_services?: number;
  total_active_services?: number;
  total_packages?: number;
  total_active_packages?: number;
  total_service_requests?: number;
  total_consultations?: number;
};

export type AlertType = "danger" | "warning" | "info" | "success";

export type AlertCategory =
  | "service_request"
  | "payment"
  | "provider"
  | "consultation"
  | "system";

export type Alert = {
  id?: number;
  type?: AlertType;
  category?: AlertCategory;
  message?: string;
  detail?: string;
  created_at?: string;
};

export type QualityMonitoringData = {
  total_alerts?: number;
  delayed_count?: number;
  warning_count?: number;
  alerts?: Alert[];
};
