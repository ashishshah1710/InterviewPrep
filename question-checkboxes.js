/** Completion checkboxes for interview questions — persisted in localStorage */
(function () {
  var STORAGE_KEY = "interview-prep-progress";

  function getProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  function makeId(pagePath, title, blockNum) {
    var key = blockNum || title;
    return pagePath + "::" + key.trim().toLowerCase().replace(/\s+/g, " ").slice(0, 120);
  }

  function wrapTitleText(h3, label) {
    if (h3.querySelector(".question-title-text")) return;
    var span = document.createElement("span");
    span.className = "question-title-text";
    Array.from(h3.childNodes).forEach(function (node) {
      if (node !== label) span.appendChild(node);
    });
    h3.appendChild(span);
  }

  function addCheckbox(container, h3, idPrefix) {
    if (container.querySelector(".question-done-checkbox")) return null;

    var pagePath = location.pathname.split("/").pop() || "index.html";
    var blockNumEl = container.querySelector(":scope > .block-num");
    var blockNum = blockNumEl ? blockNumEl.textContent.trim() : "";
    var titleEl = h3.querySelector(".question-title-text") || h3;
    var title = titleEl.textContent.trim();
    var id = idPrefix ? idPrefix + makeId(pagePath, title, blockNum) : makeId(pagePath, title, blockNum);
    var isDone = !!getProgress()[id];

    var label = document.createElement("label");
    label.className = "question-done-label";
    label.title = "Mark as completed";

    var input = document.createElement("input");
    input.type = "checkbox";
    input.className = "question-done-checkbox";
    input.checked = isDone;
    input.setAttribute("aria-label", "Mark complete: " + title);

    label.appendChild(input);
    h3.insertBefore(label, h3.firstChild);
    wrapTitleText(h3, label);

    input.addEventListener("change", function () {
      var current = getProgress();
      if (input.checked) current[id] = true;
      else delete current[id];
      saveProgress(current);
      container.classList.toggle("question-complete", input.checked);
      updateProgressBar();
    });

    if (isDone) container.classList.add("question-complete");
    return input;
  }

  var checkboxCount = 0;

  document.querySelectorAll(".topic-block").forEach(function (block) {
    var h3 = block.querySelector(":scope > h3");
    if (!h3) return;
    if (addCheckbox(block, h3)) checkboxCount++;
  });

  document.querySelectorAll("main article").forEach(function (article) {
    var h3 = article.querySelector(":scope > h3");
    if (!h3) return;
    if (addCheckbox(article, h3)) checkboxCount++;
  });

  document.querySelectorAll(".faq-category li").forEach(function (li) {
    var link = li.querySelector("a");
    if (!link || li.querySelector(".question-done-checkbox")) return;

    var pagePath = location.pathname.split("/").pop() || "index.html";
    var title = link.textContent.trim();
    var id = "faq::" + makeId(pagePath, title, "");
    var isDone = !!getProgress()[id];

    var label = document.createElement("label");
    label.className = "question-done-label faq-done-label";

    var input = document.createElement("input");
    input.type = "checkbox";
    input.className = "question-done-checkbox";
    input.checked = isDone;
    input.setAttribute("aria-label", "Mark complete: " + title);

    label.appendChild(input);
    li.insertBefore(label, li.firstChild);
    li.classList.toggle("question-complete", isDone);

    input.addEventListener("change", function () {
      var current = getProgress();
      if (input.checked) current[id] = true;
      else delete current[id];
      saveProgress(current);
      li.classList.toggle("question-complete", input.checked);
      updateProgressBar();
    });

    checkboxCount++;
  });

  var progressBarEl = null;

  function updateProgressBar() {
    if (!progressBarEl) return;
    var boxes = document.querySelectorAll(".question-done-checkbox");
    var total = boxes.length;
    var done = 0;
    boxes.forEach(function (cb) {
      if (cb.checked) done++;
    });
    var pct = total ? Math.round((done / total) * 100) : 0;
    progressBarEl.querySelector(".study-progress-text").textContent =
      done + " / " + total + " completed";
    progressBarEl.querySelector(".study-progress-fill").style.width = pct + "%";
    progressBarEl.hidden = total === 0;
  }

  if (checkboxCount > 0) {
    var main = document.querySelector("main");
    if (main) {
      progressBarEl = document.createElement("div");
      progressBarEl.className = "study-progress-bar";
      progressBarEl.innerHTML =
        '<div class="study-progress-header">' +
        '<span class="study-progress-text">0 / ' +
        checkboxCount +
        " completed</span>" +
        '<span class="study-progress-hint">Progress saved in this browser</span>' +
        "</div>" +
        '<div class="study-progress-track"><div class="study-progress-fill"></div></div>';
      main.insertBefore(progressBarEl, main.firstChild);
      updateProgressBar();
    }
  }
})();
