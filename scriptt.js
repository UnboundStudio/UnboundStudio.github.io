/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var Z_ = Object.create;
  var un = Object.defineProperty;
  var J_ = Object.getOwnPropertyDescriptor;
  var eb = Object.getOwnPropertyNames;
  var tb = Object.getPrototypeOf,
    rb = Object.prototype.hasOwnProperty;
  var me = (e, t) => () => (e && (t = e((e = 0))), t);
  var c = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    Ge = (e, t) => {
      for (var r in t) un(e, r, { get: t[r], enumerable: !0 });
    },
    Ls = (e, t, r, n) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let o of eb(t))
          !rb.call(e, o) &&
            o !== r &&
            un(e, o, {
              get: () => t[o],
              enumerable: !(n = J_(t, o)) || n.enumerable,
            });
      return e;
    };
  var de = (e, t, r) => (
      (r = e != null ? Z_(tb(e)) : {}),
      Ls(
        t || !e || !e.__esModule
          ? un(r, "default", { value: e, enumerable: !0 })
          : r,
        e
      )
    ),
    it = (e) => Ls(un({}, "__esModule", { value: !0 }), e);
  var Ns = c(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        t = e ? parseInt(e[1], 10) >= 16 : !1;
      if ("objectFit" in document.documentElement.style && !t) {
        window.objectFitPolyfill = function () {
          return !1;
        };
        return;
      }
      let n = function (s) {
          let u = window.getComputedStyle(s, null),
            d = u.getPropertyValue("position"),
            g = u.getPropertyValue("overflow"),
            v = u.getPropertyValue("display");
          (!d || d === "static") && (s.style.position = "relative"),
            g !== "hidden" && (s.style.overflow = "hidden"),
            (!v || v === "inline") && (s.style.display = "block"),
            s.clientHeight === 0 && (s.style.height = "100%"),
            s.className.indexOf("object-fit-polyfill") === -1 &&
              (s.className += " object-fit-polyfill");
        },
        o = function (s) {
          let u = window.getComputedStyle(s, null),
            d = {
              "max-width": "none",
              "max-height": "none",
              "min-width": "0px",
              "min-height": "0px",
              top: "auto",
              right: "auto",
              bottom: "auto",
              left: "auto",
              "margin-top": "0px",
              "margin-right": "0px",
              "margin-bottom": "0px",
              "margin-left": "0px",
            };
          for (let g in d)
            u.getPropertyValue(g) !== d[g] && (s.style[g] = d[g]);
        },
        i = function (s) {
          let u = s.parentNode;
          n(u),
            o(s),
            (s.style.position = "absolute"),
            (s.style.height = "100%"),
            (s.style.width = "auto"),
            s.clientWidth > u.clientWidth
              ? ((s.style.top = "0"),
                (s.style.marginTop = "0"),
                (s.style.left = "50%"),
                (s.style.marginLeft = s.clientWidth / -2 + "px"))
              : ((s.style.width = "100%"),
                (s.style.height = "auto"),
                (s.style.left = "0"),
                (s.style.marginLeft = "0"),
                (s.style.top = "50%"),
                (s.style.marginTop = s.clientHeight / -2 + "px"));
        },
        a = function (s) {
          if (typeof s > "u" || s instanceof Event)
            s = document.querySelectorAll("[data-object-fit]");
          else if (s && s.nodeName) s = [s];
          else if (typeof s == "object" && s.length && s[0].nodeName) s = s;
          else return !1;
          for (let u = 0; u < s.length; u++) {
            if (!s[u].nodeName) continue;
            let d = s[u].nodeName.toLowerCase();
            if (d === "img") {
              if (t) continue;
              s[u].complete
                ? i(s[u])
                : s[u].addEventListener("load", function () {
                    i(this);
                  });
            } else
              d === "video"
                ? s[u].readyState > 0
                  ? i(s[u])
                  : s[u].addEventListener("loadedmetadata", function () {
                      i(this);
                    })
                : i(s[u]);
          }
          return !0;
        };
      document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", a)
        : a(),
        window.addEventListener("resize", a),
        (window.objectFitPolyfill = a);
    })();
  });
  var Ps = c(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      function e(n) {
        Webflow.env("design") ||
          ($("video").each(function () {
            n && $(this).prop("autoplay") ? this.play() : this.pause();
          }),
          $(".w-background-video--control").each(function () {
            n ? r($(this)) : t($(this));
          }));
      }
      function t(n) {
        n.find("> span").each(function (o) {
          $(this).prop("hidden", () => o === 0);
        });
      }
      function r(n) {
        n.find("> span").each(function (o) {
          $(this).prop("hidden", () => o === 1);
        });
      }
      $(document).ready(() => {
        let n = window.matchMedia("(prefers-reduced-motion: reduce)");
        n.addEventListener("change", (o) => {
          e(!o.matches);
        }),
          n.matches && e(!1),
          $("video:not([autoplay])").each(function () {
            $(this)
              .parent()
              .find(".w-background-video--control")
              .each(function () {
                t($(this));
              });
          }),
          $(document).on("click", ".w-background-video--control", function (o) {
            if (Webflow.env("design")) return;
            let i = $(o.currentTarget),
              a = $(`video#${i.attr("aria-controls")}`).get(0);
            if (a)
              if (a.paused) {
                let s = a.play();
                r(i),
                  s &&
                    typeof s.catch == "function" &&
                    s.catch(() => {
                      t(i);
                    });
              } else a.pause(), t(i);
          });
      });
    })();
  });
  var Ni = c(() => {
    "use strict";
    window.tram = (function (e) {
      function t(f, b) {
        var O = new E.Bare();
        return O.init(f, b);
      }
      function r(f) {
        return f.replace(/[A-Z]/g, function (b) {
          return "-" + b.toLowerCase();
        });
      }
      function n(f) {
        var b = parseInt(f.slice(1), 16),
          O = (b >> 16) & 255,
          R = (b >> 8) & 255,
          w = 255 & b;
        return [O, R, w];
      }
      function o(f, b, O) {
        return (
          "#" + ((1 << 24) | (f << 16) | (b << 8) | O).toString(16).slice(1)
        );
      }
      function i() {}
      function a(f, b) {
        d("Type warning: Expected: [" + f + "] Got: [" + typeof b + "] " + b);
      }
      function s(f, b, O) {
        d("Units do not match [" + f + "]: " + b + ", " + O);
      }
      function u(f, b, O) {
        if ((b !== void 0 && (O = b), f === void 0)) return O;
        var R = O;
        return (
          De.test(f) || !Be.test(f)
            ? (R = parseInt(f, 10))
            : Be.test(f) && (R = 1e3 * parseFloat(f)),
          0 > R && (R = 0),
          R === R ? R : O
        );
      }
      function d(f) {
        ae.debug && window && window.console.warn(f);
      }
      function g(f) {
        for (var b = -1, O = f ? f.length : 0, R = []; ++b < O; ) {
          var w = f[b];
          w && R.push(w);
        }
        return R;
      }
      var v = (function (f, b, O) {
          function R(se) {
            return typeof se == "object";
          }
          function w(se) {
            return typeof se == "function";
          }
          function N() {}
          function J(se, he) {
            function z() {
              var Le = new ue();
              return w(Le.init) && Le.init.apply(Le, arguments), Le;
            }
            function ue() {}
            he === O && ((he = se), (se = Object)), (z.Bare = ue);
            var ce,
              Te = (N[f] = se[f]),
              nt = (ue[f] = z[f] = new N());
            return (
              (nt.constructor = z),
              (z.mixin = function (Le) {
                return (ue[f] = z[f] = J(z, Le)[f]), z;
              }),
              (z.open = function (Le) {
                if (
                  ((ce = {}),
                  w(Le) ? (ce = Le.call(z, nt, Te, z, se)) : R(Le) && (ce = Le),
                  R(ce))
                )
                  for (var br in ce) b.call(ce, br) && (nt[br] = ce[br]);
                return w(nt.init) || (nt.init = se), z;
              }),
              z.open(he)
            );
          }
          return J;
        })("prototype", {}.hasOwnProperty),
        y = {
          ease: [
            "ease",
            function (f, b, O, R) {
              var w = (f /= R) * f,
                N = w * f;
              return (
                b +
                O * (-2.75 * N * w + 11 * w * w + -15.5 * N + 8 * w + 0.25 * f)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (f, b, O, R) {
              var w = (f /= R) * f,
                N = w * f;
              return b + O * (-1 * N * w + 3 * w * w + -3 * N + 2 * w);
            },
          ],
          "ease-out": [
            "ease-out",
            function (f, b, O, R) {
              var w = (f /= R) * f,
                N = w * f;
              return (
                b +
                O * (0.3 * N * w + -1.6 * w * w + 2.2 * N + -1.8 * w + 1.9 * f)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (f, b, O, R) {
              var w = (f /= R) * f,
                N = w * f;
              return b + O * (2 * N * w + -5 * w * w + 2 * N + 2 * w);
            },
          ],
          linear: [
            "linear",
            function (f, b, O, R) {
              return (O * f) / R + b;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (f, b, O, R) {
              return O * (f /= R) * f + b;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (f, b, O, R) {
              return -O * (f /= R) * (f - 2) + b;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (f, b, O, R) {
              return (f /= R / 2) < 1
                ? (O / 2) * f * f + b
                : (-O / 2) * (--f * (f - 2) - 1) + b;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (f, b, O, R) {
              return O * (f /= R) * f * f + b;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (f, b, O, R) {
              return O * ((f = f / R - 1) * f * f + 1) + b;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (f, b, O, R) {
              return (f /= R / 2) < 1
                ? (O / 2) * f * f * f + b
                : (O / 2) * ((f -= 2) * f * f + 2) + b;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (f, b, O, R) {
              return O * (f /= R) * f * f * f + b;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (f, b, O, R) {
              return -O * ((f = f / R - 1) * f * f * f - 1) + b;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (f, b, O, R) {
              return (f /= R / 2) < 1
                ? (O / 2) * f * f * f * f + b
                : (-O / 2) * ((f -= 2) * f * f * f - 2) + b;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (f, b, O, R) {
              return O * (f /= R) * f * f * f * f + b;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (f, b, O, R) {
              return O * ((f = f / R - 1) * f * f * f * f + 1) + b;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (f, b, O, R) {
              return (f /= R / 2) < 1
                ? (O / 2) * f * f * f * f * f + b
                : (O / 2) * ((f -= 2) * f * f * f * f + 2) + b;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (f, b, O, R) {
              return -O * Math.cos((f / R) * (Math.PI / 2)) + O + b;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (f, b, O, R) {
              return O * Math.sin((f / R) * (Math.PI / 2)) + b;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (f, b, O, R) {
              return (-O / 2) * (Math.cos((Math.PI * f) / R) - 1) + b;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (f, b, O, R) {
              return f === 0 ? b : O * Math.pow(2, 10 * (f / R - 1)) + b;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (f, b, O, R) {
              return f === R
                ? b + O
                : O * (-Math.pow(2, (-10 * f) / R) + 1) + b;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (f, b, O, R) {
              return f === 0
                ? b
                : f === R
                ? b + O
                : (f /= R / 2) < 1
                ? (O / 2) * Math.pow(2, 10 * (f - 1)) + b
                : (O / 2) * (-Math.pow(2, -10 * --f) + 2) + b;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (f, b, O, R) {
              return -O * (Math.sqrt(1 - (f /= R) * f) - 1) + b;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (f, b, O, R) {
              return O * Math.sqrt(1 - (f = f / R - 1) * f) + b;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (f, b, O, R) {
              return (f /= R / 2) < 1
                ? (-O / 2) * (Math.sqrt(1 - f * f) - 1) + b
                : (O / 2) * (Math.sqrt(1 - (f -= 2) * f) + 1) + b;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (f, b, O, R, w) {
              return (
                w === void 0 && (w = 1.70158),
                O * (f /= R) * f * ((w + 1) * f - w) + b
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (f, b, O, R, w) {
              return (
                w === void 0 && (w = 1.70158),
                O * ((f = f / R - 1) * f * ((w + 1) * f + w) + 1) + b
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (f, b, O, R, w) {
              return (
                w === void 0 && (w = 1.70158),
                (f /= R / 2) < 1
                  ? (O / 2) * f * f * (((w *= 1.525) + 1) * f - w) + b
                  : (O / 2) *
                      ((f -= 2) * f * (((w *= 1.525) + 1) * f + w) + 2) +
                    b
              );
            },
          ],
        },
        m = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        T = document,
        I = window,
        D = "bkwld-tram",
        S = /[\-\.0-9]/g,
        L = /[A-Z]/,
        C = "number",
        P = /^(rgb|#)/,
        q = /(em|cm|mm|in|pt|pc|px)$/,
        M = /(em|cm|mm|in|pt|pc|px|%)$/,
        X = /(deg|rad|turn)$/,
        K = "unitless",
        Q = /(all|none) 0s ease 0s/,
        ee = /^(width|height)$/,
        te = " ",
        U = T.createElement("a"),
        x = ["Webkit", "Moz", "O", "ms"],
        F = ["-webkit-", "-moz-", "-o-", "-ms-"],
        B = function (f) {
          if (f in U.style) return { dom: f, css: f };
          var b,
            O,
            R = "",
            w = f.split("-");
          for (b = 0; b < w.length; b++)
            R += w[b].charAt(0).toUpperCase() + w[b].slice(1);
          for (b = 0; b < x.length; b++)
            if (((O = x[b] + R), O in U.style))
              return { dom: O, css: F[b] + f };
        },
        H = (t.support = {
          bind: Function.prototype.bind,
          transform: B("transform"),
          transition: B("transition"),
          backface: B("backface-visibility"),
          timing: B("transition-timing-function"),
        });
      if (H.transition) {
        var re = H.timing.dom;
        if (((U.style[re] = y["ease-in-back"][0]), !U.style[re]))
          for (var ne in m) y[ne][0] = m[ne];
      }
      var k = (t.frame = (function () {
          var f =
            I.requestAnimationFrame ||
            I.webkitRequestAnimationFrame ||
            I.mozRequestAnimationFrame ||
            I.oRequestAnimationFrame ||
            I.msRequestAnimationFrame;
          return f && H.bind
            ? f.bind(I)
            : function (b) {
                I.setTimeout(b, 16);
              };
        })()),
        Y = (t.now = (function () {
          var f = I.performance,
            b = f && (f.now || f.webkitNow || f.msNow || f.mozNow);
          return b && H.bind
            ? b.bind(f)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        p = v(function (f) {
          function b(ie, le) {
            var _e = g(("" + ie).split(te)),
              ve = _e[0];
            le = le || {};
            var Ne = j[ve];
            if (!Ne) return d("Unsupported property: " + ve);
            if (!le.weak || !this.props[ve]) {
              var ze = Ne[0],
                Fe = this.props[ve];
              return (
                Fe || (Fe = this.props[ve] = new ze.Bare()),
                Fe.init(this.$el, _e, Ne, le),
                Fe
              );
            }
          }
          function O(ie, le, _e) {
            if (ie) {
              var ve = typeof ie;
              if (
                (le ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                ve == "number" && le)
              )
                return (
                  (this.timer = new oe({
                    duration: ie,
                    context: this,
                    complete: N,
                  })),
                  void (this.active = !0)
                );
              if (ve == "string" && le) {
                switch (ie) {
                  case "hide":
                    z.call(this);
                    break;
                  case "stop":
                    J.call(this);
                    break;
                  case "redraw":
                    ue.call(this);
                    break;
                  default:
                    b.call(this, ie, _e && _e[1]);
                }
                return N.call(this);
              }
              if (ve == "function") return void ie.call(this, this);
              if (ve == "object") {
                var Ne = 0;
                nt.call(
                  this,
                  ie,
                  function (Ie, Q_) {
                    Ie.span > Ne && (Ne = Ie.span), Ie.stop(), Ie.animate(Q_);
                  },
                  function (Ie) {
                    "wait" in Ie && (Ne = u(Ie.wait, 0));
                  }
                ),
                  Te.call(this),
                  Ne > 0 &&
                    ((this.timer = new oe({ duration: Ne, context: this })),
                    (this.active = !0),
                    le && (this.timer.complete = N));
                var ze = this,
                  Fe = !1,
                  sn = {};
                k(function () {
                  nt.call(ze, ie, function (Ie) {
                    Ie.active && ((Fe = !0), (sn[Ie.name] = Ie.nextStyle));
                  }),
                    Fe && ze.$el.css(sn);
                });
              }
            }
          }
          function R(ie) {
            (ie = u(ie, 0)),
              this.active
                ? this.queue.push({ options: ie })
                : ((this.timer = new oe({
                    duration: ie,
                    context: this,
                    complete: N,
                  })),
                  (this.active = !0));
          }
          function w(ie) {
            return this.active
              ? (this.queue.push({ options: ie, args: arguments }),
                void (this.timer.complete = N))
              : d(
                  "No active transition timer. Use start() or wait() before then()."
                );
          }
          function N() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var ie = this.queue.shift();
              O.call(this, ie.options, !0, ie.args);
            }
          }
          function J(ie) {
            this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1);
            var le;
            typeof ie == "string"
              ? ((le = {}), (le[ie] = 1))
              : (le = typeof ie == "object" && ie != null ? ie : this.props),
              nt.call(this, le, Le),
              Te.call(this);
          }
          function se(ie) {
            J.call(this, ie), nt.call(this, ie, br, Y_);
          }
          function he(ie) {
            typeof ie != "string" && (ie = "block"),
              (this.el.style.display = ie);
          }
          function z() {
            J.call(this), (this.el.style.display = "none");
          }
          function ue() {
            this.el.offsetHeight;
          }
          function ce() {
            J.call(this), e.removeData(this.el, D), (this.$el = this.el = null);
          }
          function Te() {
            var ie,
              le,
              _e = [];
            this.upstream && _e.push(this.upstream);
            for (ie in this.props)
              (le = this.props[ie]), le.active && _e.push(le.string);
            (_e = _e.join(",")),
              this.style !== _e &&
                ((this.style = _e), (this.el.style[H.transition.dom] = _e));
          }
          function nt(ie, le, _e) {
            var ve,
              Ne,
              ze,
              Fe,
              sn = le !== Le,
              Ie = {};
            for (ve in ie)
              (ze = ie[ve]),
                ve in pe
                  ? (Ie.transform || (Ie.transform = {}),
                    (Ie.transform[ve] = ze))
                  : (L.test(ve) && (ve = r(ve)),
                    ve in j ? (Ie[ve] = ze) : (Fe || (Fe = {}), (Fe[ve] = ze)));
            for (ve in Ie) {
              if (((ze = Ie[ve]), (Ne = this.props[ve]), !Ne)) {
                if (!sn) continue;
                Ne = b.call(this, ve);
              }
              le.call(this, Ne, ze);
            }
            _e && Fe && _e.call(this, Fe);
          }
          function Le(ie) {
            ie.stop();
          }
          function br(ie, le) {
            ie.set(le);
          }
          function Y_(ie) {
            this.$el.css(ie);
          }
          function je(ie, le) {
            f[ie] = function () {
              return this.children
                ? $_.call(this, le, arguments)
                : (this.el && le.apply(this, arguments), this);
            };
          }
          function $_(ie, le) {
            var _e,
              ve = this.children.length;
            for (_e = 0; ve > _e; _e++) ie.apply(this.children[_e], le);
            return this;
          }
          (f.init = function (ie) {
            if (
              ((this.$el = e(ie)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              ae.keepInherited && !ae.fallback)
            ) {
              var le = W(this.el, "transition");
              le && !Q.test(le) && (this.upstream = le);
            }
            H.backface &&
              ae.hideBackface &&
              h(this.el, H.backface.css, "hidden");
          }),
            je("add", b),
            je("start", O),
            je("wait", R),
            je("then", w),
            je("next", N),
            je("stop", J),
            je("set", se),
            je("show", he),
            je("hide", z),
            je("redraw", ue),
            je("destroy", ce);
        }),
        E = v(p, function (f) {
          function b(O, R) {
            var w = e.data(O, D) || e.data(O, D, new p.Bare());
            return w.el || w.init(O), R ? w.start(R) : w;
          }
          f.init = function (O, R) {
            var w = e(O);
            if (!w.length) return this;
            if (w.length === 1) return b(w[0], R);
            var N = [];
            return (
              w.each(function (J, se) {
                N.push(b(se, R));
              }),
              (this.children = N),
              this
            );
          };
        }),
        _ = v(function (f) {
          function b() {
            var N = this.get();
            this.update("auto");
            var J = this.get();
            return this.update(N), J;
          }
          function O(N, J, se) {
            return J !== void 0 && (se = J), N in y ? N : se;
          }
          function R(N) {
            var J = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(N);
            return (J ? o(J[1], J[2], J[3]) : N).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3"
            );
          }
          var w = { duration: 500, ease: "ease", delay: 0 };
          (f.init = function (N, J, se, he) {
            (this.$el = N), (this.el = N[0]);
            var z = J[0];
            se[2] && (z = se[2]),
              Z[z] && (z = Z[z]),
              (this.name = z),
              (this.type = se[1]),
              (this.duration = u(J[1], this.duration, w.duration)),
              (this.ease = O(J[2], this.ease, w.ease)),
              (this.delay = u(J[3], this.delay, w.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = ee.test(this.name)),
              (this.unit = he.unit || this.unit || ae.defaultUnit),
              (this.angle = he.angle || this.angle || ae.defaultAngle),
              ae.fallback || he.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    te +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? te + y[this.ease][0] : "") +
                    (this.delay ? te + this.delay + "ms" : "")));
          }),
            (f.set = function (N) {
              (N = this.convert(N, this.type)), this.update(N), this.redraw();
            }),
            (f.transition = function (N) {
              (this.active = !0),
                (N = this.convert(N, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  N == "auto" && (N = b.call(this))),
                (this.nextStyle = N);
            }),
            (f.fallback = function (N) {
              var J =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              (N = this.convert(N, this.type)),
                this.auto &&
                  (J == "auto" && (J = this.convert(this.get(), this.type)),
                  N == "auto" && (N = b.call(this))),
                (this.tween = new A({
                  from: J,
                  to: N,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                }));
            }),
            (f.get = function () {
              return W(this.el, this.name);
            }),
            (f.update = function (N) {
              h(this.el, this.name, N);
            }),
            (f.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                h(this.el, this.name, this.get()));
              var N = this.tween;
              N && N.context && N.destroy();
            }),
            (f.convert = function (N, J) {
              if (N == "auto" && this.auto) return N;
              var se,
                he = typeof N == "number",
                z = typeof N == "string";
              switch (J) {
                case C:
                  if (he) return N;
                  if (z && N.replace(S, "") === "") return +N;
                  se = "number(unitless)";
                  break;
                case P:
                  if (z) {
                    if (N === "" && this.original) return this.original;
                    if (J.test(N))
                      return N.charAt(0) == "#" && N.length == 7 ? N : R(N);
                  }
                  se = "hex or rgb string";
                  break;
                case q:
                  if (he) return N + this.unit;
                  if (z && J.test(N)) return N;
                  se = "number(px) or string(unit)";
                  break;
                case M:
                  if (he) return N + this.unit;
                  if (z && J.test(N)) return N;
                  se = "number(px) or string(unit or %)";
                  break;
                case X:
                  if (he) return N + this.angle;
                  if (z && J.test(N)) return N;
                  se = "number(deg) or string(angle)";
                  break;
                case K:
                  if (he || (z && M.test(N))) return N;
                  se = "number(unitless) or string(unit or %)";
              }
              return a(se, N), N;
            }),
            (f.redraw = function () {
              this.el.offsetHeight;
            });
        }),
        l = v(_, function (f, b) {
          f.init = function () {
            b.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), P));
          };
        }),
        G = v(_, function (f, b) {
          (f.init = function () {
            b.init.apply(this, arguments), (this.animate = this.fallback);
          }),
            (f.get = function () {
              return this.$el[this.name]();
            }),
            (f.update = function (O) {
              this.$el[this.name](O);
            });
        }),
        V = v(_, function (f, b) {
          function O(R, w) {
            var N, J, se, he, z;
            for (N in R)
              (he = pe[N]),
                (se = he[0]),
                (J = he[1] || N),
                (z = this.convert(R[N], se)),
                w.call(this, J, z, se);
          }
          (f.init = function () {
            b.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                pe.perspective &&
                  ae.perspective &&
                  ((this.current.perspective = ae.perspective),
                  h(this.el, this.name, this.style(this.current)),
                  this.redraw()));
          }),
            (f.set = function (R) {
              O.call(this, R, function (w, N) {
                this.current[w] = N;
              }),
                h(this.el, this.name, this.style(this.current)),
                this.redraw();
            }),
            (f.transition = function (R) {
              var w = this.values(R);
              this.tween = new fe({
                current: this.current,
                values: w,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var N,
                J = {};
              for (N in this.current) J[N] = N in w ? w[N] : this.current[N];
              (this.active = !0), (this.nextStyle = this.style(J));
            }),
            (f.fallback = function (R) {
              var w = this.values(R);
              this.tween = new fe({
                current: this.current,
                values: w,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (f.update = function () {
              h(this.el, this.name, this.style(this.current));
            }),
            (f.style = function (R) {
              var w,
                N = "";
              for (w in R) N += w + "(" + R[w] + ") ";
              return N;
            }),
            (f.values = function (R) {
              var w,
                N = {};
              return (
                O.call(this, R, function (J, se, he) {
                  (N[J] = se),
                    this.current[J] === void 0 &&
                      ((w = 0),
                      ~J.indexOf("scale") && (w = 1),
                      (this.current[J] = this.convert(w, he)));
                }),
                N
              );
            });
        }),
        A = v(function (f) {
          function b(z) {
            se.push(z) === 1 && k(O);
          }
          function O() {
            var z,
              ue,
              ce,
              Te = se.length;
            if (Te)
              for (k(O), ue = Y(), z = Te; z--; )
                (ce = se[z]), ce && ce.render(ue);
          }
          function R(z) {
            var ue,
              ce = e.inArray(z, se);
            ce >= 0 &&
              ((ue = se.slice(ce + 1)),
              (se.length = ce),
              ue.length && (se = se.concat(ue)));
          }
          function w(z) {
            return Math.round(z * he) / he;
          }
          function N(z, ue, ce) {
            return o(
              z[0] + ce * (ue[0] - z[0]),
              z[1] + ce * (ue[1] - z[1]),
              z[2] + ce * (ue[2] - z[2])
            );
          }
          var J = { ease: y.ease[1], from: 0, to: 1 };
          (f.init = function (z) {
            (this.duration = z.duration || 0), (this.delay = z.delay || 0);
            var ue = z.ease || J.ease;
            y[ue] && (ue = y[ue][1]),
              typeof ue != "function" && (ue = J.ease),
              (this.ease = ue),
              (this.update = z.update || i),
              (this.complete = z.complete || i),
              (this.context = z.context || this),
              (this.name = z.name);
            var ce = z.from,
              Te = z.to;
            ce === void 0 && (ce = J.from),
              Te === void 0 && (Te = J.to),
              (this.unit = z.unit || ""),
              typeof ce == "number" && typeof Te == "number"
                ? ((this.begin = ce), (this.change = Te - ce))
                : this.format(Te, ce),
              (this.value = this.begin + this.unit),
              (this.start = Y()),
              z.autoplay !== !1 && this.play();
          }),
            (f.play = function () {
              this.active ||
                (this.start || (this.start = Y()), (this.active = !0), b(this));
            }),
            (f.stop = function () {
              this.active && ((this.active = !1), R(this));
            }),
            (f.render = function (z) {
              var ue,
                ce = z - this.start;
              if (this.delay) {
                if (ce <= this.delay) return;
                ce -= this.delay;
              }
              if (ce < this.duration) {
                var Te = this.ease(ce, 0, 1, this.duration);
                return (
                  (ue = this.startRGB
                    ? N(this.startRGB, this.endRGB, Te)
                    : w(this.begin + Te * this.change)),
                  (this.value = ue + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              (ue = this.endHex || this.begin + this.change),
                (this.value = ue + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy();
            }),
            (f.format = function (z, ue) {
              if (((ue += ""), (z += ""), z.charAt(0) == "#"))
                return (
                  (this.startRGB = n(ue)),
                  (this.endRGB = n(z)),
                  (this.endHex = z),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var ce = ue.replace(S, ""),
                  Te = z.replace(S, "");
                ce !== Te && s("tween", ue, z), (this.unit = ce);
              }
              (ue = parseFloat(ue)),
                (z = parseFloat(z)),
                (this.begin = this.value = ue),
                (this.change = z - ue);
            }),
            (f.destroy = function () {
              this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = i);
            });
          var se = [],
            he = 1e3;
        }),
        oe = v(A, function (f) {
          (f.init = function (b) {
            (this.duration = b.duration || 0),
              (this.complete = b.complete || i),
              (this.context = b.context),
              this.play();
          }),
            (f.render = function (b) {
              var O = b - this.start;
              O < this.duration ||
                (this.complete.call(this.context), this.destroy());
            });
        }),
        fe = v(A, function (f, b) {
          (f.init = function (O) {
            (this.context = O.context),
              (this.update = O.update),
              (this.tweens = []),
              (this.current = O.current);
            var R, w;
            for (R in O.values)
              (w = O.values[R]),
                this.current[R] !== w &&
                  this.tweens.push(
                    new A({
                      name: R,
                      from: this.current[R],
                      to: w,
                      duration: O.duration,
                      delay: O.delay,
                      ease: O.ease,
                      autoplay: !1,
                    })
                  );
            this.play();
          }),
            (f.render = function (O) {
              var R,
                w,
                N = this.tweens.length,
                J = !1;
              for (R = N; R--; )
                (w = this.tweens[R]),
                  w.context &&
                    (w.render(O), (this.current[w.name] = w.value), (J = !0));
              return J
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (f.destroy = function () {
              if ((b.destroy.call(this), this.tweens)) {
                var O,
                  R = this.tweens.length;
                for (O = R; O--; ) this.tweens[O].destroy();
                (this.tweens = null), (this.current = null);
              }
            });
        }),
        ae = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !H.transition,
          agentTests: [],
        });
      (t.fallback = function (f) {
        if (!H.transition) return (ae.fallback = !0);
        ae.agentTests.push("(" + f + ")");
        var b = new RegExp(ae.agentTests.join("|"), "i");
        ae.fallback = b.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (f) {
          return new A(f);
        }),
        (t.delay = function (f, b, O) {
          return new oe({ complete: b, duration: f, context: O });
        }),
        (e.fn.tram = function (f) {
          return t.call(null, this, f);
        });
      var h = e.style,
        W = e.css,
        Z = { transform: H.transform && H.transform.css },
        j = {
          color: [l, P],
          background: [l, P, "background-color"],
          "outline-color": [l, P],
          "border-color": [l, P],
          "border-top-color": [l, P],
          "border-right-color": [l, P],
          "border-bottom-color": [l, P],
          "border-left-color": [l, P],
          "border-width": [_, q],
          "border-top-width": [_, q],
          "border-right-width": [_, q],
          "border-bottom-width": [_, q],
          "border-left-width": [_, q],
          "border-spacing": [_, q],
          "letter-spacing": [_, q],
          margin: [_, q],
          "margin-top": [_, q],
          "margin-right": [_, q],
          "margin-bottom": [_, q],
          "margin-left": [_, q],
          padding: [_, q],
          "padding-top": [_, q],
          "padding-right": [_, q],
          "padding-bottom": [_, q],
          "padding-left": [_, q],
          "outline-width": [_, q],
          opacity: [_, C],
          top: [_, M],
          right: [_, M],
          bottom: [_, M],
          left: [_, M],
          "font-size": [_, M],
          "text-indent": [_, M],
          "word-spacing": [_, M],
          width: [_, M],
          "min-width": [_, M],
          "max-width": [_, M],
          height: [_, M],
          "min-height": [_, M],
          "max-height": [_, M],
          "line-height": [_, K],
          "scroll-top": [G, C, "scrollTop"],
          "scroll-left": [G, C, "scrollLeft"],
        },
        pe = {};
      H.transform &&
        ((j.transform = [V]),
        (pe = {
          x: [M, "translateX"],
          y: [M, "translateY"],
          rotate: [X],
          rotateX: [X],
          rotateY: [X],
          scale: [C],
          scaleX: [C],
          scaleY: [C],
          skew: [X],
          skewX: [X],
          skewY: [X],
        })),
        H.transform &&
          H.backface &&
          ((pe.z = [M, "translateZ"]),
          (pe.rotateZ = [X]),
          (pe.scaleZ = [C]),
          (pe.perspective = [q]));
      var De = /ms/,
        Be = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var qs = c((KV, Ms) => {
    "use strict";
    var nb = window.$,
      ib = Ni() && nb.tram;
    Ms.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        r = Array.prototype,
        n = Object.prototype,
        o = Function.prototype,
        i = r.push,
        a = r.slice,
        s = r.concat,
        u = n.toString,
        d = n.hasOwnProperty,
        g = r.forEach,
        v = r.map,
        y = r.reduce,
        m = r.reduceRight,
        T = r.filter,
        I = r.every,
        D = r.some,
        S = r.indexOf,
        L = r.lastIndexOf,
        C = Array.isArray,
        P = Object.keys,
        q = o.bind,
        M =
          (e.each =
          e.forEach =
            function (x, F, B) {
              if (x == null) return x;
              if (g && x.forEach === g) x.forEach(F, B);
              else if (x.length === +x.length) {
                for (var H = 0, re = x.length; H < re; H++)
                  if (F.call(B, x[H], H, x) === t) return;
              } else
                for (var ne = e.keys(x), H = 0, re = ne.length; H < re; H++)
                  if (F.call(B, x[ne[H]], ne[H], x) === t) return;
              return x;
            });
      (e.map = e.collect =
        function (x, F, B) {
          var H = [];
          return x == null
            ? H
            : v && x.map === v
            ? x.map(F, B)
            : (M(x, function (re, ne, k) {
                H.push(F.call(B, re, ne, k));
              }),
              H);
        }),
        (e.find = e.detect =
          function (x, F, B) {
            var H;
            return (
              X(x, function (re, ne, k) {
                if (F.call(B, re, ne, k)) return (H = re), !0;
              }),
              H
            );
          }),
        (e.filter = e.select =
          function (x, F, B) {
            var H = [];
            return x == null
              ? H
              : T && x.filter === T
              ? x.filter(F, B)
              : (M(x, function (re, ne, k) {
                  F.call(B, re, ne, k) && H.push(re);
                }),
                H);
          });
      var X =
        (e.some =
        e.any =
          function (x, F, B) {
            F || (F = e.identity);
            var H = !1;
            return x == null
              ? H
              : D && x.some === D
              ? x.some(F, B)
              : (M(x, function (re, ne, k) {
                  if (H || (H = F.call(B, re, ne, k))) return t;
                }),
                !!H);
          });
      (e.contains = e.include =
        function (x, F) {
          return x == null
            ? !1
            : S && x.indexOf === S
            ? x.indexOf(F) != -1
            : X(x, function (B) {
                return B === F;
              });
        }),
        (e.delay = function (x, F) {
          var B = a.call(arguments, 2);
          return setTimeout(function () {
            return x.apply(null, B);
          }, F);
        }),
        (e.defer = function (x) {
          return e.delay.apply(e, [x, 1].concat(a.call(arguments, 1)));
        }),
        (e.throttle = function (x) {
          var F, B, H;
          return function () {
            F ||
              ((F = !0),
              (B = arguments),
              (H = this),
              ib.frame(function () {
                (F = !1), x.apply(H, B);
              }));
          };
        }),
        (e.debounce = function (x, F, B) {
          var H,
            re,
            ne,
            k,
            Y,
            p = function () {
              var E = e.now() - k;
              E < F
                ? (H = setTimeout(p, F - E))
                : ((H = null), B || ((Y = x.apply(ne, re)), (ne = re = null)));
            };
          return function () {
            (ne = this), (re = arguments), (k = e.now());
            var E = B && !H;
            return (
              H || (H = setTimeout(p, F)),
              E && ((Y = x.apply(ne, re)), (ne = re = null)),
              Y
            );
          };
        }),
        (e.defaults = function (x) {
          if (!e.isObject(x)) return x;
          for (var F = 1, B = arguments.length; F < B; F++) {
            var H = arguments[F];
            for (var re in H) x[re] === void 0 && (x[re] = H[re]);
          }
          return x;
        }),
        (e.keys = function (x) {
          if (!e.isObject(x)) return [];
          if (P) return P(x);
          var F = [];
          for (var B in x) e.has(x, B) && F.push(B);
          return F;
        }),
        (e.has = function (x, F) {
          return d.call(x, F);
        }),
        (e.isObject = function (x) {
          return x === Object(x);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
      var K = /(.)^/,
        Q = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        ee = /\\|'|\r|\n|\u2028|\u2029/g,
        te = function (x) {
          return "\\" + Q[x];
        },
        U = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (x, F, B) {
          !F && B && (F = B), (F = e.defaults({}, F, e.templateSettings));
          var H = RegExp(
              [
                (F.escape || K).source,
                (F.interpolate || K).source,
                (F.evaluate || K).source,
              ].join("|") + "|$",
              "g"
            ),
            re = 0,
            ne = "__p+='";
          x.replace(H, function (E, _, l, G, V) {
            return (
              (ne += x.slice(re, V).replace(ee, te)),
              (re = V + E.length),
              _
                ? (ne +=
                    `'+
((__t=(` +
                    _ +
                    `))==null?'':_.escape(__t))+
'`)
                : l
                ? (ne +=
                    `'+
((__t=(` +
                    l +
                    `))==null?'':__t)+
'`)
                : G &&
                  (ne +=
                    `';
` +
                    G +
                    `
__p+='`),
              E
            );
          }),
            (ne += `';
`);
          var k = F.variable;
          if (k) {
            if (!U.test(k))
              throw new Error("variable is not a bare identifier: " + k);
          } else
            (ne =
              `with(obj||{}){
` +
              ne +
              `}
`),
              (k = "obj");
          ne =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
            ne +
            `return __p;
`;
          var Y;
          try {
            Y = new Function(F.variable || "obj", "_", ne);
          } catch (E) {
            throw ((E.source = ne), E);
          }
          var p = function (E) {
            return Y.call(this, E, e);
          };
          return (
            (p.source =
              "function(" +
              k +
              `){
` +
              ne +
              "}"),
            p
          );
        }),
        e
      );
    })();
  });
  var Ue = c((YV, Hs) => {
    "use strict";
    var ge = {},
      Ht = {},
      Xt = [],
      Mi = window.Webflow || [],
      bt = window.jQuery,
      Ye = bt(window),
      ob = bt(document),
      ot = bt.isFunction,
      Ke = (ge._ = qs()),
      Fs = (ge.tram = Ni() && bt.tram),
      ln = !1,
      qi = !1;
    Fs.config.hideBackface = !1;
    Fs.config.keepInherited = !0;
    ge.define = function (e, t, r) {
      Ht[e] && Us(Ht[e]);
      var n = (Ht[e] = t(bt, Ke, r) || {});
      return Gs(n), n;
    };
    ge.require = function (e) {
      return Ht[e];
    };
    function Gs(e) {
      ge.env() &&
        (ot(e.design) && Ye.on("__wf_design", e.design),
        ot(e.preview) && Ye.on("__wf_preview", e.preview)),
        ot(e.destroy) && Ye.on("__wf_destroy", e.destroy),
        e.ready && ot(e.ready) && ab(e);
    }
    function ab(e) {
      if (ln) {
        e.ready();
        return;
      }
      Ke.contains(Xt, e.ready) || Xt.push(e.ready);
    }
    function Us(e) {
      ot(e.design) && Ye.off("__wf_design", e.design),
        ot(e.preview) && Ye.off("__wf_preview", e.preview),
        ot(e.destroy) && Ye.off("__wf_destroy", e.destroy),
        e.ready && ot(e.ready) && sb(e);
    }
    function sb(e) {
      Xt = Ke.filter(Xt, function (t) {
        return t !== e.ready;
      });
    }
    ge.push = function (e) {
      if (ln) {
        ot(e) && e();
        return;
      }
      Mi.push(e);
    };
    ge.env = function (e) {
      var t = window.__wf_design,
        r = typeof t < "u";
      if (!e) return r;
      if (e === "design") return r && t;
      if (e === "preview") return r && !t;
      if (e === "slug") return r && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var cn = navigator.userAgent.toLowerCase(),
      ks = (ge.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      ub = (ge.env.chrome =
        /chrome/.test(cn) &&
        /Google/.test(navigator.vendor) &&
        parseInt(cn.match(/chrome\/(\d+)\./)[1], 10)),
      cb = (ge.env.ios = /(ipod|iphone|ipad)/.test(cn));
    ge.env.safari = /safari/.test(cn) && !ub && !cb;
    var Pi;
    ks &&
      ob.on("touchstart mousedown", function (e) {
        Pi = e.target;
      });
    ge.validClick = ks
      ? function (e) {
          return e === Pi || bt.contains(e, Pi);
        }
      : function () {
          return !0;
        };
    var Vs = "resize.webflow orientationchange.webflow load.webflow",
      lb = "scroll.webflow " + Vs;
    ge.resize = Di(Ye, Vs);
    ge.scroll = Di(Ye, lb);
    ge.redraw = Di();
    function Di(e, t) {
      var r = [],
        n = {};
      return (
        (n.up = Ke.throttle(function (o) {
          Ke.each(r, function (i) {
            i(o);
          });
        })),
        e && t && e.on(t, n.up),
        (n.on = function (o) {
          typeof o == "function" && (Ke.contains(r, o) || r.push(o));
        }),
        (n.off = function (o) {
          if (!arguments.length) {
            r = [];
            return;
          }
          r = Ke.filter(r, function (i) {
            return i !== o;
          });
        }),
        n
      );
    }
    ge.location = function (e) {
      window.location = e;
    };
    ge.env() && (ge.location = function () {});
    ge.ready = function () {
      (ln = !0), qi ? fb() : Ke.each(Xt, Ds), Ke.each(Mi, Ds), ge.resize.up();
    };
    function Ds(e) {
      ot(e) && e();
    }
    function fb() {
      (qi = !1), Ke.each(Ht, Gs);
    }
    var Lt;
    ge.load = function (e) {
      Lt.then(e);
    };
    function Ws() {
      Lt && (Lt.reject(), Ye.off("load", Lt.resolve)),
        (Lt = new bt.Deferred()),
        Ye.on("load", Lt.resolve);
    }
    ge.destroy = function (e) {
      (e = e || {}),
        (qi = !0),
        Ye.triggerHandler("__wf_destroy"),
        e.domready != null && (ln = e.domready),
        Ke.each(Ht, Us),
        ge.resize.off(),
        ge.scroll.off(),
        ge.redraw.off(),
        (Xt = []),
        (Mi = []),
        Lt.state() === "pending" && Ws();
    };
    bt(ge.ready);
    Ws();
    Hs.exports = window.Webflow = ge;
  });
  var js = c(($V, Bs) => {});
  var Ks = c((QV, zs) => {
    "use strict";
    var Fi = Ue();
    Fi.define(
      "edit",
      (zs.exports = function (e, t, r) {
        if (
          ((r = r || {}),
          (Fi.env("test") || Fi.env("frame")) && !r.fixture && !db())
        )
          return { exit: 1 };
        var n = {},
          o = e(window),
          i = e(document.documentElement),
          a = document.location,
          s = "hashchange",
          u,
          d = r.load || y,
          g = !1;
        try {
          g =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        g
          ? d()
          : a.search
          ? (/[?&](edit)(?:[=&?]|$)/.test(a.search) ||
              /\?edit$/.test(a.href)) &&
            d()
          : o.on(s, v).triggerHandler(s);
        function v() {
          u || (/\?edit/.test(a.hash) && d());
        }
        function y() {
          (u = !0),
            (window.WebflowEditor = !0),
            o.off(s, v),
            L(function (P) {
              e.ajax({
                url: S("https://editor-api.webflow.com/api/editor/view"),
                data: { siteId: i.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: m(P),
              });
            });
        }
        function m(P) {
          return function (q) {
            if (!q) {
              console.error("Could not load editor data");
              return;
            }
            (q.thirdPartyCookiesSupported = P),
              T(D(q.bugReporterScriptPath), function () {
                T(D(q.scriptPath), function () {
                  window.WebflowEditor(q);
                });
              });
          };
        }
        function T(P, q) {
          e.ajax({ type: "GET", url: P, dataType: "script", cache: !0 }).then(
            q,
            I
          );
        }
        function I(P, q, M) {
          throw (console.error("Could not load editor script: " + q), M);
        }
        function D(P) {
          return P.indexOf("//") >= 0
            ? P
            : S("https://editor-api.webflow.com" + P);
        }
        function S(P) {
          return P.replace(/([^:])\/\//g, "$1/");
        }
        function L(P) {
          var q = window.document.createElement("iframe");
          (q.src = "https://webflow.com/site/third-party-cookie-check.html"),
            (q.style.display = "none"),
            (q.sandbox = "allow-scripts allow-same-origin");
          var M = function (X) {
            X.data === "WF_third_party_cookies_unsupported"
              ? (C(q, M), P(!1))
              : X.data === "WF_third_party_cookies_supported" &&
                (C(q, M), P(!0));
          };
          (q.onerror = function () {
            C(q, M), P(!1);
          }),
            window.addEventListener("message", M, !1),
            window.document.body.appendChild(q);
        }
        function C(P, q) {
          window.removeEventListener("message", q, !1), P.remove();
        }
        return n;
      })
    );
    function db() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var $s = c((ZV, Ys) => {
    "use strict";
    var pb = Ue();
    pb.define(
      "focus-visible",
      (Ys.exports = function () {
        function e(r) {
          var n = !0,
            o = !1,
            i = null,
            a = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function s(C) {
            return !!(
              C &&
              C !== document &&
              C.nodeName !== "HTML" &&
              C.nodeName !== "BODY" &&
              "classList" in C &&
              "contains" in C.classList
            );
          }
          function u(C) {
            var P = C.type,
              q = C.tagName;
            return !!(
              (q === "INPUT" && a[P] && !C.readOnly) ||
              (q === "TEXTAREA" && !C.readOnly) ||
              C.isContentEditable
            );
          }
          function d(C) {
            C.getAttribute("data-wf-focus-visible") ||
              C.setAttribute("data-wf-focus-visible", "true");
          }
          function g(C) {
            C.getAttribute("data-wf-focus-visible") &&
              C.removeAttribute("data-wf-focus-visible");
          }
          function v(C) {
            C.metaKey ||
              C.altKey ||
              C.ctrlKey ||
              (s(r.activeElement) && d(r.activeElement), (n = !0));
          }
          function y() {
            n = !1;
          }
          function m(C) {
            s(C.target) && (n || u(C.target)) && d(C.target);
          }
          function T(C) {
            s(C.target) &&
              C.target.hasAttribute("data-wf-focus-visible") &&
              ((o = !0),
              window.clearTimeout(i),
              (i = window.setTimeout(function () {
                o = !1;
              }, 100)),
              g(C.target));
          }
          function I() {
            document.visibilityState === "hidden" && (o && (n = !0), D());
          }
          function D() {
            document.addEventListener("mousemove", L),
              document.addEventListener("mousedown", L),
              document.addEventListener("mouseup", L),
              document.addEventListener("pointermove", L),
              document.addEventListener("pointerdown", L),
              document.addEventListener("pointerup", L),
              document.addEventListener("touchmove", L),
              document.addEventListener("touchstart", L),
              document.addEventListener("touchend", L);
          }
          function S() {
            document.removeEventListener("mousemove", L),
              document.removeEventListener("mousedown", L),
              document.removeEventListener("mouseup", L),
              document.removeEventListener("pointermove", L),
              document.removeEventListener("pointerdown", L),
              document.removeEventListener("pointerup", L),
              document.removeEventListener("touchmove", L),
              document.removeEventListener("touchstart", L),
              document.removeEventListener("touchend", L);
          }
          function L(C) {
            (C.target.nodeName && C.target.nodeName.toLowerCase() === "html") ||
              ((n = !1), S());
          }
          document.addEventListener("keydown", v, !0),
            document.addEventListener("mousedown", y, !0),
            document.addEventListener("pointerdown", y, !0),
            document.addEventListener("touchstart", y, !0),
            document.addEventListener("visibilitychange", I, !0),
            D(),
            r.addEventListener("focus", m, !0),
            r.addEventListener("blur", T, !0);
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      })
    );
  });
  var Js = c((JV, Zs) => {
    "use strict";
    var Qs = Ue();
    Qs.define(
      "focus",
      (Zs.exports = function () {
        var e = [],
          t = !1;
        function r(a) {
          t &&
            (a.preventDefault(),
            a.stopPropagation(),
            a.stopImmediatePropagation(),
            e.unshift(a));
        }
        function n(a) {
          var s = a.target,
            u = s.tagName;
          return (
            (/^a$/i.test(u) && s.href != null) ||
            (/^(button|textarea)$/i.test(u) && s.disabled !== !0) ||
            (/^input$/i.test(u) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(s.type) &&
              !s.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(u) &&
              !Number.isNaN(Number.parseFloat(s.tabIndex))) ||
            /^audio$/i.test(u) ||
            (/^video$/i.test(u) && s.controls === !0)
          );
        }
        function o(a) {
          n(a) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, a.target.focus(); e.length > 0; ) {
                var s = e.pop();
                s.target.dispatchEvent(new MouseEvent(s.type, s));
              }
            }, 0));
        }
        function i() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            Qs.env.safari &&
            (document.addEventListener("mousedown", o, !0),
            document.addEventListener("mouseup", r, !0),
            document.addEventListener("click", r, !0));
        }
        return { ready: i };
      })
    );
  });
  var ru = c((eW, tu) => {
    "use strict";
    var Gi = window.jQuery,
      at = {},
      fn = [],
      eu = ".w-ix",
      dn = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), Gi(t).triggerHandler(at.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), Gi(t).triggerHandler(at.types.OUTRO));
        },
      };
    at.triggers = {};
    at.types = { INTRO: "w-ix-intro" + eu, OUTRO: "w-ix-outro" + eu };
    at.init = function () {
      for (var e = fn.length, t = 0; t < e; t++) {
        var r = fn[t];
        r[0](0, r[1]);
      }
      (fn = []), Gi.extend(at.triggers, dn);
    };
    at.async = function () {
      for (var e in dn) {
        var t = dn[e];
        dn.hasOwnProperty(e) &&
          (at.triggers[e] = function (r, n) {
            fn.push([t, n]);
          });
      }
    };
    at.async();
    tu.exports = at;
  });
  var Tr = c((tW, ou) => {
    "use strict";
    var Ui = ru();
    function nu(e, t) {
      var r = document.createEvent("CustomEvent");
      r.initCustomEvent(t, !0, !0, null), e.dispatchEvent(r);
    }
    var vb = window.jQuery,
      pn = {},
      iu = ".w-ix",
      gb = {
        reset: function (e, t) {
          Ui.triggers.reset(e, t);
        },
        intro: function (e, t) {
          Ui.triggers.intro(e, t), nu(t, "COMPONENT_ACTIVE");
        },
        outro: function (e, t) {
          Ui.triggers.outro(e, t), nu(t, "COMPONENT_INACTIVE");
        },
      };
    pn.triggers = {};
    pn.types = { INTRO: "w-ix-intro" + iu, OUTRO: "w-ix-outro" + iu };
    vb.extend(pn.triggers, gb);
    ou.exports = pn;
  });
  var au = c((rW, vt) => {
    function ki(e) {
      return (
        (vt.exports = ki =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  typeof Symbol == "function" &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        (vt.exports.__esModule = !0),
        (vt.exports.default = vt.exports),
        ki(e)
      );
    }
    (vt.exports = ki),
      (vt.exports.__esModule = !0),
      (vt.exports.default = vt.exports);
  });
  var vn = c((nW, Ir) => {
    var hb = au().default;
    function su(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (su = function (o) {
        return o ? r : t;
      })(e);
    }
    function yb(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (hb(e) !== "object" && typeof e != "function"))
        return { default: e };
      var r = su(t);
      if (r && r.has(e)) return r.get(e);
      var n = {},
        o = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var i in e)
        if (i !== "default" && Object.prototype.hasOwnProperty.call(e, i)) {
          var a = o ? Object.getOwnPropertyDescriptor(e, i) : null;
          a && (a.get || a.set)
            ? Object.defineProperty(n, i, a)
            : (n[i] = e[i]);
        }
      return (n.default = e), r && r.set(e, n), n;
    }
    (Ir.exports = yb),
      (Ir.exports.__esModule = !0),
      (Ir.exports.default = Ir.exports);
  });
  var uu = c((iW, wr) => {
    function mb(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (wr.exports = mb),
      (wr.exports.__esModule = !0),
      (wr.exports.default = wr.exports);
  });
  var Ee = c((oW, cu) => {
    var gn = function (e) {
      return e && e.Math == Math && e;
    };
    cu.exports =
      gn(typeof globalThis == "object" && globalThis) ||
      gn(typeof window == "object" && window) ||
      gn(typeof self == "object" && self) ||
      gn(typeof global == "object" && global) ||
      (function () {
        return this;
      })() ||
      Function("return this")();
  });
  var Bt = c((aW, lu) => {
    lu.exports = function (e) {
      try {
        return !!e();
      } catch {
        return !0;
      }
    };
  });
  var Nt = c((sW, fu) => {
    var Eb = Bt();
    fu.exports = !Eb(function () {
      return (
        Object.defineProperty({}, 1, {
          get: function () {
            return 7;
          },
        })[1] != 7
      );
    });
  });
  var hn = c((uW, du) => {
    var Or = Function.prototype.call;
    du.exports = Or.bind
      ? Or.bind(Or)
      : function () {
          return Or.apply(Or, arguments);
        };
  });
  var hu = c((gu) => {
    "use strict";
    var pu = {}.propertyIsEnumerable,
      vu = Object.getOwnPropertyDescriptor,
      _b = vu && !pu.call({ 1: 2 }, 1);
    gu.f = _b
      ? function (t) {
          var r = vu(this, t);
          return !!r && r.enumerable;
        }
      : pu;
  });
  var Vi = c((lW, yu) => {
    yu.exports = function (e, t) {
      return {
        enumerable: !(e & 1),
        configurable: !(e & 2),
        writable: !(e & 4),
        value: t,
      };
    };
  });
  var $e = c((fW, Eu) => {
    var mu = Function.prototype,
      Wi = mu.bind,
      Hi = mu.call,
      bb = Wi && Wi.bind(Hi);
    Eu.exports = Wi
      ? function (e) {
          return e && bb(Hi, e);
        }
      : function (e) {
          return (
            e &&
            function () {
              return Hi.apply(e, arguments);
            }
          );
        };
  });
  var Tu = c((dW, bu) => {
    var _u = $e(),
      Tb = _u({}.toString),
      Ib = _u("".slice);
    bu.exports = function (e) {
      return Ib(Tb(e), 8, -1);
    };
  });
  var wu = c((pW, Iu) => {
    var wb = Ee(),
      Ob = $e(),
      xb = Bt(),
      Ab = Tu(),
      Xi = wb.Object,
      Sb = Ob("".split);
    Iu.exports = xb(function () {
      return !Xi("z").propertyIsEnumerable(0);
    })
      ? function (e) {
          return Ab(e) == "String" ? Sb(e, "") : Xi(e);
        }
      : Xi;
  });
  var Bi = c((vW, Ou) => {
    var Rb = Ee(),
      Cb = Rb.TypeError;
    Ou.exports = function (e) {
      if (e == null) throw Cb("Can't call method on " + e);
      return e;
    };
  });
  var xr = c((gW, xu) => {
    var Lb = wu(),
      Nb = Bi();
    xu.exports = function (e) {
      return Lb(Nb(e));
    };
  });
  var st = c((hW, Au) => {
    Au.exports = function (e) {
      return typeof e == "function";
    };
  });
  var jt = c((yW, Su) => {
    var Pb = st();
    Su.exports = function (e) {
      return typeof e == "object" ? e !== null : Pb(e);
    };
  });
  var Ar = c((mW, Ru) => {
    var ji = Ee(),
      Mb = st(),
      qb = function (e) {
        return Mb(e) ? e : void 0;
      };
    Ru.exports = function (e, t) {
      return arguments.length < 2 ? qb(ji[e]) : ji[e] && ji[e][t];
    };
  });
  var Lu = c((EW, Cu) => {
    var Db = $e();
    Cu.exports = Db({}.isPrototypeOf);
  });
  var Pu = c((_W, Nu) => {
    var Fb = Ar();
    Nu.exports = Fb("navigator", "userAgent") || "";
  });
  var ku = c((bW, Uu) => {
    var Gu = Ee(),
      zi = Pu(),
      Mu = Gu.process,
      qu = Gu.Deno,
      Du = (Mu && Mu.versions) || (qu && qu.version),
      Fu = Du && Du.v8,
      Qe,
      yn;
    Fu &&
      ((Qe = Fu.split(".")),
      (yn = Qe[0] > 0 && Qe[0] < 4 ? 1 : +(Qe[0] + Qe[1])));
    !yn &&
      zi &&
      ((Qe = zi.match(/Edge\/(\d+)/)),
      (!Qe || Qe[1] >= 74) &&
        ((Qe = zi.match(/Chrome\/(\d+)/)), Qe && (yn = +Qe[1])));
    Uu.exports = yn;
  });
  var Ki = c((TW, Wu) => {
    var Vu = ku(),
      Gb = Bt();
    Wu.exports =
      !!Object.getOwnPropertySymbols &&
      !Gb(function () {
        var e = Symbol();
        return (
          !String(e) ||
          !(Object(e) instanceof Symbol) ||
          (!Symbol.sham && Vu && Vu < 41)
        );
      });
  });
  var Yi = c((IW, Hu) => {
    var Ub = Ki();
    Hu.exports = Ub && !Symbol.sham && typeof Symbol.iterator == "symbol";
  });
  var $i = c((wW, Xu) => {
    var kb = Ee(),
      Vb = Ar(),
      Wb = st(),
      Hb = Lu(),
      Xb = Yi(),
      Bb = kb.Object;
    Xu.exports = Xb
      ? function (e) {
          return typeof e == "symbol";
        }
      : function (e) {
          var t = Vb("Symbol");
          return Wb(t) && Hb(t.prototype, Bb(e));
        };
  });
  var ju = c((OW, Bu) => {
    var jb = Ee(),
      zb = jb.String;
    Bu.exports = function (e) {
      try {
        return zb(e);
      } catch {
        return "Object";
      }
    };
  });
  var Ku = c((xW, zu) => {
    var Kb = Ee(),
      Yb = st(),
      $b = ju(),
      Qb = Kb.TypeError;
    zu.exports = function (e) {
      if (Yb(e)) return e;
      throw Qb($b(e) + " is not a function");
    };
  });
  var $u = c((AW, Yu) => {
    var Zb = Ku();
    Yu.exports = function (e, t) {
      var r = e[t];
      return r == null ? void 0 : Zb(r);
    };
  });
  var Zu = c((SW, Qu) => {
    var Jb = Ee(),
      Qi = hn(),
      Zi = st(),
      Ji = jt(),
      eT = Jb.TypeError;
    Qu.exports = function (e, t) {
      var r, n;
      if (
        (t === "string" && Zi((r = e.toString)) && !Ji((n = Qi(r, e)))) ||
        (Zi((r = e.valueOf)) && !Ji((n = Qi(r, e)))) ||
        (t !== "string" && Zi((r = e.toString)) && !Ji((n = Qi(r, e))))
      )
        return n;
      throw eT("Can't convert object to primitive value");
    };
  });
  var ec = c((RW, Ju) => {
    Ju.exports = !1;
  });
  var mn = c((CW, rc) => {
    var tc = Ee(),
      tT = Object.defineProperty;
    rc.exports = function (e, t) {
      try {
        tT(tc, e, { value: t, configurable: !0, writable: !0 });
      } catch {
        tc[e] = t;
      }
      return t;
    };
  });
  var En = c((LW, ic) => {
    var rT = Ee(),
      nT = mn(),
      nc = "__core-js_shared__",
      iT = rT[nc] || nT(nc, {});
    ic.exports = iT;
  });
  var eo = c((NW, ac) => {
    var oT = ec(),
      oc = En();
    (ac.exports = function (e, t) {
      return oc[e] || (oc[e] = t !== void 0 ? t : {});
    })("versions", []).push({
      version: "3.19.0",
      mode: oT ? "pure" : "global",
      copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)",
    });
  });
  var uc = c((PW, sc) => {
    var aT = Ee(),
      sT = Bi(),
      uT = aT.Object;
    sc.exports = function (e) {
      return uT(sT(e));
    };
  });
  var Tt = c((MW, cc) => {
    var cT = $e(),
      lT = uc(),
      fT = cT({}.hasOwnProperty);
    cc.exports =
      Object.hasOwn ||
      function (t, r) {
        return fT(lT(t), r);
      };
  });
  var to = c((qW, lc) => {
    var dT = $e(),
      pT = 0,
      vT = Math.random(),
      gT = dT((1).toString);
    lc.exports = function (e) {
      return "Symbol(" + (e === void 0 ? "" : e) + ")_" + gT(++pT + vT, 36);
    };
  });
  var ro = c((DW, gc) => {
    var hT = Ee(),
      yT = eo(),
      fc = Tt(),
      mT = to(),
      dc = Ki(),
      vc = Yi(),
      zt = yT("wks"),
      Pt = hT.Symbol,
      pc = Pt && Pt.for,
      ET = vc ? Pt : (Pt && Pt.withoutSetter) || mT;
    gc.exports = function (e) {
      if (!fc(zt, e) || !(dc || typeof zt[e] == "string")) {
        var t = "Symbol." + e;
        dc && fc(Pt, e)
          ? (zt[e] = Pt[e])
          : vc && pc
          ? (zt[e] = pc(t))
          : (zt[e] = ET(t));
      }
      return zt[e];
    };
  });
  var Ec = c((FW, mc) => {
    var _T = Ee(),
      bT = hn(),
      hc = jt(),
      yc = $i(),
      TT = $u(),
      IT = Zu(),
      wT = ro(),
      OT = _T.TypeError,
      xT = wT("toPrimitive");
    mc.exports = function (e, t) {
      if (!hc(e) || yc(e)) return e;
      var r = TT(e, xT),
        n;
      if (r) {
        if (
          (t === void 0 && (t = "default"), (n = bT(r, e, t)), !hc(n) || yc(n))
        )
          return n;
        throw OT("Can't convert object to primitive value");
      }
      return t === void 0 && (t = "number"), IT(e, t);
    };
  });
  var no = c((GW, _c) => {
    var AT = Ec(),
      ST = $i();
    _c.exports = function (e) {
      var t = AT(e, "string");
      return ST(t) ? t : t + "";
    };
  });
  var oo = c((UW, Tc) => {
    var RT = Ee(),
      bc = jt(),
      io = RT.document,
      CT = bc(io) && bc(io.createElement);
    Tc.exports = function (e) {
      return CT ? io.createElement(e) : {};
    };
  });
  var ao = c((kW, Ic) => {
    var LT = Nt(),
      NT = Bt(),
      PT = oo();
    Ic.exports =
      !LT &&
      !NT(function () {
        return (
          Object.defineProperty(PT("div"), "a", {
            get: function () {
              return 7;
            },
          }).a != 7
        );
      });
  });
  var so = c((Oc) => {
    var MT = Nt(),
      qT = hn(),
      DT = hu(),
      FT = Vi(),
      GT = xr(),
      UT = no(),
      kT = Tt(),
      VT = ao(),
      wc = Object.getOwnPropertyDescriptor;
    Oc.f = MT
      ? wc
      : function (t, r) {
          if (((t = GT(t)), (r = UT(r)), VT))
            try {
              return wc(t, r);
            } catch {}
          if (kT(t, r)) return FT(!qT(DT.f, t, r), t[r]);
        };
  });
  var Sr = c((WW, Ac) => {
    var xc = Ee(),
      WT = jt(),
      HT = xc.String,
      XT = xc.TypeError;
    Ac.exports = function (e) {
      if (WT(e)) return e;
      throw XT(HT(e) + " is not an object");
    };
  });
  var Rr = c((Cc) => {
    var BT = Ee(),
      jT = Nt(),
      zT = ao(),
      Sc = Sr(),
      KT = no(),
      YT = BT.TypeError,
      Rc = Object.defineProperty;
    Cc.f = jT
      ? Rc
      : function (t, r, n) {
          if ((Sc(t), (r = KT(r)), Sc(n), zT))
            try {
              return Rc(t, r, n);
            } catch {}
          if ("get" in n || "set" in n) throw YT("Accessors not supported");
          return "value" in n && (t[r] = n.value), t;
        };
  });
  var _n = c((XW, Lc) => {
    var $T = Nt(),
      QT = Rr(),
      ZT = Vi();
    Lc.exports = $T
      ? function (e, t, r) {
          return QT.f(e, t, ZT(1, r));
        }
      : function (e, t, r) {
          return (e[t] = r), e;
        };
  });
  var co = c((BW, Nc) => {
    var JT = $e(),
      eI = st(),
      uo = En(),
      tI = JT(Function.toString);
    eI(uo.inspectSource) ||
      (uo.inspectSource = function (e) {
        return tI(e);
      });
    Nc.exports = uo.inspectSource;
  });
  var qc = c((jW, Mc) => {
    var rI = Ee(),
      nI = st(),
      iI = co(),
      Pc = rI.WeakMap;
    Mc.exports = nI(Pc) && /native code/.test(iI(Pc));
  });
  var lo = c((zW, Fc) => {
    var oI = eo(),
      aI = to(),
      Dc = oI("keys");
    Fc.exports = function (e) {
      return Dc[e] || (Dc[e] = aI(e));
    };
  });
  var bn = c((KW, Gc) => {
    Gc.exports = {};
  });
  var Xc = c((YW, Hc) => {
    var sI = qc(),
      Wc = Ee(),
      fo = $e(),
      uI = jt(),
      cI = _n(),
      po = Tt(),
      vo = En(),
      lI = lo(),
      fI = bn(),
      Uc = "Object already initialized",
      ho = Wc.TypeError,
      dI = Wc.WeakMap,
      Tn,
      Cr,
      In,
      pI = function (e) {
        return In(e) ? Cr(e) : Tn(e, {});
      },
      vI = function (e) {
        return function (t) {
          var r;
          if (!uI(t) || (r = Cr(t)).type !== e)
            throw ho("Incompatible receiver, " + e + " required");
          return r;
        };
      };
    sI || vo.state
      ? ((It = vo.state || (vo.state = new dI())),
        (kc = fo(It.get)),
        (go = fo(It.has)),
        (Vc = fo(It.set)),
        (Tn = function (e, t) {
          if (go(It, e)) throw new ho(Uc);
          return (t.facade = e), Vc(It, e, t), t;
        }),
        (Cr = function (e) {
          return kc(It, e) || {};
        }),
        (In = function (e) {
          return go(It, e);
        }))
      : ((Mt = lI("state")),
        (fI[Mt] = !0),
        (Tn = function (e, t) {
          if (po(e, Mt)) throw new ho(Uc);
          return (t.facade = e), cI(e, Mt, t), t;
        }),
        (Cr = function (e) {
          return po(e, Mt) ? e[Mt] : {};
        }),
        (In = function (e) {
          return po(e, Mt);
        }));
    var It, kc, go, Vc, Mt;
    Hc.exports = { set: Tn, get: Cr, has: In, enforce: pI, getterFor: vI };
  });
  var zc = c(($W, jc) => {
    var yo = Nt(),
      gI = Tt(),
      Bc = Function.prototype,
      hI = yo && Object.getOwnPropertyDescriptor,
      mo = gI(Bc, "name"),
      yI = mo && function () {}.name === "something",
      mI = mo && (!yo || (yo && hI(Bc, "name").configurable));
    jc.exports = { EXISTS: mo, PROPER: yI, CONFIGURABLE: mI };
  });
  var Zc = c((QW, Qc) => {
    var EI = Ee(),
      Kc = st(),
      _I = Tt(),
      Yc = _n(),
      bI = mn(),
      TI = co(),
      $c = Xc(),
      II = zc().CONFIGURABLE,
      wI = $c.get,
      OI = $c.enforce,
      xI = String(String).split("String");
    (Qc.exports = function (e, t, r, n) {
      var o = n ? !!n.unsafe : !1,
        i = n ? !!n.enumerable : !1,
        a = n ? !!n.noTargetGet : !1,
        s = n && n.name !== void 0 ? n.name : t,
        u;
      if (
        (Kc(r) &&
          (String(s).slice(0, 7) === "Symbol(" &&
            (s = "[" + String(s).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
          (!_I(r, "name") || (II && r.name !== s)) && Yc(r, "name", s),
          (u = OI(r)),
          u.source || (u.source = xI.join(typeof s == "string" ? s : ""))),
        e === EI)
      ) {
        i ? (e[t] = r) : bI(t, r);
        return;
      } else o ? !a && e[t] && (i = !0) : delete e[t];
      i ? (e[t] = r) : Yc(e, t, r);
    })(Function.prototype, "toString", function () {
      return (Kc(this) && wI(this).source) || TI(this);
    });
  });
  var Eo = c((ZW, Jc) => {
    var AI = Math.ceil,
      SI = Math.floor;
    Jc.exports = function (e) {
      var t = +e;
      return t !== t || t === 0 ? 0 : (t > 0 ? SI : AI)(t);
    };
  });
  var tl = c((JW, el) => {
    var RI = Eo(),
      CI = Math.max,
      LI = Math.min;
    el.exports = function (e, t) {
      var r = RI(e);
      return r < 0 ? CI(r + t, 0) : LI(r, t);
    };
  });
  var nl = c((eH, rl) => {
    var NI = Eo(),
      PI = Math.min;
    rl.exports = function (e) {
      return e > 0 ? PI(NI(e), 9007199254740991) : 0;
    };
  });
  var ol = c((tH, il) => {
    var MI = nl();
    il.exports = function (e) {
      return MI(e.length);
    };
  });
  var _o = c((rH, sl) => {
    var qI = xr(),
      DI = tl(),
      FI = ol(),
      al = function (e) {
        return function (t, r, n) {
          var o = qI(t),
            i = FI(o),
            a = DI(n, i),
            s;
          if (e && r != r) {
            for (; i > a; ) if (((s = o[a++]), s != s)) return !0;
          } else
            for (; i > a; a++)
              if ((e || a in o) && o[a] === r) return e || a || 0;
          return !e && -1;
        };
      };
    sl.exports = { includes: al(!0), indexOf: al(!1) };
  });
  var To = c((nH, cl) => {
    var GI = $e(),
      bo = Tt(),
      UI = xr(),
      kI = _o().indexOf,
      VI = bn(),
      ul = GI([].push);
    cl.exports = function (e, t) {
      var r = UI(e),
        n = 0,
        o = [],
        i;
      for (i in r) !bo(VI, i) && bo(r, i) && ul(o, i);
      for (; t.length > n; ) bo(r, (i = t[n++])) && (~kI(o, i) || ul(o, i));
      return o;
    };
  });
  var wn = c((iH, ll) => {
    ll.exports = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf",
    ];
  });
  var dl = c((fl) => {
    var WI = To(),
      HI = wn(),
      XI = HI.concat("length", "prototype");
    fl.f =
      Object.getOwnPropertyNames ||
      function (t) {
        return WI(t, XI);
      };
  });
  var vl = c((pl) => {
    pl.f = Object.getOwnPropertySymbols;
  });
  var hl = c((sH, gl) => {
    var BI = Ar(),
      jI = $e(),
      zI = dl(),
      KI = vl(),
      YI = Sr(),
      $I = jI([].concat);
    gl.exports =
      BI("Reflect", "ownKeys") ||
      function (t) {
        var r = zI.f(YI(t)),
          n = KI.f;
        return n ? $I(r, n(t)) : r;
      };
  });
  var ml = c((uH, yl) => {
    var QI = Tt(),
      ZI = hl(),
      JI = so(),
      ew = Rr();
    yl.exports = function (e, t) {
      for (var r = ZI(t), n = ew.f, o = JI.f, i = 0; i < r.length; i++) {
        var a = r[i];
        QI(e, a) || n(e, a, o(t, a));
      }
    };
  });
  var _l = c((cH, El) => {
    var tw = Bt(),
      rw = st(),
      nw = /#|\.prototype\./,
      Lr = function (e, t) {
        var r = ow[iw(e)];
        return r == sw ? !0 : r == aw ? !1 : rw(t) ? tw(t) : !!t;
      },
      iw = (Lr.normalize = function (e) {
        return String(e).replace(nw, ".").toLowerCase();
      }),
      ow = (Lr.data = {}),
      aw = (Lr.NATIVE = "N"),
      sw = (Lr.POLYFILL = "P");
    El.exports = Lr;
  });
  var Tl = c((lH, bl) => {
    var Io = Ee(),
      uw = so().f,
      cw = _n(),
      lw = Zc(),
      fw = mn(),
      dw = ml(),
      pw = _l();
    bl.exports = function (e, t) {
      var r = e.target,
        n = e.global,
        o = e.stat,
        i,
        a,
        s,
        u,
        d,
        g;
      if (
        (n
          ? (a = Io)
          : o
          ? (a = Io[r] || fw(r, {}))
          : (a = (Io[r] || {}).prototype),
        a)
      )
        for (s in t) {
          if (
            ((d = t[s]),
            e.noTargetGet ? ((g = uw(a, s)), (u = g && g.value)) : (u = a[s]),
            (i = pw(n ? s : r + (o ? "." : "#") + s, e.forced)),
            !i && u !== void 0)
          ) {
            if (typeof d == typeof u) continue;
            dw(d, u);
          }
          (e.sham || (u && u.sham)) && cw(d, "sham", !0), lw(a, s, d, e);
        }
    };
  });
  var wl = c((fH, Il) => {
    var vw = To(),
      gw = wn();
    Il.exports =
      Object.keys ||
      function (t) {
        return vw(t, gw);
      };
  });
  var xl = c((dH, Ol) => {
    var hw = Nt(),
      yw = Rr(),
      mw = Sr(),
      Ew = xr(),
      _w = wl();
    Ol.exports = hw
      ? Object.defineProperties
      : function (t, r) {
          mw(t);
          for (var n = Ew(r), o = _w(r), i = o.length, a = 0, s; i > a; )
            yw.f(t, (s = o[a++]), n[s]);
          return t;
        };
  });
  var Sl = c((pH, Al) => {
    var bw = Ar();
    Al.exports = bw("document", "documentElement");
  });
  var Dl = c((vH, ql) => {
    var Tw = Sr(),
      Iw = xl(),
      Rl = wn(),
      ww = bn(),
      Ow = Sl(),
      xw = oo(),
      Aw = lo(),
      Cl = ">",
      Ll = "<",
      Oo = "prototype",
      xo = "script",
      Pl = Aw("IE_PROTO"),
      wo = function () {},
      Ml = function (e) {
        return Ll + xo + Cl + e + Ll + "/" + xo + Cl;
      },
      Nl = function (e) {
        e.write(Ml("")), e.close();
        var t = e.parentWindow.Object;
        return (e = null), t;
      },
      Sw = function () {
        var e = xw("iframe"),
          t = "java" + xo + ":",
          r;
        return (
          (e.style.display = "none"),
          Ow.appendChild(e),
          (e.src = String(t)),
          (r = e.contentWindow.document),
          r.open(),
          r.write(Ml("document.F=Object")),
          r.close(),
          r.F
        );
      },
      On,
      xn = function () {
        try {
          On = new ActiveXObject("htmlfile");
        } catch {}
        xn =
          typeof document < "u"
            ? document.domain && On
              ? Nl(On)
              : Sw()
            : Nl(On);
        for (var e = Rl.length; e--; ) delete xn[Oo][Rl[e]];
        return xn();
      };
    ww[Pl] = !0;
    ql.exports =
      Object.create ||
      function (t, r) {
        var n;
        return (
          t !== null
            ? ((wo[Oo] = Tw(t)), (n = new wo()), (wo[Oo] = null), (n[Pl] = t))
            : (n = xn()),
          r === void 0 ? n : Iw(n, r)
        );
      };
  });
  var Gl = c((gH, Fl) => {
    var Rw = ro(),
      Cw = Dl(),
      Lw = Rr(),
      Ao = Rw("unscopables"),
      So = Array.prototype;
    So[Ao] == null && Lw.f(So, Ao, { configurable: !0, value: Cw(null) });
    Fl.exports = function (e) {
      So[Ao][e] = !0;
    };
  });
  var Ul = c(() => {
    "use strict";
    var Nw = Tl(),
      Pw = _o().includes,
      Mw = Gl();
    Nw(
      { target: "Array", proto: !0 },
      {
        includes: function (t) {
          return Pw(this, t, arguments.length > 1 ? arguments[1] : void 0);
        },
      }
    );
    Mw("includes");
  });
  var Vl = c((mH, kl) => {
    var qw = Ee(),
      Dw = $e();
    kl.exports = function (e, t) {
      return Dw(qw[e].prototype[t]);
    };
  });
  var Hl = c((EH, Wl) => {
    Ul();
    var Fw = Vl();
    Wl.exports = Fw("Array", "includes");
  });
  var Bl = c((_H, Xl) => {
    var Gw = Hl();
    Xl.exports = Gw;
  });
  var zl = c((bH, jl) => {
    var Uw = Bl();
    jl.exports = Uw;
  });
  var Ro = c((TH, Kl) => {
    var kw =
      typeof global == "object" && global && global.Object === Object && global;
    Kl.exports = kw;
  });
  var Ze = c((IH, Yl) => {
    var Vw = Ro(),
      Ww = typeof self == "object" && self && self.Object === Object && self,
      Hw = Vw || Ww || Function("return this")();
    Yl.exports = Hw;
  });
  var Kt = c((wH, $l) => {
    var Xw = Ze(),
      Bw = Xw.Symbol;
    $l.exports = Bw;
  });
  var ef = c((OH, Jl) => {
    var Ql = Kt(),
      Zl = Object.prototype,
      jw = Zl.hasOwnProperty,
      zw = Zl.toString,
      Nr = Ql ? Ql.toStringTag : void 0;
    function Kw(e) {
      var t = jw.call(e, Nr),
        r = e[Nr];
      try {
        e[Nr] = void 0;
        var n = !0;
      } catch {}
      var o = zw.call(e);
      return n && (t ? (e[Nr] = r) : delete e[Nr]), o;
    }
    Jl.exports = Kw;
  });
  var rf = c((xH, tf) => {
    var Yw = Object.prototype,
      $w = Yw.toString;
    function Qw(e) {
      return $w.call(e);
    }
    tf.exports = Qw;
  });
  var wt = c((AH, af) => {
    var nf = Kt(),
      Zw = ef(),
      Jw = rf(),
      eO = "[object Null]",
      tO = "[object Undefined]",
      of = nf ? nf.toStringTag : void 0;
    function rO(e) {
      return e == null
        ? e === void 0
          ? tO
          : eO
        : of && of in Object(e)
        ? Zw(e)
        : Jw(e);
    }
    af.exports = rO;
  });
  var Co = c((SH, sf) => {
    function nO(e, t) {
      return function (r) {
        return e(t(r));
      };
    }
    sf.exports = nO;
  });
  var Lo = c((RH, uf) => {
    var iO = Co(),
      oO = iO(Object.getPrototypeOf, Object);
    uf.exports = oO;
  });
  var gt = c((CH, cf) => {
    function aO(e) {
      return e != null && typeof e == "object";
    }
    cf.exports = aO;
  });
  var No = c((LH, ff) => {
    var sO = wt(),
      uO = Lo(),
      cO = gt(),
      lO = "[object Object]",
      fO = Function.prototype,
      dO = Object.prototype,
      lf = fO.toString,
      pO = dO.hasOwnProperty,
      vO = lf.call(Object);
    function gO(e) {
      if (!cO(e) || sO(e) != lO) return !1;
      var t = uO(e);
      if (t === null) return !0;
      var r = pO.call(t, "constructor") && t.constructor;
      return typeof r == "function" && r instanceof r && lf.call(r) == vO;
    }
    ff.exports = gO;
  });
  var df = c((Po) => {
    "use strict";
    Object.defineProperty(Po, "__esModule", { value: !0 });
    Po.default = hO;
    function hO(e) {
      var t,
        r = e.Symbol;
      return (
        typeof r == "function"
          ? r.observable
            ? (t = r.observable)
            : ((t = r("observable")), (r.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var pf = c((qo, Mo) => {
    "use strict";
    Object.defineProperty(qo, "__esModule", { value: !0 });
    var yO = df(),
      mO = EO(yO);
    function EO(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var Yt;
    typeof self < "u"
      ? (Yt = self)
      : typeof window < "u"
      ? (Yt = window)
      : typeof global < "u"
      ? (Yt = global)
      : typeof Mo < "u"
      ? (Yt = Mo)
      : (Yt = Function("return this")());
    var _O = (0, mO.default)(Yt);
    qo.default = _O;
  });
  var Do = c((Pr) => {
    "use strict";
    Pr.__esModule = !0;
    Pr.ActionTypes = void 0;
    Pr.default = yf;
    var bO = No(),
      TO = hf(bO),
      IO = pf(),
      vf = hf(IO);
    function hf(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var gf = (Pr.ActionTypes = { INIT: "@@redux/INIT" });
    function yf(e, t, r) {
      var n;
      if (
        (typeof t == "function" && typeof r > "u" && ((r = t), (t = void 0)),
        typeof r < "u")
      ) {
        if (typeof r != "function")
          throw new Error("Expected the enhancer to be a function.");
        return r(yf)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var o = e,
        i = t,
        a = [],
        s = a,
        u = !1;
      function d() {
        s === a && (s = a.slice());
      }
      function g() {
        return i;
      }
      function v(I) {
        if (typeof I != "function")
          throw new Error("Expected listener to be a function.");
        var D = !0;
        return (
          d(),
          s.push(I),
          function () {
            if (D) {
              (D = !1), d();
              var L = s.indexOf(I);
              s.splice(L, 1);
            }
          }
        );
      }
      function y(I) {
        if (!(0, TO.default)(I))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (typeof I.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (u) throw new Error("Reducers may not dispatch actions.");
        try {
          (u = !0), (i = o(i, I));
        } finally {
          u = !1;
        }
        for (var D = (a = s), S = 0; S < D.length; S++) D[S]();
        return I;
      }
      function m(I) {
        if (typeof I != "function")
          throw new Error("Expected the nextReducer to be a function.");
        (o = I), y({ type: gf.INIT });
      }
      function T() {
        var I,
          D = v;
        return (
          (I = {
            subscribe: function (L) {
              if (typeof L != "object")
                throw new TypeError("Expected the observer to be an object.");
              function C() {
                L.next && L.next(g());
              }
              C();
              var P = D(C);
              return { unsubscribe: P };
            },
          }),
          (I[vf.default] = function () {
            return this;
          }),
          I
        );
      }
      return (
        y({ type: gf.INIT }),
        (n = { dispatch: y, subscribe: v, getState: g, replaceReducer: m }),
        (n[vf.default] = T),
        n
      );
    }
  });
  var Go = c((Fo) => {
    "use strict";
    Fo.__esModule = !0;
    Fo.default = wO;
    function wO(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var _f = c((Uo) => {
    "use strict";
    Uo.__esModule = !0;
    Uo.default = RO;
    var mf = Do(),
      OO = No(),
      qH = Ef(OO),
      xO = Go(),
      DH = Ef(xO);
    function Ef(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function AO(e, t) {
      var r = t && t.type,
        n = (r && '"' + r.toString() + '"') || "an action";
      return (
        "Given action " +
        n +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function SO(e) {
      Object.keys(e).forEach(function (t) {
        var r = e[t],
          n = r(void 0, { type: mf.ActionTypes.INIT });
        if (typeof n > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        var o =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof r(void 0, { type: o }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                mf.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
          );
      });
    }
    function RO(e) {
      for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
        var o = t[n];
        typeof e[o] == "function" && (r[o] = e[o]);
      }
      var i = Object.keys(r);
      if (!1) var a;
      var s;
      try {
        SO(r);
      } catch (u) {
        s = u;
      }
      return function () {
        var d =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          g = arguments[1];
        if (s) throw s;
        if (!1) var v;
        for (var y = !1, m = {}, T = 0; T < i.length; T++) {
          var I = i[T],
            D = r[I],
            S = d[I],
            L = D(S, g);
          if (typeof L > "u") {
            var C = AO(I, g);
            throw new Error(C);
          }
          (m[I] = L), (y = y || L !== S);
        }
        return y ? m : d;
      };
    }
  });
  var Tf = c((ko) => {
    "use strict";
    ko.__esModule = !0;
    ko.default = CO;
    function bf(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function CO(e, t) {
      if (typeof e == "function") return bf(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var r = Object.keys(e), n = {}, o = 0; o < r.length; o++) {
        var i = r[o],
          a = e[i];
        typeof a == "function" && (n[i] = bf(a, t));
      }
      return n;
    }
  });
  var Wo = c((Vo) => {
    "use strict";
    Vo.__esModule = !0;
    Vo.default = LO;
    function LO() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      if (t.length === 0)
        return function (i) {
          return i;
        };
      if (t.length === 1) return t[0];
      var n = t[t.length - 1],
        o = t.slice(0, -1);
      return function () {
        return o.reduceRight(function (i, a) {
          return a(i);
        }, n.apply(void 0, arguments));
      };
    }
  });
  var If = c((Ho) => {
    "use strict";
    Ho.__esModule = !0;
    var NO =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      };
    Ho.default = DO;
    var PO = Wo(),
      MO = qO(PO);
    function qO(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function DO() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      return function (n) {
        return function (o, i, a) {
          var s = n(o, i, a),
            u = s.dispatch,
            d = [],
            g = {
              getState: s.getState,
              dispatch: function (y) {
                return u(y);
              },
            };
          return (
            (d = t.map(function (v) {
              return v(g);
            })),
            (u = MO.default.apply(void 0, d)(s.dispatch)),
            NO({}, s, { dispatch: u })
          );
        };
      };
    }
  });
  var Xo = c((He) => {
    "use strict";
    He.__esModule = !0;
    He.compose =
      He.applyMiddleware =
      He.bindActionCreators =
      He.combineReducers =
      He.createStore =
        void 0;
    var FO = Do(),
      GO = $t(FO),
      UO = _f(),
      kO = $t(UO),
      VO = Tf(),
      WO = $t(VO),
      HO = If(),
      XO = $t(HO),
      BO = Wo(),
      jO = $t(BO),
      zO = Go(),
      VH = $t(zO);
    function $t(e) {
      return e && e.__esModule ? e : { default: e };
    }
    He.createStore = GO.default;
    He.combineReducers = kO.default;
    He.bindActionCreators = WO.default;
    He.applyMiddleware = XO.default;
    He.compose = jO.default;
  });
  var Je,
    Bo,
    ut,
    KO,
    YO,
    jo,
    $O,
    wf = me(() => {
      "use strict";
      (Je = {
        NAVBAR_OPEN: "NAVBAR_OPEN",
        NAVBAR_CLOSE: "NAVBAR_CLOSE",
        TAB_ACTIVE: "TAB_ACTIVE",
        TAB_INACTIVE: "TAB_INACTIVE",
        SLIDER_ACTIVE: "SLIDER_ACTIVE",
        SLIDER_INACTIVE: "SLIDER_INACTIVE",
        DROPDOWN_OPEN: "DROPDOWN_OPEN",
        DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
        MOUSE_CLICK: "MOUSE_CLICK",
        MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
        MOUSE_DOWN: "MOUSE_DOWN",
        MOUSE_UP: "MOUSE_UP",
        MOUSE_OVER: "MOUSE_OVER",
        MOUSE_OUT: "MOUSE_OUT",
        MOUSE_MOVE: "MOUSE_MOVE",
        MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
        SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
        SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
        SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
        ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
        ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
        PAGE_START: "PAGE_START",
        PAGE_FINISH: "PAGE_FINISH",
        PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
        PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
        PAGE_SCROLL: "PAGE_SCROLL",
      }),
        (Bo = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" }),
        (ut = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" }),
        (KO = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" }),
        (YO = {
          CHILDREN: "CHILDREN",
          SIBLINGS: "SIBLINGS",
          IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
        }),
        (jo = {
          FADE_EFFECT: "FADE_EFFECT",
          SLIDE_EFFECT: "SLIDE_EFFECT",
          GROW_EFFECT: "GROW_EFFECT",
          SHRINK_EFFECT: "SHRINK_EFFECT",
          SPIN_EFFECT: "SPIN_EFFECT",
          FLY_EFFECT: "FLY_EFFECT",
          POP_EFFECT: "POP_EFFECT",
          FLIP_EFFECT: "FLIP_EFFECT",
          JIGGLE_EFFECT: "JIGGLE_EFFECT",
          PULSE_EFFECT: "PULSE_EFFECT",
          DROP_EFFECT: "DROP_EFFECT",
          BLINK_EFFECT: "BLINK_EFFECT",
          BOUNCE_EFFECT: "BOUNCE_EFFECT",
          FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
          FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
          RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
          JELLO_EFFECT: "JELLO_EFFECT",
          GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
          SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
          PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
        }),
        ($O = {
          LEFT: "LEFT",
          RIGHT: "RIGHT",
          BOTTOM: "BOTTOM",
          TOP: "TOP",
          BOTTOM_LEFT: "BOTTOM_LEFT",
          BOTTOM_RIGHT: "BOTTOM_RIGHT",
          TOP_RIGHT: "TOP_RIGHT",
          TOP_LEFT: "TOP_LEFT",
          CLOCKWISE: "CLOCKWISE",
          COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
        });
    });
  var Xe,
    QO,
    zo = me(() => {
      "use strict";
      (Xe = {
        TRANSFORM_MOVE: "TRANSFORM_MOVE",
        TRANSFORM_SCALE: "TRANSFORM_SCALE",
        TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
        TRANSFORM_SKEW: "TRANSFORM_SKEW",
        STYLE_OPACITY: "STYLE_OPACITY",
        STYLE_SIZE: "STYLE_SIZE",
        STYLE_FILTER: "STYLE_FILTER",
        STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
        STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
        STYLE_BORDER: "STYLE_BORDER",
        STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
        OBJECT_VALUE: "OBJECT_VALUE",
        PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
        PLUGIN_SPLINE: "PLUGIN_SPLINE",
        PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
        GENERAL_DISPLAY: "GENERAL_DISPLAY",
        GENERAL_START_ACTION: "GENERAL_START_ACTION",
        GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
        GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
        GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
        GENERAL_LOOP: "GENERAL_LOOP",
        STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
      }),
        (QO = {
          ELEMENT: "ELEMENT",
          ELEMENT_CLASS: "ELEMENT_CLASS",
          TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
        });
    });
  var ZO,
    Of = me(() => {
      "use strict";
      ZO = {
        MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
        MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
        MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
        SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
        SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
        MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
          "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
        PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
        PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
        PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
        NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
        DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
        ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
        TAB_INTERACTION: "TAB_INTERACTION",
        SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
    });
  var JO,
    ex,
    tx,
    rx,
    nx,
    ix,
    ox,
    Ko,
    xf = me(() => {
      "use strict";
      zo();
      ({
        TRANSFORM_MOVE: JO,
        TRANSFORM_SCALE: ex,
        TRANSFORM_ROTATE: tx,
        TRANSFORM_SKEW: rx,
        STYLE_SIZE: nx,
        STYLE_FILTER: ix,
        STYLE_FONT_VARIATION: ox,
      } = Xe),
        (Ko = {
          [JO]: !0,
          [ex]: !0,
          [tx]: !0,
          [rx]: !0,
          [nx]: !0,
          [ix]: !0,
          [ox]: !0,
        });
    });
  var we = {};
  Ge(we, {
    IX2_ACTION_LIST_PLAYBACK_CHANGED: () => Tx,
    IX2_ANIMATION_FRAME_CHANGED: () => hx,
    IX2_CLEAR_REQUESTED: () => px,
    IX2_ELEMENT_STATE_CHANGED: () => bx,
    IX2_EVENT_LISTENER_ADDED: () => vx,
    IX2_EVENT_STATE_CHANGED: () => gx,
    IX2_INSTANCE_ADDED: () => mx,
    IX2_INSTANCE_REMOVED: () => _x,
    IX2_INSTANCE_STARTED: () => Ex,
    IX2_MEDIA_QUERIES_DEFINED: () => wx,
    IX2_PARAMETER_CHANGED: () => yx,
    IX2_PLAYBACK_REQUESTED: () => fx,
    IX2_PREVIEW_REQUESTED: () => lx,
    IX2_RAW_DATA_IMPORTED: () => ax,
    IX2_SESSION_INITIALIZED: () => sx,
    IX2_SESSION_STARTED: () => ux,
    IX2_SESSION_STOPPED: () => cx,
    IX2_STOP_REQUESTED: () => dx,
    IX2_TEST_FRAME_RENDERED: () => Ox,
    IX2_VIEWPORT_WIDTH_CHANGED: () => Ix,
  });
  var ax,
    sx,
    ux,
    cx,
    lx,
    fx,
    dx,
    px,
    vx,
    gx,
    hx,
    yx,
    mx,
    Ex,
    _x,
    bx,
    Tx,
    Ix,
    wx,
    Ox,
    Af = me(() => {
      "use strict";
      (ax = "IX2_RAW_DATA_IMPORTED"),
        (sx = "IX2_SESSION_INITIALIZED"),
        (ux = "IX2_SESSION_STARTED"),
        (cx = "IX2_SESSION_STOPPED"),
        (lx = "IX2_PREVIEW_REQUESTED"),
        (fx = "IX2_PLAYBACK_REQUESTED"),
        (dx = "IX2_STOP_REQUESTED"),
        (px = "IX2_CLEAR_REQUESTED"),
        (vx = "IX2_EVENT_LISTENER_ADDED"),
        (gx = "IX2_EVENT_STATE_CHANGED"),
        (hx = "IX2_ANIMATION_FRAME_CHANGED"),
        (yx = "IX2_PARAMETER_CHANGED"),
        (mx = "IX2_INSTANCE_ADDED"),
        (Ex = "IX2_INSTANCE_STARTED"),
        (_x = "IX2_INSTANCE_REMOVED"),
        (bx = "IX2_ELEMENT_STATE_CHANGED"),
        (Tx = "IX2_ACTION_LIST_PLAYBACK_CHANGED"),
        (Ix = "IX2_VIEWPORT_WIDTH_CHANGED"),
        (wx = "IX2_MEDIA_QUERIES_DEFINED"),
        (Ox = "IX2_TEST_FRAME_RENDERED");
    });
  var Ce = {};
  Ge(Ce, {
    ABSTRACT_NODE: () => IA,
    AUTO: () => dA,
    BACKGROUND: () => aA,
    BACKGROUND_COLOR: () => oA,
    BAR_DELIMITER: () => gA,
    BORDER_COLOR: () => sA,
    BOUNDARY_SELECTOR: () => Cx,
    CHILDREN: () => hA,
    COLON_DELIMITER: () => vA,
    COLOR: () => uA,
    COMMA_DELIMITER: () => pA,
    CONFIG_UNIT: () => Gx,
    CONFIG_VALUE: () => Mx,
    CONFIG_X_UNIT: () => qx,
    CONFIG_X_VALUE: () => Lx,
    CONFIG_Y_UNIT: () => Dx,
    CONFIG_Y_VALUE: () => Nx,
    CONFIG_Z_UNIT: () => Fx,
    CONFIG_Z_VALUE: () => Px,
    DISPLAY: () => cA,
    FILTER: () => tA,
    FLEX: () => lA,
    FONT_VARIATION_SETTINGS: () => rA,
    HEIGHT: () => iA,
    HTML_ELEMENT: () => bA,
    IMMEDIATE_CHILDREN: () => yA,
    IX2_ID_DELIMITER: () => xx,
    OPACITY: () => eA,
    PARENT: () => EA,
    PLAIN_OBJECT: () => TA,
    PRESERVE_3D: () => _A,
    RENDER_GENERAL: () => OA,
    RENDER_PLUGIN: () => AA,
    RENDER_STYLE: () => xA,
    RENDER_TRANSFORM: () => wA,
    ROTATE_X: () => Kx,
    ROTATE_Y: () => Yx,
    ROTATE_Z: () => $x,
    SCALE_3D: () => zx,
    SCALE_X: () => Xx,
    SCALE_Y: () => Bx,
    SCALE_Z: () => jx,
    SIBLINGS: () => mA,
    SKEW: () => Qx,
    SKEW_X: () => Zx,
    SKEW_Y: () => Jx,
    TRANSFORM: () => Ux,
    TRANSLATE_3D: () => Hx,
    TRANSLATE_X: () => kx,
    TRANSLATE_Y: () => Vx,
    TRANSLATE_Z: () => Wx,
    WF_PAGE: () => Ax,
    WIDTH: () => nA,
    WILL_CHANGE: () => fA,
    W_MOD_IX: () => Rx,
    W_MOD_JS: () => Sx,
  });
  var xx,
    Ax,
    Sx,
    Rx,
    Cx,
    Lx,
    Nx,
    Px,
    Mx,
    qx,
    Dx,
    Fx,
    Gx,
    Ux,
    kx,
    Vx,
    Wx,
    Hx,
    Xx,
    Bx,
    jx,
    zx,
    Kx,
    Yx,
    $x,
    Qx,
    Zx,
    Jx,
    eA,
    tA,
    rA,
    nA,
    iA,
    oA,
    aA,
    sA,
    uA,
    cA,
    lA,
    fA,
    dA,
    pA,
    vA,
    gA,
    hA,
    yA,
    mA,
    EA,
    _A,
    bA,
    TA,
    IA,
    wA,
    OA,
    xA,
    AA,
    Sf = me(() => {
      "use strict";
      (xx = "|"),
        (Ax = "data-wf-page"),
        (Sx = "w-mod-js"),
        (Rx = "w-mod-ix"),
        (Cx = ".w-dyn-item"),
        (Lx = "xValue"),
        (Nx = "yValue"),
        (Px = "zValue"),
        (Mx = "value"),
        (qx = "xUnit"),
        (Dx = "yUnit"),
        (Fx = "zUnit"),
        (Gx = "unit"),
        (Ux = "transform"),
        (kx = "translateX"),
        (Vx = "translateY"),
        (Wx = "translateZ"),
        (Hx = "translate3d"),
        (Xx = "scaleX"),
        (Bx = "scaleY"),
        (jx = "scaleZ"),
        (zx = "scale3d"),
        (Kx = "rotateX"),
        (Yx = "rotateY"),
        ($x = "rotateZ"),
        (Qx = "skew"),
        (Zx = "skewX"),
        (Jx = "skewY"),
        (eA = "opacity"),
        (tA = "filter"),
        (rA = "font-variation-settings"),
        (nA = "width"),
        (iA = "height"),
        (oA = "backgroundColor"),
        (aA = "background"),
        (sA = "borderColor"),
        (uA = "color"),
        (cA = "display"),
        (lA = "flex"),
        (fA = "willChange"),
        (dA = "AUTO"),
        (pA = ","),
        (vA = ":"),
        (gA = "|"),
        (hA = "CHILDREN"),
        (yA = "IMMEDIATE_CHILDREN"),
        (mA = "SIBLINGS"),
        (EA = "PARENT"),
        (_A = "preserve-3d"),
        (bA = "HTML_ELEMENT"),
        (TA = "PLAIN_OBJECT"),
        (IA = "ABSTRACT_NODE"),
        (wA = "RENDER_TRANSFORM"),
        (OA = "RENDER_GENERAL"),
        (xA = "RENDER_STYLE"),
        (AA = "RENDER_PLUGIN");
    });
  var Rf = {};
  Ge(Rf, {
    ActionAppliesTo: () => QO,
    ActionTypeConsts: () => Xe,
    EventAppliesTo: () => Bo,
    EventBasedOn: () => ut,
    EventContinuousMouseAxes: () => KO,
    EventLimitAffectedElements: () => YO,
    EventTypeConsts: () => Je,
    IX2EngineActionTypes: () => we,
    IX2EngineConstants: () => Ce,
    InteractionTypeConsts: () => ZO,
    QuickEffectDirectionConsts: () => $O,
    QuickEffectIds: () => jo,
    ReducedMotionTypes: () => Ko,
  });
  var ke = me(() => {
    "use strict";
    wf();
    zo();
    Of();
    xf();
    Af();
    Sf();
  });
  var SA,
    Cf,
    Lf = me(() => {
      "use strict";
      ke();
      ({ IX2_RAW_DATA_IMPORTED: SA } = we),
        (Cf = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case SA:
              return t.payload.ixData || Object.freeze({});
            default:
              return e;
          }
        });
    });
  var Qt = c((be) => {
    "use strict";
    Object.defineProperty(be, "__esModule", { value: !0 });
    var RA =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    be.clone = Sn;
    be.addLast = Mf;
    be.addFirst = qf;
    be.removeLast = Df;
    be.removeFirst = Ff;
    be.insert = Gf;
    be.removeAt = Uf;
    be.replaceAt = kf;
    be.getIn = Rn;
    be.set = Cn;
    be.setIn = Ln;
    be.update = Wf;
    be.updateIn = Hf;
    be.merge = Xf;
    be.mergeDeep = Bf;
    be.mergeIn = jf;
    be.omit = zf;
    be.addDefaults = Kf;
    var Nf = "INVALID_ARGS";
    function Pf(e) {
      throw new Error(e);
    }
    function Yo(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var CA = {}.hasOwnProperty;
    function Sn(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = Yo(e), r = {}, n = 0; n < t.length; n++) {
        var o = t[n];
        r[o] = e[o];
      }
      return r;
    }
    function Ve(e, t, r) {
      var n = r;
      n == null && Pf(Nf);
      for (
        var o = !1, i = arguments.length, a = Array(i > 3 ? i - 3 : 0), s = 3;
        s < i;
        s++
      )
        a[s - 3] = arguments[s];
      for (var u = 0; u < a.length; u++) {
        var d = a[u];
        if (d != null) {
          var g = Yo(d);
          if (g.length)
            for (var v = 0; v <= g.length; v++) {
              var y = g[v];
              if (!(e && n[y] !== void 0)) {
                var m = d[y];
                t && An(n[y]) && An(m) && (m = Ve(e, t, n[y], m)),
                  !(m === void 0 || m === n[y]) &&
                    (o || ((o = !0), (n = Sn(n))), (n[y] = m));
              }
            }
        }
      }
      return n;
    }
    function An(e) {
      var t = typeof e > "u" ? "undefined" : RA(e);
      return e != null && (t === "object" || t === "function");
    }
    function Mf(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function qf(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function Df(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function Ff(e) {
      return e.length ? e.slice(1) : e;
    }
    function Gf(e, t, r) {
      return e
        .slice(0, t)
        .concat(Array.isArray(r) ? r : [r])
        .concat(e.slice(t));
    }
    function Uf(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function kf(e, t, r) {
      if (e[t] === r) return e;
      for (var n = e.length, o = Array(n), i = 0; i < n; i++) o[i] = e[i];
      return (o[t] = r), o;
    }
    function Rn(e, t) {
      if ((!Array.isArray(t) && Pf(Nf), e != null)) {
        for (var r = e, n = 0; n < t.length; n++) {
          var o = t[n];
          if (((r = r?.[o]), r === void 0)) return r;
        }
        return r;
      }
    }
    function Cn(e, t, r) {
      var n = typeof t == "number" ? [] : {},
        o = e ?? n;
      if (o[t] === r) return o;
      var i = Sn(o);
      return (i[t] = r), i;
    }
    function Vf(e, t, r, n) {
      var o = void 0,
        i = t[n];
      if (n === t.length - 1) o = r;
      else {
        var a =
          An(e) && An(e[i]) ? e[i] : typeof t[n + 1] == "number" ? [] : {};
        o = Vf(a, t, r, n + 1);
      }
      return Cn(e, i, o);
    }
    function Ln(e, t, r) {
      return t.length ? Vf(e, t, r, 0) : r;
    }
    function Wf(e, t, r) {
      var n = e?.[t],
        o = r(n);
      return Cn(e, t, o);
    }
    function Hf(e, t, r) {
      var n = Rn(e, t),
        o = r(n);
      return Ln(e, t, o);
    }
    function Xf(e, t, r, n, o, i) {
      for (
        var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), u = 6;
        u < a;
        u++
      )
        s[u - 6] = arguments[u];
      return s.length
        ? Ve.call.apply(Ve, [null, !1, !1, e, t, r, n, o, i].concat(s))
        : Ve(!1, !1, e, t, r, n, o, i);
    }
    function Bf(e, t, r, n, o, i) {
      for (
        var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), u = 6;
        u < a;
        u++
      )
        s[u - 6] = arguments[u];
      return s.length
        ? Ve.call.apply(Ve, [null, !1, !0, e, t, r, n, o, i].concat(s))
        : Ve(!1, !0, e, t, r, n, o, i);
    }
    function jf(e, t, r, n, o, i, a) {
      var s = Rn(e, t);
      s == null && (s = {});
      for (
        var u = void 0,
          d = arguments.length,
          g = Array(d > 7 ? d - 7 : 0),
          v = 7;
        v < d;
        v++
      )
        g[v - 7] = arguments[v];
      return (
        g.length
          ? (u = Ve.call.apply(Ve, [null, !1, !1, s, r, n, o, i, a].concat(g)))
          : (u = Ve(!1, !1, s, r, n, o, i, a)),
        Ln(e, t, u)
      );
    }
    function zf(e, t) {
      for (var r = Array.isArray(t) ? t : [t], n = !1, o = 0; o < r.length; o++)
        if (CA.call(e, r[o])) {
          n = !0;
          break;
        }
      if (!n) return e;
      for (var i = {}, a = Yo(e), s = 0; s < a.length; s++) {
        var u = a[s];
        r.indexOf(u) >= 0 || (i[u] = e[u]);
      }
      return i;
    }
    function Kf(e, t, r, n, o, i) {
      for (
        var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), u = 6;
        u < a;
        u++
      )
        s[u - 6] = arguments[u];
      return s.length
        ? Ve.call.apply(Ve, [null, !0, !1, e, t, r, n, o, i].concat(s))
        : Ve(!0, !1, e, t, r, n, o, i);
    }
    var LA = {
      clone: Sn,
      addLast: Mf,
      addFirst: qf,
      removeLast: Df,
      removeFirst: Ff,
      insert: Gf,
      removeAt: Uf,
      replaceAt: kf,
      getIn: Rn,
      set: Cn,
      setIn: Ln,
      update: Wf,
      updateIn: Hf,
      merge: Xf,
      mergeDeep: Bf,
      mergeIn: jf,
      omit: zf,
      addDefaults: Kf,
    };
    be.default = LA;
  });
  var $f,
    NA,
    PA,
    MA,
    qA,
    DA,
    Yf,
    Qf,
    Zf = me(() => {
      "use strict";
      ke();
      ($f = de(Qt())),
        ({
          IX2_PREVIEW_REQUESTED: NA,
          IX2_PLAYBACK_REQUESTED: PA,
          IX2_STOP_REQUESTED: MA,
          IX2_CLEAR_REQUESTED: qA,
        } = we),
        (DA = { preview: {}, playback: {}, stop: {}, clear: {} }),
        (Yf = Object.create(null, {
          [NA]: { value: "preview" },
          [PA]: { value: "playback" },
          [MA]: { value: "stop" },
          [qA]: { value: "clear" },
        })),
        (Qf = (e = DA, t) => {
          if (t.type in Yf) {
            let r = [Yf[t.type]];
            return (0, $f.setIn)(e, [r], { ...t.payload });
          }
          return e;
        });
    });
  var Pe,
    FA,
    GA,
    UA,
    kA,
    VA,
    WA,
    HA,
    XA,
    BA,
    jA,
    Jf,
    zA,
    ed,
    td = me(() => {
      "use strict";
      ke();
      (Pe = de(Qt())),
        ({
          IX2_SESSION_INITIALIZED: FA,
          IX2_SESSION_STARTED: GA,
          IX2_TEST_FRAME_RENDERED: UA,
          IX2_SESSION_STOPPED: kA,
          IX2_EVENT_LISTENER_ADDED: VA,
          IX2_EVENT_STATE_CHANGED: WA,
          IX2_ANIMATION_FRAME_CHANGED: HA,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: XA,
          IX2_VIEWPORT_WIDTH_CHANGED: BA,
          IX2_MEDIA_QUERIES_DEFINED: jA,
        } = we),
        (Jf = {
          active: !1,
          tick: 0,
          eventListeners: [],
          eventState: {},
          playbackState: {},
          viewportWidth: 0,
          mediaQueryKey: null,
          hasBoundaryNodes: !1,
          hasDefinedMediaQueries: !1,
          reducedMotion: !1,
        }),
        (zA = 20),
        (ed = (e = Jf, t) => {
          switch (t.type) {
            case FA: {
              let { hasBoundaryNodes: r, reducedMotion: n } = t.payload;
              return (0, Pe.merge)(e, {
                hasBoundaryNodes: r,
                reducedMotion: n,
              });
            }
            case GA:
              return (0, Pe.set)(e, "active", !0);
            case UA: {
              let {
                payload: { step: r = zA },
              } = t;
              return (0, Pe.set)(e, "tick", e.tick + r);
            }
            case kA:
              return Jf;
            case HA: {
              let {
                payload: { now: r },
              } = t;
              return (0, Pe.set)(e, "tick", r);
            }
            case VA: {
              let r = (0, Pe.addLast)(e.eventListeners, t.payload);
              return (0, Pe.set)(e, "eventListeners", r);
            }
            case WA: {
              let { stateKey: r, newState: n } = t.payload;
              return (0, Pe.setIn)(e, ["eventState", r], n);
            }
            case XA: {
              let { actionListId: r, isPlaying: n } = t.payload;
              return (0, Pe.setIn)(e, ["playbackState", r], n);
            }
            case BA: {
              let { width: r, mediaQueries: n } = t.payload,
                o = n.length,
                i = null;
              for (let a = 0; a < o; a++) {
                let { key: s, min: u, max: d } = n[a];
                if (r >= u && r <= d) {
                  i = s;
                  break;
                }
              }
              return (0, Pe.merge)(e, { viewportWidth: r, mediaQueryKey: i });
            }
            case jA:
              return (0, Pe.set)(e, "hasDefinedMediaQueries", !0);
            default:
              return e;
          }
        });
    });
  var nd = c((oX, rd) => {
    function KA() {
      (this.__data__ = []), (this.size = 0);
    }
    rd.exports = KA;
  });
  var Nn = c((aX, id) => {
    function YA(e, t) {
      return e === t || (e !== e && t !== t);
    }
    id.exports = YA;
  });
  var Mr = c((sX, od) => {
    var $A = Nn();
    function QA(e, t) {
      for (var r = e.length; r--; ) if ($A(e[r][0], t)) return r;
      return -1;
    }
    od.exports = QA;
  });
  var sd = c((uX, ad) => {
    var ZA = Mr(),
      JA = Array.prototype,
      eS = JA.splice;
    function tS(e) {
      var t = this.__data__,
        r = ZA(t, e);
      if (r < 0) return !1;
      var n = t.length - 1;
      return r == n ? t.pop() : eS.call(t, r, 1), --this.size, !0;
    }
    ad.exports = tS;
  });
  var cd = c((cX, ud) => {
    var rS = Mr();
    function nS(e) {
      var t = this.__data__,
        r = rS(t, e);
      return r < 0 ? void 0 : t[r][1];
    }
    ud.exports = nS;
  });
  var fd = c((lX, ld) => {
    var iS = Mr();
    function oS(e) {
      return iS(this.__data__, e) > -1;
    }
    ld.exports = oS;
  });
  var pd = c((fX, dd) => {
    var aS = Mr();
    function sS(e, t) {
      var r = this.__data__,
        n = aS(r, e);
      return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    dd.exports = sS;
  });
  var qr = c((dX, vd) => {
    var uS = nd(),
      cS = sd(),
      lS = cd(),
      fS = fd(),
      dS = pd();
    function Zt(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    Zt.prototype.clear = uS;
    Zt.prototype.delete = cS;
    Zt.prototype.get = lS;
    Zt.prototype.has = fS;
    Zt.prototype.set = dS;
    vd.exports = Zt;
  });
  var hd = c((pX, gd) => {
    var pS = qr();
    function vS() {
      (this.__data__ = new pS()), (this.size = 0);
    }
    gd.exports = vS;
  });
  var md = c((vX, yd) => {
    function gS(e) {
      var t = this.__data__,
        r = t.delete(e);
      return (this.size = t.size), r;
    }
    yd.exports = gS;
  });
  var _d = c((gX, Ed) => {
    function hS(e) {
      return this.__data__.get(e);
    }
    Ed.exports = hS;
  });
  var Td = c((hX, bd) => {
    function yS(e) {
      return this.__data__.has(e);
    }
    bd.exports = yS;
  });
  var ct = c((yX, Id) => {
    function mS(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    Id.exports = mS;
  });
  var $o = c((mX, wd) => {
    var ES = wt(),
      _S = ct(),
      bS = "[object AsyncFunction]",
      TS = "[object Function]",
      IS = "[object GeneratorFunction]",
      wS = "[object Proxy]";
    function OS(e) {
      if (!_S(e)) return !1;
      var t = ES(e);
      return t == TS || t == IS || t == bS || t == wS;
    }
    wd.exports = OS;
  });
  var xd = c((EX, Od) => {
    var xS = Ze(),
      AS = xS["__core-js_shared__"];
    Od.exports = AS;
  });
  var Rd = c((_X, Sd) => {
    var Qo = xd(),
      Ad = (function () {
        var e = /[^.]+$/.exec((Qo && Qo.keys && Qo.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function SS(e) {
      return !!Ad && Ad in e;
    }
    Sd.exports = SS;
  });
  var Zo = c((bX, Cd) => {
    var RS = Function.prototype,
      CS = RS.toString;
    function LS(e) {
      if (e != null) {
        try {
          return CS.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    Cd.exports = LS;
  });
  var Nd = c((TX, Ld) => {
    var NS = $o(),
      PS = Rd(),
      MS = ct(),
      qS = Zo(),
      DS = /[\\^$.*+?()[\]{}|]/g,
      FS = /^\[object .+?Constructor\]$/,
      GS = Function.prototype,
      US = Object.prototype,
      kS = GS.toString,
      VS = US.hasOwnProperty,
      WS = RegExp(
        "^" +
          kS
            .call(VS)
            .replace(DS, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function HS(e) {
      if (!MS(e) || PS(e)) return !1;
      var t = NS(e) ? WS : FS;
      return t.test(qS(e));
    }
    Ld.exports = HS;
  });
  var Md = c((IX, Pd) => {
    function XS(e, t) {
      return e?.[t];
    }
    Pd.exports = XS;
  });
  var Ot = c((wX, qd) => {
    var BS = Nd(),
      jS = Md();
    function zS(e, t) {
      var r = jS(e, t);
      return BS(r) ? r : void 0;
    }
    qd.exports = zS;
  });
  var Pn = c((OX, Dd) => {
    var KS = Ot(),
      YS = Ze(),
      $S = KS(YS, "Map");
    Dd.exports = $S;
  });
  var Dr = c((xX, Fd) => {
    var QS = Ot(),
      ZS = QS(Object, "create");
    Fd.exports = ZS;
  });
  var kd = c((AX, Ud) => {
    var Gd = Dr();
    function JS() {
      (this.__data__ = Gd ? Gd(null) : {}), (this.size = 0);
    }
    Ud.exports = JS;
  });
  var Wd = c((SX, Vd) => {
    function e0(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    Vd.exports = e0;
  });
  var Xd = c((RX, Hd) => {
    var t0 = Dr(),
      r0 = "__lodash_hash_undefined__",
      n0 = Object.prototype,
      i0 = n0.hasOwnProperty;
    function o0(e) {
      var t = this.__data__;
      if (t0) {
        var r = t[e];
        return r === r0 ? void 0 : r;
      }
      return i0.call(t, e) ? t[e] : void 0;
    }
    Hd.exports = o0;
  });
  var jd = c((CX, Bd) => {
    var a0 = Dr(),
      s0 = Object.prototype,
      u0 = s0.hasOwnProperty;
    function c0(e) {
      var t = this.__data__;
      return a0 ? t[e] !== void 0 : u0.call(t, e);
    }
    Bd.exports = c0;
  });
  var Kd = c((LX, zd) => {
    var l0 = Dr(),
      f0 = "__lodash_hash_undefined__";
    function d0(e, t) {
      var r = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (r[e] = l0 && t === void 0 ? f0 : t),
        this
      );
    }
    zd.exports = d0;
  });
  var $d = c((NX, Yd) => {
    var p0 = kd(),
      v0 = Wd(),
      g0 = Xd(),
      h0 = jd(),
      y0 = Kd();
    function Jt(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    Jt.prototype.clear = p0;
    Jt.prototype.delete = v0;
    Jt.prototype.get = g0;
    Jt.prototype.has = h0;
    Jt.prototype.set = y0;
    Yd.exports = Jt;
  });
  var Jd = c((PX, Zd) => {
    var Qd = $d(),
      m0 = qr(),
      E0 = Pn();
    function _0() {
      (this.size = 0),
        (this.__data__ = {
          hash: new Qd(),
          map: new (E0 || m0)(),
          string: new Qd(),
        });
    }
    Zd.exports = _0;
  });
  var tp = c((MX, ep) => {
    function b0(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    ep.exports = b0;
  });
  var Fr = c((qX, rp) => {
    var T0 = tp();
    function I0(e, t) {
      var r = e.__data__;
      return T0(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    rp.exports = I0;
  });
  var ip = c((DX, np) => {
    var w0 = Fr();
    function O0(e) {
      var t = w0(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    np.exports = O0;
  });
  var ap = c((FX, op) => {
    var x0 = Fr();
    function A0(e) {
      return x0(this, e).get(e);
    }
    op.exports = A0;
  });
  var up = c((GX, sp) => {
    var S0 = Fr();
    function R0(e) {
      return S0(this, e).has(e);
    }
    sp.exports = R0;
  });
  var lp = c((UX, cp) => {
    var C0 = Fr();
    function L0(e, t) {
      var r = C0(this, e),
        n = r.size;
      return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    cp.exports = L0;
  });
  var Mn = c((kX, fp) => {
    var N0 = Jd(),
      P0 = ip(),
      M0 = ap(),
      q0 = up(),
      D0 = lp();
    function er(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    er.prototype.clear = N0;
    er.prototype.delete = P0;
    er.prototype.get = M0;
    er.prototype.has = q0;
    er.prototype.set = D0;
    fp.exports = er;
  });
  var pp = c((VX, dp) => {
    var F0 = qr(),
      G0 = Pn(),
      U0 = Mn(),
      k0 = 200;
    function V0(e, t) {
      var r = this.__data__;
      if (r instanceof F0) {
        var n = r.__data__;
        if (!G0 || n.length < k0 - 1)
          return n.push([e, t]), (this.size = ++r.size), this;
        r = this.__data__ = new U0(n);
      }
      return r.set(e, t), (this.size = r.size), this;
    }
    dp.exports = V0;
  });
  var Jo = c((WX, vp) => {
    var W0 = qr(),
      H0 = hd(),
      X0 = md(),
      B0 = _d(),
      j0 = Td(),
      z0 = pp();
    function tr(e) {
      var t = (this.__data__ = new W0(e));
      this.size = t.size;
    }
    tr.prototype.clear = H0;
    tr.prototype.delete = X0;
    tr.prototype.get = B0;
    tr.prototype.has = j0;
    tr.prototype.set = z0;
    vp.exports = tr;
  });
  var hp = c((HX, gp) => {
    var K0 = "__lodash_hash_undefined__";
    function Y0(e) {
      return this.__data__.set(e, K0), this;
    }
    gp.exports = Y0;
  });
  var mp = c((XX, yp) => {
    function $0(e) {
      return this.__data__.has(e);
    }
    yp.exports = $0;
  });
  var _p = c((BX, Ep) => {
    var Q0 = Mn(),
      Z0 = hp(),
      J0 = mp();
    function qn(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.__data__ = new Q0(); ++t < r; ) this.add(e[t]);
    }
    qn.prototype.add = qn.prototype.push = Z0;
    qn.prototype.has = J0;
    Ep.exports = qn;
  });
  var Tp = c((jX, bp) => {
    function eR(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
        if (t(e[r], r, e)) return !0;
      return !1;
    }
    bp.exports = eR;
  });
  var wp = c((zX, Ip) => {
    function tR(e, t) {
      return e.has(t);
    }
    Ip.exports = tR;
  });
  var ea = c((KX, Op) => {
    var rR = _p(),
      nR = Tp(),
      iR = wp(),
      oR = 1,
      aR = 2;
    function sR(e, t, r, n, o, i) {
      var a = r & oR,
        s = e.length,
        u = t.length;
      if (s != u && !(a && u > s)) return !1;
      var d = i.get(e),
        g = i.get(t);
      if (d && g) return d == t && g == e;
      var v = -1,
        y = !0,
        m = r & aR ? new rR() : void 0;
      for (i.set(e, t), i.set(t, e); ++v < s; ) {
        var T = e[v],
          I = t[v];
        if (n) var D = a ? n(I, T, v, t, e, i) : n(T, I, v, e, t, i);
        if (D !== void 0) {
          if (D) continue;
          y = !1;
          break;
        }
        if (m) {
          if (
            !nR(t, function (S, L) {
              if (!iR(m, L) && (T === S || o(T, S, r, n, i))) return m.push(L);
            })
          ) {
            y = !1;
            break;
          }
        } else if (!(T === I || o(T, I, r, n, i))) {
          y = !1;
          break;
        }
      }
      return i.delete(e), i.delete(t), y;
    }
    Op.exports = sR;
  });
  var Ap = c((YX, xp) => {
    var uR = Ze(),
      cR = uR.Uint8Array;
    xp.exports = cR;
  });
  var Rp = c(($X, Sp) => {
    function lR(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n, o) {
          r[++t] = [o, n];
        }),
        r
      );
    }
    Sp.exports = lR;
  });
  var Lp = c((QX, Cp) => {
    function fR(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n) {
          r[++t] = n;
        }),
        r
      );
    }
    Cp.exports = fR;
  });
  var Dp = c((ZX, qp) => {
    var Np = Kt(),
      Pp = Ap(),
      dR = Nn(),
      pR = ea(),
      vR = Rp(),
      gR = Lp(),
      hR = 1,
      yR = 2,
      mR = "[object Boolean]",
      ER = "[object Date]",
      _R = "[object Error]",
      bR = "[object Map]",
      TR = "[object Number]",
      IR = "[object RegExp]",
      wR = "[object Set]",
      OR = "[object String]",
      xR = "[object Symbol]",
      AR = "[object ArrayBuffer]",
      SR = "[object DataView]",
      Mp = Np ? Np.prototype : void 0,
      ta = Mp ? Mp.valueOf : void 0;
    function RR(e, t, r, n, o, i, a) {
      switch (r) {
        case SR:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          (e = e.buffer), (t = t.buffer);
        case AR:
          return !(e.byteLength != t.byteLength || !i(new Pp(e), new Pp(t)));
        case mR:
        case ER:
        case TR:
          return dR(+e, +t);
        case _R:
          return e.name == t.name && e.message == t.message;
        case IR:
        case OR:
          return e == t + "";
        case bR:
          var s = vR;
        case wR:
          var u = n & hR;
          if ((s || (s = gR), e.size != t.size && !u)) return !1;
          var d = a.get(e);
          if (d) return d == t;
          (n |= yR), a.set(e, t);
          var g = pR(s(e), s(t), n, o, i, a);
          return a.delete(e), g;
        case xR:
          if (ta) return ta.call(e) == ta.call(t);
      }
      return !1;
    }
    qp.exports = RR;
  });
  var Dn = c((JX, Fp) => {
    function CR(e, t) {
      for (var r = -1, n = t.length, o = e.length; ++r < n; ) e[o + r] = t[r];
      return e;
    }
    Fp.exports = CR;
  });
  var xe = c((e5, Gp) => {
    var LR = Array.isArray;
    Gp.exports = LR;
  });
  var ra = c((t5, Up) => {
    var NR = Dn(),
      PR = xe();
    function MR(e, t, r) {
      var n = t(e);
      return PR(e) ? n : NR(n, r(e));
    }
    Up.exports = MR;
  });
  var Vp = c((r5, kp) => {
    function qR(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, o = 0, i = []; ++r < n; ) {
        var a = e[r];
        t(a, r, e) && (i[o++] = a);
      }
      return i;
    }
    kp.exports = qR;
  });
  var na = c((n5, Wp) => {
    function DR() {
      return [];
    }
    Wp.exports = DR;
  });
  var ia = c((i5, Xp) => {
    var FR = Vp(),
      GR = na(),
      UR = Object.prototype,
      kR = UR.propertyIsEnumerable,
      Hp = Object.getOwnPropertySymbols,
      VR = Hp
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                FR(Hp(e), function (t) {
                  return kR.call(e, t);
                }));
          }
        : GR;
    Xp.exports = VR;
  });
  var jp = c((o5, Bp) => {
    function WR(e, t) {
      for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
      return n;
    }
    Bp.exports = WR;
  });
  var Kp = c((a5, zp) => {
    var HR = wt(),
      XR = gt(),
      BR = "[object Arguments]";
    function jR(e) {
      return XR(e) && HR(e) == BR;
    }
    zp.exports = jR;
  });
  var Gr = c((s5, Qp) => {
    var Yp = Kp(),
      zR = gt(),
      $p = Object.prototype,
      KR = $p.hasOwnProperty,
      YR = $p.propertyIsEnumerable,
      $R = Yp(
        (function () {
          return arguments;
        })()
      )
        ? Yp
        : function (e) {
            return zR(e) && KR.call(e, "callee") && !YR.call(e, "callee");
          };
    Qp.exports = $R;
  });
  var Jp = c((u5, Zp) => {
    function QR() {
      return !1;
    }
    Zp.exports = QR;
  });
  var Fn = c((Ur, rr) => {
    var ZR = Ze(),
      JR = Jp(),
      rv = typeof Ur == "object" && Ur && !Ur.nodeType && Ur,
      ev = rv && typeof rr == "object" && rr && !rr.nodeType && rr,
      eC = ev && ev.exports === rv,
      tv = eC ? ZR.Buffer : void 0,
      tC = tv ? tv.isBuffer : void 0,
      rC = tC || JR;
    rr.exports = rC;
  });
  var Gn = c((c5, nv) => {
    var nC = 9007199254740991,
      iC = /^(?:0|[1-9]\d*)$/;
    function oC(e, t) {
      var r = typeof e;
      return (
        (t = t ?? nC),
        !!t &&
          (r == "number" || (r != "symbol" && iC.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    nv.exports = oC;
  });
  var Un = c((l5, iv) => {
    var aC = 9007199254740991;
    function sC(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= aC;
    }
    iv.exports = sC;
  });
  var av = c((f5, ov) => {
    var uC = wt(),
      cC = Un(),
      lC = gt(),
      fC = "[object Arguments]",
      dC = "[object Array]",
      pC = "[object Boolean]",
      vC = "[object Date]",
      gC = "[object Error]",
      hC = "[object Function]",
      yC = "[object Map]",
      mC = "[object Number]",
      EC = "[object Object]",
      _C = "[object RegExp]",
      bC = "[object Set]",
      TC = "[object String]",
      IC = "[object WeakMap]",
      wC = "[object ArrayBuffer]",
      OC = "[object DataView]",
      xC = "[object Float32Array]",
      AC = "[object Float64Array]",
      SC = "[object Int8Array]",
      RC = "[object Int16Array]",
      CC = "[object Int32Array]",
      LC = "[object Uint8Array]",
      NC = "[object Uint8ClampedArray]",
      PC = "[object Uint16Array]",
      MC = "[object Uint32Array]",
      ye = {};
    ye[xC] =
      ye[AC] =
      ye[SC] =
      ye[RC] =
      ye[CC] =
      ye[LC] =
      ye[NC] =
      ye[PC] =
      ye[MC] =
        !0;
    ye[fC] =
      ye[dC] =
      ye[wC] =
      ye[pC] =
      ye[OC] =
      ye[vC] =
      ye[gC] =
      ye[hC] =
      ye[yC] =
      ye[mC] =
      ye[EC] =
      ye[_C] =
      ye[bC] =
      ye[TC] =
      ye[IC] =
        !1;
    function qC(e) {
      return lC(e) && cC(e.length) && !!ye[uC(e)];
    }
    ov.exports = qC;
  });
  var uv = c((d5, sv) => {
    function DC(e) {
      return function (t) {
        return e(t);
      };
    }
    sv.exports = DC;
  });
  var lv = c((kr, nr) => {
    var FC = Ro(),
      cv = typeof kr == "object" && kr && !kr.nodeType && kr,
      Vr = cv && typeof nr == "object" && nr && !nr.nodeType && nr,
      GC = Vr && Vr.exports === cv,
      oa = GC && FC.process,
      UC = (function () {
        try {
          var e = Vr && Vr.require && Vr.require("util").types;
          return e || (oa && oa.binding && oa.binding("util"));
        } catch {}
      })();
    nr.exports = UC;
  });
  var kn = c((p5, pv) => {
    var kC = av(),
      VC = uv(),
      fv = lv(),
      dv = fv && fv.isTypedArray,
      WC = dv ? VC(dv) : kC;
    pv.exports = WC;
  });
  var aa = c((v5, vv) => {
    var HC = jp(),
      XC = Gr(),
      BC = xe(),
      jC = Fn(),
      zC = Gn(),
      KC = kn(),
      YC = Object.prototype,
      $C = YC.hasOwnProperty;
    function QC(e, t) {
      var r = BC(e),
        n = !r && XC(e),
        o = !r && !n && jC(e),
        i = !r && !n && !o && KC(e),
        a = r || n || o || i,
        s = a ? HC(e.length, String) : [],
        u = s.length;
      for (var d in e)
        (t || $C.call(e, d)) &&
          !(
            a &&
            (d == "length" ||
              (o && (d == "offset" || d == "parent")) ||
              (i &&
                (d == "buffer" || d == "byteLength" || d == "byteOffset")) ||
              zC(d, u))
          ) &&
          s.push(d);
      return s;
    }
    vv.exports = QC;
  });
  var Vn = c((g5, gv) => {
    var ZC = Object.prototype;
    function JC(e) {
      var t = e && e.constructor,
        r = (typeof t == "function" && t.prototype) || ZC;
      return e === r;
    }
    gv.exports = JC;
  });
  var yv = c((h5, hv) => {
    var eL = Co(),
      tL = eL(Object.keys, Object);
    hv.exports = tL;
  });
  var Wn = c((y5, mv) => {
    var rL = Vn(),
      nL = yv(),
      iL = Object.prototype,
      oL = iL.hasOwnProperty;
    function aL(e) {
      if (!rL(e)) return nL(e);
      var t = [];
      for (var r in Object(e)) oL.call(e, r) && r != "constructor" && t.push(r);
      return t;
    }
    mv.exports = aL;
  });
  var qt = c((m5, Ev) => {
    var sL = $o(),
      uL = Un();
    function cL(e) {
      return e != null && uL(e.length) && !sL(e);
    }
    Ev.exports = cL;
  });
  var Wr = c((E5, _v) => {
    var lL = aa(),
      fL = Wn(),
      dL = qt();
    function pL(e) {
      return dL(e) ? lL(e) : fL(e);
    }
    _v.exports = pL;
  });
  var Tv = c((_5, bv) => {
    var vL = ra(),
      gL = ia(),
      hL = Wr();
    function yL(e) {
      return vL(e, hL, gL);
    }
    bv.exports = yL;
  });
  var Ov = c((b5, wv) => {
    var Iv = Tv(),
      mL = 1,
      EL = Object.prototype,
      _L = EL.hasOwnProperty;
    function bL(e, t, r, n, o, i) {
      var a = r & mL,
        s = Iv(e),
        u = s.length,
        d = Iv(t),
        g = d.length;
      if (u != g && !a) return !1;
      for (var v = u; v--; ) {
        var y = s[v];
        if (!(a ? y in t : _L.call(t, y))) return !1;
      }
      var m = i.get(e),
        T = i.get(t);
      if (m && T) return m == t && T == e;
      var I = !0;
      i.set(e, t), i.set(t, e);
      for (var D = a; ++v < u; ) {
        y = s[v];
        var S = e[y],
          L = t[y];
        if (n) var C = a ? n(L, S, y, t, e, i) : n(S, L, y, e, t, i);
        if (!(C === void 0 ? S === L || o(S, L, r, n, i) : C)) {
          I = !1;
          break;
        }
        D || (D = y == "constructor");
      }
      if (I && !D) {
        var P = e.constructor,
          q = t.constructor;
        P != q &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof P == "function" &&
            P instanceof P &&
            typeof q == "function" &&
            q instanceof q
          ) &&
          (I = !1);
      }
      return i.delete(e), i.delete(t), I;
    }
    wv.exports = bL;
  });
  var Av = c((T5, xv) => {
    var TL = Ot(),
      IL = Ze(),
      wL = TL(IL, "DataView");
    xv.exports = wL;
  });
  var Rv = c((I5, Sv) => {
    var OL = Ot(),
      xL = Ze(),
      AL = OL(xL, "Promise");
    Sv.exports = AL;
  });
  var Lv = c((w5, Cv) => {
    var SL = Ot(),
      RL = Ze(),
      CL = SL(RL, "Set");
    Cv.exports = CL;
  });
  var sa = c((O5, Nv) => {
    var LL = Ot(),
      NL = Ze(),
      PL = LL(NL, "WeakMap");
    Nv.exports = PL;
  });
  var Hn = c((x5, Uv) => {
    var ua = Av(),
      ca = Pn(),
      la = Rv(),
      fa = Lv(),
      da = sa(),
      Gv = wt(),
      ir = Zo(),
      Pv = "[object Map]",
      ML = "[object Object]",
      Mv = "[object Promise]",
      qv = "[object Set]",
      Dv = "[object WeakMap]",
      Fv = "[object DataView]",
      qL = ir(ua),
      DL = ir(ca),
      FL = ir(la),
      GL = ir(fa),
      UL = ir(da),
      Dt = Gv;
    ((ua && Dt(new ua(new ArrayBuffer(1))) != Fv) ||
      (ca && Dt(new ca()) != Pv) ||
      (la && Dt(la.resolve()) != Mv) ||
      (fa && Dt(new fa()) != qv) ||
      (da && Dt(new da()) != Dv)) &&
      (Dt = function (e) {
        var t = Gv(e),
          r = t == ML ? e.constructor : void 0,
          n = r ? ir(r) : "";
        if (n)
          switch (n) {
            case qL:
              return Fv;
            case DL:
              return Pv;
            case FL:
              return Mv;
            case GL:
              return qv;
            case UL:
              return Dv;
          }
        return t;
      });
    Uv.exports = Dt;
  });
  var zv = c((A5, jv) => {
    var pa = Jo(),
      kL = ea(),
      VL = Dp(),
      WL = Ov(),
      kv = Hn(),
      Vv = xe(),
      Wv = Fn(),
      HL = kn(),
      XL = 1,
      Hv = "[object Arguments]",
      Xv = "[object Array]",
      Xn = "[object Object]",
      BL = Object.prototype,
      Bv = BL.hasOwnProperty;
    function jL(e, t, r, n, o, i) {
      var a = Vv(e),
        s = Vv(t),
        u = a ? Xv : kv(e),
        d = s ? Xv : kv(t);
      (u = u == Hv ? Xn : u), (d = d == Hv ? Xn : d);
      var g = u == Xn,
        v = d == Xn,
        y = u == d;
      if (y && Wv(e)) {
        if (!Wv(t)) return !1;
        (a = !0), (g = !1);
      }
      if (y && !g)
        return (
          i || (i = new pa()),
          a || HL(e) ? kL(e, t, r, n, o, i) : VL(e, t, u, r, n, o, i)
        );
      if (!(r & XL)) {
        var m = g && Bv.call(e, "__wrapped__"),
          T = v && Bv.call(t, "__wrapped__");
        if (m || T) {
          var I = m ? e.value() : e,
            D = T ? t.value() : t;
          return i || (i = new pa()), o(I, D, r, n, i);
        }
      }
      return y ? (i || (i = new pa()), WL(e, t, r, n, o, i)) : !1;
    }
    jv.exports = jL;
  });
  var va = c((S5, $v) => {
    var zL = zv(),
      Kv = gt();
    function Yv(e, t, r, n, o) {
      return e === t
        ? !0
        : e == null || t == null || (!Kv(e) && !Kv(t))
        ? e !== e && t !== t
        : zL(e, t, r, n, Yv, o);
    }
    $v.exports = Yv;
  });
  var Zv = c((R5, Qv) => {
    var KL = Jo(),
      YL = va(),
      $L = 1,
      QL = 2;
    function ZL(e, t, r, n) {
      var o = r.length,
        i = o,
        a = !n;
      if (e == null) return !i;
      for (e = Object(e); o--; ) {
        var s = r[o];
        if (a && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1;
      }
      for (; ++o < i; ) {
        s = r[o];
        var u = s[0],
          d = e[u],
          g = s[1];
        if (a && s[2]) {
          if (d === void 0 && !(u in e)) return !1;
        } else {
          var v = new KL();
          if (n) var y = n(d, g, u, e, t, v);
          if (!(y === void 0 ? YL(g, d, $L | QL, n, v) : y)) return !1;
        }
      }
      return !0;
    }
    Qv.exports = ZL;
  });
  var ga = c((C5, Jv) => {
    var JL = ct();
    function eN(e) {
      return e === e && !JL(e);
    }
    Jv.exports = eN;
  });
  var tg = c((L5, eg) => {
    var tN = ga(),
      rN = Wr();
    function nN(e) {
      for (var t = rN(e), r = t.length; r--; ) {
        var n = t[r],
          o = e[n];
        t[r] = [n, o, tN(o)];
      }
      return t;
    }
    eg.exports = nN;
  });
  var ha = c((N5, rg) => {
    function iN(e, t) {
      return function (r) {
        return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
      };
    }
    rg.exports = iN;
  });
  var ig = c((P5, ng) => {
    var oN = Zv(),
      aN = tg(),
      sN = ha();
    function uN(e) {
      var t = aN(e);
      return t.length == 1 && t[0][2]
        ? sN(t[0][0], t[0][1])
        : function (r) {
            return r === e || oN(r, e, t);
          };
    }
    ng.exports = uN;
  });
  var Hr = c((M5, og) => {
    var cN = wt(),
      lN = gt(),
      fN = "[object Symbol]";
    function dN(e) {
      return typeof e == "symbol" || (lN(e) && cN(e) == fN);
    }
    og.exports = dN;
  });
  var Bn = c((q5, ag) => {
    var pN = xe(),
      vN = Hr(),
      gN = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      hN = /^\w*$/;
    function yN(e, t) {
      if (pN(e)) return !1;
      var r = typeof e;
      return r == "number" ||
        r == "symbol" ||
        r == "boolean" ||
        e == null ||
        vN(e)
        ? !0
        : hN.test(e) || !gN.test(e) || (t != null && e in Object(t));
    }
    ag.exports = yN;
  });
  var cg = c((D5, ug) => {
    var sg = Mn(),
      mN = "Expected a function";
    function ya(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(mN);
      var r = function () {
        var n = arguments,
          o = t ? t.apply(this, n) : n[0],
          i = r.cache;
        if (i.has(o)) return i.get(o);
        var a = e.apply(this, n);
        return (r.cache = i.set(o, a) || i), a;
      };
      return (r.cache = new (ya.Cache || sg)()), r;
    }
    ya.Cache = sg;
    ug.exports = ya;
  });
  var fg = c((F5, lg) => {
    var EN = cg(),
      _N = 500;
    function bN(e) {
      var t = EN(e, function (n) {
          return r.size === _N && r.clear(), n;
        }),
        r = t.cache;
      return t;
    }
    lg.exports = bN;
  });
  var pg = c((G5, dg) => {
    var TN = fg(),
      IN =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      wN = /\\(\\)?/g,
      ON = TN(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(IN, function (r, n, o, i) {
            t.push(o ? i.replace(wN, "$1") : n || r);
          }),
          t
        );
      });
    dg.exports = ON;
  });
  var ma = c((U5, vg) => {
    function xN(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
        o[r] = t(e[r], r, e);
      return o;
    }
    vg.exports = xN;
  });
  var _g = c((k5, Eg) => {
    var gg = Kt(),
      AN = ma(),
      SN = xe(),
      RN = Hr(),
      CN = 1 / 0,
      hg = gg ? gg.prototype : void 0,
      yg = hg ? hg.toString : void 0;
    function mg(e) {
      if (typeof e == "string") return e;
      if (SN(e)) return AN(e, mg) + "";
      if (RN(e)) return yg ? yg.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -CN ? "-0" : t;
    }
    Eg.exports = mg;
  });
  var Tg = c((V5, bg) => {
    var LN = _g();
    function NN(e) {
      return e == null ? "" : LN(e);
    }
    bg.exports = NN;
  });
  var Xr = c((W5, Ig) => {
    var PN = xe(),
      MN = Bn(),
      qN = pg(),
      DN = Tg();
    function FN(e, t) {
      return PN(e) ? e : MN(e, t) ? [e] : qN(DN(e));
    }
    Ig.exports = FN;
  });
  var or = c((H5, wg) => {
    var GN = Hr(),
      UN = 1 / 0;
    function kN(e) {
      if (typeof e == "string" || GN(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -UN ? "-0" : t;
    }
    wg.exports = kN;
  });
  var jn = c((X5, Og) => {
    var VN = Xr(),
      WN = or();
    function HN(e, t) {
      t = VN(t, e);
      for (var r = 0, n = t.length; e != null && r < n; ) e = e[WN(t[r++])];
      return r && r == n ? e : void 0;
    }
    Og.exports = HN;
  });
  var zn = c((B5, xg) => {
    var XN = jn();
    function BN(e, t, r) {
      var n = e == null ? void 0 : XN(e, t);
      return n === void 0 ? r : n;
    }
    xg.exports = BN;
  });
  var Sg = c((j5, Ag) => {
    function jN(e, t) {
      return e != null && t in Object(e);
    }
    Ag.exports = jN;
  });
  var Cg = c((z5, Rg) => {
    var zN = Xr(),
      KN = Gr(),
      YN = xe(),
      $N = Gn(),
      QN = Un(),
      ZN = or();
    function JN(e, t, r) {
      t = zN(t, e);
      for (var n = -1, o = t.length, i = !1; ++n < o; ) {
        var a = ZN(t[n]);
        if (!(i = e != null && r(e, a))) break;
        e = e[a];
      }
      return i || ++n != o
        ? i
        : ((o = e == null ? 0 : e.length),
          !!o && QN(o) && $N(a, o) && (YN(e) || KN(e)));
    }
    Rg.exports = JN;
  });
  var Ng = c((K5, Lg) => {
    var eP = Sg(),
      tP = Cg();
    function rP(e, t) {
      return e != null && tP(e, t, eP);
    }
    Lg.exports = rP;
  });
  var Mg = c((Y5, Pg) => {
    var nP = va(),
      iP = zn(),
      oP = Ng(),
      aP = Bn(),
      sP = ga(),
      uP = ha(),
      cP = or(),
      lP = 1,
      fP = 2;
    function dP(e, t) {
      return aP(e) && sP(t)
        ? uP(cP(e), t)
        : function (r) {
            var n = iP(r, e);
            return n === void 0 && n === t ? oP(r, e) : nP(t, n, lP | fP);
          };
    }
    Pg.exports = dP;
  });
  var Kn = c(($5, qg) => {
    function pP(e) {
      return e;
    }
    qg.exports = pP;
  });
  var Ea = c((Q5, Dg) => {
    function vP(e) {
      return function (t) {
        return t?.[e];
      };
    }
    Dg.exports = vP;
  });
  var Gg = c((Z5, Fg) => {
    var gP = jn();
    function hP(e) {
      return function (t) {
        return gP(t, e);
      };
    }
    Fg.exports = hP;
  });
  var kg = c((J5, Ug) => {
    var yP = Ea(),
      mP = Gg(),
      EP = Bn(),
      _P = or();
    function bP(e) {
      return EP(e) ? yP(_P(e)) : mP(e);
    }
    Ug.exports = bP;
  });
  var xt = c((eB, Vg) => {
    var TP = ig(),
      IP = Mg(),
      wP = Kn(),
      OP = xe(),
      xP = kg();
    function AP(e) {
      return typeof e == "function"
        ? e
        : e == null
        ? wP
        : typeof e == "object"
        ? OP(e)
          ? IP(e[0], e[1])
          : TP(e)
        : xP(e);
    }
    Vg.exports = AP;
  });
  var _a = c((tB, Wg) => {
    var SP = xt(),
      RP = qt(),
      CP = Wr();
    function LP(e) {
      return function (t, r, n) {
        var o = Object(t);
        if (!RP(t)) {
          var i = SP(r, 3);
          (t = CP(t)),
            (r = function (s) {
              return i(o[s], s, o);
            });
        }
        var a = e(t, r, n);
        return a > -1 ? o[i ? t[a] : a] : void 0;
      };
    }
    Wg.exports = LP;
  });
  var ba = c((rB, Hg) => {
    function NP(e, t, r, n) {
      for (var o = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
        if (t(e[i], i, e)) return i;
      return -1;
    }
    Hg.exports = NP;
  });
  var Bg = c((nB, Xg) => {
    var PP = /\s/;
    function MP(e) {
      for (var t = e.length; t-- && PP.test(e.charAt(t)); );
      return t;
    }
    Xg.exports = MP;
  });
  var zg = c((iB, jg) => {
    var qP = Bg(),
      DP = /^\s+/;
    function FP(e) {
      return e && e.slice(0, qP(e) + 1).replace(DP, "");
    }
    jg.exports = FP;
  });
  var Yn = c((oB, $g) => {
    var GP = zg(),
      Kg = ct(),
      UP = Hr(),
      Yg = 0 / 0,
      kP = /^[-+]0x[0-9a-f]+$/i,
      VP = /^0b[01]+$/i,
      WP = /^0o[0-7]+$/i,
      HP = parseInt;
    function XP(e) {
      if (typeof e == "number") return e;
      if (UP(e)) return Yg;
      if (Kg(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = Kg(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = GP(e);
      var r = VP.test(e);
      return r || WP.test(e) ? HP(e.slice(2), r ? 2 : 8) : kP.test(e) ? Yg : +e;
    }
    $g.exports = XP;
  });
  var Jg = c((aB, Zg) => {
    var BP = Yn(),
      Qg = 1 / 0,
      jP = 17976931348623157e292;
    function zP(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = BP(e)), e === Qg || e === -Qg)) {
        var t = e < 0 ? -1 : 1;
        return t * jP;
      }
      return e === e ? e : 0;
    }
    Zg.exports = zP;
  });
  var Ta = c((sB, eh) => {
    var KP = Jg();
    function YP(e) {
      var t = KP(e),
        r = t % 1;
      return t === t ? (r ? t - r : t) : 0;
    }
    eh.exports = YP;
  });
  var rh = c((uB, th) => {
    var $P = ba(),
      QP = xt(),
      ZP = Ta(),
      JP = Math.max;
    function eM(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var o = r == null ? 0 : ZP(r);
      return o < 0 && (o = JP(n + o, 0)), $P(e, QP(t, 3), o);
    }
    th.exports = eM;
  });
  var Ia = c((cB, nh) => {
    var tM = _a(),
      rM = rh(),
      nM = tM(rM);
    nh.exports = nM;
  });
  var ah = {};
  Ge(ah, {
    ELEMENT_MATCHES: () => iM,
    FLEX_PREFIXED: () => wa,
    IS_BROWSER_ENV: () => et,
    TRANSFORM_PREFIXED: () => At,
    TRANSFORM_STYLE_PREFIXED: () => Qn,
    withBrowser: () => $n,
  });
  var oh,
    et,
    $n,
    iM,
    wa,
    At,
    ih,
    Qn,
    Zn = me(() => {
      "use strict";
      (oh = de(Ia())),
        (et = typeof window < "u"),
        ($n = (e, t) => (et ? e() : t)),
        (iM = $n(() =>
          (0, oh.default)(
            [
              "matches",
              "matchesSelector",
              "mozMatchesSelector",
              "msMatchesSelector",
              "oMatchesSelector",
              "webkitMatchesSelector",
            ],
            (e) => e in Element.prototype
          )
        )),
        (wa = $n(() => {
          let e = document.createElement("i"),
            t = [
              "flex",
              "-webkit-flex",
              "-ms-flexbox",
              "-moz-box",
              "-webkit-box",
            ],
            r = "";
          try {
            let { length: n } = t;
            for (let o = 0; o < n; o++) {
              let i = t[o];
              if (((e.style.display = i), e.style.display === i)) return i;
            }
            return r;
          } catch {
            return r;
          }
        }, "flex")),
        (At = $n(() => {
          let e = document.createElement("i");
          if (e.style.transform == null) {
            let t = ["Webkit", "Moz", "ms"],
              r = "Transform",
              { length: n } = t;
            for (let o = 0; o < n; o++) {
              let i = t[o] + r;
              if (e.style[i] !== void 0) return i;
            }
          }
          return "transform";
        }, "transform")),
        (ih = At.split("transform")[0]),
        (Qn = ih ? ih + "TransformStyle" : "transformStyle");
    });
  var Oa = c((lB, fh) => {
    var oM = 4,
      aM = 0.001,
      sM = 1e-7,
      uM = 10,
      Br = 11,
      Jn = 1 / (Br - 1),
      cM = typeof Float32Array == "function";
    function sh(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function uh(e, t) {
      return 3 * t - 6 * e;
    }
    function ch(e) {
      return 3 * e;
    }
    function ei(e, t, r) {
      return ((sh(t, r) * e + uh(t, r)) * e + ch(t)) * e;
    }
    function lh(e, t, r) {
      return 3 * sh(t, r) * e * e + 2 * uh(t, r) * e + ch(t);
    }
    function lM(e, t, r, n, o) {
      var i,
        a,
        s = 0;
      do
        (a = t + (r - t) / 2), (i = ei(a, n, o) - e), i > 0 ? (r = a) : (t = a);
      while (Math.abs(i) > sM && ++s < uM);
      return a;
    }
    function fM(e, t, r, n) {
      for (var o = 0; o < oM; ++o) {
        var i = lh(t, r, n);
        if (i === 0) return t;
        var a = ei(t, r, n) - e;
        t -= a / i;
      }
      return t;
    }
    fh.exports = function (t, r, n, o) {
      if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var i = cM ? new Float32Array(Br) : new Array(Br);
      if (t !== r || n !== o)
        for (var a = 0; a < Br; ++a) i[a] = ei(a * Jn, t, n);
      function s(u) {
        for (var d = 0, g = 1, v = Br - 1; g !== v && i[g] <= u; ++g) d += Jn;
        --g;
        var y = (u - i[g]) / (i[g + 1] - i[g]),
          m = d + y * Jn,
          T = lh(m, t, n);
        return T >= aM ? fM(u, m, t, n) : T === 0 ? m : lM(u, d, d + Jn, t, n);
      }
      return function (d) {
        return t === r && n === o
          ? d
          : d === 0
          ? 0
          : d === 1
          ? 1
          : ei(s(d), r, o);
      };
    };
  });
  var zr = {};
  Ge(zr, {
    bounce: () => zM,
    bouncePast: () => KM,
    ease: () => dM,
    easeIn: () => pM,
    easeInOut: () => gM,
    easeOut: () => vM,
    inBack: () => GM,
    inCirc: () => MM,
    inCubic: () => EM,
    inElastic: () => VM,
    inExpo: () => LM,
    inOutBack: () => kM,
    inOutCirc: () => DM,
    inOutCubic: () => bM,
    inOutElastic: () => HM,
    inOutExpo: () => PM,
    inOutQuad: () => mM,
    inOutQuart: () => wM,
    inOutQuint: () => AM,
    inOutSine: () => CM,
    inQuad: () => hM,
    inQuart: () => TM,
    inQuint: () => OM,
    inSine: () => SM,
    outBack: () => UM,
    outBounce: () => FM,
    outCirc: () => qM,
    outCubic: () => _M,
    outElastic: () => WM,
    outExpo: () => NM,
    outQuad: () => yM,
    outQuart: () => IM,
    outQuint: () => xM,
    outSine: () => RM,
    swingFrom: () => BM,
    swingFromTo: () => XM,
    swingTo: () => jM,
  });
  function hM(e) {
    return Math.pow(e, 2);
  }
  function yM(e) {
    return -(Math.pow(e - 1, 2) - 1);
  }
  function mM(e) {
    return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
  }
  function EM(e) {
    return Math.pow(e, 3);
  }
  function _M(e) {
    return Math.pow(e - 1, 3) + 1;
  }
  function bM(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 3)
      : 0.5 * (Math.pow(e - 2, 3) + 2);
  }
  function TM(e) {
    return Math.pow(e, 4);
  }
  function IM(e) {
    return -(Math.pow(e - 1, 4) - 1);
  }
  function wM(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 4)
      : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
  }
  function OM(e) {
    return Math.pow(e, 5);
  }
  function xM(e) {
    return Math.pow(e - 1, 5) + 1;
  }
  function AM(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 5)
      : 0.5 * (Math.pow(e - 2, 5) + 2);
  }
  function SM(e) {
    return -Math.cos(e * (Math.PI / 2)) + 1;
  }
  function RM(e) {
    return Math.sin(e * (Math.PI / 2));
  }
  function CM(e) {
    return -0.5 * (Math.cos(Math.PI * e) - 1);
  }
  function LM(e) {
    return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
  }
  function NM(e) {
    return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
  }
  function PM(e) {
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (e /= 0.5) < 1
      ? 0.5 * Math.pow(2, 10 * (e - 1))
      : 0.5 * (-Math.pow(2, -10 * --e) + 2);
  }
  function MM(e) {
    return -(Math.sqrt(1 - e * e) - 1);
  }
  function qM(e) {
    return Math.sqrt(1 - Math.pow(e - 1, 2));
  }
  function DM(e) {
    return (e /= 0.5) < 1
      ? -0.5 * (Math.sqrt(1 - e * e) - 1)
      : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
  }
  function FM(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function GM(e) {
    let t = ht;
    return e * e * ((t + 1) * e - t);
  }
  function UM(e) {
    let t = ht;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function kM(e) {
    let t = ht;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function VM(e) {
    let t = ht,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (r || (r = 0.3),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        -(
          n *
          Math.pow(2, 10 * (e -= 1)) *
          Math.sin(((e - t) * (2 * Math.PI)) / r)
        ));
  }
  function WM(e) {
    let t = ht,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (r || (r = 0.3),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        n * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / r) + 1);
  }
  function HM(e) {
    let t = ht,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : (e /= 1 / 2) === 2
      ? 1
      : (r || (r = 0.3 * 1.5),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        e < 1
          ? -0.5 *
            (n *
              Math.pow(2, 10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / r))
          : n *
              Math.pow(2, -10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / r) *
              0.5 +
            1);
  }
  function XM(e) {
    let t = ht;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function BM(e) {
    let t = ht;
    return e * e * ((t + 1) * e - t);
  }
  function jM(e) {
    let t = ht;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function zM(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function KM(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
      : e < 2.5 / 2.75
      ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
      : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
  }
  var jr,
    ht,
    dM,
    pM,
    vM,
    gM,
    xa = me(() => {
      "use strict";
      (jr = de(Oa())),
        (ht = 1.70158),
        (dM = (0, jr.default)(0.25, 0.1, 0.25, 1)),
        (pM = (0, jr.default)(0.42, 0, 1, 1)),
        (vM = (0, jr.default)(0, 0, 0.58, 1)),
        (gM = (0, jr.default)(0.42, 0, 0.58, 1));
    });
  var ph = {};
  Ge(ph, {
    applyEasing: () => $M,
    createBezierEasing: () => YM,
    optimizeFloat: () => Kr,
  });
  function Kr(e, t = 5, r = 10) {
    let n = Math.pow(r, t),
      o = Number(Math.round(e * n) / n);
    return Math.abs(o) > 1e-4 ? o : 0;
  }
  function YM(e) {
    return (0, dh.default)(...e);
  }
  function $M(e, t, r) {
    return t === 0
      ? 0
      : t === 1
      ? 1
      : Kr(r ? (t > 0 ? r(t) : t) : t > 0 && e && zr[e] ? zr[e](t) : t);
  }
  var dh,
    Aa = me(() => {
      "use strict";
      xa();
      dh = de(Oa());
    });
  var hh = {};
  Ge(hh, {
    createElementState: () => gh,
    ixElements: () => lq,
    mergeActionState: () => Sa,
  });
  function gh(e, t, r, n, o) {
    let i =
      r === QM ? (0, ar.getIn)(o, ["config", "target", "objectId"]) : null;
    return (0, ar.mergeIn)(e, [n], { id: n, ref: t, refId: i, refType: r });
  }
  function Sa(e, t, r, n, o) {
    let i = dq(o);
    return (0, ar.mergeIn)(e, [t, cq, r], n, i);
  }
  function dq(e) {
    let { config: t } = e;
    return fq.reduce((r, n) => {
      let o = n[0],
        i = n[1],
        a = t[o],
        s = t[i];
      return a != null && s != null && (r[i] = s), r;
    }, {});
  }
  var ar,
    dB,
    QM,
    pB,
    ZM,
    JM,
    eq,
    tq,
    rq,
    nq,
    iq,
    oq,
    aq,
    sq,
    uq,
    vh,
    cq,
    lq,
    fq,
    yh = me(() => {
      "use strict";
      ar = de(Qt());
      ke();
      ({
        HTML_ELEMENT: dB,
        PLAIN_OBJECT: QM,
        ABSTRACT_NODE: pB,
        CONFIG_X_VALUE: ZM,
        CONFIG_Y_VALUE: JM,
        CONFIG_Z_VALUE: eq,
        CONFIG_VALUE: tq,
        CONFIG_X_UNIT: rq,
        CONFIG_Y_UNIT: nq,
        CONFIG_Z_UNIT: iq,
        CONFIG_UNIT: oq,
      } = Ce),
        ({
          IX2_SESSION_STOPPED: aq,
          IX2_INSTANCE_ADDED: sq,
          IX2_ELEMENT_STATE_CHANGED: uq,
        } = we),
        (vh = {}),
        (cq = "refState"),
        (lq = (e = vh, t = {}) => {
          switch (t.type) {
            case aq:
              return vh;
            case sq: {
              let {
                  elementId: r,
                  element: n,
                  origin: o,
                  actionItem: i,
                  refType: a,
                } = t.payload,
                { actionTypeId: s } = i,
                u = e;
              return (
                (0, ar.getIn)(u, [r, n]) !== n && (u = gh(u, n, a, r, i)),
                Sa(u, r, s, o, i)
              );
            }
            case uq: {
              let {
                elementId: r,
                actionTypeId: n,
                current: o,
                actionItem: i,
              } = t.payload;
              return Sa(e, r, n, o, i);
            }
            default:
              return e;
          }
        });
      fq = [
        [ZM, rq],
        [JM, nq],
        [eq, iq],
        [tq, oq],
      ];
    });
  var mh = c((Ae) => {
    "use strict";
    Object.defineProperty(Ae, "__esModule", { value: !0 });
    Ae.renderPlugin =
      Ae.getPluginOrigin =
      Ae.getPluginDuration =
      Ae.getPluginDestination =
      Ae.getPluginConfig =
      Ae.createPluginInstance =
      Ae.clearPlugin =
        void 0;
    var pq = (e) => e.value;
    Ae.getPluginConfig = pq;
    var vq = (e, t) => {
      if (t.config.duration !== "auto") return null;
      let r = parseFloat(e.getAttribute("data-duration"));
      return r > 0
        ? r * 1e3
        : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
    };
    Ae.getPluginDuration = vq;
    var gq = (e) => e || { value: 0 };
    Ae.getPluginOrigin = gq;
    var hq = (e) => ({ value: e.value });
    Ae.getPluginDestination = hq;
    var yq = (e) => {
      let t = window.Webflow.require("lottie").createInstance(e);
      return t.stop(), t.setSubframe(!0), t;
    };
    Ae.createPluginInstance = yq;
    var mq = (e, t, r) => {
      if (!e) return;
      let n = t[r.actionTypeId].value / 100;
      e.goToFrame(e.frames * n);
    };
    Ae.renderPlugin = mq;
    var Eq = (e) => {
      window.Webflow.require("lottie").createInstance(e).stop();
    };
    Ae.clearPlugin = Eq;
  });
  var _h = c((Se) => {
    "use strict";
    Object.defineProperty(Se, "__esModule", { value: !0 });
    Se.renderPlugin =
      Se.getPluginOrigin =
      Se.getPluginDuration =
      Se.getPluginDestination =
      Se.getPluginConfig =
      Se.createPluginInstance =
      Se.clearPlugin =
        void 0;
    var _q = (e) => document.querySelector(`[data-w-id="${e}"]`),
      bq = () => window.Webflow.require("spline"),
      Tq = (e, t) => e.filter((r) => !t.includes(r)),
      Iq = (e, t) => e.value[t];
    Se.getPluginConfig = Iq;
    var wq = () => null;
    Se.getPluginDuration = wq;
    var Eh = Object.freeze({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
      }),
      Oq = (e, t) => {
        let r = t.config.value,
          n = Object.keys(r);
        if (e) {
          let i = Object.keys(e),
            a = Tq(n, i);
          return a.length ? a.reduce((u, d) => ((u[d] = Eh[d]), u), e) : e;
        }
        return n.reduce((i, a) => ((i[a] = Eh[a]), i), {});
      };
    Se.getPluginOrigin = Oq;
    var xq = (e) => e.value;
    Se.getPluginDestination = xq;
    var Aq = (e, t) => {
      var r, n;
      let o =
        t == null ||
        (r = t.config) === null ||
        r === void 0 ||
        (n = r.target) === null ||
        n === void 0
          ? void 0
          : n.pluginElement;
      return o ? _q(o) : null;
    };
    Se.createPluginInstance = Aq;
    var Sq = (e, t, r) => {
      let n = bq(),
        o = n.getInstance(e),
        i = r.config.target.objectId,
        a = (s) => {
          if (!s) throw new Error("Invalid spline app passed to renderSpline");
          let u = i && s.findObjectById(i);
          if (!u) return;
          let { PLUGIN_SPLINE: d } = t;
          d.positionX != null && (u.position.x = d.positionX),
            d.positionY != null && (u.position.y = d.positionY),
            d.positionZ != null && (u.position.z = d.positionZ),
            d.rotationX != null && (u.rotation.x = d.rotationX),
            d.rotationY != null && (u.rotation.y = d.rotationY),
            d.rotationZ != null && (u.rotation.z = d.rotationZ),
            d.scaleX != null && (u.scale.x = d.scaleX),
            d.scaleY != null && (u.scale.y = d.scaleY),
            d.scaleZ != null && (u.scale.z = d.scaleZ);
        };
      o ? a(o.spline) : n.setLoadHandler(e, a);
    };
    Se.renderPlugin = Sq;
    var Rq = () => null;
    Se.clearPlugin = Rq;
  });
  var Th = c((Oe) => {
    "use strict";
    Object.defineProperty(Oe, "__esModule", { value: !0 });
    Oe.getPluginOrigin =
      Oe.getPluginDuration =
      Oe.getPluginDestination =
      Oe.getPluginConfig =
      Oe.createPluginInstance =
      Oe.clearPlugin =
        void 0;
    Oe.normalizeColor = bh;
    Oe.renderPlugin = void 0;
    function bh(e) {
      let t,
        r,
        n,
        o = 1,
        i = e.replace(/\s/g, "").toLowerCase();
      if (i.startsWith("#")) {
        let a = i.substring(1);
        a.length === 3
          ? ((t = parseInt(a[0] + a[0], 16)),
            (r = parseInt(a[1] + a[1], 16)),
            (n = parseInt(a[2] + a[2], 16)))
          : a.length === 6 &&
            ((t = parseInt(a.substring(0, 2), 16)),
            (r = parseInt(a.substring(2, 4), 16)),
            (n = parseInt(a.substring(4, 6), 16)));
      } else if (i.startsWith("rgba")) {
        let a = i.match(/rgba\(([^)]+)\)/)[1].split(",");
        (t = parseInt(a[0], 10)),
          (r = parseInt(a[1], 10)),
          (n = parseInt(a[2], 10)),
          (o = parseFloat(a[3]));
      } else if (i.startsWith("rgb")) {
        let a = i.match(/rgb\(([^)]+)\)/)[1].split(",");
        (t = parseInt(a[0], 10)),
          (r = parseInt(a[1], 10)),
          (n = parseInt(a[2], 10));
      } else if (i.startsWith("hsla")) {
        let a = i.match(/hsla\(([^)]+)\)/)[1].split(","),
          s = parseFloat(a[0]),
          u = parseFloat(a[1].replace("%", "")) / 100,
          d = parseFloat(a[2].replace("%", "")) / 100;
        o = parseFloat(a[3]);
        let g = (1 - Math.abs(2 * d - 1)) * u,
          v = g * (1 - Math.abs(((s / 60) % 2) - 1)),
          y = d - g / 2,
          m,
          T,
          I;
        s >= 0 && s < 60
          ? ((m = g), (T = v), (I = 0))
          : s >= 60 && s < 120
          ? ((m = v), (T = g), (I = 0))
          : s >= 120 && s < 180
          ? ((m = 0), (T = g), (I = v))
          : s >= 180 && s < 240
          ? ((m = 0), (T = v), (I = g))
          : s >= 240 && s < 300
          ? ((m = v), (T = 0), (I = g))
          : ((m = g), (T = 0), (I = v)),
          (t = Math.round((m + y) * 255)),
          (r = Math.round((T + y) * 255)),
          (n = Math.round((I + y) * 255));
      } else if (i.startsWith("hsl")) {
        let a = i.match(/hsl\(([^)]+)\)/)[1].split(","),
          s = parseFloat(a[0]),
          u = parseFloat(a[1].replace("%", "")) / 100,
          d = parseFloat(a[2].replace("%", "")) / 100,
          g = (1 - Math.abs(2 * d - 1)) * u,
          v = g * (1 - Math.abs(((s / 60) % 2) - 1)),
          y = d - g / 2,
          m,
          T,
          I;
        s >= 0 && s < 60
          ? ((m = g), (T = v), (I = 0))
          : s >= 60 && s < 120
          ? ((m = v), (T = g), (I = 0))
          : s >= 120 && s < 180
          ? ((m = 0), (T = g), (I = v))
          : s >= 180 && s < 240
          ? ((m = 0), (T = v), (I = g))
          : s >= 240 && s < 300
          ? ((m = v), (T = 0), (I = g))
          : ((m = g), (T = 0), (I = v)),
          (t = Math.round((m + y) * 255)),
          (r = Math.round((T + y) * 255)),
          (n = Math.round((I + y) * 255));
      }
      return (
        (Number.isNaN(t) || Number.isNaN(r) || Number.isNaN(n)) && `${e}`,
        { red: t, green: r, blue: n, alpha: o }
      );
    }
    var Cq = (e, t) => e.value[t];
    Oe.getPluginConfig = Cq;
    var Lq = () => null;
    Oe.getPluginDuration = Lq;
    var Nq = (e, t) => {
      if (e) return e;
      let r = t.config.value,
        n = t.config.target.objectId,
        o = getComputedStyle(document.documentElement).getPropertyValue(n);
      if (r.size != null) return { size: parseInt(o, 10) };
      if (r.red != null && r.green != null && r.blue != null) return bh(o);
    };
    Oe.getPluginOrigin = Nq;
    var Pq = (e) => e.value;
    Oe.getPluginDestination = Pq;
    var Mq = () => null;
    Oe.createPluginInstance = Mq;
    var qq = (e, t, r) => {
      let n = r.config.target.objectId,
        o = r.config.value.unit,
        { PLUGIN_VARIABLE: i } = t,
        { size: a, red: s, green: u, blue: d, alpha: g } = i,
        v;
      a != null && (v = a + o),
        s != null &&
          d != null &&
          u != null &&
          g != null &&
          (v = `rgba(${s}, ${u}, ${d}, ${g})`),
        v != null && document.documentElement.style.setProperty(n, v);
    };
    Oe.renderPlugin = qq;
    var Dq = (e, t) => {
      let r = t.config.target.objectId;
      document.documentElement.style.removeProperty(r);
    };
    Oe.clearPlugin = Dq;
  });
  var Ih = c((ti) => {
    "use strict";
    var Ca = vn().default;
    Object.defineProperty(ti, "__esModule", { value: !0 });
    ti.pluginMethodMap = void 0;
    var Ra = (ke(), it(Rf)),
      Fq = Ca(mh()),
      Gq = Ca(_h()),
      Uq = Ca(Th()),
      yB = (ti.pluginMethodMap = new Map([
        [Ra.ActionTypeConsts.PLUGIN_LOTTIE, { ...Fq }],
        [Ra.ActionTypeConsts.PLUGIN_SPLINE, { ...Gq }],
        [Ra.ActionTypeConsts.PLUGIN_VARIABLE, { ...Uq }],
      ]));
  });
  var wh = {};
  Ge(wh, {
    clearPlugin: () => Da,
    createPluginInstance: () => Vq,
    getPluginConfig: () => Na,
    getPluginDestination: () => Ma,
    getPluginDuration: () => kq,
    getPluginOrigin: () => Pa,
    isPluginType: () => Ft,
    renderPlugin: () => qa,
  });
  function Ft(e) {
    return La.pluginMethodMap.has(e);
  }
  var La,
    Gt,
    Na,
    Pa,
    kq,
    Ma,
    Vq,
    qa,
    Da,
    Fa = me(() => {
      "use strict";
      Zn();
      La = de(Ih());
      (Gt = (e) => (t) => {
        if (!et) return () => null;
        let r = La.pluginMethodMap.get(t);
        if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
        let n = r[e];
        if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
        return n;
      }),
        (Na = Gt("getPluginConfig")),
        (Pa = Gt("getPluginOrigin")),
        (kq = Gt("getPluginDuration")),
        (Ma = Gt("getPluginDestination")),
        (Vq = Gt("createPluginInstance")),
        (qa = Gt("renderPlugin")),
        (Da = Gt("clearPlugin"));
    });
  var xh = c((_B, Oh) => {
    function Wq(e, t) {
      return e == null || e !== e ? t : e;
    }
    Oh.exports = Wq;
  });
  var Sh = c((bB, Ah) => {
    function Hq(e, t, r, n) {
      var o = -1,
        i = e == null ? 0 : e.length;
      for (n && i && (r = e[++o]); ++o < i; ) r = t(r, e[o], o, e);
      return r;
    }
    Ah.exports = Hq;
  });
  var Ch = c((TB, Rh) => {
    function Xq(e) {
      return function (t, r, n) {
        for (var o = -1, i = Object(t), a = n(t), s = a.length; s--; ) {
          var u = a[e ? s : ++o];
          if (r(i[u], u, i) === !1) break;
        }
        return t;
      };
    }
    Rh.exports = Xq;
  });
  var Nh = c((IB, Lh) => {
    var Bq = Ch(),
      jq = Bq();
    Lh.exports = jq;
  });
  var Ga = c((wB, Ph) => {
    var zq = Nh(),
      Kq = Wr();
    function Yq(e, t) {
      return e && zq(e, t, Kq);
    }
    Ph.exports = Yq;
  });
  var qh = c((OB, Mh) => {
    var $q = qt();
    function Qq(e, t) {
      return function (r, n) {
        if (r == null) return r;
        if (!$q(r)) return e(r, n);
        for (
          var o = r.length, i = t ? o : -1, a = Object(r);
          (t ? i-- : ++i < o) && n(a[i], i, a) !== !1;

        );
        return r;
      };
    }
    Mh.exports = Qq;
  });
  var Ua = c((xB, Dh) => {
    var Zq = Ga(),
      Jq = qh(),
      e1 = Jq(Zq);
    Dh.exports = e1;
  });
  var Gh = c((AB, Fh) => {
    function t1(e, t, r, n, o) {
      return (
        o(e, function (i, a, s) {
          r = n ? ((n = !1), i) : t(r, i, a, s);
        }),
        r
      );
    }
    Fh.exports = t1;
  });
  var kh = c((SB, Uh) => {
    var r1 = Sh(),
      n1 = Ua(),
      i1 = xt(),
      o1 = Gh(),
      a1 = xe();
    function s1(e, t, r) {
      var n = a1(e) ? r1 : o1,
        o = arguments.length < 3;
      return n(e, i1(t, 4), r, o, n1);
    }
    Uh.exports = s1;
  });
  var Wh = c((RB, Vh) => {
    var u1 = ba(),
      c1 = xt(),
      l1 = Ta(),
      f1 = Math.max,
      d1 = Math.min;
    function p1(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var o = n - 1;
      return (
        r !== void 0 &&
          ((o = l1(r)), (o = r < 0 ? f1(n + o, 0) : d1(o, n - 1))),
        u1(e, c1(t, 3), o, !0)
      );
    }
    Vh.exports = p1;
  });
  var Xh = c((CB, Hh) => {
    var v1 = _a(),
      g1 = Wh(),
      h1 = v1(g1);
    Hh.exports = h1;
  });
  function Bh(e, t) {
    return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
  }
  function m1(e, t) {
    if (Bh(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    let r = Object.keys(e),
      n = Object.keys(t);
    if (r.length !== n.length) return !1;
    for (let o = 0; o < r.length; o++)
      if (!y1.call(t, r[o]) || !Bh(e[r[o]], t[r[o]])) return !1;
    return !0;
  }
  var y1,
    ka,
    jh = me(() => {
      "use strict";
      y1 = Object.prototype.hasOwnProperty;
      ka = m1;
    });
  var cy = {};
  Ge(cy, {
    cleanupHTMLElement: () => gD,
    clearAllStyles: () => vD,
    clearObjectCache: () => q1,
    getActionListProgress: () => yD,
    getAffectedElements: () => Ba,
    getComputedStyle: () => H1,
    getDestinationValues: () => $1,
    getElementId: () => U1,
    getInstanceId: () => F1,
    getInstanceOrigin: () => j1,
    getItemConfigByKey: () => Y1,
    getMaxDurationItemIndex: () => uy,
    getNamespacedParameterId: () => _D,
    getRenderType: () => oy,
    getStyleProp: () => Q1,
    mediaQueriesEqual: () => TD,
    observeStore: () => W1,
    reduceListToGroup: () => mD,
    reifyState: () => k1,
    renderHTMLElement: () => Z1,
    shallowEqual: () => ka,
    shouldAllowMediaQuery: () => bD,
    shouldNamespaceEventParameter: () => ED,
    stringifyTarget: () => ID,
  });
  function q1() {
    ri.clear();
  }
  function F1() {
    return "i" + D1++;
  }
  function U1(e, t) {
    for (let r in e) {
      let n = e[r];
      if (n && n.ref === t) return n.id;
    }
    return "e" + G1++;
  }
  function k1({ events: e, actionLists: t, site: r } = {}) {
    let n = (0, ai.default)(
        e,
        (a, s) => {
          let { eventTypeId: u } = s;
          return a[u] || (a[u] = {}), (a[u][s.id] = s), a;
        },
        {}
      ),
      o = r && r.mediaQueries,
      i = [];
    return (
      o
        ? (i = o.map((a) => a.key))
        : ((o = []), console.warn("IX2 missing mediaQueries in site data")),
      {
        ixData: {
          events: e,
          actionLists: t,
          eventTypeMap: n,
          mediaQueries: o,
          mediaQueryKeys: i,
        },
      }
    );
  }
  function W1({ store: e, select: t, onChange: r, comparator: n = V1 }) {
    let { getState: o, subscribe: i } = e,
      a = i(u),
      s = t(o());
    function u() {
      let d = t(o());
      if (d == null) {
        a();
        return;
      }
      n(d, s) || ((s = d), r(s, e));
    }
    return a;
  }
  function Yh(e) {
    let t = typeof e;
    if (t === "string") return { id: e };
    if (e != null && t === "object") {
      let {
        id: r,
        objectId: n,
        selector: o,
        selectorGuids: i,
        appliesTo: a,
        useEventTarget: s,
      } = e;
      return {
        id: r,
        objectId: n,
        selector: o,
        selectorGuids: i,
        appliesTo: a,
        useEventTarget: s,
      };
    }
    return {};
  }
  function Ba({
    config: e,
    event: t,
    eventTarget: r,
    elementRoot: n,
    elementApi: o,
  }) {
    if (!o) throw new Error("IX2 missing elementApi");
    let { targets: i } = e;
    if (Array.isArray(i) && i.length > 0)
      return i.reduce(
        (U, x) =>
          U.concat(
            Ba({
              config: { target: x },
              event: t,
              eventTarget: r,
              elementRoot: n,
              elementApi: o,
            })
          ),
        []
      );
    let {
        getValidDocument: a,
        getQuerySelector: s,
        queryDocument: u,
        getChildElements: d,
        getSiblingElements: g,
        matchSelector: v,
        elementContains: y,
        isSiblingNode: m,
      } = o,
      { target: T } = e;
    if (!T) return [];
    let {
      id: I,
      objectId: D,
      selector: S,
      selectorGuids: L,
      appliesTo: C,
      useEventTarget: P,
    } = Yh(T);
    if (D) return [ri.has(D) ? ri.get(D) : ri.set(D, {}).get(D)];
    if (C === Bo.PAGE) {
      let U = a(I);
      return U ? [U] : [];
    }
    let M = (t?.action?.config?.affectedElements ?? {})[I || S] || {},
      X = !!(M.id || M.selector),
      K,
      Q,
      ee,
      te = t && s(Yh(t.target));
    if (
      (X
        ? ((K = M.limitAffectedElements), (Q = te), (ee = s(M)))
        : (Q = ee = s({ id: I, selector: S, selectorGuids: L })),
      t && P)
    ) {
      let U = r && (ee || P === !0) ? [r] : u(te);
      if (ee) {
        if (P === N1) return u(ee).filter((x) => U.some((F) => y(x, F)));
        if (P === zh) return u(ee).filter((x) => U.some((F) => y(F, x)));
        if (P === Kh) return u(ee).filter((x) => U.some((F) => m(F, x)));
      }
      return U;
    }
    return Q == null || ee == null
      ? []
      : et && n
      ? u(ee).filter((U) => n.contains(U))
      : K === zh
      ? u(Q, ee)
      : K === L1
      ? d(u(Q)).filter(v(ee))
      : K === Kh
      ? g(u(Q)).filter(v(ee))
      : u(ee);
  }
  function H1({ element: e, actionItem: t }) {
    if (!et) return {};
    let { actionTypeId: r } = t;
    switch (r) {
      case fr:
      case dr:
      case pr:
      case vr:
      case ui:
        return window.getComputedStyle(e);
      default:
        return {};
    }
  }
  function j1(e, t = {}, r = {}, n, o) {
    let { getStyle: i } = o,
      { actionTypeId: a } = n;
    if (Ft(a)) return Pa(a)(t[a], n);
    switch (n.actionTypeId) {
      case ur:
      case cr:
      case lr:
      case Zr:
        return t[n.actionTypeId] || ja[n.actionTypeId];
      case Jr:
        return X1(t[n.actionTypeId], n.config.filters);
      case en:
        return B1(t[n.actionTypeId], n.config.fontVariations);
      case ry:
        return { value: (0, yt.default)(parseFloat(i(e, ii)), 1) };
      case fr: {
        let s = i(e, lt),
          u = i(e, ft),
          d,
          g;
        return (
          n.config.widthUnit === St
            ? (d = $h.test(s) ? parseFloat(s) : parseFloat(r.width))
            : (d = (0, yt.default)(parseFloat(s), parseFloat(r.width))),
          n.config.heightUnit === St
            ? (g = $h.test(u) ? parseFloat(u) : parseFloat(r.height))
            : (g = (0, yt.default)(parseFloat(u), parseFloat(r.height))),
          { widthValue: d, heightValue: g }
        );
      }
      case dr:
      case pr:
      case vr:
        return fD({
          element: e,
          actionTypeId: n.actionTypeId,
          computedStyle: r,
          getStyle: i,
        });
      case ui:
        return { value: (0, yt.default)(i(e, oi), r.display) };
      case M1:
        return t[n.actionTypeId] || { value: 0 };
      default:
        return;
    }
  }
  function $1({ element: e, actionItem: t, elementApi: r }) {
    if (Ft(t.actionTypeId)) return Ma(t.actionTypeId)(t.config);
    switch (t.actionTypeId) {
      case ur:
      case cr:
      case lr:
      case Zr: {
        let { xValue: n, yValue: o, zValue: i } = t.config;
        return { xValue: n, yValue: o, zValue: i };
      }
      case fr: {
        let { getStyle: n, setStyle: o, getProperty: i } = r,
          { widthUnit: a, heightUnit: s } = t.config,
          { widthValue: u, heightValue: d } = t.config;
        if (!et) return { widthValue: u, heightValue: d };
        if (a === St) {
          let g = n(e, lt);
          o(e, lt, ""), (u = i(e, "offsetWidth")), o(e, lt, g);
        }
        if (s === St) {
          let g = n(e, ft);
          o(e, ft, ""), (d = i(e, "offsetHeight")), o(e, ft, g);
        }
        return { widthValue: u, heightValue: d };
      }
      case dr:
      case pr:
      case vr: {
        let { rValue: n, gValue: o, bValue: i, aValue: a } = t.config;
        return { rValue: n, gValue: o, bValue: i, aValue: a };
      }
      case Jr:
        return t.config.filters.reduce(z1, {});
      case en:
        return t.config.fontVariations.reduce(K1, {});
      default: {
        let { value: n } = t.config;
        return { value: n };
      }
    }
  }
  function oy(e) {
    if (/^TRANSFORM_/.test(e)) return ey;
    if (/^STYLE_/.test(e)) return Ha;
    if (/^GENERAL_/.test(e)) return Wa;
    if (/^PLUGIN_/.test(e)) return ty;
  }
  function Q1(e, t) {
    return e === Ha ? t.replace("STYLE_", "").toLowerCase() : null;
  }
  function Z1(e, t, r, n, o, i, a, s, u) {
    switch (s) {
      case ey:
        return nD(e, t, r, o, a);
      case Ha:
        return dD(e, t, r, o, i, a);
      case Wa:
        return pD(e, o, a);
      case ty: {
        let { actionTypeId: d } = o;
        if (Ft(d)) return qa(d)(u, t, o);
      }
    }
  }
  function nD(e, t, r, n, o) {
    let i = rD
        .map((s) => {
          let u = ja[s],
            {
              xValue: d = u.xValue,
              yValue: g = u.yValue,
              zValue: v = u.zValue,
              xUnit: y = "",
              yUnit: m = "",
              zUnit: T = "",
            } = t[s] || {};
          switch (s) {
            case ur:
              return `${b1}(${d}${y}, ${g}${m}, ${v}${T})`;
            case cr:
              return `${T1}(${d}${y}, ${g}${m}, ${v}${T})`;
            case lr:
              return `${I1}(${d}${y}) ${w1}(${g}${m}) ${O1}(${v}${T})`;
            case Zr:
              return `${x1}(${d}${y}, ${g}${m})`;
            default:
              return "";
          }
        })
        .join(" "),
      { setStyle: a } = o;
    Ut(e, At, o), a(e, At, i), aD(n, r) && a(e, Qn, A1);
  }
  function iD(e, t, r, n) {
    let o = (0, ai.default)(t, (a, s, u) => `${a} ${u}(${s}${tD(u, r)})`, ""),
      { setStyle: i } = n;
    Ut(e, Yr, n), i(e, Yr, o);
  }
  function oD(e, t, r, n) {
    let o = (0, ai.default)(
        t,
        (a, s, u) => (a.push(`"${u}" ${s}`), a),
        []
      ).join(", "),
      { setStyle: i } = n;
    Ut(e, $r, n), i(e, $r, o);
  }
  function aD({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
    return (
      (e === ur && n !== void 0) ||
      (e === cr && n !== void 0) ||
      (e === lr && (t !== void 0 || r !== void 0))
    );
  }
  function lD(e, t) {
    let r = e.exec(t);
    return r ? r[1] : "";
  }
  function fD({ element: e, actionTypeId: t, computedStyle: r, getStyle: n }) {
    let o = Xa[t],
      i = n(e, o),
      a = uD.test(i) ? i : r[o],
      s = lD(cD, a).split(Qr);
    return {
      rValue: (0, yt.default)(parseInt(s[0], 10), 255),
      gValue: (0, yt.default)(parseInt(s[1], 10), 255),
      bValue: (0, yt.default)(parseInt(s[2], 10), 255),
      aValue: (0, yt.default)(parseFloat(s[3]), 1),
    };
  }
  function dD(e, t, r, n, o, i) {
    let { setStyle: a } = i;
    switch (n.actionTypeId) {
      case fr: {
        let { widthUnit: s = "", heightUnit: u = "" } = n.config,
          { widthValue: d, heightValue: g } = r;
        d !== void 0 && (s === St && (s = "px"), Ut(e, lt, i), a(e, lt, d + s)),
          g !== void 0 &&
            (u === St && (u = "px"), Ut(e, ft, i), a(e, ft, g + u));
        break;
      }
      case Jr: {
        iD(e, r, n.config, i);
        break;
      }
      case en: {
        oD(e, r, n.config, i);
        break;
      }
      case dr:
      case pr:
      case vr: {
        let s = Xa[n.actionTypeId],
          u = Math.round(r.rValue),
          d = Math.round(r.gValue),
          g = Math.round(r.bValue),
          v = r.aValue;
        Ut(e, s, i),
          a(e, s, v >= 1 ? `rgb(${u},${d},${g})` : `rgba(${u},${d},${g},${v})`);
        break;
      }
      default: {
        let { unit: s = "" } = n.config;
        Ut(e, o, i), a(e, o, r.value + s);
        break;
      }
    }
  }
  function pD(e, t, r) {
    let { setStyle: n } = r;
    switch (t.actionTypeId) {
      case ui: {
        let { value: o } = t.config;
        o === S1 && et ? n(e, oi, wa) : n(e, oi, o);
        return;
      }
    }
  }
  function Ut(e, t, r) {
    if (!et) return;
    let n = iy[t];
    if (!n) return;
    let { getStyle: o, setStyle: i } = r,
      a = o(e, sr);
    if (!a) {
      i(e, sr, n);
      return;
    }
    let s = a.split(Qr).map(ny);
    s.indexOf(n) === -1 && i(e, sr, s.concat(n).join(Qr));
  }
  function ay(e, t, r) {
    if (!et) return;
    let n = iy[t];
    if (!n) return;
    let { getStyle: o, setStyle: i } = r,
      a = o(e, sr);
    !a ||
      a.indexOf(n) === -1 ||
      i(
        e,
        sr,
        a
          .split(Qr)
          .map(ny)
          .filter((s) => s !== n)
          .join(Qr)
      );
  }
  function vD({ store: e, elementApi: t }) {
    let { ixData: r } = e.getState(),
      { events: n = {}, actionLists: o = {} } = r;
    Object.keys(n).forEach((i) => {
      let a = n[i],
        { config: s } = a.action,
        { actionListId: u } = s,
        d = o[u];
      d && Qh({ actionList: d, event: a, elementApi: t });
    }),
      Object.keys(o).forEach((i) => {
        Qh({ actionList: o[i], elementApi: t });
      });
  }
  function Qh({ actionList: e = {}, event: t, elementApi: r }) {
    let { actionItemGroups: n, continuousParameterGroups: o } = e;
    n &&
      n.forEach((i) => {
        Zh({ actionGroup: i, event: t, elementApi: r });
      }),
      o &&
        o.forEach((i) => {
          let { continuousActionGroups: a } = i;
          a.forEach((s) => {
            Zh({ actionGroup: s, event: t, elementApi: r });
          });
        });
  }
  function Zh({ actionGroup: e, event: t, elementApi: r }) {
    let { actionItems: n } = e;
    n.forEach((o) => {
      let { actionTypeId: i, config: a } = o,
        s;
      Ft(i)
        ? (s = (u) => Da(i)(u, o))
        : (s = sy({ effect: hD, actionTypeId: i, elementApi: r })),
        Ba({ config: a, event: t, elementApi: r }).forEach(s);
    });
  }
  function gD(e, t, r) {
    let { setStyle: n, getStyle: o } = r,
      { actionTypeId: i } = t;
    if (i === fr) {
      let { config: a } = t;
      a.widthUnit === St && n(e, lt, ""), a.heightUnit === St && n(e, ft, "");
    }
    o(e, sr) && sy({ effect: ay, actionTypeId: i, elementApi: r })(e);
  }
  function hD(e, t, r) {
    let { setStyle: n } = r;
    ay(e, t, r), n(e, t, ""), t === At && n(e, Qn, "");
  }
  function uy(e) {
    let t = 0,
      r = 0;
    return (
      e.forEach((n, o) => {
        let { config: i } = n,
          a = i.delay + i.duration;
        a >= t && ((t = a), (r = o));
      }),
      r
    );
  }
  function yD(e, t) {
    let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
      { actionItem: o, verboseTimeElapsed: i = 0 } = t,
      a = 0,
      s = 0;
    return (
      r.forEach((u, d) => {
        if (n && d === 0) return;
        let { actionItems: g } = u,
          v = g[uy(g)],
          { config: y, actionTypeId: m } = v;
        o.id === v.id && (s = a + i);
        let T = oy(m) === Wa ? 0 : y.duration;
        a += y.delay + T;
      }),
      a > 0 ? Kr(s / a) : 0
    );
  }
  function mD({ actionList: e, actionItemId: t, rawData: r }) {
    let { actionItemGroups: n, continuousParameterGroups: o } = e,
      i = [],
      a = (s) => (
        i.push((0, si.mergeIn)(s, ["config"], { delay: 0, duration: 0 })),
        s.id === t
      );
    return (
      n && n.some(({ actionItems: s }) => s.some(a)),
      o &&
        o.some((s) => {
          let { continuousActionGroups: u } = s;
          return u.some(({ actionItems: d }) => d.some(a));
        }),
      (0, si.setIn)(r, ["actionLists"], {
        [e.id]: { id: e.id, actionItemGroups: [{ actionItems: i }] },
      })
    );
  }
  function ED(e, { basedOn: t }) {
    return (
      (e === Je.SCROLLING_IN_VIEW && (t === ut.ELEMENT || t == null)) ||
      (e === Je.MOUSE_MOVE && t === ut.ELEMENT)
    );
  }
  function _D(e, t) {
    return e + P1 + t;
  }
  function bD(e, t) {
    return t == null ? !0 : e.indexOf(t) !== -1;
  }
  function TD(e, t) {
    return ka(e && e.sort(), t && t.sort());
  }
  function ID(e) {
    if (typeof e == "string") return e;
    if (e.pluginElement && e.objectId) return e.pluginElement + Va + e.objectId;
    if (e.objectId) return e.objectId;
    let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
    return t + Va + r + Va + n;
  }
  var yt,
    ai,
    ni,
    si,
    E1,
    _1,
    b1,
    T1,
    I1,
    w1,
    O1,
    x1,
    A1,
    S1,
    ii,
    Yr,
    $r,
    lt,
    ft,
    Jh,
    R1,
    C1,
    zh,
    L1,
    Kh,
    N1,
    oi,
    sr,
    St,
    Qr,
    P1,
    Va,
    ey,
    Wa,
    Ha,
    ty,
    ur,
    cr,
    lr,
    Zr,
    ry,
    Jr,
    en,
    fr,
    dr,
    pr,
    vr,
    ui,
    M1,
    ny,
    Xa,
    iy,
    ri,
    D1,
    G1,
    V1,
    $h,
    X1,
    B1,
    z1,
    K1,
    Y1,
    ja,
    J1,
    eD,
    tD,
    rD,
    sD,
    uD,
    cD,
    sy,
    ly = me(() => {
      "use strict";
      (yt = de(xh())), (ai = de(kh())), (ni = de(Xh())), (si = de(Qt()));
      ke();
      jh();
      Aa();
      Fa();
      Zn();
      ({
        BACKGROUND: E1,
        TRANSFORM: _1,
        TRANSLATE_3D: b1,
        SCALE_3D: T1,
        ROTATE_X: I1,
        ROTATE_Y: w1,
        ROTATE_Z: O1,
        SKEW: x1,
        PRESERVE_3D: A1,
        FLEX: S1,
        OPACITY: ii,
        FILTER: Yr,
        FONT_VARIATION_SETTINGS: $r,
        WIDTH: lt,
        HEIGHT: ft,
        BACKGROUND_COLOR: Jh,
        BORDER_COLOR: R1,
        COLOR: C1,
        CHILDREN: zh,
        IMMEDIATE_CHILDREN: L1,
        SIBLINGS: Kh,
        PARENT: N1,
        DISPLAY: oi,
        WILL_CHANGE: sr,
        AUTO: St,
        COMMA_DELIMITER: Qr,
        COLON_DELIMITER: P1,
        BAR_DELIMITER: Va,
        RENDER_TRANSFORM: ey,
        RENDER_GENERAL: Wa,
        RENDER_STYLE: Ha,
        RENDER_PLUGIN: ty,
      } = Ce),
        ({
          TRANSFORM_MOVE: ur,
          TRANSFORM_SCALE: cr,
          TRANSFORM_ROTATE: lr,
          TRANSFORM_SKEW: Zr,
          STYLE_OPACITY: ry,
          STYLE_FILTER: Jr,
          STYLE_FONT_VARIATION: en,
          STYLE_SIZE: fr,
          STYLE_BACKGROUND_COLOR: dr,
          STYLE_BORDER: pr,
          STYLE_TEXT_COLOR: vr,
          GENERAL_DISPLAY: ui,
          OBJECT_VALUE: M1,
        } = Xe),
        (ny = (e) => e.trim()),
        (Xa = Object.freeze({ [dr]: Jh, [pr]: R1, [vr]: C1 })),
        (iy = Object.freeze({
          [At]: _1,
          [Jh]: E1,
          [ii]: ii,
          [Yr]: Yr,
          [lt]: lt,
          [ft]: ft,
          [$r]: $r,
        })),
        (ri = new Map());
      D1 = 1;
      G1 = 1;
      V1 = (e, t) => e === t;
      ($h = /px/),
        (X1 = (e, t) =>
          t.reduce(
            (r, n) => (r[n.type] == null && (r[n.type] = J1[n.type]), r),
            e || {}
          )),
        (B1 = (e, t) =>
          t.reduce(
            (r, n) => (
              r[n.type] == null &&
                (r[n.type] = eD[n.type] || n.defaultValue || 0),
              r
            ),
            e || {}
          ));
      (z1 = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (K1 = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (Y1 = (e, t, r) => {
          if (Ft(e)) return Na(e)(r, t);
          switch (e) {
            case Jr: {
              let n = (0, ni.default)(r.filters, ({ type: o }) => o === t);
              return n ? n.value : 0;
            }
            case en: {
              let n = (0, ni.default)(
                r.fontVariations,
                ({ type: o }) => o === t
              );
              return n ? n.value : 0;
            }
            default:
              return r[t];
          }
        });
      (ja = {
        [ur]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [cr]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [lr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [Zr]: Object.freeze({ xValue: 0, yValue: 0 }),
      }),
        (J1 = Object.freeze({
          blur: 0,
          "hue-rotate": 0,
          invert: 0,
          grayscale: 0,
          saturate: 100,
          sepia: 0,
          contrast: 100,
          brightness: 100,
        })),
        (eD = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 })),
        (tD = (e, t) => {
          let r = (0, ni.default)(t.filters, ({ type: n }) => n === e);
          if (r && r.unit) return r.unit;
          switch (e) {
            case "blur":
              return "px";
            case "hue-rotate":
              return "deg";
            default:
              return "%";
          }
        }),
        (rD = Object.keys(ja));
      (sD = "\\(([^)]+)\\)"), (uD = /^rgb/), (cD = RegExp(`rgba?${sD}`));
      sy =
        ({ effect: e, actionTypeId: t, elementApi: r }) =>
        (n) => {
          switch (t) {
            case ur:
            case cr:
            case lr:
            case Zr:
              e(n, At, r);
              break;
            case Jr:
              e(n, Yr, r);
              break;
            case en:
              e(n, $r, r);
              break;
            case ry:
              e(n, ii, r);
              break;
            case fr:
              e(n, lt, r), e(n, ft, r);
              break;
            case dr:
            case pr:
            case vr:
              e(n, Xa[t], r);
              break;
            case ui:
              e(n, oi, r);
              break;
          }
        };
    });
  var kt = c((Me) => {
    "use strict";
    var gr = vn().default;
    Object.defineProperty(Me, "__esModule", { value: !0 });
    Me.IX2VanillaUtils =
      Me.IX2VanillaPlugins =
      Me.IX2ElementsReducer =
      Me.IX2Easings =
      Me.IX2EasingUtils =
      Me.IX2BrowserSupport =
        void 0;
    var wD = gr((Zn(), it(ah)));
    Me.IX2BrowserSupport = wD;
    var OD = gr((xa(), it(zr)));
    Me.IX2Easings = OD;
    var xD = gr((Aa(), it(ph)));
    Me.IX2EasingUtils = xD;
    var AD = gr((yh(), it(hh)));
    Me.IX2ElementsReducer = AD;
    var SD = gr((Fa(), it(wh)));
    Me.IX2VanillaPlugins = SD;
    var RD = gr((ly(), it(cy)));
    Me.IX2VanillaUtils = RD;
  });
  var li,
    mt,
    CD,
    LD,
    ND,
    PD,
    MD,
    qD,
    ci,
    fy,
    DD,
    FD,
    za,
    GD,
    UD,
    kD,
    VD,
    dy,
    py = me(() => {
      "use strict";
      ke();
      (li = de(kt())),
        (mt = de(Qt())),
        ({
          IX2_RAW_DATA_IMPORTED: CD,
          IX2_SESSION_STOPPED: LD,
          IX2_INSTANCE_ADDED: ND,
          IX2_INSTANCE_STARTED: PD,
          IX2_INSTANCE_REMOVED: MD,
          IX2_ANIMATION_FRAME_CHANGED: qD,
        } = we),
        ({
          optimizeFloat: ci,
          applyEasing: fy,
          createBezierEasing: DD,
        } = li.IX2EasingUtils),
        ({ RENDER_GENERAL: FD } = Ce),
        ({
          getItemConfigByKey: za,
          getRenderType: GD,
          getStyleProp: UD,
        } = li.IX2VanillaUtils),
        (kD = (e, t) => {
          let {
              position: r,
              parameterId: n,
              actionGroups: o,
              destinationKeys: i,
              smoothing: a,
              restingValue: s,
              actionTypeId: u,
              customEasingFn: d,
              skipMotion: g,
              skipToValue: v,
            } = e,
            { parameters: y } = t.payload,
            m = Math.max(1 - a, 0.01),
            T = y[n];
          T == null && ((m = 1), (T = s));
          let I = Math.max(T, 0) || 0,
            D = ci(I - r),
            S = g ? v : ci(r + D * m),
            L = S * 100;
          if (S === r && e.current) return e;
          let C, P, q, M;
          for (let K = 0, { length: Q } = o; K < Q; K++) {
            let { keyframe: ee, actionItems: te } = o[K];
            if ((K === 0 && (C = te[0]), L >= ee)) {
              C = te[0];
              let U = o[K + 1],
                x = U && L !== ee;
              (P = x ? U.actionItems[0] : null),
                x && ((q = ee / 100), (M = (U.keyframe - ee) / 100));
            }
          }
          let X = {};
          if (C && !P)
            for (let K = 0, { length: Q } = i; K < Q; K++) {
              let ee = i[K];
              X[ee] = za(u, ee, C.config);
            }
          else if (C && P && q !== void 0 && M !== void 0) {
            let K = (S - q) / M,
              Q = C.config.easing,
              ee = fy(Q, K, d);
            for (let te = 0, { length: U } = i; te < U; te++) {
              let x = i[te],
                F = za(u, x, C.config),
                re = (za(u, x, P.config) - F) * ee + F;
              X[x] = re;
            }
          }
          return (0, mt.merge)(e, { position: S, current: X });
        }),
        (VD = (e, t) => {
          let {
              active: r,
              origin: n,
              start: o,
              immediate: i,
              renderType: a,
              verbose: s,
              actionItem: u,
              destination: d,
              destinationKeys: g,
              pluginDuration: v,
              instanceDelay: y,
              customEasingFn: m,
              skipMotion: T,
            } = e,
            I = u.config.easing,
            { duration: D, delay: S } = u.config;
          v != null && (D = v),
            (S = y ?? S),
            a === FD ? (D = 0) : (i || T) && (D = S = 0);
          let { now: L } = t.payload;
          if (r && n) {
            let C = L - (o + S);
            if (s) {
              let K = L - o,
                Q = D + S,
                ee = ci(Math.min(Math.max(0, K / Q), 1));
              e = (0, mt.set)(e, "verboseTimeElapsed", Q * ee);
            }
            if (C < 0) return e;
            let P = ci(Math.min(Math.max(0, C / D), 1)),
              q = fy(I, P, m),
              M = {},
              X = null;
            return (
              g.length &&
                (X = g.reduce((K, Q) => {
                  let ee = d[Q],
                    te = parseFloat(n[Q]) || 0,
                    x = (parseFloat(ee) - te) * q + te;
                  return (K[Q] = x), K;
                }, {})),
              (M.current = X),
              (M.position = P),
              P === 1 && ((M.active = !1), (M.complete = !0)),
              (0, mt.merge)(e, M)
            );
          }
          return e;
        }),
        (dy = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case CD:
              return t.payload.ixInstances || Object.freeze({});
            case LD:
              return Object.freeze({});
            case ND: {
              let {
                  instanceId: r,
                  elementId: n,
                  actionItem: o,
                  eventId: i,
                  eventTarget: a,
                  eventStateKey: s,
                  actionListId: u,
                  groupIndex: d,
                  isCarrier: g,
                  origin: v,
                  destination: y,
                  immediate: m,
                  verbose: T,
                  continuous: I,
                  parameterId: D,
                  actionGroups: S,
                  smoothing: L,
                  restingValue: C,
                  pluginInstance: P,
                  pluginDuration: q,
                  instanceDelay: M,
                  skipMotion: X,
                  skipToValue: K,
                } = t.payload,
                { actionTypeId: Q } = o,
                ee = GD(Q),
                te = UD(ee, Q),
                U = Object.keys(y).filter(
                  (F) => y[F] != null && typeof y[F] != "string"
                ),
                { easing: x } = o.config;
              return (0, mt.set)(e, r, {
                id: r,
                elementId: n,
                active: !1,
                position: 0,
                start: 0,
                origin: v,
                destination: y,
                destinationKeys: U,
                immediate: m,
                verbose: T,
                current: null,
                actionItem: o,
                actionTypeId: Q,
                eventId: i,
                eventTarget: a,
                eventStateKey: s,
                actionListId: u,
                groupIndex: d,
                renderType: ee,
                isCarrier: g,
                styleProp: te,
                continuous: I,
                parameterId: D,
                actionGroups: S,
                smoothing: L,
                restingValue: C,
                pluginInstance: P,
                pluginDuration: q,
                instanceDelay: M,
                skipMotion: X,
                skipToValue: K,
                customEasingFn:
                  Array.isArray(x) && x.length === 4 ? DD(x) : void 0,
              });
            }
            case PD: {
              let { instanceId: r, time: n } = t.payload;
              return (0, mt.mergeIn)(e, [r], {
                active: !0,
                complete: !1,
                start: n,
              });
            }
            case MD: {
              let { instanceId: r } = t.payload;
              if (!e[r]) return e;
              let n = {},
                o = Object.keys(e),
                { length: i } = o;
              for (let a = 0; a < i; a++) {
                let s = o[a];
                s !== r && (n[s] = e[s]);
              }
              return n;
            }
            case qD: {
              let r = e,
                n = Object.keys(e),
                { length: o } = n;
              for (let i = 0; i < o; i++) {
                let a = n[i],
                  s = e[a],
                  u = s.continuous ? kD : VD;
                r = (0, mt.set)(r, a, u(s, t));
              }
              return r;
            }
            default:
              return e;
          }
        });
    });
  var WD,
    HD,
    XD,
    vy,
    gy = me(() => {
      "use strict";
      ke();
      ({
        IX2_RAW_DATA_IMPORTED: WD,
        IX2_SESSION_STOPPED: HD,
        IX2_PARAMETER_CHANGED: XD,
      } = we),
        (vy = (e = {}, t) => {
          switch (t.type) {
            case WD:
              return t.payload.ixParameters || {};
            case HD:
              return {};
            case XD: {
              let { key: r, value: n } = t.payload;
              return (e[r] = n), e;
            }
            default:
              return e;
          }
        });
    });
  var my = {};
  Ge(my, { default: () => jD });
  var hy,
    yy,
    BD,
    jD,
    Ey = me(() => {
      "use strict";
      hy = de(Xo());
      Lf();
      Zf();
      td();
      yy = de(kt());
      py();
      gy();
      ({ ixElements: BD } = yy.IX2ElementsReducer),
        (jD = (0, hy.combineReducers)({
          ixData: Cf,
          ixRequest: Qf,
          ixSession: ed,
          ixElements: BD,
          ixInstances: dy,
          ixParameters: vy,
        }));
    });
  var by = c((zB, _y) => {
    var zD = wt(),
      KD = xe(),
      YD = gt(),
      $D = "[object String]";
    function QD(e) {
      return typeof e == "string" || (!KD(e) && YD(e) && zD(e) == $D);
    }
    _y.exports = QD;
  });
  var Iy = c((KB, Ty) => {
    var ZD = Ea(),
      JD = ZD("length");
    Ty.exports = JD;
  });
  var Oy = c((YB, wy) => {
    var eF = "\\ud800-\\udfff",
      tF = "\\u0300-\\u036f",
      rF = "\\ufe20-\\ufe2f",
      nF = "\\u20d0-\\u20ff",
      iF = tF + rF + nF,
      oF = "\\ufe0e\\ufe0f",
      aF = "\\u200d",
      sF = RegExp("[" + aF + eF + iF + oF + "]");
    function uF(e) {
      return sF.test(e);
    }
    wy.exports = uF;
  });
  var My = c(($B, Py) => {
    var Ay = "\\ud800-\\udfff",
      cF = "\\u0300-\\u036f",
      lF = "\\ufe20-\\ufe2f",
      fF = "\\u20d0-\\u20ff",
      dF = cF + lF + fF,
      pF = "\\ufe0e\\ufe0f",
      vF = "[" + Ay + "]",
      Ka = "[" + dF + "]",
      Ya = "\\ud83c[\\udffb-\\udfff]",
      gF = "(?:" + Ka + "|" + Ya + ")",
      Sy = "[^" + Ay + "]",
      Ry = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      Cy = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      hF = "\\u200d",
      Ly = gF + "?",
      Ny = "[" + pF + "]?",
      yF = "(?:" + hF + "(?:" + [Sy, Ry, Cy].join("|") + ")" + Ny + Ly + ")*",
      mF = Ny + Ly + yF,
      EF = "(?:" + [Sy + Ka + "?", Ka, Ry, Cy, vF].join("|") + ")",
      xy = RegExp(Ya + "(?=" + Ya + ")|" + EF + mF, "g");
    function _F(e) {
      for (var t = (xy.lastIndex = 0); xy.test(e); ) ++t;
      return t;
    }
    Py.exports = _F;
  });
  var Dy = c((QB, qy) => {
    var bF = Iy(),
      TF = Oy(),
      IF = My();
    function wF(e) {
      return TF(e) ? IF(e) : bF(e);
    }
    qy.exports = wF;
  });
  var Gy = c((ZB, Fy) => {
    var OF = Wn(),
      xF = Hn(),
      AF = qt(),
      SF = by(),
      RF = Dy(),
      CF = "[object Map]",
      LF = "[object Set]";
    function NF(e) {
      if (e == null) return 0;
      if (AF(e)) return SF(e) ? RF(e) : e.length;
      var t = xF(e);
      return t == CF || t == LF ? e.size : OF(e).length;
    }
    Fy.exports = NF;
  });
  var ky = c((JB, Uy) => {
    var PF = "Expected a function";
    function MF(e) {
      if (typeof e != "function") throw new TypeError(PF);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    Uy.exports = MF;
  });
  var $a = c((ej, Vy) => {
    var qF = Ot(),
      DF = (function () {
        try {
          var e = qF(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch {}
      })();
    Vy.exports = DF;
  });
  var Qa = c((tj, Hy) => {
    var Wy = $a();
    function FF(e, t, r) {
      t == "__proto__" && Wy
        ? Wy(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
        : (e[t] = r);
    }
    Hy.exports = FF;
  });
  var By = c((rj, Xy) => {
    var GF = Qa(),
      UF = Nn(),
      kF = Object.prototype,
      VF = kF.hasOwnProperty;
    function WF(e, t, r) {
      var n = e[t];
      (!(VF.call(e, t) && UF(n, r)) || (r === void 0 && !(t in e))) &&
        GF(e, t, r);
    }
    Xy.exports = WF;
  });
  var Ky = c((nj, zy) => {
    var HF = By(),
      XF = Xr(),
      BF = Gn(),
      jy = ct(),
      jF = or();
    function zF(e, t, r, n) {
      if (!jy(e)) return e;
      t = XF(t, e);
      for (var o = -1, i = t.length, a = i - 1, s = e; s != null && ++o < i; ) {
        var u = jF(t[o]),
          d = r;
        if (u === "__proto__" || u === "constructor" || u === "prototype")
          return e;
        if (o != a) {
          var g = s[u];
          (d = n ? n(g, u, s) : void 0),
            d === void 0 && (d = jy(g) ? g : BF(t[o + 1]) ? [] : {});
        }
        HF(s, u, d), (s = s[u]);
      }
      return e;
    }
    zy.exports = zF;
  });
  var $y = c((ij, Yy) => {
    var KF = jn(),
      YF = Ky(),
      $F = Xr();
    function QF(e, t, r) {
      for (var n = -1, o = t.length, i = {}; ++n < o; ) {
        var a = t[n],
          s = KF(e, a);
        r(s, a) && YF(i, $F(a, e), s);
      }
      return i;
    }
    Yy.exports = QF;
  });
  var Zy = c((oj, Qy) => {
    var ZF = Dn(),
      JF = Lo(),
      e2 = ia(),
      t2 = na(),
      r2 = Object.getOwnPropertySymbols,
      n2 = r2
        ? function (e) {
            for (var t = []; e; ) ZF(t, e2(e)), (e = JF(e));
            return t;
          }
        : t2;
    Qy.exports = n2;
  });
  var em = c((aj, Jy) => {
    function i2(e) {
      var t = [];
      if (e != null) for (var r in Object(e)) t.push(r);
      return t;
    }
    Jy.exports = i2;
  });
  var rm = c((sj, tm) => {
    var o2 = ct(),
      a2 = Vn(),
      s2 = em(),
      u2 = Object.prototype,
      c2 = u2.hasOwnProperty;
    function l2(e) {
      if (!o2(e)) return s2(e);
      var t = a2(e),
        r = [];
      for (var n in e)
        (n == "constructor" && (t || !c2.call(e, n))) || r.push(n);
      return r;
    }
    tm.exports = l2;
  });
  var im = c((uj, nm) => {
    var f2 = aa(),
      d2 = rm(),
      p2 = qt();
    function v2(e) {
      return p2(e) ? f2(e, !0) : d2(e);
    }
    nm.exports = v2;
  });
  var am = c((cj, om) => {
    var g2 = ra(),
      h2 = Zy(),
      y2 = im();
    function m2(e) {
      return g2(e, y2, h2);
    }
    om.exports = m2;
  });
  var um = c((lj, sm) => {
    var E2 = ma(),
      _2 = xt(),
      b2 = $y(),
      T2 = am();
    function I2(e, t) {
      if (e == null) return {};
      var r = E2(T2(e), function (n) {
        return [n];
      });
      return (
        (t = _2(t)),
        b2(e, r, function (n, o) {
          return t(n, o[0]);
        })
      );
    }
    sm.exports = I2;
  });
  var lm = c((fj, cm) => {
    var w2 = xt(),
      O2 = ky(),
      x2 = um();
    function A2(e, t) {
      return x2(e, O2(w2(t)));
    }
    cm.exports = A2;
  });
  var dm = c((dj, fm) => {
    var S2 = Wn(),
      R2 = Hn(),
      C2 = Gr(),
      L2 = xe(),
      N2 = qt(),
      P2 = Fn(),
      M2 = Vn(),
      q2 = kn(),
      D2 = "[object Map]",
      F2 = "[object Set]",
      G2 = Object.prototype,
      U2 = G2.hasOwnProperty;
    function k2(e) {
      if (e == null) return !0;
      if (
        N2(e) &&
        (L2(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          P2(e) ||
          q2(e) ||
          C2(e))
      )
        return !e.length;
      var t = R2(e);
      if (t == D2 || t == F2) return !e.size;
      if (M2(e)) return !S2(e).length;
      for (var r in e) if (U2.call(e, r)) return !1;
      return !0;
    }
    fm.exports = k2;
  });
  var vm = c((pj, pm) => {
    var V2 = Qa(),
      W2 = Ga(),
      H2 = xt();
    function X2(e, t) {
      var r = {};
      return (
        (t = H2(t, 3)),
        W2(e, function (n, o, i) {
          V2(r, o, t(n, o, i));
        }),
        r
      );
    }
    pm.exports = X2;
  });
  var hm = c((vj, gm) => {
    function B2(e, t) {
      for (
        var r = -1, n = e == null ? 0 : e.length;
        ++r < n && t(e[r], r, e) !== !1;

      );
      return e;
    }
    gm.exports = B2;
  });
  var mm = c((gj, ym) => {
    var j2 = Kn();
    function z2(e) {
      return typeof e == "function" ? e : j2;
    }
    ym.exports = z2;
  });
  var _m = c((hj, Em) => {
    var K2 = hm(),
      Y2 = Ua(),
      $2 = mm(),
      Q2 = xe();
    function Z2(e, t) {
      var r = Q2(e) ? K2 : Y2;
      return r(e, $2(t));
    }
    Em.exports = Z2;
  });
  var Tm = c((yj, bm) => {
    var J2 = Ze(),
      eG = function () {
        return J2.Date.now();
      };
    bm.exports = eG;
  });
  var Om = c((mj, wm) => {
    var tG = ct(),
      Za = Tm(),
      Im = Yn(),
      rG = "Expected a function",
      nG = Math.max,
      iG = Math.min;
    function oG(e, t, r) {
      var n,
        o,
        i,
        a,
        s,
        u,
        d = 0,
        g = !1,
        v = !1,
        y = !0;
      if (typeof e != "function") throw new TypeError(rG);
      (t = Im(t) || 0),
        tG(r) &&
          ((g = !!r.leading),
          (v = "maxWait" in r),
          (i = v ? nG(Im(r.maxWait) || 0, t) : i),
          (y = "trailing" in r ? !!r.trailing : y));
      function m(M) {
        var X = n,
          K = o;
        return (n = o = void 0), (d = M), (a = e.apply(K, X)), a;
      }
      function T(M) {
        return (d = M), (s = setTimeout(S, t)), g ? m(M) : a;
      }
      function I(M) {
        var X = M - u,
          K = M - d,
          Q = t - X;
        return v ? iG(Q, i - K) : Q;
      }
      function D(M) {
        var X = M - u,
          K = M - d;
        return u === void 0 || X >= t || X < 0 || (v && K >= i);
      }
      function S() {
        var M = Za();
        if (D(M)) return L(M);
        s = setTimeout(S, I(M));
      }
      function L(M) {
        return (s = void 0), y && n ? m(M) : ((n = o = void 0), a);
      }
      function C() {
        s !== void 0 && clearTimeout(s), (d = 0), (n = u = o = s = void 0);
      }
      function P() {
        return s === void 0 ? a : L(Za());
      }
      function q() {
        var M = Za(),
          X = D(M);
        if (((n = arguments), (o = this), (u = M), X)) {
          if (s === void 0) return T(u);
          if (v) return clearTimeout(s), (s = setTimeout(S, t)), m(u);
        }
        return s === void 0 && (s = setTimeout(S, t)), a;
      }
      return (q.cancel = C), (q.flush = P), q;
    }
    wm.exports = oG;
  });
  var Am = c((Ej, xm) => {
    var aG = Om(),
      sG = ct(),
      uG = "Expected a function";
    function cG(e, t, r) {
      var n = !0,
        o = !0;
      if (typeof e != "function") throw new TypeError(uG);
      return (
        sG(r) &&
          ((n = "leading" in r ? !!r.leading : n),
          (o = "trailing" in r ? !!r.trailing : o)),
        aG(e, t, { leading: n, maxWait: t, trailing: o })
      );
    }
    xm.exports = cG;
  });
  var Rm = {};
  Ge(Rm, {
    actionListPlaybackChanged: () => yr,
    animationFrameChanged: () => di,
    clearRequested: () => MG,
    elementStateChanged: () => as,
    eventListenerAdded: () => fi,
    eventStateChanged: () => ns,
    instanceAdded: () => is,
    instanceRemoved: () => os,
    instanceStarted: () => pi,
    mediaQueriesDefined: () => us,
    parameterChanged: () => hr,
    playbackRequested: () => NG,
    previewRequested: () => LG,
    rawDataImported: () => Ja,
    sessionInitialized: () => es,
    sessionStarted: () => ts,
    sessionStopped: () => rs,
    stopRequested: () => PG,
    testFrameRendered: () => qG,
    viewportWidthChanged: () => ss,
  });
  var Sm,
    lG,
    fG,
    dG,
    pG,
    vG,
    gG,
    hG,
    yG,
    mG,
    EG,
    _G,
    bG,
    TG,
    IG,
    wG,
    OG,
    xG,
    AG,
    SG,
    RG,
    CG,
    Ja,
    es,
    ts,
    rs,
    LG,
    NG,
    PG,
    MG,
    fi,
    qG,
    ns,
    di,
    hr,
    is,
    pi,
    os,
    as,
    yr,
    ss,
    us,
    vi = me(() => {
      "use strict";
      ke();
      (Sm = de(kt())),
        ({
          IX2_RAW_DATA_IMPORTED: lG,
          IX2_SESSION_INITIALIZED: fG,
          IX2_SESSION_STARTED: dG,
          IX2_SESSION_STOPPED: pG,
          IX2_PREVIEW_REQUESTED: vG,
          IX2_PLAYBACK_REQUESTED: gG,
          IX2_STOP_REQUESTED: hG,
          IX2_CLEAR_REQUESTED: yG,
          IX2_EVENT_LISTENER_ADDED: mG,
          IX2_TEST_FRAME_RENDERED: EG,
          IX2_EVENT_STATE_CHANGED: _G,
          IX2_ANIMATION_FRAME_CHANGED: bG,
          IX2_PARAMETER_CHANGED: TG,
          IX2_INSTANCE_ADDED: IG,
          IX2_INSTANCE_STARTED: wG,
          IX2_INSTANCE_REMOVED: OG,
          IX2_ELEMENT_STATE_CHANGED: xG,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: AG,
          IX2_VIEWPORT_WIDTH_CHANGED: SG,
          IX2_MEDIA_QUERIES_DEFINED: RG,
        } = we),
        ({ reifyState: CG } = Sm.IX2VanillaUtils),
        (Ja = (e) => ({ type: lG, payload: { ...CG(e) } })),
        (es = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
          type: fG,
          payload: { hasBoundaryNodes: e, reducedMotion: t },
        })),
        (ts = () => ({ type: dG })),
        (rs = () => ({ type: pG })),
        (LG = ({ rawData: e, defer: t }) => ({
          type: vG,
          payload: { defer: t, rawData: e },
        })),
        (NG = ({
          actionTypeId: e = Xe.GENERAL_START_ACTION,
          actionListId: t,
          actionItemId: r,
          eventId: n,
          allowEvents: o,
          immediate: i,
          testManual: a,
          verbose: s,
          rawData: u,
        }) => ({
          type: gG,
          payload: {
            actionTypeId: e,
            actionListId: t,
            actionItemId: r,
            testManual: a,
            eventId: n,
            allowEvents: o,
            immediate: i,
            verbose: s,
            rawData: u,
          },
        })),
        (PG = (e) => ({ type: hG, payload: { actionListId: e } })),
        (MG = () => ({ type: yG })),
        (fi = (e, t) => ({
          type: mG,
          payload: { target: e, listenerParams: t },
        })),
        (qG = (e = 1) => ({ type: EG, payload: { step: e } })),
        (ns = (e, t) => ({ type: _G, payload: { stateKey: e, newState: t } })),
        (di = (e, t) => ({ type: bG, payload: { now: e, parameters: t } })),
        (hr = (e, t) => ({ type: TG, payload: { key: e, value: t } })),
        (is = (e) => ({ type: IG, payload: { ...e } })),
        (pi = (e, t) => ({ type: wG, payload: { instanceId: e, time: t } })),
        (os = (e) => ({ type: OG, payload: { instanceId: e } })),
        (as = (e, t, r, n) => ({
          type: xG,
          payload: { elementId: e, actionTypeId: t, current: r, actionItem: n },
        })),
        (yr = ({ actionListId: e, isPlaying: t }) => ({
          type: AG,
          payload: { actionListId: e, isPlaying: t },
        })),
        (ss = ({ width: e, mediaQueries: t }) => ({
          type: SG,
          payload: { width: e, mediaQueries: t },
        })),
        (us = () => ({ type: RG }));
    });
  var qe = {};
  Ge(qe, {
    elementContains: () => fs,
    getChildElements: () => BG,
    getClosestElement: () => tn,
    getProperty: () => kG,
    getQuerySelector: () => ls,
    getRefType: () => ds,
    getSiblingElements: () => jG,
    getStyle: () => UG,
    getValidDocument: () => WG,
    isSiblingNode: () => XG,
    matchSelector: () => VG,
    queryDocument: () => HG,
    setStyle: () => GG,
  });
  function GG(e, t, r) {
    e.style[t] = r;
  }
  function UG(e, t) {
    return e.style[t];
  }
  function kG(e, t) {
    return e[t];
  }
  function VG(e) {
    return (t) => t[cs](e);
  }
  function ls({ id: e, selector: t }) {
    if (e) {
      let r = e;
      if (e.indexOf(Cm) !== -1) {
        let n = e.split(Cm),
          o = n[0];
        if (((r = n[1]), o !== document.documentElement.getAttribute(Nm)))
          return null;
      }
      return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
    }
    return t;
  }
  function WG(e) {
    return e == null || e === document.documentElement.getAttribute(Nm)
      ? document
      : null;
  }
  function HG(e, t) {
    return Array.prototype.slice.call(
      document.querySelectorAll(t ? e + " " + t : e)
    );
  }
  function fs(e, t) {
    return e.contains(t);
  }
  function XG(e, t) {
    return e !== t && e.parentNode === t.parentNode;
  }
  function BG(e) {
    let t = [];
    for (let r = 0, { length: n } = e || []; r < n; r++) {
      let { children: o } = e[r],
        { length: i } = o;
      if (i) for (let a = 0; a < i; a++) t.push(o[a]);
    }
    return t;
  }
  function jG(e = []) {
    let t = [],
      r = [];
    for (let n = 0, { length: o } = e; n < o; n++) {
      let { parentNode: i } = e[n];
      if (!i || !i.children || !i.children.length || r.indexOf(i) !== -1)
        continue;
      r.push(i);
      let a = i.firstElementChild;
      for (; a != null; )
        e.indexOf(a) === -1 && t.push(a), (a = a.nextElementSibling);
    }
    return t;
  }
  function ds(e) {
    return e != null && typeof e == "object"
      ? e instanceof Element
        ? DG
        : FG
      : null;
  }
  var Lm,
    cs,
    Cm,
    DG,
    FG,
    Nm,
    tn,
    Pm = me(() => {
      "use strict";
      Lm = de(kt());
      ke();
      ({ ELEMENT_MATCHES: cs } = Lm.IX2BrowserSupport),
        ({
          IX2_ID_DELIMITER: Cm,
          HTML_ELEMENT: DG,
          PLAIN_OBJECT: FG,
          WF_PAGE: Nm,
        } = Ce);
      tn = Element.prototype.closest
        ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
        : (e, t) => {
            if (!document.documentElement.contains(e)) return null;
            let r = e;
            do {
              if (r[cs] && r[cs](t)) return r;
              r = r.parentNode;
            } while (r != null);
            return null;
          };
    });
  var ps = c((Tj, qm) => {
    var zG = ct(),
      Mm = Object.create,
      KG = (function () {
        function e() {}
        return function (t) {
          if (!zG(t)) return {};
          if (Mm) return Mm(t);
          e.prototype = t;
          var r = new e();
          return (e.prototype = void 0), r;
        };
      })();
    qm.exports = KG;
  });
  var gi = c((Ij, Dm) => {
    function YG() {}
    Dm.exports = YG;
  });
  var yi = c((wj, Fm) => {
    var $G = ps(),
      QG = gi();
    function hi(e, t) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0);
    }
    hi.prototype = $G(QG.prototype);
    hi.prototype.constructor = hi;
    Fm.exports = hi;
  });
  var Vm = c((Oj, km) => {
    var Gm = Kt(),
      ZG = Gr(),
      JG = xe(),
      Um = Gm ? Gm.isConcatSpreadable : void 0;
    function eU(e) {
      return JG(e) || ZG(e) || !!(Um && e && e[Um]);
    }
    km.exports = eU;
  });
  var Xm = c((xj, Hm) => {
    var tU = Dn(),
      rU = Vm();
    function Wm(e, t, r, n, o) {
      var i = -1,
        a = e.length;
      for (r || (r = rU), o || (o = []); ++i < a; ) {
        var s = e[i];
        t > 0 && r(s)
          ? t > 1
            ? Wm(s, t - 1, r, n, o)
            : tU(o, s)
          : n || (o[o.length] = s);
      }
      return o;
    }
    Hm.exports = Wm;
  });
  var jm = c((Aj, Bm) => {
    var nU = Xm();
    function iU(e) {
      var t = e == null ? 0 : e.length;
      return t ? nU(e, 1) : [];
    }
    Bm.exports = iU;
  });
  var Km = c((Sj, zm) => {
    function oU(e, t, r) {
      switch (r.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, r[0]);
        case 2:
          return e.call(t, r[0], r[1]);
        case 3:
          return e.call(t, r[0], r[1], r[2]);
      }
      return e.apply(t, r);
    }
    zm.exports = oU;
  });
  var Qm = c((Rj, $m) => {
    var aU = Km(),
      Ym = Math.max;
    function sU(e, t, r) {
      return (
        (t = Ym(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var n = arguments, o = -1, i = Ym(n.length - t, 0), a = Array(i);
            ++o < i;

          )
            a[o] = n[t + o];
          o = -1;
          for (var s = Array(t + 1); ++o < t; ) s[o] = n[o];
          return (s[t] = r(a)), aU(e, this, s);
        }
      );
    }
    $m.exports = sU;
  });
  var Jm = c((Cj, Zm) => {
    function uU(e) {
      return function () {
        return e;
      };
    }
    Zm.exports = uU;
  });
  var rE = c((Lj, tE) => {
    var cU = Jm(),
      eE = $a(),
      lU = Kn(),
      fU = eE
        ? function (e, t) {
            return eE(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: cU(t),
              writable: !0,
            });
          }
        : lU;
    tE.exports = fU;
  });
  var iE = c((Nj, nE) => {
    var dU = 800,
      pU = 16,
      vU = Date.now;
    function gU(e) {
      var t = 0,
        r = 0;
      return function () {
        var n = vU(),
          o = pU - (n - r);
        if (((r = n), o > 0)) {
          if (++t >= dU) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    nE.exports = gU;
  });
  var aE = c((Pj, oE) => {
    var hU = rE(),
      yU = iE(),
      mU = yU(hU);
    oE.exports = mU;
  });
  var uE = c((Mj, sE) => {
    var EU = jm(),
      _U = Qm(),
      bU = aE();
    function TU(e) {
      return bU(_U(e, void 0, EU), e + "");
    }
    sE.exports = TU;
  });
  var fE = c((qj, lE) => {
    var cE = sa(),
      IU = cE && new cE();
    lE.exports = IU;
  });
  var pE = c((Dj, dE) => {
    function wU() {}
    dE.exports = wU;
  });
  var vs = c((Fj, gE) => {
    var vE = fE(),
      OU = pE(),
      xU = vE
        ? function (e) {
            return vE.get(e);
          }
        : OU;
    gE.exports = xU;
  });
  var yE = c((Gj, hE) => {
    var AU = {};
    hE.exports = AU;
  });
  var gs = c((Uj, EE) => {
    var mE = yE(),
      SU = Object.prototype,
      RU = SU.hasOwnProperty;
    function CU(e) {
      for (
        var t = e.name + "", r = mE[t], n = RU.call(mE, t) ? r.length : 0;
        n--;

      ) {
        var o = r[n],
          i = o.func;
        if (i == null || i == e) return o.name;
      }
      return t;
    }
    EE.exports = CU;
  });
  var Ei = c((kj, _E) => {
    var LU = ps(),
      NU = gi(),
      PU = 4294967295;
    function mi(e) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = PU),
        (this.__views__ = []);
    }
    mi.prototype = LU(NU.prototype);
    mi.prototype.constructor = mi;
    _E.exports = mi;
  });
  var TE = c((Vj, bE) => {
    function MU(e, t) {
      var r = -1,
        n = e.length;
      for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
      return t;
    }
    bE.exports = MU;
  });
  var wE = c((Wj, IE) => {
    var qU = Ei(),
      DU = yi(),
      FU = TE();
    function GU(e) {
      if (e instanceof qU) return e.clone();
      var t = new DU(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = FU(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    IE.exports = GU;
  });
  var AE = c((Hj, xE) => {
    var UU = Ei(),
      OE = yi(),
      kU = gi(),
      VU = xe(),
      WU = gt(),
      HU = wE(),
      XU = Object.prototype,
      BU = XU.hasOwnProperty;
    function _i(e) {
      if (WU(e) && !VU(e) && !(e instanceof UU)) {
        if (e instanceof OE) return e;
        if (BU.call(e, "__wrapped__")) return HU(e);
      }
      return new OE(e);
    }
    _i.prototype = kU.prototype;
    _i.prototype.constructor = _i;
    xE.exports = _i;
  });
  var RE = c((Xj, SE) => {
    var jU = Ei(),
      zU = vs(),
      KU = gs(),
      YU = AE();
    function $U(e) {
      var t = KU(e),
        r = YU[t];
      if (typeof r != "function" || !(t in jU.prototype)) return !1;
      if (e === r) return !0;
      var n = zU(r);
      return !!n && e === n[0];
    }
    SE.exports = $U;
  });
  var PE = c((Bj, NE) => {
    var CE = yi(),
      QU = uE(),
      ZU = vs(),
      hs = gs(),
      JU = xe(),
      LE = RE(),
      ek = "Expected a function",
      tk = 8,
      rk = 32,
      nk = 128,
      ik = 256;
    function ok(e) {
      return QU(function (t) {
        var r = t.length,
          n = r,
          o = CE.prototype.thru;
        for (e && t.reverse(); n--; ) {
          var i = t[n];
          if (typeof i != "function") throw new TypeError(ek);
          if (o && !a && hs(i) == "wrapper") var a = new CE([], !0);
        }
        for (n = a ? n : r; ++n < r; ) {
          i = t[n];
          var s = hs(i),
            u = s == "wrapper" ? ZU(i) : void 0;
          u &&
          LE(u[0]) &&
          u[1] == (nk | tk | rk | ik) &&
          !u[4].length &&
          u[9] == 1
            ? (a = a[hs(u[0])].apply(a, u[3]))
            : (a = i.length == 1 && LE(i) ? a[s]() : a.thru(i));
        }
        return function () {
          var d = arguments,
            g = d[0];
          if (a && d.length == 1 && JU(g)) return a.plant(g).value();
          for (var v = 0, y = r ? t[v].apply(this, d) : g; ++v < r; )
            y = t[v].call(this, y);
          return y;
        };
      });
    }
    NE.exports = ok;
  });
  var qE = c((jj, ME) => {
    var ak = PE(),
      sk = ak();
    ME.exports = sk;
  });
  var FE = c((zj, DE) => {
    function uk(e, t, r) {
      return (
        e === e &&
          (r !== void 0 && (e = e <= r ? e : r),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    DE.exports = uk;
  });
  var UE = c((Kj, GE) => {
    var ck = FE(),
      ys = Yn();
    function lk(e, t, r) {
      return (
        r === void 0 && ((r = t), (t = void 0)),
        r !== void 0 && ((r = ys(r)), (r = r === r ? r : 0)),
        t !== void 0 && ((t = ys(t)), (t = t === t ? t : 0)),
        ck(ys(e), t, r)
      );
    }
    GE.exports = lk;
  });
  var KE,
    YE,
    $E,
    QE,
    fk,
    dk,
    pk,
    vk,
    gk,
    hk,
    yk,
    mk,
    Ek,
    _k,
    bk,
    Tk,
    Ik,
    wk,
    Ok,
    ZE,
    JE,
    xk,
    Ak,
    Sk,
    e_,
    Rk,
    Ck,
    t_,
    Lk,
    ms,
    r_,
    kE,
    VE,
    n_,
    nn,
    Nk,
    dt,
    i_,
    Pk,
    We,
    tt,
    on,
    o_,
    Es,
    WE,
    _s,
    Mk,
    rn,
    qk,
    Dk,
    Fk,
    a_,
    HE,
    Gk,
    XE,
    Uk,
    kk,
    Vk,
    BE,
    bi,
    Ti,
    jE,
    zE,
    s_,
    u_ = me(() => {
      "use strict";
      (KE = de(qE())), (YE = de(zn())), ($E = de(UE()));
      ke();
      bs();
      vi();
      (QE = de(kt())),
        ({
          MOUSE_CLICK: fk,
          MOUSE_SECOND_CLICK: dk,
          MOUSE_DOWN: pk,
          MOUSE_UP: vk,
          MOUSE_OVER: gk,
          MOUSE_OUT: hk,
          DROPDOWN_CLOSE: yk,
          DROPDOWN_OPEN: mk,
          SLIDER_ACTIVE: Ek,
          SLIDER_INACTIVE: _k,
          TAB_ACTIVE: bk,
          TAB_INACTIVE: Tk,
          NAVBAR_CLOSE: Ik,
          NAVBAR_OPEN: wk,
          MOUSE_MOVE: Ok,
          PAGE_SCROLL_DOWN: ZE,
          SCROLL_INTO_VIEW: JE,
          SCROLL_OUT_OF_VIEW: xk,
          PAGE_SCROLL_UP: Ak,
          SCROLLING_IN_VIEW: Sk,
          PAGE_FINISH: e_,
          ECOMMERCE_CART_CLOSE: Rk,
          ECOMMERCE_CART_OPEN: Ck,
          PAGE_START: t_,
          PAGE_SCROLL: Lk,
        } = Je),
        (ms = "COMPONENT_ACTIVE"),
        (r_ = "COMPONENT_INACTIVE"),
        ({ COLON_DELIMITER: kE } = Ce),
        ({ getNamespacedParameterId: VE } = QE.IX2VanillaUtils),
        (n_ = (e) => (t) => typeof t == "object" && e(t) ? !0 : t),
        (nn = n_(({ element: e, nativeEvent: t }) => e === t.target)),
        (Nk = n_(({ element: e, nativeEvent: t }) => e.contains(t.target))),
        (dt = (0, KE.default)([nn, Nk])),
        (i_ = (e, t) => {
          if (t) {
            let { ixData: r } = e.getState(),
              { events: n } = r,
              o = n[t];
            if (o && !Mk[o.eventTypeId]) return o;
          }
          return null;
        }),
        (Pk = ({ store: e, event: t }) => {
          let { action: r } = t,
            { autoStopEventId: n } = r.config;
          return !!i_(e, n);
        }),
        (We = ({ store: e, event: t, element: r, eventStateKey: n }, o) => {
          let { action: i, id: a } = t,
            { actionListId: s, autoStopEventId: u } = i.config,
            d = i_(e, u);
          return (
            d &&
              mr({
                store: e,
                eventId: u,
                eventTarget: r,
                eventStateKey: u + kE + n.split(kE)[1],
                actionListId: (0, YE.default)(d, "action.config.actionListId"),
              }),
            mr({
              store: e,
              eventId: a,
              eventTarget: r,
              eventStateKey: n,
              actionListId: s,
            }),
            an({
              store: e,
              eventId: a,
              eventTarget: r,
              eventStateKey: n,
              actionListId: s,
            }),
            o
          );
        }),
        (tt = (e, t) => (r, n) => e(r, n) === !0 ? t(r, n) : n),
        (on = { handler: tt(dt, We) }),
        (o_ = { ...on, types: [ms, r_].join(" ") }),
        (Es = [
          { target: window, types: "resize orientationchange", throttle: !0 },
          {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0,
          },
        ]),
        (WE = "mouseover mouseout"),
        (_s = { types: Es }),
        (Mk = { PAGE_START: t_, PAGE_FINISH: e_ }),
        (rn = (() => {
          let e = window.pageXOffset !== void 0,
            r =
              document.compatMode === "CSS1Compat"
                ? document.documentElement
                : document.body;
          return () => ({
            scrollLeft: e ? window.pageXOffset : r.scrollLeft,
            scrollTop: e ? window.pageYOffset : r.scrollTop,
            stiffScrollTop: (0, $E.default)(
              e ? window.pageYOffset : r.scrollTop,
              0,
              r.scrollHeight - window.innerHeight
            ),
            scrollWidth: r.scrollWidth,
            scrollHeight: r.scrollHeight,
            clientWidth: r.clientWidth,
            clientHeight: r.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        })()),
        (qk = (e, t) =>
          !(
            e.left > t.right ||
            e.right < t.left ||
            e.top > t.bottom ||
            e.bottom < t.top
          )),
        (Dk = ({ element: e, nativeEvent: t }) => {
          let { type: r, target: n, relatedTarget: o } = t,
            i = e.contains(n);
          if (r === "mouseover" && i) return !0;
          let a = e.contains(o);
          return !!(r === "mouseout" && i && a);
        }),
        (Fk = (e) => {
          let {
              element: t,
              event: { config: r },
            } = e,
            { clientWidth: n, clientHeight: o } = rn(),
            i = r.scrollOffsetValue,
            u = r.scrollOffsetUnit === "PX" ? i : (o * (i || 0)) / 100;
          return qk(t.getBoundingClientRect(), {
            left: 0,
            top: u,
            right: n,
            bottom: o - u,
          });
        }),
        (a_ = (e) => (t, r) => {
          let { type: n } = t.nativeEvent,
            o = [ms, r_].indexOf(n) !== -1 ? n === ms : r.isActive,
            i = { ...r, isActive: o };
          return ((!r || i.isActive !== r.isActive) && e(t, i)) || i;
        }),
        (HE = (e) => (t, r) => {
          let n = { elementHovered: Dk(t) };
          return (
            ((r ? n.elementHovered !== r.elementHovered : n.elementHovered) &&
              e(t, n)) ||
            n
          );
        }),
        (Gk = (e) => (t, r) => {
          let n = { ...r, elementVisible: Fk(t) };
          return (
            ((r ? n.elementVisible !== r.elementVisible : n.elementVisible) &&
              e(t, n)) ||
            n
          );
        }),
        (XE =
          (e) =>
          (t, r = {}) => {
            let { stiffScrollTop: n, scrollHeight: o, innerHeight: i } = rn(),
              {
                event: { config: a, eventTypeId: s },
              } = t,
              { scrollOffsetValue: u, scrollOffsetUnit: d } = a,
              g = d === "PX",
              v = o - i,
              y = Number((n / v).toFixed(2));
            if (r && r.percentTop === y) return r;
            let m = (g ? u : (i * (u || 0)) / 100) / v,
              T,
              I,
              D = 0;
            r &&
              ((T = y > r.percentTop),
              (I = r.scrollingDown !== T),
              (D = I ? y : r.anchorTop));
            let S = s === ZE ? y >= D + m : y <= D - m,
              L = {
                ...r,
                percentTop: y,
                inBounds: S,
                anchorTop: D,
                scrollingDown: T,
              };
            return (r && S && (I || L.inBounds !== r.inBounds) && e(t, L)) || L;
          }),
        (Uk = (e, t) =>
          e.left > t.left &&
          e.left < t.right &&
          e.top > t.top &&
          e.top < t.bottom),
        (kk = (e) => (t, r) => {
          let n = { finished: document.readyState === "complete" };
          return n.finished && !(r && r.finshed) && e(t), n;
        }),
        (Vk = (e) => (t, r) => {
          let n = { started: !0 };
          return r || e(t), n;
        }),
        (BE =
          (e) =>
          (t, r = { clickCount: 0 }) => {
            let n = { clickCount: (r.clickCount % 2) + 1 };
            return (n.clickCount !== r.clickCount && e(t, n)) || n;
          }),
        (bi = (e = !0) => ({
          ...o_,
          handler: tt(
            e ? dt : nn,
            a_((t, r) => (r.isActive ? on.handler(t, r) : r))
          ),
        })),
        (Ti = (e = !0) => ({
          ...o_,
          handler: tt(
            e ? dt : nn,
            a_((t, r) => (r.isActive ? r : on.handler(t, r)))
          ),
        })),
        (jE = {
          ..._s,
          handler: Gk((e, t) => {
            let { elementVisible: r } = t,
              { event: n, store: o } = e,
              { ixData: i } = o.getState(),
              { events: a } = i;
            return !a[n.action.config.autoStopEventId] && t.triggered
              ? t
              : (n.eventTypeId === JE) === r
              ? (We(e), { ...t, triggered: !0 })
              : t;
          }),
        }),
        (zE = 0.05),
        (s_ = {
          [Ek]: bi(),
          [_k]: Ti(),
          [mk]: bi(),
          [yk]: Ti(),
          [wk]: bi(!1),
          [Ik]: Ti(!1),
          [bk]: bi(),
          [Tk]: Ti(),
          [Ck]: { types: "ecommerce-cart-open", handler: tt(dt, We) },
          [Rk]: { types: "ecommerce-cart-close", handler: tt(dt, We) },
          [fk]: {
            types: "click",
            handler: tt(
              dt,
              BE((e, { clickCount: t }) => {
                Pk(e) ? t === 1 && We(e) : We(e);
              })
            ),
          },
          [dk]: {
            types: "click",
            handler: tt(
              dt,
              BE((e, { clickCount: t }) => {
                t === 2 && We(e);
              })
            ),
          },
          [pk]: { ...on, types: "mousedown" },
          [vk]: { ...on, types: "mouseup" },
          [gk]: {
            types: WE,
            handler: tt(
              dt,
              HE((e, t) => {
                t.elementHovered && We(e);
              })
            ),
          },
          [hk]: {
            types: WE,
            handler: tt(
              dt,
              HE((e, t) => {
                t.elementHovered || We(e);
              })
            ),
          },
          [Ok]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: r,
                nativeEvent: n,
                eventStateKey: o,
              },
              i = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
            ) => {
              let {
                  basedOn: a,
                  selectedAxis: s,
                  continuousParameterGroupId: u,
                  reverse: d,
                  restingState: g = 0,
                } = r,
                {
                  clientX: v = i.clientX,
                  clientY: y = i.clientY,
                  pageX: m = i.pageX,
                  pageY: T = i.pageY,
                } = n,
                I = s === "X_AXIS",
                D = n.type === "mouseout",
                S = g / 100,
                L = u,
                C = !1;
              switch (a) {
                case ut.VIEWPORT: {
                  S = I
                    ? Math.min(v, window.innerWidth) / window.innerWidth
                    : Math.min(y, window.innerHeight) / window.innerHeight;
                  break;
                }
                case ut.PAGE: {
                  let {
                    scrollLeft: P,
                    scrollTop: q,
                    scrollWidth: M,
                    scrollHeight: X,
                  } = rn();
                  S = I ? Math.min(P + m, M) / M : Math.min(q + T, X) / X;
                  break;
                }
                case ut.ELEMENT:
                default: {
                  L = VE(o, u);
                  let P = n.type.indexOf("mouse") === 0;
                  if (P && dt({ element: t, nativeEvent: n }) !== !0) break;
                  let q = t.getBoundingClientRect(),
                    { left: M, top: X, width: K, height: Q } = q;
                  if (!P && !Uk({ left: v, top: y }, q)) break;
                  (C = !0), (S = I ? (v - M) / K : (y - X) / Q);
                  break;
                }
              }
              return (
                D && (S > 1 - zE || S < zE) && (S = Math.round(S)),
                (a !== ut.ELEMENT || C || C !== i.elementHovered) &&
                  ((S = d ? 1 - S : S), e.dispatch(hr(L, S))),
                {
                  elementHovered: C,
                  clientX: v,
                  clientY: y,
                  pageX: m,
                  pageY: T,
                }
              );
            },
          },
          [Lk]: {
            types: Es,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: r, reverse: n } = t,
                { scrollTop: o, scrollHeight: i, clientHeight: a } = rn(),
                s = o / (i - a);
              (s = n ? 1 - s : s), e.dispatch(hr(r, s));
            },
          },
          [Sk]: {
            types: Es,
            handler: (
              { element: e, store: t, eventConfig: r, eventStateKey: n },
              o = { scrollPercent: 0 }
            ) => {
              let {
                  scrollLeft: i,
                  scrollTop: a,
                  scrollWidth: s,
                  scrollHeight: u,
                  clientHeight: d,
                } = rn(),
                {
                  basedOn: g,
                  selectedAxis: v,
                  continuousParameterGroupId: y,
                  startsEntering: m,
                  startsExiting: T,
                  addEndOffset: I,
                  addStartOffset: D,
                  addOffsetValue: S = 0,
                  endOffsetValue: L = 0,
                } = r,
                C = v === "X_AXIS";
              if (g === ut.VIEWPORT) {
                let P = C ? i / s : a / u;
                return (
                  P !== o.scrollPercent && t.dispatch(hr(y, P)),
                  { scrollPercent: P }
                );
              } else {
                let P = VE(n, y),
                  q = e.getBoundingClientRect(),
                  M = (D ? S : 0) / 100,
                  X = (I ? L : 0) / 100;
                (M = m ? M : 1 - M), (X = T ? X : 1 - X);
                let K = q.top + Math.min(q.height * M, d),
                  ee = q.top + q.height * X - K,
                  te = Math.min(d + ee, u),
                  x = Math.min(Math.max(0, d - K), te) / te;
                return (
                  x !== o.scrollPercent && t.dispatch(hr(P, x)),
                  { scrollPercent: x }
                );
              }
            },
          },
          [JE]: jE,
          [xk]: jE,
          [ZE]: {
            ..._s,
            handler: XE((e, t) => {
              t.scrollingDown && We(e);
            }),
          },
          [Ak]: {
            ..._s,
            handler: XE((e, t) => {
              t.scrollingDown || We(e);
            }),
          },
          [e_]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: tt(nn, kk(We)),
          },
          [t_]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: tt(nn, Vk(We)),
          },
        });
    });
  var O_ = {};
  Ge(O_, {
    observeRequests: () => sV,
    startActionGroup: () => an,
    startEngine: () => Si,
    stopActionGroup: () => mr,
    stopAllActionGroups: () => T_,
    stopEngine: () => Ri,
  });
  function sV(e) {
    Vt({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: lV }),
      Vt({ store: e, select: ({ ixRequest: t }) => t.playback, onChange: fV }),
      Vt({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: dV }),
      Vt({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: pV });
  }
  function uV(e) {
    Vt({
      store: e,
      select: ({ ixSession: t }) => t.mediaQueryKey,
      onChange: () => {
        Ri(e),
          m_({ store: e, elementApi: qe }),
          Si({ store: e, allowEvents: !0 }),
          E_();
      },
    });
  }
  function cV(e, t) {
    let r = Vt({
      store: e,
      select: ({ ixSession: n }) => n.tick,
      onChange: (n) => {
        t(n), r();
      },
    });
  }
  function lV({ rawData: e, defer: t }, r) {
    let n = () => {
      Si({ store: r, rawData: e, allowEvents: !0 }), E_();
    };
    t ? setTimeout(n, 0) : n();
  }
  function E_() {
    document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
  }
  function fV(e, t) {
    let {
        actionTypeId: r,
        actionListId: n,
        actionItemId: o,
        eventId: i,
        allowEvents: a,
        immediate: s,
        testManual: u,
        verbose: d = !0,
      } = e,
      { rawData: g } = e;
    if (n && o && g && s) {
      let v = g.actionLists[n];
      v && (g = $k({ actionList: v, actionItemId: o, rawData: g }));
    }
    if (
      (Si({ store: t, rawData: g, allowEvents: a, testManual: u }),
      (n && r === Xe.GENERAL_START_ACTION) || Ts(r))
    ) {
      mr({ store: t, actionListId: n }),
        b_({ store: t, actionListId: n, eventId: i });
      let v = an({
        store: t,
        eventId: i,
        actionListId: n,
        immediate: s,
        verbose: d,
      });
      d && v && t.dispatch(yr({ actionListId: n, isPlaying: !s }));
    }
  }
  function dV({ actionListId: e }, t) {
    e ? mr({ store: t, actionListId: e }) : T_({ store: t }), Ri(t);
  }
  function pV(e, t) {
    Ri(t), m_({ store: t, elementApi: qe });
  }
  function Si({ store: e, rawData: t, allowEvents: r, testManual: n }) {
    let { ixSession: o } = e.getState();
    t && e.dispatch(Ja(t)),
      o.active ||
        (e.dispatch(
          es({
            hasBoundaryNodes: !!document.querySelector(wi),
            reducedMotion:
              document.body.hasAttribute("data-wf-ix-vacation") &&
              window.matchMedia("(prefers-reduced-motion)").matches,
          })
        ),
        r &&
          (EV(e), vV(), e.getState().ixSession.hasDefinedMediaQueries && uV(e)),
        e.dispatch(ts()),
        gV(e, n));
  }
  function vV() {
    let { documentElement: e } = document;
    e.className.indexOf(c_) === -1 && (e.className += ` ${c_}`);
  }
  function gV(e, t) {
    let r = (n) => {
      let { ixSession: o, ixParameters: i } = e.getState();
      o.active &&
        (e.dispatch(di(n, i)), t ? cV(e, r) : requestAnimationFrame(r));
    };
    r(window.performance.now());
  }
  function Ri(e) {
    let { ixSession: t } = e.getState();
    if (t.active) {
      let { eventListeners: r } = t;
      r.forEach(hV), eV(), e.dispatch(rs());
    }
  }
  function hV({ target: e, listenerParams: t }) {
    e.removeEventListener.apply(e, t);
  }
  function yV({
    store: e,
    eventStateKey: t,
    eventTarget: r,
    eventId: n,
    eventConfig: o,
    actionListId: i,
    parameterGroup: a,
    smoothing: s,
    restingValue: u,
  }) {
    let { ixData: d, ixSession: g } = e.getState(),
      { events: v } = d,
      y = v[n],
      { eventTypeId: m } = y,
      T = {},
      I = {},
      D = [],
      { continuousActionGroups: S } = a,
      { id: L } = a;
    Qk(m, o) && (L = Zk(t, L));
    let C = g.hasBoundaryNodes && r ? tn(r, wi) : null;
    S.forEach((P) => {
      let { keyframe: q, actionItems: M } = P;
      M.forEach((X) => {
        let { actionTypeId: K } = X,
          { target: Q } = X.config;
        if (!Q) return;
        let ee = Q.boundaryMode ? C : null,
          te = tV(Q) + Is + K;
        if (((I[te] = mV(I[te], q, X)), !T[te])) {
          T[te] = !0;
          let { config: U } = X;
          Oi({
            config: U,
            event: y,
            eventTarget: r,
            elementRoot: ee,
            elementApi: qe,
          }).forEach((x) => {
            D.push({ element: x, key: te });
          });
        }
      });
    }),
      D.forEach(({ element: P, key: q }) => {
        let M = I[q],
          X = (0, Et.default)(M, "[0].actionItems[0]", {}),
          { actionTypeId: K } = X,
          Q = Ai(K) ? Os(K)(P, X) : null,
          ee = ws({ element: P, actionItem: X, elementApi: qe }, Q);
        xs({
          store: e,
          element: P,
          eventId: n,
          actionListId: i,
          actionItem: X,
          destination: ee,
          continuous: !0,
          parameterId: L,
          actionGroups: M,
          smoothing: s,
          restingValue: u,
          pluginInstance: Q,
        });
      });
  }
  function mV(e = [], t, r) {
    let n = [...e],
      o;
    return (
      n.some((i, a) => (i.keyframe === t ? ((o = a), !0) : !1)),
      o == null && ((o = n.length), n.push({ keyframe: t, actionItems: [] })),
      n[o].actionItems.push(r),
      n
    );
  }
  function EV(e) {
    let { ixData: t } = e.getState(),
      { eventTypeMap: r } = t;
    __(e),
      (0, Er.default)(r, (o, i) => {
        let a = s_[i];
        if (!a) {
          console.warn(`IX2 event type not configured: ${i}`);
          return;
        }
        OV({ logic: a, store: e, events: o });
      });
    let { ixSession: n } = e.getState();
    n.eventListeners.length && bV(e);
  }
  function bV(e) {
    let t = () => {
      __(e);
    };
    _V.forEach((r) => {
      window.addEventListener(r, t), e.dispatch(fi(window, [r, t]));
    }),
      t();
  }
  function __(e) {
    let { ixSession: t, ixData: r } = e.getState(),
      n = window.innerWidth;
    if (n !== t.viewportWidth) {
      let { mediaQueries: o } = r;
      e.dispatch(ss({ width: n, mediaQueries: o }));
    }
  }
  function OV({ logic: e, store: t, events: r }) {
    xV(r);
    let { types: n, handler: o } = e,
      { ixData: i } = t.getState(),
      { actionLists: a } = i,
      s = TV(r, wV);
    if (!(0, d_.default)(s)) return;
    (0, Er.default)(s, (v, y) => {
      let m = r[y],
        { action: T, id: I, mediaQueries: D = i.mediaQueryKeys } = m,
        { actionListId: S } = T.config;
      rV(D, i.mediaQueryKeys) || t.dispatch(us()),
        T.actionTypeId === Xe.GENERAL_CONTINUOUS_ACTION &&
          (Array.isArray(m.config) ? m.config : [m.config]).forEach((C) => {
            let { continuousParameterGroupId: P } = C,
              q = (0, Et.default)(a, `${S}.continuousParameterGroups`, []),
              M = (0, f_.default)(q, ({ id: Q }) => Q === P),
              X = (C.smoothing || 0) / 100,
              K = (C.restingState || 0) / 100;
            M &&
              v.forEach((Q, ee) => {
                let te = I + Is + ee;
                yV({
                  store: t,
                  eventStateKey: te,
                  eventTarget: Q,
                  eventId: I,
                  eventConfig: C,
                  actionListId: S,
                  parameterGroup: M,
                  smoothing: X,
                  restingValue: K,
                });
              });
          }),
        (T.actionTypeId === Xe.GENERAL_START_ACTION || Ts(T.actionTypeId)) &&
          b_({ store: t, actionListId: S, eventId: I });
    });
    let u = (v) => {
        let { ixSession: y } = t.getState();
        IV(s, (m, T, I) => {
          let D = r[T],
            S = y.eventState[I],
            { action: L, mediaQueries: C = i.mediaQueryKeys } = D;
          if (!xi(C, y.mediaQueryKey)) return;
          let P = (q = {}) => {
            let M = o(
              {
                store: t,
                element: m,
                event: D,
                eventConfig: q,
                nativeEvent: v,
                eventStateKey: I,
              },
              S
            );
            nV(M, S) || t.dispatch(ns(I, M));
          };
          L.actionTypeId === Xe.GENERAL_CONTINUOUS_ACTION
            ? (Array.isArray(D.config) ? D.config : [D.config]).forEach(P)
            : P();
        });
      },
      d = (0, h_.default)(u, aV),
      g = ({ target: v = document, types: y, throttle: m }) => {
        y.split(" ")
          .filter(Boolean)
          .forEach((T) => {
            let I = m ? d : u;
            v.addEventListener(T, I), t.dispatch(fi(v, [T, I]));
          });
      };
    Array.isArray(n) ? n.forEach(g) : typeof n == "string" && g(e);
  }
  function xV(e) {
    if (!oV) return;
    let t = {},
      r = "";
    for (let n in e) {
      let { eventTypeId: o, target: i } = e[n],
        a = ls(i);
      t[a] ||
        ((o === Je.MOUSE_CLICK || o === Je.MOUSE_SECOND_CLICK) &&
          ((t[a] = !0),
          (r += a + "{cursor: pointer;touch-action: manipulation;}")));
    }
    if (r) {
      let n = document.createElement("style");
      (n.textContent = r), document.body.appendChild(n);
    }
  }
  function b_({ store: e, actionListId: t, eventId: r }) {
    let { ixData: n, ixSession: o } = e.getState(),
      { actionLists: i, events: a } = n,
      s = a[r],
      u = i[t];
    if (u && u.useFirstGroupAsInitialState) {
      let d = (0, Et.default)(u, "actionItemGroups[0].actionItems", []),
        g = (0, Et.default)(s, "mediaQueries", n.mediaQueryKeys);
      if (!xi(g, o.mediaQueryKey)) return;
      d.forEach((v) => {
        let { config: y, actionTypeId: m } = v,
          T =
            y?.target?.useEventTarget === !0 && y?.target?.objectId == null
              ? { target: s.target, targets: s.targets }
              : y,
          I = Oi({ config: T, event: s, elementApi: qe }),
          D = Ai(m);
        I.forEach((S) => {
          let L = D ? Os(m)(S, v) : null;
          xs({
            destination: ws({ element: S, actionItem: v, elementApi: qe }, L),
            immediate: !0,
            store: e,
            element: S,
            eventId: r,
            actionItem: v,
            actionListId: t,
            pluginInstance: L,
          });
        });
      });
    }
  }
  function T_({ store: e }) {
    let { ixInstances: t } = e.getState();
    (0, Er.default)(t, (r) => {
      if (!r.continuous) {
        let { actionListId: n, verbose: o } = r;
        As(r, e), o && e.dispatch(yr({ actionListId: n, isPlaying: !1 }));
      }
    });
  }
  function mr({
    store: e,
    eventId: t,
    eventTarget: r,
    eventStateKey: n,
    actionListId: o,
  }) {
    let { ixInstances: i, ixSession: a } = e.getState(),
      s = a.hasBoundaryNodes && r ? tn(r, wi) : null;
    (0, Er.default)(i, (u) => {
      let d = (0, Et.default)(u, "actionItem.config.target.boundaryMode"),
        g = n ? u.eventStateKey === n : !0;
      if (u.actionListId === o && u.eventId === t && g) {
        if (s && d && !fs(s, u.element)) return;
        As(u, e),
          u.verbose && e.dispatch(yr({ actionListId: o, isPlaying: !1 }));
      }
    });
  }
  function an({
    store: e,
    eventId: t,
    eventTarget: r,
    eventStateKey: n,
    actionListId: o,
    groupIndex: i = 0,
    immediate: a,
    verbose: s,
  }) {
    let { ixData: u, ixSession: d } = e.getState(),
      { events: g } = u,
      v = g[t] || {},
      { mediaQueries: y = u.mediaQueryKeys } = v,
      m = (0, Et.default)(u, `actionLists.${o}`, {}),
      { actionItemGroups: T, useFirstGroupAsInitialState: I } = m;
    if (!T || !T.length) return !1;
    i >= T.length && (0, Et.default)(v, "config.loop") && (i = 0),
      i === 0 && I && i++;
    let S =
        (i === 0 || (i === 1 && I)) && Ts(v.action?.actionTypeId)
          ? v.config.delay
          : void 0,
      L = (0, Et.default)(T, [i, "actionItems"], []);
    if (!L.length || !xi(y, d.mediaQueryKey)) return !1;
    let C = d.hasBoundaryNodes && r ? tn(r, wi) : null,
      P = zk(L),
      q = !1;
    return (
      L.forEach((M, X) => {
        let { config: K, actionTypeId: Q } = M,
          ee = Ai(Q),
          { target: te } = K;
        if (!te) return;
        let U = te.boundaryMode ? C : null;
        Oi({
          config: K,
          event: v,
          eventTarget: r,
          elementRoot: U,
          elementApi: qe,
        }).forEach((F, B) => {
          let H = ee ? Os(Q)(F, M) : null,
            re = ee ? iV(Q)(F, M) : null;
          q = !0;
          let ne = P === X && B === 0,
            k = Kk({ element: F, actionItem: M }),
            Y = ws({ element: F, actionItem: M, elementApi: qe }, H);
          xs({
            store: e,
            element: F,
            actionItem: M,
            eventId: t,
            eventTarget: r,
            eventStateKey: n,
            actionListId: o,
            groupIndex: i,
            isCarrier: ne,
            computedStyle: k,
            destination: Y,
            immediate: a,
            verbose: s,
            pluginInstance: H,
            pluginDuration: re,
            instanceDelay: S,
          });
        });
      }),
      q
    );
  }
  function xs(e) {
    let { store: t, computedStyle: r, ...n } = e,
      {
        element: o,
        actionItem: i,
        immediate: a,
        pluginInstance: s,
        continuous: u,
        restingValue: d,
        eventId: g,
      } = n,
      v = !u,
      y = Bk(),
      { ixElements: m, ixSession: T, ixData: I } = t.getState(),
      D = Xk(m, o),
      { refState: S } = m[D] || {},
      L = ds(o),
      C = T.reducedMotion && Ko[i.actionTypeId],
      P;
    if (C && u)
      switch (I.events[g]?.eventTypeId) {
        case Je.MOUSE_MOVE:
        case Je.MOUSE_MOVE_IN_VIEWPORT:
          P = d;
          break;
        default:
          P = 0.5;
          break;
      }
    let q = Yk(o, S, r, i, qe, s);
    if (
      (t.dispatch(
        is({
          instanceId: y,
          elementId: D,
          origin: q,
          refType: L,
          skipMotion: C,
          skipToValue: P,
          ...n,
        })
      ),
      I_(document.body, "ix2-animation-started", y),
      a)
    ) {
      AV(t, y);
      return;
    }
    Vt({ store: t, select: ({ ixInstances: M }) => M[y], onChange: w_ }),
      v && t.dispatch(pi(y, T.tick));
  }
  function As(e, t) {
    I_(document.body, "ix2-animation-stopping", {
      instanceId: e.id,
      state: t.getState(),
    });
    let { elementId: r, actionItem: n } = e,
      { ixElements: o } = t.getState(),
      { ref: i, refType: a } = o[r] || {};
    a === y_ && Jk(i, n, qe), t.dispatch(os(e.id));
  }
  function I_(e, t, r) {
    let n = document.createEvent("CustomEvent");
    n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n);
  }
  function AV(e, t) {
    let { ixParameters: r } = e.getState();
    e.dispatch(pi(t, 0)), e.dispatch(di(performance.now(), r));
    let { ixInstances: n } = e.getState();
    w_(n[t], e);
  }
  function w_(e, t) {
    let {
        active: r,
        continuous: n,
        complete: o,
        elementId: i,
        actionItem: a,
        actionTypeId: s,
        renderType: u,
        current: d,
        groupIndex: g,
        eventId: v,
        eventTarget: y,
        eventStateKey: m,
        actionListId: T,
        isCarrier: I,
        styleProp: D,
        verbose: S,
        pluginInstance: L,
      } = e,
      { ixData: C, ixSession: P } = t.getState(),
      { events: q } = C,
      M = q[v] || {},
      { mediaQueries: X = C.mediaQueryKeys } = M;
    if (xi(X, P.mediaQueryKey) && (n || r || o)) {
      if (d || (u === Hk && o)) {
        t.dispatch(as(i, s, d, a));
        let { ixElements: K } = t.getState(),
          { ref: Q, refType: ee, refState: te } = K[i] || {},
          U = te && te[s];
        (ee === y_ || Ai(s)) && jk(Q, te, U, v, a, D, qe, u, L);
      }
      if (o) {
        if (I) {
          let K = an({
            store: t,
            eventId: v,
            eventTarget: y,
            eventStateKey: m,
            actionListId: T,
            groupIndex: g + 1,
            verbose: S,
          });
          S && !K && t.dispatch(yr({ actionListId: T, isPlaying: !1 }));
        }
        As(e, t);
      }
    }
  }
  var f_,
    Et,
    d_,
    p_,
    v_,
    g_,
    Er,
    h_,
    Ii,
    Wk,
    Ts,
    Is,
    wi,
    y_,
    Hk,
    c_,
    Oi,
    Xk,
    ws,
    Vt,
    Bk,
    jk,
    m_,
    zk,
    Kk,
    Yk,
    $k,
    Qk,
    Zk,
    xi,
    Jk,
    eV,
    tV,
    rV,
    nV,
    Ai,
    Os,
    iV,
    l_,
    oV,
    aV,
    _V,
    TV,
    IV,
    wV,
    bs = me(() => {
      "use strict";
      (f_ = de(Ia())),
        (Et = de(zn())),
        (d_ = de(Gy())),
        (p_ = de(lm())),
        (v_ = de(dm())),
        (g_ = de(vm())),
        (Er = de(_m())),
        (h_ = de(Am()));
      ke();
      Ii = de(kt());
      vi();
      Pm();
      u_();
      (Wk = Object.keys(jo)),
        (Ts = (e) => Wk.includes(e)),
        ({
          COLON_DELIMITER: Is,
          BOUNDARY_SELECTOR: wi,
          HTML_ELEMENT: y_,
          RENDER_GENERAL: Hk,
          W_MOD_IX: c_,
        } = Ce),
        ({
          getAffectedElements: Oi,
          getElementId: Xk,
          getDestinationValues: ws,
          observeStore: Vt,
          getInstanceId: Bk,
          renderHTMLElement: jk,
          clearAllStyles: m_,
          getMaxDurationItemIndex: zk,
          getComputedStyle: Kk,
          getInstanceOrigin: Yk,
          reduceListToGroup: $k,
          shouldNamespaceEventParameter: Qk,
          getNamespacedParameterId: Zk,
          shouldAllowMediaQuery: xi,
          cleanupHTMLElement: Jk,
          clearObjectCache: eV,
          stringifyTarget: tV,
          mediaQueriesEqual: rV,
          shallowEqual: nV,
        } = Ii.IX2VanillaUtils),
        ({
          isPluginType: Ai,
          createPluginInstance: Os,
          getPluginDuration: iV,
        } = Ii.IX2VanillaPlugins),
        (l_ = navigator.userAgent),
        (oV = l_.match(/iPad/i) || l_.match(/iPhone/)),
        (aV = 12);
      _V = ["resize", "orientationchange"];
      (TV = (e, t) => (0, p_.default)((0, g_.default)(e, t), v_.default)),
        (IV = (e, t) => {
          (0, Er.default)(e, (r, n) => {
            r.forEach((o, i) => {
              let a = n + Is + i;
              t(o, n, a);
            });
          });
        }),
        (wV = (e) => {
          let t = { target: e.target, targets: e.targets };
          return Oi({ config: t, elementApi: qe });
        });
    });
  var A_ = c((_t) => {
    "use strict";
    var SV = vn().default,
      RV = uu().default;
    Object.defineProperty(_t, "__esModule", { value: !0 });
    _t.actions = void 0;
    _t.destroy = x_;
    _t.init = MV;
    _t.setEnv = PV;
    _t.store = void 0;
    zl();
    var CV = Xo(),
      LV = RV((Ey(), it(my))),
      Ss = (bs(), it(O_)),
      NV = SV((vi(), it(Rm)));
    _t.actions = NV;
    var Rs = (_t.store = (0, CV.createStore)(LV.default));
    function PV(e) {
      e() && (0, Ss.observeRequests)(Rs);
    }
    function MV(e) {
      x_(), (0, Ss.startEngine)({ store: Rs, rawData: e, allowEvents: !0 });
    }
    function x_() {
      (0, Ss.stopEngine)(Rs);
    }
  });
  var L_ = c((nz, C_) => {
    "use strict";
    var S_ = Ue(),
      R_ = A_();
    R_.setEnv(S_.env);
    S_.define(
      "ix2",
      (C_.exports = function () {
        return R_;
      })
    );
  });
  var P_ = c((iz, N_) => {
    "use strict";
    var _r = Ue();
    _r.define(
      "links",
      (N_.exports = function (e, t) {
        var r = {},
          n = e(window),
          o,
          i = _r.env(),
          a = window.location,
          s = document.createElement("a"),
          u = "w--current",
          d = /index\.(html|php)$/,
          g = /\/$/,
          v,
          y;
        r.ready = r.design = r.preview = m;
        function m() {
          (o = i && _r.env("design")),
            (y = _r.env("slug") || a.pathname || ""),
            _r.scroll.off(I),
            (v = []);
          for (var S = document.links, L = 0; L < S.length; ++L) T(S[L]);
          v.length && (_r.scroll.on(I), I());
        }
        function T(S) {
          var L =
            (o && S.getAttribute("href-disabled")) || S.getAttribute("href");
          if (((s.href = L), !(L.indexOf(":") >= 0))) {
            var C = e(S);
            if (
              s.hash.length > 1 &&
              s.host + s.pathname === a.host + a.pathname
            ) {
              if (!/^#[a-zA-Z0-9\-\_]+$/.test(s.hash)) return;
              var P = e(s.hash);
              P.length && v.push({ link: C, sec: P, active: !1 });
              return;
            }
            if (!(L === "#" || L === "")) {
              var q = s.href === a.href || L === y || (d.test(L) && g.test(y));
              D(C, u, q);
            }
          }
        }
        function I() {
          var S = n.scrollTop(),
            L = n.height();
          t.each(v, function (C) {
            var P = C.link,
              q = C.sec,
              M = q.offset().top,
              X = q.outerHeight(),
              K = L * 0.5,
              Q = q.is(":visible") && M + X - K >= S && M + K <= S + L;
            C.active !== Q && ((C.active = Q), D(P, u, Q));
          });
        }
        function D(S, L, C) {
          var P = S.hasClass(L);
          (C && P) || (!C && !P) || (C ? S.addClass(L) : S.removeClass(L));
        }
        return r;
      })
    );
  });
  var q_ = c((oz, M_) => {
    "use strict";
    var Ci = Ue();
    Ci.define(
      "scroll",
      (M_.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          r = window.location,
          n = T() ? null : window.history,
          o = e(window),
          i = e(document),
          a = e(document.body),
          s =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (U) {
              window.setTimeout(U, 15);
            },
          u = Ci.env("editor") ? ".w-editor-body" : "body",
          d =
            "header, " +
            u +
            " > .header, " +
            u +
            " > .w-nav:not([data-no-scroll])",
          g = 'a[href="#"]',
          v = 'a[href*="#"]:not(.w-tab-link):not(' + g + ")",
          y = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          m = document.createElement("style");
        m.appendChild(document.createTextNode(y));
        function T() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var I = /^#[a-zA-Z0-9][\w:.-]*$/;
        function D(U) {
          return I.test(U.hash) && U.host + U.pathname === r.host + r.pathname;
        }
        let S =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function L() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            S.matches
          );
        }
        function C(U, x) {
          var F;
          switch (x) {
            case "add":
              (F = U.attr("tabindex")),
                F
                  ? U.attr("data-wf-tabindex-swap", F)
                  : U.attr("tabindex", "-1");
              break;
            case "remove":
              (F = U.attr("data-wf-tabindex-swap")),
                F
                  ? (U.attr("tabindex", F),
                    U.removeAttr("data-wf-tabindex-swap"))
                  : U.removeAttr("tabindex");
              break;
          }
          U.toggleClass("wf-force-outline-none", x === "add");
        }
        function P(U) {
          var x = U.currentTarget;
          if (
            !(
              Ci.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(x.className))
            )
          ) {
            var F = D(x) ? x.hash : "";
            if (F !== "") {
              var B = e(F);
              B.length &&
                (U && (U.preventDefault(), U.stopPropagation()),
                q(F, U),
                window.setTimeout(
                  function () {
                    M(B, function () {
                      C(B, "add"),
                        B.get(0).focus({ preventScroll: !0 }),
                        C(B, "remove");
                    });
                  },
                  U ? 0 : 300
                ));
            }
          }
        }
        function q(U) {
          if (
            r.hash !== U &&
            n &&
            n.pushState &&
            !(Ci.env.chrome && r.protocol === "file:")
          ) {
            var x = n.state && n.state.hash;
            x !== U && n.pushState({ hash: U }, "", U);
          }
        }
        function M(U, x) {
          var F = o.scrollTop(),
            B = X(U);
          if (F !== B) {
            var H = K(U, F, B),
              re = Date.now(),
              ne = function () {
                var k = Date.now() - re;
                window.scroll(0, Q(F, B, k, H)),
                  k <= H ? s(ne) : typeof x == "function" && x();
              };
            s(ne);
          }
        }
        function X(U) {
          var x = e(d),
            F = x.css("position") === "fixed" ? x.outerHeight() : 0,
            B = U.offset().top - F;
          if (U.data("scroll") === "mid") {
            var H = o.height() - F,
              re = U.outerHeight();
            re < H && (B -= Math.round((H - re) / 2));
          }
          return B;
        }
        function K(U, x, F) {
          if (L()) return 0;
          var B = 1;
          return (
            a.add(U).each(function (H, re) {
              var ne = parseFloat(re.getAttribute("data-scroll-time"));
              !isNaN(ne) && ne >= 0 && (B = ne);
            }),
            (472.143 * Math.log(Math.abs(x - F) + 125) - 2e3) * B
          );
        }
        function Q(U, x, F, B) {
          return F > B ? x : U + (x - U) * ee(F / B);
        }
        function ee(U) {
          return U < 0.5
            ? 4 * U * U * U
            : (U - 1) * (2 * U - 2) * (2 * U - 2) + 1;
        }
        function te() {
          var { WF_CLICK_EMPTY: U, WF_CLICK_SCROLL: x } = t;
          i.on(x, v, P),
            i.on(U, g, function (F) {
              F.preventDefault();
            }),
            document.head.insertBefore(m, document.head.firstChild);
        }
        return { ready: te };
      })
    );
  });
  var F_ = c((az, D_) => {
    "use strict";
    var qV = Ue();
    qV.define(
      "touch",
      (D_.exports = function (e) {
        var t = {},
          r = window.getSelection;
        (e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (i) {
            return (
              (i = typeof i == "string" ? e(i).get(0) : i), i ? new n(i) : null
            );
          });
        function n(i) {
          var a = !1,
            s = !1,
            u = Math.min(Math.round(window.innerWidth * 0.04), 40),
            d,
            g;
          i.addEventListener("touchstart", v, !1),
            i.addEventListener("touchmove", y, !1),
            i.addEventListener("touchend", m, !1),
            i.addEventListener("touchcancel", T, !1),
            i.addEventListener("mousedown", v, !1),
            i.addEventListener("mousemove", y, !1),
            i.addEventListener("mouseup", m, !1),
            i.addEventListener("mouseout", T, !1);
          function v(D) {
            var S = D.touches;
            (S && S.length > 1) ||
              ((a = !0),
              S ? ((s = !0), (d = S[0].clientX)) : (d = D.clientX),
              (g = d));
          }
          function y(D) {
            if (a) {
              if (s && D.type === "mousemove") {
                D.preventDefault(), D.stopPropagation();
                return;
              }
              var S = D.touches,
                L = S ? S[0].clientX : D.clientX,
                C = L - g;
              (g = L),
                Math.abs(C) > u &&
                  r &&
                  String(r()) === "" &&
                  (o("swipe", D, { direction: C > 0 ? "right" : "left" }), T());
            }
          }
          function m(D) {
            if (a && ((a = !1), s && D.type === "mouseup")) {
              D.preventDefault(), D.stopPropagation(), (s = !1);
              return;
            }
          }
          function T() {
            a = !1;
          }
          function I() {
            i.removeEventListener("touchstart", v, !1),
              i.removeEventListener("touchmove", y, !1),
              i.removeEventListener("touchend", m, !1),
              i.removeEventListener("touchcancel", T, !1),
              i.removeEventListener("mousedown", v, !1),
              i.removeEventListener("mousemove", y, !1),
              i.removeEventListener("mouseup", m, !1),
              i.removeEventListener("mouseout", T, !1),
              (i = null);
          }
          this.destroy = I;
        }
        function o(i, a, s) {
          var u = e.Event(i, { originalEvent: a });
          e(a.target).trigger(u, s);
        }
        return (t.instance = t.init(document)), t;
      })
    );
  });
  var k_ = c((sz, U_) => {
    "use strict";
    var Wt = Ue(),
      DV = Tr(),
      rt = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      G_ = !0,
      FV = /^#[a-zA-Z0-9\-_]+$/;
    Wt.define(
      "dropdown",
      (U_.exports = function (e, t) {
        var r = t.debounce,
          n = {},
          o = Wt.env(),
          i = !1,
          a,
          s = Wt.env.touch,
          u = ".w-dropdown",
          d = "w--open",
          g = DV.triggers,
          v = 900,
          y = "focusout" + u,
          m = "keydown" + u,
          T = "mouseenter" + u,
          I = "mousemove" + u,
          D = "mouseleave" + u,
          S = (s ? "click" : "mouseup") + u,
          L = "w-close" + u,
          C = "setting" + u,
          P = e(document),
          q;
        (n.ready = M),
          (n.design = function () {
            i && x(), (i = !1), M();
          }),
          (n.preview = function () {
            (i = !0), M();
          });
        function M() {
          (a = o && Wt.env("design")), (q = P.find(u)), q.each(X);
        }
        function X(l, G) {
          var V = e(G),
            A = e.data(G, u);
          A ||
            (A = e.data(G, u, {
              open: !1,
              el: V,
              config: {},
              selectedIdx: -1,
            })),
            (A.toggle = A.el.children(".w-dropdown-toggle")),
            (A.list = A.el.children(".w-dropdown-list")),
            (A.links = A.list.find("a:not(.w-dropdown .w-dropdown a)")),
            (A.complete = H(A)),
            (A.mouseLeave = ne(A)),
            (A.mouseUpOutside = B(A)),
            (A.mouseMoveOutside = k(A)),
            K(A);
          var oe = A.toggle.attr("id"),
            fe = A.list.attr("id");
          oe || (oe = "w-dropdown-toggle-" + l),
            fe || (fe = "w-dropdown-list-" + l),
            A.toggle.attr("id", oe),
            A.toggle.attr("aria-controls", fe),
            A.toggle.attr("aria-haspopup", "menu"),
            A.toggle.attr("aria-expanded", "false"),
            A.toggle
              .find(".w-icon-dropdown-toggle")
              .attr("aria-hidden", "true"),
            A.toggle.prop("tagName") !== "BUTTON" &&
              (A.toggle.attr("role", "button"),
              A.toggle.attr("tabindex") || A.toggle.attr("tabindex", "0")),
            A.list.attr("id", fe),
            A.list.attr("aria-labelledby", oe),
            A.links.each(function (h, W) {
              W.hasAttribute("tabindex") || W.setAttribute("tabindex", "0"),
                FV.test(W.hash) && W.addEventListener("click", U.bind(null, A));
            }),
            A.el.off(u),
            A.toggle.off(u),
            A.nav && A.nav.off(u);
          var ae = ee(A, G_);
          a && A.el.on(C, Q(A)),
            a ||
              (o && ((A.hovering = !1), U(A)),
              A.config.hover && A.toggle.on(T, re(A)),
              A.el.on(L, ae),
              A.el.on(m, Y(A)),
              A.el.on(y, _(A)),
              A.toggle.on(S, ae),
              A.toggle.on(m, E(A)),
              (A.nav = A.el.closest(".w-nav")),
              A.nav.on(L, ae));
        }
        function K(l) {
          var G = Number(l.el.css("z-index"));
          (l.manageZ = G === v || G === v + 1),
            (l.config = {
              hover: l.el.attr("data-hover") === "true" && !s,
              delay: l.el.attr("data-delay"),
            });
        }
        function Q(l) {
          return function (G, V) {
            (V = V || {}),
              K(l),
              V.open === !0 && te(l, !0),
              V.open === !1 && U(l, { immediate: !0 });
          };
        }
        function ee(l, G) {
          return r(function (V) {
            if (l.open || (V && V.type === "w-close"))
              return U(l, { forceClose: G });
            te(l);
          });
        }
        function te(l) {
          if (!l.open) {
            F(l),
              (l.open = !0),
              l.list.addClass(d),
              l.toggle.addClass(d),
              l.toggle.attr("aria-expanded", "true"),
              g.intro(0, l.el[0]),
              Wt.redraw.up(),
              l.manageZ && l.el.css("z-index", v + 1);
            var G = Wt.env("editor");
            a || P.on(S, l.mouseUpOutside),
              l.hovering && !G && l.el.on(D, l.mouseLeave),
              l.hovering && G && P.on(I, l.mouseMoveOutside),
              window.clearTimeout(l.delayId);
          }
        }
        function U(l, { immediate: G, forceClose: V } = {}) {
          if (l.open && !(l.config.hover && l.hovering && !V)) {
            l.toggle.attr("aria-expanded", "false"), (l.open = !1);
            var A = l.config;
            if (
              (g.outro(0, l.el[0]),
              P.off(S, l.mouseUpOutside),
              P.off(I, l.mouseMoveOutside),
              l.el.off(D, l.mouseLeave),
              window.clearTimeout(l.delayId),
              !A.delay || G)
            )
              return l.complete();
            l.delayId = window.setTimeout(l.complete, A.delay);
          }
        }
        function x() {
          P.find(u).each(function (l, G) {
            e(G).triggerHandler(L);
          });
        }
        function F(l) {
          var G = l.el[0];
          q.each(function (V, A) {
            var oe = e(A);
            oe.is(G) || oe.has(G).length || oe.triggerHandler(L);
          });
        }
        function B(l) {
          return (
            l.mouseUpOutside && P.off(S, l.mouseUpOutside),
            r(function (G) {
              if (l.open) {
                var V = e(G.target);
                if (!V.closest(".w-dropdown-toggle").length) {
                  var A = e.inArray(l.el[0], V.parents(u)) === -1,
                    oe = Wt.env("editor");
                  if (A) {
                    if (oe) {
                      var fe =
                          V.parents().length === 1 &&
                          V.parents("svg").length === 1,
                        ae = V.parents(
                          ".w-editor-bem-EditorHoverControls"
                        ).length;
                      if (fe || ae) return;
                    }
                    U(l);
                  }
                }
              }
            })
          );
        }
        function H(l) {
          return function () {
            l.list.removeClass(d),
              l.toggle.removeClass(d),
              l.manageZ && l.el.css("z-index", "");
          };
        }
        function re(l) {
          return function () {
            (l.hovering = !0), te(l);
          };
        }
        function ne(l) {
          return function () {
            (l.hovering = !1), l.links.is(":focus") || U(l);
          };
        }
        function k(l) {
          return r(function (G) {
            if (l.open) {
              var V = e(G.target),
                A = e.inArray(l.el[0], V.parents(u)) === -1;
              if (A) {
                var oe = V.parents(".w-editor-bem-EditorHoverControls").length,
                  fe = V.parents(".w-editor-bem-RTToolbar").length,
                  ae = e(".w-editor-bem-EditorOverlay"),
                  h =
                    ae.find(".w-editor-edit-outline").length ||
                    ae.find(".w-editor-bem-RTToolbar").length;
                if (oe || fe || h) return;
                (l.hovering = !1), U(l);
              }
            }
          });
        }
        function Y(l) {
          return function (G) {
            if (!(a || !l.open))
              switch (
                ((l.selectedIdx = l.links.index(document.activeElement)),
                G.keyCode)
              ) {
                case rt.HOME:
                  return l.open
                    ? ((l.selectedIdx = 0), p(l), G.preventDefault())
                    : void 0;
                case rt.END:
                  return l.open
                    ? ((l.selectedIdx = l.links.length - 1),
                      p(l),
                      G.preventDefault())
                    : void 0;
                case rt.ESCAPE:
                  return U(l), l.toggle.focus(), G.stopPropagation();
                case rt.ARROW_RIGHT:
                case rt.ARROW_DOWN:
                  return (
                    (l.selectedIdx = Math.min(
                      l.links.length - 1,
                      l.selectedIdx + 1
                    )),
                    p(l),
                    G.preventDefault()
                  );
                case rt.ARROW_LEFT:
                case rt.ARROW_UP:
                  return (
                    (l.selectedIdx = Math.max(-1, l.selectedIdx - 1)),
                    p(l),
                    G.preventDefault()
                  );
              }
          };
        }
        function p(l) {
          l.links[l.selectedIdx] && l.links[l.selectedIdx].focus();
        }
        function E(l) {
          var G = ee(l, G_);
          return function (V) {
            if (!a) {
              if (!l.open)
                switch (V.keyCode) {
                  case rt.ARROW_UP:
                  case rt.ARROW_DOWN:
                    return V.stopPropagation();
                }
              switch (V.keyCode) {
                case rt.SPACE:
                case rt.ENTER:
                  return G(), V.stopPropagation(), V.preventDefault();
              }
            }
          };
        }
        function _(l) {
          return r(function (G) {
            var { relatedTarget: V, target: A } = G,
              oe = l.el[0],
              fe = oe.contains(V) || oe.contains(A);
            return fe || U(l), G.stopPropagation();
          });
        }
        return n;
      })
    );
  });
  var V_ = c((Cs) => {
    "use strict";
    Object.defineProperty(Cs, "__esModule", { value: !0 });
    Cs.default = GV;
    function GV(e, t, r, n, o, i, a, s, u, d, g, v, y) {
      return function (m) {
        e(m);
        var T = m.form,
          I = {
            name: T.attr("data-name") || T.attr("name") || "Untitled Form",
            pageId: T.attr("data-wf-page-id") || "",
            elementId: T.attr("data-wf-element-id") || "",
            source: t.href,
            test: r.env(),
            fields: {},
            fileUploads: {},
            dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
              T.html()
            ),
            trackingCookies: n(),
          };
        let D = T.attr("data-wf-flow");
        D && (I.wfFlow = D), o(m);
        var S = i(T, I.fields);
        if (S) return a(S);
        if (((I.fileUploads = s(T)), u(m), !d)) {
          g(m);
          return;
        }
        v.ajax({
          url: y,
          type: "POST",
          data: I,
          dataType: "json",
          crossDomain: !0,
        })
          .done(function (L) {
            L && L.code === 200 && (m.success = !0), g(m);
          })
          .fail(function () {
            g(m);
          });
      };
    }
  });
  var H_ = c((cz, W_) => {
    "use strict";
    var Li = Ue();
    Li.define(
      "forms",
      (W_.exports = function (e, t) {
        var r = {},
          n = e(document),
          o,
          i = window.location,
          a = window.XDomainRequest && !window.atob,
          s = ".w-form",
          u,
          d = /e(-)?mail/i,
          g = /^\S+@\S+$/,
          v = window.alert,
          y = Li.env(),
          m,
          T,
          I,
          D = /list-manage[1-9]?.com/i,
          S = t.debounce(function () {
            v(
              "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue."
            );
          }, 100);
        r.ready =
          r.design =
          r.preview =
            function () {
              L(), !y && !m && P();
            };
        function L() {
          (u = e("html").attr("data-wf-site")),
            (T = "https://webflow.com/api/v1/form/" + u),
            a &&
              T.indexOf("https://webflow.com") >= 0 &&
              (T = T.replace(
                "https://webflow.com",
                "https://formdata.webflow.com"
              )),
            (I = `${T}/signFile`),
            (o = e(s + " form")),
            o.length && o.each(C);
        }
        function C(k, Y) {
          var p = e(Y),
            E = e.data(Y, s);
          E || (E = e.data(Y, s, { form: p })), q(E);
          var _ = p.closest("div.w-form");
          (E.done = _.find("> .w-form-done")),
            (E.fail = _.find("> .w-form-fail")),
            (E.fileUploads = _.find(".w-file-upload")),
            E.fileUploads.each(function (V) {
              H(V, E);
            });
          var l =
            E.form.attr("aria-label") || E.form.attr("data-name") || "Form";
          E.done.attr("aria-label") || E.form.attr("aria-label", l),
            E.done.attr("tabindex", "-1"),
            E.done.attr("role", "region"),
            E.done.attr("aria-label") ||
              E.done.attr("aria-label", l + " success"),
            E.fail.attr("tabindex", "-1"),
            E.fail.attr("role", "region"),
            E.fail.attr("aria-label") ||
              E.fail.attr("aria-label", l + " failure");
          var G = (E.action = p.attr("action"));
          if (
            ((E.handler = null),
            (E.redirect = p.attr("data-redirect")),
            D.test(G))
          ) {
            E.handler = x;
            return;
          }
          if (!G) {
            if (u) {
              E.handler = (() => {
                let V = V_().default;
                return V(q, i, Li, ee, B, X, v, K, M, u, F, e, T);
              })();
              return;
            }
            S();
          }
        }
        function P() {
          (m = !0),
            n.on("submit", s + " form", function (V) {
              var A = e.data(this, s);
              A.handler && ((A.evt = V), A.handler(A));
            });
          let k = ".w-checkbox-input",
            Y = ".w-radio-input",
            p = "w--redirected-checked",
            E = "w--redirected-focus",
            _ = "w--redirected-focus-visible",
            l = ":focus-visible, [data-wf-focus-visible]",
            G = [
              ["checkbox", k],
              ["radio", Y],
            ];
          n.on(
            "change",
            s + ' form input[type="checkbox"]:not(' + k + ")",
            (V) => {
              e(V.target).siblings(k).toggleClass(p);
            }
          ),
            n.on("change", s + ' form input[type="radio"]', (V) => {
              e(`input[name="${V.target.name}"]:not(${k})`).map((oe, fe) =>
                e(fe).siblings(Y).removeClass(p)
              );
              let A = e(V.target);
              A.hasClass("w-radio-input") || A.siblings(Y).addClass(p);
            }),
            G.forEach(([V, A]) => {
              n.on(
                "focus",
                s + ` form input[type="${V}"]:not(` + A + ")",
                (oe) => {
                  e(oe.target).siblings(A).addClass(E),
                    e(oe.target).filter(l).siblings(A).addClass(_);
                }
              ),
                n.on(
                  "blur",
                  s + ` form input[type="${V}"]:not(` + A + ")",
                  (oe) => {
                    e(oe.target).siblings(A).removeClass(`${E} ${_}`);
                  }
                );
            });
        }
        function q(k) {
          var Y = (k.btn = k.form.find(':input[type="submit"]'));
          (k.wait = k.btn.attr("data-wait") || null),
            (k.success = !1),
            Y.prop("disabled", !1),
            k.label && Y.val(k.label);
        }
        function M(k) {
          var Y = k.btn,
            p = k.wait;
          Y.prop("disabled", !0), p && ((k.label = Y.val()), Y.val(p));
        }
        function X(k, Y) {
          var p = null;
          return (
            (Y = Y || {}),
            k
              .find(':input:not([type="submit"]):not([type="file"])')
              .each(function (E, _) {
                var l = e(_),
                  G = l.attr("type"),
                  V =
                    l.attr("data-name") || l.attr("name") || "Field " + (E + 1),
                  A = l.val();
                if (G === "checkbox") A = l.is(":checked");
                else if (G === "radio") {
                  if (Y[V] === null || typeof Y[V] == "string") return;
                  A =
                    k
                      .find('input[name="' + l.attr("name") + '"]:checked')
                      .val() || null;
                }
                typeof A == "string" && (A = e.trim(A)),
                  (Y[V] = A),
                  (p = p || te(l, G, V, A));
              }),
            p
          );
        }
        function K(k) {
          var Y = {};
          return (
            k.find(':input[type="file"]').each(function (p, E) {
              var _ = e(E),
                l = _.attr("data-name") || _.attr("name") || "File " + (p + 1),
                G = _.attr("data-value");
              typeof G == "string" && (G = e.trim(G)), (Y[l] = G);
            }),
            Y
          );
        }
        let Q = { _mkto_trk: "marketo" };
        function ee() {
          return document.cookie.split("; ").reduce(function (Y, p) {
            let E = p.split("="),
              _ = E[0];
            if (_ in Q) {
              let l = Q[_],
                G = E.slice(1).join("=");
              Y[l] = G;
            }
            return Y;
          }, {});
        }
        function te(k, Y, p, E) {
          var _ = null;
          return (
            Y === "password"
              ? (_ = "Passwords cannot be submitted.")
              : k.attr("required")
              ? E
                ? d.test(k.attr("type")) &&
                  (g.test(E) ||
                    (_ = "Please enter a valid email address for: " + p))
                : (_ = "Please fill out the required field: " + p)
              : p === "g-recaptcha-response" &&
                !E &&
                (_ = "Please confirm you\u2019re not a robot."),
            _
          );
        }
        function U(k) {
          B(k), F(k);
        }
        function x(k) {
          q(k);
          var Y = k.form,
            p = {};
          if (/^https/.test(i.href) && !/^https/.test(k.action)) {
            Y.attr("method", "post");
            return;
          }
          B(k);
          var E = X(Y, p);
          if (E) return v(E);
          M(k);
          var _;
          t.each(p, function (A, oe) {
            d.test(oe) && (p.EMAIL = A),
              /^((full[ _-]?)?name)$/i.test(oe) && (_ = A),
              /^(first[ _-]?name)$/i.test(oe) && (p.FNAME = A),
              /^(last[ _-]?name)$/i.test(oe) && (p.LNAME = A);
          }),
            _ &&
              !p.FNAME &&
              ((_ = _.split(" ")),
              (p.FNAME = _[0]),
              (p.LNAME = p.LNAME || _[1]));
          var l = k.action.replace("/post?", "/post-json?") + "&c=?",
            G = l.indexOf("u=") + 2;
          G = l.substring(G, l.indexOf("&", G));
          var V = l.indexOf("id=") + 3;
          (V = l.substring(V, l.indexOf("&", V))),
            (p["b_" + G + "_" + V] = ""),
            e
              .ajax({ url: l, data: p, dataType: "jsonp" })
              .done(function (A) {
                (k.success = A.result === "success" || /already/.test(A.msg)),
                  k.success || console.info("MailChimp error: " + A.msg),
                  F(k);
              })
              .fail(function () {
                F(k);
              });
        }
        function F(k) {
          var Y = k.form,
            p = k.redirect,
            E = k.success;
          if (E && p) {
            Li.location(p);
            return;
          }
          k.done.toggle(E),
            k.fail.toggle(!E),
            E ? k.done.focus() : k.fail.focus(),
            Y.toggle(!E),
            q(k);
        }
        function B(k) {
          k.evt && k.evt.preventDefault(), (k.evt = null);
        }
        function H(k, Y) {
          if (!Y.fileUploads || !Y.fileUploads[k]) return;
          var p,
            E = e(Y.fileUploads[k]),
            _ = E.find("> .w-file-upload-default"),
            l = E.find("> .w-file-upload-uploading"),
            G = E.find("> .w-file-upload-success"),
            V = E.find("> .w-file-upload-error"),
            A = _.find(".w-file-upload-input"),
            oe = _.find(".w-file-upload-label"),
            fe = oe.children(),
            ae = V.find(".w-file-upload-error-msg"),
            h = G.find(".w-file-upload-file"),
            W = G.find(".w-file-remove-link"),
            Z = h.find(".w-file-upload-file-name"),
            j = ae.attr("data-w-size-error"),
            pe = ae.attr("data-w-type-error"),
            De = ae.attr("data-w-generic-error");
          if (
            (y ||
              oe.on("click keydown", function (w) {
                (w.type === "keydown" && w.which !== 13 && w.which !== 32) ||
                  (w.preventDefault(), A.click());
              }),
            oe.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"),
            W.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"),
            y)
          )
            A.on("click", function (w) {
              w.preventDefault();
            }),
              oe.on("click", function (w) {
                w.preventDefault();
              }),
              fe.on("click", function (w) {
                w.preventDefault();
              });
          else {
            W.on("click keydown", function (w) {
              if (w.type === "keydown") {
                if (w.which !== 13 && w.which !== 32) return;
                w.preventDefault();
              }
              A.removeAttr("data-value"),
                A.val(""),
                Z.html(""),
                _.toggle(!0),
                G.toggle(!1),
                oe.focus();
            }),
              A.on("change", function (w) {
                (p = w.target && w.target.files && w.target.files[0]),
                  p &&
                    (_.toggle(!1),
                    V.toggle(!1),
                    l.toggle(!0),
                    l.focus(),
                    Z.text(p.name),
                    R() || M(Y),
                    (Y.fileUploads[k].uploading = !0),
                    re(p, b));
              });
            var Be = oe.outerHeight();
            A.height(Be), A.width(1);
          }
          function f(w) {
            var N = w.responseJSON && w.responseJSON.msg,
              J = De;
            typeof N == "string" && N.indexOf("InvalidFileTypeError") === 0
              ? (J = pe)
              : typeof N == "string" &&
                N.indexOf("MaxFileSizeError") === 0 &&
                (J = j),
              ae.text(J),
              A.removeAttr("data-value"),
              A.val(""),
              l.toggle(!1),
              _.toggle(!0),
              V.toggle(!0),
              V.focus(),
              (Y.fileUploads[k].uploading = !1),
              R() || q(Y);
          }
          function b(w, N) {
            if (w) return f(w);
            var J = N.fileName,
              se = N.postData,
              he = N.fileId,
              z = N.s3Url;
            A.attr("data-value", he), ne(z, se, p, J, O);
          }
          function O(w) {
            if (w) return f(w);
            l.toggle(!1),
              G.css("display", "inline-block"),
              G.focus(),
              (Y.fileUploads[k].uploading = !1),
              R() || q(Y);
          }
          function R() {
            var w = (Y.fileUploads && Y.fileUploads.toArray()) || [];
            return w.some(function (N) {
              return N.uploading;
            });
          }
        }
        function re(k, Y) {
          var p = new URLSearchParams({ name: k.name, size: k.size });
          e.ajax({ type: "GET", url: `${I}?${p}`, crossDomain: !0 })
            .done(function (E) {
              Y(null, E);
            })
            .fail(function (E) {
              Y(E);
            });
        }
        function ne(k, Y, p, E, _) {
          var l = new FormData();
          for (var G in Y) l.append(G, Y[G]);
          l.append("file", p, E),
            e
              .ajax({
                type: "POST",
                url: k,
                data: l,
                processData: !1,
                contentType: !1,
              })
              .done(function () {
                _(null);
              })
              .fail(function (V) {
                _(V);
              });
        }
        return r;
      })
    );
  });
  var B_ = c((lz, X_) => {
    "use strict";
    var Rt = Ue(),
      UV = Tr(),
      Re = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
    Rt.define(
      "navbar",
      (X_.exports = function (e, t) {
        var r = {},
          n = e.tram,
          o = e(window),
          i = e(document),
          a = t.debounce,
          s,
          u,
          d,
          g,
          v = Rt.env(),
          y = '<div class="w-nav-overlay" data-wf-ignore />',
          m = ".w-nav",
          T = "w--open",
          I = "w--nav-dropdown-open",
          D = "w--nav-dropdown-toggle-open",
          S = "w--nav-dropdown-list-open",
          L = "w--nav-link-open",
          C = UV.triggers,
          P = e();
        (r.ready = r.design = r.preview = q),
          (r.destroy = function () {
            (P = e()), M(), u && u.length && u.each(ee);
          });
        function q() {
          (d = v && Rt.env("design")),
            (g = Rt.env("editor")),
            (s = e(document.body)),
            (u = i.find(m)),
            u.length && (u.each(Q), M(), X());
        }
        function M() {
          Rt.resize.off(K);
        }
        function X() {
          Rt.resize.on(K);
        }
        function K() {
          u.each(_);
        }
        function Q(h, W) {
          var Z = e(W),
            j = e.data(W, m);
          j ||
            (j = e.data(W, m, {
              open: !1,
              el: Z,
              config: {},
              selectedIdx: -1,
            })),
            (j.menu = Z.find(".w-nav-menu")),
            (j.links = j.menu.find(".w-nav-link")),
            (j.dropdowns = j.menu.find(".w-dropdown")),
            (j.dropdownToggle = j.menu.find(".w-dropdown-toggle")),
            (j.dropdownList = j.menu.find(".w-dropdown-list")),
            (j.button = Z.find(".w-nav-button")),
            (j.container = Z.find(".w-container")),
            (j.overlayContainerId = "w-nav-overlay-" + h),
            (j.outside = p(j));
          var pe = Z.find(".w-nav-brand");
          pe &&
            pe.attr("href") === "/" &&
            pe.attr("aria-label") == null &&
            pe.attr("aria-label", "home"),
            j.button.attr("style", "-webkit-user-select: text;"),
            j.button.attr("aria-label") == null &&
              j.button.attr("aria-label", "menu"),
            j.button.attr("role", "button"),
            j.button.attr("tabindex", "0"),
            j.button.attr("aria-controls", j.overlayContainerId),
            j.button.attr("aria-haspopup", "menu"),
            j.button.attr("aria-expanded", "false"),
            j.el.off(m),
            j.button.off(m),
            j.menu.off(m),
            x(j),
            d
              ? (te(j), j.el.on("setting" + m, F(j)))
              : (U(j),
                j.button.on("click" + m, k(j)),
                j.menu.on("click" + m, "a", Y(j)),
                j.button.on("keydown" + m, B(j)),
                j.el.on("keydown" + m, H(j))),
            _(h, W);
        }
        function ee(h, W) {
          var Z = e.data(W, m);
          Z && (te(Z), e.removeData(W, m));
        }
        function te(h) {
          h.overlay && (ae(h, !0), h.overlay.remove(), (h.overlay = null));
        }
        function U(h) {
          h.overlay ||
            ((h.overlay = e(y).appendTo(h.el)),
            h.overlay.attr("id", h.overlayContainerId),
            (h.parent = h.menu.parent()),
            ae(h, !0));
        }
        function x(h) {
          var W = {},
            Z = h.config || {},
            j = (W.animation = h.el.attr("data-animation") || "default");
          (W.animOver = /^over/.test(j)),
            (W.animDirect = /left$/.test(j) ? -1 : 1),
            Z.animation !== j && h.open && t.defer(ne, h),
            (W.easing = h.el.attr("data-easing") || "ease"),
            (W.easing2 = h.el.attr("data-easing2") || "ease");
          var pe = h.el.attr("data-duration");
          (W.duration = pe != null ? Number(pe) : 400),
            (W.docHeight = h.el.attr("data-doc-height")),
            (h.config = W);
        }
        function F(h) {
          return function (W, Z) {
            Z = Z || {};
            var j = o.width();
            x(h),
              Z.open === !0 && oe(h, !0),
              Z.open === !1 && ae(h, !0),
              h.open &&
                t.defer(function () {
                  j !== o.width() && ne(h);
                });
          };
        }
        function B(h) {
          return function (W) {
            switch (W.keyCode) {
              case Re.SPACE:
              case Re.ENTER:
                return k(h)(), W.preventDefault(), W.stopPropagation();
              case Re.ESCAPE:
                return ae(h), W.preventDefault(), W.stopPropagation();
              case Re.ARROW_RIGHT:
              case Re.ARROW_DOWN:
              case Re.HOME:
              case Re.END:
                return h.open
                  ? (W.keyCode === Re.END
                      ? (h.selectedIdx = h.links.length - 1)
                      : (h.selectedIdx = 0),
                    re(h),
                    W.preventDefault(),
                    W.stopPropagation())
                  : (W.preventDefault(), W.stopPropagation());
            }
          };
        }
        function H(h) {
          return function (W) {
            if (h.open)
              switch (
                ((h.selectedIdx = h.links.index(document.activeElement)),
                W.keyCode)
              ) {
                case Re.HOME:
                case Re.END:
                  return (
                    W.keyCode === Re.END
                      ? (h.selectedIdx = h.links.length - 1)
                      : (h.selectedIdx = 0),
                    re(h),
                    W.preventDefault(),
                    W.stopPropagation()
                  );
                case Re.ESCAPE:
                  return (
                    ae(h),
                    h.button.focus(),
                    W.preventDefault(),
                    W.stopPropagation()
                  );
                case Re.ARROW_LEFT:
                case Re.ARROW_UP:
                  return (
                    (h.selectedIdx = Math.max(-1, h.selectedIdx - 1)),
                    re(h),
                    W.preventDefault(),
                    W.stopPropagation()
                  );
                case Re.ARROW_RIGHT:
                case Re.ARROW_DOWN:
                  return (
                    (h.selectedIdx = Math.min(
                      h.links.length - 1,
                      h.selectedIdx + 1
                    )),
                    re(h),
                    W.preventDefault(),
                    W.stopPropagation()
                  );
              }
          };
        }
        function re(h) {
          if (h.links[h.selectedIdx]) {
            var W = h.links[h.selectedIdx];
            W.focus(), Y(W);
          }
        }
        function ne(h) {
          h.open && (ae(h, !0), oe(h, !0));
        }
        function k(h) {
          return a(function () {
            h.open ? ae(h) : oe(h);
          });
        }
        function Y(h) {
          return function (W) {
            var Z = e(this),
              j = Z.attr("href");
            if (!Rt.validClick(W.currentTarget)) {
              W.preventDefault();
              return;
            }
            j && j.indexOf("#") === 0 && h.open && ae(h);
          };
        }
        function p(h) {
          return (
            h.outside && i.off("click" + m, h.outside),
            function (W) {
              var Z = e(W.target);
              (g && Z.closest(".w-editor-bem-EditorOverlay").length) || E(h, Z);
            }
          );
        }
        var E = a(function (h, W) {
          if (h.open) {
            var Z = W.closest(".w-nav-menu");
            h.menu.is(Z) || ae(h);
          }
        });
        function _(h, W) {
          var Z = e.data(W, m),
            j = (Z.collapsed = Z.button.css("display") !== "none");
          if ((Z.open && !j && !d && ae(Z, !0), Z.container.length)) {
            var pe = G(Z);
            Z.links.each(pe), Z.dropdowns.each(pe);
          }
          Z.open && fe(Z);
        }
        var l = "max-width";
        function G(h) {
          var W = h.container.css(l);
          return (
            W === "none" && (W = ""),
            function (Z, j) {
              (j = e(j)), j.css(l, ""), j.css(l) === "none" && j.css(l, W);
            }
          );
        }
        function V(h, W) {
          W.setAttribute("data-nav-menu-open", "");
        }
        function A(h, W) {
          W.removeAttribute("data-nav-menu-open");
        }
        function oe(h, W) {
          if (h.open) return;
          (h.open = !0),
            h.menu.each(V),
            h.links.addClass(L),
            h.dropdowns.addClass(I),
            h.dropdownToggle.addClass(D),
            h.dropdownList.addClass(S),
            h.button.addClass(T);
          var Z = h.config,
            j = Z.animation;
          (j === "none" || !n.support.transform || Z.duration <= 0) && (W = !0);
          var pe = fe(h),
            De = h.menu.outerHeight(!0),
            Be = h.menu.outerWidth(!0),
            f = h.el.height(),
            b = h.el[0];
          if (
            (_(0, b),
            C.intro(0, b),
            Rt.redraw.up(),
            d || i.on("click" + m, h.outside),
            W)
          ) {
            w();
            return;
          }
          var O = "transform " + Z.duration + "ms " + Z.easing;
          if (
            (h.overlay &&
              ((P = h.menu.prev()), h.overlay.show().append(h.menu)),
            Z.animOver)
          ) {
            n(h.menu)
              .add(O)
              .set({ x: Z.animDirect * Be, height: pe })
              .start({ x: 0 })
              .then(w),
              h.overlay && h.overlay.width(Be);
            return;
          }
          var R = f + De;
          n(h.menu).add(O).set({ y: -R }).start({ y: 0 }).then(w);
          function w() {
            h.button.attr("aria-expanded", "true");
          }
        }
        function fe(h) {
          var W = h.config,
            Z = W.docHeight ? i.height() : s.height();
          return (
            W.animOver
              ? h.menu.height(Z)
              : h.el.css("position") !== "fixed" && (Z -= h.el.outerHeight(!0)),
            h.overlay && h.overlay.height(Z),
            Z
          );
        }
        function ae(h, W) {
          if (!h.open) return;
          (h.open = !1), h.button.removeClass(T);
          var Z = h.config;
          if (
            ((Z.animation === "none" ||
              !n.support.transform ||
              Z.duration <= 0) &&
              (W = !0),
            C.outro(0, h.el[0]),
            i.off("click" + m, h.outside),
            W)
          ) {
            n(h.menu).stop(), b();
            return;
          }
          var j = "transform " + Z.duration + "ms " + Z.easing2,
            pe = h.menu.outerHeight(!0),
            De = h.menu.outerWidth(!0),
            Be = h.el.height();
          if (Z.animOver) {
            n(h.menu)
              .add(j)
              .start({ x: De * Z.animDirect })
              .then(b);
            return;
          }
          var f = Be + pe;
          n(h.menu).add(j).start({ y: -f }).then(b);
          function b() {
            h.menu.height(""),
              n(h.menu).set({ x: 0, y: 0 }),
              h.menu.each(A),
              h.links.removeClass(L),
              h.dropdowns.removeClass(I),
              h.dropdownToggle.removeClass(D),
              h.dropdownList.removeClass(S),
              h.overlay &&
                h.overlay.children().length &&
                (P.length ? h.menu.insertAfter(P) : h.menu.prependTo(h.parent),
                h.overlay.attr("style", "").hide()),
              h.el.triggerHandler("w-close"),
              h.button.attr("aria-expanded", "false");
          }
        }
        return r;
      })
    );
  });
  var K_ = c((fz, z_) => {
    "use strict";
    var Ct = Ue(),
      kV = Tr(),
      pt = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      j_ =
        'a[href], area[href], [role="button"], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
    Ct.define(
      "slider",
      (z_.exports = function (e, t) {
        var r = {},
          n = e.tram,
          o = e(document),
          i,
          a,
          s = Ct.env(),
          u = ".w-slider",
          d = '<div class="w-slider-dot" data-wf-ignore />',
          g =
            '<div aria-live="off" aria-atomic="true" class="w-slider-aria-label" data-wf-ignore />',
          v = "w-slider-force-show",
          y = kV.triggers,
          m,
          T = !1;
        (r.ready = function () {
          (a = Ct.env("design")), I();
        }),
          (r.design = function () {
            (a = !0), setTimeout(I, 1e3);
          }),
          (r.preview = function () {
            (a = !1), I();
          }),
          (r.redraw = function () {
            (T = !0), I(), (T = !1);
          }),
          (r.destroy = D);
        function I() {
          (i = o.find(u)), i.length && (i.each(C), !m && (D(), S()));
        }
        function D() {
          Ct.resize.off(L), Ct.redraw.off(r.redraw);
        }
        function S() {
          Ct.resize.on(L), Ct.redraw.on(r.redraw);
        }
        function L() {
          i.filter(":visible").each(H);
        }
        function C(p, E) {
          var _ = e(E),
            l = e.data(E, u);
          l ||
            (l = e.data(E, u, {
              index: 0,
              depth: 1,
              hasFocus: { keyboard: !1, mouse: !1 },
              el: _,
              config: {},
            })),
            (l.mask = _.children(".w-slider-mask")),
            (l.left = _.children(".w-slider-arrow-left")),
            (l.right = _.children(".w-slider-arrow-right")),
            (l.nav = _.children(".w-slider-nav")),
            (l.slides = l.mask.children(".w-slide")),
            l.slides.each(y.reset),
            T && (l.maskWidth = 0),
            _.attr("role") === void 0 && _.attr("role", "region"),
            _.attr("aria-label") === void 0 && _.attr("aria-label", "carousel");
          var G = l.mask.attr("id");
          if (
            (G || ((G = "w-slider-mask-" + p), l.mask.attr("id", G)),
            !a && !l.ariaLiveLabel && (l.ariaLiveLabel = e(g).appendTo(l.mask)),
            l.left.attr("role", "button"),
            l.left.attr("tabindex", "0"),
            l.left.attr("aria-controls", G),
            l.left.attr("aria-label") === void 0 &&
              l.left.attr("aria-label", "previous slide"),
            l.right.attr("role", "button"),
            l.right.attr("tabindex", "0"),
            l.right.attr("aria-controls", G),
            l.right.attr("aria-label") === void 0 &&
              l.right.attr("aria-label", "next slide"),
            !n.support.transform)
          ) {
            l.left.hide(), l.right.hide(), l.nav.hide(), (m = !0);
            return;
          }
          l.el.off(u),
            l.left.off(u),
            l.right.off(u),
            l.nav.off(u),
            P(l),
            a
              ? (l.el.on("setting" + u, x(l)), U(l), (l.hasTimer = !1))
              : (l.el.on("swipe" + u, x(l)),
                l.left.on("click" + u, K(l)),
                l.right.on("click" + u, Q(l)),
                l.left.on("keydown" + u, X(l, K)),
                l.right.on("keydown" + u, X(l, Q)),
                l.nav.on("keydown" + u, "> div", x(l)),
                l.config.autoplay &&
                  !l.hasTimer &&
                  ((l.hasTimer = !0), (l.timerCount = 1), te(l)),
                l.el.on("mouseenter" + u, M(l, !0, "mouse")),
                l.el.on("focusin" + u, M(l, !0, "keyboard")),
                l.el.on("mouseleave" + u, M(l, !1, "mouse")),
                l.el.on("focusout" + u, M(l, !1, "keyboard"))),
            l.nav.on("click" + u, "> div", x(l)),
            s ||
              l.mask
                .contents()
                .filter(function () {
                  return this.nodeType === 3;
                })
                .remove();
          var V = _.filter(":hidden");
          V.addClass(v);
          var A = _.parents(":hidden");
          A.addClass(v), T || H(p, E), V.removeClass(v), A.removeClass(v);
        }
        function P(p) {
          var E = {};
          (E.crossOver = 0),
            (E.animation = p.el.attr("data-animation") || "slide"),
            E.animation === "outin" &&
              ((E.animation = "cross"), (E.crossOver = 0.5)),
            (E.easing = p.el.attr("data-easing") || "ease");
          var _ = p.el.attr("data-duration");
          if (
            ((E.duration = _ != null ? parseInt(_, 10) : 500),
            q(p.el.attr("data-infinite")) && (E.infinite = !0),
            q(p.el.attr("data-disable-swipe")) && (E.disableSwipe = !0),
            q(p.el.attr("data-hide-arrows"))
              ? (E.hideArrows = !0)
              : p.config.hideArrows && (p.left.show(), p.right.show()),
            q(p.el.attr("data-autoplay")))
          ) {
            (E.autoplay = !0),
              (E.delay = parseInt(p.el.attr("data-delay"), 10) || 2e3),
              (E.timerMax = parseInt(p.el.attr("data-autoplay-limit"), 10));
            var l = "mousedown" + u + " touchstart" + u;
            a ||
              p.el.off(l).one(l, function () {
                U(p);
              });
          }
          var G = p.right.width();
          (E.edge = G ? G + 40 : 100), (p.config = E);
        }
        function q(p) {
          return p === "1" || p === "true";
        }
        function M(p, E, _) {
          return function (l) {
            if (E) p.hasFocus[_] = E;
            else if (
              e.contains(p.el.get(0), l.relatedTarget) ||
              ((p.hasFocus[_] = E),
              (p.hasFocus.mouse && _ === "keyboard") ||
                (p.hasFocus.keyboard && _ === "mouse"))
            )
              return;
            E
              ? (p.ariaLiveLabel.attr("aria-live", "polite"),
                p.hasTimer && U(p))
              : (p.ariaLiveLabel.attr("aria-live", "off"), p.hasTimer && te(p));
          };
        }
        function X(p, E) {
          return function (_) {
            switch (_.keyCode) {
              case pt.SPACE:
              case pt.ENTER:
                return E(p)(), _.preventDefault(), _.stopPropagation();
            }
          };
        }
        function K(p) {
          return function () {
            B(p, { index: p.index - 1, vector: -1 });
          };
        }
        function Q(p) {
          return function () {
            B(p, { index: p.index + 1, vector: 1 });
          };
        }
        function ee(p, E) {
          var _ = null;
          E === p.slides.length && (I(), re(p)),
            t.each(p.anchors, function (l, G) {
              e(l.els).each(function (V, A) {
                e(A).index() === E && (_ = G);
              });
            }),
            _ != null && B(p, { index: _, immediate: !0 });
        }
        function te(p) {
          U(p);
          var E = p.config,
            _ = E.timerMax;
          (_ && p.timerCount++ > _) ||
            (p.timerId = window.setTimeout(function () {
              p.timerId == null || a || (Q(p)(), te(p));
            }, E.delay));
        }
        function U(p) {
          window.clearTimeout(p.timerId), (p.timerId = null);
        }
        function x(p) {
          return function (E, _) {
            _ = _ || {};
            var l = p.config;
            if (a && E.type === "setting") {
              if (_.select === "prev") return K(p)();
              if (_.select === "next") return Q(p)();
              if ((P(p), re(p), _.select == null)) return;
              ee(p, _.select);
              return;
            }
            if (E.type === "swipe")
              return l.disableSwipe || Ct.env("editor")
                ? void 0
                : _.direction === "left"
                ? Q(p)()
                : _.direction === "right"
                ? K(p)()
                : void 0;
            if (p.nav.has(E.target).length) {
              var G = e(E.target).index();
              if (
                (E.type === "click" && B(p, { index: G }), E.type === "keydown")
              )
                switch (E.keyCode) {
                  case pt.ENTER:
                  case pt.SPACE: {
                    B(p, { index: G }), E.preventDefault();
                    break;
                  }
                  case pt.ARROW_LEFT:
                  case pt.ARROW_UP: {
                    F(p.nav, Math.max(G - 1, 0)), E.preventDefault();
                    break;
                  }
                  case pt.ARROW_RIGHT:
                  case pt.ARROW_DOWN: {
                    F(p.nav, Math.min(G + 1, p.pages)), E.preventDefault();
                    break;
                  }
                  case pt.HOME: {
                    F(p.nav, 0), E.preventDefault();
                    break;
                  }
                  case pt.END: {
                    F(p.nav, p.pages), E.preventDefault();
                    break;
                  }
                  default:
                    return;
                }
            }
          };
        }
        function F(p, E) {
          var _ = p.children().eq(E).focus();
          p.children().not(_);
        }
        function B(p, E) {
          E = E || {};
          var _ = p.config,
            l = p.anchors;
          p.previous = p.index;
          var G = E.index,
            V = {};
          G < 0
            ? ((G = l.length - 1),
              _.infinite &&
                ((V.x = -p.endX), (V.from = 0), (V.to = l[0].width)))
            : G >= l.length &&
              ((G = 0),
              _.infinite &&
                ((V.x = l[l.length - 1].width),
                (V.from = -l[l.length - 1].x),
                (V.to = V.from - V.x))),
            (p.index = G);
          var A = p.nav
            .children()
            .eq(G)
            .addClass("w-active")
            .attr("aria-pressed", "true")
            .attr("tabindex", "0");
          p.nav
            .children()
            .not(A)
            .removeClass("w-active")
            .attr("aria-pressed", "false")
            .attr("tabindex", "-1"),
            _.hideArrows &&
              (p.index === l.length - 1 ? p.right.hide() : p.right.show(),
              p.index === 0 ? p.left.hide() : p.left.show());
          var oe = p.offsetX || 0,
            fe = (p.offsetX = -l[p.index].x),
            ae = { x: fe, opacity: 1, visibility: "" },
            h = e(l[p.index].els),
            W = e(l[p.previous] && l[p.previous].els),
            Z = p.slides.not(h),
            j = _.animation,
            pe = _.easing,
            De = Math.round(_.duration),
            Be = E.vector || (p.index > p.previous ? 1 : -1),
            f = "opacity " + De + "ms " + pe,
            b = "transform " + De + "ms " + pe;
          if (
            (h.find(j_).removeAttr("tabindex"),
            h.removeAttr("aria-hidden"),
            h.find("*").removeAttr("aria-hidden"),
            Z.find(j_).attr("tabindex", "-1"),
            Z.attr("aria-hidden", "true"),
            Z.find("*").attr("aria-hidden", "true"),
            a || (h.each(y.intro), Z.each(y.outro)),
            E.immediate && !T)
          ) {
            n(h).set(ae), w();
            return;
          }
          if (p.index === p.previous) return;
          if (
            (a || p.ariaLiveLabel.text(`Slide ${G + 1} of ${l.length}.`),
            j === "cross")
          ) {
            var O = Math.round(De - De * _.crossOver),
              R = Math.round(De - O);
            (f = "opacity " + O + "ms " + pe),
              n(W).set({ visibility: "" }).add(f).start({ opacity: 0 }),
              n(h)
                .set({ visibility: "", x: fe, opacity: 0, zIndex: p.depth++ })
                .add(f)
                .wait(R)
                .then({ opacity: 1 })
                .then(w);
            return;
          }
          if (j === "fade") {
            n(W).set({ visibility: "" }).stop(),
              n(h)
                .set({ visibility: "", x: fe, opacity: 0, zIndex: p.depth++ })
                .add(f)
                .start({ opacity: 1 })
                .then(w);
            return;
          }
          if (j === "over") {
            (ae = { x: p.endX }),
              n(W).set({ visibility: "" }).stop(),
              n(h)
                .set({
                  visibility: "",
                  zIndex: p.depth++,
                  x: fe + l[p.index].width * Be,
                })
                .add(b)
                .start({ x: fe })
                .then(w);
            return;
          }
          _.infinite && V.x
            ? (n(p.slides.not(W))
                .set({ visibility: "", x: V.x })
                .add(b)
                .start({ x: fe }),
              n(W).set({ visibility: "", x: V.from }).add(b).start({ x: V.to }),
              (p.shifted = W))
            : (_.infinite &&
                p.shifted &&
                (n(p.shifted).set({ visibility: "", x: oe }),
                (p.shifted = null)),
              n(p.slides).set({ visibility: "" }).add(b).start({ x: fe }));
          function w() {
            (h = e(l[p.index].els)),
              (Z = p.slides.not(h)),
              j !== "slide" && (ae.visibility = "hidden"),
              n(Z).set(ae);
          }
        }
        function H(p, E) {
          var _ = e.data(E, u);
          if (_) {
            if (k(_)) return re(_);
            a && Y(_) && re(_);
          }
        }
        function re(p) {
          var E = 1,
            _ = 0,
            l = 0,
            G = 0,
            V = p.maskWidth,
            A = V - p.config.edge;
          A < 0 && (A = 0),
            (p.anchors = [{ els: [], x: 0, width: 0 }]),
            p.slides.each(function (fe, ae) {
              l - _ > A &&
                (E++,
                (_ += V),
                (p.anchors[E - 1] = { els: [], x: l, width: 0 })),
                (G = e(ae).outerWidth(!0)),
                (l += G),
                (p.anchors[E - 1].width += G),
                p.anchors[E - 1].els.push(ae);
              var h = fe + 1 + " of " + p.slides.length;
              e(ae).attr("aria-label", h), e(ae).attr("role", "group");
            }),
            (p.endX = l),
            a && (p.pages = null),
            p.nav.length && p.pages !== E && ((p.pages = E), ne(p));
          var oe = p.index;
          oe >= E && (oe = E - 1), B(p, { immediate: !0, index: oe });
        }
        function ne(p) {
          var E = [],
            _,
            l = p.el.attr("data-nav-spacing");
          l && (l = parseFloat(l) + "px");
          for (var G = 0, V = p.pages; G < V; G++)
            (_ = e(d)),
              _.attr("aria-label", "Show slide " + (G + 1) + " of " + V)
                .attr("aria-pressed", "false")
                .attr("role", "button")
                .attr("tabindex", "-1"),
              p.nav.hasClass("w-num") && _.text(G + 1),
              l != null && _.css({ "margin-left": l, "margin-right": l }),
              E.push(_);
          p.nav.empty().append(E);
        }
        function k(p) {
          var E = p.mask.width();
          return p.maskWidth !== E ? ((p.maskWidth = E), !0) : !1;
        }
        function Y(p) {
          var E = 0;
          return (
            p.slides.each(function (_, l) {
              E += e(l).outerWidth(!0);
            }),
            p.slidesWidth !== E ? ((p.slidesWidth = E), !0) : !1
          );
        }
        return r;
      })
    );
  });
  Ns();
  Ps();
  js();
  Ks();
  $s();
  Js();
  Tr();
  L_();
  P_();
  q_();
  F_();
  k_();
  H_();
  B_();
  K_();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 * _.each
 * _.map
 * _.find
 * _.filter
 * _.any
 * _.contains
 * _.delay
 * _.defer
 * _.throttle (webflow)
 * _.debounce
 * _.keys
 * _.has
 * _.now
 * _.template (webflow: upgraded to 1.13.6)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:

timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    "e-575": {
      id: "e-575",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-576",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf8e|45f035ae-3fb2-bb4d-27e2-74aea56ac52b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf8e|45f035ae-3fb2-bb4d-27e2-74aea56ac52b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1680712413228,
    },
    "e-576": {
      id: "e-576",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-575",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf8e|45f035ae-3fb2-bb4d-27e2-74aea56ac52b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf8e|45f035ae-3fb2-bb4d-27e2-74aea56ac52b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1680712413228,
    },
    "e-593": {
      id: "e-593",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-594",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|7817e8f3-82b1-0e9c-cfa7-31c942b28bfe",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|7817e8f3-82b1-0e9c-cfa7-31c942b28bfe",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690811073231,
    },
    "e-595": {
      id: "e-595",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-596",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|e08551a4-6e42-ec15-3202-06d56dbe0f9b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|e08551a4-6e42-ec15-3202-06d56dbe0f9b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690811128076,
    },
    "e-597": {
      id: "e-597",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-36",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-598",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|5e032563-fc70-7e4e-29f5-375f64be0ac1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|5e032563-fc70-7e4e-29f5-375f64be0ac1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690811129210,
    },
    "e-599": {
      id: "e-599",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-600",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|7c13726e-39d9-de9a-2f36-7f54db9db2d2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|7c13726e-39d9-de9a-2f36-7f54db9db2d2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690811683486,
    },
    "e-601": {
      id: "e-601",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-602",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|08eaad80-63e2-0007-004f-1111b64ecf9a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|08eaad80-63e2-0007-004f-1111b64ecf9a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690812408215,
    },
    "e-603": {
      id: "e-603",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-604",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|869cadb5-148b-228b-dcd9-98bc234a303f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|869cadb5-148b-228b-dcd9-98bc234a303f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690812419467,
    },
    "e-605": {
      id: "e-605",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-606",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|589fae43-b9c2-b560-5f36-3a1c5debaa4b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|589fae43-b9c2-b560-5f36-3a1c5debaa4b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690812623999,
    },
    "e-607": {
      id: "e-607",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-43",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-608",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|088411a7-8b96-6148-5f5c-e2c8f1c8352e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|088411a7-8b96-6148-5f5c-e2c8f1c8352e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690812702731,
    },
    "e-609": {
      id: "e-609",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-42",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-610",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|0221810c-481a-c6cc-fb11-267d5b034c2a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|0221810c-481a-c6cc-fb11-267d5b034c2a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690812703195,
    },
    "e-611": {
      id: "e-611",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-612",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|8be9102c-734e-daaa-58ea-073e75b358a0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|8be9102c-734e-daaa-58ea-073e75b358a0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690812752451,
    },
    "e-613": {
      id: "e-613",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-46",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-614",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|056642f3-a6d1-f76c-d1f4-c07fa49c0c62",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|056642f3-a6d1-f76c-d1f4-c07fa49c0c62",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690812885680,
    },
    "e-615": {
      id: "e-615",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-45",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-616",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|f465cedf-824f-81da-3b53-1d95eea8b8b6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|f465cedf-824f-81da-3b53-1d95eea8b8b6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690812886037,
    },
    "e-629": {
      id: "e-629",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-53",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-630",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|a8919863-67d9-998e-a0a1-bae6ba8e7c0e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|a8919863-67d9-998e-a0a1-bae6ba8e7c0e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693232224575,
    },
    "e-631": {
      id: "e-631",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-54",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-632",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|edfab509-4737-68d8-eef8-ad12e2712d41",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|edfab509-4737-68d8-eef8-ad12e2712d41",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693232499445,
    },
    "e-663": {
      id: "e-663",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-47",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-664",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|667e2c50-6529-bf5b-303d-44082a90d0b1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|667e2c50-6529-bf5b-303d-44082a90d0b1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1695300436930,
    },
    "e-665": {
      id: "e-665",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-714",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|667e2c50-6529-bf5b-303d-44082a90d0b3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|667e2c50-6529-bf5b-303d-44082a90d0b3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1695300436930,
    },
    "e-667": {
      id: "e-667",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-55",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-716",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|667e2c50-6529-bf5b-303d-44082a90d0b5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|667e2c50-6529-bf5b-303d-44082a90d0b5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1695300436930,
    },
    "e-669": {
      id: "e-669",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-49",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-718",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|667e2c50-6529-bf5b-303d-44082a90d0b7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|667e2c50-6529-bf5b-303d-44082a90d0b7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1695300436930,
    },
    "e-671": {
      id: "e-671",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-56",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-720",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1695300551556,
    },
    "e-673": {
      id: "e-673",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-64",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-759",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|012e9a4a-fc65-568e-be36-eeb28c06f12c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|012e9a4a-fc65-568e-be36-eeb28c06f12c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1695302564403,
    },
    "e-675": {
      id: "e-675",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-63",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-733",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|74c531e1-4aa9-c192-2f82-e69c87b8702f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|74c531e1-4aa9-c192-2f82-e69c87b8702f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1695302565584,
    },
    "e-677": {
      id: "e-677",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-62",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-734",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|89d77cf1-162e-743e-77f5-f98192561271",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|89d77cf1-162e-743e-77f5-f98192561271",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1695302565928,
    },
    "e-679": {
      id: "e-679",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-61",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-728",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|b2f15b6f-1f89-310e-df49-192d15af3859",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|b2f15b6f-1f89-310e-df49-192d15af3859",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1695302566209,
    },
    "e-681": {
      id: "e-681",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-60",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-725",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|fdbc2330-cc46-87d9-4a3e-31afc78ce581",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|fdbc2330-cc46-87d9-4a3e-31afc78ce581",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1695302566412,
    },
    "e-683": {
      id: "e-683",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-59",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-730",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|d58b677d-69a6-c19a-dfe7-1612998c60bb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|d58b677d-69a6-c19a-dfe7-1612998c60bb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1695302566661,
    },
    "e-685": {
      id: "e-685",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-58",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-732",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|73f9cca7-db39-e317-e67f-0cc4614ae96e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|73f9cca7-db39-e317-e67f-0cc4614ae96e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1695302566856,
    },
    "e-687": {
      id: "e-687",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-57",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-727",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|8eefa0f7-082a-fbf2-7a3d-cdc7b90d52f9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|8eefa0f7-082a-fbf2-7a3d-cdc7b90d52f9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1695302567077,
    },
    "e-693": {
      id: "e-693",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-66",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-740",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|7b19d3fe-0c77-2c2b-e20a-c91551ff08d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|7b19d3fe-0c77-2c2b-e20a-c91551ff08d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1695302825527,
    },
    "e-695": {
      id: "e-695",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-65",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-742",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|eecab249-118c-4ecd-6f7f-ca3176fad5b0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|eecab249-118c-4ecd-6f7f-ca3176fad5b0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1695302825865,
    },
    "e-697": {
      id: "e-697",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-70",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-744",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|5a1d317f-8153-8711-8a3c-599853f86fc8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|5a1d317f-8153-8711-8a3c-599853f86fc8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1695302884448,
    },
    "e-699": {
      id: "e-699",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-69",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-746",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|1fc62a34-1748-8eca-d0d0-241704e95fb1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|1fc62a34-1748-8eca-d0d0-241704e95fb1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1695302885280,
    },
    "e-701": {
      id: "e-701",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-68",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-748",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|16a4d91f-962a-be7c-e316-68e6790f68ab",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|16a4d91f-962a-be7c-e316-68e6790f68ab",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1695302885933,
    },
    "e-703": {
      id: "e-703",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-67",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-750",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|4d3a6541-276f-91ee-3c40-3cbc53f372b2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|4d3a6541-276f-91ee-3c40-3cbc53f372b2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1695302886278,
    },
    "e-705": {
      id: "e-705",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-71", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|784040b3-ff67-1fbd-af2f-24c1ec5b9d4d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|784040b3-ff67-1fbd-af2f-24c1ec5b9d4d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-71-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1695303013930,
    },
    "e-706": {
      id: "e-706",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-73", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|d4d4c368-fb6f-68e6-b809-b3ad87ed465a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|d4d4c368-fb6f-68e6-b809-b3ad87ed465a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-73-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1695303065055,
    },
    "e-707": {
      id: "e-707",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-72", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|fa866188-68c7-9771-e155-26583c3c85e6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|fa866188-68c7-9771-e155-26583c3c85e6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-72-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1695303065466,
    },
    "e-708": {
      id: "e-708",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-74", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|9ef0cc50-9813-c3fb-f61a-01ec52d80ddb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|9ef0cc50-9813-c3fb-f61a-01ec52d80ddb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-74-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1695303126731,
    },
    "e-709": {
      id: "e-709",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-76", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|87ce426c-692f-6df0-d13b-ff64ca35eb85",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|87ce426c-692f-6df0-d13b-ff64ca35eb85",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-76-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1695303184046,
    },
    "e-710": {
      id: "e-710",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-75", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbefd|2b5485dc-ce9f-c45b-4bf3-47934119785d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbefd|2b5485dc-ce9f-c45b-4bf3-47934119785d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-75-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1695303184857,
    },
    "e-711": {
      id: "e-711",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-759",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6523ffa43309c56d0aebbe98|d6e7045b-5793-b572-8b46-9a9c7c7effb5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbe98|d6e7045b-5793-b572-8b46-9a9c7c7effb5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692886272140,
    },
    "e-713": {
      id: "e-713",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-714",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6523ffa43309c56d0aebbe98|5da5bebf-eb9d-bdaa-7b19-9b1cff762879",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbe98|5da5bebf-eb9d-bdaa-7b19-9b1cff762879",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692886134000,
    },
    "e-723": {
      id: "e-723",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-733",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6523ffa43309c56d0aebbe98|570bb85d-bce5-3381-a716-dafc6133a8c2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbe98|570bb85d-bce5-3381-a716-dafc6133a8c2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692886302818,
    },
    "e-735": {
      id: "e-735",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-736",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6523ffa43309c56d0aebbe98|9dae9f9e-d134-1a88-d01e-60bf3c78fd66",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbe98|9dae9f9e-d134-1a88-d01e-60bf3c78fd66",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692886405065,
    },
    "e-743": {
      id: "e-743",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-744",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6523ffa43309c56d0aebbe98|8a135902-a999-8808-f9b2-7696187d4a4c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbe98|8a135902-a999-8808-f9b2-7696187d4a4c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692886457290,
    },
    "e-751": {
      id: "e-751",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-752",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6523ffa43309c56d0aebbe98|d9b29067-e9c5-039d-9788-977aacae6e04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbe98|d9b29067-e9c5-039d-9788-977aacae6e04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692886507386,
    },
    "e-753": {
      id: "e-753",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-80", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "6523ffa43309c56d0aebbe98|edb9efa8-b719-ff66-fcde-b30ee0febfb4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbe98|edb9efa8-b719-ff66-fcde-b30ee0febfb4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-80-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 50,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-80-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 50,
          restingState: 50,
        },
      ],
      createdOn: 1692895197876,
    },
    "e-754": {
      id: "e-754",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-755",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6523ffa43309c56d0aebbe98|edb9efa8-b719-ff66-fcde-b30ee0febfb6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbe98|edb9efa8-b719-ff66-fcde-b30ee0febfb6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692886524342,
    },
    "e-756": {
      id: "e-756",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-78",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-757",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6523ffa43309c56d0aebbe98|edb9efa8-b719-ff66-fcde-b30ee0febfbf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbe98|edb9efa8-b719-ff66-fcde-b30ee0febfbf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692886540462,
    },
    "e-758": {
      id: "e-758",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-759",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6523ffa43309c56d0aebbe98|aa54c847-d60f-6b84-3fd3-b631c55660f7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbe98|aa54c847-d60f-6b84-3fd3-b631c55660f7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692886557604,
    },
    "e-760": {
      id: "e-760",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-81",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-761",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "bd7f8af6-585a-3ed3-20d3-2e029b19b319",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "bd7f8af6-585a-3ed3-20d3-2e029b19b319",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1521215797293,
    },
    "e-761": {
      id: "e-761",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-82",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-760",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "bd7f8af6-585a-3ed3-20d3-2e029b19b319",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "bd7f8af6-585a-3ed3-20d3-2e029b19b319",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1521215797293,
    },
    "e-762": {
      id: "e-762",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-83",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-763",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c|493abcf9-f9a0-a37f-5d01-88b7e9e4aa11",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c|493abcf9-f9a0-a37f-5d01-88b7e9e4aa11",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697789675676,
    },
    "e-763": {
      id: "e-763",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-84",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-762",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c|493abcf9-f9a0-a37f-5d01-88b7e9e4aa11",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c|493abcf9-f9a0-a37f-5d01-88b7e9e4aa11",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697789675679,
    },
    "e-764": {
      id: "e-764",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-36",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-765",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c|e90ae731-0363-ae35-0b6d-46c8f4b88922",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c|e90ae731-0363-ae35-0b6d-46c8f4b88922",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697810618767,
    },
    "e-766": {
      id: "e-766",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-85",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-767",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c|8ba52776-f067-17dd-9a37-38e3c829bd73",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c|8ba52776-f067-17dd-9a37-38e3c829bd73",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697810629918,
    },
    "e-768": {
      id: "e-768",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-769",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c|7b2a9b4c-9e60-e72e-8774-613c6033eb99",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c|7b2a9b4c-9e60-e72e-8774-613c6033eb99",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697810806662,
    },
    "e-770": {
      id: "e-770",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-771",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c|bdd87107-70d6-32ee-0b88-81d80d639aef",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c|bdd87107-70d6-32ee-0b88-81d80d639aef",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697811258666,
    },
    "e-772": {
      id: "e-772",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-773",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c|90b1bfe9-5b31-4f10-217b-96dfc0ad49ce",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c|90b1bfe9-5b31-4f10-217b-96dfc0ad49ce",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697811268711,
    },
    "e-774": {
      id: "e-774",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-75", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c|4043f586-49fa-c638-8233-0fee5fdca3f6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c|4043f586-49fa-c638-8233-0fee5fdca3f6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-75-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697811282871,
    },
    "e-776": {
      id: "e-776",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-777",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c|064dff66-4aa0-322e-14a0-6e9820e5b6fa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c|064dff66-4aa0-322e-14a0-6e9820e5b6fa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697811388228,
    },
    "e-778": {
      id: "e-778",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-779",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c|de37f3e8-f88b-991a-9a9d-44d9948b7f29",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c|de37f3e8-f88b-991a-9a9d-44d9948b7f29",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697811401561,
    },
    "e-780": {
      id: "e-780",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-781",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c|c967e5e5-a458-1108-cdfa-584889fa46f5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c|c967e5e5-a458-1108-cdfa-584889fa46f5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697811423860,
    },
    "e-782": {
      id: "e-782",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-783",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c|ce902ad6-27a1-18ff-e4e5-74b820be2c27",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c|ce902ad6-27a1-18ff-e4e5-74b820be2c27",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697811431526,
    },
    "e-784": {
      id: "e-784",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-785",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c|e8c65d2b-9783-8930-f413-7db7986c6251",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c|e8c65d2b-9783-8930-f413-7db7986c6251",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697811440676,
    },
    "e-786": {
      id: "e-786",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-787",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c|e8c65d2b-9783-8930-f413-7db7986c6258",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c|e8c65d2b-9783-8930-f413-7db7986c6258",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697811460643,
    },
    "e-788": {
      id: "e-788",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-789",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e600b59e1a235e40cfaf4|5091bd81-5399-a1b1-e830-40dc178abfc5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e600b59e1a235e40cfaf4|5091bd81-5399-a1b1-e830-40dc178abfc5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697815235094,
    },
    "e-790": {
      id: "e-790",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-85",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-791",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e600b59e1a235e40cfaf4|5091bd81-5399-a1b1-e830-40dc178abfd9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e600b59e1a235e40cfaf4|5091bd81-5399-a1b1-e830-40dc178abfd9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697815250026,
    },
    "e-792": {
      id: "e-792",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-793",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e600b59e1a235e40cfaf4|5091bd81-5399-a1b1-e830-40dc178abfdb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e600b59e1a235e40cfaf4|5091bd81-5399-a1b1-e830-40dc178abfdb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697815264608,
    },
    "e-794": {
      id: "e-794",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-795",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e600b59e1a235e40cfaf4|93034a77-1060-18d0-153d-a7daa3ccbfd7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e600b59e1a235e40cfaf4|93034a77-1060-18d0-153d-a7daa3ccbfd7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697815580530,
    },
    "e-796": {
      id: "e-796",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-797",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e600b59e1a235e40cfaf4|d1d8ebf3-15f2-be75-0a44-6e3bfb24b01a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e600b59e1a235e40cfaf4|d1d8ebf3-15f2-be75-0a44-6e3bfb24b01a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697815604299,
    },
    "e-798": {
      id: "e-798",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-799",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e600b59e1a235e40cfaf4|7432de7c-df03-591e-2e80-505959baf245",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e600b59e1a235e40cfaf4|7432de7c-df03-591e-2e80-505959baf245",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697815614315,
    },
    "e-800": {
      id: "e-800",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-801",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e600b59e1a235e40cfaf4|04f9ae32-eaa6-fdd5-37d1-ad0f180ceeea",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e600b59e1a235e40cfaf4|04f9ae32-eaa6-fdd5-37d1-ad0f180ceeea",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697815623554,
    },
    "e-802": {
      id: "e-802",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-803",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e600b59e1a235e40cfaf4|35eae90b-d6f5-9fe5-45e5-5c400ca581d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e600b59e1a235e40cfaf4|35eae90b-d6f5-9fe5-45e5-5c400ca581d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697815645512,
    },
    "e-804": {
      id: "e-804",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-42",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-805",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e600b59e1a235e40cfaf4|69d72d46-cb8c-2b4d-f3c6-ae43787cc87b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e600b59e1a235e40cfaf4|69d72d46-cb8c-2b4d-f3c6-ae43787cc87b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697815653779,
    },
    "e-810": {
      id: "e-810",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-47",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-811",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65302f8ecd3a0d2778c0d394|53342ac0-2038-250e-06bd-a79c5630793c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65302f8ecd3a0d2778c0d394|53342ac0-2038-250e-06bd-a79c5630793c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697818330790,
    },
    "e-812": {
      id: "e-812",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-813",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65302f8ecd3a0d2778c0d394|5f4fcc73-3041-fe39-0c2d-8b31ea9ee93e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65302f8ecd3a0d2778c0d394|5f4fcc73-3041-fe39-0c2d-8b31ea9ee93e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697818339239,
    },
    "e-814": {
      id: "e-814",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-815",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65302f8ecd3a0d2778c0d394|8dc27608-48d6-1208-b43e-3f4c1d647a9f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65302f8ecd3a0d2778c0d394|8dc27608-48d6-1208-b43e-3f4c1d647a9f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697818346255,
    },
    "e-816": {
      id: "e-816",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-817",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65302f8ecd3a0d2778c0d394|a35696ef-2d76-9839-23db-827fe82a3358",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65302f8ecd3a0d2778c0d394|a35696ef-2d76-9839-23db-827fe82a3358",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697818359173,
    },
    "e-818": {
      id: "e-818",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-819",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65302f8ecd3a0d2778c0d394|cff3fc98-9fe9-289e-72cb-dbe1269aae4d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65302f8ecd3a0d2778c0d394|cff3fc98-9fe9-289e-72cb-dbe1269aae4d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697818413605,
    },
    "e-820": {
      id: "e-820",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-821",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65302f8ecd3a0d2778c0d394|fae921ea-9dfa-f3b4-31e2-c0c64333df4e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65302f8ecd3a0d2778c0d394|fae921ea-9dfa-f3b4-31e2-c0c64333df4e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697818421342,
    },
    "e-822": {
      id: "e-822",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-823",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65302f8ecd3a0d2778c0d394|ec16a5a9-6e7c-d62a-fa39-0d960e5e1239",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65302f8ecd3a0d2778c0d394|ec16a5a9-6e7c-d62a-fa39-0d960e5e1239",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697818427823,
    },
    "e-824": {
      id: "e-824",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-47",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-825",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf10|733247a4-37e8-cf79-ae5a-5d6b8008e8cf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf10|733247a4-37e8-cf79-ae5a-5d6b8008e8cf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697818472706,
    },
    "e-826": {
      id: "e-826",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-827",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf10|733247a4-37e8-cf79-ae5a-5d6b8008e8db",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf10|733247a4-37e8-cf79-ae5a-5d6b8008e8db",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697818472706,
    },
    "e-828": {
      id: "e-828",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-829",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf10|733247a4-37e8-cf79-ae5a-5d6b8008e8dd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf10|733247a4-37e8-cf79-ae5a-5d6b8008e8dd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697818472706,
    },
    "e-832": {
      id: "e-832",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-833",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf10|14258d3d-1e38-08f2-1935-f160386cfbec",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf10|14258d3d-1e38-08f2-1935-f160386cfbec",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697818663028,
    },
    "e-836": {
      id: "e-836",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-837",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e9432764aea78b72759a8|3b69a519-f427-70a5-1fb5-bf7ee5f966f6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e9432764aea78b72759a8|3b69a519-f427-70a5-1fb5-bf7ee5f966f6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698068840027,
    },
    "e-838": {
      id: "e-838",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-87",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-839",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e9432764aea78b72759a8|3b69a519-f427-70a5-1fb5-bf7ee5f9670a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e9432764aea78b72759a8|3b69a519-f427-70a5-1fb5-bf7ee5f9670a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698068840027,
    },
    "e-840": {
      id: "e-840",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-55",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-841",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e9432764aea78b72759a8|3b69a519-f427-70a5-1fb5-bf7ee5f9670c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e9432764aea78b72759a8|3b69a519-f427-70a5-1fb5-bf7ee5f9670c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698068840027,
    },
    "e-843": {
      id: "e-843",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-71", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e9432764aea78b72759a8|3b69a519-f427-70a5-1fb5-bf7ee5f96710",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e9432764aea78b72759a8|3b69a519-f427-70a5-1fb5-bf7ee5f96710",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-71-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698068840027,
    },
    "e-844": {
      id: "e-844",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-86", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e9432764aea78b72759a8",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e9432764aea78b72759a8",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-86-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698073557323,
    },
    "e-845": {
      id: "e-845",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-86", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-86-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698073650883,
    },
    "e-846": {
      id: "e-846",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-847",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652fdcc9b9c59c9e6bc676a4|400e1a05-386a-4657-91c5-7fe64ea77be8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652fdcc9b9c59c9e6bc676a4|400e1a05-386a-4657-91c5-7fe64ea77be8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698073775515,
    },
    "e-852": {
      id: "e-852",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-853",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652fdcc9b9c59c9e6bc676a4|d9a2243e-79cc-3038-b6f8-596445f59bb1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652fdcc9b9c59c9e6bc676a4|d9a2243e-79cc-3038-b6f8-596445f59bb1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698073864395,
    },
    "e-854": {
      id: "e-854",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-83",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-855",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652fdcc9b9c59c9e6bc676a4|d9a2243e-79cc-3038-b6f8-596445f59bb2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652fdcc9b9c59c9e6bc676a4|d9a2243e-79cc-3038-b6f8-596445f59bb2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698073864395,
    },
    "e-855": {
      id: "e-855",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-84",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-854",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652fdcc9b9c59c9e6bc676a4|d9a2243e-79cc-3038-b6f8-596445f59bb2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652fdcc9b9c59c9e6bc676a4|d9a2243e-79cc-3038-b6f8-596445f59bb2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698073864395,
    },
    "e-856": {
      id: "e-856",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-47",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-857",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf64|89d8e038-9ddc-3356-7fee-1ffb4efe5b92",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf64|89d8e038-9ddc-3356-7fee-1ffb4efe5b92",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698157285565,
    },
    "e-858": {
      id: "e-858",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-859",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf64|89d8e038-9ddc-3356-7fee-1ffb4efe5b9e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf64|89d8e038-9ddc-3356-7fee-1ffb4efe5b9e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698157285565,
    },
    "e-862": {
      id: "e-862",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-863",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf64|615056a1-94b6-2b80-020d-793b3c3f3dea",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf64|615056a1-94b6-2b80-020d-793b3c3f3dea",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698157418043,
    },
    "e-864": {
      id: "e-864",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-865",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf64|126d8a09-068b-8687-6bb6-3754031b4cb3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf64|126d8a09-068b-8687-6bb6-3754031b4cb3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698157440346,
    },
    "e-866": {
      id: "e-866",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-867",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf64|e991135c-4b6d-a6b0-0a57-02992b8836ba",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf64|e991135c-4b6d-a6b0-0a57-02992b8836ba",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698157448570,
    },
    "e-868": {
      id: "e-868",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-869",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf64|52bce82b-eda8-5e81-c980-cd3b8d56acf2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf64|52bce82b-eda8-5e81-c980-cd3b8d56acf2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698157591707,
    },
    "e-870": {
      id: "e-870",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-871",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf64|ca8a3bc3-750e-9226-d945-23b484148a09",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf64|ca8a3bc3-750e-9226-d945-23b484148a09",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698157711161,
    },
    "e-872": {
      id: "e-872",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-873",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf64|e9e41832-2248-9fd7-7f92-40af474e863d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf64|e9e41832-2248-9fd7-7f92-40af474e863d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698158407891,
    },
    "e-874": {
      id: "e-874",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-875",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf64|3bf588c9-deca-f0f5-5cc7-6cdfde8ea108",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf64|3bf588c9-deca-f0f5-5cc7-6cdfde8ea108",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698158919604,
    },
    "e-880": {
      id: "e-880",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-73", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c|5d0829bb-2b41-17d4-07f5-ae7b9a36f4ea",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c|5d0829bb-2b41-17d4-07f5-ae7b9a36f4ea",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-73-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698160499476,
    },
    "e-883": {
      id: "e-883",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-75", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c|a5d0d07f-4948-8fb2-e752-ebac88734765",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c|a5d0d07f-4948-8fb2-e752-ebac88734765",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-75-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698160587750,
    },
    "e-884": {
      id: "e-884",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-885",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c|a5d0d07f-4948-8fb2-e752-ebac88734765",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c|a5d0d07f-4948-8fb2-e752-ebac88734765",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698160605604,
    },
    "e-886": {
      id: "e-886",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-887",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "7f126fb4-adce-69a2-6bf5-e6da2bab91a8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "7f126fb4-adce-69a2-6bf5-e6da2bab91a8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698160655731,
    },
    "e-888": {
      id: "e-888",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-889",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "7f126fb4-adce-69a2-6bf5-e6da2bab91af",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "7f126fb4-adce-69a2-6bf5-e6da2bab91af",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698160676900,
    },
    "e-907": {
      id: "e-907",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-908",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "693cd5af-072b-a271-ee12-d64a6eee0840",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "693cd5af-072b-a271-ee12-d64a6eee0840",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698161269797,
    },
    "e-909": {
      id: "e-909",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-910",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "693cd5af-072b-a271-ee12-d64a6eee0847",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "693cd5af-072b-a271-ee12-d64a6eee0847",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698161269797,
    },
    "e-914": {
      id: "e-914",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-915",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e600b59e1a235e40cfaf4|5091bd81-5399-a1b1-e830-40dc178abfdf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e600b59e1a235e40cfaf4|5091bd81-5399-a1b1-e830-40dc178abfdf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698161347099,
    },
    "e-916": {
      id: "e-916",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-917",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e600b59e1a235e40cfaf4|95222eed-9de7-11c4-1d36-590177577a33",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e600b59e1a235e40cfaf4|95222eed-9de7-11c4-1d36-590177577a33",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698161484341,
    },
    "e-918": {
      id: "e-918",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-75", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e600b59e1a235e40cfaf4|95222eed-9de7-11c4-1d36-590177577a33",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e600b59e1a235e40cfaf4|95222eed-9de7-11c4-1d36-590177577a33",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-75-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698161498523,
    },
    "e-919": {
      id: "e-919",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-920",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c|773c08db-09a0-339a-06a3-a578deb58fc3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c|773c08db-09a0-339a-06a3-a578deb58fc3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698164647822,
    },
    "e-921": {
      id: "e-921",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-922",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6523ffa43309c56d0aebbf7c|582cbe0e-b09a-aca0-af94-a4000a5eea9b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6523ffa43309c56d0aebbf7c|582cbe0e-b09a-aca0-af94-a4000a5eea9b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698166089277,
    },
    "e-923": {
      id: "e-923",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-72", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652fdcc9b9c59c9e6bc676a4|835e6282-5091-c741-e6e7-2668f96957ee",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652fdcc9b9c59c9e6bc676a4|835e6282-5091-c741-e6e7-2668f96957ee",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-72-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698168449686,
    },
    "e-924": {
      id: "e-924",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-75", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652fdcc9b9c59c9e6bc676a4|b658870e-0b05-9bc8-22fc-4c8c5b14c58d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652fdcc9b9c59c9e6bc676a4|b658870e-0b05-9bc8-22fc-4c8c5b14c58d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-75-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698168460233,
    },
    "e-925": {
      id: "e-925",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-55",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-926",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652fdce0b3731aa019f0c562|0073ca47-ca97-4070-e421-418d7de5ac1d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652fdce0b3731aa019f0c562|0073ca47-ca97-4070-e421-418d7de5ac1d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698168967197,
    },
    "e-927": {
      id: "e-927",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-35",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-928",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652fdce0b3731aa019f0c562|0d0ff9c9-106c-7827-919d-65bff3ed713d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652fdce0b3731aa019f0c562|0d0ff9c9-106c-7827-919d-65bff3ed713d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698169007045,
    },
    "e-929": {
      id: "e-929",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-930",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652fdce0b3731aa019f0c562|34534049-35df-0012-f1cd-9620b3b07aa5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652fdce0b3731aa019f0c562|34534049-35df-0012-f1cd-9620b3b07aa5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698169014744,
    },
    "e-931": {
      id: "e-931",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-75", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652fdce0b3731aa019f0c562|6f036836-baf0-e534-7b05-855359a16365",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652fdce0b3731aa019f0c562|6f036836-baf0-e534-7b05-855359a16365",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-75-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698169037580,
    },
    "e-932": {
      id: "e-932",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-72", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652fdce0b3731aa019f0c562|5c9d8ebe-70df-7a01-59ba-36efb4a3b206",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652fdce0b3731aa019f0c562|5c9d8ebe-70df-7a01-59ba-36efb4a3b206",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-72-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698169053712,
    },
    "e-933": {
      id: "e-933",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-55",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-934",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e9432764aea78b72759a8|3b69a519-f427-70a5-1fb5-bf7ee5f96710",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e9432764aea78b72759a8|3b69a519-f427-70a5-1fb5-bf7ee5f96710",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698169592433,
    },
    "e-935": {
      id: "e-935",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-936",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e9432764aea78b72759a8|96381e91-dcb1-5608-19da-9715ad805e3c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e9432764aea78b72759a8|96381e91-dcb1-5608-19da-9715ad805e3c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698169830654,
    },
    "e-937": {
      id: "e-937",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-938",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e9432764aea78b72759a8|15605bf5-aeae-b6ec-d0a5-371b824898fc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e9432764aea78b72759a8|15605bf5-aeae-b6ec-d0a5-371b824898fc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698169946717,
    },
    "e-939": {
      id: "e-939",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-940",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652e9432764aea78b72759a8|8be039a5-4415-5599-6b3c-f0542e3c356a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652e9432764aea78b72759a8|8be039a5-4415-5599-6b3c-f0542e3c356a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698169967743,
    },
  },
  actionLists: {
    "a-17": {
      id: "a-17",
      title: "Style Guide Collapse Item (Reveal)",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-17-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {},
                value: "none",
              },
            },
            {
              id: "a-17-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".asset",
                  selectorGuids: ["5c653ca6-87f1-41b6-2f42-765513340420"],
                },
                xValue: null,
                zValue: 180,
                xUnit: "deg",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-17-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {},
                value: "block",
              },
            },
            {
              id: "a-17-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".asset",
                  selectorGuids: ["5c653ca6-87f1-41b6-2f42-765513340420"],
                },
                xValue: null,
                zValue: 0,
                xUnit: "deg",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1660745693290,
    },
    "a-18": {
      id: "a-18",
      title: "Style Guide Collapse Item (Close)",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-18-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {},
                value: "none",
              },
            },
            {
              id: "a-18-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".asset",
                  selectorGuids: ["5c653ca6-87f1-41b6-2f42-765513340420"],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1660746240742,
    },
    "a-35": {
      id: "a-35",
      title: "Element Slide In Right",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-35-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|2e279085-eac3-8e7e-bd1d-ccc4fbfcf41c",
                },
                xValue: -100,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-35-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|2e279085-eac3-8e7e-bd1d-ccc4fbfcf41c",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-35-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 800,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|2e279085-eac3-8e7e-bd1d-ccc4fbfcf41c",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-35-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: [0.25, 0.1, 0.25, 1],
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|2e279085-eac3-8e7e-bd1d-ccc4fbfcf41c",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690536879305,
    },
    "a-37": {
      id: "a-37",
      title: "Element Slide In Right Delay 0.3",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-37-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|2e279085-eac3-8e7e-bd1d-ccc4fbfcf41c",
                },
                xValue: -100,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-37-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|2e279085-eac3-8e7e-bd1d-ccc4fbfcf41c",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-37-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 300,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 800,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|2e279085-eac3-8e7e-bd1d-ccc4fbfcf41c",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-37-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 300,
                easing: [0.25, 0.1, 0.25, 1],
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|2e279085-eac3-8e7e-bd1d-ccc4fbfcf41c",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690536879305,
    },
    "a-36": {
      id: "a-36",
      title: "Element Slide In Right Delay 0.15",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-36-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|2e279085-eac3-8e7e-bd1d-ccc4fbfcf41c",
                },
                xValue: -100,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-36-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|2e279085-eac3-8e7e-bd1d-ccc4fbfcf41c",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-36-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 150,
                easing: [0.25, 0.1, 0.25, 1],
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|2e279085-eac3-8e7e-bd1d-ccc4fbfcf41c",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-36-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 150,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 800,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|2e279085-eac3-8e7e-bd1d-ccc4fbfcf41c",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690536879305,
    },
    "a-38": {
      id: "a-38",
      title: "Element Slide In Left",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-38-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: 100,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-38-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-38-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 800,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-38-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: [0.25, 0.1, 0.25, 1],
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690536879305,
    },
    "a-39": {
      id: "a-39",
      title: "Element Slide In Left Delay 0.15",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-39-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: 100,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-39-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-39-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 150,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 800,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-39-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 150,
                easing: [0.25, 0.1, 0.25, 1],
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690536879305,
    },
    "a-40": {
      id: "a-40",
      title: "Element Slide In Left Delay 0.3",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-40-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: 100,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-40-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-40-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 300,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 800,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-40-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 300,
                easing: [0.25, 0.1, 0.25, 1],
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690536879305,
    },
    "a-41": {
      id: "a-41",
      title: "Element Slide In Top",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-41-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: null,
                yValue: 100,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-41-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-41-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 800,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-41-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: [0.25, 0.1, 0.25, 1],
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690536879305,
    },
    "a-43": {
      id: "a-43",
      title: "Element Slide In Top Delay 0.3",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-43-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: null,
                yValue: 100,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-43-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-43-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 300,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 800,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-43-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 300,
                easing: [0.25, 0.1, 0.25, 1],
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690536879305,
    },
    "a-42": {
      id: "a-42",
      title: "Element Slide In Top Delay 0.15",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-42-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: null,
                yValue: 100,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-42-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-42-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 150,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 800,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-42-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 150,
                easing: [0.25, 0.1, 0.25, 1],
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690536879305,
    },
    "a-44": {
      id: "a-44",
      title: "Element Slide In Bottom",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-44-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: null,
                yValue: -100,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-44-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-44-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 800,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-44-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: [0.25, 0.1, 0.25, 1],
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690536879305,
    },
    "a-46": {
      id: "a-46",
      title: "Element Slide In Bottom Delay 0.3",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-46-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: null,
                yValue: -100,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-46-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-46-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 300,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 800,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-46-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 300,
                easing: [0.25, 0.1, 0.25, 1],
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690536879305,
    },
    "a-45": {
      id: "a-45",
      title: "Element Slide In Bottom Delay 0.15",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-45-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: null,
                yValue: -100,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-45-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-45-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 150,
                easing: [0.25, 0.1, 0.409, 1.451],
                duration: 800,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-45-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 150,
                easing: [0.25, 0.1, 0.25, 1],
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690536879305,
    },
    "a-53": {
      id: "a-53",
      title: "Element Slide In Top Delay 0.45",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-53-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: null,
                yValue: 100,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-53-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-53-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 450,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 800,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-53-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 450,
                easing: [0.25, 0.1, 0.25, 1],
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690536879305,
    },
    "a-54": {
      id: "a-54",
      title: "Element Slide In Bottom Delay 0.45",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-54-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: null,
                yValue: -100,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-54-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-54-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 450,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 800,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-54-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 450,
                easing: [0.25, 0.1, 0.25, 1],
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690536879305,
    },
    "a-47": {
      id: "a-47",
      title: "Element Opacity Rise Duration 0.5",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-47-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|b619f9d0-2a52-ecd7-5ef2-3d2103ef94c7",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-47-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: [0.25, 0.1, 0.25, 1],
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|b619f9d0-2a52-ecd7-5ef2-3d2103ef94c7",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690540374120,
    },
    "a-48": {
      id: "a-48",
      title: "Element Opacity Rise Duration 1.0",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-48-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|b619f9d0-2a52-ecd7-5ef2-3d2103ef94c7",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-48-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: [0.25, 0.1, 0.25, 1],
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|b619f9d0-2a52-ecd7-5ef2-3d2103ef94c7",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690540374120,
    },
    "a-55": {
      id: "a-55",
      title: "Element Opacity Rise Duration 1.5",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-55-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|b619f9d0-2a52-ecd7-5ef2-3d2103ef94c7",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-55-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: [0.25, 0.1, 0.25, 1],
                duration: 1500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|b619f9d0-2a52-ecd7-5ef2-3d2103ef94c7",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690540374120,
    },
    "a-49": {
      id: "a-49",
      title: "Element Opacity Rise Duration 2.0",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-49-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|b619f9d0-2a52-ecd7-5ef2-3d2103ef94c7",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-49-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: [0.25, 0.1, 0.25, 1],
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|b619f9d0-2a52-ecd7-5ef2-3d2103ef94c7",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690540374120,
    },
    "a-56": {
      id: "a-56",
      title: "Element Appear From Left 0.15s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-56-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: -200,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-56-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 150,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1695302385613,
    },
    "a-64": {
      id: "a-64",
      title: "Element Appear From Right 0.6s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-64-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 200,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-64-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 600,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1695302385613,
    },
    "a-63": {
      id: "a-63",
      title: "Element Appear From Right 0.45s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-63-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 200,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-63-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 450,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1695302385613,
    },
    "a-62": {
      id: "a-62",
      title: "Element Appear From Right 0.3s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-62-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 200,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-62-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 300,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1695302385613,
    },
    "a-61": {
      id: "a-61",
      title: "Element Appear From Right 0.15s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-61-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 200,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-61-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 150,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1695302385613,
    },
    "a-60": {
      id: "a-60",
      title: "Element Appear From Left 0.75s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-60-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: -200,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-60-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 750,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1695302385613,
    },
    "a-59": {
      id: "a-59",
      title: "Element Appear From Left 0.6s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-59-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: -200,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-59-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 600,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1695302385613,
    },
    "a-58": {
      id: "a-58",
      title: "Element Appear From Left 0.45s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-58-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: -200,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-58-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 450,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1695302385613,
    },
    "a-57": {
      id: "a-57",
      title: "Element Appear From Left 0.3s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-57-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: -200,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-57-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 300,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1695302385613,
    },
    "a-66": {
      id: "a-66",
      title: "Element Appear From Bottom 0.15s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-66-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: null,
                yValue: 200,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-66-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 150,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 0,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1695302385613,
    },
    "a-65": {
      id: "a-65",
      title: "Element Appear From Right 0.75s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-65-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 200,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-65-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 750,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1695302385613,
    },
    "a-70": {
      id: "a-70",
      title: "Element Appear From Bottom 0.75s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-70-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: null,
                yValue: 200,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-70-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 750,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 0,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1695302385613,
    },
    "a-69": {
      id: "a-69",
      title: "Element Appear From Bottom 0.6s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-69-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: null,
                yValue: 200,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-69-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 600,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 0,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1695302385613,
    },
    "a-68": {
      id: "a-68",
      title: "Element Appear From Bottom 0.45s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-68-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: null,
                yValue: 200,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-68-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 450,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 0,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1695302385613,
    },
    "a-67": {
      id: "a-67",
      title: "Element Appear From Bottom 0.3s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-67-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: null,
                yValue: 200,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-67-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 300,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbefd|6d2f0f6f-23f9-b3b5-fe13-ce7e5d8d5e45",
                },
                xValue: 0,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1695302385613,
    },
    "a-71": {
      id: "a-71",
      title: "Element Parallax Move Up 50px",
      continuousParameterGroups: [
        {
          id: "a-71-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-71-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "6523ffa43309c56d0aebbefd|784040b3-ff67-1fbd-af2f-24c1ec5b9d4d",
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-71-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "6523ffa43309c56d0aebbefd|784040b3-ff67-1fbd-af2f-24c1ec5b9d4d",
                    },
                    yValue: -50,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1695303021604,
    },
    "a-73": {
      id: "a-73",
      title: "Element Parallax Move Up 100px",
      continuousParameterGroups: [
        {
          id: "a-73-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-73-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "6523ffa43309c56d0aebbefd|784040b3-ff67-1fbd-af2f-24c1ec5b9d4d",
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-73-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "6523ffa43309c56d0aebbefd|784040b3-ff67-1fbd-af2f-24c1ec5b9d4d",
                    },
                    yValue: -100,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1695303021604,
    },
    "a-72": {
      id: "a-72",
      title: "Element Parallax Move Up 75px",
      continuousParameterGroups: [
        {
          id: "a-72-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-72-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "6523ffa43309c56d0aebbefd|784040b3-ff67-1fbd-af2f-24c1ec5b9d4d",
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-72-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "6523ffa43309c56d0aebbefd|784040b3-ff67-1fbd-af2f-24c1ec5b9d4d",
                    },
                    yValue: -75,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1695303021604,
    },
    "a-74": {
      id: "a-74",
      title: "Element Parallax Move Down 50px",
      continuousParameterGroups: [
        {
          id: "a-74-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-74-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "6523ffa43309c56d0aebbefd|784040b3-ff67-1fbd-af2f-24c1ec5b9d4d",
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-74-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "6523ffa43309c56d0aebbefd|784040b3-ff67-1fbd-af2f-24c1ec5b9d4d",
                    },
                    yValue: 50,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1695303021604,
    },
    "a-76": {
      id: "a-76",
      title: "Element Parallax Move Down 100px",
      continuousParameterGroups: [
        {
          id: "a-76-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-76-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "6523ffa43309c56d0aebbefd|784040b3-ff67-1fbd-af2f-24c1ec5b9d4d",
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-76-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "6523ffa43309c56d0aebbefd|784040b3-ff67-1fbd-af2f-24c1ec5b9d4d",
                    },
                    yValue: 100,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1695303021604,
    },
    "a-75": {
      id: "a-75",
      title: "Element Parallax Move Down 75px",
      continuousParameterGroups: [
        {
          id: "a-75-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-75-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "6523ffa43309c56d0aebbefd|784040b3-ff67-1fbd-af2f-24c1ec5b9d4d",
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-75-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "6523ffa43309c56d0aebbefd|784040b3-ff67-1fbd-af2f-24c1ec5b9d4d",
                    },
                    yValue: 75,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1695303021604,
    },
    "a-80": {
      id: "a-80",
      title: "Templates Shake",
      continuousParameterGroups: [
        {
          id: "a-80-p",
          type: "MOUSE_X",
          parameterLabel: "Mouse X",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-80-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6523ffa43309c56d0aebbe98|edb9efa8-b719-ff66-fcde-b30ee0febfb6",
                    },
                    xValue: 20,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-80-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6523ffa43309c56d0aebbe98|edb9efa8-b719-ff66-fcde-b30ee0febfbf",
                    },
                    xValue: 75,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-80-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6523ffa43309c56d0aebbe98|edb9efa8-b719-ff66-fcde-b30ee0febfb6",
                    },
                    xValue: -20,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-80-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6523ffa43309c56d0aebbe98|edb9efa8-b719-ff66-fcde-b30ee0febfbf",
                    },
                    xValue: -75,
                    yValue: null,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "a-80-p-2",
          type: "MOUSE_Y",
          parameterLabel: "Mouse Y",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-80-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6523ffa43309c56d0aebbe98|edb9efa8-b719-ff66-fcde-b30ee0febfb6",
                    },
                    yValue: 10,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-80-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6523ffa43309c56d0aebbe98|edb9efa8-b719-ff66-fcde-b30ee0febfbf",
                    },
                    yValue: 30,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-80-n-7",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6523ffa43309c56d0aebbe98|edb9efa8-b719-ff66-fcde-b30ee0febfb6",
                    },
                    yValue: -10,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-80-n-8",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6523ffa43309c56d0aebbe98|edb9efa8-b719-ff66-fcde-b30ee0febfbf",
                    },
                    yValue: -30,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1692895209007,
    },
    "a-78": {
      id: "a-78",
      title: "Element Slide In Top Delay 0.25",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-78-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: null,
                yValue: 100,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-78-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-78-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 250,
                easing: [0.25, 0.1, 0.409, 1.451],
                duration: 800,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-78-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 250,
                easing: [0.25, 0.1, 0.25, 1],
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "64bd329664defa40845211bd|38a6b21d-5ac1-8fb2-9660-1c02b0461cd2",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690536879305,
    },
    "a-81": {
      id: "a-81",
      title: "Hamburger Menu Click In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-81-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: { id: "bd7f8af6-585a-3ed3-20d3-2e029b19b31a" },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
            {
              id: "a-81-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: { id: "bd7f8af6-585a-3ed3-20d3-2e029b19b31c" },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-81-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 200,
                target: { id: "bd7f8af6-585a-3ed3-20d3-2e029b19b31a" },
                yValue: 6,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-81-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 200,
                target: { id: "bd7f8af6-585a-3ed3-20d3-2e029b19b31c" },
                yValue: -7.8,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-81-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 100,
                easing: "easeInOut",
                duration: 200,
                target: { id: "bd7f8af6-585a-3ed3-20d3-2e029b19b31b" },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-81-n-6",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 100,
                easing: "inOutQuart",
                duration: 200,
                target: { id: "bd7f8af6-585a-3ed3-20d3-2e029b19b31c" },
                zValue: 45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
            {
              id: "a-81-n-7",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 100,
                easing: "inOutQuart",
                duration: 200,
                target: { id: "bd7f8af6-585a-3ed3-20d3-2e029b19b31a" },
                zValue: -45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1521215800415,
    },
    "a-82": {
      id: "a-82",
      title: "Hamburger Menu Click Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-82-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 200,
                target: { id: "bd7f8af6-585a-3ed3-20d3-2e029b19b31a" },
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-82-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 200,
                target: { id: "bd7f8af6-585a-3ed3-20d3-2e029b19b31c" },
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-82-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 200,
                target: { id: "bd7f8af6-585a-3ed3-20d3-2e029b19b31a" },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
            {
              id: "a-82-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 200,
                target: { id: "bd7f8af6-585a-3ed3-20d3-2e029b19b31c" },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
            {
              id: "a-82-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "easeInOut",
                duration: 200,
                target: { id: "bd7f8af6-585a-3ed3-20d3-2e029b19b31b" },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1521215800415,
    },
    "a-83": {
      id: "a-83",
      title: "Service Card Hover In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-83-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-image-wrapper",
                  selectorGuids: ["cec8bafa-b1d9-91b7-f795-c88ee11c04ea"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-83-n-3",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbf7c|493abcf9-f9a0-a37f-5d01-88b7e9e4aa11",
                },
                globalSwatchId: "",
                rValue: 250,
                bValue: 152,
                gValue: 226,
                aValue: 1,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-83-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 8000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-image-wrapper",
                  selectorGuids: ["cec8bafa-b1d9-91b7-f795-c88ee11c04ea"],
                },
                xValue: 1.2,
                yValue: 1.2,
                locked: true,
              },
            },
            {
              id: "a-83-n-4",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbf7c|493abcf9-f9a0-a37f-5d01-88b7e9e4aa11",
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 117,
                gValue: 199,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1697789680000,
    },
    "a-84": {
      id: "a-84",
      title: "Service Card Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-84-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-image-wrapper",
                  selectorGuids: ["cec8bafa-b1d9-91b7-f795-c88ee11c04ea"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-84-n-3",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbf7c|493abcf9-f9a0-a37f-5d01-88b7e9e4aa11",
                },
                globalSwatchId: "",
                rValue: 250,
                bValue: 152,
                gValue: 226,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1697789680000,
    },
    "a-85": {
      id: "a-85",
      title: "Hero Image Slide In Left",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-85-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbf7c|8ba52776-f067-17dd-9a37-38e3c829bd73",
                },
                xValue: 100,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-85-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbf7c|8ba52776-f067-17dd-9a37-38e3c829bd73",
                },
                zValue: -6,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-85-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbf7c|8ba52776-f067-17dd-9a37-38e3c829bd73",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-85-n-6",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbf7c|8ba52776-f067-17dd-9a37-38e3c829bd73",
                },
                zValue: -6,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-85-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 150,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 800,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbf7c|8ba52776-f067-17dd-9a37-38e3c829bd73",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-85-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 150,
                easing: "ease",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbf7c|8ba52776-f067-17dd-9a37-38e3c829bd73",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1697810836169,
    },
    "a-87": {
      id: "a-87",
      title: "Hero Image Slide In Right",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-87-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbf7c|8ba52776-f067-17dd-9a37-38e3c829bd73",
                },
                xValue: -100,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-87-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbf7c|8ba52776-f067-17dd-9a37-38e3c829bd73",
                },
                zValue: 6,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-87-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbf7c|8ba52776-f067-17dd-9a37-38e3c829bd73",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-87-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbf7c|8ba52776-f067-17dd-9a37-38e3c829bd73",
                },
                zValue: 6,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-87-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 150,
                easing: [0.215, 0.61, 0.355, 1],
                duration: 800,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbf7c|8ba52776-f067-17dd-9a37-38e3c829bd73",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-87-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 150,
                easing: "ease",
                duration: 1000,
                target: {
                  useEventTarget: true,
                  id: "6523ffa43309c56d0aebbf7c|8ba52776-f067-17dd-9a37-38e3c829bd73",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1697810836169,
    },
    "a-86": {
      id: "a-86",
      title: "Navbar BG Animation",
      continuousParameterGroups: [
        {
          id: "a-86-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-86-n",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: { id: "bd7f8af6-585a-3ed3-20d3-2e029b19b304" },
                    globalSwatchId: "",
                    rValue: 254,
                    bValue: 203,
                    gValue: 255,
                    aValue: 0,
                  },
                },
              ],
            },
            {
              keyframe: 1,
              actionItems: [
                {
                  id: "a-86-n-2",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: { id: "bd7f8af6-585a-3ed3-20d3-2e029b19b304" },
                    globalSwatchId: "",
                    rValue: 254,
                    bValue: 203,
                    gValue: 255,
                    aValue: 1,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1698073561367,
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
