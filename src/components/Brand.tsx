import { useId } from "react";
import { Link } from "react-router-dom";
import { brand } from "../config/brand";
export function BrandImage({
  className = "",
  header = false,
}: {
  className?: string;
  header?: boolean;
}) {
  const clip = useId();
  const [x, y, width, height] = brand.logoViewBox.split(" ").map(Number);
  if (header)
    return (
      <svg
        className={"brand-image brand-image-header " + className}
        viewBox={brand.headerLogoViewBox}
        width="190"
        height="96"
        role="img"
        aria-label="Petcat&Cia"
      >
        <image
          href={brand.headerLogo}
          width={brand.headerLogoWidth}
          height={brand.headerLogoHeight}
        />
      </svg>
    );
  return (
    <svg
      className={"brand-image " + className}
      viewBox={brand.logoViewBox}
      width="190"
      height="116"
      role="img"
      aria-label="Petcat&Cia — logo provisória fornecida pela loja"
    >
      <defs>
        <clipPath id={clip}>
          <rect x={x} y={y} width={width} height={height} />
        </clipPath>
      </defs>
      <image
        href={brand.logo}
        width={brand.logoWidth}
        height={brand.logoHeight}
        clipPath={"url(#" + clip + ")"}
      />
    </svg>
  );
}
export function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Pet Cat & Cia, início">
      <BrandImage header />
    </Link>
  );
}
