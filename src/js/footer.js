(function () {
  "use strict";

  var columns = document.querySelectorAll("[data-footer-column]");
  var wide = window.matchMedia("(min-width: 768px)");

  function sync() {
    columns.forEach(function (column) {
      column.open = wide.matches;
      var summary = column.querySelector("summary");
      if (wide.matches) {
        summary.setAttribute("tabindex", "-1");
      } else {
        summary.removeAttribute("tabindex");
      }
    });
  }

  columns.forEach(function (column) {
    column.querySelector("summary").addEventListener("click", function (event) {
      if (wide.matches) {
        event.preventDefault();
      }
    });
  });

  wide.addEventListener("change", sync);
  sync();
})();
