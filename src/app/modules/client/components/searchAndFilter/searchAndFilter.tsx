import { useState } from "react";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { Select, Input } from "antd";
import type { SearchAndFilterProps } from "./searchAndFilter.model";

const SearchAndFilter = ({
  onSearch,
  onFilterChange,
  categories = [],
  providers = [],
  deliveryTimes = [],
  amounts = [],
}: SearchAndFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    provider: "",
    deliveryTime: "",
    amount: "",
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="p-6 bg-second-primary text-white">
      <div className="mb-4">
        <Input
          size="large"
          placeholder="عن ماذا تبحث ؟"
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Filters */}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Select
            placeholder=" التصنيف"
            value={filters.category}
            onChange={(value) => handleFilterChange("category", value)}
            suffixIcon={<DownOutlined />}
            className="w-full"
            allowClear
          >
            {categories.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div>
          <Select
            placeholder="اختر المزود"
            value={filters.provider}
            onChange={(value) => handleFilterChange("provider", value)}
            suffixIcon={<DownOutlined />}
            className="w-full"
            allowClear
          >
            {providers.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div>
          <Select
            placeholder="اختر الوقت"
            value={filters.deliveryTime}
            onChange={(value) => handleFilterChange("deliveryTime", value)}
            suffixIcon={<DownOutlined />}
            className="w-full"
            allowClear
          >
            {deliveryTimes.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div>
          <Select
            placeholder="اختر المبلغ"
            value={filters.amount}
            onChange={(value) => handleFilterChange("amount", value)}
            suffixIcon={<DownOutlined />}
            className="w-full"
            allowClear
          >
            {amounts.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
