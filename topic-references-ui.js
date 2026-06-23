/** Inject external deep-dive reference links next to each topic */
(function () {
  if (typeof TOPIC_REFERENCES === "undefined") return;

  function normalizeKey(text) {
    return text.trim().toLowerCase().replace(/\s+/g, " ");
  }

  function lookupRefs(text) {
    var key = normalizeKey(text);
    var keys = Object.keys(TOPIC_REFERENCES);
    for (var i = 0; i < keys.length; i++) {
      if (normalizeKey(keys[i]) === key) return TOPIC_REFERENCES[keys[i]];
    }
    return null;
  }

  function buildRefLinksHtml(refs) {
    return refs
      .map(function (ref) {
        return (
          '<a class="topic-ref-link" href="' +
          ref.url +
          '" target="_blank" rel="noopener noreferrer" title="Deep dive: ' +
          ref.label +
          '">' +
          ref.label +
          " ↗</a>"
        );
      })
      .join("");
  }

  function injectRefs(container, titleText) {
    if (container.querySelector(".topic-ref-links")) return;
    var refs = lookupRefs(titleText);
    if (!refs || !refs.length) return;

    var wrap = document.createElement("div");
    wrap.className = "topic-ref-links";
    wrap.setAttribute("aria-label", "External references for " + titleText);
    wrap.innerHTML = buildRefLinksHtml(refs);
    container.appendChild(wrap);
  }

  /* Checklist rows */
  document.querySelectorAll(".faq-category li").forEach(function (li) {
    var topicLink = li.querySelector(":scope > a, .faq-item-body > a");
    if (!topicLink) topicLink = li.querySelector("a:not(.topic-ref-link)");
    if (!topicLink) return;

    var body = li.querySelector(".faq-item-body");
    if (!body) {
      body = document.createElement("div");
      body.className = "faq-item-body";
      topicLink.parentNode.insertBefore(body, topicLink);
      body.appendChild(topicLink);
    }
    injectRefs(body, topicLink.textContent);
  });

  /* Topic blocks and articles */
  document.querySelectorAll(".topic-block, main article").forEach(function (block) {
    var h3 = block.querySelector(":scope > h3");
    if (!h3) return;
    var titleEl = h3.querySelector(".question-title-text") || h3;
    var title = titleEl.textContent.trim();
    if (!title || title === "Q") return;

    var anchor = h3.nextElementSibling;
    if (anchor && anchor.classList.contains("topic-ref-links")) return;

    var refs = lookupRefs(title);
    if (!refs || !refs.length) return;

    var wrap = document.createElement("div");
    wrap.className = "topic-ref-links topic-ref-links-block";
    wrap.setAttribute("aria-label", "External references");
    wrap.innerHTML = '<span class="topic-ref-label">Deep dive:</span>' + buildRefLinksHtml(refs);
    h3.insertAdjacentElement("afterend", wrap);
  });
})();
