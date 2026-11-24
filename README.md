# Pet Cat & Cia

Protótipo de e-commerce em React, TypeScript e Vite para a Pet Cat & Cia.

## Executar

Este projeto precisa do Vite. A extensão Live Server não compila os arquivos TSX.

```powershell
Set-Location -LiteralPath 'C:\Users\gabri\Documents\Pet Cat & Cia'
npm install
npm run dev
```

Abra http://127.0.0.1:5173/.

Comandos úteis:

```powershell
npm run typecheck
npm run build
npm run preview
```

## Estrutura principal

```text
src/components/   Componentes reutilizáveis, cabeçalho e rodapé
src/pages/        Páginas do site
src/config/       Logo, contato, entrega, agenda e filtros
src/data/         Produtos demonstrativos
src/styles/       Estilos globais e identidade visual
public/           Imagens e fonte usadas pelo site
```

Os textos do cabeçalho e rodapé ficam em `src/components/Layout.tsx`. Contatos ficam em `src/config/contact.ts`, dados da loja em `src/config/store.ts` e logos em `src/config/brand.ts`.

## Estado atual

O catálogo, busca, filtros, carrinho local, checkout e calendário demonstrativo funcionam. Não existem banco de dados, autenticação, estoque, pagamento ou agendamento real. Produtos, preços, marcas e serviços ainda precisam ser confirmados pelo cliente.

Antes de publicar, revise `PENDENCIAS.md`, substitua dados demonstrativos e remova o `noindex` de `index.html`.

## GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` compila e publica o site quando a branch `main` é enviada ao GitHub. No repositório, acesse **Settings → Pages** e selecione **GitHub Actions** em *Source*. O endereço será `https://sntzzzzz.github.io/petcat-cia/`.
