# Testes e auditorias — Pet Cat & Cia

Data: 23/11/2026. Ambiente: Windows, Node 26.13.0, Playwright CLI disponível globalmente, navegador Microsoft Edge real em modo automatizado. Servidor Vite local em 127.0.0.1:5173; build de produção conferido em 127.0.0.1:4173.

## A — Código e compilação

- TypeScript estrito: aprovado, sem erros de compilação.
- `npm run build`: aprovado. Vite 7.3.8; bundle JS aproximadamente 310 kB (97 kB gzip), CSS aproximadamente 35 kB (7,6 kB gzip).
- Instalação com scripts de dependências desativados; npm reportou zero vulnerabilidades no momento da instalação.
- Dados, tipos, configurações, serviços, componentes, páginas e estilos separados. Código formatado com Prettier.
- Valores monetários em centavos; quantidade limitada a 1–99; carrinho valida dados persistidos e recupera armazenamento corrompido sem quebrar a aplicação.
- Nenhum backend, segredo, captura de cartão, chamada de pagamento, envio de mensagem ou reserva real.

## B — Auditoria visual

Realizada com os princípios da `design-taste-frontend` e o `DESIGN.md` específico do projeto. Inspecionados screenshots desktop, mobile, catálogo e agenda: hierarquia, recortes das fotos, alinhamento, espaçamento, cards, foco e estados selecionados.

A coleção `awesome-design-md` estava acessível; análises Shopify/Airbnb consultadas como referência de composição e componentes. Nenhum instalador externo da coleção foi executado.

As regras da skill que exigem seções de uma tela, proíbem notas demonstrativas e impõem kit estático conflitam com o briefing. Foram substituídas pelos requisitos do e-commerce compacto, React/Vite e identificação explícita das simulações. O gate automático de layout da skill não foi executado; não há declaração de `GATE: PASS`. A auditoria foi feita sobre o projeto real, com screenshots e Playwright CLI.

## C — Boas práticas e acessibilidade

Aplicadas as regras locais da `web-design-guidelines`: HTML semântico, labels, nome acessível para botões de ícone, links de navegação, foco visível, status de carrinho, seleção de datas, preferência por movimento reduzido e estados vazios.

Executadas inicialmente **18 auditorias axe-core** em 9 rotas a 375 e 1440 px. As 16 auditorias das rotas internas não encontraram violações WCAG A/AA nos critérios automatizados. As duas da homepage detectaram contraste transitório durante o fade de entrada. O fade foi removido, mantendo apenas deslocamento leve.

Depois da correção, **9 auditorias adicionais passaram sem violações**: homepage nas duas larguras, menu mobile aberto, calendário com data/horário selecionados nas duas larguras, filtro selecionado nas duas larguras, checkout com entrega e carrinho vazio com desfazer.

Também verificados: primeiro Tab no link de pular ao conteúdo, foco no conteúdo, seleção de data/horário por teclado e botões do calendário com pelo menos 44×44 px em 375 e 1440 px. Testes automatizados não equivalem a certificação integral de acessibilidade.

## D — Fluxos em navegador

**94 verificações aprovadas** no roteiro principal (`scripts/browser-checks.js`), incluindo:

| Fluxo                                         | Resultado                                            |
| --------------------------------------------- | ---------------------------------------------------- |
| Homepage e acesso ao catálogo                 | Aprovado                                             |
| Busca por nome, sem acentos                   | Aprovado                                             |
| Filtros por categoria                         | Aprovado                                             |
| Ordenação crescente e decrescente             | Aprovado                                             |
| Preservação de filtros na URL                 | Aprovado                                             |
| Busca sem resultado e categoria vazia         | Aprovado                                             |
| Detalhes e controle de quantidade             | Aprovado                                             |
| Adição e feedback no carrinho                 | Aprovado                                             |
| Aumentar/diminuir, subtotal e contagem        | Aprovado                                             |
| Persistência após recarregar                  | Aprovado                                             |
| Remoção, vazio e desfazer                     | Aprovado                                             |
| Checkout, entrega e retirada                  | Aprovado                                             |
| Pagamento desativado, sem dados de cartão     | Aprovado                                             |
| Navegação de meses                            | Aprovado                                             |
| Data, horário e resumo demonstrativo          | Aprovado                                             |
| Troca de data/serviço limpa horário           | Aprovado                                             |
| Menu, busca, carrinho e checkout mobile       | Aprovado                                             |
| Teclado e movimento reduzido                  | Aprovado                                             |
| Storage corrompido, produto/rota inexistentes | Aprovado                                             |
| Console e recursos HTTP                       | Zero erros e zero respostas HTTP de falha observadas |

Nas larguras **375, 768 e 1440 px**, nove rotas foram verificadas: homepage, catálogo, produto, carrinho, checkout, serviços, apresentação, contato e privacidade. Sem overflow horizontal e com imagens carregadas. A rolagem até as imagens foi exercitada para validar lazy loading.

**6 verificações adicionais aprovadas no build de produção**: acesso direto a quatro rotas (HTTP 200 e renderização), reinício da quantidade ao trocar de produto e funcionamento da agenda. Total: **100 verificações funcionais/de apresentação aprovadas**, além das auditorias de acessibilidade.

## E — Problemas encontrados e correções

1. Scripts npm no caminho Windows com `&` falhavam pelos shims: trocados por invocação direta do Node e build com `spawnSync` sem shell.
2. React StrictMode disparava foco inicial no conteúdo e deslocava o cabeçalho: foco agora só muda ao navegar entre páginas, com `preventScroll`.
3. Recortes SVG deixavam produtos vizinhos aparecerem: adicionados clipPaths individuais.
4. Fade do hero reduzia temporariamente o contraste: removida animação de opacidade; reauditoria sem violações.
5. Quantidade escolhida podia seguir para outro produto: reiniciada ao mudar o ID e conferida no build de produção.
6. O primeiro roteiro de testes consultava React Router antes da atualização da interface: assertions passaram a aguardar o estado esperado. A primeira tentativa de validar lazy loading incluía imagem oculta do sidebar mobile: teste corrigido para rolar apenas elementos visíveis. Essas falhas pertenciam ao roteiro, não ao funcionamento final.

O roteiro principal foi atualizado para também exigir zero violações axe na próxima execução. A execução registrada com 94 checks é anterior a essa adição; não foi contabilizada uma execução nova fictícia. As correções finais foram verificadas pelos roteiros específicos de acessibilidade e produção.

## Evidências

- `docs/browser-results.json` e `docs/browser-checks.log`: execução principal.
- `docs/accessibility-results.json` e `docs/accessibility-checks.log`: reauditoria final.
- `docs/production-checks.log`: verificações do build de produção.
- `docs/screenshots/`: homepage, catálogo, produto, carrinho, checkout e serviços. Versões 375/768/1440 e capturas finais da homepage/agenda. Priorizar os arquivos `*-final-*` e `apresentacao-desktop.png` para apresentação.

## Limitações e testes pendentes

- Safari/WebKit, Firefox, aparelhos físicos e leitores de tela não foram testados.
- Não foram executados testes de backend, pagamentos, entrega real ou agendamentos reais: essas funcionalidades não existem nesta etapa.
- Importação CSV/Excel tem contrato documentado, mas ainda não foi implementada nem testada com 600 produtos.
- Sem medição Lighthouse ou teste sob rede móvel limitada; o tamanho dos assets deve ser reavaliado quando houver fotos oficiais.
- Fotos, marca, textos institucionais, serviços e regras comerciais precisam da aprovação do cliente.

Nenhuma compra, mensagem ou informação de cliente foi enviada a serviços externos durante os testes.
