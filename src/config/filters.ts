import type { Category } from "../types";
export type FilterKey = "tipo" | "marca" | "idade" | "porte" | "peso" | "preco";
export const filterLabels: Record<FilterKey, string> = {
  tipo: "Tipo",
  marca: "Marca",
  idade: "Faixa etária",
  porte: "Porte",
  peso: "Peso da embalagem",
  preco: "Faixa de preço",
};
export const categoryFilters: Record<Category, FilterKey[]> = {
  Ração: ["tipo", "marca", "idade", "porte", "peso", "preco"],
  Petiscos: ["tipo", "marca", "idade", "preco"],
  Higiene: ["tipo", "marca", "preco"],
  Brinquedos: ["tipo", "marca", "porte", "preco"],
  "Casinhas e camas": ["marca", "porte", "preco"],
  Acessórios: ["tipo", "marca", "preco"],
  Saúde: ["marca", "preco"],
};
export const priceOptions = [
  { value: "ate-25", label: "Até R$ 25" },
  { value: "25-50", label: "De R$ 25 a R$ 50" },
  { value: "acima-50", label: "Acima de R$ 50" },
];
