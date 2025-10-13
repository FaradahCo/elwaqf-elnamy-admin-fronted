import BreadCrumbComponent from "@components/breadcrumb/breadcrumb";
import { useLayoutEffect, useState } from "react";
import SearchAndFilter from "../../components/searchAndFilter/searchAndFilter";
import ServiceCard from "../../components/serviceCard/serviceCard";

interface Package {
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

const Packages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useLayoutEffect(() => {
    const mockPackages: Package[] = [
      {
        id: "1",
        image: "/images/package1.jpg",
        providerName: "مجموعة ألفا للاستشارات المهنية",
        title: "الباقة الأساسية",
        rating: 4,
        description: "باقة شاملة لجميع الخدمات الأساسية",
        field: "خدمات شرعية",
        deliveryTime: "15 يوم",
        cost: "تبدأ من 5,000",
      },
      {
        id: "1",
        image: "/images/package1.jpg",
        providerName: "مجموعة ألفا للاستشارات المهنية",
        title: "الباقة الأساسية",
        rating: 4,
        description: "باقة شاملة لجميع الخدمات الأساسية",
        field: "خدمات شرعية",
        deliveryTime: "15 يوم",
        cost: "تبدأ من 5,000",
      },
      {
        id: "1",
        image: "/images/package1.jpg",
        providerName: "مجموعة ألفا للاستشارات المهنية",
        title: "الباقة الأساسية",
        rating: 4,
        description: "باقة شاملة لجميع الخدمات الأساسية",
        field: "خدمات شرعية",
        deliveryTime: "15 يوم",
        cost: "تبدأ من 5,000",
      },
      {
        id: "1",
        image: "/images/package1.jpg",
        providerName: "مجموعة ألفا للاستشارات المهنية",
        title: "الباقة الأساسية",
        rating: 4,
        description: "باقة شاملة لجميع الخدمات الأساسية",
        field: "خدمات شرعية",
        deliveryTime: "15 يوم",
        cost: "تبدأ من 5,000",
      },
      {
        id: "1",
        image: "/images/package1.jpg",
        providerName: "مجموعة ألفا للاستشارات المهنية",
        title: "الباقة الأساسية",
        rating: 4,
        description: "باقة شاملة لجميع الخدمات الأساسية",
        field: "خدمات شرعية",
        deliveryTime: "15 يوم",
        cost: "تبدأ من 5,000",
      },
      {
        id: "1",
        image: "/images/package1.jpg",
        providerName: "مجموعة ألفا للاستشارات المهنية",
        title: "الباقة الأساسية",
        rating: 4,
        description: "باقة شاملة لجميع الخدمات الأساسية",
        field: "خدمات شرعية",
        deliveryTime: "15 يوم",
        cost: "تبدأ من 5,000",
      },
      {
        id: "1",
        image: "/images/package1.jpg",
        providerName: "مجموعة ألفا للاستشارات المهنية",
        title: "الباقة الأساسية",
        rating: 4,
        description: "باقة شاملة لجميع الخدمات الأساسية",
        field: "خدمات شرعية",
        deliveryTime: "15 يوم",
        cost: "تبدأ من 5,000",
      },
      {
        id: "1",
        image: "/images/package1.jpg",
        providerName: "مجموعة ألفا للاستشارات المهنية",
        title: "الباقة الأساسية",
        rating: 4,
        description: "باقة شاملة لجميع الخدمات الأساسية",
        field: "خدمات شرعية",
        deliveryTime: "15 يوم",
        cost: "تبدأ من 5,000",
      },
      {
        id: "1",
        image: "/images/package1.jpg",
        providerName: "مجموعة ألفا للاستشارات المهنية",
        title: "الباقة الأساسية",
        rating: 4,
        description: "باقة شاملة لجميع الخدمات الأساسية",
        field: "خدمات شرعية",
        deliveryTime: "15 يوم",
        cost: "تبدأ من 5,000",
      },
      {
        id: "1",
        image: "/images/package1.jpg",
        providerName: "مجموعة ألفا للاستشارات المهنية",
        title: "الباقة الأساسية",
        rating: 4,
        description: "باقة شاملة لجميع الخدمات الأساسية",
        field: "خدمات شرعية",
        deliveryTime: "15 يوم",
        cost: "تبدأ من 5,000",
      },

      // Add more packages...
    ];

    setPackages(mockPackages);
    setFilteredPackages(mockPackages);
    setLoading(false);
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredPackages(packages);
      return;
    }

    const filtered = packages.filter(
      (pkg) =>
        pkg.title.toLowerCase().includes(query.toLowerCase()) ||
        pkg.description.toLowerCase().includes(query.toLowerCase()) ||
        pkg.providerName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPackages(filtered);
  };

  const handleFilterChange = (filters: any) => {
    let filtered = packages;

    if (filters.category) {
      filtered = filtered.filter((pkg) => pkg.field === filters.category);
    }

    if (filters.provider) {
      filtered = filtered.filter(
        (pkg) => pkg.providerName === filters.provider
      );
    }

    setFilteredPackages(filtered);
  };

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
      <BreadCrumbComponent items={[{ path: null, label: "الباقات" }]} />

      <div className="container mx-auto">
        <SearchAndFilter
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          categories={filterOptions.categories}
          providers={filterOptions.providers}
          deliveryTimes={filterOptions.deliveryTimes}
          amounts={filterOptions.amounts}
        />

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <ServiceCard key={pkg.id} {...pkg} type="package" />
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            لا توجد باقات مطابقة للبحث
          </div>
        )}
      </div>
    </>
  );
};

export default Packages;
