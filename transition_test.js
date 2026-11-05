const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const DIR = path.join(__dirname, 'test-screenshots');
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  // The scroll animation container is 300vh = 2700px at 900px viewport
  // Sticky releases after 300vh - 100vh = 200vh = 1800px of scroll
  // We want to capture the transition zone — right at and after 1800px

  const scrollPositions = [
    { name: 'anim-90pct',   px: 1600, desc: '90% through animation' },
    { name: 'anim-end',     px: 1800, desc: 'Exact end of sticky (200vh)' },
    { name: 'post-anim-50', px: 1900, desc: '100px after sticky release' },
    { name: 'post-anim-100',px: 2200, desc: '400px after sticky release' },
    { name: 'features',     px: 2700, desc: 'Should be features section' },
    { name: 'features-deep',px: 3000, desc: 'Deep into features' },
  ];

  for (const pos of scrollPositions) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), pos.px);
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(DIR, `transition-${pos.name}.png`), fullPage: false });
    console.log(`✅ ${pos.name}: scroll=${pos.px}px — ${pos.desc}`);
  }

  await browser.close();
  console.log('\nDone! Check test-screenshots/transition-*.png');
})();
