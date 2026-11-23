# Pet Cat & Cia — sistema visual v2

Loja local com e-commerce demonstrativo. Logos fornecidas pelo cliente, sem redesenho ou vetorização. A versão transparente em public/brand/logo-header-transparente.png é usada no cabeçalho e rodapé; o raster anterior permanece em public/brand/logo-provisoria.png. Caminhos e enquadramentos ficam em src/config/brand.ts. O SVG apenas exibe os pixels originais.

## Paleta extraída

Amostragem real via canvas: traço dourado dominante RGB112,104,64 (#706840),120,112,72 (#787048); texto marrom RGB48,32,16 (#302010),40,24,8 (#281808); fundo majoritário RGB240,240,240 (#f0f0f0). Variações de compressão e antialiasing preservadas.

Tokens adaptados: tinta #302010; ação #6d552c; ação forte #49371e; ouro decorativo #998545; creme #faf8f3; superfície #f2eee5; borda #ded7c9; texto secundário #706355. Cards brancos. Dourado claro nunca em texto pequeno. Verde #246147 apenas para sucesso. Promoção #8b4635, sem descontos inventados. Paleta pendente de aprovação.

## Tipografia e ritmo

Manrope local em corpo e controles; Georgia do sistema em títulos editoriais. Corpo16px, metadados13–14px; h1 36–64px, frase decorativa do hero64–150px. Espaçamento4,8,12,16,24,32,48,64,80px. Contêiner1280px, margens20px mobile e40px desktop.
Bordas1px, raios10px em controles,16px em cards,24px em banners. Sombra0 8px 28px #3020100d. Foco com anel e offset.

## Navegação

Seis espécies com ícones, aria-expanded, painel de categorias, Escape e foco. Mobile usa toque, sem depender de hover.
Pares texto/fundo: cachorro #805126/#f3e8d8, gato #625235/#ece7dc, pássaro #566239/#eaf0dd, peixe #386577/#e2eef2, coelho #89574f/#f4e6e1, réptil #64613c/#eeeddf. Cores de navegação, não marcas novas.

## Hero e movimento

Foto neutra gerada para demonstração de cachorro no banho, local. Frase grande ao fundo, CTAs Ver produtos e Conhecer serviços, texto provisório identificado. Até8 bolhas; somente transform/opacity; pausa fora da tela, aba oculta, por controle e por prefers-reduced-motion. Sem scroll-jacking.
Loader só na primeira carga da sessão: document.fonts.ready e decode da imagem do hero são tarefas reais do progresso. Mínimo600ms, teto1800ms+fade160ms. Erros não bloqueiam acesso. Tab dispensa overlay, sem foco preso. Noscript orienta habilitar JS. SessionStorage pode falhar sem derrubar a aplicação.

## Catálogo e home

Mais vendidos demonstrativos → categorias → seleções por espécie com categorias misturadas → marcas fictícias → serviços → diferenciais → rodapé.
30 produtos locais tipados. Filtros na URL e configuráveis por categoria. Checkout não coleta cartão. Login/cadastro são apenas interface, sem salvar ou enviar dados.

## Responsividade

375px: busca em linha própria, menu por toque, cards em duas colunas, calendário44px.768px: duas/três colunas.1440px: catálogo em três colunas com sidebar e home em quatro. Sem overflow e sem alturas de tela forçadas.

## Referências e precedência

Mantidas as análises Shopify/Airbnb da coleção awesome-design-md consultadas na v1 para hierarquia, sem copiar identidade. design-taste-frontend orienta consistência; briefing prevalece sobre kit estático, proibição de notas demonstrativas e seções de uma tela. web-design-guidelines orienta acessibilidade. Não declarar gate automático da taste aprovado: seus requisitos incompatíveis não são executados.
