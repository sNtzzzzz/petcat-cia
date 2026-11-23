import { useEffect, useState } from "react";
import { brand } from "../config/brand";
import { BrandImage } from "./Brand";
const SESSION_KEY = "pet-cat-cia:intro:v2";
export function LoadingScreen() {
  const [visible, setVisible] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) !== "seen";
    } catch {
      return true;
    }
  });
  const [closing, setClosing] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let cancelled = false,
      completed = 0,
      minimumPassed = false,
      exiting = false;
    let fade: ReturnType<typeof setTimeout> | undefined;
    const mark = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, "seen");
      } catch {
        /* Navegação continua sem armazenamento. */
      }
    };
    const finish = (immediate = false) => {
      if (exiting || cancelled) return;
      exiting = true;
      mark();
      if (immediate || matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setVisible(false);
        return;
      }
      setClosing(true);
      fade = setTimeout(() => {
        if (!cancelled) setVisible(false);
      }, 160);
    };
    const done = () => {
      if (cancelled) return;
      completed++;
      setProgress((completed / 2) * 100);
      if (completed === 2 && minimumPassed) finish();
    };
    const hero = new Image();
    hero.src = brand.hero;
    hero.decode().then(done, done);
    document.fonts.ready.then(done, done);
    const minimum = setTimeout(() => {
      minimumPassed = true;
      if (completed === 2) finish();
    }, 600);
    const maximum = setTimeout(() => finish(), 1800);
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Tab" || event.key === "Escape") finish(true);
    };
    document.addEventListener("keydown", keyboard);
    return () => {
      cancelled = true;
      clearTimeout(minimum);
      clearTimeout(maximum);
      if (fade) clearTimeout(fade);
      document.removeEventListener("keydown", keyboard);
    };
  }, [visible]);
  if (!visible) return null;
  return (
    <div
      className={"loading-screen " + (closing ? "is-closing" : "")}
      data-testid="loading-screen"
      aria-hidden="true"
    >
      <BrandImage />
      <div className="loading-track">
        <span style={{ transform: "scaleX(" + progress / 100 + ")" }} />
      </div>
      <span className="loading-caption">
        Preparando uma visita cheia de carinho
      </span>
    </div>
  );
}
