var yo = Object.defineProperty;
var Wr = (e) => {
  throw TypeError(e);
};
var wo = (e, t, s) => t in e ? yo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var vt = (e, t, s) => wo(e, typeof t != "symbol" ? t + "" : t, s), Zs = (e, t, s) => t.has(e) || Wr("Cannot " + s);
var g = (e, t, s) => (Zs(e, t, "read from private field"), s ? s.call(e) : t.get(e)), be = (e, t, s) => t.has(e) ? Wr("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), _e = (e, t, s, r) => (Zs(e, t, "write to private field"), r ? r.call(e, s) : t.set(e, s), s), Se = (e, t, s) => (Zs(e, t, "access private method"), s);
var ua;
typeof window < "u" && ((ua = window.__svelte ?? (window.__svelte = {})).v ?? (ua.v = /* @__PURE__ */ new Set())).add("5");
let Qn = !1, xo = !1;
function ko() {
  Qn = !0;
}
ko();
const Eo = 1, So = 2, pa = 4, $o = 8, To = 16, jo = 1, No = 2, Co = 4, Io = 8, Oo = 16, ha = 1, Ao = 2, Be = Symbol("uninitialized"), _a = "http://www.w3.org/1999/xhtml", ga = !1;
var Hs = Array.isArray, Po = Array.prototype.indexOf, yn = Array.prototype.includes, Vs = Array.from, ba = Object.defineProperty, Dn = Object.getOwnPropertyDescriptor, ma = Object.getOwnPropertyDescriptors, Ro = Object.prototype, qo = Array.prototype, Nr = Object.getPrototypeOf, Xr = Object.isExtensible;
const wn = () => {
};
function Mo(e) {
  return e();
}
function lr(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function ya() {
  var e, t, s = new Promise((r, a) => {
    e = r, t = a;
  });
  return { promise: s, resolve: e, reject: t };
}
function Do(e, t) {
  if (Array.isArray(e))
    return e;
  if (!(Symbol.iterator in e))
    return Array.from(e);
  const s = [];
  for (const r of e)
    if (s.push(r), s.length === t) break;
  return s;
}
const Qe = 2, Bn = 4, ms = 8, wa = 1 << 24, Pt = 16, qt = 32, cn = 64, vr = 128, $t = 512, He = 1024, We = 2048, Mt = 4096, lt = 8192, Tt = 16384, Nn = 32768, cr = 1 << 25, Yn = 65536, Ms = 1 << 17, Lo = 1 << 18, es = 1 << 19, xa = 1 << 20, Jt = 1 << 25, Sn = 65536, Ds = 1 << 21, Ln = 1 << 22, ln = 1 << 23, Yt = Symbol("$state"), Fo = Symbol("legacy props"), Jo = Symbol(""), Ns = Symbol("attributes"), ur = Symbol("class"), dr = Symbol("style"), rs = Symbol("text"), Cs = Symbol("form reset"), Bs = new class extends Error {
  constructor() {
    super(...arguments);
    vt(this, "name", "StaleReactionError");
    vt(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var da;
const zo = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((da = globalThis.document) != null && da.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function Cr(e) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function Uo() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Ho(e, t, s) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function Vo(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Bo() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Yo(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Go() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Ko(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function Wo() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Xo() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Zo() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Qo() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function ei() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function ti() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function ni() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function ka(e) {
  return e === this.v;
}
function Ir(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Ea(e) {
  return !Ir(e, this.v);
}
let Ae = null;
function Gn(e) {
  Ae = e;
}
function et(e, t = !1, s) {
  Ae = {
    p: Ae,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      we
    ),
    l: Qn && !t ? { s: null, u: null, $: [] } : null
  };
}
function tt(e) {
  var t = (
    /** @type {ComponentContext} */
    Ae
  ), s = t.e;
  if (s !== null) {
    t.e = null;
    for (var r of s)
      Va(r);
  }
  return t.i = !0, Ae = t.p, /** @type {T} */
  {};
}
function ys() {
  return !Qn || Ae !== null && Ae.l === null;
}
let dn = [];
function Sa() {
  var e = dn;
  dn = [], lr(e);
}
function vn(e) {
  if (dn.length === 0 && !ls) {
    var t = dn;
    queueMicrotask(() => {
      t === dn && Sa();
    });
  }
  dn.push(e);
}
function si() {
  for (; dn.length > 0; )
    Sa();
}
function $a(e) {
  var t = we;
  if (t === null)
    return xe.f |= ln, e;
  if ((t.f & Nn) === 0 && (t.f & Bn) === 0)
    throw e;
  on(e, t);
}
function on(e, t) {
  for (; t !== null; ) {
    if ((t.f & vr) !== 0) {
      if ((t.f & Nn) === 0)
        throw e;
      try {
        t.b.error(e);
        return;
      } catch (s) {
        e = s;
      }
    }
    t = t.parent;
  }
  throw e;
}
const ri = -7169;
function Le(e, t) {
  e.f = e.f & ri | t;
}
function Or(e) {
  (e.f & $t) !== 0 || e.deps === null ? Le(e, He) : Le(e, Mt);
}
function Ta(e) {
  if (e !== null)
    for (const t of e)
      (t.f & Qe) === 0 || (t.f & Sn) === 0 || (t.f ^= Sn, Ta(
        /** @type {Derived} */
        t.deps
      ));
}
function ja(e, t, s) {
  (e.f & We) !== 0 ? t.add(e) : (e.f & Mt) !== 0 && s.add(e), Ta(e.deps), Le(e, He);
}
function Na(e, t, s) {
  if (e == null)
    return t(void 0), wn;
  const r = u(
    () => e.subscribe(
      t,
      // @ts-expect-error
      s
    )
  );
  return r.unsubscribe ? () => r.unsubscribe() : r;
}
const In = [];
function ts(e, t = wn) {
  let s = null;
  const r = /* @__PURE__ */ new Set();
  function a(i) {
    if (Ir(e, i) && (e = i, s)) {
      const v = !In.length;
      for (const c of r)
        c[1](), In.push(c, e);
      if (v) {
        for (let c = 0; c < In.length; c += 2)
          In[c][0](In[c + 1]);
        In.length = 0;
      }
    }
  }
  function o(i) {
    a(i(
      /** @type {T} */
      e
    ));
  }
  function l(i, v = wn) {
    const c = [i, v];
    return r.add(c), r.size === 1 && (s = t(a, o) || wn), i(
      /** @type {T} */
      e
    ), () => {
      r.delete(c), r.size === 0 && s && (s(), s = null);
    };
  }
  return { set: a, update: o, subscribe: l };
}
function ai(e) {
  let t;
  return Na(e, (s) => t = s)(), t;
}
let fr = !1, Ss = !1, pr = Symbol("unmounted");
function nt(e, t, s) {
  const r = s[t] ?? (s[t] = {
    store: null,
    source: /* @__PURE__ */ L(void 0),
    unsubscribe: wn
  });
  if (r.store !== e && !(pr in s))
    if (r.unsubscribe(), r.store = e ?? null, e == null)
      r.source.v = void 0, r.unsubscribe = wn;
    else {
      var a = !0;
      r.unsubscribe = Na(e, (o) => {
        a ? r.source.v = o : _(r.source, o);
      }), a = !1;
    }
  return e && pr in s ? ai(e) : n(r.source);
}
function Xt() {
  const e = {};
  function t() {
    Gs(() => {
      for (var s in e)
        e[s].unsubscribe();
      ba(e, pr, {
        enumerable: !1,
        value: !0
      });
    });
  }
  return [e, t];
}
function oi(e, t) {
  fr = !0;
  try {
    e.set(t);
  } finally {
    fr = !1;
  }
}
function Qs(e, t, s) {
  return oi(e, s), t;
}
function ii(e) {
  var t = Ss;
  try {
    return Ss = !1, [e(), Ss];
  } finally {
    Ss = t;
  }
}
let er = null, On = null, ie = null, is = null, Ze = null, hr = null, ls = !1, tr = !1, Rn = null, Is = null;
var Zr = 0;
let li = 1;
var Fn, sn, pn, Jn, zn, hn, Un, Ut, fs, ht, ps, rn, Dt, Lt, Hn, _n, $e, _r, as, gr, Ca, Ia, Os, vi, br, An;
const Js = class Js {
  constructor() {
    be(this, $e);
    vt(this, "id", li++);
    /** True as soon as `#process` was called */
    be(this, Fn, !1);
    vt(this, "linked", !0);
    /** @type {Batch | null} */
    be(this, sn, null);
    /** @type {Batch | null} */
    be(this, pn, null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    vt(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    vt(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    vt(this, "previous", /* @__PURE__ */ new Map());
    /**
     * Async effects which this batch doesn't take into account anymore when calculating blockers,
     * as it has a value for it already.
     * @type {Set<Effect>}
     */
    vt(this, "unblocked", /* @__PURE__ */ new Set());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    be(this, Jn, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    be(this, zn, /* @__PURE__ */ new Set());
    /**
     * Callbacks that should run only when a fork is committed.
     * @type {Set<(batch: Batch) => void>}
     */
    be(this, hn, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    be(this, Un, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    be(this, Ut, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    be(this, fs, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    be(this, ht, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    be(this, ps, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    be(this, rn, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    be(this, Dt, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    be(this, Lt, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    be(this, Hn, /* @__PURE__ */ new Set());
    vt(this, "is_fork", !1);
    be(this, _n, !1);
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    g(this, Lt).has(t) || g(this, Lt).set(t, { d: [], m: [] }), g(this, Hn).delete(t);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(t, s = (r) => this.schedule(r)) {
    var r = g(this, Lt).get(t);
    if (r) {
      g(this, Lt).delete(t);
      for (var a of r.d)
        Le(a, We), s(a);
      for (a of r.m)
        Le(a, Mt), s(a);
    }
    g(this, Hn).add(t);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(t, s, r = !1) {
    t.v !== Be && !this.previous.has(t) && this.previous.set(t, t.v), (t.f & ln) === 0 && (this.current.set(t, [s, r]), Ze == null || Ze.set(t, s)), this.is_fork || (t.v = s);
  }
  activate() {
    ie = this;
  }
  deactivate() {
    ie = null, Ze = null;
  }
  flush() {
    try {
      tr = !0, ie = this, Se(this, $e, as).call(this);
    } finally {
      Zr = 0, hr = null, Rn = null, Is = null, tr = !1, ie = null, Ze = null, xn.clear();
    }
  }
  discard() {
    for (const t of g(this, zn)) t(this);
    g(this, zn).clear(), g(this, hn).clear(), Se(this, $e, An).call(this);
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(t) {
    g(this, ps).push(t);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(t, s) {
    if (_e(this, Un, g(this, Un) + 1), t) {
      let r = g(this, Ut).get(s) ?? 0;
      g(this, Ut).set(s, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(t, s) {
    if (_e(this, Un, g(this, Un) - 1), t) {
      let r = g(this, Ut).get(s) ?? 0;
      r === 1 ? g(this, Ut).delete(s) : g(this, Ut).set(s, r - 1);
    }
    g(this, _n) || (_e(this, _n, !0), vn(() => {
      _e(this, _n, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(t, s) {
    for (const r of t)
      g(this, rn).add(r);
    for (const r of s)
      g(this, Dt).add(r);
    t.clear(), s.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(t) {
    g(this, Jn).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    g(this, zn).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  on_fork_commit(t) {
    g(this, hn).add(t);
  }
  run_fork_commit_callbacks() {
    for (const t of g(this, hn)) t(this);
    g(this, hn).clear();
  }
  settled() {
    return (g(this, fs) ?? _e(this, fs, ya())).promise;
  }
  static ensure() {
    var t;
    if (ie === null) {
      const s = ie = new Js();
      Se(t = s, $e, br).call(t), !tr && !ls && vn(() => {
        g(s, Fn) || s.flush();
      });
    }
    return ie;
  }
  apply() {
    {
      Ze = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(t) {
    var a;
    if (hr = t, (a = t.b) != null && a.is_pending && (t.f & (Bn | ms | wa)) !== 0 && (t.f & Nn) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var s = t; s.parent !== null; ) {
      s = s.parent;
      var r = s.f;
      if (Rn !== null && s === we && (xe === null || (xe.f & Qe) === 0) && !fr)
        return;
      if ((r & (cn | qt)) !== 0) {
        if ((r & He) === 0)
          return;
        s.f ^= He;
      }
    }
    g(this, ht).push(s);
  }
};
Fn = new WeakMap(), sn = new WeakMap(), pn = new WeakMap(), Jn = new WeakMap(), zn = new WeakMap(), hn = new WeakMap(), Un = new WeakMap(), Ut = new WeakMap(), fs = new WeakMap(), ht = new WeakMap(), ps = new WeakMap(), rn = new WeakMap(), Dt = new WeakMap(), Lt = new WeakMap(), Hn = new WeakMap(), _n = new WeakMap(), $e = new WeakSet(), _r = function() {
  if (this.is_fork) return !0;
  for (const r of g(this, Ut).keys()) {
    for (var t = r, s = !1; t.parent !== null; ) {
      if (g(this, Lt).has(t)) {
        s = !0;
        break;
      }
      t = t.parent;
    }
    if (!s)
      return !0;
  }
  return !1;
}, as = function() {
  var v, c, p, b;
  if (_e(this, Fn, !0), Zr++ > 1e3 && (Se(this, $e, An).call(this), ui()), !Se(this, $e, _r).call(this)) {
    for (const h of g(this, rn))
      g(this, Dt).delete(h), Le(h, We), this.schedule(h);
    for (const h of g(this, Dt))
      Le(h, Mt), this.schedule(h);
  }
  const t = g(this, ht);
  _e(this, ht, []), this.apply();
  var s = Rn = [], r = [], a = Is = [];
  for (const h of t)
    try {
      Se(this, $e, gr).call(this, h, s, r);
    } catch ($) {
      throw Pa(h), $;
    }
  if (ie = null, a.length > 0) {
    var o = Js.ensure();
    for (const h of a)
      o.schedule(h);
  }
  if (Rn = null, Is = null, Se(this, $e, _r).call(this)) {
    Se(this, $e, Os).call(this, r), Se(this, $e, Os).call(this, s);
    for (const [h, $] of g(this, Lt))
      Aa(h, $);
    a.length > 0 && /** @type {unknown} */
    Se(v = ie, $e, as).call(v);
    return;
  }
  const l = Se(this, $e, Ca).call(this);
  if (l) {
    Se(c = l, $e, Ia).call(c, this);
    return;
  }
  g(this, rn).clear(), g(this, Dt).clear();
  for (const h of g(this, Jn)) h(this);
  g(this, Jn).clear(), is = this, Qr(r), Qr(s), is = null, (p = g(this, fs)) == null || p.resolve();
  var i = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    ie
  );
  if (this.linked && g(this, Un) === 0 && Se(this, $e, An).call(this), g(this, ht).length > 0) {
    i === null && (i = this, Se(this, $e, br).call(this));
    const h = i;
    g(h, ht).push(...g(this, ht).filter(($) => !g(h, ht).includes($)));
  }
  i !== null && Se(b = i, $e, as).call(b);
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
gr = function(t, s, r) {
  t.f ^= He;
  for (var a = t.first; a !== null; ) {
    var o = a.f, l = (o & (qt | cn)) !== 0, i = l && (o & He) !== 0, v = i || (o & lt) !== 0 || g(this, Lt).has(a);
    if (!v && a.fn !== null) {
      l ? a.f ^= He : (o & Bn) !== 0 ? s.push(a) : ns(a) && ((o & Pt) !== 0 && g(this, Dt).add(a), jn(a));
      var c = a.first;
      if (c !== null) {
        a = c;
        continue;
      }
    }
    for (; a !== null; ) {
      var p = a.next;
      if (p !== null) {
        a = p;
        break;
      }
      a = a.parent;
    }
  }
}, Ca = function() {
  for (var t = g(this, sn); t !== null; ) {
    if (!t.is_fork) {
      for (const [s, [, r]] of this.current)
        if (t.current.has(s) && !r)
          return t;
    }
    t = g(t, sn);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
Ia = function(t) {
  var r;
  for (const [a, o] of t.current)
    !this.previous.has(a) && t.previous.has(a) && this.previous.set(a, t.previous.get(a)), this.current.set(a, o);
  for (const [a, o] of t.async_deriveds) {
    const l = this.async_deriveds.get(a);
    l && o.promise.then(l.resolve);
  }
  const s = (a) => {
    var o = a.reactions;
    if (o !== null)
      for (const v of o) {
        var l = v.f;
        if ((l & Qe) !== 0)
          s(
            /** @type {Derived} */
            v
          );
        else {
          var i = (
            /** @type {Effect} */
            v
          );
          l & (Ln | Pt) && !this.async_deriveds.has(i) && (g(this, Dt).delete(i), Le(i, We), this.schedule(i));
        }
      }
  };
  for (const a of this.current.keys())
    s(a);
  this.oncommit(() => t.discard()), Se(r = t, $e, An).call(r), ie = this, Se(this, $e, as).call(this);
}, /**
 * @param {Effect[]} effects
 */
Os = function(t) {
  for (var s = 0; s < t.length; s += 1)
    ja(t[s], g(this, rn), g(this, Dt));
}, vi = function() {
  var p;
  Se(this, $e, An).call(this);
  for (let b = er; b !== null; b = g(b, pn)) {
    var t = b.id < this.id, s = [];
    for (const [h, [$, k]] of this.current) {
      if (b.current.has(h)) {
        var r = (
          /** @type {[any, boolean]} */
          b.current.get(h)[0]
        );
        if (t && $ !== r)
          b.current.set(h, [$, k]);
        else
          continue;
      }
      s.push(h);
    }
    if (t)
      for (const [h, $] of this.async_deriveds) {
        const k = b.async_deriveds.get(h);
        k && $.promise.then(k.resolve);
      }
    if (g(b, Fn)) {
      var a = [...b.current.keys()].filter((h) => !this.current.has(h));
      if (a.length === 0)
        t && b.discard();
      else if (s.length > 0) {
        if (t)
          for (const h of g(this, Hn))
            b.unskip_effect(h, ($) => {
              var k;
              ($.f & (Pt | Ln)) !== 0 ? b.schedule($) : Se(k = b, $e, Os).call(k, [$]);
            });
        b.activate();
        var o = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
        for (var i of s)
          Oa(i, a, o, l);
        l = /* @__PURE__ */ new Map();
        var v = [...b.current.keys()].filter(
          (h) => this.current.has(h) ? (
            /** @type {[any, boolean]} */
            this.current.get(h)[0] !== h.v
          ) : !0
        );
        if (v.length > 0)
          for (const h of g(this, ps))
            (h.f & (Tt | lt | Ms)) === 0 && Ar(h, v, l) && ((h.f & (Ln | Pt)) !== 0 ? (Le(h, We), b.schedule(h)) : g(b, rn).add(h));
        if (g(b, ht).length > 0 && !g(b, _n)) {
          b.apply();
          for (var c of g(b, ht))
            Se(p = b, $e, gr).call(p, c, [], []);
          _e(b, ht, []);
        }
        b.deactivate();
      }
    }
  }
}, br = function() {
  On === null ? er = On = this : (_e(On, pn, this), _e(this, sn, On)), On = this;
}, An = function() {
  var t = g(this, sn), s = g(this, pn);
  t === null ? er = s : _e(t, pn, s), s === null ? On = t : _e(s, sn, t), this.linked = !1;
};
let $n = Js;
function ci(e) {
  var t = ls;
  ls = !0;
  try {
    for (var s; ; ) {
      if (si(), ie === null)
        return (
          /** @type {T} */
          s
        );
      ie.flush();
    }
  } finally {
    ls = t;
  }
}
function ui() {
  try {
    Go();
  } catch (e) {
    on(e, hr);
  }
}
let Ot = null;
function Qr(e) {
  var t = e.length;
  if (t !== 0) {
    for (var s = 0; s < t; ) {
      var r = e[s++];
      if ((r.f & (Tt | lt)) === 0 && ns(r) && (Ot = /* @__PURE__ */ new Set(), jn(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Ya(r), (Ot == null ? void 0 : Ot.size) > 0)) {
        xn.clear();
        for (const a of Ot) {
          if ((a.f & (Tt | lt)) !== 0) continue;
          const o = [a];
          let l = a.parent;
          for (; l !== null; )
            Ot.has(l) && (Ot.delete(l), o.push(l)), l = l.parent;
          for (let i = o.length - 1; i >= 0; i--) {
            const v = o[i];
            (v.f & (Tt | lt)) === 0 && jn(v);
          }
        }
        Ot.clear();
      }
    }
    Ot = null;
  }
}
function Oa(e, t, s, r) {
  if (!s.has(e) && (s.add(e), e.reactions !== null))
    for (const a of e.reactions) {
      const o = a.f;
      (o & Qe) !== 0 ? Oa(
        /** @type {Derived} */
        a,
        t,
        s,
        r
      ) : (o & (Ln | Pt)) !== 0 && (o & We) === 0 && Ar(a, t, r) && (Le(a, We), Pr(
        /** @type {Effect} */
        a
      ));
    }
}
function Ar(e, t, s) {
  const r = s.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const a of e.deps) {
      if (yn.call(t, a))
        return !0;
      if ((a.f & Qe) !== 0 && Ar(
        /** @type {Derived} */
        a,
        t,
        s
      ))
        return s.set(
          /** @type {Derived} */
          a,
          !0
        ), !0;
    }
  return s.set(e, !1), !1;
}
function Pr(e) {
  ie.schedule(e);
}
function Aa(e, t) {
  if (!((e.f & qt) !== 0 && (e.f & He) !== 0)) {
    (e.f & We) !== 0 ? t.d.push(e) : (e.f & Mt) !== 0 && t.m.push(e), Le(e, He);
    for (var s = e.first; s !== null; )
      Aa(s, t), s = s.next;
  }
}
function Pa(e) {
  Le(e, He);
  for (var t = e.first; t !== null; )
    Pa(t), t = t.next;
}
function di(e) {
  let t = 0, s = Tn(0), r;
  return () => {
    Mr() && (n(s), Cn(() => (t === 0 && (r = u(() => e(() => vs(s)))), t += 1, () => {
      vn(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, vs(s));
      });
    })));
  };
}
var fi = Yn | es;
function pi(e, t, s, r) {
  new hi(e, t, s, r);
}
var xt, jr, kt, gn, ct, Et, ot, _t, Ht, bn, an, Vn, hs, _s, Vt, zs, ze, _i, gi, bi, mr, As, Ps, yr, wr;
class hi {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, s, r, a) {
    be(this, ze);
    /** @type {Boundary | null} */
    vt(this, "parent");
    vt(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    vt(this, "transform_error");
    /** @type {TemplateNode} */
    be(this, xt);
    /** @type {TemplateNode | null} */
    be(this, jr, null);
    /** @type {BoundaryProps} */
    be(this, kt);
    /** @type {((anchor: Node) => void)} */
    be(this, gn);
    /** @type {Effect} */
    be(this, ct);
    /** @type {Effect | null} */
    be(this, Et, null);
    /** @type {Effect | null} */
    be(this, ot, null);
    /** @type {Effect | null} */
    be(this, _t, null);
    /** @type {DocumentFragment | null} */
    be(this, Ht, null);
    be(this, bn, 0);
    be(this, an, 0);
    be(this, Vn, !1);
    /** @type {Set<Effect>} */
    be(this, hs, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    be(this, _s, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    be(this, Vt, null);
    be(this, zs, di(() => (_e(this, Vt, Tn(g(this, bn))), () => {
      _e(this, Vt, null);
    })));
    var o;
    _e(this, xt, t), _e(this, kt, s), _e(this, gn, (l) => {
      var i = (
        /** @type {Effect} */
        we
      );
      i.b = this, i.f |= vr, r(l);
    }), this.parent = /** @type {Effect} */
    we.b, this.transform_error = a ?? ((o = this.parent) == null ? void 0 : o.transform_error) ?? ((l) => l), _e(this, ct, Dr(() => {
      Se(this, ze, mr).call(this);
    }, fi));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    ja(t, g(this, hs), g(this, _s));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!g(this, kt).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(t, s) {
    Se(this, ze, yr).call(this, t, s), _e(this, bn, g(this, bn) + t), !(!g(this, Vt) || g(this, Vn)) && (_e(this, Vn, !0), vn(() => {
      _e(this, Vn, !1), g(this, Vt) && Xn(g(this, Vt), g(this, bn));
    }));
  }
  get_effect_pending() {
    return g(this, zs).call(this), n(
      /** @type {Source<number>} */
      g(this, Vt)
    );
  }
  /** @param {unknown} error */
  error(t) {
    if (!g(this, kt).onerror && !g(this, kt).failed)
      throw t;
    ie != null && ie.is_fork ? (g(this, Et) && ie.skip_effect(g(this, Et)), g(this, ot) && ie.skip_effect(g(this, ot)), g(this, _t) && ie.skip_effect(g(this, _t)), ie.on_fork_commit(() => {
      Se(this, ze, wr).call(this, t);
    })) : Se(this, ze, wr).call(this, t);
  }
}
xt = new WeakMap(), jr = new WeakMap(), kt = new WeakMap(), gn = new WeakMap(), ct = new WeakMap(), Et = new WeakMap(), ot = new WeakMap(), _t = new WeakMap(), Ht = new WeakMap(), bn = new WeakMap(), an = new WeakMap(), Vn = new WeakMap(), hs = new WeakMap(), _s = new WeakMap(), Vt = new WeakMap(), zs = new WeakMap(), ze = new WeakSet(), _i = function() {
  try {
    _e(this, Et, St(() => g(this, gn).call(this, g(this, xt))));
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
gi = function(t) {
  const s = g(this, kt).failed;
  s && _e(this, _t, St(() => {
    s(
      g(this, xt),
      () => t,
      () => () => {
      }
    );
  }));
}, bi = function() {
  const t = g(this, kt).pending;
  t && (this.is_pending = !0, _e(this, ot, St(() => t(g(this, xt)))), vn(() => {
    var s = _e(this, Ht, document.createDocumentFragment()), r = Gt();
    s.append(r), _e(this, Et, Se(this, ze, Ps).call(this, () => St(() => g(this, gn).call(this, r)))), g(this, an) === 0 && (g(this, xt).before(s), _e(this, Ht, null), kn(
      /** @type {Effect} */
      g(this, ot),
      () => {
        _e(this, ot, null);
      }
    ), Se(this, ze, As).call(
      this,
      /** @type {Batch} */
      ie
    ));
  }));
}, mr = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), _e(this, an, 0), _e(this, bn, 0), _e(this, Et, St(() => {
      g(this, gn).call(this, g(this, xt));
    })), g(this, an) > 0) {
      var t = _e(this, Ht, document.createDocumentFragment());
      Jr(g(this, Et), t);
      const s = (
        /** @type {(anchor: Node) => void} */
        g(this, kt).pending
      );
      _e(this, ot, St(() => s(g(this, xt))));
    } else
      Se(this, ze, As).call(
        this,
        /** @type {Batch} */
        ie
      );
  } catch (s) {
    this.error(s);
  }
}, /**
 * @param {Batch} batch
 */
As = function(t) {
  this.is_pending = !1, t.transfer_effects(g(this, hs), g(this, _s));
}, /**
 * @template T
 * @param {() => T} fn
 */
Ps = function(t) {
  var s = we, r = xe, a = Ae;
  It(g(this, ct)), Ct(g(this, ct)), Gn(g(this, ct).ctx);
  try {
    return $n.ensure(), t();
  } catch (o) {
    return $a(o), null;
  } finally {
    It(s), Ct(r), Gn(a);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
yr = function(t, s) {
  var r;
  if (!this.has_pending_snippet()) {
    this.parent && Se(r = this.parent, ze, yr).call(r, t, s);
    return;
  }
  _e(this, an, g(this, an) + t), g(this, an) === 0 && (Se(this, ze, As).call(this, s), g(this, ot) && kn(g(this, ot), () => {
    _e(this, ot, null);
  }), g(this, Ht) && (g(this, xt).before(g(this, Ht)), _e(this, Ht, null)));
}, /**
 * @param {unknown} error
 */
wr = function(t) {
  g(this, Et) && (ft(g(this, Et)), _e(this, Et, null)), g(this, ot) && (ft(g(this, ot)), _e(this, ot, null)), g(this, _t) && (ft(g(this, _t)), _e(this, _t, null));
  var s = g(this, kt).onerror;
  let r = g(this, kt).failed;
  var a = !1, o = !1;
  const l = () => {
    if (a) {
      ni();
      return;
    }
    a = !0, o && Qo(), g(this, _t) !== null && kn(g(this, _t), () => {
      _e(this, _t, null);
    }), Se(this, ze, Ps).call(this, () => {
      Se(this, ze, mr).call(this);
    });
  }, i = (v) => {
    try {
      o = !0, s == null || s(v, l), o = !1;
    } catch (c) {
      on(c, g(this, ct) && g(this, ct).parent);
    }
    r && _e(this, _t, Se(this, ze, Ps).call(this, () => {
      try {
        return St(() => {
          var c = (
            /** @type {Effect} */
            we
          );
          c.b = this, c.f |= vr, r(
            g(this, xt),
            () => v,
            () => l
          );
        });
      } catch (c) {
        return on(
          c,
          /** @type {Effect} */
          g(this, ct).parent
        ), null;
      }
    }));
  };
  vn(() => {
    var v;
    try {
      v = this.transform_error(t);
    } catch (c) {
      on(c, g(this, ct) && g(this, ct).parent);
      return;
    }
    v !== null && typeof v == "object" && typeof /** @type {any} */
    v.then == "function" ? v.then(
      i,
      /** @param {unknown} e */
      (c) => on(c, g(this, ct) && g(this, ct).parent)
    ) : i(v);
  });
};
function mi(e, t, s, r) {
  const a = ys() ? Kn : Xe;
  var o = e.filter((h) => !h.settled);
  if (s.length === 0 && o.length === 0) {
    r(t.map(a));
    return;
  }
  var l = (
    /** @type {Effect} */
    we
  ), i = yi(), v = o.length === 1 ? o[0].promise : o.length > 1 ? Promise.all(o.map((h) => h.promise)) : null;
  function c(h) {
    if ((l.f & Tt) === 0) {
      i();
      try {
        r(h);
      } catch ($) {
        on($, l);
      }
      Ls();
    }
  }
  var p = Ra();
  if (s.length === 0) {
    v.then(() => c(t.map(a))).finally(p);
    return;
  }
  function b() {
    Promise.all(s.map((h) => /* @__PURE__ */ wi(h))).then((h) => c([...t.map(a), ...h])).catch((h) => on(h, l)).finally(p);
  }
  v ? v.then(() => {
    i(), b(), Ls();
  }) : b();
}
function yi() {
  var e = (
    /** @type {Effect} */
    we
  ), t = xe, s = Ae, r = (
    /** @type {Batch} */
    ie
  );
  return function(o = !0) {
    It(e), Ct(t), Gn(s), o && (e.f & Tt) === 0 && (r == null || r.activate(), r == null || r.apply());
  };
}
function Ls(e = !0) {
  It(null), Ct(null), Gn(null), e && (ie == null || ie.deactivate());
}
function Ra() {
  var e = (
    /** @type {Effect} */
    we
  ), t = (
    /** @type {Boundary} */
    e.b
  ), s = (
    /** @type {Batch} */
    ie
  ), r = t.is_rendered();
  return t.update_pending_count(1, s), s.increment(r, e), () => {
    t.update_pending_count(-1, s), s.decrement(r, e);
  };
}
// @__NO_SIDE_EFFECTS__
function Kn(e) {
  var t = Qe | We;
  return we !== null && (we.f |= es), {
    ctx: Ae,
    deps: null,
    effects: null,
    equals: ka,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      Be
    ),
    wv: 0,
    parent: we,
    ac: null
  };
}
const $s = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function wi(e, t, s) {
  let r = (
    /** @type {Effect | null} */
    we
  );
  r === null && Uo();
  var a = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), o = Tn(
    /** @type {V} */
    Be
  ), l = !xe, i = /* @__PURE__ */ new Set();
  return Ai(() => {
    var $;
    var v = (
      /** @type {Effect} */
      we
    ), c = ya();
    a = c.promise;
    try {
      Promise.resolve(e()).then(c.resolve, (k) => {
        k !== Bs && c.reject(k);
      }).finally(Ls);
    } catch (k) {
      c.reject(k), Ls();
    }
    var p = (
      /** @type {Batch} */
      ie
    );
    if (l) {
      if ((v.f & Nn) !== 0)
        var b = Ra();
      if (
        /** @type {Boundary} */
        r.b.is_rendered()
      )
        ($ = p.async_deriveds.get(v)) == null || $.reject($s);
      else
        for (const k of i.values())
          k.reject($s);
      i.add(c), p.async_deriveds.set(v, c);
    }
    const h = (k, I = void 0) => {
      b == null || b(), i.delete(c), I !== $s && (p.activate(), I ? (o.f |= ln, Xn(o, I)) : ((o.f & ln) !== 0 && (o.f ^= ln), Xn(o, k)), p.deactivate());
    };
    c.promise.then(h, (k) => h(null, k || "unknown"));
  }), Gs(() => {
    for (const v of i)
      v.reject($s);
  }), new Promise((v) => {
    function c(p) {
      function b() {
        p === a ? v(o) : c(a);
      }
      p.then(b, b);
    }
    c(a);
  });
}
// @__NO_SIDE_EFFECTS__
function Wn(e) {
  const t = /* @__PURE__ */ Kn(e);
  return Wa(t), t;
}
// @__NO_SIDE_EFFECTS__
function Xe(e) {
  const t = /* @__PURE__ */ Kn(e);
  return t.equals = Ea, t;
}
function xi(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var s = 0; s < t.length; s += 1)
      ft(
        /** @type {Effect} */
        t[s]
      );
  }
}
function Rr(e) {
  var t, s = we, r = e.parent;
  if (!Kt && r !== null && e.v !== Be && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (Tt | lt)) !== 0)
    return ei(), e.v;
  It(r);
  try {
    e.f &= ~Sn, xi(e), t = eo(e);
  } finally {
    It(s);
  }
  return t;
}
function qa(e) {
  var t = Rr(e);
  if (!e.equals(t) && (e.wv = Za(), (!(ie != null && ie.is_fork) || e.deps === null) && (ie !== null ? (ie.capture(e, t, !0), is == null || is.capture(e, t, !0)) : e.v = t, e.deps === null))) {
    Le(e, He);
    return;
  }
  Kt || (Ze !== null ? (Mr() || ie != null && ie.is_fork) && Ze.set(e, t) : Or(e));
}
function ki(e) {
  var t, s;
  if (e.effects !== null)
    for (const r of e.effects)
      (r.teardown || r.ac) && ((t = r.teardown) == null || t.call(r), (s = r.ac) == null || s.abort(Bs), r.fn !== null && (r.teardown = wn), r.ac = null, ds(r, 0), Lr(r));
}
function Ma(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && t.fn !== null && jn(t);
}
let Fs = /* @__PURE__ */ new Set();
const xn = /* @__PURE__ */ new Map();
let Da = !1;
function Tn(e, t) {
  var s = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: ka,
    rv: 0,
    wv: 0
  };
  return s;
}
// @__NO_SIDE_EFFECTS__
function en(e, t) {
  const s = Tn(e);
  return Wa(s), s;
}
// @__NO_SIDE_EFFECTS__
function L(e, t = !1, s = !0) {
  var a;
  const r = Tn(e);
  return t || (r.equals = Ea), Qn && s && Ae !== null && Ae.l !== null && ((a = Ae.l).s ?? (a.s = [])).push(r), r;
}
function nn(e, t) {
  return _(
    e,
    u(() => n(e))
  ), t;
}
function _(e, t, s = !1) {
  xe !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Rt || (xe.f & Ms) !== 0) && ys() && (xe.f & (Qe | Pt | Ln | Ms)) !== 0 && (jt === null || !yn.call(jt, e)) && Zo();
  let r = s ? qn(t) : t;
  return Xn(e, r, Is);
}
function Xn(e, t, s = null) {
  if (!e.equals(t)) {
    xn.set(e, Kt ? t : e.v);
    var r = $n.ensure();
    if (r.capture(e, t), (e.f & Qe) !== 0) {
      const a = (
        /** @type {Derived} */
        e
      );
      (e.f & We) !== 0 && Rr(a), Ze === null && Or(a);
    }
    e.wv = Za(), La(e, We, s), ys() && we !== null && (we.f & He) !== 0 && (we.f & (qt | cn)) === 0 && (wt === null ? qi([e]) : wt.push(e)), !r.is_fork && Fs.size > 0 && !Da && Ei();
  }
  return t;
}
function Ei() {
  Da = !1;
  for (const e of Fs) {
    (e.f & He) !== 0 && Le(e, Mt);
    let t;
    try {
      t = ns(e);
    } catch {
      t = !0;
    }
    t && jn(e);
  }
  Fs.clear();
}
function vs(e) {
  _(e, e.v + 1);
}
function La(e, t, s) {
  var r = e.reactions;
  if (r !== null)
    for (var a = ys(), o = r.length, l = 0; l < o; l++) {
      var i = r[l], v = i.f;
      if (!(!a && i === we)) {
        var c = (v & We) === 0;
        if (c && Le(i, t), (v & Ms) !== 0)
          Fs.add(
            /** @type {Effect} */
            i
          );
        else if ((v & Qe) !== 0) {
          var p = (
            /** @type {Derived} */
            i
          );
          Ze == null || Ze.delete(p), (v & Sn) === 0 && (v & $t && (we === null || (we.f & Ds) === 0) && (i.f |= Sn), La(p, Mt, s));
        } else if (c) {
          var b = (
            /** @type {Effect} */
            i
          );
          (v & Pt) !== 0 && Ot !== null && Ot.add(b), s !== null ? s.push(b) : Pr(b);
        }
      }
    }
}
function qn(e) {
  if (typeof e != "object" || e === null || Yt in e)
    return e;
  const t = Nr(e);
  if (t !== Ro && t !== qo)
    return e;
  var s = /* @__PURE__ */ new Map(), r = Hs(e), a = /* @__PURE__ */ en(0), o = En, l = (i) => {
    if (En === o)
      return i();
    var v = xe, c = En;
    Ct(null), ra(o);
    var p = i();
    return Ct(v), ra(c), p;
  };
  return r && s.set("length", /* @__PURE__ */ en(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(i, v, c) {
        (!("value" in c) || c.configurable === !1 || c.enumerable === !1 || c.writable === !1) && Wo();
        var p = s.get(v);
        return p === void 0 ? l(() => {
          var b = /* @__PURE__ */ en(c.value);
          return s.set(v, b), b;
        }) : _(p, c.value, !0), !0;
      },
      deleteProperty(i, v) {
        var c = s.get(v);
        if (c === void 0) {
          if (v in i) {
            const p = l(() => /* @__PURE__ */ en(Be));
            s.set(v, p), vs(a);
          }
        } else
          _(c, Be), vs(a);
        return !0;
      },
      get(i, v, c) {
        var $;
        if (v === Yt)
          return e;
        var p = s.get(v), b = v in i;
        if (p === void 0 && (!b || ($ = Dn(i, v)) != null && $.writable) && (p = l(() => {
          var k = qn(b ? i[v] : Be), I = /* @__PURE__ */ en(k);
          return I;
        }), s.set(v, p)), p !== void 0) {
          var h = n(p);
          return h === Be ? void 0 : h;
        }
        return Reflect.get(i, v, c);
      },
      getOwnPropertyDescriptor(i, v) {
        var c = Reflect.getOwnPropertyDescriptor(i, v);
        if (c && "value" in c) {
          var p = s.get(v);
          p && (c.value = n(p));
        } else if (c === void 0) {
          var b = s.get(v), h = b == null ? void 0 : b.v;
          if (b !== void 0 && h !== Be)
            return {
              enumerable: !0,
              configurable: !0,
              value: h,
              writable: !0
            };
        }
        return c;
      },
      has(i, v) {
        var h;
        if (v === Yt)
          return !0;
        var c = s.get(v), p = c !== void 0 && c.v !== Be || Reflect.has(i, v);
        if (c !== void 0 || we !== null && (!p || (h = Dn(i, v)) != null && h.writable)) {
          c === void 0 && (c = l(() => {
            var $ = p ? qn(i[v]) : Be, k = /* @__PURE__ */ en($);
            return k;
          }), s.set(v, c));
          var b = n(c);
          if (b === Be)
            return !1;
        }
        return p;
      },
      set(i, v, c, p) {
        var q;
        var b = s.get(v), h = v in i;
        if (r && v === "length")
          for (var $ = c; $ < /** @type {Source<number>} */
          b.v; $ += 1) {
            var k = s.get($ + "");
            k !== void 0 ? _(k, Be) : $ in i && (k = l(() => /* @__PURE__ */ en(Be)), s.set($ + "", k));
          }
        if (b === void 0)
          (!h || (q = Dn(i, v)) != null && q.writable) && (b = l(() => /* @__PURE__ */ en(void 0)), _(b, qn(c)), s.set(v, b));
        else {
          h = b.v !== Be;
          var I = l(() => qn(c));
          _(b, I);
        }
        var x = Reflect.getOwnPropertyDescriptor(i, v);
        if (x != null && x.set && x.set.call(p, c), !h) {
          if (r && typeof v == "string") {
            var C = (
              /** @type {Source<number>} */
              s.get("length")
            ), A = Number(v);
            Number.isInteger(A) && A >= C.v && _(C, A + 1);
          }
          vs(a);
        }
        return !0;
      },
      ownKeys(i) {
        n(a);
        var v = Reflect.ownKeys(i).filter((b) => {
          var h = s.get(b);
          return h === void 0 || h.v !== Be;
        });
        for (var [c, p] of s)
          p.v !== Be && !(c in i) && v.push(c);
        return v;
      },
      setPrototypeOf() {
        Xo();
      }
    }
  );
}
function ea(e) {
  try {
    if (e !== null && typeof e == "object" && Yt in e)
      return e[Yt];
  } catch {
  }
  return e;
}
function Si(e, t) {
  return Object.is(ea(e), ea(t));
}
var ta, Fa, Ja, za;
function $i() {
  if (ta === void 0) {
    ta = window, Fa = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, s = Text.prototype;
    Ja = Dn(t, "firstChild").get, za = Dn(t, "nextSibling").get, Xr(e) && (e[ur] = void 0, e[Ns] = null, e[dr] = void 0, e.__e = void 0), Xr(s) && (s[rs] = void 0);
  }
}
function Gt(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Bt(e) {
  return (
    /** @type {TemplateNode | null} */
    Ja.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function ws(e) {
  return (
    /** @type {TemplateNode | null} */
    za.call(e)
  );
}
function d(e, t) {
  return /* @__PURE__ */ Bt(e);
}
function Oe(e, t = !1) {
  {
    var s = /* @__PURE__ */ Bt(e);
    return s instanceof Comment && s.data === "" ? /* @__PURE__ */ ws(s) : s;
  }
}
function f(e, t = 1, s = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ ws(r);
  return r;
}
function Ti(e) {
  e.textContent = "";
}
function Ua() {
  return !1;
}
function ji(e, t, s) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(_a, e, void 0)
  );
}
let na = !1;
function Ni() {
  na || (na = !0, document.addEventListener(
    "reset",
    (e) => {
      Promise.resolve().then(() => {
        var t;
        if (!e.defaultPrevented)
          for (
            const s of
            /**@type {HTMLFormElement} */
            e.target.elements
          )
            (t = s[Cs]) == null || t.call(s);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function Ys(e) {
  var t = xe, s = we;
  Ct(null), It(null);
  try {
    return e();
  } finally {
    Ct(t), It(s);
  }
}
function qr(e, t, s, r = s) {
  e.addEventListener(t, () => Ys(s));
  const a = (
    /** @type {any} */
    e[Cs]
  );
  a ? e[Cs] = () => {
    a(), r(!0);
  } : e[Cs] = () => r(!0), Ni();
}
function Ha(e) {
  we === null && (xe === null && Yo(), Bo()), Kt && Vo();
}
function Ci(e, t) {
  var s = t.last;
  s === null ? t.last = t.first = e : (s.next = e, e.prev = s, t.last = e);
}
function zt(e, t) {
  var s = we;
  s !== null && (s.f & lt) !== 0 && (e |= lt);
  var r = {
    ctx: Ae,
    deps: null,
    nodes: null,
    f: e | We | $t,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: s,
    b: s && s.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  ie == null || ie.register_created_effect(r);
  var a = r;
  if ((e & Bn) !== 0)
    Rn !== null ? Rn.push(r) : $n.ensure().schedule(r);
  else if (t !== null) {
    try {
      jn(r);
    } catch (l) {
      throw ft(r), l;
    }
    a.deps === null && a.teardown === null && a.nodes === null && a.first === a.last && // either `null`, or a singular child
    (a.f & es) === 0 && (a = a.first, (e & Pt) !== 0 && (e & Yn) !== 0 && a !== null && (a.f |= Yn));
  }
  if (a !== null && (a.parent = s, s !== null && Ci(a, s), xe !== null && (xe.f & Qe) !== 0 && (e & cn) === 0)) {
    var o = (
      /** @type {Derived} */
      xe
    );
    (o.effects ?? (o.effects = [])).push(a);
  }
  return r;
}
function Mr() {
  return xe !== null && !Rt;
}
function Gs(e) {
  const t = zt(ms, null);
  return Le(t, He), t.teardown = e, t;
}
function xr(e) {
  Ha();
  var t = (
    /** @type {Effect} */
    we.f
  ), s = !xe && (t & qt) !== 0 && (t & Nn) === 0;
  if (s) {
    var r = (
      /** @type {ComponentContext} */
      Ae
    );
    (r.e ?? (r.e = [])).push(e);
  } else
    return Va(e);
}
function Va(e) {
  return zt(Bn | xa, e);
}
function Ii(e) {
  return Ha(), zt(ms | xa, e);
}
function Oi(e) {
  $n.ensure();
  const t = zt(cn | es, e);
  return (s = {}) => new Promise((r) => {
    s.outro ? kn(t, () => {
      ft(t), r(void 0);
    }) : (ft(t), r(void 0));
  });
}
function Ks(e) {
  return zt(Bn, e);
}
function Ve(e, t) {
  var s = (
    /** @type {ComponentContextLegacy} */
    Ae
  ), r = { effect: null, ran: !1, deps: e };
  s.l.$.push(r), r.effect = Cn(() => {
    if (e(), !r.ran) {
      r.ran = !0;
      var a = (
        /** @type {Effect} */
        we
      );
      try {
        It(a.parent), u(t);
      } finally {
        It(a);
      }
    }
  });
}
function Zt() {
  var e = (
    /** @type {ComponentContextLegacy} */
    Ae
  );
  Cn(() => {
    for (var t of e.l.$) {
      t.deps();
      var s = t.effect;
      (s.f & He) !== 0 && s.deps !== null && Le(s, Mt), ns(s) && jn(s), t.ran = !1;
    }
  });
}
function Ai(e) {
  return zt(Ln | es, e);
}
function Cn(e, t = 0) {
  return zt(ms | t, e);
}
function D(e, t = [], s = [], r = []) {
  mi(r, t, s, (a) => {
    zt(ms, () => e(...a.map(n)));
  });
}
function Dr(e, t = 0) {
  var s = zt(Pt | t, e);
  return s;
}
function St(e) {
  return zt(qt | es, e);
}
function Ba(e) {
  var t = e.teardown;
  if (t !== null) {
    const s = Kt, r = xe;
    sa(!0), Ct(null);
    try {
      t.call(null);
    } finally {
      sa(s), Ct(r);
    }
  }
}
function Lr(e, t = !1) {
  var s = e.first;
  for (e.first = e.last = null; s !== null; ) {
    const a = s.ac;
    a !== null && Ys(() => {
      a.abort(Bs);
    });
    var r = s.next;
    (s.f & cn) !== 0 ? s.parent = null : ft(s, t), s = r;
  }
}
function Pi(e) {
  for (var t = e.first; t !== null; ) {
    var s = t.next;
    (t.f & qt) === 0 && ft(t), t = s;
  }
}
function ft(e, t = !0) {
  var s = !1;
  (t || (e.f & Lo) !== 0) && e.nodes !== null && e.nodes.end !== null && (Ri(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), s = !0), Le(e, cr), Lr(e, t && !s), ds(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const o of r)
      o.stop();
  Ba(e), e.f ^= cr, e.f |= Tt;
  var a = e.parent;
  a !== null && a.first !== null && Ya(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Ri(e, t) {
  for (; e !== null; ) {
    var s = e === t ? null : /* @__PURE__ */ ws(e);
    e.remove(), e = s;
  }
}
function Ya(e) {
  var t = e.parent, s = e.prev, r = e.next;
  s !== null && (s.next = r), r !== null && (r.prev = s), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = s));
}
function kn(e, t, s = !0) {
  var r = [];
  Ga(e, r, !0);
  var a = () => {
    s && ft(e), t && t();
  }, o = r.length;
  if (o > 0) {
    var l = () => --o || a();
    for (var i of r)
      i.out(l);
  } else
    a();
}
function Ga(e, t, s) {
  if ((e.f & lt) === 0) {
    e.f ^= lt;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const i of r)
        (i.is_global || s) && t.push(i);
    for (var a = e.first; a !== null; ) {
      var o = a.next;
      if ((a.f & cn) === 0) {
        var l = (a.f & Yn) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (a.f & qt) !== 0 && (e.f & Pt) !== 0;
        Ga(a, t, l ? s : !1);
      }
      a = o;
    }
  }
}
function Fr(e) {
  Ka(e, !0);
}
function Ka(e, t) {
  if ((e.f & lt) !== 0) {
    e.f ^= lt, (e.f & He) === 0 && (Le(e, We), $n.ensure().schedule(e));
    for (var s = e.first; s !== null; ) {
      var r = s.next, a = (s.f & Yn) !== 0 || (s.f & qt) !== 0;
      Ka(s, a ? t : !1), s = r;
    }
    var o = e.nodes && e.nodes.t;
    if (o !== null)
      for (const l of o)
        (l.is_global || t) && l.in();
  }
}
function Jr(e, t) {
  if (e.nodes)
    for (var s = e.nodes.start, r = e.nodes.end; s !== null; ) {
      var a = s === r ? null : /* @__PURE__ */ ws(s);
      t.append(s), s = a;
    }
}
let Rs = !1, Kt = !1;
function sa(e) {
  Kt = e;
}
let xe = null, Rt = !1;
function Ct(e) {
  xe = e;
}
let we = null;
function It(e) {
  we = e;
}
let jt = null;
function Wa(e) {
  xe !== null && (jt === null ? jt = [e] : jt.push(e));
}
let ut = null, pt = 0, wt = null;
function qi(e) {
  wt = e;
}
let Xa = 1, fn = 0, En = fn;
function ra(e) {
  En = e;
}
function Za() {
  return ++Xa;
}
function ns(e) {
  var t = e.f;
  if ((t & We) !== 0)
    return !0;
  if (t & Qe && (e.f &= ~Sn), (t & Mt) !== 0) {
    for (var s = (
      /** @type {Value[]} */
      e.deps
    ), r = s.length, a = 0; a < r; a++) {
      var o = s[a];
      if (ns(
        /** @type {Derived} */
        o
      ) && qa(
        /** @type {Derived} */
        o
      ), o.wv > e.wv)
        return !0;
    }
    (t & $t) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    Ze === null && Le(e, He);
  }
  return !1;
}
function Qa(e, t, s = !0) {
  var r = e.reactions;
  if (r !== null && !(jt !== null && yn.call(jt, e)))
    for (var a = 0; a < r.length; a++) {
      var o = r[a];
      (o.f & Qe) !== 0 ? Qa(
        /** @type {Derived} */
        o,
        t,
        !1
      ) : t === o && (s ? Le(o, We) : (o.f & He) !== 0 && Le(o, Mt), Pr(
        /** @type {Effect} */
        o
      ));
    }
}
function eo(e) {
  var I;
  var t = ut, s = pt, r = wt, a = xe, o = jt, l = Ae, i = Rt, v = En, c = e.f;
  ut = /** @type {null | Value[]} */
  null, pt = 0, wt = null, xe = (c & (qt | cn)) === 0 ? e : null, jt = null, Gn(e.ctx), Rt = !1, En = ++fn, e.ac !== null && (Ys(() => {
    e.ac.abort(Bs);
  }), e.ac = null);
  try {
    e.f |= Ds;
    var p = (
      /** @type {Function} */
      e.fn
    ), b = p();
    e.f |= Nn;
    var h = e.deps, $ = ie == null ? void 0 : ie.is_fork;
    if (ut !== null) {
      var k;
      if ($ || ds(e, pt), h !== null && pt > 0)
        for (h.length = pt + ut.length, k = 0; k < ut.length; k++)
          h[pt + k] = ut[k];
      else
        e.deps = h = ut;
      if (Mr() && (e.f & $t) !== 0)
        for (k = pt; k < h.length; k++)
          ((I = h[k]).reactions ?? (I.reactions = [])).push(e);
    } else !$ && h !== null && pt < h.length && (ds(e, pt), h.length = pt);
    if (ys() && wt !== null && !Rt && h !== null && (e.f & (Qe | Mt | We)) === 0)
      for (k = 0; k < /** @type {Source[]} */
      wt.length; k++)
        Qa(
          wt[k],
          /** @type {Effect} */
          e
        );
    if (a !== null && a !== e) {
      if (fn++, a.deps !== null)
        for (let x = 0; x < s; x += 1)
          a.deps[x].rv = fn;
      if (t !== null)
        for (const x of t)
          x.rv = fn;
      wt !== null && (r === null ? r = wt : r.push(.../** @type {Source[]} */
      wt));
    }
    return (e.f & ln) !== 0 && (e.f ^= ln), b;
  } catch (x) {
    return $a(x);
  } finally {
    e.f ^= Ds, ut = t, pt = s, wt = r, xe = a, jt = o, Gn(l), Rt = i, En = v;
  }
}
function Mi(e, t) {
  let s = t.reactions;
  if (s !== null) {
    var r = Po.call(s, e);
    if (r !== -1) {
      var a = s.length - 1;
      a === 0 ? s = t.reactions = null : (s[r] = s[a], s.pop());
    }
  }
  if (s === null && (t.f & Qe) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (ut === null || !yn.call(ut, t))) {
    var o = (
      /** @type {Derived} */
      t
    );
    (o.f & $t) !== 0 && (o.f ^= $t, o.f &= ~Sn), o.v !== Be && Or(o), ki(o), ds(o, 0);
  }
}
function ds(e, t) {
  var s = e.deps;
  if (s !== null)
    for (var r = t; r < s.length; r++)
      Mi(e, s[r]);
}
function jn(e) {
  var t = e.f;
  if ((t & Tt) === 0) {
    Le(e, He);
    var s = we, r = Rs;
    we = e, Rs = !0;
    try {
      (t & (Pt | wa)) !== 0 ? Pi(e) : Lr(e), Ba(e);
      var a = eo(e);
      e.teardown = typeof a == "function" ? a : null, e.wv = Xa;
      var o;
      ga && xo && (e.f & We) !== 0 && e.deps;
    } finally {
      Rs = r, we = s;
    }
  }
}
async function Di() {
  await Promise.resolve(), ci();
}
function n(e) {
  var t = e.f, s = (t & Qe) !== 0;
  if (xe !== null && !Rt) {
    var r = we !== null && (we.f & Tt) !== 0;
    if (!r && (jt === null || !yn.call(jt, e))) {
      var a = xe.deps;
      if ((xe.f & Ds) !== 0)
        e.rv < fn && (e.rv = fn, ut === null && a !== null && a[pt] === e ? pt++ : ut === null ? ut = [e] : ut.push(e));
      else {
        xe.deps ?? (xe.deps = []), yn.call(xe.deps, e) || xe.deps.push(e);
        var o = e.reactions;
        o === null ? e.reactions = [xe] : yn.call(o, xe) || o.push(xe);
      }
    }
  }
  if (Kt && xn.has(e))
    return xn.get(e);
  if (s) {
    var l = (
      /** @type {Derived} */
      e
    );
    if (Kt) {
      var i = l.v;
      return ((l.f & He) === 0 && l.reactions !== null || no(l)) && (i = Rr(l)), xn.set(l, i), i;
    }
    var v = (l.f & $t) === 0 && !Rt && xe !== null && (Rs || (xe.f & $t) !== 0), c = (l.f & Nn) === 0;
    ns(l) && (v && (l.f |= $t), qa(l)), v && !c && (Ma(l), to(l));
  }
  if (Ze != null && Ze.has(e))
    return Ze.get(e);
  if ((e.f & ln) !== 0)
    throw e.v;
  return e.v;
}
function to(e) {
  if (e.f |= $t, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ?? (t.reactions = [])).push(e), (t.f & Qe) !== 0 && (t.f & $t) === 0 && (Ma(
        /** @type {Derived} */
        t
      ), to(
        /** @type {Derived} */
        t
      ));
}
function no(e) {
  if (e.v === Be) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (xn.has(t) || (t.f & Qe) !== 0 && no(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function u(e) {
  var t = Rt;
  try {
    return Rt = !0, e();
  } finally {
    Rt = t;
  }
}
function je(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (Yt in e)
      kr(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const s = e[t];
        typeof s == "object" && s && Yt in s && kr(s);
      }
  }
}
function kr(e, t = /* @__PURE__ */ new Set()) {
  if (typeof e == "object" && e !== null && // We don't want to traverse DOM elements
  !(e instanceof EventTarget) && !t.has(e)) {
    t.add(e), e instanceof Date && e.getTime();
    for (let r in e)
      try {
        kr(e[r], t);
      } catch {
      }
    const s = Nr(e);
    if (s !== Object.prototype && s !== Array.prototype && s !== Map.prototype && s !== Set.prototype && s !== Date.prototype) {
      const r = ma(s);
      for (let a in r) {
        const o = r[a].get;
        if (o)
          try {
            o.call(e);
          } catch {
          }
      }
    }
  }
}
const Ts = Symbol("events"), Li = /* @__PURE__ */ new Set(), aa = /* @__PURE__ */ new Set();
function Fi(e, t, s, r = {}) {
  function a(o) {
    if (r.capture || Er.call(t, o), !o.cancelBubble)
      return Ys(() => s == null ? void 0 : s.call(this, o));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? vn(() => {
    t.addEventListener(e, a, r);
  }) : t.addEventListener(e, a, r), a;
}
function G(e, t, s, r, a) {
  var o = { capture: r, passive: a }, l = Fi(e, t, s, o);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && Gs(() => {
    t.removeEventListener(e, l, o);
  });
}
let oa = null;
function Er(e) {
  var x, C;
  var t = this, s = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, a = ((x = e.composedPath) == null ? void 0 : x.call(e)) || [], o = (
    /** @type {null | Element} */
    a[0] || e.target
  );
  oa = e;
  var l = 0, i = oa === e && e[Ts];
  if (i) {
    var v = a.indexOf(i);
    if (v !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[Ts] = t;
      return;
    }
    var c = a.indexOf(t);
    if (c === -1)
      return;
    v <= c && (l = v);
  }
  if (o = /** @type {Element} */
  a[l] || e.target, o !== t) {
    ba(e, "currentTarget", {
      configurable: !0,
      get() {
        return o || s;
      }
    });
    var p = xe, b = we;
    Ct(null), It(null);
    try {
      for (var h, $ = []; o !== null; ) {
        var k = o.assignedSlot || o.parentNode || /** @type {any} */
        o.host || null;
        try {
          var I = (C = o[Ts]) == null ? void 0 : C[r];
          I != null && (!/** @type {any} */
          o.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === o) && I.call(o, e);
        } catch (A) {
          h ? $.push(A) : h = A;
        }
        if (e.cancelBubble || k === t || k === null)
          break;
        o = k;
      }
      if (h) {
        for (let A of $)
          queueMicrotask(() => {
            throw A;
          });
        throw h;
      }
    } finally {
      e[Ts] = t, delete e.currentTarget, Ct(p), It(b);
    }
  }
}
var fa;
const nr = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((fa = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : fa.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function Ji(e) {
  return (
    /** @type {string} */
    (nr == null ? void 0 : nr.createHTML(e)) ?? e
  );
}
function so(e) {
  var t = ji("template");
  return t.innerHTML = Ji(e.replaceAll("<!>", "<!---->")), t.content;
}
function Zn(e, t) {
  var s = (
    /** @type {Effect} */
    we
  );
  s.nodes === null && (s.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function S(e, t) {
  var s = (t & ha) !== 0, r = (t & Ao) !== 0, a, o = !e.startsWith("<!>");
  return () => {
    a === void 0 && (a = so(o ? e : "<!>" + e), s || (a = /** @type {TemplateNode} */
    /* @__PURE__ */ Bt(a)));
    var l = (
      /** @type {TemplateNode} */
      r || Fa ? document.importNode(a, !0) : a.cloneNode(!0)
    );
    if (s) {
      var i = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Bt(l)
      ), v = (
        /** @type {TemplateNode} */
        l.lastChild
      );
      Zn(i, v);
    } else
      Zn(l, l);
    return l;
  };
}
// @__NO_SIDE_EFFECTS__
function zi(e, t, s = "svg") {
  var r = !e.startsWith("<!>"), a = (t & ha) !== 0, o = `<${s}>${r ? e : "<!>" + e}</${s}>`, l;
  return () => {
    if (!l) {
      var i = (
        /** @type {DocumentFragment} */
        so(o)
      ), v = (
        /** @type {Element} */
        /* @__PURE__ */ Bt(i)
      );
      if (a)
        for (l = document.createDocumentFragment(); /* @__PURE__ */ Bt(v); )
          l.appendChild(
            /** @type {TemplateNode} */
            /* @__PURE__ */ Bt(v)
          );
      else
        l = /** @type {Element} */
        /* @__PURE__ */ Bt(v);
    }
    var c = (
      /** @type {TemplateNode} */
      l.cloneNode(!0)
    );
    if (a) {
      var p = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Bt(c)
      ), b = (
        /** @type {TemplateNode} */
        c.lastChild
      );
      Zn(p, b);
    } else
      Zn(c, c);
    return c;
  };
}
// @__NO_SIDE_EFFECTS__
function xs(e, t) {
  return /* @__PURE__ */ zi(e, t, "svg");
}
function Ui(e = "") {
  {
    var t = Gt(e + "");
    return Zn(t, t), t;
  }
}
function Wt() {
  var e = document.createDocumentFragment(), t = document.createComment(""), s = Gt();
  return e.append(t, s), Zn(t, s), e;
}
function w(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
const Hi = ["touchstart", "touchmove"];
function Vi(e) {
  return Hi.includes(e);
}
function M(e, t) {
  var s = t == null ? "" : typeof t == "object" ? `${t}` : t;
  s !== /** @type {any} */
  (e[rs] ?? (e[rs] = e.nodeValue)) && (e[rs] = s, e.nodeValue = `${s}`);
}
function Bi(e, t) {
  return Yi(e, t);
}
const js = /* @__PURE__ */ new Map();
function Yi(e, { target: t, anchor: s, props: r = {}, events: a, context: o, intro: l = !0, transformError: i }) {
  $i();
  var v = void 0, c = Oi(() => {
    var p = s ?? t.appendChild(Gt());
    pi(
      /** @type {TemplateNode} */
      p,
      {
        pending: () => {
        }
      },
      ($) => {
        et({});
        var k = (
          /** @type {ComponentContext} */
          Ae
        );
        o && (k.c = o), a && (r.$$events = a), v = e($, r) || {}, tt();
      },
      i
    );
    var b = /* @__PURE__ */ new Set(), h = ($) => {
      for (var k = 0; k < $.length; k++) {
        var I = $[k];
        if (!b.has(I)) {
          b.add(I);
          var x = Vi(I);
          for (const q of [t, document]) {
            var C = js.get(q);
            C === void 0 && (C = /* @__PURE__ */ new Map(), js.set(q, C));
            var A = C.get(I);
            A === void 0 ? (q.addEventListener(I, Er, { passive: x }), C.set(I, 1)) : C.set(I, A + 1);
          }
        }
      }
    };
    return h(Vs(Li)), aa.add(h), () => {
      var x;
      for (var $ of b)
        for (const C of [t, document]) {
          var k = (
            /** @type {Map<string, number>} */
            js.get(C)
          ), I = (
            /** @type {number} */
            k.get($)
          );
          --I == 0 ? (C.removeEventListener($, Er), k.delete($), k.size === 0 && js.delete(C)) : k.set($, I);
        }
      aa.delete(h), p !== s && ((x = p.parentNode) == null || x.removeChild(p));
    };
  });
  return Gi.set(v, c), v;
}
let Gi = /* @__PURE__ */ new WeakMap();
var At, Ft, gt, mn, gs, bs, Us;
class Ki {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, s = !0) {
    /** @type {TemplateNode} */
    vt(this, "anchor");
    /** @type {Map<Batch, Key>} */
    be(this, At, /* @__PURE__ */ new Map());
    /**
     * Map of keys to effects that are currently rendered in the DOM.
     * These effects are visible and actively part of the document tree.
     * Example:
     * ```
     * {#if condition}
     * 	foo
     * {:else}
     * 	bar
     * {/if}
     * ```
     * Can result in the entries `true->Effect` and `false->Effect`
     * @type {Map<Key, Effect>}
     */
    be(this, Ft, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    be(this, gt, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    be(this, mn, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    be(this, gs, !0);
    /**
     * @param {Batch} batch
     */
    be(this, bs, (t) => {
      if (g(this, At).has(t)) {
        var s = (
          /** @type {Key} */
          g(this, At).get(t)
        ), r = g(this, Ft).get(s);
        if (r)
          Fr(r), g(this, mn).delete(s);
        else {
          var a = g(this, gt).get(s);
          a && (g(this, Ft).set(s, a.effect), g(this, gt).delete(s), a.fragment.lastChild.remove(), this.anchor.before(a.fragment), r = a.effect);
        }
        for (const [o, l] of g(this, At)) {
          if (g(this, At).delete(o), o === t)
            break;
          const i = g(this, gt).get(l);
          i && (ft(i.effect), g(this, gt).delete(l));
        }
        for (const [o, l] of g(this, Ft)) {
          if (o === s || g(this, mn).has(o)) continue;
          const i = () => {
            if (Array.from(g(this, At).values()).includes(o)) {
              var c = document.createDocumentFragment();
              Jr(l, c), c.append(Gt()), g(this, gt).set(o, { effect: l, fragment: c });
            } else
              ft(l);
            g(this, mn).delete(o), g(this, Ft).delete(o);
          };
          g(this, gs) || !r ? (g(this, mn).add(o), kn(l, i, !1)) : i();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    be(this, Us, (t) => {
      g(this, At).delete(t);
      const s = Array.from(g(this, At).values());
      for (const [r, a] of g(this, gt))
        s.includes(r) || (ft(a.effect), g(this, gt).delete(r));
    });
    this.anchor = t, _e(this, gs, s);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, s) {
    var r = (
      /** @type {Batch} */
      ie
    ), a = Ua();
    if (s && !g(this, Ft).has(t) && !g(this, gt).has(t))
      if (a) {
        var o = document.createDocumentFragment(), l = Gt();
        o.append(l), g(this, gt).set(t, {
          effect: St(() => s(l)),
          fragment: o
        });
      } else
        g(this, Ft).set(
          t,
          St(() => s(this.anchor))
        );
    if (g(this, At).set(r, t), a) {
      for (const [i, v] of g(this, Ft))
        i === t ? r.unskip_effect(v) : r.skip_effect(v);
      for (const [i, v] of g(this, gt))
        i === t ? r.unskip_effect(v.effect) : r.skip_effect(v.effect);
      r.oncommit(g(this, bs)), r.ondiscard(g(this, Us));
    } else
      g(this, bs).call(this, r);
  }
}
At = new WeakMap(), Ft = new WeakMap(), gt = new WeakMap(), mn = new WeakMap(), gs = new WeakMap(), bs = new WeakMap(), Us = new WeakMap();
function ks(e) {
  Ae === null && Cr(), Qn && Ae.l !== null ? Zi(Ae).m.push(e) : xr(() => {
    const t = u(e);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
function Wi(e) {
  Ae === null && Cr(), ks(() => () => u(e));
}
function Xi(e, t, { bubbles: s = !1, cancelable: r = !1 } = {}) {
  return new CustomEvent(e, { detail: t, bubbles: s, cancelable: r });
}
function ro() {
  const e = Ae;
  return e === null && Cr(), (t, s, r) => {
    var o;
    const a = (
      /** @type {Record<string, Function | Function[]>} */
      (o = e.s.$$events) == null ? void 0 : o[
        /** @type {string} */
        t
      ]
    );
    if (a) {
      const l = Hs(a) ? a.slice() : [a], i = Xi(
        /** @type {string} */
        t,
        s,
        r
      );
      for (const v of l)
        v.call(e.x, i);
      return !i.defaultPrevented;
    }
    return !0;
  };
}
function Zi(e) {
  var t = (
    /** @type {ComponentContextLegacy} */
    e.l
  );
  return t.u ?? (t.u = { a: [], b: [], m: [] });
}
function V(e, t, s = !1) {
  var r = new Ki(e), a = s ? Yn : 0;
  function o(l, i) {
    r.ensure(l, i);
  }
  Dr(() => {
    var l = !1;
    t((i, v = 0) => {
      l = !0, o(v, i);
    }), l || o(-1, null);
  }, a);
}
function Pe(e, t) {
  return t;
}
function Qi(e, t, s) {
  for (var r = [], a = t.length, o, l = t.length, i = 0; i < a; i++) {
    let b = t[i];
    kn(
      b,
      () => {
        if (o) {
          if (o.pending.delete(b), o.done.add(b), o.pending.size === 0) {
            var h = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            Sr(e, Vs(o.done)), h.delete(o), h.size === 0 && (e.outrogroups = null);
          }
        } else
          l -= 1;
      },
      !1
    );
  }
  if (l === 0) {
    var v = r.length === 0 && s !== null;
    if (v) {
      var c = (
        /** @type {Element} */
        s
      ), p = (
        /** @type {Element} */
        c.parentNode
      );
      Ti(p), p.append(c), e.items.clear();
    }
    Sr(e, t, !v);
  } else
    o = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ?? (e.outrogroups = /* @__PURE__ */ new Set())).add(o);
}
function Sr(e, t, s = !0) {
  var r;
  if (e.pending.size > 0) {
    r = /* @__PURE__ */ new Set();
    for (const l of e.pending.values())
      for (const i of l)
        r.add(
          /** @type {EachItem} */
          e.items.get(i).e
        );
  }
  for (var a = 0; a < t.length; a++) {
    var o = t[a];
    if (r != null && r.has(o)) {
      o.f |= Jt;
      const l = document.createDocumentFragment();
      Jr(o, l);
    } else
      ft(t[a], s);
  }
}
var ia;
function Re(e, t, s, r, a, o = null) {
  var l = e, i = /* @__PURE__ */ new Map(), v = (t & pa) !== 0;
  if (v) {
    var c = (
      /** @type {Element} */
      e
    );
    l = c.appendChild(Gt());
  }
  var p = null, b = /* @__PURE__ */ Xe(() => {
    var q = s();
    return Hs(q) ? q : q == null ? [] : Vs(q);
  }), h, $ = /* @__PURE__ */ new Map(), k = !0;
  function I(q) {
    (A.effect.f & Tt) === 0 && (A.pending.delete(q), A.fallback = p, el(A, h, l, t, r), p !== null && (h.length === 0 ? (p.f & Jt) === 0 ? Fr(p) : (p.f ^= Jt, os(p, null, l)) : kn(p, () => {
      p = null;
    })));
  }
  function x(q) {
    A.pending.delete(q);
  }
  var C = Dr(() => {
    h = /** @type {V[]} */
    n(b);
    for (var q = h.length, R = /* @__PURE__ */ new Set(), H = (
      /** @type {Batch} */
      ie
    ), ne = Ua(), ee = 0; ee < q; ee += 1) {
      var ue = h[ee], B = r(ue, ee), F = k ? null : i.get(B);
      F ? (F.v && Xn(F.v, ue), F.i && Xn(F.i, ee), ne && H.unskip_effect(F.e)) : (F = tl(
        i,
        k ? l : ia ?? (ia = Gt()),
        ue,
        B,
        ee,
        a,
        t,
        s
      ), k || (F.e.f |= Jt), i.set(B, F)), R.add(B);
    }
    if (q === 0 && o && !p && (k ? p = St(() => o(l)) : (p = St(() => o(ia ?? (ia = Gt()))), p.f |= Jt)), q > R.size && Ho(), !k)
      if ($.set(H, R), ne) {
        for (const [E, y] of i)
          R.has(E) || H.skip_effect(y.e);
        H.oncommit(I), H.ondiscard(x);
      } else
        I(H);
    n(b);
  }), A = { effect: C, items: i, pending: $, outrogroups: null, fallback: p };
  k = !1;
}
function ss(e) {
  for (; e !== null && (e.f & qt) === 0; )
    e = e.next;
  return e;
}
function el(e, t, s, r, a) {
  var F, E, y, m, N, J, T, W, de;
  var o = (r & $o) !== 0, l = t.length, i = e.items, v = ss(e.effect.first), c, p = null, b, h = [], $ = [], k, I, x, C;
  if (o)
    for (C = 0; C < l; C += 1)
      k = t[C], I = a(k, C), x = /** @type {EachItem} */
      i.get(I).e, (x.f & Jt) === 0 && ((E = (F = x.nodes) == null ? void 0 : F.a) == null || E.measure(), (b ?? (b = /* @__PURE__ */ new Set())).add(x));
  for (C = 0; C < l; C += 1) {
    if (k = t[C], I = a(k, C), x = /** @type {EachItem} */
    i.get(I).e, e.outrogroups !== null)
      for (const Y of e.outrogroups)
        Y.pending.delete(x), Y.done.delete(x);
    if ((x.f & lt) !== 0 && (Fr(x), o && ((m = (y = x.nodes) == null ? void 0 : y.a) == null || m.unfix(), (b ?? (b = /* @__PURE__ */ new Set())).delete(x))), (x.f & Jt) !== 0)
      if (x.f ^= Jt, x === v)
        os(x, null, s);
      else {
        var A = p ? p.next : v;
        x === e.effect.last && (e.effect.last = x.prev), x.prev && (x.prev.next = x.next), x.next && (x.next.prev = x.prev), tn(e, p, x), tn(e, x, A), os(x, A, s), p = x, h = [], $ = [], v = ss(p.next);
        continue;
      }
    if (x !== v) {
      if (c !== void 0 && c.has(x)) {
        if (h.length < $.length) {
          var q = $[0], R;
          p = q.prev;
          var H = h[0], ne = h[h.length - 1];
          for (R = 0; R < h.length; R += 1)
            os(h[R], q, s);
          for (R = 0; R < $.length; R += 1)
            c.delete($[R]);
          tn(e, H.prev, ne.next), tn(e, p, H), tn(e, ne, q), v = q, p = ne, C -= 1, h = [], $ = [];
        } else
          c.delete(x), os(x, v, s), tn(e, x.prev, x.next), tn(e, x, p === null ? e.effect.first : p.next), tn(e, p, x), p = x;
        continue;
      }
      for (h = [], $ = []; v !== null && v !== x; )
        (c ?? (c = /* @__PURE__ */ new Set())).add(v), $.push(v), v = ss(v.next);
      if (v === null)
        continue;
    }
    (x.f & Jt) === 0 && h.push(x), p = x, v = ss(x.next);
  }
  if (e.outrogroups !== null) {
    for (const Y of e.outrogroups)
      Y.pending.size === 0 && (Sr(e, Vs(Y.done)), (N = e.outrogroups) == null || N.delete(Y));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (v !== null || c !== void 0) {
    var ee = [];
    if (c !== void 0)
      for (x of c)
        (x.f & lt) === 0 && ee.push(x);
    for (; v !== null; )
      (v.f & lt) === 0 && v !== e.fallback && ee.push(v), v = ss(v.next);
    var ue = ee.length;
    if (ue > 0) {
      var B = (r & pa) !== 0 && l === 0 ? s : null;
      if (o) {
        for (C = 0; C < ue; C += 1)
          (T = (J = ee[C].nodes) == null ? void 0 : J.a) == null || T.measure();
        for (C = 0; C < ue; C += 1)
          (de = (W = ee[C].nodes) == null ? void 0 : W.a) == null || de.fix();
      }
      Qi(e, ee, B);
    }
  }
  o && vn(() => {
    var Y, z;
    if (b !== void 0)
      for (x of b)
        (z = (Y = x.nodes) == null ? void 0 : Y.a) == null || z.apply();
  });
}
function tl(e, t, s, r, a, o, l, i) {
  var v = (l & Eo) !== 0 ? (l & To) === 0 ? /* @__PURE__ */ L(s, !1, !1) : Tn(s) : null, c = (l & So) !== 0 ? Tn(a) : null;
  return {
    v,
    i: c,
    e: St(() => (o(t, v ?? s, c ?? a, i), () => {
      e.delete(r);
    }))
  };
}
function os(e, t, s) {
  if (e.nodes)
    for (var r = e.nodes.start, a = e.nodes.end, o = t && (t.f & Jt) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : s; r !== null; ) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ ws(r)
      );
      if (o.before(r), r === a)
        return;
      r = l;
    }
}
function tn(e, t, s) {
  t === null ? e.effect.first = s : t.next = s, s === null ? e.effect.last = t : s.prev = t;
}
function nl(e, t, s) {
  Ks(() => {
    var r = u(() => t(e, s == null ? void 0 : s()) || {});
    if (s && (r != null && r.update)) {
      var a = !1, o = (
        /** @type {any} */
        {}
      );
      Cn(() => {
        var l = s();
        je(l), a && Ir(o, l) && (o = l, r.update(l));
      }), a = !0;
    }
    if (r != null && r.destroy)
      return () => (
        /** @type {Function} */
        r.destroy()
      );
  });
}
const la = [...` 	
\r\f \v\uFEFF`];
function sl(e, t, s) {
  var r = e == null ? "" : "" + e;
  if (t && (r = r ? r + " " + t : t), s) {
    for (var a of Object.keys(s))
      if (s[a])
        r = r ? r + " " + a : a;
      else if (r.length)
        for (var o = a.length, l = 0; (l = r.indexOf(a, l)) >= 0; ) {
          var i = l + o;
          (l === 0 || la.includes(r[l - 1])) && (i === r.length || la.includes(r[i])) ? r = (l === 0 ? "" : r.substring(0, l)) + r.substring(i + 1) : l = i;
        }
  }
  return r === "" ? null : r;
}
function rl(e, t) {
  return e == null ? null : String(e);
}
function Nt(e, t, s, r, a, o) {
  var l = (
    /** @type {any} */
    e[ur]
  );
  if (l !== s || l === void 0) {
    var i = sl(s, r, o);
    i == null ? e.removeAttribute("class") : e.className = i, e[ur] = s;
  } else if (o && a !== o)
    for (var v in o) {
      var c = !!o[v];
      (a == null || c !== !!a[v]) && e.classList.toggle(v, c);
    }
  return o;
}
function ao(e, t, s, r) {
  var a = (
    /** @type {any} */
    e[dr]
  );
  if (a !== t) {
    var o = rl(t);
    o == null ? e.removeAttribute("style") : e.style.cssText = o, e[dr] = t;
  }
  return r;
}
function zr(e, t, s = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!Hs(t))
      return ti();
    for (var r of e.options)
      r.selected = t.includes(cs(r));
    return;
  }
  for (r of e.options) {
    var a = cs(r);
    if (Si(a, t)) {
      r.selected = !0;
      return;
    }
  }
  (!s || t !== void 0) && (e.selectedIndex = -1);
}
function oo(e) {
  var t = new MutationObserver(() => {
    zr(e, e.__value);
  });
  t.observe(e, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), Gs(() => {
    t.disconnect();
  });
}
function $r(e, t, s = t) {
  var r = /* @__PURE__ */ new WeakSet(), a = !0;
  qr(e, "change", (o) => {
    var l = o ? "[selected]" : ":checked", i;
    if (e.multiple)
      i = [].map.call(e.querySelectorAll(l), cs);
    else {
      var v = e.querySelector(l) ?? // will fall back to first non-disabled option if no option is selected
      e.querySelector("option:not([disabled])");
      i = v && cs(v);
    }
    s(i), e.__value = i, ie !== null && r.add(ie);
  }), Ks(() => {
    var o = t();
    if (e === document.activeElement) {
      var l = (
        /** @type {Batch} */
        ie
      );
      if (r.has(l))
        return;
    }
    if (zr(e, o, a), a && o === void 0) {
      var i = e.querySelector(":checked");
      i !== null && (o = cs(i), s(o));
    }
    e.__value = o, a = !1;
  }), oo(e);
}
function cs(e) {
  return "__value" in e ? e.__value : e.value;
}
const al = Symbol("is custom element"), ol = Symbol("is html"), il = zo ? "progress" : "PROGRESS";
function Mn(e, t) {
  var s = Ur(e);
  s.value === (s.value = // treat null and undefined the same for the initial value
  t ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  e.value === t && (t !== 0 || e.nodeName !== il) || (e.value = t ?? "");
}
function ll(e, t) {
  var s = Ur(e);
  s.checked !== (s.checked = // treat null and undefined the same for the initial value
  t ?? void 0) && (e.checked = t);
}
function qe(e, t, s, r) {
  var a = Ur(e);
  a[t] !== (a[t] = s) && (t === "loading" && (e[Jo] = s), s == null ? e.removeAttribute(t) : typeof s != "string" && vl(e).includes(t) ? e[t] = s : e.setAttribute(t, s));
}
function Ur(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    e[Ns] ?? (e[Ns] = {
      [al]: e.nodeName.includes("-"),
      [ol]: e.namespaceURI === _a
    })
  );
}
var va = /* @__PURE__ */ new Map();
function vl(e) {
  var t = e.getAttribute("is") || e.nodeName, s = va.get(t);
  if (s) return s;
  va.set(t, s = []);
  for (var r, a = e, o = Element.prototype; o !== a; ) {
    r = ma(a);
    for (var l in r)
      r[l].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      l !== "innerHTML" && l !== "textContent" && l !== "innerText" && s.push(l);
    a = Nr(a);
  }
  return s;
}
function dt(e, t, s = t) {
  var r = /* @__PURE__ */ new WeakSet();
  qr(e, "input", async (a) => {
    var o = a ? e.defaultValue : e.value;
    if (o = sr(e) ? rr(o) : o, s(o), ie !== null && r.add(ie), await Di(), o !== (o = t())) {
      var l = e.selectionStart, i = e.selectionEnd, v = e.value.length;
      if (e.value = o ?? "", i !== null) {
        var c = e.value.length;
        l === i && i === v && c > v ? (e.selectionStart = c, e.selectionEnd = c) : (e.selectionStart = l, e.selectionEnd = Math.min(i, c));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  u(t) == null && e.value && (s(sr(e) ? rr(e.value) : e.value), ie !== null && r.add(ie)), Cn(() => {
    var a = t();
    if (e === document.activeElement) {
      var o = (
        /** @type {Batch} */
        ie
      );
      if (r.has(o))
        return;
    }
    sr(e) && a === rr(e.value) || e.type === "date" && !a && !e.value || a !== e.value && (e.value = a ?? "");
  });
}
function io(e, t, s = t) {
  qr(e, "change", (r) => {
    var a = r ? e.defaultChecked : e.checked;
    s(a);
  }), // If we are hydrating and the value has since changed,
  // then use the update value from the input instead.
  // If defaultChecked is set, then checked == defaultChecked
  u(t) == null && s(e.checked), Cn(() => {
    var r = t();
    e.checked = !!r;
  });
}
function sr(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function rr(e) {
  return e === "" ? null : +e;
}
function ar(e, t) {
  return e === t || (e == null ? void 0 : e[Yt]) === t;
}
function lo(e = {}, t, s, r) {
  var a = (
    /** @type {ComponentContext} */
    Ae.r
  ), o = (
    /** @type {Effect} */
    we
  );
  return Ks(() => {
    var l, i;
    return Cn(() => {
      l = i, i = [], u(() => {
        ar(s(...i), e) || (t(e, ...i), l && ar(s(...l), e) && t(null, ...l));
      });
    }), () => {
      let v = o;
      for (; v !== a && v.parent !== null && v.parent.f & cr; )
        v = v.parent;
      const c = () => {
        i && ar(s(...i), e) && t(null, ...i);
      }, p = v.teardown;
      v.teardown = () => {
        c(), p == null || p();
      };
    };
  }), e;
}
function Tr(e) {
  return function(...t) {
    var s = (
      /** @type {Event} */
      t[0]
    );
    s.target === this && (e == null || e.apply(this, t));
  };
}
function or(e) {
  return function(...t) {
    var s = (
      /** @type {Event} */
      t[0]
    );
    return s.stopPropagation(), e == null ? void 0 : e.apply(this, t);
  };
}
function st(e = !1) {
  const t = (
    /** @type {ComponentContextLegacy} */
    Ae
  ), s = t.l.u;
  if (!s) return;
  let r = () => je(t.s);
  if (e) {
    let a = 0, o = (
      /** @type {Record<string, any>} */
      {}
    );
    const l = /* @__PURE__ */ Kn(() => {
      let i = !1;
      const v = t.s;
      for (const c in v)
        v[c] !== o[c] && (o[c] = v[c], i = !0);
      return i && a++, a;
    });
    r = () => n(l);
  }
  s.b.length && Ii(() => {
    ca(t, r), lr(s.b);
  }), xr(() => {
    const a = u(() => s.m.map(Mo));
    return () => {
      for (const o of a)
        typeof o == "function" && o();
    };
  }), s.a.length && xr(() => {
    ca(t, r), lr(s.a);
  });
}
function ca(e, t) {
  if (e.l.s)
    for (const s of e.l.s) n(s);
  t();
}
function Ye(e, t, s, r) {
  var R;
  var a = !Qn || (s & No) !== 0, o = (s & Io) !== 0, l = (s & Oo) !== 0, i = (
    /** @type {V} */
    r
  ), v = !0, c = (
    /** @type {Derived<V> | undefined} */
    void 0
  ), p = () => l && a ? (c ?? (c = /* @__PURE__ */ Kn(
    /** @type {() => V} */
    r
  )), n(c)) : (v && (v = !1, i = l ? u(
    /** @type {() => V} */
    r
  ) : (
    /** @type {V} */
    r
  )), i);
  let b;
  if (o) {
    var h = Yt in e || Fo in e;
    b = ((R = Dn(e, t)) == null ? void 0 : R.set) ?? (h && t in e ? (H) => e[t] = H : void 0);
  }
  var $, k = !1;
  o ? [$, k] = ii(() => (
    /** @type {V} */
    e[t]
  )) : $ = /** @type {V} */
  e[t], $ === void 0 && r !== void 0 && ($ = p(), b && (a && Ko(), b($)));
  var I;
  if (a ? I = () => {
    var H = (
      /** @type {V} */
      e[t]
    );
    return H === void 0 ? p() : (v = !0, H);
  } : I = () => {
    var H = (
      /** @type {V} */
      e[t]
    );
    return H !== void 0 && (i = /** @type {V} */
    void 0), H === void 0 ? i : H;
  }, a && (s & Co) === 0)
    return I;
  if (b) {
    var x = e.$$legacy;
    return (
      /** @type {() => V} */
      (function(H, ne) {
        return arguments.length > 0 ? ((!a || !ne || x || k) && b(ne ? I() : H), H) : I();
      })
    );
  }
  var C = !1, A = ((s & jo) !== 0 ? Kn : Xe)(() => (C = !1, I()));
  o && n(A);
  var q = (
    /** @type {Effect} */
    we
  );
  return (
    /** @type {() => V} */
    (function(H, ne) {
      if (arguments.length > 0) {
        const ee = ne ? n(A) : a && o ? qn(H) : H;
        return _(A, ee), C = !0, i !== void 0 && (i = ee), H;
      }
      return Kt && C || (q.f & Tt) !== 0 ? A.v : n(A);
    })
  );
}
const it = ts({ nodes: {}, edges: [], toolEdges: [] }), un = ts(null), qs = ts(null), Pn = ts({
  triggerType: "rest",
  description: "",
  cronExpression: "",
  webhookUrl: ""
});
function cl(e) {
  it.update((t) => ({ ...t, edges: [...t.edges, e] }));
}
var ul = /* @__PURE__ */ xs('<line stroke-width="2" marker-end="url(#arrow)"></line>'), dl = /* @__PURE__ */ xs('<line stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.8"></line>'), fl = /* @__PURE__ */ xs('<circle cx="148" cy="8" r="8" fill="#f59e0b"></circle><text x="148" y="12" fill="#000" font-size="8" font-family="monospace" text-anchor="middle"> </text>', 1), pl = /* @__PURE__ */ xs('<g style="cursor:pointer" role="button" tabindex="0"><rect width="160" height="40" rx="6"></rect><text x="12" y="14" fill="#94a3b8" font-size="9" font-family="monospace"> </text><text x="12" y="29" fill="#e2e8f0" font-size="12" font-family="system-ui"> </text><!><circle cx="160" cy="20" r="5" class="port port-out"></circle><circle cx="0" cy="20" r="5" class="port port-in"></circle></g>'), hl = /* @__PURE__ */ xs('<line stroke="#7c6af7" stroke-width="1.5" stroke-dasharray="6,3" pointer-events="none"></line>'), _l = /* @__PURE__ */ S('<input class="picker-input svelte-1lehbkp" type="text" placeholder="JSONata expression"/> <button class="picker-btn picker-add svelte-1lehbkp">Add</button>', 1), gl = /* @__PURE__ */ S('<div class="edge-picker svelte-1lehbkp"><button class="picker-btn svelte-1lehbkp">Unconditional</button> <button class="picker-btn svelte-1lehbkp">Fallback</button> <button class="picker-btn svelte-1lehbkp">Conditional</button> <!> <button class="picker-btn picker-cancel svelte-1lehbkp">Cancel</button></div>'), bl = /* @__PURE__ */ S('<div class="empty-hint svelte-1lehbkp">Drag nodes from the palette to build your agent graph</div>'), ml = /* @__PURE__ */ S('<div class="canvas-wrap svelte-1lehbkp" role="presentation"><svg style="width:100%;height:100%"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#7c6af7"></path></marker></defs><!><!><!><!></svg> <!> <!></div>');
function yl(e, t) {
  et(t, !1);
  const s = () => nt(it, "$graph", a), r = () => nt(un, "$selectedNode", a), [a, o] = Xt(), l = /* @__PURE__ */ L();
  Ye(t, "agentId", 8);
  const i = /* @__PURE__ */ new Set(["core:tool", "core:mcp-client"]), v = /* @__PURE__ */ new Set(["core:tool-call", "core:react"]);
  let c = /* @__PURE__ */ L([]), p = /* @__PURE__ */ L([]), b = /* @__PURE__ */ L([]), h = null, $ = { x: 0, y: 0 }, k = /* @__PURE__ */ L(), I = /* @__PURE__ */ L({ x: 0, y: 0, w: 1e3, h: 600 }), x = !1, C = { mx: 0, my: 0, vbx: 0, vby: 0 }, A = /* @__PURE__ */ L(null), q = /* @__PURE__ */ L({ x: 0, y: 0 }), R = /* @__PURE__ */ L(null), H = /* @__PURE__ */ L({ x: 0, y: 0 }), ne = /* @__PURE__ */ L(""), ee = /* @__PURE__ */ L(!1);
  function ue(P) {
    un.set(P);
  }
  function B(P) {
    const j = s().nodes[P];
    return (j == null ? void 0 : j.position) ?? { x: 100, y: 100 };
  }
  function F(P, j) {
    const K = n(k).createSVGPoint();
    K.x = P, K.y = j;
    const se = K.matrixTransform(n(k).getScreenCTM().inverse());
    return { x: se.x, y: se.y };
  }
  function E(P, j) {
    return P.addEventListener("wheel", j, { passive: !1 }), {
      destroy() {
        P.removeEventListener("wheel", j);
      }
    };
  }
  function y(P) {
    P.preventDefault();
    const j = P.deltaY > 0 ? 1.1 : 0.9, K = n(k).getBoundingClientRect(), se = (P.clientX - K.left) / K.width * n(I).w + n(I).x, me = (P.clientY - K.top) / K.height * n(I).h + n(I).y;
    _(I, {
      x: se - (se - n(I).x) * j,
      y: me - (me - n(I).y) * j,
      w: n(I).w * j,
      h: n(I).h * j
    });
  }
  function m(P) {
    const j = P.target;
    j.closest("g") || j.tagName === "circle" || (x = !0, C = {
      mx: P.clientX,
      my: P.clientY,
      vbx: n(I).x,
      vby: n(I).y
    });
  }
  function N(P, j) {
    const K = F(P.clientX, P.clientY), se = j.position ?? { x: 100, y: 100 };
    h = j, $ = { x: K.x - se.x, y: K.y - se.y };
  }
  function J(P, j) {
    const K = F(P.clientX, P.clientY);
    _(A, { fromNodeId: j, x: K.x, y: K.y }), _(q, K);
  }
  function T(P) {
    if (n(A) && n(A).fromNodeId !== P) {
      const j = n(k).getBoundingClientRect();
      _(H, {
        x: (n(q).x - n(I).x) / n(I).w * j.width,
        y: (n(q).y - n(I).y) / n(I).h * j.height
      }), _(R, { from: n(A).fromNodeId, to: P });
    }
    _(A, null);
  }
  function W(P) {
    if (x) {
      const j = n(I).w / n(k).clientWidth, K = n(I).h / n(k).clientHeight;
      _(I, {
        ...n(I),
        x: C.vbx - (P.clientX - C.mx) * j,
        y: C.vby - (P.clientY - C.my) * K
      });
    }
    if (h) {
      const j = F(P.clientX, P.clientY), K = h.id;
      it.update((se) => ({
        ...se,
        nodes: {
          ...se.nodes,
          [K]: {
            ...se.nodes[K],
            position: { x: j.x - $.x, y: j.y - $.y }
          }
        }
      }));
    }
    n(A) && _(q, F(P.clientX, P.clientY));
  }
  function de() {
    x = !1, h = null, _(A, null);
  }
  function Y(P, j) {
    if (!n(R)) return;
    const K = {
      id: `e-${Date.now()}`,
      from: n(R).from,
      to: n(R).to,
      type: P,
      ...j ? { condition: j } : {}
    };
    cl(K), _(R, null), _(ee, !1), _(ne, "");
  }
  Ve(() => s(), () => {
    _(c, Object.values(s().nodes)), _(p, s().edges), _(b, s().toolEdges ?? []);
  }), Ve(() => n(b), () => {
    _(l, n(b).reduce(
      (P, j) => (P[j.to] = (P[j.to] ?? 0) + 1, P),
      {}
    ));
  }), Zt(), st();
  var z = ml(), O = d(z), X = f(d(O));
  Re(X, 1, () => n(p), Pe, (P, j) => {
    const K = /* @__PURE__ */ Xe(() => (n(j), u(() => B(n(j).from)))), se = /* @__PURE__ */ Xe(() => (n(j), u(() => B(n(j).to))));
    var me = ul();
    D(() => {
      qe(me, "x1", (je(n(K)), u(() => n(K).x + 160))), qe(me, "y1", (je(n(K)), u(() => n(K).y + 20))), qe(me, "x2", (je(n(se)), u(() => n(se).x))), qe(me, "y2", (je(n(se)), u(() => n(se).y + 20))), qe(me, "stroke", (n(j), u(() => n(j).type === "fallback" ? "#94a3b8" : "#7c6af7"))), qe(me, "stroke-dasharray", (n(j), u(() => n(j).type === "fallback" ? "4" : "0")));
    }), w(P, me);
  });
  var ve = f(X);
  Re(ve, 1, () => n(b), Pe, (P, j) => {
    const K = /* @__PURE__ */ Xe(() => (n(j), u(() => B(n(j).from)))), se = /* @__PURE__ */ Xe(() => (n(j), u(() => B(n(j).to))));
    var me = dl();
    D(() => {
      qe(me, "x1", (je(n(K)), u(() => n(K).x + 160))), qe(me, "y1", (je(n(K)), u(() => n(K).y + 20))), qe(me, "x2", (je(n(se)), u(() => n(se).x))), qe(me, "y2", (je(n(se)), u(() => n(se).y + 20)));
    }), w(P, me);
  });
  var ae = f(ve);
  Re(ae, 1, () => n(c), Pe, (P, j) => {
    const K = /* @__PURE__ */ Xe(() => (n(j), u(() => n(j).position ?? { x: 100, y: 100 }))), se = /* @__PURE__ */ Xe(() => (n(j), u(() => i.has(n(j).type)))), me = /* @__PURE__ */ Xe(() => (n(j), u(() => v.has(n(j).type)))), Fe = /* @__PURE__ */ Xe(() => (r(), n(j), u(() => {
      var Q;
      return ((Q = r()) == null ? void 0 : Q.id) === n(j).id;
    }))), Me = /* @__PURE__ */ Xe(() => (n(l), n(j), u(() => n(l)[n(j).id] ?? 0)));
    var ye = pl(), ge = d(ye), Z = f(ge), oe = d(Z), pe = f(Z), Ce = d(pe), Ge = f(pe);
    {
      var Ke = (Q) => {
        var ce = fl(), Te = f(Oe(ce)), Je = d(Te);
        D(() => M(Je, n(Me))), w(Q, ce);
      };
      V(Ge, (Q) => {
        n(me) && n(Me) > 0 && Q(Ke);
      });
    }
    var Ue = f(Ge), U = f(Ue);
    D(() => {
      qe(ye, "transform", `translate(${je(n(K)), u(() => n(K).x) ?? ""},${je(n(K)), u(() => n(K).y) ?? ""})`), qe(ge, "fill", n(Fe) ? n(se) ? "#2d1f00" : "#312e7a" : n(se) ? "#1e1600" : "#1e2035"), qe(ge, "stroke", n(Fe) ? n(se) ? "#f59e0b" : "#7c6af7" : n(se) ? "#b45309" : "#2d3148"), qe(ge, "stroke-width", n(se) ? "2" : "1.5"), M(oe, (n(j), u(() => n(j).type))), M(Ce, (n(j), u(() => n(j).label ?? n(j).id)));
    }), G("mousedown", Ue, or((Q) => J(Q, n(j).id))), G("mouseup", U, or(() => T(n(j).id))), G("click", ye, () => ue(n(j))), G("keydown", ye, (Q) => Q.key === "Enter" && ue(n(j))), G("mousedown", ye, or((Q) => N(Q, n(j)))), w(P, ye);
  });
  var he = f(ae);
  {
    var le = (P) => {
      var j = hl();
      D(() => {
        qe(j, "x1", (n(A), u(() => n(A).x))), qe(j, "y1", (n(A), u(() => n(A).y))), qe(j, "x2", (n(q), u(() => n(q).x))), qe(j, "y2", (n(q), u(() => n(q).y)));
      }), w(P, j);
    };
    V(he, (P) => {
      n(A) && P(le);
    });
  }
  lo(O, (P) => _(k, P), () => n(k)), nl(O, (P, j) => E == null ? void 0 : E(P, j), () => y), Ks(() => G("mousedown", O, m));
  var re = f(O, 2);
  {
    var te = (P) => {
      var j = gl(), K = d(j), se = f(K, 2), me = f(se, 2), Fe = f(me, 2);
      {
        var Me = (ge) => {
          var Z = _l(), oe = Oe(Z), pe = f(oe, 2);
          dt(oe, () => n(ne), (Ce) => _(ne, Ce)), G("click", pe, () => Y("conditional", n(ne))), w(ge, Z);
        };
        V(Fe, (ge) => {
          n(ee) && ge(Me);
        });
      }
      var ye = f(Fe, 2);
      D(() => ao(j, `left:${n(H), u(() => n(H).x) ?? ""}px;top:${n(H), u(() => n(H).y) ?? ""}px`)), G("click", K, () => Y("unconditional")), G("click", se, () => Y("fallback")), G("click", me, () => {
        _(ee, !n(ee));
      }), G("click", ye, () => {
        _(R, null), _(ee, !1);
      }), w(P, j);
    };
    V(re, (P) => {
      n(R) && P(te);
    });
  }
  var fe = f(re, 2);
  {
    var ke = (P) => {
      var j = bl();
      w(P, j);
    };
    V(fe, (P) => {
      n(c), u(() => n(c).length === 0) && P(ke);
    });
  }
  D(() => qe(O, "viewBox", `${n(I), u(() => n(I).x) ?? ""} ${n(I), u(() => n(I).y) ?? ""} ${n(I), u(() => n(I).w) ?? ""} ${n(I), u(() => n(I).h) ?? ""}`)), G("mousemove", z, W), G("mouseup", z, de), G("mouseleave", z, de), w(e, z), tt(), o();
}
const us = ts([]);
var wl = /* @__PURE__ */ S('<button class="palette-item svelte-142uvrg"><span class="node-name svelte-142uvrg"> </span> <span class="node-type svelte-142uvrg"> </span></button>'), xl = /* @__PURE__ */ S('<a class="marketplace-link svelte-142uvrg">Browse Marketplace →</a>'), kl = /* @__PURE__ */ S('<div class="category-header svelte-142uvrg"> </div> <!> <!>', 1), El = /* @__PURE__ */ S('<div class="palette svelte-142uvrg"><div class="palette-header svelte-142uvrg">Nodes</div> <!></div>');
function Sl(e, t) {
  et(t, !1);
  const s = () => nt(us, "$nodeTypes", r), [r, a] = Xt(), o = /* @__PURE__ */ L(), l = 3e4;
  let i = null, v = "", c = /* @__PURE__ */ L(!1);
  const p = {
    "control-flow": "Control Flow",
    "ai-llm": "AI / LLM",
    data: "Data",
    integration: "Integrations",
    code: "Code",
    composition: "Composition",
    observability: "Observability",
    guardrails: "Guardrails",
    tool: "Tools",
    session: "Session"
  };
  function b(x) {
    const C = /* @__PURE__ */ new Map();
    for (const A of x) {
      const q = A.meta.category ?? "other";
      C.has(q) || C.set(q, []), C.get(q).push(A);
    }
    return Array.from(C.entries()).map(([A, q]) => ({
      category: A,
      label: p[A] ?? A,
      items: q
    }));
  }
  async function h() {
    try {
      const x = await fetch("/api/nodes");
      if (!x.ok) return;
      const C = await x.json(), A = C.map((q) => q.type).sort().join(",");
      A !== v && (v = A, us.set(C));
    } catch {
      s().length === 0 && us.set([
        {
          type: "core:start",
          meta: {
            name: "Start",
            description: "Entry point",
            category: "control-flow"
          }
        },
        {
          type: "core:end",
          meta: {
            name: "End",
            description: "Output result",
            category: "control-flow"
          }
        },
        {
          type: "core:stop",
          meta: {
            name: "Stop",
            description: "Terminate run",
            category: "control-flow"
          }
        },
        {
          type: "core:condition",
          meta: {
            name: "Condition",
            description: "Branch on boolean",
            category: "control-flow"
          }
        },
        {
          type: "core:router",
          meta: {
            name: "Router",
            description: "Route by value",
            category: "control-flow"
          }
        }
      ]);
    }
  }
  ks(async () => {
    await h(), i = setInterval(h, l);
    try {
      const x = await fetch("/api/system/config");
      if (x.ok) {
        const C = await x.json();
        _(c, C.marketplaceEnabled === !0);
      }
    } catch {
    }
  }), Wi(() => {
    i && clearInterval(i);
  });
  function $(x, C) {
    const A = `${x.replace(/:/g, "_")}_${Date.now()}`;
    it.update((q) => ({
      ...q,
      nodes: {
        ...q.nodes,
        [A]: {
          id: A,
          type: x,
          label: C,
          config: {},
          position: { x: 200, y: 200 }
        }
      }
    }));
  }
  Ve(() => s(), () => {
    _(o, b(s()));
  }), Zt(), st();
  var k = El(), I = f(d(k), 2);
  Re(I, 1, () => n(o), Pe, (x, C) => {
    var A = kl(), q = Oe(A), R = d(q), H = f(q, 2);
    Re(H, 1, () => (n(C), u(() => n(C).items)), Pe, (ue, B) => {
      var F = wl(), E = d(F), y = d(E), m = f(E, 2), N = d(m);
      D(() => {
        M(y, (n(B), u(() => n(B).meta.name))), M(N, (n(B), u(() => n(B).type)));
      }), G("click", F, () => $(n(B).type, n(B).meta.name)), w(ue, F);
    });
    var ne = f(H, 2);
    {
      var ee = (ue) => {
        var B = xl();
        D(() => qe(B, "href", `/admin/marketplace?category=${n(C), u(() => n(C).category) ?? ""}`)), w(ue, B);
      };
      V(ne, (ue) => {
        n(c) && ue(ee);
      });
    }
    D(() => M(R, (n(C), u(() => n(C).label)))), w(x, A);
  }), w(e, k), tt(), a();
}
var $l = /* @__PURE__ */ S('<div class="expr-editor svelte-c939oi"><textarea class="expr-textarea svelte-c939oi" rows="3" spellcheck="false" autocomplete="off" autocorrect="off"></textarea> <div class="expr-actions svelte-c939oi"><span class="expr-hint svelte-c939oi">JSONata</span> <button class="eval-btn svelte-c939oi" title="Evaluate against last run context">▶ Evaluate</button></div></div>');
function Tl(e, t) {
  et(t, !1);
  let s = Ye(t, "value", 12, ""), r = Ye(t, "placeholder", 8, "JSONata expression...");
  Ye(t, "fieldName", 8, "");
  const a = ro();
  function o(b) {
    s(b.target.value), a("change", s());
  }
  function l() {
    a("evaluate", s());
  }
  st();
  var i = $l(), v = d(i), c = f(v, 2), p = f(d(c), 2);
  D(() => {
    qe(v, "placeholder", r()), Mn(v, s());
  }), G("input", v, o), G("click", p, l), w(e, i), tt();
}
var jl = /* @__PURE__ */ S('<input type="text" placeholder="connection ID" class="svelte-awrrrl"/>'), Nl = /* @__PURE__ */ S("<option> </option>"), Cl = /* @__PURE__ */ S('<div class="hint svelte-awrrrl"> </div>'), Il = /* @__PURE__ */ S('<select class="svelte-awrrrl"><option>— select a connection —</option><!></select> <!>', 1);
function Ol(e, t) {
  et(t, !1);
  let s = Ye(t, "value", 8, ""), r = Ye(t, "service", 8, void 0), a = Ye(t, "onChange", 8), o = /* @__PURE__ */ L([]), l = /* @__PURE__ */ L(!1);
  ks(async () => {
    try {
      const b = await fetch("/api/integrations/connections");
      if (!b.ok) throw new Error(String(b.status));
      const h = await b.json();
      _(o, r() ? h.filter(($) => $.service === r()) : h);
    } catch {
      _(l, !0);
    }
  }), st();
  var i = Wt(), v = Oe(i);
  {
    var c = (b) => {
      var h = jl();
      D(() => Mn(h, s())), G("input", h, ($) => a()($.target.value)), w(b, h);
    }, p = (b) => {
      var h = Il(), $ = Oe(h), k = d($);
      k.value = k.__value = "";
      var I = f(k);
      Re(I, 1, () => n(o), Pe, (q, R) => {
        var H = Nl(), ne = d(H), ee = {};
        D(() => {
          M(ne, `${n(R), u(() => n(R).displayName) ?? ""} (${n(R), u(() => n(R).service) ?? ""}${n(R), u(() => n(R).status !== "active" ? ` — ${n(R).status}` : "") ?? ""})`), ee !== (ee = (n(R), u(() => n(R).id))) && (H.value = (H.__value = (n(R), u(() => n(R).id))) ?? "");
        }), w(q, H);
      });
      var x;
      oo($);
      var C = f($, 2);
      {
        var A = (q) => {
          var R = Cl(), H = d(R);
          D(() => M(H, `No ${r() ?? "integration" ?? ""} connections. Create one in Admin → Integration Connections.`)), w(q, R);
        };
        V(C, (q) => {
          n(o), u(() => n(o).length === 0) && q(A);
        });
      }
      D(() => {
        x !== (x = s()) && ($.value = ($.__value = s()) ?? "", zr($, s()));
      }), G("change", $, (q) => a()(q.target.value)), w(b, h);
    };
    V(v, (b) => {
      n(l) ? b(c) : b(p, -1);
    });
  }
  w(e, i), tt();
}
var Al = /* @__PURE__ */ S('<textarea rows="4" class="svelte-b5q3h1"></textarea>'), Pl = /* @__PURE__ */ S('<input type="text" placeholder="comma-separated values" class="svelte-b5q3h1"/>'), Rl = /* @__PURE__ */ S('<input type="checkbox" style="width:auto" class="svelte-b5q3h1"/>'), ql = /* @__PURE__ */ S('<div class="eval-result svelte-b5q3h1"> </div>'), Ml = /* @__PURE__ */ S('<!> <!> <button class="mode-toggle-btn svelte-b5q3h1">← Value Picker mode</button>', 1), Dl = /* @__PURE__ */ S('<button class="picker-btn svelte-b5q3h1" title="Reference upstream node output">↗</button>'), Ll = /* @__PURE__ */ S('<button class="picker-option svelte-b5q3h1"><span class="picker-node svelte-b5q3h1"> </span> <span class="picker-ref svelte-b5q3h1"> </span></button>'), Fl = /* @__PURE__ */ S('<div class="picker-dropdown svelte-b5q3h1"><div class="picker-label svelte-b5q3h1">Insert reference to:</div> <!></div>'), Jl = /* @__PURE__ */ S('<div class="field-with-picker svelte-b5q3h1"><input type="text" class="svelte-b5q3h1"/> <!> <button class="expr-toggle-btn svelte-b5q3h1" title="Switch to JSONata expression editor">ƒ</button></div> <!>', 1), zl = /* @__PURE__ */ S('<div class="form-group svelte-b5q3h1"><label class="svelte-b5q3h1"> </label> <!></div>'), Ul = /* @__PURE__ */ S('<div class="panel-section svelte-b5q3h1"><div class="panel-header svelte-b5q3h1"><span> </span> <button class="close-btn svelte-b5q3h1">✕</button></div> <div class="form-group svelte-b5q3h1"><label class="svelte-b5q3h1">Label</label> <input type="text" class="svelte-b5q3h1"/></div> <!> <button class="btn-danger svelte-b5q3h1">Remove node</button></div>');
function Hl(e, t) {
  et(t, !1);
  const s = () => nt(us, "$nodeTypes", a), r = () => nt(it, "$graph", a), [a, o] = Xt(), l = /* @__PURE__ */ L(), i = /* @__PURE__ */ L(), v = /* @__PURE__ */ L();
  let c = Ye(t, "node", 8), p = /* @__PURE__ */ L(null), b = /* @__PURE__ */ L(
    null
    // field currently in expression editor mode
  ), h = /* @__PURE__ */ L(
    {}
    // fieldKey → eval result
  );
  function $(m) {
    var T, W;
    const N = s().find((de) => de.type === m.type), J = (W = (T = N == null ? void 0 : N.schema) == null ? void 0 : T.output) == null ? void 0 : W.properties;
    return J && Object.keys(J).length > 0 ? Object.keys(J) : ["output"];
  }
  async function k(m, N) {
    try {
      const T = await (await fetch("/studio/evaluate-expression", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression: N })
      })).json();
      _(h, {
        ...n(h),
        [m]: T.error ? `Error: ${T.error}` : JSON.stringify(T.result)
      });
    } catch {
      _(h, { ...n(h), [m]: "Request failed" });
    }
  }
  function I(m, N) {
    it.update((J) => ({
      ...J,
      nodes: {
        ...J.nodes,
        [c().id]: { ...c(), config: { ...c().config, [m]: N } }
      }
    }));
  }
  function x(m) {
    it.update((N) => ({
      ...N,
      nodes: { ...N.nodes, [c().id]: { ...c(), label: m } }
    }));
  }
  function C() {
    it.update((m) => {
      const N = { ...m.nodes };
      return delete N[c().id], {
        ...m,
        nodes: N,
        edges: m.edges.filter((J) => J.from !== c().id && J.to !== c().id)
      };
    }), un.set(null);
  }
  function A(m) {
    return c().config[m] ?? void 0;
  }
  function q(m, N, J) {
    I(m, `$.${J}`), _(p, null);
  }
  Ve(() => (s(), je(c())), () => {
    _(l, s().find((m) => m.type === c().type));
  }), Ve(() => n(l), () => {
    var m, N, J;
    _(i, ((J = (N = (m = n(l)) == null ? void 0 : m.schema) == null ? void 0 : N.config) == null ? void 0 : J.properties) ?? {});
  }), Ve(() => (r(), je(c())), () => {
    _(v, Object.values(r().nodes).filter((m) => r().edges.some((N) => N.to === c().id && N.from === m.id)));
  }), Ve(() => je(c()), () => {
    var m;
    (m = c()) != null && m.id && (_(b, null), _(h, {}), _(p, null));
  }), Zt(), st();
  var R = Ul(), H = d(R), ne = d(H), ee = d(ne), ue = f(ne, 2), B = f(H, 2), F = f(d(B), 2), E = f(B, 2);
  Re(
    E,
    1,
    () => (n(i), u(() => Object.entries(n(i)))),
    Pe,
    (m, N) => {
      var J = /* @__PURE__ */ Wn(() => Do(n(N), 2));
      let T = () => n(J)[0], W = () => n(J)[1];
      var de = zl(), Y = d(de), z = d(Y), O = f(Y, 2);
      {
        var X = (re) => {
          {
            let te = /* @__PURE__ */ Xe(() => (T(), u(() => String(A(T()) ?? ""))));
            Ol(re, {
              get value() {
                return n(te);
              },
              get service() {
                return W(), u(() => W().service);
              },
              onChange: (fe) => I(T(), fe)
            });
          }
        }, ve = (re) => {
          var te = Al();
          D((fe) => Mn(te, fe), [
            () => (T(), u(() => JSON.stringify(A(T()) ?? {}, null, 2)))
          ]), G("blur", te, (fe) => {
            try {
              I(T(), JSON.parse(fe.target.value));
            } catch {
            }
          }), w(re, te);
        }, ae = (re) => {
          var te = Pl();
          D((fe) => Mn(te, fe), [
            () => (T(), u(() => Array.isArray(A(T())) ? A(T()).join(", ") : String(A(T()) ?? "")))
          ]), G("input", te, (fe) => I(T(), fe.target.value.split(",").map((ke) => ke.trim()).filter(Boolean))), w(re, te);
        }, he = (re) => {
          var te = Rl();
          D((fe) => ll(te, fe), [() => (T(), u(() => !!A(T())))]), G("change", te, (fe) => I(T(), fe.target.checked)), w(re, te);
        }, le = (re) => {
          var te = Wt(), fe = Oe(te);
          {
            var ke = (j) => {
              var K = Ml(), se = Oe(K);
              {
                let ye = /* @__PURE__ */ Xe(() => (T(), u(() => String(A(T()) ?? ""))));
                Tl(se, {
                  get value() {
                    return n(ye);
                  },
                  get fieldName() {
                    return T();
                  },
                  $$events: {
                    change: (ge) => I(T(), ge.detail),
                    evaluate: (ge) => k(T(), ge.detail)
                  }
                });
              }
              var me = f(se, 2);
              {
                var Fe = (ye) => {
                  var ge = ql(), Z = d(ge);
                  D((oe) => M(Z, oe), [
                    () => (n(h), T(), u(() => String(n(h)[T()])))
                  ]), w(ye, ge);
                };
                V(me, (ye) => {
                  n(h), T(), u(() => n(h)[T()]) && ye(Fe);
                });
              }
              var Me = f(me, 2);
              G("click", Me, () => {
                _(b, null), _(h, { ...n(h), [T()]: void 0 });
              }), w(j, K);
            }, P = (j) => {
              var K = Jl(), se = Oe(K), me = d(se), Fe = f(me, 2);
              {
                var Me = (oe) => {
                  var pe = Dl();
                  G("click", pe, () => {
                    _(p, n(p) === T() ? null : T());
                  }), w(oe, pe);
                };
                V(Fe, (oe) => {
                  n(v), u(() => n(v).length > 0) && oe(Me);
                });
              }
              var ye = f(Fe, 2), ge = f(se, 2);
              {
                var Z = (oe) => {
                  var pe = Fl(), Ce = f(d(pe), 2);
                  Re(Ce, 1, () => n(v), Pe, (Ge, Ke) => {
                    var Ue = Wt(), U = Oe(Ue);
                    Re(
                      U,
                      1,
                      () => (n(Ke), u(() => $(n(Ke)))),
                      Pe,
                      (Q, ce) => {
                        var Te = Ll(), Je = d(Te), Ee = d(Je), Ne = f(Je, 2), De = d(Ne);
                        D(() => {
                          M(Ee, (n(Ke), u(() => n(Ke).label ?? n(Ke).id))), M(De, `$.${n(ce) ?? ""}`);
                        }), G("click", Te, () => q(T(), n(Ke).id, n(ce))), w(Q, Te);
                      }
                    ), w(Ge, Ue);
                  }), w(oe, pe);
                };
                V(ge, (oe) => {
                  n(p), T(), n(v), u(() => n(p) === T() && n(v).length > 0) && oe(Z);
                });
              }
              D((oe) => Mn(me, oe), [
                () => (T(), u(() => String(A(T()) ?? "")))
              ]), G("input", me, (oe) => I(T(), oe.target.value)), G("click", ye, () => {
                _(b, T()), _(p, null);
              }), w(j, K);
            };
            V(fe, (j) => {
              n(b) === T() ? j(ke) : j(P, -1);
            });
          }
          w(re, te);
        };
        V(O, (re) => {
          W(), u(() => W().format === "connection") ? re(X) : (W(), u(() => W().type === "object") ? re(ve, 1) : (W(), u(() => W().type === "array") ? re(ae, 2) : (W(), u(() => W().type === "boolean") ? re(he, 3) : re(le, -1))));
        });
      }
      D(() => M(z, (W(), T(), u(() => W().description ?? T())))), w(m, de);
    }
  );
  var y = f(E, 2);
  D(() => {
    M(ee, `Node: ${je(c()), u(() => c().type) ?? ""}`), Mn(F, (je(c()), u(() => c().label ?? "")));
  }), G("click", ue, () => un.set(null)), G("input", F, (m) => x(m.target.value)), G("click", y, C), w(e, R), tt(), o();
}
var Vl = /* @__PURE__ */ S('<div class="agent-name svelte-5tjmbm"> </div> <div> </div>', 1), Bl = /* @__PURE__ */ S('<div class="status-msg svelte-5tjmbm"> </div>'), Yl = /* @__PURE__ */ S('<div class="status-msg svelte-5tjmbm"> </div>'), Gl = /* @__PURE__ */ S('<div class="status-msg svelte-5tjmbm"> </div>'), Kl = /* @__PURE__ */ S('<button class="btn-revert svelte-5tjmbm"> </button> <!>', 1), Wl = /* @__PURE__ */ S('<span class="trigger-filter svelte-5tjmbm"> </span>'), Xl = /* @__PURE__ */ S('<div class="trigger-row svelte-5tjmbm"><div class="trigger-info svelte-5tjmbm"><span class="trigger-service svelte-5tjmbm"> </span> <!> <code class="trigger-url svelte-5tjmbm"> </code></div> <button class="trigger-remove svelte-5tjmbm" title="Remove trigger">✕</button></div>'), Zl = /* @__PURE__ */ S('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Registered Triggers</label> <!></div>'), Ql = /* @__PURE__ */ S("<option> </option>"), ev = /* @__PURE__ */ S('<div class="status-msg svelte-5tjmbm"> </div>'), tv = /* @__PURE__ */ S(`<!> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Service</label> <select class="svelte-5tjmbm"><option>— select a service —</option><!></select></div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Event Filter (optional)</label> <input type="text" placeholder="e.g. app_mention — blank for all events" class="svelte-5tjmbm"/></div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Signing Secret</label> <input type="password" placeholder="the service's webhook signing secret" class="svelte-5tjmbm"/> <div class="field-hint svelte-5tjmbm">Used to verify inbound event signatures. Never displayed after registration.</div></div> <button class="btn-save svelte-5tjmbm"> </button> <!>`, 1), nv = /* @__PURE__ */ S('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Cron Expression</label> <input type="text" placeholder="0 * * * * (every hour)" class="svelte-5tjmbm"/> <div class="field-hint svelte-5tjmbm">Standard cron format: minute hour day month weekday</div></div>'), sv = /* @__PURE__ */ S('<div class="webhook-url svelte-5tjmbm"><code class="svelte-5tjmbm"> </code> <div class="field-hint svelte-5tjmbm">POST your payload to this URL. No auth headers required.</div></div>'), rv = /* @__PURE__ */ S('<div class="field-hint svelte-5tjmbm">Publish the agent to generate the webhook URL.</div>'), av = /* @__PURE__ */ S('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Webhook URL</label> <!></div>'), ov = /* @__PURE__ */ S('<div class="status-msg svelte-5tjmbm"> </div>'), iv = /* @__PURE__ */ S('<div class="panel-section svelte-5tjmbm"><div class="panel-header svelte-5tjmbm">Agent</div> <!> <div class="btn-row svelte-5tjmbm"><button class="btn-draft svelte-5tjmbm"> </button> <button class="btn-publish svelte-5tjmbm"> </button></div> <!> <!> <!></div> <div class="panel-section svelte-5tjmbm"><div class="panel-header svelte-5tjmbm">Trigger Config</div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Trigger Type</label> <select class="svelte-5tjmbm"><option>REST API</option><option>Scheduled (Cron)</option><option>Webhook</option><option>Integration Event</option></select></div> <!> <!> <!> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Description</label> <input type="text" placeholder="What does this agent do?" class="svelte-5tjmbm"/></div> <button class="btn-save svelte-5tjmbm"> </button> <!></div>', 1);
function lv(e, t) {
  et(t, !1);
  const s = () => nt(it, "$graph", o), r = () => nt(Pn, "$agentConfig", o), a = () => nt(qs, "$agent", o), [o, l] = Xt();
  let i = Ye(t, "agentId", 8), v = /* @__PURE__ */ L(!1), c = /* @__PURE__ */ L(""), p = /* @__PURE__ */ L(!1), b = /* @__PURE__ */ L(""), h = /* @__PURE__ */ L(!1), $ = /* @__PURE__ */ L(""), k = /* @__PURE__ */ L(!1), I = /* @__PURE__ */ L(""), x = /* @__PURE__ */ L([]), C = /* @__PURE__ */ L([]), A = /* @__PURE__ */ L(""), q = /* @__PURE__ */ L(""), R = /* @__PURE__ */ L(""), H = /* @__PURE__ */ L(""), ne = /* @__PURE__ */ L(!1);
  ks(async () => {
    try {
      const [U, Q] = await Promise.all([
        fetch("/api/integrations"),
        fetch("/api/integrations/triggers")
      ]);
      if (U.ok) {
        const ce = await U.json();
        _(x, ce.filter((Te) => Te.hasTrigger));
      }
      if (Q.ok) {
        const ce = await Q.json();
        _(C, ce.filter((Te) => Te.agentId === i()));
      }
    } catch {
    }
  });
  async function ee() {
    _(ne, !0), _(H, "");
    try {
      const U = await fetch("/api/integrations/triggers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: n(A),
          agentId: i(),
          eventFilter: n(q) || void 0,
          secret: n(R)
        })
      });
      if (!U.ok) throw new Error("Registration failed");
      const Q = await U.json();
      _(C, [...n(C), Q]), _(R, ""), _(q, ""), _(H, "✓ Trigger registered");
    } catch (U) {
      _(H, "✗ " + (U instanceof Error ? U.message : "Error"));
    } finally {
      _(ne, !1);
    }
  }
  async function ue(U) {
    try {
      const Q = await fetch(`/api/integrations/triggers/${U}`, { method: "DELETE" });
      (Q.ok || Q.status === 204) && _(C, n(C).filter((ce) => ce.id !== U));
    } catch {
    }
  }
  async function B() {
    _(v, !0), _(c, "");
    try {
      const U = JSON.stringify(s());
      if (!(await fetch(`/api/agents/${i()}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ graphJson: U })
      })).ok) throw new Error("Publish failed");
      _(c, "✓ Published");
      const ce = await fetch(`/api/agents/${i()}`);
      ce.ok && qs.set(await ce.json());
    } catch (U) {
      _(c, "✗ " + (U instanceof Error ? U.message : "Error"));
    } finally {
      _(v, !1);
    }
  }
  async function F() {
    _(h, !0), _($, "");
    try {
      if (!(await fetch(`/api/agents/${i()}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftGraphJson: JSON.stringify(s()) })
      })).ok) throw new Error("Save failed");
      _($, "✓ Draft saved");
    } catch (U) {
      _($, "✗ " + (U instanceof Error ? U.message : "Error"));
    } finally {
      _(h, !1);
    }
  }
  async function E() {
    _(k, !0), _(I, "");
    try {
      const U = await fetch(`/api/agents/${i()}/draft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (!U.ok) throw new Error("Revert failed");
      qs.set(await U.json()), _(I, "✓ Reverted to draft");
    } catch (U) {
      _(I, "✗ " + (U instanceof Error ? U.message : "Error"));
    } finally {
      _(k, !1);
    }
  }
  async function y() {
    _(p, !0), _(b, "");
    try {
      const U = { type: r().triggerType };
      if (r().triggerType === "cron" && (U.expression = r().cronExpression), !(await fetch(`/api/agents/${i()}/config`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ triggerConfig: U })
      })).ok) throw new Error("Save failed");
      if (_(b, "✓ Saved"), r().triggerType === "webhook") {
        const ce = await fetch(`/api/agents/${i()}/config`);
        if (ce.ok) {
          const Te = await ce.json();
          Pn.update((Je) => {
            var Ee;
            return { ...Je, webhookUrl: ((Ee = Te.triggerConfig) == null ? void 0 : Ee.webhookUrl) ?? "" };
          });
        }
      }
    } catch (U) {
      _(b, "✗ " + (U instanceof Error ? U.message : "Error"));
    } finally {
      _(p, !1);
    }
  }
  st();
  var m = iv(), N = Oe(m), J = f(d(N), 2);
  {
    var T = (U) => {
      var Q = Vl(), ce = Oe(Q), Te = d(ce), Je = f(ce, 2), Ee = d(Je);
      D(() => {
        M(Te, (a(), u(() => a().name))), Nt(Je, 1, `agent-status status-${a(), u(() => a().status) ?? ""}`, "svelte-5tjmbm"), M(Ee, (a(), u(() => a().status)));
      }), w(U, Q);
    };
    V(J, (U) => {
      a() && U(T);
    });
  }
  var W = f(J, 2), de = d(W), Y = d(de), z = f(de, 2), O = d(z), X = f(W, 2);
  {
    var ve = (U) => {
      var Q = Bl(), ce = d(Q);
      D(() => M(ce, n($))), w(U, Q);
    };
    V(X, (U) => {
      n($) && U(ve);
    });
  }
  var ae = f(X, 2);
  {
    var he = (U) => {
      var Q = Yl(), ce = d(Q);
      D(() => M(ce, n(c))), w(U, Q);
    };
    V(ae, (U) => {
      n(c) && U(he);
    });
  }
  var le = f(ae, 2);
  {
    var re = (U) => {
      var Q = Kl(), ce = Oe(Q), Te = d(ce), Je = f(ce, 2);
      {
        var Ee = (Ne) => {
          var De = Gl(), Ie = d(De);
          D(() => M(Ie, n(I))), w(Ne, De);
        };
        V(Je, (Ne) => {
          n(I) && Ne(Ee);
        });
      }
      D(() => {
        ce.disabled = n(k), M(Te, n(k) ? "Reverting…" : "Revert to Draft");
      }), G("click", ce, E), w(U, Q);
    };
    V(le, (U) => {
      a(), u(() => {
        var Q;
        return ((Q = a()) == null ? void 0 : Q.status) === "active";
      }) && U(re);
    });
  }
  var te = f(N, 2), fe = f(d(te), 2), ke = f(d(fe), 2), P = d(ke);
  P.value = P.__value = "rest";
  var j = f(P);
  j.value = j.__value = "cron";
  var K = f(j);
  K.value = K.__value = "webhook";
  var se = f(K);
  se.value = se.__value = "integration";
  var me = f(fe, 2);
  {
    var Fe = (U) => {
      var Q = tv(), ce = Oe(Q);
      {
        var Te = (at) => {
          var bt = Zl(), Qt = f(d(bt), 2);
          Re(Qt, 1, () => n(C), Pe, (Ws, mt) => {
            var Vr = Xl(), Br = d(Vr), Yr = d(Br), po = d(Yr), Gr = f(Yr, 2);
            {
              var ho = (Xs) => {
                var Kr = Wl(), mo = d(Kr);
                D(() => M(mo, (n(mt), u(() => n(mt).eventFilter)))), w(Xs, Kr);
              };
              V(Gr, (Xs) => {
                n(mt), u(() => n(mt).eventFilter) && Xs(ho);
              });
            }
            var _o = f(Gr, 2), go = d(_o), bo = f(Br, 2);
            D(() => {
              M(po, (n(mt), u(() => n(mt).service))), M(go, (n(mt), u(() => n(mt).url)));
            }), G("click", bo, () => ue(n(mt).id)), w(Ws, Vr);
          }), w(at, bt);
        };
        V(ce, (at) => {
          n(C), u(() => n(C).length > 0) && at(Te);
        });
      }
      var Je = f(ce, 2), Ee = f(d(Je), 2), Ne = d(Ee);
      Ne.value = Ne.__value = "";
      var De = f(Ne);
      Re(De, 1, () => n(x), Pe, (at, bt) => {
        var Qt = Ql(), Ws = d(Qt), mt = {};
        D(() => {
          M(Ws, (n(bt), u(() => n(bt).displayName))), mt !== (mt = (n(bt), u(() => n(bt).service))) && (Qt.value = (Qt.__value = (n(bt), u(() => n(bt).service))) ?? "");
        }), w(at, Qt);
      });
      var Ie = f(Je, 2), rt = f(d(Ie), 2), Hr = f(Ie, 2), vo = f(d(Hr), 2), Es = f(Hr, 2), co = d(Es), uo = f(Es, 2);
      {
        var fo = (at) => {
          var bt = ev(), Qt = d(bt);
          D(() => M(Qt, n(H))), w(at, bt);
        };
        V(uo, (at) => {
          n(H) && at(fo);
        });
      }
      D(() => {
        Es.disabled = n(ne) || !n(A) || !n(R), M(co, n(ne) ? "Registering…" : "Register Trigger");
      }), $r(Ee, () => n(A), (at) => _(A, at)), dt(rt, () => n(q), (at) => _(q, at)), dt(vo, () => n(R), (at) => _(R, at)), G("click", Es, ee), w(U, Q);
    };
    V(me, (U) => {
      r(), u(() => r().triggerType === "integration") && U(Fe);
    });
  }
  var Me = f(me, 2);
  {
    var ye = (U) => {
      var Q = nv(), ce = f(d(Q), 2);
      dt(ce, () => r().cronExpression, (Te) => Qs(Pn, u(r).cronExpression = Te, u(r))), w(U, Q);
    };
    V(Me, (U) => {
      r(), u(() => r().triggerType === "cron") && U(ye);
    });
  }
  var ge = f(Me, 2);
  {
    var Z = (U) => {
      var Q = av(), ce = f(d(Q), 2);
      {
        var Te = (Ee) => {
          var Ne = sv(), De = d(Ne), Ie = d(De);
          D(() => M(Ie, (r(), u(() => r().webhookUrl)))), w(Ee, Ne);
        }, Je = (Ee) => {
          var Ne = rv();
          w(Ee, Ne);
        };
        V(ce, (Ee) => {
          r(), u(() => r().webhookUrl) ? Ee(Te) : Ee(Je, -1);
        });
      }
      w(U, Q);
    };
    V(ge, (U) => {
      r(), u(() => r().triggerType === "webhook") && U(Z);
    });
  }
  var oe = f(ge, 2), pe = f(d(oe), 2), Ce = f(oe, 2), Ge = d(Ce), Ke = f(Ce, 2);
  {
    var Ue = (U) => {
      var Q = ov(), ce = d(Q);
      D(() => M(ce, n(b))), w(U, Q);
    };
    V(Ke, (U) => {
      n(b) && U(Ue);
    });
  }
  D(() => {
    de.disabled = n(h), M(Y, n(h) ? "Saving…" : "Save Draft"), z.disabled = n(v), M(O, n(v) ? "Publishing…" : "Publish"), Ce.disabled = n(p), M(Ge, n(p) ? "Saving…" : "Save");
  }), G("click", de, F), G("click", z, B), $r(ke, () => r().triggerType, (U) => Qs(Pn, u(r).triggerType = U, u(r))), dt(pe, () => r().description, (U) => Qs(Pn, u(r).description = U, u(r))), G("click", Ce, y), w(e, m), tt(), l();
}
const yt = ts({
  runId: null,
  status: "idle",
  output: null,
  error: null,
  steps: []
});
var vv = /* @__PURE__ */ S('<button class="btn-stop svelte-gqobos">■ Stop</button>'), cv = /* @__PURE__ */ S('<pre class="result-json svelte-gqobos"> </pre>'), uv = /* @__PURE__ */ S('<div class="result-error svelte-gqobos"> </div>'), dv = /* @__PURE__ */ S('<button class="traj-toggle svelte-gqobos"> </button>'), fv = /* @__PURE__ */ S('<div class="traj-thought svelte-gqobos"><span class="traj-label svelte-gqobos">Thought</span> </div>'), pv = /* @__PURE__ */ S('<div class="traj-action svelte-gqobos"><span class="traj-label svelte-gqobos">Action</span> </div>'), hv = /* @__PURE__ */ S('<div class="traj-obs svelte-gqobos"><span class="traj-label svelte-gqobos">Obs</span> </div>'), _v = /* @__PURE__ */ S('<div class="traj-step svelte-gqobos"><span class="traj-iter svelte-gqobos"> </span> <!> <!> <!></div>'), gv = /* @__PURE__ */ S('<div class="trajectory-block svelte-gqobos"></div>'), bv = /* @__PURE__ */ S('<div><span class="step-type svelte-gqobos"> </span> <span> </span> <!></div> <!>', 1), mv = /* @__PURE__ */ S('<div class="steps-header svelte-gqobos"> </div> <!>', 1), yv = /* @__PURE__ */ S('<div><div class="result-status svelte-gqobos"> </div> <!> <!></div> <!>', 1), wv = /* @__PURE__ */ S('<div class="panel-section svelte-gqobos"><div class="panel-header svelte-gqobos">Test Run</div> <div class="form-group svelte-gqobos"><label class="svelte-gqobos">Input (JSON)</label> <textarea rows="4" class="svelte-gqobos"></textarea></div> <div class="run-controls svelte-gqobos"><button class="btn-run svelte-gqobos"> </button> <!></div> <!></div>');
function xv(e, t) {
  et(t, !1);
  const s = () => nt(yt, "$runState", r), [r, a] = Xt();
  let o = Ye(t, "agentId", 8), l = /* @__PURE__ */ L("{}"), i = /* @__PURE__ */ L(!1), v = null;
  const c = /* @__PURE__ */ new Set(["core:react", "core:planner"]);
  let p = /* @__PURE__ */ L([]), b = /* @__PURE__ */ L(
    null
    // nodeId
  );
  async function h(B) {
    try {
      const F = await fetch(`/api/telemetry/trajectory/${B}`);
      if (!F.ok) return;
      const E = await F.json();
      _(p, E.trajectories ?? []);
    } catch {
    }
  }
  function $() {
    v && (v.close(), v = null), _(i, !1);
  }
  async function k() {
    var E;
    $(), _(i, !0), yt.set({
      runId: null,
      status: "running",
      output: null,
      error: null,
      steps: []
    });
    let B;
    try {
      B = JSON.parse(n(l));
    } catch {
      yt.set({
        runId: null,
        status: "failed",
        output: null,
        error: "Invalid JSON input",
        steps: []
      }), _(i, !1);
      return;
    }
    let F;
    try {
      const y = await fetch(`/api/agents/${o()}/runs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: B, mode: "async" })
      });
      if (!y.ok) {
        const N = await y.json();
        throw new Error(((E = N == null ? void 0 : N.error) == null ? void 0 : E.message) ?? `HTTP ${y.status}`);
      }
      F = (await y.json()).runId;
    } catch (y) {
      yt.set({
        runId: null,
        status: "failed",
        output: null,
        error: String(y),
        steps: []
      }), _(i, !1);
      return;
    }
    yt.update((y) => ({ ...y, runId: F })), v = new EventSource(`/api/agents/${o()}/runs/${F}/stream`), v.addEventListener("node.started", (y) => {
      const m = JSON.parse(y.data);
      yt.update((N) => ({
        ...N,
        steps: [
          ...N.steps.filter((J) => J.nodeId !== m.nodeId),
          {
            id: m.nodeId,
            nodeId: m.nodeId,
            nodeType: m.nodeType,
            stepId: m.stepId,
            status: "running",
            startedAt: (/* @__PURE__ */ new Date()).toISOString(),
            completedAt: void 0,
            input: null,
            output: null,
            error: null
          }
        ]
      }));
    }), v.addEventListener("node.completed", (y) => {
      const m = JSON.parse(y.data);
      yt.update((N) => ({
        ...N,
        steps: N.steps.map((J) => J.nodeId === m.nodeId ? {
          ...J,
          status: "complete",
          completedAt: (/* @__PURE__ */ new Date()).toISOString(),
          output: m.outputs
        } : J)
      }));
    }), v.addEventListener("node.failed", (y) => {
      const m = JSON.parse(y.data);
      yt.update((N) => ({
        ...N,
        steps: N.steps.map((J) => J.nodeId === m.nodeId ? {
          ...J,
          status: "failed",
          completedAt: (/* @__PURE__ */ new Date()).toISOString(),
          error: m.error
        } : J)
      }));
    }), v.addEventListener("run.completed", (y) => {
      const m = JSON.parse(y.data);
      yt.update((N) => ({ ...N, status: "completed", output: m.output })), $(), h(F);
    }), v.addEventListener("run.failed", (y) => {
      const m = JSON.parse(y.data);
      yt.update((N) => ({ ...N, status: "failed", error: m.error.message })), $();
    }), v.addEventListener("run.suspended", () => {
      yt.update((y) => ({
        ...y,
        status: "failed",
        error: "Run suspended — awaiting human review"
      })), $();
    }), v.onerror = () => {
      n(i) && (yt.update((y) => ({
        ...y,
        status: y.status === "running" ? "failed" : y.status,
        error: y.error ?? "Stream connection lost"
      })), $());
    };
  }
  st();
  var I = wv(), x = f(d(I), 2), C = f(d(x), 2), A = f(x, 2), q = d(A), R = d(q), H = f(q, 2);
  {
    var ne = (B) => {
      var F = vv();
      G("click", F, $), w(B, F);
    };
    V(H, (B) => {
      n(i) && B(ne);
    });
  }
  var ee = f(A, 2);
  {
    var ue = (B) => {
      var F = yv(), E = Oe(F), y = d(E), m = d(y), N = f(y, 2);
      {
        var J = (z) => {
          var O = cv(), X = d(O);
          D((ve) => M(X, ve), [
            () => (s(), u(() => JSON.stringify(s().output, null, 2)))
          ]), w(z, O);
        };
        V(N, (z) => {
          s(), u(() => s().output) && z(J);
        });
      }
      var T = f(N, 2);
      {
        var W = (z) => {
          var O = uv(), X = d(O);
          D(() => M(X, (s(), u(() => s().error)))), w(z, O);
        };
        V(T, (z) => {
          s(), u(() => s().error) && z(W);
        });
      }
      var de = f(E, 2);
      {
        var Y = (z) => {
          var O = mv(), X = Oe(O), ve = d(X), ae = f(X, 2);
          Re(ae, 1, () => (s(), u(() => s().steps)), Pe, (he, le) => {
            var re = bv(), te = Oe(re), fe = d(te), ke = d(fe), P = f(fe, 2), j = d(P), K = f(P, 2);
            {
              var se = (ye) => {
                const ge = /* @__PURE__ */ Xe(() => (n(p), n(le), u(() => n(p).filter((Ce) => Ce.stepId === n(le).stepId))));
                var Z = Wt(), oe = Oe(Z);
                {
                  var pe = (Ce) => {
                    var Ge = dv(), Ke = d(Ge);
                    D(() => M(Ke, `▶ Trajectory (${je(n(ge)), u(() => n(ge).length) ?? ""} steps)`)), G("click", Ge, () => _(b, n(b) === n(le).nodeId ? null : n(le).nodeId)), w(Ce, Ge);
                  };
                  V(oe, (Ce) => {
                    je(n(ge)), u(() => n(ge).length > 0) && Ce(pe);
                  });
                }
                w(ye, Z);
              }, me = /* @__PURE__ */ Wn(() => (n(le), s(), u(() => c.has(n(le).nodeType) && s().status !== "running")));
              V(K, (ye) => {
                n(me) && ye(se);
              });
            }
            var Fe = f(te, 2);
            {
              var Me = (ye) => {
                const ge = /* @__PURE__ */ Xe(() => (n(p), n(le), u(() => n(p).filter((oe) => oe.stepId === n(le).stepId))));
                var Z = gv();
                Re(Z, 5, () => n(ge), Pe, (oe, pe) => {
                  var Ce = _v(), Ge = d(Ce), Ke = d(Ge), Ue = f(Ge, 2);
                  {
                    var U = (Ee) => {
                      var Ne = fv(), De = f(d(Ne));
                      D(() => M(De, ` ${n(pe), u(() => n(pe).thought) ?? ""}`)), w(Ee, Ne);
                    };
                    V(Ue, (Ee) => {
                      n(pe), u(() => n(pe).thought) && Ee(U);
                    });
                  }
                  var Q = f(Ue, 2);
                  {
                    var ce = (Ee) => {
                      var Ne = pv(), De = f(d(Ne));
                      D(() => M(De, ` ${n(pe), u(() => n(pe).action) ?? ""}`)), w(Ee, Ne);
                    };
                    V(Q, (Ee) => {
                      n(pe), u(() => n(pe).action) && Ee(ce);
                    });
                  }
                  var Te = f(Q, 2);
                  {
                    var Je = (Ee) => {
                      var Ne = hv(), De = f(d(Ne));
                      D(() => M(De, ` ${n(pe), u(() => n(pe).observation) ?? ""}`)), w(Ee, Ne);
                    };
                    V(Te, (Ee) => {
                      n(pe), u(() => n(pe).observation) && Ee(Je);
                    });
                  }
                  D(() => M(Ke, `Iter ${n(pe), u(() => n(pe).iteration) ?? ""}`)), w(oe, Ce);
                }), w(ye, Z);
              };
              V(Fe, (ye) => {
                n(b), n(le), u(() => n(b) === n(le).nodeId) && ye(Me);
              });
            }
            D(() => {
              Nt(te, 1, `step step-${n(le), u(() => n(le).status) ?? ""}`, "svelte-gqobos"), M(ke, (n(le), u(() => n(le).nodeType))), Nt(P, 1, `step-badge badge-${n(le), u(() => n(le).status) ?? ""}`, "svelte-gqobos"), M(j, (n(le), u(() => n(le).status)));
            }), w(he, re);
          }), D(() => M(ve, `Steps (${s(), u(() => s().steps.length) ?? ""})`)), w(z, O);
        };
        V(de, (z) => {
          s(), u(() => s().steps.length > 0) && z(Y);
        });
      }
      D(
        (z) => {
          Nt(E, 1, `run-result status-${s(), u(() => s().status) ?? ""}`, "svelte-gqobos"), M(m, z);
        },
        [
          () => (s(), u(() => s().status.toUpperCase()))
        ]
      ), w(B, F);
    };
    V(ee, (B) => {
      s(), u(() => s().status !== "idle") && B(ue);
    });
  }
  D(() => {
    q.disabled = n(i), M(R, n(i) ? "Running…" : "▶ Run");
  }), dt(C, () => n(l), (B) => _(l, B)), G("click", q, k), w(e, I), tt(), a();
}
var kv = /* @__PURE__ */ S('<span class="badge badge-error svelte-do6mn6"> </span>'), Ev = /* @__PURE__ */ S('<span class="badge badge-warn svelte-do6mn6"> </span>'), Sv = /* @__PURE__ */ S('<div class="issue issue-error svelte-do6mn6" role="button" tabindex="0"><span class="issue-icon svelte-do6mn6">✗</span> <span class="issue-msg svelte-do6mn6"> </span></div>'), $v = /* @__PURE__ */ S('<div class="issue issue-warning svelte-do6mn6" role="button" tabindex="0"><span class="issue-icon svelte-do6mn6">⚠</span> <span class="issue-msg svelte-do6mn6"> </span></div>'), Tv = /* @__PURE__ */ S('<label class="ack-label svelte-do6mn6"><input type="checkbox" class="svelte-do6mn6"/> Acknowledge warnings and allow publish</label>'), jv = /* @__PURE__ */ S('<div class="lint-panel svelte-do6mn6"><div class="lint-header svelte-do6mn6"><span class="lint-title svelte-do6mn6">Graph Issues</span> <!> <!></div> <div class="issue-list svelte-do6mn6"><!> <!></div> <!></div>');
function Nv(e, t) {
  et(t, !1);
  const s = () => nt(it, "$graph", a), r = () => nt(us, "$nodeTypes", a), [a, o] = Xt(), l = /* @__PURE__ */ L(), i = /* @__PURE__ */ L(), v = /* @__PURE__ */ L(), c = /* @__PURE__ */ L();
  let p = /* @__PURE__ */ L(!1);
  function b(x, C) {
    const A = [], q = Object.values(x.nodes), R = x.edges, H = new Set(C.map((E) => E.type));
    if (q.length === 0)
      return A.push({
        severity: "error",
        message: "Graph is empty — add at least a Start and End node"
      }), A;
    for (const E of q)
      H.size > 0 && !H.has(E.type) && A.push({
        severity: "error",
        message: `Node "${E.label ?? E.id}" has unknown type "${E.type}"`,
        nodeId: E.id
      });
    const ne = x.entry ?? Object.keys(x.nodes)[0];
    x.nodes[ne] || A.push({ severity: "error", message: "No entry node defined" });
    const ee = /* @__PURE__ */ new Set(), ue = [ne];
    for (; ue.length > 0; ) {
      const E = ue.shift();
      if (!ee.has(E)) {
        ee.add(E);
        for (const y of R)
          y.from === E && !ee.has(y.to) && ue.push(y.to);
      }
    }
    for (const E of q)
      ee.has(E.id) || A.push({
        severity: "warning",
        message: `Node "${E.label ?? E.id}" is unreachable from the entry node`,
        nodeId: E.id
      });
    for (const E of q) {
      const y = R.filter((J) => J.from === E.id);
      if (y.length === 0) continue;
      const m = y.some((J) => J.type === "conditional"), N = y.some((J) => J.type === "fallback" || J.type === "unconditional");
      m && !N && A.push({
        severity: "warning",
        message: `Node "${E.label ?? E.id}" has conditional edges but no fallback — some inputs may go unhandled`,
        nodeId: E.id
      });
    }
    const B = /* @__PURE__ */ new Set(["core:end", "core:stop"]);
    for (const E of q) {
      if (B.has(E.type)) continue;
      R.filter((m) => m.from === E.id).length === 0 && A.push({
        severity: "warning",
        message: `Node "${E.label ?? E.id}" has no outbound edges and is not a terminal node`,
        nodeId: E.id
      });
    }
    const F = x.toolEdges ?? [];
    for (const E of q) {
      if (E.type === "core:tool") {
        const y = R.filter((N) => N.from === E.id);
        y.length !== 1 && A.push({
          severity: "error",
          message: `Tool node "${E.label ?? E.id}" must have exactly one outbound flow edge (has ${y.length})`,
          nodeId: E.id
        }), F.filter((N) => N.from === E.id).length === 0 && A.push({
          severity: "error",
          message: `Tool node "${E.label ?? E.id}" must be connected to an agent node via a tool edge`,
          nodeId: E.id
        });
      }
      (E.type === "core:tool-call" || E.type === "core:react") && F.filter((m) => m.to === E.id).length === 0 && A.push({
        severity: "warning",
        message: `Agent node "${E.label ?? E.id}" (${E.type}) has no tools connected — it will only be able to generate text without tool invocations`,
        nodeId: E.id
      });
    }
    return A;
  }
  function h(x) {
    if (!x) return;
    const C = s().nodes[x];
    C && un.set(C);
  }
  Ve(() => (s(), r()), () => {
    _(l, b(s(), r()));
  }), Ve(() => n(l), () => {
    _(i, n(l).filter((x) => x.severity === "error"));
  }), Ve(() => n(l), () => {
    _(v, n(l).filter((x) => x.severity === "warning"));
  }), Ve(() => (n(i), n(v), n(p)), () => {
    _(c, n(i).length === 0 && (n(v).length === 0 || n(p)));
  }), Zt(), st();
  var $ = Wt(), k = Oe($);
  {
    var I = (x) => {
      var C = jv(), A = d(C), q = f(d(A), 2);
      {
        var R = (y) => {
          var m = kv(), N = d(m);
          D(() => M(N, `${n(i), u(() => n(i).length) ?? ""} error${n(i), u(() => n(i).length !== 1 ? "s" : "") ?? ""}`)), w(y, m);
        };
        V(q, (y) => {
          n(i), u(() => n(i).length > 0) && y(R);
        });
      }
      var H = f(q, 2);
      {
        var ne = (y) => {
          var m = Ev(), N = d(m);
          D(() => M(N, `${n(v), u(() => n(v).length) ?? ""} warning${n(v), u(() => n(v).length !== 1 ? "s" : "") ?? ""}`)), w(y, m);
        };
        V(H, (y) => {
          n(v), u(() => n(v).length > 0) && y(ne);
        });
      }
      var ee = f(A, 2), ue = d(ee);
      Re(ue, 1, () => n(i), Pe, (y, m) => {
        var N = Sv(), J = f(d(N), 2), T = d(J);
        D(() => M(T, (n(m), u(() => n(m).message)))), G("click", N, () => h(n(m).nodeId)), G("keydown", N, (W) => W.key === "Enter" && h(n(m).nodeId)), w(y, N);
      });
      var B = f(ue, 2);
      Re(B, 1, () => n(v), Pe, (y, m) => {
        var N = $v(), J = f(d(N), 2), T = d(J);
        D(() => M(T, (n(m), u(() => n(m).message)))), G("click", N, () => h(n(m).nodeId)), G("keydown", N, (W) => W.key === "Enter" && h(n(m).nodeId)), w(y, N);
      });
      var F = f(ee, 2);
      {
        var E = (y) => {
          var m = Tv(), N = d(m);
          io(N, () => n(p), (J) => _(p, J)), w(y, m);
        };
        V(F, (y) => {
          n(i), n(v), u(() => n(i).length === 0 && n(v).length > 0) && y(E);
        });
      }
      w(x, C);
    };
    V(k, (x) => {
      n(l), u(() => n(l).length > 0) && x(I);
    });
  }
  w(e, $), tt(), o();
}
var Cv = /* @__PURE__ */ S('<p class="empty-state svelte-28mxb5">No tools connected.<br/>Connect <code class="svelte-28mxb5">core:tool</code> or <code class="svelte-28mxb5">core:mcp-client</code> nodes via tool edges.</p>'), Iv = /* @__PURE__ */ S('<span class="tool-desc svelte-28mxb5"> </span>'), Ov = /* @__PURE__ */ S('<li class="tool-item svelte-28mxb5"><span class="tool-name svelte-28mxb5"> </span> <span class="tool-source svelte-28mxb5"> </span> <!></li>'), Av = /* @__PURE__ */ S('<ul class="tool-list svelte-28mxb5"></ul>'), Pv = /* @__PURE__ */ S('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Name</span><code class="svelte-28mxb5"> </code></div>'), Rv = /* @__PURE__ */ S('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Description</span><span class="svelte-28mxb5"> </span></div>'), qv = /* @__PURE__ */ S('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Connected to</span> <span class="svelte-28mxb5"> </span></div>'), Mv = /* @__PURE__ */ S('<div class="tool-detail svelte-28mxb5"><!> <!> <!></div>'), Dv = /* @__PURE__ */ S('<p class="empty-state svelte-28mxb5">Select an agent node (<code class="svelte-28mxb5">core:tool-call</code>, <code class="svelte-28mxb5">core:react</code>) or a tool node to inspect its tools.</p>'), Lv = /* @__PURE__ */ S('<div class="tool-panel svelte-28mxb5"><div class="panel-header svelte-28mxb5">TOOLS</div> <!></div>');
function Fv(e, t) {
  et(t, !1);
  const s = () => nt(un, "$selectedNode", a), r = () => nt(it, "$graph", a), [a, o] = Xt(), l = /* @__PURE__ */ L(), i = /* @__PURE__ */ L(), v = /* @__PURE__ */ L(), c = /* @__PURE__ */ L(), p = /* @__PURE__ */ L(), b = /* @__PURE__ */ new Set(["core:tool", "core:mcp-client"]), h = /* @__PURE__ */ new Set(["core:tool-call", "core:react"]);
  Ve(() => s(), () => {
    var R;
    _(l, ((R = s()) == null ? void 0 : R.id) ?? null);
  }), Ve(() => s(), () => {
    var R;
    _(i, ((R = s()) == null ? void 0 : R.type) ?? null);
  }), Ve(() => (n(l), n(i), r()), () => {
    _(v, n(l) && h.has(n(i) ?? "") ? (r().toolEdges ?? []).filter((R) => R.to === n(l)).map((R) => ({ edge: R, node: r().nodes[R.from] })).filter((R) => R.node !== void 0) : []);
  }), Ve(() => (n(l), n(i), s()), () => {
    var R;
    _(c, n(l) && b.has(n(i) ?? "") ? (R = s()) == null ? void 0 : R.config : null);
  }), Ve(() => (n(l), n(i), r()), () => {
    _(p, n(l) && b.has(n(i) ?? "") ? (r().toolEdges ?? []).filter((R) => R.from === n(l)).map((R) => r().nodes[R.to]).filter(Boolean) : []);
  }), Zt(), st();
  var $ = Lv(), k = f(d($), 2);
  {
    var I = (R) => {
      var H = Wt(), ne = Oe(H);
      {
        var ee = (B) => {
          var F = Cv();
          w(B, F);
        }, ue = (B) => {
          var F = Av();
          Re(F, 5, () => n(v), Pe, (E, y) => {
            let m = () => n(y).node;
            var N = Ov(), J = d(N), T = d(J), W = f(J, 2), de = d(W), Y = f(W, 2);
            {
              var z = (O) => {
                var X = Iv(), ve = d(X);
                D((ae) => M(ve, ae), [
                  () => (m(), u(() => String(m().config.description)))
                ]), w(O, X);
              };
              V(Y, (O) => {
                m(), u(() => {
                  var X;
                  return (X = m().config) == null ? void 0 : X.description;
                }) && O(z);
              });
            }
            D(
              (O) => {
                M(T, O), M(de, (m(), u(() => m().type === "core:mcp-client" ? "MCP" : "Graph")));
              },
              [
                () => (m(), u(() => {
                  var O;
                  return String(((O = m().config) == null ? void 0 : O.name) ?? m().type);
                }))
              ]
            ), w(E, N);
          }), w(B, F);
        };
        V(ne, (B) => {
          n(v), u(() => n(v).length === 0) ? B(ee) : B(ue, -1);
        });
      }
      w(R, H);
    }, x = /* @__PURE__ */ Wn(() => (n(i), u(() => h.has(n(i) ?? "")))), C = (R) => {
      var H = Mv(), ne = d(H);
      {
        var ee = (y) => {
          var m = Pv(), N = f(d(m)), J = d(N);
          D((T) => M(J, T), [
            () => (n(c), u(() => String(n(c).name)))
          ]), w(y, m);
        };
        V(ne, (y) => {
          n(c), u(() => n(c).name) && y(ee);
        });
      }
      var ue = f(ne, 2);
      {
        var B = (y) => {
          var m = Rv(), N = f(d(m)), J = d(N);
          D((T) => M(J, T), [
            () => (n(c), u(() => String(n(c).description)))
          ]), w(y, m);
        };
        V(ue, (y) => {
          n(c), u(() => n(c).description) && y(B);
        });
      }
      var F = f(ue, 2);
      {
        var E = (y) => {
          var m = qv(), N = f(d(m), 2), J = d(N);
          D((T) => M(J, T), [
            () => (n(p), u(() => n(p).map((T) => (T == null ? void 0 : T.label) ?? (T == null ? void 0 : T.id)).join(", ")))
          ]), w(y, m);
        };
        V(F, (y) => {
          n(p), u(() => n(p).length > 0) && y(E);
        });
      }
      w(R, H);
    }, A = /* @__PURE__ */ Wn(() => (n(i), n(c), u(() => b.has(n(i) ?? "") && n(c)))), q = (R) => {
      var H = Dv();
      w(R, H);
    };
    V(k, (R) => {
      n(x) ? R(I) : n(A) ? R(C, 1) : R(q, -1);
    });
  }
  w(e, $), tt(), o();
}
var Jv = /* @__PURE__ */ S('<div class="rationale svelte-1grl4xd"> </div>'), zv = /* @__PURE__ */ S('<code class="target svelte-1grl4xd"> </code>'), Uv = /* @__PURE__ */ S('<span class="data-preview svelte-1grl4xd"> </span>'), Hv = /* @__PURE__ */ S('<label class="patch-row svelte-1grl4xd"><input type="checkbox"/> <span class="op-label svelte-1grl4xd"> </span> <!> <!></label>'), Vv = /* @__PURE__ */ S('<div class="proposal-card svelte-1grl4xd"><div class="proposal-header svelte-1grl4xd"><span class="complexity-badge svelte-1grl4xd"> </span> <span class="proposal-desc svelte-1grl4xd"> </span></div> <!> <div class="patches-list svelte-1grl4xd"></div> <div class="proposal-actions svelte-1grl4xd"><button class="btn-text svelte-1grl4xd">Accept All</button> <button class="btn-text svelte-1grl4xd">Reject All</button> <span class="spacer svelte-1grl4xd"></span> <button class="btn-secondary svelte-1grl4xd">Dismiss</button> <button class="btn-primary svelte-1grl4xd">Apply</button></div></div>');
function Bv(e, t) {
  et(t, !1);
  let s = Ye(t, "proposal", 8);
  const r = ro();
  let a = /* @__PURE__ */ L({});
  function o() {
    _(a, Object.fromEntries(s().patches.map((B, F) => [F, !0])));
  }
  function l() {
    _(a, Object.fromEntries(s().patches.map((B, F) => [F, !1])));
  }
  function i() {
    const B = s().patches.filter((F, E) => n(a)[E]);
    r("apply", { ...s(), patches: B });
  }
  function v() {
    r("reject");
  }
  const c = {
    targeted: "#22c55e",
    structural: "#f59e0b",
    replacement: "#ef4444"
  };
  function p(B) {
    return {
      add_node: "+ Add node",
      update_node: "~ Update node",
      delete_node: "− Delete node",
      add_edge: "+ Add edge",
      delete_edge: "− Delete edge",
      add_tool_edge: "+ Add tool edge"
    }[B] ?? B;
  }
  Ve(() => je(s()), () => {
    _(a, Object.fromEntries(s().patches.map((B, F) => [F, !0])));
  }), Zt(), st();
  var b = Vv(), h = d(b), $ = d(h), k = d($), I = f($, 2), x = d(I), C = f(h, 2);
  {
    var A = (B) => {
      var F = Jv(), E = d(F);
      D(() => M(E, (je(s()), u(() => s().rationale)))), w(B, F);
    };
    V(C, (B) => {
      je(s()), u(() => s().rationale) && B(A);
    });
  }
  var q = f(C, 2);
  Re(
    q,
    5,
    () => (je(s()), u(() => s().patches)),
    Pe,
    (B, F, E) => {
      var y = Hv(), m = d(y), N = f(m, 2), J = d(N), T = f(N, 2);
      {
        var W = (O) => {
          var X = zv(), ve = d(X);
          D(() => M(ve, (n(F), u(() => n(F).target)))), w(O, X);
        };
        V(T, (O) => {
          n(F), u(() => n(F).target) && O(W);
        });
      }
      var de = f(T, 2);
      {
        var Y = (O) => {
          var X = Uv(), ve = d(X);
          D((ae) => M(ve, `${ae ?? ""}…`), [
            () => (n(F), u(() => JSON.stringify(n(F).data).slice(0, 60)))
          ]), w(O, X);
        }, z = /* @__PURE__ */ Wn(() => (n(F), u(() => n(F).data && Object.keys(n(F).data).length > 0)));
        V(de, (O) => {
          n(z) && O(Y);
        });
      }
      D((O) => M(J, O), [
        () => (n(F), u(() => p(n(F).op)))
      ]), io(m, () => n(a)[E], (O) => nn(a, n(a)[E] = O)), w(B, y);
    }
  );
  var R = f(q, 2), H = d(R), ne = f(H, 2), ee = f(ne, 4), ue = f(ee, 2);
  D(() => {
    ao($, `color: ${je(s()), u(() => c[s().complexity]) ?? ""}`), M(k, (je(s()), u(() => s().complexity))), M(x, (je(s()), u(() => s().description)));
  }), G("click", H, o), G("click", ne, l), G("click", ee, v), G("click", ue, i), w(e, b), tt();
}
var Yv = /* @__PURE__ */ S('<button class="icon-btn svelte-vtqea" title="History">⏱</button>'), Gv = /* @__PURE__ */ S('<div><span class="msg-content svelte-vtqea"> </span></div>'), Kv = /* @__PURE__ */ S('<div class="history-view svelte-vtqea"><div class="history-header svelte-vtqea"><span class="svelte-vtqea">Conversation History</span> <button class="icon-btn svelte-vtqea">✕</button></div> <div class="messages-list svelte-vtqea"></div></div>'), Wv = /* @__PURE__ */ S('<div class="empty-state svelte-vtqea">Ask Caal to explain, improve, or modify this agent graph.</div>'), Xv = /* @__PURE__ */ S('<button class="node-chip svelte-vtqea"> </button>'), Zv = /* @__PURE__ */ S('<span class="svelte-vtqea"> </span>'), Qv = /* @__PURE__ */ S('<div class="msg-content svelte-vtqea"></div>'), ec = /* @__PURE__ */ S('<span class="msg-content svelte-vtqea"> </span>'), tc = /* @__PURE__ */ S("<div><!></div>"), nc = /* @__PURE__ */ S('<div class="message assistant thinking svelte-vtqea"><span class="dot svelte-vtqea"></span><span class="dot svelte-vtqea"></span><span class="dot svelte-vtqea"></span></div>'), sc = /* @__PURE__ */ S('<button class="quick-btn svelte-vtqea"> </button>'), rc = /* @__PURE__ */ S('<div class="messages-list svelte-vtqea"><!> <!> <!></div> <!> <div class="quick-actions svelte-vtqea"></div> <div class="input-area svelte-vtqea"><textarea class="caal-input svelte-vtqea" placeholder="Ask Caal… (Enter to send, Shift+Enter for newline)"></textarea> <button class="send-btn svelte-vtqea">➤</button></div>', 1), ac = /* @__PURE__ */ S('<div><div class="caal-header svelte-vtqea"><span class="caal-title svelte-vtqea"><span class="caal-dot svelte-vtqea"></span> Caal AI</span> <div class="header-actions svelte-vtqea"><!> <button class="icon-btn svelte-vtqea"> </button></div></div> <!></div>');
function oc(e, t) {
  et(t, !1);
  const s = () => nt(it, "$graph", a), r = () => nt(un, "$selectedNode", a), [a, o] = Xt();
  Ye(t, "agentId", 8);
  let l = /* @__PURE__ */ L([]), i = /* @__PURE__ */ L(""), v = /* @__PURE__ */ L(!1), c = /* @__PURE__ */ L(null), p = /* @__PURE__ */ L(null), b = /* @__PURE__ */ L(!0), h = /* @__PURE__ */ L(!1), $ = /* @__PURE__ */ L([]), k = /* @__PURE__ */ L();
  const I = [
    {
      label: "Explain graph",
      intent: "explain",
      prompt: "Explain what this agent does and how the nodes connect."
    },
    {
      label: "Suggest improvements",
      intent: "suggest",
      prompt: "Suggest improvements to this agent graph."
    },
    {
      label: "Describe selected",
      intent: "explain",
      prompt: "Describe the currently selected node."
    },
    {
      label: "Add guardrail",
      intent: "modify",
      prompt: "Add a content safety guardrail node after the LLM node."
    },
    {
      label: "Optimize flow",
      intent: "suggest",
      prompt: "How can I optimize this agent graph for performance?"
    }
  ];
  async function x(O, X) {
    if (!O.trim() || n(v)) return;
    const ve = { role: "user", content: O, timestamp: Date.now() };
    _(l, [...n(l), ve]), _(i, ""), _(v, !0), ne();
    try {
      const ae = {
        ...s(),
        authoringMode: s().authoringMode ?? "studio"
      }, he = {
        message: O,
        graphState: ae,
        selectedNodeIds: r() ? [r().id] : [],
        sessionId: n(p) ?? void 0,
        intent: X ?? C(O)
      }, le = await fetch("/api/v1/caal/invoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(he)
      });
      if (!le.ok) throw new Error(`Caal invoke failed: ${le.status}`);
      const re = await le.json();
      re.sessionId && _(p, re.sessionId);
      const te = re.output ?? {}, fe = {
        role: "assistant",
        content: te.content ?? "",
        nodeReferences: te.nodeReferences ?? [],
        proposal: te.proposal,
        canvasHighlight: te.canvasHighlight,
        canvasFocus: te.canvasFocus,
        timestamp: Date.now()
      };
      _(l, [...n(l), fe]), te.proposal && _(c, te.proposal), te.canvasHighlight && A(te.canvasHighlight), te.canvasFocus && q(te.canvasFocus);
    } catch (ae) {
      const he = {
        role: "assistant",
        content: `Error: ${ae.message}`,
        timestamp: Date.now()
      };
      _(l, [...n(l), he]);
    } finally {
      _(v, !1), ne();
    }
  }
  function C(O) {
    const X = O.toLowerCase();
    return /\b(add|create|remove|delete|update|change|modify|rename|move|connect|disconnect)\b/.test(X) ? "modify" : /\b(suggest|improve|optimize|better|recommend|enhance)\b/.test(X) ? "suggest" : "question";
  }
  function A(O) {
    window.dispatchEvent(new CustomEvent("caal:canvas-highlight", { detail: O }));
  }
  function q(O) {
    window.dispatchEvent(new CustomEvent("caal:canvas-focus", { detail: O }));
  }
  function R(O) {
    window.dispatchEvent(new CustomEvent("caal:canvas-focus", { detail: { nodeId: O, zoom: 1.5 } })), window.dispatchEvent(new CustomEvent("caal:canvas-highlight", {
      detail: { nodeIds: [O], color: "#F59E0B", durationMs: 2e3 }
    }));
  }
  function H(O) {
    const X = [], ve = /\[\[([^\]]+)\]\]/g;
    let ae = 0, he;
    for (; (he = ve.exec(O)) !== null; )
      he.index > ae && X.push({ type: "text", value: O.slice(ae, he.index) }), X.push({ type: "chip", value: he[1] }), ae = he.index + he[0].length;
    return ae < O.length && X.push({ type: "text", value: O.slice(ae) }), X;
  }
  function ne() {
    requestAnimationFrame(() => {
      n(k) && nn(k, n(k).scrollTop = n(k).scrollHeight);
    });
  }
  function ee(O) {
    O.key === "Enter" && !O.shiftKey && (O.preventDefault(), x(n(i)));
  }
  async function ue() {
    var O;
    if (n(p))
      try {
        const X = await fetch(`/api/v1/caal/sessions/${encodeURIComponent(n(p))}`);
        if (X.ok) {
          const ve = await X.json();
          _($, ((O = ve.contextEntries) == null ? void 0 : O.messages) ?? []), _(h, !0);
        }
      } catch {
      }
  }
  function B(O) {
    const X = O.detail;
    window.dispatchEvent(new CustomEvent("caal:apply-proposal", { detail: X })), _(c, null), _(l, [
      ...n(l),
      {
        role: "assistant",
        content: `Proposal "${X.description}" accepted and applied to graph.`,
        timestamp: Date.now()
      }
    ]);
  }
  function F() {
    _(c, null);
  }
  st();
  var E = ac();
  let y;
  var m = d(E), N = f(d(m), 2), J = d(N);
  {
    var T = (O) => {
      var X = Yv();
      G("click", X, ue), w(O, X);
    };
    V(J, (O) => {
      n(p) && O(T);
    });
  }
  var W = f(J, 2), de = d(W), Y = f(m, 2);
  {
    var z = (O) => {
      var X = Wt(), ve = Oe(X);
      {
        var ae = (le) => {
          var re = Kv(), te = d(re), fe = f(d(te), 2), ke = f(te, 2);
          Re(ke, 5, () => n($), Pe, (P, j) => {
            var K = Gv(), se = d(K), me = d(se);
            D(() => {
              Nt(K, 1, `message ${n(j), u(() => n(j).role) ?? ""}`, "svelte-vtqea"), M(me, (n(j), u(() => n(j).content)));
            }), w(P, K);
          }), G("click", fe, () => _(h, !1)), w(le, re);
        }, he = (le) => {
          var re = rc(), te = Oe(re), fe = d(te);
          {
            var ke = (Z) => {
              var oe = Wv();
              w(Z, oe);
            };
            V(fe, (Z) => {
              n(l), u(() => n(l).length === 0) && Z(ke);
            });
          }
          var P = f(fe, 2);
          Re(P, 1, () => n(l), Pe, (Z, oe) => {
            var pe = tc(), Ce = d(pe);
            {
              var Ge = (Ue) => {
                var U = Qv();
                Re(
                  U,
                  5,
                  () => (n(oe), u(() => H(n(oe).content))),
                  Pe,
                  (Q, ce) => {
                    var Te = Wt(), Je = Oe(Te);
                    {
                      var Ee = (De) => {
                        var Ie = Xv(), rt = d(Ie);
                        D(() => M(rt, (n(ce), u(() => n(ce).value)))), G("click", Ie, () => R(n(ce).value)), w(De, Ie);
                      }, Ne = (De) => {
                        var Ie = Zv(), rt = d(Ie);
                        D(() => M(rt, (n(ce), u(() => n(ce).value)))), w(De, Ie);
                      };
                      V(Je, (De) => {
                        n(ce), u(() => n(ce).type === "chip") ? De(Ee) : De(Ne, -1);
                      });
                    }
                    w(Q, Te);
                  }
                ), w(Ue, U);
              }, Ke = (Ue) => {
                var U = ec(), Q = d(U);
                D(() => M(Q, (n(oe), u(() => n(oe).content)))), w(Ue, U);
              };
              V(Ce, (Ue) => {
                n(oe), u(() => n(oe).role === "assistant") ? Ue(Ge) : Ue(Ke, -1);
              });
            }
            D(() => Nt(pe, 1, `message ${n(oe), u(() => n(oe).role) ?? ""}`, "svelte-vtqea")), w(Z, pe);
          });
          var j = f(P, 2);
          {
            var K = (Z) => {
              var oe = nc();
              w(Z, oe);
            };
            V(j, (Z) => {
              n(v) && Z(K);
            });
          }
          lo(te, (Z) => _(k, Z), () => n(k));
          var se = f(te, 2);
          {
            var me = (Z) => {
              Bv(Z, {
                get proposal() {
                  return n(c);
                },
                $$events: { apply: B, reject: F }
              });
            };
            V(se, (Z) => {
              n(c) && Z(me);
            });
          }
          var Fe = f(se, 2);
          Re(Fe, 5, () => I, Pe, (Z, oe) => {
            var pe = sc(), Ce = d(pe);
            D(() => {
              pe.disabled = n(v), M(Ce, (n(oe), u(() => n(oe).label)));
            }), G("click", pe, () => x(n(oe).prompt, n(oe).intent)), w(Z, pe);
          });
          var Me = f(Fe, 2), ye = d(Me);
          qe(ye, "rows", 2);
          var ge = f(ye, 2);
          D(
            (Z) => {
              ye.disabled = n(v), ge.disabled = Z;
            },
            [
              () => (n(v), n(i), u(() => n(v) || !n(i).trim()))
            ]
          ), dt(ye, () => n(i), (Z) => _(i, Z)), G("keydown", ye, ee), G("click", ge, () => x(n(i))), w(le, re);
        };
        V(ve, (le) => {
          n(h) ? le(ae) : le(he, -1);
        });
      }
      w(O, X);
    };
    V(Y, (O) => {
      n(b) && O(z);
    });
  }
  D(() => {
    y = Nt(E, 1, "caal-panel svelte-vtqea", null, y, { collapsed: !n(b) }), M(de, n(b) ? "▼" : "▲");
  }), G("click", W, () => _(b, !n(b))), w(e, E), tt(), o();
}
var ic = /* @__PURE__ */ S('<span class="sync-time svelte-ra0acr"> </span>'), lc = /* @__PURE__ */ S('<div class="code-banner svelte-ra0acr"><span class="icon svelte-ra0acr">⟨/⟩</span> <div class="text svelte-ra0acr"><span class="label svelte-ra0acr">Code-defined agent</span> <span class="handle svelte-ra0acr"> </span></div> <!> <a class="sync-link svelte-ra0acr" href="/admin/system/sync">Sync log</a></div>');
function vc(e, t) {
  et(t, !1);
  let s = Ye(t, "handle", 8), r = Ye(t, "lastSyncAt", 8, null);
  st();
  var a = lc(), o = f(d(a), 2), l = f(d(o), 2), i = d(l), v = f(o, 2);
  {
    var c = (p) => {
      var b = ic(), h = d(b);
      D(($) => M(h, `Synced ${$ ?? ""}`), [
        () => (je(r()), u(() => new Date(r()).toLocaleTimeString()))
      ]), w(p, b);
    };
    V(v, (p) => {
      r() && p(c);
    });
  }
  D(() => M(i, s())), w(e, a), tt();
}
var cc = /* @__PURE__ */ S('<div class="loading svelte-1pzk804">Loading…</div>'), uc = /* @__PURE__ */ S('<div class="error svelte-1pzk804"> </div>'), dc = /* @__PURE__ */ S('<div class="empty svelte-1pzk804">No context entries yet.</div>'), fc = /* @__PURE__ */ S('<span class="count svelte-1pzk804"> </span>'), pc = /* @__PURE__ */ S('<div class="entry svelte-1pzk804"><div class="entry-header svelte-1pzk804"><code class="entry-key svelte-1pzk804"> </code> <span class="acc-type svelte-1pzk804"> </span> <!> <span class="tokens svelte-1pzk804"> </span></div> <pre class="entry-value svelte-1pzk804"> </pre></div>'), hc = /* @__PURE__ */ S('<div class="entries svelte-1pzk804"></div>'), _c = /* @__PURE__ */ S('<div class="panel-body svelte-1pzk804"><div class="session-id-row svelte-1pzk804"><span class="label svelte-1pzk804">Session</span> <code class="sid svelte-1pzk804"> </code> <button class="refresh-btn svelte-1pzk804">↻</button></div> <!></div>'), gc = /* @__PURE__ */ S('<div class="session-panel svelte-1pzk804"><button class="panel-header svelte-1pzk804"><span>Session Context</span> <span class="toggle svelte-1pzk804"> </span></button> <!></div>');
function bc(e, t) {
  et(t, !1);
  let s = Ye(t, "agentId", 8), r = Ye(t, "sessionId", 8, null), a = /* @__PURE__ */ L(!1), o = /* @__PURE__ */ L(!1), l = /* @__PURE__ */ L([]), i = /* @__PURE__ */ L(null);
  async function v() {
    if (!(!s() || !r())) {
      _(o, !0), _(i, null);
      try {
        const k = await fetch(`/api/v1/agents/${s()}/sessions/${encodeURIComponent(r())}`);
        if (!k.ok) throw new Error(`${k.status}`);
        const I = await k.json();
        _(l, Object.entries(I.contextEntries ?? {}).map(([x, C]) => ({
          key: x,
          value: C.value,
          accumulationType: C.accumulationType,
          count: Array.isArray(C.value) ? C.value.length : void 0
        })));
      } catch (k) {
        _(i, k.message);
      } finally {
        _(o, !1);
      }
    }
  }
  function c(k) {
    return Math.ceil(JSON.stringify(k).length / 4);
  }
  function p(k) {
    const I = JSON.stringify(k, null, 2);
    return I.length > 200 ? I.slice(0, 200) + "…" : I;
  }
  Ve(() => (je(r()), n(a)), () => {
    r() && n(a) && v();
  }), Zt(), st();
  var b = Wt(), h = Oe(b);
  {
    var $ = (k) => {
      var I = gc(), x = d(I), C = f(d(x), 2), A = d(C), q = f(x, 2);
      {
        var R = (H) => {
          var ne = _c(), ee = d(ne), ue = f(d(ee), 2), B = d(ue), F = f(ue, 2), E = f(ee, 2);
          {
            var y = (T) => {
              var W = cc();
              w(T, W);
            }, m = (T) => {
              var W = uc(), de = d(W);
              D(() => M(de, n(i))), w(T, W);
            }, N = (T) => {
              var W = dc();
              w(T, W);
            }, J = (T) => {
              var W = hc();
              Re(W, 5, () => n(l), Pe, (de, Y) => {
                var z = pc(), O = d(z), X = d(O), ve = d(X), ae = f(X, 2), he = d(ae), le = f(ae, 2);
                {
                  var re = (j) => {
                    var K = fc(), se = d(K);
                    D(() => M(se, `${n(Y), u(() => n(Y).count) ?? ""} items`)), w(j, K);
                  };
                  V(le, (j) => {
                    n(Y), u(() => n(Y).count !== void 0) && j(re);
                  });
                }
                var te = f(le, 2), fe = d(te), ke = f(O, 2), P = d(ke);
                D(
                  (j, K) => {
                    M(ve, (n(Y), u(() => n(Y).key))), M(he, (n(Y), u(() => n(Y).accumulationType))), M(fe, `~${j ?? ""}t`), M(P, K);
                  },
                  [
                    () => (n(Y), u(() => c(n(Y).value))),
                    () => (n(Y), u(() => p(n(Y).value)))
                  ]
                ), w(de, z);
              }), w(T, W);
            };
            V(E, (T) => {
              n(o) ? T(y) : n(i) ? T(m, 1) : (n(l), u(() => n(l).length === 0) ? T(N, 2) : T(J, -1));
            });
          }
          D(() => {
            M(B, r()), F.disabled = n(o);
          }), G("click", F, v), w(H, ne);
        };
        V(q, (H) => {
          n(a) && H(R);
        });
      }
      D(() => M(A, n(a) ? "▼" : "▶")), G("click", x, () => {
        _(a, !n(a));
      }), w(k, I);
    };
    V(h, (k) => {
      r() && k($);
    });
  }
  w(e, b), tt();
}
var mc = /* @__PURE__ */ S('<div class="loading svelte-ojvpsl">Loading…</div>'), yc = /* @__PURE__ */ S('<div class="error svelte-ojvpsl"> </div>'), wc = /* @__PURE__ */ S('<div class="empty svelte-ojvpsl">No prompts defined.</div>'), xc = /* @__PURE__ */ S('<span class="active-label svelte-ojvpsl">active</span>'), kc = /* @__PURE__ */ S('<button class="promote-btn svelte-ojvpsl">Promote</button>'), Ec = /* @__PURE__ */ S('<button class="diff-btn svelte-ojvpsl">Diff</button>'), Sc = /* @__PURE__ */ S('<div><span class="vnum svelte-ojvpsl"> </span> <!> <!> <span class="version-date svelte-ojvpsl"> </span></div> <pre class="version-preview svelte-ojvpsl"> </pre>', 1), $c = /* @__PURE__ */ S('<div class="versions-list svelte-ojvpsl"></div>'), Tc = /* @__PURE__ */ S('<div class="prompt-item svelte-ojvpsl"><button class="prompt-name svelte-ojvpsl"><span></span> <span> </span> <span class="version-count svelte-ojvpsl"> </span> <span class="chevron svelte-ojvpsl"> </span></button> <!></div>'), jc = /* @__PURE__ */ S('<div class="prompts-list svelte-ojvpsl"></div>'), Nc = /* @__PURE__ */ S('<div class="panel-body svelte-ojvpsl"><!> <button class="new-btn svelte-ojvpsl">+ New Version</button></div>'), Cc = /* @__PURE__ */ S('<div class="modal-overlay svelte-ojvpsl"><div class="modal svelte-ojvpsl"><h3 class="svelte-ojvpsl">New Prompt Version</h3> <label class="svelte-ojvpsl">Prompt Name <input placeholder="e.g. system-prompt" class="svelte-ojvpsl"/></label> <label class="svelte-ojvpsl">Content <textarea placeholder="Prompt content…" class="svelte-ojvpsl"></textarea></label> <div class="modal-actions svelte-ojvpsl"><button class="btn-secondary svelte-ojvpsl">Cancel</button> <button class="btn-primary svelte-ojvpsl">Create</button></div></div></div>'), Ic = /* @__PURE__ */ S('<div class="modal-overlay svelte-ojvpsl"><div class="modal diff-modal svelte-ojvpsl"><h3 class="svelte-ojvpsl"> </h3> <div class="diff-grid svelte-ojvpsl"><div class="diff-col svelte-ojvpsl"><div class="diff-label svelte-ojvpsl"> </div> <pre class="svelte-ojvpsl"> </pre></div> <div class="diff-col svelte-ojvpsl"><div class="diff-label svelte-ojvpsl"> </div> <pre class="svelte-ojvpsl"> </pre></div></div> <div class="modal-actions svelte-ojvpsl"><button class="btn-secondary svelte-ojvpsl">Close</button> <button class="btn-primary svelte-ojvpsl"> </button></div></div></div>'), Oc = /* @__PURE__ */ S('<div class="prompt-panel svelte-ojvpsl"><button class="panel-header svelte-ojvpsl"><span>Prompt Versions</span> <span class="toggle svelte-ojvpsl"> </span></button> <!></div> <!> <!>', 1);
function Ac(e, t) {
  et(t, !1), Ye(t, "agentId", 8);
  let s = /* @__PURE__ */ L(!1), r = /* @__PURE__ */ L(!1), a = /* @__PURE__ */ L([]), o = /* @__PURE__ */ L(/* @__PURE__ */ new Set()), l = /* @__PURE__ */ L(""), i = /* @__PURE__ */ L(""), v = /* @__PURE__ */ L(!1), c = /* @__PURE__ */ L(null), p = /* @__PURE__ */ L(null);
  async function b() {
    _(r, !0), _(p, null);
    try {
      const y = await fetch("/api/v1/prompts");
      if (!y.ok) throw new Error(`${y.status}`);
      const m = await y.json();
      _(a, m.map((N) => ({ name: N.name, activeVersion: N, versions: [] })));
    } catch (y) {
      _(p, y.message);
    } finally {
      _(r, !1);
    }
  }
  async function h(y) {
    const m = await fetch(`/api/v1/prompts/${encodeURIComponent(y)}/versions`);
    if (!m.ok) throw new Error(`${m.status}`);
    const N = await m.json();
    _(a, n(a).map((J) => J.name === y ? { ...J, versions: N } : J));
  }
  async function $(y, m) {
    try {
      const N = await fetch(`/api/v1/prompts/${encodeURIComponent(y)}/versions/${m}/promote`, { method: "POST" });
      if (!N.ok) throw new Error(`${N.status}`);
      await b(), n(o).has(y) && await h(y);
    } catch (N) {
      _(p, N.message);
    }
  }
  async function k() {
    if (!(!n(l) || !n(i)))
      try {
        const y = await fetch("/api/v1/prompts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: n(l),
            content: n(i)
          })
        });
        if (!y.ok) throw new Error(`${y.status}`);
        const m = n(l);
        _(v, !1), _(l, ""), _(i, ""), await b(), n(o).has(m) && await h(m);
      } catch (y) {
        _(p, y.message);
      }
  }
  async function I(y) {
    if (n(o).has(y)) {
      n(o).delete(y), _(o, new Set(n(o)));
      return;
    }
    n(o).add(y), _(o, new Set(n(o)));
    try {
      await h(y);
    } catch (m) {
      _(p, m.message);
    }
  }
  function x(y, m, N) {
    _(c, { name: y, v1: m, v2: N });
  }
  Ve(() => (n(s), n(a)), () => {
    n(s) && n(a).length === 0 && b();
  }), Zt(), st();
  var C = Oc(), A = Oe(C), q = d(A), R = f(d(q), 2), H = d(R), ne = f(q, 2);
  {
    var ee = (y) => {
      var m = Nc(), N = d(m);
      {
        var J = (z) => {
          var O = mc();
          w(z, O);
        }, T = (z) => {
          var O = yc(), X = d(O);
          D(() => M(X, n(p))), w(z, O);
        }, W = (z) => {
          var O = wc();
          w(z, O);
        }, de = (z) => {
          var O = jc();
          Re(O, 5, () => n(a), Pe, (X, ve) => {
            var ae = Tc(), he = d(ae), le = d(he);
            let re;
            var te = f(le, 2), fe = d(te), ke = f(te, 2), P = d(ke), j = f(ke, 2), K = d(j), se = f(he, 2);
            {
              var me = (Me) => {
                var ye = $c();
                Re(ye, 5, () => (n(ve), u(() => n(ve).versions ?? [])), Pe, (ge, Z) => {
                  var oe = Sc(), pe = Oe(oe);
                  let Ce;
                  var Ge = d(pe), Ke = d(Ge), Ue = f(Ge, 2);
                  {
                    var U = (Ie) => {
                      var rt = xc();
                      w(Ie, rt);
                    }, Q = (Ie) => {
                      var rt = kc();
                      G("click", rt, () => $(n(ve).name, n(Z).id)), w(Ie, rt);
                    };
                    V(Ue, (Ie) => {
                      n(Z), u(() => n(Z).isActive) ? Ie(U) : Ie(Q, -1);
                    });
                  }
                  var ce = f(Ue, 2);
                  {
                    var Te = (Ie) => {
                      var rt = Ec();
                      G("click", rt, () => x(n(ve).name, n(ve).activeVersion, n(Z))), w(Ie, rt);
                    };
                    V(ce, (Ie) => {
                      n(ve), n(Z), u(() => n(ve).activeVersion && !n(Z).isActive) && Ie(Te);
                    });
                  }
                  var Je = f(ce, 2), Ee = d(Je), Ne = f(pe, 2), De = d(Ne);
                  D(
                    (Ie, rt) => {
                      Ce = Nt(pe, 1, "version-row svelte-ojvpsl", null, Ce, { active: n(Z).isActive }), M(Ke, `v${n(Z), u(() => n(Z).versionNumber) ?? ""}`), M(Ee, Ie), M(De, `${rt ?? ""}${n(Z), u(() => n(Z).content.length > 120 ? "…" : "") ?? ""}`);
                    },
                    [
                      () => (n(Z), u(() => new Date(n(Z).createdAt).toLocaleDateString())),
                      () => (n(Z), u(() => n(Z).content.slice(0, 120)))
                    ]
                  ), w(ge, oe);
                }), w(Me, ye);
              }, Fe = /* @__PURE__ */ Wn(() => (n(o), n(ve), u(() => n(o).has(n(ve).name))));
              V(se, (Me) => {
                n(Fe) && Me(me);
              });
            }
            D(
              (Me) => {
                re = Nt(le, 1, "active-dot svelte-ojvpsl", null, re, { active: n(ve).activeVersion !== null }), M(fe, (n(ve), u(() => n(ve).name))), M(P, `v${n(ve), u(() => {
                  var ye;
                  return ((ye = n(ve).activeVersion) == null ? void 0 : ye.versionNumber) ?? "—";
                }) ?? ""}`), M(K, Me);
              },
              [
                () => (n(o), n(ve), u(() => n(o).has(n(ve).name) ? "▼" : "▶"))
              ]
            ), G("click", he, () => I(n(ve).name)), w(X, ae);
          }), w(z, O);
        };
        V(N, (z) => {
          n(r) ? z(J) : n(p) ? z(T, 1) : (n(a), u(() => n(a).length === 0) ? z(W, 2) : z(de, -1));
        });
      }
      var Y = f(N, 2);
      G("click", Y, () => _(v, !0)), w(y, m);
    };
    V(ne, (y) => {
      n(s) && y(ee);
    });
  }
  var ue = f(A, 2);
  {
    var B = (y) => {
      var m = Cc(), N = d(m), J = f(d(N), 2), T = f(d(J)), W = f(J, 2), de = f(d(W));
      qe(de, "rows", 6);
      var Y = f(W, 2), z = d(Y), O = f(z, 2);
      dt(T, () => n(l), (X) => _(l, X)), dt(de, () => n(i), (X) => _(i, X)), G("click", z, () => _(v, !1)), G("click", O, k), G("click", m, Tr(() => _(v, !1))), w(y, m);
    };
    V(ue, (y) => {
      n(v) && y(B);
    });
  }
  var F = f(ue, 2);
  {
    var E = (y) => {
      var m = Ic(), N = d(m), J = d(N), T = d(J), W = f(J, 2), de = d(W), Y = d(de), z = d(Y), O = f(Y, 2), X = d(O), ve = f(de, 2), ae = d(ve), he = d(ae), le = f(ae, 2), re = d(le), te = f(W, 2), fe = d(te), ke = f(fe, 2), P = d(ke);
      D(() => {
        M(T, `Diff: ${n(c), u(() => n(c).name) ?? ""}`), M(z, `Active (v${n(c), u(() => n(c).v1.versionNumber) ?? ""})`), M(X, (n(c), u(() => n(c).v1.content))), M(he, `v${n(c), u(() => n(c).v2.versionNumber) ?? ""}`), M(re, (n(c), u(() => n(c).v2.content))), M(P, `Promote v${n(c), u(() => n(c).v2.versionNumber) ?? ""}`);
      }), G("click", fe, () => _(c, null)), G("click", ke, () => {
        $(n(c).name, n(c).v2.id), _(c, null);
      }), G("click", m, Tr(() => _(c, null))), w(y, m);
    };
    V(F, (y) => {
      n(c) && y(E);
    });
  }
  D(() => M(H, n(s) ? "▼" : "▶")), G("click", q, () => {
    _(s, !n(s));
  }), w(e, C), tt();
}
var Pc = /* @__PURE__ */ S('<span class="badge svelte-1bw2oss"> </span>'), Rc = /* @__PURE__ */ S("<div> <!></div>"), qc = /* @__PURE__ */ S('<div class="loading svelte-1bw2oss">Loading…</div>'), Mc = /* @__PURE__ */ S('<div class="error svelte-1bw2oss"> </div>'), Dc = /* @__PURE__ */ S('<div class="empty svelte-1bw2oss">No test cases yet.</div>'), Lc = /* @__PURE__ */ S('<span class="running-indicator svelte-1bw2oss">⟳</span>'), Fc = /* @__PURE__ */ S('<div class="case-row svelte-1bw2oss"><span></span> <span class="case-name svelte-1bw2oss"> </span> <span class="assertion-count svelte-1bw2oss"> </span> <!> <button class="delete-btn svelte-1bw2oss">✕</button></div>'), Jc = /* @__PURE__ */ S('<div class="cases-list svelte-1bw2oss"></div>'), zc = /* @__PURE__ */ S('<div class="panel-body svelte-1bw2oss"><!> <!> <div class="panel-actions svelte-1bw2oss"><button class="new-btn svelte-1bw2oss">+ New Test</button> <button class="run-btn svelte-1bw2oss"> </button></div></div>'), Uc = /* @__PURE__ */ S('<input placeholder="Expected value (JSON or string)" class="svelte-1bw2oss"/>'), Hc = /* @__PURE__ */ S('<label class="inline svelte-1bw2oss">Threshold <input type="number" min="0" max="1" step="0.05" style="width: 70px;" class="svelte-1bw2oss"/></label>'), Vc = /* @__PURE__ */ S('<div class="modal-overlay svelte-1bw2oss"><div class="modal svelte-1bw2oss"><h3 class="svelte-1bw2oss">New Test Case</h3> <label class="svelte-1bw2oss">Name <input placeholder="Test case name" class="svelte-1bw2oss"/></label> <label class="svelte-1bw2oss">Input JSON <textarea class="mono svelte-1bw2oss"></textarea></label> <div class="assertion-builder svelte-1bw2oss"><div class="assertion-header svelte-1bw2oss">Assertion</div> <div class="assertion-row svelte-1bw2oss"><select class="svelte-1bw2oss"><option>Exact Match</option><option>Schema</option><option>Score Threshold</option></select> <input placeholder="Output key, e.g. output.text" class="svelte-1bw2oss"/></div> <!></div> <div class="modal-actions svelte-1bw2oss"><button class="btn-secondary svelte-1bw2oss">Cancel</button> <button class="btn-primary svelte-1bw2oss">Create</button></div></div></div>'), Bc = /* @__PURE__ */ S('<div class="test-panel svelte-1bw2oss"><button class="panel-header svelte-1bw2oss"><span>Test Cases</span> <!> <span class="toggle svelte-1bw2oss"> </span></button> <!></div> <!>', 1);
function Yc(e, t) {
  et(t, !1);
  let s = Ye(t, "agentId", 8), r = /* @__PURE__ */ L(!1), a = /* @__PURE__ */ L(!1), o = /* @__PURE__ */ L(!1), l = /* @__PURE__ */ L([]), i = /* @__PURE__ */ L(null), v = /* @__PURE__ */ L(!1), c = /* @__PURE__ */ L(null), p = /* @__PURE__ */ L({
    name: "",
    inputJson: `{
  
}`,
    assertionType: "exact_match",
    assertionKey: "",
    assertionExpected: "",
    assertionThreshold: 0.8
  });
  async function b() {
    if (s()) {
      _(a, !0), _(c, null);
      try {
        const E = await fetch(`/api/v1/agents/${s()}/test-cases`);
        if (!E.ok) throw new Error(`${E.status}`);
        const y = await E.json();
        _(l, y.testCases ?? []);
      } catch (E) {
        _(c, E.message);
      } finally {
        _(a, !1);
      }
    }
  }
  async function h() {
    _(o, !0), _(i, null), _(c, null);
    try {
      const E = await fetch(`/api/v1/agents/${s()}/test-cases/run`, { method: "POST" });
      if (!E.ok) throw new Error(`${E.status}`);
      _(i, await E.json()), await b();
    } catch (E) {
      _(c, E.message);
    } finally {
      _(o, !1);
    }
  }
  async function $() {
    try {
      const E = {
        type: n(p).assertionType,
        key: n(p).assertionKey
      };
      if (n(p).assertionType === "exact_match")
        try {
          E.expected = JSON.parse(n(p).assertionExpected);
        } catch {
          E.expected = n(p).assertionExpected;
        }
      else n(p).assertionType === "evaluate_score" && (E.threshold = n(p).assertionThreshold);
      const y = await fetch(`/api/v1/agents/${s()}/test-cases`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: n(p).name,
          inputJson: n(p).inputJson,
          assertionsJson: JSON.stringify([E])
        })
      });
      if (!y.ok) throw new Error(`${y.status}`);
      _(v, !1), _(p, {
        name: "",
        inputJson: `{
  
}`,
        assertionType: "exact_match",
        assertionKey: "",
        assertionExpected: "",
        assertionThreshold: 0.8
      }), await b();
    } catch (E) {
      _(c, E.message);
    }
  }
  async function k(E) {
    try {
      await fetch(`/api/v1/agents/${s()}/test-cases/${E}`, { method: "DELETE" }), await b();
    } catch {
    }
  }
  function I(E) {
    return `${E.passed}/${E.total}`;
  }
  Ve(() => (n(r), n(l), n(a)), () => {
    n(r) && n(l).length === 0 && !n(a) && b();
  }), Zt(), st();
  var x = Bc(), C = Oe(x), A = d(C), q = f(d(A), 2);
  {
    var R = (E) => {
      var y = Pc(), m = d(y);
      D(() => M(m, (n(l), u(() => n(l).length)))), w(E, y);
    };
    V(q, (E) => {
      n(l), u(() => n(l).length > 0) && E(R);
    });
  }
  var H = f(q, 2), ne = d(H), ee = f(A, 2);
  {
    var ue = (E) => {
      var y = zc(), m = d(y);
      {
        var N = (ae) => {
          var he = Rc();
          let le;
          var re = d(he), te = f(re);
          {
            var fe = (ke) => {
              var P = Ui();
              D(() => M(P, `— ${n(i), u(() => n(i).failed) ?? ""} failed`)), w(ke, P);
            };
            V(te, (ke) => {
              n(i), u(() => n(i).failed > 0) && ke(fe);
            });
          }
          D(
            (ke) => {
              le = Nt(he, 1, "suite-summary svelte-1bw2oss", null, le, {
                passed: n(i).failed === 0,
                failed: n(i).failed > 0
              }), M(re, `Suite: ${ke ?? ""} passed `);
            },
            [
              () => (n(i), u(() => I(n(i))))
            ]
          ), w(ae, he);
        };
        V(m, (ae) => {
          n(i) && ae(N);
        });
      }
      var J = f(m, 2);
      {
        var T = (ae) => {
          var he = qc();
          w(ae, he);
        }, W = (ae) => {
          var he = Mc(), le = d(he);
          D(() => M(le, n(c))), w(ae, he);
        }, de = (ae) => {
          var he = Dc();
          w(ae, he);
        }, Y = (ae) => {
          var he = Jc();
          Re(he, 5, () => n(l), Pe, (le, re) => {
            const te = /* @__PURE__ */ Xe(() => (n(i), n(re), u(() => {
              var ge, Z;
              return (Z = (ge = n(i)) == null ? void 0 : ge.results) == null ? void 0 : Z.find((oe) => oe.id === n(re).id);
            })));
            var fe = Fc(), ke = d(fe);
            let P;
            var j = f(ke, 2), K = d(j), se = f(j, 2), me = d(se), Fe = f(se, 2);
            {
              var Me = (ge) => {
                var Z = Lc();
                w(ge, Z);
              };
              V(Fe, (ge) => {
                n(o) && ge(Me);
              });
            }
            var ye = f(Fe, 2);
            D(() => {
              var ge, Z, oe, pe;
              P = Nt(ke, 1, "status-dot svelte-1bw2oss", null, P, {
                pass: ((ge = n(te)) == null ? void 0 : ge.passed) === !0 || ((Z = n(re).lastResult) == null ? void 0 : Z.passed) === !0,
                fail: ((oe = n(te)) == null ? void 0 : oe.passed) === !1 || ((pe = n(re).lastResult) == null ? void 0 : pe.passed) === !1
              }), M(K, (n(re), u(() => n(re).name))), M(me, `${n(re), u(() => (n(re).assertions ?? []).length) ?? ""} assertions`);
            }), G("click", ye, () => k(n(re).id)), w(le, fe);
          }), w(ae, he);
        };
        V(J, (ae) => {
          n(a) ? ae(T) : n(c) ? ae(W, 1) : (n(l), u(() => n(l).length === 0) ? ae(de, 2) : ae(Y, -1));
        });
      }
      var z = f(J, 2), O = d(z), X = f(O, 2), ve = d(X);
      D(() => {
        X.disabled = (n(o), n(l), u(() => n(o) || n(l).length === 0)), M(ve, n(o) ? "Running…" : "Run Suite");
      }), G("click", O, () => _(v, !0)), G("click", X, h), w(E, y);
    };
    V(ee, (E) => {
      n(r) && E(ue);
    });
  }
  var B = f(C, 2);
  {
    var F = (E) => {
      var y = Vc(), m = d(y), N = f(d(m), 2), J = f(d(N)), T = f(N, 2), W = f(d(T));
      qe(W, "rows", 5);
      var de = f(T, 2), Y = f(d(de), 2), z = d(Y), O = d(z);
      O.value = O.__value = "exact_match";
      var X = f(O);
      X.value = X.__value = "schema";
      var ve = f(X);
      ve.value = ve.__value = "evaluate_score";
      var ae = f(z, 2), he = f(Y, 2);
      {
        var le = (P) => {
          var j = Uc();
          dt(j, () => n(p).assertionExpected, (K) => nn(p, n(p).assertionExpected = K)), w(P, j);
        }, re = (P) => {
          var j = Hc(), K = f(d(j));
          dt(K, () => n(p).assertionThreshold, (se) => nn(p, n(p).assertionThreshold = se)), w(P, j);
        };
        V(he, (P) => {
          n(p), u(() => n(p).assertionType === "exact_match") ? P(le) : (n(p), u(() => n(p).assertionType === "evaluate_score") && P(re, 1));
        });
      }
      var te = f(de, 2), fe = d(te), ke = f(fe, 2);
      D(() => ke.disabled = (n(p), u(() => !n(p).name))), dt(J, () => n(p).name, (P) => nn(p, n(p).name = P)), dt(W, () => n(p).inputJson, (P) => nn(p, n(p).inputJson = P)), $r(z, () => n(p).assertionType, (P) => nn(p, n(p).assertionType = P)), dt(ae, () => n(p).assertionKey, (P) => nn(p, n(p).assertionKey = P)), G("click", fe, () => _(v, !1)), G("click", ke, $), G("click", y, Tr(() => _(v, !1))), w(E, y);
    };
    V(B, (E) => {
      n(v) && E(F);
    });
  }
  D(() => M(ne, n(r) ? "▼" : "▶")), G("click", A, () => {
    _(r, !n(r));
  }), w(e, x), tt();
}
var Gc = /* @__PURE__ */ S('<div class="studio svelte-13r820j"><aside><!></aside> <main class="canvas-area svelte-13r820j"><!> <!></main> <aside class="panel svelte-13r820j"><!> <!> <!> <!> <!> <!> <!> <!></aside></div>');
function Kc(e, t) {
  et(t, !1);
  const s = () => nt(un, "$selectedNode", r), [r, a] = Xt();
  let o = Ye(t, "agentId", 8), l = /* @__PURE__ */ L(!1), i = /* @__PURE__ */ L(""), v = /* @__PURE__ */ L(null), c = /* @__PURE__ */ L(null);
  ks(async () => {
    if (o()) {
      try {
        const [T, W, de] = await Promise.all([
          fetch(`/api/agents/${o()}`),
          fetch(`/api/agents/${o()}/versions`),
          fetch(`/api/agents/${o()}/config`)
        ]);
        let Y = null;
        if (T.ok && (Y = await T.json(), qs.set(Y), _(l, (Y == null ? void 0 : Y.authoringMode) === "code-defined"), _(i, (Y == null ? void 0 : Y.handle) ?? ""), n(l) && _(v, (Y == null ? void 0 : Y.updatedAt) ?? null)), (Y == null ? void 0 : Y.status) === "draft" && Y.draftGraphJson)
          it.set(JSON.parse(Y.draftGraphJson));
        else if (W.ok) {
          const z = await W.json();
          if (z.length > 0) {
            const O = z[z.length - 1];
            it.set(JSON.parse(O.graphJson ?? "{}"));
          }
        }
        if (de.ok) {
          const O = (await de.json()).triggerConfig ?? {};
          Pn.set({
            triggerType: O.type ?? "rest",
            description: "",
            cronExpression: O.expression ?? "",
            webhookUrl: O.webhookUrl ?? ""
          });
        }
      } catch {
      }
      window.addEventListener("caal:canvas-highlight", p), window.addEventListener("caal:canvas-focus", b), window.addEventListener("caal:apply-proposal", h);
    }
  });
  function p(T) {
    const W = T.detail;
    window.dispatchEvent(new CustomEvent("canvas:highlight", { detail: W }));
  }
  function b(T) {
    const W = T.detail;
    window.dispatchEvent(new CustomEvent("canvas:focus", { detail: W }));
  }
  function h(T) {
    const W = T.detail;
    it.update((de) => {
      const Y = structuredClone(de);
      for (const z of W.patches)
        if (z.op === "add_node" && z.data) {
          const O = z.data;
          Y.nodes[O.id] = O;
        } else if (z.op === "update_node" && z.target && z.data) {
          const O = Y.nodes[z.target];
          O && (Y.nodes[z.target] = { ...O, ...z.data });
        } else z.op === "delete_node" && z.target ? delete Y.nodes[z.target] : z.op === "add_edge" && z.data ? Y.edges = [...Y.edges ?? [], z.data] : z.op === "add_tool_edge" && z.data && (Y.toolEdges = [...Y.toolEdges ?? [], z.data]);
      return Y;
    });
  }
  st();
  var $ = Gc(), k = d($);
  let I;
  var x = d(k);
  Sl(x, {
    get readonly() {
      return n(l);
    }
  });
  var C = f(k, 2), A = d(C);
  {
    var q = (T) => {
      vc(T, {
        get handle() {
          return n(i);
        },
        get lastSyncAt() {
          return n(v);
        }
      });
    };
    V(A, (T) => {
      n(l) && T(q);
    });
  }
  var R = f(A, 2);
  yl(R, {
    get agentId() {
      return o();
    },
    get readonly() {
      return n(l);
    }
  });
  var H = f(C, 2), ne = d(H);
  {
    var ee = (T) => {
      Hl(T, {
        get node() {
          return s();
        },
        get readonly() {
          return n(l);
        }
      });
    }, ue = (T) => {
      lv(T, {
        get agentId() {
          return o();
        },
        get readonly() {
          return n(l);
        }
      });
    };
    V(ne, (T) => {
      s() ? T(ee) : T(ue, -1);
    });
  }
  var B = f(ne, 2);
  Nv(B, {});
  var F = f(B, 2);
  Fv(F, {});
  var E = f(F, 2);
  xv(E, {
    get agentId() {
      return o();
    },
    $$events: { sessionId: (T) => _(c, T.detail) }
  });
  var y = f(E, 2);
  bc(y, {
    get agentId() {
      return o();
    },
    get sessionId() {
      return n(c);
    }
  });
  var m = f(y, 2);
  Ac(m, {
    get agentId() {
      return o();
    }
  });
  var N = f(m, 2);
  Yc(N, {
    get agentId() {
      return o();
    }
  });
  var J = f(N, 2);
  oc(J, {
    get agentId() {
      return o();
    }
  }), D(() => I = Nt(k, 1, "palette svelte-13r820j", null, I, { readonly: n(l) })), w(e, $), tt(), a();
}
const ir = document.getElementById("canvas-mount");
if (ir) {
  const e = ir.getAttribute("data-agent-id") ?? "";
  Bi(Kc, { target: ir, props: { agentId: e } });
}
