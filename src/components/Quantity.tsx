import { Minus, Plus } from "lucide-react";
export function Quantity({
  value,
  onChange,
  name,
}: {
  value: number;
  onChange: (n: number) => void;
  name: string;
}) {
  return (
    <div className="quantity" role="group" aria-label={`Quantidade de ${name}`}>
      <button
        type="button"
        aria-label={`Diminuir quantidade de ${name}`}
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <output aria-label={`Quantidade de ${name}`} aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        aria-label={`Aumentar quantidade de ${name}`}
        disabled={value >= 99}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
