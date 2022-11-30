// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../libs/suncalc/suncalc.js":[function(require,module,exports) {
var define;
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 (c) 2011-2015, Vladimir Agafonkin
 SunCalc is a JavaScript library for calculating sun/moon position and light phases.
 https://github.com/mourner/suncalc
*/
(function () {
  'use strict'; // shortcuts for easier to read formulas

  var PI = Math.PI,
      sin = Math.sin,
      cos = Math.cos,
      tan = Math.tan,
      asin = Math.asin,
      atan = Math.atan2,
      acos = Math.acos,
      rad = PI / 180; // sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas
  // date/time constants and conversions

  var dayMs = 1000 * 60 * 60 * 24,
      J1970 = 2440588,
      J2000 = 2451545;

  function toJulian(date) {
    return date.valueOf() / dayMs - 0.5 + J1970;
  }

  function fromJulian(j) {
    return new Date((j + 0.5 - J1970) * dayMs);
  }

  function toDays(date) {
    return toJulian(date) - J2000;
  } // general calculations for position


  var e = rad * 23.4397; // obliquity of the Earth

  function rightAscension(l, b) {
    return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l));
  }

  function declination(l, b) {
    return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l));
  }

  function azimuth(H, phi, dec) {
    return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi));
  }

  function altitude(H, phi, dec) {
    return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H));
  }

  function siderealTime(d, lw) {
    return rad * (280.16 + 360.9856235 * d) - lw;
  }

  function astroRefraction(h) {
    if (h < 0) // the following formula works for positive altitudes only.
      h = 0; // if h = -0.08901179 a div/0 would occur.
    // formula 16.4 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
    // 1.02 / tan(h + 10.26 / (h + 5.10)) h in degrees, result in arc minutes -> converted to rad:

    return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
  } // general sun calculations


  function solarMeanAnomaly(d) {
    return rad * (357.5291 + 0.98560028 * d);
  }

  function eclipticLongitude(M) {
    var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)),
        // equation of center
    P = rad * 102.9372; // perihelion of the Earth

    return M + C + P + PI;
  }

  function sunCoords(d) {
    var M = solarMeanAnomaly(d),
        L = eclipticLongitude(M);
    return {
      dec: declination(L, 0),
      ra: rightAscension(L, 0)
    };
  }

  var SunCalc = {}; // calculates sun position for a given date and latitude/longitude

  SunCalc.getPosition = function (date, lat, lng) {
    var lw = rad * -lng,
        phi = rad * lat,
        d = toDays(date),
        c = sunCoords(d),
        H = siderealTime(d, lw) - c.ra;
    return {
      azimuth: azimuth(H, phi, c.dec),
      altitude: altitude(H, phi, c.dec)
    };
  }; // sun times configuration (angle, morning name, evening name)


  var times = SunCalc.times = [[-0.833, 'sunrise', 'sunset'], [-0.3, 'sunriseEnd', 'sunsetStart'], [-6, 'dawn', 'dusk'], [-12, 'nauticalDawn', 'nauticalDusk'], [-18, 'nightEnd', 'night'], [6, 'goldenHourEnd', 'goldenHour']]; // adds a custom time to the times config

  SunCalc.addTime = function (angle, riseName, setName) {
    times.push([angle, riseName, setName]);
  }; // calculations for sun times


  var J0 = 0.0009;

  function julianCycle(d, lw) {
    return Math.round(d - J0 - lw / (2 * PI));
  }

  function approxTransit(Ht, lw, n) {
    return J0 + (Ht + lw) / (2 * PI) + n;
  }

  function solarTransitJ(ds, M, L) {
    return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L);
  }

  function hourAngle(h, phi, d) {
    return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d)));
  }

  function observerAngle(height) {
    return -2.076 * Math.sqrt(height) / 60;
  } // returns set time for the given sun altitude


  function getSetJ(h, lw, phi, dec, n, M, L) {
    var w = hourAngle(h, phi, dec),
        a = approxTransit(w, lw, n);
    return solarTransitJ(a, M, L);
  } // calculates sun times for a given date, latitude/longitude, and, optionally,
  // the observer height (in meters) relative to the horizon


  SunCalc.getTimes = function (date, lat, lng, height) {
    height = height || 0;
    var lw = rad * -lng,
        phi = rad * lat,
        dh = observerAngle(height),
        d = toDays(date),
        n = julianCycle(d, lw),
        ds = approxTransit(0, lw, n),
        M = solarMeanAnomaly(ds),
        L = eclipticLongitude(M),
        dec = declination(L, 0),
        Jnoon = solarTransitJ(ds, M, L),
        i,
        len,
        time,
        h0,
        Jset,
        Jrise;
    var result = {
      solarNoon: fromJulian(Jnoon),
      nadir: fromJulian(Jnoon - 0.5)
    };

    for (i = 0, len = times.length; i < len; i += 1) {
      time = times[i];
      h0 = (time[0] + dh) * rad;
      Jset = getSetJ(h0, lw, phi, dec, n, M, L);
      Jrise = Jnoon - (Jset - Jnoon);
      result[time[1]] = fromJulian(Jrise);
      result[time[2]] = fromJulian(Jset);
    }

    return result;
  }; // moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas


  function moonCoords(d) {
    // geocentric ecliptic coordinates of the moon
    var L = rad * (218.316 + 13.176396 * d),
        // ecliptic longitude
    M = rad * (134.963 + 13.064993 * d),
        // mean anomaly
    F = rad * (93.272 + 13.229350 * d),
        // mean distance
    l = L + rad * 6.289 * sin(M),
        // longitude
    b = rad * 5.128 * sin(F),
        // latitude
    dt = 385001 - 20905 * cos(M); // distance to the moon in km

    return {
      ra: rightAscension(l, b),
      dec: declination(l, b),
      dist: dt
    };
  }

  SunCalc.getMoonPosition = function (date, lat, lng) {
    var lw = rad * -lng,
        phi = rad * lat,
        d = toDays(date),
        c = moonCoords(d),
        H = siderealTime(d, lw) - c.ra,
        h = altitude(H, phi, c.dec),
        // formula 14.1 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
    pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));
    h = h + astroRefraction(h); // altitude correction for refraction

    return {
      azimuth: azimuth(H, phi, c.dec),
      altitude: h,
      distance: c.dist,
      parallacticAngle: pa
    };
  }; // calculations for illumination parameters of the moon,
  // based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas and
  // Chapter 48 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.


  SunCalc.getMoonIllumination = function (date) {
    var d = toDays(date || new Date()),
        s = sunCoords(d),
        m = moonCoords(d),
        sdist = 149598000,
        // distance from Earth to Sun in km
    phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)),
        inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)),
        angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) - cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));
    return {
      fraction: (1 + cos(inc)) / 2,
      phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI,
      angle: angle
    };
  };

  function hoursLater(date, h) {
    return new Date(date.valueOf() + h * dayMs / 24);
  } // calculations for moon rise/set times are based on http://www.stargazing.net/kepler/moonrise.html article


  SunCalc.getMoonTimes = function (date, lat, lng, inUTC) {
    var t = new Date(date);
    if (inUTC) t.setUTCHours(0, 0, 0, 0);else t.setHours(0, 0, 0, 0);
    var hc = 0.133 * rad,
        h0 = SunCalc.getMoonPosition(t, lat, lng).altitude - hc,
        h1,
        h2,
        rise,
        set,
        a,
        b,
        xe,
        ye,
        d,
        roots,
        x1,
        x2,
        dx; // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)

    for (var i = 1; i <= 24; i += 2) {
      h1 = SunCalc.getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;
      h2 = SunCalc.getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;
      a = (h0 + h2) / 2 - h1;
      b = (h2 - h0) / 2;
      xe = -b / (2 * a);
      ye = (a * xe + b) * xe + h1;
      d = b * b - 4 * a * h1;
      roots = 0;

      if (d >= 0) {
        dx = Math.sqrt(d) / (Math.abs(a) * 2);
        x1 = xe - dx;
        x2 = xe + dx;
        if (Math.abs(x1) <= 1) roots++;
        if (Math.abs(x2) <= 1) roots++;
        if (x1 < -1) x1 = x2;
      }

      if (roots === 1) {
        if (h0 < 0) rise = i + x1;else set = i + x1;
      } else if (roots === 2) {
        rise = i + (ye < 0 ? x2 : x1);
        set = i + (ye < 0 ? x1 : x2);
      }

      if (rise && set) break;
      h0 = h2;
    }

    var result = {};
    if (rise) result.rise = hoursLater(t, rise);
    if (set) result.set = hoursLater(t, set);
    if (!rise && !set) result[ye > 0 ? 'alwaysUp' : 'alwaysDown'] = true;
    return result;
  }; // export as Node module / AMD module / browser variable


  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined') module.exports = SunCalc;else if (typeof define === 'function' && define.amd) define(SunCalc);else window.SunCalc = SunCalc;
})();
},{}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60956" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../libs/suncalc/suncalc.js"], null)
//# sourceMappingURL=/suncalc.1af21be0.js.map