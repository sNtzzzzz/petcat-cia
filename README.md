# Pet Cat & Cia

Protótipo de e-commerce desenvolvido pela **SANTS Web Development** para apresentação à Pet Cat & Cia, pet shop em São Bernardo do Campo, SP.

## Executar localmente

**Este projeto usa Vite, não a extensão Live Server.** O `index.html` da raiz importa TypeScript/TSX; ele precisa ser compilado pelo Vite. Abrir esse arquivo com “Go Live” ou diretamente no navegador não inicia a aplicação.

No VS Code, abra a pasta `Pet Cat & Cia`, use **Terminal → Executar Tarefa → Pet Cat & Cia: iniciar site** e abra http://127.0.0.1:5173/. Você também pode usar `npm run dev`, conforme abaixo. Se o servidor já estiver ativo, basta abrir o endereço; não inicie outra instância.

Pré-requisito: Node.js 22.12+ (ou outra versão compatível com Vite 7) e npm. Validado neste ambiente com Node 26.13.0.

No PowerShell:

```powershell
Set-Location -LiteralPath 'C:\Users\gabri\Documents\Pet Cat & Cia'
npm ci --ignore-scripts
npm run dev
```

Abra http://127.0.0.1:5173/. A porta é fixa para evitar abrir outro projeto por engano. Se estiver ocupada, encerre o servidor antigo antes de iniciar novamente.

```powershell
npm run typecheck
npm run build
npm run preview
```

O build fica em `dist/`. Os scripts invocam o Node diretamente para funcionar também em caminhos Windows com espaços e `&`.

## Tecnologias

React, TypeScript estrito, Vite, React Router e Lucide. CSS com tokens; Manrope hospedada localmente. Dependências com versões resolvidas em `package-lock.json`. Sem back-end ou credenciais.

## Funcionalidades

- Homepage, categorias, catálogo de 30 produtos fictícios para seis espécies e páginas de detalhes.
- Busca sem diferença de acentos/maiúsculas, filtros combinados e ordenação por preço; estado mantido na URL.
- Quantidades de 1 a 99, carrinho persistente, subtotal em centavos, remoção com desfazer por 10 segundos.
- Checkout com retirada/entrega e informações pendentes claramente identificadas.
- Agenda do mês atual no fuso de São Paulo, navegação entre meses, datas futuras, horários ilustrativos e resumo. Trocar data ou serviço limpa o horário selecionado.
- Layout mobile, menu recolhível, teclado, foco, status acessíveis, movimento reduzido e páginas de erro/estados vazios.
- Páginas de contato, apresentação e informações legais provisórias.

## O que é demonstrativo

Todos os produtos, preços, embalagens e serviços são exemplos. Não há estoque real, pedido, agendamento, envio de mensagens, reserva, pagamento ou coleta de dados pessoais. O WhatsApp e Instagram usam o contato da logo fornecida, identificado como provisório e sujeito à confirmação. Links externos só são abertos por ação do visitante. Frete não é calculado. R$ 100 e 10 kg não são regras ativadas.

O hero e as embalagens são imagens geradas por IA. A logo raster fornecida foi preservada, sem redesenho. Confira `docs/ASSETS.md`. A versão inclui `noindex` até aprovação.

## Estrutura

```text
src/
  components/   Cabeçalho, rodapé, calendário, cards e quantidade
  pages/        Home, catálogo, produto, carrinho, checkout e conteúdo
  context/      Estado e operações do carrinho
  data/         Produtos fictícios
  services/     Adaptadores de catálogo e armazenamento
  types/        Contratos TypeScript
  config/       Contatos, entrega, serviços e horários
  utils/        Moeda, busca e datas
  styles/       Tokens, componentes e responsividade
public/         Fotos, fonte, licença e favicon
scripts/        Build e verificações de navegador
docs/           Fontes das imagens, importação e evidências de teste
```

## Evolução

O catálogo passa pelo adaptador `src/services/catalog.ts`, permitindo trocar dados locais por API. A futura importação deve ser implementada no back-end, validar o arquivo e atualizar registros por SKU; contrato proposto em `docs/IMPORTACAO.md`. Não há importador operacional nesta versão.

Entrega tem configuração centralizada sem valores comerciais definidos. Node/Supabase/PostgreSQL, autenticação administrativa, estoque, agendamentos e pagamentos dependem de escopo e aprovação. Nenhuma infraestrutura foi criada antecipadamente.

Publicação futura: hospedar `dist/` com fallback de rotas para `index.html`. Antes do lançamento, confirmar dados e políticas em `PENDENCIAS.md`, aprovar as imagens, remover `noindex` e configurar metadados com o domínio real. Nenhuma publicação foi feita nesta etapa.

## Testes

Playwright CLI disponível globalmente neste ambiente. As verificações são reproduzíveis com o servidor ligado:

```powershell
playwright-cli -s=petcat-v2 open http://127.0.0.1:5173/ --browser=msedge
playwright-cli -s=petcat-v2 run-code --filename=scripts/browser-v2.js
playwright-cli -s=petcat-v2 close
```

O roteiro limpa somente o carrinho do protótipo nessa sessão de teste e escreve screenshots em `docs/screenshots/`. Usa axe-core local para acessibilidade. Resultados e limitações em `TESTES.md`.

## Adaptação v2

Identidade creme, dourado e marrom baseada nas logos enviadas; a versão transparente é usada no cabeçalho e rodapé. Caminhos e enquadramentos ficam em `src/config/brand.ts`, e os tokens em `src/styles/v2.css`. Carregamento inicial por sessão acompanha a fonte e imagem com limite de duração. Hero local com oito bolhas que respeitam movimento reduzido e pausam fora da tela.

Menu para seis espécies, URLs `/especie/gatos` e `/especie/gatos/racao`, categorias e filtros configuráveis. `src/config/filters.ts` controla atributos exibidos por categoria. `salesRank` ordena os mais vendidos fictícios. Login/cadastro em `/conta` apenas demonstram formulários: senha desabilitada, sem autenticação, transmissão ou persistência dos campos.

Configurações independentes: `contact.ts`, `delivery.ts`, `booking.ts`, `catalog.ts`. `bookingMode` aceita `calendar` ou `whatsapp`; `AvailabilityProvider` é o contrato para uma integração futura, hoje somente local. Nenhuma mudança cria pedidos, cobranças ou reservas reais.

O briefing aplicado está em `docs/BRIEF-V2.md`; documentação e testes v1 em `docs/archive/`. Os testes atuais estão em `TESTES.md`. Use `playwright-cli -s=petcat-v2 run-code --filename=scripts/browser-v2.js` com o servidor ativo para repetir a suíte de navegador (requer Playwright CLI instalado e sessão aberta).

