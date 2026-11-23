import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  categoryConfig,
  categoryName,
  categorySlug,
  listingUrl,
  speciesConfig,
  speciesName,
} from "../config/catalog";
import { categoryFilters, filterLabels, priceOptions } from "../config/filters";
import type { FilterKey } from "../config/filters";
import { catalog, filterValue } from "../services/catalog";
import { ProductCard } from "../components/ProductCard";
export function Catalog() {
  const route = useParams();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const species = route.species ?? params.get("especie") ?? "";
  const categoryKey = route.category ?? params.get("categoria") ?? "";
  const category = categoryName(categoryKey);
  const query = params.get("q") ?? "";
  const sort = params.get("ordem") ?? "";
  const filterKeys: FilterKey[] = category
    ? categoryFilters[category]
    : ["marca", "preco"];
  const base = catalog.search({ species, category });
  const options = (key: FilterKey) =>
    key === "preco"
      ? priceOptions
      : [...new Set(base.map((p) => filterValue(p, key)).filter(Boolean))]
          .sort()
          .map((value) => ({ value, label: value }));
  const filters = Object.fromEntries(
    filterKeys.map((key) => [key, params.get(key) ?? ""]),
  );
  const results = catalog.search({ query, species, category, sort, filters });
  function change(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  }
  const title = category
    ? category +
      " para " +
      (speciesName(species)?.toLocaleLowerCase("pt-BR") ?? "seu pet")
    : species
      ? "Tudo para " + speciesName(species)?.toLocaleLowerCase("pt-BR")
      : "Produtos para seu pet";
  if (
    (route.species && !speciesName(route.species)) ||
    (route.category && !category)
  )
    return (
      <div className="container page empty-state">
        <h1>Seleção não encontrada</h1>
        <p>Escolha uma espécie ou categoria do catálogo.</p>
        <Link className="button" to="/catalogo">
          Ver produtos
        </Link>
      </div>
    );
  return (
    <div className="container page">
      <div className="breadcrumb">
        <Link to="/">Início</Link>
        <span>/</span>
        <Link to="/catalogo">Produtos</Link>
        {species && (
          <>
            <span>/</span>
            <Link to={listingUrl(species)}>{speciesName(species)}</Link>
          </>
        )}
        {category && (
          <>
            <span>/</span>
            <span>{category}</span>
          </>
        )}
      </div>
      <div className="page-heading">
        <span className="eyebrow">Cuidado para todos os dias</span>
        <h1>{title}</h1>
        <p>
          {category === "Saúde"
            ? "Espaço demonstrativo, sem medicamentos ou alegações médicas. Catálogo e regras de venda a confirmar."
            : "Produtos, marcas, preços e ordem de vendas são demonstrativos."}
        </p>
      </div>
      <div className="catalog-layout">
        <aside className="catalog-sidebar">
          <h2>
            <SlidersHorizontal size={18} aria-hidden="true" />
            Encontre do seu jeito
          </h2>
          <div className="field">
            <label htmlFor="species-filter">Espécie</label>
            <select
              id="species-filter"
              value={species}
              onChange={(e) =>
                navigate(listingUrl(e.target.value, categoryKey))
              }
            >
              <option value="">Todas as espécies</option>
              {speciesConfig.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <h3 className="filter-heading">Categorias</h3>
          <div className="filter-list">
            <Link
              className={!category ? "selected" : ""}
              to={listingUrl(species)}
            >
              Todos os produtos
            </Link>
            {categoryConfig.map((c) => (
              <Link
                key={c.slug}
                className={category === c.name ? "selected" : ""}
                to={listingUrl(species, c.slug)}
              >
                {c.name}
                <span>
                  {catalog.search({ species, category: c.name }).length}
                </span>
              </Link>
            ))}
          </div>
          <div className="attribute-filters">
            {filterKeys
              .filter((key) => options(key).length > 0)
              .map((key) => (
                <div className="field" key={key}>
                  <label htmlFor={"filter-" + key}>{filterLabels[key]}</label>
                  <select
                    id={"filter-" + key}
                    value={params.get(key) ?? ""}
                    onChange={(e) => change(key, e.target.value)}
                  >
                    <option value="">Todas as opções</option>
                    {options(key).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
          </div>
          <button
            className="text-link"
            onClick={() => {
              const next = new URLSearchParams();
              if (!route.species && species) next.set("especie", species);
              if (!route.category && category)
                next.set("categoria", categorySlug(category));
              setParams(next);
            }}
          >
            Limpar filtros
          </button>
        </aside>
        <section aria-label="Resultados do catálogo">
          <div className="catalog-tools">
            <div className="field search-field">
              <label htmlFor="catalog-search">Buscar no catálogo</label>
              <div>
                <Search size={19} aria-hidden="true" />
                <input
                  id="catalog-search"
                  name="catalog-search"
                  type="search"
                  autoComplete="off"
                  placeholder="Ex.: ração para gatos…"
                  value={query}
                  onChange={(e) => change("q", e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="sort">Ordenar por</label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => change("ordem", e.target.value)}
              >
                <option value="">Mais vendidos · demo</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
              </select>
            </div>
          </div>
          <p className="result-count" role="status">
            {results.length}{" "}
            {results.length === 1
              ? "produto encontrado"
              : "produtos encontrados"}
            {species ? " para " + speciesName(species) : ""}
          </p>
          {results.length ? (
            <div className="product-grid catalog-products">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Search size={38} aria-hidden="true" />
              <h2>Nenhum produto por aqui</h2>
              <p>
                {category === "Saúde"
                  ? "Esta categoria ainda não possui itens. Nenhum medicamento é vendido neste protótipo."
                  : "Tente outra combinação ou remova os filtros para continuar."}
              </p>
              <button
                className="button secondary"
                onClick={() => navigate(listingUrl(species))}
              >
                Ver todos desta seleção
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
