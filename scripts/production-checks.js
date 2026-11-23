async page => {
  const results = [];
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const route of ['/', '/catalogo', '/produto/racao-caes', '/servicos']) {
    const response = await page.goto('http://127.0.0.1:4173' + route);
    await page.locator('main h1').waitFor();
    if (response.status() !== 200) throw new Error(`HTTP inválido: ${route}`);
    results.push(`Build de produção: ${route} retorna 200 e renderiza`);
  }
  await page.goto('http://127.0.0.1:4173/produto/racao-caes');
  await page.getByRole('button', { name: 'Aumentar quantidade de Ração para cães' }).click();
  await page.waitForFunction(() => document.querySelector('.quantity output').textContent === '2');
  await page.getByRole('link', { name: 'Ver detalhes de Ração para gatos' }).click();
  await page.waitForFunction(() => document.querySelector('.quantity output').textContent === '1');
  results.push('Ao abrir outro produto, quantidade reinicia em uma unidade');
  await page.goto('http://127.0.0.1:4173/servicos');
  await page.getByRole('button', { name: 'Próximo mês' }).click();
  await page.locator('.calendar-grid button:not([disabled])').first().click();
  await page.getByRole('button', { name: '09:00', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.booking-summary').textContent.includes('09:00'));
  results.push('Agenda funciona no build de produção');
  await page.goto('http://127.0.0.1:5173/');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: 'docs/screenshots/apresentacao-desktop.png', animations: 'disabled' });
  return { passed: results.length, results };
}
