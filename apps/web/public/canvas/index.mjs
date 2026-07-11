var yo = Object.defineProperty;
var Wr = (e) => {
  throw TypeError(e);
};
var wo = (e, t, s) => t in e ? yo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var lt = (e, t, s) => wo(e, typeof t != "symbol" ? t + "" : t, s), Zs = (e, t, s) => t.has(e) || Wr("Cannot " + s);
var g = (e, t, s) => (Zs(e, t, "read from private field"), s ? s.call(e) : t.get(e)), ge = (e, t, s) => t.has(e) ? Wr("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), _e = (e, t, s, r) => (Zs(e, t, "write to private field"), r ? r.call(e, s) : t.set(e, s), s), Se = (e, t, s) => (Zs(e, t, "access private method"), s);
var ua;
typeof window < "u" && ((ua = window.__svelte ?? (window.__svelte = {})).v ?? (ua.v = /* @__PURE__ */ new Set())).add("5");
let Zn = !1, xo = !1;
function ko() {
  Zn = !0;
}
ko();
const Eo = 1, So = 2, pa = 4, $o = 8, To = 16, jo = 1, No = 2, Co = 4, Io = 8, Oo = 16, ha = 1, Ao = 2, Ye = Symbol("uninitialized"), _a = "http://www.w3.org/1999/xhtml", ga = !1;
var Hs = Array.isArray, Po = Array.prototype.indexOf, mn = Array.prototype.includes, Bs = Array.from, ba = Object.defineProperty, Mn = Object.getOwnPropertyDescriptor, ma = Object.getOwnPropertyDescriptors, Ro = Object.prototype, qo = Array.prototype, Nr = Object.getPrototypeOf, Xr = Object.isExtensible;
const yn = () => {
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
const Qe = 2, Bn = 4, ms = 8, wa = 1 << 24, At = 16, Rt = 32, vn = 64, vr = 128, St = 512, Ue = 1024, Ke = 2048, qt = 4096, it = 8192, $t = 16384, jn = 32768, cr = 1 << 25, Vn = 65536, Ms = 1 << 17, Lo = 1 << 18, Qn = 1 << 19, xa = 1 << 20, Ft = 1 << 25, En = 65536, Ds = 1 << 21, Dn = 1 << 22, on = 1 << 23, Vt = Symbol("$state"), Fo = Symbol("legacy props"), Jo = Symbol(""), Ns = Symbol("attributes"), ur = Symbol("class"), dr = Symbol("style"), rs = Symbol("text"), Cs = Symbol("form reset"), Vs = new class extends Error {
  constructor() {
    super(...arguments);
    lt(this, "name", "StaleReactionError");
    lt(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
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
function Bo(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Vo() {
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
let Pe = null;
function Yn(e) {
  Pe = e;
}
function et(e, t = !1, s) {
  Pe = {
    p: Pe,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      me
    ),
    l: Zn && !t ? { s: null, u: null, $: [] } : null
  };
}
function tt(e) {
  var t = (
    /** @type {ComponentContext} */
    Pe
  ), s = t.e;
  if (s !== null) {
    t.e = null;
    for (var r of s)
      Ba(r);
  }
  return t.i = !0, Pe = t.p, /** @type {T} */
  {};
}
function ys() {
  return !Zn || Pe !== null && Pe.l === null;
}
let un = [];
function Sa() {
  var e = un;
  un = [], lr(e);
}
function ln(e) {
  if (un.length === 0 && !ls) {
    var t = un;
    queueMicrotask(() => {
      t === un && Sa();
    });
  }
  un.push(e);
}
function si() {
  for (; un.length > 0; )
    Sa();
}
function $a(e) {
  var t = me;
  if (t === null)
    return we.f |= on, e;
  if ((t.f & jn) === 0 && (t.f & Bn) === 0)
    throw e;
  an(e, t);
}
function an(e, t) {
  for (; t !== null; ) {
    if ((t.f & vr) !== 0) {
      if ((t.f & jn) === 0)
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
function Fe(e, t) {
  e.f = e.f & ri | t;
}
function Or(e) {
  (e.f & St) !== 0 || e.deps === null ? Fe(e, Ue) : Fe(e, qt);
}
function Ta(e) {
  if (e !== null)
    for (const t of e)
      (t.f & Qe) === 0 || (t.f & En) === 0 || (t.f ^= En, Ta(
        /** @type {Derived} */
        t.deps
      ));
}
function ja(e, t, s) {
  (e.f & Ke) !== 0 ? t.add(e) : (e.f & qt) !== 0 && s.add(e), Ta(e.deps), Fe(e, Ue);
}
function Na(e, t, s) {
  if (e == null)
    return t(void 0), yn;
  const r = u(
    () => e.subscribe(
      t,
      // @ts-expect-error
      s
    )
  );
  return r.unsubscribe ? () => r.unsubscribe() : r;
}
const Cn = [];
function es(e, t = yn) {
  let s = null;
  const r = /* @__PURE__ */ new Set();
  function a(i) {
    if (Ir(e, i) && (e = i, s)) {
      const v = !Cn.length;
      for (const c of r)
        c[1](), Cn.push(c, e);
      if (v) {
        for (let c = 0; c < Cn.length; c += 2)
          Cn[c][0](Cn[c + 1]);
        Cn.length = 0;
      }
    }
  }
  function o(i) {
    a(i(
      /** @type {T} */
      e
    ));
  }
  function l(i, v = yn) {
    const c = [i, v];
    return r.add(c), r.size === 1 && (s = t(a, o) || yn), i(
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
    source: /* @__PURE__ */ F(void 0),
    unsubscribe: yn
  });
  if (r.store !== e && !(pr in s))
    if (r.unsubscribe(), r.store = e ?? null, e == null)
      r.source.v = void 0, r.unsubscribe = yn;
    else {
      var a = !0;
      r.unsubscribe = Na(e, (o) => {
        a ? r.source.v = o : _(r.source, o);
      }), a = !1;
    }
  return e && pr in s ? ai(e) : n(r.source);
}
function Wt() {
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
let er = null, In = null, ie = null, is = null, Ze = null, hr = null, ls = !1, tr = !1, Pn = null, Is = null;
var Zr = 0;
let li = 1;
var Ln, nn, fn, Fn, Jn, pn, zn, zt, fs, pt, ps, sn, Mt, Dt, Un, hn, Te, _r, as, gr, Ca, Ia, Os, vi, br, On;
const Js = class Js {
  constructor() {
    ge(this, Te);
    lt(this, "id", li++);
    /** True as soon as `#process` was called */
    ge(this, Ln, !1);
    lt(this, "linked", !0);
    /** @type {Batch | null} */
    ge(this, nn, null);
    /** @type {Batch | null} */
    ge(this, fn, null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    lt(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    lt(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    lt(this, "previous", /* @__PURE__ */ new Map());
    /**
     * Async effects which this batch doesn't take into account anymore when calculating blockers,
     * as it has a value for it already.
     * @type {Set<Effect>}
     */
    lt(this, "unblocked", /* @__PURE__ */ new Set());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    ge(this, Fn, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    ge(this, Jn, /* @__PURE__ */ new Set());
    /**
     * Callbacks that should run only when a fork is committed.
     * @type {Set<(batch: Batch) => void>}
     */
    ge(this, pn, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    ge(this, zn, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    ge(this, zt, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    ge(this, fs, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    ge(this, pt, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    ge(this, ps, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    ge(this, sn, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    ge(this, Mt, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    ge(this, Dt, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    ge(this, Un, /* @__PURE__ */ new Set());
    lt(this, "is_fork", !1);
    ge(this, hn, !1);
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    g(this, Dt).has(t) || g(this, Dt).set(t, { d: [], m: [] }), g(this, Un).delete(t);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(t, s = (r) => this.schedule(r)) {
    var r = g(this, Dt).get(t);
    if (r) {
      g(this, Dt).delete(t);
      for (var a of r.d)
        Fe(a, Ke), s(a);
      for (a of r.m)
        Fe(a, qt), s(a);
    }
    g(this, Un).add(t);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(t, s, r = !1) {
    t.v !== Ye && !this.previous.has(t) && this.previous.set(t, t.v), (t.f & on) === 0 && (this.current.set(t, [s, r]), Ze == null || Ze.set(t, s)), this.is_fork || (t.v = s);
  }
  activate() {
    ie = this;
  }
  deactivate() {
    ie = null, Ze = null;
  }
  flush() {
    try {
      tr = !0, ie = this, Se(this, Te, as).call(this);
    } finally {
      Zr = 0, hr = null, Pn = null, Is = null, tr = !1, ie = null, Ze = null, wn.clear();
    }
  }
  discard() {
    for (const t of g(this, Jn)) t(this);
    g(this, Jn).clear(), g(this, pn).clear(), Se(this, Te, On).call(this);
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
    if (_e(this, zn, g(this, zn) + 1), t) {
      let r = g(this, zt).get(s) ?? 0;
      g(this, zt).set(s, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(t, s) {
    if (_e(this, zn, g(this, zn) - 1), t) {
      let r = g(this, zt).get(s) ?? 0;
      r === 1 ? g(this, zt).delete(s) : g(this, zt).set(s, r - 1);
    }
    g(this, hn) || (_e(this, hn, !0), ln(() => {
      _e(this, hn, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(t, s) {
    for (const r of t)
      g(this, sn).add(r);
    for (const r of s)
      g(this, Mt).add(r);
    t.clear(), s.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(t) {
    g(this, Fn).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    g(this, Jn).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  on_fork_commit(t) {
    g(this, pn).add(t);
  }
  run_fork_commit_callbacks() {
    for (const t of g(this, pn)) t(this);
    g(this, pn).clear();
  }
  settled() {
    return (g(this, fs) ?? _e(this, fs, ya())).promise;
  }
  static ensure() {
    var t;
    if (ie === null) {
      const s = ie = new Js();
      Se(t = s, Te, br).call(t), !tr && !ls && ln(() => {
        g(s, Ln) || s.flush();
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
    if (hr = t, (a = t.b) != null && a.is_pending && (t.f & (Bn | ms | wa)) !== 0 && (t.f & jn) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var s = t; s.parent !== null; ) {
      s = s.parent;
      var r = s.f;
      if (Pn !== null && s === me && (we === null || (we.f & Qe) === 0) && !fr)
        return;
      if ((r & (vn | Rt)) !== 0) {
        if ((r & Ue) === 0)
          return;
        s.f ^= Ue;
      }
    }
    g(this, pt).push(s);
  }
};
Ln = new WeakMap(), nn = new WeakMap(), fn = new WeakMap(), Fn = new WeakMap(), Jn = new WeakMap(), pn = new WeakMap(), zn = new WeakMap(), zt = new WeakMap(), fs = new WeakMap(), pt = new WeakMap(), ps = new WeakMap(), sn = new WeakMap(), Mt = new WeakMap(), Dt = new WeakMap(), Un = new WeakMap(), hn = new WeakMap(), Te = new WeakSet(), _r = function() {
  if (this.is_fork) return !0;
  for (const r of g(this, zt).keys()) {
    for (var t = r, s = !1; t.parent !== null; ) {
      if (g(this, Dt).has(t)) {
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
  if (_e(this, Ln, !0), Zr++ > 1e3 && (Se(this, Te, On).call(this), ui()), !Se(this, Te, _r).call(this)) {
    for (const h of g(this, sn))
      g(this, Mt).delete(h), Fe(h, Ke), this.schedule(h);
    for (const h of g(this, Mt))
      Fe(h, qt), this.schedule(h);
  }
  const t = g(this, pt);
  _e(this, pt, []), this.apply();
  var s = Pn = [], r = [], a = Is = [];
  for (const h of t)
    try {
      Se(this, Te, gr).call(this, h, s, r);
    } catch (T) {
      throw Pa(h), T;
    }
  if (ie = null, a.length > 0) {
    var o = Js.ensure();
    for (const h of a)
      o.schedule(h);
  }
  if (Pn = null, Is = null, Se(this, Te, _r).call(this)) {
    Se(this, Te, Os).call(this, r), Se(this, Te, Os).call(this, s);
    for (const [h, T] of g(this, Dt))
      Aa(h, T);
    a.length > 0 && /** @type {unknown} */
    Se(v = ie, Te, as).call(v);
    return;
  }
  const l = Se(this, Te, Ca).call(this);
  if (l) {
    Se(c = l, Te, Ia).call(c, this);
    return;
  }
  g(this, sn).clear(), g(this, Mt).clear();
  for (const h of g(this, Fn)) h(this);
  g(this, Fn).clear(), is = this, Qr(r), Qr(s), is = null, (p = g(this, fs)) == null || p.resolve();
  var i = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    ie
  );
  if (this.linked && g(this, zn) === 0 && Se(this, Te, On).call(this), g(this, pt).length > 0) {
    i === null && (i = this, Se(this, Te, br).call(this));
    const h = i;
    g(h, pt).push(...g(this, pt).filter((T) => !g(h, pt).includes(T)));
  }
  i !== null && Se(b = i, Te, as).call(b);
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
gr = function(t, s, r) {
  t.f ^= Ue;
  for (var a = t.first; a !== null; ) {
    var o = a.f, l = (o & (Rt | vn)) !== 0, i = l && (o & Ue) !== 0, v = i || (o & it) !== 0 || g(this, Dt).has(a);
    if (!v && a.fn !== null) {
      l ? a.f ^= Ue : (o & Bn) !== 0 ? s.push(a) : ts(a) && ((o & At) !== 0 && g(this, Mt).add(a), Tn(a));
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
  for (var t = g(this, nn); t !== null; ) {
    if (!t.is_fork) {
      for (const [s, [, r]] of this.current)
        if (t.current.has(s) && !r)
          return t;
    }
    t = g(t, nn);
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
          l & (Dn | At) && !this.async_deriveds.has(i) && (g(this, Mt).delete(i), Fe(i, Ke), this.schedule(i));
        }
      }
  };
  for (const a of this.current.keys())
    s(a);
  this.oncommit(() => t.discard()), Se(r = t, Te, On).call(r), ie = this, Se(this, Te, as).call(this);
}, /**
 * @param {Effect[]} effects
 */
Os = function(t) {
  for (var s = 0; s < t.length; s += 1)
    ja(t[s], g(this, sn), g(this, Mt));
}, vi = function() {
  var p;
  Se(this, Te, On).call(this);
  for (let b = er; b !== null; b = g(b, fn)) {
    var t = b.id < this.id, s = [];
    for (const [h, [T, k]] of this.current) {
      if (b.current.has(h)) {
        var r = (
          /** @type {[any, boolean]} */
          b.current.get(h)[0]
        );
        if (t && T !== r)
          b.current.set(h, [T, k]);
        else
          continue;
      }
      s.push(h);
    }
    if (t)
      for (const [h, T] of this.async_deriveds) {
        const k = b.async_deriveds.get(h);
        k && T.promise.then(k.resolve);
      }
    if (g(b, Ln)) {
      var a = [...b.current.keys()].filter((h) => !this.current.has(h));
      if (a.length === 0)
        t && b.discard();
      else if (s.length > 0) {
        if (t)
          for (const h of g(this, Un))
            b.unskip_effect(h, (T) => {
              var k;
              (T.f & (At | Dn)) !== 0 ? b.schedule(T) : Se(k = b, Te, Os).call(k, [T]);
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
            (h.f & ($t | it | Ms)) === 0 && Ar(h, v, l) && ((h.f & (Dn | At)) !== 0 ? (Fe(h, Ke), b.schedule(h)) : g(b, sn).add(h));
        if (g(b, pt).length > 0 && !g(b, hn)) {
          b.apply();
          for (var c of g(b, pt))
            Se(p = b, Te, gr).call(p, c, [], []);
          _e(b, pt, []);
        }
        b.deactivate();
      }
    }
  }
}, br = function() {
  In === null ? er = In = this : (_e(In, fn, this), _e(this, nn, In)), In = this;
}, On = function() {
  var t = g(this, nn), s = g(this, fn);
  t === null ? er = s : _e(t, fn, s), s === null ? In = t : _e(s, nn, t), this.linked = !1;
};
let Sn = Js;
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
    an(e, hr);
  }
}
let It = null;
function Qr(e) {
  var t = e.length;
  if (t !== 0) {
    for (var s = 0; s < t; ) {
      var r = e[s++];
      if ((r.f & ($t | it)) === 0 && ts(r) && (It = /* @__PURE__ */ new Set(), Tn(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Ya(r), (It == null ? void 0 : It.size) > 0)) {
        wn.clear();
        for (const a of It) {
          if ((a.f & ($t | it)) !== 0) continue;
          const o = [a];
          let l = a.parent;
          for (; l !== null; )
            It.has(l) && (It.delete(l), o.push(l)), l = l.parent;
          for (let i = o.length - 1; i >= 0; i--) {
            const v = o[i];
            (v.f & ($t | it)) === 0 && Tn(v);
          }
        }
        It.clear();
      }
    }
    It = null;
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
      ) : (o & (Dn | At)) !== 0 && (o & Ke) === 0 && Ar(a, t, r) && (Fe(a, Ke), Pr(
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
      if (mn.call(t, a))
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
  if (!((e.f & Rt) !== 0 && (e.f & Ue) !== 0)) {
    (e.f & Ke) !== 0 ? t.d.push(e) : (e.f & qt) !== 0 && t.m.push(e), Fe(e, Ue);
    for (var s = e.first; s !== null; )
      Aa(s, t), s = s.next;
  }
}
function Pa(e) {
  Fe(e, Ue);
  for (var t = e.first; t !== null; )
    Pa(t), t = t.next;
}
function di(e) {
  let t = 0, s = $n(0), r;
  return () => {
    Mr() && (n(s), Nn(() => (t === 0 && (r = u(() => e(() => vs(s)))), t += 1, () => {
      ln(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, vs(s));
      });
    })));
  };
}
var fi = Vn | Qn;
function pi(e, t, s, r) {
  new hi(e, t, s, r);
}
var wt, jr, xt, _n, vt, kt, at, ht, Ut, gn, rn, Hn, hs, _s, Ht, zs, ze, _i, gi, bi, mr, As, Ps, yr, wr;
class hi {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, s, r, a) {
    ge(this, ze);
    /** @type {Boundary | null} */
    lt(this, "parent");
    lt(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    lt(this, "transform_error");
    /** @type {TemplateNode} */
    ge(this, wt);
    /** @type {TemplateNode | null} */
    ge(this, jr, null);
    /** @type {BoundaryProps} */
    ge(this, xt);
    /** @type {((anchor: Node) => void)} */
    ge(this, _n);
    /** @type {Effect} */
    ge(this, vt);
    /** @type {Effect | null} */
    ge(this, kt, null);
    /** @type {Effect | null} */
    ge(this, at, null);
    /** @type {Effect | null} */
    ge(this, ht, null);
    /** @type {DocumentFragment | null} */
    ge(this, Ut, null);
    ge(this, gn, 0);
    ge(this, rn, 0);
    ge(this, Hn, !1);
    /** @type {Set<Effect>} */
    ge(this, hs, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    ge(this, _s, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    ge(this, Ht, null);
    ge(this, zs, di(() => (_e(this, Ht, $n(g(this, gn))), () => {
      _e(this, Ht, null);
    })));
    var o;
    _e(this, wt, t), _e(this, xt, s), _e(this, _n, (l) => {
      var i = (
        /** @type {Effect} */
        me
      );
      i.b = this, i.f |= vr, r(l);
    }), this.parent = /** @type {Effect} */
    me.b, this.transform_error = a ?? ((o = this.parent) == null ? void 0 : o.transform_error) ?? ((l) => l), _e(this, vt, Dr(() => {
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
    return !!g(this, xt).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(t, s) {
    Se(this, ze, yr).call(this, t, s), _e(this, gn, g(this, gn) + t), !(!g(this, Ht) || g(this, Hn)) && (_e(this, Hn, !0), ln(() => {
      _e(this, Hn, !1), g(this, Ht) && Wn(g(this, Ht), g(this, gn));
    }));
  }
  get_effect_pending() {
    return g(this, zs).call(this), n(
      /** @type {Source<number>} */
      g(this, Ht)
    );
  }
  /** @param {unknown} error */
  error(t) {
    if (!g(this, xt).onerror && !g(this, xt).failed)
      throw t;
    ie != null && ie.is_fork ? (g(this, kt) && ie.skip_effect(g(this, kt)), g(this, at) && ie.skip_effect(g(this, at)), g(this, ht) && ie.skip_effect(g(this, ht)), ie.on_fork_commit(() => {
      Se(this, ze, wr).call(this, t);
    })) : Se(this, ze, wr).call(this, t);
  }
}
wt = new WeakMap(), jr = new WeakMap(), xt = new WeakMap(), _n = new WeakMap(), vt = new WeakMap(), kt = new WeakMap(), at = new WeakMap(), ht = new WeakMap(), Ut = new WeakMap(), gn = new WeakMap(), rn = new WeakMap(), Hn = new WeakMap(), hs = new WeakMap(), _s = new WeakMap(), Ht = new WeakMap(), zs = new WeakMap(), ze = new WeakSet(), _i = function() {
  try {
    _e(this, kt, Et(() => g(this, _n).call(this, g(this, wt))));
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
gi = function(t) {
  const s = g(this, xt).failed;
  s && _e(this, ht, Et(() => {
    s(
      g(this, wt),
      () => t,
      () => () => {
      }
    );
  }));
}, bi = function() {
  const t = g(this, xt).pending;
  t && (this.is_pending = !0, _e(this, at, Et(() => t(g(this, wt)))), ln(() => {
    var s = _e(this, Ut, document.createDocumentFragment()), r = Yt();
    s.append(r), _e(this, kt, Se(this, ze, Ps).call(this, () => Et(() => g(this, _n).call(this, r)))), g(this, rn) === 0 && (g(this, wt).before(s), _e(this, Ut, null), xn(
      /** @type {Effect} */
      g(this, at),
      () => {
        _e(this, at, null);
      }
    ), Se(this, ze, As).call(
      this,
      /** @type {Batch} */
      ie
    ));
  }));
}, mr = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), _e(this, rn, 0), _e(this, gn, 0), _e(this, kt, Et(() => {
      g(this, _n).call(this, g(this, wt));
    })), g(this, rn) > 0) {
      var t = _e(this, Ut, document.createDocumentFragment());
      Jr(g(this, kt), t);
      const s = (
        /** @type {(anchor: Node) => void} */
        g(this, xt).pending
      );
      _e(this, at, Et(() => s(g(this, wt))));
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
  var s = me, r = we, a = Pe;
  Ct(g(this, vt)), Nt(g(this, vt)), Yn(g(this, vt).ctx);
  try {
    return Sn.ensure(), t();
  } catch (o) {
    return $a(o), null;
  } finally {
    Ct(s), Nt(r), Yn(a);
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
  _e(this, rn, g(this, rn) + t), g(this, rn) === 0 && (Se(this, ze, As).call(this, s), g(this, at) && xn(g(this, at), () => {
    _e(this, at, null);
  }), g(this, Ut) && (g(this, wt).before(g(this, Ut)), _e(this, Ut, null)));
}, /**
 * @param {unknown} error
 */
wr = function(t) {
  g(this, kt) && (dt(g(this, kt)), _e(this, kt, null)), g(this, at) && (dt(g(this, at)), _e(this, at, null)), g(this, ht) && (dt(g(this, ht)), _e(this, ht, null));
  var s = g(this, xt).onerror;
  let r = g(this, xt).failed;
  var a = !1, o = !1;
  const l = () => {
    if (a) {
      ni();
      return;
    }
    a = !0, o && Qo(), g(this, ht) !== null && xn(g(this, ht), () => {
      _e(this, ht, null);
    }), Se(this, ze, Ps).call(this, () => {
      Se(this, ze, mr).call(this);
    });
  }, i = (v) => {
    try {
      o = !0, s == null || s(v, l), o = !1;
    } catch (c) {
      an(c, g(this, vt) && g(this, vt).parent);
    }
    r && _e(this, ht, Se(this, ze, Ps).call(this, () => {
      try {
        return Et(() => {
          var c = (
            /** @type {Effect} */
            me
          );
          c.b = this, c.f |= vr, r(
            g(this, wt),
            () => v,
            () => l
          );
        });
      } catch (c) {
        return an(
          c,
          /** @type {Effect} */
          g(this, vt).parent
        ), null;
      }
    }));
  };
  ln(() => {
    var v;
    try {
      v = this.transform_error(t);
    } catch (c) {
      an(c, g(this, vt) && g(this, vt).parent);
      return;
    }
    v !== null && typeof v == "object" && typeof /** @type {any} */
    v.then == "function" ? v.then(
      i,
      /** @param {unknown} e */
      (c) => an(c, g(this, vt) && g(this, vt).parent)
    ) : i(v);
  });
};
function mi(e, t, s, r) {
  const a = ys() ? Gn : Xe;
  var o = e.filter((h) => !h.settled);
  if (s.length === 0 && o.length === 0) {
    r(t.map(a));
    return;
  }
  var l = (
    /** @type {Effect} */
    me
  ), i = yi(), v = o.length === 1 ? o[0].promise : o.length > 1 ? Promise.all(o.map((h) => h.promise)) : null;
  function c(h) {
    if ((l.f & $t) === 0) {
      i();
      try {
        r(h);
      } catch (T) {
        an(T, l);
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
    Promise.all(s.map((h) => /* @__PURE__ */ wi(h))).then((h) => c([...t.map(a), ...h])).catch((h) => an(h, l)).finally(p);
  }
  v ? v.then(() => {
    i(), b(), Ls();
  }) : b();
}
function yi() {
  var e = (
    /** @type {Effect} */
    me
  ), t = we, s = Pe, r = (
    /** @type {Batch} */
    ie
  );
  return function(o = !0) {
    Ct(e), Nt(t), Yn(s), o && (e.f & $t) === 0 && (r == null || r.activate(), r == null || r.apply());
  };
}
function Ls(e = !0) {
  Ct(null), Nt(null), Yn(null), e && (ie == null || ie.deactivate());
}
function Ra() {
  var e = (
    /** @type {Effect} */
    me
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
function Gn(e) {
  var t = Qe | Ke;
  return me !== null && (me.f |= Qn), {
    ctx: Pe,
    deps: null,
    effects: null,
    equals: ka,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      Ye
    ),
    wv: 0,
    parent: me,
    ac: null
  };
}
const $s = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function wi(e, t, s) {
  let r = (
    /** @type {Effect | null} */
    me
  );
  r === null && Uo();
  var a = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), o = $n(
    /** @type {V} */
    Ye
  ), l = !we, i = /* @__PURE__ */ new Set();
  return Ai(() => {
    var T;
    var v = (
      /** @type {Effect} */
      me
    ), c = ya();
    a = c.promise;
    try {
      Promise.resolve(e()).then(c.resolve, (k) => {
        k !== Vs && c.reject(k);
      }).finally(Ls);
    } catch (k) {
      c.reject(k), Ls();
    }
    var p = (
      /** @type {Batch} */
      ie
    );
    if (l) {
      if ((v.f & jn) !== 0)
        var b = Ra();
      if (
        /** @type {Boundary} */
        r.b.is_rendered()
      )
        (T = p.async_deriveds.get(v)) == null || T.reject($s);
      else
        for (const k of i.values())
          k.reject($s);
      i.add(c), p.async_deriveds.set(v, c);
    }
    const h = (k, C = void 0) => {
      b == null || b(), i.delete(c), C !== $s && (p.activate(), C ? (o.f |= on, Wn(o, C)) : ((o.f & on) !== 0 && (o.f ^= on), Wn(o, k)), p.deactivate());
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
function Kn(e) {
  const t = /* @__PURE__ */ Gn(e);
  return Wa(t), t;
}
// @__NO_SIDE_EFFECTS__
function Xe(e) {
  const t = /* @__PURE__ */ Gn(e);
  return t.equals = Ea, t;
}
function xi(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var s = 0; s < t.length; s += 1)
      dt(
        /** @type {Effect} */
        t[s]
      );
  }
}
function Rr(e) {
  var t, s = me, r = e.parent;
  if (!Gt && r !== null && e.v !== Ye && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & ($t | it)) !== 0)
    return ei(), e.v;
  Ct(r);
  try {
    e.f &= ~En, xi(e), t = eo(e);
  } finally {
    Ct(s);
  }
  return t;
}
function qa(e) {
  var t = Rr(e);
  if (!e.equals(t) && (e.wv = Za(), (!(ie != null && ie.is_fork) || e.deps === null) && (ie !== null ? (ie.capture(e, t, !0), is == null || is.capture(e, t, !0)) : e.v = t, e.deps === null))) {
    Fe(e, Ue);
    return;
  }
  Gt || (Ze !== null ? (Mr() || ie != null && ie.is_fork) && Ze.set(e, t) : Or(e));
}
function ki(e) {
  var t, s;
  if (e.effects !== null)
    for (const r of e.effects)
      (r.teardown || r.ac) && ((t = r.teardown) == null || t.call(r), (s = r.ac) == null || s.abort(Vs), r.fn !== null && (r.teardown = yn), r.ac = null, ds(r, 0), Lr(r));
}
function Ma(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && t.fn !== null && Tn(t);
}
let Fs = /* @__PURE__ */ new Set();
const wn = /* @__PURE__ */ new Map();
let Da = !1;
function $n(e, t) {
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
function Qt(e, t) {
  const s = $n(e);
  return Wa(s), s;
}
// @__NO_SIDE_EFFECTS__
function F(e, t = !1, s = !0) {
  var a;
  const r = $n(e);
  return t || (r.equals = Ea), Zn && s && Pe !== null && Pe.l !== null && ((a = Pe.l).s ?? (a.s = [])).push(r), r;
}
function tn(e, t) {
  return _(
    e,
    u(() => n(e))
  ), t;
}
function _(e, t, s = !1) {
  we !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Pt || (we.f & Ms) !== 0) && ys() && (we.f & (Qe | At | Dn | Ms)) !== 0 && (Tt === null || !mn.call(Tt, e)) && Zo();
  let r = s ? Rn(t) : t;
  return Wn(e, r, Is);
}
function Wn(e, t, s = null) {
  if (!e.equals(t)) {
    wn.set(e, Gt ? t : e.v);
    var r = Sn.ensure();
    if (r.capture(e, t), (e.f & Qe) !== 0) {
      const a = (
        /** @type {Derived} */
        e
      );
      (e.f & Ke) !== 0 && Rr(a), Ze === null && Or(a);
    }
    e.wv = Za(), La(e, Ke, s), ys() && me !== null && (me.f & Ue) !== 0 && (me.f & (Rt | vn)) === 0 && (yt === null ? qi([e]) : yt.push(e)), !r.is_fork && Fs.size > 0 && !Da && Ei();
  }
  return t;
}
function Ei() {
  Da = !1;
  for (const e of Fs) {
    (e.f & Ue) !== 0 && Fe(e, qt);
    let t;
    try {
      t = ts(e);
    } catch {
      t = !0;
    }
    t && Tn(e);
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
      if (!(!a && i === me)) {
        var c = (v & Ke) === 0;
        if (c && Fe(i, t), (v & Ms) !== 0)
          Fs.add(
            /** @type {Effect} */
            i
          );
        else if ((v & Qe) !== 0) {
          var p = (
            /** @type {Derived} */
            i
          );
          Ze == null || Ze.delete(p), (v & En) === 0 && (v & St && (me === null || (me.f & Ds) === 0) && (i.f |= En), La(p, qt, s));
        } else if (c) {
          var b = (
            /** @type {Effect} */
            i
          );
          (v & At) !== 0 && It !== null && It.add(b), s !== null ? s.push(b) : Pr(b);
        }
      }
    }
}
function Rn(e) {
  if (typeof e != "object" || e === null || Vt in e)
    return e;
  const t = Nr(e);
  if (t !== Ro && t !== qo)
    return e;
  var s = /* @__PURE__ */ new Map(), r = Hs(e), a = /* @__PURE__ */ Qt(0), o = kn, l = (i) => {
    if (kn === o)
      return i();
    var v = we, c = kn;
    Nt(null), ra(o);
    var p = i();
    return Nt(v), ra(c), p;
  };
  return r && s.set("length", /* @__PURE__ */ Qt(
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
          var b = /* @__PURE__ */ Qt(c.value);
          return s.set(v, b), b;
        }) : _(p, c.value, !0), !0;
      },
      deleteProperty(i, v) {
        var c = s.get(v);
        if (c === void 0) {
          if (v in i) {
            const p = l(() => /* @__PURE__ */ Qt(Ye));
            s.set(v, p), vs(a);
          }
        } else
          _(c, Ye), vs(a);
        return !0;
      },
      get(i, v, c) {
        var T;
        if (v === Vt)
          return e;
        var p = s.get(v), b = v in i;
        if (p === void 0 && (!b || (T = Mn(i, v)) != null && T.writable) && (p = l(() => {
          var k = Rn(b ? i[v] : Ye), C = /* @__PURE__ */ Qt(k);
          return C;
        }), s.set(v, p)), p !== void 0) {
          var h = n(p);
          return h === Ye ? void 0 : h;
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
          if (b !== void 0 && h !== Ye)
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
        if (v === Vt)
          return !0;
        var c = s.get(v), p = c !== void 0 && c.v !== Ye || Reflect.has(i, v);
        if (c !== void 0 || me !== null && (!p || (h = Mn(i, v)) != null && h.writable)) {
          c === void 0 && (c = l(() => {
            var T = p ? Rn(i[v]) : Ye, k = /* @__PURE__ */ Qt(T);
            return k;
          }), s.set(v, c));
          var b = n(c);
          if (b === Ye)
            return !1;
        }
        return p;
      },
      set(i, v, c, p) {
        var M;
        var b = s.get(v), h = v in i;
        if (r && v === "length")
          for (var T = c; T < /** @type {Source<number>} */
          b.v; T += 1) {
            var k = s.get(T + "");
            k !== void 0 ? _(k, Ye) : T in i && (k = l(() => /* @__PURE__ */ Qt(Ye)), s.set(T + "", k));
          }
        if (b === void 0)
          (!h || (M = Mn(i, v)) != null && M.writable) && (b = l(() => /* @__PURE__ */ Qt(void 0)), _(b, Rn(c)), s.set(v, b));
        else {
          h = b.v !== Ye;
          var C = l(() => Rn(c));
          _(b, C);
        }
        var w = Reflect.getOwnPropertyDescriptor(i, v);
        if (w != null && w.set && w.set.call(p, c), !h) {
          if (r && typeof v == "string") {
            var N = (
              /** @type {Source<number>} */
              s.get("length")
            ), I = Number(v);
            Number.isInteger(I) && I >= N.v && _(N, I + 1);
          }
          vs(a);
        }
        return !0;
      },
      ownKeys(i) {
        n(a);
        var v = Reflect.ownKeys(i).filter((b) => {
          var h = s.get(b);
          return h === void 0 || h.v !== Ye;
        });
        for (var [c, p] of s)
          p.v !== Ye && !(c in i) && v.push(c);
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
    if (e !== null && typeof e == "object" && Vt in e)
      return e[Vt];
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
    Ja = Mn(t, "firstChild").get, za = Mn(t, "nextSibling").get, Xr(e) && (e[ur] = void 0, e[Ns] = null, e[dr] = void 0, e.__e = void 0), Xr(s) && (s[rs] = void 0);
  }
}
function Yt(e = "") {
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
function Ae(e, t = !1) {
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
  var t = we, s = me;
  Nt(null), Ct(null);
  try {
    return e();
  } finally {
    Nt(t), Ct(s);
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
  me === null && (we === null && Yo(), Vo()), Gt && Bo();
}
function Ci(e, t) {
  var s = t.last;
  s === null ? t.last = t.first = e : (s.next = e, e.prev = s, t.last = e);
}
function Jt(e, t) {
  var s = me;
  s !== null && (s.f & it) !== 0 && (e |= it);
  var r = {
    ctx: Pe,
    deps: null,
    nodes: null,
    f: e | Ke | St,
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
    Pn !== null ? Pn.push(r) : Sn.ensure().schedule(r);
  else if (t !== null) {
    try {
      Tn(r);
    } catch (l) {
      throw dt(r), l;
    }
    a.deps === null && a.teardown === null && a.nodes === null && a.first === a.last && // either `null`, or a singular child
    (a.f & Qn) === 0 && (a = a.first, (e & At) !== 0 && (e & Vn) !== 0 && a !== null && (a.f |= Vn));
  }
  if (a !== null && (a.parent = s, s !== null && Ci(a, s), we !== null && (we.f & Qe) !== 0 && (e & vn) === 0)) {
    var o = (
      /** @type {Derived} */
      we
    );
    (o.effects ?? (o.effects = [])).push(a);
  }
  return r;
}
function Mr() {
  return we !== null && !Pt;
}
function Gs(e) {
  const t = Jt(ms, null);
  return Fe(t, Ue), t.teardown = e, t;
}
function xr(e) {
  Ha();
  var t = (
    /** @type {Effect} */
    me.f
  ), s = !we && (t & Rt) !== 0 && (t & jn) === 0;
  if (s) {
    var r = (
      /** @type {ComponentContext} */
      Pe
    );
    (r.e ?? (r.e = [])).push(e);
  } else
    return Ba(e);
}
function Ba(e) {
  return Jt(Bn | xa, e);
}
function Ii(e) {
  return Ha(), Jt(ms | xa, e);
}
function Oi(e) {
  Sn.ensure();
  const t = Jt(vn | Qn, e);
  return (s = {}) => new Promise((r) => {
    s.outro ? xn(t, () => {
      dt(t), r(void 0);
    }) : (dt(t), r(void 0));
  });
}
function Ks(e) {
  return Jt(Bn, e);
}
function He(e, t) {
  var s = (
    /** @type {ComponentContextLegacy} */
    Pe
  ), r = { effect: null, ran: !1, deps: e };
  s.l.$.push(r), r.effect = Nn(() => {
    if (e(), !r.ran) {
      r.ran = !0;
      var a = (
        /** @type {Effect} */
        me
      );
      try {
        Ct(a.parent), u(t);
      } finally {
        Ct(a);
      }
    }
  });
}
function Xt() {
  var e = (
    /** @type {ComponentContextLegacy} */
    Pe
  );
  Nn(() => {
    for (var t of e.l.$) {
      t.deps();
      var s = t.effect;
      (s.f & Ue) !== 0 && s.deps !== null && Fe(s, qt), ts(s) && Tn(s), t.ran = !1;
    }
  });
}
function Ai(e) {
  return Jt(Dn | Qn, e);
}
function Nn(e, t = 0) {
  return Jt(ms | t, e);
}
function D(e, t = [], s = [], r = []) {
  mi(r, t, s, (a) => {
    Jt(ms, () => e(...a.map(n)));
  });
}
function Dr(e, t = 0) {
  var s = Jt(At | t, e);
  return s;
}
function Et(e) {
  return Jt(Rt | Qn, e);
}
function Va(e) {
  var t = e.teardown;
  if (t !== null) {
    const s = Gt, r = we;
    sa(!0), Nt(null);
    try {
      t.call(null);
    } finally {
      sa(s), Nt(r);
    }
  }
}
function Lr(e, t = !1) {
  var s = e.first;
  for (e.first = e.last = null; s !== null; ) {
    const a = s.ac;
    a !== null && Ys(() => {
      a.abort(Vs);
    });
    var r = s.next;
    (s.f & vn) !== 0 ? s.parent = null : dt(s, t), s = r;
  }
}
function Pi(e) {
  for (var t = e.first; t !== null; ) {
    var s = t.next;
    (t.f & Rt) === 0 && dt(t), t = s;
  }
}
function dt(e, t = !0) {
  var s = !1;
  (t || (e.f & Lo) !== 0) && e.nodes !== null && e.nodes.end !== null && (Ri(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), s = !0), Fe(e, cr), Lr(e, t && !s), ds(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const o of r)
      o.stop();
  Va(e), e.f ^= cr, e.f |= $t;
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
function xn(e, t, s = !0) {
  var r = [];
  Ga(e, r, !0);
  var a = () => {
    s && dt(e), t && t();
  }, o = r.length;
  if (o > 0) {
    var l = () => --o || a();
    for (var i of r)
      i.out(l);
  } else
    a();
}
function Ga(e, t, s) {
  if ((e.f & it) === 0) {
    e.f ^= it;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const i of r)
        (i.is_global || s) && t.push(i);
    for (var a = e.first; a !== null; ) {
      var o = a.next;
      if ((a.f & vn) === 0) {
        var l = (a.f & Vn) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (a.f & Rt) !== 0 && (e.f & At) !== 0;
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
  if ((e.f & it) !== 0) {
    e.f ^= it, (e.f & Ue) === 0 && (Fe(e, Ke), Sn.ensure().schedule(e));
    for (var s = e.first; s !== null; ) {
      var r = s.next, a = (s.f & Vn) !== 0 || (s.f & Rt) !== 0;
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
let Rs = !1, Gt = !1;
function sa(e) {
  Gt = e;
}
let we = null, Pt = !1;
function Nt(e) {
  we = e;
}
let me = null;
function Ct(e) {
  me = e;
}
let Tt = null;
function Wa(e) {
  we !== null && (Tt === null ? Tt = [e] : Tt.push(e));
}
let ct = null, ft = 0, yt = null;
function qi(e) {
  yt = e;
}
let Xa = 1, dn = 0, kn = dn;
function ra(e) {
  kn = e;
}
function Za() {
  return ++Xa;
}
function ts(e) {
  var t = e.f;
  if ((t & Ke) !== 0)
    return !0;
  if (t & Qe && (e.f &= ~En), (t & qt) !== 0) {
    for (var s = (
      /** @type {Value[]} */
      e.deps
    ), r = s.length, a = 0; a < r; a++) {
      var o = s[a];
      if (ts(
        /** @type {Derived} */
        o
      ) && qa(
        /** @type {Derived} */
        o
      ), o.wv > e.wv)
        return !0;
    }
    (t & St) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    Ze === null && Fe(e, Ue);
  }
  return !1;
}
function Qa(e, t, s = !0) {
  var r = e.reactions;
  if (r !== null && !(Tt !== null && mn.call(Tt, e)))
    for (var a = 0; a < r.length; a++) {
      var o = r[a];
      (o.f & Qe) !== 0 ? Qa(
        /** @type {Derived} */
        o,
        t,
        !1
      ) : t === o && (s ? Fe(o, Ke) : (o.f & Ue) !== 0 && Fe(o, qt), Pr(
        /** @type {Effect} */
        o
      ));
    }
}
function eo(e) {
  var C;
  var t = ct, s = ft, r = yt, a = we, o = Tt, l = Pe, i = Pt, v = kn, c = e.f;
  ct = /** @type {null | Value[]} */
  null, ft = 0, yt = null, we = (c & (Rt | vn)) === 0 ? e : null, Tt = null, Yn(e.ctx), Pt = !1, kn = ++dn, e.ac !== null && (Ys(() => {
    e.ac.abort(Vs);
  }), e.ac = null);
  try {
    e.f |= Ds;
    var p = (
      /** @type {Function} */
      e.fn
    ), b = p();
    e.f |= jn;
    var h = e.deps, T = ie == null ? void 0 : ie.is_fork;
    if (ct !== null) {
      var k;
      if (T || ds(e, ft), h !== null && ft > 0)
        for (h.length = ft + ct.length, k = 0; k < ct.length; k++)
          h[ft + k] = ct[k];
      else
        e.deps = h = ct;
      if (Mr() && (e.f & St) !== 0)
        for (k = ft; k < h.length; k++)
          ((C = h[k]).reactions ?? (C.reactions = [])).push(e);
    } else !T && h !== null && ft < h.length && (ds(e, ft), h.length = ft);
    if (ys() && yt !== null && !Pt && h !== null && (e.f & (Qe | qt | Ke)) === 0)
      for (k = 0; k < /** @type {Source[]} */
      yt.length; k++)
        Qa(
          yt[k],
          /** @type {Effect} */
          e
        );
    if (a !== null && a !== e) {
      if (dn++, a.deps !== null)
        for (let w = 0; w < s; w += 1)
          a.deps[w].rv = dn;
      if (t !== null)
        for (const w of t)
          w.rv = dn;
      yt !== null && (r === null ? r = yt : r.push(.../** @type {Source[]} */
      yt));
    }
    return (e.f & on) !== 0 && (e.f ^= on), b;
  } catch (w) {
    return $a(w);
  } finally {
    e.f ^= Ds, ct = t, ft = s, yt = r, we = a, Tt = o, Yn(l), Pt = i, kn = v;
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
  (ct === null || !mn.call(ct, t))) {
    var o = (
      /** @type {Derived} */
      t
    );
    (o.f & St) !== 0 && (o.f ^= St, o.f &= ~En), o.v !== Ye && Or(o), ki(o), ds(o, 0);
  }
}
function ds(e, t) {
  var s = e.deps;
  if (s !== null)
    for (var r = t; r < s.length; r++)
      Mi(e, s[r]);
}
function Tn(e) {
  var t = e.f;
  if ((t & $t) === 0) {
    Fe(e, Ue);
    var s = me, r = Rs;
    me = e, Rs = !0;
    try {
      (t & (At | wa)) !== 0 ? Pi(e) : Lr(e), Va(e);
      var a = eo(e);
      e.teardown = typeof a == "function" ? a : null, e.wv = Xa;
      var o;
      ga && xo && (e.f & Ke) !== 0 && e.deps;
    } finally {
      Rs = r, me = s;
    }
  }
}
async function Di() {
  await Promise.resolve(), ci();
}
function n(e) {
  var t = e.f, s = (t & Qe) !== 0;
  if (we !== null && !Pt) {
    var r = me !== null && (me.f & $t) !== 0;
    if (!r && (Tt === null || !mn.call(Tt, e))) {
      var a = we.deps;
      if ((we.f & Ds) !== 0)
        e.rv < dn && (e.rv = dn, ct === null && a !== null && a[ft] === e ? ft++ : ct === null ? ct = [e] : ct.push(e));
      else {
        we.deps ?? (we.deps = []), mn.call(we.deps, e) || we.deps.push(e);
        var o = e.reactions;
        o === null ? e.reactions = [we] : mn.call(o, we) || o.push(we);
      }
    }
  }
  if (Gt && wn.has(e))
    return wn.get(e);
  if (s) {
    var l = (
      /** @type {Derived} */
      e
    );
    if (Gt) {
      var i = l.v;
      return ((l.f & Ue) === 0 && l.reactions !== null || no(l)) && (i = Rr(l)), wn.set(l, i), i;
    }
    var v = (l.f & St) === 0 && !Pt && we !== null && (Rs || (we.f & St) !== 0), c = (l.f & jn) === 0;
    ts(l) && (v && (l.f |= St), qa(l)), v && !c && (Ma(l), to(l));
  }
  if (Ze != null && Ze.has(e))
    return Ze.get(e);
  if ((e.f & on) !== 0)
    throw e.v;
  return e.v;
}
function to(e) {
  if (e.f |= St, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ?? (t.reactions = [])).push(e), (t.f & Qe) !== 0 && (t.f & St) === 0 && (Ma(
        /** @type {Derived} */
        t
      ), to(
        /** @type {Derived} */
        t
      ));
}
function no(e) {
  if (e.v === Ye) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (wn.has(t) || (t.f & Qe) !== 0 && no(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function u(e) {
  var t = Pt;
  try {
    return Pt = !0, e();
  } finally {
    Pt = t;
  }
}
function Ne(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (Vt in e)
      kr(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const s = e[t];
        typeof s == "object" && s && Vt in s && kr(s);
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
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? ln(() => {
    t.addEventListener(e, a, r);
  }) : t.addEventListener(e, a, r), a;
}
function K(e, t, s, r, a) {
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
  var w, N;
  var t = this, s = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, a = ((w = e.composedPath) == null ? void 0 : w.call(e)) || [], o = (
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
    var p = we, b = me;
    Nt(null), Ct(null);
    try {
      for (var h, T = []; o !== null; ) {
        var k = o.assignedSlot || o.parentNode || /** @type {any} */
        o.host || null;
        try {
          var C = (N = o[Ts]) == null ? void 0 : N[r];
          C != null && (!/** @type {any} */
          o.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === o) && C.call(o, e);
        } catch (I) {
          h ? T.push(I) : h = I;
        }
        if (e.cancelBubble || k === t || k === null)
          break;
        o = k;
      }
      if (h) {
        for (let I of T)
          queueMicrotask(() => {
            throw I;
          });
        throw h;
      }
    } finally {
      e[Ts] = t, delete e.currentTarget, Nt(p), Ct(b);
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
function Xn(e, t) {
  var s = (
    /** @type {Effect} */
    me
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
      Xn(i, v);
    } else
      Xn(l, l);
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
      Xn(p, b);
    } else
      Xn(c, c);
    return c;
  };
}
// @__NO_SIDE_EFFECTS__
function xs(e, t) {
  return /* @__PURE__ */ zi(e, t, "svg");
}
function Ui(e = "") {
  {
    var t = Yt(e + "");
    return Xn(t, t), t;
  }
}
function Kt() {
  var e = document.createDocumentFragment(), t = document.createComment(""), s = Yt();
  return e.append(t, s), Xn(t, s), e;
}
function y(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
const Hi = ["touchstart", "touchmove"];
function Bi(e) {
  return Hi.includes(e);
}
function q(e, t) {
  var s = t == null ? "" : typeof t == "object" ? `${t}` : t;
  s !== /** @type {any} */
  (e[rs] ?? (e[rs] = e.nodeValue)) && (e[rs] = s, e.nodeValue = `${s}`);
}
function Vi(e, t) {
  return Yi(e, t);
}
const js = /* @__PURE__ */ new Map();
function Yi(e, { target: t, anchor: s, props: r = {}, events: a, context: o, intro: l = !0, transformError: i }) {
  $i();
  var v = void 0, c = Oi(() => {
    var p = s ?? t.appendChild(Yt());
    pi(
      /** @type {TemplateNode} */
      p,
      {
        pending: () => {
        }
      },
      (T) => {
        et({});
        var k = (
          /** @type {ComponentContext} */
          Pe
        );
        o && (k.c = o), a && (r.$$events = a), v = e(T, r) || {}, tt();
      },
      i
    );
    var b = /* @__PURE__ */ new Set(), h = (T) => {
      for (var k = 0; k < T.length; k++) {
        var C = T[k];
        if (!b.has(C)) {
          b.add(C);
          var w = Bi(C);
          for (const M of [t, document]) {
            var N = js.get(M);
            N === void 0 && (N = /* @__PURE__ */ new Map(), js.set(M, N));
            var I = N.get(C);
            I === void 0 ? (M.addEventListener(C, Er, { passive: w }), N.set(C, 1)) : N.set(C, I + 1);
          }
        }
      }
    };
    return h(Bs(Li)), aa.add(h), () => {
      var w;
      for (var T of b)
        for (const N of [t, document]) {
          var k = (
            /** @type {Map<string, number>} */
            js.get(N)
          ), C = (
            /** @type {number} */
            k.get(T)
          );
          --C == 0 ? (N.removeEventListener(T, Er), k.delete(T), k.size === 0 && js.delete(N)) : k.set(T, C);
        }
      aa.delete(h), p !== s && ((w = p.parentNode) == null || w.removeChild(p));
    };
  });
  return Gi.set(v, c), v;
}
let Gi = /* @__PURE__ */ new WeakMap();
var Ot, Lt, _t, bn, gs, bs, Us;
class Ki {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, s = !0) {
    /** @type {TemplateNode} */
    lt(this, "anchor");
    /** @type {Map<Batch, Key>} */
    ge(this, Ot, /* @__PURE__ */ new Map());
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
    ge(this, Lt, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    ge(this, _t, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    ge(this, bn, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    ge(this, gs, !0);
    /**
     * @param {Batch} batch
     */
    ge(this, bs, (t) => {
      if (g(this, Ot).has(t)) {
        var s = (
          /** @type {Key} */
          g(this, Ot).get(t)
        ), r = g(this, Lt).get(s);
        if (r)
          Fr(r), g(this, bn).delete(s);
        else {
          var a = g(this, _t).get(s);
          a && (g(this, Lt).set(s, a.effect), g(this, _t).delete(s), a.fragment.lastChild.remove(), this.anchor.before(a.fragment), r = a.effect);
        }
        for (const [o, l] of g(this, Ot)) {
          if (g(this, Ot).delete(o), o === t)
            break;
          const i = g(this, _t).get(l);
          i && (dt(i.effect), g(this, _t).delete(l));
        }
        for (const [o, l] of g(this, Lt)) {
          if (o === s || g(this, bn).has(o)) continue;
          const i = () => {
            if (Array.from(g(this, Ot).values()).includes(o)) {
              var c = document.createDocumentFragment();
              Jr(l, c), c.append(Yt()), g(this, _t).set(o, { effect: l, fragment: c });
            } else
              dt(l);
            g(this, bn).delete(o), g(this, Lt).delete(o);
          };
          g(this, gs) || !r ? (g(this, bn).add(o), xn(l, i, !1)) : i();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    ge(this, Us, (t) => {
      g(this, Ot).delete(t);
      const s = Array.from(g(this, Ot).values());
      for (const [r, a] of g(this, _t))
        s.includes(r) || (dt(a.effect), g(this, _t).delete(r));
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
    if (s && !g(this, Lt).has(t) && !g(this, _t).has(t))
      if (a) {
        var o = document.createDocumentFragment(), l = Yt();
        o.append(l), g(this, _t).set(t, {
          effect: Et(() => s(l)),
          fragment: o
        });
      } else
        g(this, Lt).set(
          t,
          Et(() => s(this.anchor))
        );
    if (g(this, Ot).set(r, t), a) {
      for (const [i, v] of g(this, Lt))
        i === t ? r.unskip_effect(v) : r.skip_effect(v);
      for (const [i, v] of g(this, _t))
        i === t ? r.unskip_effect(v.effect) : r.skip_effect(v.effect);
      r.oncommit(g(this, bs)), r.ondiscard(g(this, Us));
    } else
      g(this, bs).call(this, r);
  }
}
Ot = new WeakMap(), Lt = new WeakMap(), _t = new WeakMap(), bn = new WeakMap(), gs = new WeakMap(), bs = new WeakMap(), Us = new WeakMap();
function ks(e) {
  Pe === null && Cr(), Zn && Pe.l !== null ? Zi(Pe).m.push(e) : xr(() => {
    const t = u(e);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
function Wi(e) {
  Pe === null && Cr(), ks(() => () => u(e));
}
function Xi(e, t, { bubbles: s = !1, cancelable: r = !1 } = {}) {
  return new CustomEvent(e, { detail: t, bubbles: s, cancelable: r });
}
function ro() {
  const e = Pe;
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
  var r = new Ki(e), a = s ? Vn : 0;
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
function Re(e, t) {
  return t;
}
function Qi(e, t, s) {
  for (var r = [], a = t.length, o, l = t.length, i = 0; i < a; i++) {
    let b = t[i];
    xn(
      b,
      () => {
        if (o) {
          if (o.pending.delete(b), o.done.add(b), o.pending.size === 0) {
            var h = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            Sr(e, Bs(o.done)), h.delete(o), h.size === 0 && (e.outrogroups = null);
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
      o.f |= Ft;
      const l = document.createDocumentFragment();
      Jr(o, l);
    } else
      dt(t[a], s);
  }
}
var ia;
function qe(e, t, s, r, a, o = null) {
  var l = e, i = /* @__PURE__ */ new Map(), v = (t & pa) !== 0;
  if (v) {
    var c = (
      /** @type {Element} */
      e
    );
    l = c.appendChild(Yt());
  }
  var p = null, b = /* @__PURE__ */ Xe(() => {
    var M = s();
    return Hs(M) ? M : M == null ? [] : Bs(M);
  }), h, T = /* @__PURE__ */ new Map(), k = !0;
  function C(M) {
    (I.effect.f & $t) === 0 && (I.pending.delete(M), I.fallback = p, el(I, h, l, t, r), p !== null && (h.length === 0 ? (p.f & Ft) === 0 ? Fr(p) : (p.f ^= Ft, os(p, null, l)) : xn(p, () => {
      p = null;
    })));
  }
  function w(M) {
    I.pending.delete(M);
  }
  var N = Dr(() => {
    h = /** @type {V[]} */
    n(b);
    for (var M = h.length, P = /* @__PURE__ */ new Set(), H = (
      /** @type {Batch} */
      ie
    ), te = Ua(), Q = 0; Q < M; Q += 1) {
      var ue = h[Q], Y = r(ue, Q), J = k ? null : i.get(Y);
      J ? (J.v && Wn(J.v, ue), J.i && Wn(J.i, Q), te && H.unskip_effect(J.e)) : (J = tl(
        i,
        k ? l : ia ?? (ia = Yt()),
        ue,
        Y,
        Q,
        a,
        t,
        s
      ), k || (J.e.f |= Ft), i.set(Y, J)), P.add(Y);
    }
    if (M === 0 && o && !p && (k ? p = Et(() => o(l)) : (p = Et(() => o(ia ?? (ia = Yt()))), p.f |= Ft)), M > P.size && Ho(), !k)
      if (T.set(H, P), te) {
        for (const [m, E] of i)
          P.has(m) || H.skip_effect(E.e);
        H.oncommit(C), H.ondiscard(w);
      } else
        C(H);
    n(b);
  }), I = { effect: N, items: i, pending: T, outrogroups: null, fallback: p };
  k = !1;
}
function ss(e) {
  for (; e !== null && (e.f & Rt) === 0; )
    e = e.next;
  return e;
}
function el(e, t, s, r, a) {
  var J, m, E, x, A, B, $, X, fe;
  var o = (r & $o) !== 0, l = t.length, i = e.items, v = ss(e.effect.first), c, p = null, b, h = [], T = [], k, C, w, N;
  if (o)
    for (N = 0; N < l; N += 1)
      k = t[N], C = a(k, N), w = /** @type {EachItem} */
      i.get(C).e, (w.f & Ft) === 0 && ((m = (J = w.nodes) == null ? void 0 : J.a) == null || m.measure(), (b ?? (b = /* @__PURE__ */ new Set())).add(w));
  for (N = 0; N < l; N += 1) {
    if (k = t[N], C = a(k, N), w = /** @type {EachItem} */
    i.get(C).e, e.outrogroups !== null)
      for (const L of e.outrogroups)
        L.pending.delete(w), L.done.delete(w);
    if ((w.f & it) !== 0 && (Fr(w), o && ((x = (E = w.nodes) == null ? void 0 : E.a) == null || x.unfix(), (b ?? (b = /* @__PURE__ */ new Set())).delete(w))), (w.f & Ft) !== 0)
      if (w.f ^= Ft, w === v)
        os(w, null, s);
      else {
        var I = p ? p.next : v;
        w === e.effect.last && (e.effect.last = w.prev), w.prev && (w.prev.next = w.next), w.next && (w.next.prev = w.prev), en(e, p, w), en(e, w, I), os(w, I, s), p = w, h = [], T = [], v = ss(p.next);
        continue;
      }
    if (w !== v) {
      if (c !== void 0 && c.has(w)) {
        if (h.length < T.length) {
          var M = T[0], P;
          p = M.prev;
          var H = h[0], te = h[h.length - 1];
          for (P = 0; P < h.length; P += 1)
            os(h[P], M, s);
          for (P = 0; P < T.length; P += 1)
            c.delete(T[P]);
          en(e, H.prev, te.next), en(e, p, H), en(e, te, M), v = M, p = te, N -= 1, h = [], T = [];
        } else
          c.delete(w), os(w, v, s), en(e, w.prev, w.next), en(e, w, p === null ? e.effect.first : p.next), en(e, p, w), p = w;
        continue;
      }
      for (h = [], T = []; v !== null && v !== w; )
        (c ?? (c = /* @__PURE__ */ new Set())).add(v), T.push(v), v = ss(v.next);
      if (v === null)
        continue;
    }
    (w.f & Ft) === 0 && h.push(w), p = w, v = ss(w.next);
  }
  if (e.outrogroups !== null) {
    for (const L of e.outrogroups)
      L.pending.size === 0 && (Sr(e, Bs(L.done)), (A = e.outrogroups) == null || A.delete(L));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (v !== null || c !== void 0) {
    var Q = [];
    if (c !== void 0)
      for (w of c)
        (w.f & it) === 0 && Q.push(w);
    for (; v !== null; )
      (v.f & it) === 0 && v !== e.fallback && Q.push(v), v = ss(v.next);
    var ue = Q.length;
    if (ue > 0) {
      var Y = (r & pa) !== 0 && l === 0 ? s : null;
      if (o) {
        for (N = 0; N < ue; N += 1)
          ($ = (B = Q[N].nodes) == null ? void 0 : B.a) == null || $.measure();
        for (N = 0; N < ue; N += 1)
          (fe = (X = Q[N].nodes) == null ? void 0 : X.a) == null || fe.fix();
      }
      Qi(e, Q, Y);
    }
  }
  o && ln(() => {
    var L, U;
    if (b !== void 0)
      for (w of b)
        (U = (L = w.nodes) == null ? void 0 : L.a) == null || U.apply();
  });
}
function tl(e, t, s, r, a, o, l, i) {
  var v = (l & Eo) !== 0 ? (l & To) === 0 ? /* @__PURE__ */ F(s, !1, !1) : $n(s) : null, c = (l & So) !== 0 ? $n(a) : null;
  return {
    v,
    i: c,
    e: Et(() => (o(t, v ?? s, c ?? a, i), () => {
      e.delete(r);
    }))
  };
}
function os(e, t, s) {
  if (e.nodes)
    for (var r = e.nodes.start, a = e.nodes.end, o = t && (t.f & Ft) === 0 ? (
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
function en(e, t, s) {
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
      Nn(() => {
        var l = s();
        Ne(l), a && Ir(o, l) && (o = l, r.update(l));
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
function jt(e, t, s, r, a, o) {
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
function qn(e, t) {
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
function Me(e, t, s, r) {
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
function ut(e, t, s = t) {
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
  u(t) == null && e.value && (s(sr(e) ? rr(e.value) : e.value), ie !== null && r.add(ie)), Nn(() => {
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
  u(t) == null && s(e.checked), Nn(() => {
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
  return e === t || (e == null ? void 0 : e[Vt]) === t;
}
function lo(e = {}, t, s, r) {
  var a = (
    /** @type {ComponentContext} */
    Pe.r
  ), o = (
    /** @type {Effect} */
    me
  );
  return Ks(() => {
    var l, i;
    return Nn(() => {
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
    Pe
  ), s = t.l.u;
  if (!s) return;
  let r = () => Ne(t.s);
  if (e) {
    let a = 0, o = (
      /** @type {Record<string, any>} */
      {}
    );
    const l = /* @__PURE__ */ Gn(() => {
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
function Ge(e, t, s, r) {
  var P;
  var a = !Zn || (s & No) !== 0, o = (s & Io) !== 0, l = (s & Oo) !== 0, i = (
    /** @type {V} */
    r
  ), v = !0, c = (
    /** @type {Derived<V> | undefined} */
    void 0
  ), p = () => l && a ? (c ?? (c = /* @__PURE__ */ Gn(
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
    var h = Vt in e || Fo in e;
    b = ((P = Mn(e, t)) == null ? void 0 : P.set) ?? (h && t in e ? (H) => e[t] = H : void 0);
  }
  var T, k = !1;
  o ? [T, k] = ii(() => (
    /** @type {V} */
    e[t]
  )) : T = /** @type {V} */
  e[t], T === void 0 && r !== void 0 && (T = p(), b && (a && Ko(), b(T)));
  var C;
  if (a ? C = () => {
    var H = (
      /** @type {V} */
      e[t]
    );
    return H === void 0 ? p() : (v = !0, H);
  } : C = () => {
    var H = (
      /** @type {V} */
      e[t]
    );
    return H !== void 0 && (i = /** @type {V} */
    void 0), H === void 0 ? i : H;
  }, a && (s & Co) === 0)
    return C;
  if (b) {
    var w = e.$$legacy;
    return (
      /** @type {() => V} */
      (function(H, te) {
        return arguments.length > 0 ? ((!a || !te || w || k) && b(te ? C() : H), H) : C();
      })
    );
  }
  var N = !1, I = ((s & jo) !== 0 ? Gn : Xe)(() => (N = !1, C()));
  o && n(I);
  var M = (
    /** @type {Effect} */
    me
  );
  return (
    /** @type {() => V} */
    (function(H, te) {
      if (arguments.length > 0) {
        const Q = te ? n(I) : a && o ? Rn(H) : H;
        return _(I, Q), N = !0, i !== void 0 && (i = Q), H;
      }
      return Gt && N || (M.f & $t) !== 0 ? I.v : n(I);
    })
  );
}
const ot = es({ nodes: {}, edges: [], toolEdges: [] }), cn = es(null), qs = es(null), An = es({
  triggerType: "rest",
  description: "",
  cronExpression: "",
  webhookUrl: ""
});
function cl(e) {
  ot.update((t) => ({ ...t, edges: [...t.edges, e] }));
}
var ul = /* @__PURE__ */ xs('<line stroke-width="2" marker-end="url(#arrow)"></line>'), dl = /* @__PURE__ */ xs('<line stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.8"></line>'), fl = /* @__PURE__ */ xs('<circle cx="148" cy="8" r="8" fill="#f59e0b"></circle><text x="148" y="12" fill="#000" font-size="8" font-family="monospace" text-anchor="middle"> </text>', 1), pl = /* @__PURE__ */ xs('<g style="cursor:pointer" role="button" tabindex="0"><rect width="160" height="40" rx="6"></rect><text x="12" y="14" fill="#94a3b8" font-size="9" font-family="monospace"> </text><text x="12" y="29" fill="#e2e8f0" font-size="12" font-family="system-ui"> </text><!><circle cx="160" cy="20" r="5" class="port port-out"></circle><circle cx="0" cy="20" r="5" class="port port-in"></circle></g>'), hl = /* @__PURE__ */ xs('<line stroke="#7c6af7" stroke-width="1.5" stroke-dasharray="6,3" pointer-events="none"></line>'), _l = /* @__PURE__ */ S('<input class="picker-input svelte-1lehbkp" type="text" placeholder="JSONata expression"/> <button class="picker-btn picker-add svelte-1lehbkp">Add</button>', 1), gl = /* @__PURE__ */ S('<div class="edge-picker svelte-1lehbkp"><button class="picker-btn svelte-1lehbkp">Unconditional</button> <button class="picker-btn svelte-1lehbkp">Fallback</button> <button class="picker-btn svelte-1lehbkp">Conditional</button> <!> <button class="picker-btn picker-cancel svelte-1lehbkp">Cancel</button></div>'), bl = /* @__PURE__ */ S('<div class="empty-hint svelte-1lehbkp">Drag nodes from the palette to build your agent graph</div>'), ml = /* @__PURE__ */ S('<div class="canvas-wrap svelte-1lehbkp" role="presentation"><svg style="width:100%;height:100%"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#7c6af7"></path></marker></defs><!><!><!><!></svg> <!> <!></div>');
function yl(e, t) {
  et(t, !1);
  const s = () => nt(ot, "$graph", a), r = () => nt(cn, "$selectedNode", a), [a, o] = Wt(), l = /* @__PURE__ */ F();
  Ge(t, "agentId", 8);
  const i = /* @__PURE__ */ new Set(["core:tool", "core:mcp-client"]), v = /* @__PURE__ */ new Set(["core:tool-call", "core:react"]);
  let c = /* @__PURE__ */ F([]), p = /* @__PURE__ */ F([]), b = /* @__PURE__ */ F([]), h = null, T = { x: 0, y: 0 }, k = /* @__PURE__ */ F(), C = /* @__PURE__ */ F({ x: 0, y: 0, w: 1e3, h: 600 }), w = !1, N = { mx: 0, my: 0, vbx: 0, vby: 0 }, I = /* @__PURE__ */ F(null), M = /* @__PURE__ */ F({ x: 0, y: 0 }), P = /* @__PURE__ */ F(null), H = /* @__PURE__ */ F({ x: 0, y: 0 }), te = /* @__PURE__ */ F(""), Q = /* @__PURE__ */ F(!1);
  function ue(R) {
    cn.set(R);
  }
  function Y(R) {
    const j = s().nodes[R];
    return (j == null ? void 0 : j.position) ?? { x: 100, y: 100 };
  }
  function J(R, j) {
    const W = n(k).createSVGPoint();
    W.x = R, W.y = j;
    const ne = W.matrixTransform(n(k).getScreenCTM().inverse());
    return { x: ne.x, y: ne.y };
  }
  function m(R, j) {
    return R.addEventListener("wheel", j, { passive: !1 }), {
      destroy() {
        R.removeEventListener("wheel", j);
      }
    };
  }
  function E(R) {
    R.preventDefault();
    const j = R.deltaY > 0 ? 1.1 : 0.9, W = n(k).getBoundingClientRect(), ne = (R.clientX - W.left) / W.width * n(C).w + n(C).x, be = (R.clientY - W.top) / W.height * n(C).h + n(C).y;
    _(C, {
      x: ne - (ne - n(C).x) * j,
      y: be - (be - n(C).y) * j,
      w: n(C).w * j,
      h: n(C).h * j
    });
  }
  function x(R) {
    const j = R.target;
    j.closest("g") || j.tagName === "circle" || (w = !0, N = {
      mx: R.clientX,
      my: R.clientY,
      vbx: n(C).x,
      vby: n(C).y
    });
  }
  function A(R, j) {
    const W = J(R.clientX, R.clientY), ne = j.position ?? { x: 100, y: 100 };
    h = j, T = { x: W.x - ne.x, y: W.y - ne.y };
  }
  function B(R, j) {
    const W = J(R.clientX, R.clientY);
    _(I, { fromNodeId: j, x: W.x, y: W.y }), _(M, W);
  }
  function $(R) {
    if (n(I) && n(I).fromNodeId !== R) {
      const j = n(k).getBoundingClientRect();
      _(H, {
        x: (n(M).x - n(C).x) / n(C).w * j.width,
        y: (n(M).y - n(C).y) / n(C).h * j.height
      }), _(P, { from: n(I).fromNodeId, to: R });
    }
    _(I, null);
  }
  function X(R) {
    if (w) {
      const j = n(C).w / n(k).clientWidth, W = n(C).h / n(k).clientHeight;
      _(C, {
        ...n(C),
        x: N.vbx - (R.clientX - N.mx) * j,
        y: N.vby - (R.clientY - N.my) * W
      });
    }
    if (h) {
      const j = J(R.clientX, R.clientY), W = h.id;
      ot.update((ne) => ({
        ...ne,
        nodes: {
          ...ne.nodes,
          [W]: {
            ...ne.nodes[W],
            position: { x: j.x - T.x, y: j.y - T.y }
          }
        }
      }));
    }
    n(I) && _(M, J(R.clientX, R.clientY));
  }
  function fe() {
    w = !1, h = null, _(I, null);
  }
  function L(R, j) {
    if (!n(P)) return;
    const W = {
      id: `e-${Date.now()}`,
      from: n(P).from,
      to: n(P).to,
      type: R,
      ...j ? { condition: j } : {}
    };
    cl(W), _(P, null), _(Q, !1), _(te, "");
  }
  He(() => s(), () => {
    _(c, Object.values(s().nodes)), _(p, s().edges), _(b, s().toolEdges ?? []);
  }), He(() => n(b), () => {
    _(l, n(b).reduce(
      (R, j) => (R[j.to] = (R[j.to] ?? 0) + 1, R),
      {}
    ));
  }), Xt(), st();
  var U = ml(), O = d(U), G = f(d(O));
  qe(G, 1, () => n(p), Re, (R, j) => {
    const W = /* @__PURE__ */ Xe(() => (n(j), u(() => Y(n(j).from)))), ne = /* @__PURE__ */ Xe(() => (n(j), u(() => Y(n(j).to))));
    var be = ul();
    D(() => {
      Me(be, "x1", (Ne(n(W)), u(() => n(W).x + 160))), Me(be, "y1", (Ne(n(W)), u(() => n(W).y + 20))), Me(be, "x2", (Ne(n(ne)), u(() => n(ne).x))), Me(be, "y2", (Ne(n(ne)), u(() => n(ne).y + 20))), Me(be, "stroke", (n(j), u(() => n(j).type === "fallback" ? "#94a3b8" : "#7c6af7"))), Me(be, "stroke-dasharray", (n(j), u(() => n(j).type === "fallback" ? "4" : "0")));
    }), y(R, be);
  });
  var ye = f(G);
  qe(ye, 1, () => n(b), Re, (R, j) => {
    const W = /* @__PURE__ */ Xe(() => (n(j), u(() => Y(n(j).from)))), ne = /* @__PURE__ */ Xe(() => (n(j), u(() => Y(n(j).to))));
    var be = dl();
    D(() => {
      Me(be, "x1", (Ne(n(W)), u(() => n(W).x + 160))), Me(be, "y1", (Ne(n(W)), u(() => n(W).y + 20))), Me(be, "x2", (Ne(n(ne)), u(() => n(ne).x))), Me(be, "y2", (Ne(n(ne)), u(() => n(ne).y + 20)));
    }), y(R, be);
  });
  var oe = f(ye);
  qe(oe, 1, () => n(c), Re, (R, j) => {
    const W = /* @__PURE__ */ Xe(() => (n(j), u(() => n(j).position ?? { x: 100, y: 100 }))), ne = /* @__PURE__ */ Xe(() => (n(j), u(() => i.has(n(j).type)))), be = /* @__PURE__ */ Xe(() => (n(j), u(() => v.has(n(j).type)))), Ie = /* @__PURE__ */ Xe(() => (r(), n(j), u(() => {
      var Z;
      return ((Z = r()) == null ? void 0 : Z.id) === n(j).id;
    }))), De = /* @__PURE__ */ Xe(() => (n(l), n(j), u(() => n(l)[n(j).id] ?? 0)));
    var xe = pl(), se = d(xe), ve = f(se), ae = d(ve), pe = f(ve), Oe = d(pe), We = f(pe);
    {
      var Be = (Z) => {
        var ce = fl(), je = f(Ae(ce)), Je = d(je);
        D(() => q(Je, n(De))), y(Z, ce);
      };
      V(We, (Z) => {
        n(be) && n(De) > 0 && Z(Be);
      });
    }
    var Ve = f(We), z = f(Ve);
    D(() => {
      Me(xe, "transform", `translate(${Ne(n(W)), u(() => n(W).x) ?? ""},${Ne(n(W)), u(() => n(W).y) ?? ""})`), Me(se, "fill", n(Ie) ? n(ne) ? "#2d1f00" : "#312e7a" : n(ne) ? "#1e1600" : "#1e2035"), Me(se, "stroke", n(Ie) ? n(ne) ? "#f59e0b" : "#7c6af7" : n(ne) ? "#b45309" : "#2d3148"), Me(se, "stroke-width", n(ne) ? "2" : "1.5"), q(ae, (n(j), u(() => n(j).type))), q(Oe, (n(j), u(() => n(j).label ?? n(j).id)));
    }), K("mousedown", Ve, or((Z) => B(Z, n(j).id))), K("mouseup", z, or(() => $(n(j).id))), K("click", xe, () => ue(n(j))), K("keydown", xe, (Z) => Z.key === "Enter" && ue(n(j))), K("mousedown", xe, or((Z) => A(Z, n(j)))), y(R, xe);
  });
  var he = f(oe);
  {
    var le = (R) => {
      var j = hl();
      D(() => {
        Me(j, "x1", (n(I), u(() => n(I).x))), Me(j, "y1", (n(I), u(() => n(I).y))), Me(j, "x2", (n(M), u(() => n(M).x))), Me(j, "y2", (n(M), u(() => n(M).y)));
      }), y(R, j);
    };
    V(he, (R) => {
      n(I) && R(le);
    });
  }
  lo(O, (R) => _(k, R), () => n(k)), nl(O, (R, j) => m == null ? void 0 : m(R, j), () => E), Ks(() => K("mousedown", O, x));
  var re = f(O, 2);
  {
    var ee = (R) => {
      var j = gl(), W = d(j), ne = f(W, 2), be = f(ne, 2), Ie = f(be, 2);
      {
        var De = (se) => {
          var ve = _l(), ae = Ae(ve), pe = f(ae, 2);
          ut(ae, () => n(te), (Oe) => _(te, Oe)), K("click", pe, () => L("conditional", n(te))), y(se, ve);
        };
        V(Ie, (se) => {
          n(Q) && se(De);
        });
      }
      var xe = f(Ie, 2);
      D(() => ao(j, `left:${n(H), u(() => n(H).x) ?? ""}px;top:${n(H), u(() => n(H).y) ?? ""}px`)), K("click", W, () => L("unconditional")), K("click", ne, () => L("fallback")), K("click", be, () => {
        _(Q, !n(Q));
      }), K("click", xe, () => {
        _(P, null), _(Q, !1);
      }), y(R, j);
    };
    V(re, (R) => {
      n(P) && R(ee);
    });
  }
  var de = f(re, 2);
  {
    var $e = (R) => {
      var j = bl();
      y(R, j);
    };
    V(de, (R) => {
      n(c), u(() => n(c).length === 0) && R($e);
    });
  }
  D(() => Me(O, "viewBox", `${n(C), u(() => n(C).x) ?? ""} ${n(C), u(() => n(C).y) ?? ""} ${n(C), u(() => n(C).w) ?? ""} ${n(C), u(() => n(C).h) ?? ""}`)), K("mousemove", U, X), K("mouseup", U, fe), K("mouseleave", U, fe), y(e, U), tt(), o();
}
const us = es([]);
var wl = /* @__PURE__ */ S('<button class="palette-item svelte-142uvrg"><span class="node-name svelte-142uvrg"> </span> <span class="node-type svelte-142uvrg"> </span></button>'), xl = /* @__PURE__ */ S('<a class="marketplace-link svelte-142uvrg">Browse Marketplace →</a>'), kl = /* @__PURE__ */ S('<div class="category-header svelte-142uvrg"> </div> <!> <!>', 1), El = /* @__PURE__ */ S('<div class="palette svelte-142uvrg"><div class="palette-header svelte-142uvrg">Nodes</div> <!></div>');
function Sl(e, t) {
  et(t, !1);
  const s = () => nt(us, "$nodeTypes", r), [r, a] = Wt(), o = /* @__PURE__ */ F(), l = 3e4;
  let i = null, v = "", c = /* @__PURE__ */ F(!1);
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
  function b(w) {
    const N = /* @__PURE__ */ new Map();
    for (const I of w) {
      const M = I.meta.category ?? "other";
      N.has(M) || N.set(M, []), N.get(M).push(I);
    }
    return Array.from(N.entries()).map(([I, M]) => ({
      category: I,
      label: p[I] ?? I,
      items: M
    }));
  }
  async function h() {
    try {
      const w = await fetch("/api/nodes");
      if (!w.ok) return;
      const N = await w.json(), I = N.map((M) => M.type).sort().join(",");
      I !== v && (v = I, us.set(N));
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
      const w = await fetch("/api/system/config");
      if (w.ok) {
        const N = await w.json();
        _(c, N.marketplaceEnabled === !0);
      }
    } catch {
    }
  }), Wi(() => {
    i && clearInterval(i);
  });
  function T(w, N) {
    const I = `${w.replace(/:/g, "_")}_${Date.now()}`;
    ot.update((M) => ({
      ...M,
      nodes: {
        ...M.nodes,
        [I]: {
          id: I,
          type: w,
          label: N,
          config: {},
          position: { x: 200, y: 200 }
        }
      }
    }));
  }
  He(() => s(), () => {
    _(o, b(s()));
  }), Xt(), st();
  var k = El(), C = f(d(k), 2);
  qe(C, 1, () => n(o), Re, (w, N) => {
    var I = kl(), M = Ae(I), P = d(M), H = f(M, 2);
    qe(H, 1, () => (n(N), u(() => n(N).items)), Re, (ue, Y) => {
      var J = wl(), m = d(J), E = d(m), x = f(m, 2), A = d(x);
      D(() => {
        q(E, (n(Y), u(() => n(Y).meta.name))), q(A, (n(Y), u(() => n(Y).type)));
      }), K("click", J, () => T(n(Y).type, n(Y).meta.name)), y(ue, J);
    });
    var te = f(H, 2);
    {
      var Q = (ue) => {
        var Y = xl();
        D(() => Me(Y, "href", `/admin/marketplace?category=${n(N), u(() => n(N).category) ?? ""}`)), y(ue, Y);
      };
      V(te, (ue) => {
        n(c) && ue(Q);
      });
    }
    D(() => q(P, (n(N), u(() => n(N).label)))), y(w, I);
  }), y(e, k), tt(), a();
}
var $l = /* @__PURE__ */ S('<div class="expr-editor svelte-c939oi"><textarea class="expr-textarea svelte-c939oi" rows="3" spellcheck="false" autocomplete="off" autocorrect="off"></textarea> <div class="expr-actions svelte-c939oi"><span class="expr-hint svelte-c939oi">JSONata</span> <button class="eval-btn svelte-c939oi" title="Evaluate against last run context">▶ Evaluate</button></div></div>');
function Tl(e, t) {
  et(t, !1);
  let s = Ge(t, "value", 12, ""), r = Ge(t, "placeholder", 8, "JSONata expression...");
  Ge(t, "fieldName", 8, "");
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
    Me(v, "placeholder", r()), qn(v, s());
  }), K("input", v, o), K("click", p, l), y(e, i), tt();
}
var jl = /* @__PURE__ */ S('<input type="text" placeholder="connection ID" class="svelte-awrrrl"/>'), Nl = /* @__PURE__ */ S("<option> </option>"), Cl = /* @__PURE__ */ S('<div class="hint svelte-awrrrl"> </div>'), Il = /* @__PURE__ */ S('<select class="svelte-awrrrl"><option>— select a connection —</option><!></select> <!>', 1);
function Ol(e, t) {
  et(t, !1);
  let s = Ge(t, "value", 8, ""), r = Ge(t, "service", 8, void 0), a = Ge(t, "onChange", 8), o = /* @__PURE__ */ F([]), l = /* @__PURE__ */ F(!1);
  ks(async () => {
    try {
      const b = await fetch("/api/integrations/connections");
      if (!b.ok) throw new Error(String(b.status));
      const h = await b.json();
      _(o, r() ? h.filter((T) => T.service === r()) : h);
    } catch {
      _(l, !0);
    }
  }), st();
  var i = Kt(), v = Ae(i);
  {
    var c = (b) => {
      var h = jl();
      D(() => qn(h, s())), K("input", h, (T) => a()(T.target.value)), y(b, h);
    }, p = (b) => {
      var h = Il(), T = Ae(h), k = d(T);
      k.value = k.__value = "";
      var C = f(k);
      qe(C, 1, () => n(o), Re, (M, P) => {
        var H = Nl(), te = d(H), Q = {};
        D(() => {
          q(te, `${n(P), u(() => n(P).displayName) ?? ""} (${n(P), u(() => n(P).service) ?? ""}${n(P), u(() => n(P).status !== "active" ? ` — ${n(P).status}` : "") ?? ""})`), Q !== (Q = (n(P), u(() => n(P).id))) && (H.value = (H.__value = (n(P), u(() => n(P).id))) ?? "");
        }), y(M, H);
      });
      var w;
      oo(T);
      var N = f(T, 2);
      {
        var I = (M) => {
          var P = Cl(), H = d(P);
          D(() => q(H, `No ${r() ?? "integration" ?? ""} connections. Create one in Admin → Integration Connections.`)), y(M, P);
        };
        V(N, (M) => {
          n(o), u(() => n(o).length === 0) && M(I);
        });
      }
      D(() => {
        w !== (w = s()) && (T.value = (T.__value = s()) ?? "", zr(T, s()));
      }), K("change", T, (M) => a()(M.target.value)), y(b, h);
    };
    V(v, (b) => {
      n(l) ? b(c) : b(p, -1);
    });
  }
  y(e, i), tt();
}
var Al = /* @__PURE__ */ S('<textarea rows="4" class="svelte-b5q3h1"></textarea>'), Pl = /* @__PURE__ */ S('<input type="text" placeholder="comma-separated values" class="svelte-b5q3h1"/>'), Rl = /* @__PURE__ */ S('<input type="checkbox" style="width:auto" class="svelte-b5q3h1"/>'), ql = /* @__PURE__ */ S('<div class="eval-result svelte-b5q3h1"> </div>'), Ml = /* @__PURE__ */ S('<!> <!> <button class="mode-toggle-btn svelte-b5q3h1">← Value Picker mode</button>', 1), Dl = /* @__PURE__ */ S('<button class="picker-btn svelte-b5q3h1" title="Reference upstream node output">↗</button>'), Ll = /* @__PURE__ */ S('<button class="picker-option svelte-b5q3h1"><span class="picker-node svelte-b5q3h1"> </span> <span class="picker-ref svelte-b5q3h1"> </span></button>'), Fl = /* @__PURE__ */ S('<div class="picker-dropdown svelte-b5q3h1"><div class="picker-label svelte-b5q3h1">Insert reference to:</div> <!></div>'), Jl = /* @__PURE__ */ S('<div class="field-with-picker svelte-b5q3h1"><input type="text" class="svelte-b5q3h1"/> <!> <button class="expr-toggle-btn svelte-b5q3h1" title="Switch to JSONata expression editor">ƒ</button></div> <!>', 1), zl = /* @__PURE__ */ S('<div class="form-group svelte-b5q3h1"><label class="svelte-b5q3h1"> </label> <!></div>'), Ul = /* @__PURE__ */ S('<div class="panel-section svelte-b5q3h1"><div class="panel-header svelte-b5q3h1"><span> </span> <button class="close-btn svelte-b5q3h1">✕</button></div> <div class="form-group svelte-b5q3h1"><label class="svelte-b5q3h1">Label</label> <input type="text" class="svelte-b5q3h1"/></div> <!> <button class="btn-danger svelte-b5q3h1">Remove node</button></div>');
function Hl(e, t) {
  et(t, !1);
  const s = () => nt(us, "$nodeTypes", a), r = () => nt(ot, "$graph", a), [a, o] = Wt(), l = /* @__PURE__ */ F(), i = /* @__PURE__ */ F(), v = /* @__PURE__ */ F();
  let c = Ge(t, "node", 8), p = /* @__PURE__ */ F(null), b = /* @__PURE__ */ F(
    null
    // field currently in expression editor mode
  ), h = /* @__PURE__ */ F(
    {}
    // fieldKey → eval result
  );
  function T(x) {
    var $, X;
    const A = s().find((fe) => fe.type === x.type), B = (X = ($ = A == null ? void 0 : A.schema) == null ? void 0 : $.output) == null ? void 0 : X.properties;
    return B && Object.keys(B).length > 0 ? Object.keys(B) : ["output"];
  }
  async function k(x, A) {
    try {
      const $ = await (await fetch("/studio/evaluate-expression", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression: A })
      })).json();
      _(h, {
        ...n(h),
        [x]: $.error ? `Error: ${$.error}` : JSON.stringify($.result)
      });
    } catch {
      _(h, { ...n(h), [x]: "Request failed" });
    }
  }
  function C(x, A) {
    ot.update((B) => ({
      ...B,
      nodes: {
        ...B.nodes,
        [c().id]: { ...c(), config: { ...c().config, [x]: A } }
      }
    }));
  }
  function w(x) {
    ot.update((A) => ({
      ...A,
      nodes: { ...A.nodes, [c().id]: { ...c(), label: x } }
    }));
  }
  function N() {
    ot.update((x) => {
      const A = { ...x.nodes };
      return delete A[c().id], {
        ...x,
        nodes: A,
        edges: x.edges.filter((B) => B.from !== c().id && B.to !== c().id)
      };
    }), cn.set(null);
  }
  function I(x) {
    return c().config[x] ?? void 0;
  }
  function M(x, A, B) {
    C(x, `$.${B}`), _(p, null);
  }
  He(() => (s(), Ne(c())), () => {
    _(l, s().find((x) => x.type === c().type));
  }), He(() => n(l), () => {
    var x, A, B;
    _(i, ((B = (A = (x = n(l)) == null ? void 0 : x.schema) == null ? void 0 : A.config) == null ? void 0 : B.properties) ?? {});
  }), He(() => (r(), Ne(c())), () => {
    _(v, Object.values(r().nodes).filter((x) => r().edges.some((A) => A.to === c().id && A.from === x.id)));
  }), He(() => Ne(c()), () => {
    var x;
    (x = c()) != null && x.id && (_(b, null), _(h, {}), _(p, null));
  }), Xt(), st();
  var P = Ul(), H = d(P), te = d(H), Q = d(te), ue = f(te, 2), Y = f(H, 2), J = f(d(Y), 2), m = f(Y, 2);
  qe(
    m,
    1,
    () => (n(i), u(() => Object.entries(n(i)))),
    Re,
    (x, A) => {
      var B = /* @__PURE__ */ Kn(() => Do(n(A), 2));
      let $ = () => n(B)[0], X = () => n(B)[1];
      var fe = zl(), L = d(fe), U = d(L), O = f(L, 2);
      {
        var G = (re) => {
          {
            let ee = /* @__PURE__ */ Xe(() => ($(), u(() => String(I($()) ?? ""))));
            Ol(re, {
              get value() {
                return n(ee);
              },
              get service() {
                return X(), u(() => X().service);
              },
              onChange: (de) => C($(), de)
            });
          }
        }, ye = (re) => {
          var ee = Al();
          D((de) => qn(ee, de), [
            () => ($(), u(() => JSON.stringify(I($()) ?? {}, null, 2)))
          ]), K("blur", ee, (de) => {
            try {
              C($(), JSON.parse(de.target.value));
            } catch {
            }
          }), y(re, ee);
        }, oe = (re) => {
          var ee = Pl();
          D((de) => qn(ee, de), [
            () => ($(), u(() => Array.isArray(I($())) ? I($()).join(", ") : String(I($()) ?? "")))
          ]), K("input", ee, (de) => C($(), de.target.value.split(",").map(($e) => $e.trim()).filter(Boolean))), y(re, ee);
        }, he = (re) => {
          var ee = Rl();
          D((de) => ll(ee, de), [() => ($(), u(() => !!I($())))]), K("change", ee, (de) => C($(), de.target.checked)), y(re, ee);
        }, le = (re) => {
          var ee = Kt(), de = Ae(ee);
          {
            var $e = (j) => {
              var W = Ml(), ne = Ae(W);
              {
                let xe = /* @__PURE__ */ Xe(() => ($(), u(() => String(I($()) ?? ""))));
                Tl(ne, {
                  get value() {
                    return n(xe);
                  },
                  get fieldName() {
                    return $();
                  },
                  $$events: {
                    change: (se) => C($(), se.detail),
                    evaluate: (se) => k($(), se.detail)
                  }
                });
              }
              var be = f(ne, 2);
              {
                var Ie = (xe) => {
                  var se = ql(), ve = d(se);
                  D((ae) => q(ve, ae), [
                    () => (n(h), $(), u(() => String(n(h)[$()])))
                  ]), y(xe, se);
                };
                V(be, (xe) => {
                  n(h), $(), u(() => n(h)[$()]) && xe(Ie);
                });
              }
              var De = f(be, 2);
              K("click", De, () => {
                _(b, null), _(h, { ...n(h), [$()]: void 0 });
              }), y(j, W);
            }, R = (j) => {
              var W = Jl(), ne = Ae(W), be = d(ne), Ie = f(be, 2);
              {
                var De = (ae) => {
                  var pe = Dl();
                  K("click", pe, () => {
                    _(p, n(p) === $() ? null : $());
                  }), y(ae, pe);
                };
                V(Ie, (ae) => {
                  n(v), u(() => n(v).length > 0) && ae(De);
                });
              }
              var xe = f(Ie, 2), se = f(ne, 2);
              {
                var ve = (ae) => {
                  var pe = Fl(), Oe = f(d(pe), 2);
                  qe(Oe, 1, () => n(v), Re, (We, Be) => {
                    var Ve = Kt(), z = Ae(Ve);
                    qe(
                      z,
                      1,
                      () => (n(Be), u(() => T(n(Be)))),
                      Re,
                      (Z, ce) => {
                        var je = Ll(), Je = d(je), ke = d(Je), Ce = f(Je, 2), Ee = d(Ce);
                        D(() => {
                          q(ke, (n(Be), u(() => n(Be).label ?? n(Be).id))), q(Ee, `$.${n(ce) ?? ""}`);
                        }), K("click", je, () => M($(), n(Be).id, n(ce))), y(Z, je);
                      }
                    ), y(We, Ve);
                  }), y(ae, pe);
                };
                V(se, (ae) => {
                  n(p), $(), n(v), u(() => n(p) === $() && n(v).length > 0) && ae(ve);
                });
              }
              D((ae) => qn(be, ae), [
                () => ($(), u(() => String(I($()) ?? "")))
              ]), K("input", be, (ae) => C($(), ae.target.value)), K("click", xe, () => {
                _(b, $()), _(p, null);
              }), y(j, W);
            };
            V(de, (j) => {
              n(b) === $() ? j($e) : j(R, -1);
            });
          }
          y(re, ee);
        };
        V(O, (re) => {
          X(), u(() => X().format === "connection") ? re(G) : (X(), u(() => X().type === "object") ? re(ye, 1) : (X(), u(() => X().type === "array") ? re(oe, 2) : (X(), u(() => X().type === "boolean") ? re(he, 3) : re(le, -1))));
        });
      }
      D(() => q(U, (X(), $(), u(() => X().description ?? $())))), y(x, fe);
    }
  );
  var E = f(m, 2);
  D(() => {
    q(Q, `Node: ${Ne(c()), u(() => c().type) ?? ""}`), qn(J, (Ne(c()), u(() => c().label ?? "")));
  }), K("click", ue, () => cn.set(null)), K("input", J, (x) => w(x.target.value)), K("click", E, N), y(e, P), tt(), o();
}
var Bl = /* @__PURE__ */ S('<div class="agent-name svelte-5tjmbm"> </div> <div> </div>', 1), Vl = /* @__PURE__ */ S('<div class="status-msg svelte-5tjmbm"> </div>'), Yl = /* @__PURE__ */ S('<div class="status-msg svelte-5tjmbm"> </div>'), Gl = /* @__PURE__ */ S('<div class="status-msg svelte-5tjmbm"> </div>'), Kl = /* @__PURE__ */ S('<button class="btn-revert svelte-5tjmbm"> </button> <!>', 1), Wl = /* @__PURE__ */ S('<span class="trigger-filter svelte-5tjmbm"> </span>'), Xl = /* @__PURE__ */ S('<div class="trigger-row svelte-5tjmbm"><div class="trigger-info svelte-5tjmbm"><span class="trigger-service svelte-5tjmbm"> </span> <!> <code class="trigger-url svelte-5tjmbm"> </code></div> <button class="trigger-remove svelte-5tjmbm" title="Remove trigger">✕</button></div>'), Zl = /* @__PURE__ */ S('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Registered Triggers</label> <!></div>'), Ql = /* @__PURE__ */ S("<option> </option>"), ev = /* @__PURE__ */ S('<div class="status-msg svelte-5tjmbm"> </div>'), tv = /* @__PURE__ */ S(`<!> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Service</label> <select class="svelte-5tjmbm"><option>— select a service —</option><!></select></div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Event Filter (optional)</label> <input type="text" placeholder="e.g. app_mention — blank for all events" class="svelte-5tjmbm"/></div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Signing Secret</label> <input type="password" placeholder="the service's webhook signing secret" class="svelte-5tjmbm"/> <div class="field-hint svelte-5tjmbm">Used to verify inbound event signatures. Never displayed after registration.</div></div> <button class="btn-save svelte-5tjmbm"> </button> <!>`, 1), nv = /* @__PURE__ */ S('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Cron Expression</label> <input type="text" placeholder="0 * * * * (every hour)" class="svelte-5tjmbm"/> <div class="field-hint svelte-5tjmbm">Standard cron format: minute hour day month weekday</div></div>'), sv = /* @__PURE__ */ S('<div class="webhook-url svelte-5tjmbm"><code class="svelte-5tjmbm"> </code> <div class="field-hint svelte-5tjmbm">POST your payload to this URL. No auth headers required.</div></div>'), rv = /* @__PURE__ */ S('<div class="field-hint svelte-5tjmbm">Publish the agent to generate the webhook URL.</div>'), av = /* @__PURE__ */ S('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Webhook URL</label> <!></div>'), ov = /* @__PURE__ */ S('<div class="status-msg svelte-5tjmbm"> </div>'), iv = /* @__PURE__ */ S('<div class="panel-section svelte-5tjmbm"><div class="panel-header svelte-5tjmbm">Agent</div> <!> <div class="btn-row svelte-5tjmbm"><button class="btn-draft svelte-5tjmbm"> </button> <button class="btn-publish svelte-5tjmbm"> </button></div> <!> <!> <!></div> <div class="panel-section svelte-5tjmbm"><div class="panel-header svelte-5tjmbm">Trigger Config</div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Trigger Type</label> <select class="svelte-5tjmbm"><option>REST API</option><option>Scheduled (Cron)</option><option>Webhook</option><option>Integration Event</option></select></div> <!> <!> <!> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Description</label> <input type="text" placeholder="What does this agent do?" class="svelte-5tjmbm"/></div> <button class="btn-save svelte-5tjmbm"> </button> <!></div>', 1);
function lv(e, t) {
  et(t, !1);
  const s = () => nt(ot, "$graph", o), r = () => nt(An, "$agentConfig", o), a = () => nt(qs, "$agent", o), [o, l] = Wt();
  let i = Ge(t, "agentId", 8), v = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(""), p = /* @__PURE__ */ F(!1), b = /* @__PURE__ */ F(""), h = /* @__PURE__ */ F(!1), T = /* @__PURE__ */ F(""), k = /* @__PURE__ */ F(!1), C = /* @__PURE__ */ F(""), w = /* @__PURE__ */ F([]), N = /* @__PURE__ */ F([]), I = /* @__PURE__ */ F(""), M = /* @__PURE__ */ F(""), P = /* @__PURE__ */ F(""), H = /* @__PURE__ */ F(""), te = /* @__PURE__ */ F(!1);
  ks(async () => {
    try {
      const [z, Z] = await Promise.all([
        fetch("/api/integrations"),
        fetch("/api/integrations/triggers")
      ]);
      if (z.ok) {
        const ce = await z.json();
        _(w, ce.filter((je) => je.hasTrigger));
      }
      if (Z.ok) {
        const ce = await Z.json();
        _(N, ce.filter((je) => je.agentId === i()));
      }
    } catch {
    }
  });
  async function Q() {
    _(te, !0), _(H, "");
    try {
      const z = await fetch("/api/integrations/triggers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: n(I),
          agentId: i(),
          eventFilter: n(M) || void 0,
          secret: n(P)
        })
      });
      if (!z.ok) throw new Error("Registration failed");
      const Z = await z.json();
      _(N, [...n(N), Z]), _(P, ""), _(M, ""), _(H, "✓ Trigger registered");
    } catch (z) {
      _(H, "✗ " + (z instanceof Error ? z.message : "Error"));
    } finally {
      _(te, !1);
    }
  }
  async function ue(z) {
    try {
      const Z = await fetch(`/api/integrations/triggers/${z}`, { method: "DELETE" });
      (Z.ok || Z.status === 204) && _(N, n(N).filter((ce) => ce.id !== z));
    } catch {
    }
  }
  async function Y() {
    _(v, !0), _(c, "");
    try {
      const z = JSON.stringify(s());
      if (!(await fetch(`/api/agents/${i()}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ graphJson: z })
      })).ok) throw new Error("Publish failed");
      _(c, "✓ Published");
      const ce = await fetch(`/api/agents/${i()}`);
      ce.ok && qs.set(await ce.json());
    } catch (z) {
      _(c, "✗ " + (z instanceof Error ? z.message : "Error"));
    } finally {
      _(v, !1);
    }
  }
  async function J() {
    _(h, !0), _(T, "");
    try {
      if (!(await fetch(`/api/agents/${i()}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftGraphJson: JSON.stringify(s()) })
      })).ok) throw new Error("Save failed");
      _(T, "✓ Draft saved");
    } catch (z) {
      _(T, "✗ " + (z instanceof Error ? z.message : "Error"));
    } finally {
      _(h, !1);
    }
  }
  async function m() {
    _(k, !0), _(C, "");
    try {
      const z = await fetch(`/api/agents/${i()}/draft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (!z.ok) throw new Error("Revert failed");
      qs.set(await z.json()), _(C, "✓ Reverted to draft");
    } catch (z) {
      _(C, "✗ " + (z instanceof Error ? z.message : "Error"));
    } finally {
      _(k, !1);
    }
  }
  async function E() {
    _(p, !0), _(b, "");
    try {
      const z = { type: r().triggerType };
      if (r().triggerType === "cron" && (z.expression = r().cronExpression), !(await fetch(`/api/agents/${i()}/config`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ triggerConfig: z })
      })).ok) throw new Error("Save failed");
      if (_(b, "✓ Saved"), r().triggerType === "webhook") {
        const ce = await fetch(`/api/agents/${i()}/config`);
        if (ce.ok) {
          const je = await ce.json();
          An.update((Je) => {
            var ke;
            return { ...Je, webhookUrl: ((ke = je.triggerConfig) == null ? void 0 : ke.webhookUrl) ?? "" };
          });
        }
      }
    } catch (z) {
      _(b, "✗ " + (z instanceof Error ? z.message : "Error"));
    } finally {
      _(p, !1);
    }
  }
  st();
  var x = iv(), A = Ae(x), B = f(d(A), 2);
  {
    var $ = (z) => {
      var Z = Bl(), ce = Ae(Z), je = d(ce), Je = f(ce, 2), ke = d(Je);
      D(() => {
        q(je, (a(), u(() => a().name))), jt(Je, 1, `agent-status status-${a(), u(() => a().status) ?? ""}`, "svelte-5tjmbm"), q(ke, (a(), u(() => a().status)));
      }), y(z, Z);
    };
    V(B, (z) => {
      a() && z($);
    });
  }
  var X = f(B, 2), fe = d(X), L = d(fe), U = f(fe, 2), O = d(U), G = f(X, 2);
  {
    var ye = (z) => {
      var Z = Vl(), ce = d(Z);
      D(() => q(ce, n(T))), y(z, Z);
    };
    V(G, (z) => {
      n(T) && z(ye);
    });
  }
  var oe = f(G, 2);
  {
    var he = (z) => {
      var Z = Yl(), ce = d(Z);
      D(() => q(ce, n(c))), y(z, Z);
    };
    V(oe, (z) => {
      n(c) && z(he);
    });
  }
  var le = f(oe, 2);
  {
    var re = (z) => {
      var Z = Kl(), ce = Ae(Z), je = d(ce), Je = f(ce, 2);
      {
        var ke = (Ce) => {
          var Ee = Gl(), Le = d(Ee);
          D(() => q(Le, n(C))), y(Ce, Ee);
        };
        V(Je, (Ce) => {
          n(C) && Ce(ke);
        });
      }
      D(() => {
        ce.disabled = n(k), q(je, n(k) ? "Reverting…" : "Revert to Draft");
      }), K("click", ce, m), y(z, Z);
    };
    V(le, (z) => {
      a(), u(() => {
        var Z;
        return ((Z = a()) == null ? void 0 : Z.status) === "active";
      }) && z(re);
    });
  }
  var ee = f(A, 2), de = f(d(ee), 2), $e = f(d(de), 2), R = d($e);
  R.value = R.__value = "rest";
  var j = f(R);
  j.value = j.__value = "cron";
  var W = f(j);
  W.value = W.__value = "webhook";
  var ne = f(W);
  ne.value = ne.__value = "integration";
  var be = f(de, 2);
  {
    var Ie = (z) => {
      var Z = tv(), ce = Ae(Z);
      {
        var je = (rt) => {
          var gt = Zl(), Zt = f(d(gt), 2);
          qe(Zt, 1, () => n(N), Re, (Ws, bt) => {
            var Br = Xl(), Vr = d(Br), Yr = d(Vr), po = d(Yr), Gr = f(Yr, 2);
            {
              var ho = (Xs) => {
                var Kr = Wl(), mo = d(Kr);
                D(() => q(mo, (n(bt), u(() => n(bt).eventFilter)))), y(Xs, Kr);
              };
              V(Gr, (Xs) => {
                n(bt), u(() => n(bt).eventFilter) && Xs(ho);
              });
            }
            var _o = f(Gr, 2), go = d(_o), bo = f(Vr, 2);
            D(() => {
              q(po, (n(bt), u(() => n(bt).service))), q(go, (n(bt), u(() => n(bt).url)));
            }), K("click", bo, () => ue(n(bt).id)), y(Ws, Br);
          }), y(rt, gt);
        };
        V(ce, (rt) => {
          n(N), u(() => n(N).length > 0) && rt(je);
        });
      }
      var Je = f(ce, 2), ke = f(d(Je), 2), Ce = d(ke);
      Ce.value = Ce.__value = "";
      var Ee = f(Ce);
      qe(Ee, 1, () => n(w), Re, (rt, gt) => {
        var Zt = Ql(), Ws = d(Zt), bt = {};
        D(() => {
          q(Ws, (n(gt), u(() => n(gt).displayName))), bt !== (bt = (n(gt), u(() => n(gt).service))) && (Zt.value = (Zt.__value = (n(gt), u(() => n(gt).service))) ?? "");
        }), y(rt, Zt);
      });
      var Le = f(Je, 2), ns = f(d(Le), 2), Hr = f(Le, 2), vo = f(d(Hr), 2), Es = f(Hr, 2), co = d(Es), uo = f(Es, 2);
      {
        var fo = (rt) => {
          var gt = ev(), Zt = d(gt);
          D(() => q(Zt, n(H))), y(rt, gt);
        };
        V(uo, (rt) => {
          n(H) && rt(fo);
        });
      }
      D(() => {
        Es.disabled = n(te) || !n(I) || !n(P), q(co, n(te) ? "Registering…" : "Register Trigger");
      }), $r(ke, () => n(I), (rt) => _(I, rt)), ut(ns, () => n(M), (rt) => _(M, rt)), ut(vo, () => n(P), (rt) => _(P, rt)), K("click", Es, Q), y(z, Z);
    };
    V(be, (z) => {
      r(), u(() => r().triggerType === "integration") && z(Ie);
    });
  }
  var De = f(be, 2);
  {
    var xe = (z) => {
      var Z = nv(), ce = f(d(Z), 2);
      ut(ce, () => r().cronExpression, (je) => Qs(An, u(r).cronExpression = je, u(r))), y(z, Z);
    };
    V(De, (z) => {
      r(), u(() => r().triggerType === "cron") && z(xe);
    });
  }
  var se = f(De, 2);
  {
    var ve = (z) => {
      var Z = av(), ce = f(d(Z), 2);
      {
        var je = (ke) => {
          var Ce = sv(), Ee = d(Ce), Le = d(Ee);
          D(() => q(Le, (r(), u(() => r().webhookUrl)))), y(ke, Ce);
        }, Je = (ke) => {
          var Ce = rv();
          y(ke, Ce);
        };
        V(ce, (ke) => {
          r(), u(() => r().webhookUrl) ? ke(je) : ke(Je, -1);
        });
      }
      y(z, Z);
    };
    V(se, (z) => {
      r(), u(() => r().triggerType === "webhook") && z(ve);
    });
  }
  var ae = f(se, 2), pe = f(d(ae), 2), Oe = f(ae, 2), We = d(Oe), Be = f(Oe, 2);
  {
    var Ve = (z) => {
      var Z = ov(), ce = d(Z);
      D(() => q(ce, n(b))), y(z, Z);
    };
    V(Be, (z) => {
      n(b) && z(Ve);
    });
  }
  D(() => {
    fe.disabled = n(h), q(L, n(h) ? "Saving…" : "Save Draft"), U.disabled = n(v), q(O, n(v) ? "Publishing…" : "Publish"), Oe.disabled = n(p), q(We, n(p) ? "Saving…" : "Save");
  }), K("click", fe, J), K("click", U, Y), $r($e, () => r().triggerType, (z) => Qs(An, u(r).triggerType = z, u(r))), ut(pe, () => r().description, (z) => Qs(An, u(r).description = z, u(r))), K("click", Oe, E), y(e, x), tt(), l();
}
const mt = es({
  runId: null,
  status: "idle",
  output: null,
  error: null,
  steps: []
});
var vv = /* @__PURE__ */ S('<button class="btn-stop svelte-gqobos">■ Stop</button>'), cv = /* @__PURE__ */ S('<pre class="result-json svelte-gqobos"> </pre>'), uv = /* @__PURE__ */ S('<div class="result-error svelte-gqobos"> </div>'), dv = /* @__PURE__ */ S('<button class="traj-toggle svelte-gqobos"> </button>'), fv = /* @__PURE__ */ S('<div class="traj-thought svelte-gqobos"><span class="traj-label svelte-gqobos">Thought</span> </div>'), pv = /* @__PURE__ */ S('<div class="traj-action svelte-gqobos"><span class="traj-label svelte-gqobos">Action</span> </div>'), hv = /* @__PURE__ */ S('<div class="traj-obs svelte-gqobos"><span class="traj-label svelte-gqobos">Obs</span> </div>'), _v = /* @__PURE__ */ S('<div class="traj-step svelte-gqobos"><span class="traj-iter svelte-gqobos"> </span> <!> <!> <!></div>'), gv = /* @__PURE__ */ S('<div class="trajectory-block svelte-gqobos"></div>'), bv = /* @__PURE__ */ S('<div><span class="step-type svelte-gqobos"> </span> <span> </span> <!></div> <!>', 1), mv = /* @__PURE__ */ S('<div class="steps-header svelte-gqobos"> </div> <!>', 1), yv = /* @__PURE__ */ S('<div><div class="result-status svelte-gqobos"> </div> <!> <!></div> <!>', 1), wv = /* @__PURE__ */ S('<div class="panel-section svelte-gqobos"><div class="panel-header svelte-gqobos">Test Run</div> <div class="form-group svelte-gqobos"><label class="svelte-gqobos">Input (JSON)</label> <textarea rows="4" class="svelte-gqobos"></textarea></div> <div class="run-controls svelte-gqobos"><button class="btn-run svelte-gqobos"> </button> <!></div> <!></div>');
function xv(e, t) {
  et(t, !1);
  const s = () => nt(mt, "$runState", r), [r, a] = Wt();
  let o = Ge(t, "agentId", 8), l = /* @__PURE__ */ F("{}"), i = /* @__PURE__ */ F(!1), v = null;
  const c = /* @__PURE__ */ new Set(["core:react", "core:planner"]);
  let p = /* @__PURE__ */ F([]), b = /* @__PURE__ */ F(
    null
    // nodeId
  );
  async function h(Y) {
    try {
      const J = await fetch(`/api/telemetry/trajectory/${Y}`);
      if (!J.ok) return;
      const m = await J.json();
      _(p, m.trajectories ?? []);
    } catch {
    }
  }
  function T() {
    v && (v.close(), v = null), _(i, !1);
  }
  async function k() {
    var m;
    T(), _(i, !0), mt.set({
      runId: null,
      status: "running",
      output: null,
      error: null,
      steps: []
    });
    let Y;
    try {
      Y = JSON.parse(n(l));
    } catch {
      mt.set({
        runId: null,
        status: "failed",
        output: null,
        error: "Invalid JSON input",
        steps: []
      }), _(i, !1);
      return;
    }
    let J;
    try {
      const E = await fetch(`/api/agents/${o()}/runs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: Y, mode: "async" })
      });
      if (!E.ok) {
        const A = await E.json();
        throw new Error(((m = A == null ? void 0 : A.error) == null ? void 0 : m.message) ?? `HTTP ${E.status}`);
      }
      J = (await E.json()).runId;
    } catch (E) {
      mt.set({
        runId: null,
        status: "failed",
        output: null,
        error: String(E),
        steps: []
      }), _(i, !1);
      return;
    }
    mt.update((E) => ({ ...E, runId: J })), v = new EventSource(`/api/agents/${o()}/runs/${J}/stream`), v.addEventListener("node.started", (E) => {
      const x = JSON.parse(E.data);
      mt.update((A) => ({
        ...A,
        steps: [
          ...A.steps.filter((B) => B.nodeId !== x.nodeId),
          {
            id: x.nodeId,
            nodeId: x.nodeId,
            nodeType: x.nodeType,
            stepId: x.stepId,
            status: "running",
            startedAt: (/* @__PURE__ */ new Date()).toISOString(),
            completedAt: void 0,
            input: null,
            output: null,
            error: null
          }
        ]
      }));
    }), v.addEventListener("node.completed", (E) => {
      const x = JSON.parse(E.data);
      mt.update((A) => ({
        ...A,
        steps: A.steps.map((B) => B.nodeId === x.nodeId ? {
          ...B,
          status: "complete",
          completedAt: (/* @__PURE__ */ new Date()).toISOString(),
          output: x.outputs
        } : B)
      }));
    }), v.addEventListener("node.failed", (E) => {
      const x = JSON.parse(E.data);
      mt.update((A) => ({
        ...A,
        steps: A.steps.map((B) => B.nodeId === x.nodeId ? {
          ...B,
          status: "failed",
          completedAt: (/* @__PURE__ */ new Date()).toISOString(),
          error: x.error
        } : B)
      }));
    }), v.addEventListener("run.completed", (E) => {
      const x = JSON.parse(E.data);
      mt.update((A) => ({ ...A, status: "completed", output: x.output })), T(), h(J);
    }), v.addEventListener("run.failed", (E) => {
      const x = JSON.parse(E.data);
      mt.update((A) => ({ ...A, status: "failed", error: x.error.message })), T();
    }), v.addEventListener("run.suspended", () => {
      mt.update((E) => ({
        ...E,
        status: "failed",
        error: "Run suspended — awaiting human review"
      })), T();
    }), v.onerror = () => {
      n(i) && (mt.update((E) => ({
        ...E,
        status: E.status === "running" ? "failed" : E.status,
        error: E.error ?? "Stream connection lost"
      })), T());
    };
  }
  st();
  var C = wv(), w = f(d(C), 2), N = f(d(w), 2), I = f(w, 2), M = d(I), P = d(M), H = f(M, 2);
  {
    var te = (Y) => {
      var J = vv();
      K("click", J, T), y(Y, J);
    };
    V(H, (Y) => {
      n(i) && Y(te);
    });
  }
  var Q = f(I, 2);
  {
    var ue = (Y) => {
      var J = yv(), m = Ae(J), E = d(m), x = d(E), A = f(E, 2);
      {
        var B = (U) => {
          var O = cv(), G = d(O);
          D((ye) => q(G, ye), [
            () => (s(), u(() => JSON.stringify(s().output, null, 2)))
          ]), y(U, O);
        };
        V(A, (U) => {
          s(), u(() => s().output) && U(B);
        });
      }
      var $ = f(A, 2);
      {
        var X = (U) => {
          var O = uv(), G = d(O);
          D(() => q(G, (s(), u(() => s().error)))), y(U, O);
        };
        V($, (U) => {
          s(), u(() => s().error) && U(X);
        });
      }
      var fe = f(m, 2);
      {
        var L = (U) => {
          var O = mv(), G = Ae(O), ye = d(G), oe = f(G, 2);
          qe(oe, 1, () => (s(), u(() => s().steps)), Re, (he, le) => {
            var re = bv(), ee = Ae(re), de = d(ee), $e = d(de), R = f(de, 2), j = d(R), W = f(R, 2);
            {
              var ne = (xe) => {
                const se = /* @__PURE__ */ Xe(() => (n(p), n(le), u(() => n(p).filter((Oe) => Oe.stepId === n(le).stepId))));
                var ve = Kt(), ae = Ae(ve);
                {
                  var pe = (Oe) => {
                    var We = dv(), Be = d(We);
                    D(() => q(Be, `▶ Trajectory (${Ne(n(se)), u(() => n(se).length) ?? ""} steps)`)), K("click", We, () => _(b, n(b) === n(le).nodeId ? null : n(le).nodeId)), y(Oe, We);
                  };
                  V(ae, (Oe) => {
                    Ne(n(se)), u(() => n(se).length > 0) && Oe(pe);
                  });
                }
                y(xe, ve);
              }, be = /* @__PURE__ */ Kn(() => (n(le), s(), u(() => c.has(n(le).nodeType) && s().status !== "running")));
              V(W, (xe) => {
                n(be) && xe(ne);
              });
            }
            var Ie = f(ee, 2);
            {
              var De = (xe) => {
                const se = /* @__PURE__ */ Xe(() => (n(p), n(le), u(() => n(p).filter((ae) => ae.stepId === n(le).stepId))));
                var ve = gv();
                qe(ve, 5, () => n(se), Re, (ae, pe) => {
                  var Oe = _v(), We = d(Oe), Be = d(We), Ve = f(We, 2);
                  {
                    var z = (ke) => {
                      var Ce = fv(), Ee = f(d(Ce));
                      D(() => q(Ee, ` ${n(pe), u(() => n(pe).thought) ?? ""}`)), y(ke, Ce);
                    };
                    V(Ve, (ke) => {
                      n(pe), u(() => n(pe).thought) && ke(z);
                    });
                  }
                  var Z = f(Ve, 2);
                  {
                    var ce = (ke) => {
                      var Ce = pv(), Ee = f(d(Ce));
                      D(() => q(Ee, ` ${n(pe), u(() => n(pe).action) ?? ""}`)), y(ke, Ce);
                    };
                    V(Z, (ke) => {
                      n(pe), u(() => n(pe).action) && ke(ce);
                    });
                  }
                  var je = f(Z, 2);
                  {
                    var Je = (ke) => {
                      var Ce = hv(), Ee = f(d(Ce));
                      D(() => q(Ee, ` ${n(pe), u(() => n(pe).observation) ?? ""}`)), y(ke, Ce);
                    };
                    V(je, (ke) => {
                      n(pe), u(() => n(pe).observation) && ke(Je);
                    });
                  }
                  D(() => q(Be, `Iter ${n(pe), u(() => n(pe).iteration) ?? ""}`)), y(ae, Oe);
                }), y(xe, ve);
              };
              V(Ie, (xe) => {
                n(b), n(le), u(() => n(b) === n(le).nodeId) && xe(De);
              });
            }
            D(() => {
              jt(ee, 1, `step step-${n(le), u(() => n(le).status) ?? ""}`, "svelte-gqobos"), q($e, (n(le), u(() => n(le).nodeType))), jt(R, 1, `step-badge badge-${n(le), u(() => n(le).status) ?? ""}`, "svelte-gqobos"), q(j, (n(le), u(() => n(le).status)));
            }), y(he, re);
          }), D(() => q(ye, `Steps (${s(), u(() => s().steps.length) ?? ""})`)), y(U, O);
        };
        V(fe, (U) => {
          s(), u(() => s().steps.length > 0) && U(L);
        });
      }
      D(
        (U) => {
          jt(m, 1, `run-result status-${s(), u(() => s().status) ?? ""}`, "svelte-gqobos"), q(x, U);
        },
        [
          () => (s(), u(() => s().status.toUpperCase()))
        ]
      ), y(Y, J);
    };
    V(Q, (Y) => {
      s(), u(() => s().status !== "idle") && Y(ue);
    });
  }
  D(() => {
    M.disabled = n(i), q(P, n(i) ? "Running…" : "▶ Run");
  }), ut(N, () => n(l), (Y) => _(l, Y)), K("click", M, k), y(e, C), tt(), a();
}
var kv = /* @__PURE__ */ S('<span class="badge badge-error svelte-do6mn6"> </span>'), Ev = /* @__PURE__ */ S('<span class="badge badge-warn svelte-do6mn6"> </span>'), Sv = /* @__PURE__ */ S('<div class="issue issue-error svelte-do6mn6" role="button" tabindex="0"><span class="issue-icon svelte-do6mn6">✗</span> <span class="issue-msg svelte-do6mn6"> </span></div>'), $v = /* @__PURE__ */ S('<div class="issue issue-warning svelte-do6mn6" role="button" tabindex="0"><span class="issue-icon svelte-do6mn6">⚠</span> <span class="issue-msg svelte-do6mn6"> </span></div>'), Tv = /* @__PURE__ */ S('<label class="ack-label svelte-do6mn6"><input type="checkbox" class="svelte-do6mn6"/> Acknowledge warnings and allow publish</label>'), jv = /* @__PURE__ */ S('<div class="lint-panel svelte-do6mn6"><div class="lint-header svelte-do6mn6"><span class="lint-title svelte-do6mn6">Graph Issues</span> <!> <!></div> <div class="issue-list svelte-do6mn6"><!> <!></div> <!></div>');
function Nv(e, t) {
  et(t, !1);
  const s = () => nt(ot, "$graph", a), r = () => nt(us, "$nodeTypes", a), [a, o] = Wt(), l = /* @__PURE__ */ F(), i = /* @__PURE__ */ F(), v = /* @__PURE__ */ F(), c = /* @__PURE__ */ F();
  let p = /* @__PURE__ */ F(!1);
  function b(w, N) {
    const I = [], M = Object.values(w.nodes), P = w.edges, H = new Set(N.map((m) => m.type));
    if (M.length === 0)
      return I.push({
        severity: "error",
        message: "Graph is empty — add at least a Start and End node"
      }), I;
    for (const m of M)
      H.size > 0 && !H.has(m.type) && I.push({
        severity: "error",
        message: `Node "${m.label ?? m.id}" has unknown type "${m.type}"`,
        nodeId: m.id
      });
    const te = w.entry ?? Object.keys(w.nodes)[0];
    w.nodes[te] || I.push({ severity: "error", message: "No entry node defined" });
    const Q = /* @__PURE__ */ new Set(), ue = [te];
    for (; ue.length > 0; ) {
      const m = ue.shift();
      if (!Q.has(m)) {
        Q.add(m);
        for (const E of P)
          E.from === m && !Q.has(E.to) && ue.push(E.to);
      }
    }
    for (const m of M)
      Q.has(m.id) || I.push({
        severity: "warning",
        message: `Node "${m.label ?? m.id}" is unreachable from the entry node`,
        nodeId: m.id
      });
    for (const m of M) {
      const E = P.filter((B) => B.from === m.id);
      if (E.length === 0) continue;
      const x = E.some((B) => B.type === "conditional"), A = E.some((B) => B.type === "fallback" || B.type === "unconditional");
      x && !A && I.push({
        severity: "warning",
        message: `Node "${m.label ?? m.id}" has conditional edges but no fallback — some inputs may go unhandled`,
        nodeId: m.id
      });
    }
    const Y = /* @__PURE__ */ new Set(["core:end", "core:stop"]);
    for (const m of M) {
      if (Y.has(m.type)) continue;
      P.filter((x) => x.from === m.id).length === 0 && I.push({
        severity: "warning",
        message: `Node "${m.label ?? m.id}" has no outbound edges and is not a terminal node`,
        nodeId: m.id
      });
    }
    const J = w.toolEdges ?? [];
    for (const m of M) {
      if (m.type === "core:tool") {
        const E = P.filter((A) => A.from === m.id);
        E.length !== 1 && I.push({
          severity: "error",
          message: `Tool node "${m.label ?? m.id}" must have exactly one outbound flow edge (has ${E.length})`,
          nodeId: m.id
        }), J.filter((A) => A.from === m.id).length === 0 && I.push({
          severity: "error",
          message: `Tool node "${m.label ?? m.id}" must be connected to an agent node via a tool edge`,
          nodeId: m.id
        });
      }
      (m.type === "core:tool-call" || m.type === "core:react") && J.filter((x) => x.to === m.id).length === 0 && I.push({
        severity: "warning",
        message: `Agent node "${m.label ?? m.id}" (${m.type}) has no tools connected — it will only be able to generate text without tool invocations`,
        nodeId: m.id
      });
    }
    return I;
  }
  function h(w) {
    if (!w) return;
    const N = s().nodes[w];
    N && cn.set(N);
  }
  He(() => (s(), r()), () => {
    _(l, b(s(), r()));
  }), He(() => n(l), () => {
    _(i, n(l).filter((w) => w.severity === "error"));
  }), He(() => n(l), () => {
    _(v, n(l).filter((w) => w.severity === "warning"));
  }), He(() => (n(i), n(v), n(p)), () => {
    _(c, n(i).length === 0 && (n(v).length === 0 || n(p)));
  }), Xt(), st();
  var T = Kt(), k = Ae(T);
  {
    var C = (w) => {
      var N = jv(), I = d(N), M = f(d(I), 2);
      {
        var P = (E) => {
          var x = kv(), A = d(x);
          D(() => q(A, `${n(i), u(() => n(i).length) ?? ""} error${n(i), u(() => n(i).length !== 1 ? "s" : "") ?? ""}`)), y(E, x);
        };
        V(M, (E) => {
          n(i), u(() => n(i).length > 0) && E(P);
        });
      }
      var H = f(M, 2);
      {
        var te = (E) => {
          var x = Ev(), A = d(x);
          D(() => q(A, `${n(v), u(() => n(v).length) ?? ""} warning${n(v), u(() => n(v).length !== 1 ? "s" : "") ?? ""}`)), y(E, x);
        };
        V(H, (E) => {
          n(v), u(() => n(v).length > 0) && E(te);
        });
      }
      var Q = f(I, 2), ue = d(Q);
      qe(ue, 1, () => n(i), Re, (E, x) => {
        var A = Sv(), B = f(d(A), 2), $ = d(B);
        D(() => q($, (n(x), u(() => n(x).message)))), K("click", A, () => h(n(x).nodeId)), K("keydown", A, (X) => X.key === "Enter" && h(n(x).nodeId)), y(E, A);
      });
      var Y = f(ue, 2);
      qe(Y, 1, () => n(v), Re, (E, x) => {
        var A = $v(), B = f(d(A), 2), $ = d(B);
        D(() => q($, (n(x), u(() => n(x).message)))), K("click", A, () => h(n(x).nodeId)), K("keydown", A, (X) => X.key === "Enter" && h(n(x).nodeId)), y(E, A);
      });
      var J = f(Q, 2);
      {
        var m = (E) => {
          var x = Tv(), A = d(x);
          io(A, () => n(p), (B) => _(p, B)), y(E, x);
        };
        V(J, (E) => {
          n(i), n(v), u(() => n(i).length === 0 && n(v).length > 0) && E(m);
        });
      }
      y(w, N);
    };
    V(k, (w) => {
      n(l), u(() => n(l).length > 0) && w(C);
    });
  }
  y(e, T), tt(), o();
}
var Cv = /* @__PURE__ */ S('<p class="empty-state svelte-28mxb5">No tools connected.<br/>Connect <code class="svelte-28mxb5">core:tool</code> or <code class="svelte-28mxb5">core:mcp-client</code> nodes via tool edges.</p>'), Iv = /* @__PURE__ */ S('<span class="tool-desc svelte-28mxb5"> </span>'), Ov = /* @__PURE__ */ S('<li class="tool-item svelte-28mxb5"><span class="tool-name svelte-28mxb5"> </span> <span class="tool-source svelte-28mxb5"> </span> <!></li>'), Av = /* @__PURE__ */ S('<ul class="tool-list svelte-28mxb5"></ul>'), Pv = /* @__PURE__ */ S('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Name</span><code class="svelte-28mxb5"> </code></div>'), Rv = /* @__PURE__ */ S('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Description</span><span class="svelte-28mxb5"> </span></div>'), qv = /* @__PURE__ */ S('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Connected to</span> <span class="svelte-28mxb5"> </span></div>'), Mv = /* @__PURE__ */ S('<div class="tool-detail svelte-28mxb5"><!> <!> <!></div>'), Dv = /* @__PURE__ */ S('<p class="empty-state svelte-28mxb5">Select an agent node (<code class="svelte-28mxb5">core:tool-call</code>, <code class="svelte-28mxb5">core:react</code>) or a tool node to inspect its tools.</p>'), Lv = /* @__PURE__ */ S('<div class="tool-panel svelte-28mxb5"><div class="panel-header svelte-28mxb5">TOOLS</div> <!></div>');
function Fv(e, t) {
  et(t, !1);
  const s = () => nt(cn, "$selectedNode", a), r = () => nt(ot, "$graph", a), [a, o] = Wt(), l = /* @__PURE__ */ F(), i = /* @__PURE__ */ F(), v = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(), p = /* @__PURE__ */ F(), b = /* @__PURE__ */ new Set(["core:tool", "core:mcp-client"]), h = /* @__PURE__ */ new Set(["core:tool-call", "core:react"]);
  He(() => s(), () => {
    var P;
    _(l, ((P = s()) == null ? void 0 : P.id) ?? null);
  }), He(() => s(), () => {
    var P;
    _(i, ((P = s()) == null ? void 0 : P.type) ?? null);
  }), He(() => (n(l), n(i), r()), () => {
    _(v, n(l) && h.has(n(i) ?? "") ? (r().toolEdges ?? []).filter((P) => P.to === n(l)).map((P) => ({ edge: P, node: r().nodes[P.from] })).filter((P) => P.node !== void 0) : []);
  }), He(() => (n(l), n(i), s()), () => {
    var P;
    _(c, n(l) && b.has(n(i) ?? "") ? (P = s()) == null ? void 0 : P.config : null);
  }), He(() => (n(l), n(i), r()), () => {
    _(p, n(l) && b.has(n(i) ?? "") ? (r().toolEdges ?? []).filter((P) => P.from === n(l)).map((P) => r().nodes[P.to]).filter(Boolean) : []);
  }), Xt(), st();
  var T = Lv(), k = f(d(T), 2);
  {
    var C = (P) => {
      var H = Kt(), te = Ae(H);
      {
        var Q = (Y) => {
          var J = Cv();
          y(Y, J);
        }, ue = (Y) => {
          var J = Av();
          qe(J, 5, () => n(v), Re, (m, E) => {
            let x = () => n(E).node;
            var A = Ov(), B = d(A), $ = d(B), X = f(B, 2), fe = d(X), L = f(X, 2);
            {
              var U = (O) => {
                var G = Iv(), ye = d(G);
                D((oe) => q(ye, oe), [
                  () => (x(), u(() => String(x().config.description)))
                ]), y(O, G);
              };
              V(L, (O) => {
                x(), u(() => {
                  var G;
                  return (G = x().config) == null ? void 0 : G.description;
                }) && O(U);
              });
            }
            D(
              (O) => {
                q($, O), q(fe, (x(), u(() => x().type === "core:mcp-client" ? "MCP" : "Graph")));
              },
              [
                () => (x(), u(() => {
                  var O;
                  return String(((O = x().config) == null ? void 0 : O.name) ?? x().type);
                }))
              ]
            ), y(m, A);
          }), y(Y, J);
        };
        V(te, (Y) => {
          n(v), u(() => n(v).length === 0) ? Y(Q) : Y(ue, -1);
        });
      }
      y(P, H);
    }, w = /* @__PURE__ */ Kn(() => (n(i), u(() => h.has(n(i) ?? "")))), N = (P) => {
      var H = Mv(), te = d(H);
      {
        var Q = (E) => {
          var x = Pv(), A = f(d(x)), B = d(A);
          D(($) => q(B, $), [
            () => (n(c), u(() => String(n(c).name)))
          ]), y(E, x);
        };
        V(te, (E) => {
          n(c), u(() => n(c).name) && E(Q);
        });
      }
      var ue = f(te, 2);
      {
        var Y = (E) => {
          var x = Rv(), A = f(d(x)), B = d(A);
          D(($) => q(B, $), [
            () => (n(c), u(() => String(n(c).description)))
          ]), y(E, x);
        };
        V(ue, (E) => {
          n(c), u(() => n(c).description) && E(Y);
        });
      }
      var J = f(ue, 2);
      {
        var m = (E) => {
          var x = qv(), A = f(d(x), 2), B = d(A);
          D(($) => q(B, $), [
            () => (n(p), u(() => n(p).map(($) => ($ == null ? void 0 : $.label) ?? ($ == null ? void 0 : $.id)).join(", ")))
          ]), y(E, x);
        };
        V(J, (E) => {
          n(p), u(() => n(p).length > 0) && E(m);
        });
      }
      y(P, H);
    }, I = /* @__PURE__ */ Kn(() => (n(i), n(c), u(() => b.has(n(i) ?? "") && n(c)))), M = (P) => {
      var H = Dv();
      y(P, H);
    };
    V(k, (P) => {
      n(w) ? P(C) : n(I) ? P(N, 1) : P(M, -1);
    });
  }
  y(e, T), tt(), o();
}
var Jv = /* @__PURE__ */ S('<div class="rationale svelte-1grl4xd"> </div>'), zv = /* @__PURE__ */ S('<code class="target svelte-1grl4xd"> </code>'), Uv = /* @__PURE__ */ S('<span class="data-preview svelte-1grl4xd"> </span>'), Hv = /* @__PURE__ */ S('<label class="patch-row svelte-1grl4xd"><input type="checkbox"/> <span class="op-label svelte-1grl4xd"> </span> <!> <!></label>'), Bv = /* @__PURE__ */ S('<div class="proposal-card svelte-1grl4xd"><div class="proposal-header svelte-1grl4xd"><span class="complexity-badge svelte-1grl4xd"> </span> <span class="proposal-desc svelte-1grl4xd"> </span></div> <!> <div class="patches-list svelte-1grl4xd"></div> <div class="proposal-actions svelte-1grl4xd"><button class="btn-text svelte-1grl4xd">Accept All</button> <button class="btn-text svelte-1grl4xd">Reject All</button> <span class="spacer svelte-1grl4xd"></span> <button class="btn-secondary svelte-1grl4xd">Dismiss</button> <button class="btn-primary svelte-1grl4xd">Apply</button></div></div>');
function Vv(e, t) {
  et(t, !1);
  let s = Ge(t, "proposal", 8);
  const r = ro();
  let a = /* @__PURE__ */ F({});
  function o() {
    _(a, Object.fromEntries(s().patches.map((Y, J) => [J, !0])));
  }
  function l() {
    _(a, Object.fromEntries(s().patches.map((Y, J) => [J, !1])));
  }
  function i() {
    const Y = s().patches.filter((J, m) => n(a)[m]);
    r("apply", { ...s(), patches: Y });
  }
  function v() {
    r("reject");
  }
  const c = {
    targeted: "#22c55e",
    structural: "#f59e0b",
    replacement: "#ef4444"
  };
  function p(Y) {
    return {
      add_node: "+ Add node",
      update_node: "~ Update node",
      delete_node: "− Delete node",
      add_edge: "+ Add edge",
      delete_edge: "− Delete edge",
      add_tool_edge: "+ Add tool edge"
    }[Y] ?? Y;
  }
  He(() => Ne(s()), () => {
    _(a, Object.fromEntries(s().patches.map((Y, J) => [J, !0])));
  }), Xt(), st();
  var b = Bv(), h = d(b), T = d(h), k = d(T), C = f(T, 2), w = d(C), N = f(h, 2);
  {
    var I = (Y) => {
      var J = Jv(), m = d(J);
      D(() => q(m, (Ne(s()), u(() => s().rationale)))), y(Y, J);
    };
    V(N, (Y) => {
      Ne(s()), u(() => s().rationale) && Y(I);
    });
  }
  var M = f(N, 2);
  qe(
    M,
    5,
    () => (Ne(s()), u(() => s().patches)),
    Re,
    (Y, J, m) => {
      var E = Hv(), x = d(E), A = f(x, 2), B = d(A), $ = f(A, 2);
      {
        var X = (O) => {
          var G = zv(), ye = d(G);
          D(() => q(ye, (n(J), u(() => n(J).target)))), y(O, G);
        };
        V($, (O) => {
          n(J), u(() => n(J).target) && O(X);
        });
      }
      var fe = f($, 2);
      {
        var L = (O) => {
          var G = Uv(), ye = d(G);
          D((oe) => q(ye, `${oe ?? ""}…`), [
            () => (n(J), u(() => JSON.stringify(n(J).data).slice(0, 60)))
          ]), y(O, G);
        }, U = /* @__PURE__ */ Kn(() => (n(J), u(() => n(J).data && Object.keys(n(J).data).length > 0)));
        V(fe, (O) => {
          n(U) && O(L);
        });
      }
      D((O) => q(B, O), [
        () => (n(J), u(() => p(n(J).op)))
      ]), io(x, () => n(a)[m], (O) => tn(a, n(a)[m] = O)), y(Y, E);
    }
  );
  var P = f(M, 2), H = d(P), te = f(H, 2), Q = f(te, 4), ue = f(Q, 2);
  D(() => {
    ao(T, `color: ${Ne(s()), u(() => c[s().complexity]) ?? ""}`), q(k, (Ne(s()), u(() => s().complexity))), q(w, (Ne(s()), u(() => s().description)));
  }), K("click", H, o), K("click", te, l), K("click", Q, v), K("click", ue, i), y(e, b), tt();
}
var Yv = /* @__PURE__ */ S('<button class="icon-btn svelte-vtqea" title="History">⏱</button>'), Gv = /* @__PURE__ */ S('<div><span class="msg-content svelte-vtqea"> </span></div>'), Kv = /* @__PURE__ */ S('<div class="history-view svelte-vtqea"><div class="history-header svelte-vtqea"><span class="svelte-vtqea">Conversation History</span> <button class="icon-btn svelte-vtqea">✕</button></div> <div class="messages-list svelte-vtqea"></div></div>'), Wv = /* @__PURE__ */ S('<div class="empty-state svelte-vtqea">Ask Caal to explain, improve, or modify this agent graph.</div>'), Xv = /* @__PURE__ */ S('<button class="node-chip svelte-vtqea"> </button>'), Zv = /* @__PURE__ */ S('<span class="svelte-vtqea"> </span>'), Qv = /* @__PURE__ */ S('<div class="msg-content svelte-vtqea"></div>'), ec = /* @__PURE__ */ S('<span class="msg-content svelte-vtqea"> </span>'), tc = /* @__PURE__ */ S("<div><!></div>"), nc = /* @__PURE__ */ S('<div class="message assistant thinking svelte-vtqea"><span class="dot svelte-vtqea"></span><span class="dot svelte-vtqea"></span><span class="dot svelte-vtqea"></span></div>'), sc = /* @__PURE__ */ S('<button class="quick-btn svelte-vtqea"> </button>'), rc = /* @__PURE__ */ S('<div class="messages-list svelte-vtqea"><!> <!> <!></div> <!> <div class="quick-actions svelte-vtqea"></div> <div class="input-area svelte-vtqea"><textarea class="caal-input svelte-vtqea" placeholder="Ask Caal… (Enter to send, Shift+Enter for newline)"></textarea> <button class="send-btn svelte-vtqea">➤</button></div>', 1), ac = /* @__PURE__ */ S('<div><div class="caal-header svelte-vtqea"><span class="caal-title svelte-vtqea"><span class="caal-dot svelte-vtqea"></span> Caal AI</span> <div class="header-actions svelte-vtqea"><!> <button class="icon-btn svelte-vtqea"> </button></div></div> <!></div>');
function oc(e, t) {
  et(t, !1);
  const s = () => nt(ot, "$graph", a), r = () => nt(cn, "$selectedNode", a), [a, o] = Wt();
  Ge(t, "agentId", 8);
  let l = /* @__PURE__ */ F([]), i = /* @__PURE__ */ F(""), v = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(null), p = /* @__PURE__ */ F(null), b = /* @__PURE__ */ F(!0), h = /* @__PURE__ */ F(!1), T = /* @__PURE__ */ F([]), k = /* @__PURE__ */ F();
  const C = [
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
  async function w(O, G) {
    if (!O.trim() || n(v)) return;
    const ye = { role: "user", content: O, timestamp: Date.now() };
    _(l, [...n(l), ye]), _(i, ""), _(v, !0), te();
    try {
      const oe = {
        ...s(),
        authoringMode: s().authoringMode ?? "studio"
      }, he = {
        message: O,
        graphState: oe,
        selectedNodeIds: r() ? [r().id] : [],
        sessionId: n(p) ?? void 0,
        intent: G ?? N(O)
      }, le = await fetch("/api/v1/caal/invoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(he)
      });
      if (!le.ok) throw new Error(`Caal invoke failed: ${le.status}`);
      const re = await le.json();
      re.sessionId && _(p, re.sessionId);
      const ee = re.output ?? {}, de = {
        role: "assistant",
        content: ee.content ?? "",
        nodeReferences: ee.nodeReferences ?? [],
        proposal: ee.proposal,
        canvasHighlight: ee.canvasHighlight,
        canvasFocus: ee.canvasFocus,
        timestamp: Date.now()
      };
      _(l, [...n(l), de]), ee.proposal && _(c, ee.proposal), ee.canvasHighlight && I(ee.canvasHighlight), ee.canvasFocus && M(ee.canvasFocus);
    } catch (oe) {
      const he = {
        role: "assistant",
        content: `Error: ${oe.message}`,
        timestamp: Date.now()
      };
      _(l, [...n(l), he]);
    } finally {
      _(v, !1), te();
    }
  }
  function N(O) {
    const G = O.toLowerCase();
    return /\b(add|create|remove|delete|update|change|modify|rename|move|connect|disconnect)\b/.test(G) ? "modify" : /\b(suggest|improve|optimize|better|recommend|enhance)\b/.test(G) ? "suggest" : "question";
  }
  function I(O) {
    window.dispatchEvent(new CustomEvent("caal:canvas-highlight", { detail: O }));
  }
  function M(O) {
    window.dispatchEvent(new CustomEvent("caal:canvas-focus", { detail: O }));
  }
  function P(O) {
    window.dispatchEvent(new CustomEvent("caal:canvas-focus", { detail: { nodeId: O, zoom: 1.5 } })), window.dispatchEvent(new CustomEvent("caal:canvas-highlight", {
      detail: { nodeIds: [O], color: "#F59E0B", durationMs: 2e3 }
    }));
  }
  function H(O) {
    const G = [], ye = /\[\[([^\]]+)\]\]/g;
    let oe = 0, he;
    for (; (he = ye.exec(O)) !== null; )
      he.index > oe && G.push({ type: "text", value: O.slice(oe, he.index) }), G.push({ type: "chip", value: he[1] }), oe = he.index + he[0].length;
    return oe < O.length && G.push({ type: "text", value: O.slice(oe) }), G;
  }
  function te() {
    requestAnimationFrame(() => {
      n(k) && tn(k, n(k).scrollTop = n(k).scrollHeight);
    });
  }
  function Q(O) {
    O.key === "Enter" && !O.shiftKey && (O.preventDefault(), w(n(i)));
  }
  async function ue() {
    var O;
    if (n(p))
      try {
        const G = await fetch(`/api/v1/caal/sessions/${encodeURIComponent(n(p))}`);
        if (G.ok) {
          const ye = await G.json();
          _(T, ((O = ye.contextEntries) == null ? void 0 : O.messages) ?? []), _(h, !0);
        }
      } catch {
      }
  }
  function Y(O) {
    const G = O.detail;
    window.dispatchEvent(new CustomEvent("caal:apply-proposal", { detail: G })), _(c, null), _(l, [
      ...n(l),
      {
        role: "assistant",
        content: `Proposal "${G.description}" accepted and applied to graph.`,
        timestamp: Date.now()
      }
    ]);
  }
  function J() {
    _(c, null);
  }
  st();
  var m = ac();
  let E;
  var x = d(m), A = f(d(x), 2), B = d(A);
  {
    var $ = (O) => {
      var G = Yv();
      K("click", G, ue), y(O, G);
    };
    V(B, (O) => {
      n(p) && O($);
    });
  }
  var X = f(B, 2), fe = d(X), L = f(x, 2);
  {
    var U = (O) => {
      var G = Kt(), ye = Ae(G);
      {
        var oe = (le) => {
          var re = Kv(), ee = d(re), de = f(d(ee), 2), $e = f(ee, 2);
          qe($e, 5, () => n(T), Re, (R, j) => {
            var W = Gv(), ne = d(W), be = d(ne);
            D(() => {
              jt(W, 1, `message ${n(j), u(() => n(j).role) ?? ""}`, "svelte-vtqea"), q(be, (n(j), u(() => n(j).content)));
            }), y(R, W);
          }), K("click", de, () => _(h, !1)), y(le, re);
        }, he = (le) => {
          var re = rc(), ee = Ae(re), de = d(ee);
          {
            var $e = (ve) => {
              var ae = Wv();
              y(ve, ae);
            };
            V(de, (ve) => {
              n(l), u(() => n(l).length === 0) && ve($e);
            });
          }
          var R = f(de, 2);
          qe(R, 1, () => n(l), Re, (ve, ae) => {
            var pe = tc(), Oe = d(pe);
            {
              var We = (Ve) => {
                var z = Qv();
                qe(
                  z,
                  5,
                  () => (n(ae), u(() => H(n(ae).content))),
                  Re,
                  (Z, ce) => {
                    var je = Kt(), Je = Ae(je);
                    {
                      var ke = (Ee) => {
                        var Le = Xv(), ns = d(Le);
                        D(() => q(ns, (n(ce), u(() => n(ce).value)))), K("click", Le, () => P(n(ce).value)), y(Ee, Le);
                      }, Ce = (Ee) => {
                        var Le = Zv(), ns = d(Le);
                        D(() => q(ns, (n(ce), u(() => n(ce).value)))), y(Ee, Le);
                      };
                      V(Je, (Ee) => {
                        n(ce), u(() => n(ce).type === "chip") ? Ee(ke) : Ee(Ce, -1);
                      });
                    }
                    y(Z, je);
                  }
                ), y(Ve, z);
              }, Be = (Ve) => {
                var z = ec(), Z = d(z);
                D(() => q(Z, (n(ae), u(() => n(ae).content)))), y(Ve, z);
              };
              V(Oe, (Ve) => {
                n(ae), u(() => n(ae).role === "assistant") ? Ve(We) : Ve(Be, -1);
              });
            }
            D(() => jt(pe, 1, `message ${n(ae), u(() => n(ae).role) ?? ""}`, "svelte-vtqea")), y(ve, pe);
          });
          var j = f(R, 2);
          {
            var W = (ve) => {
              var ae = nc();
              y(ve, ae);
            };
            V(j, (ve) => {
              n(v) && ve(W);
            });
          }
          lo(ee, (ve) => _(k, ve), () => n(k));
          var ne = f(ee, 2);
          {
            var be = (ve) => {
              Vv(ve, {
                get proposal() {
                  return n(c);
                },
                $$events: { apply: Y, reject: J }
              });
            };
            V(ne, (ve) => {
              n(c) && ve(be);
            });
          }
          var Ie = f(ne, 2);
          qe(Ie, 5, () => C, Re, (ve, ae) => {
            var pe = sc(), Oe = d(pe);
            D(() => {
              pe.disabled = n(v), q(Oe, (n(ae), u(() => n(ae).label)));
            }), K("click", pe, () => w(n(ae).prompt, n(ae).intent)), y(ve, pe);
          });
          var De = f(Ie, 2), xe = d(De);
          Me(xe, "rows", 2);
          var se = f(xe, 2);
          D(
            (ve) => {
              xe.disabled = n(v), se.disabled = ve;
            },
            [
              () => (n(v), n(i), u(() => n(v) || !n(i).trim()))
            ]
          ), ut(xe, () => n(i), (ve) => _(i, ve)), K("keydown", xe, Q), K("click", se, () => w(n(i))), y(le, re);
        };
        V(ye, (le) => {
          n(h) ? le(oe) : le(he, -1);
        });
      }
      y(O, G);
    };
    V(L, (O) => {
      n(b) && O(U);
    });
  }
  D(() => {
    E = jt(m, 1, "caal-panel svelte-vtqea", null, E, { collapsed: !n(b) }), q(fe, n(b) ? "▼" : "▲");
  }), K("click", X, () => _(b, !n(b))), y(e, m), tt(), o();
}
var ic = /* @__PURE__ */ S('<span class="sync-time svelte-ra0acr"> </span>'), lc = /* @__PURE__ */ S('<div class="code-banner svelte-ra0acr"><span class="icon svelte-ra0acr">⟨/⟩</span> <div class="text svelte-ra0acr"><span class="label svelte-ra0acr">Code-defined agent</span> <span class="handle svelte-ra0acr"> </span></div> <!> <a class="sync-link svelte-ra0acr" href="/admin/system/sync">Sync log</a></div>');
function vc(e, t) {
  et(t, !1);
  let s = Ge(t, "handle", 8), r = Ge(t, "lastSyncAt", 8, null);
  st();
  var a = lc(), o = f(d(a), 2), l = f(d(o), 2), i = d(l), v = f(o, 2);
  {
    var c = (p) => {
      var b = ic(), h = d(b);
      D((T) => q(h, `Synced ${T ?? ""}`), [
        () => (Ne(r()), u(() => new Date(r()).toLocaleTimeString()))
      ]), y(p, b);
    };
    V(v, (p) => {
      r() && p(c);
    });
  }
  D(() => q(i, s())), y(e, a), tt();
}
var cc = /* @__PURE__ */ S('<div class="loading svelte-1pzk804">Loading…</div>'), uc = /* @__PURE__ */ S('<div class="error svelte-1pzk804"> </div>'), dc = /* @__PURE__ */ S('<div class="empty svelte-1pzk804">No context entries yet.</div>'), fc = /* @__PURE__ */ S('<span class="count svelte-1pzk804"> </span>'), pc = /* @__PURE__ */ S('<div class="entry svelte-1pzk804"><div class="entry-header svelte-1pzk804"><code class="entry-key svelte-1pzk804"> </code> <span class="acc-type svelte-1pzk804"> </span> <!> <span class="tokens svelte-1pzk804"> </span></div> <pre class="entry-value svelte-1pzk804"> </pre></div>'), hc = /* @__PURE__ */ S('<div class="entries svelte-1pzk804"></div>'), _c = /* @__PURE__ */ S('<div class="panel-body svelte-1pzk804"><div class="session-id-row svelte-1pzk804"><span class="label svelte-1pzk804">Session</span> <code class="sid svelte-1pzk804"> </code> <button class="refresh-btn svelte-1pzk804">↻</button></div> <!></div>'), gc = /* @__PURE__ */ S('<div class="session-panel svelte-1pzk804"><button class="panel-header svelte-1pzk804"><span>Session Context</span> <span class="toggle svelte-1pzk804"> </span></button> <!></div>');
function bc(e, t) {
  et(t, !1);
  let s = Ge(t, "agentId", 8), r = Ge(t, "sessionId", 8, null), a = /* @__PURE__ */ F(!1), o = /* @__PURE__ */ F(!1), l = /* @__PURE__ */ F([]), i = /* @__PURE__ */ F(null);
  async function v() {
    if (!(!s() || !r())) {
      _(o, !0), _(i, null);
      try {
        const k = await fetch(`/api/v1/agents/${s()}/sessions/${encodeURIComponent(r())}`);
        if (!k.ok) throw new Error(`${k.status}`);
        const C = await k.json();
        _(l, Object.entries(C.contextEntries ?? {}).map(([w, N]) => ({
          key: w,
          value: N.value,
          accumulationType: N.accumulationType,
          count: Array.isArray(N.value) ? N.value.length : void 0
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
    const C = JSON.stringify(k, null, 2);
    return C.length > 200 ? C.slice(0, 200) + "…" : C;
  }
  He(() => (Ne(r()), n(a)), () => {
    r() && n(a) && v();
  }), Xt(), st();
  var b = Kt(), h = Ae(b);
  {
    var T = (k) => {
      var C = gc(), w = d(C), N = f(d(w), 2), I = d(N), M = f(w, 2);
      {
        var P = (H) => {
          var te = _c(), Q = d(te), ue = f(d(Q), 2), Y = d(ue), J = f(ue, 2), m = f(Q, 2);
          {
            var E = ($) => {
              var X = cc();
              y($, X);
            }, x = ($) => {
              var X = uc(), fe = d(X);
              D(() => q(fe, n(i))), y($, X);
            }, A = ($) => {
              var X = dc();
              y($, X);
            }, B = ($) => {
              var X = hc();
              qe(X, 5, () => n(l), Re, (fe, L) => {
                var U = pc(), O = d(U), G = d(O), ye = d(G), oe = f(G, 2), he = d(oe), le = f(oe, 2);
                {
                  var re = (j) => {
                    var W = fc(), ne = d(W);
                    D(() => q(ne, `${n(L), u(() => n(L).count) ?? ""} items`)), y(j, W);
                  };
                  V(le, (j) => {
                    n(L), u(() => n(L).count !== void 0) && j(re);
                  });
                }
                var ee = f(le, 2), de = d(ee), $e = f(O, 2), R = d($e);
                D(
                  (j, W) => {
                    q(ye, (n(L), u(() => n(L).key))), q(he, (n(L), u(() => n(L).accumulationType))), q(de, `~${j ?? ""}t`), q(R, W);
                  },
                  [
                    () => (n(L), u(() => c(n(L).value))),
                    () => (n(L), u(() => p(n(L).value)))
                  ]
                ), y(fe, U);
              }), y($, X);
            };
            V(m, ($) => {
              n(o) ? $(E) : n(i) ? $(x, 1) : (n(l), u(() => n(l).length === 0) ? $(A, 2) : $(B, -1));
            });
          }
          D(() => {
            q(Y, r()), J.disabled = n(o);
          }), K("click", J, v), y(H, te);
        };
        V(M, (H) => {
          n(a) && H(P);
        });
      }
      D(() => q(I, n(a) ? "▼" : "▶")), K("click", w, () => {
        _(a, !n(a));
      }), y(k, C);
    };
    V(h, (k) => {
      r() && k(T);
    });
  }
  y(e, b), tt();
}
var mc = /* @__PURE__ */ S('<div class="loading svelte-ojvpsl">Loading…</div>'), yc = /* @__PURE__ */ S('<div class="error svelte-ojvpsl"> </div>'), wc = /* @__PURE__ */ S('<div class="empty svelte-ojvpsl">No prompts defined.</div>'), xc = /* @__PURE__ */ S('<span class="active-label svelte-ojvpsl">active</span>'), kc = /* @__PURE__ */ S('<button class="promote-btn svelte-ojvpsl">Promote</button>'), Ec = /* @__PURE__ */ S('<button class="diff-btn svelte-ojvpsl">Diff</button>'), Sc = /* @__PURE__ */ S('<div><span class="vnum svelte-ojvpsl"> </span> <!> <!> <span class="version-date svelte-ojvpsl"> </span></div> <pre class="version-preview svelte-ojvpsl"> </pre>', 1), $c = /* @__PURE__ */ S('<div class="versions-list svelte-ojvpsl"></div>'), Tc = /* @__PURE__ */ S('<div class="prompt-item svelte-ojvpsl"><button class="prompt-name svelte-ojvpsl"><span></span> <span> </span> <span class="version-count svelte-ojvpsl"> </span> <span class="chevron svelte-ojvpsl"> </span></button> <!></div>'), jc = /* @__PURE__ */ S('<div class="prompts-list svelte-ojvpsl"></div>'), Nc = /* @__PURE__ */ S('<div class="panel-body svelte-ojvpsl"><!> <button class="new-btn svelte-ojvpsl">+ New Version</button></div>'), Cc = /* @__PURE__ */ S('<div class="modal-overlay svelte-ojvpsl"><div class="modal svelte-ojvpsl"><h3 class="svelte-ojvpsl">New Prompt Version</h3> <label class="svelte-ojvpsl">Prompt Name <input placeholder="e.g. system-prompt" class="svelte-ojvpsl"/></label> <label class="svelte-ojvpsl">Content <textarea placeholder="Prompt content…" class="svelte-ojvpsl"></textarea></label> <div class="modal-actions svelte-ojvpsl"><button class="btn-secondary svelte-ojvpsl">Cancel</button> <button class="btn-primary svelte-ojvpsl">Create</button></div></div></div>'), Ic = /* @__PURE__ */ S('<div class="modal-overlay svelte-ojvpsl"><div class="modal diff-modal svelte-ojvpsl"><h3 class="svelte-ojvpsl"> </h3> <div class="diff-grid svelte-ojvpsl"><div class="diff-col svelte-ojvpsl"><div class="diff-label svelte-ojvpsl"> </div> <pre class="svelte-ojvpsl"> </pre></div> <div class="diff-col svelte-ojvpsl"><div class="diff-label svelte-ojvpsl"> </div> <pre class="svelte-ojvpsl"> </pre></div></div> <div class="modal-actions svelte-ojvpsl"><button class="btn-secondary svelte-ojvpsl">Close</button> <button class="btn-primary svelte-ojvpsl"> </button></div></div></div>'), Oc = /* @__PURE__ */ S('<div class="prompt-panel svelte-ojvpsl"><button class="panel-header svelte-ojvpsl"><span>Prompt Versions</span> <span class="toggle svelte-ojvpsl"> </span></button> <!></div> <!> <!>', 1);
function Ac(e, t) {
  et(t, !1), Ge(t, "agentId", 8);
  let s = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F(!1), a = /* @__PURE__ */ F([]), o = /* @__PURE__ */ F(/* @__PURE__ */ new Set()), l = /* @__PURE__ */ F(""), i = /* @__PURE__ */ F(""), v = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(null), p = /* @__PURE__ */ F(null);
  async function b() {
    _(r, !0), _(p, null);
    try {
      const m = await fetch("/api/v1/prompts");
      if (!m.ok) throw new Error(`${m.status}`);
      const E = await m.json();
      _(a, E.prompts ?? []);
    } catch (m) {
      _(p, m.message);
    } finally {
      _(r, !1);
    }
  }
  async function h(m, E) {
    try {
      const x = await fetch(`/api/v1/prompts/${encodeURIComponent(m)}/versions/${E}/promote`, { method: "POST" });
      if (!x.ok) throw new Error(`${x.status}`);
      await b();
    } catch (x) {
      _(p, x.message);
    }
  }
  async function T() {
    if (!(!n(l) || !n(i)))
      try {
        const m = await fetch("/api/v1/prompts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: n(l),
            content: n(i)
          })
        });
        if (!m.ok) throw new Error(`${m.status}`);
        _(v, !1), _(l, ""), _(i, ""), await b();
      } catch (m) {
        _(p, m.message);
      }
  }
  function k(m) {
    n(o).has(m) ? n(o).delete(m) : n(o).add(m), _(o, new Set(n(o)));
  }
  function C(m, E, x) {
    _(c, { name: m, v1: E, v2: x });
  }
  He(() => (n(s), n(a)), () => {
    n(s) && n(a).length === 0 && b();
  }), Xt(), st();
  var w = Oc(), N = Ae(w), I = d(N), M = f(d(I), 2), P = d(M), H = f(I, 2);
  {
    var te = (m) => {
      var E = Nc(), x = d(E);
      {
        var A = (L) => {
          var U = mc();
          y(L, U);
        }, B = (L) => {
          var U = yc(), O = d(U);
          D(() => q(O, n(p))), y(L, U);
        }, $ = (L) => {
          var U = wc();
          y(L, U);
        }, X = (L) => {
          var U = jc();
          qe(U, 5, () => n(a), Re, (O, G) => {
            var ye = Tc(), oe = d(ye), he = d(oe);
            let le;
            var re = f(he, 2), ee = d(re), de = f(re, 2), $e = d(de), R = f(de, 2), j = d(R), W = f(oe, 2);
            {
              var ne = (Ie) => {
                var De = $c();
                qe(De, 5, () => (n(G), u(() => n(G).versions ?? [])), Re, (xe, se) => {
                  var ve = Sc(), ae = Ae(ve);
                  let pe;
                  var Oe = d(ae), We = d(Oe), Be = f(Oe, 2);
                  {
                    var Ve = (Ee) => {
                      var Le = xc();
                      y(Ee, Le);
                    }, z = (Ee) => {
                      var Le = kc();
                      K("click", Le, () => h(n(G).name, n(se).id)), y(Ee, Le);
                    };
                    V(Be, (Ee) => {
                      n(se), u(() => n(se).isActive) ? Ee(Ve) : Ee(z, -1);
                    });
                  }
                  var Z = f(Be, 2);
                  {
                    var ce = (Ee) => {
                      var Le = Ec();
                      K("click", Le, () => C(n(G).name, n(G).activeVersion, n(se))), y(Ee, Le);
                    };
                    V(Z, (Ee) => {
                      n(G), n(se), u(() => n(G).activeVersion && !n(se).isActive) && Ee(ce);
                    });
                  }
                  var je = f(Z, 2), Je = d(je), ke = f(ae, 2), Ce = d(ke);
                  D(
                    (Ee, Le) => {
                      pe = jt(ae, 1, "version-row svelte-ojvpsl", null, pe, { active: n(se).isActive }), q(We, `v${n(se), u(() => n(se).versionNumber) ?? ""}`), q(Je, Ee), q(Ce, `${Le ?? ""}${n(se), u(() => n(se).content.length > 120 ? "…" : "") ?? ""}`);
                    },
                    [
                      () => (n(se), u(() => new Date(n(se).createdAt).toLocaleDateString())),
                      () => (n(se), u(() => n(se).content.slice(0, 120)))
                    ]
                  ), y(xe, ve);
                }), y(Ie, De);
              }, be = /* @__PURE__ */ Kn(() => (n(o), n(G), u(() => n(o).has(n(G).name))));
              V(W, (Ie) => {
                n(be) && Ie(ne);
              });
            }
            D(
              (Ie) => {
                le = jt(he, 1, "active-dot svelte-ojvpsl", null, le, { active: n(G).activeVersion !== null }), q(ee, (n(G), u(() => n(G).name))), q($e, `v${n(G), u(() => {
                  var De;
                  return ((De = n(G).activeVersion) == null ? void 0 : De.versionNumber) ?? "—";
                }) ?? ""}`), q(j, Ie);
              },
              [
                () => (n(o), n(G), u(() => n(o).has(n(G).name) ? "▼" : "▶"))
              ]
            ), K("click", oe, () => k(n(G).name)), y(O, ye);
          }), y(L, U);
        };
        V(x, (L) => {
          n(r) ? L(A) : n(p) ? L(B, 1) : (n(a), u(() => n(a).length === 0) ? L($, 2) : L(X, -1));
        });
      }
      var fe = f(x, 2);
      K("click", fe, () => _(v, !0)), y(m, E);
    };
    V(H, (m) => {
      n(s) && m(te);
    });
  }
  var Q = f(N, 2);
  {
    var ue = (m) => {
      var E = Cc(), x = d(E), A = f(d(x), 2), B = f(d(A)), $ = f(A, 2), X = f(d($));
      Me(X, "rows", 6);
      var fe = f($, 2), L = d(fe), U = f(L, 2);
      ut(B, () => n(l), (O) => _(l, O)), ut(X, () => n(i), (O) => _(i, O)), K("click", L, () => _(v, !1)), K("click", U, T), K("click", E, Tr(() => _(v, !1))), y(m, E);
    };
    V(Q, (m) => {
      n(v) && m(ue);
    });
  }
  var Y = f(Q, 2);
  {
    var J = (m) => {
      var E = Ic(), x = d(E), A = d(x), B = d(A), $ = f(A, 2), X = d($), fe = d(X), L = d(fe), U = f(fe, 2), O = d(U), G = f(X, 2), ye = d(G), oe = d(ye), he = f(ye, 2), le = d(he), re = f($, 2), ee = d(re), de = f(ee, 2), $e = d(de);
      D(() => {
        q(B, `Diff: ${n(c), u(() => n(c).name) ?? ""}`), q(L, `Active (v${n(c), u(() => n(c).v1.versionNumber) ?? ""})`), q(O, (n(c), u(() => n(c).v1.content))), q(oe, `v${n(c), u(() => n(c).v2.versionNumber) ?? ""}`), q(le, (n(c), u(() => n(c).v2.content))), q($e, `Promote v${n(c), u(() => n(c).v2.versionNumber) ?? ""}`);
      }), K("click", ee, () => _(c, null)), K("click", de, () => {
        h(n(c).name, n(c).v2.id), _(c, null);
      }), K("click", E, Tr(() => _(c, null))), y(m, E);
    };
    V(Y, (m) => {
      n(c) && m(J);
    });
  }
  D(() => q(P, n(s) ? "▼" : "▶")), K("click", I, () => {
    _(s, !n(s));
  }), y(e, w), tt();
}
var Pc = /* @__PURE__ */ S('<span class="badge svelte-1bw2oss"> </span>'), Rc = /* @__PURE__ */ S("<div> <!></div>"), qc = /* @__PURE__ */ S('<div class="loading svelte-1bw2oss">Loading…</div>'), Mc = /* @__PURE__ */ S('<div class="error svelte-1bw2oss"> </div>'), Dc = /* @__PURE__ */ S('<div class="empty svelte-1bw2oss">No test cases yet.</div>'), Lc = /* @__PURE__ */ S('<span class="running-indicator svelte-1bw2oss">⟳</span>'), Fc = /* @__PURE__ */ S('<div class="case-row svelte-1bw2oss"><span></span> <span class="case-name svelte-1bw2oss"> </span> <span class="assertion-count svelte-1bw2oss"> </span> <!> <button class="delete-btn svelte-1bw2oss">✕</button></div>'), Jc = /* @__PURE__ */ S('<div class="cases-list svelte-1bw2oss"></div>'), zc = /* @__PURE__ */ S('<div class="panel-body svelte-1bw2oss"><!> <!> <div class="panel-actions svelte-1bw2oss"><button class="new-btn svelte-1bw2oss">+ New Test</button> <button class="run-btn svelte-1bw2oss"> </button></div></div>'), Uc = /* @__PURE__ */ S('<input placeholder="Expected value (JSON or string)" class="svelte-1bw2oss"/>'), Hc = /* @__PURE__ */ S('<label class="inline svelte-1bw2oss">Threshold <input type="number" min="0" max="1" step="0.05" style="width: 70px;" class="svelte-1bw2oss"/></label>'), Bc = /* @__PURE__ */ S('<div class="modal-overlay svelte-1bw2oss"><div class="modal svelte-1bw2oss"><h3 class="svelte-1bw2oss">New Test Case</h3> <label class="svelte-1bw2oss">Name <input placeholder="Test case name" class="svelte-1bw2oss"/></label> <label class="svelte-1bw2oss">Input JSON <textarea class="mono svelte-1bw2oss"></textarea></label> <div class="assertion-builder svelte-1bw2oss"><div class="assertion-header svelte-1bw2oss">Assertion</div> <div class="assertion-row svelte-1bw2oss"><select class="svelte-1bw2oss"><option>Exact Match</option><option>Schema</option><option>Score Threshold</option></select> <input placeholder="Output key, e.g. output.text" class="svelte-1bw2oss"/></div> <!></div> <div class="modal-actions svelte-1bw2oss"><button class="btn-secondary svelte-1bw2oss">Cancel</button> <button class="btn-primary svelte-1bw2oss">Create</button></div></div></div>'), Vc = /* @__PURE__ */ S('<div class="test-panel svelte-1bw2oss"><button class="panel-header svelte-1bw2oss"><span>Test Cases</span> <!> <span class="toggle svelte-1bw2oss"> </span></button> <!></div> <!>', 1);
function Yc(e, t) {
  et(t, !1);
  let s = Ge(t, "agentId", 8), r = /* @__PURE__ */ F(!1), a = /* @__PURE__ */ F(!1), o = /* @__PURE__ */ F(!1), l = /* @__PURE__ */ F([]), i = /* @__PURE__ */ F(null), v = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F(null), p = /* @__PURE__ */ F({
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
        const m = await fetch(`/api/v1/agents/${s()}/test-cases`);
        if (!m.ok) throw new Error(`${m.status}`);
        const E = await m.json();
        _(l, E.testCases ?? []);
      } catch (m) {
        _(c, m.message);
      } finally {
        _(a, !1);
      }
    }
  }
  async function h() {
    _(o, !0), _(i, null), _(c, null);
    try {
      const m = await fetch(`/api/v1/agents/${s()}/test-cases/run`, { method: "POST" });
      if (!m.ok) throw new Error(`${m.status}`);
      _(i, await m.json()), await b();
    } catch (m) {
      _(c, m.message);
    } finally {
      _(o, !1);
    }
  }
  async function T() {
    try {
      const m = {
        type: n(p).assertionType,
        key: n(p).assertionKey
      };
      if (n(p).assertionType === "exact_match")
        try {
          m.expected = JSON.parse(n(p).assertionExpected);
        } catch {
          m.expected = n(p).assertionExpected;
        }
      else n(p).assertionType === "evaluate_score" && (m.threshold = n(p).assertionThreshold);
      const E = await fetch(`/api/v1/agents/${s()}/test-cases`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: n(p).name,
          inputJson: n(p).inputJson,
          assertionsJson: JSON.stringify([m])
        })
      });
      if (!E.ok) throw new Error(`${E.status}`);
      _(v, !1), _(p, {
        name: "",
        inputJson: `{
  
}`,
        assertionType: "exact_match",
        assertionKey: "",
        assertionExpected: "",
        assertionThreshold: 0.8
      }), await b();
    } catch (m) {
      _(c, m.message);
    }
  }
  async function k(m) {
    try {
      await fetch(`/api/v1/agents/${s()}/test-cases/${m}`, { method: "DELETE" }), await b();
    } catch {
    }
  }
  function C(m) {
    return `${m.passed}/${m.total}`;
  }
  He(() => (n(r), n(l), n(a)), () => {
    n(r) && n(l).length === 0 && !n(a) && b();
  }), Xt(), st();
  var w = Vc(), N = Ae(w), I = d(N), M = f(d(I), 2);
  {
    var P = (m) => {
      var E = Pc(), x = d(E);
      D(() => q(x, (n(l), u(() => n(l).length)))), y(m, E);
    };
    V(M, (m) => {
      n(l), u(() => n(l).length > 0) && m(P);
    });
  }
  var H = f(M, 2), te = d(H), Q = f(I, 2);
  {
    var ue = (m) => {
      var E = zc(), x = d(E);
      {
        var A = (oe) => {
          var he = Rc();
          let le;
          var re = d(he), ee = f(re);
          {
            var de = ($e) => {
              var R = Ui();
              D(() => q(R, `— ${n(i), u(() => n(i).failed) ?? ""} failed`)), y($e, R);
            };
            V(ee, ($e) => {
              n(i), u(() => n(i).failed > 0) && $e(de);
            });
          }
          D(
            ($e) => {
              le = jt(he, 1, "suite-summary svelte-1bw2oss", null, le, {
                passed: n(i).failed === 0,
                failed: n(i).failed > 0
              }), q(re, `Suite: ${$e ?? ""} passed `);
            },
            [
              () => (n(i), u(() => C(n(i))))
            ]
          ), y(oe, he);
        };
        V(x, (oe) => {
          n(i) && oe(A);
        });
      }
      var B = f(x, 2);
      {
        var $ = (oe) => {
          var he = qc();
          y(oe, he);
        }, X = (oe) => {
          var he = Mc(), le = d(he);
          D(() => q(le, n(c))), y(oe, he);
        }, fe = (oe) => {
          var he = Dc();
          y(oe, he);
        }, L = (oe) => {
          var he = Jc();
          qe(he, 5, () => n(l), Re, (le, re) => {
            const ee = /* @__PURE__ */ Xe(() => (n(i), n(re), u(() => {
              var se, ve;
              return (ve = (se = n(i)) == null ? void 0 : se.results) == null ? void 0 : ve.find((ae) => ae.id === n(re).id);
            })));
            var de = Fc(), $e = d(de);
            let R;
            var j = f($e, 2), W = d(j), ne = f(j, 2), be = d(ne), Ie = f(ne, 2);
            {
              var De = (se) => {
                var ve = Lc();
                y(se, ve);
              };
              V(Ie, (se) => {
                n(o) && se(De);
              });
            }
            var xe = f(Ie, 2);
            D(() => {
              var se, ve, ae, pe;
              R = jt($e, 1, "status-dot svelte-1bw2oss", null, R, {
                pass: ((se = n(ee)) == null ? void 0 : se.passed) === !0 || ((ve = n(re).lastResult) == null ? void 0 : ve.passed) === !0,
                fail: ((ae = n(ee)) == null ? void 0 : ae.passed) === !1 || ((pe = n(re).lastResult) == null ? void 0 : pe.passed) === !1
              }), q(W, (n(re), u(() => n(re).name))), q(be, `${n(re), u(() => (n(re).assertions ?? []).length) ?? ""} assertions`);
            }), K("click", xe, () => k(n(re).id)), y(le, de);
          }), y(oe, he);
        };
        V(B, (oe) => {
          n(a) ? oe($) : n(c) ? oe(X, 1) : (n(l), u(() => n(l).length === 0) ? oe(fe, 2) : oe(L, -1));
        });
      }
      var U = f(B, 2), O = d(U), G = f(O, 2), ye = d(G);
      D(() => {
        G.disabled = (n(o), n(l), u(() => n(o) || n(l).length === 0)), q(ye, n(o) ? "Running…" : "Run Suite");
      }), K("click", O, () => _(v, !0)), K("click", G, h), y(m, E);
    };
    V(Q, (m) => {
      n(r) && m(ue);
    });
  }
  var Y = f(N, 2);
  {
    var J = (m) => {
      var E = Bc(), x = d(E), A = f(d(x), 2), B = f(d(A)), $ = f(A, 2), X = f(d($));
      Me(X, "rows", 5);
      var fe = f($, 2), L = f(d(fe), 2), U = d(L), O = d(U);
      O.value = O.__value = "exact_match";
      var G = f(O);
      G.value = G.__value = "schema";
      var ye = f(G);
      ye.value = ye.__value = "evaluate_score";
      var oe = f(U, 2), he = f(L, 2);
      {
        var le = (R) => {
          var j = Uc();
          ut(j, () => n(p).assertionExpected, (W) => tn(p, n(p).assertionExpected = W)), y(R, j);
        }, re = (R) => {
          var j = Hc(), W = f(d(j));
          ut(W, () => n(p).assertionThreshold, (ne) => tn(p, n(p).assertionThreshold = ne)), y(R, j);
        };
        V(he, (R) => {
          n(p), u(() => n(p).assertionType === "exact_match") ? R(le) : (n(p), u(() => n(p).assertionType === "evaluate_score") && R(re, 1));
        });
      }
      var ee = f(fe, 2), de = d(ee), $e = f(de, 2);
      D(() => $e.disabled = (n(p), u(() => !n(p).name))), ut(B, () => n(p).name, (R) => tn(p, n(p).name = R)), ut(X, () => n(p).inputJson, (R) => tn(p, n(p).inputJson = R)), $r(U, () => n(p).assertionType, (R) => tn(p, n(p).assertionType = R)), ut(oe, () => n(p).assertionKey, (R) => tn(p, n(p).assertionKey = R)), K("click", de, () => _(v, !1)), K("click", $e, T), K("click", E, Tr(() => _(v, !1))), y(m, E);
    };
    V(Y, (m) => {
      n(v) && m(J);
    });
  }
  D(() => q(te, n(r) ? "▼" : "▶")), K("click", I, () => {
    _(r, !n(r));
  }), y(e, w), tt();
}
var Gc = /* @__PURE__ */ S('<div class="studio svelte-13r820j"><aside><!></aside> <main class="canvas-area svelte-13r820j"><!> <!></main> <aside class="panel svelte-13r820j"><!> <!> <!> <!> <!> <!> <!> <!></aside></div>');
function Kc(e, t) {
  et(t, !1);
  const s = () => nt(cn, "$selectedNode", r), [r, a] = Wt();
  let o = Ge(t, "agentId", 8), l = /* @__PURE__ */ F(!1), i = /* @__PURE__ */ F(""), v = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(null);
  ks(async () => {
    if (o()) {
      try {
        const [$, X, fe] = await Promise.all([
          fetch(`/api/agents/${o()}`),
          fetch(`/api/agents/${o()}/versions`),
          fetch(`/api/agents/${o()}/config`)
        ]);
        let L = null;
        if ($.ok && (L = await $.json(), qs.set(L), _(l, (L == null ? void 0 : L.authoringMode) === "code-defined"), _(i, (L == null ? void 0 : L.handle) ?? ""), n(l) && _(v, (L == null ? void 0 : L.updatedAt) ?? null)), (L == null ? void 0 : L.status) === "draft" && L.draftGraphJson)
          ot.set(JSON.parse(L.draftGraphJson));
        else if (X.ok) {
          const U = await X.json();
          if (U.length > 0) {
            const O = U[U.length - 1];
            ot.set(JSON.parse(O.graphJson ?? "{}"));
          }
        }
        if (fe.ok) {
          const O = (await fe.json()).triggerConfig ?? {};
          An.set({
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
  function p($) {
    const X = $.detail;
    window.dispatchEvent(new CustomEvent("canvas:highlight", { detail: X }));
  }
  function b($) {
    const X = $.detail;
    window.dispatchEvent(new CustomEvent("canvas:focus", { detail: X }));
  }
  function h($) {
    const X = $.detail;
    ot.update((fe) => {
      const L = structuredClone(fe);
      for (const U of X.patches)
        if (U.op === "add_node" && U.data) {
          const O = U.data;
          L.nodes[O.id] = O;
        } else if (U.op === "update_node" && U.target && U.data) {
          const O = L.nodes[U.target];
          O && (L.nodes[U.target] = { ...O, ...U.data });
        } else U.op === "delete_node" && U.target ? delete L.nodes[U.target] : U.op === "add_edge" && U.data ? L.edges = [...L.edges ?? [], U.data] : U.op === "add_tool_edge" && U.data && (L.toolEdges = [...L.toolEdges ?? [], U.data]);
      return L;
    });
  }
  st();
  var T = Gc(), k = d(T);
  let C;
  var w = d(k);
  Sl(w, {
    get readonly() {
      return n(l);
    }
  });
  var N = f(k, 2), I = d(N);
  {
    var M = ($) => {
      vc($, {
        get handle() {
          return n(i);
        },
        get lastSyncAt() {
          return n(v);
        }
      });
    };
    V(I, ($) => {
      n(l) && $(M);
    });
  }
  var P = f(I, 2);
  yl(P, {
    get agentId() {
      return o();
    },
    get readonly() {
      return n(l);
    }
  });
  var H = f(N, 2), te = d(H);
  {
    var Q = ($) => {
      Hl($, {
        get node() {
          return s();
        },
        get readonly() {
          return n(l);
        }
      });
    }, ue = ($) => {
      lv($, {
        get agentId() {
          return o();
        },
        get readonly() {
          return n(l);
        }
      });
    };
    V(te, ($) => {
      s() ? $(Q) : $(ue, -1);
    });
  }
  var Y = f(te, 2);
  Nv(Y, {});
  var J = f(Y, 2);
  Fv(J, {});
  var m = f(J, 2);
  xv(m, {
    get agentId() {
      return o();
    },
    $$events: { sessionId: ($) => _(c, $.detail) }
  });
  var E = f(m, 2);
  bc(E, {
    get agentId() {
      return o();
    },
    get sessionId() {
      return n(c);
    }
  });
  var x = f(E, 2);
  Ac(x, {
    get agentId() {
      return o();
    }
  });
  var A = f(x, 2);
  Yc(A, {
    get agentId() {
      return o();
    }
  });
  var B = f(A, 2);
  oc(B, {
    get agentId() {
      return o();
    }
  }), D(() => C = jt(k, 1, "palette svelte-13r820j", null, C, { readonly: n(l) })), y(e, T), tt(), a();
}
const ir = document.getElementById("canvas-mount");
if (ir) {
  const e = ir.getAttribute("data-agent-id") ?? "";
  Vi(Kc, { target: ir, props: { agentId: e } });
}
