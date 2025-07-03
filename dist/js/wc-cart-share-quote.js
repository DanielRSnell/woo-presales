(function() {
  "use strict";
  function _mergeNamespaces(n2, m2) {
    for (var i2 = 0; i2 < m2.length; i2++) {
      const e = m2[i2];
      if (typeof e !== "string" && !Array.isArray(e)) {
        for (const k2 in e) {
          if (k2 !== "default" && !(k2 in n2)) {
            const d2 = Object.getOwnPropertyDescriptor(e, k2);
            if (d2) {
              Object.defineProperty(n2, k2, d2.get ? d2 : {
                enumerable: true,
                get: () => e[k2]
              });
            }
          }
        }
      }
    }
    return Object.freeze(Object.defineProperty(n2, Symbol.toStringTag, { value: "Module" }));
  }
  function getDefaultExportFromCjs(x2) {
    return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
  }
  var react = { exports: {} };
  var react_production_min = {};
  /**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var l$2 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$2 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x$1 = Symbol.for("react.memo"), y$1 = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
  function A$2(a2) {
    if (null === a2 || "object" !== typeof a2) return null;
    a2 = z$1 && a2[z$1] || a2["@@iterator"];
    return "function" === typeof a2 ? a2 : null;
  }
  var B$1 = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, C$1 = Object.assign, D$1 = {};
  function E$2(a2, b, e) {
    this.props = a2;
    this.context = b;
    this.refs = D$1;
    this.updater = e || B$1;
  }
  E$2.prototype.isReactComponent = {};
  E$2.prototype.setState = function(a2, b) {
    if ("object" !== typeof a2 && "function" !== typeof a2 && null != a2) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, a2, b, "setState");
  };
  E$2.prototype.forceUpdate = function(a2) {
    this.updater.enqueueForceUpdate(this, a2, "forceUpdate");
  };
  function F() {
  }
  F.prototype = E$2.prototype;
  function G$1(a2, b, e) {
    this.props = a2;
    this.context = b;
    this.refs = D$1;
    this.updater = e || B$1;
  }
  var H$1 = G$1.prototype = new F();
  H$1.constructor = G$1;
  C$1(H$1, E$2.prototype);
  H$1.isPureReactComponent = true;
  var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$2 = { key: true, ref: true, __self: true, __source: true };
  function M$1(a2, b, e) {
    var d2, c2 = {}, k2 = null, h = null;
    if (null != b) for (d2 in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k2 = "" + b.key), b) J.call(b, d2) && !L$2.hasOwnProperty(d2) && (c2[d2] = b[d2]);
    var g2 = arguments.length - 2;
    if (1 === g2) c2.children = e;
    else if (1 < g2) {
      for (var f2 = Array(g2), m2 = 0; m2 < g2; m2++) f2[m2] = arguments[m2 + 2];
      c2.children = f2;
    }
    if (a2 && a2.defaultProps) for (d2 in g2 = a2.defaultProps, g2) void 0 === c2[d2] && (c2[d2] = g2[d2]);
    return { $$typeof: l$2, type: a2, key: k2, ref: h, props: c2, _owner: K$1.current };
  }
  function N$2(a2, b) {
    return { $$typeof: l$2, type: a2.type, key: b, ref: a2.ref, props: a2.props, _owner: a2._owner };
  }
  function O$1(a2) {
    return "object" === typeof a2 && null !== a2 && a2.$$typeof === l$2;
  }
  function escape(a2) {
    var b = { "=": "=0", ":": "=2" };
    return "$" + a2.replace(/[=:]/g, function(a3) {
      return b[a3];
    });
  }
  var P$2 = /\/+/g;
  function Q$1(a2, b) {
    return "object" === typeof a2 && null !== a2 && null != a2.key ? escape("" + a2.key) : b.toString(36);
  }
  function R$1(a2, b, e, d2, c2) {
    var k2 = typeof a2;
    if ("undefined" === k2 || "boolean" === k2) a2 = null;
    var h = false;
    if (null === a2) h = true;
    else switch (k2) {
      case "string":
      case "number":
        h = true;
        break;
      case "object":
        switch (a2.$$typeof) {
          case l$2:
          case n$1:
            h = true;
        }
    }
    if (h) return h = a2, c2 = c2(h), a2 = "" === d2 ? "." + Q$1(h, 0) : d2, I$1(c2) ? (e = "", null != a2 && (e = a2.replace(P$2, "$&/") + "/"), R$1(c2, b, e, "", function(a3) {
      return a3;
    })) : null != c2 && (O$1(c2) && (c2 = N$2(c2, e + (!c2.key || h && h.key === c2.key ? "" : ("" + c2.key).replace(P$2, "$&/") + "/") + a2)), b.push(c2)), 1;
    h = 0;
    d2 = "" === d2 ? "." : d2 + ":";
    if (I$1(a2)) for (var g2 = 0; g2 < a2.length; g2++) {
      k2 = a2[g2];
      var f2 = d2 + Q$1(k2, g2);
      h += R$1(k2, b, e, f2, c2);
    }
    else if (f2 = A$2(a2), "function" === typeof f2) for (a2 = f2.call(a2), g2 = 0; !(k2 = a2.next()).done; ) k2 = k2.value, f2 = d2 + Q$1(k2, g2++), h += R$1(k2, b, e, f2, c2);
    else if ("object" === k2) throw b = String(a2), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
    return h;
  }
  function S$1(a2, b, e) {
    if (null == a2) return a2;
    var d2 = [], c2 = 0;
    R$1(a2, d2, "", "", function(a3) {
      return b.call(e, a3, c2++);
    });
    return d2;
  }
  function T$2(a2) {
    if (-1 === a2._status) {
      var b = a2._result;
      b = b();
      b.then(function(b2) {
        if (0 === a2._status || -1 === a2._status) a2._status = 1, a2._result = b2;
      }, function(b2) {
        if (0 === a2._status || -1 === a2._status) a2._status = 2, a2._result = b2;
      });
      -1 === a2._status && (a2._status = 0, a2._result = b);
    }
    if (1 === a2._status) return a2._result.default;
    throw a2._result;
  }
  var U$1 = { current: null }, V$2 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$2, ReactCurrentOwner: K$1 };
  function X$1() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  react_production_min.Children = { map: S$1, forEach: function(a2, b, e) {
    S$1(a2, function() {
      b.apply(this, arguments);
    }, e);
  }, count: function(a2) {
    var b = 0;
    S$1(a2, function() {
      b++;
    });
    return b;
  }, toArray: function(a2) {
    return S$1(a2, function(a3) {
      return a3;
    }) || [];
  }, only: function(a2) {
    if (!O$1(a2)) throw Error("React.Children.only expected to receive a single React element child.");
    return a2;
  } };
  react_production_min.Component = E$2;
  react_production_min.Fragment = p$2;
  react_production_min.Profiler = r;
  react_production_min.PureComponent = G$1;
  react_production_min.StrictMode = q$1;
  react_production_min.Suspense = w;
  react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
  react_production_min.act = X$1;
  react_production_min.cloneElement = function(a2, b, e) {
    if (null === a2 || void 0 === a2) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a2 + ".");
    var d2 = C$1({}, a2.props), c2 = a2.key, k2 = a2.ref, h = a2._owner;
    if (null != b) {
      void 0 !== b.ref && (k2 = b.ref, h = K$1.current);
      void 0 !== b.key && (c2 = "" + b.key);
      if (a2.type && a2.type.defaultProps) var g2 = a2.type.defaultProps;
      for (f2 in b) J.call(b, f2) && !L$2.hasOwnProperty(f2) && (d2[f2] = void 0 === b[f2] && void 0 !== g2 ? g2[f2] : b[f2]);
    }
    var f2 = arguments.length - 2;
    if (1 === f2) d2.children = e;
    else if (1 < f2) {
      g2 = Array(f2);
      for (var m2 = 0; m2 < f2; m2++) g2[m2] = arguments[m2 + 2];
      d2.children = g2;
    }
    return { $$typeof: l$2, type: a2.type, key: c2, ref: k2, props: d2, _owner: h };
  };
  react_production_min.createContext = function(a2) {
    a2 = { $$typeof: u, _currentValue: a2, _currentValue2: a2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
    a2.Provider = { $$typeof: t, _context: a2 };
    return a2.Consumer = a2;
  };
  react_production_min.createElement = M$1;
  react_production_min.createFactory = function(a2) {
    var b = M$1.bind(null, a2);
    b.type = a2;
    return b;
  };
  react_production_min.createRef = function() {
    return { current: null };
  };
  react_production_min.forwardRef = function(a2) {
    return { $$typeof: v$1, render: a2 };
  };
  react_production_min.isValidElement = O$1;
  react_production_min.lazy = function(a2) {
    return { $$typeof: y$1, _payload: { _status: -1, _result: a2 }, _init: T$2 };
  };
  react_production_min.memo = function(a2, b) {
    return { $$typeof: x$1, type: a2, compare: void 0 === b ? null : b };
  };
  react_production_min.startTransition = function(a2) {
    var b = V$2.transition;
    V$2.transition = {};
    try {
      a2();
    } finally {
      V$2.transition = b;
    }
  };
  react_production_min.unstable_act = X$1;
  react_production_min.useCallback = function(a2, b) {
    return U$1.current.useCallback(a2, b);
  };
  react_production_min.useContext = function(a2) {
    return U$1.current.useContext(a2);
  };
  react_production_min.useDebugValue = function() {
  };
  react_production_min.useDeferredValue = function(a2) {
    return U$1.current.useDeferredValue(a2);
  };
  react_production_min.useEffect = function(a2, b) {
    return U$1.current.useEffect(a2, b);
  };
  react_production_min.useId = function() {
    return U$1.current.useId();
  };
  react_production_min.useImperativeHandle = function(a2, b, e) {
    return U$1.current.useImperativeHandle(a2, b, e);
  };
  react_production_min.useInsertionEffect = function(a2, b) {
    return U$1.current.useInsertionEffect(a2, b);
  };
  react_production_min.useLayoutEffect = function(a2, b) {
    return U$1.current.useLayoutEffect(a2, b);
  };
  react_production_min.useMemo = function(a2, b) {
    return U$1.current.useMemo(a2, b);
  };
  react_production_min.useReducer = function(a2, b, e) {
    return U$1.current.useReducer(a2, b, e);
  };
  react_production_min.useRef = function(a2) {
    return U$1.current.useRef(a2);
  };
  react_production_min.useState = function(a2) {
    return U$1.current.useState(a2);
  };
  react_production_min.useSyncExternalStore = function(a2, b, e) {
    return U$1.current.useSyncExternalStore(a2, b, e);
  };
  react_production_min.useTransition = function() {
    return U$1.current.useTransition();
  };
  react_production_min.version = "18.3.1";
  {
    react.exports = react_production_min;
  }
  var reactExports = react.exports;
  const React2 = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
  const React = /* @__PURE__ */ _mergeNamespaces({
    __proto__: null,
    default: React2
  }, [reactExports]);
  var reactDom = { exports: {} };
  var reactDom_production_min = {};
  var scheduler = { exports: {} };
  var scheduler_production_min = {};
  /**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  (function(exports) {
    function f2(a2, b) {
      var c2 = a2.length;
      a2.push(b);
      a: for (; 0 < c2; ) {
        var d2 = c2 - 1 >>> 1, e = a2[d2];
        if (0 < g2(e, b)) a2[d2] = b, a2[c2] = e, c2 = d2;
        else break a;
      }
    }
    function h(a2) {
      return 0 === a2.length ? null : a2[0];
    }
    function k2(a2) {
      if (0 === a2.length) return null;
      var b = a2[0], c2 = a2.pop();
      if (c2 !== b) {
        a2[0] = c2;
        a: for (var d2 = 0, e = a2.length, w2 = e >>> 1; d2 < w2; ) {
          var m2 = 2 * (d2 + 1) - 1, C2 = a2[m2], n2 = m2 + 1, x2 = a2[n2];
          if (0 > g2(C2, c2)) n2 < e && 0 > g2(x2, C2) ? (a2[d2] = x2, a2[n2] = c2, d2 = n2) : (a2[d2] = C2, a2[m2] = c2, d2 = m2);
          else if (n2 < e && 0 > g2(x2, c2)) a2[d2] = x2, a2[n2] = c2, d2 = n2;
          else break a;
        }
      }
      return b;
    }
    function g2(a2, b) {
      var c2 = a2.sortIndex - b.sortIndex;
      return 0 !== c2 ? c2 : a2.id - b.id;
    }
    if ("object" === typeof performance && "function" === typeof performance.now) {
      var l2 = performance;
      exports.unstable_now = function() {
        return l2.now();
      };
    } else {
      var p2 = Date, q2 = p2.now();
      exports.unstable_now = function() {
        return p2.now() - q2;
      };
    }
    var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
    "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function G2(a2) {
      for (var b = h(t2); null !== b; ) {
        if (null === b.callback) k2(t2);
        else if (b.startTime <= a2) k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
        else break;
        b = h(t2);
      }
    }
    function H2(a2) {
      B2 = false;
      G2(a2);
      if (!A2) if (null !== h(r2)) A2 = true, I2(J2);
      else {
        var b = h(t2);
        null !== b && K2(H2, b.startTime - a2);
      }
    }
    function J2(a2, b) {
      A2 = false;
      B2 && (B2 = false, E2(L2), L2 = -1);
      z2 = true;
      var c2 = y2;
      try {
        G2(b);
        for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a2 && !M2()); ) {
          var d2 = v2.callback;
          if ("function" === typeof d2) {
            v2.callback = null;
            y2 = v2.priorityLevel;
            var e = d2(v2.expirationTime <= b);
            b = exports.unstable_now();
            "function" === typeof e ? v2.callback = e : v2 === h(r2) && k2(r2);
            G2(b);
          } else k2(r2);
          v2 = h(r2);
        }
        if (null !== v2) var w2 = true;
        else {
          var m2 = h(t2);
          null !== m2 && K2(H2, m2.startTime - b);
          w2 = false;
        }
        return w2;
      } finally {
        v2 = null, y2 = c2, z2 = false;
      }
    }
    var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
    function M2() {
      return exports.unstable_now() - Q2 < P2 ? false : true;
    }
    function R2() {
      if (null !== O2) {
        var a2 = exports.unstable_now();
        Q2 = a2;
        var b = true;
        try {
          b = O2(true, a2);
        } finally {
          b ? S2() : (N2 = false, O2 = null);
        }
      } else N2 = false;
    }
    var S2;
    if ("function" === typeof F2) S2 = function() {
      F2(R2);
    };
    else if ("undefined" !== typeof MessageChannel) {
      var T2 = new MessageChannel(), U2 = T2.port2;
      T2.port1.onmessage = R2;
      S2 = function() {
        U2.postMessage(null);
      };
    } else S2 = function() {
      D2(R2, 0);
    };
    function I2(a2) {
      O2 = a2;
      N2 || (N2 = true, S2());
    }
    function K2(a2, b) {
      L2 = D2(function() {
        a2(exports.unstable_now());
      }, b);
    }
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(a2) {
      a2.callback = null;
    };
    exports.unstable_continueExecution = function() {
      A2 || z2 || (A2 = true, I2(J2));
    };
    exports.unstable_forceFrameRate = function(a2) {
      0 > a2 || 125 < a2 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a2 ? Math.floor(1e3 / a2) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return y2;
    };
    exports.unstable_getFirstCallbackNode = function() {
      return h(r2);
    };
    exports.unstable_next = function(a2) {
      switch (y2) {
        case 1:
        case 2:
        case 3:
          var b = 3;
          break;
        default:
          b = y2;
      }
      var c2 = y2;
      y2 = b;
      try {
        return a2();
      } finally {
        y2 = c2;
      }
    };
    exports.unstable_pauseExecution = function() {
    };
    exports.unstable_requestPaint = function() {
    };
    exports.unstable_runWithPriority = function(a2, b) {
      switch (a2) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a2 = 3;
      }
      var c2 = y2;
      y2 = a2;
      try {
        return b();
      } finally {
        y2 = c2;
      }
    };
    exports.unstable_scheduleCallback = function(a2, b, c2) {
      var d2 = exports.unstable_now();
      "object" === typeof c2 && null !== c2 ? (c2 = c2.delay, c2 = "number" === typeof c2 && 0 < c2 ? d2 + c2 : d2) : c2 = d2;
      switch (a2) {
        case 1:
          var e = -1;
          break;
        case 2:
          e = 250;
          break;
        case 5:
          e = 1073741823;
          break;
        case 4:
          e = 1e4;
          break;
        default:
          e = 5e3;
      }
      e = c2 + e;
      a2 = { id: u2++, callback: b, priorityLevel: a2, startTime: c2, expirationTime: e, sortIndex: -1 };
      c2 > d2 ? (a2.sortIndex = c2, f2(t2, a2), null === h(r2) && a2 === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c2 - d2))) : (a2.sortIndex = e, f2(r2, a2), A2 || z2 || (A2 = true, I2(J2)));
      return a2;
    };
    exports.unstable_shouldYield = M2;
    exports.unstable_wrapCallback = function(a2) {
      var b = y2;
      return function() {
        var c2 = y2;
        y2 = b;
        try {
          return a2.apply(this, arguments);
        } finally {
          y2 = c2;
        }
      };
    };
  })(scheduler_production_min);
  {
    scheduler.exports = scheduler_production_min;
  }
  var schedulerExports = scheduler.exports;
  /**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var aa = reactExports, ca = schedulerExports;
  function p$1(a2) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++) b += "&args[]=" + encodeURIComponent(arguments[c2]);
    return "Minified React error #" + a2 + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var da = /* @__PURE__ */ new Set(), ea = {};
  function fa(a2, b) {
    ha(a2, b);
    ha(a2 + "Capture", b);
  }
  function ha(a2, b) {
    ea[a2] = b;
    for (a2 = 0; a2 < b.length; a2++) da.add(b[a2]);
  }
  var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
  function oa(a2) {
    if (ja.call(ma, a2)) return true;
    if (ja.call(la, a2)) return false;
    if (ka.test(a2)) return ma[a2] = true;
    la[a2] = true;
    return false;
  }
  function pa(a2, b, c2, d2) {
    if (null !== c2 && 0 === c2.type) return false;
    switch (typeof b) {
      case "function":
      case "symbol":
        return true;
      case "boolean":
        if (d2) return false;
        if (null !== c2) return !c2.acceptsBooleans;
        a2 = a2.toLowerCase().slice(0, 5);
        return "data-" !== a2 && "aria-" !== a2;
      default:
        return false;
    }
  }
  function qa(a2, b, c2, d2) {
    if (null === b || "undefined" === typeof b || pa(a2, b, c2, d2)) return true;
    if (d2) return false;
    if (null !== c2) switch (c2.type) {
      case 3:
        return !b;
      case 4:
        return false === b;
      case 5:
        return isNaN(b);
      case 6:
        return isNaN(b) || 1 > b;
    }
    return false;
  }
  function v(a2, b, c2, d2, e, f2, g2) {
    this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
    this.attributeName = d2;
    this.attributeNamespace = e;
    this.mustUseProperty = c2;
    this.propertyName = a2;
    this.type = b;
    this.sanitizeURL = f2;
    this.removeEmptyString = g2;
  }
  var z = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
    z[a2] = new v(a2, 0, false, a2, null, false, false);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
    var b = a2[0];
    z[b] = new v(b, 1, false, a2[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
    z[a2] = new v(a2, 2, false, a2.toLowerCase(), null, false, false);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
    z[a2] = new v(a2, 2, false, a2, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
    z[a2] = new v(a2, 3, false, a2.toLowerCase(), null, false, false);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(a2) {
    z[a2] = new v(a2, 3, true, a2, null, false, false);
  });
  ["capture", "download"].forEach(function(a2) {
    z[a2] = new v(a2, 4, false, a2, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function(a2) {
    z[a2] = new v(a2, 6, false, a2, null, false, false);
  });
  ["rowSpan", "start"].forEach(function(a2) {
    z[a2] = new v(a2, 5, false, a2.toLowerCase(), null, false, false);
  });
  var ra = /[\-:]([a-z])/g;
  function sa(a2) {
    return a2[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
    var b = a2.replace(
      ra,
      sa
    );
    z[b] = new v(b, 1, false, a2, null, false, false);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
    var b = a2.replace(ra, sa);
    z[b] = new v(b, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
    var b = a2.replace(ra, sa);
    z[b] = new v(b, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
  });
  ["tabIndex", "crossOrigin"].forEach(function(a2) {
    z[a2] = new v(a2, 1, false, a2.toLowerCase(), null, false, false);
  });
  z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
  ["src", "href", "action", "formAction"].forEach(function(a2) {
    z[a2] = new v(a2, 1, false, a2.toLowerCase(), null, true, true);
  });
  function ta(a2, b, c2, d2) {
    var e = z.hasOwnProperty(b) ? z[b] : null;
    if (null !== e ? 0 !== e.type : d2 || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c2, e, d2) && (c2 = null), d2 || null === e ? oa(b) && (null === c2 ? a2.removeAttribute(b) : a2.setAttribute(b, "" + c2)) : e.mustUseProperty ? a2[e.propertyName] = null === c2 ? 3 === e.type ? false : "" : c2 : (b = e.attributeName, d2 = e.attributeNamespace, null === c2 ? a2.removeAttribute(b) : (e = e.type, c2 = 3 === e || 4 === e && true === c2 ? "" : "" + c2, d2 ? a2.setAttributeNS(d2, b, c2) : a2.setAttribute(b, c2)));
  }
  var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
  var Ia = Symbol.for("react.offscreen");
  var Ja = Symbol.iterator;
  function Ka(a2) {
    if (null === a2 || "object" !== typeof a2) return null;
    a2 = Ja && a2[Ja] || a2["@@iterator"];
    return "function" === typeof a2 ? a2 : null;
  }
  var A$1 = Object.assign, La;
  function Ma(a2) {
    if (void 0 === La) try {
      throw Error();
    } catch (c2) {
      var b = c2.stack.trim().match(/\n( *(at )?)/);
      La = b && b[1] || "";
    }
    return "\n" + La + a2;
  }
  var Na = false;
  function Oa(a2, b) {
    if (!a2 || Na) return "";
    Na = true;
    var c2 = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (b) if (b = function() {
        throw Error();
      }, Object.defineProperty(b.prototype, "props", { set: function() {
        throw Error();
      } }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b, []);
        } catch (l2) {
          var d2 = l2;
        }
        Reflect.construct(a2, [], b);
      } else {
        try {
          b.call();
        } catch (l2) {
          d2 = l2;
        }
        a2.call(b.prototype);
      }
      else {
        try {
          throw Error();
        } catch (l2) {
          d2 = l2;
        }
        a2();
      }
    } catch (l2) {
      if (l2 && d2 && "string" === typeof l2.stack) {
        for (var e = l2.stack.split("\n"), f2 = d2.stack.split("\n"), g2 = e.length - 1, h = f2.length - 1; 1 <= g2 && 0 <= h && e[g2] !== f2[h]; ) h--;
        for (; 1 <= g2 && 0 <= h; g2--, h--) if (e[g2] !== f2[h]) {
          if (1 !== g2 || 1 !== h) {
            do
              if (g2--, h--, 0 > h || e[g2] !== f2[h]) {
                var k2 = "\n" + e[g2].replace(" at new ", " at ");
                a2.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a2.displayName));
                return k2;
              }
            while (1 <= g2 && 0 <= h);
          }
          break;
        }
      }
    } finally {
      Na = false, Error.prepareStackTrace = c2;
    }
    return (a2 = a2 ? a2.displayName || a2.name : "") ? Ma(a2) : "";
  }
  function Pa(a2) {
    switch (a2.tag) {
      case 5:
        return Ma(a2.type);
      case 16:
        return Ma("Lazy");
      case 13:
        return Ma("Suspense");
      case 19:
        return Ma("SuspenseList");
      case 0:
      case 2:
      case 15:
        return a2 = Oa(a2.type, false), a2;
      case 11:
        return a2 = Oa(a2.type.render, false), a2;
      case 1:
        return a2 = Oa(a2.type, true), a2;
      default:
        return "";
    }
  }
  function Qa(a2) {
    if (null == a2) return null;
    if ("function" === typeof a2) return a2.displayName || a2.name || null;
    if ("string" === typeof a2) return a2;
    switch (a2) {
      case ya:
        return "Fragment";
      case wa:
        return "Portal";
      case Aa:
        return "Profiler";
      case za:
        return "StrictMode";
      case Ea:
        return "Suspense";
      case Fa:
        return "SuspenseList";
    }
    if ("object" === typeof a2) switch (a2.$$typeof) {
      case Ca:
        return (a2.displayName || "Context") + ".Consumer";
      case Ba:
        return (a2._context.displayName || "Context") + ".Provider";
      case Da:
        var b = a2.render;
        a2 = a2.displayName;
        a2 || (a2 = b.displayName || b.name || "", a2 = "" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
        return a2;
      case Ga:
        return b = a2.displayName || null, null !== b ? b : Qa(a2.type) || "Memo";
      case Ha:
        b = a2._payload;
        a2 = a2._init;
        try {
          return Qa(a2(b));
        } catch (c2) {
        }
    }
    return null;
  }
  function Ra(a2) {
    var b = a2.type;
    switch (a2.tag) {
      case 24:
        return "Cache";
      case 9:
        return (b.displayName || "Context") + ".Consumer";
      case 10:
        return (b._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return a2 = b.render, a2 = a2.displayName || a2.name || "", b.displayName || ("" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return b;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Qa(b);
      case 8:
        return b === za ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if ("function" === typeof b) return b.displayName || b.name || null;
        if ("string" === typeof b) return b;
    }
    return null;
  }
  function Sa(a2) {
    switch (typeof a2) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return a2;
      case "object":
        return a2;
      default:
        return "";
    }
  }
  function Ta(a2) {
    var b = a2.type;
    return (a2 = a2.nodeName) && "input" === a2.toLowerCase() && ("checkbox" === b || "radio" === b);
  }
  function Ua(a2) {
    var b = Ta(a2) ? "checked" : "value", c2 = Object.getOwnPropertyDescriptor(a2.constructor.prototype, b), d2 = "" + a2[b];
    if (!a2.hasOwnProperty(b) && "undefined" !== typeof c2 && "function" === typeof c2.get && "function" === typeof c2.set) {
      var e = c2.get, f2 = c2.set;
      Object.defineProperty(a2, b, { configurable: true, get: function() {
        return e.call(this);
      }, set: function(a3) {
        d2 = "" + a3;
        f2.call(this, a3);
      } });
      Object.defineProperty(a2, b, { enumerable: c2.enumerable });
      return { getValue: function() {
        return d2;
      }, setValue: function(a3) {
        d2 = "" + a3;
      }, stopTracking: function() {
        a2._valueTracker = null;
        delete a2[b];
      } };
    }
  }
  function Va(a2) {
    a2._valueTracker || (a2._valueTracker = Ua(a2));
  }
  function Wa(a2) {
    if (!a2) return false;
    var b = a2._valueTracker;
    if (!b) return true;
    var c2 = b.getValue();
    var d2 = "";
    a2 && (d2 = Ta(a2) ? a2.checked ? "true" : "false" : a2.value);
    a2 = d2;
    return a2 !== c2 ? (b.setValue(a2), true) : false;
  }
  function Xa(a2) {
    a2 = a2 || ("undefined" !== typeof document ? document : void 0);
    if ("undefined" === typeof a2) return null;
    try {
      return a2.activeElement || a2.body;
    } catch (b) {
      return a2.body;
    }
  }
  function Ya(a2, b) {
    var c2 = b.checked;
    return A$1({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c2 ? c2 : a2._wrapperState.initialChecked });
  }
  function Za(a2, b) {
    var c2 = null == b.defaultValue ? "" : b.defaultValue, d2 = null != b.checked ? b.checked : b.defaultChecked;
    c2 = Sa(null != b.value ? b.value : c2);
    a2._wrapperState = { initialChecked: d2, initialValue: c2, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
  }
  function ab(a2, b) {
    b = b.checked;
    null != b && ta(a2, "checked", b, false);
  }
  function bb(a2, b) {
    ab(a2, b);
    var c2 = Sa(b.value), d2 = b.type;
    if (null != c2) if ("number" === d2) {
      if (0 === c2 && "" === a2.value || a2.value != c2) a2.value = "" + c2;
    } else a2.value !== "" + c2 && (a2.value = "" + c2);
    else if ("submit" === d2 || "reset" === d2) {
      a2.removeAttribute("value");
      return;
    }
    b.hasOwnProperty("value") ? cb(a2, b.type, c2) : b.hasOwnProperty("defaultValue") && cb(a2, b.type, Sa(b.defaultValue));
    null == b.checked && null != b.defaultChecked && (a2.defaultChecked = !!b.defaultChecked);
  }
  function db(a2, b, c2) {
    if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
      var d2 = b.type;
      if (!("submit" !== d2 && "reset" !== d2 || void 0 !== b.value && null !== b.value)) return;
      b = "" + a2._wrapperState.initialValue;
      c2 || b === a2.value || (a2.value = b);
      a2.defaultValue = b;
    }
    c2 = a2.name;
    "" !== c2 && (a2.name = "");
    a2.defaultChecked = !!a2._wrapperState.initialChecked;
    "" !== c2 && (a2.name = c2);
  }
  function cb(a2, b, c2) {
    if ("number" !== b || Xa(a2.ownerDocument) !== a2) null == c2 ? a2.defaultValue = "" + a2._wrapperState.initialValue : a2.defaultValue !== "" + c2 && (a2.defaultValue = "" + c2);
  }
  var eb = Array.isArray;
  function fb(a2, b, c2, d2) {
    a2 = a2.options;
    if (b) {
      b = {};
      for (var e = 0; e < c2.length; e++) b["$" + c2[e]] = true;
      for (c2 = 0; c2 < a2.length; c2++) e = b.hasOwnProperty("$" + a2[c2].value), a2[c2].selected !== e && (a2[c2].selected = e), e && d2 && (a2[c2].defaultSelected = true);
    } else {
      c2 = "" + Sa(c2);
      b = null;
      for (e = 0; e < a2.length; e++) {
        if (a2[e].value === c2) {
          a2[e].selected = true;
          d2 && (a2[e].defaultSelected = true);
          return;
        }
        null !== b || a2[e].disabled || (b = a2[e]);
      }
      null !== b && (b.selected = true);
    }
  }
  function gb(a2, b) {
    if (null != b.dangerouslySetInnerHTML) throw Error(p$1(91));
    return A$1({}, b, { value: void 0, defaultValue: void 0, children: "" + a2._wrapperState.initialValue });
  }
  function hb(a2, b) {
    var c2 = b.value;
    if (null == c2) {
      c2 = b.children;
      b = b.defaultValue;
      if (null != c2) {
        if (null != b) throw Error(p$1(92));
        if (eb(c2)) {
          if (1 < c2.length) throw Error(p$1(93));
          c2 = c2[0];
        }
        b = c2;
      }
      null == b && (b = "");
      c2 = b;
    }
    a2._wrapperState = { initialValue: Sa(c2) };
  }
  function ib(a2, b) {
    var c2 = Sa(b.value), d2 = Sa(b.defaultValue);
    null != c2 && (c2 = "" + c2, c2 !== a2.value && (a2.value = c2), null == b.defaultValue && a2.defaultValue !== c2 && (a2.defaultValue = c2));
    null != d2 && (a2.defaultValue = "" + d2);
  }
  function jb(a2) {
    var b = a2.textContent;
    b === a2._wrapperState.initialValue && "" !== b && null !== b && (a2.value = b);
  }
  function kb(a2) {
    switch (a2) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function lb(a2, b) {
    return null == a2 || "http://www.w3.org/1999/xhtml" === a2 ? kb(b) : "http://www.w3.org/2000/svg" === a2 && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a2;
  }
  var mb, nb = function(a2) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c2, d2, e) {
      MSApp.execUnsafeLocalFunction(function() {
        return a2(b, c2, d2, e);
      });
    } : a2;
  }(function(a2, b) {
    if ("http://www.w3.org/2000/svg" !== a2.namespaceURI || "innerHTML" in a2) a2.innerHTML = b;
    else {
      mb = mb || document.createElement("div");
      mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
      for (b = mb.firstChild; a2.firstChild; ) a2.removeChild(a2.firstChild);
      for (; b.firstChild; ) a2.appendChild(b.firstChild);
    }
  });
  function ob(a2, b) {
    if (b) {
      var c2 = a2.firstChild;
      if (c2 && c2 === a2.lastChild && 3 === c2.nodeType) {
        c2.nodeValue = b;
        return;
      }
    }
    a2.textContent = b;
  }
  var pb = {
    animationIterationCount: true,
    aspectRatio: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridArea: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
  }, qb = ["Webkit", "ms", "Moz", "O"];
  Object.keys(pb).forEach(function(a2) {
    qb.forEach(function(b) {
      b = b + a2.charAt(0).toUpperCase() + a2.substring(1);
      pb[b] = pb[a2];
    });
  });
  function rb(a2, b, c2) {
    return null == b || "boolean" === typeof b || "" === b ? "" : c2 || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a2) && pb[a2] ? ("" + b).trim() : b + "px";
  }
  function sb(a2, b) {
    a2 = a2.style;
    for (var c2 in b) if (b.hasOwnProperty(c2)) {
      var d2 = 0 === c2.indexOf("--"), e = rb(c2, b[c2], d2);
      "float" === c2 && (c2 = "cssFloat");
      d2 ? a2.setProperty(c2, e) : a2[c2] = e;
    }
  }
  var tb = A$1({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
  function ub(a2, b) {
    if (b) {
      if (tb[a2] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p$1(137, a2));
      if (null != b.dangerouslySetInnerHTML) {
        if (null != b.children) throw Error(p$1(60));
        if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p$1(61));
      }
      if (null != b.style && "object" !== typeof b.style) throw Error(p$1(62));
    }
  }
  function vb(a2, b) {
    if (-1 === a2.indexOf("-")) return "string" === typeof b.is;
    switch (a2) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var wb = null;
  function xb(a2) {
    a2 = a2.target || a2.srcElement || window;
    a2.correspondingUseElement && (a2 = a2.correspondingUseElement);
    return 3 === a2.nodeType ? a2.parentNode : a2;
  }
  var yb = null, zb = null, Ab = null;
  function Bb(a2) {
    if (a2 = Cb(a2)) {
      if ("function" !== typeof yb) throw Error(p$1(280));
      var b = a2.stateNode;
      b && (b = Db(b), yb(a2.stateNode, a2.type, b));
    }
  }
  function Eb(a2) {
    zb ? Ab ? Ab.push(a2) : Ab = [a2] : zb = a2;
  }
  function Fb() {
    if (zb) {
      var a2 = zb, b = Ab;
      Ab = zb = null;
      Bb(a2);
      if (b) for (a2 = 0; a2 < b.length; a2++) Bb(b[a2]);
    }
  }
  function Gb(a2, b) {
    return a2(b);
  }
  function Hb() {
  }
  var Ib = false;
  function Jb(a2, b, c2) {
    if (Ib) return a2(b, c2);
    Ib = true;
    try {
      return Gb(a2, b, c2);
    } finally {
      if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
    }
  }
  function Kb(a2, b) {
    var c2 = a2.stateNode;
    if (null === c2) return null;
    var d2 = Db(c2);
    if (null === d2) return null;
    c2 = d2[b];
    a: switch (b) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d2 = !d2.disabled) || (a2 = a2.type, d2 = !("button" === a2 || "input" === a2 || "select" === a2 || "textarea" === a2));
        a2 = !d2;
        break a;
      default:
        a2 = false;
    }
    if (a2) return null;
    if (c2 && "function" !== typeof c2) throw Error(p$1(231, b, typeof c2));
    return c2;
  }
  var Lb = false;
  if (ia) try {
    var Mb = {};
    Object.defineProperty(Mb, "passive", { get: function() {
      Lb = true;
    } });
    window.addEventListener("test", Mb, Mb);
    window.removeEventListener("test", Mb, Mb);
  } catch (a2) {
    Lb = false;
  }
  function Nb(a2, b, c2, d2, e, f2, g2, h, k2) {
    var l2 = Array.prototype.slice.call(arguments, 3);
    try {
      b.apply(c2, l2);
    } catch (m2) {
      this.onError(m2);
    }
  }
  var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a2) {
    Ob = true;
    Pb = a2;
  } };
  function Tb(a2, b, c2, d2, e, f2, g2, h, k2) {
    Ob = false;
    Pb = null;
    Nb.apply(Sb, arguments);
  }
  function Ub(a2, b, c2, d2, e, f2, g2, h, k2) {
    Tb.apply(this, arguments);
    if (Ob) {
      if (Ob) {
        var l2 = Pb;
        Ob = false;
        Pb = null;
      } else throw Error(p$1(198));
      Qb || (Qb = true, Rb = l2);
    }
  }
  function Vb(a2) {
    var b = a2, c2 = a2;
    if (a2.alternate) for (; b.return; ) b = b.return;
    else {
      a2 = b;
      do
        b = a2, 0 !== (b.flags & 4098) && (c2 = b.return), a2 = b.return;
      while (a2);
    }
    return 3 === b.tag ? c2 : null;
  }
  function Wb(a2) {
    if (13 === a2.tag) {
      var b = a2.memoizedState;
      null === b && (a2 = a2.alternate, null !== a2 && (b = a2.memoizedState));
      if (null !== b) return b.dehydrated;
    }
    return null;
  }
  function Xb(a2) {
    if (Vb(a2) !== a2) throw Error(p$1(188));
  }
  function Yb(a2) {
    var b = a2.alternate;
    if (!b) {
      b = Vb(a2);
      if (null === b) throw Error(p$1(188));
      return b !== a2 ? null : a2;
    }
    for (var c2 = a2, d2 = b; ; ) {
      var e = c2.return;
      if (null === e) break;
      var f2 = e.alternate;
      if (null === f2) {
        d2 = e.return;
        if (null !== d2) {
          c2 = d2;
          continue;
        }
        break;
      }
      if (e.child === f2.child) {
        for (f2 = e.child; f2; ) {
          if (f2 === c2) return Xb(e), a2;
          if (f2 === d2) return Xb(e), b;
          f2 = f2.sibling;
        }
        throw Error(p$1(188));
      }
      if (c2.return !== d2.return) c2 = e, d2 = f2;
      else {
        for (var g2 = false, h = e.child; h; ) {
          if (h === c2) {
            g2 = true;
            c2 = e;
            d2 = f2;
            break;
          }
          if (h === d2) {
            g2 = true;
            d2 = e;
            c2 = f2;
            break;
          }
          h = h.sibling;
        }
        if (!g2) {
          for (h = f2.child; h; ) {
            if (h === c2) {
              g2 = true;
              c2 = f2;
              d2 = e;
              break;
            }
            if (h === d2) {
              g2 = true;
              d2 = f2;
              c2 = e;
              break;
            }
            h = h.sibling;
          }
          if (!g2) throw Error(p$1(189));
        }
      }
      if (c2.alternate !== d2) throw Error(p$1(190));
    }
    if (3 !== c2.tag) throw Error(p$1(188));
    return c2.stateNode.current === c2 ? a2 : b;
  }
  function Zb(a2) {
    a2 = Yb(a2);
    return null !== a2 ? $b(a2) : null;
  }
  function $b(a2) {
    if (5 === a2.tag || 6 === a2.tag) return a2;
    for (a2 = a2.child; null !== a2; ) {
      var b = $b(a2);
      if (null !== b) return b;
      a2 = a2.sibling;
    }
    return null;
  }
  var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
  function mc(a2) {
    if (lc && "function" === typeof lc.onCommitFiberRoot) try {
      lc.onCommitFiberRoot(kc, a2, void 0, 128 === (a2.current.flags & 128));
    } catch (b) {
    }
  }
  var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
  function nc(a2) {
    a2 >>>= 0;
    return 0 === a2 ? 32 : 31 - (pc(a2) / qc | 0) | 0;
  }
  var rc = 64, sc = 4194304;
  function tc(a2) {
    switch (a2 & -a2) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return a2 & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return a2 & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return a2;
    }
  }
  function uc(a2, b) {
    var c2 = a2.pendingLanes;
    if (0 === c2) return 0;
    var d2 = 0, e = a2.suspendedLanes, f2 = a2.pingedLanes, g2 = c2 & 268435455;
    if (0 !== g2) {
      var h = g2 & ~e;
      0 !== h ? d2 = tc(h) : (f2 &= g2, 0 !== f2 && (d2 = tc(f2)));
    } else g2 = c2 & ~e, 0 !== g2 ? d2 = tc(g2) : 0 !== f2 && (d2 = tc(f2));
    if (0 === d2) return 0;
    if (0 !== b && b !== d2 && 0 === (b & e) && (e = d2 & -d2, f2 = b & -b, e >= f2 || 16 === e && 0 !== (f2 & 4194240))) return b;
    0 !== (d2 & 4) && (d2 |= c2 & 16);
    b = a2.entangledLanes;
    if (0 !== b) for (a2 = a2.entanglements, b &= d2; 0 < b; ) c2 = 31 - oc(b), e = 1 << c2, d2 |= a2[c2], b &= ~e;
    return d2;
  }
  function vc(a2, b) {
    switch (a2) {
      case 1:
      case 2:
      case 4:
        return b + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return b + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function wc(a2, b) {
    for (var c2 = a2.suspendedLanes, d2 = a2.pingedLanes, e = a2.expirationTimes, f2 = a2.pendingLanes; 0 < f2; ) {
      var g2 = 31 - oc(f2), h = 1 << g2, k2 = e[g2];
      if (-1 === k2) {
        if (0 === (h & c2) || 0 !== (h & d2)) e[g2] = vc(h, b);
      } else k2 <= b && (a2.expiredLanes |= h);
      f2 &= ~h;
    }
  }
  function xc(a2) {
    a2 = a2.pendingLanes & -1073741825;
    return 0 !== a2 ? a2 : a2 & 1073741824 ? 1073741824 : 0;
  }
  function yc() {
    var a2 = rc;
    rc <<= 1;
    0 === (rc & 4194240) && (rc = 64);
    return a2;
  }
  function zc(a2) {
    for (var b = [], c2 = 0; 31 > c2; c2++) b.push(a2);
    return b;
  }
  function Ac(a2, b, c2) {
    a2.pendingLanes |= b;
    536870912 !== b && (a2.suspendedLanes = 0, a2.pingedLanes = 0);
    a2 = a2.eventTimes;
    b = 31 - oc(b);
    a2[b] = c2;
  }
  function Bc(a2, b) {
    var c2 = a2.pendingLanes & ~b;
    a2.pendingLanes = b;
    a2.suspendedLanes = 0;
    a2.pingedLanes = 0;
    a2.expiredLanes &= b;
    a2.mutableReadLanes &= b;
    a2.entangledLanes &= b;
    b = a2.entanglements;
    var d2 = a2.eventTimes;
    for (a2 = a2.expirationTimes; 0 < c2; ) {
      var e = 31 - oc(c2), f2 = 1 << e;
      b[e] = 0;
      d2[e] = -1;
      a2[e] = -1;
      c2 &= ~f2;
    }
  }
  function Cc(a2, b) {
    var c2 = a2.entangledLanes |= b;
    for (a2 = a2.entanglements; c2; ) {
      var d2 = 31 - oc(c2), e = 1 << d2;
      e & b | a2[d2] & b && (a2[d2] |= b);
      c2 &= ~e;
    }
  }
  var C = 0;
  function Dc(a2) {
    a2 &= -a2;
    return 1 < a2 ? 4 < a2 ? 0 !== (a2 & 268435455) ? 16 : 536870912 : 4 : 1;
  }
  var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Sc(a2, b) {
    switch (a2) {
      case "focusin":
      case "focusout":
        Lc = null;
        break;
      case "dragenter":
      case "dragleave":
        Mc = null;
        break;
      case "mouseover":
      case "mouseout":
        Nc = null;
        break;
      case "pointerover":
      case "pointerout":
        Oc.delete(b.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Pc.delete(b.pointerId);
    }
  }
  function Tc(a2, b, c2, d2, e, f2) {
    if (null === a2 || a2.nativeEvent !== f2) return a2 = { blockedOn: b, domEventName: c2, eventSystemFlags: d2, nativeEvent: f2, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a2;
    a2.eventSystemFlags |= d2;
    b = a2.targetContainers;
    null !== e && -1 === b.indexOf(e) && b.push(e);
    return a2;
  }
  function Uc(a2, b, c2, d2, e) {
    switch (b) {
      case "focusin":
        return Lc = Tc(Lc, a2, b, c2, d2, e), true;
      case "dragenter":
        return Mc = Tc(Mc, a2, b, c2, d2, e), true;
      case "mouseover":
        return Nc = Tc(Nc, a2, b, c2, d2, e), true;
      case "pointerover":
        var f2 = e.pointerId;
        Oc.set(f2, Tc(Oc.get(f2) || null, a2, b, c2, d2, e));
        return true;
      case "gotpointercapture":
        return f2 = e.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a2, b, c2, d2, e)), true;
    }
    return false;
  }
  function Vc(a2) {
    var b = Wc(a2.target);
    if (null !== b) {
      var c2 = Vb(b);
      if (null !== c2) {
        if (b = c2.tag, 13 === b) {
          if (b = Wb(c2), null !== b) {
            a2.blockedOn = b;
            Ic(a2.priority, function() {
              Gc(c2);
            });
            return;
          }
        } else if (3 === b && c2.stateNode.current.memoizedState.isDehydrated) {
          a2.blockedOn = 3 === c2.tag ? c2.stateNode.containerInfo : null;
          return;
        }
      }
    }
    a2.blockedOn = null;
  }
  function Xc(a2) {
    if (null !== a2.blockedOn) return false;
    for (var b = a2.targetContainers; 0 < b.length; ) {
      var c2 = Yc(a2.domEventName, a2.eventSystemFlags, b[0], a2.nativeEvent);
      if (null === c2) {
        c2 = a2.nativeEvent;
        var d2 = new c2.constructor(c2.type, c2);
        wb = d2;
        c2.target.dispatchEvent(d2);
        wb = null;
      } else return b = Cb(c2), null !== b && Fc(b), a2.blockedOn = c2, false;
      b.shift();
    }
    return true;
  }
  function Zc(a2, b, c2) {
    Xc(a2) && c2.delete(b);
  }
  function $c() {
    Jc = false;
    null !== Lc && Xc(Lc) && (Lc = null);
    null !== Mc && Xc(Mc) && (Mc = null);
    null !== Nc && Xc(Nc) && (Nc = null);
    Oc.forEach(Zc);
    Pc.forEach(Zc);
  }
  function ad(a2, b) {
    a2.blockedOn === b && (a2.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
  }
  function bd(a2) {
    function b(b2) {
      return ad(b2, a2);
    }
    if (0 < Kc.length) {
      ad(Kc[0], a2);
      for (var c2 = 1; c2 < Kc.length; c2++) {
        var d2 = Kc[c2];
        d2.blockedOn === a2 && (d2.blockedOn = null);
      }
    }
    null !== Lc && ad(Lc, a2);
    null !== Mc && ad(Mc, a2);
    null !== Nc && ad(Nc, a2);
    Oc.forEach(b);
    Pc.forEach(b);
    for (c2 = 0; c2 < Qc.length; c2++) d2 = Qc[c2], d2.blockedOn === a2 && (d2.blockedOn = null);
    for (; 0 < Qc.length && (c2 = Qc[0], null === c2.blockedOn); ) Vc(c2), null === c2.blockedOn && Qc.shift();
  }
  var cd = ua.ReactCurrentBatchConfig, dd = true;
  function ed(a2, b, c2, d2) {
    var e = C, f2 = cd.transition;
    cd.transition = null;
    try {
      C = 1, fd(a2, b, c2, d2);
    } finally {
      C = e, cd.transition = f2;
    }
  }
  function gd(a2, b, c2, d2) {
    var e = C, f2 = cd.transition;
    cd.transition = null;
    try {
      C = 4, fd(a2, b, c2, d2);
    } finally {
      C = e, cd.transition = f2;
    }
  }
  function fd(a2, b, c2, d2) {
    if (dd) {
      var e = Yc(a2, b, c2, d2);
      if (null === e) hd(a2, b, d2, id$2, c2), Sc(a2, d2);
      else if (Uc(e, a2, b, c2, d2)) d2.stopPropagation();
      else if (Sc(a2, d2), b & 4 && -1 < Rc.indexOf(a2)) {
        for (; null !== e; ) {
          var f2 = Cb(e);
          null !== f2 && Ec(f2);
          f2 = Yc(a2, b, c2, d2);
          null === f2 && hd(a2, b, d2, id$2, c2);
          if (f2 === e) break;
          e = f2;
        }
        null !== e && d2.stopPropagation();
      } else hd(a2, b, d2, null, c2);
    }
  }
  var id$2 = null;
  function Yc(a2, b, c2, d2) {
    id$2 = null;
    a2 = xb(d2);
    a2 = Wc(a2);
    if (null !== a2) if (b = Vb(a2), null === b) a2 = null;
    else if (c2 = b.tag, 13 === c2) {
      a2 = Wb(b);
      if (null !== a2) return a2;
      a2 = null;
    } else if (3 === c2) {
      if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
      a2 = null;
    } else b !== a2 && (a2 = null);
    id$2 = a2;
    return null;
  }
  function jd(a2) {
    switch (a2) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (ec()) {
          case fc:
            return 1;
          case gc:
            return 4;
          case hc:
          case ic:
            return 16;
          case jc:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var kd = null, ld = null, md = null;
  function nd() {
    if (md) return md;
    var a2, b = ld, c2 = b.length, d2, e = "value" in kd ? kd.value : kd.textContent, f2 = e.length;
    for (a2 = 0; a2 < c2 && b[a2] === e[a2]; a2++) ;
    var g2 = c2 - a2;
    for (d2 = 1; d2 <= g2 && b[c2 - d2] === e[f2 - d2]; d2++) ;
    return md = e.slice(a2, 1 < d2 ? 1 - d2 : void 0);
  }
  function od(a2) {
    var b = a2.keyCode;
    "charCode" in a2 ? (a2 = a2.charCode, 0 === a2 && 13 === b && (a2 = 13)) : a2 = b;
    10 === a2 && (a2 = 13);
    return 32 <= a2 || 13 === a2 ? a2 : 0;
  }
  function pd() {
    return true;
  }
  function qd() {
    return false;
  }
  function rd(a2) {
    function b(b2, d2, e, f2, g2) {
      this._reactName = b2;
      this._targetInst = e;
      this.type = d2;
      this.nativeEvent = f2;
      this.target = g2;
      this.currentTarget = null;
      for (var c2 in a2) a2.hasOwnProperty(c2) && (b2 = a2[c2], this[c2] = b2 ? b2(f2) : f2[c2]);
      this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
      this.isPropagationStopped = qd;
      return this;
    }
    A$1(b.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var a3 = this.nativeEvent;
      a3 && (a3.preventDefault ? a3.preventDefault() : "unknown" !== typeof a3.returnValue && (a3.returnValue = false), this.isDefaultPrevented = pd);
    }, stopPropagation: function() {
      var a3 = this.nativeEvent;
      a3 && (a3.stopPropagation ? a3.stopPropagation() : "unknown" !== typeof a3.cancelBubble && (a3.cancelBubble = true), this.isPropagationStopped = pd);
    }, persist: function() {
    }, isPersistent: pd });
    return b;
  }
  var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a2) {
    return a2.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A$1({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A$1({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a2) {
    return void 0 === a2.relatedTarget ? a2.fromElement === a2.srcElement ? a2.toElement : a2.fromElement : a2.relatedTarget;
  }, movementX: function(a2) {
    if ("movementX" in a2) return a2.movementX;
    a2 !== yd && (yd && "mousemove" === a2.type ? (wd = a2.screenX - yd.screenX, xd = a2.screenY - yd.screenY) : xd = wd = 0, yd = a2);
    return wd;
  }, movementY: function(a2) {
    return "movementY" in a2 ? a2.movementY : xd;
  } }), Bd = rd(Ad), Cd = A$1({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A$1({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A$1({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A$1({}, sd, { clipboardData: function(a2) {
    return "clipboardData" in a2 ? a2.clipboardData : window.clipboardData;
  } }), Jd = rd(Id), Kd = A$1({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Nd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Pd(a2) {
    var b = this.nativeEvent;
    return b.getModifierState ? b.getModifierState(a2) : (a2 = Od[a2]) ? !!b[a2] : false;
  }
  function zd() {
    return Pd;
  }
  var Qd = A$1({}, ud, { key: function(a2) {
    if (a2.key) {
      var b = Md[a2.key] || a2.key;
      if ("Unidentified" !== b) return b;
    }
    return "keypress" === a2.type ? (a2 = od(a2), 13 === a2 ? "Enter" : String.fromCharCode(a2)) : "keydown" === a2.type || "keyup" === a2.type ? Nd[a2.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a2) {
    return "keypress" === a2.type ? od(a2) : 0;
  }, keyCode: function(a2) {
    return "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
  }, which: function(a2) {
    return "keypress" === a2.type ? od(a2) : "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
  } }), Rd = rd(Qd), Sd = A$1({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A$1({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A$1({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A$1({}, Ad, {
    deltaX: function(a2) {
      return "deltaX" in a2 ? a2.deltaX : "wheelDeltaX" in a2 ? -a2.wheelDeltaX : 0;
    },
    deltaY: function(a2) {
      return "deltaY" in a2 ? a2.deltaY : "wheelDeltaY" in a2 ? -a2.wheelDeltaY : "wheelDelta" in a2 ? -a2.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
  ia && "documentMode" in document && (be = document.documentMode);
  var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
  function ge(a2, b) {
    switch (a2) {
      case "keyup":
        return -1 !== $d.indexOf(b.keyCode);
      case "keydown":
        return 229 !== b.keyCode;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function he(a2) {
    a2 = a2.detail;
    return "object" === typeof a2 && "data" in a2 ? a2.data : null;
  }
  var ie = false;
  function je(a2, b) {
    switch (a2) {
      case "compositionend":
        return he(b);
      case "keypress":
        if (32 !== b.which) return null;
        fe = true;
        return ee;
      case "textInput":
        return a2 = b.data, a2 === ee && fe ? null : a2;
      default:
        return null;
    }
  }
  function ke(a2, b) {
    if (ie) return "compositionend" === a2 || !ae && ge(a2, b) ? (a2 = nd(), md = ld = kd = null, ie = false, a2) : null;
    switch (a2) {
      case "paste":
        return null;
      case "keypress":
        if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
          if (b.char && 1 < b.char.length) return b.char;
          if (b.which) return String.fromCharCode(b.which);
        }
        return null;
      case "compositionend":
        return de && "ko" !== b.locale ? null : b.data;
      default:
        return null;
    }
  }
  var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function me(a2) {
    var b = a2 && a2.nodeName && a2.nodeName.toLowerCase();
    return "input" === b ? !!le[a2.type] : "textarea" === b ? true : false;
  }
  function ne(a2, b, c2, d2) {
    Eb(d2);
    b = oe(b, "onChange");
    0 < b.length && (c2 = new td("onChange", "change", null, c2, d2), a2.push({ event: c2, listeners: b }));
  }
  var pe = null, qe = null;
  function re(a2) {
    se(a2, 0);
  }
  function te(a2) {
    var b = ue(a2);
    if (Wa(b)) return a2;
  }
  function ve(a2, b) {
    if ("change" === a2) return b;
  }
  var we = false;
  if (ia) {
    var xe;
    if (ia) {
      var ye = "oninput" in document;
      if (!ye) {
        var ze = document.createElement("div");
        ze.setAttribute("oninput", "return;");
        ye = "function" === typeof ze.oninput;
      }
      xe = ye;
    } else xe = false;
    we = xe && (!document.documentMode || 9 < document.documentMode);
  }
  function Ae() {
    pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
  }
  function Be(a2) {
    if ("value" === a2.propertyName && te(qe)) {
      var b = [];
      ne(b, qe, a2, xb(a2));
      Jb(re, b);
    }
  }
  function Ce(a2, b, c2) {
    "focusin" === a2 ? (Ae(), pe = b, qe = c2, pe.attachEvent("onpropertychange", Be)) : "focusout" === a2 && Ae();
  }
  function De(a2) {
    if ("selectionchange" === a2 || "keyup" === a2 || "keydown" === a2) return te(qe);
  }
  function Ee(a2, b) {
    if ("click" === a2) return te(b);
  }
  function Fe(a2, b) {
    if ("input" === a2 || "change" === a2) return te(b);
  }
  function Ge(a2, b) {
    return a2 === b && (0 !== a2 || 1 / a2 === 1 / b) || a2 !== a2 && b !== b;
  }
  var He = "function" === typeof Object.is ? Object.is : Ge;
  function Ie(a2, b) {
    if (He(a2, b)) return true;
    if ("object" !== typeof a2 || null === a2 || "object" !== typeof b || null === b) return false;
    var c2 = Object.keys(a2), d2 = Object.keys(b);
    if (c2.length !== d2.length) return false;
    for (d2 = 0; d2 < c2.length; d2++) {
      var e = c2[d2];
      if (!ja.call(b, e) || !He(a2[e], b[e])) return false;
    }
    return true;
  }
  function Je(a2) {
    for (; a2 && a2.firstChild; ) a2 = a2.firstChild;
    return a2;
  }
  function Ke(a2, b) {
    var c2 = Je(a2);
    a2 = 0;
    for (var d2; c2; ) {
      if (3 === c2.nodeType) {
        d2 = a2 + c2.textContent.length;
        if (a2 <= b && d2 >= b) return { node: c2, offset: b - a2 };
        a2 = d2;
      }
      a: {
        for (; c2; ) {
          if (c2.nextSibling) {
            c2 = c2.nextSibling;
            break a;
          }
          c2 = c2.parentNode;
        }
        c2 = void 0;
      }
      c2 = Je(c2);
    }
  }
  function Le(a2, b) {
    return a2 && b ? a2 === b ? true : a2 && 3 === a2.nodeType ? false : b && 3 === b.nodeType ? Le(a2, b.parentNode) : "contains" in a2 ? a2.contains(b) : a2.compareDocumentPosition ? !!(a2.compareDocumentPosition(b) & 16) : false : false;
  }
  function Me() {
    for (var a2 = window, b = Xa(); b instanceof a2.HTMLIFrameElement; ) {
      try {
        var c2 = "string" === typeof b.contentWindow.location.href;
      } catch (d2) {
        c2 = false;
      }
      if (c2) a2 = b.contentWindow;
      else break;
      b = Xa(a2.document);
    }
    return b;
  }
  function Ne(a2) {
    var b = a2 && a2.nodeName && a2.nodeName.toLowerCase();
    return b && ("input" === b && ("text" === a2.type || "search" === a2.type || "tel" === a2.type || "url" === a2.type || "password" === a2.type) || "textarea" === b || "true" === a2.contentEditable);
  }
  function Oe(a2) {
    var b = Me(), c2 = a2.focusedElem, d2 = a2.selectionRange;
    if (b !== c2 && c2 && c2.ownerDocument && Le(c2.ownerDocument.documentElement, c2)) {
      if (null !== d2 && Ne(c2)) {
        if (b = d2.start, a2 = d2.end, void 0 === a2 && (a2 = b), "selectionStart" in c2) c2.selectionStart = b, c2.selectionEnd = Math.min(a2, c2.value.length);
        else if (a2 = (b = c2.ownerDocument || document) && b.defaultView || window, a2.getSelection) {
          a2 = a2.getSelection();
          var e = c2.textContent.length, f2 = Math.min(d2.start, e);
          d2 = void 0 === d2.end ? f2 : Math.min(d2.end, e);
          !a2.extend && f2 > d2 && (e = d2, d2 = f2, f2 = e);
          e = Ke(c2, f2);
          var g2 = Ke(
            c2,
            d2
          );
          e && g2 && (1 !== a2.rangeCount || a2.anchorNode !== e.node || a2.anchorOffset !== e.offset || a2.focusNode !== g2.node || a2.focusOffset !== g2.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a2.removeAllRanges(), f2 > d2 ? (a2.addRange(b), a2.extend(g2.node, g2.offset)) : (b.setEnd(g2.node, g2.offset), a2.addRange(b)));
        }
      }
      b = [];
      for (a2 = c2; a2 = a2.parentNode; ) 1 === a2.nodeType && b.push({ element: a2, left: a2.scrollLeft, top: a2.scrollTop });
      "function" === typeof c2.focus && c2.focus();
      for (c2 = 0; c2 < b.length; c2++) a2 = b[c2], a2.element.scrollLeft = a2.left, a2.element.scrollTop = a2.top;
    }
  }
  var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
  function Ue(a2, b, c2) {
    var d2 = c2.window === c2 ? c2.document : 9 === c2.nodeType ? c2 : c2.ownerDocument;
    Te || null == Qe || Qe !== Xa(d2) || (d2 = Qe, "selectionStart" in d2 && Ne(d2) ? d2 = { start: d2.selectionStart, end: d2.selectionEnd } : (d2 = (d2.ownerDocument && d2.ownerDocument.defaultView || window).getSelection(), d2 = { anchorNode: d2.anchorNode, anchorOffset: d2.anchorOffset, focusNode: d2.focusNode, focusOffset: d2.focusOffset }), Se && Ie(Se, d2) || (Se = d2, d2 = oe(Re, "onSelect"), 0 < d2.length && (b = new td("onSelect", "select", null, b, c2), a2.push({ event: b, listeners: d2 }), b.target = Qe)));
  }
  function Ve(a2, b) {
    var c2 = {};
    c2[a2.toLowerCase()] = b.toLowerCase();
    c2["Webkit" + a2] = "webkit" + b;
    c2["Moz" + a2] = "moz" + b;
    return c2;
  }
  var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
  ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
  function Ze(a2) {
    if (Xe[a2]) return Xe[a2];
    if (!We[a2]) return a2;
    var b = We[a2], c2;
    for (c2 in b) if (b.hasOwnProperty(c2) && c2 in Ye) return Xe[a2] = b[c2];
    return a2;
  }
  var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function ff(a2, b) {
    df.set(a2, b);
    fa(b, [a2]);
  }
  for (var gf = 0; gf < ef.length; gf++) {
    var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
    ff(jf, "on" + kf);
  }
  ff($e, "onAnimationEnd");
  ff(af, "onAnimationIteration");
  ff(bf, "onAnimationStart");
  ff("dblclick", "onDoubleClick");
  ff("focusin", "onFocus");
  ff("focusout", "onBlur");
  ff(cf, "onTransitionEnd");
  ha("onMouseEnter", ["mouseout", "mouseover"]);
  ha("onMouseLeave", ["mouseout", "mouseover"]);
  ha("onPointerEnter", ["pointerout", "pointerover"]);
  ha("onPointerLeave", ["pointerout", "pointerover"]);
  fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
  function nf(a2, b, c2) {
    var d2 = a2.type || "unknown-event";
    a2.currentTarget = c2;
    Ub(d2, b, void 0, a2);
    a2.currentTarget = null;
  }
  function se(a2, b) {
    b = 0 !== (b & 4);
    for (var c2 = 0; c2 < a2.length; c2++) {
      var d2 = a2[c2], e = d2.event;
      d2 = d2.listeners;
      a: {
        var f2 = void 0;
        if (b) for (var g2 = d2.length - 1; 0 <= g2; g2--) {
          var h = d2[g2], k2 = h.instance, l2 = h.currentTarget;
          h = h.listener;
          if (k2 !== f2 && e.isPropagationStopped()) break a;
          nf(e, h, l2);
          f2 = k2;
        }
        else for (g2 = 0; g2 < d2.length; g2++) {
          h = d2[g2];
          k2 = h.instance;
          l2 = h.currentTarget;
          h = h.listener;
          if (k2 !== f2 && e.isPropagationStopped()) break a;
          nf(e, h, l2);
          f2 = k2;
        }
      }
    }
    if (Qb) throw a2 = Rb, Qb = false, Rb = null, a2;
  }
  function D(a2, b) {
    var c2 = b[of];
    void 0 === c2 && (c2 = b[of] = /* @__PURE__ */ new Set());
    var d2 = a2 + "__bubble";
    c2.has(d2) || (pf(b, a2, 2, false), c2.add(d2));
  }
  function qf(a2, b, c2) {
    var d2 = 0;
    b && (d2 |= 4);
    pf(c2, a2, d2, b);
  }
  var rf = "_reactListening" + Math.random().toString(36).slice(2);
  function sf(a2) {
    if (!a2[rf]) {
      a2[rf] = true;
      da.forEach(function(b2) {
        "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a2), qf(b2, true, a2));
      });
      var b = 9 === a2.nodeType ? a2 : a2.ownerDocument;
      null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
    }
  }
  function pf(a2, b, c2, d2) {
    switch (jd(b)) {
      case 1:
        var e = ed;
        break;
      case 4:
        e = gd;
        break;
      default:
        e = fd;
    }
    c2 = e.bind(null, b, c2, a2);
    e = void 0;
    !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
    d2 ? void 0 !== e ? a2.addEventListener(b, c2, { capture: true, passive: e }) : a2.addEventListener(b, c2, true) : void 0 !== e ? a2.addEventListener(b, c2, { passive: e }) : a2.addEventListener(b, c2, false);
  }
  function hd(a2, b, c2, d2, e) {
    var f2 = d2;
    if (0 === (b & 1) && 0 === (b & 2) && null !== d2) a: for (; ; ) {
      if (null === d2) return;
      var g2 = d2.tag;
      if (3 === g2 || 4 === g2) {
        var h = d2.stateNode.containerInfo;
        if (h === e || 8 === h.nodeType && h.parentNode === e) break;
        if (4 === g2) for (g2 = d2.return; null !== g2; ) {
          var k2 = g2.tag;
          if (3 === k2 || 4 === k2) {
            if (k2 = g2.stateNode.containerInfo, k2 === e || 8 === k2.nodeType && k2.parentNode === e) return;
          }
          g2 = g2.return;
        }
        for (; null !== h; ) {
          g2 = Wc(h);
          if (null === g2) return;
          k2 = g2.tag;
          if (5 === k2 || 6 === k2) {
            d2 = f2 = g2;
            continue a;
          }
          h = h.parentNode;
        }
      }
      d2 = d2.return;
    }
    Jb(function() {
      var d3 = f2, e2 = xb(c2), g3 = [];
      a: {
        var h2 = df.get(a2);
        if (void 0 !== h2) {
          var k3 = td, n2 = a2;
          switch (a2) {
            case "keypress":
              if (0 === od(c2)) break a;
            case "keydown":
            case "keyup":
              k3 = Rd;
              break;
            case "focusin":
              n2 = "focus";
              k3 = Fd;
              break;
            case "focusout":
              n2 = "blur";
              k3 = Fd;
              break;
            case "beforeblur":
            case "afterblur":
              k3 = Fd;
              break;
            case "click":
              if (2 === c2.button) break a;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              k3 = Bd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              k3 = Dd;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              k3 = Vd;
              break;
            case $e:
            case af:
            case bf:
              k3 = Hd;
              break;
            case cf:
              k3 = Xd;
              break;
            case "scroll":
              k3 = vd;
              break;
            case "wheel":
              k3 = Zd;
              break;
            case "copy":
            case "cut":
            case "paste":
              k3 = Jd;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              k3 = Td;
          }
          var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a2, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
          t2 = [];
          for (var w2 = d3, u2; null !== w2; ) {
            u2 = w2;
            var F2 = u2.stateNode;
            5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
            if (J2) break;
            w2 = w2.return;
          }
          0 < t2.length && (h2 = new k3(h2, n2, null, c2, e2), g3.push({ event: h2, listeners: t2 }));
        }
      }
      if (0 === (b & 7)) {
        a: {
          h2 = "mouseover" === a2 || "pointerover" === a2;
          k3 = "mouseout" === a2 || "pointerout" === a2;
          if (h2 && c2 !== wb && (n2 = c2.relatedTarget || c2.fromElement) && (Wc(n2) || n2[uf])) break a;
          if (k3 || h2) {
            h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
            if (k3) {
              if (n2 = c2.relatedTarget || c2.toElement, k3 = d3, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
            } else k3 = null, n2 = d3;
            if (k3 !== n2) {
              t2 = Bd;
              F2 = "onMouseLeave";
              x2 = "onMouseEnter";
              w2 = "mouse";
              if ("pointerout" === a2 || "pointerover" === a2) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
              J2 = null == k3 ? h2 : ue(k3);
              u2 = null == n2 ? h2 : ue(n2);
              h2 = new t2(F2, w2 + "leave", k3, c2, e2);
              h2.target = J2;
              h2.relatedTarget = u2;
              F2 = null;
              Wc(e2) === d3 && (t2 = new t2(x2, w2 + "enter", n2, c2, e2), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
              J2 = F2;
              if (k3 && n2) b: {
                t2 = k3;
                x2 = n2;
                w2 = 0;
                for (u2 = t2; u2; u2 = vf(u2)) w2++;
                u2 = 0;
                for (F2 = x2; F2; F2 = vf(F2)) u2++;
                for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
                for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
                for (; w2--; ) {
                  if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                  t2 = vf(t2);
                  x2 = vf(x2);
                }
                t2 = null;
              }
              else t2 = null;
              null !== k3 && wf(g3, h2, k3, t2, false);
              null !== n2 && null !== J2 && wf(g3, J2, n2, t2, true);
            }
          }
        }
        a: {
          h2 = d3 ? ue(d3) : window;
          k3 = h2.nodeName && h2.nodeName.toLowerCase();
          if ("select" === k3 || "input" === k3 && "file" === h2.type) var na = ve;
          else if (me(h2)) if (we) na = Fe;
          else {
            na = De;
            var xa = Ce;
          }
          else (k3 = h2.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
          if (na && (na = na(a2, d3))) {
            ne(g3, na, c2, e2);
            break a;
          }
          xa && xa(a2, h2, d3);
          "focusout" === a2 && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
        }
        xa = d3 ? ue(d3) : window;
        switch (a2) {
          case "focusin":
            if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d3, Se = null;
            break;
          case "focusout":
            Se = Re = Qe = null;
            break;
          case "mousedown":
            Te = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Te = false;
            Ue(g3, c2, e2);
            break;
          case "selectionchange":
            if (Pe) break;
          case "keydown":
          case "keyup":
            Ue(g3, c2, e2);
        }
        var $a;
        if (ae) b: {
          switch (a2) {
            case "compositionstart":
              var ba = "onCompositionStart";
              break b;
            case "compositionend":
              ba = "onCompositionEnd";
              break b;
            case "compositionupdate":
              ba = "onCompositionUpdate";
              break b;
          }
          ba = void 0;
        }
        else ie ? ge(a2, c2) && (ba = "onCompositionEnd") : "keydown" === a2 && 229 === c2.keyCode && (ba = "onCompositionStart");
        ba && (de && "ko" !== c2.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d3, ba), 0 < xa.length && (ba = new Ld(ba, a2, null, c2, e2), g3.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c2), null !== $a && (ba.data = $a))));
        if ($a = ce ? je(a2, c2) : ke(a2, c2)) d3 = oe(d3, "onBeforeInput"), 0 < d3.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c2, e2), g3.push({ event: e2, listeners: d3 }), e2.data = $a);
      }
      se(g3, b);
    });
  }
  function tf(a2, b, c2) {
    return { instance: a2, listener: b, currentTarget: c2 };
  }
  function oe(a2, b) {
    for (var c2 = b + "Capture", d2 = []; null !== a2; ) {
      var e = a2, f2 = e.stateNode;
      5 === e.tag && null !== f2 && (e = f2, f2 = Kb(a2, c2), null != f2 && d2.unshift(tf(a2, f2, e)), f2 = Kb(a2, b), null != f2 && d2.push(tf(a2, f2, e)));
      a2 = a2.return;
    }
    return d2;
  }
  function vf(a2) {
    if (null === a2) return null;
    do
      a2 = a2.return;
    while (a2 && 5 !== a2.tag);
    return a2 ? a2 : null;
  }
  function wf(a2, b, c2, d2, e) {
    for (var f2 = b._reactName, g2 = []; null !== c2 && c2 !== d2; ) {
      var h = c2, k2 = h.alternate, l2 = h.stateNode;
      if (null !== k2 && k2 === d2) break;
      5 === h.tag && null !== l2 && (h = l2, e ? (k2 = Kb(c2, f2), null != k2 && g2.unshift(tf(c2, k2, h))) : e || (k2 = Kb(c2, f2), null != k2 && g2.push(tf(c2, k2, h))));
      c2 = c2.return;
    }
    0 !== g2.length && a2.push({ event: b, listeners: g2 });
  }
  var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
  function zf(a2) {
    return ("string" === typeof a2 ? a2 : "" + a2).replace(xf, "\n").replace(yf, "");
  }
  function Af(a2, b, c2) {
    b = zf(b);
    if (zf(a2) !== b && c2) throw Error(p$1(425));
  }
  function Bf() {
  }
  var Cf = null, Df = null;
  function Ef(a2, b) {
    return "textarea" === a2 || "noscript" === a2 || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
  }
  var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a2) {
    return Hf.resolve(null).then(a2).catch(If);
  } : Ff;
  function If(a2) {
    setTimeout(function() {
      throw a2;
    });
  }
  function Kf(a2, b) {
    var c2 = b, d2 = 0;
    do {
      var e = c2.nextSibling;
      a2.removeChild(c2);
      if (e && 8 === e.nodeType) if (c2 = e.data, "/$" === c2) {
        if (0 === d2) {
          a2.removeChild(e);
          bd(b);
          return;
        }
        d2--;
      } else "$" !== c2 && "$?" !== c2 && "$!" !== c2 || d2++;
      c2 = e;
    } while (c2);
    bd(b);
  }
  function Lf(a2) {
    for (; null != a2; a2 = a2.nextSibling) {
      var b = a2.nodeType;
      if (1 === b || 3 === b) break;
      if (8 === b) {
        b = a2.data;
        if ("$" === b || "$!" === b || "$?" === b) break;
        if ("/$" === b) return null;
      }
    }
    return a2;
  }
  function Mf(a2) {
    a2 = a2.previousSibling;
    for (var b = 0; a2; ) {
      if (8 === a2.nodeType) {
        var c2 = a2.data;
        if ("$" === c2 || "$!" === c2 || "$?" === c2) {
          if (0 === b) return a2;
          b--;
        } else "/$" === c2 && b++;
      }
      a2 = a2.previousSibling;
    }
    return null;
  }
  var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
  function Wc(a2) {
    var b = a2[Of];
    if (b) return b;
    for (var c2 = a2.parentNode; c2; ) {
      if (b = c2[uf] || c2[Of]) {
        c2 = b.alternate;
        if (null !== b.child || null !== c2 && null !== c2.child) for (a2 = Mf(a2); null !== a2; ) {
          if (c2 = a2[Of]) return c2;
          a2 = Mf(a2);
        }
        return b;
      }
      a2 = c2;
      c2 = a2.parentNode;
    }
    return null;
  }
  function Cb(a2) {
    a2 = a2[Of] || a2[uf];
    return !a2 || 5 !== a2.tag && 6 !== a2.tag && 13 !== a2.tag && 3 !== a2.tag ? null : a2;
  }
  function ue(a2) {
    if (5 === a2.tag || 6 === a2.tag) return a2.stateNode;
    throw Error(p$1(33));
  }
  function Db(a2) {
    return a2[Pf] || null;
  }
  var Sf = [], Tf = -1;
  function Uf(a2) {
    return { current: a2 };
  }
  function E$1(a2) {
    0 > Tf || (a2.current = Sf[Tf], Sf[Tf] = null, Tf--);
  }
  function G(a2, b) {
    Tf++;
    Sf[Tf] = a2.current;
    a2.current = b;
  }
  var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
  function Yf(a2, b) {
    var c2 = a2.type.contextTypes;
    if (!c2) return Vf;
    var d2 = a2.stateNode;
    if (d2 && d2.__reactInternalMemoizedUnmaskedChildContext === b) return d2.__reactInternalMemoizedMaskedChildContext;
    var e = {}, f2;
    for (f2 in c2) e[f2] = b[f2];
    d2 && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = b, a2.__reactInternalMemoizedMaskedChildContext = e);
    return e;
  }
  function Zf(a2) {
    a2 = a2.childContextTypes;
    return null !== a2 && void 0 !== a2;
  }
  function $f() {
    E$1(Wf);
    E$1(H);
  }
  function ag(a2, b, c2) {
    if (H.current !== Vf) throw Error(p$1(168));
    G(H, b);
    G(Wf, c2);
  }
  function bg(a2, b, c2) {
    var d2 = a2.stateNode;
    b = b.childContextTypes;
    if ("function" !== typeof d2.getChildContext) return c2;
    d2 = d2.getChildContext();
    for (var e in d2) if (!(e in b)) throw Error(p$1(108, Ra(a2) || "Unknown", e));
    return A$1({}, c2, d2);
  }
  function cg(a2) {
    a2 = (a2 = a2.stateNode) && a2.__reactInternalMemoizedMergedChildContext || Vf;
    Xf = H.current;
    G(H, a2);
    G(Wf, Wf.current);
    return true;
  }
  function dg(a2, b, c2) {
    var d2 = a2.stateNode;
    if (!d2) throw Error(p$1(169));
    c2 ? (a2 = bg(a2, b, Xf), d2.__reactInternalMemoizedMergedChildContext = a2, E$1(Wf), E$1(H), G(H, a2)) : E$1(Wf);
    G(Wf, c2);
  }
  var eg = null, fg = false, gg = false;
  function hg(a2) {
    null === eg ? eg = [a2] : eg.push(a2);
  }
  function ig(a2) {
    fg = true;
    hg(a2);
  }
  function jg() {
    if (!gg && null !== eg) {
      gg = true;
      var a2 = 0, b = C;
      try {
        var c2 = eg;
        for (C = 1; a2 < c2.length; a2++) {
          var d2 = c2[a2];
          do
            d2 = d2(true);
          while (null !== d2);
        }
        eg = null;
        fg = false;
      } catch (e) {
        throw null !== eg && (eg = eg.slice(a2 + 1)), ac(fc, jg), e;
      } finally {
        C = b, gg = false;
      }
    }
    return null;
  }
  var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
  function tg(a2, b) {
    kg[lg++] = ng;
    kg[lg++] = mg;
    mg = a2;
    ng = b;
  }
  function ug(a2, b, c2) {
    og[pg++] = rg;
    og[pg++] = sg;
    og[pg++] = qg;
    qg = a2;
    var d2 = rg;
    a2 = sg;
    var e = 32 - oc(d2) - 1;
    d2 &= ~(1 << e);
    c2 += 1;
    var f2 = 32 - oc(b) + e;
    if (30 < f2) {
      var g2 = e - e % 5;
      f2 = (d2 & (1 << g2) - 1).toString(32);
      d2 >>= g2;
      e -= g2;
      rg = 1 << 32 - oc(b) + e | c2 << e | d2;
      sg = f2 + a2;
    } else rg = 1 << f2 | c2 << e | d2, sg = a2;
  }
  function vg(a2) {
    null !== a2.return && (tg(a2, 1), ug(a2, 1, 0));
  }
  function wg(a2) {
    for (; a2 === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
    for (; a2 === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
  }
  var xg = null, yg = null, I = false, zg = null;
  function Ag(a2, b) {
    var c2 = Bg(5, null, null, 0);
    c2.elementType = "DELETED";
    c2.stateNode = b;
    c2.return = a2;
    b = a2.deletions;
    null === b ? (a2.deletions = [c2], a2.flags |= 16) : b.push(c2);
  }
  function Cg(a2, b) {
    switch (a2.tag) {
      case 5:
        var c2 = a2.type;
        b = 1 !== b.nodeType || c2.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
        return null !== b ? (a2.stateNode = b, xg = a2, yg = Lf(b.firstChild), true) : false;
      case 6:
        return b = "" === a2.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a2.stateNode = b, xg = a2, yg = null, true) : false;
      case 13:
        return b = 8 !== b.nodeType ? null : b, null !== b ? (c2 = null !== qg ? { id: rg, overflow: sg } : null, a2.memoizedState = { dehydrated: b, treeContext: c2, retryLane: 1073741824 }, c2 = Bg(18, null, null, 0), c2.stateNode = b, c2.return = a2, a2.child = c2, xg = a2, yg = null, true) : false;
      default:
        return false;
    }
  }
  function Dg(a2) {
    return 0 !== (a2.mode & 1) && 0 === (a2.flags & 128);
  }
  function Eg(a2) {
    if (I) {
      var b = yg;
      if (b) {
        var c2 = b;
        if (!Cg(a2, b)) {
          if (Dg(a2)) throw Error(p$1(418));
          b = Lf(c2.nextSibling);
          var d2 = xg;
          b && Cg(a2, b) ? Ag(d2, c2) : (a2.flags = a2.flags & -4097 | 2, I = false, xg = a2);
        }
      } else {
        if (Dg(a2)) throw Error(p$1(418));
        a2.flags = a2.flags & -4097 | 2;
        I = false;
        xg = a2;
      }
    }
  }
  function Fg(a2) {
    for (a2 = a2.return; null !== a2 && 5 !== a2.tag && 3 !== a2.tag && 13 !== a2.tag; ) a2 = a2.return;
    xg = a2;
  }
  function Gg(a2) {
    if (a2 !== xg) return false;
    if (!I) return Fg(a2), I = true, false;
    var b;
    (b = 3 !== a2.tag) && !(b = 5 !== a2.tag) && (b = a2.type, b = "head" !== b && "body" !== b && !Ef(a2.type, a2.memoizedProps));
    if (b && (b = yg)) {
      if (Dg(a2)) throw Hg(), Error(p$1(418));
      for (; b; ) Ag(a2, b), b = Lf(b.nextSibling);
    }
    Fg(a2);
    if (13 === a2.tag) {
      a2 = a2.memoizedState;
      a2 = null !== a2 ? a2.dehydrated : null;
      if (!a2) throw Error(p$1(317));
      a: {
        a2 = a2.nextSibling;
        for (b = 0; a2; ) {
          if (8 === a2.nodeType) {
            var c2 = a2.data;
            if ("/$" === c2) {
              if (0 === b) {
                yg = Lf(a2.nextSibling);
                break a;
              }
              b--;
            } else "$" !== c2 && "$!" !== c2 && "$?" !== c2 || b++;
          }
          a2 = a2.nextSibling;
        }
        yg = null;
      }
    } else yg = xg ? Lf(a2.stateNode.nextSibling) : null;
    return true;
  }
  function Hg() {
    for (var a2 = yg; a2; ) a2 = Lf(a2.nextSibling);
  }
  function Ig() {
    yg = xg = null;
    I = false;
  }
  function Jg(a2) {
    null === zg ? zg = [a2] : zg.push(a2);
  }
  var Kg = ua.ReactCurrentBatchConfig;
  function Lg(a2, b, c2) {
    a2 = c2.ref;
    if (null !== a2 && "function" !== typeof a2 && "object" !== typeof a2) {
      if (c2._owner) {
        c2 = c2._owner;
        if (c2) {
          if (1 !== c2.tag) throw Error(p$1(309));
          var d2 = c2.stateNode;
        }
        if (!d2) throw Error(p$1(147, a2));
        var e = d2, f2 = "" + a2;
        if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
        b = function(a3) {
          var b2 = e.refs;
          null === a3 ? delete b2[f2] : b2[f2] = a3;
        };
        b._stringRef = f2;
        return b;
      }
      if ("string" !== typeof a2) throw Error(p$1(284));
      if (!c2._owner) throw Error(p$1(290, a2));
    }
    return a2;
  }
  function Mg(a2, b) {
    a2 = Object.prototype.toString.call(b);
    throw Error(p$1(31, "[object Object]" === a2 ? "object with keys {" + Object.keys(b).join(", ") + "}" : a2));
  }
  function Ng(a2) {
    var b = a2._init;
    return b(a2._payload);
  }
  function Og(a2) {
    function b(b2, c3) {
      if (a2) {
        var d3 = b2.deletions;
        null === d3 ? (b2.deletions = [c3], b2.flags |= 16) : d3.push(c3);
      }
    }
    function c2(c3, d3) {
      if (!a2) return null;
      for (; null !== d3; ) b(c3, d3), d3 = d3.sibling;
      return null;
    }
    function d2(a3, b2) {
      for (a3 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a3.set(b2.key, b2) : a3.set(b2.index, b2), b2 = b2.sibling;
      return a3;
    }
    function e(a3, b2) {
      a3 = Pg(a3, b2);
      a3.index = 0;
      a3.sibling = null;
      return a3;
    }
    function f2(b2, c3, d3) {
      b2.index = d3;
      if (!a2) return b2.flags |= 1048576, c3;
      d3 = b2.alternate;
      if (null !== d3) return d3 = d3.index, d3 < c3 ? (b2.flags |= 2, c3) : d3;
      b2.flags |= 2;
      return c3;
    }
    function g2(b2) {
      a2 && null === b2.alternate && (b2.flags |= 2);
      return b2;
    }
    function h(a3, b2, c3, d3) {
      if (null === b2 || 6 !== b2.tag) return b2 = Qg(c3, a3.mode, d3), b2.return = a3, b2;
      b2 = e(b2, c3);
      b2.return = a3;
      return b2;
    }
    function k2(a3, b2, c3, d3) {
      var f3 = c3.type;
      if (f3 === ya) return m2(a3, b2, c3.props.children, d3, c3.key);
      if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d3 = e(b2, c3.props), d3.ref = Lg(a3, b2, c3), d3.return = a3, d3;
      d3 = Rg(c3.type, c3.key, c3.props, null, a3.mode, d3);
      d3.ref = Lg(a3, b2, c3);
      d3.return = a3;
      return d3;
    }
    function l2(a3, b2, c3, d3) {
      if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c3.containerInfo || b2.stateNode.implementation !== c3.implementation) return b2 = Sg(c3, a3.mode, d3), b2.return = a3, b2;
      b2 = e(b2, c3.children || []);
      b2.return = a3;
      return b2;
    }
    function m2(a3, b2, c3, d3, f3) {
      if (null === b2 || 7 !== b2.tag) return b2 = Tg(c3, a3.mode, d3, f3), b2.return = a3, b2;
      b2 = e(b2, c3);
      b2.return = a3;
      return b2;
    }
    function q2(a3, b2, c3) {
      if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a3.mode, c3), b2.return = a3, b2;
      if ("object" === typeof b2 && null !== b2) {
        switch (b2.$$typeof) {
          case va:
            return c3 = Rg(b2.type, b2.key, b2.props, null, a3.mode, c3), c3.ref = Lg(a3, null, b2), c3.return = a3, c3;
          case wa:
            return b2 = Sg(b2, a3.mode, c3), b2.return = a3, b2;
          case Ha:
            var d3 = b2._init;
            return q2(a3, d3(b2._payload), c3);
        }
        if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a3.mode, c3, null), b2.return = a3, b2;
        Mg(a3, b2);
      }
      return null;
    }
    function r2(a3, b2, c3, d3) {
      var e2 = null !== b2 ? b2.key : null;
      if ("string" === typeof c3 && "" !== c3 || "number" === typeof c3) return null !== e2 ? null : h(a3, b2, "" + c3, d3);
      if ("object" === typeof c3 && null !== c3) {
        switch (c3.$$typeof) {
          case va:
            return c3.key === e2 ? k2(a3, b2, c3, d3) : null;
          case wa:
            return c3.key === e2 ? l2(a3, b2, c3, d3) : null;
          case Ha:
            return e2 = c3._init, r2(
              a3,
              b2,
              e2(c3._payload),
              d3
            );
        }
        if (eb(c3) || Ka(c3)) return null !== e2 ? null : m2(a3, b2, c3, d3, null);
        Mg(a3, c3);
      }
      return null;
    }
    function y2(a3, b2, c3, d3, e2) {
      if ("string" === typeof d3 && "" !== d3 || "number" === typeof d3) return a3 = a3.get(c3) || null, h(b2, a3, "" + d3, e2);
      if ("object" === typeof d3 && null !== d3) {
        switch (d3.$$typeof) {
          case va:
            return a3 = a3.get(null === d3.key ? c3 : d3.key) || null, k2(b2, a3, d3, e2);
          case wa:
            return a3 = a3.get(null === d3.key ? c3 : d3.key) || null, l2(b2, a3, d3, e2);
          case Ha:
            var f3 = d3._init;
            return y2(a3, b2, c3, f3(d3._payload), e2);
        }
        if (eb(d3) || Ka(d3)) return a3 = a3.get(c3) || null, m2(b2, a3, d3, e2, null);
        Mg(b2, d3);
      }
      return null;
    }
    function n2(e2, g3, h2, k3) {
      for (var l3 = null, m3 = null, u2 = g3, w2 = g3 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
        u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
        var n3 = r2(e2, u2, h2[w2], k3);
        if (null === n3) {
          null === u2 && (u2 = x2);
          break;
        }
        a2 && u2 && null === n3.alternate && b(e2, u2);
        g3 = f2(n3, g3, w2);
        null === m3 ? l3 = n3 : m3.sibling = n3;
        m3 = n3;
        u2 = x2;
      }
      if (w2 === h2.length) return c2(e2, u2), I && tg(e2, w2), l3;
      if (null === u2) {
        for (; w2 < h2.length; w2++) u2 = q2(e2, h2[w2], k3), null !== u2 && (g3 = f2(u2, g3, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
        I && tg(e2, w2);
        return l3;
      }
      for (u2 = d2(e2, u2); w2 < h2.length; w2++) x2 = y2(u2, e2, w2, h2[w2], k3), null !== x2 && (a2 && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g3 = f2(x2, g3, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
      a2 && u2.forEach(function(a3) {
        return b(e2, a3);
      });
      I && tg(e2, w2);
      return l3;
    }
    function t2(e2, g3, h2, k3) {
      var l3 = Ka(h2);
      if ("function" !== typeof l3) throw Error(p$1(150));
      h2 = l3.call(h2);
      if (null == h2) throw Error(p$1(151));
      for (var u2 = l3 = null, m3 = g3, w2 = g3 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
        m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
        var t3 = r2(e2, m3, n3.value, k3);
        if (null === t3) {
          null === m3 && (m3 = x2);
          break;
        }
        a2 && m3 && null === t3.alternate && b(e2, m3);
        g3 = f2(t3, g3, w2);
        null === u2 ? l3 = t3 : u2.sibling = t3;
        u2 = t3;
        m3 = x2;
      }
      if (n3.done) return c2(
        e2,
        m3
      ), I && tg(e2, w2), l3;
      if (null === m3) {
        for (; !n3.done; w2++, n3 = h2.next()) n3 = q2(e2, n3.value, k3), null !== n3 && (g3 = f2(n3, g3, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
        I && tg(e2, w2);
        return l3;
      }
      for (m3 = d2(e2, m3); !n3.done; w2++, n3 = h2.next()) n3 = y2(m3, e2, w2, n3.value, k3), null !== n3 && (a2 && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g3 = f2(n3, g3, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      a2 && m3.forEach(function(a3) {
        return b(e2, a3);
      });
      I && tg(e2, w2);
      return l3;
    }
    function J2(a3, d3, f3, h2) {
      "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
      if ("object" === typeof f3 && null !== f3) {
        switch (f3.$$typeof) {
          case va:
            a: {
              for (var k3 = f3.key, l3 = d3; null !== l3; ) {
                if (l3.key === k3) {
                  k3 = f3.type;
                  if (k3 === ya) {
                    if (7 === l3.tag) {
                      c2(a3, l3.sibling);
                      d3 = e(l3, f3.props.children);
                      d3.return = a3;
                      a3 = d3;
                      break a;
                    }
                  } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                    c2(a3, l3.sibling);
                    d3 = e(l3, f3.props);
                    d3.ref = Lg(a3, l3, f3);
                    d3.return = a3;
                    a3 = d3;
                    break a;
                  }
                  c2(a3, l3);
                  break;
                } else b(a3, l3);
                l3 = l3.sibling;
              }
              f3.type === ya ? (d3 = Tg(f3.props.children, a3.mode, h2, f3.key), d3.return = a3, a3 = d3) : (h2 = Rg(f3.type, f3.key, f3.props, null, a3.mode, h2), h2.ref = Lg(a3, d3, f3), h2.return = a3, a3 = h2);
            }
            return g2(a3);
          case wa:
            a: {
              for (l3 = f3.key; null !== d3; ) {
                if (d3.key === l3) if (4 === d3.tag && d3.stateNode.containerInfo === f3.containerInfo && d3.stateNode.implementation === f3.implementation) {
                  c2(a3, d3.sibling);
                  d3 = e(d3, f3.children || []);
                  d3.return = a3;
                  a3 = d3;
                  break a;
                } else {
                  c2(a3, d3);
                  break;
                }
                else b(a3, d3);
                d3 = d3.sibling;
              }
              d3 = Sg(f3, a3.mode, h2);
              d3.return = a3;
              a3 = d3;
            }
            return g2(a3);
          case Ha:
            return l3 = f3._init, J2(a3, d3, l3(f3._payload), h2);
        }
        if (eb(f3)) return n2(a3, d3, f3, h2);
        if (Ka(f3)) return t2(a3, d3, f3, h2);
        Mg(a3, f3);
      }
      return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d3 && 6 === d3.tag ? (c2(a3, d3.sibling), d3 = e(d3, f3), d3.return = a3, a3 = d3) : (c2(a3, d3), d3 = Qg(f3, a3.mode, h2), d3.return = a3, a3 = d3), g2(a3)) : c2(a3, d3);
    }
    return J2;
  }
  var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
  function $g() {
    Zg = Yg = Xg = null;
  }
  function ah(a2) {
    var b = Wg.current;
    E$1(Wg);
    a2._currentValue = b;
  }
  function bh(a2, b, c2) {
    for (; null !== a2; ) {
      var d2 = a2.alternate;
      (a2.childLanes & b) !== b ? (a2.childLanes |= b, null !== d2 && (d2.childLanes |= b)) : null !== d2 && (d2.childLanes & b) !== b && (d2.childLanes |= b);
      if (a2 === c2) break;
      a2 = a2.return;
    }
  }
  function ch(a2, b) {
    Xg = a2;
    Zg = Yg = null;
    a2 = a2.dependencies;
    null !== a2 && null !== a2.firstContext && (0 !== (a2.lanes & b) && (dh = true), a2.firstContext = null);
  }
  function eh(a2) {
    var b = a2._currentValue;
    if (Zg !== a2) if (a2 = { context: a2, memoizedValue: b, next: null }, null === Yg) {
      if (null === Xg) throw Error(p$1(308));
      Yg = a2;
      Xg.dependencies = { lanes: 0, firstContext: a2 };
    } else Yg = Yg.next = a2;
    return b;
  }
  var fh = null;
  function gh(a2) {
    null === fh ? fh = [a2] : fh.push(a2);
  }
  function hh(a2, b, c2, d2) {
    var e = b.interleaved;
    null === e ? (c2.next = c2, gh(b)) : (c2.next = e.next, e.next = c2);
    b.interleaved = c2;
    return ih(a2, d2);
  }
  function ih(a2, b) {
    a2.lanes |= b;
    var c2 = a2.alternate;
    null !== c2 && (c2.lanes |= b);
    c2 = a2;
    for (a2 = a2.return; null !== a2; ) a2.childLanes |= b, c2 = a2.alternate, null !== c2 && (c2.childLanes |= b), c2 = a2, a2 = a2.return;
    return 3 === c2.tag ? c2.stateNode : null;
  }
  var jh = false;
  function kh(a2) {
    a2.updateQueue = { baseState: a2.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function lh(a2, b) {
    a2 = a2.updateQueue;
    b.updateQueue === a2 && (b.updateQueue = { baseState: a2.baseState, firstBaseUpdate: a2.firstBaseUpdate, lastBaseUpdate: a2.lastBaseUpdate, shared: a2.shared, effects: a2.effects });
  }
  function mh(a2, b) {
    return { eventTime: a2, lane: b, tag: 0, payload: null, callback: null, next: null };
  }
  function nh(a2, b, c2) {
    var d2 = a2.updateQueue;
    if (null === d2) return null;
    d2 = d2.shared;
    if (0 !== (K & 2)) {
      var e = d2.pending;
      null === e ? b.next = b : (b.next = e.next, e.next = b);
      d2.pending = b;
      return ih(a2, c2);
    }
    e = d2.interleaved;
    null === e ? (b.next = b, gh(d2)) : (b.next = e.next, e.next = b);
    d2.interleaved = b;
    return ih(a2, c2);
  }
  function oh(a2, b, c2) {
    b = b.updateQueue;
    if (null !== b && (b = b.shared, 0 !== (c2 & 4194240))) {
      var d2 = b.lanes;
      d2 &= a2.pendingLanes;
      c2 |= d2;
      b.lanes = c2;
      Cc(a2, c2);
    }
  }
  function ph(a2, b) {
    var c2 = a2.updateQueue, d2 = a2.alternate;
    if (null !== d2 && (d2 = d2.updateQueue, c2 === d2)) {
      var e = null, f2 = null;
      c2 = c2.firstBaseUpdate;
      if (null !== c2) {
        do {
          var g2 = { eventTime: c2.eventTime, lane: c2.lane, tag: c2.tag, payload: c2.payload, callback: c2.callback, next: null };
          null === f2 ? e = f2 = g2 : f2 = f2.next = g2;
          c2 = c2.next;
        } while (null !== c2);
        null === f2 ? e = f2 = b : f2 = f2.next = b;
      } else e = f2 = b;
      c2 = { baseState: d2.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d2.shared, effects: d2.effects };
      a2.updateQueue = c2;
      return;
    }
    a2 = c2.lastBaseUpdate;
    null === a2 ? c2.firstBaseUpdate = b : a2.next = b;
    c2.lastBaseUpdate = b;
  }
  function qh(a2, b, c2, d2) {
    var e = a2.updateQueue;
    jh = false;
    var f2 = e.firstBaseUpdate, g2 = e.lastBaseUpdate, h = e.shared.pending;
    if (null !== h) {
      e.shared.pending = null;
      var k2 = h, l2 = k2.next;
      k2.next = null;
      null === g2 ? f2 = l2 : g2.next = l2;
      g2 = k2;
      var m2 = a2.alternate;
      null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g2 && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k2));
    }
    if (null !== f2) {
      var q2 = e.baseState;
      g2 = 0;
      m2 = l2 = k2 = null;
      h = f2;
      do {
        var r2 = h.lane, y2 = h.eventTime;
        if ((d2 & r2) === r2) {
          null !== m2 && (m2 = m2.next = {
            eventTime: y2,
            lane: 0,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          });
          a: {
            var n2 = a2, t2 = h;
            r2 = b;
            y2 = c2;
            switch (t2.tag) {
              case 1:
                n2 = t2.payload;
                if ("function" === typeof n2) {
                  q2 = n2.call(y2, q2, r2);
                  break a;
                }
                q2 = n2;
                break a;
              case 3:
                n2.flags = n2.flags & -65537 | 128;
              case 0:
                n2 = t2.payload;
                r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
                if (null === r2 || void 0 === r2) break a;
                q2 = A$1({}, q2, r2);
                break a;
              case 2:
                jh = true;
            }
          }
          null !== h.callback && 0 !== h.lane && (a2.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
        } else y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g2 |= r2;
        h = h.next;
        if (null === h) if (h = e.shared.pending, null === h) break;
        else r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
      } while (1);
      null === m2 && (k2 = q2);
      e.baseState = k2;
      e.firstBaseUpdate = l2;
      e.lastBaseUpdate = m2;
      b = e.shared.interleaved;
      if (null !== b) {
        e = b;
        do
          g2 |= e.lane, e = e.next;
        while (e !== b);
      } else null === f2 && (e.shared.lanes = 0);
      rh |= g2;
      a2.lanes = g2;
      a2.memoizedState = q2;
    }
  }
  function sh(a2, b, c2) {
    a2 = b.effects;
    b.effects = null;
    if (null !== a2) for (b = 0; b < a2.length; b++) {
      var d2 = a2[b], e = d2.callback;
      if (null !== e) {
        d2.callback = null;
        d2 = c2;
        if ("function" !== typeof e) throw Error(p$1(191, e));
        e.call(d2);
      }
    }
  }
  var th = {}, uh = Uf(th), vh$1 = Uf(th), wh = Uf(th);
  function xh(a2) {
    if (a2 === th) throw Error(p$1(174));
    return a2;
  }
  function yh(a2, b) {
    G(wh, b);
    G(vh$1, a2);
    G(uh, th);
    a2 = b.nodeType;
    switch (a2) {
      case 9:
      case 11:
        b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
        break;
      default:
        a2 = 8 === a2 ? b.parentNode : b, b = a2.namespaceURI || null, a2 = a2.tagName, b = lb(b, a2);
    }
    E$1(uh);
    G(uh, b);
  }
  function zh() {
    E$1(uh);
    E$1(vh$1);
    E$1(wh);
  }
  function Ah(a2) {
    xh(wh.current);
    var b = xh(uh.current);
    var c2 = lb(b, a2.type);
    b !== c2 && (G(vh$1, a2), G(uh, c2));
  }
  function Bh(a2) {
    vh$1.current === a2 && (E$1(uh), E$1(vh$1));
  }
  var L$1 = Uf(0);
  function Ch(a2) {
    for (var b = a2; null !== b; ) {
      if (13 === b.tag) {
        var c2 = b.memoizedState;
        if (null !== c2 && (c2 = c2.dehydrated, null === c2 || "$?" === c2.data || "$!" === c2.data)) return b;
      } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
        if (0 !== (b.flags & 128)) return b;
      } else if (null !== b.child) {
        b.child.return = b;
        b = b.child;
        continue;
      }
      if (b === a2) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a2) return null;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
    return null;
  }
  var Dh = [];
  function Eh() {
    for (var a2 = 0; a2 < Dh.length; a2++) Dh[a2]._workInProgressVersionPrimary = null;
    Dh.length = 0;
  }
  var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N$1 = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
  function P$1() {
    throw Error(p$1(321));
  }
  function Mh(a2, b) {
    if (null === b) return false;
    for (var c2 = 0; c2 < b.length && c2 < a2.length; c2++) if (!He(a2[c2], b[c2])) return false;
    return true;
  }
  function Nh(a2, b, c2, d2, e, f2) {
    Hh = f2;
    M = b;
    b.memoizedState = null;
    b.updateQueue = null;
    b.lanes = 0;
    Fh.current = null === a2 || null === a2.memoizedState ? Oh : Ph;
    a2 = c2(d2, e);
    if (Jh) {
      f2 = 0;
      do {
        Jh = false;
        Kh = 0;
        if (25 <= f2) throw Error(p$1(301));
        f2 += 1;
        O = N$1 = null;
        b.updateQueue = null;
        Fh.current = Qh;
        a2 = c2(d2, e);
      } while (Jh);
    }
    Fh.current = Rh;
    b = null !== N$1 && null !== N$1.next;
    Hh = 0;
    O = N$1 = M = null;
    Ih = false;
    if (b) throw Error(p$1(300));
    return a2;
  }
  function Sh() {
    var a2 = 0 !== Kh;
    Kh = 0;
    return a2;
  }
  function Th() {
    var a2 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    null === O ? M.memoizedState = O = a2 : O = O.next = a2;
    return O;
  }
  function Uh() {
    if (null === N$1) {
      var a2 = M.alternate;
      a2 = null !== a2 ? a2.memoizedState : null;
    } else a2 = N$1.next;
    var b = null === O ? M.memoizedState : O.next;
    if (null !== b) O = b, N$1 = a2;
    else {
      if (null === a2) throw Error(p$1(310));
      N$1 = a2;
      a2 = { memoizedState: N$1.memoizedState, baseState: N$1.baseState, baseQueue: N$1.baseQueue, queue: N$1.queue, next: null };
      null === O ? M.memoizedState = O = a2 : O = O.next = a2;
    }
    return O;
  }
  function Vh(a2, b) {
    return "function" === typeof b ? b(a2) : b;
  }
  function Wh(a2) {
    var b = Uh(), c2 = b.queue;
    if (null === c2) throw Error(p$1(311));
    c2.lastRenderedReducer = a2;
    var d2 = N$1, e = d2.baseQueue, f2 = c2.pending;
    if (null !== f2) {
      if (null !== e) {
        var g2 = e.next;
        e.next = f2.next;
        f2.next = g2;
      }
      d2.baseQueue = e = f2;
      c2.pending = null;
    }
    if (null !== e) {
      f2 = e.next;
      d2 = d2.baseState;
      var h = g2 = null, k2 = null, l2 = f2;
      do {
        var m2 = l2.lane;
        if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d2 = l2.hasEagerState ? l2.eagerState : a2(d2, l2.action);
        else {
          var q2 = {
            lane: m2,
            action: l2.action,
            hasEagerState: l2.hasEagerState,
            eagerState: l2.eagerState,
            next: null
          };
          null === k2 ? (h = k2 = q2, g2 = d2) : k2 = k2.next = q2;
          M.lanes |= m2;
          rh |= m2;
        }
        l2 = l2.next;
      } while (null !== l2 && l2 !== f2);
      null === k2 ? g2 = d2 : k2.next = h;
      He(d2, b.memoizedState) || (dh = true);
      b.memoizedState = d2;
      b.baseState = g2;
      b.baseQueue = k2;
      c2.lastRenderedState = d2;
    }
    a2 = c2.interleaved;
    if (null !== a2) {
      e = a2;
      do
        f2 = e.lane, M.lanes |= f2, rh |= f2, e = e.next;
      while (e !== a2);
    } else null === e && (c2.lanes = 0);
    return [b.memoizedState, c2.dispatch];
  }
  function Xh(a2) {
    var b = Uh(), c2 = b.queue;
    if (null === c2) throw Error(p$1(311));
    c2.lastRenderedReducer = a2;
    var d2 = c2.dispatch, e = c2.pending, f2 = b.memoizedState;
    if (null !== e) {
      c2.pending = null;
      var g2 = e = e.next;
      do
        f2 = a2(f2, g2.action), g2 = g2.next;
      while (g2 !== e);
      He(f2, b.memoizedState) || (dh = true);
      b.memoizedState = f2;
      null === b.baseQueue && (b.baseState = f2);
      c2.lastRenderedState = f2;
    }
    return [f2, d2];
  }
  function Yh() {
  }
  function Zh(a2, b) {
    var c2 = M, d2 = Uh(), e = b(), f2 = !He(d2.memoizedState, e);
    f2 && (d2.memoizedState = e, dh = true);
    d2 = d2.queue;
    $h(ai.bind(null, c2, d2, a2), [a2]);
    if (d2.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
      c2.flags |= 2048;
      bi(9, ci.bind(null, c2, d2, e, b), void 0, null);
      if (null === Q) throw Error(p$1(349));
      0 !== (Hh & 30) || di(c2, b, e);
    }
    return e;
  }
  function di(a2, b, c2) {
    a2.flags |= 16384;
    a2 = { getSnapshot: b, value: c2 };
    b = M.updateQueue;
    null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a2]) : (c2 = b.stores, null === c2 ? b.stores = [a2] : c2.push(a2));
  }
  function ci(a2, b, c2, d2) {
    b.value = c2;
    b.getSnapshot = d2;
    ei(b) && fi(a2);
  }
  function ai(a2, b, c2) {
    return c2(function() {
      ei(b) && fi(a2);
    });
  }
  function ei(a2) {
    var b = a2.getSnapshot;
    a2 = a2.value;
    try {
      var c2 = b();
      return !He(a2, c2);
    } catch (d2) {
      return true;
    }
  }
  function fi(a2) {
    var b = ih(a2, 1);
    null !== b && gi(b, a2, 1, -1);
  }
  function hi(a2) {
    var b = Th();
    "function" === typeof a2 && (a2 = a2());
    b.memoizedState = b.baseState = a2;
    a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a2 };
    b.queue = a2;
    a2 = a2.dispatch = ii.bind(null, M, a2);
    return [b.memoizedState, a2];
  }
  function bi(a2, b, c2, d2) {
    a2 = { tag: a2, create: b, destroy: c2, deps: d2, next: null };
    b = M.updateQueue;
    null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a2.next = a2) : (c2 = b.lastEffect, null === c2 ? b.lastEffect = a2.next = a2 : (d2 = c2.next, c2.next = a2, a2.next = d2, b.lastEffect = a2));
    return a2;
  }
  function ji() {
    return Uh().memoizedState;
  }
  function ki(a2, b, c2, d2) {
    var e = Th();
    M.flags |= a2;
    e.memoizedState = bi(1 | b, c2, void 0, void 0 === d2 ? null : d2);
  }
  function li(a2, b, c2, d2) {
    var e = Uh();
    d2 = void 0 === d2 ? null : d2;
    var f2 = void 0;
    if (null !== N$1) {
      var g2 = N$1.memoizedState;
      f2 = g2.destroy;
      if (null !== d2 && Mh(d2, g2.deps)) {
        e.memoizedState = bi(b, c2, f2, d2);
        return;
      }
    }
    M.flags |= a2;
    e.memoizedState = bi(1 | b, c2, f2, d2);
  }
  function mi(a2, b) {
    return ki(8390656, 8, a2, b);
  }
  function $h(a2, b) {
    return li(2048, 8, a2, b);
  }
  function ni(a2, b) {
    return li(4, 2, a2, b);
  }
  function oi(a2, b) {
    return li(4, 4, a2, b);
  }
  function pi(a2, b) {
    if ("function" === typeof b) return a2 = a2(), b(a2), function() {
      b(null);
    };
    if (null !== b && void 0 !== b) return a2 = a2(), b.current = a2, function() {
      b.current = null;
    };
  }
  function qi(a2, b, c2) {
    c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
    return li(4, 4, pi.bind(null, b, a2), c2);
  }
  function ri() {
  }
  function si(a2, b) {
    var c2 = Uh();
    b = void 0 === b ? null : b;
    var d2 = c2.memoizedState;
    if (null !== d2 && null !== b && Mh(b, d2[1])) return d2[0];
    c2.memoizedState = [a2, b];
    return a2;
  }
  function ti(a2, b) {
    var c2 = Uh();
    b = void 0 === b ? null : b;
    var d2 = c2.memoizedState;
    if (null !== d2 && null !== b && Mh(b, d2[1])) return d2[0];
    a2 = a2();
    c2.memoizedState = [a2, b];
    return a2;
  }
  function ui(a2, b, c2) {
    if (0 === (Hh & 21)) return a2.baseState && (a2.baseState = false, dh = true), a2.memoizedState = c2;
    He(c2, b) || (c2 = yc(), M.lanes |= c2, rh |= c2, a2.baseState = true);
    return b;
  }
  function vi(a2, b) {
    var c2 = C;
    C = 0 !== c2 && 4 > c2 ? c2 : 4;
    a2(true);
    var d2 = Gh.transition;
    Gh.transition = {};
    try {
      a2(false), b();
    } finally {
      C = c2, Gh.transition = d2;
    }
  }
  function wi() {
    return Uh().memoizedState;
  }
  function xi(a2, b, c2) {
    var d2 = yi(a2);
    c2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
    if (zi(a2)) Ai(b, c2);
    else if (c2 = hh(a2, b, c2, d2), null !== c2) {
      var e = R();
      gi(c2, a2, d2, e);
      Bi(c2, b, d2);
    }
  }
  function ii(a2, b, c2) {
    var d2 = yi(a2), e = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
    if (zi(a2)) Ai(b, e);
    else {
      var f2 = a2.alternate;
      if (0 === a2.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
        var g2 = b.lastRenderedState, h = f2(g2, c2);
        e.hasEagerState = true;
        e.eagerState = h;
        if (He(h, g2)) {
          var k2 = b.interleaved;
          null === k2 ? (e.next = e, gh(b)) : (e.next = k2.next, k2.next = e);
          b.interleaved = e;
          return;
        }
      } catch (l2) {
      } finally {
      }
      c2 = hh(a2, b, e, d2);
      null !== c2 && (e = R(), gi(c2, a2, d2, e), Bi(c2, b, d2));
    }
  }
  function zi(a2) {
    var b = a2.alternate;
    return a2 === M || null !== b && b === M;
  }
  function Ai(a2, b) {
    Jh = Ih = true;
    var c2 = a2.pending;
    null === c2 ? b.next = b : (b.next = c2.next, c2.next = b);
    a2.pending = b;
  }
  function Bi(a2, b, c2) {
    if (0 !== (c2 & 4194240)) {
      var d2 = b.lanes;
      d2 &= a2.pendingLanes;
      c2 |= d2;
      b.lanes = c2;
      Cc(a2, c2);
    }
  }
  var Rh = { readContext: eh, useCallback: P$1, useContext: P$1, useEffect: P$1, useImperativeHandle: P$1, useInsertionEffect: P$1, useLayoutEffect: P$1, useMemo: P$1, useReducer: P$1, useRef: P$1, useState: P$1, useDebugValue: P$1, useDeferredValue: P$1, useTransition: P$1, useMutableSource: P$1, useSyncExternalStore: P$1, useId: P$1, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a2, b) {
    Th().memoizedState = [a2, void 0 === b ? null : b];
    return a2;
  }, useContext: eh, useEffect: mi, useImperativeHandle: function(a2, b, c2) {
    c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
    return ki(
      4194308,
      4,
      pi.bind(null, b, a2),
      c2
    );
  }, useLayoutEffect: function(a2, b) {
    return ki(4194308, 4, a2, b);
  }, useInsertionEffect: function(a2, b) {
    return ki(4, 2, a2, b);
  }, useMemo: function(a2, b) {
    var c2 = Th();
    b = void 0 === b ? null : b;
    a2 = a2();
    c2.memoizedState = [a2, b];
    return a2;
  }, useReducer: function(a2, b, c2) {
    var d2 = Th();
    b = void 0 !== c2 ? c2(b) : b;
    d2.memoizedState = d2.baseState = b;
    a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a2, lastRenderedState: b };
    d2.queue = a2;
    a2 = a2.dispatch = xi.bind(null, M, a2);
    return [d2.memoizedState, a2];
  }, useRef: function(a2) {
    var b = Th();
    a2 = { current: a2 };
    return b.memoizedState = a2;
  }, useState: hi, useDebugValue: ri, useDeferredValue: function(a2) {
    return Th().memoizedState = a2;
  }, useTransition: function() {
    var a2 = hi(false), b = a2[0];
    a2 = vi.bind(null, a2[1]);
    Th().memoizedState = a2;
    return [b, a2];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(a2, b, c2) {
    var d2 = M, e = Th();
    if (I) {
      if (void 0 === c2) throw Error(p$1(407));
      c2 = c2();
    } else {
      c2 = b();
      if (null === Q) throw Error(p$1(349));
      0 !== (Hh & 30) || di(d2, b, c2);
    }
    e.memoizedState = c2;
    var f2 = { value: c2, getSnapshot: b };
    e.queue = f2;
    mi(ai.bind(
      null,
      d2,
      f2,
      a2
    ), [a2]);
    d2.flags |= 2048;
    bi(9, ci.bind(null, d2, f2, c2, b), void 0, null);
    return c2;
  }, useId: function() {
    var a2 = Th(), b = Q.identifierPrefix;
    if (I) {
      var c2 = sg;
      var d2 = rg;
      c2 = (d2 & ~(1 << 32 - oc(d2) - 1)).toString(32) + c2;
      b = ":" + b + "R" + c2;
      c2 = Kh++;
      0 < c2 && (b += "H" + c2.toString(32));
      b += ":";
    } else c2 = Lh++, b = ":" + b + "r" + c2.toString(32) + ":";
    return a2.memoizedState = b;
  }, unstable_isNewReconciler: false }, Ph = {
    readContext: eh,
    useCallback: si,
    useContext: eh,
    useEffect: $h,
    useImperativeHandle: qi,
    useInsertionEffect: ni,
    useLayoutEffect: oi,
    useMemo: ti,
    useReducer: Wh,
    useRef: ji,
    useState: function() {
      return Wh(Vh);
    },
    useDebugValue: ri,
    useDeferredValue: function(a2) {
      var b = Uh();
      return ui(b, N$1.memoizedState, a2);
    },
    useTransition: function() {
      var a2 = Wh(Vh)[0], b = Uh().memoizedState;
      return [a2, b];
    },
    useMutableSource: Yh,
    useSyncExternalStore: Zh,
    useId: wi,
    unstable_isNewReconciler: false
  }, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
    return Xh(Vh);
  }, useDebugValue: ri, useDeferredValue: function(a2) {
    var b = Uh();
    return null === N$1 ? b.memoizedState = a2 : ui(b, N$1.memoizedState, a2);
  }, useTransition: function() {
    var a2 = Xh(Vh)[0], b = Uh().memoizedState;
    return [a2, b];
  }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
  function Ci(a2, b) {
    if (a2 && a2.defaultProps) {
      b = A$1({}, b);
      a2 = a2.defaultProps;
      for (var c2 in a2) void 0 === b[c2] && (b[c2] = a2[c2]);
      return b;
    }
    return b;
  }
  function Di(a2, b, c2, d2) {
    b = a2.memoizedState;
    c2 = c2(d2, b);
    c2 = null === c2 || void 0 === c2 ? b : A$1({}, b, c2);
    a2.memoizedState = c2;
    0 === a2.lanes && (a2.updateQueue.baseState = c2);
  }
  var Ei = { isMounted: function(a2) {
    return (a2 = a2._reactInternals) ? Vb(a2) === a2 : false;
  }, enqueueSetState: function(a2, b, c2) {
    a2 = a2._reactInternals;
    var d2 = R(), e = yi(a2), f2 = mh(d2, e);
    f2.payload = b;
    void 0 !== c2 && null !== c2 && (f2.callback = c2);
    b = nh(a2, f2, e);
    null !== b && (gi(b, a2, e, d2), oh(b, a2, e));
  }, enqueueReplaceState: function(a2, b, c2) {
    a2 = a2._reactInternals;
    var d2 = R(), e = yi(a2), f2 = mh(d2, e);
    f2.tag = 1;
    f2.payload = b;
    void 0 !== c2 && null !== c2 && (f2.callback = c2);
    b = nh(a2, f2, e);
    null !== b && (gi(b, a2, e, d2), oh(b, a2, e));
  }, enqueueForceUpdate: function(a2, b) {
    a2 = a2._reactInternals;
    var c2 = R(), d2 = yi(a2), e = mh(c2, d2);
    e.tag = 2;
    void 0 !== b && null !== b && (e.callback = b);
    b = nh(a2, e, d2);
    null !== b && (gi(b, a2, d2, c2), oh(b, a2, d2));
  } };
  function Fi(a2, b, c2, d2, e, f2, g2) {
    a2 = a2.stateNode;
    return "function" === typeof a2.shouldComponentUpdate ? a2.shouldComponentUpdate(d2, f2, g2) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c2, d2) || !Ie(e, f2) : true;
  }
  function Gi(a2, b, c2) {
    var d2 = false, e = Vf;
    var f2 = b.contextType;
    "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e = Zf(b) ? Xf : H.current, d2 = b.contextTypes, f2 = (d2 = null !== d2 && void 0 !== d2) ? Yf(a2, e) : Vf);
    b = new b(c2, f2);
    a2.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
    b.updater = Ei;
    a2.stateNode = b;
    b._reactInternals = a2;
    d2 && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = e, a2.__reactInternalMemoizedMaskedChildContext = f2);
    return b;
  }
  function Hi(a2, b, c2, d2) {
    a2 = b.state;
    "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c2, d2);
    "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c2, d2);
    b.state !== a2 && Ei.enqueueReplaceState(b, b.state, null);
  }
  function Ii(a2, b, c2, d2) {
    var e = a2.stateNode;
    e.props = c2;
    e.state = a2.memoizedState;
    e.refs = {};
    kh(a2);
    var f2 = b.contextType;
    "object" === typeof f2 && null !== f2 ? e.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e.context = Yf(a2, f2));
    e.state = a2.memoizedState;
    f2 = b.getDerivedStateFromProps;
    "function" === typeof f2 && (Di(a2, b, f2, c2), e.state = a2.memoizedState);
    "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a2, c2, e, d2), e.state = a2.memoizedState);
    "function" === typeof e.componentDidMount && (a2.flags |= 4194308);
  }
  function Ji(a2, b) {
    try {
      var c2 = "", d2 = b;
      do
        c2 += Pa(d2), d2 = d2.return;
      while (d2);
      var e = c2;
    } catch (f2) {
      e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
    }
    return { value: a2, source: b, stack: e, digest: null };
  }
  function Ki(a2, b, c2) {
    return { value: a2, source: null, stack: null != c2 ? c2 : null, digest: null != b ? b : null };
  }
  function Li(a2, b) {
    try {
      console.error(b.value);
    } catch (c2) {
      setTimeout(function() {
        throw c2;
      });
    }
  }
  var Mi = "function" === typeof WeakMap ? WeakMap : Map;
  function Ni(a2, b, c2) {
    c2 = mh(-1, c2);
    c2.tag = 3;
    c2.payload = { element: null };
    var d2 = b.value;
    c2.callback = function() {
      Oi || (Oi = true, Pi = d2);
      Li(a2, b);
    };
    return c2;
  }
  function Qi(a2, b, c2) {
    c2 = mh(-1, c2);
    c2.tag = 3;
    var d2 = a2.type.getDerivedStateFromError;
    if ("function" === typeof d2) {
      var e = b.value;
      c2.payload = function() {
        return d2(e);
      };
      c2.callback = function() {
        Li(a2, b);
      };
    }
    var f2 = a2.stateNode;
    null !== f2 && "function" === typeof f2.componentDidCatch && (c2.callback = function() {
      Li(a2, b);
      "function" !== typeof d2 && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
      var c3 = b.stack;
      this.componentDidCatch(b.value, { componentStack: null !== c3 ? c3 : "" });
    });
    return c2;
  }
  function Si(a2, b, c2) {
    var d2 = a2.pingCache;
    if (null === d2) {
      d2 = a2.pingCache = new Mi();
      var e = /* @__PURE__ */ new Set();
      d2.set(b, e);
    } else e = d2.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d2.set(b, e));
    e.has(c2) || (e.add(c2), a2 = Ti.bind(null, a2, b, c2), b.then(a2, a2));
  }
  function Ui(a2) {
    do {
      var b;
      if (b = 13 === a2.tag) b = a2.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
      if (b) return a2;
      a2 = a2.return;
    } while (null !== a2);
    return null;
  }
  function Vi(a2, b, c2, d2, e) {
    if (0 === (a2.mode & 1)) return a2 === b ? a2.flags |= 65536 : (a2.flags |= 128, c2.flags |= 131072, c2.flags &= -52805, 1 === c2.tag && (null === c2.alternate ? c2.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c2, b, 1))), c2.lanes |= 1), a2;
    a2.flags |= 65536;
    a2.lanes = e;
    return a2;
  }
  var Wi = ua.ReactCurrentOwner, dh = false;
  function Xi(a2, b, c2, d2) {
    b.child = null === a2 ? Vg(b, null, c2, d2) : Ug(b, a2.child, c2, d2);
  }
  function Yi(a2, b, c2, d2, e) {
    c2 = c2.render;
    var f2 = b.ref;
    ch(b, e);
    d2 = Nh(a2, b, c2, d2, f2, e);
    c2 = Sh();
    if (null !== a2 && !dh) return b.updateQueue = a2.updateQueue, b.flags &= -2053, a2.lanes &= ~e, Zi(a2, b, e);
    I && c2 && vg(b);
    b.flags |= 1;
    Xi(a2, b, d2, e);
    return b.child;
  }
  function $i(a2, b, c2, d2, e) {
    if (null === a2) {
      var f2 = c2.type;
      if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c2.compare && void 0 === c2.defaultProps) return b.tag = 15, b.type = f2, bj(a2, b, f2, d2, e);
      a2 = Rg(c2.type, null, d2, b, b.mode, e);
      a2.ref = b.ref;
      a2.return = b;
      return b.child = a2;
    }
    f2 = a2.child;
    if (0 === (a2.lanes & e)) {
      var g2 = f2.memoizedProps;
      c2 = c2.compare;
      c2 = null !== c2 ? c2 : Ie;
      if (c2(g2, d2) && a2.ref === b.ref) return Zi(a2, b, e);
    }
    b.flags |= 1;
    a2 = Pg(f2, d2);
    a2.ref = b.ref;
    a2.return = b;
    return b.child = a2;
  }
  function bj(a2, b, c2, d2, e) {
    if (null !== a2) {
      var f2 = a2.memoizedProps;
      if (Ie(f2, d2) && a2.ref === b.ref) if (dh = false, b.pendingProps = d2 = f2, 0 !== (a2.lanes & e)) 0 !== (a2.flags & 131072) && (dh = true);
      else return b.lanes = a2.lanes, Zi(a2, b, e);
    }
    return cj(a2, b, c2, d2, e);
  }
  function dj(a2, b, c2) {
    var d2 = b.pendingProps, e = d2.children, f2 = null !== a2 ? a2.memoizedState : null;
    if ("hidden" === d2.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c2;
    else {
      if (0 === (c2 & 1073741824)) return a2 = null !== f2 ? f2.baseLanes | c2 : c2, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a2, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a2, null;
      b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
      d2 = null !== f2 ? f2.baseLanes : c2;
      G(ej, fj);
      fj |= d2;
    }
    else null !== f2 ? (d2 = f2.baseLanes | c2, b.memoizedState = null) : d2 = c2, G(ej, fj), fj |= d2;
    Xi(a2, b, e, c2);
    return b.child;
  }
  function gj(a2, b) {
    var c2 = b.ref;
    if (null === a2 && null !== c2 || null !== a2 && a2.ref !== c2) b.flags |= 512, b.flags |= 2097152;
  }
  function cj(a2, b, c2, d2, e) {
    var f2 = Zf(c2) ? Xf : H.current;
    f2 = Yf(b, f2);
    ch(b, e);
    c2 = Nh(a2, b, c2, d2, f2, e);
    d2 = Sh();
    if (null !== a2 && !dh) return b.updateQueue = a2.updateQueue, b.flags &= -2053, a2.lanes &= ~e, Zi(a2, b, e);
    I && d2 && vg(b);
    b.flags |= 1;
    Xi(a2, b, c2, e);
    return b.child;
  }
  function hj(a2, b, c2, d2, e) {
    if (Zf(c2)) {
      var f2 = true;
      cg(b);
    } else f2 = false;
    ch(b, e);
    if (null === b.stateNode) ij(a2, b), Gi(b, c2, d2), Ii(b, c2, d2, e), d2 = true;
    else if (null === a2) {
      var g2 = b.stateNode, h = b.memoizedProps;
      g2.props = h;
      var k2 = g2.context, l2 = c2.contextType;
      "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c2) ? Xf : H.current, l2 = Yf(b, l2));
      var m2 = c2.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g2.getSnapshotBeforeUpdate;
      q2 || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h !== d2 || k2 !== l2) && Hi(b, g2, d2, l2);
      jh = false;
      var r2 = b.memoizedState;
      g2.state = r2;
      qh(b, d2, g2, e);
      k2 = b.memoizedState;
      h !== d2 || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c2, m2, d2), k2 = b.memoizedState), (h = jh || Fi(b, c2, h, d2, r2, k2, l2)) ? (q2 || "function" !== typeof g2.UNSAFE_componentWillMount && "function" !== typeof g2.componentWillMount || ("function" === typeof g2.componentWillMount && g2.componentWillMount(), "function" === typeof g2.UNSAFE_componentWillMount && g2.UNSAFE_componentWillMount()), "function" === typeof g2.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g2.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d2, b.memoizedState = k2), g2.props = d2, g2.state = k2, g2.context = l2, d2 = h) : ("function" === typeof g2.componentDidMount && (b.flags |= 4194308), d2 = false);
    } else {
      g2 = b.stateNode;
      lh(a2, b);
      h = b.memoizedProps;
      l2 = b.type === b.elementType ? h : Ci(b.type, h);
      g2.props = l2;
      q2 = b.pendingProps;
      r2 = g2.context;
      k2 = c2.contextType;
      "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c2) ? Xf : H.current, k2 = Yf(b, k2));
      var y2 = c2.getDerivedStateFromProps;
      (m2 = "function" === typeof y2 || "function" === typeof g2.getSnapshotBeforeUpdate) || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h !== q2 || r2 !== k2) && Hi(b, g2, d2, k2);
      jh = false;
      r2 = b.memoizedState;
      g2.state = r2;
      qh(b, d2, g2, e);
      var n2 = b.memoizedState;
      h !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c2, y2, d2), n2 = b.memoizedState), (l2 = jh || Fi(b, c2, l2, d2, r2, n2, k2) || false) ? (m2 || "function" !== typeof g2.UNSAFE_componentWillUpdate && "function" !== typeof g2.componentWillUpdate || ("function" === typeof g2.componentWillUpdate && g2.componentWillUpdate(d2, n2, k2), "function" === typeof g2.UNSAFE_componentWillUpdate && g2.UNSAFE_componentWillUpdate(d2, n2, k2)), "function" === typeof g2.componentDidUpdate && (b.flags |= 4), "function" === typeof g2.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g2.componentDidUpdate || h === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 1024), b.memoizedProps = d2, b.memoizedState = n2), g2.props = d2, g2.state = n2, g2.context = k2, d2 = l2) : ("function" !== typeof g2.componentDidUpdate || h === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 1024), d2 = false);
    }
    return jj(a2, b, c2, d2, f2, e);
  }
  function jj(a2, b, c2, d2, e, f2) {
    gj(a2, b);
    var g2 = 0 !== (b.flags & 128);
    if (!d2 && !g2) return e && dg(b, c2, false), Zi(a2, b, f2);
    d2 = b.stateNode;
    Wi.current = b;
    var h = g2 && "function" !== typeof c2.getDerivedStateFromError ? null : d2.render();
    b.flags |= 1;
    null !== a2 && g2 ? (b.child = Ug(b, a2.child, null, f2), b.child = Ug(b, null, h, f2)) : Xi(a2, b, h, f2);
    b.memoizedState = d2.state;
    e && dg(b, c2, true);
    return b.child;
  }
  function kj(a2) {
    var b = a2.stateNode;
    b.pendingContext ? ag(a2, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a2, b.context, false);
    yh(a2, b.containerInfo);
  }
  function lj(a2, b, c2, d2, e) {
    Ig();
    Jg(e);
    b.flags |= 256;
    Xi(a2, b, c2, d2);
    return b.child;
  }
  var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
  function nj(a2) {
    return { baseLanes: a2, cachePool: null, transitions: null };
  }
  function oj(a2, b, c2) {
    var d2 = b.pendingProps, e = L$1.current, f2 = false, g2 = 0 !== (b.flags & 128), h;
    (h = g2) || (h = null !== a2 && null === a2.memoizedState ? false : 0 !== (e & 2));
    if (h) f2 = true, b.flags &= -129;
    else if (null === a2 || null !== a2.memoizedState) e |= 1;
    G(L$1, e & 1);
    if (null === a2) {
      Eg(b);
      a2 = b.memoizedState;
      if (null !== a2 && (a2 = a2.dehydrated, null !== a2)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a2.data ? b.lanes = 8 : b.lanes = 1073741824, null;
      g2 = d2.children;
      a2 = d2.fallback;
      return f2 ? (d2 = b.mode, f2 = b.child, g2 = { mode: "hidden", children: g2 }, 0 === (d2 & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g2) : f2 = pj(g2, d2, 0, null), a2 = Tg(a2, d2, c2, null), f2.return = b, a2.return = b, f2.sibling = a2, b.child = f2, b.child.memoizedState = nj(c2), b.memoizedState = mj, a2) : qj(b, g2);
    }
    e = a2.memoizedState;
    if (null !== e && (h = e.dehydrated, null !== h)) return rj(a2, b, g2, d2, h, e, c2);
    if (f2) {
      f2 = d2.fallback;
      g2 = b.mode;
      e = a2.child;
      h = e.sibling;
      var k2 = { mode: "hidden", children: d2.children };
      0 === (g2 & 1) && b.child !== e ? (d2 = b.child, d2.childLanes = 0, d2.pendingProps = k2, b.deletions = null) : (d2 = Pg(e, k2), d2.subtreeFlags = e.subtreeFlags & 14680064);
      null !== h ? f2 = Pg(h, f2) : (f2 = Tg(f2, g2, c2, null), f2.flags |= 2);
      f2.return = b;
      d2.return = b;
      d2.sibling = f2;
      b.child = d2;
      d2 = f2;
      f2 = b.child;
      g2 = a2.child.memoizedState;
      g2 = null === g2 ? nj(c2) : { baseLanes: g2.baseLanes | c2, cachePool: null, transitions: g2.transitions };
      f2.memoizedState = g2;
      f2.childLanes = a2.childLanes & ~c2;
      b.memoizedState = mj;
      return d2;
    }
    f2 = a2.child;
    a2 = f2.sibling;
    d2 = Pg(f2, { mode: "visible", children: d2.children });
    0 === (b.mode & 1) && (d2.lanes = c2);
    d2.return = b;
    d2.sibling = null;
    null !== a2 && (c2 = b.deletions, null === c2 ? (b.deletions = [a2], b.flags |= 16) : c2.push(a2));
    b.child = d2;
    b.memoizedState = null;
    return d2;
  }
  function qj(a2, b) {
    b = pj({ mode: "visible", children: b }, a2.mode, 0, null);
    b.return = a2;
    return a2.child = b;
  }
  function sj(a2, b, c2, d2) {
    null !== d2 && Jg(d2);
    Ug(b, a2.child, null, c2);
    a2 = qj(b, b.pendingProps.children);
    a2.flags |= 2;
    b.memoizedState = null;
    return a2;
  }
  function rj(a2, b, c2, d2, e, f2, g2) {
    if (c2) {
      if (b.flags & 256) return b.flags &= -257, d2 = Ki(Error(p$1(422))), sj(a2, b, g2, d2);
      if (null !== b.memoizedState) return b.child = a2.child, b.flags |= 128, null;
      f2 = d2.fallback;
      e = b.mode;
      d2 = pj({ mode: "visible", children: d2.children }, e, 0, null);
      f2 = Tg(f2, e, g2, null);
      f2.flags |= 2;
      d2.return = b;
      f2.return = b;
      d2.sibling = f2;
      b.child = d2;
      0 !== (b.mode & 1) && Ug(b, a2.child, null, g2);
      b.child.memoizedState = nj(g2);
      b.memoizedState = mj;
      return f2;
    }
    if (0 === (b.mode & 1)) return sj(a2, b, g2, null);
    if ("$!" === e.data) {
      d2 = e.nextSibling && e.nextSibling.dataset;
      if (d2) var h = d2.dgst;
      d2 = h;
      f2 = Error(p$1(419));
      d2 = Ki(f2, d2, void 0);
      return sj(a2, b, g2, d2);
    }
    h = 0 !== (g2 & a2.childLanes);
    if (dh || h) {
      d2 = Q;
      if (null !== d2) {
        switch (g2 & -g2) {
          case 4:
            e = 2;
            break;
          case 16:
            e = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            e = 32;
            break;
          case 536870912:
            e = 268435456;
            break;
          default:
            e = 0;
        }
        e = 0 !== (e & (d2.suspendedLanes | g2)) ? 0 : e;
        0 !== e && e !== f2.retryLane && (f2.retryLane = e, ih(a2, e), gi(d2, a2, e, -1));
      }
      tj();
      d2 = Ki(Error(p$1(421)));
      return sj(a2, b, g2, d2);
    }
    if ("$?" === e.data) return b.flags |= 128, b.child = a2.child, b = uj.bind(null, a2), e._reactRetry = b, null;
    a2 = f2.treeContext;
    yg = Lf(e.nextSibling);
    xg = b;
    I = true;
    zg = null;
    null !== a2 && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a2.id, sg = a2.overflow, qg = b);
    b = qj(b, d2.children);
    b.flags |= 4096;
    return b;
  }
  function vj(a2, b, c2) {
    a2.lanes |= b;
    var d2 = a2.alternate;
    null !== d2 && (d2.lanes |= b);
    bh(a2.return, b, c2);
  }
  function wj(a2, b, c2, d2, e) {
    var f2 = a2.memoizedState;
    null === f2 ? a2.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d2, tail: c2, tailMode: e } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d2, f2.tail = c2, f2.tailMode = e);
  }
  function xj(a2, b, c2) {
    var d2 = b.pendingProps, e = d2.revealOrder, f2 = d2.tail;
    Xi(a2, b, d2.children, c2);
    d2 = L$1.current;
    if (0 !== (d2 & 2)) d2 = d2 & 1 | 2, b.flags |= 128;
    else {
      if (null !== a2 && 0 !== (a2.flags & 128)) a: for (a2 = b.child; null !== a2; ) {
        if (13 === a2.tag) null !== a2.memoizedState && vj(a2, c2, b);
        else if (19 === a2.tag) vj(a2, c2, b);
        else if (null !== a2.child) {
          a2.child.return = a2;
          a2 = a2.child;
          continue;
        }
        if (a2 === b) break a;
        for (; null === a2.sibling; ) {
          if (null === a2.return || a2.return === b) break a;
          a2 = a2.return;
        }
        a2.sibling.return = a2.return;
        a2 = a2.sibling;
      }
      d2 &= 1;
    }
    G(L$1, d2);
    if (0 === (b.mode & 1)) b.memoizedState = null;
    else switch (e) {
      case "forwards":
        c2 = b.child;
        for (e = null; null !== c2; ) a2 = c2.alternate, null !== a2 && null === Ch(a2) && (e = c2), c2 = c2.sibling;
        c2 = e;
        null === c2 ? (e = b.child, b.child = null) : (e = c2.sibling, c2.sibling = null);
        wj(b, false, e, c2, f2);
        break;
      case "backwards":
        c2 = null;
        e = b.child;
        for (b.child = null; null !== e; ) {
          a2 = e.alternate;
          if (null !== a2 && null === Ch(a2)) {
            b.child = e;
            break;
          }
          a2 = e.sibling;
          e.sibling = c2;
          c2 = e;
          e = a2;
        }
        wj(b, true, c2, null, f2);
        break;
      case "together":
        wj(b, false, null, null, void 0);
        break;
      default:
        b.memoizedState = null;
    }
    return b.child;
  }
  function ij(a2, b) {
    0 === (b.mode & 1) && null !== a2 && (a2.alternate = null, b.alternate = null, b.flags |= 2);
  }
  function Zi(a2, b, c2) {
    null !== a2 && (b.dependencies = a2.dependencies);
    rh |= b.lanes;
    if (0 === (c2 & b.childLanes)) return null;
    if (null !== a2 && b.child !== a2.child) throw Error(p$1(153));
    if (null !== b.child) {
      a2 = b.child;
      c2 = Pg(a2, a2.pendingProps);
      b.child = c2;
      for (c2.return = b; null !== a2.sibling; ) a2 = a2.sibling, c2 = c2.sibling = Pg(a2, a2.pendingProps), c2.return = b;
      c2.sibling = null;
    }
    return b.child;
  }
  function yj(a2, b, c2) {
    switch (b.tag) {
      case 3:
        kj(b);
        Ig();
        break;
      case 5:
        Ah(b);
        break;
      case 1:
        Zf(b.type) && cg(b);
        break;
      case 4:
        yh(b, b.stateNode.containerInfo);
        break;
      case 10:
        var d2 = b.type._context, e = b.memoizedProps.value;
        G(Wg, d2._currentValue);
        d2._currentValue = e;
        break;
      case 13:
        d2 = b.memoizedState;
        if (null !== d2) {
          if (null !== d2.dehydrated) return G(L$1, L$1.current & 1), b.flags |= 128, null;
          if (0 !== (c2 & b.child.childLanes)) return oj(a2, b, c2);
          G(L$1, L$1.current & 1);
          a2 = Zi(a2, b, c2);
          return null !== a2 ? a2.sibling : null;
        }
        G(L$1, L$1.current & 1);
        break;
      case 19:
        d2 = 0 !== (c2 & b.childLanes);
        if (0 !== (a2.flags & 128)) {
          if (d2) return xj(a2, b, c2);
          b.flags |= 128;
        }
        e = b.memoizedState;
        null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
        G(L$1, L$1.current);
        if (d2) break;
        else return null;
      case 22:
      case 23:
        return b.lanes = 0, dj(a2, b, c2);
    }
    return Zi(a2, b, c2);
  }
  var zj, Aj, Bj, Cj;
  zj = function(a2, b) {
    for (var c2 = b.child; null !== c2; ) {
      if (5 === c2.tag || 6 === c2.tag) a2.appendChild(c2.stateNode);
      else if (4 !== c2.tag && null !== c2.child) {
        c2.child.return = c2;
        c2 = c2.child;
        continue;
      }
      if (c2 === b) break;
      for (; null === c2.sibling; ) {
        if (null === c2.return || c2.return === b) return;
        c2 = c2.return;
      }
      c2.sibling.return = c2.return;
      c2 = c2.sibling;
    }
  };
  Aj = function() {
  };
  Bj = function(a2, b, c2, d2) {
    var e = a2.memoizedProps;
    if (e !== d2) {
      a2 = b.stateNode;
      xh(uh.current);
      var f2 = null;
      switch (c2) {
        case "input":
          e = Ya(a2, e);
          d2 = Ya(a2, d2);
          f2 = [];
          break;
        case "select":
          e = A$1({}, e, { value: void 0 });
          d2 = A$1({}, d2, { value: void 0 });
          f2 = [];
          break;
        case "textarea":
          e = gb(a2, e);
          d2 = gb(a2, d2);
          f2 = [];
          break;
        default:
          "function" !== typeof e.onClick && "function" === typeof d2.onClick && (a2.onclick = Bf);
      }
      ub(c2, d2);
      var g2;
      c2 = null;
      for (l2 in e) if (!d2.hasOwnProperty(l2) && e.hasOwnProperty(l2) && null != e[l2]) if ("style" === l2) {
        var h = e[l2];
        for (g2 in h) h.hasOwnProperty(g2) && (c2 || (c2 = {}), c2[g2] = "");
      } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
      for (l2 in d2) {
        var k2 = d2[l2];
        h = null != e ? e[l2] : void 0;
        if (d2.hasOwnProperty(l2) && k2 !== h && (null != k2 || null != h)) if ("style" === l2) if (h) {
          for (g2 in h) !h.hasOwnProperty(g2) || k2 && k2.hasOwnProperty(g2) || (c2 || (c2 = {}), c2[g2] = "");
          for (g2 in k2) k2.hasOwnProperty(g2) && h[g2] !== k2[g2] && (c2 || (c2 = {}), c2[g2] = k2[g2]);
        } else c2 || (f2 || (f2 = []), f2.push(
          l2,
          c2
        )), c2 = k2;
        else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h = h ? h.__html : void 0, null != k2 && h !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D("scroll", a2), f2 || h === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
      }
      c2 && (f2 = f2 || []).push("style", c2);
      var l2 = f2;
      if (b.updateQueue = l2) b.flags |= 4;
    }
  };
  Cj = function(a2, b, c2, d2) {
    c2 !== d2 && (b.flags |= 4);
  };
  function Dj(a2, b) {
    if (!I) switch (a2.tailMode) {
      case "hidden":
        b = a2.tail;
        for (var c2 = null; null !== b; ) null !== b.alternate && (c2 = b), b = b.sibling;
        null === c2 ? a2.tail = null : c2.sibling = null;
        break;
      case "collapsed":
        c2 = a2.tail;
        for (var d2 = null; null !== c2; ) null !== c2.alternate && (d2 = c2), c2 = c2.sibling;
        null === d2 ? b || null === a2.tail ? a2.tail = null : a2.tail.sibling = null : d2.sibling = null;
    }
  }
  function S(a2) {
    var b = null !== a2.alternate && a2.alternate.child === a2.child, c2 = 0, d2 = 0;
    if (b) for (var e = a2.child; null !== e; ) c2 |= e.lanes | e.childLanes, d2 |= e.subtreeFlags & 14680064, d2 |= e.flags & 14680064, e.return = a2, e = e.sibling;
    else for (e = a2.child; null !== e; ) c2 |= e.lanes | e.childLanes, d2 |= e.subtreeFlags, d2 |= e.flags, e.return = a2, e = e.sibling;
    a2.subtreeFlags |= d2;
    a2.childLanes = c2;
    return b;
  }
  function Ej(a2, b, c2) {
    var d2 = b.pendingProps;
    wg(b);
    switch (b.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return S(b), null;
      case 1:
        return Zf(b.type) && $f(), S(b), null;
      case 3:
        d2 = b.stateNode;
        zh();
        E$1(Wf);
        E$1(H);
        Eh();
        d2.pendingContext && (d2.context = d2.pendingContext, d2.pendingContext = null);
        if (null === a2 || null === a2.child) Gg(b) ? b.flags |= 4 : null === a2 || a2.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
        Aj(a2, b);
        S(b);
        return null;
      case 5:
        Bh(b);
        var e = xh(wh.current);
        c2 = b.type;
        if (null !== a2 && null != b.stateNode) Bj(a2, b, c2, d2, e), a2.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        else {
          if (!d2) {
            if (null === b.stateNode) throw Error(p$1(166));
            S(b);
            return null;
          }
          a2 = xh(uh.current);
          if (Gg(b)) {
            d2 = b.stateNode;
            c2 = b.type;
            var f2 = b.memoizedProps;
            d2[Of] = b;
            d2[Pf] = f2;
            a2 = 0 !== (b.mode & 1);
            switch (c2) {
              case "dialog":
                D("cancel", d2);
                D("close", d2);
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", d2);
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++) D(lf[e], d2);
                break;
              case "source":
                D("error", d2);
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  d2
                );
                D("load", d2);
                break;
              case "details":
                D("toggle", d2);
                break;
              case "input":
                Za(d2, f2);
                D("invalid", d2);
                break;
              case "select":
                d2._wrapperState = { wasMultiple: !!f2.multiple };
                D("invalid", d2);
                break;
              case "textarea":
                hb(d2, f2), D("invalid", d2);
            }
            ub(c2, f2);
            e = null;
            for (var g2 in f2) if (f2.hasOwnProperty(g2)) {
              var h = f2[g2];
              "children" === g2 ? "string" === typeof h ? d2.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d2.textContent, h, a2), e = ["children", h]) : "number" === typeof h && d2.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
                d2.textContent,
                h,
                a2
              ), e = ["children", "" + h]) : ea.hasOwnProperty(g2) && null != h && "onScroll" === g2 && D("scroll", d2);
            }
            switch (c2) {
              case "input":
                Va(d2);
                db(d2, f2, true);
                break;
              case "textarea":
                Va(d2);
                jb(d2);
                break;
              case "select":
              case "option":
                break;
              default:
                "function" === typeof f2.onClick && (d2.onclick = Bf);
            }
            d2 = e;
            b.updateQueue = d2;
            null !== d2 && (b.flags |= 4);
          } else {
            g2 = 9 === e.nodeType ? e : e.ownerDocument;
            "http://www.w3.org/1999/xhtml" === a2 && (a2 = kb(c2));
            "http://www.w3.org/1999/xhtml" === a2 ? "script" === c2 ? (a2 = g2.createElement("div"), a2.innerHTML = "<script><\/script>", a2 = a2.removeChild(a2.firstChild)) : "string" === typeof d2.is ? a2 = g2.createElement(c2, { is: d2.is }) : (a2 = g2.createElement(c2), "select" === c2 && (g2 = a2, d2.multiple ? g2.multiple = true : d2.size && (g2.size = d2.size))) : a2 = g2.createElementNS(a2, c2);
            a2[Of] = b;
            a2[Pf] = d2;
            zj(a2, b, false, false);
            b.stateNode = a2;
            a: {
              g2 = vb(c2, d2);
              switch (c2) {
                case "dialog":
                  D("cancel", a2);
                  D("close", a2);
                  e = d2;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  D("load", a2);
                  e = d2;
                  break;
                case "video":
                case "audio":
                  for (e = 0; e < lf.length; e++) D(lf[e], a2);
                  e = d2;
                  break;
                case "source":
                  D("error", a2);
                  e = d2;
                  break;
                case "img":
                case "image":
                case "link":
                  D(
                    "error",
                    a2
                  );
                  D("load", a2);
                  e = d2;
                  break;
                case "details":
                  D("toggle", a2);
                  e = d2;
                  break;
                case "input":
                  Za(a2, d2);
                  e = Ya(a2, d2);
                  D("invalid", a2);
                  break;
                case "option":
                  e = d2;
                  break;
                case "select":
                  a2._wrapperState = { wasMultiple: !!d2.multiple };
                  e = A$1({}, d2, { value: void 0 });
                  D("invalid", a2);
                  break;
                case "textarea":
                  hb(a2, d2);
                  e = gb(a2, d2);
                  D("invalid", a2);
                  break;
                default:
                  e = d2;
              }
              ub(c2, e);
              h = e;
              for (f2 in h) if (h.hasOwnProperty(f2)) {
                var k2 = h[f2];
                "style" === f2 ? sb(a2, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a2, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c2 || "" !== k2) && ob(a2, k2) : "number" === typeof k2 && ob(a2, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D("scroll", a2) : null != k2 && ta(a2, f2, k2, g2));
              }
              switch (c2) {
                case "input":
                  Va(a2);
                  db(a2, d2, false);
                  break;
                case "textarea":
                  Va(a2);
                  jb(a2);
                  break;
                case "option":
                  null != d2.value && a2.setAttribute("value", "" + Sa(d2.value));
                  break;
                case "select":
                  a2.multiple = !!d2.multiple;
                  f2 = d2.value;
                  null != f2 ? fb(a2, !!d2.multiple, f2, false) : null != d2.defaultValue && fb(
                    a2,
                    !!d2.multiple,
                    d2.defaultValue,
                    true
                  );
                  break;
                default:
                  "function" === typeof e.onClick && (a2.onclick = Bf);
              }
              switch (c2) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  d2 = !!d2.autoFocus;
                  break a;
                case "img":
                  d2 = true;
                  break a;
                default:
                  d2 = false;
              }
            }
            d2 && (b.flags |= 4);
          }
          null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        }
        S(b);
        return null;
      case 6:
        if (a2 && null != b.stateNode) Cj(a2, b, a2.memoizedProps, d2);
        else {
          if ("string" !== typeof d2 && null === b.stateNode) throw Error(p$1(166));
          c2 = xh(wh.current);
          xh(uh.current);
          if (Gg(b)) {
            d2 = b.stateNode;
            c2 = b.memoizedProps;
            d2[Of] = b;
            if (f2 = d2.nodeValue !== c2) {
              if (a2 = xg, null !== a2) switch (a2.tag) {
                case 3:
                  Af(d2.nodeValue, c2, 0 !== (a2.mode & 1));
                  break;
                case 5:
                  true !== a2.memoizedProps.suppressHydrationWarning && Af(d2.nodeValue, c2, 0 !== (a2.mode & 1));
              }
            }
            f2 && (b.flags |= 4);
          } else d2 = (9 === c2.nodeType ? c2 : c2.ownerDocument).createTextNode(d2), d2[Of] = b, b.stateNode = d2;
        }
        S(b);
        return null;
      case 13:
        E$1(L$1);
        d2 = b.memoizedState;
        if (null === a2 || null !== a2.memoizedState && null !== a2.memoizedState.dehydrated) {
          if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
          else if (f2 = Gg(b), null !== d2 && null !== d2.dehydrated) {
            if (null === a2) {
              if (!f2) throw Error(p$1(318));
              f2 = b.memoizedState;
              f2 = null !== f2 ? f2.dehydrated : null;
              if (!f2) throw Error(p$1(317));
              f2[Of] = b;
            } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
            S(b);
            f2 = false;
          } else null !== zg && (Fj(zg), zg = null), f2 = true;
          if (!f2) return b.flags & 65536 ? b : null;
        }
        if (0 !== (b.flags & 128)) return b.lanes = c2, b;
        d2 = null !== d2;
        d2 !== (null !== a2 && null !== a2.memoizedState) && d2 && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a2 || 0 !== (L$1.current & 1) ? 0 === T$1 && (T$1 = 3) : tj()));
        null !== b.updateQueue && (b.flags |= 4);
        S(b);
        return null;
      case 4:
        return zh(), Aj(a2, b), null === a2 && sf(b.stateNode.containerInfo), S(b), null;
      case 10:
        return ah(b.type._context), S(b), null;
      case 17:
        return Zf(b.type) && $f(), S(b), null;
      case 19:
        E$1(L$1);
        f2 = b.memoizedState;
        if (null === f2) return S(b), null;
        d2 = 0 !== (b.flags & 128);
        g2 = f2.rendering;
        if (null === g2) if (d2) Dj(f2, false);
        else {
          if (0 !== T$1 || null !== a2 && 0 !== (a2.flags & 128)) for (a2 = b.child; null !== a2; ) {
            g2 = Ch(a2);
            if (null !== g2) {
              b.flags |= 128;
              Dj(f2, false);
              d2 = g2.updateQueue;
              null !== d2 && (b.updateQueue = d2, b.flags |= 4);
              b.subtreeFlags = 0;
              d2 = c2;
              for (c2 = b.child; null !== c2; ) f2 = c2, a2 = d2, f2.flags &= 14680066, g2 = f2.alternate, null === g2 ? (f2.childLanes = 0, f2.lanes = a2, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g2.childLanes, f2.lanes = g2.lanes, f2.child = g2.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g2.memoizedProps, f2.memoizedState = g2.memoizedState, f2.updateQueue = g2.updateQueue, f2.type = g2.type, a2 = g2.dependencies, f2.dependencies = null === a2 ? null : { lanes: a2.lanes, firstContext: a2.firstContext }), c2 = c2.sibling;
              G(L$1, L$1.current & 1 | 2);
              return b.child;
            }
            a2 = a2.sibling;
          }
          null !== f2.tail && B() > Gj && (b.flags |= 128, d2 = true, Dj(f2, false), b.lanes = 4194304);
        }
        else {
          if (!d2) if (a2 = Ch(g2), null !== a2) {
            if (b.flags |= 128, d2 = true, c2 = a2.updateQueue, null !== c2 && (b.updateQueue = c2, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g2.alternate && !I) return S(b), null;
          } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c2 && (b.flags |= 128, d2 = true, Dj(f2, false), b.lanes = 4194304);
          f2.isBackwards ? (g2.sibling = b.child, b.child = g2) : (c2 = f2.last, null !== c2 ? c2.sibling = g2 : b.child = g2, f2.last = g2);
        }
        if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c2 = L$1.current, G(L$1, d2 ? c2 & 1 | 2 : c2 & 1), b;
        S(b);
        return null;
      case 22:
      case 23:
        return Hj(), d2 = null !== b.memoizedState, null !== a2 && null !== a2.memoizedState !== d2 && (b.flags |= 8192), d2 && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(p$1(156, b.tag));
  }
  function Ij(a2, b) {
    wg(b);
    switch (b.tag) {
      case 1:
        return Zf(b.type) && $f(), a2 = b.flags, a2 & 65536 ? (b.flags = a2 & -65537 | 128, b) : null;
      case 3:
        return zh(), E$1(Wf), E$1(H), Eh(), a2 = b.flags, 0 !== (a2 & 65536) && 0 === (a2 & 128) ? (b.flags = a2 & -65537 | 128, b) : null;
      case 5:
        return Bh(b), null;
      case 13:
        E$1(L$1);
        a2 = b.memoizedState;
        if (null !== a2 && null !== a2.dehydrated) {
          if (null === b.alternate) throw Error(p$1(340));
          Ig();
        }
        a2 = b.flags;
        return a2 & 65536 ? (b.flags = a2 & -65537 | 128, b) : null;
      case 19:
        return E$1(L$1), null;
      case 4:
        return zh(), null;
      case 10:
        return ah(b.type._context), null;
      case 22:
      case 23:
        return Hj(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V$1 = null;
  function Lj(a2, b) {
    var c2 = a2.ref;
    if (null !== c2) if ("function" === typeof c2) try {
      c2(null);
    } catch (d2) {
      W(a2, b, d2);
    }
    else c2.current = null;
  }
  function Mj(a2, b, c2) {
    try {
      c2();
    } catch (d2) {
      W(a2, b, d2);
    }
  }
  var Nj = false;
  function Oj(a2, b) {
    Cf = dd;
    a2 = Me();
    if (Ne(a2)) {
      if ("selectionStart" in a2) var c2 = { start: a2.selectionStart, end: a2.selectionEnd };
      else a: {
        c2 = (c2 = a2.ownerDocument) && c2.defaultView || window;
        var d2 = c2.getSelection && c2.getSelection();
        if (d2 && 0 !== d2.rangeCount) {
          c2 = d2.anchorNode;
          var e = d2.anchorOffset, f2 = d2.focusNode;
          d2 = d2.focusOffset;
          try {
            c2.nodeType, f2.nodeType;
          } catch (F2) {
            c2 = null;
            break a;
          }
          var g2 = 0, h = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a2, r2 = null;
          b: for (; ; ) {
            for (var y2; ; ) {
              q2 !== c2 || 0 !== e && 3 !== q2.nodeType || (h = g2 + e);
              q2 !== f2 || 0 !== d2 && 3 !== q2.nodeType || (k2 = g2 + d2);
              3 === q2.nodeType && (g2 += q2.nodeValue.length);
              if (null === (y2 = q2.firstChild)) break;
              r2 = q2;
              q2 = y2;
            }
            for (; ; ) {
              if (q2 === a2) break b;
              r2 === c2 && ++l2 === e && (h = g2);
              r2 === f2 && ++m2 === d2 && (k2 = g2);
              if (null !== (y2 = q2.nextSibling)) break;
              q2 = r2;
              r2 = q2.parentNode;
            }
            q2 = y2;
          }
          c2 = -1 === h || -1 === k2 ? null : { start: h, end: k2 };
        } else c2 = null;
      }
      c2 = c2 || { start: 0, end: 0 };
    } else c2 = null;
    Df = { focusedElem: a2, selectionRange: c2 };
    dd = false;
    for (V$1 = b; null !== V$1; ) if (b = V$1, a2 = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a2) a2.return = b, V$1 = a2;
    else for (; null !== V$1; ) {
      b = V$1;
      try {
        var n2 = b.alternate;
        if (0 !== (b.flags & 1024)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (null !== n2) {
              var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
              x2.__reactInternalSnapshotBeforeUpdate = w2;
            }
            break;
          case 3:
            var u2 = b.stateNode.containerInfo;
            1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(p$1(163));
        }
      } catch (F2) {
        W(b, b.return, F2);
      }
      a2 = b.sibling;
      if (null !== a2) {
        a2.return = b.return;
        V$1 = a2;
        break;
      }
      V$1 = b.return;
    }
    n2 = Nj;
    Nj = false;
    return n2;
  }
  function Pj(a2, b, c2) {
    var d2 = b.updateQueue;
    d2 = null !== d2 ? d2.lastEffect : null;
    if (null !== d2) {
      var e = d2 = d2.next;
      do {
        if ((e.tag & a2) === a2) {
          var f2 = e.destroy;
          e.destroy = void 0;
          void 0 !== f2 && Mj(b, c2, f2);
        }
        e = e.next;
      } while (e !== d2);
    }
  }
  function Qj(a2, b) {
    b = b.updateQueue;
    b = null !== b ? b.lastEffect : null;
    if (null !== b) {
      var c2 = b = b.next;
      do {
        if ((c2.tag & a2) === a2) {
          var d2 = c2.create;
          c2.destroy = d2();
        }
        c2 = c2.next;
      } while (c2 !== b);
    }
  }
  function Rj(a2) {
    var b = a2.ref;
    if (null !== b) {
      var c2 = a2.stateNode;
      switch (a2.tag) {
        case 5:
          a2 = c2;
          break;
        default:
          a2 = c2;
      }
      "function" === typeof b ? b(a2) : b.current = a2;
    }
  }
  function Sj(a2) {
    var b = a2.alternate;
    null !== b && (a2.alternate = null, Sj(b));
    a2.child = null;
    a2.deletions = null;
    a2.sibling = null;
    5 === a2.tag && (b = a2.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
    a2.stateNode = null;
    a2.return = null;
    a2.dependencies = null;
    a2.memoizedProps = null;
    a2.memoizedState = null;
    a2.pendingProps = null;
    a2.stateNode = null;
    a2.updateQueue = null;
  }
  function Tj(a2) {
    return 5 === a2.tag || 3 === a2.tag || 4 === a2.tag;
  }
  function Uj(a2) {
    a: for (; ; ) {
      for (; null === a2.sibling; ) {
        if (null === a2.return || Tj(a2.return)) return null;
        a2 = a2.return;
      }
      a2.sibling.return = a2.return;
      for (a2 = a2.sibling; 5 !== a2.tag && 6 !== a2.tag && 18 !== a2.tag; ) {
        if (a2.flags & 2) continue a;
        if (null === a2.child || 4 === a2.tag) continue a;
        else a2.child.return = a2, a2 = a2.child;
      }
      if (!(a2.flags & 2)) return a2.stateNode;
    }
  }
  function Vj(a2, b, c2) {
    var d2 = a2.tag;
    if (5 === d2 || 6 === d2) a2 = a2.stateNode, b ? 8 === c2.nodeType ? c2.parentNode.insertBefore(a2, b) : c2.insertBefore(a2, b) : (8 === c2.nodeType ? (b = c2.parentNode, b.insertBefore(a2, c2)) : (b = c2, b.appendChild(a2)), c2 = c2._reactRootContainer, null !== c2 && void 0 !== c2 || null !== b.onclick || (b.onclick = Bf));
    else if (4 !== d2 && (a2 = a2.child, null !== a2)) for (Vj(a2, b, c2), a2 = a2.sibling; null !== a2; ) Vj(a2, b, c2), a2 = a2.sibling;
  }
  function Wj(a2, b, c2) {
    var d2 = a2.tag;
    if (5 === d2 || 6 === d2) a2 = a2.stateNode, b ? c2.insertBefore(a2, b) : c2.appendChild(a2);
    else if (4 !== d2 && (a2 = a2.child, null !== a2)) for (Wj(a2, b, c2), a2 = a2.sibling; null !== a2; ) Wj(a2, b, c2), a2 = a2.sibling;
  }
  var X = null, Xj = false;
  function Yj(a2, b, c2) {
    for (c2 = c2.child; null !== c2; ) Zj(a2, b, c2), c2 = c2.sibling;
  }
  function Zj(a2, b, c2) {
    if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
      lc.onCommitFiberUnmount(kc, c2);
    } catch (h) {
    }
    switch (c2.tag) {
      case 5:
        U || Lj(c2, b);
      case 6:
        var d2 = X, e = Xj;
        X = null;
        Yj(a2, b, c2);
        X = d2;
        Xj = e;
        null !== X && (Xj ? (a2 = X, c2 = c2.stateNode, 8 === a2.nodeType ? a2.parentNode.removeChild(c2) : a2.removeChild(c2)) : X.removeChild(c2.stateNode));
        break;
      case 18:
        null !== X && (Xj ? (a2 = X, c2 = c2.stateNode, 8 === a2.nodeType ? Kf(a2.parentNode, c2) : 1 === a2.nodeType && Kf(a2, c2), bd(a2)) : Kf(X, c2.stateNode));
        break;
      case 4:
        d2 = X;
        e = Xj;
        X = c2.stateNode.containerInfo;
        Xj = true;
        Yj(a2, b, c2);
        X = d2;
        Xj = e;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!U && (d2 = c2.updateQueue, null !== d2 && (d2 = d2.lastEffect, null !== d2))) {
          e = d2 = d2.next;
          do {
            var f2 = e, g2 = f2.destroy;
            f2 = f2.tag;
            void 0 !== g2 && (0 !== (f2 & 2) ? Mj(c2, b, g2) : 0 !== (f2 & 4) && Mj(c2, b, g2));
            e = e.next;
          } while (e !== d2);
        }
        Yj(a2, b, c2);
        break;
      case 1:
        if (!U && (Lj(c2, b), d2 = c2.stateNode, "function" === typeof d2.componentWillUnmount)) try {
          d2.props = c2.memoizedProps, d2.state = c2.memoizedState, d2.componentWillUnmount();
        } catch (h) {
          W(c2, b, h);
        }
        Yj(a2, b, c2);
        break;
      case 21:
        Yj(a2, b, c2);
        break;
      case 22:
        c2.mode & 1 ? (U = (d2 = U) || null !== c2.memoizedState, Yj(a2, b, c2), U = d2) : Yj(a2, b, c2);
        break;
      default:
        Yj(a2, b, c2);
    }
  }
  function ak(a2) {
    var b = a2.updateQueue;
    if (null !== b) {
      a2.updateQueue = null;
      var c2 = a2.stateNode;
      null === c2 && (c2 = a2.stateNode = new Kj());
      b.forEach(function(b2) {
        var d2 = bk.bind(null, a2, b2);
        c2.has(b2) || (c2.add(b2), b2.then(d2, d2));
      });
    }
  }
  function ck(a2, b) {
    var c2 = b.deletions;
    if (null !== c2) for (var d2 = 0; d2 < c2.length; d2++) {
      var e = c2[d2];
      try {
        var f2 = a2, g2 = b, h = g2;
        a: for (; null !== h; ) {
          switch (h.tag) {
            case 5:
              X = h.stateNode;
              Xj = false;
              break a;
            case 3:
              X = h.stateNode.containerInfo;
              Xj = true;
              break a;
            case 4:
              X = h.stateNode.containerInfo;
              Xj = true;
              break a;
          }
          h = h.return;
        }
        if (null === X) throw Error(p$1(160));
        Zj(f2, g2, e);
        X = null;
        Xj = false;
        var k2 = e.alternate;
        null !== k2 && (k2.return = null);
        e.return = null;
      } catch (l2) {
        W(e, b, l2);
      }
    }
    if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a2), b = b.sibling;
  }
  function dk(a2, b) {
    var c2 = a2.alternate, d2 = a2.flags;
    switch (a2.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ck(b, a2);
        ek(a2);
        if (d2 & 4) {
          try {
            Pj(3, a2, a2.return), Qj(3, a2);
          } catch (t2) {
            W(a2, a2.return, t2);
          }
          try {
            Pj(5, a2, a2.return);
          } catch (t2) {
            W(a2, a2.return, t2);
          }
        }
        break;
      case 1:
        ck(b, a2);
        ek(a2);
        d2 & 512 && null !== c2 && Lj(c2, c2.return);
        break;
      case 5:
        ck(b, a2);
        ek(a2);
        d2 & 512 && null !== c2 && Lj(c2, c2.return);
        if (a2.flags & 32) {
          var e = a2.stateNode;
          try {
            ob(e, "");
          } catch (t2) {
            W(a2, a2.return, t2);
          }
        }
        if (d2 & 4 && (e = a2.stateNode, null != e)) {
          var f2 = a2.memoizedProps, g2 = null !== c2 ? c2.memoizedProps : f2, h = a2.type, k2 = a2.updateQueue;
          a2.updateQueue = null;
          if (null !== k2) try {
            "input" === h && "radio" === f2.type && null != f2.name && ab(e, f2);
            vb(h, g2);
            var l2 = vb(h, f2);
            for (g2 = 0; g2 < k2.length; g2 += 2) {
              var m2 = k2[g2], q2 = k2[g2 + 1];
              "style" === m2 ? sb(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e, q2) : "children" === m2 ? ob(e, q2) : ta(e, m2, q2, l2);
            }
            switch (h) {
              case "input":
                bb(e, f2);
                break;
              case "textarea":
                ib(e, f2);
                break;
              case "select":
                var r2 = e._wrapperState.wasMultiple;
                e._wrapperState.wasMultiple = !!f2.multiple;
                var y2 = f2.value;
                null != y2 ? fb(e, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                  e,
                  !!f2.multiple,
                  f2.defaultValue,
                  true
                ) : fb(e, !!f2.multiple, f2.multiple ? [] : "", false));
            }
            e[Pf] = f2;
          } catch (t2) {
            W(a2, a2.return, t2);
          }
        }
        break;
      case 6:
        ck(b, a2);
        ek(a2);
        if (d2 & 4) {
          if (null === a2.stateNode) throw Error(p$1(162));
          e = a2.stateNode;
          f2 = a2.memoizedProps;
          try {
            e.nodeValue = f2;
          } catch (t2) {
            W(a2, a2.return, t2);
          }
        }
        break;
      case 3:
        ck(b, a2);
        ek(a2);
        if (d2 & 4 && null !== c2 && c2.memoizedState.isDehydrated) try {
          bd(b.containerInfo);
        } catch (t2) {
          W(a2, a2.return, t2);
        }
        break;
      case 4:
        ck(b, a2);
        ek(a2);
        break;
      case 13:
        ck(b, a2);
        ek(a2);
        e = a2.child;
        e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
        d2 & 4 && ak(a2);
        break;
      case 22:
        m2 = null !== c2 && null !== c2.memoizedState;
        a2.mode & 1 ? (U = (l2 = U) || m2, ck(b, a2), U = l2) : ck(b, a2);
        ek(a2);
        if (d2 & 8192) {
          l2 = null !== a2.memoizedState;
          if ((a2.stateNode.isHidden = l2) && !m2 && 0 !== (a2.mode & 1)) for (V$1 = a2, m2 = a2.child; null !== m2; ) {
            for (q2 = V$1 = m2; null !== V$1; ) {
              r2 = V$1;
              y2 = r2.child;
              switch (r2.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Pj(4, r2, r2.return);
                  break;
                case 1:
                  Lj(r2, r2.return);
                  var n2 = r2.stateNode;
                  if ("function" === typeof n2.componentWillUnmount) {
                    d2 = r2;
                    c2 = r2.return;
                    try {
                      b = d2, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                    } catch (t2) {
                      W(d2, c2, t2);
                    }
                  }
                  break;
                case 5:
                  Lj(r2, r2.return);
                  break;
                case 22:
                  if (null !== r2.memoizedState) {
                    gk(q2);
                    continue;
                  }
              }
              null !== y2 ? (y2.return = r2, V$1 = y2) : gk(q2);
            }
            m2 = m2.sibling;
          }
          a: for (m2 = null, q2 = a2; ; ) {
            if (5 === q2.tag) {
              if (null === m2) {
                m2 = q2;
                try {
                  e = q2.stateNode, l2 ? (f2 = e.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k2 = q2.memoizedProps.style, g2 = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h.style.display = rb("display", g2));
                } catch (t2) {
                  W(a2, a2.return, t2);
                }
              }
            } else if (6 === q2.tag) {
              if (null === m2) try {
                q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
              } catch (t2) {
                W(a2, a2.return, t2);
              }
            } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a2) && null !== q2.child) {
              q2.child.return = q2;
              q2 = q2.child;
              continue;
            }
            if (q2 === a2) break a;
            for (; null === q2.sibling; ) {
              if (null === q2.return || q2.return === a2) break a;
              m2 === q2 && (m2 = null);
              q2 = q2.return;
            }
            m2 === q2 && (m2 = null);
            q2.sibling.return = q2.return;
            q2 = q2.sibling;
          }
        }
        break;
      case 19:
        ck(b, a2);
        ek(a2);
        d2 & 4 && ak(a2);
        break;
      case 21:
        break;
      default:
        ck(
          b,
          a2
        ), ek(a2);
    }
  }
  function ek(a2) {
    var b = a2.flags;
    if (b & 2) {
      try {
        a: {
          for (var c2 = a2.return; null !== c2; ) {
            if (Tj(c2)) {
              var d2 = c2;
              break a;
            }
            c2 = c2.return;
          }
          throw Error(p$1(160));
        }
        switch (d2.tag) {
          case 5:
            var e = d2.stateNode;
            d2.flags & 32 && (ob(e, ""), d2.flags &= -33);
            var f2 = Uj(a2);
            Wj(a2, f2, e);
            break;
          case 3:
          case 4:
            var g2 = d2.stateNode.containerInfo, h = Uj(a2);
            Vj(a2, h, g2);
            break;
          default:
            throw Error(p$1(161));
        }
      } catch (k2) {
        W(a2, a2.return, k2);
      }
      a2.flags &= -3;
    }
    b & 4096 && (a2.flags &= -4097);
  }
  function hk(a2, b, c2) {
    V$1 = a2;
    ik(a2);
  }
  function ik(a2, b, c2) {
    for (var d2 = 0 !== (a2.mode & 1); null !== V$1; ) {
      var e = V$1, f2 = e.child;
      if (22 === e.tag && d2) {
        var g2 = null !== e.memoizedState || Jj;
        if (!g2) {
          var h = e.alternate, k2 = null !== h && null !== h.memoizedState || U;
          h = Jj;
          var l2 = U;
          Jj = g2;
          if ((U = k2) && !l2) for (V$1 = e; null !== V$1; ) g2 = V$1, k2 = g2.child, 22 === g2.tag && null !== g2.memoizedState ? jk(e) : null !== k2 ? (k2.return = g2, V$1 = k2) : jk(e);
          for (; null !== f2; ) V$1 = f2, ik(f2), f2 = f2.sibling;
          V$1 = e;
          Jj = h;
          U = l2;
        }
        kk(a2);
      } else 0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, V$1 = f2) : kk(a2);
    }
  }
  function kk(a2) {
    for (; null !== V$1; ) {
      var b = V$1;
      if (0 !== (b.flags & 8772)) {
        var c2 = b.alternate;
        try {
          if (0 !== (b.flags & 8772)) switch (b.tag) {
            case 0:
            case 11:
            case 15:
              U || Qj(5, b);
              break;
            case 1:
              var d2 = b.stateNode;
              if (b.flags & 4 && !U) if (null === c2) d2.componentDidMount();
              else {
                var e = b.elementType === b.type ? c2.memoizedProps : Ci(b.type, c2.memoizedProps);
                d2.componentDidUpdate(e, c2.memoizedState, d2.__reactInternalSnapshotBeforeUpdate);
              }
              var f2 = b.updateQueue;
              null !== f2 && sh(b, f2, d2);
              break;
            case 3:
              var g2 = b.updateQueue;
              if (null !== g2) {
                c2 = null;
                if (null !== b.child) switch (b.child.tag) {
                  case 5:
                    c2 = b.child.stateNode;
                    break;
                  case 1:
                    c2 = b.child.stateNode;
                }
                sh(b, g2, c2);
              }
              break;
            case 5:
              var h = b.stateNode;
              if (null === c2 && b.flags & 4) {
                c2 = h;
                var k2 = b.memoizedProps;
                switch (b.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    k2.autoFocus && c2.focus();
                    break;
                  case "img":
                    k2.src && (c2.src = k2.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (null === b.memoizedState) {
                var l2 = b.alternate;
                if (null !== l2) {
                  var m2 = l2.memoizedState;
                  if (null !== m2) {
                    var q2 = m2.dehydrated;
                    null !== q2 && bd(q2);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(p$1(163));
          }
          U || b.flags & 512 && Rj(b);
        } catch (r2) {
          W(b, b.return, r2);
        }
      }
      if (b === a2) {
        V$1 = null;
        break;
      }
      c2 = b.sibling;
      if (null !== c2) {
        c2.return = b.return;
        V$1 = c2;
        break;
      }
      V$1 = b.return;
    }
  }
  function gk(a2) {
    for (; null !== V$1; ) {
      var b = V$1;
      if (b === a2) {
        V$1 = null;
        break;
      }
      var c2 = b.sibling;
      if (null !== c2) {
        c2.return = b.return;
        V$1 = c2;
        break;
      }
      V$1 = b.return;
    }
  }
  function jk(a2) {
    for (; null !== V$1; ) {
      var b = V$1;
      try {
        switch (b.tag) {
          case 0:
          case 11:
          case 15:
            var c2 = b.return;
            try {
              Qj(4, b);
            } catch (k2) {
              W(b, c2, k2);
            }
            break;
          case 1:
            var d2 = b.stateNode;
            if ("function" === typeof d2.componentDidMount) {
              var e = b.return;
              try {
                d2.componentDidMount();
              } catch (k2) {
                W(b, e, k2);
              }
            }
            var f2 = b.return;
            try {
              Rj(b);
            } catch (k2) {
              W(b, f2, k2);
            }
            break;
          case 5:
            var g2 = b.return;
            try {
              Rj(b);
            } catch (k2) {
              W(b, g2, k2);
            }
        }
      } catch (k2) {
        W(b, b.return, k2);
      }
      if (b === a2) {
        V$1 = null;
        break;
      }
      var h = b.sibling;
      if (null !== h) {
        h.return = b.return;
        V$1 = h;
        break;
      }
      V$1 = b.return;
    }
  }
  var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T$1 = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
  function R() {
    return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
  }
  function yi(a2) {
    if (0 === (a2.mode & 1)) return 1;
    if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
    if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
    a2 = C;
    if (0 !== a2) return a2;
    a2 = window.event;
    a2 = void 0 === a2 ? 16 : jd(a2.type);
    return a2;
  }
  function gi(a2, b, c2, d2) {
    if (50 < yk) throw yk = 0, zk = null, Error(p$1(185));
    Ac(a2, c2, d2);
    if (0 === (K & 2) || a2 !== Q) a2 === Q && (0 === (K & 2) && (qk |= c2), 4 === T$1 && Ck(a2, Z)), Dk(a2, d2), 1 === c2 && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
  }
  function Dk(a2, b) {
    var c2 = a2.callbackNode;
    wc(a2, b);
    var d2 = uc(a2, a2 === Q ? Z : 0);
    if (0 === d2) null !== c2 && bc(c2), a2.callbackNode = null, a2.callbackPriority = 0;
    else if (b = d2 & -d2, a2.callbackPriority !== b) {
      null != c2 && bc(c2);
      if (1 === b) 0 === a2.tag ? ig(Ek.bind(null, a2)) : hg(Ek.bind(null, a2)), Jf(function() {
        0 === (K & 6) && jg();
      }), c2 = null;
      else {
        switch (Dc(d2)) {
          case 1:
            c2 = fc;
            break;
          case 4:
            c2 = gc;
            break;
          case 16:
            c2 = hc;
            break;
          case 536870912:
            c2 = jc;
            break;
          default:
            c2 = hc;
        }
        c2 = Fk(c2, Gk.bind(null, a2));
      }
      a2.callbackPriority = b;
      a2.callbackNode = c2;
    }
  }
  function Gk(a2, b) {
    Ak = -1;
    Bk = 0;
    if (0 !== (K & 6)) throw Error(p$1(327));
    var c2 = a2.callbackNode;
    if (Hk() && a2.callbackNode !== c2) return null;
    var d2 = uc(a2, a2 === Q ? Z : 0);
    if (0 === d2) return null;
    if (0 !== (d2 & 30) || 0 !== (d2 & a2.expiredLanes) || b) b = Ik(a2, d2);
    else {
      b = d2;
      var e = K;
      K |= 2;
      var f2 = Jk();
      if (Q !== a2 || Z !== b) uk = null, Gj = B() + 500, Kk(a2, b);
      do
        try {
          Lk();
          break;
        } catch (h) {
          Mk(a2, h);
        }
      while (1);
      $g();
      mk.current = f2;
      K = e;
      null !== Y ? b = 0 : (Q = null, Z = 0, b = T$1);
    }
    if (0 !== b) {
      2 === b && (e = xc(a2), 0 !== e && (d2 = e, b = Nk(a2, e)));
      if (1 === b) throw c2 = pk, Kk(a2, 0), Ck(a2, d2), Dk(a2, B()), c2;
      if (6 === b) Ck(a2, d2);
      else {
        e = a2.current.alternate;
        if (0 === (d2 & 30) && !Ok(e) && (b = Ik(a2, d2), 2 === b && (f2 = xc(a2), 0 !== f2 && (d2 = f2, b = Nk(a2, f2))), 1 === b)) throw c2 = pk, Kk(a2, 0), Ck(a2, d2), Dk(a2, B()), c2;
        a2.finishedWork = e;
        a2.finishedLanes = d2;
        switch (b) {
          case 0:
          case 1:
            throw Error(p$1(345));
          case 2:
            Pk(a2, tk, uk);
            break;
          case 3:
            Ck(a2, d2);
            if ((d2 & 130023424) === d2 && (b = fk + 500 - B(), 10 < b)) {
              if (0 !== uc(a2, 0)) break;
              e = a2.suspendedLanes;
              if ((e & d2) !== d2) {
                R();
                a2.pingedLanes |= a2.suspendedLanes & e;
                break;
              }
              a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), b);
              break;
            }
            Pk(a2, tk, uk);
            break;
          case 4:
            Ck(a2, d2);
            if ((d2 & 4194240) === d2) break;
            b = a2.eventTimes;
            for (e = -1; 0 < d2; ) {
              var g2 = 31 - oc(d2);
              f2 = 1 << g2;
              g2 = b[g2];
              g2 > e && (e = g2);
              d2 &= ~f2;
            }
            d2 = e;
            d2 = B() - d2;
            d2 = (120 > d2 ? 120 : 480 > d2 ? 480 : 1080 > d2 ? 1080 : 1920 > d2 ? 1920 : 3e3 > d2 ? 3e3 : 4320 > d2 ? 4320 : 1960 * lk(d2 / 1960)) - d2;
            if (10 < d2) {
              a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), d2);
              break;
            }
            Pk(a2, tk, uk);
            break;
          case 5:
            Pk(a2, tk, uk);
            break;
          default:
            throw Error(p$1(329));
        }
      }
    }
    Dk(a2, B());
    return a2.callbackNode === c2 ? Gk.bind(null, a2) : null;
  }
  function Nk(a2, b) {
    var c2 = sk;
    a2.current.memoizedState.isDehydrated && (Kk(a2, b).flags |= 256);
    a2 = Ik(a2, b);
    2 !== a2 && (b = tk, tk = c2, null !== b && Fj(b));
    return a2;
  }
  function Fj(a2) {
    null === tk ? tk = a2 : tk.push.apply(tk, a2);
  }
  function Ok(a2) {
    for (var b = a2; ; ) {
      if (b.flags & 16384) {
        var c2 = b.updateQueue;
        if (null !== c2 && (c2 = c2.stores, null !== c2)) for (var d2 = 0; d2 < c2.length; d2++) {
          var e = c2[d2], f2 = e.getSnapshot;
          e = e.value;
          try {
            if (!He(f2(), e)) return false;
          } catch (g2) {
            return false;
          }
        }
      }
      c2 = b.child;
      if (b.subtreeFlags & 16384 && null !== c2) c2.return = b, b = c2;
      else {
        if (b === a2) break;
        for (; null === b.sibling; ) {
          if (null === b.return || b.return === a2) return true;
          b = b.return;
        }
        b.sibling.return = b.return;
        b = b.sibling;
      }
    }
    return true;
  }
  function Ck(a2, b) {
    b &= ~rk;
    b &= ~qk;
    a2.suspendedLanes |= b;
    a2.pingedLanes &= ~b;
    for (a2 = a2.expirationTimes; 0 < b; ) {
      var c2 = 31 - oc(b), d2 = 1 << c2;
      a2[c2] = -1;
      b &= ~d2;
    }
  }
  function Ek(a2) {
    if (0 !== (K & 6)) throw Error(p$1(327));
    Hk();
    var b = uc(a2, 0);
    if (0 === (b & 1)) return Dk(a2, B()), null;
    var c2 = Ik(a2, b);
    if (0 !== a2.tag && 2 === c2) {
      var d2 = xc(a2);
      0 !== d2 && (b = d2, c2 = Nk(a2, d2));
    }
    if (1 === c2) throw c2 = pk, Kk(a2, 0), Ck(a2, b), Dk(a2, B()), c2;
    if (6 === c2) throw Error(p$1(345));
    a2.finishedWork = a2.current.alternate;
    a2.finishedLanes = b;
    Pk(a2, tk, uk);
    Dk(a2, B());
    return null;
  }
  function Qk(a2, b) {
    var c2 = K;
    K |= 1;
    try {
      return a2(b);
    } finally {
      K = c2, 0 === K && (Gj = B() + 500, fg && jg());
    }
  }
  function Rk(a2) {
    null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
    var b = K;
    K |= 1;
    var c2 = ok.transition, d2 = C;
    try {
      if (ok.transition = null, C = 1, a2) return a2();
    } finally {
      C = d2, ok.transition = c2, K = b, 0 === (K & 6) && jg();
    }
  }
  function Hj() {
    fj = ej.current;
    E$1(ej);
  }
  function Kk(a2, b) {
    a2.finishedWork = null;
    a2.finishedLanes = 0;
    var c2 = a2.timeoutHandle;
    -1 !== c2 && (a2.timeoutHandle = -1, Gf(c2));
    if (null !== Y) for (c2 = Y.return; null !== c2; ) {
      var d2 = c2;
      wg(d2);
      switch (d2.tag) {
        case 1:
          d2 = d2.type.childContextTypes;
          null !== d2 && void 0 !== d2 && $f();
          break;
        case 3:
          zh();
          E$1(Wf);
          E$1(H);
          Eh();
          break;
        case 5:
          Bh(d2);
          break;
        case 4:
          zh();
          break;
        case 13:
          E$1(L$1);
          break;
        case 19:
          E$1(L$1);
          break;
        case 10:
          ah(d2.type._context);
          break;
        case 22:
        case 23:
          Hj();
      }
      c2 = c2.return;
    }
    Q = a2;
    Y = a2 = Pg(a2.current, null);
    Z = fj = b;
    T$1 = 0;
    pk = null;
    rk = qk = rh = 0;
    tk = sk = null;
    if (null !== fh) {
      for (b = 0; b < fh.length; b++) if (c2 = fh[b], d2 = c2.interleaved, null !== d2) {
        c2.interleaved = null;
        var e = d2.next, f2 = c2.pending;
        if (null !== f2) {
          var g2 = f2.next;
          f2.next = e;
          d2.next = g2;
        }
        c2.pending = d2;
      }
      fh = null;
    }
    return a2;
  }
  function Mk(a2, b) {
    do {
      var c2 = Y;
      try {
        $g();
        Fh.current = Rh;
        if (Ih) {
          for (var d2 = M.memoizedState; null !== d2; ) {
            var e = d2.queue;
            null !== e && (e.pending = null);
            d2 = d2.next;
          }
          Ih = false;
        }
        Hh = 0;
        O = N$1 = M = null;
        Jh = false;
        Kh = 0;
        nk.current = null;
        if (null === c2 || null === c2.return) {
          T$1 = 1;
          pk = b;
          Y = null;
          break;
        }
        a: {
          var f2 = a2, g2 = c2.return, h = c2, k2 = b;
          b = Z;
          h.flags |= 32768;
          if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
            var l2 = k2, m2 = h, q2 = m2.tag;
            if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
              var r2 = m2.alternate;
              r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
            }
            var y2 = Ui(g2);
            if (null !== y2) {
              y2.flags &= -257;
              Vi(y2, g2, h, f2, b);
              y2.mode & 1 && Si(f2, l2, b);
              b = y2;
              k2 = l2;
              var n2 = b.updateQueue;
              if (null === n2) {
                var t2 = /* @__PURE__ */ new Set();
                t2.add(k2);
                b.updateQueue = t2;
              } else n2.add(k2);
              break a;
            } else {
              if (0 === (b & 1)) {
                Si(f2, l2, b);
                tj();
                break a;
              }
              k2 = Error(p$1(426));
            }
          } else if (I && h.mode & 1) {
            var J2 = Ui(g2);
            if (null !== J2) {
              0 === (J2.flags & 65536) && (J2.flags |= 256);
              Vi(J2, g2, h, f2, b);
              Jg(Ji(k2, h));
              break a;
            }
          }
          f2 = k2 = Ji(k2, h);
          4 !== T$1 && (T$1 = 2);
          null === sk ? sk = [f2] : sk.push(f2);
          f2 = g2;
          do {
            switch (f2.tag) {
              case 3:
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var x2 = Ni(f2, k2, b);
                ph(f2, x2);
                break a;
              case 1:
                h = k2;
                var w2 = f2.type, u2 = f2.stateNode;
                if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                  f2.flags |= 65536;
                  b &= -b;
                  f2.lanes |= b;
                  var F2 = Qi(f2, h, b);
                  ph(f2, F2);
                  break a;
                }
            }
            f2 = f2.return;
          } while (null !== f2);
        }
        Sk(c2);
      } catch (na) {
        b = na;
        Y === c2 && null !== c2 && (Y = c2 = c2.return);
        continue;
      }
      break;
    } while (1);
  }
  function Jk() {
    var a2 = mk.current;
    mk.current = Rh;
    return null === a2 ? Rh : a2;
  }
  function tj() {
    if (0 === T$1 || 3 === T$1 || 2 === T$1) T$1 = 4;
    null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
  }
  function Ik(a2, b) {
    var c2 = K;
    K |= 2;
    var d2 = Jk();
    if (Q !== a2 || Z !== b) uk = null, Kk(a2, b);
    do
      try {
        Tk();
        break;
      } catch (e) {
        Mk(a2, e);
      }
    while (1);
    $g();
    K = c2;
    mk.current = d2;
    if (null !== Y) throw Error(p$1(261));
    Q = null;
    Z = 0;
    return T$1;
  }
  function Tk() {
    for (; null !== Y; ) Uk(Y);
  }
  function Lk() {
    for (; null !== Y && !cc(); ) Uk(Y);
  }
  function Uk(a2) {
    var b = Vk(a2.alternate, a2, fj);
    a2.memoizedProps = a2.pendingProps;
    null === b ? Sk(a2) : Y = b;
    nk.current = null;
  }
  function Sk(a2) {
    var b = a2;
    do {
      var c2 = b.alternate;
      a2 = b.return;
      if (0 === (b.flags & 32768)) {
        if (c2 = Ej(c2, b, fj), null !== c2) {
          Y = c2;
          return;
        }
      } else {
        c2 = Ij(c2, b);
        if (null !== c2) {
          c2.flags &= 32767;
          Y = c2;
          return;
        }
        if (null !== a2) a2.flags |= 32768, a2.subtreeFlags = 0, a2.deletions = null;
        else {
          T$1 = 6;
          Y = null;
          return;
        }
      }
      b = b.sibling;
      if (null !== b) {
        Y = b;
        return;
      }
      Y = b = a2;
    } while (null !== b);
    0 === T$1 && (T$1 = 5);
  }
  function Pk(a2, b, c2) {
    var d2 = C, e = ok.transition;
    try {
      ok.transition = null, C = 1, Wk(a2, b, c2, d2);
    } finally {
      ok.transition = e, C = d2;
    }
    return null;
  }
  function Wk(a2, b, c2, d2) {
    do
      Hk();
    while (null !== wk);
    if (0 !== (K & 6)) throw Error(p$1(327));
    c2 = a2.finishedWork;
    var e = a2.finishedLanes;
    if (null === c2) return null;
    a2.finishedWork = null;
    a2.finishedLanes = 0;
    if (c2 === a2.current) throw Error(p$1(177));
    a2.callbackNode = null;
    a2.callbackPriority = 0;
    var f2 = c2.lanes | c2.childLanes;
    Bc(a2, f2);
    a2 === Q && (Y = Q = null, Z = 0);
    0 === (c2.subtreeFlags & 2064) && 0 === (c2.flags & 2064) || vk || (vk = true, Fk(hc, function() {
      Hk();
      return null;
    }));
    f2 = 0 !== (c2.flags & 15990);
    if (0 !== (c2.subtreeFlags & 15990) || f2) {
      f2 = ok.transition;
      ok.transition = null;
      var g2 = C;
      C = 1;
      var h = K;
      K |= 4;
      nk.current = null;
      Oj(a2, c2);
      dk(c2, a2);
      Oe(Df);
      dd = !!Cf;
      Df = Cf = null;
      a2.current = c2;
      hk(c2);
      dc();
      K = h;
      C = g2;
      ok.transition = f2;
    } else a2.current = c2;
    vk && (vk = false, wk = a2, xk = e);
    f2 = a2.pendingLanes;
    0 === f2 && (Ri = null);
    mc(c2.stateNode);
    Dk(a2, B());
    if (null !== b) for (d2 = a2.onRecoverableError, c2 = 0; c2 < b.length; c2++) e = b[c2], d2(e.value, { componentStack: e.stack, digest: e.digest });
    if (Oi) throw Oi = false, a2 = Pi, Pi = null, a2;
    0 !== (xk & 1) && 0 !== a2.tag && Hk();
    f2 = a2.pendingLanes;
    0 !== (f2 & 1) ? a2 === zk ? yk++ : (yk = 0, zk = a2) : yk = 0;
    jg();
    return null;
  }
  function Hk() {
    if (null !== wk) {
      var a2 = Dc(xk), b = ok.transition, c2 = C;
      try {
        ok.transition = null;
        C = 16 > a2 ? 16 : a2;
        if (null === wk) var d2 = false;
        else {
          a2 = wk;
          wk = null;
          xk = 0;
          if (0 !== (K & 6)) throw Error(p$1(331));
          var e = K;
          K |= 4;
          for (V$1 = a2.current; null !== V$1; ) {
            var f2 = V$1, g2 = f2.child;
            if (0 !== (V$1.flags & 16)) {
              var h = f2.deletions;
              if (null !== h) {
                for (var k2 = 0; k2 < h.length; k2++) {
                  var l2 = h[k2];
                  for (V$1 = l2; null !== V$1; ) {
                    var m2 = V$1;
                    switch (m2.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Pj(8, m2, f2);
                    }
                    var q2 = m2.child;
                    if (null !== q2) q2.return = m2, V$1 = q2;
                    else for (; null !== V$1; ) {
                      m2 = V$1;
                      var r2 = m2.sibling, y2 = m2.return;
                      Sj(m2);
                      if (m2 === l2) {
                        V$1 = null;
                        break;
                      }
                      if (null !== r2) {
                        r2.return = y2;
                        V$1 = r2;
                        break;
                      }
                      V$1 = y2;
                    }
                  }
                }
                var n2 = f2.alternate;
                if (null !== n2) {
                  var t2 = n2.child;
                  if (null !== t2) {
                    n2.child = null;
                    do {
                      var J2 = t2.sibling;
                      t2.sibling = null;
                      t2 = J2;
                    } while (null !== t2);
                  }
                }
                V$1 = f2;
              }
            }
            if (0 !== (f2.subtreeFlags & 2064) && null !== g2) g2.return = f2, V$1 = g2;
            else b: for (; null !== V$1; ) {
              f2 = V$1;
              if (0 !== (f2.flags & 2048)) switch (f2.tag) {
                case 0:
                case 11:
                case 15:
                  Pj(9, f2, f2.return);
              }
              var x2 = f2.sibling;
              if (null !== x2) {
                x2.return = f2.return;
                V$1 = x2;
                break b;
              }
              V$1 = f2.return;
            }
          }
          var w2 = a2.current;
          for (V$1 = w2; null !== V$1; ) {
            g2 = V$1;
            var u2 = g2.child;
            if (0 !== (g2.subtreeFlags & 2064) && null !== u2) u2.return = g2, V$1 = u2;
            else b: for (g2 = w2; null !== V$1; ) {
              h = V$1;
              if (0 !== (h.flags & 2048)) try {
                switch (h.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Qj(9, h);
                }
              } catch (na) {
                W(h, h.return, na);
              }
              if (h === g2) {
                V$1 = null;
                break b;
              }
              var F2 = h.sibling;
              if (null !== F2) {
                F2.return = h.return;
                V$1 = F2;
                break b;
              }
              V$1 = h.return;
            }
          }
          K = e;
          jg();
          if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
            lc.onPostCommitFiberRoot(kc, a2);
          } catch (na) {
          }
          d2 = true;
        }
        return d2;
      } finally {
        C = c2, ok.transition = b;
      }
    }
    return false;
  }
  function Xk(a2, b, c2) {
    b = Ji(c2, b);
    b = Ni(a2, b, 1);
    a2 = nh(a2, b, 1);
    b = R();
    null !== a2 && (Ac(a2, 1, b), Dk(a2, b));
  }
  function W(a2, b, c2) {
    if (3 === a2.tag) Xk(a2, a2, c2);
    else for (; null !== b; ) {
      if (3 === b.tag) {
        Xk(b, a2, c2);
        break;
      } else if (1 === b.tag) {
        var d2 = b.stateNode;
        if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d2.componentDidCatch && (null === Ri || !Ri.has(d2))) {
          a2 = Ji(c2, a2);
          a2 = Qi(b, a2, 1);
          b = nh(b, a2, 1);
          a2 = R();
          null !== b && (Ac(b, 1, a2), Dk(b, a2));
          break;
        }
      }
      b = b.return;
    }
  }
  function Ti(a2, b, c2) {
    var d2 = a2.pingCache;
    null !== d2 && d2.delete(b);
    b = R();
    a2.pingedLanes |= a2.suspendedLanes & c2;
    Q === a2 && (Z & c2) === c2 && (4 === T$1 || 3 === T$1 && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a2, 0) : rk |= c2);
    Dk(a2, b);
  }
  function Yk(a2, b) {
    0 === b && (0 === (a2.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
    var c2 = R();
    a2 = ih(a2, b);
    null !== a2 && (Ac(a2, b, c2), Dk(a2, c2));
  }
  function uj(a2) {
    var b = a2.memoizedState, c2 = 0;
    null !== b && (c2 = b.retryLane);
    Yk(a2, c2);
  }
  function bk(a2, b) {
    var c2 = 0;
    switch (a2.tag) {
      case 13:
        var d2 = a2.stateNode;
        var e = a2.memoizedState;
        null !== e && (c2 = e.retryLane);
        break;
      case 19:
        d2 = a2.stateNode;
        break;
      default:
        throw Error(p$1(314));
    }
    null !== d2 && d2.delete(b);
    Yk(a2, c2);
  }
  var Vk;
  Vk = function(a2, b, c2) {
    if (null !== a2) if (a2.memoizedProps !== b.pendingProps || Wf.current) dh = true;
    else {
      if (0 === (a2.lanes & c2) && 0 === (b.flags & 128)) return dh = false, yj(a2, b, c2);
      dh = 0 !== (a2.flags & 131072) ? true : false;
    }
    else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
    b.lanes = 0;
    switch (b.tag) {
      case 2:
        var d2 = b.type;
        ij(a2, b);
        a2 = b.pendingProps;
        var e = Yf(b, H.current);
        ch(b, c2);
        e = Nh(null, b, d2, a2, e, c2);
        var f2 = Sh();
        b.flags |= 1;
        "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d2) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d2, a2, c2), b = jj(null, b, d2, true, f2, c2)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e, c2), b = b.child);
        return b;
      case 16:
        d2 = b.elementType;
        a: {
          ij(a2, b);
          a2 = b.pendingProps;
          e = d2._init;
          d2 = e(d2._payload);
          b.type = d2;
          e = b.tag = Zk(d2);
          a2 = Ci(d2, a2);
          switch (e) {
            case 0:
              b = cj(null, b, d2, a2, c2);
              break a;
            case 1:
              b = hj(null, b, d2, a2, c2);
              break a;
            case 11:
              b = Yi(null, b, d2, a2, c2);
              break a;
            case 14:
              b = $i(null, b, d2, Ci(d2.type, a2), c2);
              break a;
          }
          throw Error(p$1(
            306,
            d2,
            ""
          ));
        }
        return b;
      case 0:
        return d2 = b.type, e = b.pendingProps, e = b.elementType === d2 ? e : Ci(d2, e), cj(a2, b, d2, e, c2);
      case 1:
        return d2 = b.type, e = b.pendingProps, e = b.elementType === d2 ? e : Ci(d2, e), hj(a2, b, d2, e, c2);
      case 3:
        a: {
          kj(b);
          if (null === a2) throw Error(p$1(387));
          d2 = b.pendingProps;
          f2 = b.memoizedState;
          e = f2.element;
          lh(a2, b);
          qh(b, d2, null, c2);
          var g2 = b.memoizedState;
          d2 = g2.element;
          if (f2.isDehydrated) if (f2 = { element: d2, isDehydrated: false, cache: g2.cache, pendingSuspenseBoundaries: g2.pendingSuspenseBoundaries, transitions: g2.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
            e = Ji(Error(p$1(423)), b);
            b = lj(a2, b, d2, c2, e);
            break a;
          } else if (d2 !== e) {
            e = Ji(Error(p$1(424)), b);
            b = lj(a2, b, d2, c2, e);
            break a;
          } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c2 = Vg(b, null, d2, c2), b.child = c2; c2; ) c2.flags = c2.flags & -3 | 4096, c2 = c2.sibling;
          else {
            Ig();
            if (d2 === e) {
              b = Zi(a2, b, c2);
              break a;
            }
            Xi(a2, b, d2, c2);
          }
          b = b.child;
        }
        return b;
      case 5:
        return Ah(b), null === a2 && Eg(b), d2 = b.type, e = b.pendingProps, f2 = null !== a2 ? a2.memoizedProps : null, g2 = e.children, Ef(d2, e) ? g2 = null : null !== f2 && Ef(d2, f2) && (b.flags |= 32), gj(a2, b), Xi(a2, b, g2, c2), b.child;
      case 6:
        return null === a2 && Eg(b), null;
      case 13:
        return oj(a2, b, c2);
      case 4:
        return yh(b, b.stateNode.containerInfo), d2 = b.pendingProps, null === a2 ? b.child = Ug(b, null, d2, c2) : Xi(a2, b, d2, c2), b.child;
      case 11:
        return d2 = b.type, e = b.pendingProps, e = b.elementType === d2 ? e : Ci(d2, e), Yi(a2, b, d2, e, c2);
      case 7:
        return Xi(a2, b, b.pendingProps, c2), b.child;
      case 8:
        return Xi(a2, b, b.pendingProps.children, c2), b.child;
      case 12:
        return Xi(a2, b, b.pendingProps.children, c2), b.child;
      case 10:
        a: {
          d2 = b.type._context;
          e = b.pendingProps;
          f2 = b.memoizedProps;
          g2 = e.value;
          G(Wg, d2._currentValue);
          d2._currentValue = g2;
          if (null !== f2) if (He(f2.value, g2)) {
            if (f2.children === e.children && !Wf.current) {
              b = Zi(a2, b, c2);
              break a;
            }
          } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
            var h = f2.dependencies;
            if (null !== h) {
              g2 = f2.child;
              for (var k2 = h.firstContext; null !== k2; ) {
                if (k2.context === d2) {
                  if (1 === f2.tag) {
                    k2 = mh(-1, c2 & -c2);
                    k2.tag = 2;
                    var l2 = f2.updateQueue;
                    if (null !== l2) {
                      l2 = l2.shared;
                      var m2 = l2.pending;
                      null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                      l2.pending = k2;
                    }
                  }
                  f2.lanes |= c2;
                  k2 = f2.alternate;
                  null !== k2 && (k2.lanes |= c2);
                  bh(
                    f2.return,
                    c2,
                    b
                  );
                  h.lanes |= c2;
                  break;
                }
                k2 = k2.next;
              }
            } else if (10 === f2.tag) g2 = f2.type === b.type ? null : f2.child;
            else if (18 === f2.tag) {
              g2 = f2.return;
              if (null === g2) throw Error(p$1(341));
              g2.lanes |= c2;
              h = g2.alternate;
              null !== h && (h.lanes |= c2);
              bh(g2, c2, b);
              g2 = f2.sibling;
            } else g2 = f2.child;
            if (null !== g2) g2.return = f2;
            else for (g2 = f2; null !== g2; ) {
              if (g2 === b) {
                g2 = null;
                break;
              }
              f2 = g2.sibling;
              if (null !== f2) {
                f2.return = g2.return;
                g2 = f2;
                break;
              }
              g2 = g2.return;
            }
            f2 = g2;
          }
          Xi(a2, b, e.children, c2);
          b = b.child;
        }
        return b;
      case 9:
        return e = b.type, d2 = b.pendingProps.children, ch(b, c2), e = eh(e), d2 = d2(e), b.flags |= 1, Xi(a2, b, d2, c2), b.child;
      case 14:
        return d2 = b.type, e = Ci(d2, b.pendingProps), e = Ci(d2.type, e), $i(a2, b, d2, e, c2);
      case 15:
        return bj(a2, b, b.type, b.pendingProps, c2);
      case 17:
        return d2 = b.type, e = b.pendingProps, e = b.elementType === d2 ? e : Ci(d2, e), ij(a2, b), b.tag = 1, Zf(d2) ? (a2 = true, cg(b)) : a2 = false, ch(b, c2), Gi(b, d2, e), Ii(b, d2, e, c2), jj(null, b, d2, true, a2, c2);
      case 19:
        return xj(a2, b, c2);
      case 22:
        return dj(a2, b, c2);
    }
    throw Error(p$1(156, b.tag));
  };
  function Fk(a2, b) {
    return ac(a2, b);
  }
  function $k(a2, b, c2, d2) {
    this.tag = a2;
    this.key = c2;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.ref = null;
    this.pendingProps = b;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = d2;
    this.subtreeFlags = this.flags = 0;
    this.deletions = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function Bg(a2, b, c2, d2) {
    return new $k(a2, b, c2, d2);
  }
  function aj(a2) {
    a2 = a2.prototype;
    return !(!a2 || !a2.isReactComponent);
  }
  function Zk(a2) {
    if ("function" === typeof a2) return aj(a2) ? 1 : 0;
    if (void 0 !== a2 && null !== a2) {
      a2 = a2.$$typeof;
      if (a2 === Da) return 11;
      if (a2 === Ga) return 14;
    }
    return 2;
  }
  function Pg(a2, b) {
    var c2 = a2.alternate;
    null === c2 ? (c2 = Bg(a2.tag, b, a2.key, a2.mode), c2.elementType = a2.elementType, c2.type = a2.type, c2.stateNode = a2.stateNode, c2.alternate = a2, a2.alternate = c2) : (c2.pendingProps = b, c2.type = a2.type, c2.flags = 0, c2.subtreeFlags = 0, c2.deletions = null);
    c2.flags = a2.flags & 14680064;
    c2.childLanes = a2.childLanes;
    c2.lanes = a2.lanes;
    c2.child = a2.child;
    c2.memoizedProps = a2.memoizedProps;
    c2.memoizedState = a2.memoizedState;
    c2.updateQueue = a2.updateQueue;
    b = a2.dependencies;
    c2.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
    c2.sibling = a2.sibling;
    c2.index = a2.index;
    c2.ref = a2.ref;
    return c2;
  }
  function Rg(a2, b, c2, d2, e, f2) {
    var g2 = 2;
    d2 = a2;
    if ("function" === typeof a2) aj(a2) && (g2 = 1);
    else if ("string" === typeof a2) g2 = 5;
    else a: switch (a2) {
      case ya:
        return Tg(c2.children, e, f2, b);
      case za:
        g2 = 8;
        e |= 8;
        break;
      case Aa:
        return a2 = Bg(12, c2, b, e | 2), a2.elementType = Aa, a2.lanes = f2, a2;
      case Ea:
        return a2 = Bg(13, c2, b, e), a2.elementType = Ea, a2.lanes = f2, a2;
      case Fa:
        return a2 = Bg(19, c2, b, e), a2.elementType = Fa, a2.lanes = f2, a2;
      case Ia:
        return pj(c2, e, f2, b);
      default:
        if ("object" === typeof a2 && null !== a2) switch (a2.$$typeof) {
          case Ba:
            g2 = 10;
            break a;
          case Ca:
            g2 = 9;
            break a;
          case Da:
            g2 = 11;
            break a;
          case Ga:
            g2 = 14;
            break a;
          case Ha:
            g2 = 16;
            d2 = null;
            break a;
        }
        throw Error(p$1(130, null == a2 ? a2 : typeof a2, ""));
    }
    b = Bg(g2, c2, b, e);
    b.elementType = a2;
    b.type = d2;
    b.lanes = f2;
    return b;
  }
  function Tg(a2, b, c2, d2) {
    a2 = Bg(7, a2, d2, b);
    a2.lanes = c2;
    return a2;
  }
  function pj(a2, b, c2, d2) {
    a2 = Bg(22, a2, d2, b);
    a2.elementType = Ia;
    a2.lanes = c2;
    a2.stateNode = { isHidden: false };
    return a2;
  }
  function Qg(a2, b, c2) {
    a2 = Bg(6, a2, null, b);
    a2.lanes = c2;
    return a2;
  }
  function Sg(a2, b, c2) {
    b = Bg(4, null !== a2.children ? a2.children : [], a2.key, b);
    b.lanes = c2;
    b.stateNode = { containerInfo: a2.containerInfo, pendingChildren: null, implementation: a2.implementation };
    return b;
  }
  function al(a2, b, c2, d2, e) {
    this.tag = b;
    this.containerInfo = a2;
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = -1;
    this.callbackNode = this.pendingContext = this.context = null;
    this.callbackPriority = 0;
    this.eventTimes = zc(0);
    this.expirationTimes = zc(-1);
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = zc(0);
    this.identifierPrefix = d2;
    this.onRecoverableError = e;
    this.mutableSourceEagerHydrationData = null;
  }
  function bl(a2, b, c2, d2, e, f2, g2, h, k2) {
    a2 = new al(a2, b, c2, h, k2);
    1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
    f2 = Bg(3, null, null, b);
    a2.current = f2;
    f2.stateNode = a2;
    f2.memoizedState = { element: d2, isDehydrated: c2, cache: null, transitions: null, pendingSuspenseBoundaries: null };
    kh(f2);
    return a2;
  }
  function cl(a2, b, c2) {
    var d2 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return { $$typeof: wa, key: null == d2 ? null : "" + d2, children: a2, containerInfo: b, implementation: c2 };
  }
  function dl(a2) {
    if (!a2) return Vf;
    a2 = a2._reactInternals;
    a: {
      if (Vb(a2) !== a2 || 1 !== a2.tag) throw Error(p$1(170));
      var b = a2;
      do {
        switch (b.tag) {
          case 3:
            b = b.stateNode.context;
            break a;
          case 1:
            if (Zf(b.type)) {
              b = b.stateNode.__reactInternalMemoizedMergedChildContext;
              break a;
            }
        }
        b = b.return;
      } while (null !== b);
      throw Error(p$1(171));
    }
    if (1 === a2.tag) {
      var c2 = a2.type;
      if (Zf(c2)) return bg(a2, c2, b);
    }
    return b;
  }
  function el(a2, b, c2, d2, e, f2, g2, h, k2) {
    a2 = bl(c2, d2, true, a2, e, f2, g2, h, k2);
    a2.context = dl(null);
    c2 = a2.current;
    d2 = R();
    e = yi(c2);
    f2 = mh(d2, e);
    f2.callback = void 0 !== b && null !== b ? b : null;
    nh(c2, f2, e);
    a2.current.lanes = e;
    Ac(a2, e, d2);
    Dk(a2, d2);
    return a2;
  }
  function fl(a2, b, c2, d2) {
    var e = b.current, f2 = R(), g2 = yi(e);
    c2 = dl(c2);
    null === b.context ? b.context = c2 : b.pendingContext = c2;
    b = mh(f2, g2);
    b.payload = { element: a2 };
    d2 = void 0 === d2 ? null : d2;
    null !== d2 && (b.callback = d2);
    a2 = nh(e, b, g2);
    null !== a2 && (gi(a2, e, g2, f2), oh(a2, e, g2));
    return g2;
  }
  function gl(a2) {
    a2 = a2.current;
    if (!a2.child) return null;
    switch (a2.child.tag) {
      case 5:
        return a2.child.stateNode;
      default:
        return a2.child.stateNode;
    }
  }
  function hl(a2, b) {
    a2 = a2.memoizedState;
    if (null !== a2 && null !== a2.dehydrated) {
      var c2 = a2.retryLane;
      a2.retryLane = 0 !== c2 && c2 < b ? c2 : b;
    }
  }
  function il(a2, b) {
    hl(a2, b);
    (a2 = a2.alternate) && hl(a2, b);
  }
  function jl() {
    return null;
  }
  var kl = "function" === typeof reportError ? reportError : function(a2) {
    console.error(a2);
  };
  function ll(a2) {
    this._internalRoot = a2;
  }
  ml.prototype.render = ll.prototype.render = function(a2) {
    var b = this._internalRoot;
    if (null === b) throw Error(p$1(409));
    fl(a2, b, null, null);
  };
  ml.prototype.unmount = ll.prototype.unmount = function() {
    var a2 = this._internalRoot;
    if (null !== a2) {
      this._internalRoot = null;
      var b = a2.containerInfo;
      Rk(function() {
        fl(null, a2, null, null);
      });
      b[uf] = null;
    }
  };
  function ml(a2) {
    this._internalRoot = a2;
  }
  ml.prototype.unstable_scheduleHydration = function(a2) {
    if (a2) {
      var b = Hc();
      a2 = { blockedOn: null, target: a2, priority: b };
      for (var c2 = 0; c2 < Qc.length && 0 !== b && b < Qc[c2].priority; c2++) ;
      Qc.splice(c2, 0, a2);
      0 === c2 && Vc(a2);
    }
  };
  function nl(a2) {
    return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType);
  }
  function ol(a2) {
    return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType && (8 !== a2.nodeType || " react-mount-point-unstable " !== a2.nodeValue));
  }
  function pl() {
  }
  function ql(a2, b, c2, d2, e) {
    if (e) {
      if ("function" === typeof d2) {
        var f2 = d2;
        d2 = function() {
          var a3 = gl(g2);
          f2.call(a3);
        };
      }
      var g2 = el(b, d2, a2, 0, null, false, false, "", pl);
      a2._reactRootContainer = g2;
      a2[uf] = g2.current;
      sf(8 === a2.nodeType ? a2.parentNode : a2);
      Rk();
      return g2;
    }
    for (; e = a2.lastChild; ) a2.removeChild(e);
    if ("function" === typeof d2) {
      var h = d2;
      d2 = function() {
        var a3 = gl(k2);
        h.call(a3);
      };
    }
    var k2 = bl(a2, 0, false, null, null, false, false, "", pl);
    a2._reactRootContainer = k2;
    a2[uf] = k2.current;
    sf(8 === a2.nodeType ? a2.parentNode : a2);
    Rk(function() {
      fl(b, k2, c2, d2);
    });
    return k2;
  }
  function rl(a2, b, c2, d2, e) {
    var f2 = c2._reactRootContainer;
    if (f2) {
      var g2 = f2;
      if ("function" === typeof e) {
        var h = e;
        e = function() {
          var a3 = gl(g2);
          h.call(a3);
        };
      }
      fl(b, g2, a2, e);
    } else g2 = ql(c2, b, a2, e, d2);
    return gl(g2);
  }
  Ec = function(a2) {
    switch (a2.tag) {
      case 3:
        var b = a2.stateNode;
        if (b.current.memoizedState.isDehydrated) {
          var c2 = tc(b.pendingLanes);
          0 !== c2 && (Cc(b, c2 | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
        }
        break;
      case 13:
        Rk(function() {
          var b2 = ih(a2, 1);
          if (null !== b2) {
            var c3 = R();
            gi(b2, a2, 1, c3);
          }
        }), il(a2, 1);
    }
  };
  Fc = function(a2) {
    if (13 === a2.tag) {
      var b = ih(a2, 134217728);
      if (null !== b) {
        var c2 = R();
        gi(b, a2, 134217728, c2);
      }
      il(a2, 134217728);
    }
  };
  Gc = function(a2) {
    if (13 === a2.tag) {
      var b = yi(a2), c2 = ih(a2, b);
      if (null !== c2) {
        var d2 = R();
        gi(c2, a2, b, d2);
      }
      il(a2, b);
    }
  };
  Hc = function() {
    return C;
  };
  Ic = function(a2, b) {
    var c2 = C;
    try {
      return C = a2, b();
    } finally {
      C = c2;
    }
  };
  yb = function(a2, b, c2) {
    switch (b) {
      case "input":
        bb(a2, c2);
        b = c2.name;
        if ("radio" === c2.type && null != b) {
          for (c2 = a2; c2.parentNode; ) c2 = c2.parentNode;
          c2 = c2.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
          for (b = 0; b < c2.length; b++) {
            var d2 = c2[b];
            if (d2 !== a2 && d2.form === a2.form) {
              var e = Db(d2);
              if (!e) throw Error(p$1(90));
              Wa(d2);
              bb(d2, e);
            }
          }
        }
        break;
      case "textarea":
        ib(a2, c2);
        break;
      case "select":
        b = c2.value, null != b && fb(a2, !!c2.multiple, b, false);
    }
  };
  Gb = Qk;
  Hb = Rk;
  var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
  var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a2) {
    a2 = Zb(a2);
    return null === a2 ? null : a2.stateNode;
  }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
    var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vl.isDisabled && vl.supportsFiber) try {
      kc = vl.inject(ul), lc = vl;
    } catch (a2) {
    }
  }
  reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
  reactDom_production_min.createPortal = function(a2, b) {
    var c2 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!nl(b)) throw Error(p$1(200));
    return cl(a2, b, null, c2);
  };
  reactDom_production_min.createRoot = function(a2, b) {
    if (!nl(a2)) throw Error(p$1(299));
    var c2 = false, d2 = "", e = kl;
    null !== b && void 0 !== b && (true === b.unstable_strictMode && (c2 = true), void 0 !== b.identifierPrefix && (d2 = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
    b = bl(a2, 1, false, null, null, c2, false, d2, e);
    a2[uf] = b.current;
    sf(8 === a2.nodeType ? a2.parentNode : a2);
    return new ll(b);
  };
  reactDom_production_min.findDOMNode = function(a2) {
    if (null == a2) return null;
    if (1 === a2.nodeType) return a2;
    var b = a2._reactInternals;
    if (void 0 === b) {
      if ("function" === typeof a2.render) throw Error(p$1(188));
      a2 = Object.keys(a2).join(",");
      throw Error(p$1(268, a2));
    }
    a2 = Zb(b);
    a2 = null === a2 ? null : a2.stateNode;
    return a2;
  };
  reactDom_production_min.flushSync = function(a2) {
    return Rk(a2);
  };
  reactDom_production_min.hydrate = function(a2, b, c2) {
    if (!ol(b)) throw Error(p$1(200));
    return rl(null, a2, b, true, c2);
  };
  reactDom_production_min.hydrateRoot = function(a2, b, c2) {
    if (!nl(a2)) throw Error(p$1(405));
    var d2 = null != c2 && c2.hydratedSources || null, e = false, f2 = "", g2 = kl;
    null !== c2 && void 0 !== c2 && (true === c2.unstable_strictMode && (e = true), void 0 !== c2.identifierPrefix && (f2 = c2.identifierPrefix), void 0 !== c2.onRecoverableError && (g2 = c2.onRecoverableError));
    b = el(b, null, a2, 1, null != c2 ? c2 : null, e, false, f2, g2);
    a2[uf] = b.current;
    sf(a2);
    if (d2) for (a2 = 0; a2 < d2.length; a2++) c2 = d2[a2], e = c2._getVersion, e = e(c2._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c2, e] : b.mutableSourceEagerHydrationData.push(
      c2,
      e
    );
    return new ml(b);
  };
  reactDom_production_min.render = function(a2, b, c2) {
    if (!ol(b)) throw Error(p$1(200));
    return rl(null, a2, b, false, c2);
  };
  reactDom_production_min.unmountComponentAtNode = function(a2) {
    if (!ol(a2)) throw Error(p$1(40));
    return a2._reactRootContainer ? (Rk(function() {
      rl(null, null, a2, false, function() {
        a2._reactRootContainer = null;
        a2[uf] = null;
      });
    }), true) : false;
  };
  reactDom_production_min.unstable_batchedUpdates = Qk;
  reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a2, b, c2, d2) {
    if (!ol(c2)) throw Error(p$1(200));
    if (null == a2 || void 0 === a2._reactInternals) throw Error(p$1(38));
    return rl(a2, b, c2, false, d2);
  };
  reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    reactDom.exports = reactDom_production_min;
  }
  var reactDomExports = reactDom.exports;
  const ReactDOM = /* @__PURE__ */ getDefaultExportFromCjs(reactDomExports);
  var createRoot;
  var m$1 = reactDomExports;
  {
    createRoot = m$1.createRoot;
    m$1.hydrateRoot;
  }
  var x = Object.defineProperty;
  var N = (t2, e, n2) => e in t2 ? x(t2, e, { enumerable: true, configurable: true, writable: true, value: n2 }) : t2[e] = n2;
  var y = (t2, e, n2) => N(t2, typeof e != "symbol" ? e + "" : e, n2);
  const P = {
    stringify: (t2) => t2 ? "true" : "false",
    parse: (t2) => /^[ty1-9]/i.test(t2)
  }, T = {
    stringify: (t2) => t2.name,
    parse: (t2, e, n2) => {
      const a2 = (() => {
        if (typeof window < "u" && t2 in window)
          return window[t2];
        if (typeof global < "u" && t2 in global)
          return global[t2];
      })();
      return typeof a2 == "function" ? a2.bind(n2) : void 0;
    }
  }, V = {
    stringify: (t2) => JSON.stringify(t2),
    parse: (t2) => JSON.parse(t2)
  }, E = {
    stringify: (t2) => `${t2}`,
    parse: (t2) => parseFloat(t2)
  }, L = {
    stringify: (t2) => t2,
    parse: (t2) => t2
  }, A = {
    string: L,
    number: E,
    boolean: P,
    function: T,
    json: V
  };
  function $(t2) {
    return t2.replace(
      /([a-z0-9])([A-Z])/g,
      (e, n2, a2) => `${n2}-${a2.toLowerCase()}`
    );
  }
  const d = Symbol.for("r2wc.render"), g = Symbol.for("r2wc.connected"), l$1 = Symbol.for("r2wc.context"), c = Symbol.for("r2wc.props");
  function _(t2, e, n2) {
    var C2, O2, j;
    e.props || (e.props = t2.propTypes ? Object.keys(t2.propTypes) : []), e.events || (e.events = []);
    const a2 = Array.isArray(e.props) ? e.props.slice() : Object.keys(e.props), v2 = Array.isArray(e.events) ? e.events.slice() : Object.keys(e.events), h = {}, S2 = {}, m2 = {}, w2 = {};
    for (const s2 of a2) {
      h[s2] = Array.isArray(e.props) ? "string" : e.props[s2];
      const u2 = $(s2);
      m2[s2] = u2, w2[u2] = s2;
    }
    for (const s2 of v2)
      S2[s2] = Array.isArray(e.events) ? {} : e.events[s2];
    class k2 extends HTMLElement {
      constructor() {
        super();
        y(this, j, true);
        y(this, O2);
        y(this, C2, {});
        y(this, "container");
        e.shadow ? this.container = this.attachShadow({
          mode: e.shadow
        }) : this.container = this, this[c].container = this.container;
        for (const r2 of a2) {
          const p2 = m2[r2], o = this.getAttribute(p2), i2 = h[r2], f2 = i2 ? A[i2] : null;
          f2 != null && f2.parse && o && (this[c][r2] = f2.parse(o, p2, this));
        }
        for (const r2 of v2)
          this[c][r2] = (p2) => {
            const o = r2.replace(/^on/, "").toLowerCase();
            this.dispatchEvent(
              new CustomEvent(o, { detail: p2, ...S2[r2] })
            );
          };
      }
      static get observedAttributes() {
        return Object.keys(w2);
      }
      connectedCallback() {
        this[g] = true, this[d]();
      }
      disconnectedCallback() {
        this[g] = false, this[l$1] && n2.unmount(this[l$1]), delete this[l$1];
      }
      attributeChangedCallback(r2, p2, o) {
        const i2 = w2[r2], f2 = h[i2], b = f2 ? A[f2] : null;
        i2 in h && (b != null && b.parse) && o && (this[c][i2] = b.parse(o, r2, this), this[d]());
      }
      [(j = g, O2 = l$1, C2 = c, d)]() {
        this[g] && (this[l$1] ? n2.update(this[l$1], this[c]) : this[l$1] = n2.mount(
          this.container,
          t2,
          this[c]
        ));
      }
    }
    for (const s2 of a2) {
      const u2 = m2[s2], r2 = h[s2];
      Object.defineProperty(k2.prototype, s2, {
        enumerable: true,
        configurable: true,
        get() {
          return this[c][s2];
        },
        set(p2) {
          this[c][s2] = p2;
          const o = r2 ? A[r2] : null;
          if (o != null && o.stringify) {
            const i2 = o.stringify(p2, u2, this);
            this.getAttribute(u2) !== i2 && this.setAttribute(u2, i2);
          } else
            this[d]();
        }
      });
    }
    return k2;
  }
  function f$1(t2, e, r2) {
    const n2 = createRoot(t2), u2 = React2.createElement(e, r2);
    return n2.render(u2), {
      root: n2,
      ReactComponent: e
    };
  }
  function i({ root: t2, ReactComponent: e }, r2) {
    const n2 = React2.createElement(e, r2);
    t2.render(n2);
  }
  function a({ root: t2 }) {
    t2.unmount();
  }
  function s(t2, e = {}) {
    return _(t2, e, { mount: f$1, update: i, unmount: a });
  }
  var jsxRuntime = { exports: {} };
  var reactJsxRuntime_production_min = {};
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
  function q(c2, a2, g2) {
    var b, d2 = {}, e = null, h = null;
    void 0 !== g2 && (e = "" + g2);
    void 0 !== a2.key && (e = "" + a2.key);
    void 0 !== a2.ref && (h = a2.ref);
    for (b in a2) m.call(a2, b) && !p.hasOwnProperty(b) && (d2[b] = a2[b]);
    if (c2 && c2.defaultProps) for (b in a2 = c2.defaultProps, a2) void 0 === d2[b] && (d2[b] = a2[b]);
    return { $$typeof: k, type: c2, key: e, ref: h, props: d2, _owner: n.current };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  {
    jsxRuntime.exports = reactJsxRuntime_production_min;
  }
  var jsxRuntimeExports = jsxRuntime.exports;
  const LayoutGroupContext = reactExports.createContext({});
  function useConstant(init) {
    const ref = reactExports.useRef(null);
    if (ref.current === null) {
      ref.current = init();
    }
    return ref.current;
  }
  const PresenceContext = reactExports.createContext(null);
  const MotionConfigContext = reactExports.createContext({
    transformPagePoint: (p2) => p2,
    isStatic: false,
    reducedMotion: "never"
  });
  class PopChildMeasure extends reactExports.Component {
    getSnapshotBeforeUpdate(prevProps) {
      const element = this.props.childRef.current;
      if (element && prevProps.isPresent && !this.props.isPresent) {
        const size = this.props.sizeRef.current;
        size.height = element.offsetHeight || 0;
        size.width = element.offsetWidth || 0;
        size.top = element.offsetTop;
        size.left = element.offsetLeft;
      }
      return null;
    }
    /**
     * Required with getSnapshotBeforeUpdate to stop React complaining.
     */
    componentDidUpdate() {
    }
    render() {
      return this.props.children;
    }
  }
  function PopChild({ children, isPresent }) {
    const id2 = reactExports.useId();
    const ref = reactExports.useRef(null);
    const size = reactExports.useRef({
      width: 0,
      height: 0,
      top: 0,
      left: 0
    });
    const { nonce } = reactExports.useContext(MotionConfigContext);
    reactExports.useInsertionEffect(() => {
      const { width, height, top, left } = size.current;
      if (isPresent || !ref.current || !width || !height)
        return;
      ref.current.dataset.motionPopId = id2;
      const style = document.createElement("style");
      if (nonce)
        style.nonce = nonce;
      document.head.appendChild(style);
      if (style.sheet) {
        style.sheet.insertRule(`
          [data-motion-pop-id="${id2}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            top: ${top}px !important;
            left: ${left}px !important;
          }
        `);
      }
      return () => {
        document.head.removeChild(style);
      };
    }, [isPresent]);
    return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, children: reactExports.cloneElement(children, { ref }) });
  }
  const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode }) => {
    const presenceChildren = useConstant(newChildrenMap);
    const id2 = reactExports.useId();
    const memoizedOnExitComplete = reactExports.useCallback((childId) => {
      presenceChildren.set(childId, true);
      for (const isComplete of presenceChildren.values()) {
        if (!isComplete)
          return;
      }
      onExitComplete && onExitComplete();
    }, [presenceChildren, onExitComplete]);
    const context = reactExports.useMemo(
      () => ({
        id: id2,
        initial,
        isPresent,
        custom,
        onExitComplete: memoizedOnExitComplete,
        register: (childId) => {
          presenceChildren.set(childId, false);
          return () => presenceChildren.delete(childId);
        }
      }),
      /**
       * If the presence of a child affects the layout of the components around it,
       * we want to make a new context value to ensure they get re-rendered
       * so they can detect that layout change.
       */
      presenceAffectsLayout ? [Math.random(), memoizedOnExitComplete] : [isPresent, memoizedOnExitComplete]
    );
    reactExports.useMemo(() => {
      presenceChildren.forEach((_2, key) => presenceChildren.set(key, false));
    }, [isPresent]);
    reactExports.useEffect(() => {
      !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
    }, [isPresent]);
    if (mode === "popLayout") {
      children = jsxRuntimeExports.jsx(PopChild, { isPresent, children });
    }
    return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
  };
  function newChildrenMap() {
    return /* @__PURE__ */ new Map();
  }
  function usePresence$1(subscribe = true) {
    const context = reactExports.useContext(PresenceContext);
    if (context === null)
      return [true, null];
    const { isPresent, onExitComplete, register } = context;
    const id2 = reactExports.useId();
    reactExports.useEffect(() => {
      if (subscribe)
        register(id2);
    }, [subscribe]);
    const safeToRemove = reactExports.useCallback(() => subscribe && onExitComplete && onExitComplete(id2), [id2, onExitComplete, subscribe]);
    return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
  }
  const getChildKey = (child) => child.key || "";
  function onlyElements(children) {
    const filtered = [];
    reactExports.Children.forEach(children, (child) => {
      if (reactExports.isValidElement(child))
        filtered.push(child);
    });
    return filtered;
  }
  const isBrowser = typeof window !== "undefined";
  const useIsomorphicLayoutEffect$1 = isBrowser ? reactExports.useLayoutEffect : reactExports.useEffect;
  const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false }) => {
    const [isParentPresent, safeToRemove] = usePresence$1(propagate);
    const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
    const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
    const isInitialRender = reactExports.useRef(true);
    const pendingPresentChildren = reactExports.useRef(presentChildren);
    const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
    const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
    const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
    useIsomorphicLayoutEffect$1(() => {
      isInitialRender.current = false;
      pendingPresentChildren.current = presentChildren;
      for (let i2 = 0; i2 < renderedChildren.length; i2++) {
        const key = getChildKey(renderedChildren[i2]);
        if (!presentKeys.includes(key)) {
          if (exitComplete.get(key) !== true) {
            exitComplete.set(key, false);
          }
        } else {
          exitComplete.delete(key);
        }
      }
    }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
    const exitingChildren = [];
    if (presentChildren !== diffedChildren) {
      let nextChildren = [...presentChildren];
      for (let i2 = 0; i2 < renderedChildren.length; i2++) {
        const child = renderedChildren[i2];
        const key = getChildKey(child);
        if (!presentKeys.includes(key)) {
          nextChildren.splice(i2, 0, child);
          exitingChildren.push(child);
        }
      }
      if (mode === "wait" && exitingChildren.length) {
        nextChildren = exitingChildren;
      }
      setRenderedChildren(onlyElements(nextChildren));
      setDiffedChildren(presentChildren);
      return;
    }
    const { forceRender } = reactExports.useContext(LayoutGroupContext);
    return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
      const key = getChildKey(child);
      const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
      const onExit = () => {
        if (exitComplete.has(key)) {
          exitComplete.set(key, true);
        } else {
          return;
        }
        let isEveryExitComplete = true;
        exitComplete.forEach((isExitComplete) => {
          if (!isExitComplete)
            isEveryExitComplete = false;
        });
        if (isEveryExitComplete) {
          forceRender === null || forceRender === void 0 ? void 0 : forceRender();
          setRenderedChildren(pendingPresentChildren.current);
          propagate && (safeToRemove === null || safeToRemove === void 0 ? void 0 : safeToRemove());
          onExitComplete && onExitComplete();
        }
      };
      return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom: isPresent ? void 0 : custom, presenceAffectsLayout, mode, onExitComplete: isPresent ? void 0 : onExit, children: child }, key);
    }) });
  };
  const noop = /* @__NO_SIDE_EFFECTS__ */ (any) => any;
  let invariant = noop;
  // @__NO_SIDE_EFFECTS__
  function memo(callback) {
    let result;
    return () => {
      if (result === void 0)
        result = callback();
      return result;
    };
  }
  const progress = /* @__NO_SIDE_EFFECTS__ */ (from, to, value) => {
    const toFromDifference = to - from;
    return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
  };
  const secondsToMilliseconds = /* @__NO_SIDE_EFFECTS__ */ (seconds) => seconds * 1e3;
  const millisecondsToSeconds = /* @__NO_SIDE_EFFECTS__ */ (milliseconds) => milliseconds / 1e3;
  const MotionGlobalConfig = {
    useManualTiming: false
  };
  function createRenderStep(runNextFrame) {
    let thisFrame = /* @__PURE__ */ new Set();
    let nextFrame = /* @__PURE__ */ new Set();
    let isProcessing = false;
    let flushNextFrame = false;
    const toKeepAlive = /* @__PURE__ */ new WeakSet();
    let latestFrameData = {
      delta: 0,
      timestamp: 0,
      isProcessing: false
    };
    function triggerCallback(callback) {
      if (toKeepAlive.has(callback)) {
        step.schedule(callback);
        runNextFrame();
      }
      callback(latestFrameData);
    }
    const step = {
      /**
       * Schedule a process to run on the next frame.
       */
      schedule: (callback, keepAlive = false, immediate = false) => {
        const addToCurrentFrame = immediate && isProcessing;
        const queue = addToCurrentFrame ? thisFrame : nextFrame;
        if (keepAlive)
          toKeepAlive.add(callback);
        if (!queue.has(callback))
          queue.add(callback);
        return callback;
      },
      /**
       * Cancel the provided callback from running on the next frame.
       */
      cancel: (callback) => {
        nextFrame.delete(callback);
        toKeepAlive.delete(callback);
      },
      /**
       * Execute all schedule callbacks.
       */
      process: (frameData2) => {
        latestFrameData = frameData2;
        if (isProcessing) {
          flushNextFrame = true;
          return;
        }
        isProcessing = true;
        [thisFrame, nextFrame] = [nextFrame, thisFrame];
        thisFrame.forEach(triggerCallback);
        thisFrame.clear();
        isProcessing = false;
        if (flushNextFrame) {
          flushNextFrame = false;
          step.process(frameData2);
        }
      }
    };
    return step;
  }
  const stepsOrder = [
    "read",
    // Read
    "resolveKeyframes",
    // Write/Read/Write/Read
    "update",
    // Compute
    "preRender",
    // Compute
    "render",
    // Write
    "postRender"
    // Compute
  ];
  const maxElapsed = 40;
  function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
    let runNextFrame = false;
    let useDefaultElapsed = true;
    const state = {
      delta: 0,
      timestamp: 0,
      isProcessing: false
    };
    const flagRunNextFrame = () => runNextFrame = true;
    const steps = stepsOrder.reduce((acc, key) => {
      acc[key] = createRenderStep(flagRunNextFrame);
      return acc;
    }, {});
    const { read, resolveKeyframes, update, preRender, render, postRender } = steps;
    const processBatch = () => {
      const timestamp = performance.now();
      runNextFrame = false;
      state.delta = useDefaultElapsed ? 1e3 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
      state.timestamp = timestamp;
      state.isProcessing = true;
      read.process(state);
      resolveKeyframes.process(state);
      update.process(state);
      preRender.process(state);
      render.process(state);
      postRender.process(state);
      state.isProcessing = false;
      if (runNextFrame && allowKeepAlive) {
        useDefaultElapsed = false;
        scheduleNextBatch(processBatch);
      }
    };
    const wake = () => {
      runNextFrame = true;
      useDefaultElapsed = true;
      if (!state.isProcessing) {
        scheduleNextBatch(processBatch);
      }
    };
    const schedule = stepsOrder.reduce((acc, key) => {
      const step = steps[key];
      acc[key] = (process, keepAlive = false, immediate = false) => {
        if (!runNextFrame)
          wake();
        return step.schedule(process, keepAlive, immediate);
      };
      return acc;
    }, {});
    const cancel = (process) => {
      for (let i2 = 0; i2 < stepsOrder.length; i2++) {
        steps[stepsOrder[i2]].cancel(process);
      }
    };
    return { schedule, cancel, state, steps };
  }
  const { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps } = createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop, true);
  const LazyContext = reactExports.createContext({ strict: false });
  const featureProps = {
    animation: [
      "animate",
      "variants",
      "whileHover",
      "whileTap",
      "exit",
      "whileInView",
      "whileFocus",
      "whileDrag"
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"]
  };
  const featureDefinitions = {};
  for (const key in featureProps) {
    featureDefinitions[key] = {
      isEnabled: (props) => featureProps[key].some((name) => !!props[name])
    };
  }
  function loadFeatures(features) {
    for (const key in features) {
      featureDefinitions[key] = {
        ...featureDefinitions[key],
        ...features[key]
      };
    }
  }
  const validMotionProps = /* @__PURE__ */ new Set([
    "animate",
    "exit",
    "variants",
    "initial",
    "style",
    "values",
    "variants",
    "transition",
    "transformTemplate",
    "custom",
    "inherit",
    "onBeforeLayoutMeasure",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onMeasureDragConstraints",
    "onDirectionLock",
    "onDragTransitionEnd",
    "_dragX",
    "_dragY",
    "onHoverStart",
    "onHoverEnd",
    "onViewportEnter",
    "onViewportLeave",
    "globalTapTarget",
    "ignoreStrict",
    "viewport"
  ]);
  function isValidMotionProp(key) {
    return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || key.startsWith("onLayout") || validMotionProps.has(key);
  }
  let shouldForward = (key) => !isValidMotionProp(key);
  function loadExternalIsValidProp(isValidProp) {
    if (!isValidProp)
      return;
    shouldForward = (key) => key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
  }
  try {
    loadExternalIsValidProp(require("@emotion/is-prop-valid").default);
  } catch (_a) {
  }
  function filterProps(props, isDom, forwardMotionProps) {
    const filteredProps = {};
    for (const key in props) {
      if (key === "values" && typeof props.values === "object")
        continue;
      if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || // If trying to use native HTML drag events, forward drag listeners
      props["draggable"] && key.startsWith("onDrag")) {
        filteredProps[key] = props[key];
      }
    }
    return filteredProps;
  }
  function createDOMMotionComponentProxy(componentFactory) {
    if (typeof Proxy === "undefined") {
      return componentFactory;
    }
    const componentCache = /* @__PURE__ */ new Map();
    const deprecatedFactoryFunction = (...args) => {
      return componentFactory(...args);
    };
    return new Proxy(deprecatedFactoryFunction, {
      /**
       * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
       * The prop name is passed through as `key` and we can use that to generate a `motion`
       * DOM component with that name.
       */
      get: (_target, key) => {
        if (key === "create")
          return componentFactory;
        if (!componentCache.has(key)) {
          componentCache.set(key, componentFactory(key));
        }
        return componentCache.get(key);
      }
    });
  }
  const MotionContext = reactExports.createContext({});
  function isVariantLabel(v2) {
    return typeof v2 === "string" || Array.isArray(v2);
  }
  function isAnimationControls(v2) {
    return v2 !== null && typeof v2 === "object" && typeof v2.start === "function";
  }
  const variantPriorityOrder = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit"
  ];
  const variantProps = ["initial", ...variantPriorityOrder];
  function isControllingVariants(props) {
    return isAnimationControls(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
  }
  function isVariantNode(props) {
    return Boolean(isControllingVariants(props) || props.variants);
  }
  function getCurrentTreeVariants(props, context) {
    if (isControllingVariants(props)) {
      const { initial, animate } = props;
      return {
        initial: initial === false || isVariantLabel(initial) ? initial : void 0,
        animate: isVariantLabel(animate) ? animate : void 0
      };
    }
    return props.inherit !== false ? context : {};
  }
  function useCreateMotionContext(props) {
    const { initial, animate } = getCurrentTreeVariants(props, reactExports.useContext(MotionContext));
    return reactExports.useMemo(() => ({ initial, animate }), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)]);
  }
  function variantLabelsAsDependency(prop) {
    return Array.isArray(prop) ? prop.join(" ") : prop;
  }
  const motionComponentSymbol = Symbol.for("motionComponentSymbol");
  function isRefObject(ref) {
    return ref && typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
  }
  function useMotionRef(visualState, visualElement, externalRef) {
    return reactExports.useCallback(
      (instance) => {
        if (instance) {
          visualState.onMount && visualState.onMount(instance);
        }
        if (visualElement) {
          if (instance) {
            visualElement.mount(instance);
          } else {
            visualElement.unmount();
          }
        }
        if (externalRef) {
          if (typeof externalRef === "function") {
            externalRef(instance);
          } else if (isRefObject(externalRef)) {
            externalRef.current = instance;
          }
        }
      },
      /**
       * Only pass a new ref callback to React if we've received a visual element
       * factory. Otherwise we'll be mounting/remounting every time externalRef
       * or other dependencies change.
       */
      [visualElement]
    );
  }
  const camelToDash = (str) => str.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase();
  const optimizedAppearDataId = "framerAppearId";
  const optimizedAppearDataAttribute = "data-" + camelToDash(optimizedAppearDataId);
  const { schedule: microtask } = createRenderBatcher(queueMicrotask, false);
  const SwitchLayoutGroupContext = reactExports.createContext({});
  function useVisualElement(Component, visualState, props, createVisualElement, ProjectionNodeConstructor) {
    var _a, _b;
    const { visualElement: parent } = reactExports.useContext(MotionContext);
    const lazyContext = reactExports.useContext(LazyContext);
    const presenceContext = reactExports.useContext(PresenceContext);
    const reducedMotionConfig = reactExports.useContext(MotionConfigContext).reducedMotion;
    const visualElementRef = reactExports.useRef(null);
    createVisualElement = createVisualElement || lazyContext.renderer;
    if (!visualElementRef.current && createVisualElement) {
      visualElementRef.current = createVisualElement(Component, {
        visualState,
        parent,
        props,
        presenceContext,
        blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
        reducedMotionConfig
      });
    }
    const visualElement = visualElementRef.current;
    const initialLayoutGroupConfig = reactExports.useContext(SwitchLayoutGroupContext);
    if (visualElement && !visualElement.projection && ProjectionNodeConstructor && (visualElement.type === "html" || visualElement.type === "svg")) {
      createProjectionNode$1(visualElementRef.current, props, ProjectionNodeConstructor, initialLayoutGroupConfig);
    }
    const isMounted = reactExports.useRef(false);
    reactExports.useInsertionEffect(() => {
      if (visualElement && isMounted.current) {
        visualElement.update(props, presenceContext);
      }
    });
    const optimisedAppearId = props[optimizedAppearDataAttribute];
    const wantsHandoff = reactExports.useRef(Boolean(optimisedAppearId) && !((_a = window.MotionHandoffIsComplete) === null || _a === void 0 ? void 0 : _a.call(window, optimisedAppearId)) && ((_b = window.MotionHasOptimisedAnimation) === null || _b === void 0 ? void 0 : _b.call(window, optimisedAppearId)));
    useIsomorphicLayoutEffect$1(() => {
      if (!visualElement)
        return;
      isMounted.current = true;
      window.MotionIsMounted = true;
      visualElement.updateFeatures();
      microtask.render(visualElement.render);
      if (wantsHandoff.current && visualElement.animationState) {
        visualElement.animationState.animateChanges();
      }
    });
    reactExports.useEffect(() => {
      if (!visualElement)
        return;
      if (!wantsHandoff.current && visualElement.animationState) {
        visualElement.animationState.animateChanges();
      }
      if (wantsHandoff.current) {
        queueMicrotask(() => {
          var _a2;
          (_a2 = window.MotionHandoffMarkAsComplete) === null || _a2 === void 0 ? void 0 : _a2.call(window, optimisedAppearId);
        });
        wantsHandoff.current = false;
      }
    });
    return visualElement;
  }
  function createProjectionNode$1(visualElement, props, ProjectionNodeConstructor, initialPromotionConfig) {
    const { layoutId, layout: layout2, drag: drag2, dragConstraints, layoutScroll, layoutRoot } = props;
    visualElement.projection = new ProjectionNodeConstructor(visualElement.latestValues, props["data-framer-portal-id"] ? void 0 : getClosestProjectingNode(visualElement.parent));
    visualElement.projection.setOptions({
      layoutId,
      layout: layout2,
      alwaysMeasureLayout: Boolean(drag2) || dragConstraints && isRefObject(dragConstraints),
      visualElement,
      /**
       * TODO: Update options in an effect. This could be tricky as it'll be too late
       * to update by the time layout animations run.
       * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
       * ensuring it gets called if there's no potential layout animations.
       *
       */
      animationType: typeof layout2 === "string" ? layout2 : "both",
      initialPromotionConfig,
      layoutScroll,
      layoutRoot
    });
  }
  function getClosestProjectingNode(visualElement) {
    if (!visualElement)
      return void 0;
    return visualElement.options.allowProjection !== false ? visualElement.projection : getClosestProjectingNode(visualElement.parent);
  }
  function createRendererMotionComponent({ preloadedFeatures, createVisualElement, useRender, useVisualState, Component }) {
    var _a, _b;
    preloadedFeatures && loadFeatures(preloadedFeatures);
    function MotionComponent(props, externalRef) {
      let MeasureLayout2;
      const configAndProps = {
        ...reactExports.useContext(MotionConfigContext),
        ...props,
        layoutId: useLayoutId(props)
      };
      const { isStatic } = configAndProps;
      const context = useCreateMotionContext(props);
      const visualState = useVisualState(props, isStatic);
      if (!isStatic && isBrowser) {
        useStrictMode();
        const layoutProjection = getProjectionFunctionality(configAndProps);
        MeasureLayout2 = layoutProjection.MeasureLayout;
        context.visualElement = useVisualElement(Component, visualState, configAndProps, createVisualElement, layoutProjection.ProjectionNode);
      }
      return jsxRuntimeExports.jsxs(MotionContext.Provider, { value: context, children: [MeasureLayout2 && context.visualElement ? jsxRuntimeExports.jsx(MeasureLayout2, { visualElement: context.visualElement, ...configAndProps }) : null, useRender(Component, props, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, context.visualElement)] });
    }
    MotionComponent.displayName = `motion.${typeof Component === "string" ? Component : `create(${(_b = (_a = Component.displayName) !== null && _a !== void 0 ? _a : Component.name) !== null && _b !== void 0 ? _b : ""})`}`;
    const ForwardRefMotionComponent = reactExports.forwardRef(MotionComponent);
    ForwardRefMotionComponent[motionComponentSymbol] = Component;
    return ForwardRefMotionComponent;
  }
  function useLayoutId({ layoutId }) {
    const layoutGroupId = reactExports.useContext(LayoutGroupContext).id;
    return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
  }
  function useStrictMode(configAndProps, preloadedFeatures) {
    reactExports.useContext(LazyContext).strict;
  }
  function getProjectionFunctionality(props) {
    const { drag: drag2, layout: layout2 } = featureDefinitions;
    if (!drag2 && !layout2)
      return {};
    const combined = { ...drag2, ...layout2 };
    return {
      MeasureLayout: (drag2 === null || drag2 === void 0 ? void 0 : drag2.isEnabled(props)) || (layout2 === null || layout2 === void 0 ? void 0 : layout2.isEnabled(props)) ? combined.MeasureLayout : void 0,
      ProjectionNode: combined.ProjectionNode
    };
  }
  const lowercaseSVGElements = [
    "animate",
    "circle",
    "defs",
    "desc",
    "ellipse",
    "g",
    "image",
    "line",
    "filter",
    "marker",
    "mask",
    "metadata",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "rect",
    "stop",
    "switch",
    "symbol",
    "svg",
    "text",
    "tspan",
    "use",
    "view"
  ];
  function isSVGComponent(Component) {
    if (
      /**
       * If it's not a string, it's a custom React component. Currently we only support
       * HTML custom React components.
       */
      typeof Component !== "string" || /**
       * If it contains a dash, the element is a custom HTML webcomponent.
       */
      Component.includes("-")
    ) {
      return false;
    } else if (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      lowercaseSVGElements.indexOf(Component) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(Component)
    ) {
      return true;
    }
    return false;
  }
  function getValueState(visualElement) {
    const state = [{}, {}];
    visualElement === null || visualElement === void 0 ? void 0 : visualElement.values.forEach((value, key) => {
      state[0][key] = value.get();
      state[1][key] = value.getVelocity();
    });
    return state;
  }
  function resolveVariantFromProps(props, definition, custom, visualElement) {
    if (typeof definition === "function") {
      const [current, velocity] = getValueState(visualElement);
      definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
    }
    if (typeof definition === "string") {
      definition = props.variants && props.variants[definition];
    }
    if (typeof definition === "function") {
      const [current, velocity] = getValueState(visualElement);
      definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
    }
    return definition;
  }
  const isKeyframesTarget = (v2) => {
    return Array.isArray(v2);
  };
  const isCustomValue = (v2) => {
    return Boolean(v2 && typeof v2 === "object" && v2.mix && v2.toValue);
  };
  const resolveFinalValueInKeyframes = (v2) => {
    return isKeyframesTarget(v2) ? v2[v2.length - 1] || 0 : v2;
  };
  const isMotionValue = (value) => Boolean(value && value.getVelocity);
  function resolveMotionValue(value) {
    const unwrappedValue = isMotionValue(value) ? value.get() : value;
    return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
  }
  function makeState({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2, createRenderState, onUpdate }, props, context, presenceContext) {
    const state = {
      latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps2),
      renderState: createRenderState()
    };
    if (onUpdate) {
      state.onMount = (instance) => onUpdate({ props, current: instance, ...state });
      state.onUpdate = (visualElement) => onUpdate(visualElement);
    }
    return state;
  }
  const makeUseVisualState = (config) => (props, isStatic) => {
    const context = reactExports.useContext(MotionContext);
    const presenceContext = reactExports.useContext(PresenceContext);
    const make = () => makeState(config, props, context, presenceContext);
    return isStatic ? make() : useConstant(make);
  };
  function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
    const values = {};
    const motionValues = scrapeMotionValues(props, {});
    for (const key in motionValues) {
      values[key] = resolveMotionValue(motionValues[key]);
    }
    let { initial, animate } = props;
    const isControllingVariants$1 = isControllingVariants(props);
    const isVariantNode$1 = isVariantNode(props);
    if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
      if (initial === void 0)
        initial = context.initial;
      if (animate === void 0)
        animate = context.animate;
    }
    let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
    isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
    const variantToSet = isInitialAnimationBlocked ? animate : initial;
    if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
      const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
      for (let i2 = 0; i2 < list.length; i2++) {
        const resolved = resolveVariantFromProps(props, list[i2]);
        if (resolved) {
          const { transitionEnd, transition, ...target } = resolved;
          for (const key in target) {
            let valueTarget = target[key];
            if (Array.isArray(valueTarget)) {
              const index = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
              valueTarget = valueTarget[index];
            }
            if (valueTarget !== null) {
              values[key] = valueTarget;
            }
          }
          for (const key in transitionEnd) {
            values[key] = transitionEnd[key];
          }
        }
      }
    }
    return values;
  }
  const transformPropOrder = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY"
  ];
  const transformProps = new Set(transformPropOrder);
  const checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
  const isCSSVariableName = /* @__PURE__ */ checkStringStartsWith("--");
  const startsAsVariableToken = /* @__PURE__ */ checkStringStartsWith("var(--");
  const isCSSVariableToken = (value) => {
    const startsWithToken = startsAsVariableToken(value);
    if (!startsWithToken)
      return false;
    return singleCssVariableRegex.test(value.split("/*")[0].trim());
  };
  const singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
  const getValueAsType = (value, type) => {
    return type && typeof value === "number" ? type.transform(value) : value;
  };
  const clamp = (min, max, v2) => {
    if (v2 > max)
      return max;
    if (v2 < min)
      return min;
    return v2;
  };
  const number = {
    test: (v2) => typeof v2 === "number",
    parse: parseFloat,
    transform: (v2) => v2
  };
  const alpha = {
    ...number,
    transform: (v2) => clamp(0, 1, v2)
  };
  const scale = {
    ...number,
    default: 1
  };
  const createUnitType = (unit) => ({
    test: (v2) => typeof v2 === "string" && v2.endsWith(unit) && v2.split(" ").length === 1,
    parse: parseFloat,
    transform: (v2) => `${v2}${unit}`
  });
  const degrees = /* @__PURE__ */ createUnitType("deg");
  const percent = /* @__PURE__ */ createUnitType("%");
  const px = /* @__PURE__ */ createUnitType("px");
  const vh = /* @__PURE__ */ createUnitType("vh");
  const vw = /* @__PURE__ */ createUnitType("vw");
  const progressPercentage = {
    ...percent,
    parse: (v2) => percent.parse(v2) / 100,
    transform: (v2) => percent.transform(v2 * 100)
  };
  const browserNumberValueTypes = {
    // Border props
    borderWidth: px,
    borderTopWidth: px,
    borderRightWidth: px,
    borderBottomWidth: px,
    borderLeftWidth: px,
    borderRadius: px,
    radius: px,
    borderTopLeftRadius: px,
    borderTopRightRadius: px,
    borderBottomRightRadius: px,
    borderBottomLeftRadius: px,
    // Positioning props
    width: px,
    maxWidth: px,
    height: px,
    maxHeight: px,
    top: px,
    right: px,
    bottom: px,
    left: px,
    // Spacing props
    padding: px,
    paddingTop: px,
    paddingRight: px,
    paddingBottom: px,
    paddingLeft: px,
    margin: px,
    marginTop: px,
    marginRight: px,
    marginBottom: px,
    marginLeft: px,
    // Misc
    backgroundPositionX: px,
    backgroundPositionY: px
  };
  const transformValueTypes = {
    rotate: degrees,
    rotateX: degrees,
    rotateY: degrees,
    rotateZ: degrees,
    scale,
    scaleX: scale,
    scaleY: scale,
    scaleZ: scale,
    skew: degrees,
    skewX: degrees,
    skewY: degrees,
    distance: px,
    translateX: px,
    translateY: px,
    translateZ: px,
    x: px,
    y: px,
    z: px,
    perspective: px,
    transformPerspective: px,
    opacity: alpha,
    originX: progressPercentage,
    originY: progressPercentage,
    originZ: px
  };
  const int = {
    ...number,
    transform: Math.round
  };
  const numberValueTypes = {
    ...browserNumberValueTypes,
    ...transformValueTypes,
    zIndex: int,
    size: px,
    // SVG
    fillOpacity: alpha,
    strokeOpacity: alpha,
    numOctaves: int
  };
  const translateAlias = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective"
  };
  const numTransforms = transformPropOrder.length;
  function buildTransform(latestValues, transform, transformTemplate) {
    let transformString = "";
    let transformIsDefault = true;
    for (let i2 = 0; i2 < numTransforms; i2++) {
      const key = transformPropOrder[i2];
      const value = latestValues[key];
      if (value === void 0)
        continue;
      let valueIsDefault = true;
      if (typeof value === "number") {
        valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
      } else {
        valueIsDefault = parseFloat(value) === 0;
      }
      if (!valueIsDefault || transformTemplate) {
        const valueAsType = getValueAsType(value, numberValueTypes[key]);
        if (!valueIsDefault) {
          transformIsDefault = false;
          const transformName = translateAlias[key] || key;
          transformString += `${transformName}(${valueAsType}) `;
        }
        if (transformTemplate) {
          transform[key] = valueAsType;
        }
      }
    }
    transformString = transformString.trim();
    if (transformTemplate) {
      transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
    } else if (transformIsDefault) {
      transformString = "none";
    }
    return transformString;
  }
  function buildHTMLStyles(state, latestValues, transformTemplate) {
    const { style, vars, transformOrigin } = state;
    let hasTransform2 = false;
    let hasTransformOrigin = false;
    for (const key in latestValues) {
      const value = latestValues[key];
      if (transformProps.has(key)) {
        hasTransform2 = true;
        continue;
      } else if (isCSSVariableName(key)) {
        vars[key] = value;
        continue;
      } else {
        const valueAsType = getValueAsType(value, numberValueTypes[key]);
        if (key.startsWith("origin")) {
          hasTransformOrigin = true;
          transformOrigin[key] = valueAsType;
        } else {
          style[key] = valueAsType;
        }
      }
    }
    if (!latestValues.transform) {
      if (hasTransform2 || transformTemplate) {
        style.transform = buildTransform(latestValues, state.transform, transformTemplate);
      } else if (style.transform) {
        style.transform = "none";
      }
    }
    if (hasTransformOrigin) {
      const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
      style.transformOrigin = `${originX} ${originY} ${originZ}`;
    }
  }
  const dashKeys = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray"
  };
  const camelKeys = {
    offset: "strokeDashoffset",
    array: "strokeDasharray"
  };
  function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
    attrs.pathLength = 1;
    const keys = useDashCase ? dashKeys : camelKeys;
    attrs[keys.offset] = px.transform(-offset);
    const pathLength = px.transform(length);
    const pathSpacing = px.transform(spacing);
    attrs[keys.array] = `${pathLength} ${pathSpacing}`;
  }
  function calcOrigin$1(origin, offset, size) {
    return typeof origin === "string" ? origin : px.transform(offset + size * origin);
  }
  function calcSVGTransformOrigin(dimensions, originX, originY) {
    const pxOriginX = calcOrigin$1(originX, dimensions.x, dimensions.width);
    const pxOriginY = calcOrigin$1(originY, dimensions.y, dimensions.height);
    return `${pxOriginX} ${pxOriginY}`;
  }
  function buildSVGAttrs(state, {
    attrX,
    attrY,
    attrScale,
    originX,
    originY,
    pathLength,
    pathSpacing = 1,
    pathOffset = 0,
    // This is object creation, which we try to avoid per-frame.
    ...latest
  }, isSVGTag2, transformTemplate) {
    buildHTMLStyles(state, latest, transformTemplate);
    if (isSVGTag2) {
      if (state.style.viewBox) {
        state.attrs.viewBox = state.style.viewBox;
      }
      return;
    }
    state.attrs = state.style;
    state.style = {};
    const { attrs, style, dimensions } = state;
    if (attrs.transform) {
      if (dimensions)
        style.transform = attrs.transform;
      delete attrs.transform;
    }
    if (dimensions && (originX !== void 0 || originY !== void 0 || style.transform)) {
      style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : 0.5, originY !== void 0 ? originY : 0.5);
    }
    if (attrX !== void 0)
      attrs.x = attrX;
    if (attrY !== void 0)
      attrs.y = attrY;
    if (attrScale !== void 0)
      attrs.scale = attrScale;
    if (pathLength !== void 0) {
      buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
    }
  }
  const createHtmlRenderState = () => ({
    style: {},
    transform: {},
    transformOrigin: {},
    vars: {}
  });
  const createSvgRenderState = () => ({
    ...createHtmlRenderState(),
    attrs: {}
  });
  const isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";
  function renderHTML(element, { style, vars }, styleProp, projection) {
    Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
    for (const key in vars) {
      element.style.setProperty(key, vars[key]);
    }
  }
  const camelCaseAttributes = /* @__PURE__ */ new Set([
    "baseFrequency",
    "diffuseConstant",
    "kernelMatrix",
    "kernelUnitLength",
    "keySplines",
    "keyTimes",
    "limitingConeAngle",
    "markerHeight",
    "markerWidth",
    "numOctaves",
    "targetX",
    "targetY",
    "surfaceScale",
    "specularConstant",
    "specularExponent",
    "stdDeviation",
    "tableValues",
    "viewBox",
    "gradientTransform",
    "pathLength",
    "startOffset",
    "textLength",
    "lengthAdjust"
  ]);
  function renderSVG(element, renderState, _styleProp, projection) {
    renderHTML(element, renderState, void 0, projection);
    for (const key in renderState.attrs) {
      element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
    }
  }
  const scaleCorrectors = {};
  function addScaleCorrector(correctors) {
    Object.assign(scaleCorrectors, correctors);
  }
  function isForcedMotionValue(key, { layout: layout2, layoutId }) {
    return transformProps.has(key) || key.startsWith("origin") || (layout2 || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
  }
  function scrapeMotionValuesFromProps$1(props, prevProps, visualElement) {
    var _a;
    const { style } = props;
    const newValues = {};
    for (const key in style) {
      if (isMotionValue(style[key]) || prevProps.style && isMotionValue(prevProps.style[key]) || isForcedMotionValue(key, props) || ((_a = visualElement === null || visualElement === void 0 ? void 0 : visualElement.getValue(key)) === null || _a === void 0 ? void 0 : _a.liveStyle) !== void 0) {
        newValues[key] = style[key];
      }
    }
    return newValues;
  }
  function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    const newValues = scrapeMotionValuesFromProps$1(props, prevProps, visualElement);
    for (const key in props) {
      if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
        const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
        newValues[targetKey] = props[key];
      }
    }
    return newValues;
  }
  function updateSVGDimensions(instance, renderState) {
    try {
      renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
    } catch (e) {
      renderState.dimensions = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    }
  }
  const layoutProps = ["x", "y", "width", "height", "cx", "cy", "r"];
  const svgMotionConfig = {
    useVisualState: makeUseVisualState({
      scrapeMotionValuesFromProps,
      createRenderState: createSvgRenderState,
      onUpdate: ({ props, prevProps, current, renderState, latestValues }) => {
        if (!current)
          return;
        let hasTransform2 = !!props.drag;
        if (!hasTransform2) {
          for (const key in latestValues) {
            if (transformProps.has(key)) {
              hasTransform2 = true;
              break;
            }
          }
        }
        if (!hasTransform2)
          return;
        let needsMeasure = !prevProps;
        if (prevProps) {
          for (let i2 = 0; i2 < layoutProps.length; i2++) {
            const key = layoutProps[i2];
            if (props[key] !== prevProps[key]) {
              needsMeasure = true;
            }
          }
        }
        if (!needsMeasure)
          return;
        frame.read(() => {
          updateSVGDimensions(current, renderState);
          frame.render(() => {
            buildSVGAttrs(renderState, latestValues, isSVGTag(current.tagName), props.transformTemplate);
            renderSVG(current, renderState);
          });
        });
      }
    })
  };
  const htmlMotionConfig = {
    useVisualState: makeUseVisualState({
      scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
      createRenderState: createHtmlRenderState
    })
  };
  function copyRawValuesOnly(target, source, props) {
    for (const key in source) {
      if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
        target[key] = source[key];
      }
    }
  }
  function useInitialMotionValues({ transformTemplate }, visualState) {
    return reactExports.useMemo(() => {
      const state = createHtmlRenderState();
      buildHTMLStyles(state, visualState, transformTemplate);
      return Object.assign({}, state.vars, state.style);
    }, [visualState]);
  }
  function useStyle(props, visualState) {
    const styleProp = props.style || {};
    const style = {};
    copyRawValuesOnly(style, styleProp, props);
    Object.assign(style, useInitialMotionValues(props, visualState));
    return style;
  }
  function useHTMLProps(props, visualState) {
    const htmlProps = {};
    const style = useStyle(props, visualState);
    if (props.drag && props.dragListener !== false) {
      htmlProps.draggable = false;
      style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
      style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
    }
    if (props.tabIndex === void 0 && (props.onTap || props.onTapStart || props.whileTap)) {
      htmlProps.tabIndex = 0;
    }
    htmlProps.style = style;
    return htmlProps;
  }
  function useSVGProps(props, visualState, _isStatic, Component) {
    const visualProps = reactExports.useMemo(() => {
      const state = createSvgRenderState();
      buildSVGAttrs(state, visualState, isSVGTag(Component), props.transformTemplate);
      return {
        ...state.attrs,
        style: { ...state.style }
      };
    }, [visualState]);
    if (props.style) {
      const rawStyles = {};
      copyRawValuesOnly(rawStyles, props.style, props);
      visualProps.style = { ...rawStyles, ...visualProps.style };
    }
    return visualProps;
  }
  function createUseRender(forwardMotionProps = false) {
    const useRender = (Component, props, ref, { latestValues }, isStatic) => {
      const useVisualProps = isSVGComponent(Component) ? useSVGProps : useHTMLProps;
      const visualProps = useVisualProps(props, latestValues, isStatic, Component);
      const filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);
      const elementProps = Component !== reactExports.Fragment ? { ...filteredProps, ...visualProps, ref } : {};
      const { children } = props;
      const renderedChildren = reactExports.useMemo(() => isMotionValue(children) ? children.get() : children, [children]);
      return reactExports.createElement(Component, {
        ...elementProps,
        children: renderedChildren
      });
    };
    return useRender;
  }
  function createMotionComponentFactory(preloadedFeatures, createVisualElement) {
    return function createMotionComponent2(Component, { forwardMotionProps } = { forwardMotionProps: false }) {
      const baseConfig = isSVGComponent(Component) ? svgMotionConfig : htmlMotionConfig;
      const config = {
        ...baseConfig,
        preloadedFeatures,
        useRender: createUseRender(forwardMotionProps),
        createVisualElement,
        Component
      };
      return createRendererMotionComponent(config);
    };
  }
  function shallowCompare(next, prev) {
    if (!Array.isArray(prev))
      return false;
    const prevLength = prev.length;
    if (prevLength !== next.length)
      return false;
    for (let i2 = 0; i2 < prevLength; i2++) {
      if (prev[i2] !== next[i2])
        return false;
    }
    return true;
  }
  function resolveVariant(visualElement, definition, custom) {
    const props = visualElement.getProps();
    return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, visualElement);
  }
  const supportsScrollTimeline = /* @__PURE__ */ memo(() => window.ScrollTimeline !== void 0);
  class BaseGroupPlaybackControls {
    constructor(animations2) {
      this.stop = () => this.runAll("stop");
      this.animations = animations2.filter(Boolean);
    }
    get finished() {
      return Promise.all(this.animations.map((animation) => "finished" in animation ? animation.finished : animation));
    }
    /**
     * TODO: Filter out cancelled or stopped animations before returning
     */
    getAll(propName) {
      return this.animations[0][propName];
    }
    setAll(propName, newValue) {
      for (let i2 = 0; i2 < this.animations.length; i2++) {
        this.animations[i2][propName] = newValue;
      }
    }
    attachTimeline(timeline, fallback) {
      const subscriptions = this.animations.map((animation) => {
        if (supportsScrollTimeline() && animation.attachTimeline) {
          return animation.attachTimeline(timeline);
        } else if (typeof fallback === "function") {
          return fallback(animation);
        }
      });
      return () => {
        subscriptions.forEach((cancel, i2) => {
          cancel && cancel();
          this.animations[i2].stop();
        });
      };
    }
    get time() {
      return this.getAll("time");
    }
    set time(time2) {
      this.setAll("time", time2);
    }
    get speed() {
      return this.getAll("speed");
    }
    set speed(speed) {
      this.setAll("speed", speed);
    }
    get startTime() {
      return this.getAll("startTime");
    }
    get duration() {
      let max = 0;
      for (let i2 = 0; i2 < this.animations.length; i2++) {
        max = Math.max(max, this.animations[i2].duration);
      }
      return max;
    }
    runAll(methodName) {
      this.animations.forEach((controls) => controls[methodName]());
    }
    flatten() {
      this.runAll("flatten");
    }
    play() {
      this.runAll("play");
    }
    pause() {
      this.runAll("pause");
    }
    cancel() {
      this.runAll("cancel");
    }
    complete() {
      this.runAll("complete");
    }
  }
  class GroupPlaybackControls extends BaseGroupPlaybackControls {
    then(onResolve, onReject) {
      return Promise.all(this.animations).then(onResolve).catch(onReject);
    }
  }
  function getValueTransition(transition, key) {
    return transition ? transition[key] || transition["default"] || transition : void 0;
  }
  const maxGeneratorDuration = 2e4;
  function calcGeneratorDuration(generator) {
    let duration = 0;
    const timeStep = 50;
    let state = generator.next(duration);
    while (!state.done && duration < maxGeneratorDuration) {
      duration += timeStep;
      state = generator.next(duration);
    }
    return duration >= maxGeneratorDuration ? Infinity : duration;
  }
  function isGenerator(type) {
    return typeof type === "function";
  }
  function attachTimeline(animation, timeline) {
    animation.timeline = timeline;
    animation.onfinish = null;
  }
  const isBezierDefinition = (easing) => Array.isArray(easing) && typeof easing[0] === "number";
  const supportsFlags = {
    linearEasing: void 0
  };
  function memoSupports(callback, supportsFlag) {
    const memoized = /* @__PURE__ */ memo(callback);
    return () => {
      var _a;
      return (_a = supportsFlags[supportsFlag]) !== null && _a !== void 0 ? _a : memoized();
    };
  }
  const supportsLinearEasing = /* @__PURE__ */ memoSupports(() => {
    try {
      document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch (e) {
      return false;
    }
    return true;
  }, "linearEasing");
  const generateLinearEasing = (easing, duration, resolution = 10) => {
    let points = "";
    const numPoints = Math.max(Math.round(duration / resolution), 2);
    for (let i2 = 0; i2 < numPoints; i2++) {
      points += easing(/* @__PURE__ */ progress(0, numPoints - 1, i2)) + ", ";
    }
    return `linear(${points.substring(0, points.length - 2)})`;
  };
  function isWaapiSupportedEasing(easing) {
    return Boolean(typeof easing === "function" && supportsLinearEasing() || !easing || typeof easing === "string" && (easing in supportedWaapiEasing || supportsLinearEasing()) || isBezierDefinition(easing) || Array.isArray(easing) && easing.every(isWaapiSupportedEasing));
  }
  const cubicBezierAsString = ([a2, b, c2, d2]) => `cubic-bezier(${a2}, ${b}, ${c2}, ${d2})`;
  const supportedWaapiEasing = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: /* @__PURE__ */ cubicBezierAsString([0, 0.65, 0.55, 1]),
    circOut: /* @__PURE__ */ cubicBezierAsString([0.55, 0, 1, 0.45]),
    backIn: /* @__PURE__ */ cubicBezierAsString([0.31, 0.01, 0.66, -0.59]),
    backOut: /* @__PURE__ */ cubicBezierAsString([0.33, 1.53, 0.69, 0.99])
  };
  function mapEasingToNativeEasing(easing, duration) {
    if (!easing) {
      return void 0;
    } else if (typeof easing === "function" && supportsLinearEasing()) {
      return generateLinearEasing(easing, duration);
    } else if (isBezierDefinition(easing)) {
      return cubicBezierAsString(easing);
    } else if (Array.isArray(easing)) {
      return easing.map((segmentEasing) => mapEasingToNativeEasing(segmentEasing, duration) || supportedWaapiEasing.easeOut);
    } else {
      return supportedWaapiEasing[easing];
    }
  }
  const isDragging = {
    x: false,
    y: false
  };
  function isDragActive() {
    return isDragging.x || isDragging.y;
  }
  function resolveElements(elementOrSelector, scope, selectorCache) {
    var _a;
    if (elementOrSelector instanceof Element) {
      return [elementOrSelector];
    } else if (typeof elementOrSelector === "string") {
      let root = document;
      const elements = (_a = void 0) !== null && _a !== void 0 ? _a : root.querySelectorAll(elementOrSelector);
      return elements ? Array.from(elements) : [];
    }
    return Array.from(elementOrSelector);
  }
  function setupGesture(elementOrSelector, options2) {
    const elements = resolveElements(elementOrSelector);
    const gestureAbortController = new AbortController();
    const eventOptions = {
      passive: true,
      ...options2,
      signal: gestureAbortController.signal
    };
    const cancel = () => gestureAbortController.abort();
    return [elements, eventOptions, cancel];
  }
  function filterEvents$1(callback) {
    return (event) => {
      if (event.pointerType === "touch" || isDragActive())
        return;
      callback(event);
    };
  }
  function hover(elementOrSelector, onHoverStart, options2 = {}) {
    const [elements, eventOptions, cancel] = setupGesture(elementOrSelector, options2);
    const onPointerEnter = filterEvents$1((enterEvent) => {
      const { target } = enterEvent;
      const onHoverEnd = onHoverStart(enterEvent);
      if (typeof onHoverEnd !== "function" || !target)
        return;
      const onPointerLeave = filterEvents$1((leaveEvent) => {
        onHoverEnd(leaveEvent);
        target.removeEventListener("pointerleave", onPointerLeave);
      });
      target.addEventListener("pointerleave", onPointerLeave, eventOptions);
    });
    elements.forEach((element) => {
      element.addEventListener("pointerenter", onPointerEnter, eventOptions);
    });
    return cancel;
  }
  const isNodeOrChild = (parent, child) => {
    if (!child) {
      return false;
    } else if (parent === child) {
      return true;
    } else {
      return isNodeOrChild(parent, child.parentElement);
    }
  };
  const isPrimaryPointer = (event) => {
    if (event.pointerType === "mouse") {
      return typeof event.button !== "number" || event.button <= 0;
    } else {
      return event.isPrimary !== false;
    }
  };
  const focusableElements = /* @__PURE__ */ new Set([
    "BUTTON",
    "INPUT",
    "SELECT",
    "TEXTAREA",
    "A"
  ]);
  function isElementKeyboardAccessible(element) {
    return focusableElements.has(element.tagName) || element.tabIndex !== -1;
  }
  const isPressing = /* @__PURE__ */ new WeakSet();
  function filterEvents(callback) {
    return (event) => {
      if (event.key !== "Enter")
        return;
      callback(event);
    };
  }
  function firePointerEvent(target, type) {
    target.dispatchEvent(new PointerEvent("pointer" + type, { isPrimary: true, bubbles: true }));
  }
  const enableKeyboardPress = (focusEvent, eventOptions) => {
    const element = focusEvent.currentTarget;
    if (!element)
      return;
    const handleKeydown = filterEvents(() => {
      if (isPressing.has(element))
        return;
      firePointerEvent(element, "down");
      const handleKeyup = filterEvents(() => {
        firePointerEvent(element, "up");
      });
      const handleBlur = () => firePointerEvent(element, "cancel");
      element.addEventListener("keyup", handleKeyup, eventOptions);
      element.addEventListener("blur", handleBlur, eventOptions);
    });
    element.addEventListener("keydown", handleKeydown, eventOptions);
    element.addEventListener("blur", () => element.removeEventListener("keydown", handleKeydown), eventOptions);
  };
  function isValidPressEvent(event) {
    return isPrimaryPointer(event) && !isDragActive();
  }
  function press(elementOrSelector, onPressStart, options2 = {}) {
    const [elements, eventOptions, cancelEvents] = setupGesture(elementOrSelector, options2);
    const startPress = (startEvent) => {
      const element = startEvent.currentTarget;
      if (!isValidPressEvent(startEvent) || isPressing.has(element))
        return;
      isPressing.add(element);
      const onPressEnd = onPressStart(startEvent);
      const onPointerEnd = (endEvent, success) => {
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerCancel);
        if (!isValidPressEvent(endEvent) || !isPressing.has(element)) {
          return;
        }
        isPressing.delete(element);
        if (typeof onPressEnd === "function") {
          onPressEnd(endEvent, { success });
        }
      };
      const onPointerUp = (upEvent) => {
        onPointerEnd(upEvent, options2.useGlobalTarget || isNodeOrChild(element, upEvent.target));
      };
      const onPointerCancel = (cancelEvent) => {
        onPointerEnd(cancelEvent, false);
      };
      window.addEventListener("pointerup", onPointerUp, eventOptions);
      window.addEventListener("pointercancel", onPointerCancel, eventOptions);
    };
    elements.forEach((element) => {
      if (!isElementKeyboardAccessible(element) && element.getAttribute("tabindex") === null) {
        element.tabIndex = 0;
      }
      const target = options2.useGlobalTarget ? window : element;
      target.addEventListener("pointerdown", startPress, eventOptions);
      element.addEventListener("focus", (event) => enableKeyboardPress(event, eventOptions), eventOptions);
    });
    return cancelEvents;
  }
  function setDragLock(axis) {
    if (axis === "x" || axis === "y") {
      if (isDragging[axis]) {
        return null;
      } else {
        isDragging[axis] = true;
        return () => {
          isDragging[axis] = false;
        };
      }
    } else {
      if (isDragging.x || isDragging.y) {
        return null;
      } else {
        isDragging.x = isDragging.y = true;
        return () => {
          isDragging.x = isDragging.y = false;
        };
      }
    }
  }
  const positionalKeys = /* @__PURE__ */ new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    ...transformPropOrder
  ]);
  let now;
  function clearTime() {
    now = void 0;
  }
  const time = {
    now: () => {
      if (now === void 0) {
        time.set(frameData.isProcessing || MotionGlobalConfig.useManualTiming ? frameData.timestamp : performance.now());
      }
      return now;
    },
    set: (newTime) => {
      now = newTime;
      queueMicrotask(clearTime);
    }
  };
  function addUniqueItem(arr, item) {
    if (arr.indexOf(item) === -1)
      arr.push(item);
  }
  function removeItem(arr, item) {
    const index = arr.indexOf(item);
    if (index > -1)
      arr.splice(index, 1);
  }
  class SubscriptionManager {
    constructor() {
      this.subscriptions = [];
    }
    add(handler) {
      addUniqueItem(this.subscriptions, handler);
      return () => removeItem(this.subscriptions, handler);
    }
    notify(a2, b, c2) {
      const numSubscriptions = this.subscriptions.length;
      if (!numSubscriptions)
        return;
      if (numSubscriptions === 1) {
        this.subscriptions[0](a2, b, c2);
      } else {
        for (let i2 = 0; i2 < numSubscriptions; i2++) {
          const handler = this.subscriptions[i2];
          handler && handler(a2, b, c2);
        }
      }
    }
    getSize() {
      return this.subscriptions.length;
    }
    clear() {
      this.subscriptions.length = 0;
    }
  }
  function velocityPerSecond(velocity, frameDuration) {
    return frameDuration ? velocity * (1e3 / frameDuration) : 0;
  }
  const MAX_VELOCITY_DELTA = 30;
  const isFloat = (value) => {
    return !isNaN(parseFloat(value));
  };
  class MotionValue {
    /**
     * @param init - The initiating value
     * @param config - Optional configuration options
     *
     * -  `transformer`: A function to transform incoming values with.
     *
     * @internal
     */
    constructor(init, options2 = {}) {
      this.version = "11.18.2";
      this.canTrackVelocity = null;
      this.events = {};
      this.updateAndNotify = (v2, render = true) => {
        const currentTime = time.now();
        if (this.updatedAt !== currentTime) {
          this.setPrevFrameValue();
        }
        this.prev = this.current;
        this.setCurrent(v2);
        if (this.current !== this.prev && this.events.change) {
          this.events.change.notify(this.current);
        }
        if (render && this.events.renderRequest) {
          this.events.renderRequest.notify(this.current);
        }
      };
      this.hasAnimated = false;
      this.setCurrent(init);
      this.owner = options2.owner;
    }
    setCurrent(current) {
      this.current = current;
      this.updatedAt = time.now();
      if (this.canTrackVelocity === null && current !== void 0) {
        this.canTrackVelocity = isFloat(this.current);
      }
    }
    setPrevFrameValue(prevFrameValue = this.current) {
      this.prevFrameValue = prevFrameValue;
      this.prevUpdatedAt = this.updatedAt;
    }
    /**
     * Adds a function that will be notified when the `MotionValue` is updated.
     *
     * It returns a function that, when called, will cancel the subscription.
     *
     * When calling `onChange` inside a React component, it should be wrapped with the
     * `useEffect` hook. As it returns an unsubscribe function, this should be returned
     * from the `useEffect` function to ensure you don't add duplicate subscribers..
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.on("change", updateOpacity)
     *     const unsubscribeY = y.on("change", updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <motion.div style={{ x }} />
     * }
     * ```
     *
     * @param subscriber - A function that receives the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @deprecated
     */
    onChange(subscription) {
      return this.on("change", subscription);
    }
    on(eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = new SubscriptionManager();
      }
      const unsubscribe = this.events[eventName].add(callback);
      if (eventName === "change") {
        return () => {
          unsubscribe();
          frame.read(() => {
            if (!this.events.change.getSize()) {
              this.stop();
            }
          });
        };
      }
      return unsubscribe;
    }
    clearListeners() {
      for (const eventManagers in this.events) {
        this.events[eventManagers].clear();
      }
    }
    /**
     * Attaches a passive effect to the `MotionValue`.
     *
     * @internal
     */
    attach(passiveEffect, stopPassiveEffect) {
      this.passiveEffect = passiveEffect;
      this.stopPassiveEffect = stopPassiveEffect;
    }
    /**
     * Sets the state of the `MotionValue`.
     *
     * @remarks
     *
     * ```jsx
     * const x = useMotionValue(0)
     * x.set(10)
     * ```
     *
     * @param latest - Latest value to set.
     * @param render - Whether to notify render subscribers. Defaults to `true`
     *
     * @public
     */
    set(v2, render = true) {
      if (!render || !this.passiveEffect) {
        this.updateAndNotify(v2, render);
      } else {
        this.passiveEffect(v2, this.updateAndNotify);
      }
    }
    setWithVelocity(prev, current, delta) {
      this.set(current);
      this.prev = void 0;
      this.prevFrameValue = prev;
      this.prevUpdatedAt = this.updatedAt - delta;
    }
    /**
     * Set the state of the `MotionValue`, stopping any active animations,
     * effects, and resets velocity to `0`.
     */
    jump(v2, endAnimation = true) {
      this.updateAndNotify(v2);
      this.prev = v2;
      this.prevUpdatedAt = this.prevFrameValue = void 0;
      endAnimation && this.stop();
      if (this.stopPassiveEffect)
        this.stopPassiveEffect();
    }
    /**
     * Returns the latest state of `MotionValue`
     *
     * @returns - The latest state of `MotionValue`
     *
     * @public
     */
    get() {
      return this.current;
    }
    /**
     * @public
     */
    getPrevious() {
      return this.prev;
    }
    /**
     * Returns the latest velocity of `MotionValue`
     *
     * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
     *
     * @public
     */
    getVelocity() {
      const currentTime = time.now();
      if (!this.canTrackVelocity || this.prevFrameValue === void 0 || currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
        return 0;
      }
      const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
      return velocityPerSecond(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
    }
    /**
     * Registers a new animation to control this `MotionValue`. Only one
     * animation can drive a `MotionValue` at one time.
     *
     * ```jsx
     * value.start()
     * ```
     *
     * @param animation - A function that starts the provided animation
     *
     * @internal
     */
    start(startAnimation) {
      this.stop();
      return new Promise((resolve) => {
        this.hasAnimated = true;
        this.animation = startAnimation(resolve);
        if (this.events.animationStart) {
          this.events.animationStart.notify();
        }
      }).then(() => {
        if (this.events.animationComplete) {
          this.events.animationComplete.notify();
        }
        this.clearAnimation();
      });
    }
    /**
     * Stop the currently active animation.
     *
     * @public
     */
    stop() {
      if (this.animation) {
        this.animation.stop();
        if (this.events.animationCancel) {
          this.events.animationCancel.notify();
        }
      }
      this.clearAnimation();
    }
    /**
     * Returns `true` if this value is currently animating.
     *
     * @public
     */
    isAnimating() {
      return !!this.animation;
    }
    clearAnimation() {
      delete this.animation;
    }
    /**
     * Destroy and clean up subscribers to this `MotionValue`.
     *
     * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
     * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
     * created a `MotionValue` via the `motionValue` function.
     *
     * @public
     */
    destroy() {
      this.clearListeners();
      this.stop();
      if (this.stopPassiveEffect) {
        this.stopPassiveEffect();
      }
    }
  }
  function motionValue(init, options2) {
    return new MotionValue(init, options2);
  }
  function setMotionValue(visualElement, key, value) {
    if (visualElement.hasValue(key)) {
      visualElement.getValue(key).set(value);
    } else {
      visualElement.addValue(key, motionValue(value));
    }
  }
  function setTarget(visualElement, definition) {
    const resolved = resolveVariant(visualElement, definition);
    let { transitionEnd = {}, transition = {}, ...target } = resolved || {};
    target = { ...target, ...transitionEnd };
    for (const key in target) {
      const value = resolveFinalValueInKeyframes(target[key]);
      setMotionValue(visualElement, key, value);
    }
  }
  function isWillChangeMotionValue(value) {
    return Boolean(isMotionValue(value) && value.add);
  }
  function addValueToWillChange(visualElement, key) {
    const willChange = visualElement.getValue("willChange");
    if (isWillChangeMotionValue(willChange)) {
      return willChange.add(key);
    }
  }
  function getOptimisedAppearId(visualElement) {
    return visualElement.props[optimizedAppearDataAttribute];
  }
  const calcBezier = (t2, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t2 + (3 * a2 - 6 * a1)) * t2 + 3 * a1) * t2;
  const subdivisionPrecision = 1e-7;
  const subdivisionMaxIterations = 12;
  function binarySubdivide(x2, lowerBound, upperBound, mX1, mX2) {
    let currentX;
    let currentT;
    let i2 = 0;
    do {
      currentT = lowerBound + (upperBound - lowerBound) / 2;
      currentX = calcBezier(currentT, mX1, mX2) - x2;
      if (currentX > 0) {
        upperBound = currentT;
      } else {
        lowerBound = currentT;
      }
    } while (Math.abs(currentX) > subdivisionPrecision && ++i2 < subdivisionMaxIterations);
    return currentT;
  }
  function cubicBezier(mX1, mY1, mX2, mY2) {
    if (mX1 === mY1 && mX2 === mY2)
      return noop;
    const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
    return (t2) => t2 === 0 || t2 === 1 ? t2 : calcBezier(getTForX(t2), mY1, mY2);
  }
  const mirrorEasing = (easing) => (p2) => p2 <= 0.5 ? easing(2 * p2) / 2 : (2 - easing(2 * (1 - p2))) / 2;
  const reverseEasing = (easing) => (p2) => 1 - easing(1 - p2);
  const backOut = /* @__PURE__ */ cubicBezier(0.33, 1.53, 0.69, 0.99);
  const backIn = /* @__PURE__ */ reverseEasing(backOut);
  const backInOut = /* @__PURE__ */ mirrorEasing(backIn);
  const anticipate = (p2) => (p2 *= 2) < 1 ? 0.5 * backIn(p2) : 0.5 * (2 - Math.pow(2, -10 * (p2 - 1)));
  const circIn = (p2) => 1 - Math.sin(Math.acos(p2));
  const circOut = reverseEasing(circIn);
  const circInOut = mirrorEasing(circIn);
  const isZeroValueString = (v2) => /^0[^.\s]+$/u.test(v2);
  function isNone(value) {
    if (typeof value === "number") {
      return value === 0;
    } else if (value !== null) {
      return value === "none" || value === "0" || isZeroValueString(value);
    } else {
      return true;
    }
  }
  const sanitize = (v2) => Math.round(v2 * 1e5) / 1e5;
  const floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
  function isNullish(v2) {
    return v2 == null;
  }
  const singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
  const isColorString = (type, testProp) => (v2) => {
    return Boolean(typeof v2 === "string" && singleColorRegex.test(v2) && v2.startsWith(type) || testProp && !isNullish(v2) && Object.prototype.hasOwnProperty.call(v2, testProp));
  };
  const splitColor = (aName, bName, cName) => (v2) => {
    if (typeof v2 !== "string")
      return v2;
    const [a2, b, c2, alpha2] = v2.match(floatRegex);
    return {
      [aName]: parseFloat(a2),
      [bName]: parseFloat(b),
      [cName]: parseFloat(c2),
      alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
    };
  };
  const clampRgbUnit = (v2) => clamp(0, 255, v2);
  const rgbUnit = {
    ...number,
    transform: (v2) => Math.round(clampRgbUnit(v2))
  };
  const rgba = {
    test: /* @__PURE__ */ isColorString("rgb", "red"),
    parse: /* @__PURE__ */ splitColor("red", "green", "blue"),
    transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
  };
  function parseHex(v2) {
    let r2 = "";
    let g2 = "";
    let b = "";
    let a2 = "";
    if (v2.length > 5) {
      r2 = v2.substring(1, 3);
      g2 = v2.substring(3, 5);
      b = v2.substring(5, 7);
      a2 = v2.substring(7, 9);
    } else {
      r2 = v2.substring(1, 2);
      g2 = v2.substring(2, 3);
      b = v2.substring(3, 4);
      a2 = v2.substring(4, 5);
      r2 += r2;
      g2 += g2;
      b += b;
      a2 += a2;
    }
    return {
      red: parseInt(r2, 16),
      green: parseInt(g2, 16),
      blue: parseInt(b, 16),
      alpha: a2 ? parseInt(a2, 16) / 255 : 1
    };
  }
  const hex = {
    test: /* @__PURE__ */ isColorString("#"),
    parse: parseHex,
    transform: rgba.transform
  };
  const hsla = {
    test: /* @__PURE__ */ isColorString("hsl", "hue"),
    parse: /* @__PURE__ */ splitColor("hue", "saturation", "lightness"),
    transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
      return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
    }
  };
  const color = {
    test: (v2) => rgba.test(v2) || hex.test(v2) || hsla.test(v2),
    parse: (v2) => {
      if (rgba.test(v2)) {
        return rgba.parse(v2);
      } else if (hsla.test(v2)) {
        return hsla.parse(v2);
      } else {
        return hex.parse(v2);
      }
    },
    transform: (v2) => {
      return typeof v2 === "string" ? v2 : v2.hasOwnProperty("red") ? rgba.transform(v2) : hsla.transform(v2);
    }
  };
  const colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
  function test(v2) {
    var _a, _b;
    return isNaN(v2) && typeof v2 === "string" && (((_a = v2.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) || 0) + (((_b = v2.match(colorRegex)) === null || _b === void 0 ? void 0 : _b.length) || 0) > 0;
  }
  const NUMBER_TOKEN = "number";
  const COLOR_TOKEN = "color";
  const VAR_TOKEN = "var";
  const VAR_FUNCTION_TOKEN = "var(";
  const SPLIT_TOKEN = "${}";
  const complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
  function analyseComplexValue(value) {
    const originalValue = value.toString();
    const values = [];
    const indexes = {
      color: [],
      number: [],
      var: []
    };
    const types = [];
    let i2 = 0;
    const tokenised = originalValue.replace(complexRegex, (parsedValue) => {
      if (color.test(parsedValue)) {
        indexes.color.push(i2);
        types.push(COLOR_TOKEN);
        values.push(color.parse(parsedValue));
      } else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
        indexes.var.push(i2);
        types.push(VAR_TOKEN);
        values.push(parsedValue);
      } else {
        indexes.number.push(i2);
        types.push(NUMBER_TOKEN);
        values.push(parseFloat(parsedValue));
      }
      ++i2;
      return SPLIT_TOKEN;
    });
    const split = tokenised.split(SPLIT_TOKEN);
    return { values, split, indexes, types };
  }
  function parseComplexValue(v2) {
    return analyseComplexValue(v2).values;
  }
  function createTransformer(source) {
    const { split, types } = analyseComplexValue(source);
    const numSections = split.length;
    return (v2) => {
      let output = "";
      for (let i2 = 0; i2 < numSections; i2++) {
        output += split[i2];
        if (v2[i2] !== void 0) {
          const type = types[i2];
          if (type === NUMBER_TOKEN) {
            output += sanitize(v2[i2]);
          } else if (type === COLOR_TOKEN) {
            output += color.transform(v2[i2]);
          } else {
            output += v2[i2];
          }
        }
      }
      return output;
    };
  }
  const convertNumbersToZero = (v2) => typeof v2 === "number" ? 0 : v2;
  function getAnimatableNone$1(v2) {
    const parsed = parseComplexValue(v2);
    const transformer = createTransformer(v2);
    return transformer(parsed.map(convertNumbersToZero));
  }
  const complex = {
    test,
    parse: parseComplexValue,
    createTransformer,
    getAnimatableNone: getAnimatableNone$1
  };
  const maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
  function applyDefaultFilter(v2) {
    const [name, value] = v2.slice(0, -1).split("(");
    if (name === "drop-shadow")
      return v2;
    const [number2] = value.match(floatRegex) || [];
    if (!number2)
      return v2;
    const unit = value.replace(number2, "");
    let defaultValue = maxDefaults.has(name) ? 1 : 0;
    if (number2 !== value)
      defaultValue *= 100;
    return name + "(" + defaultValue + unit + ")";
  }
  const functionRegex = /\b([a-z-]*)\(.*?\)/gu;
  const filter = {
    ...complex,
    getAnimatableNone: (v2) => {
      const functions = v2.match(functionRegex);
      return functions ? functions.map(applyDefaultFilter).join(" ") : v2;
    }
  };
  const defaultValueTypes = {
    ...numberValueTypes,
    // Color props
    color,
    backgroundColor: color,
    outlineColor: color,
    fill: color,
    stroke: color,
    // Border props
    borderColor: color,
    borderTopColor: color,
    borderRightColor: color,
    borderBottomColor: color,
    borderLeftColor: color,
    filter,
    WebkitFilter: filter
  };
  const getDefaultValueType = (key) => defaultValueTypes[key];
  function getAnimatableNone(key, value) {
    let defaultValueType = getDefaultValueType(key);
    if (defaultValueType !== filter)
      defaultValueType = complex;
    return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
  }
  const invalidTemplates = /* @__PURE__ */ new Set(["auto", "none", "0"]);
  function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
    let i2 = 0;
    let animatableTemplate = void 0;
    while (i2 < unresolvedKeyframes.length && !animatableTemplate) {
      const keyframe = unresolvedKeyframes[i2];
      if (typeof keyframe === "string" && !invalidTemplates.has(keyframe) && analyseComplexValue(keyframe).values.length) {
        animatableTemplate = unresolvedKeyframes[i2];
      }
      i2++;
    }
    if (animatableTemplate && name) {
      for (const noneIndex of noneKeyframeIndexes) {
        unresolvedKeyframes[noneIndex] = getAnimatableNone(name, animatableTemplate);
      }
    }
  }
  const isNumOrPxType = (v2) => v2 === number || v2 === px;
  const getPosFromMatrix = (matrix, pos) => parseFloat(matrix.split(", ")[pos]);
  const getTranslateFromMatrix = (pos2, pos3) => (_bbox, { transform }) => {
    if (transform === "none" || !transform)
      return 0;
    const matrix3d = transform.match(/^matrix3d\((.+)\)$/u);
    if (matrix3d) {
      return getPosFromMatrix(matrix3d[1], pos3);
    } else {
      const matrix = transform.match(/^matrix\((.+)\)$/u);
      if (matrix) {
        return getPosFromMatrix(matrix[1], pos2);
      } else {
        return 0;
      }
    }
  };
  const transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
  const nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
  function removeNonTranslationalTransform(visualElement) {
    const removedTransforms = [];
    nonTranslationalTransformKeys.forEach((key) => {
      const value = visualElement.getValue(key);
      if (value !== void 0) {
        removedTransforms.push([key, value.get()]);
        value.set(key.startsWith("scale") ? 1 : 0);
      }
    });
    return removedTransforms;
  }
  const positionalValues = {
    // Dimensions
    width: ({ x: x2 }, { paddingLeft = "0", paddingRight = "0" }) => x2.max - x2.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
    height: ({ y: y2 }, { paddingTop = "0", paddingBottom = "0" }) => y2.max - y2.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
    top: (_bbox, { top }) => parseFloat(top),
    left: (_bbox, { left }) => parseFloat(left),
    bottom: ({ y: y2 }, { top }) => parseFloat(top) + (y2.max - y2.min),
    right: ({ x: x2 }, { left }) => parseFloat(left) + (x2.max - x2.min),
    // Transform
    x: getTranslateFromMatrix(4, 13),
    y: getTranslateFromMatrix(5, 14)
  };
  positionalValues.translateX = positionalValues.x;
  positionalValues.translateY = positionalValues.y;
  const toResolve = /* @__PURE__ */ new Set();
  let isScheduled = false;
  let anyNeedsMeasurement = false;
  function measureAllKeyframes() {
    if (anyNeedsMeasurement) {
      const resolversToMeasure = Array.from(toResolve).filter((resolver) => resolver.needsMeasurement);
      const elementsToMeasure = new Set(resolversToMeasure.map((resolver) => resolver.element));
      const transformsToRestore = /* @__PURE__ */ new Map();
      elementsToMeasure.forEach((element) => {
        const removedTransforms = removeNonTranslationalTransform(element);
        if (!removedTransforms.length)
          return;
        transformsToRestore.set(element, removedTransforms);
        element.render();
      });
      resolversToMeasure.forEach((resolver) => resolver.measureInitialState());
      elementsToMeasure.forEach((element) => {
        element.render();
        const restore = transformsToRestore.get(element);
        if (restore) {
          restore.forEach(([key, value]) => {
            var _a;
            (_a = element.getValue(key)) === null || _a === void 0 ? void 0 : _a.set(value);
          });
        }
      });
      resolversToMeasure.forEach((resolver) => resolver.measureEndState());
      resolversToMeasure.forEach((resolver) => {
        if (resolver.suspendedScrollY !== void 0) {
          window.scrollTo(0, resolver.suspendedScrollY);
        }
      });
    }
    anyNeedsMeasurement = false;
    isScheduled = false;
    toResolve.forEach((resolver) => resolver.complete());
    toResolve.clear();
  }
  function readAllKeyframes() {
    toResolve.forEach((resolver) => {
      resolver.readKeyframes();
      if (resolver.needsMeasurement) {
        anyNeedsMeasurement = true;
      }
    });
  }
  function flushKeyframeResolvers() {
    readAllKeyframes();
    measureAllKeyframes();
  }
  class KeyframeResolver {
    constructor(unresolvedKeyframes, onComplete, name, motionValue2, element, isAsync = false) {
      this.isComplete = false;
      this.isAsync = false;
      this.needsMeasurement = false;
      this.isScheduled = false;
      this.unresolvedKeyframes = [...unresolvedKeyframes];
      this.onComplete = onComplete;
      this.name = name;
      this.motionValue = motionValue2;
      this.element = element;
      this.isAsync = isAsync;
    }
    scheduleResolve() {
      this.isScheduled = true;
      if (this.isAsync) {
        toResolve.add(this);
        if (!isScheduled) {
          isScheduled = true;
          frame.read(readAllKeyframes);
          frame.resolveKeyframes(measureAllKeyframes);
        }
      } else {
        this.readKeyframes();
        this.complete();
      }
    }
    readKeyframes() {
      const { unresolvedKeyframes, name, element, motionValue: motionValue2 } = this;
      for (let i2 = 0; i2 < unresolvedKeyframes.length; i2++) {
        if (unresolvedKeyframes[i2] === null) {
          if (i2 === 0) {
            const currentValue = motionValue2 === null || motionValue2 === void 0 ? void 0 : motionValue2.get();
            const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
            if (currentValue !== void 0) {
              unresolvedKeyframes[0] = currentValue;
            } else if (element && name) {
              const valueAsRead = element.readValue(name, finalKeyframe);
              if (valueAsRead !== void 0 && valueAsRead !== null) {
                unresolvedKeyframes[0] = valueAsRead;
              }
            }
            if (unresolvedKeyframes[0] === void 0) {
              unresolvedKeyframes[0] = finalKeyframe;
            }
            if (motionValue2 && currentValue === void 0) {
              motionValue2.set(unresolvedKeyframes[0]);
            }
          } else {
            unresolvedKeyframes[i2] = unresolvedKeyframes[i2 - 1];
          }
        }
      }
    }
    setFinalKeyframe() {
    }
    measureInitialState() {
    }
    renderEndStyles() {
    }
    measureEndState() {
    }
    complete() {
      this.isComplete = true;
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe);
      toResolve.delete(this);
    }
    cancel() {
      if (!this.isComplete) {
        this.isScheduled = false;
        toResolve.delete(this);
      }
    }
    resume() {
      if (!this.isComplete)
        this.scheduleResolve();
    }
  }
  const isNumericalString = (v2) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v2);
  const splitCSSVariableRegex = (
    // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
    /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
  );
  function parseCSSVariable(current) {
    const match = splitCSSVariableRegex.exec(current);
    if (!match)
      return [,];
    const [, token1, token2, fallback] = match;
    return [`--${token1 !== null && token1 !== void 0 ? token1 : token2}`, fallback];
  }
  function getVariableValue(current, element, depth = 1) {
    const [token, fallback] = parseCSSVariable(current);
    if (!token)
      return;
    const resolved = window.getComputedStyle(element).getPropertyValue(token);
    if (resolved) {
      const trimmed = resolved.trim();
      return isNumericalString(trimmed) ? parseFloat(trimmed) : trimmed;
    }
    return isCSSVariableToken(fallback) ? getVariableValue(fallback, element, depth + 1) : fallback;
  }
  const testValueType = (v2) => (type) => type.test(v2);
  const auto = {
    test: (v2) => v2 === "auto",
    parse: (v2) => v2
  };
  const dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
  const findDimensionValueType = (v2) => dimensionValueTypes.find(testValueType(v2));
  class DOMKeyframesResolver extends KeyframeResolver {
    constructor(unresolvedKeyframes, onComplete, name, motionValue2, element) {
      super(unresolvedKeyframes, onComplete, name, motionValue2, element, true);
    }
    readKeyframes() {
      const { unresolvedKeyframes, element, name } = this;
      if (!element || !element.current)
        return;
      super.readKeyframes();
      for (let i2 = 0; i2 < unresolvedKeyframes.length; i2++) {
        let keyframe = unresolvedKeyframes[i2];
        if (typeof keyframe === "string") {
          keyframe = keyframe.trim();
          if (isCSSVariableToken(keyframe)) {
            const resolved = getVariableValue(keyframe, element.current);
            if (resolved !== void 0) {
              unresolvedKeyframes[i2] = resolved;
            }
            if (i2 === unresolvedKeyframes.length - 1) {
              this.finalKeyframe = keyframe;
            }
          }
        }
      }
      this.resolveNoneKeyframes();
      if (!positionalKeys.has(name) || unresolvedKeyframes.length !== 2) {
        return;
      }
      const [origin, target] = unresolvedKeyframes;
      const originType = findDimensionValueType(origin);
      const targetType = findDimensionValueType(target);
      if (originType === targetType)
        return;
      if (isNumOrPxType(originType) && isNumOrPxType(targetType)) {
        for (let i2 = 0; i2 < unresolvedKeyframes.length; i2++) {
          const value = unresolvedKeyframes[i2];
          if (typeof value === "string") {
            unresolvedKeyframes[i2] = parseFloat(value);
          }
        }
      } else {
        this.needsMeasurement = true;
      }
    }
    resolveNoneKeyframes() {
      const { unresolvedKeyframes, name } = this;
      const noneKeyframeIndexes = [];
      for (let i2 = 0; i2 < unresolvedKeyframes.length; i2++) {
        if (isNone(unresolvedKeyframes[i2])) {
          noneKeyframeIndexes.push(i2);
        }
      }
      if (noneKeyframeIndexes.length) {
        makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name);
      }
    }
    measureInitialState() {
      const { element, unresolvedKeyframes, name } = this;
      if (!element || !element.current)
        return;
      if (name === "height") {
        this.suspendedScrollY = window.pageYOffset;
      }
      this.measuredOrigin = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
      unresolvedKeyframes[0] = this.measuredOrigin;
      const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
      if (measureKeyframe !== void 0) {
        element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
      }
    }
    measureEndState() {
      var _a;
      const { element, name, unresolvedKeyframes } = this;
      if (!element || !element.current)
        return;
      const value = element.getValue(name);
      value && value.jump(this.measuredOrigin, false);
      const finalKeyframeIndex = unresolvedKeyframes.length - 1;
      const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
      unresolvedKeyframes[finalKeyframeIndex] = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
      if (finalKeyframe !== null && this.finalKeyframe === void 0) {
        this.finalKeyframe = finalKeyframe;
      }
      if ((_a = this.removedTransforms) === null || _a === void 0 ? void 0 : _a.length) {
        this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue]) => {
          element.getValue(unsetTransformName).set(unsetTransformValue);
        });
      }
      this.resolveNoneKeyframes();
    }
  }
  const isAnimatable = (value, name) => {
    if (name === "zIndex")
      return false;
    if (typeof value === "number" || Array.isArray(value))
      return true;
    if (typeof value === "string" && // It's animatable if we have a string
    (complex.test(value) || value === "0") && // And it contains numbers and/or colors
    !value.startsWith("url(")) {
      return true;
    }
    return false;
  };
  function hasKeyframesChanged(keyframes2) {
    const current = keyframes2[0];
    if (keyframes2.length === 1)
      return true;
    for (let i2 = 0; i2 < keyframes2.length; i2++) {
      if (keyframes2[i2] !== current)
        return true;
    }
  }
  function canAnimate(keyframes2, name, type, velocity) {
    const originKeyframe = keyframes2[0];
    if (originKeyframe === null)
      return false;
    if (name === "display" || name === "visibility")
      return true;
    const targetKeyframe = keyframes2[keyframes2.length - 1];
    const isOriginAnimatable = isAnimatable(originKeyframe, name);
    const isTargetAnimatable = isAnimatable(targetKeyframe, name);
    if (!isOriginAnimatable || !isTargetAnimatable) {
      return false;
    }
    return hasKeyframesChanged(keyframes2) || (type === "spring" || isGenerator(type)) && velocity;
  }
  const isNotNull = (value) => value !== null;
  function getFinalKeyframe(keyframes2, { repeat, repeatType = "loop" }, finalKeyframe) {
    const resolvedKeyframes = keyframes2.filter(isNotNull);
    const index = repeat && repeatType !== "loop" && repeat % 2 === 1 ? 0 : resolvedKeyframes.length - 1;
    return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
  }
  const MAX_RESOLVE_DELAY = 40;
  class BaseAnimation {
    constructor({ autoplay = true, delay: delay2 = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", ...options2 }) {
      this.isStopped = false;
      this.hasAttemptedResolve = false;
      this.createdAt = time.now();
      this.options = {
        autoplay,
        delay: delay2,
        type,
        repeat,
        repeatDelay,
        repeatType,
        ...options2
      };
      this.updateFinishedPromise();
    }
    /**
     * This method uses the createdAt and resolvedAt to calculate the
     * animation startTime. *Ideally*, we would use the createdAt time as t=0
     * as the following frame would then be the first frame of the animation in
     * progress, which would feel snappier.
     *
     * However, if there's a delay (main thread work) between the creation of
     * the animation and the first commited frame, we prefer to use resolvedAt
     * to avoid a sudden jump into the animation.
     */
    calcStartTime() {
      if (!this.resolvedAt)
        return this.createdAt;
      return this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt;
    }
    /**
     * A getter for resolved data. If keyframes are not yet resolved, accessing
     * this.resolved will synchronously flush all pending keyframe resolvers.
     * This is a deoptimisation, but at its worst still batches read/writes.
     */
    get resolved() {
      if (!this._resolved && !this.hasAttemptedResolve) {
        flushKeyframeResolvers();
      }
      return this._resolved;
    }
    /**
     * A method to be called when the keyframes resolver completes. This method
     * will check if its possible to run the animation and, if not, skip it.
     * Otherwise, it will call initPlayback on the implementing class.
     */
    onKeyframesResolved(keyframes2, finalKeyframe) {
      this.resolvedAt = time.now();
      this.hasAttemptedResolve = true;
      const { name, type, velocity, delay: delay2, onComplete, onUpdate, isGenerator: isGenerator2 } = this.options;
      if (!isGenerator2 && !canAnimate(keyframes2, name, type, velocity)) {
        if (!delay2) {
          onUpdate && onUpdate(getFinalKeyframe(keyframes2, this.options, finalKeyframe));
          onComplete && onComplete();
          this.resolveFinishedPromise();
          return;
        } else {
          this.options.duration = 0;
        }
      }
      const resolvedAnimation = this.initPlayback(keyframes2, finalKeyframe);
      if (resolvedAnimation === false)
        return;
      this._resolved = {
        keyframes: keyframes2,
        finalKeyframe,
        ...resolvedAnimation
      };
      this.onPostResolved();
    }
    onPostResolved() {
    }
    /**
     * Allows the returned animation to be awaited or promise-chained. Currently
     * resolves when the animation finishes at all but in a future update could/should
     * reject if its cancels.
     */
    then(resolve, reject) {
      return this.currentFinishedPromise.then(resolve, reject);
    }
    flatten() {
      this.options.type = "keyframes";
      this.options.ease = "linear";
    }
    updateFinishedPromise() {
      this.currentFinishedPromise = new Promise((resolve) => {
        this.resolveFinishedPromise = resolve;
      });
    }
  }
  const mixNumber$1 = (from, to, progress2) => {
    return from + (to - from) * progress2;
  };
  function hueToRgb(p2, q2, t2) {
    if (t2 < 0)
      t2 += 1;
    if (t2 > 1)
      t2 -= 1;
    if (t2 < 1 / 6)
      return p2 + (q2 - p2) * 6 * t2;
    if (t2 < 1 / 2)
      return q2;
    if (t2 < 2 / 3)
      return p2 + (q2 - p2) * (2 / 3 - t2) * 6;
    return p2;
  }
  function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
    hue /= 360;
    saturation /= 100;
    lightness /= 100;
    let red = 0;
    let green = 0;
    let blue = 0;
    if (!saturation) {
      red = green = blue = lightness;
    } else {
      const q2 = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
      const p2 = 2 * lightness - q2;
      red = hueToRgb(p2, q2, hue + 1 / 3);
      green = hueToRgb(p2, q2, hue);
      blue = hueToRgb(p2, q2, hue - 1 / 3);
    }
    return {
      red: Math.round(red * 255),
      green: Math.round(green * 255),
      blue: Math.round(blue * 255),
      alpha: alpha2
    };
  }
  function mixImmediate(a2, b) {
    return (p2) => p2 > 0 ? b : a2;
  }
  const mixLinearColor = (from, to, v2) => {
    const fromExpo = from * from;
    const expo = v2 * (to * to - fromExpo) + fromExpo;
    return expo < 0 ? 0 : Math.sqrt(expo);
  };
  const colorTypes = [hex, rgba, hsla];
  const getColorType = (v2) => colorTypes.find((type) => type.test(v2));
  function asRGBA(color2) {
    const type = getColorType(color2);
    if (!Boolean(type))
      return false;
    let model = type.parse(color2);
    if (type === hsla) {
      model = hslaToRgba(model);
    }
    return model;
  }
  const mixColor = (from, to) => {
    const fromRGBA = asRGBA(from);
    const toRGBA = asRGBA(to);
    if (!fromRGBA || !toRGBA) {
      return mixImmediate(from, to);
    }
    const blended = { ...fromRGBA };
    return (v2) => {
      blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v2);
      blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v2);
      blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v2);
      blended.alpha = mixNumber$1(fromRGBA.alpha, toRGBA.alpha, v2);
      return rgba.transform(blended);
    };
  };
  const combineFunctions = (a2, b) => (v2) => b(a2(v2));
  const pipe = (...transformers) => transformers.reduce(combineFunctions);
  const invisibleValues = /* @__PURE__ */ new Set(["none", "hidden"]);
  function mixVisibility(origin, target) {
    if (invisibleValues.has(origin)) {
      return (p2) => p2 <= 0 ? origin : target;
    } else {
      return (p2) => p2 >= 1 ? target : origin;
    }
  }
  function mixNumber(a2, b) {
    return (p2) => mixNumber$1(a2, b, p2);
  }
  function getMixer(a2) {
    if (typeof a2 === "number") {
      return mixNumber;
    } else if (typeof a2 === "string") {
      return isCSSVariableToken(a2) ? mixImmediate : color.test(a2) ? mixColor : mixComplex;
    } else if (Array.isArray(a2)) {
      return mixArray;
    } else if (typeof a2 === "object") {
      return color.test(a2) ? mixColor : mixObject;
    }
    return mixImmediate;
  }
  function mixArray(a2, b) {
    const output = [...a2];
    const numValues = output.length;
    const blendValue = a2.map((v2, i2) => getMixer(v2)(v2, b[i2]));
    return (p2) => {
      for (let i2 = 0; i2 < numValues; i2++) {
        output[i2] = blendValue[i2](p2);
      }
      return output;
    };
  }
  function mixObject(a2, b) {
    const output = { ...a2, ...b };
    const blendValue = {};
    for (const key in output) {
      if (a2[key] !== void 0 && b[key] !== void 0) {
        blendValue[key] = getMixer(a2[key])(a2[key], b[key]);
      }
    }
    return (v2) => {
      for (const key in blendValue) {
        output[key] = blendValue[key](v2);
      }
      return output;
    };
  }
  function matchOrder(origin, target) {
    var _a;
    const orderedOrigin = [];
    const pointers = { color: 0, var: 0, number: 0 };
    for (let i2 = 0; i2 < target.values.length; i2++) {
      const type = target.types[i2];
      const originIndex = origin.indexes[type][pointers[type]];
      const originValue = (_a = origin.values[originIndex]) !== null && _a !== void 0 ? _a : 0;
      orderedOrigin[i2] = originValue;
      pointers[type]++;
    }
    return orderedOrigin;
  }
  const mixComplex = (origin, target) => {
    const template = complex.createTransformer(target);
    const originStats = analyseComplexValue(origin);
    const targetStats = analyseComplexValue(target);
    const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length;
    if (canInterpolate) {
      if (invisibleValues.has(origin) && !targetStats.values.length || invisibleValues.has(target) && !originStats.values.length) {
        return mixVisibility(origin, target);
      }
      return pipe(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
    } else {
      return mixImmediate(origin, target);
    }
  };
  function mix(from, to, p2) {
    if (typeof from === "number" && typeof to === "number" && typeof p2 === "number") {
      return mixNumber$1(from, to, p2);
    }
    const mixer = getMixer(from);
    return mixer(from, to);
  }
  const velocitySampleDuration = 5;
  function calcGeneratorVelocity(resolveValue, t2, current) {
    const prevT = Math.max(t2 - velocitySampleDuration, 0);
    return velocityPerSecond(current - resolveValue(prevT), t2 - prevT);
  }
  const springDefaults = {
    // Default spring physics
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    // Default duration/bounce-based options
    duration: 800,
    // in ms
    bounce: 0.3,
    visualDuration: 0.3,
    // in seconds
    // Rest thresholds
    restSpeed: {
      granular: 0.01,
      default: 2
    },
    restDelta: {
      granular: 5e-3,
      default: 0.5
    },
    // Limits
    minDuration: 0.01,
    // in seconds
    maxDuration: 10,
    // in seconds
    minDamping: 0.05,
    maxDamping: 1
  };
  const safeMin = 1e-3;
  function findSpring({ duration = springDefaults.duration, bounce = springDefaults.bounce, velocity = springDefaults.velocity, mass = springDefaults.mass }) {
    let envelope;
    let derivative;
    let dampingRatio = 1 - bounce;
    dampingRatio = clamp(springDefaults.minDamping, springDefaults.maxDamping, dampingRatio);
    duration = clamp(springDefaults.minDuration, springDefaults.maxDuration, /* @__PURE__ */ millisecondsToSeconds(duration));
    if (dampingRatio < 1) {
      envelope = (undampedFreq2) => {
        const exponentialDecay = undampedFreq2 * dampingRatio;
        const delta = exponentialDecay * duration;
        const a2 = exponentialDecay - velocity;
        const b = calcAngularFreq(undampedFreq2, dampingRatio);
        const c2 = Math.exp(-delta);
        return safeMin - a2 / b * c2;
      };
      derivative = (undampedFreq2) => {
        const exponentialDecay = undampedFreq2 * dampingRatio;
        const delta = exponentialDecay * duration;
        const d2 = delta * velocity + velocity;
        const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
        const f2 = Math.exp(-delta);
        const g2 = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
        const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
        return factor * ((d2 - e) * f2) / g2;
      };
    } else {
      envelope = (undampedFreq2) => {
        const a2 = Math.exp(-undampedFreq2 * duration);
        const b = (undampedFreq2 - velocity) * duration + 1;
        return -1e-3 + a2 * b;
      };
      derivative = (undampedFreq2) => {
        const a2 = Math.exp(-undampedFreq2 * duration);
        const b = (velocity - undampedFreq2) * (duration * duration);
        return a2 * b;
      };
    }
    const initialGuess = 5 / duration;
    const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
    duration = /* @__PURE__ */ secondsToMilliseconds(duration);
    if (isNaN(undampedFreq)) {
      return {
        stiffness: springDefaults.stiffness,
        damping: springDefaults.damping,
        duration
      };
    } else {
      const stiffness = Math.pow(undampedFreq, 2) * mass;
      return {
        stiffness,
        damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
        duration
      };
    }
  }
  const rootIterations = 12;
  function approximateRoot(envelope, derivative, initialGuess) {
    let result = initialGuess;
    for (let i2 = 1; i2 < rootIterations; i2++) {
      result = result - envelope(result) / derivative(result);
    }
    return result;
  }
  function calcAngularFreq(undampedFreq, dampingRatio) {
    return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
  }
  const durationKeys = ["duration", "bounce"];
  const physicsKeys = ["stiffness", "damping", "mass"];
  function isSpringType(options2, keys) {
    return keys.some((key) => options2[key] !== void 0);
  }
  function getSpringOptions(options2) {
    let springOptions = {
      velocity: springDefaults.velocity,
      stiffness: springDefaults.stiffness,
      damping: springDefaults.damping,
      mass: springDefaults.mass,
      isResolvedFromDuration: false,
      ...options2
    };
    if (!isSpringType(options2, physicsKeys) && isSpringType(options2, durationKeys)) {
      if (options2.visualDuration) {
        const visualDuration = options2.visualDuration;
        const root = 2 * Math.PI / (visualDuration * 1.2);
        const stiffness = root * root;
        const damping = 2 * clamp(0.05, 1, 1 - (options2.bounce || 0)) * Math.sqrt(stiffness);
        springOptions = {
          ...springOptions,
          mass: springDefaults.mass,
          stiffness,
          damping
        };
      } else {
        const derived = findSpring(options2);
        springOptions = {
          ...springOptions,
          ...derived,
          mass: springDefaults.mass
        };
        springOptions.isResolvedFromDuration = true;
      }
    }
    return springOptions;
  }
  function spring(optionsOrVisualDuration = springDefaults.visualDuration, bounce = springDefaults.bounce) {
    const options2 = typeof optionsOrVisualDuration !== "object" ? {
      visualDuration: optionsOrVisualDuration,
      keyframes: [0, 1],
      bounce
    } : optionsOrVisualDuration;
    let { restSpeed, restDelta } = options2;
    const origin = options2.keyframes[0];
    const target = options2.keyframes[options2.keyframes.length - 1];
    const state = { done: false, value: origin };
    const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = getSpringOptions({
      ...options2,
      velocity: -/* @__PURE__ */ millisecondsToSeconds(options2.velocity || 0)
    });
    const initialVelocity = velocity || 0;
    const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    const initialDelta = target - origin;
    const undampedAngularFreq = /* @__PURE__ */ millisecondsToSeconds(Math.sqrt(stiffness / mass));
    const isGranularScale = Math.abs(initialDelta) < 5;
    restSpeed || (restSpeed = isGranularScale ? springDefaults.restSpeed.granular : springDefaults.restSpeed.default);
    restDelta || (restDelta = isGranularScale ? springDefaults.restDelta.granular : springDefaults.restDelta.default);
    let resolveSpring;
    if (dampingRatio < 1) {
      const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
      resolveSpring = (t2) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
        return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t2) + initialDelta * Math.cos(angularFreq * t2));
      };
    } else if (dampingRatio === 1) {
      resolveSpring = (t2) => target - Math.exp(-undampedAngularFreq * t2) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t2);
    } else {
      const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
      resolveSpring = (t2) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
        const freqForT = Math.min(dampedAngularFreq * t2, 300);
        return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
      };
    }
    const generator = {
      calculatedDuration: isResolvedFromDuration ? duration || null : null,
      next: (t2) => {
        const current = resolveSpring(t2);
        if (!isResolvedFromDuration) {
          let currentVelocity = 0;
          if (dampingRatio < 1) {
            currentVelocity = t2 === 0 ? /* @__PURE__ */ secondsToMilliseconds(initialVelocity) : calcGeneratorVelocity(resolveSpring, t2, current);
          }
          const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
          const isBelowDisplacementThreshold = Math.abs(target - current) <= restDelta;
          state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
        } else {
          state.done = t2 >= duration;
        }
        state.value = state.done ? target : current;
        return state;
      },
      toString: () => {
        const calculatedDuration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
        const easing = generateLinearEasing((progress2) => generator.next(calculatedDuration * progress2).value, calculatedDuration, 30);
        return calculatedDuration + "ms " + easing;
      }
    };
    return generator;
  }
  function inertia({ keyframes: keyframes2, velocity = 0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed }) {
    const origin = keyframes2[0];
    const state = {
      done: false,
      value: origin
    };
    const isOutOfBounds = (v2) => min !== void 0 && v2 < min || max !== void 0 && v2 > max;
    const nearestBoundary = (v2) => {
      if (min === void 0)
        return max;
      if (max === void 0)
        return min;
      return Math.abs(min - v2) < Math.abs(max - v2) ? min : max;
    };
    let amplitude = power * velocity;
    const ideal = origin + amplitude;
    const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
    if (target !== ideal)
      amplitude = target - origin;
    const calcDelta = (t2) => -amplitude * Math.exp(-t2 / timeConstant);
    const calcLatest = (t2) => target + calcDelta(t2);
    const applyFriction = (t2) => {
      const delta = calcDelta(t2);
      const latest = calcLatest(t2);
      state.done = Math.abs(delta) <= restDelta;
      state.value = state.done ? target : latest;
    };
    let timeReachedBoundary;
    let spring$1;
    const checkCatchBoundary = (t2) => {
      if (!isOutOfBounds(state.value))
        return;
      timeReachedBoundary = t2;
      spring$1 = spring({
        keyframes: [state.value, nearestBoundary(state.value)],
        velocity: calcGeneratorVelocity(calcLatest, t2, state.value),
        // TODO: This should be passing * 1000
        damping: bounceDamping,
        stiffness: bounceStiffness,
        restDelta,
        restSpeed
      });
    };
    checkCatchBoundary(0);
    return {
      calculatedDuration: null,
      next: (t2) => {
        let hasUpdatedFrame = false;
        if (!spring$1 && timeReachedBoundary === void 0) {
          hasUpdatedFrame = true;
          applyFriction(t2);
          checkCatchBoundary(t2);
        }
        if (timeReachedBoundary !== void 0 && t2 >= timeReachedBoundary) {
          return spring$1.next(t2 - timeReachedBoundary);
        } else {
          !hasUpdatedFrame && applyFriction(t2);
          return state;
        }
      }
    };
  }
  const easeIn = /* @__PURE__ */ cubicBezier(0.42, 0, 1, 1);
  const easeOut = /* @__PURE__ */ cubicBezier(0, 0, 0.58, 1);
  const easeInOut = /* @__PURE__ */ cubicBezier(0.42, 0, 0.58, 1);
  const isEasingArray = (ease2) => {
    return Array.isArray(ease2) && typeof ease2[0] !== "number";
  };
  const easingLookup = {
    linear: noop,
    easeIn,
    easeInOut,
    easeOut,
    circIn,
    circInOut,
    circOut,
    backIn,
    backInOut,
    backOut,
    anticipate
  };
  const easingDefinitionToFunction = (definition) => {
    if (isBezierDefinition(definition)) {
      invariant(definition.length === 4);
      const [x1, y1, x2, y2] = definition;
      return cubicBezier(x1, y1, x2, y2);
    } else if (typeof definition === "string") {
      return easingLookup[definition];
    }
    return definition;
  };
  function createMixers(output, ease2, customMixer) {
    const mixers = [];
    const mixerFactory = customMixer || mix;
    const numMixers = output.length - 1;
    for (let i2 = 0; i2 < numMixers; i2++) {
      let mixer = mixerFactory(output[i2], output[i2 + 1]);
      if (ease2) {
        const easingFunction = Array.isArray(ease2) ? ease2[i2] || noop : ease2;
        mixer = pipe(easingFunction, mixer);
      }
      mixers.push(mixer);
    }
    return mixers;
  }
  function interpolate(input, output, { clamp: isClamp = true, ease: ease2, mixer } = {}) {
    const inputLength = input.length;
    invariant(inputLength === output.length);
    if (inputLength === 1)
      return () => output[0];
    if (inputLength === 2 && output[0] === output[1])
      return () => output[1];
    const isZeroDeltaRange = input[0] === input[1];
    if (input[0] > input[inputLength - 1]) {
      input = [...input].reverse();
      output = [...output].reverse();
    }
    const mixers = createMixers(output, ease2, mixer);
    const numMixers = mixers.length;
    const interpolator = (v2) => {
      if (isZeroDeltaRange && v2 < input[0])
        return output[0];
      let i2 = 0;
      if (numMixers > 1) {
        for (; i2 < input.length - 2; i2++) {
          if (v2 < input[i2 + 1])
            break;
        }
      }
      const progressInRange = /* @__PURE__ */ progress(input[i2], input[i2 + 1], v2);
      return mixers[i2](progressInRange);
    };
    return isClamp ? (v2) => interpolator(clamp(input[0], input[inputLength - 1], v2)) : interpolator;
  }
  function fillOffset(offset, remaining) {
    const min = offset[offset.length - 1];
    for (let i2 = 1; i2 <= remaining; i2++) {
      const offsetProgress = /* @__PURE__ */ progress(0, remaining, i2);
      offset.push(mixNumber$1(min, 1, offsetProgress));
    }
  }
  function defaultOffset(arr) {
    const offset = [0];
    fillOffset(offset, arr.length - 1);
    return offset;
  }
  function convertOffsetToTimes(offset, duration) {
    return offset.map((o) => o * duration);
  }
  function defaultEasing(values, easing) {
    return values.map(() => easing || easeInOut).splice(0, values.length - 1);
  }
  function keyframes({ duration = 300, keyframes: keyframeValues, times, ease: ease2 = "easeInOut" }) {
    const easingFunctions = isEasingArray(ease2) ? ease2.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease2);
    const state = {
      done: false,
      value: keyframeValues[0]
    };
    const absoluteTimes = convertOffsetToTimes(
      // Only use the provided offsets if they're the correct length
      // TODO Maybe we should warn here if there's a length mismatch
      times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues),
      duration
    );
    const mapTimeToKeyframe = interpolate(absoluteTimes, keyframeValues, {
      ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions)
    });
    return {
      calculatedDuration: duration,
      next: (t2) => {
        state.value = mapTimeToKeyframe(t2);
        state.done = t2 >= duration;
        return state;
      }
    };
  }
  const frameloopDriver = (update) => {
    const passTimestamp = ({ timestamp }) => update(timestamp);
    return {
      start: () => frame.update(passTimestamp, true),
      stop: () => cancelFrame(passTimestamp),
      /**
       * If we're processing this frame we can use the
       * framelocked timestamp to keep things in sync.
       */
      now: () => frameData.isProcessing ? frameData.timestamp : time.now()
    };
  };
  const generators = {
    decay: inertia,
    inertia,
    tween: keyframes,
    keyframes,
    spring
  };
  const percentToProgress = (percent2) => percent2 / 100;
  class MainThreadAnimation extends BaseAnimation {
    constructor(options2) {
      super(options2);
      this.holdTime = null;
      this.cancelTime = null;
      this.currentTime = 0;
      this.playbackSpeed = 1;
      this.pendingPlayState = "running";
      this.startTime = null;
      this.state = "idle";
      this.stop = () => {
        this.resolver.cancel();
        this.isStopped = true;
        if (this.state === "idle")
          return;
        this.teardown();
        const { onStop } = this.options;
        onStop && onStop();
      };
      const { name, motionValue: motionValue2, element, keyframes: keyframes2 } = this.options;
      const KeyframeResolver$1 = (element === null || element === void 0 ? void 0 : element.KeyframeResolver) || KeyframeResolver;
      const onResolved = (resolvedKeyframes, finalKeyframe) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe);
      this.resolver = new KeyframeResolver$1(keyframes2, onResolved, name, motionValue2, element);
      this.resolver.scheduleResolve();
    }
    flatten() {
      super.flatten();
      if (this._resolved) {
        Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes));
      }
    }
    initPlayback(keyframes$1) {
      const { type = "keyframes", repeat = 0, repeatDelay = 0, repeatType, velocity = 0 } = this.options;
      const generatorFactory = isGenerator(type) ? type : generators[type] || keyframes;
      let mapPercentToKeyframes;
      let mirroredGenerator;
      if (generatorFactory !== keyframes && typeof keyframes$1[0] !== "number") {
        mapPercentToKeyframes = pipe(percentToProgress, mix(keyframes$1[0], keyframes$1[1]));
        keyframes$1 = [0, 100];
      }
      const generator = generatorFactory({ ...this.options, keyframes: keyframes$1 });
      if (repeatType === "mirror") {
        mirroredGenerator = generatorFactory({
          ...this.options,
          keyframes: [...keyframes$1].reverse(),
          velocity: -velocity
        });
      }
      if (generator.calculatedDuration === null) {
        generator.calculatedDuration = calcGeneratorDuration(generator);
      }
      const { calculatedDuration } = generator;
      const resolvedDuration = calculatedDuration + repeatDelay;
      const totalDuration = resolvedDuration * (repeat + 1) - repeatDelay;
      return {
        generator,
        mirroredGenerator,
        mapPercentToKeyframes,
        calculatedDuration,
        resolvedDuration,
        totalDuration
      };
    }
    onPostResolved() {
      const { autoplay = true } = this.options;
      this.play();
      if (this.pendingPlayState === "paused" || !autoplay) {
        this.pause();
      } else {
        this.state = this.pendingPlayState;
      }
    }
    tick(timestamp, sample = false) {
      const { resolved } = this;
      if (!resolved) {
        const { keyframes: keyframes3 } = this.options;
        return { done: true, value: keyframes3[keyframes3.length - 1] };
      }
      const { finalKeyframe, generator, mirroredGenerator, mapPercentToKeyframes, keyframes: keyframes2, calculatedDuration, totalDuration, resolvedDuration } = resolved;
      if (this.startTime === null)
        return generator.next(0);
      const { delay: delay2, repeat, repeatType, repeatDelay, onUpdate } = this.options;
      if (this.speed > 0) {
        this.startTime = Math.min(this.startTime, timestamp);
      } else if (this.speed < 0) {
        this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
      }
      if (sample) {
        this.currentTime = timestamp;
      } else if (this.holdTime !== null) {
        this.currentTime = this.holdTime;
      } else {
        this.currentTime = Math.round(timestamp - this.startTime) * this.speed;
      }
      const timeWithoutDelay = this.currentTime - delay2 * (this.speed >= 0 ? 1 : -1);
      const isInDelayPhase = this.speed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
      this.currentTime = Math.max(timeWithoutDelay, 0);
      if (this.state === "finished" && this.holdTime === null) {
        this.currentTime = totalDuration;
      }
      let elapsed = this.currentTime;
      let frameGenerator = generator;
      if (repeat) {
        const progress2 = Math.min(this.currentTime, totalDuration) / resolvedDuration;
        let currentIteration = Math.floor(progress2);
        let iterationProgress = progress2 % 1;
        if (!iterationProgress && progress2 >= 1) {
          iterationProgress = 1;
        }
        iterationProgress === 1 && currentIteration--;
        currentIteration = Math.min(currentIteration, repeat + 1);
        const isOddIteration = Boolean(currentIteration % 2);
        if (isOddIteration) {
          if (repeatType === "reverse") {
            iterationProgress = 1 - iterationProgress;
            if (repeatDelay) {
              iterationProgress -= repeatDelay / resolvedDuration;
            }
          } else if (repeatType === "mirror") {
            frameGenerator = mirroredGenerator;
          }
        }
        elapsed = clamp(0, 1, iterationProgress) * resolvedDuration;
      }
      const state = isInDelayPhase ? { done: false, value: keyframes2[0] } : frameGenerator.next(elapsed);
      if (mapPercentToKeyframes) {
        state.value = mapPercentToKeyframes(state.value);
      }
      let { done } = state;
      if (!isInDelayPhase && calculatedDuration !== null) {
        done = this.speed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0;
      }
      const isAnimationFinished = this.holdTime === null && (this.state === "finished" || this.state === "running" && done);
      if (isAnimationFinished && finalKeyframe !== void 0) {
        state.value = getFinalKeyframe(keyframes2, this.options, finalKeyframe);
      }
      if (onUpdate) {
        onUpdate(state.value);
      }
      if (isAnimationFinished) {
        this.finish();
      }
      return state;
    }
    get duration() {
      const { resolved } = this;
      return resolved ? /* @__PURE__ */ millisecondsToSeconds(resolved.calculatedDuration) : 0;
    }
    get time() {
      return /* @__PURE__ */ millisecondsToSeconds(this.currentTime);
    }
    set time(newTime) {
      newTime = /* @__PURE__ */ secondsToMilliseconds(newTime);
      this.currentTime = newTime;
      if (this.holdTime !== null || this.speed === 0) {
        this.holdTime = newTime;
      } else if (this.driver) {
        this.startTime = this.driver.now() - newTime / this.speed;
      }
    }
    get speed() {
      return this.playbackSpeed;
    }
    set speed(newSpeed) {
      const hasChanged = this.playbackSpeed !== newSpeed;
      this.playbackSpeed = newSpeed;
      if (hasChanged) {
        this.time = /* @__PURE__ */ millisecondsToSeconds(this.currentTime);
      }
    }
    play() {
      if (!this.resolver.isScheduled) {
        this.resolver.resume();
      }
      if (!this._resolved) {
        this.pendingPlayState = "running";
        return;
      }
      if (this.isStopped)
        return;
      const { driver = frameloopDriver, onPlay, startTime } = this.options;
      if (!this.driver) {
        this.driver = driver((timestamp) => this.tick(timestamp));
      }
      onPlay && onPlay();
      const now2 = this.driver.now();
      if (this.holdTime !== null) {
        this.startTime = now2 - this.holdTime;
      } else if (!this.startTime) {
        this.startTime = startTime !== null && startTime !== void 0 ? startTime : this.calcStartTime();
      } else if (this.state === "finished") {
        this.startTime = now2;
      }
      if (this.state === "finished") {
        this.updateFinishedPromise();
      }
      this.cancelTime = this.startTime;
      this.holdTime = null;
      this.state = "running";
      this.driver.start();
    }
    pause() {
      var _a;
      if (!this._resolved) {
        this.pendingPlayState = "paused";
        return;
      }
      this.state = "paused";
      this.holdTime = (_a = this.currentTime) !== null && _a !== void 0 ? _a : 0;
    }
    complete() {
      if (this.state !== "running") {
        this.play();
      }
      this.pendingPlayState = this.state = "finished";
      this.holdTime = null;
    }
    finish() {
      this.teardown();
      this.state = "finished";
      const { onComplete } = this.options;
      onComplete && onComplete();
    }
    cancel() {
      if (this.cancelTime !== null) {
        this.tick(this.cancelTime);
      }
      this.teardown();
      this.updateFinishedPromise();
    }
    teardown() {
      this.state = "idle";
      this.stopDriver();
      this.resolveFinishedPromise();
      this.updateFinishedPromise();
      this.startTime = this.cancelTime = null;
      this.resolver.cancel();
    }
    stopDriver() {
      if (!this.driver)
        return;
      this.driver.stop();
      this.driver = void 0;
    }
    sample(time2) {
      this.startTime = 0;
      return this.tick(time2, true);
    }
  }
  const acceleratedValues = /* @__PURE__ */ new Set([
    "opacity",
    "clipPath",
    "filter",
    "transform"
    // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
    // or until we implement support for linear() easing.
    // "background-color"
  ]);
  function startWaapiAnimation(element, valueName, keyframes2, { delay: delay2 = 0, duration = 300, repeat = 0, repeatType = "loop", ease: ease2 = "easeInOut", times } = {}) {
    const keyframeOptions = { [valueName]: keyframes2 };
    if (times)
      keyframeOptions.offset = times;
    const easing = mapEasingToNativeEasing(ease2, duration);
    if (Array.isArray(easing))
      keyframeOptions.easing = easing;
    return element.animate(keyframeOptions, {
      delay: delay2,
      duration,
      easing: !Array.isArray(easing) ? easing : "linear",
      fill: "both",
      iterations: repeat + 1,
      direction: repeatType === "reverse" ? "alternate" : "normal"
    });
  }
  const supportsWaapi = /* @__PURE__ */ memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
  const sampleDelta = 10;
  const maxDuration = 2e4;
  function requiresPregeneratedKeyframes(options2) {
    return isGenerator(options2.type) || options2.type === "spring" || !isWaapiSupportedEasing(options2.ease);
  }
  function pregenerateKeyframes(keyframes2, options2) {
    const sampleAnimation = new MainThreadAnimation({
      ...options2,
      keyframes: keyframes2,
      repeat: 0,
      delay: 0,
      isGenerator: true
    });
    let state = { done: false, value: keyframes2[0] };
    const pregeneratedKeyframes = [];
    let t2 = 0;
    while (!state.done && t2 < maxDuration) {
      state = sampleAnimation.sample(t2);
      pregeneratedKeyframes.push(state.value);
      t2 += sampleDelta;
    }
    return {
      times: void 0,
      keyframes: pregeneratedKeyframes,
      duration: t2 - sampleDelta,
      ease: "linear"
    };
  }
  const unsupportedEasingFunctions = {
    anticipate,
    backInOut,
    circInOut
  };
  function isUnsupportedEase(key) {
    return key in unsupportedEasingFunctions;
  }
  class AcceleratedAnimation extends BaseAnimation {
    constructor(options2) {
      super(options2);
      const { name, motionValue: motionValue2, element, keyframes: keyframes2 } = this.options;
      this.resolver = new DOMKeyframesResolver(keyframes2, (resolvedKeyframes, finalKeyframe) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe), name, motionValue2, element);
      this.resolver.scheduleResolve();
    }
    initPlayback(keyframes2, finalKeyframe) {
      let { duration = 300, times, ease: ease2, type, motionValue: motionValue2, name, startTime } = this.options;
      if (!motionValue2.owner || !motionValue2.owner.current) {
        return false;
      }
      if (typeof ease2 === "string" && supportsLinearEasing() && isUnsupportedEase(ease2)) {
        ease2 = unsupportedEasingFunctions[ease2];
      }
      if (requiresPregeneratedKeyframes(this.options)) {
        const { onComplete, onUpdate, motionValue: motionValue3, element, ...options2 } = this.options;
        const pregeneratedAnimation = pregenerateKeyframes(keyframes2, options2);
        keyframes2 = pregeneratedAnimation.keyframes;
        if (keyframes2.length === 1) {
          keyframes2[1] = keyframes2[0];
        }
        duration = pregeneratedAnimation.duration;
        times = pregeneratedAnimation.times;
        ease2 = pregeneratedAnimation.ease;
        type = "keyframes";
      }
      const animation = startWaapiAnimation(motionValue2.owner.current, name, keyframes2, { ...this.options, duration, times, ease: ease2 });
      animation.startTime = startTime !== null && startTime !== void 0 ? startTime : this.calcStartTime();
      if (this.pendingTimeline) {
        attachTimeline(animation, this.pendingTimeline);
        this.pendingTimeline = void 0;
      } else {
        animation.onfinish = () => {
          const { onComplete } = this.options;
          motionValue2.set(getFinalKeyframe(keyframes2, this.options, finalKeyframe));
          onComplete && onComplete();
          this.cancel();
          this.resolveFinishedPromise();
        };
      }
      return {
        animation,
        duration,
        times,
        type,
        ease: ease2,
        keyframes: keyframes2
      };
    }
    get duration() {
      const { resolved } = this;
      if (!resolved)
        return 0;
      const { duration } = resolved;
      return /* @__PURE__ */ millisecondsToSeconds(duration);
    }
    get time() {
      const { resolved } = this;
      if (!resolved)
        return 0;
      const { animation } = resolved;
      return /* @__PURE__ */ millisecondsToSeconds(animation.currentTime || 0);
    }
    set time(newTime) {
      const { resolved } = this;
      if (!resolved)
        return;
      const { animation } = resolved;
      animation.currentTime = /* @__PURE__ */ secondsToMilliseconds(newTime);
    }
    get speed() {
      const { resolved } = this;
      if (!resolved)
        return 1;
      const { animation } = resolved;
      return animation.playbackRate;
    }
    set speed(newSpeed) {
      const { resolved } = this;
      if (!resolved)
        return;
      const { animation } = resolved;
      animation.playbackRate = newSpeed;
    }
    get state() {
      const { resolved } = this;
      if (!resolved)
        return "idle";
      const { animation } = resolved;
      return animation.playState;
    }
    get startTime() {
      const { resolved } = this;
      if (!resolved)
        return null;
      const { animation } = resolved;
      return animation.startTime;
    }
    /**
     * Replace the default DocumentTimeline with another AnimationTimeline.
     * Currently used for scroll animations.
     */
    attachTimeline(timeline) {
      if (!this._resolved) {
        this.pendingTimeline = timeline;
      } else {
        const { resolved } = this;
        if (!resolved)
          return noop;
        const { animation } = resolved;
        attachTimeline(animation, timeline);
      }
      return noop;
    }
    play() {
      if (this.isStopped)
        return;
      const { resolved } = this;
      if (!resolved)
        return;
      const { animation } = resolved;
      if (animation.playState === "finished") {
        this.updateFinishedPromise();
      }
      animation.play();
    }
    pause() {
      const { resolved } = this;
      if (!resolved)
        return;
      const { animation } = resolved;
      animation.pause();
    }
    stop() {
      this.resolver.cancel();
      this.isStopped = true;
      if (this.state === "idle")
        return;
      this.resolveFinishedPromise();
      this.updateFinishedPromise();
      const { resolved } = this;
      if (!resolved)
        return;
      const { animation, keyframes: keyframes2, duration, type, ease: ease2, times } = resolved;
      if (animation.playState === "idle" || animation.playState === "finished") {
        return;
      }
      if (this.time) {
        const { motionValue: motionValue2, onUpdate, onComplete, element, ...options2 } = this.options;
        const sampleAnimation = new MainThreadAnimation({
          ...options2,
          keyframes: keyframes2,
          duration,
          type,
          ease: ease2,
          times,
          isGenerator: true
        });
        const sampleTime = /* @__PURE__ */ secondsToMilliseconds(this.time);
        motionValue2.setWithVelocity(sampleAnimation.sample(sampleTime - sampleDelta).value, sampleAnimation.sample(sampleTime).value, sampleDelta);
      }
      const { onStop } = this.options;
      onStop && onStop();
      this.cancel();
    }
    complete() {
      const { resolved } = this;
      if (!resolved)
        return;
      resolved.animation.finish();
    }
    cancel() {
      const { resolved } = this;
      if (!resolved)
        return;
      resolved.animation.cancel();
    }
    static supports(options2) {
      const { motionValue: motionValue2, name, repeatDelay, repeatType, damping, type } = options2;
      if (!motionValue2 || !motionValue2.owner || !(motionValue2.owner.current instanceof HTMLElement)) {
        return false;
      }
      const { onUpdate, transformTemplate } = motionValue2.owner.getProps();
      return supportsWaapi() && name && acceleratedValues.has(name) && /**
       * If we're outputting values to onUpdate then we can't use WAAPI as there's
       * no way to read the value from WAAPI every frame.
       */
      !onUpdate && !transformTemplate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
    }
  }
  const underDampedSpring = {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10
  };
  const criticallyDampedSpring = (target) => ({
    type: "spring",
    stiffness: 550,
    damping: target === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10
  });
  const keyframesTransition = {
    type: "keyframes",
    duration: 0.8
  };
  const ease = {
    type: "keyframes",
    ease: [0.25, 0.1, 0.35, 1],
    duration: 0.3
  };
  const getDefaultTransition = (valueKey, { keyframes: keyframes2 }) => {
    if (keyframes2.length > 2) {
      return keyframesTransition;
    } else if (transformProps.has(valueKey)) {
      return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes2[1]) : underDampedSpring;
    }
    return ease;
  };
  function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, elapsed, ...transition }) {
    return !!Object.keys(transition).length;
  }
  const animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
    const valueTransition = getValueTransition(transition, name) || {};
    const delay2 = valueTransition.delay || transition.delay || 0;
    let { elapsed = 0 } = transition;
    elapsed = elapsed - /* @__PURE__ */ secondsToMilliseconds(delay2);
    let options2 = {
      keyframes: Array.isArray(target) ? target : [null, target],
      ease: "easeOut",
      velocity: value.getVelocity(),
      ...valueTransition,
      delay: -elapsed,
      onUpdate: (v2) => {
        value.set(v2);
        valueTransition.onUpdate && valueTransition.onUpdate(v2);
      },
      onComplete: () => {
        onComplete();
        valueTransition.onComplete && valueTransition.onComplete();
      },
      name,
      motionValue: value,
      element: isHandoff ? void 0 : element
    };
    if (!isTransitionDefined(valueTransition)) {
      options2 = {
        ...options2,
        ...getDefaultTransition(name, options2)
      };
    }
    if (options2.duration) {
      options2.duration = /* @__PURE__ */ secondsToMilliseconds(options2.duration);
    }
    if (options2.repeatDelay) {
      options2.repeatDelay = /* @__PURE__ */ secondsToMilliseconds(options2.repeatDelay);
    }
    if (options2.from !== void 0) {
      options2.keyframes[0] = options2.from;
    }
    let shouldSkip = false;
    if (options2.type === false || options2.duration === 0 && !options2.repeatDelay) {
      options2.duration = 0;
      if (options2.delay === 0) {
        shouldSkip = true;
      }
    }
    if (shouldSkip && !isHandoff && value.get() !== void 0) {
      const finalKeyframe = getFinalKeyframe(options2.keyframes, valueTransition);
      if (finalKeyframe !== void 0) {
        frame.update(() => {
          options2.onUpdate(finalKeyframe);
          options2.onComplete();
        });
        return new GroupPlaybackControls([]);
      }
    }
    if (!isHandoff && AcceleratedAnimation.supports(options2)) {
      return new AcceleratedAnimation(options2);
    } else {
      return new MainThreadAnimation(options2);
    }
  };
  function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
    const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
    needsAnimating[key] = false;
    return shouldBlock;
  }
  function animateTarget(visualElement, targetAndTransition, { delay: delay2 = 0, transitionOverride, type } = {}) {
    var _a;
    let { transition = visualElement.getDefaultTransition(), transitionEnd, ...target } = targetAndTransition;
    if (transitionOverride)
      transition = transitionOverride;
    const animations2 = [];
    const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
    for (const key in target) {
      const value = visualElement.getValue(key, (_a = visualElement.latestValues[key]) !== null && _a !== void 0 ? _a : null);
      const valueTarget = target[key];
      if (valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
        continue;
      }
      const valueTransition = {
        delay: delay2,
        ...getValueTransition(transition || {}, key)
      };
      let isHandoff = false;
      if (window.MotionHandoffAnimation) {
        const appearId = getOptimisedAppearId(visualElement);
        if (appearId) {
          const startTime = window.MotionHandoffAnimation(appearId, key, frame);
          if (startTime !== null) {
            valueTransition.startTime = startTime;
            isHandoff = true;
          }
        }
      }
      addValueToWillChange(visualElement, key);
      value.start(animateMotionValue(key, value, valueTarget, visualElement.shouldReduceMotion && positionalKeys.has(key) ? { type: false } : valueTransition, visualElement, isHandoff));
      const animation = value.animation;
      if (animation) {
        animations2.push(animation);
      }
    }
    if (transitionEnd) {
      Promise.all(animations2).then(() => {
        frame.update(() => {
          transitionEnd && setTarget(visualElement, transitionEnd);
        });
      });
    }
    return animations2;
  }
  function animateVariant(visualElement, variant, options2 = {}) {
    var _a;
    const resolved = resolveVariant(visualElement, variant, options2.type === "exit" ? (_a = visualElement.presenceContext) === null || _a === void 0 ? void 0 : _a.custom : void 0);
    let { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
    if (options2.transitionOverride) {
      transition = options2.transitionOverride;
    }
    const getAnimation = resolved ? () => Promise.all(animateTarget(visualElement, resolved, options2)) : () => Promise.resolve();
    const getChildAnimations = visualElement.variantChildren && visualElement.variantChildren.size ? (forwardDelay = 0) => {
      const { delayChildren = 0, staggerChildren, staggerDirection } = transition;
      return animateChildren(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options2);
    } : () => Promise.resolve();
    const { when } = transition;
    if (when) {
      const [first, last] = when === "beforeChildren" ? [getAnimation, getChildAnimations] : [getChildAnimations, getAnimation];
      return first().then(() => last());
    } else {
      return Promise.all([getAnimation(), getChildAnimations(options2.delay)]);
    }
  }
  function animateChildren(visualElement, variant, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options2) {
    const animations2 = [];
    const maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren;
    const generateStaggerDuration = staggerDirection === 1 ? (i2 = 0) => i2 * staggerChildren : (i2 = 0) => maxStaggerDuration - i2 * staggerChildren;
    Array.from(visualElement.variantChildren).sort(sortByTreeOrder).forEach((child, i2) => {
      child.notify("AnimationStart", variant);
      animations2.push(animateVariant(child, variant, {
        ...options2,
        delay: delayChildren + generateStaggerDuration(i2)
      }).then(() => child.notify("AnimationComplete", variant)));
    });
    return Promise.all(animations2);
  }
  function sortByTreeOrder(a2, b) {
    return a2.sortNodePosition(b);
  }
  function animateVisualElement(visualElement, definition, options2 = {}) {
    visualElement.notify("AnimationStart", definition);
    let animation;
    if (Array.isArray(definition)) {
      const animations2 = definition.map((variant) => animateVariant(visualElement, variant, options2));
      animation = Promise.all(animations2);
    } else if (typeof definition === "string") {
      animation = animateVariant(visualElement, definition, options2);
    } else {
      const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement, definition, options2.custom) : definition;
      animation = Promise.all(animateTarget(visualElement, resolvedDefinition, options2));
    }
    return animation.then(() => {
      visualElement.notify("AnimationComplete", definition);
    });
  }
  const numVariantProps = variantProps.length;
  function getVariantContext(visualElement) {
    if (!visualElement)
      return void 0;
    if (!visualElement.isControllingVariants) {
      const context2 = visualElement.parent ? getVariantContext(visualElement.parent) || {} : {};
      if (visualElement.props.initial !== void 0) {
        context2.initial = visualElement.props.initial;
      }
      return context2;
    }
    const context = {};
    for (let i2 = 0; i2 < numVariantProps; i2++) {
      const name = variantProps[i2];
      const prop = visualElement.props[name];
      if (isVariantLabel(prop) || prop === false) {
        context[name] = prop;
      }
    }
    return context;
  }
  const reversePriorityOrder = [...variantPriorityOrder].reverse();
  const numAnimationTypes = variantPriorityOrder.length;
  function animateList(visualElement) {
    return (animations2) => Promise.all(animations2.map(({ animation, options: options2 }) => animateVisualElement(visualElement, animation, options2)));
  }
  function createAnimationState(visualElement) {
    let animate = animateList(visualElement);
    let state = createState();
    let isInitialRender = true;
    const buildResolvedTypeValues = (type) => (acc, definition) => {
      var _a;
      const resolved = resolveVariant(visualElement, definition, type === "exit" ? (_a = visualElement.presenceContext) === null || _a === void 0 ? void 0 : _a.custom : void 0);
      if (resolved) {
        const { transition, transitionEnd, ...target } = resolved;
        acc = { ...acc, ...target, ...transitionEnd };
      }
      return acc;
    };
    function setAnimateFunction(makeAnimator) {
      animate = makeAnimator(visualElement);
    }
    function animateChanges(changedActiveType) {
      const { props } = visualElement;
      const context = getVariantContext(visualElement.parent) || {};
      const animations2 = [];
      const removedKeys = /* @__PURE__ */ new Set();
      let encounteredKeys = {};
      let removedVariantIndex = Infinity;
      for (let i2 = 0; i2 < numAnimationTypes; i2++) {
        const type = reversePriorityOrder[i2];
        const typeState = state[type];
        const prop = props[type] !== void 0 ? props[type] : context[type];
        const propIsVariant = isVariantLabel(prop);
        const activeDelta = type === changedActiveType ? typeState.isActive : null;
        if (activeDelta === false)
          removedVariantIndex = i2;
        let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
        if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) {
          isInherited = false;
        }
        typeState.protectedKeys = { ...encounteredKeys };
        if (
          // If it isn't active and hasn't *just* been set as inactive
          !typeState.isActive && activeDelta === null || // If we didn't and don't have any defined prop for this animation type
          !prop && !typeState.prevProp || // Or if the prop doesn't define an animation
          isAnimationControls(prop) || typeof prop === "boolean"
        ) {
          continue;
        }
        const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
        let shouldAnimateType = variantDidChange || // If we're making this variant active, we want to always make it active
        type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || // If we removed a higher-priority variant (i is in reverse order)
        i2 > removedVariantIndex && propIsVariant;
        let handledRemovedValues = false;
        const definitionList = Array.isArray(prop) ? prop : [prop];
        let resolvedValues = definitionList.reduce(buildResolvedTypeValues(type), {});
        if (activeDelta === false)
          resolvedValues = {};
        const { prevResolvedValues = {} } = typeState;
        const allKeys = {
          ...prevResolvedValues,
          ...resolvedValues
        };
        const markToAnimate = (key) => {
          shouldAnimateType = true;
          if (removedKeys.has(key)) {
            handledRemovedValues = true;
            removedKeys.delete(key);
          }
          typeState.needsAnimating[key] = true;
          const motionValue2 = visualElement.getValue(key);
          if (motionValue2)
            motionValue2.liveStyle = false;
        };
        for (const key in allKeys) {
          const next = resolvedValues[key];
          const prev = prevResolvedValues[key];
          if (encounteredKeys.hasOwnProperty(key))
            continue;
          let valueHasChanged = false;
          if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
            valueHasChanged = !shallowCompare(next, prev);
          } else {
            valueHasChanged = next !== prev;
          }
          if (valueHasChanged) {
            if (next !== void 0 && next !== null) {
              markToAnimate(key);
            } else {
              removedKeys.add(key);
            }
          } else if (next !== void 0 && removedKeys.has(key)) {
            markToAnimate(key);
          } else {
            typeState.protectedKeys[key] = true;
          }
        }
        typeState.prevProp = prop;
        typeState.prevResolvedValues = resolvedValues;
        if (typeState.isActive) {
          encounteredKeys = { ...encounteredKeys, ...resolvedValues };
        }
        if (isInitialRender && visualElement.blockInitialAnimation) {
          shouldAnimateType = false;
        }
        const willAnimateViaParent = isInherited && variantDidChange;
        const needsAnimating = !willAnimateViaParent || handledRemovedValues;
        if (shouldAnimateType && needsAnimating) {
          animations2.push(...definitionList.map((animation) => ({
            animation,
            options: { type }
          })));
        }
      }
      if (removedKeys.size) {
        const fallbackAnimation = {};
        removedKeys.forEach((key) => {
          const fallbackTarget = visualElement.getBaseTarget(key);
          const motionValue2 = visualElement.getValue(key);
          if (motionValue2)
            motionValue2.liveStyle = true;
          fallbackAnimation[key] = fallbackTarget !== null && fallbackTarget !== void 0 ? fallbackTarget : null;
        });
        animations2.push({ animation: fallbackAnimation });
      }
      let shouldAnimate = Boolean(animations2.length);
      if (isInitialRender && (props.initial === false || props.initial === props.animate) && !visualElement.manuallyAnimateOnMount) {
        shouldAnimate = false;
      }
      isInitialRender = false;
      return shouldAnimate ? animate(animations2) : Promise.resolve();
    }
    function setActive(type, isActive) {
      var _a;
      if (state[type].isActive === isActive)
        return Promise.resolve();
      (_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
        var _a2;
        return (_a2 = child.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(type, isActive);
      });
      state[type].isActive = isActive;
      const animations2 = animateChanges(type);
      for (const key in state) {
        state[key].protectedKeys = {};
      }
      return animations2;
    }
    return {
      animateChanges,
      setActive,
      setAnimateFunction,
      getState: () => state,
      reset: () => {
        state = createState();
        isInitialRender = true;
      }
    };
  }
  function checkVariantsDidChange(prev, next) {
    if (typeof next === "string") {
      return next !== prev;
    } else if (Array.isArray(next)) {
      return !shallowCompare(next, prev);
    }
    return false;
  }
  function createTypeState(isActive = false) {
    return {
      isActive,
      protectedKeys: {},
      needsAnimating: {},
      prevResolvedValues: {}
    };
  }
  function createState() {
    return {
      animate: createTypeState(true),
      whileInView: createTypeState(),
      whileHover: createTypeState(),
      whileTap: createTypeState(),
      whileDrag: createTypeState(),
      whileFocus: createTypeState(),
      exit: createTypeState()
    };
  }
  class Feature {
    constructor(node) {
      this.isMounted = false;
      this.node = node;
    }
    update() {
    }
  }
  class AnimationFeature extends Feature {
    /**
     * We dynamically generate the AnimationState manager as it contains a reference
     * to the underlying animation library. We only want to load that if we load this,
     * so people can optionally code split it out using the `m` component.
     */
    constructor(node) {
      super(node);
      node.animationState || (node.animationState = createAnimationState(node));
    }
    updateAnimationControlsSubscription() {
      const { animate } = this.node.getProps();
      if (isAnimationControls(animate)) {
        this.unmountControls = animate.subscribe(this.node);
      }
    }
    /**
     * Subscribe any provided AnimationControls to the component's VisualElement
     */
    mount() {
      this.updateAnimationControlsSubscription();
    }
    update() {
      const { animate } = this.node.getProps();
      const { animate: prevAnimate } = this.node.prevProps || {};
      if (animate !== prevAnimate) {
        this.updateAnimationControlsSubscription();
      }
    }
    unmount() {
      var _a;
      this.node.animationState.reset();
      (_a = this.unmountControls) === null || _a === void 0 ? void 0 : _a.call(this);
    }
  }
  let id$1 = 0;
  class ExitAnimationFeature extends Feature {
    constructor() {
      super(...arguments);
      this.id = id$1++;
    }
    update() {
      if (!this.node.presenceContext)
        return;
      const { isPresent, onExitComplete } = this.node.presenceContext;
      const { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
      if (!this.node.animationState || isPresent === prevIsPresent) {
        return;
      }
      const exitAnimation = this.node.animationState.setActive("exit", !isPresent);
      if (onExitComplete && !isPresent) {
        exitAnimation.then(() => onExitComplete(this.id));
      }
    }
    mount() {
      const { register } = this.node.presenceContext || {};
      if (register) {
        this.unmount = register(this.id);
      }
    }
    unmount() {
    }
  }
  const animations = {
    animation: {
      Feature: AnimationFeature
    },
    exit: {
      Feature: ExitAnimationFeature
    }
  };
  function addDomEvent(target, eventName, handler, options2 = { passive: true }) {
    target.addEventListener(eventName, handler, options2);
    return () => target.removeEventListener(eventName, handler);
  }
  function extractEventInfo(event) {
    return {
      point: {
        x: event.pageX,
        y: event.pageY
      }
    };
  }
  const addPointerInfo = (handler) => {
    return (event) => isPrimaryPointer(event) && handler(event, extractEventInfo(event));
  };
  function addPointerEvent(target, eventName, handler, options2) {
    return addDomEvent(target, eventName, addPointerInfo(handler), options2);
  }
  const distance = (a2, b) => Math.abs(a2 - b);
  function distance2D(a2, b) {
    const xDelta = distance(a2.x, b.x);
    const yDelta = distance(a2.y, b.y);
    return Math.sqrt(xDelta ** 2 + yDelta ** 2);
  }
  class PanSession {
    constructor(event, handlers, { transformPagePoint, contextWindow, dragSnapToOrigin = false } = {}) {
      this.startEvent = null;
      this.lastMoveEvent = null;
      this.lastMoveEventInfo = null;
      this.handlers = {};
      this.contextWindow = window;
      this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo))
          return;
        const info2 = getPanInfo(this.lastMoveEventInfo, this.history);
        const isPanStarted = this.startEvent !== null;
        const isDistancePastThreshold = distance2D(info2.offset, { x: 0, y: 0 }) >= 3;
        if (!isPanStarted && !isDistancePastThreshold)
          return;
        const { point: point2 } = info2;
        const { timestamp: timestamp2 } = frameData;
        this.history.push({ ...point2, timestamp: timestamp2 });
        const { onStart, onMove } = this.handlers;
        if (!isPanStarted) {
          onStart && onStart(this.lastMoveEvent, info2);
          this.startEvent = this.lastMoveEvent;
        }
        onMove && onMove(this.lastMoveEvent, info2);
      };
      this.handlePointerMove = (event2, info2) => {
        this.lastMoveEvent = event2;
        this.lastMoveEventInfo = transformPoint(info2, this.transformPagePoint);
        frame.update(this.updatePoint, true);
      };
      this.handlePointerUp = (event2, info2) => {
        this.end();
        const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
        if (this.dragSnapToOrigin)
          resumeAnimation && resumeAnimation();
        if (!(this.lastMoveEvent && this.lastMoveEventInfo))
          return;
        const panInfo = getPanInfo(event2.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(info2, this.transformPagePoint), this.history);
        if (this.startEvent && onEnd) {
          onEnd(event2, panInfo);
        }
        onSessionEnd && onSessionEnd(event2, panInfo);
      };
      if (!isPrimaryPointer(event))
        return;
      this.dragSnapToOrigin = dragSnapToOrigin;
      this.handlers = handlers;
      this.transformPagePoint = transformPagePoint;
      this.contextWindow = contextWindow || window;
      const info = extractEventInfo(event);
      const initialInfo = transformPoint(info, this.transformPagePoint);
      const { point } = initialInfo;
      const { timestamp } = frameData;
      this.history = [{ ...point, timestamp }];
      const { onSessionStart } = handlers;
      onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
      this.removeListeners = pipe(addPointerEvent(this.contextWindow, "pointermove", this.handlePointerMove), addPointerEvent(this.contextWindow, "pointerup", this.handlePointerUp), addPointerEvent(this.contextWindow, "pointercancel", this.handlePointerUp));
    }
    updateHandlers(handlers) {
      this.handlers = handlers;
    }
    end() {
      this.removeListeners && this.removeListeners();
      cancelFrame(this.updatePoint);
    }
  }
  function transformPoint(info, transformPagePoint) {
    return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
  }
  function subtractPoint(a2, b) {
    return { x: a2.x - b.x, y: a2.y - b.y };
  }
  function getPanInfo({ point }, history) {
    return {
      point,
      delta: subtractPoint(point, lastDevicePoint(history)),
      offset: subtractPoint(point, startDevicePoint(history)),
      velocity: getVelocity(history, 0.1)
    };
  }
  function startDevicePoint(history) {
    return history[0];
  }
  function lastDevicePoint(history) {
    return history[history.length - 1];
  }
  function getVelocity(history, timeDelta) {
    if (history.length < 2) {
      return { x: 0, y: 0 };
    }
    let i2 = history.length - 1;
    let timestampedPoint = null;
    const lastPoint = lastDevicePoint(history);
    while (i2 >= 0) {
      timestampedPoint = history[i2];
      if (lastPoint.timestamp - timestampedPoint.timestamp > /* @__PURE__ */ secondsToMilliseconds(timeDelta)) {
        break;
      }
      i2--;
    }
    if (!timestampedPoint) {
      return { x: 0, y: 0 };
    }
    const time2 = /* @__PURE__ */ millisecondsToSeconds(lastPoint.timestamp - timestampedPoint.timestamp);
    if (time2 === 0) {
      return { x: 0, y: 0 };
    }
    const currentVelocity = {
      x: (lastPoint.x - timestampedPoint.x) / time2,
      y: (lastPoint.y - timestampedPoint.y) / time2
    };
    if (currentVelocity.x === Infinity) {
      currentVelocity.x = 0;
    }
    if (currentVelocity.y === Infinity) {
      currentVelocity.y = 0;
    }
    return currentVelocity;
  }
  const SCALE_PRECISION = 1e-4;
  const SCALE_MIN = 1 - SCALE_PRECISION;
  const SCALE_MAX = 1 + SCALE_PRECISION;
  const TRANSLATE_PRECISION = 0.01;
  const TRANSLATE_MIN = 0 - TRANSLATE_PRECISION;
  const TRANSLATE_MAX = 0 + TRANSLATE_PRECISION;
  function calcLength(axis) {
    return axis.max - axis.min;
  }
  function isNear(value, target, maxDistance) {
    return Math.abs(value - target) <= maxDistance;
  }
  function calcAxisDelta(delta, source, target, origin = 0.5) {
    delta.origin = origin;
    delta.originPoint = mixNumber$1(source.min, source.max, delta.origin);
    delta.scale = calcLength(target) / calcLength(source);
    delta.translate = mixNumber$1(target.min, target.max, delta.origin) - delta.originPoint;
    if (delta.scale >= SCALE_MIN && delta.scale <= SCALE_MAX || isNaN(delta.scale)) {
      delta.scale = 1;
    }
    if (delta.translate >= TRANSLATE_MIN && delta.translate <= TRANSLATE_MAX || isNaN(delta.translate)) {
      delta.translate = 0;
    }
  }
  function calcBoxDelta(delta, source, target, origin) {
    calcAxisDelta(delta.x, source.x, target.x, origin ? origin.originX : void 0);
    calcAxisDelta(delta.y, source.y, target.y, origin ? origin.originY : void 0);
  }
  function calcRelativeAxis(target, relative, parent) {
    target.min = parent.min + relative.min;
    target.max = target.min + calcLength(relative);
  }
  function calcRelativeBox(target, relative, parent) {
    calcRelativeAxis(target.x, relative.x, parent.x);
    calcRelativeAxis(target.y, relative.y, parent.y);
  }
  function calcRelativeAxisPosition(target, layout2, parent) {
    target.min = layout2.min - parent.min;
    target.max = target.min + calcLength(layout2);
  }
  function calcRelativePosition(target, layout2, parent) {
    calcRelativeAxisPosition(target.x, layout2.x, parent.x);
    calcRelativeAxisPosition(target.y, layout2.y, parent.y);
  }
  function applyConstraints(point, { min, max }, elastic) {
    if (min !== void 0 && point < min) {
      point = elastic ? mixNumber$1(min, point, elastic.min) : Math.max(point, min);
    } else if (max !== void 0 && point > max) {
      point = elastic ? mixNumber$1(max, point, elastic.max) : Math.min(point, max);
    }
    return point;
  }
  function calcRelativeAxisConstraints(axis, min, max) {
    return {
      min: min !== void 0 ? axis.min + min : void 0,
      max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
    };
  }
  function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
    return {
      x: calcRelativeAxisConstraints(layoutBox.x, left, right),
      y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
    };
  }
  function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
    let min = constraintsAxis.min - layoutAxis.min;
    let max = constraintsAxis.max - layoutAxis.max;
    if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
      [min, max] = [max, min];
    }
    return { min, max };
  }
  function calcViewportConstraints(layoutBox, constraintsBox) {
    return {
      x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
      y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
    };
  }
  function calcOrigin(source, target) {
    let origin = 0.5;
    const sourceLength = calcLength(source);
    const targetLength = calcLength(target);
    if (targetLength > sourceLength) {
      origin = /* @__PURE__ */ progress(target.min, target.max - sourceLength, source.min);
    } else if (sourceLength > targetLength) {
      origin = /* @__PURE__ */ progress(source.min, source.max - targetLength, target.min);
    }
    return clamp(0, 1, origin);
  }
  function rebaseAxisConstraints(layout2, constraints) {
    const relativeConstraints = {};
    if (constraints.min !== void 0) {
      relativeConstraints.min = constraints.min - layout2.min;
    }
    if (constraints.max !== void 0) {
      relativeConstraints.max = constraints.max - layout2.min;
    }
    return relativeConstraints;
  }
  const defaultElastic = 0.35;
  function resolveDragElastic(dragElastic = defaultElastic) {
    if (dragElastic === false) {
      dragElastic = 0;
    } else if (dragElastic === true) {
      dragElastic = defaultElastic;
    }
    return {
      x: resolveAxisElastic(dragElastic, "left", "right"),
      y: resolveAxisElastic(dragElastic, "top", "bottom")
    };
  }
  function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
    return {
      min: resolvePointElastic(dragElastic, minLabel),
      max: resolvePointElastic(dragElastic, maxLabel)
    };
  }
  function resolvePointElastic(dragElastic, label) {
    return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
  }
  const createAxisDelta = () => ({
    translate: 0,
    scale: 1,
    origin: 0,
    originPoint: 0
  });
  const createDelta = () => ({
    x: createAxisDelta(),
    y: createAxisDelta()
  });
  const createAxis = () => ({ min: 0, max: 0 });
  const createBox = () => ({
    x: createAxis(),
    y: createAxis()
  });
  function eachAxis(callback) {
    return [callback("x"), callback("y")];
  }
  function convertBoundingBoxToBox({ top, left, right, bottom }) {
    return {
      x: { min: left, max: right },
      y: { min: top, max: bottom }
    };
  }
  function convertBoxToBoundingBox({ x: x2, y: y2 }) {
    return { top: y2.min, right: x2.max, bottom: y2.max, left: x2.min };
  }
  function transformBoxPoints(point, transformPoint2) {
    if (!transformPoint2)
      return point;
    const topLeft = transformPoint2({ x: point.left, y: point.top });
    const bottomRight = transformPoint2({ x: point.right, y: point.bottom });
    return {
      top: topLeft.y,
      left: topLeft.x,
      bottom: bottomRight.y,
      right: bottomRight.x
    };
  }
  function isIdentityScale(scale2) {
    return scale2 === void 0 || scale2 === 1;
  }
  function hasScale({ scale: scale2, scaleX, scaleY }) {
    return !isIdentityScale(scale2) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
  }
  function hasTransform(values) {
    return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY || values.skewX || values.skewY;
  }
  function has2DTranslate(values) {
    return is2DTranslate(values.x) || is2DTranslate(values.y);
  }
  function is2DTranslate(value) {
    return value && value !== "0%";
  }
  function scalePoint(point, scale2, originPoint) {
    const distanceFromOrigin = point - originPoint;
    const scaled = scale2 * distanceFromOrigin;
    return originPoint + scaled;
  }
  function applyPointDelta(point, translate, scale2, originPoint, boxScale) {
    if (boxScale !== void 0) {
      point = scalePoint(point, boxScale, originPoint);
    }
    return scalePoint(point, scale2, originPoint) + translate;
  }
  function applyAxisDelta(axis, translate = 0, scale2 = 1, originPoint, boxScale) {
    axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale);
    axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale);
  }
  function applyBoxDelta(box, { x: x2, y: y2 }) {
    applyAxisDelta(box.x, x2.translate, x2.scale, x2.originPoint);
    applyAxisDelta(box.y, y2.translate, y2.scale, y2.originPoint);
  }
  const TREE_SCALE_SNAP_MIN = 0.999999999999;
  const TREE_SCALE_SNAP_MAX = 1.0000000000001;
  function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
    const treeLength = treePath.length;
    if (!treeLength)
      return;
    treeScale.x = treeScale.y = 1;
    let node;
    let delta;
    for (let i2 = 0; i2 < treeLength; i2++) {
      node = treePath[i2];
      delta = node.projectionDelta;
      const { visualElement } = node.options;
      if (visualElement && visualElement.props.style && visualElement.props.style.display === "contents") {
        continue;
      }
      if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
        transformBox(box, {
          x: -node.scroll.offset.x,
          y: -node.scroll.offset.y
        });
      }
      if (delta) {
        treeScale.x *= delta.x.scale;
        treeScale.y *= delta.y.scale;
        applyBoxDelta(box, delta);
      }
      if (isSharedTransition && hasTransform(node.latestValues)) {
        transformBox(box, node.latestValues);
      }
    }
    if (treeScale.x < TREE_SCALE_SNAP_MAX && treeScale.x > TREE_SCALE_SNAP_MIN) {
      treeScale.x = 1;
    }
    if (treeScale.y < TREE_SCALE_SNAP_MAX && treeScale.y > TREE_SCALE_SNAP_MIN) {
      treeScale.y = 1;
    }
  }
  function translateAxis(axis, distance2) {
    axis.min = axis.min + distance2;
    axis.max = axis.max + distance2;
  }
  function transformAxis(axis, axisTranslate, axisScale, boxScale, axisOrigin = 0.5) {
    const originPoint = mixNumber$1(axis.min, axis.max, axisOrigin);
    applyAxisDelta(axis, axisTranslate, axisScale, originPoint, boxScale);
  }
  function transformBox(box, transform) {
    transformAxis(box.x, transform.x, transform.scaleX, transform.scale, transform.originX);
    transformAxis(box.y, transform.y, transform.scaleY, transform.scale, transform.originY);
  }
  function measureViewportBox(instance, transformPoint2) {
    return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint2));
  }
  function measurePageBox(element, rootProjectionNode2, transformPagePoint) {
    const viewportBox = measureViewportBox(element, transformPagePoint);
    const { scroll } = rootProjectionNode2;
    if (scroll) {
      translateAxis(viewportBox.x, scroll.offset.x);
      translateAxis(viewportBox.y, scroll.offset.y);
    }
    return viewportBox;
  }
  const getContextWindow = ({ current }) => {
    return current ? current.ownerDocument.defaultView : null;
  };
  const elementDragControls = /* @__PURE__ */ new WeakMap();
  class VisualElementDragControls {
    constructor(visualElement) {
      this.openDragLock = null;
      this.isDragging = false;
      this.currentDirection = null;
      this.originPoint = { x: 0, y: 0 };
      this.constraints = false;
      this.hasMutatedConstraints = false;
      this.elastic = createBox();
      this.visualElement = visualElement;
    }
    start(originEvent, { snapToCursor = false } = {}) {
      const { presenceContext } = this.visualElement;
      if (presenceContext && presenceContext.isPresent === false)
        return;
      const onSessionStart = (event) => {
        const { dragSnapToOrigin: dragSnapToOrigin2 } = this.getProps();
        dragSnapToOrigin2 ? this.pauseAnimation() : this.stopAnimation();
        if (snapToCursor) {
          this.snapToCursor(extractEventInfo(event).point);
        }
      };
      const onStart = (event, info) => {
        const { drag: drag2, dragPropagation, onDragStart } = this.getProps();
        if (drag2 && !dragPropagation) {
          if (this.openDragLock)
            this.openDragLock();
          this.openDragLock = setDragLock(drag2);
          if (!this.openDragLock)
            return;
        }
        this.isDragging = true;
        this.currentDirection = null;
        this.resolveConstraints();
        if (this.visualElement.projection) {
          this.visualElement.projection.isAnimationBlocked = true;
          this.visualElement.projection.target = void 0;
        }
        eachAxis((axis) => {
          let current = this.getAxisMotionValue(axis).get() || 0;
          if (percent.test(current)) {
            const { projection } = this.visualElement;
            if (projection && projection.layout) {
              const measuredAxis = projection.layout.layoutBox[axis];
              if (measuredAxis) {
                const length = calcLength(measuredAxis);
                current = length * (parseFloat(current) / 100);
              }
            }
          }
          this.originPoint[axis] = current;
        });
        if (onDragStart) {
          frame.postRender(() => onDragStart(event, info));
        }
        addValueToWillChange(this.visualElement, "transform");
        const { animationState } = this.visualElement;
        animationState && animationState.setActive("whileDrag", true);
      };
      const onMove = (event, info) => {
        const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
        if (!dragPropagation && !this.openDragLock)
          return;
        const { offset } = info;
        if (dragDirectionLock && this.currentDirection === null) {
          this.currentDirection = getCurrentDirection(offset);
          if (this.currentDirection !== null) {
            onDirectionLock && onDirectionLock(this.currentDirection);
          }
          return;
        }
        this.updateAxis("x", info.point, offset);
        this.updateAxis("y", info.point, offset);
        this.visualElement.render();
        onDrag && onDrag(event, info);
      };
      const onSessionEnd = (event, info) => this.stop(event, info);
      const resumeAnimation = () => eachAxis((axis) => {
        var _a;
        return this.getAnimationState(axis) === "paused" && ((_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.play());
      });
      const { dragSnapToOrigin } = this.getProps();
      this.panSession = new PanSession(originEvent, {
        onSessionStart,
        onStart,
        onMove,
        onSessionEnd,
        resumeAnimation
      }, {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin,
        contextWindow: getContextWindow(this.visualElement)
      });
    }
    stop(event, info) {
      const isDragging2 = this.isDragging;
      this.cancel();
      if (!isDragging2)
        return;
      const { velocity } = info;
      this.startAnimation(velocity);
      const { onDragEnd } = this.getProps();
      if (onDragEnd) {
        frame.postRender(() => onDragEnd(event, info));
      }
    }
    cancel() {
      this.isDragging = false;
      const { projection, animationState } = this.visualElement;
      if (projection) {
        projection.isAnimationBlocked = false;
      }
      this.panSession && this.panSession.end();
      this.panSession = void 0;
      const { dragPropagation } = this.getProps();
      if (!dragPropagation && this.openDragLock) {
        this.openDragLock();
        this.openDragLock = null;
      }
      animationState && animationState.setActive("whileDrag", false);
    }
    updateAxis(axis, _point, offset) {
      const { drag: drag2 } = this.getProps();
      if (!offset || !shouldDrag(axis, drag2, this.currentDirection))
        return;
      const axisValue = this.getAxisMotionValue(axis);
      let next = this.originPoint[axis] + offset[axis];
      if (this.constraints && this.constraints[axis]) {
        next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
      }
      axisValue.set(next);
    }
    resolveConstraints() {
      var _a;
      const { dragConstraints, dragElastic } = this.getProps();
      const layout2 = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : (_a = this.visualElement.projection) === null || _a === void 0 ? void 0 : _a.layout;
      const prevConstraints = this.constraints;
      if (dragConstraints && isRefObject(dragConstraints)) {
        if (!this.constraints) {
          this.constraints = this.resolveRefConstraints();
        }
      } else {
        if (dragConstraints && layout2) {
          this.constraints = calcRelativeConstraints(layout2.layoutBox, dragConstraints);
        } else {
          this.constraints = false;
        }
      }
      this.elastic = resolveDragElastic(dragElastic);
      if (prevConstraints !== this.constraints && layout2 && this.constraints && !this.hasMutatedConstraints) {
        eachAxis((axis) => {
          if (this.constraints !== false && this.getAxisMotionValue(axis)) {
            this.constraints[axis] = rebaseAxisConstraints(layout2.layoutBox[axis], this.constraints[axis]);
          }
        });
      }
    }
    resolveRefConstraints() {
      const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
      if (!constraints || !isRefObject(constraints))
        return false;
      const constraintsElement = constraints.current;
      const { projection } = this.visualElement;
      if (!projection || !projection.layout)
        return false;
      const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
      let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
      if (onMeasureDragConstraints) {
        const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
        this.hasMutatedConstraints = !!userConstraints;
        if (userConstraints) {
          measuredConstraints = convertBoundingBoxToBox(userConstraints);
        }
      }
      return measuredConstraints;
    }
    startAnimation(velocity) {
      const { drag: drag2, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
      const constraints = this.constraints || {};
      const momentumAnimations = eachAxis((axis) => {
        if (!shouldDrag(axis, drag2, this.currentDirection)) {
          return;
        }
        let transition = constraints && constraints[axis] || {};
        if (dragSnapToOrigin)
          transition = { min: 0, max: 0 };
        const bounceStiffness = dragElastic ? 200 : 1e6;
        const bounceDamping = dragElastic ? 40 : 1e7;
        const inertia2 = {
          type: "inertia",
          velocity: dragMomentum ? velocity[axis] : 0,
          bounceStiffness,
          bounceDamping,
          timeConstant: 750,
          restDelta: 1,
          restSpeed: 10,
          ...dragTransition,
          ...transition
        };
        return this.startAxisValueAnimation(axis, inertia2);
      });
      return Promise.all(momentumAnimations).then(onDragTransitionEnd);
    }
    startAxisValueAnimation(axis, transition) {
      const axisValue = this.getAxisMotionValue(axis);
      addValueToWillChange(this.visualElement, axis);
      return axisValue.start(animateMotionValue(axis, axisValue, 0, transition, this.visualElement, false));
    }
    stopAnimation() {
      eachAxis((axis) => this.getAxisMotionValue(axis).stop());
    }
    pauseAnimation() {
      eachAxis((axis) => {
        var _a;
        return (_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.pause();
      });
    }
    getAnimationState(axis) {
      var _a;
      return (_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.state;
    }
    /**
     * Drag works differently depending on which props are provided.
     *
     * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
     * - Otherwise, we apply the delta to the x/y motion values.
     */
    getAxisMotionValue(axis) {
      const dragKey = `_drag${axis.toUpperCase()}`;
      const props = this.visualElement.getProps();
      const externalMotionValue = props[dragKey];
      return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (props.initial ? props.initial[axis] : void 0) || 0);
    }
    snapToCursor(point) {
      eachAxis((axis) => {
        const { drag: drag2 } = this.getProps();
        if (!shouldDrag(axis, drag2, this.currentDirection))
          return;
        const { projection } = this.visualElement;
        const axisValue = this.getAxisMotionValue(axis);
        if (projection && projection.layout) {
          const { min, max } = projection.layout.layoutBox[axis];
          axisValue.set(point[axis] - mixNumber$1(min, max, 0.5));
        }
      });
    }
    /**
     * When the viewport resizes we want to check if the measured constraints
     * have changed and, if so, reposition the element within those new constraints
     * relative to where it was before the resize.
     */
    scalePositionWithinConstraints() {
      if (!this.visualElement.current)
        return;
      const { drag: drag2, dragConstraints } = this.getProps();
      const { projection } = this.visualElement;
      if (!isRefObject(dragConstraints) || !projection || !this.constraints)
        return;
      this.stopAnimation();
      const boxProgress = { x: 0, y: 0 };
      eachAxis((axis) => {
        const axisValue = this.getAxisMotionValue(axis);
        if (axisValue && this.constraints !== false) {
          const latest = axisValue.get();
          boxProgress[axis] = calcOrigin({ min: latest, max: latest }, this.constraints[axis]);
        }
      });
      const { transformTemplate } = this.visualElement.getProps();
      this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
      projection.root && projection.root.updateScroll();
      projection.updateLayout();
      this.resolveConstraints();
      eachAxis((axis) => {
        if (!shouldDrag(axis, drag2, null))
          return;
        const axisValue = this.getAxisMotionValue(axis);
        const { min, max } = this.constraints[axis];
        axisValue.set(mixNumber$1(min, max, boxProgress[axis]));
      });
    }
    addListeners() {
      if (!this.visualElement.current)
        return;
      elementDragControls.set(this.visualElement, this);
      const element = this.visualElement.current;
      const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
        const { drag: drag2, dragListener = true } = this.getProps();
        drag2 && dragListener && this.start(event);
      });
      const measureDragConstraints = () => {
        const { dragConstraints } = this.getProps();
        if (isRefObject(dragConstraints) && dragConstraints.current) {
          this.constraints = this.resolveRefConstraints();
        }
      };
      const { projection } = this.visualElement;
      const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
      if (projection && !projection.layout) {
        projection.root && projection.root.updateScroll();
        projection.updateLayout();
      }
      frame.read(measureDragConstraints);
      const stopResizeListener = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints());
      const stopLayoutUpdateListener = projection.addEventListener("didUpdate", ({ delta, hasLayoutChanged }) => {
        if (this.isDragging && hasLayoutChanged) {
          eachAxis((axis) => {
            const motionValue2 = this.getAxisMotionValue(axis);
            if (!motionValue2)
              return;
            this.originPoint[axis] += delta[axis].translate;
            motionValue2.set(motionValue2.get() + delta[axis].translate);
          });
          this.visualElement.render();
        }
      });
      return () => {
        stopResizeListener();
        stopPointerListener();
        stopMeasureLayoutListener();
        stopLayoutUpdateListener && stopLayoutUpdateListener();
      };
    }
    getProps() {
      const props = this.visualElement.getProps();
      const { drag: drag2 = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props;
      return {
        ...props,
        drag: drag2,
        dragDirectionLock,
        dragPropagation,
        dragConstraints,
        dragElastic,
        dragMomentum
      };
    }
  }
  function shouldDrag(direction, drag2, currentDirection) {
    return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
  }
  function getCurrentDirection(offset, lockThreshold = 10) {
    let direction = null;
    if (Math.abs(offset.y) > lockThreshold) {
      direction = "y";
    } else if (Math.abs(offset.x) > lockThreshold) {
      direction = "x";
    }
    return direction;
  }
  class DragGesture extends Feature {
    constructor(node) {
      super(node);
      this.removeGroupControls = noop;
      this.removeListeners = noop;
      this.controls = new VisualElementDragControls(node);
    }
    mount() {
      const { dragControls } = this.node.getProps();
      if (dragControls) {
        this.removeGroupControls = dragControls.subscribe(this.controls);
      }
      this.removeListeners = this.controls.addListeners() || noop;
    }
    unmount() {
      this.removeGroupControls();
      this.removeListeners();
    }
  }
  const asyncHandler = (handler) => (event, info) => {
    if (handler) {
      frame.postRender(() => handler(event, info));
    }
  };
  class PanGesture extends Feature {
    constructor() {
      super(...arguments);
      this.removePointerDownListener = noop;
    }
    onPointerDown(pointerDownEvent) {
      this.session = new PanSession(pointerDownEvent, this.createPanHandlers(), {
        transformPagePoint: this.node.getTransformPagePoint(),
        contextWindow: getContextWindow(this.node)
      });
    }
    createPanHandlers() {
      const { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
      return {
        onSessionStart: asyncHandler(onPanSessionStart),
        onStart: asyncHandler(onPanStart),
        onMove: onPan,
        onEnd: (event, info) => {
          delete this.session;
          if (onPanEnd) {
            frame.postRender(() => onPanEnd(event, info));
          }
        }
      };
    }
    mount() {
      this.removePointerDownListener = addPointerEvent(this.node.current, "pointerdown", (event) => this.onPointerDown(event));
    }
    update() {
      this.session && this.session.updateHandlers(this.createPanHandlers());
    }
    unmount() {
      this.removePointerDownListener();
      this.session && this.session.end();
    }
  }
  const globalProjectionState = {
    /**
     * Global flag as to whether the tree has animated since the last time
     * we resized the window
     */
    hasAnimatedSinceResize: true,
    /**
     * We set this to true once, on the first update. Any nodes added to the tree beyond that
     * update will be given a `data-projection-id` attribute.
     */
    hasEverUpdated: false
  };
  function pixelsToPercent(pixels, axis) {
    if (axis.max === axis.min)
      return 0;
    return pixels / (axis.max - axis.min) * 100;
  }
  const correctBorderRadius = {
    correct: (latest, node) => {
      if (!node.target)
        return latest;
      if (typeof latest === "string") {
        if (px.test(latest)) {
          latest = parseFloat(latest);
        } else {
          return latest;
        }
      }
      const x2 = pixelsToPercent(latest, node.target.x);
      const y2 = pixelsToPercent(latest, node.target.y);
      return `${x2}% ${y2}%`;
    }
  };
  const correctBoxShadow = {
    correct: (latest, { treeScale, projectionDelta }) => {
      const original = latest;
      const shadow = complex.parse(latest);
      if (shadow.length > 5)
        return original;
      const template = complex.createTransformer(latest);
      const offset = typeof shadow[0] !== "number" ? 1 : 0;
      const xScale = projectionDelta.x.scale * treeScale.x;
      const yScale = projectionDelta.y.scale * treeScale.y;
      shadow[0 + offset] /= xScale;
      shadow[1 + offset] /= yScale;
      const averageScale = mixNumber$1(xScale, yScale, 0.5);
      if (typeof shadow[2 + offset] === "number")
        shadow[2 + offset] /= averageScale;
      if (typeof shadow[3 + offset] === "number")
        shadow[3 + offset] /= averageScale;
      return template(shadow);
    }
  };
  class MeasureLayoutWithContext extends reactExports.Component {
    /**
     * This only mounts projection nodes for components that
     * need measuring, we might want to do it for all components
     * in order to incorporate transforms
     */
    componentDidMount() {
      const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
      const { projection } = visualElement;
      addScaleCorrector(defaultScaleCorrectors);
      if (projection) {
        if (layoutGroup.group)
          layoutGroup.group.add(projection);
        if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
          switchLayoutGroup.register(projection);
        }
        projection.root.didUpdate();
        projection.addEventListener("animationComplete", () => {
          this.safeToRemove();
        });
        projection.setOptions({
          ...projection.options,
          onExitComplete: () => this.safeToRemove()
        });
      }
      globalProjectionState.hasEverUpdated = true;
    }
    getSnapshotBeforeUpdate(prevProps) {
      const { layoutDependency, visualElement, drag: drag2, isPresent } = this.props;
      const projection = visualElement.projection;
      if (!projection)
        return null;
      projection.isPresent = isPresent;
      if (drag2 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0) {
        projection.willUpdate();
      } else {
        this.safeToRemove();
      }
      if (prevProps.isPresent !== isPresent) {
        if (isPresent) {
          projection.promote();
        } else if (!projection.relegate()) {
          frame.postRender(() => {
            const stack = projection.getStack();
            if (!stack || !stack.members.length) {
              this.safeToRemove();
            }
          });
        }
      }
      return null;
    }
    componentDidUpdate() {
      const { projection } = this.props.visualElement;
      if (projection) {
        projection.root.didUpdate();
        microtask.postRender(() => {
          if (!projection.currentAnimation && projection.isLead()) {
            this.safeToRemove();
          }
        });
      }
    }
    componentWillUnmount() {
      const { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
      const { projection } = visualElement;
      if (projection) {
        projection.scheduleCheckAfterUnmount();
        if (layoutGroup && layoutGroup.group)
          layoutGroup.group.remove(projection);
        if (promoteContext && promoteContext.deregister)
          promoteContext.deregister(projection);
      }
    }
    safeToRemove() {
      const { safeToRemove } = this.props;
      safeToRemove && safeToRemove();
    }
    render() {
      return null;
    }
  }
  function MeasureLayout(props) {
    const [isPresent, safeToRemove] = usePresence$1();
    const layoutGroup = reactExports.useContext(LayoutGroupContext);
    return jsxRuntimeExports.jsx(MeasureLayoutWithContext, { ...props, layoutGroup, switchLayoutGroup: reactExports.useContext(SwitchLayoutGroupContext), isPresent, safeToRemove });
  }
  const defaultScaleCorrectors = {
    borderRadius: {
      ...correctBorderRadius,
      applyTo: [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius"
      ]
    },
    borderTopLeftRadius: correctBorderRadius,
    borderTopRightRadius: correctBorderRadius,
    borderBottomLeftRadius: correctBorderRadius,
    borderBottomRightRadius: correctBorderRadius,
    boxShadow: correctBoxShadow
  };
  function animateSingleValue(value, keyframes2, options2) {
    const motionValue$1 = isMotionValue(value) ? value : motionValue(value);
    motionValue$1.start(animateMotionValue("", motionValue$1, keyframes2, options2));
    return motionValue$1.animation;
  }
  function isSVGElement(element) {
    return element instanceof SVGElement && element.tagName !== "svg";
  }
  const compareByDepth = (a2, b) => a2.depth - b.depth;
  class FlatTree {
    constructor() {
      this.children = [];
      this.isDirty = false;
    }
    add(child) {
      addUniqueItem(this.children, child);
      this.isDirty = true;
    }
    remove(child) {
      removeItem(this.children, child);
      this.isDirty = true;
    }
    forEach(callback) {
      this.isDirty && this.children.sort(compareByDepth);
      this.isDirty = false;
      this.children.forEach(callback);
    }
  }
  function delay(callback, timeout) {
    const start = time.now();
    const checkElapsed = ({ timestamp }) => {
      const elapsed = timestamp - start;
      if (elapsed >= timeout) {
        cancelFrame(checkElapsed);
        callback(elapsed - timeout);
      }
    };
    frame.read(checkElapsed, true);
    return () => cancelFrame(checkElapsed);
  }
  const borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
  const numBorders = borders.length;
  const asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
  const isPx = (value) => typeof value === "number" || px.test(value);
  function mixValues(target, follow, lead, progress2, shouldCrossfadeOpacity, isOnlyMember) {
    if (shouldCrossfadeOpacity) {
      target.opacity = mixNumber$1(
        0,
        // TODO Reinstate this if only child
        lead.opacity !== void 0 ? lead.opacity : 1,
        easeCrossfadeIn(progress2)
      );
      target.opacityExit = mixNumber$1(follow.opacity !== void 0 ? follow.opacity : 1, 0, easeCrossfadeOut(progress2));
    } else if (isOnlyMember) {
      target.opacity = mixNumber$1(follow.opacity !== void 0 ? follow.opacity : 1, lead.opacity !== void 0 ? lead.opacity : 1, progress2);
    }
    for (let i2 = 0; i2 < numBorders; i2++) {
      const borderLabel = `border${borders[i2]}Radius`;
      let followRadius = getRadius(follow, borderLabel);
      let leadRadius = getRadius(lead, borderLabel);
      if (followRadius === void 0 && leadRadius === void 0)
        continue;
      followRadius || (followRadius = 0);
      leadRadius || (leadRadius = 0);
      const canMix = followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius);
      if (canMix) {
        target[borderLabel] = Math.max(mixNumber$1(asNumber(followRadius), asNumber(leadRadius), progress2), 0);
        if (percent.test(leadRadius) || percent.test(followRadius)) {
          target[borderLabel] += "%";
        }
      } else {
        target[borderLabel] = leadRadius;
      }
    }
    if (follow.rotate || lead.rotate) {
      target.rotate = mixNumber$1(follow.rotate || 0, lead.rotate || 0, progress2);
    }
  }
  function getRadius(values, radiusName) {
    return values[radiusName] !== void 0 ? values[radiusName] : values.borderRadius;
  }
  const easeCrossfadeIn = /* @__PURE__ */ compress(0, 0.5, circOut);
  const easeCrossfadeOut = /* @__PURE__ */ compress(0.5, 0.95, noop);
  function compress(min, max, easing) {
    return (p2) => {
      if (p2 < min)
        return 0;
      if (p2 > max)
        return 1;
      return easing(/* @__PURE__ */ progress(min, max, p2));
    };
  }
  function copyAxisInto(axis, originAxis) {
    axis.min = originAxis.min;
    axis.max = originAxis.max;
  }
  function copyBoxInto(box, originBox) {
    copyAxisInto(box.x, originBox.x);
    copyAxisInto(box.y, originBox.y);
  }
  function copyAxisDeltaInto(delta, originDelta) {
    delta.translate = originDelta.translate;
    delta.scale = originDelta.scale;
    delta.originPoint = originDelta.originPoint;
    delta.origin = originDelta.origin;
  }
  function removePointDelta(point, translate, scale2, originPoint, boxScale) {
    point -= translate;
    point = scalePoint(point, 1 / scale2, originPoint);
    if (boxScale !== void 0) {
      point = scalePoint(point, 1 / boxScale, originPoint);
    }
    return point;
  }
  function removeAxisDelta(axis, translate = 0, scale2 = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
    if (percent.test(translate)) {
      translate = parseFloat(translate);
      const relativeProgress = mixNumber$1(sourceAxis.min, sourceAxis.max, translate / 100);
      translate = relativeProgress - sourceAxis.min;
    }
    if (typeof translate !== "number")
      return;
    let originPoint = mixNumber$1(originAxis.min, originAxis.max, origin);
    if (axis === originAxis)
      originPoint -= translate;
    axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale);
    axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale);
  }
  function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
    removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
  }
  const xKeys = ["x", "scaleX", "originX"];
  const yKeys = ["y", "scaleY", "originY"];
  function removeBoxTransforms(box, transforms, originBox, sourceBox) {
    removeAxisTransforms(box.x, transforms, xKeys, originBox ? originBox.x : void 0, sourceBox ? sourceBox.x : void 0);
    removeAxisTransforms(box.y, transforms, yKeys, originBox ? originBox.y : void 0, sourceBox ? sourceBox.y : void 0);
  }
  function isAxisDeltaZero(delta) {
    return delta.translate === 0 && delta.scale === 1;
  }
  function isDeltaZero(delta) {
    return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
  }
  function axisEquals(a2, b) {
    return a2.min === b.min && a2.max === b.max;
  }
  function boxEquals(a2, b) {
    return axisEquals(a2.x, b.x) && axisEquals(a2.y, b.y);
  }
  function axisEqualsRounded(a2, b) {
    return Math.round(a2.min) === Math.round(b.min) && Math.round(a2.max) === Math.round(b.max);
  }
  function boxEqualsRounded(a2, b) {
    return axisEqualsRounded(a2.x, b.x) && axisEqualsRounded(a2.y, b.y);
  }
  function aspectRatio(box) {
    return calcLength(box.x) / calcLength(box.y);
  }
  function axisDeltaEquals(a2, b) {
    return a2.translate === b.translate && a2.scale === b.scale && a2.originPoint === b.originPoint;
  }
  class NodeStack {
    constructor() {
      this.members = [];
    }
    add(node) {
      addUniqueItem(this.members, node);
      node.scheduleRender();
    }
    remove(node) {
      removeItem(this.members, node);
      if (node === this.prevLead) {
        this.prevLead = void 0;
      }
      if (node === this.lead) {
        const prevLead = this.members[this.members.length - 1];
        if (prevLead) {
          this.promote(prevLead);
        }
      }
    }
    relegate(node) {
      const indexOfNode = this.members.findIndex((member) => node === member);
      if (indexOfNode === 0)
        return false;
      let prevLead;
      for (let i2 = indexOfNode; i2 >= 0; i2--) {
        const member = this.members[i2];
        if (member.isPresent !== false) {
          prevLead = member;
          break;
        }
      }
      if (prevLead) {
        this.promote(prevLead);
        return true;
      } else {
        return false;
      }
    }
    promote(node, preserveFollowOpacity) {
      const prevLead = this.lead;
      if (node === prevLead)
        return;
      this.prevLead = prevLead;
      this.lead = node;
      node.show();
      if (prevLead) {
        prevLead.instance && prevLead.scheduleRender();
        node.scheduleRender();
        node.resumeFrom = prevLead;
        if (preserveFollowOpacity) {
          node.resumeFrom.preserveOpacity = true;
        }
        if (prevLead.snapshot) {
          node.snapshot = prevLead.snapshot;
          node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
        }
        if (node.root && node.root.isUpdating) {
          node.isLayoutDirty = true;
        }
        const { crossfade } = node.options;
        if (crossfade === false) {
          prevLead.hide();
        }
      }
    }
    exitAnimationComplete() {
      this.members.forEach((node) => {
        const { options: options2, resumingFrom } = node;
        options2.onExitComplete && options2.onExitComplete();
        if (resumingFrom) {
          resumingFrom.options.onExitComplete && resumingFrom.options.onExitComplete();
        }
      });
    }
    scheduleRender() {
      this.members.forEach((node) => {
        node.instance && node.scheduleRender(false);
      });
    }
    /**
     * Clear any leads that have been removed this render to prevent them from being
     * used in future animations and to prevent memory leaks
     */
    removeLeadSnapshot() {
      if (this.lead && this.lead.snapshot) {
        this.lead.snapshot = void 0;
      }
    }
  }
  function buildProjectionTransform(delta, treeScale, latestTransform) {
    let transform = "";
    const xTranslate = delta.x.translate / treeScale.x;
    const yTranslate = delta.y.translate / treeScale.y;
    const zTranslate = (latestTransform === null || latestTransform === void 0 ? void 0 : latestTransform.z) || 0;
    if (xTranslate || yTranslate || zTranslate) {
      transform = `translate3d(${xTranslate}px, ${yTranslate}px, ${zTranslate}px) `;
    }
    if (treeScale.x !== 1 || treeScale.y !== 1) {
      transform += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
    }
    if (latestTransform) {
      const { transformPerspective, rotate, rotateX, rotateY, skewX, skewY } = latestTransform;
      if (transformPerspective)
        transform = `perspective(${transformPerspective}px) ${transform}`;
      if (rotate)
        transform += `rotate(${rotate}deg) `;
      if (rotateX)
        transform += `rotateX(${rotateX}deg) `;
      if (rotateY)
        transform += `rotateY(${rotateY}deg) `;
      if (skewX)
        transform += `skewX(${skewX}deg) `;
      if (skewY)
        transform += `skewY(${skewY}deg) `;
    }
    const elementScaleX = delta.x.scale * treeScale.x;
    const elementScaleY = delta.y.scale * treeScale.y;
    if (elementScaleX !== 1 || elementScaleY !== 1) {
      transform += `scale(${elementScaleX}, ${elementScaleY})`;
    }
    return transform || "none";
  }
  const metrics = {
    type: "projectionFrame",
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0
  };
  const isDebug = typeof window !== "undefined" && window.MotionDebug !== void 0;
  const transformAxes = ["", "X", "Y", "Z"];
  const hiddenVisibility = { visibility: "hidden" };
  const animationTarget = 1e3;
  let id = 0;
  function resetDistortingTransform(key, visualElement, values, sharedAnimationValues) {
    const { latestValues } = visualElement;
    if (latestValues[key]) {
      values[key] = latestValues[key];
      visualElement.setStaticValue(key, 0);
      if (sharedAnimationValues) {
        sharedAnimationValues[key] = 0;
      }
    }
  }
  function cancelTreeOptimisedTransformAnimations(projectionNode) {
    projectionNode.hasCheckedOptimisedAppear = true;
    if (projectionNode.root === projectionNode)
      return;
    const { visualElement } = projectionNode.options;
    if (!visualElement)
      return;
    const appearId = getOptimisedAppearId(visualElement);
    if (window.MotionHasOptimisedAnimation(appearId, "transform")) {
      const { layout: layout2, layoutId } = projectionNode.options;
      window.MotionCancelOptimisedAnimation(appearId, "transform", frame, !(layout2 || layoutId));
    }
    const { parent } = projectionNode;
    if (parent && !parent.hasCheckedOptimisedAppear) {
      cancelTreeOptimisedTransformAnimations(parent);
    }
  }
  function createProjectionNode({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
    return class ProjectionNode {
      constructor(latestValues = {}, parent = defaultParent === null || defaultParent === void 0 ? void 0 : defaultParent()) {
        this.id = id++;
        this.animationId = 0;
        this.children = /* @__PURE__ */ new Set();
        this.options = {};
        this.isTreeAnimating = false;
        this.isAnimationBlocked = false;
        this.isLayoutDirty = false;
        this.isProjectionDirty = false;
        this.isSharedProjectionDirty = false;
        this.isTransformDirty = false;
        this.updateManuallyBlocked = false;
        this.updateBlockedByResize = false;
        this.isUpdating = false;
        this.isSVG = false;
        this.needsReset = false;
        this.shouldResetTransform = false;
        this.hasCheckedOptimisedAppear = false;
        this.treeScale = { x: 1, y: 1 };
        this.eventHandlers = /* @__PURE__ */ new Map();
        this.hasTreeAnimated = false;
        this.updateScheduled = false;
        this.scheduleUpdate = () => this.update();
        this.projectionUpdateScheduled = false;
        this.checkUpdateFailed = () => {
          if (this.isUpdating) {
            this.isUpdating = false;
            this.clearAllSnapshots();
          }
        };
        this.updateProjection = () => {
          this.projectionUpdateScheduled = false;
          if (isDebug) {
            metrics.totalNodes = metrics.resolvedTargetDeltas = metrics.recalculatedProjection = 0;
          }
          this.nodes.forEach(propagateDirtyNodes);
          this.nodes.forEach(resolveTargetDelta);
          this.nodes.forEach(calcProjection);
          this.nodes.forEach(cleanDirtyNodes);
          if (isDebug) {
            window.MotionDebug.record(metrics);
          }
        };
        this.resolvedRelativeTargetAt = 0;
        this.hasProjected = false;
        this.isVisible = true;
        this.animationProgress = 0;
        this.sharedNodes = /* @__PURE__ */ new Map();
        this.latestValues = latestValues;
        this.root = parent ? parent.root || parent : this;
        this.path = parent ? [...parent.path, parent] : [];
        this.parent = parent;
        this.depth = parent ? parent.depth + 1 : 0;
        for (let i2 = 0; i2 < this.path.length; i2++) {
          this.path[i2].shouldResetTransform = true;
        }
        if (this.root === this)
          this.nodes = new FlatTree();
      }
      addEventListener(name, handler) {
        if (!this.eventHandlers.has(name)) {
          this.eventHandlers.set(name, new SubscriptionManager());
        }
        return this.eventHandlers.get(name).add(handler);
      }
      notifyListeners(name, ...args) {
        const subscriptionManager = this.eventHandlers.get(name);
        subscriptionManager && subscriptionManager.notify(...args);
      }
      hasListeners(name) {
        return this.eventHandlers.has(name);
      }
      /**
       * Lifecycles
       */
      mount(instance, isLayoutDirty = this.root.hasTreeAnimated) {
        if (this.instance)
          return;
        this.isSVG = isSVGElement(instance);
        this.instance = instance;
        const { layoutId, layout: layout2, visualElement } = this.options;
        if (visualElement && !visualElement.current) {
          visualElement.mount(instance);
        }
        this.root.nodes.add(this);
        this.parent && this.parent.children.add(this);
        if (isLayoutDirty && (layout2 || layoutId)) {
          this.isLayoutDirty = true;
        }
        if (attachResizeListener) {
          let cancelDelay;
          const resizeUnblockUpdate = () => this.root.updateBlockedByResize = false;
          attachResizeListener(instance, () => {
            this.root.updateBlockedByResize = true;
            cancelDelay && cancelDelay();
            cancelDelay = delay(resizeUnblockUpdate, 250);
            if (globalProjectionState.hasAnimatedSinceResize) {
              globalProjectionState.hasAnimatedSinceResize = false;
              this.nodes.forEach(finishAnimation);
            }
          });
        }
        if (layoutId) {
          this.root.registerSharedNode(layoutId, this);
        }
        if (this.options.animate !== false && visualElement && (layoutId || layout2)) {
          this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeTargetChanged, layout: newLayout }) => {
            if (this.isTreeAnimationBlocked()) {
              this.target = void 0;
              this.relativeTarget = void 0;
              return;
            }
            const layoutTransition = this.options.transition || visualElement.getDefaultTransition() || defaultLayoutTransition;
            const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
            const targetChanged = !this.targetLayout || !boxEqualsRounded(this.targetLayout, newLayout) || hasRelativeTargetChanged;
            const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeTargetChanged;
            if (this.options.layoutRoot || this.resumeFrom && this.resumeFrom.instance || hasOnlyRelativeTargetChanged || hasLayoutChanged && (targetChanged || !this.currentAnimation)) {
              if (this.resumeFrom) {
                this.resumingFrom = this.resumeFrom;
                this.resumingFrom.resumingFrom = void 0;
              }
              this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
              const animationOptions = {
                ...getValueTransition(layoutTransition, "layout"),
                onPlay: onLayoutAnimationStart,
                onComplete: onLayoutAnimationComplete
              };
              if (visualElement.shouldReduceMotion || this.options.layoutRoot) {
                animationOptions.delay = 0;
                animationOptions.type = false;
              }
              this.startAnimation(animationOptions);
            } else {
              if (!hasLayoutChanged) {
                finishAnimation(this);
              }
              if (this.isLead() && this.options.onExitComplete) {
                this.options.onExitComplete();
              }
            }
            this.targetLayout = newLayout;
          });
        }
      }
      unmount() {
        this.options.layoutId && this.willUpdate();
        this.root.nodes.remove(this);
        const stack = this.getStack();
        stack && stack.remove(this);
        this.parent && this.parent.children.delete(this);
        this.instance = void 0;
        cancelFrame(this.updateProjection);
      }
      // only on the root
      blockUpdate() {
        this.updateManuallyBlocked = true;
      }
      unblockUpdate() {
        this.updateManuallyBlocked = false;
      }
      isUpdateBlocked() {
        return this.updateManuallyBlocked || this.updateBlockedByResize;
      }
      isTreeAnimationBlocked() {
        return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
      }
      // Note: currently only running on root node
      startUpdate() {
        if (this.isUpdateBlocked())
          return;
        this.isUpdating = true;
        this.nodes && this.nodes.forEach(resetSkewAndRotation);
        this.animationId++;
      }
      getTransformTemplate() {
        const { visualElement } = this.options;
        return visualElement && visualElement.getProps().transformTemplate;
      }
      willUpdate(shouldNotifyListeners = true) {
        this.root.hasTreeAnimated = true;
        if (this.root.isUpdateBlocked()) {
          this.options.onExitComplete && this.options.onExitComplete();
          return;
        }
        if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear) {
          cancelTreeOptimisedTransformAnimations(this);
        }
        !this.root.isUpdating && this.root.startUpdate();
        if (this.isLayoutDirty)
          return;
        this.isLayoutDirty = true;
        for (let i2 = 0; i2 < this.path.length; i2++) {
          const node = this.path[i2];
          node.shouldResetTransform = true;
          node.updateScroll("snapshot");
          if (node.options.layoutRoot) {
            node.willUpdate(false);
          }
        }
        const { layoutId, layout: layout2 } = this.options;
        if (layoutId === void 0 && !layout2)
          return;
        const transformTemplate = this.getTransformTemplate();
        this.prevTransformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
        this.updateSnapshot();
        shouldNotifyListeners && this.notifyListeners("willUpdate");
      }
      update() {
        this.updateScheduled = false;
        const updateWasBlocked = this.isUpdateBlocked();
        if (updateWasBlocked) {
          this.unblockUpdate();
          this.clearAllSnapshots();
          this.nodes.forEach(clearMeasurements);
          return;
        }
        if (!this.isUpdating) {
          this.nodes.forEach(clearIsLayoutDirty);
        }
        this.isUpdating = false;
        this.nodes.forEach(resetTransformStyle);
        this.nodes.forEach(updateLayout);
        this.nodes.forEach(notifyLayoutUpdate);
        this.clearAllSnapshots();
        const now2 = time.now();
        frameData.delta = clamp(0, 1e3 / 60, now2 - frameData.timestamp);
        frameData.timestamp = now2;
        frameData.isProcessing = true;
        frameSteps.update.process(frameData);
        frameSteps.preRender.process(frameData);
        frameSteps.render.process(frameData);
        frameData.isProcessing = false;
      }
      didUpdate() {
        if (!this.updateScheduled) {
          this.updateScheduled = true;
          microtask.read(this.scheduleUpdate);
        }
      }
      clearAllSnapshots() {
        this.nodes.forEach(clearSnapshot);
        this.sharedNodes.forEach(removeLeadSnapshots);
      }
      scheduleUpdateProjection() {
        if (!this.projectionUpdateScheduled) {
          this.projectionUpdateScheduled = true;
          frame.preRender(this.updateProjection, false, true);
        }
      }
      scheduleCheckAfterUnmount() {
        frame.postRender(() => {
          if (this.isLayoutDirty) {
            this.root.didUpdate();
          } else {
            this.root.checkUpdateFailed();
          }
        });
      }
      /**
       * Update measurements
       */
      updateSnapshot() {
        if (this.snapshot || !this.instance)
          return;
        this.snapshot = this.measure();
      }
      updateLayout() {
        if (!this.instance)
          return;
        this.updateScroll();
        if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) {
          return;
        }
        if (this.resumeFrom && !this.resumeFrom.instance) {
          for (let i2 = 0; i2 < this.path.length; i2++) {
            const node = this.path[i2];
            node.updateScroll();
          }
        }
        const prevLayout = this.layout;
        this.layout = this.measure(false);
        this.layoutCorrected = createBox();
        this.isLayoutDirty = false;
        this.projectionDelta = void 0;
        this.notifyListeners("measure", this.layout.layoutBox);
        const { visualElement } = this.options;
        visualElement && visualElement.notify("LayoutMeasure", this.layout.layoutBox, prevLayout ? prevLayout.layoutBox : void 0);
      }
      updateScroll(phase = "measure") {
        let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
        if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) {
          needsMeasurement = false;
        }
        if (needsMeasurement) {
          const isRoot = checkIsScrollRoot(this.instance);
          this.scroll = {
            animationId: this.root.animationId,
            phase,
            isRoot,
            offset: measureScroll(this.instance),
            wasRoot: this.scroll ? this.scroll.isRoot : isRoot
          };
        }
      }
      resetTransform() {
        if (!resetTransform)
          return;
        const isResetRequested = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout;
        const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
        const transformTemplate = this.getTransformTemplate();
        const transformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
        const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
        if (isResetRequested && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
          resetTransform(this.instance, transformTemplateValue);
          this.shouldResetTransform = false;
          this.scheduleRender();
        }
      }
      measure(removeTransform = true) {
        const pageBox = this.measurePageBox();
        let layoutBox = this.removeElementScroll(pageBox);
        if (removeTransform) {
          layoutBox = this.removeTransform(layoutBox);
        }
        roundBox(layoutBox);
        return {
          animationId: this.root.animationId,
          measuredBox: pageBox,
          layoutBox,
          latestValues: {},
          source: this.id
        };
      }
      measurePageBox() {
        var _a;
        const { visualElement } = this.options;
        if (!visualElement)
          return createBox();
        const box = visualElement.measureViewportBox();
        const wasInScrollRoot = ((_a = this.scroll) === null || _a === void 0 ? void 0 : _a.wasRoot) || this.path.some(checkNodeWasScrollRoot);
        if (!wasInScrollRoot) {
          const { scroll } = this.root;
          if (scroll) {
            translateAxis(box.x, scroll.offset.x);
            translateAxis(box.y, scroll.offset.y);
          }
        }
        return box;
      }
      removeElementScroll(box) {
        var _a;
        const boxWithoutScroll = createBox();
        copyBoxInto(boxWithoutScroll, box);
        if ((_a = this.scroll) === null || _a === void 0 ? void 0 : _a.wasRoot) {
          return boxWithoutScroll;
        }
        for (let i2 = 0; i2 < this.path.length; i2++) {
          const node = this.path[i2];
          const { scroll, options: options2 } = node;
          if (node !== this.root && scroll && options2.layoutScroll) {
            if (scroll.wasRoot) {
              copyBoxInto(boxWithoutScroll, box);
            }
            translateAxis(boxWithoutScroll.x, scroll.offset.x);
            translateAxis(boxWithoutScroll.y, scroll.offset.y);
          }
        }
        return boxWithoutScroll;
      }
      applyTransform(box, transformOnly = false) {
        const withTransforms = createBox();
        copyBoxInto(withTransforms, box);
        for (let i2 = 0; i2 < this.path.length; i2++) {
          const node = this.path[i2];
          if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) {
            transformBox(withTransforms, {
              x: -node.scroll.offset.x,
              y: -node.scroll.offset.y
            });
          }
          if (!hasTransform(node.latestValues))
            continue;
          transformBox(withTransforms, node.latestValues);
        }
        if (hasTransform(this.latestValues)) {
          transformBox(withTransforms, this.latestValues);
        }
        return withTransforms;
      }
      removeTransform(box) {
        const boxWithoutTransform = createBox();
        copyBoxInto(boxWithoutTransform, box);
        for (let i2 = 0; i2 < this.path.length; i2++) {
          const node = this.path[i2];
          if (!node.instance)
            continue;
          if (!hasTransform(node.latestValues))
            continue;
          hasScale(node.latestValues) && node.updateSnapshot();
          const sourceBox = createBox();
          const nodeBox = node.measurePageBox();
          copyBoxInto(sourceBox, nodeBox);
          removeBoxTransforms(boxWithoutTransform, node.latestValues, node.snapshot ? node.snapshot.layoutBox : void 0, sourceBox);
        }
        if (hasTransform(this.latestValues)) {
          removeBoxTransforms(boxWithoutTransform, this.latestValues);
        }
        return boxWithoutTransform;
      }
      setTargetDelta(delta) {
        this.targetDelta = delta;
        this.root.scheduleUpdateProjection();
        this.isProjectionDirty = true;
      }
      setOptions(options2) {
        this.options = {
          ...this.options,
          ...options2,
          crossfade: options2.crossfade !== void 0 ? options2.crossfade : true
        };
      }
      clearMeasurements() {
        this.scroll = void 0;
        this.layout = void 0;
        this.snapshot = void 0;
        this.prevTransformTemplateValue = void 0;
        this.targetDelta = void 0;
        this.target = void 0;
        this.isLayoutDirty = false;
      }
      forceRelativeParentToResolveTarget() {
        if (!this.relativeParent)
          return;
        if (this.relativeParent.resolvedRelativeTargetAt !== frameData.timestamp) {
          this.relativeParent.resolveTargetDelta(true);
        }
      }
      resolveTargetDelta(forceRecalculation = false) {
        var _a;
        const lead = this.getLead();
        this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
        this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
        this.isSharedProjectionDirty || (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
        const isShared = Boolean(this.resumingFrom) || this !== lead;
        const canSkip = !(forceRecalculation || isShared && this.isSharedProjectionDirty || this.isProjectionDirty || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isProjectionDirty) || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize);
        if (canSkip)
          return;
        const { layout: layout2, layoutId } = this.options;
        if (!this.layout || !(layout2 || layoutId))
          return;
        this.resolvedRelativeTargetAt = frameData.timestamp;
        if (!this.targetDelta && !this.relativeTarget) {
          const relativeParent = this.getClosestProjectingParent();
          if (relativeParent && relativeParent.layout && this.animationProgress !== 1) {
            this.relativeParent = relativeParent;
            this.forceRelativeParentToResolveTarget();
            this.relativeTarget = createBox();
            this.relativeTargetOrigin = createBox();
            calcRelativePosition(this.relativeTargetOrigin, this.layout.layoutBox, relativeParent.layout.layoutBox);
            copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
          } else {
            this.relativeParent = this.relativeTarget = void 0;
          }
        }
        if (!this.relativeTarget && !this.targetDelta)
          return;
        if (!this.target) {
          this.target = createBox();
          this.targetWithTransforms = createBox();
        }
        if (this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
          this.forceRelativeParentToResolveTarget();
          calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
        } else if (this.targetDelta) {
          if (Boolean(this.resumingFrom)) {
            this.target = this.applyTransform(this.layout.layoutBox);
          } else {
            copyBoxInto(this.target, this.layout.layoutBox);
          }
          applyBoxDelta(this.target, this.targetDelta);
        } else {
          copyBoxInto(this.target, this.layout.layoutBox);
        }
        if (this.attemptToResolveRelativeTarget) {
          this.attemptToResolveRelativeTarget = false;
          const relativeParent = this.getClosestProjectingParent();
          if (relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target && this.animationProgress !== 1) {
            this.relativeParent = relativeParent;
            this.forceRelativeParentToResolveTarget();
            this.relativeTarget = createBox();
            this.relativeTargetOrigin = createBox();
            calcRelativePosition(this.relativeTargetOrigin, this.target, relativeParent.target);
            copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
          } else {
            this.relativeParent = this.relativeTarget = void 0;
          }
        }
        if (isDebug) {
          metrics.resolvedTargetDeltas++;
        }
      }
      getClosestProjectingParent() {
        if (!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues)) {
          return void 0;
        }
        if (this.parent.isProjecting()) {
          return this.parent;
        } else {
          return this.parent.getClosestProjectingParent();
        }
      }
      isProjecting() {
        return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
      }
      calcProjection() {
        var _a;
        const lead = this.getLead();
        const isShared = Boolean(this.resumingFrom) || this !== lead;
        let canSkip = true;
        if (this.isProjectionDirty || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isProjectionDirty)) {
          canSkip = false;
        }
        if (isShared && (this.isSharedProjectionDirty || this.isTransformDirty)) {
          canSkip = false;
        }
        if (this.resolvedRelativeTargetAt === frameData.timestamp) {
          canSkip = false;
        }
        if (canSkip)
          return;
        const { layout: layout2, layoutId } = this.options;
        this.isTreeAnimating = Boolean(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation);
        if (!this.isTreeAnimating) {
          this.targetDelta = this.relativeTarget = void 0;
        }
        if (!this.layout || !(layout2 || layoutId))
          return;
        copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
        const prevTreeScaleX = this.treeScale.x;
        const prevTreeScaleY = this.treeScale.y;
        applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, isShared);
        if (lead.layout && !lead.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1)) {
          lead.target = lead.layout.layoutBox;
          lead.targetWithTransforms = createBox();
        }
        const { target } = lead;
        if (!target) {
          if (this.prevProjectionDelta) {
            this.createProjectionDeltas();
            this.scheduleRender();
          }
          return;
        }
        if (!this.projectionDelta || !this.prevProjectionDelta) {
          this.createProjectionDeltas();
        } else {
          copyAxisDeltaInto(this.prevProjectionDelta.x, this.projectionDelta.x);
          copyAxisDeltaInto(this.prevProjectionDelta.y, this.projectionDelta.y);
        }
        calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
        if (this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY || !axisDeltaEquals(this.projectionDelta.x, this.prevProjectionDelta.x) || !axisDeltaEquals(this.projectionDelta.y, this.prevProjectionDelta.y)) {
          this.hasProjected = true;
          this.scheduleRender();
          this.notifyListeners("projectionUpdate", target);
        }
        if (isDebug) {
          metrics.recalculatedProjection++;
        }
      }
      hide() {
        this.isVisible = false;
      }
      show() {
        this.isVisible = true;
      }
      scheduleRender(notifyAll = true) {
        var _a;
        (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.scheduleRender();
        if (notifyAll) {
          const stack = this.getStack();
          stack && stack.scheduleRender();
        }
        if (this.resumingFrom && !this.resumingFrom.instance) {
          this.resumingFrom = void 0;
        }
      }
      createProjectionDeltas() {
        this.prevProjectionDelta = createDelta();
        this.projectionDelta = createDelta();
        this.projectionDeltaWithTransform = createDelta();
      }
      setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false) {
        const snapshot = this.snapshot;
        const snapshotLatestValues = snapshot ? snapshot.latestValues : {};
        const mixedValues = { ...this.latestValues };
        const targetDelta = createDelta();
        if (!this.relativeParent || !this.relativeParent.options.layoutRoot) {
          this.relativeTarget = this.relativeTargetOrigin = void 0;
        }
        this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
        const relativeLayout = createBox();
        const snapshotSource = snapshot ? snapshot.source : void 0;
        const layoutSource = this.layout ? this.layout.source : void 0;
        const isSharedLayoutAnimation = snapshotSource !== layoutSource;
        const stack = this.getStack();
        const isOnlyMember = !stack || stack.members.length <= 1;
        const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
        this.animationProgress = 0;
        let prevRelativeTarget;
        this.mixTargetDelta = (latest) => {
          const progress2 = latest / 1e3;
          mixAxisDelta(targetDelta.x, delta.x, progress2);
          mixAxisDelta(targetDelta.y, delta.y, progress2);
          this.setTargetDelta(targetDelta);
          if (this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
            calcRelativePosition(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
            mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress2);
            if (prevRelativeTarget && boxEquals(this.relativeTarget, prevRelativeTarget)) {
              this.isProjectionDirty = false;
            }
            if (!prevRelativeTarget)
              prevRelativeTarget = createBox();
            copyBoxInto(prevRelativeTarget, this.relativeTarget);
          }
          if (isSharedLayoutAnimation) {
            this.animationValues = mixedValues;
            mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress2, shouldCrossfadeOpacity, isOnlyMember);
          }
          this.root.scheduleUpdateProjection();
          this.scheduleRender();
          this.animationProgress = progress2;
        };
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
      }
      startAnimation(options2) {
        this.notifyListeners("animationStart");
        this.currentAnimation && this.currentAnimation.stop();
        if (this.resumingFrom && this.resumingFrom.currentAnimation) {
          this.resumingFrom.currentAnimation.stop();
        }
        if (this.pendingAnimation) {
          cancelFrame(this.pendingAnimation);
          this.pendingAnimation = void 0;
        }
        this.pendingAnimation = frame.update(() => {
          globalProjectionState.hasAnimatedSinceResize = true;
          this.currentAnimation = animateSingleValue(0, animationTarget, {
            ...options2,
            onUpdate: (latest) => {
              this.mixTargetDelta(latest);
              options2.onUpdate && options2.onUpdate(latest);
            },
            onComplete: () => {
              options2.onComplete && options2.onComplete();
              this.completeAnimation();
            }
          });
          if (this.resumingFrom) {
            this.resumingFrom.currentAnimation = this.currentAnimation;
          }
          this.pendingAnimation = void 0;
        });
      }
      completeAnimation() {
        if (this.resumingFrom) {
          this.resumingFrom.currentAnimation = void 0;
          this.resumingFrom.preserveOpacity = void 0;
        }
        const stack = this.getStack();
        stack && stack.exitAnimationComplete();
        this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
        this.notifyListeners("animationComplete");
      }
      finishAnimation() {
        if (this.currentAnimation) {
          this.mixTargetDelta && this.mixTargetDelta(animationTarget);
          this.currentAnimation.stop();
        }
        this.completeAnimation();
      }
      applyTransformsToTarget() {
        const lead = this.getLead();
        let { targetWithTransforms, target, layout: layout2, latestValues } = lead;
        if (!targetWithTransforms || !target || !layout2)
          return;
        if (this !== lead && this.layout && layout2 && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout2.layoutBox)) {
          target = this.target || createBox();
          const xLength = calcLength(this.layout.layoutBox.x);
          target.x.min = lead.target.x.min;
          target.x.max = target.x.min + xLength;
          const yLength = calcLength(this.layout.layoutBox.y);
          target.y.min = lead.target.y.min;
          target.y.max = target.y.min + yLength;
        }
        copyBoxInto(targetWithTransforms, target);
        transformBox(targetWithTransforms, latestValues);
        calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
      }
      registerSharedNode(layoutId, node) {
        if (!this.sharedNodes.has(layoutId)) {
          this.sharedNodes.set(layoutId, new NodeStack());
        }
        const stack = this.sharedNodes.get(layoutId);
        stack.add(node);
        const config = node.options.initialPromotionConfig;
        node.promote({
          transition: config ? config.transition : void 0,
          preserveFollowOpacity: config && config.shouldPreserveFollowOpacity ? config.shouldPreserveFollowOpacity(node) : void 0
        });
      }
      isLead() {
        const stack = this.getStack();
        return stack ? stack.lead === this : true;
      }
      getLead() {
        var _a;
        const { layoutId } = this.options;
        return layoutId ? ((_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.lead) || this : this;
      }
      getPrevLead() {
        var _a;
        const { layoutId } = this.options;
        return layoutId ? (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.prevLead : void 0;
      }
      getStack() {
        const { layoutId } = this.options;
        if (layoutId)
          return this.root.sharedNodes.get(layoutId);
      }
      promote({ needsReset, transition, preserveFollowOpacity } = {}) {
        const stack = this.getStack();
        if (stack)
          stack.promote(this, preserveFollowOpacity);
        if (needsReset) {
          this.projectionDelta = void 0;
          this.needsReset = true;
        }
        if (transition)
          this.setOptions({ transition });
      }
      relegate() {
        const stack = this.getStack();
        if (stack) {
          return stack.relegate(this);
        } else {
          return false;
        }
      }
      resetSkewAndRotation() {
        const { visualElement } = this.options;
        if (!visualElement)
          return;
        let hasDistortingTransform = false;
        const { latestValues } = visualElement;
        if (latestValues.z || latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ || latestValues.skewX || latestValues.skewY) {
          hasDistortingTransform = true;
        }
        if (!hasDistortingTransform)
          return;
        const resetValues = {};
        if (latestValues.z) {
          resetDistortingTransform("z", visualElement, resetValues, this.animationValues);
        }
        for (let i2 = 0; i2 < transformAxes.length; i2++) {
          resetDistortingTransform(`rotate${transformAxes[i2]}`, visualElement, resetValues, this.animationValues);
          resetDistortingTransform(`skew${transformAxes[i2]}`, visualElement, resetValues, this.animationValues);
        }
        visualElement.render();
        for (const key in resetValues) {
          visualElement.setStaticValue(key, resetValues[key]);
          if (this.animationValues) {
            this.animationValues[key] = resetValues[key];
          }
        }
        visualElement.scheduleRender();
      }
      getProjectionStyles(styleProp) {
        var _a, _b;
        if (!this.instance || this.isSVG)
          return void 0;
        if (!this.isVisible) {
          return hiddenVisibility;
        }
        const styles = {
          visibility: ""
        };
        const transformTemplate = this.getTransformTemplate();
        if (this.needsReset) {
          this.needsReset = false;
          styles.opacity = "";
          styles.pointerEvents = resolveMotionValue(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "";
          styles.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
          return styles;
        }
        const lead = this.getLead();
        if (!this.projectionDelta || !this.layout || !lead.target) {
          const emptyStyles = {};
          if (this.options.layoutId) {
            emptyStyles.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
            emptyStyles.pointerEvents = resolveMotionValue(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "";
          }
          if (this.hasProjected && !hasTransform(this.latestValues)) {
            emptyStyles.transform = transformTemplate ? transformTemplate({}, "") : "none";
            this.hasProjected = false;
          }
          return emptyStyles;
        }
        const valuesToRender = lead.animationValues || lead.latestValues;
        this.applyTransformsToTarget();
        styles.transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
        if (transformTemplate) {
          styles.transform = transformTemplate(valuesToRender, styles.transform);
        }
        const { x: x2, y: y2 } = this.projectionDelta;
        styles.transformOrigin = `${x2.origin * 100}% ${y2.origin * 100}% 0`;
        if (lead.animationValues) {
          styles.opacity = lead === this ? (_b = (_a = valuesToRender.opacity) !== null && _a !== void 0 ? _a : this.latestValues.opacity) !== null && _b !== void 0 ? _b : 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
        } else {
          styles.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
        }
        for (const key in scaleCorrectors) {
          if (valuesToRender[key] === void 0)
            continue;
          const { correct, applyTo } = scaleCorrectors[key];
          const corrected = styles.transform === "none" ? valuesToRender[key] : correct(valuesToRender[key], lead);
          if (applyTo) {
            const num = applyTo.length;
            for (let i2 = 0; i2 < num; i2++) {
              styles[applyTo[i2]] = corrected;
            }
          } else {
            styles[key] = corrected;
          }
        }
        if (this.options.layoutId) {
          styles.pointerEvents = lead === this ? resolveMotionValue(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "" : "none";
        }
        return styles;
      }
      clearSnapshot() {
        this.resumeFrom = this.snapshot = void 0;
      }
      // Only run on root
      resetTree() {
        this.root.nodes.forEach((node) => {
          var _a;
          return (_a = node.currentAnimation) === null || _a === void 0 ? void 0 : _a.stop();
        });
        this.root.nodes.forEach(clearMeasurements);
        this.root.sharedNodes.clear();
      }
    };
  }
  function updateLayout(node) {
    node.updateLayout();
  }
  function notifyLayoutUpdate(node) {
    var _a;
    const snapshot = ((_a = node.resumeFrom) === null || _a === void 0 ? void 0 : _a.snapshot) || node.snapshot;
    if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
      const { layoutBox: layout2, measuredBox: measuredLayout } = node.layout;
      const { animationType } = node.options;
      const isShared = snapshot.source !== node.layout.source;
      if (animationType === "size") {
        eachAxis((axis) => {
          const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
          const length = calcLength(axisSnapshot);
          axisSnapshot.min = layout2[axis].min;
          axisSnapshot.max = axisSnapshot.min + length;
        });
      } else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout2)) {
        eachAxis((axis) => {
          const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
          const length = calcLength(layout2[axis]);
          axisSnapshot.max = axisSnapshot.min + length;
          if (node.relativeTarget && !node.currentAnimation) {
            node.isProjectionDirty = true;
            node.relativeTarget[axis].max = node.relativeTarget[axis].min + length;
          }
        });
      }
      const layoutDelta = createDelta();
      calcBoxDelta(layoutDelta, layout2, snapshot.layoutBox);
      const visualDelta = createDelta();
      if (isShared) {
        calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
      } else {
        calcBoxDelta(visualDelta, layout2, snapshot.layoutBox);
      }
      const hasLayoutChanged = !isDeltaZero(layoutDelta);
      let hasRelativeTargetChanged = false;
      if (!node.resumeFrom) {
        const relativeParent = node.getClosestProjectingParent();
        if (relativeParent && !relativeParent.resumeFrom) {
          const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
          if (parentSnapshot && parentLayout) {
            const relativeSnapshot = createBox();
            calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
            const relativeLayout = createBox();
            calcRelativePosition(relativeLayout, layout2, parentLayout.layoutBox);
            if (!boxEqualsRounded(relativeSnapshot, relativeLayout)) {
              hasRelativeTargetChanged = true;
            }
            if (relativeParent.options.layoutRoot) {
              node.relativeTarget = relativeLayout;
              node.relativeTargetOrigin = relativeSnapshot;
              node.relativeParent = relativeParent;
            }
          }
        }
      }
      node.notifyListeners("didUpdate", {
        layout: layout2,
        snapshot,
        delta: visualDelta,
        layoutDelta,
        hasLayoutChanged,
        hasRelativeTargetChanged
      });
    } else if (node.isLead()) {
      const { onExitComplete } = node.options;
      onExitComplete && onExitComplete();
    }
    node.options.transition = void 0;
  }
  function propagateDirtyNodes(node) {
    if (isDebug) {
      metrics.totalNodes++;
    }
    if (!node.parent)
      return;
    if (!node.isProjecting()) {
      node.isProjectionDirty = node.parent.isProjectionDirty;
    }
    node.isSharedProjectionDirty || (node.isSharedProjectionDirty = Boolean(node.isProjectionDirty || node.parent.isProjectionDirty || node.parent.isSharedProjectionDirty));
    node.isTransformDirty || (node.isTransformDirty = node.parent.isTransformDirty);
  }
  function cleanDirtyNodes(node) {
    node.isProjectionDirty = node.isSharedProjectionDirty = node.isTransformDirty = false;
  }
  function clearSnapshot(node) {
    node.clearSnapshot();
  }
  function clearMeasurements(node) {
    node.clearMeasurements();
  }
  function clearIsLayoutDirty(node) {
    node.isLayoutDirty = false;
  }
  function resetTransformStyle(node) {
    const { visualElement } = node.options;
    if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) {
      visualElement.notify("BeforeLayoutMeasure");
    }
    node.resetTransform();
  }
  function finishAnimation(node) {
    node.finishAnimation();
    node.targetDelta = node.relativeTarget = node.target = void 0;
    node.isProjectionDirty = true;
  }
  function resolveTargetDelta(node) {
    node.resolveTargetDelta();
  }
  function calcProjection(node) {
    node.calcProjection();
  }
  function resetSkewAndRotation(node) {
    node.resetSkewAndRotation();
  }
  function removeLeadSnapshots(stack) {
    stack.removeLeadSnapshot();
  }
  function mixAxisDelta(output, delta, p2) {
    output.translate = mixNumber$1(delta.translate, 0, p2);
    output.scale = mixNumber$1(delta.scale, 1, p2);
    output.origin = delta.origin;
    output.originPoint = delta.originPoint;
  }
  function mixAxis(output, from, to, p2) {
    output.min = mixNumber$1(from.min, to.min, p2);
    output.max = mixNumber$1(from.max, to.max, p2);
  }
  function mixBox(output, from, to, p2) {
    mixAxis(output.x, from.x, to.x, p2);
    mixAxis(output.y, from.y, to.y, p2);
  }
  function hasOpacityCrossfade(node) {
    return node.animationValues && node.animationValues.opacityExit !== void 0;
  }
  const defaultLayoutTransition = {
    duration: 0.45,
    ease: [0.4, 0, 0.1, 1]
  };
  const userAgentContains = (string) => typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(string);
  const roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/") ? Math.round : noop;
  function roundAxis(axis) {
    axis.min = roundPoint(axis.min);
    axis.max = roundPoint(axis.max);
  }
  function roundBox(box) {
    roundAxis(box.x);
    roundAxis(box.y);
  }
  function shouldAnimatePositionOnly(animationType, snapshot, layout2) {
    return animationType === "position" || animationType === "preserve-aspect" && !isNear(aspectRatio(snapshot), aspectRatio(layout2), 0.2);
  }
  function checkNodeWasScrollRoot(node) {
    var _a;
    return node !== node.root && ((_a = node.scroll) === null || _a === void 0 ? void 0 : _a.wasRoot);
  }
  const DocumentProjectionNode = createProjectionNode({
    attachResizeListener: (ref, notify) => addDomEvent(ref, "resize", notify),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop
    }),
    checkIsScrollRoot: () => true
  });
  const rootProjectionNode = {
    current: void 0
  };
  const HTMLProjectionNode = createProjectionNode({
    measureScroll: (instance) => ({
      x: instance.scrollLeft,
      y: instance.scrollTop
    }),
    defaultParent: () => {
      if (!rootProjectionNode.current) {
        const documentNode = new DocumentProjectionNode({});
        documentNode.mount(window);
        documentNode.setOptions({ layoutScroll: true });
        rootProjectionNode.current = documentNode;
      }
      return rootProjectionNode.current;
    },
    resetTransform: (instance, value) => {
      instance.style.transform = value !== void 0 ? value : "none";
    },
    checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed")
  });
  const drag = {
    pan: {
      Feature: PanGesture
    },
    drag: {
      Feature: DragGesture,
      ProjectionNode: HTMLProjectionNode,
      MeasureLayout
    }
  };
  function handleHoverEvent(node, event, lifecycle) {
    const { props } = node;
    if (node.animationState && props.whileHover) {
      node.animationState.setActive("whileHover", lifecycle === "Start");
    }
    const eventName = "onHover" + lifecycle;
    const callback = props[eventName];
    if (callback) {
      frame.postRender(() => callback(event, extractEventInfo(event)));
    }
  }
  class HoverGesture extends Feature {
    mount() {
      const { current } = this.node;
      if (!current)
        return;
      this.unmount = hover(current, (startEvent) => {
        handleHoverEvent(this.node, startEvent, "Start");
        return (endEvent) => handleHoverEvent(this.node, endEvent, "End");
      });
    }
    unmount() {
    }
  }
  class FocusGesture extends Feature {
    constructor() {
      super(...arguments);
      this.isActive = false;
    }
    onFocus() {
      let isFocusVisible = false;
      try {
        isFocusVisible = this.node.current.matches(":focus-visible");
      } catch (e) {
        isFocusVisible = true;
      }
      if (!isFocusVisible || !this.node.animationState)
        return;
      this.node.animationState.setActive("whileFocus", true);
      this.isActive = true;
    }
    onBlur() {
      if (!this.isActive || !this.node.animationState)
        return;
      this.node.animationState.setActive("whileFocus", false);
      this.isActive = false;
    }
    mount() {
      this.unmount = pipe(addDomEvent(this.node.current, "focus", () => this.onFocus()), addDomEvent(this.node.current, "blur", () => this.onBlur()));
    }
    unmount() {
    }
  }
  function handlePressEvent(node, event, lifecycle) {
    const { props } = node;
    if (node.animationState && props.whileTap) {
      node.animationState.setActive("whileTap", lifecycle === "Start");
    }
    const eventName = "onTap" + (lifecycle === "End" ? "" : lifecycle);
    const callback = props[eventName];
    if (callback) {
      frame.postRender(() => callback(event, extractEventInfo(event)));
    }
  }
  class PressGesture extends Feature {
    mount() {
      const { current } = this.node;
      if (!current)
        return;
      this.unmount = press(current, (startEvent) => {
        handlePressEvent(this.node, startEvent, "Start");
        return (endEvent, { success }) => handlePressEvent(this.node, endEvent, success ? "End" : "Cancel");
      }, { useGlobalTarget: this.node.props.globalTapTarget });
    }
    unmount() {
    }
  }
  const observerCallbacks = /* @__PURE__ */ new WeakMap();
  const observers = /* @__PURE__ */ new WeakMap();
  const fireObserverCallback = (entry) => {
    const callback = observerCallbacks.get(entry.target);
    callback && callback(entry);
  };
  const fireAllObserverCallbacks = (entries) => {
    entries.forEach(fireObserverCallback);
  };
  function initIntersectionObserver({ root, ...options2 }) {
    const lookupRoot = root || document;
    if (!observers.has(lookupRoot)) {
      observers.set(lookupRoot, {});
    }
    const rootObservers = observers.get(lookupRoot);
    const key = JSON.stringify(options2);
    if (!rootObservers[key]) {
      rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, { root, ...options2 });
    }
    return rootObservers[key];
  }
  function observeIntersection(element, options2, callback) {
    const rootInteresectionObserver = initIntersectionObserver(options2);
    observerCallbacks.set(element, callback);
    rootInteresectionObserver.observe(element);
    return () => {
      observerCallbacks.delete(element);
      rootInteresectionObserver.unobserve(element);
    };
  }
  const thresholdNames = {
    some: 0,
    all: 1
  };
  class InViewFeature extends Feature {
    constructor() {
      super(...arguments);
      this.hasEnteredView = false;
      this.isInView = false;
    }
    startObserver() {
      this.unmount();
      const { viewport = {} } = this.node.getProps();
      const { root, margin: rootMargin, amount = "some", once } = viewport;
      const options2 = {
        root: root ? root.current : void 0,
        rootMargin,
        threshold: typeof amount === "number" ? amount : thresholdNames[amount]
      };
      const onIntersectionUpdate = (entry) => {
        const { isIntersecting } = entry;
        if (this.isInView === isIntersecting)
          return;
        this.isInView = isIntersecting;
        if (once && !isIntersecting && this.hasEnteredView) {
          return;
        } else if (isIntersecting) {
          this.hasEnteredView = true;
        }
        if (this.node.animationState) {
          this.node.animationState.setActive("whileInView", isIntersecting);
        }
        const { onViewportEnter, onViewportLeave } = this.node.getProps();
        const callback = isIntersecting ? onViewportEnter : onViewportLeave;
        callback && callback(entry);
      };
      return observeIntersection(this.node.current, options2, onIntersectionUpdate);
    }
    mount() {
      this.startObserver();
    }
    update() {
      if (typeof IntersectionObserver === "undefined")
        return;
      const { props, prevProps } = this.node;
      const hasOptionsChanged = ["amount", "margin", "root"].some(hasViewportOptionChanged(props, prevProps));
      if (hasOptionsChanged) {
        this.startObserver();
      }
    }
    unmount() {
    }
  }
  function hasViewportOptionChanged({ viewport = {} }, { viewport: prevViewport = {} } = {}) {
    return (name) => viewport[name] !== prevViewport[name];
  }
  const gestureAnimations = {
    inView: {
      Feature: InViewFeature
    },
    tap: {
      Feature: PressGesture
    },
    focus: {
      Feature: FocusGesture
    },
    hover: {
      Feature: HoverGesture
    }
  };
  const layout = {
    layout: {
      ProjectionNode: HTMLProjectionNode,
      MeasureLayout
    }
  };
  const prefersReducedMotion = { current: null };
  const hasReducedMotionListener = { current: false };
  function initPrefersReducedMotion() {
    hasReducedMotionListener.current = true;
    if (!isBrowser)
      return;
    if (window.matchMedia) {
      const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
      const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
      motionMediaQuery.addListener(setReducedMotionPreferences);
      setReducedMotionPreferences();
    } else {
      prefersReducedMotion.current = false;
    }
  }
  const valueTypes = [...dimensionValueTypes, color, complex];
  const findValueType = (v2) => valueTypes.find(testValueType(v2));
  const visualElementStore = /* @__PURE__ */ new WeakMap();
  function updateMotionValuesFromProps(element, next, prev) {
    for (const key in next) {
      const nextValue = next[key];
      const prevValue = prev[key];
      if (isMotionValue(nextValue)) {
        element.addValue(key, nextValue);
      } else if (isMotionValue(prevValue)) {
        element.addValue(key, motionValue(nextValue, { owner: element }));
      } else if (prevValue !== nextValue) {
        if (element.hasValue(key)) {
          const existingValue = element.getValue(key);
          if (existingValue.liveStyle === true) {
            existingValue.jump(nextValue);
          } else if (!existingValue.hasAnimated) {
            existingValue.set(nextValue);
          }
        } else {
          const latestValue = element.getStaticValue(key);
          element.addValue(key, motionValue(latestValue !== void 0 ? latestValue : nextValue, { owner: element }));
        }
      }
    }
    for (const key in prev) {
      if (next[key] === void 0)
        element.removeValue(key);
    }
    return next;
  }
  const propEventHandlers = [
    "AnimationStart",
    "AnimationComplete",
    "Update",
    "BeforeLayoutMeasure",
    "LayoutMeasure",
    "LayoutAnimationStart",
    "LayoutAnimationComplete"
  ];
  class VisualElement {
    /**
     * This method takes React props and returns found MotionValues. For example, HTML
     * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
     *
     * This isn't an abstract method as it needs calling in the constructor, but it is
     * intended to be one.
     */
    scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
      return {};
    }
    constructor({ parent, props, presenceContext, reducedMotionConfig, blockInitialAnimation, visualState }, options2 = {}) {
      this.current = null;
      this.children = /* @__PURE__ */ new Set();
      this.isVariantNode = false;
      this.isControllingVariants = false;
      this.shouldReduceMotion = null;
      this.values = /* @__PURE__ */ new Map();
      this.KeyframeResolver = KeyframeResolver;
      this.features = {};
      this.valueSubscriptions = /* @__PURE__ */ new Map();
      this.prevMotionValues = {};
      this.events = {};
      this.propEventSubscriptions = {};
      this.notifyUpdate = () => this.notify("Update", this.latestValues);
      this.render = () => {
        if (!this.current)
          return;
        this.triggerBuild();
        this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
      };
      this.renderScheduledAt = 0;
      this.scheduleRender = () => {
        const now2 = time.now();
        if (this.renderScheduledAt < now2) {
          this.renderScheduledAt = now2;
          frame.render(this.render, false, true);
        }
      };
      const { latestValues, renderState, onUpdate } = visualState;
      this.onUpdate = onUpdate;
      this.latestValues = latestValues;
      this.baseTarget = { ...latestValues };
      this.initialValues = props.initial ? { ...latestValues } : {};
      this.renderState = renderState;
      this.parent = parent;
      this.props = props;
      this.presenceContext = presenceContext;
      this.depth = parent ? parent.depth + 1 : 0;
      this.reducedMotionConfig = reducedMotionConfig;
      this.options = options2;
      this.blockInitialAnimation = Boolean(blockInitialAnimation);
      this.isControllingVariants = isControllingVariants(props);
      this.isVariantNode = isVariantNode(props);
      if (this.isVariantNode) {
        this.variantChildren = /* @__PURE__ */ new Set();
      }
      this.manuallyAnimateOnMount = Boolean(parent && parent.current);
      const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
      for (const key in initialMotionValues) {
        const value = initialMotionValues[key];
        if (latestValues[key] !== void 0 && isMotionValue(value)) {
          value.set(latestValues[key], false);
        }
      }
    }
    mount(instance) {
      this.current = instance;
      visualElementStore.set(instance, this);
      if (this.projection && !this.projection.instance) {
        this.projection.mount(instance);
      }
      if (this.parent && this.isVariantNode && !this.isControllingVariants) {
        this.removeFromVariantTree = this.parent.addVariantChild(this);
      }
      this.values.forEach((value, key) => this.bindToMotionValue(key, value));
      if (!hasReducedMotionListener.current) {
        initPrefersReducedMotion();
      }
      this.shouldReduceMotion = this.reducedMotionConfig === "never" ? false : this.reducedMotionConfig === "always" ? true : prefersReducedMotion.current;
      if (this.parent)
        this.parent.children.add(this);
      this.update(this.props, this.presenceContext);
    }
    unmount() {
      visualElementStore.delete(this.current);
      this.projection && this.projection.unmount();
      cancelFrame(this.notifyUpdate);
      cancelFrame(this.render);
      this.valueSubscriptions.forEach((remove) => remove());
      this.valueSubscriptions.clear();
      this.removeFromVariantTree && this.removeFromVariantTree();
      this.parent && this.parent.children.delete(this);
      for (const key in this.events) {
        this.events[key].clear();
      }
      for (const key in this.features) {
        const feature = this.features[key];
        if (feature) {
          feature.unmount();
          feature.isMounted = false;
        }
      }
      this.current = null;
    }
    bindToMotionValue(key, value) {
      if (this.valueSubscriptions.has(key)) {
        this.valueSubscriptions.get(key)();
      }
      const valueIsTransform = transformProps.has(key);
      const removeOnChange = value.on("change", (latestValue) => {
        this.latestValues[key] = latestValue;
        this.props.onUpdate && frame.preRender(this.notifyUpdate);
        if (valueIsTransform && this.projection) {
          this.projection.isTransformDirty = true;
        }
      });
      const removeOnRenderRequest = value.on("renderRequest", this.scheduleRender);
      let removeSyncCheck;
      if (window.MotionCheckAppearSync) {
        removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
      }
      this.valueSubscriptions.set(key, () => {
        removeOnChange();
        removeOnRenderRequest();
        if (removeSyncCheck)
          removeSyncCheck();
        if (value.owner)
          value.stop();
      });
    }
    sortNodePosition(other) {
      if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
        return 0;
      }
      return this.sortInstanceNodePosition(this.current, other.current);
    }
    updateFeatures() {
      let key = "animation";
      for (key in featureDefinitions) {
        const featureDefinition = featureDefinitions[key];
        if (!featureDefinition)
          continue;
        const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
        if (!this.features[key] && FeatureConstructor && isEnabled(this.props)) {
          this.features[key] = new FeatureConstructor(this);
        }
        if (this.features[key]) {
          const feature = this.features[key];
          if (feature.isMounted) {
            feature.update();
          } else {
            feature.mount();
            feature.isMounted = true;
          }
        }
      }
    }
    triggerBuild() {
      this.build(this.renderState, this.latestValues, this.props);
    }
    /**
     * Measure the current viewport box with or without transforms.
     * Only measures axis-aligned boxes, rotate and skew must be manually
     * removed with a re-render to work.
     */
    measureViewportBox() {
      return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
    }
    getStaticValue(key) {
      return this.latestValues[key];
    }
    setStaticValue(key, value) {
      this.latestValues[key] = value;
    }
    /**
     * Update the provided props. Ensure any newly-added motion values are
     * added to our map, old ones removed, and listeners updated.
     */
    update(props, presenceContext) {
      if (props.transformTemplate || this.props.transformTemplate) {
        this.scheduleRender();
      }
      this.prevProps = this.props;
      this.props = props;
      this.prevPresenceContext = this.presenceContext;
      this.presenceContext = presenceContext;
      for (let i2 = 0; i2 < propEventHandlers.length; i2++) {
        const key = propEventHandlers[i2];
        if (this.propEventSubscriptions[key]) {
          this.propEventSubscriptions[key]();
          delete this.propEventSubscriptions[key];
        }
        const listenerName = "on" + key;
        const listener = props[listenerName];
        if (listener) {
          this.propEventSubscriptions[key] = this.on(key, listener);
        }
      }
      this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props, this.prevProps, this), this.prevMotionValues);
      if (this.handleChildMotionValue) {
        this.handleChildMotionValue();
      }
      this.onUpdate && this.onUpdate(this);
    }
    getProps() {
      return this.props;
    }
    /**
     * Returns the variant definition with a given name.
     */
    getVariant(name) {
      return this.props.variants ? this.props.variants[name] : void 0;
    }
    /**
     * Returns the defined default transition on this component.
     */
    getDefaultTransition() {
      return this.props.transition;
    }
    getTransformPagePoint() {
      return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
      return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
    }
    /**
     * Add a child visual element to our set of children.
     */
    addVariantChild(child) {
      const closestVariantNode = this.getClosestVariantNode();
      if (closestVariantNode) {
        closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
        return () => closestVariantNode.variantChildren.delete(child);
      }
    }
    /**
     * Add a motion value and bind it to this visual element.
     */
    addValue(key, value) {
      const existingValue = this.values.get(key);
      if (value !== existingValue) {
        if (existingValue)
          this.removeValue(key);
        this.bindToMotionValue(key, value);
        this.values.set(key, value);
        this.latestValues[key] = value.get();
      }
    }
    /**
     * Remove a motion value and unbind any active subscriptions.
     */
    removeValue(key) {
      this.values.delete(key);
      const unsubscribe = this.valueSubscriptions.get(key);
      if (unsubscribe) {
        unsubscribe();
        this.valueSubscriptions.delete(key);
      }
      delete this.latestValues[key];
      this.removeValueFromRenderState(key, this.renderState);
    }
    /**
     * Check whether we have a motion value for this key
     */
    hasValue(key) {
      return this.values.has(key);
    }
    getValue(key, defaultValue) {
      if (this.props.values && this.props.values[key]) {
        return this.props.values[key];
      }
      let value = this.values.get(key);
      if (value === void 0 && defaultValue !== void 0) {
        value = motionValue(defaultValue === null ? void 0 : defaultValue, { owner: this });
        this.addValue(key, value);
      }
      return value;
    }
    /**
     * If we're trying to animate to a previously unencountered value,
     * we need to check for it in our state and as a last resort read it
     * directly from the instance (which might have performance implications).
     */
    readValue(key, target) {
      var _a;
      let value = this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : (_a = this.getBaseTargetFromProps(this.props, key)) !== null && _a !== void 0 ? _a : this.readValueFromInstance(this.current, key, this.options);
      if (value !== void 0 && value !== null) {
        if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
          value = parseFloat(value);
        } else if (!findValueType(value) && complex.test(target)) {
          value = getAnimatableNone(key, target);
        }
        this.setBaseTarget(key, isMotionValue(value) ? value.get() : value);
      }
      return isMotionValue(value) ? value.get() : value;
    }
    /**
     * Set the base target to later animate back to. This is currently
     * only hydrated on creation and when we first read a value.
     */
    setBaseTarget(key, value) {
      this.baseTarget[key] = value;
    }
    /**
     * Find the base target for a value thats been removed from all animation
     * props.
     */
    getBaseTarget(key) {
      var _a;
      const { initial } = this.props;
      let valueFromInitial;
      if (typeof initial === "string" || typeof initial === "object") {
        const variant = resolveVariantFromProps(this.props, initial, (_a = this.presenceContext) === null || _a === void 0 ? void 0 : _a.custom);
        if (variant) {
          valueFromInitial = variant[key];
        }
      }
      if (initial && valueFromInitial !== void 0) {
        return valueFromInitial;
      }
      const target = this.getBaseTargetFromProps(this.props, key);
      if (target !== void 0 && !isMotionValue(target))
        return target;
      return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
    }
    on(eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = new SubscriptionManager();
      }
      return this.events[eventName].add(callback);
    }
    notify(eventName, ...args) {
      if (this.events[eventName]) {
        this.events[eventName].notify(...args);
      }
    }
  }
  class DOMVisualElement extends VisualElement {
    constructor() {
      super(...arguments);
      this.KeyframeResolver = DOMKeyframesResolver;
    }
    sortInstanceNodePosition(a2, b) {
      return a2.compareDocumentPosition(b) & 2 ? 1 : -1;
    }
    getBaseTargetFromProps(props, key) {
      return props.style ? props.style[key] : void 0;
    }
    removeValueFromRenderState(key, { vars, style }) {
      delete vars[key];
      delete style[key];
    }
    handleChildMotionValue() {
      if (this.childSubscription) {
        this.childSubscription();
        delete this.childSubscription;
      }
      const { children } = this.props;
      if (isMotionValue(children)) {
        this.childSubscription = children.on("change", (latest) => {
          if (this.current) {
            this.current.textContent = `${latest}`;
          }
        });
      }
    }
  }
  function getComputedStyle$1(element) {
    return window.getComputedStyle(element);
  }
  class HTMLVisualElement extends DOMVisualElement {
    constructor() {
      super(...arguments);
      this.type = "html";
      this.renderInstance = renderHTML;
    }
    readValueFromInstance(instance, key) {
      if (transformProps.has(key)) {
        const defaultType = getDefaultValueType(key);
        return defaultType ? defaultType.default || 0 : 0;
      } else {
        const computedStyle = getComputedStyle$1(instance);
        const value = (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
        return typeof value === "string" ? value.trim() : value;
      }
    }
    measureInstanceViewportBox(instance, { transformPagePoint }) {
      return measureViewportBox(instance, transformPagePoint);
    }
    build(renderState, latestValues, props) {
      buildHTMLStyles(renderState, latestValues, props.transformTemplate);
    }
    scrapeMotionValuesFromProps(props, prevProps, visualElement) {
      return scrapeMotionValuesFromProps$1(props, prevProps, visualElement);
    }
  }
  class SVGVisualElement extends DOMVisualElement {
    constructor() {
      super(...arguments);
      this.type = "svg";
      this.isSVGTag = false;
      this.measureInstanceViewportBox = createBox;
    }
    getBaseTargetFromProps(props, key) {
      return props[key];
    }
    readValueFromInstance(instance, key) {
      if (transformProps.has(key)) {
        const defaultType = getDefaultValueType(key);
        return defaultType ? defaultType.default || 0 : 0;
      }
      key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
      return instance.getAttribute(key);
    }
    scrapeMotionValuesFromProps(props, prevProps, visualElement) {
      return scrapeMotionValuesFromProps(props, prevProps, visualElement);
    }
    build(renderState, latestValues, props) {
      buildSVGAttrs(renderState, latestValues, this.isSVGTag, props.transformTemplate);
    }
    renderInstance(instance, renderState, styleProp, projection) {
      renderSVG(instance, renderState, styleProp, projection);
    }
    mount(instance) {
      this.isSVGTag = isSVGTag(instance.tagName);
      super.mount(instance);
    }
  }
  const createDomVisualElement = (Component, options2) => {
    return isSVGComponent(Component) ? new SVGVisualElement(options2) : new HTMLVisualElement(options2, {
      allowProjection: Component !== reactExports.Fragment
    });
  };
  const createMotionComponent = /* @__PURE__ */ createMotionComponentFactory({
    ...animations,
    ...gestureAnimations,
    ...drag,
    ...layout
  }, createDomVisualElement);
  const motion = /* @__PURE__ */ createDOMMotionComponentProxy(createMotionComponent);
  const SHADOW_STYLES = `
/* Shadow Plugin Design System - CSS Variables */
:host {
  /* Background Colors */
  --surface: rgba(24, 24, 27, 0.95);
  --surface-hover: rgba(39, 39, 42, 0.95);
  --surface-bg: rgba(9, 9, 11, 0.95);
  
  /* Text Colors */
  --text-primary: rgba(255, 255, 255, 0.98);
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-tertiary: rgba(255, 255, 255, 0.5);
  
  /* Border & Accent */
  --border: rgba(63, 63, 70, 0.8);
  --accent: #ff6363;
  
  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono: -apple-system, BlinkMacSystemFont, "SF Mono", Monaco, "Cascadia Code", monospace;
}

/* Essential Shadow DOM normalization */
* {
  box-sizing: border-box;
}

/* Smooth scrollbars for command list */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--surface-hover);
}
`;
  function ShadowStyles() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("style", { id: "shadow-plugin-styles", dangerouslySetInnerHTML: { __html: SHADOW_STYLES } });
  }
  function SearchInput({ query, setQuery }) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      padding: "20px 24px 16px 24px",
      borderBottom: "1px solid var(--border)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      position: "relative",
      display: "flex",
      alignItems: "center"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        position: "absolute",
        left: "16px",
        color: "var(--text-secondary)",
        pointerEvents: "none",
        zIndex: 1
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m21 21-4.35-4.35" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Search Shadow Plugin features...",
          value: query,
          onChange: (e) => setQuery(e.target.value),
          autoFocus: true,
          style: {
            width: "100%",
            height: "48px",
            padding: "0 16px 0 52px",
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--text-primary)",
            fontSize: "18px",
            fontWeight: "400",
            lineHeight: "1.4",
            fontFamily: "inherit"
          }
        }
      )
    ] }) });
  }
  function CommandItem({ command, index, onClick }) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        style: {
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          cursor: "pointer",
          borderBottom: "1px solid var(--border)",
          backgroundColor: "transparent",
          transition: "background-color 0.15s ease",
          position: "relative"
        },
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.2, delay: index * 0.03 },
        whileHover: {
          backgroundColor: "var(--surface-hover)",
          transition: { duration: 0.1 }
        },
        onClick: () => onClick == null ? void 0 : onClick(command),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            fontSize: "22px",
            lineHeight: "1",
            flexShrink: 0
          }, children: command.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "4px"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              fontSize: "15px",
              fontWeight: "500",
              color: "var(--text-primary)",
              lineHeight: "1.3",
              wordBreak: "break-word"
            }, children: command.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              fontSize: "13px",
              color: "var(--text-secondary)",
              lineHeight: "1.4",
              wordBreak: "break-word"
            }, children: command.description })
          ] })
        ]
      }
    );
  }
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  const toCamelCase = (string) => string.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
  );
  const toPascalCase = (string) => {
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  };
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
  }).join(" ").trim();
  const hasA11yProp = (props) => {
    for (const prop in props) {
      if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
        return true;
      }
    }
  };
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const Icon = reactExports.forwardRef(
    ({
      color: color2 = "currentColor",
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className = "",
      children,
      iconNode,
      ...rest
    }, ref) => reactExports.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color2,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    )
  );
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const createLucideIcon = (iconName, iconNode) => {
    const Component = reactExports.forwardRef(
      ({ className, ...props }, ref) => reactExports.createElement(Icon, {
        ref,
        iconNode,
        className: mergeClasses(
          `lucide-${toKebabCase(toPascalCase(iconName))}`,
          `lucide-${iconName}`,
          className
        ),
        ...props
      })
    );
    Component.displayName = toPascalCase(iconName);
    return Component;
  };
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const __iconNode$g = [
    ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2", key: "76otgf" }],
    ["path", { d: "M9 22v-4h6v4", key: "r93iot" }],
    ["path", { d: "M8 6h.01", key: "1dz90k" }],
    ["path", { d: "M16 6h.01", key: "1x0f13" }],
    ["path", { d: "M12 6h.01", key: "1vi96p" }],
    ["path", { d: "M12 10h.01", key: "1nrarc" }],
    ["path", { d: "M12 14h.01", key: "1etili" }],
    ["path", { d: "M16 10h.01", key: "1m94wz" }],
    ["path", { d: "M16 14h.01", key: "1gbofw" }],
    ["path", { d: "M8 10h.01", key: "19clt8" }],
    ["path", { d: "M8 14h.01", key: "6423bh" }]
  ];
  const Building = createLucideIcon("building", __iconNode$g);
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const __iconNode$f = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
  ];
  const CircleAlert = createLucideIcon("circle-alert", __iconNode$f);
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const __iconNode$e = [
    ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
    ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
  ];
  const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$e);
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const __iconNode$d = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
  ];
  const Clock = createLucideIcon("clock", __iconNode$d);
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const __iconNode$c = [
    [
      "path",
      { d: "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3", key: "11bfej" }
    ]
  ];
  const Command = createLucideIcon("command", __iconNode$c);
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const __iconNode$b = [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ];
  const Copy = createLucideIcon("copy", __iconNode$b);
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const __iconNode$a = [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ];
  const ExternalLink = createLucideIcon("external-link", __iconNode$a);
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const __iconNode$9 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
    ["path", { d: "M2 12h20", key: "9i4pu4" }]
  ];
  const Globe = createLucideIcon("globe", __iconNode$9);
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const __iconNode$8 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
  const LoaderCircle = createLucideIcon("loader-circle", __iconNode$8);
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const __iconNode$7 = [
    ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
    ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
  ];
  const Mail = createLucideIcon("mail", __iconNode$7);
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const __iconNode$6 = [
    ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
  ];
  const MessageCircle = createLucideIcon("message-circle", __iconNode$6);
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const __iconNode$5 = [
    ["path", { d: "M5.8 11.3 2 22l10.7-3.79", key: "gwxi1d" }],
    ["path", { d: "M4 3h.01", key: "1vcuye" }],
    ["path", { d: "M22 8h.01", key: "1mrtc2" }],
    ["path", { d: "M15 2h.01", key: "1cjtqr" }],
    ["path", { d: "M22 20h.01", key: "1mrys2" }],
    [
      "path",
      {
        d: "m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10",
        key: "hbicv8"
      }
    ],
    [
      "path",
      { d: "m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17", key: "1i94pl" }
    ],
    ["path", { d: "m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7", key: "1cofks" }],
    [
      "path",
      {
        d: "M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z",
        key: "4kbmks"
      }
    ]
  ];
  const PartyPopper = createLucideIcon("party-popper", __iconNode$5);
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const __iconNode$4 = [
    ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
    ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
    ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
    ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
    ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
  ];
  const Share2 = createLucideIcon("share-2", __iconNode$4);
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const __iconNode$3 = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y"
      }
    ]
  ];
  const Shield = createLucideIcon("shield", __iconNode$3);
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const __iconNode$2 = [
    ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
    ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
    [
      "path",
      {
        d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
        key: "9zh506"
      }
    ]
  ];
  const ShoppingCart = createLucideIcon("shopping-cart", __iconNode$2);
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const __iconNode$1 = [
    ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
    ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
  ];
  const User = createLucideIcon("user", __iconNode$1);
  /**
   * @license lucide-react v0.513.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const __iconNode = [
    [
      "path",
      {
        d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
        key: "1xq2db"
      }
    ]
  ];
  const Zap = createLucideIcon("zap", __iconNode);
  function CommandPalette({
    query,
    setQuery,
    filteredCommands,
    onCommandClick,
    onClose
  }) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          style: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            zIndex: 999999998,
            cursor: "pointer"
          },
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.2 },
          onClick: onClose
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          style: {
            position: "fixed",
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            zIndex: 999999999,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "15vh",
            paddingLeft: "16px",
            paddingRight: "16px",
            pointerEvents: "none"
          },
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              style: {
                width: "100%",
                maxWidth: "640px",
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: `
              0 0 0 1px rgba(255, 255, 255, 0.05),
              0 32px 80px rgba(0, 0, 0, 0.6),
              0 16px 32px rgba(0, 0, 0, 0.4)
            `,
                backdropFilter: "blur(40px) saturate(180%)",
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
                pointerEvents: "auto",
                fontFamily: "var(--font-sans)"
              },
              initial: { opacity: 0, y: -20, scale: 0.95 },
              animate: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, y: -20, scale: 0.95 },
              transition: {
                type: "spring",
                damping: 30,
                stiffness: 300,
                duration: 0.4
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SearchInput,
                  {
                    query,
                    setQuery
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                  maxHeight: "400px",
                  overflowY: "auto",
                  overflowX: "hidden"
                }, children: filteredCommands.length > 0 ? filteredCommands.map((command, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CommandItem,
                  {
                    command,
                    index,
                    onClick: onCommandClick
                  },
                  command.id
                )) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                  padding: "32px 24px",
                  textAlign: "center",
                  color: "var(--text-secondary)",
                  fontSize: "14px"
                }, children: [
                  'No results found for "',
                  query,
                  '"'
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                  padding: "12px 24px",
                  borderTop: "1px solid var(--border)",
                  backgroundColor: "var(--surface-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                    fontSize: "12px",
                    color: "var(--text-secondary)",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 14 }),
                    "WooCommerce Cart Share & Quote"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "11px",
                    color: "var(--text-tertiary)"
                  }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Press" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { style: {
                      backgroundColor: "var(--surface)",
                      color: "var(--text-secondary)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: "600",
                      border: "1px solid var(--border)",
                      fontFamily: "var(--font-mono)"
                    }, children: "⌘K" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "to toggle" })
                  ] })
                ] })
              ]
            }
          )
        }
      )
    ] });
  }
  function TriggerButton({ onClick }) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.button,
      {
        onClick,
        style: {
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 999999997,
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "50%",
          padding: "12px",
          color: "var(--text-primary)",
          fontSize: "14px",
          fontWeight: "500",
          fontFamily: "var(--font-sans)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "48px",
          height: "48px",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          boxShadow: `
          0 0 0 1px rgba(255, 255, 255, 0.05),
          0 8px 24px rgba(0, 0, 0, 0.3),
          0 4px 8px rgba(0, 0, 0, 0.2)
        `,
          transition: "all 0.2s ease",
          outline: "none"
        },
        initial: { opacity: 0, scale: 0.8, y: 10 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { delay: 1, duration: 0.3 },
        whileHover: {
          scale: 1.05,
          backgroundColor: "var(--surface-hover)",
          transition: { duration: 0.15 }
        },
        whileTap: {
          scale: 0.95,
          transition: { duration: 0.1 }
        },
        title: "Open Command Palette (Ctrl/⌘ + K)",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Command, { size: 20 })
      }
    );
  }
  function SharedCartView({ cartHash, restNonce }) {
    const [sharedCart, setSharedCart] = reactExports.useState(null);
    const [loading, setLoading] = reactExports.useState(true);
    const [error, setError] = reactExports.useState(null);
    const [addingToCart, setAddingToCart] = reactExports.useState(false);
    reactExports.useEffect(() => {
      fetchSharedCart();
    }, [cartHash]);
    const fetchSharedCart = async () => {
      if (!cartHash || !restNonce) {
        setError("Invalid shared cart link");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(`/wp-json/wc-cart-share-quote/v1/shared-cart/${cartHash}`, {
          headers: {
            "X-WP-Nonce": restNonce
          }
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to load shared cart");
        }
        if (data.success) {
          setSharedCart(data.data);
        } else {
          throw new Error("Failed to load shared cart");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const addAllToCart = async () => {
      setAddingToCart(true);
      try {
        const response = await fetch(`/wp-json/wc-cart-share-quote/v1/shared-cart/${cartHash}/add`, {
          method: "POST",
          headers: {
            "X-WP-Nonce": restNonce,
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to add items to cart");
        }
        if (data.success) {
          window.location.href = data.data.cart_url;
        } else {
          throw new Error("Failed to add items to cart");
        }
      } catch (err) {
        alert("Error: " + err.message);
      } finally {
        setAddingToCart(false);
      }
    };
    if (loading) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "300px",
        flexDirection: "column",
        gap: "16px"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          width: "40px",
          height: "40px",
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #007cba",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading shared cart..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` })
      ] });
    }
    if (error) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        padding: "40px",
        textAlign: "center",
        background: "#fee",
        border: "1px solid #fcc",
        borderRadius: "8px",
        margin: "20px 0"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#c33", margin: "0 0 16px 0" }, children: error.includes("expired") ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 18, style: { marginRight: "8px" } }),
          "Cart Expired"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 18, style: { marginRight: "8px" } }),
          "Cart Not Found"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "0 0 20px 0", color: "#666" }, children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", style: {
          display: "inline-block",
          padding: "12px 24px",
          background: "#007cba",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px"
        }, children: "← Back to Shop" })
      ] });
    }
    if (!sharedCart) {
      return null;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        style: {
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            background: "linear-gradient(135deg, #007cba 0%, #005a87 100%)",
            color: "white",
            padding: "30px",
            borderRadius: "12px 12px 0 0",
            textAlign: "center"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { margin: "0 0 10px 0", fontSize: "28px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 24, style: { marginRight: "12px" } }),
              "Shared Cart"
            ] }),
            sharedCart.customer_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { margin: "0", opacity: 0.9, fontSize: "16px" }, children: [
              "Shared by ",
              sharedCart.customer_name
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            background: "white",
            border: "1px solid #ddd",
            borderTop: "none"
          }, children: [
            sharedCart.items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  padding: "20px",
                  borderBottom: index < sharedCart.items.length - 1 ? "1px solid #eee" : "none",
                  gap: "20px"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "0 0 8px 0", fontSize: "18px", color: "#333" }, children: item.product_name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#666", fontSize: "14px" }, children: [
                      "Quantity: ",
                      item.quantity,
                      " × $",
                      item.product_price
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#007cba",
                    minWidth: "100px",
                    textAlign: "right"
                  }, children: [
                    "$",
                    item.line_total
                  ] })
                ]
              },
              index
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              padding: "20px",
              background: "#f8f9fa",
              borderTop: "2px solid #007cba",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "20px", fontWeight: "bold" }, children: "Total:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "24px", fontWeight: "bold", color: "#007cba" }, children: [
                "$",
                sharedCart.total
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            background: "#f8f9fa",
            padding: "30px",
            borderRadius: "0 0 12px 12px",
            border: "1px solid #ddd",
            borderTop: "none",
            textAlign: "center"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "0 0 20px 0", color: "#666" }, children: "Add these items to your cart to continue shopping" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: addAllToCart,
                  disabled: addingToCart,
                  style: {
                    padding: "15px 30px",
                    background: addingToCart ? "#ccc" : "#007cba",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: addingToCart ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    transition: "all 0.2s ease"
                  },
                  children: addingToCart ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                      width: "16px",
                      height: "16px",
                      border: "2px solid transparent",
                      borderTop: "2px solid white",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite"
                    } }),
                    "Adding to Cart..."
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 18, style: { marginRight: "8px" } }),
                    "Add All to Cart"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "/",
                  style: {
                    padding: "15px 30px",
                    background: "white",
                    color: "#007cba",
                    border: "2px solid #007cba",
                    borderRadius: "6px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    transition: "all 0.2s ease"
                  },
                  children: "← Continue Shopping"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              marginTop: "30px",
              padding: "20px",
              background: "white",
              borderRadius: "8px",
              border: "1px solid #ddd"
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              fontSize: "14px",
              color: "#666"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Cart ID:" }),
                " ",
                sharedCart.hash
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Items:" }),
                " ",
                sharedCart.items.length
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Viewed:" }),
                " ",
                sharedCart.access_count,
                " times"
              ] }),
              sharedCart.expires_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Expires:" }),
                " ",
                new Date(sharedCart.expires_at).toLocaleDateString()
              ] })
            ] }) })
          ] })
        ]
      }
    );
  }
  function QuoteView({ quoteId, restNonce }) {
    const [quote, setQuote] = reactExports.useState(null);
    const [loading, setLoading] = reactExports.useState(true);
    const [error, setError] = reactExports.useState(null);
    const [accepting, setAccepting] = reactExports.useState(false);
    reactExports.useEffect(() => {
      fetchQuote();
    }, [quoteId]);
    const fetchQuote = async () => {
      if (!quoteId || !restNonce) {
        setError("Invalid quote link");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(`/wp-json/wc-cart-share-quote/v1/quote/${quoteId}`, {
          headers: {
            "X-WP-Nonce": restNonce
          }
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to load quote");
        }
        if (data.success) {
          setQuote(data.data);
        } else {
          throw new Error("Failed to load quote");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const acceptQuote = async () => {
      setAccepting(true);
      try {
        const response = await fetch(`/wp-json/wc-cart-share-quote/v1/quote/${quoteId}/accept`, {
          method: "POST",
          headers: {
            "X-WP-Nonce": restNonce,
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to accept quote");
        }
        if (data.success) {
          window.location.href = data.data.cart_url;
        } else {
          throw new Error("Failed to accept quote");
        }
      } catch (err) {
        alert("Error: " + err.message);
      } finally {
        setAccepting(false);
      }
    };
    const getStatusIcon = (status) => {
      switch (status) {
        case "pending":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" });
        case "approved":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 16 });
        case "rejected":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16 });
        case "expired":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 16 });
        default:
          return "❓";
      }
    };
    const getStatusText = (status) => {
      switch (status) {
        case "pending":
          return "Pending Review";
        case "approved":
          return "Approved";
        case "rejected":
          return "Rejected";
        case "expired":
          return "Expired";
        default:
          return "Unknown";
      }
    };
    if (loading) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "300px",
        flexDirection: "column",
        gap: "16px"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          width: "40px",
          height: "40px",
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #00a32a",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading quote..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` })
      ] });
    }
    if (error) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        padding: "40px",
        textAlign: "center",
        background: "#fee",
        border: "1px solid #fcc",
        borderRadius: "8px",
        margin: "20px 0"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#c33", margin: "0 0 16px 0" }, children: "❌ Quote Not Found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "0 0 20px 0", color: "#666" }, children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", style: {
          display: "inline-block",
          padding: "12px 24px",
          background: "#00a32a",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px"
        }, children: "← Back to Shop" })
      ] });
    }
    if (!quote) {
      return null;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        style: {
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            background: "linear-gradient(135deg, #00a32a 0%, #007e1f 100%)",
            color: "white",
            padding: "30px",
            borderRadius: "12px 12px 0 0",
            textAlign: "center"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { margin: "0 0 10px 0", fontSize: "28px" }, children: [
              "💬 Quote #",
              quote.quote_id
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255, 255, 255, 0.2)",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "16px"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: getStatusIcon(quote.status) }),
              getStatusText(quote.status)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            background: "white",
            border: "1px solid #ddd",
            borderTop: "none"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              padding: "20px",
              borderBottom: "1px solid #eee",
              background: "#f8f9fa"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "0 0 10px 0", color: "#333" }, children: "Customer Information" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#666" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: quote.customer_name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                quote.customer_email
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: quote.items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  padding: "20px",
                  borderBottom: index < quote.items.length - 1 ? "1px solid #eee" : "none",
                  gap: "20px"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "0 0 8px 0", fontSize: "18px", color: "#333" }, children: item.product_name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#666", fontSize: "14px" }, children: [
                      "Quantity: ",
                      item.quantity,
                      " × $",
                      item.product_price
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#00a32a",
                    minWidth: "100px",
                    textAlign: "right"
                  }, children: [
                    "$",
                    item.line_total
                  ] })
                ]
              },
              index
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              padding: "20px",
              background: "#f8f9fa",
              borderTop: "2px solid #00a32a",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "20px", fontWeight: "bold" }, children: "Quote Total:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "24px", fontWeight: "bold", color: "#00a32a" }, children: [
                "$",
                quote.quote_total
              ] })
            ] }),
            quote.quote_notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              padding: "20px",
              background: "#fff3cd",
              border: "1px solid #ffeaa7",
              borderLeft: "4px solid #fdcb6e"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { style: { margin: "0 0 10px 0", color: "#856404" }, children: "Notes:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "0", color: "#856404" }, children: quote.quote_notes })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            background: "#f8f9fa",
            padding: "30px",
            borderRadius: "0 0 12px 12px",
            border: "1px solid #ddd",
            borderTop: "none",
            textAlign: "center"
          }, children: [
            quote.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              background: "#fff3cd",
              border: "1px solid #ffeaa7",
              borderRadius: "6px",
              padding: "15px",
              margin: "0 0 20px 0"
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { margin: "0", color: "#856404" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 18, className: "animate-spin", style: { marginRight: "8px" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Your quote is being reviewed." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "We'll update the status once our team has processed your request."
            ] }) }) }),
            quote.status === "approved" && quote.can_accept && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { margin: "0 0 20px 0", color: "#666" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PartyPopper, { size: 18, style: { marginRight: "8px" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Great news!" }),
                " Your quote has been approved. You can now add these items to your cart at the quoted price."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: acceptQuote,
                  disabled: accepting,
                  style: {
                    padding: "15px 30px",
                    background: accepting ? "#ccc" : "#00a32a",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: accepting ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    transition: "all 0.2s ease",
                    marginRight: "15px"
                  },
                  children: accepting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                      width: "16px",
                      height: "16px",
                      border: "2px solid transparent",
                      borderTop: "2px solid white",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite"
                    } }),
                    "Accepting Quote..."
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "✅ Accept Quote & Add to Cart" })
                }
              )
            ] }),
            quote.status === "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              background: "#f8d7da",
              border: "1px solid #f5c6cb",
              borderRadius: "6px",
              padding: "15px",
              margin: "0 0 20px 0"
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { margin: "0", color: "#721c24" }, children: [
              "❌ ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Quote Rejected" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Unfortunately, we cannot fulfill this quote request. Please contact us for alternative options."
            ] }) }),
            quote.status === "expired" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              background: "#d1ecf1",
              border: "1px solid #bee5eb",
              borderRadius: "6px",
              padding: "15px",
              margin: "0 0 20px 0"
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { margin: "0", color: "#0c5460" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 18, style: { marginRight: "8px" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Quote Expired" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "This quote has expired. Please create a new quote request for updated pricing."
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "/",
                  style: {
                    padding: "15px 30px",
                    background: "white",
                    color: "#00a32a",
                    border: "2px solid #00a32a",
                    borderRadius: "6px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    transition: "all 0.2s ease"
                  },
                  children: "← Continue Shopping"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: "mailto:support@example.com",
                  style: {
                    padding: "15px 30px",
                    background: "white",
                    color: "#666",
                    border: "2px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    transition: "all 0.2s ease"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 16, style: { marginRight: "8px" } }),
                    "Contact Support"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              marginTop: "30px",
              padding: "20px",
              background: "white",
              borderRadius: "8px",
              border: "1px solid #ddd"
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              fontSize: "14px",
              color: "#666"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Quote ID:" }),
                " ",
                quote.quote_id
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Status:" }),
                " ",
                getStatusText(quote.status)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Items:" }),
                " ",
                quote.items.length
              ] }),
              quote.expires_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Expires:" }),
                " ",
                new Date(quote.expires_at).toLocaleDateString()
              ] })
            ] }) })
          ] })
        ]
      }
    );
  }
  function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
    return function handleEvent(event) {
      originalEventHandler == null ? void 0 : originalEventHandler(event);
      if (checkForDefaultPrevented === false || !event.defaultPrevented) {
        return ourEventHandler == null ? void 0 : ourEventHandler(event);
      }
    };
  }
  function setRef(ref, value) {
    if (typeof ref === "function") {
      return ref(value);
    } else if (ref !== null && ref !== void 0) {
      ref.current = value;
    }
  }
  function composeRefs(...refs) {
    return (node) => {
      let hasCleanup = false;
      const cleanups = refs.map((ref) => {
        const cleanup = setRef(ref, node);
        if (!hasCleanup && typeof cleanup == "function") {
          hasCleanup = true;
        }
        return cleanup;
      });
      if (hasCleanup) {
        return () => {
          for (let i2 = 0; i2 < cleanups.length; i2++) {
            const cleanup = cleanups[i2];
            if (typeof cleanup == "function") {
              cleanup();
            } else {
              setRef(refs[i2], null);
            }
          }
        };
      }
    };
  }
  function useComposedRefs(...refs) {
    return reactExports.useCallback(composeRefs(...refs), refs);
  }
  function createContext2(rootComponentName, defaultContext) {
    const Context = reactExports.createContext(defaultContext);
    const Provider = (props) => {
      const { children, ...context } = props;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName) {
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  function createContextScope(scopeName, createContextScopeDeps = []) {
    let defaultContexts = [];
    function createContext3(rootComponentName, defaultContext) {
      const BaseContext = reactExports.createContext(defaultContext);
      const index = defaultContexts.length;
      defaultContexts = [...defaultContexts, defaultContext];
      const Provider = (props) => {
        var _a;
        const { scope, children, ...context } = props;
        const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
        const value = reactExports.useMemo(() => context, Object.values(context));
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
      };
      Provider.displayName = rootComponentName + "Provider";
      function useContext2(consumerName, scope) {
        var _a;
        const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
        const context = reactExports.useContext(Context);
        if (context) return context;
        if (defaultContext !== void 0) return defaultContext;
        throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
      }
      return [Provider, useContext2];
    }
    const createScope = () => {
      const scopeContexts = defaultContexts.map((defaultContext) => {
        return reactExports.createContext(defaultContext);
      });
      return function useScope(scope) {
        const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
        return reactExports.useMemo(
          () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
          [scope, contexts]
        );
      };
    };
    createScope.scopeName = scopeName;
    return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
  }
  function composeContextScopes(...scopes) {
    const baseScope = scopes[0];
    if (scopes.length === 1) return baseScope;
    const createScope = () => {
      const scopeHooks = scopes.map((createScope2) => ({
        useScope: createScope2(),
        scopeName: createScope2.scopeName
      }));
      return function useComposedScopes(overrideScopes) {
        const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
          const scopeProps = useScope(overrideScopes);
          const currentScope = scopeProps[`__scope${scopeName}`];
          return { ...nextScopes2, ...currentScope };
        }, {});
        return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
      };
    };
    createScope.scopeName = baseScope.scopeName;
    return createScope;
  }
  var useLayoutEffect2 = (globalThis == null ? void 0 : globalThis.document) ? reactExports.useLayoutEffect : () => {
  };
  var useReactId = React[" useId ".trim().toString()] || (() => void 0);
  var count$1 = 0;
  function useId(deterministicId) {
    const [id2, setId] = reactExports.useState(useReactId());
    useLayoutEffect2(() => {
      setId((reactId) => reactId ?? String(count$1++));
    }, [deterministicId]);
    return deterministicId || (id2 ? `radix-${id2}` : "");
  }
  var useInsertionEffect = React[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
  function useControllableState({
    prop,
    defaultProp,
    onChange = () => {
    },
    caller
  }) {
    const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
      defaultProp,
      onChange
    });
    const isControlled = prop !== void 0;
    const value = isControlled ? prop : uncontrolledProp;
    {
      const isControlledRef = reactExports.useRef(prop !== void 0);
      reactExports.useEffect(() => {
        const wasControlled = isControlledRef.current;
        if (wasControlled !== isControlled) {
          const from = wasControlled ? "controlled" : "uncontrolled";
          const to = isControlled ? "controlled" : "uncontrolled";
          console.warn(
            `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
          );
        }
        isControlledRef.current = isControlled;
      }, [isControlled, caller]);
    }
    const setValue = reactExports.useCallback(
      (nextValue) => {
        var _a;
        if (isControlled) {
          const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
          if (value2 !== prop) {
            (_a = onChangeRef.current) == null ? void 0 : _a.call(onChangeRef, value2);
          }
        } else {
          setUncontrolledProp(nextValue);
        }
      },
      [isControlled, prop, setUncontrolledProp, onChangeRef]
    );
    return [value, setValue];
  }
  function useUncontrolledState({
    defaultProp,
    onChange
  }) {
    const [value, setValue] = reactExports.useState(defaultProp);
    const prevValueRef = reactExports.useRef(value);
    const onChangeRef = reactExports.useRef(onChange);
    useInsertionEffect(() => {
      onChangeRef.current = onChange;
    }, [onChange]);
    reactExports.useEffect(() => {
      var _a;
      if (prevValueRef.current !== value) {
        (_a = onChangeRef.current) == null ? void 0 : _a.call(onChangeRef, value);
        prevValueRef.current = value;
      }
    }, [value, prevValueRef]);
    return [value, setValue, onChangeRef];
  }
  function isFunction(value) {
    return typeof value === "function";
  }
  // @__NO_SIDE_EFFECTS__
  function createSlot(ownerName) {
    const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
    const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
      const { children, ...slotProps } = props;
      const childrenArray = reactExports.Children.toArray(children);
      const slottable = childrenArray.find(isSlottable);
      if (slottable) {
        const newElement = slottable.props.children;
        const newChildren = childrenArray.map((child) => {
          if (child === slottable) {
            if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
            return reactExports.isValidElement(newElement) ? newElement.props.children : null;
          } else {
            return child;
          }
        });
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
    });
    Slot2.displayName = `${ownerName}.Slot`;
    return Slot2;
  }
  // @__NO_SIDE_EFFECTS__
  function createSlotClone(ownerName) {
    const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
      const { children, ...slotProps } = props;
      if (reactExports.isValidElement(children)) {
        const childrenRef = getElementRef$1(children);
        const props2 = mergeProps(slotProps, children.props);
        if (children.type !== reactExports.Fragment) {
          props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
        }
        return reactExports.cloneElement(children, props2);
      }
      return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
    });
    SlotClone.displayName = `${ownerName}.SlotClone`;
    return SlotClone;
  }
  var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
  function isSlottable(child) {
    return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
  }
  function mergeProps(slotProps, childProps) {
    const overrideProps = { ...childProps };
    for (const propName in childProps) {
      const slotPropValue = slotProps[propName];
      const childPropValue = childProps[propName];
      const isHandler = /^on[A-Z]/.test(propName);
      if (isHandler) {
        if (slotPropValue && childPropValue) {
          overrideProps[propName] = (...args) => {
            const result = childPropValue(...args);
            slotPropValue(...args);
            return result;
          };
        } else if (slotPropValue) {
          overrideProps[propName] = slotPropValue;
        }
      } else if (propName === "style") {
        overrideProps[propName] = { ...slotPropValue, ...childPropValue };
      } else if (propName === "className") {
        overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
      }
    }
    return { ...slotProps, ...overrideProps };
  }
  function getElementRef$1(element) {
    var _a, _b;
    let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
    let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
      return element.ref;
    }
    getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
    mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
      return element.props.ref;
    }
    return element.props.ref || element.ref;
  }
  var NODES = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul"
  ];
  var Primitive = NODES.reduce((primitive, node) => {
    const Slot2 = /* @__PURE__ */ createSlot(`Primitive.${node}`);
    const Node = reactExports.forwardRef((props, forwardedRef) => {
      const { asChild, ...primitiveProps } = props;
      const Comp = asChild ? Slot2 : node;
      if (typeof window !== "undefined") {
        window[Symbol.for("radix-ui")] = true;
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
    });
    Node.displayName = `Primitive.${node}`;
    return { ...primitive, [node]: Node };
  }, {});
  function dispatchDiscreteCustomEvent(target, event) {
    if (target) reactDomExports.flushSync(() => target.dispatchEvent(event));
  }
  function useCallbackRef$1(callback) {
    const callbackRef = reactExports.useRef(callback);
    reactExports.useEffect(() => {
      callbackRef.current = callback;
    });
    return reactExports.useMemo(() => (...args) => {
      var _a;
      return (_a = callbackRef.current) == null ? void 0 : _a.call(callbackRef, ...args);
    }, []);
  }
  function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis == null ? void 0 : globalThis.document) {
    const onEscapeKeyDown = useCallbackRef$1(onEscapeKeyDownProp);
    reactExports.useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          onEscapeKeyDown(event);
        }
      };
      ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
      return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
    }, [onEscapeKeyDown, ownerDocument]);
  }
  var DISMISSABLE_LAYER_NAME = "DismissableLayer";
  var CONTEXT_UPDATE = "dismissableLayer.update";
  var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
  var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
  var originalBodyPointerEvents;
  var DismissableLayerContext = reactExports.createContext({
    layers: /* @__PURE__ */ new Set(),
    layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
    branches: /* @__PURE__ */ new Set()
  });
  var DismissableLayer = reactExports.forwardRef(
    (props, forwardedRef) => {
      const {
        disableOutsidePointerEvents = false,
        onEscapeKeyDown,
        onPointerDownOutside,
        onFocusOutside,
        onInteractOutside,
        onDismiss,
        ...layerProps
      } = props;
      const context = reactExports.useContext(DismissableLayerContext);
      const [node, setNode] = reactExports.useState(null);
      const ownerDocument = (node == null ? void 0 : node.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document);
      const [, force] = reactExports.useState({});
      const composedRefs = useComposedRefs(forwardedRef, (node2) => setNode(node2));
      const layers = Array.from(context.layers);
      const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
      const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
      const index = node ? layers.indexOf(node) : -1;
      const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
      const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
      const pointerDownOutside = usePointerDownOutside((event) => {
        const target = event.target;
        const isPointerDownOnBranch = [...context.branches].some((branch) => branch.contains(target));
        if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
        onPointerDownOutside == null ? void 0 : onPointerDownOutside(event);
        onInteractOutside == null ? void 0 : onInteractOutside(event);
        if (!event.defaultPrevented) onDismiss == null ? void 0 : onDismiss();
      }, ownerDocument);
      const focusOutside = useFocusOutside((event) => {
        const target = event.target;
        const isFocusInBranch = [...context.branches].some((branch) => branch.contains(target));
        if (isFocusInBranch) return;
        onFocusOutside == null ? void 0 : onFocusOutside(event);
        onInteractOutside == null ? void 0 : onInteractOutside(event);
        if (!event.defaultPrevented) onDismiss == null ? void 0 : onDismiss();
      }, ownerDocument);
      useEscapeKeydown((event) => {
        const isHighestLayer = index === context.layers.size - 1;
        if (!isHighestLayer) return;
        onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(event);
        if (!event.defaultPrevented && onDismiss) {
          event.preventDefault();
          onDismiss();
        }
      }, ownerDocument);
      reactExports.useEffect(() => {
        if (!node) return;
        if (disableOutsidePointerEvents) {
          if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
            originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
            ownerDocument.body.style.pointerEvents = "none";
          }
          context.layersWithOutsidePointerEventsDisabled.add(node);
        }
        context.layers.add(node);
        dispatchUpdate();
        return () => {
          if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) {
            ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
          }
        };
      }, [node, ownerDocument, disableOutsidePointerEvents, context]);
      reactExports.useEffect(() => {
        return () => {
          if (!node) return;
          context.layers.delete(node);
          context.layersWithOutsidePointerEventsDisabled.delete(node);
          dispatchUpdate();
        };
      }, [node, context]);
      reactExports.useEffect(() => {
        const handleUpdate = () => force({});
        document.addEventListener(CONTEXT_UPDATE, handleUpdate);
        return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
      }, []);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          ...layerProps,
          ref: composedRefs,
          style: {
            pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
            ...props.style
          },
          onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
          onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
          onPointerDownCapture: composeEventHandlers(
            props.onPointerDownCapture,
            pointerDownOutside.onPointerDownCapture
          )
        }
      );
    }
  );
  DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
  var BRANCH_NAME = "DismissableLayerBranch";
  var DismissableLayerBranch = reactExports.forwardRef((props, forwardedRef) => {
    const context = reactExports.useContext(DismissableLayerContext);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    reactExports.useEffect(() => {
      const node = ref.current;
      if (node) {
        context.branches.add(node);
        return () => {
          context.branches.delete(node);
        };
      }
    }, [context.branches]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { ...props, ref: composedRefs });
  });
  DismissableLayerBranch.displayName = BRANCH_NAME;
  function usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis == null ? void 0 : globalThis.document) {
    const handlePointerDownOutside = useCallbackRef$1(onPointerDownOutside);
    const isPointerInsideReactTreeRef = reactExports.useRef(false);
    const handleClickRef = reactExports.useRef(() => {
    });
    reactExports.useEffect(() => {
      const handlePointerDown = (event) => {
        if (event.target && !isPointerInsideReactTreeRef.current) {
          let handleAndDispatchPointerDownOutsideEvent2 = function() {
            handleAndDispatchCustomEvent(
              POINTER_DOWN_OUTSIDE,
              handlePointerDownOutside,
              eventDetail,
              { discrete: true }
            );
          };
          const eventDetail = { originalEvent: event };
          if (event.pointerType === "touch") {
            ownerDocument.removeEventListener("click", handleClickRef.current);
            handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
            ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
          } else {
            handleAndDispatchPointerDownOutsideEvent2();
          }
        } else {
          ownerDocument.removeEventListener("click", handleClickRef.current);
        }
        isPointerInsideReactTreeRef.current = false;
      };
      const timerId = window.setTimeout(() => {
        ownerDocument.addEventListener("pointerdown", handlePointerDown);
      }, 0);
      return () => {
        window.clearTimeout(timerId);
        ownerDocument.removeEventListener("pointerdown", handlePointerDown);
        ownerDocument.removeEventListener("click", handleClickRef.current);
      };
    }, [ownerDocument, handlePointerDownOutside]);
    return {
      // ensures we check React component tree (not just DOM tree)
      onPointerDownCapture: () => isPointerInsideReactTreeRef.current = true
    };
  }
  function useFocusOutside(onFocusOutside, ownerDocument = globalThis == null ? void 0 : globalThis.document) {
    const handleFocusOutside = useCallbackRef$1(onFocusOutside);
    const isFocusInsideReactTreeRef = reactExports.useRef(false);
    reactExports.useEffect(() => {
      const handleFocus = (event) => {
        if (event.target && !isFocusInsideReactTreeRef.current) {
          const eventDetail = { originalEvent: event };
          handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
            discrete: false
          });
        }
      };
      ownerDocument.addEventListener("focusin", handleFocus);
      return () => ownerDocument.removeEventListener("focusin", handleFocus);
    }, [ownerDocument, handleFocusOutside]);
    return {
      onFocusCapture: () => isFocusInsideReactTreeRef.current = true,
      onBlurCapture: () => isFocusInsideReactTreeRef.current = false
    };
  }
  function dispatchUpdate() {
    const event = new CustomEvent(CONTEXT_UPDATE);
    document.dispatchEvent(event);
  }
  function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
    const target = detail.originalEvent.target;
    const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail });
    if (handler) target.addEventListener(name, handler, { once: true });
    if (discrete) {
      dispatchDiscreteCustomEvent(target, event);
    } else {
      target.dispatchEvent(event);
    }
  }
  var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
  var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
  var EVENT_OPTIONS$1 = { bubbles: false, cancelable: true };
  var FOCUS_SCOPE_NAME = "FocusScope";
  var FocusScope = reactExports.forwardRef((props, forwardedRef) => {
    const {
      loop = false,
      trapped = false,
      onMountAutoFocus: onMountAutoFocusProp,
      onUnmountAutoFocus: onUnmountAutoFocusProp,
      ...scopeProps
    } = props;
    const [container, setContainer] = reactExports.useState(null);
    const onMountAutoFocus = useCallbackRef$1(onMountAutoFocusProp);
    const onUnmountAutoFocus = useCallbackRef$1(onUnmountAutoFocusProp);
    const lastFocusedElementRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setContainer(node));
    const focusScope = reactExports.useRef({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      }
    }).current;
    reactExports.useEffect(() => {
      if (trapped) {
        let handleFocusIn2 = function(event) {
          if (focusScope.paused || !container) return;
          const target = event.target;
          if (container.contains(target)) {
            lastFocusedElementRef.current = target;
          } else {
            focus(lastFocusedElementRef.current, { select: true });
          }
        }, handleFocusOut2 = function(event) {
          if (focusScope.paused || !container) return;
          const relatedTarget = event.relatedTarget;
          if (relatedTarget === null) return;
          if (!container.contains(relatedTarget)) {
            focus(lastFocusedElementRef.current, { select: true });
          }
        }, handleMutations2 = function(mutations) {
          const focusedElement = document.activeElement;
          if (focusedElement !== document.body) return;
          for (const mutation of mutations) {
            if (mutation.removedNodes.length > 0) focus(container);
          }
        };
        document.addEventListener("focusin", handleFocusIn2);
        document.addEventListener("focusout", handleFocusOut2);
        const mutationObserver = new MutationObserver(handleMutations2);
        if (container) mutationObserver.observe(container, { childList: true, subtree: true });
        return () => {
          document.removeEventListener("focusin", handleFocusIn2);
          document.removeEventListener("focusout", handleFocusOut2);
          mutationObserver.disconnect();
        };
      }
    }, [trapped, container, focusScope.paused]);
    reactExports.useEffect(() => {
      if (container) {
        focusScopesStack.add(focusScope);
        const previouslyFocusedElement = document.activeElement;
        const hasFocusedCandidate = container.contains(previouslyFocusedElement);
        if (!hasFocusedCandidate) {
          const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS$1);
          container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
          container.dispatchEvent(mountEvent);
          if (!mountEvent.defaultPrevented) {
            focusFirst$1(removeLinks(getTabbableCandidates(container)), { select: true });
            if (document.activeElement === previouslyFocusedElement) {
              focus(container);
            }
          }
        }
        return () => {
          container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
          setTimeout(() => {
            const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS$1);
            container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
            container.dispatchEvent(unmountEvent);
            if (!unmountEvent.defaultPrevented) {
              focus(previouslyFocusedElement ?? document.body, { select: true });
            }
            container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
            focusScopesStack.remove(focusScope);
          }, 0);
        };
      }
    }, [container, onMountAutoFocus, onUnmountAutoFocus, focusScope]);
    const handleKeyDown = reactExports.useCallback(
      (event) => {
        if (!loop && !trapped) return;
        if (focusScope.paused) return;
        const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
        const focusedElement = document.activeElement;
        if (isTabKey && focusedElement) {
          const container2 = event.currentTarget;
          const [first, last] = getTabbableEdges(container2);
          const hasTabbableElementsInside = first && last;
          if (!hasTabbableElementsInside) {
            if (focusedElement === container2) event.preventDefault();
          } else {
            if (!event.shiftKey && focusedElement === last) {
              event.preventDefault();
              if (loop) focus(first, { select: true });
            } else if (event.shiftKey && focusedElement === first) {
              event.preventDefault();
              if (loop) focus(last, { select: true });
            }
          }
        }
      },
      [loop, trapped, focusScope.paused]
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { tabIndex: -1, ...scopeProps, ref: composedRefs, onKeyDown: handleKeyDown });
  });
  FocusScope.displayName = FOCUS_SCOPE_NAME;
  function focusFirst$1(candidates, { select = false } = {}) {
    const previouslyFocusedElement = document.activeElement;
    for (const candidate of candidates) {
      focus(candidate, { select });
      if (document.activeElement !== previouslyFocusedElement) return;
    }
  }
  function getTabbableEdges(container) {
    const candidates = getTabbableCandidates(container);
    const first = findVisible(candidates, container);
    const last = findVisible(candidates.reverse(), container);
    return [first, last];
  }
  function getTabbableCandidates(container) {
    const nodes = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (node) => {
        const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
        if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
        return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }
  function findVisible(elements, container) {
    for (const element of elements) {
      if (!isHidden(element, { upTo: container })) return element;
    }
  }
  function isHidden(node, { upTo }) {
    if (getComputedStyle(node).visibility === "hidden") return true;
    while (node) {
      if (upTo !== void 0 && node === upTo) return false;
      if (getComputedStyle(node).display === "none") return true;
      node = node.parentElement;
    }
    return false;
  }
  function isSelectableInput(element) {
    return element instanceof HTMLInputElement && "select" in element;
  }
  function focus(element, { select = false } = {}) {
    if (element && element.focus) {
      const previouslyFocusedElement = document.activeElement;
      element.focus({ preventScroll: true });
      if (element !== previouslyFocusedElement && isSelectableInput(element) && select)
        element.select();
    }
  }
  var focusScopesStack = createFocusScopesStack();
  function createFocusScopesStack() {
    let stack = [];
    return {
      add(focusScope) {
        const activeFocusScope = stack[0];
        if (focusScope !== activeFocusScope) {
          activeFocusScope == null ? void 0 : activeFocusScope.pause();
        }
        stack = arrayRemove(stack, focusScope);
        stack.unshift(focusScope);
      },
      remove(focusScope) {
        var _a;
        stack = arrayRemove(stack, focusScope);
        (_a = stack[0]) == null ? void 0 : _a.resume();
      }
    };
  }
  function arrayRemove(array, item) {
    const updatedArray = [...array];
    const index = updatedArray.indexOf(item);
    if (index !== -1) {
      updatedArray.splice(index, 1);
    }
    return updatedArray;
  }
  function removeLinks(items) {
    return items.filter((item) => item.tagName !== "A");
  }
  var PORTAL_NAME$1 = "Portal";
  var Portal$1 = reactExports.forwardRef((props, forwardedRef) => {
    var _a;
    const { container: containerProp, ...portalProps } = props;
    const [mounted, setMounted] = reactExports.useState(false);
    useLayoutEffect2(() => setMounted(true), []);
    const container = containerProp || mounted && ((_a = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _a.body);
    return container ? ReactDOM.createPortal(/* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { ...portalProps, ref: forwardedRef }), container) : null;
  });
  Portal$1.displayName = PORTAL_NAME$1;
  function useStateMachine(initialState, machine) {
    return reactExports.useReducer((state, event) => {
      const nextState = machine[state][event];
      return nextState ?? state;
    }, initialState);
  }
  var Presence = (props) => {
    const { present, children } = props;
    const presence = usePresence(present);
    const child = typeof children === "function" ? children({ present: presence.isPresent }) : reactExports.Children.only(children);
    const ref = useComposedRefs(presence.ref, getElementRef(child));
    const forceMount = typeof children === "function";
    return forceMount || presence.isPresent ? reactExports.cloneElement(child, { ref }) : null;
  };
  Presence.displayName = "Presence";
  function usePresence(present) {
    const [node, setNode] = reactExports.useState();
    const stylesRef = reactExports.useRef(null);
    const prevPresentRef = reactExports.useRef(present);
    const prevAnimationNameRef = reactExports.useRef("none");
    const initialState = present ? "mounted" : "unmounted";
    const [state, send] = useStateMachine(initialState, {
      mounted: {
        UNMOUNT: "unmounted",
        ANIMATION_OUT: "unmountSuspended"
      },
      unmountSuspended: {
        MOUNT: "mounted",
        ANIMATION_END: "unmounted"
      },
      unmounted: {
        MOUNT: "mounted"
      }
    });
    reactExports.useEffect(() => {
      const currentAnimationName = getAnimationName(stylesRef.current);
      prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
    }, [state]);
    useLayoutEffect2(() => {
      const styles = stylesRef.current;
      const wasPresent = prevPresentRef.current;
      const hasPresentChanged = wasPresent !== present;
      if (hasPresentChanged) {
        const prevAnimationName = prevAnimationNameRef.current;
        const currentAnimationName = getAnimationName(styles);
        if (present) {
          send("MOUNT");
        } else if (currentAnimationName === "none" || (styles == null ? void 0 : styles.display) === "none") {
          send("UNMOUNT");
        } else {
          const isAnimating = prevAnimationName !== currentAnimationName;
          if (wasPresent && isAnimating) {
            send("ANIMATION_OUT");
          } else {
            send("UNMOUNT");
          }
        }
        prevPresentRef.current = present;
      }
    }, [present, send]);
    useLayoutEffect2(() => {
      if (node) {
        let timeoutId;
        const ownerWindow = node.ownerDocument.defaultView ?? window;
        const handleAnimationEnd = (event) => {
          const currentAnimationName = getAnimationName(stylesRef.current);
          const isCurrentAnimation = currentAnimationName.includes(event.animationName);
          if (event.target === node && isCurrentAnimation) {
            send("ANIMATION_END");
            if (!prevPresentRef.current) {
              const currentFillMode = node.style.animationFillMode;
              node.style.animationFillMode = "forwards";
              timeoutId = ownerWindow.setTimeout(() => {
                if (node.style.animationFillMode === "forwards") {
                  node.style.animationFillMode = currentFillMode;
                }
              });
            }
          }
        };
        const handleAnimationStart = (event) => {
          if (event.target === node) {
            prevAnimationNameRef.current = getAnimationName(stylesRef.current);
          }
        };
        node.addEventListener("animationstart", handleAnimationStart);
        node.addEventListener("animationcancel", handleAnimationEnd);
        node.addEventListener("animationend", handleAnimationEnd);
        return () => {
          ownerWindow.clearTimeout(timeoutId);
          node.removeEventListener("animationstart", handleAnimationStart);
          node.removeEventListener("animationcancel", handleAnimationEnd);
          node.removeEventListener("animationend", handleAnimationEnd);
        };
      } else {
        send("ANIMATION_END");
      }
    }, [node, send]);
    return {
      isPresent: ["mounted", "unmountSuspended"].includes(state),
      ref: reactExports.useCallback((node2) => {
        stylesRef.current = node2 ? getComputedStyle(node2) : null;
        setNode(node2);
      }, [])
    };
  }
  function getAnimationName(styles) {
    return (styles == null ? void 0 : styles.animationName) || "none";
  }
  function getElementRef(element) {
    var _a, _b;
    let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
    let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
      return element.ref;
    }
    getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
    mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
      return element.props.ref;
    }
    return element.props.ref || element.ref;
  }
  var count = 0;
  function useFocusGuards() {
    reactExports.useEffect(() => {
      const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
      document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard());
      document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard());
      count++;
      return () => {
        if (count === 1) {
          document.querySelectorAll("[data-radix-focus-guard]").forEach((node) => node.remove());
        }
        count--;
      };
    }, []);
  }
  function createFocusGuard() {
    const element = document.createElement("span");
    element.setAttribute("data-radix-focus-guard", "");
    element.tabIndex = 0;
    element.style.outline = "none";
    element.style.opacity = "0";
    element.style.position = "fixed";
    element.style.pointerEvents = "none";
    return element;
  }
  var __assign = function() {
    __assign = Object.assign || function __assign2(t2) {
      for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
        s2 = arguments[i2];
        for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2)) t2[p2] = s2[p2];
      }
      return t2;
    };
    return __assign.apply(this, arguments);
  };
  function __rest(s2, e) {
    var t2 = {};
    for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e.indexOf(p2) < 0)
      t2[p2] = s2[p2];
    if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
        if (e.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2]))
          t2[p2[i2]] = s2[p2[i2]];
      }
    return t2;
  }
  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i2 = 0, l2 = from.length, ar; i2 < l2; i2++) {
      if (ar || !(i2 in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i2);
        ar[i2] = from[i2];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  }
  typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };
  var zeroRightClassName = "right-scroll-bar-position";
  var fullWidthClassName = "width-before-scroll-bar";
  var noScrollbarsClassName = "with-scroll-bars-hidden";
  var removedBarSizeVariable = "--removed-body-scroll-bar-size";
  function assignRef(ref, value) {
    if (typeof ref === "function") {
      ref(value);
    } else if (ref) {
      ref.current = value;
    }
    return ref;
  }
  function useCallbackRef(initialValue, callback) {
    var ref = reactExports.useState(function() {
      return {
        // value
        value: initialValue,
        // last callback
        callback,
        // "memoized" public interface
        facade: {
          get current() {
            return ref.value;
          },
          set current(value) {
            var last = ref.value;
            if (last !== value) {
              ref.value = value;
              ref.callback(value, last);
            }
          }
        }
      };
    })[0];
    ref.callback = callback;
    return ref.facade;
  }
  var useIsomorphicLayoutEffect = typeof window !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
  var currentValues = /* @__PURE__ */ new WeakMap();
  function useMergeRefs(refs, defaultValue) {
    var callbackRef = useCallbackRef(null, function(newValue) {
      return refs.forEach(function(ref) {
        return assignRef(ref, newValue);
      });
    });
    useIsomorphicLayoutEffect(function() {
      var oldValue = currentValues.get(callbackRef);
      if (oldValue) {
        var prevRefs_1 = new Set(oldValue);
        var nextRefs_1 = new Set(refs);
        var current_1 = callbackRef.current;
        prevRefs_1.forEach(function(ref) {
          if (!nextRefs_1.has(ref)) {
            assignRef(ref, null);
          }
        });
        nextRefs_1.forEach(function(ref) {
          if (!prevRefs_1.has(ref)) {
            assignRef(ref, current_1);
          }
        });
      }
      currentValues.set(callbackRef, refs);
    }, [refs]);
    return callbackRef;
  }
  function ItoI(a2) {
    return a2;
  }
  function innerCreateMedium(defaults, middleware) {
    if (middleware === void 0) {
      middleware = ItoI;
    }
    var buffer = [];
    var assigned = false;
    var medium = {
      read: function() {
        if (assigned) {
          throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
        }
        if (buffer.length) {
          return buffer[buffer.length - 1];
        }
        return defaults;
      },
      useMedium: function(data) {
        var item = middleware(data, assigned);
        buffer.push(item);
        return function() {
          buffer = buffer.filter(function(x2) {
            return x2 !== item;
          });
        };
      },
      assignSyncMedium: function(cb2) {
        assigned = true;
        while (buffer.length) {
          var cbs = buffer;
          buffer = [];
          cbs.forEach(cb2);
        }
        buffer = {
          push: function(x2) {
            return cb2(x2);
          },
          filter: function() {
            return buffer;
          }
        };
      },
      assignMedium: function(cb2) {
        assigned = true;
        var pendingQueue = [];
        if (buffer.length) {
          var cbs = buffer;
          buffer = [];
          cbs.forEach(cb2);
          pendingQueue = buffer;
        }
        var executeQueue = function() {
          var cbs2 = pendingQueue;
          pendingQueue = [];
          cbs2.forEach(cb2);
        };
        var cycle = function() {
          return Promise.resolve().then(executeQueue);
        };
        cycle();
        buffer = {
          push: function(x2) {
            pendingQueue.push(x2);
            cycle();
          },
          filter: function(filter2) {
            pendingQueue = pendingQueue.filter(filter2);
            return buffer;
          }
        };
      }
    };
    return medium;
  }
  function createSidecarMedium(options2) {
    if (options2 === void 0) {
      options2 = {};
    }
    var medium = innerCreateMedium(null);
    medium.options = __assign({ async: true, ssr: false }, options2);
    return medium;
  }
  var SideCar$1 = function(_a) {
    var sideCar = _a.sideCar, rest = __rest(_a, ["sideCar"]);
    if (!sideCar) {
      throw new Error("Sidecar: please provide `sideCar` property to import the right car");
    }
    var Target = sideCar.read();
    if (!Target) {
      throw new Error("Sidecar medium not found");
    }
    return reactExports.createElement(Target, __assign({}, rest));
  };
  SideCar$1.isSideCarExport = true;
  function exportSidecar(medium, exported) {
    medium.useMedium(exported);
    return SideCar$1;
  }
  var effectCar = createSidecarMedium();
  var nothing = function() {
    return;
  };
  var RemoveScroll = reactExports.forwardRef(function(props, parentRef) {
    var ref = reactExports.useRef(null);
    var _a = reactExports.useState({
      onScrollCapture: nothing,
      onWheelCapture: nothing,
      onTouchMoveCapture: nothing
    }), callbacks = _a[0], setCallbacks = _a[1];
    var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noRelative = props.noRelative, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? "div" : _b, gapMode = props.gapMode, rest = __rest(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]);
    var SideCar2 = sideCar;
    var containerRef = useMergeRefs([ref, parentRef]);
    var containerProps = __assign(__assign({}, rest), callbacks);
    return reactExports.createElement(
      reactExports.Fragment,
      null,
      enabled && reactExports.createElement(SideCar2, { sideCar: effectCar, removeScrollBar, shards, noRelative, noIsolation, inert, setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref, gapMode }),
      forwardProps ? reactExports.cloneElement(reactExports.Children.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : reactExports.createElement(Container, __assign({}, containerProps, { className, ref: containerRef }), children)
    );
  });
  RemoveScroll.defaultProps = {
    enabled: true,
    removeScrollBar: true,
    inert: false
  };
  RemoveScroll.classNames = {
    fullWidth: fullWidthClassName,
    zeroRight: zeroRightClassName
  };
  var getNonce = function() {
    if (typeof __webpack_nonce__ !== "undefined") {
      return __webpack_nonce__;
    }
    return void 0;
  };
  function makeStyleTag() {
    if (!document)
      return null;
    var tag = document.createElement("style");
    tag.type = "text/css";
    var nonce = getNonce();
    if (nonce) {
      tag.setAttribute("nonce", nonce);
    }
    return tag;
  }
  function injectStyles(tag, css) {
    if (tag.styleSheet) {
      tag.styleSheet.cssText = css;
    } else {
      tag.appendChild(document.createTextNode(css));
    }
  }
  function insertStyleTag(tag) {
    var head = document.head || document.getElementsByTagName("head")[0];
    head.appendChild(tag);
  }
  var stylesheetSingleton = function() {
    var counter = 0;
    var stylesheet = null;
    return {
      add: function(style) {
        if (counter == 0) {
          if (stylesheet = makeStyleTag()) {
            injectStyles(stylesheet, style);
            insertStyleTag(stylesheet);
          }
        }
        counter++;
      },
      remove: function() {
        counter--;
        if (!counter && stylesheet) {
          stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
          stylesheet = null;
        }
      }
    };
  };
  var styleHookSingleton = function() {
    var sheet = stylesheetSingleton();
    return function(styles, isDynamic) {
      reactExports.useEffect(function() {
        sheet.add(styles);
        return function() {
          sheet.remove();
        };
      }, [styles && isDynamic]);
    };
  };
  var styleSingleton = function() {
    var useStyle2 = styleHookSingleton();
    var Sheet = function(_a) {
      var styles = _a.styles, dynamic = _a.dynamic;
      useStyle2(styles, dynamic);
      return null;
    };
    return Sheet;
  };
  var zeroGap = {
    left: 0,
    top: 0,
    right: 0,
    gap: 0
  };
  var parse = function(x2) {
    return parseInt(x2 || "", 10) || 0;
  };
  var getOffset = function(gapMode) {
    var cs = window.getComputedStyle(document.body);
    var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
    var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
    var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
    return [parse(left), parse(top), parse(right)];
  };
  var getGapWidth = function(gapMode) {
    if (gapMode === void 0) {
      gapMode = "margin";
    }
    if (typeof window === "undefined") {
      return zeroGap;
    }
    var offsets = getOffset(gapMode);
    var documentWidth = document.documentElement.clientWidth;
    var windowWidth = window.innerWidth;
    return {
      left: offsets[0],
      top: offsets[1],
      right: offsets[2],
      gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
    };
  };
  var Style = styleSingleton();
  var lockAttribute = "data-scroll-locked";
  var getStyles = function(_a, allowRelative, gapMode, important) {
    var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
    if (gapMode === void 0) {
      gapMode = "margin";
    }
    return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
      allowRelative && "position: relative ".concat(important, ";"),
      gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
      gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
    ].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
  };
  var getCurrentUseCounter = function() {
    var counter = parseInt(document.body.getAttribute(lockAttribute) || "0", 10);
    return isFinite(counter) ? counter : 0;
  };
  var useLockAttribute = function() {
    reactExports.useEffect(function() {
      document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
      return function() {
        var newCounter = getCurrentUseCounter() - 1;
        if (newCounter <= 0) {
          document.body.removeAttribute(lockAttribute);
        } else {
          document.body.setAttribute(lockAttribute, newCounter.toString());
        }
      };
    }, []);
  };
  var RemoveScrollBar = function(_a) {
    var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? "margin" : _b;
    useLockAttribute();
    var gap = reactExports.useMemo(function() {
      return getGapWidth(gapMode);
    }, [gapMode]);
    return reactExports.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
  };
  var passiveSupported = false;
  if (typeof window !== "undefined") {
    try {
      var options = Object.defineProperty({}, "passive", {
        get: function() {
          passiveSupported = true;
          return true;
        }
      });
      window.addEventListener("test", options, options);
      window.removeEventListener("test", options, options);
    } catch (err) {
      passiveSupported = false;
    }
  }
  var nonPassive = passiveSupported ? { passive: false } : false;
  var alwaysContainsScroll = function(node) {
    return node.tagName === "TEXTAREA";
  };
  var elementCanBeScrolled = function(node, overflow) {
    if (!(node instanceof Element)) {
      return false;
    }
    var styles = window.getComputedStyle(node);
    return (
      // not-not-scrollable
      styles[overflow] !== "hidden" && // contains scroll inside self
      !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === "visible")
    );
  };
  var elementCouldBeVScrolled = function(node) {
    return elementCanBeScrolled(node, "overflowY");
  };
  var elementCouldBeHScrolled = function(node) {
    return elementCanBeScrolled(node, "overflowX");
  };
  var locationCouldBeScrolled = function(axis, node) {
    var ownerDocument = node.ownerDocument;
    var current = node;
    do {
      if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
        current = current.host;
      }
      var isScrollable = elementCouldBeScrolled(axis, current);
      if (isScrollable) {
        var _a = getScrollVariables(axis, current), scrollHeight = _a[1], clientHeight = _a[2];
        if (scrollHeight > clientHeight) {
          return true;
        }
      }
      current = current.parentNode;
    } while (current && current !== ownerDocument.body);
    return false;
  };
  var getVScrollVariables = function(_a) {
    var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
    return [
      scrollTop,
      scrollHeight,
      clientHeight
    ];
  };
  var getHScrollVariables = function(_a) {
    var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
    return [
      scrollLeft,
      scrollWidth,
      clientWidth
    ];
  };
  var elementCouldBeScrolled = function(axis, node) {
    return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
  };
  var getScrollVariables = function(axis, node) {
    return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
  };
  var getDirectionFactor = function(axis, direction) {
    return axis === "h" && direction === "rtl" ? -1 : 1;
  };
  var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
    var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
    var delta = directionFactor * sourceDelta;
    var target = event.target;
    var targetInLock = endTarget.contains(target);
    var shouldCancelScroll = false;
    var isDeltaPositive = delta > 0;
    var availableScroll = 0;
    var availableScrollTop = 0;
    do {
      var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
      var elementScroll = scroll_1 - capacity - directionFactor * position;
      if (position || elementScroll) {
        if (elementCouldBeScrolled(axis, target)) {
          availableScroll += elementScroll;
          availableScrollTop += position;
        }
      }
      target = target.parentNode.host || target.parentNode;
    } while (
      // portaled content
      !targetInLock && target !== document.body || // self content
      targetInLock && (endTarget.contains(target) || endTarget === target)
    );
    if (isDeltaPositive && (Math.abs(availableScroll) < 1 || false)) {
      shouldCancelScroll = true;
    } else if (!isDeltaPositive && (Math.abs(availableScrollTop) < 1 || false)) {
      shouldCancelScroll = true;
    }
    return shouldCancelScroll;
  };
  var getTouchXY = function(event) {
    return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
  };
  var getDeltaXY = function(event) {
    return [event.deltaX, event.deltaY];
  };
  var extractRef = function(ref) {
    return ref && "current" in ref ? ref.current : ref;
  };
  var deltaCompare = function(x2, y2) {
    return x2[0] === y2[0] && x2[1] === y2[1];
  };
  var generateStyle = function(id2) {
    return "\n  .block-interactivity-".concat(id2, " {pointer-events: none;}\n  .allow-interactivity-").concat(id2, " {pointer-events: all;}\n");
  };
  var idCounter = 0;
  var lockStack = [];
  function RemoveScrollSideCar(props) {
    var shouldPreventQueue = reactExports.useRef([]);
    var touchStartRef = reactExports.useRef([0, 0]);
    var activeAxis = reactExports.useRef();
    var id2 = reactExports.useState(idCounter++)[0];
    var Style2 = reactExports.useState(styleSingleton)[0];
    var lastProps = reactExports.useRef(props);
    reactExports.useEffect(function() {
      lastProps.current = props;
    }, [props]);
    reactExports.useEffect(function() {
      if (props.inert) {
        document.body.classList.add("block-interactivity-".concat(id2));
        var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
        allow_1.forEach(function(el2) {
          return el2.classList.add("allow-interactivity-".concat(id2));
        });
        return function() {
          document.body.classList.remove("block-interactivity-".concat(id2));
          allow_1.forEach(function(el2) {
            return el2.classList.remove("allow-interactivity-".concat(id2));
          });
        };
      }
      return;
    }, [props.inert, props.lockRef.current, props.shards]);
    var shouldCancelEvent = reactExports.useCallback(function(event, parent) {
      if ("touches" in event && event.touches.length === 2 || event.type === "wheel" && event.ctrlKey) {
        return !lastProps.current.allowPinchZoom;
      }
      var touch = getTouchXY(event);
      var touchStart = touchStartRef.current;
      var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
      var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
      var currentAxis;
      var target = event.target;
      var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
      if ("touches" in event && moveDirection === "h" && target.type === "range") {
        return false;
      }
      var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
      if (!canBeScrolledInMainDirection) {
        return true;
      }
      if (canBeScrolledInMainDirection) {
        currentAxis = moveDirection;
      } else {
        currentAxis = moveDirection === "v" ? "h" : "v";
        canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
      }
      if (!canBeScrolledInMainDirection) {
        return false;
      }
      if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
        activeAxis.current = currentAxis;
      }
      if (!currentAxis) {
        return true;
      }
      var cancelingAxis = activeAxis.current || currentAxis;
      return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY);
    }, []);
    var shouldPrevent = reactExports.useCallback(function(_event) {
      var event = _event;
      if (!lockStack.length || lockStack[lockStack.length - 1] !== Style2) {
        return;
      }
      var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
      var sourceEvent = shouldPreventQueue.current.filter(function(e) {
        return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
      })[0];
      if (sourceEvent && sourceEvent.should) {
        if (event.cancelable) {
          event.preventDefault();
        }
        return;
      }
      if (!sourceEvent) {
        var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
          return node.contains(event.target);
        });
        var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
        if (shouldStop) {
          if (event.cancelable) {
            event.preventDefault();
          }
        }
      }
    }, []);
    var shouldCancel = reactExports.useCallback(function(name, delta, target, should) {
      var event = { name, delta, target, should, shadowParent: getOutermostShadowParent(target) };
      shouldPreventQueue.current.push(event);
      setTimeout(function() {
        shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
          return e !== event;
        });
      }, 1);
    }, []);
    var scrollTouchStart = reactExports.useCallback(function(event) {
      touchStartRef.current = getTouchXY(event);
      activeAxis.current = void 0;
    }, []);
    var scrollWheel = reactExports.useCallback(function(event) {
      shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
    }, []);
    var scrollTouchMove = reactExports.useCallback(function(event) {
      shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
    }, []);
    reactExports.useEffect(function() {
      lockStack.push(Style2);
      props.setCallbacks({
        onScrollCapture: scrollWheel,
        onWheelCapture: scrollWheel,
        onTouchMoveCapture: scrollTouchMove
      });
      document.addEventListener("wheel", shouldPrevent, nonPassive);
      document.addEventListener("touchmove", shouldPrevent, nonPassive);
      document.addEventListener("touchstart", scrollTouchStart, nonPassive);
      return function() {
        lockStack = lockStack.filter(function(inst) {
          return inst !== Style2;
        });
        document.removeEventListener("wheel", shouldPrevent, nonPassive);
        document.removeEventListener("touchmove", shouldPrevent, nonPassive);
        document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
      };
    }, []);
    var removeScrollBar = props.removeScrollBar, inert = props.inert;
    return reactExports.createElement(
      reactExports.Fragment,
      null,
      inert ? reactExports.createElement(Style2, { styles: generateStyle(id2) }) : null,
      removeScrollBar ? reactExports.createElement(RemoveScrollBar, { noRelative: props.noRelative, gapMode: props.gapMode }) : null
    );
  }
  function getOutermostShadowParent(node) {
    var shadowParent = null;
    while (node !== null) {
      if (node instanceof ShadowRoot) {
        shadowParent = node.host;
        node = node.host;
      }
      node = node.parentNode;
    }
    return shadowParent;
  }
  const SideCar = exportSidecar(effectCar, RemoveScrollSideCar);
  var ReactRemoveScroll = reactExports.forwardRef(function(props, ref) {
    return reactExports.createElement(RemoveScroll, __assign({}, props, { ref, sideCar: SideCar }));
  });
  ReactRemoveScroll.classNames = RemoveScroll.classNames;
  var getDefaultParent = function(originalTarget) {
    if (typeof document === "undefined") {
      return null;
    }
    var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
    return sampleTarget.ownerDocument.body;
  };
  var counterMap = /* @__PURE__ */ new WeakMap();
  var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
  var markerMap = {};
  var lockCount = 0;
  var unwrapHost = function(node) {
    return node && (node.host || unwrapHost(node.parentNode));
  };
  var correctTargets = function(parent, targets) {
    return targets.map(function(target) {
      if (parent.contains(target)) {
        return target;
      }
      var correctedTarget = unwrapHost(target);
      if (correctedTarget && parent.contains(correctedTarget)) {
        return correctedTarget;
      }
      console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
      return null;
    }).filter(function(x2) {
      return Boolean(x2);
    });
  };
  var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
    var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
    if (!markerMap[markerName]) {
      markerMap[markerName] = /* @__PURE__ */ new WeakMap();
    }
    var markerCounter = markerMap[markerName];
    var hiddenNodes = [];
    var elementsToKeep = /* @__PURE__ */ new Set();
    var elementsToStop = new Set(targets);
    var keep = function(el2) {
      if (!el2 || elementsToKeep.has(el2)) {
        return;
      }
      elementsToKeep.add(el2);
      keep(el2.parentNode);
    };
    targets.forEach(keep);
    var deep = function(parent) {
      if (!parent || elementsToStop.has(parent)) {
        return;
      }
      Array.prototype.forEach.call(parent.children, function(node) {
        if (elementsToKeep.has(node)) {
          deep(node);
        } else {
          try {
            var attr = node.getAttribute(controlAttribute);
            var alreadyHidden = attr !== null && attr !== "false";
            var counterValue = (counterMap.get(node) || 0) + 1;
            var markerValue = (markerCounter.get(node) || 0) + 1;
            counterMap.set(node, counterValue);
            markerCounter.set(node, markerValue);
            hiddenNodes.push(node);
            if (counterValue === 1 && alreadyHidden) {
              uncontrolledNodes.set(node, true);
            }
            if (markerValue === 1) {
              node.setAttribute(markerName, "true");
            }
            if (!alreadyHidden) {
              node.setAttribute(controlAttribute, "true");
            }
          } catch (e) {
            console.error("aria-hidden: cannot operate on ", node, e);
          }
        }
      });
    };
    deep(parentNode);
    elementsToKeep.clear();
    lockCount++;
    return function() {
      hiddenNodes.forEach(function(node) {
        var counterValue = counterMap.get(node) - 1;
        var markerValue = markerCounter.get(node) - 1;
        counterMap.set(node, counterValue);
        markerCounter.set(node, markerValue);
        if (!counterValue) {
          if (!uncontrolledNodes.has(node)) {
            node.removeAttribute(controlAttribute);
          }
          uncontrolledNodes.delete(node);
        }
        if (!markerValue) {
          node.removeAttribute(markerName);
        }
      });
      lockCount--;
      if (!lockCount) {
        counterMap = /* @__PURE__ */ new WeakMap();
        counterMap = /* @__PURE__ */ new WeakMap();
        uncontrolledNodes = /* @__PURE__ */ new WeakMap();
        markerMap = {};
      }
    };
  };
  var hideOthers = function(originalTarget, parentNode, markerName) {
    if (markerName === void 0) {
      markerName = "data-aria-hidden";
    }
    var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
    var activeParentNode = getDefaultParent(originalTarget);
    if (!activeParentNode) {
      return function() {
        return null;
      };
    }
    targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live], script")));
    return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
  };
  var DIALOG_NAME = "Dialog";
  var [createDialogContext, createDialogScope] = createContextScope(DIALOG_NAME);
  var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
  var Dialog = (props) => {
    const {
      __scopeDialog,
      children,
      open: openProp,
      defaultOpen,
      onOpenChange,
      modal = true
    } = props;
    const triggerRef = reactExports.useRef(null);
    const contentRef = reactExports.useRef(null);
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
      caller: DIALOG_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogProvider,
      {
        scope: __scopeDialog,
        triggerRef,
        contentRef,
        contentId: useId(),
        titleId: useId(),
        descriptionId: useId(),
        open,
        onOpenChange: setOpen,
        onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
        modal,
        children
      }
    );
  };
  Dialog.displayName = DIALOG_NAME;
  var TRIGGER_NAME$1 = "DialogTrigger";
  var DialogTrigger = reactExports.forwardRef(
    (props, forwardedRef) => {
      const { __scopeDialog, ...triggerProps } = props;
      const context = useDialogContext(TRIGGER_NAME$1, __scopeDialog);
      const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          "aria-haspopup": "dialog",
          "aria-expanded": context.open,
          "aria-controls": context.contentId,
          "data-state": getState$1(context.open),
          ...triggerProps,
          ref: composedTriggerRef,
          onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
        }
      );
    }
  );
  DialogTrigger.displayName = TRIGGER_NAME$1;
  var PORTAL_NAME = "DialogPortal";
  var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
    forceMount: void 0
  });
  var DialogPortal = (props) => {
    const { __scopeDialog, forceMount, children, container } = props;
    const context = useDialogContext(PORTAL_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeDialog, forceMount, children: reactExports.Children.map(children, (child) => /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children: child }) })) });
  };
  DialogPortal.displayName = PORTAL_NAME;
  var OVERLAY_NAME = "DialogOverlay";
  var DialogOverlay = reactExports.forwardRef(
    (props, forwardedRef) => {
      const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
      const { forceMount = portalContext.forceMount, ...overlayProps } = props;
      const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
      return context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
    }
  );
  DialogOverlay.displayName = OVERLAY_NAME;
  var Slot = /* @__PURE__ */ createSlot("DialogOverlay.RemoveScroll");
  var DialogOverlayImpl = reactExports.forwardRef(
    (props, forwardedRef) => {
      const { __scopeDialog, ...overlayProps } = props;
      const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
      return (
        // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
        // ie. when `Overlay` and `Content` are siblings
        /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            "data-state": getState$1(context.open),
            ...overlayProps,
            ref: forwardedRef,
            style: { pointerEvents: "auto", ...overlayProps.style }
          }
        ) })
      );
    }
  );
  var CONTENT_NAME$1 = "DialogContent";
  var DialogContent = reactExports.forwardRef(
    (props, forwardedRef) => {
      const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopeDialog);
      const { forceMount = portalContext.forceMount, ...contentProps } = props;
      const context = useDialogContext(CONTENT_NAME$1, props.__scopeDialog);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
    }
  );
  DialogContent.displayName = CONTENT_NAME$1;
  var DialogContentModal = reactExports.forwardRef(
    (props, forwardedRef) => {
      const context = useDialogContext(CONTENT_NAME$1, props.__scopeDialog);
      const contentRef = reactExports.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
      reactExports.useEffect(() => {
        const content = contentRef.current;
        if (content) return hideOthers(content);
      }, []);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        DialogContentImpl,
        {
          ...props,
          ref: composedRefs,
          trapFocus: context.open,
          disableOutsidePointerEvents: true,
          onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
            var _a;
            event.preventDefault();
            (_a = context.triggerRef.current) == null ? void 0 : _a.focus();
          }),
          onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
            const originalEvent = event.detail.originalEvent;
            const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
            const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
            if (isRightClick) event.preventDefault();
          }),
          onFocusOutside: composeEventHandlers(
            props.onFocusOutside,
            (event) => event.preventDefault()
          )
        }
      );
    }
  );
  var DialogContentNonModal = reactExports.forwardRef(
    (props, forwardedRef) => {
      const context = useDialogContext(CONTENT_NAME$1, props.__scopeDialog);
      const hasInteractedOutsideRef = reactExports.useRef(false);
      const hasPointerDownOutsideRef = reactExports.useRef(false);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        DialogContentImpl,
        {
          ...props,
          ref: forwardedRef,
          trapFocus: false,
          disableOutsidePointerEvents: false,
          onCloseAutoFocus: (event) => {
            var _a, _b;
            (_a = props.onCloseAutoFocus) == null ? void 0 : _a.call(props, event);
            if (!event.defaultPrevented) {
              if (!hasInteractedOutsideRef.current) (_b = context.triggerRef.current) == null ? void 0 : _b.focus();
              event.preventDefault();
            }
            hasInteractedOutsideRef.current = false;
            hasPointerDownOutsideRef.current = false;
          },
          onInteractOutside: (event) => {
            var _a, _b;
            (_a = props.onInteractOutside) == null ? void 0 : _a.call(props, event);
            if (!event.defaultPrevented) {
              hasInteractedOutsideRef.current = true;
              if (event.detail.originalEvent.type === "pointerdown") {
                hasPointerDownOutsideRef.current = true;
              }
            }
            const target = event.target;
            const targetIsTrigger = (_b = context.triggerRef.current) == null ? void 0 : _b.contains(target);
            if (targetIsTrigger) event.preventDefault();
            if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
              event.preventDefault();
            }
          }
        }
      );
    }
  );
  var DialogContentImpl = reactExports.forwardRef(
    (props, forwardedRef) => {
      const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
      const context = useDialogContext(CONTENT_NAME$1, __scopeDialog);
      const contentRef = reactExports.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, contentRef);
      useFocusGuards();
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FocusScope,
          {
            asChild: true,
            loop: true,
            trapped: trapFocus,
            onMountAutoFocus: onOpenAutoFocus,
            onUnmountAutoFocus: onCloseAutoFocus,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              DismissableLayer,
              {
                role: "dialog",
                id: context.contentId,
                "aria-describedby": context.descriptionId,
                "aria-labelledby": context.titleId,
                "data-state": getState$1(context.open),
                ...contentProps,
                ref: composedRefs,
                onDismiss: () => context.onOpenChange(false)
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TitleWarning, { titleId: context.titleId }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef, descriptionId: context.descriptionId })
        ] })
      ] });
    }
  );
  var TITLE_NAME = "DialogTitle";
  var DialogTitle = reactExports.forwardRef(
    (props, forwardedRef) => {
      const { __scopeDialog, ...titleProps } = props;
      const context = useDialogContext(TITLE_NAME, __scopeDialog);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
    }
  );
  DialogTitle.displayName = TITLE_NAME;
  var DESCRIPTION_NAME = "DialogDescription";
  var DialogDescription = reactExports.forwardRef(
    (props, forwardedRef) => {
      const { __scopeDialog, ...descriptionProps } = props;
      const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
    }
  );
  DialogDescription.displayName = DESCRIPTION_NAME;
  var CLOSE_NAME = "DialogClose";
  var DialogClose = reactExports.forwardRef(
    (props, forwardedRef) => {
      const { __scopeDialog, ...closeProps } = props;
      const context = useDialogContext(CLOSE_NAME, __scopeDialog);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          ...closeProps,
          ref: forwardedRef,
          onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
        }
      );
    }
  );
  DialogClose.displayName = CLOSE_NAME;
  function getState$1(open) {
    return open ? "open" : "closed";
  }
  var TITLE_WARNING_NAME = "DialogTitleWarning";
  var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
    contentName: CONTENT_NAME$1,
    titleName: TITLE_NAME,
    docsSlug: "dialog"
  });
  var TitleWarning = ({ titleId }) => {
    const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
    const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
    reactExports.useEffect(() => {
      if (titleId) {
        const hasTitle = document.getElementById(titleId);
        if (!hasTitle) console.error(MESSAGE);
      }
    }, [MESSAGE, titleId]);
    return null;
  };
  var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
  var DescriptionWarning = ({ contentRef, descriptionId }) => {
    const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
    const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
    reactExports.useEffect(() => {
      var _a;
      const describedById = (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby");
      if (descriptionId && describedById) {
        const hasDescription = document.getElementById(descriptionId);
        if (!hasDescription) console.warn(MESSAGE);
      }
    }, [MESSAGE, contentRef, descriptionId]);
    return null;
  };
  var Root$2 = Dialog;
  var Portal = DialogPortal;
  var Overlay = DialogOverlay;
  var Title = DialogTitle;
  function CartActionsModal({
    restNonce,
    currentUrl,
    showShareModal,
    showQuoteModal,
    onCloseShareModal,
    onCloseQuoteModal,
    cartData
  }) {
    const [cart, setCart] = reactExports.useState(null);
    const [loading, setLoading] = reactExports.useState(false);
    const [shareData, setShareData] = reactExports.useState({
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      expires_hours: 168
      // 7 days default
    });
    const [shareResult, setShareResult] = reactExports.useState(null);
    const [shareLoading, setShareLoading] = reactExports.useState(false);
    const [quoteData, setQuoteData] = reactExports.useState({
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      message: ""
    });
    const [quoteResult, setQuoteResult] = reactExports.useState(null);
    const [quoteLoading, setQuoteLoading] = reactExports.useState(false);
    reactExports.useEffect(() => {
      if (showShareModal || showQuoteModal) {
        loadCartData();
      }
    }, [showShareModal, showQuoteModal, cartData]);
    const loadCartData = () => {
      setLoading(true);
      try {
        if (cartData) {
          console.log("Loading pre-loaded cart data");
          const parsedCartData = JSON.parse(cartData);
          console.log("Cart data loaded:", parsedCartData);
          setCart(parsedCartData);
        } else {
          console.log("No cart data provided");
          setCart({ items: [], is_empty: true, items_count: 0 });
        }
      } catch (err) {
        console.error("Failed to parse cart data:", err);
        setCart({ items: [], is_empty: true, items_count: 0 });
      } finally {
        setLoading(false);
      }
    };
    const handleShareCart = async () => {
      setShareLoading(true);
      setShareResult(null);
      try {
        const requestData = {
          ...shareData,
          cart_data: cart
          // Include the cart data in the request
        };
        console.log("Sharing cart with data:", requestData);
        const response = await fetch("/wp-json/wc-cart-share-quote/v1/cart/share", {
          method: "POST",
          headers: {
            "X-WP-Nonce": restNonce,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestData)
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to share cart");
        }
        if (data.success) {
          console.log("Share successful:", data.data);
          setShareResult(data.data);
          if (window.event) {
            window.event.preventDefault();
            window.event.stopPropagation();
          }
        } else {
          throw new Error("Failed to share cart");
        }
      } catch (err) {
        alert("Error: " + err.message);
      } finally {
        setShareLoading(false);
      }
    };
    const handleCreateQuote = async () => {
      setQuoteLoading(true);
      setQuoteResult(null);
      try {
        const requestData = {
          ...quoteData,
          cart_data: cart
          // Include the cart data in the request
        };
        console.log("Creating quote with data:", requestData);
        const response = await fetch("/wp-json/wc-cart-share-quote/v1/cart/quote", {
          method: "POST",
          headers: {
            "X-WP-Nonce": restNonce,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestData)
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to create quote");
        }
        if (data.success) {
          console.log("Quote successful:", data.data);
          setQuoteResult(data.data);
          if (window.event) {
            window.event.preventDefault();
            window.event.stopPropagation();
          }
        } else {
          throw new Error("Failed to create quote");
        }
      } catch (err) {
        alert("Error: " + err.message);
      } finally {
        setQuoteLoading(false);
      }
    };
    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        alert("Link copied to clipboard!");
      }).catch(() => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Link copied to clipboard!");
      });
    };
    const modalStyles = {
      overlay: {
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1e4
      },
      content: {
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "0",
        maxWidth: "500px",
        width: "90%",
        maxHeight: "90vh",
        overflow: "auto",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
      },
      header: {
        padding: "24px 24px 16px 24px",
        borderBottom: "1px solid #e5e7eb"
      },
      body: {
        padding: "24px"
      },
      footer: {
        padding: "16px 24px 24px 24px",
        borderTop: "1px solid #e5e7eb",
        display: "flex",
        gap: "12px",
        justifyContent: "flex-end"
      }
    };
    const inputStyles = {
      width: "100%",
      padding: "12px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "16px",
      marginBottom: "16px"
    };
    const buttonStyles = {
      primary: {
        padding: "12px 24px",
        backgroundColor: "#007cba",
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer"
      },
      secondary: {
        padding: "12px 24px",
        backgroundColor: "transparent",
        color: "#6b7280",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer"
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Root$2, { open: showShareModal, onOpenChange: onCloseShareModal, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { style: modalStyles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.95 },
          style: modalStyles.content,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: modalStyles.header, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Title, { style: { margin: 0, fontSize: "20px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 20 }),
                "Share Your Cart"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "8px 0 0 0", color: "#6b7280" }, children: "Create a shareable link for your cart" })
            ] }),
            loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...modalStyles.body, textAlign: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginBottom: "16px" }, children: "Loading cart..." }) }) : shareResult ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: modalStyles.body, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              background: "#d1fae5",
              border: "1px solid #a7f3d0",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "20px"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { margin: "0 0 12px 0", color: "#065f46", display: "flex", alignItems: "center", gap: "8px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 18 }),
                "Cart Shared Successfully!"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "0 0 16px 0", color: "#065f46" }, children: "Your cart has been shared. Anyone with this link can view and add these items to their cart." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "16px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", fontWeight: "600", marginBottom: "8px", color: "#065f46" }, children: "Share Link:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: shareResult.share_url,
                    readOnly: true,
                    style: {
                      ...inputStyles,
                      marginBottom: "12px",
                      width: "100%",
                      backgroundColor: "#f3f4f6"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => copyToClipboard(shareResult.share_url),
                    style: {
                      ...buttonStyles.primary,
                      padding: "12px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 16 }),
                      "Copy"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "14px", color: "#047857" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Cart ID:" }),
                  " ",
                  shareResult.hash
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Items:" }),
                  " ",
                  shareResult.cart_items
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Total:" }),
                  " ",
                  shareResult.cart_total
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Expires:" }),
                  " ",
                  new Date(shareResult.expires_at).toLocaleDateString()
                ] })
              ] })
            ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: modalStyles.body, children: [
              cart && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "20px"
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "0 0 12px 0" }, children: "Cart Summary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "14px", color: "#6b7280" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Items:" }),
                    " ",
                    cart.items_count
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Total:" }),
                    " ",
                    cart.total_with_tax
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Your name (optional)",
                    value: shareData.customer_name,
                    onChange: (e) => setShareData({ ...shareData, customer_name: e.target.value }),
                    style: inputStyles
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "email",
                    placeholder: "Your email (optional)",
                    value: shareData.customer_email,
                    onChange: (e) => setShareData({ ...shareData, customer_email: e.target.value }),
                    style: inputStyles
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "tel",
                    placeholder: "Your phone (optional)",
                    value: shareData.customer_phone,
                    onChange: (e) => setShareData({ ...shareData, customer_phone: e.target.value }),
                    style: inputStyles
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "16px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", fontWeight: "600", marginBottom: "8px" }, children: "Link expires in:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      value: shareData.expires_hours,
                      onChange: (e) => setShareData({ ...shareData, expires_hours: parseInt(e.target.value) }),
                      style: inputStyles,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 24, children: "24 hours" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 72, children: "3 days" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 168, children: "1 week" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 720, children: "1 month" })
                      ]
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: modalStyles.footer, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: onCloseShareModal,
                  style: buttonStyles.secondary,
                  children: shareResult ? "Close" : "Cancel"
                }
              ),
              !shareResult && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.preventDefault();
                    handleShareCart();
                  },
                  disabled: shareLoading || !cart || cart.is_empty,
                  style: {
                    ...buttonStyles.primary,
                    backgroundColor: shareLoading ? "#9ca3af" : "#007cba",
                    cursor: shareLoading ? "not-allowed" : "pointer"
                  },
                  children: shareLoading ? "Creating Link..." : "Create Share Link"
                }
              )
            ] })
          ]
        }
      ) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Root$2, { open: showQuoteModal, onOpenChange: onCloseQuoteModal, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { style: modalStyles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.95 },
          style: modalStyles.content,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: modalStyles.header, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Title, { style: { margin: 0, fontSize: "20px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 20 }),
                "Request a Quote"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "8px 0 0 0", color: "#6b7280" }, children: "Get custom pricing for your cart items" })
            ] }),
            loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...modalStyles.body, textAlign: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginBottom: "16px" }, children: "Loading cart..." }) }) : quoteResult ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: modalStyles.body, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              background: "#dbeafe",
              border: "1px solid #93c5fd",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "20px"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { margin: "0 0 12px 0", color: "#1e40af", display: "flex", alignItems: "center", gap: "8px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 18 }),
                "Quote Generated Successfully!"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "0 0 16px 0", color: "#1e40af" }, children: "Your quote has been created and is ready to share. Use the buttons below to view or share your quote." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "16px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", fontWeight: "600", marginBottom: "8px", color: "#1e40af" }, children: "Quote Link:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: quoteResult.quote_url,
                    readOnly: true,
                    style: {
                      ...inputStyles,
                      marginBottom: "12px",
                      width: "100%",
                      backgroundColor: "#f3f4f6"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px", justifyContent: "flex-start" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => copyToClipboard(quoteResult.quote_url),
                      style: {
                        ...buttonStyles.primary,
                        padding: "12px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 16 }),
                        "Copy"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => window.open(quoteResult.quote_url, "_blank"),
                      style: {
                        ...buttonStyles.secondary,
                        padding: "12px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 16 }),
                        "View Quote"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "14px", color: "#1d4ed8" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Quote ID:" }),
                  " #",
                  quoteResult.quote_id
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Customer:" }),
                  " ",
                  quoteResult.customer_name
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Items:" }),
                  " ",
                  quoteResult.cart_items
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Estimated Total:" }),
                  " ",
                  quoteResult.cart_total
                ] })
              ] })
            ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: modalStyles.body, children: [
              cart && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "20px"
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "0 0 12px 0" }, children: "Cart Summary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "14px", color: "#6b7280" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Items:" }),
                    " ",
                    cart.items_count
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Current Total:" }),
                    " ",
                    cart.total_with_tax
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Your name *",
                    value: quoteData.customer_name,
                    onChange: (e) => setQuoteData({ ...quoteData, customer_name: e.target.value }),
                    style: inputStyles,
                    required: true
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "email",
                    placeholder: "Your email *",
                    value: quoteData.customer_email,
                    onChange: (e) => setQuoteData({ ...quoteData, customer_email: e.target.value }),
                    style: inputStyles,
                    required: true
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "tel",
                    placeholder: "Your phone (optional)",
                    value: quoteData.customer_phone,
                    onChange: (e) => setQuoteData({ ...quoteData, customer_phone: e.target.value }),
                    style: inputStyles
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    placeholder: "Additional message or requirements (optional)",
                    value: quoteData.message,
                    onChange: (e) => setQuoteData({ ...quoteData, message: e.target.value }),
                    rows: 4,
                    style: {
                      ...inputStyles,
                      resize: "vertical"
                    }
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: modalStyles.footer, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: onCloseQuoteModal,
                  style: buttonStyles.secondary,
                  children: quoteResult ? "Close" : "Cancel"
                }
              ),
              !quoteResult && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.preventDefault();
                    handleCreateQuote();
                  },
                  disabled: quoteLoading || !cart || cart.is_empty || !quoteData.customer_name || !quoteData.customer_email,
                  style: {
                    ...buttonStyles.primary,
                    backgroundColor: quoteLoading ? "#9ca3af" : "#00a32a",
                    cursor: quoteLoading || !quoteData.customer_name || !quoteData.customer_email ? "not-allowed" : "pointer"
                  },
                  children: quoteLoading ? "Submitting..." : "Request Quote"
                }
              )
            ] })
          ]
        }
      ) }) }) })
    ] });
  }
  function ShadowApp(props = {}) {
    const {
      restNonce = "",
      pageType = "default",
      cartHash = "",
      quoteId = "",
      currentUrl = "",
      cartData = ""
    } = props;
    const [isOpen, setIsOpen] = reactExports.useState(false);
    const [query, setQuery] = reactExports.useState("");
    const [userData, setUserData] = reactExports.useState(null);
    const [siteData, setSiteData] = reactExports.useState(null);
    const [loading, setLoading] = reactExports.useState(true);
    const [error, setError] = reactExports.useState(null);
    const [showShareModal, setShowShareModal] = reactExports.useState(false);
    const [showQuoteModal, setShowQuoteModal] = reactExports.useState(false);
    reactExports.useEffect(() => {
      if (pageType !== "default") {
        setLoading(false);
        return;
      }
      const fetchData = async () => {
        if (!restNonce) {
          setError("No REST nonce provided");
          setLoading(false);
          return;
        }
        try {
          setLoading(true);
          const [userResponse, siteResponse] = await Promise.all([
            fetch("/wp-json/wc-cart-share-quote/v1/user", {
              headers: {
                "X-WP-Nonce": restNonce
              }
            }),
            fetch("/wp-json/wc-cart-share-quote/v1/site", {
              headers: {
                "X-WP-Nonce": restNonce
              }
            })
          ]);
          if (!userResponse.ok || !siteResponse.ok) {
            throw new Error("Failed to fetch data");
          }
          const userData2 = await userResponse.json();
          const siteData2 = await siteResponse.json();
          if (userData2.success && siteData2.success) {
            setUserData(userData2.data);
            setSiteData(siteData2.data);
          } else {
            throw new Error("API returned error");
          }
        } catch (err) {
          setError(err.message);
          console.error("WC Cart Share Quote API Error:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [restNonce, pageType]);
    const commands = React2.useMemo(() => {
      if (pageType !== "default" || !userData || !siteData) return [];
      return [
        {
          id: "working",
          title: "WooCommerce Cart Share & Quote Working!",
          description: "Plugin successfully integrated with WordPress and WooCommerce",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 16 })
        },
        {
          id: "user",
          title: `User: ${userData.userName} (${userData.userRole})`,
          description: `ID: ${userData.userId}, Admin: ${userData.isAdmin ? "Yes" : "No"}, Email: ${userData.userEmail}`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 16 })
        },
        {
          id: "site",
          title: `Site: ${siteData.siteName}`,
          description: `${siteData.siteDescription} - WordPress ${siteData.wordpressVersion}`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 16 })
        },
        {
          id: "woocommerce",
          title: "WooCommerce Integration Active",
          description: "Cart sharing and quote functionality enabled",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 16 })
        },
        {
          id: "security",
          title: "Security Features Enabled",
          description: "Rate limiting, HPOS compatibility, and data validation active",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 16 })
        },
        {
          id: "architecture",
          title: "Modern Plugin Architecture",
          description: `v${siteData.pluginVersion} - React + Shadow DOM + REST API`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building, { size: 16 })
        }
      ];
    }, [userData, siteData, pageType]);
    const filteredCommands = commands.filter(
      (command) => command.title.toLowerCase().includes(query.toLowerCase()) || command.description.toLowerCase().includes(query.toLowerCase())
    );
    reactExports.useEffect(() => {
      const handleKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "k") {
          e.preventDefault();
          setIsOpen(!isOpen);
        }
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);
    reactExports.useEffect(() => {
      if (pageType === "cart-actions") {
        window.WCCartShareQuote = {
          openShareModal: () => setShowShareModal(true),
          openQuoteModal: () => setShowQuoteModal(true)
        };
        return () => {
          delete window.WCCartShareQuote;
        };
      }
    }, [pageType]);
    const handleCommandClick = (command) => {
      console.log(`Clicked: ${command.title}`);
    };
    const handleClose = () => {
      setIsOpen(false);
    };
    const handleOpen = () => {
      setIsOpen(true);
    };
    const renderPageContent = () => {
      switch (pageType) {
        case "shared-cart":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            SharedCartView,
            {
              cartHash,
              restNonce
            }
          );
        case "quote":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuoteView,
            {
              quoteId,
              restNonce
            }
          );
        case "cart-actions":
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartActionsModal,
            {
              restNonce,
              currentUrl,
              showShareModal,
              showQuoteModal,
              onCloseShareModal: () => setShowShareModal(false),
              onCloseQuoteModal: () => setShowQuoteModal(false),
              cartData
            }
          );
        default:
          return null;
      }
    };
    if (pageType === "default" && loading) {
      const loadingCommands = [{
        id: "loading",
        title: "Loading plugin status...",
        description: "Fetching user and site information via REST API",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" })
      }];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShadowStyles, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CommandPalette,
          {
            query,
            setQuery,
            filteredCommands: loadingCommands,
            onCommandClick: handleCommandClick,
            onClose: handleClose
          }
        ) }),
        !isOpen && window.location.pathname.includes("/wp-admin/") && /* @__PURE__ */ jsxRuntimeExports.jsx(TriggerButton, { onClick: handleOpen })
      ] });
    }
    if (pageType === "default" && error) {
      const errorCommands = [{
        id: "error",
        title: "API Error: " + error,
        description: "Check console for details. Make sure you are logged in.",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16 })
      }];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShadowStyles, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CommandPalette,
          {
            query,
            setQuery,
            filteredCommands: errorCommands,
            onCommandClick: handleCommandClick,
            onClose: handleClose
          }
        ) }),
        !isOpen && window.location.pathname.includes("/wp-admin/") && /* @__PURE__ */ jsxRuntimeExports.jsx(TriggerButton, { onClick: handleOpen })
      ] });
    }
    if (pageType && pageType !== "default") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShadowStyles, {}),
        renderPageContent()
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShadowStyles, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
        CommandPalette,
        {
          query,
          setQuery,
          filteredCommands,
          onCommandClick: handleCommandClick,
          onClose: handleClose
        }
      ) }),
      !isOpen && window.location.pathname.includes("/wp-admin/") && /* @__PURE__ */ jsxRuntimeExports.jsx(TriggerButton, { onClick: handleOpen })
    ] });
  }
  function createCollection(name) {
    const PROVIDER_NAME = name + "CollectionProvider";
    const [createCollectionContext, createCollectionScope2] = createContextScope(PROVIDER_NAME);
    const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(
      PROVIDER_NAME,
      { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
    );
    const CollectionProvider = (props) => {
      const { scope, children } = props;
      const ref = React2.useRef(null);
      const itemMap = React2.useRef(/* @__PURE__ */ new Map()).current;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionProviderImpl, { scope, itemMap, collectionRef: ref, children });
    };
    CollectionProvider.displayName = PROVIDER_NAME;
    const COLLECTION_SLOT_NAME = name + "CollectionSlot";
    const CollectionSlotImpl = /* @__PURE__ */ createSlot(COLLECTION_SLOT_NAME);
    const CollectionSlot = React2.forwardRef(
      (props, forwardedRef) => {
        const { scope, children } = props;
        const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
        const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionSlotImpl, { ref: composedRefs, children });
      }
    );
    CollectionSlot.displayName = COLLECTION_SLOT_NAME;
    const ITEM_SLOT_NAME = name + "CollectionItemSlot";
    const ITEM_DATA_ATTR = "data-radix-collection-item";
    const CollectionItemSlotImpl = /* @__PURE__ */ createSlot(ITEM_SLOT_NAME);
    const CollectionItemSlot = React2.forwardRef(
      (props, forwardedRef) => {
        const { scope, children, ...itemData } = props;
        const ref = React2.useRef(null);
        const composedRefs = useComposedRefs(forwardedRef, ref);
        const context = useCollectionContext(ITEM_SLOT_NAME, scope);
        React2.useEffect(() => {
          context.itemMap.set(ref, { ref, ...itemData });
          return () => void context.itemMap.delete(ref);
        });
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionItemSlotImpl, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
      }
    );
    CollectionItemSlot.displayName = ITEM_SLOT_NAME;
    function useCollection2(scope) {
      const context = useCollectionContext(name + "CollectionConsumer", scope);
      const getItems = React2.useCallback(() => {
        const collectionNode = context.collectionRef.current;
        if (!collectionNode) return [];
        const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
        const items = Array.from(context.itemMap.values());
        const orderedItems = items.sort(
          (a2, b) => orderedNodes.indexOf(a2.ref.current) - orderedNodes.indexOf(b.ref.current)
        );
        return orderedItems;
      }, [context.collectionRef, context.itemMap]);
      return getItems;
    }
    return [
      { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
      useCollection2,
      createCollectionScope2
    ];
  }
  var DirectionContext = reactExports.createContext(void 0);
  function useDirection(localDir) {
    const globalDir = reactExports.useContext(DirectionContext);
    return localDir || globalDir || "ltr";
  }
  var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
  var EVENT_OPTIONS = { bubbles: false, cancelable: true };
  var GROUP_NAME = "RovingFocusGroup";
  var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
  var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
    GROUP_NAME,
    [createCollectionScope]
  );
  var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
  var RovingFocusGroup = reactExports.forwardRef(
    (props, forwardedRef) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
    }
  );
  RovingFocusGroup.displayName = GROUP_NAME;
  var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      orientation,
      loop = false,
      dir,
      currentTabStopId: currentTabStopIdProp,
      defaultCurrentTabStopId,
      onCurrentTabStopIdChange,
      onEntryFocus,
      preventScrollOnEntryFocus = false,
      ...groupProps
    } = props;
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const direction = useDirection(dir);
    const [currentTabStopId, setCurrentTabStopId] = useControllableState({
      prop: currentTabStopIdProp,
      defaultProp: defaultCurrentTabStopId ?? null,
      onChange: onCurrentTabStopIdChange,
      caller: GROUP_NAME
    });
    const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
    const handleEntryFocus = useCallbackRef$1(onEntryFocus);
    const getItems = useCollection(__scopeRovingFocusGroup);
    const isClickFocusRef = reactExports.useRef(false);
    const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
    reactExports.useEffect(() => {
      const node = ref.current;
      if (node) {
        node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
        return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
      }
    }, [handleEntryFocus]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      RovingFocusProvider,
      {
        scope: __scopeRovingFocusGroup,
        orientation,
        dir: direction,
        loop,
        currentTabStopId,
        onItemFocus: reactExports.useCallback(
          (tabStopId) => setCurrentTabStopId(tabStopId),
          [setCurrentTabStopId]
        ),
        onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
        onFocusableItemAdd: reactExports.useCallback(
          () => setFocusableItemsCount((prevCount) => prevCount + 1),
          []
        ),
        onFocusableItemRemove: reactExports.useCallback(
          () => setFocusableItemsCount((prevCount) => prevCount - 1),
          []
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
            "data-orientation": orientation,
            ...groupProps,
            ref: composedRefs,
            style: { outline: "none", ...props.style },
            onMouseDown: composeEventHandlers(props.onMouseDown, () => {
              isClickFocusRef.current = true;
            }),
            onFocus: composeEventHandlers(props.onFocus, (event) => {
              const isKeyboardFocus = !isClickFocusRef.current;
              if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
                const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
                event.currentTarget.dispatchEvent(entryFocusEvent);
                if (!entryFocusEvent.defaultPrevented) {
                  const items = getItems().filter((item) => item.focusable);
                  const activeItem = items.find((item) => item.active);
                  const currentItem = items.find((item) => item.id === currentTabStopId);
                  const candidateItems = [activeItem, currentItem, ...items].filter(
                    Boolean
                  );
                  const candidateNodes = candidateItems.map((item) => item.ref.current);
                  focusFirst(candidateNodes, preventScrollOnEntryFocus);
                }
              }
              isClickFocusRef.current = false;
            }),
            onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
          }
        )
      }
    );
  });
  var ITEM_NAME = "RovingFocusGroupItem";
  var RovingFocusGroupItem = reactExports.forwardRef(
    (props, forwardedRef) => {
      const {
        __scopeRovingFocusGroup,
        focusable = true,
        active = false,
        tabStopId,
        children,
        ...itemProps
      } = props;
      const autoId = useId();
      const id2 = tabStopId || autoId;
      const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
      const isCurrentTabStop = context.currentTabStopId === id2;
      const getItems = useCollection(__scopeRovingFocusGroup);
      const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
      reactExports.useEffect(() => {
        if (focusable) {
          onFocusableItemAdd();
          return () => onFocusableItemRemove();
        }
      }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Collection.ItemSlot,
        {
          scope: __scopeRovingFocusGroup,
          id: id2,
          focusable,
          active,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Primitive.span,
            {
              tabIndex: isCurrentTabStop ? 0 : -1,
              "data-orientation": context.orientation,
              ...itemProps,
              ref: forwardedRef,
              onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
                if (!focusable) event.preventDefault();
                else context.onItemFocus(id2);
              }),
              onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id2)),
              onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
                if (event.key === "Tab" && event.shiftKey) {
                  context.onItemShiftTab();
                  return;
                }
                if (event.target !== event.currentTarget) return;
                const focusIntent = getFocusIntent(event, context.orientation, context.dir);
                if (focusIntent !== void 0) {
                  if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                  event.preventDefault();
                  const items = getItems().filter((item) => item.focusable);
                  let candidateNodes = items.map((item) => item.ref.current);
                  if (focusIntent === "last") candidateNodes.reverse();
                  else if (focusIntent === "prev" || focusIntent === "next") {
                    if (focusIntent === "prev") candidateNodes.reverse();
                    const currentIndex = candidateNodes.indexOf(event.currentTarget);
                    candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                  }
                  setTimeout(() => focusFirst(candidateNodes));
                }
              }),
              children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
            }
          )
        }
      );
    }
  );
  RovingFocusGroupItem.displayName = ITEM_NAME;
  var MAP_KEY_TO_FOCUS_INTENT = {
    ArrowLeft: "prev",
    ArrowUp: "prev",
    ArrowRight: "next",
    ArrowDown: "next",
    PageUp: "first",
    Home: "first",
    PageDown: "last",
    End: "last"
  };
  function getDirectionAwareKey(key, dir) {
    if (dir !== "rtl") return key;
    return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
  }
  function getFocusIntent(event, orientation, dir) {
    const key = getDirectionAwareKey(event.key, dir);
    if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
    if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
    return MAP_KEY_TO_FOCUS_INTENT[key];
  }
  function focusFirst(candidates, preventScroll = false) {
    const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
    for (const candidate of candidates) {
      if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
      candidate.focus({ preventScroll });
      if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
    }
  }
  function wrapArray(array, startIndex) {
    return array.map((_2, index) => array[(startIndex + index) % array.length]);
  }
  var Root$1 = RovingFocusGroup;
  var Item = RovingFocusGroupItem;
  var TABS_NAME = "Tabs";
  var [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [
    createRovingFocusGroupScope
  ]);
  var useRovingFocusGroupScope = createRovingFocusGroupScope();
  var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
  var Tabs = reactExports.forwardRef(
    (props, forwardedRef) => {
      const {
        __scopeTabs,
        value: valueProp,
        onValueChange,
        defaultValue,
        orientation = "horizontal",
        dir,
        activationMode = "automatic",
        ...tabsProps
      } = props;
      const direction = useDirection(dir);
      const [value, setValue] = useControllableState({
        prop: valueProp,
        onChange: onValueChange,
        defaultProp: defaultValue ?? "",
        caller: TABS_NAME
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        TabsProvider,
        {
          scope: __scopeTabs,
          baseId: useId(),
          value,
          onValueChange: setValue,
          orientation,
          dir: direction,
          activationMode,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Primitive.div,
            {
              dir: direction,
              "data-orientation": orientation,
              ...tabsProps,
              ref: forwardedRef
            }
          )
        }
      );
    }
  );
  Tabs.displayName = TABS_NAME;
  var TAB_LIST_NAME = "TabsList";
  var TabsList = reactExports.forwardRef(
    (props, forwardedRef) => {
      const { __scopeTabs, loop = true, ...listProps } = props;
      const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
      const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Root$1,
        {
          asChild: true,
          ...rovingFocusGroupScope,
          orientation: context.orientation,
          dir: context.dir,
          loop,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Primitive.div,
            {
              role: "tablist",
              "aria-orientation": context.orientation,
              ...listProps,
              ref: forwardedRef
            }
          )
        }
      );
    }
  );
  TabsList.displayName = TAB_LIST_NAME;
  var TRIGGER_NAME = "TabsTrigger";
  var TabsTrigger = reactExports.forwardRef(
    (props, forwardedRef) => {
      const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
      const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
      const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
      const triggerId = makeTriggerId(context.baseId, value);
      const contentId = makeContentId(context.baseId, value);
      const isSelected = value === context.value;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Item,
        {
          asChild: true,
          ...rovingFocusGroupScope,
          focusable: !disabled,
          active: isSelected,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Primitive.button,
            {
              type: "button",
              role: "tab",
              "aria-selected": isSelected,
              "aria-controls": contentId,
              "data-state": isSelected ? "active" : "inactive",
              "data-disabled": disabled ? "" : void 0,
              disabled,
              id: triggerId,
              ...triggerProps,
              ref: forwardedRef,
              onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
                if (!disabled && event.button === 0 && event.ctrlKey === false) {
                  context.onValueChange(value);
                } else {
                  event.preventDefault();
                }
              }),
              onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
                if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
              }),
              onFocus: composeEventHandlers(props.onFocus, () => {
                const isAutomaticActivation = context.activationMode !== "manual";
                if (!isSelected && !disabled && isAutomaticActivation) {
                  context.onValueChange(value);
                }
              })
            }
          )
        }
      );
    }
  );
  TabsTrigger.displayName = TRIGGER_NAME;
  var CONTENT_NAME = "TabsContent";
  var TabsContent = reactExports.forwardRef(
    (props, forwardedRef) => {
      const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
      const context = useTabsContext(CONTENT_NAME, __scopeTabs);
      const triggerId = makeTriggerId(context.baseId, value);
      const contentId = makeContentId(context.baseId, value);
      const isSelected = value === context.value;
      const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
      reactExports.useEffect(() => {
        const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
        return () => cancelAnimationFrame(rAF);
      }, []);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-state": isSelected ? "active" : "inactive",
          "data-orientation": context.orientation,
          role: "tabpanel",
          "aria-labelledby": triggerId,
          hidden: !present,
          id: contentId,
          tabIndex: 0,
          ...contentProps,
          ref: forwardedRef,
          style: {
            ...props.style,
            animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
          },
          children: present && children
        }
      ) });
    }
  );
  TabsContent.displayName = CONTENT_NAME;
  function makeTriggerId(baseId, value) {
    return `${baseId}-trigger-${value}`;
  }
  function makeContentId(baseId, value) {
    return `${baseId}-content-${value}`;
  }
  var Root2 = Tabs;
  var List = TabsList;
  var Trigger = TabsTrigger;
  var Content = TabsContent;
  function usePrevious(value) {
    const ref = reactExports.useRef({ value, previous: value });
    return reactExports.useMemo(() => {
      if (ref.current.value !== value) {
        ref.current.previous = ref.current.value;
        ref.current.value = value;
      }
      return ref.current.previous;
    }, [value]);
  }
  function useSize(element) {
    const [size, setSize] = reactExports.useState(void 0);
    useLayoutEffect2(() => {
      if (element) {
        setSize({ width: element.offsetWidth, height: element.offsetHeight });
        const resizeObserver = new ResizeObserver((entries) => {
          if (!Array.isArray(entries)) {
            return;
          }
          if (!entries.length) {
            return;
          }
          const entry = entries[0];
          let width;
          let height;
          if ("borderBoxSize" in entry) {
            const borderSizeEntry = entry["borderBoxSize"];
            const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
            width = borderSize["inlineSize"];
            height = borderSize["blockSize"];
          } else {
            width = element.offsetWidth;
            height = element.offsetHeight;
          }
          setSize({ width, height });
        });
        resizeObserver.observe(element, { box: "border-box" });
        return () => resizeObserver.unobserve(element);
      } else {
        setSize(void 0);
      }
    }, [element]);
    return size;
  }
  var SWITCH_NAME = "Switch";
  var [createSwitchContext, createSwitchScope] = createContextScope(SWITCH_NAME);
  var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
  var Switch = reactExports.forwardRef(
    (props, forwardedRef) => {
      const {
        __scopeSwitch,
        name,
        checked: checkedProp,
        defaultChecked,
        required,
        disabled,
        value = "on",
        onCheckedChange,
        form,
        ...switchProps
      } = props;
      const [button, setButton] = reactExports.useState(null);
      const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
      const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
      const isFormControl = button ? form || !!button.closest("form") : true;
      const [checked, setChecked] = useControllableState({
        prop: checkedProp,
        defaultProp: defaultChecked ?? false,
        onChange: onCheckedChange,
        caller: SWITCH_NAME
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "switch",
            "aria-checked": checked,
            "aria-required": required,
            "data-state": getState(checked),
            "data-disabled": disabled ? "" : void 0,
            disabled,
            value,
            ...switchProps,
            ref: composedRefs,
            onClick: composeEventHandlers(props.onClick, (event) => {
              setChecked((prevChecked) => !prevChecked);
              if (isFormControl) {
                hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
                if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
              }
            })
          }
        ),
        isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
          SwitchBubbleInput,
          {
            control: button,
            bubbles: !hasConsumerStoppedPropagationRef.current,
            name,
            value,
            checked,
            required,
            disabled,
            form,
            style: { transform: "translateX(-100%)" }
          }
        )
      ] });
    }
  );
  Switch.displayName = SWITCH_NAME;
  var THUMB_NAME = "SwitchThumb";
  var SwitchThumb = reactExports.forwardRef(
    (props, forwardedRef) => {
      const { __scopeSwitch, ...thumbProps } = props;
      const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.span,
        {
          "data-state": getState(context.checked),
          "data-disabled": context.disabled ? "" : void 0,
          ...thumbProps,
          ref: forwardedRef
        }
      );
    }
  );
  SwitchThumb.displayName = THUMB_NAME;
  var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
  var SwitchBubbleInput = reactExports.forwardRef(
    ({
      __scopeSwitch,
      control,
      checked,
      bubbles = true,
      ...props
    }, forwardedRef) => {
      const ref = reactExports.useRef(null);
      const composedRefs = useComposedRefs(ref, forwardedRef);
      const prevChecked = usePrevious(checked);
      const controlSize = useSize(control);
      reactExports.useEffect(() => {
        const input = ref.current;
        if (!input) return;
        const inputProto = window.HTMLInputElement.prototype;
        const descriptor = Object.getOwnPropertyDescriptor(
          inputProto,
          "checked"
        );
        const setChecked = descriptor.set;
        if (prevChecked !== checked && setChecked) {
          const event = new Event("click", { bubbles });
          setChecked.call(input, checked);
          input.dispatchEvent(event);
        }
      }, [prevChecked, checked, bubbles]);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "checkbox",
          "aria-hidden": true,
          defaultChecked: checked,
          ...props,
          tabIndex: -1,
          ref: composedRefs,
          style: {
            ...props.style,
            ...controlSize,
            position: "absolute",
            pointerEvents: "none",
            opacity: 0,
            margin: 0
          }
        }
      );
    }
  );
  SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
  function getState(checked) {
    return checked ? "checked" : "unchecked";
  }
  var Root = Switch;
  var Thumb = SwitchThumb;
  function SettingsApp({ restNonce }) {
    const [settings, setSettings] = reactExports.useState({
      general: {
        store_name: "",
        store_address: "",
        contact_email: "",
        contact_name: "",
        support_phone: "",
        store_logo: "",
        store_website: "",
        store_description: "",
        enable_share_cart: true,
        enable_quote_request: true,
        default_expiry_days: 30,
        require_login_for_quotes: false,
        email_notifications: true
      },
      design: {
        primary_color: "#007cba",
        secondary_color: "#00a32a",
        button_style: "rounded",
        button_size: "medium",
        font_family: "system",
        border_radius: 6,
        custom_css: ""
      },
      form_fields: {
        share_form: [
          { name: "customer_email", label: "Email Address", type: "email", required: true, enabled: true },
          { name: "customer_name", label: "Your Name", type: "text", required: false, enabled: true },
          { name: "recipient_email", label: "Recipient Email", type: "email", required: true, enabled: true },
          { name: "personal_message", label: "Personal Message", type: "textarea", required: false, enabled: true }
        ],
        quote_form: [
          { name: "customer_name", label: "Full Name", type: "text", required: true, enabled: true },
          { name: "customer_email", label: "Email Address", type: "email", required: true, enabled: true },
          { name: "customer_phone", label: "Phone Number", type: "tel", required: false, enabled: true },
          { name: "company_name", label: "Company Name", type: "text", required: false, enabled: true },
          { name: "quote_notes", label: "Special Requirements", type: "textarea", required: false, enabled: true }
        ]
      }
    });
    const [loading, setLoading] = reactExports.useState(true);
    const [saving, setSaving] = reactExports.useState(false);
    const [message, setMessage] = reactExports.useState("");
    reactExports.useEffect(() => {
      loadSettings();
    }, []);
    const loadSettings = async () => {
      try {
        setLoading(true);
        const response = await fetch("/wp-json/woo-presales/v1/settings", {
          headers: {
            "X-WP-Nonce": restNonce
          }
        });
        if (response.ok) {
          const data = await response.json();
          setSettings((prev) => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setLoading(false);
      }
    };
    const saveSettings = async () => {
      try {
        setSaving(true);
        const response = await fetch("/wp-json/woo-presales/v1/settings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-WP-Nonce": restNonce
          },
          body: JSON.stringify(settings)
        });
        if (response.ok) {
          setMessage("Settings saved successfully!");
          setTimeout(() => setMessage(""), 3e3);
        } else {
          throw new Error("Failed to save settings");
        }
      } catch (error) {
        setMessage("Error saving settings. Please try again.");
        console.error("Save error:", error);
      } finally {
        setSaving(false);
      }
    };
    const updateSetting = (section, key, value) => {
      setSettings((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value
        }
      }));
    };
    const updateFormField = (formType, fieldIndex, updates) => {
      setSettings((prev) => ({
        ...prev,
        form_fields: {
          ...prev.form_fields,
          [formType]: prev.form_fields[formType].map(
            (field, index) => index === fieldIndex ? { ...field, ...updates } : field
          )
        }
      }));
    };
    const getFontFamilyForPreview = (family) => {
      const families = {
        "system": '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        "arial": "Arial, sans-serif",
        "helvetica": "Helvetica, Arial, sans-serif",
        "georgia": "Georgia, serif",
        "times": '"Times New Roman", Times, serif'
      };
      return families[family] || families["system"];
    };
    if (loading) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "40px", textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "32px", height: "32px", border: "3px solid #f3f3f3", borderTop: "3px solid #007cba", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 20px" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading settings..." })
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: "1200px", margin: "0", padding: "0" }, children: [
      message && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        background: message.includes("Error") ? "#d63638" : "#00a32a",
        color: "white",
        padding: "12px 20px",
        borderRadius: "4px",
        marginBottom: "20px"
      }, children: message }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Root2, { defaultValue: "general", style: { width: "100%" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(List, { style: {
          display: "flex",
          borderBottom: "1px solid #ddd",
          background: "white",
          padding: "0 20px"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { value: "general", style: {
            padding: "16px 24px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            borderBottom: "2px solid transparent",
            fontSize: "14px",
            fontWeight: "500"
          }, children: "General Settings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { value: "design", style: {
            padding: "16px 24px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            borderBottom: "2px solid transparent",
            fontSize: "14px",
            fontWeight: "500"
          }, children: "Design & Styling" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { value: "form-fields", style: {
            padding: "16px 24px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            borderBottom: "2px solid transparent",
            fontSize: "14px",
            fontWeight: "500"
          }, children: "Form Fields" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { value: "general", style: { padding: "30px", background: "white" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { marginTop: "0", color: "#1d2327", fontSize: "20px" }, children: "General Settings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gap: "32px", maxWidth: "800px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "0 0 16px 0", color: "#1d2327", fontSize: "16px", fontWeight: "600" }, children: "Store Information" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gap: "20px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", marginBottom: "8px", fontWeight: "600", color: "#1d2327" }, children: "Store Name *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "text",
                        value: settings.general.store_name,
                        onChange: (e) => updateSetting("general", "store_name", e.target.value),
                        style: {
                          width: "100%",
                          padding: "8px 12px",
                          border: "1px solid #8c8f94",
                          borderRadius: "4px",
                          fontSize: "14px"
                        },
                        placeholder: "Your Store Name"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", marginBottom: "8px", fontWeight: "600", color: "#1d2327" }, children: "Store Website" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "url",
                        value: settings.general.store_website,
                        onChange: (e) => updateSetting("general", "store_website", e.target.value),
                        style: {
                          width: "100%",
                          padding: "8px 12px",
                          border: "1px solid #8c8f94",
                          borderRadius: "4px",
                          fontSize: "14px"
                        },
                        placeholder: "https://yourstore.com"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", marginBottom: "8px", fontWeight: "600", color: "#1d2327" }, children: "Store Address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      value: settings.general.store_address,
                      onChange: (e) => updateSetting("general", "store_address", e.target.value),
                      rows: 3,
                      style: {
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #8c8f94",
                        borderRadius: "4px",
                        fontSize: "14px",
                        resize: "vertical"
                      },
                      placeholder: "123 Main Street\nCity, State 12345\nCountry"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", marginBottom: "8px", fontWeight: "600", color: "#1d2327" }, children: "Contact Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "text",
                        value: settings.general.contact_name,
                        onChange: (e) => updateSetting("general", "contact_name", e.target.value),
                        style: {
                          width: "100%",
                          padding: "8px 12px",
                          border: "1px solid #8c8f94",
                          borderRadius: "4px",
                          fontSize: "14px"
                        },
                        placeholder: "John Doe"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", marginBottom: "8px", fontWeight: "600", color: "#1d2327" }, children: "Contact Email *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "email",
                        value: settings.general.contact_email,
                        onChange: (e) => updateSetting("general", "contact_email", e.target.value),
                        style: {
                          width: "100%",
                          padding: "8px 12px",
                          border: "1px solid #8c8f94",
                          borderRadius: "4px",
                          fontSize: "14px"
                        },
                        placeholder: "contact@yourstore.com"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", marginBottom: "8px", fontWeight: "600", color: "#1d2327" }, children: "Support Phone" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "tel",
                        value: settings.general.support_phone,
                        onChange: (e) => updateSetting("general", "support_phone", e.target.value),
                        style: {
                          width: "100%",
                          padding: "8px 12px",
                          border: "1px solid #8c8f94",
                          borderRadius: "4px",
                          fontSize: "14px"
                        },
                        placeholder: "+1 (555) 123-4567"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", marginBottom: "8px", fontWeight: "600", color: "#1d2327" }, children: "Store Logo URL" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "12px", alignItems: "center" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "url",
                        value: settings.general.store_logo,
                        onChange: (e) => updateSetting("general", "store_logo", e.target.value),
                        style: {
                          flex: 1,
                          padding: "8px 12px",
                          border: "1px solid #8c8f94",
                          borderRadius: "4px",
                          fontSize: "14px"
                        },
                        placeholder: "https://yourstore.com/logo.png"
                      }
                    ),
                    settings.general.store_logo && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: settings.general.store_logo,
                        alt: "Store Logo Preview",
                        style: { width: "40px", height: "40px", objectFit: "contain", border: "1px solid #ddd", borderRadius: "4px" },
                        onError: (e) => e.target.style.display = "none"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "4px 0 0 0", fontSize: "12px", color: "#646970" }, children: "URL to your store logo (displayed on shared carts and quotes)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", marginBottom: "8px", fontWeight: "600", color: "#1d2327" }, children: "Store Description" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      value: settings.general.store_description,
                      onChange: (e) => updateSetting("general", "store_description", e.target.value),
                      rows: 3,
                      style: {
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #8c8f94",
                        borderRadius: "4px",
                        fontSize: "14px",
                        resize: "vertical"
                      },
                      placeholder: "Brief description of your store and what you offer..."
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "0 0 16px 0", color: "#1d2327", fontSize: "16px", fontWeight: "600" }, children: "Feature Settings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gap: "20px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "30px", alignItems: "center", flexWrap: "wrap" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Root,
                      {
                        checked: settings.general.enable_share_cart,
                        onCheckedChange: (checked) => updateSetting("general", "enable_share_cart", checked),
                        style: {
                          width: "42px",
                          height: "24px",
                          background: settings.general.enable_share_cart ? "#007cba" : "#ddd",
                          borderRadius: "12px",
                          position: "relative",
                          cursor: "pointer",
                          border: "none"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Thumb, { style: {
                          display: "block",
                          width: "20px",
                          height: "20px",
                          background: "white",
                          borderRadius: "10px",
                          transform: settings.general.enable_share_cart ? "translateX(20px)" : "translateX(2px)",
                          transition: "transform 100ms",
                          position: "absolute",
                          top: "2px"
                        } })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontWeight: "600", color: "#1d2327" }, children: "Enable Cart Sharing" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Root,
                      {
                        checked: settings.general.enable_quote_request,
                        onCheckedChange: (checked) => updateSetting("general", "enable_quote_request", checked),
                        style: {
                          width: "42px",
                          height: "24px",
                          background: settings.general.enable_quote_request ? "#007cba" : "#ddd",
                          borderRadius: "12px",
                          position: "relative",
                          cursor: "pointer",
                          border: "none"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Thumb, { style: {
                          display: "block",
                          width: "20px",
                          height: "20px",
                          background: "white",
                          borderRadius: "10px",
                          transform: settings.general.enable_quote_request ? "translateX(20px)" : "translateX(2px)",
                          transition: "transform 100ms",
                          position: "absolute",
                          top: "2px"
                        } })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontWeight: "600", color: "#1d2327" }, children: "Enable Quote Requests" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "30px", alignItems: "center", flexWrap: "wrap" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Root,
                      {
                        checked: settings.general.require_login_for_quotes,
                        onCheckedChange: (checked) => updateSetting("general", "require_login_for_quotes", checked),
                        style: {
                          width: "42px",
                          height: "24px",
                          background: settings.general.require_login_for_quotes ? "#007cba" : "#ddd",
                          borderRadius: "12px",
                          position: "relative",
                          cursor: "pointer",
                          border: "none"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Thumb, { style: {
                          display: "block",
                          width: "20px",
                          height: "20px",
                          background: "white",
                          borderRadius: "10px",
                          transform: settings.general.require_login_for_quotes ? "translateX(20px)" : "translateX(2px)",
                          transition: "transform 100ms",
                          position: "absolute",
                          top: "2px"
                        } })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontWeight: "600", color: "#1d2327" }, children: "Require Login for Quotes" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Root,
                      {
                        checked: settings.general.email_notifications,
                        onCheckedChange: (checked) => updateSetting("general", "email_notifications", checked),
                        style: {
                          width: "42px",
                          height: "24px",
                          background: settings.general.email_notifications ? "#007cba" : "#ddd",
                          borderRadius: "12px",
                          position: "relative",
                          cursor: "pointer",
                          border: "none"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Thumb, { style: {
                          display: "block",
                          width: "20px",
                          height: "20px",
                          background: "white",
                          borderRadius: "10px",
                          transform: settings.general.email_notifications ? "translateX(20px)" : "translateX(2px)",
                          transition: "transform 100ms",
                          position: "absolute",
                          top: "2px"
                        } })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { fontWeight: "600", color: "#1d2327" }, children: "Send Email Notifications" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "200px 1fr", gap: "20px", alignItems: "center" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", marginBottom: "8px", fontWeight: "600", color: "#1d2327" }, children: "Default Link Expiry" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "number",
                          value: settings.general.default_expiry_days,
                          onChange: (e) => updateSetting("general", "default_expiry_days", parseInt(e.target.value) || 30),
                          min: "1",
                          max: "365",
                          style: {
                            width: "80px",
                            padding: "8px 12px",
                            border: "1px solid #8c8f94",
                            borderRadius: "4px",
                            fontSize: "14px"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "14px", color: "#646970" }, children: "days" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "0", fontSize: "12px", color: "#646970" }, children: "How long shared cart and quote links remain valid before expiring" })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { value: "design", style: { padding: "30px", background: "white" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { marginTop: "0", color: "#1d2327", fontSize: "20px" }, children: "Design & Styling" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gap: "32px", maxWidth: "1000px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "0 0 16px 0", color: "#1d2327", fontSize: "16px", fontWeight: "600" }, children: "Preview" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                padding: "24px",
                background: "#f8f9fa",
                borderRadius: "8px",
                border: "1px solid #e1e5e9"
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "0 0 16px 0", color: "#646970", fontSize: "14px" }, children: "This is how your presales buttons will appear on your site:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      style: {
                        background: settings.design.primary_color,
                        color: "white",
                        border: "none",
                        borderRadius: settings.design.button_style === "square" ? "0px" : settings.design.button_style === "pill" ? "50px" : "6px",
                        padding: settings.design.button_size === "small" ? "8px 16px" : settings.design.button_size === "large" ? "16px 32px" : "12px 24px",
                        fontSize: settings.design.button_size === "small" ? "12px" : settings.design.button_size === "large" ? "16px" : "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        fontFamily: getFontFamilyForPreview(settings.design.font_family)
                      },
                      children: "🛒 Share Cart"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      style: {
                        background: settings.design.secondary_color,
                        color: "white",
                        border: "none",
                        borderRadius: settings.design.button_style === "square" ? "0px" : settings.design.button_style === "pill" ? "50px" : "6px",
                        padding: settings.design.button_size === "small" ? "8px 16px" : settings.design.button_size === "large" ? "16px 32px" : "12px 24px",
                        fontSize: settings.design.button_size === "small" ? "12px" : settings.design.button_size === "large" ? "16px" : "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        fontFamily: getFontFamilyForPreview(settings.design.font_family)
                      },
                      children: "💬 Request Quote"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "0 0 16px 0", color: "#1d2327", fontSize: "16px", fontWeight: "600" }, children: "Color Settings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", marginBottom: "8px", fontWeight: "600", color: "#1d2327" }, children: "Primary Color" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px", alignItems: "center" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "color",
                        value: settings.design.primary_color,
                        onChange: (e) => updateSetting("design", "primary_color", e.target.value),
                        style: { width: "50px", height: "36px", border: "none", borderRadius: "4px", cursor: "pointer" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "text",
                        value: settings.design.primary_color,
                        onChange: (e) => updateSetting("design", "primary_color", e.target.value),
                        style: {
                          flex: 1,
                          padding: "8px 12px",
                          border: "1px solid #8c8f94",
                          borderRadius: "4px",
                          fontSize: "14px"
                        }
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", marginBottom: "8px", fontWeight: "600", color: "#1d2327" }, children: "Secondary Color" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px", alignItems: "center" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "color",
                        value: settings.design.secondary_color,
                        onChange: (e) => updateSetting("design", "secondary_color", e.target.value),
                        style: { width: "50px", height: "36px", border: "none", borderRadius: "4px", cursor: "pointer" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "text",
                        value: settings.design.secondary_color,
                        onChange: (e) => updateSetting("design", "secondary_color", e.target.value),
                        style: {
                          flex: 1,
                          padding: "8px 12px",
                          border: "1px solid #8c8f94",
                          borderRadius: "4px",
                          fontSize: "14px"
                        }
                      }
                    )
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "0 0 16px 0", color: "#1d2327", fontSize: "16px", fontWeight: "600" }, children: "Button Settings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", marginBottom: "8px", fontWeight: "600", color: "#1d2327" }, children: "Button Style" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      value: settings.design.button_style,
                      onChange: (e) => updateSetting("design", "button_style", e.target.value),
                      style: {
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #8c8f94",
                        borderRadius: "4px",
                        fontSize: "14px",
                        background: "white"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rounded", children: "Rounded Corners" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "square", children: "Square" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pill", children: "Pill Shape" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", marginBottom: "8px", fontWeight: "600", color: "#1d2327" }, children: "Button Size" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      value: settings.design.button_size,
                      onChange: (e) => updateSetting("design", "button_size", e.target.value),
                      style: {
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #8c8f94",
                        borderRadius: "4px",
                        fontSize: "14px",
                        background: "white"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "small", children: "Small" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "medium", children: "Medium" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "large", children: "Large" })
                      ]
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "0 0 16px 0", color: "#1d2327", fontSize: "16px", fontWeight: "600" }, children: "Typography & Layout" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", marginBottom: "8px", fontWeight: "600", color: "#1d2327" }, children: "Font Family" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      value: settings.design.font_family,
                      onChange: (e) => updateSetting("design", "font_family", e.target.value),
                      style: {
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #8c8f94",
                        borderRadius: "4px",
                        fontSize: "14px",
                        background: "white"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "system", children: "System Default" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "arial", children: "Arial" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "helvetica", children: "Helvetica" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "georgia", children: "Georgia" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "times", children: "Times New Roman" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", marginBottom: "8px", fontWeight: "600", color: "#1d2327" }, children: "Border Radius" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "range",
                        min: "0",
                        max: "25",
                        value: settings.design.border_radius,
                        onChange: (e) => updateSetting("design", "border_radius", parseInt(e.target.value)),
                        style: { flex: 1 }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
                      fontSize: "14px",
                      color: "#646970",
                      minWidth: "40px",
                      textAlign: "right"
                    }, children: [
                      settings.design.border_radius,
                      "px"
                    ] })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "0 0 16px 0", color: "#1d2327", fontSize: "16px", fontWeight: "600" }, children: "Advanced Customization" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", marginBottom: "8px", fontWeight: "600", color: "#1d2327" }, children: "Custom CSS" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    value: settings.design.custom_css,
                    onChange: (e) => updateSetting("design", "custom_css", e.target.value),
                    rows: 6,
                    style: {
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #8c8f94",
                      borderRadius: "4px",
                      fontSize: "13px",
                      fontFamily: "Monaco, Consolas, monospace",
                      resize: "vertical"
                    },
                    placeholder: "/* Add custom CSS here */\n.woo-presales-button {\n  /* Custom button styles */\n}"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "4px 0 0 0", fontSize: "12px", color: "#646970" }, children: "Custom CSS will be applied to all presales components" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { value: "form-fields", style: { padding: "30px", background: "white" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { marginTop: "0", color: "#1d2327", fontSize: "20px" }, children: "Form Field Management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "grid", gap: "32px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "0 0 16px 0", color: "#1d2327" }, children: "Share Cart Form Fields" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gap: "12px" }, children: settings.form_fields.share_form.map((field, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                display: "grid",
                gridTemplateColumns: "1fr 200px 120px 80px 60px",
                gap: "12px",
                alignItems: "center",
                padding: "12px",
                background: "#f9f9f9",
                borderRadius: "4px"
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: field.label,
                    onChange: (e) => updateFormField("share_form", index, { label: e.target.value }),
                    style: {
                      padding: "6px 8px",
                      border: "1px solid #8c8f94",
                      borderRadius: "4px",
                      fontSize: "14px"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: field.type,
                    onChange: (e) => updateFormField("share_form", index, { type: e.target.value }),
                    style: {
                      padding: "6px 8px",
                      border: "1px solid #8c8f94",
                      borderRadius: "4px",
                      fontSize: "14px"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "text", children: "Text" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "email", children: "Email" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "tel", children: "Phone" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "textarea", children: "Textarea" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: field.required,
                      onChange: (e) => updateFormField("share_form", index, { required: e.target.checked }),
                      style: { width: "16px", height: "16px" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "14px" }, children: "Required" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: field.enabled,
                      onChange: (e) => updateFormField("share_form", index, { enabled: e.target.checked }),
                      style: { width: "16px", height: "16px" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "14px" }, children: "Enabled" })
                ] })
              ] }, index)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { margin: "0 0 16px 0", color: "#1d2327" }, children: "Quote Request Form Fields" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gap: "12px" }, children: settings.form_fields.quote_form.map((field, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                display: "grid",
                gridTemplateColumns: "1fr 200px 120px 80px 60px",
                gap: "12px",
                alignItems: "center",
                padding: "12px",
                background: "#f9f9f9",
                borderRadius: "4px"
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: field.label,
                    onChange: (e) => updateFormField("quote_form", index, { label: e.target.value }),
                    style: {
                      padding: "6px 8px",
                      border: "1px solid #8c8f94",
                      borderRadius: "4px",
                      fontSize: "14px"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: field.type,
                    onChange: (e) => updateFormField("quote_form", index, { type: e.target.value }),
                    style: {
                      padding: "6px 8px",
                      border: "1px solid #8c8f94",
                      borderRadius: "4px",
                      fontSize: "14px"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "text", children: "Text" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "email", children: "Email" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "tel", children: "Phone" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "textarea", children: "Textarea" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: field.required,
                      onChange: (e) => updateFormField("quote_form", index, { required: e.target.checked }),
                      style: { width: "16px", height: "16px" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "14px" }, children: "Required" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: field.enabled,
                      onChange: (e) => updateFormField("quote_form", index, { enabled: e.target.checked }),
                      style: { width: "16px", height: "16px" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "14px" }, children: "Enabled" })
                ] })
              ] }, index)) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        position: "sticky",
        bottom: "0",
        background: "white",
        borderTop: "1px solid #ddd",
        padding: "20px",
        textAlign: "right"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: saveSettings,
          disabled: saving,
          style: {
            background: "#007cba",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: saving ? "not-allowed" : "pointer",
            opacity: saving ? 0.7 : 1
          },
          children: saving ? "Saving..." : "Save Settings"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("style", { jsx: true, children: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        [data-state="active"] {
          color: #007cba !important;
          border-bottom-color: #007cba !important;
        }
        
        [data-state="inactive"]:hover {
          color: #0073aa !important;
        }
      ` })
    ] });
  }
  const WCCartShareQuoteElement = s(ShadowApp, {
    shadow: "open",
    props: {
      // REST nonce for API authentication
      restNonce: "string",
      // Page type for different interfaces
      pageType: "string",
      // Shared cart hash for shared cart pages
      cartHash: "string",
      // Quote ID for quote pages
      quoteId: "string",
      // Current URL for redirects
      currentUrl: "string",
      // Pre-loaded cart data (JSON string)
      cartData: "string"
    }
  });
  const WooPresalesSettingsElement = s(SettingsApp, {
    shadow: false,
    // No shadow DOM for admin settings
    props: {
      restNonce: "string"
    }
  });
  customElements.define("wc-cart-share-quote-panel", WCCartShareQuoteElement);
  customElements.define("woo-presales-settings-panel", WooPresalesSettingsElement);
  window.WCCartShareQuote = {
    ShadowApp,
    init: function() {
      console.log("WooCommerce Cart Share & Quote initialized");
      return true;
    },
    openShareModal: function() {
      console.log("Share modal function called - no active instance");
    },
    openQuoteModal: function() {
      console.log("Quote modal function called - no active instance");
    }
  };
})();
