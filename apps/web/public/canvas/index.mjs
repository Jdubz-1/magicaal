var yo = Object.defineProperty;
var Kr = (e) => {
  throw TypeError(e);
};
var wo = (e, t, s) => t in e ? yo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var lt = (e, t, s) => wo(e, typeof t != "symbol" ? t + "" : t, s), Zs = (e, t, s) => t.has(e) || Kr("Cannot " + s);
var b = (e, t, s) => (Zs(e, t, "read from private field"), s ? s.call(e) : t.get(e)), _e = (e, t, s) => t.has(e) ? Kr("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s), he = (e, t, s, r) => (Zs(e, t, "write to private field"), r ? r.call(e, s) : t.set(e, s), s), Se = (e, t, s) => (Zs(e, t, "access private method"), s);
var ca;
typeof window < "u" && ((ca = window.__svelte ?? (window.__svelte = {})).v ?? (ca.v = /* @__PURE__ */ new Set())).add("5");
let Zn = !1, xo = !1;
function ko() {
  Zn = !0;
}
ko();
const Eo = 1, So = 2, fa = 4, $o = 8, To = 16, jo = 1, No = 2, Co = 4, Io = 8, Oo = 16, pa = 1, Ao = 2, Ve = Symbol("uninitialized"), ha = "http://www.w3.org/1999/xhtml", _a = !1;
var Us = Array.isArray, Po = Array.prototype.indexOf, mn = Array.prototype.includes, Hs = Array.from, ga = Object.defineProperty, Mn = Object.getOwnPropertyDescriptor, ba = Object.getOwnPropertyDescriptors, Ro = Object.prototype, qo = Array.prototype, Nr = Object.getPrototypeOf, Wr = Object.isExtensible;
const yn = () => {
};
function Mo(e) {
  return e();
}
function lr(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function ma() {
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
const Qe = 2, Bn = 4, ms = 8, ya = 1 << 24, At = 16, Rt = 32, ln = 64, vr = 128, St = 512, Ue = 1024, Ke = 2048, qt = 4096, it = 8192, $t = 16384, jn = 32768, cr = 1 << 25, Vn = 65536, qs = 1 << 17, Lo = 1 << 18, Qn = 1 << 19, wa = 1 << 20, Ft = 1 << 25, En = 65536, Ms = 1 << 21, Dn = 1 << 22, an = 1 << 23, Vt = Symbol("$state"), Fo = Symbol("legacy props"), Jo = Symbol(""), js = Symbol("attributes"), ur = Symbol("class"), dr = Symbol("style"), rs = Symbol("text"), Ns = Symbol("form reset"), Bs = new class extends Error {
  constructor() {
    super(...arguments);
    lt(this, "name", "StaleReactionError");
    lt(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var ua;
const zo = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((ua = globalThis.document) != null && ua.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function xa(e) {
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
function Cr(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Ea(e) {
  return !Cr(e, this.v);
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
function on(e) {
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
    return we.f |= an, e;
  if ((t.f & jn) === 0 && (t.f & Bn) === 0)
    throw e;
  rn(e, t);
}
function rn(e, t) {
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
function Ir(e) {
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
  function a(l) {
    if (Cr(e, l) && (e = l, s)) {
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
  function o(l) {
    a(l(
      /** @type {T} */
      e
    ));
  }
  function i(l, v = yn) {
    const c = [l, v];
    return r.add(c), r.size === 1 && (s = t(a, o) || yn), l(
      /** @type {T} */
      e
    ), () => {
      r.delete(c), r.size === 0 && s && (s(), s = null);
    };
  }
  return { set: a, update: o, subscribe: i };
}
function ai(e) {
  let t;
  return Na(e, (s) => t = s)(), t;
}
let fr = !1, Es = !1, pr = Symbol("unmounted");
function nt(e, t, s) {
  const r = s[t] ?? (s[t] = {
    store: null,
    source: /* @__PURE__ */ L(void 0),
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
    Ys(() => {
      for (var s in e)
        e[s].unsubscribe();
      ga(e, pr, {
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
  var t = Es;
  try {
    return Es = !1, [e(), Es];
  } finally {
    Es = t;
  }
}
let er = null, In = null, ie = null, is = null, Ze = null, hr = null, ls = !1, tr = !1, Pn = null, Cs = null;
var Xr = 0;
let li = 1;
var Ln, tn, fn, Fn, Jn, pn, zn, zt, fs, pt, ps, nn, Mt, Dt, Un, hn, Te, _r, as, gr, Ca, Ia, Is, vi, br, On;
const Fs = class Fs {
  constructor() {
    _e(this, Te);
    lt(this, "id", li++);
    /** True as soon as `#process` was called */
    _e(this, Ln, !1);
    lt(this, "linked", !0);
    /** @type {Batch | null} */
    _e(this, tn, null);
    /** @type {Batch | null} */
    _e(this, fn, null);
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
    _e(this, Fn, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    _e(this, Jn, /* @__PURE__ */ new Set());
    /**
     * Callbacks that should run only when a fork is committed.
     * @type {Set<(batch: Batch) => void>}
     */
    _e(this, pn, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    _e(this, zn, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    _e(this, zt, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    _e(this, fs, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    _e(this, pt, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    _e(this, ps, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    _e(this, nn, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    _e(this, Mt, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    _e(this, Dt, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    _e(this, Un, /* @__PURE__ */ new Set());
    lt(this, "is_fork", !1);
    _e(this, hn, !1);
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    b(this, Dt).has(t) || b(this, Dt).set(t, { d: [], m: [] }), b(this, Un).delete(t);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(t, s = (r) => this.schedule(r)) {
    var r = b(this, Dt).get(t);
    if (r) {
      b(this, Dt).delete(t);
      for (var a of r.d)
        Fe(a, Ke), s(a);
      for (a of r.m)
        Fe(a, qt), s(a);
    }
    b(this, Un).add(t);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(t, s, r = !1) {
    t.v !== Ve && !this.previous.has(t) && this.previous.set(t, t.v), (t.f & an) === 0 && (this.current.set(t, [s, r]), Ze == null || Ze.set(t, s)), this.is_fork || (t.v = s);
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
      Xr = 0, hr = null, Pn = null, Cs = null, tr = !1, ie = null, Ze = null, wn.clear();
    }
  }
  discard() {
    for (const t of b(this, Jn)) t(this);
    b(this, Jn).clear(), b(this, pn).clear(), Se(this, Te, On).call(this);
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(t) {
    b(this, ps).push(t);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(t, s) {
    if (he(this, zn, b(this, zn) + 1), t) {
      let r = b(this, zt).get(s) ?? 0;
      b(this, zt).set(s, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(t, s) {
    if (he(this, zn, b(this, zn) - 1), t) {
      let r = b(this, zt).get(s) ?? 0;
      r === 1 ? b(this, zt).delete(s) : b(this, zt).set(s, r - 1);
    }
    b(this, hn) || (he(this, hn, !0), on(() => {
      he(this, hn, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(t, s) {
    for (const r of t)
      b(this, nn).add(r);
    for (const r of s)
      b(this, Mt).add(r);
    t.clear(), s.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(t) {
    b(this, Fn).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    b(this, Jn).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  on_fork_commit(t) {
    b(this, pn).add(t);
  }
  run_fork_commit_callbacks() {
    for (const t of b(this, pn)) t(this);
    b(this, pn).clear();
  }
  settled() {
    return (b(this, fs) ?? he(this, fs, ma())).promise;
  }
  static ensure() {
    var t;
    if (ie === null) {
      const s = ie = new Fs();
      Se(t = s, Te, br).call(t), !tr && !ls && on(() => {
        b(s, Ln) || s.flush();
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
    if (hr = t, (a = t.b) != null && a.is_pending && (t.f & (Bn | ms | ya)) !== 0 && (t.f & jn) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var s = t; s.parent !== null; ) {
      s = s.parent;
      var r = s.f;
      if (Pn !== null && s === me && (we === null || (we.f & Qe) === 0) && !fr)
        return;
      if ((r & (ln | Rt)) !== 0) {
        if ((r & Ue) === 0)
          return;
        s.f ^= Ue;
      }
    }
    b(this, pt).push(s);
  }
};
Ln = new WeakMap(), tn = new WeakMap(), fn = new WeakMap(), Fn = new WeakMap(), Jn = new WeakMap(), pn = new WeakMap(), zn = new WeakMap(), zt = new WeakMap(), fs = new WeakMap(), pt = new WeakMap(), ps = new WeakMap(), nn = new WeakMap(), Mt = new WeakMap(), Dt = new WeakMap(), Un = new WeakMap(), hn = new WeakMap(), Te = new WeakSet(), _r = function() {
  if (this.is_fork) return !0;
  for (const r of b(this, zt).keys()) {
    for (var t = r, s = !1; t.parent !== null; ) {
      if (b(this, Dt).has(t)) {
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
  var v, c, p, g;
  if (he(this, Ln, !0), Xr++ > 1e3 && (Se(this, Te, On).call(this), ui()), !Se(this, Te, _r).call(this)) {
    for (const h of b(this, nn))
      b(this, Mt).delete(h), Fe(h, Ke), this.schedule(h);
    for (const h of b(this, Mt))
      Fe(h, qt), this.schedule(h);
  }
  const t = b(this, pt);
  he(this, pt, []), this.apply();
  var s = Pn = [], r = [], a = Cs = [];
  for (const h of t)
    try {
      Se(this, Te, gr).call(this, h, s, r);
    } catch (T) {
      throw Pa(h), T;
    }
  if (ie = null, a.length > 0) {
    var o = Fs.ensure();
    for (const h of a)
      o.schedule(h);
  }
  if (Pn = null, Cs = null, Se(this, Te, _r).call(this)) {
    Se(this, Te, Is).call(this, r), Se(this, Te, Is).call(this, s);
    for (const [h, T] of b(this, Dt))
      Aa(h, T);
    a.length > 0 && /** @type {unknown} */
    Se(v = ie, Te, as).call(v);
    return;
  }
  const i = Se(this, Te, Ca).call(this);
  if (i) {
    Se(c = i, Te, Ia).call(c, this);
    return;
  }
  b(this, nn).clear(), b(this, Mt).clear();
  for (const h of b(this, Fn)) h(this);
  b(this, Fn).clear(), is = this, Zr(r), Zr(s), is = null, (p = b(this, fs)) == null || p.resolve();
  var l = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    ie
  );
  if (this.linked && b(this, zn) === 0 && Se(this, Te, On).call(this), b(this, pt).length > 0) {
    l === null && (l = this, Se(this, Te, br).call(this));
    const h = l;
    b(h, pt).push(...b(this, pt).filter((T) => !b(h, pt).includes(T)));
  }
  l !== null && Se(g = l, Te, as).call(g);
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
    var o = a.f, i = (o & (Rt | ln)) !== 0, l = i && (o & Ue) !== 0, v = l || (o & it) !== 0 || b(this, Dt).has(a);
    if (!v && a.fn !== null) {
      i ? a.f ^= Ue : (o & Bn) !== 0 ? s.push(a) : ts(a) && ((o & At) !== 0 && b(this, Mt).add(a), Tn(a));
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
  for (var t = b(this, tn); t !== null; ) {
    if (!t.is_fork) {
      for (const [s, [, r]] of this.current)
        if (t.current.has(s) && !r)
          return t;
    }
    t = b(t, tn);
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
    const i = this.async_deriveds.get(a);
    i && o.promise.then(i.resolve);
  }
  const s = (a) => {
    var o = a.reactions;
    if (o !== null)
      for (const v of o) {
        var i = v.f;
        if ((i & Qe) !== 0)
          s(
            /** @type {Derived} */
            v
          );
        else {
          var l = (
            /** @type {Effect} */
            v
          );
          i & (Dn | At) && !this.async_deriveds.has(l) && (b(this, Mt).delete(l), Fe(l, Ke), this.schedule(l));
        }
      }
  };
  for (const a of this.current.keys())
    s(a);
  this.oncommit(() => t.discard()), Se(r = t, Te, On).call(r), ie = this, Se(this, Te, as).call(this);
}, /**
 * @param {Effect[]} effects
 */
Is = function(t) {
  for (var s = 0; s < t.length; s += 1)
    ja(t[s], b(this, nn), b(this, Mt));
}, vi = function() {
  var p;
  Se(this, Te, On).call(this);
  for (let g = er; g !== null; g = b(g, fn)) {
    var t = g.id < this.id, s = [];
    for (const [h, [T, x]] of this.current) {
      if (g.current.has(h)) {
        var r = (
          /** @type {[any, boolean]} */
          g.current.get(h)[0]
        );
        if (t && T !== r)
          g.current.set(h, [T, x]);
        else
          continue;
      }
      s.push(h);
    }
    if (t)
      for (const [h, T] of this.async_deriveds) {
        const x = g.async_deriveds.get(h);
        x && T.promise.then(x.resolve);
      }
    if (b(g, Ln)) {
      var a = [...g.current.keys()].filter((h) => !this.current.has(h));
      if (a.length === 0)
        t && g.discard();
      else if (s.length > 0) {
        if (t)
          for (const h of b(this, Un))
            g.unskip_effect(h, (T) => {
              var x;
              (T.f & (At | Dn)) !== 0 ? g.schedule(T) : Se(x = g, Te, Is).call(x, [T]);
            });
        g.activate();
        var o = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
        for (var l of s)
          Oa(l, a, o, i);
        i = /* @__PURE__ */ new Map();
        var v = [...g.current.keys()].filter(
          (h) => this.current.has(h) ? (
            /** @type {[any, boolean]} */
            this.current.get(h)[0] !== h.v
          ) : !0
        );
        if (v.length > 0)
          for (const h of b(this, ps))
            (h.f & ($t | it | qs)) === 0 && Or(h, v, i) && ((h.f & (Dn | At)) !== 0 ? (Fe(h, Ke), g.schedule(h)) : b(g, nn).add(h));
        if (b(g, pt).length > 0 && !b(g, hn)) {
          g.apply();
          for (var c of b(g, pt))
            Se(p = g, Te, gr).call(p, c, [], []);
          he(g, pt, []);
        }
        g.deactivate();
      }
    }
  }
}, br = function() {
  In === null ? er = In = this : (he(In, fn, this), he(this, tn, In)), In = this;
}, On = function() {
  var t = b(this, tn), s = b(this, fn);
  t === null ? er = s : he(t, fn, s), s === null ? In = t : he(s, tn, t), this.linked = !1;
};
let Sn = Fs;
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
    rn(e, hr);
  }
}
let It = null;
function Zr(e) {
  var t = e.length;
  if (t !== 0) {
    for (var s = 0; s < t; ) {
      var r = e[s++];
      if ((r.f & ($t | it)) === 0 && ts(r) && (It = /* @__PURE__ */ new Set(), Tn(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Ya(r), (It == null ? void 0 : It.size) > 0)) {
        wn.clear();
        for (const a of It) {
          if ((a.f & ($t | it)) !== 0) continue;
          const o = [a];
          let i = a.parent;
          for (; i !== null; )
            It.has(i) && (It.delete(i), o.push(i)), i = i.parent;
          for (let l = o.length - 1; l >= 0; l--) {
            const v = o[l];
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
      ) : (o & (Dn | At)) !== 0 && (o & Ke) === 0 && Or(a, t, r) && (Fe(a, Ke), Ar(
        /** @type {Effect} */
        a
      ));
    }
}
function Or(e, t, s) {
  const r = s.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const a of e.deps) {
      if (mn.call(t, a))
        return !0;
      if ((a.f & Qe) !== 0 && Or(
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
function Ar(e) {
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
    qr() && (n(s), Nn(() => (t === 0 && (r = u(() => e(() => vs(s)))), t += 1, () => {
      on(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, vs(s));
      });
    })));
  };
}
var fi = Vn | Qn;
function pi(e, t, s, r) {
  new hi(e, t, s, r);
}
var wt, jr, xt, _n, vt, kt, at, ht, Ut, gn, sn, Hn, hs, _s, Ht, Js, ze, _i, gi, bi, mr, Os, As, yr, wr;
class hi {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, s, r, a) {
    _e(this, ze);
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
    _e(this, wt);
    /** @type {TemplateNode | null} */
    _e(this, jr, null);
    /** @type {BoundaryProps} */
    _e(this, xt);
    /** @type {((anchor: Node) => void)} */
    _e(this, _n);
    /** @type {Effect} */
    _e(this, vt);
    /** @type {Effect | null} */
    _e(this, kt, null);
    /** @type {Effect | null} */
    _e(this, at, null);
    /** @type {Effect | null} */
    _e(this, ht, null);
    /** @type {DocumentFragment | null} */
    _e(this, Ut, null);
    _e(this, gn, 0);
    _e(this, sn, 0);
    _e(this, Hn, !1);
    /** @type {Set<Effect>} */
    _e(this, hs, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    _e(this, _s, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    _e(this, Ht, null);
    _e(this, Js, di(() => (he(this, Ht, $n(b(this, gn))), () => {
      he(this, Ht, null);
    })));
    var o;
    he(this, wt, t), he(this, xt, s), he(this, _n, (i) => {
      var l = (
        /** @type {Effect} */
        me
      );
      l.b = this, l.f |= vr, r(i);
    }), this.parent = /** @type {Effect} */
    me.b, this.transform_error = a ?? ((o = this.parent) == null ? void 0 : o.transform_error) ?? ((i) => i), he(this, vt, Mr(() => {
      Se(this, ze, mr).call(this);
    }, fi));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    ja(t, b(this, hs), b(this, _s));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!b(this, xt).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(t, s) {
    Se(this, ze, yr).call(this, t, s), he(this, gn, b(this, gn) + t), !(!b(this, Ht) || b(this, Hn)) && (he(this, Hn, !0), on(() => {
      he(this, Hn, !1), b(this, Ht) && Wn(b(this, Ht), b(this, gn));
    }));
  }
  get_effect_pending() {
    return b(this, Js).call(this), n(
      /** @type {Source<number>} */
      b(this, Ht)
    );
  }
  /** @param {unknown} error */
  error(t) {
    if (!b(this, xt).onerror && !b(this, xt).failed)
      throw t;
    ie != null && ie.is_fork ? (b(this, kt) && ie.skip_effect(b(this, kt)), b(this, at) && ie.skip_effect(b(this, at)), b(this, ht) && ie.skip_effect(b(this, ht)), ie.on_fork_commit(() => {
      Se(this, ze, wr).call(this, t);
    })) : Se(this, ze, wr).call(this, t);
  }
}
wt = new WeakMap(), jr = new WeakMap(), xt = new WeakMap(), _n = new WeakMap(), vt = new WeakMap(), kt = new WeakMap(), at = new WeakMap(), ht = new WeakMap(), Ut = new WeakMap(), gn = new WeakMap(), sn = new WeakMap(), Hn = new WeakMap(), hs = new WeakMap(), _s = new WeakMap(), Ht = new WeakMap(), Js = new WeakMap(), ze = new WeakSet(), _i = function() {
  try {
    he(this, kt, Et(() => b(this, _n).call(this, b(this, wt))));
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
gi = function(t) {
  const s = b(this, xt).failed;
  s && he(this, ht, Et(() => {
    s(
      b(this, wt),
      () => t,
      () => () => {
      }
    );
  }));
}, bi = function() {
  const t = b(this, xt).pending;
  t && (this.is_pending = !0, he(this, at, Et(() => t(b(this, wt)))), on(() => {
    var s = he(this, Ut, document.createDocumentFragment()), r = Yt();
    s.append(r), he(this, kt, Se(this, ze, As).call(this, () => Et(() => b(this, _n).call(this, r)))), b(this, sn) === 0 && (b(this, wt).before(s), he(this, Ut, null), xn(
      /** @type {Effect} */
      b(this, at),
      () => {
        he(this, at, null);
      }
    ), Se(this, ze, Os).call(
      this,
      /** @type {Batch} */
      ie
    ));
  }));
}, mr = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), he(this, sn, 0), he(this, gn, 0), he(this, kt, Et(() => {
      b(this, _n).call(this, b(this, wt));
    })), b(this, sn) > 0) {
      var t = he(this, Ut, document.createDocumentFragment());
      Fr(b(this, kt), t);
      const s = (
        /** @type {(anchor: Node) => void} */
        b(this, xt).pending
      );
      he(this, at, Et(() => s(b(this, wt))));
    } else
      Se(this, ze, Os).call(
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
Os = function(t) {
  this.is_pending = !1, t.transfer_effects(b(this, hs), b(this, _s));
}, /**
 * @template T
 * @param {() => T} fn
 */
As = function(t) {
  var s = me, r = we, a = Pe;
  Ct(b(this, vt)), Nt(b(this, vt)), Yn(b(this, vt).ctx);
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
  he(this, sn, b(this, sn) + t), b(this, sn) === 0 && (Se(this, ze, Os).call(this, s), b(this, at) && xn(b(this, at), () => {
    he(this, at, null);
  }), b(this, Ut) && (b(this, wt).before(b(this, Ut)), he(this, Ut, null)));
}, /**
 * @param {unknown} error
 */
wr = function(t) {
  b(this, kt) && (dt(b(this, kt)), he(this, kt, null)), b(this, at) && (dt(b(this, at)), he(this, at, null)), b(this, ht) && (dt(b(this, ht)), he(this, ht, null));
  var s = b(this, xt).onerror;
  let r = b(this, xt).failed;
  var a = !1, o = !1;
  const i = () => {
    if (a) {
      ni();
      return;
    }
    a = !0, o && Qo(), b(this, ht) !== null && xn(b(this, ht), () => {
      he(this, ht, null);
    }), Se(this, ze, As).call(this, () => {
      Se(this, ze, mr).call(this);
    });
  }, l = (v) => {
    try {
      o = !0, s == null || s(v, i), o = !1;
    } catch (c) {
      rn(c, b(this, vt) && b(this, vt).parent);
    }
    r && he(this, ht, Se(this, ze, As).call(this, () => {
      try {
        return Et(() => {
          var c = (
            /** @type {Effect} */
            me
          );
          c.b = this, c.f |= vr, r(
            b(this, wt),
            () => v,
            () => i
          );
        });
      } catch (c) {
        return rn(
          c,
          /** @type {Effect} */
          b(this, vt).parent
        ), null;
      }
    }));
  };
  on(() => {
    var v;
    try {
      v = this.transform_error(t);
    } catch (c) {
      rn(c, b(this, vt) && b(this, vt).parent);
      return;
    }
    v !== null && typeof v == "object" && typeof /** @type {any} */
    v.then == "function" ? v.then(
      l,
      /** @param {unknown} e */
      (c) => rn(c, b(this, vt) && b(this, vt).parent)
    ) : l(v);
  });
};
function mi(e, t, s, r) {
  const a = ys() ? Gn : Xe;
  var o = e.filter((h) => !h.settled);
  if (s.length === 0 && o.length === 0) {
    r(t.map(a));
    return;
  }
  var i = (
    /** @type {Effect} */
    me
  ), l = yi(), v = o.length === 1 ? o[0].promise : o.length > 1 ? Promise.all(o.map((h) => h.promise)) : null;
  function c(h) {
    if ((i.f & $t) === 0) {
      l();
      try {
        r(h);
      } catch (T) {
        rn(T, i);
      }
      Ds();
    }
  }
  var p = Ra();
  if (s.length === 0) {
    v.then(() => c(t.map(a))).finally(p);
    return;
  }
  function g() {
    Promise.all(s.map((h) => /* @__PURE__ */ wi(h))).then((h) => c([...t.map(a), ...h])).catch((h) => rn(h, i)).finally(p);
  }
  v ? v.then(() => {
    l(), g(), Ds();
  }) : g();
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
function Ds(e = !0) {
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
      Ve
    ),
    wv: 0,
    parent: me,
    ac: null
  };
}
const Ss = Symbol("obsolete");
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
    Ve
  ), i = !we, l = /* @__PURE__ */ new Set();
  return Ai(() => {
    var T;
    var v = (
      /** @type {Effect} */
      me
    ), c = ma();
    a = c.promise;
    try {
      Promise.resolve(e()).then(c.resolve, (x) => {
        x !== Bs && c.reject(x);
      }).finally(Ds);
    } catch (x) {
      c.reject(x), Ds();
    }
    var p = (
      /** @type {Batch} */
      ie
    );
    if (i) {
      if ((v.f & jn) !== 0)
        var g = Ra();
      if (
        /** @type {Boundary} */
        r.b.is_rendered()
      )
        (T = p.async_deriveds.get(v)) == null || T.reject(Ss);
      else
        for (const x of l.values())
          x.reject(Ss);
      l.add(c), p.async_deriveds.set(v, c);
    }
    const h = (x, N = void 0) => {
      g == null || g(), l.delete(c), N !== Ss && (p.activate(), N ? (o.f |= an, Wn(o, N)) : ((o.f & an) !== 0 && (o.f ^= an), Wn(o, x)), p.deactivate());
    };
    c.promise.then(h, (x) => h(null, x || "unknown"));
  }), Ys(() => {
    for (const v of l)
      v.reject(Ss);
  }), new Promise((v) => {
    function c(p) {
      function g() {
        p === a ? v(o) : c(a);
      }
      p.then(g, g);
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
function Pr(e) {
  var t, s = me, r = e.parent;
  if (!Gt && r !== null && e.v !== Ve && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
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
  var t = Pr(e);
  if (!e.equals(t) && (e.wv = Za(), (!(ie != null && ie.is_fork) || e.deps === null) && (ie !== null ? (ie.capture(e, t, !0), is == null || is.capture(e, t, !0)) : e.v = t, e.deps === null))) {
    Fe(e, Ue);
    return;
  }
  Gt || (Ze !== null ? (qr() || ie != null && ie.is_fork) && Ze.set(e, t) : Ir(e));
}
function ki(e) {
  var t, s;
  if (e.effects !== null)
    for (const r of e.effects)
      (r.teardown || r.ac) && ((t = r.teardown) == null || t.call(r), (s = r.ac) == null || s.abort(Bs), r.fn !== null && (r.teardown = yn), r.ac = null, ds(r, 0), Dr(r));
}
function Ma(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && t.fn !== null && Tn(t);
}
let Ls = /* @__PURE__ */ new Set();
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
function Zt(e, t) {
  const s = $n(e);
  return Wa(s), s;
}
// @__NO_SIDE_EFFECTS__
function L(e, t = !1, s = !0) {
  var a;
  const r = $n(e);
  return t || (r.equals = Ea), Zn && s && Pe !== null && Pe.l !== null && ((a = Pe.l).s ?? (a.s = [])).push(r), r;
}
function en(e, t) {
  return _(
    e,
    u(() => n(e))
  ), t;
}
function _(e, t, s = !1) {
  we !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Pt || (we.f & qs) !== 0) && ys() && (we.f & (Qe | At | Dn | qs)) !== 0 && (Tt === null || !mn.call(Tt, e)) && Zo();
  let r = s ? Rn(t) : t;
  return Wn(e, r, Cs);
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
      (e.f & Ke) !== 0 && Pr(a), Ze === null && Ir(a);
    }
    e.wv = Za(), La(e, Ke, s), ys() && me !== null && (me.f & Ue) !== 0 && (me.f & (Rt | ln)) === 0 && (yt === null ? qi([e]) : yt.push(e)), !r.is_fork && Ls.size > 0 && !Da && Ei();
  }
  return t;
}
function Ei() {
  Da = !1;
  for (const e of Ls) {
    (e.f & Ue) !== 0 && Fe(e, qt);
    let t;
    try {
      t = ts(e);
    } catch {
      t = !0;
    }
    t && Tn(e);
  }
  Ls.clear();
}
function vs(e) {
  _(e, e.v + 1);
}
function La(e, t, s) {
  var r = e.reactions;
  if (r !== null)
    for (var a = ys(), o = r.length, i = 0; i < o; i++) {
      var l = r[i], v = l.f;
      if (!(!a && l === me)) {
        var c = (v & Ke) === 0;
        if (c && Fe(l, t), (v & qs) !== 0)
          Ls.add(
            /** @type {Effect} */
            l
          );
        else if ((v & Qe) !== 0) {
          var p = (
            /** @type {Derived} */
            l
          );
          Ze == null || Ze.delete(p), (v & En) === 0 && (v & St && (me === null || (me.f & Ms) === 0) && (l.f |= En), La(p, qt, s));
        } else if (c) {
          var g = (
            /** @type {Effect} */
            l
          );
          (v & At) !== 0 && It !== null && It.add(g), s !== null ? s.push(g) : Ar(g);
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
  var s = /* @__PURE__ */ new Map(), r = Us(e), a = /* @__PURE__ */ Zt(0), o = kn, i = (l) => {
    if (kn === o)
      return l();
    var v = we, c = kn;
    Nt(null), sa(o);
    var p = l();
    return Nt(v), sa(c), p;
  };
  return r && s.set("length", /* @__PURE__ */ Zt(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(l, v, c) {
        (!("value" in c) || c.configurable === !1 || c.enumerable === !1 || c.writable === !1) && Wo();
        var p = s.get(v);
        return p === void 0 ? i(() => {
          var g = /* @__PURE__ */ Zt(c.value);
          return s.set(v, g), g;
        }) : _(p, c.value, !0), !0;
      },
      deleteProperty(l, v) {
        var c = s.get(v);
        if (c === void 0) {
          if (v in l) {
            const p = i(() => /* @__PURE__ */ Zt(Ve));
            s.set(v, p), vs(a);
          }
        } else
          _(c, Ve), vs(a);
        return !0;
      },
      get(l, v, c) {
        var T;
        if (v === Vt)
          return e;
        var p = s.get(v), g = v in l;
        if (p === void 0 && (!g || (T = Mn(l, v)) != null && T.writable) && (p = i(() => {
          var x = Rn(g ? l[v] : Ve), N = /* @__PURE__ */ Zt(x);
          return N;
        }), s.set(v, p)), p !== void 0) {
          var h = n(p);
          return h === Ve ? void 0 : h;
        }
        return Reflect.get(l, v, c);
      },
      getOwnPropertyDescriptor(l, v) {
        var c = Reflect.getOwnPropertyDescriptor(l, v);
        if (c && "value" in c) {
          var p = s.get(v);
          p && (c.value = n(p));
        } else if (c === void 0) {
          var g = s.get(v), h = g == null ? void 0 : g.v;
          if (g !== void 0 && h !== Ve)
            return {
              enumerable: !0,
              configurable: !0,
              value: h,
              writable: !0
            };
        }
        return c;
      },
      has(l, v) {
        var h;
        if (v === Vt)
          return !0;
        var c = s.get(v), p = c !== void 0 && c.v !== Ve || Reflect.has(l, v);
        if (c !== void 0 || me !== null && (!p || (h = Mn(l, v)) != null && h.writable)) {
          c === void 0 && (c = i(() => {
            var T = p ? Rn(l[v]) : Ve, x = /* @__PURE__ */ Zt(T);
            return x;
          }), s.set(v, c));
          var g = n(c);
          if (g === Ve)
            return !1;
        }
        return p;
      },
      set(l, v, c, p) {
        var z;
        var g = s.get(v), h = v in l;
        if (r && v === "length")
          for (var T = c; T < /** @type {Source<number>} */
          g.v; T += 1) {
            var x = s.get(T + "");
            x !== void 0 ? _(x, Ve) : T in l && (x = i(() => /* @__PURE__ */ Zt(Ve)), s.set(T + "", x));
          }
        if (g === void 0)
          (!h || (z = Mn(l, v)) != null && z.writable) && (g = i(() => /* @__PURE__ */ Zt(void 0)), _(g, Rn(c)), s.set(v, g));
        else {
          h = g.v !== Ve;
          var N = i(() => Rn(c));
          _(g, N);
        }
        var k = Reflect.getOwnPropertyDescriptor(l, v);
        if (k != null && k.set && k.set.call(p, c), !h) {
          if (r && typeof v == "string") {
            var R = (
              /** @type {Source<number>} */
              s.get("length")
            ), q = Number(v);
            Number.isInteger(q) && q >= R.v && _(R, q + 1);
          }
          vs(a);
        }
        return !0;
      },
      ownKeys(l) {
        n(a);
        var v = Reflect.ownKeys(l).filter((g) => {
          var h = s.get(g);
          return h === void 0 || h.v !== Ve;
        });
        for (var [c, p] of s)
          p.v !== Ve && !(c in l) && v.push(c);
        return v;
      },
      setPrototypeOf() {
        Xo();
      }
    }
  );
}
function Qr(e) {
  try {
    if (e !== null && typeof e == "object" && Vt in e)
      return e[Vt];
  } catch {
  }
  return e;
}
function Si(e, t) {
  return Object.is(Qr(e), Qr(t));
}
var ea, Fa, Ja, za;
function $i() {
  if (ea === void 0) {
    ea = window, Fa = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, s = Text.prototype;
    Ja = Mn(t, "firstChild").get, za = Mn(t, "nextSibling").get, Wr(e) && (e[ur] = void 0, e[js] = null, e[dr] = void 0, e.__e = void 0), Wr(s) && (s[rs] = void 0);
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
    document.createElementNS(ha, e, void 0)
  );
}
let ta = !1;
function Ni() {
  ta || (ta = !0, document.addEventListener(
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
            (t = s[Ns]) == null || t.call(s);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function Vs(e) {
  var t = we, s = me;
  Nt(null), Ct(null);
  try {
    return e();
  } finally {
    Nt(t), Ct(s);
  }
}
function Rr(e, t, s, r = s) {
  e.addEventListener(t, () => Vs(s));
  const a = (
    /** @type {any} */
    e[Ns]
  );
  a ? e[Ns] = () => {
    a(), r(!0);
  } : e[Ns] = () => r(!0), Ni();
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
    } catch (i) {
      throw dt(r), i;
    }
    a.deps === null && a.teardown === null && a.nodes === null && a.first === a.last && // either `null`, or a singular child
    (a.f & Qn) === 0 && (a = a.first, (e & At) !== 0 && (e & Vn) !== 0 && a !== null && (a.f |= Vn));
  }
  if (a !== null && (a.parent = s, s !== null && Ci(a, s), we !== null && (we.f & Qe) !== 0 && (e & ln) === 0)) {
    var o = (
      /** @type {Derived} */
      we
    );
    (o.effects ?? (o.effects = [])).push(a);
  }
  return r;
}
function qr() {
  return we !== null && !Pt;
}
function Ys(e) {
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
  return Jt(Bn | wa, e);
}
function Ii(e) {
  return Ha(), Jt(ms | wa, e);
}
function Oi(e) {
  Sn.ensure();
  const t = Jt(ln | Qn, e);
  return (s = {}) => new Promise((r) => {
    s.outro ? xn(t, () => {
      dt(t), r(void 0);
    }) : (dt(t), r(void 0));
  });
}
function Gs(e) {
  return Jt(Bn, e);
}
function Ye(e, t) {
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
function cn() {
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
function Mr(e, t = 0) {
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
    na(!0), Nt(null);
    try {
      t.call(null);
    } finally {
      na(s), Nt(r);
    }
  }
}
function Dr(e, t = !1) {
  var s = e.first;
  for (e.first = e.last = null; s !== null; ) {
    const a = s.ac;
    a !== null && Vs(() => {
      a.abort(Bs);
    });
    var r = s.next;
    (s.f & ln) !== 0 ? s.parent = null : dt(s, t), s = r;
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
  ), s = !0), Fe(e, cr), Dr(e, t && !s), ds(e, 0);
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
    var i = () => --o || a();
    for (var l of r)
      l.out(i);
  } else
    a();
}
function Ga(e, t, s) {
  if ((e.f & it) === 0) {
    e.f ^= it;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const l of r)
        (l.is_global || s) && t.push(l);
    for (var a = e.first; a !== null; ) {
      var o = a.next;
      if ((a.f & ln) === 0) {
        var i = (a.f & Vn) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (a.f & Rt) !== 0 && (e.f & At) !== 0;
        Ga(a, t, i ? s : !1);
      }
      a = o;
    }
  }
}
function Lr(e) {
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
      for (const i of o)
        (i.is_global || t) && i.in();
  }
}
function Fr(e, t) {
  if (e.nodes)
    for (var s = e.nodes.start, r = e.nodes.end; s !== null; ) {
      var a = s === r ? null : /* @__PURE__ */ ws(s);
      t.append(s), s = a;
    }
}
let Ps = !1, Gt = !1;
function na(e) {
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
function sa(e) {
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
      ) : t === o && (s ? Fe(o, Ke) : (o.f & Ue) !== 0 && Fe(o, qt), Ar(
        /** @type {Effect} */
        o
      ));
    }
}
function eo(e) {
  var N;
  var t = ct, s = ft, r = yt, a = we, o = Tt, i = Pe, l = Pt, v = kn, c = e.f;
  ct = /** @type {null | Value[]} */
  null, ft = 0, yt = null, we = (c & (Rt | ln)) === 0 ? e : null, Tt = null, Yn(e.ctx), Pt = !1, kn = ++dn, e.ac !== null && (Vs(() => {
    e.ac.abort(Bs);
  }), e.ac = null);
  try {
    e.f |= Ms;
    var p = (
      /** @type {Function} */
      e.fn
    ), g = p();
    e.f |= jn;
    var h = e.deps, T = ie == null ? void 0 : ie.is_fork;
    if (ct !== null) {
      var x;
      if (T || ds(e, ft), h !== null && ft > 0)
        for (h.length = ft + ct.length, x = 0; x < ct.length; x++)
          h[ft + x] = ct[x];
      else
        e.deps = h = ct;
      if (qr() && (e.f & St) !== 0)
        for (x = ft; x < h.length; x++)
          ((N = h[x]).reactions ?? (N.reactions = [])).push(e);
    } else !T && h !== null && ft < h.length && (ds(e, ft), h.length = ft);
    if (ys() && yt !== null && !Pt && h !== null && (e.f & (Qe | qt | Ke)) === 0)
      for (x = 0; x < /** @type {Source[]} */
      yt.length; x++)
        Qa(
          yt[x],
          /** @type {Effect} */
          e
        );
    if (a !== null && a !== e) {
      if (dn++, a.deps !== null)
        for (let k = 0; k < s; k += 1)
          a.deps[k].rv = dn;
      if (t !== null)
        for (const k of t)
          k.rv = dn;
      yt !== null && (r === null ? r = yt : r.push(.../** @type {Source[]} */
      yt));
    }
    return (e.f & an) !== 0 && (e.f ^= an), g;
  } catch (k) {
    return $a(k);
  } finally {
    e.f ^= Ms, ct = t, ft = s, yt = r, we = a, Tt = o, Yn(i), Pt = l, kn = v;
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
    (o.f & St) !== 0 && (o.f ^= St, o.f &= ~En), o.v !== Ve && Ir(o), ki(o), ds(o, 0);
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
    var s = me, r = Ps;
    me = e, Ps = !0;
    try {
      (t & (At | ya)) !== 0 ? Pi(e) : Dr(e), Va(e);
      var a = eo(e);
      e.teardown = typeof a == "function" ? a : null, e.wv = Xa;
      var o;
      _a && xo && (e.f & Ke) !== 0 && e.deps;
    } finally {
      Ps = r, me = s;
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
      if ((we.f & Ms) !== 0)
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
    var i = (
      /** @type {Derived} */
      e
    );
    if (Gt) {
      var l = i.v;
      return ((i.f & Ue) === 0 && i.reactions !== null || no(i)) && (l = Pr(i)), wn.set(i, l), l;
    }
    var v = (i.f & St) === 0 && !Pt && we !== null && (Ps || (we.f & St) !== 0), c = (i.f & jn) === 0;
    ts(i) && (v && (i.f |= St), qa(i)), v && !c && (Ma(i), to(i));
  }
  if (Ze != null && Ze.has(e))
    return Ze.get(e);
  if ((e.f & an) !== 0)
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
  if (e.v === Ve) return !0;
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
      const r = ba(s);
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
const $s = Symbol("events"), Li = /* @__PURE__ */ new Set(), ra = /* @__PURE__ */ new Set();
function Fi(e, t, s, r = {}) {
  function a(o) {
    if (r.capture || Er.call(t, o), !o.cancelBubble)
      return Vs(() => s == null ? void 0 : s.call(this, o));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? on(() => {
    t.addEventListener(e, a, r);
  }) : t.addEventListener(e, a, r), a;
}
function G(e, t, s, r, a) {
  var o = { capture: r, passive: a }, i = Fi(e, t, s, o);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && Ys(() => {
    t.removeEventListener(e, i, o);
  });
}
let aa = null;
function Er(e) {
  var k, R;
  var t = this, s = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, a = ((k = e.composedPath) == null ? void 0 : k.call(e)) || [], o = (
    /** @type {null | Element} */
    a[0] || e.target
  );
  aa = e;
  var i = 0, l = aa === e && e[$s];
  if (l) {
    var v = a.indexOf(l);
    if (v !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[$s] = t;
      return;
    }
    var c = a.indexOf(t);
    if (c === -1)
      return;
    v <= c && (i = v);
  }
  if (o = /** @type {Element} */
  a[i] || e.target, o !== t) {
    ga(e, "currentTarget", {
      configurable: !0,
      get() {
        return o || s;
      }
    });
    var p = we, g = me;
    Nt(null), Ct(null);
    try {
      for (var h, T = []; o !== null; ) {
        var x = o.assignedSlot || o.parentNode || /** @type {any} */
        o.host || null;
        try {
          var N = (R = o[$s]) == null ? void 0 : R[r];
          N != null && (!/** @type {any} */
          o.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === o) && N.call(o, e);
        } catch (q) {
          h ? T.push(q) : h = q;
        }
        if (e.cancelBubble || x === t || x === null)
          break;
        o = x;
      }
      if (h) {
        for (let q of T)
          queueMicrotask(() => {
            throw q;
          });
        throw h;
      }
    } finally {
      e[$s] = t, delete e.currentTarget, Nt(p), Ct(g);
    }
  }
}
var da;
const nr = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((da = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : da.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
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
function $(e, t) {
  var s = (t & pa) !== 0, r = (t & Ao) !== 0, a, o = !e.startsWith("<!>");
  return () => {
    a === void 0 && (a = so(o ? e : "<!>" + e), s || (a = /** @type {TemplateNode} */
    /* @__PURE__ */ Bt(a)));
    var i = (
      /** @type {TemplateNode} */
      r || Fa ? document.importNode(a, !0) : a.cloneNode(!0)
    );
    if (s) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Bt(i)
      ), v = (
        /** @type {TemplateNode} */
        i.lastChild
      );
      Xn(l, v);
    } else
      Xn(i, i);
    return i;
  };
}
// @__NO_SIDE_EFFECTS__
function zi(e, t, s = "svg") {
  var r = !e.startsWith("<!>"), a = (t & pa) !== 0, o = `<${s}>${r ? e : "<!>" + e}</${s}>`, i;
  return () => {
    if (!i) {
      var l = (
        /** @type {DocumentFragment} */
        so(o)
      ), v = (
        /** @type {Element} */
        /* @__PURE__ */ Bt(l)
      );
      if (a)
        for (i = document.createDocumentFragment(); /* @__PURE__ */ Bt(v); )
          i.appendChild(
            /** @type {TemplateNode} */
            /* @__PURE__ */ Bt(v)
          );
      else
        i = /** @type {Element} */
        /* @__PURE__ */ Bt(v);
    }
    var c = (
      /** @type {TemplateNode} */
      i.cloneNode(!0)
    );
    if (a) {
      var p = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Bt(c)
      ), g = (
        /** @type {TemplateNode} */
        c.lastChild
      );
      Xn(p, g);
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
function P(e, t) {
  var s = t == null ? "" : typeof t == "object" ? `${t}` : t;
  s !== /** @type {any} */
  (e[rs] ?? (e[rs] = e.nodeValue)) && (e[rs] = s, e.nodeValue = `${s}`);
}
function Vi(e, t) {
  return Yi(e, t);
}
const Ts = /* @__PURE__ */ new Map();
function Yi(e, { target: t, anchor: s, props: r = {}, events: a, context: o, intro: i = !0, transformError: l }) {
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
        var x = (
          /** @type {ComponentContext} */
          Pe
        );
        o && (x.c = o), a && (r.$$events = a), v = e(T, r) || {}, tt();
      },
      l
    );
    var g = /* @__PURE__ */ new Set(), h = (T) => {
      for (var x = 0; x < T.length; x++) {
        var N = T[x];
        if (!g.has(N)) {
          g.add(N);
          var k = Bi(N);
          for (const z of [t, document]) {
            var R = Ts.get(z);
            R === void 0 && (R = /* @__PURE__ */ new Map(), Ts.set(z, R));
            var q = R.get(N);
            q === void 0 ? (z.addEventListener(N, Er, { passive: k }), R.set(N, 1)) : R.set(N, q + 1);
          }
        }
      }
    };
    return h(Hs(Li)), ra.add(h), () => {
      var k;
      for (var T of g)
        for (const R of [t, document]) {
          var x = (
            /** @type {Map<string, number>} */
            Ts.get(R)
          ), N = (
            /** @type {number} */
            x.get(T)
          );
          --N == 0 ? (R.removeEventListener(T, Er), x.delete(T), x.size === 0 && Ts.delete(R)) : x.set(T, N);
        }
      ra.delete(h), p !== s && ((k = p.parentNode) == null || k.removeChild(p));
    };
  });
  return Gi.set(v, c), v;
}
let Gi = /* @__PURE__ */ new WeakMap();
var Ot, Lt, _t, bn, gs, bs, zs;
class Ki {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, s = !0) {
    /** @type {TemplateNode} */
    lt(this, "anchor");
    /** @type {Map<Batch, Key>} */
    _e(this, Ot, /* @__PURE__ */ new Map());
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
    _e(this, Lt, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    _e(this, _t, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    _e(this, bn, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    _e(this, gs, !0);
    /**
     * @param {Batch} batch
     */
    _e(this, bs, (t) => {
      if (b(this, Ot).has(t)) {
        var s = (
          /** @type {Key} */
          b(this, Ot).get(t)
        ), r = b(this, Lt).get(s);
        if (r)
          Lr(r), b(this, bn).delete(s);
        else {
          var a = b(this, _t).get(s);
          a && (b(this, Lt).set(s, a.effect), b(this, _t).delete(s), a.fragment.lastChild.remove(), this.anchor.before(a.fragment), r = a.effect);
        }
        for (const [o, i] of b(this, Ot)) {
          if (b(this, Ot).delete(o), o === t)
            break;
          const l = b(this, _t).get(i);
          l && (dt(l.effect), b(this, _t).delete(i));
        }
        for (const [o, i] of b(this, Lt)) {
          if (o === s || b(this, bn).has(o)) continue;
          const l = () => {
            if (Array.from(b(this, Ot).values()).includes(o)) {
              var c = document.createDocumentFragment();
              Fr(i, c), c.append(Yt()), b(this, _t).set(o, { effect: i, fragment: c });
            } else
              dt(i);
            b(this, bn).delete(o), b(this, Lt).delete(o);
          };
          b(this, gs) || !r ? (b(this, bn).add(o), xn(i, l, !1)) : l();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    _e(this, zs, (t) => {
      b(this, Ot).delete(t);
      const s = Array.from(b(this, Ot).values());
      for (const [r, a] of b(this, _t))
        s.includes(r) || (dt(a.effect), b(this, _t).delete(r));
    });
    this.anchor = t, he(this, gs, s);
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
    if (s && !b(this, Lt).has(t) && !b(this, _t).has(t))
      if (a) {
        var o = document.createDocumentFragment(), i = Yt();
        o.append(i), b(this, _t).set(t, {
          effect: Et(() => s(i)),
          fragment: o
        });
      } else
        b(this, Lt).set(
          t,
          Et(() => s(this.anchor))
        );
    if (b(this, Ot).set(r, t), a) {
      for (const [l, v] of b(this, Lt))
        l === t ? r.unskip_effect(v) : r.skip_effect(v);
      for (const [l, v] of b(this, _t))
        l === t ? r.unskip_effect(v.effect) : r.skip_effect(v.effect);
      r.oncommit(b(this, bs)), r.ondiscard(b(this, zs));
    } else
      b(this, bs).call(this, r);
  }
}
Ot = new WeakMap(), Lt = new WeakMap(), _t = new WeakMap(), bn = new WeakMap(), gs = new WeakMap(), bs = new WeakMap(), zs = new WeakMap();
function Ks(e) {
  Pe === null && xa(), Zn && Pe.l !== null ? Xi(Pe).m.push(e) : xr(() => {
    const t = u(e);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
function Wi(e, t, { bubbles: s = !1, cancelable: r = !1 } = {}) {
  return new CustomEvent(e, { detail: t, bubbles: s, cancelable: r });
}
function ro() {
  const e = Pe;
  return e === null && xa(), (t, s, r) => {
    var o;
    const a = (
      /** @type {Record<string, Function | Function[]>} */
      (o = e.s.$$events) == null ? void 0 : o[
        /** @type {string} */
        t
      ]
    );
    if (a) {
      const i = Us(a) ? a.slice() : [a], l = Wi(
        /** @type {string} */
        t,
        s,
        r
      );
      for (const v of i)
        v.call(e.x, l);
      return !l.defaultPrevented;
    }
    return !0;
  };
}
function Xi(e) {
  var t = (
    /** @type {ComponentContextLegacy} */
    e.l
  );
  return t.u ?? (t.u = { a: [], b: [], m: [] });
}
function V(e, t, s = !1) {
  var r = new Ki(e), a = s ? Vn : 0;
  function o(i, l) {
    r.ensure(i, l);
  }
  Mr(() => {
    var i = !1;
    t((l, v = 0) => {
      i = !0, o(v, l);
    }), i || o(-1, null);
  }, a);
}
function Re(e, t) {
  return t;
}
function Zi(e, t, s) {
  for (var r = [], a = t.length, o, i = t.length, l = 0; l < a; l++) {
    let g = t[l];
    xn(
      g,
      () => {
        if (o) {
          if (o.pending.delete(g), o.done.add(g), o.pending.size === 0) {
            var h = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            Sr(e, Hs(o.done)), h.delete(o), h.size === 0 && (e.outrogroups = null);
          }
        } else
          i -= 1;
      },
      !1
    );
  }
  if (i === 0) {
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
    for (const i of e.pending.values())
      for (const l of i)
        r.add(
          /** @type {EachItem} */
          e.items.get(l).e
        );
  }
  for (var a = 0; a < t.length; a++) {
    var o = t[a];
    if (r != null && r.has(o)) {
      o.f |= Ft;
      const i = document.createDocumentFragment();
      Fr(o, i);
    } else
      dt(t[a], s);
  }
}
var oa;
function qe(e, t, s, r, a, o = null) {
  var i = e, l = /* @__PURE__ */ new Map(), v = (t & fa) !== 0;
  if (v) {
    var c = (
      /** @type {Element} */
      e
    );
    i = c.appendChild(Yt());
  }
  var p = null, g = /* @__PURE__ */ Xe(() => {
    var z = s();
    return Us(z) ? z : z == null ? [] : Hs(z);
  }), h, T = /* @__PURE__ */ new Map(), x = !0;
  function N(z) {
    (q.effect.f & $t) === 0 && (q.pending.delete(z), q.fallback = p, Qi(q, h, i, t, r), p !== null && (h.length === 0 ? (p.f & Ft) === 0 ? Lr(p) : (p.f ^= Ft, os(p, null, i)) : xn(p, () => {
      p = null;
    })));
  }
  function k(z) {
    q.pending.delete(z);
  }
  var R = Mr(() => {
    h = /** @type {V[]} */
    n(g);
    for (var z = h.length, A = /* @__PURE__ */ new Set(), Y = (
      /** @type {Batch} */
      ie
    ), re = Ua(), Q = 0; Q < z; Q += 1) {
      var ge = h[Q], W = r(ge, Q), F = x ? null : l.get(W);
      F ? (F.v && Wn(F.v, ge), F.i && Wn(F.i, Q), re && Y.unskip_effect(F.e)) : (F = el(
        l,
        x ? i : oa ?? (oa = Yt()),
        ge,
        W,
        Q,
        a,
        t,
        s
      ), x || (F.e.f |= Ft), l.set(W, F)), A.add(W);
    }
    if (z === 0 && o && !p && (x ? p = Et(() => o(i)) : (p = Et(() => o(oa ?? (oa = Yt()))), p.f |= Ft)), z > A.size && Ho(), !x)
      if (T.set(Y, A), re) {
        for (const [m, E] of l)
          A.has(m) || Y.skip_effect(E.e);
        Y.oncommit(N), Y.ondiscard(k);
      } else
        N(Y);
    n(g);
  }), q = { effect: R, items: l, pending: T, outrogroups: null, fallback: p };
  x = !1;
}
function ss(e) {
  for (; e !== null && (e.f & Rt) === 0; )
    e = e.next;
  return e;
}
function Qi(e, t, s, r, a) {
  var F, m, E, w, I, H, S, X, de;
  var o = (r & $o) !== 0, i = t.length, l = e.items, v = ss(e.effect.first), c, p = null, g, h = [], T = [], x, N, k, R;
  if (o)
    for (R = 0; R < i; R += 1)
      x = t[R], N = a(x, R), k = /** @type {EachItem} */
      l.get(N).e, (k.f & Ft) === 0 && ((m = (F = k.nodes) == null ? void 0 : F.a) == null || m.measure(), (g ?? (g = /* @__PURE__ */ new Set())).add(k));
  for (R = 0; R < i; R += 1) {
    if (x = t[R], N = a(x, R), k = /** @type {EachItem} */
    l.get(N).e, e.outrogroups !== null)
      for (const M of e.outrogroups)
        M.pending.delete(k), M.done.delete(k);
    if ((k.f & it) !== 0 && (Lr(k), o && ((w = (E = k.nodes) == null ? void 0 : E.a) == null || w.unfix(), (g ?? (g = /* @__PURE__ */ new Set())).delete(k))), (k.f & Ft) !== 0)
      if (k.f ^= Ft, k === v)
        os(k, null, s);
      else {
        var q = p ? p.next : v;
        k === e.effect.last && (e.effect.last = k.prev), k.prev && (k.prev.next = k.next), k.next && (k.next.prev = k.prev), Qt(e, p, k), Qt(e, k, q), os(k, q, s), p = k, h = [], T = [], v = ss(p.next);
        continue;
      }
    if (k !== v) {
      if (c !== void 0 && c.has(k)) {
        if (h.length < T.length) {
          var z = T[0], A;
          p = z.prev;
          var Y = h[0], re = h[h.length - 1];
          for (A = 0; A < h.length; A += 1)
            os(h[A], z, s);
          for (A = 0; A < T.length; A += 1)
            c.delete(T[A]);
          Qt(e, Y.prev, re.next), Qt(e, p, Y), Qt(e, re, z), v = z, p = re, R -= 1, h = [], T = [];
        } else
          c.delete(k), os(k, v, s), Qt(e, k.prev, k.next), Qt(e, k, p === null ? e.effect.first : p.next), Qt(e, p, k), p = k;
        continue;
      }
      for (h = [], T = []; v !== null && v !== k; )
        (c ?? (c = /* @__PURE__ */ new Set())).add(v), T.push(v), v = ss(v.next);
      if (v === null)
        continue;
    }
    (k.f & Ft) === 0 && h.push(k), p = k, v = ss(k.next);
  }
  if (e.outrogroups !== null) {
    for (const M of e.outrogroups)
      M.pending.size === 0 && (Sr(e, Hs(M.done)), (I = e.outrogroups) == null || I.delete(M));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (v !== null || c !== void 0) {
    var Q = [];
    if (c !== void 0)
      for (k of c)
        (k.f & it) === 0 && Q.push(k);
    for (; v !== null; )
      (v.f & it) === 0 && v !== e.fallback && Q.push(v), v = ss(v.next);
    var ge = Q.length;
    if (ge > 0) {
      var W = (r & fa) !== 0 && i === 0 ? s : null;
      if (o) {
        for (R = 0; R < ge; R += 1)
          (S = (H = Q[R].nodes) == null ? void 0 : H.a) == null || S.measure();
        for (R = 0; R < ge; R += 1)
          (de = (X = Q[R].nodes) == null ? void 0 : X.a) == null || de.fix();
      }
      Zi(e, Q, W);
    }
  }
  o && on(() => {
    var M, U;
    if (g !== void 0)
      for (k of g)
        (U = (M = k.nodes) == null ? void 0 : M.a) == null || U.apply();
  });
}
function el(e, t, s, r, a, o, i, l) {
  var v = (i & Eo) !== 0 ? (i & To) === 0 ? /* @__PURE__ */ L(s, !1, !1) : $n(s) : null, c = (i & So) !== 0 ? $n(a) : null;
  return {
    v,
    i: c,
    e: Et(() => (o(t, v ?? s, c ?? a, l), () => {
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
      var i = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ ws(r)
      );
      if (o.before(r), r === a)
        return;
      r = i;
    }
}
function Qt(e, t, s) {
  t === null ? e.effect.first = s : t.next = s, s === null ? e.effect.last = t : s.prev = t;
}
function tl(e, t, s) {
  Gs(() => {
    var r = u(() => t(e, s == null ? void 0 : s()) || {});
    if (s && (r != null && r.update)) {
      var a = !1, o = (
        /** @type {any} */
        {}
      );
      Nn(() => {
        var i = s();
        Ne(i), a && Cr(o, i) && (o = i, r.update(i));
      }), a = !0;
    }
    if (r != null && r.destroy)
      return () => (
        /** @type {Function} */
        r.destroy()
      );
  });
}
const ia = [...` 	
\r\f \v\uFEFF`];
function nl(e, t, s) {
  var r = e == null ? "" : "" + e;
  if (t && (r = r ? r + " " + t : t), s) {
    for (var a of Object.keys(s))
      if (s[a])
        r = r ? r + " " + a : a;
      else if (r.length)
        for (var o = a.length, i = 0; (i = r.indexOf(a, i)) >= 0; ) {
          var l = i + o;
          (i === 0 || ia.includes(r[i - 1])) && (l === r.length || ia.includes(r[l])) ? r = (i === 0 ? "" : r.substring(0, i)) + r.substring(l + 1) : i = l;
        }
  }
  return r === "" ? null : r;
}
function sl(e, t) {
  return e == null ? null : String(e);
}
function jt(e, t, s, r, a, o) {
  var i = (
    /** @type {any} */
    e[ur]
  );
  if (i !== s || i === void 0) {
    var l = nl(s, r, o);
    l == null ? e.removeAttribute("class") : e.className = l, e[ur] = s;
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
    var o = sl(t);
    o == null ? e.removeAttribute("style") : e.style.cssText = o, e[dr] = t;
  }
  return r;
}
function Jr(e, t, s = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!Us(t))
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
    Jr(e, e.__value);
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
  }), Ys(() => {
    t.disconnect();
  });
}
function $r(e, t, s = t) {
  var r = /* @__PURE__ */ new WeakSet(), a = !0;
  Rr(e, "change", (o) => {
    var i = o ? "[selected]" : ":checked", l;
    if (e.multiple)
      l = [].map.call(e.querySelectorAll(i), cs);
    else {
      var v = e.querySelector(i) ?? // will fall back to first non-disabled option if no option is selected
      e.querySelector("option:not([disabled])");
      l = v && cs(v);
    }
    s(l), e.__value = l, ie !== null && r.add(ie);
  }), Gs(() => {
    var o = t();
    if (e === document.activeElement) {
      var i = (
        /** @type {Batch} */
        ie
      );
      if (r.has(i))
        return;
    }
    if (Jr(e, o, a), a && o === void 0) {
      var l = e.querySelector(":checked");
      l !== null && (o = cs(l), s(o));
    }
    e.__value = o, a = !1;
  }), oo(e);
}
function cs(e) {
  return "__value" in e ? e.__value : e.value;
}
const rl = Symbol("is custom element"), al = Symbol("is html"), ol = zo ? "progress" : "PROGRESS";
function qn(e, t) {
  var s = zr(e);
  s.value === (s.value = // treat null and undefined the same for the initial value
  t ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  e.value === t && (t !== 0 || e.nodeName !== ol) || (e.value = t ?? "");
}
function il(e, t) {
  var s = zr(e);
  s.checked !== (s.checked = // treat null and undefined the same for the initial value
  t ?? void 0) && (e.checked = t);
}
function Le(e, t, s, r) {
  var a = zr(e);
  a[t] !== (a[t] = s) && (t === "loading" && (e[Jo] = s), s == null ? e.removeAttribute(t) : typeof s != "string" && ll(e).includes(t) ? e[t] = s : e.setAttribute(t, s));
}
function zr(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    e[js] ?? (e[js] = {
      [rl]: e.nodeName.includes("-"),
      [al]: e.namespaceURI === ha
    })
  );
}
var la = /* @__PURE__ */ new Map();
function ll(e) {
  var t = e.getAttribute("is") || e.nodeName, s = la.get(t);
  if (s) return s;
  la.set(t, s = []);
  for (var r, a = e, o = Element.prototype; o !== a; ) {
    r = ba(a);
    for (var i in r)
      r[i].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      i !== "innerHTML" && i !== "textContent" && i !== "innerText" && s.push(i);
    a = Nr(a);
  }
  return s;
}
function ut(e, t, s = t) {
  var r = /* @__PURE__ */ new WeakSet();
  Rr(e, "input", async (a) => {
    var o = a ? e.defaultValue : e.value;
    if (o = sr(e) ? rr(o) : o, s(o), ie !== null && r.add(ie), await Di(), o !== (o = t())) {
      var i = e.selectionStart, l = e.selectionEnd, v = e.value.length;
      if (e.value = o ?? "", l !== null) {
        var c = e.value.length;
        i === l && l === v && c > v ? (e.selectionStart = c, e.selectionEnd = c) : (e.selectionStart = i, e.selectionEnd = Math.min(l, c));
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
  Rr(e, "change", (r) => {
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
  return Gs(() => {
    var i, l;
    return Nn(() => {
      i = l, l = [], u(() => {
        ar(s(...l), e) || (t(e, ...l), i && ar(s(...i), e) && t(null, ...i));
      });
    }), () => {
      let v = o;
      for (; v !== a && v.parent !== null && v.parent.f & cr; )
        v = v.parent;
      const c = () => {
        l && ar(s(...l), e) && t(null, ...l);
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
    const i = /* @__PURE__ */ Gn(() => {
      let l = !1;
      const v = t.s;
      for (const c in v)
        v[c] !== o[c] && (o[c] = v[c], l = !0);
      return l && a++, a;
    });
    r = () => n(i);
  }
  s.b.length && Ii(() => {
    va(t, r), lr(s.b);
  }), xr(() => {
    const a = u(() => s.m.map(Mo));
    return () => {
      for (const o of a)
        typeof o == "function" && o();
    };
  }), s.a.length && xr(() => {
    va(t, r), lr(s.a);
  });
}
function va(e, t) {
  if (e.l.s)
    for (const s of e.l.s) n(s);
  t();
}
function Ge(e, t, s, r) {
  var A;
  var a = !Zn || (s & No) !== 0, o = (s & Io) !== 0, i = (s & Oo) !== 0, l = (
    /** @type {V} */
    r
  ), v = !0, c = (
    /** @type {Derived<V> | undefined} */
    void 0
  ), p = () => i && a ? (c ?? (c = /* @__PURE__ */ Gn(
    /** @type {() => V} */
    r
  )), n(c)) : (v && (v = !1, l = i ? u(
    /** @type {() => V} */
    r
  ) : (
    /** @type {V} */
    r
  )), l);
  let g;
  if (o) {
    var h = Vt in e || Fo in e;
    g = ((A = Mn(e, t)) == null ? void 0 : A.set) ?? (h && t in e ? (Y) => e[t] = Y : void 0);
  }
  var T, x = !1;
  o ? [T, x] = ii(() => (
    /** @type {V} */
    e[t]
  )) : T = /** @type {V} */
  e[t], T === void 0 && r !== void 0 && (T = p(), g && (a && Ko(), g(T)));
  var N;
  if (a ? N = () => {
    var Y = (
      /** @type {V} */
      e[t]
    );
    return Y === void 0 ? p() : (v = !0, Y);
  } : N = () => {
    var Y = (
      /** @type {V} */
      e[t]
    );
    return Y !== void 0 && (l = /** @type {V} */
    void 0), Y === void 0 ? l : Y;
  }, a && (s & Co) === 0)
    return N;
  if (g) {
    var k = e.$$legacy;
    return (
      /** @type {() => V} */
      (function(Y, re) {
        return arguments.length > 0 ? ((!a || !re || k || x) && g(re ? N() : Y), Y) : N();
      })
    );
  }
  var R = !1, q = ((s & jo) !== 0 ? Gn : Xe)(() => (R = !1, N()));
  o && n(q);
  var z = (
    /** @type {Effect} */
    me
  );
  return (
    /** @type {() => V} */
    (function(Y, re) {
      if (arguments.length > 0) {
        const Q = re ? n(q) : a && o ? Rn(Y) : Y;
        return _(q, Q), R = !0, l !== void 0 && (l = Q), Y;
      }
      return Gt && R || (z.f & $t) !== 0 ? q.v : n(q);
    })
  );
}
const ot = es({ nodes: {}, edges: [], toolEdges: [] }), vn = es(null), Rs = es(null), An = es({
  triggerType: "rest",
  description: "",
  cronExpression: "",
  webhookUrl: ""
});
function vl(e) {
  ot.update((t) => ({ ...t, edges: [...t.edges, e] }));
}
var cl = /* @__PURE__ */ xs('<line stroke-width="2" marker-end="url(#arrow)"></line>'), ul = /* @__PURE__ */ xs('<line stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.8"></line>'), dl = /* @__PURE__ */ xs('<circle cx="148" cy="8" r="8" fill="#f59e0b"></circle><text x="148" y="12" fill="#000" font-size="8" font-family="monospace" text-anchor="middle"> </text>', 1), fl = /* @__PURE__ */ xs('<g style="cursor:pointer" role="button" tabindex="0"><rect width="160" height="40" rx="6"></rect><text x="12" y="14" fill="#94a3b8" font-size="9" font-family="monospace"> </text><text x="12" y="29" fill="#e2e8f0" font-size="12" font-family="system-ui"> </text><!><circle cx="160" cy="20" r="5" class="port port-out"></circle><circle cx="0" cy="20" r="5" class="port port-in"></circle></g>'), pl = /* @__PURE__ */ xs('<line stroke="#7c6af7" stroke-width="1.5" stroke-dasharray="6,3" pointer-events="none"></line>'), hl = /* @__PURE__ */ $('<input class="picker-input svelte-1lehbkp" type="text" placeholder="JSONata expression"/> <button class="picker-btn picker-add svelte-1lehbkp">Add</button>', 1), _l = /* @__PURE__ */ $('<div class="edge-picker svelte-1lehbkp"><button class="picker-btn svelte-1lehbkp">Unconditional</button> <button class="picker-btn svelte-1lehbkp">Fallback</button> <button class="picker-btn svelte-1lehbkp">Conditional</button> <!> <button class="picker-btn picker-cancel svelte-1lehbkp">Cancel</button></div>'), gl = /* @__PURE__ */ $('<div class="empty-hint svelte-1lehbkp">Drag nodes from the palette to build your agent graph</div>'), bl = /* @__PURE__ */ $('<div class="canvas-wrap svelte-1lehbkp" role="presentation"><svg style="width:100%;height:100%"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#7c6af7"></path></marker></defs><!><!><!><!></svg> <!> <!></div>');
function ml(e, t) {
  et(t, !1);
  const s = () => nt(ot, "$graph", a), r = () => nt(vn, "$selectedNode", a), [a, o] = Wt(), i = /* @__PURE__ */ L();
  Ge(t, "agentId", 8);
  const l = /* @__PURE__ */ new Set(["core:tool", "core:mcp-client"]), v = /* @__PURE__ */ new Set(["core:tool-call", "core:react"]);
  let c = /* @__PURE__ */ L([]), p = /* @__PURE__ */ L([]), g = /* @__PURE__ */ L([]), h = null, T = { x: 0, y: 0 }, x = /* @__PURE__ */ L(), N = /* @__PURE__ */ L({ x: 0, y: 0, w: 1e3, h: 600 }), k = !1, R = { mx: 0, my: 0, vbx: 0, vby: 0 }, q = /* @__PURE__ */ L(null), z = /* @__PURE__ */ L({ x: 0, y: 0 }), A = /* @__PURE__ */ L(null), Y = /* @__PURE__ */ L({ x: 0, y: 0 }), re = /* @__PURE__ */ L(""), Q = /* @__PURE__ */ L(!1);
  function ge(O) {
    vn.set(O);
  }
  function W(O) {
    const j = s().nodes[O];
    return (j == null ? void 0 : j.position) ?? { x: 100, y: 100 };
  }
  function F(O, j) {
    const K = n(x).createSVGPoint();
    K.x = O, K.y = j;
    const te = K.matrixTransform(n(x).getScreenCTM().inverse());
    return { x: te.x, y: te.y };
  }
  function m(O, j) {
    return O.addEventListener("wheel", j, { passive: !1 }), {
      destroy() {
        O.removeEventListener("wheel", j);
      }
    };
  }
  function E(O) {
    O.preventDefault();
    const j = O.deltaY > 0 ? 1.1 : 0.9, K = n(x).getBoundingClientRect(), te = (O.clientX - K.left) / K.width * n(N).w + n(N).x, be = (O.clientY - K.top) / K.height * n(N).h + n(N).y;
    _(N, {
      x: te - (te - n(N).x) * j,
      y: be - (be - n(N).y) * j,
      w: n(N).w * j,
      h: n(N).h * j
    });
  }
  function w(O) {
    const j = O.target;
    j.closest("g") || j.tagName === "circle" || (k = !0, R = {
      mx: O.clientX,
      my: O.clientY,
      vbx: n(N).x,
      vby: n(N).y
    });
  }
  function I(O, j) {
    const K = F(O.clientX, O.clientY), te = j.position ?? { x: 100, y: 100 };
    h = j, T = { x: K.x - te.x, y: K.y - te.y };
  }
  function H(O, j) {
    const K = F(O.clientX, O.clientY);
    _(q, { fromNodeId: j, x: K.x, y: K.y }), _(z, K);
  }
  function S(O) {
    if (n(q) && n(q).fromNodeId !== O) {
      const j = n(x).getBoundingClientRect();
      _(Y, {
        x: (n(z).x - n(N).x) / n(N).w * j.width,
        y: (n(z).y - n(N).y) / n(N).h * j.height
      }), _(A, { from: n(q).fromNodeId, to: O });
    }
    _(q, null);
  }
  function X(O) {
    if (k) {
      const j = n(N).w / n(x).clientWidth, K = n(N).h / n(x).clientHeight;
      _(N, {
        ...n(N),
        x: R.vbx - (O.clientX - R.mx) * j,
        y: R.vby - (O.clientY - R.my) * K
      });
    }
    if (h) {
      const j = F(O.clientX, O.clientY), K = h.id;
      ot.update((te) => ({
        ...te,
        nodes: {
          ...te.nodes,
          [K]: {
            ...te.nodes[K],
            position: { x: j.x - T.x, y: j.y - T.y }
          }
        }
      }));
    }
    n(q) && _(z, F(O.clientX, O.clientY));
  }
  function de() {
    k = !1, h = null, _(q, null);
  }
  function M(O, j) {
    if (!n(A)) return;
    const K = {
      id: `e-${Date.now()}`,
      from: n(A).from,
      to: n(A).to,
      type: O,
      ...j ? { condition: j } : {}
    };
    vl(K), _(A, null), _(Q, !1), _(re, "");
  }
  Ye(() => s(), () => {
    _(c, Object.values(s().nodes)), _(p, s().edges), _(g, s().toolEdges ?? []);
  }), Ye(() => n(g), () => {
    _(i, n(g).reduce(
      (O, j) => (O[j.to] = (O[j.to] ?? 0) + 1, O),
      {}
    ));
  }), cn(), st();
  var U = bl(), C = d(U), B = f(d(C));
  qe(B, 1, () => n(p), Re, (O, j) => {
    const K = /* @__PURE__ */ Xe(() => (n(j), u(() => W(n(j).from)))), te = /* @__PURE__ */ Xe(() => (n(j), u(() => W(n(j).to))));
    var be = cl();
    D(() => {
      Le(be, "x1", (Ne(n(K)), u(() => n(K).x + 160))), Le(be, "y1", (Ne(n(K)), u(() => n(K).y + 20))), Le(be, "x2", (Ne(n(te)), u(() => n(te).x))), Le(be, "y2", (Ne(n(te)), u(() => n(te).y + 20))), Le(be, "stroke", (n(j), u(() => n(j).type === "fallback" ? "#94a3b8" : "#7c6af7"))), Le(be, "stroke-dasharray", (n(j), u(() => n(j).type === "fallback" ? "4" : "0")));
    }), y(O, be);
  });
  var ye = f(B);
  qe(ye, 1, () => n(g), Re, (O, j) => {
    const K = /* @__PURE__ */ Xe(() => (n(j), u(() => W(n(j).from)))), te = /* @__PURE__ */ Xe(() => (n(j), u(() => W(n(j).to))));
    var be = ul();
    D(() => {
      Le(be, "x1", (Ne(n(K)), u(() => n(K).x + 160))), Le(be, "y1", (Ne(n(K)), u(() => n(K).y + 20))), Le(be, "x2", (Ne(n(te)), u(() => n(te).x))), Le(be, "y2", (Ne(n(te)), u(() => n(te).y + 20)));
    }), y(O, be);
  });
  var oe = f(ye);
  qe(oe, 1, () => n(c), Re, (O, j) => {
    const K = /* @__PURE__ */ Xe(() => (n(j), u(() => n(j).position ?? { x: 100, y: 100 }))), te = /* @__PURE__ */ Xe(() => (n(j), u(() => l.has(n(j).type)))), be = /* @__PURE__ */ Xe(() => (n(j), u(() => v.has(n(j).type)))), Ie = /* @__PURE__ */ Xe(() => (r(), n(j), u(() => {
      var Z;
      return ((Z = r()) == null ? void 0 : Z.id) === n(j).id;
    }))), Me = /* @__PURE__ */ Xe(() => (n(i), n(j), u(() => n(i)[n(j).id] ?? 0)));
    var xe = fl(), ne = d(xe), ve = f(ne), ae = d(ve), fe = f(ve), Oe = d(fe), We = f(fe);
    {
      var He = (Z) => {
        var ce = dl(), je = f(Ae(ce)), Je = d(je);
        D(() => P(Je, n(Me))), y(Z, ce);
      };
      V(We, (Z) => {
        n(be) && n(Me) > 0 && Z(He);
      });
    }
    var Be = f(We), J = f(Be);
    D(() => {
      Le(xe, "transform", `translate(${Ne(n(K)), u(() => n(K).x) ?? ""},${Ne(n(K)), u(() => n(K).y) ?? ""})`), Le(ne, "fill", n(Ie) ? n(te) ? "#2d1f00" : "#312e7a" : n(te) ? "#1e1600" : "#1e2035"), Le(ne, "stroke", n(Ie) ? n(te) ? "#f59e0b" : "#7c6af7" : n(te) ? "#b45309" : "#2d3148"), Le(ne, "stroke-width", n(te) ? "2" : "1.5"), P(ae, (n(j), u(() => n(j).type))), P(Oe, (n(j), u(() => n(j).label ?? n(j).id)));
    }), G("mousedown", Be, or((Z) => H(Z, n(j).id))), G("mouseup", J, or(() => S(n(j).id))), G("click", xe, () => ge(n(j))), G("keydown", xe, (Z) => Z.key === "Enter" && ge(n(j))), G("mousedown", xe, or((Z) => I(Z, n(j)))), y(O, xe);
  });
  var pe = f(oe);
  {
    var le = (O) => {
      var j = pl();
      D(() => {
        Le(j, "x1", (n(q), u(() => n(q).x))), Le(j, "y1", (n(q), u(() => n(q).y))), Le(j, "x2", (n(z), u(() => n(z).x))), Le(j, "y2", (n(z), u(() => n(z).y)));
      }), y(O, j);
    };
    V(pe, (O) => {
      n(q) && O(le);
    });
  }
  lo(C, (O) => _(x, O), () => n(x)), tl(C, (O, j) => m == null ? void 0 : m(O, j), () => E), Gs(() => G("mousedown", C, w));
  var se = f(C, 2);
  {
    var ee = (O) => {
      var j = _l(), K = d(j), te = f(K, 2), be = f(te, 2), Ie = f(be, 2);
      {
        var Me = (ne) => {
          var ve = hl(), ae = Ae(ve), fe = f(ae, 2);
          ut(ae, () => n(re), (Oe) => _(re, Oe)), G("click", fe, () => M("conditional", n(re))), y(ne, ve);
        };
        V(Ie, (ne) => {
          n(Q) && ne(Me);
        });
      }
      var xe = f(Ie, 2);
      D(() => ao(j, `left:${n(Y), u(() => n(Y).x) ?? ""}px;top:${n(Y), u(() => n(Y).y) ?? ""}px`)), G("click", K, () => M("unconditional")), G("click", te, () => M("fallback")), G("click", be, () => {
        _(Q, !n(Q));
      }), G("click", xe, () => {
        _(A, null), _(Q, !1);
      }), y(O, j);
    };
    V(se, (O) => {
      n(A) && O(ee);
    });
  }
  var ue = f(se, 2);
  {
    var $e = (O) => {
      var j = gl();
      y(O, j);
    };
    V(ue, (O) => {
      n(c), u(() => n(c).length === 0) && O($e);
    });
  }
  D(() => Le(C, "viewBox", `${n(N), u(() => n(N).x) ?? ""} ${n(N), u(() => n(N).y) ?? ""} ${n(N), u(() => n(N).w) ?? ""} ${n(N), u(() => n(N).h) ?? ""}`)), G("mousemove", U, X), G("mouseup", U, de), G("mouseleave", U, de), y(e, U), tt(), o();
}
const us = es([]);
var yl = /* @__PURE__ */ $('<button class="palette-item svelte-142uvrg"><span class="node-name svelte-142uvrg"> </span> <span class="node-type svelte-142uvrg"> </span></button>'), wl = /* @__PURE__ */ $('<div class="palette svelte-142uvrg"><div class="palette-header svelte-142uvrg">Nodes</div> <!></div>');
function xl(e, t) {
  et(t, !1);
  const s = () => nt(us, "$nodeTypes", r), [r, a] = Wt();
  Ks(async () => {
    try {
      const v = await fetch("/api/nodes");
      v.ok && us.set(await v.json());
    } catch {
      us.set([
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
  });
  function o(v, c) {
    const p = `${v.replace(":", "_")}_${Date.now()}`;
    ot.update((g) => ({
      ...g,
      nodes: {
        ...g.nodes,
        [p]: {
          id: p,
          type: v,
          label: c,
          config: {},
          position: { x: 200, y: 200 }
        }
      }
    }));
  }
  st();
  var i = wl(), l = f(d(i), 2);
  qe(l, 1, s, Re, (v, c) => {
    var p = yl(), g = d(p), h = d(g), T = f(g, 2), x = d(T);
    D(() => {
      P(h, n(c).meta.name), P(x, n(c).type);
    }), G("click", p, () => o(n(c).type, n(c).meta.name)), y(v, p);
  }), y(e, i), tt(), a();
}
var kl = /* @__PURE__ */ $('<div class="expr-editor svelte-c939oi"><textarea class="expr-textarea svelte-c939oi" rows="3" spellcheck="false" autocomplete="off" autocorrect="off"></textarea> <div class="expr-actions svelte-c939oi"><span class="expr-hint svelte-c939oi">JSONata</span> <button class="eval-btn svelte-c939oi" title="Evaluate against last run context">▶ Evaluate</button></div></div>');
function El(e, t) {
  et(t, !1);
  let s = Ge(t, "value", 12, ""), r = Ge(t, "placeholder", 8, "JSONata expression...");
  Ge(t, "fieldName", 8, "");
  const a = ro();
  function o(g) {
    s(g.target.value), a("change", s());
  }
  function i() {
    a("evaluate", s());
  }
  st();
  var l = kl(), v = d(l), c = f(v, 2), p = f(d(c), 2);
  D(() => {
    Le(v, "placeholder", r()), qn(v, s());
  }), G("input", v, o), G("click", p, i), y(e, l), tt();
}
var Sl = /* @__PURE__ */ $('<input type="text" placeholder="connection ID" class="svelte-awrrrl"/>'), $l = /* @__PURE__ */ $("<option> </option>"), Tl = /* @__PURE__ */ $('<div class="hint svelte-awrrrl"> </div>'), jl = /* @__PURE__ */ $('<select class="svelte-awrrrl"><option>— select a connection —</option><!></select> <!>', 1);
function Nl(e, t) {
  et(t, !1);
  let s = Ge(t, "value", 8, ""), r = Ge(t, "service", 8, void 0), a = Ge(t, "onChange", 8), o = /* @__PURE__ */ L([]), i = /* @__PURE__ */ L(!1);
  Ks(async () => {
    try {
      const g = await fetch("/api/integrations/connections");
      if (!g.ok) throw new Error(String(g.status));
      const h = await g.json();
      _(o, r() ? h.filter((T) => T.service === r()) : h);
    } catch {
      _(i, !0);
    }
  }), st();
  var l = Kt(), v = Ae(l);
  {
    var c = (g) => {
      var h = Sl();
      D(() => qn(h, s())), G("input", h, (T) => a()(T.target.value)), y(g, h);
    }, p = (g) => {
      var h = jl(), T = Ae(h), x = d(T);
      x.value = x.__value = "";
      var N = f(x);
      qe(N, 1, () => n(o), Re, (z, A) => {
        var Y = $l(), re = d(Y), Q = {};
        D(() => {
          P(re, `${n(A), u(() => n(A).displayName) ?? ""} (${n(A), u(() => n(A).service) ?? ""}${n(A), u(() => n(A).status !== "active" ? ` — ${n(A).status}` : "") ?? ""})`), Q !== (Q = (n(A), u(() => n(A).id))) && (Y.value = (Y.__value = (n(A), u(() => n(A).id))) ?? "");
        }), y(z, Y);
      });
      var k;
      oo(T);
      var R = f(T, 2);
      {
        var q = (z) => {
          var A = Tl(), Y = d(A);
          D(() => P(Y, `No ${r() ?? "integration" ?? ""} connections. Create one in Admin → Integration Connections.`)), y(z, A);
        };
        V(R, (z) => {
          n(o), u(() => n(o).length === 0) && z(q);
        });
      }
      D(() => {
        k !== (k = s()) && (T.value = (T.__value = s()) ?? "", Jr(T, s()));
      }), G("change", T, (z) => a()(z.target.value)), y(g, h);
    };
    V(v, (g) => {
      n(i) ? g(c) : g(p, -1);
    });
  }
  y(e, l), tt();
}
var Cl = /* @__PURE__ */ $('<textarea rows="4" class="svelte-b5q3h1"></textarea>'), Il = /* @__PURE__ */ $('<input type="text" placeholder="comma-separated values" class="svelte-b5q3h1"/>'), Ol = /* @__PURE__ */ $('<input type="checkbox" style="width:auto" class="svelte-b5q3h1"/>'), Al = /* @__PURE__ */ $('<div class="eval-result svelte-b5q3h1"> </div>'), Pl = /* @__PURE__ */ $('<!> <!> <button class="mode-toggle-btn svelte-b5q3h1">← Value Picker mode</button>', 1), Rl = /* @__PURE__ */ $('<button class="picker-btn svelte-b5q3h1" title="Reference upstream node output">↗</button>'), ql = /* @__PURE__ */ $('<button class="picker-option svelte-b5q3h1"><span class="picker-node svelte-b5q3h1"> </span> <span class="picker-ref svelte-b5q3h1"> </span></button>'), Ml = /* @__PURE__ */ $('<div class="picker-dropdown svelte-b5q3h1"><div class="picker-label svelte-b5q3h1">Insert reference to:</div> <!></div>'), Dl = /* @__PURE__ */ $('<div class="field-with-picker svelte-b5q3h1"><input type="text" class="svelte-b5q3h1"/> <!> <button class="expr-toggle-btn svelte-b5q3h1" title="Switch to JSONata expression editor">ƒ</button></div> <!>', 1), Ll = /* @__PURE__ */ $('<div class="form-group svelte-b5q3h1"><label class="svelte-b5q3h1"> </label> <!></div>'), Fl = /* @__PURE__ */ $('<div class="panel-section svelte-b5q3h1"><div class="panel-header svelte-b5q3h1"><span> </span> <button class="close-btn svelte-b5q3h1">✕</button></div> <div class="form-group svelte-b5q3h1"><label class="svelte-b5q3h1">Label</label> <input type="text" class="svelte-b5q3h1"/></div> <!> <button class="btn-danger svelte-b5q3h1">Remove node</button></div>');
function Jl(e, t) {
  et(t, !1);
  const s = () => nt(us, "$nodeTypes", a), r = () => nt(ot, "$graph", a), [a, o] = Wt(), i = /* @__PURE__ */ L(), l = /* @__PURE__ */ L(), v = /* @__PURE__ */ L();
  let c = Ge(t, "node", 8), p = /* @__PURE__ */ L(null), g = /* @__PURE__ */ L(
    null
    // field currently in expression editor mode
  ), h = /* @__PURE__ */ L(
    {}
    // fieldKey → eval result
  );
  function T(w) {
    var S, X;
    const I = s().find((de) => de.type === w.type), H = (X = (S = I == null ? void 0 : I.schema) == null ? void 0 : S.output) == null ? void 0 : X.properties;
    return H && Object.keys(H).length > 0 ? Object.keys(H) : ["output"];
  }
  async function x(w, I) {
    try {
      const S = await (await fetch("/studio/evaluate-expression", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression: I })
      })).json();
      _(h, {
        ...n(h),
        [w]: S.error ? `Error: ${S.error}` : JSON.stringify(S.result)
      });
    } catch {
      _(h, { ...n(h), [w]: "Request failed" });
    }
  }
  function N(w, I) {
    ot.update((H) => ({
      ...H,
      nodes: {
        ...H.nodes,
        [c().id]: { ...c(), config: { ...c().config, [w]: I } }
      }
    }));
  }
  function k(w) {
    ot.update((I) => ({
      ...I,
      nodes: { ...I.nodes, [c().id]: { ...c(), label: w } }
    }));
  }
  function R() {
    ot.update((w) => {
      const I = { ...w.nodes };
      return delete I[c().id], {
        ...w,
        nodes: I,
        edges: w.edges.filter((H) => H.from !== c().id && H.to !== c().id)
      };
    }), vn.set(null);
  }
  function q(w) {
    return c().config[w] ?? void 0;
  }
  function z(w, I, H) {
    N(w, `$.${H}`), _(p, null);
  }
  Ye(() => (s(), Ne(c())), () => {
    _(i, s().find((w) => w.type === c().type));
  }), Ye(() => n(i), () => {
    var w, I, H;
    _(l, ((H = (I = (w = n(i)) == null ? void 0 : w.schema) == null ? void 0 : I.config) == null ? void 0 : H.properties) ?? {});
  }), Ye(() => (r(), Ne(c())), () => {
    _(v, Object.values(r().nodes).filter((w) => r().edges.some((I) => I.to === c().id && I.from === w.id)));
  }), Ye(() => Ne(c()), () => {
    var w;
    (w = c()) != null && w.id && (_(g, null), _(h, {}), _(p, null));
  }), cn(), st();
  var A = Fl(), Y = d(A), re = d(Y), Q = d(re), ge = f(re, 2), W = f(Y, 2), F = f(d(W), 2), m = f(W, 2);
  qe(
    m,
    1,
    () => (n(l), u(() => Object.entries(n(l)))),
    Re,
    (w, I) => {
      var H = /* @__PURE__ */ Kn(() => Do(n(I), 2));
      let S = () => n(H)[0], X = () => n(H)[1];
      var de = Ll(), M = d(de), U = d(M), C = f(M, 2);
      {
        var B = (se) => {
          {
            let ee = /* @__PURE__ */ Xe(() => (S(), u(() => String(q(S()) ?? ""))));
            Nl(se, {
              get value() {
                return n(ee);
              },
              get service() {
                return X(), u(() => X().service);
              },
              onChange: (ue) => N(S(), ue)
            });
          }
        }, ye = (se) => {
          var ee = Cl();
          D((ue) => qn(ee, ue), [
            () => (S(), u(() => JSON.stringify(q(S()) ?? {}, null, 2)))
          ]), G("blur", ee, (ue) => {
            try {
              N(S(), JSON.parse(ue.target.value));
            } catch {
            }
          }), y(se, ee);
        }, oe = (se) => {
          var ee = Il();
          D((ue) => qn(ee, ue), [
            () => (S(), u(() => Array.isArray(q(S())) ? q(S()).join(", ") : String(q(S()) ?? "")))
          ]), G("input", ee, (ue) => N(S(), ue.target.value.split(",").map(($e) => $e.trim()).filter(Boolean))), y(se, ee);
        }, pe = (se) => {
          var ee = Ol();
          D((ue) => il(ee, ue), [() => (S(), u(() => !!q(S())))]), G("change", ee, (ue) => N(S(), ue.target.checked)), y(se, ee);
        }, le = (se) => {
          var ee = Kt(), ue = Ae(ee);
          {
            var $e = (j) => {
              var K = Pl(), te = Ae(K);
              {
                let xe = /* @__PURE__ */ Xe(() => (S(), u(() => String(q(S()) ?? ""))));
                El(te, {
                  get value() {
                    return n(xe);
                  },
                  get fieldName() {
                    return S();
                  },
                  $$events: {
                    change: (ne) => N(S(), ne.detail),
                    evaluate: (ne) => x(S(), ne.detail)
                  }
                });
              }
              var be = f(te, 2);
              {
                var Ie = (xe) => {
                  var ne = Al(), ve = d(ne);
                  D((ae) => P(ve, ae), [
                    () => (n(h), S(), u(() => String(n(h)[S()])))
                  ]), y(xe, ne);
                };
                V(be, (xe) => {
                  n(h), S(), u(() => n(h)[S()]) && xe(Ie);
                });
              }
              var Me = f(be, 2);
              G("click", Me, () => {
                _(g, null), _(h, { ...n(h), [S()]: void 0 });
              }), y(j, K);
            }, O = (j) => {
              var K = Dl(), te = Ae(K), be = d(te), Ie = f(be, 2);
              {
                var Me = (ae) => {
                  var fe = Rl();
                  G("click", fe, () => {
                    _(p, n(p) === S() ? null : S());
                  }), y(ae, fe);
                };
                V(Ie, (ae) => {
                  n(v), u(() => n(v).length > 0) && ae(Me);
                });
              }
              var xe = f(Ie, 2), ne = f(te, 2);
              {
                var ve = (ae) => {
                  var fe = Ml(), Oe = f(d(fe), 2);
                  qe(Oe, 1, () => n(v), Re, (We, He) => {
                    var Be = Kt(), J = Ae(Be);
                    qe(
                      J,
                      1,
                      () => (n(He), u(() => T(n(He)))),
                      Re,
                      (Z, ce) => {
                        var je = ql(), Je = d(je), ke = d(Je), Ce = f(Je, 2), Ee = d(Ce);
                        D(() => {
                          P(ke, (n(He), u(() => n(He).label ?? n(He).id))), P(Ee, `$.${n(ce) ?? ""}`);
                        }), G("click", je, () => z(S(), n(He).id, n(ce))), y(Z, je);
                      }
                    ), y(We, Be);
                  }), y(ae, fe);
                };
                V(ne, (ae) => {
                  n(p), S(), n(v), u(() => n(p) === S() && n(v).length > 0) && ae(ve);
                });
              }
              D((ae) => qn(be, ae), [
                () => (S(), u(() => String(q(S()) ?? "")))
              ]), G("input", be, (ae) => N(S(), ae.target.value)), G("click", xe, () => {
                _(g, S()), _(p, null);
              }), y(j, K);
            };
            V(ue, (j) => {
              n(g) === S() ? j($e) : j(O, -1);
            });
          }
          y(se, ee);
        };
        V(C, (se) => {
          X(), u(() => X().format === "connection") ? se(B) : (X(), u(() => X().type === "object") ? se(ye, 1) : (X(), u(() => X().type === "array") ? se(oe, 2) : (X(), u(() => X().type === "boolean") ? se(pe, 3) : se(le, -1))));
        });
      }
      D(() => P(U, (X(), S(), u(() => X().description ?? S())))), y(w, de);
    }
  );
  var E = f(m, 2);
  D(() => {
    P(Q, `Node: ${Ne(c()), u(() => c().type) ?? ""}`), qn(F, (Ne(c()), u(() => c().label ?? "")));
  }), G("click", ge, () => vn.set(null)), G("input", F, (w) => k(w.target.value)), G("click", E, R), y(e, A), tt(), o();
}
var zl = /* @__PURE__ */ $('<div class="agent-name svelte-5tjmbm"> </div> <div> </div>', 1), Ul = /* @__PURE__ */ $('<div class="status-msg svelte-5tjmbm"> </div>'), Hl = /* @__PURE__ */ $('<div class="status-msg svelte-5tjmbm"> </div>'), Bl = /* @__PURE__ */ $('<div class="status-msg svelte-5tjmbm"> </div>'), Vl = /* @__PURE__ */ $('<button class="btn-revert svelte-5tjmbm"> </button> <!>', 1), Yl = /* @__PURE__ */ $('<span class="trigger-filter svelte-5tjmbm"> </span>'), Gl = /* @__PURE__ */ $('<div class="trigger-row svelte-5tjmbm"><div class="trigger-info svelte-5tjmbm"><span class="trigger-service svelte-5tjmbm"> </span> <!> <code class="trigger-url svelte-5tjmbm"> </code></div> <button class="trigger-remove svelte-5tjmbm" title="Remove trigger">✕</button></div>'), Kl = /* @__PURE__ */ $('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Registered Triggers</label> <!></div>'), Wl = /* @__PURE__ */ $("<option> </option>"), Xl = /* @__PURE__ */ $('<div class="status-msg svelte-5tjmbm"> </div>'), Zl = /* @__PURE__ */ $(`<!> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Service</label> <select class="svelte-5tjmbm"><option>— select a service —</option><!></select></div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Event Filter (optional)</label> <input type="text" placeholder="e.g. app_mention — blank for all events" class="svelte-5tjmbm"/></div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Signing Secret</label> <input type="password" placeholder="the service's webhook signing secret" class="svelte-5tjmbm"/> <div class="field-hint svelte-5tjmbm">Used to verify inbound event signatures. Never displayed after registration.</div></div> <button class="btn-save svelte-5tjmbm"> </button> <!>`, 1), Ql = /* @__PURE__ */ $('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Cron Expression</label> <input type="text" placeholder="0 * * * * (every hour)" class="svelte-5tjmbm"/> <div class="field-hint svelte-5tjmbm">Standard cron format: minute hour day month weekday</div></div>'), ev = /* @__PURE__ */ $('<div class="webhook-url svelte-5tjmbm"><code class="svelte-5tjmbm"> </code> <div class="field-hint svelte-5tjmbm">POST your payload to this URL. No auth headers required.</div></div>'), tv = /* @__PURE__ */ $('<div class="field-hint svelte-5tjmbm">Publish the agent to generate the webhook URL.</div>'), nv = /* @__PURE__ */ $('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Webhook URL</label> <!></div>'), sv = /* @__PURE__ */ $('<div class="status-msg svelte-5tjmbm"> </div>'), rv = /* @__PURE__ */ $('<div class="panel-section svelte-5tjmbm"><div class="panel-header svelte-5tjmbm">Agent</div> <!> <div class="btn-row svelte-5tjmbm"><button class="btn-draft svelte-5tjmbm"> </button> <button class="btn-publish svelte-5tjmbm"> </button></div> <!> <!> <!></div> <div class="panel-section svelte-5tjmbm"><div class="panel-header svelte-5tjmbm">Trigger Config</div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Trigger Type</label> <select class="svelte-5tjmbm"><option>REST API</option><option>Scheduled (Cron)</option><option>Webhook</option><option>Integration Event</option></select></div> <!> <!> <!> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Description</label> <input type="text" placeholder="What does this agent do?" class="svelte-5tjmbm"/></div> <button class="btn-save svelte-5tjmbm"> </button> <!></div>', 1);
function av(e, t) {
  et(t, !1);
  const s = () => nt(ot, "$graph", o), r = () => nt(An, "$agentConfig", o), a = () => nt(Rs, "$agent", o), [o, i] = Wt();
  let l = Ge(t, "agentId", 8), v = /* @__PURE__ */ L(!1), c = /* @__PURE__ */ L(""), p = /* @__PURE__ */ L(!1), g = /* @__PURE__ */ L(""), h = /* @__PURE__ */ L(!1), T = /* @__PURE__ */ L(""), x = /* @__PURE__ */ L(!1), N = /* @__PURE__ */ L(""), k = /* @__PURE__ */ L([]), R = /* @__PURE__ */ L([]), q = /* @__PURE__ */ L(""), z = /* @__PURE__ */ L(""), A = /* @__PURE__ */ L(""), Y = /* @__PURE__ */ L(""), re = /* @__PURE__ */ L(!1);
  Ks(async () => {
    try {
      const [J, Z] = await Promise.all([
        fetch("/api/integrations"),
        fetch("/api/integrations/triggers")
      ]);
      if (J.ok) {
        const ce = await J.json();
        _(k, ce.filter((je) => je.hasTrigger));
      }
      if (Z.ok) {
        const ce = await Z.json();
        _(R, ce.filter((je) => je.agentId === l()));
      }
    } catch {
    }
  });
  async function Q() {
    _(re, !0), _(Y, "");
    try {
      const J = await fetch("/api/integrations/triggers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: n(q),
          agentId: l(),
          eventFilter: n(z) || void 0,
          secret: n(A)
        })
      });
      if (!J.ok) throw new Error("Registration failed");
      const Z = await J.json();
      _(R, [...n(R), Z]), _(A, ""), _(z, ""), _(Y, "✓ Trigger registered");
    } catch (J) {
      _(Y, "✗ " + (J instanceof Error ? J.message : "Error"));
    } finally {
      _(re, !1);
    }
  }
  async function ge(J) {
    try {
      const Z = await fetch(`/api/integrations/triggers/${J}`, { method: "DELETE" });
      (Z.ok || Z.status === 204) && _(R, n(R).filter((ce) => ce.id !== J));
    } catch {
    }
  }
  async function W() {
    _(v, !0), _(c, "");
    try {
      const J = JSON.stringify(s());
      if (!(await fetch(`/api/agents/${l()}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ graphJson: J })
      })).ok) throw new Error("Publish failed");
      _(c, "✓ Published");
      const ce = await fetch(`/api/agents/${l()}`);
      ce.ok && Rs.set(await ce.json());
    } catch (J) {
      _(c, "✗ " + (J instanceof Error ? J.message : "Error"));
    } finally {
      _(v, !1);
    }
  }
  async function F() {
    _(h, !0), _(T, "");
    try {
      if (!(await fetch(`/api/agents/${l()}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftGraphJson: JSON.stringify(s()) })
      })).ok) throw new Error("Save failed");
      _(T, "✓ Draft saved");
    } catch (J) {
      _(T, "✗ " + (J instanceof Error ? J.message : "Error"));
    } finally {
      _(h, !1);
    }
  }
  async function m() {
    _(x, !0), _(N, "");
    try {
      const J = await fetch(`/api/agents/${l()}/draft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (!J.ok) throw new Error("Revert failed");
      Rs.set(await J.json()), _(N, "✓ Reverted to draft");
    } catch (J) {
      _(N, "✗ " + (J instanceof Error ? J.message : "Error"));
    } finally {
      _(x, !1);
    }
  }
  async function E() {
    _(p, !0), _(g, "");
    try {
      const J = { type: r().triggerType };
      if (r().triggerType === "cron" && (J.expression = r().cronExpression), !(await fetch(`/api/agents/${l()}/config`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ triggerConfig: J })
      })).ok) throw new Error("Save failed");
      if (_(g, "✓ Saved"), r().triggerType === "webhook") {
        const ce = await fetch(`/api/agents/${l()}/config`);
        if (ce.ok) {
          const je = await ce.json();
          An.update((Je) => {
            var ke;
            return { ...Je, webhookUrl: ((ke = je.triggerConfig) == null ? void 0 : ke.webhookUrl) ?? "" };
          });
        }
      }
    } catch (J) {
      _(g, "✗ " + (J instanceof Error ? J.message : "Error"));
    } finally {
      _(p, !1);
    }
  }
  st();
  var w = rv(), I = Ae(w), H = f(d(I), 2);
  {
    var S = (J) => {
      var Z = zl(), ce = Ae(Z), je = d(ce), Je = f(ce, 2), ke = d(Je);
      D(() => {
        P(je, (a(), u(() => a().name))), jt(Je, 1, `agent-status status-${a(), u(() => a().status) ?? ""}`, "svelte-5tjmbm"), P(ke, (a(), u(() => a().status)));
      }), y(J, Z);
    };
    V(H, (J) => {
      a() && J(S);
    });
  }
  var X = f(H, 2), de = d(X), M = d(de), U = f(de, 2), C = d(U), B = f(X, 2);
  {
    var ye = (J) => {
      var Z = Ul(), ce = d(Z);
      D(() => P(ce, n(T))), y(J, Z);
    };
    V(B, (J) => {
      n(T) && J(ye);
    });
  }
  var oe = f(B, 2);
  {
    var pe = (J) => {
      var Z = Hl(), ce = d(Z);
      D(() => P(ce, n(c))), y(J, Z);
    };
    V(oe, (J) => {
      n(c) && J(pe);
    });
  }
  var le = f(oe, 2);
  {
    var se = (J) => {
      var Z = Vl(), ce = Ae(Z), je = d(ce), Je = f(ce, 2);
      {
        var ke = (Ce) => {
          var Ee = Bl(), De = d(Ee);
          D(() => P(De, n(N))), y(Ce, Ee);
        };
        V(Je, (Ce) => {
          n(N) && Ce(ke);
        });
      }
      D(() => {
        ce.disabled = n(x), P(je, n(x) ? "Reverting…" : "Revert to Draft");
      }), G("click", ce, m), y(J, Z);
    };
    V(le, (J) => {
      a(), u(() => {
        var Z;
        return ((Z = a()) == null ? void 0 : Z.status) === "active";
      }) && J(se);
    });
  }
  var ee = f(I, 2), ue = f(d(ee), 2), $e = f(d(ue), 2), O = d($e);
  O.value = O.__value = "rest";
  var j = f(O);
  j.value = j.__value = "cron";
  var K = f(j);
  K.value = K.__value = "webhook";
  var te = f(K);
  te.value = te.__value = "integration";
  var be = f(ue, 2);
  {
    var Ie = (J) => {
      var Z = Zl(), ce = Ae(Z);
      {
        var je = (rt) => {
          var gt = Kl(), Xt = f(d(gt), 2);
          qe(Xt, 1, () => n(R), Re, (Ws, bt) => {
            var Hr = Gl(), Br = d(Hr), Vr = d(Br), po = d(Vr), Yr = f(Vr, 2);
            {
              var ho = (Xs) => {
                var Gr = Yl(), mo = d(Gr);
                D(() => P(mo, (n(bt), u(() => n(bt).eventFilter)))), y(Xs, Gr);
              };
              V(Yr, (Xs) => {
                n(bt), u(() => n(bt).eventFilter) && Xs(ho);
              });
            }
            var _o = f(Yr, 2), go = d(_o), bo = f(Br, 2);
            D(() => {
              P(po, (n(bt), u(() => n(bt).service))), P(go, (n(bt), u(() => n(bt).url)));
            }), G("click", bo, () => ge(n(bt).id)), y(Ws, Hr);
          }), y(rt, gt);
        };
        V(ce, (rt) => {
          n(R), u(() => n(R).length > 0) && rt(je);
        });
      }
      var Je = f(ce, 2), ke = f(d(Je), 2), Ce = d(ke);
      Ce.value = Ce.__value = "";
      var Ee = f(Ce);
      qe(Ee, 1, () => n(k), Re, (rt, gt) => {
        var Xt = Wl(), Ws = d(Xt), bt = {};
        D(() => {
          P(Ws, (n(gt), u(() => n(gt).displayName))), bt !== (bt = (n(gt), u(() => n(gt).service))) && (Xt.value = (Xt.__value = (n(gt), u(() => n(gt).service))) ?? "");
        }), y(rt, Xt);
      });
      var De = f(Je, 2), ns = f(d(De), 2), Ur = f(De, 2), vo = f(d(Ur), 2), ks = f(Ur, 2), co = d(ks), uo = f(ks, 2);
      {
        var fo = (rt) => {
          var gt = Xl(), Xt = d(gt);
          D(() => P(Xt, n(Y))), y(rt, gt);
        };
        V(uo, (rt) => {
          n(Y) && rt(fo);
        });
      }
      D(() => {
        ks.disabled = n(re) || !n(q) || !n(A), P(co, n(re) ? "Registering…" : "Register Trigger");
      }), $r(ke, () => n(q), (rt) => _(q, rt)), ut(ns, () => n(z), (rt) => _(z, rt)), ut(vo, () => n(A), (rt) => _(A, rt)), G("click", ks, Q), y(J, Z);
    };
    V(be, (J) => {
      r(), u(() => r().triggerType === "integration") && J(Ie);
    });
  }
  var Me = f(be, 2);
  {
    var xe = (J) => {
      var Z = Ql(), ce = f(d(Z), 2);
      ut(ce, () => r().cronExpression, (je) => Qs(An, u(r).cronExpression = je, u(r))), y(J, Z);
    };
    V(Me, (J) => {
      r(), u(() => r().triggerType === "cron") && J(xe);
    });
  }
  var ne = f(Me, 2);
  {
    var ve = (J) => {
      var Z = nv(), ce = f(d(Z), 2);
      {
        var je = (ke) => {
          var Ce = ev(), Ee = d(Ce), De = d(Ee);
          D(() => P(De, (r(), u(() => r().webhookUrl)))), y(ke, Ce);
        }, Je = (ke) => {
          var Ce = tv();
          y(ke, Ce);
        };
        V(ce, (ke) => {
          r(), u(() => r().webhookUrl) ? ke(je) : ke(Je, -1);
        });
      }
      y(J, Z);
    };
    V(ne, (J) => {
      r(), u(() => r().triggerType === "webhook") && J(ve);
    });
  }
  var ae = f(ne, 2), fe = f(d(ae), 2), Oe = f(ae, 2), We = d(Oe), He = f(Oe, 2);
  {
    var Be = (J) => {
      var Z = sv(), ce = d(Z);
      D(() => P(ce, n(g))), y(J, Z);
    };
    V(He, (J) => {
      n(g) && J(Be);
    });
  }
  D(() => {
    de.disabled = n(h), P(M, n(h) ? "Saving…" : "Save Draft"), U.disabled = n(v), P(C, n(v) ? "Publishing…" : "Publish"), Oe.disabled = n(p), P(We, n(p) ? "Saving…" : "Save");
  }), G("click", de, F), G("click", U, W), $r($e, () => r().triggerType, (J) => Qs(An, u(r).triggerType = J, u(r))), ut(fe, () => r().description, (J) => Qs(An, u(r).description = J, u(r))), G("click", Oe, E), y(e, w), tt(), i();
}
const mt = es({
  runId: null,
  status: "idle",
  output: null,
  error: null,
  steps: []
});
var ov = /* @__PURE__ */ $('<button class="btn-stop svelte-gqobos">■ Stop</button>'), iv = /* @__PURE__ */ $('<pre class="result-json svelte-gqobos"> </pre>'), lv = /* @__PURE__ */ $('<div class="result-error svelte-gqobos"> </div>'), vv = /* @__PURE__ */ $('<button class="traj-toggle svelte-gqobos"> </button>'), cv = /* @__PURE__ */ $('<div class="traj-thought svelte-gqobos"><span class="traj-label svelte-gqobos">Thought</span> </div>'), uv = /* @__PURE__ */ $('<div class="traj-action svelte-gqobos"><span class="traj-label svelte-gqobos">Action</span> </div>'), dv = /* @__PURE__ */ $('<div class="traj-obs svelte-gqobos"><span class="traj-label svelte-gqobos">Obs</span> </div>'), fv = /* @__PURE__ */ $('<div class="traj-step svelte-gqobos"><span class="traj-iter svelte-gqobos"> </span> <!> <!> <!></div>'), pv = /* @__PURE__ */ $('<div class="trajectory-block svelte-gqobos"></div>'), hv = /* @__PURE__ */ $('<div><span class="step-type svelte-gqobos"> </span> <span> </span> <!></div> <!>', 1), _v = /* @__PURE__ */ $('<div class="steps-header svelte-gqobos"> </div> <!>', 1), gv = /* @__PURE__ */ $('<div><div class="result-status svelte-gqobos"> </div> <!> <!></div> <!>', 1), bv = /* @__PURE__ */ $('<div class="panel-section svelte-gqobos"><div class="panel-header svelte-gqobos">Test Run</div> <div class="form-group svelte-gqobos"><label class="svelte-gqobos">Input (JSON)</label> <textarea rows="4" class="svelte-gqobos"></textarea></div> <div class="run-controls svelte-gqobos"><button class="btn-run svelte-gqobos"> </button> <!></div> <!></div>');
function mv(e, t) {
  et(t, !1);
  const s = () => nt(mt, "$runState", r), [r, a] = Wt();
  let o = Ge(t, "agentId", 8), i = /* @__PURE__ */ L("{}"), l = /* @__PURE__ */ L(!1), v = null;
  const c = /* @__PURE__ */ new Set(["core:react", "core:planner"]);
  let p = /* @__PURE__ */ L([]), g = /* @__PURE__ */ L(
    null
    // nodeId
  );
  async function h(W) {
    try {
      const F = await fetch(`/api/telemetry/trajectory/${W}`);
      if (!F.ok) return;
      const m = await F.json();
      _(p, m.trajectories ?? []);
    } catch {
    }
  }
  function T() {
    v && (v.close(), v = null), _(l, !1);
  }
  async function x() {
    var m;
    T(), _(l, !0), mt.set({
      runId: null,
      status: "running",
      output: null,
      error: null,
      steps: []
    });
    let W;
    try {
      W = JSON.parse(n(i));
    } catch {
      mt.set({
        runId: null,
        status: "failed",
        output: null,
        error: "Invalid JSON input",
        steps: []
      }), _(l, !1);
      return;
    }
    let F;
    try {
      const E = await fetch(`/api/agents/${o()}/runs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: W, mode: "async" })
      });
      if (!E.ok) {
        const I = await E.json();
        throw new Error(((m = I == null ? void 0 : I.error) == null ? void 0 : m.message) ?? `HTTP ${E.status}`);
      }
      F = (await E.json()).runId;
    } catch (E) {
      mt.set({
        runId: null,
        status: "failed",
        output: null,
        error: String(E),
        steps: []
      }), _(l, !1);
      return;
    }
    mt.update((E) => ({ ...E, runId: F })), v = new EventSource(`/api/agents/${o()}/runs/${F}/stream`), v.addEventListener("node.started", (E) => {
      const w = JSON.parse(E.data);
      mt.update((I) => ({
        ...I,
        steps: [
          ...I.steps.filter((H) => H.nodeId !== w.nodeId),
          {
            id: w.nodeId,
            nodeId: w.nodeId,
            nodeType: w.nodeType,
            stepId: w.stepId,
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
      const w = JSON.parse(E.data);
      mt.update((I) => ({
        ...I,
        steps: I.steps.map((H) => H.nodeId === w.nodeId ? {
          ...H,
          status: "complete",
          completedAt: (/* @__PURE__ */ new Date()).toISOString(),
          output: w.outputs
        } : H)
      }));
    }), v.addEventListener("node.failed", (E) => {
      const w = JSON.parse(E.data);
      mt.update((I) => ({
        ...I,
        steps: I.steps.map((H) => H.nodeId === w.nodeId ? {
          ...H,
          status: "failed",
          completedAt: (/* @__PURE__ */ new Date()).toISOString(),
          error: w.error
        } : H)
      }));
    }), v.addEventListener("run.completed", (E) => {
      const w = JSON.parse(E.data);
      mt.update((I) => ({ ...I, status: "completed", output: w.output })), T(), h(F);
    }), v.addEventListener("run.failed", (E) => {
      const w = JSON.parse(E.data);
      mt.update((I) => ({ ...I, status: "failed", error: w.error.message })), T();
    }), v.addEventListener("run.suspended", () => {
      mt.update((E) => ({
        ...E,
        status: "failed",
        error: "Run suspended — awaiting human review"
      })), T();
    }), v.onerror = () => {
      n(l) && (mt.update((E) => ({
        ...E,
        status: E.status === "running" ? "failed" : E.status,
        error: E.error ?? "Stream connection lost"
      })), T());
    };
  }
  st();
  var N = bv(), k = f(d(N), 2), R = f(d(k), 2), q = f(k, 2), z = d(q), A = d(z), Y = f(z, 2);
  {
    var re = (W) => {
      var F = ov();
      G("click", F, T), y(W, F);
    };
    V(Y, (W) => {
      n(l) && W(re);
    });
  }
  var Q = f(q, 2);
  {
    var ge = (W) => {
      var F = gv(), m = Ae(F), E = d(m), w = d(E), I = f(E, 2);
      {
        var H = (U) => {
          var C = iv(), B = d(C);
          D((ye) => P(B, ye), [
            () => (s(), u(() => JSON.stringify(s().output, null, 2)))
          ]), y(U, C);
        };
        V(I, (U) => {
          s(), u(() => s().output) && U(H);
        });
      }
      var S = f(I, 2);
      {
        var X = (U) => {
          var C = lv(), B = d(C);
          D(() => P(B, (s(), u(() => s().error)))), y(U, C);
        };
        V(S, (U) => {
          s(), u(() => s().error) && U(X);
        });
      }
      var de = f(m, 2);
      {
        var M = (U) => {
          var C = _v(), B = Ae(C), ye = d(B), oe = f(B, 2);
          qe(oe, 1, () => (s(), u(() => s().steps)), Re, (pe, le) => {
            var se = hv(), ee = Ae(se), ue = d(ee), $e = d(ue), O = f(ue, 2), j = d(O), K = f(O, 2);
            {
              var te = (xe) => {
                const ne = /* @__PURE__ */ Xe(() => (n(p), n(le), u(() => n(p).filter((Oe) => Oe.stepId === n(le).stepId))));
                var ve = Kt(), ae = Ae(ve);
                {
                  var fe = (Oe) => {
                    var We = vv(), He = d(We);
                    D(() => P(He, `▶ Trajectory (${Ne(n(ne)), u(() => n(ne).length) ?? ""} steps)`)), G("click", We, () => _(g, n(g) === n(le).nodeId ? null : n(le).nodeId)), y(Oe, We);
                  };
                  V(ae, (Oe) => {
                    Ne(n(ne)), u(() => n(ne).length > 0) && Oe(fe);
                  });
                }
                y(xe, ve);
              }, be = /* @__PURE__ */ Kn(() => (n(le), s(), u(() => c.has(n(le).nodeType) && s().status !== "running")));
              V(K, (xe) => {
                n(be) && xe(te);
              });
            }
            var Ie = f(ee, 2);
            {
              var Me = (xe) => {
                const ne = /* @__PURE__ */ Xe(() => (n(p), n(le), u(() => n(p).filter((ae) => ae.stepId === n(le).stepId))));
                var ve = pv();
                qe(ve, 5, () => n(ne), Re, (ae, fe) => {
                  var Oe = fv(), We = d(Oe), He = d(We), Be = f(We, 2);
                  {
                    var J = (ke) => {
                      var Ce = cv(), Ee = f(d(Ce));
                      D(() => P(Ee, ` ${n(fe), u(() => n(fe).thought) ?? ""}`)), y(ke, Ce);
                    };
                    V(Be, (ke) => {
                      n(fe), u(() => n(fe).thought) && ke(J);
                    });
                  }
                  var Z = f(Be, 2);
                  {
                    var ce = (ke) => {
                      var Ce = uv(), Ee = f(d(Ce));
                      D(() => P(Ee, ` ${n(fe), u(() => n(fe).action) ?? ""}`)), y(ke, Ce);
                    };
                    V(Z, (ke) => {
                      n(fe), u(() => n(fe).action) && ke(ce);
                    });
                  }
                  var je = f(Z, 2);
                  {
                    var Je = (ke) => {
                      var Ce = dv(), Ee = f(d(Ce));
                      D(() => P(Ee, ` ${n(fe), u(() => n(fe).observation) ?? ""}`)), y(ke, Ce);
                    };
                    V(je, (ke) => {
                      n(fe), u(() => n(fe).observation) && ke(Je);
                    });
                  }
                  D(() => P(He, `Iter ${n(fe), u(() => n(fe).iteration) ?? ""}`)), y(ae, Oe);
                }), y(xe, ve);
              };
              V(Ie, (xe) => {
                n(g), n(le), u(() => n(g) === n(le).nodeId) && xe(Me);
              });
            }
            D(() => {
              jt(ee, 1, `step step-${n(le), u(() => n(le).status) ?? ""}`, "svelte-gqobos"), P($e, (n(le), u(() => n(le).nodeType))), jt(O, 1, `step-badge badge-${n(le), u(() => n(le).status) ?? ""}`, "svelte-gqobos"), P(j, (n(le), u(() => n(le).status)));
            }), y(pe, se);
          }), D(() => P(ye, `Steps (${s(), u(() => s().steps.length) ?? ""})`)), y(U, C);
        };
        V(de, (U) => {
          s(), u(() => s().steps.length > 0) && U(M);
        });
      }
      D(
        (U) => {
          jt(m, 1, `run-result status-${s(), u(() => s().status) ?? ""}`, "svelte-gqobos"), P(w, U);
        },
        [
          () => (s(), u(() => s().status.toUpperCase()))
        ]
      ), y(W, F);
    };
    V(Q, (W) => {
      s(), u(() => s().status !== "idle") && W(ge);
    });
  }
  D(() => {
    z.disabled = n(l), P(A, n(l) ? "Running…" : "▶ Run");
  }), ut(R, () => n(i), (W) => _(i, W)), G("click", z, x), y(e, N), tt(), a();
}
var yv = /* @__PURE__ */ $('<span class="badge badge-error svelte-do6mn6"> </span>'), wv = /* @__PURE__ */ $('<span class="badge badge-warn svelte-do6mn6"> </span>'), xv = /* @__PURE__ */ $('<div class="issue issue-error svelte-do6mn6" role="button" tabindex="0"><span class="issue-icon svelte-do6mn6">✗</span> <span class="issue-msg svelte-do6mn6"> </span></div>'), kv = /* @__PURE__ */ $('<div class="issue issue-warning svelte-do6mn6" role="button" tabindex="0"><span class="issue-icon svelte-do6mn6">⚠</span> <span class="issue-msg svelte-do6mn6"> </span></div>'), Ev = /* @__PURE__ */ $('<label class="ack-label svelte-do6mn6"><input type="checkbox" class="svelte-do6mn6"/> Acknowledge warnings and allow publish</label>'), Sv = /* @__PURE__ */ $('<div class="lint-panel svelte-do6mn6"><div class="lint-header svelte-do6mn6"><span class="lint-title svelte-do6mn6">Graph Issues</span> <!> <!></div> <div class="issue-list svelte-do6mn6"><!> <!></div> <!></div>');
function $v(e, t) {
  et(t, !1);
  const s = () => nt(ot, "$graph", a), r = () => nt(us, "$nodeTypes", a), [a, o] = Wt(), i = /* @__PURE__ */ L(), l = /* @__PURE__ */ L(), v = /* @__PURE__ */ L(), c = /* @__PURE__ */ L();
  let p = /* @__PURE__ */ L(!1);
  function g(k, R) {
    const q = [], z = Object.values(k.nodes), A = k.edges, Y = new Set(R.map((m) => m.type));
    if (z.length === 0)
      return q.push({
        severity: "error",
        message: "Graph is empty — add at least a Start and End node"
      }), q;
    for (const m of z)
      Y.size > 0 && !Y.has(m.type) && q.push({
        severity: "error",
        message: `Node "${m.label ?? m.id}" has unknown type "${m.type}"`,
        nodeId: m.id
      });
    const re = k.entry ?? Object.keys(k.nodes)[0];
    k.nodes[re] || q.push({ severity: "error", message: "No entry node defined" });
    const Q = /* @__PURE__ */ new Set(), ge = [re];
    for (; ge.length > 0; ) {
      const m = ge.shift();
      if (!Q.has(m)) {
        Q.add(m);
        for (const E of A)
          E.from === m && !Q.has(E.to) && ge.push(E.to);
      }
    }
    for (const m of z)
      Q.has(m.id) || q.push({
        severity: "warning",
        message: `Node "${m.label ?? m.id}" is unreachable from the entry node`,
        nodeId: m.id
      });
    for (const m of z) {
      const E = A.filter((H) => H.from === m.id);
      if (E.length === 0) continue;
      const w = E.some((H) => H.type === "conditional"), I = E.some((H) => H.type === "fallback" || H.type === "unconditional");
      w && !I && q.push({
        severity: "warning",
        message: `Node "${m.label ?? m.id}" has conditional edges but no fallback — some inputs may go unhandled`,
        nodeId: m.id
      });
    }
    const W = /* @__PURE__ */ new Set(["core:end", "core:stop"]);
    for (const m of z) {
      if (W.has(m.type)) continue;
      A.filter((w) => w.from === m.id).length === 0 && q.push({
        severity: "warning",
        message: `Node "${m.label ?? m.id}" has no outbound edges and is not a terminal node`,
        nodeId: m.id
      });
    }
    const F = k.toolEdges ?? [];
    for (const m of z) {
      if (m.type === "core:tool") {
        const E = A.filter((I) => I.from === m.id);
        E.length !== 1 && q.push({
          severity: "error",
          message: `Tool node "${m.label ?? m.id}" must have exactly one outbound flow edge (has ${E.length})`,
          nodeId: m.id
        }), F.filter((I) => I.from === m.id).length === 0 && q.push({
          severity: "error",
          message: `Tool node "${m.label ?? m.id}" must be connected to an agent node via a tool edge`,
          nodeId: m.id
        });
      }
      (m.type === "core:tool-call" || m.type === "core:react") && F.filter((w) => w.to === m.id).length === 0 && q.push({
        severity: "warning",
        message: `Agent node "${m.label ?? m.id}" (${m.type}) has no tools connected — it will only be able to generate text without tool invocations`,
        nodeId: m.id
      });
    }
    return q;
  }
  function h(k) {
    if (!k) return;
    const R = s().nodes[k];
    R && vn.set(R);
  }
  Ye(() => (s(), r()), () => {
    _(i, g(s(), r()));
  }), Ye(() => n(i), () => {
    _(l, n(i).filter((k) => k.severity === "error"));
  }), Ye(() => n(i), () => {
    _(v, n(i).filter((k) => k.severity === "warning"));
  }), Ye(() => (n(l), n(v), n(p)), () => {
    _(c, n(l).length === 0 && (n(v).length === 0 || n(p)));
  }), cn(), st();
  var T = Kt(), x = Ae(T);
  {
    var N = (k) => {
      var R = Sv(), q = d(R), z = f(d(q), 2);
      {
        var A = (E) => {
          var w = yv(), I = d(w);
          D(() => P(I, `${n(l), u(() => n(l).length) ?? ""} error${n(l), u(() => n(l).length !== 1 ? "s" : "") ?? ""}`)), y(E, w);
        };
        V(z, (E) => {
          n(l), u(() => n(l).length > 0) && E(A);
        });
      }
      var Y = f(z, 2);
      {
        var re = (E) => {
          var w = wv(), I = d(w);
          D(() => P(I, `${n(v), u(() => n(v).length) ?? ""} warning${n(v), u(() => n(v).length !== 1 ? "s" : "") ?? ""}`)), y(E, w);
        };
        V(Y, (E) => {
          n(v), u(() => n(v).length > 0) && E(re);
        });
      }
      var Q = f(q, 2), ge = d(Q);
      qe(ge, 1, () => n(l), Re, (E, w) => {
        var I = xv(), H = f(d(I), 2), S = d(H);
        D(() => P(S, (n(w), u(() => n(w).message)))), G("click", I, () => h(n(w).nodeId)), G("keydown", I, (X) => X.key === "Enter" && h(n(w).nodeId)), y(E, I);
      });
      var W = f(ge, 2);
      qe(W, 1, () => n(v), Re, (E, w) => {
        var I = kv(), H = f(d(I), 2), S = d(H);
        D(() => P(S, (n(w), u(() => n(w).message)))), G("click", I, () => h(n(w).nodeId)), G("keydown", I, (X) => X.key === "Enter" && h(n(w).nodeId)), y(E, I);
      });
      var F = f(Q, 2);
      {
        var m = (E) => {
          var w = Ev(), I = d(w);
          io(I, () => n(p), (H) => _(p, H)), y(E, w);
        };
        V(F, (E) => {
          n(l), n(v), u(() => n(l).length === 0 && n(v).length > 0) && E(m);
        });
      }
      y(k, R);
    };
    V(x, (k) => {
      n(i), u(() => n(i).length > 0) && k(N);
    });
  }
  y(e, T), tt(), o();
}
var Tv = /* @__PURE__ */ $('<p class="empty-state svelte-28mxb5">No tools connected.<br/>Connect <code class="svelte-28mxb5">core:tool</code> or <code class="svelte-28mxb5">core:mcp-client</code> nodes via tool edges.</p>'), jv = /* @__PURE__ */ $('<span class="tool-desc svelte-28mxb5"> </span>'), Nv = /* @__PURE__ */ $('<li class="tool-item svelte-28mxb5"><span class="tool-name svelte-28mxb5"> </span> <span class="tool-source svelte-28mxb5"> </span> <!></li>'), Cv = /* @__PURE__ */ $('<ul class="tool-list svelte-28mxb5"></ul>'), Iv = /* @__PURE__ */ $('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Name</span><code class="svelte-28mxb5"> </code></div>'), Ov = /* @__PURE__ */ $('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Description</span><span class="svelte-28mxb5"> </span></div>'), Av = /* @__PURE__ */ $('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Connected to</span> <span class="svelte-28mxb5"> </span></div>'), Pv = /* @__PURE__ */ $('<div class="tool-detail svelte-28mxb5"><!> <!> <!></div>'), Rv = /* @__PURE__ */ $('<p class="empty-state svelte-28mxb5">Select an agent node (<code class="svelte-28mxb5">core:tool-call</code>, <code class="svelte-28mxb5">core:react</code>) or a tool node to inspect its tools.</p>'), qv = /* @__PURE__ */ $('<div class="tool-panel svelte-28mxb5"><div class="panel-header svelte-28mxb5">TOOLS</div> <!></div>');
function Mv(e, t) {
  et(t, !1);
  const s = () => nt(vn, "$selectedNode", a), r = () => nt(ot, "$graph", a), [a, o] = Wt(), i = /* @__PURE__ */ L(), l = /* @__PURE__ */ L(), v = /* @__PURE__ */ L(), c = /* @__PURE__ */ L(), p = /* @__PURE__ */ L(), g = /* @__PURE__ */ new Set(["core:tool", "core:mcp-client"]), h = /* @__PURE__ */ new Set(["core:tool-call", "core:react"]);
  Ye(() => s(), () => {
    var A;
    _(i, ((A = s()) == null ? void 0 : A.id) ?? null);
  }), Ye(() => s(), () => {
    var A;
    _(l, ((A = s()) == null ? void 0 : A.type) ?? null);
  }), Ye(() => (n(i), n(l), r()), () => {
    _(v, n(i) && h.has(n(l) ?? "") ? (r().toolEdges ?? []).filter((A) => A.to === n(i)).map((A) => ({ edge: A, node: r().nodes[A.from] })).filter((A) => A.node !== void 0) : []);
  }), Ye(() => (n(i), n(l), s()), () => {
    var A;
    _(c, n(i) && g.has(n(l) ?? "") ? (A = s()) == null ? void 0 : A.config : null);
  }), Ye(() => (n(i), n(l), r()), () => {
    _(p, n(i) && g.has(n(l) ?? "") ? (r().toolEdges ?? []).filter((A) => A.from === n(i)).map((A) => r().nodes[A.to]).filter(Boolean) : []);
  }), cn(), st();
  var T = qv(), x = f(d(T), 2);
  {
    var N = (A) => {
      var Y = Kt(), re = Ae(Y);
      {
        var Q = (W) => {
          var F = Tv();
          y(W, F);
        }, ge = (W) => {
          var F = Cv();
          qe(F, 5, () => n(v), Re, (m, E) => {
            let w = () => n(E).node;
            var I = Nv(), H = d(I), S = d(H), X = f(H, 2), de = d(X), M = f(X, 2);
            {
              var U = (C) => {
                var B = jv(), ye = d(B);
                D((oe) => P(ye, oe), [
                  () => (w(), u(() => String(w().config.description)))
                ]), y(C, B);
              };
              V(M, (C) => {
                w(), u(() => {
                  var B;
                  return (B = w().config) == null ? void 0 : B.description;
                }) && C(U);
              });
            }
            D(
              (C) => {
                P(S, C), P(de, (w(), u(() => w().type === "core:mcp-client" ? "MCP" : "Graph")));
              },
              [
                () => (w(), u(() => {
                  var C;
                  return String(((C = w().config) == null ? void 0 : C.name) ?? w().type);
                }))
              ]
            ), y(m, I);
          }), y(W, F);
        };
        V(re, (W) => {
          n(v), u(() => n(v).length === 0) ? W(Q) : W(ge, -1);
        });
      }
      y(A, Y);
    }, k = /* @__PURE__ */ Kn(() => (n(l), u(() => h.has(n(l) ?? "")))), R = (A) => {
      var Y = Pv(), re = d(Y);
      {
        var Q = (E) => {
          var w = Iv(), I = f(d(w)), H = d(I);
          D((S) => P(H, S), [
            () => (n(c), u(() => String(n(c).name)))
          ]), y(E, w);
        };
        V(re, (E) => {
          n(c), u(() => n(c).name) && E(Q);
        });
      }
      var ge = f(re, 2);
      {
        var W = (E) => {
          var w = Ov(), I = f(d(w)), H = d(I);
          D((S) => P(H, S), [
            () => (n(c), u(() => String(n(c).description)))
          ]), y(E, w);
        };
        V(ge, (E) => {
          n(c), u(() => n(c).description) && E(W);
        });
      }
      var F = f(ge, 2);
      {
        var m = (E) => {
          var w = Av(), I = f(d(w), 2), H = d(I);
          D((S) => P(H, S), [
            () => (n(p), u(() => n(p).map((S) => (S == null ? void 0 : S.label) ?? (S == null ? void 0 : S.id)).join(", ")))
          ]), y(E, w);
        };
        V(F, (E) => {
          n(p), u(() => n(p).length > 0) && E(m);
        });
      }
      y(A, Y);
    }, q = /* @__PURE__ */ Kn(() => (n(l), n(c), u(() => g.has(n(l) ?? "") && n(c)))), z = (A) => {
      var Y = Rv();
      y(A, Y);
    };
    V(x, (A) => {
      n(k) ? A(N) : n(q) ? A(R, 1) : A(z, -1);
    });
  }
  y(e, T), tt(), o();
}
var Dv = /* @__PURE__ */ $('<div class="rationale svelte-1grl4xd"> </div>'), Lv = /* @__PURE__ */ $('<code class="target svelte-1grl4xd"> </code>'), Fv = /* @__PURE__ */ $('<span class="data-preview svelte-1grl4xd"> </span>'), Jv = /* @__PURE__ */ $('<label class="patch-row svelte-1grl4xd"><input type="checkbox"/> <span class="op-label svelte-1grl4xd"> </span> <!> <!></label>'), zv = /* @__PURE__ */ $('<div class="proposal-card svelte-1grl4xd"><div class="proposal-header svelte-1grl4xd"><span class="complexity-badge svelte-1grl4xd"> </span> <span class="proposal-desc svelte-1grl4xd"> </span></div> <!> <div class="patches-list svelte-1grl4xd"></div> <div class="proposal-actions svelte-1grl4xd"><button class="btn-text svelte-1grl4xd">Accept All</button> <button class="btn-text svelte-1grl4xd">Reject All</button> <span class="spacer svelte-1grl4xd"></span> <button class="btn-secondary svelte-1grl4xd">Dismiss</button> <button class="btn-primary svelte-1grl4xd">Apply</button></div></div>');
function Uv(e, t) {
  et(t, !1);
  let s = Ge(t, "proposal", 8);
  const r = ro();
  let a = /* @__PURE__ */ L({});
  function o() {
    _(a, Object.fromEntries(s().patches.map((W, F) => [F, !0])));
  }
  function i() {
    _(a, Object.fromEntries(s().patches.map((W, F) => [F, !1])));
  }
  function l() {
    const W = s().patches.filter((F, m) => n(a)[m]);
    r("apply", { ...s(), patches: W });
  }
  function v() {
    r("reject");
  }
  const c = {
    targeted: "#22c55e",
    structural: "#f59e0b",
    replacement: "#ef4444"
  };
  function p(W) {
    return {
      add_node: "+ Add node",
      update_node: "~ Update node",
      delete_node: "− Delete node",
      add_edge: "+ Add edge",
      delete_edge: "− Delete edge",
      add_tool_edge: "+ Add tool edge"
    }[W] ?? W;
  }
  Ye(() => Ne(s()), () => {
    _(a, Object.fromEntries(s().patches.map((W, F) => [F, !0])));
  }), cn(), st();
  var g = zv(), h = d(g), T = d(h), x = d(T), N = f(T, 2), k = d(N), R = f(h, 2);
  {
    var q = (W) => {
      var F = Dv(), m = d(F);
      D(() => P(m, (Ne(s()), u(() => s().rationale)))), y(W, F);
    };
    V(R, (W) => {
      Ne(s()), u(() => s().rationale) && W(q);
    });
  }
  var z = f(R, 2);
  qe(
    z,
    5,
    () => (Ne(s()), u(() => s().patches)),
    Re,
    (W, F, m) => {
      var E = Jv(), w = d(E), I = f(w, 2), H = d(I), S = f(I, 2);
      {
        var X = (C) => {
          var B = Lv(), ye = d(B);
          D(() => P(ye, (n(F), u(() => n(F).target)))), y(C, B);
        };
        V(S, (C) => {
          n(F), u(() => n(F).target) && C(X);
        });
      }
      var de = f(S, 2);
      {
        var M = (C) => {
          var B = Fv(), ye = d(B);
          D((oe) => P(ye, `${oe ?? ""}…`), [
            () => (n(F), u(() => JSON.stringify(n(F).data).slice(0, 60)))
          ]), y(C, B);
        }, U = /* @__PURE__ */ Kn(() => (n(F), u(() => n(F).data && Object.keys(n(F).data).length > 0)));
        V(de, (C) => {
          n(U) && C(M);
        });
      }
      D((C) => P(H, C), [
        () => (n(F), u(() => p(n(F).op)))
      ]), io(w, () => n(a)[m], (C) => en(a, n(a)[m] = C)), y(W, E);
    }
  );
  var A = f(z, 2), Y = d(A), re = f(Y, 2), Q = f(re, 4), ge = f(Q, 2);
  D(() => {
    ao(T, `color: ${Ne(s()), u(() => c[s().complexity]) ?? ""}`), P(x, (Ne(s()), u(() => s().complexity))), P(k, (Ne(s()), u(() => s().description)));
  }), G("click", Y, o), G("click", re, i), G("click", Q, v), G("click", ge, l), y(e, g), tt();
}
var Hv = /* @__PURE__ */ $('<button class="icon-btn svelte-vtqea" title="History">⏱</button>'), Bv = /* @__PURE__ */ $('<div><span class="msg-content svelte-vtqea"> </span></div>'), Vv = /* @__PURE__ */ $('<div class="history-view svelte-vtqea"><div class="history-header svelte-vtqea"><span class="svelte-vtqea">Conversation History</span> <button class="icon-btn svelte-vtqea">✕</button></div> <div class="messages-list svelte-vtqea"></div></div>'), Yv = /* @__PURE__ */ $('<div class="empty-state svelte-vtqea">Ask Caal to explain, improve, or modify this agent graph.</div>'), Gv = /* @__PURE__ */ $('<button class="node-chip svelte-vtqea"> </button>'), Kv = /* @__PURE__ */ $('<span class="svelte-vtqea"> </span>'), Wv = /* @__PURE__ */ $('<div class="msg-content svelte-vtqea"></div>'), Xv = /* @__PURE__ */ $('<span class="msg-content svelte-vtqea"> </span>'), Zv = /* @__PURE__ */ $("<div><!></div>"), Qv = /* @__PURE__ */ $('<div class="message assistant thinking svelte-vtqea"><span class="dot svelte-vtqea"></span><span class="dot svelte-vtqea"></span><span class="dot svelte-vtqea"></span></div>'), ec = /* @__PURE__ */ $('<button class="quick-btn svelte-vtqea"> </button>'), tc = /* @__PURE__ */ $('<div class="messages-list svelte-vtqea"><!> <!> <!></div> <!> <div class="quick-actions svelte-vtqea"></div> <div class="input-area svelte-vtqea"><textarea class="caal-input svelte-vtqea" placeholder="Ask Caal… (Enter to send, Shift+Enter for newline)"></textarea> <button class="send-btn svelte-vtqea">➤</button></div>', 1), nc = /* @__PURE__ */ $('<div><div class="caal-header svelte-vtqea"><span class="caal-title svelte-vtqea"><span class="caal-dot svelte-vtqea"></span> Caal AI</span> <div class="header-actions svelte-vtqea"><!> <button class="icon-btn svelte-vtqea"> </button></div></div> <!></div>');
function sc(e, t) {
  et(t, !1);
  const s = () => nt(ot, "$graph", a), r = () => nt(vn, "$selectedNode", a), [a, o] = Wt();
  Ge(t, "agentId", 8);
  let i = /* @__PURE__ */ L([]), l = /* @__PURE__ */ L(""), v = /* @__PURE__ */ L(!1), c = /* @__PURE__ */ L(null), p = /* @__PURE__ */ L(null), g = /* @__PURE__ */ L(!0), h = /* @__PURE__ */ L(!1), T = /* @__PURE__ */ L([]), x = /* @__PURE__ */ L();
  const N = [
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
  async function k(C, B) {
    if (!C.trim() || n(v)) return;
    const ye = { role: "user", content: C, timestamp: Date.now() };
    _(i, [...n(i), ye]), _(l, ""), _(v, !0), re();
    try {
      const oe = {
        ...s(),
        authoringMode: s().authoringMode ?? "studio"
      }, pe = {
        message: C,
        graphState: oe,
        selectedNodeIds: r() ? [r().id] : [],
        sessionId: n(p) ?? void 0,
        intent: B ?? R(C)
      }, le = await fetch("/api/v1/caal/invoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pe)
      });
      if (!le.ok) throw new Error(`Caal invoke failed: ${le.status}`);
      const se = await le.json();
      se.sessionId && _(p, se.sessionId);
      const ee = se.output ?? {}, ue = {
        role: "assistant",
        content: ee.content ?? "",
        nodeReferences: ee.nodeReferences ?? [],
        proposal: ee.proposal,
        canvasHighlight: ee.canvasHighlight,
        canvasFocus: ee.canvasFocus,
        timestamp: Date.now()
      };
      _(i, [...n(i), ue]), ee.proposal && _(c, ee.proposal), ee.canvasHighlight && q(ee.canvasHighlight), ee.canvasFocus && z(ee.canvasFocus);
    } catch (oe) {
      const pe = {
        role: "assistant",
        content: `Error: ${oe.message}`,
        timestamp: Date.now()
      };
      _(i, [...n(i), pe]);
    } finally {
      _(v, !1), re();
    }
  }
  function R(C) {
    const B = C.toLowerCase();
    return /\b(add|create|remove|delete|update|change|modify|rename|move|connect|disconnect)\b/.test(B) ? "modify" : /\b(suggest|improve|optimize|better|recommend|enhance)\b/.test(B) ? "suggest" : "question";
  }
  function q(C) {
    window.dispatchEvent(new CustomEvent("caal:canvas-highlight", { detail: C }));
  }
  function z(C) {
    window.dispatchEvent(new CustomEvent("caal:canvas-focus", { detail: C }));
  }
  function A(C) {
    window.dispatchEvent(new CustomEvent("caal:canvas-focus", { detail: { nodeId: C, zoom: 1.5 } })), window.dispatchEvent(new CustomEvent("caal:canvas-highlight", {
      detail: { nodeIds: [C], color: "#F59E0B", durationMs: 2e3 }
    }));
  }
  function Y(C) {
    const B = [], ye = /\[\[([^\]]+)\]\]/g;
    let oe = 0, pe;
    for (; (pe = ye.exec(C)) !== null; )
      pe.index > oe && B.push({ type: "text", value: C.slice(oe, pe.index) }), B.push({ type: "chip", value: pe[1] }), oe = pe.index + pe[0].length;
    return oe < C.length && B.push({ type: "text", value: C.slice(oe) }), B;
  }
  function re() {
    requestAnimationFrame(() => {
      n(x) && en(x, n(x).scrollTop = n(x).scrollHeight);
    });
  }
  function Q(C) {
    C.key === "Enter" && !C.shiftKey && (C.preventDefault(), k(n(l)));
  }
  async function ge() {
    var C;
    if (n(p))
      try {
        const B = await fetch(`/api/v1/caal/sessions/${encodeURIComponent(n(p))}`);
        if (B.ok) {
          const ye = await B.json();
          _(T, ((C = ye.contextEntries) == null ? void 0 : C.messages) ?? []), _(h, !0);
        }
      } catch {
      }
  }
  function W(C) {
    const B = C.detail;
    window.dispatchEvent(new CustomEvent("caal:apply-proposal", { detail: B })), _(c, null), _(i, [
      ...n(i),
      {
        role: "assistant",
        content: `Proposal "${B.description}" accepted and applied to graph.`,
        timestamp: Date.now()
      }
    ]);
  }
  function F() {
    _(c, null);
  }
  st();
  var m = nc();
  let E;
  var w = d(m), I = f(d(w), 2), H = d(I);
  {
    var S = (C) => {
      var B = Hv();
      G("click", B, ge), y(C, B);
    };
    V(H, (C) => {
      n(p) && C(S);
    });
  }
  var X = f(H, 2), de = d(X), M = f(w, 2);
  {
    var U = (C) => {
      var B = Kt(), ye = Ae(B);
      {
        var oe = (le) => {
          var se = Vv(), ee = d(se), ue = f(d(ee), 2), $e = f(ee, 2);
          qe($e, 5, () => n(T), Re, (O, j) => {
            var K = Bv(), te = d(K), be = d(te);
            D(() => {
              jt(K, 1, `message ${n(j), u(() => n(j).role) ?? ""}`, "svelte-vtqea"), P(be, (n(j), u(() => n(j).content)));
            }), y(O, K);
          }), G("click", ue, () => _(h, !1)), y(le, se);
        }, pe = (le) => {
          var se = tc(), ee = Ae(se), ue = d(ee);
          {
            var $e = (ve) => {
              var ae = Yv();
              y(ve, ae);
            };
            V(ue, (ve) => {
              n(i), u(() => n(i).length === 0) && ve($e);
            });
          }
          var O = f(ue, 2);
          qe(O, 1, () => n(i), Re, (ve, ae) => {
            var fe = Zv(), Oe = d(fe);
            {
              var We = (Be) => {
                var J = Wv();
                qe(
                  J,
                  5,
                  () => (n(ae), u(() => Y(n(ae).content))),
                  Re,
                  (Z, ce) => {
                    var je = Kt(), Je = Ae(je);
                    {
                      var ke = (Ee) => {
                        var De = Gv(), ns = d(De);
                        D(() => P(ns, (n(ce), u(() => n(ce).value)))), G("click", De, () => A(n(ce).value)), y(Ee, De);
                      }, Ce = (Ee) => {
                        var De = Kv(), ns = d(De);
                        D(() => P(ns, (n(ce), u(() => n(ce).value)))), y(Ee, De);
                      };
                      V(Je, (Ee) => {
                        n(ce), u(() => n(ce).type === "chip") ? Ee(ke) : Ee(Ce, -1);
                      });
                    }
                    y(Z, je);
                  }
                ), y(Be, J);
              }, He = (Be) => {
                var J = Xv(), Z = d(J);
                D(() => P(Z, (n(ae), u(() => n(ae).content)))), y(Be, J);
              };
              V(Oe, (Be) => {
                n(ae), u(() => n(ae).role === "assistant") ? Be(We) : Be(He, -1);
              });
            }
            D(() => jt(fe, 1, `message ${n(ae), u(() => n(ae).role) ?? ""}`, "svelte-vtqea")), y(ve, fe);
          });
          var j = f(O, 2);
          {
            var K = (ve) => {
              var ae = Qv();
              y(ve, ae);
            };
            V(j, (ve) => {
              n(v) && ve(K);
            });
          }
          lo(ee, (ve) => _(x, ve), () => n(x));
          var te = f(ee, 2);
          {
            var be = (ve) => {
              Uv(ve, {
                get proposal() {
                  return n(c);
                },
                $$events: { apply: W, reject: F }
              });
            };
            V(te, (ve) => {
              n(c) && ve(be);
            });
          }
          var Ie = f(te, 2);
          qe(Ie, 5, () => N, Re, (ve, ae) => {
            var fe = ec(), Oe = d(fe);
            D(() => {
              fe.disabled = n(v), P(Oe, (n(ae), u(() => n(ae).label)));
            }), G("click", fe, () => k(n(ae).prompt, n(ae).intent)), y(ve, fe);
          });
          var Me = f(Ie, 2), xe = d(Me);
          Le(xe, "rows", 2);
          var ne = f(xe, 2);
          D(
            (ve) => {
              xe.disabled = n(v), ne.disabled = ve;
            },
            [
              () => (n(v), n(l), u(() => n(v) || !n(l).trim()))
            ]
          ), ut(xe, () => n(l), (ve) => _(l, ve)), G("keydown", xe, Q), G("click", ne, () => k(n(l))), y(le, se);
        };
        V(ye, (le) => {
          n(h) ? le(oe) : le(pe, -1);
        });
      }
      y(C, B);
    };
    V(M, (C) => {
      n(g) && C(U);
    });
  }
  D(() => {
    E = jt(m, 1, "caal-panel svelte-vtqea", null, E, { collapsed: !n(g) }), P(de, n(g) ? "▼" : "▲");
  }), G("click", X, () => _(g, !n(g))), y(e, m), tt(), o();
}
var rc = /* @__PURE__ */ $('<span class="sync-time svelte-ra0acr"> </span>'), ac = /* @__PURE__ */ $('<div class="code-banner svelte-ra0acr"><span class="icon svelte-ra0acr">⟨/⟩</span> <div class="text svelte-ra0acr"><span class="label svelte-ra0acr">Code-defined agent</span> <span class="handle svelte-ra0acr"> </span></div> <!> <a class="sync-link svelte-ra0acr" href="/admin/system/sync">Sync log</a></div>');
function oc(e, t) {
  et(t, !1);
  let s = Ge(t, "handle", 8), r = Ge(t, "lastSyncAt", 8, null);
  st();
  var a = ac(), o = f(d(a), 2), i = f(d(o), 2), l = d(i), v = f(o, 2);
  {
    var c = (p) => {
      var g = rc(), h = d(g);
      D((T) => P(h, `Synced ${T ?? ""}`), [
        () => (Ne(r()), u(() => new Date(r()).toLocaleTimeString()))
      ]), y(p, g);
    };
    V(v, (p) => {
      r() && p(c);
    });
  }
  D(() => P(l, s())), y(e, a), tt();
}
var ic = /* @__PURE__ */ $('<div class="loading svelte-1pzk804">Loading…</div>'), lc = /* @__PURE__ */ $('<div class="error svelte-1pzk804"> </div>'), vc = /* @__PURE__ */ $('<div class="empty svelte-1pzk804">No context entries yet.</div>'), cc = /* @__PURE__ */ $('<span class="count svelte-1pzk804"> </span>'), uc = /* @__PURE__ */ $('<div class="entry svelte-1pzk804"><div class="entry-header svelte-1pzk804"><code class="entry-key svelte-1pzk804"> </code> <span class="acc-type svelte-1pzk804"> </span> <!> <span class="tokens svelte-1pzk804"> </span></div> <pre class="entry-value svelte-1pzk804"> </pre></div>'), dc = /* @__PURE__ */ $('<div class="entries svelte-1pzk804"></div>'), fc = /* @__PURE__ */ $('<div class="panel-body svelte-1pzk804"><div class="session-id-row svelte-1pzk804"><span class="label svelte-1pzk804">Session</span> <code class="sid svelte-1pzk804"> </code> <button class="refresh-btn svelte-1pzk804">↻</button></div> <!></div>'), pc = /* @__PURE__ */ $('<div class="session-panel svelte-1pzk804"><button class="panel-header svelte-1pzk804"><span>Session Context</span> <span class="toggle svelte-1pzk804"> </span></button> <!></div>');
function hc(e, t) {
  et(t, !1);
  let s = Ge(t, "agentId", 8), r = Ge(t, "sessionId", 8, null), a = /* @__PURE__ */ L(!1), o = /* @__PURE__ */ L(!1), i = /* @__PURE__ */ L([]), l = /* @__PURE__ */ L(null);
  async function v() {
    if (!(!s() || !r())) {
      _(o, !0), _(l, null);
      try {
        const x = await fetch(`/api/v1/agents/${s()}/sessions/${encodeURIComponent(r())}`);
        if (!x.ok) throw new Error(`${x.status}`);
        const N = await x.json();
        _(i, Object.entries(N.contextEntries ?? {}).map(([k, R]) => ({
          key: k,
          value: R.value,
          accumulationType: R.accumulationType,
          count: Array.isArray(R.value) ? R.value.length : void 0
        })));
      } catch (x) {
        _(l, x.message);
      } finally {
        _(o, !1);
      }
    }
  }
  function c(x) {
    return Math.ceil(JSON.stringify(x).length / 4);
  }
  function p(x) {
    const N = JSON.stringify(x, null, 2);
    return N.length > 200 ? N.slice(0, 200) + "…" : N;
  }
  Ye(() => (Ne(r()), n(a)), () => {
    r() && n(a) && v();
  }), cn(), st();
  var g = Kt(), h = Ae(g);
  {
    var T = (x) => {
      var N = pc(), k = d(N), R = f(d(k), 2), q = d(R), z = f(k, 2);
      {
        var A = (Y) => {
          var re = fc(), Q = d(re), ge = f(d(Q), 2), W = d(ge), F = f(ge, 2), m = f(Q, 2);
          {
            var E = (S) => {
              var X = ic();
              y(S, X);
            }, w = (S) => {
              var X = lc(), de = d(X);
              D(() => P(de, n(l))), y(S, X);
            }, I = (S) => {
              var X = vc();
              y(S, X);
            }, H = (S) => {
              var X = dc();
              qe(X, 5, () => n(i), Re, (de, M) => {
                var U = uc(), C = d(U), B = d(C), ye = d(B), oe = f(B, 2), pe = d(oe), le = f(oe, 2);
                {
                  var se = (j) => {
                    var K = cc(), te = d(K);
                    D(() => P(te, `${n(M), u(() => n(M).count) ?? ""} items`)), y(j, K);
                  };
                  V(le, (j) => {
                    n(M), u(() => n(M).count !== void 0) && j(se);
                  });
                }
                var ee = f(le, 2), ue = d(ee), $e = f(C, 2), O = d($e);
                D(
                  (j, K) => {
                    P(ye, (n(M), u(() => n(M).key))), P(pe, (n(M), u(() => n(M).accumulationType))), P(ue, `~${j ?? ""}t`), P(O, K);
                  },
                  [
                    () => (n(M), u(() => c(n(M).value))),
                    () => (n(M), u(() => p(n(M).value)))
                  ]
                ), y(de, U);
              }), y(S, X);
            };
            V(m, (S) => {
              n(o) ? S(E) : n(l) ? S(w, 1) : (n(i), u(() => n(i).length === 0) ? S(I, 2) : S(H, -1));
            });
          }
          D(() => {
            P(W, r()), F.disabled = n(o);
          }), G("click", F, v), y(Y, re);
        };
        V(z, (Y) => {
          n(a) && Y(A);
        });
      }
      D(() => P(q, n(a) ? "▼" : "▶")), G("click", k, () => {
        _(a, !n(a));
      }), y(x, N);
    };
    V(h, (x) => {
      r() && x(T);
    });
  }
  y(e, g), tt();
}
var _c = /* @__PURE__ */ $('<div class="loading svelte-ojvpsl">Loading…</div>'), gc = /* @__PURE__ */ $('<div class="error svelte-ojvpsl"> </div>'), bc = /* @__PURE__ */ $('<div class="empty svelte-ojvpsl">No prompts defined.</div>'), mc = /* @__PURE__ */ $('<span class="active-label svelte-ojvpsl">active</span>'), yc = /* @__PURE__ */ $('<button class="promote-btn svelte-ojvpsl">Promote</button>'), wc = /* @__PURE__ */ $('<button class="diff-btn svelte-ojvpsl">Diff</button>'), xc = /* @__PURE__ */ $('<div><span class="vnum svelte-ojvpsl"> </span> <!> <!> <span class="version-date svelte-ojvpsl"> </span></div> <pre class="version-preview svelte-ojvpsl"> </pre>', 1), kc = /* @__PURE__ */ $('<div class="versions-list svelte-ojvpsl"></div>'), Ec = /* @__PURE__ */ $('<div class="prompt-item svelte-ojvpsl"><button class="prompt-name svelte-ojvpsl"><span></span> <span> </span> <span class="version-count svelte-ojvpsl"> </span> <span class="chevron svelte-ojvpsl"> </span></button> <!></div>'), Sc = /* @__PURE__ */ $('<div class="prompts-list svelte-ojvpsl"></div>'), $c = /* @__PURE__ */ $('<div class="panel-body svelte-ojvpsl"><!> <button class="new-btn svelte-ojvpsl">+ New Version</button></div>'), Tc = /* @__PURE__ */ $('<div class="modal-overlay svelte-ojvpsl"><div class="modal svelte-ojvpsl"><h3 class="svelte-ojvpsl">New Prompt Version</h3> <label class="svelte-ojvpsl">Prompt Name <input placeholder="e.g. system-prompt" class="svelte-ojvpsl"/></label> <label class="svelte-ojvpsl">Content <textarea placeholder="Prompt content…" class="svelte-ojvpsl"></textarea></label> <div class="modal-actions svelte-ojvpsl"><button class="btn-secondary svelte-ojvpsl">Cancel</button> <button class="btn-primary svelte-ojvpsl">Create</button></div></div></div>'), jc = /* @__PURE__ */ $('<div class="modal-overlay svelte-ojvpsl"><div class="modal diff-modal svelte-ojvpsl"><h3 class="svelte-ojvpsl"> </h3> <div class="diff-grid svelte-ojvpsl"><div class="diff-col svelte-ojvpsl"><div class="diff-label svelte-ojvpsl"> </div> <pre class="svelte-ojvpsl"> </pre></div> <div class="diff-col svelte-ojvpsl"><div class="diff-label svelte-ojvpsl"> </div> <pre class="svelte-ojvpsl"> </pre></div></div> <div class="modal-actions svelte-ojvpsl"><button class="btn-secondary svelte-ojvpsl">Close</button> <button class="btn-primary svelte-ojvpsl"> </button></div></div></div>'), Nc = /* @__PURE__ */ $('<div class="prompt-panel svelte-ojvpsl"><button class="panel-header svelte-ojvpsl"><span>Prompt Versions</span> <span class="toggle svelte-ojvpsl"> </span></button> <!></div> <!> <!>', 1);
function Cc(e, t) {
  et(t, !1), Ge(t, "agentId", 8);
  let s = /* @__PURE__ */ L(!1), r = /* @__PURE__ */ L(!1), a = /* @__PURE__ */ L([]), o = /* @__PURE__ */ L(/* @__PURE__ */ new Set()), i = /* @__PURE__ */ L(""), l = /* @__PURE__ */ L(""), v = /* @__PURE__ */ L(!1), c = /* @__PURE__ */ L(null), p = /* @__PURE__ */ L(null);
  async function g() {
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
      const w = await fetch(`/api/v1/prompts/${encodeURIComponent(m)}/versions/${E}/promote`, { method: "POST" });
      if (!w.ok) throw new Error(`${w.status}`);
      await g();
    } catch (w) {
      _(p, w.message);
    }
  }
  async function T() {
    if (!(!n(i) || !n(l)))
      try {
        const m = await fetch("/api/v1/prompts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: n(i),
            content: n(l)
          })
        });
        if (!m.ok) throw new Error(`${m.status}`);
        _(v, !1), _(i, ""), _(l, ""), await g();
      } catch (m) {
        _(p, m.message);
      }
  }
  function x(m) {
    n(o).has(m) ? n(o).delete(m) : n(o).add(m), _(o, new Set(n(o)));
  }
  function N(m, E, w) {
    _(c, { name: m, v1: E, v2: w });
  }
  Ye(() => (n(s), n(a)), () => {
    n(s) && n(a).length === 0 && g();
  }), cn(), st();
  var k = Nc(), R = Ae(k), q = d(R), z = f(d(q), 2), A = d(z), Y = f(q, 2);
  {
    var re = (m) => {
      var E = $c(), w = d(E);
      {
        var I = (M) => {
          var U = _c();
          y(M, U);
        }, H = (M) => {
          var U = gc(), C = d(U);
          D(() => P(C, n(p))), y(M, U);
        }, S = (M) => {
          var U = bc();
          y(M, U);
        }, X = (M) => {
          var U = Sc();
          qe(U, 5, () => n(a), Re, (C, B) => {
            var ye = Ec(), oe = d(ye), pe = d(oe);
            let le;
            var se = f(pe, 2), ee = d(se), ue = f(se, 2), $e = d(ue), O = f(ue, 2), j = d(O), K = f(oe, 2);
            {
              var te = (Ie) => {
                var Me = kc();
                qe(Me, 5, () => (n(B), u(() => n(B).versions ?? [])), Re, (xe, ne) => {
                  var ve = xc(), ae = Ae(ve);
                  let fe;
                  var Oe = d(ae), We = d(Oe), He = f(Oe, 2);
                  {
                    var Be = (Ee) => {
                      var De = mc();
                      y(Ee, De);
                    }, J = (Ee) => {
                      var De = yc();
                      G("click", De, () => h(n(B).name, n(ne).id)), y(Ee, De);
                    };
                    V(He, (Ee) => {
                      n(ne), u(() => n(ne).isActive) ? Ee(Be) : Ee(J, -1);
                    });
                  }
                  var Z = f(He, 2);
                  {
                    var ce = (Ee) => {
                      var De = wc();
                      G("click", De, () => N(n(B).name, n(B).activeVersion, n(ne))), y(Ee, De);
                    };
                    V(Z, (Ee) => {
                      n(B), n(ne), u(() => n(B).activeVersion && !n(ne).isActive) && Ee(ce);
                    });
                  }
                  var je = f(Z, 2), Je = d(je), ke = f(ae, 2), Ce = d(ke);
                  D(
                    (Ee, De) => {
                      fe = jt(ae, 1, "version-row svelte-ojvpsl", null, fe, { active: n(ne).isActive }), P(We, `v${n(ne), u(() => n(ne).versionNumber) ?? ""}`), P(Je, Ee), P(Ce, `${De ?? ""}${n(ne), u(() => n(ne).content.length > 120 ? "…" : "") ?? ""}`);
                    },
                    [
                      () => (n(ne), u(() => new Date(n(ne).createdAt).toLocaleDateString())),
                      () => (n(ne), u(() => n(ne).content.slice(0, 120)))
                    ]
                  ), y(xe, ve);
                }), y(Ie, Me);
              }, be = /* @__PURE__ */ Kn(() => (n(o), n(B), u(() => n(o).has(n(B).name))));
              V(K, (Ie) => {
                n(be) && Ie(te);
              });
            }
            D(
              (Ie) => {
                le = jt(pe, 1, "active-dot svelte-ojvpsl", null, le, { active: n(B).activeVersion !== null }), P(ee, (n(B), u(() => n(B).name))), P($e, `v${n(B), u(() => {
                  var Me;
                  return ((Me = n(B).activeVersion) == null ? void 0 : Me.versionNumber) ?? "—";
                }) ?? ""}`), P(j, Ie);
              },
              [
                () => (n(o), n(B), u(() => n(o).has(n(B).name) ? "▼" : "▶"))
              ]
            ), G("click", oe, () => x(n(B).name)), y(C, ye);
          }), y(M, U);
        };
        V(w, (M) => {
          n(r) ? M(I) : n(p) ? M(H, 1) : (n(a), u(() => n(a).length === 0) ? M(S, 2) : M(X, -1));
        });
      }
      var de = f(w, 2);
      G("click", de, () => _(v, !0)), y(m, E);
    };
    V(Y, (m) => {
      n(s) && m(re);
    });
  }
  var Q = f(R, 2);
  {
    var ge = (m) => {
      var E = Tc(), w = d(E), I = f(d(w), 2), H = f(d(I)), S = f(I, 2), X = f(d(S));
      Le(X, "rows", 6);
      var de = f(S, 2), M = d(de), U = f(M, 2);
      ut(H, () => n(i), (C) => _(i, C)), ut(X, () => n(l), (C) => _(l, C)), G("click", M, () => _(v, !1)), G("click", U, T), G("click", E, Tr(() => _(v, !1))), y(m, E);
    };
    V(Q, (m) => {
      n(v) && m(ge);
    });
  }
  var W = f(Q, 2);
  {
    var F = (m) => {
      var E = jc(), w = d(E), I = d(w), H = d(I), S = f(I, 2), X = d(S), de = d(X), M = d(de), U = f(de, 2), C = d(U), B = f(X, 2), ye = d(B), oe = d(ye), pe = f(ye, 2), le = d(pe), se = f(S, 2), ee = d(se), ue = f(ee, 2), $e = d(ue);
      D(() => {
        P(H, `Diff: ${n(c), u(() => n(c).name) ?? ""}`), P(M, `Active (v${n(c), u(() => n(c).v1.versionNumber) ?? ""})`), P(C, (n(c), u(() => n(c).v1.content))), P(oe, `v${n(c), u(() => n(c).v2.versionNumber) ?? ""}`), P(le, (n(c), u(() => n(c).v2.content))), P($e, `Promote v${n(c), u(() => n(c).v2.versionNumber) ?? ""}`);
      }), G("click", ee, () => _(c, null)), G("click", ue, () => {
        h(n(c).name, n(c).v2.id), _(c, null);
      }), G("click", E, Tr(() => _(c, null))), y(m, E);
    };
    V(W, (m) => {
      n(c) && m(F);
    });
  }
  D(() => P(A, n(s) ? "▼" : "▶")), G("click", q, () => {
    _(s, !n(s));
  }), y(e, k), tt();
}
var Ic = /* @__PURE__ */ $('<span class="badge svelte-1bw2oss"> </span>'), Oc = /* @__PURE__ */ $("<div> <!></div>"), Ac = /* @__PURE__ */ $('<div class="loading svelte-1bw2oss">Loading…</div>'), Pc = /* @__PURE__ */ $('<div class="error svelte-1bw2oss"> </div>'), Rc = /* @__PURE__ */ $('<div class="empty svelte-1bw2oss">No test cases yet.</div>'), qc = /* @__PURE__ */ $('<span class="running-indicator svelte-1bw2oss">⟳</span>'), Mc = /* @__PURE__ */ $('<div class="case-row svelte-1bw2oss"><span></span> <span class="case-name svelte-1bw2oss"> </span> <span class="assertion-count svelte-1bw2oss"> </span> <!> <button class="delete-btn svelte-1bw2oss">✕</button></div>'), Dc = /* @__PURE__ */ $('<div class="cases-list svelte-1bw2oss"></div>'), Lc = /* @__PURE__ */ $('<div class="panel-body svelte-1bw2oss"><!> <!> <div class="panel-actions svelte-1bw2oss"><button class="new-btn svelte-1bw2oss">+ New Test</button> <button class="run-btn svelte-1bw2oss"> </button></div></div>'), Fc = /* @__PURE__ */ $('<input placeholder="Expected value (JSON or string)" class="svelte-1bw2oss"/>'), Jc = /* @__PURE__ */ $('<label class="inline svelte-1bw2oss">Threshold <input type="number" min="0" max="1" step="0.05" style="width: 70px;" class="svelte-1bw2oss"/></label>'), zc = /* @__PURE__ */ $('<div class="modal-overlay svelte-1bw2oss"><div class="modal svelte-1bw2oss"><h3 class="svelte-1bw2oss">New Test Case</h3> <label class="svelte-1bw2oss">Name <input placeholder="Test case name" class="svelte-1bw2oss"/></label> <label class="svelte-1bw2oss">Input JSON <textarea class="mono svelte-1bw2oss"></textarea></label> <div class="assertion-builder svelte-1bw2oss"><div class="assertion-header svelte-1bw2oss">Assertion</div> <div class="assertion-row svelte-1bw2oss"><select class="svelte-1bw2oss"><option>Exact Match</option><option>Schema</option><option>Score Threshold</option></select> <input placeholder="Output key, e.g. output.text" class="svelte-1bw2oss"/></div> <!></div> <div class="modal-actions svelte-1bw2oss"><button class="btn-secondary svelte-1bw2oss">Cancel</button> <button class="btn-primary svelte-1bw2oss">Create</button></div></div></div>'), Uc = /* @__PURE__ */ $('<div class="test-panel svelte-1bw2oss"><button class="panel-header svelte-1bw2oss"><span>Test Cases</span> <!> <span class="toggle svelte-1bw2oss"> </span></button> <!></div> <!>', 1);
function Hc(e, t) {
  et(t, !1);
  let s = Ge(t, "agentId", 8), r = /* @__PURE__ */ L(!1), a = /* @__PURE__ */ L(!1), o = /* @__PURE__ */ L(!1), i = /* @__PURE__ */ L([]), l = /* @__PURE__ */ L(null), v = /* @__PURE__ */ L(!1), c = /* @__PURE__ */ L(null), p = /* @__PURE__ */ L({
    name: "",
    inputJson: `{
  
}`,
    assertionType: "exact_match",
    assertionKey: "",
    assertionExpected: "",
    assertionThreshold: 0.8
  });
  async function g() {
    if (s()) {
      _(a, !0), _(c, null);
      try {
        const m = await fetch(`/api/v1/agents/${s()}/test-cases`);
        if (!m.ok) throw new Error(`${m.status}`);
        const E = await m.json();
        _(i, E.testCases ?? []);
      } catch (m) {
        _(c, m.message);
      } finally {
        _(a, !1);
      }
    }
  }
  async function h() {
    _(o, !0), _(l, null), _(c, null);
    try {
      const m = await fetch(`/api/v1/agents/${s()}/test-cases/run`, { method: "POST" });
      if (!m.ok) throw new Error(`${m.status}`);
      _(l, await m.json()), await g();
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
      }), await g();
    } catch (m) {
      _(c, m.message);
    }
  }
  async function x(m) {
    try {
      await fetch(`/api/v1/agents/${s()}/test-cases/${m}`, { method: "DELETE" }), await g();
    } catch {
    }
  }
  function N(m) {
    return `${m.passed}/${m.total}`;
  }
  Ye(() => (n(r), n(i), n(a)), () => {
    n(r) && n(i).length === 0 && !n(a) && g();
  }), cn(), st();
  var k = Uc(), R = Ae(k), q = d(R), z = f(d(q), 2);
  {
    var A = (m) => {
      var E = Ic(), w = d(E);
      D(() => P(w, (n(i), u(() => n(i).length)))), y(m, E);
    };
    V(z, (m) => {
      n(i), u(() => n(i).length > 0) && m(A);
    });
  }
  var Y = f(z, 2), re = d(Y), Q = f(q, 2);
  {
    var ge = (m) => {
      var E = Lc(), w = d(E);
      {
        var I = (oe) => {
          var pe = Oc();
          let le;
          var se = d(pe), ee = f(se);
          {
            var ue = ($e) => {
              var O = Ui();
              D(() => P(O, `— ${n(l), u(() => n(l).failed) ?? ""} failed`)), y($e, O);
            };
            V(ee, ($e) => {
              n(l), u(() => n(l).failed > 0) && $e(ue);
            });
          }
          D(
            ($e) => {
              le = jt(pe, 1, "suite-summary svelte-1bw2oss", null, le, {
                passed: n(l).failed === 0,
                failed: n(l).failed > 0
              }), P(se, `Suite: ${$e ?? ""} passed `);
            },
            [
              () => (n(l), u(() => N(n(l))))
            ]
          ), y(oe, pe);
        };
        V(w, (oe) => {
          n(l) && oe(I);
        });
      }
      var H = f(w, 2);
      {
        var S = (oe) => {
          var pe = Ac();
          y(oe, pe);
        }, X = (oe) => {
          var pe = Pc(), le = d(pe);
          D(() => P(le, n(c))), y(oe, pe);
        }, de = (oe) => {
          var pe = Rc();
          y(oe, pe);
        }, M = (oe) => {
          var pe = Dc();
          qe(pe, 5, () => n(i), Re, (le, se) => {
            const ee = /* @__PURE__ */ Xe(() => (n(l), n(se), u(() => {
              var ne, ve;
              return (ve = (ne = n(l)) == null ? void 0 : ne.results) == null ? void 0 : ve.find((ae) => ae.id === n(se).id);
            })));
            var ue = Mc(), $e = d(ue);
            let O;
            var j = f($e, 2), K = d(j), te = f(j, 2), be = d(te), Ie = f(te, 2);
            {
              var Me = (ne) => {
                var ve = qc();
                y(ne, ve);
              };
              V(Ie, (ne) => {
                n(o) && ne(Me);
              });
            }
            var xe = f(Ie, 2);
            D(() => {
              var ne, ve, ae, fe;
              O = jt($e, 1, "status-dot svelte-1bw2oss", null, O, {
                pass: ((ne = n(ee)) == null ? void 0 : ne.passed) === !0 || ((ve = n(se).lastResult) == null ? void 0 : ve.passed) === !0,
                fail: ((ae = n(ee)) == null ? void 0 : ae.passed) === !1 || ((fe = n(se).lastResult) == null ? void 0 : fe.passed) === !1
              }), P(K, (n(se), u(() => n(se).name))), P(be, `${n(se), u(() => (n(se).assertions ?? []).length) ?? ""} assertions`);
            }), G("click", xe, () => x(n(se).id)), y(le, ue);
          }), y(oe, pe);
        };
        V(H, (oe) => {
          n(a) ? oe(S) : n(c) ? oe(X, 1) : (n(i), u(() => n(i).length === 0) ? oe(de, 2) : oe(M, -1));
        });
      }
      var U = f(H, 2), C = d(U), B = f(C, 2), ye = d(B);
      D(() => {
        B.disabled = (n(o), n(i), u(() => n(o) || n(i).length === 0)), P(ye, n(o) ? "Running…" : "Run Suite");
      }), G("click", C, () => _(v, !0)), G("click", B, h), y(m, E);
    };
    V(Q, (m) => {
      n(r) && m(ge);
    });
  }
  var W = f(R, 2);
  {
    var F = (m) => {
      var E = zc(), w = d(E), I = f(d(w), 2), H = f(d(I)), S = f(I, 2), X = f(d(S));
      Le(X, "rows", 5);
      var de = f(S, 2), M = f(d(de), 2), U = d(M), C = d(U);
      C.value = C.__value = "exact_match";
      var B = f(C);
      B.value = B.__value = "schema";
      var ye = f(B);
      ye.value = ye.__value = "evaluate_score";
      var oe = f(U, 2), pe = f(M, 2);
      {
        var le = (O) => {
          var j = Fc();
          ut(j, () => n(p).assertionExpected, (K) => en(p, n(p).assertionExpected = K)), y(O, j);
        }, se = (O) => {
          var j = Jc(), K = f(d(j));
          ut(K, () => n(p).assertionThreshold, (te) => en(p, n(p).assertionThreshold = te)), y(O, j);
        };
        V(pe, (O) => {
          n(p), u(() => n(p).assertionType === "exact_match") ? O(le) : (n(p), u(() => n(p).assertionType === "evaluate_score") && O(se, 1));
        });
      }
      var ee = f(de, 2), ue = d(ee), $e = f(ue, 2);
      D(() => $e.disabled = (n(p), u(() => !n(p).name))), ut(H, () => n(p).name, (O) => en(p, n(p).name = O)), ut(X, () => n(p).inputJson, (O) => en(p, n(p).inputJson = O)), $r(U, () => n(p).assertionType, (O) => en(p, n(p).assertionType = O)), ut(oe, () => n(p).assertionKey, (O) => en(p, n(p).assertionKey = O)), G("click", ue, () => _(v, !1)), G("click", $e, T), G("click", E, Tr(() => _(v, !1))), y(m, E);
    };
    V(W, (m) => {
      n(v) && m(F);
    });
  }
  D(() => P(re, n(r) ? "▼" : "▶")), G("click", q, () => {
    _(r, !n(r));
  }), y(e, k), tt();
}
var Bc = /* @__PURE__ */ $('<div class="studio svelte-13r820j"><aside><!></aside> <main class="canvas-area svelte-13r820j"><!> <!></main> <aside class="panel svelte-13r820j"><!> <!> <!> <!> <!> <!> <!> <!></aside></div>');
function Vc(e, t) {
  et(t, !1);
  const s = () => nt(vn, "$selectedNode", r), [r, a] = Wt();
  let o = Ge(t, "agentId", 8), i = /* @__PURE__ */ L(!1), l = /* @__PURE__ */ L(""), v = /* @__PURE__ */ L(null), c = /* @__PURE__ */ L(null);
  Ks(async () => {
    if (o()) {
      try {
        const [S, X, de] = await Promise.all([
          fetch(`/api/agents/${o()}`),
          fetch(`/api/agents/${o()}/versions`),
          fetch(`/api/agents/${o()}/config`)
        ]);
        let M = null;
        if (S.ok && (M = await S.json(), Rs.set(M), _(i, (M == null ? void 0 : M.authoringMode) === "code-defined"), _(l, (M == null ? void 0 : M.handle) ?? ""), n(i) && _(v, (M == null ? void 0 : M.updatedAt) ?? null)), (M == null ? void 0 : M.status) === "draft" && M.draftGraphJson)
          ot.set(JSON.parse(M.draftGraphJson));
        else if (X.ok) {
          const U = await X.json();
          if (U.length > 0) {
            const C = U[U.length - 1];
            ot.set(JSON.parse(C.graphJson ?? "{}"));
          }
        }
        if (de.ok) {
          const C = (await de.json()).triggerConfig ?? {};
          An.set({
            triggerType: C.type ?? "rest",
            description: "",
            cronExpression: C.expression ?? "",
            webhookUrl: C.webhookUrl ?? ""
          });
        }
      } catch {
      }
      window.addEventListener("caal:canvas-highlight", p), window.addEventListener("caal:canvas-focus", g), window.addEventListener("caal:apply-proposal", h);
    }
  });
  function p(S) {
    const X = S.detail;
    window.dispatchEvent(new CustomEvent("canvas:highlight", { detail: X }));
  }
  function g(S) {
    const X = S.detail;
    window.dispatchEvent(new CustomEvent("canvas:focus", { detail: X }));
  }
  function h(S) {
    const X = S.detail;
    ot.update((de) => {
      const M = structuredClone(de);
      for (const U of X.patches)
        if (U.op === "add_node" && U.data) {
          const C = U.data;
          M.nodes[C.id] = C;
        } else if (U.op === "update_node" && U.target && U.data) {
          const C = M.nodes[U.target];
          C && (M.nodes[U.target] = { ...C, ...U.data });
        } else U.op === "delete_node" && U.target ? delete M.nodes[U.target] : U.op === "add_edge" && U.data ? M.edges = [...M.edges ?? [], U.data] : U.op === "add_tool_edge" && U.data && (M.toolEdges = [...M.toolEdges ?? [], U.data]);
      return M;
    });
  }
  st();
  var T = Bc(), x = d(T);
  let N;
  var k = d(x);
  xl(k, {
    get readonly() {
      return n(i);
    }
  });
  var R = f(x, 2), q = d(R);
  {
    var z = (S) => {
      oc(S, {
        get handle() {
          return n(l);
        },
        get lastSyncAt() {
          return n(v);
        }
      });
    };
    V(q, (S) => {
      n(i) && S(z);
    });
  }
  var A = f(q, 2);
  ml(A, {
    get agentId() {
      return o();
    },
    get readonly() {
      return n(i);
    }
  });
  var Y = f(R, 2), re = d(Y);
  {
    var Q = (S) => {
      Jl(S, {
        get node() {
          return s();
        },
        get readonly() {
          return n(i);
        }
      });
    }, ge = (S) => {
      av(S, {
        get agentId() {
          return o();
        },
        get readonly() {
          return n(i);
        }
      });
    };
    V(re, (S) => {
      s() ? S(Q) : S(ge, -1);
    });
  }
  var W = f(re, 2);
  $v(W, {});
  var F = f(W, 2);
  Mv(F, {});
  var m = f(F, 2);
  mv(m, {
    get agentId() {
      return o();
    },
    $$events: { sessionId: (S) => _(c, S.detail) }
  });
  var E = f(m, 2);
  hc(E, {
    get agentId() {
      return o();
    },
    get sessionId() {
      return n(c);
    }
  });
  var w = f(E, 2);
  Cc(w, {
    get agentId() {
      return o();
    }
  });
  var I = f(w, 2);
  Hc(I, {
    get agentId() {
      return o();
    }
  });
  var H = f(I, 2);
  sc(H, {
    get agentId() {
      return o();
    }
  }), D(() => N = jt(x, 1, "palette svelte-13r820j", null, N, { readonly: n(i) })), y(e, T), tt(), a();
}
const ir = document.getElementById("canvas-mount");
if (ir) {
  const e = ir.getAttribute("data-agent-id") ?? "";
  Vi(Vc, { target: ir, props: { agentId: e } });
}
