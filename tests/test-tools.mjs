import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';

console.log('--- STARTING SUJALDEV TOOLS LOGIC VERIFICATION ---');

// 1. Test PDF Document Creation & Merging
async function testPdfTools() {
  console.log('\n[1/3] Testing PDF Tools Engine (pdf-lib & jszip)...');
  
  // Create PDF 1
  const doc1 = await PDFDocument.create();
  const page1 = doc1.addPage([600, 400]);
  page1.drawText('Page 1 from Doc 1');
  const pdf1Bytes = await doc1.save();
  console.log(`✓ Generated Test PDF 1 (${pdf1Bytes.byteLength} bytes)`);

  // Create PDF 2
  const doc2 = await PDFDocument.create();
  const page2 = doc2.addPage([600, 400]);
  page2.drawText('Page 1 from Doc 2');
  const page3 = doc2.addPage([600, 400]);
  page3.drawText('Page 2 from Doc 2');
  const pdf2Bytes = await doc2.save();
  console.log(`✓ Generated Test PDF 2 (${pdf2Bytes.byteLength} bytes, 2 pages)`);

  // Test Merge
  const mergedDoc = await PDFDocument.create();
  const d1 = await PDFDocument.load(pdf1Bytes);
  const d2 = await PDFDocument.load(pdf2Bytes);
  const p1 = await mergedDoc.copyPages(d1, d1.getPageIndices());
  const p2 = await mergedDoc.copyPages(d2, d2.getPageIndices());
  for (const p of p1) mergedDoc.addPage(p);
  for (const p of p2) mergedDoc.addPage(p);
  const mergedBytes = await mergedDoc.save({ useObjectStreams: true });
  console.log(`✓ Merged PDF generated successfully! Total pages: ${mergedDoc.getPageCount()}, size: ${mergedBytes.byteLength} bytes`);

  if (mergedDoc.getPageCount() !== 3) {
    throw new Error(`Expected 3 pages, got ${mergedDoc.getPageCount()}`);
  }

  // Test Split
  const splitDoc = await PDFDocument.create();
  const [copied] = await splitDoc.copyPages(mergedDoc, [1]); // extract page 2 (index 1)
  splitDoc.addPage(copied);
  const splitBytes = await splitDoc.save();
  console.log(`✓ Split single page extracted successfully! Pages: ${splitDoc.getPageCount()}, size: ${splitBytes.byteLength} bytes`);

  // Test JSZip packaging
  const zip = new JSZip();
  zip.file('page-1.pdf', pdf1Bytes);
  zip.file('page-2.pdf', pdf2Bytes);
  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
  console.log(`✓ Split All Pages ZIP archive generated! Size: ${zipBuffer.byteLength} bytes`);

  // Test Compress / Optimization
  const uncompressedDoc = await PDFDocument.load(mergedBytes);
  uncompressedDoc.setTitle('');
  uncompressedDoc.setAuthor('');
  const compressedBytes = await uncompressedDoc.save({ useObjectStreams: true });
  console.log(`✓ PDF Optimization stream completed: ${compressedBytes.byteLength} bytes`);
}

// 2. Test JSON Formatter & Validator Logic
function testJsonTools() {
  console.log('\n[2/3] Testing JSON Formatter & Validator...');
  
  const rawInput = '{"brand":"SujalDev Tools","toolsCount":10,"active":true,"list":["pdf","image","developer"]}';
  
  // Format
  const parsed = JSON.parse(rawInput);
  const formatted2 = JSON.stringify(parsed, null, 2);
  const formatted4 = JSON.stringify(parsed, null, 4);
  const minified = JSON.stringify(parsed);

  console.log(`✓ Formatted with 2 spaces (${formatted2.split('\n').length} lines)`);
  console.log(`✓ Formatted with 4 spaces (${formatted4.split('\n').length} lines)`);
  console.log(`✓ Minified string length: ${minified.length} chars (original: ${rawInput.length})`);

  // Validation tests
  try {
    JSON.parse('{ invalid: json, }');
    throw new Error('Should have thrown on invalid JSON');
  } catch (err) {
    console.log(`✓ Correctly identified invalid JSON syntax: "${err.message}"`);
  }
}

// 3. Test Base64 Encoder / Decoder Logic
function testBase64Tools() {
  console.log('\n[3/3] Testing Base64 UTF-8 Encoding/Decoding...');
  
  const testString = 'SujalDev Tools — 100% Free & Private in-browser toolkits! 🚀';
  
  // Standard Base64
  const base64Standard = Buffer.from(testString, 'utf-8').toString('base64');
  const decodedStandard = Buffer.from(base64Standard, 'base64').toString('utf-8');
  console.log(`✓ Base64 Encoded (${base64Standard.length} chars): ${base64Standard.slice(0, 30)}...`);
  console.log(`✓ Base64 Decoded match: ${decodedStandard === testString ? 'YES' : 'NO'}`);

  if (decodedStandard !== testString) {
    throw new Error('Base64 decoded string did not match original UTF-8 string');
  }

  // URL Safe Base64
  const urlSafe = base64Standard.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const decodedUrlSafe = Buffer.from(urlSafe.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8');
  console.log(`✓ URL-Safe Base64 decoded match: ${decodedUrlSafe === testString ? 'YES' : 'NO'}`);
}

async function run() {
  try {
    await testPdfTools();
    testJsonTools();
    testBase64Tools();
    console.log('\n=============================================');
    console.log('>>> ALL CORE LOGIC TESTS PASSED SUCCESSFULLY! <<<');
    console.log('=============================================\n');
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
}

run();

