import { useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Info,
} from "lucide-react";
import { illustrativeServices } from "../config/booking";
import { demoAvailability } from "../services/availability";
import { dateKey, longDate, todayInSaoPaulo } from "../utils/format";
export function Calendar() {
  const [today] = useState(todayInSaoPaulo);
  const [month, setMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selected, setSelected] = useState<Date | null>(null);
  const [slot, setSlot] = useState("");
  const [service, setService] = useState(illustrativeServices[0]);
  const start = month.getDay();
  const count = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();
  const title = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(month);
  const move = (step: number) =>
    setMonth(new Date(month.getFullYear(), month.getMonth() + step, 1));
  return (
    <div className="booking-layout">
      <section className="calendar-panel" aria-labelledby="calendar-title">
        <div className="field">
          <label htmlFor="service">Serviço ilustrativo</label>
          <select
            id="service"
            value={service}
            onChange={(e) => {
              setService(e.target.value);
              setSlot("");
            }}
          >
            {illustrativeServices.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="calendar-header">
          <h2 id="calendar-title" aria-live="polite">
            {title}
          </h2>
          <div>
            <button
              className="icon-button"
              aria-label="Mês anterior"
              onClick={() => move(-1)}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              className="icon-button"
              aria-label="Próximo mês"
              onClick={() => move(1)}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="calendar-week" aria-hidden="true">
          {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
        <div
          className="calendar-grid"
          role="group"
          aria-label={`Datas de ${title}`}
        >
          {Array.from({ length: start }, (_, i) => (
            <span key={`blank-${i}`} />
          ))}
          {Array.from({ length: count }, (_, i) => {
            const date = new Date(month.getFullYear(), month.getMonth(), i + 1);
            const isToday = dateKey(date) === dateKey(today);
            const isSelected =
              selected !== null && dateKey(date) === dateKey(selected);
            return (
              <button
                key={i}
                disabled={date < today}
                aria-label={longDate(date)}
                aria-pressed={isSelected}
                aria-current={isToday ? "date" : undefined}
                className={`${isSelected ? "selected" : ""} ${isToday ? "today" : ""}`}
                onClick={() => {
                  setSelected(date);
                  setSlot("");
                }}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
        <div className="calendar-legend">
          <span>
            <i />
            Hoje
          </span>
          <span>
            <i className="filled" />
            Data selecionada
          </span>
        </div>
        <button
          className="text-link"
          onClick={() =>
            setMonth(new Date(today.getFullYear(), today.getMonth(), 1))
          }
        >
          Voltar ao mês atual
        </button>
      </section>
      <section className="slots-panel" aria-labelledby="slots-title">
        <h2 id="slots-title">Horários disponíveis</h2>
        <p>
          {selected
            ? longDate(selected)
            : "Selecione uma data no calendário para visualizar os horários."}
        </p>
        {selected ? (
          <div
            className="slots"
            role="group"
            aria-label="Horários ilustrativos"
          >
            {demoAvailability.getSlots(selected, service).map((s) => (
              <button
                key={s}
                aria-pressed={slot === s}
                className={slot === s ? "selected" : ""}
                onClick={() => setSlot(s)}
              >
                <Clock3 size={17} aria-hidden="true" />
                {s}
              </button>
            ))}
          </div>
        ) : (
          <div className="slot-empty">
            <CalendarDays size={38} aria-hidden="true" />
            <span>A primeira escolha é o dia.</span>
          </div>
        )}
        <div className="booking-summary" role="status" aria-live="polite">
          <h3>Sua seleção</h3>
          <dl>
            <div>
              <dt>Serviço</dt>
              <dd>{service}</dd>
            </div>
            <div>
              <dt>Data</dt>
              <dd>{selected ? longDate(selected) : "A escolher"}</dd>
            </div>
            <div>
              <dt>Horário</dt>
              <dd>{slot || "A escolher"}</dd>
            </div>
          </dl>
          <p>
            {selected && slot
              ? "Seleção demonstrativa completa. Nenhum horário foi reservado."
              : "Escolha uma data e um horário para visualizar o resumo."}
          </p>
        </div>
        <div className="notice">
          <Info size={20} aria-hidden="true" />
          <p>
            Agenda de demonstração. Os horários não indicam disponibilidade real
            e não são reservados.
          </p>
        </div>
      </section>
    </div>
  );
}
