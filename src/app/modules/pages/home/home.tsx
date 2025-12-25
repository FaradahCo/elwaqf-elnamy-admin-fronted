import { Spin } from "antd";
import { useApiQuery } from "@shared/services/api";
import { getDashboardData } from "./homeService";
import type { DashboardData } from "./home.model";

// Components
import FinancialWidget from "./components/FinancialWidget";
import OverviewWidget from "./components/OverviewWidget";
import ServicesChart from "./components/ServicesChart";
import ActivityTimeline from "./components/ActivityTimeline";
import CompletionChart from "./components/CompletionChart";
import ReviewStats from "./components/ReviewStats";
import ApprovalRequestsTable from "./components/ApprovalRequestsTable";
import GeneralStats from "./components/GeneralStats";
import QualityMonitoring from "./components/QualityMonitoring";
import { UserOutlined } from "@ant-design/icons";

const Home = () => {
  const { data, isLoading } = useApiQuery<DashboardData>(
    ["dashboard/data"],
    () => getDashboardData(),
    {
      retry: false,
    }
  );

  if (isLoading || !data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
       {/* Greeting Section */}
       <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-100 rounded-full flex justify-center items-center text-blue-600 text-xl">
                    <UserOutlined />
                 </div>
                 <div>
                     <span className="text-gray-400 text-sm block">مرحباً</span>
                     <span className="font-bold text-gray-800 text-lg">طارق بن محمد الفراج</span>
                 </div>
            </div>
             {/* Note: The top right user/search bar in the image is typically Global Layout. keeping this local greeting as part of dashboard body if needed or redundant. */}
       </div>

       <div className="flex justify-between items-center mb-4">
           <h2 className="text-xl font-bold text-gray-800">المالية</h2>
           <div className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-600 cursor-pointer hover:border-blue-500 transition flex items-center gap-2">
               <span>ديسمبر 2024</span>
               <i className="fa fa-chevron-down text-xs text-gray-400"></i>
           </div>
       </div>

       {/* Overview Widgets */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
           {data.overview.map((item, index) => (
               <OverviewWidget key={index} data={item} />
           ))}
       </div>

       {/* Middle Section: Activities, Charts */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
           {/* Left Col: Services & Completion */}
           <div className="flex flex-col gap-6">
                <ServicesChart data={data.mostRequestedServices} />
                <CompletionChart percentage={data.outputCompletionRate} />
           </div>
           
            {/* Right Col: Timeline */}
           <div className="h-full">
                <ActivityTimeline data={data.recentActivities} />
           </div>
       </div>

       {/* Review Section */}
       <div className="mb-8">
           <ReviewStats data={data.reviewStats} />
       </div>

        {/* Bottom Section: Table */}
        <div className="mb-8">
             <ApprovalRequestsTable data={data.approvalRequests} />
        </div>

        <div className="mb-8">
             <GeneralStats data={data.generalStats} />
        </div>

        <div className="mb-8">
             <QualityMonitoring data={data.qualityIssues} />
        </div>
    </div>
  );
};

export default Home;
