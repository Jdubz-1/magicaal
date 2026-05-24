var Rs = Object.defineProperty;
var yr = (e) => {
  throw TypeError(e);
};
var $s = (e, t, n) => t in e ? Rs(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var X = (e, t, n) => $s(e, typeof t != "symbol" ? t + "" : t, n), Mn = (e, t, n) => t.has(e) || yr("Cannot " + n);
var f = (e, t, n) => (Mn(e, t, "read from private field"), n ? n.call(e) : t.get(e)), k = (e, t, n) => t.has(e) ? yr("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), x = (e, t, n, r) => (Mn(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), R = (e, t, n) => (Mn(e, t, "access private method"), n);
var Pr;
typeof window < "u" && ((Pr = window.__svelte ?? (window.__svelte = {})).v ?? (Pr.v = /* @__PURE__ */ new Set())).add("5");
let Dt = !1, Ps = !1;
function Ms() {
  Dt = !0;
}
Ms();
const Is = 1, Cs = 2, qs = 16, Ds = 2, Ls = 4, Fs = 8, js = 1, Bs = 2, B = Symbol("uninitialized"), Cr = "http://www.w3.org/1999/xhtml", qr = !1;
var Dr = Array.isArray, zs = Array.prototype.indexOf, tt = Array.prototype.includes, An = Array.from, Lr = Object.defineProperty, wt = Object.getOwnPropertyDescriptor, Fr = Object.getOwnPropertyDescriptors, Us = Object.prototype, Hs = Array.prototype, ar = Object.getPrototypeOf, mr = Object.isExtensible;
const nt = () => {
};
function Vs(e) {
  return e();
}
function Bn(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function jr() {
  var e, t, n = new Promise((r, s) => {
    e = r, t = s;
  });
  return { promise: n, resolve: e, reject: t };
}
const J = 2, Rt = 4, nn = 8, Br = 1 << 24, we = 16, Se = 32, Ve = 64, zn = 128, ve = 512, j = 1024, U = 2048, xe = 4096, G = 8192, he = 16384, vt = 32768, Un = 1 << 25, $t = 65536, wn = 1 << 17, Js = 1 << 18, Lt = 1 << 19, zr = 1 << 20, Ce = 1 << 25, ft = 65536, En = 1 << 21, Et = 1 << 22, He = 1 << 23, rt = Symbol("$state"), Ys = Symbol("legacy props"), Gs = Symbol(""), hn = Symbol("attributes"), Hn = Symbol("class"), Ws = Symbol("style"), zt = Symbol("text"), pn = Symbol("form reset"), On = new class extends Error {
  constructor() {
    super(...arguments);
    X(this, "name", "StaleReactionError");
    X(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var Mr;
const Ks = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((Mr = globalThis.document) != null && Mr.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function Xs(e) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function Zs() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Qs(e, t, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function ei(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function ti() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function ni(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function ri() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function si() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function ii() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function li() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function ai() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function oi() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function fi() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Ur(e) {
  return e === this.v;
}
function Hr(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Vr(e) {
  return !Hr(e, this.v);
}
let C = null;
function Pt(e) {
  C = e;
}
function ht(e, t = !1, n) {
  C = {
    p: C,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      N
    ),
    l: Dt && !t ? { s: null, u: null, $: [] } : null
  };
}
function pt(e) {
  var t = (
    /** @type {ComponentContext} */
    C
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      vs(r);
  }
  return t.i = !0, C = t.p, /** @type {T} */
  {};
}
function rn() {
  return !Dt || C !== null && C.l === null;
}
let Ye = [];
function Jr() {
  var e = Ye;
  Ye = [], Bn(e);
}
function st(e) {
  if (Ye.length === 0 && !Jt) {
    var t = Ye;
    queueMicrotask(() => {
      t === Ye && Jr();
    });
  }
  Ye.push(e);
}
function ui() {
  for (; Ye.length > 0; )
    Jr();
}
function Yr(e) {
  var t = N;
  if (t === null)
    return O.f |= He, e;
  if ((t.f & vt) === 0 && (t.f & Rt) === 0)
    throw e;
  Ue(e, t);
}
function Ue(e, t) {
  for (; t !== null; ) {
    if ((t.f & zn) !== 0) {
      if ((t.f & vt) === 0)
        throw e;
      try {
        t.b.error(e);
        return;
      } catch (n) {
        e = n;
      }
    }
    t = t.parent;
  }
  throw e;
}
const ci = -7169;
function D(e, t) {
  e.f = e.f & ci | t;
}
function or(e) {
  (e.f & ve) !== 0 || e.deps === null ? D(e, j) : D(e, xe);
}
function Gr(e) {
  if (e !== null)
    for (const t of e)
      (t.f & J) === 0 || (t.f & ft) === 0 || (t.f ^= ft, Gr(
        /** @type {Derived} */
        t.deps
      ));
}
function Wr(e, t, n) {
  (e.f & U) !== 0 ? t.add(e) : (e.f & xe) !== 0 && n.add(e), Gr(e.deps), D(e, j);
}
function Kr(e, t, n) {
  if (e == null)
    return t(void 0), nt;
  const r = S(
    () => e.subscribe(
      t,
      // @ts-expect-error
      n
    )
  );
  return r.unsubscribe ? () => r.unsubscribe() : r;
}
const _t = [];
function Rn(e, t = nt) {
  let n = null;
  const r = /* @__PURE__ */ new Set();
  function s(l) {
    if (Hr(e, l) && (e = l, n)) {
      const a = !_t.length;
      for (const u of r)
        u[1](), _t.push(u, e);
      if (a) {
        for (let u = 0; u < _t.length; u += 2)
          _t[u][0](_t[u + 1]);
        _t.length = 0;
      }
    }
  }
  function i(l) {
    s(l(
      /** @type {T} */
      e
    ));
  }
  function o(l, a = nt) {
    const u = [l, a];
    return r.add(u), r.size === 1 && (n = t(s, i) || nt), l(
      /** @type {T} */
      e
    ), () => {
      r.delete(u), r.size === 0 && n && (n(), n = null);
    };
  }
  return { set: s, update: i, subscribe: o };
}
function di(e) {
  let t;
  return Kr(e, (n) => t = n)(), t;
}
let on = !1, Vn = Symbol("unmounted");
function Mt(e, t, n) {
  const r = n[t] ?? (n[t] = {
    store: null,
    source: /* @__PURE__ */ Oe(void 0),
    unsubscribe: nt
  });
  if (r.store !== e && !(Vn in n))
    if (r.unsubscribe(), r.store = e ?? null, e == null)
      r.source.v = void 0, r.unsubscribe = nt;
    else {
      var s = !0;
      r.unsubscribe = Kr(e, (i) => {
        s ? r.source.v = i : L(r.source, i);
      }), s = !1;
    }
  return e && Vn in n ? di(e) : y(r.source);
}
function $n() {
  const e = {};
  function t() {
    hr(() => {
      for (var n in e)
        e[n].unsubscribe();
      Lr(e, Vn, {
        enumerable: !1,
        value: !0
      });
    });
  }
  return [e, t];
}
function vi(e) {
  var t = on;
  try {
    return on = !1, [e(), on];
  } finally {
    on = t;
  }
}
let In = null, gt = null, w = null, Vt = null, H = null, Jn = null, Jt = !1, Cn = !1, yt = null, _n = null;
var wr = 0;
let hi = 1;
var xt, je, We, kt, Tt, Ke, Nt, Pe, Kt, se, Xt, Be, Te, Ne, At, Xe, P, Yn, Ut, Gn, Xr, Zr, gn, pi, Wn, bt;
const kn = class kn {
  constructor() {
    k(this, P);
    X(this, "id", hi++);
    /** True as soon as `#process` was called */
    k(this, xt, !1);
    X(this, "linked", !0);
    /** @type {Batch | null} */
    k(this, je, null);
    /** @type {Batch | null} */
    k(this, We, null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    X(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    X(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    X(this, "previous", /* @__PURE__ */ new Map());
    /**
     * Async effects which this batch doesn't take into account anymore when calculating blockers,
     * as it has a value for it already.
     * @type {Set<Effect>}
     */
    X(this, "unblocked", /* @__PURE__ */ new Set());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    k(this, kt, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    k(this, Tt, /* @__PURE__ */ new Set());
    /**
     * Callbacks that should run only when a fork is committed.
     * @type {Set<(batch: Batch) => void>}
     */
    k(this, Ke, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    k(this, Nt, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    k(this, Pe, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    k(this, Kt, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    k(this, se, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    k(this, Xt, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    k(this, Be, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    k(this, Te, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    k(this, Ne, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    k(this, At, /* @__PURE__ */ new Set());
    X(this, "is_fork", !1);
    k(this, Xe, !1);
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    f(this, Ne).has(t) || f(this, Ne).set(t, { d: [], m: [] }), f(this, At).delete(t);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(t, n = (r) => this.schedule(r)) {
    var r = f(this, Ne).get(t);
    if (r) {
      f(this, Ne).delete(t);
      for (var s of r.d)
        D(s, U), n(s);
      for (s of r.m)
        D(s, xe), n(s);
    }
    f(this, At).add(t);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(t, n, r = !1) {
    t.v !== B && !this.previous.has(t) && this.previous.set(t, t.v), (t.f & He) === 0 && (this.current.set(t, [n, r]), H == null || H.set(t, n)), this.is_fork || (t.v = n);
  }
  activate() {
    w = this;
  }
  deactivate() {
    w = null, H = null;
  }
  flush() {
    try {
      Cn = !0, w = this, R(this, P, Ut).call(this);
    } finally {
      wr = 0, Jn = null, yt = null, _n = null, Cn = !1, w = null, H = null, it.clear();
    }
  }
  discard() {
    for (const t of f(this, Tt)) t(this);
    f(this, Tt).clear(), f(this, Ke).clear(), R(this, P, bt).call(this);
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(t) {
    f(this, Xt).push(t);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(t, n) {
    if (x(this, Nt, f(this, Nt) + 1), t) {
      let r = f(this, Pe).get(n) ?? 0;
      f(this, Pe).set(n, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(t, n) {
    if (x(this, Nt, f(this, Nt) - 1), t) {
      let r = f(this, Pe).get(n) ?? 0;
      r === 1 ? f(this, Pe).delete(n) : f(this, Pe).set(n, r - 1);
    }
    f(this, Xe) || (x(this, Xe, !0), st(() => {
      x(this, Xe, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(t, n) {
    for (const r of t)
      f(this, Be).add(r);
    for (const r of n)
      f(this, Te).add(r);
    t.clear(), n.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(t) {
    f(this, kt).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    f(this, Tt).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  on_fork_commit(t) {
    f(this, Ke).add(t);
  }
  run_fork_commit_callbacks() {
    for (const t of f(this, Ke)) t(this);
    f(this, Ke).clear();
  }
  settled() {
    return (f(this, Kt) ?? x(this, Kt, jr())).promise;
  }
  static ensure() {
    var t;
    if (w === null) {
      const n = w = new kn();
      R(t = n, P, Wn).call(t), !Cn && !Jt && st(() => {
        f(n, xt) || n.flush();
      });
    }
    return w;
  }
  apply() {
    {
      H = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(t) {
    var s;
    if (Jn = t, (s = t.b) != null && s.is_pending && (t.f & (Rt | nn | Br)) !== 0 && (t.f & vt) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var n = t; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (yt !== null && n === N && (O === null || (O.f & J) === 0))
        return;
      if ((r & (Ve | Se)) !== 0) {
        if ((r & j) === 0)
          return;
        n.f ^= j;
      }
    }
    f(this, se).push(n);
  }
};
xt = new WeakMap(), je = new WeakMap(), We = new WeakMap(), kt = new WeakMap(), Tt = new WeakMap(), Ke = new WeakMap(), Nt = new WeakMap(), Pe = new WeakMap(), Kt = new WeakMap(), se = new WeakMap(), Xt = new WeakMap(), Be = new WeakMap(), Te = new WeakMap(), Ne = new WeakMap(), At = new WeakMap(), Xe = new WeakMap(), P = new WeakSet(), Yn = function() {
  if (this.is_fork) return !0;
  for (const r of f(this, Pe).keys()) {
    for (var t = r, n = !1; t.parent !== null; ) {
      if (f(this, Ne).has(t)) {
        n = !0;
        break;
      }
      t = t.parent;
    }
    if (!n)
      return !0;
  }
  return !1;
}, Ut = function() {
  var a, u, h, v;
  if (x(this, xt, !0), wr++ > 1e3 && (R(this, P, bt).call(this), gi()), !R(this, P, Yn).call(this)) {
    for (const c of f(this, Be))
      f(this, Te).delete(c), D(c, U), this.schedule(c);
    for (const c of f(this, Te))
      D(c, xe), this.schedule(c);
  }
  const t = f(this, se);
  x(this, se, []), this.apply();
  var n = yt = [], r = [], s = _n = [];
  for (const c of t)
    try {
      R(this, P, Gn).call(this, c, n, r);
    } catch (_) {
      throw ts(c), _;
    }
  if (w = null, s.length > 0) {
    var i = kn.ensure();
    for (const c of s)
      i.schedule(c);
  }
  if (yt = null, _n = null, R(this, P, Yn).call(this)) {
    R(this, P, gn).call(this, r), R(this, P, gn).call(this, n);
    for (const [c, _] of f(this, Ne))
      es(c, _);
    s.length > 0 && /** @type {unknown} */
    R(a = w, P, Ut).call(a);
    return;
  }
  const o = R(this, P, Xr).call(this);
  if (o) {
    R(u = o, P, Zr).call(u, this);
    return;
  }
  f(this, Be).clear(), f(this, Te).clear();
  for (const c of f(this, kt)) c(this);
  f(this, kt).clear(), Vt = this, Er(r), Er(n), Vt = null, (h = f(this, Kt)) == null || h.resolve();
  var l = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    w
  );
  if (this.linked && f(this, Nt) === 0 && R(this, P, bt).call(this), f(this, se).length > 0) {
    l === null && (l = this, R(this, P, Wn).call(this));
    const c = l;
    f(c, se).push(...f(this, se).filter((_) => !f(c, se).includes(_)));
  }
  l !== null && R(v = l, P, Ut).call(v);
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
Gn = function(t, n, r) {
  t.f ^= j;
  for (var s = t.first; s !== null; ) {
    var i = s.f, o = (i & (Se | Ve)) !== 0, l = o && (i & j) !== 0, a = l || (i & G) !== 0 || f(this, Ne).has(s);
    if (!a && s.fn !== null) {
      o ? s.f ^= j : (i & Rt) !== 0 ? n.push(s) : Ft(s) && ((i & we) !== 0 && f(this, Te).add(s), dt(s));
      var u = s.first;
      if (u !== null) {
        s = u;
        continue;
      }
    }
    for (; s !== null; ) {
      var h = s.next;
      if (h !== null) {
        s = h;
        break;
      }
      s = s.parent;
    }
  }
}, Xr = function() {
  for (var t = f(this, je); t !== null; ) {
    if (!t.is_fork) {
      for (const [n, [, r]] of this.current)
        if (t.current.has(n) && !r)
          return t;
    }
    t = f(t, je);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
Zr = function(t) {
  var r;
  for (const [s, i] of t.current)
    !this.previous.has(s) && t.previous.has(s) && this.previous.set(s, t.previous.get(s)), this.current.set(s, i);
  for (const [s, i] of t.async_deriveds) {
    const o = this.async_deriveds.get(s);
    o && i.promise.then(o.resolve);
  }
  const n = (s) => {
    var i = s.reactions;
    if (i !== null)
      for (const a of i) {
        var o = a.f;
        if ((o & J) !== 0)
          n(
            /** @type {Derived} */
            a
          );
        else {
          var l = (
            /** @type {Effect} */
            a
          );
          o & (Et | we) && !this.async_deriveds.has(l) && (f(this, Te).delete(l), D(l, U), this.schedule(l));
        }
      }
  };
  for (const s of this.current.keys())
    n(s);
  this.oncommit(() => t.discard()), R(r = t, P, bt).call(r), w = this, R(this, P, Ut).call(this);
}, /**
 * @param {Effect[]} effects
 */
gn = function(t) {
  for (var n = 0; n < t.length; n += 1)
    Wr(t[n], f(this, Be), f(this, Te));
}, pi = function() {
  var h;
  R(this, P, bt).call(this);
  for (let v = In; v !== null; v = f(v, We)) {
    var t = v.id < this.id, n = [];
    for (const [c, [_, d]] of this.current) {
      if (v.current.has(c)) {
        var r = (
          /** @type {[any, boolean]} */
          v.current.get(c)[0]
        );
        if (t && _ !== r)
          v.current.set(c, [_, d]);
        else
          continue;
      }
      n.push(c);
    }
    if (t)
      for (const [c, _] of this.async_deriveds) {
        const d = v.async_deriveds.get(c);
        d && _.promise.then(d.resolve);
      }
    if (f(v, xt)) {
      var s = [...v.current.keys()].filter((c) => !this.current.has(c));
      if (s.length === 0)
        t && v.discard();
      else if (n.length > 0) {
        if (t)
          for (const c of f(this, At))
            v.unskip_effect(c, (_) => {
              var d;
              (_.f & (we | Et)) !== 0 ? v.schedule(_) : R(d = v, P, gn).call(d, [_]);
            });
        v.activate();
        var i = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
        for (var l of n)
          Qr(l, s, i, o);
        o = /* @__PURE__ */ new Map();
        var a = [...v.current.keys()].filter(
          (c) => this.current.has(c) ? (
            /** @type {[any, boolean]} */
            this.current.get(c)[0] !== c.v
          ) : !0
        );
        if (a.length > 0)
          for (const c of f(this, Xt))
            (c.f & (he | G | wn)) === 0 && fr(c, a, o) && ((c.f & (Et | we)) !== 0 ? (D(c, U), v.schedule(c)) : f(v, Be).add(c));
        if (f(v, se).length > 0 && !f(v, Xe)) {
          v.apply();
          for (var u of f(v, se))
            R(h = v, P, Gn).call(h, u, [], []);
          x(v, se, []);
        }
        v.deactivate();
      }
    }
  }
}, Wn = function() {
  gt === null ? In = gt = this : (x(gt, We, this), x(this, je, gt)), gt = this;
}, bt = function() {
  var t = f(this, je), n = f(this, We);
  t === null ? In = n : x(t, We, n), n === null ? gt = t : x(n, je, t), this.linked = !1;
};
let ut = kn;
function _i(e) {
  var t = Jt;
  Jt = !0;
  try {
    for (var n; ; ) {
      if (ui(), w === null)
        return (
          /** @type {T} */
          n
        );
      w.flush();
    }
  } finally {
    Jt = t;
  }
}
function gi() {
  try {
    ri();
  } catch (e) {
    Ue(e, Jn);
  }
}
let be = null;
function Er(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (he | G)) === 0 && Ft(r) && (be = /* @__PURE__ */ new Set(), dt(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && ps(r), (be == null ? void 0 : be.size) > 0)) {
        it.clear();
        for (const s of be) {
          if ((s.f & (he | G)) !== 0) continue;
          const i = [s];
          let o = s.parent;
          for (; o !== null; )
            be.has(o) && (be.delete(o), i.push(o)), o = o.parent;
          for (let l = i.length - 1; l >= 0; l--) {
            const a = i[l];
            (a.f & (he | G)) === 0 && dt(a);
          }
        }
        be.clear();
      }
    }
    be = null;
  }
}
function Qr(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const s of e.reactions) {
      const i = s.f;
      (i & J) !== 0 ? Qr(
        /** @type {Derived} */
        s,
        t,
        n,
        r
      ) : (i & (Et | we)) !== 0 && (i & U) === 0 && fr(s, t, r) && (D(s, U), ur(
        /** @type {Effect} */
        s
      ));
    }
}
function fr(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const s of e.deps) {
      if (tt.call(t, s))
        return !0;
      if ((s.f & J) !== 0 && fr(
        /** @type {Derived} */
        s,
        t,
        n
      ))
        return n.set(
          /** @type {Derived} */
          s,
          !0
        ), !0;
    }
  return n.set(e, !1), !1;
}
function ur(e) {
  w.schedule(e);
}
function es(e, t) {
  if (!((e.f & Se) !== 0 && (e.f & j) !== 0)) {
    (e.f & U) !== 0 ? t.d.push(e) : (e.f & xe) !== 0 && t.m.push(e), D(e, j);
    for (var n = e.first; n !== null; )
      es(n, t), n = n.next;
  }
}
function ts(e) {
  D(e, j);
  for (var t = e.first; t !== null; )
    ts(t), t = t.next;
}
function bi(e) {
  let t = 0, n = ct(0), r;
  return () => {
    vr() && (y(n), ln(() => (t === 0 && (r = S(() => e(() => Yt(n)))), t += 1, () => {
      st(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, Yt(n));
      });
    })));
  };
}
var yi = $t | Lt;
function mi(e, t, n, r) {
  new wi(e, t, n, r);
}
var fe, lr, ue, Ze, Z, ce, Y, ie, Me, Qe, ze, Ot, Zt, Qt, Ie, Tn, F, Ei, Si, xi, Kn, bn, yn, Xn, Zn;
class wi {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, n, r, s) {
    k(this, F);
    /** @type {Boundary | null} */
    X(this, "parent");
    X(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    X(this, "transform_error");
    /** @type {TemplateNode} */
    k(this, fe);
    /** @type {TemplateNode | null} */
    k(this, lr, null);
    /** @type {BoundaryProps} */
    k(this, ue);
    /** @type {((anchor: Node) => void)} */
    k(this, Ze);
    /** @type {Effect} */
    k(this, Z);
    /** @type {Effect | null} */
    k(this, ce, null);
    /** @type {Effect | null} */
    k(this, Y, null);
    /** @type {Effect | null} */
    k(this, ie, null);
    /** @type {DocumentFragment | null} */
    k(this, Me, null);
    k(this, Qe, 0);
    k(this, ze, 0);
    k(this, Ot, !1);
    /** @type {Set<Effect>} */
    k(this, Zt, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    k(this, Qt, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    k(this, Ie, null);
    k(this, Tn, bi(() => (x(this, Ie, ct(f(this, Qe))), () => {
      x(this, Ie, null);
    })));
    var i;
    x(this, fe, t), x(this, ue, n), x(this, Ze, (o) => {
      var l = (
        /** @type {Effect} */
        N
      );
      l.b = this, l.f |= zn, r(o);
    }), this.parent = /** @type {Effect} */
    N.b, this.transform_error = s ?? ((i = this.parent) == null ? void 0 : i.transform_error) ?? ((o) => o), x(this, Z, pr(() => {
      R(this, F, Kn).call(this);
    }, yi));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    Wr(t, f(this, Zt), f(this, Qt));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!f(this, ue).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(t, n) {
    R(this, F, Xn).call(this, t, n), x(this, Qe, f(this, Qe) + t), !(!f(this, Ie) || f(this, Ot)) && (x(this, Ot, !0), st(() => {
      x(this, Ot, !1), f(this, Ie) && It(f(this, Ie), f(this, Qe));
    }));
  }
  get_effect_pending() {
    return f(this, Tn).call(this), y(
      /** @type {Source<number>} */
      f(this, Ie)
    );
  }
  /** @param {unknown} error */
  error(t) {
    if (!f(this, ue).onerror && !f(this, ue).failed)
      throw t;
    w != null && w.is_fork ? (f(this, ce) && w.skip_effect(f(this, ce)), f(this, Y) && w.skip_effect(f(this, Y)), f(this, ie) && w.skip_effect(f(this, ie)), w.on_fork_commit(() => {
      R(this, F, Zn).call(this, t);
    })) : R(this, F, Zn).call(this, t);
  }
}
fe = new WeakMap(), lr = new WeakMap(), ue = new WeakMap(), Ze = new WeakMap(), Z = new WeakMap(), ce = new WeakMap(), Y = new WeakMap(), ie = new WeakMap(), Me = new WeakMap(), Qe = new WeakMap(), ze = new WeakMap(), Ot = new WeakMap(), Zt = new WeakMap(), Qt = new WeakMap(), Ie = new WeakMap(), Tn = new WeakMap(), F = new WeakSet(), Ei = function() {
  try {
    x(this, ce, de(() => f(this, Ze).call(this, f(this, fe))));
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
Si = function(t) {
  const n = f(this, ue).failed;
  n && x(this, ie, de(() => {
    n(
      f(this, fe),
      () => t,
      () => () => {
      }
    );
  }));
}, xi = function() {
  const t = f(this, ue).pending;
  t && (this.is_pending = !0, x(this, Y, de(() => t(f(this, fe)))), st(() => {
    var n = x(this, Me, document.createDocumentFragment()), r = Ct();
    n.append(r), x(this, ce, R(this, F, yn).call(this, () => de(() => f(this, Ze).call(this, r)))), f(this, ze) === 0 && (f(this, fe).before(n), x(this, Me, null), lt(
      /** @type {Effect} */
      f(this, Y),
      () => {
        x(this, Y, null);
      }
    ), R(this, F, bn).call(
      this,
      /** @type {Batch} */
      w
    ));
  }));
}, Kn = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), x(this, ze, 0), x(this, Qe, 0), x(this, ce, de(() => {
      f(this, Ze).call(this, f(this, fe));
    })), f(this, ze) > 0) {
      var t = x(this, Me, document.createDocumentFragment());
      br(f(this, ce), t);
      const n = (
        /** @type {(anchor: Node) => void} */
        f(this, ue).pending
      );
      x(this, Y, de(() => n(f(this, fe))));
    } else
      R(this, F, bn).call(
        this,
        /** @type {Batch} */
        w
      );
  } catch (n) {
    this.error(n);
  }
}, /**
 * @param {Batch} batch
 */
bn = function(t) {
  this.is_pending = !1, t.transfer_effects(f(this, Zt), f(this, Qt));
}, /**
 * @template T
 * @param {() => T} fn
 */
yn = function(t) {
  var n = N, r = O, s = C;
  ge(f(this, Z)), _e(f(this, Z)), Pt(f(this, Z).ctx);
  try {
    return ut.ensure(), t();
  } catch (i) {
    return Yr(i), null;
  } finally {
    ge(n), _e(r), Pt(s);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
Xn = function(t, n) {
  var r;
  if (!this.has_pending_snippet()) {
    this.parent && R(r = this.parent, F, Xn).call(r, t, n);
    return;
  }
  x(this, ze, f(this, ze) + t), f(this, ze) === 0 && (R(this, F, bn).call(this, n), f(this, Y) && lt(f(this, Y), () => {
    x(this, Y, null);
  }), f(this, Me) && (f(this, fe).before(f(this, Me)), x(this, Me, null)));
}, /**
 * @param {unknown} error
 */
Zn = function(t) {
  f(this, ce) && (ne(f(this, ce)), x(this, ce, null)), f(this, Y) && (ne(f(this, Y)), x(this, Y, null)), f(this, ie) && (ne(f(this, ie)), x(this, ie, null));
  var n = f(this, ue).onerror;
  let r = f(this, ue).failed;
  var s = !1, i = !1;
  const o = () => {
    if (s) {
      fi();
      return;
    }
    s = !0, i && ai(), f(this, ie) !== null && lt(f(this, ie), () => {
      x(this, ie, null);
    }), R(this, F, yn).call(this, () => {
      R(this, F, Kn).call(this);
    });
  }, l = (a) => {
    try {
      i = !0, n == null || n(a, o), i = !1;
    } catch (u) {
      Ue(u, f(this, Z) && f(this, Z).parent);
    }
    r && x(this, ie, R(this, F, yn).call(this, () => {
      try {
        return de(() => {
          var u = (
            /** @type {Effect} */
            N
          );
          u.b = this, u.f |= zn, r(
            f(this, fe),
            () => a,
            () => o
          );
        });
      } catch (u) {
        return Ue(
          u,
          /** @type {Effect} */
          f(this, Z).parent
        ), null;
      }
    }));
  };
  st(() => {
    var a;
    try {
      a = this.transform_error(t);
    } catch (u) {
      Ue(u, f(this, Z) && f(this, Z).parent);
      return;
    }
    a !== null && typeof a == "object" && typeof /** @type {any} */
    a.then == "function" ? a.then(
      l,
      /** @param {unknown} e */
      (u) => Ue(u, f(this, Z) && f(this, Z).parent)
    ) : l(a);
  });
};
function ki(e, t, n, r) {
  const s = rn() ? cr : St;
  var i = e.filter((c) => !c.settled);
  if (n.length === 0 && i.length === 0) {
    r(t.map(s));
    return;
  }
  var o = (
    /** @type {Effect} */
    N
  ), l = Ti(), a = i.length === 1 ? i[0].promise : i.length > 1 ? Promise.all(i.map((c) => c.promise)) : null;
  function u(c) {
    if ((o.f & he) === 0) {
      l();
      try {
        r(c);
      } catch (_) {
        Ue(_, o);
      }
      Sn();
    }
  }
  var h = ns();
  if (n.length === 0) {
    a.then(() => u(t.map(s))).finally(h);
    return;
  }
  function v() {
    Promise.all(n.map((c) => /* @__PURE__ */ Ni(c))).then((c) => u([...t.map(s), ...c])).catch((c) => Ue(c, o)).finally(h);
  }
  a ? a.then(() => {
    l(), v(), Sn();
  }) : v();
}
function Ti() {
  var e = (
    /** @type {Effect} */
    N
  ), t = O, n = C, r = (
    /** @type {Batch} */
    w
  );
  return function(i = !0) {
    ge(e), _e(t), Pt(n), i && (e.f & he) === 0 && (r == null || r.activate(), r == null || r.apply());
  };
}
function Sn(e = !0) {
  ge(null), _e(null), Pt(null), e && (w == null || w.deactivate());
}
function ns() {
  var e = (
    /** @type {Effect} */
    N
  ), t = (
    /** @type {Boundary} */
    e.b
  ), n = (
    /** @type {Batch} */
    w
  ), r = t.is_rendered();
  return t.update_pending_count(1, n), n.increment(r, e), () => {
    t.update_pending_count(-1, n), n.decrement(r, e);
  };
}
// @__NO_SIDE_EFFECTS__
function cr(e) {
  var t = J | U;
  return N !== null && (N.f |= Lt), {
    ctx: C,
    deps: null,
    effects: null,
    equals: Ur,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      B
    ),
    wv: 0,
    parent: N,
    ac: null
  };
}
const fn = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function Ni(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    N
  );
  r === null && Zs();
  var s = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), i = ct(
    /** @type {V} */
    B
  ), o = !O, l = /* @__PURE__ */ new Set();
  return zi(() => {
    var _;
    var a = (
      /** @type {Effect} */
      N
    ), u = jr();
    s = u.promise;
    try {
      Promise.resolve(e()).then(u.resolve, (d) => {
        d !== On && u.reject(d);
      }).finally(Sn);
    } catch (d) {
      u.reject(d), Sn();
    }
    var h = (
      /** @type {Batch} */
      w
    );
    if (o) {
      if ((a.f & vt) !== 0)
        var v = ns();
      if (
        /** @type {Boundary} */
        r.b.is_rendered()
      )
        (_ = h.async_deriveds.get(a)) == null || _.reject(fn);
      else
        for (const d of l.values())
          d.reject(fn);
      l.add(u), h.async_deriveds.set(a, u);
    }
    const c = (d, E = void 0) => {
      v == null || v(), l.delete(u), E !== fn && (h.activate(), E ? (i.f |= He, It(i, E)) : ((i.f & He) !== 0 && (i.f ^= He), It(i, d)), h.deactivate());
    };
    u.promise.then(c, (d) => c(null, d || "unknown"));
  }), hr(() => {
    for (const a of l)
      a.reject(fn);
  }), new Promise((a) => {
    function u(h) {
      function v() {
        h === s ? a(i) : u(s);
      }
      h.then(v, v);
    }
    u(s);
  });
}
// @__NO_SIDE_EFFECTS__
function St(e) {
  const t = /* @__PURE__ */ cr(e);
  return t.equals = Vr, t;
}
function Ai(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      ne(
        /** @type {Effect} */
        t[n]
      );
  }
}
function dr(e) {
  var t, n = N, r = e.parent;
  if (!De && r !== null && e.v !== B && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (r.f & (he | G)) !== 0)
    return oi(), e.v;
  ge(r);
  try {
    e.f &= ~ft, Ai(e), t = ws(e);
  } finally {
    ge(n);
  }
  return t;
}
function rs(e) {
  var t = dr(e);
  if (!e.equals(t) && (e.wv = ys(), (!(w != null && w.is_fork) || e.deps === null) && (w !== null ? (w.capture(e, t, !0), Vt == null || Vt.capture(e, t, !0)) : e.v = t, e.deps === null))) {
    D(e, j);
    return;
  }
  De || (H !== null ? (vr() || w != null && w.is_fork) && H.set(e, t) : or(e));
}
function Oi(e) {
  var t, n;
  if (e.effects !== null)
    for (const r of e.effects)
      (r.teardown || r.ac) && ((t = r.teardown) == null || t.call(r), (n = r.ac) == null || n.abort(On), r.fn !== null && (r.teardown = nt), r.ac = null, Gt(r, 0), _r(r));
}
function ss(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && t.fn !== null && dt(t);
}
let xn = /* @__PURE__ */ new Set();
const it = /* @__PURE__ */ new Map();
let is = !1;
function ct(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Ur,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function Le(e, t) {
  const n = ct(e);
  return Vi(n), n;
}
// @__NO_SIDE_EFFECTS__
function Oe(e, t = !1, n = !0) {
  var s;
  const r = ct(e);
  return t || (r.equals = Vr), Dt && n && C !== null && C.l !== null && ((s = C.l).s ?? (s.s = [])).push(r), r;
}
function L(e, t, n = !1) {
  O !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Ee || (O.f & wn) !== 0) && rn() && (O.f & (J | we | Et | wn)) !== 0 && (pe === null || !tt.call(pe, e)) && li();
  let r = n ? mt(t) : t;
  return It(e, r, _n);
}
function It(e, t, n = null) {
  if (!e.equals(t)) {
    it.set(e, De ? t : e.v);
    var r = ut.ensure();
    if (r.capture(e, t), (e.f & J) !== 0) {
      const s = (
        /** @type {Derived} */
        e
      );
      (e.f & U) !== 0 && dr(s), H === null && or(s);
    }
    e.wv = ys(), ls(e, U, n), rn() && N !== null && (N.f & j) !== 0 && (N.f & (Se | Ve)) === 0 && (oe === null ? Ji([e]) : oe.push(e)), !r.is_fork && xn.size > 0 && !is && Ri();
  }
  return t;
}
function Ri() {
  is = !1;
  for (const e of xn) {
    (e.f & j) !== 0 && D(e, xe);
    let t;
    try {
      t = Ft(e);
    } catch {
      t = !0;
    }
    t && dt(e);
  }
  xn.clear();
}
function Yt(e) {
  L(e, e.v + 1);
}
function ls(e, t, n) {
  var r = e.reactions;
  if (r !== null)
    for (var s = rn(), i = r.length, o = 0; o < i; o++) {
      var l = r[o], a = l.f;
      if (!(!s && l === N)) {
        var u = (a & U) === 0;
        if (u && D(l, t), (a & wn) !== 0)
          xn.add(
            /** @type {Effect} */
            l
          );
        else if ((a & J) !== 0) {
          var h = (
            /** @type {Derived} */
            l
          );
          H == null || H.delete(h), (a & ft) === 0 && (a & ve && (N === null || (N.f & En) === 0) && (l.f |= ft), ls(h, xe, n));
        } else if (u) {
          var v = (
            /** @type {Effect} */
            l
          );
          (a & we) !== 0 && be !== null && be.add(v), n !== null ? n.push(v) : ur(v);
        }
      }
    }
}
function mt(e) {
  if (typeof e != "object" || e === null || rt in e)
    return e;
  const t = ar(e);
  if (t !== Us && t !== Hs)
    return e;
  var n = /* @__PURE__ */ new Map(), r = Dr(e), s = /* @__PURE__ */ Le(0), i = at, o = (l) => {
    if (at === i)
      return l();
    var a = O, u = at;
    _e(null), Tr(i);
    var h = l();
    return _e(a), Tr(u), h;
  };
  return r && n.set("length", /* @__PURE__ */ Le(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(l, a, u) {
        (!("value" in u) || u.configurable === !1 || u.enumerable === !1 || u.writable === !1) && si();
        var h = n.get(a);
        return h === void 0 ? o(() => {
          var v = /* @__PURE__ */ Le(u.value);
          return n.set(a, v), v;
        }) : L(h, u.value, !0), !0;
      },
      deleteProperty(l, a) {
        var u = n.get(a);
        if (u === void 0) {
          if (a in l) {
            const h = o(() => /* @__PURE__ */ Le(B));
            n.set(a, h), Yt(s);
          }
        } else
          L(u, B), Yt(s);
        return !0;
      },
      get(l, a, u) {
        var _;
        if (a === rt)
          return e;
        var h = n.get(a), v = a in l;
        if (h === void 0 && (!v || (_ = wt(l, a)) != null && _.writable) && (h = o(() => {
          var d = mt(v ? l[a] : B), E = /* @__PURE__ */ Le(d);
          return E;
        }), n.set(a, h)), h !== void 0) {
          var c = y(h);
          return c === B ? void 0 : c;
        }
        return Reflect.get(l, a, u);
      },
      getOwnPropertyDescriptor(l, a) {
        var u = Reflect.getOwnPropertyDescriptor(l, a);
        if (u && "value" in u) {
          var h = n.get(a);
          h && (u.value = y(h));
        } else if (u === void 0) {
          var v = n.get(a), c = v == null ? void 0 : v.v;
          if (v !== void 0 && c !== B)
            return {
              enumerable: !0,
              configurable: !0,
              value: c,
              writable: !0
            };
        }
        return u;
      },
      has(l, a) {
        var c;
        if (a === rt)
          return !0;
        var u = n.get(a), h = u !== void 0 && u.v !== B || Reflect.has(l, a);
        if (u !== void 0 || N !== null && (!h || (c = wt(l, a)) != null && c.writable)) {
          u === void 0 && (u = o(() => {
            var _ = h ? mt(l[a]) : B, d = /* @__PURE__ */ Le(_);
            return d;
          }), n.set(a, u));
          var v = y(u);
          if (v === B)
            return !1;
        }
        return h;
      },
      set(l, a, u, h) {
        var p;
        var v = n.get(a), c = a in l;
        if (r && a === "length")
          for (var _ = u; _ < /** @type {Source<number>} */
          v.v; _ += 1) {
            var d = n.get(_ + "");
            d !== void 0 ? L(d, B) : _ in l && (d = o(() => /* @__PURE__ */ Le(B)), n.set(_ + "", d));
          }
        if (v === void 0)
          (!c || (p = wt(l, a)) != null && p.writable) && (v = o(() => /* @__PURE__ */ Le(void 0)), L(v, mt(u)), n.set(a, v));
        else {
          c = v.v !== B;
          var E = o(() => mt(u));
          L(v, E);
        }
        var m = Reflect.getOwnPropertyDescriptor(l, a);
        if (m != null && m.set && m.set.call(h, u), !c) {
          if (r && typeof a == "string") {
            var b = (
              /** @type {Source<number>} */
              n.get("length")
            ), g = Number(a);
            Number.isInteger(g) && g >= b.v && L(b, g + 1);
          }
          Yt(s);
        }
        return !0;
      },
      ownKeys(l) {
        y(s);
        var a = Reflect.ownKeys(l).filter((v) => {
          var c = n.get(v);
          return c === void 0 || c.v !== B;
        });
        for (var [u, h] of n)
          h.v !== B && !(u in l) && a.push(u);
        return a;
      },
      setPrototypeOf() {
        ii();
      }
    }
  );
}
var Sr, as, os, fs;
function $i() {
  if (Sr === void 0) {
    Sr = window, as = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    os = wt(t, "firstChild").get, fs = wt(t, "nextSibling").get, mr(e) && (e[Hn] = void 0, e[hn] = null, e[Ws] = void 0, e.__e = void 0), mr(n) && (n[zt] = void 0);
  }
}
function Ct(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function qt(e) {
  return (
    /** @type {TemplateNode | null} */
    os.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function sn(e) {
  return (
    /** @type {TemplateNode | null} */
    fs.call(e)
  );
}
function $(e, t) {
  return /* @__PURE__ */ qt(e);
}
function us(e, t = !1) {
  {
    var n = /* @__PURE__ */ qt(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ sn(n) : n;
  }
}
function I(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ sn(r);
  return r;
}
function Pi(e) {
  e.textContent = "";
}
function cs() {
  return !1;
}
function Mi(e, t, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(Cr, e, void 0)
  );
}
let xr = !1;
function Ii() {
  xr || (xr = !0, document.addEventListener(
    "reset",
    (e) => {
      Promise.resolve().then(() => {
        var t;
        if (!e.defaultPrevented)
          for (
            const n of
            /**@type {HTMLFormElement} */
            e.target.elements
          )
            (t = n[pn]) == null || t.call(n);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function Pn(e) {
  var t = O, n = N;
  _e(null), ge(null);
  try {
    return e();
  } finally {
    _e(t), ge(n);
  }
}
function Ci(e, t, n, r = n) {
  e.addEventListener(t, () => Pn(n));
  const s = (
    /** @type {any} */
    e[pn]
  );
  s ? e[pn] = () => {
    s(), r(!0);
  } : e[pn] = () => r(!0), Ii();
}
function ds(e) {
  N === null && (O === null && ni(), ti()), De && ei();
}
function qi(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function Re(e, t) {
  var n = N;
  n !== null && (n.f & G) !== 0 && (e |= G);
  var r = {
    ctx: C,
    deps: null,
    nodes: null,
    f: e | U | ve,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: n,
    b: n && n.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  w == null || w.register_created_effect(r);
  var s = r;
  if ((e & Rt) !== 0)
    yt !== null ? yt.push(r) : ut.ensure().schedule(r);
  else if (t !== null) {
    try {
      dt(r);
    } catch (o) {
      throw ne(r), o;
    }
    s.deps === null && s.teardown === null && s.nodes === null && s.first === s.last && // either `null`, or a singular child
    (s.f & Lt) === 0 && (s = s.first, (e & we) !== 0 && (e & $t) !== 0 && s !== null && (s.f |= $t));
  }
  if (s !== null && (s.parent = n, n !== null && qi(s, n), O !== null && (O.f & J) !== 0 && (e & Ve) === 0)) {
    var i = (
      /** @type {Derived} */
      O
    );
    (i.effects ?? (i.effects = [])).push(s);
  }
  return r;
}
function vr() {
  return O !== null && !Ee;
}
function hr(e) {
  const t = Re(nn, null);
  return D(t, j), t.teardown = e, t;
}
function Qn(e) {
  ds();
  var t = (
    /** @type {Effect} */
    N.f
  ), n = !O && (t & Se) !== 0 && (t & vt) === 0;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      C
    );
    (r.e ?? (r.e = [])).push(e);
  } else
    return vs(e);
}
function vs(e) {
  return Re(Rt | zr, e);
}
function Di(e) {
  return ds(), Re(nn | zr, e);
}
function Li(e) {
  ut.ensure();
  const t = Re(Ve | Lt, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? lt(t, () => {
      ne(t), r(void 0);
    }) : (ne(t), r(void 0));
  });
}
function Fi(e) {
  return Re(Rt, e);
}
function ji(e, t) {
  var n = (
    /** @type {ComponentContextLegacy} */
    C
  ), r = { effect: null, ran: !1, deps: e };
  n.l.$.push(r), r.effect = ln(() => {
    if (e(), !r.ran) {
      r.ran = !0;
      var s = (
        /** @type {Effect} */
        N
      );
      try {
        ge(s.parent), S(t);
      } finally {
        ge(s);
      }
    }
  });
}
function Bi() {
  var e = (
    /** @type {ComponentContextLegacy} */
    C
  );
  ln(() => {
    for (var t of e.l.$) {
      t.deps();
      var n = t.effect;
      (n.f & j) !== 0 && n.deps !== null && D(n, xe), Ft(n) && dt(n), t.ran = !1;
    }
  });
}
function zi(e) {
  return Re(Et | Lt, e);
}
function ln(e, t = 0) {
  return Re(nn | t, e);
}
function te(e, t = [], n = [], r = []) {
  ki(r, t, n, (s) => {
    Re(nn, () => e(...s.map(y)));
  });
}
function pr(e, t = 0) {
  var n = Re(we | t, e);
  return n;
}
function de(e) {
  return Re(Se | Lt, e);
}
function hs(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = De, r = O;
    kr(!0), _e(null);
    try {
      t.call(null);
    } finally {
      kr(n), _e(r);
    }
  }
}
function _r(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const s = n.ac;
    s !== null && Pn(() => {
      s.abort(On);
    });
    var r = n.next;
    (n.f & Ve) !== 0 ? n.parent = null : ne(n, t), n = r;
  }
}
function Ui(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & Se) === 0 && ne(t), t = n;
  }
}
function ne(e, t = !0) {
  var n = !1;
  (t || (e.f & Js) !== 0) && e.nodes !== null && e.nodes.end !== null && (Hi(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), D(e, Un), _r(e, t && !n), Gt(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const i of r)
      i.stop();
  hs(e), e.f ^= Un, e.f |= he;
  var s = e.parent;
  s !== null && s.first !== null && ps(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Hi(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ sn(e);
    e.remove(), e = n;
  }
}
function ps(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function lt(e, t, n = !0) {
  var r = [];
  _s(e, r, !0);
  var s = () => {
    n && ne(e), t && t();
  }, i = r.length;
  if (i > 0) {
    var o = () => --i || s();
    for (var l of r)
      l.out(o);
  } else
    s();
}
function _s(e, t, n) {
  if ((e.f & G) === 0) {
    e.f ^= G;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const l of r)
        (l.is_global || n) && t.push(l);
    for (var s = e.first; s !== null; ) {
      var i = s.next;
      if ((s.f & Ve) === 0) {
        var o = (s.f & $t) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (s.f & Se) !== 0 && (e.f & we) !== 0;
        _s(s, t, o ? n : !1);
      }
      s = i;
    }
  }
}
function gr(e) {
  gs(e, !0);
}
function gs(e, t) {
  if ((e.f & G) !== 0) {
    e.f ^= G, (e.f & j) === 0 && (D(e, U), ut.ensure().schedule(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, s = (n.f & $t) !== 0 || (n.f & Se) !== 0;
      gs(n, s ? t : !1), n = r;
    }
    var i = e.nodes && e.nodes.t;
    if (i !== null)
      for (const o of i)
        (o.is_global || t) && o.in();
  }
}
function br(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var s = n === r ? null : /* @__PURE__ */ sn(n);
      t.append(n), n = s;
    }
}
let mn = !1, De = !1;
function kr(e) {
  De = e;
}
let O = null, Ee = !1;
function _e(e) {
  O = e;
}
let N = null;
function ge(e) {
  N = e;
}
let pe = null;
function Vi(e) {
  O !== null && (pe === null ? pe = [e] : pe.push(e));
}
let Q = null, re = 0, oe = null;
function Ji(e) {
  oe = e;
}
let bs = 1, Ge = 0, at = Ge;
function Tr(e) {
  at = e;
}
function ys() {
  return ++bs;
}
function Ft(e) {
  var t = e.f;
  if ((t & U) !== 0)
    return !0;
  if (t & J && (e.f &= ~ft), (t & xe) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, s = 0; s < r; s++) {
      var i = n[s];
      if (Ft(
        /** @type {Derived} */
        i
      ) && rs(
        /** @type {Derived} */
        i
      ), i.wv > e.wv)
        return !0;
    }
    (t & ve) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    H === null && D(e, j);
  }
  return !1;
}
function ms(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(pe !== null && tt.call(pe, e)))
    for (var s = 0; s < r.length; s++) {
      var i = r[s];
      (i.f & J) !== 0 ? ms(
        /** @type {Derived} */
        i,
        t,
        !1
      ) : t === i && (n ? D(i, U) : (i.f & j) !== 0 && D(i, xe), ur(
        /** @type {Effect} */
        i
      ));
    }
}
function ws(e) {
  var E;
  var t = Q, n = re, r = oe, s = O, i = pe, o = C, l = Ee, a = at, u = e.f;
  Q = /** @type {null | Value[]} */
  null, re = 0, oe = null, O = (u & (Se | Ve)) === 0 ? e : null, pe = null, Pt(e.ctx), Ee = !1, at = ++Ge, e.ac !== null && (Pn(() => {
    e.ac.abort(On);
  }), e.ac = null);
  try {
    e.f |= En;
    var h = (
      /** @type {Function} */
      e.fn
    ), v = h();
    e.f |= vt;
    var c = e.deps, _ = w == null ? void 0 : w.is_fork;
    if (Q !== null) {
      var d;
      if (_ || Gt(e, re), c !== null && re > 0)
        for (c.length = re + Q.length, d = 0; d < Q.length; d++)
          c[re + d] = Q[d];
      else
        e.deps = c = Q;
      if (vr() && (e.f & ve) !== 0)
        for (d = re; d < c.length; d++)
          ((E = c[d]).reactions ?? (E.reactions = [])).push(e);
    } else !_ && c !== null && re < c.length && (Gt(e, re), c.length = re);
    if (rn() && oe !== null && !Ee && c !== null && (e.f & (J | xe | U)) === 0)
      for (d = 0; d < /** @type {Source[]} */
      oe.length; d++)
        ms(
          oe[d],
          /** @type {Effect} */
          e
        );
    if (s !== null && s !== e) {
      if (Ge++, s.deps !== null)
        for (let m = 0; m < n; m += 1)
          s.deps[m].rv = Ge;
      if (t !== null)
        for (const m of t)
          m.rv = Ge;
      oe !== null && (r === null ? r = oe : r.push(.../** @type {Source[]} */
      oe));
    }
    return (e.f & He) !== 0 && (e.f ^= He), v;
  } catch (m) {
    return Yr(m);
  } finally {
    e.f ^= En, Q = t, re = n, oe = r, O = s, pe = i, Pt(o), Ee = l, at = a;
  }
}
function Yi(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = zs.call(n, e);
    if (r !== -1) {
      var s = n.length - 1;
      s === 0 ? n = t.reactions = null : (n[r] = n[s], n.pop());
    }
  }
  if (n === null && (t.f & J) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Q === null || !tt.call(Q, t))) {
    var i = (
      /** @type {Derived} */
      t
    );
    (i.f & ve) !== 0 && (i.f ^= ve, i.f &= ~ft), i.v !== B && or(i), Oi(i), Gt(i, 0);
  }
}
function Gt(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      Yi(e, n[r]);
}
function dt(e) {
  var t = e.f;
  if ((t & he) === 0) {
    D(e, j);
    var n = N, r = mn;
    N = e, mn = !0;
    try {
      (t & (we | Br)) !== 0 ? Ui(e) : _r(e), hs(e);
      var s = ws(e);
      e.teardown = typeof s == "function" ? s : null, e.wv = bs;
      var i;
      qr && Ps && (e.f & U) !== 0 && e.deps;
    } finally {
      mn = r, N = n;
    }
  }
}
async function Gi() {
  await Promise.resolve(), _i();
}
function y(e) {
  var t = e.f, n = (t & J) !== 0;
  if (O !== null && !Ee) {
    var r = N !== null && (N.f & he) !== 0;
    if (!r && (pe === null || !tt.call(pe, e))) {
      var s = O.deps;
      if ((O.f & En) !== 0)
        e.rv < Ge && (e.rv = Ge, Q === null && s !== null && s[re] === e ? re++ : Q === null ? Q = [e] : Q.push(e));
      else {
        O.deps ?? (O.deps = []), tt.call(O.deps, e) || O.deps.push(e);
        var i = e.reactions;
        i === null ? e.reactions = [O] : tt.call(i, O) || i.push(O);
      }
    }
  }
  if (De && it.has(e))
    return it.get(e);
  if (n) {
    var o = (
      /** @type {Derived} */
      e
    );
    if (De) {
      var l = o.v;
      return ((o.f & j) === 0 && o.reactions !== null || Ss(o)) && (l = dr(o)), it.set(o, l), l;
    }
    var a = (o.f & ve) === 0 && !Ee && O !== null && (mn || (O.f & ve) !== 0), u = (o.f & vt) === 0;
    Ft(o) && (a && (o.f |= ve), rs(o)), a && !u && (ss(o), Es(o));
  }
  if (H != null && H.has(e))
    return H.get(e);
  if ((e.f & He) !== 0)
    throw e.v;
  return e.v;
}
function Es(e) {
  if (e.f |= ve, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ?? (t.reactions = [])).push(e), (t.f & J) !== 0 && (t.f & ve) === 0 && (ss(
        /** @type {Derived} */
        t
      ), Es(
        /** @type {Derived} */
        t
      ));
}
function Ss(e) {
  if (e.v === B) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (it.has(t) || (t.f & J) !== 0 && Ss(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function S(e) {
  var t = Ee;
  try {
    return Ee = !0, e();
  } finally {
    Ee = t;
  }
}
function ee(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (rt in e)
      er(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const n = e[t];
        typeof n == "object" && n && rt in n && er(n);
      }
  }
}
function er(e, t = /* @__PURE__ */ new Set()) {
  if (typeof e == "object" && e !== null && // We don't want to traverse DOM elements
  !(e instanceof EventTarget) && !t.has(e)) {
    t.add(e), e instanceof Date && e.getTime();
    for (let r in e)
      try {
        er(e[r], t);
      } catch {
      }
    const n = ar(e);
    if (n !== Object.prototype && n !== Array.prototype && n !== Map.prototype && n !== Set.prototype && n !== Date.prototype) {
      const r = Fr(n);
      for (let s in r) {
        const i = r[s].get;
        if (i)
          try {
            i.call(e);
          } catch {
          }
      }
    }
  }
}
const un = Symbol("events"), Wi = /* @__PURE__ */ new Set(), Nr = /* @__PURE__ */ new Set();
function Ki(e, t, n, r = {}) {
  function s(i) {
    if (r.capture || tr.call(t, i), !i.cancelBubble)
      return Pn(() => n == null ? void 0 : n.call(this, i));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? st(() => {
    t.addEventListener(e, s, r);
  }) : t.addEventListener(e, s, r), s;
}
function me(e, t, n, r, s) {
  var i = { capture: r, passive: s }, o = Ki(e, t, n, i);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && hr(() => {
    t.removeEventListener(e, o, i);
  });
}
let Ar = null;
function tr(e) {
  var m, b;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, s = ((m = e.composedPath) == null ? void 0 : m.call(e)) || [], i = (
    /** @type {null | Element} */
    s[0] || e.target
  );
  Ar = e;
  var o = 0, l = Ar === e && e[un];
  if (l) {
    var a = s.indexOf(l);
    if (a !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[un] = t;
      return;
    }
    var u = s.indexOf(t);
    if (u === -1)
      return;
    a <= u && (o = a);
  }
  if (i = /** @type {Element} */
  s[o] || e.target, i !== t) {
    Lr(e, "currentTarget", {
      configurable: !0,
      get() {
        return i || n;
      }
    });
    var h = O, v = N;
    _e(null), ge(null);
    try {
      for (var c, _ = []; i !== null; ) {
        var d = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var E = (b = i[un]) == null ? void 0 : b[r];
          E != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === i) && E.call(i, e);
        } catch (g) {
          c ? _.push(g) : c = g;
        }
        if (e.cancelBubble || d === t || d === null)
          break;
        i = d;
      }
      if (c) {
        for (let g of _)
          queueMicrotask(() => {
            throw g;
          });
        throw c;
      }
    } finally {
      e[un] = t, delete e.currentTarget, _e(h), ge(v);
    }
  }
}
var Ir;
const qn = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((Ir = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : Ir.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function Xi(e) {
  return (
    /** @type {string} */
    (qn == null ? void 0 : qn.createHTML(e)) ?? e
  );
}
function xs(e) {
  var t = Mi("template");
  return t.innerHTML = Xi(e.replaceAll("<!>", "<!---->")), t.content;
}
function nr(e, t) {
  var n = (
    /** @type {Effect} */
    N
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function W(e, t) {
  var n = (t & js) !== 0, r = (t & Bs) !== 0, s, i = !e.startsWith("<!>");
  return () => {
    s === void 0 && (s = xs(i ? e : "<!>" + e), n || (s = /** @type {TemplateNode} */
    /* @__PURE__ */ qt(s)));
    var o = (
      /** @type {TemplateNode} */
      r || as ? document.importNode(s, !0) : s.cloneNode(!0)
    );
    if (n) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ qt(o)
      ), a = (
        /** @type {TemplateNode} */
        o.lastChild
      );
      nr(l, a);
    } else
      nr(o, o);
    return o;
  };
}
// @__NO_SIDE_EFFECTS__
function Zi(e, t, n = "svg") {
  var r = !e.startsWith("<!>"), s = `<${n}>${r ? e : "<!>" + e}</${n}>`, i;
  return () => {
    if (!i) {
      var o = (
        /** @type {DocumentFragment} */
        xs(s)
      ), l = (
        /** @type {Element} */
        /* @__PURE__ */ qt(o)
      );
      i = /** @type {Element} */
      /* @__PURE__ */ qt(l);
    }
    var a = (
      /** @type {TemplateNode} */
      i.cloneNode(!0)
    );
    return nr(a, a), a;
  };
}
// @__NO_SIDE_EFFECTS__
function ks(e, t) {
  return /* @__PURE__ */ Zi(e, t, "svg");
}
function V(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
const Qi = ["touchstart", "touchmove"];
function el(e) {
  return Qi.includes(e);
}
function ae(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== /** @type {any} */
  (e[zt] ?? (e[zt] = e.nodeValue)) && (e[zt] = n, e.nodeValue = `${n}`);
}
function tl(e, t) {
  return nl(e, t);
}
const cn = /* @__PURE__ */ new Map();
function nl(e, { target: t, anchor: n, props: r = {}, events: s, context: i, intro: o = !0, transformError: l }) {
  $i();
  var a = void 0, u = Li(() => {
    var h = n ?? t.appendChild(Ct());
    mi(
      /** @type {TemplateNode} */
      h,
      {
        pending: () => {
        }
      },
      (_) => {
        ht({});
        var d = (
          /** @type {ComponentContext} */
          C
        );
        i && (d.c = i), s && (r.$$events = s), a = e(_, r) || {}, pt();
      },
      l
    );
    var v = /* @__PURE__ */ new Set(), c = (_) => {
      for (var d = 0; d < _.length; d++) {
        var E = _[d];
        if (!v.has(E)) {
          v.add(E);
          var m = el(E);
          for (const p of [t, document]) {
            var b = cn.get(p);
            b === void 0 && (b = /* @__PURE__ */ new Map(), cn.set(p, b));
            var g = b.get(E);
            g === void 0 ? (p.addEventListener(E, tr, { passive: m }), b.set(E, 1)) : b.set(E, g + 1);
          }
        }
      }
    };
    return c(An(Wi)), Nr.add(c), () => {
      var m;
      for (var _ of v)
        for (const b of [t, document]) {
          var d = (
            /** @type {Map<string, number>} */
            cn.get(b)
          ), E = (
            /** @type {number} */
            d.get(_)
          );
          --E == 0 ? (b.removeEventListener(_, tr), d.delete(_), d.size === 0 && cn.delete(b)) : d.set(_, E);
        }
      Nr.delete(c), h !== n && ((m = h.parentNode) == null || m.removeChild(h));
    };
  });
  return rl.set(a, u), a;
}
let rl = /* @__PURE__ */ new WeakMap();
var ye, Ae, le, et, en, tn, Nn;
class sl {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, n = !0) {
    /** @type {TemplateNode} */
    X(this, "anchor");
    /** @type {Map<Batch, Key>} */
    k(this, ye, /* @__PURE__ */ new Map());
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
    k(this, Ae, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    k(this, le, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    k(this, et, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    k(this, en, !0);
    /**
     * @param {Batch} batch
     */
    k(this, tn, (t) => {
      if (f(this, ye).has(t)) {
        var n = (
          /** @type {Key} */
          f(this, ye).get(t)
        ), r = f(this, Ae).get(n);
        if (r)
          gr(r), f(this, et).delete(n);
        else {
          var s = f(this, le).get(n);
          s && (f(this, Ae).set(n, s.effect), f(this, le).delete(n), s.fragment.lastChild.remove(), this.anchor.before(s.fragment), r = s.effect);
        }
        for (const [i, o] of f(this, ye)) {
          if (f(this, ye).delete(i), i === t)
            break;
          const l = f(this, le).get(o);
          l && (ne(l.effect), f(this, le).delete(o));
        }
        for (const [i, o] of f(this, Ae)) {
          if (i === n || f(this, et).has(i)) continue;
          const l = () => {
            if (Array.from(f(this, ye).values()).includes(i)) {
              var u = document.createDocumentFragment();
              br(o, u), u.append(Ct()), f(this, le).set(i, { effect: o, fragment: u });
            } else
              ne(o);
            f(this, et).delete(i), f(this, Ae).delete(i);
          };
          f(this, en) || !r ? (f(this, et).add(i), lt(o, l, !1)) : l();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    k(this, Nn, (t) => {
      f(this, ye).delete(t);
      const n = Array.from(f(this, ye).values());
      for (const [r, s] of f(this, le))
        n.includes(r) || (ne(s.effect), f(this, le).delete(r));
    });
    this.anchor = t, x(this, en, n);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, n) {
    var r = (
      /** @type {Batch} */
      w
    ), s = cs();
    if (n && !f(this, Ae).has(t) && !f(this, le).has(t))
      if (s) {
        var i = document.createDocumentFragment(), o = Ct();
        i.append(o), f(this, le).set(t, {
          effect: de(() => n(o)),
          fragment: i
        });
      } else
        f(this, Ae).set(
          t,
          de(() => n(this.anchor))
        );
    if (f(this, ye).set(r, t), s) {
      for (const [l, a] of f(this, Ae))
        l === t ? r.unskip_effect(a) : r.skip_effect(a);
      for (const [l, a] of f(this, le))
        l === t ? r.unskip_effect(a.effect) : r.skip_effect(a.effect);
      r.oncommit(f(this, tn)), r.ondiscard(f(this, Nn));
    } else
      f(this, tn).call(this, r);
  }
}
ye = new WeakMap(), Ae = new WeakMap(), le = new WeakMap(), et = new WeakMap(), en = new WeakMap(), tn = new WeakMap(), Nn = new WeakMap();
function Ts(e) {
  C === null && Xs(), Dt && C.l !== null ? il(C).m.push(e) : Qn(() => {
    const t = S(e);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
function il(e) {
  var t = (
    /** @type {ComponentContextLegacy} */
    e.l
  );
  return t.u ?? (t.u = { a: [], b: [], m: [] });
}
function qe(e, t, n = !1) {
  var r = new sl(e), s = n ? $t : 0;
  function i(o, l) {
    r.ensure(o, l);
  }
  pr(() => {
    var o = !1;
    t((l, a = 0) => {
      o = !0, i(a, l);
    }), o || i(-1, null);
  }, s);
}
function rr(e, t) {
  return t;
}
function ll(e, t, n) {
  for (var r = [], s = t.length, i, o = t.length, l = 0; l < s; l++) {
    let v = t[l];
    lt(
      v,
      () => {
        if (i) {
          if (i.pending.delete(v), i.done.add(v), i.pending.size === 0) {
            var c = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            sr(e, An(i.done)), c.delete(i), c.size === 0 && (e.outrogroups = null);
          }
        } else
          o -= 1;
      },
      !1
    );
  }
  if (o === 0) {
    var a = r.length === 0 && n !== null;
    if (a) {
      var u = (
        /** @type {Element} */
        n
      ), h = (
        /** @type {Element} */
        u.parentNode
      );
      Pi(h), h.append(u), e.items.clear();
    }
    sr(e, t, !a);
  } else
    i = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ?? (e.outrogroups = /* @__PURE__ */ new Set())).add(i);
}
function sr(e, t, n = !0) {
  var r;
  if (e.pending.size > 0) {
    r = /* @__PURE__ */ new Set();
    for (const o of e.pending.values())
      for (const l of o)
        r.add(
          /** @type {EachItem} */
          e.items.get(l).e
        );
  }
  for (var s = 0; s < t.length; s++) {
    var i = t[s];
    if (r != null && r.has(i)) {
      i.f |= Ce;
      const o = document.createDocumentFragment();
      br(i, o);
    } else
      ne(t[s], n);
  }
}
var Or;
function ir(e, t, n, r, s, i = null) {
  var o = e, l = /* @__PURE__ */ new Map(), a = null, u = /* @__PURE__ */ St(() => {
    var b = n();
    return Dr(b) ? b : b == null ? [] : An(b);
  }), h, v = /* @__PURE__ */ new Map(), c = !0;
  function _(b) {
    (m.effect.f & he) === 0 && (m.pending.delete(b), m.fallback = a, al(m, h, o, t, r), a !== null && (h.length === 0 ? (a.f & Ce) === 0 ? gr(a) : (a.f ^= Ce, Ht(a, null, o)) : lt(a, () => {
      a = null;
    })));
  }
  function d(b) {
    m.pending.delete(b);
  }
  var E = pr(() => {
    h = /** @type {V[]} */
    y(u);
    for (var b = h.length, g = /* @__PURE__ */ new Set(), p = (
      /** @type {Batch} */
      w
    ), T = cs(), A = 0; A < b; A += 1) {
      var q = h[A], K = r(q, A), M = c ? null : l.get(K);
      M ? (M.v && It(M.v, q), M.i && It(M.i, A), T && p.unskip_effect(M.e)) : (M = ol(
        l,
        c ? o : Or ?? (Or = Ct()),
        q,
        K,
        A,
        s,
        t,
        n
      ), c || (M.e.f |= Ce), l.set(K, M)), g.add(K);
    }
    if (b === 0 && i && !a && (c ? a = de(() => i(o)) : (a = de(() => i(Or ?? (Or = Ct()))), a.f |= Ce)), b > g.size && Qs(), !c)
      if (v.set(p, g), T) {
        for (const [z, Je] of l)
          g.has(z) || p.skip_effect(Je.e);
        p.oncommit(_), p.ondiscard(d);
      } else
        _(p);
    y(u);
  }), m = { effect: E, items: l, pending: v, outrogroups: null, fallback: a };
  c = !1;
}
function Bt(e) {
  for (; e !== null && (e.f & Se) === 0; )
    e = e.next;
  return e;
}
function al(e, t, n, r, s) {
  var M;
  var i = t.length, o = e.items, l = Bt(e.effect.first), a, u = null, h = [], v = [], c, _, d, E;
  for (E = 0; E < i; E += 1) {
    if (c = t[E], _ = s(c, E), d = /** @type {EachItem} */
    o.get(_).e, e.outrogroups !== null)
      for (const z of e.outrogroups)
        z.pending.delete(d), z.done.delete(d);
    if ((d.f & G) !== 0 && gr(d), (d.f & Ce) !== 0)
      if (d.f ^= Ce, d === l)
        Ht(d, null, n);
      else {
        var m = u ? u.next : l;
        d === e.effect.last && (e.effect.last = d.prev), d.prev && (d.prev.next = d.next), d.next && (d.next.prev = d.prev), Fe(e, u, d), Fe(e, d, m), Ht(d, m, n), u = d, h = [], v = [], l = Bt(u.next);
        continue;
      }
    if (d !== l) {
      if (a !== void 0 && a.has(d)) {
        if (h.length < v.length) {
          var b = v[0], g;
          u = b.prev;
          var p = h[0], T = h[h.length - 1];
          for (g = 0; g < h.length; g += 1)
            Ht(h[g], b, n);
          for (g = 0; g < v.length; g += 1)
            a.delete(v[g]);
          Fe(e, p.prev, T.next), Fe(e, u, p), Fe(e, T, b), l = b, u = T, E -= 1, h = [], v = [];
        } else
          a.delete(d), Ht(d, l, n), Fe(e, d.prev, d.next), Fe(e, d, u === null ? e.effect.first : u.next), Fe(e, u, d), u = d;
        continue;
      }
      for (h = [], v = []; l !== null && l !== d; )
        (a ?? (a = /* @__PURE__ */ new Set())).add(l), v.push(l), l = Bt(l.next);
      if (l === null)
        continue;
    }
    (d.f & Ce) === 0 && h.push(d), u = d, l = Bt(d.next);
  }
  if (e.outrogroups !== null) {
    for (const z of e.outrogroups)
      z.pending.size === 0 && (sr(e, An(z.done)), (M = e.outrogroups) == null || M.delete(z));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (l !== null || a !== void 0) {
    var A = [];
    if (a !== void 0)
      for (d of a)
        (d.f & G) === 0 && A.push(d);
    for (; l !== null; )
      (l.f & G) === 0 && l !== e.fallback && A.push(l), l = Bt(l.next);
    var q = A.length;
    if (q > 0) {
      var K = null;
      ll(e, A, K);
    }
  }
}
function ol(e, t, n, r, s, i, o, l) {
  var a = (o & Is) !== 0 ? (o & qs) === 0 ? /* @__PURE__ */ Oe(n, !1, !1) : ct(n) : null, u = (o & Cs) !== 0 ? ct(s) : null;
  return {
    v: a,
    i: u,
    e: de(() => (i(t, a ?? n, u ?? s, l), () => {
      e.delete(r);
    }))
  };
}
function Ht(e, t, n) {
  if (e.nodes)
    for (var r = e.nodes.start, s = e.nodes.end, i = t && (t.f & Ce) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : n; r !== null; ) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ sn(r)
      );
      if (i.before(r), r === s)
        return;
      r = o;
    }
}
function Fe(e, t, n) {
  t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function fl(e, t, n) {
  var r = e == null ? "" : "" + e;
  return t && (r = r ? r + " " + t : t), r === "" ? null : r;
}
function Ns(e, t, n, r, s, i) {
  var o = (
    /** @type {any} */
    e[Hn]
  );
  if (o !== n || o === void 0) {
    var l = fl(n, r);
    l == null ? e.removeAttribute("class") : e.className = l, e[Hn] = n;
  }
  return i;
}
const ul = Symbol("is custom element"), cl = Symbol("is html"), dl = Ks ? "progress" : "PROGRESS";
function dn(e, t) {
  var n = As(e);
  n.value === (n.value = // treat null and undefined the same for the initial value
  t ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  e.value === t && (t !== 0 || e.nodeName !== dl) || (e.value = t ?? "");
}
function ke(e, t, n, r) {
  var s = As(e);
  s[t] !== (s[t] = n) && (t === "loading" && (e[Gs] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && vl(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function As(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    e[hn] ?? (e[hn] = {
      [ul]: e.nodeName.includes("-"),
      [cl]: e.namespaceURI === Cr
    })
  );
}
var Rr = /* @__PURE__ */ new Map();
function vl(e) {
  var t = e.getAttribute("is") || e.nodeName, n = Rr.get(t);
  if (n) return n;
  Rr.set(t, n = []);
  for (var r, s = e, i = Element.prototype; i !== s; ) {
    r = Fr(s);
    for (var o in r)
      r[o].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.push(o);
    s = ar(s);
  }
  return n;
}
function hl(e, t, n = t) {
  var r = /* @__PURE__ */ new WeakSet();
  Ci(e, "input", async (s) => {
    var i = s ? e.defaultValue : e.value;
    if (i = Dn(e) ? Ln(i) : i, n(i), w !== null && r.add(w), await Gi(), i !== (i = t())) {
      var o = e.selectionStart, l = e.selectionEnd, a = e.value.length;
      if (e.value = i ?? "", l !== null) {
        var u = e.value.length;
        o === l && l === a && u > a ? (e.selectionStart = u, e.selectionEnd = u) : (e.selectionStart = o, e.selectionEnd = Math.min(l, u));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  S(t) == null && e.value && (n(Dn(e) ? Ln(e.value) : e.value), w !== null && r.add(w)), ln(() => {
    var s = t();
    if (e === document.activeElement) {
      var i = (
        /** @type {Batch} */
        w
      );
      if (r.has(i))
        return;
    }
    Dn(e) && s === Ln(e.value) || e.type === "date" && !s && !e.value || s !== e.value && (e.value = s ?? "");
  });
}
function Dn(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function Ln(e) {
  return e === "" ? null : +e;
}
function Fn(e, t) {
  return e === t || (e == null ? void 0 : e[rt]) === t;
}
function pl(e = {}, t, n, r) {
  var s = (
    /** @type {ComponentContext} */
    C.r
  ), i = (
    /** @type {Effect} */
    N
  );
  return Fi(() => {
    var o, l;
    return ln(() => {
      o = l, l = [], S(() => {
        Fn(n(...l), e) || (t(e, ...l), o && Fn(n(...o), e) && t(null, ...o));
      });
    }), () => {
      let a = i;
      for (; a !== s && a.parent !== null && a.parent.f & Un; )
        a = a.parent;
      const u = () => {
        l && Fn(n(...l), e) && t(null, ...l);
      }, h = a.teardown;
      a.teardown = () => {
        u(), h == null || h();
      };
    };
  }), e;
}
function jt(e = !1) {
  const t = (
    /** @type {ComponentContextLegacy} */
    C
  ), n = t.l.u;
  if (!n) return;
  let r = () => ee(t.s);
  if (e) {
    let s = 0, i = (
      /** @type {Record<string, any>} */
      {}
    );
    const o = /* @__PURE__ */ cr(() => {
      let l = !1;
      const a = t.s;
      for (const u in a)
        a[u] !== i[u] && (i[u] = a[u], l = !0);
      return l && s++, s;
    });
    r = () => y(o);
  }
  n.b.length && Di(() => {
    $r(t, r), Bn(n.b);
  }), Qn(() => {
    const s = S(() => n.m.map(Vs));
    return () => {
      for (const i of s)
        typeof i == "function" && i();
    };
  }), n.a.length && Qn(() => {
    $r(t, r), Bn(n.a);
  });
}
function $r(e, t) {
  if (e.l.s)
    for (const n of e.l.s) y(n);
  t();
}
function an(e, t, n, r) {
  var g;
  var s = !Dt || (n & Ds) !== 0, i = (n & Fs) !== 0, o = (
    /** @type {V} */
    r
  ), l = !0, a = () => (l && (l = !1, o = /** @type {V} */
  r), o);
  let u;
  {
    var h = rt in e || Ys in e;
    u = ((g = wt(e, t)) == null ? void 0 : g.set) ?? (h && t in e ? (p) => e[t] = p : void 0);
  }
  var v, c = !1;
  [v, c] = vi(() => (
    /** @type {V} */
    e[t]
  ));
  var _;
  if (s ? _ = () => {
    var p = (
      /** @type {V} */
      e[t]
    );
    return p === void 0 ? a() : (l = !0, p);
  } : _ = () => {
    var p = (
      /** @type {V} */
      e[t]
    );
    return p !== void 0 && (o = /** @type {V} */
    void 0), p === void 0 ? o : p;
  }, s && (n & Ls) === 0)
    return _;
  if (u) {
    var d = e.$$legacy;
    return (
      /** @type {() => V} */
      (function(p, T) {
        return arguments.length > 0 ? ((!s || !T || d || c) && u(T ? _() : p), p) : _();
      })
    );
  }
  var E = !1, m = /* @__PURE__ */ St(() => (E = !1, _()));
  y(m);
  var b = (
    /** @type {Effect} */
    N
  );
  return (
    /** @type {() => V} */
    (function(p, T) {
      if (arguments.length > 0) {
        const A = T ? y(m) : s && i ? mt(p) : p;
        return L(m, A), E = !0, o !== void 0 && (o = A), p;
      }
      return De && E || (b.f & he) !== 0 ? m.v : y(m);
    })
  );
}
const ot = Rn({ nodes: {}, edges: [] }), Wt = Rn(null), Os = Rn(null);
var _l = /* @__PURE__ */ ks('<line stroke-width="2" marker-end="url(#arrow)"></line>'), gl = /* @__PURE__ */ ks('<g style="cursor:pointer" role="button" tabindex="0"><rect width="160" height="40" rx="6" stroke-width="1.5"></rect><text x="12" y="14" fill="#94a3b8" font-size="9" font-family="monospace"> </text><text x="12" y="29" fill="#e2e8f0" font-size="12" font-family="system-ui"> </text></g>'), bl = /* @__PURE__ */ W('<div class="empty-hint svelte-1lehbkp">Drag nodes from the palette to build your agent graph</div>'), yl = /* @__PURE__ */ W('<div class="canvas-wrap svelte-1lehbkp"><svg style="width:100%;height:100%"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#7c6af7"></path></marker></defs><!><!></svg> <!></div>');
function ml(e, t) {
  ht(t, !1);
  const n = () => Mt(ot, "$graph", s), r = () => Mt(Wt, "$selectedNode", s), [s, i] = $n();
  an(t, "agentId", 8);
  let o = /* @__PURE__ */ Oe([]), l = /* @__PURE__ */ Oe([]), a = /* @__PURE__ */ Oe(), u = { x: 0, y: 0, w: 1e3, h: 600 };
  function h(g) {
    Wt.set(g);
  }
  function v(g) {
    const p = n().nodes[g];
    return (p == null ? void 0 : p.position) ?? { x: 100, y: 100 };
  }
  ji(() => n(), () => {
    L(o, Object.values(n().nodes)), L(l, n().edges);
  }), Bi(), jt();
  var c = yl(), _ = $(c), d = I($(_));
  ir(d, 1, () => y(l), rr, (g, p) => {
    const T = /* @__PURE__ */ St(() => (y(p), S(() => v(y(p).from)))), A = /* @__PURE__ */ St(() => (y(p), S(() => v(y(p).to))));
    var q = _l();
    te(() => {
      ke(q, "x1", (ee(y(T)), S(() => y(T).x + 80))), ke(q, "y1", (ee(y(T)), S(() => y(T).y + 20))), ke(q, "x2", (ee(y(A)), S(() => y(A).x))), ke(q, "y2", (ee(y(A)), S(() => y(A).y + 20))), ke(q, "stroke", (y(p), S(() => y(p).type === "fallback" ? "#94a3b8" : "#7c6af7"))), ke(q, "stroke-dasharray", (y(p), S(() => y(p).type === "fallback" ? "4" : "0")));
    }), V(g, q);
  });
  var E = I(d);
  ir(E, 1, () => y(o), rr, (g, p) => {
    const T = /* @__PURE__ */ St(() => (y(p), S(() => y(p).position ?? { x: 100, y: 100 })));
    var A = gl(), q = $(A), K = I(q), M = $(K), z = I(K), Je = $(z);
    te(() => {
      ke(A, "transform", `translate(${ee(y(T)), S(() => y(T).x) ?? ""},${ee(y(T)), S(() => y(T).y) ?? ""})`), ke(q, "fill", (r(), y(p), S(() => {
        var $e;
        return (($e = r()) == null ? void 0 : $e.id) === y(p).id ? "#312e7a" : "#1e2035";
      }))), ke(q, "stroke", (r(), y(p), S(() => {
        var $e;
        return (($e = r()) == null ? void 0 : $e.id) === y(p).id ? "#7c6af7" : "#2d3148";
      }))), ae(M, (y(p), S(() => y(p).type))), ae(Je, (y(p), S(() => y(p).label ?? y(p).id)));
    }), me("click", A, () => h(y(p))), me("keydown", A, ($e) => $e.key === "Enter" && h(y(p))), V(g, A);
  }), pl(_, (g) => L(a, g), () => y(a));
  var m = I(_, 2);
  {
    var b = (g) => {
      var p = bl();
      V(g, p);
    };
    qe(m, (g) => {
      y(o), S(() => y(o).length === 0) && g(b);
    });
  }
  te(() => ke(_, "viewBox", `${S(() => u.x) ?? ""} ${S(() => u.y) ?? ""} ${S(() => u.w) ?? ""} ${S(() => u.h) ?? ""}`)), V(e, c), pt(), i();
}
var wl = /* @__PURE__ */ W('<button class="palette-item svelte-142uvrg"><span class="node-name svelte-142uvrg"> </span> <span class="node-type svelte-142uvrg"> </span></button>'), El = /* @__PURE__ */ W('<div class="palette svelte-142uvrg"><div class="palette-header svelte-142uvrg">Nodes</div> <!></div>');
function Sl(e, t) {
  ht(t, !1);
  let n = /* @__PURE__ */ Oe([]);
  Ts(async () => {
    try {
      const o = await fetch("/api/nodes");
      o.ok && L(n, await o.json());
    } catch {
      L(n, [
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
  function r(o, l) {
    const a = `${o.replace(":", "_")}_${Date.now()}`;
    ot.update((u) => ({
      ...u,
      nodes: {
        ...u.nodes,
        [a]: {
          id: a,
          type: o,
          label: l,
          config: {},
          position: { x: 200, y: 200 }
        }
      }
    }));
  }
  jt();
  var s = El(), i = I($(s), 2);
  ir(i, 1, () => y(n), rr, (o, l) => {
    var a = wl(), u = $(a), h = $(u), v = I(u, 2), c = $(v);
    te(() => {
      ae(h, y(l).meta.name), ae(c, y(l).type);
    }), me("click", a, () => r(y(l).type, y(l).meta.name)), V(o, a);
  }), V(e, s), pt();
}
var xl = /* @__PURE__ */ W('<div class="form-group svelte-b5q3h1"><label class="svelte-b5q3h1">Expression (JSONata → boolean)</label> <input type="text" placeholder="e.g. score > 0.5" class="svelte-b5q3h1"/></div>'), kl = /* @__PURE__ */ W('<div class="form-group svelte-b5q3h1"><label class="svelte-b5q3h1">Expression (JSONata → string)</label> <input type="text" placeholder="e.g. $category" class="svelte-b5q3h1"/></div> <div class="form-group svelte-b5q3h1"><label class="svelte-b5q3h1">Cases (comma-separated)</label> <input type="text" placeholder="e.g. low, medium, high" class="svelte-b5q3h1"/></div>', 1), Tl = /* @__PURE__ */ W('<div class="panel-section svelte-b5q3h1"><div class="panel-header svelte-b5q3h1"><span> </span> <button class="close-btn svelte-b5q3h1">✕</button></div> <div class="form-group svelte-b5q3h1"><label class="svelte-b5q3h1">Label</label> <input type="text" class="svelte-b5q3h1"/></div> <!> <!> <button class="btn-danger svelte-b5q3h1">Remove node</button></div>');
function Nl(e, t) {
  ht(t, !1);
  let n = an(t, "node", 8);
  function r(g, p) {
    ot.update((T) => ({
      ...T,
      nodes: {
        ...T.nodes,
        [n().id]: { ...n(), config: { ...n().config, [g]: p } }
      }
    }));
  }
  function s(g) {
    ot.update((p) => ({
      ...p,
      nodes: { ...p.nodes, [n().id]: { ...n(), label: g } }
    }));
  }
  function i() {
    ot.update((g) => {
      const p = { ...g.nodes };
      return delete p[n().id], {
        ...g,
        nodes: p,
        edges: g.edges.filter((T) => T.from !== n().id && T.to !== n().id)
      };
    }), Wt.set(null);
  }
  jt();
  var o = Tl(), l = $(o), a = $(l), u = $(a), h = I(a, 2), v = I(l, 2), c = I($(v), 2), _ = I(v, 2);
  {
    var d = (g) => {
      var p = xl(), T = I($(p), 2);
      te((A) => dn(T, A), [
        () => (ee(n()), S(() => String(n().config.expression ?? "")))
      ]), me("input", T, (A) => r("expression", A.target.value)), V(g, p);
    };
    qe(_, (g) => {
      ee(n()), S(() => n().type === "core:condition") && g(d);
    });
  }
  var E = I(_, 2);
  {
    var m = (g) => {
      var p = kl(), T = us(p), A = I($(T), 2), q = I(T, 2), K = I($(q), 2);
      te(
        (M, z) => {
          dn(A, M), dn(K, z);
        },
        [
          () => (ee(n()), S(() => String(n().config.expression ?? ""))),
          () => (ee(n()), S(() => String(n().config.cases ?? "")))
        ]
      ), me("input", A, (M) => r("expression", M.target.value)), me("input", K, (M) => r("cases", M.target.value)), V(g, p);
    };
    qe(E, (g) => {
      ee(n()), S(() => n().type === "core:router") && g(m);
    });
  }
  var b = I(E, 2);
  te(() => {
    ae(u, `Node: ${ee(n()), S(() => n().type) ?? ""}`), dn(c, (ee(n()), S(() => n().label ?? "")));
  }), me("click", h, () => Wt.set(null)), me("input", c, (g) => s(g.target.value)), me("click", b, i), V(e, o), pt();
}
var Al = /* @__PURE__ */ W('<div class="agent-name svelte-5tjmbm"> </div> <div> </div>', 1), Ol = /* @__PURE__ */ W('<div class="publish-msg svelte-5tjmbm"> </div>'), Rl = /* @__PURE__ */ W('<div class="panel-section svelte-5tjmbm"><div class="panel-header svelte-5tjmbm">Agent</div> <!> <button class="btn-publish svelte-5tjmbm"> </button> <!></div>');
function $l(e, t) {
  ht(t, !1);
  const n = () => Mt(ot, "$graph", s), r = () => Mt(Os, "$agent", s), [s, i] = $n();
  let o = an(t, "agentId", 8), l = /* @__PURE__ */ Oe(!1), a = /* @__PURE__ */ Oe("");
  async function u() {
    L(l, !0), L(a, "");
    try {
      const b = JSON.stringify(n());
      if (!(await fetch(`/api/agents/${o()}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ graphJson: b })
      })).ok) throw new Error("Publish failed");
      L(a, "✓ Published");
    } catch (b) {
      L(a, "✗ " + (b instanceof Error ? b.message : "Error"));
    } finally {
      L(l, !1);
    }
  }
  jt();
  var h = Rl(), v = I($(h), 2);
  {
    var c = (b) => {
      var g = Al(), p = us(g), T = $(p), A = I(p, 2), q = $(A);
      te(() => {
        ae(T, (r(), S(() => r().name))), Ns(A, 1, `agent-status status-${r(), S(() => r().status) ?? ""}`, "svelte-5tjmbm"), ae(q, (r(), S(() => r().status)));
      }), V(b, g);
    };
    qe(v, (b) => {
      r() && b(c);
    });
  }
  var _ = I(v, 2), d = $(_), E = I(_, 2);
  {
    var m = (b) => {
      var g = Ol(), p = $(g);
      te(() => ae(p, y(a))), V(b, g);
    };
    qe(E, (b) => {
      y(a) && b(m);
    });
  }
  te(() => {
    _.disabled = y(l), ae(d, y(l) ? "Publishing…" : "Publish");
  }), me("click", _, u), V(e, h), pt(), i();
}
const vn = Rn({
  runId: null,
  status: "idle",
  output: null,
  error: null,
  steps: []
});
var Pl = /* @__PURE__ */ W('<pre class="result-json svelte-gqobos"> </pre>'), Ml = /* @__PURE__ */ W('<div class="result-error svelte-gqobos"> </div>'), Il = /* @__PURE__ */ W('<div><div class="result-status svelte-gqobos"> </div> <!> <!></div>'), Cl = /* @__PURE__ */ W('<div class="panel-section svelte-gqobos"><div class="panel-header svelte-gqobos">Test Run</div> <div class="form-group svelte-gqobos"><label class="svelte-gqobos">Input (JSON)</label> <textarea rows="4" class="svelte-gqobos"></textarea></div> <button class="btn-run svelte-gqobos"> </button> <!></div>');
function ql(e, t) {
  ht(t, !1);
  const n = () => Mt(vn, "$runState", r), [r, s] = $n();
  let i = an(t, "agentId", 8), o = /* @__PURE__ */ Oe("{}"), l = /* @__PURE__ */ Oe(!1);
  async function a() {
    L(l, !0), vn.set({
      runId: null,
      status: "running",
      output: null,
      error: null,
      steps: []
    });
    try {
      const b = await (await fetch(`/api/agents/${i()}/runs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: JSON.parse(y(o)), mode: "sync" })
      })).json();
      vn.set({
        runId: null,
        status: b.status,
        output: b.output,
        error: b.error ? JSON.stringify(b.error) : null,
        steps: b.steps ?? []
      });
    } catch (m) {
      vn.set({
        runId: null,
        status: "failed",
        output: null,
        error: String(m),
        steps: []
      });
    } finally {
      L(l, !1);
    }
  }
  jt();
  var u = Cl(), h = I($(u), 2), v = I($(h), 2), c = I(h, 2), _ = $(c), d = I(c, 2);
  {
    var E = (m) => {
      var b = Il(), g = $(b), p = $(g), T = I(g, 2);
      {
        var A = (M) => {
          var z = Pl(), Je = $(z);
          te(($e) => ae(Je, $e), [
            () => (n(), S(() => JSON.stringify(n().output, null, 2)))
          ]), V(M, z);
        };
        qe(T, (M) => {
          n(), S(() => n().output) && M(A);
        });
      }
      var q = I(T, 2);
      {
        var K = (M) => {
          var z = Ml(), Je = $(z);
          te(() => ae(Je, (n(), S(() => n().error)))), V(M, z);
        };
        qe(q, (M) => {
          n(), S(() => n().error) && M(K);
        });
      }
      te(
        (M) => {
          Ns(b, 1, `run-result status-${n(), S(() => n().status) ?? ""}`, "svelte-gqobos"), ae(p, M);
        },
        [
          () => (n(), S(() => n().status.toUpperCase()))
        ]
      ), V(m, b);
    };
    qe(d, (m) => {
      n(), S(() => n().status !== "idle") && m(E);
    });
  }
  te(() => {
    c.disabled = y(l), ae(_, y(l) ? "Running…" : "▶ Run");
  }), hl(v, () => y(o), (m) => L(o, m)), me("click", c, a), V(e, u), pt(), s();
}
var Dl = /* @__PURE__ */ W('<div class="studio svelte-13r820j"><aside class="palette svelte-13r820j"><!></aside> <main class="canvas-area svelte-13r820j"><!></main> <aside class="panel svelte-13r820j"><!> <!></aside></div>');
function Ll(e, t) {
  ht(t, !1);
  const n = () => Mt(Wt, "$selectedNode", r), [r, s] = $n();
  let i = an(t, "agentId", 8);
  Ts(async () => {
    if (i())
      try {
        const [m, b] = await Promise.all([
          fetch(`/api/agents/${i()}`),
          fetch(`/api/agents/${i()}/versions`)
        ]);
        if (m.ok) {
          const g = await m.json();
          Os.set(g);
        }
        if (b.ok) {
          const g = await b.json();
          if (g.length > 0) {
            const p = g[g.length - 1];
            ot.set(JSON.parse(p.graphJson ?? "{}"));
          }
        }
      } catch {
      }
  }), jt();
  var o = Dl(), l = $(o), a = $(l);
  Sl(a, {});
  var u = I(l, 2), h = $(u);
  ml(h, {
    get agentId() {
      return i();
    }
  });
  var v = I(u, 2), c = $(v);
  {
    var _ = (m) => {
      Nl(m, {
        get node() {
          return n();
        }
      });
    }, d = (m) => {
      $l(m, {
        get agentId() {
          return i();
        }
      });
    };
    qe(c, (m) => {
      n() ? m(_) : m(d, -1);
    });
  }
  var E = I(c, 2);
  ql(E, {
    get agentId() {
      return i();
    }
  }), V(e, o), pt(), s();
}
const jn = document.getElementById("canvas-mount");
if (jn) {
  const e = jn.getAttribute("data-agent-id") ?? "";
  tl(Ll, { target: jn, props: { agentId: e } });
}
