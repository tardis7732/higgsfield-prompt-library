const state = {
  entries: [],
  current: null,
  mode: "entry",
  guide: { loaded: false, loading: null },
};

const $ = (selector) => document.querySelector(selector);
const config = window.PROMPT_LIBRARY_CONFIG || {
  entriesUrl: "/api/entries",
  translationsUrl: "/api/translations",
  guideUrl: "/output/video_prompt_writing_rules.md",
};
const labels = { Feature: "Model", Quality: "Quality", Bitrate: "Bitrate", Size: "Size", Created: "Created" };
const clean = (text) => (text || "").replace(/\n?\s*(?:Hide|\uc228\uae30\uae30|\uc228\uae30\ub2e4|\uac10\ucd94\uae30)\s*$/i, "").trim();
const koreanHeadings = [
  "\uc7a5\uba74 \ucee8\ud14d\uc2a4\ud2b8", "\ud65c\uc131 \ucc38\uc870", "\uc704\uce58 \uc9c0\ub3c4", "\uccab \ubc88\uc9f8 \ud504\ub808\uc784 \ubc0f \uacf5\uac04 \ube14\ub85c\ud0b9",
  "\ud615\uc2dd \ubaa8\ub4dc", "\uad11\ud559", "\uce74\uba54\ub77c", "\uc561\uc158 \ud0c0\uc774\ubc0d", "\ubb3c\ub9ac\ud559", "\uc870\uba85", "\uc624\ub514\uc624", "\uae0d\uc815\uc801 \uc7a0\uae08", "\ubd80\uc815\uc801 \uc7a0\uae08",
];

function formatKorean(text) {
  let formatted = text;
  for (const heading of koreanHeadings) {
    formatted = formatted.replace(new RegExp(`(^|\\n)(${heading})\\s*(?=[\\uac00-\\ud7a3A-Za-z])`, "g"), "$1$2\n\n");
  }
  return formatted;
}

function folderParts(path) {
  const parts = (path || "").split(" / ");
  return { group: parts.slice(0, -1).join(" / ") || "Project", title: parts.at(-1) || path };
}

function details(text) {
  const parts = (text || "").split(/\n+/).map((item) => item.trim()).filter(Boolean);
  return parts.map((item, index) => (index % 2 ? [parts[index - 1], item] : null)).filter(Boolean);
}

function renderDetails(text) {
  const fragment = document.createDocumentFragment();
  for (const [key, value] of details(text)) {
    const detail = document.createElement("div");
    detail.className = "detail";
    const term = document.createElement("dt");
    const definition = document.createElement("dd");
    term.textContent = labels[key] || key;
    definition.textContent = value;
    detail.append(term, definition);
    fragment.append(detail);
  }
  $("#details").replaceChildren(fragment);
}

function renderPrompt(id, text) {
  const output = $("#" + id);
  output.replaceChildren();
  const prepared = id === "translated" ? formatKorean(clean(text)) : clean(text);
  const blocks = prepared.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);

  for (const block of blocks) {
    const reference = block.match(/^(@(?:image|video|asset|\uc774\ubbf8\uc9c0|\ube44\ub514\uc624)\s*\d*)\s*[:\-]?\s*/i);
    const heading = /^[A-Z][A-Z _-]{2,}$/.test(block) || (/^[\uac00-\ud7a3A-Za-z &/-]{2,45}$/.test(block) && !/[.!?]/.test(block));
    const element = document.createElement(reference ? "p" : heading ? "h3" : "p");
    if (reference) {
      const badge = document.createElement("span");
      badge.className = "reference-tag";
      badge.textContent = reference[1];
      element.append(badge, document.createTextNode(block.slice(reference[0].length)));
    } else {
      element.textContent = block;
    }
    output.append(element);
  }
}

function renderAssets(items) {
  const assets = (items || []).map((item) => (typeof item === "string" ? { url: item, name: "" } : item)).filter((item) => item && item.url);
  const panel = $("#assets");
  const grid = $("#asset-grid");
  panel.hidden = !assets.length;
  grid.replaceChildren();
  if (!assets.length) return;

  const show = (asset, index) => {
    $("#asset-preview").src = asset.url;
    $("#asset-preview").alt = asset.name || `Reference asset ${index + 1}`;
    $("#asset-preview-link").href = asset.url;
    $("#asset-name").textContent = asset.name || `Reference asset ${index + 1}`;
    grid.querySelectorAll(".asset-card").forEach((node, itemIndex) => node.classList.toggle("active", itemIndex === index));
  };

  const cards = assets.map((asset, index) => {
    const card = document.createElement("a");
    const image = document.createElement("img");
    card.href = asset.url;
    card.target = "_blank";
    card.className = "asset-card";
    card.title = asset.name || `Reference asset ${index + 1}`;
    card.addEventListener("click", (event) => { event.preventDefault(); show(asset, index); });
    image.src = asset.url;
    image.alt = card.title;
    card.append(image);
    return card;
  });

  grid.replaceChildren(...cards);
  show(assets[0], 0);
}

function renderList() {
  const fragment = document.createDocumentFragment();
  for (const entry of state.entries) {
    const button = document.createElement("button");
    const { group, title } = folderParts(entry.folder_path);
    const path = document.createElement("small");
    const name = document.createElement("span");
    const note = document.createElement("em");
    button.type = "button";
    button.className = `entry ${state.mode === "entry" && entry === state.current ? "active" : ""} ${entry.asset_id ? "" : "empty"}`.trim();
    button.setAttribute("aria-current", state.mode === "entry" && entry === state.current ? "page" : "false");
    path.textContent = group;
    name.textContent = title;
    note.textContent = entry.asset_id ? "Prompt" : "No video";
    button.append(path, name, note);
    button.addEventListener("click", () => select(entry));
    fragment.append(button);
  }
  $("#entries").replaceChildren(fragment);
}

function setEntryMode() {
  state.mode = "entry";
  $("#guide-nav").classList.remove("active");
  $("#guide-view").hidden = true;
  $("#content").hidden = false;
  $("#empty").hidden = true;
}

function select(entry) {
  state.current = entry;
  setEntryMode();
  renderList();
  $("#title").textContent = entry.folder_path;
  renderDetails(entry.details);
  $("#source-link").href = entry.source_url;

  const video = $("#source-video");
  const thumbnail = $("#source-thumbnail");
  $("#media").hidden = !(entry.video_url || entry.thumbnail_url);
  video.hidden = !entry.video_url;
  thumbnail.hidden = !!entry.video_url || !entry.thumbnail_url;
  video.src = entry.video_url || "";
  video.poster = entry.thumbnail_url || "";
  thumbnail.src = entry.thumbnail_url || "";

  renderAssets(entry.asset_urls);
  renderPrompt("original", entry.prompt || "No visible first video in this folder.");
  renderPrompt("translated", entry.translation_ko || "Korean translation is not available.");
  $("#status").textContent = "";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
}

function inlineMarkdown(value) {
  let html = escapeHtml(value);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1 <span class="external-link">&#8599;</span></a>');
  return html;
}

function appendInline(element, value) {
  element.innerHTML = inlineMarkdown(value);
}

function tableCells(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function isTableSeparator(line) {
  return /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function slugify(text, used) {
  const base = text.toLowerCase().replace(/<[^>]*>/g, "").replace(/[^a-z0-9\uac00-\ud7a3]+/g, "-").replace(/(^-|-$)/g, "") || "section";
  const count = used.get(base) || 0;
  used.set(base, count + 1);
  return count ? `${base}-${count + 1}` : base;
}

function isBlockStart(lines, index) {
  const line = lines[index] || "";
  const next = lines[index + 1] || "";
  return /^#{1,6}\s+/.test(line) || /^```/.test(line) || /^>/.test(line) || /^\s*(?:---+|\*\*\*+|___+)\s*$/.test(line)
    || /^\s*(?:[-*+]\s+|\d+\.\s+)/.test(line) || (line.includes("|") && isTableSeparator(next));
}

function renderGuideToc(items) {
  const toc = $("#guide-toc");
  toc.replaceChildren();
  if (!items.length) return;
  const title = document.createElement("p");
  const list = document.createElement("div");
  title.className = "toc-label";
  title.textContent = "ON THIS PAGE";
  list.className = "toc-links";
  for (const item of items) {
    const link = document.createElement("a");
    link.href = `#${item.id}`;
    link.textContent = item.text;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    list.append(link);
  }
  toc.append(title, list);
}

function renderMarkdown(markdown) {
  const output = $("#guide-content");
  const lines = markdown.replace(/\r/g, "").split("\n");
  const tocItems = [];
  const usedIds = new Map();
  const fragment = document.createDocumentFragment();
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();
    if (!trimmed) { index += 1; continue; }

    const heading = trimmed.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (heading) {
      const level = Math.min(heading[1].length, 4);
      const element = document.createElement(`h${level}`);
      const text = heading[2];
      element.id = slugify(text, usedIds);
      appendInline(element, text);
      if (level === 2) tocItems.push({ id: element.id, text });
      fragment.append(element);
      index += 1;
      continue;
    }

    if (/^```/.test(trimmed)) {
      const language = trimmed.slice(3).trim();
      const code = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index].trim())) { code.push(lines[index]); index += 1; }
      if (index < lines.length) index += 1;
      const pre = document.createElement("pre");
      const codeElement = document.createElement("code");
      if (language) codeElement.dataset.language = language;
      codeElement.textContent = code.join("\n");
      pre.append(codeElement);
      fragment.append(pre);
      continue;
    }

    if (/^\s*(?:---+|\*\*\*+|___+)\s*$/.test(line)) {
      fragment.append(document.createElement("hr"));
      index += 1;
      continue;
    }

    if (/^>/.test(trimmed)) {
      const quote = [];
      while (index < lines.length && /^>/.test(lines[index].trim())) {
        quote.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      const blockquote = document.createElement("blockquote");
      const paragraph = document.createElement("p");
      appendInline(paragraph, quote.join(" "));
      blockquote.append(paragraph);
      fragment.append(blockquote);
      continue;
    }

    if (line.includes("|") && isTableSeparator(lines[index + 1] || "")) {
      const headers = tableCells(line);
      const tableWrap = document.createElement("div");
      const table = document.createElement("table");
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
      for (const header of headers) {
        const cell = document.createElement("th");
        appendInline(cell, header);
        headerRow.append(cell);
      }
      thead.append(headerRow);
      const tbody = document.createElement("tbody");
      index += 2;
      while (index < lines.length && lines[index].includes("|") && lines[index].trim()) {
        const row = document.createElement("tr");
        for (const value of tableCells(lines[index])) {
          const cell = document.createElement("td");
          appendInline(cell, value);
          row.append(cell);
        }
        tbody.append(row);
        index += 1;
      }
      table.append(thead, tbody);
      tableWrap.className = "table-wrap";
      tableWrap.append(table);
      fragment.append(tableWrap);
      continue;
    }

    const listMatch = trimmed.match(/^\s*([-*+]|\d+\.)\s+(.+)$/);
    if (listMatch) {
      const ordered = /\d+\./.test(listMatch[1]);
      const list = document.createElement(ordered ? "ol" : "ul");
      while (index < lines.length) {
        const match = lines[index].trim().match(/^([-*+]|\d+\.)\s+(.+)$/);
        if (!match || /\d+\./.test(match[1]) !== ordered) break;
        const item = document.createElement("li");
        const task = match[2].match(/^\[([ xX])\]\s+(.+)$/);
        if (task) {
          const check = document.createElement("span");
          const copy = document.createElement("span");
          check.className = `task-check ${task[1].toLowerCase() === "x" ? "done" : ""}`;
          check.textContent = task[1].toLowerCase() === "x" ? "✓" : "";
          appendInline(copy, task[2]);
          item.append(check, copy);
        } else {
          appendInline(item, match[2]);
        }
        list.append(item);
        index += 1;
      }
      fragment.append(list);
      continue;
    }

    const paragraphLines = [];
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines, index)) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    const paragraph = document.createElement("p");
    appendInline(paragraph, paragraphLines.join(" "));
    fragment.append(paragraph);
  }

  output.replaceChildren(fragment);
  renderGuideToc(tocItems);
}

async function showGuide() {
  state.mode = "guide";
  $("#guide-nav").classList.add("active");
  $("#content").hidden = true;
  $("#empty").hidden = true;
  $("#guide-view").hidden = false;
  renderList();

  if (state.guide.loaded) return;
  if (!state.guide.loading) {
    state.guide.loading = fetch(config.guideUrl, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`Guide could not be loaded (${response.status})`);
        return response.text();
      })
      .then((markdown) => { renderMarkdown(markdown); state.guide.loaded = true; })
      .catch((error) => { $("#guide-content").textContent = error.message; })
      .finally(() => { state.guide.loading = null; });
  }
  await state.guide.loading;
}

async function copyPrompt(button) {
  const target = $("#" + button.dataset.copy);
  try {
    await navigator.clipboard.writeText(target.textContent);
    const previous = button.textContent;
    button.textContent = "Copied";
    window.setTimeout(() => { button.textContent = previous; }, 1200);
  } catch {
    button.textContent = "Copy failed";
  }
}

$("#guide-nav").addEventListener("click", showGuide);
document.querySelectorAll("[data-copy]").forEach((button) => button.addEventListener("click", () => copyPrompt(button)));
$("#guide-download").href = config.guideUrl;

async function loadLibrary() {
  if (config.libraryUrl) {
    const response = await fetch(config.libraryUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`Library could not be loaded (${response.status})`);
    return response.json();
  }
  const [entriesResponse, translationsResponse] = await Promise.all([
    fetch(config.entriesUrl),
    fetch(config.translationsUrl),
  ]);
  const [entries, translations] = await Promise.all([entriesResponse.json(), translationsResponse.json()]);
  const byId = Object.fromEntries(translations.entries.map((entry) => [entry.asset_id, entry.translation_ko]));
  return entries.map((entry) => ({ ...entry, translation_ko: byId[entry.asset_id] || "" }));
}

loadLibrary().then((entries) => {
  state.entries = entries;
  $("#count").textContent = `${entries.length} prompts`;
  $("#sidebar-count").textContent = entries.length;
  renderList();
  if (state.entries[0]) select(state.entries[0]);
  else { $("#empty").hidden = false; $("#empty").textContent = "No collected prompts yet."; }
}).catch((error) => { $("#empty").hidden = false; $("#empty").textContent = `Could not load the library: ${error.message}`; });
