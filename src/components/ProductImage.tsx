import { useId } from "react";
import type { Product, ProductImageData } from "../types";
export function CatalogImage({
  image,
  label,
}: {
  image: ProductImageData;
  label: string;
}) {
  const clip = useId();
  if (!image.viewBox)
    return (
      <img
        src={image.src}
        alt={label}
        width={image.width}
        height={image.height}
        loading="lazy"
        className="product-image"
      />
    );
  const [x, y, width, height] = image.viewBox.split(" ").map(Number);
  return (
    <svg
      className="product-image"
      viewBox={image.viewBox}
      role="img"
      aria-label={label}
    >
      <defs>
        <clipPath id={clip}>
          <rect x={x} y={y} width={width} height={height} />
        </clipPath>
      </defs>
      <image
        href={image.src}
        width={image.width}
        height={image.height}
        clipPath={"url(#" + clip + ")"}
      />
    </svg>
  );
}
export function ProductImage({ product }: { product: Product }) {
  return (
    <CatalogImage
      image={product.image}
      label={"Imagem ilustrativa de " + product.name + ", " + product.size}
    />
  );
}
