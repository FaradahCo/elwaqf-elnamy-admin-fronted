export interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: {
    category?: string;
    provider?: string;
    deliveryTime?: string;
    amount?: string;
  }) => void;
  categories?: FilterOption[];
  providers?: FilterOption[];
  deliveryTimes?: FilterOption[];
  amounts?: FilterOption[];
}

export interface FilterOption {
  value: string;
  label: string;
}
