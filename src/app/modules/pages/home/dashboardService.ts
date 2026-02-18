import { Dayjs } from "dayjs";
import AoiService from "@shared/services/api";
import type {
  ApprovelRequests,
  DashboardFinancialSummary,
  DashboardOverviewData,
  GeneralStatisticsData,
  PendingItems,
  QualityMonitoringData,
} from "./dashboardModel";

export const getDashboardFinancialSummary = async (date: Dayjs) => {
  return AoiService.get<DashboardFinancialSummary>(
    "/admin/dashboard/financial-summary",
    { month: date.format("MM"), year: date.format("YYYY") },
  );
};
export const getDashboardOverview = async () => {
  return AoiService.get<DashboardOverviewData>("/admin/dashboard/overview");
};
export const getReviewRequests = async () => {
  return AoiService.get<PendingItems>("/admin/dashboard/review-requests");
};
export const getGeneralStatistics = async (date: Dayjs) => {
  return AoiService.get<GeneralStatisticsData>(
    "/admin/dashboard/general-statistics",
    { month: date.format("MM"), year: date.format("YYYY") },
  );
};
export const getQualityMonitoring = async () => {
  return AoiService.get<QualityMonitoringData>(
    "/admin/dashboard/quality-monitoring",
  );
};
export const getApprovelRequests = async () => {
  return AoiService.get<ApprovelRequests>("/admin/dashboard/approval-table");
};
