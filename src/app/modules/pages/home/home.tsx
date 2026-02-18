import { Button, Spin } from "antd";
import React from "react";
import UserProfile from "./components/userProfile/userProfile";
import DashboardCards from "./components/dashboardCards/dashboardCards";

import ConfirmationRequests from "./components/confirmationRequests/confirmationRequests";
import DashboardOverview from "./components/dashboardOverview/dashboardOverview";
import ConfirmationRequestsTable from "./components/confirmationRequestsTable/confirmationRequestsTable";
import { useApiQuery } from "@shared/services/api";
import { getDashboardOverview, getReviewRequests } from "./dashboardService";
import type { DashboardOverviewData, PendingItems } from "./dashboardModel";
import GeneralStatistics from "./components/generalStatistics/generalStatistics";
import QualityControl from "./components/qualityControl/qualityControl";
import { useNavigate } from "react-router";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { data: reviewRequest, isLoading: reviewRequestLoading } =
    useApiQuery<PendingItems>(["dashboardReviewRequests"], getReviewRequests, {
      retry: false,
    });

  const { data: dashboardOverview, isLoading: dashboardOverviewLoading } =
    useApiQuery<DashboardOverviewData>(
      ["dashboardOverview"],
      getDashboardOverview,
      {
        retry: false,
      },
    );
  if (reviewRequestLoading || dashboardOverviewLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl">الرئيسية</h1>
        <Button
          onClick={() => navigate(0)}
          className="py-3! text-primary! border-primary! hover:text-white! hover:bg-primary! rounded-sm!"
          type="default"
          size="large"
        >
          تحديث الصفحة
        </Button>
      </div>
      <UserProfile />
      <DashboardCards />
      <DashboardOverview dashboardOverview={dashboardOverview} />
      <ConfirmationRequests reviewRequest={reviewRequest} />
      <ConfirmationRequestsTable />
      <GeneralStatistics />
      <QualityControl />
    </>
  );
};

export default Home;
