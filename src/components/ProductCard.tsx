import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";
import { money } from "../utils/format";
import { ProductImage } from "./ProductImage";
export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <article
      className="product-card"
      data-product-id={product.id}
      data-sales-rank={product.salesRank}
    >
      <Link
        className="product-visual"
        to={`/produto/${product.id}`}
        aria-label={`Ver detalhes de ${product.name}`}
      >
        <ProductImage product={product} />
      </Link>
      <div className="product-info">
        <span className="product-brand">{product.brand} · fictícia</span>
        <span className="eyebrow small">{product.category}</span>
        <h3>
          <Link to={`/produto/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="product-size">{product.size}</p>
        <div className="price-row">
          <strong>{money(product.priceCents)}</strong>
          <button
            className="add-button"
            onClick={() => add(product.id)}
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <Plus size={20} aria-hidden="true" />
            <span>Adicionar</span>
          </button>
        </div>
      </div>
    </article>
  );
}
