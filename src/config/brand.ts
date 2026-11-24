const asset = (path: string) => import.meta.env.BASE_URL + path;

export const brand = {
  name: "Pet Cat & Cia",
  logo: asset("brand/logo-provisoria.png"),
  logoWidth: 642,
  logoHeight: 640,
  // Enquadramento visual: o raster original permanece intacto.
  logoViewBox: "65 75 510 310",
  headerLogo: asset("brand/logo-header-transparente.png"),
  headerLogoWidth: 2172,
  headerLogoHeight: 724,
  // Remove apenas as margens transparentes do arquivo durante a exibição.
  headerLogoViewBox: "443 35 1290 648",
  favicon: asset("favicon.svg"),
  hero: asset("images/hero-banho-recorte.png"),
  provisional: true,
};

