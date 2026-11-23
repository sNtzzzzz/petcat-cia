import { Calendar } from "../components/Calendar";
import { Link } from "react-router-dom";
import { Bath, Scissors, Sparkles } from "lucide-react";
import { bookingConfig } from "../config/booking";
import { contact } from "../config/contact";
export function Services() {
  return (
    <div className="container page">
      <div className="breadcrumb">
        <Link to="/">Início</Link>
        <span>/</span>
        <span>Serviços & cuidados</span>
      </div>
      <div className="page-heading">
        <span className="eyebrow">Carinho também tem seu momento</span>
        <h1>Uma pausa para cuidar</h1>
        <p>
        </p>
      </div>
      <div className="service-options">
        {[
          {
            name: "Banho",
            icon: Bath,
            text: "Um momento de limpeza e cuidado.",
          },
          {
            name: "Banho e tosa",
            icon: Scissors,
            text: "Uma proposta para a rotina de higiene.",
          },
          {
            name: "Cuidados de higiene",
            icon: Sparkles,
            text: "Atenção aos pequenos detalhes.",
          },
        ].map((s) => (
          <article key={s.name}>
            <s.icon size={27} aria-hidden="true" />
            <div>
              <h2>{s.name}</h2>
              <p>{s.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="booking-intro">
        <div>
          <h2>
            {bookingConfig.bookingMode === "calendar"
              ? "Experimente escolher uma data"
              : "Converse sobre os cuidados"}
          </h2>
        </div>
      </div>
      {bookingConfig.bookingMode === "calendar" ? (
        <Calendar />
      ) : (
        <div className="booking-whatsapp">
          <p>
            Consulte os serviços e condições pelo contato provisório. Este botão
            não agenda nem confirma um atendimento.
          </p>
          <a
            className="button"
            href={contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir WhatsApp · provisório
          </a>
        </div>
      )}
    </div>
  );
}
