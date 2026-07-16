/* Shared renderer — browser (window) and Node (module.exports) */
function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

var SECTION_LABELS = {
  full: [
    'THE "WHY" & CORE ARCHITECTURE',
    'PRODUCTION-GRADE REAL-WORLD EXAMPLE',
    'THE "EXECUTIVE" INTERVIEW ANSWER',
    'THE TRADE-OFFS & CONSTRAINTS',
    'EXPECTED FOLLOW-UP QUESTIONS & TRAPS'
  ],
  compact: [
    'WHY & ARCHITECTURE',
    'PRODUCTION EXAMPLE',
    'EXECUTIVE ANSWER (2 min)',
    'TRADE-OFFS',
    'FOLLOW-UPS & TRAPS'
  ]
};

function renderTopicHtml(t, opts) {
  opts = opts || {};
  var compact = !!opts.compact;
  var labels = compact ? SECTION_LABELS.compact : SECTION_LABELS.full;
  var h = '';

  if (compact) {
    h += '<h3 class="topic-title">' + escHtml(t.title);
    if (t.scaleContext) h += ' <span class="meta-inline">(' + escHtml(t.scaleContext) + ')</span>';
    h += '</h3>';
  } else {
    h += '<div class="topic-meta">';
    h += '<span class="meta-cat">' + escHtml(t.category) + '</span>';
    if (t.scaleContext) h += '<span class="meta-scale">Scale: ' + escHtml(t.scaleContext) + '</span>';
    h += '</div>';
    h += '<h3 class="topic-title">' + escHtml(t.title) + '</h3>';
  }

  h += section(1, 'sec-why', labels[0], formatText(t.whyArchitecture), compact);
  h += sectionProduction(t, labels[1], compact);
  h += section(3, 'sec-executive', labels[2], formatText(t.executiveAnswer, 'executive-script'), compact);
  h += section(4, 'sec-tradeoffs', labels[3], formatText(t.tradeOffs), compact);
  h += sectionFollowups(t, labels[4], compact);

  return h;
}

function section(num, cls, label, body, compact) {
  return '<div class="section ' + cls + '">' +
    '<h4 class="section-head">' + (compact ? num + '. ' : '<span class="sec-num">' + num + '</span> ') + escHtml(label) + '</h4>' +
    '<div class="section-body">' + body + '</div></div>';
}

function sectionProduction(t, label, compact) {
  var body = '';
  if (t.productionScenario) {
    body += '<p class="scenario-label"><strong>Scenario:</strong> ' + escHtml(t.productionScenario) + '</p>';
  }
  if (t.productionCode) body += '<pre>' + escHtml(t.productionCode) + '</pre>';
  if (t.productionDiagram) body += '<pre class="diagram">' + escHtml(t.productionDiagram) + '</pre>';
  return section(2, 'sec-production', label, body, compact);
}

function sectionFollowups(t, label, compact) {
  var body = '';
  if (compact) {
    body += '<ul class="followup-compact">';
    (t.followUps || []).forEach(function (fu, idx) {
      body += '<li><strong>Q' + (idx + 1) + ':</strong> ' + escHtml(fu.q) +
        ' <em>A:</em> ' + escHtml(fu.a) + '</li>';
    });
    body += '</ul>';
  } else {
    (t.followUps || []).forEach(function (fu, idx) {
      body += '<div class="followup-item">';
      body += '<p class="followup-q"><strong>Q' + (idx + 1) + ':</strong> ' + escHtml(fu.q) + '</p>';
      body += '<p class="followup-a"><strong>Expert Answer:</strong> ' + escHtml(fu.a) + '</p>';
      body += '</div>';
    });
  }
  return section(5, 'sec-followups', label, body, compact);
}

function formatText(text, extraClass) {
  if (!text) return '';
  var cls = extraClass ? ' class="' + extraClass + '"' : '';
  return escHtml(text)
    .split(/\n\n+/)
    .map(function (p) { return '<p' + cls + '>' + p.replace(/\n/g, ' ') + '</p>'; })
    .join('');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { escHtml: escHtml, renderTopicHtml: renderTopicHtml, formatText: formatText };
}
