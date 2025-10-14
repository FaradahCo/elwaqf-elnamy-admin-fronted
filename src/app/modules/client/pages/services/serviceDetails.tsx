// src/app/modules/client/pages/services/serviceDetails.tsx
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router";

import EntityDetails from "../../components/details/entityDetails";
import type {
  DetailsFacts,
  DetailsHeader,
  DetailsSection,
  SidebarCard,
} from "../../components/details/details.model";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState<DetailsHeader>();
  const [sidebar, setSidebar] = useState<SidebarCard[]>([]);
  const [sections, setSections] = useState<DetailsSection[]>([]);
  const [facts, setFacts] = useState<DetailsFacts>();

  useLayoutEffect(() => {
    const mockHeader: DetailsHeader = {
      image: "/images/service1.jpg",
      title: "توثيق وثيقة الوقف",
      providerName: "سنا للاستشارات",
      field: "خدمات شرعية",
      rating: 5,
      ctaText: "التواصل مع مزود الخدمة",
    };
    const mockSidebar: SidebarCard[] = [
      {
        title: "متطلبات الاستفادة",
        items: [
          "إنشاء اللائحة المالية للعمل",
          "تحليل طبيعة العمل لتكوين أفضل سياسات المحاسبة",
          "تطبيق السياسات والإجراءات واللوائح للعمليات المالية والمحاسبية",
          "ربط الأدلة والإجراءات بالدورة المحاسبية والمستندية للعمل",
        ],
        ctaText: "طلب عرض سعري",
      },
      {
        title: "استشارة",
        description:
          "تحليل طبيعة العمل لتكوين أفضل السياسات والإجراءات بما يتناسب مع نشاط العمل.",
        ctaText: "الاستشارة",
      },
    ];
    const mockSections: DetailsSection[] = [
      {
        type: "paragraph",
        title: "وصف الخدمة",
        text: "يوضح هذا وصف الخدمة والذي غالبًا ما يتكون من عدة أسطر كما في المثال...",
      },
      {
        type: "list",
        title: "نطاق الخدمة",
        items: [
          "إنشاء الأنظمة المالية للعمل",
          "تحليل طبيعة العمل لتكوين أفضل سياسات المحاسبة",
          "تطبيق السياسات والإجراءات واللوائح للعمليات",
          "ربط الأدلة والإجراءات بالدورة المحاسبية",
        ],
      },
      {
        type: "list",
        title: "مخرجات الخدمة",
        items: ["اللائحة المالية", "السياسات والإجراءات", "دليل موظفي الإدارة"],
      },
    ];
    const mockFacts: DetailsFacts = {
      costFrom: "8,000",
      deliveryTime: "20 يوم عمل",
      responseTime: "7 أيام عمل",
    };

    setHeader(mockHeader);
    setSidebar(mockSidebar);
    setSections(mockSections);
    setFacts(mockFacts);
    setLoading(false);
  }, [id]);

  return (
    <EntityDetails
      loading={loading}
      breadcrumb={{
        backPath: "/services",
        backLabel: "الخدمات",
        current: "تفاصيل الخدمة",
      }}
      header={header!}
      sidebar={sidebar}
      sections={sections}
      facts={facts!}
    />
  );
};

export default ServiceDetailsPage;
