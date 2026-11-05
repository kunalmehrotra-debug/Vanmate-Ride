const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.join(__dirname, 'test-screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for canvas animation to draw first frame
  await new Promise(r => setTimeout(r, 3000));

  // ── SCREENSHOT 1: Hero (top of page)
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '1-hero.png'), fullPage: false });
  console.log('✅ Screenshot 1: Hero');

  // ── SCREENSHOT 2: Mid-hero scroll (animation frame)
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '2-animation-mid.png'), fullPage: false });
  console.log('✅ Screenshot 2: Animation mid');

  // ── SCREENSHOT 3: End of scroll animation + CTA buttons (check for black gap)
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 3.5, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '3-animation-end-transition.png'), fullPage: false });
  console.log('✅ Screenshot 3: Animation end / black gap check');

  // ── SCREENSHOT 4: Features section
  const featuresEl = await page.$('#how-it-works');
  if (featuresEl) {
    await featuresEl.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
  }
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '4-features.png'), fullPage: false });
  console.log('✅ Screenshot 4: Features');

  // ── SCREENSHOT 5: Stats bar
  await page.evaluate(() => window.scrollBy({ top: window.innerHeight, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '5-stats.png'), fullPage: false });
  console.log('✅ Screenshot 5: Stats');

  // ── SCREENSHOT 6: Testimonials
  await page.evaluate(() => window.scrollBy({ top: window.innerHeight, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '6-testimonials.png'), fullPage: false });
  console.log('✅ Screenshot 6: Testimonials');

  // ── SCREENSHOT 7: Pricing
  const pricingEl = await page.$('#pricing');
  if (pricingEl) {
    await pricingEl.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
  }
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '7-pricing.png'), fullPage: false });
  console.log('✅ Screenshot 7: Pricing');

  // ── SCREENSHOT 8: CTA Banner + Footer
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '8-footer.png'), fullPage: false });
  console.log('✅ Screenshot 8: Footer');

  // ── SCREENSHOT 9: Full page
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '9-fullpage.png'), fullPage: true });
  console.log('✅ Screenshot 9: Full page');

  await browser.close();
  console.log('\nAll screenshots saved to:', SCREENSHOTS_DIR);
})();
