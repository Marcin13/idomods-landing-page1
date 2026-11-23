(function () {
  "use strict";

  var header = document.querySelector("[data-header]");
  var toggle = document.querySelector("[data-menu-toggle]");
  var panel = document.querySelector("[data-menu-panel]");
  if (!header || !toggle || !panel) {
    return;
  }

  var desktop = window.matchMedia("(min-width: 1200px)");
  var main = document.getElementById("main");
  var footer = document.querySelector(".site-footer");

  function setOpen(open, returnFocus) {
    header.classList.toggle("is-open", open);
    document.body.classList.toggle("is-menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
    main.inert = open;
    footer.inert = open;
    if (returnFocus) {
      toggle.focus();
    }
  }

  toggle.addEventListener("click", function () {
    setOpen(!header.classList.contains("is-open"), false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && header.classList.contains("is-open")) {
      setOpen(false, true);
    }
  });

  panel.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      setOpen(false, false);
    }
  });

  desktop.addEventListener("change", function (event) {
    if (event.matches) {
      setOpen(false, false);
    }
  });
})();
