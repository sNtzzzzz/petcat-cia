import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { Product } from "./pages/Product";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Services } from "./pages/Services";
import { About, Contact, Legal, NotFound } from "./pages/Info";
import { Account } from "./pages/Account";
import { brand } from "./config/brand";
function Titles() {
  const { pathname } = useLocation();
  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (favicon) {
      favicon.href = brand.favicon;
      favicon.type = "image/svg+xml";
    }
    const names: Record<string, string> = {
      "/": "Pet shop em São Bernardo do Campo",
      "/catalogo": "Produtos",
      "/carrinho": "Meu carrinho",
      "/checkout": "Finalização demonstrativa",
      "/servicos": "Serviços e agenda",
      "/sobre": "Nossa loja",
      "/contato": "Contato",
      "/legal": "Informações provisórias",
      "/conta": "Login e cadastro demonstrativos",
    };
    document.title = `${names[pathname] ?? "Produtos e informações"} | Pet Cat & Cia`;
  }, [pathname]);
  return null;
}
export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Titles />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="catalogo" element={<Catalog />} />
            <Route path="especie/:species" element={<Catalog />} />
            <Route path="especie/:species/:category" element={<Catalog />} />
            <Route path="conta" element={<Account />} />
            <Route path="produto/:id" element={<Product />} />
            <Route path="carrinho" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="servicos" element={<Services />} />
            <Route path="sobre" element={<About />} />
            <Route path="contato" element={<Contact />} />
            <Route path="legal" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
