import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3100';
const OUTPUT_DIR = path.join(process.cwd(), 'captures', `phase1-${new Date().toISOString().split('T')[0]}`);

const pages = [
  { name: 'homepage', path: '/' },
  { name: 'revenue-leaks', path: '/revenue-leaks' },
  { name: 'revenue-leaks-missed-calls', path: '/revenue-leaks/missed-calls' },
  { name: 'revenue-leaks-dropped-estimates', path: '/revenue-leaks/dropped-estimates' },
  { name: 'revenue-leaks-dead-client-lists', path: '/revenue-leaks/dead-client-lists' },
  { name: 'revenue-leaks-lost-referrals-reviews', path: '/revenue-leaks/lost-referrals-reviews' },
  { name: 'how-it-works', path: '/how-it-works' },
  { name: 'evidence', path: '/evidence' },
  { name: 'services-and-pricing', path: '/services-and-pricing' },
  { name: 'assessment', path: '/assessment' },
  { name: 'leak-assessment', path: '/leak-assessment' },
  { name: 'about', path: '/about' },
  { name: 'insights', path: '/insights' },
  { name: 'faq', path: '/faq' },
  { name: 'privacy', path: '/privacy' },
  { name: 'terms', path: '/terms' },
];

async function capture() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  for (const p of pages) {
    try {
      console.log(`Capturing ${p.name}...`);
      await page.goto(`${BASE_URL}${p.path}`, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1000); // Let any animations settle
      const screenshotPath = path.join(OUTPUT_DIR, `${p.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`  Saved: ${screenshotPath}`);
    } catch (err) {
      console.error(`  FAILED: ${p.name} - ${err.message}`);
    }
  }

  await browser.close();
  console.log(`\nAll captures saved to: ${OUTPUT_DIR}`);
}

capture().catch(console.error);