(function () {
  "use strict";

  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var closeBtn = document.getElementById("lightboxClose");
  if (!lightbox || !lightboxImg || !closeBtn) return;

  var lastFocused = null;

  function openLightbox(img) {
    lastFocused = document.activeElement;
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  document.querySelectorAll(".lightbox-trigger").forEach(function (img) {
    img.addEventListener("click", function () {
      openLightbox(img);
    });
    img.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(img);
      }
    });
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
})();

(function () {
  "use strict";

  var bg = document.querySelector(".site-bg");
  if (!bg) return;

  var SPEED = 0.18;
  var MAX_OFFSET = 70;
  var DESKTOP_QUERY = "(min-width: 641px)";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  var ticking = false;
  var active = false;

  function update() {
    var offset = Math.min(window.scrollY * SPEED, MAX_OFFSET);
    bg.style.transform = "translate3d(0, " + -offset + "px, 0)";
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  function setActive(shouldBeActive) {
    if (shouldBeActive === active) return;
    active = shouldBeActive;
    if (active) {
      window.addEventListener("scroll", onScroll, { passive: true });
      update();
    } else {
      window.removeEventListener("scroll", onScroll);
      bg.style.transform = "";
    }
  }

  var mql = window.matchMedia(DESKTOP_QUERY);
  setActive(mql.matches);
  mql.addEventListener("change", function (e) {
    setActive(e.matches);
  });
})();
