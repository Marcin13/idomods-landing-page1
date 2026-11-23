(function () {
  "use strict";

  var section = document.querySelector("[data-shader]");
  var canvas = document.querySelector("[data-shader-canvas]");
  if (!section || !canvas) {
    return;
  }

  // Cykl 24 s. Czas wchodzi do shadera jako kąt, a wszystkie częstotliwości
  // czasu są całkowite, więc koniec pętli idealnie pokrywa się z początkiem.
  var CYCLE_SECONDS = 24;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  var VERTEX = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  var FRAGMENT = [
    "precision highp float;",
    "uniform vec2 uResolution;",
    "uniform float uPhase;",
    "const vec3 BASE = vec3(0.067, 0.067, 0.067);",
    "const vec3 GOLD = vec3(0.949, 0.749, 0.145);",
    "const vec3 AMBER = vec3(0.42, 0.33, 0.075);",
    "float wave(vec2 q, vec2 k, float n, float offset) {",
    "  return sin(dot(q, k) + n * uPhase + offset);",
    "}",
    "float field(vec2 q) {",
    "  vec2 w = q;",
    "  w += 0.34 * vec2(wave(q, vec2(1.3, 2.1), 1.0, 0.4), wave(q, vec2(-1.9, 1.2), 1.0, 2.2));",
    "  w += 0.20 * vec2(wave(w, vec2(2.7, -1.6), 2.0, 4.1), wave(w, vec2(1.8, 3.1), -1.0, 1.1));",
    "  w += 0.10 * vec2(wave(w, vec2(-4.2, 3.3), 3.0, 0.7), wave(w, vec2(3.6, 4.4), 2.0, 5.3));",
    "  float bands = sin(w.x * 2.5 - w.y * 3.1 + 0.8 * sin(uPhase));",
    "  bands += 0.55 * sin(w.x * -1.4 + w.y * 4.3 + 2.0 + uPhase);",
    "  return bands / 1.55;",
    "}",
    "float dither(vec2 c) {",
    "  return fract(52.9829189 * fract(dot(c, vec2(0.06711056, 0.00583715)))) - 0.5;",
    "}",
    "void main() {",
    "  vec2 uv = gl_FragCoord.xy / uResolution;",
    "  float aspect = uResolution.x / uResolution.y;",
    "  vec2 q = vec2((uv.x - 0.5) * min(aspect, 2.4), uv.y - 0.5);",
    "  float f = smoothstep(-0.2, 0.8, field(q * 1.65 + vec2(0.35, -0.2)));",
    "  float reach = smoothstep(0.98, 0.02, uv.y - (uv.x - 0.5) * 0.62);",
    "  float light = f * reach;",
    "  float d = length(vec2((uv.x - 0.5) * 1.5, (uv.y - 0.55) * 1.35));",
    "  light *= mix(0.3, 1.0, smoothstep(0.14, 0.52, d));",
    "  vec3 color = mix(BASE, AMBER, smoothstep(0.03, 0.42, light));",
    "  color = mix(color, GOLD, smoothstep(0.34, 0.92, light));",
    "  color += dither(gl_FragCoord.xy) / 255.0;",
    "  gl_FragColor = vec4(color, 1.0);",
    "}"
  ].join("\n");

  var gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: "low-power" });
  if (!gl) {
    return;
  }

  var uniforms = null;
  var frame = null;
  var visible = false;
  var startTime = null;
  var lost = false;

  function compile(type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
  }

  function setup() {
    var vertex = compile(gl.VERTEX_SHADER, VERTEX);
    var fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vertex || !fragment) {
      return false;
    }
    var program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return false;
    }
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var position = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    uniforms = {
      resolution: gl.getUniformLocation(program, "uResolution"),
      phase: gl.getUniformLocation(program, "uPhase")
    };
    return true;
  }

  function resize() {
    // Miękki gradient nie potrzebuje pełnej rozdzielczości.
    var scale = window.innerWidth < 768 ? 0.5 : Math.min(window.devicePixelRatio || 1, 1) * 0.75;
    var width = Math.max(1, Math.round(section.clientWidth * scale));
    var height = Math.max(1, Math.round(section.clientHeight * scale));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
    gl.uniform2f(uniforms.resolution, width, height);
  }

  function draw(seconds) {
    var phase = ((seconds % CYCLE_SECONDS) / CYCLE_SECONDS) * Math.PI * 2;
    gl.uniform1f(uniforms.phase, phase);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function loop(time) {
    frame = null;
    if (startTime === null) {
      startTime = time;
    }
    draw((time - startTime) / 1000);
    schedule();
  }

  function schedule() {
    if (frame === null && visible && !lost && !document.hidden && !reducedMotion.matches) {
      frame = requestAnimationFrame(loop);
    }
  }

  function drawStill() {
    if (!lost && uniforms) {
      resize();
      draw(CYCLE_SECONDS * 0.2);
    }
  }

  function start() {
    if (!setup()) {
      return;
    }
    resize();
    draw(0);
    canvas.classList.add("is-ready");
    if (reducedMotion.matches) {
      drawStill();
    }
    schedule();
  }

  canvas.addEventListener("webglcontextlost", function (event) {
    event.preventDefault();
    lost = true;
    canvas.classList.remove("is-ready");
    if (frame !== null) {
      cancelAnimationFrame(frame);
      frame = null;
    }
  });
  canvas.addEventListener("webglcontextrestored", function () {
    lost = false;
    start();
  });

  window.addEventListener("resize", function () {
    if (uniforms && !lost) {
      resize();
      if (reducedMotion.matches) {
        drawStill();
      }
    }
  });
  document.addEventListener("visibilitychange", schedule);
  reducedMotion.addEventListener("change", function () {
    if (reducedMotion.matches) {
      drawStill();
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

  start();
})();
