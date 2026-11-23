import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingBag, Info } from "lucide-react";
import { catalog } from "../services/catalog";
import { money } from "../utils/format";
import { useCart } from "../context/CartContext";
import { ProductImage } from "../components/ProductImage";
import { Quantity } from "../components/Quantity";
import { ProductCard } from "../components/ProductCard";
export function Product() {
  const { id } = useParams();
  const p = catalog.byId(id ?? "");
  const [quantity, setQuantity] = useState(1);
  const { add } = useCart();
  useEffect(() => setQuantity(1), [id]);
  if (!p)
    return (
      <div className="container page empty-state">
        <h1>Produto não encontrado</h1>
        <p>Este item não faz parte do catálogo demonstrativo.</p>
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
        <span>/</span>
        <span>{p.name}</span>
      </div>
      <div className="product-detail">
        <div className="detail-image">
          <span className="label">Imagem ilustrativa</span>
          <ProductImage product={p} />
        </div>
        <div className="detail-info">
          <span className="product-brand">{p.brand} · marca fictícia</span>
          <span className="eyebrow">{p.category}</span>
          <h1>{p.name}</h1>
          <span className="size-chip">{p.size}</span>
          <p>{p.description}</p>
          <dl className="product-attributes">
            {Object.entries(p.attributes).map(([key, value]) => (
              <div key={key}>
                <dt>
                  {
                    {
                      tipo: "Tipo",
                      idade: "Faixa etária",
                      porte: "Porte",
                      peso: "Peso da embalagem",
                    }[key]
                  }
                </dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <strong className="detail-price">{money(p.priceCents)}</strong>
          <span className="muted">Preço demonstrativo · sem cobrança</span>
          <div className="detail-actions">
            <Quantity name={p.name} value={quantity} onChange={setQuantity} />
            <button className="button" onClick={() => add(p.id, quantity)}>
              <ShoppingBag size={19} aria-hidden="true" />
              Adicionar ao carrinho
            </button>
          </div>
          <div className="notice">
            <Info size={20} aria-hidden="true" />
            <p>
              Estoque, entrega e informações técnicas ainda serão confirmados.
              Este produto não pode ser comprado nesta versão.
            </p>
          </div>
          <Link className="text-link" to="/carrinho">
            Ver meu carrinho
          </Link>
        </div>
      </div>
      <section className="section">
        <div className="section-heading">
          <h2>Mais itens para conhecer</h2>
          <Link to="/catalogo" className="text-link">
            Ver catálogo
          </Link>
        </div>
        <div className="product-grid">
          {catalog
            .all()
            .filter((item) => item.id !== p.id)
            .slice(0, 4)
            .map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </section>
    </div>
  );
}
