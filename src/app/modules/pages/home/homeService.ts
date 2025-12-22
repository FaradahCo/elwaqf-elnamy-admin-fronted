import AoiService from "@shared/services/api";
import type { DashboardData } from "./home.model";

// Mock Data
const MOCK_DASHBOARD_DATA: DashboardData = {
  financials: [
    {
      label: "إجمالي أرباح المنصة",
      amount: 150000,
      currency: "ريال",
      changePercentage: 60,
      isIncrease: true,
      history: [10, 20, 15, 30, 40, 35, 50, 45, 60, 55],
    },
    {
      label: "إجمالي أرباح المزودين",
      amount: 240000,
      currency: "ريال",
      changePercentage: 468,
      isIncrease: true,
      history: [20, 30, 25, 40, 30, 45, 35, 50, 40, 60],
    },
    {
      label: "الرصيد المحجوز",
      amount: 90000,
      currency: "ريال",
      changePercentage: 68,
      isIncrease: true,
      history: [15, 10, 20, 15, 25, 20, 30, 25, 35, 30],
    },
  ],
  overview: [
    {
      label: "العملاء الجدد",
      value: 67,
      subLabel: "عميل جديد",
      changePercentage: 150,
      isIncrease: true,
    },
    {
      label: "الطلبات الجديدة",
      value: 256,
      subLabel: "طلب جديد",
      changePercentage: 60,
      isIncrease: true,
    },
    {
      label: "الطلبات الجارية",
      value: 234,
      subLabel: "طلب جاري",
      changePercentage: 21,
      isIncrease: true,
    },
    {
      label: "الطلبات المكتملة",
      value: 120,
      subLabel: "طلب مكتمل",
      changePercentage: 6,
      isIncrease: true,
    },
  ],
  mostRequestedServices: [
    {
      label: "الحوار الثقافي",
      value: 78,
      percentage: 78,
      color: "#8E44AD", // Purple
    },
    {
      label: "مشروع التأهيل العلمي",
      value: 57,
      percentage: 57,
      color: "#F39C12", // Orange
    },
    {
      label: "إدارة مرافق الصحة في المملكة",
      value: 56,
      percentage: 56,
      color: "#D35400", // Dark Orange/Brown
    },
    {
      label: "عقد ورقة عمل خاصة",
      value: 35,
      percentage: 35,
      color: "#2980B9", // Blue
    },
  ],
  recentActivities: [
    {
      id: 1,
      description: "تم قبول العرض الفني والمالي",
      subDescription: "الخدمة: الدليل التعليمي - العميل: طارق الفراج",
      icon: "check",
      timestamp: "منذ 9 دقيقة",
      isCompleted: true,
    },
    {
      id: 2,
      description: "تم إضافة مزود جديد",
      subDescription: "شركة رؤية الشمال",
      icon: "user-add",
      timestamp: "منذ 15 دقيقة",
      isPending: false,
    },
    {
      id: 3,
      description: "تم إلغاء خدمة",
      subDescription: "الخدمة: الدليل التعليمي - العميل: طارق الفراج",
      icon: "close",
      timestamp: "منذ 1 ساعة",
      isCompleted: false,
    },
    {
      id: 4,
      description: "طلب سحب أرباح جديد",
      subDescription: "المبلغ: 1200 ريال - المزود: الخبراء للاستشارات",
      icon: "withdraw",
      timestamp: "منذ 2 ساعة",
    },
    {
      id: 5,
      description: "تحديث بيانات مزود",
      subDescription: "المزود: الخبراء للاستشارات",
      icon: "update",
      timestamp: "منذ ...",
      isCompleted: true, // Assuming generic 'done' icon usage from image (tick)
    },
    {
      id: 6,
      description: "تم إنشاء طلب خدمة جديد",
      subDescription: "الخدمة: الدليل التعليمي - العميل: طارق الفراج",
      icon: "check-circle",
      timestamp: "منذ 5 ساعات",
      isCompleted: true,
    },
  ],
  outputCompletionRate: 84,
  reviewStats: {
    providers: 14,
    profiles: 3,
    services: 5,
    files: 5,
  },
  approvalRequests: [
    {
      id: "01",
      applicantIdx: "طارق بن محمد الفراج",
      applicantName: "طارق بن محمد الفراج", // Using same for now based on image repetition
      type: "سحب أرباح",
      amount: 5000,
      paymentMethod: "حوالة بنكية",
      date: "10 أكتوبر 2025",
    },
    {
      id: "01",
      applicantIdx: "طارق بن محمد الفراج",
      applicantName: "طارق بن محمد الفراج",
      type: "سحب أرباح",
      amount: 10000,
      paymentMethod: "حوالة بنكية",
      date: "10 أكتوبر 2025",
    },
     {
      id: "01",
      applicantIdx: "طارق بن محمد الفراج",
      applicantName: "طارق بن محمد الفراج",
      type: "سحب أرباح",
      amount: 3500,
      paymentMethod: "حوالة بنكية",
      date: "10 أكتوبر 2025",
    },
     {
      id: "01",
      applicantIdx: "طارق بن محمد الفراج",
      applicantName: "طارق بن محمد الفراج",
      type: "سحب أرباح",
      amount: 2500,
      paymentMethod: "حوالة بنكية",
      date: "10 أكتوبر 2025",
    },
  ],
  generalStats: {
    waqfs: 67,
    bidders: 256,
    consultants: 234,
    services: 120,
    stats: 120,
  },
  qualityIssues: [
    {
      type: "delayed",
      label: "طلب متأخر",
      description: "الخدمة: الدليل التعليمي - العميل: طارق الفراج",
    },
    {
      type: "delayed",
      label: "تأخر في الرد على العرض",
      description: "الخدمة: الدليل التعليمي - العميل: طارق الفراج",
    },
    {
      type: "complaint",
      label: "شكوى جديدة",
      description: "الخدمة: الدليل التعليمي - العميل: طارق الفراج",
    },
    {
      type: "delayed",
      label: "طلب متأخر عن المهلة",
      description: "الخدمة: الدليل التعليمي - العميل: طارق الفراج",
    },
    {
      type: "complaint",
      label: "شكوى جديدة",
      description: "الخدمة: الدليل التعليمي - العميل: طارق الفراج",
    },
     {
       type: "delayed",
      label: "طلب متأخر عن المهلة",
      description: "الخدمة: الدليل التعليمي - العميل: طارق الفراج",
    },
  ],
};

export const getDashboardData = async () => {
    // Simulate API call
    return new Promise<DashboardData>((resolve) => {
        setTimeout(() => {
            resolve(MOCK_DASHBOARD_DATA);
        }, 500);
    });
  // return AoiService.get<DashboardData>(`admin/dashboard`);
};
