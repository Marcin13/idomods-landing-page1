(function () {
  "use strict";

  // Strona demonstracyjna: linki i formularze nigdzie nie prowadzą.
  document.addEventListener("click", function (event) {
    var link = event.target.closest('a[href="#"]');
    if (link) {
      event.preventDefault();
    }
  });

  document.querySelectorAll("[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
    });
  });
})();
