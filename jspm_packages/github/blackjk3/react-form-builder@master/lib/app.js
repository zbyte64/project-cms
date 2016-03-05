/* */ 
"format cjs";
(function(process) {
  !function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(require('react'), require('react/addons')) : "function" == typeof define && define.amd ? define(["react", "react/addons"], t) : "object" == typeof exports ? exports.ReactFormBuilder = t(require('react'), require('react/addons')) : e.ReactFormBuilder = t(e.react, e["react/addons"]);
  }(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_19__) {
    return function(e) {
      function t(n) {
        if (i[n])
          return i[n].exports;
        var s = i[n] = {
          exports: {},
          id: n,
          loaded: !1
        };
        return e[n].call(s.exports, s, s.exports, t), s.loaded = !0, s.exports;
      }
      var i = {};
      return t.m = e, t.c = i, t.p = "", t(0);
    }([function(e, t, i) {
      e.exports = i(25);
    }, function(e, t) {
      e.exports = __WEBPACK_EXTERNAL_MODULE_1__;
    }, function(module, exports, __webpack_require__) {
      (function(setImmediate) {
        "use strict";
        function capitalize(e) {
          return e.charAt(0).toUpperCase() + e.slice(1);
        }
        function callbackName(e, t) {
          return t = t || "on", t + exports.capitalize(e);
        }
        function checkEnv(target) {
          var flag = void 0;
          try {
            eval(target) && (flag = !0);
          } catch (e) {
            flag = !1;
          }
          environment[callbackName(target, "has")] = flag;
        }
        function isObject(e) {
          var t = typeof e;
          return "function" === t || "object" === t && !!e;
        }
        function extend(e) {
          if (!isObject(e))
            return e;
          for (var t,
              i,
              n = 1,
              s = arguments.length; s > n; n++) {
            t = arguments[n];
            for (i in t)
              if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
                var a = Object.getOwnPropertyDescriptor(t, i);
                Object.defineProperty(e, i, a);
              } else
                e[i] = t[i];
          }
          return e;
        }
        function isFunction(e) {
          return "function" == typeof e;
        }
        function object(e, t) {
          for (var i = {},
              n = 0; n < e.length; n++)
            i[e[n]] = t[n];
          return i;
        }
        function isArguments(e) {
          return "object" == typeof e && "callee" in e && "number" == typeof e.length;
        }
        function throwIf(e, t) {
          if (e)
            throw Error(t || e);
        }
        Object.defineProperty(exports, "__esModule", {value: !0}), exports.capitalize = capitalize, exports.callbackName = callbackName, exports.isObject = isObject, exports.extend = extend, exports.isFunction = isFunction, exports.object = object, exports.isArguments = isArguments, exports.throwIf = throwIf;
        var environment = {};
        exports.environment = environment, checkEnv("setImmediate"), checkEnv("Promise"), exports.EventEmitter = __webpack_require__(46), environment.hasSetImmediate ? exports.nextTick = function(e) {
          setImmediate(e);
        } : exports.nextTick = function(e) {
          setTimeout(e, 0);
        }, environment.hasPromise ? (exports.Promise = Promise, exports.createPromise = function(e) {
          return new exports.Promise(e);
        }) : (exports.Promise = null, exports.createPromise = function() {});
      }).call(exports, __webpack_require__(7).setImmediate);
    }, function(e, t, i) {
      "use strict";
      var n = i(2),
          s = i(16).instanceJoinCreator,
          a = function(e) {
            for (var t,
                i = 0,
                n = {}; i < (e.children || []).length; ++i)
              t = e.children[i], e[t] && (n[t] = e[t]);
            return n;
          },
          r = function o(e) {
            var t = {};
            for (var i in e) {
              var s = e[i],
                  r = a(s),
                  l = o(r);
              t[i] = s;
              for (var u in l) {
                var p = l[u];
                t[i + n.capitalize(u)] = p;
              }
            }
            return t;
          };
      e.exports = {
        hasListener: function(e) {
          for (var t,
              i,
              n,
              s = 0; s < (this.subscriptions || []).length; ++s)
            for (n = [].concat(this.subscriptions[s].listenable), t = 0; t < n.length; t++)
              if (i = n[t], i === e || i.hasListener && i.hasListener(e))
                return !0;
          return !1;
        },
        listenToMany: function(e) {
          var t = r(e);
          for (var i in t) {
            var s = n.callbackName(i),
                a = this[s] ? s : this[i] ? i : void 0;
            a && this.listenTo(t[i], a, this[s + "Default"] || this[a + "Default"] || a);
          }
        },
        validateListening: function(e) {
          return e === this ? "Listener is not able to listen to itself" : n.isFunction(e.listen) ? e.hasListener && e.hasListener(this) ? "Listener cannot listen to this listenable because of circular loop" : void 0 : e + " is missing a listen method";
        },
        listenTo: function(e, t, i) {
          var s,
              a,
              r,
              o = this.subscriptions = this.subscriptions || [];
          return n.throwIf(this.validateListening(e)), this.fetchInitialState(e, i), s = e.listen(this[t] || t, this), a = function() {
            var e = o.indexOf(r);
            n.throwIf(-1 === e, "Tried to remove listen already gone from subscriptions list!"), o.splice(e, 1), s();
          }, r = {
            stop: a,
            listenable: e
          }, o.push(r), r;
        },
        stopListeningTo: function(e) {
          for (var t,
              i = 0,
              s = this.subscriptions || []; i < s.length; i++)
            if (t = s[i], t.listenable === e)
              return t.stop(), n.throwIf(-1 !== s.indexOf(t), "Failed to remove listen from subscriptions list!"), !0;
          return !1;
        },
        stopListeningToAll: function() {
          for (var e,
              t = this.subscriptions || []; e = t.length; )
            t[0].stop(), n.throwIf(t.length !== e - 1, "Failed to remove listen from subscriptions list!");
        },
        fetchInitialState: function(e, t) {
          t = t && this[t] || t;
          var i = this;
          if (n.isFunction(t) && n.isFunction(e.getInitialState)) {
            var s = e.getInitialState();
            s && n.isFunction(s.then) ? s.then(function() {
              t.apply(i, arguments);
            }) : t.call(this, s);
          }
        },
        joinTrailing: s("last"),
        joinLeading: s("first"),
        joinConcat: s("all"),
        joinStrict: s("strict")
      };
    }, function(e, t, i) {
      var n;
      !function() {
        "use strict";
        function s() {
          for (var e = "",
              t = 0; t < arguments.length; t++) {
            var i = arguments[t];
            if (i) {
              var n = typeof i;
              if ("string" === n || "number" === n)
                e += " " + i;
              else if (Array.isArray(i))
                e += " " + s.apply(null, i);
              else if ("object" === n)
                for (var a in i)
                  i.hasOwnProperty(a) && i[a] && (e += " " + a);
            }
          }
          return e.substr(1);
        }
        "undefined" != typeof e && e.exports ? e.exports = s : (n = function() {
          return s;
        }.call(t, i, t, e), !(void 0 !== n && (e.exports = n)));
      }();
    }, function(e, t) {
      function i() {
        u = !1, r.length ? l = r.concat(l) : p = -1, l.length && n();
      }
      function n() {
        if (!u) {
          var e = setTimeout(i);
          u = !0;
          for (var t = l.length; t; ) {
            for (r = l, l = []; ++p < t; )
              r[p].run();
            p = -1, t = l.length;
          }
          r = null, u = !1, clearTimeout(e);
        }
      }
      function s(e, t) {
        this.fun = e, this.array = t;
      }
      function a() {}
      var r,
          o = e.exports = {},
          l = [],
          u = !1,
          p = -1;
      o.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var i = 1; i < arguments.length; i++)
            t[i - 1] = arguments[i];
        l.push(new s(e, t)), 1 !== l.length || u || setTimeout(n, 0);
      }, s.prototype.run = function() {
        this.fun.apply(null, this.array);
      }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = a, o.addListener = a, o.once = a, o.off = a, o.removeListener = a, o.removeAllListeners = a, o.emit = a, o.binding = function(e) {
        throw new Error("process.binding is not supported");
      }, o.cwd = function() {
        return "/";
      }, o.chdir = function(e) {
        throw new Error("process.chdir is not supported");
      }, o.umask = function() {
        return 0;
      };
    }, function(e, t, i) {
      var n = i(17),
          s = n.createActions(["createElement", "editElement", "deleteElement", "saveData", "save"]);
      e.exports = s;
    }, function(e, t, i) {
      (function(e, n) {
        function s(e, t) {
          this._id = e, this._clearFn = t;
        }
        var a = i(5).nextTick,
            r = Function.prototype.apply,
            o = Array.prototype.slice,
            l = {},
            u = 0;
        t.setTimeout = function() {
          return new s(r.call(setTimeout, window, arguments), clearTimeout);
        }, t.setInterval = function() {
          return new s(r.call(setInterval, window, arguments), clearInterval);
        }, t.clearTimeout = t.clearInterval = function(e) {
          e.close();
        }, s.prototype.unref = s.prototype.ref = function() {}, s.prototype.close = function() {
          this._clearFn.call(window, this._id);
        }, t.enroll = function(e, t) {
          clearTimeout(e._idleTimeoutId), e._idleTimeout = t;
        }, t.unenroll = function(e) {
          clearTimeout(e._idleTimeoutId), e._idleTimeout = -1;
        }, t._unrefActive = t.active = function(e) {
          clearTimeout(e._idleTimeoutId);
          var t = e._idleTimeout;
          t >= 0 && (e._idleTimeoutId = setTimeout(function() {
            e._onTimeout && e._onTimeout();
          }, t));
        }, t.setImmediate = "function" == typeof e ? e : function(e) {
          var i = u++,
              n = arguments.length < 2 ? !1 : o.call(arguments, 1);
          return l[i] = !0, a(function() {
            l[i] && (n ? e.apply(null, n) : e.call(null), t.clearImmediate(i));
          }), i;
        }, t.clearImmediate = "function" == typeof n ? n : function(e) {
          delete l[e];
        };
      }).call(t, i(7).setImmediate, i(7).clearImmediate);
    }, function(e, t) {
      "use strict";
      t.createdStores = [], t.createdActions = [], t.reset = function() {
        for (; t.createdStores.length; )
          t.createdStores.pop();
        for (; t.createdActions.length; )
          t.createdActions.pop();
      };
    }, function(e, t, i) {
      "use strict";
      var n = i(2);
      e.exports = {
        preEmit: function() {},
        shouldEmit: function() {
          return !0;
        },
        listen: function(e, t) {
          t = t || this;
          var i = function(i) {
            s || e.apply(t, i);
          },
              n = this,
              s = !1;
          return this.emitter.addListener(this.eventLabel, i), function() {
            s = !0, n.emitter.removeListener(n.eventLabel, i);
          };
        },
        promise: function(e) {
          var t = this,
              i = this.children.indexOf("completed") >= 0 && this.children.indexOf("failed") >= 0;
          if (!i)
            throw new Error('Publisher must have "completed" and "failed" child publishers');
          e.then(function(e) {
            return t.completed(e);
          }, function(e) {
            return t.failed(e);
          });
        },
        listenAndPromise: function(e, t) {
          var i = this;
          t = t || this, this.willCallPromise = (this.willCallPromise || 0) + 1;
          var n = this.listen(function() {
            if (!e)
              throw new Error("Expected a function returning a promise but got " + e);
            var n = arguments,
                s = e.apply(t, n);
            return i.promise.call(i, s);
          }, t);
          return function() {
            i.willCallPromise--, n.call(i);
          };
        },
        trigger: function() {
          var e = arguments,
              t = this.preEmit.apply(this, e);
          e = void 0 === t ? e : n.isArguments(t) ? t : [].concat(t), this.shouldEmit.apply(this, e) && this.emitter.emit(this.eventLabel, e);
        },
        triggerAsync: function() {
          var e = arguments,
              t = this;
          n.nextTick(function() {
            t.trigger.apply(t, e);
          });
        },
        triggerPromise: function() {
          var e = this,
              t = arguments,
              i = this.children.indexOf("completed") >= 0 && this.children.indexOf("failed") >= 0,
              s = n.createPromise(function(s, a) {
                if (e.willCallPromise)
                  return void n.nextTick(function() {
                    var i = e.promise;
                    e.promise = function(t) {
                      return t.then(s, a), e.promise = i, e.promise.apply(e, arguments);
                    }, e.trigger.apply(e, t);
                  });
                if (i)
                  var r = e.completed.listen(function(e) {
                    r(), o(), s(e);
                  }),
                      o = e.failed.listen(function(e) {
                        r(), o(), a(e);
                      });
                e.triggerAsync.apply(e, t), i || s();
              });
          return s;
        }
      };
    }, function(e, t, i) {
      var n = i(2),
          s = i(3);
      e.exports = n.extend({componentWillUnmount: s.stopListeningToAll}, s);
    }, function(e, t, i) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      var s = i(1),
          a = n(s),
          r = i(24),
          o = n(r),
          l = i(43),
          u = n(l),
          p = i(37),
          d = n(p),
          h = i(40),
          c = n(h),
          f = i(42),
          m = n(f),
          v = i(35),
          g = n(v),
          y = {},
          b = a["default"].createClass({
            displayName: "Header",
            mixins: [m["default"]],
            render: function() {
              "dynamic-input " + this.props.data.element + "-input";
              return this.renderWithSortable(a["default"].createElement("div", {className: "rfb-item"}, !this.props.mutable && a["default"].createElement(o["default"], {
                parent: this.props.parent,
                editModeOn: this.props.editModeOn,
                data: this.props.data,
                onDestroy: this.props._onDestroy,
                onEdit: this.props.onEdit,
                "static": this.props.data["static"],
                required: this.props.data.required
              }), a["default"].createElement("h3", {className: "static"}, this.props.data.content)));
            }
          }),
          _ = a["default"].createClass({
            displayName: "Paragraph",
            mixins: [m["default"]],
            render: function() {
              return this.renderWithSortable(a["default"].createElement("div", {className: "rfb-item"}, !this.props.mutable && a["default"].createElement(o["default"], {
                parent: this.props.parent,
                editModeOn: this.props.editModeOn,
                data: this.props.data,
                onDestroy: this.props._onDestroy,
                onEdit: this.props.onEdit,
                "static": this.props.data["static"],
                required: this.props.data.required
              }), a["default"].createElement("p", {className: "static"}, this.props.data.content)));
            }
          }),
          E = a["default"].createClass({
            displayName: "LineBreak",
            mixins: [m["default"]],
            render: function() {
              return this.renderWithSortable(a["default"].createElement("div", {className: "rfb-item"}, !this.props.mutable && a["default"].createElement(o["default"], {
                parent: this.props.parent,
                editModeOn: this.props.editModeOn,
                data: this.props.data,
                onDestroy: this.props._onDestroy,
                onEdit: this.props.onEdit,
                "static": this.props.data["static"],
                required: this.props.data.required
              }), a["default"].createElement("hr", null)));
            }
          }),
          x = a["default"].createClass({
            displayName: "TextInput",
            mixins: [m["default"]],
            render: function() {
              var e = {};
              return e.type = "text", e.className = "form-control", e.name = this.props.data.field_name, this.props.mutable && (e.defaultValue = this.props.defaultValue, e.ref = "child_ref_" + this.props.data.field_name), this.renderWithSortable(a["default"].createElement("div", {className: "rfb-item"}, !this.props.mutable && a["default"].createElement(o["default"], {
                parent: this.props.parent,
                editModeOn: this.props.editModeOn,
                data: this.props.data,
                onDestroy: this.props._onDestroy,
                onEdit: this.props.onEdit,
                "static": this.props.data["static"],
                required: this.props.data.required
              }), a["default"].createElement("div", {className: "form-group"}, a["default"].createElement("label", null, this.props.data.label, this.props.data.hasOwnProperty("required") && this.props.data.required === !0 && a["default"].createElement("span", {className: "label-required label label-danger"}, "Required")), a["default"].createElement("input", e))));
            }
          }),
          w = a["default"].createClass({
            displayName: "TextArea",
            mixins: [m["default"]],
            render: function() {
              var e = {};
              return e.className = "form-control", e.name = this.props.data.field_name, this.props.mutable && (e.defaultValue = this.props.defaultValue, e.ref = "child_ref_" + this.props.data.field_name), this.renderWithSortable(a["default"].createElement("div", {className: "rfb-item"}, !this.props.mutable && a["default"].createElement(o["default"], {
                parent: this.props.parent,
                editModeOn: this.props.editModeOn,
                data: this.props.data,
                onDestroy: this.props._onDestroy,
                onEdit: this.props.onEdit,
                "static": this.props.data["static"],
                required: this.props.data.required
              }), a["default"].createElement("div", {className: "form-group"}, a["default"].createElement("label", null, this.props.data.label, this.props.data.hasOwnProperty("required") && this.props.data.required === !0 && a["default"].createElement("span", {className: "label-required label label-danger"}, "Required")), a["default"].createElement("textarea", e))));
            }
          }),
          O = a["default"].createClass({
            displayName: "DatePicker",
            mixins: [m["default"]],
            render: function() {
              var e = {};
              return e.type = "date", e.className = "form-control", e.name = this.props.data.field_name, this.props.mutable && (e.defaultValue = this.props.defaultValue, e.ref = "child_ref_" + this.props.data.field_name), this.renderWithSortable(a["default"].createElement("div", {className: "rfb-item"}, !this.props.mutable && a["default"].createElement(o["default"], {
                parent: this.props.parent,
                editModeOn: this.props.editModeOn,
                data: this.props.data,
                onDestroy: this.props._onDestroy,
                onEdit: this.props.onEdit,
                "static": this.props.data["static"],
                required: this.props.data.required
              }), a["default"].createElement("div", {className: "form-group"}, a["default"].createElement("label", null, this.props.data.label, this.props.data.hasOwnProperty("required") && this.props.data.required === !0 && a["default"].createElement("span", {className: "label-required label label-danger"}, "Required")), a["default"].createElement("input", e))));
            }
          }),
          k = a["default"].createClass({
            displayName: "Dropdown",
            mixins: [m["default"]],
            render: function() {
              var e = {};
              return e.className = "form-control", e.name = this.props.data.field_name, this.props.mutable && (e.defaultValue = this.props.defaultValue, e.ref = "child_ref_" + this.props.data.field_name), this.renderWithSortable(a["default"].createElement("div", {className: "rfb-item"}, !this.props.mutable && a["default"].createElement(o["default"], {
                parent: this.props.parent,
                editModeOn: this.props.editModeOn,
                data: this.props.data,
                onDestroy: this.props._onDestroy,
                onEdit: this.props.onEdit,
                "static": this.props.data["static"],
                required: this.props.data.required
              }), a["default"].createElement("div", {className: "form-group"}, a["default"].createElement("label", null, this.props.data.label, this.props.data.hasOwnProperty("required") && this.props.data.required === !0 && a["default"].createElement("span", {className: "label-required label label-danger"}, "Required")), a["default"].createElement("select", e, this.props.data.options.map(function(e) {
                var t = "preview_" + e.key;
                return a["default"].createElement("option", {
                  value: e.value,
                  key: t
                }, e.text);
              })))));
            }
          }),
          P = a["default"].createClass({
            displayName: "Signature",
            mixins: [m["default"]],
            componentDidMount: function() {
              if (void 0 !== this.props.defaultValue && this.props.defaultValue.length > 0) {
                var e = this.refs["canvas_" + this.props.data.field_name];
                e.fromDataURL("data:image/png;base64," + this.props.defaultValue);
              }
            },
            render: function() {
              var e = {};
              e.type = "hidden", e.name = this.props.data.field_name, this.props.mutable && (e.defaultValue = this.props.defaultValue, e.ref = "child_ref_" + this.props.data.field_name);
              var t = {};
              return t.clearButton = {"true": !0}, this.props.mutable && (t.defaultValue = this.props.defaultValue, t.ref = "canvas_" + this.props.data.field_name), this.renderWithSortable(a["default"].createElement("div", {className: "rfb-item"}, !this.props.mutable && a["default"].createElement(o["default"], {
                parent: this.props.parent,
                editModeOn: this.props.editModeOn,
                data: this.props.data,
                onDestroy: this.props._onDestroy,
                onEdit: this.props.onEdit,
                "static": this.props.data["static"],
                required: this.props.data.required
              }), a["default"].createElement("div", {className: "form-group"}, a["default"].createElement("label", null, this.props.data.label, this.props.data.hasOwnProperty("required") && this.props.data.required === !0 && a["default"].createElement("span", {className: "label-required label label-danger"}, "Required")), a["default"].createElement(c["default"], t), a["default"].createElement("input", e))));
            }
          }),
          C = a["default"].createClass({
            displayName: "Tags",
            mixins: [m["default"]],
            getInitialState: function() {
              return {value: void 0 !== this.props.defaultValue ? this.props.defaultValue.split(",") : []};
            },
            handleChange: function(e) {
              this.setState({value: e});
            },
            render: function() {
              var e = this.props.data.options.map(function(e) {
                return e.label = e.text, e;
              }),
                  t = {};
              return t.multi = !0, t.name = this.props.data.field_name, t.onChange = this.handleChange, t.options = e, this.props.mutable || (t.value = e[0].text), this.props.mutable && (t.value = this.state.value, t.ref = "child_ref_" + this.props.data.field_name), this.renderWithSortable(a["default"].createElement("div", {className: "rfb-item"}, !this.props.mutable && a["default"].createElement(o["default"], {
                parent: this.props.parent,
                editModeOn: this.props.editModeOn,
                data: this.props.data,
                onDestroy: this.props._onDestroy,
                onEdit: this.props.onEdit,
                "static": this.props.data["static"],
                required: this.props.data.required
              }), a["default"].createElement("div", {className: "form-group"}, a["default"].createElement("label", null, this.props.data.label, this.props.data.hasOwnProperty("required") && this.props.data.required === !0 && a["default"].createElement("span", {className: "label-required label label-danger"}, "Required")), a["default"].createElement(d["default"], t))));
            }
          }),
          M = a["default"].createClass({
            displayName: "Checkboxes",
            mixins: [m["default"]],
            render: function() {
              var e = this;
              return this.renderWithSortable(a["default"].createElement("div", {className: "rfb-item"}, !this.props.mutable && a["default"].createElement(o["default"], {
                parent: this.props.parent,
                editModeOn: this.props.editModeOn,
                data: this.props.data,
                onDestroy: this.props._onDestroy,
                onEdit: this.props.onEdit,
                "static": this.props.data["static"],
                required: this.props.data.required
              }), a["default"].createElement("div", {className: "form-group"}, a["default"].createElement("label", null, this.props.data.label, this.props.data.hasOwnProperty("required") && this.props.data.required === !0 && a["default"].createElement("span", {className: "label-required label label-danger"}, "Required")), this.props.data.options.map(function(t) {
                var i = "preview_" + t.key,
                    n = {};
                return n.name = "option_" + t.key, n.type = "checkbox", n.value = t.value, e.props.mutable && (n.defaultChecked = e.props.defaultValue.indexOf(t.value) > -1 ? !0 : !1, n.ref = "child_ref_" + t.key), a["default"].createElement("label", {
                  className: "checkbox-label",
                  key: i
                }, a["default"].createElement("input", n), " ", t.text);
              }))));
            }
          }),
          D = a["default"].createClass({
            displayName: "RadioButtons",
            mixins: [m["default"]],
            render: function() {
              var e = this;
              return this.renderWithSortable(a["default"].createElement("div", {className: "rfb-item"}, !this.props.mutable && a["default"].createElement(o["default"], {
                parent: this.props.parent,
                editModeOn: this.props.editModeOn,
                data: this.props.data,
                onDestroy: this.props._onDestroy,
                onEdit: this.props.onEdit,
                "static": this.props.data["static"],
                required: this.props.data.required
              }), a["default"].createElement("div", {className: "form-group"}, a["default"].createElement("label", null, this.props.data.label, this.props.data.hasOwnProperty("required") && this.props.data.required === !0 && a["default"].createElement("span", {className: "label-required label label-danger"}, "Required")), this.props.data.options.map(function(t) {
                var i = "preview_" + t.key,
                    n = {};
                return n.name = e.props.data.field_name, n.type = "radio", n.value = t.value, e.props.mutable && (n.defaultChecked = void 0 !== e.props.defaultValue && e.props.defaultValue.indexOf(t.value) > -1 ? !0 : !1, n.ref = "child_ref_" + t.key), a["default"].createElement("label", {
                  className: "radio-label",
                  key: i
                }, a["default"].createElement("input", n), " ", t.text);
              }))));
            }
          }),
          T = a["default"].createClass({
            displayName: "Rating",
            mixins: [m["default"]],
            render: function() {
              var e = {};
              return e.name = this.props.data.field_name, e.ratingAmount = 5, this.props.mutable && (e.rating = void 0 !== this.props.defaultValue && this.props.defaultValue.length ? parseFloat(this.props.defaultValue, 10) : 0, e.editing = !0, e.ref = "child_ref_" + this.props.data.field_name), this.renderWithSortable(a["default"].createElement("div", {className: "rfb-item"}, !this.props.mutable && a["default"].createElement(o["default"], {
                parent: this.props.parent,
                editModeOn: this.props.editModeOn,
                data: this.props.data,
                onDestroy: this.props._onDestroy,
                onEdit: this.props.onEdit,
                "static": this.props.data["static"],
                required: this.props.data.required
              }), a["default"].createElement("div", {className: "form-group"}, a["default"].createElement("label", null, this.props.data.label, this.props.data.hasOwnProperty("required") && this.props.data.required === !0 && a["default"].createElement("span", {className: "label-required label label-danger"}, "Required")), a["default"].createElement(u["default"], e))));
            }
          }),
          N = a["default"].createClass({
            displayName: "HyperLink",
            mixins: [m["default"]],
            render: function() {
              return this.renderWithSortable(a["default"].createElement("div", {className: "rfb-item"}, !this.props.mutable && a["default"].createElement(o["default"], {
                parent: this.props.parent,
                editModeOn: this.props.editModeOn,
                data: this.props.data,
                onDestroy: this.props._onDestroy,
                onEdit: this.props.onEdit,
                "static": this.props.data["static"],
                required: this.props.data.required
              }), a["default"].createElement("div", {className: "form-group"}, a["default"].createElement("a", {
                target: "_blank",
                href: this.props.data.href
              }, this.props.data.content))));
            }
          }),
          S = a["default"].createClass({
            displayName: "Download",
            mixins: [m["default"]],
            render: function() {
              return this.renderWithSortable(a["default"].createElement("div", {className: "rfb-item"}, !this.props.mutable && a["default"].createElement(o["default"], {
                parent: this.props.parent,
                editModeOn: this.props.editModeOn,
                data: this.props.data,
                onDestroy: this.props._onDestroy,
                onEdit: this.props.onEdit,
                "static": this.props.data["static"],
                required: this.props.data.required
              }), a["default"].createElement("div", {className: "form-group"}, a["default"].createElement("a", {href: this.props.download_path + "?id=" + this.props.data.file_path}, this.props.data.content))));
            }
          }),
          L = a["default"].createClass({
            displayName: "Camera",
            mixins: [m["default"]],
            getInitialState: function() {
              return {img: null};
            },
            displayImage: function(e) {
              var t,
                  i,
                  n = this,
                  s = e.target;
              s.files && s.files.length && (t = s.files[0], i = new FileReader, i.readAsDataURL(t), i.onloadend = function() {
                n.setState({img: i.result});
              });
            },
            clearImage: function() {
              this.setState({img: null});
            },
            render: function() {
              return this.renderWithSortable(a["default"].createElement("div", {className: "rfb-item"}, !this.props.mutable && a["default"].createElement(o["default"], {
                parent: this.props.parent,
                editModeOn: this.props.editModeOn,
                data: this.props.data,
                onDestroy: this.props._onDestroy,
                onEdit: this.props.onEdit,
                "static": this.props.data["static"],
                required: this.props.data.required
              }), a["default"].createElement("div", {className: "form-group"}, a["default"].createElement("label", null, this.props.data.label, this.props.data.hasOwnProperty("required") && this.props.data.required === !0 && a["default"].createElement("span", {className: "label-required label label-danger"}, "Required")), a["default"].createElement("div", {className: "image-upload-container"}, !this.state.img && a["default"].createElement("div", null, a["default"].createElement("input", {
                type: "file",
                accept: "image/*",
                capture: "camera",
                className: "image-upload",
                onChange: this.displayImage
              }), a["default"].createElement("div", {className: "image-upload-control"}, a["default"].createElement("div", {className: "btn btn-default btn-school"}, a["default"].createElement("i", {className: "fa fa-camera"}), " Upload Photo"), a["default"].createElement("p", null, "Select an image from your computer or device."))), this.state.img && a["default"].createElement("div", null, a["default"].createElement("img", {
                src: this.state.img,
                height: "100",
                className: "image-upload-preview"
              }), a["default"].createElement("br", null), a["default"].createElement("div", {
                className: "btn btn-school btn-image-clear",
                onClick: this.clearImage
              }, a["default"].createElement("i", {className: "fa fa-times"}), " Clear Photo"))))));
            }
          }),
          I = a["default"].createClass({
            displayName: "Range",
            mixins: [m["default"]],
            render: function() {
              var e = {};
              e.type = "range", e.name = this.props.data.field_name, e.list = "tickmarks_" + this.props.data.field_name, e.min = this.props.data.min_value, e.max = this.props.data.max_value, e.step = this.props.data.step, e.defaultValue = void 0 !== this.props.defaultValue ? parseInt(this.props.defaultValue, 10) : parseInt(this.props.data.default_value, 10), this.props.mutable && (e.ref = "child_ref_" + this.props.data.field_name);
              for (var t = [],
                  i = parseInt(this.props.data.min_value, 10); i <= parseInt(this.props.data.max_value, 10); i += parseInt(this.props.data.step, 10))
                t.push(i);
              var n = 100 / (t.length - 1),
                  s = t.map(function(t, i) {
                    return a["default"].createElement("option", {key: e.list + "_" + i}, t);
                  }),
                  r = t.map(function(i, s) {
                    var r = {},
                        o = n;
                    return (0 === s || s === t.length - 1) && (o = n / 2), r.key = e.list + "_label_" + s, r.style = {width: o + "%"}, s === t.length - 1 && (r.style = {
                      width: o + "%",
                      textAlign: "right"
                    }), a["default"].createElement("label", r, i);
                  });
              return this.renderWithSortable(a["default"].createElement("div", {className: "rfb-item"}, !this.props.mutable && a["default"].createElement(o["default"], {
                parent: this.props.parent,
                editModeOn: this.props.editModeOn,
                data: this.props.data,
                onDestroy: this.props._onDestroy,
                onEdit: this.props.onEdit,
                "static": this.props.data["static"],
                required: this.props.data.required
              }), a["default"].createElement("div", {className: "form-group"}, a["default"].createElement("label", null, this.props.data.label, this.props.data.hasOwnProperty("required") && this.props.data.required === !0 && a["default"].createElement("span", {className: "label-required label label-danger"}, "Required")), a["default"].createElement("div", {className: "range"}, a["default"].createElement("div", {className: "clearfix"}, a["default"].createElement("span", {className: "pull-left"}, this.props.data.min_label), a["default"].createElement("span", {className: "pull-right"}, this.props.data.max_label)), a["default"].createElement(g["default"], {
                name: e.name,
                value: e.defaultValue,
                step: this.props.data.step,
                max: this.props.data.max_value,
                min: this.props.data.min_value
              })), a["default"].createElement("div", {className: "visible_marks"}, r), a["default"].createElement("datalist", {id: e.list}, s))));
            }
          });
      y.Header = b, y.Paragraph = _, y.LineBreak = E, y.TextInput = x, y.TextArea = w, y.Dropdown = k, y.Signature = P, y.Checkboxes = M, y.DatePicker = O, y.RadioButtons = D, y.Rating = T, y.Tags = C, y.HyperLink = N, y.Download = S, y.Camera = L, y.Range = I, e.exports = y;
    }, function(e, t, i) {
      (function(t) {
        "use strict";
        var i = function(e, i, n, s, a, r, o, l) {
          if ("production" !== t.env.NODE_ENV && void 0 === i)
            throw new Error("invariant requires an error message argument");
          if (!e) {
            var u;
            if (void 0 === i)
              u = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            else {
              var p = [n, s, a, r, o, l],
                  d = 0;
              u = new Error("Invariant Violation: " + i.replace(/%s/g, function() {
                return p[d++];
              }));
            }
            throw u.framesToPop = 1, u;
          }
        };
        e.exports = i;
      }).call(t, i(5));
    }, function(e, t) {
      "use strict";
      e.exports = {};
    }, function(e, t) {
      "use strict";
      e.exports = {};
    }, function(e, t, i) {
      "use strict";
      var n = i(2),
          s = i(8),
          a = i(50),
          r = i(47),
          o = {
            preEmit: 1,
            shouldEmit: 1
          };
      e.exports = function(e) {
        function t() {
          var t,
              i = 0;
          if (this.subscriptions = [], this.emitter = new n.EventEmitter, this.eventLabel = "change", r(this, e), this.init && n.isFunction(this.init) && this.init(), this.listenables)
            for (t = [].concat(this.listenables); i < t.length; i++)
              this.listenToMany(t[i]);
        }
        var l = i(14),
            u = i(9),
            p = i(3);
        e = e || {};
        for (var d in l)
          if (!o[d] && (u[d] || p[d]))
            throw new Error("Cannot override API method " + d + " in Reflux.StoreMethods. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead.");
        for (var h in e)
          if (!o[h] && (u[h] || p[h]))
            throw new Error("Cannot override API method " + h + " in store creation. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead.");
        e = a(e), n.extend(t.prototype, p, u, l, e);
        var c = new t;
        return s.createdStores.push(c), c;
      };
    }, function(e, t, i) {
      "use strict";
      function n(e, t, i) {
        return function() {
          var n,
              s = i.subscriptions,
              a = s ? s.indexOf(e) : -1;
          for (l.throwIf(-1 === a, "Tried to remove join already gone from subscriptions list!"), n = 0; n < t.length; n++)
            t[n]();
          s.splice(a, 1);
        };
      }
      function s(e) {
        e.listenablesEmitted = new Array(e.numberOfListenables), e.args = new Array(e.numberOfListenables);
      }
      function a(e, t) {
        return function() {
          var i = u.call(arguments);
          if (t.listenablesEmitted[e])
            switch (t.strategy) {
              case "strict":
                throw new Error("Strict join failed because listener triggered twice.");
              case "last":
                t.args[e] = i;
                break;
              case "all":
                t.args[e].push(i);
            }
          else
            t.listenablesEmitted[e] = !0, t.args[e] = "all" === t.strategy ? [i] : i;
          r(t);
        };
      }
      function r(e) {
        for (var t = 0; t < e.numberOfListenables; t++)
          if (!e.listenablesEmitted[t])
            return;
        e.callback.apply(e.listener, e.args), s(e);
      }
      var o = i(15),
          l = i(2),
          u = Array.prototype.slice,
          p = {
            strict: "joinStrict",
            first: "joinLeading",
            last: "joinTrailing",
            all: "joinConcat"
          };
      t.staticJoinCreator = function(e) {
        return function() {
          var t = u.call(arguments);
          return o({init: function() {
              this[p[e]].apply(this, t.concat("triggerAsync"));
            }});
        };
      }, t.instanceJoinCreator = function(e) {
        return function() {
          l.throwIf(arguments.length < 2, "Cannot create a join with less than 2 listenables!");
          var t,
              i,
              r = u.call(arguments),
              o = r.pop(),
              p = r.length,
              d = {
                numberOfListenables: p,
                callback: this[o] || o,
                listener: this,
                strategy: e
              },
              h = [];
          for (t = 0; p > t; t++)
            l.throwIf(this.validateListening(r[t]));
          for (t = 0; p > t; t++)
            h.push(r[t].listen(a(t, d), this));
          return s(d), i = {listenable: r}, i.stop = n(i, h, this), this.subscriptions = (this.subscriptions || []).concat(i), i;
        };
      };
    }, function(e, t, i) {
      var n = i(49);
      n.connect = i(51), n.connectFilter = i(52), n.ListenerMixin = i(10), n.listenTo = i(53), n.listenToMany = i(54), e.exports = n;
    }, function(e, t) {
      var i = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
          n = {};
      n.uuid = function(e, t) {
        var n,
            s = i,
            a = [];
        if (t = t || s.length, e)
          for (n = 0; e > n; n++)
            a[n] = s[0 | Math.random() * t];
        else {
          var r;
          for (a[8] = a[13] = a[18] = a[23] = "-", a[14] = "4", n = 0; 36 > n; n++)
            a[n] || (r = 0 | 16 * Math.random(), a[n] = s[19 == n ? 3 & r | 8 : r]);
        }
        return a.join("");
      }, n.uuidFast = function() {
        for (var e,
            t = i,
            n = new Array(36),
            s = 0,
            a = 0; 36 > a; a++)
          8 == a || 13 == a || 18 == a || 23 == a ? n[a] = "-" : 14 == a ? n[a] = "4" : (2 >= s && (s = 33554432 + 16777216 * Math.random() | 0), e = 15 & s, s >>= 4, n[a] = t[19 == a ? 3 & e | 8 : e]);
        return n.join("");
      }, n.uuidCompact = function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
          var t = 16 * Math.random() | 0,
              i = "x" == e ? t : 3 & t | 8;
          return i.toString(16);
        });
      }, e.exports = n;
    }, function(e, t) {
      e.exports = __WEBPACK_EXTERNAL_MODULE_19__;
    }, function(e, t, i) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function s(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function a(e, t) {
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
      var r = function() {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, i, n) {
          return i && e(t.prototype, i), n && e(t, n), t;
        };
      }(),
          o = function(e, t, i) {
            for (var n = !0; n; ) {
              var s = e,
                  a = t,
                  r = i;
              o = u = l = void 0, n = !1, null === s && (s = Function.prototype);
              var o = Object.getOwnPropertyDescriptor(s, a);
              if (void 0 !== o) {
                if ("value" in o)
                  return o.value;
                var l = o.get;
                return void 0 === l ? void 0 : l.call(r);
              }
              var u = Object.getPrototypeOf(s);
              if (null === u)
                return void 0;
              e = u, t = a, i = r, n = !0;
            }
          },
          l = i(1),
          u = n(l),
          p = i(18),
          d = n(p),
          h = function(e) {
            function t(e) {
              s(this, t), o(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e), this.state = {
                element: this.props.element,
                data: this.props.data,
                dirty: !1
              };
            }
            return a(t, e), r(t, [{
              key: "_setValue",
              value: function(e) {
                return e.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
              }
            }, {
              key: "editOption",
              value: function(e, t) {
                var i = this.state.element;
                i.options[e].text = t.target.value, i.options[e].value = this._setValue(t.target.value), this.setState({
                  element: i,
                  dirty: !0
                });
              }
            }, {
              key: "editOptionCorrect",
              value: function(e, t) {
                var i = this.state.element;
                i.options[e].hasOwnProperty("correct") ? delete i.options[e].correct : i.options[e].correct = !0, this.setState({element: i}), this.props.updateElement.call(this.props.preview, i);
              }
            }, {
              key: "updateOption",
              value: function() {
                var e = this.state.element;
                this.state.dirty && (this.props.updateElement.call(this.props.preview, e), this.setState({dirty: !1}));
              }
            }, {
              key: "addOption",
              value: function(e) {
                var t = this.state.element;
                t.options.splice(e + 1, 0, {
                  value: "",
                  text: "",
                  key: d["default"].uuid()
                }), this.props.updateElement.call(this.props.preview, t);
              }
            }, {
              key: "removeOption",
              value: function(e) {
                var t = this.state.element;
                t.options.splice(e, 1), this.props.updateElement.call(this.props.preview, t);
              }
            }, {
              key: "render",
              value: function() {
                var e = this;
                return u["default"].createElement("div", {className: "dynamic-option-list"}, u["default"].createElement("ul", null, u["default"].createElement("li", null, u["default"].createElement("div", {className: "row"}, u["default"].createElement("div", {className: "col-sm-8"}, u["default"].createElement("b", null, "Options")), u["default"].createElement("div", {className: "col-sm-4"}, u["default"].createElement("b", null, "Correct")))), this.props.element.options.map(function(t, i) {
                  var n = "edit_" + t.key;
                  return u["default"].createElement("li", {
                    className: "clearfix",
                    key: n
                  }, u["default"].createElement("div", {className: "row"}, u["default"].createElement("div", {className: "col-sm-8"}, u["default"].createElement("input", {
                    tabIndex: i + 1,
                    className: "form-control",
                    style: {width: "100%"},
                    type: "text",
                    name: "text_" + i,
                    placeholder: "Option text",
                    value: t.text,
                    onBlur: e.updateOption.bind(e),
                    onChange: e.editOption.bind(e, i)
                  })), u["default"].createElement("div", {className: "col-sm-1"}, u["default"].createElement("input", {
                    className: "form-control",
                    type: "checkbox",
                    value: "1",
                    onChange: e.editOptionCorrect.bind(e, i),
                    checked: t.hasOwnProperty("correct")
                  })), u["default"].createElement("div", {className: "col-sm-3"}, u["default"].createElement("div", {className: "dynamic-options-actions-buttons"}, u["default"].createElement("button", {
                    onClick: e.addOption.bind(e, i),
                    className: "btn btn-success"
                  }, u["default"].createElement("i", {className: "fa fa-plus-circle"})), i > 0 && u["default"].createElement("button", {
                    onClick: e.removeOption.bind(e, i),
                    className: "btn btn-danger"
                  }, u["default"].createElement("i", {className: "fa fa-minus-circle"}))))));
                })));
              }
            }]), t;
          }(u["default"].Component);
      t["default"] = h, e.exports = t["default"];
    }, function(e, t, i) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function s(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function a(e, t) {
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
      var r = function() {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, i, n) {
          return i && e(t.prototype, i), n && e(t, n), t;
        };
      }(),
          o = function(e, t, i) {
            for (var n = !0; n; ) {
              var s = e,
                  a = t,
                  r = i;
              o = u = l = void 0, n = !1, null === s && (s = Function.prototype);
              var o = Object.getOwnPropertyDescriptor(s, a);
              if (void 0 !== o) {
                if ("value" in o)
                  return o.value;
                var l = o.get;
                return void 0 === l ? void 0 : l.call(r);
              }
              var u = Object.getPrototypeOf(s);
              if (null === u)
                return void 0;
              e = u, t = a, i = r, n = !0;
            }
          },
          l = i(1),
          u = n(l),
          p = i(20),
          d = n(p),
          h = i(44),
          c = n(h),
          f = function(e) {
            function t(e) {
              s(this, t), o(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e), this.state = {
                element: this.props.element,
                data: this.props.data,
                dirty: !1
              };
            }
            return a(t, e), r(t, [{
              key: "toggleRequired",
              value: function() {
                this.state.element;
              }
            }, {
              key: "editElementProp",
              value: function(e, t, i) {
                var n = this,
                    s = this.state.element;
                s[e] = i.target[t], this.setState({
                  element: s,
                  dirty: !0
                }, function() {
                  "checked" === t && n.updateElement();
                });
              }
            }, {
              key: "updateElement",
              value: function() {
                var e = this.state.element;
                this.state.dirty && (this.props.updateElement.call(this.props.preview, e), this.setState({dirty: !1}));
              }
            }, {
              key: "render",
              value: function() {
                var e = this.props.element.hasOwnProperty("required") ? this.props.element.required : !1,
                    t = this.props.files.length ? this.props.files : [];
                return (t.length < 1 || t.length > 0 && "" !== t[0].id) && t.unshift({
                  id: "",
                  file_name: ""
                }), u["default"].createElement("div", null, u["default"].createElement("div", {className: "clearfix"}, u["default"].createElement("h4", {className: "pull-left"}, this.props.element.text), u["default"].createElement("i", {
                  className: "pull-right fa fa-times dismiss-edit",
                  onClick: this.props.manualEditModeOff
                })), this.props.element.hasOwnProperty("content") && u["default"].createElement("div", {className: "form-group"}, u["default"].createElement("label", null, "Text to display:"), u["default"].createElement(c["default"], {
                  type: "text",
                  className: "form-control",
                  defaultValue: this.props.element.content,
                  onBlur: this.updateElement.bind(this),
                  onChange: this.editElementProp.bind(this, "content", "value")
                })), this.props.element.hasOwnProperty("file_path") && u["default"].createElement("div", {className: "form-group"}, u["default"].createElement("label", null, "Choose file:"), u["default"].createElement("select", {
                  className: "form-control",
                  defaultValue: this.props.element.file_path,
                  onBlur: this.updateElement.bind(this),
                  onChange: this.editElementProp.bind(this, "file_path", "value")
                }, t.map(function(e) {
                  var t = "file_" + e.id;
                  return u["default"].createElement("option", {
                    value: e.id,
                    key: t
                  }, e.file_name);
                }))), this.props.element.hasOwnProperty("href") && u["default"].createElement("div", {className: "form-group"}, u["default"].createElement("label", null, "Link to:"), u["default"].createElement(c["default"], {
                  type: "text",
                  className: "form-control",
                  defaultValue: this.props.element.href,
                  onBlur: this.updateElement.bind(this),
                  onChange: this.editElementProp.bind(this, "href", "value")
                })), this.props.element.hasOwnProperty("label") && u["default"].createElement("div", {className: "form-group"}, u["default"].createElement("label", null, "Display Label"), u["default"].createElement("input", {
                  type: "text",
                  className: "form-control",
                  defaultValue: this.props.element.label,
                  onBlur: this.updateElement.bind(this),
                  onChange: this.editElementProp.bind(this, "label", "value")
                }), u["default"].createElement("br", null), u["default"].createElement("label", null, u["default"].createElement("input", {
                  type: "checkbox",
                  checked: e,
                  value: !0,
                  onChange: this.editElementProp.bind(this, "required", "checked")
                }), " Required")), this.props.element.hasOwnProperty("step") && u["default"].createElement("div", {className: "form-group"}, u["default"].createElement("div", {className: "form-group-range"}, u["default"].createElement("label", null, "Step"), u["default"].createElement("input", {
                  type: "number",
                  className: "form-control",
                  defaultValue: this.props.element.step,
                  onBlur: this.updateElement.bind(this),
                  onChange: this.editElementProp.bind(this, "step", "value")
                }))), this.props.element.hasOwnProperty("min_value") && u["default"].createElement("div", {className: "form-group"}, u["default"].createElement("div", {className: "form-group-range"}, u["default"].createElement("label", null, "Min"), u["default"].createElement("input", {
                  type: "number",
                  className: "form-control",
                  defaultValue: this.props.element.min_value,
                  onBlur: this.updateElement.bind(this),
                  onChange: this.editElementProp.bind(this, "min_value", "value")
                }), u["default"].createElement("input", {
                  type: "text",
                  className: "form-control",
                  defaultValue: this.props.element.min_label,
                  onBlur: this.updateElement.bind(this),
                  onChange: this.editElementProp.bind(this, "min_label", "value")
                }))), this.props.element.hasOwnProperty("max_value") && u["default"].createElement("div", {className: "form-group"}, u["default"].createElement("div", {className: "form-group-range"}, u["default"].createElement("label", null, "Max"), u["default"].createElement("input", {
                  type: "number",
                  className: "form-control",
                  defaultValue: this.props.element.max_value,
                  onBlur: this.updateElement.bind(this),
                  onChange: this.editElementProp.bind(this, "max_value", "value")
                }), u["default"].createElement("input", {
                  type: "text",
                  className: "form-control",
                  defaultValue: this.props.element.max_label,
                  onBlur: this.updateElement.bind(this),
                  onChange: this.editElementProp.bind(this, "max_label", "value")
                }))), this.props.element.hasOwnProperty("default_value") && u["default"].createElement("div", {className: "form-group"}, u["default"].createElement("div", {className: "form-group-range"}, u["default"].createElement("label", null, "Default Selected"), u["default"].createElement("input", {
                  type: "number",
                  className: "form-control",
                  defaultValue: this.props.element.default_value,
                  onBlur: this.updateElement.bind(this),
                  onChange: this.editElementProp.bind(this, "default_value", "value")
                }))), this.props.showCorrectColumn && this.props.element.canHaveAnswer && !this.props.element.hasOwnProperty("options") && u["default"].createElement("div", {className: "form-group"}, u["default"].createElement("label", null, "Correct Answer"), u["default"].createElement("input", {
                  type: "text",
                  className: "form-control",
                  defaultValue: this.props.element.correct,
                  onBlur: this.updateElement.bind(this),
                  onChange: this.editElementProp.bind(this, "correct", "value")
                })), this.props.element.hasOwnProperty("options") && u["default"].createElement(d["default"], {
                  showCorrectColumn: this.props.showCorrectColumn,
                  data: this.props.preview.state.data,
                  updateElement: this.props.updateElement,
                  preview: this.props.preview,
                  element: this.props.element,
                  key: this.props.element.options.length
                }));
              }
            }]), t;
          }(u["default"].Component);
      t["default"] = f, f.defaultProps = {className: "edit-element-fields"}, e.exports = t["default"];
    }, function(e, t, i) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function s(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function a(e, t) {
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
      var r = function() {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, i, n) {
          return i && e(t.prototype, i), n && e(t, n), t;
        };
      }(),
          o = function(e, t, i) {
            for (var n = !0; n; ) {
              var s = e,
                  a = t,
                  r = i;
              o = u = l = void 0, n = !1, null === s && (s = Function.prototype);
              var o = Object.getOwnPropertyDescriptor(s, a);
              if (void 0 !== o) {
                if ("value" in o)
                  return o.value;
                var l = o.get;
                return void 0 === l ? void 0 : l.call(r);
              }
              var u = Object.getPrototypeOf(s);
              if (null === u)
                return void 0;
              e = u, t = a, i = r, n = !0;
            }
          },
          l = i(1),
          u = n(l),
          p = function(e) {
            function t(e) {
              s(this, t), o(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e), this.state = {errors: []};
            }
            return a(t, e), r(t, [{
              key: "componentWillMount",
              value: function() {
                var e = this;
                this.subscription = this.props.emitter.addListener("formValidation", function(t) {
                  e.setState({errors: t});
                });
              }
            }, {
              key: "componentWillUnmount",
              value: function() {
                this.subscription.remove();
              }
            }, {
              key: "dismissModal",
              value: function(e) {
                e.preventDefault(), this.setState({errors: []});
              }
            }, {
              key: "render",
              value: function() {
                var e = this.state.errors.map(function(e, t) {
                  return u["default"].createElement("li", {key: "error_" + t}, e);
                });
                return u["default"].createElement("div", null, this.state.errors.length > 0 && u["default"].createElement("div", {className: "alert alert-danger validation-error"}, u["default"].createElement("div", {className: "clearfix"}, u["default"].createElement("i", {className: "fa fa-exclamation-triangle pull-left"}), u["default"].createElement("ul", {className: "pull-left"}, e)), u["default"].createElement("div", {className: "clearfix"}, u["default"].createElement("a", {
                  className: "pull-right btn btn-default btn-sm btn-danger",
                  onClick: this.dismissModal.bind(this)
                }, "Dismiss"))));
              }
            }]), t;
          }(u["default"].Component);
      t["default"] = p, e.exports = t["default"];
    }, function(e, t, i) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function s(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function a(e, t) {
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
      var r = function() {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, i, n) {
          return i && e(t.prototype, i), n && e(t, n), t;
        };
      }(),
          o = function(e, t, i) {
            for (var n = !0; n; ) {
              var s = e,
                  a = t,
                  r = i;
              o = u = l = void 0, n = !1, null === s && (s = Function.prototype);
              var o = Object.getOwnPropertyDescriptor(s, a);
              if (void 0 !== o) {
                if ("value" in o)
                  return o.value;
                var l = o.get;
                return void 0 === l ? void 0 : l.call(r);
              }
              var u = Object.getPrototypeOf(s);
              if (null === u)
                return void 0;
              e = u, t = a, i = r, n = !0;
            }
          },
          l = i(1),
          u = n(l),
          p = i(29),
          d = i(22),
          h = n(d),
          c = i(11),
          f = function(e) {
            function t(e) {
              s(this, t), o(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e), this.emitter = new p.EventEmitter;
            }
            return a(t, e), r(t, [{
              key: "_checkboxesDefaultValue",
              value: function(e) {
                var t = this,
                    i = [];
                return e.options.forEach(function(e) {
                  i.push(t.props.answer_data["option_" + e.key]);
                }), i;
              }
            }, {
              key: "_isIncorrect",
              value: function(e) {
                var t = this,
                    i = !1;
                if (e.canHaveAnswer)
                  if ("Checkboxes" === e.element || "RadioButtons" === e.element)
                    e.options.forEach(function(n) {
                      var s = u["default"].findDOMNode(t.refs[e.field_name].refs["child_ref_" + n.key]);
                      (n.hasOwnProperty("correct") && !s.checked || !n.hasOwnProperty("correct") && s.checked) && (i = !0);
                    });
                  else {
                    var n = null;
                    "Rating" === e.element ? (n = {}, n.value = this.refs[e.field_name].refs["child_ref_" + e.field_name].state.rating, n.value.toString() !== e.correct && (i = !0)) : ("Tags" === e.element ? (n = {}, n.value = this.refs[e.field_name].refs["child_ref_" + e.field_name].state.value) : (n = u["default"].findDOMNode(this.refs[e.field_name].refs["child_ref_" + e.field_name]), n.value = n.value.trim()), n.value.toLowerCase() !== e.correct.trim().toLowerCase() && (i = !0));
                  }
                return i;
              }
            }, {
              key: "_isInvalid",
              value: function(e) {
                var t = this,
                    i = !1;
                if (e.required === !0)
                  if ("Checkboxes" === e.element || "RadioButtons" === e.element) {
                    var n = 0;
                    e.options.forEach(function(i) {
                      var s = u["default"].findDOMNode(t.refs[e.field_name].refs["child_ref_" + i.key]);
                      s.checked && (n += 1);
                    }), 1 > n && (i = !0);
                  } else {
                    var s = null;
                    "Rating" === e.element ? (s = {}, s.value = this.refs[e.field_name].refs["child_ref_" + e.field_name].state.rating, 0 === s.value && (i = !0)) : ("Tags" === e.element ? (s = {}, s.value = this.refs[e.field_name].refs["child_ref_" + e.field_name].state.value) : (s = u["default"].findDOMNode(this.refs[e.field_name].refs["child_ref_" + e.field_name]), s.value = s.value.trim()), s.value.length < 1 && (i = !0));
                  }
                return i;
              }
            }, {
              key: "_getSignatureImg",
              value: function(e) {
                var t = this.refs[e.field_name].refs["canvas_" + e.field_name],
                    i = t.toDataURL().replace("data:image/png;base64,", ""),
                    n = t.isEmpty(),
                    s = u["default"].findDOMNode(this.refs[e.field_name].refs["child_ref_" + e.field_name]);
                return n ? s.value = "" : s.value = i, !0;
              }
            }, {
              key: "handleSubmit",
              value: function(e) {
                var t = this;
                e.preventDefault();
                var i = u["default"].findDOMNode(this.refs.form),
                    n = [];
                this.props.data.forEach(function(e) {
                  "Signature" === e.element && t._getSignatureImg(e), t._isInvalid(e) && n.push(e.label + " is required!"), t.props.validateForCorrectness && t._isIncorrect(e) && n.push(e.label + " was answered incorrectly!");
                }), this.emitter.emit("formValidation", n), n.length < 1 && i.submit();
              }
            }, {
              key: "render",
              value: function() {
                var e = this,
                    t = this.props.data.map(function(t) {
                      switch (t.element) {
                        case "Header":
                          return u["default"].createElement(c.Header, {
                            mutable: !0,
                            key: "form_" + t.id,
                            data: t
                          });
                        case "Paragraph":
                          return u["default"].createElement(c.Paragraph, {
                            mutable: !0,
                            key: "form_" + t.id,
                            data: t
                          });
                        case "LineBreak":
                          return u["default"].createElement(c.LineBreak, {
                            mutable: !0,
                            key: "form_" + t.id,
                            data: t
                          });
                        case "TextInput":
                          return u["default"].createElement(c.TextInput, {
                            ref: t.field_name,
                            handleChange: e.handleChange,
                            mutable: !0,
                            key: "form_" + t.id,
                            data: t,
                            defaultValue: e.props.answer_data[t.field_name]
                          });
                        case "TextArea":
                          return u["default"].createElement(c.TextArea, {
                            ref: t.field_name,
                            handleChange: e.handleChange,
                            mutable: !0,
                            key: "form_" + t.id,
                            data: t,
                            defaultValue: e.props.answer_data[t.field_name]
                          });
                        case "Dropdown":
                          return u["default"].createElement(c.Dropdown, {
                            ref: t.field_name,
                            handleChange: e.handleChange,
                            mutable: !0,
                            key: "form_" + t.id,
                            data: t,
                            defaultValue: e.props.answer_data[t.field_name]
                          });
                        case "Checkboxes":
                          return u["default"].createElement(c.Checkboxes, {
                            ref: t.field_name,
                            handleChange: e.handleChange,
                            mutable: !0,
                            key: "form_" + t.id,
                            data: t,
                            defaultValue: e._checkboxesDefaultValue(t)
                          });
                        case "DatePicker":
                          return u["default"].createElement(c.DatePicker, {
                            ref: t.field_name,
                            handleChange: e.handleChange,
                            mutable: !0,
                            key: "form_" + t.id,
                            data: t,
                            defaultValue: e.props.answer_data[t.field_name]
                          });
                        case "RadioButtons":
                          return u["default"].createElement(c.RadioButtons, {
                            ref: t.field_name,
                            handleChange: e.handleChange,
                            mutable: !0,
                            key: "form_" + t.id,
                            data: t,
                            defaultValue: e.props.answer_data[t.field_name]
                          });
                        case "Rating":
                          return u["default"].createElement(c.Rating, {
                            ref: t.field_name,
                            handleChange: e.handleChange,
                            mutable: !0,
                            key: "form_" + t.id,
                            data: t,
                            defaultValue: e.props.answer_data[t.field_name]
                          });
                        case "Tags":
                          return u["default"].createElement(c.Tags, {
                            ref: t.field_name,
                            handleChange: e.handleChange,
                            mutable: !0,
                            key: "form_" + t.id,
                            data: t,
                            defaultValue: e.props.answer_data[t.field_name]
                          });
                        case "Signature":
                          return u["default"].createElement(c.Signature, {
                            ref: t.field_name,
                            mutable: !0,
                            key: "form_" + t.id,
                            data: t,
                            defaultValue: e.props.answer_data[t.field_name]
                          });
                        case "HyperLink":
                          return u["default"].createElement(c.HyperLink, {
                            mutable: !0,
                            key: "form_" + t.id,
                            data: t
                          });
                        case "Download":
                          return u["default"].createElement(c.Download, {
                            download_path: e.props.download_path,
                            mutable: !0,
                            key: "form_" + t.id,
                            data: t
                          });
                        case "Camera":
                          return u["default"].createElement(c.Camera, {
                            mutable: !0,
                            key: "form_" + t.id,
                            data: t
                          });
                        case "Range":
                          return u["default"].createElement(c.Range, {
                            ref: t.field_name,
                            handleChange: e.handleChange,
                            mutable: !0,
                            key: "form_" + t.id,
                            data: t,
                            defaultValue: e.props.answer_data[t.field_name]
                          });
                      }
                    }),
                    i = {display: "none"};
                return u["default"].createElement("div", null, u["default"].createElement(h["default"], {emitter: this.emitter}), u["default"].createElement("div", {className: "react-form-builder-form"}, u["default"].createElement("form", {
                  encType: "multipart/form-data",
                  ref: "form",
                  action: this.props.form_action,
                  onSubmit: this.handleSubmit.bind(this),
                  method: this.props.form_method
                }, this.props.authenticity_token && u["default"].createElement("div", {style: i}, u["default"].createElement("input", {
                  name: "utf8",
                  type: "hidden",
                  value: "✓"
                }), u["default"].createElement("input", {
                  name: "authenticity_token",
                  type: "hidden",
                  value: this.props.authenticity_token
                }), u["default"].createElement("input", {
                  name: "task_id",
                  type: "hidden",
                  value: this.props.task_id
                })), t, u["default"].createElement("input", {
                  type: "submit",
                  className: "btn btn-school btn-big btn-agree",
                  value: "Submit"
                }), u["default"].createElement("a", {
                  href: this.props.back_action,
                  className: "btn btn-default btn-cancel btn-big"
                }, " Cancel"))));
              }
            }]), t;
          }(u["default"].Component);
      t["default"] = f, f.defaultProps = {validateForCorrectness: !1}, e.exports = t["default"];
    }, function(e, t, i) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function s(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function a(e, t) {
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
      var r = function() {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, i, n) {
          return i && e(t.prototype, i), n && e(t, n), t;
        };
      }(),
          o = function(e, t, i) {
            for (var n = !0; n; ) {
              var s = e,
                  a = t,
                  r = i;
              o = u = l = void 0, n = !1, null === s && (s = Function.prototype);
              var o = Object.getOwnPropertyDescriptor(s, a);
              if (void 0 !== o) {
                if ("value" in o)
                  return o.value;
                var l = o.get;
                return void 0 === l ? void 0 : l.call(r);
              }
              var u = Object.getPrototypeOf(s);
              if (null === u)
                return void 0;
              e = u, t = a, i = r, n = !0;
            }
          },
          l = i(1),
          u = n(l),
          p = function(e) {
            function t() {
              s(this, t), o(Object.getPrototypeOf(t.prototype), "constructor", this).apply(this, arguments);
            }
            return a(t, e), r(t, [{
              key: "render",
              value: function() {
                return u["default"].createElement("div", {className: "toolbar-header"}, u["default"].createElement("span", {className: "label label-default"}, this.props.data.text), u["default"].createElement("div", {className: "toolbar-header-buttons"}, "LineBreak" !== this.props.data.element && u["default"].createElement("div", {
                  className: "btn is-isolated btn-school",
                  onClick: this.props.editModeOn.bind(this.props.parent, this.props.data)
                }, u["default"].createElement("i", {className: "is-isolated fa fa-pencil-square-o"})), u["default"].createElement("div", {
                  className: "btn is-isolated btn-school",
                  onClick: this.props.onDestroy.bind(this, this.props.data)
                }, u["default"].createElement("i", {className: "is-isolated fa fa-trash-o"}))));
              }
            }]), t;
          }(u["default"].Component);
      t["default"] = p, e.exports = t["default"];
    }, function(e, t, i) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function s(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function a(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
      }
      var r = function() {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, i, n) {
          return i && e(t.prototype, i), n && e(t, n), t;
        };
      }(),
          o = function(e, t, i) {
            for (var n = !0; n; ) {
              var s = e,
                  a = t,
                  r = i;
              o = u = l = void 0, n = !1, null === s && (s = Function.prototype);
              var o = Object.getOwnPropertyDescriptor(s, a);
              if (void 0 !== o) {
                if ("value" in o)
                  return o.value;
                var l = o.get;
                return void 0 === l ? void 0 : l.call(r);
              }
              var u = Object.getPrototypeOf(s);
              if (null === u)
                return void 0;
              e = u, t = a, i = r, n = !0;
            }
          },
          l = i(1),
          u = n(l),
          p = i(26),
          d = n(p),
          h = i(28),
          c = n(h),
          f = i(6),
          m = (n(f), i(23)),
          v = n(m),
          g = {},
          y = function(e) {
            function t(e) {
              s(this, t), o(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e), this.state = {
                editMode: !1,
                editElement: null
              }, document.addEventListener("click", this.editModeOff.bind(this));
            }
            return a(t, e), r(t, [{
              key: "editModeOn",
              value: function(e, t) {
                t.stopPropagation(), this.state.editMode ? this.setState({
                  editMode: !this.state.editMode,
                  editElement: null
                }) : this.setState({
                  editMode: !this.state.editMode,
                  editElement: e
                });
              }
            }, {
              key: "manualEditModeOff",
              value: function() {
                this.state.editMode && this.setState({
                  editMode: !1,
                  editElement: null
                });
              }
            }, {
              key: "editModeOff",
              value: function(e) {
                var t = $(".edit-form"),
                    i = !t.is(e.target) && 0 === t.has(e.target).length;
                this.state.editMode && i && this.setState({
                  editMode: !1,
                  editElement: null
                });
              }
            }, {
              key: "render",
              value: function() {
                var e = {};
                return this.props.toolbarItems && (e.items = this.props.toolbarItems), u["default"].createElement("div", null, u["default"].createElement("div", {className: "react-form-builder clearfix"}, u["default"].createElement("div", null, u["default"].createElement(d["default"], {
                  files: this.props.files,
                  manualEditModeOff: this.manualEditModeOff.bind(this),
                  parent: this,
                  url: this.props.url,
                  saveUrl: this.props.saveUrl,
                  editModeOn: this.editModeOn,
                  editMode: this.state.editMode,
                  editElement: this.state.editElement
                }), u["default"].createElement(c["default"], e))));
              }
            }]), t;
          }(u["default"].Component);
      g.ReactFormBuilder = y, g.ReactFormGenerator = v["default"], e.exports = g;
    }, function(e, t, i) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function s(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function a(e, t) {
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
      var r = function() {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, i, n) {
          return i && e(t.prototype, i), n && e(t, n), t;
        };
      }(),
          o = function(e, t, i) {
            for (var n = !0; n; ) {
              var s = e,
                  a = t,
                  r = i;
              o = u = l = void 0, n = !1, null === s && (s = Function.prototype);
              var o = Object.getOwnPropertyDescriptor(s, a);
              if (void 0 !== o) {
                if ("value" in o)
                  return o.value;
                var l = o.get;
                return void 0 === l ? void 0 : l.call(r);
              }
              var u = Object.getPrototypeOf(s);
              if (null === u)
                return void 0;
              e = u, t = a, i = r, n = !0;
            }
          },
          l = i(1),
          u = n(l),
          p = i(41),
          d = n(p),
          h = i(55),
          c = n(h),
          f = i(6),
          m = n(f),
          v = i(11),
          g = i(21),
          y = n(g),
          b = function(e) {
            function t(e) {
              s(this, t), o(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e), this.state = {data: []};
              var i = this.props.url ? this.props.url : this.props.data ? this.props.data : [],
                  n = this.props.saveUrl ? this.props.saveUrl : "";
              c["default"].load(i, n), c["default"].listen(this._onChange.bind(this));
            }
            return a(t, e), r(t, [{
              key: "_setValue",
              value: function(e) {
                return e.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
              }
            }, {
              key: "updateElement",
              value: function(e) {
                for (var t = this.state.data,
                    i = !1,
                    n = 0,
                    s = t.length; s > n; n++)
                  if (e.id === t[n].id) {
                    t[n] = e, i = !0;
                    break;
                  }
                i && m["default"].saveData(t);
              }
            }, {
              key: "_onChange",
              value: function(e) {
                this.setState({data: e});
              }
            }, {
              key: "_onDestroy",
              value: function(e) {
                m["default"].deleteElement(e);
              }
            }, {
              key: "handleSort",
              value: function(e) {
                for (var t = [],
                    i = this.state.data,
                    n = 0,
                    s = 0,
                    a = i.length; a > s; s++)
                  n = e.indexOf(i[s].id), t[n] = i[s];
                m["default"].saveData(t), this.state.data = t;
              }
            }, {
              key: "render",
              value: function() {
                var e = this,
                    t = this.props.className;
                this.props.editMode && (t += " is-editing");
                var i = this.state.data.map(function(t) {
                  switch (t.element) {
                    case "Header":
                      return u["default"].createElement(v.Header, {
                        mutable: !1,
                        parent: e.props.parent,
                        editModeOn: e.props.editModeOn,
                        isDraggable: !0,
                        key: t.id,
                        sortData: t.id,
                        data: t,
                        _onDestroy: e._onDestroy
                      });
                    case "Paragraph":
                      return u["default"].createElement(v.Paragraph, {
                        mutable: !1,
                        parent: e.props.parent,
                        editModeOn: e.props.editModeOn,
                        isDraggable: !0,
                        key: t.id,
                        sortData: t.id,
                        data: t,
                        _onDestroy: e._onDestroy
                      });
                    case "LineBreak":
                      return u["default"].createElement(v.LineBreak, {
                        mutable: !1,
                        parent: e.props.parent,
                        editModeOn: e.props.editModeOn,
                        isDraggable: !0,
                        key: t.id,
                        sortData: t.id,
                        data: t,
                        _onDestroy: e._onDestroy
                      });
                    case "TextInput":
                      return u["default"].createElement(v.TextInput, {
                        mutable: !1,
                        parent: e.props.parent,
                        editModeOn: e.props.editModeOn,
                        isDraggable: !0,
                        key: t.id,
                        sortData: t.id,
                        data: t,
                        _onDestroy: e._onDestroy
                      });
                    case "TextArea":
                      return u["default"].createElement(v.TextArea, {
                        mutable: !1,
                        parent: e.props.parent,
                        editModeOn: e.props.editModeOn,
                        isDraggable: !0,
                        key: t.id,
                        sortData: t.id,
                        data: t,
                        _onDestroy: e._onDestroy
                      });
                    case "Dropdown":
                      return u["default"].createElement(v.Dropdown, {
                        mutable: !1,
                        parent: e.props.parent,
                        editModeOn: e.props.editModeOn,
                        isDraggable: !0,
                        key: t.id,
                        sortData: t.id,
                        data: t,
                        _onDestroy: e._onDestroy
                      });
                    case "Checkboxes":
                      return u["default"].createElement(v.Checkboxes, {
                        mutable: !1,
                        parent: e.props.parent,
                        editModeOn: e.props.editModeOn,
                        isDraggable: !0,
                        key: t.id,
                        sortData: t.id,
                        data: t,
                        _onDestroy: e._onDestroy
                      });
                    case "DatePicker":
                      return u["default"].createElement(v.DatePicker, {
                        mutable: !1,
                        parent: e.props.parent,
                        editModeOn: e.props.editModeOn,
                        isDraggable: !0,
                        key: t.id,
                        sortData: t.id,
                        data: t,
                        _onDestroy: e._onDestroy
                      });
                    case "RadioButtons":
                      return u["default"].createElement(v.RadioButtons, {
                        mutable: !1,
                        parent: e.props.parent,
                        editModeOn: e.props.editModeOn,
                        isDraggable: !0,
                        key: t.id,
                        sortData: t.id,
                        data: t,
                        _onDestroy: e._onDestroy
                      });
                    case "Rating":
                      return u["default"].createElement(v.Rating, {
                        mutable: !1,
                        parent: e.props.parent,
                        editModeOn: e.props.editModeOn,
                        isDraggable: !0,
                        key: t.id,
                        sortData: t.id,
                        data: t,
                        _onDestroy: e._onDestroy
                      });
                    case "Tags":
                      return u["default"].createElement(v.Tags, {
                        mutable: !1,
                        parent: e.props.parent,
                        editModeOn: e.props.editModeOn,
                        isDraggable: !0,
                        key: t.id,
                        sortData: t.id,
                        data: t,
                        _onDestroy: e._onDestroy
                      });
                    case "Signature":
                      return u["default"].createElement(v.Signature, {
                        mutable: !1,
                        parent: e.props.parent,
                        editModeOn: e.props.editModeOn,
                        isDraggable: !0,
                        key: t.id,
                        sortData: t.id,
                        data: t,
                        _onDestroy: e._onDestroy
                      });
                    case "HyperLink":
                      return u["default"].createElement(v.HyperLink, {
                        mutable: !1,
                        parent: e.props.parent,
                        editModeOn: e.props.editModeOn,
                        isDraggable: !0,
                        key: t.id,
                        sortData: t.id,
                        data: t,
                        _onDestroy: e._onDestroy
                      });
                    case "Download":
                      return u["default"].createElement(v.Download, {
                        mutable: !1,
                        parent: e.props.parent,
                        editModeOn: e.props.editModeOn,
                        isDraggable: !0,
                        key: t.id,
                        sortData: t.id,
                        data: t,
                        _onDestroy: e._onDestroy
                      });
                    case "Camera":
                      return u["default"].createElement(v.Camera, {
                        mutable: !1,
                        parent: e.props.parent,
                        editModeOn: e.props.editModeOn,
                        isDraggable: !0,
                        key: t.id,
                        sortData: t.id,
                        data: t,
                        _onDestroy: e._onDestroy
                      });
                    case "Range":
                      return u["default"].createElement(v.Range, {
                        mutable: !1,
                        parent: e.props.parent,
                        editModeOn: e.props.editModeOn,
                        isDraggable: !0,
                        key: t.id,
                        sortData: t.id,
                        data: t,
                        _onDestroy: e._onDestroy
                      });
                  }
                });
                return u["default"].createElement("div", {className: t}, u["default"].createElement("div", {className: "edit-form"}, null !== this.props.editElement && u["default"].createElement(y["default"], {
                  showCorrectColumn: this.props.showCorrectColumn,
                  files: this.props.files,
                  manualEditModeOff: this.props.manualEditModeOff,
                  preview: this,
                  element: this.props.editElement,
                  updateElement: this.updateElement
                })), u["default"].createElement(d["default"], {
                  sensitivity: 0,
                  key: this.state.data.length,
                  onSort: this.handleSort.bind(this)
                }, i));
              }
            }]), t;
          }(u["default"].Component);
      t["default"] = b, b.defaultProps = {
        showCorrectColumn: !1,
        files: [],
        editMode: !1,
        editElement: null,
        className: "react-form-builder-preview pull-left"
      }, e.exports = t["default"];
    }, function(e, t, i) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function s(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function a(e, t) {
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
      var r = function() {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, i, n) {
          return i && e(t.prototype, i), n && e(t, n), t;
        };
      }(),
          o = function(e, t, i) {
            for (var n = !0; n; ) {
              var s = e,
                  a = t,
                  r = i;
              o = u = l = void 0, n = !1, null === s && (s = Function.prototype);
              var o = Object.getOwnPropertyDescriptor(s, a);
              if (void 0 !== o) {
                if ("value" in o)
                  return o.value;
                var l = o.get;
                return void 0 === l ? void 0 : l.call(r);
              }
              var u = Object.getPrototypeOf(s);
              if (null === u)
                return void 0;
              e = u, t = a, i = r, n = !0;
            }
          },
          l = i(1),
          u = n(l),
          p = function(e) {
            function t() {
              s(this, t), o(Object.getPrototypeOf(t.prototype), "constructor", this).apply(this, arguments);
            }
            return a(t, e), r(t, [{
              key: "render",
              value: function() {
                return u["default"].createElement("li", {onClick: this.props.onClick}, u["default"].createElement("i", {className: this.props.data.icon}), this.props.data.name);
              }
            }]), t;
          }(u["default"].Component);
      t["default"] = p, e.exports = t["default"];
    }, function(e, t, i) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function s(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function a(e, t) {
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
      var r = function() {
        function e(e, t) {
          for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, i, n) {
          return i && e(t.prototype, i), n && e(t, n), t;
        };
      }(),
          o = function(e, t, i) {
            for (var n = !0; n; ) {
              var s = e,
                  a = t,
                  r = i;
              o = u = l = void 0, n = !1, null === s && (s = Function.prototype);
              var o = Object.getOwnPropertyDescriptor(s, a);
              if (void 0 !== o) {
                if ("value" in o)
                  return o.value;
                var l = o.get;
                return void 0 === l ? void 0 : l.call(r);
              }
              var u = Object.getPrototypeOf(s);
              if (null === u)
                return void 0;
              e = u, t = a, i = r, n = !0;
            }
          },
          l = i(1),
          u = n(l),
          p = i(27),
          d = n(p),
          h = i(18),
          c = n(h),
          f = i(6),
          m = n(f),
          v = function(e) {
            function t(e) {
              s(this, t), o(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e);
              var i = this.props.items ? this.props.items : this._defaultItems();
              this.state = {items: i};
            }
            return a(t, e), r(t, [{
              key: "_defaultItemOptions",
              value: function(e) {
                switch (e) {
                  case "Dropdown":
                    return [{
                      value: "",
                      text: "",
                      key: "dropdown_option_" + c["default"].uuid()
                    }, {
                      value: "",
                      text: "",
                      key: "dropdown_option_" + c["default"].uuid()
                    }, {
                      value: "",
                      text: "",
                      key: "dropdown_option_" + c["default"].uuid()
                    }];
                  case "Tags":
                    return [{
                      value: "place_holder_tag_1",
                      text: "Place holder tag 1",
                      key: "tags_option_" + c["default"].uuid()
                    }, {
                      value: "place_holder_tag_2",
                      text: "Place holder tag 2",
                      key: "tags_option_" + c["default"].uuid()
                    }, {
                      value: "place_holder_tag_3",
                      text: "Place holder tag 3",
                      key: "tags_option_" + c["default"].uuid()
                    }];
                  case "Checkboxes":
                    return [{
                      value: "place_holder_option_1",
                      text: "Place holder option 1",
                      key: "checkboxes_option_" + c["default"].uuid()
                    }, {
                      value: "place_holder_option_2",
                      text: "Place holder option 2",
                      key: "checkboxes_option_" + c["default"].uuid()
                    }, {
                      value: "place_holder_option_3",
                      text: "Place holder option 3",
                      key: "checkboxes_option_" + c["default"].uuid()
                    }];
                  case "RadioButtons":
                    return [{
                      value: "place_holder_option_1",
                      text: "Place holder option 1",
                      key: "radiobuttons_option_" + c["default"].uuid()
                    }, {
                      value: "place_holder_option_2",
                      text: "Place holder option 2",
                      key: "radiobuttons_option_" + c["default"].uuid()
                    }, {
                      value: "place_holder_option_3",
                      text: "Place holder option 3",
                      key: "radiobuttons_option_" + c["default"].uuid()
                    }];
                  default:
                    return [];
                }
              }
            }, {
              key: "_defaultItems",
              value: function() {
                return [{
                  key: "Header",
                  name: "Header Text",
                  icon: "fa fa-header",
                  "static": !0,
                  content: "Placeholder Text..."
                }, {
                  key: "Paragraph",
                  name: "Paragraph",
                  "static": !0,
                  icon: "fa fa-paragraph",
                  content: "Placeholder Text..."
                }, {
                  key: "LineBreak",
                  name: "Line Break",
                  "static": !0,
                  icon: "fa fa-arrows-h"
                }, {
                  key: "Dropdown",
                  canHaveAnswer: !0,
                  name: "Dropdown",
                  icon: "fa fa-caret-square-o-down",
                  label: "Placeholder Label",
                  field_name: "dropdown_",
                  options: []
                }, {
                  key: "Tags",
                  canHaveAnswer: !0,
                  name: "Tags",
                  icon: "fa fa-tags",
                  label: "Placeholder Label",
                  field_name: "tags_",
                  options: []
                }, {
                  key: "Checkboxes",
                  canHaveAnswer: !0,
                  name: "Checkboxes",
                  icon: "fa fa-check-square-o",
                  label: "Placeholder Label",
                  field_name: "checkboxes_",
                  options: []
                }, {
                  key: "RadioButtons",
                  canHaveAnswer: !0,
                  name: "Multiple Choice",
                  icon: "fa fa-dot-circle-o",
                  label: "Placeholder Label",
                  field_name: "radio_buttons_",
                  options: []
                }, {
                  key: "TextInput",
                  canHaveAnswer: !0,
                  name: "Text Input",
                  label: "Placeholder Label",
                  icon: "fa fa-font",
                  field_name: "text_input_"
                }, {
                  key: "TextArea",
                  canHaveAnswer: !0,
                  name: "Multi-line Input",
                  label: "Placeholder Label",
                  icon: "fa fa-text-height",
                  field_name: "text_area_"
                }, {
                  key: "Rating",
                  canHaveAnswer: !0,
                  name: "Rating",
                  label: "Placeholder Label",
                  icon: "fa fa-star",
                  field_name: "rating_"
                }, {
                  key: "DatePicker",
                  name: "Date",
                  icon: "fa fa-calendar",
                  label: "Placeholder Label",
                  field_name: "date_picker_"
                }, {
                  key: "Signature",
                  name: "Signature",
                  icon: "fa fa-pencil-square-o",
                  label: "Signature",
                  field_name: "signature_"
                }, {
                  key: "HyperLink",
                  name: "Web site",
                  icon: "fa fa-link",
                  "static": !0,
                  content: "Placeholder Web site link ...",
                  href: "http://www.example.com"
                }, {
                  key: "Download",
                  name: "File Attachment",
                  icon: "fa fa-file",
                  "static": !0,
                  content: "Placeholder file name ...",
                  field_name: "download_",
                  file_path: "",
                  _href: ""
                }, {
                  key: "Range",
                  name: "Range",
                  icon: "fa fa-sliders",
                  label: "Placeholder Label",
                  field_name: "range_",
                  step: 1,
                  default_value: 3,
                  min_value: 1,
                  max_value: 5,
                  min_label: "Easy",
                  max_label: "Difficult"
                }, {
                  key: "Camera",
                  name: "Camera",
                  icon: "fa fa-camera",
                  label: "Placeholder Label",
                  field_name: "camera_"
                }];
              }
            }, {
              key: "_onClick",
              value: function(e) {
                var t = {
                  id: c["default"].uuid(),
                  element: e.key,
                  text: e.name,
                  "static": e["static"],
                  required: !1
                };
                e.canHaveAnswer && (t.canHaveAnswer = e.canHaveAnswer), e.content && (t.content = e.content), e.href && (t.href = e.href), "Download" === e.key && (t._href = e._href, t.file_path = e.file_path), "Range" === e.key && (t.step = e.step, t.default_value = e.default_value, t.min_value = e.min_value, t.max_value = e.max_value, t.min_label = e.min_label, t.max_label = e.max_label), e.defaultValue && (t.defaultValue = e.defaultValue), e.field_name && (t.field_name = e.field_name + c["default"].uuid()), e.label && (t.label = e.label), e.options && (t.options = this._defaultItemOptions(t.element)), m["default"].createElement(t);
              }
            }, {
              key: "render",
              value: function() {
                var e = this;
                return u["default"].createElement("div", {className: "react-form-builder-toolbar pull-right"}, u["default"].createElement("h4", null, "Toolbox"), u["default"].createElement("ul", null, this.state.items.map(function(t) {
                  return u["default"].createElement(d["default"], {
                    data: t,
                    key: t.key,
                    onClick: e._onClick.bind(e, t)
                  });
                })));
              }
            }]), t;
          }(u["default"].Component);
      t["default"] = v, e.exports = t["default"];
    }, function(e, t, i) {
      var n = {EventEmitter: i(30)};
      e.exports = n;
    }, function(e, t, i) {
      (function(t) {
        "use strict";
        function n(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        var s = i(31),
            a = i(33),
            r = i(34),
            o = i(12),
            l = function() {
              function e() {
                n(this, e), this._subscriber = new a, this._currentSubscription = null;
              }
              return e.prototype.addListener = function(e, t, i) {
                return this._subscriber.addSubscription(e, new s(this._subscriber, t, i));
              }, e.prototype.once = function(e, t, i) {
                var n = this;
                return this.addListener(e, function() {
                  n.removeCurrentListener(), t.apply(i, arguments);
                });
              }, e.prototype.removeAllListeners = function(e) {
                this._subscriber.removeAllSubscriptions(e);
              }, e.prototype.removeCurrentListener = function() {
                this._currentSubscription ? void 0 : "production" !== t.env.NODE_ENV ? o(!1, "Not in an emitting cycle; there is no current subscription") : o(!1), this._subscriber.removeSubscription(this._currentSubscription);
              }, e.prototype.listeners = function(e) {
                var t = this._subscriber.getSubscriptionsForType(e);
                return t ? t.filter(r.thatReturnsTrue).map(function(e) {
                  return e.listener;
                }) : [];
              }, e.prototype.emit = function(e) {
                var t = this._subscriber.getSubscriptionsForType(e);
                if (t) {
                  for (var i = Object.keys(t),
                      n = 0; n < i.length; n++) {
                    var s = i[n],
                        a = t[s];
                    a && (this._currentSubscription = a, this.__emitToSubscription.apply(this, [a].concat(Array.prototype.slice.call(arguments))));
                  }
                  this._currentSubscription = null;
                }
              }, e.prototype.__emitToSubscription = function(e, t) {
                var i = Array.prototype.slice.call(arguments, 2);
                e.listener.apply(e.context, i);
              }, e;
            }();
        e.exports = l;
      }).call(t, i(5));
    }, function(e, t, i) {
      "use strict";
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function s(e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
      }
      var a = i(32),
          r = function(e) {
            function t(i, s, a) {
              n(this, t), e.call(this, i), this.listener = s, this.context = a;
            }
            return s(t, e), t;
          }(a);
      e.exports = r;
    }, function(e, t) {
      "use strict";
      function i(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      var n = function() {
        function e(t) {
          i(this, e), this.subscriber = t;
        }
        return e.prototype.remove = function() {
          this.subscriber.removeSubscription(this);
        }, e;
      }();
      e.exports = n;
    }, function(e, t, i) {
      (function(t) {
        "use strict";
        function n(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        var s = i(12),
            a = function() {
              function e() {
                n(this, e), this._subscriptionsForType = {}, this._currentSubscription = null;
              }
              return e.prototype.addSubscription = function(e, i) {
                i.subscriber !== this ? "production" !== t.env.NODE_ENV ? s(!1, "The subscriber of the subscription is incorrectly set.") : s(!1) : void 0, this._subscriptionsForType[e] || (this._subscriptionsForType[e] = []);
                var n = this._subscriptionsForType[e].length;
                return this._subscriptionsForType[e].push(i), i.eventType = e, i.key = n, i;
              }, e.prototype.removeAllSubscriptions = function(e) {
                void 0 === e ? this._subscriptionsForType = {} : delete this._subscriptionsForType[e];
              }, e.prototype.removeSubscription = function(e) {
                var t = e.eventType,
                    i = e.key,
                    n = this._subscriptionsForType[t];
                n && delete n[i];
              }, e.prototype.getSubscriptionsForType = function(e) {
                return this._subscriptionsForType[e];
              }, e;
            }();
        e.exports = a;
      }).call(t, i(5));
    }, function(e, t) {
      "use strict";
      function i(e) {
        return function() {
          return e;
        };
      }
      function n() {}
      n.thatReturns = i, n.thatReturnsFalse = i(!1), n.thatReturnsTrue = i(!0), n.thatReturnsNull = i(null), n.thatReturnsThis = function() {
        return this;
      }, n.thatReturnsArgument = function(e) {
        return e;
      }, e.exports = n;
    }, function(e, t, i) {
      var n = function(e, t) {
        return e.createClass({
          render: function() {
            return console.log(this.props), e.createElement("input", {name: this.props.name});
          },
          componentDidMount: function() {
            $.fn.bootstrapSlider = $.fn.bootstrapSlider || $.fn.slider, this.mySlider = $(this.getDOMNode()).bootstrapSlider({tooltip: this.props.tooltip || "show"}), this.updateSliderValues(), this.mySlider.on("change", function(e) {
              var t = {target: {}};
              t.target.value = e.value.newValue;
            });
          },
          componentDidUpdate: function() {
            this.updateSliderValues();
          },
          updateSliderValues: function() {
            $(this.mySlider).bootstrapSlider("setAttribute", "min", parseInt(this.props.min)).bootstrapSlider("setAttribute", "max", parseInt(this.props.max)).bootstrapSlider("setAttribute", "step", parseInt(this.props.step)).bootstrapSlider("setValue", parseInt(this.props.value, 10));
            var e = "disabled" === this.props.disabled ? !1 : !0,
                t = $(this.mySlider).bootstrapSlider("isEnabled");
            e ? t || $(this.mySlider).bootstrapSlider("enable") : t && $(this.mySlider).bootstrapSlider("disable");
          }
        });
      };
      e.exports = n(i(1), i(36));
    }, function(e, t, i) {
      !function(t, i) {
        e.exports = i(window.jQuery);
      }(this, function(e) {
        var t;
        return function(e) {
          "use strict";
          function t() {}
          function i(e) {
            function i(t) {
              t.prototype.option || (t.prototype.option = function(t) {
                e.isPlainObject(t) && (this.options = e.extend(!0, this.options, t));
              });
            }
            function s(t, i) {
              e.fn[t] = function(s) {
                if ("string" == typeof s) {
                  for (var r = n.call(arguments, 1),
                      o = 0,
                      l = this.length; l > o; o++) {
                    var u = this[o],
                        p = e.data(u, t);
                    if (p)
                      if (e.isFunction(p[s]) && "_" !== s.charAt(0)) {
                        var d = p[s].apply(p, r);
                        if (void 0 !== d && d !== p)
                          return d;
                      } else
                        a("no such method '" + s + "' for " + t + " instance");
                    else
                      a("cannot call methods on " + t + " prior to initialization; attempted to call '" + s + "'");
                  }
                  return this;
                }
                var h = this.map(function() {
                  var n = e.data(this, t);
                  return n ? (n.option(s), n._init()) : (n = new i(this, s), e.data(this, t, n)), e(this);
                });
                return !h || h.length > 1 ? h : h[0];
              };
            }
            if (e) {
              var a = "undefined" == typeof console ? t : function(e) {
                console.error(e);
              };
              return e.bridget = function(e, t) {
                i(t), s(e, t);
              }, e.bridget;
            }
          }
          var n = Array.prototype.slice;
          i(e);
        }(e), function(e) {
          function i(t, i) {
            function n(e, t) {
              var i = "data-slider-" + t,
                  n = e.getAttribute(i);
              try {
                return JSON.parse(n);
              } catch (s) {
                return n;
              }
            }
            "string" == typeof t ? this.element = document.querySelector(t) : t instanceof HTMLElement && (this.element = t), i = i ? i : {};
            for (var a = Object.keys(this.defaultOptions),
                r = 0; r < a.length; r++) {
              var o = a[r],
                  l = i[o];
              l = "undefined" != typeof l ? l : n(this.element, o), l = null !== l ? l : this.defaultOptions[o], this.options || (this.options = {}), this.options[o] = l;
            }
            var u,
                p,
                d,
                h,
                c,
                f = this.element.style.width,
                m = !1,
                v = this.element.parentNode;
            if (this.sliderElem)
              m = !0;
            else {
              this.sliderElem = document.createElement("div"), this.sliderElem.className = "slider";
              var g = document.createElement("div");
              if (g.className = "slider-track", p = document.createElement("div"), p.className = "slider-track-low", u = document.createElement("div"), u.className = "slider-selection", d = document.createElement("div"), d.className = "slider-track-high", h = document.createElement("div"), h.className = "slider-handle min-slider-handle", c = document.createElement("div"), c.className = "slider-handle max-slider-handle", g.appendChild(p), g.appendChild(u), g.appendChild(d), this.ticks = [], this.options.ticks instanceof Array && this.options.ticks.length > 0) {
                for (r = 0; r < this.options.ticks.length; r++) {
                  var y = document.createElement("div");
                  y.className = "slider-tick", this.ticks.push(y), g.appendChild(y);
                }
                u.className += " tick-slider-selection";
              }
              if (g.appendChild(h), g.appendChild(c), this.tickLabels = [], this.options.ticks_labels instanceof Array && this.options.ticks_labels.length > 0)
                for (this.tickLabelContainer = document.createElement("div"), this.tickLabelContainer.className = "slider-tick-label-container", r = 0; r < this.options.ticks_labels.length; r++) {
                  var b = document.createElement("div");
                  b.className = "slider-tick-label", b.innerHTML = this.options.ticks_labels[r], this.tickLabels.push(b), this.tickLabelContainer.appendChild(b);
                }
              var _ = function(e) {
                var t = document.createElement("div");
                t.className = "tooltip-arrow";
                var i = document.createElement("div");
                i.className = "tooltip-inner", e.appendChild(t), e.appendChild(i);
              },
                  E = document.createElement("div");
              E.className = "tooltip tooltip-main", _(E);
              var x = document.createElement("div");
              x.className = "tooltip tooltip-min", _(x);
              var w = document.createElement("div");
              w.className = "tooltip tooltip-max", _(w), this.sliderElem.appendChild(g), this.sliderElem.appendChild(E), this.sliderElem.appendChild(x), this.sliderElem.appendChild(w), this.tickLabelContainer && this.sliderElem.appendChild(this.tickLabelContainer), v.insertBefore(this.sliderElem, this.element), this.element.style.display = "none";
            }
            if (e && (this.$element = e(this.element), this.$sliderElem = e(this.sliderElem)), this.eventToCallbackMap = {}, this.sliderElem.id = this.options.id, this.touchCapable = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch, this.tooltip = this.sliderElem.querySelector(".tooltip-main"), this.tooltipInner = this.tooltip.querySelector(".tooltip-inner"), this.tooltip_min = this.sliderElem.querySelector(".tooltip-min"), this.tooltipInner_min = this.tooltip_min.querySelector(".tooltip-inner"), this.tooltip_max = this.sliderElem.querySelector(".tooltip-max"), this.tooltipInner_max = this.tooltip_max.querySelector(".tooltip-inner"), s[this.options.scale] && (this.options.scale = s[this.options.scale]), m === !0 && (this._removeClass(this.sliderElem, "slider-horizontal"), this._removeClass(this.sliderElem, "slider-vertical"), this._removeClass(this.tooltip, "hide"), this._removeClass(this.tooltip_min, "hide"), this._removeClass(this.tooltip_max, "hide"), ["left", "top", "width", "height"].forEach(function(e) {
              this._removeProperty(this.trackLow, e), this._removeProperty(this.trackSelection, e), this._removeProperty(this.trackHigh, e);
            }, this), [this.handle1, this.handle2].forEach(function(e) {
              this._removeProperty(e, "left"), this._removeProperty(e, "top");
            }, this), [this.tooltip, this.tooltip_min, this.tooltip_max].forEach(function(e) {
              this._removeProperty(e, "left"), this._removeProperty(e, "top"), this._removeProperty(e, "margin-left"), this._removeProperty(e, "margin-top"), this._removeClass(e, "right"), this._removeClass(e, "top");
            }, this)), "vertical" === this.options.orientation ? (this._addClass(this.sliderElem, "slider-vertical"), this.stylePos = "top", this.mousePos = "pageY", this.sizePos = "offsetHeight", this._addClass(this.tooltip, "right"), this.tooltip.style.left = "100%", this._addClass(this.tooltip_min, "right"), this.tooltip_min.style.left = "100%", this._addClass(this.tooltip_max, "right"), this.tooltip_max.style.left = "100%") : (this._addClass(this.sliderElem, "slider-horizontal"), this.sliderElem.style.width = f, this.options.orientation = "horizontal", this.stylePos = "left", this.mousePos = "pageX", this.sizePos = "offsetWidth", this._addClass(this.tooltip, "top"), this.tooltip.style.top = -this.tooltip.outerHeight - 14 + "px", this._addClass(this.tooltip_min, "top"), this.tooltip_min.style.top = -this.tooltip_min.outerHeight - 14 + "px", this._addClass(this.tooltip_max, "top"), this.tooltip_max.style.top = -this.tooltip_max.outerHeight - 14 + "px"), this.options.ticks instanceof Array && this.options.ticks.length > 0 && (this.options.max = Math.max.apply(Math, this.options.ticks), this.options.min = Math.min.apply(Math, this.options.ticks)), this.options.value instanceof Array ? this.options.range = !0 : this.options.range && (this.options.value = [this.options.value, this.options.max]), this.trackLow = p || this.trackLow, this.trackSelection = u || this.trackSelection, this.trackHigh = d || this.trackHigh, "none" === this.options.selection && (this._addClass(this.trackLow, "hide"), this._addClass(this.trackSelection, "hide"), this._addClass(this.trackHigh, "hide")), this.handle1 = h || this.handle1, this.handle2 = c || this.handle2, m === !0)
              for (this._removeClass(this.handle1, "round triangle"), this._removeClass(this.handle2, "round triangle hide"), r = 0; r < this.ticks.length; r++)
                this._removeClass(this.ticks[r], "round triangle hide");
            var O = ["round", "triangle", "custom"],
                k = -1 !== O.indexOf(this.options.handle);
            if (k)
              for (this._addClass(this.handle1, this.options.handle), this._addClass(this.handle2, this.options.handle), r = 0; r < this.ticks.length; r++)
                this._addClass(this.ticks[r], this.options.handle);
            this.offset = this._offset(this.sliderElem), this.size = this.sliderElem[this.sizePos], this.setValue(this.options.value), this.handle1Keydown = this._keydown.bind(this, 0), this.handle1.addEventListener("keydown", this.handle1Keydown, !1), this.handle2Keydown = this._keydown.bind(this, 1), this.handle2.addEventListener("keydown", this.handle2Keydown, !1), this.touchCapable ? (this.mousedown = this._mousedown.bind(this), this.sliderElem.addEventListener("touchstart", this.mousedown, !1)) : (this.mousedown = this._mousedown.bind(this), this.sliderElem.addEventListener("mousedown", this.mousedown, !1)), "hide" === this.options.tooltip ? (this._addClass(this.tooltip, "hide"), this._addClass(this.tooltip_min, "hide"), this._addClass(this.tooltip_max, "hide")) : "always" === this.options.tooltip ? (this._showTooltip(), this._alwaysShowTooltip = !0) : (this.showTooltip = this._showTooltip.bind(this), this.hideTooltip = this._hideTooltip.bind(this), this.sliderElem.addEventListener("mouseenter", this.showTooltip, !1), this.sliderElem.addEventListener("mouseleave", this.hideTooltip, !1), this.handle1.addEventListener("focus", this.showTooltip, !1), this.handle1.addEventListener("blur", this.hideTooltip, !1), this.handle2.addEventListener("focus", this.showTooltip, !1), this.handle2.addEventListener("blur", this.hideTooltip, !1)), this.options.enabled ? this.enable() : this.disable();
          }
          var n = {
            formatInvalidInputErrorMsg: function(e) {
              return "Invalid input value '" + e + "' passed in";
            },
            callingContextNotSliderInstance: "Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"
          },
              s = {
                linear: {
                  toValue: function(e) {
                    var t = e / 100 * (this.options.max - this.options.min),
                        i = this.options.min + Math.round(t / this.options.step) * this.options.step;
                    return i < this.options.min ? this.options.min : i > this.options.max ? this.options.max : i;
                  },
                  toPercentage: function(e) {
                    return this.options.max === this.options.min ? 0 : 100 * (e - this.options.min) / (this.options.max - this.options.min);
                  }
                },
                logarithmic: {
                  toValue: function(e) {
                    var t = 0 === this.options.min ? 0 : Math.log(this.options.min),
                        i = Math.log(this.options.max);
                    return Math.exp(t + (i - t) * e / 100);
                  },
                  toPercentage: function(e) {
                    if (this.options.max === this.options.min)
                      return 0;
                    var t = Math.log(this.options.max),
                        i = 0 === this.options.min ? 0 : Math.log(this.options.min),
                        n = 0 === e ? 0 : Math.log(e);
                    return 100 * (n - i) / (t - i);
                  }
                }
              };
          if (t = function(e, t) {
            return i.call(this, e, t), this;
          }, t.prototype = {
            _init: function() {},
            constructor: t,
            defaultOptions: {
              id: "",
              min: 0,
              max: 10,
              step: 1,
              precision: 0,
              orientation: "horizontal",
              value: 5,
              range: !1,
              selection: "before",
              tooltip: "show",
              tooltip_split: !1,
              handle: "round",
              reversed: !1,
              enabled: !0,
              formatter: function(e) {
                return e instanceof Array ? e[0] + " : " + e[1] : e;
              },
              natural_arrow_keys: !1,
              ticks: [],
              ticks_labels: [],
              ticks_snap_bounds: 0,
              scale: "linear"
            },
            over: !1,
            inDrag: !1,
            getValue: function() {
              return this.options.range ? this.options.value : this.options.value[0];
            },
            setValue: function(e, t) {
              e || (e = 0);
              var i = this.getValue();
              this.options.value = this._validateInputValue(e);
              var n = this._applyPrecision.bind(this);
              this.options.range ? (this.options.value[0] = n(this.options.value[0]), this.options.value[1] = n(this.options.value[1]), this.options.value[0] = Math.max(this.options.min, Math.min(this.options.max, this.options.value[0])), this.options.value[1] = Math.max(this.options.min, Math.min(this.options.max, this.options.value[1]))) : (this.options.value = n(this.options.value), this.options.value = [Math.max(this.options.min, Math.min(this.options.max, this.options.value))], this._addClass(this.handle2, "hide"), "after" === this.options.selection ? this.options.value[1] = this.options.max : this.options.value[1] = this.options.min), this.options.max > this.options.min ? this.percentage = [this._toPercentage(this.options.value[0]), this._toPercentage(this.options.value[1]), 100 * this.options.step / (this.options.max - this.options.min)] : this.percentage = [0, 0, 100], this._layout();
              var s = this.options.range ? this.options.value : this.options.value[0];
              return t === !0 && this._trigger("slide", s), i !== s && this._trigger("change", {
                oldValue: i,
                newValue: s
              }), this._setDataVal(s), this;
            },
            destroy: function() {
              this._removeSliderEventHandlers(), this.sliderElem.parentNode.removeChild(this.sliderElem), this.element.style.display = "", this._cleanUpEventCallbacksMap(), this.element.removeAttribute("data"), e && (this._unbindJQueryEventHandlers(), this.$element.removeData("slider"));
            },
            disable: function() {
              return this.options.enabled = !1, this.handle1.removeAttribute("tabindex"), this.handle2.removeAttribute("tabindex"), this._addClass(this.sliderElem, "slider-disabled"), this._trigger("slideDisabled"), this;
            },
            enable: function() {
              return this.options.enabled = !0, this.handle1.setAttribute("tabindex", 0), this.handle2.setAttribute("tabindex", 0), this._removeClass(this.sliderElem, "slider-disabled"), this._trigger("slideEnabled"), this;
            },
            toggle: function() {
              return this.options.enabled ? this.disable() : this.enable(), this;
            },
            isEnabled: function() {
              return this.options.enabled;
            },
            on: function(t, i) {
              return e ? (this.$element.on(t, i), this.$sliderElem.on(t, i)) : this._bindNonQueryEventHandler(t, i), this;
            },
            getAttribute: function(e) {
              return e ? this.options[e] : this.options;
            },
            setAttribute: function(e, t) {
              return this.options[e] = t, this;
            },
            refresh: function() {
              return this._removeSliderEventHandlers(), i.call(this, this.element, this.options), e && e.data(this.element, "slider", this), this;
            },
            relayout: function() {
              return this._layout(), this;
            },
            _removeSliderEventHandlers: function() {
              this.handle1.removeEventListener("keydown", this.handle1Keydown, !1), this.handle1.removeEventListener("focus", this.showTooltip, !1), this.handle1.removeEventListener("blur", this.hideTooltip, !1), this.handle2.removeEventListener("keydown", this.handle2Keydown, !1), this.handle2.removeEventListener("focus", this.handle2Keydown, !1), this.handle2.removeEventListener("blur", this.handle2Keydown, !1), this.sliderElem.removeEventListener("mouseenter", this.showTooltip, !1), this.sliderElem.removeEventListener("mouseleave", this.hideTooltip, !1), this.sliderElem.removeEventListener("touchstart", this.mousedown, !1), this.sliderElem.removeEventListener("mousedown", this.mousedown, !1);
            },
            _bindNonQueryEventHandler: function(e, t) {
              void 0 === this.eventToCallbackMap[e] && (this.eventToCallbackMap[e] = []), this.eventToCallbackMap[e].push(t);
            },
            _cleanUpEventCallbacksMap: function() {
              for (var e = Object.keys(this.eventToCallbackMap),
                  t = 0; t < e.length; t++) {
                var i = e[t];
                this.eventToCallbackMap[i] = null;
              }
            },
            _showTooltip: function() {
              this.options.tooltip_split === !1 ? this._addClass(this.tooltip, "in") : (this._addClass(this.tooltip_min, "in"), this._addClass(this.tooltip_max, "in")), this.over = !0;
            },
            _hideTooltip: function() {
              this.inDrag === !1 && this.alwaysShowTooltip !== !0 && (this._removeClass(this.tooltip, "in"), this._removeClass(this.tooltip_min, "in"), this._removeClass(this.tooltip_max, "in")), this.over = !1;
            },
            _layout: function() {
              var e;
              if (e = this.options.reversed ? [100 - this.percentage[0], this.percentage[1]] : [this.percentage[0], this.percentage[1]], this.handle1.style[this.stylePos] = e[0] + "%", this.handle2.style[this.stylePos] = e[1] + "%", this.options.ticks instanceof Array && this.options.ticks.length > 0) {
                var t = Math.max.apply(Math, this.options.ticks),
                    i = Math.min.apply(Math, this.options.ticks),
                    n = "vertical" === this.options.orientation ? "height" : "width",
                    s = "vertical" === this.options.orientation ? "margin-top" : "margin-left",
                    a = this.size / (this.options.ticks.length - 1);
                if (this.tickLabelContainer && (this.tickLabelContainer.style[s] = -a / 2 + "px", "horizontal" === this.options.orientation)) {
                  var r = this.tickLabelContainer.offsetHeight - this.sliderElem.offsetHeight;
                  this.sliderElem.style.marginBottom = r + "px";
                }
                for (var o = 0; o < this.options.ticks.length; o++) {
                  var l = 100 * (this.options.ticks[o] - i) / (t - i);
                  this.ticks[o].style[this.stylePos] = l + "%", this._removeClass(this.ticks[o], "in-selection"), l <= e[0] && !this.options.range ? this._addClass(this.ticks[o], "in-selection") : l >= e[0] && l <= e[1] && this._addClass(this.ticks[o], "in-selection"), this.tickLabels[o] && (this.tickLabels[o].style[n] = a + "px");
                }
              }
              if ("vertical" === this.options.orientation)
                this.trackLow.style.top = "0", this.trackLow.style.height = Math.min(e[0], e[1]) + "%", this.trackSelection.style.top = Math.min(e[0], e[1]) + "%", this.trackSelection.style.height = Math.abs(e[0] - e[1]) + "%", this.trackHigh.style.bottom = "0", this.trackHigh.style.height = 100 - Math.min(e[0], e[1]) - Math.abs(e[0] - e[1]) + "%";
              else {
                this.trackLow.style.left = "0", this.trackLow.style.width = Math.min(e[0], e[1]) + "%", this.trackSelection.style.left = Math.min(e[0], e[1]) + "%", this.trackSelection.style.width = Math.abs(e[0] - e[1]) + "%", this.trackHigh.style.right = "0", this.trackHigh.style.width = 100 - Math.min(e[0], e[1]) - Math.abs(e[0] - e[1]) + "%";
                var u = this.tooltip_min.getBoundingClientRect(),
                    p = this.tooltip_max.getBoundingClientRect();
                u.right > p.left ? (this._removeClass(this.tooltip_max, "top"), this._addClass(this.tooltip_max, "bottom"), this.tooltip_max.style.top = "18px") : (this._removeClass(this.tooltip_max, "bottom"), this._addClass(this.tooltip_max, "top"), this.tooltip_max.style.top = this.tooltip_min.style.top);
              }
              var d;
              if (this.options.range) {
                d = this.options.formatter(this.options.value), this._setText(this.tooltipInner, d), this.tooltip.style[this.stylePos] = (e[1] + e[0]) / 2 + "%", "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px"), "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px");
                var h = this.options.formatter(this.options.value[0]);
                this._setText(this.tooltipInner_min, h);
                var c = this.options.formatter(this.options.value[1]);
                this._setText(this.tooltipInner_max, c), this.tooltip_min.style[this.stylePos] = e[0] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip_min, "margin-top", -this.tooltip_min.offsetHeight / 2 + "px") : this._css(this.tooltip_min, "margin-left", -this.tooltip_min.offsetWidth / 2 + "px"), this.tooltip_max.style[this.stylePos] = e[1] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip_max, "margin-top", -this.tooltip_max.offsetHeight / 2 + "px") : this._css(this.tooltip_max, "margin-left", -this.tooltip_max.offsetWidth / 2 + "px");
              } else
                d = this.options.formatter(this.options.value[0]), this._setText(this.tooltipInner, d), this.tooltip.style[this.stylePos] = e[0] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px");
            },
            _removeProperty: function(e, t) {
              e.style.removeProperty ? e.style.removeProperty(t) : e.style.removeAttribute(t);
            },
            _mousedown: function(e) {
              if (!this.options.enabled)
                return !1;
              this._triggerFocusOnHandle(), this.offset = this._offset(this.sliderElem), this.size = this.sliderElem[this.sizePos];
              var t = this._getPercentage(e);
              if (this.options.range) {
                var i = Math.abs(this.percentage[0] - t),
                    n = Math.abs(this.percentage[1] - t);
                this.dragged = n > i ? 0 : 1;
              } else
                this.dragged = 0;
              this.percentage[this.dragged] = this.options.reversed ? 100 - t : t, this._layout(), this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), this.mousemove && document.removeEventListener("mousemove", this.mousemove, !1), this.mouseup && document.removeEventListener("mouseup", this.mouseup, !1), this.mousemove = this._mousemove.bind(this), this.mouseup = this._mouseup.bind(this), this.touchCapable && (document.addEventListener("touchmove", this.mousemove, !1), document.addEventListener("touchend", this.mouseup, !1)), document.addEventListener("mousemove", this.mousemove, !1), document.addEventListener("mouseup", this.mouseup, !1), this.inDrag = !0;
              var s = this._calculateValue();
              return this._trigger("slideStart", s), this._setDataVal(s), this.setValue(s), this._pauseEvent(e), !0;
            },
            _triggerFocusOnHandle: function(e) {
              0 === e && this.handle1.focus(), 1 === e && this.handle2.focus();
            },
            _keydown: function(e, t) {
              if (!this.options.enabled)
                return !1;
              var i;
              switch (t.keyCode) {
                case 37:
                case 40:
                  i = -1;
                  break;
                case 39:
                case 38:
                  i = 1;
              }
              if (i) {
                if (this.options.natural_arrow_keys) {
                  var n = "vertical" === this.options.orientation && !this.options.reversed,
                      s = "horizontal" === this.options.orientation && this.options.reversed;
                  (n || s) && (i = -i);
                }
                var a = this.options.value[e] + i * this.options.step;
                return this.options.range && (a = [e ? this.options.value[0] : a, e ? a : this.options.value[1]]), this._trigger("slideStart", a), this._setDataVal(a), this.setValue(a, !0), this._trigger("slideStop", a), this._setDataVal(a), this._layout(), this._pauseEvent(t), !1;
              }
            },
            _pauseEvent: function(e) {
              e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault(), e.cancelBubble = !0, e.returnValue = !1;
            },
            _mousemove: function(e) {
              if (!this.options.enabled)
                return !1;
              var t = this._getPercentage(e);
              this._adjustPercentageForRangeSliders(t), this.percentage[this.dragged] = this.options.reversed ? 100 - t : t, this._layout();
              var i = this._calculateValue(!0);
              return this.setValue(i, !0), !1;
            },
            _adjustPercentageForRangeSliders: function(e) {
              this.options.range && (0 === this.dragged && this.percentage[1] < e ? (this.percentage[0] = this.percentage[1], this.dragged = 1) : 1 === this.dragged && this.percentage[0] > e && (this.percentage[1] = this.percentage[0], this.dragged = 0));
            },
            _mouseup: function() {
              if (!this.options.enabled)
                return !1;
              this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), document.removeEventListener("mousemove", this.mousemove, !1), document.removeEventListener("mouseup", this.mouseup, !1), this.inDrag = !1, this.over === !1 && this._hideTooltip();
              var e = this._calculateValue(!0);
              return this._layout(), this._trigger("slideStop", e), this._setDataVal(e), !1;
            },
            _calculateValue: function(e) {
              var t;
              if (this.options.range ? (t = [this.options.min, this.options.max], 0 !== this.percentage[0] && (t[0] = this._toValue(this.percentage[0]), t[0] = this._applyPrecision(t[0])), 100 !== this.percentage[1] && (t[1] = this._toValue(this.percentage[1]), t[1] = this._applyPrecision(t[1]))) : (t = this._toValue(this.percentage[0]), t = parseFloat(t), t = this._applyPrecision(t)), e) {
                for (var i = [t, 1 / 0],
                    n = 0; n < this.options.ticks.length; n++) {
                  var s = Math.abs(this.options.ticks[n] - t);
                  s <= i[1] && (i = [this.options.ticks[n], s]);
                }
                if (i[1] <= this.options.ticks_snap_bounds)
                  return i[0];
              }
              return t;
            },
            _applyPrecision: function(e) {
              var t = this.options.precision || this._getNumDigitsAfterDecimalPlace(this.options.step);
              return this._applyToFixedAndParseFloat(e, t);
            },
            _getNumDigitsAfterDecimalPlace: function(e) {
              var t = ("" + e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
              return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
            },
            _applyToFixedAndParseFloat: function(e, t) {
              var i = e.toFixed(t);
              return parseFloat(i);
            },
            _getPercentage: function(e) {
              !this.touchCapable || "touchstart" !== e.type && "touchmove" !== e.type || (e = e.touches[0]);
              var t = 100 * (e[this.mousePos] - this.offset[this.stylePos]) / this.size;
              return t = Math.round(t / this.percentage[2]) * this.percentage[2], Math.max(0, Math.min(100, t));
            },
            _validateInputValue: function(e) {
              if ("number" == typeof e)
                return e;
              if (e instanceof Array)
                return this._validateArray(e), e;
              throw new Error(n.formatInvalidInputErrorMsg(e));
            },
            _validateArray: function(e) {
              for (var t = 0; t < e.length; t++) {
                var i = e[t];
                if ("number" != typeof i)
                  throw new Error(n.formatInvalidInputErrorMsg(i));
              }
            },
            _setDataVal: function(e) {
              var t = "value: '" + e + "'";
              this.element.setAttribute("data", t), this.element.setAttribute("value", e), this.element.value = e;
            },
            _trigger: function(t, i) {
              i = i || 0 === i ? i : void 0;
              var n = this.eventToCallbackMap[t];
              if (n && n.length)
                for (var s = 0; s < n.length; s++) {
                  var a = n[s];
                  a(i);
                }
              e && this._triggerJQueryEvent(t, i);
            },
            _triggerJQueryEvent: function(e, t) {
              var i = {
                type: e,
                value: t
              };
              this.$element.trigger(i), this.$sliderElem.trigger(i);
            },
            _unbindJQueryEventHandlers: function() {
              this.$element.off(), this.$sliderElem.off();
            },
            _setText: function(e, t) {
              "undefined" != typeof e.innerText ? e.innerText = t : "undefined" != typeof e.textContent && (e.textContent = t);
            },
            _removeClass: function(e, t) {
              for (var i = t.split(" "),
                  n = e.className,
                  s = 0; s < i.length; s++) {
                var a = i[s],
                    r = new RegExp("(?:\\s|^)" + a + "(?:\\s|$)");
                n = n.replace(r, " ");
              }
              e.className = n.trim();
            },
            _addClass: function(e, t) {
              for (var i = t.split(" "),
                  n = e.className,
                  s = 0; s < i.length; s++) {
                var a = i[s],
                    r = new RegExp("(?:\\s|^)" + a + "(?:\\s|$)"),
                    o = r.test(n);
                o || (n += " " + a);
              }
              e.className = n.trim();
            },
            _offset: function(e) {
              var t = e.getBoundingClientRect(),
                  i = t.left,
                  n = t.top;
              return {
                left: i,
                top: n
              };
            },
            _css: function(t, i, n) {
              if (e)
                e.style(t, i, n);
              else {
                var s = i.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(e, t) {
                  return t.toUpperCase();
                });
                t.style[s] = n;
              }
            },
            _toValue: function(e) {
              return this.options.scale.toValue.apply(this, [e]);
            },
            _toPercentage: function(e) {
              return this.options.scale.toPercentage.apply(this, [e]);
            }
          }, e) {
            var a = e.fn.slider ? "bootstrapSlider" : "slider";
            e.bridget(a, t);
          }
        }(e), t;
      });
    }, function(e, t, i) {
      "use strict";
      var n = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var i = arguments[t];
          for (var n in i)
            Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
        }
        return e;
      },
          s = i(1),
          a = i(39),
          r = i(4),
          o = i(38),
          l = 0,
          u = s.createClass({
            displayName: "Select",
            propTypes: {
              allowCreate: s.PropTypes.bool,
              asyncOptions: s.PropTypes.func,
              autoload: s.PropTypes.bool,
              className: s.PropTypes.string,
              clearable: s.PropTypes.bool,
              clearAllText: s.PropTypes.string,
              clearValueText: s.PropTypes.string,
              delimiter: s.PropTypes.string,
              disabled: s.PropTypes.bool,
              filterOption: s.PropTypes.func,
              filterOptions: s.PropTypes.func,
              ignoreCase: s.PropTypes.bool,
              inputProps: s.PropTypes.object,
              matchPos: s.PropTypes.string,
              matchProp: s.PropTypes.string,
              multi: s.PropTypes.bool,
              name: s.PropTypes.string,
              addLabelText: s.PropTypes.string,
              noResultsText: s.PropTypes.string,
              onBlur: s.PropTypes.func,
              onChange: s.PropTypes.func,
              onFocus: s.PropTypes.func,
              onOptionLabelClick: s.PropTypes.func,
              optionRenderer: s.PropTypes.func,
              options: s.PropTypes.array,
              placeholder: s.PropTypes.string,
              searchable: s.PropTypes.bool,
              searchPromptText: s.PropTypes.string,
              value: s.PropTypes.any,
              valueRenderer: s.PropTypes.func
            },
            getDefaultProps: function() {
              return {
                allowCreate: !1,
                asyncOptions: void 0,
                autoload: !0,
                className: void 0,
                clearable: !0,
                clearAllText: "Clear all",
                clearValueText: "Clear value",
                delimiter: ",",
                disabled: !1,
                ignoreCase: !0,
                inputProps: {},
                matchPos: "any",
                matchProp: "any",
                name: void 0,
                addLabelText: "Add {label} ?",
                noResultsText: "No results found",
                onChange: void 0,
                onOptionLabelClick: void 0,
                options: void 0,
                placeholder: "Select...",
                searchable: !0,
                searchPromptText: "Type to search",
                value: void 0
              };
            },
            getInitialState: function() {
              return {
                isFocused: !1,
                isLoading: !1,
                isOpen: !1,
                options: this.props.options
              };
            },
            componentWillMount: function() {
              this._optionsCache = {}, this._optionsFilterString = "";
              var e = this;
              this._closeMenuIfClickedOutside = function(t) {
                if (e.state.isOpen) {
                  var i = s.findDOMNode(e.refs.selectMenuContainer),
                      n = s.findDOMNode(e.refs.control),
                      a = e.clickedOutsideElement(i, t),
                      r = e.clickedOutsideElement(n, t);
                  a && r && e.setState({isOpen: !1}, e._unbindCloseMenuIfClickedOutside);
                }
              }, this._bindCloseMenuIfClickedOutside = function() {
                !document.addEventListener && document.attachEvent ? document.attachEvent("onclick", this._closeMenuIfClickedOutside) : document.addEventListener("click", this._closeMenuIfClickedOutside);
              }, this._unbindCloseMenuIfClickedOutside = function() {
                !document.removeEventListener && document.detachEvent ? document.detachEvent("onclick", this._closeMenuIfClickedOutside) : document.removeEventListener("click", this._closeMenuIfClickedOutside);
              }, this.setState(this.getStateFromValue(this.props.value));
            },
            componentDidMount: function() {
              this.props.asyncOptions && this.props.autoload && this.autoloadAsyncOptions();
            },
            componentWillUnmount: function() {
              clearTimeout(this._blurTimeout), clearTimeout(this._focusTimeout), this.state.isOpen && this._unbindCloseMenuIfClickedOutside();
            },
            componentWillReceiveProps: function(e) {
              JSON.stringify(e.options) !== JSON.stringify(this.props.options) && this.setState({
                options: e.options,
                filteredOptions: this.filterOptions(e.options)
              }), (e.value !== this.state.value || e.placeholder !== this.state.placeholder) && this.setState(this.getStateFromValue(e.value, e.options, e.placeholder));
            },
            componentDidUpdate: function() {
              var e = this;
              if (!this.props.disabled && this._focusAfterUpdate && (clearTimeout(this._blurTimeout), this._focusTimeout = setTimeout(function() {
                e.getInputNode().focus(), e._focusAfterUpdate = !1;
              }, 50)), this._focusedOptionReveal) {
                if (this.refs.focused && this.refs.menu) {
                  var t = s.findDOMNode(this.refs.focused),
                      i = s.findDOMNode(this.refs.menu),
                      n = t.getBoundingClientRect(),
                      a = i.getBoundingClientRect();
                  (n.bottom > a.bottom || n.top < a.top) && (i.scrollTop = t.offsetTop + t.clientHeight - i.offsetHeight);
                }
                this._focusedOptionReveal = !1;
              }
            },
            focus: function() {
              this.getInputNode().focus();
            },
            clickedOutsideElement: function(e, t) {
              for (var i = t.target ? t.target : t.srcElement; null != i; ) {
                if (i === e)
                  return !1;
                i = i.offsetParent;
              }
              return !0;
            },
            getStateFromValue: function(e, t, i) {
              t || (t = this.state.options), i || (i = this.props.placeholder), this._optionsFilterString = "";
              var n = this.initValuesArray(e, t),
                  s = this.filterOptions(t, n);
              return {
                value: n.map(function(e) {
                  return e.value;
                }).join(this.props.delimiter),
                values: n,
                inputValue: "",
                filteredOptions: s,
                placeholder: !this.props.multi && n.length ? n[0].label : i,
                focusedOption: !this.props.multi && n.length ? n[0] : s[0]
              };
            },
            initValuesArray: function(e, t) {
              return Array.isArray(e) || (e = "string" == typeof e ? "" === e ? [] : e.split(this.props.delimiter) : e ? [e] : []), e.map(function(e) {
                if ("string" == typeof e) {
                  for (var i in t)
                    if (t.hasOwnProperty(i) && t[i] && t[i].value === e)
                      return t[i];
                  return {
                    value: e,
                    label: e
                  };
                }
                return e;
              });
            },
            setValue: function(e, t) {
              (t || void 0 === t) && (this._focusAfterUpdate = !0);
              var i = this.getStateFromValue(e);
              i.isOpen = !1, this.fireChangeEvent(i), this.setState(i);
            },
            selectValue: function(e) {
              this.props.multi ? e && this.addValue(e) : this.setValue(e), this._unbindCloseMenuIfClickedOutside();
            },
            addValue: function(e) {
              this.setValue(this.state.values.concat(e));
            },
            popValue: function() {
              this.setValue(this.state.values.slice(0, this.state.values.length - 1));
            },
            removeValue: function(e) {
              this.setValue(this.state.values.filter(function(t) {
                return t !== e;
              }));
            },
            clearValue: function(e) {
              e && "mousedown" === e.type && 0 !== e.button || (e.stopPropagation(), e.preventDefault(), this.setValue(null));
            },
            resetValue: function() {
              this.setValue("" === this.state.value ? null : this.state.value);
            },
            getInputNode: function() {
              var e = this.refs.input;
              return this.props.searchable ? e : s.findDOMNode(e);
            },
            fireChangeEvent: function(e) {
              e.value !== this.state.value && this.props.onChange && this.props.onChange(e.value, e.values);
            },
            handleMouseDown: function(e) {
              this.props.disabled || "mousedown" === e.type && 0 !== e.button || (e.stopPropagation(), e.preventDefault(), this.state.isFocused ? this.setState({isOpen: !0}, this._bindCloseMenuIfClickedOutside) : (this._openAfterFocus = !0, this.getInputNode().focus()));
            },
            handleMouseDownOnArrow: function(e) {
              this.props.disabled || "mousedown" === e.type && 0 !== e.button || this.state.isOpen && (e.stopPropagation(), e.preventDefault(), this.setState({isOpen: !1}, this._unbindCloseMenuIfClickedOutside));
            },
            handleInputFocus: function(e) {
              var t = this.state.isOpen || this._openAfterFocus;
              this.setState({
                isFocused: !0,
                isOpen: t
              }, function() {
                t ? this._bindCloseMenuIfClickedOutside() : this._unbindCloseMenuIfClickedOutside();
              }), this._openAfterFocus = !1, this.props.onFocus && this.props.onFocus(e);
            },
            handleInputBlur: function(e) {
              var t = this;
              this._blurTimeout = setTimeout(function() {
                t._focusAfterUpdate || t.setState({isFocused: !1});
              }, 50), this.props.onBlur && this.props.onBlur(e);
            },
            handleKeyDown: function(e) {
              if (!this.state.disabled) {
                switch (e.keyCode) {
                  case 8:
                    return void(this.state.inputValue || this.popValue());
                  case 9:
                    if (e.shiftKey || !this.state.isOpen || !this.state.focusedOption)
                      return;
                    this.selectFocusedOption();
                    break;
                  case 13:
                    if (!this.state.isOpen)
                      return;
                    this.selectFocusedOption();
                    break;
                  case 27:
                    this.state.isOpen ? this.resetValue() : this.clearValue(e);
                    break;
                  case 38:
                    this.focusPreviousOption();
                    break;
                  case 40:
                    this.focusNextOption();
                    break;
                  case 188:
                    if (!this.props.allowCreate || !this.props.multi)
                      return;
                    e.preventDefault(), e.stopPropagation(), this.selectFocusedOption();
                    break;
                  default:
                    return;
                }
                e.preventDefault();
              }
            },
            _getNewFocusedOption: function(e) {
              for (var t in e)
                if (e.hasOwnProperty(t) && e[t] === this.state.focusedOption)
                  return e[t];
              return e[0];
            },
            handleInputChange: function(e) {
              if (this._optionsFilterString = e.target.value, this.props.asyncOptions)
                this.setState({
                  isLoading: !0,
                  inputValue: e.target.value
                }), this.loadAsyncOptions(e.target.value, {
                  isLoading: !1,
                  isOpen: !0
                }, this._bindCloseMenuIfClickedOutside);
              else {
                var t = this.filterOptions(this.state.options);
                this.setState({
                  isOpen: !0,
                  inputValue: e.target.value,
                  filteredOptions: t,
                  focusedOption: this._getNewFocusedOption(t)
                }, this._bindCloseMenuIfClickedOutside);
              }
            },
            autoloadAsyncOptions: function() {
              var e = this;
              this.loadAsyncOptions(this.props.value || "", {}, function() {
                e.setValue(e.props.value, !1);
              });
            },
            loadAsyncOptions: function(e, t, i) {
              for (var n = this._currentRequestId = l++,
                  s = 0; s <= e.length; s++) {
                var a = e.slice(0, s);
                if (this._optionsCache[a] && (e === a || this._optionsCache[a].complete)) {
                  var r = this._optionsCache[a].options,
                      o = this.filterOptions(r),
                      u = {
                        options: r,
                        filteredOptions: o,
                        focusedOption: this._getNewFocusedOption(o)
                      };
                  for (var p in t)
                    t.hasOwnProperty(p) && (u[p] = t[p]);
                  return this.setState(u), void(i && i.call(this, {}));
                }
              }
              var d = this;
              this.props.asyncOptions(e, function(s, a) {
                if (s)
                  throw s;
                if (d._optionsCache[e] = a, n === d._currentRequestId) {
                  var r = d.filterOptions(a.options),
                      o = {
                        options: a.options,
                        filteredOptions: r,
                        focusedOption: d._getNewFocusedOption(r)
                      };
                  for (var l in t)
                    t.hasOwnProperty(l) && (o[l] = t[l]);
                  d.setState(o), i && i.call(d, {});
                }
              });
            },
            filterOptions: function(e, t) {
              if (!this.props.searchable)
                return e;
              var i = this._optionsFilterString,
                  n = (t || this.state.values).map(function(e) {
                    return e.value;
                  });
              if (this.props.filterOptions)
                return this.props.filterOptions.call(this, e, i, n);
              var s = function(e) {
                if (this.props.multi && n.indexOf(e.value) > -1)
                  return !1;
                if (this.props.filterOption)
                  return this.props.filterOption.call(this, e, i);
                var t = String(e.value),
                    s = String(e.label);
                return this.props.ignoreCase && (t = t.toLowerCase(), s = s.toLowerCase(), i = i.toLowerCase()), i && "start" !== this.props.matchPos ? "label" !== this.props.matchProp && t.indexOf(i) >= 0 || "value" !== this.props.matchProp && s.indexOf(i) >= 0 : "label" !== this.props.matchProp && t.substr(0, i.length) === i || "value" !== this.props.matchProp && s.substr(0, i.length) === i;
              };
              return (e || []).filter(s, this);
            },
            selectFocusedOption: function() {
              return this.props.allowCreate && !this.state.focusedOption ? this.selectValue(this.state.inputValue) : this.selectValue(this.state.focusedOption);
            },
            focusOption: function(e) {
              this.setState({focusedOption: e});
            },
            focusNextOption: function() {
              this.focusAdjacentOption("next");
            },
            focusPreviousOption: function() {
              this.focusAdjacentOption("previous");
            },
            focusAdjacentOption: function(e) {
              this._focusedOptionReveal = !0;
              var t = this.state.filteredOptions;
              if (!this.state.isOpen)
                return void this.setState({
                  isOpen: !0,
                  inputValue: "",
                  focusedOption: this.state.focusedOption || t["next" === e ? 0 : t.length - 1]
                }, this._bindCloseMenuIfClickedOutside);
              if (t.length) {
                for (var i = -1,
                    n = 0; n < t.length; n++)
                  if (this.state.focusedOption === t[n]) {
                    i = n;
                    break;
                  }
                var s = t[0];
                "next" === e && i > -1 && i < t.length - 1 ? s = t[i + 1] : "previous" === e && (s = i > 0 ? t[i - 1] : t[t.length - 1]), this.setState({focusedOption: s});
              }
            },
            unfocusOption: function(e) {
              this.state.focusedOption === e && this.setState({focusedOption: null});
            },
            buildMenu: function() {
              var e = this.state.focusedOption ? this.state.focusedOption.value : null,
                  t = this.props.optionRenderer || function(e) {
                    return e.label;
                  };
              this.state.filteredOptions.length > 0 && (e = null == e ? this.state.filteredOptions[0] : e);
              var i = this.state.filteredOptions;
              if (this.props.allowCreate && this.state.inputValue.trim()) {
                var n = this.state.inputValue;
                i = i.slice(), i.unshift({
                  value: n,
                  label: n,
                  create: !0
                });
              }
              var a = Object.keys(i).map(function(n) {
                var a = i[n],
                    o = this.state.value === a.value,
                    l = e === a.value,
                    u = r({
                      "Select-option": !0,
                      "is-selected": o,
                      "is-focused": l,
                      "is-disabled": a.disabled
                    }),
                    p = l ? "focused" : null,
                    d = this.focusOption.bind(this, a),
                    h = this.unfocusOption.bind(this, a),
                    c = this.selectValue.bind(this, a),
                    f = t(a);
                return a.disabled ? s.createElement("div", {
                  ref: p,
                  key: "option-" + a.value,
                  className: u
                }, f) : s.createElement("div", {
                  ref: p,
                  key: "option-" + a.value,
                  className: u,
                  onMouseEnter: d,
                  onMouseLeave: h,
                  onMouseDown: c,
                  onClick: c
                }, a.create ? this.props.addLabelText.replace("{label}", a.label) : f);
              }, this);
              return a.length ? a : s.createElement("div", {className: "Select-noresults"}, this.props.asyncOptions && !this.state.inputValue ? this.props.searchPromptText : this.props.noResultsText);
            },
            handleOptionLabelClick: function(e, t) {
              this.props.onOptionLabelClick && this.props.onOptionLabelClick(e, t);
            },
            render: function() {
              var e = r("Select", this.props.className, {
                "is-multi": this.props.multi,
                "is-searchable": this.props.searchable,
                "is-open": this.state.isOpen,
                "is-focused": this.state.isFocused,
                "is-loading": this.state.isLoading,
                "is-disabled": this.props.disabled,
                "has-value": this.state.value
              }),
                  t = [];
              this.props.multi && this.state.values.forEach(function(e) {
                t.push(s.createElement(o, {
                  key: e.value,
                  option: e,
                  renderer: this.props.valueRenderer,
                  optionLabelClick: !!this.props.onOptionLabelClick,
                  onOptionLabelClick: this.handleOptionLabelClick.bind(this, e),
                  onRemove: this.removeValue.bind(this, e),
                  disabled: this.props.disabled
                }));
              }, this), this.state.inputValue || this.props.multi && t.length || t.push(s.createElement("div", {
                className: "Select-placeholder",
                key: "placeholder"
              }, this.state.placeholder));
              var i,
                  l,
                  u = this.state.isLoading ? s.createElement("span", {
                    className: "Select-loading",
                    "aria-hidden": "true"
                  }) : null,
                  p = this.props.clearable && this.state.value && !this.props.disabled ? s.createElement("span", {
                    className: "Select-clear",
                    title: this.props.multi ? this.props.clearAllText : this.props.clearValueText,
                    "aria-label": this.props.multi ? this.props.clearAllText : this.props.clearValueText,
                    onMouseDown: this.clearValue,
                    onClick: this.clearValue,
                    dangerouslySetInnerHTML: {__html: "&times;"}
                  }) : null;
              this.state.isOpen && (l = {
                ref: "menu",
                className: "Select-menu"
              }, this.props.multi && (l.onMouseDown = this.handleMouseDown), i = s.createElement("div", {
                ref: "selectMenuContainer",
                className: "Select-menu-outer"
              }, s.createElement("div", l, this.buildMenu())));
              var d,
                  h = {
                    ref: "input",
                    className: "Select-input",
                    tabIndex: this.props.tabIndex || 0,
                    onFocus: this.handleInputFocus,
                    onBlur: this.handleInputBlur
                  };
              for (var c in this.props.inputProps)
                this.props.inputProps.hasOwnProperty(c) && (h[c] = this.props.inputProps[c]);
              return this.props.disabled ? this.props.multi && this.state.values.length || (d = s.createElement("div", {className: "Select-input"}, " ")) : d = this.props.searchable ? s.createElement(a, n({
                value: this.state.inputValue,
                onChange: this.handleInputChange,
                minWidth: "5"
              }, h)) : s.createElement("div", h, " "), s.createElement("div", {
                ref: "wrapper",
                className: e
              }, s.createElement("input", {
                type: "hidden",
                ref: "value",
                name: this.props.name,
                value: this.state.value,
                disabled: this.props.disabled
              }), s.createElement("div", {
                className: "Select-control",
                ref: "control",
                onKeyDown: this.handleKeyDown,
                onMouseDown: this.handleMouseDown,
                onTouchEnd: this.handleMouseDown
              }, t, d, s.createElement("span", {
                className: "Select-arrow-zone",
                onMouseDown: this.handleMouseDownOnArrow
              }), s.createElement("span", {
                className: "Select-arrow",
                onMouseDown: this.handleMouseDownOnArrow
              }), u, p), i);
            }
          });
      e.exports = u;
    }, function(e, t, i) {
      "use strict";
      var n = i(1),
          s = n.createClass({
            displayName: "Value",
            propTypes: {
              disabled: n.PropTypes.bool,
              onOptionLabelClick: n.PropTypes.func,
              onRemove: n.PropTypes.func,
              option: n.PropTypes.object.isRequired,
              optionLabelClick: n.PropTypes.bool,
              renderer: n.PropTypes.func
            },
            blockEvent: function(e) {
              e.stopPropagation();
            },
            handleOnRemove: function(e) {
              this.props.disabled || this.props.onRemove(e);
            },
            render: function() {
              var e = this.props.option.label;
              return this.props.renderer && (e = this.props.renderer(this.props.option)), this.props.optionLabelClick && (e = n.createElement("a", {
                className: "Select-item-label__a",
                onMouseDown: this.blockEvent,
                onTouchEnd: this.props.onOptionLabelClick,
                onClick: this.props.onOptionLabelClick
              }, e)), n.createElement("div", {className: "Select-item"}, n.createElement("span", {
                className: "Select-item-icon",
                onMouseDown: this.blockEvent,
                onClick: this.handleOnRemove,
                onTouchEnd: this.handleOnRemove
              }, "×"), n.createElement("span", {className: "Select-item-label"}, e));
            }
          });
      e.exports = s;
    }, function(e, t, i) {
      "use strict";
      var n = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var i = arguments[t];
          for (var n in i)
            Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
        }
        return e;
      },
          s = i(1),
          a = {
            position: "absolute",
            visibility: "hidden",
            height: 0,
            width: 0,
            overflow: "scroll",
            whiteSpace: "nowrap"
          },
          r = s.createClass({
            displayName: "AutosizeInput",
            propTypes: {
              value: s.PropTypes.any,
              defaultValue: s.PropTypes.any,
              onChange: s.PropTypes.func,
              style: s.PropTypes.object,
              className: s.PropTypes.string,
              minWidth: s.PropTypes.oneOfType([s.PropTypes.number, s.PropTypes.string]),
              inputStyle: s.PropTypes.object,
              inputClassName: s.PropTypes.string
            },
            getDefaultProps: function() {
              return {minWidth: 1};
            },
            getInitialState: function() {
              return {inputWidth: this.props.minWidth};
            },
            componentDidMount: function() {
              this.copyInputStyles(), this.updateInputWidth();
            },
            componentDidUpdate: function() {
              this.updateInputWidth();
            },
            copyInputStyles: function() {
              if (this.isMounted() && window.getComputedStyle) {
                var e = window.getComputedStyle(s.findDOMNode(this.refs.input)),
                    t = s.findDOMNode(this.refs.sizer);
                if (t.style.fontSize = e.fontSize, t.style.fontFamily = e.fontFamily, this.props.placeholder) {
                  var i = s.findDOMNode(this.refs.placeholderSizer);
                  i.style.fontSize = e.fontSize, i.style.fontFamily = e.fontFamily;
                }
              }
            },
            updateInputWidth: function() {
              if (this.isMounted() && "undefined" != typeof s.findDOMNode(this.refs.sizer).scrollWidth) {
                var e;
                e = this.props.placeholder ? Math.max(s.findDOMNode(this.refs.sizer).scrollWidth, s.findDOMNode(this.refs.placeholderSizer).scrollWidth) + 2 : s.findDOMNode(this.refs.sizer).scrollWidth + 2, e < this.props.minWidth && (e = this.props.minWidth), e !== this.state.inputWidth && this.setState({inputWidth: e});
              }
            },
            getInput: function() {
              return this.refs.input;
            },
            focus: function() {
              s.findDOMNode(this.refs.input).focus();
            },
            select: function() {
              s.findDOMNode(this.refs.input).select();
            },
            render: function() {
              var e = (this.props.value || "").replace(/\&/g, "&amp;").replace(/ /g, "&nbsp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;"),
                  t = this.props.style || {};
              t.display = "inline-block";
              var i = this.props.inputStyle || {};
              i.width = this.state.inputWidth;
              var r = this.props.placeholder ? s.createElement("div", {
                ref: "placeholderSizer",
                style: a
              }, this.props.placeholder) : null;
              return s.createElement("div", {
                className: this.props.className,
                style: t
              }, s.createElement("input", n({}, this.props, {
                ref: "input",
                className: this.props.inputClassName,
                style: i
              })), s.createElement("div", {
                ref: "sizer",
                style: a,
                dangerouslySetInnerHTML: {__html: e}
              }), r);
            }
          });
      e.exports = r;
    }, function(e, t, i) {
      !function(t, n) {
        e.exports = n(i(1));
      }(this, function(e) {
        return function(e) {
          function t(n) {
            if (i[n])
              return i[n].exports;
            var s = i[n] = {
              exports: {},
              id: n,
              loaded: !1
            };
            return e[n].call(s.exports, s, s.exports, t), s.loaded = !0, s.exports;
          }
          var i = {};
          return t.m = e, t.c = i, t.p = "", t(0);
        }([function(e, t, i) {
          e.exports = i(2);
        }, function(e, t) {
          "use strict";
          function i(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          }
          Object.defineProperty(t, "__esModule", {value: !0});
          var n = function() {
            function e(e, t) {
              for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, i, n) {
              return i && e(t.prototype, i), n && e(t, n), t;
            };
          }(),
              s = function() {
                function e(t, n, s, a) {
                  i(this, e), this.startPoint = t, this.control1 = n, this.control2 = s, this.endPoint = a;
                }
                return n(e, [{
                  key: "length",
                  value: function t() {
                    var e,
                        i,
                        n,
                        s,
                        a,
                        r,
                        o,
                        l,
                        u = 10,
                        t = 0;
                    for (e = 0; u >= e; e++)
                      i = e / u, n = this._point(i, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x), s = this._point(i, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y), e > 0 && (o = n - a, l = s - r, t += Math.sqrt(o * o + l * l)), a = n, r = s;
                    return t;
                  }
                }, {
                  key: "_point",
                  value: function(e, t, i, n, s) {
                    return t * (1 - e) * (1 - e) * (1 - e) + 3 * i * (1 - e) * (1 - e) * e + 3 * n * (1 - e) * e * e + s * e * e * e;
                  }
                }]), e;
              }();
          t["default"] = s, e.exports = t["default"];
        }, function(e, t, i) {
          "use strict";
          function n(e) {
            return e && e.__esModule ? e : {"default": e};
          }
          function s(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          }
          function a(e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }}), t && (e.__proto__ = t);
          }
          Object.defineProperty(t, "__esModule", {value: !0});
          var r = function() {
            function e(e, t) {
              for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, i, n) {
              return i && e(t.prototype, i), n && e(t, n), t;
            };
          }(),
              o = function(e, t, i) {
                for (var n = !0; n; ) {
                  var s = e,
                      a = t,
                      r = i;
                  o = u = l = void 0, n = !1, null === s && (s = Function.prototype);
                  var o = Object.getOwnPropertyDescriptor(s, a);
                  if (void 0 !== o) {
                    if ("value" in o)
                      return o.value;
                    var l = o.get;
                    return void 0 === l ? void 0 : l.call(r);
                  }
                  var u = Object.getPrototypeOf(s);
                  if (null === u)
                    return void 0;
                  e = u, t = a, i = r, n = !0;
                }
              },
              l = i(4),
              u = n(l),
              p = i(1),
              d = n(p),
              h = i(3),
              c = n(h),
              f = function(e) {
                function t(e) {
                  s(this, t), o(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e), this.velocityFilterWeight = this.props.velocityFilterWeight || .7, this.minWidth = this.props.minWidth || .5, this.maxWidth = this.props.maxWidth || 2.5, this.dotSize = this.props.dotSize || function() {
                    return (this.minWidth + this.maxWidth) / 2;
                  }, this.penColor = this.props.penColor || "black", this.backgroundColor = this.props.backgroundColor || "rgba(0,0,0,0)", this.onEnd = this.props.onEnd, this.onBegin = this.props.onBegin;
                }
                return a(t, e), r(t, [{
                  key: "componentDidMount",
                  value: function() {
                    this._canvas = u["default"].findDOMNode(this.refs.cv), this._ctx = this._canvas.getContext("2d"), this.clear(), this._handleMouseEvents(), this._handleTouchEvents(), this._resizeCanvas();
                  }
                }, {
                  key: "componentWillUnmount",
                  value: function() {
                    this.off();
                  }
                }, {
                  key: "clear",
                  value: function(e) {
                    e && e.preventDefault();
                    var t = this._ctx,
                        i = this._canvas;
                    t.fillStyle = this.backgroundColor, t.clearRect(0, 0, i.width, i.height), t.fillRect(0, 0, i.width, i.height), this._reset();
                  }
                }, {
                  key: "toDataURL",
                  value: function(e, t) {
                    var i = this._canvas;
                    return i.toDataURL.apply(i, arguments);
                  }
                }, {
                  key: "fromDataURL",
                  value: function(e) {
                    var t = this,
                        i = new Image,
                        n = window.devicePixelRatio || 1,
                        s = this._canvas.width / n,
                        a = this._canvas.height / n;
                    this._reset(), i.src = e, i.onload = function() {
                      t._ctx.drawImage(i, 0, 0, s, a);
                    }, this._isEmpty = !1;
                  }
                }, {
                  key: "isEmpty",
                  value: function() {
                    return this._isEmpty;
                  }
                }, {
                  key: "_resizeCanvas",
                  value: function() {
                    var e = this._ctx,
                        t = this._canvas,
                        i = Math.max(window.devicePixelRatio || 1, 1);
                    t.width = t.offsetWidth * i, t.height = t.offsetHeight * i, e.scale(i, i);
                  }
                }, {
                  key: "_reset",
                  value: function() {
                    this.points = [], this._lastVelocity = 0, this._lastWidth = (this.minWidth + this.maxWidth) / 2, this._isEmpty = !0, this._ctx.fillStyle = this.penColor;
                  }
                }, {
                  key: "_handleMouseEvents",
                  value: function() {
                    this._mouseButtonDown = !1, this._canvas.addEventListener("mousedown", this._handleMouseDown.bind(this)), this._canvas.addEventListener("mousemove", this._handleMouseMove.bind(this)), document.addEventListener("mouseup", this._handleMouseUp.bind(this)), window.addEventListener("resize", this._resizeCanvas.bind(this));
                  }
                }, {
                  key: "_handleTouchEvents",
                  value: function() {
                    this._canvas.style.msTouchAction = "none", this._canvas.addEventListener("touchstart", this._handleTouchStart.bind(this)), this._canvas.addEventListener("touchmove", this._handleTouchMove.bind(this)), document.addEventListener("touchend", this._handleTouchEnd.bind(this));
                  }
                }, {
                  key: "off",
                  value: function() {
                    this._canvas.removeEventListener("mousedown", this._handleMouseDown), this._canvas.removeEventListener("mousemove", this._handleMouseMove), document.removeEventListener("mouseup", this._handleMouseUp), this._canvas.removeEventListener("touchstart", this._handleTouchStart), this._canvas.removeEventListener("touchmove", this._handleTouchMove), document.removeEventListener("touchend", this._handleTouchEnd), window.removeEventListener("resize", this._resizeCanvas);
                  }
                }, {
                  key: "_handleMouseDown",
                  value: function(e) {
                    1 === e.which && (this._mouseButtonDown = !0, this._strokeBegin(e));
                  }
                }, {
                  key: "_handleMouseMove",
                  value: function(e) {
                    this._mouseButtonDown && this._strokeUpdate(e);
                  }
                }, {
                  key: "_handleMouseUp",
                  value: function(e) {
                    1 === e.which && this._mouseButtonDown && (this._mouseButtonDown = !1, this._strokeEnd(e));
                  }
                }, {
                  key: "_handleTouchStart",
                  value: function(e) {
                    var t = e.changedTouches[0];
                    this._strokeBegin(t);
                  }
                }, {
                  key: "_handleTouchMove",
                  value: function(e) {
                    e.preventDefault();
                    var t = e.changedTouches[0];
                    this._strokeUpdate(t);
                  }
                }, {
                  key: "_handleTouchEnd",
                  value: function(e) {
                    var t = e.target === this._canvas;
                    t && this._strokeEnd(e);
                  }
                }, {
                  key: "_strokeUpdate",
                  value: function(e) {
                    var t = this._createPoint(e);
                    this._addPoint(t);
                  }
                }, {
                  key: "_strokeBegin",
                  value: function(e) {
                    this._reset(), this._strokeUpdate(e), "function" == typeof this.onBegin && this.onBegin(e);
                  }
                }, {
                  key: "_strokeDraw",
                  value: function(e) {
                    var t = this._ctx,
                        i = "function" == typeof this.dotSize ? this.dotSize() : this.dotSize;
                    t.beginPath(), this._drawPoint(e.x, e.y, i), t.closePath(), t.fill();
                  }
                }, {
                  key: "_strokeEnd",
                  value: function(e) {
                    var t = this.points.length > 2,
                        i = this.points[0];
                    !t && i && this._strokeDraw(i), "function" == typeof this.onEnd && this.onEnd(e);
                  }
                }, {
                  key: "_createPoint",
                  value: function(e) {
                    var t = this._canvas.getBoundingClientRect();
                    return new c["default"](e.clientX - t.left, e.clientY - t.top);
                  }
                }, {
                  key: "_addPoint",
                  value: function(e) {
                    var t,
                        i,
                        n,
                        s,
                        a = this.points;
                    a.push(e), a.length > 2 && (3 === a.length && a.unshift(a[0]), s = this._calculateCurveControlPoints(a[0], a[1], a[2]), t = s.c2, s = this._calculateCurveControlPoints(a[1], a[2], a[3]), i = s.c1, n = new d["default"](a[1], t, i, a[2]), this._addCurve(n), a.shift());
                  }
                }, {
                  key: "_calculateCurveControlPoints",
                  value: function(e, t, i) {
                    var n = e.x - t.x,
                        s = e.y - t.y,
                        a = t.x - i.x,
                        r = t.y - i.y,
                        o = {
                          x: (e.x + t.x) / 2,
                          y: (e.y + t.y) / 2
                        },
                        l = {
                          x: (t.x + i.x) / 2,
                          y: (t.y + i.y) / 2
                        },
                        u = Math.sqrt(n * n + s * s),
                        p = Math.sqrt(a * a + r * r),
                        d = o.x - l.x,
                        h = o.y - l.y,
                        f = p / (u + p),
                        m = {
                          x: l.x + d * f,
                          y: l.y + h * f
                        },
                        v = t.x - m.x,
                        g = t.y - m.y;
                    return {
                      c1: new c["default"](o.x + v, o.y + g),
                      c2: new c["default"](l.x + v, l.y + g)
                    };
                  }
                }, {
                  key: "_addCurve",
                  value: function(e) {
                    var t,
                        i,
                        n = e.startPoint,
                        s = e.endPoint;
                    t = s.velocityFrom(n), t = this.velocityFilterWeight * t + (1 - this.velocityFilterWeight) * this._lastVelocity, i = this._strokeWidth(t), this._drawCurve(e, this._lastWidth, i), this._lastVelocity = t, this._lastWidth = i;
                  }
                }, {
                  key: "_drawPoint",
                  value: function(e, t, i) {
                    var n = this._ctx;
                    n.moveTo(e, t), n.arc(e, t, i, 0, 2 * Math.PI, !1), this._isEmpty = !1;
                  }
                }, {
                  key: "_drawCurve",
                  value: function(e, t, i) {
                    var n,
                        s,
                        a,
                        r,
                        o,
                        l,
                        u,
                        p,
                        d,
                        h,
                        c,
                        f = this._ctx,
                        m = i - t;
                    for (n = Math.floor(e.length()), f.beginPath(), a = 0; n > a; a++)
                      r = a / n, o = r * r, l = o * r, u = 1 - r, p = u * u, d = p * u, h = d * e.startPoint.x, h += 3 * p * r * e.control1.x, h += 3 * u * o * e.control2.x, h += l * e.endPoint.x, c = d * e.startPoint.y, c += 3 * p * r * e.control1.y, c += 3 * u * o * e.control2.y, c += l * e.endPoint.y, s = t + l * m, this._drawPoint(h, c, s);
                    f.closePath(), f.fill();
                  }
                }, {
                  key: "_strokeWidth",
                  value: function(e) {
                    return Math.max(this.maxWidth / (e + 1), this.minWidth);
                  }
                }, {
                  key: "render",
                  value: function() {
                    return u["default"].createElement("div", {
                      id: "signature-pad",
                      className: "m-signature-pad"
                    }, u["default"].createElement("div", {className: "m-signature-pad--body"}, u["default"].createElement("canvas", {ref: "cv"})), this.props.clearButton && u["default"].createElement("div", {className: "m-signature-pad--footer"}, u["default"].createElement("button", {
                      className: "btn btn-default button clear",
                      onClick: this.clear.bind(this)
                    }, "Clear")));
                  }
                }]), t;
              }(u["default"].Component);
          t["default"] = f, e.exports = t["default"];
        }, function(e, t) {
          "use strict";
          function i(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          }
          Object.defineProperty(t, "__esModule", {value: !0});
          var n = function() {
            function e(e, t) {
              for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, i, n) {
              return i && e(t.prototype, i), n && e(t, n), t;
            };
          }(),
              s = function() {
                function e(t, n, s) {
                  i(this, e), this.x = t, this.y = n, this.time = s || (new Date).getTime();
                }
                return n(e, [{
                  key: "velocityFrom",
                  value: function(e) {
                    return this.time !== e.time ? this.distanceTo(e) / (this.time - e.time) : 1;
                  }
                }, {
                  key: "distanceTo",
                  value: function(e) {
                    return Math.sqrt(Math.pow(this.x - e.x, 2) + Math.pow(this.y - e.y, 2));
                  }
                }]), e;
              }();
          t["default"] = s, e.exports = t["default"];
        }, function(t, i) {
          t.exports = e;
        }]);
      });
    }, function(e, t, i) {
      "use strict";
      var n = i(19),
          s = (i(4), n.addons.cloneWithProps);
      e.exports = n.createClass({
        displayName: "Sortable",
        propTypes: {
          onSort: n.PropTypes.func,
          horizontal: n.PropTypes.bool,
          sensitivity: function(e, t, i) {
            return isNaN(parseFloat(e[t])) && !isFinite(e[t]) || e[t] < 0 || e[t] > 1 ? new Error("sensitivity must be a number from 0 to 1.") : void 0;
          }.bind(this),
          sinkUndraggables: n.PropTypes.bool,
          floatUndraggables: n.PropTypes.bool
        },
        getDefaultProps: function() {
          return {
            onSort: function() {},
            horizontal: !1,
            sinkUndraggables: !1,
            sensitivity: 0
          };
        },
        getInitialState: function() {
          return this.rerender(this.props.children), {
            isDragging: !1,
            placeHolderIndex: null,
            left: null,
            top: null
          };
        },
        componentWillReceiveProps: function(e) {
          this.props.children !== e.children && this.rerender(e.children);
        },
        rerender: function(e) {
          this._firstDraggable = 0, this._lastDraggable = n.Children.count(e) - 1;
          var t = !1;
          this._orderArr = [], this._dimensionArr = e.map(function(e, i) {
            return this.props.sinkUndraggables && !e.props.isDraggable && i <= this._lastDraggable && !t ? (this._lastDraggable = i - 1, t = !0) : this.props.floatUndraggables && !e.props.isDraggable && i >= this._firstDraggable && (this._firstDraggable = i + 1), this._orderArr.push(i), {};
          }.bind(this));
        },
        componentDidMount: function() {
          this._dragDimensions = null;
        },
        componentWillUnmount: function() {
          this.unbindEvent();
        },
        bindEvent: function() {
          document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("mouseup", this.handleMouseUp);
        },
        unbindEvent: function() {
          document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp);
        },
        handleMouseDown: function(e, t) {
          this.containerWidth = this.getDOMNode().offsetWidth, this.containerHeight = this.getDOMNode().offsetHeight, this._draggingIndex = t, this._prevX = e.pageX, this._prevY = e.pageY, this._initOffset = e.offset, this.bindEvent();
        },
        handleMouseMove: function(e) {
          var t = this.calculateNewOffset(e),
              i = this.calculateNewIndex(e),
              n = {
                isDragging: !0,
                top: t.top,
                left: t.left
              };
          -1 !== i && (this._draggingIndex = i, n.placeHolderIndex = i), this.setState(n), this._prevX = e.pageX, this._prevY = e.pageY;
        },
        handleMouseUp: function(e) {
          this.unbindEvent(), this._draggingIndex = null, this._initOffset = null, this._prevX = null, this._prevY = null, this._dragDimensions = null, this.state.isDragging && this.props.onSort(this.getSortData()), this.isMounted() && this.setState({
            isDragging: !1,
            placeHolderIndex: null,
            left: null,
            top: null
          });
        },
        handleChildUpdate: function(e, t, i, s) {
          this._dimensionArr[s] = n.addons.update(this._dimensionArr[s], {
            top: {$set: e.top},
            left: {$set: e.left},
            width: {$set: t},
            height: {$set: i}
          });
        },
        getIndexByOffset: function(e, t) {
          if (!e || !this.isNumeric(e.top) || !this.isNumeric(e.left))
            return -1;
          var i,
              n = e.left,
              s = e.top,
              a = null !== this.state.placeHolderIndex ? this.state.placeHolderIndex : this._draggingIndex;
          return i = this.props.horizontal ? this.getHorizontalIndexOffset(n, s, t) : this.getVerticalIndexOffset(n, s, t), void 0 !== i ? i : a;
        },
        getVerticalIndexOffset: function(e, t, i) {
          var n,
              s = this._dimensionArr[this._dimensionArr.length - 1],
              a = 1 - this.props.sensitivity;
          return this._dimensionArr.every(function(r, o) {
            var l = e - r.left,
                u = t - r.top;
            return 0 > t ? (n = 0, !1) : t > this.containerHeight || t > s.top + s.height ? (n = this._dimensionArr.length - 1, !1) : u < r.height && l < r.width ? (u < r.height / 2 - r.height / 4 * a && "up" === i ? n = o : u > r.height / 2 + r.height / 4 * a && "down" === i && (n = Math.min(o + 1, this._dimensionArr.length - 1)), !1) : !0;
          }.bind(this)), n;
        },
        getHorizontalIndexOffset: function(e, t, i) {
          var n,
              s = this._dimensionArr[this._dimensionArr.length - 1],
              a = 1 - this.props.sensitivity;
          return this._dimensionArr.every(function(r, o) {
            var l = e - r.left;
            t - r.top;
            return 0 > e ? (n = 0, !1) : e > this.containerWidth || e > s.left + s.width ? (n = this._dimensionArr.length - 1, !1) : l < r.width ? (l < r.width / 2 - r.width / 4 * a && "left" === i ? n = o : l > r.width / 2 + r.width / 4 * a && "right" === i && (n = Math.min(o + 1, this._dimensionArr.length - 1)), !1) : !0;
          }.bind(this)), n;
        },
        isNumeric: function(e) {
          return !isNaN(parseFloat(e)) && isFinite(e);
        },
        swapArrayItemPosition: function(e, t, i) {
          if (!e || !this.isNumeric(t) || !this.isNumeric(i))
            return e;
          var n = e.splice(t, 1)[0];
          return e.splice(i, 0, n), e;
        },
        calculateNewOffset: function(e) {
          var t = this._prevX - e.pageX,
              i = this._prevY - e.pageY,
              n = null !== this.state.left ? this.state.left : this._initOffset.left,
              s = null !== this.state.top ? this.state.top : this._initOffset.top,
              a = n - t,
              r = s - i;
          return {
            left: a,
            top: r
          };
        },
        getPosition: function() {
          return {
            left: this.getDOMNode().offsetLeft,
            top: this.getDOMNode().offsetTop
          };
        },
        closest: function(e, t) {
          return e && (t(e) ? e : this.closest(e.parentNode, t));
        },
        calculateNewIndex: function(e) {
          var t,
              i = null !== this.state.placeHolderIndex ? this.state.placeHolderIndex : this._draggingIndex,
              n = this.closest(e.target, function(e) {
                return "undefined" == typeof e || "undefined" == typeof e.classList ? !1 : e.classList.contains("SortableItem");
              });
          n && (t = {
            left: n.offsetLeft,
            top: n.offsetTop
          });
          var s = "";
          s = this.props.horizontal ? this._prevX > e.pageX ? "left" : "right" : this._prevY > e.pageY ? "up" : "down";
          var a = this.getIndexByOffset(t, s);
          return -1 !== a && a < this._firstDraggable ? (a = this._firstDraggable, this._draggingIndex < this._firstDraggable && (a = this._firstDraggable - 1, this._firstDraggable -= 1)) : -1 !== a && a > this._lastDraggable && (a = this._lastDraggable, this._draggingIndex > this._lastDraggable && (a = this._lastDraggable + 1, this._lastDraggable += 1)), -1 !== a && a !== i && (this._dimensionArr = this.swapArrayItemPosition(this._dimensionArr, i, a), this._orderArr = this.swapArrayItemPosition(this._orderArr, i, a)), a;
        },
        getSortData: function() {
          return this._orderArr.map(function(e) {
            return this.props.children[e].props.sortData;
          }.bind(this));
        },
        renderItems: function() {
          var e = [],
              t = (n.Children.count(this.props.children), this._orderArr.map(function(t, i) {
                var n = this.props.children[t];
                return i === this._draggingIndex && n.props.isDraggable && (null === this._dragDimensions && (this._dragDimensions = {
                  width: this._dimensionArr[this._draggingIndex].width,
                  height: this._dimensionArr[this._draggingIndex].height
                }), e.push(this.renderDraggingItem(n))), s(n, {
                  key: i,
                  _isPlaceholder: i === this.state.placeHolderIndex,
                  sortableIndex: i,
                  onSortableItemMouseDown: function(e) {
                    this.handleMouseDown(e, i);
                  }.bind(this),
                  onSortableItemMount: this.handleChildUpdate
                });
              }.bind(this)));
          return t.concat(e);
        },
        renderDraggingItem: function(e) {
          var t = {
            top: this.state.top,
            left: this.state.left,
            width: this._dragDimensions.width,
            height: this._dragDimensions.height
          };
          return s(e, {
            key: this._dimensionArr.length,
            sortableStyle: t,
            _isDragging: !0
          });
        },
        render: function() {
          return n.createElement("div", {
            className: "Sortable",
            ref: "movable"
          }, this.renderItems());
        }
      });
    }, function(e, t, i) {
      "use strict";
      var n = i(19),
          s = i(4);
      e.exports = {
        getDefaultProps: function() {
          return {
            sortableStyle: {},
            onSortableItemMount: function() {},
            onSortableItemMouseDown: function() {},
            isDraggable: !0,
            _isPlaceholder: !1,
            _isDragging: !1
          };
        },
        handleSortableItemMouseDown: function(e) {
          var t = {
            pageX: e.pageX,
            pageY: e.pageY,
            offset: this.getPosition()
          };
          !e.target.classList.contains("is-isolated") && this.props.isDraggable && this.props.onSortableItemMouseDown(t, this.props.sortableIndex);
        },
        outerHeight: function() {
          var e = this.getDOMNode(),
              t = getComputedStyle(e);
          return e.offsetHeight + parseInt(t.marginTop) + parseInt(t.marginBottom);
        },
        outerWidth: function() {
          var e = this.getDOMNode(),
              t = getComputedStyle(e);
          return e.offsetWidth + parseInt(t.marginLeft) + parseInt(t.marginRight);
        },
        getPosition: function() {
          return {
            left: this.getDOMNode().offsetLeft,
            top: this.getDOMNode().offsetTop
          };
        },
        componentDidMount: function() {
          this.props.onSortableItemMount(this.getPosition(), this.outerWidth(), this.outerHeight(), this.props.sortableIndex);
        },
        componentDidUpdate: function() {
          this.props.onSortableItemMount(this.getPosition(), this.outerWidth(), this.outerHeight(), this.props.sortableIndex);
        },
        renderWithSortable: function(e) {
          var t = s({
            SortableItem: !0,
            "is-dragging": this.props._isDragging,
            "is-undraggable": !this.props.isDraggable,
            "is-placeholder": this.props._isPlaceholder
          });
          return n.addons.cloneWithProps(this.props._isPlaceholder && this.getPlaceholderContent && "[object Function]" === Object.prototype.toString.call(this.getPlaceholderContent) ? this.getPlaceholderContent() : e, {
            className: t,
            style: this.props.sortableStyle,
            key: this.props.sortableIndex,
            onMouseDown: this.handleSortableItemMouseDown,
            onMouseUp: this.handleSortableItemMouseUp
          });
        }
      };
    }, function(e, t, i) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : {"default": e};
      }
      function s(e, t, i) {
        return t in e ? Object.defineProperty(e, t, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : e[t] = i, e;
      }
      function a(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function r(e, t) {
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
          for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
          }
        }
        return function(t, i, n) {
          return i && e(t.prototype, i), n && e(t, n), t;
        };
      }(),
          l = function(e, t, i) {
            for (var n = !0; n; ) {
              var s = e,
                  a = t,
                  r = i;
              o = u = l = void 0, n = !1, null === s && (s = Function.prototype);
              var o = Object.getOwnPropertyDescriptor(s, a);
              if (void 0 !== o) {
                if ("value" in o)
                  return o.value;
                var l = o.get;
                return void 0 === l ? void 0 : l.call(r);
              }
              var u = Object.getPrototypeOf(s);
              if (null === u)
                return void 0;
              e = u, t = a, i = r, n = !0;
            }
          },
          u = i(1),
          p = n(u),
          d = i(4),
          h = n(d),
          c = function(e) {
            function t(e) {
              a(this, t), l(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e), p["default"].initializeTouchEvents(!0), this.state = {
                ratingCache: {
                  pos: 0,
                  rating: 0
                },
                editing: e.editing || !0,
                stars: 5,
                rating: 0,
                pos: 0,
                glyph: this.getStars()
              };
            }
            return r(t, e), o(t, [{
              key: "getStars",
              value: function() {
                for (var e = "",
                    t = this.props.ratingAmount,
                    i = 0; t > i; i++)
                  e += "★";
                return e;
              }
            }, {
              key: "componentWillMount",
              value: function() {
                if (this.min = 0, this.max = this.props.ratingAmount || 5, this.props.rating) {
                  this.state.editing = this.props.editing || !1;
                  var e = this.props.rating;
                  this.state.ratingCache.pos = this.getStarRatingPosition(e), this.state.ratingCache.rating = e, this.setState({
                    ratingCache: this.state.ratingCache,
                    rating: e,
                    pos: this.getStarRatingPosition(e)
                  });
                }
              }
            }, {
              key: "componentDidMount",
              value: function() {
                this.root = p["default"].findDOMNode(this.refs.root), this.ratingContainer = p["default"].findDOMNode(this.refs.ratingContainer);
              }
            }, {
              key: "componentWillUnmount",
              value: function() {
                delete this.root, delete this.ratingContainer;
              }
            }, {
              key: "getPosition",
              value: function(e) {
                return e.pageX - this.root.getBoundingClientRect().left;
              }
            }, {
              key: "applyPrecision",
              value: function(e, t) {
                return parseFloat(e.toFixed(t));
              }
            }, {
              key: "getDecimalPlaces",
              value: function(e) {
                var t = ("" + e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
              }
            }, {
              key: "getWidthFromValue",
              value: function(e) {
                var t = this.min,
                    i = this.max;
                return t >= e || t === i ? 0 : e >= i ? 100 : e / (i - t) * 100;
              }
            }, {
              key: "getValueFromPosition",
              value: function(e) {
                var t = this.getDecimalPlaces(this.props.step),
                    i = this.ratingContainer.offsetWidth,
                    n = this.max - this.min,
                    s = n * e / (i * this.props.step);
                s = Math.ceil(s);
                var a = this.applyPrecision(parseFloat(this.min + s * this.props.step), t);
                return a = Math.max(Math.min(a, this.max), this.min);
              }
            }, {
              key: "calculate",
              value: function(e) {
                var t = this.getValueFromPosition(e),
                    i = this.getWidthFromValue(t);
                return i += "%", {
                  width: i,
                  val: t
                };
              }
            }, {
              key: "getStarRatingPosition",
              value: function(e) {
                var t = this.getWidthFromValue(e) + "%";
                return t;
              }
            }, {
              key: "getRatingEvent",
              value: function(e) {
                var t = this.getPosition(e);
                return this.calculate(t);
              }
            }, {
              key: "getSvg",
              value: function() {
                return p["default"].createElement("svg", {
                  className: "react-star-rating__star",
                  viewBox: "0 0 286 272",
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg"
                }, p["default"].createElement("g", {
                  stroke: "none",
                  "stroke-width": "1",
                  fill: "none",
                  "fill-rule": "evenodd"
                }, p["default"].createElement("polygon", {
                  id: "star-flat",
                  points: "143 225 54.8322122 271.352549 71.6707613 173.176275 0.341522556 103.647451 98.9161061 89.3237254 143 0 187.083894 89.3237254 285.658477 103.647451 214.329239 173.176275 231.167788 271.352549 "
                })));
              }
            }, {
              key: "handleMouseLeave",
              value: function() {
                this.setState({
                  pos: this.state.ratingCache.pos,
                  rating: this.state.ratingCache.rating
                });
              }
            }, {
              key: "handleMouseMove",
              value: function(e) {
                var t = this.getRatingEvent(e);
                this.updateRating(t.width, t.val);
              }
            }, {
              key: "updateRating",
              value: function(e, t) {
                this.setState({
                  pos: e,
                  rating: t
                });
              }
            }, {
              key: "shouldComponentUpdate",
              value: function(e, t) {
                return e !== this.props ? (this.updateRating(this.getStarRatingPosition(e.rating), e.rating), !0) : t.ratingCache.rating !== this.state.ratingCache.rating || t.rating !== this.state.rating;
              }
            }, {
              key: "handleClick",
              value: function(e) {
                if (this.props.disabled)
                  return e.stopPropagation(), e.preventDefault(), !1;
                var t = {
                  pos: this.state.pos,
                  rating: this.state.rating,
                  caption: this.props.caption,
                  name: this.props.name
                };
                this.setState({ratingCache: t}), this.props.onRatingClick(e, t);
              }
            }, {
              key: "treatName",
              value: function(e) {
                return "string" == typeof e ? e.toLowerCase().split(" ").join("_") : void 0;
              }
            }, {
              key: "render",
              value: function() {
                var e,
                    t = null,
                    i = h["default"]((e = {
                      "react-star-rating__root": !0,
                      "rating-disabled": this.props.disabled
                    }, s(e, "react-star-rating__size--" + this.props.size, this.props.size), s(e, "rating-editing", this.state.editing), e));
                this.props.caption && (t = p["default"].createElement("span", {className: "react-rating-caption"}, this.props.caption));
                var n;
                return n = this.state.editing ? p["default"].createElement("div", {
                  ref: "ratingContainer",
                  className: "rating-container rating-gly-star",
                  "data-content": this.state.glyph,
                  onMouseMove: this.handleMouseMove.bind(this),
                  onMouseLeave: this.handleMouseLeave.bind(this),
                  onClick: this.handleClick.bind(this)
                }, p["default"].createElement("div", {
                  className: "rating-stars",
                  "data-content": this.state.glyph,
                  style: {width: this.state.pos}
                }), p["default"].createElement("input", {
                  type: "number",
                  name: this.props.name,
                  value: this.state.ratingCache.rating,
                  style: {display: "none !important"},
                  min: this.min,
                  max: this.max,
                  readOnly: !0
                })) : p["default"].createElement("div", {
                  ref: "ratingContainer",
                  className: "rating-container rating-gly-star",
                  "data-content": this.state.glyph
                }, p["default"].createElement("div", {
                  className: "rating-stars",
                  "data-content": this.state.glyph,
                  style: {width: this.state.pos}
                }), p["default"].createElement("input", {
                  type: "number",
                  name: this.props.name,
                  value: this.state.ratingCache.rating,
                  style: {display: "none !important"},
                  min: this.min,
                  max: this.max,
                  readOnly: !0
                })), p["default"].createElement("span", {className: "react-star-rating"}, t, p["default"].createElement("span", {
                  ref: "root",
                  style: {cursor: "pointer"},
                  className: i
                }, n));
              }
            }]), t;
          }(p["default"].Component);
      c.propTypes = {
        name: p["default"].PropTypes.string.isRequired,
        caption: p["default"].PropTypes.string,
        ratingAmount: p["default"].PropTypes.number.isRequired,
        rating: p["default"].PropTypes.number,
        onRatingClick: p["default"].PropTypes.func,
        disabled: p["default"].PropTypes.bool,
        editing: p["default"].PropTypes.bool,
        size: p["default"].PropTypes.string
      }, c.defaultProps = {
        step: .5,
        ratingAmount: 5,
        onRatingClick: function() {},
        disabled: !1
      }, t["default"] = c, e.exports = t["default"];
    }, function(e, t, i) {
      "use strict";
      function n(e) {
        return window.requestAnimationFrame ? window.requestAnimationFrame(e) : window.setTimeout(e, 1);
      }
      function s(e) {
        window.cancelAnimationFrame ? window.cancelAnimationFrame(e) : window.clearTimeout(e);
      }
      var a = function(e) {
        return e && e.__esModule ? e : {"default": e};
      },
          r = function(e, t) {
            var i = {};
            for (var n in e)
              t.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(e, n) && (i[n] = e[n]);
            return i;
          },
          o = function(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          },
          l = function() {
            function e(e, t) {
              for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
              }
            }
            return function(t, i, n) {
              return i && e(t.prototype, i), n && e(t, n), t;
            };
          }(),
          u = function y(e, t, i) {
            var n = Object.getOwnPropertyDescriptor(e, t);
            if (void 0 === n) {
              var s = Object.getPrototypeOf(e);
              return null === s ? void 0 : y(s, t, i);
            }
            if ("value" in n)
              return n.value;
            var a = n.get;
            return void 0 === a ? void 0 : a.call(i);
          },
          p = function(e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
              }}), t && (e.__proto__ = t);
          },
          d = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var i = arguments[t];
              for (var n in i)
                Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
            }
            return e;
          };
      Object.defineProperty(t, "__esModule", {value: !0});
      var h = i(1),
          c = a(h),
          f = i(45),
          m = a(f),
          v = function() {},
          g = function(e) {
            function t(e) {
              o(this, t), u(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e), this.state = {
                height: null,
                minHeight: -(1 / 0),
                maxHeight: 1 / 0
              }, this._onChange = this._onChange.bind(this), this._resizeComponent = this._resizeComponent.bind(this);
            }
            return p(t, e), l(t, [{
              key: "render",
              value: function() {
                var e = this.props,
                    t = e.valueLink,
                    i = (e.onChange, r(e, ["valueLink", "onChange"]));
                i = d({}, i), "object" == typeof t && (i.value = this.props.valueLink.value), i.style = d({}, i.style, {height: this.state.height});
                var n = Math.max(i.style.maxHeight ? i.style.maxHeight : 1 / 0, this.state.maxHeight);
                return n < this.state.height && (i.style.overflow = "hidden"), c["default"].createElement("textarea", d({}, i, {onChange: this._onChange}));
              }
            }, {
              key: "componentDidMount",
              value: function() {
                this._resizeComponent();
              }
            }, {
              key: "componentWillReceiveProps",
              value: function() {
                this.clearNextFrame(), this.onNextFrameActionId = n(this._resizeComponent);
              }
            }, {
              key: "componentDidUpdate",
              value: function(e, t) {
                this.state.height !== t.height && this.props.onHeightChange(this.state.height);
              }
            }, {
              key: "componentWillUnmount",
              value: function() {
                this.clearNextFrame();
              }
            }, {
              key: "clearNextFrame",
              value: function() {
                this.onNextFrameActionId && s(this.onNextFrameActionId);
              }
            }, {
              key: "_onChange",
              value: function(e) {
                this._resizeComponent();
                var t = this.props,
                    i = t.valueLink,
                    n = t.onChange;
                i ? i.requestChange(e.target.value) : n(e);
              }
            }, {
              key: "_resizeComponent",
              value: function() {
                var e = this.props.useCacheForDOMMeasurements;
                this.setState(m["default"](c["default"].findDOMNode(this), e, this.props.rows || this.props.minRows, this.props.maxRows));
              }
            }, {
              key: "value",
              get: function() {
                return c["default"].findDOMNode(this).value;
              }
            }, {
              key: "focus",
              value: function() {
                c["default"].findDOMNode(this).focus();
              }
            }], [{
              key: "propTypes",
              value: {
                value: c["default"].PropTypes.string,
                onChange: c["default"].PropTypes.func,
                onHeightChange: c["default"].PropTypes.func,
                useCacheForDOMMeasurements: c["default"].PropTypes.bool,
                rows: c["default"].PropTypes.number,
                minRows: c["default"].PropTypes.number,
                maxRows: c["default"].PropTypes.number
              },
              enumerable: !0
            }, {
              key: "defaultProps",
              value: {
                onChange: v,
                onHeightChange: v,
                useCacheForDOMMeasurements: !1
              },
              enumerable: !0
            }]), t;
          }(c["default"].Component);
      t["default"] = g, e.exports = t["default"];
    }, function(e, t) {
      "use strict";
      function i(e) {
        var t = void 0 === arguments[1] ? !1 : arguments[1],
            i = void 0 === arguments[2] ? null : arguments[2],
            a = void 0 === arguments[3] ? null : arguments[3];
        o || (o = document.createElement("textarea"), document.body.appendChild(o));
        var r = n(e, t),
            l = r.paddingSize,
            u = r.borderSize,
            p = r.boxSizing,
            d = r.sizingStyle;
        o.setAttribute("style", d + ";" + s), o.value = e.value;
        var h = -(1 / 0),
            c = 1 / 0,
            f = o.scrollHeight;
        if ("border-box" === p ? f += u : "content-box" === p && (f -= l), null !== i || null !== a) {
          o.value = "x";
          var m = o.scrollHeight - l;
          null !== i && (h = m * i, "border-box" === p && (h = h + l + u), f = Math.max(h, f)), null !== a && (c = m * a, "border-box" === p && (c = c + l + u), f = Math.min(c, f));
        }
        return {
          height: f,
          minHeight: h,
          maxHeight: c
        };
      }
      function n(e) {
        var t = void 0 === arguments[1] ? !1 : arguments[1],
            i = e.getAttribute("id") || e.getAttribute("data-reactid") || e.getAttribute("name");
        if (t && r[i])
          return r[i];
        var n = window.getComputedStyle(e),
            s = n.getPropertyValue("box-sizing") || n.getPropertyValue("-moz-box-sizing") || n.getPropertyValue("-webkit-box-sizing"),
            o = parseFloat(n.getPropertyValue("padding-bottom")) + parseFloat(n.getPropertyValue("padding-top")),
            l = parseFloat(n.getPropertyValue("border-bottom-width")) + parseFloat(n.getPropertyValue("border-top-width")),
            u = a.map(function(e) {
              return "" + e + ":" + n.getPropertyValue(e);
            }).join(";"),
            p = {
              sizingStyle: u,
              paddingSize: o,
              borderSize: l,
              boxSizing: s
            };
        return t && i && (r[i] = p), p;
      }
      Object.defineProperty(t, "__esModule", {value: !0}), t["default"] = i;
      var s = "\n  height:0;\n  visibility:hidden;\n  overflow:hidden;\n  position:absolute;\n  z-index:-1000;\n  top:0;\n  right:0\n",
          a = ["letter-spacing", "line-height", "padding-top", "padding-bottom", "font-family", "font-weight", "font-size", "text-transform", "width", "padding-left", "padding-right", "border-width", "box-sizing"],
          r = {},
          o = void 0;
      e.exports = t["default"];
    }, function(e, t, i) {
      "use strict";
      function n(e, t, i) {
        this.fn = e, this.context = t, this.once = i || !1;
      }
      function s() {}
      var a = "function" != typeof Object.create ? "~" : !1;
      s.prototype._events = void 0, s.prototype.listeners = function(e, t) {
        var i = a ? a + e : e,
            n = this._events && this._events[i];
        if (t)
          return !!n;
        if (!n)
          return [];
        if (n.fn)
          return [n.fn];
        for (var s = 0,
            r = n.length,
            o = new Array(r); r > s; s++)
          o[s] = n[s].fn;
        return o;
      }, s.prototype.emit = function(e, t, i, n, s, r) {
        var o = a ? a + e : e;
        if (!this._events || !this._events[o])
          return !1;
        var l,
            u,
            p = this._events[o],
            d = arguments.length;
        if ("function" == typeof p.fn) {
          switch (p.once && this.removeListener(e, p.fn, void 0, !0), d) {
            case 1:
              return p.fn.call(p.context), !0;
            case 2:
              return p.fn.call(p.context, t), !0;
            case 3:
              return p.fn.call(p.context, t, i), !0;
            case 4:
              return p.fn.call(p.context, t, i, n), !0;
            case 5:
              return p.fn.call(p.context, t, i, n, s), !0;
            case 6:
              return p.fn.call(p.context, t, i, n, s, r), !0;
          }
          for (u = 1, l = new Array(d - 1); d > u; u++)
            l[u - 1] = arguments[u];
          p.fn.apply(p.context, l);
        } else {
          var h,
              c = p.length;
          for (u = 0; c > u; u++)
            switch (p[u].once && this.removeListener(e, p[u].fn, void 0, !0), d) {
              case 1:
                p[u].fn.call(p[u].context);
                break;
              case 2:
                p[u].fn.call(p[u].context, t);
                break;
              case 3:
                p[u].fn.call(p[u].context, t, i);
                break;
              default:
                if (!l)
                  for (h = 1, l = new Array(d - 1); d > h; h++)
                    l[h - 1] = arguments[h];
                p[u].fn.apply(p[u].context, l);
            }
        }
        return !0;
      }, s.prototype.on = function(e, t, i) {
        var s = new n(t, i || this),
            r = a ? a + e : e;
        return this._events || (this._events = a ? {} : Object.create(null)), this._events[r] ? this._events[r].fn ? this._events[r] = [this._events[r], s] : this._events[r].push(s) : this._events[r] = s, this;
      }, s.prototype.once = function(e, t, i) {
        var s = new n(t, i || this, !0),
            r = a ? a + e : e;
        return this._events || (this._events = a ? {} : Object.create(null)), this._events[r] ? this._events[r].fn ? this._events[r] = [this._events[r], s] : this._events[r].push(s) : this._events[r] = s, this;
      }, s.prototype.removeListener = function(e, t, i, n) {
        var s = a ? a + e : e;
        if (!this._events || !this._events[s])
          return this;
        var r = this._events[s],
            o = [];
        if (t)
          if (r.fn)
            (r.fn !== t || n && !r.once || i && r.context !== i) && o.push(r);
          else
            for (var l = 0,
                u = r.length; u > l; l++)
              (r[l].fn !== t || n && !r[l].once || i && r[l].context !== i) && o.push(r[l]);
        return o.length ? this._events[s] = 1 === o.length ? o[0] : o : delete this._events[s], this;
      }, s.prototype.removeAllListeners = function(e) {
        return this._events ? (e ? delete this._events[a ? a + e : e] : this._events = a ? {} : Object.create(null), this) : this;
      }, s.prototype.off = s.prototype.removeListener, s.prototype.addListener = s.prototype.on, s.prototype.setMaxListeners = function() {
        return this;
      }, s.prefixed = a, e.exports = s;
    }, function(e, t) {
      "use strict";
      e.exports = function(e, t) {
        for (var i in t)
          if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
            var n = Object.getOwnPropertyDescriptor(t, i);
            if (!n.value || "function" != typeof n.value || !t.hasOwnProperty(i))
              continue;
            e[i] = t[i].bind(e);
          } else {
            var s = t[i];
            if ("function" != typeof s || !t.hasOwnProperty(i))
              continue;
            e[i] = s.bind(e);
          }
        return e;
      };
    }, function(e, t, i) {
      "use strict";
      var n = i(2),
          s = i(13),
          a = i(9),
          r = i(8),
          o = {
            preEmit: 1,
            shouldEmit: 1
          },
          l = function u(e) {
            e = e || {}, n.isObject(e) || (e = {actionName: e});
            for (var t in s)
              if (!o[t] && a[t])
                throw new Error("Cannot override API method " + t + " in Reflux.ActionMethods. Use another method name or override it on Reflux.PublisherMethods instead.");
            for (var i in e)
              if (!o[i] && a[i])
                throw new Error("Cannot override API method " + i + " in action creation. Use another method name or override it on Reflux.PublisherMethods instead.");
            e.children = e.children || [], e.asyncResult && (e.children = e.children.concat(["completed", "failed"]));
            for (var l = 0,
                p = {}; l < e.children.length; l++) {
              var d = e.children[l];
              p[d] = u(d);
            }
            var h = n.extend({
              eventLabel: "action",
              emitter: new n.EventEmitter,
              _isAction: !0
            }, a, s, e),
                c = function f() {
                  var e = f.sync ? "trigger" : n.environment.hasPromise ? "triggerPromise" : "triggerAsync";
                  return f[e].apply(f, arguments);
                };
            return n.extend(c, p, h), r.createdActions.push(c), c;
          };
      e.exports = l;
    }, function(e, t, i) {
      "use strict";
      Object.defineProperty(t, "__esModule", {value: !0});
      var n = {version: {"reflux-core": "0.2.1"}};
      n.ActionMethods = i(13), n.ListenerMethods = i(3), n.PublisherMethods = i(9), n.StoreMethods = i(14), n.createAction = i(48), n.createStore = i(15);
      var s = i(16).staticJoinCreator;
      n.joinTrailing = n.all = s("last"), n.joinLeading = s("first"), n.joinStrict = s("strict"), n.joinConcat = s("all");
      var a = n.utils = i(2);
      n.EventEmitter = a.EventEmitter, n.Promise = a.Promise, n.createActions = function() {
        var e = function(e, t) {
          Object.keys(e).forEach(function(i) {
            var s = e[i];
            t[i] = n.createAction(s);
          });
        };
        return function(t) {
          var i = {};
          return t instanceof Array ? t.forEach(function(t) {
            a.isObject(t) ? e(t, i) : i[t] = n.createAction(t);
          }) : e(t, i), i;
        };
      }(), n.setEventEmitter = function(e) {
        n.EventEmitter = a.EventEmitter = e;
      }, n.setPromise = function(e) {
        n.Promise = a.Promise = e;
      }, n.setPromiseFactory = function(e) {
        a.createPromise = e;
      }, n.nextTick = function(e) {
        a.nextTick = e;
      }, n.use = function(e) {
        e(n);
      }, n.__keep = i(8), Function.prototype.bind || console.error("Function.prototype.bind not available. ES5 shim required. https://github.com/spoike/refluxjs#es5"), t["default"] = n, e.exports = t["default"];
    }, function(e, t, i) {
      "use strict";
      var n = i(2);
      e.exports = function(e) {
        var t = {
          init: [],
          preEmit: [],
          shouldEmit: []
        },
            i = function s(e) {
              var i = {};
              return e.mixins && e.mixins.forEach(function(e) {
                n.extend(i, s(e));
              }), n.extend(i, e), Object.keys(t).forEach(function(i) {
                e.hasOwnProperty(i) && t[i].push(e[i]);
              }), i;
            }(e);
        return t.init.length > 1 && (i.init = function() {
          var e = arguments;
          t.init.forEach(function(t) {
            t.apply(this, e);
          }, this);
        }), t.preEmit.length > 1 && (i.preEmit = function() {
          return t.preEmit.reduce(function(e, t) {
            var i = t.apply(this, e);
            return void 0 === i ? e : [i];
          }.bind(this), arguments);
        }), t.shouldEmit.length > 1 && (i.shouldEmit = function() {
          var e = arguments;
          return !t.shouldEmit.some(function(t) {
            return !t.apply(this, e);
          }, this);
        }), Object.keys(t).forEach(function(e) {
          1 === t[e].length && (i[e] = t[e][0]);
        }), i;
      };
    }, function(e, t, i) {
      var n = i(3),
          s = i(10),
          a = i(2);
      e.exports = function(e, t) {
        return {
          getInitialState: function() {
            return a.isFunction(e.getInitialState) ? void 0 === t ? e.getInitialState() : a.object([t], [e.getInitialState()]) : {};
          },
          componentDidMount: function() {
            a.extend(this, n);
            var i = this,
                s = void 0 === t ? this.setState : function(e) {
                  ("undefined" == typeof i.isMounted || i.isMounted() === !0) && i.setState(a.object([t], [e]));
                };
            this.listenTo(e, s);
          },
          componentWillUnmount: s.componentWillUnmount
        };
      };
    }, function(e, t, i) {
      var n = i(3),
          s = i(10),
          a = i(2);
      e.exports = function(e, t, i) {
        return i = a.isFunction(t) ? t : i, {
          getInitialState: function() {
            if (a.isFunction(e.getInitialState)) {
              if (a.isFunction(t))
                return i.call(this, e.getInitialState());
              var n = i.call(this, e.getInitialState());
              return "undefined" != typeof n ? a.object([t], [n]) : {};
            }
            return {};
          },
          componentDidMount: function() {
            a.extend(this, n);
            var s = this,
                r = function(e) {
                  if (a.isFunction(t))
                    s.setState(i.call(s, e));
                  else {
                    var n = i.call(s, e);
                    s.setState(a.object([t], [n]));
                  }
                };
            this.listenTo(e, r);
          },
          componentWillUnmount: s.componentWillUnmount
        };
      };
    }, function(e, t, i) {
      var n = i(3);
      e.exports = function(e, t, i) {
        return {
          componentDidMount: function() {
            for (var s in n)
              if (this[s] !== n[s]) {
                if (this[s])
                  throw "Can't have other property '" + s + "' when using Reflux.listenTo!";
                this[s] = n[s];
              }
            this.listenTo(e, t, i);
          },
          componentWillUnmount: n.stopListeningToAll
        };
      };
    }, function(e, t, i) {
      var n = i(3);
      e.exports = function(e) {
        return {
          componentDidMount: function() {
            for (var t in n)
              if (this[t] !== n[t]) {
                if (this[t])
                  throw "Can't have other property '" + t + "' when using Reflux.listenToMany!";
                this[t] = n[t];
              }
            this.listenToMany(e);
          },
          componentWillUnmount: n.stopListeningToAll
        };
      };
    }, function(e, t, i) {
      var n,
          s,
          a = i(17),
          r = i(6),
          o = a.createStore({
            init: function() {
              this.listenTo(r.createElement, this._create), this.listenTo(r.deleteElement, this._delete), this.listenTo(r.save, this.save), this.listenTo(r.saveData, this._updateOrder);
            },
            load: function(e, t) {
              var i = this;
              s = t, "string" == typeof e || e instanceof String ? $.ajax({
                url: e,
                success: function(e) {
                  n = e, i.trigger(n);
                }
              }) : (n = e, i.trigger(n));
            },
            _create: function(e) {
              n.push(e), this.trigger(n), this.save();
            },
            _delete: function(e) {
              var t = n.indexOf(e);
              n.splice(t, 1), this.trigger(n), this.save();
            },
            _updateOrder: function(e) {
              n = e, this.trigger(n), this.save();
            },
            save: function() {
              s && $.ajax({
                type: "POST",
                url: s,
                data: {task_data: JSON.stringify(n)},
                dataType: "json",
                success: function(e) {
                  console.log("Saved... ", arguments);
                }
              });
            }
          });
      e.exports = o;
    }]);
  });
})(require('process'));
