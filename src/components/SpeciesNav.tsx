import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bird,
  Cat,
  ChevronDown,
  Dog,
  Fish,
  Rabbit,
  Turtle,
} from "lucide-react";
import { categoryConfig, listingUrl, speciesConfig } from "../config/catalog";
import type { Species } from "../types";
export const speciesIcons = {
  cachorros: Dog,
  gatos: Cat,
  passaros: Bird,
  peixes: Fish,
  "coelhos-roedores": Rabbit,
  repteis: Turtle,
};
export function SpeciesNav() {
  const [open, setOpen] = useState<Species | null>(null);
  const refs = useRef<Partial<Record<Species, HTMLButtonElement | null>>>({});
  const suppressFocus = useRef(false);
  const location = useLocation();
  useEffect(() => setOpen(null), [location.pathname, location.search]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      suppressFocus.current = true;
      setOpen(null);
      refs.current[open]?.focus();
      queueMicrotask(() => { suppressFocus.current = false; });
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <nav
      className="species-nav"
      aria-label="Comprar por espécie"
      onMouseLeave={() => {
        if (!document.activeElement?.closest(".species-nav")) setOpen(null);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(null);
      }}
    >
      <div className="container species-list">
        {speciesConfig.map((s) => {
          const Icon = speciesIcons[s.id];
          return (
            <div
              className={"species-item species-" + s.id}
              key={s.id}
              onMouseEnter={() => {
                if (matchMedia("(hover: hover) and (min-width: 801px)").matches) setOpen(s.id);
              }}
            >
              <button
                ref={(el) => {
                  refs.current[s.id] = el;
                }}
                className="species-trigger"
                aria-expanded={open === s.id}
                aria-controls={"species-panel-" + s.id}
                onFocus={() => {
                  if (
                    !suppressFocus.current &&
                    matchMedia("(hover: hover) and (min-width: 801px)").matches
                  )
                    setOpen(s.id);
                }}
                onClick={() => setOpen(open === s.id ? null : s.id)}
              >
                <Icon size={23} aria-hidden="true" />
                <span>{s.shortName}</span>
                <ChevronDown size={14} aria-hidden="true" />
              </button>
              <div
                id={"species-panel-" + s.id}
                className="species-panel"
                hidden={open !== s.id}
              >
                <div className="species-panel-intro">
                  <Icon size={40} aria-hidden="true" />
                  <strong>{s.name}</strong>
                  <p>{s.description}</p>
                  <Link to={listingUrl(s.id)}>
                    Ver todos de {s.name.toLocaleLowerCase("pt-BR")}
                  </Link>
                </div>
                <div className="species-category-links">
                  {categoryConfig.map((c) => (
                    <Link key={c.slug} to={listingUrl(s.id, c.slug)}>
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}



