# Contrato proposto para importação de catálogo

Não existe importador em funcionamento. A separação entre `Product`, dados e adaptador `catalog` permite implementá-lo sem reescrever a interface.

## Campos sugeridos para CSV/Excel

| Campo             | Tipo                 | Regra                                                                 |
| ----------------- | -------------------- | --------------------------------------------------------------------- |
| sku               | texto                | Obrigatório, único e estável; preservar zeros iniciais                |
| nome              | texto                | Obrigatório, normalizar espaços                                       |
| preco             | decimal BRL          | Converter para centavos inteiros; rejeitar negativo ou valor inválido |
| categoria         | texto                | Mapear para categoria aprovada                                        |
| tags              | lista                | Espécies/categorias separadas por `;`                                 |
| apresentacao      | texto                | Ex.: 3 kg, 500 ml, 1 unidade                                          |
| peso_logistico_kg | decimal opcional     | Ausência vira null, nunca inferir peso de volume                      |
| descricao         | texto                | Texto simples, sem HTML executável                                    |
| imagem            | URL/caminho aprovado | Validar origem, formato e existência                                  |
| estoque           | inteiro opcional     | Integração futura; não simular estoque real                           |

Fluxo futuro: upload autenticado → pré-validação → relatório de erros por linha → prévia das mudanças → confirmação → atualização transacional por SKU → histórico de importação. Não executar macros nem fórmulas da planilha. Evitar importações diretamente do cliente público.

Para aproximadamente 600 produtos, usar paginação/busca no servidor ou renderização incremental; não montar 600 cards e imagens de uma vez. O protótipo contém 30 produtos demonstrativos.

O modelo atual usa `image: { src, width, height, viewBox }`. Para fotos individuais, use o enquadramento completo da imagem; `ProductImage` já centraliza a apresentação. `species`, `brand`, `salesRank` e `attributes` (tipo, idade, porte e peso) devem ser mapeados e validados pelo futuro importador. Nenhum importador é executado no protótipo.

