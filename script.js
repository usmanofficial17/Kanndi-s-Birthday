/* =====================================================
   KANNADI BIRTHDAY — ENGINE
   Corrected version
   ===================================================== */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[c]));
}

/* =====================================================
   RENDER WEBSITE
   ===================================================== */

function render() {
  const c = BIRTHDAY_CONFIG;

  // Theme colors
  document.documentElement.style.setProperty("--blue", c.mainColor);
  document.documentElement.style.setProperty("--accent", c.accentColor);

  // Opening
  const openingEyebrow = $("#openingEyebrow");
  const openingTitle = $("#openingTitle");
  const openingSubtitle = $("#openingSubtitle");
  const revealBtn = $("#revealBtn");

  if (openingEyebrow) openingEyebrow.textContent = c.opening.eyebrow;
  if (openingTitle) openingTitle.textContent = c.opening.title;
  if (openingSubtitle) openingSubtitle.textContent = c.opening.subtitle;
  if (revealBtn) revealBtn.textContent = c.opening.button;

  // Reveal
  const revealTitle = $("#revealTitle");
  const revealText = $("#revealText");
  const revealContinue = $("#revealContinue");

  if (revealTitle) revealTitle.textContent = c.reveal.title;

  if (revealText) {
    revealText.innerHTML = c.reveal.paragraphs
      .map(p => `<p>${escapeHTML(p)}</p>`)
      .join("");
  }

  if (revealContinue) {
    revealContinue.textContent = c.reveal.button;
  }

  // Timeline / memories
  const timeline = $("#timeline");

  if (timeline) {
    timeline.innerHTML = c.memories.map(m => `
      <article class="memory fade">

        ${
          m.image
            ? `<img
                src="${escapeHTML(m.image)}"
                alt="${escapeHTML(m.title)}"
                loading="lazy"
              >`
            : ""
        }

        <div class="memory-date">
          ${escapeHTML(m.date)}
        </div>

        <h3>
          ${escapeHTML(m.title)}
        </h3>

        <p>
          ${escapeHTML(m.text)}
        </p>

      </article>
    `).join("");
  }

  // Gallery
  const gallery = $("#gallery");

  if (gallery) {
    gallery.innerHTML = c.gallery.map(g => `
      <div
        class="photo fade"
        ${g.image ? `data-image="${escapeHTML(g.image)}"` : ""}
      >

        ${
          g.image
            ? `
              <img
                src="${escapeHTML(g.image)}"
                alt="${escapeHTML(g.caption)}"
                loading="lazy"
              >
            `
            : `
              <span>
                📷
                <br><br>
                ${escapeHTML(g.caption)}
                <br>
                <small>
                  Replace this placeholder in config.js
                </small>
              </span>
            `
        }

      </div>
    `).join("");
  }

  // Emotional section
  const emotionalTitle = $("#emotionalTitle");
  const letter = $("#letter");

  if (emotionalTitle) {
    emotionalTitle.textContent = c.emotional.title;
  }

  if (letter) {
    letter.innerHTML = c.emotional.paragraphs
      .map(p => `<p>${escapeHTML(p)}</p>`)
      .join("");
  }

  // Final section
  const finalTitle = $("#finalTitle");
  const finalSubtitle = $("#finalSubtitle");
  const finalJoke = $("#finalJoke");
  const replay = $("#replay");

  if (finalTitle) finalTitle.textContent = c.final.title;
  if (finalSubtitle) finalSubtitle.textContent = c.final.subtitle;
  if (finalJoke) finalJoke.textContent = c.final.joke;
  if (replay) replay.textContent = c.final.button;

  // Music button
  const musicBtn = $("#musicBtn");

  if (musicBtn) {
    musicBtn.onclick = () => {
      if (c.musicUrl) {
        window.open(
          c.musicUrl,
          "_blank",
          "noopener,noreferrer"
        );
      }
    };
  }

  // Buttons and interactions
  bindReveal();
  observeFades();
  bindGallery();
}

/* =====================================================
   BUTTONS
   ===================================================== */

function bindReveal() {

  // FIRST BUTTON
  // "Prove it →"
  const revealBtn = $("#revealBtn");
  const revealSection = $("#reveal");

  if (revealBtn && revealSection) {

    revealBtn.onclick = function (event) {

      event.preventDefault();

      revealSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      burst();
    };
  }


  // SECOND BUTTON
  // "Continue →"
  const continueBtn = $("#revealContinue");
  const storySection = $("#story");

  if (continueBtn && storySection) {

    continueBtn.onclick = function (event) {

      event.preventDefault();

      storySection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    };
  }


  // FINAL BUTTON
  // "Replay the chaos"
  const replayBtn = $("#replay");

  if (replayBtn) {

    replayBtn.onclick = function (event) {

      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  }
}

/* =====================================================
   FADE-IN ANIMATIONS
   ===================================================== */

function observeFades() {

  const els = $$(".fade");

  if (!els.length) return;

  // Fallback for browsers without IntersectionObserver
  if (!("IntersectionObserver" in window)) {

    els.forEach(el => {
      el.classList.add("visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12
    }
  );

  els.forEach(el => observer.observe(el));
}

/* =====================================================
   PHOTO GALLERY
   ===================================================== */

function bindGallery() {

  const modal = $("#modal");
  const modalImage = $("#modalImage");

  if (!modal || !modalImage) return;

  $$(".photo[data-image]").forEach(card => {

    card.addEventListener("click", () => {

      const image = card.dataset.image;

      if (!image) return;

      modalImage.src = image;

      modal.classList.add("open");
    });

  });
}

/* =====================================================
   SPARKLE EFFECT
   ===================================================== */

function burst() {

  for (let i = 0; i < 24; i++) {

    const s = document.createElement("i");

    s.className = "spark";

    s.style.left = `${window.innerWidth / 2}px`;
    s.style.top = `${window.innerHeight / 2}px`;

    s.style.setProperty(
      "--x",
      `${(Math.random() - 0.5) * 280}px`
    );

    s.style.setProperty(
      "--y",
      `${(Math.random() - 0.5) * 240}px`
    );

    document.body.appendChild(s);

    setTimeout(() => {
      s.remove();
    }, 1100);
  }
}

/* =====================================================
   SCROLL PROGRESS BAR
   ===================================================== */

window.addEventListener("scroll", () => {

  const progressBar = $(".progress");

  if (!progressBar) return;

  const max =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress =
    max > 0
      ? window.scrollY / max
      : 0;

  progressBar.style.width =
    `${progress * 100}%`;
});

/* =====================================================
   ESCAPE KEY CLOSES PHOTO
   ===================================================== */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    const modal = $("#modal");

    if (modal) {
      modal.classList.remove("open");
    }
  }
});

/* =====================================================
   CLOSE PHOTO MODAL
   ===================================================== */

const closeModal = $("#closeModal");

if (closeModal) {

  closeModal.onclick = () => {

    const modal = $("#modal");

    if (modal) {
      modal.classList.remove("open");
    }

  };
}


const modal = $("#modal");

if (modal) {

  modal.addEventListener("click", event => {

    if (event.target.id === "modal") {

      modal.classList.remove("open");

    }

  });
}

/* =====================================================
   START WEBSITE
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  try {

    render();

  } catch (error) {

    console.error(
      "Kannadi Birthday Website error:",
      error
    );

  }

});
