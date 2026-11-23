import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Check,
  MapPin,
  Menu,
  MessageCircle,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { storeConfig } from "../config/store";
import { contact } from "../config/contact";
import { Brand } from "./Brand";
import { SpeciesNav } from "./SpeciesNav";
import { LoadingScreen } from "./LoadingScreen";
export function Layout() {
  const { count, toast, undo, storageFailed } = useCart();
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  useEffect(() => {
    setMenu(false);
    if (previousPath.current !== location.pathname) {
      document.getElementById("main")?.focus({ preventScroll: true });
      window.scrollTo({ top: 0 });
      previousPath.current = location.pathname;
    }
  }, [location.pathname]);
  useEffect(() => {
    setQuery(new URLSearchParams(location.search).get("q") ?? "");
  }, [location.search]);
  return (
    <>
      <a className="skip-link" href="#main">
        Pular para o conteúdo
      </a>
      <LoadingScreen />
      <div className="announcement">
        <span className="demo-pill">
          Loja demonstrativa · sem compras reais
        </span>
      </div>
      <header className="header">
        <div className="container header-main">
          <Brand />
          <form
            className="header-search"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(
                "/catalogo" +
                  (query.trim()
                    ? "?q=" + encodeURIComponent(query.trim())
                    : ""),
              );
              setMenu(false);
            }}
          >
            <label className="sr-only" htmlFor="site-search">
              Buscar produtos
            </label>
            <input
              id="site-search"
              name="q"
              type="search"
              placeholder="O que seu pet precisa hoje?"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" aria-label="Pesquisar produtos">
              <Search size={21} aria-hidden="true" />
            </button>
          </form>
          <div className="account-access">
            <UserRound size={23} aria-hidden="true" />
            <div>
              <Link to="/conta?modo=entrar">Entrar</Link>
              <Link to="/conta?modo=cadastrar">Cadastre-se</Link>
            </div>
          </div>
          <a
            className="header-contact"
            href={contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir WhatsApp, contato provisório a confirmar"
          >
            <MessageCircle size={23} aria-hidden="true" />
            <span>
              Fale com a loja<strong>WhatsApp provisório</strong>
            </span>
          </a>
          <Link
            className="cart-link"
            to="/carrinho"
            aria-label={
              "Carrinho com " + count + (count === 1 ? " item" : " itens")
            }
          >
            <ShoppingBag size={25} aria-hidden="true" />
            <span className="cart-count">{count}</span>
            <span className="cart-label">Carrinho</span>
          </Link>
          <button
            className="menu-toggle icon-button"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
            aria-controls="navigation"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        <div
          className={"nav-wrap " + (menu ? "is-open" : "")}
          id="navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setMenu(false);
              document
                .querySelector<HTMLButtonElement>(".menu-toggle")
                ?.focus();
            }
          }}
        >
          <div className="container nav-inner">
            <nav aria-label="Navegação principal">
              <NavLink to="/" end>
                Início
              </NavLink>
              <NavLink to="/catalogo">Todos os produtos</NavLink>
              <NavLink to="/servicos">Serviços & cuidados</NavLink>
              <NavLink to="/sobre">Nossa loja</NavLink>
              <Link className="mobile-account" to="/conta?modo=entrar">
                Login e cadastro · demo
              </Link>
            </nav>
            <span className="location">
              <MapPin size={16} aria-hidden="true" />
              {storeConfig.city}
            </span>
          </div>
          <SpeciesNav />
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <Brand />
            <p>
              O cuidado de todo dia.
              <br />A companhia de uma vida.
            </p>
            <span className="muted">{storeConfig.city}</span>
          </div>
          <div>
            <h2>Para seu pet</h2>
            <Link to="/especie/cachorros">Cachorros</Link>
            <Link to="/especie/gatos">Gatos</Link>
            <Link to="/especie/passaros">Pássaros</Link>
            <Link to="/especie/peixes">Peixes</Link>
            <Link to="/especie/coelhos-roedores">Coelhos e roedores</Link>
            <Link to="/especie/repteis">Répteis</Link>
          </div>
          <div>
            <h2>Pet Cat & Cia</h2>
            <Link to="/sobre">Nossa loja</Link>
            <Link to="/servicos">Serviços demonstrativos</Link>
            <Link to="/conta">Login e cadastro</Link>
            <Link to="/contato">Contato e localização</Link>
            <Link to="/legal?tipo=entrega">Entrega e retirada</Link>
          </div>
          <div>
            <h2>Uma conversa de perto</h2>
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.phoneDisplay}
            </a>
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.instagram}
            </a>
            <p>
              Produtos, marcas, preços e serviços ilustrativos. Sem pedidos,
              pagamentos ou reservas reais.
            </p>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} {storeConfig.name}
          </span>
          <div>
            <Link to="/legal?tipo=privacidade">Privacidade</Link>
            <Link to="/legal?tipo=termos">Termos de uso</Link>
          </div>
          <span>
            Desenvolvido por <strong>SANTS</strong> Web Development
          </span>
        </div>
      </footer>
      <div
        className={"toast " + (toast ? "visible" : "")}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {toast && (
          <>
            <Check size={20} aria-hidden="true" />
            <span>{toast}</span>
            {undo && <button onClick={undo}>Desfazer</button>}
          </>
        )}
      </div>
      {storageFailed && (
        <p className="storage-warning" role="alert">
          Seu navegador não permitiu salvar o carrinho. Os itens serão mantidos
          somente enquanto esta página estiver aberta.
        </p>
      )}
    </>
  );
}
