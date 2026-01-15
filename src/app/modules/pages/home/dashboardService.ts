import AoiService from "@shared/services/api";
import type {
  ApprovelRequests,
  DashboardFinancialSummary,
  DashboardOverviewData,
  GeneralStatisticsData,
  PendingItems,
  QualityMonitoringData,
} from "./dashboardModel";

export const getDashboardFinancialSummary = async () => {
  return AoiService.get<DashboardFinancialSummary>(
    "/admin/dashboard/financial-summary"
  );
};
export const getDashboardOverview = async () => {
  return AoiService.get<DashboardOverviewData>("/admin/dashboard/overview");
};
export const getReviewRequests = async () => {
  return AoiService.get<PendingItems>("/admin/dashboard/review-requests");
};
export const getGeneralStatistics = async () => {
  return AoiService.get<GeneralStatisticsData>(
    "/admin/dashboard/general-statistics"
  );
};
export const getQualityMonitoring = async () => {
  return AoiService.get<QualityMonitoringData>(
    "/admin/dashboard/quality-monitoring"
  );
};
export const getApprovelRequests = async () => {
  return AoiService.get<ApprovelRequests>("/admin/dashboard/approval-table");
};
