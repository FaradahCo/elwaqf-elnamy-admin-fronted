export type DetailsFacts = {
  costFrom: string;
  deliveryTime: string;
  responseTime?: string;
};

export type DetailsHeader = {
  image?: string;
  title: string;
  providerName: string;
  field: string;
  rating: number;
  ctaText: string;
};

export type DetailsSection =
  | { type: "paragraph"; title: string; text: string }
  | { type: "list"; title: string; items: string[] };

export type SidebarCard = {
  title: string;
  items?: string[];
  ctaText?: string;
  description?: string;
};

export type EntityDetailsProps = {
  loading: boolean;
  breadcrumb: { backPath: string; current: string; backLabel: string };
  header: DetailsHeader;
  sidebar: SidebarCard[];
  sections: DetailsSection[];
  facts: DetailsFacts;
};
