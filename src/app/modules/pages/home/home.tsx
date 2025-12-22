import { Spin, Row, Col } from "antd";
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
import { UserOutlined, BellOutlined, MailOutlined } from "@ant-design/icons"; // Assuming header is handled in layout, but adding placeholder just in case user wants full page control.

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

      <h2 className="text-xl font-bold text-gray-800 mb-4 text-left">المالية</h2>
      
      {/* Financial Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {data.financials.map((item, index) => (
           <FinancialWidget key={index} data={item} />
        ))}
      </div>

       <h2 className="text-xl font-bold text-gray-800 mb-4 text-left">نظرة عامة</h2>

       {/* Overview Widgets */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
           {data.overview.map((item, index) => (
               <OverviewWidget key={index} data={item} />
           ))}
       </div>

       {/* Middle Section: Activities, Charts */}
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
           {/* Left Col: Services & Completion */}
           <div className="lg:col-span-4 flex flex-col gap-6">
                <ServicesChart data={data.mostRequestedServices} />
                <CompletionChart percentage={data.outputCompletionRate} />
           </div>
           
            {/* Right Col: Timeline */}
           <div className="lg:col-span-8 h-full">
                <ActivityTimeline data={data.recentActivities} />
           </div>
       </div>

       {/* Review Section */}
       <div className="mb-8">
           <ReviewStats data={data.reviewStats} />
       </div>

        {/* Bottom Section: Table & Quality */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            <div className="lg:col-span-8">
                <ApprovalRequestsTable data={data.approvalRequests} />
            </div>
            {/* Using 4 cols for Quality to match visual weight */}
             <div className="lg:col-span-4"> 
                {/* General Stats is visually separated in image, maybe below table? Layout in image is tricky. 
                    Image shows: Approval Requests (Table) is wide. General Stats is BELOW table.
                    Quality Monitoring is Side bar? 
                    Let's re-examine image.
                    - Sidebar (Right): Activity Timeline (Top), Quality Monitoring (Bottom).
                    - Main (Left): Financial, Overview, Charts, Review Stats, Table.
                    
                    WAIT, the image is RTL.
                    Right Sidebar: Menu.
                    Main Content:
                    - Top Wrapper: Greeting
                    - Row 1: 3 Financial Cards
                    - Row 2: 4 Overview Cards
                    - Row 3: 
                        - Right: Activity Timeline
                        - Left: Services Chart
                    - Row 4: 
                        - Right: Completion Chart? No, Completion chart is below Services chart.
                        - Layout seems: 
                            - Column 1 (Rightmost, Large): Activity Timeline
                            - Column 2 (Leftmost, Medium): Most Requested Services, then Completion Rate.
                   - Row 5: Review Stats (4 colored cards)
                   - Row 6: Approval Requests (Table)
                   - Row 7: General Stats (5 cards)
                   
                   Wait, looking at the full image again.
                   Sidebar (Right - Dark Blue)
                   Content:
                   - Greeting
                   - Financials (3 cards)
                   - Overview (4 cards)
                   - Flex Row:
                      - Right: Activity Timeline (List)
                      - Left (Split): 
                          - Top: Services Chart
                          - Bottom: Completion Chart
                   - Review Stats (4 colored cards)
                   - Flex Row:
                      - Right: Approval Requests (Table) -> Actually, check the image. "Quality Monitoring" is sidebar on the LEFT? Or Bottom?
                      
                   Actually, let's look at the "Quality Monitoring" (مراقبة الجودة). It's at the very bottom right? Or is it a long sidebar?
                   It looks like a long vertical block on the bottom right? No, it's under General Stats?
                   
                   Let's stick to a standard grid:
                   Rows:
                   1. Greeting
                   2. Financials
                   3. Overview
                   4. Grid 12:
                      - Col 8 (Right - RTL implies first in DOM if flex-row-reverse, or use proper grid): 
                         - Activity Timeline? Use styling to match.
                         - Actually, in RTL, "Right" is "Start".
                         - Image: "أحدث الأنشطة" is on the Right. "الخدمات الأكثر طلباً" is on the Left.
                         - So Cols-8 (Activity) + Cols-4 (Charts).
                   5. Review Stats
                   6. Approval Table
                   7. General Stats
                   8. Quality Monitoring? It's at the bottom in the image provided?
                      Ah, I see "إحصاءات عامة" (General Stats) and below it "مراقبة الجودة" (Quality Monitoring) in the cropped view?
                      
                   Let's assume a vertical flow for simplicity, but grouped logically.
                */}
                <QualityMonitoring data={data.qualityIssues} />
             </div>
        </div>

        <div className="mb-8">
             <GeneralStats data={data.generalStats} />
        </div>
    </div>
  );
};

export default Home;
