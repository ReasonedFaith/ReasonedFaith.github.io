function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function buildToc(sections) {
  const toc = document.getElementById("toc");
  const list = document.createElement("ul");
  sections.forEach(function (s) {
    const slug = slugify(s.section);
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = slug + ".html";
    a.textContent = s.section;
    if (typeof PAGE !== "undefined" && slug === PAGE) {
      a.className = "active";
    }
    li.appendChild(a);
    list.appendChild(li);
  });
  toc.appendChild(list);
}

function buildItem(item) {
  const li = document.createElement("li");
  if (item.children) {
    const span = document.createElement("span");
    span.className = "group-title";
    span.textContent = item.title;
    li.appendChild(span);
    const sub = document.createElement("ul");
    sub.className = "items nested";
    item.children.forEach(function (child) {
      sub.appendChild(buildItem(child));
    });
    li.appendChild(sub);
    return li;
  }
  const a = document.createElement("a");
  a.href = encodeURI(item.path);
  a.textContent = item.title;
  if (item.type === "link") {
    a.target = "_blank";
    a.rel = "noopener";
  }
  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = item.type;
  li.appendChild(a);
  li.appendChild(badge);
  return li;
}

function buildSection(s) {
  const section = document.createElement("section");
  section.id = slugify(s.section);
  const h2 = document.createElement("h2");
  h2.textContent = s.section;
  section.appendChild(h2);
  if (s.description) {
    const p = document.createElement("p");
    p.className = "section-desc";
    p.textContent = s.description;
    section.appendChild(p);
  }
  const list = document.createElement("ul");
  list.className = "items";
  s.items.forEach(function (item) {
    list.appendChild(buildItem(item));
  });
  section.appendChild(list);
  return section;
}

function render() {
  const main = document.getElementById("library");
  buildToc(LIBRARY);
  const sections = typeof PAGE === "undefined"
    ? LIBRARY
    : LIBRARY.filter(function (s) { return slugify(s.section) === PAGE; });
  sections.forEach(function (s) {
    main.appendChild(buildSection(s));
  });
}

render();
