(function () {
  "use strict";

  // Osobna warstwa światła i cienia nad shaderem. Maska jest liczona w bardzo
  // małej rozdzielczości i rozciągana przez przeglądarkę, co daje miękkie
  // krawędzie bez kosztownych filtrów.
  var section = document.querySelector("[data-shader]");
  var canvas = document.querySelector("[data-door-light]");
  if (!section || !canvas) {
    return;
  }

  var ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  var FRAME_MS = 33;
  var STILL_OPENING = 0.24;
  var TIME_OFFSET = 9;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var styles = getComputedStyle(document.documentElement);
  var shadeColor = readColor("--door-shade-rgb");
  var lightColor = readColor("--door-light-rgb");
  var shadeStrength = Number(styles.getPropertyValue("--door-shade-opacity"));
  var lightStrength = Number(styles.getPropertyValue("--door-light-opacity"));

  var image = null;
  var angles = null;
  var softness = null;
  var falloff = null;
  var figureX = null;
  var figureY = null;
  var grain = null;
  var people = window.DoorPeople ? window.DoorPeople.create() : null;
  var peopleVisible = false;
  var frameEdge = 0;
  var widestEdge = 0;
  var lastOpening = -1;
  var lastFrame = 0;
  var frame = null;
  var visible = false;

  function readColor(name) {
    return styles.getPropertyValue(name).split(",").map(Number);
  }

  function smooth(value) {
    var v = value < 0 ? 0 : value > 1 ? 1 : value;
    return v * v * (3 - 2 * v);
  }

  // Niewspółmierne częstotliwości i zmienne tempo sprawiają, że ruch drzwi
  // się nie powtarza. Pochodna czasu pozostaje dodatnia, więc drzwi nie drgają.
  function doorOpening(seconds) {
    var t = seconds + 6 * Math.sin(seconds * 0.071 + 0.6) + 2.5 * Math.sin(seconds * 0.173 + 2.1);
    var swing = 0.5 + 0.5 * Math.sin(t * 0.115 - 1.1);
    swing += 0.07 * Math.sin(t * 0.29 + 0.8) + 0.03 * Math.sin(t * 0.61 + 2.4);
    swing = (swing + 0.06) / 1.12;
    swing = swing < 0 ? 0 : swing > 1 ? 1 : swing;
    return swing * 0.45 + smooth(swing) * 0.55;
  }

  function build() {
    var width = Math.max(1, section.clientWidth);
    var height = Math.max(1, section.clientHeight);
    var gridWidth = width < 768 ? 120 : 220;
    var gridHeight = Math.max(2, Math.round((gridWidth * height) / width));
    var count = gridWidth * gridHeight;
    var apexX = width * 0.26;
    var apexY = -height * 0.42;
    var reach = Math.hypot(width - apexX, height - apexY);

    canvas.width = gridWidth;
    canvas.height = gridHeight;
    image = ctx.createImageData(gridWidth, gridHeight);
    angles = new Float32Array(count);
    softness = new Float32Array(count);
    falloff = new Float32Array(count);
    figureX = new Float32Array(count);
    figureY = new Float32Array(count);
    grain = new Float32Array(count);
    frameEdge = Math.atan2(width * 0.2 - apexX, height - apexY);
    widestEdge = Math.atan2(width * 1.12 - apexX, height - apexY);
    if (people) {
      people.setAspect(width / height);
    }

    for (var y = 0, i = 0; y < gridHeight; y += 1) {
      var py = ((y + 0.5) / gridHeight) * height - apexY;
      for (var x = 0; x < gridWidth; x += 1, i += 1) {
        var px = ((x + 0.5) / gridWidth) * width - apexX;
        var distance = Math.min(1, Math.hypot(px, py) / reach);
        angles[i] = Math.atan2(px, py);
        softness[i] = 0.08 + 0.14 * distance; // Półcień rośnie z odległością.
        falloff[i] = 1 - 0.38 * distance;
        figureX[i] = ((x + 0.5) / gridWidth) * (width / height);
        figureY[i] = (y + 0.5) / gridHeight;
        grain[i] = Math.random() - 0.5;
      }
    }
    lastOpening = -1;
  }

  function render(opening) {
    var data = image.data;
    var doorEdge = frameEdge + (widestEdge - frameEdge) * (0.05 + 0.95 * opening);
    var glowLevel = lightStrength * (0.55 + 0.45 * opening);
    var hasPeople = people !== null && people.isActive();

    for (var i = 0, p = 0; i < angles.length; i += 1, p += 4) {
      var soft = softness[i];
      var angle = angles[i];
      var lit = smooth((angle - frameEdge + soft) / (2 * soft)) *
        (1 - smooth((angle - doorEdge + soft) / (2 * soft))) * falloff[i];
      if (hasPeople && lit > 0.01) {
        lit *= 1 - people.sample(figureX[i], figureY[i]);
      }
      var shade = shadeStrength * (1 - lit);
      var glow = glowLevel * lit * lit;
      var alpha = shade + glow;
      var mix = alpha > 0 ? glow / alpha : 0;
      data[p] = shadeColor[0] + (lightColor[0] - shadeColor[0]) * mix;
      data[p + 1] = shadeColor[1] + (lightColor[1] - shadeColor[1]) * mix;
      data[p + 2] = shadeColor[2] + (lightColor[2] - shadeColor[2]) * mix;
      data[p + 3] = alpha * 255 + grain[i];
    }
    ctx.putImageData(image, 0, 0);
    lastOpening = opening;
  }

  function loop(time) {
    frame = null;
    if (time - lastFrame >= FRAME_MS) {
      var delta = Math.min(0.1, (time - lastFrame) / 1000);
      lastFrame = time;
      var opening = doorOpening(performance.now() / 1000 + TIME_OFFSET);
      var wereVisible = peopleVisible;
      if (people) {
        people.update(delta, opening);
        peopleVisible = people.isActive();
      }
      if (peopleVisible || wereVisible || Math.abs(opening - lastOpening) > 0.0006) {
        render(opening);
      }
    }
    schedule();
  }

  function schedule() {
    if (frame === null && visible && !document.hidden && !reducedMotion.matches) {
      frame = requestAnimationFrame(loop);
    }
  }

  function refresh() {
    build();
    render(reducedMotion.matches ? STILL_OPENING : doorOpening(performance.now() / 1000 + TIME_OFFSET));
  }

  if ("ResizeObserver" in window) {
    new ResizeObserver(refresh).observe(section);
  } else {
    window.addEventListener("resize", refresh);
  }

  document.addEventListener("visibilitychange", schedule);
  reducedMotion.addEventListener("change", function () {
    if (reducedMotion.matches) {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
      if (people) {
        people.clear();
        peopleVisible = false;
      }
      render(STILL_OPENING);
    }
    schedule();
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      schedule();
    }, { rootMargin: "100px" }).observe(section);
  } else {
    visible = true;
  }

  refresh();
  canvas.classList.add("is-ready");
  schedule();
})();
