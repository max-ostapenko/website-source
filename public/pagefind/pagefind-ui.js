(() => {
  var dn = Object.defineProperty;
  var S = (t, e) => {
    for (var n in e) dn(t, n, { get: e[n], enumerable: !0 });
  };
  function M() {}
  function Le(t) {
    return t();
  }
  function gt() {
    return Object.create(null);
  }
  function V(t) {
    t.forEach(Le);
  }
  function He(t) {
    return typeof t == "function";
  }
  function X(t, e) {
    return t != t
      ? e == e
      : t !== e || t && typeof t == "object" || typeof t == "function";
  }
  var Ae;
  function Be(t, e) {
    return Ae || (Ae = document.createElement("a")), Ae.href = e, t === Ae.href;
  }
  function bt(t) {
    return Object.keys(t).length === 0;
  }
  var Et = !1;
  function hn() {
    Et = !0;
  }
  function mn() {
    Et = !1;
  }
  function E(t, e) {
    t.appendChild(e);
  }
  function v(t, e, n) {
    t.insertBefore(e, n || null);
  }
  function R(t) {
    t.parentNode && t.parentNode.removeChild(t);
  }
  function oe(t, e) {
    for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
  }
  function y(t) {
    return document.createElement(t);
  }
  function pn(t) {
    return document.createElementNS("http://www.w3.org/2000/svg", t);
  }
  function O(t) {
    return document.createTextNode(t);
  }
  function k() {
    return O(" ");
  }
  function Z() {
    return O("");
  }
  function B(t, e, n, r) {
    return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r);
  }
  function g(t, e, n) {
    n == null
      ? t.removeAttribute(e)
      : t.getAttribute(e) !== n && t.setAttribute(e, n);
  }
  function gn(t) {
    return Array.from(t.childNodes);
  }
  function $(t, e) {
    e = "" + e, t.wholeText !== e && (t.data = e);
  }
  function Ge(t, e) {
    t.value = e ?? "";
  }
  function q(t, e, n) {
    t.classList[n ? "add" : "remove"](e);
  }
  var Y = class {
    constructor(e = !1) {
      this.is_svg = !1, this.is_svg = e, this.e = this.n = null;
    }
    c(e) {
      this.h(e);
    }
    m(e, n, r = null) {
      this.e ||
      (this.is_svg ? this.e = pn(n.nodeName) : this.e = y(n.nodeName),
        this.t = n,
        this.c(e)), this.i(r);
    }
    h(e) {
      this.e.innerHTML = e, this.n = Array.from(this.e.childNodes);
    }
    i(e) {
      for (let n = 0; n < this.n.length; n += 1) v(this.t, this.n[n], e);
    }
    p(e) {
      this.d(), this.h(e), this.i(this.a);
    }
    d() {
      this.n.forEach(R);
    }
  };
  var ie;
  function le(t) {
    ie = t;
  }
  function bn() {
    if (!ie) {
      throw new Error("Function called outside component initialization");
    }
    return ie;
  }
  function Ve(t) {
    bn().$$.on_mount.push(t);
  }
  var te = [];
  var ne = [], Fe = [], Ue = [], En = Promise.resolve(), Pe = !1;
  function yn() {
    Pe || (Pe = !0, En.then(Rt));
  }
  function qe(t) {
    Fe.push(t);
  }
  function yt(t) {
    Ue.push(t);
  }
  var Ie = new Set(), ee = 0;
  function Rt() {
    if (ee !== 0) return;
    let t = ie;
    do {
      try {
        for (; ee < te.length;) {
          let e = te[ee];
          ee++, le(e), Rn(e.$$);
        }
      } catch (e) {
        throw te.length = 0, ee = 0, e;
      }
      for (le(null), te.length = 0, ee = 0; ne.length;) ne.pop()();
      for (let e = 0; e < Fe.length; e += 1) {
        let n = Fe[e];
        Ie.has(n) || (Ie.add(n), n());
      }
      Fe.length = 0;
    } while (te.length);
    for (; Ue.length;) Ue.pop()();
    Pe = !1, Ie.clear(), le(t);
  }
  function Rn(t) {
    if (t.fragment !== null) {
      t.update(), V(t.before_update);
      let e = t.dirty;
      t.dirty = [-1],
        t.fragment && t.fragment.p(t.ctx, e),
        t.after_update.forEach(qe);
    }
  }
  var Me = new Set(), K;
  function ae() {
    K = { r: 0, c: [], p: K };
  }
  function ce() {
    K.r || V(K.c), K = K.p;
  }
  function j(t, e) {
    t && t.i && (Me.delete(t), t.i(e));
  }
  function U(t, e, n, r) {
    if (t && t.o) {
      if (Me.has(t)) return;
      Me.add(t),
        K.c.push(() => {
          Me.delete(t), r && (n && t.d(1), r());
        }),
        t.o(e);
    } else r && r();
  }
  var hs = typeof window < "u"
    ? window
    : typeof globalThis < "u"
    ? globalThis
    : global;
  function vt(t, e) {
    U(t, 1, 1, () => {
      e.delete(t.key);
    });
  }
  function Ct(t, e, n, r, s, l, i, o, a, _, m, c) {
    let d = t.length, b = l.length, u = d, f = {};
    for (; u--;) f[t[u].key] = u;
    let p = [], C = new Map(), D = new Map();
    for (u = b; u--;) {
      let w = c(s, l, u), H = n(w), N = i.get(H);
      N ? r && N.p(w, e) : (N = _(H, w), N.c()),
        C.set(H, p[u] = N),
        H in f && D.set(H, Math.abs(u - f[H]));
    }
    let z = new Set(), F = new Set();
    function W(w) {
      j(w, 1), w.m(o, m), i.set(w.key, w), m = w.first, b--;
    }
    for (; d && b;) {
      let w = p[b - 1], H = t[d - 1], N = w.key, J = H.key;
      w === H
        ? (m = w.first, d--, b--)
        : C.has(J)
        ? !i.has(N) || z.has(N)
          ? W(w)
          : F.has(J)
          ? d--
          : D.get(N) > D.get(J)
          ? (F.add(N), W(w))
          : (z.add(J), d--)
        : (a(H, i), d--);
    }
    for (; d--;) {
      let w = t[d];
      C.has(w.key) || a(w, i);
    }
    for (; b;) W(p[b - 1]);
    return p;
  }
  function wt(t, e, n) {
    let r = t.$$.props[e];
    r !== void 0 && (t.$$.bound[r] = n, n(t.$$.ctx[r]));
  }
  function $e(t) {
    t && t.c();
  }
  function Ne(t, e, n, r) {
    let { fragment: s, after_update: l } = t.$$;
    s && s.m(e, n),
      r || qe(() => {
        let i = t.$$.on_mount.map(Le).filter(He);
        t.$$.on_destroy ? t.$$.on_destroy.push(...i) : V(i), t.$$.on_mount = [];
      }),
      l.forEach(qe);
  }
  function ue(t, e) {
    let n = t.$$;
    n.fragment !== null &&
      (V(n.on_destroy),
        n.fragment && n.fragment.d(e),
        n.on_destroy = n.fragment = null,
        n.ctx = []);
  }
  function vn(t, e) {
    t.$$.dirty[0] === -1 && (te.push(t), yn(), t.$$.dirty.fill(0)),
      t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
  }
  function Q(t, e, n, r, s, l, i, o = [-1]) {
    let a = ie;
    le(t);
    let _ = t.$$ = {
      fragment: null,
      ctx: [],
      props: l,
      update: M,
      not_equal: s,
      bound: gt(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(e.context || (a ? a.$$.context : [])),
      callbacks: gt(),
      dirty: o,
      skip_bound: !1,
      root: e.target || a.$$.root,
    };
    i && i(_.root);
    let m = !1;
    if (
      _.ctx = n
        ? n(t, e.props || {}, (c, d, ...b) => {
          let u = b.length ? b[0] : d;
          return _.ctx && s(_.ctx[c], _.ctx[c] = u) &&
            (!_.skip_bound && _.bound[c] && _.bound[c](u), m && vn(t, c)),
            d;
        })
        : [],
        _.update(),
        m = !0,
        V(_.before_update),
        _.fragment = r ? r(_.ctx) : !1,
        e.target
    ) {
      if (e.hydrate) {
        hn();
        let c = gn(e.target);
        _.fragment && _.fragment.l(c), c.forEach(R);
      } else _.fragment && _.fragment.c();
      e.intro && j(t.$$.fragment),
        Ne(t, e.target, e.anchor, e.customElement),
        mn(),
        Rt();
    }
    le(a);
  }
  var Cn;
  typeof HTMLElement == "function" && (Cn = class extends HTMLElement {
    constructor() {
      super(), this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      let { on_mount: t } = this.$$;
      this.$$.on_disconnect = t.map(Le).filter(He);
      for (let e in this.$$.slotted) this.appendChild(this.$$.slotted[e]);
    }
    attributeChangedCallback(t, e, n) {
      this[t] = n;
    }
    disconnectedCallback() {
      V(this.$$.on_disconnect);
    }
    $destroy() {
      ue(this, 1), this.$destroy = M;
    }
    $on(t, e) {
      if (!He(e)) return M;
      let n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
      return n.push(e), () => {
        let r = n.indexOf(e);
        r !== -1 && n.splice(r, 1);
      };
    }
    $set(t) {
      this.$$set && !bt(t) &&
        (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
    }
  });
  var L = class {
    $destroy() {
      ue(this, 1), this.$destroy = M;
    }
    $on(e, n) {
      if (!He(n)) return M;
      let r = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
      return r.push(n), () => {
        let s = r.indexOf(n);
        s !== -1 && r.splice(s, 1);
      };
    }
    $set(e) {
      this.$$set && !bt(e) &&
        (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
    }
  };
  function A(t) {
    let e = typeof t == "string" ? t.charCodeAt(0) : t;
    return e >= 97 && e <= 122 || e >= 65 && e <= 90;
  }
  function x(t) {
    let e = typeof t == "string" ? t.charCodeAt(0) : t;
    return e >= 48 && e <= 57;
  }
  function G(t) {
    return A(t) || x(t);
  }
  var Tt = [
    "art-lojban",
    "cel-gaulish",
    "no-bok",
    "no-nyn",
    "zh-guoyu",
    "zh-hakka",
    "zh-min",
    "zh-min-nan",
    "zh-xiang",
  ];
  var xe = {
    "en-gb-oed": "en-GB-oxendict",
    "i-ami": "ami",
    "i-bnn": "bnn",
    "i-default": null,
    "i-enochian": null,
    "i-hak": "hak",
    "i-klingon": "tlh",
    "i-lux": "lb",
    "i-mingo": null,
    "i-navajo": "nv",
    "i-pwn": "pwn",
    "i-tao": "tao",
    "i-tay": "tay",
    "i-tsu": "tsu",
    "sgn-be-fr": "sfb",
    "sgn-be-nl": "vgt",
    "sgn-ch-de": "sgg",
    "art-lojban": "jbo",
    "cel-gaulish": null,
    "no-bok": "nb",
    "no-nyn": "nn",
    "zh-guoyu": "cmn",
    "zh-hakka": "hak",
    "zh-min": null,
    "zh-min-nan": "nan",
    "zh-xiang": "hsn",
  };
  var wn = {}.hasOwnProperty;
  function Oe(t, e = {}) {
    let n = kt(), r = String(t), s = r.toLowerCase(), l = 0;
    if (t == null) throw new Error("Expected string, got `" + t + "`");
    if (wn.call(xe, s)) {
      let o = xe[s];
      return (e.normalize === void 0 || e.normalize === null || e.normalize) &&
          typeof o == "string"
        ? Oe(o)
        : (n[Tt.includes(s) ? "regular" : "irregular"] = r, n);
    }
    for (; A(s.charCodeAt(l)) && l < 9;) l++;
    if (l > 1 && l < 9) {
      if (n.language = r.slice(0, l), l < 4) {
        let o = 0;
        for (
          ;
          s.charCodeAt(l) === 45 && A(s.charCodeAt(l + 1)) &&
          A(s.charCodeAt(l + 2)) && A(s.charCodeAt(l + 3)) &&
          !A(s.charCodeAt(l + 4));
        ) {
          if (o > 2) {
            return i(
              l,
              3,
              "Too many extended language subtags, expected at most 3 subtags",
            );
          }
          n.extendedLanguageSubtags.push(r.slice(l + 1, l + 4)), l += 4, o++;
        }
      }
      for (
        s.charCodeAt(l) === 45 && A(s.charCodeAt(l + 1)) &&
        A(s.charCodeAt(l + 2)) && A(s.charCodeAt(l + 3)) &&
        A(s.charCodeAt(l + 4)) && !A(s.charCodeAt(l + 5)) &&
        (n.script = r.slice(l + 1, l + 5), l += 5),
          s.charCodeAt(l) === 45 &&
          (A(s.charCodeAt(l + 1)) && A(s.charCodeAt(l + 2)) &&
              !A(s.charCodeAt(l + 3))
            ? (n.region = r.slice(l + 1, l + 3), l += 3)
            : x(s.charCodeAt(l + 1)) && x(s.charCodeAt(l + 2)) &&
              x(s.charCodeAt(l + 3)) && !x(s.charCodeAt(l + 4)) &&
              (n.region = r.slice(l + 1, l + 4), l += 4));
        s.charCodeAt(l) === 45;
      ) {
        let o = l + 1, a = o;
        for (; G(s.charCodeAt(a));) {
          if (a - o > 7) {
            return i(a, 1, "Too long variant, expected at most 8 characters");
          }
          a++;
        }
        if (a - o > 4 || a - o > 3 && x(s.charCodeAt(o))) {
          n.variants.push(r.slice(o, a)), l = a;
        } else break;
      }
      for (
        ;
        s.charCodeAt(l) === 45 &&
        !(s.charCodeAt(l + 1) === 120 || !G(s.charCodeAt(l + 1)) ||
          s.charCodeAt(l + 2) !== 45 || !G(s.charCodeAt(l + 3)));
      ) {
        let o = l + 2, a = 0;
        for (
          ;
          s.charCodeAt(o) === 45 && G(s.charCodeAt(o + 1)) &&
          G(s.charCodeAt(o + 2));
        ) {
          let _ = o + 1;
          for (o = _ + 2, a++; G(s.charCodeAt(o));) {
            if (o - _ > 7) {
              return i(
                o,
                2,
                "Too long extension, expected at most 8 characters",
              );
            }
            o++;
          }
        }
        if (!a) {
          return i(
            o,
            4,
            "Empty extension, extensions must have at least 2 characters of content",
          );
        }
        n.extensions.push({
          singleton: r.charAt(l + 1),
          extensions: r.slice(l + 3, o).split("-"),
        }), l = o;
      }
    } else l = 0;
    if (
      l === 0 && s.charCodeAt(l) === 120 ||
      s.charCodeAt(l) === 45 && s.charCodeAt(l + 1) === 120
    ) {
      l = l ? l + 2 : 1;
      let o = l;
      for (; s.charCodeAt(o) === 45 && G(s.charCodeAt(o + 1));) {
        let a = l + 1;
        for (o = a; G(s.charCodeAt(o));) {
          if (o - a > 7) {
            return i(
              o,
              5,
              "Too long private-use area, expected at most 8 characters",
            );
          }
          o++;
        }
        n.privateuse.push(r.slice(l + 1, o)), l = o;
      }
    }
    if (l !== r.length) return i(l, 6, "Found superfluous content after tag");
    return n;
    function i(o, a, _) {
      return e.warning && e.warning(_, a, o), e.forgiving ? n : kt();
    }
  }
  function kt() {
    return {
      language: null,
      extendedLanguageSubtags: [],
      script: null,
      region: null,
      variants: [],
      extensions: [],
      privateuse: [],
      irregular: null,
      regular: null,
    };
  }
  function St(t, e, n) {
    let r = t.slice();
    return r[8] = e[n][0], r[9] = e[n][1], r;
  }
  function Tn(t) {
    let e, n, r, s, l, i = t[0] && At(t);
    return {
      c() {
        i && i.c(),
          e = k(),
          n = y("div"),
          r = y("p"),
          r.textContent = `${t[3](30)}`,
          s = k(),
          l = y("p"),
          l.textContent = `${t[3](40)}`,
          g(
            r,
            "class",
            "pagefind-ui__result-title pagefind-ui__loading svelte-j9e30",
          ),
          g(
            l,
            "class",
            "pagefind-ui__result-excerpt pagefind-ui__loading svelte-j9e30",
          ),
          g(n, "class", "pagefind-ui__result-inner svelte-j9e30");
      },
      m(o, a) {
        i && i.m(o, a), v(o, e, a), v(o, n, a), E(n, r), E(n, s), E(n, l);
      },
      p(o, a) {
        o[0]
          ? i || (i = At(o), i.c(), i.m(e.parentNode, e))
          : i && (i.d(1), i = null);
      },
      d(o) {
        i && i.d(o), o && R(e), o && R(n);
      },
    };
  }
  function kn(t) {
    let e,
      n,
      r,
      s,
      l = t[1].meta?.title + "",
      i,
      o,
      a,
      _ = t[1].excerpt + "",
      m,
      c = t[0] && Ft(t),
      d = t[2].length && Ht(t);
    return {
      c() {
        c && c.c(),
          e = k(),
          n = y("div"),
          r = y("p"),
          s = y("a"),
          o = k(),
          a = y("p"),
          m = k(),
          d && d.c(),
          g(s, "class", "pagefind-ui__result-link svelte-j9e30"),
          g(s, "href", i = t[1].meta?.url || t[1].url),
          g(r, "class", "pagefind-ui__result-title svelte-j9e30"),
          g(a, "class", "pagefind-ui__result-excerpt svelte-j9e30"),
          g(n, "class", "pagefind-ui__result-inner svelte-j9e30");
      },
      m(b, u) {
        c && c.m(b, u),
          v(b, e, u),
          v(b, n, u),
          E(n, r),
          E(r, s),
          s.innerHTML = l,
          E(n, o),
          E(n, a),
          a.innerHTML = _,
          E(n, m),
          d && d.m(n, null);
      },
      p(b, u) {
        b[0]
          ? c ? c.p(b, u) : (c = Ft(b), c.c(), c.m(e.parentNode, e))
          : c && (c.d(1), c = null),
          u & 2 && l !== (l = b[1].meta?.title + "") && (s.innerHTML = l),
          u & 2 && i !== (i = b[1].meta?.url || b[1].url) && g(s, "href", i),
          u & 2 && _ !== (_ = b[1].excerpt + "") && (a.innerHTML = _),
          b[2].length
            ? d ? d.p(b, u) : (d = Ht(b), d.c(), d.m(n, null))
            : d && (d.d(1), d = null);
      },
      d(b) {
        c && c.d(b), b && R(e), b && R(n), d && d.d();
      },
    };
  }
  function At(t) {
    let e;
    return {
      c() {
        e = y("div"),
          g(
            e,
            "class",
            "pagefind-ui__result-thumb pagefind-ui__loading svelte-j9e30",
          );
      },
      m(n, r) {
        v(n, e, r);
      },
      d(n) {
        n && R(e);
      },
    };
  }
  function Ft(t) {
    let e, n = t[1].meta.image && Mt(t);
    return {
      c() {
        e = y("div"),
          n && n.c(),
          g(e, "class", "pagefind-ui__result-thumb svelte-j9e30");
      },
      m(r, s) {
        v(r, e, s), n && n.m(e, null);
      },
      p(r, s) {
        r[1].meta.image
          ? n ? n.p(r, s) : (n = Mt(r), n.c(), n.m(e, null))
          : n && (n.d(1), n = null);
      },
      d(r) {
        r && R(e), n && n.d();
      },
    };
  }
  function Mt(t) {
    let e, n, r;
    return {
      c() {
        e = y("img"),
          g(e, "class", "pagefind-ui__result-image svelte-j9e30"),
          Be(e.src, n = t[1].meta?.image) || g(e, "src", n),
          g(e, "alt", r = t[1].meta?.image_alt || t[1].meta?.title);
      },
      m(s, l) {
        v(s, e, l);
      },
      p(s, l) {
        l & 2 && !Be(e.src, n = s[1].meta?.image) && g(e, "src", n),
          l & 2 && r !== (r = s[1].meta?.image_alt || s[1].meta?.title) &&
          g(e, "alt", r);
      },
      d(s) {
        s && R(e);
      },
    };
  }
  function Ht(t) {
    let e, n = t[2], r = [];
    for (let s = 0; s < n.length; s += 1) r[s] = Nt(St(t, n, s));
    return {
      c() {
        e = y("ul");
        for (let s = 0; s < r.length; s += 1) r[s].c();
        g(e, "class", "pagefind-ui__result-tags svelte-j9e30");
      },
      m(s, l) {
        v(s, e, l);
        for (let i = 0; i < r.length; i += 1) r[i].m(e, null);
      },
      p(s, l) {
        if (l & 4) {
          n = s[2];
          let i;
          for (i = 0; i < n.length; i += 1) {
            let o = St(s, n, i);
            r[i] ? r[i].p(o, l) : (r[i] = Nt(o), r[i].c(), r[i].m(e, null));
          }
          for (; i < r.length; i += 1) r[i].d(1);
          r.length = n.length;
        }
      },
      d(s) {
        s && R(e), oe(r, s);
      },
    };
  }
  function Nt(t) {
    let e, n, r = t[8].replace(/^(\w)/, Ot) + "", s, l, i = t[9] + "", o;
    return {
      c() {
        e = y("li"),
          n = new Y(!1),
          s = O(": "),
          l = new Y(!1),
          o = k(),
          n.a = s,
          l.a = o,
          g(e, "class", "pagefind-ui__result-tag svelte-j9e30");
      },
      m(a, _) {
        v(a, e, _), n.m(r, e), E(e, s), l.m(i, e), E(e, o);
      },
      p(a, _) {
        _ & 4 && r !== (r = a[8].replace(/^(\w)/, Ot) + "") && n.p(r),
          _ & 4 && i !== (i = a[9] + "") && l.p(i);
      },
      d(a) {
        a && R(e);
      },
    };
  }
  function Sn(t) {
    let e;
    function n(l, i) {
      return l[1] ? kn : Tn;
    }
    let r = n(t, -1), s = r(t);
    return {
      c() {
        e = y("li"), s.c(), g(e, "class", "pagefind-ui__result svelte-j9e30");
      },
      m(l, i) {
        v(l, e, i), s.m(e, null);
      },
      p(l, [i]) {
        r === (r = n(l, i)) && s
          ? s.p(l, i)
          : (s.d(1), s = r(l), s && (s.c(), s.m(e, null)));
      },
      i: M,
      o: M,
      d(l) {
        l && R(e), s.d();
      },
    };
  }
  var Ot = (t) => t.toLocaleUpperCase();
  function An(t, e, n) {
    let { show_images: r = !0 } = e,
      { process_result: s = null } = e,
      { result: l = { data: async () => {} } } = e,
      i = ["title", "image", "image_alt", "url"],
      o,
      a = [],
      _ = async (c) => {
        n(1, o = await c.data()),
          n(1, o = s?.(o) ?? o),
          n(2, a = Object.entries(o.meta).filter(([d]) => !i.includes(d)));
      },
      m = (c = 30) => ". ".repeat(Math.floor(10 + Math.random() * c));
    return t.$$set = (c) => {
      "show_images" in c && n(0, r = c.show_images),
        "process_result" in c && n(4, s = c.process_result),
        "result" in c && n(5, l = c.result);
    },
      t.$$.update = () => {
        if (t.$$.dirty & 32) e: _(l);
      },
      [r, o, a, m, s, l];
  }
  var We = class extends L {
      constructor(e) {
        super(),
          Q(this, e, An, Sn, X, {
            show_images: 0,
            process_result: 4,
            result: 5,
          });
      }
    },
    jt = We;
  function Dt(t, e, n) {
    let r = t.slice();
    return r[7] = e[n][0], r[8] = e[n][1], r[9] = e, r[10] = n, r;
  }
  function zt(t, e, n) {
    let r = t.slice();
    return r[11] = e[n][0], r[12] = e[n][1], r[13] = e, r[14] = n, r;
  }
  function It(t) {
    let e,
      n,
      r = t[3]("filters_label") + "",
      s,
      l,
      i = Object.entries(t[1]),
      o = [];
    for (let a = 0; a < i.length; a += 1) o[a] = qt(Dt(t, i, a));
    return {
      c() {
        e = y("fieldset"), n = y("legend"), s = O(r), l = k();
        for (let a = 0; a < o.length; a += 1) o[a].c();
        g(n, "class", "pagefind-ui__filter-panel-label svelte-1v2r7ls"),
          g(e, "class", "pagefind-ui__filter-panel svelte-1v2r7ls");
      },
      m(a, _) {
        v(a, e, _), E(e, n), E(n, s), E(e, l);
        for (let m = 0; m < o.length; m += 1) o[m].m(e, null);
      },
      p(a, _) {
        if (
          _ & 8 && r !== (r = a[3]("filters_label") + "") && $(s, r), _ & 23
        ) {
          i = Object.entries(a[1]);
          let m;
          for (m = 0; m < i.length; m += 1) {
            let c = Dt(a, i, m);
            o[m] ? o[m].p(c, _) : (o[m] = qt(c), o[m].c(), o[m].m(e, null));
          }
          for (; m < o.length; m += 1) o[m].d(1);
          o.length = i.length;
        }
      },
      d(a) {
        a && R(e), oe(o, a);
      },
    };
  }
  function Ut(t) {
    let e,
      n,
      r,
      s,
      l,
      i,
      o,
      a,
      _ = t[11] + "",
      m,
      c = t[12] + "",
      d,
      b,
      u,
      f,
      p,
      C;
    function D() {
      t[6].call(n, t[7], t[11]);
    }
    return {
      c() {
        e = y("div"),
          n = y("input"),
          i = k(),
          o = y("label"),
          a = new Y(!1),
          m = O(" ("),
          d = O(c),
          b = O(")"),
          f = k(),
          g(n, "class", "pagefind-ui__filter-checkbox svelte-1v2r7ls"),
          g(n, "type", "checkbox"),
          g(n, "id", r = t[7] + "-" + t[11]),
          g(n, "name", s = t[7]),
          n.__value = l = t[11],
          n.value = n.__value,
          a.a = m,
          g(o, "class", "pagefind-ui__filter-label svelte-1v2r7ls"),
          g(o, "for", u = t[7] + "-" + t[11]),
          g(e, "class", "pagefind-ui__filter-value svelte-1v2r7ls"),
          q(e, "pagefind-ui__filter-value--checked", t[0][`${t[7]}:${t[11]}`]);
      },
      m(z, F) {
        v(z, e, F),
          E(e, n),
          n.checked = t[0][`${t[7]}:${t[11]}`],
          E(e, i),
          E(e, o),
          a.m(_, o),
          E(o, m),
          E(o, d),
          E(o, b),
          E(e, f),
          p || (C = B(n, "change", D), p = !0);
      },
      p(z, F) {
        t = z,
          F & 2 && r !== (r = t[7] + "-" + t[11]) && g(n, "id", r),
          F & 2 && s !== (s = t[7]) && g(n, "name", s),
          F & 2 && l !== (l = t[11]) && (n.__value = l, n.value = n.__value),
          F & 3 && (n.checked = t[0][`${t[7]}:${t[11]}`]),
          F & 2 && _ !== (_ = t[11] + "") && a.p(_),
          F & 2 && c !== (c = t[12] + "") && $(d, c),
          F & 2 && u !== (u = t[7] + "-" + t[11]) && g(o, "for", u),
          F & 3 &&
          q(e, "pagefind-ui__filter-value--checked", t[0][`${t[7]}:${t[11]}`]);
      },
      d(z) {
        z && R(e), p = !1, C();
      },
    };
  }
  function Pt(t) {
    let e, n = (t[2] || t[12] || t[0][`${t[7]}:${t[11]}`]) && Ut(t);
    return {
      c() {
        n && n.c(), e = Z();
      },
      m(r, s) {
        n && n.m(r, s), v(r, e, s);
      },
      p(r, s) {
        r[2] || r[12] || r[0][`${r[7]}:${r[11]}`]
          ? n ? n.p(r, s) : (n = Ut(r), n.c(), n.m(e.parentNode, e))
          : n && (n.d(1), n = null);
      },
      d(r) {
        n && n.d(r), r && R(e);
      },
    };
  }
  function qt(t) {
    let e,
      n,
      r = t[7].replace(/^(\w)/, Lt) + "",
      s,
      l,
      i,
      o = t[7] + "",
      a,
      _,
      m = Object.entries(t[8] || {}),
      c = [];
    for (let d = 0; d < m.length; d += 1) c[d] = Pt(zt(t, m, d));
    return {
      c() {
        e = y("details"),
          n = y("summary"),
          s = k(),
          l = y("fieldset"),
          i = y("legend"),
          a = k();
        for (let d = 0; d < c.length; d += 1) c[d].c();
        _ = k(),
          g(n, "class", "pagefind-ui__filter-name svelte-1v2r7ls"),
          g(i, "class", "pagefind-ui__filter-group-label svelte-1v2r7ls"),
          g(l, "class", "pagefind-ui__filter-group svelte-1v2r7ls"),
          g(e, "class", "pagefind-ui__filter-block svelte-1v2r7ls"),
          e.open = t[4];
      },
      m(d, b) {
        v(d, e, b),
          E(e, n),
          n.innerHTML = r,
          E(e, s),
          E(e, l),
          E(l, i),
          i.innerHTML = o,
          E(l, a);
        for (let u = 0; u < c.length; u += 1) c[u].m(l, null);
        E(e, _);
      },
      p(d, b) {
        if (
          b & 2 && r !== (r = d[7].replace(/^(\w)/, Lt) + "") &&
          (n.innerHTML = r),
            b & 2 && o !== (o = d[7] + "") && (i.innerHTML = o),
            b & 7
        ) {
          m = Object.entries(d[8] || {});
          let u;
          for (u = 0; u < m.length; u += 1) {
            let f = zt(d, m, u);
            c[u] ? c[u].p(f, b) : (c[u] = Pt(f), c[u].c(), c[u].m(l, null));
          }
          for (; u < c.length; u += 1) c[u].d(1);
          c.length = m.length;
        }
        b & 16 && (e.open = d[4]);
      },
      d(d) {
        d && R(e), oe(c, d);
      },
    };
  }
  function Fn(t) {
    let e = t[1] && Object.entries(t[1]).length, n, r = e && It(t);
    return {
      c() {
        r && r.c(), n = Z();
      },
      m(s, l) {
        r && r.m(s, l), v(s, n, l);
      },
      p(s, [l]) {
        l & 2 && (e = s[1] && Object.entries(s[1]).length),
          e
            ? r ? r.p(s, l) : (r = It(s), r.c(), r.m(n.parentNode, n))
            : r && (r.d(1), r = null);
      },
      i: M,
      o: M,
      d(s) {
        r && r.d(s), s && R(n);
      },
    };
  }
  var Lt = (t) => t.toLocaleUpperCase();
  function Mn(t, e, n) {
    let { available_filters: r = null } = e,
      { show_empty_filters: s = !0 } = e,
      { translate: l = () => "" } = e,
      i = {},
      o = !1,
      a = !1;
    function _(m, c) {
      i[`${m}:${c}`] = this.checked, n(0, i);
    }
    return t.$$set = (m) => {
      "available_filters" in m && n(1, r = m.available_filters),
        "show_empty_filters" in m && n(2, s = m.show_empty_filters),
        "translate" in m && n(3, l = m.translate);
    },
      t.$$.update = () => {
        if (t.$$.dirty & 34) {
          e: if (r && !o) {
            n(5, o = !0);
            let m = Object.entries(r || {});
            m.length === 1 && Object.entries(m[0][1])?.length <= 6 &&
              n(4, a = !0);
          }
        }
      },
      [i, r, s, l, a, o, _];
  }
  var Je = class extends L {
      constructor(e) {
        super(),
          Q(this, e, Mn, Fn, X, {
            available_filters: 1,
            show_empty_filters: 2,
            translate: 3,
            selected_filters: 0,
          });
      }
      get selected_filters() {
        return this.$$.ctx[0];
      }
    },
    Bt = Je;
  var Ke = {};
  S(Ke, {
    comments: () => Nn,
    default: () => Dn,
    direction: () => On,
    strings: () => jn,
    thanks_to: () => Hn,
  });
  var Hn = "Jan Claasen",
    Nn = "",
    On = "ltr",
    jn = {
      placeholder: "Soek",
      clear_search: "Opruim",
      load_more: "Laai nog resultate",
      search_label: "Soek hierdie webwerf",
      filters_label: "Filters",
      zero_results: "Geen resultate vir [SEARCH_TERM]",
      many_results: "[COUNT] resultate vir [SEARCH_TERM]",
      one_result: "[COUNT] resultate vir [SEARCH_TERM]",
      alt_search:
        "Geen resultate vir [SEARCH_TERM]. Toon resultate vir [DIFFERENT_TERM] in plaas daarvan",
      search_suggestion:
        "Geen resultate vir [SEARCH_TERM]. Probeer eerder een van die volgende terme:",
      searching: "Soek vir [SEARCH_TERM]",
    },
    Dn = { thanks_to: Hn, comments: Nn, direction: On, strings: jn };
  var Ye = {};
  S(Ye, {
    comments: () => In,
    default: () => qn,
    direction: () => Un,
    strings: () => Pn,
    thanks_to: () => zn,
  });
  var zn = "Pablo Villaverde <https://github.com/pvillaverde>",
    In = "",
    Un = "ltr",
    Pn = {
      placeholder: "Cerca",
      clear_search: "Netejar",
      load_more: "Veure m\xE9es resultats",
      search_label: "Cerca en aquest lloc",
      filters_label: "Filtres",
      zero_results: "No es van trobar resultats per [SEARCH_TERM]",
      many_results: "[COUNT] resultats trobats per [SEARCH_TERM]",
      one_result: "[COUNT] resultat trobat per [SEARCH_TERM]",
      alt_search:
        "No es van trobar resultats per [SEARCH_TERM]. Mostrant al seu lloc resultats per [DIFFERENT_TERM]",
      search_suggestion:
        "No es van trobar resultats per [SEARCH_TERM]. Proveu una de les cerques seg\xFCents:",
      searching: "Cercant [SEARCH_TERM]...",
    },
    qn = { thanks_to: zn, comments: In, direction: Un, strings: Pn };
  var Xe = {};
  S(Xe, {
    comments: () => Bn,
    default: () => $n,
    direction: () => Gn,
    strings: () => Vn,
    thanks_to: () => Ln,
  });
  var Ln = "Jan Claasen",
    Bn = "",
    Gn = "ltr",
    Vn = {
      placeholder: "Suche",
      clear_search: "L\xF6schen",
      load_more: "Mehr Ergebnisse laden",
      search_label: "Suche diese Seite",
      filters_label: "Filter",
      zero_results: "Keine Ergebnisse f\xFCr [SEARCH_TERM]",
      many_results: "[COUNT] Ergebnisse f\xFCr [SEARCH_TERM]",
      one_result: "[COUNT] Ergebnis f\xFCr [SEARCH_TERM]",
      alt_search:
        "Keine Ergebnisse f\xFCr [SEARCH_TERM]. Stattdessen werden Ergebnisse f\xFCr [DIFFERENT_TERM] angezeigt",
      search_suggestion:
        "Keine Ergebnisse f\xFCr [SEARCH_TERM]. Versuchen Sie eine der folgenden Suchen:",
      searching: "Suche f\xFCr [SEARCH_TERM]",
    },
    $n = { thanks_to: Ln, comments: Bn, direction: Gn, strings: Vn };
  var Ze = {};
  S(Ze, {
    comments: () => Wn,
    default: () => Yn,
    direction: () => Jn,
    strings: () => Kn,
    thanks_to: () => xn,
  });
  var xn = "Liam Bigelow <liam@cloudcannon.com>",
    Wn = "",
    Jn = "ltr",
    Kn = {
      placeholder: "Search",
      clear_search: "Clear",
      load_more: "Load more results",
      search_label: "Search this site",
      filters_label: "Filters",
      zero_results: "No results for [SEARCH_TERM]",
      many_results: "[COUNT] results for [SEARCH_TERM]",
      one_result: "[COUNT] result for [SEARCH_TERM]",
      alt_search:
        "No results for [SEARCH_TERM]. Showing results for [DIFFERENT_TERM] instead",
      search_suggestion:
        "No results for [SEARCH_TERM]. Try one of the following searches:",
      searching: "Searching for [SEARCH_TERM]...",
    },
    Yn = { thanks_to: xn, comments: Wn, direction: Jn, strings: Kn };
  var Qe = {};
  S(Qe, {
    comments: () => Zn,
    default: () => tr,
    direction: () => Qn,
    strings: () => er,
    thanks_to: () => Xn,
  });
  var Xn = "Pablo Villaverde <https://github.com/pvillaverde>",
    Zn = "",
    Qn = "ltr",
    er = {
      placeholder: "Buscar",
      clear_search: "Limpiar",
      load_more: "Ver m\xE1s resultados",
      search_label: "Buscar en este sitio",
      filters_label: "Filtros",
      zero_results: "No se encontraron resultados para [SEARCH_TERM]",
      many_results: "[COUNT] resultados encontrados para [SEARCH_TERM]",
      one_result: "[COUNT] resultado encontrado para [SEARCH_TERM]",
      alt_search:
        "No se encontraron resultados para [SEARCH_TERM]. Mostrando en su lugar resultados para [DIFFERENT_TERM]",
      search_suggestion:
        "No se encontraron resultados para [SEARCH_TERM]. Prueba una de las siguientes b\xFAsquedas:",
      searching: "Buscando [SEARCH_TERM]...",
    },
    tr = { thanks_to: Xn, comments: Zn, direction: Qn, strings: er };
  var et = {};
  S(et, {
    comments: () => rr,
    default: () => ir,
    direction: () => sr,
    strings: () => lr,
    thanks_to: () => nr,
  });
  var nr = "Nicolas Friedli <nicolas@theologique.ch>",
    rr = "",
    sr = "ltr",
    lr = {
      placeholder: "Rechercher",
      clear_search: "Nettoyer",
      load_more: "Charger plus de r\xE9sultats",
      search_label: "Recherche sur ce site",
      filters_label: "Filtres",
      zero_results: "Pas de r\xE9sultat pour [SEARCH_TERM]",
      many_results: "[COUNT] r\xE9sultats pour [SEARCH_TERM]",
      one_result: "[COUNT] r\xE9sultat pour [SEARCH_TERM]",
      alt_search:
        "Pas de r\xE9sultat pour [SEARCH_TERM]. Montre les r\xE9sultats pour [DIFFERENT_TERM] \xE0 la place",
      search_suggestion:
        "Pas de r\xE9sultat pour [SEARCH_TERM]. Essayer une des recherches suivantes:",
      searching: "Recherche [SEARCH_TERM]...",
    },
    ir = { thanks_to: nr, comments: rr, direction: sr, strings: lr };
  var tt = {};
  S(tt, {
    comments: () => ar,
    default: () => fr,
    direction: () => cr,
    strings: () => ur,
    thanks_to: () => or,
  });
  var or = "Pablo Villaverde <https://github.com/pvillaverde>",
    ar = "",
    cr = "ltr",
    ur = {
      placeholder: "Buscar",
      clear_search: "Limpar",
      load_more: "Ver m\xE1is resultados",
      search_label: "Buscar neste sitio",
      filters_label: "Filtros",
      zero_results: "Non se atoparon resultados para [SEARCH_TERM]",
      many_results: "[COUNT] resultados atopados para [SEARCH_TERM]",
      one_result: "[COUNT] resultado atopado para [SEARCH_TERM]",
      alt_search:
        "Non se atoparon resultados para [SEARCH_TERM]. Amosando no seu lugar resultados para [DIFFERENT_TERM]",
      search_suggestion:
        "Non se atoparon resultados para [SEARCH_TERM]. Probe unha das seguintes pesquisas:",
      searching: "Buscando [SEARCH_TERM]...",
    },
    fr = { thanks_to: or, comments: ar, direction: cr, strings: ur };
  var nt = {};
  S(nt, {
    comments: () => dr,
    default: () => pr,
    direction: () => hr,
    strings: () => mr,
    thanks_to: () => _r,
  });
  var _r = "Tate",
    dr = "",
    hr = "ltr",
    mr = {
      placeholder: "\u691C\u7D22",
      clear_search: "\u6D88\u3059",
      load_more: "\u3082\u3063\u3068\u8AAD\u307F\u8FBC\u3080",
      search_label: "\u3053\u306E\u30B5\u30A4\u30C8\u3092\u691C\u7D22",
      filters_label: "\u30D5\u30A3\u30EB\u30BF",
      zero_results:
        "[SEARCH_TERM]\u306E\u691C\u7D22\u306B\u4E00\u81F4\u3059\u308B\u4EF6\u306F\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F",
      many_results:
        "[SEARCH_TERM]\u306E[COUNT]\u4EF6\u306E\u691C\u7D22\u7D50\u679C",
      one_result:
        "[SEARCH_TERM]\u306E[COUNT]\u4EF6\u306E\u691C\u7D22\u7D50\u679C",
      alt_search:
        "[SEARCH_TERM]\u306E\u691C\u7D22\u306B\u4E00\u81F4\u3059\u308B\u4EF6\u306F\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002[DIFFERENT_TERM]\u306E\u691C\u7D22\u7D50\u679C\u3092\u8868\u793A\u3057\u3066\u3044\u307E\u3059",
      search_suggestion:
        "[SEARCH_TERM]\u306E\u691C\u7D22\u306B\u4E00\u81F4\u3059\u308B\u4EF6\u306F\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u6B21\u306E\u3044\u305A\u308C\u304B\u306E\u691C\u7D22\u3092\u8A66\u3057\u3066\u304F\u3060\u3055\u3044",
      searching:
        "[SEARCH_TERM]\u3092\u691C\u7D22\u3057\u3066\u3044\u307E\u3059",
    },
    pr = { thanks_to: _r, comments: dr, direction: hr, strings: mr };
  var rt = {};
  S(rt, {
    comments: () => br,
    default: () => Rr,
    direction: () => Er,
    strings: () => yr,
    thanks_to: () => gr,
  });
  var gr = "Paul van Brouwershaven",
    br = "",
    Er = "ltr",
    yr = {
      placeholder: "Zoeken",
      clear_search: "Reset",
      load_more: "Meer resultaten laden",
      search_label: "Doorzoek deze site",
      filters_label: "Filters",
      zero_results: "Geen resultaten voor [SEARCH_TERM]",
      many_results: "[COUNT] resultaten voor [SEARCH_TERM]",
      one_result: "[COUNT] resultaat voor [SEARCH_TERM]",
      alt_search:
        "Geen resultaten voor [SEARCH_TERM]. In plaats daarvan worden resultaten voor [DIFFERENT_TERM] weergegeven",
      search_suggestion:
        "Geen resultaten voor [SEARCH_TERM]. Probeer een van de volgende zoekopdrachten:",
      searching: "Zoeken naar [SEARCH_TERM]...",
    },
    Rr = { thanks_to: gr, comments: br, direction: Er, strings: yr };
  var st = {};
  S(st, {
    comments: () => Cr,
    default: () => kr,
    direction: () => wr,
    strings: () => Tr,
    thanks_to: () => vr,
  });
  var vr = "Christopher Wingate",
    Cr = "",
    wr = "ltr",
    Tr = {
      placeholder: "S\xF8k",
      clear_search: "Fjern",
      load_more: "Last flere resultater",
      search_label: "S\xF8k p\xE5 denne siden",
      filters_label: "Filtre",
      zero_results: "Ingen resultater for [SEARCH_TERM]",
      many_results: "[COUNT] resultater for [SEARCH_TERM]",
      one_result: "[COUNT] resultat for [SEARCH_TERM]",
      alt_search:
        "Ingen resultater for [SEARCH_TERM]. Viser resultater for [DIFFERENT_TERM] i stedet",
      search_suggestion:
        "Ingen resultater for [SEARCH_TERM]. Pr\xF8v en av disse s\xF8keordene i stedet:",
      searching: "S\xF8ker etter [SEARCH_TERM]",
    },
    kr = { thanks_to: vr, comments: Cr, direction: wr, strings: Tr };
  var lt = {};
  S(lt, {
    comments: () => Ar,
    default: () => Hr,
    direction: () => Fr,
    strings: () => Mr,
    thanks_to: () => Sr,
  });
  var Sr = "Jonatah",
    Ar = "",
    Fr = "ltr",
    Mr = {
      placeholder: "Pesquisar",
      clear_search: "Limpar",
      load_more: "Ver mais resultados",
      search_label: "Pesquisar",
      filters_label: "Filtros",
      zero_results: "Nenhum resultado encontrado para [SEARCH_TERM]",
      many_results: "[COUNT] resultados encontrados para [SEARCH_TERM]",
      one_result: "[COUNT] resultado encontrado para [SEARCH_TERM]",
      alt_search:
        "Nenhum resultado encontrado para [SEARCH_TERM]. Exibindo resultados para [DIFFERENT_TERM]",
      search_suggestion:
        "Nenhum resultado encontrado para [SEARCH_TERM]. Tente uma das seguintes pesquisas:",
      searching: "Pesquisando por [SEARCH_TERM]...",
    },
    Hr = { thanks_to: Sr, comments: Ar, direction: Fr, strings: Mr };
  var it = {};
  S(it, {
    comments: () => Or,
    default: () => zr,
    direction: () => jr,
    strings: () => Dr,
    thanks_to: () => Nr,
  });
  var Nr = "Aleksandr Gordeev",
    Or = "",
    jr = "ltr",
    Dr = {
      placeholder: "\u041F\u043E\u0438\u0441\u043A",
      clear_search:
        "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043F\u043E\u043B\u0435",
      load_more:
        "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0435\u0449\u0435",
      search_label:
        "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0441\u0430\u0439\u0442\u0443",
      filters_label: "\u0424\u0438\u043B\u044C\u0442\u0440\u044B",
      zero_results:
        "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]",
      many_results:
        "[COUNT] \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]",
      one_result:
        "[COUNT] \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]",
      alt_search:
        "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]. \u041F\u043E\u043A\u0430\u0437\u0430\u043D\u044B \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [DIFFERENT_TERM]",
      search_suggestion:
        "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043E\u0434\u0438\u043D \u0438\u0437 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0445 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432",
      searching:
        "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]",
    },
    zr = { thanks_to: Nr, comments: Or, direction: jr, strings: Dr };
  var ot = {};
  S(ot, {
    comments: () => Ur,
    default: () => Lr,
    direction: () => Pr,
    strings: () => qr,
    thanks_to: () => Ir,
  });
  var Ir = "Montazar Al-Jaber <montazar@nanawee.tech>",
    Ur = "",
    Pr = "ltr",
    qr = {
      placeholder: "S\xF6k",
      clear_search: "Rensa",
      load_more: "Visa fler tr\xE4ffar",
      search_label: "S\xF6k p\xE5 denna sida",
      filters_label: "Filter",
      zero_results: "[SEARCH_TERM] gav inga tr\xE4ffar",
      many_results: "[SEARCH_TERM] gav [COUNT] tr\xE4ffar",
      one_result: "[SEARCH_TERM] gav [COUNT] tr\xE4ff",
      alt_search:
        "[SEARCH_TERM] gav inga tr\xE4ffar. Visar resultat f\xF6r [DIFFERENT_TERM] ist\xE4llet",
      search_suggestion:
        "[SEARCH_TERM] gav inga tr\xE4ffar. F\xF6rs\xF6k igen med en av f\xF6ljande s\xF6kord:",
      searching: "S\xF6ker efter [SEARCH_TERM]...",
    },
    Lr = { thanks_to: Ir, comments: Ur, direction: Pr, strings: qr };
  var at = {};
  S(at, {
    comments: () => Gr,
    default: () => xr,
    direction: () => Vr,
    strings: () => $r,
    thanks_to: () => Br,
  });
  var Br = "Amber Song",
    Gr = "",
    Vr = "ltr",
    $r = {
      placeholder: "\u641C\u7D22",
      clear_search: "\u6E05\u9664",
      load_more: "\u52A0\u8F7D\u66F4\u591A\u7ED3\u679C",
      search_label: "\u7AD9\u5185\u641C\u7D22",
      filters_label: "\u7B5B\u9009",
      zero_results:
        "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
      many_results:
        "\u627E\u5230 [COUNT] \u4E2A [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
      one_result:
        "\u627E\u5230 [COUNT] \u4E2A [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
      alt_search:
        "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C\u3002\u6539\u4E3A\u663E\u793A [DIFFERENT_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
      search_suggestion:
        "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C\u3002\u8BF7\u5C1D\u8BD5\u4EE5\u4E0B\u641C\u7D22\u3002",
      searching: "\u6B63\u5728\u641C\u7D22 [SEARCH_TERM]...",
    },
    xr = { thanks_to: Br, comments: Gr, direction: Vr, strings: $r };
  var ct = {};
  S(ct, {
    comments: () => Jr,
    default: () => Xr,
    direction: () => Kr,
    strings: () => Yr,
    thanks_to: () => Wr,
  });
  var Wr = "Amber Song",
    Jr = "",
    Kr = "ltr",
    Yr = {
      placeholder: "\u641C\u7D22",
      clear_search: "\u6E05\u9664",
      load_more: "\u52A0\u8F09\u66F4\u591A\u7D50\u679C",
      search_label: "\u7AD9\u5167\u641C\u7D22",
      filters_label: "\u7BE9\u9078",
      zero_results:
        "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C",
      many_results:
        "\u627E\u5230 [COUNT] \u500B [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C",
      one_result:
        "\u627E\u5230 [COUNT] \u500B [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C",
      alt_search:
        "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C\u3002\u6539\u70BA\u986F\u793A [DIFFERENT_TERM] \u7684\u76F8\u95DC\u7D50\u679C",
      search_suggestion:
        "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C\u3002\u8ACB\u5617\u8A66\u4EE5\u4E0B\u641C\u7D22\u3002",
      searching: "\u6B63\u5728\u641C\u7D22 [SEARCH_TERM]...",
    },
    Xr = { thanks_to: Wr, comments: Jr, direction: Kr, strings: Yr };
  var ut = {};
  S(ut, {
    comments: () => Qr,
    default: () => ns,
    direction: () => es,
    strings: () => ts,
    thanks_to: () => Zr,
  });
  var Zr = "Amber Song",
    Qr = "",
    es = "ltr",
    ts = {
      placeholder: "\u641C\u7D22",
      clear_search: "\u6E05\u9664",
      load_more: "\u52A0\u8F7D\u66F4\u591A\u7ED3\u679C",
      search_label: "\u7AD9\u5185\u641C\u7D22",
      filters_label: "\u7B5B\u9009",
      zero_results:
        "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
      many_results:
        "\u627E\u5230 [COUNT] \u4E2A [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
      one_result:
        "\u627E\u5230 [COUNT] \u4E2A [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
      alt_search:
        "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C\u3002\u6539\u4E3A\u663E\u793A [DIFFERENT_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
      search_suggestion:
        "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C\u3002\u8BF7\u5C1D\u8BD5\u4EE5\u4E0B\u641C\u7D22\u3002",
      searching: "\u6B63\u5728\u641C\u7D22 [SEARCH_TERM]...",
    },
    ns = { thanks_to: Zr, comments: Qr, direction: es, strings: ts };
  var rs = [Ke, Ye, Xe, Ze, Qe, et, tt, nt, rt, st, lt, it, ot, at, ct, ut],
    Gt = rs,
    Vt = [
      "../../translations/af.json",
      "../../translations/ca.json",
      "../../translations/de.json",
      "../../translations/en.json",
      "../../translations/es.json",
      "../../translations/fr.json",
      "../../translations/gl.json",
      "../../translations/ja.json",
      "../../translations/nl.json",
      "../../translations/no.json",
      "../../translations/pt.json",
      "../../translations/ru.json",
      "../../translations/sv.json",
      "../../translations/zh-cn.json",
      "../../translations/zh-tw.json",
      "../../translations/zh.json",
    ];
  function $t(t, e, n) {
    let r = t.slice();
    return r[45] = e[n], r;
  }
  function xt(t) {
    let e, n, r;
    function s(i) {
      t[30](i);
    }
    let l = {
      show_empty_filters: t[3],
      available_filters: t[15],
      translate: t[16],
    };
    return t[6] !== void 0 && (l.selected_filters = t[6]),
      e = new Bt({ props: l }),
      ne.push(() => wt(e, "selected_filters", s)),
      {
        c() {
          $e(e.$$.fragment);
        },
        m(i, o) {
          Ne(e, i, o), r = !0;
        },
        p(i, o) {
          let a = {};
          o[0] & 8 && (a.show_empty_filters = i[3]),
            o[0] & 32768 && (a.available_filters = i[15]),
            !n && o[0] & 64 &&
            (n = !0, a.selected_filters = i[6], yt(() => n = !1)),
            e.$set(a);
        },
        i(i) {
          r || (j(e.$$.fragment, i), r = !0);
        },
        o(i) {
          U(e.$$.fragment, i), r = !1;
        },
        d(i) {
          ue(e, i);
        },
      };
  }
  function Wt(t) {
    let e, n, r, s, l = [is, ls], i = [];
    function o(a, _) {
      return a[11] ? 0 : 1;
    }
    return n = o(t, [-1, -1]), r = i[n] = l[n](t), {
      c() {
        e = y("div"),
          r.c(),
          g(e, "class", "pagefind-ui__results-area svelte-1bkqzc5");
      },
      m(a, _) {
        v(a, e, _), i[n].m(e, null), s = !0;
      },
      p(a, _) {
        let m = n;
        n = o(a, _),
          n === m ? i[n].p(a, _) : (ae(),
            U(i[m], 1, 1, () => {
              i[m] = null;
            }),
            ce(),
            r = i[n],
            r ? r.p(a, _) : (r = i[n] = l[n](a), r.c()),
            j(r, 1),
            r.m(e, null));
      },
      i(a) {
        s || (j(r), s = !0);
      },
      o(a) {
        U(r), s = !1;
      },
      d(a) {
        a && R(e), i[n].d();
      },
    };
  }
  function ls(t) {
    let e, n, r, s = [], l = new Map(), i, o, a;
    function _(f, p) {
      return f[10].results.length === 0
        ? cs
        : f[10].results.length === 1
        ? as
        : os;
    }
    let m = _(t, [-1, -1]),
      c = m(t),
      d = t[10].results.slice(0, t[14]),
      b = (f) => f[45].id;
    for (let f = 0; f < d.length; f += 1) {
      let p = $t(t, d, f), C = b(p);
      l.set(C, s[f] = Jt(C, p));
    }
    let u = t[10].results.length > t[14] && Kt(t);
    return {
      c() {
        e = y("p"), c.c(), n = k(), r = y("ol");
        for (let f = 0; f < s.length; f += 1) s[f].c();
        i = k(),
          u && u.c(),
          o = Z(),
          g(e, "class", "pagefind-ui__message svelte-1bkqzc5"),
          g(r, "class", "pagefind-ui__results svelte-1bkqzc5");
      },
      m(f, p) {
        v(f, e, p), c.m(e, null), v(f, n, p), v(f, r, p);
        for (let C = 0; C < s.length; C += 1) s[C].m(r, null);
        v(f, i, p), u && u.m(f, p), v(f, o, p), a = !0;
      },
      p(f, p) {
        m === (m = _(f, p)) && c
          ? c.p(f, p)
          : (c.d(1), c = m(f), c && (c.c(), c.m(e, null))),
          p[0] & 17414 &&
          (d = f[10].results.slice(0, f[14]),
            ae(),
            s = Ct(s, p, b, 1, f, d, l, r, vt, Jt, null, $t),
            ce()),
          f[10].results.length > f[14]
            ? u ? u.p(f, p) : (u = Kt(f), u.c(), u.m(o.parentNode, o))
            : u && (u.d(1), u = null);
      },
      i(f) {
        if (!a) {
          for (let p = 0; p < d.length; p += 1) j(s[p]);
          a = !0;
        }
      },
      o(f) {
        for (let p = 0; p < s.length; p += 1) U(s[p]);
        a = !1;
      },
      d(f) {
        f && R(e), c.d(), f && R(n), f && R(r);
        for (let p = 0; p < s.length; p += 1) s[p].d();
        f && R(i), u && u.d(f), f && R(o);
      },
    };
  }
  function is(t) {
    let e, n = t[13] && Yt(t);
    return {
      c() {
        n && n.c(), e = Z();
      },
      m(r, s) {
        n && n.m(r, s), v(r, e, s);
      },
      p(r, s) {
        r[13]
          ? n ? n.p(r, s) : (n = Yt(r), n.c(), n.m(e.parentNode, e))
          : n && (n.d(1), n = null);
      },
      i: M,
      o: M,
      d(r) {
        n && n.d(r), r && R(e);
      },
    };
  }
  function os(t) {
    let e = t[16]("many_results").replace(/\[SEARCH_TERM\]/, t[13]).replace(
        /\[COUNT\]/,
        new Intl.NumberFormat(t[4].language).format(t[10].results.length),
      ) + "",
      n;
    return {
      c() {
        n = O(e);
      },
      m(r, s) {
        v(r, n, s);
      },
      p(r, s) {
        s[0] & 9232 &&
          e !==
            (e =
              r[16]("many_results").replace(/\[SEARCH_TERM\]/, r[13]).replace(
                /\[COUNT\]/,
                new Intl.NumberFormat(r[4].language).format(
                  r[10].results.length,
                ),
              ) + "") &&
          $(n, e);
      },
      d(r) {
        r && R(n);
      },
    };
  }
  function as(t) {
    let e = t[16]("one_result").replace(/\[SEARCH_TERM\]/, t[13]).replace(
        /\[COUNT\]/,
        new Intl.NumberFormat(t[4].language).format(1),
      ) + "",
      n;
    return {
      c() {
        n = O(e);
      },
      m(r, s) {
        v(r, n, s);
      },
      p(r, s) {
        s[0] & 8208 &&
          e !==
            (e = r[16]("one_result").replace(/\[SEARCH_TERM\]/, r[13]).replace(
              /\[COUNT\]/,
              new Intl.NumberFormat(r[4].language).format(1),
            ) + "") &&
          $(n, e);
      },
      d(r) {
        r && R(n);
      },
    };
  }
  function cs(t) {
    let e = t[16]("zero_results").replace(/\[SEARCH_TERM\]/, t[13]) + "", n;
    return {
      c() {
        n = O(e);
      },
      m(r, s) {
        v(r, n, s);
      },
      p(r, s) {
        s[0] & 8192 &&
          e !==
            (e = r[16]("zero_results").replace(/\[SEARCH_TERM\]/, r[13]) +
              "") &&
          $(n, e);
      },
      d(r) {
        r && R(n);
      },
    };
  }
  function Jt(t, e) {
    let n, r, s;
    return r = new jt({
      props: { show_images: e[1], process_result: e[2], result: e[45] },
    }),
      {
        key: t,
        first: null,
        c() {
          n = Z(), $e(r.$$.fragment), this.first = n;
        },
        m(l, i) {
          v(l, n, i), Ne(r, l, i), s = !0;
        },
        p(l, i) {
          e = l;
          let o = {};
          i[0] & 2 && (o.show_images = e[1]),
            i[0] & 4 && (o.process_result = e[2]),
            i[0] & 17408 && (o.result = e[45]),
            r.$set(o);
        },
        i(l) {
          s || (j(r.$$.fragment, l), s = !0);
        },
        o(l) {
          U(r.$$.fragment, l), s = !1;
        },
        d(l) {
          l && R(n), ue(r, l);
        },
      };
  }
  function Kt(t) {
    let e, n, r;
    return {
      c() {
        e = y("button"),
          e.textContent = `${t[16]("load_more")}`,
          g(e, "type", "button"),
          g(e, "class", "pagefind-ui__button svelte-1bkqzc5");
      },
      m(s, l) {
        v(s, e, l), n || (r = B(e, "click", t[18]), n = !0);
      },
      p: M,
      d(s) {
        s && R(e), n = !1, r();
      },
    };
  }
  function Yt(t) {
    let e, n = t[16]("searching").replace(/\[SEARCH_TERM\]/, t[13]) + "", r;
    return {
      c() {
        e = y("p"),
          r = O(n),
          g(e, "class", "pagefind-ui__message svelte-1bkqzc5");
      },
      m(s, l) {
        v(s, e, l), E(e, r);
      },
      p(s, l) {
        l[0] & 8192 &&
          n !==
            (n = s[16]("searching").replace(/\[SEARCH_TERM\]/, s[13]) + "") &&
          $(r, n);
      },
      d(s) {
        s && R(e);
      },
    };
  }
  function us(t) {
    let e,
      n,
      r,
      s,
      l,
      i,
      o,
      a,
      _,
      m,
      c,
      d,
      b,
      u = t[9] && xt(t),
      f = t[12] && Wt(t);
    return {
      c() {
        e = y("div"),
          n = y("form"),
          r = y("input"),
          l = k(),
          i = y("button"),
          i.textContent = `${t[16]("clear_search")}`,
          o = k(),
          a = y("div"),
          u && u.c(),
          _ = k(),
          f && f.c(),
          g(r, "class", "pagefind-ui__search-input svelte-1bkqzc5"),
          g(r, "type", "text"),
          g(r, "placeholder", s = t[16]("placeholder")),
          g(i, "class", "pagefind-ui__search-clear svelte-1bkqzc5"),
          q(i, "pagefind-ui__suppressed", !t[5]),
          g(a, "class", "pagefind-ui__drawer svelte-1bkqzc5"),
          q(a, "pagefind-ui__hidden", !t[12]),
          g(n, "class", "pagefind-ui__form svelte-1bkqzc5"),
          g(n, "role", "search"),
          g(n, "aria-label", m = t[16]("search_label")),
          g(n, "action", "javascript:void(0);"),
          g(e, "class", "pagefind-ui svelte-1bkqzc5"),
          q(e, "pagefind-ui--reset", t[0]);
      },
      m(p, C) {
        v(p, e, C),
          E(e, n),
          E(n, r),
          Ge(r, t[5]),
          t[27](r),
          E(n, l),
          E(n, i),
          t[28](i),
          E(n, o),
          E(n, a),
          u && u.m(a, null),
          E(a, _),
          f && f.m(a, null),
          c = !0,
          d ||
          (b = [
            B(r, "focus", t[17]),
            B(r, "keydown", t[25]),
            B(r, "input", t[26]),
            B(i, "click", t[29]),
            B(n, "submit", fs),
          ],
            d = !0);
      },
      p(p, C) {
        C[0] & 32 && r.value !== p[5] && Ge(r, p[5]),
          (!c || C[0] & 32) && q(i, "pagefind-ui__suppressed", !p[5]),
          p[9]
            ? u
              ? (u.p(p, C), C[0] & 512 && j(u, 1))
              : (u = xt(p), u.c(), j(u, 1), u.m(a, _))
            : u && (ae(),
              U(u, 1, 1, () => {
                u = null;
              }),
              ce()),
          p[12]
            ? f
              ? (f.p(p, C), C[0] & 4096 && j(f, 1))
              : (f = Wt(p), f.c(), j(f, 1), f.m(a, null))
            : f && (ae(),
              U(f, 1, 1, () => {
                f = null;
              }),
              ce()),
          (!c || C[0] & 4096) && q(a, "pagefind-ui__hidden", !p[12]),
          (!c || C[0] & 1) && q(e, "pagefind-ui--reset", p[0]);
      },
      i(p) {
        c || (j(u), j(f), c = !0);
      },
      o(p) {
        U(u), U(f), c = !1;
      },
      d(p) {
        p && R(e),
          t[27](null),
          t[28](null),
          u && u.d(),
          f && f.d(),
          d = !1,
          V(b);
      },
    };
  }
  var fs = (t) => t.preventDefault();
  function _s(t, e, n) {
    let r = {}, s = Vt.map((h) => h.match(/([^\/]+)\.json$/)[1]);
    for (let h = 0; h < s.length; h++) {
      r[s[h]] = { language: s[h], ...Gt[h].strings };
    }
    let { base_path: l = "/_pagefind/" } = e,
      { reset_styles: i = !0 } = e,
      { show_images: o = !0 } = e,
      { process_result: a = null } = e,
      { process_term: _ = null } = e,
      { show_empty_filters: m = !0 } = e,
      { debounce_timeout_ms: c = 300 } = e,
      { pagefind_options: d = {} } = e,
      { merge_index: b = [] } = e,
      { trigger_search_term: u = "" } = e,
      { translations: f = {} } = e,
      p = "",
      C,
      D,
      z,
      F = 40,
      W = !1,
      w = [],
      H = !1,
      N = !1,
      J = 0,
      _t = "",
      ze = 5,
      dt = null,
      re = null,
      Se = {},
      ht = r.en,
      Zt = (h) => f[h] ?? ht[h] ?? "";
    Ve(() => {
      let h = document?.querySelector?.("html")?.getAttribute?.("lang") || "en",
        T = Oe(h.toLocaleLowerCase());
      ht = r[`${T.language}-${T.script}-${T.region}`] ||
        r[`${T.language}-${T.region}`] || r[`${T.language}`] || r.en;
    });
    let mt = async () => {
        if (!W && (n(9, W = !0), !C)) {
          let h = await import(`${l}pagefind.js`);
          await h.options(d || {});
          for (let T of b) {
            if (!T.bundlePath) {
              throw new Error("mergeIndex requires a bundlePath parameter");
            }
            let P = T.bundlePath;
            delete T.bundlePath, await h.mergeIndex(P, T);
          }
          C = h, Qt();
        }
      },
      Qt = async () => {
        C &&
          (dt = await C.filters(),
            (!re || !Object.keys(re).length) && n(15, re = dt));
      },
      en = (h) => {
        let T = {};
        return Object.entries(h).filter(([, P]) => P).forEach(([P]) => {
          let [I, _n] = P.split(/:(.*)$/);
          T[I] = T[I] || [], T[I].push(_n);
        }),
          T;
      },
      se,
      tn = async (h, T) => {
        if (!h) {
          n(12, N = !1), se && clearTimeout(se);
          return;
        }
        let P = en(T), I = () => nn(h, P);
        c > 0 && h
          ? (se && clearTimeout(se),
            se = setTimeout(I, c),
            await pt(),
            C.preload(h, { filters: P }))
          : I(), rn();
      },
      pt = async () => {
        for (; !C;) mt(), await new Promise((h) => setTimeout(h, 50));
      },
      nn = async (h, T) => {
        n(13, _t = h || ""),
          typeof _ == "function" && (h = _(h)),
          n(11, H = !0),
          n(12, N = !0),
          await pt();
        let P = ++J, I = await C.search(h, { filters: T });
        J === P &&
          (I.filters && Object.keys(I.filters)?.length && n(15, re = I.filters),
            n(10, w = I),
            n(11, H = !1),
            n(14, ze = 5));
      },
      rn = () => {
        let h = z.offsetWidth;
        h != F && n(7, D.style.paddingRight = `${h + 2}px`, D);
      },
      sn = (h) => {
        h?.preventDefault(), n(14, ze += 5);
      },
      ln = (h) => {
        h.key === "Escape" && (n(5, p = ""), D.blur()),
          h.key === "Enter" && h.preventDefault();
      };
    function on() {
      p = this.value, n(5, p), n(19, u);
    }
    function an(h) {
      ne[h ? "unshift" : "push"](() => {
        D = h, n(7, D);
      });
    }
    function cn(h) {
      ne[h ? "unshift" : "push"](() => {
        z = h, n(8, z);
      });
    }
    let un = () => {
      n(5, p = ""), D.blur();
    };
    function fn(h) {
      Se = h, n(6, Se);
    }
    return t.$$set = (h) => {
      "base_path" in h && n(20, l = h.base_path),
        "reset_styles" in h && n(0, i = h.reset_styles),
        "show_images" in h && n(1, o = h.show_images),
        "process_result" in h && n(2, a = h.process_result),
        "process_term" in h && n(21, _ = h.process_term),
        "show_empty_filters" in h && n(3, m = h.show_empty_filters),
        "debounce_timeout_ms" in h && n(22, c = h.debounce_timeout_ms),
        "pagefind_options" in h && n(23, d = h.pagefind_options),
        "merge_index" in h && n(24, b = h.merge_index),
        "trigger_search_term" in h && n(19, u = h.trigger_search_term),
        "translations" in h && n(4, f = h.translations);
    },
      t.$$.update = () => {
        if (t.$$.dirty[0] & 524288) e: u && (n(5, p = u), n(19, u = ""));
        if (t.$$.dirty[0] & 96) e: tn(p, Se);
      },
      [
        i,
        o,
        a,
        m,
        f,
        p,
        Se,
        D,
        z,
        W,
        w,
        H,
        N,
        _t,
        ze,
        re,
        Zt,
        mt,
        sn,
        u,
        l,
        _,
        c,
        d,
        b,
        ln,
        on,
        an,
        cn,
        un,
        fn,
      ];
  }
  var ft = class extends L {
      constructor(e) {
        super(),
          Q(
            this,
            e,
            _s,
            us,
            X,
            {
              base_path: 20,
              reset_styles: 0,
              show_images: 1,
              process_result: 2,
              process_term: 21,
              show_empty_filters: 3,
              debounce_timeout_ms: 22,
              pagefind_options: 23,
              merge_index: 24,
              trigger_search_term: 19,
              translations: 4,
            },
            null,
            [-1, -1],
          );
      }
    },
    Xt = ft;
  var je;
  try {
    je = new URL(document.currentScript.src).pathname.match(
      /^(.*\/)(?:pagefind-)?ui.js.*$/,
    )[1];
  } catch {
    je = "/_pagefind/",
      console.warn(
        `Pagefind couldn't determine the base of the bundle from the javascript import path. Falling back to the default of ${je}.`,
      ),
      console.warn(
        "You can configure this by passing a bundlePath option to PagefindUI",
      ),
      console.warn(
        `[DEBUG: Loaded from ${document?.currentScript?.src ?? "unknown"}]`,
      );
  }
  var De = class {
    constructor(e) {
      this._pfs = null;
      let n = e.element ?? "[data-pagefind-ui]",
        r = e.bundlePath ?? je,
        s = e.resetStyles ?? !0,
        l = e.showImages ?? !0,
        i = e.processResult ?? null,
        o = e.processTerm ?? null,
        a = e.showEmptyFilters ?? !0,
        _ = e.debounceTimeoutMs ?? 300,
        m = e.mergeIndex ?? [],
        c = e.translations ?? [];
      delete e.element,
        delete e.bundlePath,
        delete e.resetStyles,
        delete e.showImages,
        delete e.processResult,
        delete e.processTerm,
        delete e.showEmptyFilters,
        delete e.debounceTimeoutMs,
        delete e.mergeIndex,
        delete e.translations;
      let d = document.querySelector(n);
      d
        ? this._pfs = new Xt({
          target: d,
          props: {
            base_path: r,
            reset_styles: s,
            show_images: l,
            process_result: i,
            process_term: o,
            show_empty_filters: a,
            debounce_timeout_ms: _,
            merge_index: m,
            translations: c,
            pagefind_options: e,
          },
        })
        : console.error(`Pagefind UI couldn't find the selector ${n}`);
    }
    triggerSearch(e) {
      this._pfs.$$set({ trigger_search_term: e });
    }
  };
  window.PagefindUI = De;
})();
