/* =====================================================
   KANNADI BIRTHDAY — ENGINE
   No need to edit this file for normal personalization.
   ===================================================== */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[c]));
}

function render() {
  const c = BIRTHDAY_CONFIG;
  document.documentElement.style.setProperty("--blue", c.mainColor);
  document.documentElement.style.setProperty("--accent", c.accentColor);

  $("#openingEyebrow").textContent = c.opening.eyebrow;
  $("#openingTitle").textContent = c.opening.title;
  $("#openingSubtitle").textContent = c.opening.subtitle;
  $("#revealBtn").textContent = c.opening.button;

  $("#revealTitle").textContent = c.reveal.title;
  $("#revealText").innerHTML = c.reveal.paragraphs.map(p => `<p>${escapeHTML(p)}</p>`).join("");
  $("#revealContinue").textContent = c.reveal.button;

  $("#timeline").innerHTML = c.memories.map((m, i) => `
    <article class="memory fade">
      ${m.image ? `<img src="${escapeHTML(m.image)}" alt="${escapeHTML(m.title)}" loading="lazy">` : ""}
      <div class="memory-date">${escapeHTML(m.date)}</div>
      <h3>${escapeHTML(m.title)}</h3>
      <p>${escapeHTML(m.text)}</p>
    </article>
  `).join("");

  $("#gallery").innerHTML = c.gallery.map((g, i) => `
    <div class="photo fade" ${g.image ? `data-image="${escapeHTML(g.image)}"` : ""}>
      ${g.image
        ? `<img src="${escapeHTML(g.image)}" alt="${escapeHTML(g.caption)}" loading="lazy">`
        : `<span>📷<br><br>${escapeHTML(g.caption)}<br><small>Replace this placeholder in config.js</small></span>`}
    </div>
  `).join("");

  $("#emotionalTitle").textContent = c.emotional.title;
  $("#letter").innerHTML = c.emotional.paragraphs.map(p => `<p>${escapeHTML(p)}</p>`).join("");

  $("#finalTitle").textContent = c.final.title;
  $("#finalSubtitle").textContent = c.final.subtitle;
  $("#finalJoke").textContent = c.final.joke;
  $("#replay").textContent = c.final.button;

  $("#musicBtn").onclick = () => {
    window.open(c.musicUrl, "_blank", "noopener,noreferrer");
  };

  bindReveal();
  observeFades();
  bindGallery();
}

function bindReveal() {
  $("#revealBtn").onclick = () => {
    $("#reveal").scrollIntoView({ behavior: "smooth" });
    burst();
  };
  $("#revealContinue").onclick = () => {
    $("#story").scrollIntoView({ behavior: "smooth" });
  };
  $("#replay").onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

function observeFades() {
  const els = $$(".fade");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  els.forEach(el => observer.observe(el));
}

function bindGallery() {
  $$(".photo[data-image]").forEach(card => {
    card.addEventListener("click", () => {
      $("#modalImage").src = card.dataset.image;
      $("#modal").classList.add("open");
    });
  });
}

function burst() {
  for (let i = 0; i < 24; i++) {
    const s = document.createElement("i");
    s.className = "spark";
    s.style.left = `${innerWidth / 2}px`;
    s.style.top = `${innerHeight / 2}px`;
    s.style.setProperty("--x", `${(Math.random() - .5) * 280}px`);
    s.style.setProperty("--y", `${(Math.random() - .5) * 240}px`);
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1100);
  }
}

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  const progress = max > 0 ? scrollY / max : 0;
  $(".progress").style.width = `${progress * 100}%`;
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") $("#modal").classList.remove("open");
});

$("#closeModal").onclick = () => $("#modal").classList.remove("open");
$("#modal").addEventListener("click", e => {
  if (e.target.id === "modal") $("#modal").classList.remove("open");
});

render();
