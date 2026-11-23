import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LockKeyhole, UserRound } from "lucide-react";
export function Account() {
  const [params] = useSearchParams();
  const signup = params.get("modo") === "cadastrar";
  const [status, setStatus] = useState("");
  return (
    <div className="container page account-page">
      <div className="account-intro">
        <span className="eyebrow">Seu espaço na loja</span>
        <h1>
          {signup
            ? "Uma companhia mais próxima."
            : "Que bom ter você por aqui."}
        </h1>
        <p>
          Conheça a proposta da área do cliente. Login e cadastro ainda não
          estão disponíveis.
        </p>
        <div className="notice">
          <LockKeyhole aria-hidden="true" />
          <p>
            Demonstração. Não há autenticação, envio de dados ou armazenamento
            de senhas. Use apenas dados fictícios.
          </p>
        </div>
      </div>
      <section className="account-form-panel" aria-labelledby="account-title">
        <UserRound size={28} aria-hidden="true" />
        <div className="account-tabs">
          <Link
            aria-current={!signup ? "page" : undefined}
            to="/conta?modo=entrar"
            onClick={() => setStatus("")}
          >
            Login
          </Link>
          <Link
            aria-current={signup ? "page" : undefined}
            to="/conta?modo=cadastrar"
            onClick={() => setStatus("")}
          >
            Cadastro
          </Link>
        </div>
        <h2 id="account-title">
          {signup ? "Criar conta · demo" : "Entrar · demo"}
        </h2>
        <form
          key={signup ? "signup" : "login"}
          onSubmit={(e) => {
            e.preventDefault();
            e.currentTarget.reset();
            setStatus(
              signup
                ? "Demonstração concluída. Nenhuma conta foi criada e nenhum dado foi salvo."
                : "Demonstração concluída. Nenhuma sessão foi iniciada e nenhum dado foi salvo.",
            );
          }}
        >
          {signup && (
            <div className="field">
              <label htmlFor="demo-name">Nome fictício</label>
              <input
                id="demo-name"
                name="demo-name"
                autoComplete="off"
                placeholder="Ex.: Visitante…"
                required
                maxLength={80}
              />
            </div>
          )}
          <div className="field">
            <label htmlFor="demo-email">E-mail fictício</label>
            <input
              id="demo-email"
              name="demo-email"
              type="email"
              autoComplete="off"
              spellCheck={false}
              placeholder="Ex.: visitante@example.com…"
              required
              maxLength={120}
            />
          </div>
          <div className="field">
            <label htmlFor="demo-password">
              Senha indisponível nesta demonstração
            </label>
            <input
              id="demo-password"
              name="demo-password"
              type="password"
              autoComplete="off"
              disabled
              placeholder="Não digite uma senha real"
              aria-describedby="password-note"
            />
            <p id="password-note" className="demo-note">
              Este campo está desativado. Nenhuma senha é coletada.
            </p>
          </div>
          <button className="button full" type="submit">
            Testar interface de {signup ? "cadastro" : "login"}
          </button>
          <p className="form-status" role="status" aria-live="polite">
            {status}
          </p>
        </form>
      </section>
    </div>
  );
}
