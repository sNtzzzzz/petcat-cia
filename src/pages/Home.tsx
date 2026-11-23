import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { Hero } from "../components/Hero";
import { ProductCard } from "../components/ProductCard";
import { CatalogImage } from "../components/ProductImage";
import { speciesIcons } from "../components/SpeciesNav";
import { catalog } from "../services/catalog";
import { demoImages } from "../data/products";
import { categoryConfig, speciesConfig } from "../config/catalog";
import type { Species } from "../types";
import { brand } from "../config/brand";
const categoryImages = [
  demoImages.food,
  demoImages.treat,
  demoImages.brush,
  demoImages.toy,
  demoImages.bed,
  demoImages.bowl,
];
export function Home() {
  const [otherSpecies, setOtherSpecies] = useState<Species>("passaros");
  return (
    <>
      <Hero />
      <div className="delivery-strip">
        <div className="container">
          <Truck size={23} aria-hidden="true" />
          <p>Entrega com praticidade, cuidado mais perto de você.*</p>
          <Link to="/legal?tipo=entrega">Confira as condições</Link>
        </div>
      </div>
      <section
        className="container section"
        aria-labelledby="bestsellers-title"
      >
        <div className="section-heading">
          <div>
            <h2 id="bestsellers-title">Mais vendidos</h2>
          </div>
          <Link className="text-link" to="/catalogo">
            Ver todos os produtos
          </Link>
        </div>
        <p className="demo-note">
        </p>
        <div className="product-grid">
          {catalog
            .all()
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>
      <section className="container section" aria-labelledby="categories-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Um cuidado para cada momento</span>
            <h2 id="categories-title">Encontre o que faz falta na rotina</h2>
          </div>
        </div>
        <div className="home-category-grid">
          {categoryConfig
            .filter((c) => c.slug !== "saude")
            .map((c, i) => (
              <Link
                key={c.slug}
                to={"/catalogo?categoria=" + c.slug}
                className="home-category-card"
              >
                <div>
                  <CatalogImage
                    image={categoryImages[i]}
                    label={"Imagem ilustrativa de " + c.name}
                  />
                </div>
                <span>{c.name}</span>
              </Link>
            ))}
        </div>
      </section>
      {(["gatos", "cachorros"] as const).map((s) => {
        const config = speciesConfig.find((item) => item.id === s)!;
        const Icon = speciesIcons[s];
        return (
          <section key={s} className={"species-home-section species-" + s}>
            <div className="container section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">
                    <Icon size={20} aria-hidden="true" />
                    {config.description}
                  </span>
                  <h2>
                    O universo dos {config.name.toLocaleLowerCase("pt-BR")}
                  </h2>
                </div>
                <Link className="text-link" to={"/especie/" + s}>
                  Ver tudo para {config.name.toLocaleLowerCase("pt-BR")}
                </Link>
              </div>
              <div className="product-grid">
                {catalog
                  .search({ species: s })
                  .slice(0, 4)
                  .map((p) => (
                    <ProductCard product={p} key={p.id} />
                  ))}
              </div>
            </div>
          </section>
        );
      })}
      <section className="container section other-species">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Outras formas de companhia</span>
            <h2>Pequenos mundos, muitos cuidados</h2>
          </div>
        </div>
        <div
          className="species-tabs"
          role="group"
          aria-label="Escolher outra espécie"
        >
          {speciesConfig.slice(2).map((s) => {
            const Icon = speciesIcons[s.id];
            return (
              <button
                key={s.id}
                className={"species-" + s.id}
                aria-pressed={otherSpecies === s.id}
                onClick={() => setOtherSpecies(s.id)}
              >
                <Icon size={22} aria-hidden="true" />
                {s.shortName}
              </button>
            );
          })}
        </div>
        <div className="other-species-heading">
          <Link className="text-link" to={"/especie/" + otherSpecies}>
            Ver seleção completa
          </Link>
        </div>
        <div className="product-grid">
          {catalog
            .search({ species: otherSpecies })
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>
      <section className="container section" aria-labelledby="brands-title">
        <div className="section-heading">
          <div>
            <h2 id="brands-title">Marcas mais famosas</h2>
          </div>
        </div>
        <div className="brand-cards">
          {[
            {
              name: "Marca A",
              image: demoImages.food,
              word: "MARCA A",
              caption: "Alimentação · exemplo",
            },
            {
              name: "Marca B",
              image: demoImages.bed,
              word: "marca b.",
              caption: "Acessórios · exemplo",
            },
            {
              name: "Marca C",
              image: demoImages.bowl,
              word: "Marca C",
              caption: "Outras companhias · exemplo",
            },
          ].map((b) => (
            <Link
              className="demo-brand-card"
              key={b.name}
              to={"/catalogo?marca=" + encodeURIComponent(b.name)}
            >
              <div>
                <CatalogImage
                  image={b.image}
                  label={"Imagem ilustrativa para " + b.name}
                />
              </div>
              <strong>{b.word}</strong>
              <span>{b.caption}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="container section service-teaser">
        <div className="service-photo">
          <img
            src={brand.hero}
            alt="Conceito ilustrativo de um cachorro no banho"
            width="1536"
            height="1024"
            loading="lazy"
          />
        </div>
        <div className="service-copy">
          <span className="eyebrow">Um momento só para ele</span>
          <h2>
            Um banho de carinho.
            <br />E uma pausa na rotina.
          </h2>
          <p>
            Conheça a proposta de banho e cuidados e experimente escolher uma
            data.
          </p>
          <Link className="button" to="/servicos">
            Conhecer serviços
          </Link>
          <span className="demo-note">
            Serviços e horários a confirmar. Nenhuma reserva real.
          </span>
        </div>
      </section>
      <section className="container section values-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Nossa proposta para a loja</span>
            <h2>Cuidado de perto, todos os dias</h2>
          </div>
        </div>
        <div className="values-grid">
          <article>
            <Heart aria-hidden="true" />
            <h3>Atenção a cada companhia</h3>
            <p>Um espaço organizado para conhecer o cuidado de cada espécie.</p>
          </article>
          <article>
            <PackageCheck aria-hidden="true" />
            <h3>Escolhas para a sua rotina</h3>
            <p>
              Alimentação, higiene e diversão reunidas em uma só experiência.
            </p>
          </article>
          <article>
            <ShieldCheck aria-hidden="true" />
            <h3>Clareza em cada etapa</h3>
            <p>
              Condições de compra e atendimento a confirmar antes do lançamento.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
