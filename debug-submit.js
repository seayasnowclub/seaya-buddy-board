const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => { if(msg.type()==='error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  await page.goto('file:///Users/orange/Desktop/seaya-buddy-board/index.html');
  await page.waitForTimeout(1000);

  // Open form
  await page.click('.hero-btn');
  await page.waitForTimeout(500);

  // Fill in fields
  await page.fill('#inp-name', '測試橘子');
  await page.click('#board-type-toggle .board-toggle-btn:first-child'); // 單板
  await page.fill('#inp-date-start', '2027-02-01');
  await page.click('.level-btn:first-child'); // 新手
  await page.fill('#inp-contact', '@test_user');
  await page.selectOption('#inp-resort', '越後湯澤 岩原滑雪場');

  await page.screenshot({ path: '/tmp/form-filled.png' });

  // Try submit
  await page.click('.submit-btn');
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/after-submit.png' });

  console.log('JS errors:', JSON.stringify(errors));
  await browser.close();
})();
