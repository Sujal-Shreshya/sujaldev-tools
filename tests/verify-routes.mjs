import { execFileSync } from 'child_process';

const routes = [
  '/',
  '/pdf-tools',
  '/image-tools',
  '/developer-tools',
  '/tools/image-to-pdf',
  '/tools/merge-pdf',
  '/tools/split-pdf',
  '/tools/compress-pdf',
  '/tools/image-compressor',
  '/tools/image-resizer',
  '/tools/jpg-to-png',
  '/tools/png-to-jpg',
  '/tools/json-formatter',
  '/tools/base64-encoder-decoder',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-and-conditions',
  '/disclaimer',
  '/404-check'
];

console.log(`Starting automated headless Chrome verification for ${routes.length} pages on http://localhost:3000...\n`);

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
let successCount = 0;
let failCount = 0;

for (const route of routes) {
  const url = `http://localhost:3000${route}`;
  try {
    const args = [
      '--headless=new',
      '--disable-gpu',
      '--virtual-time-budget=2000',
      '--dump-dom',
      url
    ];
    const dom = execFileSync(chromePath, args, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
    
    // Check if React rendered into #root
    if (dom.includes('id="root"') && dom.includes('SujalDev')) {
      console.log(`✓ [200 RENDERED] ${route.padEnd(30)} — Passed`);
      successCount++;
    } else {
      console.error(`✗ [FAIL] ${route} — DOM missing root or brand elements`);
      failCount++;
    }
  } catch (err) {
    console.error(`✗ [EXEC ERROR] ${route} — ${err.message}`);
    failCount++;
  }
}

console.log(`\n======================================================`);
console.log(`Verification summary: ${successCount} passed, ${failCount} failed.`);
console.log(`======================================================\n`);
if (failCount > 0) process.exit(1);
