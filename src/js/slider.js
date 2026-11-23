(function () {
  "use strict";

  var root = document.querySelector("[data-slider]");
  if (!root) {
    return;
  }

  var slides = Array.prototype.slice.call(root.querySelectorAll("[data-slide]"));
  var bars = Array.prototype.slice.call(root.querySelectorAll("[data-progress]"));
  var pauseButton = root.querySelector("[data-slider-pause]");
  var status = root.querySelector("[data-slider-status]");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var index = 0;
  var reasons = { user: reducedMotion.matches, hidden: document.hidden, focus: false, lamp: false };

  function syncPaused() {
    var paused = reasons.user || reasons.hidden || reasons.focus || reasons.lamp;
    root.classList.toggle("is-paused", paused);
    pauseButton.setAttribute("aria-pressed", String(reasons.user));
    pauseButton.setAttribute(
      "aria-label",
      reasons.user ? "Wznów automatyczną zmianę slajdów" : "Zatrzymaj automatyczną zmianę slajdów"
    );
  }

  function restartBar(bar) {
    bar.classList.remove("is-current");
    void bar.offsetWidth;
    bar.classList.add("is-current");
  }

  function show(next, announce) {
    index = (next + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      var active = i === index;
      slide.classList.toggle("is-active", active);
      slide.inert = !active;
    });
    bars.forEach(function (bar, i) {
      if (i === index) {
        restartBar(bar);
      } else {
        bar.classList.remove("is-current");
      }
    });
    if (announce && status) {
      status.textContent = slides[index].getAttribute("aria-label");
    }
    root.dispatchEvent(new CustomEvent("slidechange", { detail: { index: index } }));
  }

  bars.forEach(function (bar) {
    bar.addEventListener("animationend", function () {
      show(index + 1, false);
    });
  });

  root.querySelector("[data-slider-prev]").addEventListener("click", function () {
    show(index - 1, true);
  });
  root.querySelector("[data-slider-next]").addEventListener("click", function () {
    show(index + 1, true);
  });
  pauseButton.addEventListener("click", function () {
    reasons.user = !reasons.user;
    syncPaused();
  });

  root.addEventListener("focusin", function (event) {
    reasons.focus = event.target.matches(":focus-visible");
    syncPaused();
  });
  root.addEventListener("focusout", function (event) {
    if (!root.contains(event.relatedTarget)) {
      reasons.focus = false;
      syncPaused();
    }
  });

  root.addEventListener("lamphover", function (event) {
    reasons.lamp = event.detail.active;
    syncPaused();
  });

  document.addEventListener("visibilitychange", function () {
    reasons.hidden = document.hidden;
    syncPaused();
  });

  // Przesuwanie palcem.
  var startX = null;
  var startY = null;
  root.addEventListener("touchstart", function (event) {
    startX = event.changedTouches[0].clientX;
    startY = event.changedTouches[0].clientY;
  }, { passive: true });
  root.addEventListener("touchend", function (event) {
    if (startX === null) {
      return;
    }
    var dx = event.changedTouches[0].clientX - startX;
    var dy = event.changedTouches[0].clientY - startY;
    startX = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      show(index + (dx < 0 ? 1 : -1), true);
    }
  }, { passive: true });

  slides.forEach(function (slide, i) {
    slide.inert = i !== index;
  });
  syncPaused();
})();
