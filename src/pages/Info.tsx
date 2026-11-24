import { Link, useSearchParams } from "react-router-dom";
import { MapPin, MessageCircle, PawPrint } from "lucide-react";
import { brand } from "../config/brand";
import { contact } from "../config/contact";
export function About() {
  return (
    <div className="container page">
      <div className="about-layout">
        <div>
          <span className="eyebrow">Pet Cat & Cia</span>
          <h1>
            Uma loja para quem
            <br />
            tem companhia em casa.
          </h1>
          <p>
            A Pet Cat & Cia é um pet shop em São Bernardo do Campo, SP. Esta é a
            primeira versão da sua experiência de compra online.
          </p>
          <p>
            O projeto desenvolvido pela SANTS Web Development reúne um catálogo
            de exemplo, carrinho e agenda demonstrativa para avaliação do
            cliente.
          </p>
          <div className="notice">
            <PawPrint aria-hidden="true" />
            <p>
              A história da loja, a equipe e os diferenciais oficiais serão
              adicionados após confirmação.
            </p>
          </div>
          <Link className="button" to="/catalogo">
            Conhecer os produtos
          </Link>
        </div>
        <img
          className="about-logo"
          src={brand.logo}
          alt="Logo provisória original da Petcat&Cia com os contatos impressos"
          width={brand.logoWidth}
          height={brand.logoHeight}
        />
      </div>
    </div>
  );
}
export function Contact() {
  return (
    <div className="container page">
      <div className="page-heading">
        <span className="eyebrow">Vamos conversar</span>
        <h1>Perto de você</h1>
        <p>
          Os canais oficiais da Pet Cat & Cia serão disponibilizados após
          confirmação.
        </p>
      </div>
      <div className="contact-grid">
        <section>
          <MessageCircle size={32} aria-hidden="true" />
          <h2>WhatsApp</h2>
          <p>{contact.phoneDisplay}</p>
          <span className="label">Contato a confirmar</span>
          <p>
            <a
              className="button"
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir WhatsApp · provisório
            </a>
          </p>
          <p>
            <a
              className="text-link"
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.instagram} · provisório
            </a>
          </p>
        </section>
        <section>
          <MapPin size={32} aria-hidden="true" />
          <h2>Nossa localização</h2>
          <p>São Bernardo do Campo, SP.</p>
          <p>
            Endereço completo, horário de funcionamento e orientações de
            retirada a confirmar.
          </p>
        </section>
      </div>
      <Link className="text-link" to="/">
        Voltar ao início
      </Link>
    </div>
  );
}
export function Legal() {
  const [params] = useSearchParams();
  const type = params.get("tipo");
  const title =
    type === "privacidade"
      ? "Privacidade"
      : type === "entrega"
        ? "Entrega e retirada"
        : "Termos de uso";
  return (
    <div className="container page legal-page">
      <span className="eyebrow">Informações provisórias</span>
      <h1>{title}</h1>
      <div className="notice">
        <p>
          Esta página descreve o funcionamento do protótipo e não substitui a
          política oficial da loja.
        </p>
      </div>
      {type === "privacidade" ? (
        <>
          <h2>Dados nesta demonstração</h2>
          <p>
            O carrinho é salvo no armazenamento local deste navegador. A tela
            inicial usa sessionStorage para aparecer uma vez por sessão. Os
            formulários de login e cadastro são demonstrativos: os dados
            digitados não são enviados nem salvos, e o campo de senha fica
            desativado. Use apenas dados fictícios. Não há autenticação,
            rastreamento analítico ou processamento de pagamentos.
          </p>
          <p>
            As imagens e a fonte estão hospedadas junto ao projeto. Links de
            WhatsApp e Instagram abrem serviços externos somente quando
            acionados. Você pode apagar o carrinho removendo os itens ou
            limpando os dados do site no navegador.
          </p>
          <p>
            A política definitiva e os responsáveis pelo tratamento de dados
            dependem de validação antes do lançamento.
          </p>
        </>
      ) : type === "entrega" ? (
        <>
          <h2>Condições a definir</h2>
          <p>
            É possível experimentar entrega e retirada no checkout. Área
            atendida, valor mínimo, limites de peso, frete, prazos e endereço de
            retirada não estão configurados.
          </p>
          <p>
            As referências de R$ 100 e 10 kg mencionadas no planejamento não são
            regras comerciais válidas nesta versão.
          </p>
        </>
      ) : (
        <>
          <h2>Uso demonstrativo</h2>
          <p>
            Produtos, preços, imagens e serviços são ilustrativos. O site não
            aceita pedidos, pagamentos ou reservas reais. A seleção de datas não
            bloqueia disponibilidade.
          </p>
          <p>
            Trocas, devoluções, cancelamentos e condições de compra serão
            definidos com a loja antes da publicação oficial.
          </p>
        </>
      )}
      <Link className="text-link" to="/">
        Voltar ao início
      </Link>
    </div>
  );
}
export function NotFound() {
  return (
    <div className="container page empty-state">
      <PawPrint size={44} aria-hidden="true" />
      <h1>Essa página saiu para passear</h1>
      <p>Use o menu para voltar aos produtos e serviços.</p>
      <Link className="button" to="/">
        Voltar ao início
      </Link>
    </div>
  );
}
