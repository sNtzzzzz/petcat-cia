# Pet Cat & Cia — sistema visual

Tipo: loja local com e-commerce demonstrativo. Público: tutores de cães e gatos em São Bernardo do Campo. Ação principal: ver produtos e adicionar ao carrinho.

## Direção e referências

Branco predominante, verde floresta, fotografia afetiva e produtos com composição de estúdio. Voz brasileira, próxima e objetiva; preços, disponibilidade e confirmações nunca inventados. Os cinco preços vêm do briefing e são fictícios.

Consultadas as análises Shopify e Airbnb da coleção [awesome-design-md](https://github.com/VoltAgent/awesome-design-md). Adaptados: superfície clara, hierarquia transacional, espaço de respiro, fotografia e controles consistentes. Não copiamos marcas, textos ou layouts integrais. A coleção foi lida como referência, sem executar seu instalador.

## Tokens

`--green: #165b42`, `--green-dark: #104532`, `--ink: #1f3029`, `--muted: #5d6c64`, `--mint: #edf4ee`, `--line: #dde5df`, `--surface: #f7f8f5`, branco `#fff`. Acento pontual amarelo `#f2d77c`, salmão `#f4ded4`. Texto em verde escuro ou tinta, nunca branco sobre amarelo.

Tipografia: Manrope variável hospedada localmente (OFL), fallback system-ui. Títulos 600–800; corpo 400–500, 16px/1.6; metadados 14px; h1 fluido 36–64px, h2 28–38px. Preços com algarismos tabulares. Largura de texto até 60 caracteres.

Espaçamento: 4, 8, 12, 16, 24, 32, 48, 64, 80px. Contêiner máximo 1280px, margens simétricas de 24–48px; mobile 20px. Seções seguem o conteúdo, sem alturas forçadas de tela que atrasem a compra.

## Componentes

Cabeçalho com busca central, carrinho e navegação. Hero dividido entre mensagem e fotografia. Categorias visuais compactas. Cards com imagem, categoria, título, preço e adicionar. Bordas de 1px, raios de 10px em controles, 16px em cards e 24px em banners. Sombra leve apenas em hover e feedback. Botão principal verde; secundário branco com borda; alvo de toque mínimo 44px.

Detalhes em página própria. Carrinho em página responsiva. Checkout em duas colunas no desktop e uma no celular, sem coleta de cartão ou dados pessoais. Agenda com botões nativos de data e horário, seleção explícita e resumo textual.

## Movimento e acessibilidade

Entrada do hero de 350ms; hover com deslocamento de 2px e imagem 1.02; transições de transform/opacity 160–220ms. `prefers-reduced-motion` desativa animações. Foco de alto contraste com offset, link para pular ao conteúdo, navegação sem mouse, regiões de status e labels visíveis. Sem carrossel, efeitos 3D ou carregamento artificial.

## Responsividade

375px: navegação recolhível, busca em segunda linha, cards em uma coluna com imagem horizontal ou duas quando houver espaço suficiente. 768px: grids de 2–3 colunas. 1440px: catálogo de 4 colunas, destaques de 5. Calendário sempre cabe em sete colunas com botões de 44px no celular. Sem esconder overflow para mascarar defeitos.

## Conflitos resolvidos a favor do briefing

As instruções da design-taste-frontend sobre seções de uma tela, proibição de notas demonstrativas, cantos quadrados em lojas e ausência de catálogo fictício cedem aos requisitos explícitos do projeto. Usamos React/Vite e Playwright CLI conforme solicitado, em vez do kit estático e do navegador exclusivo da skill. A auditoria relevante é funcionalidade, legibilidade, acessibilidade e qualidade visual de e-commerce.

## Imagens

Animais: fotografias de banco Unsplash, substitutas de imagens oficiais, com fontes em `docs/ASSETS.md`. Produtos: uma composição fotográfica gerada por IA exclusivamente para cinco itens fictícios; recortes feitos apenas na apresentação SVG, sem marcas reais. Fotos e identidade devem ser aprovadas antes da publicação comercial.
