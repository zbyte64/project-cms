/* */ 
"format cjs";
(function(process) {
  !function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(require('react')) : "function" == typeof define && define.amd ? define(["react"], t) : "object" == typeof exports ? exports.JSONSchemaForm = t(require('react')) : e.JSONSchemaForm = t(e.React);
  }(this, function(e) {
    return function(e) {
      function t(n) {
        if (r[n])
          return r[n].exports;
        var a = r[n] = {
          exports: {},
          id: n,
          loaded: !1
        };
        return e[n].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports;
      }
      var r = {};
      return t.m = e, t.c = r, t.p = "/dist/", t(0);
    }([function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      Object.defineProperty(t, "__esModule", {value: !0});
      var a = r(1),
          i = n(a);
      t["default"] = i["default"], e.exports = t["default"];
    }, function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function a(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function i(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
      }
      Object.defineProperty(t, "__esModule", {value: !0});
      var o = function() {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, r, n) {
          return r && e(t.prototype, r), n && e(t, n), t;
        };
      }(),
          s = function(e, t, r) {
            for (var n = !0; n; ) {
              var a = e,
                  i = t,
                  o = r;
              n = !1, null === a && (a = Function.prototype);
              var s = Object.getOwnPropertyDescriptor(a, i);
              if (void 0 !== s) {
                if ("value" in s)
                  return s.value;
                var u = s.get;
                if (void 0 === u)
                  return;
                return u.call(o);
              }
              var l = Object.getPrototypeOf(a);
              if (null === l)
                return;
              e = l, t = i, r = o, n = !0, s = l = void 0;
            }
          },
          u = r(2),
          l = n(u),
          c = r(3),
          f = r(13),
          h = n(f),
          d = r(29),
          m = n(d),
          p = r(14),
          v = r(30),
          y = n(v),
          g = function(e) {
            function t(e) {
              a(this, t), s(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e), this.state = this.getStateFromProps(e);
            }
            return i(t, e), o(t, null, [{
              key: "defaultProps",
              value: {uiSchema: {}},
              enumerable: !0
            }]), o(t, [{
              key: "componentWillReceiveProps",
              value: function(e) {
                this.setState(this.getStateFromProps(e));
              }
            }, {
              key: "getStateFromProps",
              value: function(e) {
                var t = "schema" in e ? e.schema : this.props.schema,
                    r = !!e.formData,
                    n = (0, p.getDefaultFormState)(t, e.formData) || null;
                return {
                  status: "initial",
                  formData: n,
                  edit: r,
                  errors: r ? this.validate(n, t) : []
                };
              }
            }, {
              key: "validate",
              value: function(e, t) {
                var r = new c.Validator;
                return r.validate(e, t || this.props.schema).errors;
              }
            }, {
              key: "renderErrors",
              value: function() {
                var e = this.state,
                    t = e.status,
                    r = e.errors;
                return "editing" !== t && r.length ? l["default"].createElement(y["default"], {errors: r}) : null;
              }
            }, {
              key: "onChange",
              value: function(e) {
                var t = this,
                    r = arguments.length <= 1 || void 0 === arguments[1] ? {validate: !0} : arguments[1];
                this.setState({
                  status: "editing",
                  formData: e,
                  errors: r.validate ? this.validate(e) : this.state.errors
                }, function(e) {
                  t.props.onChange && t.props.onChange(t.state);
                });
              }
            }, {
              key: "onSubmit",
              value: function(e) {
                var t = this;
                e.preventDefault(), this.setState({status: "submitted"});
                var r = this.validate(this.state.formData);
                return Object.keys(r).length > 0 ? void this.setState({errors: r}, function(e) {
                  t.props.onError ? t.props.onError(r) : console.error("Form validation failed", r);
                }) : (this.props.onSubmit && this.props.onSubmit(this.state), void this.setState({status: "initial"}));
              }
            }, {
              key: "getRegistry",
              value: function() {
                return {
                  SchemaField: this.props.SchemaField || h["default"],
                  TitleField: this.props.TitleField || m["default"],
                  widgets: this.props.widgets || {}
                };
              }
            }, {
              key: "render",
              value: function() {
                var e = this.props,
                    t = e.children,
                    r = e.schema,
                    n = e.uiSchema,
                    a = e.widgets,
                    i = this.state.formData,
                    o = this.getRegistry(),
                    s = o.SchemaField;
                return l["default"].createElement("form", {
                  className: "rjsf",
                  onSubmit: this.onSubmit.bind(this)
                }, this.renderErrors(), l["default"].createElement(s, {
                  schema: r,
                  uiSchema: n,
                  formData: i,
                  widgets: a,
                  onChange: this.onChange.bind(this),
                  registry: o
                }), t ? t : l["default"].createElement("p", null, l["default"].createElement("button", {type: "submit"}, "Submit")));
              }
            }]), t;
          }(u.Component);
      t["default"] = g, t["default"] = g, e.exports = t["default"];
    }, function(t, r) {
      t.exports = e;
    }, function(e, t, r) {
      "use strict";
      var n = e.exports.Validator = r(4);
      e.exports.ValidatorResult = r(12).ValidatorResult, e.exports.ValidationError = r(12).ValidationError, e.exports.SchemaError = r(12).SchemaError, e.exports.validate = function(e, t, r) {
        var a = new n;
        return a.validate(e, t, r);
      };
    }, function(e, t, r) {
      "use strict";
      var n = r(5),
          a = r(11),
          i = r(12),
          o = i.ValidatorResult,
          s = i.SchemaError,
          u = i.SchemaContext,
          l = function() {
            this.schemas = {}, this.unresolvedRefs = [], this.types = Object.create(c), this.attributes = Object.create(a.validators);
          };
      l.prototype.schemas = null, l.prototype.types = null, l.prototype.attributes = null, l.prototype.unresolvedRefs = null, l.prototype.addSchema = function(e, t) {
        if (!e)
          return null;
        var r = t || e.id;
        return this.addSubSchema(r, e), r && (this.schemas[r] = e), this.schemas[r];
      }, l.prototype.addSubSchema = function(e, t) {
        if (t && "object" == typeof t) {
          if (t.$ref) {
            var r = n.resolve(e, t.$ref);
            return void(void 0 === this.schemas[r] && (this.schemas[r] = null, this.unresolvedRefs.push(r)));
          }
          var a = t.id && n.resolve(e, t.id),
              o = a || e;
          if (a) {
            if (this.schemas[a]) {
              if (!i.deepCompareStrict(this.schemas[a], t))
                throw new Error("Schema <" + t + "> already exists with different definition");
              return this.schemas[a];
            }
            this.schemas[a] = t;
            var s = a.replace(/^([^#]*)#$/, "$1");
            this.schemas[s] = t;
          }
          return this.addSubSchemaArray(o, t.items instanceof Array ? t.items : [t.items]), this.addSubSchemaArray(o, t["extends"] instanceof Array ? t["extends"] : [t["extends"]]), this.addSubSchema(o, t.additionalItems), this.addSubSchemaObject(o, t.properties), this.addSubSchema(o, t.additionalProperties), this.addSubSchemaObject(o, t.definitions), this.addSubSchemaObject(o, t.patternProperties), this.addSubSchemaObject(o, t.dependencies), this.addSubSchemaArray(o, t.disallow), this.addSubSchemaArray(o, t.allOf), this.addSubSchemaArray(o, t.anyOf), this.addSubSchemaArray(o, t.oneOf), this.addSubSchema(o, t.not), this.schemas[a];
        }
      }, l.prototype.addSubSchemaArray = function(e, t) {
        if (t instanceof Array)
          for (var r = 0; r < t.length; r++)
            this.addSubSchema(e, t[r]);
      }, l.prototype.addSubSchemaObject = function(e, t) {
        if (t && "object" == typeof t)
          for (var r in t)
            this.addSubSchema(e, t[r]);
      }, l.prototype.setSchemas = function(e) {
        this.schemas = e;
      }, l.prototype.getSchema = function(e) {
        return this.schemas[e];
      }, l.prototype.validate = function(e, t, r, a) {
        r || (r = {});
        var i = r.propertyName || "instance",
            o = n.resolve(r.base || "/", t.id || "");
        if (a || (a = new u(t, r, i, o, Object.create(this.schemas)), a.schemas[o] || (a.schemas[o] = t)), t) {
          var l = this.validateSchema(e, t, r, a);
          if (!l)
            throw new Error("Result undefined");
          return l;
        }
        throw new s("no schema specified", t);
      }, l.prototype.validateSchema = function(e, t, r, n) {
        function l(e) {
          var t = "string" == typeof e ? e : e.$ref;
          return "string" == typeof t ? t : !1;
        }
        function c(e, t) {
          var r;
          return (r = l(e)) ? f.resolve(e, r, t).subschema : e;
        }
        var f = this,
            h = new o(e, t, r, n);
        if (!t)
          throw new Error("schema is undefined");
        t["extends"] && (t["extends"] instanceof Array ? t["extends"].forEach(function(e) {
          t = i.deepMerge(t, c(e, n));
        }) : t = i.deepMerge(t, c(t["extends"], n)));
        var d;
        if (d = l(t)) {
          var m = this.resolve(t, d, n),
              p = new u(m.subschema, r, n.propertyPath, m.switchSchema, n.schemas);
          return this.validateSchema(e, m.subschema, r, p);
        }
        var v = r && r.skipAttributes || [];
        for (var y in t)
          if (!a.ignoreProperties[y] && v.indexOf(y) < 0) {
            var g = null,
                b = f.attributes[y];
            if (b)
              g = b.call(f, e, t, r, n);
            else if (r.allowUnknownAttributes === !1)
              throw new s("Unsupported attribute: " + y, t);
            g && h.importErrors(g);
          }
        if ("function" == typeof r.rewrite) {
          var w = r.rewrite.call(this, e, t, r, n);
          h.instance = w;
        }
        return h;
      }, l.prototype.resolve = function(e, t, r) {
        if (t = r.resolve(t), r.schemas[t])
          return {
            subschema: r.schemas[t],
            switchSchema: t
          };
        var a = n.parse(t),
            o = a && a.hash,
            u = o && o.length && t.substr(0, t.length - o.length);
        if (!u || !r.schemas[u])
          throw new s("no such schema <" + t + ">", e);
        var l = i.objectGetPath(r.schemas[u], o.substr(1));
        if (void 0 === l)
          throw new s("no such schema " + o + " located in <" + u + ">", e);
        return {
          subschema: l,
          switchSchema: t
        };
      }, l.prototype.testType = function(e, t, r, n, a) {
        if ("function" == typeof this.types[a])
          return this.types[a].call(this, e);
        if (a && "object" == typeof a) {
          var i = this.validateSchema(e, a, r, n);
          return void 0 === i || !(i && i.errors.length);
        }
        return !0;
      };
      var c = l.prototype.types = {};
      c.string = function(e) {
        return "string" == typeof e;
      }, c.number = function(e) {
        return "number" == typeof e;
      }, c.integer = function(e) {
        return "number" == typeof e && e % 1 === 0;
      }, c["boolean"] = function(e) {
        return "boolean" == typeof e;
      }, c.number = function(e) {
        return "number" == typeof e;
      }, c.array = function(e) {
        return e instanceof Array;
      }, c["null"] = function(e) {
        return null === e;
      }, c.date = function(e) {
        return e instanceof Date;
      }, c.any = function(e) {
        return !0;
      }, c.object = function(e) {
        return e && "object" == typeof e && !(e instanceof Array) && !(e instanceof Date);
      }, e.exports = l;
    }, function(e, t, r) {
      "use strict";
      function n() {
        this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
      }
      function a(e, t, r) {
        if (e && l(e) && e instanceof n)
          return e;
        var a = new n;
        return a.parse(e, t, r), a;
      }
      function i(e) {
        return u(e) && (e = a(e)), e instanceof n ? e.format() : n.prototype.format.call(e);
      }
      function o(e, t) {
        return a(e, !1, !0).resolve(t);
      }
      function s(e, t) {
        return e ? a(e, !1, !0).resolveObject(t) : t;
      }
      function u(e) {
        return "string" == typeof e;
      }
      function l(e) {
        return "object" == typeof e && null !== e;
      }
      function c(e) {
        return null === e;
      }
      function f(e) {
        return null == e;
      }
      var h = r(6);
      t.parse = a, t.resolve = o, t.resolveObject = s, t.format = i, t.Url = n;
      var d = /^([a-z0-9.+-]+:)/i,
          m = /:[0-9]*$/,
          p = ["<", ">", '"', "`", " ", "\r", "\n", "	"],
          v = ["{", "}", "|", "\\", "^", "`"].concat(p),
          y = ["'"].concat(v),
          g = ["%", "/", "?", ";", "#"].concat(y),
          b = ["/", "?", "#"],
          w = 255,
          O = /^[a-z0-9A-Z_-]{0,63}$/,
          S = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
          E = {
            javascript: !0,
            "javascript:": !0
          },
          j = {
            javascript: !0,
            "javascript:": !0
          },
          x = {
            http: !0,
            https: !0,
            ftp: !0,
            gopher: !0,
            file: !0,
            "http:": !0,
            "https:": !0,
            "ftp:": !0,
            "gopher:": !0,
            "file:": !0
          },
          A = r(8);
      n.prototype.parse = function(e, t, r) {
        if (!u(e))
          throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
        var n = e;
        n = n.trim();
        var a = d.exec(n);
        if (a) {
          a = a[0];
          var i = a.toLowerCase();
          this.protocol = i, n = n.substr(a.length);
        }
        if (r || a || n.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var o = "//" === n.substr(0, 2);
          !o || a && j[a] || (n = n.substr(2), this.slashes = !0);
        }
        if (!j[a] && (o || a && !x[a])) {
          for (var s = -1,
              l = 0; l < b.length; l++) {
            var c = n.indexOf(b[l]);
            -1 !== c && (-1 === s || s > c) && (s = c);
          }
          var f,
              m;
          m = -1 === s ? n.lastIndexOf("@") : n.lastIndexOf("@", s), -1 !== m && (f = n.slice(0, m), n = n.slice(m + 1), this.auth = decodeURIComponent(f)), s = -1;
          for (var l = 0; l < g.length; l++) {
            var c = n.indexOf(g[l]);
            -1 !== c && (-1 === s || s > c) && (s = c);
          }
          -1 === s && (s = n.length), this.host = n.slice(0, s), n = n.slice(s), this.parseHost(), this.hostname = this.hostname || "";
          var p = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
          if (!p)
            for (var v = this.hostname.split(/\./),
                l = 0,
                P = v.length; P > l; l++) {
              var _ = v[l];
              if (_ && !_.match(O)) {
                for (var C = "",
                    k = 0,
                    q = _.length; q > k; k++)
                  C += _.charCodeAt(k) > 127 ? "x" : _[k];
                if (!C.match(O)) {
                  var F = v.slice(0, l),
                      M = v.slice(l + 1),
                      I = _.match(S);
                  I && (F.push(I[1]), M.unshift(I[2])), M.length && (n = "/" + M.join(".") + n), this.hostname = F.join(".");
                  break;
                }
              }
            }
          if (this.hostname.length > w ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), !p) {
            for (var N = this.hostname.split("."),
                R = [],
                l = 0; l < N.length; ++l) {
              var $ = N[l];
              R.push($.match(/[^A-Za-z0-9_-]/) ? "xn--" + h.encode($) : $);
            }
            this.hostname = R.join(".");
          }
          var V = this.port ? ":" + this.port : "",
              z = this.hostname || "";
          this.host = z + V, this.href += this.host, p && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== n[0] && (n = "/" + n));
        }
        if (!E[i])
          for (var l = 0,
              P = y.length; P > l; l++) {
            var D = y[l],
                Z = encodeURIComponent(D);
            Z === D && (Z = escape(D)), n = n.split(D).join(Z);
          }
        var L = n.indexOf("#");
        -1 !== L && (this.hash = n.substr(L), n = n.slice(0, L));
        var T = n.indexOf("?");
        if (-1 !== T ? (this.search = n.substr(T), this.query = n.substr(T + 1), t && (this.query = A.parse(this.query)), n = n.slice(0, T)) : t && (this.search = "", this.query = {}), n && (this.pathname = n), x[i] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
          var V = this.pathname || "",
              $ = this.search || "";
          this.path = V + $;
        }
        return this.href = this.format(), this;
      }, n.prototype.format = function() {
        var e = this.auth || "";
        e && (e = encodeURIComponent(e), e = e.replace(/%3A/i, ":"), e += "@");
        var t = this.protocol || "",
            r = this.pathname || "",
            n = this.hash || "",
            a = !1,
            i = "";
        this.host ? a = e + this.host : this.hostname && (a = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (a += ":" + this.port)), this.query && l(this.query) && Object.keys(this.query).length && (i = A.stringify(this.query));
        var o = this.search || i && "?" + i || "";
        return t && ":" !== t.substr(-1) && (t += ":"), this.slashes || (!t || x[t]) && a !== !1 ? (a = "//" + (a || ""), r && "/" !== r.charAt(0) && (r = "/" + r)) : a || (a = ""), n && "#" !== n.charAt(0) && (n = "#" + n), o && "?" !== o.charAt(0) && (o = "?" + o), r = r.replace(/[?#]/g, function(e) {
          return encodeURIComponent(e);
        }), o = o.replace("#", "%23"), t + a + r + o + n;
      }, n.prototype.resolve = function(e) {
        return this.resolveObject(a(e, !1, !0)).format();
      }, n.prototype.resolveObject = function(e) {
        if (u(e)) {
          var t = new n;
          t.parse(e, !1, !0), e = t;
        }
        var r = new n;
        if (Object.keys(this).forEach(function(e) {
          r[e] = this[e];
        }, this), r.hash = e.hash, "" === e.href)
          return r.href = r.format(), r;
        if (e.slashes && !e.protocol)
          return Object.keys(e).forEach(function(t) {
            "protocol" !== t && (r[t] = e[t]);
          }), x[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r;
        if (e.protocol && e.protocol !== r.protocol) {
          if (!x[e.protocol])
            return Object.keys(e).forEach(function(t) {
              r[t] = e[t];
            }), r.href = r.format(), r;
          if (r.protocol = e.protocol, e.host || j[e.protocol])
            r.pathname = e.pathname;
          else {
            for (var a = (e.pathname || "").split("/"); a.length && !(e.host = a.shift()); )
              ;
            e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== a[0] && a.unshift(""), a.length < 2 && a.unshift(""), r.pathname = a.join("/");
          }
          if (r.search = e.search, r.query = e.query, r.host = e.host || "", r.auth = e.auth, r.hostname = e.hostname || e.host, r.port = e.port, r.pathname || r.search) {
            var i = r.pathname || "",
                o = r.search || "";
            r.path = i + o;
          }
          return r.slashes = r.slashes || e.slashes, r.href = r.format(), r;
        }
        var s = r.pathname && "/" === r.pathname.charAt(0),
            l = e.host || e.pathname && "/" === e.pathname.charAt(0),
            h = l || s || r.host && e.pathname,
            d = h,
            m = r.pathname && r.pathname.split("/") || [],
            a = e.pathname && e.pathname.split("/") || [],
            p = r.protocol && !x[r.protocol];
        if (p && (r.hostname = "", r.port = null, r.host && ("" === m[0] ? m[0] = r.host : m.unshift(r.host)), r.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === a[0] ? a[0] = e.host : a.unshift(e.host)), e.host = null), h = h && ("" === a[0] || "" === m[0])), l)
          r.host = e.host || "" === e.host ? e.host : r.host, r.hostname = e.hostname || "" === e.hostname ? e.hostname : r.hostname, r.search = e.search, r.query = e.query, m = a;
        else if (a.length)
          m || (m = []), m.pop(), m = m.concat(a), r.search = e.search, r.query = e.query;
        else if (!f(e.search)) {
          if (p) {
            r.hostname = r.host = m.shift();
            var v = r.host && r.host.indexOf("@") > 0 ? r.host.split("@") : !1;
            v && (r.auth = v.shift(), r.host = r.hostname = v.shift());
          }
          return r.search = e.search, r.query = e.query, c(r.pathname) && c(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r;
        }
        if (!m.length)
          return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, r.href = r.format(), r;
        for (var y = m.slice(-1)[0],
            g = (r.host || e.host) && ("." === y || ".." === y) || "" === y,
            b = 0,
            w = m.length; w >= 0; w--)
          y = m[w], "." == y ? m.splice(w, 1) : ".." === y ? (m.splice(w, 1), b++) : b && (m.splice(w, 1), b--);
        if (!h && !d)
          for (; b--; b)
            m.unshift("..");
        !h || "" === m[0] || m[0] && "/" === m[0].charAt(0) || m.unshift(""), g && "/" !== m.join("/").substr(-1) && m.push("");
        var O = "" === m[0] || m[0] && "/" === m[0].charAt(0);
        if (p) {
          r.hostname = r.host = O ? "" : m.length ? m.shift() : "";
          var v = r.host && r.host.indexOf("@") > 0 ? r.host.split("@") : !1;
          v && (r.auth = v.shift(), r.host = r.hostname = v.shift());
        }
        return h = h || r.host && m.length, h && !O && m.unshift(""), m.length ? r.pathname = m.join("/") : (r.pathname = null, r.path = null), c(r.pathname) && c(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.auth = e.auth || r.auth, r.slashes = r.slashes || e.slashes, r.href = r.format(), r;
      }, n.prototype.parseHost = function() {
        var e = this.host,
            t = m.exec(e);
        t && (t = t[0], ":" !== t && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
      };
    }, function(e, t, r) {
      var n;
      (function(e, a) {
        "use strict";
        !function(i) {
          function o(e) {
            throw RangeError(F[e]);
          }
          function s(e, t) {
            for (var r = e.length,
                n = []; r--; )
              n[r] = t(e[r]);
            return n;
          }
          function u(e, t) {
            var r = e.split("@"),
                n = "";
            r.length > 1 && (n = r[0] + "@", e = r[1]), e = e.replace(q, ".");
            var a = e.split("."),
                i = s(a, t).join(".");
            return n + i;
          }
          function l(e) {
            for (var t,
                r,
                n = [],
                a = 0,
                i = e.length; i > a; )
              t = e.charCodeAt(a++), t >= 55296 && 56319 >= t && i > a ? (r = e.charCodeAt(a++), 56320 == (64512 & r) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), a--)) : n.push(t);
            return n;
          }
          function c(e) {
            return s(e, function(e) {
              var t = "";
              return e > 65535 && (e -= 65536, t += N(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t += N(e);
            }).join("");
          }
          function f(e) {
            return 10 > e - 48 ? e - 22 : 26 > e - 65 ? e - 65 : 26 > e - 97 ? e - 97 : O;
          }
          function h(e, t) {
            return e + 22 + 75 * (26 > e) - ((0 != t) << 5);
          }
          function d(e, t, r) {
            var n = 0;
            for (e = r ? I(e / x) : e >> 1, e += I(e / t); e > M * E >> 1; n += O)
              e = I(e / M);
            return I(n + (M + 1) * e / (e + j));
          }
          function m(e) {
            var t,
                r,
                n,
                a,
                i,
                s,
                u,
                l,
                h,
                m,
                p = [],
                v = e.length,
                y = 0,
                g = P,
                b = A;
            for (r = e.lastIndexOf(_), 0 > r && (r = 0), n = 0; r > n; ++n)
              e.charCodeAt(n) >= 128 && o("not-basic"), p.push(e.charCodeAt(n));
            for (a = r > 0 ? r + 1 : 0; v > a; ) {
              for (i = y, s = 1, u = O; a >= v && o("invalid-input"), l = f(e.charCodeAt(a++)), (l >= O || l > I((w - y) / s)) && o("overflow"), y += l * s, h = b >= u ? S : u >= b + E ? E : u - b, !(h > l); u += O)
                m = O - h, s > I(w / m) && o("overflow"), s *= m;
              t = p.length + 1, b = d(y - i, t, 0 == i), I(y / t) > w - g && o("overflow"), g += I(y / t), y %= t, p.splice(y++, 0, g);
            }
            return c(p);
          }
          function p(e) {
            var t,
                r,
                n,
                a,
                i,
                s,
                u,
                c,
                f,
                m,
                p,
                v,
                y,
                g,
                b,
                j = [];
            for (e = l(e), v = e.length, t = P, r = 0, i = A, s = 0; v > s; ++s)
              p = e[s], 128 > p && j.push(N(p));
            for (n = a = j.length, a && j.push(_); v > n; ) {
              for (u = w, s = 0; v > s; ++s)
                p = e[s], p >= t && u > p && (u = p);
              for (y = n + 1, u - t > I((w - r) / y) && o("overflow"), r += (u - t) * y, t = u, s = 0; v > s; ++s)
                if (p = e[s], t > p && ++r > w && o("overflow"), p == t) {
                  for (c = r, f = O; m = i >= f ? S : f >= i + E ? E : f - i, !(m > c); f += O)
                    b = c - m, g = O - m, j.push(N(h(m + b % g, 0))), c = I(b / g);
                  j.push(N(h(c, 0))), i = d(r, y, n == a), r = 0, ++n;
                }
              ++r, ++t;
            }
            return j.join("");
          }
          function v(e) {
            return u(e, function(e) {
              return C.test(e) ? m(e.slice(4).toLowerCase()) : e;
            });
          }
          function y(e) {
            return u(e, function(e) {
              return k.test(e) ? "xn--" + p(e) : e;
            });
          }
          var g = ("object" == typeof t && t && !t.nodeType && t, "object" == typeof e && e && !e.nodeType && e, "object" == typeof a && a);
          (g.global === g || g.window === g || g.self === g) && (i = g);
          var b,
              w = 2147483647,
              O = 36,
              S = 1,
              E = 26,
              j = 38,
              x = 700,
              A = 72,
              P = 128,
              _ = "-",
              C = /^xn--/,
              k = /[^\x20-\x7E]/,
              q = /[\x2E\u3002\uFF0E\uFF61]/g,
              F = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input"
              },
              M = O - S,
              I = Math.floor,
              N = String.fromCharCode;
          b = {
            version: "1.3.2",
            ucs2: {
              decode: l,
              encode: c
            },
            decode: m,
            encode: p,
            toASCII: y,
            toUnicode: v
          }, n = function() {
            return b;
          }.call(t, r, t, e), !(void 0 !== n && (e.exports = n));
        }(void 0);
      }).call(t, r(7)(e), function() {
        return this;
      }());
    }, function(e, t) {
      "use strict";
      e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children = [], e.webpackPolyfill = 1), e;
      };
    }, function(e, t, r) {
      "use strict";
      t.decode = t.parse = r(9), t.encode = t.stringify = r(10);
    }, function(e, t) {
      "use strict";
      function r(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }
      e.exports = function(e, t, n, a) {
        t = t || "&", n = n || "=";
        var i = {};
        if ("string" != typeof e || 0 === e.length)
          return i;
        var o = /\+/g;
        e = e.split(t);
        var s = 1e3;
        a && "number" == typeof a.maxKeys && (s = a.maxKeys);
        var u = e.length;
        s > 0 && u > s && (u = s);
        for (var l = 0; u > l; ++l) {
          var c,
              f,
              h,
              d,
              m = e[l].replace(o, "%20"),
              p = m.indexOf(n);
          p >= 0 ? (c = m.substr(0, p), f = m.substr(p + 1)) : (c = m, f = ""), h = decodeURIComponent(c), d = decodeURIComponent(f), r(i, h) ? Array.isArray(i[h]) ? i[h].push(d) : i[h] = [i[h], d] : i[h] = d;
        }
        return i;
      };
    }, function(e, t) {
      "use strict";
      var r = function(e) {
        switch (typeof e) {
          case "string":
            return e;
          case "boolean":
            return e ? "true" : "false";
          case "number":
            return isFinite(e) ? e : "";
          default:
            return "";
        }
      };
      e.exports = function(e, t, n, a) {
        return t = t || "&", n = n || "=", null === e && (e = void 0), "object" == typeof e ? Object.keys(e).map(function(a) {
          var i = encodeURIComponent(r(a)) + n;
          return Array.isArray(e[a]) ? e[a].map(function(e) {
            return i + encodeURIComponent(r(e));
          }).join(t) : i + encodeURIComponent(r(e[a]));
        }).join(t) : a ? encodeURIComponent(r(a)) + n + encodeURIComponent(r(e)) : "";
      };
    }, function(e, t, r) {
      "use strict";
      function n(e, t, r, n) {
        return this.validateSchema(e, n, t, r).valid;
      }
      function a(e, t, r, n, a, i) {
        if (!t.properties || void 0 === t.properties[a])
          if (t.additionalProperties === !1)
            i.addError({
              name: "additionalProperties",
              argument: a,
              message: "additionalProperty " + JSON.stringify(a) + " exists in instance when not allowed"
            });
          else {
            var o = t.additionalProperties || {},
                s = this.validateSchema(e[a], o, r, n.makeChild(o, a));
            s.instance !== i.instance[a] && (i.instance[a] = s.instance), i.importErrors(s);
          }
      }
      function i(e, t, r) {
        var n,
            a = r.length;
        for (n = t + 1, a; a > n; n++)
          if (o.deepCompareStrict(e, r[n]))
            return !1;
        return !0;
      }
      var o = r(12),
          s = o.ValidatorResult,
          u = o.SchemaError,
          l = {};
      l.ignoreProperties = {
        id: !0,
        "default": !0,
        description: !0,
        title: !0,
        exclusiveMinimum: !0,
        exclusiveMaximum: !0,
        additionalItems: !0,
        $schema: !0,
        $ref: !0,
        "extends": !0
      };
      var c = l.validators = {};
      c.type = function(e, t, r, n) {
        if (void 0 === e)
          return null;
        var a = new s(e, t, r, n),
            i = t.type instanceof Array ? t.type : [t.type];
        if (!i.some(this.testType.bind(this, e, t, r, n))) {
          var o = i.map(function(e) {
            return e.id && "<" + e.id + ">" || e + "";
          });
          a.addError({
            name: "type",
            argument: o,
            message: "is not of a type(s) " + o
          });
        }
        return a;
      }, c.anyOf = function(e, t, r, a) {
        if (void 0 === e)
          return null;
        var i = new s(e, t, r, a);
        if (!(t.anyOf instanceof Array))
          throw new u("anyOf must be an array");
        if (!t.anyOf.some(n.bind(this, e, r, a))) {
          var o = t.anyOf.map(function(e, t) {
            return e.id && "<" + e.id + ">" || e.title && JSON.stringify(e.title) || e.$ref && "<" + e.$ref + ">" || "[subschema " + t + "]";
          });
          i.addError({
            name: "anyOf",
            argument: o,
            message: "is not any of " + o.join(",")
          });
        }
        return i;
      }, c.allOf = function(e, t, r, n) {
        if (void 0 === e)
          return null;
        if (!(t.allOf instanceof Array))
          throw new u("allOf must be an array");
        var a = new s(e, t, r, n),
            i = this;
        return t.allOf.forEach(function(t, o) {
          var s = i.validateSchema(e, t, r, n);
          if (!s.valid) {
            var u = t.id && "<" + t.id + ">" || t.title && JSON.stringify(t.title) || t.$ref && "<" + t.$ref + ">" || "[subschema " + o + "]";
            a.addError({
              name: "allOf",
              argument: {
                id: u,
                length: s.errors.length,
                valid: s
              },
              message: "does not match allOf schema " + u + " with " + s.errors.length + " error[s]:"
            }), a.importErrors(s);
          }
        }), a;
      }, c.oneOf = function(e, t, r, a) {
        if (void 0 === e)
          return null;
        if (!(t.oneOf instanceof Array))
          throw new u("oneOf must be an array");
        var i = new s(e, t, r, a),
            o = t.oneOf.filter(n.bind(this, e, r, a)).length,
            l = t.oneOf.map(function(e, t) {
              return e.id && "<" + e.id + ">" || e.title && JSON.stringify(e.title) || e.$ref && "<" + e.$ref + ">" || "[subschema " + t + "]";
            });
        return 1 !== o && i.addError({
          name: "oneOf",
          argument: l,
          message: "is not exactly one from " + l.join(",")
        }), i;
      }, c.properties = function(e, t, r, n) {
        if (void 0 !== e && e instanceof Object) {
          var a = new s(e, t, r, n),
              i = t.properties || {};
          for (var o in i) {
            var u = (e || void 0) && e[o],
                l = this.validateSchema(u, i[o], r, n.makeChild(i[o], o));
            l.instance !== a.instance[o] && (a.instance[o] = l.instance), a.importErrors(l);
          }
          return a;
        }
      }, c.patternProperties = function(e, t, r, n) {
        if (void 0 !== e && this.types.object(e)) {
          var i = new s(e, t, r, n),
              o = t.patternProperties || {};
          for (var u in e) {
            var l = !0;
            for (var c in o) {
              var f = new RegExp(c);
              if (f.test(u)) {
                l = !1;
                var h = this.validateSchema(e[u], o[c], r, n.makeChild(o[c], u));
                h.instance !== i.instance[u] && (i.instance[u] = h.instance), i.importErrors(h);
              }
            }
            l && a.call(this, e, t, r, n, u, i);
          }
          return i;
        }
      }, c.additionalProperties = function(e, t, r, n) {
        if (void 0 !== e && this.types.object(e)) {
          if (t.patternProperties)
            return null;
          var i = new s(e, t, r, n);
          for (var o in e)
            a.call(this, e, t, r, n, o, i);
          return i;
        }
      }, c.minProperties = function(e, t, r, n) {
        if (!e || "object" != typeof e)
          return null;
        var a = new s(e, t, r, n),
            i = Object.keys(e);
        return i.length >= t.minProperties || a.addError({
          name: "minProperties",
          argument: t.minProperties,
          message: "does not meet minimum property length of " + t.minProperties
        }), a;
      }, c.maxProperties = function(e, t, r, n) {
        if (!e || "object" != typeof e)
          return null;
        var a = new s(e, t, r, n),
            i = Object.keys(e);
        return i.length <= t.maxProperties || a.addError({
          name: "maxProperties",
          argument: t.maxProperties,
          message: "does not meet maximum property length of " + t.maxProperties
        }), a;
      }, c.items = function(e, t, r, n) {
        if (!(e instanceof Array))
          return null;
        var a = this,
            i = new s(e, t, r, n);
        return void 0 !== e && t.items ? (e.every(function(e, o) {
          var s = t.items instanceof Array ? t.items[o] || t.additionalItems : t.items;
          if (void 0 === s)
            return !0;
          if (s === !1)
            return i.addError({
              name: "items",
              message: "additionalItems not permitted"
            }), !1;
          var u = a.validateSchema(e, s, r, n.makeChild(s, o));
          return u.instance !== i.instance[o] && (i.instance[o] = u.instance), i.importErrors(u), !0;
        }), i) : i;
      }, c.minimum = function(e, t, r, n) {
        if ("number" != typeof e)
          return null;
        var a = new s(e, t, r, n),
            i = !0;
        return i = t.exclusiveMinimum && t.exclusiveMinimum === !0 ? e > t.minimum : e >= t.minimum, i || a.addError({
          name: "minimum",
          argument: t.minimum,
          message: "must have a minimum value of " + t.minimum
        }), a;
      }, c.maximum = function(e, t, r, n) {
        if ("number" != typeof e)
          return null;
        var a,
            i = new s(e, t, r, n);
        return a = t.exclusiveMaximum && t.exclusiveMaximum === !0 ? e < t.maximum : e <= t.maximum, a || i.addError({
          name: "maximum",
          argument: t.maximum,
          message: "must have a maximum value of " + t.maximum
        }), i;
      }, c.divisibleBy = function(e, t, r, n) {
        if ("number" != typeof e)
          return null;
        if (0 == t.divisibleBy)
          throw new u("divisibleBy cannot be zero");
        var a = new s(e, t, r, n);
        return e / t.divisibleBy % 1 && a.addError({
          name: "divisibleBy",
          argument: t.divisibleBy,
          message: "is not divisible by (multiple of) " + JSON.stringify(t.divisibleBy)
        }), a;
      }, c.multipleOf = function(e, t, r, n) {
        if ("number" != typeof e)
          return null;
        if (0 == t.multipleOf)
          throw new u("multipleOf cannot be zero");
        var a = new s(e, t, r, n);
        return e / t.multipleOf % 1 && a.addError({
          name: "multipleOf",
          argument: t.multipleOf,
          message: "is not a multiple of (divisible by) " + JSON.stringify(t.multipleOf)
        }), a;
      }, c.required = function(e, t, r, n) {
        var a = new s(e, t, r, n);
        return void 0 === e && t.required === !0 ? a.addError({
          name: "required",
          message: "is required"
        }) : e && "object" == typeof e && Array.isArray(t.required) && t.required.forEach(function(t) {
          void 0 === e[t] && a.addError({
            name: "required",
            argument: t,
            message: "requires property " + JSON.stringify(t)
          });
        }), a;
      }, c.pattern = function(e, t, r, n) {
        if ("string" != typeof e)
          return null;
        var a = new s(e, t, r, n);
        return e.match(t.pattern) || a.addError({
          name: "pattern",
          argument: t.pattern,
          message: "does not match pattern " + JSON.stringify(t.pattern)
        }), a;
      }, c.format = function(e, t, r, n) {
        if ("string" != typeof e)
          return null;
        var a = new s(e, t, r, n);
        return o.isFormat(e, t.format) || a.addError({
          name: "format",
          argument: t.format,
          message: "does not conform to the " + JSON.stringify(t.format) + " format"
        }), a;
      }, c.minLength = function(e, t, r, n) {
        if ("string" != typeof e)
          return null;
        var a = new s(e, t, r, n);
        return e.length >= t.minLength || a.addError({
          name: "minLength",
          argument: t.minLength,
          message: "does not meet minimum length of " + t.minLength
        }), a;
      }, c.maxLength = function(e, t, r, n) {
        if ("string" != typeof e)
          return null;
        var a = new s(e, t, r, n);
        return e.length <= t.maxLength || a.addError({
          name: "maxLength",
          argument: t.maxLength,
          message: "does not meet maximum length of " + t.maxLength
        }), a;
      }, c.minItems = function(e, t, r, n) {
        if (!(e instanceof Array))
          return null;
        var a = new s(e, t, r, n);
        return e.length >= t.minItems || a.addError({
          name: "minItems",
          argument: t.minItems,
          message: "does not meet minimum length of " + t.minItems
        }), a;
      }, c.maxItems = function(e, t, r, n) {
        if (!(e instanceof Array))
          return null;
        var a = new s(e, t, r, n);
        return e.length <= t.maxItems || a.addError({
          name: "maxItems",
          argument: t.maxItems,
          message: "does not meet maximum length of " + t.maxItems
        }), a;
      }, c.uniqueItems = function(e, t, r, n) {
        function a(e, t, r) {
          for (var n = t + 1; n < r.length; n++)
            if (o.deepCompareStrict(e, r[n]))
              return !1;
          return !0;
        }
        var i = new s(e, t, r, n);
        return e instanceof Array ? (e.every(a) || i.addError({
          name: "uniqueItems",
          message: "contains duplicate item"
        }), i) : i;
      }, c.uniqueItems = function(e, t, r, n) {
        if (!(e instanceof Array))
          return null;
        var a = new s(e, t, r, n);
        return e.every(i) || a.addError({
          name: "uniqueItems",
          message: "contains duplicate item"
        }), a;
      }, c.dependencies = function(e, t, r, n) {
        if (!e || "object" != typeof e)
          return null;
        var a = new s(e, t, r, n);
        for (var i in t.dependencies)
          if (void 0 !== e[i]) {
            var o = t.dependencies[i],
                u = n.makeChild(o, i);
            if ("string" == typeof o && (o = [o]), o instanceof Array)
              o.forEach(function(t) {
                void 0 === e[t] && a.addError({
                  name: "dependencies",
                  argument: u.propertyPath,
                  message: "property " + t + " not found, required by " + u.propertyPath
                });
              });
            else {
              var l = this.validateSchema(e, o, r, u);
              a.instance !== l.instance && (a.instance = l.instance), l && l.errors.length && (a.addError({
                name: "dependencies",
                argument: u.propertyPath,
                message: "does not meet dependency required by " + u.propertyPath
              }), a.importErrors(l));
            }
          }
        return a;
      }, c["enum"] = function(e, t, r, n) {
        if (!(t["enum"] instanceof Array))
          throw new u("enum expects an array", t);
        if (void 0 === e)
          return null;
        var a = new s(e, t, r, n);
        return t["enum"].some(o.deepCompareStrict.bind(null, e)) || a.addError({
          name: "enum",
          argument: t["enum"],
          message: "is not one of enum values: " + t["enum"].join(",")
        }), a;
      }, c.not = c.disallow = function(e, t, r, n) {
        var a = this;
        if (void 0 === e)
          return null;
        var i = new s(e, t, r, n),
            o = t.not || t.disallow;
        return o ? (o instanceof Array || (o = [o]), o.forEach(function(o) {
          if (a.testType(e, t, r, n, o)) {
            var s = o && o.id && "<" + o.id + ">" || o;
            i.addError({
              name: "not",
              argument: s,
              message: "is of prohibited type " + s
            });
          }
        }), i) : null;
      }, e.exports = l;
    }, function(e, t, r) {
      "use strict";
      var n = r(5),
          a = t.ValidationError = function(e, t, r, n, a, i) {
            n && (this.property = n), e && (this.message = e), r && (r.id ? this.schema = r.id : this.schema = r), t && (this.instance = t), this.name = a, this.argument = i, this.stack = this.toString();
          };
      a.prototype.toString = function() {
        return this.property + " " + this.message;
      };
      var i = t.ValidatorResult = function(e, t, r, n) {
        this.instance = e, this.schema = t, this.propertyPath = n.propertyPath, this.errors = [], this.throwError = r && r.throwError;
      };
      i.prototype.addError = function(e) {
        var t;
        if ("string" == typeof e)
          t = new a(e, this.instance, this.schema, this.propertyPath);
        else {
          if (!e)
            throw new Error("Missing error detail");
          if (!e.message)
            throw new Error("Missing error message");
          if (!e.name)
            throw new Error("Missing validator type");
          t = new a(e.message, this.instance, this.schema, this.propertyPath, e.name, e.argument);
        }
        if (this.throwError)
          throw t;
        return this.errors.push(t), t;
      }, i.prototype.importErrors = function(e) {
        if ("string" == typeof e || e && e.validatorType)
          this.addError(e);
        else if (e && e.errors) {
          var t = this.errors;
          e.errors.forEach(function(e) {
            t.push(e);
          });
        }
      }, i.prototype.toString = function(e) {
        return this.errors.map(function(e, t) {
          return t + ": " + e.toString() + "\n";
        }).join("");
      }, Object.defineProperty(i.prototype, "valid", {get: function() {
          return !this.errors.length;
        }});
      var o = t.SchemaError = function c(e, t) {
        this.message = e, this.schema = t, Error.call(this, e), Error.captureStackTrace(this, c);
      };
      o.prototype = Object.create(Error.prototype, {
        constructor: {
          value: o,
          enumerable: !1
        },
        name: {
          value: "SchemaError",
          enumerable: !1
        }
      });
      var s = t.SchemaContext = function(e, t, r, n, a) {
        this.schema = e, this.options = t, this.propertyPath = r, this.base = n, this.schemas = a;
      };
      s.prototype.resolve = function(e) {
        return n.resolve(this.base, e);
      }, s.prototype.makeChild = function(e, t) {
        var r = void 0 === t ? this.propertyPath : this.propertyPath + l(t),
            a = n.resolve(this.base, e.id || ""),
            i = new s(e, this.options, r, a, Object.create(this.schemas));
        return e.id && !i.schemas[a] && (i.schemas[a] = e), i;
      };
      var u = t.FORMAT_REGEXPS = {
        "date-time": /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-[0-9]{2}[tT ]\d{2}:\d{2}:\d{2}(\.\d+)?([zZ]|[+-]\d{2}:\d{2})$/,
        date: /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-[0-9]{2}$/,
        time: /^\d{2}:\d{2}:\d{2}$/,
        email: /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
        "ip-address": /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        ipv6: /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
        uri: /^[a-zA-Z][a-zA-Z0-9+-.]*:[^\s]*$/,
        color: /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/,
        hostname: /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
        "host-name": /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
        alpha: /^[a-zA-Z]+$/,
        alphanumeric: /^[a-zA-Z0-9]+$/,
        "utc-millisec": function(e) {
          return "string" == typeof e && parseFloat(e) === parseInt(e, 10) && !isNaN(e);
        },
        regex: function(e) {
          var t = !0;
          try {
            new RegExp(e);
          } catch (r) {
            t = !1;
          }
          return t;
        },
        style: /\s*(.+?):\s*([^;]+);?/g,
        phone: /^\+(?:[0-9] ?){6,14}[0-9]$/
      };
      u.regexp = u.regex, u.pattern = u.regex, u.ipv4 = u["ip-address"], t.isFormat = function(e, t) {
        if (void 0 !== u[t]) {
          if (u[t] instanceof RegExp)
            return u[t].test(e);
          if ("function" == typeof u[t])
            return u[t](e);
        }
        return !1;
      };
      var l = t.makeSuffix = function(e) {
        return e = e.toString(), e.match(/[.\s\[\]]/) || e.match(/^[\d]/) ? e.match(/^\d+$/) ? "[" + e + "]" : "[" + JSON.stringify(e) + "]" : "." + e;
      };
      t.deepCompareStrict = function f(e, t) {
        if (typeof e != typeof t)
          return !1;
        if (e instanceof Array)
          return t instanceof Array ? e.length !== t.length ? !1 : e.every(function(r, n) {
            return f(e[n], t[n]);
          }) : !1;
        if ("object" == typeof e) {
          if (!e || !t)
            return e === t;
          var r = Object.keys(e),
              n = Object.keys(t);
          return r.length !== n.length ? !1 : r.every(function(r) {
            return f(e[r], t[r]);
          });
        }
        return e === t;
      }, e.exports.deepMerge = function h(e, t) {
        var r = Array.isArray(t),
            n = r && [] || {};
        return r ? (e = e || [], n = n.concat(e), t.forEach(function(t, r) {
          "object" == typeof t ? n[r] = h(e[r], t) : -1 === e.indexOf(t) && n.push(t);
        })) : (e && "object" == typeof e && Object.keys(e).forEach(function(t) {
          n[t] = e[t];
        }), Object.keys(t).forEach(function(r) {
          "object" == typeof t[r] && t[r] && e[r] ? n[r] = h(e[r], t[r]) : n[r] = t[r];
        })), n;
      }, t.objectGetPath = function(e, t) {
        for (var r,
            n = t.split("/").slice(1); "string" == typeof(r = n.shift()); ) {
          var a = decodeURIComponent(r.replace(/~0/, "~").replace(/~1/g, "/"));
          if (!(a in e))
            return;
          e = e[a];
        }
        return e;
      }, t.encodePath = function(e) {
        return e.map(function(e) {
          return "/" + encodeURIComponent(e).replace(/~/g, "%7E");
        }).join("");
      };
    }, function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function a(e, t) {
        return e ? t ? e + E : e : null;
      }
      function i(e) {
        var t = (e.type, e.label),
            r = e.required,
            n = e.children,
            i = e.displayLabel;
        return i ? l["default"].createElement("label", null, a(t, r), n) : n;
      }
      function o(e) {
        var t = e.type,
            r = e.classNames;
        return l["default"].createElement("div", {className: "field field-" + t + " " + r}, i(e));
      }
      function s(e) {
        var t = e.schema,
            r = e.uiSchema,
            n = e.name,
            a = e.required,
            i = j[t.type] || S["default"],
            s = !0;
        return "array" === t.type && (s = (0, c.isMultiSelect)(t)), "object" === t.type && (s = !1), l["default"].createElement(o, {
          label: t.title || n,
          required: a,
          type: t.type,
          displayLabel: s,
          classNames: r.classNames
        }, l["default"].createElement(i, e));
      }
      Object.defineProperty(t, "__esModule", {value: !0});
      var u = r(2),
          l = n(u),
          c = r(14),
          f = r(21),
          h = n(f),
          d = r(22),
          m = n(d),
          p = r(24),
          v = n(p),
          y = r(27),
          g = n(y),
          b = r(25),
          w = n(b),
          O = r(28),
          S = n(O),
          E = "*",
          j = {
            array: h["default"],
            "boolean": m["default"],
            "date-time": w["default"],
            integer: v["default"],
            number: v["default"],
            object: g["default"],
            string: w["default"]
          };
      o.defaultProps = {classNames: ""}, s.defaultProps = {uiSchema: {}}, t["default"] = s, e.exports = t["default"];
    }, function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function a(e) {
        switch (e) {
          case "array":
            return [];
          case "boolean":
            return !1;
          case "date-time":
            return "";
          case "number":
            return 0;
          case "object":
            return {};
          case "string":
            return "";
          default:
            return;
        }
      }
      function i(e, t) {
        return null === e ? a(t.type) : e;
      }
      function o(e, t) {
        var r = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2];
        if ("function" == typeof t)
          return t;
        if ("string" != typeof t)
          throw new Error("Unsupported widget definition: " + typeof t);
        if (t in r)
          return r[t];
        if (!P.hasOwnProperty(e))
          throw new Error("No alternative widget for type " + e);
        if (!P[e].hasOwnProperty(t))
          throw new Error('No alternative widget "' + t + '" for type ' + e);
        return P[e][t];
      }
      function s(e, t) {
        var r = t;
        return l(r) && l(e["default"]) ? r = c(r, e["default"]) : "default" in e && (r = e["default"]), "undefined" == typeof r && (r = a(e.type)), "object" === e.type ? Object.keys(e.properties).reduce(function(t, n) {
          return t[n] = s(e.properties[n], r[n]), t;
        }, {}) : r;
      }
      function u(e, t) {
        if (!l(e))
          throw new Error("Invalid schema: " + e);
        var r = s(e);
        return "undefined" == typeof t ? r : l(t) ? c(r, t) : t || r;
      }
      function l(e) {
        return "object" == typeof e && null !== e && !Array.isArray(e);
      }
      function c(e, t) {
        var r = Object.assign({}, e);
        return Object.keys(t).reduce(function(r, n) {
          var a = t[n];
          return e.hasOwnProperty(n) && l(a) ? r[n] = c(e[n], a) : r[n] = a, r;
        }, r);
      }
      function f(e) {
        if (/\.$/.test(e))
          return e;
        var t = Number(e),
            r = "number" == typeof t && !Number.isNaN(t);
        return r ? t : e;
      }
      function h(e, t) {
        if (!Array.isArray(t))
          return e;
        if (t.length !== e.length)
          throw new Error("uiSchema order list length should match object properties length");
        var r = function(e) {
          return [].slice.call(e).sort().toString();
        };
        if (r(t) !== r(e))
          throw new Error("uiSchema order list does not match object properties list");
        return t;
      }
      function d(e) {
        return Array.isArray(e.items["enum"]) && e.uniqueItems;
      }
      function m(e) {
        return e["enum"].map(function(t, r) {
          var n = e.enumNames && e.enumNames[r] || String(t);
          return {
            label: n,
            value: t
          };
        });
      }
      Object.defineProperty(t, "__esModule", {value: !0}), t.defaultTypeValue = a, t.defaultFieldValue = i, t.getAlternativeWidget = o, t.getDefaultFormState = u, t.mergeObjects = c, t.asNumber = f, t.orderProperties = h, t.isMultiSelect = d, t.optionsList = m;
      var p = r(15),
          v = n(p),
          y = r(16),
          g = n(y),
          b = r(17),
          w = n(b),
          O = r(18),
          S = n(O),
          E = r(19),
          j = n(E),
          x = r(20),
          A = n(x),
          P = {
            "boolean": {
              radio: g["default"],
              select: j["default"]
            },
            string: {
              password: v["default"],
              radio: g["default"],
              select: j["default"],
              textarea: A["default"]
            },
            number: {
              updown: w["default"],
              range: S["default"]
            },
            integer: {
              updown: w["default"],
              range: S["default"]
            }
          };
    }, function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function a(e) {
        var t = (e.schema, e.placeholder),
            r = e.value,
            n = e.defaultValue,
            a = e.required,
            i = e.onChange;
        return o["default"].createElement("input", {
          type: "password",
          value: r,
          defaultValue: n,
          placeholder: t,
          required: a,
          onChange: function(e) {
            return i(e.target.value);
          }
        });
      }
      Object.defineProperty(t, "__esModule", {value: !0});
      var i = r(2),
          o = n(i);
      t["default"] = a, e.exports = t["default"];
    }, function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function a(e) {
        var t = (e.schema, e.options),
            r = e.placeholder,
            n = e.value,
            a = e.defaultValue,
            i = (e.required, e.onChange),
            s = Math.random().toString();
        return o["default"].createElement("div", {className: "field-radio-group"}, t.map(function(e, t) {
          var u = void 0 !== n ? e.value === n : e.value === a;
          return o["default"].createElement("label", {key: t}, o["default"].createElement("input", {
            type: "radio",
            name: s,
            value: e.value,
            checked: u,
            placeholder: r,
            onChange: function(t) {
              return i(e.value);
            }
          }), e.label);
        }));
      }
      Object.defineProperty(t, "__esModule", {value: !0});
      var i = r(2),
          o = n(i);
      t["default"] = a, e.exports = t["default"];
    }, function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function a(e) {
        var t = {};
        return e.multipleOf && (t.step = e.multipleOf), e.minimum && (t.min = e.minimum), e.maximum && (t.max = e.maximum), t;
      }
      function i(e) {
        var t = e.schema,
            r = e.placeholder,
            n = e.value,
            i = e.defaultValue,
            s = e.required,
            l = e.onChange;
        return u["default"].createElement("input", o({
          type: "number",
          value: n,
          defaultValue: i,
          placeholder: r,
          required: s,
          onChange: function(e) {
            return l(e.target.value);
          }
        }, a(t)));
      }
      Object.defineProperty(t, "__esModule", {value: !0});
      var o = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      },
          s = r(2),
          u = n(s);
      t["default"] = i, e.exports = t["default"];
    }, function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function a(e) {
        var t = {};
        return e.multipleOf && (t.step = e.multipleOf), e.minimum && (t.min = e.minimum), e.maximum && (t.max = e.maximum), t;
      }
      function i(e) {
        var t = e.schema,
            r = e.placeholder,
            n = e.value,
            i = e.defaultValue,
            s = e.required,
            l = e.onChange;
        return u["default"].createElement("div", {className: "field-range-wrapper"}, u["default"].createElement("input", o({
          type: "range",
          value: n,
          defaultValue: i,
          placeholder: r,
          required: s,
          onChange: function(e) {
            return l(e.target.value);
          }
        }, a(t))), u["default"].createElement("span", {className: "range-view"}, n));
      }
      Object.defineProperty(t, "__esModule", {value: !0});
      var o = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      },
          s = r(2),
          u = n(s);
      t["default"] = i, e.exports = t["default"];
    }, function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function a(e, t) {
        return "boolean" === e ? "true" === t : "number" === e ? (0, u.asNumber)(t) : t;
      }
      function i(e) {
        var t = e.schema,
            r = e.options,
            n = e.placeholder,
            i = e.value,
            o = e.defaultValue,
            u = (e.required, e.multiple),
            l = e.onChange;
        return s["default"].createElement("select", {
          multiple: u,
          title: n,
          value: i,
          defaultValue: o,
          onChange: function(e) {
            var r = void 0;
            r = u ? [].filter.call(e.target.options, function(e) {
              return e.selected;
            }).map(function(e) {
              return e.value;
            }) : e.target.value, l(a(t.type, r));
          }
        }, r.map(function(e, t) {
          var r = e.value,
              n = e.label;
          return s["default"].createElement("option", {
            key: t,
            value: r
          }, n);
        }));
      }
      Object.defineProperty(t, "__esModule", {value: !0});
      var o = r(2),
          s = n(o),
          u = r(14);
      t["default"] = i, e.exports = t["default"];
    }, function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function a(e) {
        var t = (e.schema, e.placeholder),
            r = e.value,
            n = e.defaultValue,
            a = e.required,
            i = e.onChange;
        return o["default"].createElement("textarea", {
          value: r,
          defaultValue: n,
          placeholder: t,
          required: a,
          onChange: function(e) {
            return i(e.target.value);
          }
        });
      }
      Object.defineProperty(t, "__esModule", {value: !0});
      var i = r(2),
          o = n(i);
      t["default"] = a, e.exports = t["default"];
    }, function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function a(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function i(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
      }
      Object.defineProperty(t, "__esModule", {value: !0});
      var o = function() {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, r, n) {
          return r && e(t.prototype, r), n && e(t, n), t;
        };
      }(),
          s = function(e, t, r) {
            for (var n = !0; n; ) {
              var a = e,
                  i = t,
                  o = r;
              n = !1, null === a && (a = Function.prototype);
              var s = Object.getOwnPropertyDescriptor(a, i);
              if (void 0 !== s) {
                if ("value" in s)
                  return s.value;
                var u = s.get;
                if (void 0 === u)
                  return;
                return u.call(o);
              }
              var l = Object.getPrototypeOf(a);
              if (null === l)
                return;
              e = l, t = i, r = o, n = !0, s = l = void 0;
            }
          },
          u = r(2),
          l = n(u),
          c = r(14),
          f = r(19),
          h = n(f),
          d = function(e) {
            function t(e) {
              a(this, t), s(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e), this.state = this.getStateFromProps(e);
            }
            return i(t, e), o(t, null, [{
              key: "defaultProps",
              value: {uiSchema: {}},
              enumerable: !0
            }]), o(t, [{
              key: "componentWillReceiveProps",
              value: function(e) {
                this.setState(this.getStateFromProps(e));
              }
            }, {
              key: "getStateFromProps",
              value: function(e) {
                var t = Array.isArray(e.formData) ? e.formData : null;
                return {items: (0, c.getDefaultFormState)(e.schema, t) || []};
              }
            }, {
              key: "isItemRequired",
              value: function(e) {
                return "string" === e.type && e.minLength > 0;
              }
            }, {
              key: "asyncSetState",
              value: function(e, t) {
                var r = this;
                this.setState(e, function(e) {
                  return r.props.onChange(r.state.items, t);
                });
              }
            }, {
              key: "onAddClick",
              value: function(e) {
                e.preventDefault();
                var t = this.state.items,
                    r = this.props.schema;
                this.asyncSetState({items: t.concat((0, c.getDefaultFormState)(r.items))}, {validate: !1});
              }
            }, {
              key: "onDropClick",
              value: function(e, t) {
                t.preventDefault(), this.asyncSetState({items: this.state.items.filter(function(t, r) {
                    return r !== e;
                  })}, {validate: !1});
              }
            }, {
              key: "onChange",
              value: function(e, t) {
                this.asyncSetState({items: this.state.items.map(function(r, n) {
                    return e === n ? t : r;
                  })}, {validate: !1});
              }
            }, {
              key: "onSelectChange",
              value: function(e) {
                this.asyncSetState({items: e}, {validate: !1});
              }
            }, {
              key: "render",
              value: function() {
                var e = this,
                    t = this.props,
                    r = t.schema,
                    n = t.uiSchema,
                    a = t.name,
                    i = r.title || a,
                    o = this.state.items,
                    s = this.props.registry.SchemaField;
                return (0, c.isMultiSelect)(r) ? l["default"].createElement(h["default"], {
                  multiple: !0,
                  onChange: this.onSelectChange.bind(this),
                  options: (0, c.optionsList)(r.items),
                  schema: r,
                  title: i,
                  defaultValue: r["default"],
                  value: o
                }) : l["default"].createElement("fieldset", {className: "field field-array field-array-of-" + r.items.type}, i ? l["default"].createElement("legend", null, i) : null, r.description ? l["default"].createElement("div", {className: "field-description"}, r.description) : null, l["default"].createElement("div", {className: "array-item-list"}, o.map(function(t, a) {
                  return l["default"].createElement("div", {key: a}, l["default"].createElement(s, {
                    schema: r.items,
                    uiSchema: n.items,
                    formData: o[a],
                    required: e.isItemRequired(r.items),
                    onChange: e.onChange.bind(e, a),
                    registry: e.props.registry
                  }), l["default"].createElement("p", {className: "array-item-remove"}, l["default"].createElement("button", {
                    type: "button",
                    onClick: e.onDropClick.bind(e, a)
                  }, "-")));
                })), l["default"].createElement("p", {className: "array-item-add"}, l["default"].createElement("button", {
                  type: "button",
                  onClick: this.onAddClick.bind(this)
                }, "+")));
              }
            }, {
              key: "itemTitle",
              get: function() {
                var e = this.props.schema;
                return e.items.title || e.items.description || "Item";
              }
            }]), t;
          }(u.Component);
      t["default"] = d, e.exports = t["default"];
    }, function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function a(e) {
        var t = e.schema,
            r = e.name,
            n = e.uiSchema,
            a = e.formData,
            o = e.widgets,
            l = e.required,
            f = e.onChange,
            h = t.title,
            d = t.description,
            m = n["ui:widget"],
            p = {
              schema: t,
              onChange: f,
              label: h || r,
              placeholder: d,
              defaultValue: t["default"],
              value: (0, u.defaultFieldValue)(a, t),
              required: l
            };
        if (m) {
          var v = (0, u.getAlternativeWidget)(t.type, m, o);
          return s["default"].createElement(v, i({options: (0, u.optionsList)({"enum": [!0, !1]})}, p));
        }
        return s["default"].createElement(c["default"], p);
      }
      Object.defineProperty(t, "__esModule", {value: !0});
      var i = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      },
          o = r(2),
          s = n(o),
          u = r(14),
          l = r(23),
          c = n(l);
      a.defaultProps = {uiSchema: {}}, t["default"] = a, e.exports = t["default"];
    }, function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function a(e) {
        var t = (e.schema, e.defaultValue),
            r = e.value,
            n = e.required,
            a = e.placeholder,
            i = e.onChange;
        return o["default"].createElement("input", {
          type: "checkbox",
          title: a,
          checked: r,
          defaultChecked: t,
          required: n,
          onChange: function(e) {
            return i(e.target.checked);
          }
        });
      }
      Object.defineProperty(t, "__esModule", {value: !0});
      var i = r(2),
          o = n(i);
      t["default"] = a, e.exports = t["default"];
    }, function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function a(e) {
        return s["default"].createElement(c["default"], i({}, e, {onChange: function(t) {
            return e.onChange((0, u.asNumber)(t));
          }}));
      }
      Object.defineProperty(t, "__esModule", {value: !0});
      var i = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      },
          o = r(2),
          s = n(o),
          u = r(14),
          l = r(25),
          c = n(l);
      a.defaultProps = {uiSchema: {}}, t["default"] = a, e.exports = t["default"];
    }, function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function a(e) {
        var t = e.schema,
            r = e.name,
            n = e.uiSchema,
            a = e.formData,
            o = e.widgets,
            l = e.required,
            f = e.onChange,
            d = t.title,
            m = t.description,
            p = n["ui:widget"],
            v = {
              schema: t,
              label: d || r,
              placeholder: m,
              onChange: f,
              value: (0, u.defaultFieldValue)(a, t),
              required: l,
              defaultValue: t["default"]
            };
        if (Array.isArray(t["enum"])) {
          if (p) {
            var y = (0, u.getAlternativeWidget)(t.type, p, o);
            return s["default"].createElement(y, i({options: (0, u.optionsList)(t)}, v));
          }
          return s["default"].createElement(h["default"], i({options: (0, u.optionsList)(t)}, v));
        }
        if (p) {
          var y = (0, u.getAlternativeWidget)(t.type, p, o);
          return s["default"].createElement(y, v);
        }
        return s["default"].createElement(c["default"], v);
      }
      Object.defineProperty(t, "__esModule", {value: !0});
      var i = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      },
          o = r(2),
          s = n(o),
          u = r(14),
          l = r(26),
          c = n(l),
          f = r(19),
          h = n(f);
      a.defaultProps = {uiSchema: {}}, t["default"] = a, e.exports = t["default"];
    }, function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function a(e) {
        var t = (e.schema, e.placeholder),
            r = e.value,
            n = e.defaultValue,
            a = e.required,
            i = e.onChange;
        return o["default"].createElement("input", {
          type: "text",
          value: r,
          defaultValue: n,
          placeholder: t,
          required: a,
          onChange: function(e) {
            return i(e.target.value);
          }
        });
      }
      Object.defineProperty(t, "__esModule", {value: !0});
      var i = r(2),
          o = n(i);
      t["default"] = a, e.exports = t["default"];
    }, function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function a(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : e[t] = r, e;
      }
      function i(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function o(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
      }
      Object.defineProperty(t, "__esModule", {value: !0});
      var s = function() {
        function e(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, r, n) {
          return r && e(t.prototype, r), n && e(t, n), t;
        };
      }(),
          u = function(e, t, r) {
            for (var n = !0; n; ) {
              var a = e,
                  i = t,
                  o = r;
              n = !1, null === a && (a = Function.prototype);
              var s = Object.getOwnPropertyDescriptor(a, i);
              if (void 0 !== s) {
                if ("value" in s)
                  return s.value;
                var u = s.get;
                if (void 0 === u)
                  return;
                return u.call(o);
              }
              var l = Object.getPrototypeOf(a);
              if (null === l)
                return;
              e = l, t = i, r = o, n = !0, s = l = void 0;
            }
          },
          l = r(2),
          c = n(l),
          f = r(14),
          h = function(e) {
            function t(e) {
              i(this, t), u(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e), this.state = this.getStateFromProps(e);
            }
            return o(t, e), s(t, null, [{
              key: "defaultProps",
              value: {uiSchema: {}},
              enumerable: !0
            }]), s(t, [{
              key: "componentWillReceiveProps",
              value: function(e) {
                this.setState(this.getStateFromProps(e));
              }
            }, {
              key: "getStateFromProps",
              value: function(e) {
                return (0, f.getDefaultFormState)(e.schema, e.formData) || {};
              }
            }, {
              key: "isRequired",
              value: function(e) {
                var t = this.props.schema;
                return Array.isArray(t.required) && -1 !== t.required.indexOf(e);
              }
            }, {
              key: "asyncSetState",
              value: function(e) {
                var t = this;
                this.setState(e, function(e) {
                  return t.props.onChange(t.state);
                });
              }
            }, {
              key: "onChange",
              value: function(e, t) {
                this.asyncSetState(a({}, e, t));
              }
            }, {
              key: "render",
              value: function() {
                var e = this,
                    t = this.props,
                    r = t.schema,
                    n = t.uiSchema,
                    a = t.name,
                    i = r.title || a,
                    o = this.props.registry,
                    s = o.SchemaField,
                    u = o.TitleField;
                try {
                  var l = (0, f.orderProperties)(Object.keys(r.properties), n["ui:order"]);
                } catch (h) {
                  return c["default"].createElement("p", {
                    className: "config-error",
                    style: {color: "red"}
                  }, "Invalid ", a || "root", " object field configuration:", c["default"].createElement("em", null, h.message), ".");
                }
                return c["default"].createElement("fieldset", null, i ? c["default"].createElement(u, {title: i}) : null, r.description ? c["default"].createElement("div", {className: "field-description"}, r.description) : null, l.map(function(t, a) {
                  return c["default"].createElement(s, {
                    key: a,
                    name: t,
                    required: e.isRequired(t),
                    schema: r.properties[t],
                    uiSchema: n[t],
                    formData: e.state[t],
                    onChange: e.onChange.bind(e, t),
                    registry: e.props.registry
                  });
                }));
              }
            }]), t;
          }(l.Component);
      t["default"] = h, e.exports = t["default"];
    }, function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function a(e) {
        var t = e.schema;
        return o["default"].createElement("div", {className: "unsupported-field"}, "Unsupported field schema ", JSON.stringify(t, null, 2), ".");
      }
      Object.defineProperty(t, "__esModule", {value: !0}), t["default"] = a;
      var i = r(2),
          o = n(i);
      e.exports = t["default"];
    }, function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function a(e) {
        return o["default"].createElement("legend", null, e.title);
      }
      Object.defineProperty(t, "__esModule", {value: !0});
      var i = r(2),
          o = n(i);
      t["default"] = a, e.exports = t["default"];
    }, function(e, t, r) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function a(e) {
        var t = e.errors;
        return o["default"].createElement("div", {className: "errors"}, o["default"].createElement("h2", null, "Errors"), o["default"].createElement("ul", null, t.map(function(e, t) {
          return o["default"].createElement("li", {key: t}, e.stack);
        })));
      }
      Object.defineProperty(t, "__esModule", {value: !0}), t["default"] = a;
      var i = r(2),
          o = n(i);
      e.exports = t["default"];
    }]);
  });
})(require('process'));
