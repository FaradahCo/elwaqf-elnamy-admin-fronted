import BreadCrumbComponent from "@components/breadcrumb/breadcrumb";
import { useLayoutEffect, useState } from "react";
import SearchAndFilter from "../../components/searchAndFilter/searchAndFilter";
import ServiceCard from "../../components/serviceCard/serviceCard";

interface Service {
  id: string;
  image: string;
  providerName: string;
  title: string;
  rating: number;
  description: string;
  field: string;
  deliveryTime: string;
  cost: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useLayoutEffect(() => {
    // Simulate API call
    const mockServices: Service[] = [
      {
        id: "1",
        image: "/images/service1.jpg",
        providerName: "مجموعة ألفا للاستشارات المهنية",
        title: "التهيئة الضريبية",
        rating: 5,
        description:
          "تهدف إلى الرد على استفسارات هيئة الزكاة والضريبة والجمارك ومتطلباتها اللاحقة عند الفحص على اقرارات ضريبة القيمة المضافة",
        field: "خدمات شرعية",
        deliveryTime: "20 يوم",
        cost: "تبدأ من 8,000",
      },
      {
        id: "1",
        image: "/images/service1.jpg",
        providerName: "مجموعة ألفا للاستشارات المهنية",
        title: "التهيئة الضريبية",
        rating: 5,
        description:
          "تهدف إلى الرد على استفسارات هيئة الزكاة والضريبة والجمارك ومتطلباتها اللاحقة عند الفحص على اقرارات ضريبة القيمة المضافة",
        field: "خدمات شرعية",
        deliveryTime: "20 يوم",
        cost: "تبدأ من 8,000",
      },
      {
        id: "1",
        image: "/images/service1.jpg",
        providerName: "مجموعة ألفا للاستشارات المهنية",
        title: "التهيئة الضريبية",
        rating: 5,
        description:
          "تهدف إلى الرد على استفسارات هيئة الزكاة والضريبة والجمارك ومتطلباتها اللاحقة عند الفحص على اقرارات ضريبة القيمة المضافة",
        field: "خدمات شرعية",
        deliveryTime: "20 يوم",
        cost: "تبدأ من 8,000",
      },
      {
        id: "1",
        image: "/images/service1.jpg",
        providerName: "مجموعة ألفا للاستشارات المهنية",
        title: "التهيئة الضريبية",
        rating: 5,
        description:
          "تهدف إلى الرد على استفسارات هيئة الزكاة والضريبة والجمارك ومتطلباتها اللاحقة عند الفحص على اقرارات ضريبة القيمة المضافة",
        field: "خدمات شرعية",
        deliveryTime: "20 يوم",
        cost: "تبدأ من 8,000",
      },
      {
        id: "1",
        image: "/images/service1.jpg",
        providerName: "مجموعة ألفا للاستشارات المهنية",
        title: "التهيئة الضريبية",
        rating: 5,
        description:
          "تهدف إلى الرد على استفسارات هيئة الزكاة والضريبة والجمارك ومتطلباتها اللاحقة عند الفحص على اقرارات ضريبة القيمة المضافة",
        field: "خدمات شرعية",
        deliveryTime: "20 يوم",
        cost: "تبدأ من 8,000",
      },
      {
        id: "1",
        image: "/images/service1.jpg",
        providerName: "مجموعة ألفا للاستشارات المهنية",
        title: "التهيئة الضريبية",
        rating: 5,
        description:
          "تهدف إلى الرد على استفسارات هيئة الزكاة والضريبة والجمارك ومتطلباتها اللاحقة عند الفحص على اقرارات ضريبة القيمة المضافة",
        field: "خدمات شرعية",
        deliveryTime: "20 يوم",
        cost: "تبدأ من 8,000",
      },
      {
        id: "1",
        image: "/images/service1.jpg",
        providerName: "مجموعة ألفا للاستشارات المهنية",
        title: "التهيئة الضريبية",
        rating: 5,
        description:
          "تهدف إلى الرد على استفسارات هيئة الزكاة والضريبة والجمارك ومتطلباتها اللاحقة عند الفحص على اقرارات ضريبة القيمة المضافة",
        field: "خدمات شرعية",
        deliveryTime: "20 يوم",
        cost: "تبدأ من 8,000",
      },
      {
        id: "1",
        image: "/images/service1.jpg",
        providerName: "مجموعة ألفا للاستشارات المهنية",
        title: "التهيئة الضريبية",
        rating: 5,
        description:
          "تهدف إلى الرد على استفسارات هيئة الزكاة والضريبة والجمارك ومتطلباتها اللاحقة عند الفحص على اقرارات ضريبة القيمة المضافة",
        field: "خدمات شرعية",
        deliveryTime: "20 يوم",
        cost: "تبدأ من 8,000",
      },
      {
        id: "1",
        image: "/images/service1.jpg",
        providerName: "مزود",
        title: "خدمة تجريبية",
        rating: 5,
        description:
          "تهدف إلى الرد على استفسارات هيئة الزكاة والضريبة والجمارك ومتطلباتها اللاحقة عند الفحص على اقرارات ضريبة القيمة المضافة",
        field: "خدمات شرعية",
        deliveryTime: "20 يوم",
        cost: "تبدأ من 8,000",
      },
      // Add more services...
    ];

    setServices(mockServices);
    setFilteredServices(mockServices);
    setLoading(false);
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredServices(services);
      return;
    }

    const filtered = services.filter(
      (service) =>
        service.title.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase()) ||
        service.providerName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const handleFilterChange = (filters: any) => {
    // Implement filtering logic based on selected filters
    let filtered = services;

    if (filters.category) {
      filtered = filtered.filter(
        (service) => service.field === filters.category
      );
    }

    if (filters.provider) {
      filtered = filtered.filter(
        (service) => service.providerName === filters.provider
      );
    }

    // Add more filter logic as needed

    setFilteredServices(filtered);
  };

  // Mock filter options - replace with actual API data
  const filterOptions = {
    categories: [
      { value: "خدمات شرعية", label: "خدمات شرعية" },
      { value: "خدمات قانونية", label: "خدمات قانونية" },
    ],
    providers: [
      {
        value: "مجموعة ألفا للاستشارات المهنية",
        label: "مجموعة ألفا للاستشارات المهنية",
      },
    ],
    deliveryTimes: [
      { value: "أقل من أسبوع", label: "أقل من أسبوع" },
      { value: "1-2 أسبوع", label: "1-2 أسبوع" },
      { value: "أكثر من أسبوعين", label: "أكثر من أسبوعين" },
    ],
    amounts: [
      { value: "أقل من 5,000", label: "أقل من 5,000" },
      { value: "5,000 - 10,000", label: "5,000 - 10,000" },
      { value: "أكثر من 10,000", label: "أكثر من 10,000" },
    ],
  };

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  return (
    <>
      <BreadCrumbComponent items={[{ path: null, label: "الخدمات" }]} />

      <div className="container mx-auto  ">
        <SearchAndFilter
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          categories={filterOptions.categories}
          providers={filterOptions.providers}
          deliveryTimes={filterOptions.deliveryTimes}
          amounts={filterOptions.amounts}
        />

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} {...service} type="service" />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            لا توجد خدمات مطابقة للبحث
          </div>
        )}
      </div>
    </>
  );
};

export default Services;
