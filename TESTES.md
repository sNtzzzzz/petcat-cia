# Testes — Pet Cat & Cia v2

Execução em 23/11/2026, Microsoft Edge/Chromium por Playwright CLI 0.1.25. Servidor Vite local 5173 e build de produção em 4173. Relatório estruturado: docs/test-results-v2.json. Evidências da v1 ficam separadas em docs/archive/.

## Resultados executados

- **88 verificações principais aprovadas**, scripts/browser-v2.js: carregamento inicial e sessão, logo, 30 produtos, seis espécies, salesRank, filtros combinados e persistência na URL, ordenação, estados vazios, menus hover/foco/Escape/mobile, detalhes e quantidade, carrinho persistente/remover/desfazer/subtotal, retirada/entrega, calendário, login/cadastro demonstrativos e contato.
- **8 verificações adicionais aprovadas**, scripts/browser-v2-extra.js: alternância da configuração para WhatsApp sem envio e retorno ao calendário, contexto com touch real emulado, timeout do decode e falhas de imagem/sessionStorage. A configuração padrão permanece calendar.
- **7 verificações de produção aprovadas**, scripts/browser-v2-production.js: acesso direto a cinco rotas e fluxo produto → carrinho → checkout, sem erro de execução.
- **24 combinações página/largura**, em 375, 768 e 1440 px: sem overflow horizontal detectado. Home, espécies, categoria, catálogo, carrinho, checkout, serviços e cadastro. Screenshots em docs/screenshots/v2-*.png.
- **16 auditorias axe-core** em 375 e 1440 px: zero violações detectadas nas regras WCAG 2 A/AA e 2.1 AA executadas. Automação não equivale a certificação integral de acessibilidade.
- Nenhum erro JavaScript/console, falha HTTP ou requisição externa durante a suíte principal. Nenhuma mensagem, compra, reserva ou pagamento real foi realizado.
- Movimento reduzido, pausa das bolhas, pausa fora da tela e skip link por teclado conferidos. Loader normal observado em 1.216 ms nesta execução; limites e recuperação de falha também exercitados.
- `npm run build` aprovado: TypeScript e Vite, sem erros. JS 330,41 kB (103,03 kB gzip); CSS 55,47 kB (11,55 kB gzip), imagens separadas.
- SHA-256 da logo original e da cópia no projeto idênticos: 114387FF38F328B7ACB66AF9931B9B0D1A05F6120B0FEA53729107149C783DF8.

## Auditoria visual e de código

Revisão orientada por design-taste-frontend e web-design-guidelines, com leitura das regras locais. Conferidos hierarquia, fonte local, paleta derivada da logo, contraste automatizado, rótulos, foco visível, links semânticos, atributos de imagem, estados vazios, reduced motion e ausência de envio nos formulários. A estrutura de e-commerce e o briefing do usuário prevalecem sobre requisitos genéricos de apresentação da skill; não se declara execução ou aprovação do gate proprietário completo.

Inspeção visual de screenshots desktop e mobile: logo original legível, hero com transparência correta, texto atrás do cachorro, CTAs acessíveis, cards em duas colunas no celular, calendário e checkout acomodados ao viewport. Logo de baixa resolução mantida conforme solicitado, com substituição oficial pendente.

## Problemas encontrados e corrigidos

- src/components/SpeciesNav.tsx — Escape não fechava painel aberto por hover quando o foco estava fora da navegação. Listener ativo enquanto o painel está aberto; foco retorna ao gatilho. Repetição aprovada.
- Hero tinha composição com mistura de cores que deixava texto atravessar a imagem. Substituído por recorte com alpha e removida a mistura; inspecionado no navegador.
- Menu em viewport pequeno não deve abrir somente ao foco; interação por toque separada do comportamento desktop e testada.
- Seletores da automação foram refinados para distinguir o botão Peixes do cabeçalho do seletor da home e para reposicionar o ponteiro entre testes de hover. Essas eram correções do teste, não falhas do produto.

## Limitações e testes pendentes

Safari/WebKit, Firefox, aparelhos físicos, leitores de tela e testes de desempenho com rede móvel real ainda não executados. Integrações, estoque, autenticação, importação CSV/Excel, agendamento e pagamento reais não existem nesta fase. Revisão final de conteúdo, contatos e regras comerciais depende do cliente.

## Reproduzir

Inicie `npm run dev`. Com Playwright CLI instalado, abra uma sessão nomeada `petcat-v2` no Edge e execute os scripts com `playwright-cli -s=petcat-v2 run-code --filename=scripts/browser-v2.js` e `scripts/browser-v2-extra.js`. Para produção, `npm run build` e `npm run preview -- --port 4173`, seguido de `scripts/browser-v2-production.js`. Os testes principais limpam somente o carrinho e o marcador de introdução no perfil de teste.

Live Server não compila TypeScript/TSX: use Vite para o código fonte. A tarefa do VS Code e o README explicam a inicialização correta.
