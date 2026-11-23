import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Pause, Play} from "lucide-react";
import { brand } from "../config/brand";
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  const [paused, setPaused] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    if (ref.current) observer.observe(ref.current);
    const visibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return (
    <section
      ref={ref}
      className={
        "bath-hero " + (!inView || paused || !tabVisible ? "motion-paused" : "")
      }
      aria-labelledby="hero-title"
    >
      <div className="container bath-hero-inner">
        <div className="hero-art">
          <div className="hero-backdrop-type" aria-hidden="true">
            banho de carinho.
          </div>
          <img
            src={brand.hero}
            width="1536"
            height="1024"
            alt="Imagem ilustrativa gerada de um filhote em uma banheira com espuma"
            fetchPriority="high"
          />
          <div className="bubble-field" aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className={"bubble bubble-" + i} />
            ))}
          </div>
          <button
            className="bubble-control"
            onClick={() => setPaused(!paused)}
            aria-label={
              paused
                ? "Retomar animação das bolhas"
                : "Pausar animação das bolhas"
            }
          >
            {paused ? (
              <Play size={15} aria-hidden="true" />
            ) : (
              <Pause size={15} aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="hero-bottom">
          <div>
            <h1 id="hero-title">
              Para todas as formas
              <br />
              de fazer companhia.
            </h1>
          </div>
          <div className="hero-actions">
            <Link className="button" to="/catalogo">
              Ver produtos
            </Link>
            <Link className="button secondary" to="/servicos">
              Conhecer serviços
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}