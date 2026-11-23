async page => {
 const errors=[];page.on('pageerror',e=>errors.push(e.message));const passed=[];
 for(const route of ['/','/especie/gatos/racao','/produto/racao-caes','/conta?modo=cadastrar','/servicos']){
 await page.goto('http://127.0.0.1:4173'+route);await page.locator('main h1').waitFor();await page.locator('.loading-screen').waitFor({state:'hidden'});passed.push('Rota direta no build: '+route);
 }
 await page.goto('http://127.0.0.1:4173/produto/racao-caes');await page.getByRole('button',{name:'Adicionar ao carrinho',exact:true}).click();await page.getByRole('link',{name:'Ver meu carrinho'}).click();await page.getByRole('link',{name:'Avançar à demonstração'}).click();await page.getByRole('button',{name:'Pagamento indisponível',exact:true}).waitFor();passed.push('Produto → carrinho → checkout no build');
 if(errors.length)throw new Error(JSON.stringify(errors));passed.push('Sem erro de execução no build');return {passed:passed.length,results:passed,errors};
}
