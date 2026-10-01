import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const outputDirectory = new URL('../public/blog/', import.meta.url).pathname;
const temporaryDirectory = mkdtempSync(join(tmpdir(), 'experiencecloudmentor-images-'));

function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function textLines(lines, x, y, options = {}) {
  const {
    anchor = 'start',
    color = '#0f172a',
    family = 'Avenir Next, Segoe UI, sans-serif',
    size = 32,
    weight = 700,
    lineHeight = Math.round(size * 1.18),
  } = options;
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-family="${family}" font-size="${size}" font-weight="${weight}">${lines
    .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join('')}</text>`;
}

function renderPng(fileName, width, height, content) {
  const svgPath = join(temporaryDirectory, `${fileName}.svg`);
  const pngPath = join(outputDirectory, fileName);
  writeFileSync(
    svgPath,
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${content}</svg>`,
  );
  execFileSync('sips', ['-s', 'format', 'png', svgPath, '--out', pngPath], { stdio: 'ignore' });
}

const socialCards = [
  {
    file: 'federated-audience-composition-og.png',
    label: 'ADOBE EXPERIENCE PLATFORM',
    title: ['Federated Audience', 'Composition in AEP'],
    subtitle: 'A practical guide to warehouse-based audiences',
    accent: '#176B57',
  },
  {
    file: 'aep-edge-network-og.png',
    label: 'ADOBE EXPERIENCE PLATFORM',
    title: ['AEP Edge Network'],
    subtitle: 'How collection, XDM, and datastream routing work',
    accent: '#C2412D',
  },
  {
    file: 'aem-certification-og.png',
    label: 'AEM CAREER GUIDE',
    title: ['AEM Developer', 'Certification'],
    subtitle: 'Exam guide and seven-week study plan',
    accent: '#234BDA',
  },
  {
    file: 'target-comparison-og.png',
    label: 'EXPERIMENTATION',
    title: ['Adobe Target vs', 'Optimizely vs VWO'],
    subtitle: 'A practical 2026 platform comparison',
    accent: '#A13D63',
  },
  {
    file: 'aep-ajo-journeys-og.png',
    label: 'ADOBE JOURNEY OPTIMIZER',
    title: ['AEP and AJO'],
    subtitle: 'How real-time journey orchestration works',
    accent: '#6B4F1D',
  },
];

for (const card of socialCards) {
  const titleY = card.title.length > 1 ? 205 : 270;
  const title = card.title
    .map((line, index) => textLines([line], 78, titleY + index * 106, {
      family: 'Georgia, serif',
      size: 58,
    }))
    .join('');
  renderPng(
    card.file,
    1200,
    630,
    `<rect width="1200" height="630" fill="#ffffff"/>
     <rect x="0" y="0" width="18" height="630" fill="${card.accent}"/>
     <rect x="760" y="0" width="440" height="630" fill="#f8fafc"/>
     <circle cx="1035" cy="160" r="110" fill="#eef4ff"/>
     <circle cx="1110" cy="245" r="42" fill="${card.accent}" opacity="0.12"/>
     ${textLines([card.label], 78, 105, { color: card.accent, size: 21, weight: 800 })}
    ${title}
    ${textLines([card.subtitle], 78, card.title.length > 1 ? 435 : 375, { color: '#475569', size: 27, weight: 500 })}
     <line x1="78" y1="520" x2="1122" y2="520" stroke="#e2e8f0" stroke-width="2"/>
     <text x="78" y="574" fill="#0f172a" font-family="Avenir Next, Segoe UI, sans-serif" font-size="25" font-weight="800">Experience<tspan fill="#234bda">CloudMentor</tspan></text>` ,
  );
}

const diagrams = [
  {
    file: 'federated-audience-workflow.png',
    title: 'Federated audience workflow',
    accent: '#176B57',
    nodes: [
      { title: ['Enterprise', 'warehouse'], caption: ['Source data stays', 'governed'] },
      { title: ['Federated', 'composition'], caption: ['Query, enrich,', 'and refine'] },
      { title: ['Audience', 'result'], caption: ['Only qualifying', 'audience moves'] },
      { title: ['Adobe', 'destinations'], caption: ['Activate through', 'RTCDP or AJO'] },
    ],
    footer: 'Identity, consent, governance, and destination configuration still apply.',
  },
  {
    file: 'aep-edge-network-flow.png',
    title: 'AEP Edge Network data flow',
    accent: '#C2412D',
    nodes: [
      { title: ['Browser', 'or app'], caption: ['Customer', 'interaction'] },
      { title: ['Web / Mobile', 'SDK'], caption: ['Send XDM event'] },
      { title: ['Edge', 'Network'], caption: ['Collect and', 'process'] },
      { title: ['Datastream', 'routing'], caption: ['Choose configured', 'services'] },
      { title: ['Adobe', 'applications'], caption: ['RTCDP · AJO', 'Analytics · CJA'] },
    ],
    footer: 'One collection path can route the same standardized event to multiple configured services.',
  },
];

for (const diagram of diagrams) {
  const width = 1400;
  const height = 700;
  const left = 64;
  const availableWidth = width - left * 2;
  const gap = 48;
  const nodeWidth = (availableWidth - gap * (diagram.nodes.length - 1)) / diagram.nodes.length;
  const boxY = 235;
  const boxHeight = 105;
  const nodes = diagram.nodes
    .map((node, index) => {
      const x = left + index * (nodeWidth + gap);
      const centerX = x + nodeWidth / 2;
      const arrow = index < diagram.nodes.length - 1
        ? textLines(['→'], x + nodeWidth + gap / 2, 295, { anchor: 'middle', color: diagram.accent, size: 36, weight: 800 })
        : '';
      return `<rect x="${x}" y="${boxY}" width="${nodeWidth}" height="${boxHeight}" fill="#f8fafc" stroke="${diagram.accent}" stroke-width="4"/>
        ${textLines(node.title, centerX, boxY + 40, { anchor: 'middle', size: diagram.nodes.length === 5 ? 19 : 22, lineHeight: 25, weight: 800 })}
        ${textLines(node.caption, centerX, 380, { anchor: 'middle', color: '#475569', size: 16, lineHeight: 22, weight: 500 })}
        ${arrow}`;
    })
    .join('');
  renderPng(
    diagram.file,
    width,
    height,
    `<rect width="${width}" height="${height}" fill="#ffffff"/>
     <rect x="2" y="2" width="${width - 4}" height="${height - 4}" fill="none" stroke="#e2e8f0" stroke-width="4"/>
     ${textLines(['EXPERIENCECLOUDMENTOR'], left, 80, { color: diagram.accent, size: 18, weight: 800 })}
     ${textLines([diagram.title], left, 145, { family: 'Georgia, serif', size: 44 })}
     ${nodes}
     <line x1="${left}" y1="605" x2="${width - left}" y2="605" stroke="#e2e8f0" stroke-width="2"/>
     ${textLines([diagram.footer], left, 650, { color: '#334155', size: 18, weight: 500 })}`,
  );
}

rmSync(temporaryDirectory, { recursive: true, force: true });
console.log(`Generated ${socialCards.length + diagrams.length} SEO images.`);
