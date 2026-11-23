import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { catalog } from "../services/catalog";
import { money } from "../utils/format";
import { Quantity } from "../components/Quantity";
import { ProductImage } from "../components/ProductImage";
export function Cart() {
  const { items, subtotal, count, setQuantity, remove } = useCart();
  return (
    <div className="container page">
      <div className="breadcrumb">
        <Link to="/">Início</Link>
        <span>/</span>
        <span>Carrinho</span>
      </div>
      <div className="page-heading">
        <span className="eyebrow">Suas escolhas, reunidas</span>
        <h1>Meu carrinho</h1>
        <p>
          {count} {count === 1 ? "item selecionado" : "itens selecionados"} para
          a demonstração.
        </p>
      </div>
      {!items.length ? (
        <div className="empty-state">
          <ShoppingBag size={48} aria-hidden="true" />
          <h2>Seu carrinho está esperando por carinho</h2>
          <p>Escolha um produto para experimentar a loja.</p>
          <Link className="button" to="/catalogo">
            Ver produtos
          </Link>
        </div>
      ) : (
        <div className="checkout-layout">
          <section aria-label="Produtos do carrinho" className="cart-items">
            {items.map((item) => {
              const p = catalog.byId(item.productId)!;
              return (
                <article className="cart-item" key={p.id}>
                  <Link
                    to={`/produto/${p.id}`}
                    aria-label={`Ver ${p.name}`}
                    className="cart-image"
                  >
                    <ProductImage product={p} />
                  </Link>
                  <div className="cart-description">
                    <span className="eyebrow small">{p.category}</span>
                    <h2>
                      <Link to={`/produto/${p.id}`}>{p.name}</Link>
                    </h2>
                    <p>
                      {p.size} · {money(p.priceCents)} por unidade
                    </p>
                    <button
                      className="remove-button"
                      onClick={() => remove(p.id)}
                      aria-label={`Remover ${p.name}`}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                      Remover
                    </button>
                  </div>
                  <Quantity
                    name={p.name}
                    value={item.quantity}
                    onChange={(value) => setQuantity(p.id, value)}
                  />
                  <strong className="line-total">
                    {money(p.priceCents * item.quantity)}
                  </strong>
                </article>
              );
            })}
            <Link to="/catalogo" className="text-link">
              Continuar comprando
            </Link>
          </section>
          <aside className="order-summary">
            <h2>Resumo do carrinho</h2>
            <div className="summary-row">
              <span>Subtotal ({count} itens)</span>
              <strong>{money(subtotal)}</strong>
            </div>
            <div className="summary-row">
              <span>Entrega</span>
              <span>A definir</span>
            </div>
            <div className="summary-total">
              <span>Subtotal dos produtos</span>
              <strong>{money(subtotal)}</strong>
            </div>
            <Link className="button full" to="/checkout">
              Avançar à demonstração
            </Link>
            <p className="summary-note">
              <ShieldCheck size={18} aria-hidden="true" />
              Nenhum pedido ou pagamento será realizado.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
