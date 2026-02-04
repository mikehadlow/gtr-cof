var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// node_modules/d3/d3.js
var require_d3 = __commonJS((exports, module) => {
  (function() {
    var d3 = {
      version: "3.5.17"
    };
    var d3_arraySlice = [].slice, d3_array = function(list) {
      return d3_arraySlice.call(list);
    };
    var d3_document = this.document;
    function d3_documentElement(node) {
      return node && (node.ownerDocument || node.document || node).documentElement;
    }
    function d3_window(node) {
      return node && (node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView);
    }
    if (d3_document) {
      try {
        d3_array(d3_document.documentElement.childNodes)[0].nodeType;
      } catch (e) {
        d3_array = function(list) {
          var i = list.length, array = new Array(i);
          while (i--)
            array[i] = list[i];
          return array;
        };
      }
    }
    if (!Date.now)
      Date.now = function() {
        return +new Date;
      };
    if (d3_document) {
      try {
        d3_document.createElement("DIV").style.setProperty("opacity", 0, "");
      } catch (error) {
        var d3_element_prototype = this.Element.prototype, d3_element_setAttribute = d3_element_prototype.setAttribute, d3_element_setAttributeNS = d3_element_prototype.setAttributeNS, d3_style_prototype = this.CSSStyleDeclaration.prototype, d3_style_setProperty = d3_style_prototype.setProperty;
        d3_element_prototype.setAttribute = function(name, value) {
          d3_element_setAttribute.call(this, name, value + "");
        };
        d3_element_prototype.setAttributeNS = function(space, local, value) {
          d3_element_setAttributeNS.call(this, space, local, value + "");
        };
        d3_style_prototype.setProperty = function(name, value, priority) {
          d3_style_setProperty.call(this, name, value + "", priority);
        };
      }
    }
    d3.ascending = d3_ascending;
    function d3_ascending(a, b) {
      return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
    }
    d3.descending = function(a, b) {
      return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
    };
    d3.min = function(array, f) {
      var i = -1, n = array.length, a, b;
      if (arguments.length === 1) {
        while (++i < n)
          if ((b = array[i]) != null && b >= b) {
            a = b;
            break;
          }
        while (++i < n)
          if ((b = array[i]) != null && a > b)
            a = b;
      } else {
        while (++i < n)
          if ((b = f.call(array, array[i], i)) != null && b >= b) {
            a = b;
            break;
          }
        while (++i < n)
          if ((b = f.call(array, array[i], i)) != null && a > b)
            a = b;
      }
      return a;
    };
    d3.max = function(array, f) {
      var i = -1, n = array.length, a, b;
      if (arguments.length === 1) {
        while (++i < n)
          if ((b = array[i]) != null && b >= b) {
            a = b;
            break;
          }
        while (++i < n)
          if ((b = array[i]) != null && b > a)
            a = b;
      } else {
        while (++i < n)
          if ((b = f.call(array, array[i], i)) != null && b >= b) {
            a = b;
            break;
          }
        while (++i < n)
          if ((b = f.call(array, array[i], i)) != null && b > a)
            a = b;
      }
      return a;
    };
    d3.extent = function(array, f) {
      var i = -1, n = array.length, a, b, c;
      if (arguments.length === 1) {
        while (++i < n)
          if ((b = array[i]) != null && b >= b) {
            a = c = b;
            break;
          }
        while (++i < n)
          if ((b = array[i]) != null) {
            if (a > b)
              a = b;
            if (c < b)
              c = b;
          }
      } else {
        while (++i < n)
          if ((b = f.call(array, array[i], i)) != null && b >= b) {
            a = c = b;
            break;
          }
        while (++i < n)
          if ((b = f.call(array, array[i], i)) != null) {
            if (a > b)
              a = b;
            if (c < b)
              c = b;
          }
      }
      return [a, c];
    };
    function d3_number(x) {
      return x === null ? NaN : +x;
    }
    function d3_numeric(x) {
      return !isNaN(x);
    }
    d3.sum = function(array, f) {
      var s = 0, n = array.length, a, i = -1;
      if (arguments.length === 1) {
        while (++i < n)
          if (d3_numeric(a = +array[i]))
            s += a;
      } else {
        while (++i < n)
          if (d3_numeric(a = +f.call(array, array[i], i)))
            s += a;
      }
      return s;
    };
    d3.mean = function(array, f) {
      var s = 0, n = array.length, a, i = -1, j = n;
      if (arguments.length === 1) {
        while (++i < n)
          if (d3_numeric(a = d3_number(array[i])))
            s += a;
          else
            --j;
      } else {
        while (++i < n)
          if (d3_numeric(a = d3_number(f.call(array, array[i], i))))
            s += a;
          else
            --j;
      }
      if (j)
        return s / j;
    };
    d3.quantile = function(values, p) {
      var H = (values.length - 1) * p + 1, h = Math.floor(H), v = +values[h - 1], e = H - h;
      return e ? v + e * (values[h] - v) : v;
    };
    d3.median = function(array, f) {
      var numbers = [], n = array.length, a, i = -1;
      if (arguments.length === 1) {
        while (++i < n)
          if (d3_numeric(a = d3_number(array[i])))
            numbers.push(a);
      } else {
        while (++i < n)
          if (d3_numeric(a = d3_number(f.call(array, array[i], i))))
            numbers.push(a);
      }
      if (numbers.length)
        return d3.quantile(numbers.sort(d3_ascending), 0.5);
    };
    d3.variance = function(array, f) {
      var n = array.length, m = 0, a, d, s = 0, i = -1, j = 0;
      if (arguments.length === 1) {
        while (++i < n) {
          if (d3_numeric(a = d3_number(array[i]))) {
            d = a - m;
            m += d / ++j;
            s += d * (a - m);
          }
        }
      } else {
        while (++i < n) {
          if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) {
            d = a - m;
            m += d / ++j;
            s += d * (a - m);
          }
        }
      }
      if (j > 1)
        return s / (j - 1);
    };
    d3.deviation = function() {
      var v = d3.variance.apply(this, arguments);
      return v ? Math.sqrt(v) : v;
    };
    function d3_bisector(compare) {
      return {
        left: function(a, x, lo, hi) {
          if (arguments.length < 3)
            lo = 0;
          if (arguments.length < 4)
            hi = a.length;
          while (lo < hi) {
            var mid = lo + hi >>> 1;
            if (compare(a[mid], x) < 0)
              lo = mid + 1;
            else
              hi = mid;
          }
          return lo;
        },
        right: function(a, x, lo, hi) {
          if (arguments.length < 3)
            lo = 0;
          if (arguments.length < 4)
            hi = a.length;
          while (lo < hi) {
            var mid = lo + hi >>> 1;
            if (compare(a[mid], x) > 0)
              hi = mid;
            else
              lo = mid + 1;
          }
          return lo;
        }
      };
    }
    var d3_bisect = d3_bisector(d3_ascending);
    d3.bisectLeft = d3_bisect.left;
    d3.bisect = d3.bisectRight = d3_bisect.right;
    d3.bisector = function(f) {
      return d3_bisector(f.length === 1 ? function(d, x) {
        return d3_ascending(f(d), x);
      } : f);
    };
    d3.shuffle = function(array, i0, i1) {
      if ((m = arguments.length) < 3) {
        i1 = array.length;
        if (m < 2)
          i0 = 0;
      }
      var m = i1 - i0, t, i;
      while (m) {
        i = Math.random() * m-- | 0;
        t = array[m + i0], array[m + i0] = array[i + i0], array[i + i0] = t;
      }
      return array;
    };
    d3.permute = function(array, indexes) {
      var i = indexes.length, permutes = new Array(i);
      while (i--)
        permutes[i] = array[indexes[i]];
      return permutes;
    };
    d3.pairs = function(array) {
      var i = 0, n = array.length - 1, p0, p1 = array[0], pairs = new Array(n < 0 ? 0 : n);
      while (i < n)
        pairs[i] = [p0 = p1, p1 = array[++i]];
      return pairs;
    };
    d3.transpose = function(matrix) {
      if (!(n = matrix.length))
        return [];
      for (var i = -1, m = d3.min(matrix, d3_transposeLength), transpose = new Array(m);++i < m; ) {
        for (var j = -1, n, row = transpose[i] = new Array(n);++j < n; ) {
          row[j] = matrix[j][i];
        }
      }
      return transpose;
    };
    function d3_transposeLength(d) {
      return d.length;
    }
    d3.zip = function() {
      return d3.transpose(arguments);
    };
    d3.keys = function(map) {
      var keys = [];
      for (var key in map)
        keys.push(key);
      return keys;
    };
    d3.values = function(map) {
      var values = [];
      for (var key in map)
        values.push(map[key]);
      return values;
    };
    d3.entries = function(map) {
      var entries = [];
      for (var key in map)
        entries.push({
          key,
          value: map[key]
        });
      return entries;
    };
    d3.merge = function(arrays) {
      var n = arrays.length, m, i = -1, j = 0, merged, array;
      while (++i < n)
        j += arrays[i].length;
      merged = new Array(j);
      while (--n >= 0) {
        array = arrays[n];
        m = array.length;
        while (--m >= 0) {
          merged[--j] = array[m];
        }
      }
      return merged;
    };
    var abs = Math.abs;
    d3.range = function(start, stop, step) {
      if (arguments.length < 3) {
        step = 1;
        if (arguments.length < 2) {
          stop = start;
          start = 0;
        }
      }
      if ((stop - start) / step === Infinity)
        throw new Error("infinite range");
      var range = [], k = d3_range_integerScale(abs(step)), i = -1, j;
      start *= k, stop *= k, step *= k;
      if (step < 0)
        while ((j = start + step * ++i) > stop)
          range.push(j / k);
      else
        while ((j = start + step * ++i) < stop)
          range.push(j / k);
      return range;
    };
    function d3_range_integerScale(x) {
      var k = 1;
      while (x * k % 1)
        k *= 10;
      return k;
    }
    function d3_class(ctor, properties) {
      for (var key in properties) {
        Object.defineProperty(ctor.prototype, key, {
          value: properties[key],
          enumerable: false
        });
      }
    }
    d3.map = function(object, f) {
      var map = new d3_Map;
      if (object instanceof d3_Map) {
        object.forEach(function(key2, value) {
          map.set(key2, value);
        });
      } else if (Array.isArray(object)) {
        var i = -1, n = object.length, o;
        if (arguments.length === 1)
          while (++i < n)
            map.set(i, object[i]);
        else
          while (++i < n)
            map.set(f.call(object, o = object[i], i), o);
      } else {
        for (var key in object)
          map.set(key, object[key]);
      }
      return map;
    };
    function d3_Map() {
      this._ = Object.create(null);
    }
    var d3_map_proto = "__proto__", d3_map_zero = "\x00";
    d3_class(d3_Map, {
      has: d3_map_has,
      get: function(key) {
        return this._[d3_map_escape(key)];
      },
      set: function(key, value) {
        return this._[d3_map_escape(key)] = value;
      },
      remove: d3_map_remove,
      keys: d3_map_keys,
      values: function() {
        var values = [];
        for (var key in this._)
          values.push(this._[key]);
        return values;
      },
      entries: function() {
        var entries = [];
        for (var key in this._)
          entries.push({
            key: d3_map_unescape(key),
            value: this._[key]
          });
        return entries;
      },
      size: d3_map_size,
      empty: d3_map_empty,
      forEach: function(f) {
        for (var key in this._)
          f.call(this, d3_map_unescape(key), this._[key]);
      }
    });
    function d3_map_escape(key) {
      return (key += "") === d3_map_proto || key[0] === d3_map_zero ? d3_map_zero + key : key;
    }
    function d3_map_unescape(key) {
      return (key += "")[0] === d3_map_zero ? key.slice(1) : key;
    }
    function d3_map_has(key) {
      return d3_map_escape(key) in this._;
    }
    function d3_map_remove(key) {
      return (key = d3_map_escape(key)) in this._ && delete this._[key];
    }
    function d3_map_keys() {
      var keys = [];
      for (var key in this._)
        keys.push(d3_map_unescape(key));
      return keys;
    }
    function d3_map_size() {
      var size = 0;
      for (var key in this._)
        ++size;
      return size;
    }
    function d3_map_empty() {
      for (var key in this._)
        return false;
      return true;
    }
    d3.nest = function() {
      var nest = {}, keys = [], sortKeys = [], sortValues, rollup;
      function map(mapType, array, depth) {
        if (depth >= keys.length)
          return rollup ? rollup.call(nest, array) : sortValues ? array.sort(sortValues) : array;
        var i = -1, n = array.length, key = keys[depth++], keyValue, object, setter, valuesByKey = new d3_Map, values;
        while (++i < n) {
          if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
            values.push(object);
          } else {
            valuesByKey.set(keyValue, [object]);
          }
        }
        if (mapType) {
          object = mapType();
          setter = function(keyValue2, values2) {
            object.set(keyValue2, map(mapType, values2, depth));
          };
        } else {
          object = {};
          setter = function(keyValue2, values2) {
            object[keyValue2] = map(mapType, values2, depth);
          };
        }
        valuesByKey.forEach(setter);
        return object;
      }
      function entries(map2, depth) {
        if (depth >= keys.length)
          return map2;
        var array = [], sortKey = sortKeys[depth++];
        map2.forEach(function(key, keyMap) {
          array.push({
            key,
            values: entries(keyMap, depth)
          });
        });
        return sortKey ? array.sort(function(a, b) {
          return sortKey(a.key, b.key);
        }) : array;
      }
      nest.map = function(array, mapType) {
        return map(mapType, array, 0);
      };
      nest.entries = function(array) {
        return entries(map(d3.map, array, 0), 0);
      };
      nest.key = function(d) {
        keys.push(d);
        return nest;
      };
      nest.sortKeys = function(order) {
        sortKeys[keys.length - 1] = order;
        return nest;
      };
      nest.sortValues = function(order) {
        sortValues = order;
        return nest;
      };
      nest.rollup = function(f) {
        rollup = f;
        return nest;
      };
      return nest;
    };
    d3.set = function(array) {
      var set = new d3_Set;
      if (array)
        for (var i = 0, n = array.length;i < n; ++i)
          set.add(array[i]);
      return set;
    };
    function d3_Set() {
      this._ = Object.create(null);
    }
    d3_class(d3_Set, {
      has: d3_map_has,
      add: function(key) {
        this._[d3_map_escape(key += "")] = true;
        return key;
      },
      remove: d3_map_remove,
      values: d3_map_keys,
      size: d3_map_size,
      empty: d3_map_empty,
      forEach: function(f) {
        for (var key in this._)
          f.call(this, d3_map_unescape(key));
      }
    });
    d3.behavior = {};
    function d3_identity(d) {
      return d;
    }
    d3.rebind = function(target, source) {
      var i = 1, n = arguments.length, method;
      while (++i < n)
        target[method = arguments[i]] = d3_rebind(target, source, source[method]);
      return target;
    };
    function d3_rebind(target, source, method) {
      return function() {
        var value = method.apply(source, arguments);
        return value === source ? target : value;
      };
    }
    function d3_vendorSymbol(object, name) {
      if (name in object)
        return name;
      name = name.charAt(0).toUpperCase() + name.slice(1);
      for (var i = 0, n = d3_vendorPrefixes.length;i < n; ++i) {
        var prefixName = d3_vendorPrefixes[i] + name;
        if (prefixName in object)
          return prefixName;
      }
    }
    var d3_vendorPrefixes = ["webkit", "ms", "moz", "Moz", "o", "O"];
    function d3_noop() {}
    d3.dispatch = function() {
      var dispatch = new d3_dispatch, i = -1, n = arguments.length;
      while (++i < n)
        dispatch[arguments[i]] = d3_dispatch_event(dispatch);
      return dispatch;
    };
    function d3_dispatch() {}
    d3_dispatch.prototype.on = function(type, listener) {
      var i = type.indexOf("."), name = "";
      if (i >= 0) {
        name = type.slice(i + 1);
        type = type.slice(0, i);
      }
      if (type)
        return arguments.length < 2 ? this[type].on(name) : this[type].on(name, listener);
      if (arguments.length === 2) {
        if (listener == null)
          for (type in this) {
            if (this.hasOwnProperty(type))
              this[type].on(name, null);
          }
        return this;
      }
    };
    function d3_dispatch_event(dispatch) {
      var listeners = [], listenerByName = new d3_Map;
      function event() {
        var z = listeners, i = -1, n = z.length, l;
        while (++i < n)
          if (l = z[i].on)
            l.apply(this, arguments);
        return dispatch;
      }
      event.on = function(name, listener) {
        var l = listenerByName.get(name), i;
        if (arguments.length < 2)
          return l && l.on;
        if (l) {
          l.on = null;
          listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
          listenerByName.remove(name);
        }
        if (listener)
          listeners.push(listenerByName.set(name, {
            on: listener
          }));
        return dispatch;
      };
      return event;
    }
    d3.event = null;
    function d3_eventPreventDefault() {
      d3.event.preventDefault();
    }
    function d3_eventSource() {
      var e = d3.event, s;
      while (s = e.sourceEvent)
        e = s;
      return e;
    }
    function d3_eventDispatch(target) {
      var dispatch = new d3_dispatch, i = 0, n = arguments.length;
      while (++i < n)
        dispatch[arguments[i]] = d3_dispatch_event(dispatch);
      dispatch.of = function(thiz, argumentz) {
        return function(e1) {
          try {
            var e0 = e1.sourceEvent = d3.event;
            e1.target = target;
            d3.event = e1;
            dispatch[e1.type].apply(thiz, argumentz);
          } finally {
            d3.event = e0;
          }
        };
      };
      return dispatch;
    }
    d3.requote = function(s) {
      return s.replace(d3_requote_re, "\\$&");
    };
    var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
    var d3_subclass = {}.__proto__ ? function(object, prototype) {
      object.__proto__ = prototype;
    } : function(object, prototype) {
      for (var property in prototype)
        object[property] = prototype[property];
    };
    function d3_selection(groups) {
      d3_subclass(groups, d3_selectionPrototype);
      return groups;
    }
    var d3_select = function(s, n) {
      return n.querySelector(s);
    }, d3_selectAll = function(s, n) {
      return n.querySelectorAll(s);
    }, d3_selectMatches = function(n, s) {
      var d3_selectMatcher = n.matches || n[d3_vendorSymbol(n, "matchesSelector")];
      d3_selectMatches = function(n2, s2) {
        return d3_selectMatcher.call(n2, s2);
      };
      return d3_selectMatches(n, s);
    };
    if (typeof Sizzle === "function") {
      d3_select = function(s, n) {
        return Sizzle(s, n)[0] || null;
      };
      d3_selectAll = Sizzle;
      d3_selectMatches = Sizzle.matchesSelector;
    }
    d3.selection = function() {
      return d3.select(d3_document.documentElement);
    };
    var d3_selectionPrototype = d3.selection.prototype = [];
    d3_selectionPrototype.select = function(selector) {
      var subgroups = [], subgroup, subnode, group, node;
      selector = d3_selection_selector(selector);
      for (var j = -1, m = this.length;++j < m; ) {
        subgroups.push(subgroup = []);
        subgroup.parentNode = (group = this[j]).parentNode;
        for (var i = -1, n = group.length;++i < n; ) {
          if (node = group[i]) {
            subgroup.push(subnode = selector.call(node, node.__data__, i, j));
            if (subnode && "__data__" in node)
              subnode.__data__ = node.__data__;
          } else {
            subgroup.push(null);
          }
        }
      }
      return d3_selection(subgroups);
    };
    function d3_selection_selector(selector) {
      return typeof selector === "function" ? selector : function() {
        return d3_select(selector, this);
      };
    }
    d3_selectionPrototype.selectAll = function(selector) {
      var subgroups = [], subgroup, node;
      selector = d3_selection_selectorAll(selector);
      for (var j = -1, m = this.length;++j < m; ) {
        for (var group = this[j], i = -1, n = group.length;++i < n; ) {
          if (node = group[i]) {
            subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i, j)));
            subgroup.parentNode = node;
          }
        }
      }
      return d3_selection(subgroups);
    };
    function d3_selection_selectorAll(selector) {
      return typeof selector === "function" ? selector : function() {
        return d3_selectAll(selector, this);
      };
    }
    var d3_nsXhtml = "http://www.w3.org/1999/xhtml";
    var d3_nsPrefix = {
      svg: "http://www.w3.org/2000/svg",
      xhtml: d3_nsXhtml,
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/"
    };
    d3.ns = {
      prefix: d3_nsPrefix,
      qualify: function(name) {
        var i = name.indexOf(":"), prefix = name;
        if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns")
          name = name.slice(i + 1);
        return d3_nsPrefix.hasOwnProperty(prefix) ? {
          space: d3_nsPrefix[prefix],
          local: name
        } : name;
      }
    };
    d3_selectionPrototype.attr = function(name, value) {
      if (arguments.length < 2) {
        if (typeof name === "string") {
          var node = this.node();
          name = d3.ns.qualify(name);
          return name.local ? node.getAttributeNS(name.space, name.local) : node.getAttribute(name);
        }
        for (value in name)
          this.each(d3_selection_attr(value, name[value]));
        return this;
      }
      return this.each(d3_selection_attr(name, value));
    };
    function d3_selection_attr(name, value) {
      name = d3.ns.qualify(name);
      function attrNull() {
        this.removeAttribute(name);
      }
      function attrNullNS() {
        this.removeAttributeNS(name.space, name.local);
      }
      function attrConstant() {
        this.setAttribute(name, value);
      }
      function attrConstantNS() {
        this.setAttributeNS(name.space, name.local, value);
      }
      function attrFunction() {
        var x = value.apply(this, arguments);
        if (x == null)
          this.removeAttribute(name);
        else
          this.setAttribute(name, x);
      }
      function attrFunctionNS() {
        var x = value.apply(this, arguments);
        if (x == null)
          this.removeAttributeNS(name.space, name.local);
        else
          this.setAttributeNS(name.space, name.local, x);
      }
      return value == null ? name.local ? attrNullNS : attrNull : typeof value === "function" ? name.local ? attrFunctionNS : attrFunction : name.local ? attrConstantNS : attrConstant;
    }
    function d3_collapse(s) {
      return s.trim().replace(/\s+/g, " ");
    }
    d3_selectionPrototype.classed = function(name, value) {
      if (arguments.length < 2) {
        if (typeof name === "string") {
          var node = this.node(), n = (name = d3_selection_classes(name)).length, i = -1;
          if (value = node.classList) {
            while (++i < n)
              if (!value.contains(name[i]))
                return false;
          } else {
            value = node.getAttribute("class");
            while (++i < n)
              if (!d3_selection_classedRe(name[i]).test(value))
                return false;
          }
          return true;
        }
        for (value in name)
          this.each(d3_selection_classed(value, name[value]));
        return this;
      }
      return this.each(d3_selection_classed(name, value));
    };
    function d3_selection_classedRe(name) {
      return new RegExp("(?:^|\\s+)" + d3.requote(name) + "(?:\\s+|$)", "g");
    }
    function d3_selection_classes(name) {
      return (name + "").trim().split(/^|\s+/);
    }
    function d3_selection_classed(name, value) {
      name = d3_selection_classes(name).map(d3_selection_classedName);
      var n = name.length;
      function classedConstant() {
        var i = -1;
        while (++i < n)
          name[i](this, value);
      }
      function classedFunction() {
        var i = -1, x = value.apply(this, arguments);
        while (++i < n)
          name[i](this, x);
      }
      return typeof value === "function" ? classedFunction : classedConstant;
    }
    function d3_selection_classedName(name) {
      var re = d3_selection_classedRe(name);
      return function(node, value) {
        if (c = node.classList)
          return value ? c.add(name) : c.remove(name);
        var c = node.getAttribute("class") || "";
        if (value) {
          re.lastIndex = 0;
          if (!re.test(c))
            node.setAttribute("class", d3_collapse(c + " " + name));
        } else {
          node.setAttribute("class", d3_collapse(c.replace(re, " ")));
        }
      };
    }
    d3_selectionPrototype.style = function(name, value, priority) {
      var n = arguments.length;
      if (n < 3) {
        if (typeof name !== "string") {
          if (n < 2)
            value = "";
          for (priority in name)
            this.each(d3_selection_style(priority, name[priority], value));
          return this;
        }
        if (n < 2) {
          var node = this.node();
          return d3_window(node).getComputedStyle(node, null).getPropertyValue(name);
        }
        priority = "";
      }
      return this.each(d3_selection_style(name, value, priority));
    };
    function d3_selection_style(name, value, priority) {
      function styleNull() {
        this.style.removeProperty(name);
      }
      function styleConstant() {
        this.style.setProperty(name, value, priority);
      }
      function styleFunction() {
        var x = value.apply(this, arguments);
        if (x == null)
          this.style.removeProperty(name);
        else
          this.style.setProperty(name, x, priority);
      }
      return value == null ? styleNull : typeof value === "function" ? styleFunction : styleConstant;
    }
    d3_selectionPrototype.property = function(name, value) {
      if (arguments.length < 2) {
        if (typeof name === "string")
          return this.node()[name];
        for (value in name)
          this.each(d3_selection_property(value, name[value]));
        return this;
      }
      return this.each(d3_selection_property(name, value));
    };
    function d3_selection_property(name, value) {
      function propertyNull() {
        delete this[name];
      }
      function propertyConstant() {
        this[name] = value;
      }
      function propertyFunction() {
        var x = value.apply(this, arguments);
        if (x == null)
          delete this[name];
        else
          this[name] = x;
      }
      return value == null ? propertyNull : typeof value === "function" ? propertyFunction : propertyConstant;
    }
    d3_selectionPrototype.text = function(value) {
      return arguments.length ? this.each(typeof value === "function" ? function() {
        var v = value.apply(this, arguments);
        this.textContent = v == null ? "" : v;
      } : value == null ? function() {
        this.textContent = "";
      } : function() {
        this.textContent = value;
      }) : this.node().textContent;
    };
    d3_selectionPrototype.html = function(value) {
      return arguments.length ? this.each(typeof value === "function" ? function() {
        var v = value.apply(this, arguments);
        this.innerHTML = v == null ? "" : v;
      } : value == null ? function() {
        this.innerHTML = "";
      } : function() {
        this.innerHTML = value;
      }) : this.node().innerHTML;
    };
    d3_selectionPrototype.append = function(name) {
      name = d3_selection_creator(name);
      return this.select(function() {
        return this.appendChild(name.apply(this, arguments));
      });
    };
    function d3_selection_creator(name) {
      function create() {
        var document2 = this.ownerDocument, namespace = this.namespaceURI;
        return namespace === d3_nsXhtml && document2.documentElement.namespaceURI === d3_nsXhtml ? document2.createElement(name) : document2.createElementNS(namespace, name);
      }
      function createNS() {
        return this.ownerDocument.createElementNS(name.space, name.local);
      }
      return typeof name === "function" ? name : (name = d3.ns.qualify(name)).local ? createNS : create;
    }
    d3_selectionPrototype.insert = function(name, before) {
      name = d3_selection_creator(name);
      before = d3_selection_selector(before);
      return this.select(function() {
        return this.insertBefore(name.apply(this, arguments), before.apply(this, arguments) || null);
      });
    };
    d3_selectionPrototype.remove = function() {
      return this.each(d3_selectionRemove);
    };
    function d3_selectionRemove() {
      var parent = this.parentNode;
      if (parent)
        parent.removeChild(this);
    }
    d3_selectionPrototype.data = function(value, key) {
      var i = -1, n = this.length, group, node;
      if (!arguments.length) {
        value = new Array(n = (group = this[0]).length);
        while (++i < n) {
          if (node = group[i]) {
            value[i] = node.__data__;
          }
        }
        return value;
      }
      function bind(group2, groupData) {
        var i2, n2 = group2.length, m = groupData.length, n0 = Math.min(n2, m), updateNodes = new Array(m), enterNodes = new Array(m), exitNodes = new Array(n2), node2, nodeData;
        if (key) {
          var nodeByKeyValue = new d3_Map, keyValues = new Array(n2), keyValue;
          for (i2 = -1;++i2 < n2; ) {
            if (node2 = group2[i2]) {
              if (nodeByKeyValue.has(keyValue = key.call(node2, node2.__data__, i2))) {
                exitNodes[i2] = node2;
              } else {
                nodeByKeyValue.set(keyValue, node2);
              }
              keyValues[i2] = keyValue;
            }
          }
          for (i2 = -1;++i2 < m; ) {
            if (!(node2 = nodeByKeyValue.get(keyValue = key.call(groupData, nodeData = groupData[i2], i2)))) {
              enterNodes[i2] = d3_selection_dataNode(nodeData);
            } else if (node2 !== true) {
              updateNodes[i2] = node2;
              node2.__data__ = nodeData;
            }
            nodeByKeyValue.set(keyValue, true);
          }
          for (i2 = -1;++i2 < n2; ) {
            if (i2 in keyValues && nodeByKeyValue.get(keyValues[i2]) !== true) {
              exitNodes[i2] = group2[i2];
            }
          }
        } else {
          for (i2 = -1;++i2 < n0; ) {
            node2 = group2[i2];
            nodeData = groupData[i2];
            if (node2) {
              node2.__data__ = nodeData;
              updateNodes[i2] = node2;
            } else {
              enterNodes[i2] = d3_selection_dataNode(nodeData);
            }
          }
          for (;i2 < m; ++i2) {
            enterNodes[i2] = d3_selection_dataNode(groupData[i2]);
          }
          for (;i2 < n2; ++i2) {
            exitNodes[i2] = group2[i2];
          }
        }
        enterNodes.update = updateNodes;
        enterNodes.parentNode = updateNodes.parentNode = exitNodes.parentNode = group2.parentNode;
        enter.push(enterNodes);
        update.push(updateNodes);
        exit.push(exitNodes);
      }
      var enter = d3_selection_enter([]), update = d3_selection([]), exit = d3_selection([]);
      if (typeof value === "function") {
        while (++i < n) {
          bind(group = this[i], value.call(group, group.parentNode.__data__, i));
        }
      } else {
        while (++i < n) {
          bind(group = this[i], value);
        }
      }
      update.enter = function() {
        return enter;
      };
      update.exit = function() {
        return exit;
      };
      return update;
    };
    function d3_selection_dataNode(data) {
      return {
        __data__: data
      };
    }
    d3_selectionPrototype.datum = function(value) {
      return arguments.length ? this.property("__data__", value) : this.property("__data__");
    };
    d3_selectionPrototype.filter = function(filter) {
      var subgroups = [], subgroup, group, node;
      if (typeof filter !== "function")
        filter = d3_selection_filter(filter);
      for (var j = 0, m = this.length;j < m; j++) {
        subgroups.push(subgroup = []);
        subgroup.parentNode = (group = this[j]).parentNode;
        for (var i = 0, n = group.length;i < n; i++) {
          if ((node = group[i]) && filter.call(node, node.__data__, i, j)) {
            subgroup.push(node);
          }
        }
      }
      return d3_selection(subgroups);
    };
    function d3_selection_filter(selector) {
      return function() {
        return d3_selectMatches(this, selector);
      };
    }
    d3_selectionPrototype.order = function() {
      for (var j = -1, m = this.length;++j < m; ) {
        for (var group = this[j], i = group.length - 1, next = group[i], node;--i >= 0; ) {
          if (node = group[i]) {
            if (next && next !== node.nextSibling)
              next.parentNode.insertBefore(node, next);
            next = node;
          }
        }
      }
      return this;
    };
    d3_selectionPrototype.sort = function(comparator) {
      comparator = d3_selection_sortComparator.apply(this, arguments);
      for (var j = -1, m = this.length;++j < m; )
        this[j].sort(comparator);
      return this.order();
    };
    function d3_selection_sortComparator(comparator) {
      if (!arguments.length)
        comparator = d3_ascending;
      return function(a, b) {
        return a && b ? comparator(a.__data__, b.__data__) : !a - !b;
      };
    }
    d3_selectionPrototype.each = function(callback) {
      return d3_selection_each(this, function(node, i, j) {
        callback.call(node, node.__data__, i, j);
      });
    };
    function d3_selection_each(groups, callback) {
      for (var j = 0, m = groups.length;j < m; j++) {
        for (var group = groups[j], i = 0, n = group.length, node;i < n; i++) {
          if (node = group[i])
            callback(node, i, j);
        }
      }
      return groups;
    }
    d3_selectionPrototype.call = function(callback) {
      var args = d3_array(arguments);
      callback.apply(args[0] = this, args);
      return this;
    };
    d3_selectionPrototype.empty = function() {
      return !this.node();
    };
    d3_selectionPrototype.node = function() {
      for (var j = 0, m = this.length;j < m; j++) {
        for (var group = this[j], i = 0, n = group.length;i < n; i++) {
          var node = group[i];
          if (node)
            return node;
        }
      }
      return null;
    };
    d3_selectionPrototype.size = function() {
      var n = 0;
      d3_selection_each(this, function() {
        ++n;
      });
      return n;
    };
    function d3_selection_enter(selection) {
      d3_subclass(selection, d3_selection_enterPrototype);
      return selection;
    }
    var d3_selection_enterPrototype = [];
    d3.selection.enter = d3_selection_enter;
    d3.selection.enter.prototype = d3_selection_enterPrototype;
    d3_selection_enterPrototype.append = d3_selectionPrototype.append;
    d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
    d3_selection_enterPrototype.node = d3_selectionPrototype.node;
    d3_selection_enterPrototype.call = d3_selectionPrototype.call;
    d3_selection_enterPrototype.size = d3_selectionPrototype.size;
    d3_selection_enterPrototype.select = function(selector) {
      var subgroups = [], subgroup, subnode, upgroup, group, node;
      for (var j = -1, m = this.length;++j < m; ) {
        upgroup = (group = this[j]).update;
        subgroups.push(subgroup = []);
        subgroup.parentNode = group.parentNode;
        for (var i = -1, n = group.length;++i < n; ) {
          if (node = group[i]) {
            subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i, j));
            subnode.__data__ = node.__data__;
          } else {
            subgroup.push(null);
          }
        }
      }
      return d3_selection(subgroups);
    };
    d3_selection_enterPrototype.insert = function(name, before) {
      if (arguments.length < 2)
        before = d3_selection_enterInsertBefore(this);
      return d3_selectionPrototype.insert.call(this, name, before);
    };
    function d3_selection_enterInsertBefore(enter) {
      var i0, j0;
      return function(d, i, j) {
        var group = enter[j].update, n = group.length, node;
        if (j != j0)
          j0 = j, i0 = 0;
        if (i >= i0)
          i0 = i + 1;
        while (!(node = group[i0]) && ++i0 < n)
          ;
        return node;
      };
    }
    d3.select = function(node) {
      var group;
      if (typeof node === "string") {
        group = [d3_select(node, d3_document)];
        group.parentNode = d3_document.documentElement;
      } else {
        group = [node];
        group.parentNode = d3_documentElement(node);
      }
      return d3_selection([group]);
    };
    d3.selectAll = function(nodes) {
      var group;
      if (typeof nodes === "string") {
        group = d3_array(d3_selectAll(nodes, d3_document));
        group.parentNode = d3_document.documentElement;
      } else {
        group = d3_array(nodes);
        group.parentNode = null;
      }
      return d3_selection([group]);
    };
    d3_selectionPrototype.on = function(type, listener, capture) {
      var n = arguments.length;
      if (n < 3) {
        if (typeof type !== "string") {
          if (n < 2)
            listener = false;
          for (capture in type)
            this.each(d3_selection_on(capture, type[capture], listener));
          return this;
        }
        if (n < 2)
          return (n = this.node()["__on" + type]) && n._;
        capture = false;
      }
      return this.each(d3_selection_on(type, listener, capture));
    };
    function d3_selection_on(type, listener, capture) {
      var name = "__on" + type, i = type.indexOf("."), wrap = d3_selection_onListener;
      if (i > 0)
        type = type.slice(0, i);
      var filter = d3_selection_onFilters.get(type);
      if (filter)
        type = filter, wrap = d3_selection_onFilter;
      function onRemove() {
        var l = this[name];
        if (l) {
          this.removeEventListener(type, l, l.$);
          delete this[name];
        }
      }
      function onAdd() {
        var l = wrap(listener, d3_array(arguments));
        onRemove.call(this);
        this.addEventListener(type, this[name] = l, l.$ = capture);
        l._ = listener;
      }
      function removeAll() {
        var re = new RegExp("^__on([^.]+)" + d3.requote(type) + "$"), match;
        for (var name2 in this) {
          if (match = name2.match(re)) {
            var l = this[name2];
            this.removeEventListener(match[1], l, l.$);
            delete this[name2];
          }
        }
      }
      return i ? listener ? onAdd : onRemove : listener ? d3_noop : removeAll;
    }
    var d3_selection_onFilters = d3.map({
      mouseenter: "mouseover",
      mouseleave: "mouseout"
    });
    if (d3_document) {
      d3_selection_onFilters.forEach(function(k) {
        if ("on" + k in d3_document)
          d3_selection_onFilters.remove(k);
      });
    }
    function d3_selection_onListener(listener, argumentz) {
      return function(e) {
        var o = d3.event;
        d3.event = e;
        argumentz[0] = this.__data__;
        try {
          listener.apply(this, argumentz);
        } finally {
          d3.event = o;
        }
      };
    }
    function d3_selection_onFilter(listener, argumentz) {
      var l = d3_selection_onListener(listener, argumentz);
      return function(e) {
        var target = this, related = e.relatedTarget;
        if (!related || related !== target && !(related.compareDocumentPosition(target) & 8)) {
          l.call(target, e);
        }
      };
    }
    var d3_event_dragSelect, d3_event_dragId = 0;
    function d3_event_dragSuppress(node) {
      var name = ".dragsuppress-" + ++d3_event_dragId, click = "click" + name, w = d3.select(d3_window(node)).on("touchmove" + name, d3_eventPreventDefault).on("dragstart" + name, d3_eventPreventDefault).on("selectstart" + name, d3_eventPreventDefault);
      if (d3_event_dragSelect == null) {
        d3_event_dragSelect = "onselectstart" in node ? false : d3_vendorSymbol(node.style, "userSelect");
      }
      if (d3_event_dragSelect) {
        var style = d3_documentElement(node).style, select = style[d3_event_dragSelect];
        style[d3_event_dragSelect] = "none";
      }
      return function(suppressClick) {
        w.on(name, null);
        if (d3_event_dragSelect)
          style[d3_event_dragSelect] = select;
        if (suppressClick) {
          var off = function() {
            w.on(click, null);
          };
          w.on(click, function() {
            d3_eventPreventDefault();
            off();
          }, true);
          setTimeout(off, 0);
        }
      };
    }
    d3.mouse = function(container) {
      return d3_mousePoint(container, d3_eventSource());
    };
    var d3_mouse_bug44083 = this.navigator && /WebKit/.test(this.navigator.userAgent) ? -1 : 0;
    function d3_mousePoint(container, e) {
      if (e.changedTouches)
        e = e.changedTouches[0];
      var svg = container.ownerSVGElement || container;
      if (svg.createSVGPoint) {
        var point = svg.createSVGPoint();
        if (d3_mouse_bug44083 < 0) {
          var window2 = d3_window(container);
          if (window2.scrollX || window2.scrollY) {
            svg = d3.select("body").append("svg").style({
              position: "absolute",
              top: 0,
              left: 0,
              margin: 0,
              padding: 0,
              border: "none"
            }, "important");
            var ctm = svg[0][0].getScreenCTM();
            d3_mouse_bug44083 = !(ctm.f || ctm.e);
            svg.remove();
          }
        }
        if (d3_mouse_bug44083)
          point.x = e.pageX, point.y = e.pageY;
        else
          point.x = e.clientX, point.y = e.clientY;
        point = point.matrixTransform(container.getScreenCTM().inverse());
        return [point.x, point.y];
      }
      var rect = container.getBoundingClientRect();
      return [e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop];
    }
    d3.touch = function(container, touches, identifier) {
      if (arguments.length < 3)
        identifier = touches, touches = d3_eventSource().changedTouches;
      if (touches)
        for (var i = 0, n = touches.length, touch;i < n; ++i) {
          if ((touch = touches[i]).identifier === identifier) {
            return d3_mousePoint(container, touch);
          }
        }
    };
    d3.behavior.drag = function() {
      var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"), origin = null, mousedown = dragstart(d3_noop, d3.mouse, d3_window, "mousemove", "mouseup"), touchstart = dragstart(d3_behavior_dragTouchId, d3.touch, d3_identity, "touchmove", "touchend");
      function drag() {
        this.on("mousedown.drag", mousedown).on("touchstart.drag", touchstart);
      }
      function dragstart(id, position, subject, move, end) {
        return function() {
          var that = this, target = d3.event.target.correspondingElement || d3.event.target, parent = that.parentNode, dispatch = event.of(that, arguments), dragged = 0, dragId = id(), dragName = ".drag" + (dragId == null ? "" : "-" + dragId), dragOffset, dragSubject = d3.select(subject(target)).on(move + dragName, moved).on(end + dragName, ended), dragRestore = d3_event_dragSuppress(target), position0 = position(parent, dragId);
          if (origin) {
            dragOffset = origin.apply(that, arguments);
            dragOffset = [dragOffset.x - position0[0], dragOffset.y - position0[1]];
          } else {
            dragOffset = [0, 0];
          }
          dispatch({
            type: "dragstart"
          });
          function moved() {
            var position1 = position(parent, dragId), dx, dy;
            if (!position1)
              return;
            dx = position1[0] - position0[0];
            dy = position1[1] - position0[1];
            dragged |= dx | dy;
            position0 = position1;
            dispatch({
              type: "drag",
              x: position1[0] + dragOffset[0],
              y: position1[1] + dragOffset[1],
              dx,
              dy
            });
          }
          function ended() {
            if (!position(parent, dragId))
              return;
            dragSubject.on(move + dragName, null).on(end + dragName, null);
            dragRestore(dragged);
            dispatch({
              type: "dragend"
            });
          }
        };
      }
      drag.origin = function(x) {
        if (!arguments.length)
          return origin;
        origin = x;
        return drag;
      };
      return d3.rebind(drag, event, "on");
    };
    function d3_behavior_dragTouchId() {
      return d3.event.changedTouches[0].identifier;
    }
    d3.touches = function(container, touches) {
      if (arguments.length < 2)
        touches = d3_eventSource().touches;
      return touches ? d3_array(touches).map(function(touch) {
        var point = d3_mousePoint(container, touch);
        point.identifier = touch.identifier;
        return point;
      }) : [];
    };
    var ε = 0.000001, ε2 = ε * ε, π = Math.PI, τ = 2 * π, τ_ = τ - ε, half_ = π / 2, d3_radians = π / 180, d3_degrees = 180 / π;
    function d3_sgn(x) {
      return x > 0 ? 1 : x < 0 ? -1 : 0;
    }
    function d3_cross2d(a, b, c) {
      return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
    }
    function d3_acos(x) {
      return x > 1 ? 0 : x < -1 ? π : Math.acos(x);
    }
    function d3_asin(x) {
      return x > 1 ? half_ : x < -1 ? -half_ : Math.asin(x);
    }
    function d3_sinh(x) {
      return ((x = Math.exp(x)) - 1 / x) / 2;
    }
    function d3_cosh(x) {
      return ((x = Math.exp(x)) + 1 / x) / 2;
    }
    function d3_tanh(x) {
      return ((x = Math.exp(2 * x)) - 1) / (x + 1);
    }
    function d3_haversin(x) {
      return (x = Math.sin(x / 2)) * x;
    }
    var ρ = Math.SQRT2, ρ2 = 2, ρ4 = 4;
    d3.interpolateZoom = function(p0, p1) {
      var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
      if (d2 < ε2) {
        S = Math.log(w1 / w0) / ρ;
        i = function(t) {
          return [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(ρ * t * S)];
        };
      } else {
        var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + ρ4 * d2) / (2 * w0 * ρ2 * d1), b1 = (w1 * w1 - w0 * w0 - ρ4 * d2) / (2 * w1 * ρ2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
        S = (r1 - r0) / ρ;
        i = function(t) {
          var s = t * S, coshr0 = d3_cosh(r0), u = w0 / (ρ2 * d1) * (coshr0 * d3_tanh(ρ * s + r0) - d3_sinh(r0));
          return [ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / d3_cosh(ρ * s + r0)];
        };
      }
      i.duration = S * 1000;
      return i;
    };
    d3.behavior.zoom = function() {
      var view = {
        x: 0,
        y: 0,
        k: 1
      }, translate0, center0, center, size = [960, 500], scaleExtent = d3_behavior_zoomInfinity, duration = 250, zooming = 0, mousedown = "mousedown.zoom", mousemove = "mousemove.zoom", mouseup = "mouseup.zoom", mousewheelTimer, touchstart = "touchstart.zoom", touchtime, event = d3_eventDispatch(zoom, "zoomstart", "zoom", "zoomend"), x0, x1, y0, y1;
      if (!d3_behavior_zoomWheel) {
        d3_behavior_zoomWheel = "onwheel" in d3_document ? (d3_behavior_zoomDelta = function() {
          return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1);
        }, "wheel") : ("onmousewheel" in d3_document) ? (d3_behavior_zoomDelta = function() {
          return d3.event.wheelDelta;
        }, "mousewheel") : (d3_behavior_zoomDelta = function() {
          return -d3.event.detail;
        }, "MozMousePixelScroll");
      }
      function zoom(g) {
        g.on(mousedown, mousedowned).on(d3_behavior_zoomWheel + ".zoom", mousewheeled).on("dblclick.zoom", dblclicked).on(touchstart, touchstarted);
      }
      zoom.event = function(g) {
        g.each(function() {
          var dispatch = event.of(this, arguments), view1 = view;
          if (d3_transitionInheritId) {
            d3.select(this).transition().each("start.zoom", function() {
              view = this.__chart__ || {
                x: 0,
                y: 0,
                k: 1
              };
              zoomstarted(dispatch);
            }).tween("zoom:zoom", function() {
              var dx = size[0], dy = size[1], cx = center0 ? center0[0] : dx / 2, cy = center0 ? center0[1] : dy / 2, i = d3.interpolateZoom([(cx - view.x) / view.k, (cy - view.y) / view.k, dx / view.k], [(cx - view1.x) / view1.k, (cy - view1.y) / view1.k, dx / view1.k]);
              return function(t) {
                var l = i(t), k = dx / l[2];
                this.__chart__ = view = {
                  x: cx - l[0] * k,
                  y: cy - l[1] * k,
                  k
                };
                zoomed(dispatch);
              };
            }).each("interrupt.zoom", function() {
              zoomended(dispatch);
            }).each("end.zoom", function() {
              zoomended(dispatch);
            });
          } else {
            this.__chart__ = view;
            zoomstarted(dispatch);
            zoomed(dispatch);
            zoomended(dispatch);
          }
        });
      };
      zoom.translate = function(_) {
        if (!arguments.length)
          return [view.x, view.y];
        view = {
          x: +_[0],
          y: +_[1],
          k: view.k
        };
        rescale();
        return zoom;
      };
      zoom.scale = function(_) {
        if (!arguments.length)
          return view.k;
        view = {
          x: view.x,
          y: view.y,
          k: null
        };
        scaleTo(+_);
        rescale();
        return zoom;
      };
      zoom.scaleExtent = function(_) {
        if (!arguments.length)
          return scaleExtent;
        scaleExtent = _ == null ? d3_behavior_zoomInfinity : [+_[0], +_[1]];
        return zoom;
      };
      zoom.center = function(_) {
        if (!arguments.length)
          return center;
        center = _ && [+_[0], +_[1]];
        return zoom;
      };
      zoom.size = function(_) {
        if (!arguments.length)
          return size;
        size = _ && [+_[0], +_[1]];
        return zoom;
      };
      zoom.duration = function(_) {
        if (!arguments.length)
          return duration;
        duration = +_;
        return zoom;
      };
      zoom.x = function(z) {
        if (!arguments.length)
          return x1;
        x1 = z;
        x0 = z.copy();
        view = {
          x: 0,
          y: 0,
          k: 1
        };
        return zoom;
      };
      zoom.y = function(z) {
        if (!arguments.length)
          return y1;
        y1 = z;
        y0 = z.copy();
        view = {
          x: 0,
          y: 0,
          k: 1
        };
        return zoom;
      };
      function location2(p) {
        return [(p[0] - view.x) / view.k, (p[1] - view.y) / view.k];
      }
      function point(l) {
        return [l[0] * view.k + view.x, l[1] * view.k + view.y];
      }
      function scaleTo(s) {
        view.k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
      }
      function translateTo(p, l) {
        l = point(l);
        view.x += p[0] - l[0];
        view.y += p[1] - l[1];
      }
      function zoomTo(that, p, l, k) {
        that.__chart__ = {
          x: view.x,
          y: view.y,
          k: view.k
        };
        scaleTo(Math.pow(2, k));
        translateTo(center0 = p, l);
        that = d3.select(that);
        if (duration > 0)
          that = that.transition().duration(duration);
        that.call(zoom.event);
      }
      function rescale() {
        if (x1)
          x1.domain(x0.range().map(function(x) {
            return (x - view.x) / view.k;
          }).map(x0.invert));
        if (y1)
          y1.domain(y0.range().map(function(y) {
            return (y - view.y) / view.k;
          }).map(y0.invert));
      }
      function zoomstarted(dispatch) {
        if (!zooming++)
          dispatch({
            type: "zoomstart"
          });
      }
      function zoomed(dispatch) {
        rescale();
        dispatch({
          type: "zoom",
          scale: view.k,
          translate: [view.x, view.y]
        });
      }
      function zoomended(dispatch) {
        if (!--zooming)
          dispatch({
            type: "zoomend"
          }), center0 = null;
      }
      function mousedowned() {
        var that = this, dispatch = event.of(that, arguments), dragged = 0, subject = d3.select(d3_window(that)).on(mousemove, moved).on(mouseup, ended), location0 = location2(d3.mouse(that)), dragRestore = d3_event_dragSuppress(that);
        d3_selection_interrupt.call(that);
        zoomstarted(dispatch);
        function moved() {
          dragged = 1;
          translateTo(d3.mouse(that), location0);
          zoomed(dispatch);
        }
        function ended() {
          subject.on(mousemove, null).on(mouseup, null);
          dragRestore(dragged);
          zoomended(dispatch);
        }
      }
      function touchstarted() {
        var that = this, dispatch = event.of(that, arguments), locations0 = {}, distance0 = 0, scale0, zoomName = ".zoom-" + d3.event.changedTouches[0].identifier, touchmove = "touchmove" + zoomName, touchend = "touchend" + zoomName, targets = [], subject = d3.select(that), dragRestore = d3_event_dragSuppress(that);
        started();
        zoomstarted(dispatch);
        subject.on(mousedown, null).on(touchstart, started);
        function relocate() {
          var touches = d3.touches(that);
          scale0 = view.k;
          touches.forEach(function(t) {
            if (t.identifier in locations0)
              locations0[t.identifier] = location2(t);
          });
          return touches;
        }
        function started() {
          var target = d3.event.target;
          d3.select(target).on(touchmove, moved).on(touchend, ended);
          targets.push(target);
          var changed = d3.event.changedTouches;
          for (var i = 0, n = changed.length;i < n; ++i) {
            locations0[changed[i].identifier] = null;
          }
          var touches = relocate(), now = Date.now();
          if (touches.length === 1) {
            if (now - touchtime < 500) {
              var p = touches[0];
              zoomTo(that, p, locations0[p.identifier], Math.floor(Math.log(view.k) / Math.LN2) + 1);
              d3_eventPreventDefault();
            }
            touchtime = now;
          } else if (touches.length > 1) {
            var p = touches[0], q = touches[1], dx = p[0] - q[0], dy = p[1] - q[1];
            distance0 = dx * dx + dy * dy;
          }
        }
        function moved() {
          var touches = d3.touches(that), p0, l0, p1, l1;
          d3_selection_interrupt.call(that);
          for (var i = 0, n = touches.length;i < n; ++i, l1 = null) {
            p1 = touches[i];
            if (l1 = locations0[p1.identifier]) {
              if (l0)
                break;
              p0 = p1, l0 = l1;
            }
          }
          if (l1) {
            var distance1 = (distance1 = p1[0] - p0[0]) * distance1 + (distance1 = p1[1] - p0[1]) * distance1, scale1 = distance0 && Math.sqrt(distance1 / distance0);
            p0 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
            l0 = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
            scaleTo(scale1 * scale0);
          }
          touchtime = null;
          translateTo(p0, l0);
          zoomed(dispatch);
        }
        function ended() {
          if (d3.event.touches.length) {
            var changed = d3.event.changedTouches;
            for (var i = 0, n = changed.length;i < n; ++i) {
              delete locations0[changed[i].identifier];
            }
            for (var identifier in locations0) {
              return void relocate();
            }
          }
          d3.selectAll(targets).on(zoomName, null);
          subject.on(mousedown, mousedowned).on(touchstart, touchstarted);
          dragRestore();
          zoomended(dispatch);
        }
      }
      function mousewheeled() {
        var dispatch = event.of(this, arguments);
        if (mousewheelTimer)
          clearTimeout(mousewheelTimer);
        else
          d3_selection_interrupt.call(this), translate0 = location2(center0 = center || d3.mouse(this)), zoomstarted(dispatch);
        mousewheelTimer = setTimeout(function() {
          mousewheelTimer = null;
          zoomended(dispatch);
        }, 50);
        d3_eventPreventDefault();
        scaleTo(Math.pow(2, d3_behavior_zoomDelta() * 0.002) * view.k);
        translateTo(center0, translate0);
        zoomed(dispatch);
      }
      function dblclicked() {
        var p = d3.mouse(this), k = Math.log(view.k) / Math.LN2;
        zoomTo(this, p, location2(p), d3.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1);
      }
      return d3.rebind(zoom, event, "on");
    };
    var d3_behavior_zoomInfinity = [0, Infinity], d3_behavior_zoomDelta, d3_behavior_zoomWheel;
    d3.color = d3_color;
    function d3_color() {}
    d3_color.prototype.toString = function() {
      return this.rgb() + "";
    };
    d3.hsl = d3_hsl;
    function d3_hsl(h, s, l) {
      return this instanceof d3_hsl ? void (this.h = +h, this.s = +s, this.l = +l) : arguments.length < 2 ? h instanceof d3_hsl ? new d3_hsl(h.h, h.s, h.l) : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl) : new d3_hsl(h, s, l);
    }
    var d3_hslPrototype = d3_hsl.prototype = new d3_color;
    d3_hslPrototype.brighter = function(k) {
      k = Math.pow(0.7, arguments.length ? k : 1);
      return new d3_hsl(this.h, this.s, this.l / k);
    };
    d3_hslPrototype.darker = function(k) {
      k = Math.pow(0.7, arguments.length ? k : 1);
      return new d3_hsl(this.h, this.s, k * this.l);
    };
    d3_hslPrototype.rgb = function() {
      return d3_hsl_rgb(this.h, this.s, this.l);
    };
    function d3_hsl_rgb(h, s, l) {
      var m1, m2;
      h = isNaN(h) ? 0 : (h %= 360) < 0 ? h + 360 : h;
      s = isNaN(s) ? 0 : s < 0 ? 0 : s > 1 ? 1 : s;
      l = l < 0 ? 0 : l > 1 ? 1 : l;
      m2 = l <= 0.5 ? l * (1 + s) : l + s - l * s;
      m1 = 2 * l - m2;
      function v(h2) {
        if (h2 > 360)
          h2 -= 360;
        else if (h2 < 0)
          h2 += 360;
        if (h2 < 60)
          return m1 + (m2 - m1) * h2 / 60;
        if (h2 < 180)
          return m2;
        if (h2 < 240)
          return m1 + (m2 - m1) * (240 - h2) / 60;
        return m1;
      }
      function vv(h2) {
        return Math.round(v(h2) * 255);
      }
      return new d3_rgb(vv(h + 120), vv(h), vv(h - 120));
    }
    d3.hcl = d3_hcl;
    function d3_hcl(h, c, l) {
      return this instanceof d3_hcl ? void (this.h = +h, this.c = +c, this.l = +l) : arguments.length < 2 ? h instanceof d3_hcl ? new d3_hcl(h.h, h.c, h.l) : h instanceof d3_lab ? d3_lab_hcl(h.l, h.a, h.b) : d3_lab_hcl((h = d3_rgb_lab((h = d3.rgb(h)).r, h.g, h.b)).l, h.a, h.b) : new d3_hcl(h, c, l);
    }
    var d3_hclPrototype = d3_hcl.prototype = new d3_color;
    d3_hclPrototype.brighter = function(k) {
      return new d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)));
    };
    d3_hclPrototype.darker = function(k) {
      return new d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)));
    };
    d3_hclPrototype.rgb = function() {
      return d3_hcl_lab(this.h, this.c, this.l).rgb();
    };
    function d3_hcl_lab(h, c, l) {
      if (isNaN(h))
        h = 0;
      if (isNaN(c))
        c = 0;
      return new d3_lab(l, Math.cos(h *= d3_radians) * c, Math.sin(h) * c);
    }
    d3.lab = d3_lab;
    function d3_lab(l, a, b) {
      return this instanceof d3_lab ? void (this.l = +l, this.a = +a, this.b = +b) : arguments.length < 2 ? l instanceof d3_lab ? new d3_lab(l.l, l.a, l.b) : l instanceof d3_hcl ? d3_hcl_lab(l.h, l.c, l.l) : d3_rgb_lab((l = d3_rgb(l)).r, l.g, l.b) : new d3_lab(l, a, b);
    }
    var d3_lab_K = 18;
    var d3_lab_X = 0.95047, d3_lab_Y = 1, d3_lab_Z = 1.08883;
    var d3_labPrototype = d3_lab.prototype = new d3_color;
    d3_labPrototype.brighter = function(k) {
      return new d3_lab(Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
    };
    d3_labPrototype.darker = function(k) {
      return new d3_lab(Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
    };
    d3_labPrototype.rgb = function() {
      return d3_lab_rgb(this.l, this.a, this.b);
    };
    function d3_lab_rgb(l, a, b) {
      var y = (l + 16) / 116, x = y + a / 500, z = y - b / 200;
      x = d3_lab_xyz(x) * d3_lab_X;
      y = d3_lab_xyz(y) * d3_lab_Y;
      z = d3_lab_xyz(z) * d3_lab_Z;
      return new d3_rgb(d3_xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z), d3_xyz_rgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z), d3_xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z));
    }
    function d3_lab_hcl(l, a, b) {
      return l > 0 ? new d3_hcl(Math.atan2(b, a) * d3_degrees, Math.sqrt(a * a + b * b), l) : new d3_hcl(NaN, NaN, l);
    }
    function d3_lab_xyz(x) {
      return x > 0.206893034 ? x * x * x : (x - 4 / 29) / 7.787037;
    }
    function d3_xyz_lab(x) {
      return x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787037 * x + 4 / 29;
    }
    function d3_xyz_rgb(r) {
      return Math.round(255 * (r <= 0.00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - 0.055));
    }
    d3.rgb = d3_rgb;
    function d3_rgb(r, g, b) {
      return this instanceof d3_rgb ? void (this.r = ~~r, this.g = ~~g, this.b = ~~b) : arguments.length < 2 ? r instanceof d3_rgb ? new d3_rgb(r.r, r.g, r.b) : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb) : new d3_rgb(r, g, b);
    }
    function d3_rgbNumber(value) {
      return new d3_rgb(value >> 16, value >> 8 & 255, value & 255);
    }
    function d3_rgbString(value) {
      return d3_rgbNumber(value) + "";
    }
    var d3_rgbPrototype = d3_rgb.prototype = new d3_color;
    d3_rgbPrototype.brighter = function(k) {
      k = Math.pow(0.7, arguments.length ? k : 1);
      var r = this.r, g = this.g, b = this.b, i = 30;
      if (!r && !g && !b)
        return new d3_rgb(i, i, i);
      if (r && r < i)
        r = i;
      if (g && g < i)
        g = i;
      if (b && b < i)
        b = i;
      return new d3_rgb(Math.min(255, r / k), Math.min(255, g / k), Math.min(255, b / k));
    };
    d3_rgbPrototype.darker = function(k) {
      k = Math.pow(0.7, arguments.length ? k : 1);
      return new d3_rgb(k * this.r, k * this.g, k * this.b);
    };
    d3_rgbPrototype.hsl = function() {
      return d3_rgb_hsl(this.r, this.g, this.b);
    };
    d3_rgbPrototype.toString = function() {
      return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
    };
    function d3_rgb_hex(v) {
      return v < 16 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16);
    }
    function d3_rgb_parse(format, rgb, hsl) {
      var r = 0, g = 0, b = 0, m1, m2, color;
      m1 = /([a-z]+)\((.*)\)/.exec(format = format.toLowerCase());
      if (m1) {
        m2 = m1[2].split(",");
        switch (m1[1]) {
          case "hsl": {
            return hsl(parseFloat(m2[0]), parseFloat(m2[1]) / 100, parseFloat(m2[2]) / 100);
          }
          case "rgb": {
            return rgb(d3_rgb_parseNumber(m2[0]), d3_rgb_parseNumber(m2[1]), d3_rgb_parseNumber(m2[2]));
          }
        }
      }
      if (color = d3_rgb_names.get(format)) {
        return rgb(color.r, color.g, color.b);
      }
      if (format != null && format.charAt(0) === "#" && !isNaN(color = parseInt(format.slice(1), 16))) {
        if (format.length === 4) {
          r = (color & 3840) >> 4;
          r = r >> 4 | r;
          g = color & 240;
          g = g >> 4 | g;
          b = color & 15;
          b = b << 4 | b;
        } else if (format.length === 7) {
          r = (color & 16711680) >> 16;
          g = (color & 65280) >> 8;
          b = color & 255;
        }
      }
      return rgb(r, g, b);
    }
    function d3_rgb_hsl(r, g, b) {
      var min = Math.min(r /= 255, g /= 255, b /= 255), max = Math.max(r, g, b), d = max - min, h, s, l = (max + min) / 2;
      if (d) {
        s = l < 0.5 ? d / (max + min) : d / (2 - max - min);
        if (r == max)
          h = (g - b) / d + (g < b ? 6 : 0);
        else if (g == max)
          h = (b - r) / d + 2;
        else
          h = (r - g) / d + 4;
        h *= 60;
      } else {
        h = NaN;
        s = l > 0 && l < 1 ? 0 : h;
      }
      return new d3_hsl(h, s, l);
    }
    function d3_rgb_lab(r, g, b) {
      r = d3_rgb_xyz(r);
      g = d3_rgb_xyz(g);
      b = d3_rgb_xyz(b);
      var x = d3_xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / d3_lab_X), y = d3_xyz_lab((0.2126729 * r + 0.7151522 * g + 0.072175 * b) / d3_lab_Y), z = d3_xyz_lab((0.0193339 * r + 0.119192 * g + 0.9503041 * b) / d3_lab_Z);
      return d3_lab(116 * y - 16, 500 * (x - y), 200 * (y - z));
    }
    function d3_rgb_xyz(r) {
      return (r /= 255) <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    }
    function d3_rgb_parseNumber(c) {
      var f = parseFloat(c);
      return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f;
    }
    var d3_rgb_names = d3.map({
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074
    });
    d3_rgb_names.forEach(function(key, value) {
      d3_rgb_names.set(key, d3_rgbNumber(value));
    });
    function d3_functor(v) {
      return typeof v === "function" ? v : function() {
        return v;
      };
    }
    d3.functor = d3_functor;
    d3.xhr = d3_xhrType(d3_identity);
    function d3_xhrType(response) {
      return function(url, mimeType, callback) {
        if (arguments.length === 2 && typeof mimeType === "function")
          callback = mimeType, mimeType = null;
        return d3_xhr(url, mimeType, response, callback);
      };
    }
    function d3_xhr(url, mimeType, response, callback) {
      var xhr = {}, dispatch = d3.dispatch("beforesend", "progress", "load", "error"), headers = {}, request = new XMLHttpRequest, responseType = null;
      if (this.XDomainRequest && !("withCredentials" in request) && /^(http(s)?:)?\/\//.test(url))
        request = new XDomainRequest;
      "onload" in request ? request.onload = request.onerror = respond : request.onreadystatechange = function() {
        request.readyState > 3 && respond();
      };
      function respond() {
        var status = request.status, result;
        if (!status && d3_xhrHasResponse(request) || status >= 200 && status < 300 || status === 304) {
          try {
            result = response.call(xhr, request);
          } catch (e) {
            dispatch.error.call(xhr, e);
            return;
          }
          dispatch.load.call(xhr, result);
        } else {
          dispatch.error.call(xhr, request);
        }
      }
      request.onprogress = function(event) {
        var o = d3.event;
        d3.event = event;
        try {
          dispatch.progress.call(xhr, request);
        } finally {
          d3.event = o;
        }
      };
      xhr.header = function(name, value) {
        name = (name + "").toLowerCase();
        if (arguments.length < 2)
          return headers[name];
        if (value == null)
          delete headers[name];
        else
          headers[name] = value + "";
        return xhr;
      };
      xhr.mimeType = function(value) {
        if (!arguments.length)
          return mimeType;
        mimeType = value == null ? null : value + "";
        return xhr;
      };
      xhr.responseType = function(value) {
        if (!arguments.length)
          return responseType;
        responseType = value;
        return xhr;
      };
      xhr.response = function(value) {
        response = value;
        return xhr;
      };
      ["get", "post"].forEach(function(method) {
        xhr[method] = function() {
          return xhr.send.apply(xhr, [method].concat(d3_array(arguments)));
        };
      });
      xhr.send = function(method, data, callback2) {
        if (arguments.length === 2 && typeof data === "function")
          callback2 = data, data = null;
        request.open(method, url, true);
        if (mimeType != null && !("accept" in headers))
          headers["accept"] = mimeType + ",*/*";
        if (request.setRequestHeader)
          for (var name in headers)
            request.setRequestHeader(name, headers[name]);
        if (mimeType != null && request.overrideMimeType)
          request.overrideMimeType(mimeType);
        if (responseType != null)
          request.responseType = responseType;
        if (callback2 != null)
          xhr.on("error", callback2).on("load", function(request2) {
            callback2(null, request2);
          });
        dispatch.beforesend.call(xhr, request);
        request.send(data == null ? null : data);
        return xhr;
      };
      xhr.abort = function() {
        request.abort();
        return xhr;
      };
      d3.rebind(xhr, dispatch, "on");
      return callback == null ? xhr : xhr.get(d3_xhr_fixCallback(callback));
    }
    function d3_xhr_fixCallback(callback) {
      return callback.length === 1 ? function(error, request) {
        callback(error == null ? request : null);
      } : callback;
    }
    function d3_xhrHasResponse(request) {
      var type = request.responseType;
      return type && type !== "text" ? request.response : request.responseText;
    }
    d3.dsv = function(delimiter, mimeType) {
      var reFormat = new RegExp('["' + delimiter + `
]`), delimiterCode = delimiter.charCodeAt(0);
      function dsv(url, row, callback) {
        if (arguments.length < 3)
          callback = row, row = null;
        var xhr = d3_xhr(url, mimeType, row == null ? response : typedResponse(row), callback);
        xhr.row = function(_) {
          return arguments.length ? xhr.response((row = _) == null ? response : typedResponse(_)) : row;
        };
        return xhr;
      }
      function response(request) {
        return dsv.parse(request.responseText);
      }
      function typedResponse(f) {
        return function(request) {
          return dsv.parse(request.responseText, f);
        };
      }
      dsv.parse = function(text, f) {
        var o;
        return dsv.parseRows(text, function(row, i) {
          if (o)
            return o(row, i - 1);
          var a = new Function("d", "return {" + row.map(function(name, i2) {
            return JSON.stringify(name) + ": d[" + i2 + "]";
          }).join(",") + "}");
          o = f ? function(row2, i2) {
            return f(a(row2), i2);
          } : a;
        });
      };
      dsv.parseRows = function(text, f) {
        var EOL = {}, EOF = {}, rows = [], N = text.length, I = 0, n = 0, t, eol;
        function token() {
          if (I >= N)
            return EOF;
          if (eol)
            return eol = false, EOL;
          var j = I;
          if (text.charCodeAt(j) === 34) {
            var i = j;
            while (i++ < N) {
              if (text.charCodeAt(i) === 34) {
                if (text.charCodeAt(i + 1) !== 34)
                  break;
                ++i;
              }
            }
            I = i + 2;
            var c = text.charCodeAt(i + 1);
            if (c === 13) {
              eol = true;
              if (text.charCodeAt(i + 2) === 10)
                ++I;
            } else if (c === 10) {
              eol = true;
            }
            return text.slice(j + 1, i).replace(/""/g, '"');
          }
          while (I < N) {
            var c = text.charCodeAt(I++), k = 1;
            if (c === 10)
              eol = true;
            else if (c === 13) {
              eol = true;
              if (text.charCodeAt(I) === 10)
                ++I, ++k;
            } else if (c !== delimiterCode)
              continue;
            return text.slice(j, I - k);
          }
          return text.slice(j);
        }
        while ((t = token()) !== EOF) {
          var a = [];
          while (t !== EOL && t !== EOF) {
            a.push(t);
            t = token();
          }
          if (f && (a = f(a, n++)) == null)
            continue;
          rows.push(a);
        }
        return rows;
      };
      dsv.format = function(rows) {
        if (Array.isArray(rows[0]))
          return dsv.formatRows(rows);
        var fieldSet = new d3_Set, fields = [];
        rows.forEach(function(row) {
          for (var field in row) {
            if (!fieldSet.has(field)) {
              fields.push(fieldSet.add(field));
            }
          }
        });
        return [fields.map(formatValue).join(delimiter)].concat(rows.map(function(row) {
          return fields.map(function(field) {
            return formatValue(row[field]);
          }).join(delimiter);
        })).join(`
`);
      };
      dsv.formatRows = function(rows) {
        return rows.map(formatRow).join(`
`);
      };
      function formatRow(row) {
        return row.map(formatValue).join(delimiter);
      }
      function formatValue(text) {
        return reFormat.test(text) ? '"' + text.replace(/\"/g, '""') + '"' : text;
      }
      return dsv;
    };
    d3.csv = d3.dsv(",", "text/csv");
    d3.tsv = d3.dsv("\t", "text/tab-separated-values");
    var d3_timer_queueHead, d3_timer_queueTail, d3_timer_interval, d3_timer_timeout, d3_timer_frame = this[d3_vendorSymbol(this, "requestAnimationFrame")] || function(callback) {
      setTimeout(callback, 17);
    };
    d3.timer = function() {
      d3_timer.apply(this, arguments);
    };
    function d3_timer(callback, delay, then) {
      var n = arguments.length;
      if (n < 2)
        delay = 0;
      if (n < 3)
        then = Date.now();
      var time = then + delay, timer = {
        c: callback,
        t: time,
        n: null
      };
      if (d3_timer_queueTail)
        d3_timer_queueTail.n = timer;
      else
        d3_timer_queueHead = timer;
      d3_timer_queueTail = timer;
      if (!d3_timer_interval) {
        d3_timer_timeout = clearTimeout(d3_timer_timeout);
        d3_timer_interval = 1;
        d3_timer_frame(d3_timer_step);
      }
      return timer;
    }
    function d3_timer_step() {
      var now = d3_timer_mark(), delay = d3_timer_sweep() - now;
      if (delay > 24) {
        if (isFinite(delay)) {
          clearTimeout(d3_timer_timeout);
          d3_timer_timeout = setTimeout(d3_timer_step, delay);
        }
        d3_timer_interval = 0;
      } else {
        d3_timer_interval = 1;
        d3_timer_frame(d3_timer_step);
      }
    }
    d3.timer.flush = function() {
      d3_timer_mark();
      d3_timer_sweep();
    };
    function d3_timer_mark() {
      var now = Date.now(), timer = d3_timer_queueHead;
      while (timer) {
        if (now >= timer.t && timer.c(now - timer.t))
          timer.c = null;
        timer = timer.n;
      }
      return now;
    }
    function d3_timer_sweep() {
      var t0, t1 = d3_timer_queueHead, time = Infinity;
      while (t1) {
        if (t1.c) {
          if (t1.t < time)
            time = t1.t;
          t1 = (t0 = t1).n;
        } else {
          t1 = t0 ? t0.n = t1.n : d3_timer_queueHead = t1.n;
        }
      }
      d3_timer_queueTail = t0;
      return time;
    }
    function d3_format_precision(x, p) {
      return p - (x ? Math.ceil(Math.log(x) / Math.LN10) : 1);
    }
    d3.round = function(x, n) {
      return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x);
    };
    var d3_formatPrefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(d3_formatPrefix);
    d3.formatPrefix = function(value, precision) {
      var i = 0;
      if (value = +value) {
        if (value < 0)
          value *= -1;
        if (precision)
          value = d3.round(value, d3_format_precision(value, precision));
        i = 1 + Math.floor(0.000000000001 + Math.log(value) / Math.LN10);
        i = Math.max(-24, Math.min(24, Math.floor((i - 1) / 3) * 3));
      }
      return d3_formatPrefixes[8 + i / 3];
    };
    function d3_formatPrefix(d, i) {
      var k = Math.pow(10, abs(8 - i) * 3);
      return {
        scale: i > 8 ? function(d2) {
          return d2 / k;
        } : function(d2) {
          return d2 * k;
        },
        symbol: d
      };
    }
    function d3_locale_numberFormat(locale) {
      var { decimal: locale_decimal, thousands: locale_thousands, grouping: locale_grouping, currency: locale_currency } = locale, formatGroup = locale_grouping && locale_thousands ? function(value, width) {
        var i = value.length, t = [], j = 0, g = locale_grouping[0], length = 0;
        while (i > 0 && g > 0) {
          if (length + g + 1 > width)
            g = Math.max(1, width - length);
          t.push(value.substring(i -= g, i + g));
          if ((length += g + 1) > width)
            break;
          g = locale_grouping[j = (j + 1) % locale_grouping.length];
        }
        return t.reverse().join(locale_thousands);
      } : d3_identity;
      return function(specifier) {
        var match = d3_format_re.exec(specifier), fill = match[1] || " ", align = match[2] || ">", sign = match[3] || "-", symbol = match[4] || "", zfill = match[5], width = +match[6], comma = match[7], precision = match[8], type = match[9], scale = 1, prefix = "", suffix = "", integer = false, exponent = true;
        if (precision)
          precision = +precision.substring(1);
        if (zfill || fill === "0" && align === "=") {
          zfill = fill = "0";
          align = "=";
        }
        switch (type) {
          case "n":
            comma = true;
            type = "g";
            break;
          case "%":
            scale = 100;
            suffix = "%";
            type = "f";
            break;
          case "p":
            scale = 100;
            suffix = "%";
            type = "r";
            break;
          case "b":
          case "o":
          case "x":
          case "X":
            if (symbol === "#")
              prefix = "0" + type.toLowerCase();
          case "c":
            exponent = false;
          case "d":
            integer = true;
            precision = 0;
            break;
          case "s":
            scale = -1;
            type = "r";
            break;
        }
        if (symbol === "$")
          prefix = locale_currency[0], suffix = locale_currency[1];
        if (type == "r" && !precision)
          type = "g";
        if (precision != null) {
          if (type == "g")
            precision = Math.max(1, Math.min(21, precision));
          else if (type == "e" || type == "f")
            precision = Math.max(0, Math.min(20, precision));
        }
        type = d3_format_types.get(type) || d3_format_typeDefault;
        var zcomma = zfill && comma;
        return function(value) {
          var fullSuffix = suffix;
          if (integer && value % 1)
            return "";
          var negative = value < 0 || value === 0 && 1 / value < 0 ? (value = -value, "-") : sign === "-" ? "" : sign;
          if (scale < 0) {
            var unit = d3.formatPrefix(value, precision);
            value = unit.scale(value);
            fullSuffix = unit.symbol + suffix;
          } else {
            value *= scale;
          }
          value = type(value, precision);
          var i = value.lastIndexOf("."), before, after;
          if (i < 0) {
            var j = exponent ? value.lastIndexOf("e") : -1;
            if (j < 0)
              before = value, after = "";
            else
              before = value.substring(0, j), after = value.substring(j);
          } else {
            before = value.substring(0, i);
            after = locale_decimal + value.substring(i + 1);
          }
          if (!zfill && comma)
            before = formatGroup(before, Infinity);
          var length = prefix.length + before.length + after.length + (zcomma ? 0 : negative.length), padding = length < width ? new Array(length = width - length + 1).join(fill) : "";
          if (zcomma)
            before = formatGroup(padding + before, padding.length ? width - after.length : Infinity);
          negative += prefix;
          value = before + after;
          return (align === "<" ? negative + value + padding : align === ">" ? padding + negative + value : align === "^" ? padding.substring(0, length >>= 1) + negative + value + padding.substring(length) : negative + (zcomma ? value : padding + value)) + fullSuffix;
        };
      };
    }
    var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i;
    var d3_format_types = d3.map({
      b: function(x) {
        return x.toString(2);
      },
      c: function(x) {
        return String.fromCharCode(x);
      },
      o: function(x) {
        return x.toString(8);
      },
      x: function(x) {
        return x.toString(16);
      },
      X: function(x) {
        return x.toString(16).toUpperCase();
      },
      g: function(x, p) {
        return x.toPrecision(p);
      },
      e: function(x, p) {
        return x.toExponential(p);
      },
      f: function(x, p) {
        return x.toFixed(p);
      },
      r: function(x, p) {
        return (x = d3.round(x, d3_format_precision(x, p))).toFixed(Math.max(0, Math.min(20, d3_format_precision(x * (1 + 0.000000000000001), p))));
      }
    });
    function d3_format_typeDefault(x) {
      return x + "";
    }
    var d3_time = d3.time = {}, d3_date = Date;
    function d3_date_utc() {
      this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]);
    }
    d3_date_utc.prototype = {
      getDate: function() {
        return this._.getUTCDate();
      },
      getDay: function() {
        return this._.getUTCDay();
      },
      getFullYear: function() {
        return this._.getUTCFullYear();
      },
      getHours: function() {
        return this._.getUTCHours();
      },
      getMilliseconds: function() {
        return this._.getUTCMilliseconds();
      },
      getMinutes: function() {
        return this._.getUTCMinutes();
      },
      getMonth: function() {
        return this._.getUTCMonth();
      },
      getSeconds: function() {
        return this._.getUTCSeconds();
      },
      getTime: function() {
        return this._.getTime();
      },
      getTimezoneOffset: function() {
        return 0;
      },
      valueOf: function() {
        return this._.valueOf();
      },
      setDate: function() {
        d3_time_prototype.setUTCDate.apply(this._, arguments);
      },
      setDay: function() {
        d3_time_prototype.setUTCDay.apply(this._, arguments);
      },
      setFullYear: function() {
        d3_time_prototype.setUTCFullYear.apply(this._, arguments);
      },
      setHours: function() {
        d3_time_prototype.setUTCHours.apply(this._, arguments);
      },
      setMilliseconds: function() {
        d3_time_prototype.setUTCMilliseconds.apply(this._, arguments);
      },
      setMinutes: function() {
        d3_time_prototype.setUTCMinutes.apply(this._, arguments);
      },
      setMonth: function() {
        d3_time_prototype.setUTCMonth.apply(this._, arguments);
      },
      setSeconds: function() {
        d3_time_prototype.setUTCSeconds.apply(this._, arguments);
      },
      setTime: function() {
        d3_time_prototype.setTime.apply(this._, arguments);
      }
    };
    var d3_time_prototype = Date.prototype;
    function d3_time_interval(local, step, number) {
      function round(date) {
        var d0 = local(date), d1 = offset(d0, 1);
        return date - d0 < d1 - date ? d0 : d1;
      }
      function ceil(date) {
        step(date = local(new d3_date(date - 1)), 1);
        return date;
      }
      function offset(date, k) {
        step(date = new d3_date(+date), k);
        return date;
      }
      function range(t0, t1, dt) {
        var time = ceil(t0), times = [];
        if (dt > 1) {
          while (time < t1) {
            if (!(number(time) % dt))
              times.push(new Date(+time));
            step(time, 1);
          }
        } else {
          while (time < t1)
            times.push(new Date(+time)), step(time, 1);
        }
        return times;
      }
      function range_utc(t0, t1, dt) {
        try {
          d3_date = d3_date_utc;
          var utc2 = new d3_date_utc;
          utc2._ = t0;
          return range(utc2, t1, dt);
        } finally {
          d3_date = Date;
        }
      }
      local.floor = local;
      local.round = round;
      local.ceil = ceil;
      local.offset = offset;
      local.range = range;
      var utc = local.utc = d3_time_interval_utc(local);
      utc.floor = utc;
      utc.round = d3_time_interval_utc(round);
      utc.ceil = d3_time_interval_utc(ceil);
      utc.offset = d3_time_interval_utc(offset);
      utc.range = range_utc;
      return local;
    }
    function d3_time_interval_utc(method) {
      return function(date, k) {
        try {
          d3_date = d3_date_utc;
          var utc = new d3_date_utc;
          utc._ = date;
          return method(utc, k)._;
        } finally {
          d3_date = Date;
        }
      };
    }
    d3_time.year = d3_time_interval(function(date) {
      date = d3_time.day(date);
      date.setMonth(0, 1);
      return date;
    }, function(date, offset) {
      date.setFullYear(date.getFullYear() + offset);
    }, function(date) {
      return date.getFullYear();
    });
    d3_time.years = d3_time.year.range;
    d3_time.years.utc = d3_time.year.utc.range;
    d3_time.day = d3_time_interval(function(date) {
      var day = new d3_date(2000, 0);
      day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      return day;
    }, function(date, offset) {
      date.setDate(date.getDate() + offset);
    }, function(date) {
      return date.getDate() - 1;
    });
    d3_time.days = d3_time.day.range;
    d3_time.days.utc = d3_time.day.utc.range;
    d3_time.dayOfYear = function(date) {
      var year = d3_time.year(date);
      return Math.floor((date - year - (date.getTimezoneOffset() - year.getTimezoneOffset()) * 60000) / 86400000);
    };
    ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(function(day, i) {
      i = 7 - i;
      var interval = d3_time[day] = d3_time_interval(function(date) {
        (date = d3_time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7);
        return date;
      }, function(date, offset) {
        date.setDate(date.getDate() + Math.floor(offset) * 7);
      }, function(date) {
        var day2 = d3_time.year(date).getDay();
        return Math.floor((d3_time.dayOfYear(date) + (day2 + i) % 7) / 7) - (day2 !== i);
      });
      d3_time[day + "s"] = interval.range;
      d3_time[day + "s"].utc = interval.utc.range;
      d3_time[day + "OfYear"] = function(date) {
        var day2 = d3_time.year(date).getDay();
        return Math.floor((d3_time.dayOfYear(date) + (day2 + i) % 7) / 7);
      };
    });
    d3_time.week = d3_time.sunday;
    d3_time.weeks = d3_time.sunday.range;
    d3_time.weeks.utc = d3_time.sunday.utc.range;
    d3_time.weekOfYear = d3_time.sundayOfYear;
    function d3_locale_timeFormat(locale) {
      var { dateTime: locale_dateTime, date: locale_date, time: locale_time, periods: locale_periods, days: locale_days, shortDays: locale_shortDays, months: locale_months, shortMonths: locale_shortMonths } = locale;
      function d3_time_format2(template) {
        var n = template.length;
        function format(date) {
          var string = [], i = -1, j = 0, c, p, f;
          while (++i < n) {
            if (template.charCodeAt(i) === 37) {
              string.push(template.slice(j, i));
              if ((p = d3_time_formatPads[c = template.charAt(++i)]) != null)
                c = template.charAt(++i);
              if (f = d3_time_formats[c])
                c = f(date, p == null ? c === "e" ? " " : "0" : p);
              string.push(c);
              j = i + 1;
            }
          }
          string.push(template.slice(j, i));
          return string.join("");
        }
        format.parse = function(string) {
          var d = {
            y: 1900,
            m: 0,
            d: 1,
            H: 0,
            M: 0,
            S: 0,
            L: 0,
            Z: null
          }, i = d3_time_parse(d, template, string, 0);
          if (i != string.length)
            return null;
          if ("p" in d)
            d.H = d.H % 12 + d.p * 12;
          var localZ = d.Z != null && d3_date !== d3_date_utc, date = new (localZ ? d3_date_utc : d3_date);
          if ("j" in d)
            date.setFullYear(d.y, 0, d.j);
          else if ("W" in d || "U" in d) {
            if (!("w" in d))
              d.w = "W" in d ? 1 : 0;
            date.setFullYear(d.y, 0, 1);
            date.setFullYear(d.y, 0, "W" in d ? (d.w + 6) % 7 + d.W * 7 - (date.getDay() + 5) % 7 : d.w + d.U * 7 - (date.getDay() + 6) % 7);
          } else
            date.setFullYear(d.y, d.m, d.d);
          date.setHours(d.H + (d.Z / 100 | 0), d.M + d.Z % 100, d.S, d.L);
          return localZ ? date._ : date;
        };
        format.toString = function() {
          return template;
        };
        return format;
      }
      function d3_time_parse(date, template, string, j) {
        var c, p, t, i = 0, n = template.length, m = string.length;
        while (i < n) {
          if (j >= m)
            return -1;
          c = template.charCodeAt(i++);
          if (c === 37) {
            t = template.charAt(i++);
            p = d3_time_parsers[t in d3_time_formatPads ? template.charAt(i++) : t];
            if (!p || (j = p(date, string, j)) < 0)
              return -1;
          } else if (c != string.charCodeAt(j++)) {
            return -1;
          }
        }
        return j;
      }
      d3_time_format2.utc = function(template) {
        var local = d3_time_format2(template);
        function format(date) {
          try {
            d3_date = d3_date_utc;
            var utc = new d3_date;
            utc._ = date;
            return local(utc);
          } finally {
            d3_date = Date;
          }
        }
        format.parse = function(string) {
          try {
            d3_date = d3_date_utc;
            var date = local.parse(string);
            return date && date._;
          } finally {
            d3_date = Date;
          }
        };
        format.toString = local.toString;
        return format;
      };
      d3_time_format2.multi = d3_time_format2.utc.multi = d3_time_formatMulti;
      var d3_time_periodLookup = d3.map(), d3_time_dayRe = d3_time_formatRe(locale_days), d3_time_dayLookup = d3_time_formatLookup(locale_days), d3_time_dayAbbrevRe = d3_time_formatRe(locale_shortDays), d3_time_dayAbbrevLookup = d3_time_formatLookup(locale_shortDays), d3_time_monthRe = d3_time_formatRe(locale_months), d3_time_monthLookup = d3_time_formatLookup(locale_months), d3_time_monthAbbrevRe = d3_time_formatRe(locale_shortMonths), d3_time_monthAbbrevLookup = d3_time_formatLookup(locale_shortMonths);
      locale_periods.forEach(function(p, i) {
        d3_time_periodLookup.set(p.toLowerCase(), i);
      });
      var d3_time_formats = {
        a: function(d) {
          return locale_shortDays[d.getDay()];
        },
        A: function(d) {
          return locale_days[d.getDay()];
        },
        b: function(d) {
          return locale_shortMonths[d.getMonth()];
        },
        B: function(d) {
          return locale_months[d.getMonth()];
        },
        c: d3_time_format2(locale_dateTime),
        d: function(d, p) {
          return d3_time_formatPad(d.getDate(), p, 2);
        },
        e: function(d, p) {
          return d3_time_formatPad(d.getDate(), p, 2);
        },
        H: function(d, p) {
          return d3_time_formatPad(d.getHours(), p, 2);
        },
        I: function(d, p) {
          return d3_time_formatPad(d.getHours() % 12 || 12, p, 2);
        },
        j: function(d, p) {
          return d3_time_formatPad(1 + d3_time.dayOfYear(d), p, 3);
        },
        L: function(d, p) {
          return d3_time_formatPad(d.getMilliseconds(), p, 3);
        },
        m: function(d, p) {
          return d3_time_formatPad(d.getMonth() + 1, p, 2);
        },
        M: function(d, p) {
          return d3_time_formatPad(d.getMinutes(), p, 2);
        },
        p: function(d) {
          return locale_periods[+(d.getHours() >= 12)];
        },
        S: function(d, p) {
          return d3_time_formatPad(d.getSeconds(), p, 2);
        },
        U: function(d, p) {
          return d3_time_formatPad(d3_time.sundayOfYear(d), p, 2);
        },
        w: function(d) {
          return d.getDay();
        },
        W: function(d, p) {
          return d3_time_formatPad(d3_time.mondayOfYear(d), p, 2);
        },
        x: d3_time_format2(locale_date),
        X: d3_time_format2(locale_time),
        y: function(d, p) {
          return d3_time_formatPad(d.getFullYear() % 100, p, 2);
        },
        Y: function(d, p) {
          return d3_time_formatPad(d.getFullYear() % 1e4, p, 4);
        },
        Z: d3_time_zone,
        "%": function() {
          return "%";
        }
      };
      var d3_time_parsers = {
        a: d3_time_parseWeekdayAbbrev,
        A: d3_time_parseWeekday,
        b: d3_time_parseMonthAbbrev,
        B: d3_time_parseMonth,
        c: d3_time_parseLocaleFull,
        d: d3_time_parseDay,
        e: d3_time_parseDay,
        H: d3_time_parseHour24,
        I: d3_time_parseHour24,
        j: d3_time_parseDayOfYear,
        L: d3_time_parseMilliseconds,
        m: d3_time_parseMonthNumber,
        M: d3_time_parseMinutes,
        p: d3_time_parseAmPm,
        S: d3_time_parseSeconds,
        U: d3_time_parseWeekNumberSunday,
        w: d3_time_parseWeekdayNumber,
        W: d3_time_parseWeekNumberMonday,
        x: d3_time_parseLocaleDate,
        X: d3_time_parseLocaleTime,
        y: d3_time_parseYear,
        Y: d3_time_parseFullYear,
        Z: d3_time_parseZone,
        "%": d3_time_parseLiteralPercent
      };
      function d3_time_parseWeekdayAbbrev(date, string, i) {
        d3_time_dayAbbrevRe.lastIndex = 0;
        var n = d3_time_dayAbbrevRe.exec(string.slice(i));
        return n ? (date.w = d3_time_dayAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
      }
      function d3_time_parseWeekday(date, string, i) {
        d3_time_dayRe.lastIndex = 0;
        var n = d3_time_dayRe.exec(string.slice(i));
        return n ? (date.w = d3_time_dayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
      }
      function d3_time_parseMonthAbbrev(date, string, i) {
        d3_time_monthAbbrevRe.lastIndex = 0;
        var n = d3_time_monthAbbrevRe.exec(string.slice(i));
        return n ? (date.m = d3_time_monthAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
      }
      function d3_time_parseMonth(date, string, i) {
        d3_time_monthRe.lastIndex = 0;
        var n = d3_time_monthRe.exec(string.slice(i));
        return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
      }
      function d3_time_parseLocaleFull(date, string, i) {
        return d3_time_parse(date, d3_time_formats.c.toString(), string, i);
      }
      function d3_time_parseLocaleDate(date, string, i) {
        return d3_time_parse(date, d3_time_formats.x.toString(), string, i);
      }
      function d3_time_parseLocaleTime(date, string, i) {
        return d3_time_parse(date, d3_time_formats.X.toString(), string, i);
      }
      function d3_time_parseAmPm(date, string, i) {
        var n = d3_time_periodLookup.get(string.slice(i, i += 2).toLowerCase());
        return n == null ? -1 : (date.p = n, i);
      }
      return d3_time_format2;
    }
    var d3_time_formatPads = {
      "-": "",
      _: " ",
      "0": "0"
    }, d3_time_numberRe = /^\s*\d+/, d3_time_percentRe = /^%/;
    function d3_time_formatPad(value, fill, width) {
      var sign = value < 0 ? "-" : "", string = (sign ? -value : value) + "", length = string.length;
      return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
    }
    function d3_time_formatRe(names) {
      return new RegExp("^(?:" + names.map(d3.requote).join("|") + ")", "i");
    }
    function d3_time_formatLookup(names) {
      var map = new d3_Map, i = -1, n = names.length;
      while (++i < n)
        map.set(names[i].toLowerCase(), i);
      return map;
    }
    function d3_time_parseWeekdayNumber(date, string, i) {
      d3_time_numberRe.lastIndex = 0;
      var n = d3_time_numberRe.exec(string.slice(i, i + 1));
      return n ? (date.w = +n[0], i + n[0].length) : -1;
    }
    function d3_time_parseWeekNumberSunday(date, string, i) {
      d3_time_numberRe.lastIndex = 0;
      var n = d3_time_numberRe.exec(string.slice(i));
      return n ? (date.U = +n[0], i + n[0].length) : -1;
    }
    function d3_time_parseWeekNumberMonday(date, string, i) {
      d3_time_numberRe.lastIndex = 0;
      var n = d3_time_numberRe.exec(string.slice(i));
      return n ? (date.W = +n[0], i + n[0].length) : -1;
    }
    function d3_time_parseFullYear(date, string, i) {
      d3_time_numberRe.lastIndex = 0;
      var n = d3_time_numberRe.exec(string.slice(i, i + 4));
      return n ? (date.y = +n[0], i + n[0].length) : -1;
    }
    function d3_time_parseYear(date, string, i) {
      d3_time_numberRe.lastIndex = 0;
      var n = d3_time_numberRe.exec(string.slice(i, i + 2));
      return n ? (date.y = d3_time_expandYear(+n[0]), i + n[0].length) : -1;
    }
    function d3_time_parseZone(date, string, i) {
      return /^[+-]\d{4}$/.test(string = string.slice(i, i + 5)) ? (date.Z = -string, i + 5) : -1;
    }
    function d3_time_expandYear(d) {
      return d + (d > 68 ? 1900 : 2000);
    }
    function d3_time_parseMonthNumber(date, string, i) {
      d3_time_numberRe.lastIndex = 0;
      var n = d3_time_numberRe.exec(string.slice(i, i + 2));
      return n ? (date.m = n[0] - 1, i + n[0].length) : -1;
    }
    function d3_time_parseDay(date, string, i) {
      d3_time_numberRe.lastIndex = 0;
      var n = d3_time_numberRe.exec(string.slice(i, i + 2));
      return n ? (date.d = +n[0], i + n[0].length) : -1;
    }
    function d3_time_parseDayOfYear(date, string, i) {
      d3_time_numberRe.lastIndex = 0;
      var n = d3_time_numberRe.exec(string.slice(i, i + 3));
      return n ? (date.j = +n[0], i + n[0].length) : -1;
    }
    function d3_time_parseHour24(date, string, i) {
      d3_time_numberRe.lastIndex = 0;
      var n = d3_time_numberRe.exec(string.slice(i, i + 2));
      return n ? (date.H = +n[0], i + n[0].length) : -1;
    }
    function d3_time_parseMinutes(date, string, i) {
      d3_time_numberRe.lastIndex = 0;
      var n = d3_time_numberRe.exec(string.slice(i, i + 2));
      return n ? (date.M = +n[0], i + n[0].length) : -1;
    }
    function d3_time_parseSeconds(date, string, i) {
      d3_time_numberRe.lastIndex = 0;
      var n = d3_time_numberRe.exec(string.slice(i, i + 2));
      return n ? (date.S = +n[0], i + n[0].length) : -1;
    }
    function d3_time_parseMilliseconds(date, string, i) {
      d3_time_numberRe.lastIndex = 0;
      var n = d3_time_numberRe.exec(string.slice(i, i + 3));
      return n ? (date.L = +n[0], i + n[0].length) : -1;
    }
    function d3_time_zone(d) {
      var z = d.getTimezoneOffset(), zs = z > 0 ? "-" : "+", zh = abs(z) / 60 | 0, zm = abs(z) % 60;
      return zs + d3_time_formatPad(zh, "0", 2) + d3_time_formatPad(zm, "0", 2);
    }
    function d3_time_parseLiteralPercent(date, string, i) {
      d3_time_percentRe.lastIndex = 0;
      var n = d3_time_percentRe.exec(string.slice(i, i + 1));
      return n ? i + n[0].length : -1;
    }
    function d3_time_formatMulti(formats) {
      var n = formats.length, i = -1;
      while (++i < n)
        formats[i][0] = this(formats[i][0]);
      return function(date) {
        var i2 = 0, f = formats[i2];
        while (!f[1](date))
          f = formats[++i2];
        return f[0](date);
      };
    }
    d3.locale = function(locale) {
      return {
        numberFormat: d3_locale_numberFormat(locale),
        timeFormat: d3_locale_timeFormat(locale)
      };
    };
    var d3_locale_enUS = d3.locale({
      decimal: ".",
      thousands: ",",
      grouping: [3],
      currency: ["$", ""],
      dateTime: "%a %b %e %X %Y",
      date: "%m/%d/%Y",
      time: "%H:%M:%S",
      periods: ["AM", "PM"],
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    });
    d3.format = d3_locale_enUS.numberFormat;
    d3.geo = {};
    function d3_adder() {}
    d3_adder.prototype = {
      s: 0,
      t: 0,
      add: function(y) {
        d3_adderSum(y, this.t, d3_adderTemp);
        d3_adderSum(d3_adderTemp.s, this.s, this);
        if (this.s)
          this.t += d3_adderTemp.t;
        else
          this.s = d3_adderTemp.t;
      },
      reset: function() {
        this.s = this.t = 0;
      },
      valueOf: function() {
        return this.s;
      }
    };
    var d3_adderTemp = new d3_adder;
    function d3_adderSum(a, b, o) {
      var x = o.s = a + b, bv = x - a, av = x - bv;
      o.t = a - av + (b - bv);
    }
    d3.geo.stream = function(object, listener) {
      if (object && d3_geo_streamObjectType.hasOwnProperty(object.type)) {
        d3_geo_streamObjectType[object.type](object, listener);
      } else {
        d3_geo_streamGeometry(object, listener);
      }
    };
    function d3_geo_streamGeometry(geometry, listener) {
      if (geometry && d3_geo_streamGeometryType.hasOwnProperty(geometry.type)) {
        d3_geo_streamGeometryType[geometry.type](geometry, listener);
      }
    }
    var d3_geo_streamObjectType = {
      Feature: function(feature, listener) {
        d3_geo_streamGeometry(feature.geometry, listener);
      },
      FeatureCollection: function(object, listener) {
        var features = object.features, i = -1, n = features.length;
        while (++i < n)
          d3_geo_streamGeometry(features[i].geometry, listener);
      }
    };
    var d3_geo_streamGeometryType = {
      Sphere: function(object, listener) {
        listener.sphere();
      },
      Point: function(object, listener) {
        object = object.coordinates;
        listener.point(object[0], object[1], object[2]);
      },
      MultiPoint: function(object, listener) {
        var coordinates = object.coordinates, i = -1, n = coordinates.length;
        while (++i < n)
          object = coordinates[i], listener.point(object[0], object[1], object[2]);
      },
      LineString: function(object, listener) {
        d3_geo_streamLine(object.coordinates, listener, 0);
      },
      MultiLineString: function(object, listener) {
        var coordinates = object.coordinates, i = -1, n = coordinates.length;
        while (++i < n)
          d3_geo_streamLine(coordinates[i], listener, 0);
      },
      Polygon: function(object, listener) {
        d3_geo_streamPolygon(object.coordinates, listener);
      },
      MultiPolygon: function(object, listener) {
        var coordinates = object.coordinates, i = -1, n = coordinates.length;
        while (++i < n)
          d3_geo_streamPolygon(coordinates[i], listener);
      },
      GeometryCollection: function(object, listener) {
        var geometries = object.geometries, i = -1, n = geometries.length;
        while (++i < n)
          d3_geo_streamGeometry(geometries[i], listener);
      }
    };
    function d3_geo_streamLine(coordinates, listener, closed) {
      var i = -1, n = coordinates.length - closed, coordinate;
      listener.lineStart();
      while (++i < n)
        coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1], coordinate[2]);
      listener.lineEnd();
    }
    function d3_geo_streamPolygon(coordinates, listener) {
      var i = -1, n = coordinates.length;
      listener.polygonStart();
      while (++i < n)
        d3_geo_streamLine(coordinates[i], listener, 1);
      listener.polygonEnd();
    }
    d3.geo.area = function(object) {
      d3_geo_areaSum = 0;
      d3.geo.stream(object, d3_geo_area);
      return d3_geo_areaSum;
    };
    var d3_geo_areaSum, d3_geo_areaRingSum = new d3_adder;
    var d3_geo_area = {
      sphere: function() {
        d3_geo_areaSum += 4 * π;
      },
      point: d3_noop,
      lineStart: d3_noop,
      lineEnd: d3_noop,
      polygonStart: function() {
        d3_geo_areaRingSum.reset();
        d3_geo_area.lineStart = d3_geo_areaRingStart;
      },
      polygonEnd: function() {
        var area = 2 * d3_geo_areaRingSum;
        d3_geo_areaSum += area < 0 ? 4 * π + area : area;
        d3_geo_area.lineStart = d3_geo_area.lineEnd = d3_geo_area.point = d3_noop;
      }
    };
    function d3_geo_areaRingStart() {
      var λ00, φ00, λ0, cos_0, sin_0;
      d3_geo_area.point = function(λ, φ) {
        d3_geo_area.point = nextPoint;
        λ0 = (λ00 = λ) * d3_radians, cos_0 = Math.cos(φ = (φ00 = φ) * d3_radians / 2 + π / 4), sin_0 = Math.sin(φ);
      };
      function nextPoint(λ, φ) {
        λ *= d3_radians;
        φ = φ * d3_radians / 2 + π / 4;
        var d_ = λ - λ0, sd_ = d_ >= 0 ? 1 : -1, ad_ = sd_ * d_, cos_ = Math.cos(φ), sin_ = Math.sin(φ), k = sin_0 * sin_, u = cos_0 * cos_ + k * Math.cos(ad_), v = k * sd_ * Math.sin(ad_);
        d3_geo_areaRingSum.add(Math.atan2(v, u));
        λ0 = λ, cos_0 = cos_, sin_0 = sin_;
      }
      d3_geo_area.lineEnd = function() {
        nextPoint(λ00, φ00);
      };
    }
    function d3_geo_cartesian(spherical) {
      var λ = spherical[0], φ = spherical[1], cos_ = Math.cos(φ);
      return [cos_ * Math.cos(λ), cos_ * Math.sin(λ), Math.sin(φ)];
    }
    function d3_geo_cartesianDot(a, b) {
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }
    function d3_geo_cartesianCross(a, b) {
      return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    }
    function d3_geo_cartesianAdd(a, b) {
      a[0] += b[0];
      a[1] += b[1];
      a[2] += b[2];
    }
    function d3_geo_cartesianScale(vector, k) {
      return [vector[0] * k, vector[1] * k, vector[2] * k];
    }
    function d3_geo_cartesianNormalize(d) {
      var l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
      d[0] /= l;
      d[1] /= l;
      d[2] /= l;
    }
    function d3_geo_spherical(cartesian) {
      return [Math.atan2(cartesian[1], cartesian[0]), d3_asin(cartesian[2])];
    }
    function d3_geo_sphericalEqual(a, b) {
      return abs(a[0] - b[0]) < ε && abs(a[1] - b[1]) < ε;
    }
    d3.geo.bounds = function() {
      var λ0, φ0, λ1, φ1, λ_, λ__, φ__, p0, d_Sum, ranges, range;
      var bound = {
        point,
        lineStart,
        lineEnd,
        polygonStart: function() {
          bound.point = ringPoint;
          bound.lineStart = ringStart;
          bound.lineEnd = ringEnd;
          d_Sum = 0;
          d3_geo_area.polygonStart();
        },
        polygonEnd: function() {
          d3_geo_area.polygonEnd();
          bound.point = point;
          bound.lineStart = lineStart;
          bound.lineEnd = lineEnd;
          if (d3_geo_areaRingSum < 0)
            λ0 = -(λ1 = 180), φ0 = -(φ1 = 90);
          else if (d_Sum > ε)
            φ1 = 90;
          else if (d_Sum < -ε)
            φ0 = -90;
          range[0] = λ0, range[1] = λ1;
        }
      };
      function point(λ, φ) {
        ranges.push(range = [λ0 = λ, λ1 = λ]);
        if (φ < φ0)
          φ0 = φ;
        if (φ > φ1)
          φ1 = φ;
      }
      function linePoint(λ, φ) {
        var p = d3_geo_cartesian([λ * d3_radians, φ * d3_radians]);
        if (p0) {
          var normal = d3_geo_cartesianCross(p0, p), equatorial = [normal[1], -normal[0], 0], inflection = d3_geo_cartesianCross(equatorial, normal);
          d3_geo_cartesianNormalize(inflection);
          inflection = d3_geo_spherical(inflection);
          var d_ = λ - λ_, s = d_ > 0 ? 1 : -1, λi = inflection[0] * d3_degrees * s, antimeridian = abs(d_) > 180;
          if (antimeridian ^ (s * λ_ < λi && λi < s * λ)) {
            var φi = inflection[1] * d3_degrees;
            if (φi > φ1)
              φ1 = φi;
          } else if (λi = (λi + 360) % 360 - 180, antimeridian ^ (s * λ_ < λi && λi < s * λ)) {
            var φi = -inflection[1] * d3_degrees;
            if (φi < φ0)
              φ0 = φi;
          } else {
            if (φ < φ0)
              φ0 = φ;
            if (φ > φ1)
              φ1 = φ;
          }
          if (antimeridian) {
            if (λ < λ_) {
              if (angle(λ0, λ) > angle(λ0, λ1))
                λ1 = λ;
            } else {
              if (angle(λ, λ1) > angle(λ0, λ1))
                λ0 = λ;
            }
          } else {
            if (λ1 >= λ0) {
              if (λ < λ0)
                λ0 = λ;
              if (λ > λ1)
                λ1 = λ;
            } else {
              if (λ > λ_) {
                if (angle(λ0, λ) > angle(λ0, λ1))
                  λ1 = λ;
              } else {
                if (angle(λ, λ1) > angle(λ0, λ1))
                  λ0 = λ;
              }
            }
          }
        } else {
          point(λ, φ);
        }
        p0 = p, λ_ = λ;
      }
      function lineStart() {
        bound.point = linePoint;
      }
      function lineEnd() {
        range[0] = λ0, range[1] = λ1;
        bound.point = point;
        p0 = null;
      }
      function ringPoint(λ, φ) {
        if (p0) {
          var d_ = λ - λ_;
          d_Sum += abs(d_) > 180 ? d_ + (d_ > 0 ? 360 : -360) : d_;
        } else
          λ__ = λ, φ__ = φ;
        d3_geo_area.point(λ, φ);
        linePoint(λ, φ);
      }
      function ringStart() {
        d3_geo_area.lineStart();
      }
      function ringEnd() {
        ringPoint(λ__, φ__);
        d3_geo_area.lineEnd();
        if (abs(d_Sum) > ε)
          λ0 = -(λ1 = 180);
        range[0] = λ0, range[1] = λ1;
        p0 = null;
      }
      function angle(λ02, λ12) {
        return (λ12 -= λ02) < 0 ? λ12 + 360 : λ12;
      }
      function compareRanges(a, b) {
        return a[0] - b[0];
      }
      function withinRange(x, range2) {
        return range2[0] <= range2[1] ? range2[0] <= x && x <= range2[1] : x < range2[0] || range2[1] < x;
      }
      return function(feature) {
        φ1 = λ1 = -(λ0 = φ0 = Infinity);
        ranges = [];
        d3.geo.stream(feature, bound);
        var n = ranges.length;
        if (n) {
          ranges.sort(compareRanges);
          for (var i = 1, a = ranges[0], b, merged = [a];i < n; ++i) {
            b = ranges[i];
            if (withinRange(b[0], a) || withinRange(b[1], a)) {
              if (angle(a[0], b[1]) > angle(a[0], a[1]))
                a[1] = b[1];
              if (angle(b[0], a[1]) > angle(a[0], a[1]))
                a[0] = b[0];
            } else {
              merged.push(a = b);
            }
          }
          var best = -Infinity, d_;
          for (var n = merged.length - 1, i = 0, a = merged[n], b;i <= n; a = b, ++i) {
            b = merged[i];
            if ((d_ = angle(a[1], b[0])) > best)
              best = d_, λ0 = b[0], λ1 = a[1];
          }
        }
        ranges = range = null;
        return λ0 === Infinity || φ0 === Infinity ? [[NaN, NaN], [NaN, NaN]] : [[λ0, φ0], [λ1, φ1]];
      };
    }();
    d3.geo.centroid = function(object) {
      d3_geo_centroidW0 = d3_geo_centroidW1 = d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
      d3.geo.stream(object, d3_geo_centroid);
      var x = d3_geo_centroidX2, y = d3_geo_centroidY2, z = d3_geo_centroidZ2, m = x * x + y * y + z * z;
      if (m < ε2) {
        x = d3_geo_centroidX1, y = d3_geo_centroidY1, z = d3_geo_centroidZ1;
        if (d3_geo_centroidW1 < ε)
          x = d3_geo_centroidX0, y = d3_geo_centroidY0, z = d3_geo_centroidZ0;
        m = x * x + y * y + z * z;
        if (m < ε2)
          return [NaN, NaN];
      }
      return [Math.atan2(y, x) * d3_degrees, d3_asin(z / Math.sqrt(m)) * d3_degrees];
    };
    var d3_geo_centroidW0, d3_geo_centroidW1, d3_geo_centroidX0, d3_geo_centroidY0, d3_geo_centroidZ0, d3_geo_centroidX1, d3_geo_centroidY1, d3_geo_centroidZ1, d3_geo_centroidX2, d3_geo_centroidY2, d3_geo_centroidZ2;
    var d3_geo_centroid = {
      sphere: d3_noop,
      point: d3_geo_centroidPoint,
      lineStart: d3_geo_centroidLineStart,
      lineEnd: d3_geo_centroidLineEnd,
      polygonStart: function() {
        d3_geo_centroid.lineStart = d3_geo_centroidRingStart;
      },
      polygonEnd: function() {
        d3_geo_centroid.lineStart = d3_geo_centroidLineStart;
      }
    };
    function d3_geo_centroidPoint(λ, φ) {
      λ *= d3_radians;
      var cos_ = Math.cos(φ *= d3_radians);
      d3_geo_centroidPointXYZ(cos_ * Math.cos(λ), cos_ * Math.sin(λ), Math.sin(φ));
    }
    function d3_geo_centroidPointXYZ(x, y, z) {
      ++d3_geo_centroidW0;
      d3_geo_centroidX0 += (x - d3_geo_centroidX0) / d3_geo_centroidW0;
      d3_geo_centroidY0 += (y - d3_geo_centroidY0) / d3_geo_centroidW0;
      d3_geo_centroidZ0 += (z - d3_geo_centroidZ0) / d3_geo_centroidW0;
    }
    function d3_geo_centroidLineStart() {
      var x0, y0, z0;
      d3_geo_centroid.point = function(λ, φ) {
        λ *= d3_radians;
        var cos_ = Math.cos(φ *= d3_radians);
        x0 = cos_ * Math.cos(λ);
        y0 = cos_ * Math.sin(λ);
        z0 = Math.sin(φ);
        d3_geo_centroid.point = nextPoint;
        d3_geo_centroidPointXYZ(x0, y0, z0);
      };
      function nextPoint(λ, φ) {
        λ *= d3_radians;
        var cos_ = Math.cos(φ *= d3_radians), x = cos_ * Math.cos(λ), y = cos_ * Math.sin(λ), z = Math.sin(φ), w = Math.atan2(Math.sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
        d3_geo_centroidW1 += w;
        d3_geo_centroidX1 += w * (x0 + (x0 = x));
        d3_geo_centroidY1 += w * (y0 + (y0 = y));
        d3_geo_centroidZ1 += w * (z0 + (z0 = z));
        d3_geo_centroidPointXYZ(x0, y0, z0);
      }
    }
    function d3_geo_centroidLineEnd() {
      d3_geo_centroid.point = d3_geo_centroidPoint;
    }
    function d3_geo_centroidRingStart() {
      var λ00, φ00, x0, y0, z0;
      d3_geo_centroid.point = function(λ, φ) {
        λ00 = λ, φ00 = φ;
        d3_geo_centroid.point = nextPoint;
        λ *= d3_radians;
        var cos_ = Math.cos(φ *= d3_radians);
        x0 = cos_ * Math.cos(λ);
        y0 = cos_ * Math.sin(λ);
        z0 = Math.sin(φ);
        d3_geo_centroidPointXYZ(x0, y0, z0);
      };
      d3_geo_centroid.lineEnd = function() {
        nextPoint(λ00, φ00);
        d3_geo_centroid.lineEnd = d3_geo_centroidLineEnd;
        d3_geo_centroid.point = d3_geo_centroidPoint;
      };
      function nextPoint(λ, φ) {
        λ *= d3_radians;
        var cos_ = Math.cos(φ *= d3_radians), x = cos_ * Math.cos(λ), y = cos_ * Math.sin(λ), z = Math.sin(φ), cx = y0 * z - z0 * y, cy = z0 * x - x0 * z, cz = x0 * y - y0 * x, m = Math.sqrt(cx * cx + cy * cy + cz * cz), u = x0 * x + y0 * y + z0 * z, v = m && -d3_acos(u) / m, w = Math.atan2(m, u);
        d3_geo_centroidX2 += v * cx;
        d3_geo_centroidY2 += v * cy;
        d3_geo_centroidZ2 += v * cz;
        d3_geo_centroidW1 += w;
        d3_geo_centroidX1 += w * (x0 + (x0 = x));
        d3_geo_centroidY1 += w * (y0 + (y0 = y));
        d3_geo_centroidZ1 += w * (z0 + (z0 = z));
        d3_geo_centroidPointXYZ(x0, y0, z0);
      }
    }
    function d3_geo_compose(a, b) {
      function compose(x, y) {
        return x = a(x, y), b(x[0], x[1]);
      }
      if (a.invert && b.invert)
        compose.invert = function(x, y) {
          return x = b.invert(x, y), x && a.invert(x[0], x[1]);
        };
      return compose;
    }
    function d3_true() {
      return true;
    }
    function d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener) {
      var subject = [], clip = [];
      segments.forEach(function(segment) {
        if ((n2 = segment.length - 1) <= 0)
          return;
        var n2, p0 = segment[0], p1 = segment[n2];
        if (d3_geo_sphericalEqual(p0, p1)) {
          listener.lineStart();
          for (var i2 = 0;i2 < n2; ++i2)
            listener.point((p0 = segment[i2])[0], p0[1]);
          listener.lineEnd();
          return;
        }
        var a = new d3_geo_clipPolygonIntersection(p0, segment, null, true), b = new d3_geo_clipPolygonIntersection(p0, null, a, false);
        a.o = b;
        subject.push(a);
        clip.push(b);
        a = new d3_geo_clipPolygonIntersection(p1, segment, null, false);
        b = new d3_geo_clipPolygonIntersection(p1, null, a, true);
        a.o = b;
        subject.push(a);
        clip.push(b);
      });
      clip.sort(compare);
      d3_geo_clipPolygonLinkCircular(subject);
      d3_geo_clipPolygonLinkCircular(clip);
      if (!subject.length)
        return;
      for (var i = 0, entry = clipStartInside, n = clip.length;i < n; ++i) {
        clip[i].e = entry = !entry;
      }
      var start = subject[0], points, point;
      while (true) {
        var current = start, isSubject = true;
        while (current.v)
          if ((current = current.n) === start)
            return;
        points = current.z;
        listener.lineStart();
        do {
          current.v = current.o.v = true;
          if (current.e) {
            if (isSubject) {
              for (var i = 0, n = points.length;i < n; ++i)
                listener.point((point = points[i])[0], point[1]);
            } else {
              interpolate(current.x, current.n.x, 1, listener);
            }
            current = current.n;
          } else {
            if (isSubject) {
              points = current.p.z;
              for (var i = points.length - 1;i >= 0; --i)
                listener.point((point = points[i])[0], point[1]);
            } else {
              interpolate(current.x, current.p.x, -1, listener);
            }
            current = current.p;
          }
          current = current.o;
          points = current.z;
          isSubject = !isSubject;
        } while (!current.v);
        listener.lineEnd();
      }
    }
    function d3_geo_clipPolygonLinkCircular(array) {
      if (!(n = array.length))
        return;
      var n, i = 0, a = array[0], b;
      while (++i < n) {
        a.n = b = array[i];
        b.p = a;
        a = b;
      }
      a.n = b = array[0];
      b.p = a;
    }
    function d3_geo_clipPolygonIntersection(point, points, other, entry) {
      this.x = point;
      this.z = points;
      this.o = other;
      this.e = entry;
      this.v = false;
      this.n = this.p = null;
    }
    function d3_geo_clip(pointVisible, clipLine, interpolate, clipStart) {
      return function(rotate, listener) {
        var line = clipLine(listener), rotatedClipStart = rotate.invert(clipStart[0], clipStart[1]);
        var clip = {
          point,
          lineStart,
          lineEnd,
          polygonStart: function() {
            clip.point = pointRing;
            clip.lineStart = ringStart;
            clip.lineEnd = ringEnd;
            segments = [];
            polygon = [];
          },
          polygonEnd: function() {
            clip.point = point;
            clip.lineStart = lineStart;
            clip.lineEnd = lineEnd;
            segments = d3.merge(segments);
            var clipStartInside = d3_geo_pointInPolygon(rotatedClipStart, polygon);
            if (segments.length) {
              if (!polygonStarted)
                listener.polygonStart(), polygonStarted = true;
              d3_geo_clipPolygon(segments, d3_geo_clipSort, clipStartInside, interpolate, listener);
            } else if (clipStartInside) {
              if (!polygonStarted)
                listener.polygonStart(), polygonStarted = true;
              listener.lineStart();
              interpolate(null, null, 1, listener);
              listener.lineEnd();
            }
            if (polygonStarted)
              listener.polygonEnd(), polygonStarted = false;
            segments = polygon = null;
          },
          sphere: function() {
            listener.polygonStart();
            listener.lineStart();
            interpolate(null, null, 1, listener);
            listener.lineEnd();
            listener.polygonEnd();
          }
        };
        function point(λ, φ) {
          var point2 = rotate(λ, φ);
          if (pointVisible(λ = point2[0], φ = point2[1]))
            listener.point(λ, φ);
        }
        function pointLine(λ, φ) {
          var point2 = rotate(λ, φ);
          line.point(point2[0], point2[1]);
        }
        function lineStart() {
          clip.point = pointLine;
          line.lineStart();
        }
        function lineEnd() {
          clip.point = point;
          line.lineEnd();
        }
        var segments;
        var buffer = d3_geo_clipBufferListener(), ringListener = clipLine(buffer), polygonStarted = false, polygon, ring;
        function pointRing(λ, φ) {
          ring.push([λ, φ]);
          var point2 = rotate(λ, φ);
          ringListener.point(point2[0], point2[1]);
        }
        function ringStart() {
          ringListener.lineStart();
          ring = [];
        }
        function ringEnd() {
          pointRing(ring[0][0], ring[0][1]);
          ringListener.lineEnd();
          var clean = ringListener.clean(), ringSegments = buffer.buffer(), segment, n = ringSegments.length;
          ring.pop();
          polygon.push(ring);
          ring = null;
          if (!n)
            return;
          if (clean & 1) {
            segment = ringSegments[0];
            var n = segment.length - 1, i = -1, point2;
            if (n > 0) {
              if (!polygonStarted)
                listener.polygonStart(), polygonStarted = true;
              listener.lineStart();
              while (++i < n)
                listener.point((point2 = segment[i])[0], point2[1]);
              listener.lineEnd();
            }
            return;
          }
          if (n > 1 && clean & 2)
            ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
          segments.push(ringSegments.filter(d3_geo_clipSegmentLength1));
        }
        return clip;
      };
    }
    function d3_geo_clipSegmentLength1(segment) {
      return segment.length > 1;
    }
    function d3_geo_clipBufferListener() {
      var lines = [], line;
      return {
        lineStart: function() {
          lines.push(line = []);
        },
        point: function(λ, φ) {
          line.push([λ, φ]);
        },
        lineEnd: d3_noop,
        buffer: function() {
          var buffer = lines;
          lines = [];
          line = null;
          return buffer;
        },
        rejoin: function() {
          if (lines.length > 1)
            lines.push(lines.pop().concat(lines.shift()));
        }
      };
    }
    function d3_geo_clipSort(a, b) {
      return ((a = a.x)[0] < 0 ? a[1] - half_ - ε : half_ - a[1]) - ((b = b.x)[0] < 0 ? b[1] - half_ - ε : half_ - b[1]);
    }
    var d3_geo_clipAntimeridian = d3_geo_clip(d3_true, d3_geo_clipAntimeridianLine, d3_geo_clipAntimeridianInterpolate, [-π, -π / 2]);
    function d3_geo_clipAntimeridianLine(listener) {
      var λ0 = NaN, φ0 = NaN, s_0 = NaN, clean;
      return {
        lineStart: function() {
          listener.lineStart();
          clean = 1;
        },
        point: function(λ1, φ1) {
          var s_1 = λ1 > 0 ? π : -π, d_ = abs(λ1 - λ0);
          if (abs(d_ - π) < ε) {
            listener.point(λ0, φ0 = (φ0 + φ1) / 2 > 0 ? half_ : -half_);
            listener.point(s_0, φ0);
            listener.lineEnd();
            listener.lineStart();
            listener.point(s_1, φ0);
            listener.point(λ1, φ0);
            clean = 0;
          } else if (s_0 !== s_1 && d_ >= π) {
            if (abs(λ0 - s_0) < ε)
              λ0 -= s_0 * ε;
            if (abs(λ1 - s_1) < ε)
              λ1 -= s_1 * ε;
            φ0 = d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1);
            listener.point(s_0, φ0);
            listener.lineEnd();
            listener.lineStart();
            listener.point(s_1, φ0);
            clean = 0;
          }
          listener.point(λ0 = λ1, φ0 = φ1);
          s_0 = s_1;
        },
        lineEnd: function() {
          listener.lineEnd();
          λ0 = φ0 = NaN;
        },
        clean: function() {
          return 2 - clean;
        }
      };
    }
    function d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1) {
      var cos_0, cos_1, sin_0__1 = Math.sin(λ0 - λ1);
      return abs(sin_0__1) > ε ? Math.atan((Math.sin(φ0) * (cos_1 = Math.cos(φ1)) * Math.sin(λ1) - Math.sin(φ1) * (cos_0 = Math.cos(φ0)) * Math.sin(λ0)) / (cos_0 * cos_1 * sin_0__1)) : (φ0 + φ1) / 2;
    }
    function d3_geo_clipAntimeridianInterpolate(from, to, direction, listener) {
      var φ;
      if (from == null) {
        φ = direction * half_;
        listener.point(-π, φ);
        listener.point(0, φ);
        listener.point(π, φ);
        listener.point(π, 0);
        listener.point(π, -φ);
        listener.point(0, -φ);
        listener.point(-π, -φ);
        listener.point(-π, 0);
        listener.point(-π, φ);
      } else if (abs(from[0] - to[0]) > ε) {
        var s = from[0] < to[0] ? π : -π;
        φ = direction * s / 2;
        listener.point(-s, φ);
        listener.point(0, φ);
        listener.point(s, φ);
      } else {
        listener.point(to[0], to[1]);
      }
    }
    function d3_geo_pointInPolygon(point, polygon) {
      var meridian = point[0], parallel = point[1], meridianNormal = [Math.sin(meridian), -Math.cos(meridian), 0], polarAngle = 0, winding = 0;
      d3_geo_areaRingSum.reset();
      for (var i = 0, n = polygon.length;i < n; ++i) {
        var ring = polygon[i], m = ring.length;
        if (!m)
          continue;
        var point0 = ring[0], λ0 = point0[0], φ0 = point0[1] / 2 + π / 4, sin_0 = Math.sin(φ0), cos_0 = Math.cos(φ0), j = 1;
        while (true) {
          if (j === m)
            j = 0;
          point = ring[j];
          var λ = point[0], φ = point[1] / 2 + π / 4, sin_ = Math.sin(φ), cos_ = Math.cos(φ), d_ = λ - λ0, sd_ = d_ >= 0 ? 1 : -1, ad_ = sd_ * d_, antimeridian = ad_ > π, k = sin_0 * sin_;
          d3_geo_areaRingSum.add(Math.atan2(k * sd_ * Math.sin(ad_), cos_0 * cos_ + k * Math.cos(ad_)));
          polarAngle += antimeridian ? d_ + sd_ * τ : d_;
          if (antimeridian ^ λ0 >= meridian ^ λ >= meridian) {
            var arc = d3_geo_cartesianCross(d3_geo_cartesian(point0), d3_geo_cartesian(point));
            d3_geo_cartesianNormalize(arc);
            var intersection = d3_geo_cartesianCross(meridianNormal, arc);
            d3_geo_cartesianNormalize(intersection);
            var φarc = (antimeridian ^ d_ >= 0 ? -1 : 1) * d3_asin(intersection[2]);
            if (parallel > φarc || parallel === φarc && (arc[0] || arc[1])) {
              winding += antimeridian ^ d_ >= 0 ? 1 : -1;
            }
          }
          if (!j++)
            break;
          λ0 = λ, sin_0 = sin_, cos_0 = cos_, point0 = point;
        }
      }
      return (polarAngle < -ε || polarAngle < ε && d3_geo_areaRingSum < -ε) ^ winding & 1;
    }
    function d3_geo_clipCircle(radius) {
      var cr = Math.cos(radius), smallRadius = cr > 0, notHemisphere = abs(cr) > ε, interpolate = d3_geo_circleInterpolate(radius, 6 * d3_radians);
      return d3_geo_clip(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-π, radius - π]);
      function visible(λ, φ) {
        return Math.cos(λ) * Math.cos(φ) > cr;
      }
      function clipLine(listener) {
        var point0, c0, v0, v00, clean;
        return {
          lineStart: function() {
            v00 = v0 = false;
            clean = 1;
          },
          point: function(λ, φ) {
            var point1 = [λ, φ], point2, v = visible(λ, φ), c = smallRadius ? v ? 0 : code(λ, φ) : v ? code(λ + (λ < 0 ? π : -π), φ) : 0;
            if (!point0 && (v00 = v0 = v))
              listener.lineStart();
            if (v !== v0) {
              point2 = intersect(point0, point1);
              if (d3_geo_sphericalEqual(point0, point2) || d3_geo_sphericalEqual(point1, point2)) {
                point1[0] += ε;
                point1[1] += ε;
                v = visible(point1[0], point1[1]);
              }
            }
            if (v !== v0) {
              clean = 0;
              if (v) {
                listener.lineStart();
                point2 = intersect(point1, point0);
                listener.point(point2[0], point2[1]);
              } else {
                point2 = intersect(point0, point1);
                listener.point(point2[0], point2[1]);
                listener.lineEnd();
              }
              point0 = point2;
            } else if (notHemisphere && point0 && smallRadius ^ v) {
              var t;
              if (!(c & c0) && (t = intersect(point1, point0, true))) {
                clean = 0;
                if (smallRadius) {
                  listener.lineStart();
                  listener.point(t[0][0], t[0][1]);
                  listener.point(t[1][0], t[1][1]);
                  listener.lineEnd();
                } else {
                  listener.point(t[1][0], t[1][1]);
                  listener.lineEnd();
                  listener.lineStart();
                  listener.point(t[0][0], t[0][1]);
                }
              }
            }
            if (v && (!point0 || !d3_geo_sphericalEqual(point0, point1))) {
              listener.point(point1[0], point1[1]);
            }
            point0 = point1, v0 = v, c0 = c;
          },
          lineEnd: function() {
            if (v0)
              listener.lineEnd();
            point0 = null;
          },
          clean: function() {
            return clean | (v00 && v0) << 1;
          }
        };
      }
      function intersect(a, b, two) {
        var pa = d3_geo_cartesian(a), pb = d3_geo_cartesian(b);
        var n1 = [1, 0, 0], n2 = d3_geo_cartesianCross(pa, pb), n2n2 = d3_geo_cartesianDot(n2, n2), n1n2 = n2[0], determinant = n2n2 - n1n2 * n1n2;
        if (!determinant)
          return !two && a;
        var c1 = cr * n2n2 / determinant, c2 = -cr * n1n2 / determinant, n1xn2 = d3_geo_cartesianCross(n1, n2), A = d3_geo_cartesianScale(n1, c1), B = d3_geo_cartesianScale(n2, c2);
        d3_geo_cartesianAdd(A, B);
        var u = n1xn2, w = d3_geo_cartesianDot(A, u), uu = d3_geo_cartesianDot(u, u), t2 = w * w - uu * (d3_geo_cartesianDot(A, A) - 1);
        if (t2 < 0)
          return;
        var t = Math.sqrt(t2), q = d3_geo_cartesianScale(u, (-w - t) / uu);
        d3_geo_cartesianAdd(q, A);
        q = d3_geo_spherical(q);
        if (!two)
          return q;
        var λ0 = a[0], λ1 = b[0], φ0 = a[1], φ1 = b[1], z;
        if (λ1 < λ0)
          z = λ0, λ0 = λ1, λ1 = z;
        var δ_ = λ1 - λ0, polar = abs(δ_ - π) < ε, meridian = polar || δ_ < ε;
        if (!polar && φ1 < φ0)
          z = φ0, φ0 = φ1, φ1 = z;
        if (meridian ? polar ? φ0 + φ1 > 0 ^ q[1] < (abs(q[0] - λ0) < ε ? φ0 : φ1) : φ0 <= q[1] && q[1] <= φ1 : δ_ > π ^ (λ0 <= q[0] && q[0] <= λ1)) {
          var q1 = d3_geo_cartesianScale(u, (-w + t) / uu);
          d3_geo_cartesianAdd(q1, A);
          return [q, d3_geo_spherical(q1)];
        }
      }
      function code(λ, φ) {
        var r = smallRadius ? radius : π - radius, code2 = 0;
        if (λ < -r)
          code2 |= 1;
        else if (λ > r)
          code2 |= 2;
        if (φ < -r)
          code2 |= 4;
        else if (φ > r)
          code2 |= 8;
        return code2;
      }
    }
    function d3_geom_clipLine(x0, y0, x1, y1) {
      return function(line) {
        var { a, b } = line, ax = a.x, ay = a.y, bx = b.x, by = b.y, t0 = 0, t1 = 1, dx = bx - ax, dy = by - ay, r;
        r = x0 - ax;
        if (!dx && r > 0)
          return;
        r /= dx;
        if (dx < 0) {
          if (r < t0)
            return;
          if (r < t1)
            t1 = r;
        } else if (dx > 0) {
          if (r > t1)
            return;
          if (r > t0)
            t0 = r;
        }
        r = x1 - ax;
        if (!dx && r < 0)
          return;
        r /= dx;
        if (dx < 0) {
          if (r > t1)
            return;
          if (r > t0)
            t0 = r;
        } else if (dx > 0) {
          if (r < t0)
            return;
          if (r < t1)
            t1 = r;
        }
        r = y0 - ay;
        if (!dy && r > 0)
          return;
        r /= dy;
        if (dy < 0) {
          if (r < t0)
            return;
          if (r < t1)
            t1 = r;
        } else if (dy > 0) {
          if (r > t1)
            return;
          if (r > t0)
            t0 = r;
        }
        r = y1 - ay;
        if (!dy && r < 0)
          return;
        r /= dy;
        if (dy < 0) {
          if (r > t1)
            return;
          if (r > t0)
            t0 = r;
        } else if (dy > 0) {
          if (r < t0)
            return;
          if (r < t1)
            t1 = r;
        }
        if (t0 > 0)
          line.a = {
            x: ax + t0 * dx,
            y: ay + t0 * dy
          };
        if (t1 < 1)
          line.b = {
            x: ax + t1 * dx,
            y: ay + t1 * dy
          };
        return line;
      };
    }
    var d3_geo_clipExtentMAX = 1e9;
    d3.geo.clipExtent = function() {
      var x0, y0, x1, y1, stream, clip, clipExtent = {
        stream: function(output) {
          if (stream)
            stream.valid = false;
          stream = clip(output);
          stream.valid = true;
          return stream;
        },
        extent: function(_) {
          if (!arguments.length)
            return [[x0, y0], [x1, y1]];
          clip = d3_geo_clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]);
          if (stream)
            stream.valid = false, stream = null;
          return clipExtent;
        }
      };
      return clipExtent.extent([[0, 0], [960, 500]]);
    };
    function d3_geo_clipExtent(x0, y0, x1, y1) {
      return function(listener) {
        var listener_ = listener, bufferListener = d3_geo_clipBufferListener(), clipLine = d3_geom_clipLine(x0, y0, x1, y1), segments, polygon, ring;
        var clip = {
          point,
          lineStart,
          lineEnd,
          polygonStart: function() {
            listener = bufferListener;
            segments = [];
            polygon = [];
            clean = true;
          },
          polygonEnd: function() {
            listener = listener_;
            segments = d3.merge(segments);
            var clipStartInside = insidePolygon([x0, y1]), inside = clean && clipStartInside, visible = segments.length;
            if (inside || visible) {
              listener.polygonStart();
              if (inside) {
                listener.lineStart();
                interpolate(null, null, 1, listener);
                listener.lineEnd();
              }
              if (visible) {
                d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener);
              }
              listener.polygonEnd();
            }
            segments = polygon = ring = null;
          }
        };
        function insidePolygon(p) {
          var wn = 0, n = polygon.length, y = p[1];
          for (var i = 0;i < n; ++i) {
            for (var j = 1, v = polygon[i], m = v.length, a = v[0], b;j < m; ++j) {
              b = v[j];
              if (a[1] <= y) {
                if (b[1] > y && d3_cross2d(a, b, p) > 0)
                  ++wn;
              } else {
                if (b[1] <= y && d3_cross2d(a, b, p) < 0)
                  --wn;
              }
              a = b;
            }
          }
          return wn !== 0;
        }
        function interpolate(from, to, direction, listener2) {
          var a = 0, a1 = 0;
          if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoints(from, to) < 0 ^ direction > 0) {
            do {
              listener2.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
            } while ((a = (a + direction + 4) % 4) !== a1);
          } else {
            listener2.point(to[0], to[1]);
          }
        }
        function pointVisible(x, y) {
          return x0 <= x && x <= x1 && y0 <= y && y <= y1;
        }
        function point(x, y) {
          if (pointVisible(x, y))
            listener.point(x, y);
        }
        var x__, y__, v__, x_, y_, v_, first, clean;
        function lineStart() {
          clip.point = linePoint;
          if (polygon)
            polygon.push(ring = []);
          first = true;
          v_ = false;
          x_ = y_ = NaN;
        }
        function lineEnd() {
          if (segments) {
            linePoint(x__, y__);
            if (v__ && v_)
              bufferListener.rejoin();
            segments.push(bufferListener.buffer());
          }
          clip.point = point;
          if (v_)
            listener.lineEnd();
        }
        function linePoint(x, y) {
          x = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, x));
          y = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, y));
          var v = pointVisible(x, y);
          if (polygon)
            ring.push([x, y]);
          if (first) {
            x__ = x, y__ = y, v__ = v;
            first = false;
            if (v) {
              listener.lineStart();
              listener.point(x, y);
            }
          } else {
            if (v && v_)
              listener.point(x, y);
            else {
              var l = {
                a: {
                  x: x_,
                  y: y_
                },
                b: {
                  x,
                  y
                }
              };
              if (clipLine(l)) {
                if (!v_) {
                  listener.lineStart();
                  listener.point(l.a.x, l.a.y);
                }
                listener.point(l.b.x, l.b.y);
                if (!v)
                  listener.lineEnd();
                clean = false;
              } else if (v) {
                listener.lineStart();
                listener.point(x, y);
                clean = false;
              }
            }
          }
          x_ = x, y_ = y, v_ = v;
        }
        return clip;
      };
      function corner(p, direction) {
        return abs(p[0] - x0) < ε ? direction > 0 ? 0 : 3 : abs(p[0] - x1) < ε ? direction > 0 ? 2 : 1 : abs(p[1] - y0) < ε ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2;
      }
      function compare(a, b) {
        return comparePoints(a.x, b.x);
      }
      function comparePoints(a, b) {
        var ca = corner(a, 1), cb = corner(b, 1);
        return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
      }
    }
    function d3_geo_conic(projectAt) {
      var φ0 = 0, φ1 = π / 3, m = d3_geo_projectionMutator(projectAt), p = m(φ0, φ1);
      p.parallels = function(_) {
        if (!arguments.length)
          return [φ0 / π * 180, φ1 / π * 180];
        return m(φ0 = _[0] * π / 180, φ1 = _[1] * π / 180);
      };
      return p;
    }
    function d3_geo_conicEqualArea(φ0, φ1) {
      var sin_0 = Math.sin(φ0), n = (sin_0 + Math.sin(φ1)) / 2, C = 1 + sin_0 * (2 * n - sin_0), ρ0 = Math.sqrt(C) / n;
      function forward(λ, φ) {
        var ρ3 = Math.sqrt(C - 2 * n * Math.sin(φ)) / n;
        return [ρ3 * Math.sin(λ *= n), ρ0 - ρ3 * Math.cos(λ)];
      }
      forward.invert = function(x, y) {
        var ρ0_y = ρ0 - y;
        return [Math.atan2(x, ρ0_y) / n, d3_asin((C - (x * x + ρ0_y * ρ0_y) * n * n) / (2 * n))];
      };
      return forward;
    }
    (d3.geo.conicEqualArea = function() {
      return d3_geo_conic(d3_geo_conicEqualArea);
    }).raw = d3_geo_conicEqualArea;
    d3.geo.albers = function() {
      return d3.geo.conicEqualArea().rotate([96, 0]).center([-0.6, 38.7]).parallels([29.5, 45.5]).scale(1070);
    };
    d3.geo.albersUsa = function() {
      var lower48 = d3.geo.albers();
      var alaska = d3.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]);
      var hawaii = d3.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]);
      var point, pointStream = {
        point: function(x, y) {
          point = [x, y];
        }
      }, lower48Point, alaskaPoint, hawaiiPoint;
      function albersUsa(coordinates) {
        var x = coordinates[0], y = coordinates[1];
        point = null;
        (lower48Point(x, y), point) || (alaskaPoint(x, y), point) || hawaiiPoint(x, y);
        return point;
      }
      albersUsa.invert = function(coordinates) {
        var k = lower48.scale(), t = lower48.translate(), x = (coordinates[0] - t[0]) / k, y = (coordinates[1] - t[1]) / k;
        return (y >= 0.12 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii : lower48).invert(coordinates);
      };
      albersUsa.stream = function(stream) {
        var lower48Stream = lower48.stream(stream), alaskaStream = alaska.stream(stream), hawaiiStream = hawaii.stream(stream);
        return {
          point: function(x, y) {
            lower48Stream.point(x, y);
            alaskaStream.point(x, y);
            hawaiiStream.point(x, y);
          },
          sphere: function() {
            lower48Stream.sphere();
            alaskaStream.sphere();
            hawaiiStream.sphere();
          },
          lineStart: function() {
            lower48Stream.lineStart();
            alaskaStream.lineStart();
            hawaiiStream.lineStart();
          },
          lineEnd: function() {
            lower48Stream.lineEnd();
            alaskaStream.lineEnd();
            hawaiiStream.lineEnd();
          },
          polygonStart: function() {
            lower48Stream.polygonStart();
            alaskaStream.polygonStart();
            hawaiiStream.polygonStart();
          },
          polygonEnd: function() {
            lower48Stream.polygonEnd();
            alaskaStream.polygonEnd();
            hawaiiStream.polygonEnd();
          }
        };
      };
      albersUsa.precision = function(_) {
        if (!arguments.length)
          return lower48.precision();
        lower48.precision(_);
        alaska.precision(_);
        hawaii.precision(_);
        return albersUsa;
      };
      albersUsa.scale = function(_) {
        if (!arguments.length)
          return lower48.scale();
        lower48.scale(_);
        alaska.scale(_ * 0.35);
        hawaii.scale(_);
        return albersUsa.translate(lower48.translate());
      };
      albersUsa.translate = function(_) {
        if (!arguments.length)
          return lower48.translate();
        var k = lower48.scale(), x = +_[0], y = +_[1];
        lower48Point = lower48.translate(_).clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]]).stream(pointStream).point;
        alaskaPoint = alaska.translate([x - 0.307 * k, y + 0.201 * k]).clipExtent([[x - 0.425 * k + ε, y + 0.12 * k + ε], [x - 0.214 * k - ε, y + 0.234 * k - ε]]).stream(pointStream).point;
        hawaiiPoint = hawaii.translate([x - 0.205 * k, y + 0.212 * k]).clipExtent([[x - 0.214 * k + ε, y + 0.166 * k + ε], [x - 0.115 * k - ε, y + 0.234 * k - ε]]).stream(pointStream).point;
        return albersUsa;
      };
      return albersUsa.scale(1070);
    };
    var d3_geo_pathAreaSum, d3_geo_pathAreaPolygon, d3_geo_pathArea = {
      point: d3_noop,
      lineStart: d3_noop,
      lineEnd: d3_noop,
      polygonStart: function() {
        d3_geo_pathAreaPolygon = 0;
        d3_geo_pathArea.lineStart = d3_geo_pathAreaRingStart;
      },
      polygonEnd: function() {
        d3_geo_pathArea.lineStart = d3_geo_pathArea.lineEnd = d3_geo_pathArea.point = d3_noop;
        d3_geo_pathAreaSum += abs(d3_geo_pathAreaPolygon / 2);
      }
    };
    function d3_geo_pathAreaRingStart() {
      var x00, y00, x0, y0;
      d3_geo_pathArea.point = function(x, y) {
        d3_geo_pathArea.point = nextPoint;
        x00 = x0 = x, y00 = y0 = y;
      };
      function nextPoint(x, y) {
        d3_geo_pathAreaPolygon += y0 * x - x0 * y;
        x0 = x, y0 = y;
      }
      d3_geo_pathArea.lineEnd = function() {
        nextPoint(x00, y00);
      };
    }
    var d3_geo_pathBoundsX0, d3_geo_pathBoundsY0, d3_geo_pathBoundsX1, d3_geo_pathBoundsY1;
    var d3_geo_pathBounds = {
      point: d3_geo_pathBoundsPoint,
      lineStart: d3_noop,
      lineEnd: d3_noop,
      polygonStart: d3_noop,
      polygonEnd: d3_noop
    };
    function d3_geo_pathBoundsPoint(x, y) {
      if (x < d3_geo_pathBoundsX0)
        d3_geo_pathBoundsX0 = x;
      if (x > d3_geo_pathBoundsX1)
        d3_geo_pathBoundsX1 = x;
      if (y < d3_geo_pathBoundsY0)
        d3_geo_pathBoundsY0 = y;
      if (y > d3_geo_pathBoundsY1)
        d3_geo_pathBoundsY1 = y;
    }
    function d3_geo_pathBuffer() {
      var pointCircle = d3_geo_pathBufferCircle(4.5), buffer = [];
      var stream = {
        point,
        lineStart: function() {
          stream.point = pointLineStart;
        },
        lineEnd,
        polygonStart: function() {
          stream.lineEnd = lineEndPolygon;
        },
        polygonEnd: function() {
          stream.lineEnd = lineEnd;
          stream.point = point;
        },
        pointRadius: function(_) {
          pointCircle = d3_geo_pathBufferCircle(_);
          return stream;
        },
        result: function() {
          if (buffer.length) {
            var result = buffer.join("");
            buffer = [];
            return result;
          }
        }
      };
      function point(x, y) {
        buffer.push("M", x, ",", y, pointCircle);
      }
      function pointLineStart(x, y) {
        buffer.push("M", x, ",", y);
        stream.point = pointLine;
      }
      function pointLine(x, y) {
        buffer.push("L", x, ",", y);
      }
      function lineEnd() {
        stream.point = point;
      }
      function lineEndPolygon() {
        buffer.push("Z");
      }
      return stream;
    }
    function d3_geo_pathBufferCircle(radius) {
      return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z";
    }
    var d3_geo_pathCentroid = {
      point: d3_geo_pathCentroidPoint,
      lineStart: d3_geo_pathCentroidLineStart,
      lineEnd: d3_geo_pathCentroidLineEnd,
      polygonStart: function() {
        d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidRingStart;
      },
      polygonEnd: function() {
        d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
        d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidLineStart;
        d3_geo_pathCentroid.lineEnd = d3_geo_pathCentroidLineEnd;
      }
    };
    function d3_geo_pathCentroidPoint(x, y) {
      d3_geo_centroidX0 += x;
      d3_geo_centroidY0 += y;
      ++d3_geo_centroidZ0;
    }
    function d3_geo_pathCentroidLineStart() {
      var x0, y0;
      d3_geo_pathCentroid.point = function(x, y) {
        d3_geo_pathCentroid.point = nextPoint;
        d3_geo_pathCentroidPoint(x0 = x, y0 = y);
      };
      function nextPoint(x, y) {
        var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
        d3_geo_centroidX1 += z * (x0 + x) / 2;
        d3_geo_centroidY1 += z * (y0 + y) / 2;
        d3_geo_centroidZ1 += z;
        d3_geo_pathCentroidPoint(x0 = x, y0 = y);
      }
    }
    function d3_geo_pathCentroidLineEnd() {
      d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
    }
    function d3_geo_pathCentroidRingStart() {
      var x00, y00, x0, y0;
      d3_geo_pathCentroid.point = function(x, y) {
        d3_geo_pathCentroid.point = nextPoint;
        d3_geo_pathCentroidPoint(x00 = x0 = x, y00 = y0 = y);
      };
      function nextPoint(x, y) {
        var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
        d3_geo_centroidX1 += z * (x0 + x) / 2;
        d3_geo_centroidY1 += z * (y0 + y) / 2;
        d3_geo_centroidZ1 += z;
        z = y0 * x - x0 * y;
        d3_geo_centroidX2 += z * (x0 + x);
        d3_geo_centroidY2 += z * (y0 + y);
        d3_geo_centroidZ2 += z * 3;
        d3_geo_pathCentroidPoint(x0 = x, y0 = y);
      }
      d3_geo_pathCentroid.lineEnd = function() {
        nextPoint(x00, y00);
      };
    }
    function d3_geo_pathContext(context) {
      var pointRadius = 4.5;
      var stream = {
        point,
        lineStart: function() {
          stream.point = pointLineStart;
        },
        lineEnd,
        polygonStart: function() {
          stream.lineEnd = lineEndPolygon;
        },
        polygonEnd: function() {
          stream.lineEnd = lineEnd;
          stream.point = point;
        },
        pointRadius: function(_) {
          pointRadius = _;
          return stream;
        },
        result: d3_noop
      };
      function point(x, y) {
        context.moveTo(x + pointRadius, y);
        context.arc(x, y, pointRadius, 0, τ);
      }
      function pointLineStart(x, y) {
        context.moveTo(x, y);
        stream.point = pointLine;
      }
      function pointLine(x, y) {
        context.lineTo(x, y);
      }
      function lineEnd() {
        stream.point = point;
      }
      function lineEndPolygon() {
        context.closePath();
      }
      return stream;
    }
    function d3_geo_resample(project) {
      var δ2 = 0.5, cosMinDistance = Math.cos(30 * d3_radians), maxDepth = 16;
      function resample(stream) {
        return (maxDepth ? resampleRecursive : resampleNone)(stream);
      }
      function resampleNone(stream) {
        return d3_geo_transformPoint(stream, function(x, y) {
          x = project(x, y);
          stream.point(x[0], x[1]);
        });
      }
      function resampleRecursive(stream) {
        var λ00, φ00, x00, y00, a00, b00, c00, λ0, x0, y0, a0, b0, c0;
        var resample2 = {
          point,
          lineStart,
          lineEnd,
          polygonStart: function() {
            stream.polygonStart();
            resample2.lineStart = ringStart;
          },
          polygonEnd: function() {
            stream.polygonEnd();
            resample2.lineStart = lineStart;
          }
        };
        function point(x, y) {
          x = project(x, y);
          stream.point(x[0], x[1]);
        }
        function lineStart() {
          x0 = NaN;
          resample2.point = linePoint;
          stream.lineStart();
        }
        function linePoint(λ, φ) {
          var c = d3_geo_cartesian([λ, φ]), p = project(λ, φ);
          resampleLineTo(x0, y0, λ0, a0, b0, c0, x0 = p[0], y0 = p[1], λ0 = λ, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
          stream.point(x0, y0);
        }
        function lineEnd() {
          resample2.point = point;
          stream.lineEnd();
        }
        function ringStart() {
          lineStart();
          resample2.point = ringPoint;
          resample2.lineEnd = ringEnd;
        }
        function ringPoint(λ, φ) {
          linePoint(λ00 = λ, φ00 = φ), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
          resample2.point = linePoint;
        }
        function ringEnd() {
          resampleLineTo(x0, y0, λ0, a0, b0, c0, x00, y00, λ00, a00, b00, c00, maxDepth, stream);
          resample2.lineEnd = lineEnd;
          lineEnd();
        }
        return resample2;
      }
      function resampleLineTo(x0, y0, λ0, a0, b0, c0, x1, y1, λ1, a1, b1, c1, depth, stream) {
        var dx = x1 - x0, dy = y1 - y0, d2 = dx * dx + dy * dy;
        if (d2 > 4 * δ2 && depth--) {
          var a = a0 + a1, b = b0 + b1, c = c0 + c1, m = Math.sqrt(a * a + b * b + c * c), φ2 = Math.asin(c /= m), λ2 = abs(abs(c) - 1) < ε || abs(λ0 - λ1) < ε ? (λ0 + λ1) / 2 : Math.atan2(b, a), p = project(λ2, φ2), x2 = p[0], y2 = p[1], dx2 = x2 - x0, dy2 = y2 - y0, dz = dy * dx2 - dx * dy2;
          if (dz * dz / d2 > δ2 || abs((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
            resampleLineTo(x0, y0, λ0, a0, b0, c0, x2, y2, λ2, a /= m, b /= m, c, depth, stream);
            stream.point(x2, y2);
            resampleLineTo(x2, y2, λ2, a, b, c, x1, y1, λ1, a1, b1, c1, depth, stream);
          }
        }
      }
      resample.precision = function(_) {
        if (!arguments.length)
          return Math.sqrt(δ2);
        maxDepth = (δ2 = _ * _) > 0 && 16;
        return resample;
      };
      return resample;
    }
    d3.geo.path = function() {
      var pointRadius = 4.5, projection, context, projectStream, contextStream, cacheStream;
      function path(object) {
        if (object) {
          if (typeof pointRadius === "function")
            contextStream.pointRadius(+pointRadius.apply(this, arguments));
          if (!cacheStream || !cacheStream.valid)
            cacheStream = projectStream(contextStream);
          d3.geo.stream(object, cacheStream);
        }
        return contextStream.result();
      }
      path.area = function(object) {
        d3_geo_pathAreaSum = 0;
        d3.geo.stream(object, projectStream(d3_geo_pathArea));
        return d3_geo_pathAreaSum;
      };
      path.centroid = function(object) {
        d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
        d3.geo.stream(object, projectStream(d3_geo_pathCentroid));
        return d3_geo_centroidZ2 ? [d3_geo_centroidX2 / d3_geo_centroidZ2, d3_geo_centroidY2 / d3_geo_centroidZ2] : d3_geo_centroidZ1 ? [d3_geo_centroidX1 / d3_geo_centroidZ1, d3_geo_centroidY1 / d3_geo_centroidZ1] : d3_geo_centroidZ0 ? [d3_geo_centroidX0 / d3_geo_centroidZ0, d3_geo_centroidY0 / d3_geo_centroidZ0] : [NaN, NaN];
      };
      path.bounds = function(object) {
        d3_geo_pathBoundsX1 = d3_geo_pathBoundsY1 = -(d3_geo_pathBoundsX0 = d3_geo_pathBoundsY0 = Infinity);
        d3.geo.stream(object, projectStream(d3_geo_pathBounds));
        return [[d3_geo_pathBoundsX0, d3_geo_pathBoundsY0], [d3_geo_pathBoundsX1, d3_geo_pathBoundsY1]];
      };
      path.projection = function(_) {
        if (!arguments.length)
          return projection;
        projectStream = (projection = _) ? _.stream || d3_geo_pathProjectStream(_) : d3_identity;
        return reset();
      };
      path.context = function(_) {
        if (!arguments.length)
          return context;
        contextStream = (context = _) == null ? new d3_geo_pathBuffer : new d3_geo_pathContext(_);
        if (typeof pointRadius !== "function")
          contextStream.pointRadius(pointRadius);
        return reset();
      };
      path.pointRadius = function(_) {
        if (!arguments.length)
          return pointRadius;
        pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
        return path;
      };
      function reset() {
        cacheStream = null;
        return path;
      }
      return path.projection(d3.geo.albersUsa()).context(null);
    };
    function d3_geo_pathProjectStream(project) {
      var resample = d3_geo_resample(function(x, y) {
        return project([x * d3_degrees, y * d3_degrees]);
      });
      return function(stream) {
        return d3_geo_projectionRadians(resample(stream));
      };
    }
    d3.geo.transform = function(methods) {
      return {
        stream: function(stream) {
          var transform = new d3_geo_transform(stream);
          for (var k in methods)
            transform[k] = methods[k];
          return transform;
        }
      };
    };
    function d3_geo_transform(stream) {
      this.stream = stream;
    }
    d3_geo_transform.prototype = {
      point: function(x, y) {
        this.stream.point(x, y);
      },
      sphere: function() {
        this.stream.sphere();
      },
      lineStart: function() {
        this.stream.lineStart();
      },
      lineEnd: function() {
        this.stream.lineEnd();
      },
      polygonStart: function() {
        this.stream.polygonStart();
      },
      polygonEnd: function() {
        this.stream.polygonEnd();
      }
    };
    function d3_geo_transformPoint(stream, point) {
      return {
        point,
        sphere: function() {
          stream.sphere();
        },
        lineStart: function() {
          stream.lineStart();
        },
        lineEnd: function() {
          stream.lineEnd();
        },
        polygonStart: function() {
          stream.polygonStart();
        },
        polygonEnd: function() {
          stream.polygonEnd();
        }
      };
    }
    d3.geo.projection = d3_geo_projection;
    d3.geo.projectionMutator = d3_geo_projectionMutator;
    function d3_geo_projection(project) {
      return d3_geo_projectionMutator(function() {
        return project;
      })();
    }
    function d3_geo_projectionMutator(projectAt) {
      var project, rotate, projectRotate, projectResample = d3_geo_resample(function(x2, y2) {
        x2 = project(x2, y2);
        return [x2[0] * k + δx, δy - x2[1] * k];
      }), k = 150, x = 480, y = 250, λ = 0, φ = 0, δ_ = 0, δ_2 = 0, δ_3 = 0, δx, δy, preclip = d3_geo_clipAntimeridian, postclip = d3_identity, clipAngle = null, clipExtent = null, stream;
      function projection(point) {
        point = projectRotate(point[0] * d3_radians, point[1] * d3_radians);
        return [point[0] * k + δx, δy - point[1] * k];
      }
      function invert(point) {
        point = projectRotate.invert((point[0] - δx) / k, (δy - point[1]) / k);
        return point && [point[0] * d3_degrees, point[1] * d3_degrees];
      }
      projection.stream = function(output) {
        if (stream)
          stream.valid = false;
        stream = d3_geo_projectionRadians(preclip(rotate, projectResample(postclip(output))));
        stream.valid = true;
        return stream;
      };
      projection.clipAngle = function(_) {
        if (!arguments.length)
          return clipAngle;
        preclip = _ == null ? (clipAngle = _, d3_geo_clipAntimeridian) : d3_geo_clipCircle((clipAngle = +_) * d3_radians);
        return invalidate();
      };
      projection.clipExtent = function(_) {
        if (!arguments.length)
          return clipExtent;
        clipExtent = _;
        postclip = _ ? d3_geo_clipExtent(_[0][0], _[0][1], _[1][0], _[1][1]) : d3_identity;
        return invalidate();
      };
      projection.scale = function(_) {
        if (!arguments.length)
          return k;
        k = +_;
        return reset();
      };
      projection.translate = function(_) {
        if (!arguments.length)
          return [x, y];
        x = +_[0];
        y = +_[1];
        return reset();
      };
      projection.center = function(_) {
        if (!arguments.length)
          return [λ * d3_degrees, φ * d3_degrees];
        λ = _[0] % 360 * d3_radians;
        φ = _[1] % 360 * d3_radians;
        return reset();
      };
      projection.rotate = function(_) {
        if (!arguments.length)
          return [δ_ * d3_degrees, δ_2 * d3_degrees, δ_3 * d3_degrees];
        δ_ = _[0] % 360 * d3_radians;
        δ_2 = _[1] % 360 * d3_radians;
        δ_3 = _.length > 2 ? _[2] % 360 * d3_radians : 0;
        return reset();
      };
      d3.rebind(projection, projectResample, "precision");
      function reset() {
        projectRotate = d3_geo_compose(rotate = d3_geo_rotation(δ_, δ_2, δ_3), project);
        var center = project(λ, φ);
        δx = x - center[0] * k;
        δy = y + center[1] * k;
        return invalidate();
      }
      function invalidate() {
        if (stream)
          stream.valid = false, stream = null;
        return projection;
      }
      return function() {
        project = projectAt.apply(this, arguments);
        projection.invert = project.invert && invert;
        return reset();
      };
    }
    function d3_geo_projectionRadians(stream) {
      return d3_geo_transformPoint(stream, function(x, y) {
        stream.point(x * d3_radians, y * d3_radians);
      });
    }
    function d3_geo_equirectangular(λ, φ) {
      return [λ, φ];
    }
    (d3.geo.equirectangular = function() {
      return d3_geo_projection(d3_geo_equirectangular);
    }).raw = d3_geo_equirectangular.invert = d3_geo_equirectangular;
    d3.geo.rotation = function(rotate) {
      rotate = d3_geo_rotation(rotate[0] % 360 * d3_radians, rotate[1] * d3_radians, rotate.length > 2 ? rotate[2] * d3_radians : 0);
      function forward(coordinates) {
        coordinates = rotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
        return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
      }
      forward.invert = function(coordinates) {
        coordinates = rotate.invert(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
        return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
      };
      return forward;
    };
    function d3_geo_identityRotation(λ, φ) {
      return [λ > π ? λ - τ : λ < -π ? λ + τ : λ, φ];
    }
    d3_geo_identityRotation.invert = d3_geo_equirectangular;
    function d3_geo_rotation(δ_, δ_2, δ_3) {
      return δ_ ? δ_2 || δ_3 ? d3_geo_compose(d3_geo_rotation_(δ_), d3_geo_rotation_2(δ_2, δ_3)) : d3_geo_rotation_(δ_) : δ_2 || δ_3 ? d3_geo_rotation_2(δ_2, δ_3) : d3_geo_identityRotation;
    }
    function d3_geo_forwardRotation_(δ_) {
      return function(λ, φ) {
        return λ += δ_, [λ > π ? λ - τ : λ < -π ? λ + τ : λ, φ];
      };
    }
    function d3_geo_rotation_(δ_) {
      var rotation = d3_geo_forwardRotation_(δ_);
      rotation.invert = d3_geo_forwardRotation_(-δ_);
      return rotation;
    }
    function d3_geo_rotation_2(δ_, δ_2) {
      var cos_ = Math.cos(δ_), sin_ = Math.sin(δ_), cos_2 = Math.cos(δ_2), sin_2 = Math.sin(δ_2);
      function rotation(λ, φ) {
        var cos_3 = Math.cos(φ), x = Math.cos(λ) * cos_3, y = Math.sin(λ) * cos_3, z = Math.sin(φ), k = z * cos_ + x * sin_;
        return [Math.atan2(y * cos_2 - k * sin_2, x * cos_ - z * sin_), d3_asin(k * cos_2 + y * sin_2)];
      }
      rotation.invert = function(λ, φ) {
        var cos_3 = Math.cos(φ), x = Math.cos(λ) * cos_3, y = Math.sin(λ) * cos_3, z = Math.sin(φ), k = z * cos_2 - y * sin_2;
        return [Math.atan2(y * cos_2 + z * sin_2, x * cos_ + k * sin_), d3_asin(k * cos_ - x * sin_)];
      };
      return rotation;
    }
    d3.geo.circle = function() {
      var origin = [0, 0], angle, precision = 6, interpolate;
      function circle() {
        var center = typeof origin === "function" ? origin.apply(this, arguments) : origin, rotate = d3_geo_rotation(-center[0] * d3_radians, -center[1] * d3_radians, 0).invert, ring = [];
        interpolate(null, null, 1, {
          point: function(x, y) {
            ring.push(x = rotate(x, y));
            x[0] *= d3_degrees, x[1] *= d3_degrees;
          }
        });
        return {
          type: "Polygon",
          coordinates: [ring]
        };
      }
      circle.origin = function(x) {
        if (!arguments.length)
          return origin;
        origin = x;
        return circle;
      };
      circle.angle = function(x) {
        if (!arguments.length)
          return angle;
        interpolate = d3_geo_circleInterpolate((angle = +x) * d3_radians, precision * d3_radians);
        return circle;
      };
      circle.precision = function(_) {
        if (!arguments.length)
          return precision;
        interpolate = d3_geo_circleInterpolate(angle * d3_radians, (precision = +_) * d3_radians);
        return circle;
      };
      return circle.angle(90);
    };
    function d3_geo_circleInterpolate(radius, precision) {
      var cr = Math.cos(radius), sr = Math.sin(radius);
      return function(from, to, direction, listener) {
        var step = direction * precision;
        if (from != null) {
          from = d3_geo_circleAngle(cr, from);
          to = d3_geo_circleAngle(cr, to);
          if (direction > 0 ? from < to : from > to)
            from += direction * τ;
        } else {
          from = radius + direction * τ;
          to = radius - 0.5 * step;
        }
        for (var point, t = from;direction > 0 ? t > to : t < to; t -= step) {
          listener.point((point = d3_geo_spherical([cr, -sr * Math.cos(t), -sr * Math.sin(t)]))[0], point[1]);
        }
      };
    }
    function d3_geo_circleAngle(cr, point) {
      var a = d3_geo_cartesian(point);
      a[0] -= cr;
      d3_geo_cartesianNormalize(a);
      var angle = d3_acos(-a[1]);
      return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI - ε) % (2 * Math.PI);
    }
    d3.geo.distance = function(a, b) {
      var Δ_ = (b[0] - a[0]) * d3_radians, φ0 = a[1] * d3_radians, φ1 = b[1] * d3_radians, sin_ = Math.sin(Δ_), cos_ = Math.cos(Δ_), sin_0 = Math.sin(φ0), cos_0 = Math.cos(φ0), sin_1 = Math.sin(φ1), cos_1 = Math.cos(φ1), t;
      return Math.atan2(Math.sqrt((t = cos_1 * sin_) * t + (t = cos_0 * sin_1 - sin_0 * cos_1 * cos_) * t), sin_0 * sin_1 + cos_0 * cos_1 * cos_);
    };
    d3.geo.graticule = function() {
      var x1, x0, X1, X0, y1, y0, Y1, Y0, dx = 10, dy = dx, DX = 90, DY = 360, x, y, X, Y, precision = 2.5;
      function graticule() {
        return {
          type: "MultiLineString",
          coordinates: lines()
        };
      }
      function lines() {
        return d3.range(Math.ceil(X0 / DX) * DX, X1, DX).map(X).concat(d3.range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y)).concat(d3.range(Math.ceil(x0 / dx) * dx, x1, dx).filter(function(x2) {
          return abs(x2 % DX) > ε;
        }).map(x)).concat(d3.range(Math.ceil(y0 / dy) * dy, y1, dy).filter(function(y2) {
          return abs(y2 % DY) > ε;
        }).map(y));
      }
      graticule.lines = function() {
        return lines().map(function(coordinates) {
          return {
            type: "LineString",
            coordinates
          };
        });
      };
      graticule.outline = function() {
        return {
          type: "Polygon",
          coordinates: [X(X0).concat(Y(Y1).slice(1), X(X1).reverse().slice(1), Y(Y0).reverse().slice(1))]
        };
      };
      graticule.extent = function(_) {
        if (!arguments.length)
          return graticule.minorExtent();
        return graticule.majorExtent(_).minorExtent(_);
      };
      graticule.majorExtent = function(_) {
        if (!arguments.length)
          return [[X0, Y0], [X1, Y1]];
        X0 = +_[0][0], X1 = +_[1][0];
        Y0 = +_[0][1], Y1 = +_[1][1];
        if (X0 > X1)
          _ = X0, X0 = X1, X1 = _;
        if (Y0 > Y1)
          _ = Y0, Y0 = Y1, Y1 = _;
        return graticule.precision(precision);
      };
      graticule.minorExtent = function(_) {
        if (!arguments.length)
          return [[x0, y0], [x1, y1]];
        x0 = +_[0][0], x1 = +_[1][0];
        y0 = +_[0][1], y1 = +_[1][1];
        if (x0 > x1)
          _ = x0, x0 = x1, x1 = _;
        if (y0 > y1)
          _ = y0, y0 = y1, y1 = _;
        return graticule.precision(precision);
      };
      graticule.step = function(_) {
        if (!arguments.length)
          return graticule.minorStep();
        return graticule.majorStep(_).minorStep(_);
      };
      graticule.majorStep = function(_) {
        if (!arguments.length)
          return [DX, DY];
        DX = +_[0], DY = +_[1];
        return graticule;
      };
      graticule.minorStep = function(_) {
        if (!arguments.length)
          return [dx, dy];
        dx = +_[0], dy = +_[1];
        return graticule;
      };
      graticule.precision = function(_) {
        if (!arguments.length)
          return precision;
        precision = +_;
        x = d3_geo_graticuleX(y0, y1, 90);
        y = d3_geo_graticuleY(x0, x1, precision);
        X = d3_geo_graticuleX(Y0, Y1, 90);
        Y = d3_geo_graticuleY(X0, X1, precision);
        return graticule;
      };
      return graticule.majorExtent([[-180, -90 + ε], [180, 90 - ε]]).minorExtent([[-180, -80 - ε], [180, 80 + ε]]);
    };
    function d3_geo_graticuleX(y0, y1, dy) {
      var y = d3.range(y0, y1 - ε, dy).concat(y1);
      return function(x) {
        return y.map(function(y2) {
          return [x, y2];
        });
      };
    }
    function d3_geo_graticuleY(x0, x1, dx) {
      var x = d3.range(x0, x1 - ε, dx).concat(x1);
      return function(y) {
        return x.map(function(x2) {
          return [x2, y];
        });
      };
    }
    function d3_source(d) {
      return d.source;
    }
    function d3_target(d) {
      return d.target;
    }
    d3.geo.greatArc = function() {
      var source = d3_source, source_, target = d3_target, target_;
      function greatArc() {
        return {
          type: "LineString",
          coordinates: [source_ || source.apply(this, arguments), target_ || target.apply(this, arguments)]
        };
      }
      greatArc.distance = function() {
        return d3.geo.distance(source_ || source.apply(this, arguments), target_ || target.apply(this, arguments));
      };
      greatArc.source = function(_) {
        if (!arguments.length)
          return source;
        source = _, source_ = typeof _ === "function" ? null : _;
        return greatArc;
      };
      greatArc.target = function(_) {
        if (!arguments.length)
          return target;
        target = _, target_ = typeof _ === "function" ? null : _;
        return greatArc;
      };
      greatArc.precision = function() {
        return arguments.length ? greatArc : 0;
      };
      return greatArc;
    };
    d3.geo.interpolate = function(source, target) {
      return d3_geo_interpolate(source[0] * d3_radians, source[1] * d3_radians, target[0] * d3_radians, target[1] * d3_radians);
    };
    function d3_geo_interpolate(x0, y0, x1, y1) {
      var cy0 = Math.cos(y0), sy0 = Math.sin(y0), cy1 = Math.cos(y1), sy1 = Math.sin(y1), kx0 = cy0 * Math.cos(x0), ky0 = cy0 * Math.sin(x0), kx1 = cy1 * Math.cos(x1), ky1 = cy1 * Math.sin(x1), d = 2 * Math.asin(Math.sqrt(d3_haversin(y1 - y0) + cy0 * cy1 * d3_haversin(x1 - x0))), k = 1 / Math.sin(d);
      var interpolate = d ? function(t) {
        var B = Math.sin(t *= d) * k, A = Math.sin(d - t) * k, x = A * kx0 + B * kx1, y = A * ky0 + B * ky1, z = A * sy0 + B * sy1;
        return [Math.atan2(y, x) * d3_degrees, Math.atan2(z, Math.sqrt(x * x + y * y)) * d3_degrees];
      } : function() {
        return [x0 * d3_degrees, y0 * d3_degrees];
      };
      interpolate.distance = d;
      return interpolate;
    }
    d3.geo.length = function(object) {
      d3_geo_lengthSum = 0;
      d3.geo.stream(object, d3_geo_length);
      return d3_geo_lengthSum;
    };
    var d3_geo_lengthSum;
    var d3_geo_length = {
      sphere: d3_noop,
      point: d3_noop,
      lineStart: d3_geo_lengthLineStart,
      lineEnd: d3_noop,
      polygonStart: d3_noop,
      polygonEnd: d3_noop
    };
    function d3_geo_lengthLineStart() {
      var λ0, sin_0, cos_0;
      d3_geo_length.point = function(λ, φ) {
        λ0 = λ * d3_radians, sin_0 = Math.sin(φ *= d3_radians), cos_0 = Math.cos(φ);
        d3_geo_length.point = nextPoint;
      };
      d3_geo_length.lineEnd = function() {
        d3_geo_length.point = d3_geo_length.lineEnd = d3_noop;
      };
      function nextPoint(λ, φ) {
        var sin_ = Math.sin(φ *= d3_radians), cos_ = Math.cos(φ), t = abs((λ *= d3_radians) - λ0), cos_2 = Math.cos(t);
        d3_geo_lengthSum += Math.atan2(Math.sqrt((t = cos_ * Math.sin(t)) * t + (t = cos_0 * sin_ - sin_0 * cos_ * cos_2) * t), sin_0 * sin_ + cos_0 * cos_ * cos_2);
        λ0 = λ, sin_0 = sin_, cos_0 = cos_;
      }
    }
    function d3_geo_azimuthal(scale, angle) {
      function azimuthal(λ, φ) {
        var cos_ = Math.cos(λ), cos_2 = Math.cos(φ), k = scale(cos_ * cos_2);
        return [k * cos_2 * Math.sin(λ), k * Math.sin(φ)];
      }
      azimuthal.invert = function(x, y) {
        var ρ3 = Math.sqrt(x * x + y * y), c = angle(ρ3), sinc = Math.sin(c), cosc = Math.cos(c);
        return [Math.atan2(x * sinc, ρ3 * cosc), Math.asin(ρ3 && y * sinc / ρ3)];
      };
      return azimuthal;
    }
    var d3_geo_azimuthalEqualArea = d3_geo_azimuthal(function(cos_cos_) {
      return Math.sqrt(2 / (1 + cos_cos_));
    }, function(ρ3) {
      return 2 * Math.asin(ρ3 / 2);
    });
    (d3.geo.azimuthalEqualArea = function() {
      return d3_geo_projection(d3_geo_azimuthalEqualArea);
    }).raw = d3_geo_azimuthalEqualArea;
    var d3_geo_azimuthalEquidistant = d3_geo_azimuthal(function(cos_cos_) {
      var c = Math.acos(cos_cos_);
      return c && c / Math.sin(c);
    }, d3_identity);
    (d3.geo.azimuthalEquidistant = function() {
      return d3_geo_projection(d3_geo_azimuthalEquidistant);
    }).raw = d3_geo_azimuthalEquidistant;
    function d3_geo_conicConformal(φ0, φ1) {
      var cos_0 = Math.cos(φ0), t = function(φ) {
        return Math.tan(π / 4 + φ / 2);
      }, n = φ0 === φ1 ? Math.sin(φ0) : Math.log(cos_0 / Math.cos(φ1)) / Math.log(t(φ1) / t(φ0)), F = cos_0 * Math.pow(t(φ0), n) / n;
      if (!n)
        return d3_geo_mercator;
      function forward(λ, φ) {
        if (F > 0) {
          if (φ < -half_ + ε)
            φ = -half_ + ε;
        } else {
          if (φ > half_ - ε)
            φ = half_ - ε;
        }
        var ρ3 = F / Math.pow(t(φ), n);
        return [ρ3 * Math.sin(n * λ), F - ρ3 * Math.cos(n * λ)];
      }
      forward.invert = function(x, y) {
        var ρ0_y = F - y, ρ3 = d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y);
        return [Math.atan2(x, ρ0_y) / n, 2 * Math.atan(Math.pow(F / ρ3, 1 / n)) - half_];
      };
      return forward;
    }
    (d3.geo.conicConformal = function() {
      return d3_geo_conic(d3_geo_conicConformal);
    }).raw = d3_geo_conicConformal;
    function d3_geo_conicEquidistant(φ0, φ1) {
      var cos_0 = Math.cos(φ0), n = φ0 === φ1 ? Math.sin(φ0) : (cos_0 - Math.cos(φ1)) / (φ1 - φ0), G = cos_0 / n + φ0;
      if (abs(n) < ε)
        return d3_geo_equirectangular;
      function forward(λ, φ) {
        var ρ3 = G - φ;
        return [ρ3 * Math.sin(n * λ), G - ρ3 * Math.cos(n * λ)];
      }
      forward.invert = function(x, y) {
        var ρ0_y = G - y;
        return [Math.atan2(x, ρ0_y) / n, G - d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y)];
      };
      return forward;
    }
    (d3.geo.conicEquidistant = function() {
      return d3_geo_conic(d3_geo_conicEquidistant);
    }).raw = d3_geo_conicEquidistant;
    var d3_geo_gnomonic = d3_geo_azimuthal(function(cos_cos_) {
      return 1 / cos_cos_;
    }, Math.atan);
    (d3.geo.gnomonic = function() {
      return d3_geo_projection(d3_geo_gnomonic);
    }).raw = d3_geo_gnomonic;
    function d3_geo_mercator(λ, φ) {
      return [λ, Math.log(Math.tan(π / 4 + φ / 2))];
    }
    d3_geo_mercator.invert = function(x, y) {
      return [x, 2 * Math.atan(Math.exp(y)) - half_];
    };
    function d3_geo_mercatorProjection(project) {
      var m = d3_geo_projection(project), scale = m.scale, translate = m.translate, clipExtent = m.clipExtent, clipAuto;
      m.scale = function() {
        var v = scale.apply(m, arguments);
        return v === m ? clipAuto ? m.clipExtent(null) : m : v;
      };
      m.translate = function() {
        var v = translate.apply(m, arguments);
        return v === m ? clipAuto ? m.clipExtent(null) : m : v;
      };
      m.clipExtent = function(_) {
        var v = clipExtent.apply(m, arguments);
        if (v === m) {
          if (clipAuto = _ == null) {
            var k = π * scale(), t = translate();
            clipExtent([[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]]);
          }
        } else if (clipAuto) {
          v = null;
        }
        return v;
      };
      return m.clipExtent(null);
    }
    (d3.geo.mercator = function() {
      return d3_geo_mercatorProjection(d3_geo_mercator);
    }).raw = d3_geo_mercator;
    var d3_geo_orthographic = d3_geo_azimuthal(function() {
      return 1;
    }, Math.asin);
    (d3.geo.orthographic = function() {
      return d3_geo_projection(d3_geo_orthographic);
    }).raw = d3_geo_orthographic;
    var d3_geo_stereographic = d3_geo_azimuthal(function(cos_cos_) {
      return 1 / (1 + cos_cos_);
    }, function(ρ3) {
      return 2 * Math.atan(ρ3);
    });
    (d3.geo.stereographic = function() {
      return d3_geo_projection(d3_geo_stereographic);
    }).raw = d3_geo_stereographic;
    function d3_geo_transverseMercator(λ, φ) {
      return [Math.log(Math.tan(π / 4 + φ / 2)), -λ];
    }
    d3_geo_transverseMercator.invert = function(x, y) {
      return [-y, 2 * Math.atan(Math.exp(x)) - half_];
    };
    (d3.geo.transverseMercator = function() {
      var projection = d3_geo_mercatorProjection(d3_geo_transverseMercator), center = projection.center, rotate = projection.rotate;
      projection.center = function(_) {
        return _ ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
      };
      projection.rotate = function(_) {
        return _ ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
      };
      return rotate([0, 0, 90]);
    }).raw = d3_geo_transverseMercator;
    d3.geom = {};
    function d3_geom_pointX(d) {
      return d[0];
    }
    function d3_geom_pointY(d) {
      return d[1];
    }
    d3.geom.hull = function(vertices) {
      var x = d3_geom_pointX, y = d3_geom_pointY;
      if (arguments.length)
        return hull(vertices);
      function hull(data) {
        if (data.length < 3)
          return [];
        var fx = d3_functor(x), fy = d3_functor(y), i, n = data.length, points = [], flippedPoints = [];
        for (i = 0;i < n; i++) {
          points.push([+fx.call(this, data[i], i), +fy.call(this, data[i], i), i]);
        }
        points.sort(d3_geom_hullOrder);
        for (i = 0;i < n; i++)
          flippedPoints.push([points[i][0], -points[i][1]]);
        var upper = d3_geom_hullUpper(points), lower = d3_geom_hullUpper(flippedPoints);
        var skipLeft = lower[0] === upper[0], skipRight = lower[lower.length - 1] === upper[upper.length - 1], polygon = [];
        for (i = upper.length - 1;i >= 0; --i)
          polygon.push(data[points[upper[i]][2]]);
        for (i = +skipLeft;i < lower.length - skipRight; ++i)
          polygon.push(data[points[lower[i]][2]]);
        return polygon;
      }
      hull.x = function(_) {
        return arguments.length ? (x = _, hull) : x;
      };
      hull.y = function(_) {
        return arguments.length ? (y = _, hull) : y;
      };
      return hull;
    };
    function d3_geom_hullUpper(points) {
      var n = points.length, hull = [0, 1], hs = 2;
      for (var i = 2;i < n; i++) {
        while (hs > 1 && d3_cross2d(points[hull[hs - 2]], points[hull[hs - 1]], points[i]) <= 0)
          --hs;
        hull[hs++] = i;
      }
      return hull.slice(0, hs);
    }
    function d3_geom_hullOrder(a, b) {
      return a[0] - b[0] || a[1] - b[1];
    }
    d3.geom.polygon = function(coordinates) {
      d3_subclass(coordinates, d3_geom_polygonPrototype);
      return coordinates;
    };
    var d3_geom_polygonPrototype = d3.geom.polygon.prototype = [];
    d3_geom_polygonPrototype.area = function() {
      var i = -1, n = this.length, a, b = this[n - 1], area = 0;
      while (++i < n) {
        a = b;
        b = this[i];
        area += a[1] * b[0] - a[0] * b[1];
      }
      return area * 0.5;
    };
    d3_geom_polygonPrototype.centroid = function(k) {
      var i = -1, n = this.length, x = 0, y = 0, a, b = this[n - 1], c;
      if (!arguments.length)
        k = -1 / (6 * this.area());
      while (++i < n) {
        a = b;
        b = this[i];
        c = a[0] * b[1] - b[0] * a[1];
        x += (a[0] + b[0]) * c;
        y += (a[1] + b[1]) * c;
      }
      return [x * k, y * k];
    };
    d3_geom_polygonPrototype.clip = function(subject) {
      var input, closed = d3_geom_polygonClosed(subject), i = -1, n = this.length - d3_geom_polygonClosed(this), j, m, a = this[n - 1], b, c, d;
      while (++i < n) {
        input = subject.slice();
        subject.length = 0;
        b = this[i];
        c = input[(m = input.length - closed) - 1];
        j = -1;
        while (++j < m) {
          d = input[j];
          if (d3_geom_polygonInside(d, a, b)) {
            if (!d3_geom_polygonInside(c, a, b)) {
              subject.push(d3_geom_polygonIntersect(c, d, a, b));
            }
            subject.push(d);
          } else if (d3_geom_polygonInside(c, a, b)) {
            subject.push(d3_geom_polygonIntersect(c, d, a, b));
          }
          c = d;
        }
        if (closed)
          subject.push(subject[0]);
        a = b;
      }
      return subject;
    };
    function d3_geom_polygonInside(p, a, b) {
      return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
    }
    function d3_geom_polygonIntersect(c, d, a, b) {
      var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3, y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3, ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
      return [x1 + ua * x21, y1 + ua * y21];
    }
    function d3_geom_polygonClosed(coordinates) {
      var a = coordinates[0], b = coordinates[coordinates.length - 1];
      return !(a[0] - b[0] || a[1] - b[1]);
    }
    var d3_geom_voronoiEdges, d3_geom_voronoiCells, d3_geom_voronoiBeaches, d3_geom_voronoiBeachPool = [], d3_geom_voronoiFirstCircle, d3_geom_voronoiCircles, d3_geom_voronoiCirclePool = [];
    function d3_geom_voronoiBeach() {
      d3_geom_voronoiRedBlackNode(this);
      this.edge = this.site = this.circle = null;
    }
    function d3_geom_voronoiCreateBeach(site) {
      var beach = d3_geom_voronoiBeachPool.pop() || new d3_geom_voronoiBeach;
      beach.site = site;
      return beach;
    }
    function d3_geom_voronoiDetachBeach(beach) {
      d3_geom_voronoiDetachCircle(beach);
      d3_geom_voronoiBeaches.remove(beach);
      d3_geom_voronoiBeachPool.push(beach);
      d3_geom_voronoiRedBlackNode(beach);
    }
    function d3_geom_voronoiRemoveBeach(beach) {
      var circle = beach.circle, x = circle.x, y = circle.cy, vertex = {
        x,
        y
      }, previous = beach.P, next = beach.N, disappearing = [beach];
      d3_geom_voronoiDetachBeach(beach);
      var lArc = previous;
      while (lArc.circle && abs(x - lArc.circle.x) < ε && abs(y - lArc.circle.cy) < ε) {
        previous = lArc.P;
        disappearing.unshift(lArc);
        d3_geom_voronoiDetachBeach(lArc);
        lArc = previous;
      }
      disappearing.unshift(lArc);
      d3_geom_voronoiDetachCircle(lArc);
      var rArc = next;
      while (rArc.circle && abs(x - rArc.circle.x) < ε && abs(y - rArc.circle.cy) < ε) {
        next = rArc.N;
        disappearing.push(rArc);
        d3_geom_voronoiDetachBeach(rArc);
        rArc = next;
      }
      disappearing.push(rArc);
      d3_geom_voronoiDetachCircle(rArc);
      var nArcs = disappearing.length, iArc;
      for (iArc = 1;iArc < nArcs; ++iArc) {
        rArc = disappearing[iArc];
        lArc = disappearing[iArc - 1];
        d3_geom_voronoiSetEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
      }
      lArc = disappearing[0];
      rArc = disappearing[nArcs - 1];
      rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, rArc.site, null, vertex);
      d3_geom_voronoiAttachCircle(lArc);
      d3_geom_voronoiAttachCircle(rArc);
    }
    function d3_geom_voronoiAddBeach(site) {
      var { x, y: directrix } = site, lArc, rArc, dxl, dxr, node = d3_geom_voronoiBeaches._;
      while (node) {
        dxl = d3_geom_voronoiLeftBreakPoint(node, directrix) - x;
        if (dxl > ε)
          node = node.L;
        else {
          dxr = x - d3_geom_voronoiRightBreakPoint(node, directrix);
          if (dxr > ε) {
            if (!node.R) {
              lArc = node;
              break;
            }
            node = node.R;
          } else {
            if (dxl > -ε) {
              lArc = node.P;
              rArc = node;
            } else if (dxr > -ε) {
              lArc = node;
              rArc = node.N;
            } else {
              lArc = rArc = node;
            }
            break;
          }
        }
      }
      var newArc = d3_geom_voronoiCreateBeach(site);
      d3_geom_voronoiBeaches.insert(lArc, newArc);
      if (!lArc && !rArc)
        return;
      if (lArc === rArc) {
        d3_geom_voronoiDetachCircle(lArc);
        rArc = d3_geom_voronoiCreateBeach(lArc.site);
        d3_geom_voronoiBeaches.insert(newArc, rArc);
        newArc.edge = rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
        d3_geom_voronoiAttachCircle(lArc);
        d3_geom_voronoiAttachCircle(rArc);
        return;
      }
      if (!rArc) {
        newArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
        return;
      }
      d3_geom_voronoiDetachCircle(lArc);
      d3_geom_voronoiDetachCircle(rArc);
      var lSite = lArc.site, ax = lSite.x, ay = lSite.y, bx = site.x - ax, by = site.y - ay, rSite = rArc.site, cx = rSite.x - ax, cy = rSite.y - ay, d = 2 * (bx * cy - by * cx), hb = bx * bx + by * by, hc = cx * cx + cy * cy, vertex = {
        x: (cy * hb - by * hc) / d + ax,
        y: (bx * hc - cx * hb) / d + ay
      };
      d3_geom_voronoiSetEdgeEnd(rArc.edge, lSite, rSite, vertex);
      newArc.edge = d3_geom_voronoiCreateEdge(lSite, site, null, vertex);
      rArc.edge = d3_geom_voronoiCreateEdge(site, rSite, null, vertex);
      d3_geom_voronoiAttachCircle(lArc);
      d3_geom_voronoiAttachCircle(rArc);
    }
    function d3_geom_voronoiLeftBreakPoint(arc, directrix) {
      var site = arc.site, rfocx = site.x, rfocy = site.y, pby2 = rfocy - directrix;
      if (!pby2)
        return rfocx;
      var lArc = arc.P;
      if (!lArc)
        return -Infinity;
      site = lArc.site;
      var { x: lfocx, y: lfocy } = site, plby2 = lfocy - directrix;
      if (!plby2)
        return lfocx;
      var hl = lfocx - rfocx, aby2 = 1 / pby2 - 1 / plby2, b = hl / plby2;
      if (aby2)
        return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;
      return (rfocx + lfocx) / 2;
    }
    function d3_geom_voronoiRightBreakPoint(arc, directrix) {
      var rArc = arc.N;
      if (rArc)
        return d3_geom_voronoiLeftBreakPoint(rArc, directrix);
      var site = arc.site;
      return site.y === directrix ? site.x : Infinity;
    }
    function d3_geom_voronoiCell(site) {
      this.site = site;
      this.edges = [];
    }
    d3_geom_voronoiCell.prototype.prepare = function() {
      var halfEdges = this.edges, iHalfEdge = halfEdges.length, edge;
      while (iHalfEdge--) {
        edge = halfEdges[iHalfEdge].edge;
        if (!edge.b || !edge.a)
          halfEdges.splice(iHalfEdge, 1);
      }
      halfEdges.sort(d3_geom_voronoiHalfEdgeOrder);
      return halfEdges.length;
    };
    function d3_geom_voronoiCloseCells(extent) {
      var x0 = extent[0][0], x1 = extent[1][0], y0 = extent[0][1], y1 = extent[1][1], x2, y2, x3, y3, cells = d3_geom_voronoiCells, iCell = cells.length, cell, iHalfEdge, halfEdges, nHalfEdges, start, end;
      while (iCell--) {
        cell = cells[iCell];
        if (!cell || !cell.prepare())
          continue;
        halfEdges = cell.edges;
        nHalfEdges = halfEdges.length;
        iHalfEdge = 0;
        while (iHalfEdge < nHalfEdges) {
          end = halfEdges[iHalfEdge].end(), x3 = end.x, y3 = end.y;
          start = halfEdges[++iHalfEdge % nHalfEdges].start(), x2 = start.x, y2 = start.y;
          if (abs(x3 - x2) > ε || abs(y3 - y2) > ε) {
            halfEdges.splice(iHalfEdge, 0, new d3_geom_voronoiHalfEdge(d3_geom_voronoiCreateBorderEdge(cell.site, end, abs(x3 - x0) < ε && y1 - y3 > ε ? {
              x: x0,
              y: abs(x2 - x0) < ε ? y2 : y1
            } : abs(y3 - y1) < ε && x1 - x3 > ε ? {
              x: abs(y2 - y1) < ε ? x2 : x1,
              y: y1
            } : abs(x3 - x1) < ε && y3 - y0 > ε ? {
              x: x1,
              y: abs(x2 - x1) < ε ? y2 : y0
            } : abs(y3 - y0) < ε && x3 - x0 > ε ? {
              x: abs(y2 - y0) < ε ? x2 : x0,
              y: y0
            } : null), cell.site, null));
            ++nHalfEdges;
          }
        }
      }
    }
    function d3_geom_voronoiHalfEdgeOrder(a, b) {
      return b.angle - a.angle;
    }
    function d3_geom_voronoiCircle() {
      d3_geom_voronoiRedBlackNode(this);
      this.x = this.y = this.arc = this.site = this.cy = null;
    }
    function d3_geom_voronoiAttachCircle(arc) {
      var { P: lArc, N: rArc } = arc;
      if (!lArc || !rArc)
        return;
      var lSite = lArc.site, cSite = arc.site, rSite = rArc.site;
      if (lSite === rSite)
        return;
      var { x: bx, y: by } = cSite, ax = lSite.x - bx, ay = lSite.y - by, cx = rSite.x - bx, cy = rSite.y - by;
      var d = 2 * (ax * cy - ay * cx);
      if (d >= -ε2)
        return;
      var ha = ax * ax + ay * ay, hc = cx * cx + cy * cy, x = (cy * ha - ay * hc) / d, y = (ax * hc - cx * ha) / d, cy = y + by;
      var circle = d3_geom_voronoiCirclePool.pop() || new d3_geom_voronoiCircle;
      circle.arc = arc;
      circle.site = cSite;
      circle.x = x + bx;
      circle.y = cy + Math.sqrt(x * x + y * y);
      circle.cy = cy;
      arc.circle = circle;
      var before = null, node = d3_geom_voronoiCircles._;
      while (node) {
        if (circle.y < node.y || circle.y === node.y && circle.x <= node.x) {
          if (node.L)
            node = node.L;
          else {
            before = node.P;
            break;
          }
        } else {
          if (node.R)
            node = node.R;
          else {
            before = node;
            break;
          }
        }
      }
      d3_geom_voronoiCircles.insert(before, circle);
      if (!before)
        d3_geom_voronoiFirstCircle = circle;
    }
    function d3_geom_voronoiDetachCircle(arc) {
      var circle = arc.circle;
      if (circle) {
        if (!circle.P)
          d3_geom_voronoiFirstCircle = circle.N;
        d3_geom_voronoiCircles.remove(circle);
        d3_geom_voronoiCirclePool.push(circle);
        d3_geom_voronoiRedBlackNode(circle);
        arc.circle = null;
      }
    }
    function d3_geom_voronoiClipEdges(extent) {
      var edges = d3_geom_voronoiEdges, clip = d3_geom_clipLine(extent[0][0], extent[0][1], extent[1][0], extent[1][1]), i = edges.length, e;
      while (i--) {
        e = edges[i];
        if (!d3_geom_voronoiConnectEdge(e, extent) || !clip(e) || abs(e.a.x - e.b.x) < ε && abs(e.a.y - e.b.y) < ε) {
          e.a = e.b = null;
          edges.splice(i, 1);
        }
      }
    }
    function d3_geom_voronoiConnectEdge(edge, extent) {
      var vb = edge.b;
      if (vb)
        return true;
      var va = edge.a, x0 = extent[0][0], x1 = extent[1][0], y0 = extent[0][1], y1 = extent[1][1], lSite = edge.l, rSite = edge.r, lx = lSite.x, ly = lSite.y, rx = rSite.x, ry = rSite.y, fx = (lx + rx) / 2, fy = (ly + ry) / 2, fm, fb;
      if (ry === ly) {
        if (fx < x0 || fx >= x1)
          return;
        if (lx > rx) {
          if (!va)
            va = {
              x: fx,
              y: y0
            };
          else if (va.y >= y1)
            return;
          vb = {
            x: fx,
            y: y1
          };
        } else {
          if (!va)
            va = {
              x: fx,
              y: y1
            };
          else if (va.y < y0)
            return;
          vb = {
            x: fx,
            y: y0
          };
        }
      } else {
        fm = (lx - rx) / (ry - ly);
        fb = fy - fm * fx;
        if (fm < -1 || fm > 1) {
          if (lx > rx) {
            if (!va)
              va = {
                x: (y0 - fb) / fm,
                y: y0
              };
            else if (va.y >= y1)
              return;
            vb = {
              x: (y1 - fb) / fm,
              y: y1
            };
          } else {
            if (!va)
              va = {
                x: (y1 - fb) / fm,
                y: y1
              };
            else if (va.y < y0)
              return;
            vb = {
              x: (y0 - fb) / fm,
              y: y0
            };
          }
        } else {
          if (ly < ry) {
            if (!va)
              va = {
                x: x0,
                y: fm * x0 + fb
              };
            else if (va.x >= x1)
              return;
            vb = {
              x: x1,
              y: fm * x1 + fb
            };
          } else {
            if (!va)
              va = {
                x: x1,
                y: fm * x1 + fb
              };
            else if (va.x < x0)
              return;
            vb = {
              x: x0,
              y: fm * x0 + fb
            };
          }
        }
      }
      edge.a = va;
      edge.b = vb;
      return true;
    }
    function d3_geom_voronoiEdge(lSite, rSite) {
      this.l = lSite;
      this.r = rSite;
      this.a = this.b = null;
    }
    function d3_geom_voronoiCreateEdge(lSite, rSite, va, vb) {
      var edge = new d3_geom_voronoiEdge(lSite, rSite);
      d3_geom_voronoiEdges.push(edge);
      if (va)
        d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, va);
      if (vb)
        d3_geom_voronoiSetEdgeEnd(edge, rSite, lSite, vb);
      d3_geom_voronoiCells[lSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, lSite, rSite));
      d3_geom_voronoiCells[rSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, rSite, lSite));
      return edge;
    }
    function d3_geom_voronoiCreateBorderEdge(lSite, va, vb) {
      var edge = new d3_geom_voronoiEdge(lSite, null);
      edge.a = va;
      edge.b = vb;
      d3_geom_voronoiEdges.push(edge);
      return edge;
    }
    function d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, vertex) {
      if (!edge.a && !edge.b) {
        edge.a = vertex;
        edge.l = lSite;
        edge.r = rSite;
      } else if (edge.l === rSite) {
        edge.b = vertex;
      } else {
        edge.a = vertex;
      }
    }
    function d3_geom_voronoiHalfEdge(edge, lSite, rSite) {
      var { a: va, b: vb } = edge;
      this.edge = edge;
      this.site = lSite;
      this.angle = rSite ? Math.atan2(rSite.y - lSite.y, rSite.x - lSite.x) : edge.l === lSite ? Math.atan2(vb.x - va.x, va.y - vb.y) : Math.atan2(va.x - vb.x, vb.y - va.y);
    }
    d3_geom_voronoiHalfEdge.prototype = {
      start: function() {
        return this.edge.l === this.site ? this.edge.a : this.edge.b;
      },
      end: function() {
        return this.edge.l === this.site ? this.edge.b : this.edge.a;
      }
    };
    function d3_geom_voronoiRedBlackTree() {
      this._ = null;
    }
    function d3_geom_voronoiRedBlackNode(node) {
      node.U = node.C = node.L = node.R = node.P = node.N = null;
    }
    d3_geom_voronoiRedBlackTree.prototype = {
      insert: function(after, node) {
        var parent, grandpa, uncle;
        if (after) {
          node.P = after;
          node.N = after.N;
          if (after.N)
            after.N.P = node;
          after.N = node;
          if (after.R) {
            after = after.R;
            while (after.L)
              after = after.L;
            after.L = node;
          } else {
            after.R = node;
          }
          parent = after;
        } else if (this._) {
          after = d3_geom_voronoiRedBlackFirst(this._);
          node.P = null;
          node.N = after;
          after.P = after.L = node;
          parent = after;
        } else {
          node.P = node.N = null;
          this._ = node;
          parent = null;
        }
        node.L = node.R = null;
        node.U = parent;
        node.C = true;
        after = node;
        while (parent && parent.C) {
          grandpa = parent.U;
          if (parent === grandpa.L) {
            uncle = grandpa.R;
            if (uncle && uncle.C) {
              parent.C = uncle.C = false;
              grandpa.C = true;
              after = grandpa;
            } else {
              if (after === parent.R) {
                d3_geom_voronoiRedBlackRotateLeft(this, parent);
                after = parent;
                parent = after.U;
              }
              parent.C = false;
              grandpa.C = true;
              d3_geom_voronoiRedBlackRotateRight(this, grandpa);
            }
          } else {
            uncle = grandpa.L;
            if (uncle && uncle.C) {
              parent.C = uncle.C = false;
              grandpa.C = true;
              after = grandpa;
            } else {
              if (after === parent.L) {
                d3_geom_voronoiRedBlackRotateRight(this, parent);
                after = parent;
                parent = after.U;
              }
              parent.C = false;
              grandpa.C = true;
              d3_geom_voronoiRedBlackRotateLeft(this, grandpa);
            }
          }
          parent = after.U;
        }
        this._.C = false;
      },
      remove: function(node) {
        if (node.N)
          node.N.P = node.P;
        if (node.P)
          node.P.N = node.N;
        node.N = node.P = null;
        var parent = node.U, sibling, left = node.L, right = node.R, next, red;
        if (!left)
          next = right;
        else if (!right)
          next = left;
        else
          next = d3_geom_voronoiRedBlackFirst(right);
        if (parent) {
          if (parent.L === node)
            parent.L = next;
          else
            parent.R = next;
        } else {
          this._ = next;
        }
        if (left && right) {
          red = next.C;
          next.C = node.C;
          next.L = left;
          left.U = next;
          if (next !== right) {
            parent = next.U;
            next.U = node.U;
            node = next.R;
            parent.L = node;
            next.R = right;
            right.U = next;
          } else {
            next.U = parent;
            parent = next;
            node = next.R;
          }
        } else {
          red = node.C;
          node = next;
        }
        if (node)
          node.U = parent;
        if (red)
          return;
        if (node && node.C) {
          node.C = false;
          return;
        }
        do {
          if (node === this._)
            break;
          if (node === parent.L) {
            sibling = parent.R;
            if (sibling.C) {
              sibling.C = false;
              parent.C = true;
              d3_geom_voronoiRedBlackRotateLeft(this, parent);
              sibling = parent.R;
            }
            if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
              if (!sibling.R || !sibling.R.C) {
                sibling.L.C = false;
                sibling.C = true;
                d3_geom_voronoiRedBlackRotateRight(this, sibling);
                sibling = parent.R;
              }
              sibling.C = parent.C;
              parent.C = sibling.R.C = false;
              d3_geom_voronoiRedBlackRotateLeft(this, parent);
              node = this._;
              break;
            }
          } else {
            sibling = parent.L;
            if (sibling.C) {
              sibling.C = false;
              parent.C = true;
              d3_geom_voronoiRedBlackRotateRight(this, parent);
              sibling = parent.L;
            }
            if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
              if (!sibling.L || !sibling.L.C) {
                sibling.R.C = false;
                sibling.C = true;
                d3_geom_voronoiRedBlackRotateLeft(this, sibling);
                sibling = parent.L;
              }
              sibling.C = parent.C;
              parent.C = sibling.L.C = false;
              d3_geom_voronoiRedBlackRotateRight(this, parent);
              node = this._;
              break;
            }
          }
          sibling.C = true;
          node = parent;
          parent = parent.U;
        } while (!node.C);
        if (node)
          node.C = false;
      }
    };
    function d3_geom_voronoiRedBlackRotateLeft(tree, node) {
      var p = node, q = node.R, parent = p.U;
      if (parent) {
        if (parent.L === p)
          parent.L = q;
        else
          parent.R = q;
      } else {
        tree._ = q;
      }
      q.U = parent;
      p.U = q;
      p.R = q.L;
      if (p.R)
        p.R.U = p;
      q.L = p;
    }
    function d3_geom_voronoiRedBlackRotateRight(tree, node) {
      var p = node, q = node.L, parent = p.U;
      if (parent) {
        if (parent.L === p)
          parent.L = q;
        else
          parent.R = q;
      } else {
        tree._ = q;
      }
      q.U = parent;
      p.U = q;
      p.L = q.R;
      if (p.L)
        p.L.U = p;
      q.R = p;
    }
    function d3_geom_voronoiRedBlackFirst(node) {
      while (node.L)
        node = node.L;
      return node;
    }
    function d3_geom_voronoi(sites, bbox) {
      var site = sites.sort(d3_geom_voronoiVertexOrder).pop(), x0, y0, circle;
      d3_geom_voronoiEdges = [];
      d3_geom_voronoiCells = new Array(sites.length);
      d3_geom_voronoiBeaches = new d3_geom_voronoiRedBlackTree;
      d3_geom_voronoiCircles = new d3_geom_voronoiRedBlackTree;
      while (true) {
        circle = d3_geom_voronoiFirstCircle;
        if (site && (!circle || site.y < circle.y || site.y === circle.y && site.x < circle.x)) {
          if (site.x !== x0 || site.y !== y0) {
            d3_geom_voronoiCells[site.i] = new d3_geom_voronoiCell(site);
            d3_geom_voronoiAddBeach(site);
            x0 = site.x, y0 = site.y;
          }
          site = sites.pop();
        } else if (circle) {
          d3_geom_voronoiRemoveBeach(circle.arc);
        } else {
          break;
        }
      }
      if (bbox)
        d3_geom_voronoiClipEdges(bbox), d3_geom_voronoiCloseCells(bbox);
      var diagram = {
        cells: d3_geom_voronoiCells,
        edges: d3_geom_voronoiEdges
      };
      d3_geom_voronoiBeaches = d3_geom_voronoiCircles = d3_geom_voronoiEdges = d3_geom_voronoiCells = null;
      return diagram;
    }
    function d3_geom_voronoiVertexOrder(a, b) {
      return b.y - a.y || b.x - a.x;
    }
    d3.geom.voronoi = function(points) {
      var x = d3_geom_pointX, y = d3_geom_pointY, fx = x, fy = y, clipExtent = d3_geom_voronoiClipExtent;
      if (points)
        return voronoi(points);
      function voronoi(data) {
        var polygons = new Array(data.length), x0 = clipExtent[0][0], y0 = clipExtent[0][1], x1 = clipExtent[1][0], y1 = clipExtent[1][1];
        d3_geom_voronoi(sites(data), clipExtent).cells.forEach(function(cell, i) {
          var { edges, site } = cell, polygon = polygons[i] = edges.length ? edges.map(function(e) {
            var s = e.start();
            return [s.x, s.y];
          }) : site.x >= x0 && site.x <= x1 && site.y >= y0 && site.y <= y1 ? [[x0, y1], [x1, y1], [x1, y0], [x0, y0]] : [];
          polygon.point = data[i];
        });
        return polygons;
      }
      function sites(data) {
        return data.map(function(d, i) {
          return {
            x: Math.round(fx(d, i) / ε) * ε,
            y: Math.round(fy(d, i) / ε) * ε,
            i
          };
        });
      }
      voronoi.links = function(data) {
        return d3_geom_voronoi(sites(data)).edges.filter(function(edge) {
          return edge.l && edge.r;
        }).map(function(edge) {
          return {
            source: data[edge.l.i],
            target: data[edge.r.i]
          };
        });
      };
      voronoi.triangles = function(data) {
        var triangles = [];
        d3_geom_voronoi(sites(data)).cells.forEach(function(cell, i) {
          var site = cell.site, edges = cell.edges.sort(d3_geom_voronoiHalfEdgeOrder), j = -1, m = edges.length, e0, s0, e1 = edges[m - 1].edge, s1 = e1.l === site ? e1.r : e1.l;
          while (++j < m) {
            e0 = e1;
            s0 = s1;
            e1 = edges[j].edge;
            s1 = e1.l === site ? e1.r : e1.l;
            if (i < s0.i && i < s1.i && d3_geom_voronoiTriangleArea(site, s0, s1) < 0) {
              triangles.push([data[i], data[s0.i], data[s1.i]]);
            }
          }
        });
        return triangles;
      };
      voronoi.x = function(_) {
        return arguments.length ? (fx = d3_functor(x = _), voronoi) : x;
      };
      voronoi.y = function(_) {
        return arguments.length ? (fy = d3_functor(y = _), voronoi) : y;
      };
      voronoi.clipExtent = function(_) {
        if (!arguments.length)
          return clipExtent === d3_geom_voronoiClipExtent ? null : clipExtent;
        clipExtent = _ == null ? d3_geom_voronoiClipExtent : _;
        return voronoi;
      };
      voronoi.size = function(_) {
        if (!arguments.length)
          return clipExtent === d3_geom_voronoiClipExtent ? null : clipExtent && clipExtent[1];
        return voronoi.clipExtent(_ && [[0, 0], _]);
      };
      return voronoi;
    };
    var d3_geom_voronoiClipExtent = [[-1e6, -1e6], [1e6, 1e6]];
    function d3_geom_voronoiTriangleArea(a, b, c) {
      return (a.x - c.x) * (b.y - a.y) - (a.x - b.x) * (c.y - a.y);
    }
    d3.geom.delaunay = function(vertices) {
      return d3.geom.voronoi().triangles(vertices);
    };
    d3.geom.quadtree = function(points, x1, y1, x2, y2) {
      var x = d3_geom_pointX, y = d3_geom_pointY, compat;
      if (compat = arguments.length) {
        x = d3_geom_quadtreeCompatX;
        y = d3_geom_quadtreeCompatY;
        if (compat === 3) {
          y2 = y1;
          x2 = x1;
          y1 = x1 = 0;
        }
        return quadtree(points);
      }
      function quadtree(data) {
        var d, fx = d3_functor(x), fy = d3_functor(y), xs, ys, i, n, x1_, y1_, x2_, y2_;
        if (x1 != null) {
          x1_ = x1, y1_ = y1, x2_ = x2, y2_ = y2;
        } else {
          x2_ = y2_ = -(x1_ = y1_ = Infinity);
          xs = [], ys = [];
          n = data.length;
          if (compat)
            for (i = 0;i < n; ++i) {
              d = data[i];
              if (d.x < x1_)
                x1_ = d.x;
              if (d.y < y1_)
                y1_ = d.y;
              if (d.x > x2_)
                x2_ = d.x;
              if (d.y > y2_)
                y2_ = d.y;
              xs.push(d.x);
              ys.push(d.y);
            }
          else
            for (i = 0;i < n; ++i) {
              var x_ = +fx(d = data[i], i), y_ = +fy(d, i);
              if (x_ < x1_)
                x1_ = x_;
              if (y_ < y1_)
                y1_ = y_;
              if (x_ > x2_)
                x2_ = x_;
              if (y_ > y2_)
                y2_ = y_;
              xs.push(x_);
              ys.push(y_);
            }
        }
        var dx = x2_ - x1_, dy = y2_ - y1_;
        if (dx > dy)
          y2_ = y1_ + dx;
        else
          x2_ = x1_ + dy;
        function insert(n2, d2, x3, y3, x12, y12, x22, y22) {
          if (isNaN(x3) || isNaN(y3))
            return;
          if (n2.leaf) {
            var { x: nx, y: ny } = n2;
            if (nx != null) {
              if (abs(nx - x3) + abs(ny - y3) < 0.01) {
                insertChild(n2, d2, x3, y3, x12, y12, x22, y22);
              } else {
                var nPoint = n2.point;
                n2.x = n2.y = n2.point = null;
                insertChild(n2, nPoint, nx, ny, x12, y12, x22, y22);
                insertChild(n2, d2, x3, y3, x12, y12, x22, y22);
              }
            } else {
              n2.x = x3, n2.y = y3, n2.point = d2;
            }
          } else {
            insertChild(n2, d2, x3, y3, x12, y12, x22, y22);
          }
        }
        function insertChild(n2, d2, x3, y3, x12, y12, x22, y22) {
          var xm = (x12 + x22) * 0.5, ym = (y12 + y22) * 0.5, right = x3 >= xm, below = y3 >= ym, i2 = below << 1 | right;
          n2.leaf = false;
          n2 = n2.nodes[i2] || (n2.nodes[i2] = d3_geom_quadtreeNode());
          if (right)
            x12 = xm;
          else
            x22 = xm;
          if (below)
            y12 = ym;
          else
            y22 = ym;
          insert(n2, d2, x3, y3, x12, y12, x22, y22);
        }
        var root = d3_geom_quadtreeNode();
        root.add = function(d2) {
          insert(root, d2, +fx(d2, ++i), +fy(d2, i), x1_, y1_, x2_, y2_);
        };
        root.visit = function(f) {
          d3_geom_quadtreeVisit(f, root, x1_, y1_, x2_, y2_);
        };
        root.find = function(point) {
          return d3_geom_quadtreeFind(root, point[0], point[1], x1_, y1_, x2_, y2_);
        };
        i = -1;
        if (x1 == null) {
          while (++i < n) {
            insert(root, data[i], xs[i], ys[i], x1_, y1_, x2_, y2_);
          }
          --i;
        } else
          data.forEach(root.add);
        xs = ys = data = d = null;
        return root;
      }
      quadtree.x = function(_) {
        return arguments.length ? (x = _, quadtree) : x;
      };
      quadtree.y = function(_) {
        return arguments.length ? (y = _, quadtree) : y;
      };
      quadtree.extent = function(_) {
        if (!arguments.length)
          return x1 == null ? null : [[x1, y1], [x2, y2]];
        if (_ == null)
          x1 = y1 = x2 = y2 = null;
        else
          x1 = +_[0][0], y1 = +_[0][1], x2 = +_[1][0], y2 = +_[1][1];
        return quadtree;
      };
      quadtree.size = function(_) {
        if (!arguments.length)
          return x1 == null ? null : [x2 - x1, y2 - y1];
        if (_ == null)
          x1 = y1 = x2 = y2 = null;
        else
          x1 = y1 = 0, x2 = +_[0], y2 = +_[1];
        return quadtree;
      };
      return quadtree;
    };
    function d3_geom_quadtreeCompatX(d) {
      return d.x;
    }
    function d3_geom_quadtreeCompatY(d) {
      return d.y;
    }
    function d3_geom_quadtreeNode() {
      return {
        leaf: true,
        nodes: [],
        point: null,
        x: null,
        y: null
      };
    }
    function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
      if (!f(node, x1, y1, x2, y2)) {
        var sx = (x1 + x2) * 0.5, sy = (y1 + y2) * 0.5, children = node.nodes;
        if (children[0])
          d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy);
        if (children[1])
          d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy);
        if (children[2])
          d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2);
        if (children[3])
          d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2);
      }
    }
    function d3_geom_quadtreeFind(root, x, y, x0, y0, x3, y3) {
      var minDistance2 = Infinity, closestPoint;
      (function find(node, x1, y1, x2, y2) {
        if (x1 > x3 || y1 > y3 || x2 < x0 || y2 < y0)
          return;
        if (point = node.point) {
          var point, dx = x - node.x, dy = y - node.y, distance2 = dx * dx + dy * dy;
          if (distance2 < minDistance2) {
            var distance = Math.sqrt(minDistance2 = distance2);
            x0 = x - distance, y0 = y - distance;
            x3 = x + distance, y3 = y + distance;
            closestPoint = point;
          }
        }
        var children = node.nodes, xm = (x1 + x2) * 0.5, ym = (y1 + y2) * 0.5, right = x >= xm, below = y >= ym;
        for (var i = below << 1 | right, j = i + 4;i < j; ++i) {
          if (node = children[i & 3])
            switch (i & 3) {
              case 0:
                find(node, x1, y1, xm, ym);
                break;
              case 1:
                find(node, xm, y1, x2, ym);
                break;
              case 2:
                find(node, x1, ym, xm, y2);
                break;
              case 3:
                find(node, xm, ym, x2, y2);
                break;
            }
        }
      })(root, x0, y0, x3, y3);
      return closestPoint;
    }
    d3.interpolateRgb = d3_interpolateRgb;
    function d3_interpolateRgb(a, b) {
      a = d3.rgb(a);
      b = d3.rgb(b);
      var { r: ar, g: ag, b: ab } = a, br = b.r - ar, bg = b.g - ag, bb = b.b - ab;
      return function(t) {
        return "#" + d3_rgb_hex(Math.round(ar + br * t)) + d3_rgb_hex(Math.round(ag + bg * t)) + d3_rgb_hex(Math.round(ab + bb * t));
      };
    }
    d3.interpolateObject = d3_interpolateObject;
    function d3_interpolateObject(a, b) {
      var i = {}, c = {}, k;
      for (k in a) {
        if (k in b) {
          i[k] = d3_interpolate(a[k], b[k]);
        } else {
          c[k] = a[k];
        }
      }
      for (k in b) {
        if (!(k in a)) {
          c[k] = b[k];
        }
      }
      return function(t) {
        for (k in i)
          c[k] = i[k](t);
        return c;
      };
    }
    d3.interpolateNumber = d3_interpolateNumber;
    function d3_interpolateNumber(a, b) {
      a = +a, b = +b;
      return function(t) {
        return a * (1 - t) + b * t;
      };
    }
    d3.interpolateString = d3_interpolateString;
    function d3_interpolateString(a, b) {
      var bi = d3_interpolate_numberA.lastIndex = d3_interpolate_numberB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
      a = a + "", b = b + "";
      while ((am = d3_interpolate_numberA.exec(a)) && (bm = d3_interpolate_numberB.exec(b))) {
        if ((bs = bm.index) > bi) {
          bs = b.slice(bi, bs);
          if (s[i])
            s[i] += bs;
          else
            s[++i] = bs;
        }
        if ((am = am[0]) === (bm = bm[0])) {
          if (s[i])
            s[i] += bm;
          else
            s[++i] = bm;
        } else {
          s[++i] = null;
          q.push({
            i,
            x: d3_interpolateNumber(am, bm)
          });
        }
        bi = d3_interpolate_numberB.lastIndex;
      }
      if (bi < b.length) {
        bs = b.slice(bi);
        if (s[i])
          s[i] += bs;
        else
          s[++i] = bs;
      }
      return s.length < 2 ? q[0] ? (b = q[0].x, function(t) {
        return b(t) + "";
      }) : function() {
        return b;
      } : (b = q.length, function(t) {
        for (var i2 = 0, o;i2 < b; ++i2)
          s[(o = q[i2]).i] = o.x(t);
        return s.join("");
      });
    }
    var d3_interpolate_numberA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, d3_interpolate_numberB = new RegExp(d3_interpolate_numberA.source, "g");
    d3.interpolate = d3_interpolate;
    function d3_interpolate(a, b) {
      var i = d3.interpolators.length, f;
      while (--i >= 0 && !(f = d3.interpolators[i](a, b)))
        ;
      return f;
    }
    d3.interpolators = [function(a, b) {
      var t = typeof b;
      return (t === "string" ? d3_rgb_names.has(b.toLowerCase()) || /^(#|rgb\(|hsl\()/i.test(b) ? d3_interpolateRgb : d3_interpolateString : b instanceof d3_color ? d3_interpolateRgb : Array.isArray(b) ? d3_interpolateArray : t === "object" && isNaN(b) ? d3_interpolateObject : d3_interpolateNumber)(a, b);
    }];
    d3.interpolateArray = d3_interpolateArray;
    function d3_interpolateArray(a, b) {
      var x = [], c = [], na = a.length, nb = b.length, n0 = Math.min(a.length, b.length), i;
      for (i = 0;i < n0; ++i)
        x.push(d3_interpolate(a[i], b[i]));
      for (;i < na; ++i)
        c[i] = a[i];
      for (;i < nb; ++i)
        c[i] = b[i];
      return function(t) {
        for (i = 0;i < n0; ++i)
          c[i] = x[i](t);
        return c;
      };
    }
    var d3_ease_default = function() {
      return d3_identity;
    };
    var d3_ease = d3.map({
      linear: d3_ease_default,
      poly: d3_ease_poly,
      quad: function() {
        return d3_ease_quad;
      },
      cubic: function() {
        return d3_ease_cubic;
      },
      sin: function() {
        return d3_ease_sin;
      },
      exp: function() {
        return d3_ease_exp;
      },
      circle: function() {
        return d3_ease_circle;
      },
      elastic: d3_ease_elastic,
      back: d3_ease_back,
      bounce: function() {
        return d3_ease_bounce;
      }
    });
    var d3_ease_mode = d3.map({
      in: d3_identity,
      out: d3_ease_reverse,
      "in-out": d3_ease_reflect,
      "out-in": function(f) {
        return d3_ease_reflect(d3_ease_reverse(f));
      }
    });
    d3.ease = function(name) {
      var i = name.indexOf("-"), t = i >= 0 ? name.slice(0, i) : name, m = i >= 0 ? name.slice(i + 1) : "in";
      t = d3_ease.get(t) || d3_ease_default;
      m = d3_ease_mode.get(m) || d3_identity;
      return d3_ease_clamp(m(t.apply(null, d3_arraySlice.call(arguments, 1))));
    };
    function d3_ease_clamp(f) {
      return function(t) {
        return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
      };
    }
    function d3_ease_reverse(f) {
      return function(t) {
        return 1 - f(1 - t);
      };
    }
    function d3_ease_reflect(f) {
      return function(t) {
        return 0.5 * (t < 0.5 ? f(2 * t) : 2 - f(2 - 2 * t));
      };
    }
    function d3_ease_quad(t) {
      return t * t;
    }
    function d3_ease_cubic(t) {
      return t * t * t;
    }
    function d3_ease_cubicInOut(t) {
      if (t <= 0)
        return 0;
      if (t >= 1)
        return 1;
      var t2 = t * t, t3 = t2 * t;
      return 4 * (t < 0.5 ? t3 : 3 * (t - t2) + t3 - 0.75);
    }
    function d3_ease_poly(e) {
      return function(t) {
        return Math.pow(t, e);
      };
    }
    function d3_ease_sin(t) {
      return 1 - Math.cos(t * half_);
    }
    function d3_ease_exp(t) {
      return Math.pow(2, 10 * (t - 1));
    }
    function d3_ease_circle(t) {
      return 1 - Math.sqrt(1 - t * t);
    }
    function d3_ease_elastic(a, p) {
      var s;
      if (arguments.length < 2)
        p = 0.45;
      if (arguments.length)
        s = p / τ * Math.asin(1 / a);
      else
        a = 1, s = p / 4;
      return function(t) {
        return 1 + a * Math.pow(2, -10 * t) * Math.sin((t - s) * τ / p);
      };
    }
    function d3_ease_back(s) {
      if (!s)
        s = 1.70158;
      return function(t) {
        return t * t * ((s + 1) * t - s);
      };
    }
    function d3_ease_bounce(t) {
      return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
    d3.interpolateHcl = d3_interpolateHcl;
    function d3_interpolateHcl(a, b) {
      a = d3.hcl(a);
      b = d3.hcl(b);
      var { h: ah, c: ac, l: al } = a, bh = b.h - ah, bc = b.c - ac, bl = b.l - al;
      if (isNaN(bc))
        bc = 0, ac = isNaN(ac) ? b.c : ac;
      if (isNaN(bh))
        bh = 0, ah = isNaN(ah) ? b.h : ah;
      else if (bh > 180)
        bh -= 360;
      else if (bh < -180)
        bh += 360;
      return function(t) {
        return d3_hcl_lab(ah + bh * t, ac + bc * t, al + bl * t) + "";
      };
    }
    d3.interpolateHsl = d3_interpolateHsl;
    function d3_interpolateHsl(a, b) {
      a = d3.hsl(a);
      b = d3.hsl(b);
      var { h: ah, s: as, l: al } = a, bh = b.h - ah, bs = b.s - as, bl = b.l - al;
      if (isNaN(bs))
        bs = 0, as = isNaN(as) ? b.s : as;
      if (isNaN(bh))
        bh = 0, ah = isNaN(ah) ? b.h : ah;
      else if (bh > 180)
        bh -= 360;
      else if (bh < -180)
        bh += 360;
      return function(t) {
        return d3_hsl_rgb(ah + bh * t, as + bs * t, al + bl * t) + "";
      };
    }
    d3.interpolateLab = d3_interpolateLab;
    function d3_interpolateLab(a, b) {
      a = d3.lab(a);
      b = d3.lab(b);
      var { l: al, a: aa, b: ab } = a, bl = b.l - al, ba = b.a - aa, bb = b.b - ab;
      return function(t) {
        return d3_lab_rgb(al + bl * t, aa + ba * t, ab + bb * t) + "";
      };
    }
    d3.interpolateRound = d3_interpolateRound;
    function d3_interpolateRound(a, b) {
      b -= a;
      return function(t) {
        return Math.round(a + b * t);
      };
    }
    d3.transform = function(string) {
      var g = d3_document.createElementNS(d3.ns.prefix.svg, "g");
      return (d3.transform = function(string2) {
        if (string2 != null) {
          g.setAttribute("transform", string2);
          var t = g.transform.baseVal.consolidate();
        }
        return new d3_transform(t ? t.matrix : d3_transformIdentity);
      })(string);
    };
    function d3_transform(m) {
      var r0 = [m.a, m.b], r1 = [m.c, m.d], kx = d3_transformNormalize(r0), kz = d3_transformDot(r0, r1), ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
      if (r0[0] * r1[1] < r1[0] * r0[1]) {
        r0[0] *= -1;
        r0[1] *= -1;
        kx *= -1;
        kz *= -1;
      }
      this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_degrees;
      this.translate = [m.e, m.f];
      this.scale = [kx, ky];
      this.skew = ky ? Math.atan2(kz, ky) * d3_degrees : 0;
    }
    d3_transform.prototype.toString = function() {
      return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")";
    };
    function d3_transformDot(a, b) {
      return a[0] * b[0] + a[1] * b[1];
    }
    function d3_transformNormalize(a) {
      var k = Math.sqrt(d3_transformDot(a, a));
      if (k) {
        a[0] /= k;
        a[1] /= k;
      }
      return k;
    }
    function d3_transformCombine(a, b, k) {
      a[0] += k * b[0];
      a[1] += k * b[1];
      return a;
    }
    var d3_transformIdentity = {
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      e: 0,
      f: 0
    };
    d3.interpolateTransform = d3_interpolateTransform;
    function d3_interpolateTransformPop(s) {
      return s.length ? s.pop() + "," : "";
    }
    function d3_interpolateTranslate(ta, tb, s, q) {
      if (ta[0] !== tb[0] || ta[1] !== tb[1]) {
        var i = s.push("translate(", null, ",", null, ")");
        q.push({
          i: i - 4,
          x: d3_interpolateNumber(ta[0], tb[0])
        }, {
          i: i - 2,
          x: d3_interpolateNumber(ta[1], tb[1])
        });
      } else if (tb[0] || tb[1]) {
        s.push("translate(" + tb + ")");
      }
    }
    function d3_interpolateRotate(ra, rb, s, q) {
      if (ra !== rb) {
        if (ra - rb > 180)
          rb += 360;
        else if (rb - ra > 180)
          ra += 360;
        q.push({
          i: s.push(d3_interpolateTransformPop(s) + "rotate(", null, ")") - 2,
          x: d3_interpolateNumber(ra, rb)
        });
      } else if (rb) {
        s.push(d3_interpolateTransformPop(s) + "rotate(" + rb + ")");
      }
    }
    function d3_interpolateSkew(wa, wb, s, q) {
      if (wa !== wb) {
        q.push({
          i: s.push(d3_interpolateTransformPop(s) + "skewX(", null, ")") - 2,
          x: d3_interpolateNumber(wa, wb)
        });
      } else if (wb) {
        s.push(d3_interpolateTransformPop(s) + "skewX(" + wb + ")");
      }
    }
    function d3_interpolateScale(ka, kb, s, q) {
      if (ka[0] !== kb[0] || ka[1] !== kb[1]) {
        var i = s.push(d3_interpolateTransformPop(s) + "scale(", null, ",", null, ")");
        q.push({
          i: i - 4,
          x: d3_interpolateNumber(ka[0], kb[0])
        }, {
          i: i - 2,
          x: d3_interpolateNumber(ka[1], kb[1])
        });
      } else if (kb[0] !== 1 || kb[1] !== 1) {
        s.push(d3_interpolateTransformPop(s) + "scale(" + kb + ")");
      }
    }
    function d3_interpolateTransform(a, b) {
      var s = [], q = [];
      a = d3.transform(a), b = d3.transform(b);
      d3_interpolateTranslate(a.translate, b.translate, s, q);
      d3_interpolateRotate(a.rotate, b.rotate, s, q);
      d3_interpolateSkew(a.skew, b.skew, s, q);
      d3_interpolateScale(a.scale, b.scale, s, q);
      a = b = null;
      return function(t) {
        var i = -1, n = q.length, o;
        while (++i < n)
          s[(o = q[i]).i] = o.x(t);
        return s.join("");
      };
    }
    function d3_uninterpolateNumber(a, b) {
      b = (b -= a = +a) || 1 / b;
      return function(x) {
        return (x - a) / b;
      };
    }
    function d3_uninterpolateClamp(a, b) {
      b = (b -= a = +a) || 1 / b;
      return function(x) {
        return Math.max(0, Math.min(1, (x - a) / b));
      };
    }
    d3.layout = {};
    d3.layout.bundle = function() {
      return function(links) {
        var paths = [], i = -1, n = links.length;
        while (++i < n)
          paths.push(d3_layout_bundlePath(links[i]));
        return paths;
      };
    };
    function d3_layout_bundlePath(link) {
      var { source: start, target: end } = link, lca = d3_layout_bundleLeastCommonAncestor(start, end), points = [start];
      while (start !== lca) {
        start = start.parent;
        points.push(start);
      }
      var k = points.length;
      while (end !== lca) {
        points.splice(k, 0, end);
        end = end.parent;
      }
      return points;
    }
    function d3_layout_bundleAncestors(node) {
      var ancestors = [], parent = node.parent;
      while (parent != null) {
        ancestors.push(node);
        node = parent;
        parent = parent.parent;
      }
      ancestors.push(node);
      return ancestors;
    }
    function d3_layout_bundleLeastCommonAncestor(a, b) {
      if (a === b)
        return a;
      var aNodes = d3_layout_bundleAncestors(a), bNodes = d3_layout_bundleAncestors(b), aNode = aNodes.pop(), bNode = bNodes.pop(), sharedNode = null;
      while (aNode === bNode) {
        sharedNode = aNode;
        aNode = aNodes.pop();
        bNode = bNodes.pop();
      }
      return sharedNode;
    }
    d3.layout.chord = function() {
      var chord = {}, chords, groups, matrix, n, padding = 0, sortGroups, sortSubgroups, sortChords;
      function relayout() {
        var subgroups = {}, groupSums = [], groupIndex = d3.range(n), subgroupIndex = [], k, x, x0, i, j;
        chords = [];
        groups = [];
        k = 0, i = -1;
        while (++i < n) {
          x = 0, j = -1;
          while (++j < n) {
            x += matrix[i][j];
          }
          groupSums.push(x);
          subgroupIndex.push(d3.range(n));
          k += x;
        }
        if (sortGroups) {
          groupIndex.sort(function(a, b) {
            return sortGroups(groupSums[a], groupSums[b]);
          });
        }
        if (sortSubgroups) {
          subgroupIndex.forEach(function(d, i2) {
            d.sort(function(a, b) {
              return sortSubgroups(matrix[i2][a], matrix[i2][b]);
            });
          });
        }
        k = (τ - padding * n) / k;
        x = 0, i = -1;
        while (++i < n) {
          x0 = x, j = -1;
          while (++j < n) {
            var di = groupIndex[i], dj = subgroupIndex[di][j], v = matrix[di][dj], a0 = x, a1 = x += v * k;
            subgroups[di + "-" + dj] = {
              index: di,
              subindex: dj,
              startAngle: a0,
              endAngle: a1,
              value: v
            };
          }
          groups[di] = {
            index: di,
            startAngle: x0,
            endAngle: x,
            value: groupSums[di]
          };
          x += padding;
        }
        i = -1;
        while (++i < n) {
          j = i - 1;
          while (++j < n) {
            var source = subgroups[i + "-" + j], target = subgroups[j + "-" + i];
            if (source.value || target.value) {
              chords.push(source.value < target.value ? {
                source: target,
                target: source
              } : {
                source,
                target
              });
            }
          }
        }
        if (sortChords)
          resort();
      }
      function resort() {
        chords.sort(function(a, b) {
          return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2);
        });
      }
      chord.matrix = function(x) {
        if (!arguments.length)
          return matrix;
        n = (matrix = x) && matrix.length;
        chords = groups = null;
        return chord;
      };
      chord.padding = function(x) {
        if (!arguments.length)
          return padding;
        padding = x;
        chords = groups = null;
        return chord;
      };
      chord.sortGroups = function(x) {
        if (!arguments.length)
          return sortGroups;
        sortGroups = x;
        chords = groups = null;
        return chord;
      };
      chord.sortSubgroups = function(x) {
        if (!arguments.length)
          return sortSubgroups;
        sortSubgroups = x;
        chords = null;
        return chord;
      };
      chord.sortChords = function(x) {
        if (!arguments.length)
          return sortChords;
        sortChords = x;
        if (chords)
          resort();
        return chord;
      };
      chord.chords = function() {
        if (!chords)
          relayout();
        return chords;
      };
      chord.groups = function() {
        if (!groups)
          relayout();
        return groups;
      };
      return chord;
    };
    d3.layout.force = function() {
      var force = {}, event = d3.dispatch("start", "tick", "end"), timer, size = [1, 1], drag, alpha, friction = 0.9, linkDistance = d3_layout_forceLinkDistance, linkStrength = d3_layout_forceLinkStrength, charge = -30, chargeDistance2 = d3_layout_forceChargeDistance2, gravity = 0.1, theta2 = 0.64, nodes = [], links = [], distances, strengths, charges;
      function repulse(node) {
        return function(quad, x1, _, x2) {
          if (quad.point !== node) {
            var dx = quad.cx - node.x, dy = quad.cy - node.y, dw = x2 - x1, dn = dx * dx + dy * dy;
            if (dw * dw / theta2 < dn) {
              if (dn < chargeDistance2) {
                var k = quad.charge / dn;
                node.px -= dx * k;
                node.py -= dy * k;
              }
              return true;
            }
            if (quad.point && dn && dn < chargeDistance2) {
              var k = quad.pointCharge / dn;
              node.px -= dx * k;
              node.py -= dy * k;
            }
          }
          return !quad.charge;
        };
      }
      force.tick = function() {
        if ((alpha *= 0.99) < 0.005) {
          timer = null;
          event.end({
            type: "end",
            alpha: alpha = 0
          });
          return true;
        }
        var n = nodes.length, m = links.length, q, i, o, s, t, l, k, x, y;
        for (i = 0;i < m; ++i) {
          o = links[i];
          s = o.source;
          t = o.target;
          x = t.x - s.x;
          y = t.y - s.y;
          if (l = x * x + y * y) {
            l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
            x *= l;
            y *= l;
            t.x -= x * (k = s.weight + t.weight ? s.weight / (s.weight + t.weight) : 0.5);
            t.y -= y * k;
            s.x += x * (k = 1 - k);
            s.y += y * k;
          }
        }
        if (k = alpha * gravity) {
          x = size[0] / 2;
          y = size[1] / 2;
          i = -1;
          if (k)
            while (++i < n) {
              o = nodes[i];
              o.x += (x - o.x) * k;
              o.y += (y - o.y) * k;
            }
        }
        if (charge) {
          d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges);
          i = -1;
          while (++i < n) {
            if (!(o = nodes[i]).fixed) {
              q.visit(repulse(o));
            }
          }
        }
        i = -1;
        while (++i < n) {
          o = nodes[i];
          if (o.fixed) {
            o.x = o.px;
            o.y = o.py;
          } else {
            o.x -= (o.px - (o.px = o.x)) * friction;
            o.y -= (o.py - (o.py = o.y)) * friction;
          }
        }
        event.tick({
          type: "tick",
          alpha
        });
      };
      force.nodes = function(x) {
        if (!arguments.length)
          return nodes;
        nodes = x;
        return force;
      };
      force.links = function(x) {
        if (!arguments.length)
          return links;
        links = x;
        return force;
      };
      force.size = function(x) {
        if (!arguments.length)
          return size;
        size = x;
        return force;
      };
      force.linkDistance = function(x) {
        if (!arguments.length)
          return linkDistance;
        linkDistance = typeof x === "function" ? x : +x;
        return force;
      };
      force.distance = force.linkDistance;
      force.linkStrength = function(x) {
        if (!arguments.length)
          return linkStrength;
        linkStrength = typeof x === "function" ? x : +x;
        return force;
      };
      force.friction = function(x) {
        if (!arguments.length)
          return friction;
        friction = +x;
        return force;
      };
      force.charge = function(x) {
        if (!arguments.length)
          return charge;
        charge = typeof x === "function" ? x : +x;
        return force;
      };
      force.chargeDistance = function(x) {
        if (!arguments.length)
          return Math.sqrt(chargeDistance2);
        chargeDistance2 = x * x;
        return force;
      };
      force.gravity = function(x) {
        if (!arguments.length)
          return gravity;
        gravity = +x;
        return force;
      };
      force.theta = function(x) {
        if (!arguments.length)
          return Math.sqrt(theta2);
        theta2 = x * x;
        return force;
      };
      force.alpha = function(x) {
        if (!arguments.length)
          return alpha;
        x = +x;
        if (alpha) {
          if (x > 0) {
            alpha = x;
          } else {
            timer.c = null, timer.t = NaN, timer = null;
            event.end({
              type: "end",
              alpha: alpha = 0
            });
          }
        } else if (x > 0) {
          event.start({
            type: "start",
            alpha: alpha = x
          });
          timer = d3_timer(force.tick);
        }
        return force;
      };
      force.start = function() {
        var i, n = nodes.length, m = links.length, w = size[0], h = size[1], neighbors, o;
        for (i = 0;i < n; ++i) {
          (o = nodes[i]).index = i;
          o.weight = 0;
        }
        for (i = 0;i < m; ++i) {
          o = links[i];
          if (typeof o.source == "number")
            o.source = nodes[o.source];
          if (typeof o.target == "number")
            o.target = nodes[o.target];
          ++o.source.weight;
          ++o.target.weight;
        }
        for (i = 0;i < n; ++i) {
          o = nodes[i];
          if (isNaN(o.x))
            o.x = position("x", w);
          if (isNaN(o.y))
            o.y = position("y", h);
          if (isNaN(o.px))
            o.px = o.x;
          if (isNaN(o.py))
            o.py = o.y;
        }
        distances = [];
        if (typeof linkDistance === "function")
          for (i = 0;i < m; ++i)
            distances[i] = +linkDistance.call(this, links[i], i);
        else
          for (i = 0;i < m; ++i)
            distances[i] = linkDistance;
        strengths = [];
        if (typeof linkStrength === "function")
          for (i = 0;i < m; ++i)
            strengths[i] = +linkStrength.call(this, links[i], i);
        else
          for (i = 0;i < m; ++i)
            strengths[i] = linkStrength;
        charges = [];
        if (typeof charge === "function")
          for (i = 0;i < n; ++i)
            charges[i] = +charge.call(this, nodes[i], i);
        else
          for (i = 0;i < n; ++i)
            charges[i] = charge;
        function position(dimension, size2) {
          if (!neighbors) {
            neighbors = new Array(n);
            for (j = 0;j < n; ++j) {
              neighbors[j] = [];
            }
            for (j = 0;j < m; ++j) {
              var o2 = links[j];
              neighbors[o2.source.index].push(o2.target);
              neighbors[o2.target.index].push(o2.source);
            }
          }
          var candidates = neighbors[i], j = -1, l = candidates.length, x;
          while (++j < l)
            if (!isNaN(x = candidates[j][dimension]))
              return x;
          return Math.random() * size2;
        }
        return force.resume();
      };
      force.resume = function() {
        return force.alpha(0.1);
      };
      force.stop = function() {
        return force.alpha(0);
      };
      force.drag = function() {
        if (!drag)
          drag = d3.behavior.drag().origin(d3_identity).on("dragstart.force", d3_layout_forceDragstart).on("drag.force", dragmove).on("dragend.force", d3_layout_forceDragend);
        if (!arguments.length)
          return drag;
        this.on("mouseover.force", d3_layout_forceMouseover).on("mouseout.force", d3_layout_forceMouseout).call(drag);
      };
      function dragmove(d) {
        d.px = d3.event.x, d.py = d3.event.y;
        force.resume();
      }
      return d3.rebind(force, event, "on");
    };
    function d3_layout_forceDragstart(d) {
      d.fixed |= 2;
    }
    function d3_layout_forceDragend(d) {
      d.fixed &= ~6;
    }
    function d3_layout_forceMouseover(d) {
      d.fixed |= 4;
      d.px = d.x, d.py = d.y;
    }
    function d3_layout_forceMouseout(d) {
      d.fixed &= ~4;
    }
    function d3_layout_forceAccumulate(quad, alpha, charges) {
      var cx = 0, cy = 0;
      quad.charge = 0;
      if (!quad.leaf) {
        var nodes = quad.nodes, n = nodes.length, i = -1, c;
        while (++i < n) {
          c = nodes[i];
          if (c == null)
            continue;
          d3_layout_forceAccumulate(c, alpha, charges);
          quad.charge += c.charge;
          cx += c.charge * c.cx;
          cy += c.charge * c.cy;
        }
      }
      if (quad.point) {
        if (!quad.leaf) {
          quad.point.x += Math.random() - 0.5;
          quad.point.y += Math.random() - 0.5;
        }
        var k = alpha * charges[quad.point.index];
        quad.charge += quad.pointCharge = k;
        cx += k * quad.point.x;
        cy += k * quad.point.y;
      }
      quad.cx = cx / quad.charge;
      quad.cy = cy / quad.charge;
    }
    var d3_layout_forceLinkDistance = 20, d3_layout_forceLinkStrength = 1, d3_layout_forceChargeDistance2 = Infinity;
    d3.layout.hierarchy = function() {
      var sort = d3_layout_hierarchySort, children = d3_layout_hierarchyChildren, value = d3_layout_hierarchyValue;
      function hierarchy(root) {
        var stack = [root], nodes = [], node;
        root.depth = 0;
        while ((node = stack.pop()) != null) {
          nodes.push(node);
          if ((childs = children.call(hierarchy, node, node.depth)) && (n = childs.length)) {
            var n, childs, child;
            while (--n >= 0) {
              stack.push(child = childs[n]);
              child.parent = node;
              child.depth = node.depth + 1;
            }
            if (value)
              node.value = 0;
            node.children = childs;
          } else {
            if (value)
              node.value = +value.call(hierarchy, node, node.depth) || 0;
            delete node.children;
          }
        }
        d3_layout_hierarchyVisitAfter(root, function(node2) {
          var childs2, parent;
          if (sort && (childs2 = node2.children))
            childs2.sort(sort);
          if (value && (parent = node2.parent))
            parent.value += node2.value;
        });
        return nodes;
      }
      hierarchy.sort = function(x) {
        if (!arguments.length)
          return sort;
        sort = x;
        return hierarchy;
      };
      hierarchy.children = function(x) {
        if (!arguments.length)
          return children;
        children = x;
        return hierarchy;
      };
      hierarchy.value = function(x) {
        if (!arguments.length)
          return value;
        value = x;
        return hierarchy;
      };
      hierarchy.revalue = function(root) {
        if (value) {
          d3_layout_hierarchyVisitBefore(root, function(node) {
            if (node.children)
              node.value = 0;
          });
          d3_layout_hierarchyVisitAfter(root, function(node) {
            var parent;
            if (!node.children)
              node.value = +value.call(hierarchy, node, node.depth) || 0;
            if (parent = node.parent)
              parent.value += node.value;
          });
        }
        return root;
      };
      return hierarchy;
    };
    function d3_layout_hierarchyRebind(object, hierarchy) {
      d3.rebind(object, hierarchy, "sort", "children", "value");
      object.nodes = object;
      object.links = d3_layout_hierarchyLinks;
      return object;
    }
    function d3_layout_hierarchyVisitBefore(node, callback) {
      var nodes = [node];
      while ((node = nodes.pop()) != null) {
        callback(node);
        if ((children = node.children) && (n = children.length)) {
          var n, children;
          while (--n >= 0)
            nodes.push(children[n]);
        }
      }
    }
    function d3_layout_hierarchyVisitAfter(node, callback) {
      var nodes = [node], nodes2 = [];
      while ((node = nodes.pop()) != null) {
        nodes2.push(node);
        if ((children = node.children) && (n = children.length)) {
          var i = -1, n, children;
          while (++i < n)
            nodes.push(children[i]);
        }
      }
      while ((node = nodes2.pop()) != null) {
        callback(node);
      }
    }
    function d3_layout_hierarchyChildren(d) {
      return d.children;
    }
    function d3_layout_hierarchyValue(d) {
      return d.value;
    }
    function d3_layout_hierarchySort(a, b) {
      return b.value - a.value;
    }
    function d3_layout_hierarchyLinks(nodes) {
      return d3.merge(nodes.map(function(parent) {
        return (parent.children || []).map(function(child) {
          return {
            source: parent,
            target: child
          };
        });
      }));
    }
    d3.layout.partition = function() {
      var hierarchy = d3.layout.hierarchy(), size = [1, 1];
      function position(node, x, dx, dy) {
        var children = node.children;
        node.x = x;
        node.y = node.depth * dy;
        node.dx = dx;
        node.dy = dy;
        if (children && (n = children.length)) {
          var i = -1, n, c, d;
          dx = node.value ? dx / node.value : 0;
          while (++i < n) {
            position(c = children[i], x, d = c.value * dx, dy);
            x += d;
          }
        }
      }
      function depth(node) {
        var children = node.children, d = 0;
        if (children && (n = children.length)) {
          var i = -1, n;
          while (++i < n)
            d = Math.max(d, depth(children[i]));
        }
        return 1 + d;
      }
      function partition(d, i) {
        var nodes = hierarchy.call(this, d, i);
        position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
        return nodes;
      }
      partition.size = function(x) {
        if (!arguments.length)
          return size;
        size = x;
        return partition;
      };
      return d3_layout_hierarchyRebind(partition, hierarchy);
    };
    d3.layout.pie = function() {
      var value = Number, sort = d3_layout_pieSortByValue, startAngle = 0, endAngle = τ, padAngle = 0;
      function pie(data) {
        var n = data.length, values = data.map(function(d, i) {
          return +value.call(pie, d, i);
        }), a = +(typeof startAngle === "function" ? startAngle.apply(this, arguments) : startAngle), da = (typeof endAngle === "function" ? endAngle.apply(this, arguments) : endAngle) - a, p = Math.min(Math.abs(da) / n, +(typeof padAngle === "function" ? padAngle.apply(this, arguments) : padAngle)), pa = p * (da < 0 ? -1 : 1), sum = d3.sum(values), k = sum ? (da - n * pa) / sum : 0, index = d3.range(n), arcs = [], v;
        if (sort != null)
          index.sort(sort === d3_layout_pieSortByValue ? function(i, j) {
            return values[j] - values[i];
          } : function(i, j) {
            return sort(data[i], data[j]);
          });
        index.forEach(function(i) {
          arcs[i] = {
            data: data[i],
            value: v = values[i],
            startAngle: a,
            endAngle: a += v * k + pa,
            padAngle: p
          };
        });
        return arcs;
      }
      pie.value = function(_) {
        if (!arguments.length)
          return value;
        value = _;
        return pie;
      };
      pie.sort = function(_) {
        if (!arguments.length)
          return sort;
        sort = _;
        return pie;
      };
      pie.startAngle = function(_) {
        if (!arguments.length)
          return startAngle;
        startAngle = _;
        return pie;
      };
      pie.endAngle = function(_) {
        if (!arguments.length)
          return endAngle;
        endAngle = _;
        return pie;
      };
      pie.padAngle = function(_) {
        if (!arguments.length)
          return padAngle;
        padAngle = _;
        return pie;
      };
      return pie;
    };
    var d3_layout_pieSortByValue = {};
    d3.layout.stack = function() {
      var values = d3_identity, order = d3_layout_stackOrderDefault, offset = d3_layout_stackOffsetZero, out = d3_layout_stackOut, x = d3_layout_stackX, y = d3_layout_stackY;
      function stack(data, index) {
        if (!(n = data.length))
          return data;
        var series = data.map(function(d, i2) {
          return values.call(stack, d, i2);
        });
        var points = series.map(function(d) {
          return d.map(function(v, i2) {
            return [x.call(stack, v, i2), y.call(stack, v, i2)];
          });
        });
        var orders = order.call(stack, points, index);
        series = d3.permute(series, orders);
        points = d3.permute(points, orders);
        var offsets = offset.call(stack, points, index);
        var m = series[0].length, n, i, j, o;
        for (j = 0;j < m; ++j) {
          out.call(stack, series[0][j], o = offsets[j], points[0][j][1]);
          for (i = 1;i < n; ++i) {
            out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
          }
        }
        return data;
      }
      stack.values = function(x2) {
        if (!arguments.length)
          return values;
        values = x2;
        return stack;
      };
      stack.order = function(x2) {
        if (!arguments.length)
          return order;
        order = typeof x2 === "function" ? x2 : d3_layout_stackOrders.get(x2) || d3_layout_stackOrderDefault;
        return stack;
      };
      stack.offset = function(x2) {
        if (!arguments.length)
          return offset;
        offset = typeof x2 === "function" ? x2 : d3_layout_stackOffsets.get(x2) || d3_layout_stackOffsetZero;
        return stack;
      };
      stack.x = function(z) {
        if (!arguments.length)
          return x;
        x = z;
        return stack;
      };
      stack.y = function(z) {
        if (!arguments.length)
          return y;
        y = z;
        return stack;
      };
      stack.out = function(z) {
        if (!arguments.length)
          return out;
        out = z;
        return stack;
      };
      return stack;
    };
    function d3_layout_stackX(d) {
      return d.x;
    }
    function d3_layout_stackY(d) {
      return d.y;
    }
    function d3_layout_stackOut(d, y0, y) {
      d.y0 = y0;
      d.y = y;
    }
    var d3_layout_stackOrders = d3.map({
      "inside-out": function(data) {
        var n = data.length, i, j, max = data.map(d3_layout_stackMaxIndex), sums = data.map(d3_layout_stackReduceSum), index = d3.range(n).sort(function(a, b) {
          return max[a] - max[b];
        }), top = 0, bottom = 0, tops = [], bottoms = [];
        for (i = 0;i < n; ++i) {
          j = index[i];
          if (top < bottom) {
            top += sums[j];
            tops.push(j);
          } else {
            bottom += sums[j];
            bottoms.push(j);
          }
        }
        return bottoms.reverse().concat(tops);
      },
      reverse: function(data) {
        return d3.range(data.length).reverse();
      },
      default: d3_layout_stackOrderDefault
    });
    var d3_layout_stackOffsets = d3.map({
      silhouette: function(data) {
        var n = data.length, m = data[0].length, sums = [], max = 0, i, j, o, y0 = [];
        for (j = 0;j < m; ++j) {
          for (i = 0, o = 0;i < n; i++)
            o += data[i][j][1];
          if (o > max)
            max = o;
          sums.push(o);
        }
        for (j = 0;j < m; ++j) {
          y0[j] = (max - sums[j]) / 2;
        }
        return y0;
      },
      wiggle: function(data) {
        var n = data.length, x = data[0], m = x.length, i, j, k, s1, s2, s3, dx, o, o0, y0 = [];
        y0[0] = o = o0 = 0;
        for (j = 1;j < m; ++j) {
          for (i = 0, s1 = 0;i < n; ++i)
            s1 += data[i][j][1];
          for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0];i < n; ++i) {
            for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx);k < i; ++k) {
              s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
            }
            s2 += s3 * data[i][j][1];
          }
          y0[j] = o -= s1 ? s2 / s1 * dx : 0;
          if (o < o0)
            o0 = o;
        }
        for (j = 0;j < m; ++j)
          y0[j] -= o0;
        return y0;
      },
      expand: function(data) {
        var n = data.length, m = data[0].length, k = 1 / n, i, j, o, y0 = [];
        for (j = 0;j < m; ++j) {
          for (i = 0, o = 0;i < n; i++)
            o += data[i][j][1];
          if (o)
            for (i = 0;i < n; i++)
              data[i][j][1] /= o;
          else
            for (i = 0;i < n; i++)
              data[i][j][1] = k;
        }
        for (j = 0;j < m; ++j)
          y0[j] = 0;
        return y0;
      },
      zero: d3_layout_stackOffsetZero
    });
    function d3_layout_stackOrderDefault(data) {
      return d3.range(data.length);
    }
    function d3_layout_stackOffsetZero(data) {
      var j = -1, m = data[0].length, y0 = [];
      while (++j < m)
        y0[j] = 0;
      return y0;
    }
    function d3_layout_stackMaxIndex(array) {
      var i = 1, j = 0, v = array[0][1], k, n = array.length;
      for (;i < n; ++i) {
        if ((k = array[i][1]) > v) {
          j = i;
          v = k;
        }
      }
      return j;
    }
    function d3_layout_stackReduceSum(d) {
      return d.reduce(d3_layout_stackSum, 0);
    }
    function d3_layout_stackSum(p, d) {
      return p + d[1];
    }
    d3.layout.histogram = function() {
      var frequency = true, valuer = Number, ranger = d3_layout_histogramRange, binner = d3_layout_histogramBinSturges;
      function histogram(data, i) {
        var bins = [], values = data.map(valuer, this), range = ranger.call(this, values, i), thresholds = binner.call(this, range, values, i), bin, i = -1, n = values.length, m = thresholds.length - 1, k = frequency ? 1 : 1 / n, x;
        while (++i < m) {
          bin = bins[i] = [];
          bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
          bin.y = 0;
        }
        if (m > 0) {
          i = -1;
          while (++i < n) {
            x = values[i];
            if (x >= range[0] && x <= range[1]) {
              bin = bins[d3.bisect(thresholds, x, 1, m) - 1];
              bin.y += k;
              bin.push(data[i]);
            }
          }
        }
        return bins;
      }
      histogram.value = function(x) {
        if (!arguments.length)
          return valuer;
        valuer = x;
        return histogram;
      };
      histogram.range = function(x) {
        if (!arguments.length)
          return ranger;
        ranger = d3_functor(x);
        return histogram;
      };
      histogram.bins = function(x) {
        if (!arguments.length)
          return binner;
        binner = typeof x === "number" ? function(range) {
          return d3_layout_histogramBinFixed(range, x);
        } : d3_functor(x);
        return histogram;
      };
      histogram.frequency = function(x) {
        if (!arguments.length)
          return frequency;
        frequency = !!x;
        return histogram;
      };
      return histogram;
    };
    function d3_layout_histogramBinSturges(range, values) {
      return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
    }
    function d3_layout_histogramBinFixed(range, n) {
      var x = -1, b = +range[0], m = (range[1] - b) / n, f = [];
      while (++x <= n)
        f[x] = m * x + b;
      return f;
    }
    function d3_layout_histogramRange(values) {
      return [d3.min(values), d3.max(values)];
    }
    d3.layout.pack = function() {
      var hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort), padding = 0, size = [1, 1], radius;
      function pack(d, i) {
        var nodes = hierarchy.call(this, d, i), root = nodes[0], w = size[0], h = size[1], r = radius == null ? Math.sqrt : typeof radius === "function" ? radius : function() {
          return radius;
        };
        root.x = root.y = 0;
        d3_layout_hierarchyVisitAfter(root, function(d2) {
          d2.r = +r(d2.value);
        });
        d3_layout_hierarchyVisitAfter(root, d3_layout_packSiblings);
        if (padding) {
          var dr = padding * (radius ? 1 : Math.max(2 * root.r / w, 2 * root.r / h)) / 2;
          d3_layout_hierarchyVisitAfter(root, function(d2) {
            d2.r += dr;
          });
          d3_layout_hierarchyVisitAfter(root, d3_layout_packSiblings);
          d3_layout_hierarchyVisitAfter(root, function(d2) {
            d2.r -= dr;
          });
        }
        d3_layout_packTransform(root, w / 2, h / 2, radius ? 1 : 1 / Math.max(2 * root.r / w, 2 * root.r / h));
        return nodes;
      }
      pack.size = function(_) {
        if (!arguments.length)
          return size;
        size = _;
        return pack;
      };
      pack.radius = function(_) {
        if (!arguments.length)
          return radius;
        radius = _ == null || typeof _ === "function" ? _ : +_;
        return pack;
      };
      pack.padding = function(_) {
        if (!arguments.length)
          return padding;
        padding = +_;
        return pack;
      };
      return d3_layout_hierarchyRebind(pack, hierarchy);
    };
    function d3_layout_packSort(a, b) {
      return a.value - b.value;
    }
    function d3_layout_packInsert(a, b) {
      var c = a._pack_next;
      a._pack_next = b;
      b._pack_prev = a;
      b._pack_next = c;
      c._pack_prev = b;
    }
    function d3_layout_packSplice(a, b) {
      a._pack_next = b;
      b._pack_prev = a;
    }
    function d3_layout_packIntersects(a, b) {
      var dx = b.x - a.x, dy = b.y - a.y, dr = a.r + b.r;
      return 0.999 * dr * dr > dx * dx + dy * dy;
    }
    function d3_layout_packSiblings(node) {
      if (!(nodes = node.children) || !(n = nodes.length))
        return;
      var nodes, xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity, a, b, c, i, j, k, n;
      function bound(node2) {
        xMin = Math.min(node2.x - node2.r, xMin);
        xMax = Math.max(node2.x + node2.r, xMax);
        yMin = Math.min(node2.y - node2.r, yMin);
        yMax = Math.max(node2.y + node2.r, yMax);
      }
      nodes.forEach(d3_layout_packLink);
      a = nodes[0];
      a.x = -a.r;
      a.y = 0;
      bound(a);
      if (n > 1) {
        b = nodes[1];
        b.x = b.r;
        b.y = 0;
        bound(b);
        if (n > 2) {
          c = nodes[2];
          d3_layout_packPlace(a, b, c);
          bound(c);
          d3_layout_packInsert(a, c);
          a._pack_prev = c;
          d3_layout_packInsert(c, b);
          b = a._pack_next;
          for (i = 3;i < n; i++) {
            d3_layout_packPlace(a, b, c = nodes[i]);
            var isect = 0, s1 = 1, s2 = 1;
            for (j = b._pack_next;j !== b; j = j._pack_next, s1++) {
              if (d3_layout_packIntersects(j, c)) {
                isect = 1;
                break;
              }
            }
            if (isect == 1) {
              for (k = a._pack_prev;k !== j._pack_prev; k = k._pack_prev, s2++) {
                if (d3_layout_packIntersects(k, c)) {
                  break;
                }
              }
            }
            if (isect) {
              if (s1 < s2 || s1 == s2 && b.r < a.r)
                d3_layout_packSplice(a, b = j);
              else
                d3_layout_packSplice(a = k, b);
              i--;
            } else {
              d3_layout_packInsert(a, c);
              b = c;
              bound(c);
            }
          }
        }
      }
      var cx = (xMin + xMax) / 2, cy = (yMin + yMax) / 2, cr = 0;
      for (i = 0;i < n; i++) {
        c = nodes[i];
        c.x -= cx;
        c.y -= cy;
        cr = Math.max(cr, c.r + Math.sqrt(c.x * c.x + c.y * c.y));
      }
      node.r = cr;
      nodes.forEach(d3_layout_packUnlink);
    }
    function d3_layout_packLink(node) {
      node._pack_next = node._pack_prev = node;
    }
    function d3_layout_packUnlink(node) {
      delete node._pack_next;
      delete node._pack_prev;
    }
    function d3_layout_packTransform(node, x, y, k) {
      var children = node.children;
      node.x = x += k * node.x;
      node.y = y += k * node.y;
      node.r *= k;
      if (children) {
        var i = -1, n = children.length;
        while (++i < n)
          d3_layout_packTransform(children[i], x, y, k);
      }
    }
    function d3_layout_packPlace(a, b, c) {
      var db = a.r + c.r, dx = b.x - a.x, dy = b.y - a.y;
      if (db && (dx || dy)) {
        var da = b.r + c.r, dc = dx * dx + dy * dy;
        da *= da;
        db *= db;
        var x = 0.5 + (db - da) / (2 * dc), y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
        c.x = a.x + x * dx + y * dy;
        c.y = a.y + x * dy - y * dx;
      } else {
        c.x = a.x + db;
        c.y = a.y;
      }
    }
    d3.layout.tree = function() {
      var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [1, 1], nodeSize = null;
      function tree(d, i) {
        var nodes = hierarchy.call(this, d, i), root0 = nodes[0], root1 = wrapTree(root0);
        d3_layout_hierarchyVisitAfter(root1, firstWalk), root1.parent.m = -root1.z;
        d3_layout_hierarchyVisitBefore(root1, secondWalk);
        if (nodeSize)
          d3_layout_hierarchyVisitBefore(root0, sizeNode);
        else {
          var left = root0, right = root0, bottom = root0;
          d3_layout_hierarchyVisitBefore(root0, function(node) {
            if (node.x < left.x)
              left = node;
            if (node.x > right.x)
              right = node;
            if (node.depth > bottom.depth)
              bottom = node;
          });
          var tx = separation(left, right) / 2 - left.x, kx = size[0] / (right.x + separation(right, left) / 2 + tx), ky = size[1] / (bottom.depth || 1);
          d3_layout_hierarchyVisitBefore(root0, function(node) {
            node.x = (node.x + tx) * kx;
            node.y = node.depth * ky;
          });
        }
        return nodes;
      }
      function wrapTree(root0) {
        var root1 = {
          A: null,
          children: [root0]
        }, queue = [root1], node1;
        while ((node1 = queue.pop()) != null) {
          for (var children = node1.children, child, i = 0, n = children.length;i < n; ++i) {
            queue.push((children[i] = child = {
              _: children[i],
              parent: node1,
              children: (child = children[i].children) && child.slice() || [],
              A: null,
              a: null,
              z: 0,
              m: 0,
              c: 0,
              s: 0,
              t: null,
              i
            }).a = child);
          }
        }
        return root1.children[0];
      }
      function firstWalk(v) {
        var children = v.children, siblings = v.parent.children, w = v.i ? siblings[v.i - 1] : null;
        if (children.length) {
          d3_layout_treeShift(v);
          var midpoint = (children[0].z + children[children.length - 1].z) / 2;
          if (w) {
            v.z = w.z + separation(v._, w._);
            v.m = v.z - midpoint;
          } else {
            v.z = midpoint;
          }
        } else if (w) {
          v.z = w.z + separation(v._, w._);
        }
        v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
      }
      function secondWalk(v) {
        v._.x = v.z + v.parent.m;
        v.m += v.parent.m;
      }
      function apportion(v, w, ancestor) {
        if (w) {
          var vip = v, vop = v, vim = w, vom = vip.parent.children[0], sip = vip.m, sop = vop.m, sim = vim.m, som = vom.m, shift;
          while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
            vom = d3_layout_treeLeft(vom);
            vop = d3_layout_treeRight(vop);
            vop.a = v;
            shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
            if (shift > 0) {
              d3_layout_treeMove(d3_layout_treeAncestor(vim, v, ancestor), v, shift);
              sip += shift;
              sop += shift;
            }
            sim += vim.m;
            sip += vip.m;
            som += vom.m;
            sop += vop.m;
          }
          if (vim && !d3_layout_treeRight(vop)) {
            vop.t = vim;
            vop.m += sim - sop;
          }
          if (vip && !d3_layout_treeLeft(vom)) {
            vom.t = vip;
            vom.m += sip - som;
            ancestor = v;
          }
        }
        return ancestor;
      }
      function sizeNode(node) {
        node.x *= size[0];
        node.y = node.depth * size[1];
      }
      tree.separation = function(x) {
        if (!arguments.length)
          return separation;
        separation = x;
        return tree;
      };
      tree.size = function(x) {
        if (!arguments.length)
          return nodeSize ? null : size;
        nodeSize = (size = x) == null ? sizeNode : null;
        return tree;
      };
      tree.nodeSize = function(x) {
        if (!arguments.length)
          return nodeSize ? size : null;
        nodeSize = (size = x) == null ? null : sizeNode;
        return tree;
      };
      return d3_layout_hierarchyRebind(tree, hierarchy);
    };
    function d3_layout_treeSeparation(a, b) {
      return a.parent == b.parent ? 1 : 2;
    }
    function d3_layout_treeLeft(v) {
      var children = v.children;
      return children.length ? children[0] : v.t;
    }
    function d3_layout_treeRight(v) {
      var children = v.children, n;
      return (n = children.length) ? children[n - 1] : v.t;
    }
    function d3_layout_treeMove(wm, wp, shift) {
      var change = shift / (wp.i - wm.i);
      wp.c -= change;
      wp.s += shift;
      wm.c += change;
      wp.z += shift;
      wp.m += shift;
    }
    function d3_layout_treeShift(v) {
      var shift = 0, change = 0, children = v.children, i = children.length, w;
      while (--i >= 0) {
        w = children[i];
        w.z += shift;
        w.m += shift;
        shift += w.s + (change += w.c);
      }
    }
    function d3_layout_treeAncestor(vim, v, ancestor) {
      return vim.a.parent === v.parent ? vim.a : ancestor;
    }
    d3.layout.cluster = function() {
      var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [1, 1], nodeSize = false;
      function cluster(d, i) {
        var nodes = hierarchy.call(this, d, i), root = nodes[0], previousNode, x = 0;
        d3_layout_hierarchyVisitAfter(root, function(node) {
          var children = node.children;
          if (children && children.length) {
            node.x = d3_layout_clusterX(children);
            node.y = d3_layout_clusterY(children);
          } else {
            node.x = previousNode ? x += separation(node, previousNode) : 0;
            node.y = 0;
            previousNode = node;
          }
        });
        var left = d3_layout_clusterLeft(root), right = d3_layout_clusterRight(root), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2;
        d3_layout_hierarchyVisitAfter(root, nodeSize ? function(node) {
          node.x = (node.x - root.x) * size[0];
          node.y = (root.y - node.y) * size[1];
        } : function(node) {
          node.x = (node.x - x0) / (x1 - x0) * size[0];
          node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1];
        });
        return nodes;
      }
      cluster.separation = function(x) {
        if (!arguments.length)
          return separation;
        separation = x;
        return cluster;
      };
      cluster.size = function(x) {
        if (!arguments.length)
          return nodeSize ? null : size;
        nodeSize = (size = x) == null;
        return cluster;
      };
      cluster.nodeSize = function(x) {
        if (!arguments.length)
          return nodeSize ? size : null;
        nodeSize = (size = x) != null;
        return cluster;
      };
      return d3_layout_hierarchyRebind(cluster, hierarchy);
    };
    function d3_layout_clusterY(children) {
      return 1 + d3.max(children, function(child) {
        return child.y;
      });
    }
    function d3_layout_clusterX(children) {
      return children.reduce(function(x, child) {
        return x + child.x;
      }, 0) / children.length;
    }
    function d3_layout_clusterLeft(node) {
      var children = node.children;
      return children && children.length ? d3_layout_clusterLeft(children[0]) : node;
    }
    function d3_layout_clusterRight(node) {
      var children = node.children, n;
      return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node;
    }
    d3.layout.treemap = function() {
      var hierarchy = d3.layout.hierarchy(), round = Math.round, size = [1, 1], padding = null, pad = d3_layout_treemapPadNull, sticky = false, stickies, mode = "squarify", ratio = 0.5 * (1 + Math.sqrt(5));
      function scale(children, k) {
        var i = -1, n = children.length, child, area;
        while (++i < n) {
          area = (child = children[i]).value * (k < 0 ? 0 : k);
          child.area = isNaN(area) || area <= 0 ? 0 : area;
        }
      }
      function squarify(node) {
        var children = node.children;
        if (children && children.length) {
          var rect = pad(node), row = [], remaining = children.slice(), child, best = Infinity, score, u = mode === "slice" ? rect.dx : mode === "dice" ? rect.dy : mode === "slice-dice" ? node.depth & 1 ? rect.dy : rect.dx : Math.min(rect.dx, rect.dy), n;
          scale(remaining, rect.dx * rect.dy / node.value);
          row.area = 0;
          while ((n = remaining.length) > 0) {
            row.push(child = remaining[n - 1]);
            row.area += child.area;
            if (mode !== "squarify" || (score = worst(row, u)) <= best) {
              remaining.pop();
              best = score;
            } else {
              row.area -= row.pop().area;
              position(row, u, rect, false);
              u = Math.min(rect.dx, rect.dy);
              row.length = row.area = 0;
              best = Infinity;
            }
          }
          if (row.length) {
            position(row, u, rect, true);
            row.length = row.area = 0;
          }
          children.forEach(squarify);
        }
      }
      function stickify(node) {
        var children = node.children;
        if (children && children.length) {
          var rect = pad(node), remaining = children.slice(), child, row = [];
          scale(remaining, rect.dx * rect.dy / node.value);
          row.area = 0;
          while (child = remaining.pop()) {
            row.push(child);
            row.area += child.area;
            if (child.z != null) {
              position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length);
              row.length = row.area = 0;
            }
          }
          children.forEach(stickify);
        }
      }
      function worst(row, u) {
        var s = row.area, r, rmax = 0, rmin = Infinity, i = -1, n = row.length;
        while (++i < n) {
          if (!(r = row[i].area))
            continue;
          if (r < rmin)
            rmin = r;
          if (r > rmax)
            rmax = r;
        }
        s *= s;
        u *= u;
        return s ? Math.max(u * rmax * ratio / s, s / (u * rmin * ratio)) : Infinity;
      }
      function position(row, u, rect, flush) {
        var i = -1, n = row.length, x = rect.x, y = rect.y, v = u ? round(row.area / u) : 0, o;
        if (u == rect.dx) {
          if (flush || v > rect.dy)
            v = rect.dy;
          while (++i < n) {
            o = row[i];
            o.x = x;
            o.y = y;
            o.dy = v;
            x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0);
          }
          o.z = true;
          o.dx += rect.x + rect.dx - x;
          rect.y += v;
          rect.dy -= v;
        } else {
          if (flush || v > rect.dx)
            v = rect.dx;
          while (++i < n) {
            o = row[i];
            o.x = x;
            o.y = y;
            o.dx = v;
            y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0);
          }
          o.z = false;
          o.dy += rect.y + rect.dy - y;
          rect.x += v;
          rect.dx -= v;
        }
      }
      function treemap(d) {
        var nodes = stickies || hierarchy(d), root = nodes[0];
        root.x = root.y = 0;
        if (root.value)
          root.dx = size[0], root.dy = size[1];
        else
          root.dx = root.dy = 0;
        if (stickies)
          hierarchy.revalue(root);
        scale([root], root.dx * root.dy / root.value);
        (stickies ? stickify : squarify)(root);
        if (sticky)
          stickies = nodes;
        return nodes;
      }
      treemap.size = function(x) {
        if (!arguments.length)
          return size;
        size = x;
        return treemap;
      };
      treemap.padding = function(x) {
        if (!arguments.length)
          return padding;
        function padFunction(node) {
          var p = x.call(treemap, node, node.depth);
          return p == null ? d3_layout_treemapPadNull(node) : d3_layout_treemapPad(node, typeof p === "number" ? [p, p, p, p] : p);
        }
        function padConstant(node) {
          return d3_layout_treemapPad(node, x);
        }
        var type;
        pad = (padding = x) == null ? d3_layout_treemapPadNull : (type = typeof x) === "function" ? padFunction : type === "number" ? (x = [x, x, x, x], padConstant) : padConstant;
        return treemap;
      };
      treemap.round = function(x) {
        if (!arguments.length)
          return round != Number;
        round = x ? Math.round : Number;
        return treemap;
      };
      treemap.sticky = function(x) {
        if (!arguments.length)
          return sticky;
        sticky = x;
        stickies = null;
        return treemap;
      };
      treemap.ratio = function(x) {
        if (!arguments.length)
          return ratio;
        ratio = x;
        return treemap;
      };
      treemap.mode = function(x) {
        if (!arguments.length)
          return mode;
        mode = x + "";
        return treemap;
      };
      return d3_layout_hierarchyRebind(treemap, hierarchy);
    };
    function d3_layout_treemapPadNull(node) {
      return {
        x: node.x,
        y: node.y,
        dx: node.dx,
        dy: node.dy
      };
    }
    function d3_layout_treemapPad(node, padding) {
      var x = node.x + padding[3], y = node.y + padding[0], dx = node.dx - padding[1] - padding[3], dy = node.dy - padding[0] - padding[2];
      if (dx < 0) {
        x += dx / 2;
        dx = 0;
      }
      if (dy < 0) {
        y += dy / 2;
        dy = 0;
      }
      return {
        x,
        y,
        dx,
        dy
      };
    }
    d3.random = {
      normal: function(µ, σ) {
        var n = arguments.length;
        if (n < 2)
          σ = 1;
        if (n < 1)
          µ = 0;
        return function() {
          var x, y, r;
          do {
            x = Math.random() * 2 - 1;
            y = Math.random() * 2 - 1;
            r = x * x + y * y;
          } while (!r || r > 1);
          return µ + σ * x * Math.sqrt(-2 * Math.log(r) / r);
        };
      },
      logNormal: function() {
        var random = d3.random.normal.apply(d3, arguments);
        return function() {
          return Math.exp(random());
        };
      },
      bates: function(m) {
        var random = d3.random.irwinHall(m);
        return function() {
          return random() / m;
        };
      },
      irwinHall: function(m) {
        return function() {
          for (var s = 0, j = 0;j < m; j++)
            s += Math.random();
          return s;
        };
      }
    };
    d3.scale = {};
    function d3_scaleExtent(domain) {
      var start = domain[0], stop = domain[domain.length - 1];
      return start < stop ? [start, stop] : [stop, start];
    }
    function d3_scaleRange(scale) {
      return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
    }
    function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
      var u = uninterpolate(domain[0], domain[1]), i = interpolate(range[0], range[1]);
      return function(x) {
        return i(u(x));
      };
    }
    function d3_scale_nice(domain, nice) {
      var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], dx;
      if (x1 < x0) {
        dx = i0, i0 = i1, i1 = dx;
        dx = x0, x0 = x1, x1 = dx;
      }
      domain[i0] = nice.floor(x0);
      domain[i1] = nice.ceil(x1);
      return domain;
    }
    function d3_scale_niceStep(step) {
      return step ? {
        floor: function(x) {
          return Math.floor(x / step) * step;
        },
        ceil: function(x) {
          return Math.ceil(x / step) * step;
        }
      } : d3_scale_niceIdentity;
    }
    var d3_scale_niceIdentity = {
      floor: d3_identity,
      ceil: d3_identity
    };
    function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
      var u = [], i = [], j = 0, k = Math.min(domain.length, range.length) - 1;
      if (domain[k] < domain[0]) {
        domain = domain.slice().reverse();
        range = range.slice().reverse();
      }
      while (++j <= k) {
        u.push(uninterpolate(domain[j - 1], domain[j]));
        i.push(interpolate(range[j - 1], range[j]));
      }
      return function(x) {
        var j2 = d3.bisect(domain, x, 1, k) - 1;
        return i[j2](u[j2](x));
      };
    }
    d3.scale.linear = function() {
      return d3_scale_linear([0, 1], [0, 1], d3_interpolate, false);
    };
    function d3_scale_linear(domain, range, interpolate, clamp) {
      var output, input;
      function rescale() {
        var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear, uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
        output = linear(domain, range, uninterpolate, interpolate);
        input = linear(range, domain, uninterpolate, d3_interpolate);
        return scale;
      }
      function scale(x) {
        return output(x);
      }
      scale.invert = function(y) {
        return input(y);
      };
      scale.domain = function(x) {
        if (!arguments.length)
          return domain;
        domain = x.map(Number);
        return rescale();
      };
      scale.range = function(x) {
        if (!arguments.length)
          return range;
        range = x;
        return rescale();
      };
      scale.rangeRound = function(x) {
        return scale.range(x).interpolate(d3_interpolateRound);
      };
      scale.clamp = function(x) {
        if (!arguments.length)
          return clamp;
        clamp = x;
        return rescale();
      };
      scale.interpolate = function(x) {
        if (!arguments.length)
          return interpolate;
        interpolate = x;
        return rescale();
      };
      scale.ticks = function(m) {
        return d3_scale_linearTicks(domain, m);
      };
      scale.tickFormat = function(m, format) {
        return d3_scale_linearTickFormat(domain, m, format);
      };
      scale.nice = function(m) {
        d3_scale_linearNice(domain, m);
        return rescale();
      };
      scale.copy = function() {
        return d3_scale_linear(domain, range, interpolate, clamp);
      };
      return rescale();
    }
    function d3_scale_linearRebind(scale, linear) {
      return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
    }
    function d3_scale_linearNice(domain, m) {
      d3_scale_nice(domain, d3_scale_niceStep(d3_scale_linearTickRange(domain, m)[2]));
      d3_scale_nice(domain, d3_scale_niceStep(d3_scale_linearTickRange(domain, m)[2]));
      return domain;
    }
    function d3_scale_linearTickRange(domain, m) {
      if (m == null)
        m = 10;
      var extent = d3_scaleExtent(domain), span = extent[1] - extent[0], step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)), err = m / span * step;
      if (err <= 0.15)
        step *= 10;
      else if (err <= 0.35)
        step *= 5;
      else if (err <= 0.75)
        step *= 2;
      extent[0] = Math.ceil(extent[0] / step) * step;
      extent[1] = Math.floor(extent[1] / step) * step + step * 0.5;
      extent[2] = step;
      return extent;
    }
    function d3_scale_linearTicks(domain, m) {
      return d3.range.apply(d3, d3_scale_linearTickRange(domain, m));
    }
    function d3_scale_linearTickFormat(domain, m, format) {
      var range = d3_scale_linearTickRange(domain, m);
      if (format) {
        var match = d3_format_re.exec(format);
        match.shift();
        if (match[8] === "s") {
          var prefix = d3.formatPrefix(Math.max(abs(range[0]), abs(range[1])));
          if (!match[7])
            match[7] = "." + d3_scale_linearPrecision(prefix.scale(range[2]));
          match[8] = "f";
          format = d3.format(match.join(""));
          return function(d) {
            return format(prefix.scale(d)) + prefix.symbol;
          };
        }
        if (!match[7])
          match[7] = "." + d3_scale_linearFormatPrecision(match[8], range);
        format = match.join("");
      } else {
        format = ",." + d3_scale_linearPrecision(range[2]) + "f";
      }
      return d3.format(format);
    }
    var d3_scale_linearFormatSignificant = {
      s: 1,
      g: 1,
      p: 1,
      r: 1,
      e: 1
    };
    function d3_scale_linearPrecision(value) {
      return -Math.floor(Math.log(value) / Math.LN10 + 0.01);
    }
    function d3_scale_linearFormatPrecision(type, range) {
      var p = d3_scale_linearPrecision(range[2]);
      return type in d3_scale_linearFormatSignificant ? Math.abs(p - d3_scale_linearPrecision(Math.max(abs(range[0]), abs(range[1])))) + +(type !== "e") : p - (type === "%") * 2;
    }
    d3.scale.log = function() {
      return d3_scale_log(d3.scale.linear().domain([0, 1]), 10, true, [1, 10]);
    };
    function d3_scale_log(linear, base, positive, domain) {
      function log(x) {
        return (positive ? Math.log(x < 0 ? 0 : x) : -Math.log(x > 0 ? 0 : -x)) / Math.log(base);
      }
      function pow(x) {
        return positive ? Math.pow(base, x) : -Math.pow(base, -x);
      }
      function scale(x) {
        return linear(log(x));
      }
      scale.invert = function(x) {
        return pow(linear.invert(x));
      };
      scale.domain = function(x) {
        if (!arguments.length)
          return domain;
        positive = x[0] >= 0;
        linear.domain((domain = x.map(Number)).map(log));
        return scale;
      };
      scale.base = function(_) {
        if (!arguments.length)
          return base;
        base = +_;
        linear.domain(domain.map(log));
        return scale;
      };
      scale.nice = function() {
        var niced = d3_scale_nice(domain.map(log), positive ? Math : d3_scale_logNiceNegative);
        linear.domain(niced);
        domain = niced.map(pow);
        return scale;
      };
      scale.ticks = function() {
        var extent = d3_scaleExtent(domain), ticks = [], u = extent[0], v = extent[1], i = Math.floor(log(u)), j = Math.ceil(log(v)), n = base % 1 ? 2 : base;
        if (isFinite(j - i)) {
          if (positive) {
            for (;i < j; i++)
              for (var k = 1;k < n; k++)
                ticks.push(pow(i) * k);
            ticks.push(pow(i));
          } else {
            ticks.push(pow(i));
            for (;i++ < j; )
              for (var k = n - 1;k > 0; k--)
                ticks.push(pow(i) * k);
          }
          for (i = 0;ticks[i] < u; i++) {}
          for (j = ticks.length;ticks[j - 1] > v; j--) {}
          ticks = ticks.slice(i, j);
        }
        return ticks;
      };
      scale.tickFormat = function(n, format) {
        if (!arguments.length)
          return d3_scale_logFormat;
        if (arguments.length < 2)
          format = d3_scale_logFormat;
        else if (typeof format !== "function")
          format = d3.format(format);
        var k = Math.max(1, base * n / scale.ticks().length);
        return function(d) {
          var i = d / pow(Math.round(log(d)));
          if (i * base < base - 0.5)
            i *= base;
          return i <= k ? format(d) : "";
        };
      };
      scale.copy = function() {
        return d3_scale_log(linear.copy(), base, positive, domain);
      };
      return d3_scale_linearRebind(scale, linear);
    }
    var d3_scale_logFormat = d3.format(".0e"), d3_scale_logNiceNegative = {
      floor: function(x) {
        return -Math.ceil(-x);
      },
      ceil: function(x) {
        return -Math.floor(-x);
      }
    };
    d3.scale.pow = function() {
      return d3_scale_pow(d3.scale.linear(), 1, [0, 1]);
    };
    function d3_scale_pow(linear, exponent, domain) {
      var powp = d3_scale_powPow(exponent), powb = d3_scale_powPow(1 / exponent);
      function scale(x) {
        return linear(powp(x));
      }
      scale.invert = function(x) {
        return powb(linear.invert(x));
      };
      scale.domain = function(x) {
        if (!arguments.length)
          return domain;
        linear.domain((domain = x.map(Number)).map(powp));
        return scale;
      };
      scale.ticks = function(m) {
        return d3_scale_linearTicks(domain, m);
      };
      scale.tickFormat = function(m, format) {
        return d3_scale_linearTickFormat(domain, m, format);
      };
      scale.nice = function(m) {
        return scale.domain(d3_scale_linearNice(domain, m));
      };
      scale.exponent = function(x) {
        if (!arguments.length)
          return exponent;
        powp = d3_scale_powPow(exponent = x);
        powb = d3_scale_powPow(1 / exponent);
        linear.domain(domain.map(powp));
        return scale;
      };
      scale.copy = function() {
        return d3_scale_pow(linear.copy(), exponent, domain);
      };
      return d3_scale_linearRebind(scale, linear);
    }
    function d3_scale_powPow(e) {
      return function(x) {
        return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e);
      };
    }
    d3.scale.sqrt = function() {
      return d3.scale.pow().exponent(0.5);
    };
    d3.scale.ordinal = function() {
      return d3_scale_ordinal([], {
        t: "range",
        a: [[]]
      });
    };
    function d3_scale_ordinal(domain, ranger) {
      var index, range, rangeBand;
      function scale(x) {
        return range[((index.get(x) || (ranger.t === "range" ? index.set(x, domain.push(x)) : NaN)) - 1) % range.length];
      }
      function steps(start, step) {
        return d3.range(domain.length).map(function(i) {
          return start + step * i;
        });
      }
      scale.domain = function(x) {
        if (!arguments.length)
          return domain;
        domain = [];
        index = new d3_Map;
        var i = -1, n = x.length, xi;
        while (++i < n)
          if (!index.has(xi = x[i]))
            index.set(xi, domain.push(xi));
        return scale[ranger.t].apply(scale, ranger.a);
      };
      scale.range = function(x) {
        if (!arguments.length)
          return range;
        range = x;
        rangeBand = 0;
        ranger = {
          t: "range",
          a: arguments
        };
        return scale;
      };
      scale.rangePoints = function(x, padding) {
        if (arguments.length < 2)
          padding = 0;
        var start = x[0], stop = x[1], step = domain.length < 2 ? (start = (start + stop) / 2, 0) : (stop - start) / (domain.length - 1 + padding);
        range = steps(start + step * padding / 2, step);
        rangeBand = 0;
        ranger = {
          t: "rangePoints",
          a: arguments
        };
        return scale;
      };
      scale.rangeRoundPoints = function(x, padding) {
        if (arguments.length < 2)
          padding = 0;
        var start = x[0], stop = x[1], step = domain.length < 2 ? (start = stop = Math.round((start + stop) / 2), 0) : (stop - start) / (domain.length - 1 + padding) | 0;
        range = steps(start + Math.round(step * padding / 2 + (stop - start - (domain.length - 1 + padding) * step) / 2), step);
        rangeBand = 0;
        ranger = {
          t: "rangeRoundPoints",
          a: arguments
        };
        return scale;
      };
      scale.rangeBands = function(x, padding, outerPadding) {
        if (arguments.length < 2)
          padding = 0;
        if (arguments.length < 3)
          outerPadding = padding;
        var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = (stop - start) / (domain.length - padding + 2 * outerPadding);
        range = steps(start + step * outerPadding, step);
        if (reverse)
          range.reverse();
        rangeBand = step * (1 - padding);
        ranger = {
          t: "rangeBands",
          a: arguments
        };
        return scale;
      };
      scale.rangeRoundBands = function(x, padding, outerPadding) {
        if (arguments.length < 2)
          padding = 0;
        if (arguments.length < 3)
          outerPadding = padding;
        var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = Math.floor((stop - start) / (domain.length - padding + 2 * outerPadding));
        range = steps(start + Math.round((stop - start - (domain.length - padding) * step) / 2), step);
        if (reverse)
          range.reverse();
        rangeBand = Math.round(step * (1 - padding));
        ranger = {
          t: "rangeRoundBands",
          a: arguments
        };
        return scale;
      };
      scale.rangeBand = function() {
        return rangeBand;
      };
      scale.rangeExtent = function() {
        return d3_scaleExtent(ranger.a[0]);
      };
      scale.copy = function() {
        return d3_scale_ordinal(domain, ranger);
      };
      return scale.domain(domain);
    }
    d3.scale.category10 = function() {
      return d3.scale.ordinal().range(d3_category10);
    };
    d3.scale.category20 = function() {
      return d3.scale.ordinal().range(d3_category20);
    };
    d3.scale.category20b = function() {
      return d3.scale.ordinal().range(d3_category20b);
    };
    d3.scale.category20c = function() {
      return d3.scale.ordinal().range(d3_category20c);
    };
    var d3_category10 = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(d3_rgbString);
    var d3_category20 = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(d3_rgbString);
    var d3_category20b = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(d3_rgbString);
    var d3_category20c = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(d3_rgbString);
    d3.scale.quantile = function() {
      return d3_scale_quantile([], []);
    };
    function d3_scale_quantile(domain, range) {
      var thresholds;
      function rescale() {
        var k = 0, q = range.length;
        thresholds = [];
        while (++k < q)
          thresholds[k - 1] = d3.quantile(domain, k / q);
        return scale;
      }
      function scale(x) {
        if (!isNaN(x = +x))
          return range[d3.bisect(thresholds, x)];
      }
      scale.domain = function(x) {
        if (!arguments.length)
          return domain;
        domain = x.map(d3_number).filter(d3_numeric).sort(d3_ascending);
        return rescale();
      };
      scale.range = function(x) {
        if (!arguments.length)
          return range;
        range = x;
        return rescale();
      };
      scale.quantiles = function() {
        return thresholds;
      };
      scale.invertExtent = function(y) {
        y = range.indexOf(y);
        return y < 0 ? [NaN, NaN] : [y > 0 ? thresholds[y - 1] : domain[0], y < thresholds.length ? thresholds[y] : domain[domain.length - 1]];
      };
      scale.copy = function() {
        return d3_scale_quantile(domain, range);
      };
      return rescale();
    }
    d3.scale.quantize = function() {
      return d3_scale_quantize(0, 1, [0, 1]);
    };
    function d3_scale_quantize(x0, x1, range) {
      var kx, i;
      function scale(x) {
        return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
      }
      function rescale() {
        kx = range.length / (x1 - x0);
        i = range.length - 1;
        return scale;
      }
      scale.domain = function(x) {
        if (!arguments.length)
          return [x0, x1];
        x0 = +x[0];
        x1 = +x[x.length - 1];
        return rescale();
      };
      scale.range = function(x) {
        if (!arguments.length)
          return range;
        range = x;
        return rescale();
      };
      scale.invertExtent = function(y) {
        y = range.indexOf(y);
        y = y < 0 ? NaN : y / kx + x0;
        return [y, y + 1 / kx];
      };
      scale.copy = function() {
        return d3_scale_quantize(x0, x1, range);
      };
      return rescale();
    }
    d3.scale.threshold = function() {
      return d3_scale_threshold([0.5], [0, 1]);
    };
    function d3_scale_threshold(domain, range) {
      function scale(x) {
        if (x <= x)
          return range[d3.bisect(domain, x)];
      }
      scale.domain = function(_) {
        if (!arguments.length)
          return domain;
        domain = _;
        return scale;
      };
      scale.range = function(_) {
        if (!arguments.length)
          return range;
        range = _;
        return scale;
      };
      scale.invertExtent = function(y) {
        y = range.indexOf(y);
        return [domain[y - 1], domain[y]];
      };
      scale.copy = function() {
        return d3_scale_threshold(domain, range);
      };
      return scale;
    }
    d3.scale.identity = function() {
      return d3_scale_identity([0, 1]);
    };
    function d3_scale_identity(domain) {
      function identity(x) {
        return +x;
      }
      identity.invert = identity;
      identity.domain = identity.range = function(x) {
        if (!arguments.length)
          return domain;
        domain = x.map(identity);
        return identity;
      };
      identity.ticks = function(m) {
        return d3_scale_linearTicks(domain, m);
      };
      identity.tickFormat = function(m, format) {
        return d3_scale_linearTickFormat(domain, m, format);
      };
      identity.copy = function() {
        return d3_scale_identity(domain);
      };
      return identity;
    }
    d3.svg = {};
    function d3_zero() {
      return 0;
    }
    d3.svg.arc = function() {
      var innerRadius = d3_svg_arcInnerRadius, outerRadius = d3_svg_arcOuterRadius, cornerRadius = d3_zero, padRadius = d3_svg_arcAuto, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle, padAngle = d3_svg_arcPadAngle;
      function arc() {
        var r0 = Math.max(0, +innerRadius.apply(this, arguments)), r1 = Math.max(0, +outerRadius.apply(this, arguments)), a0 = startAngle.apply(this, arguments) - half_, a1 = endAngle.apply(this, arguments) - half_, da = Math.abs(a1 - a0), cw = a0 > a1 ? 0 : 1;
        if (r1 < r0)
          rc = r1, r1 = r0, r0 = rc;
        if (da >= τ_)
          return circleSegment(r1, cw) + (r0 ? circleSegment(r0, 1 - cw) : "") + "Z";
        var rc, cr, rp, ap, p0 = 0, p1 = 0, x0, y0, x1, y1, x2, y2, x3, y3, path = [];
        if (ap = (+padAngle.apply(this, arguments) || 0) / 2) {
          rp = padRadius === d3_svg_arcAuto ? Math.sqrt(r0 * r0 + r1 * r1) : +padRadius.apply(this, arguments);
          if (!cw)
            p1 *= -1;
          if (r1)
            p1 = d3_asin(rp / r1 * Math.sin(ap));
          if (r0)
            p0 = d3_asin(rp / r0 * Math.sin(ap));
        }
        if (r1) {
          x0 = r1 * Math.cos(a0 + p1);
          y0 = r1 * Math.sin(a0 + p1);
          x1 = r1 * Math.cos(a1 - p1);
          y1 = r1 * Math.sin(a1 - p1);
          var l1 = Math.abs(a1 - a0 - 2 * p1) <= π ? 0 : 1;
          if (p1 && d3_svg_arcSweep(x0, y0, x1, y1) === cw ^ l1) {
            var h1 = (a0 + a1) / 2;
            x0 = r1 * Math.cos(h1);
            y0 = r1 * Math.sin(h1);
            x1 = y1 = null;
          }
        } else {
          x0 = y0 = 0;
        }
        if (r0) {
          x2 = r0 * Math.cos(a1 - p0);
          y2 = r0 * Math.sin(a1 - p0);
          x3 = r0 * Math.cos(a0 + p0);
          y3 = r0 * Math.sin(a0 + p0);
          var l0 = Math.abs(a0 - a1 + 2 * p0) <= π ? 0 : 1;
          if (p0 && d3_svg_arcSweep(x2, y2, x3, y3) === 1 - cw ^ l0) {
            var h0 = (a0 + a1) / 2;
            x2 = r0 * Math.cos(h0);
            y2 = r0 * Math.sin(h0);
            x3 = y3 = null;
          }
        } else {
          x2 = y2 = 0;
        }
        if (da > ε && (rc = Math.min(Math.abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments))) > 0.001) {
          cr = r0 < r1 ^ cw ? 0 : 1;
          var rc1 = rc, rc0 = rc;
          if (da < π) {
            var oc = x3 == null ? [x2, y2] : x1 == null ? [x0, y0] : d3_geom_polygonIntersect([x0, y0], [x3, y3], [x1, y1], [x2, y2]), ax = x0 - oc[0], ay = y0 - oc[1], bx = x1 - oc[0], by = y1 - oc[1], kc = 1 / Math.sin(Math.acos((ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))) / 2), lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
            rc0 = Math.min(rc, (r0 - lc) / (kc - 1));
            rc1 = Math.min(rc, (r1 - lc) / (kc + 1));
          }
          if (x1 != null) {
            var t30 = d3_svg_arcCornerTangents(x3 == null ? [x2, y2] : [x3, y3], [x0, y0], r1, rc1, cw), t12 = d3_svg_arcCornerTangents([x1, y1], [x2, y2], r1, rc1, cw);
            if (rc === rc1) {
              path.push("M", t30[0], "A", rc1, ",", rc1, " 0 0,", cr, " ", t30[1], "A", r1, ",", r1, " 0 ", 1 - cw ^ d3_svg_arcSweep(t30[1][0], t30[1][1], t12[1][0], t12[1][1]), ",", cw, " ", t12[1], "A", rc1, ",", rc1, " 0 0,", cr, " ", t12[0]);
            } else {
              path.push("M", t30[0], "A", rc1, ",", rc1, " 0 1,", cr, " ", t12[0]);
            }
          } else {
            path.push("M", x0, ",", y0);
          }
          if (x3 != null) {
            var t03 = d3_svg_arcCornerTangents([x0, y0], [x3, y3], r0, -rc0, cw), t21 = d3_svg_arcCornerTangents([x2, y2], x1 == null ? [x0, y0] : [x1, y1], r0, -rc0, cw);
            if (rc === rc0) {
              path.push("L", t21[0], "A", rc0, ",", rc0, " 0 0,", cr, " ", t21[1], "A", r0, ",", r0, " 0 ", cw ^ d3_svg_arcSweep(t21[1][0], t21[1][1], t03[1][0], t03[1][1]), ",", 1 - cw, " ", t03[1], "A", rc0, ",", rc0, " 0 0,", cr, " ", t03[0]);
            } else {
              path.push("L", t21[0], "A", rc0, ",", rc0, " 0 0,", cr, " ", t03[0]);
            }
          } else {
            path.push("L", x2, ",", y2);
          }
        } else {
          path.push("M", x0, ",", y0);
          if (x1 != null)
            path.push("A", r1, ",", r1, " 0 ", l1, ",", cw, " ", x1, ",", y1);
          path.push("L", x2, ",", y2);
          if (x3 != null)
            path.push("A", r0, ",", r0, " 0 ", l0, ",", 1 - cw, " ", x3, ",", y3);
        }
        path.push("Z");
        return path.join("");
      }
      function circleSegment(r1, cw) {
        return "M0," + r1 + "A" + r1 + "," + r1 + " 0 1," + cw + " 0," + -r1 + "A" + r1 + "," + r1 + " 0 1," + cw + " 0," + r1;
      }
      arc.innerRadius = function(v) {
        if (!arguments.length)
          return innerRadius;
        innerRadius = d3_functor(v);
        return arc;
      };
      arc.outerRadius = function(v) {
        if (!arguments.length)
          return outerRadius;
        outerRadius = d3_functor(v);
        return arc;
      };
      arc.cornerRadius = function(v) {
        if (!arguments.length)
          return cornerRadius;
        cornerRadius = d3_functor(v);
        return arc;
      };
      arc.padRadius = function(v) {
        if (!arguments.length)
          return padRadius;
        padRadius = v == d3_svg_arcAuto ? d3_svg_arcAuto : d3_functor(v);
        return arc;
      };
      arc.startAngle = function(v) {
        if (!arguments.length)
          return startAngle;
        startAngle = d3_functor(v);
        return arc;
      };
      arc.endAngle = function(v) {
        if (!arguments.length)
          return endAngle;
        endAngle = d3_functor(v);
        return arc;
      };
      arc.padAngle = function(v) {
        if (!arguments.length)
          return padAngle;
        padAngle = d3_functor(v);
        return arc;
      };
      arc.centroid = function() {
        var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2, a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - half_;
        return [Math.cos(a) * r, Math.sin(a) * r];
      };
      return arc;
    };
    var d3_svg_arcAuto = "auto";
    function d3_svg_arcInnerRadius(d) {
      return d.innerRadius;
    }
    function d3_svg_arcOuterRadius(d) {
      return d.outerRadius;
    }
    function d3_svg_arcStartAngle(d) {
      return d.startAngle;
    }
    function d3_svg_arcEndAngle(d) {
      return d.endAngle;
    }
    function d3_svg_arcPadAngle(d) {
      return d && d.padAngle;
    }
    function d3_svg_arcSweep(x0, y0, x1, y1) {
      return (x0 - x1) * y0 - (y0 - y1) * x0 > 0 ? 0 : 1;
    }
    function d3_svg_arcCornerTangents(p0, p1, r1, rc, cw) {
      var x01 = p0[0] - p1[0], y01 = p0[1] - p1[1], lo = (cw ? rc : -rc) / Math.sqrt(x01 * x01 + y01 * y01), ox = lo * y01, oy = -lo * x01, x1 = p0[0] + ox, y1 = p0[1] + oy, x2 = p1[0] + ox, y2 = p1[1] + oy, x3 = (x1 + x2) / 2, y3 = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, d2 = dx * dx + dy * dy, r = r1 - rc, D = x1 * y2 - x2 * y1, d = (dy < 0 ? -1 : 1) * Math.sqrt(Math.max(0, r * r * d2 - D * D)), cx0 = (D * dy - dx * d) / d2, cy0 = (-D * dx - dy * d) / d2, cx1 = (D * dy + dx * d) / d2, cy1 = (-D * dx + dy * d) / d2, dx0 = cx0 - x3, dy0 = cy0 - y3, dx1 = cx1 - x3, dy1 = cy1 - y3;
      if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1)
        cx0 = cx1, cy0 = cy1;
      return [[cx0 - ox, cy0 - oy], [cx0 * r1 / r, cy0 * r1 / r]];
    }
    function d3_svg_line(projection) {
      var x = d3_geom_pointX, y = d3_geom_pointY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, tension = 0.7;
      function line(data) {
        var segments = [], points = [], i = -1, n = data.length, d, fx = d3_functor(x), fy = d3_functor(y);
        function segment() {
          segments.push("M", interpolate(projection(points), tension));
        }
        while (++i < n) {
          if (defined.call(this, d = data[i], i)) {
            points.push([+fx.call(this, d, i), +fy.call(this, d, i)]);
          } else if (points.length) {
            segment();
            points = [];
          }
        }
        if (points.length)
          segment();
        return segments.length ? segments.join("") : null;
      }
      line.x = function(_) {
        if (!arguments.length)
          return x;
        x = _;
        return line;
      };
      line.y = function(_) {
        if (!arguments.length)
          return y;
        y = _;
        return line;
      };
      line.defined = function(_) {
        if (!arguments.length)
          return defined;
        defined = _;
        return line;
      };
      line.interpolate = function(_) {
        if (!arguments.length)
          return interpolateKey;
        if (typeof _ === "function")
          interpolateKey = interpolate = _;
        else
          interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
        return line;
      };
      line.tension = function(_) {
        if (!arguments.length)
          return tension;
        tension = _;
        return line;
      };
      return line;
    }
    d3.svg.line = function() {
      return d3_svg_line(d3_identity);
    };
    var d3_svg_lineInterpolators = d3.map({
      linear: d3_svg_lineLinear,
      "linear-closed": d3_svg_lineLinearClosed,
      step: d3_svg_lineStep,
      "step-before": d3_svg_lineStepBefore,
      "step-after": d3_svg_lineStepAfter,
      basis: d3_svg_lineBasis,
      "basis-open": d3_svg_lineBasisOpen,
      "basis-closed": d3_svg_lineBasisClosed,
      bundle: d3_svg_lineBundle,
      cardinal: d3_svg_lineCardinal,
      "cardinal-open": d3_svg_lineCardinalOpen,
      "cardinal-closed": d3_svg_lineCardinalClosed,
      monotone: d3_svg_lineMonotone
    });
    d3_svg_lineInterpolators.forEach(function(key, value) {
      value.key = key;
      value.closed = /-closed$/.test(key);
    });
    function d3_svg_lineLinear(points) {
      return points.length > 1 ? points.join("L") : points + "Z";
    }
    function d3_svg_lineLinearClosed(points) {
      return points.join("L") + "Z";
    }
    function d3_svg_lineStep(points) {
      var i = 0, n = points.length, p = points[0], path = [p[0], ",", p[1]];
      while (++i < n)
        path.push("H", (p[0] + (p = points[i])[0]) / 2, "V", p[1]);
      if (n > 1)
        path.push("H", p[0]);
      return path.join("");
    }
    function d3_svg_lineStepBefore(points) {
      var i = 0, n = points.length, p = points[0], path = [p[0], ",", p[1]];
      while (++i < n)
        path.push("V", (p = points[i])[1], "H", p[0]);
      return path.join("");
    }
    function d3_svg_lineStepAfter(points) {
      var i = 0, n = points.length, p = points[0], path = [p[0], ",", p[1]];
      while (++i < n)
        path.push("H", (p = points[i])[0], "V", p[1]);
      return path.join("");
    }
    function d3_svg_lineCardinalOpen(points, tension) {
      return points.length < 4 ? d3_svg_lineLinear(points) : points[1] + d3_svg_lineHermite(points.slice(1, -1), d3_svg_lineCardinalTangents(points, tension));
    }
    function d3_svg_lineCardinalClosed(points, tension) {
      return points.length < 3 ? d3_svg_lineLinearClosed(points) : points[0] + d3_svg_lineHermite((points.push(points[0]), points), d3_svg_lineCardinalTangents([points[points.length - 2]].concat(points, [points[1]]), tension));
    }
    function d3_svg_lineCardinal(points, tension) {
      return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineCardinalTangents(points, tension));
    }
    function d3_svg_lineHermite(points, tangents) {
      if (tangents.length < 1 || points.length != tangents.length && points.length != tangents.length + 2) {
        return d3_svg_lineLinear(points);
      }
      var quad = points.length != tangents.length, path = "", p0 = points[0], p = points[1], t0 = tangents[0], t = t0, pi = 1;
      if (quad) {
        path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3) + "," + p[0] + "," + p[1];
        p0 = points[1];
        pi = 2;
      }
      if (tangents.length > 1) {
        t = tangents[1];
        p = points[pi];
        pi++;
        path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1]) + "," + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
        for (var i = 2;i < tangents.length; i++, pi++) {
          p = points[pi];
          t = tangents[i];
          path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
        }
      }
      if (quad) {
        var lp = points[pi];
        path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3) + "," + lp[0] + "," + lp[1];
      }
      return path;
    }
    function d3_svg_lineCardinalTangents(points, tension) {
      var tangents = [], a = (1 - tension) / 2, p0, p1 = points[0], p2 = points[1], i = 1, n = points.length;
      while (++i < n) {
        p0 = p1;
        p1 = p2;
        p2 = points[i];
        tangents.push([a * (p2[0] - p0[0]), a * (p2[1] - p0[1])]);
      }
      return tangents;
    }
    function d3_svg_lineBasis(points) {
      if (points.length < 3)
        return d3_svg_lineLinear(points);
      var i = 1, n = points.length, pi = points[0], x0 = pi[0], y0 = pi[1], px = [x0, x0, x0, (pi = points[1])[0]], py = [y0, y0, y0, pi[1]], path = [x0, ",", y0, "L", d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)];
      points.push(points[n - 1]);
      while (++i <= n) {
        pi = points[i];
        px.shift();
        px.push(pi[0]);
        py.shift();
        py.push(pi[1]);
        d3_svg_lineBasisBezier(path, px, py);
      }
      points.pop();
      path.push("L", pi);
      return path.join("");
    }
    function d3_svg_lineBasisOpen(points) {
      if (points.length < 4)
        return d3_svg_lineLinear(points);
      var path = [], i = -1, n = points.length, pi, px = [0], py = [0];
      while (++i < 3) {
        pi = points[i];
        px.push(pi[0]);
        py.push(pi[1]);
      }
      path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px) + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py));
      --i;
      while (++i < n) {
        pi = points[i];
        px.shift();
        px.push(pi[0]);
        py.shift();
        py.push(pi[1]);
        d3_svg_lineBasisBezier(path, px, py);
      }
      return path.join("");
    }
    function d3_svg_lineBasisClosed(points) {
      var path, i = -1, n = points.length, m = n + 4, pi, px = [], py = [];
      while (++i < 4) {
        pi = points[i % n];
        px.push(pi[0]);
        py.push(pi[1]);
      }
      path = [d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)];
      --i;
      while (++i < m) {
        pi = points[i % n];
        px.shift();
        px.push(pi[0]);
        py.shift();
        py.push(pi[1]);
        d3_svg_lineBasisBezier(path, px, py);
      }
      return path.join("");
    }
    function d3_svg_lineBundle(points, tension) {
      var n = points.length - 1;
      if (n) {
        var x0 = points[0][0], y0 = points[0][1], dx = points[n][0] - x0, dy = points[n][1] - y0, i = -1, p, t;
        while (++i <= n) {
          p = points[i];
          t = i / n;
          p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx);
          p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
        }
      }
      return d3_svg_lineBasis(points);
    }
    function d3_svg_lineDot4(a, b) {
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    }
    var d3_svg_lineBasisBezier1 = [0, 2 / 3, 1 / 3, 0], d3_svg_lineBasisBezier2 = [0, 1 / 3, 2 / 3, 0], d3_svg_lineBasisBezier3 = [0, 1 / 6, 2 / 3, 1 / 6];
    function d3_svg_lineBasisBezier(path, x, y) {
      path.push("C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
    }
    function d3_svg_lineSlope(p0, p1) {
      return (p1[1] - p0[1]) / (p1[0] - p0[0]);
    }
    function d3_svg_lineFiniteDifferences(points) {
      var i = 0, j = points.length - 1, m = [], p0 = points[0], p1 = points[1], d = m[0] = d3_svg_lineSlope(p0, p1);
      while (++i < j) {
        m[i] = (d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]))) / 2;
      }
      m[i] = d;
      return m;
    }
    function d3_svg_lineMonotoneTangents(points) {
      var tangents = [], d, a, b, s, m = d3_svg_lineFiniteDifferences(points), i = -1, j = points.length - 1;
      while (++i < j) {
        d = d3_svg_lineSlope(points[i], points[i + 1]);
        if (abs(d) < ε) {
          m[i] = m[i + 1] = 0;
        } else {
          a = m[i] / d;
          b = m[i + 1] / d;
          s = a * a + b * b;
          if (s > 9) {
            s = d * 3 / Math.sqrt(s);
            m[i] = s * a;
            m[i + 1] = s * b;
          }
        }
      }
      i = -1;
      while (++i <= j) {
        s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (6 * (1 + m[i] * m[i]));
        tangents.push([s || 0, m[i] * s || 0]);
      }
      return tangents;
    }
    function d3_svg_lineMonotone(points) {
      return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points));
    }
    d3.svg.line.radial = function() {
      var line = d3_svg_line(d3_svg_lineRadial);
      line.radius = line.x, delete line.x;
      line.angle = line.y, delete line.y;
      return line;
    };
    function d3_svg_lineRadial(points) {
      var point, i = -1, n = points.length, r, a;
      while (++i < n) {
        point = points[i];
        r = point[0];
        a = point[1] - half_;
        point[0] = r * Math.cos(a);
        point[1] = r * Math.sin(a);
      }
      return points;
    }
    function d3_svg_area(projection) {
      var x0 = d3_geom_pointX, x1 = d3_geom_pointX, y0 = 0, y1 = d3_geom_pointY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, interpolateReverse = interpolate, L = "L", tension = 0.7;
      function area(data) {
        var segments = [], points0 = [], points1 = [], i = -1, n = data.length, d, fx0 = d3_functor(x0), fy0 = d3_functor(y0), fx1 = x0 === x1 ? function() {
          return x;
        } : d3_functor(x1), fy1 = y0 === y1 ? function() {
          return y;
        } : d3_functor(y1), x, y;
        function segment() {
          segments.push("M", interpolate(projection(points1), tension), L, interpolateReverse(projection(points0.reverse()), tension), "Z");
        }
        while (++i < n) {
          if (defined.call(this, d = data[i], i)) {
            points0.push([x = +fx0.call(this, d, i), y = +fy0.call(this, d, i)]);
            points1.push([+fx1.call(this, d, i), +fy1.call(this, d, i)]);
          } else if (points0.length) {
            segment();
            points0 = [];
            points1 = [];
          }
        }
        if (points0.length)
          segment();
        return segments.length ? segments.join("") : null;
      }
      area.x = function(_) {
        if (!arguments.length)
          return x1;
        x0 = x1 = _;
        return area;
      };
      area.x0 = function(_) {
        if (!arguments.length)
          return x0;
        x0 = _;
        return area;
      };
      area.x1 = function(_) {
        if (!arguments.length)
          return x1;
        x1 = _;
        return area;
      };
      area.y = function(_) {
        if (!arguments.length)
          return y1;
        y0 = y1 = _;
        return area;
      };
      area.y0 = function(_) {
        if (!arguments.length)
          return y0;
        y0 = _;
        return area;
      };
      area.y1 = function(_) {
        if (!arguments.length)
          return y1;
        y1 = _;
        return area;
      };
      area.defined = function(_) {
        if (!arguments.length)
          return defined;
        defined = _;
        return area;
      };
      area.interpolate = function(_) {
        if (!arguments.length)
          return interpolateKey;
        if (typeof _ === "function")
          interpolateKey = interpolate = _;
        else
          interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
        interpolateReverse = interpolate.reverse || interpolate;
        L = interpolate.closed ? "M" : "L";
        return area;
      };
      area.tension = function(_) {
        if (!arguments.length)
          return tension;
        tension = _;
        return area;
      };
      return area;
    }
    d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter;
    d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore;
    d3.svg.area = function() {
      return d3_svg_area(d3_identity);
    };
    d3.svg.area.radial = function() {
      var area = d3_svg_area(d3_svg_lineRadial);
      area.radius = area.x, delete area.x;
      area.innerRadius = area.x0, delete area.x0;
      area.outerRadius = area.x1, delete area.x1;
      area.angle = area.y, delete area.y;
      area.startAngle = area.y0, delete area.y0;
      area.endAngle = area.y1, delete area.y1;
      return area;
    };
    d3.svg.chord = function() {
      var source = d3_source, target = d3_target, radius = d3_svg_chordRadius, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle;
      function chord(d, i) {
        var s = subgroup(this, source, d, i), t = subgroup(this, target, d, i);
        return "M" + s.p0 + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t) ? curve(s.r, s.p1, s.r, s.p0) : curve(s.r, s.p1, t.r, t.p0) + arc(t.r, t.p1, t.a1 - t.a0) + curve(t.r, t.p1, s.r, s.p0)) + "Z";
      }
      function subgroup(self, f, d, i) {
        var subgroup2 = f.call(self, d, i), r = radius.call(self, subgroup2, i), a0 = startAngle.call(self, subgroup2, i) - half_, a1 = endAngle.call(self, subgroup2, i) - half_;
        return {
          r,
          a0,
          a1,
          p0: [r * Math.cos(a0), r * Math.sin(a0)],
          p1: [r * Math.cos(a1), r * Math.sin(a1)]
        };
      }
      function equals(a, b) {
        return a.a0 == b.a0 && a.a1 == b.a1;
      }
      function arc(r, p, a) {
        return "A" + r + "," + r + " 0 " + +(a > π) + ",1 " + p;
      }
      function curve(r0, p0, r1, p1) {
        return "Q 0,0 " + p1;
      }
      chord.radius = function(v) {
        if (!arguments.length)
          return radius;
        radius = d3_functor(v);
        return chord;
      };
      chord.source = function(v) {
        if (!arguments.length)
          return source;
        source = d3_functor(v);
        return chord;
      };
      chord.target = function(v) {
        if (!arguments.length)
          return target;
        target = d3_functor(v);
        return chord;
      };
      chord.startAngle = function(v) {
        if (!arguments.length)
          return startAngle;
        startAngle = d3_functor(v);
        return chord;
      };
      chord.endAngle = function(v) {
        if (!arguments.length)
          return endAngle;
        endAngle = d3_functor(v);
        return chord;
      };
      return chord;
    };
    function d3_svg_chordRadius(d) {
      return d.radius;
    }
    d3.svg.diagonal = function() {
      var source = d3_source, target = d3_target, projection = d3_svg_diagonalProjection;
      function diagonal(d, i) {
        var p0 = source.call(this, d, i), p3 = target.call(this, d, i), m = (p0.y + p3.y) / 2, p = [p0, {
          x: p0.x,
          y: m
        }, {
          x: p3.x,
          y: m
        }, p3];
        p = p.map(projection);
        return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3];
      }
      diagonal.source = function(x) {
        if (!arguments.length)
          return source;
        source = d3_functor(x);
        return diagonal;
      };
      diagonal.target = function(x) {
        if (!arguments.length)
          return target;
        target = d3_functor(x);
        return diagonal;
      };
      diagonal.projection = function(x) {
        if (!arguments.length)
          return projection;
        projection = x;
        return diagonal;
      };
      return diagonal;
    };
    function d3_svg_diagonalProjection(d) {
      return [d.x, d.y];
    }
    d3.svg.diagonal.radial = function() {
      var diagonal = d3.svg.diagonal(), projection = d3_svg_diagonalProjection, projection_ = diagonal.projection;
      diagonal.projection = function(x) {
        return arguments.length ? projection_(d3_svg_diagonalRadialProjection(projection = x)) : projection;
      };
      return diagonal;
    };
    function d3_svg_diagonalRadialProjection(projection) {
      return function() {
        var d = projection.apply(this, arguments), r = d[0], a = d[1] - half_;
        return [r * Math.cos(a), r * Math.sin(a)];
      };
    }
    d3.svg.symbol = function() {
      var type = d3_svg_symbolType, size = d3_svg_symbolSize;
      function symbol(d, i) {
        return (d3_svg_symbols.get(type.call(this, d, i)) || d3_svg_symbolCircle)(size.call(this, d, i));
      }
      symbol.type = function(x) {
        if (!arguments.length)
          return type;
        type = d3_functor(x);
        return symbol;
      };
      symbol.size = function(x) {
        if (!arguments.length)
          return size;
        size = d3_functor(x);
        return symbol;
      };
      return symbol;
    };
    function d3_svg_symbolSize() {
      return 64;
    }
    function d3_svg_symbolType() {
      return "circle";
    }
    function d3_svg_symbolCircle(size) {
      var r = Math.sqrt(size / π);
      return "M0," + r + "A" + r + "," + r + " 0 1,1 0," + -r + "A" + r + "," + r + " 0 1,1 0," + r + "Z";
    }
    var d3_svg_symbols = d3.map({
      circle: d3_svg_symbolCircle,
      cross: function(size) {
        var r = Math.sqrt(size / 5) / 2;
        return "M" + -3 * r + "," + -r + "H" + -r + "V" + -3 * r + "H" + r + "V" + -r + "H" + 3 * r + "V" + r + "H" + r + "V" + 3 * r + "H" + -r + "V" + r + "H" + -3 * r + "Z";
      },
      diamond: function(size) {
        var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)), rx = ry * d3_svg_symbolTan30;
        return "M0," + -ry + "L" + rx + ",0" + " 0," + ry + " " + -rx + ",0" + "Z";
      },
      square: function(size) {
        var r = Math.sqrt(size) / 2;
        return "M" + -r + "," + -r + "L" + r + "," + -r + " " + r + "," + r + " " + -r + "," + r + "Z";
      },
      "triangle-down": function(size) {
        var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
        return "M0," + ry + "L" + rx + "," + -ry + " " + -rx + "," + -ry + "Z";
      },
      "triangle-up": function(size) {
        var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
        return "M0," + -ry + "L" + rx + "," + ry + " " + -rx + "," + ry + "Z";
      }
    });
    d3.svg.symbolTypes = d3_svg_symbols.keys();
    var d3_svg_symbolSqrt3 = Math.sqrt(3), d3_svg_symbolTan30 = Math.tan(30 * d3_radians);
    d3_selectionPrototype.transition = function(name) {
      var id = d3_transitionInheritId || ++d3_transitionId, ns = d3_transitionNamespace(name), subgroups = [], subgroup, node, transition = d3_transitionInherit || {
        time: Date.now(),
        ease: d3_ease_cubicInOut,
        delay: 0,
        duration: 250
      };
      for (var j = -1, m = this.length;++j < m; ) {
        subgroups.push(subgroup = []);
        for (var group = this[j], i = -1, n = group.length;++i < n; ) {
          if (node = group[i])
            d3_transitionNode(node, i, ns, id, transition);
          subgroup.push(node);
        }
      }
      return d3_transition(subgroups, ns, id);
    };
    d3_selectionPrototype.interrupt = function(name) {
      return this.each(name == null ? d3_selection_interrupt : d3_selection_interruptNS(d3_transitionNamespace(name)));
    };
    var d3_selection_interrupt = d3_selection_interruptNS(d3_transitionNamespace());
    function d3_selection_interruptNS(ns) {
      return function() {
        var lock, activeId, active;
        if ((lock = this[ns]) && (active = lock[activeId = lock.active])) {
          active.timer.c = null;
          active.timer.t = NaN;
          if (--lock.count)
            delete lock[activeId];
          else
            delete this[ns];
          lock.active += 0.5;
          active.event && active.event.interrupt.call(this, this.__data__, active.index);
        }
      };
    }
    function d3_transition(groups, ns, id) {
      d3_subclass(groups, d3_transitionPrototype);
      groups.namespace = ns;
      groups.id = id;
      return groups;
    }
    var d3_transitionPrototype = [], d3_transitionId = 0, d3_transitionInheritId, d3_transitionInherit;
    d3_transitionPrototype.call = d3_selectionPrototype.call;
    d3_transitionPrototype.empty = d3_selectionPrototype.empty;
    d3_transitionPrototype.node = d3_selectionPrototype.node;
    d3_transitionPrototype.size = d3_selectionPrototype.size;
    d3.transition = function(selection, name) {
      return selection && selection.transition ? d3_transitionInheritId ? selection.transition(name) : selection : d3.selection().transition(selection);
    };
    d3.transition.prototype = d3_transitionPrototype;
    d3_transitionPrototype.select = function(selector) {
      var id = this.id, ns = this.namespace, subgroups = [], subgroup, subnode, node;
      selector = d3_selection_selector(selector);
      for (var j = -1, m = this.length;++j < m; ) {
        subgroups.push(subgroup = []);
        for (var group = this[j], i = -1, n = group.length;++i < n; ) {
          if ((node = group[i]) && (subnode = selector.call(node, node.__data__, i, j))) {
            if ("__data__" in node)
              subnode.__data__ = node.__data__;
            d3_transitionNode(subnode, i, ns, id, node[ns][id]);
            subgroup.push(subnode);
          } else {
            subgroup.push(null);
          }
        }
      }
      return d3_transition(subgroups, ns, id);
    };
    d3_transitionPrototype.selectAll = function(selector) {
      var id = this.id, ns = this.namespace, subgroups = [], subgroup, subnodes, node, subnode, transition;
      selector = d3_selection_selectorAll(selector);
      for (var j = -1, m = this.length;++j < m; ) {
        for (var group = this[j], i = -1, n = group.length;++i < n; ) {
          if (node = group[i]) {
            transition = node[ns][id];
            subnodes = selector.call(node, node.__data__, i, j);
            subgroups.push(subgroup = []);
            for (var k = -1, o = subnodes.length;++k < o; ) {
              if (subnode = subnodes[k])
                d3_transitionNode(subnode, k, ns, id, transition);
              subgroup.push(subnode);
            }
          }
        }
      }
      return d3_transition(subgroups, ns, id);
    };
    d3_transitionPrototype.filter = function(filter) {
      var subgroups = [], subgroup, group, node;
      if (typeof filter !== "function")
        filter = d3_selection_filter(filter);
      for (var j = 0, m = this.length;j < m; j++) {
        subgroups.push(subgroup = []);
        for (var group = this[j], i = 0, n = group.length;i < n; i++) {
          if ((node = group[i]) && filter.call(node, node.__data__, i, j)) {
            subgroup.push(node);
          }
        }
      }
      return d3_transition(subgroups, this.namespace, this.id);
    };
    d3_transitionPrototype.tween = function(name, tween) {
      var id = this.id, ns = this.namespace;
      if (arguments.length < 2)
        return this.node()[ns][id].tween.get(name);
      return d3_selection_each(this, tween == null ? function(node) {
        node[ns][id].tween.remove(name);
      } : function(node) {
        node[ns][id].tween.set(name, tween);
      });
    };
    function d3_transition_tween(groups, name, value, tween) {
      var { id, namespace: ns } = groups;
      return d3_selection_each(groups, typeof value === "function" ? function(node, i, j) {
        node[ns][id].tween.set(name, tween(value.call(node, node.__data__, i, j)));
      } : (value = tween(value), function(node) {
        node[ns][id].tween.set(name, value);
      }));
    }
    d3_transitionPrototype.attr = function(nameNS, value) {
      if (arguments.length < 2) {
        for (value in nameNS)
          this.attr(value, nameNS[value]);
        return this;
      }
      var interpolate = nameNS == "transform" ? d3_interpolateTransform : d3_interpolate, name = d3.ns.qualify(nameNS);
      function attrNull() {
        this.removeAttribute(name);
      }
      function attrNullNS() {
        this.removeAttributeNS(name.space, name.local);
      }
      function attrTween(b) {
        return b == null ? attrNull : (b += "", function() {
          var a = this.getAttribute(name), i;
          return a !== b && (i = interpolate(a, b), function(t) {
            this.setAttribute(name, i(t));
          });
        });
      }
      function attrTweenNS(b) {
        return b == null ? attrNullNS : (b += "", function() {
          var a = this.getAttributeNS(name.space, name.local), i;
          return a !== b && (i = interpolate(a, b), function(t) {
            this.setAttributeNS(name.space, name.local, i(t));
          });
        });
      }
      return d3_transition_tween(this, "attr." + nameNS, value, name.local ? attrTweenNS : attrTween);
    };
    d3_transitionPrototype.attrTween = function(nameNS, tween) {
      var name = d3.ns.qualify(nameNS);
      function attrTween(d, i) {
        var f = tween.call(this, d, i, this.getAttribute(name));
        return f && function(t) {
          this.setAttribute(name, f(t));
        };
      }
      function attrTweenNS(d, i) {
        var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
        return f && function(t) {
          this.setAttributeNS(name.space, name.local, f(t));
        };
      }
      return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween);
    };
    d3_transitionPrototype.style = function(name, value, priority) {
      var n = arguments.length;
      if (n < 3) {
        if (typeof name !== "string") {
          if (n < 2)
            value = "";
          for (priority in name)
            this.style(priority, name[priority], value);
          return this;
        }
        priority = "";
      }
      function styleNull() {
        this.style.removeProperty(name);
      }
      function styleString(b) {
        return b == null ? styleNull : (b += "", function() {
          var a = d3_window(this).getComputedStyle(this, null).getPropertyValue(name), i;
          return a !== b && (i = d3_interpolate(a, b), function(t) {
            this.style.setProperty(name, i(t), priority);
          });
        });
      }
      return d3_transition_tween(this, "style." + name, value, styleString);
    };
    d3_transitionPrototype.styleTween = function(name, tween, priority) {
      if (arguments.length < 3)
        priority = "";
      function styleTween(d, i) {
        var f = tween.call(this, d, i, d3_window(this).getComputedStyle(this, null).getPropertyValue(name));
        return f && function(t) {
          this.style.setProperty(name, f(t), priority);
        };
      }
      return this.tween("style." + name, styleTween);
    };
    d3_transitionPrototype.text = function(value) {
      return d3_transition_tween(this, "text", value, d3_transition_text);
    };
    function d3_transition_text(b) {
      if (b == null)
        b = "";
      return function() {
        this.textContent = b;
      };
    }
    d3_transitionPrototype.remove = function() {
      var ns = this.namespace;
      return this.each("end.transition", function() {
        var p;
        if (this[ns].count < 2 && (p = this.parentNode))
          p.removeChild(this);
      });
    };
    d3_transitionPrototype.ease = function(value) {
      var id = this.id, ns = this.namespace;
      if (arguments.length < 1)
        return this.node()[ns][id].ease;
      if (typeof value !== "function")
        value = d3.ease.apply(d3, arguments);
      return d3_selection_each(this, function(node) {
        node[ns][id].ease = value;
      });
    };
    d3_transitionPrototype.delay = function(value) {
      var id = this.id, ns = this.namespace;
      if (arguments.length < 1)
        return this.node()[ns][id].delay;
      return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
        node[ns][id].delay = +value.call(node, node.__data__, i, j);
      } : (value = +value, function(node) {
        node[ns][id].delay = value;
      }));
    };
    d3_transitionPrototype.duration = function(value) {
      var id = this.id, ns = this.namespace;
      if (arguments.length < 1)
        return this.node()[ns][id].duration;
      return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
        node[ns][id].duration = Math.max(1, value.call(node, node.__data__, i, j));
      } : (value = Math.max(1, value), function(node) {
        node[ns][id].duration = value;
      }));
    };
    d3_transitionPrototype.each = function(type, listener) {
      var id = this.id, ns = this.namespace;
      if (arguments.length < 2) {
        var inherit = d3_transitionInherit, inheritId = d3_transitionInheritId;
        try {
          d3_transitionInheritId = id;
          d3_selection_each(this, function(node, i, j) {
            d3_transitionInherit = node[ns][id];
            type.call(node, node.__data__, i, j);
          });
        } finally {
          d3_transitionInherit = inherit;
          d3_transitionInheritId = inheritId;
        }
      } else {
        d3_selection_each(this, function(node) {
          var transition = node[ns][id];
          (transition.event || (transition.event = d3.dispatch("start", "end", "interrupt"))).on(type, listener);
        });
      }
      return this;
    };
    d3_transitionPrototype.transition = function() {
      var id0 = this.id, id1 = ++d3_transitionId, ns = this.namespace, subgroups = [], subgroup, group, node, transition;
      for (var j = 0, m = this.length;j < m; j++) {
        subgroups.push(subgroup = []);
        for (var group = this[j], i = 0, n = group.length;i < n; i++) {
          if (node = group[i]) {
            transition = node[ns][id0];
            d3_transitionNode(node, i, ns, id1, {
              time: transition.time,
              ease: transition.ease,
              delay: transition.delay + transition.duration,
              duration: transition.duration
            });
          }
          subgroup.push(node);
        }
      }
      return d3_transition(subgroups, ns, id1);
    };
    function d3_transitionNamespace(name) {
      return name == null ? "__transition__" : "__transition_" + name + "__";
    }
    function d3_transitionNode(node, i, ns, id, inherit) {
      var lock = node[ns] || (node[ns] = {
        active: 0,
        count: 0
      }), transition = lock[id], time, timer, duration, ease, tweens;
      function schedule(elapsed) {
        var delay = transition.delay;
        timer.t = delay + time;
        if (delay <= elapsed)
          return start(elapsed - delay);
        timer.c = start;
      }
      function start(elapsed) {
        var activeId = lock.active, active = lock[activeId];
        if (active) {
          active.timer.c = null;
          active.timer.t = NaN;
          --lock.count;
          delete lock[activeId];
          active.event && active.event.interrupt.call(node, node.__data__, active.index);
        }
        for (var cancelId in lock) {
          if (+cancelId < id) {
            var cancel = lock[cancelId];
            cancel.timer.c = null;
            cancel.timer.t = NaN;
            --lock.count;
            delete lock[cancelId];
          }
        }
        timer.c = tick;
        d3_timer(function() {
          if (timer.c && tick(elapsed || 1)) {
            timer.c = null;
            timer.t = NaN;
          }
          return 1;
        }, 0, time);
        lock.active = id;
        transition.event && transition.event.start.call(node, node.__data__, i);
        tweens = [];
        transition.tween.forEach(function(key, value) {
          if (value = value.call(node, node.__data__, i)) {
            tweens.push(value);
          }
        });
        ease = transition.ease;
        duration = transition.duration;
      }
      function tick(elapsed) {
        var t = elapsed / duration, e = ease(t), n = tweens.length;
        while (n > 0) {
          tweens[--n].call(node, e);
        }
        if (t >= 1) {
          transition.event && transition.event.end.call(node, node.__data__, i);
          if (--lock.count)
            delete lock[id];
          else
            delete node[ns];
          return 1;
        }
      }
      if (!transition) {
        time = inherit.time;
        timer = d3_timer(schedule, 0, time);
        transition = lock[id] = {
          tween: new d3_Map,
          time,
          timer,
          delay: inherit.delay,
          duration: inherit.duration,
          ease: inherit.ease,
          index: i
        };
        inherit = null;
        ++lock.count;
      }
    }
    d3.svg.axis = function() {
      var scale = d3.scale.linear(), orient = d3_svg_axisDefaultOrient, innerTickSize = 6, outerTickSize = 6, tickPadding = 3, tickArguments_ = [10], tickValues = null, tickFormat_;
      function axis(g) {
        g.each(function() {
          var g2 = d3.select(this);
          var scale0 = this.__chart__ || scale, scale1 = this.__chart__ = scale.copy();
          var ticks = tickValues == null ? scale1.ticks ? scale1.ticks.apply(scale1, tickArguments_) : scale1.domain() : tickValues, tickFormat = tickFormat_ == null ? scale1.tickFormat ? scale1.tickFormat.apply(scale1, tickArguments_) : d3_identity : tickFormat_, tick = g2.selectAll(".tick").data(ticks, scale1), tickEnter = tick.enter().insert("g", ".domain").attr("class", "tick").style("opacity", ε), tickExit = d3.transition(tick.exit()).style("opacity", ε).remove(), tickUpdate = d3.transition(tick.order()).style("opacity", 1), tickSpacing = Math.max(innerTickSize, 0) + tickPadding, tickTransform;
          var range = d3_scaleRange(scale1), path = g2.selectAll(".domain").data([0]), pathUpdate = (path.enter().append("path").attr("class", "domain"), d3.transition(path));
          tickEnter.append("line");
          tickEnter.append("text");
          var lineEnter = tickEnter.select("line"), lineUpdate = tickUpdate.select("line"), text = tick.select("text").text(tickFormat), textEnter = tickEnter.select("text"), textUpdate = tickUpdate.select("text"), sign = orient === "top" || orient === "left" ? -1 : 1, x1, x2, y1, y2;
          if (orient === "bottom" || orient === "top") {
            tickTransform = d3_svg_axisX, x1 = "x", y1 = "y", x2 = "x2", y2 = "y2";
            text.attr("dy", sign < 0 ? "0em" : ".71em").style("text-anchor", "middle");
            pathUpdate.attr("d", "M" + range[0] + "," + sign * outerTickSize + "V0H" + range[1] + "V" + sign * outerTickSize);
          } else {
            tickTransform = d3_svg_axisY, x1 = "y", y1 = "x", x2 = "y2", y2 = "x2";
            text.attr("dy", ".32em").style("text-anchor", sign < 0 ? "end" : "start");
            pathUpdate.attr("d", "M" + sign * outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + sign * outerTickSize);
          }
          lineEnter.attr(y2, sign * innerTickSize);
          textEnter.attr(y1, sign * tickSpacing);
          lineUpdate.attr(x2, 0).attr(y2, sign * innerTickSize);
          textUpdate.attr(x1, 0).attr(y1, sign * tickSpacing);
          if (scale1.rangeBand) {
            var x = scale1, dx = x.rangeBand() / 2;
            scale0 = scale1 = function(d) {
              return x(d) + dx;
            };
          } else if (scale0.rangeBand) {
            scale0 = scale1;
          } else {
            tickExit.call(tickTransform, scale1, scale0);
          }
          tickEnter.call(tickTransform, scale0, scale1);
          tickUpdate.call(tickTransform, scale1, scale1);
        });
      }
      axis.scale = function(x) {
        if (!arguments.length)
          return scale;
        scale = x;
        return axis;
      };
      axis.orient = function(x) {
        if (!arguments.length)
          return orient;
        orient = x in d3_svg_axisOrients ? x + "" : d3_svg_axisDefaultOrient;
        return axis;
      };
      axis.ticks = function() {
        if (!arguments.length)
          return tickArguments_;
        tickArguments_ = d3_array(arguments);
        return axis;
      };
      axis.tickValues = function(x) {
        if (!arguments.length)
          return tickValues;
        tickValues = x;
        return axis;
      };
      axis.tickFormat = function(x) {
        if (!arguments.length)
          return tickFormat_;
        tickFormat_ = x;
        return axis;
      };
      axis.tickSize = function(x) {
        var n = arguments.length;
        if (!n)
          return innerTickSize;
        innerTickSize = +x;
        outerTickSize = +arguments[n - 1];
        return axis;
      };
      axis.innerTickSize = function(x) {
        if (!arguments.length)
          return innerTickSize;
        innerTickSize = +x;
        return axis;
      };
      axis.outerTickSize = function(x) {
        if (!arguments.length)
          return outerTickSize;
        outerTickSize = +x;
        return axis;
      };
      axis.tickPadding = function(x) {
        if (!arguments.length)
          return tickPadding;
        tickPadding = +x;
        return axis;
      };
      axis.tickSubdivide = function() {
        return arguments.length && axis;
      };
      return axis;
    };
    var d3_svg_axisDefaultOrient = "bottom", d3_svg_axisOrients = {
      top: 1,
      right: 1,
      bottom: 1,
      left: 1
    };
    function d3_svg_axisX(selection, x0, x1) {
      selection.attr("transform", function(d) {
        var v0 = x0(d);
        return "translate(" + (isFinite(v0) ? v0 : x1(d)) + ",0)";
      });
    }
    function d3_svg_axisY(selection, y0, y1) {
      selection.attr("transform", function(d) {
        var v0 = y0(d);
        return "translate(0," + (isFinite(v0) ? v0 : y1(d)) + ")";
      });
    }
    d3.svg.brush = function() {
      var event = d3_eventDispatch(brush, "brushstart", "brush", "brushend"), x = null, y = null, xExtent = [0, 0], yExtent = [0, 0], xExtentDomain, yExtentDomain, xClamp = true, yClamp = true, resizes = d3_svg_brushResizes[0];
      function brush(g) {
        g.each(function() {
          var g2 = d3.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", brushstart).on("touchstart.brush", brushstart);
          var background = g2.selectAll(".background").data([0]);
          background.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair");
          g2.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
          var resize = g2.selectAll(".resize").data(resizes, d3_identity);
          resize.exit().remove();
          resize.enter().append("g").attr("class", function(d) {
            return "resize " + d;
          }).style("cursor", function(d) {
            return d3_svg_brushCursor[d];
          }).append("rect").attr("x", function(d) {
            return /[ew]$/.test(d) ? -3 : null;
          }).attr("y", function(d) {
            return /^[ns]/.test(d) ? -3 : null;
          }).attr("width", 6).attr("height", 6).style("visibility", "hidden");
          resize.style("display", brush.empty() ? "none" : null);
          var gUpdate = d3.transition(g2), backgroundUpdate = d3.transition(background), range;
          if (x) {
            range = d3_scaleRange(x);
            backgroundUpdate.attr("x", range[0]).attr("width", range[1] - range[0]);
            redrawX(gUpdate);
          }
          if (y) {
            range = d3_scaleRange(y);
            backgroundUpdate.attr("y", range[0]).attr("height", range[1] - range[0]);
            redrawY(gUpdate);
          }
          redraw(gUpdate);
        });
      }
      brush.event = function(g) {
        g.each(function() {
          var event_ = event.of(this, arguments), extent1 = {
            x: xExtent,
            y: yExtent,
            i: xExtentDomain,
            j: yExtentDomain
          }, extent0 = this.__chart__ || extent1;
          this.__chart__ = extent1;
          if (d3_transitionInheritId) {
            d3.select(this).transition().each("start.brush", function() {
              xExtentDomain = extent0.i;
              yExtentDomain = extent0.j;
              xExtent = extent0.x;
              yExtent = extent0.y;
              event_({
                type: "brushstart"
              });
            }).tween("brush:brush", function() {
              var xi = d3_interpolateArray(xExtent, extent1.x), yi = d3_interpolateArray(yExtent, extent1.y);
              xExtentDomain = yExtentDomain = null;
              return function(t) {
                xExtent = extent1.x = xi(t);
                yExtent = extent1.y = yi(t);
                event_({
                  type: "brush",
                  mode: "resize"
                });
              };
            }).each("end.brush", function() {
              xExtentDomain = extent1.i;
              yExtentDomain = extent1.j;
              event_({
                type: "brush",
                mode: "resize"
              });
              event_({
                type: "brushend"
              });
            });
          } else {
            event_({
              type: "brushstart"
            });
            event_({
              type: "brush",
              mode: "resize"
            });
            event_({
              type: "brushend"
            });
          }
        });
      };
      function redraw(g) {
        g.selectAll(".resize").attr("transform", function(d) {
          return "translate(" + xExtent[+/e$/.test(d)] + "," + yExtent[+/^s/.test(d)] + ")";
        });
      }
      function redrawX(g) {
        g.select(".extent").attr("x", xExtent[0]);
        g.selectAll(".extent,.n>rect,.s>rect").attr("width", xExtent[1] - xExtent[0]);
      }
      function redrawY(g) {
        g.select(".extent").attr("y", yExtent[0]);
        g.selectAll(".extent,.e>rect,.w>rect").attr("height", yExtent[1] - yExtent[0]);
      }
      function brushstart() {
        var target = this, eventTarget = d3.select(d3.event.target), event_ = event.of(target, arguments), g = d3.select(target), resizing = eventTarget.datum(), resizingX = !/^(n|s)$/.test(resizing) && x, resizingY = !/^(e|w)$/.test(resizing) && y, dragging = eventTarget.classed("extent"), dragRestore = d3_event_dragSuppress(target), center, origin = d3.mouse(target), offset;
        var w = d3.select(d3_window(target)).on("keydown.brush", keydown).on("keyup.brush", keyup);
        if (d3.event.changedTouches) {
          w.on("touchmove.brush", brushmove).on("touchend.brush", brushend);
        } else {
          w.on("mousemove.brush", brushmove).on("mouseup.brush", brushend);
        }
        g.interrupt().selectAll("*").interrupt();
        if (dragging) {
          origin[0] = xExtent[0] - origin[0];
          origin[1] = yExtent[0] - origin[1];
        } else if (resizing) {
          var ex = +/w$/.test(resizing), ey = +/^n/.test(resizing);
          offset = [xExtent[1 - ex] - origin[0], yExtent[1 - ey] - origin[1]];
          origin[0] = xExtent[ex];
          origin[1] = yExtent[ey];
        } else if (d3.event.altKey)
          center = origin.slice();
        g.style("pointer-events", "none").selectAll(".resize").style("display", null);
        d3.select("body").style("cursor", eventTarget.style("cursor"));
        event_({
          type: "brushstart"
        });
        brushmove();
        function keydown() {
          if (d3.event.keyCode == 32) {
            if (!dragging) {
              center = null;
              origin[0] -= xExtent[1];
              origin[1] -= yExtent[1];
              dragging = 2;
            }
            d3_eventPreventDefault();
          }
        }
        function keyup() {
          if (d3.event.keyCode == 32 && dragging == 2) {
            origin[0] += xExtent[1];
            origin[1] += yExtent[1];
            dragging = 0;
            d3_eventPreventDefault();
          }
        }
        function brushmove() {
          var point = d3.mouse(target), moved = false;
          if (offset) {
            point[0] += offset[0];
            point[1] += offset[1];
          }
          if (!dragging) {
            if (d3.event.altKey) {
              if (!center)
                center = [(xExtent[0] + xExtent[1]) / 2, (yExtent[0] + yExtent[1]) / 2];
              origin[0] = xExtent[+(point[0] < center[0])];
              origin[1] = yExtent[+(point[1] < center[1])];
            } else
              center = null;
          }
          if (resizingX && move1(point, x, 0)) {
            redrawX(g);
            moved = true;
          }
          if (resizingY && move1(point, y, 1)) {
            redrawY(g);
            moved = true;
          }
          if (moved) {
            redraw(g);
            event_({
              type: "brush",
              mode: dragging ? "move" : "resize"
            });
          }
        }
        function move1(point, scale, i) {
          var range = d3_scaleRange(scale), r0 = range[0], r1 = range[1], position = origin[i], extent = i ? yExtent : xExtent, size = extent[1] - extent[0], min, max;
          if (dragging) {
            r0 -= position;
            r1 -= size + position;
          }
          min = (i ? yClamp : xClamp) ? Math.max(r0, Math.min(r1, point[i])) : point[i];
          if (dragging) {
            max = (min += position) + size;
          } else {
            if (center)
              position = Math.max(r0, Math.min(r1, 2 * center[i] - min));
            if (position < min) {
              max = min;
              min = position;
            } else {
              max = position;
            }
          }
          if (extent[0] != min || extent[1] != max) {
            if (i)
              yExtentDomain = null;
            else
              xExtentDomain = null;
            extent[0] = min;
            extent[1] = max;
            return true;
          }
        }
        function brushend() {
          brushmove();
          g.style("pointer-events", "all").selectAll(".resize").style("display", brush.empty() ? "none" : null);
          d3.select("body").style("cursor", null);
          w.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null);
          dragRestore();
          event_({
            type: "brushend"
          });
        }
      }
      brush.x = function(z) {
        if (!arguments.length)
          return x;
        x = z;
        resizes = d3_svg_brushResizes[!x << 1 | !y];
        return brush;
      };
      brush.y = function(z) {
        if (!arguments.length)
          return y;
        y = z;
        resizes = d3_svg_brushResizes[!x << 1 | !y];
        return brush;
      };
      brush.clamp = function(z) {
        if (!arguments.length)
          return x && y ? [xClamp, yClamp] : x ? xClamp : y ? yClamp : null;
        if (x && y)
          xClamp = !!z[0], yClamp = !!z[1];
        else if (x)
          xClamp = !!z;
        else if (y)
          yClamp = !!z;
        return brush;
      };
      brush.extent = function(z) {
        var x0, x1, y0, y1, t;
        if (!arguments.length) {
          if (x) {
            if (xExtentDomain) {
              x0 = xExtentDomain[0], x1 = xExtentDomain[1];
            } else {
              x0 = xExtent[0], x1 = xExtent[1];
              if (x.invert)
                x0 = x.invert(x0), x1 = x.invert(x1);
              if (x1 < x0)
                t = x0, x0 = x1, x1 = t;
            }
          }
          if (y) {
            if (yExtentDomain) {
              y0 = yExtentDomain[0], y1 = yExtentDomain[1];
            } else {
              y0 = yExtent[0], y1 = yExtent[1];
              if (y.invert)
                y0 = y.invert(y0), y1 = y.invert(y1);
              if (y1 < y0)
                t = y0, y0 = y1, y1 = t;
            }
          }
          return x && y ? [[x0, y0], [x1, y1]] : x ? [x0, x1] : y && [y0, y1];
        }
        if (x) {
          x0 = z[0], x1 = z[1];
          if (y)
            x0 = x0[0], x1 = x1[0];
          xExtentDomain = [x0, x1];
          if (x.invert)
            x0 = x(x0), x1 = x(x1);
          if (x1 < x0)
            t = x0, x0 = x1, x1 = t;
          if (x0 != xExtent[0] || x1 != xExtent[1])
            xExtent = [x0, x1];
        }
        if (y) {
          y0 = z[0], y1 = z[1];
          if (x)
            y0 = y0[1], y1 = y1[1];
          yExtentDomain = [y0, y1];
          if (y.invert)
            y0 = y(y0), y1 = y(y1);
          if (y1 < y0)
            t = y0, y0 = y1, y1 = t;
          if (y0 != yExtent[0] || y1 != yExtent[1])
            yExtent = [y0, y1];
        }
        return brush;
      };
      brush.clear = function() {
        if (!brush.empty()) {
          xExtent = [0, 0], yExtent = [0, 0];
          xExtentDomain = yExtentDomain = null;
        }
        return brush;
      };
      brush.empty = function() {
        return !!x && xExtent[0] == xExtent[1] || !!y && yExtent[0] == yExtent[1];
      };
      return d3.rebind(brush, event, "on");
    };
    var d3_svg_brushCursor = {
      n: "ns-resize",
      e: "ew-resize",
      s: "ns-resize",
      w: "ew-resize",
      nw: "nwse-resize",
      ne: "nesw-resize",
      se: "nwse-resize",
      sw: "nesw-resize"
    };
    var d3_svg_brushResizes = [["n", "e", "s", "w", "nw", "ne", "se", "sw"], ["e", "w"], ["n", "s"], []];
    var d3_time_format = d3_time.format = d3_locale_enUS.timeFormat;
    var d3_time_formatUtc = d3_time_format.utc;
    var d3_time_formatIso = d3_time_formatUtc("%Y-%m-%dT%H:%M:%S.%LZ");
    d3_time_format.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? d3_time_formatIsoNative : d3_time_formatIso;
    function d3_time_formatIsoNative(date) {
      return date.toISOString();
    }
    d3_time_formatIsoNative.parse = function(string) {
      var date = new Date(string);
      return isNaN(date) ? null : date;
    };
    d3_time_formatIsoNative.toString = d3_time_formatIso.toString;
    d3_time.second = d3_time_interval(function(date) {
      return new d3_date(Math.floor(date / 1000) * 1000);
    }, function(date, offset) {
      date.setTime(date.getTime() + Math.floor(offset) * 1000);
    }, function(date) {
      return date.getSeconds();
    });
    d3_time.seconds = d3_time.second.range;
    d3_time.seconds.utc = d3_time.second.utc.range;
    d3_time.minute = d3_time_interval(function(date) {
      return new d3_date(Math.floor(date / 60000) * 60000);
    }, function(date, offset) {
      date.setTime(date.getTime() + Math.floor(offset) * 60000);
    }, function(date) {
      return date.getMinutes();
    });
    d3_time.minutes = d3_time.minute.range;
    d3_time.minutes.utc = d3_time.minute.utc.range;
    d3_time.hour = d3_time_interval(function(date) {
      var timezone = date.getTimezoneOffset() / 60;
      return new d3_date((Math.floor(date / 3600000 - timezone) + timezone) * 3600000);
    }, function(date, offset) {
      date.setTime(date.getTime() + Math.floor(offset) * 3600000);
    }, function(date) {
      return date.getHours();
    });
    d3_time.hours = d3_time.hour.range;
    d3_time.hours.utc = d3_time.hour.utc.range;
    d3_time.month = d3_time_interval(function(date) {
      date = d3_time.day(date);
      date.setDate(1);
      return date;
    }, function(date, offset) {
      date.setMonth(date.getMonth() + offset);
    }, function(date) {
      return date.getMonth();
    });
    d3_time.months = d3_time.month.range;
    d3_time.months.utc = d3_time.month.utc.range;
    function d3_time_scale(linear, methods, format) {
      function scale(x) {
        return linear(x);
      }
      scale.invert = function(x) {
        return d3_time_scaleDate(linear.invert(x));
      };
      scale.domain = function(x) {
        if (!arguments.length)
          return linear.domain().map(d3_time_scaleDate);
        linear.domain(x);
        return scale;
      };
      function tickMethod(extent, count) {
        var span = extent[1] - extent[0], target = span / count, i = d3.bisect(d3_time_scaleSteps, target);
        return i == d3_time_scaleSteps.length ? [methods.year, d3_scale_linearTickRange(extent.map(function(d) {
          return d / 31536000000;
        }), count)[2]] : !i ? [d3_time_scaleMilliseconds, d3_scale_linearTickRange(extent, count)[2]] : methods[target / d3_time_scaleSteps[i - 1] < d3_time_scaleSteps[i] / target ? i - 1 : i];
      }
      scale.nice = function(interval, skip) {
        var domain = scale.domain(), extent = d3_scaleExtent(domain), method = interval == null ? tickMethod(extent, 10) : typeof interval === "number" && tickMethod(extent, interval);
        if (method)
          interval = method[0], skip = method[1];
        function skipped(date) {
          return !isNaN(date) && !interval.range(date, d3_time_scaleDate(+date + 1), skip).length;
        }
        return scale.domain(d3_scale_nice(domain, skip > 1 ? {
          floor: function(date) {
            while (skipped(date = interval.floor(date)))
              date = d3_time_scaleDate(date - 1);
            return date;
          },
          ceil: function(date) {
            while (skipped(date = interval.ceil(date)))
              date = d3_time_scaleDate(+date + 1);
            return date;
          }
        } : interval));
      };
      scale.ticks = function(interval, skip) {
        var extent = d3_scaleExtent(scale.domain()), method = interval == null ? tickMethod(extent, 10) : typeof interval === "number" ? tickMethod(extent, interval) : !interval.range && [{
          range: interval
        }, skip];
        if (method)
          interval = method[0], skip = method[1];
        return interval.range(extent[0], d3_time_scaleDate(+extent[1] + 1), skip < 1 ? 1 : skip);
      };
      scale.tickFormat = function() {
        return format;
      };
      scale.copy = function() {
        return d3_time_scale(linear.copy(), methods, format);
      };
      return d3_scale_linearRebind(scale, linear);
    }
    function d3_time_scaleDate(t) {
      return new Date(t);
    }
    var d3_time_scaleSteps = [1000, 5000, 15000, 30000, 60000, 300000, 900000, 1800000, 3600000, 10800000, 21600000, 43200000, 86400000, 172800000, 604800000, 2592000000, 7776000000, 31536000000];
    var d3_time_scaleLocalMethods = [[d3_time.second, 1], [d3_time.second, 5], [d3_time.second, 15], [d3_time.second, 30], [d3_time.minute, 1], [d3_time.minute, 5], [d3_time.minute, 15], [d3_time.minute, 30], [d3_time.hour, 1], [d3_time.hour, 3], [d3_time.hour, 6], [d3_time.hour, 12], [d3_time.day, 1], [d3_time.day, 2], [d3_time.week, 1], [d3_time.month, 1], [d3_time.month, 3], [d3_time.year, 1]];
    var d3_time_scaleLocalFormat = d3_time_format.multi([[".%L", function(d) {
      return d.getMilliseconds();
    }], [":%S", function(d) {
      return d.getSeconds();
    }], ["%I:%M", function(d) {
      return d.getMinutes();
    }], ["%I %p", function(d) {
      return d.getHours();
    }], ["%a %d", function(d) {
      return d.getDay() && d.getDate() != 1;
    }], ["%b %d", function(d) {
      return d.getDate() != 1;
    }], ["%B", function(d) {
      return d.getMonth();
    }], ["%Y", d3_true]]);
    var d3_time_scaleMilliseconds = {
      range: function(start, stop, step) {
        return d3.range(Math.ceil(start / step) * step, +stop, step).map(d3_time_scaleDate);
      },
      floor: d3_identity,
      ceil: d3_identity
    };
    d3_time_scaleLocalMethods.year = d3_time.year;
    d3_time.scale = function() {
      return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat);
    };
    var d3_time_scaleUtcMethods = d3_time_scaleLocalMethods.map(function(m) {
      return [m[0].utc, m[1]];
    });
    var d3_time_scaleUtcFormat = d3_time_formatUtc.multi([[".%L", function(d) {
      return d.getUTCMilliseconds();
    }], [":%S", function(d) {
      return d.getUTCSeconds();
    }], ["%I:%M", function(d) {
      return d.getUTCMinutes();
    }], ["%I %p", function(d) {
      return d.getUTCHours();
    }], ["%a %d", function(d) {
      return d.getUTCDay() && d.getUTCDate() != 1;
    }], ["%b %d", function(d) {
      return d.getUTCDate() != 1;
    }], ["%B", function(d) {
      return d.getUTCMonth();
    }], ["%Y", d3_true]]);
    d3_time_scaleUtcMethods.year = d3_time.year.utc;
    d3_time.scale.utc = function() {
      return d3_time_scale(d3.scale.linear(), d3_time_scaleUtcMethods, d3_time_scaleUtcFormat);
    };
    d3.text = d3_xhrType(function(request) {
      return request.responseText;
    });
    d3.json = function(url, callback) {
      return d3_xhr(url, "application/json", d3_json, callback);
    };
    function d3_json(request) {
      return JSON.parse(request.responseText);
    }
    d3.html = function(url, callback) {
      return d3_xhr(url, "text/html", d3_html, callback);
    };
    function d3_html(request) {
      var range = d3_document.createRange();
      range.selectNode(d3_document.body);
      return range.createContextualFragment(request.responseText);
    }
    d3.xml = d3_xhrType(function(request) {
      return request.responseXML;
    });
    if (typeof define === "function" && define.amd)
      this.d3 = d3, define(d3);
    else if (typeof module === "object" && module.exports)
      module.exports = d3;
    else
      this.d3 = d3;
  })();
});

// src/gtr-cof.ts
var d38 = __toESM(require_d3(), 1);

// src/menu-module.ts
function init() {
  let menuItems = document.getElementsByClassName("menu");
  for (let menuItem of menuItems) {
    menuItem.addEventListener("click", onMenuClick);
  }
  document.addEventListener("mouseup", (event) => {
    let targetElement = event.target;
    if (targetElement.closest(".dropdown-content") === null && targetElement.closest(".menu") === null) {
      let contentElements = document.getElementsByClassName("dropdown-content");
      for (let contentElement of contentElements) {
        if (contentElement.classList.contains("dropdown-content-visible")) {
          contentElement.classList.remove("dropdown-content-visible");
        }
      }
    }
  });
}
function onMenuClick(event) {
  let menuElement = event.target;
  let currentContentElement = menuElement.parentElement.querySelector(".dropdown-content");
  let contentElements = document.getElementsByClassName("dropdown-content");
  for (let contentElement of contentElements) {
    if (contentElement === currentContentElement) {
      currentContentElement.classList.toggle("dropdown-content-visible");
    } else {
      contentElement.classList.remove("dropdown-content-visible");
    }
  }
}

// src/tonics-module.ts
var d3 = __toESM(require_d3(), 1);

// node_modules/zod/v4/classic/external.js
var exports_external = {};
__export(exports_external, {
  xor: () => xor,
  xid: () => xid2,
  void: () => _void2,
  uuidv7: () => uuidv7,
  uuidv6: () => uuidv6,
  uuidv4: () => uuidv4,
  uuid: () => uuid2,
  util: () => exports_util,
  url: () => url,
  uppercase: () => _uppercase,
  unknown: () => unknown,
  union: () => union,
  undefined: () => _undefined3,
  ulid: () => ulid2,
  uint64: () => uint64,
  uint32: () => uint32,
  tuple: () => tuple,
  trim: () => _trim,
  treeifyError: () => treeifyError,
  transform: () => transform,
  toUpperCase: () => _toUpperCase,
  toLowerCase: () => _toLowerCase,
  toJSONSchema: () => toJSONSchema,
  templateLiteral: () => templateLiteral,
  symbol: () => symbol,
  superRefine: () => superRefine,
  success: () => success,
  stringbool: () => stringbool,
  stringFormat: () => stringFormat,
  string: () => string2,
  strictObject: () => strictObject,
  startsWith: () => _startsWith,
  slugify: () => _slugify,
  size: () => _size,
  setErrorMap: () => setErrorMap,
  set: () => set,
  safeParseAsync: () => safeParseAsync2,
  safeParse: () => safeParse2,
  safeEncodeAsync: () => safeEncodeAsync2,
  safeEncode: () => safeEncode2,
  safeDecodeAsync: () => safeDecodeAsync2,
  safeDecode: () => safeDecode2,
  registry: () => registry,
  regexes: () => exports_regexes,
  regex: () => _regex,
  refine: () => refine,
  record: () => record,
  readonly: () => readonly,
  property: () => _property,
  promise: () => promise,
  prettifyError: () => prettifyError,
  preprocess: () => preprocess,
  prefault: () => prefault,
  positive: () => _positive,
  pipe: () => pipe,
  partialRecord: () => partialRecord,
  parseAsync: () => parseAsync2,
  parse: () => parse3,
  overwrite: () => _overwrite,
  optional: () => optional,
  object: () => object,
  number: () => number2,
  nullish: () => nullish2,
  nullable: () => nullable,
  null: () => _null3,
  normalize: () => _normalize,
  nonpositive: () => _nonpositive,
  nonoptional: () => nonoptional,
  nonnegative: () => _nonnegative,
  never: () => never,
  negative: () => _negative,
  nativeEnum: () => nativeEnum,
  nanoid: () => nanoid2,
  nan: () => nan,
  multipleOf: () => _multipleOf,
  minSize: () => _minSize,
  minLength: () => _minLength,
  mime: () => _mime,
  meta: () => meta2,
  maxSize: () => _maxSize,
  maxLength: () => _maxLength,
  map: () => map,
  mac: () => mac2,
  lte: () => _lte,
  lt: () => _lt,
  lowercase: () => _lowercase,
  looseRecord: () => looseRecord,
  looseObject: () => looseObject,
  locales: () => exports_locales,
  literal: () => literal,
  length: () => _length,
  lazy: () => lazy,
  ksuid: () => ksuid2,
  keyof: () => keyof,
  jwt: () => jwt,
  json: () => json,
  iso: () => exports_iso,
  ipv6: () => ipv62,
  ipv4: () => ipv42,
  intersection: () => intersection,
  int64: () => int64,
  int32: () => int32,
  int: () => int,
  instanceof: () => _instanceof,
  includes: () => _includes,
  httpUrl: () => httpUrl,
  hostname: () => hostname2,
  hex: () => hex2,
  hash: () => hash,
  guid: () => guid2,
  gte: () => _gte,
  gt: () => _gt,
  globalRegistry: () => globalRegistry,
  getErrorMap: () => getErrorMap,
  function: () => _function,
  fromJSONSchema: () => fromJSONSchema,
  formatError: () => formatError,
  float64: () => float64,
  float32: () => float32,
  flattenError: () => flattenError,
  file: () => file,
  exactOptional: () => exactOptional,
  enum: () => _enum2,
  endsWith: () => _endsWith,
  encodeAsync: () => encodeAsync2,
  encode: () => encode2,
  emoji: () => emoji2,
  email: () => email2,
  e164: () => e1642,
  discriminatedUnion: () => discriminatedUnion,
  describe: () => describe2,
  decodeAsync: () => decodeAsync2,
  decode: () => decode2,
  date: () => date3,
  custom: () => custom,
  cuid2: () => cuid22,
  cuid: () => cuid3,
  core: () => exports_core2,
  config: () => config,
  coerce: () => exports_coerce,
  codec: () => codec,
  clone: () => clone,
  cidrv6: () => cidrv62,
  cidrv4: () => cidrv42,
  check: () => check,
  catch: () => _catch2,
  boolean: () => boolean2,
  bigint: () => bigint2,
  base64url: () => base64url2,
  base64: () => base642,
  array: () => array,
  any: () => any,
  _function: () => _function,
  _default: () => _default2,
  _ZodString: () => _ZodString,
  ZodXor: () => ZodXor,
  ZodXID: () => ZodXID,
  ZodVoid: () => ZodVoid,
  ZodUnknown: () => ZodUnknown,
  ZodUnion: () => ZodUnion,
  ZodUndefined: () => ZodUndefined,
  ZodUUID: () => ZodUUID,
  ZodURL: () => ZodURL,
  ZodULID: () => ZodULID,
  ZodType: () => ZodType,
  ZodTuple: () => ZodTuple,
  ZodTransform: () => ZodTransform,
  ZodTemplateLiteral: () => ZodTemplateLiteral,
  ZodSymbol: () => ZodSymbol,
  ZodSuccess: () => ZodSuccess,
  ZodStringFormat: () => ZodStringFormat,
  ZodString: () => ZodString,
  ZodSet: () => ZodSet,
  ZodRecord: () => ZodRecord,
  ZodRealError: () => ZodRealError,
  ZodReadonly: () => ZodReadonly,
  ZodPromise: () => ZodPromise,
  ZodPrefault: () => ZodPrefault,
  ZodPipe: () => ZodPipe,
  ZodOptional: () => ZodOptional,
  ZodObject: () => ZodObject,
  ZodNumberFormat: () => ZodNumberFormat,
  ZodNumber: () => ZodNumber,
  ZodNullable: () => ZodNullable,
  ZodNull: () => ZodNull,
  ZodNonOptional: () => ZodNonOptional,
  ZodNever: () => ZodNever,
  ZodNanoID: () => ZodNanoID,
  ZodNaN: () => ZodNaN,
  ZodMap: () => ZodMap,
  ZodMAC: () => ZodMAC,
  ZodLiteral: () => ZodLiteral,
  ZodLazy: () => ZodLazy,
  ZodKSUID: () => ZodKSUID,
  ZodJWT: () => ZodJWT,
  ZodIssueCode: () => ZodIssueCode,
  ZodIntersection: () => ZodIntersection,
  ZodISOTime: () => ZodISOTime,
  ZodISODuration: () => ZodISODuration,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODate: () => ZodISODate,
  ZodIPv6: () => ZodIPv6,
  ZodIPv4: () => ZodIPv4,
  ZodGUID: () => ZodGUID,
  ZodFunction: () => ZodFunction,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFile: () => ZodFile,
  ZodExactOptional: () => ZodExactOptional,
  ZodError: () => ZodError,
  ZodEnum: () => ZodEnum,
  ZodEmoji: () => ZodEmoji,
  ZodEmail: () => ZodEmail,
  ZodE164: () => ZodE164,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodDefault: () => ZodDefault,
  ZodDate: () => ZodDate,
  ZodCustomStringFormat: () => ZodCustomStringFormat,
  ZodCustom: () => ZodCustom,
  ZodCodec: () => ZodCodec,
  ZodCatch: () => ZodCatch,
  ZodCUID2: () => ZodCUID2,
  ZodCUID: () => ZodCUID,
  ZodCIDRv6: () => ZodCIDRv6,
  ZodCIDRv4: () => ZodCIDRv4,
  ZodBoolean: () => ZodBoolean,
  ZodBigIntFormat: () => ZodBigIntFormat,
  ZodBigInt: () => ZodBigInt,
  ZodBase64URL: () => ZodBase64URL,
  ZodBase64: () => ZodBase64,
  ZodArray: () => ZodArray,
  ZodAny: () => ZodAny,
  TimePrecision: () => TimePrecision,
  NEVER: () => NEVER,
  $output: () => $output,
  $input: () => $input,
  $brand: () => $brand
});

// node_modules/zod/v4/core/index.js
var exports_core2 = {};
__export(exports_core2, {
  version: () => version,
  util: () => exports_util,
  treeifyError: () => treeifyError,
  toJSONSchema: () => toJSONSchema,
  toDotPath: () => toDotPath,
  safeParseAsync: () => safeParseAsync,
  safeParse: () => safeParse,
  safeEncodeAsync: () => safeEncodeAsync,
  safeEncode: () => safeEncode,
  safeDecodeAsync: () => safeDecodeAsync,
  safeDecode: () => safeDecode,
  registry: () => registry,
  regexes: () => exports_regexes,
  process: () => process,
  prettifyError: () => prettifyError,
  parseAsync: () => parseAsync,
  parse: () => parse,
  meta: () => meta,
  locales: () => exports_locales,
  isValidJWT: () => isValidJWT,
  isValidBase64URL: () => isValidBase64URL,
  isValidBase64: () => isValidBase64,
  initializeContext: () => initializeContext,
  globalRegistry: () => globalRegistry,
  globalConfig: () => globalConfig,
  formatError: () => formatError,
  flattenError: () => flattenError,
  finalize: () => finalize,
  extractDefs: () => extractDefs,
  encodeAsync: () => encodeAsync,
  encode: () => encode,
  describe: () => describe,
  decodeAsync: () => decodeAsync,
  decode: () => decode,
  createToJSONSchemaMethod: () => createToJSONSchemaMethod,
  createStandardJSONSchemaMethod: () => createStandardJSONSchemaMethod,
  config: () => config,
  clone: () => clone,
  _xor: () => _xor,
  _xid: () => _xid,
  _void: () => _void,
  _uuidv7: () => _uuidv7,
  _uuidv6: () => _uuidv6,
  _uuidv4: () => _uuidv4,
  _uuid: () => _uuid,
  _url: () => _url,
  _uppercase: () => _uppercase,
  _unknown: () => _unknown,
  _union: () => _union,
  _undefined: () => _undefined2,
  _ulid: () => _ulid,
  _uint64: () => _uint64,
  _uint32: () => _uint32,
  _tuple: () => _tuple,
  _trim: () => _trim,
  _transform: () => _transform,
  _toUpperCase: () => _toUpperCase,
  _toLowerCase: () => _toLowerCase,
  _templateLiteral: () => _templateLiteral,
  _symbol: () => _symbol,
  _superRefine: () => _superRefine,
  _success: () => _success,
  _stringbool: () => _stringbool,
  _stringFormat: () => _stringFormat,
  _string: () => _string,
  _startsWith: () => _startsWith,
  _slugify: () => _slugify,
  _size: () => _size,
  _set: () => _set,
  _safeParseAsync: () => _safeParseAsync,
  _safeParse: () => _safeParse,
  _safeEncodeAsync: () => _safeEncodeAsync,
  _safeEncode: () => _safeEncode,
  _safeDecodeAsync: () => _safeDecodeAsync,
  _safeDecode: () => _safeDecode,
  _regex: () => _regex,
  _refine: () => _refine,
  _record: () => _record,
  _readonly: () => _readonly,
  _property: () => _property,
  _promise: () => _promise,
  _positive: () => _positive,
  _pipe: () => _pipe,
  _parseAsync: () => _parseAsync,
  _parse: () => _parse,
  _overwrite: () => _overwrite,
  _optional: () => _optional,
  _number: () => _number,
  _nullable: () => _nullable,
  _null: () => _null2,
  _normalize: () => _normalize,
  _nonpositive: () => _nonpositive,
  _nonoptional: () => _nonoptional,
  _nonnegative: () => _nonnegative,
  _never: () => _never,
  _negative: () => _negative,
  _nativeEnum: () => _nativeEnum,
  _nanoid: () => _nanoid,
  _nan: () => _nan,
  _multipleOf: () => _multipleOf,
  _minSize: () => _minSize,
  _minLength: () => _minLength,
  _min: () => _gte,
  _mime: () => _mime,
  _maxSize: () => _maxSize,
  _maxLength: () => _maxLength,
  _max: () => _lte,
  _map: () => _map,
  _mac: () => _mac,
  _lte: () => _lte,
  _lt: () => _lt,
  _lowercase: () => _lowercase,
  _literal: () => _literal,
  _length: () => _length,
  _lazy: () => _lazy,
  _ksuid: () => _ksuid,
  _jwt: () => _jwt,
  _isoTime: () => _isoTime,
  _isoDuration: () => _isoDuration,
  _isoDateTime: () => _isoDateTime,
  _isoDate: () => _isoDate,
  _ipv6: () => _ipv6,
  _ipv4: () => _ipv4,
  _intersection: () => _intersection,
  _int64: () => _int64,
  _int32: () => _int32,
  _int: () => _int,
  _includes: () => _includes,
  _guid: () => _guid,
  _gte: () => _gte,
  _gt: () => _gt,
  _float64: () => _float64,
  _float32: () => _float32,
  _file: () => _file,
  _enum: () => _enum,
  _endsWith: () => _endsWith,
  _encodeAsync: () => _encodeAsync,
  _encode: () => _encode,
  _emoji: () => _emoji2,
  _email: () => _email,
  _e164: () => _e164,
  _discriminatedUnion: () => _discriminatedUnion,
  _default: () => _default,
  _decodeAsync: () => _decodeAsync,
  _decode: () => _decode,
  _date: () => _date,
  _custom: () => _custom,
  _cuid2: () => _cuid2,
  _cuid: () => _cuid,
  _coercedString: () => _coercedString,
  _coercedNumber: () => _coercedNumber,
  _coercedDate: () => _coercedDate,
  _coercedBoolean: () => _coercedBoolean,
  _coercedBigint: () => _coercedBigint,
  _cidrv6: () => _cidrv6,
  _cidrv4: () => _cidrv4,
  _check: () => _check,
  _catch: () => _catch,
  _boolean: () => _boolean,
  _bigint: () => _bigint,
  _base64url: () => _base64url,
  _base64: () => _base64,
  _array: () => _array,
  _any: () => _any,
  TimePrecision: () => TimePrecision,
  NEVER: () => NEVER,
  JSONSchemaGenerator: () => JSONSchemaGenerator,
  JSONSchema: () => exports_json_schema,
  Doc: () => Doc,
  $output: () => $output,
  $input: () => $input,
  $constructor: () => $constructor,
  $brand: () => $brand,
  $ZodXor: () => $ZodXor,
  $ZodXID: () => $ZodXID,
  $ZodVoid: () => $ZodVoid,
  $ZodUnknown: () => $ZodUnknown,
  $ZodUnion: () => $ZodUnion,
  $ZodUndefined: () => $ZodUndefined,
  $ZodUUID: () => $ZodUUID,
  $ZodURL: () => $ZodURL,
  $ZodULID: () => $ZodULID,
  $ZodType: () => $ZodType,
  $ZodTuple: () => $ZodTuple,
  $ZodTransform: () => $ZodTransform,
  $ZodTemplateLiteral: () => $ZodTemplateLiteral,
  $ZodSymbol: () => $ZodSymbol,
  $ZodSuccess: () => $ZodSuccess,
  $ZodStringFormat: () => $ZodStringFormat,
  $ZodString: () => $ZodString,
  $ZodSet: () => $ZodSet,
  $ZodRegistry: () => $ZodRegistry,
  $ZodRecord: () => $ZodRecord,
  $ZodRealError: () => $ZodRealError,
  $ZodReadonly: () => $ZodReadonly,
  $ZodPromise: () => $ZodPromise,
  $ZodPrefault: () => $ZodPrefault,
  $ZodPipe: () => $ZodPipe,
  $ZodOptional: () => $ZodOptional,
  $ZodObjectJIT: () => $ZodObjectJIT,
  $ZodObject: () => $ZodObject,
  $ZodNumberFormat: () => $ZodNumberFormat,
  $ZodNumber: () => $ZodNumber,
  $ZodNullable: () => $ZodNullable,
  $ZodNull: () => $ZodNull,
  $ZodNonOptional: () => $ZodNonOptional,
  $ZodNever: () => $ZodNever,
  $ZodNanoID: () => $ZodNanoID,
  $ZodNaN: () => $ZodNaN,
  $ZodMap: () => $ZodMap,
  $ZodMAC: () => $ZodMAC,
  $ZodLiteral: () => $ZodLiteral,
  $ZodLazy: () => $ZodLazy,
  $ZodKSUID: () => $ZodKSUID,
  $ZodJWT: () => $ZodJWT,
  $ZodIntersection: () => $ZodIntersection,
  $ZodISOTime: () => $ZodISOTime,
  $ZodISODuration: () => $ZodISODuration,
  $ZodISODateTime: () => $ZodISODateTime,
  $ZodISODate: () => $ZodISODate,
  $ZodIPv6: () => $ZodIPv6,
  $ZodIPv4: () => $ZodIPv4,
  $ZodGUID: () => $ZodGUID,
  $ZodFunction: () => $ZodFunction,
  $ZodFile: () => $ZodFile,
  $ZodExactOptional: () => $ZodExactOptional,
  $ZodError: () => $ZodError,
  $ZodEnum: () => $ZodEnum,
  $ZodEncodeError: () => $ZodEncodeError,
  $ZodEmoji: () => $ZodEmoji,
  $ZodEmail: () => $ZodEmail,
  $ZodE164: () => $ZodE164,
  $ZodDiscriminatedUnion: () => $ZodDiscriminatedUnion,
  $ZodDefault: () => $ZodDefault,
  $ZodDate: () => $ZodDate,
  $ZodCustomStringFormat: () => $ZodCustomStringFormat,
  $ZodCustom: () => $ZodCustom,
  $ZodCodec: () => $ZodCodec,
  $ZodCheckUpperCase: () => $ZodCheckUpperCase,
  $ZodCheckStringFormat: () => $ZodCheckStringFormat,
  $ZodCheckStartsWith: () => $ZodCheckStartsWith,
  $ZodCheckSizeEquals: () => $ZodCheckSizeEquals,
  $ZodCheckRegex: () => $ZodCheckRegex,
  $ZodCheckProperty: () => $ZodCheckProperty,
  $ZodCheckOverwrite: () => $ZodCheckOverwrite,
  $ZodCheckNumberFormat: () => $ZodCheckNumberFormat,
  $ZodCheckMultipleOf: () => $ZodCheckMultipleOf,
  $ZodCheckMinSize: () => $ZodCheckMinSize,
  $ZodCheckMinLength: () => $ZodCheckMinLength,
  $ZodCheckMimeType: () => $ZodCheckMimeType,
  $ZodCheckMaxSize: () => $ZodCheckMaxSize,
  $ZodCheckMaxLength: () => $ZodCheckMaxLength,
  $ZodCheckLowerCase: () => $ZodCheckLowerCase,
  $ZodCheckLessThan: () => $ZodCheckLessThan,
  $ZodCheckLengthEquals: () => $ZodCheckLengthEquals,
  $ZodCheckIncludes: () => $ZodCheckIncludes,
  $ZodCheckGreaterThan: () => $ZodCheckGreaterThan,
  $ZodCheckEndsWith: () => $ZodCheckEndsWith,
  $ZodCheckBigIntFormat: () => $ZodCheckBigIntFormat,
  $ZodCheck: () => $ZodCheck,
  $ZodCatch: () => $ZodCatch,
  $ZodCUID2: () => $ZodCUID2,
  $ZodCUID: () => $ZodCUID,
  $ZodCIDRv6: () => $ZodCIDRv6,
  $ZodCIDRv4: () => $ZodCIDRv4,
  $ZodBoolean: () => $ZodBoolean,
  $ZodBigIntFormat: () => $ZodBigIntFormat,
  $ZodBigInt: () => $ZodBigInt,
  $ZodBase64URL: () => $ZodBase64URL,
  $ZodBase64: () => $ZodBase64,
  $ZodAsyncError: () => $ZodAsyncError,
  $ZodArray: () => $ZodArray,
  $ZodAny: () => $ZodAny
});

// node_modules/zod/v4/core/core.js
var NEVER = Object.freeze({
  status: "aborted"
});
function $constructor(name, initializer, params) {
  function init2(inst, def) {
    if (!inst._zod) {
      Object.defineProperty(inst, "_zod", {
        value: {
          def,
          constr: _,
          traits: new Set
        },
        enumerable: false
      });
    }
    if (inst._zod.traits.has(name)) {
      return;
    }
    inst._zod.traits.add(name);
    initializer(inst, def);
    const proto = _.prototype;
    const keys = Object.keys(proto);
    for (let i = 0;i < keys.length; i++) {
      const k = keys[i];
      if (!(k in inst)) {
        inst[k] = proto[k].bind(inst);
      }
    }
  }
  const Parent = params?.Parent ?? Object;

  class Definition extends Parent {
  }
  Object.defineProperty(Definition, "name", { value: name });
  function _(def) {
    var _a;
    const inst = params?.Parent ? new Definition : this;
    init2(inst, def);
    (_a = inst._zod).deferred ?? (_a.deferred = []);
    for (const fn of inst._zod.deferred) {
      fn();
    }
    return inst;
  }
  Object.defineProperty(_, "init", { value: init2 });
  Object.defineProperty(_, Symbol.hasInstance, {
    value: (inst) => {
      if (params?.Parent && inst instanceof params.Parent)
        return true;
      return inst?._zod?.traits?.has(name);
    }
  });
  Object.defineProperty(_, "name", { value: name });
  return _;
}
var $brand = Symbol("zod_brand");

class $ZodAsyncError extends Error {
  constructor() {
    super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
  }
}

class $ZodEncodeError extends Error {
  constructor(name) {
    super(`Encountered unidirectional transform during encode: ${name}`);
    this.name = "ZodEncodeError";
  }
}
var globalConfig = {};
function config(newConfig) {
  if (newConfig)
    Object.assign(globalConfig, newConfig);
  return globalConfig;
}
// node_modules/zod/v4/core/util.js
var exports_util = {};
__export(exports_util, {
  unwrapMessage: () => unwrapMessage,
  uint8ArrayToHex: () => uint8ArrayToHex,
  uint8ArrayToBase64url: () => uint8ArrayToBase64url,
  uint8ArrayToBase64: () => uint8ArrayToBase64,
  stringifyPrimitive: () => stringifyPrimitive,
  slugify: () => slugify,
  shallowClone: () => shallowClone,
  safeExtend: () => safeExtend,
  required: () => required,
  randomString: () => randomString,
  propertyKeyTypes: () => propertyKeyTypes,
  promiseAllObject: () => promiseAllObject,
  primitiveTypes: () => primitiveTypes,
  prefixIssues: () => prefixIssues,
  pick: () => pick,
  partial: () => partial,
  parsedType: () => parsedType,
  optionalKeys: () => optionalKeys,
  omit: () => omit,
  objectClone: () => objectClone,
  numKeys: () => numKeys,
  nullish: () => nullish,
  normalizeParams: () => normalizeParams,
  mergeDefs: () => mergeDefs,
  merge: () => merge,
  jsonStringifyReplacer: () => jsonStringifyReplacer,
  joinValues: () => joinValues,
  issue: () => issue,
  isPlainObject: () => isPlainObject,
  isObject: () => isObject,
  hexToUint8Array: () => hexToUint8Array,
  getSizableOrigin: () => getSizableOrigin,
  getParsedType: () => getParsedType,
  getLengthableOrigin: () => getLengthableOrigin,
  getEnumValues: () => getEnumValues,
  getElementAtPath: () => getElementAtPath,
  floatSafeRemainder: () => floatSafeRemainder,
  finalizeIssue: () => finalizeIssue,
  extend: () => extend,
  escapeRegex: () => escapeRegex,
  esc: () => esc,
  defineLazy: () => defineLazy,
  createTransparentProxy: () => createTransparentProxy,
  cloneDef: () => cloneDef,
  clone: () => clone,
  cleanRegex: () => cleanRegex,
  cleanEnum: () => cleanEnum,
  captureStackTrace: () => captureStackTrace,
  cached: () => cached,
  base64urlToUint8Array: () => base64urlToUint8Array,
  base64ToUint8Array: () => base64ToUint8Array,
  assignProp: () => assignProp,
  assertNotEqual: () => assertNotEqual,
  assertNever: () => assertNever,
  assertIs: () => assertIs,
  assertEqual: () => assertEqual,
  assert: () => assert,
  allowsEval: () => allowsEval,
  aborted: () => aborted,
  NUMBER_FORMAT_RANGES: () => NUMBER_FORMAT_RANGES,
  Class: () => Class,
  BIGINT_FORMAT_RANGES: () => BIGINT_FORMAT_RANGES
});
function assertEqual(val) {
  return val;
}
function assertNotEqual(val) {
  return val;
}
function assertIs(_arg) {}
function assertNever(_x) {
  throw new Error("Unexpected value in exhaustive check");
}
function assert(_) {}
function getEnumValues(entries) {
  const numericValues = Object.values(entries).filter((v) => typeof v === "number");
  const values = Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
  return values;
}
function joinValues(array, separator = "|") {
  return array.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
  if (typeof value === "bigint")
    return value.toString();
  return value;
}
function cached(getter) {
  const set = false;
  return {
    get value() {
      if (!set) {
        const value = getter();
        Object.defineProperty(this, "value", { value });
        return value;
      }
      throw new Error("cached value already set");
    }
  };
}
function nullish(input) {
  return input === null || input === undefined;
}
function cleanRegex(source) {
  const start = source.startsWith("^") ? 1 : 0;
  const end = source.endsWith("$") ? source.length - 1 : source.length;
  return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepString = step.toString();
  let stepDecCount = (stepString.split(".")[1] || "").length;
  if (stepDecCount === 0 && /\d?e-\d?/.test(stepString)) {
    const match = stepString.match(/\d?e-(\d?)/);
    if (match?.[1]) {
      stepDecCount = Number.parseInt(match[1]);
    }
  }
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var EVALUATING = Symbol("evaluating");
function defineLazy(object, key, getter) {
  let value = undefined;
  Object.defineProperty(object, key, {
    get() {
      if (value === EVALUATING) {
        return;
      }
      if (value === undefined) {
        value = EVALUATING;
        value = getter();
      }
      return value;
    },
    set(v) {
      Object.defineProperty(object, key, {
        value: v
      });
    },
    configurable: true
  });
}
function objectClone(obj) {
  return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}
function assignProp(target, prop, value) {
  Object.defineProperty(target, prop, {
    value,
    writable: true,
    enumerable: true,
    configurable: true
  });
}
function mergeDefs(...defs) {
  const mergedDescriptors = {};
  for (const def of defs) {
    const descriptors = Object.getOwnPropertyDescriptors(def);
    Object.assign(mergedDescriptors, descriptors);
  }
  return Object.defineProperties({}, mergedDescriptors);
}
function cloneDef(schema) {
  return mergeDefs(schema._zod.def);
}
function getElementAtPath(obj, path) {
  if (!path)
    return obj;
  return path.reduce((acc, key) => acc?.[key], obj);
}
function promiseAllObject(promisesObj) {
  const keys = Object.keys(promisesObj);
  const promises = keys.map((key) => promisesObj[key]);
  return Promise.all(promises).then((results) => {
    const resolvedObj = {};
    for (let i = 0;i < keys.length; i++) {
      resolvedObj[keys[i]] = results[i];
    }
    return resolvedObj;
  });
}
function randomString(length = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let str = "";
  for (let i = 0;i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
function esc(str) {
  return JSON.stringify(str);
}
function slugify(input) {
  return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
function isObject(data) {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}
var allowsEval = cached(() => {
  if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
    return false;
  }
  try {
    const F = Function;
    new F("");
    return true;
  } catch (_) {
    return false;
  }
});
function isPlainObject(o) {
  if (isObject(o) === false)
    return false;
  const ctor = o.constructor;
  if (ctor === undefined)
    return true;
  if (typeof ctor !== "function")
    return true;
  const prot = ctor.prototype;
  if (isObject(prot) === false)
    return false;
  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
    return false;
  }
  return true;
}
function shallowClone(o) {
  if (isPlainObject(o))
    return { ...o };
  if (Array.isArray(o))
    return [...o];
  return o;
}
function numKeys(data) {
  let keyCount = 0;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      keyCount++;
    }
  }
  return keyCount;
}
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return "undefined";
    case "string":
      return "string";
    case "number":
      return Number.isNaN(data) ? "nan" : "number";
    case "boolean":
      return "boolean";
    case "function":
      return "function";
    case "bigint":
      return "bigint";
    case "symbol":
      return "symbol";
    case "object":
      if (Array.isArray(data)) {
        return "array";
      }
      if (data === null) {
        return "null";
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return "promise";
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return "map";
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return "set";
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return "date";
      }
      if (typeof File !== "undefined" && data instanceof File) {
        return "file";
      }
      return "object";
    default:
      throw new Error(`Unknown data type: ${t}`);
  }
};
var propertyKeyTypes = new Set(["string", "number", "symbol"]);
var primitiveTypes = new Set(["string", "number", "bigint", "boolean", "symbol", "undefined"]);
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
  const cl = new inst._zod.constr(def ?? inst._zod.def);
  if (!def || params?.parent)
    cl._zod.parent = inst;
  return cl;
}
function normalizeParams(_params) {
  const params = _params;
  if (!params)
    return {};
  if (typeof params === "string")
    return { error: () => params };
  if (params?.message !== undefined) {
    if (params?.error !== undefined)
      throw new Error("Cannot specify both `message` and `error` params");
    params.error = params.message;
  }
  delete params.message;
  if (typeof params.error === "string")
    return { ...params, error: () => params.error };
  return params;
}
function createTransparentProxy(getter) {
  let target;
  return new Proxy({}, {
    get(_, prop, receiver) {
      target ?? (target = getter());
      return Reflect.get(target, prop, receiver);
    },
    set(_, prop, value, receiver) {
      target ?? (target = getter());
      return Reflect.set(target, prop, value, receiver);
    },
    has(_, prop) {
      target ?? (target = getter());
      return Reflect.has(target, prop);
    },
    deleteProperty(_, prop) {
      target ?? (target = getter());
      return Reflect.deleteProperty(target, prop);
    },
    ownKeys(_) {
      target ?? (target = getter());
      return Reflect.ownKeys(target);
    },
    getOwnPropertyDescriptor(_, prop) {
      target ?? (target = getter());
      return Reflect.getOwnPropertyDescriptor(target, prop);
    },
    defineProperty(_, prop, descriptor) {
      target ?? (target = getter());
      return Reflect.defineProperty(target, prop, descriptor);
    }
  });
}
function stringifyPrimitive(value) {
  if (typeof value === "bigint")
    return value.toString() + "n";
  if (typeof value === "string")
    return `"${value}"`;
  return `${value}`;
}
function optionalKeys(shape) {
  return Object.keys(shape).filter((k) => {
    return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
  });
}
var NUMBER_FORMAT_RANGES = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-340282346638528860000000000000000000000, 340282346638528860000000000000000000000],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
var BIGINT_FORMAT_RANGES = {
  int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
  uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
};
function pick(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const newShape = {};
      for (const key in mask) {
        if (!(key in currDef.shape)) {
          throw new Error(`Unrecognized key: "${key}"`);
        }
        if (!mask[key])
          continue;
        newShape[key] = currDef.shape[key];
      }
      assignProp(this, "shape", newShape);
      return newShape;
    },
    checks: []
  });
  return clone(schema, def);
}
function omit(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const newShape = { ...schema._zod.def.shape };
      for (const key in mask) {
        if (!(key in currDef.shape)) {
          throw new Error(`Unrecognized key: "${key}"`);
        }
        if (!mask[key])
          continue;
        delete newShape[key];
      }
      assignProp(this, "shape", newShape);
      return newShape;
    },
    checks: []
  });
  return clone(schema, def);
}
function extend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to extend: expected a plain object");
  }
  const checks = schema._zod.def.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    const existingShape = schema._zod.def.shape;
    for (const key in shape) {
      if (Object.getOwnPropertyDescriptor(existingShape, key) !== undefined) {
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
      }
    }
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    }
  });
  return clone(schema, def);
}
function safeExtend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to safeExtend: expected a plain object");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    }
  });
  return clone(schema, def);
}
function merge(a, b) {
  const def = mergeDefs(a._zod.def, {
    get shape() {
      const _shape = { ...a._zod.def.shape, ...b._zod.def.shape };
      assignProp(this, "shape", _shape);
      return _shape;
    },
    get catchall() {
      return b._zod.def.catchall;
    },
    checks: []
  });
  return clone(a, def);
}
function partial(Class, schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const oldShape = schema._zod.def.shape;
      const shape = { ...oldShape };
      if (mask) {
        for (const key in mask) {
          if (!(key in oldShape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key])
            continue;
          shape[key] = Class ? new Class({
            type: "optional",
            innerType: oldShape[key]
          }) : oldShape[key];
        }
      } else {
        for (const key in oldShape) {
          shape[key] = Class ? new Class({
            type: "optional",
            innerType: oldShape[key]
          }) : oldShape[key];
        }
      }
      assignProp(this, "shape", shape);
      return shape;
    },
    checks: []
  });
  return clone(schema, def);
}
function required(Class, schema, mask) {
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const oldShape = schema._zod.def.shape;
      const shape = { ...oldShape };
      if (mask) {
        for (const key in mask) {
          if (!(key in shape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key])
            continue;
          shape[key] = new Class({
            type: "nonoptional",
            innerType: oldShape[key]
          });
        }
      } else {
        for (const key in oldShape) {
          shape[key] = new Class({
            type: "nonoptional",
            innerType: oldShape[key]
          });
        }
      }
      assignProp(this, "shape", shape);
      return shape;
    }
  });
  return clone(schema, def);
}
function aborted(x, startIndex = 0) {
  if (x.aborted === true)
    return true;
  for (let i = startIndex;i < x.issues.length; i++) {
    if (x.issues[i]?.continue !== true) {
      return true;
    }
  }
  return false;
}
function prefixIssues(path, issues) {
  return issues.map((iss) => {
    var _a;
    (_a = iss).path ?? (_a.path = []);
    iss.path.unshift(path);
    return iss;
  });
}
function unwrapMessage(message) {
  return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config2) {
  const full = { ...iss, path: iss.path ?? [] };
  if (!iss.message) {
    const message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config2.customError?.(iss)) ?? unwrapMessage(config2.localeError?.(iss)) ?? "Invalid input";
    full.message = message;
  }
  delete full.inst;
  delete full.continue;
  if (!ctx?.reportInput) {
    delete full.input;
  }
  return full;
}
function getSizableOrigin(input) {
  if (input instanceof Set)
    return "set";
  if (input instanceof Map)
    return "map";
  if (input instanceof File)
    return "file";
  return "unknown";
}
function getLengthableOrigin(input) {
  if (Array.isArray(input))
    return "array";
  if (typeof input === "string")
    return "string";
  return "unknown";
}
function parsedType(data) {
  const t = typeof data;
  switch (t) {
    case "number": {
      return Number.isNaN(data) ? "nan" : "number";
    }
    case "object": {
      if (data === null) {
        return "null";
      }
      if (Array.isArray(data)) {
        return "array";
      }
      const obj = data;
      if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) {
        return obj.constructor.name;
      }
    }
  }
  return t;
}
function issue(...args) {
  const [iss, input, inst] = args;
  if (typeof iss === "string") {
    return {
      message: iss,
      code: "custom",
      input,
      inst
    };
  }
  return { ...iss };
}
function cleanEnum(obj) {
  return Object.entries(obj).filter(([k, _]) => {
    return Number.isNaN(Number.parseInt(k, 10));
  }).map((el) => el[1]);
}
function base64ToUint8Array(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0;i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
function uint8ArrayToBase64(bytes) {
  let binaryString = "";
  for (let i = 0;i < bytes.length; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  return btoa(binaryString);
}
function base64urlToUint8Array(base64url) {
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - base64.length % 4) % 4);
  return base64ToUint8Array(base64 + padding);
}
function uint8ArrayToBase64url(bytes) {
  return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function hexToUint8Array(hex) {
  const cleanHex = hex.replace(/^0x/, "");
  if (cleanHex.length % 2 !== 0) {
    throw new Error("Invalid hex string length");
  }
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0;i < cleanHex.length; i += 2) {
    bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
  }
  return bytes;
}
function uint8ArrayToHex(bytes) {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

class Class {
  constructor(..._args) {}
}

// node_modules/zod/v4/core/errors.js
var initializer = (inst, def) => {
  inst.name = "$ZodError";
  Object.defineProperty(inst, "_zod", {
    value: inst._zod,
    enumerable: false
  });
  Object.defineProperty(inst, "issues", {
    value: def,
    enumerable: false
  });
  inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
  Object.defineProperty(inst, "toString", {
    value: () => inst.message,
    enumerable: false
  });
};
var $ZodError = $constructor("$ZodError", initializer);
var $ZodRealError = $constructor("$ZodError", initializer, { Parent: Error });
function flattenError(error, mapper = (issue2) => issue2.message) {
  const fieldErrors = {};
  const formErrors = [];
  for (const sub of error.issues) {
    if (sub.path.length > 0) {
      fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
      fieldErrors[sub.path[0]].push(mapper(sub));
    } else {
      formErrors.push(mapper(sub));
    }
  }
  return { formErrors, fieldErrors };
}
function formatError(error, mapper = (issue2) => issue2.message) {
  const fieldErrors = { _errors: [] };
  const processError = (error2) => {
    for (const issue2 of error2.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues });
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues });
      } else if (issue2.path.length === 0) {
        fieldErrors._errors.push(mapper(issue2));
      } else {
        let curr = fieldErrors;
        let i = 0;
        while (i < issue2.path.length) {
          const el = issue2.path[i];
          const terminal = i === issue2.path.length - 1;
          if (!terminal) {
            curr[el] = curr[el] || { _errors: [] };
          } else {
            curr[el] = curr[el] || { _errors: [] };
            curr[el]._errors.push(mapper(issue2));
          }
          curr = curr[el];
          i++;
        }
      }
    }
  };
  processError(error);
  return fieldErrors;
}
function treeifyError(error, mapper = (issue2) => issue2.message) {
  const result = { errors: [] };
  const processError = (error2, path = []) => {
    var _a, _b;
    for (const issue2 of error2.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }, issue2.path));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues }, issue2.path);
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues }, issue2.path);
      } else {
        const fullpath = [...path, ...issue2.path];
        if (fullpath.length === 0) {
          result.errors.push(mapper(issue2));
          continue;
        }
        let curr = result;
        let i = 0;
        while (i < fullpath.length) {
          const el = fullpath[i];
          const terminal = i === fullpath.length - 1;
          if (typeof el === "string") {
            curr.properties ?? (curr.properties = {});
            (_a = curr.properties)[el] ?? (_a[el] = { errors: [] });
            curr = curr.properties[el];
          } else {
            curr.items ?? (curr.items = []);
            (_b = curr.items)[el] ?? (_b[el] = { errors: [] });
            curr = curr.items[el];
          }
          if (terminal) {
            curr.errors.push(mapper(issue2));
          }
          i++;
        }
      }
    }
  };
  processError(error);
  return result;
}
function toDotPath(_path) {
  const segs = [];
  const path = _path.map((seg) => typeof seg === "object" ? seg.key : seg);
  for (const seg of path) {
    if (typeof seg === "number")
      segs.push(`[${seg}]`);
    else if (typeof seg === "symbol")
      segs.push(`[${JSON.stringify(String(seg))}]`);
    else if (/[^\w$]/.test(seg))
      segs.push(`[${JSON.stringify(seg)}]`);
    else {
      if (segs.length)
        segs.push(".");
      segs.push(seg);
    }
  }
  return segs.join("");
}
function prettifyError(error) {
  const lines = [];
  const issues = [...error.issues].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length);
  for (const issue2 of issues) {
    lines.push(`✖ ${issue2.message}`);
    if (issue2.path?.length)
      lines.push(`  → at ${toDotPath(issue2.path)}`);
  }
  return lines.join(`
`);
}

// node_modules/zod/v4/core/parse.js
var _parse = (_Err) => (schema, value, _ctx, _params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError;
  }
  if (result.issues.length) {
    const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, _params?.callee);
    throw e;
  }
  return result.value;
};
var parse = /* @__PURE__ */ _parse($ZodRealError);
var _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  if (result.issues.length) {
    const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, params?.callee);
    throw e;
  }
  return result.value;
};
var parseAsync = /* @__PURE__ */ _parseAsync($ZodRealError);
var _safeParse = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError;
  }
  return result.issues.length ? {
    success: false,
    error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result.value };
};
var safeParse = /* @__PURE__ */ _safeParse($ZodRealError);
var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  return result.issues.length ? {
    success: false,
    error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result.value };
};
var safeParseAsync = /* @__PURE__ */ _safeParseAsync($ZodRealError);
var _encode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _parse(_Err)(schema, value, ctx);
};
var encode = /* @__PURE__ */ _encode($ZodRealError);
var _decode = (_Err) => (schema, value, _ctx) => {
  return _parse(_Err)(schema, value, _ctx);
};
var decode = /* @__PURE__ */ _decode($ZodRealError);
var _encodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _parseAsync(_Err)(schema, value, ctx);
};
var encodeAsync = /* @__PURE__ */ _encodeAsync($ZodRealError);
var _decodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _parseAsync(_Err)(schema, value, _ctx);
};
var decodeAsync = /* @__PURE__ */ _decodeAsync($ZodRealError);
var _safeEncode = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _safeParse(_Err)(schema, value, ctx);
};
var safeEncode = /* @__PURE__ */ _safeEncode($ZodRealError);
var _safeDecode = (_Err) => (schema, value, _ctx) => {
  return _safeParse(_Err)(schema, value, _ctx);
};
var safeDecode = /* @__PURE__ */ _safeDecode($ZodRealError);
var _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
  return _safeParseAsync(_Err)(schema, value, ctx);
};
var safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync($ZodRealError);
var _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
  return _safeParseAsync(_Err)(schema, value, _ctx);
};
var safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync($ZodRealError);
// node_modules/zod/v4/core/regexes.js
var exports_regexes = {};
__export(exports_regexes, {
  xid: () => xid,
  uuid7: () => uuid7,
  uuid6: () => uuid6,
  uuid4: () => uuid4,
  uuid: () => uuid,
  uppercase: () => uppercase,
  unicodeEmail: () => unicodeEmail,
  undefined: () => _undefined,
  ulid: () => ulid,
  time: () => time,
  string: () => string,
  sha512_hex: () => sha512_hex,
  sha512_base64url: () => sha512_base64url,
  sha512_base64: () => sha512_base64,
  sha384_hex: () => sha384_hex,
  sha384_base64url: () => sha384_base64url,
  sha384_base64: () => sha384_base64,
  sha256_hex: () => sha256_hex,
  sha256_base64url: () => sha256_base64url,
  sha256_base64: () => sha256_base64,
  sha1_hex: () => sha1_hex,
  sha1_base64url: () => sha1_base64url,
  sha1_base64: () => sha1_base64,
  rfc5322Email: () => rfc5322Email,
  number: () => number,
  null: () => _null,
  nanoid: () => nanoid,
  md5_hex: () => md5_hex,
  md5_base64url: () => md5_base64url,
  md5_base64: () => md5_base64,
  mac: () => mac,
  lowercase: () => lowercase,
  ksuid: () => ksuid,
  ipv6: () => ipv6,
  ipv4: () => ipv4,
  integer: () => integer,
  idnEmail: () => idnEmail,
  html5Email: () => html5Email,
  hostname: () => hostname,
  hex: () => hex,
  guid: () => guid,
  extendedDuration: () => extendedDuration,
  emoji: () => emoji,
  email: () => email,
  e164: () => e164,
  duration: () => duration,
  domain: () => domain,
  datetime: () => datetime,
  date: () => date,
  cuid2: () => cuid2,
  cuid: () => cuid,
  cidrv6: () => cidrv6,
  cidrv4: () => cidrv4,
  browserEmail: () => browserEmail,
  boolean: () => boolean,
  bigint: () => bigint,
  base64url: () => base64url,
  base64: () => base64
});
var cuid = /^[cC][^\s-]{8,}$/;
var cuid2 = /^[0-9a-z]+$/;
var ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
var xid = /^[0-9a-vA-V]{20}$/;
var ksuid = /^[A-Za-z0-9]{27}$/;
var nanoid = /^[a-zA-Z0-9_-]{21}$/;
var duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
var extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
var uuid = (version) => {
  if (!version)
    return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
  return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
var uuid4 = /* @__PURE__ */ uuid(4);
var uuid6 = /* @__PURE__ */ uuid(6);
var uuid7 = /* @__PURE__ */ uuid(7);
var email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
var html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
var idnEmail = unicodeEmail;
var browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var _emoji = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
  return new RegExp(_emoji, "u");
}
var ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
var mac = (delimiter) => {
  const escapedDelim = escapeRegex(delimiter ?? ":");
  return new RegExp(`^(?:[0-9A-F]{2}${escapedDelim}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${escapedDelim}){5}[0-9a-f]{2}$`);
};
var cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
var cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var base64url = /^[A-Za-z0-9_-]*$/;
var hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
var domain = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
var e164 = /^\+[1-9]\d{6,14}$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
var date = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
function timeSource(args) {
  const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
  const regex = typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
  return regex;
}
function time(args) {
  return new RegExp(`^${timeSource(args)}$`);
}
function datetime(args) {
  const time2 = timeSource({ precision: args.precision });
  const opts = ["Z"];
  if (args.local)
    opts.push("");
  if (args.offset)
    opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
  const timeRegex = `${time2}(?:${opts.join("|")})`;
  return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
var string = (params) => {
  const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
  return new RegExp(`^${regex}$`);
};
var bigint = /^-?\d+n?$/;
var integer = /^-?\d+$/;
var number = /^-?\d+(?:\.\d+)?$/;
var boolean = /^(?:true|false)$/i;
var _null = /^null$/i;
var _undefined = /^undefined$/i;
var lowercase = /^[^A-Z]*$/;
var uppercase = /^[^a-z]*$/;
var hex = /^[0-9a-fA-F]*$/;
function fixedBase64(bodyLength, padding) {
  return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
}
function fixedBase64url(length) {
  return new RegExp(`^[A-Za-z0-9_-]{${length}}$`);
}
var md5_hex = /^[0-9a-fA-F]{32}$/;
var md5_base64 = /* @__PURE__ */ fixedBase64(22, "==");
var md5_base64url = /* @__PURE__ */ fixedBase64url(22);
var sha1_hex = /^[0-9a-fA-F]{40}$/;
var sha1_base64 = /* @__PURE__ */ fixedBase64(27, "=");
var sha1_base64url = /* @__PURE__ */ fixedBase64url(27);
var sha256_hex = /^[0-9a-fA-F]{64}$/;
var sha256_base64 = /* @__PURE__ */ fixedBase64(43, "=");
var sha256_base64url = /* @__PURE__ */ fixedBase64url(43);
var sha384_hex = /^[0-9a-fA-F]{96}$/;
var sha384_base64 = /* @__PURE__ */ fixedBase64(64, "");
var sha384_base64url = /* @__PURE__ */ fixedBase64url(64);
var sha512_hex = /^[0-9a-fA-F]{128}$/;
var sha512_base64 = /* @__PURE__ */ fixedBase64(86, "==");
var sha512_base64url = /* @__PURE__ */ fixedBase64url(86);

// node_modules/zod/v4/core/checks.js
var $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
  var _a;
  inst._zod ?? (inst._zod = {});
  inst._zod.def = def;
  (_a = inst._zod).onattach ?? (_a.onattach = []);
});
var numericOriginMap = {
  number: "number",
  bigint: "bigint",
  object: "date"
};
var $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    if (def.value < curr) {
      if (def.inclusive)
        bag.maximum = def.value;
      else
        bag.exclusiveMaximum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    if (def.value > curr) {
      if (def.inclusive)
        bag.minimum = def.value;
      else
        bag.exclusiveMinimum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    var _a;
    (_a = inst2._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
  });
  inst._zod.check = (payload) => {
    if (typeof payload.value !== typeof def.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    const isMultiple = typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0;
    if (isMultiple)
      return;
    payload.issues.push({
      origin: typeof payload.value,
      code: "not_multiple_of",
      divisor: def.value,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  def.format = def.format || "float64";
  const isInt = def.format?.includes("int");
  const origin = isInt ? "int" : "number";
  const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    bag.minimum = minimum;
    bag.maximum = maximum;
    if (isInt)
      bag.pattern = integer;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (isInt) {
      if (!Number.isInteger(input)) {
        payload.issues.push({
          expected: origin,
          format: def.format,
          code: "invalid_type",
          continue: false,
          input,
          inst
        });
        return;
      }
      if (!Number.isSafeInteger(input)) {
        if (input > 0) {
          payload.issues.push({
            input,
            code: "too_big",
            maximum: Number.MAX_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        } else {
          payload.issues.push({
            input,
            code: "too_small",
            minimum: Number.MIN_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        }
        return;
      }
    }
    if (input < minimum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_big",
        maximum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodCheckBigIntFormat = /* @__PURE__ */ $constructor("$ZodCheckBigIntFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  const [minimum, maximum] = BIGINT_FORMAT_RANGES[def.format];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    bag.minimum = minimum;
    bag.maximum = maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (input < minimum) {
      payload.issues.push({
        origin: "bigint",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "bigint",
        input,
        code: "too_big",
        maximum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodCheckMaxSize = /* @__PURE__ */ $constructor("$ZodCheckMaxSize", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.size !== undefined;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (def.maximum < curr)
      inst2._zod.bag.maximum = def.maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size <= def.maximum)
      return;
    payload.issues.push({
      origin: getSizableOrigin(input),
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMinSize = /* @__PURE__ */ $constructor("$ZodCheckMinSize", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.size !== undefined;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (def.minimum > curr)
      inst2._zod.bag.minimum = def.minimum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size >= def.minimum)
      return;
    payload.issues.push({
      origin: getSizableOrigin(input),
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckSizeEquals = /* @__PURE__ */ $constructor("$ZodCheckSizeEquals", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.size !== undefined;
  });
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.minimum = def.size;
    bag.maximum = def.size;
    bag.size = def.size;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const size = input.size;
    if (size === def.size)
      return;
    const tooBig = size > def.size;
    payload.issues.push({
      origin: getSizableOrigin(input),
      ...tooBig ? { code: "too_big", maximum: def.size } : { code: "too_small", minimum: def.size },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== undefined;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    if (def.maximum < curr)
      inst2._zod.bag.maximum = def.maximum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length <= def.maximum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: def.maximum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== undefined;
  });
  inst._zod.onattach.push((inst2) => {
    const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    if (def.minimum > curr)
      inst2._zod.bag.minimum = def.minimum;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length >= def.minimum)
      return;
    const origin = getLengthableOrigin(input);
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: def.minimum,
      inclusive: true,
      input,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
  var _a;
  $ZodCheck.init(inst, def);
  (_a = inst._zod.def).when ?? (_a.when = (payload) => {
    const val = payload.value;
    return !nullish(val) && val.length !== undefined;
  });
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.minimum = def.length;
    bag.maximum = def.length;
    bag.length = def.length;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    const length = input.length;
    if (length === def.length)
      return;
    const origin = getLengthableOrigin(input);
    const tooBig = length > def.length;
    payload.issues.push({
      origin,
      ...tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length },
      inclusive: true,
      exact: true,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
  var _a, _b;
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    if (def.pattern) {
      bag.patterns ?? (bag.patterns = new Set);
      bag.patterns.add(def.pattern);
    }
  });
  if (def.pattern)
    (_a = inst._zod).check ?? (_a.check = (payload) => {
      def.pattern.lastIndex = 0;
      if (def.pattern.test(payload.value))
        return;
      payload.issues.push({
        origin: "string",
        code: "invalid_format",
        format: def.format,
        input: payload.value,
        ...def.pattern ? { pattern: def.pattern.toString() } : {},
        inst,
        continue: !def.abort
      });
    });
  else
    (_b = inst._zod).check ?? (_b.check = () => {});
});
var $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    def.pattern.lastIndex = 0;
    if (def.pattern.test(payload.value))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: payload.value,
      pattern: def.pattern.toString(),
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
  def.pattern ?? (def.pattern = lowercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
  def.pattern ?? (def.pattern = uppercase);
  $ZodCheckStringFormat.init(inst, def);
});
var $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
  $ZodCheck.init(inst, def);
  const escapedRegex = escapeRegex(def.includes);
  const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
  def.pattern = pattern;
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = new Set);
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.includes(def.includes, def.position))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: def.includes,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = new Set);
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.startsWith(def.prefix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: def.prefix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
  $ZodCheck.init(inst, def);
  const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
  def.pattern ?? (def.pattern = pattern);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.patterns ?? (bag.patterns = new Set);
    bag.patterns.add(pattern);
  });
  inst._zod.check = (payload) => {
    if (payload.value.endsWith(def.suffix))
      return;
    payload.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: def.suffix,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function handleCheckPropertyResult(result, payload, property) {
  if (result.issues.length) {
    payload.issues.push(...prefixIssues(property, result.issues));
  }
}
var $ZodCheckProperty = /* @__PURE__ */ $constructor("$ZodCheckProperty", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    const result = def.schema._zod.run({
      value: payload.value[def.property],
      issues: []
    }, {});
    if (result instanceof Promise) {
      return result.then((result2) => handleCheckPropertyResult(result2, payload, def.property));
    }
    handleCheckPropertyResult(result, payload, def.property);
    return;
  };
});
var $ZodCheckMimeType = /* @__PURE__ */ $constructor("$ZodCheckMimeType", (inst, def) => {
  $ZodCheck.init(inst, def);
  const mimeSet = new Set(def.mime);
  inst._zod.onattach.push((inst2) => {
    inst2._zod.bag.mime = def.mime;
  });
  inst._zod.check = (payload) => {
    if (mimeSet.has(payload.value.type))
      return;
    payload.issues.push({
      code: "invalid_value",
      values: def.mime,
      input: payload.value.type,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
  $ZodCheck.init(inst, def);
  inst._zod.check = (payload) => {
    payload.value = def.tx(payload.value);
  };
});

// node_modules/zod/v4/core/doc.js
class Doc {
  constructor(args = []) {
    this.content = [];
    this.indent = 0;
    if (this)
      this.args = args;
  }
  indented(fn) {
    this.indent += 1;
    fn(this);
    this.indent -= 1;
  }
  write(arg) {
    if (typeof arg === "function") {
      arg(this, { execution: "sync" });
      arg(this, { execution: "async" });
      return;
    }
    const content = arg;
    const lines = content.split(`
`).filter((x) => x);
    const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
    const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
    for (const line of dedented) {
      this.content.push(line);
    }
  }
  compile() {
    const F = Function;
    const args = this?.args;
    const content = this?.content ?? [``];
    const lines = [...content.map((x) => `  ${x}`)];
    return new F(...args, lines.join(`
`));
  }
}

// node_modules/zod/v4/core/versions.js
var version = {
  major: 4,
  minor: 3,
  patch: 6
};

// node_modules/zod/v4/core/schemas.js
var $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
  var _a;
  inst ?? (inst = {});
  inst._zod.def = def;
  inst._zod.bag = inst._zod.bag || {};
  inst._zod.version = version;
  const checks = [...inst._zod.def.checks ?? []];
  if (inst._zod.traits.has("$ZodCheck")) {
    checks.unshift(inst);
  }
  for (const ch of checks) {
    for (const fn of ch._zod.onattach) {
      fn(inst);
    }
  }
  if (checks.length === 0) {
    (_a = inst._zod).deferred ?? (_a.deferred = []);
    inst._zod.deferred?.push(() => {
      inst._zod.run = inst._zod.parse;
    });
  } else {
    const runChecks = (payload, checks2, ctx) => {
      let isAborted = aborted(payload);
      let asyncResult;
      for (const ch of checks2) {
        if (ch._zod.def.when) {
          const shouldRun = ch._zod.def.when(payload);
          if (!shouldRun)
            continue;
        } else if (isAborted) {
          continue;
        }
        const currLen = payload.issues.length;
        const _ = ch._zod.check(payload);
        if (_ instanceof Promise && ctx?.async === false) {
          throw new $ZodAsyncError;
        }
        if (asyncResult || _ instanceof Promise) {
          asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
            await _;
            const nextLen = payload.issues.length;
            if (nextLen === currLen)
              return;
            if (!isAborted)
              isAborted = aborted(payload, currLen);
          });
        } else {
          const nextLen = payload.issues.length;
          if (nextLen === currLen)
            continue;
          if (!isAborted)
            isAborted = aborted(payload, currLen);
        }
      }
      if (asyncResult) {
        return asyncResult.then(() => {
          return payload;
        });
      }
      return payload;
    };
    const handleCanaryResult = (canary, payload, ctx) => {
      if (aborted(canary)) {
        canary.aborted = true;
        return canary;
      }
      const checkResult = runChecks(payload, checks, ctx);
      if (checkResult instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError;
        return checkResult.then((checkResult2) => inst._zod.parse(checkResult2, ctx));
      }
      return inst._zod.parse(checkResult, ctx);
    };
    inst._zod.run = (payload, ctx) => {
      if (ctx.skipChecks) {
        return inst._zod.parse(payload, ctx);
      }
      if (ctx.direction === "backward") {
        const canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: true });
        if (canary instanceof Promise) {
          return canary.then((canary2) => {
            return handleCanaryResult(canary2, payload, ctx);
          });
        }
        return handleCanaryResult(canary, payload, ctx);
      }
      const result = inst._zod.parse(payload, ctx);
      if (result instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError;
        return result.then((result2) => runChecks(result2, checks, ctx));
      }
      return runChecks(result, checks, ctx);
    };
  }
  defineLazy(inst, "~standard", () => ({
    validate: (value) => {
      try {
        const r = safeParse(inst, value);
        return r.success ? { value: r.data } : { issues: r.error?.issues };
      } catch (_) {
        return safeParseAsync(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  }));
});
var $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string(inst._zod.bag);
  inst._zod.parse = (payload, _) => {
    if (def.coerce)
      try {
        payload.value = String(payload.value);
      } catch (_2) {}
    if (typeof payload.value === "string")
      return payload;
    payload.issues.push({
      expected: "string",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  $ZodString.init(inst, def);
});
var $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
  def.pattern ?? (def.pattern = guid);
  $ZodStringFormat.init(inst, def);
});
var $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
  if (def.version) {
    const versionMap = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    };
    const v = versionMap[def.version];
    if (v === undefined)
      throw new Error(`Invalid UUID version: "${def.version}"`);
    def.pattern ?? (def.pattern = uuid(v));
  } else
    def.pattern ?? (def.pattern = uuid());
  $ZodStringFormat.init(inst, def);
});
var $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
  def.pattern ?? (def.pattern = email);
  $ZodStringFormat.init(inst, def);
});
var $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    try {
      const trimmed = payload.value.trim();
      const url = new URL(trimmed);
      if (def.hostname) {
        def.hostname.lastIndex = 0;
        if (!def.hostname.test(url.hostname)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid hostname",
            pattern: def.hostname.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      }
      if (def.protocol) {
        def.protocol.lastIndex = 0;
        if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            note: "Invalid protocol",
            pattern: def.protocol.source,
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      }
      if (def.normalize) {
        payload.value = url.href;
      } else {
        payload.value = trimmed;
      }
      return;
    } catch (_) {
      payload.issues.push({
        code: "invalid_format",
        format: "url",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
  def.pattern ?? (def.pattern = emoji());
  $ZodStringFormat.init(inst, def);
});
var $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
  def.pattern ?? (def.pattern = nanoid);
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
  def.pattern ?? (def.pattern = cuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
  def.pattern ?? (def.pattern = cuid2);
  $ZodStringFormat.init(inst, def);
});
var $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
  def.pattern ?? (def.pattern = ulid);
  $ZodStringFormat.init(inst, def);
});
var $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
  def.pattern ?? (def.pattern = xid);
  $ZodStringFormat.init(inst, def);
});
var $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
  def.pattern ?? (def.pattern = ksuid);
  $ZodStringFormat.init(inst, def);
});
var $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
  def.pattern ?? (def.pattern = datetime(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
  def.pattern ?? (def.pattern = date);
  $ZodStringFormat.init(inst, def);
});
var $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
  def.pattern ?? (def.pattern = time(def));
  $ZodStringFormat.init(inst, def);
});
var $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
  def.pattern ?? (def.pattern = duration);
  $ZodStringFormat.init(inst, def);
});
var $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
  def.pattern ?? (def.pattern = ipv4);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `ipv4`;
});
var $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
  def.pattern ?? (def.pattern = ipv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `ipv6`;
  inst._zod.check = (payload) => {
    try {
      new URL(`http://[${payload.value}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodMAC = /* @__PURE__ */ $constructor("$ZodMAC", (inst, def) => {
  def.pattern ?? (def.pattern = mac(def.delimiter));
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.format = `mac`;
});
var $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv4);
  $ZodStringFormat.init(inst, def);
});
var $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
  def.pattern ?? (def.pattern = cidrv6);
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    const parts = payload.value.split("/");
    try {
      if (parts.length !== 2)
        throw new Error;
      const [address, prefix] = parts;
      if (!prefix)
        throw new Error;
      const prefixNum = Number(prefix);
      if (`${prefixNum}` !== prefix)
        throw new Error;
      if (prefixNum < 0 || prefixNum > 128)
        throw new Error;
      new URL(`http://[${address}]`);
    } catch {
      payload.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: payload.value,
        inst,
        continue: !def.abort
      });
    }
  };
});
function isValidBase64(data) {
  if (data === "")
    return true;
  if (data.length % 4 !== 0)
    return false;
  try {
    atob(data);
    return true;
  } catch {
    return false;
  }
}
var $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
  def.pattern ?? (def.pattern = base64);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.contentEncoding = "base64";
  inst._zod.check = (payload) => {
    if (isValidBase64(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
function isValidBase64URL(data) {
  if (!base64url.test(data))
    return false;
  const base642 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
  const padded = base642.padEnd(Math.ceil(base642.length / 4) * 4, "=");
  return isValidBase64(padded);
}
var $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
  def.pattern ?? (def.pattern = base64url);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.contentEncoding = "base64url";
  inst._zod.check = (payload) => {
    if (isValidBase64URL(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
  def.pattern ?? (def.pattern = e164);
  $ZodStringFormat.init(inst, def);
});
function isValidJWT(token, algorithm = null) {
  try {
    const tokensParts = token.split(".");
    if (tokensParts.length !== 3)
      return false;
    const [header] = tokensParts;
    if (!header)
      return false;
    const parsedHeader = JSON.parse(atob(header));
    if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
      return false;
    if (!parsedHeader.alg)
      return false;
    if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
      return false;
    return true;
  } catch {
    return false;
  }
}
var $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (isValidJWT(payload.value, def.alg))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCustomStringFormat = /* @__PURE__ */ $constructor("$ZodCustomStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  inst._zod.check = (payload) => {
    if (def.fn(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: def.format,
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = inst._zod.bag.pattern ?? number;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Number(payload.value);
      } catch (_) {}
    const input = payload.value;
    if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
      return payload;
    }
    const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : undefined : undefined;
    payload.issues.push({
      expected: "number",
      code: "invalid_type",
      input,
      inst,
      ...received ? { received } : {}
    });
    return payload;
  };
});
var $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumberFormat", (inst, def) => {
  $ZodCheckNumberFormat.init(inst, def);
  $ZodNumber.init(inst, def);
});
var $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = boolean;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Boolean(payload.value);
      } catch (_) {}
    const input = payload.value;
    if (typeof input === "boolean")
      return payload;
    payload.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodBigInt = /* @__PURE__ */ $constructor("$ZodBigInt", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = bigint;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = BigInt(payload.value);
      } catch (_) {}
    if (typeof payload.value === "bigint")
      return payload;
    payload.issues.push({
      expected: "bigint",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodBigIntFormat = /* @__PURE__ */ $constructor("$ZodBigIntFormat", (inst, def) => {
  $ZodCheckBigIntFormat.init(inst, def);
  $ZodBigInt.init(inst, def);
});
var $ZodSymbol = /* @__PURE__ */ $constructor("$ZodSymbol", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "symbol")
      return payload;
    payload.issues.push({
      expected: "symbol",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodUndefined = /* @__PURE__ */ $constructor("$ZodUndefined", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _undefined;
  inst._zod.values = new Set([undefined]);
  inst._zod.optin = "optional";
  inst._zod.optout = "optional";
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "undefined")
      return payload;
    payload.issues.push({
      expected: "undefined",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodNull = /* @__PURE__ */ $constructor("$ZodNull", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = _null;
  inst._zod.values = new Set([null]);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input === null)
      return payload;
    payload.issues.push({
      expected: "null",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodAny = /* @__PURE__ */ $constructor("$ZodAny", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
var $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
var $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    payload.issues.push({
      expected: "never",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodVoid = /* @__PURE__ */ $constructor("$ZodVoid", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (typeof input === "undefined")
      return payload;
    payload.issues.push({
      expected: "void",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodDate = /* @__PURE__ */ $constructor("$ZodDate", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce) {
      try {
        payload.value = new Date(payload.value);
      } catch (_err) {}
    }
    const input = payload.value;
    const isDate = input instanceof Date;
    const isValidDate = isDate && !Number.isNaN(input.getTime());
    if (isValidDate)
      return payload;
    payload.issues.push({
      expected: "date",
      code: "invalid_type",
      input,
      ...isDate ? { received: "Invalid Date" } : {},
      inst
    });
    return payload;
  };
});
function handleArrayResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
var $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        expected: "array",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = Array(input.length);
    const proms = [];
    for (let i = 0;i < input.length; i++) {
      const item = input[i];
      const result = def.element._zod.run({
        value: item,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleArrayResult(result2, payload, i)));
      } else {
        handleArrayResult(result, payload, i);
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
function handlePropertyResult(result, final, key, input, isOptionalOut) {
  if (result.issues.length) {
    if (isOptionalOut && !(key in input)) {
      return;
    }
    final.issues.push(...prefixIssues(key, result.issues));
  }
  if (result.value === undefined) {
    if (key in input) {
      final.value[key] = undefined;
    }
  } else {
    final.value[key] = result.value;
  }
}
function normalizeDef(def) {
  const keys = Object.keys(def.shape);
  for (const k of keys) {
    if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) {
      throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
    }
  }
  const okeys = optionalKeys(def.shape);
  return {
    ...def,
    keys,
    keySet: new Set(keys),
    numKeys: keys.length,
    optionalKeys: new Set(okeys)
  };
}
function handleCatchall(proms, input, payload, ctx, def, inst) {
  const unrecognized = [];
  const keySet = def.keySet;
  const _catchall = def.catchall._zod;
  const t = _catchall.def.type;
  const isOptionalOut = _catchall.optout === "optional";
  for (const key in input) {
    if (keySet.has(key))
      continue;
    if (t === "never") {
      unrecognized.push(key);
      continue;
    }
    const r = _catchall.run({ value: input[key], issues: [] }, ctx);
    if (r instanceof Promise) {
      proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalOut)));
    } else {
      handlePropertyResult(r, payload, key, input, isOptionalOut);
    }
  }
  if (unrecognized.length) {
    payload.issues.push({
      code: "unrecognized_keys",
      keys: unrecognized,
      input,
      inst
    });
  }
  if (!proms.length)
    return payload;
  return Promise.all(proms).then(() => {
    return payload;
  });
}
var $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
  $ZodType.init(inst, def);
  const desc = Object.getOwnPropertyDescriptor(def, "shape");
  if (!desc?.get) {
    const sh = def.shape;
    Object.defineProperty(def, "shape", {
      get: () => {
        const newSh = { ...sh };
        Object.defineProperty(def, "shape", {
          value: newSh
        });
        return newSh;
      }
    });
  }
  const _normalized = cached(() => normalizeDef(def));
  defineLazy(inst._zod, "propValues", () => {
    const shape = def.shape;
    const propValues = {};
    for (const key in shape) {
      const field = shape[key]._zod;
      if (field.values) {
        propValues[key] ?? (propValues[key] = new Set);
        for (const v of field.values)
          propValues[key].add(v);
      }
    }
    return propValues;
  });
  const isObject2 = isObject;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = {};
    const proms = [];
    const shape = value.shape;
    for (const key of value.keys) {
      const el = shape[key];
      const isOptionalOut = el._zod.optout === "optional";
      const r = el._zod.run({ value: input[key], issues: [] }, ctx);
      if (r instanceof Promise) {
        proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalOut)));
      } else {
        handlePropertyResult(r, payload, key, input, isOptionalOut);
      }
    }
    if (!catchall) {
      return proms.length ? Promise.all(proms).then(() => payload) : payload;
    }
    return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
  };
});
var $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def) => {
  $ZodObject.init(inst, def);
  const superParse = inst._zod.parse;
  const _normalized = cached(() => normalizeDef(def));
  const generateFastpass = (shape) => {
    const doc = new Doc(["shape", "payload", "ctx"]);
    const normalized = _normalized.value;
    const parseStr = (key) => {
      const k = esc(key);
      return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
    };
    doc.write(`const input = payload.value;`);
    const ids = Object.create(null);
    let counter = 0;
    for (const key of normalized.keys) {
      ids[key] = `key_${counter++}`;
    }
    doc.write(`const newResult = {};`);
    for (const key of normalized.keys) {
      const id = ids[key];
      const k = esc(key);
      const schema = shape[key];
      const isOptionalOut = schema?._zod?.optout === "optional";
      doc.write(`const ${id} = ${parseStr(key)};`);
      if (isOptionalOut) {
        doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
      } else {
        doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
      }
    }
    doc.write(`payload.value = newResult;`);
    doc.write(`return payload;`);
    const fn = doc.compile();
    return (payload, ctx) => fn(shape, payload, ctx);
  };
  let fastpass;
  const isObject2 = isObject;
  const jit = !globalConfig.jitless;
  const allowsEval2 = allowsEval;
  const fastEnabled = jit && allowsEval2.value;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
      if (!fastpass)
        fastpass = generateFastpass(def.shape);
      payload = fastpass(payload, ctx);
      if (!catchall)
        return payload;
      return handleCatchall([], input, payload, ctx, value, inst);
    }
    return superParse(payload, ctx);
  };
});
function handleUnionResults(results, final, inst, ctx) {
  for (const result of results) {
    if (result.issues.length === 0) {
      final.value = result.value;
      return final;
    }
  }
  const nonaborted = results.filter((r) => !aborted(r));
  if (nonaborted.length === 1) {
    final.value = nonaborted[0].value;
    return nonaborted[0];
  }
  final.issues.push({
    code: "invalid_union",
    input: final.value,
    inst,
    errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  });
  return final;
}
var $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : undefined);
  defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : undefined);
  defineLazy(inst._zod, "values", () => {
    if (def.options.every((o) => o._zod.values)) {
      return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
    }
    return;
  });
  defineLazy(inst._zod, "pattern", () => {
    if (def.options.every((o) => o._zod.pattern)) {
      const patterns = def.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
    }
    return;
  });
  const single = def.options.length === 1;
  const first = def.options[0]._zod.run;
  inst._zod.parse = (payload, ctx) => {
    if (single) {
      return first(payload, ctx);
    }
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        if (result.issues.length === 0)
          return result;
        results.push(result);
      }
    }
    if (!async)
      return handleUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results2) => {
      return handleUnionResults(results2, payload, inst, ctx);
    });
  };
});
function handleExclusiveUnionResults(results, final, inst, ctx) {
  const successes = results.filter((r) => r.issues.length === 0);
  if (successes.length === 1) {
    final.value = successes[0].value;
    return final;
  }
  if (successes.length === 0) {
    final.issues.push({
      code: "invalid_union",
      input: final.value,
      inst,
      errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
    });
  } else {
    final.issues.push({
      code: "invalid_union",
      input: final.value,
      inst,
      errors: [],
      inclusive: false
    });
  }
  return final;
}
var $ZodXor = /* @__PURE__ */ $constructor("$ZodXor", (inst, def) => {
  $ZodUnion.init(inst, def);
  def.inclusive = false;
  const single = def.options.length === 1;
  const first = def.options[0]._zod.run;
  inst._zod.parse = (payload, ctx) => {
    if (single) {
      return first(payload, ctx);
    }
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        results.push(result);
      }
    }
    if (!async)
      return handleExclusiveUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results2) => {
      return handleExclusiveUnionResults(results2, payload, inst, ctx);
    });
  };
});
var $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
  def.inclusive = false;
  $ZodUnion.init(inst, def);
  const _super = inst._zod.parse;
  defineLazy(inst._zod, "propValues", () => {
    const propValues = {};
    for (const option of def.options) {
      const pv = option._zod.propValues;
      if (!pv || Object.keys(pv).length === 0)
        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
      for (const [k, v] of Object.entries(pv)) {
        if (!propValues[k])
          propValues[k] = new Set;
        for (const val of v) {
          propValues[k].add(val);
        }
      }
    }
    return propValues;
  });
  const disc = cached(() => {
    const opts = def.options;
    const map = new Map;
    for (const o of opts) {
      const values = o._zod.propValues?.[def.discriminator];
      if (!values || values.size === 0)
        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
      for (const v of values) {
        if (map.has(v)) {
          throw new Error(`Duplicate discriminator value "${String(v)}"`);
        }
        map.set(v, o);
      }
    }
    return map;
  });
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isObject(input)) {
      payload.issues.push({
        code: "invalid_type",
        expected: "object",
        input,
        inst
      });
      return payload;
    }
    const opt = disc.value.get(input?.[def.discriminator]);
    if (opt) {
      return opt._zod.run(payload, ctx);
    }
    if (def.unionFallback) {
      return _super(payload, ctx);
    }
    payload.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      discriminator: def.discriminator,
      input,
      path: [def.discriminator],
      inst
    });
    return payload;
  };
});
var $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    const left = def.left._zod.run({ value: input, issues: [] }, ctx);
    const right = def.right._zod.run({ value: input, issues: [] }, ctx);
    const async = left instanceof Promise || right instanceof Promise;
    if (async) {
      return Promise.all([left, right]).then(([left2, right2]) => {
        return handleIntersectionResults(payload, left2, right2);
      });
    }
    return handleIntersectionResults(payload, left, right);
  };
});
function mergeValues(a, b) {
  if (a === b) {
    return { valid: true, data: a };
  }
  if (a instanceof Date && b instanceof Date && +a === +b) {
    return { valid: true, data: a };
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const bKeys = Object.keys(b);
    const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
        };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return { valid: false, mergeErrorPath: [] };
    }
    const newArray = [];
    for (let index = 0;index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
        };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  }
  return { valid: false, mergeErrorPath: [] };
}
function handleIntersectionResults(result, left, right) {
  const unrecKeys = new Map;
  let unrecIssue;
  for (const iss of left.issues) {
    if (iss.code === "unrecognized_keys") {
      unrecIssue ?? (unrecIssue = iss);
      for (const k of iss.keys) {
        if (!unrecKeys.has(k))
          unrecKeys.set(k, {});
        unrecKeys.get(k).l = true;
      }
    } else {
      result.issues.push(iss);
    }
  }
  for (const iss of right.issues) {
    if (iss.code === "unrecognized_keys") {
      for (const k of iss.keys) {
        if (!unrecKeys.has(k))
          unrecKeys.set(k, {});
        unrecKeys.get(k).r = true;
      }
    } else {
      result.issues.push(iss);
    }
  }
  const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
  if (bothKeys.length && unrecIssue) {
    result.issues.push({ ...unrecIssue, keys: bothKeys });
  }
  if (aborted(result))
    return result;
  const merged = mergeValues(left.value, right.value);
  if (!merged.valid) {
    throw new Error(`Unmergable intersection. Error path: ` + `${JSON.stringify(merged.mergeErrorPath)}`);
  }
  result.value = merged.data;
  return result;
}
var $ZodTuple = /* @__PURE__ */ $constructor("$ZodTuple", (inst, def) => {
  $ZodType.init(inst, def);
  const items = def.items;
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        input,
        inst,
        expected: "tuple",
        code: "invalid_type"
      });
      return payload;
    }
    payload.value = [];
    const proms = [];
    const reversedIndex = [...items].reverse().findIndex((item) => item._zod.optin !== "optional");
    const optStart = reversedIndex === -1 ? 0 : items.length - reversedIndex;
    if (!def.rest) {
      const tooBig = input.length > items.length;
      const tooSmall = input.length < optStart - 1;
      if (tooBig || tooSmall) {
        payload.issues.push({
          ...tooBig ? { code: "too_big", maximum: items.length, inclusive: true } : { code: "too_small", minimum: items.length },
          input,
          inst,
          origin: "array"
        });
        return payload;
      }
    }
    let i = -1;
    for (const item of items) {
      i++;
      if (i >= input.length) {
        if (i >= optStart)
          continue;
      }
      const result = item._zod.run({
        value: input[i],
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleTupleResult(result2, payload, i)));
      } else {
        handleTupleResult(result, payload, i);
      }
    }
    if (def.rest) {
      const rest = input.slice(items.length);
      for (const el of rest) {
        i++;
        const result = def.rest._zod.run({
          value: el,
          issues: []
        }, ctx);
        if (result instanceof Promise) {
          proms.push(result.then((result2) => handleTupleResult(result2, payload, i)));
        } else {
          handleTupleResult(result, payload, i);
        }
      }
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleTupleResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
var $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isPlainObject(input)) {
      payload.issues.push({
        expected: "record",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    const values = def.keyType._zod.values;
    if (values) {
      payload.value = {};
      const recordKeys = new Set;
      for (const key of values) {
        if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
          recordKeys.add(typeof key === "number" ? key.toString() : key);
          const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
          if (result instanceof Promise) {
            proms.push(result.then((result2) => {
              if (result2.issues.length) {
                payload.issues.push(...prefixIssues(key, result2.issues));
              }
              payload.value[key] = result2.value;
            }));
          } else {
            if (result.issues.length) {
              payload.issues.push(...prefixIssues(key, result.issues));
            }
            payload.value[key] = result.value;
          }
        }
      }
      let unrecognized;
      for (const key in input) {
        if (!recordKeys.has(key)) {
          unrecognized = unrecognized ?? [];
          unrecognized.push(key);
        }
      }
      if (unrecognized && unrecognized.length > 0) {
        payload.issues.push({
          code: "unrecognized_keys",
          input,
          inst,
          keys: unrecognized
        });
      }
    } else {
      payload.value = {};
      for (const key of Reflect.ownKeys(input)) {
        if (key === "__proto__")
          continue;
        let keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
        if (keyResult instanceof Promise) {
          throw new Error("Async schemas not supported in object keys currently");
        }
        const checkNumericKey = typeof key === "string" && number.test(key) && keyResult.issues.length;
        if (checkNumericKey) {
          const retryResult = def.keyType._zod.run({ value: Number(key), issues: [] }, ctx);
          if (retryResult instanceof Promise) {
            throw new Error("Async schemas not supported in object keys currently");
          }
          if (retryResult.issues.length === 0) {
            keyResult = retryResult;
          }
        }
        if (keyResult.issues.length) {
          if (def.mode === "loose") {
            payload.value[key] = input[key];
          } else {
            payload.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
              input: key,
              path: [key],
              inst
            });
          }
          continue;
        }
        const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
        if (result instanceof Promise) {
          proms.push(result.then((result2) => {
            if (result2.issues.length) {
              payload.issues.push(...prefixIssues(key, result2.issues));
            }
            payload.value[keyResult.value] = result2.value;
          }));
        } else {
          if (result.issues.length) {
            payload.issues.push(...prefixIssues(key, result.issues));
          }
          payload.value[keyResult.value] = result.value;
        }
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
var $ZodMap = /* @__PURE__ */ $constructor("$ZodMap", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!(input instanceof Map)) {
      payload.issues.push({
        expected: "map",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    payload.value = new Map;
    for (const [key, value] of input) {
      const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
      const valueResult = def.valueType._zod.run({ value, issues: [] }, ctx);
      if (keyResult instanceof Promise || valueResult instanceof Promise) {
        proms.push(Promise.all([keyResult, valueResult]).then(([keyResult2, valueResult2]) => {
          handleMapResult(keyResult2, valueResult2, payload, key, input, inst, ctx);
        }));
      } else {
        handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
      }
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
  if (keyResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, keyResult.issues));
    } else {
      final.issues.push({
        code: "invalid_key",
        origin: "map",
        input,
        inst,
        issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
      });
    }
  }
  if (valueResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, valueResult.issues));
    } else {
      final.issues.push({
        origin: "map",
        code: "invalid_element",
        input,
        inst,
        key,
        issues: valueResult.issues.map((iss) => finalizeIssue(iss, ctx, config()))
      });
    }
  }
  final.value.set(keyResult.value, valueResult.value);
}
var $ZodSet = /* @__PURE__ */ $constructor("$ZodSet", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!(input instanceof Set)) {
      payload.issues.push({
        input,
        inst,
        expected: "set",
        code: "invalid_type"
      });
      return payload;
    }
    const proms = [];
    payload.value = new Set;
    for (const item of input) {
      const result = def.valueType._zod.run({ value: item, issues: [] }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleSetResult(result2, payload)));
      } else
        handleSetResult(result, payload);
    }
    if (proms.length)
      return Promise.all(proms).then(() => payload);
    return payload;
  };
});
function handleSetResult(result, final) {
  if (result.issues.length) {
    final.issues.push(...result.issues);
  }
  final.value.add(result.value);
}
var $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
  $ZodType.init(inst, def);
  const values = getEnumValues(def.entries);
  const valuesSet = new Set(values);
  inst._zod.values = valuesSet;
  inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (valuesSet.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  if (def.values.length === 0) {
    throw new Error("Cannot create literal schema with no valid values");
  }
  const values = new Set(def.values);
  inst._zod.values = values;
  inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (values.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values: def.values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodFile = /* @__PURE__ */ $constructor("$ZodFile", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (input instanceof File)
      return payload;
    payload.issues.push({
      expected: "file",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    const _out = def.transform(payload.value, payload);
    if (ctx.async) {
      const output = _out instanceof Promise ? _out : Promise.resolve(_out);
      return output.then((output2) => {
        payload.value = output2;
        return payload;
      });
    }
    if (_out instanceof Promise) {
      throw new $ZodAsyncError;
    }
    payload.value = _out;
    return payload;
  };
});
function handleOptionalResult(result, input) {
  if (result.issues.length && input === undefined) {
    return { issues: [], value: undefined };
  }
  return result;
}
var $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  inst._zod.optout = "optional";
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? new Set([...def.innerType._zod.values, undefined]) : undefined;
  });
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    if (def.innerType._zod.optin === "optional") {
      const result = def.innerType._zod.run(payload, ctx);
      if (result instanceof Promise)
        return result.then((r) => handleOptionalResult(r, payload.value));
      return handleOptionalResult(result, payload.value);
    }
    if (payload.value === undefined) {
      return payload;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
  inst._zod.parse = (payload, ctx) => {
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : undefined;
  });
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? new Set([...def.innerType._zod.values, null]) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    if (payload.value === null)
      return payload;
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === undefined) {
      payload.value = def.defaultValue;
      return payload;
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => handleDefaultResult(result2, def));
    }
    return handleDefaultResult(result, def);
  };
});
function handleDefaultResult(payload, def) {
  if (payload.value === undefined) {
    payload.value = def.defaultValue;
  }
  return payload;
}
var $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === undefined) {
      payload.value = def.defaultValue;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => {
    const v = def.innerType._zod.values;
    return v ? new Set([...v].filter((x) => x !== undefined)) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => handleNonOptionalResult(result2, inst));
    }
    return handleNonOptionalResult(result, inst);
  };
});
function handleNonOptionalResult(payload, inst) {
  if (!payload.issues.length && payload.value === undefined) {
    payload.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: payload.value,
      inst
    });
  }
  return payload;
}
var $ZodSuccess = /* @__PURE__ */ $constructor("$ZodSuccess", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      throw new $ZodEncodeError("ZodSuccess");
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => {
        payload.value = result2.issues.length === 0;
        return payload;
      });
    }
    payload.value = result.issues.length === 0;
    return payload;
  };
});
var $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
  defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => {
        payload.value = result2.value;
        if (result2.issues.length) {
          payload.value = def.catchValue({
            ...payload,
            error: {
              issues: result2.issues.map((iss) => finalizeIssue(iss, ctx, config()))
            },
            input: payload.value
          });
          payload.issues = [];
        }
        return payload;
      });
    }
    payload.value = result.value;
    if (result.issues.length) {
      payload.value = def.catchValue({
        ...payload,
        error: {
          issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config()))
        },
        input: payload.value
      });
      payload.issues = [];
    }
    return payload;
  };
});
var $ZodNaN = /* @__PURE__ */ $constructor("$ZodNaN", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
      payload.issues.push({
        input: payload.value,
        inst,
        expected: "nan",
        code: "invalid_type"
      });
      return payload;
    }
    return payload;
  };
});
var $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => def.in._zod.values);
  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
  defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      const right = def.out._zod.run(payload, ctx);
      if (right instanceof Promise) {
        return right.then((right2) => handlePipeResult(right2, def.in, ctx));
      }
      return handlePipeResult(right, def.in, ctx);
    }
    const left = def.in._zod.run(payload, ctx);
    if (left instanceof Promise) {
      return left.then((left2) => handlePipeResult(left2, def.out, ctx));
    }
    return handlePipeResult(left, def.out, ctx);
  };
});
function handlePipeResult(left, next, ctx) {
  if (left.issues.length) {
    left.aborted = true;
    return left;
  }
  return next._zod.run({ value: left.value, issues: left.issues }, ctx);
}
var $ZodCodec = /* @__PURE__ */ $constructor("$ZodCodec", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => def.in._zod.values);
  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
  defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
  inst._zod.parse = (payload, ctx) => {
    const direction = ctx.direction || "forward";
    if (direction === "forward") {
      const left = def.in._zod.run(payload, ctx);
      if (left instanceof Promise) {
        return left.then((left2) => handleCodecAResult(left2, def, ctx));
      }
      return handleCodecAResult(left, def, ctx);
    } else {
      const right = def.out._zod.run(payload, ctx);
      if (right instanceof Promise) {
        return right.then((right2) => handleCodecAResult(right2, def, ctx));
      }
      return handleCodecAResult(right, def, ctx);
    }
  };
});
function handleCodecAResult(result, def, ctx) {
  if (result.issues.length) {
    result.aborted = true;
    return result;
  }
  const direction = ctx.direction || "forward";
  if (direction === "forward") {
    const transformed = def.transform(result.value, result);
    if (transformed instanceof Promise) {
      return transformed.then((value) => handleCodecTxResult(result, value, def.out, ctx));
    }
    return handleCodecTxResult(result, transformed, def.out, ctx);
  } else {
    const transformed = def.reverseTransform(result.value, result);
    if (transformed instanceof Promise) {
      return transformed.then((value) => handleCodecTxResult(result, value, def.in, ctx));
    }
    return handleCodecTxResult(result, transformed, def.in, ctx);
  }
}
function handleCodecTxResult(left, value, nextSchema, ctx) {
  if (left.issues.length) {
    left.aborted = true;
    return left;
  }
  return nextSchema._zod.run({ value, issues: left.issues }, ctx);
}
var $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
  defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then(handleReadonlyResult);
    }
    return handleReadonlyResult(result);
  };
});
function handleReadonlyResult(payload) {
  payload.value = Object.freeze(payload.value);
  return payload;
}
var $ZodTemplateLiteral = /* @__PURE__ */ $constructor("$ZodTemplateLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  const regexParts = [];
  for (const part of def.parts) {
    if (typeof part === "object" && part !== null) {
      if (!part._zod.pattern) {
        throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
      }
      const source = part._zod.pattern instanceof RegExp ? part._zod.pattern.source : part._zod.pattern;
      if (!source)
        throw new Error(`Invalid template literal part: ${part._zod.traits}`);
      const start = source.startsWith("^") ? 1 : 0;
      const end = source.endsWith("$") ? source.length - 1 : source.length;
      regexParts.push(source.slice(start, end));
    } else if (part === null || primitiveTypes.has(typeof part)) {
      regexParts.push(escapeRegex(`${part}`));
    } else {
      throw new Error(`Invalid template literal part: ${part}`);
    }
  }
  inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "string") {
      payload.issues.push({
        input: payload.value,
        inst,
        expected: "string",
        code: "invalid_type"
      });
      return payload;
    }
    inst._zod.pattern.lastIndex = 0;
    if (!inst._zod.pattern.test(payload.value)) {
      payload.issues.push({
        input: payload.value,
        inst,
        code: "invalid_format",
        format: def.format ?? "template_literal",
        pattern: inst._zod.pattern.source
      });
      return payload;
    }
    return payload;
  };
});
var $ZodFunction = /* @__PURE__ */ $constructor("$ZodFunction", (inst, def) => {
  $ZodType.init(inst, def);
  inst._def = def;
  inst._zod.def = def;
  inst.implement = (func) => {
    if (typeof func !== "function") {
      throw new Error("implement() must be called with a function");
    }
    return function(...args) {
      const parsedArgs = inst._def.input ? parse(inst._def.input, args) : args;
      const result = Reflect.apply(func, this, parsedArgs);
      if (inst._def.output) {
        return parse(inst._def.output, result);
      }
      return result;
    };
  };
  inst.implementAsync = (func) => {
    if (typeof func !== "function") {
      throw new Error("implementAsync() must be called with a function");
    }
    return async function(...args) {
      const parsedArgs = inst._def.input ? await parseAsync(inst._def.input, args) : args;
      const result = await Reflect.apply(func, this, parsedArgs);
      if (inst._def.output) {
        return await parseAsync(inst._def.output, result);
      }
      return result;
    };
  };
  inst._zod.parse = (payload, _ctx) => {
    if (typeof payload.value !== "function") {
      payload.issues.push({
        code: "invalid_type",
        expected: "function",
        input: payload.value,
        inst
      });
      return payload;
    }
    const hasPromiseOutput = inst._def.output && inst._def.output._zod.def.type === "promise";
    if (hasPromiseOutput) {
      payload.value = inst.implementAsync(payload.value);
    } else {
      payload.value = inst.implement(payload.value);
    }
    return payload;
  };
  inst.input = (...args) => {
    const F = inst.constructor;
    if (Array.isArray(args[0])) {
      return new F({
        type: "function",
        input: new $ZodTuple({
          type: "tuple",
          items: args[0],
          rest: args[1]
        }),
        output: inst._def.output
      });
    }
    return new F({
      type: "function",
      input: args[0],
      output: inst._def.output
    });
  };
  inst.output = (output) => {
    const F = inst.constructor;
    return new F({
      type: "function",
      input: inst._def.input,
      output
    });
  };
  return inst;
});
var $ZodPromise = /* @__PURE__ */ $constructor("$ZodPromise", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({ value: inner, issues: [] }, ctx));
  };
});
var $ZodLazy = /* @__PURE__ */ $constructor("$ZodLazy", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "innerType", () => def.getter());
  defineLazy(inst._zod, "pattern", () => inst._zod.innerType?._zod?.pattern);
  defineLazy(inst._zod, "propValues", () => inst._zod.innerType?._zod?.propValues);
  defineLazy(inst._zod, "optin", () => inst._zod.innerType?._zod?.optin ?? undefined);
  defineLazy(inst._zod, "optout", () => inst._zod.innerType?._zod?.optout ?? undefined);
  inst._zod.parse = (payload, ctx) => {
    const inner = inst._zod.innerType;
    return inner._zod.run(payload, ctx);
  };
});
var $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
  $ZodCheck.init(inst, def);
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _) => {
    return payload;
  };
  inst._zod.check = (payload) => {
    const input = payload.value;
    const r = def.fn(input);
    if (r instanceof Promise) {
      return r.then((r2) => handleRefineResult(r2, payload, input, inst));
    }
    handleRefineResult(r, payload, input, inst);
    return;
  };
});
function handleRefineResult(result, payload, input, inst) {
  if (!result) {
    const _iss = {
      code: "custom",
      input,
      inst,
      path: [...inst._zod.def.path ?? []],
      continue: !inst._zod.def.abort
    };
    if (inst._zod.def.params)
      _iss.params = inst._zod.def.params;
    payload.issues.push(issue(_iss));
  }
}
// node_modules/zod/v4/locales/index.js
var exports_locales = {};
__export(exports_locales, {
  zhTW: () => zh_TW_default,
  zhCN: () => zh_CN_default,
  yo: () => yo_default,
  vi: () => vi_default,
  uz: () => uz_default,
  ur: () => ur_default,
  uk: () => uk_default,
  ua: () => ua_default,
  tr: () => tr_default,
  th: () => th_default,
  ta: () => ta_default,
  sv: () => sv_default,
  sl: () => sl_default,
  ru: () => ru_default,
  pt: () => pt_default,
  ps: () => ps_default,
  pl: () => pl_default,
  ota: () => ota_default,
  no: () => no_default,
  nl: () => nl_default,
  ms: () => ms_default,
  mk: () => mk_default,
  lt: () => lt_default,
  ko: () => ko_default,
  km: () => km_default,
  kh: () => kh_default,
  ka: () => ka_default,
  ja: () => ja_default,
  it: () => it_default,
  is: () => is_default,
  id: () => id_default,
  hy: () => hy_default,
  hu: () => hu_default,
  he: () => he_default,
  frCA: () => fr_CA_default,
  fr: () => fr_default,
  fi: () => fi_default,
  fa: () => fa_default,
  es: () => es_default,
  eo: () => eo_default,
  en: () => en_default,
  de: () => de_default,
  da: () => da_default,
  cs: () => cs_default,
  ca: () => ca_default,
  bg: () => bg_default,
  be: () => be_default,
  az: () => az_default,
  ar: () => ar_default
});

// node_modules/zod/v4/locales/ar.js
var error = () => {
  const Sizable = {
    string: { unit: "حرف", verb: "أن يحوي" },
    file: { unit: "بايت", verb: "أن يحوي" },
    array: { unit: "عنصر", verb: "أن يحوي" },
    set: { unit: "عنصر", verb: "أن يحوي" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "مدخل",
    email: "بريد إلكتروني",
    url: "رابط",
    emoji: "إيموجي",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "تاريخ ووقت بمعيار ISO",
    date: "تاريخ بمعيار ISO",
    time: "وقت بمعيار ISO",
    duration: "مدة بمعيار ISO",
    ipv4: "عنوان IPv4",
    ipv6: "عنوان IPv6",
    cidrv4: "مدى عناوين بصيغة IPv4",
    cidrv6: "مدى عناوين بصيغة IPv6",
    base64: "نَص بترميز base64-encoded",
    base64url: "نَص بترميز base64url-encoded",
    json_string: "نَص على هيئة JSON",
    e164: "رقم هاتف بمعيار E.164",
    jwt: "JWT",
    template_literal: "مدخل"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `مدخلات غير مقبولة: يفترض إدخال instanceof ${issue2.expected}، ولكن تم إدخال ${received}`;
        }
        return `مدخلات غير مقبولة: يفترض إدخال ${expected}، ولكن تم إدخال ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `مدخلات غير مقبولة: يفترض إدخال ${stringifyPrimitive(issue2.values[0])}`;
        return `اختيار غير مقبول: يتوقع انتقاء أحد هذه الخيارات: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return ` أكبر من اللازم: يفترض أن تكون ${issue2.origin ?? "القيمة"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "عنصر"}`;
        return `أكبر من اللازم: يفترض أن تكون ${issue2.origin ?? "القيمة"} ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `أصغر من اللازم: يفترض لـ ${issue2.origin} أن يكون ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `أصغر من اللازم: يفترض لـ ${issue2.origin} أن يكون ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `نَص غير مقبول: يجب أن يبدأ بـ "${issue2.prefix}"`;
        if (_issue.format === "ends_with")
          return `نَص غير مقبول: يجب أن ينتهي بـ "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `نَص غير مقبول: يجب أن يتضمَّن "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `نَص غير مقبول: يجب أن يطابق النمط ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} غير مقبول`;
      }
      case "not_multiple_of":
        return `رقم غير مقبول: يجب أن يكون من مضاعفات ${issue2.divisor}`;
      case "unrecognized_keys":
        return `معرف${issue2.keys.length > 1 ? "ات" : ""} غريب${issue2.keys.length > 1 ? "ة" : ""}: ${joinValues(issue2.keys, "، ")}`;
      case "invalid_key":
        return `معرف غير مقبول في ${issue2.origin}`;
      case "invalid_union":
        return "مدخل غير مقبول";
      case "invalid_element":
        return `مدخل غير مقبول في ${issue2.origin}`;
      default:
        return "مدخل غير مقبول";
    }
  };
};
function ar_default() {
  return {
    localeError: error()
  };
}
// node_modules/zod/v4/locales/az.js
var error2 = () => {
  const Sizable = {
    string: { unit: "simvol", verb: "olmalıdır" },
    file: { unit: "bayt", verb: "olmalıdır" },
    array: { unit: "element", verb: "olmalıdır" },
    set: { unit: "element", verb: "olmalıdır" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Yanlış dəyər: gözlənilən instanceof ${issue2.expected}, daxil olan ${received}`;
        }
        return `Yanlış dəyər: gözlənilən ${expected}, daxil olan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Yanlış dəyər: gözlənilən ${stringifyPrimitive(issue2.values[0])}`;
        return `Yanlış seçim: aşağıdakılardan biri olmalıdır: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Çox böyük: gözlənilən ${issue2.origin ?? "dəyər"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
        return `Çox böyük: gözlənilən ${issue2.origin ?? "dəyər"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Çox kiçik: gözlənilən ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        return `Çox kiçik: gözlənilən ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Yanlış mətn: "${_issue.prefix}" ilə başlamalıdır`;
        if (_issue.format === "ends_with")
          return `Yanlış mətn: "${_issue.suffix}" ilə bitməlidir`;
        if (_issue.format === "includes")
          return `Yanlış mətn: "${_issue.includes}" daxil olmalıdır`;
        if (_issue.format === "regex")
          return `Yanlış mətn: ${_issue.pattern} şablonuna uyğun olmalıdır`;
        return `Yanlış ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Yanlış ədəd: ${issue2.divisor} ilə bölünə bilən olmalıdır`;
      case "unrecognized_keys":
        return `Tanınmayan açar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} daxilində yanlış açar`;
      case "invalid_union":
        return "Yanlış dəyər";
      case "invalid_element":
        return `${issue2.origin} daxilində yanlış dəyər`;
      default:
        return `Yanlış dəyər`;
    }
  };
};
function az_default() {
  return {
    localeError: error2()
  };
}
// node_modules/zod/v4/locales/be.js
function getBelarusianPlural(count, one, few, many) {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
var error3 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "сімвал",
        few: "сімвалы",
        many: "сімвалаў"
      },
      verb: "мець"
    },
    array: {
      unit: {
        one: "элемент",
        few: "элементы",
        many: "элементаў"
      },
      verb: "мець"
    },
    set: {
      unit: {
        one: "элемент",
        few: "элементы",
        many: "элементаў"
      },
      verb: "мець"
    },
    file: {
      unit: {
        one: "байт",
        few: "байты",
        many: "байтаў"
      },
      verb: "мець"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "увод",
    email: "email адрас",
    url: "URL",
    emoji: "эмодзі",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO дата і час",
    date: "ISO дата",
    time: "ISO час",
    duration: "ISO працягласць",
    ipv4: "IPv4 адрас",
    ipv6: "IPv6 адрас",
    cidrv4: "IPv4 дыяпазон",
    cidrv6: "IPv6 дыяпазон",
    base64: "радок у фармаце base64",
    base64url: "радок у фармаце base64url",
    json_string: "JSON радок",
    e164: "нумар E.164",
    jwt: "JWT",
    template_literal: "увод"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "лік",
    array: "масіў"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Няправільны ўвод: чакаўся instanceof ${issue2.expected}, атрымана ${received}`;
        }
        return `Няправільны ўвод: чакаўся ${expected}, атрымана ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Няправільны ўвод: чакалася ${stringifyPrimitive(issue2.values[0])}`;
        return `Няправільны варыянт: чакаўся адзін з ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getBelarusianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Занадта вялікі: чакалася, што ${issue2.origin ?? "значэнне"} павінна ${sizing.verb} ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `Занадта вялікі: чакалася, што ${issue2.origin ?? "значэнне"} павінна быць ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getBelarusianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Занадта малы: чакалася, што ${issue2.origin} павінна ${sizing.verb} ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `Занадта малы: чакалася, што ${issue2.origin} павінна быць ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Няправільны радок: павінен пачынацца з "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Няправільны радок: павінен заканчвацца на "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Няправільны радок: павінен змяшчаць "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Няправільны радок: павінен адпавядаць шаблону ${_issue.pattern}`;
        return `Няправільны ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Няправільны лік: павінен быць кратным ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Нераспазнаны ${issue2.keys.length > 1 ? "ключы" : "ключ"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Няправільны ключ у ${issue2.origin}`;
      case "invalid_union":
        return "Няправільны ўвод";
      case "invalid_element":
        return `Няправільнае значэнне ў ${issue2.origin}`;
      default:
        return `Няправільны ўвод`;
    }
  };
};
function be_default() {
  return {
    localeError: error3()
  };
}
// node_modules/zod/v4/locales/bg.js
var error4 = () => {
  const Sizable = {
    string: { unit: "символа", verb: "да съдържа" },
    file: { unit: "байта", verb: "да съдържа" },
    array: { unit: "елемента", verb: "да съдържа" },
    set: { unit: "елемента", verb: "да съдържа" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "вход",
    email: "имейл адрес",
    url: "URL",
    emoji: "емоджи",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO време",
    date: "ISO дата",
    time: "ISO време",
    duration: "ISO продължителност",
    ipv4: "IPv4 адрес",
    ipv6: "IPv6 адрес",
    cidrv4: "IPv4 диапазон",
    cidrv6: "IPv6 диапазон",
    base64: "base64-кодиран низ",
    base64url: "base64url-кодиран низ",
    json_string: "JSON низ",
    e164: "E.164 номер",
    jwt: "JWT",
    template_literal: "вход"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "число",
    array: "масив"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Невалиден вход: очакван instanceof ${issue2.expected}, получен ${received}`;
        }
        return `Невалиден вход: очакван ${expected}, получен ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Невалиден вход: очакван ${stringifyPrimitive(issue2.values[0])}`;
        return `Невалидна опция: очаквано едно от ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Твърде голямо: очаква се ${issue2.origin ?? "стойност"} да съдържа ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "елемента"}`;
        return `Твърде голямо: очаква се ${issue2.origin ?? "стойност"} да бъде ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Твърде малко: очаква се ${issue2.origin} да съдържа ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Твърде малко: очаква се ${issue2.origin} да бъде ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Невалиден низ: трябва да започва с "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Невалиден низ: трябва да завършва с "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Невалиден низ: трябва да включва "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Невалиден низ: трябва да съвпада с ${_issue.pattern}`;
        let invalid_adj = "Невалиден";
        if (_issue.format === "emoji")
          invalid_adj = "Невалидно";
        if (_issue.format === "datetime")
          invalid_adj = "Невалидно";
        if (_issue.format === "date")
          invalid_adj = "Невалидна";
        if (_issue.format === "time")
          invalid_adj = "Невалидно";
        if (_issue.format === "duration")
          invalid_adj = "Невалидна";
        return `${invalid_adj} ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Невалидно число: трябва да бъде кратно на ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Неразпознат${issue2.keys.length > 1 ? "и" : ""} ключ${issue2.keys.length > 1 ? "ове" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Невалиден ключ в ${issue2.origin}`;
      case "invalid_union":
        return "Невалиден вход";
      case "invalid_element":
        return `Невалидна стойност в ${issue2.origin}`;
      default:
        return `Невалиден вход`;
    }
  };
};
function bg_default() {
  return {
    localeError: error4()
  };
}
// node_modules/zod/v4/locales/ca.js
var error5 = () => {
  const Sizable = {
    string: { unit: "caràcters", verb: "contenir" },
    file: { unit: "bytes", verb: "contenir" },
    array: { unit: "elements", verb: "contenir" },
    set: { unit: "elements", verb: "contenir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrada",
    email: "adreça electrònica",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data i hora ISO",
    date: "data ISO",
    time: "hora ISO",
    duration: "durada ISO",
    ipv4: "adreça IPv4",
    ipv6: "adreça IPv6",
    cidrv4: "rang IPv4",
    cidrv6: "rang IPv6",
    base64: "cadena codificada en base64",
    base64url: "cadena codificada en base64url",
    json_string: "cadena JSON",
    e164: "número E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Tipus invàlid: s'esperava instanceof ${issue2.expected}, s'ha rebut ${received}`;
        }
        return `Tipus invàlid: s'esperava ${expected}, s'ha rebut ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Valor invàlid: s'esperava ${stringifyPrimitive(issue2.values[0])}`;
        return `Opció invàlida: s'esperava una de ${joinValues(issue2.values, " o ")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "com a màxim" : "menys de";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} contingués ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} fos ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "com a mínim" : "més de";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Massa petit: s'esperava que ${issue2.origin} contingués ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Massa petit: s'esperava que ${issue2.origin} fos ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Format invàlid: ha de començar amb "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Format invàlid: ha d'acabar amb "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Format invàlid: ha d'incloure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Format invàlid: ha de coincidir amb el patró ${_issue.pattern}`;
        return `Format invàlid per a ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Número invàlid: ha de ser múltiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Clau${issue2.keys.length > 1 ? "s" : ""} no reconeguda${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Clau invàlida a ${issue2.origin}`;
      case "invalid_union":
        return "Entrada invàlida";
      case "invalid_element":
        return `Element invàlid a ${issue2.origin}`;
      default:
        return `Entrada invàlida`;
    }
  };
};
function ca_default() {
  return {
    localeError: error5()
  };
}
// node_modules/zod/v4/locales/cs.js
var error6 = () => {
  const Sizable = {
    string: { unit: "znaků", verb: "mít" },
    file: { unit: "bajtů", verb: "mít" },
    array: { unit: "prvků", verb: "mít" },
    set: { unit: "prvků", verb: "mít" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "regulární výraz",
    email: "e-mailová adresa",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "datum a čas ve formátu ISO",
    date: "datum ve formátu ISO",
    time: "čas ve formátu ISO",
    duration: "doba trvání ISO",
    ipv4: "IPv4 adresa",
    ipv6: "IPv6 adresa",
    cidrv4: "rozsah IPv4",
    cidrv6: "rozsah IPv6",
    base64: "řetězec zakódovaný ve formátu base64",
    base64url: "řetězec zakódovaný ve formátu base64url",
    json_string: "řetězec ve formátu JSON",
    e164: "číslo E.164",
    jwt: "JWT",
    template_literal: "vstup"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "číslo",
    string: "řetězec",
    function: "funkce",
    array: "pole"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Neplatný vstup: očekáváno instanceof ${issue2.expected}, obdrženo ${received}`;
        }
        return `Neplatný vstup: očekáváno ${expected}, obdrženo ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Neplatný vstup: očekáváno ${stringifyPrimitive(issue2.values[0])}`;
        return `Neplatná možnost: očekávána jedna z hodnot ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Hodnota je příliš velká: ${issue2.origin ?? "hodnota"} musí mít ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "prvků"}`;
        }
        return `Hodnota je příliš velká: ${issue2.origin ?? "hodnota"} musí být ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Hodnota je příliš malá: ${issue2.origin ?? "hodnota"} musí mít ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "prvků"}`;
        }
        return `Hodnota je příliš malá: ${issue2.origin ?? "hodnota"} musí být ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Neplatný řetězec: musí začínat na "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Neplatný řetězec: musí končit na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neplatný řetězec: musí obsahovat "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neplatný řetězec: musí odpovídat vzoru ${_issue.pattern}`;
        return `Neplatný formát ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neplatné číslo: musí být násobkem ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Neznámé klíče: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neplatný klíč v ${issue2.origin}`;
      case "invalid_union":
        return "Neplatný vstup";
      case "invalid_element":
        return `Neplatná hodnota v ${issue2.origin}`;
      default:
        return `Neplatný vstup`;
    }
  };
};
function cs_default() {
  return {
    localeError: error6()
  };
}
// node_modules/zod/v4/locales/da.js
var error7 = () => {
  const Sizable = {
    string: { unit: "tegn", verb: "havde" },
    file: { unit: "bytes", verb: "havde" },
    array: { unit: "elementer", verb: "indeholdt" },
    set: { unit: "elementer", verb: "indeholdt" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "e-mailadresse",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dato- og klokkeslæt",
    date: "ISO-dato",
    time: "ISO-klokkeslæt",
    duration: "ISO-varighed",
    ipv4: "IPv4-område",
    ipv6: "IPv6-område",
    cidrv4: "IPv4-spektrum",
    cidrv6: "IPv6-spektrum",
    base64: "base64-kodet streng",
    base64url: "base64url-kodet streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "streng",
    number: "tal",
    boolean: "boolean",
    array: "liste",
    object: "objekt",
    set: "sæt",
    file: "fil"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ugyldigt input: forventede instanceof ${issue2.expected}, fik ${received}`;
        }
        return `Ugyldigt input: forventede ${expected}, fik ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ugyldig værdi: forventede ${stringifyPrimitive(issue2.values[0])}`;
        return `Ugyldigt valg: forventede en af følgende ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing)
          return `For stor: forventede ${origin ?? "value"} ${sizing.verb} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
        return `For stor: forventede ${origin ?? "value"} havde ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing) {
          return `For lille: forventede ${origin} ${sizing.verb} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `For lille: forventede ${origin} havde ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ugyldig streng: skal starte med "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ugyldig streng: skal ende med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ugyldig streng: skal indeholde "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ugyldig streng: skal matche mønsteret ${_issue.pattern}`;
        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ugyldigt tal: skal være deleligt med ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ukendte nøgler" : "Ukendt nøgle"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig nøgle i ${issue2.origin}`;
      case "invalid_union":
        return "Ugyldigt input: matcher ingen af de tilladte typer";
      case "invalid_element":
        return `Ugyldig værdi i ${issue2.origin}`;
      default:
        return `Ugyldigt input`;
    }
  };
};
function da_default() {
  return {
    localeError: error7()
  };
}
// node_modules/zod/v4/locales/de.js
var error8 = () => {
  const Sizable = {
    string: { unit: "Zeichen", verb: "zu haben" },
    file: { unit: "Bytes", verb: "zu haben" },
    array: { unit: "Elemente", verb: "zu haben" },
    set: { unit: "Elemente", verb: "zu haben" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "Eingabe",
    email: "E-Mail-Adresse",
    url: "URL",
    emoji: "Emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-Datum und -Uhrzeit",
    date: "ISO-Datum",
    time: "ISO-Uhrzeit",
    duration: "ISO-Dauer",
    ipv4: "IPv4-Adresse",
    ipv6: "IPv6-Adresse",
    cidrv4: "IPv4-Bereich",
    cidrv6: "IPv6-Bereich",
    base64: "Base64-codierter String",
    base64url: "Base64-URL-codierter String",
    json_string: "JSON-String",
    e164: "E.164-Nummer",
    jwt: "JWT",
    template_literal: "Eingabe"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "Zahl",
    array: "Array"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ungültige Eingabe: erwartet instanceof ${issue2.expected}, erhalten ${received}`;
        }
        return `Ungültige Eingabe: erwartet ${expected}, erhalten ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ungültige Eingabe: erwartet ${stringifyPrimitive(issue2.values[0])}`;
        return `Ungültige Option: erwartet eine von ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Zu groß: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "Elemente"} hat`;
        return `Zu groß: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ist`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} hat`;
        }
        return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ist`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ungültiger String: muss mit "${_issue.prefix}" beginnen`;
        if (_issue.format === "ends_with")
          return `Ungültiger String: muss mit "${_issue.suffix}" enden`;
        if (_issue.format === "includes")
          return `Ungültiger String: muss "${_issue.includes}" enthalten`;
        if (_issue.format === "regex")
          return `Ungültiger String: muss dem Muster ${_issue.pattern} entsprechen`;
        return `Ungültig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ungültige Zahl: muss ein Vielfaches von ${issue2.divisor} sein`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Unbekannte Schlüssel" : "Unbekannter Schlüssel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ungültiger Schlüssel in ${issue2.origin}`;
      case "invalid_union":
        return "Ungültige Eingabe";
      case "invalid_element":
        return `Ungültiger Wert in ${issue2.origin}`;
      default:
        return `Ungültige Eingabe`;
    }
  };
};
function de_default() {
  return {
    localeError: error8()
  };
}
// node_modules/zod/v4/locales/en.js
var error9 = () => {
  const Sizable = {
    string: { unit: "characters", verb: "to have" },
    file: { unit: "bytes", verb: "to have" },
    array: { unit: "items", verb: "to have" },
    set: { unit: "items", verb: "to have" },
    map: { unit: "entries", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    mac: "MAC address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        return `Invalid input: expected ${expected}, received ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
        return `Invalid option: expected one of ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Too big: expected ${issue2.origin ?? "value"} to have ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
        return `Too big: expected ${issue2.origin ?? "value"} to be ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Too small: expected ${issue2.origin} to have ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Too small: expected ${issue2.origin} to be ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Invalid string: must start with "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Invalid string: must end with "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Invalid string: must include "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Invalid string: must match pattern ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${issue2.origin}`;
      case "invalid_union":
        return "Invalid input";
      case "invalid_element":
        return `Invalid value in ${issue2.origin}`;
      default:
        return `Invalid input`;
    }
  };
};
function en_default() {
  return {
    localeError: error9()
  };
}
// node_modules/zod/v4/locales/eo.js
var error10 = () => {
  const Sizable = {
    string: { unit: "karaktrojn", verb: "havi" },
    file: { unit: "bajtojn", verb: "havi" },
    array: { unit: "elementojn", verb: "havi" },
    set: { unit: "elementojn", verb: "havi" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "enigo",
    email: "retadreso",
    url: "URL",
    emoji: "emoĝio",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-datotempo",
    date: "ISO-dato",
    time: "ISO-tempo",
    duration: "ISO-daŭro",
    ipv4: "IPv4-adreso",
    ipv6: "IPv6-adreso",
    cidrv4: "IPv4-rango",
    cidrv6: "IPv6-rango",
    base64: "64-ume kodita karaktraro",
    base64url: "URL-64-ume kodita karaktraro",
    json_string: "JSON-karaktraro",
    e164: "E.164-nombro",
    jwt: "JWT",
    template_literal: "enigo"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombro",
    array: "tabelo",
    null: "senvalora"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Nevalida enigo: atendiĝis instanceof ${issue2.expected}, riceviĝis ${received}`;
        }
        return `Nevalida enigo: atendiĝis ${expected}, riceviĝis ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Nevalida enigo: atendiĝis ${stringifyPrimitive(issue2.values[0])}`;
        return `Nevalida opcio: atendiĝis unu el ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Tro granda: atendiĝis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementojn"}`;
        return `Tro granda: atendiĝis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Tro malgranda: atendiĝis ke ${issue2.origin} havu ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Tro malgranda: atendiĝis ke ${issue2.origin} estu ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Nevalida karaktraro: devas komenciĝi per "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Nevalida karaktraro: devas finiĝi per "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}`;
        return `Nevalida ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nevalida nombro: devas esti oblo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nekonata${issue2.keys.length > 1 ? "j" : ""} ŝlosilo${issue2.keys.length > 1 ? "j" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Nevalida ŝlosilo en ${issue2.origin}`;
      case "invalid_union":
        return "Nevalida enigo";
      case "invalid_element":
        return `Nevalida valoro en ${issue2.origin}`;
      default:
        return `Nevalida enigo`;
    }
  };
};
function eo_default() {
  return {
    localeError: error10()
  };
}
// node_modules/zod/v4/locales/es.js
var error11 = () => {
  const Sizable = {
    string: { unit: "caracteres", verb: "tener" },
    file: { unit: "bytes", verb: "tener" },
    array: { unit: "elementos", verb: "tener" },
    set: { unit: "elementos", verb: "tener" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrada",
    email: "dirección de correo electrónico",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "fecha y hora ISO",
    date: "fecha ISO",
    time: "hora ISO",
    duration: "duración ISO",
    ipv4: "dirección IPv4",
    ipv6: "dirección IPv6",
    cidrv4: "rango IPv4",
    cidrv6: "rango IPv6",
    base64: "cadena codificada en base64",
    base64url: "URL codificada en base64",
    json_string: "cadena JSON",
    e164: "número E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN",
    string: "texto",
    number: "número",
    boolean: "booleano",
    array: "arreglo",
    object: "objeto",
    set: "conjunto",
    file: "archivo",
    date: "fecha",
    bigint: "número grande",
    symbol: "símbolo",
    undefined: "indefinido",
    null: "nulo",
    function: "función",
    map: "mapa",
    record: "registro",
    tuple: "tupla",
    enum: "enumeración",
    union: "unión",
    literal: "literal",
    promise: "promesa",
    void: "vacío",
    never: "nunca",
    unknown: "desconocido",
    any: "cualquiera"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entrada inválida: se esperaba instanceof ${issue2.expected}, recibido ${received}`;
        }
        return `Entrada inválida: se esperaba ${expected}, recibido ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrada inválida: se esperaba ${stringifyPrimitive(issue2.values[0])}`;
        return `Opción inválida: se esperaba una de ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing)
          return `Demasiado grande: se esperaba que ${origin ?? "valor"} tuviera ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Demasiado grande: se esperaba que ${origin ?? "valor"} fuera ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        if (sizing) {
          return `Demasiado pequeño: se esperaba que ${origin} tuviera ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Demasiado pequeño: se esperaba que ${origin} fuera ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Cadena inválida: debe comenzar con "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Cadena inválida: debe terminar en "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Cadena inválida: debe incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Cadena inválida: debe coincidir con el patrón ${_issue.pattern}`;
        return `Inválido ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Número inválido: debe ser múltiplo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Llave${issue2.keys.length > 1 ? "s" : ""} desconocida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Llave inválida en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      case "invalid_union":
        return "Entrada inválida";
      case "invalid_element":
        return `Valor inválido en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
      default:
        return `Entrada inválida`;
    }
  };
};
function es_default() {
  return {
    localeError: error11()
  };
}
// node_modules/zod/v4/locales/fa.js
var error12 = () => {
  const Sizable = {
    string: { unit: "کاراکتر", verb: "داشته باشد" },
    file: { unit: "بایت", verb: "داشته باشد" },
    array: { unit: "آیتم", verb: "داشته باشد" },
    set: { unit: "آیتم", verb: "داشته باشد" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ورودی",
    email: "آدرس ایمیل",
    url: "URL",
    emoji: "ایموجی",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "تاریخ و زمان ایزو",
    date: "تاریخ ایزو",
    time: "زمان ایزو",
    duration: "مدت زمان ایزو",
    ipv4: "IPv4 آدرس",
    ipv6: "IPv6 آدرس",
    cidrv4: "IPv4 دامنه",
    cidrv6: "IPv6 دامنه",
    base64: "base64-encoded رشته",
    base64url: "base64url-encoded رشته",
    json_string: "JSON رشته",
    e164: "E.164 عدد",
    jwt: "JWT",
    template_literal: "ورودی"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "عدد",
    array: "آرایه"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `ورودی نامعتبر: می‌بایست instanceof ${issue2.expected} می‌بود، ${received} دریافت شد`;
        }
        return `ورودی نامعتبر: می‌بایست ${expected} می‌بود، ${received} دریافت شد`;
      }
      case "invalid_value":
        if (issue2.values.length === 1) {
          return `ورودی نامعتبر: می‌بایست ${stringifyPrimitive(issue2.values[0])} می‌بود`;
        }
        return `گزینه نامعتبر: می‌بایست یکی از ${joinValues(issue2.values, "|")} می‌بود`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `خیلی بزرگ: ${issue2.origin ?? "مقدار"} باید ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "عنصر"} باشد`;
        }
        return `خیلی بزرگ: ${issue2.origin ?? "مقدار"} باید ${adj}${issue2.maximum.toString()} باشد`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `خیلی کوچک: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} ${sizing.unit} باشد`;
        }
        return `خیلی کوچک: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} باشد`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `رشته نامعتبر: باید با "${_issue.prefix}" شروع شود`;
        }
        if (_issue.format === "ends_with") {
          return `رشته نامعتبر: باید با "${_issue.suffix}" تمام شود`;
        }
        if (_issue.format === "includes") {
          return `رشته نامعتبر: باید شامل "${_issue.includes}" باشد`;
        }
        if (_issue.format === "regex") {
          return `رشته نامعتبر: باید با الگوی ${_issue.pattern} مطابقت داشته باشد`;
        }
        return `${FormatDictionary[_issue.format] ?? issue2.format} نامعتبر`;
      }
      case "not_multiple_of":
        return `عدد نامعتبر: باید مضرب ${issue2.divisor} باشد`;
      case "unrecognized_keys":
        return `کلید${issue2.keys.length > 1 ? "های" : ""} ناشناس: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `کلید ناشناس در ${issue2.origin}`;
      case "invalid_union":
        return `ورودی نامعتبر`;
      case "invalid_element":
        return `مقدار نامعتبر در ${issue2.origin}`;
      default:
        return `ورودی نامعتبر`;
    }
  };
};
function fa_default() {
  return {
    localeError: error12()
  };
}
// node_modules/zod/v4/locales/fi.js
var error13 = () => {
  const Sizable = {
    string: { unit: "merkkiä", subject: "merkkijonon" },
    file: { unit: "tavua", subject: "tiedoston" },
    array: { unit: "alkiota", subject: "listan" },
    set: { unit: "alkiota", subject: "joukon" },
    number: { unit: "", subject: "luvun" },
    bigint: { unit: "", subject: "suuren kokonaisluvun" },
    int: { unit: "", subject: "kokonaisluvun" },
    date: { unit: "", subject: "päivämäärän" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "säännöllinen lauseke",
    email: "sähköpostiosoite",
    url: "URL-osoite",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-aikaleima",
    date: "ISO-päivämäärä",
    time: "ISO-aika",
    duration: "ISO-kesto",
    ipv4: "IPv4-osoite",
    ipv6: "IPv6-osoite",
    cidrv4: "IPv4-alue",
    cidrv6: "IPv6-alue",
    base64: "base64-koodattu merkkijono",
    base64url: "base64url-koodattu merkkijono",
    json_string: "JSON-merkkijono",
    e164: "E.164-luku",
    jwt: "JWT",
    template_literal: "templaattimerkkijono"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Virheellinen tyyppi: odotettiin instanceof ${issue2.expected}, oli ${received}`;
        }
        return `Virheellinen tyyppi: odotettiin ${expected}, oli ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Virheellinen syöte: täytyy olla ${stringifyPrimitive(issue2.values[0])}`;
        return `Virheellinen valinta: täytyy olla yksi seuraavista: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Liian suuri: ${sizing.subject} täytyy olla ${adj}${issue2.maximum.toString()} ${sizing.unit}`.trim();
        }
        return `Liian suuri: arvon täytyy olla ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Liian pieni: ${sizing.subject} täytyy olla ${adj}${issue2.minimum.toString()} ${sizing.unit}`.trim();
        }
        return `Liian pieni: arvon täytyy olla ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Virheellinen syöte: täytyy alkaa "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Virheellinen syöte: täytyy loppua "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Virheellinen syöte: täytyy sisältää "${_issue.includes}"`;
        if (_issue.format === "regex") {
          return `Virheellinen syöte: täytyy vastata säännöllistä lauseketta ${_issue.pattern}`;
        }
        return `Virheellinen ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Virheellinen luku: täytyy olla luvun ${issue2.divisor} monikerta`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return "Virheellinen avain tietueessa";
      case "invalid_union":
        return "Virheellinen unioni";
      case "invalid_element":
        return "Virheellinen arvo joukossa";
      default:
        return `Virheellinen syöte`;
    }
  };
};
function fi_default() {
  return {
    localeError: error13()
  };
}
// node_modules/zod/v4/locales/fr.js
var error14 = () => {
  const Sizable = {
    string: { unit: "caractères", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "éléments", verb: "avoir" },
    set: { unit: "éléments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrée",
    email: "adresse e-mail",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "date et heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "durée ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "chaîne encodée en base64",
    base64url: "chaîne encodée en base64url",
    json_string: "chaîne JSON",
    e164: "numéro E.164",
    jwt: "JWT",
    template_literal: "entrée"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombre",
    array: "tableau"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entrée invalide : instanceof ${issue2.expected} attendu, ${received} reçu`;
        }
        return `Entrée invalide : ${expected} attendu, ${received} reçu`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrée invalide : ${stringifyPrimitive(issue2.values[0])} attendu`;
        return `Option invalide : une valeur parmi ${joinValues(issue2.values, "|")} attendue`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Trop grand : ${issue2.origin ?? "valeur"} doit ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "élément(s)"}`;
        return `Trop grand : ${issue2.origin ?? "valeur"} doit être ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Trop petit : ${issue2.origin} doit ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Trop petit : ${issue2.origin} doit être ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Chaîne invalide : doit inclure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Chaîne invalide : doit correspondre au modèle ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit être un multiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Clé${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Clé invalide dans ${issue2.origin}`;
      case "invalid_union":
        return "Entrée invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue2.origin}`;
      default:
        return `Entrée invalide`;
    }
  };
};
function fr_default() {
  return {
    localeError: error14()
  };
}
// node_modules/zod/v4/locales/fr-CA.js
var error15 = () => {
  const Sizable = {
    string: { unit: "caractères", verb: "avoir" },
    file: { unit: "octets", verb: "avoir" },
    array: { unit: "éléments", verb: "avoir" },
    set: { unit: "éléments", verb: "avoir" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "entrée",
    email: "adresse courriel",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "date-heure ISO",
    date: "date ISO",
    time: "heure ISO",
    duration: "durée ISO",
    ipv4: "adresse IPv4",
    ipv6: "adresse IPv6",
    cidrv4: "plage IPv4",
    cidrv6: "plage IPv6",
    base64: "chaîne encodée en base64",
    base64url: "chaîne encodée en base64url",
    json_string: "chaîne JSON",
    e164: "numéro E.164",
    jwt: "JWT",
    template_literal: "entrée"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Entrée invalide : attendu instanceof ${issue2.expected}, reçu ${received}`;
        }
        return `Entrée invalide : attendu ${expected}, reçu ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrée invalide : attendu ${stringifyPrimitive(issue2.values[0])}`;
        return `Option invalide : attendu l'une des valeurs suivantes ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "≤" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} ait ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} soit ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "≥" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Trop petit : attendu que ${issue2.origin} ait ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Trop petit : attendu que ${issue2.origin} soit ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Chaîne invalide : doit commencer par "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Chaîne invalide : doit se terminer par "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Chaîne invalide : doit inclure "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Chaîne invalide : doit correspondre au motif ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
      }
      case "not_multiple_of":
        return `Nombre invalide : doit être un multiple de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Clé${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Clé invalide dans ${issue2.origin}`;
      case "invalid_union":
        return "Entrée invalide";
      case "invalid_element":
        return `Valeur invalide dans ${issue2.origin}`;
      default:
        return `Entrée invalide`;
    }
  };
};
function fr_CA_default() {
  return {
    localeError: error15()
  };
}
// node_modules/zod/v4/locales/he.js
var error16 = () => {
  const TypeNames = {
    string: { label: "מחרוזת", gender: "f" },
    number: { label: "מספר", gender: "m" },
    boolean: { label: "ערך בוליאני", gender: "m" },
    bigint: { label: "BigInt", gender: "m" },
    date: { label: "תאריך", gender: "m" },
    array: { label: "מערך", gender: "m" },
    object: { label: "אובייקט", gender: "m" },
    null: { label: "ערך ריק (null)", gender: "m" },
    undefined: { label: "ערך לא מוגדר (undefined)", gender: "m" },
    symbol: { label: "סימבול (Symbol)", gender: "m" },
    function: { label: "פונקציה", gender: "f" },
    map: { label: "מפה (Map)", gender: "f" },
    set: { label: "קבוצה (Set)", gender: "f" },
    file: { label: "קובץ", gender: "m" },
    promise: { label: "Promise", gender: "m" },
    NaN: { label: "NaN", gender: "m" },
    unknown: { label: "ערך לא ידוע", gender: "m" },
    value: { label: "ערך", gender: "m" }
  };
  const Sizable = {
    string: { unit: "תווים", shortLabel: "קצר", longLabel: "ארוך" },
    file: { unit: "בייטים", shortLabel: "קטן", longLabel: "גדול" },
    array: { unit: "פריטים", shortLabel: "קטן", longLabel: "גדול" },
    set: { unit: "פריטים", shortLabel: "קטן", longLabel: "גדול" },
    number: { unit: "", shortLabel: "קטן", longLabel: "גדול" }
  };
  const typeEntry = (t) => t ? TypeNames[t] : undefined;
  const typeLabel = (t) => {
    const e = typeEntry(t);
    if (e)
      return e.label;
    return t ?? TypeNames.unknown.label;
  };
  const withDefinite = (t) => `ה${typeLabel(t)}`;
  const verbFor = (t) => {
    const e = typeEntry(t);
    const gender = e?.gender ?? "m";
    return gender === "f" ? "צריכה להיות" : "צריך להיות";
  };
  const getSizing = (origin) => {
    if (!origin)
      return null;
    return Sizable[origin] ?? null;
  };
  const FormatDictionary = {
    regex: { label: "קלט", gender: "m" },
    email: { label: "כתובת אימייל", gender: "f" },
    url: { label: "כתובת רשת", gender: "f" },
    emoji: { label: "אימוג'י", gender: "m" },
    uuid: { label: "UUID", gender: "m" },
    nanoid: { label: "nanoid", gender: "m" },
    guid: { label: "GUID", gender: "m" },
    cuid: { label: "cuid", gender: "m" },
    cuid2: { label: "cuid2", gender: "m" },
    ulid: { label: "ULID", gender: "m" },
    xid: { label: "XID", gender: "m" },
    ksuid: { label: "KSUID", gender: "m" },
    datetime: { label: "תאריך וזמן ISO", gender: "m" },
    date: { label: "תאריך ISO", gender: "m" },
    time: { label: "זמן ISO", gender: "m" },
    duration: { label: "משך זמן ISO", gender: "m" },
    ipv4: { label: "כתובת IPv4", gender: "f" },
    ipv6: { label: "כתובת IPv6", gender: "f" },
    cidrv4: { label: "טווח IPv4", gender: "m" },
    cidrv6: { label: "טווח IPv6", gender: "m" },
    base64: { label: "מחרוזת בבסיס 64", gender: "f" },
    base64url: { label: "מחרוזת בבסיס 64 לכתובות רשת", gender: "f" },
    json_string: { label: "מחרוזת JSON", gender: "f" },
    e164: { label: "מספר E.164", gender: "m" },
    jwt: { label: "JWT", gender: "m" },
    ends_with: { label: "קלט", gender: "m" },
    includes: { label: "קלט", gender: "m" },
    lowercase: { label: "קלט", gender: "m" },
    starts_with: { label: "קלט", gender: "m" },
    uppercase: { label: "קלט", gender: "m" }
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expectedKey = issue2.expected;
        const expected = TypeDictionary[expectedKey ?? ""] ?? typeLabel(expectedKey);
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? TypeNames[receivedType]?.label ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `קלט לא תקין: צריך להיות instanceof ${issue2.expected}, התקבל ${received}`;
        }
        return `קלט לא תקין: צריך להיות ${expected}, התקבל ${received}`;
      }
      case "invalid_value": {
        if (issue2.values.length === 1) {
          return `ערך לא תקין: הערך חייב להיות ${stringifyPrimitive(issue2.values[0])}`;
        }
        const stringified = issue2.values.map((v) => stringifyPrimitive(v));
        if (issue2.values.length === 2) {
          return `ערך לא תקין: האפשרויות המתאימות הן ${stringified[0]} או ${stringified[1]}`;
        }
        const lastValue = stringified[stringified.length - 1];
        const restValues = stringified.slice(0, -1).join(", ");
        return `ערך לא תקין: האפשרויות המתאימות הן ${restValues} או ${lastValue}`;
      }
      case "too_big": {
        const sizing = getSizing(issue2.origin);
        const subject = withDefinite(issue2.origin ?? "value");
        if (issue2.origin === "string") {
          return `${sizing?.longLabel ?? "ארוך"} מדי: ${subject} צריכה להכיל ${issue2.maximum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "או פחות" : "לכל היותר"}`.trim();
        }
        if (issue2.origin === "number") {
          const comparison = issue2.inclusive ? `קטן או שווה ל-${issue2.maximum}` : `קטן מ-${issue2.maximum}`;
          return `גדול מדי: ${subject} צריך להיות ${comparison}`;
        }
        if (issue2.origin === "array" || issue2.origin === "set") {
          const verb = issue2.origin === "set" ? "צריכה" : "צריך";
          const comparison = issue2.inclusive ? `${issue2.maximum} ${sizing?.unit ?? ""} או פחות` : `פחות מ-${issue2.maximum} ${sizing?.unit ?? ""}`;
          return `גדול מדי: ${subject} ${verb} להכיל ${comparison}`.trim();
        }
        const adj = issue2.inclusive ? "<=" : "<";
        const be = verbFor(issue2.origin ?? "value");
        if (sizing?.unit) {
          return `${sizing.longLabel} מדי: ${subject} ${be} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        }
        return `${sizing?.longLabel ?? "גדול"} מדי: ${subject} ${be} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const sizing = getSizing(issue2.origin);
        const subject = withDefinite(issue2.origin ?? "value");
        if (issue2.origin === "string") {
          return `${sizing?.shortLabel ?? "קצר"} מדי: ${subject} צריכה להכיל ${issue2.minimum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "או יותר" : "לפחות"}`.trim();
        }
        if (issue2.origin === "number") {
          const comparison = issue2.inclusive ? `גדול או שווה ל-${issue2.minimum}` : `גדול מ-${issue2.minimum}`;
          return `קטן מדי: ${subject} צריך להיות ${comparison}`;
        }
        if (issue2.origin === "array" || issue2.origin === "set") {
          const verb = issue2.origin === "set" ? "צריכה" : "צריך";
          if (issue2.minimum === 1 && issue2.inclusive) {
            const singularPhrase = issue2.origin === "set" ? "לפחות פריט אחד" : "לפחות פריט אחד";
            return `קטן מדי: ${subject} ${verb} להכיל ${singularPhrase}`;
          }
          const comparison = issue2.inclusive ? `${issue2.minimum} ${sizing?.unit ?? ""} או יותר` : `יותר מ-${issue2.minimum} ${sizing?.unit ?? ""}`;
          return `קטן מדי: ${subject} ${verb} להכיל ${comparison}`.trim();
        }
        const adj = issue2.inclusive ? ">=" : ">";
        const be = verbFor(issue2.origin ?? "value");
        if (sizing?.unit) {
          return `${sizing.shortLabel} מדי: ${subject} ${be} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `${sizing?.shortLabel ?? "קטן"} מדי: ${subject} ${be} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `המחרוזת חייבת להתחיל ב "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `המחרוזת חייבת להסתיים ב "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `המחרוזת חייבת לכלול "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `המחרוזת חייבת להתאים לתבנית ${_issue.pattern}`;
        const nounEntry = FormatDictionary[_issue.format];
        const noun = nounEntry?.label ?? _issue.format;
        const gender = nounEntry?.gender ?? "m";
        const adjective = gender === "f" ? "תקינה" : "תקין";
        return `${noun} לא ${adjective}`;
      }
      case "not_multiple_of":
        return `מספר לא תקין: חייב להיות מכפלה של ${issue2.divisor}`;
      case "unrecognized_keys":
        return `מפתח${issue2.keys.length > 1 ? "ות" : ""} לא מזוה${issue2.keys.length > 1 ? "ים" : "ה"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key": {
        return `שדה לא תקין באובייקט`;
      }
      case "invalid_union":
        return "קלט לא תקין";
      case "invalid_element": {
        const place = withDefinite(issue2.origin ?? "array");
        return `ערך לא תקין ב${place}`;
      }
      default:
        return `קלט לא תקין`;
    }
  };
};
function he_default() {
  return {
    localeError: error16()
  };
}
// node_modules/zod/v4/locales/hu.js
var error17 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "legyen" },
    file: { unit: "byte", verb: "legyen" },
    array: { unit: "elem", verb: "legyen" },
    set: { unit: "elem", verb: "legyen" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "bemenet",
    email: "email cím",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO időbélyeg",
    date: "ISO dátum",
    time: "ISO idő",
    duration: "ISO időintervallum",
    ipv4: "IPv4 cím",
    ipv6: "IPv6 cím",
    cidrv4: "IPv4 tartomány",
    cidrv6: "IPv6 tartomány",
    base64: "base64-kódolt string",
    base64url: "base64url-kódolt string",
    json_string: "JSON string",
    e164: "E.164 szám",
    jwt: "JWT",
    template_literal: "bemenet"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "szám",
    array: "tömb"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Érvénytelen bemenet: a várt érték instanceof ${issue2.expected}, a kapott érték ${received}`;
        }
        return `Érvénytelen bemenet: a várt érték ${expected}, a kapott érték ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Érvénytelen bemenet: a várt érték ${stringifyPrimitive(issue2.values[0])}`;
        return `Érvénytelen opció: valamelyik érték várt ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Túl nagy: ${issue2.origin ?? "érték"} mérete túl nagy ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elem"}`;
        return `Túl nagy: a bemeneti érték ${issue2.origin ?? "érték"} túl nagy: ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Túl kicsi: a bemeneti érték ${issue2.origin} mérete túl kicsi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Túl kicsi: a bemeneti érték ${issue2.origin} túl kicsi ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Érvénytelen string: "${_issue.prefix}" értékkel kell kezdődnie`;
        if (_issue.format === "ends_with")
          return `Érvénytelen string: "${_issue.suffix}" értékkel kell végződnie`;
        if (_issue.format === "includes")
          return `Érvénytelen string: "${_issue.includes}" értéket kell tartalmaznia`;
        if (_issue.format === "regex")
          return `Érvénytelen string: ${_issue.pattern} mintának kell megfelelnie`;
        return `Érvénytelen ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Érvénytelen szám: ${issue2.divisor} többszörösének kell lennie`;
      case "unrecognized_keys":
        return `Ismeretlen kulcs${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Érvénytelen kulcs ${issue2.origin}`;
      case "invalid_union":
        return "Érvénytelen bemenet";
      case "invalid_element":
        return `Érvénytelen érték: ${issue2.origin}`;
      default:
        return `Érvénytelen bemenet`;
    }
  };
};
function hu_default() {
  return {
    localeError: error17()
  };
}
// node_modules/zod/v4/locales/hy.js
function getArmenianPlural(count, one, many) {
  return Math.abs(count) === 1 ? one : many;
}
function withDefiniteArticle(word) {
  if (!word)
    return "";
  const vowels = ["ա", "ե", "ը", "ի", "ո", "ու", "օ"];
  const lastChar = word[word.length - 1];
  return word + (vowels.includes(lastChar) ? "ն" : "ը");
}
var error18 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "նշան",
        many: "նշաններ"
      },
      verb: "ունենալ"
    },
    file: {
      unit: {
        one: "բայթ",
        many: "բայթեր"
      },
      verb: "ունենալ"
    },
    array: {
      unit: {
        one: "տարր",
        many: "տարրեր"
      },
      verb: "ունենալ"
    },
    set: {
      unit: {
        one: "տարր",
        many: "տարրեր"
      },
      verb: "ունենալ"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "մուտք",
    email: "էլ. հասցե",
    url: "URL",
    emoji: "էմոջի",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO ամսաթիվ և ժամ",
    date: "ISO ամսաթիվ",
    time: "ISO ժամ",
    duration: "ISO տևողություն",
    ipv4: "IPv4 հասցե",
    ipv6: "IPv6 հասցե",
    cidrv4: "IPv4 միջակայք",
    cidrv6: "IPv6 միջակայք",
    base64: "base64 ձևաչափով տող",
    base64url: "base64url ձևաչափով տող",
    json_string: "JSON տող",
    e164: "E.164 համար",
    jwt: "JWT",
    template_literal: "մուտք"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "թիվ",
    array: "զանգված"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Սխալ մուտքագրում․ սպասվում էր instanceof ${issue2.expected}, ստացվել է ${received}`;
        }
        return `Սխալ մուտքագրում․ սպասվում էր ${expected}, ստացվել է ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Սխալ մուտքագրում․ սպասվում էր ${stringifyPrimitive(issue2.values[1])}`;
        return `Սխալ տարբերակ․ սպասվում էր հետևյալներից մեկը՝ ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getArmenianPlural(maxValue, sizing.unit.one, sizing.unit.many);
          return `Չափազանց մեծ արժեք․ սպասվում է, որ ${withDefiniteArticle(issue2.origin ?? "արժեք")} կունենա ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `Չափազանց մեծ արժեք․ սպասվում է, որ ${withDefiniteArticle(issue2.origin ?? "արժեք")} լինի ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getArmenianPlural(minValue, sizing.unit.one, sizing.unit.many);
          return `Չափազանց փոքր արժեք․ սպասվում է, որ ${withDefiniteArticle(issue2.origin)} կունենա ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `Չափազանց փոքր արժեք․ սպասվում է, որ ${withDefiniteArticle(issue2.origin)} լինի ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Սխալ տող․ պետք է սկսվի "${_issue.prefix}"-ով`;
        if (_issue.format === "ends_with")
          return `Սխալ տող․ պետք է ավարտվի "${_issue.suffix}"-ով`;
        if (_issue.format === "includes")
          return `Սխալ տող․ պետք է պարունակի "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Սխալ տող․ պետք է համապատասխանի ${_issue.pattern} ձևաչափին`;
        return `Սխալ ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Սխալ թիվ․ պետք է բազմապատիկ լինի ${issue2.divisor}-ի`;
      case "unrecognized_keys":
        return `Չճանաչված բանալի${issue2.keys.length > 1 ? "ներ" : ""}. ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Սխալ բանալի ${withDefiniteArticle(issue2.origin)}-ում`;
      case "invalid_union":
        return "Սխալ մուտքագրում";
      case "invalid_element":
        return `Սխալ արժեք ${withDefiniteArticle(issue2.origin)}-ում`;
      default:
        return `Սխալ մուտքագրում`;
    }
  };
};
function hy_default() {
  return {
    localeError: error18()
  };
}
// node_modules/zod/v4/locales/id.js
var error19 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "memiliki" },
    file: { unit: "byte", verb: "memiliki" },
    array: { unit: "item", verb: "memiliki" },
    set: { unit: "item", verb: "memiliki" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "alamat email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "tanggal dan waktu format ISO",
    date: "tanggal format ISO",
    time: "jam format ISO",
    duration: "durasi format ISO",
    ipv4: "alamat IPv4",
    ipv6: "alamat IPv6",
    cidrv4: "rentang alamat IPv4",
    cidrv6: "rentang alamat IPv6",
    base64: "string dengan enkode base64",
    base64url: "string dengan enkode base64url",
    json_string: "string JSON",
    e164: "angka E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input tidak valid: diharapkan instanceof ${issue2.expected}, diterima ${received}`;
        }
        return `Input tidak valid: diharapkan ${expected}, diterima ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input tidak valid: diharapkan ${stringifyPrimitive(issue2.values[0])}`;
        return `Pilihan tidak valid: diharapkan salah satu dari ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} memiliki ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
        return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} menjadi ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Terlalu kecil: diharapkan ${issue2.origin} memiliki ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Terlalu kecil: diharapkan ${issue2.origin} menjadi ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `String tidak valid: harus dimulai dengan "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `String tidak valid: harus berakhir dengan "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `String tidak valid: harus menyertakan "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `String tidak valid: harus sesuai pola ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} tidak valid`;
      }
      case "not_multiple_of":
        return `Angka tidak valid: harus kelipatan dari ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak valid di ${issue2.origin}`;
      case "invalid_union":
        return "Input tidak valid";
      case "invalid_element":
        return `Nilai tidak valid di ${issue2.origin}`;
      default:
        return `Input tidak valid`;
    }
  };
};
function id_default() {
  return {
    localeError: error19()
  };
}
// node_modules/zod/v4/locales/is.js
var error20 = () => {
  const Sizable = {
    string: { unit: "stafi", verb: "að hafa" },
    file: { unit: "bæti", verb: "að hafa" },
    array: { unit: "hluti", verb: "að hafa" },
    set: { unit: "hluti", verb: "að hafa" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "gildi",
    email: "netfang",
    url: "vefslóð",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dagsetning og tími",
    date: "ISO dagsetning",
    time: "ISO tími",
    duration: "ISO tímalengd",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded strengur",
    base64url: "base64url-encoded strengur",
    json_string: "JSON strengur",
    e164: "E.164 tölugildi",
    jwt: "JWT",
    template_literal: "gildi"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "númer",
    array: "fylki"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Rangt gildi: Þú slóst inn ${received} þar sem á að vera instanceof ${issue2.expected}`;
        }
        return `Rangt gildi: Þú slóst inn ${received} þar sem á að vera ${expected}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Rangt gildi: gert ráð fyrir ${stringifyPrimitive(issue2.values[0])}`;
        return `Ógilt val: má vera eitt af eftirfarandi ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Of stórt: gert er ráð fyrir að ${issue2.origin ?? "gildi"} hafi ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "hluti"}`;
        return `Of stórt: gert er ráð fyrir að ${issue2.origin ?? "gildi"} sé ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Of lítið: gert er ráð fyrir að ${issue2.origin} hafi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Of lítið: gert er ráð fyrir að ${issue2.origin} sé ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Ógildur strengur: verður að byrja á "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Ógildur strengur: verður að enda á "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ógildur strengur: verður að innihalda "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ógildur strengur: verður að fylgja mynstri ${_issue.pattern}`;
        return `Rangt ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Röng tala: verður að vera margfeldi af ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Óþekkt ${issue2.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Rangur lykill í ${issue2.origin}`;
      case "invalid_union":
        return "Rangt gildi";
      case "invalid_element":
        return `Rangt gildi í ${issue2.origin}`;
      default:
        return `Rangt gildi`;
    }
  };
};
function is_default() {
  return {
    localeError: error20()
  };
}
// node_modules/zod/v4/locales/it.js
var error21 = () => {
  const Sizable = {
    string: { unit: "caratteri", verb: "avere" },
    file: { unit: "byte", verb: "avere" },
    array: { unit: "elementi", verb: "avere" },
    set: { unit: "elementi", verb: "avere" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "indirizzo email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data e ora ISO",
    date: "data ISO",
    time: "ora ISO",
    duration: "durata ISO",
    ipv4: "indirizzo IPv4",
    ipv6: "indirizzo IPv6",
    cidrv4: "intervallo IPv4",
    cidrv6: "intervallo IPv6",
    base64: "stringa codificata in base64",
    base64url: "URL codificata in base64",
    json_string: "stringa JSON",
    e164: "numero E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "numero",
    array: "vettore"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input non valido: atteso instanceof ${issue2.expected}, ricevuto ${received}`;
        }
        return `Input non valido: atteso ${expected}, ricevuto ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input non valido: atteso ${stringifyPrimitive(issue2.values[0])}`;
        return `Opzione non valida: atteso uno tra ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Troppo grande: ${issue2.origin ?? "valore"} deve avere ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementi"}`;
        return `Troppo grande: ${issue2.origin ?? "valore"} deve essere ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Troppo piccolo: ${issue2.origin} deve avere ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Troppo piccolo: ${issue2.origin} deve essere ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Stringa non valida: deve iniziare con "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Stringa non valida: deve terminare con "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Stringa non valida: deve includere "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Numero non valido: deve essere un multiplo di ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Chiav${issue2.keys.length > 1 ? "i" : "e"} non riconosciut${issue2.keys.length > 1 ? "e" : "a"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Chiave non valida in ${issue2.origin}`;
      case "invalid_union":
        return "Input non valido";
      case "invalid_element":
        return `Valore non valido in ${issue2.origin}`;
      default:
        return `Input non valido`;
    }
  };
};
function it_default() {
  return {
    localeError: error21()
  };
}
// node_modules/zod/v4/locales/ja.js
var error22 = () => {
  const Sizable = {
    string: { unit: "文字", verb: "である" },
    file: { unit: "バイト", verb: "である" },
    array: { unit: "要素", verb: "である" },
    set: { unit: "要素", verb: "である" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "入力値",
    email: "メールアドレス",
    url: "URL",
    emoji: "絵文字",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO日時",
    date: "ISO日付",
    time: "ISO時刻",
    duration: "ISO期間",
    ipv4: "IPv4アドレス",
    ipv6: "IPv6アドレス",
    cidrv4: "IPv4範囲",
    cidrv6: "IPv6範囲",
    base64: "base64エンコード文字列",
    base64url: "base64urlエンコード文字列",
    json_string: "JSON文字列",
    e164: "E.164番号",
    jwt: "JWT",
    template_literal: "入力値"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "数値",
    array: "配列"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `無効な入力: instanceof ${issue2.expected}が期待されましたが、${received}が入力されました`;
        }
        return `無効な入力: ${expected}が期待されましたが、${received}が入力されました`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `無効な入力: ${stringifyPrimitive(issue2.values[0])}が期待されました`;
        return `無効な選択: ${joinValues(issue2.values, "、")}のいずれかである必要があります`;
      case "too_big": {
        const adj = issue2.inclusive ? "以下である" : "より小さい";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `大きすぎる値: ${issue2.origin ?? "値"}は${issue2.maximum.toString()}${sizing.unit ?? "要素"}${adj}必要があります`;
        return `大きすぎる値: ${issue2.origin ?? "値"}は${issue2.maximum.toString()}${adj}必要があります`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "以上である" : "より大きい";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `小さすぎる値: ${issue2.origin}は${issue2.minimum.toString()}${sizing.unit}${adj}必要があります`;
        return `小さすぎる値: ${issue2.origin}は${issue2.minimum.toString()}${adj}必要があります`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `無効な文字列: "${_issue.prefix}"で始まる必要があります`;
        if (_issue.format === "ends_with")
          return `無効な文字列: "${_issue.suffix}"で終わる必要があります`;
        if (_issue.format === "includes")
          return `無効な文字列: "${_issue.includes}"を含む必要があります`;
        if (_issue.format === "regex")
          return `無効な文字列: パターン${_issue.pattern}に一致する必要があります`;
        return `無効な${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `無効な数値: ${issue2.divisor}の倍数である必要があります`;
      case "unrecognized_keys":
        return `認識されていないキー${issue2.keys.length > 1 ? "群" : ""}: ${joinValues(issue2.keys, "、")}`;
      case "invalid_key":
        return `${issue2.origin}内の無効なキー`;
      case "invalid_union":
        return "無効な入力";
      case "invalid_element":
        return `${issue2.origin}内の無効な値`;
      default:
        return `無効な入力`;
    }
  };
};
function ja_default() {
  return {
    localeError: error22()
  };
}
// node_modules/zod/v4/locales/ka.js
var error23 = () => {
  const Sizable = {
    string: { unit: "სიმბოლო", verb: "უნდა შეიცავდეს" },
    file: { unit: "ბაიტი", verb: "უნდა შეიცავდეს" },
    array: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" },
    set: { unit: "ელემენტი", verb: "უნდა შეიცავდეს" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "შეყვანა",
    email: "ელ-ფოსტის მისამართი",
    url: "URL",
    emoji: "ემოჯი",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "თარიღი-დრო",
    date: "თარიღი",
    time: "დრო",
    duration: "ხანგრძლივობა",
    ipv4: "IPv4 მისამართი",
    ipv6: "IPv6 მისამართი",
    cidrv4: "IPv4 დიაპაზონი",
    cidrv6: "IPv6 დიაპაზონი",
    base64: "base64-კოდირებული სტრინგი",
    base64url: "base64url-კოდირებული სტრინგი",
    json_string: "JSON სტრინგი",
    e164: "E.164 ნომერი",
    jwt: "JWT",
    template_literal: "შეყვანა"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "რიცხვი",
    string: "სტრინგი",
    boolean: "ბულეანი",
    function: "ფუნქცია",
    array: "მასივი"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `არასწორი შეყვანა: მოსალოდნელი instanceof ${issue2.expected}, მიღებული ${received}`;
        }
        return `არასწორი შეყვანა: მოსალოდნელი ${expected}, მიღებული ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `არასწორი შეყვანა: მოსალოდნელი ${stringifyPrimitive(issue2.values[0])}`;
        return `არასწორი ვარიანტი: მოსალოდნელია ერთ-ერთი ${joinValues(issue2.values, "|")}-დან`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `ზედმეტად დიდი: მოსალოდნელი ${issue2.origin ?? "მნიშვნელობა"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
        return `ზედმეტად დიდი: მოსალოდნელი ${issue2.origin ?? "მნიშვნელობა"} იყოს ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `ზედმეტად პატარა: მოსალოდნელი ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `ზედმეტად პატარა: მოსალოდნელი ${issue2.origin} იყოს ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `არასწორი სტრინგი: უნდა იწყებოდეს "${_issue.prefix}"-ით`;
        }
        if (_issue.format === "ends_with")
          return `არასწორი სტრინგი: უნდა მთავრდებოდეს "${_issue.suffix}"-ით`;
        if (_issue.format === "includes")
          return `არასწორი სტრინგი: უნდა შეიცავდეს "${_issue.includes}"-ს`;
        if (_issue.format === "regex")
          return `არასწორი სტრინგი: უნდა შეესაბამებოდეს შაბლონს ${_issue.pattern}`;
        return `არასწორი ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `არასწორი რიცხვი: უნდა იყოს ${issue2.divisor}-ის ჯერადი`;
      case "unrecognized_keys":
        return `უცნობი გასაღებ${issue2.keys.length > 1 ? "ები" : "ი"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `არასწორი გასაღები ${issue2.origin}-ში`;
      case "invalid_union":
        return "არასწორი შეყვანა";
      case "invalid_element":
        return `არასწორი მნიშვნელობა ${issue2.origin}-ში`;
      default:
        return `არასწორი შეყვანა`;
    }
  };
};
function ka_default() {
  return {
    localeError: error23()
  };
}
// node_modules/zod/v4/locales/km.js
var error24 = () => {
  const Sizable = {
    string: { unit: "តួអក្សរ", verb: "គួរមាន" },
    file: { unit: "បៃ", verb: "គួរមាន" },
    array: { unit: "ធាតុ", verb: "គួរមាន" },
    set: { unit: "ធាតុ", verb: "គួរមាន" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ទិន្នន័យបញ្ចូល",
    email: "អាសយដ្ឋានអ៊ីមែល",
    url: "URL",
    emoji: "សញ្ញាអារម្មណ៍",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "កាលបរិច្ឆេទ និងម៉ោង ISO",
    date: "កាលបរិច្ឆេទ ISO",
    time: "ម៉ោង ISO",
    duration: "រយៈពេល ISO",
    ipv4: "អាសយដ្ឋាន IPv4",
    ipv6: "អាសយដ្ឋាន IPv6",
    cidrv4: "ដែនអាសយដ្ឋាន IPv4",
    cidrv6: "ដែនអាសយដ្ឋាន IPv6",
    base64: "ខ្សែអក្សរអ៊ិកូដ base64",
    base64url: "ខ្សែអក្សរអ៊ិកូដ base64url",
    json_string: "ខ្សែអក្សរ JSON",
    e164: "លេខ E.164",
    jwt: "JWT",
    template_literal: "ទិន្នន័យបញ្ចូល"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "លេខ",
    array: "អារេ (Array)",
    null: "គ្មានតម្លៃ (null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ instanceof ${issue2.expected} ប៉ុន្តែទទួលបាន ${received}`;
        }
        return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${expected} ប៉ុន្តែទទួលបាន ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `ទិន្នន័យបញ្ចូលមិនត្រឹមត្រូវ៖ ត្រូវការ ${stringifyPrimitive(issue2.values[0])}`;
        return `ជម្រើសមិនត្រឹមត្រូវ៖ ត្រូវជាមួយក្នុងចំណោម ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `ធំពេក៖ ត្រូវការ ${issue2.origin ?? "តម្លៃ"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "ធាតុ"}`;
        return `ធំពេក៖ ត្រូវការ ${issue2.origin ?? "តម្លៃ"} ${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `តូចពេក៖ ត្រូវការ ${issue2.origin} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `តូចពេក៖ ត្រូវការ ${issue2.origin} ${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវចាប់ផ្តើមដោយ "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវបញ្ចប់ដោយ "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវមាន "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `ខ្សែអក្សរមិនត្រឹមត្រូវ៖ ត្រូវតែផ្គូផ្គងនឹងទម្រង់ដែលបានកំណត់ ${_issue.pattern}`;
        return `មិនត្រឹមត្រូវ៖ ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `លេខមិនត្រឹមត្រូវ៖ ត្រូវតែជាពហុគុណនៃ ${issue2.divisor}`;
      case "unrecognized_keys":
        return `រកឃើញសោមិនស្គាល់៖ ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `សោមិនត្រឹមត្រូវនៅក្នុង ${issue2.origin}`;
      case "invalid_union":
        return `ទិន្នន័យមិនត្រឹមត្រូវ`;
      case "invalid_element":
        return `ទិន្នន័យមិនត្រឹមត្រូវនៅក្នុង ${issue2.origin}`;
      default:
        return `ទិន្នន័យមិនត្រឹមត្រូវ`;
    }
  };
};
function km_default() {
  return {
    localeError: error24()
  };
}

// node_modules/zod/v4/locales/kh.js
function kh_default() {
  return km_default();
}
// node_modules/zod/v4/locales/ko.js
var error25 = () => {
  const Sizable = {
    string: { unit: "문자", verb: "to have" },
    file: { unit: "바이트", verb: "to have" },
    array: { unit: "개", verb: "to have" },
    set: { unit: "개", verb: "to have" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "입력",
    email: "이메일 주소",
    url: "URL",
    emoji: "이모지",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO 날짜시간",
    date: "ISO 날짜",
    time: "ISO 시간",
    duration: "ISO 기간",
    ipv4: "IPv4 주소",
    ipv6: "IPv6 주소",
    cidrv4: "IPv4 범위",
    cidrv6: "IPv6 범위",
    base64: "base64 인코딩 문자열",
    base64url: "base64url 인코딩 문자열",
    json_string: "JSON 문자열",
    e164: "E.164 번호",
    jwt: "JWT",
    template_literal: "입력"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `잘못된 입력: 예상 타입은 instanceof ${issue2.expected}, 받은 타입은 ${received}입니다`;
        }
        return `잘못된 입력: 예상 타입은 ${expected}, 받은 타입은 ${received}입니다`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `잘못된 입력: 값은 ${stringifyPrimitive(issue2.values[0])} 이어야 합니다`;
        return `잘못된 옵션: ${joinValues(issue2.values, "또는 ")} 중 하나여야 합니다`;
      case "too_big": {
        const adj = issue2.inclusive ? "이하" : "미만";
        const suffix = adj === "미만" ? "이어야 합니다" : "여야 합니다";
        const sizing = getSizing(issue2.origin);
        const unit = sizing?.unit ?? "요소";
        if (sizing)
          return `${issue2.origin ?? "값"}이 너무 큽니다: ${issue2.maximum.toString()}${unit} ${adj}${suffix}`;
        return `${issue2.origin ?? "값"}이 너무 큽니다: ${issue2.maximum.toString()} ${adj}${suffix}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "이상" : "초과";
        const suffix = adj === "이상" ? "이어야 합니다" : "여야 합니다";
        const sizing = getSizing(issue2.origin);
        const unit = sizing?.unit ?? "요소";
        if (sizing) {
          return `${issue2.origin ?? "값"}이 너무 작습니다: ${issue2.minimum.toString()}${unit} ${adj}${suffix}`;
        }
        return `${issue2.origin ?? "값"}이 너무 작습니다: ${issue2.minimum.toString()} ${adj}${suffix}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `잘못된 문자열: "${_issue.prefix}"(으)로 시작해야 합니다`;
        }
        if (_issue.format === "ends_with")
          return `잘못된 문자열: "${_issue.suffix}"(으)로 끝나야 합니다`;
        if (_issue.format === "includes")
          return `잘못된 문자열: "${_issue.includes}"을(를) 포함해야 합니다`;
        if (_issue.format === "regex")
          return `잘못된 문자열: 정규식 ${_issue.pattern} 패턴과 일치해야 합니다`;
        return `잘못된 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `잘못된 숫자: ${issue2.divisor}의 배수여야 합니다`;
      case "unrecognized_keys":
        return `인식할 수 없는 키: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `잘못된 키: ${issue2.origin}`;
      case "invalid_union":
        return `잘못된 입력`;
      case "invalid_element":
        return `잘못된 값: ${issue2.origin}`;
      default:
        return `잘못된 입력`;
    }
  };
};
function ko_default() {
  return {
    localeError: error25()
  };
}
// node_modules/zod/v4/locales/lt.js
var capitalizeFirstCharacter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
function getUnitTypeFromNumber(number2) {
  const abs = Math.abs(number2);
  const last = abs % 10;
  const last2 = abs % 100;
  if (last2 >= 11 && last2 <= 19 || last === 0)
    return "many";
  if (last === 1)
    return "one";
  return "few";
}
var error26 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "simbolis",
        few: "simboliai",
        many: "simbolių"
      },
      verb: {
        smaller: {
          inclusive: "turi būti ne ilgesnė kaip",
          notInclusive: "turi būti trumpesnė kaip"
        },
        bigger: {
          inclusive: "turi būti ne trumpesnė kaip",
          notInclusive: "turi būti ilgesnė kaip"
        }
      }
    },
    file: {
      unit: {
        one: "baitas",
        few: "baitai",
        many: "baitų"
      },
      verb: {
        smaller: {
          inclusive: "turi būti ne didesnis kaip",
          notInclusive: "turi būti mažesnis kaip"
        },
        bigger: {
          inclusive: "turi būti ne mažesnis kaip",
          notInclusive: "turi būti didesnis kaip"
        }
      }
    },
    array: {
      unit: {
        one: "elementą",
        few: "elementus",
        many: "elementų"
      },
      verb: {
        smaller: {
          inclusive: "turi turėti ne daugiau kaip",
          notInclusive: "turi turėti mažiau kaip"
        },
        bigger: {
          inclusive: "turi turėti ne mažiau kaip",
          notInclusive: "turi turėti daugiau kaip"
        }
      }
    },
    set: {
      unit: {
        one: "elementą",
        few: "elementus",
        many: "elementų"
      },
      verb: {
        smaller: {
          inclusive: "turi turėti ne daugiau kaip",
          notInclusive: "turi turėti mažiau kaip"
        },
        bigger: {
          inclusive: "turi turėti ne mažiau kaip",
          notInclusive: "turi turėti daugiau kaip"
        }
      }
    }
  };
  function getSizing(origin, unitType, inclusive, targetShouldBe) {
    const result = Sizable[origin] ?? null;
    if (result === null)
      return result;
    return {
      unit: result.unit[unitType],
      verb: result.verb[targetShouldBe][inclusive ? "inclusive" : "notInclusive"]
    };
  }
  const FormatDictionary = {
    regex: "įvestis",
    email: "el. pašto adresas",
    url: "URL",
    emoji: "jaustukas",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO data ir laikas",
    date: "ISO data",
    time: "ISO laikas",
    duration: "ISO trukmė",
    ipv4: "IPv4 adresas",
    ipv6: "IPv6 adresas",
    cidrv4: "IPv4 tinklo prefiksas (CIDR)",
    cidrv6: "IPv6 tinklo prefiksas (CIDR)",
    base64: "base64 užkoduota eilutė",
    base64url: "base64url užkoduota eilutė",
    json_string: "JSON eilutė",
    e164: "E.164 numeris",
    jwt: "JWT",
    template_literal: "įvestis"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "skaičius",
    bigint: "sveikasis skaičius",
    string: "eilutė",
    boolean: "loginė reikšmė",
    undefined: "neapibrėžta reikšmė",
    function: "funkcija",
    symbol: "simbolis",
    array: "masyvas",
    object: "objektas",
    null: "nulinė reikšmė"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Gautas tipas ${received}, o tikėtasi - instanceof ${issue2.expected}`;
        }
        return `Gautas tipas ${received}, o tikėtasi - ${expected}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Privalo būti ${stringifyPrimitive(issue2.values[0])}`;
        return `Privalo būti vienas iš ${joinValues(issue2.values, "|")} pasirinkimų`;
      case "too_big": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.maximum)), issue2.inclusive ?? false, "smaller");
        if (sizing?.verb)
          return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} ${sizing.verb} ${issue2.maximum.toString()} ${sizing.unit ?? "elementų"}`;
        const adj = issue2.inclusive ? "ne didesnis kaip" : "mažesnis kaip";
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} turi būti ${adj} ${issue2.maximum.toString()} ${sizing?.unit}`;
      }
      case "too_small": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.minimum)), issue2.inclusive ?? false, "bigger");
        if (sizing?.verb)
          return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} ${sizing.verb} ${issue2.minimum.toString()} ${sizing.unit ?? "elementų"}`;
        const adj = issue2.inclusive ? "ne mažesnis kaip" : "didesnis kaip";
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} turi būti ${adj} ${issue2.minimum.toString()} ${sizing?.unit}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Eilutė privalo prasidėti "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Eilutė privalo pasibaigti "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Eilutė privalo įtraukti "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Eilutė privalo atitikti ${_issue.pattern}`;
        return `Neteisingas ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Skaičius privalo būti ${issue2.divisor} kartotinis.`;
      case "unrecognized_keys":
        return `Neatpažint${issue2.keys.length > 1 ? "i" : "as"} rakt${issue2.keys.length > 1 ? "ai" : "as"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return "Rastas klaidingas raktas";
      case "invalid_union":
        return "Klaidinga įvestis";
      case "invalid_element": {
        const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
        return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reikšmė")} turi klaidingą įvestį`;
      }
      default:
        return "Klaidinga įvestis";
    }
  };
};
function lt_default() {
  return {
    localeError: error26()
  };
}
// node_modules/zod/v4/locales/mk.js
var error27 = () => {
  const Sizable = {
    string: { unit: "знаци", verb: "да имаат" },
    file: { unit: "бајти", verb: "да имаат" },
    array: { unit: "ставки", verb: "да имаат" },
    set: { unit: "ставки", verb: "да имаат" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "внес",
    email: "адреса на е-пошта",
    url: "URL",
    emoji: "емоџи",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO датум и време",
    date: "ISO датум",
    time: "ISO време",
    duration: "ISO времетраење",
    ipv4: "IPv4 адреса",
    ipv6: "IPv6 адреса",
    cidrv4: "IPv4 опсег",
    cidrv6: "IPv6 опсег",
    base64: "base64-енкодирана низа",
    base64url: "base64url-енкодирана низа",
    json_string: "JSON низа",
    e164: "E.164 број",
    jwt: "JWT",
    template_literal: "внес"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "број",
    array: "низа"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Грешен внес: се очекува instanceof ${issue2.expected}, примено ${received}`;
        }
        return `Грешен внес: се очекува ${expected}, примено ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
        return `Грешана опција: се очекува една ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Премногу голем: се очекува ${issue2.origin ?? "вредноста"} да има ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "елементи"}`;
        return `Премногу голем: се очекува ${issue2.origin ?? "вредноста"} да биде ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Премногу мал: се очекува ${issue2.origin} да има ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Премногу мал: се очекува ${issue2.origin} да биде ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Неважечка низа: мора да започнува со "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Неважечка низа: мора да завршува со "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Неважечка низа: мора да вклучува "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Неважечка низа: мора да одгоара на патернот ${_issue.pattern}`;
        return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Грешен број: мора да биде делив со ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Непрепознаени клучеви" : "Непрепознаен клуч"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Грешен клуч во ${issue2.origin}`;
      case "invalid_union":
        return "Грешен внес";
      case "invalid_element":
        return `Грешна вредност во ${issue2.origin}`;
      default:
        return `Грешен внес`;
    }
  };
};
function mk_default() {
  return {
    localeError: error27()
  };
}
// node_modules/zod/v4/locales/ms.js
var error28 = () => {
  const Sizable = {
    string: { unit: "aksara", verb: "mempunyai" },
    file: { unit: "bait", verb: "mempunyai" },
    array: { unit: "elemen", verb: "mempunyai" },
    set: { unit: "elemen", verb: "mempunyai" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "alamat e-mel",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "tarikh masa ISO",
    date: "tarikh ISO",
    time: "masa ISO",
    duration: "tempoh ISO",
    ipv4: "alamat IPv4",
    ipv6: "alamat IPv6",
    cidrv4: "julat IPv4",
    cidrv6: "julat IPv6",
    base64: "string dikodkan base64",
    base64url: "string dikodkan base64url",
    json_string: "string JSON",
    e164: "nombor E.164",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nombor"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Input tidak sah: dijangka instanceof ${issue2.expected}, diterima ${received}`;
        }
        return `Input tidak sah: dijangka ${expected}, diterima ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Input tidak sah: dijangka ${stringifyPrimitive(issue2.values[0])}`;
        return `Pilihan tidak sah: dijangka salah satu daripada ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
        return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} adalah ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Terlalu kecil: dijangka ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Terlalu kecil: dijangka ${issue2.origin} adalah ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `String tidak sah: mesti bermula dengan "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `String tidak sah: mesti berakhir dengan "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `String tidak sah: mesti mengandungi "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `String tidak sah: mesti sepadan dengan corak ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} tidak sah`;
      }
      case "not_multiple_of":
        return `Nombor tidak sah: perlu gandaan ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Kunci tidak dikenali: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Kunci tidak sah dalam ${issue2.origin}`;
      case "invalid_union":
        return "Input tidak sah";
      case "invalid_element":
        return `Nilai tidak sah dalam ${issue2.origin}`;
      default:
        return `Input tidak sah`;
    }
  };
};
function ms_default() {
  return {
    localeError: error28()
  };
}
// node_modules/zod/v4/locales/nl.js
var error29 = () => {
  const Sizable = {
    string: { unit: "tekens", verb: "heeft" },
    file: { unit: "bytes", verb: "heeft" },
    array: { unit: "elementen", verb: "heeft" },
    set: { unit: "elementen", verb: "heeft" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "invoer",
    email: "emailadres",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum en tijd",
    date: "ISO datum",
    time: "ISO tijd",
    duration: "ISO duur",
    ipv4: "IPv4-adres",
    ipv6: "IPv6-adres",
    cidrv4: "IPv4-bereik",
    cidrv6: "IPv6-bereik",
    base64: "base64-gecodeerde tekst",
    base64url: "base64 URL-gecodeerde tekst",
    json_string: "JSON string",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "invoer"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "getal"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ongeldige invoer: verwacht instanceof ${issue2.expected}, ontving ${received}`;
        }
        return `Ongeldige invoer: verwacht ${expected}, ontving ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ongeldige invoer: verwacht ${stringifyPrimitive(issue2.values[0])}`;
        return `Ongeldige optie: verwacht één van ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        const longName = issue2.origin === "date" ? "laat" : issue2.origin === "string" ? "lang" : "groot";
        if (sizing)
          return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementen"} ${sizing.verb}`;
        return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} is`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        const shortName = issue2.origin === "date" ? "vroeg" : issue2.origin === "string" ? "kort" : "klein";
        if (sizing) {
          return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        }
        return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} is`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Ongeldige tekst: moet met "${_issue.prefix}" beginnen`;
        }
        if (_issue.format === "ends_with")
          return `Ongeldige tekst: moet op "${_issue.suffix}" eindigen`;
        if (_issue.format === "includes")
          return `Ongeldige tekst: moet "${_issue.includes}" bevatten`;
        if (_issue.format === "regex")
          return `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}`;
        return `Ongeldig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ongeldig getal: moet een veelvoud van ${issue2.divisor} zijn`;
      case "unrecognized_keys":
        return `Onbekende key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ongeldige key in ${issue2.origin}`;
      case "invalid_union":
        return "Ongeldige invoer";
      case "invalid_element":
        return `Ongeldige waarde in ${issue2.origin}`;
      default:
        return `Ongeldige invoer`;
    }
  };
};
function nl_default() {
  return {
    localeError: error29()
  };
}
// node_modules/zod/v4/locales/no.js
var error30 = () => {
  const Sizable = {
    string: { unit: "tegn", verb: "å ha" },
    file: { unit: "bytes", verb: "å ha" },
    array: { unit: "elementer", verb: "å inneholde" },
    set: { unit: "elementer", verb: "å inneholde" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "input",
    email: "e-postadresse",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO dato- og klokkeslett",
    date: "ISO-dato",
    time: "ISO-klokkeslett",
    duration: "ISO-varighet",
    ipv4: "IPv4-område",
    ipv6: "IPv6-område",
    cidrv4: "IPv4-spekter",
    cidrv6: "IPv6-spekter",
    base64: "base64-enkodet streng",
    base64url: "base64url-enkodet streng",
    json_string: "JSON-streng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "tall",
    array: "liste"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ugyldig input: forventet instanceof ${issue2.expected}, fikk ${received}`;
        }
        return `Ugyldig input: forventet ${expected}, fikk ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ugyldig verdi: forventet ${stringifyPrimitive(issue2.values[0])}`;
        return `Ugyldig valg: forventet en av ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `For stor(t): forventet ${issue2.origin ?? "value"} til å ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
        return `For stor(t): forventet ${issue2.origin ?? "value"} til å ha ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `For lite(n): forventet ${issue2.origin} til å ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `For lite(n): forventet ${issue2.origin} til å ha ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ugyldig streng: må starte med "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ugyldig streng: må ende med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ugyldig streng: må inneholde "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ugyldig streng: må matche mønsteret ${_issue.pattern}`;
        return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ugyldig tall: må være et multiplum av ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Ukjente nøkler" : "Ukjent nøkkel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ugyldig nøkkel i ${issue2.origin}`;
      case "invalid_union":
        return "Ugyldig input";
      case "invalid_element":
        return `Ugyldig verdi i ${issue2.origin}`;
      default:
        return `Ugyldig input`;
    }
  };
};
function no_default() {
  return {
    localeError: error30()
  };
}
// node_modules/zod/v4/locales/ota.js
var error31 = () => {
  const Sizable = {
    string: { unit: "harf", verb: "olmalıdır" },
    file: { unit: "bayt", verb: "olmalıdır" },
    array: { unit: "unsur", verb: "olmalıdır" },
    set: { unit: "unsur", verb: "olmalıdır" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "giren",
    email: "epostagâh",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO hengâmı",
    date: "ISO tarihi",
    time: "ISO zamanı",
    duration: "ISO müddeti",
    ipv4: "IPv4 nişânı",
    ipv6: "IPv6 nişânı",
    cidrv4: "IPv4 menzili",
    cidrv6: "IPv6 menzili",
    base64: "base64-şifreli metin",
    base64url: "base64url-şifreli metin",
    json_string: "JSON metin",
    e164: "E.164 sayısı",
    jwt: "JWT",
    template_literal: "giren"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "numara",
    array: "saf",
    null: "gayb"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Fâsit giren: umulan instanceof ${issue2.expected}, alınan ${received}`;
        }
        return `Fâsit giren: umulan ${expected}, alınan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Fâsit giren: umulan ${stringifyPrimitive(issue2.values[0])}`;
        return `Fâsit tercih: mûteberler ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Fazla büyük: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"} sahip olmalıydı.`;
        return `Fazla büyük: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} olmalıydı.`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Fazla küçük: ${issue2.origin}, ${adj}${issue2.minimum.toString()} ${sizing.unit} sahip olmalıydı.`;
        }
        return `Fazla küçük: ${issue2.origin}, ${adj}${issue2.minimum.toString()} olmalıydı.`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Fâsit metin: "${_issue.prefix}" ile başlamalı.`;
        if (_issue.format === "ends_with")
          return `Fâsit metin: "${_issue.suffix}" ile bitmeli.`;
        if (_issue.format === "includes")
          return `Fâsit metin: "${_issue.includes}" ihtivâ etmeli.`;
        if (_issue.format === "regex")
          return `Fâsit metin: ${_issue.pattern} nakşına uymalı.`;
        return `Fâsit ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Fâsit sayı: ${issue2.divisor} katı olmalıydı.`;
      case "unrecognized_keys":
        return `Tanınmayan anahtar ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} için tanınmayan anahtar var.`;
      case "invalid_union":
        return "Giren tanınamadı.";
      case "invalid_element":
        return `${issue2.origin} için tanınmayan kıymet var.`;
      default:
        return `Kıymet tanınamadı.`;
    }
  };
};
function ota_default() {
  return {
    localeError: error31()
  };
}
// node_modules/zod/v4/locales/ps.js
var error32 = () => {
  const Sizable = {
    string: { unit: "توکي", verb: "ولري" },
    file: { unit: "بایټس", verb: "ولري" },
    array: { unit: "توکي", verb: "ولري" },
    set: { unit: "توکي", verb: "ولري" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ورودي",
    email: "بریښنالیک",
    url: "یو آر ال",
    emoji: "ایموجي",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "نیټه او وخت",
    date: "نېټه",
    time: "وخت",
    duration: "موده",
    ipv4: "د IPv4 پته",
    ipv6: "د IPv6 پته",
    cidrv4: "د IPv4 ساحه",
    cidrv6: "د IPv6 ساحه",
    base64: "base64-encoded متن",
    base64url: "base64url-encoded متن",
    json_string: "JSON متن",
    e164: "د E.164 شمېره",
    jwt: "JWT",
    template_literal: "ورودي"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "عدد",
    array: "ارې"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `ناسم ورودي: باید instanceof ${issue2.expected} وای, مګر ${received} ترلاسه شو`;
        }
        return `ناسم ورودي: باید ${expected} وای, مګر ${received} ترلاسه شو`;
      }
      case "invalid_value":
        if (issue2.values.length === 1) {
          return `ناسم ورودي: باید ${stringifyPrimitive(issue2.values[0])} وای`;
        }
        return `ناسم انتخاب: باید یو له ${joinValues(issue2.values, "|")} څخه وای`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `ډیر لوی: ${issue2.origin ?? "ارزښت"} باید ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "عنصرونه"} ولري`;
        }
        return `ډیر لوی: ${issue2.origin ?? "ارزښت"} باید ${adj}${issue2.maximum.toString()} وي`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `ډیر کوچنی: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} ${sizing.unit} ولري`;
        }
        return `ډیر کوچنی: ${issue2.origin} باید ${adj}${issue2.minimum.toString()} وي`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `ناسم متن: باید د "${_issue.prefix}" سره پیل شي`;
        }
        if (_issue.format === "ends_with") {
          return `ناسم متن: باید د "${_issue.suffix}" سره پای ته ورسيږي`;
        }
        if (_issue.format === "includes") {
          return `ناسم متن: باید "${_issue.includes}" ولري`;
        }
        if (_issue.format === "regex") {
          return `ناسم متن: باید د ${_issue.pattern} سره مطابقت ولري`;
        }
        return `${FormatDictionary[_issue.format] ?? issue2.format} ناسم دی`;
      }
      case "not_multiple_of":
        return `ناسم عدد: باید د ${issue2.divisor} مضرب وي`;
      case "unrecognized_keys":
        return `ناسم ${issue2.keys.length > 1 ? "کلیډونه" : "کلیډ"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `ناسم کلیډ په ${issue2.origin} کې`;
      case "invalid_union":
        return `ناسمه ورودي`;
      case "invalid_element":
        return `ناسم عنصر په ${issue2.origin} کې`;
      default:
        return `ناسمه ورودي`;
    }
  };
};
function ps_default() {
  return {
    localeError: error32()
  };
}
// node_modules/zod/v4/locales/pl.js
var error33 = () => {
  const Sizable = {
    string: { unit: "znaków", verb: "mieć" },
    file: { unit: "bajtów", verb: "mieć" },
    array: { unit: "elementów", verb: "mieć" },
    set: { unit: "elementów", verb: "mieć" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "wyrażenie",
    email: "adres email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data i godzina w formacie ISO",
    date: "data w formacie ISO",
    time: "godzina w formacie ISO",
    duration: "czas trwania ISO",
    ipv4: "adres IPv4",
    ipv6: "adres IPv6",
    cidrv4: "zakres IPv4",
    cidrv6: "zakres IPv6",
    base64: "ciąg znaków zakodowany w formacie base64",
    base64url: "ciąg znaków zakodowany w formacie base64url",
    json_string: "ciąg znaków w formacie JSON",
    e164: "liczba E.164",
    jwt: "JWT",
    template_literal: "wejście"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "liczba",
    array: "tablica"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Nieprawidłowe dane wejściowe: oczekiwano instanceof ${issue2.expected}, otrzymano ${received}`;
        }
        return `Nieprawidłowe dane wejściowe: oczekiwano ${expected}, otrzymano ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Nieprawidłowe dane wejściowe: oczekiwano ${stringifyPrimitive(issue2.values[0])}`;
        return `Nieprawidłowa opcja: oczekiwano jednej z wartości ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Za duża wartość: oczekiwano, że ${issue2.origin ?? "wartość"} będzie mieć ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementów"}`;
        }
        return `Zbyt duż(y/a/e): oczekiwano, że ${issue2.origin ?? "wartość"} będzie wynosić ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Za mała wartość: oczekiwano, że ${issue2.origin ?? "wartość"} będzie mieć ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "elementów"}`;
        }
        return `Zbyt mał(y/a/e): oczekiwano, że ${issue2.origin ?? "wartość"} będzie wynosić ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Nieprawidłowy ciąg znaków: musi zaczynać się od "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Nieprawidłowy ciąg znaków: musi kończyć się na "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Nieprawidłowy ciąg znaków: musi zawierać "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Nieprawidłowy ciąg znaków: musi odpowiadać wzorcowi ${_issue.pattern}`;
        return `Nieprawidłow(y/a/e) ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nieprawidłowa liczba: musi być wielokrotnością ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Nierozpoznane klucze${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Nieprawidłowy klucz w ${issue2.origin}`;
      case "invalid_union":
        return "Nieprawidłowe dane wejściowe";
      case "invalid_element":
        return `Nieprawidłowa wartość w ${issue2.origin}`;
      default:
        return `Nieprawidłowe dane wejściowe`;
    }
  };
};
function pl_default() {
  return {
    localeError: error33()
  };
}
// node_modules/zod/v4/locales/pt.js
var error34 = () => {
  const Sizable = {
    string: { unit: "caracteres", verb: "ter" },
    file: { unit: "bytes", verb: "ter" },
    array: { unit: "itens", verb: "ter" },
    set: { unit: "itens", verb: "ter" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "padrão",
    email: "endereço de e-mail",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "data e hora ISO",
    date: "data ISO",
    time: "hora ISO",
    duration: "duração ISO",
    ipv4: "endereço IPv4",
    ipv6: "endereço IPv6",
    cidrv4: "faixa de IPv4",
    cidrv6: "faixa de IPv6",
    base64: "texto codificado em base64",
    base64url: "URL codificada em base64",
    json_string: "texto JSON",
    e164: "número E.164",
    jwt: "JWT",
    template_literal: "entrada"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "número",
    null: "nulo"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Tipo inválido: esperado instanceof ${issue2.expected}, recebido ${received}`;
        }
        return `Tipo inválido: esperado ${expected}, recebido ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Entrada inválida: esperado ${stringifyPrimitive(issue2.values[0])}`;
        return `Opção inválida: esperada uma das ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Muito grande: esperado que ${issue2.origin ?? "valor"} tivesse ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
        return `Muito grande: esperado que ${issue2.origin ?? "valor"} fosse ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Muito pequeno: esperado que ${issue2.origin} tivesse ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Muito pequeno: esperado que ${issue2.origin} fosse ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Texto inválido: deve começar com "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Texto inválido: deve terminar com "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Texto inválido: deve incluir "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Texto inválido: deve corresponder ao padrão ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} inválido`;
      }
      case "not_multiple_of":
        return `Número inválido: deve ser múltiplo de ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Chave${issue2.keys.length > 1 ? "s" : ""} desconhecida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Chave inválida em ${issue2.origin}`;
      case "invalid_union":
        return "Entrada inválida";
      case "invalid_element":
        return `Valor inválido em ${issue2.origin}`;
      default:
        return `Campo inválido`;
    }
  };
};
function pt_default() {
  return {
    localeError: error34()
  };
}
// node_modules/zod/v4/locales/ru.js
function getRussianPlural(count, one, few, many) {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
var error35 = () => {
  const Sizable = {
    string: {
      unit: {
        one: "символ",
        few: "символа",
        many: "символов"
      },
      verb: "иметь"
    },
    file: {
      unit: {
        one: "байт",
        few: "байта",
        many: "байт"
      },
      verb: "иметь"
    },
    array: {
      unit: {
        one: "элемент",
        few: "элемента",
        many: "элементов"
      },
      verb: "иметь"
    },
    set: {
      unit: {
        one: "элемент",
        few: "элемента",
        many: "элементов"
      },
      verb: "иметь"
    }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ввод",
    email: "email адрес",
    url: "URL",
    emoji: "эмодзи",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO дата и время",
    date: "ISO дата",
    time: "ISO время",
    duration: "ISO длительность",
    ipv4: "IPv4 адрес",
    ipv6: "IPv6 адрес",
    cidrv4: "IPv4 диапазон",
    cidrv6: "IPv6 диапазон",
    base64: "строка в формате base64",
    base64url: "строка в формате base64url",
    json_string: "JSON строка",
    e164: "номер E.164",
    jwt: "JWT",
    template_literal: "ввод"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "число",
    array: "массив"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Неверный ввод: ожидалось instanceof ${issue2.expected}, получено ${received}`;
        }
        return `Неверный ввод: ожидалось ${expected}, получено ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Неверный ввод: ожидалось ${stringifyPrimitive(issue2.values[0])}`;
        return `Неверный вариант: ожидалось одно из ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const maxValue = Number(issue2.maximum);
          const unit = getRussianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Слишком большое значение: ожидалось, что ${issue2.origin ?? "значение"} будет иметь ${adj}${issue2.maximum.toString()} ${unit}`;
        }
        return `Слишком большое значение: ожидалось, что ${issue2.origin ?? "значение"} будет ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          const minValue = Number(issue2.minimum);
          const unit = getRussianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
          return `Слишком маленькое значение: ожидалось, что ${issue2.origin} будет иметь ${adj}${issue2.minimum.toString()} ${unit}`;
        }
        return `Слишком маленькое значение: ожидалось, что ${issue2.origin} будет ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Неверная строка: должна начинаться с "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Неверная строка: должна заканчиваться на "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Неверная строка: должна содержать "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Неверная строка: должна соответствовать шаблону ${_issue.pattern}`;
        return `Неверный ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Неверное число: должно быть кратным ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Нераспознанн${issue2.keys.length > 1 ? "ые" : "ый"} ключ${issue2.keys.length > 1 ? "и" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Неверный ключ в ${issue2.origin}`;
      case "invalid_union":
        return "Неверные входные данные";
      case "invalid_element":
        return `Неверное значение в ${issue2.origin}`;
      default:
        return `Неверные входные данные`;
    }
  };
};
function ru_default() {
  return {
    localeError: error35()
  };
}
// node_modules/zod/v4/locales/sl.js
var error36 = () => {
  const Sizable = {
    string: { unit: "znakov", verb: "imeti" },
    file: { unit: "bajtov", verb: "imeti" },
    array: { unit: "elementov", verb: "imeti" },
    set: { unit: "elementov", verb: "imeti" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "vnos",
    email: "e-poštni naslov",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum in čas",
    date: "ISO datum",
    time: "ISO čas",
    duration: "ISO trajanje",
    ipv4: "IPv4 naslov",
    ipv6: "IPv6 naslov",
    cidrv4: "obseg IPv4",
    cidrv6: "obseg IPv6",
    base64: "base64 kodiran niz",
    base64url: "base64url kodiran niz",
    json_string: "JSON niz",
    e164: "E.164 številka",
    jwt: "JWT",
    template_literal: "vnos"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "število",
    array: "tabela"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Neveljaven vnos: pričakovano instanceof ${issue2.expected}, prejeto ${received}`;
        }
        return `Neveljaven vnos: pričakovano ${expected}, prejeto ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Neveljaven vnos: pričakovano ${stringifyPrimitive(issue2.values[0])}`;
        return `Neveljavna možnost: pričakovano eno izmed ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Preveliko: pričakovano, da bo ${issue2.origin ?? "vrednost"} imelo ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementov"}`;
        return `Preveliko: pričakovano, da bo ${issue2.origin ?? "vrednost"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Premajhno: pričakovano, da bo ${issue2.origin} imelo ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Premajhno: pričakovano, da bo ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Neveljaven niz: mora se začeti z "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Neveljaven niz: mora se končati z "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neveljaven niz: mora vsebovati "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neveljaven niz: mora ustrezati vzorcu ${_issue.pattern}`;
        return `Neveljaven ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Neveljavno število: mora biti večkratnik ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Neprepoznan${issue2.keys.length > 1 ? "i ključi" : " ključ"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Neveljaven ključ v ${issue2.origin}`;
      case "invalid_union":
        return "Neveljaven vnos";
      case "invalid_element":
        return `Neveljavna vrednost v ${issue2.origin}`;
      default:
        return "Neveljaven vnos";
    }
  };
};
function sl_default() {
  return {
    localeError: error36()
  };
}
// node_modules/zod/v4/locales/sv.js
var error37 = () => {
  const Sizable = {
    string: { unit: "tecken", verb: "att ha" },
    file: { unit: "bytes", verb: "att ha" },
    array: { unit: "objekt", verb: "att innehålla" },
    set: { unit: "objekt", verb: "att innehålla" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "reguljärt uttryck",
    email: "e-postadress",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO-datum och tid",
    date: "ISO-datum",
    time: "ISO-tid",
    duration: "ISO-varaktighet",
    ipv4: "IPv4-intervall",
    ipv6: "IPv6-intervall",
    cidrv4: "IPv4-spektrum",
    cidrv6: "IPv6-spektrum",
    base64: "base64-kodad sträng",
    base64url: "base64url-kodad sträng",
    json_string: "JSON-sträng",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "mall-literal"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "antal",
    array: "lista"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ogiltig inmatning: förväntat instanceof ${issue2.expected}, fick ${received}`;
        }
        return `Ogiltig inmatning: förväntat ${expected}, fick ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ogiltig inmatning: förväntat ${stringifyPrimitive(issue2.values[0])}`;
        return `Ogiltigt val: förväntade en av ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `För stor(t): förväntade ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
        }
        return `För stor(t): förväntat ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `För lite(t): förväntade ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `För lite(t): förväntade ${issue2.origin ?? "värdet"} att ha ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `Ogiltig sträng: måste börja med "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `Ogiltig sträng: måste sluta med "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ogiltig sträng: måste innehålla "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ogiltig sträng: måste matcha mönstret "${_issue.pattern}"`;
        return `Ogiltig(t) ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Ogiltigt tal: måste vara en multipel av ${issue2.divisor}`;
      case "unrecognized_keys":
        return `${issue2.keys.length > 1 ? "Okända nycklar" : "Okänd nyckel"}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Ogiltig nyckel i ${issue2.origin ?? "värdet"}`;
      case "invalid_union":
        return "Ogiltig input";
      case "invalid_element":
        return `Ogiltigt värde i ${issue2.origin ?? "värdet"}`;
      default:
        return `Ogiltig input`;
    }
  };
};
function sv_default() {
  return {
    localeError: error37()
  };
}
// node_modules/zod/v4/locales/ta.js
var error38 = () => {
  const Sizable = {
    string: { unit: "எழுத்துக்கள்", verb: "கொண்டிருக்க வேண்டும்" },
    file: { unit: "பைட்டுகள்", verb: "கொண்டிருக்க வேண்டும்" },
    array: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" },
    set: { unit: "உறுப்புகள்", verb: "கொண்டிருக்க வேண்டும்" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "உள்ளீடு",
    email: "மின்னஞ்சல் முகவரி",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO தேதி நேரம்",
    date: "ISO தேதி",
    time: "ISO நேரம்",
    duration: "ISO கால அளவு",
    ipv4: "IPv4 முகவரி",
    ipv6: "IPv6 முகவரி",
    cidrv4: "IPv4 வரம்பு",
    cidrv6: "IPv6 வரம்பு",
    base64: "base64-encoded சரம்",
    base64url: "base64url-encoded சரம்",
    json_string: "JSON சரம்",
    e164: "E.164 எண்",
    jwt: "JWT",
    template_literal: "input"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "எண்",
    array: "அணி",
    null: "வெறுமை"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது instanceof ${issue2.expected}, பெறப்பட்டது ${received}`;
        }
        return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${expected}, பெறப்பட்டது ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `தவறான உள்ளீடு: எதிர்பார்க்கப்பட்டது ${stringifyPrimitive(issue2.values[0])}`;
        return `தவறான விருப்பம்: எதிர்பார்க்கப்பட்டது ${joinValues(issue2.values, "|")} இல் ஒன்று`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue2.origin ?? "மதிப்பு"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "உறுப்புகள்"} ஆக இருக்க வேண்டும்`;
        }
        return `மிக பெரியது: எதிர்பார்க்கப்பட்டது ${issue2.origin ?? "மதிப்பு"} ${adj}${issue2.maximum.toString()} ஆக இருக்க வேண்டும்`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ஆக இருக்க வேண்டும்`;
        }
        return `மிகச் சிறியது: எதிர்பார்க்கப்பட்டது ${issue2.origin} ${adj}${issue2.minimum.toString()} ஆக இருக்க வேண்டும்`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `தவறான சரம்: "${_issue.prefix}" இல் தொடங்க வேண்டும்`;
        if (_issue.format === "ends_with")
          return `தவறான சரம்: "${_issue.suffix}" இல் முடிவடைய வேண்டும்`;
        if (_issue.format === "includes")
          return `தவறான சரம்: "${_issue.includes}" ஐ உள்ளடக்க வேண்டும்`;
        if (_issue.format === "regex")
          return `தவறான சரம்: ${_issue.pattern} முறைபாட்டுடன் பொருந்த வேண்டும்`;
        return `தவறான ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `தவறான எண்: ${issue2.divisor} இன் பலமாக இருக்க வேண்டும்`;
      case "unrecognized_keys":
        return `அடையாளம் தெரியாத விசை${issue2.keys.length > 1 ? "கள்" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} இல் தவறான விசை`;
      case "invalid_union":
        return "தவறான உள்ளீடு";
      case "invalid_element":
        return `${issue2.origin} இல் தவறான மதிப்பு`;
      default:
        return `தவறான உள்ளீடு`;
    }
  };
};
function ta_default() {
  return {
    localeError: error38()
  };
}
// node_modules/zod/v4/locales/th.js
var error39 = () => {
  const Sizable = {
    string: { unit: "ตัวอักษร", verb: "ควรมี" },
    file: { unit: "ไบต์", verb: "ควรมี" },
    array: { unit: "รายการ", verb: "ควรมี" },
    set: { unit: "รายการ", verb: "ควรมี" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ข้อมูลที่ป้อน",
    email: "ที่อยู่อีเมล",
    url: "URL",
    emoji: "อิโมจิ",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "วันที่เวลาแบบ ISO",
    date: "วันที่แบบ ISO",
    time: "เวลาแบบ ISO",
    duration: "ช่วงเวลาแบบ ISO",
    ipv4: "ที่อยู่ IPv4",
    ipv6: "ที่อยู่ IPv6",
    cidrv4: "ช่วง IP แบบ IPv4",
    cidrv6: "ช่วง IP แบบ IPv6",
    base64: "ข้อความแบบ Base64",
    base64url: "ข้อความแบบ Base64 สำหรับ URL",
    json_string: "ข้อความแบบ JSON",
    e164: "เบอร์โทรศัพท์ระหว่างประเทศ (E.164)",
    jwt: "โทเคน JWT",
    template_literal: "ข้อมูลที่ป้อน"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "ตัวเลข",
    array: "อาร์เรย์ (Array)",
    null: "ไม่มีค่า (null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น instanceof ${issue2.expected} แต่ได้รับ ${received}`;
        }
        return `ประเภทข้อมูลไม่ถูกต้อง: ควรเป็น ${expected} แต่ได้รับ ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `ค่าไม่ถูกต้อง: ควรเป็น ${stringifyPrimitive(issue2.values[0])}`;
        return `ตัวเลือกไม่ถูกต้อง: ควรเป็นหนึ่งใน ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "ไม่เกิน" : "น้อยกว่า";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `เกินกำหนด: ${issue2.origin ?? "ค่า"} ควรมี${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "รายการ"}`;
        return `เกินกำหนด: ${issue2.origin ?? "ค่า"} ควรมี${adj} ${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? "อย่างน้อย" : "มากกว่า";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `น้อยกว่ากำหนด: ${issue2.origin} ควรมี${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `น้อยกว่ากำหนด: ${issue2.origin} ควรมี${adj} ${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `รูปแบบไม่ถูกต้อง: ข้อความต้องขึ้นต้นด้วย "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with")
          return `รูปแบบไม่ถูกต้อง: ข้อความต้องลงท้ายด้วย "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `รูปแบบไม่ถูกต้อง: ข้อความต้องมี "${_issue.includes}" อยู่ในข้อความ`;
        if (_issue.format === "regex")
          return `รูปแบบไม่ถูกต้อง: ต้องตรงกับรูปแบบที่กำหนด ${_issue.pattern}`;
        return `รูปแบบไม่ถูกต้อง: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `ตัวเลขไม่ถูกต้อง: ต้องเป็นจำนวนที่หารด้วย ${issue2.divisor} ได้ลงตัว`;
      case "unrecognized_keys":
        return `พบคีย์ที่ไม่รู้จัก: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `คีย์ไม่ถูกต้องใน ${issue2.origin}`;
      case "invalid_union":
        return "ข้อมูลไม่ถูกต้อง: ไม่ตรงกับรูปแบบยูเนียนที่กำหนดไว้";
      case "invalid_element":
        return `ข้อมูลไม่ถูกต้องใน ${issue2.origin}`;
      default:
        return `ข้อมูลไม่ถูกต้อง`;
    }
  };
};
function th_default() {
  return {
    localeError: error39()
  };
}
// node_modules/zod/v4/locales/tr.js
var error40 = () => {
  const Sizable = {
    string: { unit: "karakter", verb: "olmalı" },
    file: { unit: "bayt", verb: "olmalı" },
    array: { unit: "öğe", verb: "olmalı" },
    set: { unit: "öğe", verb: "olmalı" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "girdi",
    email: "e-posta adresi",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO tarih ve saat",
    date: "ISO tarih",
    time: "ISO saat",
    duration: "ISO süre",
    ipv4: "IPv4 adresi",
    ipv6: "IPv6 adresi",
    cidrv4: "IPv4 aralığı",
    cidrv6: "IPv6 aralığı",
    base64: "base64 ile şifrelenmiş metin",
    base64url: "base64url ile şifrelenmiş metin",
    json_string: "JSON dizesi",
    e164: "E.164 sayısı",
    jwt: "JWT",
    template_literal: "Şablon dizesi"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Geçersiz değer: beklenen instanceof ${issue2.expected}, alınan ${received}`;
        }
        return `Geçersiz değer: beklenen ${expected}, alınan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Geçersiz değer: beklenen ${stringifyPrimitive(issue2.values[0])}`;
        return `Geçersiz seçenek: aşağıdakilerden biri olmalı: ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Çok büyük: beklenen ${issue2.origin ?? "değer"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "öğe"}`;
        return `Çok büyük: beklenen ${issue2.origin ?? "değer"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Çok küçük: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        return `Çok küçük: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Geçersiz metin: "${_issue.prefix}" ile başlamalı`;
        if (_issue.format === "ends_with")
          return `Geçersiz metin: "${_issue.suffix}" ile bitmeli`;
        if (_issue.format === "includes")
          return `Geçersiz metin: "${_issue.includes}" içermeli`;
        if (_issue.format === "regex")
          return `Geçersiz metin: ${_issue.pattern} desenine uymalı`;
        return `Geçersiz ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Geçersiz sayı: ${issue2.divisor} ile tam bölünebilmeli`;
      case "unrecognized_keys":
        return `Tanınmayan anahtar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} içinde geçersiz anahtar`;
      case "invalid_union":
        return "Geçersiz değer";
      case "invalid_element":
        return `${issue2.origin} içinde geçersiz değer`;
      default:
        return `Geçersiz değer`;
    }
  };
};
function tr_default() {
  return {
    localeError: error40()
  };
}
// node_modules/zod/v4/locales/uk.js
var error41 = () => {
  const Sizable = {
    string: { unit: "символів", verb: "матиме" },
    file: { unit: "байтів", verb: "матиме" },
    array: { unit: "елементів", verb: "матиме" },
    set: { unit: "елементів", verb: "матиме" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "вхідні дані",
    email: "адреса електронної пошти",
    url: "URL",
    emoji: "емодзі",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "дата та час ISO",
    date: "дата ISO",
    time: "час ISO",
    duration: "тривалість ISO",
    ipv4: "адреса IPv4",
    ipv6: "адреса IPv6",
    cidrv4: "діапазон IPv4",
    cidrv6: "діапазон IPv6",
    base64: "рядок у кодуванні base64",
    base64url: "рядок у кодуванні base64url",
    json_string: "рядок JSON",
    e164: "номер E.164",
    jwt: "JWT",
    template_literal: "вхідні дані"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "число",
    array: "масив"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Неправильні вхідні дані: очікується instanceof ${issue2.expected}, отримано ${received}`;
        }
        return `Неправильні вхідні дані: очікується ${expected}, отримано ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Неправильні вхідні дані: очікується ${stringifyPrimitive(issue2.values[0])}`;
        return `Неправильна опція: очікується одне з ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Занадто велике: очікується, що ${issue2.origin ?? "значення"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "елементів"}`;
        return `Занадто велике: очікується, що ${issue2.origin ?? "значення"} буде ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Занадто мале: очікується, що ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Занадто мале: очікується, що ${issue2.origin} буде ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Неправильний рядок: повинен починатися з "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Неправильний рядок: повинен закінчуватися на "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Неправильний рядок: повинен містити "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Неправильний рядок: повинен відповідати шаблону ${_issue.pattern}`;
        return `Неправильний ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Неправильне число: повинно бути кратним ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Нерозпізнаний ключ${issue2.keys.length > 1 ? "і" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Неправильний ключ у ${issue2.origin}`;
      case "invalid_union":
        return "Неправильні вхідні дані";
      case "invalid_element":
        return `Неправильне значення у ${issue2.origin}`;
      default:
        return `Неправильні вхідні дані`;
    }
  };
};
function uk_default() {
  return {
    localeError: error41()
  };
}

// node_modules/zod/v4/locales/ua.js
function ua_default() {
  return uk_default();
}
// node_modules/zod/v4/locales/ur.js
var error42 = () => {
  const Sizable = {
    string: { unit: "حروف", verb: "ہونا" },
    file: { unit: "بائٹس", verb: "ہونا" },
    array: { unit: "آئٹمز", verb: "ہونا" },
    set: { unit: "آئٹمز", verb: "ہونا" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ان پٹ",
    email: "ای میل ایڈریس",
    url: "یو آر ایل",
    emoji: "ایموجی",
    uuid: "یو یو آئی ڈی",
    uuidv4: "یو یو آئی ڈی وی 4",
    uuidv6: "یو یو آئی ڈی وی 6",
    nanoid: "نینو آئی ڈی",
    guid: "جی یو آئی ڈی",
    cuid: "سی یو آئی ڈی",
    cuid2: "سی یو آئی ڈی 2",
    ulid: "یو ایل آئی ڈی",
    xid: "ایکس آئی ڈی",
    ksuid: "کے ایس یو آئی ڈی",
    datetime: "آئی ایس او ڈیٹ ٹائم",
    date: "آئی ایس او تاریخ",
    time: "آئی ایس او وقت",
    duration: "آئی ایس او مدت",
    ipv4: "آئی پی وی 4 ایڈریس",
    ipv6: "آئی پی وی 6 ایڈریس",
    cidrv4: "آئی پی وی 4 رینج",
    cidrv6: "آئی پی وی 6 رینج",
    base64: "بیس 64 ان کوڈڈ سٹرنگ",
    base64url: "بیس 64 یو آر ایل ان کوڈڈ سٹرنگ",
    json_string: "جے ایس او این سٹرنگ",
    e164: "ای 164 نمبر",
    jwt: "جے ڈبلیو ٹی",
    template_literal: "ان پٹ"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "نمبر",
    array: "آرے",
    null: "نل"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `غلط ان پٹ: instanceof ${issue2.expected} متوقع تھا، ${received} موصول ہوا`;
        }
        return `غلط ان پٹ: ${expected} متوقع تھا، ${received} موصول ہوا`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `غلط ان پٹ: ${stringifyPrimitive(issue2.values[0])} متوقع تھا`;
        return `غلط آپشن: ${joinValues(issue2.values, "|")} میں سے ایک متوقع تھا`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `بہت بڑا: ${issue2.origin ?? "ویلیو"} کے ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "عناصر"} ہونے متوقع تھے`;
        return `بہت بڑا: ${issue2.origin ?? "ویلیو"} کا ${adj}${issue2.maximum.toString()} ہونا متوقع تھا`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `بہت چھوٹا: ${issue2.origin} کے ${adj}${issue2.minimum.toString()} ${sizing.unit} ہونے متوقع تھے`;
        }
        return `بہت چھوٹا: ${issue2.origin} کا ${adj}${issue2.minimum.toString()} ہونا متوقع تھا`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `غلط سٹرنگ: "${_issue.prefix}" سے شروع ہونا چاہیے`;
        }
        if (_issue.format === "ends_with")
          return `غلط سٹرنگ: "${_issue.suffix}" پر ختم ہونا چاہیے`;
        if (_issue.format === "includes")
          return `غلط سٹرنگ: "${_issue.includes}" شامل ہونا چاہیے`;
        if (_issue.format === "regex")
          return `غلط سٹرنگ: پیٹرن ${_issue.pattern} سے میچ ہونا چاہیے`;
        return `غلط ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `غلط نمبر: ${issue2.divisor} کا مضاعف ہونا چاہیے`;
      case "unrecognized_keys":
        return `غیر تسلیم شدہ کی${issue2.keys.length > 1 ? "ز" : ""}: ${joinValues(issue2.keys, "، ")}`;
      case "invalid_key":
        return `${issue2.origin} میں غلط کی`;
      case "invalid_union":
        return "غلط ان پٹ";
      case "invalid_element":
        return `${issue2.origin} میں غلط ویلیو`;
      default:
        return `غلط ان پٹ`;
    }
  };
};
function ur_default() {
  return {
    localeError: error42()
  };
}
// node_modules/zod/v4/locales/uz.js
var error43 = () => {
  const Sizable = {
    string: { unit: "belgi", verb: "bo‘lishi kerak" },
    file: { unit: "bayt", verb: "bo‘lishi kerak" },
    array: { unit: "element", verb: "bo‘lishi kerak" },
    set: { unit: "element", verb: "bo‘lishi kerak" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "kirish",
    email: "elektron pochta manzili",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO sana va vaqti",
    date: "ISO sana",
    time: "ISO vaqt",
    duration: "ISO davomiylik",
    ipv4: "IPv4 manzil",
    ipv6: "IPv6 manzil",
    mac: "MAC manzil",
    cidrv4: "IPv4 diapazon",
    cidrv6: "IPv6 diapazon",
    base64: "base64 kodlangan satr",
    base64url: "base64url kodlangan satr",
    json_string: "JSON satr",
    e164: "E.164 raqam",
    jwt: "JWT",
    template_literal: "kirish"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "raqam",
    array: "massiv"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Noto‘g‘ri kirish: kutilgan instanceof ${issue2.expected}, qabul qilingan ${received}`;
        }
        return `Noto‘g‘ri kirish: kutilgan ${expected}, qabul qilingan ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Noto‘g‘ri kirish: kutilgan ${stringifyPrimitive(issue2.values[0])}`;
        return `Noto‘g‘ri variant: quyidagilardan biri kutilgan ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
        return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        }
        return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Noto‘g‘ri satr: "${_issue.prefix}" bilan boshlanishi kerak`;
        if (_issue.format === "ends_with")
          return `Noto‘g‘ri satr: "${_issue.suffix}" bilan tugashi kerak`;
        if (_issue.format === "includes")
          return `Noto‘g‘ri satr: "${_issue.includes}" ni o‘z ichiga olishi kerak`;
        if (_issue.format === "regex")
          return `Noto‘g‘ri satr: ${_issue.pattern} shabloniga mos kelishi kerak`;
        return `Noto‘g‘ri ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Noto‘g‘ri raqam: ${issue2.divisor} ning karralisi bo‘lishi kerak`;
      case "unrecognized_keys":
        return `Noma’lum kalit${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} dagi kalit noto‘g‘ri`;
      case "invalid_union":
        return "Noto‘g‘ri kirish";
      case "invalid_element":
        return `${issue2.origin} da noto‘g‘ri qiymat`;
      default:
        return `Noto‘g‘ri kirish`;
    }
  };
};
function uz_default() {
  return {
    localeError: error43()
  };
}
// node_modules/zod/v4/locales/vi.js
var error44 = () => {
  const Sizable = {
    string: { unit: "ký tự", verb: "có" },
    file: { unit: "byte", verb: "có" },
    array: { unit: "phần tử", verb: "có" },
    set: { unit: "phần tử", verb: "có" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "đầu vào",
    email: "địa chỉ email",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ngày giờ ISO",
    date: "ngày ISO",
    time: "giờ ISO",
    duration: "khoảng thời gian ISO",
    ipv4: "địa chỉ IPv4",
    ipv6: "địa chỉ IPv6",
    cidrv4: "dải IPv4",
    cidrv6: "dải IPv6",
    base64: "chuỗi mã hóa base64",
    base64url: "chuỗi mã hóa base64url",
    json_string: "chuỗi JSON",
    e164: "số E.164",
    jwt: "JWT",
    template_literal: "đầu vào"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "số",
    array: "mảng"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Đầu vào không hợp lệ: mong đợi instanceof ${issue2.expected}, nhận được ${received}`;
        }
        return `Đầu vào không hợp lệ: mong đợi ${expected}, nhận được ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Đầu vào không hợp lệ: mong đợi ${stringifyPrimitive(issue2.values[0])}`;
        return `Tùy chọn không hợp lệ: mong đợi một trong các giá trị ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Quá lớn: mong đợi ${issue2.origin ?? "giá trị"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "phần tử"}`;
        return `Quá lớn: mong đợi ${issue2.origin ?? "giá trị"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `Quá nhỏ: mong đợi ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `Quá nhỏ: mong đợi ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Chuỗi không hợp lệ: phải bắt đầu bằng "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Chuỗi không hợp lệ: phải kết thúc bằng "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Chuỗi không hợp lệ: phải bao gồm "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Chuỗi không hợp lệ: phải khớp với mẫu ${_issue.pattern}`;
        return `${FormatDictionary[_issue.format] ?? issue2.format} không hợp lệ`;
      }
      case "not_multiple_of":
        return `Số không hợp lệ: phải là bội số của ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Khóa không được nhận dạng: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Khóa không hợp lệ trong ${issue2.origin}`;
      case "invalid_union":
        return "Đầu vào không hợp lệ";
      case "invalid_element":
        return `Giá trị không hợp lệ trong ${issue2.origin}`;
      default:
        return `Đầu vào không hợp lệ`;
    }
  };
};
function vi_default() {
  return {
    localeError: error44()
  };
}
// node_modules/zod/v4/locales/zh-CN.js
var error45 = () => {
  const Sizable = {
    string: { unit: "字符", verb: "包含" },
    file: { unit: "字节", verb: "包含" },
    array: { unit: "项", verb: "包含" },
    set: { unit: "项", verb: "包含" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "输入",
    email: "电子邮件",
    url: "URL",
    emoji: "表情符号",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO日期时间",
    date: "ISO日期",
    time: "ISO时间",
    duration: "ISO时长",
    ipv4: "IPv4地址",
    ipv6: "IPv6地址",
    cidrv4: "IPv4网段",
    cidrv6: "IPv6网段",
    base64: "base64编码字符串",
    base64url: "base64url编码字符串",
    json_string: "JSON字符串",
    e164: "E.164号码",
    jwt: "JWT",
    template_literal: "输入"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "数字",
    array: "数组",
    null: "空值(null)"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `无效输入：期望 instanceof ${issue2.expected}，实际接收 ${received}`;
        }
        return `无效输入：期望 ${expected}，实际接收 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `无效输入：期望 ${stringifyPrimitive(issue2.values[0])}`;
        return `无效选项：期望以下之一 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `数值过大：期望 ${issue2.origin ?? "值"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "个元素"}`;
        return `数值过大：期望 ${issue2.origin ?? "值"} ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `数值过小：期望 ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `数值过小：期望 ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `无效字符串：必须以 "${_issue.prefix}" 开头`;
        if (_issue.format === "ends_with")
          return `无效字符串：必须以 "${_issue.suffix}" 结尾`;
        if (_issue.format === "includes")
          return `无效字符串：必须包含 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `无效字符串：必须满足正则表达式 ${_issue.pattern}`;
        return `无效${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `无效数字：必须是 ${issue2.divisor} 的倍数`;
      case "unrecognized_keys":
        return `出现未知的键(key): ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `${issue2.origin} 中的键(key)无效`;
      case "invalid_union":
        return "无效输入";
      case "invalid_element":
        return `${issue2.origin} 中包含无效值(value)`;
      default:
        return `无效输入`;
    }
  };
};
function zh_CN_default() {
  return {
    localeError: error45()
  };
}
// node_modules/zod/v4/locales/zh-TW.js
var error46 = () => {
  const Sizable = {
    string: { unit: "字元", verb: "擁有" },
    file: { unit: "位元組", verb: "擁有" },
    array: { unit: "項目", verb: "擁有" },
    set: { unit: "項目", verb: "擁有" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "輸入",
    email: "郵件地址",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO 日期時間",
    date: "ISO 日期",
    time: "ISO 時間",
    duration: "ISO 期間",
    ipv4: "IPv4 位址",
    ipv6: "IPv6 位址",
    cidrv4: "IPv4 範圍",
    cidrv6: "IPv6 範圍",
    base64: "base64 編碼字串",
    base64url: "base64url 編碼字串",
    json_string: "JSON 字串",
    e164: "E.164 數值",
    jwt: "JWT",
    template_literal: "輸入"
  };
  const TypeDictionary = {
    nan: "NaN"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `無效的輸入值：預期為 instanceof ${issue2.expected}，但收到 ${received}`;
        }
        return `無效的輸入值：預期為 ${expected}，但收到 ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `無效的輸入值：預期為 ${stringifyPrimitive(issue2.values[0])}`;
        return `無效的選項：預期為以下其中之一 ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `數值過大：預期 ${issue2.origin ?? "值"} 應為 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "個元素"}`;
        return `數值過大：預期 ${issue2.origin ?? "值"} 應為 ${adj}${issue2.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing) {
          return `數值過小：預期 ${issue2.origin} 應為 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
        }
        return `數值過小：預期 ${issue2.origin} 應為 ${adj}${issue2.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with") {
          return `無效的字串：必須以 "${_issue.prefix}" 開頭`;
        }
        if (_issue.format === "ends_with")
          return `無效的字串：必須以 "${_issue.suffix}" 結尾`;
        if (_issue.format === "includes")
          return `無效的字串：必須包含 "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `無效的字串：必須符合格式 ${_issue.pattern}`;
        return `無效的 ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `無效的數字：必須為 ${issue2.divisor} 的倍數`;
      case "unrecognized_keys":
        return `無法識別的鍵值${issue2.keys.length > 1 ? "們" : ""}：${joinValues(issue2.keys, "、")}`;
      case "invalid_key":
        return `${issue2.origin} 中有無效的鍵值`;
      case "invalid_union":
        return "無效的輸入值";
      case "invalid_element":
        return `${issue2.origin} 中有無效的值`;
      default:
        return `無效的輸入值`;
    }
  };
};
function zh_TW_default() {
  return {
    localeError: error46()
  };
}
// node_modules/zod/v4/locales/yo.js
var error47 = () => {
  const Sizable = {
    string: { unit: "àmi", verb: "ní" },
    file: { unit: "bytes", verb: "ní" },
    array: { unit: "nkan", verb: "ní" },
    set: { unit: "nkan", verb: "ní" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "ẹ̀rọ ìbáwọlé",
    email: "àdírẹ́sì ìmẹ́lì",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "àkókò ISO",
    date: "ọjọ́ ISO",
    time: "àkókò ISO",
    duration: "àkókò tó pé ISO",
    ipv4: "àdírẹ́sì IPv4",
    ipv6: "àdírẹ́sì IPv6",
    cidrv4: "àgbègbè IPv4",
    cidrv6: "àgbègbè IPv6",
    base64: "ọ̀rọ̀ tí a kọ́ ní base64",
    base64url: "ọ̀rọ̀ base64url",
    json_string: "ọ̀rọ̀ JSON",
    e164: "nọ́mbà E.164",
    jwt: "JWT",
    template_literal: "ẹ̀rọ ìbáwọlé"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "nọ́mbà",
    array: "akopọ"
  };
  return (issue2) => {
    switch (issue2.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
        const receivedType = parsedType(issue2.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue2.expected)) {
          return `Ìbáwọlé aṣìṣe: a ní láti fi instanceof ${issue2.expected}, àmọ̀ a rí ${received}`;
        }
        return `Ìbáwọlé aṣìṣe: a ní láti fi ${expected}, àmọ̀ a rí ${received}`;
      }
      case "invalid_value":
        if (issue2.values.length === 1)
          return `Ìbáwọlé aṣìṣe: a ní láti fi ${stringifyPrimitive(issue2.values[0])}`;
        return `Àṣàyàn aṣìṣe: yan ọ̀kan lára ${joinValues(issue2.values, "|")}`;
      case "too_big": {
        const adj = issue2.inclusive ? "<=" : "<";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Tó pọ̀ jù: a ní láti jẹ́ pé ${issue2.origin ?? "iye"} ${sizing.verb} ${adj}${issue2.maximum} ${sizing.unit}`;
        return `Tó pọ̀ jù: a ní láti jẹ́ ${adj}${issue2.maximum}`;
      }
      case "too_small": {
        const adj = issue2.inclusive ? ">=" : ">";
        const sizing = getSizing(issue2.origin);
        if (sizing)
          return `Kéré ju: a ní láti jẹ́ pé ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum} ${sizing.unit}`;
        return `Kéré ju: a ní láti jẹ́ ${adj}${issue2.minimum}`;
      }
      case "invalid_format": {
        const _issue = issue2;
        if (_issue.format === "starts_with")
          return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bẹ̀rẹ̀ pẹ̀lú "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ parí pẹ̀lú "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ ní "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Ọ̀rọ̀ aṣìṣe: gbọ́dọ̀ bá àpẹẹrẹ mu ${_issue.pattern}`;
        return `Aṣìṣe: ${FormatDictionary[_issue.format] ?? issue2.format}`;
      }
      case "not_multiple_of":
        return `Nọ́mbà aṣìṣe: gbọ́dọ̀ jẹ́ èyà pípín ti ${issue2.divisor}`;
      case "unrecognized_keys":
        return `Bọtìnì àìmọ̀: ${joinValues(issue2.keys, ", ")}`;
      case "invalid_key":
        return `Bọtìnì aṣìṣe nínú ${issue2.origin}`;
      case "invalid_union":
        return "Ìbáwọlé aṣìṣe";
      case "invalid_element":
        return `Iye aṣìṣe nínú ${issue2.origin}`;
      default:
        return "Ìbáwọlé aṣìṣe";
    }
  };
};
function yo_default() {
  return {
    localeError: error47()
  };
}
// node_modules/zod/v4/core/registries.js
var _a;
var $output = Symbol("ZodOutput");
var $input = Symbol("ZodInput");

class $ZodRegistry {
  constructor() {
    this._map = new WeakMap;
    this._idmap = new Map;
  }
  add(schema, ..._meta) {
    const meta = _meta[0];
    this._map.set(schema, meta);
    if (meta && typeof meta === "object" && "id" in meta) {
      this._idmap.set(meta.id, schema);
    }
    return this;
  }
  clear() {
    this._map = new WeakMap;
    this._idmap = new Map;
    return this;
  }
  remove(schema) {
    const meta = this._map.get(schema);
    if (meta && typeof meta === "object" && "id" in meta) {
      this._idmap.delete(meta.id);
    }
    this._map.delete(schema);
    return this;
  }
  get(schema) {
    const p = schema._zod.parent;
    if (p) {
      const pm = { ...this.get(p) ?? {} };
      delete pm.id;
      const f = { ...pm, ...this._map.get(schema) };
      return Object.keys(f).length ? f : undefined;
    }
    return this._map.get(schema);
  }
  has(schema) {
    return this._map.has(schema);
  }
}
function registry() {
  return new $ZodRegistry;
}
(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
var globalRegistry = globalThis.__zod_globalRegistry;
// node_modules/zod/v4/core/api.js
function _string(Class2, params) {
  return new Class2({
    type: "string",
    ...normalizeParams(params)
  });
}
function _coercedString(Class2, params) {
  return new Class2({
    type: "string",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _email(Class2, params) {
  return new Class2({
    type: "string",
    format: "email",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _guid(Class2, params) {
  return new Class2({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuidv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v4",
    ...normalizeParams(params)
  });
}
function _uuidv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v6",
    ...normalizeParams(params)
  });
}
function _uuidv7(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v7",
    ...normalizeParams(params)
  });
}
function _url(Class2, params) {
  return new Class2({
    type: "string",
    format: "url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _emoji2(Class2, params) {
  return new Class2({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _nanoid(Class2, params) {
  return new Class2({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid2(Class2, params) {
  return new Class2({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ulid(Class2, params) {
  return new Class2({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _xid(Class2, params) {
  return new Class2({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ksuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _mac(Class2, params) {
  return new Class2({
    type: "string",
    format: "mac",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64(Class2, params) {
  return new Class2({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64url(Class2, params) {
  return new Class2({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _e164(Class2, params) {
  return new Class2({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _jwt(Class2, params) {
  return new Class2({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
var TimePrecision = {
  Any: null,
  Minute: -1,
  Second: 0,
  Millisecond: 3,
  Microsecond: 6
};
function _isoDateTime(Class2, params) {
  return new Class2({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: false,
    local: false,
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDate(Class2, params) {
  return new Class2({
    type: "string",
    format: "date",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _isoTime(Class2, params) {
  return new Class2({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDuration(Class2, params) {
  return new Class2({
    type: "string",
    format: "duration",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _number(Class2, params) {
  return new Class2({
    type: "number",
    checks: [],
    ...normalizeParams(params)
  });
}
function _coercedNumber(Class2, params) {
  return new Class2({
    type: "number",
    coerce: true,
    checks: [],
    ...normalizeParams(params)
  });
}
function _int(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "safeint",
    ...normalizeParams(params)
  });
}
function _float32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float32",
    ...normalizeParams(params)
  });
}
function _float64(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float64",
    ...normalizeParams(params)
  });
}
function _int32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "int32",
    ...normalizeParams(params)
  });
}
function _uint32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "uint32",
    ...normalizeParams(params)
  });
}
function _boolean(Class2, params) {
  return new Class2({
    type: "boolean",
    ...normalizeParams(params)
  });
}
function _coercedBoolean(Class2, params) {
  return new Class2({
    type: "boolean",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _bigint(Class2, params) {
  return new Class2({
    type: "bigint",
    ...normalizeParams(params)
  });
}
function _coercedBigint(Class2, params) {
  return new Class2({
    type: "bigint",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _int64(Class2, params) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "int64",
    ...normalizeParams(params)
  });
}
function _uint64(Class2, params) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "uint64",
    ...normalizeParams(params)
  });
}
function _symbol(Class2, params) {
  return new Class2({
    type: "symbol",
    ...normalizeParams(params)
  });
}
function _undefined2(Class2, params) {
  return new Class2({
    type: "undefined",
    ...normalizeParams(params)
  });
}
function _null2(Class2, params) {
  return new Class2({
    type: "null",
    ...normalizeParams(params)
  });
}
function _any(Class2) {
  return new Class2({
    type: "any"
  });
}
function _unknown(Class2) {
  return new Class2({
    type: "unknown"
  });
}
function _never(Class2, params) {
  return new Class2({
    type: "never",
    ...normalizeParams(params)
  });
}
function _void(Class2, params) {
  return new Class2({
    type: "void",
    ...normalizeParams(params)
  });
}
function _date(Class2, params) {
  return new Class2({
    type: "date",
    ...normalizeParams(params)
  });
}
function _coercedDate(Class2, params) {
  return new Class2({
    type: "date",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _nan(Class2, params) {
  return new Class2({
    type: "nan",
    ...normalizeParams(params)
  });
}
function _lt(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
function _lte(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _gt(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
function _gte(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _positive(params) {
  return _gt(0, params);
}
function _negative(params) {
  return _lt(0, params);
}
function _nonpositive(params) {
  return _lte(0, params);
}
function _nonnegative(params) {
  return _gte(0, params);
}
function _multipleOf(value, params) {
  return new $ZodCheckMultipleOf({
    check: "multiple_of",
    ...normalizeParams(params),
    value
  });
}
function _maxSize(maximum, params) {
  return new $ZodCheckMaxSize({
    check: "max_size",
    ...normalizeParams(params),
    maximum
  });
}
function _minSize(minimum, params) {
  return new $ZodCheckMinSize({
    check: "min_size",
    ...normalizeParams(params),
    minimum
  });
}
function _size(size, params) {
  return new $ZodCheckSizeEquals({
    check: "size_equals",
    ...normalizeParams(params),
    size
  });
}
function _maxLength(maximum, params) {
  const ch = new $ZodCheckMaxLength({
    check: "max_length",
    ...normalizeParams(params),
    maximum
  });
  return ch;
}
function _minLength(minimum, params) {
  return new $ZodCheckMinLength({
    check: "min_length",
    ...normalizeParams(params),
    minimum
  });
}
function _length(length, params) {
  return new $ZodCheckLengthEquals({
    check: "length_equals",
    ...normalizeParams(params),
    length
  });
}
function _regex(pattern, params) {
  return new $ZodCheckRegex({
    check: "string_format",
    format: "regex",
    ...normalizeParams(params),
    pattern
  });
}
function _lowercase(params) {
  return new $ZodCheckLowerCase({
    check: "string_format",
    format: "lowercase",
    ...normalizeParams(params)
  });
}
function _uppercase(params) {
  return new $ZodCheckUpperCase({
    check: "string_format",
    format: "uppercase",
    ...normalizeParams(params)
  });
}
function _includes(includes, params) {
  return new $ZodCheckIncludes({
    check: "string_format",
    format: "includes",
    ...normalizeParams(params),
    includes
  });
}
function _startsWith(prefix, params) {
  return new $ZodCheckStartsWith({
    check: "string_format",
    format: "starts_with",
    ...normalizeParams(params),
    prefix
  });
}
function _endsWith(suffix, params) {
  return new $ZodCheckEndsWith({
    check: "string_format",
    format: "ends_with",
    ...normalizeParams(params),
    suffix
  });
}
function _property(property, schema, params) {
  return new $ZodCheckProperty({
    check: "property",
    property,
    schema,
    ...normalizeParams(params)
  });
}
function _mime(types, params) {
  return new $ZodCheckMimeType({
    check: "mime_type",
    mime: types,
    ...normalizeParams(params)
  });
}
function _overwrite(tx) {
  return new $ZodCheckOverwrite({
    check: "overwrite",
    tx
  });
}
function _normalize(form) {
  return _overwrite((input) => input.normalize(form));
}
function _trim() {
  return _overwrite((input) => input.trim());
}
function _toLowerCase() {
  return _overwrite((input) => input.toLowerCase());
}
function _toUpperCase() {
  return _overwrite((input) => input.toUpperCase());
}
function _slugify() {
  return _overwrite((input) => slugify(input));
}
function _array(Class2, element, params) {
  return new Class2({
    type: "array",
    element,
    ...normalizeParams(params)
  });
}
function _union(Class2, options, params) {
  return new Class2({
    type: "union",
    options,
    ...normalizeParams(params)
  });
}
function _xor(Class2, options, params) {
  return new Class2({
    type: "union",
    options,
    inclusive: false,
    ...normalizeParams(params)
  });
}
function _discriminatedUnion(Class2, discriminator, options, params) {
  return new Class2({
    type: "union",
    options,
    discriminator,
    ...normalizeParams(params)
  });
}
function _intersection(Class2, left, right) {
  return new Class2({
    type: "intersection",
    left,
    right
  });
}
function _tuple(Class2, items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new Class2({
    type: "tuple",
    items,
    rest,
    ...normalizeParams(params)
  });
}
function _record(Class2, keyType, valueType, params) {
  return new Class2({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
function _map(Class2, keyType, valueType, params) {
  return new Class2({
    type: "map",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
function _set(Class2, valueType, params) {
  return new Class2({
    type: "set",
    valueType,
    ...normalizeParams(params)
  });
}
function _enum(Class2, values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new Class2({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
function _nativeEnum(Class2, entries, params) {
  return new Class2({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
function _literal(Class2, value, params) {
  return new Class2({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...normalizeParams(params)
  });
}
function _file(Class2, params) {
  return new Class2({
    type: "file",
    ...normalizeParams(params)
  });
}
function _transform(Class2, fn) {
  return new Class2({
    type: "transform",
    transform: fn
  });
}
function _optional(Class2, innerType) {
  return new Class2({
    type: "optional",
    innerType
  });
}
function _nullable(Class2, innerType) {
  return new Class2({
    type: "nullable",
    innerType
  });
}
function _default(Class2, innerType, defaultValue) {
  return new Class2({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
function _nonoptional(Class2, innerType, params) {
  return new Class2({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params)
  });
}
function _success(Class2, innerType) {
  return new Class2({
    type: "success",
    innerType
  });
}
function _catch(Class2, innerType, catchValue) {
  return new Class2({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
  });
}
function _pipe(Class2, in_, out) {
  return new Class2({
    type: "pipe",
    in: in_,
    out
  });
}
function _readonly(Class2, innerType) {
  return new Class2({
    type: "readonly",
    innerType
  });
}
function _templateLiteral(Class2, parts, params) {
  return new Class2({
    type: "template_literal",
    parts,
    ...normalizeParams(params)
  });
}
function _lazy(Class2, getter) {
  return new Class2({
    type: "lazy",
    getter
  });
}
function _promise(Class2, innerType) {
  return new Class2({
    type: "promise",
    innerType
  });
}
function _custom(Class2, fn, _params) {
  const norm = normalizeParams(_params);
  norm.abort ?? (norm.abort = true);
  const schema = new Class2({
    type: "custom",
    check: "custom",
    fn,
    ...norm
  });
  return schema;
}
function _refine(Class2, fn, _params) {
  const schema = new Class2({
    type: "custom",
    check: "custom",
    fn,
    ...normalizeParams(_params)
  });
  return schema;
}
function _superRefine(fn) {
  const ch = _check((payload) => {
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(issue(issue2, payload.value, ch._zod.def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = ch);
        _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
        payload.issues.push(issue(_issue));
      }
    };
    return fn(payload.value, payload);
  });
  return ch;
}
function _check(fn, params) {
  const ch = new $ZodCheck({
    check: "custom",
    ...normalizeParams(params)
  });
  ch._zod.check = fn;
  return ch;
}
function describe(description) {
  const ch = new $ZodCheck({ check: "describe" });
  ch._zod.onattach = [
    (inst) => {
      const existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, description });
    }
  ];
  ch._zod.check = () => {};
  return ch;
}
function meta(metadata) {
  const ch = new $ZodCheck({ check: "meta" });
  ch._zod.onattach = [
    (inst) => {
      const existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, ...metadata });
    }
  ];
  ch._zod.check = () => {};
  return ch;
}
function _stringbool(Classes, _params) {
  const params = normalizeParams(_params);
  let truthyArray = params.truthy ?? ["true", "1", "yes", "on", "y", "enabled"];
  let falsyArray = params.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
  if (params.case !== "sensitive") {
    truthyArray = truthyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
    falsyArray = falsyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
  }
  const truthySet = new Set(truthyArray);
  const falsySet = new Set(falsyArray);
  const _Codec = Classes.Codec ?? $ZodCodec;
  const _Boolean = Classes.Boolean ?? $ZodBoolean;
  const _String = Classes.String ?? $ZodString;
  const stringSchema = new _String({ type: "string", error: params.error });
  const booleanSchema = new _Boolean({ type: "boolean", error: params.error });
  const codec = new _Codec({
    type: "pipe",
    in: stringSchema,
    out: booleanSchema,
    transform: (input, payload) => {
      let data = input;
      if (params.case !== "sensitive")
        data = data.toLowerCase();
      if (truthySet.has(data)) {
        return true;
      } else if (falsySet.has(data)) {
        return false;
      } else {
        payload.issues.push({
          code: "invalid_value",
          expected: "stringbool",
          values: [...truthySet, ...falsySet],
          input: payload.value,
          inst: codec,
          continue: false
        });
        return {};
      }
    },
    reverseTransform: (input, _payload) => {
      if (input === true) {
        return truthyArray[0] || "true";
      } else {
        return falsyArray[0] || "false";
      }
    },
    error: params.error
  });
  return codec;
}
function _stringFormat(Class2, format, fnOrRegex, _params = {}) {
  const params = normalizeParams(_params);
  const def = {
    ...normalizeParams(_params),
    check: "string_format",
    type: "string",
    format,
    fn: typeof fnOrRegex === "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
    ...params
  };
  if (fnOrRegex instanceof RegExp) {
    def.pattern = fnOrRegex;
  }
  const inst = new Class2(def);
  return inst;
}
// node_modules/zod/v4/core/to-json-schema.js
function initializeContext(params) {
  let target = params?.target ?? "draft-2020-12";
  if (target === "draft-4")
    target = "draft-04";
  if (target === "draft-7")
    target = "draft-07";
  return {
    processors: params.processors ?? {},
    metadataRegistry: params?.metadata ?? globalRegistry,
    target,
    unrepresentable: params?.unrepresentable ?? "throw",
    override: params?.override ?? (() => {}),
    io: params?.io ?? "output",
    counter: 0,
    seen: new Map,
    cycles: params?.cycles ?? "ref",
    reused: params?.reused ?? "inline",
    external: params?.external ?? undefined
  };
}
function process(schema, ctx, _params = { path: [], schemaPath: [] }) {
  var _a2;
  const def = schema._zod.def;
  const seen = ctx.seen.get(schema);
  if (seen) {
    seen.count++;
    const isCycle = _params.schemaPath.includes(schema);
    if (isCycle) {
      seen.cycle = _params.path;
    }
    return seen.schema;
  }
  const result = { schema: {}, count: 1, cycle: undefined, path: _params.path };
  ctx.seen.set(schema, result);
  const overrideSchema = schema._zod.toJSONSchema?.();
  if (overrideSchema) {
    result.schema = overrideSchema;
  } else {
    const params = {
      ..._params,
      schemaPath: [..._params.schemaPath, schema],
      path: _params.path
    };
    if (schema._zod.processJSONSchema) {
      schema._zod.processJSONSchema(ctx, result.schema, params);
    } else {
      const _json = result.schema;
      const processor = ctx.processors[def.type];
      if (!processor) {
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
      }
      processor(schema, ctx, _json, params);
    }
    const parent = schema._zod.parent;
    if (parent) {
      if (!result.ref)
        result.ref = parent;
      process(parent, ctx, params);
      ctx.seen.get(parent).isParent = true;
    }
  }
  const meta2 = ctx.metadataRegistry.get(schema);
  if (meta2)
    Object.assign(result.schema, meta2);
  if (ctx.io === "input" && isTransforming(schema)) {
    delete result.schema.examples;
    delete result.schema.default;
  }
  if (ctx.io === "input" && result.schema._prefault)
    (_a2 = result.schema).default ?? (_a2.default = result.schema._prefault);
  delete result.schema._prefault;
  const _result = ctx.seen.get(schema);
  return _result.schema;
}
function extractDefs(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const idToSchema = new Map;
  for (const entry of ctx.seen.entries()) {
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      const existing = idToSchema.get(id);
      if (existing && existing !== entry[0]) {
        throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      }
      idToSchema.set(id, entry[0]);
    }
  }
  const makeURI = (entry) => {
    const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
    if (ctx.external) {
      const externalId = ctx.external.registry.get(entry[0])?.id;
      const uriGenerator = ctx.external.uri ?? ((id2) => id2);
      if (externalId) {
        return { ref: uriGenerator(externalId) };
      }
      const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
      entry[1].defId = id;
      return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}` };
    }
    if (entry[1] === root) {
      return { ref: "#" };
    }
    const uriPrefix = `#`;
    const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
    const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
    return { defId, ref: defUriPrefix + defId };
  };
  const extractToDef = (entry) => {
    if (entry[1].schema.$ref) {
      return;
    }
    const seen = entry[1];
    const { ref, defId } = makeURI(entry);
    seen.def = { ...seen.schema };
    if (defId)
      seen.defId = defId;
    const schema2 = seen.schema;
    for (const key in schema2) {
      delete schema2[key];
    }
    schema2.$ref = ref;
  };
  if (ctx.cycles === "throw") {
    for (const entry of ctx.seen.entries()) {
      const seen = entry[1];
      if (seen.cycle) {
        throw new Error("Cycle detected: " + `#/${seen.cycle?.join("/")}/<root>` + '\n\nSet the `cycles` parameter to `"ref"` to resolve cyclical schemas with defs.');
      }
    }
  }
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (schema === entry[0]) {
      extractToDef(entry);
      continue;
    }
    if (ctx.external) {
      const ext = ctx.external.registry.get(entry[0])?.id;
      if (schema !== entry[0] && ext) {
        extractToDef(entry);
        continue;
      }
    }
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      extractToDef(entry);
      continue;
    }
    if (seen.cycle) {
      extractToDef(entry);
      continue;
    }
    if (seen.count > 1) {
      if (ctx.reused === "ref") {
        extractToDef(entry);
        continue;
      }
    }
  }
}
function finalize(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const flattenRef = (zodSchema) => {
    const seen = ctx.seen.get(zodSchema);
    if (seen.ref === null)
      return;
    const schema2 = seen.def ?? seen.schema;
    const _cached = { ...schema2 };
    const ref = seen.ref;
    seen.ref = null;
    if (ref) {
      flattenRef(ref);
      const refSeen = ctx.seen.get(ref);
      const refSchema = refSeen.schema;
      if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
        schema2.allOf = schema2.allOf ?? [];
        schema2.allOf.push(refSchema);
      } else {
        Object.assign(schema2, refSchema);
      }
      Object.assign(schema2, _cached);
      const isParentRef = zodSchema._zod.parent === ref;
      if (isParentRef) {
        for (const key in schema2) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (!(key in _cached)) {
            delete schema2[key];
          }
        }
      }
      if (refSchema.$ref && refSeen.def) {
        for (const key in schema2) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (key in refSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(refSeen.def[key])) {
            delete schema2[key];
          }
        }
      }
    }
    const parent = zodSchema._zod.parent;
    if (parent && parent !== ref) {
      flattenRef(parent);
      const parentSeen = ctx.seen.get(parent);
      if (parentSeen?.schema.$ref) {
        schema2.$ref = parentSeen.schema.$ref;
        if (parentSeen.def) {
          for (const key in schema2) {
            if (key === "$ref" || key === "allOf")
              continue;
            if (key in parentSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(parentSeen.def[key])) {
              delete schema2[key];
            }
          }
        }
      }
    }
    ctx.override({
      zodSchema,
      jsonSchema: schema2,
      path: seen.path ?? []
    });
  };
  for (const entry of [...ctx.seen.entries()].reverse()) {
    flattenRef(entry[0]);
  }
  const result = {};
  if (ctx.target === "draft-2020-12") {
    result.$schema = "https://json-schema.org/draft/2020-12/schema";
  } else if (ctx.target === "draft-07") {
    result.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (ctx.target === "draft-04") {
    result.$schema = "http://json-schema.org/draft-04/schema#";
  } else if (ctx.target === "openapi-3.0") {} else {}
  if (ctx.external?.uri) {
    const id = ctx.external.registry.get(schema)?.id;
    if (!id)
      throw new Error("Schema is missing an `id` property");
    result.$id = ctx.external.uri(id);
  }
  Object.assign(result, root.def ?? root.schema);
  const defs = ctx.external?.defs ?? {};
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (seen.def && seen.defId) {
      defs[seen.defId] = seen.def;
    }
  }
  if (ctx.external) {} else {
    if (Object.keys(defs).length > 0) {
      if (ctx.target === "draft-2020-12") {
        result.$defs = defs;
      } else {
        result.definitions = defs;
      }
    }
  }
  try {
    const finalized = JSON.parse(JSON.stringify(result));
    Object.defineProperty(finalized, "~standard", {
      value: {
        ...schema["~standard"],
        jsonSchema: {
          input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
          output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
        }
      },
      enumerable: false,
      writable: false
    });
    return finalized;
  } catch (_err) {
    throw new Error("Error converting schema to JSON.");
  }
}
function isTransforming(_schema, _ctx) {
  const ctx = _ctx ?? { seen: new Set };
  if (ctx.seen.has(_schema))
    return false;
  ctx.seen.add(_schema);
  const def = _schema._zod.def;
  if (def.type === "transform")
    return true;
  if (def.type === "array")
    return isTransforming(def.element, ctx);
  if (def.type === "set")
    return isTransforming(def.valueType, ctx);
  if (def.type === "lazy")
    return isTransforming(def.getter(), ctx);
  if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") {
    return isTransforming(def.innerType, ctx);
  }
  if (def.type === "intersection") {
    return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
  }
  if (def.type === "record" || def.type === "map") {
    return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
  }
  if (def.type === "pipe") {
    return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
  }
  if (def.type === "object") {
    for (const key in def.shape) {
      if (isTransforming(def.shape[key], ctx))
        return true;
    }
    return false;
  }
  if (def.type === "union") {
    for (const option of def.options) {
      if (isTransforming(option, ctx))
        return true;
    }
    return false;
  }
  if (def.type === "tuple") {
    for (const item of def.items) {
      if (isTransforming(item, ctx))
        return true;
    }
    if (def.rest && isTransforming(def.rest, ctx))
      return true;
    return false;
  }
  return false;
}
var createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
  const ctx = initializeContext({ ...params, processors });
  process(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};
var createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
  const { libraryOptions, target } = params ?? {};
  const ctx = initializeContext({ ...libraryOptions ?? {}, target, io, processors });
  process(schema, ctx);
  extractDefs(ctx, schema);
  return finalize(ctx, schema);
};
// node_modules/zod/v4/core/json-schema-processors.js
var formatMap = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
};
var stringProcessor = (schema, ctx, _json, _params) => {
  const json = _json;
  json.type = "string";
  const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
  if (typeof minimum === "number")
    json.minLength = minimum;
  if (typeof maximum === "number")
    json.maxLength = maximum;
  if (format) {
    json.format = formatMap[format] ?? format;
    if (json.format === "")
      delete json.format;
    if (format === "time") {
      delete json.format;
    }
  }
  if (contentEncoding)
    json.contentEncoding = contentEncoding;
  if (patterns && patterns.size > 0) {
    const regexes = [...patterns];
    if (regexes.length === 1)
      json.pattern = regexes[0].source;
    else if (regexes.length > 1) {
      json.allOf = [
        ...regexes.map((regex) => ({
          ...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
          pattern: regex.source
        }))
      ];
    }
  }
};
var numberProcessor = (schema, ctx, _json, _params) => {
  const json = _json;
  const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
  if (typeof format === "string" && format.includes("int"))
    json.type = "integer";
  else
    json.type = "number";
  if (typeof exclusiveMinimum === "number") {
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json.minimum = exclusiveMinimum;
      json.exclusiveMinimum = true;
    } else {
      json.exclusiveMinimum = exclusiveMinimum;
    }
  }
  if (typeof minimum === "number") {
    json.minimum = minimum;
    if (typeof exclusiveMinimum === "number" && ctx.target !== "draft-04") {
      if (exclusiveMinimum >= minimum)
        delete json.minimum;
      else
        delete json.exclusiveMinimum;
    }
  }
  if (typeof exclusiveMaximum === "number") {
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json.maximum = exclusiveMaximum;
      json.exclusiveMaximum = true;
    } else {
      json.exclusiveMaximum = exclusiveMaximum;
    }
  }
  if (typeof maximum === "number") {
    json.maximum = maximum;
    if (typeof exclusiveMaximum === "number" && ctx.target !== "draft-04") {
      if (exclusiveMaximum <= maximum)
        delete json.maximum;
      else
        delete json.exclusiveMaximum;
    }
  }
  if (typeof multipleOf === "number")
    json.multipleOf = multipleOf;
};
var booleanProcessor = (_schema, _ctx, json, _params) => {
  json.type = "boolean";
};
var bigintProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("BigInt cannot be represented in JSON Schema");
  }
};
var symbolProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Symbols cannot be represented in JSON Schema");
  }
};
var nullProcessor = (_schema, ctx, json, _params) => {
  if (ctx.target === "openapi-3.0") {
    json.type = "string";
    json.nullable = true;
    json.enum = [null];
  } else {
    json.type = "null";
  }
};
var undefinedProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Undefined cannot be represented in JSON Schema");
  }
};
var voidProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Void cannot be represented in JSON Schema");
  }
};
var neverProcessor = (_schema, _ctx, json, _params) => {
  json.not = {};
};
var anyProcessor = (_schema, _ctx, _json, _params) => {};
var unknownProcessor = (_schema, _ctx, _json, _params) => {};
var dateProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Date cannot be represented in JSON Schema");
  }
};
var enumProcessor = (schema, _ctx, json, _params) => {
  const def = schema._zod.def;
  const values = getEnumValues(def.entries);
  if (values.every((v) => typeof v === "number"))
    json.type = "number";
  if (values.every((v) => typeof v === "string"))
    json.type = "string";
  json.enum = values;
};
var literalProcessor = (schema, ctx, json, _params) => {
  const def = schema._zod.def;
  const vals = [];
  for (const val of def.values) {
    if (val === undefined) {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
      } else {}
    } else if (typeof val === "bigint") {
      if (ctx.unrepresentable === "throw") {
        throw new Error("BigInt literals cannot be represented in JSON Schema");
      } else {
        vals.push(Number(val));
      }
    } else {
      vals.push(val);
    }
  }
  if (vals.length === 0) {} else if (vals.length === 1) {
    const val = vals[0];
    json.type = val === null ? "null" : typeof val;
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json.enum = [val];
    } else {
      json.const = val;
    }
  } else {
    if (vals.every((v) => typeof v === "number"))
      json.type = "number";
    if (vals.every((v) => typeof v === "string"))
      json.type = "string";
    if (vals.every((v) => typeof v === "boolean"))
      json.type = "boolean";
    if (vals.every((v) => v === null))
      json.type = "null";
    json.enum = vals;
  }
};
var nanProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("NaN cannot be represented in JSON Schema");
  }
};
var templateLiteralProcessor = (schema, _ctx, json, _params) => {
  const _json = json;
  const pattern = schema._zod.pattern;
  if (!pattern)
    throw new Error("Pattern not found in template literal");
  _json.type = "string";
  _json.pattern = pattern.source;
};
var fileProcessor = (schema, _ctx, json, _params) => {
  const _json = json;
  const file = {
    type: "string",
    format: "binary",
    contentEncoding: "binary"
  };
  const { minimum, maximum, mime } = schema._zod.bag;
  if (minimum !== undefined)
    file.minLength = minimum;
  if (maximum !== undefined)
    file.maxLength = maximum;
  if (mime) {
    if (mime.length === 1) {
      file.contentMediaType = mime[0];
      Object.assign(_json, file);
    } else {
      Object.assign(_json, file);
      _json.anyOf = mime.map((m) => ({ contentMediaType: m }));
    }
  } else {
    Object.assign(_json, file);
  }
};
var successProcessor = (_schema, _ctx, json, _params) => {
  json.type = "boolean";
};
var customProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Custom types cannot be represented in JSON Schema");
  }
};
var functionProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Function types cannot be represented in JSON Schema");
  }
};
var transformProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Transforms cannot be represented in JSON Schema");
  }
};
var mapProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Map cannot be represented in JSON Schema");
  }
};
var setProcessor = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Set cannot be represented in JSON Schema");
  }
};
var arrayProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  const { minimum, maximum } = schema._zod.bag;
  if (typeof minimum === "number")
    json.minItems = minimum;
  if (typeof maximum === "number")
    json.maxItems = maximum;
  json.type = "array";
  json.items = process(def.element, ctx, { ...params, path: [...params.path, "items"] });
};
var objectProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  json.type = "object";
  json.properties = {};
  const shape = def.shape;
  for (const key in shape) {
    json.properties[key] = process(shape[key], ctx, {
      ...params,
      path: [...params.path, "properties", key]
    });
  }
  const allKeys = new Set(Object.keys(shape));
  const requiredKeys = new Set([...allKeys].filter((key) => {
    const v = def.shape[key]._zod;
    if (ctx.io === "input") {
      return v.optin === undefined;
    } else {
      return v.optout === undefined;
    }
  }));
  if (requiredKeys.size > 0) {
    json.required = Array.from(requiredKeys);
  }
  if (def.catchall?._zod.def.type === "never") {
    json.additionalProperties = false;
  } else if (!def.catchall) {
    if (ctx.io === "output")
      json.additionalProperties = false;
  } else if (def.catchall) {
    json.additionalProperties = process(def.catchall, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
};
var unionProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const isExclusive = def.inclusive === false;
  const options = def.options.map((x, i) => process(x, ctx, {
    ...params,
    path: [...params.path, isExclusive ? "oneOf" : "anyOf", i]
  }));
  if (isExclusive) {
    json.oneOf = options;
  } else {
    json.anyOf = options;
  }
};
var intersectionProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const a = process(def.left, ctx, {
    ...params,
    path: [...params.path, "allOf", 0]
  });
  const b = process(def.right, ctx, {
    ...params,
    path: [...params.path, "allOf", 1]
  });
  const isSimpleIntersection = (val) => ("allOf" in val) && Object.keys(val).length === 1;
  const allOf = [
    ...isSimpleIntersection(a) ? a.allOf : [a],
    ...isSimpleIntersection(b) ? b.allOf : [b]
  ];
  json.allOf = allOf;
};
var tupleProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  json.type = "array";
  const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
  const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
  const prefixItems = def.items.map((x, i) => process(x, ctx, {
    ...params,
    path: [...params.path, prefixPath, i]
  }));
  const rest = def.rest ? process(def.rest, ctx, {
    ...params,
    path: [...params.path, restPath, ...ctx.target === "openapi-3.0" ? [def.items.length] : []]
  }) : null;
  if (ctx.target === "draft-2020-12") {
    json.prefixItems = prefixItems;
    if (rest) {
      json.items = rest;
    }
  } else if (ctx.target === "openapi-3.0") {
    json.items = {
      anyOf: prefixItems
    };
    if (rest) {
      json.items.anyOf.push(rest);
    }
    json.minItems = prefixItems.length;
    if (!rest) {
      json.maxItems = prefixItems.length;
    }
  } else {
    json.items = prefixItems;
    if (rest) {
      json.additionalItems = rest;
    }
  }
  const { minimum, maximum } = schema._zod.bag;
  if (typeof minimum === "number")
    json.minItems = minimum;
  if (typeof maximum === "number")
    json.maxItems = maximum;
};
var recordProcessor = (schema, ctx, _json, params) => {
  const json = _json;
  const def = schema._zod.def;
  json.type = "object";
  const keyType = def.keyType;
  const keyBag = keyType._zod.bag;
  const patterns = keyBag?.patterns;
  if (def.mode === "loose" && patterns && patterns.size > 0) {
    const valueSchema = process(def.valueType, ctx, {
      ...params,
      path: [...params.path, "patternProperties", "*"]
    });
    json.patternProperties = {};
    for (const pattern of patterns) {
      json.patternProperties[pattern.source] = valueSchema;
    }
  } else {
    if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
      json.propertyNames = process(def.keyType, ctx, {
        ...params,
        path: [...params.path, "propertyNames"]
      });
    }
    json.additionalProperties = process(def.valueType, ctx, {
      ...params,
      path: [...params.path, "additionalProperties"]
    });
  }
  const keyValues = keyType._zod.values;
  if (keyValues) {
    const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
    if (validKeyValues.length > 0) {
      json.required = validKeyValues;
    }
  }
};
var nullableProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  const inner = process(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  if (ctx.target === "openapi-3.0") {
    seen.ref = def.innerType;
    json.nullable = true;
  } else {
    json.anyOf = [inner, { type: "null" }];
  }
};
var nonoptionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var defaultProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  process(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  json.default = JSON.parse(JSON.stringify(def.defaultValue));
};
var prefaultProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  process(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  if (ctx.io === "input")
    json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
};
var catchProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  process(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  let catchValue;
  try {
    catchValue = def.catchValue(undefined);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  json.default = catchValue;
};
var pipeProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  const innerType = ctx.io === "input" ? def.in._zod.def.type === "transform" ? def.out : def.in : def.out;
  process(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var readonlyProcessor = (schema, ctx, json, params) => {
  const def = schema._zod.def;
  process(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
  json.readOnly = true;
};
var promiseProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var optionalProcessor = (schema, ctx, _json, params) => {
  const def = schema._zod.def;
  process(def.innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = def.innerType;
};
var lazyProcessor = (schema, ctx, _json, params) => {
  const innerType = schema._zod.innerType;
  process(innerType, ctx, params);
  const seen = ctx.seen.get(schema);
  seen.ref = innerType;
};
var allProcessors = {
  string: stringProcessor,
  number: numberProcessor,
  boolean: booleanProcessor,
  bigint: bigintProcessor,
  symbol: symbolProcessor,
  null: nullProcessor,
  undefined: undefinedProcessor,
  void: voidProcessor,
  never: neverProcessor,
  any: anyProcessor,
  unknown: unknownProcessor,
  date: dateProcessor,
  enum: enumProcessor,
  literal: literalProcessor,
  nan: nanProcessor,
  template_literal: templateLiteralProcessor,
  file: fileProcessor,
  success: successProcessor,
  custom: customProcessor,
  function: functionProcessor,
  transform: transformProcessor,
  map: mapProcessor,
  set: setProcessor,
  array: arrayProcessor,
  object: objectProcessor,
  union: unionProcessor,
  intersection: intersectionProcessor,
  tuple: tupleProcessor,
  record: recordProcessor,
  nullable: nullableProcessor,
  nonoptional: nonoptionalProcessor,
  default: defaultProcessor,
  prefault: prefaultProcessor,
  catch: catchProcessor,
  pipe: pipeProcessor,
  readonly: readonlyProcessor,
  promise: promiseProcessor,
  optional: optionalProcessor,
  lazy: lazyProcessor
};
function toJSONSchema(input, params) {
  if ("_idmap" in input) {
    const registry2 = input;
    const ctx2 = initializeContext({ ...params, processors: allProcessors });
    const defs = {};
    for (const entry of registry2._idmap.entries()) {
      const [_, schema] = entry;
      process(schema, ctx2);
    }
    const schemas = {};
    const external = {
      registry: registry2,
      uri: params?.uri,
      defs
    };
    ctx2.external = external;
    for (const entry of registry2._idmap.entries()) {
      const [key, schema] = entry;
      extractDefs(ctx2, schema);
      schemas[key] = finalize(ctx2, schema);
    }
    if (Object.keys(defs).length > 0) {
      const defsSegment = ctx2.target === "draft-2020-12" ? "$defs" : "definitions";
      schemas.__shared = {
        [defsSegment]: defs
      };
    }
    return { schemas };
  }
  const ctx = initializeContext({ ...params, processors: allProcessors });
  process(input, ctx);
  extractDefs(ctx, input);
  return finalize(ctx, input);
}
// node_modules/zod/v4/core/json-schema-generator.js
class JSONSchemaGenerator {
  get metadataRegistry() {
    return this.ctx.metadataRegistry;
  }
  get target() {
    return this.ctx.target;
  }
  get unrepresentable() {
    return this.ctx.unrepresentable;
  }
  get override() {
    return this.ctx.override;
  }
  get io() {
    return this.ctx.io;
  }
  get counter() {
    return this.ctx.counter;
  }
  set counter(value) {
    this.ctx.counter = value;
  }
  get seen() {
    return this.ctx.seen;
  }
  constructor(params) {
    let normalizedTarget = params?.target ?? "draft-2020-12";
    if (normalizedTarget === "draft-4")
      normalizedTarget = "draft-04";
    if (normalizedTarget === "draft-7")
      normalizedTarget = "draft-07";
    this.ctx = initializeContext({
      processors: allProcessors,
      target: normalizedTarget,
      ...params?.metadata && { metadata: params.metadata },
      ...params?.unrepresentable && { unrepresentable: params.unrepresentable },
      ...params?.override && { override: params.override },
      ...params?.io && { io: params.io }
    });
  }
  process(schema, _params = { path: [], schemaPath: [] }) {
    return process(schema, this.ctx, _params);
  }
  emit(schema, _params) {
    if (_params) {
      if (_params.cycles)
        this.ctx.cycles = _params.cycles;
      if (_params.reused)
        this.ctx.reused = _params.reused;
      if (_params.external)
        this.ctx.external = _params.external;
    }
    extractDefs(this.ctx, schema);
    const result = finalize(this.ctx, schema);
    const { "~standard": _, ...plainResult } = result;
    return plainResult;
  }
}
// node_modules/zod/v4/core/json-schema.js
var exports_json_schema = {};
// node_modules/zod/v4/classic/schemas.js
var exports_schemas2 = {};
__export(exports_schemas2, {
  xor: () => xor,
  xid: () => xid2,
  void: () => _void2,
  uuidv7: () => uuidv7,
  uuidv6: () => uuidv6,
  uuidv4: () => uuidv4,
  uuid: () => uuid2,
  url: () => url,
  unknown: () => unknown,
  union: () => union,
  undefined: () => _undefined3,
  ulid: () => ulid2,
  uint64: () => uint64,
  uint32: () => uint32,
  tuple: () => tuple,
  transform: () => transform,
  templateLiteral: () => templateLiteral,
  symbol: () => symbol,
  superRefine: () => superRefine,
  success: () => success,
  stringbool: () => stringbool,
  stringFormat: () => stringFormat,
  string: () => string2,
  strictObject: () => strictObject,
  set: () => set,
  refine: () => refine,
  record: () => record,
  readonly: () => readonly,
  promise: () => promise,
  preprocess: () => preprocess,
  prefault: () => prefault,
  pipe: () => pipe,
  partialRecord: () => partialRecord,
  optional: () => optional,
  object: () => object,
  number: () => number2,
  nullish: () => nullish2,
  nullable: () => nullable,
  null: () => _null3,
  nonoptional: () => nonoptional,
  never: () => never,
  nativeEnum: () => nativeEnum,
  nanoid: () => nanoid2,
  nan: () => nan,
  meta: () => meta2,
  map: () => map,
  mac: () => mac2,
  looseRecord: () => looseRecord,
  looseObject: () => looseObject,
  literal: () => literal,
  lazy: () => lazy,
  ksuid: () => ksuid2,
  keyof: () => keyof,
  jwt: () => jwt,
  json: () => json,
  ipv6: () => ipv62,
  ipv4: () => ipv42,
  intersection: () => intersection,
  int64: () => int64,
  int32: () => int32,
  int: () => int,
  instanceof: () => _instanceof,
  httpUrl: () => httpUrl,
  hostname: () => hostname2,
  hex: () => hex2,
  hash: () => hash,
  guid: () => guid2,
  function: () => _function,
  float64: () => float64,
  float32: () => float32,
  file: () => file,
  exactOptional: () => exactOptional,
  enum: () => _enum2,
  emoji: () => emoji2,
  email: () => email2,
  e164: () => e1642,
  discriminatedUnion: () => discriminatedUnion,
  describe: () => describe2,
  date: () => date3,
  custom: () => custom,
  cuid2: () => cuid22,
  cuid: () => cuid3,
  codec: () => codec,
  cidrv6: () => cidrv62,
  cidrv4: () => cidrv42,
  check: () => check,
  catch: () => _catch2,
  boolean: () => boolean2,
  bigint: () => bigint2,
  base64url: () => base64url2,
  base64: () => base642,
  array: () => array,
  any: () => any,
  _function: () => _function,
  _default: () => _default2,
  _ZodString: () => _ZodString,
  ZodXor: () => ZodXor,
  ZodXID: () => ZodXID,
  ZodVoid: () => ZodVoid,
  ZodUnknown: () => ZodUnknown,
  ZodUnion: () => ZodUnion,
  ZodUndefined: () => ZodUndefined,
  ZodUUID: () => ZodUUID,
  ZodURL: () => ZodURL,
  ZodULID: () => ZodULID,
  ZodType: () => ZodType,
  ZodTuple: () => ZodTuple,
  ZodTransform: () => ZodTransform,
  ZodTemplateLiteral: () => ZodTemplateLiteral,
  ZodSymbol: () => ZodSymbol,
  ZodSuccess: () => ZodSuccess,
  ZodStringFormat: () => ZodStringFormat,
  ZodString: () => ZodString,
  ZodSet: () => ZodSet,
  ZodRecord: () => ZodRecord,
  ZodReadonly: () => ZodReadonly,
  ZodPromise: () => ZodPromise,
  ZodPrefault: () => ZodPrefault,
  ZodPipe: () => ZodPipe,
  ZodOptional: () => ZodOptional,
  ZodObject: () => ZodObject,
  ZodNumberFormat: () => ZodNumberFormat,
  ZodNumber: () => ZodNumber,
  ZodNullable: () => ZodNullable,
  ZodNull: () => ZodNull,
  ZodNonOptional: () => ZodNonOptional,
  ZodNever: () => ZodNever,
  ZodNanoID: () => ZodNanoID,
  ZodNaN: () => ZodNaN,
  ZodMap: () => ZodMap,
  ZodMAC: () => ZodMAC,
  ZodLiteral: () => ZodLiteral,
  ZodLazy: () => ZodLazy,
  ZodKSUID: () => ZodKSUID,
  ZodJWT: () => ZodJWT,
  ZodIntersection: () => ZodIntersection,
  ZodIPv6: () => ZodIPv6,
  ZodIPv4: () => ZodIPv4,
  ZodGUID: () => ZodGUID,
  ZodFunction: () => ZodFunction,
  ZodFile: () => ZodFile,
  ZodExactOptional: () => ZodExactOptional,
  ZodEnum: () => ZodEnum,
  ZodEmoji: () => ZodEmoji,
  ZodEmail: () => ZodEmail,
  ZodE164: () => ZodE164,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodDefault: () => ZodDefault,
  ZodDate: () => ZodDate,
  ZodCustomStringFormat: () => ZodCustomStringFormat,
  ZodCustom: () => ZodCustom,
  ZodCodec: () => ZodCodec,
  ZodCatch: () => ZodCatch,
  ZodCUID2: () => ZodCUID2,
  ZodCUID: () => ZodCUID,
  ZodCIDRv6: () => ZodCIDRv6,
  ZodCIDRv4: () => ZodCIDRv4,
  ZodBoolean: () => ZodBoolean,
  ZodBigIntFormat: () => ZodBigIntFormat,
  ZodBigInt: () => ZodBigInt,
  ZodBase64URL: () => ZodBase64URL,
  ZodBase64: () => ZodBase64,
  ZodArray: () => ZodArray,
  ZodAny: () => ZodAny
});

// node_modules/zod/v4/classic/checks.js
var exports_checks2 = {};
__export(exports_checks2, {
  uppercase: () => _uppercase,
  trim: () => _trim,
  toUpperCase: () => _toUpperCase,
  toLowerCase: () => _toLowerCase,
  startsWith: () => _startsWith,
  slugify: () => _slugify,
  size: () => _size,
  regex: () => _regex,
  property: () => _property,
  positive: () => _positive,
  overwrite: () => _overwrite,
  normalize: () => _normalize,
  nonpositive: () => _nonpositive,
  nonnegative: () => _nonnegative,
  negative: () => _negative,
  multipleOf: () => _multipleOf,
  minSize: () => _minSize,
  minLength: () => _minLength,
  mime: () => _mime,
  maxSize: () => _maxSize,
  maxLength: () => _maxLength,
  lte: () => _lte,
  lt: () => _lt,
  lowercase: () => _lowercase,
  length: () => _length,
  includes: () => _includes,
  gte: () => _gte,
  gt: () => _gt,
  endsWith: () => _endsWith
});

// node_modules/zod/v4/classic/iso.js
var exports_iso = {};
__export(exports_iso, {
  time: () => time2,
  duration: () => duration2,
  datetime: () => datetime2,
  date: () => date2,
  ZodISOTime: () => ZodISOTime,
  ZodISODuration: () => ZodISODuration,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODate: () => ZodISODate
});
var ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
  $ZodISODateTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function datetime2(params) {
  return _isoDateTime(ZodISODateTime, params);
}
var ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
  $ZodISODate.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function date2(params) {
  return _isoDate(ZodISODate, params);
}
var ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
  $ZodISOTime.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function time2(params) {
  return _isoTime(ZodISOTime, params);
}
var ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
  $ZodISODuration.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function duration2(params) {
  return _isoDuration(ZodISODuration, params);
}

// node_modules/zod/v4/classic/errors.js
var initializer2 = (inst, issues) => {
  $ZodError.init(inst, issues);
  inst.name = "ZodError";
  Object.defineProperties(inst, {
    format: {
      value: (mapper) => formatError(inst, mapper)
    },
    flatten: {
      value: (mapper) => flattenError(inst, mapper)
    },
    addIssue: {
      value: (issue2) => {
        inst.issues.push(issue2);
        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
      }
    },
    addIssues: {
      value: (issues2) => {
        inst.issues.push(...issues2);
        inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
      }
    },
    isEmpty: {
      get() {
        return inst.issues.length === 0;
      }
    }
  });
};
var ZodError = $constructor("ZodError", initializer2);
var ZodRealError = $constructor("ZodError", initializer2, {
  Parent: Error
});

// node_modules/zod/v4/classic/parse.js
var parse3 = /* @__PURE__ */ _parse(ZodRealError);
var parseAsync2 = /* @__PURE__ */ _parseAsync(ZodRealError);
var safeParse2 = /* @__PURE__ */ _safeParse(ZodRealError);
var safeParseAsync2 = /* @__PURE__ */ _safeParseAsync(ZodRealError);
var encode2 = /* @__PURE__ */ _encode(ZodRealError);
var decode2 = /* @__PURE__ */ _decode(ZodRealError);
var encodeAsync2 = /* @__PURE__ */ _encodeAsync(ZodRealError);
var decodeAsync2 = /* @__PURE__ */ _decodeAsync(ZodRealError);
var safeEncode2 = /* @__PURE__ */ _safeEncode(ZodRealError);
var safeDecode2 = /* @__PURE__ */ _safeDecode(ZodRealError);
var safeEncodeAsync2 = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
var safeDecodeAsync2 = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);

// node_modules/zod/v4/classic/schemas.js
var ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
  $ZodType.init(inst, def);
  Object.assign(inst["~standard"], {
    jsonSchema: {
      input: createStandardJSONSchemaMethod(inst, "input"),
      output: createStandardJSONSchemaMethod(inst, "output")
    }
  });
  inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
  inst.def = def;
  inst.type = def.type;
  Object.defineProperty(inst, "_def", { value: def });
  inst.check = (...checks2) => {
    return inst.clone(exports_util.mergeDefs(def, {
      checks: [
        ...def.checks ?? [],
        ...checks2.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
      ]
    }), {
      parent: true
    });
  };
  inst.with = inst.check;
  inst.clone = (def2, params) => clone(inst, def2, params);
  inst.brand = () => inst;
  inst.register = (reg, meta2) => {
    reg.add(inst, meta2);
    return inst;
  };
  inst.parse = (data, params) => parse3(inst, data, params, { callee: inst.parse });
  inst.safeParse = (data, params) => safeParse2(inst, data, params);
  inst.parseAsync = async (data, params) => parseAsync2(inst, data, params, { callee: inst.parseAsync });
  inst.safeParseAsync = async (data, params) => safeParseAsync2(inst, data, params);
  inst.spa = inst.safeParseAsync;
  inst.encode = (data, params) => encode2(inst, data, params);
  inst.decode = (data, params) => decode2(inst, data, params);
  inst.encodeAsync = async (data, params) => encodeAsync2(inst, data, params);
  inst.decodeAsync = async (data, params) => decodeAsync2(inst, data, params);
  inst.safeEncode = (data, params) => safeEncode2(inst, data, params);
  inst.safeDecode = (data, params) => safeDecode2(inst, data, params);
  inst.safeEncodeAsync = async (data, params) => safeEncodeAsync2(inst, data, params);
  inst.safeDecodeAsync = async (data, params) => safeDecodeAsync2(inst, data, params);
  inst.refine = (check, params) => inst.check(refine(check, params));
  inst.superRefine = (refinement) => inst.check(superRefine(refinement));
  inst.overwrite = (fn) => inst.check(_overwrite(fn));
  inst.optional = () => optional(inst);
  inst.exactOptional = () => exactOptional(inst);
  inst.nullable = () => nullable(inst);
  inst.nullish = () => optional(nullable(inst));
  inst.nonoptional = (params) => nonoptional(inst, params);
  inst.array = () => array(inst);
  inst.or = (arg) => union([inst, arg]);
  inst.and = (arg) => intersection(inst, arg);
  inst.transform = (tx) => pipe(inst, transform(tx));
  inst.default = (def2) => _default2(inst, def2);
  inst.prefault = (def2) => prefault(inst, def2);
  inst.catch = (params) => _catch2(inst, params);
  inst.pipe = (target) => pipe(inst, target);
  inst.readonly = () => readonly(inst);
  inst.describe = (description) => {
    const cl = inst.clone();
    globalRegistry.add(cl, { description });
    return cl;
  };
  Object.defineProperty(inst, "description", {
    get() {
      return globalRegistry.get(inst)?.description;
    },
    configurable: true
  });
  inst.meta = (...args) => {
    if (args.length === 0) {
      return globalRegistry.get(inst);
    }
    const cl = inst.clone();
    globalRegistry.add(cl, args[0]);
    return cl;
  };
  inst.isOptional = () => inst.safeParse(undefined).success;
  inst.isNullable = () => inst.safeParse(null).success;
  inst.apply = (fn) => fn(inst);
  return inst;
});
var _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
  const bag = inst._zod.bag;
  inst.format = bag.format ?? null;
  inst.minLength = bag.minimum ?? null;
  inst.maxLength = bag.maximum ?? null;
  inst.regex = (...args) => inst.check(_regex(...args));
  inst.includes = (...args) => inst.check(_includes(...args));
  inst.startsWith = (...args) => inst.check(_startsWith(...args));
  inst.endsWith = (...args) => inst.check(_endsWith(...args));
  inst.min = (...args) => inst.check(_minLength(...args));
  inst.max = (...args) => inst.check(_maxLength(...args));
  inst.length = (...args) => inst.check(_length(...args));
  inst.nonempty = (...args) => inst.check(_minLength(1, ...args));
  inst.lowercase = (params) => inst.check(_lowercase(params));
  inst.uppercase = (params) => inst.check(_uppercase(params));
  inst.trim = () => inst.check(_trim());
  inst.normalize = (...args) => inst.check(_normalize(...args));
  inst.toLowerCase = () => inst.check(_toLowerCase());
  inst.toUpperCase = () => inst.check(_toUpperCase());
  inst.slugify = () => inst.check(_slugify());
});
var ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
  $ZodString.init(inst, def);
  _ZodString.init(inst, def);
  inst.email = (params) => inst.check(_email(ZodEmail, params));
  inst.url = (params) => inst.check(_url(ZodURL, params));
  inst.jwt = (params) => inst.check(_jwt(ZodJWT, params));
  inst.emoji = (params) => inst.check(_emoji2(ZodEmoji, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.uuid = (params) => inst.check(_uuid(ZodUUID, params));
  inst.uuidv4 = (params) => inst.check(_uuidv4(ZodUUID, params));
  inst.uuidv6 = (params) => inst.check(_uuidv6(ZodUUID, params));
  inst.uuidv7 = (params) => inst.check(_uuidv7(ZodUUID, params));
  inst.nanoid = (params) => inst.check(_nanoid(ZodNanoID, params));
  inst.guid = (params) => inst.check(_guid(ZodGUID, params));
  inst.cuid = (params) => inst.check(_cuid(ZodCUID, params));
  inst.cuid2 = (params) => inst.check(_cuid2(ZodCUID2, params));
  inst.ulid = (params) => inst.check(_ulid(ZodULID, params));
  inst.base64 = (params) => inst.check(_base64(ZodBase64, params));
  inst.base64url = (params) => inst.check(_base64url(ZodBase64URL, params));
  inst.xid = (params) => inst.check(_xid(ZodXID, params));
  inst.ksuid = (params) => inst.check(_ksuid(ZodKSUID, params));
  inst.ipv4 = (params) => inst.check(_ipv4(ZodIPv4, params));
  inst.ipv6 = (params) => inst.check(_ipv6(ZodIPv6, params));
  inst.cidrv4 = (params) => inst.check(_cidrv4(ZodCIDRv4, params));
  inst.cidrv6 = (params) => inst.check(_cidrv6(ZodCIDRv6, params));
  inst.e164 = (params) => inst.check(_e164(ZodE164, params));
  inst.datetime = (params) => inst.check(datetime2(params));
  inst.date = (params) => inst.check(date2(params));
  inst.time = (params) => inst.check(time2(params));
  inst.duration = (params) => inst.check(duration2(params));
});
function string2(params) {
  return _string(ZodString, params);
}
var ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  _ZodString.init(inst, def);
});
var ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
  $ZodEmail.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function email2(params) {
  return _email(ZodEmail, params);
}
var ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
  $ZodGUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function guid2(params) {
  return _guid(ZodGUID, params);
}
var ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
  $ZodUUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function uuid2(params) {
  return _uuid(ZodUUID, params);
}
function uuidv4(params) {
  return _uuidv4(ZodUUID, params);
}
function uuidv6(params) {
  return _uuidv6(ZodUUID, params);
}
function uuidv7(params) {
  return _uuidv7(ZodUUID, params);
}
var ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
  $ZodURL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function url(params) {
  return _url(ZodURL, params);
}
function httpUrl(params) {
  return _url(ZodURL, {
    protocol: /^https?$/,
    hostname: exports_regexes.domain,
    ...exports_util.normalizeParams(params)
  });
}
var ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
  $ZodEmoji.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function emoji2(params) {
  return _emoji2(ZodEmoji, params);
}
var ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
  $ZodNanoID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function nanoid2(params) {
  return _nanoid(ZodNanoID, params);
}
var ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
  $ZodCUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cuid3(params) {
  return _cuid(ZodCUID, params);
}
var ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
  $ZodCUID2.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cuid22(params) {
  return _cuid2(ZodCUID2, params);
}
var ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
  $ZodULID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ulid2(params) {
  return _ulid(ZodULID, params);
}
var ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
  $ZodXID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function xid2(params) {
  return _xid(ZodXID, params);
}
var ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
  $ZodKSUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ksuid2(params) {
  return _ksuid(ZodKSUID, params);
}
var ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
  $ZodIPv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ipv42(params) {
  return _ipv4(ZodIPv4, params);
}
var ZodMAC = /* @__PURE__ */ $constructor("ZodMAC", (inst, def) => {
  $ZodMAC.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function mac2(params) {
  return _mac(ZodMAC, params);
}
var ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
  $ZodIPv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function ipv62(params) {
  return _ipv6(ZodIPv6, params);
}
var ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
  $ZodCIDRv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cidrv42(params) {
  return _cidrv4(ZodCIDRv4, params);
}
var ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
  $ZodCIDRv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function cidrv62(params) {
  return _cidrv6(ZodCIDRv6, params);
}
var ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
  $ZodBase64.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function base642(params) {
  return _base64(ZodBase64, params);
}
var ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
  $ZodBase64URL.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function base64url2(params) {
  return _base64url(ZodBase64URL, params);
}
var ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
  $ZodE164.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function e1642(params) {
  return _e164(ZodE164, params);
}
var ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
  $ZodJWT.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function jwt(params) {
  return _jwt(ZodJWT, params);
}
var ZodCustomStringFormat = /* @__PURE__ */ $constructor("ZodCustomStringFormat", (inst, def) => {
  $ZodCustomStringFormat.init(inst, def);
  ZodStringFormat.init(inst, def);
});
function stringFormat(format, fnOrRegex, _params = {}) {
  return _stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
}
function hostname2(_params) {
  return _stringFormat(ZodCustomStringFormat, "hostname", exports_regexes.hostname, _params);
}
function hex2(_params) {
  return _stringFormat(ZodCustomStringFormat, "hex", exports_regexes.hex, _params);
}
function hash(alg, params) {
  const enc = params?.enc ?? "hex";
  const format = `${alg}_${enc}`;
  const regex = exports_regexes[format];
  if (!regex)
    throw new Error(`Unrecognized hash format: ${format}`);
  return _stringFormat(ZodCustomStringFormat, format, regex, params);
}
var ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
  $ZodNumber.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
  inst.gt = (value, params) => inst.check(_gt(value, params));
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.lt = (value, params) => inst.check(_lt(value, params));
  inst.lte = (value, params) => inst.check(_lte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  inst.int = (params) => inst.check(int(params));
  inst.safe = (params) => inst.check(int(params));
  inst.positive = (params) => inst.check(_gt(0, params));
  inst.nonnegative = (params) => inst.check(_gte(0, params));
  inst.negative = (params) => inst.check(_lt(0, params));
  inst.nonpositive = (params) => inst.check(_lte(0, params));
  inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
  inst.step = (value, params) => inst.check(_multipleOf(value, params));
  inst.finite = () => inst;
  const bag = inst._zod.bag;
  inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
  inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
  inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
  inst.isFinite = true;
  inst.format = bag.format ?? null;
});
function number2(params) {
  return _number(ZodNumber, params);
}
var ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
  $ZodNumberFormat.init(inst, def);
  ZodNumber.init(inst, def);
});
function int(params) {
  return _int(ZodNumberFormat, params);
}
function float32(params) {
  return _float32(ZodNumberFormat, params);
}
function float64(params) {
  return _float64(ZodNumberFormat, params);
}
function int32(params) {
  return _int32(ZodNumberFormat, params);
}
function uint32(params) {
  return _uint32(ZodNumberFormat, params);
}
var ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
  $ZodBoolean.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
});
function boolean2(params) {
  return _boolean(ZodBoolean, params);
}
var ZodBigInt = /* @__PURE__ */ $constructor("ZodBigInt", (inst, def) => {
  $ZodBigInt.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => bigintProcessor(inst, ctx, json, params);
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.gt = (value, params) => inst.check(_gt(value, params));
  inst.gte = (value, params) => inst.check(_gte(value, params));
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.lt = (value, params) => inst.check(_lt(value, params));
  inst.lte = (value, params) => inst.check(_lte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  inst.positive = (params) => inst.check(_gt(BigInt(0), params));
  inst.negative = (params) => inst.check(_lt(BigInt(0), params));
  inst.nonpositive = (params) => inst.check(_lte(BigInt(0), params));
  inst.nonnegative = (params) => inst.check(_gte(BigInt(0), params));
  inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
  const bag = inst._zod.bag;
  inst.minValue = bag.minimum ?? null;
  inst.maxValue = bag.maximum ?? null;
  inst.format = bag.format ?? null;
});
function bigint2(params) {
  return _bigint(ZodBigInt, params);
}
var ZodBigIntFormat = /* @__PURE__ */ $constructor("ZodBigIntFormat", (inst, def) => {
  $ZodBigIntFormat.init(inst, def);
  ZodBigInt.init(inst, def);
});
function int64(params) {
  return _int64(ZodBigIntFormat, params);
}
function uint64(params) {
  return _uint64(ZodBigIntFormat, params);
}
var ZodSymbol = /* @__PURE__ */ $constructor("ZodSymbol", (inst, def) => {
  $ZodSymbol.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => symbolProcessor(inst, ctx, json, params);
});
function symbol(params) {
  return _symbol(ZodSymbol, params);
}
var ZodUndefined = /* @__PURE__ */ $constructor("ZodUndefined", (inst, def) => {
  $ZodUndefined.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => undefinedProcessor(inst, ctx, json, params);
});
function _undefined3(params) {
  return _undefined2(ZodUndefined, params);
}
var ZodNull = /* @__PURE__ */ $constructor("ZodNull", (inst, def) => {
  $ZodNull.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => nullProcessor(inst, ctx, json, params);
});
function _null3(params) {
  return _null2(ZodNull, params);
}
var ZodAny = /* @__PURE__ */ $constructor("ZodAny", (inst, def) => {
  $ZodAny.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => anyProcessor(inst, ctx, json, params);
});
function any() {
  return _any(ZodAny);
}
var ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
  $ZodUnknown.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => unknownProcessor(inst, ctx, json, params);
});
function unknown() {
  return _unknown(ZodUnknown);
}
var ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
  $ZodNever.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
});
function never(params) {
  return _never(ZodNever, params);
}
var ZodVoid = /* @__PURE__ */ $constructor("ZodVoid", (inst, def) => {
  $ZodVoid.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => voidProcessor(inst, ctx, json, params);
});
function _void2(params) {
  return _void(ZodVoid, params);
}
var ZodDate = /* @__PURE__ */ $constructor("ZodDate", (inst, def) => {
  $ZodDate.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => dateProcessor(inst, ctx, json, params);
  inst.min = (value, params) => inst.check(_gte(value, params));
  inst.max = (value, params) => inst.check(_lte(value, params));
  const c = inst._zod.bag;
  inst.minDate = c.minimum ? new Date(c.minimum) : null;
  inst.maxDate = c.maximum ? new Date(c.maximum) : null;
});
function date3(params) {
  return _date(ZodDate, params);
}
var ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
  $ZodArray.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
  inst.element = def.element;
  inst.min = (minLength, params) => inst.check(_minLength(minLength, params));
  inst.nonempty = (params) => inst.check(_minLength(1, params));
  inst.max = (maxLength, params) => inst.check(_maxLength(maxLength, params));
  inst.length = (len, params) => inst.check(_length(len, params));
  inst.unwrap = () => inst.element;
});
function array(element, params) {
  return _array(ZodArray, element, params);
}
function keyof(schema) {
  const shape = schema._zod.def.shape;
  return _enum2(Object.keys(shape));
}
var ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
  $ZodObjectJIT.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
  exports_util.defineLazy(inst, "shape", () => {
    return def.shape;
  });
  inst.keyof = () => _enum2(Object.keys(inst._zod.def.shape));
  inst.catchall = (catchall) => inst.clone({ ...inst._zod.def, catchall });
  inst.passthrough = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
  inst.loose = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
  inst.strict = () => inst.clone({ ...inst._zod.def, catchall: never() });
  inst.strip = () => inst.clone({ ...inst._zod.def, catchall: undefined });
  inst.extend = (incoming) => {
    return exports_util.extend(inst, incoming);
  };
  inst.safeExtend = (incoming) => {
    return exports_util.safeExtend(inst, incoming);
  };
  inst.merge = (other) => exports_util.merge(inst, other);
  inst.pick = (mask) => exports_util.pick(inst, mask);
  inst.omit = (mask) => exports_util.omit(inst, mask);
  inst.partial = (...args) => exports_util.partial(ZodOptional, inst, args[0]);
  inst.required = (...args) => exports_util.required(ZodNonOptional, inst, args[0]);
});
function object(shape, params) {
  const def = {
    type: "object",
    shape: shape ?? {},
    ...exports_util.normalizeParams(params)
  };
  return new ZodObject(def);
}
function strictObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: never(),
    ...exports_util.normalizeParams(params)
  });
}
function looseObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: unknown(),
    ...exports_util.normalizeParams(params)
  });
}
var ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
  $ZodUnion.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
  inst.options = def.options;
});
function union(options, params) {
  return new ZodUnion({
    type: "union",
    options,
    ...exports_util.normalizeParams(params)
  });
}
var ZodXor = /* @__PURE__ */ $constructor("ZodXor", (inst, def) => {
  ZodUnion.init(inst, def);
  $ZodXor.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
  inst.options = def.options;
});
function xor(options, params) {
  return new ZodXor({
    type: "union",
    options,
    inclusive: false,
    ...exports_util.normalizeParams(params)
  });
}
var ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def) => {
  ZodUnion.init(inst, def);
  $ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
  return new ZodDiscriminatedUnion({
    type: "union",
    options,
    discriminator,
    ...exports_util.normalizeParams(params)
  });
}
var ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
  $ZodIntersection.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
});
function intersection(left, right) {
  return new ZodIntersection({
    type: "intersection",
    left,
    right
  });
}
var ZodTuple = /* @__PURE__ */ $constructor("ZodTuple", (inst, def) => {
  $ZodTuple.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => tupleProcessor(inst, ctx, json, params);
  inst.rest = (rest) => inst.clone({
    ...inst._zod.def,
    rest
  });
});
function tuple(items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new ZodTuple({
    type: "tuple",
    items,
    rest,
    ...exports_util.normalizeParams(params)
  });
}
var ZodRecord = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
  $ZodRecord.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => recordProcessor(inst, ctx, json, params);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    ...exports_util.normalizeParams(params)
  });
}
function partialRecord(keyType, valueType, params) {
  const k = clone(keyType);
  k._zod.values = undefined;
  return new ZodRecord({
    type: "record",
    keyType: k,
    valueType,
    ...exports_util.normalizeParams(params)
  });
}
function looseRecord(keyType, valueType, params) {
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    mode: "loose",
    ...exports_util.normalizeParams(params)
  });
}
var ZodMap = /* @__PURE__ */ $constructor("ZodMap", (inst, def) => {
  $ZodMap.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => mapProcessor(inst, ctx, json, params);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
  inst.min = (...args) => inst.check(_minSize(...args));
  inst.nonempty = (params) => inst.check(_minSize(1, params));
  inst.max = (...args) => inst.check(_maxSize(...args));
  inst.size = (...args) => inst.check(_size(...args));
});
function map(keyType, valueType, params) {
  return new ZodMap({
    type: "map",
    keyType,
    valueType,
    ...exports_util.normalizeParams(params)
  });
}
var ZodSet = /* @__PURE__ */ $constructor("ZodSet", (inst, def) => {
  $ZodSet.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => setProcessor(inst, ctx, json, params);
  inst.min = (...args) => inst.check(_minSize(...args));
  inst.nonempty = (params) => inst.check(_minSize(1, params));
  inst.max = (...args) => inst.check(_maxSize(...args));
  inst.size = (...args) => inst.check(_size(...args));
});
function set(valueType, params) {
  return new ZodSet({
    type: "set",
    valueType,
    ...exports_util.normalizeParams(params)
  });
}
var ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
  $ZodEnum.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
  inst.enum = def.entries;
  inst.options = Object.values(def.entries);
  const keys = new Set(Object.keys(def.entries));
  inst.extract = (values, params) => {
    const newEntries = {};
    for (const value of values) {
      if (keys.has(value)) {
        newEntries[value] = def.entries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...exports_util.normalizeParams(params),
      entries: newEntries
    });
  };
  inst.exclude = (values, params) => {
    const newEntries = { ...def.entries };
    for (const value of values) {
      if (keys.has(value)) {
        delete newEntries[value];
      } else
        throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...exports_util.normalizeParams(params),
      entries: newEntries
    });
  };
});
function _enum2(values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new ZodEnum({
    type: "enum",
    entries,
    ...exports_util.normalizeParams(params)
  });
}
function nativeEnum(entries, params) {
  return new ZodEnum({
    type: "enum",
    entries,
    ...exports_util.normalizeParams(params)
  });
}
var ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
  $ZodLiteral.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
  inst.values = new Set(def.values);
  Object.defineProperty(inst, "value", {
    get() {
      if (def.values.length > 1) {
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      }
      return def.values[0];
    }
  });
});
function literal(value, params) {
  return new ZodLiteral({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...exports_util.normalizeParams(params)
  });
}
var ZodFile = /* @__PURE__ */ $constructor("ZodFile", (inst, def) => {
  $ZodFile.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => fileProcessor(inst, ctx, json, params);
  inst.min = (size, params) => inst.check(_minSize(size, params));
  inst.max = (size, params) => inst.check(_maxSize(size, params));
  inst.mime = (types, params) => inst.check(_mime(Array.isArray(types) ? types : [types], params));
});
function file(params) {
  return _file(ZodFile, params);
}
var ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
  $ZodTransform.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
  inst._zod.parse = (payload, _ctx) => {
    if (_ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(exports_util.issue(issue2, payload.value, def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = inst);
        payload.issues.push(exports_util.issue(_issue));
      }
    };
    const output = def.transform(payload.value, payload);
    if (output instanceof Promise) {
      return output.then((output2) => {
        payload.value = output2;
        return payload;
      });
    }
    payload.value = output;
    return payload;
  };
});
function transform(fn) {
  return new ZodTransform({
    type: "transform",
    transform: fn
  });
}
var ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
  return new ZodOptional({
    type: "optional",
    innerType
  });
}
var ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def) => {
  $ZodExactOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
  return new ZodExactOptional({
    type: "optional",
    innerType
  });
}
var ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
  $ZodNullable.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
  return new ZodNullable({
    type: "nullable",
    innerType
  });
}
function nullish2(innerType) {
  return optional(nullable(innerType));
}
var ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
  $ZodDefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeDefault = inst.unwrap;
});
function _default2(innerType, defaultValue) {
  return new ZodDefault({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : exports_util.shallowClone(defaultValue);
    }
  });
}
var ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
  $ZodPrefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
  return new ZodPrefault({
    type: "prefault",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : exports_util.shallowClone(defaultValue);
    }
  });
}
var ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
  $ZodNonOptional.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
  return new ZodNonOptional({
    type: "nonoptional",
    innerType,
    ...exports_util.normalizeParams(params)
  });
}
var ZodSuccess = /* @__PURE__ */ $constructor("ZodSuccess", (inst, def) => {
  $ZodSuccess.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => successProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function success(innerType) {
  return new ZodSuccess({
    type: "success",
    innerType
  });
}
var ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
  $ZodCatch.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeCatch = inst.unwrap;
});
function _catch2(innerType, catchValue) {
  return new ZodCatch({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
  });
}
var ZodNaN = /* @__PURE__ */ $constructor("ZodNaN", (inst, def) => {
  $ZodNaN.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => nanProcessor(inst, ctx, json, params);
});
function nan(params) {
  return _nan(ZodNaN, params);
}
var ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
  $ZodPipe.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
  inst.in = def.in;
  inst.out = def.out;
});
function pipe(in_, out) {
  return new ZodPipe({
    type: "pipe",
    in: in_,
    out
  });
}
var ZodCodec = /* @__PURE__ */ $constructor("ZodCodec", (inst, def) => {
  ZodPipe.init(inst, def);
  $ZodCodec.init(inst, def);
});
function codec(in_, out, params) {
  return new ZodCodec({
    type: "pipe",
    in: in_,
    out,
    transform: params.decode,
    reverseTransform: params.encode
  });
}
var ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
  $ZodReadonly.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
  return new ZodReadonly({
    type: "readonly",
    innerType
  });
}
var ZodTemplateLiteral = /* @__PURE__ */ $constructor("ZodTemplateLiteral", (inst, def) => {
  $ZodTemplateLiteral.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => templateLiteralProcessor(inst, ctx, json, params);
});
function templateLiteral(parts, params) {
  return new ZodTemplateLiteral({
    type: "template_literal",
    parts,
    ...exports_util.normalizeParams(params)
  });
}
var ZodLazy = /* @__PURE__ */ $constructor("ZodLazy", (inst, def) => {
  $ZodLazy.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => lazyProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
  return new ZodLazy({
    type: "lazy",
    getter
  });
}
var ZodPromise = /* @__PURE__ */ $constructor("ZodPromise", (inst, def) => {
  $ZodPromise.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => promiseProcessor(inst, ctx, json, params);
  inst.unwrap = () => inst._zod.def.innerType;
});
function promise(innerType) {
  return new ZodPromise({
    type: "promise",
    innerType
  });
}
var ZodFunction = /* @__PURE__ */ $constructor("ZodFunction", (inst, def) => {
  $ZodFunction.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => functionProcessor(inst, ctx, json, params);
});
function _function(params) {
  return new ZodFunction({
    type: "function",
    input: Array.isArray(params?.input) ? tuple(params?.input) : params?.input ?? array(unknown()),
    output: params?.output ?? unknown()
  });
}
var ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
  $ZodCustom.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
});
function check(fn) {
  const ch = new $ZodCheck({
    check: "custom"
  });
  ch._zod.check = fn;
  return ch;
}
function custom(fn, _params) {
  return _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
  return _refine(ZodCustom, fn, _params);
}
function superRefine(fn) {
  return _superRefine(fn);
}
var describe2 = describe;
var meta2 = meta;
function _instanceof(cls, params = {}) {
  const inst = new ZodCustom({
    type: "custom",
    check: "custom",
    fn: (data) => data instanceof cls,
    abort: true,
    ...exports_util.normalizeParams(params)
  });
  inst._zod.bag.Class = cls;
  inst._zod.check = (payload) => {
    if (!(payload.value instanceof cls)) {
      payload.issues.push({
        code: "invalid_type",
        expected: cls.name,
        input: payload.value,
        inst,
        path: [...inst._zod.def.path ?? []]
      });
    }
  };
  return inst;
}
var stringbool = (...args) => _stringbool({
  Codec: ZodCodec,
  Boolean: ZodBoolean,
  String: ZodString
}, ...args);
function json(params) {
  const jsonSchema = lazy(() => {
    return union([string2(params), number2(), boolean2(), _null3(), array(jsonSchema), record(string2(), jsonSchema)]);
  });
  return jsonSchema;
}
function preprocess(fn, schema) {
  return pipe(transform(fn), schema);
}
// node_modules/zod/v4/classic/compat.js
var ZodIssueCode = {
  invalid_type: "invalid_type",
  too_big: "too_big",
  too_small: "too_small",
  invalid_format: "invalid_format",
  not_multiple_of: "not_multiple_of",
  unrecognized_keys: "unrecognized_keys",
  invalid_union: "invalid_union",
  invalid_key: "invalid_key",
  invalid_element: "invalid_element",
  invalid_value: "invalid_value",
  custom: "custom"
};
function setErrorMap(map2) {
  config({
    customError: map2
  });
}
function getErrorMap() {
  return config().customError;
}
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
// node_modules/zod/v4/classic/from-json-schema.js
var z = {
  ...exports_schemas2,
  ...exports_checks2,
  iso: exports_iso
};
var RECOGNIZED_KEYS = new Set([
  "$schema",
  "$ref",
  "$defs",
  "definitions",
  "$id",
  "id",
  "$comment",
  "$anchor",
  "$vocabulary",
  "$dynamicRef",
  "$dynamicAnchor",
  "type",
  "enum",
  "const",
  "anyOf",
  "oneOf",
  "allOf",
  "not",
  "properties",
  "required",
  "additionalProperties",
  "patternProperties",
  "propertyNames",
  "minProperties",
  "maxProperties",
  "items",
  "prefixItems",
  "additionalItems",
  "minItems",
  "maxItems",
  "uniqueItems",
  "contains",
  "minContains",
  "maxContains",
  "minLength",
  "maxLength",
  "pattern",
  "format",
  "minimum",
  "maximum",
  "exclusiveMinimum",
  "exclusiveMaximum",
  "multipleOf",
  "description",
  "default",
  "contentEncoding",
  "contentMediaType",
  "contentSchema",
  "unevaluatedItems",
  "unevaluatedProperties",
  "if",
  "then",
  "else",
  "dependentSchemas",
  "dependentRequired",
  "nullable",
  "readOnly"
]);
function detectVersion(schema, defaultTarget) {
  const $schema = schema.$schema;
  if ($schema === "https://json-schema.org/draft/2020-12/schema") {
    return "draft-2020-12";
  }
  if ($schema === "http://json-schema.org/draft-07/schema#") {
    return "draft-7";
  }
  if ($schema === "http://json-schema.org/draft-04/schema#") {
    return "draft-4";
  }
  return defaultTarget ?? "draft-2020-12";
}
function resolveRef(ref, ctx) {
  if (!ref.startsWith("#")) {
    throw new Error("External $ref is not supported, only local refs (#/...) are allowed");
  }
  const path = ref.slice(1).split("/").filter(Boolean);
  if (path.length === 0) {
    return ctx.rootSchema;
  }
  const defsKey = ctx.version === "draft-2020-12" ? "$defs" : "definitions";
  if (path[0] === defsKey) {
    const key = path[1];
    if (!key || !ctx.defs[key]) {
      throw new Error(`Reference not found: ${ref}`);
    }
    return ctx.defs[key];
  }
  throw new Error(`Reference not found: ${ref}`);
}
function convertBaseSchema(schema, ctx) {
  if (schema.not !== undefined) {
    if (typeof schema.not === "object" && Object.keys(schema.not).length === 0) {
      return z.never();
    }
    throw new Error("not is not supported in Zod (except { not: {} } for never)");
  }
  if (schema.unevaluatedItems !== undefined) {
    throw new Error("unevaluatedItems is not supported");
  }
  if (schema.unevaluatedProperties !== undefined) {
    throw new Error("unevaluatedProperties is not supported");
  }
  if (schema.if !== undefined || schema.then !== undefined || schema.else !== undefined) {
    throw new Error("Conditional schemas (if/then/else) are not supported");
  }
  if (schema.dependentSchemas !== undefined || schema.dependentRequired !== undefined) {
    throw new Error("dependentSchemas and dependentRequired are not supported");
  }
  if (schema.$ref) {
    const refPath = schema.$ref;
    if (ctx.refs.has(refPath)) {
      return ctx.refs.get(refPath);
    }
    if (ctx.processing.has(refPath)) {
      return z.lazy(() => {
        if (!ctx.refs.has(refPath)) {
          throw new Error(`Circular reference not resolved: ${refPath}`);
        }
        return ctx.refs.get(refPath);
      });
    }
    ctx.processing.add(refPath);
    const resolved = resolveRef(refPath, ctx);
    const zodSchema2 = convertSchema(resolved, ctx);
    ctx.refs.set(refPath, zodSchema2);
    ctx.processing.delete(refPath);
    return zodSchema2;
  }
  if (schema.enum !== undefined) {
    const enumValues = schema.enum;
    if (ctx.version === "openapi-3.0" && schema.nullable === true && enumValues.length === 1 && enumValues[0] === null) {
      return z.null();
    }
    if (enumValues.length === 0) {
      return z.never();
    }
    if (enumValues.length === 1) {
      return z.literal(enumValues[0]);
    }
    if (enumValues.every((v) => typeof v === "string")) {
      return z.enum(enumValues);
    }
    const literalSchemas = enumValues.map((v) => z.literal(v));
    if (literalSchemas.length < 2) {
      return literalSchemas[0];
    }
    return z.union([literalSchemas[0], literalSchemas[1], ...literalSchemas.slice(2)]);
  }
  if (schema.const !== undefined) {
    return z.literal(schema.const);
  }
  const type = schema.type;
  if (Array.isArray(type)) {
    const typeSchemas = type.map((t) => {
      const typeSchema = { ...schema, type: t };
      return convertBaseSchema(typeSchema, ctx);
    });
    if (typeSchemas.length === 0) {
      return z.never();
    }
    if (typeSchemas.length === 1) {
      return typeSchemas[0];
    }
    return z.union(typeSchemas);
  }
  if (!type) {
    return z.any();
  }
  let zodSchema;
  switch (type) {
    case "string": {
      let stringSchema = z.string();
      if (schema.format) {
        const format = schema.format;
        if (format === "email") {
          stringSchema = stringSchema.check(z.email());
        } else if (format === "uri" || format === "uri-reference") {
          stringSchema = stringSchema.check(z.url());
        } else if (format === "uuid" || format === "guid") {
          stringSchema = stringSchema.check(z.uuid());
        } else if (format === "date-time") {
          stringSchema = stringSchema.check(z.iso.datetime());
        } else if (format === "date") {
          stringSchema = stringSchema.check(z.iso.date());
        } else if (format === "time") {
          stringSchema = stringSchema.check(z.iso.time());
        } else if (format === "duration") {
          stringSchema = stringSchema.check(z.iso.duration());
        } else if (format === "ipv4") {
          stringSchema = stringSchema.check(z.ipv4());
        } else if (format === "ipv6") {
          stringSchema = stringSchema.check(z.ipv6());
        } else if (format === "mac") {
          stringSchema = stringSchema.check(z.mac());
        } else if (format === "cidr") {
          stringSchema = stringSchema.check(z.cidrv4());
        } else if (format === "cidr-v6") {
          stringSchema = stringSchema.check(z.cidrv6());
        } else if (format === "base64") {
          stringSchema = stringSchema.check(z.base64());
        } else if (format === "base64url") {
          stringSchema = stringSchema.check(z.base64url());
        } else if (format === "e164") {
          stringSchema = stringSchema.check(z.e164());
        } else if (format === "jwt") {
          stringSchema = stringSchema.check(z.jwt());
        } else if (format === "emoji") {
          stringSchema = stringSchema.check(z.emoji());
        } else if (format === "nanoid") {
          stringSchema = stringSchema.check(z.nanoid());
        } else if (format === "cuid") {
          stringSchema = stringSchema.check(z.cuid());
        } else if (format === "cuid2") {
          stringSchema = stringSchema.check(z.cuid2());
        } else if (format === "ulid") {
          stringSchema = stringSchema.check(z.ulid());
        } else if (format === "xid") {
          stringSchema = stringSchema.check(z.xid());
        } else if (format === "ksuid") {
          stringSchema = stringSchema.check(z.ksuid());
        }
      }
      if (typeof schema.minLength === "number") {
        stringSchema = stringSchema.min(schema.minLength);
      }
      if (typeof schema.maxLength === "number") {
        stringSchema = stringSchema.max(schema.maxLength);
      }
      if (schema.pattern) {
        stringSchema = stringSchema.regex(new RegExp(schema.pattern));
      }
      zodSchema = stringSchema;
      break;
    }
    case "number":
    case "integer": {
      let numberSchema = type === "integer" ? z.number().int() : z.number();
      if (typeof schema.minimum === "number") {
        numberSchema = numberSchema.min(schema.minimum);
      }
      if (typeof schema.maximum === "number") {
        numberSchema = numberSchema.max(schema.maximum);
      }
      if (typeof schema.exclusiveMinimum === "number") {
        numberSchema = numberSchema.gt(schema.exclusiveMinimum);
      } else if (schema.exclusiveMinimum === true && typeof schema.minimum === "number") {
        numberSchema = numberSchema.gt(schema.minimum);
      }
      if (typeof schema.exclusiveMaximum === "number") {
        numberSchema = numberSchema.lt(schema.exclusiveMaximum);
      } else if (schema.exclusiveMaximum === true && typeof schema.maximum === "number") {
        numberSchema = numberSchema.lt(schema.maximum);
      }
      if (typeof schema.multipleOf === "number") {
        numberSchema = numberSchema.multipleOf(schema.multipleOf);
      }
      zodSchema = numberSchema;
      break;
    }
    case "boolean": {
      zodSchema = z.boolean();
      break;
    }
    case "null": {
      zodSchema = z.null();
      break;
    }
    case "object": {
      const shape = {};
      const properties = schema.properties || {};
      const requiredSet = new Set(schema.required || []);
      for (const [key, propSchema] of Object.entries(properties)) {
        const propZodSchema = convertSchema(propSchema, ctx);
        shape[key] = requiredSet.has(key) ? propZodSchema : propZodSchema.optional();
      }
      if (schema.propertyNames) {
        const keySchema = convertSchema(schema.propertyNames, ctx);
        const valueSchema = schema.additionalProperties && typeof schema.additionalProperties === "object" ? convertSchema(schema.additionalProperties, ctx) : z.any();
        if (Object.keys(shape).length === 0) {
          zodSchema = z.record(keySchema, valueSchema);
          break;
        }
        const objectSchema2 = z.object(shape).passthrough();
        const recordSchema = z.looseRecord(keySchema, valueSchema);
        zodSchema = z.intersection(objectSchema2, recordSchema);
        break;
      }
      if (schema.patternProperties) {
        const patternProps = schema.patternProperties;
        const patternKeys = Object.keys(patternProps);
        const looseRecords = [];
        for (const pattern of patternKeys) {
          const patternValue = convertSchema(patternProps[pattern], ctx);
          const keySchema = z.string().regex(new RegExp(pattern));
          looseRecords.push(z.looseRecord(keySchema, patternValue));
        }
        const schemasToIntersect = [];
        if (Object.keys(shape).length > 0) {
          schemasToIntersect.push(z.object(shape).passthrough());
        }
        schemasToIntersect.push(...looseRecords);
        if (schemasToIntersect.length === 0) {
          zodSchema = z.object({}).passthrough();
        } else if (schemasToIntersect.length === 1) {
          zodSchema = schemasToIntersect[0];
        } else {
          let result = z.intersection(schemasToIntersect[0], schemasToIntersect[1]);
          for (let i = 2;i < schemasToIntersect.length; i++) {
            result = z.intersection(result, schemasToIntersect[i]);
          }
          zodSchema = result;
        }
        break;
      }
      const objectSchema = z.object(shape);
      if (schema.additionalProperties === false) {
        zodSchema = objectSchema.strict();
      } else if (typeof schema.additionalProperties === "object") {
        zodSchema = objectSchema.catchall(convertSchema(schema.additionalProperties, ctx));
      } else {
        zodSchema = objectSchema.passthrough();
      }
      break;
    }
    case "array": {
      const prefixItems = schema.prefixItems;
      const items = schema.items;
      if (prefixItems && Array.isArray(prefixItems)) {
        const tupleItems = prefixItems.map((item) => convertSchema(item, ctx));
        const rest = items && typeof items === "object" && !Array.isArray(items) ? convertSchema(items, ctx) : undefined;
        if (rest) {
          zodSchema = z.tuple(tupleItems).rest(rest);
        } else {
          zodSchema = z.tuple(tupleItems);
        }
        if (typeof schema.minItems === "number") {
          zodSchema = zodSchema.check(z.minLength(schema.minItems));
        }
        if (typeof schema.maxItems === "number") {
          zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
        }
      } else if (Array.isArray(items)) {
        const tupleItems = items.map((item) => convertSchema(item, ctx));
        const rest = schema.additionalItems && typeof schema.additionalItems === "object" ? convertSchema(schema.additionalItems, ctx) : undefined;
        if (rest) {
          zodSchema = z.tuple(tupleItems).rest(rest);
        } else {
          zodSchema = z.tuple(tupleItems);
        }
        if (typeof schema.minItems === "number") {
          zodSchema = zodSchema.check(z.minLength(schema.minItems));
        }
        if (typeof schema.maxItems === "number") {
          zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
        }
      } else if (items !== undefined) {
        const element = convertSchema(items, ctx);
        let arraySchema = z.array(element);
        if (typeof schema.minItems === "number") {
          arraySchema = arraySchema.min(schema.minItems);
        }
        if (typeof schema.maxItems === "number") {
          arraySchema = arraySchema.max(schema.maxItems);
        }
        zodSchema = arraySchema;
      } else {
        zodSchema = z.array(z.any());
      }
      break;
    }
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
  if (schema.description) {
    zodSchema = zodSchema.describe(schema.description);
  }
  if (schema.default !== undefined) {
    zodSchema = zodSchema.default(schema.default);
  }
  return zodSchema;
}
function convertSchema(schema, ctx) {
  if (typeof schema === "boolean") {
    return schema ? z.any() : z.never();
  }
  let baseSchema = convertBaseSchema(schema, ctx);
  const hasExplicitType = schema.type || schema.enum !== undefined || schema.const !== undefined;
  if (schema.anyOf && Array.isArray(schema.anyOf)) {
    const options = schema.anyOf.map((s) => convertSchema(s, ctx));
    const anyOfUnion = z.union(options);
    baseSchema = hasExplicitType ? z.intersection(baseSchema, anyOfUnion) : anyOfUnion;
  }
  if (schema.oneOf && Array.isArray(schema.oneOf)) {
    const options = schema.oneOf.map((s) => convertSchema(s, ctx));
    const oneOfUnion = z.xor(options);
    baseSchema = hasExplicitType ? z.intersection(baseSchema, oneOfUnion) : oneOfUnion;
  }
  if (schema.allOf && Array.isArray(schema.allOf)) {
    if (schema.allOf.length === 0) {
      baseSchema = hasExplicitType ? baseSchema : z.any();
    } else {
      let result = hasExplicitType ? baseSchema : convertSchema(schema.allOf[0], ctx);
      const startIdx = hasExplicitType ? 0 : 1;
      for (let i = startIdx;i < schema.allOf.length; i++) {
        result = z.intersection(result, convertSchema(schema.allOf[i], ctx));
      }
      baseSchema = result;
    }
  }
  if (schema.nullable === true && ctx.version === "openapi-3.0") {
    baseSchema = z.nullable(baseSchema);
  }
  if (schema.readOnly === true) {
    baseSchema = z.readonly(baseSchema);
  }
  const extraMeta = {};
  const coreMetadataKeys = ["$id", "id", "$comment", "$anchor", "$vocabulary", "$dynamicRef", "$dynamicAnchor"];
  for (const key of coreMetadataKeys) {
    if (key in schema) {
      extraMeta[key] = schema[key];
    }
  }
  const contentMetadataKeys = ["contentEncoding", "contentMediaType", "contentSchema"];
  for (const key of contentMetadataKeys) {
    if (key in schema) {
      extraMeta[key] = schema[key];
    }
  }
  for (const key of Object.keys(schema)) {
    if (!RECOGNIZED_KEYS.has(key)) {
      extraMeta[key] = schema[key];
    }
  }
  if (Object.keys(extraMeta).length > 0) {
    ctx.registry.add(baseSchema, extraMeta);
  }
  return baseSchema;
}
function fromJSONSchema(schema, params) {
  if (typeof schema === "boolean") {
    return schema ? z.any() : z.never();
  }
  const version2 = detectVersion(schema, params?.defaultTarget);
  const defs = schema.$defs || schema.definitions || {};
  const ctx = {
    version: version2,
    defs,
    refs: new Map,
    processing: new Set,
    rootSchema: schema,
    registry: params?.registry ?? globalRegistry
  };
  return convertSchema(schema, ctx);
}
// node_modules/zod/v4/classic/coerce.js
var exports_coerce = {};
__export(exports_coerce, {
  string: () => string3,
  number: () => number3,
  date: () => date4,
  boolean: () => boolean3,
  bigint: () => bigint3
});
function string3(params) {
  return _coercedString(ZodString, params);
}
function number3(params) {
  return _coercedNumber(ZodNumber, params);
}
function boolean3(params) {
  return _coercedBoolean(ZodBoolean, params);
}
function bigint3(params) {
  return _coercedBigint(ZodBigInt, params);
}
function date4(params) {
  return _coercedDate(ZodDate, params);
}

// node_modules/zod/v4/classic/external.js
config(en_default());
// src/types.ts
var FretboardLabelTypeSchema = exports_external.enum(["None", "NoteName", "Interval"]);
var StateSchema = exports_external.object({
  index: exports_external.number(),
  naturalIndex: exports_external.number(),
  chordIndex: exports_external.number(),
  chordIntervals: exports_external.array(exports_external.number()),
  toggledIndexes: exports_external.number(),
  scaleFamilyIndex: exports_external.number(),
  modeIndex: exports_external.number(),
  midiToggledIndexes: exports_external.number(),
  isLeftHanded: exports_external.boolean(),
  isNutFlipped: exports_external.boolean(),
  fretboardLabelType: FretboardLabelTypeSchema,
  circleIsCNoon: exports_external.boolean(),
  tuningIndex: exports_external.number()
});

// src/events-module.ts
class Bus {
  listeners = [];
  name;
  constructor(name) {
    this.name = name;
  }
  subscribe(listener) {
    this.listeners.push(listener);
  }
  resubscribe(listener, index) {
    if (index === -1) {
      return this.listeners.push(listener) - 1;
    }
    this.listeners[index] = listener;
    return index;
  }
  publish(event) {
    for (let listener of this.listeners) {
      listener(event);
    }
  }
}
var stateChange = new Bus("stateChange");
var scaleChange = new Bus("scaleChange");
var tonicChange = new Bus("tonicChange");
var modeChange = new Bus("modeChange");
var chordChange = new Bus("chordChange");
var toggle = new Bus("toggle");
var tuningChange = new Bus("tuningChange");
var leftHandedChange = new Bus("leftHandedChange");
var flipNutChange = new Bus("flipNutChange");
var fretboardLabelChange = new Bus("fretboardLabelChange");
var chordIntervalChange = new Bus("chordIntervalChange");
var scaleFamilyChange = new Bus("scaleFamilyChange");
var midiNote = new Bus("midiNoteEvent");
var setCToNoon = new Bus("setCToNoonEvent");

// src/mod-module.ts
class Mod {
  size = 0;
  items;
  start = 0;
  constructor(items) {
    this.items = items;
    this.size = items.length;
  }
  setStart(start) {
    this.start = start % this.size;
  }
  itemAt(index) {
    return this.items[(this.start + index) % this.size];
  }
  toArray() {
    let newArray = [];
    for (let i = 0;i < this.size; i++) {
      newArray.push(this.items[(i + this.start) % this.size]);
    }
    return newArray;
  }
  merge(items) {
    let theseItems = this.toArray();
    return zip(theseItems, items);
  }
  merge3(items2, items3) {
    let theseItems = this.toArray();
    return zip3(theseItems, items2, items3);
  }
}
function zip(a, b) {
  if (a.length != b.length) {
    throw "Cannot merge arrays of different lengths";
  }
  return a.map((x, i) => [x, b[i]]);
}
function zip3(a, b, c) {
  if (a.length != b.length || a.length != c.length) {
    throw "Cannot merge arrays of different lengths";
  }
  return a.map((x, i) => [x, b[i], c[i]]);
}
function diff(size, a, b) {
  let ax = a % size;
  let bx = b % size;
  if (ax == bx)
    return 0;
  let d1 = bx - ax;
  let d2 = 0;
  if (d1 > 0) {
    d2 = -(ax + size - bx);
  } else {
    d2 = bx + size - ax;
  }
  return Math.abs(d1) > Math.abs(d2) ? d2 : d1;
}

// src/music-module.ts
var intervalName = {
  Nat: "",
  Maj: "M",
  Min: "m",
  Aug: "A",
  Dim: "d"
};
var getIntervalName = (interval) => intervalName[interval.type] + (interval.ord + 1);
var intervals = new Mod([
  [{ ord: 0, type: "Nat", colour: 16010050 }, { ord: 1, type: "Dim", colour: 16010050 }],
  [{ ord: 1, type: "Min", colour: 16025922 }, { ord: 0, type: "Aug", colour: 16025922 }],
  [{ ord: 1, type: "Maj", colour: 16039746 }, { ord: 2, type: "Dim", colour: 16039746 }],
  [{ ord: 2, type: "Min", colour: 16051778 }, { ord: 1, type: "Aug", colour: 16051778 }],
  [{ ord: 2, type: "Maj", colour: 9237570 }, { ord: 3, type: "Dim", colour: 9237570 }],
  [{ ord: 3, type: "Nat", colour: 4388031 }, { ord: 2, type: "Aug", colour: 4388031 }],
  [{ ord: 4, type: "Dim", colour: 4379892 }, { ord: 3, type: "Aug", colour: 4379892 }],
  [{ ord: 4, type: "Nat", colour: 4366068 }, { ord: 5, type: "Dim", colour: 4366068 }],
  [{ ord: 5, type: "Min", colour: 15024884 }, { ord: 4, type: "Aug", colour: 15024884 }],
  [{ ord: 5, type: "Maj", colour: 16007817 }, { ord: 6, type: "Dim", colour: 16007817 }],
  [{ ord: 6, type: "Min", colour: 16745090 }, { ord: 5, type: "Aug", colour: 16745090 }],
  [{ ord: 6, type: "Maj", colour: 16745212 }, { ord: 0, type: "Dim", colour: 16745212 }]
]);
function notesInScaleFamily(scaleFamily) {
  return scaleFamily.intervals.items.filter((x) => x).length;
}
var diatonicModes = [
  { name: "Lydian", index: 5 },
  { name: "Major / Ionian", index: 0 },
  { name: "Mixolydian", index: 7 },
  { name: "Dorian", index: 2 },
  { name: "N Minor / Aeolian", index: 9 },
  { name: "Phrygian", index: 4 },
  { name: "Locrian", index: 11 }
];
var harmonicMinorModes = [
  { name: "Lydian ♯2", index: 5 },
  { name: "Ionian ♯5", index: 0 },
  { name: "Superlocrian", index: 8 },
  { name: "Dorian ♯4", index: 2 },
  { name: "Harmonic Minor", index: 9 },
  { name: "Phrygian Dominant", index: 4 },
  { name: "Locrian ♯6", index: 11 }
];
var jazzMinorModes = [
  { name: "Lydian Dominant", index: 5 },
  { name: "Jazz Minor", index: 0 },
  { name: "Mixolydian ♭6", index: 7 },
  { name: "Assyrian", index: 2 },
  { name: "Locrian ♮2", index: 9 },
  { name: "Lydian Augmented", index: 3 },
  { name: "Altered scale", index: 11 }
];
var scaleFamily = [
  { index: 0, name: "diatonic", intervals: new Mod([true, false, true, false, true, true, false, true, false, true, false, true]), modes: diatonicModes, defaultModeIndex: 0 },
  { index: 1, name: "harmonic minor", intervals: new Mod([true, false, true, false, true, true, false, false, true, true, false, true]), modes: harmonicMinorModes, defaultModeIndex: 9 },
  { index: 2, name: "jazz minor", intervals: new Mod([true, false, true, true, false, true, false, true, false, true, false, true]), modes: jazzMinorModes, defaultModeIndex: 0 },
  { index: 3, name: "whole tone", intervals: new Mod([true, false, true, false, true, false, true, false, true, false, true, false]), modes: [{ name: "Whole Tone", index: 0 }], defaultModeIndex: 0 },
  { index: 4, name: "diminished", intervals: new Mod([true, false, true, true, false, true, true, false, true, true, false, true]), modes: [{ name: "Diminished", index: 0 }], defaultModeIndex: 0 }
];
var diatonic = new Mod([true, false, true, false, true, true, false, true, false, true, false, true]);
var indexList = new Mod([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
function createNoteSpec(naturalIndex, index) {
  let natural = naturals.filter((x) => x.index === naturalIndex)[0];
  if (!naturals.some((x) => x.index === naturalIndex)) {
    throw "naturalIndex is not valid: " + naturalIndex;
  }
  let offset = diff(12, naturalIndex, index);
  if (Math.abs(offset) > 2) {
    throw "offset between naturalIndex: " + naturalIndex + ", and index: " + index + ", is invalid: " + offset;
  }
  let noteLabel = noteLabels.filter((x) => x.offset === offset)[0];
  return {
    natural,
    index,
    offset,
    label: natural.label + noteLabel.label
  };
}
var naturals = [
  { id: 0, index: 0, label: "A" },
  { id: 1, index: 2, label: "B" },
  { id: 2, index: 3, label: "C" },
  { id: 3, index: 5, label: "D" },
  { id: 4, index: 7, label: "E" },
  { id: 5, index: 8, label: "F" },
  { id: 6, index: 10, label: "G" }
];
var naturalList = new Mod(naturals);
var noteNames = [
  { name: "A", index: 0 },
  { name: "A♯", index: 1 },
  { name: "A♭", index: 11 },
  { name: "B", index: 2 },
  { name: "B♯", index: 3 },
  { name: "B♭", index: 1 },
  { name: "C", index: 3 },
  { name: "C♯", index: 4 },
  { name: "C♭", index: 2 },
  { name: "D", index: 5 },
  { name: "D♯", index: 6 },
  { name: "D♭", index: 4 },
  { name: "E", index: 7 },
  { name: "E♯", index: 8 },
  { name: "E♭", index: 6 },
  { name: "F", index: 8 },
  { name: "F♯", index: 9 },
  { name: "F♭", index: 7 },
  { name: "G", index: 10 },
  { name: "G♯", index: 11 },
  { name: "G♭", index: 9 }
];
var noteLabels = [
  { offset: 0, label: "" },
  { offset: 1, label: "♯" },
  { offset: 2, label: "x" },
  { offset: -1, label: "♭" },
  { offset: -2, label: "♭♭" }
];
var nullNode = {
  scaleNote: {
    note: {
      natural: {
        id: 0,
        index: 0,
        label: ""
      },
      index: 0,
      offset: 0,
      label: ""
    },
    interval: {
      ord: 0,
      type: "Nat",
      colour: 0
    },
    intervalName: "",
    isScaleNote: false,
    noteNumber: 0
  },
  chordInterval: {
    ord: 0,
    type: "Nat",
    colour: 0
  },
  intervalName: "",
  isChordRoot: false,
  toggle: false,
  midiToggle: false
};
function generateScaleShim(noteSpec, mode, chordIndex, chordIntervals, toggledIndexes, toggledMidiNotes, scaleFamilyArg) {
  let scale = generateScale(noteSpec, mode, scaleFamilyArg);
  zip(scale, generateChordNumbers(scale, mode, scaleFamilyArg.intervals)).forEach((x) => x[0].chord = x[1]);
  if (chordIndex === -1) {
    return generateNodes(scale, mode, scale[0].note.index, chordIntervals, toggledIndexes, toggledMidiNotes, scaleFamilyArg.intervals);
  } else {
    return generateNodes(scale, mode, chordIndex, chordIntervals, toggledIndexes, toggledMidiNotes, scaleFamilyArg.intervals, true);
  }
}
function generateScale(noteSpec, mode, scaleFamilyArg) {
  indexList.setStart(noteSpec.index);
  naturalList.setStart(noteSpec.natural.id);
  scaleFamilyArg.intervals.setStart(mode.index);
  intervals.setStart(0);
  let workingSet = indexList.merge3(buildScaleCounter(scaleFamilyArg.intervals.toArray()), intervals.toArray());
  let isSevenNoteScale = notesInScaleFamily(scaleFamilyArg) == 7;
  return workingSet.map((item) => {
    let index = item[0];
    let isScaleNote = item[1][0];
    let noteNumber;
    let natural;
    let activeInterval;
    if (isScaleNote && isSevenNoteScale) {
      noteNumber = item[1][1];
      natural = naturalList.itemAt(noteNumber);
      activeInterval = item[2].filter((x) => x.ord == noteNumber)[0];
      if (activeInterval == null) {
        activeInterval = item[2][0];
      }
    } else {
      activeInterval = item[2][0];
      noteNumber = isScaleNote ? item[1][1] : activeInterval.ord;
      natural = naturalList.itemAt(activeInterval.ord);
    }
    return {
      note: createNoteSpec(natural.index, index),
      interval: activeInterval,
      intervalName: getIntervalName(activeInterval),
      isScaleNote,
      noteNumber
    };
  });
}
function generateNodes(scaleNotes, mode, chordIndex, chordIntervals, toggledIndexes, toggledMidiNotes, scaleFamilyIntervals, chordSelected = false) {
  let chordIndexOffset = (chordIndex + 12 - scaleNotes[0].note.index) % 12;
  intervals.setStart(12 - chordIndexOffset);
  scaleFamilyIntervals.setStart(mode.index);
  let startAt = scaleNotes.filter((x) => x.note.index === chordIndex)[0].noteNumber;
  let workingSet = intervals.merge3(scaleNotes, buildScaleCounter(scaleFamilyIntervals.toArray(), startAt));
  return workingSet.map((item) => {
    let chordIntervalCandidates = item[0];
    let scaleNote = item[1];
    let scaleCounter = item[2];
    let activeInterval = scaleNote.isScaleNote ? chordIntervalCandidates.filter((x) => x.ord === scaleCounter[1])[0] : chordIntervalCandidates[0];
    if (activeInterval == null) {
      activeInterval = chordIntervalCandidates[0];
    }
    return {
      scaleNote,
      chordInterval: activeInterval,
      intervalName: getIntervalName(activeInterval),
      isChordRoot: chordSelected && activeInterval.ord === 0 && activeInterval.type === "Nat",
      toggle: calculateToggle(activeInterval, scaleNote, chordSelected, toggledIndexes, chordIntervals),
      midiToggle: (toggledMidiNotes & 2 ** scaleNote.note.index) != 0
    };
  });
}
function buildScaleCounter(diatonic2, startAt = 0) {
  let noteCount = diatonic2.filter((x) => x).length;
  let i = (noteCount - startAt) % noteCount;
  return diatonic2.map((isNote) => {
    if (isNote) {
      let value = [true, i];
      i = (i + 1) % noteCount;
      return value;
    }
    return [false, 0];
  });
}
var romanNumeral = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];
function generateChordNumbers(scaleNotes, mode, scaleFamilyIntervals) {
  return scaleNotes.map((scaleNote, i) => {
    if (scaleNote.isScaleNote) {
      let roman = romanNumeral[scaleNote.noteNumber];
      let nodes = generateNodes(scaleNotes, mode, scaleNote.note.index, [], 0, 0, scaleFamilyIntervals);
      let diminished = "";
      let type = 1 /* Minor */;
      if (nodes.some((x) => x.scaleNote.isScaleNote && x.chordInterval.ord === 4 && x.chordInterval.type === "Dim")) {
        diminished = "°";
        type = 2 /* Diminished */;
      } else if (nodes.some((x) => x.scaleNote.isScaleNote && x.chordInterval.ord === 4 && x.chordInterval.type === "Aug")) {
        diminished = "+";
        type = 3 /* Augmented */;
      } else if (nodes.some((x) => x.scaleNote.isScaleNote && x.chordInterval.ord === 2 && x.chordInterval.type === "Maj")) {
        roman = roman.toLocaleUpperCase();
        type = 0 /* Major */;
      }
      return {
        romanNumeral: roman + diminished,
        type
      };
    }
    return {
      romanNumeral: "",
      type: 0 /* Major */
    };
  });
}
function calculateToggle(activeInterval, scaleNote, chordSelected, toggledIndexes, chordIntervals) {
  if (toggledIndexes === 0) {
    return chordSelected && scaleNote.isScaleNote && chordIntervals.some((x) => activeInterval.ord === x);
  }
  return (toggledIndexes & 2 ** scaleNote.note.index) != 0;
}
function fifths() {
  let indexes = [];
  let current = 0;
  for (let i = 0;i < 12; i++) {
    indexes.push(current);
    current = (current + 7) % 12;
  }
  return indexes;
}
function chromatic() {
  let indexes = [];
  for (let i = 0;i < 12; i++) {
    indexes.push(i);
  }
  return indexes;
}

// src/tonics-module.ts
var buttons;
function bg(natural) {
  let flatIndex = natural.index == 0 ? 11 : natural.index - 1;
  let sharpIndex = (natural.index + 1) % 12;
  return [
    { noteSpec: createNoteSpec(natural.index, flatIndex) },
    { noteSpec: createNoteSpec(natural.index, natural.index) },
    { noteSpec: createNoteSpec(natural.index, sharpIndex) }
  ];
}
function init2() {
  let pad = 5;
  let buttonHeight = 25;
  let svg = d3.select("#modes");
  let tonics = svg.append("g");
  let gs = tonics.selectAll("g").data(naturals).enter().append("g").attr("transform", function(d, i) {
    return "translate(0, " + (i * (buttonHeight + pad) + pad) + ")";
  }).selectAll("g").data((d) => bg(d), indexer).enter().append("g").attr("transform", function(d, i) {
    return "translate(" + i * 55 + ", 0)";
  });
  buttons = gs.append("rect").attr("x", pad).attr("y", 0).attr("strokeWidth", 2).attr("width", 40).attr("height", 25).attr("class", (d) => isSameNoteAsNatural(d.noteSpec) ? "tonic-button tonic-button-grey" : "tonic-button").on("click", (d) => tonicChange.publish({ noteSpec: d.noteSpec }));
  gs.append("text").attr("x", pad + 10).attr("y", 17).text(function(x) {
    return x.noteSpec.label;
  }).attr("class", "tonic-text");
  tonicChange.subscribe(listener);
}
function listener(tonicChanged) {
  let ds = [{
    noteSpec: tonicChanged.noteSpec
  }];
  buttons.data(ds, indexer).attr("class", "tonic-button tonic-button-selected").exit().attr("class", (d) => isSameNoteAsNatural(d.noteSpec) ? "tonic-button tonic-button-grey" : "tonic-button");
}
function indexer(d) {
  return d.noteSpec.label;
}
function isSameNoteAsNatural(noteSpec) {
  return naturals.some((x) => x.index === noteSpec.index && x.index != noteSpec.natural.index);
}

// src/modes-module.ts
var d32 = __toESM(require_d3(), 1);
var buttons2;
var modes;
function init3(scaleFamily2) {
  let svg = d32.select("#modes");
  modes = svg.append("g").attr("transform", "translate(0, 280)");
  drawButtons(scaleFamily2);
  modeChange.subscribe(update);
  scaleFamilyChange.subscribe(handleScaleFamilyChangedEvent);
}
function drawButtons(scaleFamily2) {
  let pad = 5;
  let buttonHeight = 25;
  modes.selectAll("g").remove();
  let gs = modes.selectAll("g").data(scaleFamily2.modes, index);
  gs.exit().remove();
  gs.enter().append("g").attr("transform", (d, i) => "translate(0, " + (i * (buttonHeight + pad) + pad) + ")");
  buttons2 = gs.append("rect").attr("x", pad).attr("y", 0).attr("strokeWidth", 2).attr("width", 150).attr("height", 25).attr("class", "mode-button").on("click", (d) => modeChange.publish({ mode: d }));
  gs.append("text").attr("x", pad + 10).attr("y", 17).text((x) => x.name).attr("class", "mode-text");
  let defaultMode = scaleFamily2.modes.find((x) => x.index == scaleFamily2.defaultModeIndex);
  highlightActiveMode(defaultMode);
}
function update(modeChange2) {
  highlightActiveMode(modeChange2.mode);
}
function highlightActiveMode(mode) {
  let modes2 = [mode];
  buttons2.data(modes2, index).attr("class", "mode-button mode-button-selected").exit().attr("class", "mode-button");
}
function handleScaleFamilyChangedEvent(scaleFamilyChangedEvent) {
  drawButtons(scaleFamilyChangedEvent.scaleFamily);
}
function index(mode) {
  return mode.index.toString();
}

// src/chord-interval-module.ts
var d33 = __toESM(require_d3(), 1);
var buttons3;
var toggle2 = 0;
function init4() {
  let radius = 10;
  let pad = 2;
  let svg = d33.select("#modes");
  let intervals2 = svg.append("g").attr("transform", "translate(0, 240)");
  let gs = intervals2.selectAll("g").data([0, 1, 2, 3, 4, 5, 6], function(i) {
    return i.toString();
  }).enter().append("g").attr("transform", function(d, i) {
    return "translate(" + (i * (radius * 2 + pad) + pad) + ", 0)";
  });
  buttons3 = gs.append("circle").attr("cx", radius).attr("cy", radius).attr("r", radius).attr("strokeWidth", 2).attr("class", "mode-button").on("click", onClick);
  gs.append("text").attr("x", radius).attr("y", radius + 5).attr("text-anchor", "middle").text(function(x) {
    return x + 1;
  });
  chordIntervalChange.subscribe(update2);
}
function onClick(x) {
  let updatedToggle = toggle2 ^ 2 ** x;
  let chordIntervals = [0, 1, 2, 3, 4, 5, 6].filter((x2) => (2 ** x2 & updatedToggle) === 2 ** x2);
  chordIntervalChange.publish({ chordIntervals });
}
function update2(event) {
  toggle2 = 0;
  event.chordIntervals.forEach((x) => toggle2 = toggle2 + 2 ** x);
  buttons3.data(event.chordIntervals, function(m) {
    return m.toString();
  }).attr("class", "mode-button mode-button-selected").exit().attr("class", "mode-button");
}

// src/cof-module.ts
var d34 = __toESM(require_d3(), 1);
class NoteCircle {
  indexer = (x) => x.index + "";
  constructor(svg2, noteIndexes, label) {
    let state = this.draw(svg2, rotate(noteIndexes, 3), label);
    let setCToNoonSubscriptionIndex = -1;
    scaleChange.subscribe((scaleChnaged) => {
      this.update(scaleChnaged, state);
      setCToNoonSubscriptionIndex = setCToNoon.resubscribe((setCToNoonEvent) => {
        let offset = setCToNoonEvent.isC ? 3 : 0;
        svg2.selectAll("*").remove();
        state = this.draw(svg2, rotate(noteIndexes, offset), label);
        this.update(scaleChnaged, state);
      }, setCToNoonSubscriptionIndex);
    });
  }
  draw(svg2, noteIndexes, label) {
    let pad = 50;
    let chordRadius = 240;
    let noteRadius = 200;
    let degreeRadius = 135;
    let innerRadius = 90;
    let cof = svg2.append("g").attr("transform", "translate(" + (noteRadius + pad) + ", " + (noteRadius + pad) + ")");
    cof.append("text").attr("text-anchor", "middle").attr("x", 0).attr("y", 0).text(label);
    let segments = generateSegments(noteIndexes);
    let noteArc = d34.svg.arc().innerRadius(degreeRadius).outerRadius(noteRadius);
    let degreeArc = d34.svg.arc().innerRadius(innerRadius).outerRadius(degreeRadius);
    let chordArc = d34.svg.arc().innerRadius(noteRadius).outerRadius(chordRadius);
    let noteSegments = cof.append("g").selectAll("path").data(segments, this.indexer).enter().append("path").attr("d", noteArc).attr("class", "note-segment").on("click", handleNoteClick);
    let noteText = cof.append("g").selectAll("text").data(segments).enter().append("text").attr("x", function(x) {
      return noteArc.centroid(x)[0];
    }).attr("y", function(x) {
      return noteArc.centroid(x)[1] + 11;
    }).text("").attr("class", "note-segment-text");
    let intervalSegments = cof.append("g").selectAll("path").data(segments, this.indexer).enter().append("path").attr("d", degreeArc).attr("class", "interval-segment").on("click", handleIntervalClick);
    let intervalNotes = cof.append("g").selectAll("circle").data(segments, this.indexer).enter().append("circle").style("pointer-events", "none").attr("r", 25).attr("cx", function(x) {
      return degreeArc.centroid(x)[0];
    }).attr("cy", function(x) {
      return degreeArc.centroid(x)[1];
    }).attr("class", "interval-note");
    let intervalText = cof.append("g").selectAll("text").data(segments, this.indexer).enter().append("text").attr("x", function(x) {
      return degreeArc.centroid(x)[0];
    }).attr("y", function(x) {
      return degreeArc.centroid(x)[1] + 8;
    }).text("").attr("class", "degree-segment-text");
    let chordSegments = cof.append("g").selectAll("path").data(segments, this.indexer).enter().append("path").attr("d", chordArc).attr("class", "chord-segment").on("click", handleChordClick);
    let chordNotes = cof.append("g").selectAll("circle").data(segments, this.indexer).enter().append("circle").style("pointer-events", "none").attr("r", 28).attr("cx", function(x) {
      return chordArc.centroid(x)[0];
    }).attr("cy", function(x) {
      return chordArc.centroid(x)[1];
    }).attr("class", "chord-segment-note");
    let chordText = cof.append("g").selectAll("text").data(segments, this.indexer).enter().append("text").attr("x", function(x) {
      return chordArc.centroid(x)[0];
    }).attr("y", function(x) {
      return chordArc.centroid(x)[1] + 8;
    }).text("").attr("class", "degree-segment-text");
    return {
      noteSegments,
      noteText,
      intervalSegments,
      intervalNotes,
      intervalText,
      chordSegments,
      chordNotes,
      chordText
    };
  }
  update(scaleChnaged, state) {
    let data = scaleChnaged.nodes.map((node) => ({
      startAngle: 0,
      endAngle: 0,
      scaleNote: {},
      index: node.scaleNote.note.index,
      node
    }));
    state.noteSegments.data(data, this.indexer).attr("class", (d, i) => "note-segment " + (d.node.scaleNote.isScaleNote ? i === 0 ? "note-segment-tonic" : "note-segment-scale" : ""));
    state.noteText.data(data, this.indexer).text((d) => d.node.scaleNote.note.label);
    state.intervalSegments.data(data, this.indexer).attr("class", (d) => d.node.scaleNote.isScaleNote ? "degree-segment-selected" : "interval-segment");
    state.intervalText.data(data, this.indexer).text((d) => d.node.intervalName);
    state.intervalNotes.data(data, this.indexer).attr("class", (d) => d.node.toggle ? "interval-note-selected" : "interval-note").style("fill", (d) => d.node.toggle ? "#" + d.node.chordInterval.colour.toString(16) : "none").style("stroke-width", (d) => d.node.midiToggle ? "20px" : "2px").style("stroke", (d) => d.node.midiToggle ? "OrangeRed" : d.node.toggle ? "black" : "none");
    state.chordText.data(data, this.indexer).text((d) => d.node.scaleNote.chord.romanNumeral + "");
    state.chordSegments.data(data, this.indexer).attr("class", (d) => d.node.scaleNote.isScaleNote ? getChordSegmentClass(d.node.scaleNote.chord) : "chord-segment");
    state.chordNotes.data(data, this.indexer).attr("class", (d) => d.node.isChordRoot ? getChordSegmentClass(d.node.scaleNote.chord) : "chord-segment-note");
  }
}
function getChordSegmentClass(chord) {
  if (chord.type === 2 /* Diminished */)
    return "chord-segment-dim";
  if (chord.type === 3 /* Augmented */)
    return "chord-segment-aug";
  if (chord.type === 1 /* Minor */)
    return "chord-segment-minor";
  if (chord.type === 0 /* Major */)
    return "chord-segment-major";
  throw "Unexpected ChordType";
}
function generateSegments(fifths2) {
  let count = fifths2.length;
  let items = [];
  let angle = Math.PI * (2 / count);
  for (let i = 0;i < count; i++) {
    let itemAngle = angle * i - angle / 2;
    items.push({
      startAngle: itemAngle,
      endAngle: itemAngle + angle,
      index: fifths2[i],
      node: nullNode
    });
  }
  return items;
}
function handleNoteClick(segment, i) {
  tonicChange.publish({
    noteSpec: replaceDoubleSharpsAndFlatsWithEquivalentNote(segment.node.scaleNote.note)
  });
}
function replaceDoubleSharpsAndFlatsWithEquivalentNote(noteSpec) {
  if (Math.abs(noteSpec.offset) > 1) {
    let naturalId = noteSpec.natural.id;
    let newNaturalId = noteSpec.offset > 0 ? naturalId + 1 % 7 : naturalId == 0 ? 6 : naturalId - 1;
    let newNatural = naturals.filter((x) => x.id === newNaturalId)[0];
    return createNoteSpec(newNatural.index, noteSpec.index);
  }
  return noteSpec;
}
function handleChordClick(segment, i) {
  chordChange.publish({ chordIndex: segment.node.scaleNote.note.index });
}
function handleIntervalClick(segment, i) {
  toggle.publish({ index: segment.node.scaleNote.note.index });
}
function rotate(array2, offset) {
  let newArray = [];
  for (let item of array2) {
    newArray.push((item + offset) % 12);
  }
  return newArray;
}

// src/gtr-module.ts
var d36 = __toESM(require_d3(), 1);

// src/tuning-module.ts
var d35 = __toESM(require_d3(), 1);
var guitarDots = [
  [3, 0],
  [5, 0],
  [7, 0],
  [9, 0],
  [12, -1],
  [12, 1],
  [15, 0]
];
var violaDots = [
  [2, 0],
  [4, 0],
  [5, 0],
  [7, 0],
  [12, -1],
  [12, 1]
];
var tuningInfos = [
  { tuning: "EADGBE", dots: guitarDots, description: "Guitar Standard" },
  { tuning: "EADGCF", dots: guitarDots, description: "All Fourths" },
  { tuning: "CGDAEB", dots: guitarDots, description: "All Fifths" },
  { tuning: "BFBFBF", dots: guitarDots, description: "Augmented Fourths" },
  { tuning: "DADGBE", dots: guitarDots, description: "Guitar Drop D" },
  { tuning: "DADGAD", dots: guitarDots, description: "Celtic" },
  { tuning: "CGDAEG", dots: guitarDots, description: "Guitar Fripp NST" },
  { tuning: "BEADGBE", dots: guitarDots, description: "Guitar 7 string" },
  { tuning: "DABEAB", dots: guitarDots, description: "Guitar Portuguese" },
  { tuning: "DGDGBD", dots: guitarDots, description: "Guitar Open G" },
  { tuning: "EADGDG", dots: guitarDots, description: "Guitar Convert" },
  { tuning: "E♭A♭D♭G♭B♭E♭", dots: guitarDots, description: "Guitar E♭ (Hendrix)" },
  { tuning: "BEADF♯B", dots: guitarDots, description: "Baritone B" },
  { tuning: "ADGCEA", dots: guitarDots, description: "Baritone A" },
  { tuning: "EADG", dots: guitarDots, description: "Bass Standard" },
  { tuning: "DADG", dots: guitarDots, description: "Bass Drop D" },
  { tuning: "EADGC", dots: guitarDots, description: "Bass 5 Strings Standard High" },
  { tuning: "BEADG", dots: guitarDots, description: "Bass 5 Strings Standard Low" },
  { tuning: "BEADGC", dots: guitarDots, description: "Bass 6 Strings Standard" },
  { tuning: "BEADGCF", dots: guitarDots, description: "Bass 7 Strings Standard" },
  { tuning: "DGBD", dots: guitarDots, description: "Banjo" },
  { tuning: "DGBD", dots: guitarDots, description: "Cavaquinho" },
  { tuning: "GCEA", dots: guitarDots, description: "Ukulele C" },
  { tuning: "CGDA", dots: violaDots, description: "Cello" },
  { tuning: "GDAE", dots: violaDots, description: "Violin" },
  { tuning: "CGDA", dots: violaDots, description: "Viola" }
];
var tunings = [];
function parseTuning(tuning) {
  let tokens = [];
  let result = [];
  let tokenIndex = 0;
  let lastWasChar = false;
  for (let i = 0;i < tuning.length; i++) {
    let noteChar = tuning.charAt(i);
    if ("ABCDEFG".indexOf(noteChar) >= 0) {
      tokens[tokenIndex] = noteChar;
      tokenIndex++;
      lastWasChar = true;
    } else if ("♯♭".indexOf(noteChar) >= 0 && lastWasChar) {
      tokens[tokenIndex - 1] = tokens[tokenIndex - 1] + noteChar;
      lastWasChar = false;
    } else {
      throw "Invalid tuning char";
    }
  }
  for (let token of tokens) {
    let noteName = noteNames.filter((x) => x.name === token);
    if (noteName.length != 1) {
      throw "Invalid token";
    }
    result.push(noteName[0].index);
  }
  return result;
}
function init5() {
  let index2 = 0;
  for (let info of tuningInfos) {
    let tuning = {
      index: index2,
      tuning: info.tuning,
      dots: info.dots,
      description: info.description,
      notes: parseTuning(info.tuning)
    };
    tunings.push(tuning);
    index2++;
  }
  d35.select("#tuning-dropdown").selectAll("div").data(tunings).enter().append("div").attr("class", "dropdown-content-item").on("click", (x) => raiseTuningChangedEvent(x)).text((x) => x.tuning + "   " + x.description);
  raiseTuningChangedEvent(tunings[0]);
}
function raiseTuningChangedEvent(tuning) {
  tuningChange.publish({
    index: tuning.index
  });
}

// src/gtr-module.ts
var currentTuning;
var currentState;
var notes;
var noteLabels2;
var numberOfFrets = 16;
var fretboardElement;
var isLeftHanded = false;
var isNutFlipped = false;
var fretboardLabelType = "NoteName";
var stringGap = 40;
var fretGap = 70;
var fretWidth = 5;
var noteRadius = 15;
var pad = 20;
function indexer2(stringNote) {
  return stringNote.index + "_" + stringNote.octave;
}
function init6() {
  tuningChange.subscribe(handleTuningChange);
  scaleChange.subscribe(update3);
  leftHandedChange.subscribe(handleLeftHandedChanged);
  flipNutChange.subscribe(handleFlipNutChanged);
  fretboardLabelChange.subscribe(handleLabelChange);
}
function handleTuningChange(tuningChangedEvent) {
  let newTuning = tunings.find((x) => x.index == tuningChangedEvent.index);
  updateFretboard(newTuning);
}
function handleLeftHandedChanged(lhEvent) {
  isLeftHanded = lhEvent.isLeftHanded;
  if (currentTuning != null) {
    updateFretboard(currentTuning);
  }
}
function setHandedness() {
  if (isLeftHanded) {
    fretboardElement.transform.baseVal.getItem(0).setTranslate(1200, 0);
    fretboardElement.transform.baseVal.getItem(1).setScale(-1, 1);
    noteLabels2.attr("transform", (d, i) => "translate(0, 0) scale(-1, 1)").attr("x", (d, i) => -(i * fretGap + pad + 30));
  } else {
    fretboardElement.transform.baseVal.getItem(0).setTranslate(0, 0);
    fretboardElement.transform.baseVal.getItem(1).setScale(1, 1);
    noteLabels2.attr("transform", (d, i) => "translate(0, 0) scale(1, 1)").attr("x", (d, i) => i * fretGap + pad + 30);
  }
}
function handleFlipNutChanged(fnEvent) {
  isNutFlipped = fnEvent.isNutFlipped;
  if (currentTuning != null) {
    updateFretboard(currentTuning);
  }
}
function handleLabelChange(lcEvent) {
  fretboardLabelType = lcEvent.labelType;
  setLabels();
}
function setLabels() {
  function setNoteName(note) {
    return note.node.scaleNote.isScaleNote || note.node.toggle ? note.node.scaleNote.note.label : "";
  }
  function setInterval(note) {
    return note.node.scaleNote.isScaleNote || note.node.toggle ? note.node.intervalName : "";
  }
  switch (fretboardLabelType) {
    case "None":
      noteLabels2.text("");
      break;
    case "NoteName":
      noteLabels2.text(setNoteName);
      break;
    case "Interval":
      noteLabels2.text(setInterval);
      break;
    default:
      throw new Error(`Unexpected label type: ${fretboardLabelType}`);
  }
}
function updateFretboard(tuningInfo) {
  currentTuning = tuningInfo;
  let fretData = getFretData(numberOfFrets);
  let dots = tuningInfo.dots;
  d36.selectAll("#gtr > *").remove();
  let svg2 = d36.select("#gtr");
  svg2.append("text").attr("class", "mode-text").attr("x", 30).attr("y", 11).text(tuningInfo.tuning + " " + tuningInfo.description + (isLeftHanded ? ", Left Handed" : "") + (isNutFlipped ? ", Nut Flipped" : ""));
  let gtr = svg2.append("g").attr("transform", "translate(0, 0) scale(1, 1)");
  fretboardElement = gtr.node();
  gtr.append("g").selectAll("rect").data(fretData).enter().append("rect").attr("x", function(d, i) {
    return (i + 1) * fretGap + pad - fretWidth;
  }).attr("y", pad + stringGap / 2 - fretWidth).attr("width", fretWidth).attr("height", stringGap * (tuningInfo.notes.length - 1) + fretWidth * 2).attr("fill", function(d, i) {
    return i === 0 ? "black" : "none";
  }).attr("stroke", "grey").attr("stroke-width", 1);
  gtr.append("g").selectAll("circle").data(dots).enter().append("circle").attr("r", 10).attr("cx", function(d) {
    return d[0] * fretGap + pad + 30 + d[1] * 10;
  }).attr("cy", function(d) {
    return tuningInfo.notes.length * stringGap + pad + 15;
  }).attr("fill", "lightgrey").attr("stroke", "none");
  let strings = gtr.append("g").selectAll("g").data(isNutFlipped ? tuningInfo.notes.slice() : tuningInfo.notes.slice().reverse(), (_, i) => i + "").enter().append("g").attr("transform", function(d, i) {
    return "translate(0, " + (i * stringGap + pad) + ")";
  });
  strings.append("line").attr("x1", pad + fretGap).attr("y1", stringGap / 2).attr("x2", pad + fretGap * numberOfFrets + 20).attr("y2", stringGap / 2).attr("stroke", "black").attr("stroke-width", 2);
  notes = strings.selectAll("circle").data(function(d) {
    return allNotesFrom(d, numberOfFrets);
  }, indexer2).enter().append("circle").attr("r", noteRadius).attr("cy", stringGap / 2).attr("cx", function(d, i) {
    return i * fretGap + pad + 30;
  }).on("click", (d) => toggle.publish({ index: d.index }));
  noteLabels2 = strings.selectAll("text").data(function(d) {
    return allNotesFrom(d, numberOfFrets);
  }, indexer2).enter().append("text").attr("transform", "translate(0, 0) scale(1, 1)").attr("text-anchor", "middle").attr("x", (d, i) => i * fretGap + pad + 30).attr("y", stringGap / 2 + 5).text("");
  setHandedness();
  if (currentState != null) {
    update3(currentState);
  }
}
function update3(stateChange2) {
  let hasToggledNotes = stateChange2.nodes.some((x) => x.toggle);
  let fill = function(d) {
    return d.node.toggle ? "white" : d.node.scaleNote.isScaleNote ? d.node.scaleNote.noteNumber === 0 ? hasToggledNotes ? "white" : "yellow" : "white" : "rgba(255, 255, 255, 0.01)";
  };
  let stroke = function(d) {
    return d.node.midiToggle ? "OrangeRed" : d.node.toggle ? "#" + d.node.chordInterval.colour.toString(16) : hasToggledNotes ? "none" : d.node.scaleNote.isScaleNote ? "grey" : "none";
  };
  let strokeWidth = function(d) {
    return d.node.midiToggle ? 10 : d.node.toggle ? 4 : d.node.scaleNote.isScaleNote ? 2 : 0;
  };
  let data = repeatTo(stateChange2.nodes, numberOfFrets);
  notes.data(data, indexer2).attr("fill", fill).attr("stroke", stroke).attr("stroke-width", strokeWidth);
  noteLabels2.data(data, indexer2);
  setLabels();
  currentState = stateChange2;
}
function allNotesFrom(index2, numberOfNotes) {
  let items = [];
  for (let i = 0;i < numberOfNotes; i++) {
    items.push({
      octave: Math.floor((i + 1) / 12),
      index: (i + index2) % 12,
      node: nullNode
    });
  }
  return items;
}
function getFretData(numberOfFrets2) {
  let data = [];
  for (let i = 0;i < numberOfFrets2; i++) {
    data.push(i);
  }
  return data;
}
function repeatTo(nodes, count) {
  let stringNotes = [];
  for (let i = 0;i <= Math.floor(count / 12); i++) {
    stringNotes = stringNotes.concat(nodes.map((x) => ({
      octave: i,
      index: x.scaleNote.note.index,
      node: x
    })));
  }
  return stringNotes;
}

// src/scale-family-module.ts
var d37 = __toESM(require_d3(), 1);
function init7() {
  d37.select("#scale-dropdown").selectAll("div").data(scaleFamily).enter().append("div").attr("class", "dropdown-content-item").on("click", (x) => raiseScaleFamilyChangedEvent(x)).text((x) => x.name);
}
function raiseScaleFamilyChangedEvent(scaleFamily2) {
  scaleFamilyChange.publish({
    scaleFamily: scaleFamily2
  });
}

// src/settings-module.ts
var exports_settings_module = {};
__export(exports_settings_module, {
  onSetCToNoon: () => onSetCToNoon,
  onLeftHandedClick: () => onLeftHandedClick,
  onFlipNut: () => onFlipNut,
  onFbNoteTextClick: () => onFbNoteTextClick,
  init: () => init8
});
function init8() {
  leftHandedChange.subscribe((e) => {
    let checkbox = document.getElementById("left-handed-checkbox");
    checkbox.checked = e.isLeftHanded;
  });
  flipNutChange.subscribe((e) => {
    let checkbox = document.getElementById("flip-nut-checkbox");
    checkbox.checked = e.isNutFlipped;
  });
  setCToNoon.subscribe((e) => {
    let checkbox = document.getElementById("set-c-to-noon-checkbox");
    checkbox.checked = e.isC;
  });
  fretboardLabelChange.subscribe((e) => {
    let selected = "fb-note-text-" + String(e.labelType);
    let radio = document.getElementById(selected);
    radio.checked = true;
  });
}
function onLeftHandedClick(e) {
  leftHandedChange.publish({ isLeftHanded: e.checked });
}
function onFlipNut(e) {
  flipNutChange.publish({ isNutFlipped: e.checked });
}
function onSetCToNoon(e) {
  setCToNoon.publish({ isC: e.checked });
}
function onFbNoteTextClick(e) {
  fretboardLabelChange.publish({ labelType: e.value });
}

// src/permalink-module.ts
var exports_permalink_module = {};
__export(exports_permalink_module, {
  populatePermalinkText: () => populatePermalinkText,
  init: () => init11,
  getState: () => getState,
  getCurrentState: () => getCurrentState,
  generatePermalink: () => generatePermalink
});

// src/cookie-module.ts
var cookieName = "gtr-cof-state-v4";
function init9() {
  stateChange.subscribe(bakeCookie2);
}
function bakeCookie2(stateChange2) {
  let json2 = JSON.stringify(stateChange2.state);
  document.cookie = cookieName + "=" + json2 + ";";
}
function readCookie2() {
  let result = document.cookie.match(new RegExp(cookieName + "=([^;]+)"));
  if (result != null) {
    let parsed = StateSchema.safeParse(JSON.parse(result[1]));
    if (!parsed.success) {
      console.log("Invalid cookie state:", parsed.error.message);
      return null;
    }
    return parsed.data;
  }
  return null;
}

// src/state-module.ts
var defaultState = {
  index: 3,
  naturalIndex: 3,
  chordIndex: -1,
  chordIntervals: [0, 2, 4],
  toggledIndexes: 0,
  scaleFamilyIndex: 0,
  modeIndex: 0,
  midiToggledIndexes: 0,
  isLeftHanded: false,
  isNutFlipped: false,
  fretboardLabelType: "NoteName",
  circleIsCNoon: true,
  tuningIndex: 0
};
var current = {
  index: defaultState.index,
  naturalIndex: defaultState.naturalIndex,
  chordIndex: defaultState.chordIndex,
  chordIntervals: defaultState.chordIntervals,
  toggledIndexes: defaultState.toggledIndexes,
  scaleFamilyIndex: defaultState.scaleFamilyIndex,
  modeIndex: defaultState.modeIndex,
  midiToggledIndexes: defaultState.midiToggledIndexes,
  isLeftHanded: defaultState.isLeftHanded,
  isNutFlipped: defaultState.isNutFlipped,
  fretboardLabelType: defaultState.fretboardLabelType,
  circleIsCNoon: defaultState.circleIsCNoon,
  tuningIndex: defaultState.tuningIndex
};
function init10() {
  try {
    let cookieState = readCookie2();
    if (cookieState !== null) {
      current = cookieState;
    }
  } catch (e) {}
  current = getState(current);
  let tempChordIndex = current.chordIndex;
  let tempToggledIndexes = current.toggledIndexes;
  let scaleFamily2 = scaleFamily.find((x) => x.index == current.scaleFamilyIndex);
  if (!scaleFamily2) {
    throw "scaleFamily is " + scaleFamily2 + ", current.scaleFamilyIndex = " + current.scaleFamilyIndex;
  }
  let mode = scaleFamily2.modes.find((x) => x.index == current.modeIndex);
  if (!mode) {
    throw "mode is " + mode + "current.modeIndex" + current.modeIndex;
  }
  scaleFamilyChange.publish({ scaleFamily: scaleFamily2 });
  modeChange.publish({ mode });
  chordIntervalChange.publish({ chordIntervals: current.chordIntervals });
  tonicChange.subscribe(tonicChanged);
  modeChange.subscribe(modeChanged);
  chordChange.subscribe(chordChanged);
  toggle.subscribe(toggle3);
  chordIntervalChange.subscribe(chordIntervalChanged);
  scaleFamilyChange.subscribe(scaleFamilyChanged);
  midiNote.subscribe(midiNote2);
  tonicChange.publish({ noteSpec: createNoteSpec(current.naturalIndex, current.index) });
  chordChange.publish({ chordIndex: tempChordIndex });
  current.toggledIndexes = tempToggledIndexes;
  updateScale();
  leftHandedChange.publish({ isLeftHanded: current.isLeftHanded });
  flipNutChange.publish({ isNutFlipped: current.isNutFlipped });
  fretboardLabelChange.publish({ labelType: current.fretboardLabelType });
  setCToNoon.publish({ isC: current.circleIsCNoon });
  tuningChange.publish({ index: current.tuningIndex });
  leftHandedChange.subscribe(leftHandedChange2);
  flipNutChange.subscribe(flipNutChange2);
  fretboardLabelChange.subscribe(fretboardLabelChange2);
  setCToNoon.subscribe(setCToNoon2);
  tuningChange.subscribe(tuningChange2);
}
function tonicChanged(tonicChangedEvent) {
  current.index = tonicChangedEvent.noteSpec.index;
  current.naturalIndex = tonicChangedEvent.noteSpec.natural.index;
  current.chordIndex = -1;
  updateScale();
}
function modeChanged(modeChangedEvent) {
  current.modeIndex = modeChangedEvent.mode.index;
  current.chordIndex = -1;
  updateScale();
}
function chordChanged(chordChangedEvent) {
  if (chordChangedEvent.chordIndex === current.chordIndex) {
    current.chordIndex = -1;
  } else {
    current.chordIndex = chordChangedEvent.chordIndex;
  }
  current.toggledIndexes = 0;
  updateScale();
}
function toggle3(toggleEvent) {
  current.toggledIndexes = current.toggledIndexes ^ 2 ** toggleEvent.index;
  updateScale();
}
function chordIntervalChanged(chordIntervalChangedEvent) {
  current.chordIntervals = chordIntervalChangedEvent.chordIntervals;
  current.toggledIndexes = 0;
  updateScale();
}
function scaleFamilyChanged(scaleFamilyChangedEvent) {
  current.scaleFamilyIndex = scaleFamilyChangedEvent.scaleFamily.index;
  current.modeIndex = scaleFamilyChangedEvent.scaleFamily.defaultModeIndex;
  current.chordIndex = -1;
  updateScale();
}
function midiNote2(midiNoteEvent) {
  current.midiToggledIndexes = midiNoteEvent.toggledIndexes;
  updateScale();
}
function leftHandedChange2(leftHandedChangeEvent) {
  current.isLeftHanded = leftHandedChangeEvent.isLeftHanded;
  publishStateChange();
}
function flipNutChange2(flipNutChangeEvent) {
  current.isNutFlipped = flipNutChangeEvent.isNutFlipped;
  publishStateChange();
}
function fretboardLabelChange2(fretboardLabelChangeEvent) {
  current.fretboardLabelType = fretboardLabelChangeEvent.labelType;
  publishStateChange();
}
function setCToNoon2(setCToNoonEvent) {
  current.circleIsCNoon = setCToNoonEvent.isC;
  publishStateChange();
}
function tuningChange2(tuningChangedEvent) {
  current.tuningIndex = tuningChangedEvent.index;
  publishStateChange();
}
function updateScale() {
  let scaleFamily2 = scaleFamily.find((x) => x.index == current.scaleFamilyIndex);
  if (!scaleFamily2) {
    throw "scaleFamily is " + scaleFamily2 + ", current.scaleFamilyIndex = " + current.scaleFamilyIndex;
  }
  let mode = scaleFamily2.modes.find((x) => x.index == current.modeIndex);
  if (!mode) {
    throw "mode is " + mode + "current.modeIndex" + current.modeIndex;
  }
  let noteSpec = createNoteSpec(current.naturalIndex, current.index);
  let nodes = generateScaleShim(noteSpec, mode, current.chordIndex, current.chordIntervals, current.toggledIndexes, current.midiToggledIndexes, scaleFamily2);
  current.toggledIndexes = nodes.filter((x) => x.toggle).map((x) => x.scaleNote.note.index).reduce((a, b) => a + 2 ** b, 0);
  scaleChange.publish({
    nodes,
    mode
  });
  publishStateChange();
}
function publishStateChange() {
  stateChange.publish({
    state: current
  });
}

// src/permalink-module.ts
var currentState2 = null;
function init11() {
  stateChange.subscribe((x) => currentState2 = x.state);
}
function populatePermalinkText() {
  let permalink = generatePermalink();
  let inputbox = document.getElementById("permalink-text");
  inputbox.value = permalink;
  inputbox.focus;
  inputbox.select;
  inputbox.setSelectionRange(0, 99999);
  document.execCommand("copy");
}
function generatePermalink() {
  if (currentState2 === null) {
    throw "No stateChange event published before querystring requested";
  }
  let params = new URLSearchParams;
  Object.keys(currentState2).forEach((key) => {
    if (currentState2[key] !== defaultState[key]) {
      params.append(key, currentState2[key]);
    }
  });
  return `${location.protocol}//${location.host}${location.pathname}?${params.toString()}`;
}
function getState(existingState) {
  let queryString = location.search;
  let params = new URLSearchParams(queryString);
  let mutableState = existingState;
  Object.keys(existingState).forEach((x) => {
    let value = params.get(x);
    if (value == null)
      return;
    switch (typeof mutableState[x]) {
      case "boolean":
        mutableState[x] = value === "true";
        break;
      case "number":
        mutableState[x] = parseInt(value);
        break;
      case "object":
        mutableState[x] = JSON.parse("[" + value + "]");
        break;
      case "string":
        mutableState[x] = value;
        break;
    }
    console.log(`${x} -> ${value}, ${typeof mutableState[x]}, ${mutableState[x]}`);
  });
  return mutableState;
}
function getCurrentState() {
  if (currentState2) {
    getState(currentState2);
  }
}

// src/gtr-cof.ts
window.settings = exports_settings_module;
window.permalink = exports_permalink_module;
init();
init2();
init3(scaleFamily[0]);
init4();
new NoteCircle(d38.select("#chromatic"), chromatic(), "Chromatic");
new NoteCircle(d38.select("#cof"), fifths(), "Circle of Fifths");
init6();
init5();
init7();
init8();
init11();
init10();
init9();
