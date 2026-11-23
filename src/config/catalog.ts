import type { Category, Species } from "../types";
export const speciesConfig: {
  id: Species;
  name: string;
  shortName: string;
  description: string;
}[] = [
  {
    id: "cachorros",
    name: "Cachorros",
    shortName: "Cachorros",
    description: "Do passeio à hora de descansar.",
  },
  {
    id: "gatos",
    name: "Gatos",
    shortName: "Gatos",
    description: "Para os pequenos donos da casa.",
  },
  {
    id: "passaros",
    name: "Pássaros",
    shortName: "Pássaros",
    description: "Cuidado para outras companhias.",
  },
  {
    id: "peixes",
    name: "Peixes",
    shortName: "Peixes",
    description: "Um universo para conhecer.",
  },
  {
    id: "coelhos-roedores",
    name: "Coelhos e roedores",
    shortName: "Coelhos / roedores",
    description: "Pequenos no tamanho, grandes na companhia.",
  },
  {
    id: "repteis",
    name: "Répteis",
    shortName: "Répteis",
    description: "Cada espécie tem seu cuidado.",
  },
];
export const categoryConfig: { name: Category; slug: string }[] = [
  { name: "Ração", slug: "racao" },
  { name: "Petiscos", slug: "petiscos" },
  { name: "Higiene", slug: "higiene" },
  { name: "Brinquedos", slug: "brinquedos" },
  { name: "Casinhas e camas", slug: "casinhas-e-camas" },
  { name: "Acessórios", slug: "acessorios" },
  { name: "Saúde", slug: "saude" },
];
export const categorySlug = (name: Category) =>
  categoryConfig.find((c) => c.name === name)!.slug;
export const categoryName = (slug: string) =>
  categoryConfig.find((c) => c.slug === slug)?.name;
export const speciesName = (id: string) =>
  speciesConfig.find((s) => s.id === id)?.name;
export const listingUrl = (species?: string, category?: string) =>
  species
    ? "/especie/" + species + (category ? "/" + category : "")
    : "/catalogo" + (category ? "?categoria=" + category : "");
