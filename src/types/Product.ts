export interface Product {
  _id: string;
  name: string;
  description: string;
  category:
    | "Utensil"
    | "Plastic"
    | "Clothing"
    | "Shoe"
    | "Stationery"
    | "Other";
  price: number;
  discount?: number;
  quantity: number;
  unit: "pieces" | "packets" | "sets" | "pairs";
  size?: string;
  color?: string;
  material?: string;
  brand?: string;
  customAttributes?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
}
