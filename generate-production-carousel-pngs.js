/**
 * Generates 1080x1080 PNG slides for Production Scenarios LinkedIn carousel.
 * Run: node generate-production-carousel-pngs.js
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUT_DIR = path.join(__dirname, 'linkedin-slides', 'production-scenarios-2026');
const TEMP_DIR = path.join(require('os').tmpdir(), 'prod-carousel-gen');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const GUIDE_URL = 'ashishshah1710.github.io/InterviewPrep';

const SLIDES = [
  {
    file: '01-cover.png',
    html: slideCover()
  },
  {
    file: '02-performance-latency.png',
    html: slideList({
      badge: 'Performance & Latency',
      title: 'Can You Investigate This?',
      subtitle: 'What they ask when things get slow',
      page: '2 / 8',
      start: 1,
      items: [
        'API response jumps from 200ms → 5 seconds — how do you investigate?',
        'API works for 100 users but fails at 10,000 concurrent — what first?',
        'CPU looks normal but latency is very high — what is happening?',
        'Find the bottleneck: app, DB, network, or downstream?',
        'SQL fast in dev but 10s in production — why?'
      ]
    })
  },
  {
    file: '03-resilience-database.png',
    html: slideList({
      badge: 'Resilience & Database',
      title: 'Stop the Cascade',
      subtitle: 'Patterns that save production',
      page: '3 / 8',
      start: 6,
      items: [
        'Downstream service slow — protect the entire system',
        'Circuit Breaker vs Retry vs Timeout vs Bulkhead — when?',
        'Database connection pool exhausted — root causes?',
        'Duplicate payment from retries or double-clicks',
        'Idempotency key storage + concurrent requests'
      ]
    })
  },
  {
    file: '04-caching-scale.png',
    html: slideList({
      badge: 'Caching & Scale',
      title: 'Redis & Traffic Spikes',
      subtitle: 'Design for failure, not perfection',
      page: '4 / 8',
      start: 11,
      items: [
        'Redis goes down — should your app fail? Fallback design',
        'Cache invalidation across multiple service instances',
        'Process a 5 GB CSV without OutOfMemoryError',
        'Sync vs async communication — when to choose each?',
        'Rate limiting for APIs serving millions of users'
      ]
    })
  },
  {
    file: '05-kafka-messaging.png',
    html: slideList({
      badge: 'Kafka & Messaging',
      title: 'Message Guarantees',
      subtitle: 'At-least-once is not good enough',
      page: '5 / 8',
      start: 16,
      items: [
        'Consumer crashes before offset commit — what happens?',
        'Ensure the same Kafka event is not processed twice',
        'Kafka ordering — what is actually guaranteed?',
        'Distributed transactions across microservices',
        'Saga Pattern + compensation failures'
      ]
    })
  },
  {
    file: '06-kubernetes-debugging.png',
    html: slideList({
      badge: 'Kubernetes & Debugging',
      title: 'Ship & Debug in Prod',
      subtitle: 'Zero downtime + war stories',
      page: '6 / 8',
      start: 21,
      items: [
        'K8s pod keeps restarting — no obvious error in logs',
        'Deploy Spring Boot with zero downtime',
        'Graceful shutdown — in-flight requests?',
        'Memory grows → crash after days — memory leak',
        'Bug only under heavy traffic — debug approach'
      ]
    })
  },
  {
    file: '07-personal-doc.png',
    html: slideDoc()
  },
  {
    file: '08-cta-free-guide.png',
    html: slideCta()
  }
];

function baseCss() {
  return `
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1080px; height:1080px; overflow:hidden; font-family:'Segoe UI',system-ui,sans-serif; }
  .slide {
    width:1080px; height:1080px;
    background:linear-gradient(145deg,#0d1117 0%,#1a1218 45%,#0d1117 100%);
    color:#f0f6fc; display:flex; flex-direction:column; position:relative;
  }
  .slide::before {
    content:''; position:absolute; top:-100px; right:-100px; width:380px; height:380px;
    background:radial-gradient(circle,rgba(248,81,73,0.14) 0%,transparent 70%); pointer-events:none;
  }
  .header { padding:40px 48px 16px; position:relative; z-index:1; }
  .badge {
    display:inline-block; background:rgba(248,81,73,0.15); border:1px solid rgba(248,81,73,0.45);
    color:#ff7b72; font-size:19px; font-weight:700; letter-spacing:0.05em; text-transform:uppercase;
    padding:7px 16px; border-radius:30px; margin-bottom:14px;
  }
  h1 { font-size:42px; font-weight:800; line-height:1.12; margin-bottom:8px; }
  .hl { background:linear-gradient(90deg,#ff7b72,#f89820); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
  .sub { font-size:22px; color:#8b949e; line-height:1.35; }
  .body { flex:1; padding:4px 48px 32px; position:relative; z-index:1; }
  .footer {
    padding:16px 48px 28px; display:flex; justify-content:space-between; align-items:center;
    border-top:1px solid #30363d; font-size:17px; color:#8b949e; z-index:1;
  }
  .footer b { color:#ff7b72; }
  ul { list-style:none; display:flex; flex-direction:column; gap:10px; }
  li { display:flex; gap:12px; font-size:18px; line-height:1.32; color:#c9d1d9; }
  .num {
    flex-shrink:0; width:30px; height:30px; background:rgba(88,166,255,0.12);
    border:1px solid rgba(88,166,255,0.28); border-radius:8px;
    display:flex; align-items:center; justify-content:center;
    font-size:13px; font-weight:700; color:#58a6ff; margin-top:1px;
  }
  .hook { font-size:26px; color:#c9d1d9; line-height:1.42; margin-top:24px; border-left:4px solid #f85149; padding-left:18px; }
  .stats { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:32px; }
  .stat { background:rgba(255,255,255,0.04); border:1px solid #30363d; border-radius:14px; padding:22px 14px; text-align:center; }
  .stat .n { font-size:40px; font-weight:800; color:#ff7b72; }
  .stat .l { font-size:15px; color:#8b949e; margin-top:5px; }
  .tags { display:flex; flex-wrap:wrap; gap:8px; margin-top:24px; }
  .tag { background:rgba(88,166,255,0.12); border:1px solid rgba(88,166,255,0.28); color:#79c0ff; font-size:16px; padding:6px 14px; border-radius:20px; }
  .center { display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; height:100%; padding:0 64px; }
  .icon { font-size:64px; margin-bottom:18px; }
  .cta-title { font-size:38px; font-weight:800; margin-bottom:14px; }
  .cta-text { font-size:24px; color:#8b949e; line-height:1.45; margin-bottom:22px; }
  .cta-link {
    font-size:20px; color:#58a6ff; background:rgba(88,166,255,0.1);
    border:1px solid rgba(88,166,255,0.35); padding:12px 24px; border-radius:12px; margin-bottom:18px; word-break:break-all;
  }
  .cta-small { font-size:16px; color:#6e7681; }
  .doc-box {
    background:rgba(255,255,255,0.04); border:2px solid rgba(88,166,255,0.35); border-radius:20px;
    padding:36px 40px; margin-top:20px; text-align:left; width:100%;
  }
  .doc-box h2 { font-size:28px; color:#58a6ff; margin-bottom:12px; }
  .doc-box p { font-size:20px; color:#c9d1d9; line-height:1.5; margin-bottom:10px; }
  .doc-url { font-size:17px; color:#79c0ff; word-break:break-all; margin-top:14px; }
  .check { font-size:18px; color:#c9d1d9; margin:8px 0; padding-left:8px; }
  .check::before { content:'✓ '; color:#3fb950; font-weight:700; }
  `;
}

function wrap(body, page, brand) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${baseCss()}</style></head><body>
  <div class="slide">${body}
  <div class="footer"><div><b>${brand || 'Production Scenarios'}</b> · Java Backend 2026</div><div>${page}</div></div>
  </div></body></html>`;
}

function slideCover() {
  return wrap(`<div class="header">
    <div class="badge">Personal Interview Doc · 2026</div>
    <h1>When Production <span class="hl">Breaks</span></h1>
    <div class="sub">25 Java Backend scenarios — investigation steps &amp; interview answers</div>
  </div><div class="body">
    <div class="hook">Companies no longer ask definitions. They want to know how you debug latency spikes, Kafka replays, pool exhaustion &amp; duplicate payments.</div>
    <div class="stats">
      <div class="stat"><div class="n">25</div><div class="l">Scenarios</div></div>
      <div class="stat"><div class="n">6</div><div class="l">Categories</div></div>
      <div class="stat"><div class="n">3–8</div><div class="l">YOE</div></div>
    </div>
    <div class="tags">
      <span class="tag">Spring Boot</span><span class="tag">Kafka</span><span class="tag">K8s</span>
      <span class="tag">Microservices</span><span class="tag">Redis</span><span class="tag">SQL</span>
    </div>
  </div>`, '1 / 8', 'Ashish Shah');
}

function slideList({ badge, title, subtitle, page, start, items }) {
  const list = items.map((t, i) => `<li><span class="num">${start + i}</span><span>${t}</span></li>`).join('');
  return wrap(`<div class="header">
    <div class="badge">${badge}</div>
    <h1>${title}</h1>
    <div class="sub">${subtitle}</div>
  </div><div class="body"><ul>${list}</ul></div>`, page, 'Ashish Shah');
}

function slideDoc() {
  return wrap(`<div class="body center" style="padding-top:48px;">
    <div class="icon">📘</div>
    <h1 style="font-size:36px;margin-bottom:8px;">My Personal <span class="hl">Interview Doc</span></h1>
    <div class="sub" style="margin-bottom:8px;">Full interactive guide — free &amp; open</div>
    <div class="doc-box">
      <h2>Production Scenarios 2026</h2>
      <p>Every scenario includes investigation steps, root causes, Java/Spring code, 30-sec answer &amp; common mistakes.</p>
      <div class="check">Performance &amp; Latency debugging</div>
      <div class="check">Resilience patterns &amp; idempotency</div>
      <div class="check">Kafka, Redis, K8s production traps</div>
      <div class="doc-url">https://${GUIDE_URL}/html/production-scenarios/production-scenarios-2026.html</div>
    </div>
  </div>`, '7 / 8', 'Ashish Shah');
}

function slideCta() {
  return wrap(`<div class="body center">
    <div class="icon">🔗</div>
    <div class="cta-title">Save &amp; Share</div>
    <div class="cta-text">Bookmark this guide. Comment which scenario you've faced in production.</div>
    <div class="cta-link">${GUIDE_URL}</div>
    <div class="cta-small">#Java #SpringBoot #Microservices #Kafka #Kubernetes #InterviewPrep</div>
  </div>`, '8 / 8', 'Ashish Shah');
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(TEMP_DIR, { recursive: true });

if (!fs.existsSync(CHROME)) {
  console.error('Chrome not found at', CHROME);
  process.exit(1);
}

console.log('Generating', SLIDES.length, 'PNG slides to', OUT_DIR);

SLIDES.forEach((slide, idx) => {
  const htmlPath = path.join(TEMP_DIR, `slide-${idx}.html`);
  const pngPath = path.join(OUT_DIR, slide.file);
  fs.writeFileSync(htmlPath, slide.html);
  const uri = 'file:///' + htmlPath.replace(/\\/g, '/');
  try {
    execSync(
      `"${CHROME}" --headless=new --disable-gpu --screenshot="${pngPath}" --window-size=1080,1080 --force-device-scale-factor=1 --hide-scrollbars "${uri}"`,
      { stdio: 'pipe', timeout: 30000 }
    );
    const size = fs.statSync(pngPath).size;
    console.log('OK', slide.file, '(' + Math.round(size / 1024) + ' KB)');
  } catch (e) {
    console.error('FAIL', slide.file, e.message);
  }
});

console.log('Done. Open folder:', OUT_DIR);
