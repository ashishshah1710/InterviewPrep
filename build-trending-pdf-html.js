const fs = require('fs');
const path = __dirname;

const contentJs = fs.readFileSync(path + '/trending-interview-answers-content.js', 'utf8');
eval(contentJs.replace('const TOPICS', 'global.TOPICS'));

const { escHtml, renderTopicHtml } = require('./trending-interview-render.js');
const html = fs.readFileSync(path + '/trending-interview-answers.html', 'utf8');

const compact = process.argv.includes('--full') ? false : true;
const renderOpts = { compact: compact };

let tocHtml = '';
let bodyHtml = '';
let currentCat = '';

TOPICS.forEach(function (t, i) {
  if (t.category !== currentCat) {
    if (currentCat) tocHtml += '</ul>';
    currentCat = t.category;
    bodyHtml += '<div class="category-header">' + escHtml(currentCat) + '</div>';
    tocHtml += '<div class="toc-cat">' + escHtml(currentCat) + '</div><ul class="toc-list">';
  }
  tocHtml += '<li>' + (i + 1) + '. ' + escHtml(t.title) + '</li>';
  bodyHtml += '<div class="topic">' + renderTopicHtml(t, renderOpts) + '</div>';
});
tocHtml += '</ul>';

let out = html
  .replace('<div id="toc"></div>', '<div id="toc">' + tocHtml + '</div>')
  .replace('<div id="content"></div>', '<div id="content">' + bodyHtml + '</div>')
  .replace(/<script src="trending-interview-answers-content\.js"><\/script>\s*<script src="trending-interview-render\.js"><\/script>\s*<script>[\s\S]*?<\/script>/, '');

const suffix = compact ? '-print' : '-full-print';
const outPath = path + '/trending-interview-answers' + suffix + '.html';
fs.writeFileSync(outPath, out);

// Also write compact static HTML as default print target
if (compact) {
  fs.writeFileSync(path + '/trending-interview-answers-print.html', out);
}

console.log('Generated:', outPath, 'Topics:', TOPICS.length, 'Mode:', compact ? 'compact' : 'full');
