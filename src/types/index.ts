export type Species =
  | "cachorros"
  | "gatos"
  | "passaros"
  | "peixes"
  | "coelhos-roedores"
  | "repteis";
export type Category =
  | "Ração"
  | "Petiscos"
  | "Higiene"
  | "Brinquedos"
  | "Casinhas e camas"
  | "Acessórios"
  | "Saúde";
export interface ProductImageData {
  src: string;
  viewBox?: string;
  width: number;
  height: number;
}
export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  species: Species[];
  category: Category;
  attributes: { tipo?: string; idade?: string; porte?: string; peso?: string };
  priceCents: number;
  salesRank: number;
  image: ProductImageData;
  description: string;
  isDemo: true;
  size: string;
  weightKg: number | null;
}
export interface CartItem {
  productId: string;
  quantity: number;
}
export type Fulfillment = "pickup" | "delivery";
export interface DeliveryConfig {
  enabled: boolean;
  area: string[];
  minimumCents: number | null;
  maximumWeightKg: number | null;
  feeCents: number | null;
  estimate: string | null;
  pickupInstructions: string | null;
}
