(function () {
  "use strict";

  var root = document.querySelector("[data-slider]");
  var stage = document.querySelector("[data-lamps]");
  if (!root || !stage) {
    return;
  }

  var warmth = stage.querySelector("[data-lamps-warmth]");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  var pointer = { x: 0, y: 0 };
  var slideActive = true;
  var heroVisible = true;
  var frame = null;

  var lamps = Array.prototype.map.call(stage.querySelectorAll("[data-lamp]"), function (element, i) {
    return {
      element: element,
      body: element.querySelector("[data-lamp-body]"),
      depth: Number(element.dataset.depth),
      tilt: Number(element.dataset.tilt),
      phase: i * 2.1,
      x: 0,
      y: 0,
      rotate: 0
    };
  });

  function updateWarmth() {
    var lit = lamps.filter(function (lamp) {
      return lamp.element.classList.contains("is-on");
    }).length;
    warmth.style.opacity = String(lit / lamps.length);
  }

  lamps.forEach(function (lamp) {
    lamp.element.addEventListener("click", function () {
      var on = lamp.element.classList.toggle("is-on");
      lamp.element.setAttribute("aria-pressed", String(on));
      updateWarmth();
    });
    lamp.element.addEventListener("pointerenter", function (event) {
      if (event.pointerType === "mouse") {
        root.dispatchEvent(new CustomEvent("lamphover", { detail: { active: true } }));
      }
    });
    lamp.element.addEventListener("pointerleave", function (event) {
      if (event.pointerType === "mouse") {
        root.dispatchEvent(new CustomEvent("lamphover", { detail: { active: false } }));
      }
    });
  });

  root.addEventListener("pointermove", function (event) {
    if (event.pointerType !== "mouse" || !finePointer.matches) {
      return;
    }
    var box = root.getBoundingClientRect();
    pointer.x = ((event.clientX - box.left) / box.width - 0.5) * 2;
    pointer.y = ((event.clientY - box.top) / box.height - 0.5) * 2;
  });
  root.addEventListener("pointerleave", function () {
    pointer.x = 0;
    pointer.y = 0;
  });

  function render(time) {
    frame = null;
    var seconds = time / 1000;
    lamps.forEach(function (lamp) {
      var floatY = Math.sin(seconds * 0.8 + lamp.phase) * 5;
      var floatRotate = Math.sin(seconds * 0.55 + lamp.phase) * 1.1;
      lamp.x += (pointer.x * lamp.depth - lamp.x) * 0.07;
      lamp.y += (pointer.y * lamp.depth * 0.6 + floatY - lamp.y) * 0.07;
      lamp.rotate += (pointer.x * lamp.tilt + floatRotate - lamp.rotate) * 0.07;
      lamp.body.style.transform =
        "translate3d(" + lamp.x.toFixed(2) + "px," + lamp.y.toFixed(2) + "px,0) rotate(" + lamp.rotate.toFixed(2) + "deg)";
    });
    schedule();
  }

  function schedule() {
    if (frame === null && slideActive && heroVisible && !document.hidden && !reducedMotion.matches) {
      frame = requestAnimationFrame(render);
    }
  }

  function resetLamps() {
    lamps.forEach(function (lamp) {
      lamp.x = 0;
      lamp.y = 0;
      lamp.rotate = 0;
      lamp.body.style.transform = "";
    });
  }

  root.addEventListener("slidechange", function (event) {
    slideActive = event.detail.index === 0;
    schedule();
  });
  document.addEventListener("visibilitychange", schedule);
  reducedMotion.addEventListener("change", function () {
    if (reducedMotion.matches) {
      resetLamps();
    }
    schedule();
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
      schedule();
    }).observe(root);
  }

  schedule();
})();
