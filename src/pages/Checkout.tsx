import { useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Info, LockKeyhole, Store, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { catalog } from "../services/catalog";
import { deliveryConfig } from "../config/delivery";
import { money } from "../utils/format";
import type { Fulfillment } from "../types";
export function Checkout() {
  const { items, subtotal, count } = useCart();
  const [mode, setMode] = useState<Fulfillment>("pickup");
  if (!items.length)
    return (
      <div className="container page empty-state">
        <h1>Seu carrinho está vazio</h1>
        <p>Adicione um produto antes de conhecer a finalização.</p>
        <Link className="button" to="/catalogo">
          Ver produtos
        </Link>
      </div>
    );
  return (
    <div className="container page">
      <div className="breadcrumb">
        <Link to="/carrinho">Carrinho</Link>
        <span>/</span>
        <span>Finalização demonstrativa</span>
      </div>
      <div className="page-heading">
        <span className="eyebrow">Uma prévia da próxima etapa</span>
        <h1>Como você prefere receber?</h1>
        <p>Experimente as opções. Esta simulação não gera pedido ou reserva.</p>
      </div>
      <div className="checkout-layout">
        <div>
          <fieldset className="fulfillment">
            <legend>Entrega ou retirada</legend>
            <label className={mode === "pickup" ? "selected" : ""}>
              <input
                type="radio"
                name="fulfillment"
                value="pickup"
                checked={mode === "pickup"}
                onChange={() => setMode("pickup")}
              />
              <Store aria-hidden="true" />
              <span>
                <strong>Retirada na loja</strong>
                <small>Endereço e horários a confirmar</small>
              </span>
            </label>
            <label className={mode === "delivery" ? "selected" : ""}>
              <input
                type="radio"
                name="fulfillment"
                value="delivery"
                checked={mode === "delivery"}
                onChange={() => setMode("delivery")}
              />
              <Truck aria-hidden="true" />
              <span>
                <strong>Entrega</strong>
                <small>Disponibilidade sujeita à confirmação</small>
              </span>
            </label>
          </fieldset>
          <div className="notice" role="status">
            <Info size={21} aria-hidden="true" />
            <p>
              {mode === "pickup"
                ? (deliveryConfig.pickupInstructions ??
                  "A retirada é ilustrativa. O endereço, os horários e as condições serão informados após aprovação da loja.")
                : "A área atendida, o frete, o prazo e as restrições de peso ainda não estão configurados. Nenhuma entrega está sendo prometida."}
            </p>
          </div>
          <section className="payment-panel">
            <h2>Pagamento</h2>
            <p>
              Estas são possibilidades para uma etapa futura, ainda sujeitas à
              aprovação.
            </p>
            <div className="future-payments">
              <span>Pix · futuro</span>
              <span>
                <CreditCard size={17} aria-hidden="true" />
                Cartão · futuro
              </span>
            </div>
            <div className="payment-unavailable">
              <LockKeyhole size={22} aria-hidden="true" />
              <div>
                <strong>Pagamento indisponível no protótipo</strong>
                <p>Nenhuma cobrança, QR Code ou coleta de dados de cartão.</p>
              </div>
            </div>
          </section>
          <Link className="text-link" to="/carrinho">
            Voltar ao carrinho
          </Link>
        </div>
        <aside className="order-summary">
          <h2>Resumo da simulação</h2>
          <div className="summary-products">
            {items.map((i) => (
              <div key={i.productId}>
                <span>
                  {i.quantity}× {catalog.byId(i.productId)!.name}
                </span>
                <strong>
                  {money(catalog.byId(i.productId)!.priceCents * i.quantity)}
                </strong>
              </div>
            ))}
          </div>
          <div className="summary-row">
            <span>Quantidade total</span>
            <strong>{count}</strong>
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{money(subtotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Modalidade</span>
            <strong>
              {mode === "pickup" ? "Retirada na loja" : "Entrega"}
            </strong>
          </div>
          <div className="summary-row">
            <span>{mode === "pickup" ? "Condições" : "Frete e prazo"}</span>
            <span>A confirmar</span>
          </div>
          <div className="summary-total">
            <span>
              Total demonstrativo
              <br />
              <small>Somente produtos</small>
            </span>
            <strong>{money(subtotal)}</strong>
          </div>
          <p className="demo-note">
            {mode === "delivery"
              ? "Frete não incluído. O total final depende da configuração de entrega."
              : "Valor ilustrativo, sujeito às condições oficiais de retirada."}
          </p>
          <button className="button full" disabled>
            Pagamento indisponível
          </button>
          <p className="summary-note">
            Você pode revisar a seleção, mas não finalizar uma compra.
          </p>
        </aside>
      </div>
    </div>
  );
}
