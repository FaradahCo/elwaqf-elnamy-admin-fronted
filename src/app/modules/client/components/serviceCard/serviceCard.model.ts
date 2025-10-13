export interface ServiceCardProps {
  id: string;
  image: string;
  providerName: string;
  title: string;
  rating: number;
  description: string;
  field: string;
  deliveryTime: string;
  cost: string;
  type: "service" | "package";
}
