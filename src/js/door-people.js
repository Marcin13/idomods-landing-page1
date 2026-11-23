(function () {
  "use strict";

  // Cienie ludzi przechodzących przed drzwiami. Moduł nie rysuje niczego sam:
  // podaje warstwie drzwi, jaką część światła zasłania sylwetka w danym punkcie.
  var MAX_WALKERS = 3;
  var MIN_OPENING = 0.16;

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function smooth(value) {
    var v = value < 0 ? 0 : value > 1 ? 1 : value;
    return v * v * (3 - 2 * v);
  }

  function along(v, start, end, soft) {
    return smooth((v - start + soft) / (2 * soft)) * (1 - smooth((v - end + soft) / (2 * soft)));
  }

  function across(u, halfWidth, soft) {
    return 1 - smooth((Math.abs(u) - halfWidth + soft) / (2 * soft));
  }

  function nextGap() {
    var roll = Math.random();
    if (roll < 0.2) {
      return random(1.5, 3.5);
    }
    return roll < 0.8 ? random(4.5, 10) : random(12, 20);
  }

  function createWalker(direction, crossing, delay) {
    var pauses = Math.random() < 0.2;
    return {
      direction: direction,
      position: direction > 0 ? 0 : 1,
      speed: 1 / crossing,
      delay: delay,
      pace: 1,
      step: random(0, Math.PI * 2),
      cadence: random(4.6, 6.4) * Math.min(1.25, 11 / crossing + 0.25),
      size: random(0.88, 1.12),
      lean: random(0.02, 0.07) * direction,
      strength: random(0.72, 0.86),
      driftA: random(0, Math.PI * 2),
      driftB: random(0, Math.PI * 2),
      driftRateA: random(0.35, 0.7),
      driftRateB: random(0.9, 1.5),
      clock: 0,
      pauseAt: pauses ? random(0.3, 0.7) : -1,
      pauseLeft: pauses ? random(0.7, 2.2) : 0,
      x: 0,
      reach: 0
    };
  }

  function create() {
    var walkers = [];
    var timer = random(1.2, 3);
    var aspect = 2;
    var margin = 0.26;

    function spawn() {
      var direction = Math.random() < 0.5 ? 1 : -1;
      var crossing = random(7, 17);
      walkers.push(createWalker(direction, crossing, 0));
      if (walkers.length < MAX_WALKERS && Math.random() < 0.3) {
        if (Math.random() < 0.7) {
          walkers.push(createWalker(direction, crossing * random(0.92, 1.08), random(0.5, 1.4)));
        } else {
          walkers.push(createWalker(-direction, random(7, 17), random(0.4, 2.5)));
        }
      }
    }

    function advance(walker, dt) {
      var target = 1;
      var isPausing = walker.pauseAt >= 0 && walker.pauseLeft > 0 &&
        (walker.direction > 0 ? walker.position >= walker.pauseAt : walker.position <= walker.pauseAt);
      if (isPausing) {
        walker.pauseLeft -= dt;
        target = 0;
      }
      walker.pace += (target - walker.pace) * Math.min(1, dt * 2.4);
      walker.clock += dt;
      var drift = 1 + 0.14 * Math.sin(walker.clock * walker.driftRateA + walker.driftA) +
        0.06 * Math.sin(walker.clock * walker.driftRateB + walker.driftB);
      walker.position += walker.direction * walker.speed * walker.pace * drift * dt;
      walker.step += walker.cadence * walker.pace * dt;
    }

    function update(dt, opening) {
      // Gdy ktoś już idzie, kolejna osoba pojawia się znacznie rzadziej.
      timer -= walkers.length ? dt * 0.12 : dt;
      if (timer <= 0 && opening > MIN_OPENING && walkers.length < 2) {
        spawn();
        timer = nextGap();
      }
      for (var i = walkers.length - 1; i >= 0; i -= 1) {
        var walker = walkers[i];
        if (walker.delay > 0) {
          walker.delay -= dt;
          walker.reach = 0;
          continue;
        }
        advance(walker, dt);
        if (walker.position < 0 || walker.position > 1) {
          walkers.splice(i, 1);
          continue;
        }
        walker.x = -margin + walker.position * (aspect + 2 * margin);
        walker.reach = 0.24 * walker.size;
      }
    }

    // Współrzędne są w wysokościach sekcji, a stopy postaci stoją tuż pod jej dołem.
    function silhouette(walker, x, y) {
      var bob = 0.007 * Math.abs(Math.sin(walker.step)) * walker.pace;
      var v = 1.05 - (1.05 - (y - bob)) / walker.size;
      var u = (x - walker.x) / walker.size + (v - 0.6) * walker.lean;
      var swing = Math.sin(walker.step) * walker.pace;

      var headX = u / 0.056;
      var headY = (v - 0.175) / 0.074;
      var head = 1 - smooth((Math.sqrt(headX * headX + headY * headY) - 0.72) / 0.55);
      var neck = along(v, 0.2, 0.32, 0.03) * across(u, 0.034, 0.03);
      var torsoWidth = 0.125 - 0.037 * smooth((v - 0.31) / 0.3);
      var torso = along(v, 0.29, 0.66, 0.035) * across(u, torsoWidth, 0.045);
      var armOffset = 0.115 * swing * smooth((v - 0.32) / 0.3);
      var arms = along(v, 0.31, 0.63, 0.04) * Math.max(
        across(u + armOffset, 0.03, 0.035),
        across(u - armOffset, 0.03, 0.035)
      );
      var stride = 0.085 * swing * smooth((v - 0.62) / 0.4);
      var legs = along(v, 0.6, 1.1, 0.05) * Math.max(
        across(u - stride, 0.05, 0.04),
        across(u + stride, 0.05, 0.04)
      );
      return Math.max(head, neck, torso, arms, legs) * walker.strength;
    }

    // Zwraca, jaka część światła (0–1) jest zasłonięta w danym punkcie.
    function sample(x, y) {
      var clear = 1;
      for (var i = 0; i < walkers.length; i += 1) {
        var walker = walkers[i];
        if (walker.reach > 0 && Math.abs(x - walker.x) < walker.reach) {
          clear *= 1 - silhouette(walker, x, y);
        }
      }
      return 1 - clear;
    }

    return {
      walkers: walkers,
      update: update,
      sample: sample,
      isActive: function () {
        return walkers.length > 0;
      },
      clear: function () {
        walkers.length = 0;
        timer = random(1.2, 3);
      },
      setAspect: function (value) {
        aspect = value;
      }
    };
  }

  window.DoorPeople = { create: create };
})();
