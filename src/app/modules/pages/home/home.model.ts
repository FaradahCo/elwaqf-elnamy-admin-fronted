export interface FinancialStat {
  label: string;
  amount: number;
  currency: string;
  changePercentage: number;
  isIncrease: boolean;
  history: number[]; // For mini chart
}

export interface OverviewStat {
  label: string;
  value: number | string;
  subLabel: string;
  changePercentage: number;
  isIncrease: boolean;
}

export interface ServiceRequestStat {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

export interface ReferenceItem {
  id: number | string;
  description: string;
  subDescription: string;
  icon: string; // URL or identifier
  timestamp: string;
  isCompleted?: boolean;
  isPending?: boolean;
}

export interface ApprovalRequestItem {
  id: string;
  applicantIdx: string;
  applicantName: string;
  type: string;
  amount: number;
  paymentMethod: string;
  date: string;
}

export interface QualityIssueItem {
  type: 'delayed' | 'no_response' | 'complaint';
  label: string;
  description: string;
}

export interface DashboardData {
  financials: FinancialStat[];
  overview: OverviewStat[];
  mostRequestedServices: ServiceRequestStat[];
  recentActivities: ReferenceItem[];
  outputCompletionRate: number;
  reviewStats: {
    providers: number;
    profiles: number;
    services: number;
    files: number;
  };
  approvalRequests: ApprovalRequestItem[];
  generalStats: {
    waqfs: number;
    bidders: number;
    consultants: number;
    services: number;
    stats: number; // The "120" below "Number of Stats"?
  };
  qualityIssues: QualityIssueItem[];
}
