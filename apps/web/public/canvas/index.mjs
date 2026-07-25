var KO = Object.defineProperty;
var Ec = (n) => {
  throw TypeError(n);
};
var JO = (n, e, t) => e in n ? KO(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var Dt = (n, e, t) => JO(n, typeof e != "symbol" ? e + "" : e, t), Bl = (n, e, t) => e.has(n) || Ec("Cannot " + t);
var $ = (n, e, t) => (Bl(n, e, "read from private field"), t ? t.call(n) : e.get(n)), Se = (n, e, t) => e.has(n) ? Ec("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), xe = (n, e, t, i) => (Bl(n, e, "write to private field"), i ? i.call(n, t) : e.set(n, t), t), Ae = (n, e, t) => (Bl(n, e, "access private method"), t);
var Su;
typeof window < "u" && ((Su = window.__svelte ?? (window.__svelte = {})).v ?? (Su.v = /* @__PURE__ */ new Set())).add("5");
let nr = !1, eg = !1;
function tg() {
  nr = !0;
}
tg();
const ig = 1, ng = 2, $u = 4, sg = 8, rg = 16, og = 1, lg = 2, ag = 4, hg = 8, cg = 16, Pu = 1, fg = 2, dt = Symbol("uninitialized"), _u = "http://www.w3.org/1999/xhtml", Tu = !1;
var Sl = Array.isArray, ug = Array.prototype.indexOf, Jn = Array.prototype.includes, Ql = Array.from, Zu = Object.defineProperty, _s = Object.getOwnPropertyDescriptor, Cu = Object.getOwnPropertyDescriptors, dg = Object.prototype, pg = Array.prototype, Xh = Object.getPrototypeOf, Lc = Object.isExtensible;
const es = () => {
};
function Og(n) {
  return n();
}
function $a(n) {
  for (var e = 0; e < n.length; e++)
    n[e]();
}
function Au() {
  var n, e, t = new Promise((i, s) => {
    n = i, e = s;
  });
  return { promise: t, resolve: n, reject: e };
}
function gg(n, e) {
  if (Array.isArray(n))
    return n;
  if (!(Symbol.iterator in n))
    return Array.from(n);
  const t = [];
  for (const i of n)
    if (t.push(i), t.length === e) break;
  return t;
}
const Qt = 2, Ws = 4, Jr = 8, Ru = 1 << 24, _i = 16, Ci = 32, Rn = 64, Pa = 128, gi = 512, ct = 1024, bt = 2048, Ai = 4096, Lt = 8192, mi = 16384, ps = 32768, _a = 1 << 25, Ys = 65536, No = 1 << 17, mg = 1 << 18, sr = 1 << 19, Mu = 1 << 20, Bi = 1 << 25, ls = 65536, Go = 1 << 21, Ts = 1 << 22, Cn = 1 << 23, cn = Symbol("$state"), vg = Symbol("legacy props"), bg = Symbol(""), Mo = Symbol("attributes"), Ta = Symbol("class"), Za = Symbol("style"), gr = Symbol("text"), Xo = Symbol("form reset"), kl = new class extends Error {
  constructor() {
    super(...arguments);
    Dt(this, "name", "StaleReactionError");
    Dt(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var Qu;
const yg = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((Qu = globalThis.document) != null && Qu.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function Eh(n) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function wg() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function xg(n, e, t) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function Sg(n) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Qg() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function kg(n) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function $g() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Pg(n) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function _g() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Tg() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Zg() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Cg() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function Ag() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function Rg() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Mg() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Xu(n) {
  return n === this.v;
}
function Lh(n, e) {
  return n != n ? e == e : n !== e || n !== null && typeof n == "object" || typeof n == "function";
}
function Eu(n) {
  return !Lh(n, this.v);
}
let Ne = null;
function qs(n) {
  Ne = n;
}
function kt(n, e = !1, t) {
  Ne = {
    p: Ne,
    i: !1,
    c: null,
    e: null,
    s: n,
    x: null,
    r: (
      /** @type {Effect} */
      Pe
    ),
    l: nr && !e ? { s: null, u: null, $: [] } : null
  };
}
function $t(n) {
  var e = (
    /** @type {ComponentContext} */
    Ne
  ), t = e.e;
  if (t !== null) {
    e.e = null;
    for (var i of t)
      nd(i);
  }
  return e.i = !0, Ne = e.p, /** @type {T} */
  {};
}
function eo() {
  return !nr || Ne !== null && Ne.l === null;
}
let qn = [];
function Lu() {
  var n = qn;
  qn = [], $a(n);
}
function An(n) {
  if (qn.length === 0 && !kr) {
    var e = qn;
    queueMicrotask(() => {
      e === qn && Lu();
    });
  }
  qn.push(n);
}
function Xg() {
  for (; qn.length > 0; )
    Lu();
}
function ju(n) {
  var e = Pe;
  if (e === null)
    return _e.f |= Cn, n;
  if ((e.f & ps) === 0 && (e.f & Ws) === 0)
    throw n;
  Tn(n, e);
}
function Tn(n, e) {
  for (; e !== null; ) {
    if ((e.f & Pa) !== 0) {
      if ((e.f & ps) === 0)
        throw n;
      try {
        e.b.error(n);
        return;
      } catch (t) {
        n = t;
      }
    }
    e = e.parent;
  }
  throw n;
}
const Eg = -7169;
function et(n, e) {
  n.f = n.f & Eg | e;
}
function jh(n) {
  (n.f & gi) !== 0 || n.deps === null ? et(n, ct) : et(n, Ai);
}
function zu(n) {
  if (n !== null)
    for (const e of n)
      (e.f & Qt) === 0 || (e.f & ls) === 0 || (e.f ^= ls, zu(
        /** @type {Derived} */
        e.deps
      ));
}
function Du(n, e, t) {
  (n.f & bt) !== 0 ? e.add(n) : (n.f & Ai) !== 0 && t.add(n), zu(n.deps), et(n, ct);
}
function Iu(n, e, t) {
  if (n == null)
    return e(void 0), es;
  const i = b(
    () => n.subscribe(
      e,
      // @ts-expect-error
      t
    )
  );
  return i.unsubscribe ? () => i.unsubscribe() : i;
}
const vs = [];
function Os(n, e = es) {
  let t = null;
  const i = /* @__PURE__ */ new Set();
  function s(l) {
    if (Lh(n, l) && (n = l, t)) {
      const a = !vs.length;
      for (const h of i)
        h[1](), vs.push(h, n);
      if (a) {
        for (let h = 0; h < vs.length; h += 2)
          vs[h][0](vs[h + 1]);
        vs.length = 0;
      }
    }
  }
  function r(l) {
    s(l(
      /** @type {T} */
      n
    ));
  }
  function o(l, a = es) {
    const h = [l, a];
    return i.add(h), i.size === 1 && (t = e(s, r) || es), l(
      /** @type {T} */
      n
    ), () => {
      i.delete(h), i.size === 0 && t && (t(), t = null);
    };
  }
  return { set: s, update: r, subscribe: o };
}
function Lg(n) {
  let e;
  return Iu(n, (t) => e = t)(), e;
}
let Ca = !1, fo = !1, Aa = Symbol("unmounted");
function St(n, e, t) {
  const i = t[e] ?? (t[e] = {
    store: null,
    source: /* @__PURE__ */ U(void 0),
    unsubscribe: es
  });
  if (i.store !== n && !(Aa in t))
    if (i.unsubscribe(), i.store = n ?? null, n == null)
      i.source.v = void 0, i.unsubscribe = es;
    else {
      var s = !0;
      i.unsubscribe = Iu(n, (r) => {
        s ? i.source.v = r : k(i.source, r);
      }), s = !1;
    }
  return n && Aa in t ? Lg(n) : u(i.source);
}
function gn() {
  const n = {};
  function e() {
    Pl(() => {
      for (var t in n)
        n[t].unsubscribe();
      Zu(n, Aa, {
        enumerable: !1,
        value: !0
      });
    });
  }
  return [n, e];
}
function jg(n, e) {
  Ca = !0;
  try {
    n.set(e);
  } finally {
    Ca = !1;
  }
}
function Vl(n, e, t) {
  return jg(n, t), e;
}
function zg(n) {
  var e = fo;
  try {
    return fo = !1, [n(), fo];
  } finally {
    fo = e;
  }
}
let Nl = null, bs = null, Oe = null, Qr = null, wt = null, Ra = null, kr = !1, Gl = !1, Qs = null, Eo = null;
var jc = 0;
let Dg = 1;
var Es, $n, Nn, Ls, js, Gn, zs, sn, Nr, Jt, Gr, Pn, Di, Ii, Ds, Un, Me, Ma, mr, Xa, Wu, Yu, Lo, Ig, Ea, ys;
const yl = class yl {
  constructor() {
    Se(this, Me);
    Dt(this, "id", Dg++);
    /** True as soon as `#process` was called */
    Se(this, Es, !1);
    Dt(this, "linked", !0);
    /** @type {Batch | null} */
    Se(this, $n, null);
    /** @type {Batch | null} */
    Se(this, Nn, null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    Dt(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    Dt(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    Dt(this, "previous", /* @__PURE__ */ new Map());
    /**
     * Async effects which this batch doesn't take into account anymore when calculating blockers,
     * as it has a value for it already.
     * @type {Set<Effect>}
     */
    Dt(this, "unblocked", /* @__PURE__ */ new Set());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    Se(this, Ls, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    Se(this, js, /* @__PURE__ */ new Set());
    /**
     * Callbacks that should run only when a fork is committed.
     * @type {Set<(batch: Batch) => void>}
     */
    Se(this, Gn, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    Se(this, zs, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    Se(this, sn, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    Se(this, Nr, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    Se(this, Jt, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    Se(this, Gr, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    Se(this, Pn, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    Se(this, Di, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    Se(this, Ii, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    Se(this, Ds, /* @__PURE__ */ new Set());
    Dt(this, "is_fork", !1);
    Se(this, Un, !1);
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(e) {
    $(this, Ii).has(e) || $(this, Ii).set(e, { d: [], m: [] }), $(this, Ds).delete(e);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(e, t = (i) => this.schedule(i)) {
    var i = $(this, Ii).get(e);
    if (i) {
      $(this, Ii).delete(e);
      for (var s of i.d)
        et(s, bt), t(s);
      for (s of i.m)
        et(s, Ai), t(s);
    }
    $(this, Ds).add(e);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(e, t, i = !1) {
    e.v !== dt && !this.previous.has(e) && this.previous.set(e, e.v), (e.f & Cn) === 0 && (this.current.set(e, [t, i]), wt == null || wt.set(e, t)), this.is_fork || (e.v = t);
  }
  activate() {
    Oe = this;
  }
  deactivate() {
    Oe = null, wt = null;
  }
  flush() {
    try {
      Gl = !0, Oe = this, Ae(this, Me, mr).call(this);
    } finally {
      jc = 0, Ra = null, Qs = null, Eo = null, Gl = !1, Oe = null, wt = null, ts.clear();
    }
  }
  discard() {
    for (const e of $(this, js)) e(this);
    $(this, js).clear(), $(this, Gn).clear(), Ae(this, Me, ys).call(this);
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(e) {
    $(this, Gr).push(e);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(e, t) {
    if (xe(this, zs, $(this, zs) + 1), e) {
      let i = $(this, sn).get(t) ?? 0;
      $(this, sn).set(t, i + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(e, t) {
    if (xe(this, zs, $(this, zs) - 1), e) {
      let i = $(this, sn).get(t) ?? 0;
      i === 1 ? $(this, sn).delete(t) : $(this, sn).set(t, i - 1);
    }
    $(this, Un) || (xe(this, Un, !0), An(() => {
      xe(this, Un, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(e, t) {
    for (const i of e)
      $(this, Pn).add(i);
    for (const i of t)
      $(this, Di).add(i);
    e.clear(), t.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(e) {
    $(this, Ls).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(e) {
    $(this, js).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  on_fork_commit(e) {
    $(this, Gn).add(e);
  }
  run_fork_commit_callbacks() {
    for (const e of $(this, Gn)) e(this);
    $(this, Gn).clear();
  }
  settled() {
    return ($(this, Nr) ?? xe(this, Nr, Au())).promise;
  }
  static ensure() {
    var e;
    if (Oe === null) {
      const t = Oe = new yl();
      Ae(e = t, Me, Ea).call(e), !Gl && !kr && An(() => {
        $(t, Es) || t.flush();
      });
    }
    return Oe;
  }
  apply() {
    {
      wt = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(e) {
    var s;
    if (Ra = e, (s = e.b) != null && s.is_pending && (e.f & (Ws | Jr | Ru)) !== 0 && (e.f & ps) === 0) {
      e.b.defer_effect(e);
      return;
    }
    for (var t = e; t.parent !== null; ) {
      t = t.parent;
      var i = t.f;
      if (Qs !== null && t === Pe && (_e === null || (_e.f & Qt) === 0) && !Ca)
        return;
      if ((i & (Rn | Ci)) !== 0) {
        if ((i & ct) === 0)
          return;
        t.f ^= ct;
      }
    }
    $(this, Jt).push(t);
  }
};
Es = new WeakMap(), $n = new WeakMap(), Nn = new WeakMap(), Ls = new WeakMap(), js = new WeakMap(), Gn = new WeakMap(), zs = new WeakMap(), sn = new WeakMap(), Nr = new WeakMap(), Jt = new WeakMap(), Gr = new WeakMap(), Pn = new WeakMap(), Di = new WeakMap(), Ii = new WeakMap(), Ds = new WeakMap(), Un = new WeakMap(), Me = new WeakSet(), Ma = function() {
  if (this.is_fork) return !0;
  for (const i of $(this, sn).keys()) {
    for (var e = i, t = !1; e.parent !== null; ) {
      if ($(this, Ii).has(e)) {
        t = !0;
        break;
      }
      e = e.parent;
    }
    if (!t)
      return !0;
  }
  return !1;
}, mr = function() {
  var a, h, c, f;
  if (xe(this, Es, !0), jc++ > 1e3 && (Ae(this, Me, ys).call(this), Yg()), !Ae(this, Me, Ma).call(this)) {
    for (const d of $(this, Pn))
      $(this, Di).delete(d), et(d, bt), this.schedule(d);
    for (const d of $(this, Di))
      et(d, Ai), this.schedule(d);
  }
  const e = $(this, Jt);
  xe(this, Jt, []), this.apply();
  var t = Qs = [], i = [], s = Eo = [];
  for (const d of e)
    try {
      Ae(this, Me, Xa).call(this, d, t, i);
    } catch (p) {
      throw Vu(d), p;
    }
  if (Oe = null, s.length > 0) {
    var r = yl.ensure();
    for (const d of s)
      r.schedule(d);
  }
  if (Qs = null, Eo = null, Ae(this, Me, Ma).call(this)) {
    Ae(this, Me, Lo).call(this, i), Ae(this, Me, Lo).call(this, t);
    for (const [d, p] of $(this, Ii))
      Bu(d, p);
    s.length > 0 && /** @type {unknown} */
    Ae(a = Oe, Me, mr).call(a);
    return;
  }
  const o = Ae(this, Me, Wu).call(this);
  if (o) {
    Ae(h = o, Me, Yu).call(h, this);
    return;
  }
  $(this, Pn).clear(), $(this, Di).clear();
  for (const d of $(this, Ls)) d(this);
  $(this, Ls).clear(), Qr = this, zc(i), zc(t), Qr = null, (c = $(this, Nr)) == null || c.resolve();
  var l = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    Oe
  );
  if (this.linked && $(this, zs) === 0 && Ae(this, Me, ys).call(this), $(this, Jt).length > 0) {
    l === null && (l = this, Ae(this, Me, Ea).call(this));
    const d = l;
    $(d, Jt).push(...$(this, Jt).filter((p) => !$(d, Jt).includes(p)));
  }
  l !== null && Ae(f = l, Me, mr).call(f);
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
Xa = function(e, t, i) {
  e.f ^= ct;
  for (var s = e.first; s !== null; ) {
    var r = s.f, o = (r & (Ci | Rn)) !== 0, l = o && (r & ct) !== 0, a = l || (r & Lt) !== 0 || $(this, Ii).has(s);
    if (!a && s.fn !== null) {
      o ? s.f ^= ct : (r & Ws) !== 0 ? t.push(s) : rr(s) && ((r & _i) !== 0 && $(this, Di).add(s), cs(s));
      var h = s.first;
      if (h !== null) {
        s = h;
        continue;
      }
    }
    for (; s !== null; ) {
      var c = s.next;
      if (c !== null) {
        s = c;
        break;
      }
      s = s.parent;
    }
  }
}, Wu = function() {
  for (var e = $(this, $n); e !== null; ) {
    if (!e.is_fork) {
      for (const [t, [, i]] of this.current)
        if (e.current.has(t) && !i)
          return e;
    }
    e = $(e, $n);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
Yu = function(e) {
  var i;
  for (const [s, r] of e.current)
    !this.previous.has(s) && e.previous.has(s) && this.previous.set(s, e.previous.get(s)), this.current.set(s, r);
  for (const [s, r] of e.async_deriveds) {
    const o = this.async_deriveds.get(s);
    o && r.promise.then(o.resolve);
  }
  const t = (s) => {
    var r = s.reactions;
    if (r !== null)
      for (const a of r) {
        var o = a.f;
        if ((o & Qt) !== 0)
          t(
            /** @type {Derived} */
            a
          );
        else {
          var l = (
            /** @type {Effect} */
            a
          );
          o & (Ts | _i) && !this.async_deriveds.has(l) && ($(this, Di).delete(l), et(l, bt), this.schedule(l));
        }
      }
  };
  for (const s of this.current.keys())
    t(s);
  this.oncommit(() => e.discard()), Ae(i = e, Me, ys).call(i), Oe = this, Ae(this, Me, mr).call(this);
}, /**
 * @param {Effect[]} effects
 */
Lo = function(e) {
  for (var t = 0; t < e.length; t += 1)
    Du(e[t], $(this, Pn), $(this, Di));
}, Ig = function() {
  var c;
  Ae(this, Me, ys).call(this);
  for (let f = Nl; f !== null; f = $(f, Nn)) {
    var e = f.id < this.id, t = [];
    for (const [d, [p, O]] of this.current) {
      if (f.current.has(d)) {
        var i = (
          /** @type {[any, boolean]} */
          f.current.get(d)[0]
        );
        if (e && p !== i)
          f.current.set(d, [p, O]);
        else
          continue;
      }
      t.push(d);
    }
    if (e)
      for (const [d, p] of this.async_deriveds) {
        const O = f.async_deriveds.get(d);
        O && p.promise.then(O.resolve);
      }
    if ($(f, Es)) {
      var s = [...f.current.keys()].filter((d) => !this.current.has(d));
      if (s.length === 0)
        e && f.discard();
      else if (t.length > 0) {
        if (e)
          for (const d of $(this, Ds))
            f.unskip_effect(d, (p) => {
              var O;
              (p.f & (_i | Ts)) !== 0 ? f.schedule(p) : Ae(O = f, Me, Lo).call(O, [p]);
            });
        f.activate();
        var r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
        for (var l of t)
          qu(l, s, r, o);
        o = /* @__PURE__ */ new Map();
        var a = [...f.current.keys()].filter(
          (d) => this.current.has(d) ? (
            /** @type {[any, boolean]} */
            this.current.get(d)[0] !== d.v
          ) : !0
        );
        if (a.length > 0)
          for (const d of $(this, Gr))
            (d.f & (mi | Lt | No)) === 0 && zh(d, a, o) && ((d.f & (Ts | _i)) !== 0 ? (et(d, bt), f.schedule(d)) : $(f, Pn).add(d));
        if ($(f, Jt).length > 0 && !$(f, Un)) {
          f.apply();
          for (var h of $(f, Jt))
            Ae(c = f, Me, Xa).call(c, h, [], []);
          xe(f, Jt, []);
        }
        f.deactivate();
      }
    }
  }
}, Ea = function() {
  bs === null ? Nl = bs = this : (xe(bs, Nn, this), xe(this, $n, bs)), bs = this;
}, ys = function() {
  var e = $(this, $n), t = $(this, Nn);
  e === null ? Nl = t : xe(e, Nn, t), t === null ? bs = e : xe(t, $n, e), this.linked = !1;
};
let as = yl;
function Wg(n) {
  var e = kr;
  kr = !0;
  try {
    for (var t; ; ) {
      if (Xg(), Oe === null)
        return (
          /** @type {T} */
          t
        );
      Oe.flush();
    }
  } finally {
    kr = e;
  }
}
function Yg() {
  try {
    $g();
  } catch (n) {
    Tn(n, Ra);
  }
}
let ki = null;
function zc(n) {
  var e = n.length;
  if (e !== 0) {
    for (var t = 0; t < e; ) {
      var i = n[t++];
      if ((i.f & (mi | Lt)) === 0 && rr(i) && (ki = /* @__PURE__ */ new Set(), cs(i), i.deps === null && i.first === null && i.nodes === null && i.teardown === null && i.ac === null && rd(i), (ki == null ? void 0 : ki.size) > 0)) {
        ts.clear();
        for (const s of ki) {
          if ((s.f & (mi | Lt)) !== 0) continue;
          const r = [s];
          let o = s.parent;
          for (; o !== null; )
            ki.has(o) && (ki.delete(o), r.push(o)), o = o.parent;
          for (let l = r.length - 1; l >= 0; l--) {
            const a = r[l];
            (a.f & (mi | Lt)) === 0 && cs(a);
          }
        }
        ki.clear();
      }
    }
    ki = null;
  }
}
function qu(n, e, t, i) {
  if (!t.has(n) && (t.add(n), n.reactions !== null))
    for (const s of n.reactions) {
      const r = s.f;
      (r & Qt) !== 0 ? qu(
        /** @type {Derived} */
        s,
        e,
        t,
        i
      ) : (r & (Ts | _i)) !== 0 && (r & bt) === 0 && zh(s, e, i) && (et(s, bt), Dh(
        /** @type {Effect} */
        s
      ));
    }
}
function zh(n, e, t) {
  const i = t.get(n);
  if (i !== void 0) return i;
  if (n.deps !== null)
    for (const s of n.deps) {
      if (Jn.call(e, s))
        return !0;
      if ((s.f & Qt) !== 0 && zh(
        /** @type {Derived} */
        s,
        e,
        t
      ))
        return t.set(
          /** @type {Derived} */
          s,
          !0
        ), !0;
    }
  return t.set(n, !1), !1;
}
function Dh(n) {
  Oe.schedule(n);
}
function Bu(n, e) {
  if (!((n.f & Ci) !== 0 && (n.f & ct) !== 0)) {
    (n.f & bt) !== 0 ? e.d.push(n) : (n.f & Ai) !== 0 && e.m.push(n), et(n, ct);
    for (var t = n.first; t !== null; )
      Bu(t, e), t = t.next;
  }
}
function Vu(n) {
  et(n, ct);
  for (var e = n.first; e !== null; )
    Vu(e), e = e.next;
}
function qg(n) {
  let e = 0, t = hs(0), i;
  return () => {
    Yh() && (u(t), gs(() => (e === 0 && (i = b(() => n(() => $r(t)))), e += 1, () => {
      An(() => {
        e -= 1, e === 0 && (i == null || i(), i = void 0, $r(t));
      });
    })));
  };
}
var Bg = Ys | sr;
function Vg(n, e, t, i) {
  new Ng(n, e, t, i);
}
var ai, Mh, hi, Fn, Wt, ci, Rt, ei, rn, Hn, _n, Is, Ur, Fr, on, wl, rt, Gg, Ug, Fg, La, jo, zo, ja, za;
class Ng {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(e, t, i, s) {
    Se(this, rt);
    /** @type {Boundary | null} */
    Dt(this, "parent");
    Dt(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    Dt(this, "transform_error");
    /** @type {TemplateNode} */
    Se(this, ai);
    /** @type {TemplateNode | null} */
    Se(this, Mh, null);
    /** @type {BoundaryProps} */
    Se(this, hi);
    /** @type {((anchor: Node) => void)} */
    Se(this, Fn);
    /** @type {Effect} */
    Se(this, Wt);
    /** @type {Effect | null} */
    Se(this, ci, null);
    /** @type {Effect | null} */
    Se(this, Rt, null);
    /** @type {Effect | null} */
    Se(this, ei, null);
    /** @type {DocumentFragment | null} */
    Se(this, rn, null);
    Se(this, Hn, 0);
    Se(this, _n, 0);
    Se(this, Is, !1);
    /** @type {Set<Effect>} */
    Se(this, Ur, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    Se(this, Fr, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    Se(this, on, null);
    Se(this, wl, qg(() => (xe(this, on, hs($(this, Hn))), () => {
      xe(this, on, null);
    })));
    var r;
    xe(this, ai, e), xe(this, hi, t), xe(this, Fn, (o) => {
      var l = (
        /** @type {Effect} */
        Pe
      );
      l.b = this, l.f |= Pa, i(o);
    }), this.parent = /** @type {Effect} */
    Pe.b, this.transform_error = s ?? ((r = this.parent) == null ? void 0 : r.transform_error) ?? ((o) => o), xe(this, Wt, qh(() => {
      Ae(this, rt, La).call(this);
    }, Bg));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(e) {
    Du(e, $(this, Ur), $(this, Fr));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!$(this, hi).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(e, t) {
    Ae(this, rt, ja).call(this, e, t), xe(this, Hn, $(this, Hn) + e), !(!$(this, on) || $(this, Is)) && (xe(this, Is, !0), An(() => {
      xe(this, Is, !1), $(this, on) && Ns($(this, on), $(this, Hn));
    }));
  }
  get_effect_pending() {
    return $(this, wl).call(this), u(
      /** @type {Source<number>} */
      $(this, on)
    );
  }
  /** @param {unknown} error */
  error(e) {
    if (!$(this, hi).onerror && !$(this, hi).failed)
      throw e;
    Oe != null && Oe.is_fork ? ($(this, ci) && Oe.skip_effect($(this, ci)), $(this, Rt) && Oe.skip_effect($(this, Rt)), $(this, ei) && Oe.skip_effect($(this, ei)), Oe.on_fork_commit(() => {
      Ae(this, rt, za).call(this, e);
    })) : Ae(this, rt, za).call(this, e);
  }
}
ai = new WeakMap(), Mh = new WeakMap(), hi = new WeakMap(), Fn = new WeakMap(), Wt = new WeakMap(), ci = new WeakMap(), Rt = new WeakMap(), ei = new WeakMap(), rn = new WeakMap(), Hn = new WeakMap(), _n = new WeakMap(), Is = new WeakMap(), Ur = new WeakMap(), Fr = new WeakMap(), on = new WeakMap(), wl = new WeakMap(), rt = new WeakSet(), Gg = function() {
  try {
    xe(this, ci, fi(() => $(this, Fn).call(this, $(this, ai))));
  } catch (e) {
    this.error(e);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
Ug = function(e) {
  const t = $(this, hi).failed;
  t && xe(this, ei, fi(() => {
    t(
      $(this, ai),
      () => e,
      () => () => {
      }
    );
  }));
}, Fg = function() {
  const e = $(this, hi).pending;
  e && (this.is_pending = !0, xe(this, Rt, fi(() => e($(this, ai)))), An(() => {
    var t = xe(this, rn, document.createDocumentFragment()), i = fn();
    t.append(i), xe(this, ci, Ae(this, rt, zo).call(this, () => fi(() => $(this, Fn).call(this, i)))), $(this, _n) === 0 && ($(this, ai).before(t), xe(this, rn, null), is(
      /** @type {Effect} */
      $(this, Rt),
      () => {
        xe(this, Rt, null);
      }
    ), Ae(this, rt, jo).call(
      this,
      /** @type {Batch} */
      Oe
    ));
  }));
}, La = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), xe(this, _n, 0), xe(this, Hn, 0), xe(this, ci, fi(() => {
      $(this, Fn).call(this, $(this, ai));
    })), $(this, _n) > 0) {
      var e = xe(this, rn, document.createDocumentFragment());
      Nh($(this, ci), e);
      const t = (
        /** @type {(anchor: Node) => void} */
        $(this, hi).pending
      );
      xe(this, Rt, fi(() => t($(this, ai))));
    } else
      Ae(this, rt, jo).call(
        this,
        /** @type {Batch} */
        Oe
      );
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {Batch} batch
 */
jo = function(e) {
  this.is_pending = !1, e.transfer_effects($(this, Ur), $(this, Fr));
}, /**
 * @template T
 * @param {() => T} fn
 */
zo = function(e) {
  var t = Pe, i = _e, s = Ne;
  xi($(this, Wt)), wi($(this, Wt)), qs($(this, Wt).ctx);
  try {
    return as.ensure(), e();
  } catch (r) {
    return ju(r), null;
  } finally {
    xi(t), wi(i), qs(s);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
ja = function(e, t) {
  var i;
  if (!this.has_pending_snippet()) {
    this.parent && Ae(i = this.parent, rt, ja).call(i, e, t);
    return;
  }
  xe(this, _n, $(this, _n) + e), $(this, _n) === 0 && (Ae(this, rt, jo).call(this, t), $(this, Rt) && is($(this, Rt), () => {
    xe(this, Rt, null);
  }), $(this, rn) && ($(this, ai).before($(this, rn)), xe(this, rn, null)));
}, /**
 * @param {unknown} error
 */
za = function(e) {
  $(this, ci) && (Gt($(this, ci)), xe(this, ci, null)), $(this, Rt) && (Gt($(this, Rt)), xe(this, Rt, null)), $(this, ei) && (Gt($(this, ei)), xe(this, ei, null));
  var t = $(this, hi).onerror;
  let i = $(this, hi).failed;
  var s = !1, r = !1;
  const o = () => {
    if (s) {
      Mg();
      return;
    }
    s = !0, r && Cg(), $(this, ei) !== null && is($(this, ei), () => {
      xe(this, ei, null);
    }), Ae(this, rt, zo).call(this, () => {
      Ae(this, rt, La).call(this);
    });
  }, l = (a) => {
    try {
      r = !0, t == null || t(a, o), r = !1;
    } catch (h) {
      Tn(h, $(this, Wt) && $(this, Wt).parent);
    }
    i && xe(this, ei, Ae(this, rt, zo).call(this, () => {
      try {
        return fi(() => {
          var h = (
            /** @type {Effect} */
            Pe
          );
          h.b = this, h.f |= Pa, i(
            $(this, ai),
            () => a,
            () => o
          );
        });
      } catch (h) {
        return Tn(
          h,
          /** @type {Effect} */
          $(this, Wt).parent
        ), null;
      }
    }));
  };
  An(() => {
    var a;
    try {
      a = this.transform_error(e);
    } catch (h) {
      Tn(h, $(this, Wt) && $(this, Wt).parent);
      return;
    }
    a !== null && typeof a == "object" && typeof /** @type {any} */
    a.then == "function" ? a.then(
      l,
      /** @param {unknown} e */
      (h) => Tn(h, $(this, Wt) && $(this, Wt).parent)
    ) : l(a);
  });
};
function Hg(n, e, t, i) {
  const s = eo() ? Bs : mt;
  var r = n.filter((d) => !d.settled);
  if (t.length === 0 && r.length === 0) {
    i(e.map(s));
    return;
  }
  var o = (
    /** @type {Effect} */
    Pe
  ), l = Kg(), a = r.length === 1 ? r[0].promise : r.length > 1 ? Promise.all(r.map((d) => d.promise)) : null;
  function h(d) {
    if ((o.f & mi) === 0) {
      l();
      try {
        i(d);
      } catch (p) {
        Tn(p, o);
      }
      Uo();
    }
  }
  var c = Nu();
  if (t.length === 0) {
    a.then(() => h(e.map(s))).finally(c);
    return;
  }
  function f() {
    Promise.all(t.map((d) => /* @__PURE__ */ Jg(d))).then((d) => h([...e.map(s), ...d])).catch((d) => Tn(d, o)).finally(c);
  }
  a ? a.then(() => {
    l(), f(), Uo();
  }) : f();
}
function Kg() {
  var n = (
    /** @type {Effect} */
    Pe
  ), e = _e, t = Ne, i = (
    /** @type {Batch} */
    Oe
  );
  return function(r = !0) {
    xi(n), wi(e), qs(t), r && (n.f & mi) === 0 && (i == null || i.activate(), i == null || i.apply());
  };
}
function Uo(n = !0) {
  xi(null), wi(null), qs(null), n && (Oe == null || Oe.deactivate());
}
function Nu() {
  var n = (
    /** @type {Effect} */
    Pe
  ), e = (
    /** @type {Boundary} */
    n.b
  ), t = (
    /** @type {Batch} */
    Oe
  ), i = e.is_rendered();
  return e.update_pending_count(1, t), t.increment(i, n), () => {
    e.update_pending_count(-1, t), t.decrement(i, n);
  };
}
// @__NO_SIDE_EFFECTS__
function Bs(n) {
  var e = Qt | bt;
  return Pe !== null && (Pe.f |= sr), {
    ctx: Ne,
    deps: null,
    effects: null,
    equals: Xu,
    f: e,
    fn: n,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      dt
    ),
    wv: 0,
    parent: Pe,
    ac: null
  };
}
const uo = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function Jg(n, e, t) {
  let i = (
    /** @type {Effect | null} */
    Pe
  );
  i === null && wg();
  var s = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), r = hs(
    /** @type {V} */
    dt
  ), o = !_e, l = /* @__PURE__ */ new Set();
  return fm(() => {
    var p;
    var a = (
      /** @type {Effect} */
      Pe
    ), h = Au();
    s = h.promise;
    try {
      Promise.resolve(n()).then(h.resolve, (O) => {
        O !== kl && h.reject(O);
      }).finally(Uo);
    } catch (O) {
      h.reject(O), Uo();
    }
    var c = (
      /** @type {Batch} */
      Oe
    );
    if (o) {
      if ((a.f & ps) !== 0)
        var f = Nu();
      if (
        /** @type {Boundary} */
        i.b.is_rendered()
      )
        (p = c.async_deriveds.get(a)) == null || p.reject(uo);
      else
        for (const O of l.values())
          O.reject(uo);
      l.add(h), c.async_deriveds.set(a, h);
    }
    const d = (O, g = void 0) => {
      f == null || f(), l.delete(h), g !== uo && (c.activate(), g ? (r.f |= Cn, Ns(r, g)) : ((r.f & Cn) !== 0 && (r.f ^= Cn), Ns(r, O)), c.deactivate());
    };
    h.promise.then(d, (O) => d(null, O || "unknown"));
  }), Pl(() => {
    for (const a of l)
      a.reject(uo);
  }), new Promise((a) => {
    function h(c) {
      function f() {
        c === s ? a(r) : h(s);
      }
      c.then(f, f);
    }
    h(s);
  });
}
// @__NO_SIDE_EFFECTS__
function Vs(n) {
  const e = /* @__PURE__ */ Bs(n);
  return ad(e), e;
}
// @__NO_SIDE_EFFECTS__
function mt(n) {
  const e = /* @__PURE__ */ Bs(n);
  return e.equals = Eu, e;
}
function em(n) {
  var e = n.effects;
  if (e !== null) {
    n.effects = null;
    for (var t = 0; t < e.length; t += 1)
      Gt(
        /** @type {Effect} */
        e[t]
      );
  }
}
function Ih(n) {
  var e, t = Pe, i = n.parent;
  if (!dn && i !== null && n.v !== dt && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (i.f & (mi | Lt)) !== 0)
    return Ag(), n.v;
  xi(i);
  try {
    n.f &= ~ls, em(n), e = ud(n);
  } finally {
    xi(t);
  }
  return e;
}
function Gu(n) {
  var e = Ih(n);
  if (!n.equals(e) && (n.wv = cd(), (!(Oe != null && Oe.is_fork) || n.deps === null) && (Oe !== null ? (Oe.capture(n, e, !0), Qr == null || Qr.capture(n, e, !0)) : n.v = e, n.deps === null))) {
    et(n, ct);
    return;
  }
  dn || (wt !== null ? (Yh() || Oe != null && Oe.is_fork) && wt.set(n, e) : jh(n));
}
function tm(n) {
  var e, t;
  if (n.effects !== null)
    for (const i of n.effects)
      (i.teardown || i.ac) && ((e = i.teardown) == null || e.call(i), (t = i.ac) == null || t.abort(kl), i.fn !== null && (i.teardown = es), i.ac = null, Er(i, 0), Bh(i));
}
function Uu(n) {
  if (n.effects !== null)
    for (const e of n.effects)
      e.teardown && e.fn !== null && cs(e);
}
let Fo = /* @__PURE__ */ new Set();
const ts = /* @__PURE__ */ new Map();
let Fu = !1;
function hs(n, e) {
  var t = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: n,
    reactions: null,
    equals: Xu,
    rv: 0,
    wv: 0
  };
  return t;
}
// @__NO_SIDE_EFFECTS__
function bn(n, e) {
  const t = hs(n);
  return ad(t), t;
}
// @__NO_SIDE_EFFECTS__
function U(n, e = !1, t = !0) {
  var s;
  const i = hs(n);
  return e || (i.equals = Eu), nr && t && Ne !== null && Ne.l !== null && ((s = Ne.l).s ?? (s.s = [])).push(i), i;
}
function wn(n, e) {
  return k(
    n,
    b(() => u(n))
  ), e;
}
function k(n, e, t = !1) {
  _e !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Ti || (_e.f & No) !== 0) && eo() && (_e.f & (Qt | _i | Ts | No)) !== 0 && (vi === null || !Jn.call(vi, n)) && Zg();
  let i = t ? ks(e) : e;
  return Ns(n, i, Eo);
}
function Ns(n, e, t = null) {
  if (!n.equals(e)) {
    ts.set(n, dn ? e : n.v);
    var i = as.ensure();
    if (i.capture(n, e), (n.f & Qt) !== 0) {
      const s = (
        /** @type {Derived} */
        n
      );
      (n.f & bt) !== 0 && Ih(s), wt === null && jh(s);
    }
    n.wv = cd(), Hu(n, bt, t), eo() && Pe !== null && (Pe.f & ct) !== 0 && (Pe.f & (Ci | Rn)) === 0 && (li === null ? pm([n]) : li.push(n)), !i.is_fork && Fo.size > 0 && !Fu && im();
  }
  return e;
}
function im() {
  Fu = !1;
  for (const n of Fo) {
    (n.f & ct) !== 0 && et(n, Ai);
    let e;
    try {
      e = rr(n);
    } catch {
      e = !0;
    }
    e && cs(n);
  }
  Fo.clear();
}
function $r(n) {
  k(n, n.v + 1);
}
function Hu(n, e, t) {
  var i = n.reactions;
  if (i !== null)
    for (var s = eo(), r = i.length, o = 0; o < r; o++) {
      var l = i[o], a = l.f;
      if (!(!s && l === Pe)) {
        var h = (a & bt) === 0;
        if (h && et(l, e), (a & No) !== 0)
          Fo.add(
            /** @type {Effect} */
            l
          );
        else if ((a & Qt) !== 0) {
          var c = (
            /** @type {Derived} */
            l
          );
          wt == null || wt.delete(c), (a & ls) === 0 && (a & gi && (Pe === null || (Pe.f & Go) === 0) && (l.f |= ls), Hu(c, Ai, t));
        } else if (h) {
          var f = (
            /** @type {Effect} */
            l
          );
          (a & _i) !== 0 && ki !== null && ki.add(f), t !== null ? t.push(f) : Dh(f);
        }
      }
    }
}
function ks(n) {
  if (typeof n != "object" || n === null || cn in n)
    return n;
  const e = Xh(n);
  if (e !== dg && e !== pg)
    return n;
  var t = /* @__PURE__ */ new Map(), i = Sl(n), s = /* @__PURE__ */ bn(0), r = ns, o = (l) => {
    if (ns === r)
      return l();
    var a = _e, h = ns;
    wi(null), qc(r);
    var c = l();
    return wi(a), qc(h), c;
  };
  return i && t.set("length", /* @__PURE__ */ bn(
    /** @type {any[]} */
    n.length
  )), new Proxy(
    /** @type {any} */
    n,
    {
      defineProperty(l, a, h) {
        (!("value" in h) || h.configurable === !1 || h.enumerable === !1 || h.writable === !1) && _g();
        var c = t.get(a);
        return c === void 0 ? o(() => {
          var f = /* @__PURE__ */ bn(h.value);
          return t.set(a, f), f;
        }) : k(c, h.value, !0), !0;
      },
      deleteProperty(l, a) {
        var h = t.get(a);
        if (h === void 0) {
          if (a in l) {
            const c = o(() => /* @__PURE__ */ bn(dt));
            t.set(a, c), $r(s);
          }
        } else
          k(h, dt), $r(s);
        return !0;
      },
      get(l, a, h) {
        var p;
        if (a === cn)
          return n;
        var c = t.get(a), f = a in l;
        if (c === void 0 && (!f || (p = _s(l, a)) != null && p.writable) && (c = o(() => {
          var O = ks(f ? l[a] : dt), g = /* @__PURE__ */ bn(O);
          return g;
        }), t.set(a, c)), c !== void 0) {
          var d = u(c);
          return d === dt ? void 0 : d;
        }
        return Reflect.get(l, a, h);
      },
      getOwnPropertyDescriptor(l, a) {
        var h = Reflect.getOwnPropertyDescriptor(l, a);
        if (h && "value" in h) {
          var c = t.get(a);
          c && (h.value = u(c));
        } else if (h === void 0) {
          var f = t.get(a), d = f == null ? void 0 : f.v;
          if (f !== void 0 && d !== dt)
            return {
              enumerable: !0,
              configurable: !0,
              value: d,
              writable: !0
            };
        }
        return h;
      },
      has(l, a) {
        var d;
        if (a === cn)
          return !0;
        var h = t.get(a), c = h !== void 0 && h.v !== dt || Reflect.has(l, a);
        if (h !== void 0 || Pe !== null && (!c || (d = _s(l, a)) != null && d.writable)) {
          h === void 0 && (h = o(() => {
            var p = c ? ks(l[a]) : dt, O = /* @__PURE__ */ bn(p);
            return O;
          }), t.set(a, h));
          var f = u(h);
          if (f === dt)
            return !1;
        }
        return c;
      },
      set(l, a, h, c) {
        var S;
        var f = t.get(a), d = a in l;
        if (i && a === "length")
          for (var p = h; p < /** @type {Source<number>} */
          f.v; p += 1) {
            var O = t.get(p + "");
            O !== void 0 ? k(O, dt) : p in l && (O = o(() => /* @__PURE__ */ bn(dt)), t.set(p + "", O));
          }
        if (f === void 0)
          (!d || (S = _s(l, a)) != null && S.writable) && (f = o(() => /* @__PURE__ */ bn(void 0)), k(f, ks(h)), t.set(a, f));
        else {
          d = f.v !== dt;
          var g = o(() => ks(h));
          k(f, g);
        }
        var m = Reflect.getOwnPropertyDescriptor(l, a);
        if (m != null && m.set && m.set.call(c, h), !d) {
          if (i && typeof a == "string") {
            var v = (
              /** @type {Source<number>} */
              t.get("length")
            ), x = Number(a);
            Number.isInteger(x) && x >= v.v && k(v, x + 1);
          }
          $r(s);
        }
        return !0;
      },
      ownKeys(l) {
        u(s);
        var a = Reflect.ownKeys(l).filter((f) => {
          var d = t.get(f);
          return d === void 0 || d.v !== dt;
        });
        for (var [h, c] of t)
          c.v !== dt && !(h in l) && a.push(h);
        return a;
      },
      setPrototypeOf() {
        Tg();
      }
    }
  );
}
function Dc(n) {
  try {
    if (n !== null && typeof n == "object" && cn in n)
      return n[cn];
  } catch {
  }
  return n;
}
function nm(n, e) {
  return Object.is(Dc(n), Dc(e));
}
var Ic, Ku, Ju, ed;
function sm() {
  if (Ic === void 0) {
    Ic = window, Ku = /Firefox/.test(navigator.userAgent);
    var n = Element.prototype, e = Node.prototype, t = Text.prototype;
    Ju = _s(e, "firstChild").get, ed = _s(e, "nextSibling").get, Lc(n) && (n[Ta] = void 0, n[Mo] = null, n[Za] = void 0, n.__e = void 0), Lc(t) && (t[gr] = void 0);
  }
}
function fn(n = "") {
  return document.createTextNode(n);
}
// @__NO_SIDE_EFFECTS__
function ln(n) {
  return (
    /** @type {TemplateNode | null} */
    Ju.call(n)
  );
}
// @__NO_SIDE_EFFECTS__
function to(n) {
  return (
    /** @type {TemplateNode | null} */
    ed.call(n)
  );
}
function y(n, e) {
  return /* @__PURE__ */ ln(n);
}
function Ve(n, e = !1) {
  {
    var t = /* @__PURE__ */ ln(n);
    return t instanceof Comment && t.data === "" ? /* @__PURE__ */ to(t) : t;
  }
}
function w(n, e = 1, t = !1) {
  let i = n;
  for (; e--; )
    i = /** @type {TemplateNode} */
    /* @__PURE__ */ to(i);
  return i;
}
function rm(n) {
  n.textContent = "";
}
function td() {
  return !1;
}
function om(n, e, t) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(_u, n, void 0)
  );
}
let Wc = !1;
function lm() {
  Wc || (Wc = !0, document.addEventListener(
    "reset",
    (n) => {
      Promise.resolve().then(() => {
        var e;
        if (!n.defaultPrevented)
          for (
            const t of
            /**@type {HTMLFormElement} */
            n.target.elements
          )
            (e = t[Xo]) == null || e.call(t);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function $l(n) {
  var e = _e, t = Pe;
  wi(null), xi(null);
  try {
    return n();
  } finally {
    wi(e), xi(t);
  }
}
function Wh(n, e, t, i = t) {
  n.addEventListener(e, () => $l(t));
  const s = (
    /** @type {any} */
    n[Xo]
  );
  s ? n[Xo] = () => {
    s(), i(!0);
  } : n[Xo] = () => i(!0), lm();
}
function id(n) {
  Pe === null && (_e === null && kg(), Qg()), dn && Sg();
}
function am(n, e) {
  var t = e.last;
  t === null ? e.last = e.first = n : (t.next = n, n.prev = t, e.last = n);
}
function Ji(n, e) {
  var t = Pe;
  t !== null && (t.f & Lt) !== 0 && (n |= Lt);
  var i = {
    ctx: Ne,
    deps: null,
    nodes: null,
    f: n | bt | gi,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: t,
    b: t && t.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  Oe == null || Oe.register_created_effect(i);
  var s = i;
  if ((n & Ws) !== 0)
    Qs !== null ? Qs.push(i) : as.ensure().schedule(i);
  else if (e !== null) {
    try {
      cs(i);
    } catch (o) {
      throw Gt(i), o;
    }
    s.deps === null && s.teardown === null && s.nodes === null && s.first === s.last && // either `null`, or a singular child
    (s.f & sr) === 0 && (s = s.first, (n & _i) !== 0 && (n & Ys) !== 0 && s !== null && (s.f |= Ys));
  }
  if (s !== null && (s.parent = t, t !== null && am(s, t), _e !== null && (_e.f & Qt) !== 0 && (n & Rn) === 0)) {
    var r = (
      /** @type {Derived} */
      _e
    );
    (r.effects ?? (r.effects = [])).push(s);
  }
  return i;
}
function Yh() {
  return _e !== null && !Ti;
}
function Pl(n) {
  const e = Ji(Jr, null);
  return et(e, ct), e.teardown = n, e;
}
function Da(n) {
  id();
  var e = (
    /** @type {Effect} */
    Pe.f
  ), t = !_e && (e & Ci) !== 0 && (e & ps) === 0;
  if (t) {
    var i = (
      /** @type {ComponentContext} */
      Ne
    );
    (i.e ?? (i.e = [])).push(n);
  } else
    return nd(n);
}
function nd(n) {
  return Ji(Ws | Mu, n);
}
function hm(n) {
  return id(), Ji(Jr | Mu, n);
}
function cm(n) {
  as.ensure();
  const e = Ji(Rn | sr, n);
  return (t = {}) => new Promise((i) => {
    t.outro ? is(e, () => {
      Gt(e), i(void 0);
    }) : (Gt(e), i(void 0));
  });
}
function _l(n) {
  return Ji(Ws, n);
}
function lt(n, e) {
  var t = (
    /** @type {ComponentContextLegacy} */
    Ne
  ), i = { effect: null, ran: !1, deps: n };
  t.l.$.push(i), i.effect = gs(() => {
    if (n(), !i.ran) {
      i.ran = !0;
      var s = (
        /** @type {Effect} */
        Pe
      );
      try {
        xi(s.parent), b(e);
      } finally {
        xi(s);
      }
    }
  });
}
function en() {
  var n = (
    /** @type {ComponentContextLegacy} */
    Ne
  );
  gs(() => {
    for (var e of n.l.$) {
      e.deps();
      var t = e.effect;
      (t.f & ct) !== 0 && t.deps !== null && et(t, Ai), rr(t) && cs(t), e.ran = !1;
    }
  });
}
function fm(n) {
  return Ji(Ts | sr, n);
}
function gs(n, e = 0) {
  return Ji(Jr | e, n);
}
function F(n, e = [], t = [], i = []) {
  Hg(i, e, t, (s) => {
    Ji(Jr, () => n(...s.map(u)));
  });
}
function qh(n, e = 0) {
  var t = Ji(_i | e, n);
  return t;
}
function fi(n) {
  return Ji(Ci | sr, n);
}
function sd(n) {
  var e = n.teardown;
  if (e !== null) {
    const t = dn, i = _e;
    Yc(!0), wi(null);
    try {
      e.call(null);
    } finally {
      Yc(t), wi(i);
    }
  }
}
function Bh(n, e = !1) {
  var t = n.first;
  for (n.first = n.last = null; t !== null; ) {
    const s = t.ac;
    s !== null && $l(() => {
      s.abort(kl);
    });
    var i = t.next;
    (t.f & Rn) !== 0 ? t.parent = null : Gt(t, e), t = i;
  }
}
function um(n) {
  for (var e = n.first; e !== null; ) {
    var t = e.next;
    (e.f & Ci) === 0 && Gt(e), e = t;
  }
}
function Gt(n, e = !0) {
  var t = !1;
  (e || (n.f & mg) !== 0) && n.nodes !== null && n.nodes.end !== null && (dm(
    n.nodes.start,
    /** @type {TemplateNode} */
    n.nodes.end
  ), t = !0), et(n, _a), Bh(n, e && !t), Er(n, 0);
  var i = n.nodes && n.nodes.t;
  if (i !== null)
    for (const r of i)
      r.stop();
  sd(n), n.f ^= _a, n.f |= mi;
  var s = n.parent;
  s !== null && s.first !== null && rd(n), n.next = n.prev = n.teardown = n.ctx = n.deps = n.fn = n.nodes = n.ac = n.b = null;
}
function dm(n, e) {
  for (; n !== null; ) {
    var t = n === e ? null : /* @__PURE__ */ to(n);
    n.remove(), n = t;
  }
}
function rd(n) {
  var e = n.parent, t = n.prev, i = n.next;
  t !== null && (t.next = i), i !== null && (i.prev = t), e !== null && (e.first === n && (e.first = i), e.last === n && (e.last = t));
}
function is(n, e, t = !0) {
  var i = [];
  od(n, i, !0);
  var s = () => {
    t && Gt(n), e && e();
  }, r = i.length;
  if (r > 0) {
    var o = () => --r || s();
    for (var l of i)
      l.out(o);
  } else
    s();
}
function od(n, e, t) {
  if ((n.f & Lt) === 0) {
    n.f ^= Lt;
    var i = n.nodes && n.nodes.t;
    if (i !== null)
      for (const l of i)
        (l.is_global || t) && e.push(l);
    for (var s = n.first; s !== null; ) {
      var r = s.next;
      if ((s.f & Rn) === 0) {
        var o = (s.f & Ys) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (s.f & Ci) !== 0 && (n.f & _i) !== 0;
        od(s, e, o ? t : !1);
      }
      s = r;
    }
  }
}
function Vh(n) {
  ld(n, !0);
}
function ld(n, e) {
  if ((n.f & Lt) !== 0) {
    n.f ^= Lt, (n.f & ct) === 0 && (et(n, bt), as.ensure().schedule(n));
    for (var t = n.first; t !== null; ) {
      var i = t.next, s = (t.f & Ys) !== 0 || (t.f & Ci) !== 0;
      ld(t, s ? e : !1), t = i;
    }
    var r = n.nodes && n.nodes.t;
    if (r !== null)
      for (const o of r)
        (o.is_global || e) && o.in();
  }
}
function Nh(n, e) {
  if (n.nodes)
    for (var t = n.nodes.start, i = n.nodes.end; t !== null; ) {
      var s = t === i ? null : /* @__PURE__ */ to(t);
      e.append(t), t = s;
    }
}
let Do = !1, dn = !1;
function Yc(n) {
  dn = n;
}
let _e = null, Ti = !1;
function wi(n) {
  _e = n;
}
let Pe = null;
function xi(n) {
  Pe = n;
}
let vi = null;
function ad(n) {
  _e !== null && (vi === null ? vi = [n] : vi.push(n));
}
let Yt = null, Kt = 0, li = null;
function pm(n) {
  li = n;
}
let hd = 1, Bn = 0, ns = Bn;
function qc(n) {
  ns = n;
}
function cd() {
  return ++hd;
}
function rr(n) {
  var e = n.f;
  if ((e & bt) !== 0)
    return !0;
  if (e & Qt && (n.f &= ~ls), (e & Ai) !== 0) {
    for (var t = (
      /** @type {Value[]} */
      n.deps
    ), i = t.length, s = 0; s < i; s++) {
      var r = t[s];
      if (rr(
        /** @type {Derived} */
        r
      ) && Gu(
        /** @type {Derived} */
        r
      ), r.wv > n.wv)
        return !0;
    }
    (e & gi) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    wt === null && et(n, ct);
  }
  return !1;
}
function fd(n, e, t = !0) {
  var i = n.reactions;
  if (i !== null && !(vi !== null && Jn.call(vi, n)))
    for (var s = 0; s < i.length; s++) {
      var r = i[s];
      (r.f & Qt) !== 0 ? fd(
        /** @type {Derived} */
        r,
        e,
        !1
      ) : e === r && (t ? et(r, bt) : (r.f & ct) !== 0 && et(r, Ai), Dh(
        /** @type {Effect} */
        r
      ));
    }
}
function ud(n) {
  var g;
  var e = Yt, t = Kt, i = li, s = _e, r = vi, o = Ne, l = Ti, a = ns, h = n.f;
  Yt = /** @type {null | Value[]} */
  null, Kt = 0, li = null, _e = (h & (Ci | Rn)) === 0 ? n : null, vi = null, qs(n.ctx), Ti = !1, ns = ++Bn, n.ac !== null && ($l(() => {
    n.ac.abort(kl);
  }), n.ac = null);
  try {
    n.f |= Go;
    var c = (
      /** @type {Function} */
      n.fn
    ), f = c();
    n.f |= ps;
    var d = n.deps, p = Oe == null ? void 0 : Oe.is_fork;
    if (Yt !== null) {
      var O;
      if (p || Er(n, Kt), d !== null && Kt > 0)
        for (d.length = Kt + Yt.length, O = 0; O < Yt.length; O++)
          d[Kt + O] = Yt[O];
      else
        n.deps = d = Yt;
      if (Yh() && (n.f & gi) !== 0)
        for (O = Kt; O < d.length; O++)
          ((g = d[O]).reactions ?? (g.reactions = [])).push(n);
    } else !p && d !== null && Kt < d.length && (Er(n, Kt), d.length = Kt);
    if (eo() && li !== null && !Ti && d !== null && (n.f & (Qt | Ai | bt)) === 0)
      for (O = 0; O < /** @type {Source[]} */
      li.length; O++)
        fd(
          li[O],
          /** @type {Effect} */
          n
        );
    if (s !== null && s !== n) {
      if (Bn++, s.deps !== null)
        for (let m = 0; m < t; m += 1)
          s.deps[m].rv = Bn;
      if (e !== null)
        for (const m of e)
          m.rv = Bn;
      li !== null && (i === null ? i = li : i.push(.../** @type {Source[]} */
      li));
    }
    return (n.f & Cn) !== 0 && (n.f ^= Cn), f;
  } catch (m) {
    return ju(m);
  } finally {
    n.f ^= Go, Yt = e, Kt = t, li = i, _e = s, vi = r, qs(o), Ti = l, ns = a;
  }
}
function Om(n, e) {
  let t = e.reactions;
  if (t !== null) {
    var i = ug.call(t, n);
    if (i !== -1) {
      var s = t.length - 1;
      s === 0 ? t = e.reactions = null : (t[i] = t[s], t.pop());
    }
  }
  if (t === null && (e.f & Qt) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Yt === null || !Jn.call(Yt, e))) {
    var r = (
      /** @type {Derived} */
      e
    );
    (r.f & gi) !== 0 && (r.f ^= gi, r.f &= ~ls), r.v !== dt && jh(r), tm(r), Er(r, 0);
  }
}
function Er(n, e) {
  var t = n.deps;
  if (t !== null)
    for (var i = e; i < t.length; i++)
      Om(n, t[i]);
}
function cs(n) {
  var e = n.f;
  if ((e & mi) === 0) {
    et(n, ct);
    var t = Pe, i = Do;
    Pe = n, Do = !0;
    try {
      (e & (_i | Ru)) !== 0 ? um(n) : Bh(n), sd(n);
      var s = ud(n);
      n.teardown = typeof s == "function" ? s : null, n.wv = hd;
      var r;
      Tu && eg && (n.f & bt) !== 0 && n.deps;
    } finally {
      Do = i, Pe = t;
    }
  }
}
async function gm() {
  await Promise.resolve(), Wg();
}
function u(n) {
  var e = n.f, t = (e & Qt) !== 0;
  if (_e !== null && !Ti) {
    var i = Pe !== null && (Pe.f & mi) !== 0;
    if (!i && (vi === null || !Jn.call(vi, n))) {
      var s = _e.deps;
      if ((_e.f & Go) !== 0)
        n.rv < Bn && (n.rv = Bn, Yt === null && s !== null && s[Kt] === n ? Kt++ : Yt === null ? Yt = [n] : Yt.push(n));
      else {
        _e.deps ?? (_e.deps = []), Jn.call(_e.deps, n) || _e.deps.push(n);
        var r = n.reactions;
        r === null ? n.reactions = [_e] : Jn.call(r, _e) || r.push(_e);
      }
    }
  }
  if (dn && ts.has(n))
    return ts.get(n);
  if (t) {
    var o = (
      /** @type {Derived} */
      n
    );
    if (dn) {
      var l = o.v;
      return ((o.f & ct) === 0 && o.reactions !== null || pd(o)) && (l = Ih(o)), ts.set(o, l), l;
    }
    var a = (o.f & gi) === 0 && !Ti && _e !== null && (Do || (_e.f & gi) !== 0), h = (o.f & ps) === 0;
    rr(o) && (a && (o.f |= gi), Gu(o)), a && !h && (Uu(o), dd(o));
  }
  if (wt != null && wt.has(n))
    return wt.get(n);
  if ((n.f & Cn) !== 0)
    throw n.v;
  return n.v;
}
function dd(n) {
  if (n.f |= gi, n.deps !== null)
    for (const e of n.deps)
      (e.reactions ?? (e.reactions = [])).push(n), (e.f & Qt) !== 0 && (e.f & gi) === 0 && (Uu(
        /** @type {Derived} */
        e
      ), dd(
        /** @type {Derived} */
        e
      ));
}
function pd(n) {
  if (n.v === dt) return !0;
  if (n.deps === null) return !1;
  for (const e of n.deps)
    if (ts.has(e) || (e.f & Qt) !== 0 && pd(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function b(n) {
  var e = Ti;
  try {
    return Ti = !0, n();
  } finally {
    Ti = e;
  }
}
function Ee(n) {
  if (!(typeof n != "object" || !n || n instanceof EventTarget)) {
    if (cn in n)
      Ia(n);
    else if (!Array.isArray(n))
      for (let e in n) {
        const t = n[e];
        typeof t == "object" && t && cn in t && Ia(t);
      }
  }
}
function Ia(n, e = /* @__PURE__ */ new Set()) {
  if (typeof n == "object" && n !== null && // We don't want to traverse DOM elements
  !(n instanceof EventTarget) && !e.has(n)) {
    e.add(n), n instanceof Date && n.getTime();
    for (let i in n)
      try {
        Ia(n[i], e);
      } catch {
      }
    const t = Xh(n);
    if (t !== Object.prototype && t !== Array.prototype && t !== Map.prototype && t !== Set.prototype && t !== Date.prototype) {
      const i = Cu(t);
      for (let s in i) {
        const r = i[s].get;
        if (r)
          try {
            r.call(n);
          } catch {
          }
      }
    }
  }
}
const po = Symbol("events"), mm = /* @__PURE__ */ new Set(), Bc = /* @__PURE__ */ new Set();
function vm(n, e, t, i = {}) {
  function s(r) {
    if (i.capture || Wa.call(e, r), !r.cancelBubble)
      return $l(() => t == null ? void 0 : t.call(this, r));
  }
  return n.startsWith("pointer") || n.startsWith("touch") || n === "wheel" ? An(() => {
    e.addEventListener(n, s, i);
  }) : e.addEventListener(n, s, i), s;
}
function ie(n, e, t, i, s) {
  var r = { capture: i, passive: s }, o = vm(n, e, t, r);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && Pl(() => {
    e.removeEventListener(n, o, r);
  });
}
let Vc = null;
function Wa(n) {
  var m, v;
  var e = this, t = (
    /** @type {Node} */
    e.ownerDocument
  ), i = n.type, s = ((m = n.composedPath) == null ? void 0 : m.call(n)) || [], r = (
    /** @type {null | Element} */
    s[0] || n.target
  );
  Vc = n;
  var o = 0, l = Vc === n && n[po];
  if (l) {
    var a = s.indexOf(l);
    if (a !== -1 && (e === document || e === /** @type {any} */
    window)) {
      n[po] = e;
      return;
    }
    var h = s.indexOf(e);
    if (h === -1)
      return;
    a <= h && (o = a);
  }
  if (r = /** @type {Element} */
  s[o] || n.target, r !== e) {
    Zu(n, "currentTarget", {
      configurable: !0,
      get() {
        return r || t;
      }
    });
    var c = _e, f = Pe;
    wi(null), xi(null);
    try {
      for (var d, p = []; r !== null; ) {
        var O = r.assignedSlot || r.parentNode || /** @type {any} */
        r.host || null;
        try {
          var g = (v = r[po]) == null ? void 0 : v[i];
          g != null && (!/** @type {any} */
          r.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          n.target === r) && g.call(r, n);
        } catch (x) {
          d ? p.push(x) : d = x;
        }
        if (n.cancelBubble || O === e || O === null)
          break;
        r = O;
      }
      if (d) {
        for (let x of p)
          queueMicrotask(() => {
            throw x;
          });
        throw d;
      }
    } finally {
      n[po] = e, delete n.currentTarget, wi(c), xi(f);
    }
  }
}
var ku;
const Ul = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((ku = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : ku.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (n) => n
  })
);
function bm(n) {
  return (
    /** @type {string} */
    (Ul == null ? void 0 : Ul.createHTML(n)) ?? n
  );
}
function Od(n) {
  var e = om("template");
  return e.innerHTML = bm(n.replaceAll("<!>", "<!---->")), e.content;
}
function Gs(n, e) {
  var t = (
    /** @type {Effect} */
    Pe
  );
  t.nodes === null && (t.nodes = { start: n, end: e, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function L(n, e) {
  var t = (e & Pu) !== 0, i = (e & fg) !== 0, s, r = !n.startsWith("<!>");
  return () => {
    s === void 0 && (s = Od(r ? n : "<!>" + n), t || (s = /** @type {TemplateNode} */
    /* @__PURE__ */ ln(s)));
    var o = (
      /** @type {TemplateNode} */
      i || Ku ? document.importNode(s, !0) : s.cloneNode(!0)
    );
    if (t) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ ln(o)
      ), a = (
        /** @type {TemplateNode} */
        o.lastChild
      );
      Gs(l, a);
    } else
      Gs(o, o);
    return o;
  };
}
// @__NO_SIDE_EFFECTS__
function ym(n, e, t = "svg") {
  var i = !n.startsWith("<!>"), s = (e & Pu) !== 0, r = `<${t}>${i ? n : "<!>" + n}</${t}>`, o;
  return () => {
    if (!o) {
      var l = (
        /** @type {DocumentFragment} */
        Od(r)
      ), a = (
        /** @type {Element} */
        /* @__PURE__ */ ln(l)
      );
      if (s)
        for (o = document.createDocumentFragment(); /* @__PURE__ */ ln(a); )
          o.appendChild(
            /** @type {TemplateNode} */
            /* @__PURE__ */ ln(a)
          );
      else
        o = /** @type {Element} */
        /* @__PURE__ */ ln(a);
    }
    var h = (
      /** @type {TemplateNode} */
      o.cloneNode(!0)
    );
    if (s) {
      var c = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ ln(h)
      ), f = (
        /** @type {TemplateNode} */
        h.lastChild
      );
      Gs(c, f);
    } else
      Gs(h, h);
    return h;
  };
}
// @__NO_SIDE_EFFECTS__
function io(n, e) {
  return /* @__PURE__ */ ym(n, e, "svg");
}
function wm(n = "") {
  {
    var e = fn(n + "");
    return Gs(e, e), e;
  }
}
function pn() {
  var n = document.createDocumentFragment(), e = document.createComment(""), t = fn();
  return n.append(e, t), Gs(e, t), n;
}
function A(n, e) {
  n !== null && n.before(
    /** @type {Node} */
    e
  );
}
const xm = ["touchstart", "touchmove"];
function Sm(n) {
  return xm.includes(n);
}
function V(n, e) {
  var t = e == null ? "" : typeof e == "object" ? `${e}` : e;
  t !== /** @type {any} */
  (n[gr] ?? (n[gr] = n.nodeValue)) && (n[gr] = t, n.nodeValue = `${t}`);
}
function Qm(n, e) {
  return km(n, e);
}
const Oo = /* @__PURE__ */ new Map();
function km(n, { target: e, anchor: t, props: i = {}, events: s, context: r, intro: o = !0, transformError: l }) {
  sm();
  var a = void 0, h = cm(() => {
    var c = t ?? e.appendChild(fn());
    Vg(
      /** @type {TemplateNode} */
      c,
      {
        pending: () => {
        }
      },
      (p) => {
        kt({});
        var O = (
          /** @type {ComponentContext} */
          Ne
        );
        r && (O.c = r), s && (i.$$events = s), a = n(p, i) || {}, $t();
      },
      l
    );
    var f = /* @__PURE__ */ new Set(), d = (p) => {
      for (var O = 0; O < p.length; O++) {
        var g = p[O];
        if (!f.has(g)) {
          f.add(g);
          var m = Sm(g);
          for (const S of [e, document]) {
            var v = Oo.get(S);
            v === void 0 && (v = /* @__PURE__ */ new Map(), Oo.set(S, v));
            var x = v.get(g);
            x === void 0 ? (S.addEventListener(g, Wa, { passive: m }), v.set(g, 1)) : v.set(g, x + 1);
          }
        }
      }
    };
    return d(Ql(mm)), Bc.add(d), () => {
      var m;
      for (var p of f)
        for (const v of [e, document]) {
          var O = (
            /** @type {Map<string, number>} */
            Oo.get(v)
          ), g = (
            /** @type {number} */
            O.get(p)
          );
          --g == 0 ? (v.removeEventListener(p, Wa), O.delete(p), O.size === 0 && Oo.delete(v)) : O.set(p, g);
        }
      Bc.delete(d), c !== t && ((m = c.parentNode) == null || m.removeChild(c));
    };
  });
  return $m.set(a, h), a;
}
let $m = /* @__PURE__ */ new WeakMap();
var $i, Wi, ti, Kn, Hr, Kr, xl;
class Pm {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(e, t = !0) {
    /** @type {TemplateNode} */
    Dt(this, "anchor");
    /** @type {Map<Batch, Key>} */
    Se(this, $i, /* @__PURE__ */ new Map());
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
    Se(this, Wi, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    Se(this, ti, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    Se(this, Kn, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    Se(this, Hr, !0);
    /**
     * @param {Batch} batch
     */
    Se(this, Kr, (e) => {
      if ($(this, $i).has(e)) {
        var t = (
          /** @type {Key} */
          $(this, $i).get(e)
        ), i = $(this, Wi).get(t);
        if (i)
          Vh(i), $(this, Kn).delete(t);
        else {
          var s = $(this, ti).get(t);
          s && ($(this, Wi).set(t, s.effect), $(this, ti).delete(t), s.fragment.lastChild.remove(), this.anchor.before(s.fragment), i = s.effect);
        }
        for (const [r, o] of $(this, $i)) {
          if ($(this, $i).delete(r), r === e)
            break;
          const l = $(this, ti).get(o);
          l && (Gt(l.effect), $(this, ti).delete(o));
        }
        for (const [r, o] of $(this, Wi)) {
          if (r === t || $(this, Kn).has(r)) continue;
          const l = () => {
            if (Array.from($(this, $i).values()).includes(r)) {
              var h = document.createDocumentFragment();
              Nh(o, h), h.append(fn()), $(this, ti).set(r, { effect: o, fragment: h });
            } else
              Gt(o);
            $(this, Kn).delete(r), $(this, Wi).delete(r);
          };
          $(this, Hr) || !i ? ($(this, Kn).add(r), is(o, l, !1)) : l();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    Se(this, xl, (e) => {
      $(this, $i).delete(e);
      const t = Array.from($(this, $i).values());
      for (const [i, s] of $(this, ti))
        t.includes(i) || (Gt(s.effect), $(this, ti).delete(i));
    });
    this.anchor = e, xe(this, Hr, t);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(e, t) {
    var i = (
      /** @type {Batch} */
      Oe
    ), s = td();
    if (t && !$(this, Wi).has(e) && !$(this, ti).has(e))
      if (s) {
        var r = document.createDocumentFragment(), o = fn();
        r.append(o), $(this, ti).set(e, {
          effect: fi(() => t(o)),
          fragment: r
        });
      } else
        $(this, Wi).set(
          e,
          fi(() => t(this.anchor))
        );
    if ($(this, $i).set(i, e), s) {
      for (const [l, a] of $(this, Wi))
        l === e ? i.unskip_effect(a) : i.skip_effect(a);
      for (const [l, a] of $(this, ti))
        l === e ? i.unskip_effect(a.effect) : i.skip_effect(a.effect);
      i.oncommit($(this, Kr)), i.ondiscard($(this, xl));
    } else
      $(this, Kr).call(this, i);
  }
}
$i = new WeakMap(), Wi = new WeakMap(), ti = new WeakMap(), Kn = new WeakMap(), Hr = new WeakMap(), Kr = new WeakMap(), xl = new WeakMap();
function ms(n) {
  Ne === null && Eh(), nr && Ne.l !== null ? Tm(Ne).m.push(n) : Da(() => {
    const e = b(n);
    if (typeof e == "function") return (
      /** @type {() => void} */
      e
    );
  });
}
function gd(n) {
  Ne === null && Eh(), ms(() => () => b(n));
}
function _m(n, e, { bubbles: t = !1, cancelable: i = !1 } = {}) {
  return new CustomEvent(n, { detail: e, bubbles: t, cancelable: i });
}
function md() {
  const n = Ne;
  return n === null && Eh(), (e, t, i) => {
    var r;
    const s = (
      /** @type {Record<string, Function | Function[]>} */
      (r = n.s.$$events) == null ? void 0 : r[
        /** @type {string} */
        e
      ]
    );
    if (s) {
      const o = Sl(s) ? s.slice() : [s], l = _m(
        /** @type {string} */
        e,
        t,
        i
      );
      for (const a of o)
        a.call(n.x, l);
      return !l.defaultPrevented;
    }
    return !0;
  };
}
function Tm(n) {
  var e = (
    /** @type {ComponentContextLegacy} */
    n.l
  );
  return e.u ?? (e.u = { a: [], b: [], m: [] });
}
function ee(n, e, t = !1) {
  var i = new Pm(n), s = t ? Ys : 0;
  function r(o, l) {
    i.ensure(o, l);
  }
  qh(() => {
    var o = !1;
    e((l, a = 0) => {
      o = !0, r(a, l);
    }), o || r(-1, null);
  }, s);
}
function Ge(n, e) {
  return e;
}
function Zm(n, e, t) {
  for (var i = [], s = e.length, r, o = e.length, l = 0; l < s; l++) {
    let f = e[l];
    is(
      f,
      () => {
        if (r) {
          if (r.pending.delete(f), r.done.add(f), r.pending.size === 0) {
            var d = (
              /** @type {Set<EachOutroGroup>} */
              n.outrogroups
            );
            Ya(n, Ql(r.done)), d.delete(r), d.size === 0 && (n.outrogroups = null);
          }
        } else
          o -= 1;
      },
      !1
    );
  }
  if (o === 0) {
    var a = i.length === 0 && t !== null;
    if (a) {
      var h = (
        /** @type {Element} */
        t
      ), c = (
        /** @type {Element} */
        h.parentNode
      );
      rm(c), c.append(h), n.items.clear();
    }
    Ya(n, e, !a);
  } else
    r = {
      pending: new Set(e),
      done: /* @__PURE__ */ new Set()
    }, (n.outrogroups ?? (n.outrogroups = /* @__PURE__ */ new Set())).add(r);
}
function Ya(n, e, t = !0) {
  var i;
  if (n.pending.size > 0) {
    i = /* @__PURE__ */ new Set();
    for (const o of n.pending.values())
      for (const l of o)
        i.add(
          /** @type {EachItem} */
          n.items.get(l).e
        );
  }
  for (var s = 0; s < e.length; s++) {
    var r = e[s];
    if (i != null && i.has(r)) {
      r.f |= Bi;
      const o = document.createDocumentFragment();
      Nh(r, o);
    } else
      Gt(e[s], t);
  }
}
var Nc;
function Ue(n, e, t, i, s, r = null) {
  var o = n, l = /* @__PURE__ */ new Map(), a = (e & $u) !== 0;
  if (a) {
    var h = (
      /** @type {Element} */
      n
    );
    o = h.appendChild(fn());
  }
  var c = null, f = /* @__PURE__ */ mt(() => {
    var S = t();
    return Sl(S) ? S : S == null ? [] : Ql(S);
  }), d, p = /* @__PURE__ */ new Map(), O = !0;
  function g(S) {
    (x.effect.f & mi) === 0 && (x.pending.delete(S), x.fallback = c, Cm(x, d, o, e, i), c !== null && (d.length === 0 ? (c.f & Bi) === 0 ? Vh(c) : (c.f ^= Bi, vr(c, null, o)) : is(c, () => {
      c = null;
    })));
  }
  function m(S) {
    x.pending.delete(S);
  }
  var v = qh(() => {
    d = /** @type {V[]} */
    u(f);
    for (var S = d.length, _ = /* @__PURE__ */ new Set(), C = (
      /** @type {Batch} */
      Oe
    ), R = td(), X = 0; X < S; X += 1) {
      var H = d[X], D = i(H, X), j = O ? null : l.get(D);
      j ? (j.v && Ns(j.v, H), j.i && Ns(j.i, X), R && C.unskip_effect(j.e)) : (j = Am(
        l,
        O ? o : Nc ?? (Nc = fn()),
        H,
        D,
        X,
        s,
        e,
        t
      ), O || (j.e.f |= Bi), l.set(D, j)), _.add(D);
    }
    if (S === 0 && r && !c && (O ? c = fi(() => r(o)) : (c = fi(() => r(Nc ?? (Nc = fn()))), c.f |= Bi)), S > _.size && xg(), !O)
      if (p.set(C, _), R) {
        for (const [M, Q] of l)
          _.has(M) || C.skip_effect(Q.e);
        C.oncommit(g), C.ondiscard(m);
      } else
        g(C);
    u(f);
  }), x = { effect: v, items: l, pending: p, outrogroups: null, fallback: c };
  O = !1;
}
function hr(n) {
  for (; n !== null && (n.f & Ci) === 0; )
    n = n.next;
  return n;
}
function Cm(n, e, t, i, s) {
  var j, M, Q, T, E, Z, P, N, oe;
  var r = (i & sg) !== 0, o = e.length, l = n.items, a = hr(n.effect.first), h, c = null, f, d = [], p = [], O, g, m, v;
  if (r)
    for (v = 0; v < o; v += 1)
      O = e[v], g = s(O, v), m = /** @type {EachItem} */
      l.get(g).e, (m.f & Bi) === 0 && ((M = (j = m.nodes) == null ? void 0 : j.a) == null || M.measure(), (f ?? (f = /* @__PURE__ */ new Set())).add(m));
  for (v = 0; v < o; v += 1) {
    if (O = e[v], g = s(O, v), m = /** @type {EachItem} */
    l.get(g).e, n.outrogroups !== null)
      for (const q of n.outrogroups)
        q.pending.delete(m), q.done.delete(m);
    if ((m.f & Lt) !== 0 && (Vh(m), r && ((T = (Q = m.nodes) == null ? void 0 : Q.a) == null || T.unfix(), (f ?? (f = /* @__PURE__ */ new Set())).delete(m))), (m.f & Bi) !== 0)
      if (m.f ^= Bi, m === a)
        vr(m, null, t);
      else {
        var x = c ? c.next : a;
        m === n.effect.last && (n.effect.last = m.prev), m.prev && (m.prev.next = m.next), m.next && (m.next.prev = m.prev), yn(n, c, m), yn(n, m, x), vr(m, x, t), c = m, d = [], p = [], a = hr(c.next);
        continue;
      }
    if (m !== a) {
      if (h !== void 0 && h.has(m)) {
        if (d.length < p.length) {
          var S = p[0], _;
          c = S.prev;
          var C = d[0], R = d[d.length - 1];
          for (_ = 0; _ < d.length; _ += 1)
            vr(d[_], S, t);
          for (_ = 0; _ < p.length; _ += 1)
            h.delete(p[_]);
          yn(n, C.prev, R.next), yn(n, c, C), yn(n, R, S), a = S, c = R, v -= 1, d = [], p = [];
        } else
          h.delete(m), vr(m, a, t), yn(n, m.prev, m.next), yn(n, m, c === null ? n.effect.first : c.next), yn(n, c, m), c = m;
        continue;
      }
      for (d = [], p = []; a !== null && a !== m; )
        (h ?? (h = /* @__PURE__ */ new Set())).add(a), p.push(a), a = hr(a.next);
      if (a === null)
        continue;
    }
    (m.f & Bi) === 0 && d.push(m), c = m, a = hr(m.next);
  }
  if (n.outrogroups !== null) {
    for (const q of n.outrogroups)
      q.pending.size === 0 && (Ya(n, Ql(q.done)), (E = n.outrogroups) == null || E.delete(q));
    n.outrogroups.size === 0 && (n.outrogroups = null);
  }
  if (a !== null || h !== void 0) {
    var X = [];
    if (h !== void 0)
      for (m of h)
        (m.f & Lt) === 0 && X.push(m);
    for (; a !== null; )
      (a.f & Lt) === 0 && a !== n.fallback && X.push(a), a = hr(a.next);
    var H = X.length;
    if (H > 0) {
      var D = (i & $u) !== 0 && o === 0 ? t : null;
      if (r) {
        for (v = 0; v < H; v += 1)
          (P = (Z = X[v].nodes) == null ? void 0 : Z.a) == null || P.measure();
        for (v = 0; v < H; v += 1)
          (oe = (N = X[v].nodes) == null ? void 0 : N.a) == null || oe.fix();
      }
      Zm(n, X, D);
    }
  }
  r && An(() => {
    var q, G;
    if (f !== void 0)
      for (m of f)
        (G = (q = m.nodes) == null ? void 0 : q.a) == null || G.apply();
  });
}
function Am(n, e, t, i, s, r, o, l) {
  var a = (o & ig) !== 0 ? (o & rg) === 0 ? /* @__PURE__ */ U(t, !1, !1) : hs(t) : null, h = (o & ng) !== 0 ? hs(s) : null;
  return {
    v: a,
    i: h,
    e: fi(() => (r(e, a ?? t, h ?? s, l), () => {
      n.delete(i);
    }))
  };
}
function vr(n, e, t) {
  if (n.nodes)
    for (var i = n.nodes.start, s = n.nodes.end, r = e && (e.f & Bi) === 0 ? (
      /** @type {EffectNodes} */
      e.nodes.start
    ) : t; i !== null; ) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ to(i)
      );
      if (r.before(i), i === s)
        return;
      i = o;
    }
}
function yn(n, e, t) {
  e === null ? n.effect.first = t : e.next = t, t === null ? n.effect.last = e : t.prev = e;
}
function Rm(n, e, t) {
  _l(() => {
    var i = b(() => e(n, t == null ? void 0 : t()) || {});
    if (t && (i != null && i.update)) {
      var s = !1, r = (
        /** @type {any} */
        {}
      );
      gs(() => {
        var o = t();
        Ee(o), s && Lh(r, o) && (r = o, i.update(o));
      }), s = !0;
    }
    if (i != null && i.destroy)
      return () => (
        /** @type {Function} */
        i.destroy()
      );
  });
}
const Gc = [...` 	
\r\f \v\uFEFF`];
function Mm(n, e, t) {
  var i = n == null ? "" : "" + n;
  if (e && (i = i ? i + " " + e : e), t) {
    for (var s of Object.keys(t))
      if (t[s])
        i = i ? i + " " + s : s;
      else if (i.length)
        for (var r = s.length, o = 0; (o = i.indexOf(s, o)) >= 0; ) {
          var l = o + r;
          (o === 0 || Gc.includes(i[o - 1])) && (l === i.length || Gc.includes(i[l])) ? i = (o === 0 ? "" : i.substring(0, o)) + i.substring(l + 1) : o = l;
        }
  }
  return i === "" ? null : i;
}
function Xm(n, e) {
  return n == null ? null : String(n);
}
function bi(n, e, t, i, s, r) {
  var o = (
    /** @type {any} */
    n[Ta]
  );
  if (o !== t || o === void 0) {
    var l = Mm(t, i, r);
    l == null ? n.removeAttribute("class") : n.className = l, n[Ta] = t;
  } else if (r && s !== r)
    for (var a in r) {
      var h = !!r[a];
      (s == null || h !== !!s[a]) && n.classList.toggle(a, h);
    }
  return r;
}
function vd(n, e, t, i) {
  var s = (
    /** @type {any} */
    n[Za]
  );
  if (s !== e) {
    var r = Xm(e);
    r == null ? n.removeAttribute("style") : n.style.cssText = r, n[Za] = e;
  }
  return i;
}
function Gh(n, e, t = !1) {
  if (n.multiple) {
    if (e == null)
      return;
    if (!Sl(e))
      return Rg();
    for (var i of n.options)
      i.selected = e.includes(Pr(i));
    return;
  }
  for (i of n.options) {
    var s = Pr(i);
    if (nm(s, e)) {
      i.selected = !0;
      return;
    }
  }
  (!t || e !== void 0) && (n.selectedIndex = -1);
}
function bd(n) {
  var e = new MutationObserver(() => {
    Gh(n, n.__value);
  });
  e.observe(n, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), Pl(() => {
    e.disconnect();
  });
}
function qa(n, e, t = e) {
  var i = /* @__PURE__ */ new WeakSet(), s = !0;
  Wh(n, "change", (r) => {
    var o = r ? "[selected]" : ":checked", l;
    if (n.multiple)
      l = [].map.call(n.querySelectorAll(o), Pr);
    else {
      var a = n.querySelector(o) ?? // will fall back to first non-disabled option if no option is selected
      n.querySelector("option:not([disabled])");
      l = a && Pr(a);
    }
    t(l), n.__value = l, Oe !== null && i.add(Oe);
  }), _l(() => {
    var r = e();
    if (n === document.activeElement) {
      var o = (
        /** @type {Batch} */
        Oe
      );
      if (i.has(o))
        return;
    }
    if (Gh(n, r, s), s && r === void 0) {
      var l = n.querySelector(":checked");
      l !== null && (r = Pr(l), t(r));
    }
    n.__value = r, s = !1;
  }), bd(n);
}
function Pr(n) {
  return "__value" in n ? n.__value : n.value;
}
const Em = Symbol("is custom element"), Lm = Symbol("is html"), jm = yg ? "progress" : "PROGRESS";
function br(n, e) {
  var t = Uh(n);
  t.value === (t.value = // treat null and undefined the same for the initial value
  e ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  n.value === e && (e !== 0 || n.nodeName !== jm) || (n.value = e ?? "");
}
function zm(n, e) {
  var t = Uh(n);
  t.checked !== (t.checked = // treat null and undefined the same for the initial value
  e ?? void 0) && (n.checked = e);
}
function Fe(n, e, t, i) {
  var s = Uh(n);
  s[e] !== (s[e] = t) && (e === "loading" && (n[bg] = t), t == null ? n.removeAttribute(e) : typeof t != "string" && Dm(n).includes(e) ? n[e] = t : n.setAttribute(e, t));
}
function Uh(n) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    n[Mo] ?? (n[Mo] = {
      [Em]: n.nodeName.includes("-"),
      [Lm]: n.namespaceURI === _u
    })
  );
}
var Uc = /* @__PURE__ */ new Map();
function Dm(n) {
  var e = n.getAttribute("is") || n.nodeName, t = Uc.get(e);
  if (t) return t;
  Uc.set(e, t = []);
  for (var i, s = n, r = Element.prototype; r !== s; ) {
    i = Cu(s);
    for (var o in i)
      i[o].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      o !== "innerHTML" && o !== "textContent" && o !== "innerText" && t.push(o);
    s = Xh(s);
  }
  return t;
}
function Bt(n, e, t = e) {
  var i = /* @__PURE__ */ new WeakSet();
  Wh(n, "input", async (s) => {
    var r = s ? n.defaultValue : n.value;
    if (r = Fl(n) ? Hl(r) : r, t(r), Oe !== null && i.add(Oe), await gm(), r !== (r = e())) {
      var o = n.selectionStart, l = n.selectionEnd, a = n.value.length;
      if (n.value = r ?? "", l !== null) {
        var h = n.value.length;
        o === l && l === a && h > a ? (n.selectionStart = h, n.selectionEnd = h) : (n.selectionStart = o, n.selectionEnd = Math.min(l, h));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  b(e) == null && n.value && (t(Fl(n) ? Hl(n.value) : n.value), Oe !== null && i.add(Oe)), gs(() => {
    var s = e();
    if (n === document.activeElement) {
      var r = (
        /** @type {Batch} */
        Oe
      );
      if (i.has(r))
        return;
    }
    Fl(n) && s === Hl(n.value) || n.type === "date" && !s && !n.value || s !== n.value && (n.value = s ?? "");
  });
}
function yd(n, e, t = e) {
  Wh(n, "change", (i) => {
    var s = i ? n.defaultChecked : n.checked;
    t(s);
  }), // If we are hydrating and the value has since changed,
  // then use the update value from the input instead.
  // If defaultChecked is set, then checked == defaultChecked
  b(e) == null && t(n.checked), gs(() => {
    var i = e();
    n.checked = !!i;
  });
}
function Fl(n) {
  var e = n.type;
  return e === "number" || e === "range";
}
function Hl(n) {
  return n === "" ? null : +n;
}
function Kl(n, e) {
  return n === e || (n == null ? void 0 : n[cn]) === e;
}
function Fh(n = {}, e, t, i) {
  var s = (
    /** @type {ComponentContext} */
    Ne.r
  ), r = (
    /** @type {Effect} */
    Pe
  );
  return _l(() => {
    var o, l;
    return gs(() => {
      o = l, l = [], b(() => {
        Kl(t(...l), n) || (e(n, ...l), o && Kl(t(...o), n) && e(null, ...o));
      });
    }), () => {
      let a = r;
      for (; a !== s && a.parent !== null && a.parent.f & _a; )
        a = a.parent;
      const h = () => {
        l && Kl(t(...l), n) && e(null, ...l);
      }, c = a.teardown;
      a.teardown = () => {
        h(), c == null || c();
      };
    };
  }), n;
}
function Ba(n) {
  return function(...e) {
    var t = (
      /** @type {Event} */
      e[0]
    );
    t.target === this && (n == null || n.apply(this, e));
  };
}
function Jl(n) {
  return function(...e) {
    var t = (
      /** @type {Event} */
      e[0]
    );
    return t.stopPropagation(), n == null ? void 0 : n.apply(this, e);
  };
}
function Tt(n = !1) {
  const e = (
    /** @type {ComponentContextLegacy} */
    Ne
  ), t = e.l.u;
  if (!t) return;
  let i = () => Ee(e.s);
  if (n) {
    let s = 0, r = (
      /** @type {Record<string, any>} */
      {}
    );
    const o = /* @__PURE__ */ Bs(() => {
      let l = !1;
      const a = e.s;
      for (const h in a)
        a[h] !== r[h] && (r[h] = a[h], l = !0);
      return l && s++, s;
    });
    i = () => u(o);
  }
  t.b.length && hm(() => {
    Fc(e, i), $a(t.b);
  }), Da(() => {
    const s = b(() => t.m.map(Og));
    return () => {
      for (const r of s)
        typeof r == "function" && r();
    };
  }), t.a.length && Da(() => {
    Fc(e, i), $a(t.a);
  });
}
function Fc(n, e) {
  if (n.l.s)
    for (const t of n.l.s) u(t);
  e();
}
function ft(n, e, t, i) {
  var _;
  var s = !nr || (t & lg) !== 0, r = (t & hg) !== 0, o = (t & cg) !== 0, l = (
    /** @type {V} */
    i
  ), a = !0, h = (
    /** @type {Derived<V> | undefined} */
    void 0
  ), c = () => o && s ? (h ?? (h = /* @__PURE__ */ Bs(
    /** @type {() => V} */
    i
  )), u(h)) : (a && (a = !1, l = o ? b(
    /** @type {() => V} */
    i
  ) : (
    /** @type {V} */
    i
  )), l);
  let f;
  if (r) {
    var d = cn in n || vg in n;
    f = ((_ = _s(n, e)) == null ? void 0 : _.set) ?? (d && e in n ? (C) => n[e] = C : void 0);
  }
  var p, O = !1;
  r ? [p, O] = zg(() => (
    /** @type {V} */
    n[e]
  )) : p = /** @type {V} */
  n[e], p === void 0 && i !== void 0 && (p = c(), f && (s && Pg(), f(p)));
  var g;
  if (s ? g = () => {
    var C = (
      /** @type {V} */
      n[e]
    );
    return C === void 0 ? c() : (a = !0, C);
  } : g = () => {
    var C = (
      /** @type {V} */
      n[e]
    );
    return C !== void 0 && (l = /** @type {V} */
    void 0), C === void 0 ? l : C;
  }, s && (t & ag) === 0)
    return g;
  if (f) {
    var m = n.$$legacy;
    return (
      /** @type {() => V} */
      (function(C, R) {
        return arguments.length > 0 ? ((!s || !R || m || O) && f(R ? g() : C), C) : g();
      })
    );
  }
  var v = !1, x = ((t & og) !== 0 ? Bs : mt)(() => (v = !1, g()));
  r && u(x);
  var S = (
    /** @type {Effect} */
    Pe
  );
  return (
    /** @type {() => V} */
    (function(C, R) {
      if (arguments.length > 0) {
        const X = R ? u(x) : s && r ? ks(C) : C;
        return k(x, X), v = !0, l !== void 0 && (l = X), C;
      }
      return dn && v || (S.f & mi) !== 0 ? x.v : u(x);
    })
  );
}
const Et = Os({ nodes: {}, edges: [], toolEdges: [] }), Mn = Os(null), Io = Os(null), ws = Os({
  triggerType: "rest",
  description: "",
  cronExpression: "",
  webhookUrl: ""
});
function Im(n) {
  Et.update((e) => ({ ...e, edges: [...e.edges, n] }));
}
var Wm = /* @__PURE__ */ io('<line stroke-width="2" marker-end="url(#arrow)"></line>'), Ym = /* @__PURE__ */ io('<line stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.8"></line>'), qm = /* @__PURE__ */ io('<circle cx="148" cy="8" r="8" fill="#f59e0b"></circle><text x="148" y="12" fill="#000" font-size="8" font-family="monospace" text-anchor="middle"> </text>', 1), Bm = /* @__PURE__ */ io('<g style="cursor:pointer" role="button" tabindex="0"><rect width="160" height="40" rx="6"></rect><text x="12" y="14" fill="#94a3b8" font-size="9" font-family="monospace"> </text><text x="12" y="29" fill="#e2e8f0" font-size="12" font-family="system-ui"> </text><!><circle cx="160" cy="20" r="5" class="port port-out"></circle><circle cx="0" cy="20" r="5" class="port port-in"></circle></g>'), Vm = /* @__PURE__ */ io('<line stroke="#7c6af7" stroke-width="1.5" stroke-dasharray="6,3" pointer-events="none"></line>'), Nm = /* @__PURE__ */ L('<input class="picker-input svelte-1lehbkp" type="text" placeholder="JSONata expression"/> <button class="picker-btn picker-add svelte-1lehbkp">Add</button>', 1), Gm = /* @__PURE__ */ L('<div class="edge-picker svelte-1lehbkp"><button class="picker-btn svelte-1lehbkp">Unconditional</button> <button class="picker-btn svelte-1lehbkp">Fallback</button> <button class="picker-btn svelte-1lehbkp">Conditional</button> <!> <button class="picker-btn picker-cancel svelte-1lehbkp">Cancel</button></div>'), Um = /* @__PURE__ */ L('<div class="empty-hint svelte-1lehbkp">Drag nodes from the palette to build your agent graph</div>'), Fm = /* @__PURE__ */ L('<div class="canvas-wrap svelte-1lehbkp" role="presentation"><svg style="width:100%;height:100%"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#7c6af7"></path></marker></defs><!><!><!><!></svg> <!> <!></div>');
function Hm(n, e) {
  kt(e, !1);
  const t = () => St(Et, "$graph", s), i = () => St(Mn, "$selectedNode", s), [s, r] = gn(), o = /* @__PURE__ */ U();
  ft(e, "agentId", 8);
  const l = /* @__PURE__ */ new Set(["core:tool", "core:mcp-client"]), a = /* @__PURE__ */ new Set(["core:tool-call", "core:react"]);
  let h = /* @__PURE__ */ U([]), c = /* @__PURE__ */ U([]), f = /* @__PURE__ */ U([]), d = null, p = { x: 0, y: 0 }, O = /* @__PURE__ */ U(), g = /* @__PURE__ */ U({ x: 0, y: 0, w: 1e3, h: 600 }), m = !1, v = { mx: 0, my: 0, vbx: 0, vby: 0 }, x = /* @__PURE__ */ U(null), S = /* @__PURE__ */ U({ x: 0, y: 0 }), _ = /* @__PURE__ */ U(null), C = /* @__PURE__ */ U({ x: 0, y: 0 }), R = /* @__PURE__ */ U(""), X = /* @__PURE__ */ U(!1);
  function H(Y) {
    Mn.set(Y);
  }
  function D(Y) {
    const I = t().nodes[Y];
    return (I == null ? void 0 : I.position) ?? { x: 100, y: 100 };
  }
  function j(Y, I) {
    const ne = u(O).createSVGPoint();
    ne.x = Y, ne.y = I;
    const de = ne.matrixTransform(u(O).getScreenCTM().inverse());
    return { x: de.x, y: de.y };
  }
  function M(Y, I) {
    return Y.addEventListener("wheel", I, { passive: !1 }), {
      destroy() {
        Y.removeEventListener("wheel", I);
      }
    };
  }
  function Q(Y) {
    Y.preventDefault();
    const I = Y.deltaY > 0 ? 1.1 : 0.9, ne = u(O).getBoundingClientRect(), de = (Y.clientX - ne.left) / ne.width * u(g).w + u(g).x, Qe = (Y.clientY - ne.top) / ne.height * u(g).h + u(g).y;
    k(g, {
      x: de - (de - u(g).x) * I,
      y: Qe - (Qe - u(g).y) * I,
      w: u(g).w * I,
      h: u(g).h * I
    });
  }
  function T(Y) {
    const I = Y.target;
    I.closest("g") || I.tagName === "circle" || (m = !0, v = {
      mx: Y.clientX,
      my: Y.clientY,
      vbx: u(g).x,
      vby: u(g).y
    });
  }
  function E(Y, I) {
    const ne = j(Y.clientX, Y.clientY), de = I.position ?? { x: 100, y: 100 };
    d = I, p = { x: ne.x - de.x, y: ne.y - de.y };
  }
  function Z(Y, I) {
    const ne = j(Y.clientX, Y.clientY);
    k(x, { fromNodeId: I, x: ne.x, y: ne.y }), k(S, ne);
  }
  function P(Y) {
    if (u(x) && u(x).fromNodeId !== Y) {
      const I = u(O).getBoundingClientRect();
      k(C, {
        x: (u(S).x - u(g).x) / u(g).w * I.width,
        y: (u(S).y - u(g).y) / u(g).h * I.height
      }), k(_, { from: u(x).fromNodeId, to: Y });
    }
    k(x, null);
  }
  function N(Y) {
    if (m) {
      const I = u(g).w / u(O).clientWidth, ne = u(g).h / u(O).clientHeight;
      k(g, {
        ...u(g),
        x: v.vbx - (Y.clientX - v.mx) * I,
        y: v.vby - (Y.clientY - v.my) * ne
      });
    }
    if (d) {
      const I = j(Y.clientX, Y.clientY), ne = d.id;
      Et.update((de) => ({
        ...de,
        nodes: {
          ...de.nodes,
          [ne]: {
            ...de.nodes[ne],
            position: { x: I.x - p.x, y: I.y - p.y }
          }
        }
      }));
    }
    u(x) && k(S, j(Y.clientX, Y.clientY));
  }
  function oe() {
    m = !1, d = null, k(x, null);
  }
  function q(Y, I) {
    if (!u(_)) return;
    const ne = {
      id: `e-${Date.now()}`,
      from: u(_).from,
      to: u(_).to,
      type: Y,
      ...I ? { condition: I } : {}
    };
    Im(ne), k(_, null), k(X, !1), k(R, "");
  }
  lt(() => t(), () => {
    k(h, Object.values(t().nodes)), k(c, t().edges), k(f, t().toolEdges ?? []);
  }), lt(() => u(f), () => {
    k(o, u(f).reduce(
      (Y, I) => (Y[I.to] = (Y[I.to] ?? 0) + 1, Y),
      {}
    ));
  }), en(), Tt();
  var G = Fm(), z = y(G), K = w(y(z));
  Ue(K, 1, () => u(c), Ge, (Y, I) => {
    const ne = /* @__PURE__ */ mt(() => (u(I), b(() => D(u(I).from)))), de = /* @__PURE__ */ mt(() => (u(I), b(() => D(u(I).to))));
    var Qe = Wm();
    F(() => {
      Fe(Qe, "x1", (Ee(u(ne)), b(() => u(ne).x + 160))), Fe(Qe, "y1", (Ee(u(ne)), b(() => u(ne).y + 20))), Fe(Qe, "x2", (Ee(u(de)), b(() => u(de).x))), Fe(Qe, "y2", (Ee(u(de)), b(() => u(de).y + 20))), Fe(Qe, "stroke", (u(I), b(() => u(I).type === "fallback" ? "#94a3b8" : "#7c6af7"))), Fe(Qe, "stroke-dasharray", (u(I), b(() => u(I).type === "fallback" ? "4" : "0")));
    }), A(Y, Qe);
  });
  var le = w(K);
  Ue(le, 1, () => u(f), Ge, (Y, I) => {
    const ne = /* @__PURE__ */ mt(() => (u(I), b(() => D(u(I).from)))), de = /* @__PURE__ */ mt(() => (u(I), b(() => D(u(I).to))));
    var Qe = Ym();
    F(() => {
      Fe(Qe, "x1", (Ee(u(ne)), b(() => u(ne).x + 160))), Fe(Qe, "y1", (Ee(u(ne)), b(() => u(ne).y + 20))), Fe(Qe, "x2", (Ee(u(de)), b(() => u(de).x))), Fe(Qe, "y2", (Ee(u(de)), b(() => u(de).y + 20)));
    }), A(Y, Qe);
  });
  var ae = w(le);
  Ue(ae, 1, () => u(h), Ge, (Y, I) => {
    const ne = /* @__PURE__ */ mt(() => (u(I), b(() => u(I).position ?? { x: 100, y: 100 }))), de = /* @__PURE__ */ mt(() => (u(I), b(() => l.has(u(I).type)))), Qe = /* @__PURE__ */ mt(() => (u(I), b(() => a.has(u(I).type)))), tt = /* @__PURE__ */ mt(() => (i(), u(I), b(() => {
      var he;
      return ((he = i()) == null ? void 0 : he.id) === u(I).id;
    }))), He = /* @__PURE__ */ mt(() => (u(o), u(I), b(() => u(o)[u(I).id] ?? 0)));
    var ke = Bm(), $e = y(ke), re = w($e), pe = y(re), we = w(re), Ye = y(we), Ot = w(we);
    {
      var gt = (he) => {
        var be = qm(), je = w(Ve(be)), it = y(je);
        F(() => V(it, u(He))), A(he, be);
      };
      ee(Ot, (he) => {
        u(Qe) && u(He) > 0 && he(gt);
      });
    }
    var ht = w(Ot), J = w(ht);
    F(() => {
      Fe(ke, "transform", `translate(${Ee(u(ne)), b(() => u(ne).x) ?? ""},${Ee(u(ne)), b(() => u(ne).y) ?? ""})`), Fe($e, "fill", u(tt) ? u(de) ? "#2d1f00" : "#312e7a" : u(de) ? "#1e1600" : "#1e2035"), Fe($e, "stroke", u(tt) ? u(de) ? "#f59e0b" : "#7c6af7" : u(de) ? "#b45309" : "#2d3148"), Fe($e, "stroke-width", u(de) ? "2" : "1.5"), V(pe, (u(I), b(() => u(I).type))), V(Ye, (u(I), b(() => u(I).label ?? u(I).id)));
    }), ie("mousedown", ht, Jl((he) => Z(he, u(I).id))), ie("mouseup", J, Jl(() => P(u(I).id))), ie("click", ke, () => H(u(I))), ie("keydown", ke, (he) => he.key === "Enter" && H(u(I))), ie("mousedown", ke, Jl((he) => E(he, u(I)))), A(Y, ke);
  });
  var ve = w(ae);
  {
    var fe = (Y) => {
      var I = Vm();
      F(() => {
        Fe(I, "x1", (u(x), b(() => u(x).x))), Fe(I, "y1", (u(x), b(() => u(x).y))), Fe(I, "x2", (u(S), b(() => u(S).x))), Fe(I, "y2", (u(S), b(() => u(S).y)));
      }), A(Y, I);
    };
    ee(ve, (Y) => {
      u(x) && Y(fe);
    });
  }
  Fh(z, (Y) => k(O, Y), () => u(O)), Rm(z, (Y, I) => M == null ? void 0 : M(Y, I), () => Q), _l(() => ie("mousedown", z, T));
  var ce = w(z, 2);
  {
    var ue = (Y) => {
      var I = Gm(), ne = y(I), de = w(ne, 2), Qe = w(de, 2), tt = w(Qe, 2);
      {
        var He = ($e) => {
          var re = Nm(), pe = Ve(re), we = w(pe, 2);
          Bt(pe, () => u(R), (Ye) => k(R, Ye)), ie("click", we, () => q("conditional", u(R))), A($e, re);
        };
        ee(tt, ($e) => {
          u(X) && $e(He);
        });
      }
      var ke = w(tt, 2);
      F(() => vd(I, `left:${u(C), b(() => u(C).x) ?? ""}px;top:${u(C), b(() => u(C).y) ?? ""}px`)), ie("click", ne, () => q("unconditional")), ie("click", de, () => q("fallback")), ie("click", Qe, () => {
        k(X, !u(X));
      }), ie("click", ke, () => {
        k(_, null), k(X, !1);
      }), A(Y, I);
    };
    ee(ce, (Y) => {
      u(_) && Y(ue);
    });
  }
  var ye = w(ce, 2);
  {
    var Ze = (Y) => {
      var I = Um();
      A(Y, I);
    };
    ee(ye, (Y) => {
      u(h), b(() => u(h).length === 0) && Y(Ze);
    });
  }
  F(() => Fe(z, "viewBox", `${u(g), b(() => u(g).x) ?? ""} ${u(g), b(() => u(g).y) ?? ""} ${u(g), b(() => u(g).w) ?? ""} ${u(g), b(() => u(g).h) ?? ""}`)), ie("mousemove", G, N), ie("mouseup", G, oe), ie("mouseleave", G, oe), A(n, G), $t(), r();
}
const _r = Os([]);
var Km = /* @__PURE__ */ L('<button class="palette-item svelte-142uvrg"><span class="node-name svelte-142uvrg"> </span> <span class="node-type svelte-142uvrg"> </span></button>'), Jm = /* @__PURE__ */ L('<a class="marketplace-link svelte-142uvrg">Browse Marketplace →</a>'), ev = /* @__PURE__ */ L('<div class="category-header svelte-142uvrg"> </div> <!> <!>', 1), tv = /* @__PURE__ */ L('<div class="palette svelte-142uvrg"><div class="palette-header svelte-142uvrg">Nodes</div> <!></div>');
function iv(n, e) {
  kt(e, !1);
  const t = () => St(_r, "$nodeTypes", i), [i, s] = gn(), r = /* @__PURE__ */ U(), o = 3e4;
  let l = null, a = "", h = /* @__PURE__ */ U(!1);
  const c = {
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
  function f(m) {
    const v = /* @__PURE__ */ new Map();
    for (const x of m) {
      const S = x.meta.category ?? "other";
      v.has(S) || v.set(S, []), v.get(S).push(x);
    }
    return Array.from(v.entries()).map(([x, S]) => ({
      category: x,
      label: c[x] ?? x,
      items: S
    }));
  }
  async function d() {
    try {
      const m = await fetch("/api/nodes");
      if (!m.ok) return;
      const v = await m.json(), x = v.map((S) => S.type).sort().join(",");
      x !== a && (a = x, _r.set(v));
    } catch {
      t().length === 0 && _r.set([
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
  ms(async () => {
    await d(), l = setInterval(d, o);
    try {
      const m = await fetch("/api/system/config");
      if (m.ok) {
        const v = await m.json();
        k(h, v.marketplaceEnabled === !0);
      }
    } catch {
    }
  }), gd(() => {
    l && clearInterval(l);
  });
  function p(m, v) {
    const x = `${m.replace(/:/g, "_")}_${Date.now()}`;
    Et.update((S) => ({
      ...S,
      nodes: {
        ...S.nodes,
        [x]: {
          id: x,
          type: m,
          label: v,
          config: {},
          position: { x: 200, y: 200 }
        }
      }
    }));
  }
  lt(() => t(), () => {
    k(r, f(t()));
  }), en(), Tt();
  var O = tv(), g = w(y(O), 2);
  Ue(g, 1, () => u(r), Ge, (m, v) => {
    var x = ev(), S = Ve(x), _ = y(S), C = w(S, 2);
    Ue(C, 1, () => (u(v), b(() => u(v).items)), Ge, (H, D) => {
      var j = Km(), M = y(j), Q = y(M), T = w(M, 2), E = y(T);
      F(() => {
        V(Q, (u(D), b(() => u(D).meta.name))), V(E, (u(D), b(() => u(D).type)));
      }), ie("click", j, () => p(u(D).type, u(D).meta.name)), A(H, j);
    });
    var R = w(C, 2);
    {
      var X = (H) => {
        var D = Jm();
        F(() => Fe(D, "href", `/admin/marketplace?category=${u(v), b(() => u(v).category) ?? ""}`)), A(H, D);
      };
      ee(R, (H) => {
        u(h) && H(X);
      });
    }
    F(() => V(_, (u(v), b(() => u(v).label)))), A(m, x);
  }), A(n, O), $t(), s();
}
let Va = [], wd = [];
(() => {
  let n = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((e) => e ? parseInt(e, 36) : 1);
  for (let e = 0, t = 0; e < n.length; e++)
    (e % 2 ? wd : Va).push(t = t + n[e]);
})();
function nv(n) {
  if (n < 768) return !1;
  for (let e = 0, t = Va.length; ; ) {
    let i = e + t >> 1;
    if (n < Va[i]) t = i;
    else if (n >= wd[i]) e = i + 1;
    else return !0;
    if (e == t) return !1;
  }
}
function Hc(n) {
  return n >= 127462 && n <= 127487;
}
const Kc = 8205;
function sv(n, e, t = !0, i = !0) {
  return (t ? xd : rv)(n, e, i);
}
function xd(n, e, t) {
  if (e == n.length) return e;
  e && Sd(n.charCodeAt(e)) && Qd(n.charCodeAt(e - 1)) && e--;
  let i = ea(n, e);
  for (e += Jc(i); e < n.length; ) {
    let s = ea(n, e);
    if (i == Kc || s == Kc || t && nv(s))
      e += Jc(s), i = s;
    else if (Hc(s)) {
      let r = 0, o = e - 2;
      for (; o >= 0 && Hc(ea(n, o)); )
        r++, o -= 2;
      if (r % 2 == 0) break;
      e += 2;
    } else
      break;
  }
  return e;
}
function rv(n, e, t) {
  for (; e > 1; ) {
    let i = xd(n, e - 2, t);
    if (i < e) return i;
    e--;
  }
  return 0;
}
function ea(n, e) {
  let t = n.charCodeAt(e);
  if (!Qd(t) || e + 1 == n.length) return t;
  let i = n.charCodeAt(e + 1);
  return Sd(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t;
}
function Sd(n) {
  return n >= 56320 && n < 57344;
}
function Qd(n) {
  return n >= 55296 && n < 56320;
}
function Jc(n) {
  return n < 65536 ? 1 : 2;
}
let Re = class kd {
  /**
  Get the line description around the given position.
  */
  lineAt(e) {
    if (e < 0 || e > this.length)
      throw new RangeError(`Invalid position ${e} in document of length ${this.length}`);
    return this.lineInner(e, !1, 1, 0);
  }
  /**
  Get the description for the given (1-based) line number.
  */
  line(e) {
    if (e < 1 || e > this.lines)
      throw new RangeError(`Invalid line number ${e} in ${this.lines}-line document`);
    return this.lineInner(e, !0, 1, 0);
  }
  /**
  Replace a range of the text with the given content.
  */
  replace(e, t, i) {
    [e, t] = Us(this, e, t);
    let s = [];
    return this.decompose(
      0,
      e,
      s,
      2
      /* Open.To */
    ), i.length && i.decompose(
      0,
      i.length,
      s,
      3
      /* Open.To */
    ), this.decompose(
      t,
      this.length,
      s,
      1
      /* Open.From */
    ), Yi.from(s, this.length - (t - e) + i.length);
  }
  /**
  Append another document to this one.
  */
  append(e) {
    return this.replace(this.length, this.length, e);
  }
  /**
  Retrieve the text between the given points.
  */
  slice(e, t = this.length) {
    [e, t] = Us(this, e, t);
    let i = [];
    return this.decompose(e, t, i, 0), Yi.from(i, t - e);
  }
  /**
  Test whether this text is equal to another instance.
  */
  eq(e) {
    if (e == this)
      return !0;
    if (e.length != this.length || e.lines != this.lines)
      return !1;
    let t = this.scanIdentical(e, 1), i = this.length - this.scanIdentical(e, -1), s = new Tr(this), r = new Tr(e);
    for (let o = t, l = t; ; ) {
      if (s.next(o), r.next(o), o = 0, s.lineBreak != r.lineBreak || s.done != r.done || s.value != r.value)
        return !1;
      if (l += s.value.length, s.done || l >= i)
        return !0;
    }
  }
  /**
  Iterate over the text. When `dir` is `-1`, iteration happens
  from end to start. This will return lines and the breaks between
  them as separate strings.
  */
  iter(e = 1) {
    return new Tr(this, e);
  }
  /**
  Iterate over a range of the text. When `from` > `to`, the
  iterator will run in reverse.
  */
  iterRange(e, t = this.length) {
    return new $d(this, e, t);
  }
  /**
  Return a cursor that iterates over the given range of lines,
  _without_ returning the line breaks between, and yielding empty
  strings for empty lines.
  
  When `from` and `to` are given, they should be 1-based line numbers.
  */
  iterLines(e, t) {
    let i;
    if (e == null)
      i = this.iter();
    else {
      t == null && (t = this.lines + 1);
      let s = this.line(e).from;
      i = this.iterRange(s, Math.max(s, t == this.lines + 1 ? this.length : t <= 1 ? 0 : this.line(t - 1).to));
    }
    return new Pd(i);
  }
  /**
  Return the document as a string, using newline characters to
  separate lines.
  */
  toString() {
    return this.sliceString(0);
  }
  /**
  Convert the document to an array of lines (which can be
  deserialized again via [`Text.of`](https://codemirror.net/6/docs/ref/#state.Text^of)).
  */
  toJSON() {
    let e = [];
    return this.flatten(e), e;
  }
  /**
  @internal
  */
  constructor() {
  }
  /**
  Create a `Text` instance for the given array of lines.
  */
  static of(e) {
    if (e.length == 0)
      throw new RangeError("A document must have at least one line");
    return e.length == 1 && !e[0] ? kd.empty : e.length <= 32 ? new ot(e) : Yi.from(ot.split(e, []));
  }
};
class ot extends Re {
  constructor(e, t = ov(e)) {
    super(), this.text = e, this.length = t;
  }
  get lines() {
    return this.text.length;
  }
  get children() {
    return null;
  }
  lineInner(e, t, i, s) {
    for (let r = 0; ; r++) {
      let o = this.text[r], l = s + o.length;
      if ((t ? i : l) >= e)
        return new lv(s, l, i, o);
      s = l + 1, i++;
    }
  }
  decompose(e, t, i, s) {
    let r = e <= 0 && t >= this.length ? this : new ot(ef(this.text, e, t), Math.min(t, this.length) - Math.max(0, e));
    if (s & 1) {
      let o = i.pop(), l = Wo(r.text, o.text.slice(), 0, r.length);
      if (l.length <= 32)
        i.push(new ot(l, o.length + r.length));
      else {
        let a = l.length >> 1;
        i.push(new ot(l.slice(0, a)), new ot(l.slice(a)));
      }
    } else
      i.push(r);
  }
  replace(e, t, i) {
    if (!(i instanceof ot))
      return super.replace(e, t, i);
    [e, t] = Us(this, e, t);
    let s = Wo(this.text, Wo(i.text, ef(this.text, 0, e)), t), r = this.length + i.length - (t - e);
    return s.length <= 32 ? new ot(s, r) : Yi.from(ot.split(s, []), r);
  }
  sliceString(e, t = this.length, i = `
`) {
    [e, t] = Us(this, e, t);
    let s = "";
    for (let r = 0, o = 0; r <= t && o < this.text.length; o++) {
      let l = this.text[o], a = r + l.length;
      r > e && o && (s += i), e < a && t > r && (s += l.slice(Math.max(0, e - r), t - r)), r = a + 1;
    }
    return s;
  }
  flatten(e) {
    for (let t of this.text)
      e.push(t);
  }
  scanIdentical() {
    return 0;
  }
  static split(e, t) {
    let i = [], s = -1;
    for (let r of e)
      i.push(r), s += r.length + 1, i.length == 32 && (t.push(new ot(i, s)), i = [], s = -1);
    return s > -1 && t.push(new ot(i, s)), t;
  }
}
class Yi extends Re {
  constructor(e, t) {
    super(), this.children = e, this.length = t, this.lines = 0;
    for (let i of e)
      this.lines += i.lines;
  }
  lineInner(e, t, i, s) {
    for (let r = 0; ; r++) {
      let o = this.children[r], l = s + o.length, a = i + o.lines - 1;
      if ((t ? a : l) >= e)
        return o.lineInner(e, t, i, s);
      s = l + 1, i = a + 1;
    }
  }
  decompose(e, t, i, s) {
    for (let r = 0, o = 0; o <= t && r < this.children.length; r++) {
      let l = this.children[r], a = o + l.length;
      if (e <= a && t >= o) {
        let h = s & ((o <= e ? 1 : 0) | (a >= t ? 2 : 0));
        o >= e && a <= t && !h ? i.push(l) : l.decompose(e - o, t - o, i, h);
      }
      o = a + 1;
    }
  }
  replace(e, t, i) {
    if ([e, t] = Us(this, e, t), i.lines < this.lines)
      for (let s = 0, r = 0; s < this.children.length; s++) {
        let o = this.children[s], l = r + o.length;
        if (e >= r && t <= l) {
          let a = o.replace(e - r, t - r, i), h = this.lines - o.lines + a.lines;
          if (a.lines < h >> 4 && a.lines > h >> 6) {
            let c = this.children.slice();
            return c[s] = a, new Yi(c, this.length - (t - e) + i.length);
          }
          return super.replace(r, l, a);
        }
        r = l + 1;
      }
    return super.replace(e, t, i);
  }
  sliceString(e, t = this.length, i = `
`) {
    [e, t] = Us(this, e, t);
    let s = "";
    for (let r = 0, o = 0; r < this.children.length && o <= t; r++) {
      let l = this.children[r], a = o + l.length;
      o > e && r && (s += i), e < a && t > o && (s += l.sliceString(e - o, t - o, i)), o = a + 1;
    }
    return s;
  }
  flatten(e) {
    for (let t of this.children)
      t.flatten(e);
  }
  scanIdentical(e, t) {
    if (!(e instanceof Yi))
      return 0;
    let i = 0, [s, r, o, l] = t > 0 ? [0, 0, this.children.length, e.children.length] : [this.children.length - 1, e.children.length - 1, -1, -1];
    for (; ; s += t, r += t) {
      if (s == o || r == l)
        return i;
      let a = this.children[s], h = e.children[r];
      if (a != h)
        return i + a.scanIdentical(h, t);
      i += a.length + 1;
    }
  }
  static from(e, t = e.reduce((i, s) => i + s.length + 1, -1)) {
    let i = 0;
    for (let p of e)
      i += p.lines;
    if (i < 32) {
      let p = [];
      for (let O of e)
        O.flatten(p);
      return new ot(p, t);
    }
    let s = Math.max(
      32,
      i >> 5
      /* Tree.BranchShift */
    ), r = s << 1, o = s >> 1, l = [], a = 0, h = -1, c = [];
    function f(p) {
      let O;
      if (p.lines > r && p instanceof Yi)
        for (let g of p.children)
          f(g);
      else p.lines > o && (a > o || !a) ? (d(), l.push(p)) : p instanceof ot && a && (O = c[c.length - 1]) instanceof ot && p.lines + O.lines <= 32 ? (a += p.lines, h += p.length + 1, c[c.length - 1] = new ot(O.text.concat(p.text), O.length + 1 + p.length)) : (a + p.lines > s && d(), a += p.lines, h += p.length + 1, c.push(p));
    }
    function d() {
      a != 0 && (l.push(c.length == 1 ? c[0] : Yi.from(c, h)), h = -1, a = c.length = 0);
    }
    for (let p of e)
      f(p);
    return d(), l.length == 1 ? l[0] : new Yi(l, t);
  }
}
Re.empty = /* @__PURE__ */ new ot([""], 0);
function ov(n) {
  let e = -1;
  for (let t of n)
    e += t.length + 1;
  return e;
}
function Wo(n, e, t = 0, i = 1e9) {
  for (let s = 0, r = 0, o = !0; r < n.length && s <= i; r++) {
    let l = n[r], a = s + l.length;
    a >= t && (a > i && (l = l.slice(0, i - s)), s < t && (l = l.slice(t - s)), o ? (e[e.length - 1] += l, o = !1) : e.push(l)), s = a + 1;
  }
  return e;
}
function ef(n, e, t) {
  return Wo(n, [""], e, t);
}
class Tr {
  constructor(e, t = 1) {
    this.dir = t, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [e], this.offsets = [t > 0 ? 1 : (e instanceof ot ? e.text.length : e.children.length) << 1];
  }
  nextInner(e, t) {
    for (this.done = this.lineBreak = !1; ; ) {
      let i = this.nodes.length - 1, s = this.nodes[i], r = this.offsets[i], o = r >> 1, l = s instanceof ot ? s.text.length : s.children.length;
      if (o == (t > 0 ? l : 0)) {
        if (i == 0)
          return this.done = !0, this.value = "", this;
        t > 0 && this.offsets[i - 1]++, this.nodes.pop(), this.offsets.pop();
      } else if ((r & 1) == (t > 0 ? 0 : 1)) {
        if (this.offsets[i] += t, e == 0)
          return this.lineBreak = !0, this.value = `
`, this;
        e--;
      } else if (s instanceof ot) {
        let a = s.text[o + (t < 0 ? -1 : 0)];
        if (this.offsets[i] += t, a.length > Math.max(0, e))
          return this.value = e == 0 ? a : t > 0 ? a.slice(e) : a.slice(0, a.length - e), this;
        e -= a.length;
      } else {
        let a = s.children[o + (t < 0 ? -1 : 0)];
        e > a.length ? (e -= a.length, this.offsets[i] += t) : (t < 0 && this.offsets[i]--, this.nodes.push(a), this.offsets.push(t > 0 ? 1 : (a instanceof ot ? a.text.length : a.children.length) << 1));
      }
    }
  }
  next(e = 0) {
    return e < 0 && (this.nextInner(-e, -this.dir), e = this.value.length), this.nextInner(e, this.dir);
  }
}
class $d {
  constructor(e, t, i) {
    this.value = "", this.done = !1, this.cursor = new Tr(e, t > i ? -1 : 1), this.pos = t > i ? e.length : 0, this.from = Math.min(t, i), this.to = Math.max(t, i);
  }
  nextInner(e, t) {
    if (t < 0 ? this.pos <= this.from : this.pos >= this.to)
      return this.value = "", this.done = !0, this;
    e += Math.max(0, t < 0 ? this.pos - this.to : this.from - this.pos);
    let i = t < 0 ? this.pos - this.from : this.to - this.pos;
    e > i && (e = i), i -= e;
    let { value: s } = this.cursor.next(e);
    return this.pos += (s.length + e) * t, this.value = s.length <= i ? s : t < 0 ? s.slice(s.length - i) : s.slice(0, i), this.done = !this.value, this;
  }
  next(e = 0) {
    return e < 0 ? e = Math.max(e, this.from - this.pos) : e > 0 && (e = Math.min(e, this.to - this.pos)), this.nextInner(e, this.cursor.dir);
  }
  get lineBreak() {
    return this.cursor.lineBreak && this.value != "";
  }
}
class Pd {
  constructor(e) {
    this.inner = e, this.afterBreak = !0, this.value = "", this.done = !1;
  }
  next(e = 0) {
    let { done: t, lineBreak: i, value: s } = this.inner.next(e);
    return t && this.afterBreak ? (this.value = "", this.afterBreak = !1) : t ? (this.done = !0, this.value = "") : i ? this.afterBreak ? this.value = "" : (this.afterBreak = !0, this.next()) : (this.value = s, this.afterBreak = !1), this;
  }
  get lineBreak() {
    return !1;
  }
}
typeof Symbol < "u" && (Re.prototype[Symbol.iterator] = function() {
  return this.iter();
}, Tr.prototype[Symbol.iterator] = $d.prototype[Symbol.iterator] = Pd.prototype[Symbol.iterator] = function() {
  return this;
});
class lv {
  /**
  @internal
  */
  constructor(e, t, i, s) {
    this.from = e, this.to = t, this.number = i, this.text = s;
  }
  /**
  The length of the line (not including any line break after it).
  */
  get length() {
    return this.to - this.from;
  }
}
function Us(n, e, t) {
  return e = Math.max(0, Math.min(n.length, e)), [e, Math.max(e, Math.min(n.length, t))];
}
function _t(n, e, t = !0, i = !0) {
  return sv(n, e, t, i);
}
function av(n) {
  return n >= 56320 && n < 57344;
}
function hv(n) {
  return n >= 55296 && n < 56320;
}
function In(n, e) {
  let t = n.charCodeAt(e);
  if (!hv(t) || e + 1 == n.length)
    return t;
  let i = n.charCodeAt(e + 1);
  return av(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t;
}
function cv(n) {
  return n <= 65535 ? String.fromCharCode(n) : (n -= 65536, String.fromCharCode((n >> 10) + 55296, (n & 1023) + 56320));
}
function xs(n) {
  return n < 65536 ? 1 : 2;
}
const Na = /\r\n?|\n/;
var Xt = /* @__PURE__ */ (function(n) {
  return n[n.Simple = 0] = "Simple", n[n.TrackDel = 1] = "TrackDel", n[n.TrackBefore = 2] = "TrackBefore", n[n.TrackAfter = 3] = "TrackAfter", n;
})(Xt || (Xt = {}));
class Hi {
  // Sections are encoded as pairs of integers. The first is the
  // length in the current document, and the second is -1 for
  // unaffected sections, and the length of the replacement content
  // otherwise. So an insertion would be (0, n>0), a deletion (n>0,
  // 0), and a replacement two positive numbers.
  /**
  @internal
  */
  constructor(e) {
    this.sections = e;
  }
  /**
  The length of the document before the change.
  */
  get length() {
    let e = 0;
    for (let t = 0; t < this.sections.length; t += 2)
      e += this.sections[t];
    return e;
  }
  /**
  The length of the document after the change.
  */
  get newLength() {
    let e = 0;
    for (let t = 0; t < this.sections.length; t += 2) {
      let i = this.sections[t + 1];
      e += i < 0 ? this.sections[t] : i;
    }
    return e;
  }
  /**
  False when there are actual changes in this set.
  */
  get empty() {
    return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
  }
  /**
  Iterate over the unchanged parts left by these changes. `posA`
  provides the position of the range in the old document, `posB`
  the new position in the changed document.
  */
  iterGaps(e) {
    for (let t = 0, i = 0, s = 0; t < this.sections.length; ) {
      let r = this.sections[t++], o = this.sections[t++];
      o < 0 ? (e(i, s, r), s += r) : s += o, i += r;
    }
  }
  /**
  Iterate over the ranges changed by these changes. (See
  [`ChangeSet.iterChanges`](https://codemirror.net/6/docs/ref/#state.ChangeSet.iterChanges) for a
  variant that also provides you with the inserted text.)
  `fromA`/`toA` provides the extent of the change in the starting
  document, `fromB`/`toB` the extent of the replacement in the
  changed document.
  
  When `individual` is true, adjacent changes (which are kept
  separate for [position mapping](https://codemirror.net/6/docs/ref/#state.ChangeDesc.mapPos)) are
  reported separately.
  */
  iterChangedRanges(e, t = !1) {
    Ga(this, e, t);
  }
  /**
  Get a description of the inverted form of these changes.
  */
  get invertedDesc() {
    let e = [];
    for (let t = 0; t < this.sections.length; ) {
      let i = this.sections[t++], s = this.sections[t++];
      s < 0 ? e.push(i, s) : e.push(s, i);
    }
    return new Hi(e);
  }
  /**
  Compute the combined effect of applying another set of changes
  after this one. The length of the document after this set should
  match the length before `other`.
  */
  composeDesc(e) {
    return this.empty ? e : e.empty ? this : _d(this, e);
  }
  /**
  Map this description, which should start with the same document
  as `other`, over another set of changes, so that it can be
  applied after it. When `before` is true, map as if the changes
  in `this` happened before the ones in `other`.
  */
  mapDesc(e, t = !1) {
    return e.empty ? this : Ua(this, e, t);
  }
  mapPos(e, t = -1, i = Xt.Simple) {
    let s = 0, r = 0;
    for (let o = 0; o < this.sections.length; ) {
      let l = this.sections[o++], a = this.sections[o++], h = s + l;
      if (a < 0) {
        if (h > e)
          return r + (e - s);
        r += l;
      } else {
        if (i != Xt.Simple && h >= e && (i == Xt.TrackDel && s < e && h > e || i == Xt.TrackBefore && s < e || i == Xt.TrackAfter && h > e))
          return null;
        if (h > e || h == e && t < 0 && !l)
          return e == s || t < 0 ? r : r + a;
        r += a;
      }
      s = h;
    }
    if (e > s)
      throw new RangeError(`Position ${e} is out of range for changeset of length ${s}`);
    return r;
  }
  /**
  Check whether these changes touch a given range. When one of the
  changes entirely covers the range, the string `"cover"` is
  returned.
  */
  touchesRange(e, t = e) {
    for (let i = 0, s = 0; i < this.sections.length && s <= t; ) {
      let r = this.sections[i++], o = this.sections[i++], l = s + r;
      if (o >= 0 && s <= t && l >= e)
        return s < e && l > t ? "cover" : !0;
      s = l;
    }
    return !1;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 0; t < this.sections.length; ) {
      let i = this.sections[t++], s = this.sections[t++];
      e += (e ? " " : "") + i + (s >= 0 ? ":" + s : "");
    }
    return e;
  }
  /**
  Serialize this change desc to a JSON-representable value.
  */
  toJSON() {
    return this.sections;
  }
  /**
  Create a change desc from its JSON representation (as produced
  by [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeDesc.toJSON).
  */
  static fromJSON(e) {
    if (!Array.isArray(e) || e.length % 2 || e.some((t) => typeof t != "number"))
      throw new RangeError("Invalid JSON representation of ChangeDesc");
    return new Hi(e);
  }
  /**
  @internal
  */
  static create(e) {
    return new Hi(e);
  }
}
class pt extends Hi {
  constructor(e, t) {
    super(e), this.inserted = t;
  }
  /**
  Apply the changes to a document, returning the modified
  document.
  */
  apply(e) {
    if (this.length != e.length)
      throw new RangeError("Applying change set to a document with the wrong length");
    return Ga(this, (t, i, s, r, o) => e = e.replace(s, s + (i - t), o), !1), e;
  }
  mapDesc(e, t = !1) {
    return Ua(this, e, t, !0);
  }
  /**
  Given the document as it existed _before_ the changes, return a
  change set that represents the inverse of this set, which could
  be used to go from the document created by the changes back to
  the document as it existed before the changes.
  */
  invert(e) {
    let t = this.sections.slice(), i = [];
    for (let s = 0, r = 0; s < t.length; s += 2) {
      let o = t[s], l = t[s + 1];
      if (l >= 0) {
        t[s] = l, t[s + 1] = o;
        let a = s >> 1;
        for (; i.length < a; )
          i.push(Re.empty);
        i.push(o ? e.slice(r, r + o) : Re.empty);
      }
      r += o;
    }
    return new pt(t, i);
  }
  /**
  Combine two subsequent change sets into a single set. `other`
  must start in the document produced by `this`. If `this` goes
  `docA` → `docB` and `other` represents `docB` → `docC`, the
  returned value will represent the change `docA` → `docC`.
  */
  compose(e) {
    return this.empty ? e : e.empty ? this : _d(this, e, !0);
  }
  /**
  Given another change set starting in the same document, maps this
  change set over the other, producing a new change set that can be
  applied to the document produced by applying `other`. When
  `before` is `true`, order changes as if `this` comes before
  `other`, otherwise (the default) treat `other` as coming first.
  
  Given two changes `A` and `B`, `A.compose(B.map(A))` and
  `B.compose(A.map(B, true))` will produce the same document. This
  provides a basic form of [operational
  transformation](https://en.wikipedia.org/wiki/Operational_transformation),
  and can be used for collaborative editing.
  */
  map(e, t = !1) {
    return e.empty ? this : Ua(this, e, t, !0);
  }
  /**
  Iterate over the changed ranges in the document, calling `f` for
  each, with the range in the original document (`fromA`-`toA`)
  and the range that replaces it in the new document
  (`fromB`-`toB`).
  
  When `individual` is true, adjacent changes are reported
  separately.
  */
  iterChanges(e, t = !1) {
    Ga(this, e, t);
  }
  /**
  Get a [change description](https://codemirror.net/6/docs/ref/#state.ChangeDesc) for this change
  set.
  */
  get desc() {
    return Hi.create(this.sections);
  }
  /**
  @internal
  */
  filter(e) {
    let t = [], i = [], s = [], r = new Lr(this);
    e: for (let o = 0, l = 0; ; ) {
      let a = o == e.length ? 1e9 : e[o++];
      for (; l < a || l == a && r.len == 0; ) {
        if (r.done)
          break e;
        let c = Math.min(r.len, a - l);
        Pt(s, c, -1);
        let f = r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0;
        Pt(t, c, f), f > 0 && Zn(i, t, r.text), r.forward(c), l += c;
      }
      let h = e[o++];
      for (; l < h; ) {
        if (r.done)
          break e;
        let c = Math.min(r.len, h - l);
        Pt(t, c, -1), Pt(s, c, r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0), r.forward(c), l += c;
      }
    }
    return {
      changes: new pt(t, i),
      filtered: Hi.create(s)
    };
  }
  /**
  Serialize this change set to a JSON-representable value.
  */
  toJSON() {
    let e = [];
    for (let t = 0; t < this.sections.length; t += 2) {
      let i = this.sections[t], s = this.sections[t + 1];
      s < 0 ? e.push(i) : s == 0 ? e.push([i]) : e.push([i].concat(this.inserted[t >> 1].toJSON()));
    }
    return e;
  }
  /**
  Create a change set for the given changes, for a document of the
  given length, using `lineSep` as line separator.
  */
  static of(e, t, i) {
    let s = [], r = [], o = 0, l = null;
    function a(c = !1) {
      if (!c && !s.length)
        return;
      o < t && Pt(s, t - o, -1);
      let f = new pt(s, r);
      l = l ? l.compose(f.map(l)) : f, s = [], r = [], o = 0;
    }
    function h(c) {
      if (Array.isArray(c))
        for (let f of c)
          h(f);
      else if (c instanceof pt) {
        if (c.length != t)
          throw new RangeError(`Mismatched change set length (got ${c.length}, expected ${t})`);
        a(), l = l ? l.compose(c.map(l)) : c;
      } else {
        let { from: f, to: d = f, insert: p } = c;
        if (f > d || f < 0 || d > t)
          throw new RangeError(`Invalid change range ${f} to ${d} (in doc of length ${t})`);
        let O = p ? typeof p == "string" ? Re.of(p.split(i || Na)) : p : Re.empty, g = O.length;
        if (f == d && g == 0)
          return;
        f < o && a(), f > o && Pt(s, f - o, -1), Pt(s, d - f, g), Zn(r, s, O), o = d;
      }
    }
    return h(e), a(!l), l;
  }
  /**
  Create an empty changeset of the given length.
  */
  static empty(e) {
    return new pt(e ? [e, -1] : [], []);
  }
  /**
  Create a changeset from its JSON representation (as produced by
  [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeSet.toJSON).
  */
  static fromJSON(e) {
    if (!Array.isArray(e))
      throw new RangeError("Invalid JSON representation of ChangeSet");
    let t = [], i = [];
    for (let s = 0; s < e.length; s++) {
      let r = e[s];
      if (typeof r == "number")
        t.push(r, -1);
      else {
        if (!Array.isArray(r) || typeof r[0] != "number" || r.some((o, l) => l && typeof o != "string"))
          throw new RangeError("Invalid JSON representation of ChangeSet");
        if (r.length == 1)
          t.push(r[0], 0);
        else {
          for (; i.length < s; )
            i.push(Re.empty);
          i[s] = Re.of(r.slice(1)), t.push(r[0], i[s].length);
        }
      }
    }
    return new pt(t, i);
  }
  /**
  @internal
  */
  static createSet(e, t) {
    return new pt(e, t);
  }
}
function Pt(n, e, t, i = !1) {
  if (e == 0 && t <= 0)
    return;
  let s = n.length - 2;
  s >= 0 && t <= 0 && t == n[s + 1] ? n[s] += e : s >= 0 && e == 0 && n[s] == 0 ? n[s + 1] += t : i ? (n[s] += e, n[s + 1] += t) : n.push(e, t);
}
function Zn(n, e, t) {
  if (t.length == 0)
    return;
  let i = e.length - 2 >> 1;
  if (i < n.length)
    n[n.length - 1] = n[n.length - 1].append(t);
  else {
    for (; n.length < i; )
      n.push(Re.empty);
    n.push(t);
  }
}
function Ga(n, e, t) {
  let i = n.inserted;
  for (let s = 0, r = 0, o = 0; o < n.sections.length; ) {
    let l = n.sections[o++], a = n.sections[o++];
    if (a < 0)
      s += l, r += l;
    else {
      let h = s, c = r, f = Re.empty;
      for (; h += l, c += a, a && i && (f = f.append(i[o - 2 >> 1])), !(t || o == n.sections.length || n.sections[o + 1] < 0); )
        l = n.sections[o++], a = n.sections[o++];
      e(s, h, r, c, f), s = h, r = c;
    }
  }
}
function Ua(n, e, t, i = !1) {
  let s = [], r = i ? [] : null, o = new Lr(n), l = new Lr(e);
  for (let a = -1; ; ) {
    if (o.done && l.len || l.done && o.len)
      throw new Error("Mismatched change set lengths");
    if (o.ins == -1 && l.ins == -1) {
      let h = Math.min(o.len, l.len);
      Pt(s, h, -1), o.forward(h), l.forward(h);
    } else if (l.ins >= 0 && (o.ins < 0 || a == o.i || o.off == 0 && (l.len < o.len || l.len == o.len && !t))) {
      let h = l.len;
      for (Pt(s, l.ins, -1); h; ) {
        let c = Math.min(o.len, h);
        o.ins >= 0 && a < o.i && o.len <= c && (Pt(s, 0, o.ins), r && Zn(r, s, o.text), a = o.i), o.forward(c), h -= c;
      }
      l.next();
    } else if (o.ins >= 0) {
      let h = 0, c = o.len;
      for (; c; )
        if (l.ins == -1) {
          let f = Math.min(c, l.len);
          h += f, c -= f, l.forward(f);
        } else if (l.ins == 0 && l.len < c)
          c -= l.len, l.next();
        else
          break;
      Pt(s, h, a < o.i ? o.ins : 0), r && a < o.i && Zn(r, s, o.text), a = o.i, o.forward(o.len - c);
    } else {
      if (o.done && l.done)
        return r ? pt.createSet(s, r) : Hi.create(s);
      throw new Error("Mismatched change set lengths");
    }
  }
}
function _d(n, e, t = !1) {
  let i = [], s = t ? [] : null, r = new Lr(n), o = new Lr(e);
  for (let l = !1; ; ) {
    if (r.done && o.done)
      return s ? pt.createSet(i, s) : Hi.create(i);
    if (r.ins == 0)
      Pt(i, r.len, 0, l), r.next();
    else if (o.len == 0 && !o.done)
      Pt(i, 0, o.ins, l), s && Zn(s, i, o.text), o.next();
    else {
      if (r.done || o.done)
        throw new Error("Mismatched change set lengths");
      {
        let a = Math.min(r.len2, o.len), h = i.length;
        if (r.ins == -1) {
          let c = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
          Pt(i, a, c, l), s && c && Zn(s, i, o.text);
        } else o.ins == -1 ? (Pt(i, r.off ? 0 : r.len, a, l), s && Zn(s, i, r.textBit(a))) : (Pt(i, r.off ? 0 : r.len, o.off ? 0 : o.ins, l), s && !o.off && Zn(s, i, o.text));
        l = (r.ins > a || o.ins >= 0 && o.len > a) && (l || i.length > h), r.forward2(a), o.forward(a);
      }
    }
  }
}
class Lr {
  constructor(e) {
    this.set = e, this.i = 0, this.next();
  }
  next() {
    let { sections: e } = this.set;
    this.i < e.length ? (this.len = e[this.i++], this.ins = e[this.i++]) : (this.len = 0, this.ins = -2), this.off = 0;
  }
  get done() {
    return this.ins == -2;
  }
  get len2() {
    return this.ins < 0 ? this.len : this.ins;
  }
  get text() {
    let { inserted: e } = this.set, t = this.i - 2 >> 1;
    return t >= e.length ? Re.empty : e[t];
  }
  textBit(e) {
    let { inserted: t } = this.set, i = this.i - 2 >> 1;
    return i >= t.length && !e ? Re.empty : t[i].slice(this.off, e == null ? void 0 : this.off + e);
  }
  forward(e) {
    e == this.len ? this.next() : (this.len -= e, this.off += e);
  }
  forward2(e) {
    this.ins == -1 ? this.forward(e) : e == this.ins ? this.next() : (this.ins -= e, this.off += e);
  }
}
class Qn {
  constructor(e, t, i, s) {
    this.from = e, this.to = t, this.flags = i, this.goalColumn = s;
  }
  /**
  The anchor of the range—the side that doesn't move when you
  extend it.
  */
  get anchor() {
    return this.flags & 32 ? this.to : this.from;
  }
  /**
  The head of the range, which is moved when the range is
  [extended](https://codemirror.net/6/docs/ref/#state.SelectionRange.extend).
  */
  get head() {
    return this.flags & 32 ? this.from : this.to;
  }
  /**
  True when `anchor` and `head` are at the same position.
  */
  get empty() {
    return this.from == this.to;
  }
  /**
  If this is a cursor that is explicitly associated with the
  character on one of its sides, this returns the side. -1 means
  the character before its position, 1 the character after, and 0
  means no association.
  */
  get assoc() {
    return this.flags & 8 ? -1 : this.flags & 16 ? 1 : 0;
  }
  /**
  A flag that, when set, makes some selection-extending commands
  treat the range's head and anchor as exchangeable, so that for
  example Shift-ArrowUp will make the lower side of the selection
  the anchor, even if that was the head before. Used to implement
  MacOS-style undirectional selections.
  */
  get undirectional() {
    return (this.flags & 64) > 0;
  }
  /**
  The bidirectional text level associated with this cursor, if
  any.
  */
  get bidiLevel() {
    let e = this.flags & 7;
    return e == 7 ? null : e;
  }
  /**
  Map this range through a change, producing a valid range in the
  updated document.
  */
  map(e, t = -1) {
    let i, s;
    return this.empty ? i = s = e.mapPos(this.from, t) : (i = e.mapPos(this.from, 1), s = e.mapPos(this.to, -1)), i == this.from && s == this.to ? this : new Qn(i, s, this.flags, this.goalColumn);
  }
  /**
  Extend this range to cover at least `from` to `to`.
  */
  extend(e, t = e, i = 0) {
    if (e <= this.anchor && t >= this.anchor)
      return B.range(e, t, void 0, void 0, i);
    let s = Math.abs(e - this.anchor) > Math.abs(t - this.anchor) ? e : t;
    return B.range(this.anchor, s, void 0, void 0, i);
  }
  /**
  Compare this range to another range.
  */
  eq(e, t = !1) {
    return this.anchor == e.anchor && this.head == e.head && this.goalColumn == e.goalColumn && (!t || !this.empty || this.assoc == e.assoc);
  }
  /**
  Return a JSON-serializable object representing the range.
  */
  toJSON() {
    return { anchor: this.anchor, head: this.head };
  }
  /**
  Convert a JSON representation of a range to a `SelectionRange`
  instance.
  */
  static fromJSON(e) {
    if (!e || typeof e.anchor != "number" || typeof e.head != "number")
      throw new RangeError("Invalid JSON representation for SelectionRange");
    return B.range(e.anchor, e.head);
  }
  /**
  @internal
  */
  static create(e, t, i, s) {
    return new Qn(e, t, i, s);
  }
}
class B {
  constructor(e, t) {
    this.ranges = e, this.mainIndex = t;
  }
  /**
  Map a selection through a change. Used to adjust the selection
  position for changes.
  */
  map(e, t = -1) {
    return e.empty ? this : B.create(this.ranges.map((i) => i.map(e, t)), this.mainIndex);
  }
  /**
  Compare this selection to another selection. By default, ranges
  are compared only by position. When `includeAssoc` is true,
  cursor ranges must also have the same
  [`assoc`](https://codemirror.net/6/docs/ref/#state.SelectionRange.assoc) value.
  */
  eq(e, t = !1) {
    if (this.ranges.length != e.ranges.length || this.mainIndex != e.mainIndex)
      return !1;
    for (let i = 0; i < this.ranges.length; i++)
      if (!this.ranges[i].eq(e.ranges[i], t))
        return !1;
    return !0;
  }
  /**
  Get the primary selection range. Usually, you should make sure
  your code applies to _all_ ranges, by using methods like
  [`changeByRange`](https://codemirror.net/6/docs/ref/#state.EditorState.changeByRange).
  */
  get main() {
    return this.ranges[this.mainIndex];
  }
  /**
  Make sure the selection only has one range. Returns a selection
  holding only the main range from this selection.
  */
  asSingle() {
    return this.ranges.length == 1 ? this : new B([this.main], 0);
  }
  /**
  Extend this selection with an extra range.
  */
  addRange(e, t = !0) {
    return B.create([e].concat(this.ranges), t ? 0 : this.mainIndex + 1);
  }
  /**
  Replace a given range with another range, and then normalize the
  selection to merge and sort ranges if necessary.
  */
  replaceRange(e, t = this.mainIndex) {
    let i = this.ranges.slice();
    return i[t] = e, B.create(i, this.mainIndex);
  }
  /**
  Convert this selection to an object that can be serialized to
  JSON.
  */
  toJSON() {
    return { ranges: this.ranges.map((e) => e.toJSON()), main: this.mainIndex };
  }
  /**
  Create a selection from a JSON representation.
  */
  static fromJSON(e) {
    if (!e || !Array.isArray(e.ranges) || typeof e.main != "number" || e.main >= e.ranges.length)
      throw new RangeError("Invalid JSON representation for EditorSelection");
    return new B(e.ranges.map((t) => Qn.fromJSON(t)), e.main);
  }
  /**
  Create a selection holding a single range.
  */
  static single(e, t = e) {
    return new B([B.range(e, t)], 0);
  }
  /**
  Sort and merge the given set of ranges, creating a valid
  selection.
  */
  static create(e, t = 0) {
    if (e.length == 0)
      throw new RangeError("A selection needs at least one range");
    for (let i = 0, s = 0; s < e.length; s++) {
      let r = e[s];
      if (r.empty ? r.from <= i : r.from < i)
        return B.normalized(e.slice(), t);
      i = r.to;
    }
    return new B(e, t);
  }
  /**
  Create a cursor selection range at the given position. You can
  safely ignore the optional arguments in most situations.
  */
  static cursor(e, t = 0, i, s) {
    return Qn.create(e, e, (t == 0 ? 0 : t < 0 ? 8 : 16) | (i == null ? 7 : Math.min(6, i)), s);
  }
  /**
  Create a selection range.
  */
  static range(e, t, i, s, r) {
    let o = s == null ? 7 : Math.min(6, s);
    return !r && e != t && (r = t < e ? 1 : -1), r && (o |= r < 0 ? 8 : 16), t < e ? Qn.create(t, e, o | 32, i) : Qn.create(e, t, o, i);
  }
  /**
  Create an [undirectional](https://codemirror.net/6/docs/ref/#state.SelectionRange.undirectional)
  selection range.
  */
  static undirectionalRange(e, t) {
    return Qn.create(e, t, 64, void 0);
  }
  /**
  @internal
  */
  static normalized(e, t = 0) {
    let i = e[t];
    e.sort((s, r) => s.from - r.from), t = e.indexOf(i);
    for (let s = 1; s < e.length; s++) {
      let r = e[s], o = e[s - 1];
      if (r.empty ? r.from <= o.to : r.from < o.to) {
        let l = o.from, a = Math.max(r.to, o.to);
        s <= t && t--, e.splice(--s, 2, r.anchor > r.head ? B.range(a, l) : B.range(l, a));
      }
    }
    return new B(e, t);
  }
}
function Td(n, e) {
  for (let t of n.ranges)
    if (t.to > e)
      throw new RangeError("Selection points outside of document");
}
let Hh = 0;
class me {
  constructor(e, t, i, s, r) {
    this.combine = e, this.compareInput = t, this.compare = i, this.isStatic = s, this.id = Hh++, this.default = e([]), this.extensions = typeof r == "function" ? r(this) : r;
  }
  /**
  Returns a facet reader for this facet, which can be used to
  [read](https://codemirror.net/6/docs/ref/#state.EditorState.facet) it but not to define values for it.
  */
  get reader() {
    return this;
  }
  /**
  Define a new facet.
  */
  static define(e = {}) {
    return new me(e.combine || ((t) => t), e.compareInput || ((t, i) => t === i), e.compare || (e.combine ? (t, i) => t === i : Kh), !!e.static, e.enables);
  }
  /**
  Returns an extension that adds the given value to this facet.
  */
  of(e) {
    return new Yo([], this, 0, e);
  }
  /**
  Create an extension that computes a value for the facet from a
  state. You must take care to declare the parts of the state that
  this value depends on, since your function is only called again
  for a new state when one of those parts changed.
  
  In cases where your value depends only on a single field, you'll
  want to use the [`from`](https://codemirror.net/6/docs/ref/#state.Facet.from) method instead.
  */
  compute(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new Yo(e, this, 1, t);
  }
  /**
  Create an extension that computes zero or more values for this
  facet from a state.
  */
  computeN(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new Yo(e, this, 2, t);
  }
  from(e, t) {
    return t || (t = (i) => i), this.compute([e], (i) => t(i.field(e)));
  }
}
function Kh(n, e) {
  return n == e || n.length == e.length && n.every((t, i) => t === e[i]);
}
class Yo {
  constructor(e, t, i, s) {
    this.dependencies = e, this.facet = t, this.type = i, this.value = s, this.id = Hh++;
  }
  dynamicSlot(e) {
    var t;
    let i = this.value, s = this.facet.compareInput, r = this.id, o = e[r] >> 1, l = this.type == 2, a = !1, h = !1, c = [];
    for (let f of this.dependencies)
      f == "doc" ? a = !0 : f == "selection" ? h = !0 : (((t = e[f.id]) !== null && t !== void 0 ? t : 1) & 1) == 0 && c.push(e[f.id]);
    return {
      create(f) {
        return f.values[o] = i(f), 1;
      },
      update(f, d) {
        if (a && d.docChanged || h && (d.docChanged || d.selection) || Fa(f, c)) {
          let p = i(f);
          if (l ? !tf(p, f.values[o], s) : !s(p, f.values[o]))
            return f.values[o] = p, 1;
        }
        return 0;
      },
      reconfigure: (f, d) => {
        let p, O = d.config.address[r];
        if (O != null) {
          let g = Ko(d, O);
          if (this.dependencies.every((m) => m instanceof me ? d.facet(m) === f.facet(m) : m instanceof tn ? d.field(m, !1) == f.field(m, !1) : !0) || (l ? tf(p = i(f), g, s) : s(p = i(f), g)))
            return f.values[o] = g, 0;
        } else
          p = i(f);
        return f.values[o] = p, 1;
      }
    };
  }
  get extension() {
    return this;
  }
}
function tf(n, e, t) {
  if (n.length != e.length)
    return !1;
  for (let i = 0; i < n.length; i++)
    if (!t(n[i], e[i]))
      return !1;
  return !0;
}
function Fa(n, e) {
  let t = !1;
  for (let i of e)
    Zr(n, i) & 1 && (t = !0);
  return t;
}
function fv(n, e, t) {
  let i = t.map((a) => n[a.id]), s = t.map((a) => a.type), r = i.filter((a) => !(a & 1)), o = n[e.id] >> 1;
  function l(a) {
    let h = [];
    for (let c = 0; c < i.length; c++) {
      let f = Ko(a, i[c]);
      if (s[c] == 2)
        for (let d of f)
          h.push(d);
      else
        h.push(f);
    }
    return e.combine(h);
  }
  return {
    create(a) {
      for (let h of i)
        Zr(a, h);
      return a.values[o] = l(a), 1;
    },
    update(a, h) {
      if (!Fa(a, r))
        return 0;
      let c = l(a);
      return e.compare(c, a.values[o]) ? 0 : (a.values[o] = c, 1);
    },
    reconfigure(a, h) {
      let c = Fa(a, i), f = h.config.facets[e.id], d = h.facet(e);
      if (f && !c && Kh(t, f))
        return a.values[o] = d, 0;
      let p = l(a);
      return e.compare(p, d) ? (a.values[o] = d, 0) : (a.values[o] = p, 1);
    }
  };
}
const go = /* @__PURE__ */ me.define({ static: !0 });
class tn {
  constructor(e, t, i, s, r) {
    this.id = e, this.createF = t, this.updateF = i, this.compareF = s, this.spec = r, this.provides = void 0;
  }
  /**
  Define a state field.
  */
  static define(e) {
    let t = new tn(Hh++, e.create, e.update, e.compare || ((i, s) => i === s), e);
    return e.provide && (t.provides = e.provide(t)), t;
  }
  create(e) {
    let t = e.facet(go).find((i) => i.field == this);
    return ((t == null ? void 0 : t.create) || this.createF)(e);
  }
  /**
  @internal
  */
  slot(e) {
    let t = e[this.id] >> 1;
    return {
      create: (i) => (i.values[t] = this.create(i), 1),
      update: (i, s) => {
        let r = i.values[t], o = this.updateF(r, s);
        return this.compareF(r, o) ? 0 : (i.values[t] = o, 1);
      },
      reconfigure: (i, s) => {
        let r = i.facet(go), o = s.facet(go), l;
        return (l = r.find((a) => a.field == this)) && l != o.find((a) => a.field == this) ? (i.values[t] = l.create(i), 1) : s.config.address[this.id] != null ? (i.values[t] = s.field(this), 0) : (i.values[t] = this.create(i), 1);
      }
    };
  }
  /**
  Returns an extension that enables this field and overrides the
  way it is initialized. Can be useful when you need to provide a
  non-default starting value for the field.
  */
  init(e) {
    return [this, go.of({ field: this, create: e })];
  }
  /**
  State field instances can be used as
  [`Extension`](https://codemirror.net/6/docs/ref/#state.Extension) values to enable the field in a
  given state.
  */
  get extension() {
    return this;
  }
}
const Yn = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
function cr(n) {
  return (e) => new Zd(e, n);
}
const no = {
  /**
  The highest precedence level, for extensions that should end up
  near the start of the precedence ordering.
  */
  highest: /* @__PURE__ */ cr(Yn.highest),
  /**
  A higher-than-default precedence, for extensions that should
  come before those with default precedence.
  */
  high: /* @__PURE__ */ cr(Yn.high),
  /**
  The default precedence, which is also used for extensions
  without an explicit precedence.
  */
  default: /* @__PURE__ */ cr(Yn.default),
  /**
  A lower-than-default precedence.
  */
  low: /* @__PURE__ */ cr(Yn.low),
  /**
  The lowest precedence level. Meant for things that should end up
  near the end of the extension order.
  */
  lowest: /* @__PURE__ */ cr(Yn.lowest)
};
class Zd {
  constructor(e, t) {
    this.inner = e, this.prec = t;
  }
  get extension() {
    return this;
  }
}
class Tl {
  /**
  Create an instance of this compartment to add to your [state
  configuration](https://codemirror.net/6/docs/ref/#state.EditorStateConfig.extensions).
  */
  of(e) {
    return new Ha(this, e);
  }
  /**
  Create an [effect](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) that
  reconfigures this compartment.
  */
  reconfigure(e) {
    return Tl.reconfigure.of({ compartment: this, extension: e });
  }
  /**
  Get the current content of the compartment in the state, or
  `undefined` if it isn't present.
  */
  get(e) {
    return e.config.compartments.get(this);
  }
}
class Ha {
  constructor(e, t) {
    this.compartment = e, this.inner = t;
  }
  get extension() {
    return this;
  }
}
class Ho {
  constructor(e, t, i, s, r, o) {
    for (this.base = e, this.compartments = t, this.dynamicSlots = i, this.address = s, this.staticValues = r, this.facets = o, this.statusTemplate = []; this.statusTemplate.length < i.length; )
      this.statusTemplate.push(
        0
        /* SlotStatus.Unresolved */
      );
  }
  staticFacet(e) {
    let t = this.address[e.id];
    return t == null ? e.default : this.staticValues[t >> 1];
  }
  static resolve(e, t, i) {
    let s = [], r = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ new Map();
    for (let d of uv(e, t, o))
      d instanceof tn ? s.push(d) : (r[d.facet.id] || (r[d.facet.id] = [])).push(d);
    let l = /* @__PURE__ */ Object.create(null), a = [], h = [];
    for (let d of s)
      l[d.id] = h.length << 1, h.push((p) => d.slot(p));
    let c = i == null ? void 0 : i.config.facets;
    for (let d in r) {
      let p = r[d], O = p[0].facet, g = c && c[d] || [];
      if (p.every(
        (m) => m.type == 0
        /* Provider.Static */
      ))
        if (l[O.id] = a.length << 1 | 1, Kh(g, p))
          a.push(i.facet(O));
        else {
          let m = O.combine(p.map((v) => v.value));
          a.push(i && O.compare(m, i.facet(O)) ? i.facet(O) : m);
        }
      else {
        for (let m of p)
          m.type == 0 ? (l[m.id] = a.length << 1 | 1, a.push(m.value)) : (l[m.id] = h.length << 1, h.push((v) => m.dynamicSlot(v)));
        l[O.id] = h.length << 1, h.push((m) => fv(m, O, p));
      }
    }
    let f = h.map((d) => d(l));
    return new Ho(e, o, f, l, a, r);
  }
}
function uv(n, e, t) {
  let i = [[], [], [], [], []], s = /* @__PURE__ */ new Map();
  function r(o, l) {
    let a = s.get(o);
    if (a != null) {
      if (a <= l)
        return;
      let h = i[a].indexOf(o);
      h > -1 && i[a].splice(h, 1), o instanceof Ha && t.delete(o.compartment);
    }
    if (s.set(o, l), Array.isArray(o))
      for (let h of o)
        r(h, l);
    else if (o instanceof Ha) {
      if (t.has(o.compartment))
        throw new RangeError("Duplicate use of compartment in extensions");
      let h = e.get(o.compartment) || o.inner;
      t.set(o.compartment, h), r(h, l);
    } else if (o instanceof Zd)
      r(o.inner, o.prec);
    else if (o instanceof tn)
      i[l].push(o), o.provides && r(o.provides, l);
    else if (o instanceof Yo)
      i[l].push(o), o.facet.extensions && r(o.facet.extensions, Yn.default);
    else {
      let h = o.extension;
      if (!h)
        throw new Error(`Unrecognized extension value in extension set (${o}).`);
      if (h == o)
        throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
      r(h, l);
    }
  }
  return r(n, Yn.default), i.reduce((o, l) => o.concat(l));
}
function Zr(n, e) {
  if (e & 1)
    return 2;
  let t = e >> 1, i = n.status[t];
  if (i == 4)
    throw new Error("Cyclic dependency between fields and/or facets");
  if (i & 2)
    return i;
  n.status[t] = 4;
  let s = n.computeSlot(n, n.config.dynamicSlots[t]);
  return n.status[t] = 2 | s;
}
function Ko(n, e) {
  return e & 1 ? n.config.staticValues[e >> 1] : n.values[e >> 1];
}
const Cd = /* @__PURE__ */ me.define(), Ka = /* @__PURE__ */ me.define({
  combine: (n) => n.some((e) => e),
  static: !0
}), Ad = /* @__PURE__ */ me.define({
  combine: (n) => n.length ? n[0] : void 0,
  static: !0
}), Rd = /* @__PURE__ */ me.define(), Md = /* @__PURE__ */ me.define(), Xd = /* @__PURE__ */ me.define(), Ed = /* @__PURE__ */ me.define({
  combine: (n) => n.length ? n[0] : !1
});
class mn {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  /**
  Define a new type of annotation.
  */
  static define() {
    return new dv();
  }
}
class dv {
  /**
  Create an instance of this annotation.
  */
  of(e) {
    return new mn(this, e);
  }
}
class pv {
  /**
  @internal
  */
  constructor(e) {
    this.map = e;
  }
  /**
  Create a [state effect](https://codemirror.net/6/docs/ref/#state.StateEffect) instance of this
  type.
  */
  of(e) {
    return new ze(this, e);
  }
}
class ze {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  /**
  Map this effect through a position mapping. Will return
  `undefined` when that ends up deleting the effect.
  */
  map(e) {
    let t = this.type.map(this.value, e);
    return t === void 0 ? void 0 : t == this.value ? this : new ze(this.type, t);
  }
  /**
  Tells you whether this effect object is of a given
  [type](https://codemirror.net/6/docs/ref/#state.StateEffectType).
  */
  is(e) {
    return this.type == e;
  }
  /**
  Define a new effect type. The type parameter indicates the type
  of values that his effect holds. It should be a type that
  doesn't include `undefined`, since that is used in
  [mapping](https://codemirror.net/6/docs/ref/#state.StateEffect.map) to indicate that an effect is
  removed.
  */
  static define(e = {}) {
    return new pv(e.map || ((t) => t));
  }
  /**
  Map an array of effects through a change set.
  */
  static mapEffects(e, t) {
    if (!e.length)
      return e;
    let i = [];
    for (let s of e) {
      let r = s.map(t);
      r && i.push(r);
    }
    return i;
  }
}
ze.reconfigure = /* @__PURE__ */ ze.define();
ze.appendConfig = /* @__PURE__ */ ze.define();
class ut {
  constructor(e, t, i, s, r, o) {
    this.startState = e, this.changes = t, this.selection = i, this.effects = s, this.annotations = r, this.scrollIntoView = o, this._doc = null, this._state = null, i && Td(i, t.newLength), r.some((l) => l.type == ut.time) || (this.annotations = r.concat(ut.time.of(Date.now())));
  }
  /**
  @internal
  */
  static create(e, t, i, s, r, o) {
    return new ut(e, t, i, s, r, o);
  }
  /**
  The new document produced by the transaction. Contrary to
  [`.state`](https://codemirror.net/6/docs/ref/#state.Transaction.state)`.doc`, accessing this won't
  force the entire new state to be computed right away, so it is
  recommended that [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) use this getter
  when they need to look at the new document.
  */
  get newDoc() {
    return this._doc || (this._doc = this.changes.apply(this.startState.doc));
  }
  /**
  The new selection produced by the transaction. If
  [`this.selection`](https://codemirror.net/6/docs/ref/#state.Transaction.selection) is undefined,
  this will [map](https://codemirror.net/6/docs/ref/#state.EditorSelection.map) the start state's
  current selection through the changes made by the transaction.
  */
  get newSelection() {
    return this.selection || this.startState.selection.map(this.changes);
  }
  /**
  The new state created by the transaction. Computed on demand
  (but retained for subsequent access), so it is recommended not to
  access it in [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) when possible.
  */
  get state() {
    return this._state || this.startState.applyTransaction(this), this._state;
  }
  /**
  Get the value of the given annotation type, if any.
  */
  annotation(e) {
    for (let t of this.annotations)
      if (t.type == e)
        return t.value;
  }
  /**
  Indicates whether the transaction changed the document.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Indicates whether this transaction reconfigures the state
  (through a [configuration compartment](https://codemirror.net/6/docs/ref/#state.Compartment) or
  with a top-level configuration
  [effect](https://codemirror.net/6/docs/ref/#state.StateEffect^reconfigure).
  */
  get reconfigured() {
    return this.startState.config != this.state.config;
  }
  /**
  Returns true if the transaction has a [user
  event](https://codemirror.net/6/docs/ref/#state.Transaction^userEvent) annotation that is equal to
  or more specific than `event`. For example, if the transaction
  has `"select.pointer"` as user event, `"select"` and
  `"select.pointer"` will match it.
  */
  isUserEvent(e) {
    let t = this.annotation(ut.userEvent);
    return !!(t && (t == e || t.length > e.length && t.slice(0, e.length) == e && t[e.length] == "."));
  }
}
ut.time = /* @__PURE__ */ mn.define();
ut.userEvent = /* @__PURE__ */ mn.define();
ut.addToHistory = /* @__PURE__ */ mn.define();
ut.remote = /* @__PURE__ */ mn.define();
function Ov(n, e) {
  let t = [];
  for (let i = 0, s = 0; ; ) {
    let r, o;
    if (i < n.length && (s == e.length || e[s] >= n[i]))
      r = n[i++], o = n[i++];
    else if (s < e.length)
      r = e[s++], o = e[s++];
    else
      return t;
    !t.length || t[t.length - 1] < r ? t.push(r, o) : t[t.length - 1] < o && (t[t.length - 1] = o);
  }
}
function Ld(n, e, t) {
  var i;
  let s, r, o;
  return t ? (s = e.changes, r = pt.empty(e.changes.length), o = n.changes.compose(e.changes)) : (s = e.changes.map(n.changes), r = n.changes.mapDesc(e.changes, !0), o = n.changes.compose(s)), {
    changes: o,
    selection: e.selection ? e.selection.map(r) : (i = n.selection) === null || i === void 0 ? void 0 : i.map(s),
    effects: ze.mapEffects(n.effects, s).concat(ze.mapEffects(e.effects, r)),
    annotations: n.annotations.length ? n.annotations.concat(e.annotations) : e.annotations,
    scrollIntoView: n.scrollIntoView || e.scrollIntoView
  };
}
function Ja(n, e, t) {
  let i = e.selection, s = Zs(e.annotations);
  return e.userEvent && (s = s.concat(ut.userEvent.of(e.userEvent))), {
    changes: e.changes instanceof pt ? e.changes : pt.of(e.changes || [], t, n.facet(Ad)),
    selection: i && (i instanceof B ? i : B.single(i.anchor, i.head)),
    effects: Zs(e.effects),
    annotations: s,
    scrollIntoView: !!e.scrollIntoView
  };
}
function jd(n, e, t) {
  let i = Ja(n, e.length ? e[0] : {}, n.doc.length);
  e.length && e[0].filter === !1 && (t = !1);
  for (let r = 1; r < e.length; r++) {
    e[r].filter === !1 && (t = !1);
    let o = !!e[r].sequential;
    i = Ld(i, Ja(n, e[r], o ? i.changes.newLength : n.doc.length), o);
  }
  let s = ut.create(n, i.changes, i.selection, i.effects, i.annotations, i.scrollIntoView);
  return mv(t ? gv(s) : s);
}
function gv(n) {
  let e = n.startState, t = !0;
  for (let s of e.facet(Rd)) {
    let r = s(n);
    if (r === !1) {
      t = !1;
      break;
    }
    Array.isArray(r) && (t = t === !0 ? r : Ov(t, r));
  }
  if (t !== !0) {
    let s, r;
    if (t === !1)
      r = n.changes.invertedDesc, s = pt.empty(e.doc.length);
    else {
      let o = n.changes.filter(t);
      s = o.changes, r = o.filtered.mapDesc(o.changes).invertedDesc;
    }
    n = ut.create(e, s, n.selection && n.selection.map(r), ze.mapEffects(n.effects, r), n.annotations, n.scrollIntoView);
  }
  let i = e.facet(Md);
  for (let s = i.length - 1; s >= 0; s--) {
    let r = i[s](n);
    r instanceof ut ? n = r : Array.isArray(r) && r.length == 1 && r[0] instanceof ut ? n = r[0] : n = jd(e, Zs(r), !1);
  }
  return n;
}
function mv(n) {
  let e = n.startState, t = e.facet(Xd), i = n;
  for (let s = t.length - 1; s >= 0; s--) {
    let r = t[s](n);
    r && Object.keys(r).length && (i = Ld(i, Ja(e, r, n.changes.newLength), !0));
  }
  return i == n ? n : ut.create(e, n.changes, n.selection, i.effects, i.annotations, i.scrollIntoView);
}
const vv = [];
function Zs(n) {
  return n == null ? vv : Array.isArray(n) ? n : [n];
}
var hn = /* @__PURE__ */ (function(n) {
  return n[n.Word = 0] = "Word", n[n.Space = 1] = "Space", n[n.Other = 2] = "Other", n;
})(hn || (hn = {}));
const bv = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
let eh;
try {
  eh = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
} catch {
}
function yv(n) {
  if (eh)
    return eh.test(n);
  for (let e = 0; e < n.length; e++) {
    let t = n[e];
    if (/\w/.test(t) || t > "" && (t.toUpperCase() != t.toLowerCase() || bv.test(t)))
      return !0;
  }
  return !1;
}
function wv(n) {
  return (e) => {
    if (!/\S/.test(e))
      return hn.Space;
    if (yv(e))
      return hn.Word;
    for (let t = 0; t < n.length; t++)
      if (e.indexOf(n[t]) > -1)
        return hn.Word;
    return hn.Other;
  };
}
class Xe {
  constructor(e, t, i, s, r, o) {
    this.config = e, this.doc = t, this.selection = i, this.values = s, this.status = e.statusTemplate.slice(), this.computeSlot = r, o && (o._state = this);
    for (let l = 0; l < this.config.dynamicSlots.length; l++)
      Zr(this, l << 1);
    this.computeSlot = null;
  }
  field(e, t = !0) {
    let i = this.config.address[e.id];
    if (i == null) {
      if (t)
        throw new RangeError("Field is not present in this state");
      return;
    }
    return Zr(this, i), Ko(this, i);
  }
  /**
  Create a [transaction](https://codemirror.net/6/docs/ref/#state.Transaction) that updates this
  state. Any number of [transaction specs](https://codemirror.net/6/docs/ref/#state.TransactionSpec)
  can be passed. Unless
  [`sequential`](https://codemirror.net/6/docs/ref/#state.TransactionSpec.sequential) is set, the
  [changes](https://codemirror.net/6/docs/ref/#state.TransactionSpec.changes) (if any) of each spec
  are assumed to start in the _current_ document (not the document
  produced by previous specs), and its
  [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection) and
  [effects](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) are assumed to refer
  to the document created by its _own_ changes. The resulting
  transaction contains the combined effect of all the different
  specs. For [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection), later
  specs take precedence over earlier ones.
  */
  update(...e) {
    return jd(this, e, !0);
  }
  /**
  @internal
  */
  applyTransaction(e) {
    let t = this.config, { base: i, compartments: s } = t;
    for (let l of e.effects)
      l.is(Tl.reconfigure) ? (t && (s = /* @__PURE__ */ new Map(), t.compartments.forEach((a, h) => s.set(h, a)), t = null), s.set(l.value.compartment, l.value.extension)) : l.is(ze.reconfigure) ? (t = null, i = l.value) : l.is(ze.appendConfig) && (t = null, i = Zs(i).concat(l.value));
    let r;
    t ? r = e.startState.values.slice() : (t = Ho.resolve(i, s, this), r = new Xe(t, this.doc, this.selection, t.dynamicSlots.map(() => null), (a, h) => h.reconfigure(a, this), null).values);
    let o = e.startState.facet(Ka) ? e.newSelection : e.newSelection.asSingle();
    new Xe(t, e.newDoc, o, r, (l, a) => a.update(l, e), e);
  }
  /**
  Create a [transaction spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec) that
  replaces every selection range with the given content.
  */
  replaceSelection(e) {
    return typeof e == "string" && (e = this.toText(e)), this.changeByRange((t) => ({
      changes: { from: t.from, to: t.to, insert: e },
      range: B.cursor(t.from + e.length)
    }));
  }
  /**
  Create a set of changes and a new selection by running the given
  function for each range in the active selection. The function
  can return an optional set of changes (in the coordinate space
  of the start document), plus an updated range (in the coordinate
  space of the document produced by the call's own changes). This
  method will merge all the changes and ranges into a single
  changeset and selection, and return it as a [transaction
  spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec), which can be passed to
  [`update`](https://codemirror.net/6/docs/ref/#state.EditorState.update).
  */
  changeByRange(e) {
    let t = this.selection, i = e(t.ranges[0]), s = this.changes(i.changes), r = [i.range], o = Zs(i.effects);
    for (let l = 1; l < t.ranges.length; l++) {
      let a = e(t.ranges[l]), h = this.changes(a.changes), c = h.map(s);
      for (let d = 0; d < l; d++)
        r[d] = r[d].map(c);
      let f = s.mapDesc(h, !0);
      r.push(a.range.map(f)), s = s.compose(c), o = ze.mapEffects(o, c).concat(ze.mapEffects(Zs(a.effects), f));
    }
    return {
      changes: s,
      selection: B.create(r, t.mainIndex),
      effects: o
    };
  }
  /**
  Create a [change set](https://codemirror.net/6/docs/ref/#state.ChangeSet) from the given change
  description, taking the state's document length and line
  separator into account.
  */
  changes(e = []) {
    return e instanceof pt ? e : pt.of(e, this.doc.length, this.facet(Xe.lineSeparator));
  }
  /**
  Using the state's [line
  separator](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator), create a
  [`Text`](https://codemirror.net/6/docs/ref/#state.Text) instance from the given string.
  */
  toText(e) {
    return Re.of(e.split(this.facet(Xe.lineSeparator) || Na));
  }
  /**
  Return the given range of the document as a string.
  */
  sliceDoc(e = 0, t = this.doc.length) {
    return this.doc.sliceString(e, t, this.lineBreak);
  }
  /**
  Get the value of a state [facet](https://codemirror.net/6/docs/ref/#state.Facet).
  */
  facet(e) {
    let t = this.config.address[e.id];
    return t == null ? e.default : (Zr(this, t), Ko(this, t));
  }
  /**
  Convert this state to a JSON-serializable object. When custom
  fields should be serialized, you can pass them in as an object
  mapping property names (in the resulting object, which should
  not use `doc` or `selection`) to fields.
  */
  toJSON(e) {
    let t = {
      doc: this.sliceDoc(),
      selection: this.selection.toJSON()
    };
    if (e)
      for (let i in e) {
        let s = e[i];
        s instanceof tn && this.config.address[s.id] != null && (t[i] = s.spec.toJSON(this.field(e[i]), this));
      }
    return t;
  }
  /**
  Deserialize a state from its JSON representation. When custom
  fields should be deserialized, pass the same object you passed
  to [`toJSON`](https://codemirror.net/6/docs/ref/#state.EditorState.toJSON) when serializing as
  third argument.
  */
  static fromJSON(e, t = {}, i) {
    if (!e || typeof e.doc != "string")
      throw new RangeError("Invalid JSON representation for EditorState");
    let s = [];
    if (i) {
      for (let r in i)
        if (Object.prototype.hasOwnProperty.call(e, r)) {
          let o = i[r], l = e[r];
          s.push(o.init((a) => o.spec.fromJSON(l, a)));
        }
    }
    return Xe.create({
      doc: e.doc,
      selection: B.fromJSON(e.selection),
      extensions: t.extensions ? s.concat([t.extensions]) : s
    });
  }
  /**
  Create a new state. You'll usually only need this when
  initializing an editor—updated states are created by applying
  transactions.
  */
  static create(e = {}) {
    let t = Ho.resolve(e.extensions || [], /* @__PURE__ */ new Map()), i = e.doc instanceof Re ? e.doc : Re.of((e.doc || "").split(t.staticFacet(Xe.lineSeparator) || Na)), s = e.selection ? e.selection instanceof B ? e.selection : B.single(e.selection.anchor, e.selection.head) : B.single(0);
    return Td(s, i.length), t.staticFacet(Ka) || (s = s.asSingle()), new Xe(t, i, s, t.dynamicSlots.map(() => null), (r, o) => o.create(r), null);
  }
  /**
  The size (in columns) of a tab in the document, determined by
  the [`tabSize`](https://codemirror.net/6/docs/ref/#state.EditorState^tabSize) facet.
  */
  get tabSize() {
    return this.facet(Xe.tabSize);
  }
  /**
  Get the proper [line-break](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator)
  string for this state.
  */
  get lineBreak() {
    return this.facet(Xe.lineSeparator) || `
`;
  }
  /**
  Returns true when the editor is
  [configured](https://codemirror.net/6/docs/ref/#state.EditorState^readOnly) to be read-only.
  */
  get readOnly() {
    return this.facet(Ed);
  }
  /**
  Look up a translation for the given phrase (via the
  [`phrases`](https://codemirror.net/6/docs/ref/#state.EditorState^phrases) facet), or return the
  original string if no translation is found.
  
  If additional arguments are passed, they will be inserted in
  place of markers like `$1` (for the first value) and `$2`, etc.
  A single `$` is equivalent to `$1`, and `$$` will produce a
  literal dollar sign.
  */
  phrase(e, ...t) {
    for (let i of this.facet(Xe.phrases))
      if (Object.prototype.hasOwnProperty.call(i, e)) {
        e = i[e];
        break;
      }
    return t.length && (e = e.replace(/\$(\$|\d*)/g, (i, s) => {
      if (s == "$")
        return "$";
      let r = +(s || 1);
      return !r || r > t.length ? i : t[r - 1];
    })), e;
  }
  /**
  Find the values for a given language data field, provided by the
  the [`languageData`](https://codemirror.net/6/docs/ref/#state.EditorState^languageData) facet.
  
  Examples of language data fields are...
  
  - [`"commentTokens"`](https://codemirror.net/6/docs/ref/#commands.CommentTokens) for specifying
    comment syntax.
  - [`"autocomplete"`](https://codemirror.net/6/docs/ref/#autocomplete.autocompletion^config.override)
    for providing language-specific completion sources.
  - [`"wordChars"`](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) for adding
    characters that should be considered part of words in this
    language.
  - [`"closeBrackets"`](https://codemirror.net/6/docs/ref/#autocomplete.CloseBracketConfig) controls
    bracket closing behavior.
  */
  languageDataAt(e, t, i = -1) {
    let s = [];
    for (let r of this.facet(Cd))
      for (let o of r(this, t, i))
        Object.prototype.hasOwnProperty.call(o, e) && s.push(o[e]);
    return s;
  }
  /**
  Return a function that can categorize strings (expected to
  represent a single [grapheme cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak))
  into one of:
  
   - Word (contains an alphanumeric character or a character
     explicitly listed in the local language's `"wordChars"`
     language data, which should be a string)
   - Space (contains only whitespace)
   - Other (anything else)
  */
  charCategorizer(e) {
    let t = this.languageDataAt("wordChars", e);
    return wv(t.length ? t[0] : "");
  }
  /**
  Find the word at the given position, meaning the range
  containing all [word](https://codemirror.net/6/docs/ref/#state.CharCategory.Word) characters
  around it. If no word characters are adjacent to the position,
  this returns null.
  */
  wordAt(e) {
    let { text: t, from: i, length: s } = this.doc.lineAt(e), r = this.charCategorizer(e), o = e - i, l = e - i;
    for (; o > 0; ) {
      let a = _t(t, o, !1);
      if (r(t.slice(a, o)) != hn.Word)
        break;
      o = a;
    }
    for (; l < s; ) {
      let a = _t(t, l);
      if (r(t.slice(l, a)) != hn.Word)
        break;
      l = a;
    }
    return o == l ? null : B.range(o + i, l + i);
  }
}
Xe.allowMultipleSelections = Ka;
Xe.tabSize = /* @__PURE__ */ me.define({
  combine: (n) => n.length ? n[0] : 4
});
Xe.lineSeparator = Ad;
Xe.readOnly = Ed;
Xe.phrases = /* @__PURE__ */ me.define({
  compare(n, e) {
    let t = Object.keys(n), i = Object.keys(e);
    return t.length == i.length && t.every((s) => n[s] == e[s]);
  }
});
Xe.languageData = Cd;
Xe.changeFilter = Rd;
Xe.transactionFilter = Md;
Xe.transactionExtender = Xd;
Tl.reconfigure = /* @__PURE__ */ ze.define();
function Jh(n, e, t = {}) {
  let i = {};
  for (let s of n)
    for (let r of Object.keys(s)) {
      let o = s[r], l = i[r];
      if (l === void 0)
        i[r] = o;
      else if (!(l === o || o === void 0)) if (Object.hasOwnProperty.call(t, r))
        i[r] = t[r](l, o);
      else
        throw new Error("Config merge conflict for field " + r);
    }
  for (let s in e)
    i[s] === void 0 && (i[s] = e[s]);
  return i;
}
class Xn {
  /**
  Compare this value with another value. Used when comparing
  rangesets. The default implementation compares by identity.
  Unless you are only creating a fixed number of unique instances
  of your value type, it is a good idea to implement this
  properly.
  */
  eq(e) {
    return this == e;
  }
  /**
  Create a [range](https://codemirror.net/6/docs/ref/#state.Range) with this value.
  */
  range(e, t = e) {
    return th.create(e, t, this);
  }
}
Xn.prototype.startSide = Xn.prototype.endSide = 0;
Xn.prototype.point = !1;
Xn.prototype.mapMode = Xt.TrackDel;
function ec(n, e) {
  return n == e || n.constructor == e.constructor && n.eq(e);
}
let th = class zd {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.value = i;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new zd(e, t, i);
  }
};
function ih(n, e) {
  return n.from - e.from || n.value.startSide - e.value.startSide;
}
class tc {
  constructor(e, t, i, s) {
    this.from = e, this.to = t, this.value = i, this.maxPoint = s;
  }
  get length() {
    return this.to[this.to.length - 1];
  }
  // Find the index of the given position and side. Use the ranges'
  // `from` pos when `end == false`, `to` when `end == true`.
  findIndex(e, t, i, s = 0) {
    let r = i ? this.to : this.from;
    for (let o = s, l = r.length; ; ) {
      if (o == l)
        return o;
      let a = o + l >> 1, h = r[a] - e || (i ? this.value[a].endSide : this.value[a].startSide) - t;
      if (a == o)
        return h >= 0 ? o : l;
      h >= 0 ? l = a : o = a + 1;
    }
  }
  between(e, t, i, s) {
    for (let r = this.findIndex(t, -1e9, !0), o = this.findIndex(i, 1e9, !1, r); r < o; r++)
      if (s(this.from[r] + e, this.to[r] + e, this.value[r]) === !1)
        return !1;
  }
  map(e, t) {
    let i = [], s = [], r = [], o = -1, l = -1;
    for (let a = 0; a < this.value.length; a++) {
      let h = this.value[a], c = this.from[a] + e, f = this.to[a] + e, d, p;
      if (c == f) {
        let O = t.mapPos(c, h.startSide, h.mapMode);
        if (O == null || (d = p = O, h.startSide != h.endSide && (p = t.mapPos(c, h.endSide), p < d)))
          continue;
      } else if (d = t.mapPos(c, h.startSide), p = t.mapPos(f, h.endSide), d > p || d == p && h.startSide > 0 && h.endSide <= 0)
        continue;
      (p - d || h.endSide - h.startSide) < 0 || (o < 0 && (o = d), h.point && (l = Math.max(l, p - d)), i.push(h), s.push(d - o), r.push(p - o));
    }
    return { mapped: i.length ? new tc(s, r, i, l) : null, pos: o };
  }
}
class Le {
  constructor(e, t, i, s) {
    this.chunkPos = e, this.chunk = t, this.nextLayer = i, this.maxPoint = s;
  }
  /**
  @internal
  */
  static create(e, t, i, s) {
    return new Le(e, t, i, s);
  }
  /**
  @internal
  */
  get length() {
    let e = this.chunk.length - 1;
    return e < 0 ? 0 : Math.max(this.chunkEnd(e), this.nextLayer.length);
  }
  /**
  The number of ranges in the set.
  */
  get size() {
    if (this.isEmpty)
      return 0;
    let e = this.nextLayer.size;
    for (let t of this.chunk)
      e += t.value.length;
    return e;
  }
  /**
  @internal
  */
  chunkEnd(e) {
    return this.chunkPos[e] + this.chunk[e].length;
  }
  /**
  Update the range set, optionally adding new ranges or filtering
  out existing ones.
  
  (Note: The type parameter is just there as a kludge to work
  around TypeScript variance issues that prevented `RangeSet<X>`
  from being a subtype of `RangeSet<Y>` when `X` is a subtype of
  `Y`.)
  */
  update(e) {
    let { add: t = [], sort: i = !1, filterFrom: s = 0, filterTo: r = this.length } = e, o = e.filter;
    if (t.length == 0 && !o)
      return this;
    if (i && (t = t.slice().sort(ih)), this.isEmpty)
      return t.length ? Le.of(t) : this;
    let l = new Dd(this, null, -1).goto(0), a = 0, h = [], c = new Jo();
    for (; l.value || a < t.length; )
      if (a < t.length && (l.from - t[a].from || l.startSide - t[a].value.startSide) >= 0) {
        let f = t[a++];
        c.addInner(f.from, f.to, f.value) || h.push(f);
      } else l.rangeIndex == 1 && l.chunkIndex < this.chunk.length && (a == t.length || this.chunkEnd(l.chunkIndex) < t[a].from) && (!o || s > this.chunkEnd(l.chunkIndex) || r < this.chunkPos[l.chunkIndex]) && c.addChunk(this.chunkPos[l.chunkIndex], this.chunk[l.chunkIndex]) ? l.nextChunk() : ((!o || s > l.to || r < l.from || o(l.from, l.to, l.value)) && (c.addInner(l.from, l.to, l.value) || h.push(th.create(l.from, l.to, l.value))), l.next());
    return c.finishInner(this.nextLayer.isEmpty && !h.length ? Le.empty : this.nextLayer.update({ add: h, filter: o, filterFrom: s, filterTo: r }));
  }
  /**
  Map this range set through a set of changes, return the new set.
  */
  map(e) {
    if (e.empty || this.isEmpty)
      return this;
    let t = [], i = [], s = -1;
    for (let o = 0; o < this.chunk.length; o++) {
      let l = this.chunkPos[o], a = this.chunk[o], h = e.touchesRange(l, l + a.length);
      if (h === !1)
        s = Math.max(s, a.maxPoint), t.push(a), i.push(e.mapPos(l));
      else if (h === !0) {
        let { mapped: c, pos: f } = a.map(l, e);
        c && (s = Math.max(s, c.maxPoint), t.push(c), i.push(f));
      }
    }
    let r = this.nextLayer.map(e);
    return t.length == 0 ? r : new Le(i, t, r || Le.empty, s);
  }
  /**
  Iterate over the ranges that touch the region `from` to `to`,
  calling `f` for each. There is no guarantee that the ranges will
  be reported in any specific order. When the callback returns
  `false`, iteration stops.
  */
  between(e, t, i) {
    if (!this.isEmpty) {
      for (let s = 0; s < this.chunk.length; s++) {
        let r = this.chunkPos[s], o = this.chunk[s];
        if (t >= r && e <= r + o.length && o.between(r, e - r, t - r, i) === !1)
          return;
      }
      this.nextLayer.between(e, t, i);
    }
  }
  /**
  Iterate over the ranges in this set, in order, including all
  ranges that end at or after `from`.
  */
  iter(e = 0) {
    return jr.from([this]).goto(e);
  }
  /**
  @internal
  */
  get isEmpty() {
    return this.nextLayer == this;
  }
  /**
  Iterate over the ranges in a collection of sets, in order,
  starting from `from`.
  */
  static iter(e, t = 0) {
    return jr.from(e).goto(t);
  }
  /**
  Iterate over two groups of sets, calling methods on `comparator`
  to notify it of possible differences.
  */
  static compare(e, t, i, s, r = -1) {
    let o = e.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= r), l = t.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= r), a = nf(o, l, i), h = new fr(o, a, r), c = new fr(l, a, r);
    i.iterGaps((f, d, p) => sf(h, f, c, d, p, s)), i.empty && i.length == 0 && sf(h, 0, c, 0, 0, s);
  }
  /**
  Compare the contents of two groups of range sets, returning true
  if they are equivalent in the given range.
  */
  static eq(e, t, i = 0, s) {
    s == null && (s = 999999999);
    let r = e.filter((c) => !c.isEmpty && t.indexOf(c) < 0), o = t.filter((c) => !c.isEmpty && e.indexOf(c) < 0);
    if (r.length != o.length)
      return !1;
    if (!r.length)
      return !0;
    let l = nf(r, o), a = new fr(r, l, 0).goto(i), h = new fr(o, l, 0).goto(i);
    for (; ; ) {
      if (a.to != h.to || !nh(a.active, h.active) || a.point && (!h.point || !ec(a.point, h.point)))
        return !1;
      if (a.to > s)
        return !0;
      a.next(), h.next();
    }
  }
  /**
  Iterate over a group of range sets at the same time, notifying
  the iterator about the ranges covering every given piece of
  content. Returns the open count (see
  [`SpanIterator.span`](https://codemirror.net/6/docs/ref/#state.SpanIterator.span)) at the end
  of the iteration.
  */
  static spans(e, t, i, s, r = -1) {
    let o = new fr(e, null, r).goto(t), l = t, a = o.openStart;
    for (; ; ) {
      let h = Math.min(o.to, i);
      if (o.point) {
        let c = o.activeForPoint(o.to), f = o.pointFrom < t ? c.length + 1 : o.point.startSide < 0 ? c.length : Math.min(c.length, a);
        s.point(l, h, o.point, c, f, o.pointRank), a = Math.min(o.openEnd(h), c.length);
      } else h > l && (s.span(l, h, o.active, a), a = o.openEnd(h));
      if (o.to > i)
        return a + (o.point && o.to > i ? 1 : 0);
      l = o.to, o.next();
    }
  }
  /**
  Create a range set for the given range or array of ranges. By
  default, this expects the ranges to be _sorted_ (by start
  position and, if two start at the same position,
  `value.startSide`). You can pass `true` as second argument to
  cause the method to sort them.
  */
  static of(e, t = !1) {
    let i = new Jo();
    for (let s of e instanceof th ? [e] : t ? xv(e) : e)
      i.add(s.from, s.to, s.value);
    return i.finish();
  }
  /**
  Join an array of range sets into a single set.
  */
  static join(e) {
    if (!e.length)
      return Le.empty;
    let t = e[e.length - 1];
    for (let i = e.length - 2; i >= 0; i--)
      for (let s = e[i]; s != Le.empty; s = s.nextLayer)
        t = new Le(s.chunkPos, s.chunk, t, Math.max(s.maxPoint, t.maxPoint));
    return t;
  }
}
Le.empty = /* @__PURE__ */ new Le([], [], null, -1);
function xv(n) {
  if (n.length > 1)
    for (let e = n[0], t = 1; t < n.length; t++) {
      let i = n[t];
      if (ih(e, i) > 0)
        return n.slice().sort(ih);
      e = i;
    }
  return n;
}
Le.empty.nextLayer = Le.empty;
class Jo {
  finishChunk(e) {
    this.chunks.push(new tc(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, e && (this.from = [], this.to = [], this.value = []);
  }
  /**
  Create an empty builder.
  */
  constructor() {
    this.chunks = [], this.chunkPos = [], this.chunkStart = -1, this.last = null, this.lastFrom = -1e9, this.lastTo = -1e9, this.from = [], this.to = [], this.value = [], this.maxPoint = -1, this.setMaxPoint = -1, this.nextLayer = null;
  }
  /**
  Add a range. Ranges should be added in sorted (by `from` and
  `value.startSide`) order.
  */
  add(e, t, i) {
    this.addInner(e, t, i) || (this.nextLayer || (this.nextLayer = new Jo())).add(e, t, i);
  }
  /**
  @internal
  */
  addInner(e, t, i) {
    let s = e - this.lastTo || i.startSide - this.last.endSide;
    if (s <= 0 && (e - this.lastFrom || i.startSide - this.last.startSide) < 0)
      throw new Error("Ranges must be added sorted by `from` position and `startSide`");
    return s < 0 ? !1 : (this.from.length == 250 && this.finishChunk(!0), this.chunkStart < 0 && (this.chunkStart = e), this.from.push(e - this.chunkStart), this.to.push(t - this.chunkStart), this.last = i, this.lastFrom = e, this.lastTo = t, this.value.push(i), i.point && (this.maxPoint = Math.max(this.maxPoint, t - e)), !0);
  }
  /**
  @internal
  */
  addChunk(e, t) {
    if ((e - this.lastTo || t.value[0].startSide - this.last.endSide) < 0)
      return !1;
    this.from.length && this.finishChunk(!0), this.setMaxPoint = Math.max(this.setMaxPoint, t.maxPoint), this.chunks.push(t), this.chunkPos.push(e);
    let i = t.value.length - 1;
    return this.last = t.value[i], this.lastFrom = t.from[i] + e, this.lastTo = t.to[i] + e, !0;
  }
  /**
  Finish the range set. Returns the new set. The builder can't be
  used anymore after this has been called.
  */
  finish() {
    return this.finishInner(Le.empty);
  }
  /**
  @internal
  */
  finishInner(e) {
    if (this.from.length && this.finishChunk(!1), this.chunks.length == 0)
      return e;
    let t = Le.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(e) : e, this.setMaxPoint);
    return this.from = null, t;
  }
}
function nf(n, e, t) {
  let i = /* @__PURE__ */ new Map();
  for (let r of n)
    for (let o = 0; o < r.chunk.length; o++)
      r.chunk[o].maxPoint <= 0 && i.set(r.chunk[o], r.chunkPos[o]);
  let s = /* @__PURE__ */ new Set();
  for (let r of e)
    for (let o = 0; o < r.chunk.length; o++) {
      let l = i.get(r.chunk[o]);
      l != null && (t ? t.mapPos(l) : l) == r.chunkPos[o] && !(t != null && t.touchesRange(l, l + r.chunk[o].length)) && s.add(r.chunk[o]);
    }
  return s;
}
class Dd {
  constructor(e, t, i, s = 0) {
    this.layer = e, this.skip = t, this.minPoint = i, this.rank = s;
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  get endSide() {
    return this.value ? this.value.endSide : 0;
  }
  goto(e, t = -1e9) {
    return this.chunkIndex = this.rangeIndex = 0, this.gotoInner(e, t, !1), this;
  }
  gotoInner(e, t, i) {
    for (; this.chunkIndex < this.layer.chunk.length; ) {
      let s = this.layer.chunk[this.chunkIndex];
      if (!(this.skip && this.skip.has(s) || this.layer.chunkEnd(this.chunkIndex) < e || s.maxPoint < this.minPoint))
        break;
      this.chunkIndex++, i = !1;
    }
    if (this.chunkIndex < this.layer.chunk.length) {
      let s = this.layer.chunk[this.chunkIndex].findIndex(e - this.layer.chunkPos[this.chunkIndex], t, !0);
      (!i || this.rangeIndex < s) && this.setRangeIndex(s);
    }
    this.next();
  }
  forward(e, t) {
    (this.to - e || this.endSide - t) < 0 && this.gotoInner(e, t, !0);
  }
  next() {
    for (; ; )
      if (this.chunkIndex == this.layer.chunk.length) {
        this.from = this.to = 1e9, this.value = null;
        break;
      } else {
        let e = this.layer.chunkPos[this.chunkIndex], t = this.layer.chunk[this.chunkIndex], i = e + t.from[this.rangeIndex];
        if (this.from = i, this.to = e + t.to[this.rangeIndex], this.value = t.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint)
          break;
      }
  }
  setRangeIndex(e) {
    if (e == this.layer.chunk[this.chunkIndex].value.length) {
      if (this.chunkIndex++, this.skip)
        for (; this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]); )
          this.chunkIndex++;
      this.rangeIndex = 0;
    } else
      this.rangeIndex = e;
  }
  nextChunk() {
    this.chunkIndex++, this.rangeIndex = 0, this.next();
  }
  compare(e) {
    return this.from - e.from || this.startSide - e.startSide || this.rank - e.rank || this.to - e.to || this.endSide - e.endSide;
  }
}
class jr {
  constructor(e) {
    this.heap = e;
  }
  static from(e, t = null, i = -1) {
    let s = [];
    for (let r = 0; r < e.length; r++)
      for (let o = e[r]; !o.isEmpty; o = o.nextLayer)
        o.maxPoint >= i && s.push(new Dd(o, t, i, r));
    return s.length == 1 ? s[0] : new jr(s);
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  goto(e, t = -1e9) {
    for (let i of this.heap)
      i.goto(e, t);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      ta(this.heap, i);
    return this.next(), this;
  }
  forward(e, t) {
    for (let i of this.heap)
      i.forward(e, t);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      ta(this.heap, i);
    (this.to - e || this.value.endSide - t) < 0 && this.next();
  }
  next() {
    if (this.heap.length == 0)
      this.from = this.to = 1e9, this.value = null, this.rank = -1;
    else {
      let e = this.heap[0];
      this.from = e.from, this.to = e.to, this.value = e.value, this.rank = e.rank, e.value && e.next(), ta(this.heap, 0);
    }
  }
}
function ta(n, e) {
  for (let t = n[e]; ; ) {
    let i = (e << 1) + 1;
    if (i >= n.length)
      break;
    let s = n[i];
    if (i + 1 < n.length && s.compare(n[i + 1]) >= 0 && (s = n[i + 1], i++), t.compare(s) < 0)
      break;
    n[i] = t, n[e] = s, e = i;
  }
}
class fr {
  constructor(e, t, i) {
    this.minPoint = i, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = jr.from(e, t, i);
  }
  goto(e, t = -1e9) {
    return this.cursor.goto(e, t), this.active.length = this.activeTo.length = this.activeRank.length = 0, this.minActive = -1, this.to = e, this.endSide = t, this.openStart = -1, this.next(), this;
  }
  forward(e, t) {
    for (; this.minActive > -1 && (this.activeTo[this.minActive] - e || this.active[this.minActive].endSide - t) < 0; )
      this.removeActive(this.minActive);
    this.cursor.forward(e, t);
  }
  removeActive(e) {
    mo(this.active, e), mo(this.activeTo, e), mo(this.activeRank, e), this.minActive = rf(this.active, this.activeTo);
  }
  addActive(e) {
    let t = 0, { value: i, to: s, rank: r } = this.cursor;
    for (; t < this.activeRank.length && (r - this.activeRank[t] || s - this.activeTo[t]) > 0; )
      t++;
    vo(this.active, t, i), vo(this.activeTo, t, s), vo(this.activeRank, t, r), e && vo(e, t, this.cursor.from), this.minActive = rf(this.active, this.activeTo);
  }
  // After calling this, if `this.point` != null, the next range is a
  // point. Otherwise, it's a regular range, covered by `this.active`.
  next() {
    let e = this.to, t = this.point;
    this.point = null;
    let i = this.openStart < 0 ? [] : null;
    for (; ; ) {
      let s = this.minActive;
      if (s > -1 && (this.activeTo[s] - this.cursor.from || this.active[s].endSide - this.cursor.startSide) < 0) {
        if (this.activeTo[s] > e) {
          this.to = this.activeTo[s], this.endSide = this.active[s].endSide;
          break;
        }
        this.removeActive(s), i && mo(i, s);
      } else if (this.cursor.value)
        if (this.cursor.from > e) {
          this.to = this.cursor.from, this.endSide = this.cursor.startSide;
          break;
        } else {
          let r = this.cursor.value;
          if (!r.point)
            this.addActive(i), this.cursor.next();
          else if (t && this.cursor.to == this.to && this.cursor.from < this.cursor.to)
            this.cursor.next();
          else {
            this.point = r, this.pointFrom = this.cursor.from, this.pointRank = this.cursor.rank, this.to = this.cursor.to, this.endSide = r.endSide, this.cursor.next(), this.forward(this.to, this.endSide);
            break;
          }
        }
      else {
        this.to = this.endSide = 1e9;
        break;
      }
    }
    if (i) {
      this.openStart = 0;
      for (let s = i.length - 1; s >= 0 && i[s] < e; s--)
        this.openStart++;
    }
  }
  activeForPoint(e) {
    if (!this.active.length)
      return this.active;
    let t = [];
    for (let i = this.active.length - 1; i >= 0 && !(this.activeRank[i] < this.pointRank); i--)
      (this.activeTo[i] > e || this.activeTo[i] == e && this.active[i].endSide >= this.point.endSide) && t.push(this.active[i]);
    return t.reverse();
  }
  openEnd(e) {
    let t = 0;
    for (let i = this.activeTo.length - 1; i >= 0 && this.activeTo[i] > e; i--)
      t++;
    return t;
  }
}
function sf(n, e, t, i, s, r) {
  n.goto(e), t.goto(i);
  let o = i + s, l = i, a = i - e, h = !!r.boundChange;
  for (let c = !1; ; ) {
    let f = n.to + a - t.to, d = f || n.endSide - t.endSide, p = d < 0 ? n.to + a : t.to, O = Math.min(p, o);
    if (n.point || t.point ? (n.point && t.point && ec(n.point, t.point) && nh(n.activeForPoint(n.to), t.activeForPoint(t.to)) || r.comparePoint(l, O, n.point, t.point), c = !1) : (c && r.boundChange(l), O > l && !nh(n.active, t.active) && r.compareRange(l, O, n.active, t.active), h && O < o && (f || n.openEnd(p) != t.openEnd(p)) && (c = !0)), p > o)
      break;
    l = p, d <= 0 && n.next(), d >= 0 && t.next();
  }
}
function nh(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (n[t] != e[t] && !ec(n[t], e[t]))
      return !1;
  return !0;
}
function mo(n, e) {
  for (let t = e, i = n.length - 1; t < i; t++)
    n[t] = n[t + 1];
  n.pop();
}
function vo(n, e, t) {
  for (let i = n.length - 1; i >= e; i--)
    n[i + 1] = n[i];
  n[e] = t;
}
function rf(n, e) {
  let t = -1, i = 1e9;
  for (let s = 0; s < e.length; s++)
    (e[s] - i || n[s].endSide - n[t].endSide) < 0 && (t = s, i = e[s]);
  return t;
}
function Zl(n, e, t = n.length) {
  let i = 0;
  for (let s = 0; s < t && s < n.length; )
    n.charCodeAt(s) == 9 ? (i += e - i % e, s++) : (i++, s = _t(n, s));
  return i;
}
function Sv(n, e, t, i) {
  for (let s = 0, r = 0; ; ) {
    if (r >= e)
      return s;
    if (s == n.length)
      break;
    r += n.charCodeAt(s) == 9 ? t - r % t : 1, s = _t(n, s);
  }
  return n.length;
}
const sh = "ͼ", of = typeof Symbol > "u" ? "__" + sh : Symbol.for(sh), rh = typeof Symbol > "u" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet"), lf = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {};
class Fs {
  // :: (Object<Style>, ?{finish: ?(string) → string})
  // Create a style module from the given spec.
  //
  // When `finish` is given, it is called on regular (non-`@`)
  // selectors (after `&` expansion) to compute the final selector.
  constructor(e, t) {
    this.rules = [];
    let { finish: i } = t || {};
    function s(o) {
      return /^@/.test(o) ? [o] : o.split(/,\s*/);
    }
    function r(o, l, a, h) {
      let c = [], f = /^@(\w+)\b/.exec(o[0]), d = f && f[1] == "keyframes";
      if (f && l == null) return a.push(o[0] + ";");
      for (let p in l) {
        let O = l[p];
        if (/&/.test(p))
          r(
            p.split(/,\s*/).map((g) => o.map((m) => g.replace(/&/, m))).reduce((g, m) => g.concat(m)),
            O,
            a
          );
        else if (O && typeof O == "object") {
          if (!f) throw new RangeError("The value of a property (" + p + ") should be a primitive value.");
          r(s(p), O, c, d);
        } else O != null && c.push(p.replace(/_.*/, "").replace(/[A-Z]/g, (g) => "-" + g.toLowerCase()) + ": " + O + ";");
      }
      (c.length || d) && a.push((i && !f && !h ? o.map(i) : o).join(", ") + " {" + c.join(" ") + "}");
    }
    for (let o in e) r(s(o), e[o], this.rules);
  }
  // :: () → string
  // Returns a string containing the module's CSS rules.
  getRules() {
    return this.rules.join(`
`);
  }
  // :: () → string
  // Generate a new unique CSS class name.
  static newName() {
    let e = lf[of] || 1;
    return lf[of] = e + 1, sh + e.toString(36);
  }
  // :: (union<Document, ShadowRoot>, union<[StyleModule], StyleModule>, ?{nonce: ?string})
  //
  // Mount the given set of modules in the given DOM root, which ensures
  // that the CSS rules defined by the module are available in that
  // context.
  //
  // Rules are only added to the document once per root.
  //
  // Rule order will follow the order of the modules, so that rules from
  // modules later in the array take precedence of those from earlier
  // modules. If you call this function multiple times for the same root
  // in a way that changes the order of already mounted modules, the old
  // order will be changed.
  //
  // If a Content Security Policy nonce is provided, it is added to
  // the `<style>` tag generated by the library.
  static mount(e, t, i) {
    let s = e[rh], r = i && i.nonce;
    s ? r && s.setNonce(r) : s = new Qv(e, r), s.mount(Array.isArray(t) ? t : [t], e);
  }
}
let af = /* @__PURE__ */ new Map();
class Qv {
  constructor(e, t) {
    let i = e.ownerDocument || e, s = i.defaultView;
    if (!e.head && e.adoptedStyleSheets && s.CSSStyleSheet) {
      let r = af.get(i);
      if (r) return e[rh] = r;
      this.sheet = new s.CSSStyleSheet(), af.set(i, this);
    } else
      this.styleTag = i.createElement("style"), t && this.styleTag.setAttribute("nonce", t);
    this.modules = [], e[rh] = this;
  }
  mount(e, t) {
    let i = this.sheet, s = 0, r = 0;
    for (let o = 0; o < e.length; o++) {
      let l = e[o], a = this.modules.indexOf(l);
      if (a < r && a > -1 && (this.modules.splice(a, 1), r--, a = -1), a == -1) {
        if (this.modules.splice(r++, 0, l), i) for (let h = 0; h < l.rules.length; h++)
          i.insertRule(l.rules[h], s++);
      } else {
        for (; r < a; ) s += this.modules[r++].rules.length;
        s += l.rules.length, r++;
      }
    }
    if (i)
      t.adoptedStyleSheets.indexOf(this.sheet) < 0 && (t.adoptedStyleSheets = [this.sheet, ...t.adoptedStyleSheets]);
    else {
      let o = "";
      for (let a = 0; a < this.modules.length; a++)
        o += this.modules[a].getRules() + `
`;
      this.styleTag.textContent = o;
      let l = t.head || t;
      this.styleTag.parentNode != l && l.insertBefore(this.styleTag, l.firstChild);
    }
  }
  setNonce(e) {
    this.styleTag && this.styleTag.getAttribute("nonce") != e && this.styleTag.setAttribute("nonce", e);
  }
}
var En = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
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
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, zr = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, kv = typeof navigator < "u" && /Mac/.test(navigator.platform), $v = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var xt = 0; xt < 10; xt++) En[48 + xt] = En[96 + xt] = String(xt);
for (var xt = 1; xt <= 24; xt++) En[xt + 111] = "F" + xt;
for (var xt = 65; xt <= 90; xt++)
  En[xt] = String.fromCharCode(xt + 32), zr[xt] = String.fromCharCode(xt);
for (var ia in En) zr.hasOwnProperty(ia) || (zr[ia] = En[ia]);
function Pv(n) {
  var e = kv && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || $v && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? zr : En)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
let Mt = typeof navigator < "u" ? navigator : { userAgent: "", vendor: "", platform: "" }, oh = typeof document < "u" ? document : { documentElement: { style: {} } };
const lh = /* @__PURE__ */ /Edge\/(\d+)/.exec(Mt.userAgent), Id = /* @__PURE__ */ /MSIE \d/.test(Mt.userAgent), ah = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Mt.userAgent), Cl = !!(Id || ah || lh), hf = !Cl && /* @__PURE__ */ /gecko\/(\d+)/i.test(Mt.userAgent), na = !Cl && /* @__PURE__ */ /Chrome\/(\d+)/.exec(Mt.userAgent), cf = "webkitFontSmoothing" in oh.documentElement.style, hh = !Cl && /* @__PURE__ */ /Apple Computer/.test(Mt.vendor), ff = hh && (/* @__PURE__ */ /Mobile\/\w+/.test(Mt.userAgent) || Mt.maxTouchPoints > 2);
var se = {
  mac: ff || /* @__PURE__ */ /Mac/.test(Mt.platform),
  windows: /* @__PURE__ */ /Win/.test(Mt.platform),
  linux: /* @__PURE__ */ /Linux|X11/.test(Mt.platform),
  ie: Cl,
  ie_version: Id ? oh.documentMode || 6 : ah ? +ah[1] : lh ? +lh[1] : 0,
  gecko: hf,
  gecko_version: hf ? +(/* @__PURE__ */ /Firefox\/(\d+)/.exec(Mt.userAgent) || [0, 0])[1] : 0,
  chrome: !!na,
  chrome_version: na ? +na[1] : 0,
  ios: ff,
  android: /* @__PURE__ */ /Android\b/.test(Mt.userAgent),
  webkit: cf,
  webkit_version: cf ? +(/* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(Mt.userAgent) || [0, 0])[1] : 0,
  safari: hh,
  safari_version: hh ? +(/* @__PURE__ */ /\bVersion\/(\d+(\.\d+)?)/.exec(Mt.userAgent) || [0, 0])[1] : 0,
  tabSize: oh.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
};
function ic(n, e) {
  for (let t in n)
    t == "class" && e.class ? e.class += " " + n.class : t == "style" && e.style ? e.style += ";" + n.style : e[t] = n[t];
  return e;
}
const el = /* @__PURE__ */ Object.create(null);
function nc(n, e, t) {
  if (n == e)
    return !0;
  n || (n = el), e || (e = el);
  let i = Object.keys(n), s = Object.keys(e);
  if (i.length - 0 != s.length - 0)
    return !1;
  for (let r of i)
    if (r != t && (s.indexOf(r) == -1 || n[r] !== e[r]))
      return !1;
  return !0;
}
function _v(n, e) {
  for (let t = n.attributes.length - 1; t >= 0; t--) {
    let i = n.attributes[t].name;
    e[i] == null && n.removeAttribute(i);
  }
  for (let t in e) {
    let i = e[t];
    t == "style" ? n.style.cssText = i : n.getAttribute(t) != i && n.setAttribute(t, i);
  }
}
function uf(n, e, t) {
  let i = !1;
  if (e)
    for (let s in e)
      t && s in t || (i = !0, s == "style" ? n.style.cssText = "" : n.removeAttribute(s));
  if (t)
    for (let s in t)
      e && e[s] == t[s] || (i = !0, s == "style" ? n.style.cssText = t[s] : n.setAttribute(s, t[s]));
  return i;
}
function Tv(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t = 0; t < n.attributes.length; t++) {
    let i = n.attributes[t];
    e[i.name] = i.value;
  }
  return e;
}
class or {
  /**
  Compare this instance to another instance of the same type.
  (TypeScript can't express this, but only instances of the same
  specific class will be passed to this method.) This is used to
  avoid redrawing widgets when they are replaced by a new
  decoration of the same type. The default implementation just
  returns `false`, which will cause new instances of the widget to
  always be redrawn.
  */
  eq(e) {
    return !1;
  }
  /**
  Update a DOM element created by a widget of the same type (but
  different, non-`eq` content) to reflect this widget. May return
  true to indicate that it could update, false to indicate it
  couldn't (in which case the widget will be redrawn). The default
  implementation just returns false.
  */
  updateDOM(e, t, i) {
    return !1;
  }
  /**
  @internal
  */
  compare(e) {
    return this == e || this.constructor == e.constructor && this.eq(e);
  }
  /**
  The estimated height this widget will have, to be used when
  estimating the height of content that hasn't been drawn. May
  return -1 to indicate you don't know. The default implementation
  returns -1.
  */
  get estimatedHeight() {
    return -1;
  }
  /**
  For inline widgets that are displayed inline (as opposed to
  `inline-block`) and introduce line breaks (through `<br>` tags
  or textual newlines), this must indicate the amount of line
  breaks they introduce. Defaults to 0.
  */
  get lineBreaks() {
    return 0;
  }
  /**
  Can be used to configure which kinds of events inside the widget
  should be ignored by the editor. The default is to ignore all
  events.
  */
  ignoreEvent(e) {
    return !0;
  }
  /**
  Override the way screen coordinates for positions at/in the
  widget are found. `pos` will be the offset into the widget, and
  `side` the side of the position that is being queried—less than
  zero for before, greater than zero for after, and zero for
  directly at that position.
  */
  coordsAt(e, t, i) {
    return null;
  }
  /**
  @internal
  */
  get isHidden() {
    return !1;
  }
  /**
  @internal
  */
  get editable() {
    return !1;
  }
  /**
  This is called when the an instance of the widget is removed
  from the editor view.
  */
  destroy(e) {
  }
}
var yi = /* @__PURE__ */ (function(n) {
  return n[n.Text = 0] = "Text", n[n.WidgetBefore = 1] = "WidgetBefore", n[n.WidgetAfter = 2] = "WidgetAfter", n[n.WidgetRange = 3] = "WidgetRange", n;
})(yi || (yi = {}));
class We extends Xn {
  constructor(e, t, i, s) {
    super(), this.startSide = e, this.endSide = t, this.widget = i, this.spec = s;
  }
  /**
  @internal
  */
  get heightRelevant() {
    return !1;
  }
  /**
  Create a mark decoration, which influences the styling of the
  content in its range. Nested mark decorations will cause nested
  DOM elements to be created. Nesting order is determined by
  precedence of the [facet](https://codemirror.net/6/docs/ref/#view.EditorView^decorations), with
  the higher-precedence decorations creating the inner DOM nodes.
  Such elements are split on line boundaries and on the boundaries
  of lower-precedence decorations.
  */
  static mark(e) {
    return new so(e);
  }
  /**
  Create a widget decoration, which displays a DOM element at the
  given position.
  */
  static widget(e) {
    let t = Math.max(-1e4, Math.min(1e4, e.side || 0)), i = !!e.block;
    return t += i && !e.inlineOrder ? t > 0 ? 3e8 : -4e8 : t > 0 ? 1e8 : -1e8, new fs(e, t, t, i, e.widget || null, !1);
  }
  /**
  Create a replace decoration which replaces the given range with
  a widget, or simply hides it.
  */
  static replace(e) {
    let t = !!e.block, i, s;
    if (e.isBlockGap)
      i = -5e8, s = 4e8;
    else {
      let { start: r, end: o } = Wd(e, t);
      i = (r ? t ? -3e8 : -1 : 5e8) - 1, s = (o ? t ? 2e8 : 1 : -6e8) + 1;
    }
    return new fs(e, i, s, t, e.widget || null, !0);
  }
  /**
  Create a line decoration, which can add DOM attributes to the
  line starting at the given position.
  */
  static line(e) {
    return new ro(e);
  }
  /**
  Build a [`DecorationSet`](https://codemirror.net/6/docs/ref/#view.DecorationSet) from the given
  decorated range or ranges. If the ranges aren't already sorted,
  pass `true` for `sort` to make the library sort them for you.
  */
  static set(e, t = !1) {
    return Le.of(e, t);
  }
  /**
  @internal
  */
  hasHeight() {
    return this.widget ? this.widget.estimatedHeight > -1 : !1;
  }
}
We.none = Le.empty;
class so extends We {
  constructor(e) {
    let { start: t, end: i } = Wd(e);
    super(t ? -1 : 5e8, i ? 1 : -6e8, null, e), this.tagName = e.tagName || "span", this.attrs = e.class && e.attributes ? ic(e.attributes, { class: e.class }) : e.class ? { class: e.class } : e.attributes || el;
  }
  eq(e) {
    return this == e || e instanceof so && this.tagName == e.tagName && nc(this.attrs, e.attrs);
  }
  range(e, t = e) {
    if (e >= t)
      throw new RangeError("Mark decorations may not be empty");
    return super.range(e, t);
  }
}
so.prototype.point = !1;
class ro extends We {
  constructor(e) {
    super(-2e8, -2e8, null, e);
  }
  eq(e) {
    return e instanceof ro && this.spec.class == e.spec.class && nc(this.spec.attributes, e.spec.attributes);
  }
  range(e, t = e) {
    if (t != e)
      throw new RangeError("Line decoration ranges must be zero-length");
    return super.range(e, t);
  }
}
ro.prototype.mapMode = Xt.TrackBefore;
ro.prototype.point = !0;
class fs extends We {
  constructor(e, t, i, s, r, o) {
    super(t, i, r, e), this.block = s, this.isReplace = o, this.mapMode = s ? t <= 0 ? Xt.TrackBefore : Xt.TrackAfter : Xt.TrackDel;
  }
  // Only relevant when this.block == true
  get type() {
    return this.startSide != this.endSide ? yi.WidgetRange : this.startSide <= 0 ? yi.WidgetBefore : yi.WidgetAfter;
  }
  get heightRelevant() {
    return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
  }
  eq(e) {
    return e instanceof fs && Zv(this.widget, e.widget) && this.block == e.block && this.startSide == e.startSide && this.endSide == e.endSide;
  }
  range(e, t = e) {
    if (this.isReplace && (e > t || e == t && this.startSide > 0 && this.endSide <= 0))
      throw new RangeError("Invalid range for replacement decoration");
    if (!this.isReplace && t != e)
      throw new RangeError("Widget decorations can only have zero-length ranges");
    return super.range(e, t);
  }
}
fs.prototype.point = !0;
function Wd(n, e = !1) {
  let { inclusiveStart: t, inclusiveEnd: i } = n;
  return t == null && (t = n.inclusive), i == null && (i = n.inclusive), { start: t ?? e, end: i ?? e };
}
function Zv(n, e) {
  return n == e || !!(n && e && n.compare(e));
}
function Cs(n, e, t, i = 0) {
  let s = t.length - 1;
  s >= 0 && t[s] + i >= n ? t[s] = Math.max(t[s], e) : t.push(n, e);
}
class Dr extends Xn {
  constructor(e, t, i) {
    super(), this.tagName = e, this.attributes = t, this.rank = i;
  }
  eq(e) {
    return e == this || e instanceof Dr && this.tagName == e.tagName && nc(this.attributes, e.attributes);
  }
  /**
  Create a block wrapper object with the given tag name and
  attributes.
  */
  static create(e) {
    return new Dr(e.tagName, e.attributes || el, e.rank == null ? 50 : Math.max(0, Math.min(e.rank, 100)));
  }
  /**
  Create a range set from the given block wrapper ranges.
  */
  static set(e, t = !1) {
    return Le.of(e, t);
  }
}
Dr.prototype.startSide = Dr.prototype.endSide = -1;
function Ir(n) {
  let e;
  return n.nodeType == 11 ? e = n.getSelection ? n : n.ownerDocument : e = n, e.getSelection();
}
function ch(n, e) {
  return e ? n == e || n.contains(e.nodeType != 1 ? e.parentNode : e) : !1;
}
function Cr(n, e) {
  if (!e.anchorNode)
    return !1;
  try {
    return ch(n, e.anchorNode);
  } catch {
    return !1;
  }
}
function Ar(n) {
  return n.nodeType == 3 ? Yr(n, 0, n.nodeValue.length).getClientRects() : n.nodeType == 1 ? n.getClientRects() : [];
}
function Rr(n, e, t, i) {
  return t ? df(n, e, t, i, -1) || df(n, e, t, i, 1) : !1;
}
function Ln(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}
function tl(n) {
  return n.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(n.nodeName);
}
function df(n, e, t, i, s) {
  for (; ; ) {
    if (n == t && e == i)
      return !0;
    if (e == (s < 0 ? 0 : On(n))) {
      if (n.nodeName == "DIV")
        return !1;
      let r = n.parentNode;
      if (!r || r.nodeType != 1)
        return !1;
      e = Ln(n) + (s < 0 ? 0 : 1), n = r;
    } else if (n.nodeType == 1) {
      if (n = n.childNodes[e + (s < 0 ? -1 : 0)], n.nodeType == 1 && n.contentEditable == "false")
        return !1;
      e = s < 0 ? On(n) : 0;
    } else
      return !1;
  }
}
function On(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function Wr(n, e) {
  let { left: t, right: i } = n;
  if (t == i)
    return n;
  let s = e ? t : i;
  return { left: s, right: s, top: n.top, bottom: n.bottom };
}
function Cv(n) {
  let e = n.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: n.innerWidth,
    top: 0,
    bottom: n.innerHeight
  };
}
function Yd(n, e) {
  let t = e.width / n.offsetWidth, i = e.height / n.offsetHeight;
  return (t > 0.995 && t < 1.005 || !isFinite(t) || Math.abs(e.width - n.offsetWidth) < 1) && (t = 1), (i > 0.995 && i < 1.005 || !isFinite(i) || Math.abs(e.height - n.offsetHeight) < 1) && (i = 1), { scaleX: t, scaleY: i };
}
function Av(n, e, t, i, s, r, o, l) {
  let a = n.ownerDocument, h = a.defaultView || window;
  for (let c = n, f = !1; c && !f; )
    if (c.nodeType == 1) {
      let d, p = c == a.body, O = 1, g = 1;
      if (p)
        d = Cv(h);
      else {
        if (/^(fixed|sticky)$/.test(getComputedStyle(c).position) && (f = !0), c.scrollHeight <= c.clientHeight && c.scrollWidth <= c.clientWidth) {
          c = c.assignedSlot || c.parentNode;
          continue;
        }
        let x = c.getBoundingClientRect();
        ({ scaleX: O, scaleY: g } = Yd(c, x)), d = {
          left: x.left,
          right: x.left + c.clientWidth * O,
          top: x.top,
          bottom: x.top + c.clientHeight * g
        };
      }
      let m = 0, v = 0;
      if (s == "nearest")
        e.top < d.top + o ? (v = e.top - (d.top + o), t > 0 && e.bottom > d.bottom + v && (v = e.bottom - d.bottom + o)) : e.bottom > d.bottom - o && (v = e.bottom - d.bottom + o, t < 0 && e.top - v < d.top && (v = e.top - (d.top + o)));
      else {
        let x = e.bottom - e.top, S = d.bottom - d.top;
        v = (s == "center" && x <= S ? e.top + x / 2 - S / 2 : s == "start" || s == "center" && t < 0 ? e.top - o : e.bottom - S + o) - d.top;
      }
      if (i == "nearest" ? e.left < d.left + r ? (m = e.left - (d.left + r), t > 0 && e.right > d.right + m && (m = e.right - d.right + r)) : e.right > d.right - r && (m = e.right - d.right + r, t < 0 && e.left < d.left + m && (m = e.left - (d.left + r))) : m = (i == "center" ? e.left + (e.right - e.left) / 2 - (d.right - d.left) / 2 : i == "start" == l ? e.left - r : e.right - (d.right - d.left) + r) - d.left, m || v)
        if (p)
          h.scrollBy(m, v);
        else {
          let x = 0, S = 0;
          if (v) {
            let _ = c.scrollTop;
            c.scrollTop += v / g, S = (c.scrollTop - _) * g;
          }
          if (m) {
            let _ = c.scrollLeft;
            c.scrollLeft += m / O, x = (c.scrollLeft - _) * O;
          }
          e = {
            left: e.left - x,
            top: e.top - S,
            right: e.right - x,
            bottom: e.bottom - S
          }, x && Math.abs(x - m) < 1 && (i = "nearest"), S && Math.abs(S - v) < 1 && (s = "nearest");
        }
      if (p)
        break;
      (e.top < d.top || e.bottom > d.bottom || e.left < d.left || e.right > d.right) && (e = {
        left: Math.max(e.left, d.left),
        right: Math.min(e.right, d.right),
        top: Math.max(e.top, d.top),
        bottom: Math.min(e.bottom, d.bottom)
      }), c = c.assignedSlot || c.parentNode;
    } else if (c.nodeType == 11)
      c = c.host;
    else
      break;
}
function qd(n, e = !0) {
  let t = n.ownerDocument, i = null, s = null;
  for (let r = n.parentNode; r && !(r == t.body || (!e || i) && s); )
    if (r.nodeType == 1)
      !s && r.scrollHeight > r.clientHeight && (s = r), e && !i && r.scrollWidth > r.clientWidth && (i = r), r = r.assignedSlot || r.parentNode;
    else if (r.nodeType == 11)
      r = r.host;
    else
      break;
  return { x: i, y: s };
}
class Rv {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  eq(e) {
    return this.anchorNode == e.anchorNode && this.anchorOffset == e.anchorOffset && this.focusNode == e.focusNode && this.focusOffset == e.focusOffset;
  }
  setRange(e) {
    let { anchorNode: t, focusNode: i } = e;
    this.set(t, Math.min(e.anchorOffset, t ? On(t) : 0), i, Math.min(e.focusOffset, i ? On(i) : 0));
  }
  set(e, t, i, s) {
    this.anchorNode = e, this.anchorOffset = t, this.focusNode = i, this.focusOffset = s;
  }
}
let Wn = null;
se.safari && se.safari_version >= 26 && (Wn = !1);
function Bd(n) {
  if (n.setActive)
    return n.setActive();
  if (Wn)
    return n.focus(Wn);
  let e = [];
  for (let t = n; t && (e.push(t, t.scrollTop, t.scrollLeft), t != t.ownerDocument); t = t.parentNode)
    ;
  if (n.focus(Wn == null ? {
    get preventScroll() {
      return Wn = { preventScroll: !0 }, !0;
    }
  } : void 0), !Wn) {
    Wn = !1;
    for (let t = 0; t < e.length; ) {
      let i = e[t++], s = e[t++], r = e[t++];
      i.scrollTop != s && (i.scrollTop = s), i.scrollLeft != r && (i.scrollLeft = r);
    }
  }
}
let pf;
function Yr(n, e, t = e) {
  let i = pf || (pf = document.createRange());
  return i.setEnd(n, t), i.setStart(n, e), i;
}
function As(n, e, t, i) {
  let s = { key: e, code: e, keyCode: t, which: t, cancelable: !0 };
  i && ({ altKey: s.altKey, ctrlKey: s.ctrlKey, shiftKey: s.shiftKey, metaKey: s.metaKey } = i);
  let r = new KeyboardEvent("keydown", s);
  r.synthetic = !0, n.dispatchEvent(r);
  let o = new KeyboardEvent("keyup", s);
  return o.synthetic = !0, n.dispatchEvent(o), r.defaultPrevented || o.defaultPrevented;
}
function Mv(n) {
  for (; n; ) {
    if (n && (n.nodeType == 9 || n.nodeType == 11 && n.host))
      return n;
    n = n.assignedSlot || n.parentNode;
  }
  return null;
}
function Xv(n, e) {
  let t = e.focusNode, i = e.focusOffset;
  if (!t || e.anchorNode != t || e.anchorOffset != i)
    return !1;
  for (i = Math.min(i, On(t)); ; )
    if (i) {
      if (t.nodeType != 1)
        return !1;
      let s = t.childNodes[i - 1];
      s.contentEditable == "false" ? i-- : (t = s, i = On(t));
    } else {
      if (t == n)
        return !0;
      i = Ln(t), t = t.parentNode;
    }
}
function Vd(n) {
  return n instanceof Window ? n.pageYOffset > Math.max(0, n.document.documentElement.scrollHeight - n.innerHeight - 4) : n.scrollTop > Math.max(1, n.scrollHeight - n.clientHeight - 4);
}
function Nd(n, e) {
  for (let t = n, i = e; ; ) {
    if (t.nodeType == 3 && i > 0)
      return { node: t, offset: i };
    if (t.nodeType == 1 && i > 0) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[i - 1], i = On(t);
    } else if (t.parentNode && !tl(t))
      i = Ln(t), t = t.parentNode;
    else
      return null;
  }
}
function Gd(n, e) {
  for (let t = n, i = e; ; ) {
    if (t.nodeType == 3 && i < t.nodeValue.length)
      return { node: t, offset: i };
    if (t.nodeType == 1 && i < t.childNodes.length) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[i], i = 0;
    } else if (t.parentNode && !tl(t))
      i = Ln(t) + 1, t = t.parentNode;
    else
      return null;
  }
}
class Zi {
  constructor(e, t, i = !0) {
    this.node = e, this.offset = t, this.precise = i;
  }
  static before(e, t) {
    return new Zi(e.parentNode, Ln(e), t);
  }
  static after(e, t) {
    return new Zi(e.parentNode, Ln(e) + 1, t);
  }
}
var nt = /* @__PURE__ */ (function(n) {
  return n[n.LTR = 0] = "LTR", n[n.RTL = 1] = "RTL", n;
})(nt || (nt = {}));
const us = nt.LTR, sc = nt.RTL;
function Ud(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    e.push(1 << +n[t]);
  return e;
}
const Ev = /* @__PURE__ */ Ud("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), Lv = /* @__PURE__ */ Ud("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), fh = /* @__PURE__ */ Object.create(null), Ei = [];
for (let n of ["()", "[]", "{}"]) {
  let e = /* @__PURE__ */ n.charCodeAt(0), t = /* @__PURE__ */ n.charCodeAt(1);
  fh[e] = t, fh[t] = -e;
}
function Fd(n) {
  return n <= 247 ? Ev[n] : 1424 <= n && n <= 1524 ? 2 : 1536 <= n && n <= 1785 ? Lv[n - 1536] : 1774 <= n && n <= 2220 ? 4 : 8192 <= n && n <= 8204 ? 256 : 64336 <= n && n <= 65023 ? 4 : 1;
}
const jv = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
class Vi {
  /**
  The direction of this span.
  */
  get dir() {
    return this.level % 2 ? sc : us;
  }
  /**
  @internal
  */
  constructor(e, t, i) {
    this.from = e, this.to = t, this.level = i;
  }
  /**
  @internal
  */
  side(e, t) {
    return this.dir == t == e ? this.to : this.from;
  }
  /**
  @internal
  */
  forward(e, t) {
    return e == (this.dir == t);
  }
  /**
  @internal
  */
  static find(e, t, i, s) {
    let r = -1;
    for (let o = 0; o < e.length; o++) {
      let l = e[o];
      if (l.from <= t && l.to >= t) {
        if (l.level == i)
          return o;
        (r < 0 || (s != 0 ? s < 0 ? l.from < t : l.to > t : e[r].level > l.level)) && (r = o);
      }
    }
    if (r < 0)
      throw new RangeError("Index out of range");
    return r;
  }
}
function Hd(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++) {
    let i = n[t], s = e[t];
    if (i.from != s.from || i.to != s.to || i.direction != s.direction || !Hd(i.inner, s.inner))
      return !1;
  }
  return !0;
}
const Ie = [];
function zv(n, e, t, i, s) {
  for (let r = 0; r <= i.length; r++) {
    let o = r ? i[r - 1].to : e, l = r < i.length ? i[r].from : t, a = r ? 256 : s;
    for (let h = o, c = a, f = a; h < l; h++) {
      let d = Fd(n.charCodeAt(h));
      d == 512 ? d = c : d == 8 && f == 4 && (d = 16), Ie[h] = d == 4 ? 2 : d, d & 7 && (f = d), c = d;
    }
    for (let h = o, c = a, f = a; h < l; h++) {
      let d = Ie[h];
      if (d == 128)
        h < l - 1 && c == Ie[h + 1] && c & 24 ? d = Ie[h] = c : Ie[h] = 256;
      else if (d == 64) {
        let p = h + 1;
        for (; p < l && Ie[p] == 64; )
          p++;
        let O = h && c == 8 || p < t && Ie[p] == 8 ? f == 1 ? 1 : 8 : 256;
        for (let g = h; g < p; g++)
          Ie[g] = O;
        h = p - 1;
      } else d == 8 && f == 1 && (Ie[h] = 1);
      c = d, d & 7 && (f = d);
    }
  }
}
function Dv(n, e, t, i, s) {
  let r = s == 1 ? 2 : 1;
  for (let o = 0, l = 0, a = 0; o <= i.length; o++) {
    let h = o ? i[o - 1].to : e, c = o < i.length ? i[o].from : t;
    for (let f = h, d, p, O; f < c; f++)
      if (p = fh[d = n.charCodeAt(f)])
        if (p < 0) {
          for (let g = l - 3; g >= 0; g -= 3)
            if (Ei[g + 1] == -p) {
              let m = Ei[g + 2], v = m & 2 ? s : m & 4 ? m & 1 ? r : s : 0;
              v && (Ie[f] = Ie[Ei[g]] = v), l = g;
              break;
            }
        } else {
          if (Ei.length == 189)
            break;
          Ei[l++] = f, Ei[l++] = d, Ei[l++] = a;
        }
      else if ((O = Ie[f]) == 2 || O == 1) {
        let g = O == s;
        a = g ? 0 : 1;
        for (let m = l - 3; m >= 0; m -= 3) {
          let v = Ei[m + 2];
          if (v & 2)
            break;
          if (g)
            Ei[m + 2] |= 2;
          else {
            if (v & 4)
              break;
            Ei[m + 2] |= 4;
          }
        }
      }
  }
}
function Iv(n, e, t, i) {
  for (let s = 0, r = i; s <= t.length; s++) {
    let o = s ? t[s - 1].to : n, l = s < t.length ? t[s].from : e;
    for (let a = o; a < l; ) {
      let h = Ie[a];
      if (h == 256) {
        let c = a + 1;
        for (; ; )
          if (c == l) {
            if (s == t.length)
              break;
            c = t[s++].to, l = s < t.length ? t[s].from : e;
          } else if (Ie[c] == 256)
            c++;
          else
            break;
        let f = r == 1, d = (c < e ? Ie[c] : i) == 1, p = f == d ? f ? 1 : 2 : i;
        for (let O = c, g = s, m = g ? t[g - 1].to : n; O > a; )
          O == m && (O = t[--g].from, m = g ? t[g - 1].to : n), Ie[--O] = p;
        a = c;
      } else
        r = h, a++;
    }
  }
}
function uh(n, e, t, i, s, r, o) {
  let l = i % 2 ? 2 : 1;
  if (i % 2 == s % 2)
    for (let a = e, h = 0; a < t; ) {
      let c = !0, f = !1;
      if (h == r.length || a < r[h].from) {
        let g = Ie[a];
        g != l && (c = !1, f = g == 16);
      }
      let d = !c && l == 1 ? [] : null, p = c ? i : i + 1, O = a;
      e: for (; ; )
        if (h < r.length && O == r[h].from) {
          if (f)
            break e;
          let g = r[h];
          if (!c)
            for (let m = g.to, v = h + 1; ; ) {
              if (m == t)
                break e;
              if (v < r.length && r[v].from == m)
                m = r[v++].to;
              else {
                if (Ie[m] == l)
                  break e;
                break;
              }
            }
          if (h++, d)
            d.push(g);
          else {
            g.from > a && o.push(new Vi(a, g.from, p));
            let m = g.direction == us != !(p % 2);
            dh(n, m ? i + 1 : i, s, g.inner, g.from, g.to, o), a = g.to;
          }
          O = g.to;
        } else {
          if (O == t || (c ? Ie[O] != l : Ie[O] == l))
            break;
          O++;
        }
      d ? uh(n, a, O, i + 1, s, d, o) : a < O && o.push(new Vi(a, O, p)), a = O;
    }
  else
    for (let a = t, h = r.length; a > e; ) {
      let c = !0, f = !1;
      if (!h || a > r[h - 1].to) {
        let g = Ie[a - 1];
        g != l && (c = !1, f = g == 16);
      }
      let d = !c && l == 1 ? [] : null, p = c ? i : i + 1, O = a;
      e: for (; ; )
        if (h && O == r[h - 1].to) {
          if (f)
            break e;
          let g = r[--h];
          if (!c)
            for (let m = g.from, v = h; ; ) {
              if (m == e)
                break e;
              if (v && r[v - 1].to == m)
                m = r[--v].from;
              else {
                if (Ie[m - 1] == l)
                  break e;
                break;
              }
            }
          if (d)
            d.push(g);
          else {
            g.to < a && o.push(new Vi(g.to, a, p));
            let m = g.direction == us != !(p % 2);
            dh(n, m ? i + 1 : i, s, g.inner, g.from, g.to, o), a = g.from;
          }
          O = g.from;
        } else {
          if (O == e || (c ? Ie[O - 1] != l : Ie[O - 1] == l))
            break;
          O--;
        }
      d ? uh(n, O, a, i + 1, s, d, o) : O < a && o.push(new Vi(O, a, p)), a = O;
    }
}
function dh(n, e, t, i, s, r, o) {
  let l = e % 2 ? 2 : 1;
  zv(n, s, r, i, l), Dv(n, s, r, i, l), Iv(s, r, i, l), uh(n, s, r, e, t, i, o);
}
function Wv(n, e, t) {
  if (!n)
    return [new Vi(0, 0, e == sc ? 1 : 0)];
  if (e == us && !t.length && !jv.test(n))
    return Kd(n.length);
  if (t.length)
    for (; n.length > Ie.length; )
      Ie[Ie.length] = 256;
  let i = [], s = e == us ? 0 : 1;
  return dh(n, s, s, t, 0, n.length, i), i;
}
function Kd(n) {
  return [new Vi(0, n, 0)];
}
let Jd = "";
function Yv(n, e, t, i, s) {
  var r;
  let o = i.head - n.from, l = Vi.find(e, o, (r = i.bidiLevel) !== null && r !== void 0 ? r : -1, i.assoc), a = e[l], h = a.side(s, t);
  if (o == h) {
    let d = l += s ? 1 : -1;
    if (d < 0 || d >= e.length)
      return null;
    a = e[l = d], o = a.side(!s, t), h = a.side(s, t);
  }
  let c = _t(n.text, o, a.forward(s, t));
  (c < a.from || c > a.to) && (c = h), Jd = n.text.slice(Math.min(o, c), Math.max(o, c));
  let f = l == (s ? e.length - 1 : 0) ? null : e[l + (s ? 1 : -1)];
  return f && c == h && f.level + (s ? 0 : 1) < a.level ? B.cursor(f.side(!s, t) + n.from, f.forward(s, t) ? 1 : -1, f.level) : B.cursor(c + n.from, a.forward(s, t) ? -1 : 1, a.level);
}
function qv(n, e, t) {
  for (let i = e; i < t; i++) {
    let s = Fd(n.charCodeAt(i));
    if (s == 1)
      return us;
    if (s == 2 || s == 4)
      return sc;
  }
  return us;
}
const ep = /* @__PURE__ */ me.define(), tp = /* @__PURE__ */ me.define(), ip = /* @__PURE__ */ me.define(), np = /* @__PURE__ */ me.define(), ph = /* @__PURE__ */ me.define(), sp = /* @__PURE__ */ me.define(), rp = /* @__PURE__ */ me.define(), rc = /* @__PURE__ */ me.define(), oc = /* @__PURE__ */ me.define(), op = /* @__PURE__ */ me.define({
  combine: (n) => n.some((e) => e)
}), Bv = /* @__PURE__ */ me.define({
  combine: (n) => n.some((e) => e)
}), lp = /* @__PURE__ */ me.define();
class Rs {
  constructor(e, t, i, s, r, o = !1) {
    this.range = e, this.y = t, this.x = i, this.yMargin = s, this.xMargin = r, this.isSnapshot = o;
  }
  map(e) {
    return e.empty ? this : new Rs(this.range.map(e), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
  clip(e) {
    return this.range.to <= e.doc.length ? this : new Rs(B.cursor(e.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
}
const bo = /* @__PURE__ */ ze.define({ map: (n, e) => n.map(e) }), ap = /* @__PURE__ */ ze.define();
function ni(n, e, t) {
  let i = n.facet(np);
  i.length ? i[0](e) : window.onerror && window.onerror(String(e), t, void 0, void 0, e) || (t ? console.error(t + ":", e) : console.error(e));
}
const an = /* @__PURE__ */ me.define({ combine: (n) => n.length ? n[0] : !0 });
let Vv = 0;
const $s = /* @__PURE__ */ me.define({
  combine(n) {
    return n.filter((e, t) => {
      for (let i = 0; i < t; i++)
        if (n[i].plugin == e.plugin)
          return !1;
      return !0;
    });
  }
});
class Ki {
  constructor(e, t, i, s, r) {
    this.id = e, this.create = t, this.domEventHandlers = i, this.domEventObservers = s, this.baseExtensions = r(this), this.extension = this.baseExtensions.concat($s.of({ plugin: this, arg: void 0 }));
  }
  /**
  Create an extension for this plugin with the given argument.
  */
  of(e) {
    return this.baseExtensions.concat($s.of({ plugin: this, arg: e }));
  }
  /**
  Define a plugin from a constructor function that creates the
  plugin's value, given an editor view.
  */
  static define(e, t) {
    const { eventHandlers: i, eventObservers: s, provide: r, decorations: o } = t || {};
    return new Ki(Vv++, e, i, s, (l) => {
      let a = [];
      return o && a.push(Al.of((h) => {
        let c = h.plugin(l);
        return c ? o(c) : We.none;
      })), r && a.push(r(l)), a;
    });
  }
  /**
  Create a plugin for a class whose constructor takes a single
  editor view as argument.
  */
  static fromClass(e, t) {
    return Ki.define((i, s) => new e(i, s), t);
  }
}
class sa {
  constructor(e) {
    this.spec = e, this.mustUpdate = null, this.value = null;
  }
  get plugin() {
    return this.spec && this.spec.plugin;
  }
  update(e) {
    if (this.value) {
      if (this.mustUpdate) {
        let t = this.mustUpdate;
        if (this.mustUpdate = null, this.value.update)
          try {
            this.value.update(t);
          } catch (i) {
            if (ni(t.state, i, "CodeMirror plugin crashed"), this.value.destroy)
              try {
                this.value.destroy();
              } catch {
              }
            this.deactivate();
          }
      }
    } else if (this.spec)
      try {
        this.value = this.spec.plugin.create(e, this.spec.arg);
      } catch (t) {
        ni(e.state, t, "CodeMirror plugin crashed"), this.deactivate();
      }
    return this;
  }
  destroy(e) {
    var t;
    if (!((t = this.value) === null || t === void 0) && t.destroy)
      try {
        this.value.destroy();
      } catch (i) {
        ni(e.state, i, "CodeMirror plugin crashed");
      }
  }
  deactivate() {
    this.spec = this.value = null;
  }
}
const hp = /* @__PURE__ */ me.define(), lc = /* @__PURE__ */ me.define(), Al = /* @__PURE__ */ me.define(), cp = /* @__PURE__ */ me.define(), ac = /* @__PURE__ */ me.define(), oo = /* @__PURE__ */ me.define(), fp = /* @__PURE__ */ me.define();
function Of(n, e) {
  let t = n.state.facet(fp);
  if (!t.length)
    return t;
  let i = t.map((r) => r instanceof Function ? r(n) : r), s = [];
  return Le.spans(i, e.from, e.to, {
    point() {
    },
    span(r, o, l, a) {
      let h = r - e.from, c = o - e.from, f = s;
      for (let d = l.length - 1; d >= 0; d--, a--) {
        let p = l[d].spec.bidiIsolate, O;
        if (p == null && (p = qv(e.text, h, c)), a > 0 && f.length && (O = f[f.length - 1]).to == h && O.direction == p)
          O.to = c, f = O.inner;
        else {
          let g = { from: h, to: c, direction: p, inner: [] };
          f.push(g), f = g.inner;
        }
      }
    }
  }), s;
}
const up = /* @__PURE__ */ me.define();
function hc(n) {
  let e = 0, t = 0, i = 0, s = 0;
  for (let r of n.state.facet(up)) {
    let o = r(n);
    o && (o.left != null && (e = Math.max(e, o.left)), o.right != null && (t = Math.max(t, o.right)), o.top != null && (i = Math.max(i, o.top)), o.bottom != null && (s = Math.max(s, o.bottom)));
  }
  return { left: e, right: t, top: i, bottom: s };
}
const yr = /* @__PURE__ */ me.define();
class di {
  constructor(e, t, i, s) {
    this.fromA = e, this.toA = t, this.fromB = i, this.toB = s;
  }
  join(e) {
    return new di(Math.min(this.fromA, e.fromA), Math.max(this.toA, e.toA), Math.min(this.fromB, e.fromB), Math.max(this.toB, e.toB));
  }
  addToSet(e) {
    let t = e.length, i = this;
    for (; t > 0; t--) {
      let s = e[t - 1];
      if (!(s.fromA > i.toA)) {
        if (s.toA < i.fromA)
          break;
        i = i.join(s), e.splice(t - 1, 1);
      }
    }
    return e.splice(t, 0, i), e;
  }
  // Extend a set to cover all the content in `ranges`, which is a
  // flat array with each pair of numbers representing fromB/toB
  // positions. These pairs are generated in unchanged ranges, so the
  // offset between doc A and doc B is the same for their start and
  // end points.
  static extendWithRanges(e, t) {
    if (t.length == 0)
      return e;
    let i = [];
    for (let s = 0, r = 0, o = 0; ; ) {
      let l = s < e.length ? e[s].fromB : 1e9, a = r < t.length ? t[r] : 1e9, h = Math.min(l, a);
      if (h == 1e9)
        break;
      let c = h + o, f = h, d = c;
      for (; ; )
        if (r < t.length && t[r] <= f) {
          let p = t[r + 1];
          r += 2, f = Math.max(f, p);
          for (let O = s; O < e.length && e[O].fromB <= f; O++)
            o = e[O].toA - e[O].toB;
          d = Math.max(d, p + o);
        } else if (s < e.length && e[s].fromB <= f) {
          let p = e[s++];
          f = Math.max(f, p.toB), d = Math.max(d, p.toA), o = p.toA - p.toB;
        } else
          break;
      i.push(new di(c, d, h, f));
    }
    return i;
  }
}
class il {
  constructor(e, t, i) {
    this.view = e, this.state = t, this.transactions = i, this.flags = 0, this.startState = e.state, this.changes = pt.empty(this.startState.doc.length);
    for (let r of i)
      this.changes = this.changes.compose(r.changes);
    let s = [];
    this.changes.iterChangedRanges((r, o, l, a) => s.push(new di(r, o, l, a))), this.changedRanges = s;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new il(e, t, i);
  }
  /**
  Tells you whether the [viewport](https://codemirror.net/6/docs/ref/#view.EditorView.viewport) or
  [visible ranges](https://codemirror.net/6/docs/ref/#view.EditorView.visibleRanges) changed in this
  update.
  */
  get viewportChanged() {
    return (this.flags & 4) > 0;
  }
  /**
  Returns true when
  [`viewportChanged`](https://codemirror.net/6/docs/ref/#view.ViewUpdate.viewportChanged) is true
  and the viewport change is not just the result of mapping it in
  response to document changes.
  */
  get viewportMoved() {
    return (this.flags & 8) > 0;
  }
  /**
  Indicates whether the height of a block element in the editor
  changed in this update.
  */
  get heightChanged() {
    return (this.flags & 2) > 0;
  }
  /**
  Returns true when the document was modified or the size of the
  editor, or elements within the editor, changed.
  */
  get geometryChanged() {
    return this.docChanged || (this.flags & 18) > 0;
  }
  /**
  True when this update indicates a focus change.
  */
  get focusChanged() {
    return (this.flags & 1) > 0;
  }
  /**
  Whether the document changed in this update.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Whether the selection was explicitly set in this update.
  */
  get selectionSet() {
    return this.transactions.some((e) => e.selection);
  }
  /**
  @internal
  */
  get empty() {
    return this.flags == 0 && this.transactions.length == 0;
  }
}
const Nv = [];
class st {
  constructor(e, t, i = 0) {
    this.dom = e, this.length = t, this.flags = i, this.parent = null, e.cmTile = this;
  }
  get breakAfter() {
    return this.flags & 1;
  }
  get children() {
    return Nv;
  }
  isWidget() {
    return !1;
  }
  get isHidden() {
    return !1;
  }
  isComposite() {
    return !1;
  }
  isLine() {
    return !1;
  }
  isText() {
    return !1;
  }
  isBlock() {
    return !1;
  }
  get domAttrs() {
    return null;
  }
  sync(e) {
    if (this.flags |= 2, this.flags & 4) {
      this.flags &= -5;
      let t = this.domAttrs;
      t && _v(this.dom, t);
    }
  }
  toString() {
    return this.constructor.name + (this.children.length ? `(${this.children})` : "") + (this.breakAfter ? "#" : "");
  }
  destroy() {
    this.parent = null;
  }
  setDOM(e) {
    this.dom = e, e.cmTile = this;
  }
  get posAtStart() {
    return this.parent ? this.parent.posBefore(this) : 0;
  }
  get posAtEnd() {
    return this.posAtStart + this.length;
  }
  posBefore(e, t = this.posAtStart) {
    let i = t;
    for (let s of this.children) {
      if (s == e)
        return i;
      i += s.length + s.breakAfter;
    }
    throw new RangeError("Invalid child in posBefore");
  }
  posAfter(e) {
    return this.posBefore(e) + e.length;
  }
  covers(e) {
    return !0;
  }
  coordsIn(e, t, i) {
    return null;
  }
  domPosFor(e, t) {
    let i = Ln(this.dom), s = this.length ? e > 0 : t > 0;
    return new Zi(this.parent.dom, i + (s ? 1 : 0), e == 0 || e == this.length);
  }
  markDirty(e) {
    this.flags &= -3, e && (this.flags |= 4), this.parent && this.parent.flags & 2 && this.parent.markDirty(!1);
  }
  get overrideDOMText() {
    return null;
  }
  get root() {
    for (let e = this; e; e = e.parent)
      if (e instanceof Ml)
        return e;
    return null;
  }
  static get(e) {
    return e.cmTile;
  }
}
class Rl extends st {
  constructor(e) {
    super(e, 0), this._children = [];
  }
  isComposite() {
    return !0;
  }
  get children() {
    return this._children;
  }
  get lastChild() {
    return this.children.length ? this.children[this.children.length - 1] : null;
  }
  append(e) {
    this.children.push(e), e.parent = this;
  }
  sync(e) {
    if (this.flags & 2)
      return;
    super.sync(e);
    let t = this.dom, i = null, s, r = (e == null ? void 0 : e.node) == t ? e : null, o = 0;
    for (let l of this.children) {
      if (l.sync(e), o += l.length + l.breakAfter, s = i ? i.nextSibling : t.firstChild, r && s != l.dom && (r.written = !0), l.dom.parentNode == t)
        for (; s && s != l.dom; )
          s = gf(s);
      else
        t.insertBefore(l.dom, s);
      i = l.dom;
    }
    for (s = i ? i.nextSibling : t.firstChild, r && s && (r.written = !0); s; )
      s = gf(s);
    this.length = o;
  }
}
function gf(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class Ml extends Rl {
  constructor(e, t) {
    super(t), this.view = e;
  }
  owns(e) {
    for (; e; e = e.parent)
      if (e == this)
        return !0;
    return !1;
  }
  isBlock() {
    return !0;
  }
  nearest(e) {
    for (; ; ) {
      if (!e)
        return null;
      let t = st.get(e);
      if (t && this.owns(t))
        return t;
      e = e.parentNode;
    }
  }
  blockTiles(e) {
    for (let t = [], i = this, s = 0, r = 0; ; )
      if (s == i.children.length) {
        if (!t.length)
          return;
        i = i.parent, i.breakAfter && r++, s = t.pop();
      } else {
        let o = i.children[s++];
        if (o instanceof un)
          t.push(s), i = o, s = 0;
        else {
          let l = r + o.length, a = e(o, r);
          if (a !== void 0)
            return a;
          r = l + o.breakAfter;
        }
      }
  }
  // Find the block at the given position. If side < -1, make sure to
  // stay before block widgets at that position, if side > 1, after
  // such widgets (used for selection drawing, which needs to be able
  // to get coordinates for positions that aren't valid cursor positions).
  resolveBlock(e, t) {
    let i, s = -1, r, o = -1;
    if (this.blockTiles((l, a) => {
      let h = a + l.length;
      if (e >= a && e <= h) {
        if (l.isWidget() && t >= -1 && t <= 1) {
          if (l.flags & 32)
            return !0;
          l.flags & 16 && (i = void 0);
        }
        (a < e || e == h && (t < -1 ? l.length : l.covers(1))) && (!i || !l.isWidget() && i.isWidget()) && (i = l, s = e - a), (h > e || e == a && (t > 1 ? l.length : l.covers(-1))) && (!r || !l.isWidget() && r.isWidget()) && (r = l, o = e - a);
      }
    }), !i && !r)
      throw new Error("No tile at position " + e);
    return i && t < 0 || !r ? { tile: i, offset: s } : { tile: r, offset: o };
  }
}
class un extends Rl {
  constructor(e, t) {
    super(e), this.wrapper = t;
  }
  isBlock() {
    return !0;
  }
  covers(e) {
    return this.children.length ? e < 0 ? this.children[0].covers(-1) : this.lastChild.covers(1) : !1;
  }
  get domAttrs() {
    return this.wrapper.attributes;
  }
  static of(e, t) {
    let i = new un(t || document.createElement(e.tagName), e);
    return t || (i.flags |= 4), i;
  }
}
class Hs extends Rl {
  constructor(e, t) {
    super(e), this.attrs = t;
  }
  isLine() {
    return !0;
  }
  static start(e, t, i) {
    let s = new Hs(t || document.createElement("div"), e);
    return (!t || !i) && (s.flags |= 4), s;
  }
  get domAttrs() {
    return this.attrs;
  }
  // Find the tile associated with a given position in this line.
  resolveInline(e, t, i) {
    let s = null, r = -1, o = null, l = -1;
    function a(c, f) {
      for (let d = 0, p = 0; d < c.children.length && p <= f; d++) {
        let O = c.children[d], g = p + O.length;
        g >= f && (O.isComposite() ? a(O, f - p) : (!o || o.isHidden && (t > 0 && !(o.flags & 32) || i && Uv(o, O))) && (g > f || O.flags & 32) ? (o = O, l = f - p) : (p < f || O.flags & 16 && !O.isHidden) && (s = O, r = f - p)), p = g;
      }
    }
    a(this, e);
    let h = (t < 0 ? s : o) || s || o;
    return h ? { tile: h, offset: h == s ? r : l } : null;
  }
  coordsIn(e, t, i) {
    let s = this.resolveInline(e, t, !0);
    return s ? s.tile.coordsIn(Math.max(0, s.offset), t, i) : Gv(this);
  }
  domIn(e, t) {
    let i = this.resolveInline(e, t);
    if (i) {
      let { tile: s, offset: r } = i;
      if (this.dom.contains(s.dom))
        return s.isText() ? new Zi(s.dom, Math.min(s.dom.nodeValue.length, r)) : s.domPosFor(r, s.flags & 16 ? 1 : s.flags & 32 ? -1 : t);
      let o = i.tile.parent, l = !1;
      for (let a of o.children) {
        if (l)
          return new Zi(a.dom, 0);
        a == i.tile && (l = !0);
      }
    }
    return new Zi(this.dom, 0);
  }
}
function Gv(n) {
  let e = n.dom.lastChild;
  if (!e)
    return n.dom.getBoundingClientRect();
  let t = Ar(e);
  return t[t.length - 1] || null;
}
function Uv(n, e) {
  let t = n.coordsIn(0, 1), i = e.coordsIn(0, 1);
  return t && i && i.top < t.bottom;
}
class Vt extends Rl {
  constructor(e, t) {
    super(e), this.mark = t;
  }
  get domAttrs() {
    return this.mark.attrs;
  }
  static of(e, t) {
    let i = new Vt(t || document.createElement(e.tagName), e);
    return t || (i.flags |= 4), i;
  }
}
class Vn extends st {
  constructor(e, t) {
    super(e, t.length), this.text = t;
  }
  sync(e) {
    this.flags & 2 || (super.sync(e), this.dom.nodeValue != this.text && (e && e.node == this.dom && (e.written = !0), this.dom.nodeValue = this.text));
  }
  isText() {
    return !0;
  }
  toString() {
    return JSON.stringify(this.text);
  }
  coordsIn(e, t, i) {
    let s = this.dom.nodeValue.length;
    e > s && (e = s);
    let r = e, o = e, l = 0;
    e == 0 && t < 0 || e == s && t >= 0 ? se.chrome || se.gecko || (e ? (r--, l = 1) : o < s && (o++, l = -1)) : t < 0 ? r-- : o < s && o++;
    let a = Yr(this.dom, r, o).getClientRects();
    if (!a.length)
      return null;
    let h = a[(l ? l < 0 : t >= 0) ? 0 : a.length - 1];
    return se.safari && !l && h.width == 0 && (h = Array.prototype.find.call(a, (c) => c.width) || h), i == null ? h : Wr(h, (l ? l > 0 : t < 0) == i);
  }
  static of(e, t) {
    let i = new Vn(t || document.createTextNode(e), e);
    return t || (i.flags |= 2), i;
  }
}
class ds extends st {
  constructor(e, t, i, s) {
    super(e, t, s), this.widget = i;
  }
  isWidget() {
    return !0;
  }
  get isHidden() {
    return this.widget.isHidden;
  }
  covers(e) {
    return this.flags & 48 ? !1 : (this.flags & (e < 0 ? 64 : 128)) > 0;
  }
  coordsIn(e, t) {
    return this.coordsInWidget(e, t, !1);
  }
  coordsInWidget(e, t, i) {
    let s = this.widget.coordsAt(this.dom, e, t);
    if (s)
      return s;
    if (i)
      return Wr(this.dom.getBoundingClientRect(), this.length ? e == 0 : t <= 0);
    {
      let r = this.dom.getClientRects(), o = null;
      if (!r.length)
        return null;
      let l = this.flags & 16 ? !0 : this.flags & 32 ? !1 : e > 0;
      for (let a = l ? r.length - 1 : 0; o = r[a], !(e > 0 ? a == 0 : a == r.length - 1 || o.top < o.bottom); a += l ? -1 : 1)
        ;
      return Wr(o, !l);
    }
  }
  get overrideDOMText() {
    if (!this.length)
      return Re.empty;
    let { root: e } = this;
    if (!e)
      return Re.empty;
    let t = this.posAtStart;
    return e.view.state.doc.slice(t, t + this.length);
  }
  destroy() {
    super.destroy(), this.widget.destroy(this.dom);
  }
  static of(e, t, i, s, r) {
    return r || (r = e.toDOM(t), e.editable || (r.contentEditable = "false")), new ds(r, i, e, s);
  }
}
class nl extends st {
  constructor(e) {
    let t = document.createElement("img");
    t.className = "cm-widgetBuffer", t.setAttribute("aria-hidden", "true"), super(t, 0, e);
  }
  get isHidden() {
    return !0;
  }
  get overrideDOMText() {
    return Re.empty;
  }
  coordsIn(e, t, i) {
    let s = this.dom.getBoundingClientRect();
    return i == null ? s : Wr(s, t > 0 == i);
  }
}
class Fv {
  constructor(e) {
    this.index = 0, this.beforeBreak = !1, this.parents = [], this.tile = e;
  }
  // Advance by the given distance. If side is -1, stop leaving or
  // entering tiles, or skipping zero-length tiles, once the distance
  // has been traversed. When side is 1, leave, enter, or skip
  // everything at the end position.
  advance(e, t, i) {
    let { tile: s, index: r, beforeBreak: o, parents: l } = this;
    for (; e || t > 0; )
      if (s.isComposite())
        if (o) {
          if (!e)
            break;
          i && i.break(), e--, o = !1;
        } else if (r == s.children.length) {
          if (!e && !l.length)
            break;
          i && i.leave(s), o = !!s.breakAfter, { tile: s, index: r } = l.pop(), r++;
        } else {
          let a = s.children[r], h = a.breakAfter;
          (t > 0 ? a.length <= e : a.length < e) && (!i || i.skip(a, 0, a.length) !== !1 || !a.isComposite) ? (o = !!h, r++, e -= a.length) : (l.push({ tile: s, index: r }), s = a, r = 0, i && a.isComposite() && i.enter(a));
        }
      else if (r == s.length)
        o = !!s.breakAfter, { tile: s, index: r } = l.pop(), r++;
      else if (e) {
        let a = Math.min(e, s.length - r);
        i && i.skip(s, r, r + a), e -= a, r += a;
      } else
        break;
    return this.tile = s, this.index = r, this.beforeBreak = o, this;
  }
  get root() {
    return this.parents.length ? this.parents[0].tile : this.tile;
  }
}
class Hv {
  constructor(e, t, i, s) {
    this.from = e, this.to = t, this.wrapper = i, this.rank = s;
  }
}
class Kv {
  constructor(e, t, i) {
    this.cache = e, this.root = t, this.blockWrappers = i, this.curLine = null, this.lastBlock = null, this.afterWidget = null, this.pos = 0, this.wrappers = [], this.wrapperPos = 0;
  }
  addText(e, t, i, s) {
    var r;
    this.flushBuffer();
    let o = this.ensureMarks(t, i), l = o.lastChild;
    if (l && l.isText() && !(l.flags & 8) && l.length + e.length < 512) {
      this.cache.reused.set(
        l,
        2
        /* Reused.DOM */
      );
      let a = o.children[o.children.length - 1] = new Vn(l.dom, l.text + e);
      a.parent = o;
    } else
      o.append(s || Vn.of(e, (r = this.cache.find(Vn)) === null || r === void 0 ? void 0 : r.dom));
    this.pos += e.length, this.afterWidget = null;
  }
  addComposition(e, t) {
    let i = this.curLine;
    i.dom != t.line.dom && (i.setDOM(this.cache.reused.has(t.line) ? ra(t.line.dom) : t.line.dom), this.cache.reused.set(
      t.line,
      2
      /* Reused.DOM */
    ));
    let s = i;
    for (let l = t.marks.length - 1; l >= 0; l--) {
      let a = t.marks[l], h = s.lastChild;
      if (h instanceof Vt && h.mark.eq(a.mark))
        h.dom != a.dom && h.setDOM(ra(a.dom)), s = h;
      else {
        if (this.cache.reused.get(a)) {
          let f = st.get(a.dom);
          f && f.setDOM(ra(a.dom));
        }
        let c = Vt.of(a.mark, a.dom);
        s.append(c), s = c;
      }
      this.cache.reused.set(
        a,
        2
        /* Reused.DOM */
      );
    }
    let r = st.get(e.text);
    r && this.cache.reused.set(
      r,
      2
      /* Reused.DOM */
    );
    let o = new Vn(e.text, e.text.nodeValue);
    o.flags |= 8, this.pos = e.range.toB, s.append(o);
  }
  addInlineWidget(e, t, i) {
    let s = this.afterWidget && e.flags & 48 && (this.afterWidget.flags & 48) == (e.flags & 48);
    s || this.flushBuffer();
    let r = this.ensureMarks(t, i);
    !s && !(e.flags & 16) && r.append(this.getBuffer(1)), r.append(e), this.pos += e.length, this.afterWidget = e;
  }
  addMark(e, t, i) {
    this.flushBuffer(), this.ensureMarks(t, i).append(e), this.pos += e.length, this.afterWidget = null;
  }
  addBlockWidget(e) {
    this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
  }
  continueWidget(e) {
    let t = this.afterWidget || this.lastBlock;
    t.length += e, this.pos += e;
  }
  addLineStart(e, t) {
    var i;
    e || (e = dp);
    let s = Hs.start(e, t || ((i = this.cache.find(Hs)) === null || i === void 0 ? void 0 : i.dom), !!t);
    this.getBlockPos().append(this.lastBlock = this.curLine = s);
  }
  addLine(e) {
    this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
  }
  addBreak() {
    this.lastBlock.flags |= 1, this.endLine(), this.pos++;
  }
  addLineStartIfNotCovered(e) {
    this.blockPosCovered() || this.addLineStart(e);
  }
  ensureLine(e) {
    this.curLine || this.addLineStart(e);
  }
  ensureMarks(e, t) {
    var i;
    let s = this.curLine;
    for (let r = e.length - 1; r >= 0; r--) {
      let o = e[r], l;
      if (t > 0 && (l = s.lastChild) && l instanceof Vt && l.mark.eq(o))
        s = l, t--;
      else {
        let a = Vt.of(o, (i = this.cache.find(Vt, (h) => h.mark.eq(o))) === null || i === void 0 ? void 0 : i.dom);
        s.append(a), s = a, t = 0;
      }
    }
    return s;
  }
  endLine() {
    if (this.curLine) {
      this.flushBuffer();
      let e = this.curLine.lastChild;
      (!e || !mf(this.curLine, !1) || e.dom.nodeName != "BR" && e.isWidget() && !(se.ios && mf(this.curLine, !0))) && this.curLine.append(this.cache.findWidget(
        oa,
        0,
        32
        /* TileFlag.After */
      ) || new ds(
        oa.toDOM(),
        0,
        oa,
        32
        /* TileFlag.After */
      )), this.curLine = this.afterWidget = null;
    }
  }
  updateBlockWrappers() {
    this.wrapperPos > this.pos + 1e4 && (this.blockWrappers.goto(this.pos), this.wrappers.length = 0);
    for (let e = this.wrappers.length - 1; e >= 0; e--)
      this.wrappers[e].to < this.pos && this.wrappers.splice(e, 1);
    for (let e = this.blockWrappers; e.value && e.from <= this.pos; e.next())
      if (e.to >= this.pos) {
        let t = e.rank * 102 + e.value.rank, i = new Hv(e.from, e.to, e.value, t), s = this.wrappers.length;
        for (; s > 0 && (this.wrappers[s - 1].rank - i.rank || this.wrappers[s - 1].to - i.to) < 0; )
          s--;
        this.wrappers.splice(s, 0, i);
      }
    this.wrapperPos = this.pos;
  }
  getBlockPos() {
    var e;
    this.updateBlockWrappers();
    let t = this.root;
    for (let i of this.wrappers) {
      let s = t.lastChild;
      if (i.from < this.pos && s instanceof un && s.wrapper.eq(i.wrapper))
        t = s;
      else {
        let r = un.of(i.wrapper, (e = this.cache.find(un, (o) => o.wrapper.eq(i.wrapper))) === null || e === void 0 ? void 0 : e.dom);
        t.append(r), t = r;
      }
    }
    return t;
  }
  blockPosCovered() {
    let e = this.lastBlock;
    return e != null && !e.breakAfter && (!e.isWidget() || (e.flags & 160) > 0);
  }
  getBuffer(e) {
    let t = 2 | (e < 0 ? 16 : 32), i = this.cache.find(
      nl,
      void 0,
      1
      /* Reused.Full */
    );
    return i && (i.flags = t), i || new nl(t);
  }
  flushBuffer() {
    this.afterWidget && !(this.afterWidget.flags & 32) && (this.afterWidget.parent.append(this.getBuffer(-1)), this.afterWidget = null);
  }
}
class Jv {
  constructor(e) {
    this.skipCount = 0, this.text = "", this.textOff = 0, this.cursor = e.iter();
  }
  skip(e) {
    this.textOff + e <= this.text.length ? this.textOff += e : (this.skipCount += e - (this.text.length - this.textOff), this.text = "", this.textOff = 0);
  }
  next(e) {
    if (this.textOff == this.text.length) {
      let { value: s, lineBreak: r, done: o } = this.cursor.next(this.skipCount);
      if (this.skipCount = 0, o)
        throw new Error("Ran out of text content when drawing inline views");
      this.text = s;
      let l = this.textOff = Math.min(e, s.length);
      return r ? null : s.slice(0, l);
    }
    let t = Math.min(this.text.length, this.textOff + e), i = this.text.slice(this.textOff, t);
    return this.textOff = t, i;
  }
}
const sl = [ds, Hs, Vn, Vt, nl, un, Ml];
for (let n = 0; n < sl.length; n++)
  sl[n].bucket = n;
class e0 {
  constructor(e) {
    this.view = e, this.buckets = sl.map(() => []), this.index = sl.map(() => 0), this.reused = /* @__PURE__ */ new Map();
  }
  // Put a tile in the cache.
  add(e) {
    let t = e.constructor.bucket, i = this.buckets[t];
    i.length < 6 ? i.push(e) : i[
      this.index[t] = (this.index[t] + 1) % 6
      /* C.Bucket */
    ] = e;
  }
  find(e, t, i = 2) {
    let s = e.bucket, r = this.buckets[s], o = this.index[s];
    for (let l = 0; l < r.length; l++) {
      let a = (l + o) % r.length, h = r[a];
      if ((!t || t(h)) && !this.reused.has(h))
        return r.splice(a, 1), a < o && this.index[s]--, this.reused.set(h, i), h;
    }
    return null;
  }
  findWidget(e, t, i) {
    let s = this.buckets[0];
    if (s.length)
      for (let r = 0, o = 0; ; r++) {
        if (r == s.length) {
          if (o)
            return null;
          o = 1, r = 0;
        }
        let l = s[r];
        if (!this.reused.has(l) && (o == 0 ? l.widget.compare(e) : l.widget.constructor == e.constructor && e.updateDOM(l.dom, this.view, l.widget)))
          return s.splice(r, 1), r < this.index[0] && this.index[0]--, l.widget == e && l.length == t && (l.flags & 497) == i ? (this.reused.set(
            l,
            1
            /* Reused.Full */
          ), l) : (this.reused.set(
            l,
            2
            /* Reused.DOM */
          ), new ds(l.dom, t, e, l.flags & -498 | i));
      }
  }
  reuse(e) {
    return this.reused.set(
      e,
      1
      /* Reused.Full */
    ), e;
  }
  maybeReuse(e, t = 2) {
    if (!this.reused.has(e))
      return this.reused.set(e, t), e.dom;
  }
  clear() {
    for (let e = 0; e < this.buckets.length; e++)
      this.buckets[e].length = this.index[e] = 0;
  }
}
class t0 {
  constructor(e, t, i, s, r) {
    this.view = e, this.decorations = s, this.disallowBlockEffectsFor = r, this.openWidget = !1, this.openMarks = 0, this.cache = new e0(e), this.text = new Jv(e.state.doc), this.builder = new Kv(this.cache, new Ml(e, e.contentDOM), Le.iter(i)), this.cache.reused.set(
      t,
      2
      /* Reused.DOM */
    ), this.old = new Fv(t), this.reuseWalker = {
      skip: (o, l, a) => {
        if (this.cache.add(o), o.isComposite())
          return !1;
      },
      enter: (o) => this.cache.add(o),
      leave: () => {
      },
      break: () => {
      }
    };
  }
  run(e, t) {
    let i = t && this.getCompositionContext(t.text);
    for (let s = 0, r = 0, o = 0; ; ) {
      let l = o < e.length ? e[o++] : null, a = l ? l.fromA : this.old.root.length;
      if (a > s) {
        let h = a - s;
        this.preserve(h, !o, !l), s = a, r += h;
      }
      if (!l)
        break;
      t && l.fromA <= t.range.fromA && l.toA >= t.range.toA ? (this.forward(l.fromA, t.range.fromA, t.range.fromA < t.range.toA ? 1 : -1), this.emit(r, t.range.fromB), this.builder.flushBuffer(), this.cache.clear(), this.builder.addComposition(t, i), this.text.skip(t.range.toB - t.range.fromB), this.forward(t.range.fromA, l.toA), this.emit(t.range.toB, l.toB)) : (this.forward(l.fromA, l.toA), this.emit(r, l.toB)), r = l.toB, s = l.toA;
    }
    return this.builder.curLine && this.builder.endLine(), this.builder.root;
  }
  preserve(e, t, i) {
    let s = s0(this.old), r = this.openMarks;
    this.old.advance(e, i ? 1 : -1, {
      skip: (o, l, a) => {
        if (o.isWidget())
          if (this.openWidget)
            this.builder.continueWidget(a - l);
          else {
            let h = a > 0 || l < o.length ? ds.of(o.widget, this.view, a - l, o.flags & 496, this.cache.maybeReuse(o)) : this.cache.reuse(o);
            h.flags & 256 ? (h.flags &= -2, this.builder.addBlockWidget(h)) : (this.builder.ensureLine(null), this.builder.addInlineWidget(h, s, r), r = s.length);
          }
        else if (o.isText())
          this.builder.ensureLine(null), !l && a == o.length && !this.cache.reused.has(o) ? this.builder.addText(o.text, s, r, this.cache.reuse(o)) : (this.cache.add(o), this.builder.addText(o.text.slice(l, a), s, r)), r = s.length;
        else if (o.isLine())
          o.flags &= -2, this.cache.reused.set(
            o,
            1
            /* Reused.Full */
          ), this.builder.addLine(o);
        else if (o instanceof nl)
          this.cache.add(o);
        else if (o instanceof Vt)
          this.builder.ensureLine(null), this.builder.addMark(o, s, r), this.cache.reused.set(
            o,
            1
            /* Reused.Full */
          ), r = s.length;
        else
          return !1;
        this.openWidget = !1;
      },
      enter: (o) => {
        o.isLine() ? this.builder.addLineStart(o.attrs, this.cache.maybeReuse(o)) : (this.cache.add(o), o instanceof Vt && s.unshift(o.mark)), this.openWidget = !1;
      },
      leave: (o) => {
        o.isLine() ? s.length && (s.length = r = 0) : o instanceof Vt && (s.shift(), r = Math.min(r, s.length));
      },
      break: () => {
        this.builder.addBreak(), this.openWidget = !1;
      }
    }), this.text.skip(e);
  }
  emit(e, t) {
    let i = null, s = this.builder, r = -1, o = Le.spans(this.decorations, e, t, {
      point: (l, a, h, c, f, d) => {
        if (h instanceof fs) {
          if (this.disallowBlockEffectsFor[d]) {
            if (h.block)
              throw new RangeError("Block decorations may not be specified via plugins");
            if (a > this.view.state.doc.lineAt(l).to)
              throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
          }
          if (r = c.length, f > c.length)
            s.continueWidget(a - l);
          else {
            let p = h.widget || (h.block ? Ks.block : Ks.inline), O = i0(h), g = this.cache.findWidget(p, a - l, O) || ds.of(p, this.view, a - l, O);
            h.block ? (h.startSide > 0 && s.addLineStartIfNotCovered(i), s.addBlockWidget(g)) : (s.ensureLine(i), s.addInlineWidget(g, c, f));
          }
          i = null;
        } else
          i = n0(i, h);
        a > l && this.text.skip(a - l);
      },
      span: (l, a, h, c) => {
        for (let f = l; f < a; ) {
          let d = this.text.next(Math.min(512, a - f));
          d == null ? (s.addLineStartIfNotCovered(i), s.addBreak(), f++) : (s.ensureLine(i), s.addText(d, h, f == l ? c : h.length), f += d.length), i = null;
        }
        r = h.length;
      }
    });
    r > -1 && (this.openWidget = o > r), this.openWidget || s.addLineStartIfNotCovered(i), this.openMarks = o;
  }
  forward(e, t, i = 1) {
    t - e <= 10 ? this.old.advance(t - e, i, this.reuseWalker) : (this.old.advance(5, -1, this.reuseWalker), this.old.advance(t - e - 10, -1), this.old.advance(5, i, this.reuseWalker));
  }
  getCompositionContext(e) {
    let t = [], i = null;
    for (let s = e.parentNode; ; s = s.parentNode) {
      let r = st.get(s);
      if (s == this.view.contentDOM)
        break;
      r instanceof Vt ? t.push(r) : r != null && r.isLine() ? i = r : r instanceof un || (s.nodeName == "DIV" && !i && s != this.view.contentDOM ? i = new Hs(s, dp) : i || t.push(Vt.of(new so({ tagName: s.nodeName.toLowerCase(), attributes: Tv(s) }), s)));
    }
    return { line: i, marks: t };
  }
}
function mf(n, e) {
  let t = (i) => {
    for (let s of i.children)
      if ((e ? s.isText() : s.length) || t(s))
        return !0;
    return !1;
  };
  return t(n);
}
function i0(n) {
  let e = n.isReplace ? (n.startSide < 0 ? 64 : 0) | (n.endSide > 0 ? 128 : 0) : n.startSide > 0 ? 32 : 16;
  return n.block && (e |= 256), e;
}
const dp = { class: "cm-line" };
function n0(n, e) {
  let t = e.spec.attributes, i = e.spec.class;
  return !t && !i || (n || (n = { class: "cm-line" }), t && ic(t, n), i && (n.class += " " + i)), n;
}
function s0(n) {
  let e = [];
  for (let t = n.parents.length; t > 1; t--) {
    let i = t == n.parents.length ? n.tile : n.parents[t].tile;
    i instanceof Vt && e.push(i.mark);
  }
  return e;
}
function ra(n) {
  let e = st.get(n);
  return e && e.setDOM(n.cloneNode()), n;
}
class Ks extends or {
  constructor(e) {
    super(), this.tag = e;
  }
  eq(e) {
    return e.tag == this.tag;
  }
  toDOM() {
    return document.createElement(this.tag);
  }
  updateDOM(e) {
    return e.nodeName.toLowerCase() == this.tag;
  }
  get isHidden() {
    return !0;
  }
}
Ks.inline = /* @__PURE__ */ new Ks("span");
Ks.block = /* @__PURE__ */ new Ks("div");
const oa = /* @__PURE__ */ new class extends or {
  toDOM() {
    return document.createElement("br");
  }
  get isHidden() {
    return !0;
  }
  get editable() {
    return !0;
  }
}();
class vf {
  constructor(e) {
    this.view = e, this.decorations = [], this.blockWrappers = [], this.dynamicDecorationMap = [!1], this.domChanged = null, this.hasComposition = null, this.editContextFormatting = We.none, this.lastCompositionAfterCursor = !1, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.updateDeco(), this.tile = new Ml(e, e.contentDOM), this.updateInner([new di(0, 0, 0, e.state.doc.length)], null);
  }
  // Update the document view to a given state.
  update(e) {
    var t;
    let i = e.changedRanges;
    this.minWidth > 0 && i.length && (i.every(({ fromA: c, toA: f }) => f < this.minWidthFrom || c > this.minWidthTo) ? (this.minWidthFrom = e.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = e.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.updateEditContextFormatting(e);
    let s = -1;
    this.view.inputState.composing >= 0 && !this.view.observer.editContext && (!((t = this.domChanged) === null || t === void 0) && t.newSel ? s = this.domChanged.newSel.head : !d0(e.changes, this.hasComposition) && !e.selectionSet && (s = e.state.selection.main.head));
    let r = s > -1 ? o0(this.view, e.changes, s) : null;
    if (this.domChanged = null, this.hasComposition) {
      let { from: c, to: f } = this.hasComposition;
      i = new di(c, f, e.changes.mapPos(c, -1), e.changes.mapPos(f, 1)).addToSet(i.slice());
    }
    this.hasComposition = r ? { from: r.range.fromB, to: r.range.toB } : null, (se.ie || se.chrome) && !r && e && e.state.doc.lines != e.startState.doc.lines && (this.forceSelection = !0);
    let o = this.decorations, l = this.blockWrappers;
    this.updateDeco();
    let a = h0(o, this.decorations, e.changes);
    a.length && (i = di.extendWithRanges(i, a));
    let h = f0(l, this.blockWrappers, e.changes);
    return h.length && (i = di.extendWithRanges(i, h)), r && !i.some((c) => c.fromA <= r.range.fromA && c.toA >= r.range.toA) && (i = r.range.addToSet(i.slice())), this.tile.flags & 2 && i.length == 0 ? !1 : (this.updateInner(i, r), e.transactions.length && (this.lastUpdate = Date.now()), !0);
  }
  // Used by update and the constructor do perform the actual DOM
  // update
  updateInner(e, t) {
    this.view.viewState.mustMeasureContent = !0;
    let { observer: i } = this.view;
    i.ignore(() => {
      if (t || e.length) {
        let o = this.tile, l = new t0(this.view, o, this.blockWrappers, this.decorations, this.dynamicDecorationMap);
        t && st.get(t.text) && l.cache.reused.set(
          st.get(t.text),
          2
          /* Reused.DOM */
        ), this.tile = l.run(e, t), Oh(o, l.cache.reused);
      }
      this.tile.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px", this.tile.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
      let r = se.chrome || se.ios ? { node: i.selectionRange.focusNode, written: !1 } : void 0;
      this.tile.sync(r), r && (r.written || i.selectionRange.focusNode != r.node || !this.tile.dom.contains(r.node)) && (this.forceSelection = !0), this.tile.dom.style.height = "";
    });
    let s = [];
    if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length)
      for (let r of this.tile.children)
        r.isWidget() && r.widget instanceof la && s.push(r.dom);
    i.updateGaps(s);
  }
  updateEditContextFormatting(e) {
    this.editContextFormatting = this.editContextFormatting.map(e.changes);
    for (let t of e.transactions)
      for (let i of t.effects)
        i.is(ap) && (this.editContextFormatting = i.value);
  }
  // Sync the DOM selection to this.state.selection
  updateSelection(e = !1, t = !1) {
    (e || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange();
    let { dom: i } = this.tile, s = this.view.root.activeElement, r = s == i, o = !r && !(this.view.state.facet(an) || i.tabIndex > -1) && Cr(i, this.view.observer.selectionRange) && !(s && i.contains(s));
    if (!(r || t || o))
      return;
    let l = this.forceSelection;
    this.forceSelection = !1;
    let a = this.view.state.selection.main, h, c;
    if (a.empty ? c = h = this.inlineDOMNearPos(a.anchor, a.assoc || 1) : (c = this.inlineDOMNearPos(a.head, a.head == a.from ? 1 : -1), h = this.inlineDOMNearPos(a.anchor, a.anchor == a.from ? 1 : -1)), se.gecko && a.empty && !this.hasComposition && r0(h)) {
      let d = document.createTextNode("");
      this.view.observer.ignore(() => h.node.insertBefore(d, h.node.childNodes[h.offset] || null)), h = c = new Zi(d, 0), l = !0;
    }
    let f = this.view.observer.selectionRange;
    (l || !f.focusNode || (!Rr(h.node, h.offset, f.anchorNode, f.anchorOffset) || !Rr(c.node, c.offset, f.focusNode, f.focusOffset)) && !this.suppressWidgetCursorChange(f, a)) && (this.view.observer.ignore(() => {
      se.android && se.chrome && i.contains(f.focusNode) && u0(f.focusNode, i) && (i.blur(), i.focus({ preventScroll: !0 }));
      let d = Ir(this.view.root);
      if (d) if (a.empty) {
        if (se.gecko) {
          let p = l0(h.node, h.offset);
          if (p && p != 3) {
            let O = (p == 1 ? Nd : Gd)(h.node, h.offset);
            O && (h = new Zi(O.node, O.offset));
          }
        }
        d.collapse(h.node, h.offset), a.bidiLevel != null && d.caretBidiLevel !== void 0 && (d.caretBidiLevel = a.bidiLevel);
      } else if (d.extend) {
        d.collapse(h.node, h.offset);
        try {
          d.extend(c.node, c.offset);
        } catch {
        }
      } else {
        let p = document.createRange();
        a.anchor > a.head && ([h, c] = [c, h]), p.setEnd(c.node, c.offset), p.setStart(h.node, h.offset), d.removeAllRanges(), d.addRange(p);
      }
      o && this.view.root.activeElement == i && (i.blur(), s && s.focus());
    }), this.view.observer.setSelectionRange(h, c)), this.impreciseAnchor = h.precise ? null : new Zi(f.anchorNode, f.anchorOffset), this.impreciseHead = c.precise ? null : new Zi(f.focusNode, f.focusOffset);
  }
  // If a zero-length widget is inserted next to the cursor during
  // composition, avoid moving it across it and disrupting the
  // composition.
  suppressWidgetCursorChange(e, t) {
    return this.hasComposition && t.empty && Rr(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset) && this.posFromDOM(e.focusNode, e.focusOffset) == t.head;
  }
  enforceCursorAssoc() {
    if (this.hasComposition)
      return;
    let { view: e } = this, t = e.state.selection.main, i = Ir(e.root), { anchorNode: s, anchorOffset: r } = e.observer.selectionRange;
    if (!i || !t.empty || !t.assoc || !i.modify)
      return;
    let o = this.lineAt(t.head, t.assoc);
    if (!o)
      return;
    let l = o.posAtStart;
    if (t.head == l || t.head == l + o.length)
      return;
    let a = this.coordsAt(t.head, -1), h = this.coordsAt(t.head, 1);
    if (!a || !h || a.bottom > h.top)
      return;
    let c = this.domAtPos(t.head + t.assoc, t.assoc);
    i.collapse(c.node, c.offset), i.modify("move", t.assoc < 0 ? "forward" : "backward", "lineboundary"), e.observer.readSelectionRange();
    let f = e.observer.selectionRange;
    e.docView.posFromDOM(f.anchorNode, f.anchorOffset) != t.from && i.collapse(s, r);
  }
  posFromDOM(e, t) {
    let i = this.tile.nearest(e);
    if (!i)
      return this.tile.dom.compareDocumentPosition(e) & 2 ? 0 : this.view.state.doc.length;
    let s = i.posAtStart;
    if (i.isComposite()) {
      let r;
      if (e == i.dom)
        r = i.dom.childNodes[t];
      else {
        let o = On(e) == 0 ? 0 : t == 0 ? -1 : 1;
        for (; ; ) {
          let l = e.parentNode;
          if (l == i.dom)
            break;
          o == 0 && l.firstChild != l.lastChild && (e == l.firstChild ? o = -1 : o = 1), e = l;
        }
        o < 0 ? r = e : r = e.nextSibling;
      }
      if (r == i.dom.firstChild)
        return s;
      for (; r && !st.get(r); )
        r = r.nextSibling;
      if (!r)
        return s + i.length;
      for (let o = 0, l = s; ; o++) {
        let a = i.children[o];
        if (a.dom == r)
          return l;
        l += a.length + a.breakAfter;
      }
    } else return i.isText() ? e == i.dom ? s + t : s + (t ? i.length : 0) : s;
  }
  domAtPos(e, t) {
    let { tile: i, offset: s } = this.tile.resolveBlock(e, t);
    return i.isWidget() ? i.domPosFor(s, t) : i.domIn(s, t);
  }
  inlineDOMNearPos(e, t) {
    let i, s = -1, r = !1, o, l = -1, a = !1;
    return this.tile.blockTiles((h, c) => {
      if (h.isWidget()) {
        if (h.flags & 32 && c >= e)
          return !0;
        h.flags & 16 && (r = !0);
      } else {
        let f = c + h.length;
        if (c <= e && (i = h, s = e - c, r = f < e), f >= e && !o && (o = h, l = e - c, a = c > e), c > e && o)
          return !0;
      }
    }), !i && !o ? this.domAtPos(e, t) : (r && o ? i = null : a && i && (o = null), i && t < 0 || !o ? i.domIn(s, t) : o.domIn(l, t));
  }
  // Get the coord of the element at the given side of the given
  // position. If rtl is given, flatten it using that text direction.
  coordsAt(e, t, i) {
    let { tile: s, offset: r } = this.tile.resolveBlock(e, t);
    return s.isWidget() ? s.widget instanceof la ? null : s.coordsInWidget(r, t, !0) : s.coordsIn(r, t, i);
  }
  lineAt(e, t) {
    let { tile: i } = this.tile.resolveBlock(e, t);
    return i.isLine() ? i : null;
  }
  coordsForChar(e) {
    let { tile: t, offset: i } = this.tile.resolveBlock(e, 1);
    if (!t.isLine())
      return null;
    function s(r, o) {
      if (r.isComposite())
        for (let l of r.children) {
          if (l.length >= o) {
            let a = s(l, o);
            if (a)
              return a;
          }
          if (o -= l.length, o < 0)
            break;
        }
      else if (r.isText() && o < r.length) {
        let l = _t(r.text, o);
        if (l == o)
          return null;
        let a = Yr(r.dom, o, l).getClientRects();
        for (let h = 0; h < a.length; h++) {
          let c = a[h];
          if (h == a.length - 1 || c.top < c.bottom && c.left < c.right)
            return c;
        }
      }
      return null;
    }
    return s(t, i);
  }
  measureVisibleLineHeights(e) {
    let t = [], { from: i, to: s } = e, r = this.view.contentDOM.clientWidth, o = r > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, l = -1, a = this.view.textDirection == nt.LTR, h = 0, c = (f, d, p) => {
      for (let O = 0; O < f.children.length && !(d > s); O++) {
        let g = f.children[O], m = d + g.length, v = g.dom.getBoundingClientRect(), { height: x } = v;
        if (p && !O && (h += v.top - p.top), g instanceof un)
          m > i && c(g, d, v);
        else if (d >= i && (h > 0 && t.push(-h), t.push(x + h), h = 0, o)) {
          let S = g.dom.lastChild, _ = S ? Ar(S) : [];
          if (_.length) {
            let C = _[_.length - 1], R = a ? C.right - v.left : v.right - C.left;
            R > l && (l = R, this.minWidth = r, this.minWidthFrom = d, this.minWidthTo = m);
          }
        }
        p && O == f.children.length - 1 && (h += p.bottom - v.bottom), d = m + g.breakAfter;
      }
    };
    return c(this.tile, 0, null), t;
  }
  textDirectionAt(e) {
    let { tile: t } = this.tile.resolveBlock(e, 1);
    return getComputedStyle(t.dom).direction == "rtl" ? nt.RTL : nt.LTR;
  }
  measureTextSize() {
    let e = this.tile.blockTiles((o) => {
      if (o.isLine() && o.children.length && o.length <= 20) {
        let l = 0, a;
        for (let h of o.children) {
          if (!h.isText() || /[^ -~]/.test(h.text))
            return;
          let c = Ar(h.dom);
          if (c.length != 1)
            return;
          l += c[0].width, a = c[0].height;
        }
        if (l)
          return {
            lineHeight: o.dom.getBoundingClientRect().height,
            charWidth: l / o.length,
            textHeight: a
          };
      }
    });
    if (e)
      return e;
    let t = document.createElement("div"), i, s, r;
    return t.className = "cm-line", t.style.width = "99999px", t.style.position = "absolute", t.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
      this.tile.dom.appendChild(t);
      let o = Ar(t.firstChild)[0];
      i = t.getBoundingClientRect().height, s = o && o.width ? o.width / 27 : 7, r = o && o.height ? o.height : i, t.remove();
    }), { lineHeight: i, charWidth: s, textHeight: r };
  }
  computeBlockGapDeco() {
    let e = [], t = this.view.viewState;
    for (let i = 0, s = 0; ; s++) {
      let r = s == t.viewports.length ? null : t.viewports[s], o = r ? r.from - 1 : this.view.state.doc.length;
      if (o > i) {
        let l = (t.lineBlockAt(o).bottom - t.lineBlockAt(i).top) / this.view.scaleY;
        e.push(We.replace({
          widget: new la(l),
          block: !0,
          inclusive: !0,
          isBlockGap: !0
        }).range(i, o));
      }
      if (!r)
        break;
      i = r.to + 1;
    }
    return We.set(e);
  }
  updateDeco() {
    let e = 1, t = this.view.state.facet(Al).map((r) => (this.dynamicDecorationMap[e++] = typeof r == "function") ? r(this.view) : r), i = !1, s = this.view.state.facet(ac).map((r, o) => {
      let l = typeof r == "function";
      return l && (i = !0), l ? r(this.view) : r;
    });
    for (s.length && (this.dynamicDecorationMap[e++] = i, t.push(Le.join(s))), this.decorations = [
      this.editContextFormatting,
      ...t,
      this.computeBlockGapDeco(),
      this.view.viewState.lineGapDeco
    ]; e < this.decorations.length; )
      this.dynamicDecorationMap[e++] = !1;
    this.blockWrappers = this.view.state.facet(cp).map((r) => typeof r == "function" ? r(this.view) : r);
  }
  scrollIntoView(e) {
    if (e.isSnapshot) {
      let h = this.view.viewState.lineBlockAt(e.range.head);
      this.view.scrollDOM.scrollTop = h.top - e.yMargin, this.view.scrollDOM.scrollLeft = e.xMargin;
      return;
    }
    for (let h of this.view.state.facet(lp))
      try {
        if (h(this.view, e.range, e))
          return !0;
      } catch (c) {
        ni(this.view.state, c, "scroll handler");
      }
    let { range: t } = e, i = this.coordsAt(t.head, t.assoc || (t.head > t.anchor ? -1 : 1)), s;
    if (!i)
      return;
    !t.empty && (s = this.coordsAt(t.anchor, t.anchor > t.head ? -1 : 1)) && (i = {
      left: Math.min(i.left, s.left),
      top: Math.min(i.top, s.top),
      right: Math.max(i.right, s.right),
      bottom: Math.max(i.bottom, s.bottom)
    });
    let r = hc(this.view), o = {
      left: i.left - r.left,
      top: i.top - r.top,
      right: i.right + r.right,
      bottom: i.bottom + r.bottom
    }, { offsetWidth: l, offsetHeight: a } = this.view.scrollDOM;
    if (Av(this.view.scrollDOM, o, t.head < t.anchor ? -1 : 1, e.x, e.y, Math.max(Math.min(e.xMargin, l), -l), Math.max(Math.min(e.yMargin, a), -a), this.view.textDirection == nt.LTR), window.visualViewport && window.innerHeight - window.visualViewport.height > 1 && (i.top > window.pageYOffset + window.visualViewport.offsetTop + window.visualViewport.height || i.bottom < window.pageYOffset + window.visualViewport.offsetTop)) {
      let h = this.view.docView.lineAt(t.head, 1);
      h && h.dom.scrollIntoView({ block: "nearest" });
    }
  }
  lineHasWidget(e) {
    let t = (i) => i.isWidget() || i.children.some(t);
    return t(this.tile.resolveBlock(e, 1).tile);
  }
  destroy() {
    Oh(this.tile);
  }
}
function Oh(n, e) {
  let t = e == null ? void 0 : e.get(n);
  if (t != 1) {
    t == null && n.destroy();
    for (let i of n.children)
      Oh(i, e);
  }
}
function r0(n) {
  return n.node.nodeType == 1 && n.node.firstChild && (n.offset == 0 || n.node.childNodes[n.offset - 1].contentEditable == "false") && (n.offset == n.node.childNodes.length || n.node.childNodes[n.offset].contentEditable == "false");
}
function pp(n, e) {
  let t = n.observer.selectionRange;
  if (!t.focusNode)
    return null;
  let i = Nd(t.focusNode, t.focusOffset), s = Gd(t.focusNode, t.focusOffset), r = i || s;
  if (s && i && s.node != i.node) {
    let l = st.get(s.node);
    if (!l || l.isText() && l.text != s.node.nodeValue)
      r = s;
    else if (n.docView.lastCompositionAfterCursor) {
      let a = st.get(i.node);
      !a || a.isText() && a.text != i.node.nodeValue || (r = s);
    }
  }
  if (n.docView.lastCompositionAfterCursor = r != i, !r)
    return null;
  let o = e - r.offset;
  return { from: o, to: o + r.node.nodeValue.length, node: r.node };
}
function o0(n, e, t) {
  let i = pp(n, t);
  if (!i)
    return null;
  let { node: s, from: r, to: o } = i, l = s.nodeValue;
  if (/[\n\r]/.test(l) || n.state.doc.sliceString(i.from, i.to) != l)
    return null;
  let a = e.invertedDesc;
  return { range: new di(a.mapPos(r), a.mapPos(o), r, o), text: s };
}
function l0(n, e) {
  return n.nodeType != 1 ? 0 : (e && n.childNodes[e - 1].contentEditable == "false" ? 1 : 0) | (e < n.childNodes.length && n.childNodes[e].contentEditable == "false" ? 2 : 0);
}
let a0 = class {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    Cs(e, t, this.changes);
  }
  comparePoint(e, t) {
    Cs(e, t, this.changes);
  }
  boundChange(e) {
    Cs(e, e, this.changes);
  }
};
function h0(n, e, t) {
  let i = new a0();
  return Le.compare(n, e, t, i), i.changes;
}
class c0 {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    Cs(e, t, this.changes);
  }
  comparePoint() {
  }
  boundChange(e) {
    Cs(e, e, this.changes);
  }
}
function f0(n, e, t) {
  let i = new c0();
  return Le.compare(n, e, t, i), i.changes;
}
function u0(n, e) {
  for (let t = n; t && t != e; t = t.assignedSlot || t.parentNode)
    if (t.nodeType == 1 && t.contentEditable == "false")
      return !0;
  return !1;
}
function d0(n, e) {
  let t = !1;
  return e && n.iterChangedRanges((i, s) => {
    i < e.to && s > e.from && (t = !0);
  }), t;
}
class la extends or {
  constructor(e) {
    super(), this.height = e;
  }
  toDOM() {
    let e = document.createElement("div");
    return e.className = "cm-gap", this.updateDOM(e), e;
  }
  eq(e) {
    return e.height == this.height;
  }
  updateDOM(e) {
    return e.style.height = this.height + "px", !0;
  }
  get editable() {
    return !0;
  }
  get estimatedHeight() {
    return this.height;
  }
  ignoreEvent() {
    return !1;
  }
}
function p0(n, e, t = 1) {
  let i = n.charCategorizer(e), s = n.doc.lineAt(e), r = e - s.from;
  if (s.length == 0)
    return B.cursor(e);
  r == 0 ? t = 1 : r == s.length && (t = -1);
  let o = r, l = r;
  t < 0 ? o = _t(s.text, r, !1) : l = _t(s.text, r);
  let a = i(s.text.slice(o, l));
  for (; o > 0; ) {
    let h = _t(s.text, o, !1);
    if (i(s.text.slice(h, o)) != a)
      break;
    o = h;
  }
  for (; l < s.length; ) {
    let h = _t(s.text, l);
    if (i(s.text.slice(l, h)) != a)
      break;
    l = h;
  }
  return B.undirectionalRange(o + s.from, l + s.from);
}
function O0(n, e, t, i, s) {
  let r = Math.round((i - e.left) * n.defaultCharacterWidth);
  if (n.lineWrapping && t.height > n.defaultLineHeight * 1.5) {
    let l = n.viewState.heightOracle.textHeight, a = Math.floor((s - t.top - (n.defaultLineHeight - l) * 0.5) / l);
    r += a * n.viewState.heightOracle.lineLength;
  }
  let o = n.state.sliceDoc(t.from, t.to);
  return t.from + Sv(o, r, n.state.tabSize);
}
function g0(n, e, t) {
  let i = n.lineBlockAt(e);
  if (Array.isArray(i.type)) {
    let s;
    for (let r of i.type) {
      if (r.from > e)
        break;
      if (!(r.to < e)) {
        if (r.from < e && r.to > e)
          return r;
        (!s || r.type == yi.Text && (s.type != r.type || (t < 0 ? r.from < e : r.to > e))) && (s = r);
      }
    }
    return s || i;
  }
  return i;
}
function m0(n, e, t, i) {
  let s = g0(n, e.head, e.assoc || -1), r = !i || s.type != yi.Text || !(n.lineWrapping || s.widgetLineBreaks) ? null : n.coordsAtPos(e.assoc < 0 && e.head > s.from ? e.head - 1 : e.head);
  if (r) {
    let o = n.dom.getBoundingClientRect(), l = n.textDirectionAt(s.from), a = n.posAtCoords({
      x: t == (l == nt.LTR) ? o.right - 1 : o.left + 1,
      y: (r.top + r.bottom) / 2
    });
    if (a != null)
      return B.cursor(a, t ? -1 : 1);
  }
  return B.cursor(t ? s.to : s.from, t ? -1 : 1);
}
function bf(n, e, t, i) {
  let s = n.state.doc.lineAt(e.head), r = n.bidiSpans(s), o = n.textDirectionAt(s.from);
  for (let l = e, a = null; ; ) {
    let h = Yv(s, r, o, l, t), c = Jd;
    if (!h) {
      if (s.number == (t ? n.state.doc.lines : 1))
        return l;
      c = `
`, s = n.state.doc.line(s.number + (t ? 1 : -1)), r = n.bidiSpans(s), h = n.visualLineSide(s, !t);
    }
    if (a) {
      if (!a(c))
        return l;
    } else {
      if (!i)
        return h;
      a = i(c);
    }
    l = h;
  }
}
function v0(n, e, t) {
  let i = n.state.charCategorizer(e), s = i(t);
  return (r) => {
    let o = i(r);
    return s == hn.Space && (s = o), s == o;
  };
}
function b0(n, e, t, i) {
  let s = e.head, r = t ? 1 : -1;
  if (s == (t ? n.state.doc.length : 0))
    return B.cursor(s, e.assoc);
  let o = e.goalColumn, l, a = n.contentDOM.getBoundingClientRect(), h = n.coordsAtPos(s, e.assoc || ((e.empty ? t : e.head == e.from) ? 1 : -1)), c = n.documentTop;
  if (h)
    o == null && (o = h.left - a.left), l = r < 0 ? h.top : h.bottom;
  else {
    let O = n.viewState.lineBlockAt(s);
    o == null && (o = Math.min(a.right - a.left, n.defaultCharacterWidth * (s - O.from))), l = (r < 0 ? O.top : O.bottom) + c;
  }
  let f = a.left + o, d = n.viewState.heightOracle.textHeight >> 1, p = i ?? d;
  for (let O = 0; ; O += d) {
    let g = l + (p + O) * r, m = gh(n, { x: f, y: g }, !1, r);
    if (t ? g > a.bottom : g < a.top)
      return B.cursor(m.pos, m.assoc);
    let v = n.coordsAtPos(m.pos, m.assoc), x = v ? (v.top + v.bottom) / 2 : 0;
    if (!v || (t ? x > l : x < l))
      return B.cursor(m.pos, m.assoc, void 0, o);
  }
}
function Mr(n, e, t) {
  for (; ; ) {
    let i = 0;
    for (let s of n)
      s.between(e - 1, e + 1, (r, o, l) => {
        if (e > r && e < o) {
          let a = i || t || (e - r < o - e ? -1 : 1);
          e = a < 0 ? r : o, i = a;
        }
      });
    if (!i)
      return e;
  }
}
function Op(n, e) {
  let t = null;
  for (let i = 0; i < e.ranges.length; i++) {
    let s = e.ranges[i], r = null;
    if (s.empty) {
      let o = Mr(n, s.from, 0);
      o != s.from && (r = B.cursor(o, -1));
    } else {
      let o = Mr(n, s.from, -1), l = Mr(n, s.to, 1);
      (o != s.from || l != s.to) && (s.undirectional ? r = B.undirectionalRange(s.from, s.to) : r = B.range(s.from == s.anchor ? o : l, s.from == s.head ? o : l));
    }
    r && (t || (t = e.ranges.slice()), t[i] = r);
  }
  return t ? B.create(t, e.mainIndex) : e;
}
function aa(n, e, t) {
  let i = Mr(n.state.facet(oo).map((s) => s(n)), t.from, e.head > t.from ? -1 : 1);
  return i == t.from ? t : B.cursor(i, i < t.from ? 1 : -1);
}
class qi {
  constructor(e, t) {
    this.pos = e, this.assoc = t;
  }
}
function gh(n, e, t, i) {
  let s = n.contentDOM.getBoundingClientRect(), r = s.top + n.viewState.paddingTop, { x: o, y: l } = e, a = l - r, h;
  for (; ; ) {
    if (a < 0)
      return new qi(0, 1);
    if (a > n.viewState.docHeight)
      return new qi(n.state.doc.length, -1);
    if (h = n.elementAtHeight(a), i == null)
      break;
    if (h.type == yi.Text) {
      if (i < 0 ? h.to < n.viewport.from : h.from > n.viewport.to)
        break;
      let d = n.docView.coordsAt(i < 0 ? h.from : h.to, i > 0 ? -1 : 1);
      if (d && (i < 0 ? d.top <= a + r : d.bottom >= a + r))
        break;
    }
    let f = n.viewState.heightOracle.textHeight / 2;
    a = i > 0 ? h.bottom + f : h.top - f;
  }
  if (n.viewport.from >= h.to || n.viewport.to <= h.from) {
    if (t)
      return null;
    if (h.type == yi.Text) {
      let f = O0(n, s, h, o, l);
      return new qi(f, f == h.from ? 1 : -1);
    }
  }
  if (h.type != yi.Text)
    return a < (h.top + h.bottom) / 2 ? new qi(h.from, 1) : new qi(h.to, -1);
  let c = n.docView.lineAt(h.from, 2);
  return (!c || c.length != h.length) && (c = n.docView.lineAt(h.from, -2)), new y0(n, o, l, n.textDirectionAt(h.from)).scanTile(c, h.from);
}
class y0 {
  constructor(e, t, i, s) {
    this.view = e, this.x = t, this.y = i, this.baseDir = s, this.line = null, this.spans = null;
  }
  bidiSpansAt(e) {
    return (!this.line || this.line.from > e || this.line.to < e) && (this.line = this.view.state.doc.lineAt(e), this.spans = this.view.bidiSpans(this.line)), this;
  }
  baseDirAt(e, t) {
    let { line: i, spans: s } = this.bidiSpansAt(e);
    return s[Vi.find(s, e - i.from, -1, t)].level == this.baseDir;
  }
  dirAt(e, t) {
    let { line: i, spans: s } = this.bidiSpansAt(e);
    return s[Vi.find(s, e - i.from, -1, t)].dir;
  }
  // Used to short-circuit bidi tests for content with a uniform direction
  bidiIn(e, t) {
    let { spans: i, line: s } = this.bidiSpansAt(e);
    return i.length > 1 || i.length && (i[0].level != this.baseDir || i[0].to + s.from < t);
  }
  // Scan through the rectangles for the content of a tile with inline
  // content, looking for one that overlaps the queried position
  // vertically and is closest horizontally. The caller is responsible
  // for dividing its content into N pieces, and pass an array with
  // N+1 positions (including the position after the last piece). For
  // a text tile, these will be character clusters, for a composite
  // tile, these will be child tiles.
  scan(e, t, i = !1) {
    let s = 0, r = e.length - 1, o = /* @__PURE__ */ new Set(), l = this.bidiIn(e[0], e[r]), a, h, c = -1, f = 1e9, d;
    e: for (; s < r; ) {
      let O = r - s, g = s + r >> 1;
      t: if (o.has(g)) {
        let v = s + Math.floor(Math.random() * O);
        for (let x = 0; x < O; x++) {
          if (!o.has(v)) {
            g = v;
            break t;
          }
          v++, v == r && (v = s);
        }
        break e;
      }
      o.add(g);
      let m = t(g);
      if (m)
        for (let v = 0; v < m.length; v++) {
          let x = m[v], S = 0;
          if (!(x.width == 0 && m.length > 1)) {
            if (x.bottom < this.y)
              (!a || a.bottom < x.bottom) && (a = x), S = 1;
            else if (x.top > this.y)
              (!h || h.top > x.top) && (h = x), S = -1;
            else {
              let _ = x.left > this.x ? this.x - x.left : x.right < this.x ? this.x - x.right : 0, C = Math.abs(_);
              C < f && (c = g, f = C, d = x), _ && (S = _ < 0 == (this.baseDir == nt.LTR) ? -1 : 1);
            }
            S == -1 && (!l || this.baseDirAt(e[g], 1)) ? r = g : S == 1 && (!l || this.baseDirAt(e[g + 1], -1)) && (s = g + 1);
          }
        }
    }
    if (!d) {
      if (!h && !a)
        return { i: e[0], after: !1 };
      let O = a && (!h || this.y - a.bottom < h.top - this.y) ? a : h;
      return this.y = (O.top + O.bottom) / 2, this.scan(e, t, !0);
    }
    if (f && !i) {
      let { top: O, bottom: g } = d;
      if (a && a.bottom > (O + O + g) / 3)
        return this.y = a.bottom - 1, this.scan(e, t, !0);
      if (h && h.top < (O + g + g) / 3)
        return this.y = h.top + 1, this.scan(e, t, !0);
    }
    let p = (l ? this.dirAt(e[c], 1) : this.baseDir) == nt.LTR;
    return {
      i: c,
      // Test whether x is closes to the start or end of this element
      after: this.x > (d.left + d.right) / 2 == p
    };
  }
  scanText(e, t) {
    let i = [];
    for (let r = 0; r < e.length; r = _t(e.text, r))
      i.push(t + r);
    i.push(t + e.length);
    let s = this.scan(i, (r) => {
      let o = i[r] - t, l = i[r + 1] - t;
      return Yr(e.dom, o, l).getClientRects();
    });
    return s.after ? new qi(i[s.i + 1], -1) : new qi(i[s.i], 1);
  }
  scanTile(e, t) {
    if (!e.length)
      return new qi(t, 1);
    if (e.children.length == 1) {
      let l = e.children[0];
      if (l.isText())
        return this.scanText(l, t);
      if (l.isComposite())
        return this.scanTile(l, t);
    }
    let i = [t];
    for (let l = 0, a = t; l < e.children.length; l++)
      i.push(a += e.children[l].length);
    let s = this.scan(i, (l) => {
      let a = e.children[l];
      return a.flags & 48 ? null : (a.dom.nodeType == 1 ? a.dom : Yr(a.dom, 0, a.length)).getClientRects();
    }), r = e.children[s.i], o = i[s.i];
    return r.isText() ? this.scanText(r, o) : r.isComposite() ? this.scanTile(r, o) : s.after ? new qi(i[s.i + 1], -1) : new qi(o, 1);
  }
}
const Ss = "￿";
class w0 {
  constructor(e, t) {
    this.points = e, this.view = t, this.text = "", this.lineSeparator = t.state.facet(Xe.lineSeparator);
  }
  append(e) {
    this.text += e;
  }
  lineBreak() {
    this.text += Ss;
  }
  readRange(e, t) {
    if (!e)
      return this;
    let i = e.parentNode;
    for (let s = e; ; ) {
      this.findPointBefore(i, s);
      let r = this.text.length;
      this.readNode(s);
      let o = st.get(s), l = s.nextSibling;
      if (l == t) {
        o != null && o.breakAfter && !l && i != this.view.contentDOM && this.lineBreak();
        break;
      }
      let a = st.get(l);
      (o && a ? o.breakAfter : (o ? o.breakAfter : tl(s)) || tl(l) && (s.nodeName != "BR" || o != null && o.isWidget()) && this.text.length > r) && !S0(l, t) && this.lineBreak(), s = l;
    }
    return this.findPointBefore(i, t), this;
  }
  readTextNode(e) {
    let t = e.nodeValue;
    for (let i of this.points)
      i.node == e && (i.pos = this.text.length + Math.min(i.offset, t.length));
    for (let i = 0, s = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
      let r = -1, o = 1, l;
      if (this.lineSeparator ? (r = t.indexOf(this.lineSeparator, i), o = this.lineSeparator.length) : (l = s.exec(t)) && (r = l.index, o = l[0].length), this.append(t.slice(i, r < 0 ? t.length : r)), r < 0)
        break;
      if (this.lineBreak(), o > 1)
        for (let a of this.points)
          a.node == e && a.pos > this.text.length && (a.pos -= o - 1);
      i = r + o;
    }
  }
  readNode(e) {
    let t = st.get(e), i = t && t.overrideDOMText;
    if (i != null) {
      this.findPointInside(e, i.length);
      for (let s = i.iter(); !s.next().done; )
        s.lineBreak ? this.lineBreak() : this.append(s.value);
    } else e.nodeType == 3 ? this.readTextNode(e) : e.nodeName == "BR" ? e.nextSibling && this.lineBreak() : e.nodeType == 1 && this.readRange(e.firstChild, null);
  }
  findPointBefore(e, t) {
    for (let i of this.points)
      i.node == e && e.childNodes[i.offset] == t && (i.pos = this.text.length);
  }
  findPointInside(e, t) {
    for (let i of this.points)
      (e.nodeType == 3 ? i.node == e : e.contains(i.node)) && (i.pos = this.text.length + (x0(e, i.node, i.offset) ? t : 0));
  }
}
function x0(n, e, t) {
  for (; ; ) {
    if (!e || t < On(e))
      return !1;
    if (e == n)
      return !0;
    t = Ln(e) + 1, e = e.parentNode;
  }
}
function S0(n, e) {
  let t;
  for (; !(n == e || !n); n = n.nextSibling) {
    let i = st.get(n);
    if (!(i != null && i.isWidget()))
      return !1;
    i && (t || (t = [])).push(i);
  }
  if (t)
    for (let i of t) {
      let s = i.overrideDOMText;
      if (s != null && s.length)
        return !1;
    }
  return !0;
}
class yf {
  constructor(e, t) {
    this.node = e, this.offset = t, this.pos = -1;
  }
}
class Q0 {
  constructor(e, t, i, s) {
    this.typeOver = s, this.bounds = null, this.text = "", this.domChanged = t > -1;
    let { impreciseHead: r, impreciseAnchor: o } = e.docView, l = e.state.selection;
    if (e.state.readOnly && t > -1)
      this.newSel = null;
    else if (t > -1 && (this.bounds = gp(e.docView.tile, t, i, 0))) {
      let a = r || o ? [] : $0(e), h = new w0(a, e);
      h.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = h.text, this.newSel = P0(a, this.bounds.from);
    } else {
      let a = e.observer.selectionRange, h = r && r.node == a.focusNode && r.offset == a.focusOffset || !ch(e.contentDOM, a.focusNode) ? l.main.head : e.docView.posFromDOM(a.focusNode, a.focusOffset), c = o && o.node == a.anchorNode && o.offset == a.anchorOffset || !ch(e.contentDOM, a.anchorNode) ? l.main.anchor : e.docView.posFromDOM(a.anchorNode, a.anchorOffset), f = e.viewport;
      if ((se.ios || se.chrome) && h != c && Math.min(h, c) <= l.main.from && Math.max(h, c) >= l.main.to && (f.from > 0 || f.to < e.state.doc.length)) {
        let d = Math.min(h, c), p = Math.max(h, c), O = f.from - d, g = f.to - p;
        (O == 0 || O == 1 || d == 0) && (g == 0 || g == -1 || p == e.state.doc.length) && (h = 0, c = e.state.doc.length);
      }
      if (e.inputState.composing > -1 && l.ranges.length > 1)
        this.newSel = l.replaceRange(B.range(c, h));
      else if (e.lineWrapping && c == h && !(l.main.empty && l.main.head == h) && e.inputState.lastTouchTime > Date.now() - 100) {
        let d = e.coordsAtPos(h, -1), p = 0;
        d && (p = e.inputState.lastTouchY <= d.bottom ? -1 : 1), this.newSel = B.create([B.cursor(h, p)]);
      } else
        this.newSel = B.single(c, h);
    }
  }
}
function gp(n, e, t, i) {
  if (n.isComposite()) {
    let s = -1, r = -1, o = -1, l = -1;
    for (let a = 0, h = i, c = i; a < n.children.length; a++) {
      let f = n.children[a], d = h + f.length;
      if (h < e && d > t)
        return gp(f, e, t, h);
      if (d >= e && s == -1 && (s = a, r = h), h > t && f.dom.parentNode == n.dom) {
        o = a, l = c;
        break;
      }
      c = d, h = d + f.breakAfter;
    }
    return {
      from: r,
      to: l < 0 ? i + n.length : l,
      startDOM: (s ? n.children[s - 1].dom.nextSibling : null) || n.dom.firstChild,
      endDOM: o < n.children.length && o >= 0 ? n.children[o].dom : null
    };
  } else return n.isText() ? { from: i, to: i + n.length, startDOM: n.dom, endDOM: n.dom.nextSibling } : null;
}
function mp(n, e) {
  let t, { newSel: i } = e, { state: s } = n, r = s.selection.main, o = n.inputState.lastKeyTime > Date.now() - 100 ? n.inputState.lastKeyCode : -1;
  if (e.bounds) {
    let { from: l, to: a } = e.bounds, h = r.from, c = null;
    (o === 8 || se.android && e.text.length < a - l) && (h = r.to, c = "end");
    let f = s.doc.sliceString(l, a, Ss), d, p;
    !r.empty && r.from >= l && r.to <= a && (e.typeOver || f != e.text) && f.slice(0, r.from - l) == e.text.slice(0, r.from - l) && f.slice(r.to - l) == e.text.slice(d = e.text.length - (f.length - (r.to - l))) ? t = {
      from: r.from,
      to: r.to,
      insert: Re.of(e.text.slice(r.from - l, d).split(Ss))
    } : (p = vp(f, e.text, h - l, c)) && (se.chrome && o == 13 && p.toB == p.from + 2 && e.text.slice(p.from, p.toB) == Ss + Ss && p.toB--, t = {
      from: l + p.from,
      to: l + p.toA,
      insert: Re.of(e.text.slice(p.from, p.toB).split(Ss))
    });
  } else i && (!n.hasFocus && s.facet(an) || rl(i, r)) && (i = null);
  if (!t && !i)
    return !1;
  if ((se.mac || se.android) && t && t.from == t.to && t.from == r.head - 1 && /^\. ?$/.test(t.insert.toString()) && n.contentDOM.getAttribute("autocorrect") == "off" ? (i && t.insert.length == 2 && (i = B.single(i.main.anchor - 1, i.main.head - 1)), t = { from: t.from, to: t.to, insert: Re.of([t.insert.toString().replace(".", " ")]) }) : s.doc.lineAt(r.from).to < r.to && n.docView.lineHasWidget(r.to) && n.inputState.insertingTextAt > Date.now() - 50 ? t = {
    from: r.from,
    to: r.to,
    insert: s.toText(n.inputState.insertingText)
  } : se.chrome && t && t.from == t.to && t.from == r.head && t.insert.toString() == `
 ` && n.lineWrapping && (i && (i = B.single(i.main.anchor - 1, i.main.head - 1)), t = { from: r.from, to: r.to, insert: Re.of([" "]) }), t)
    return cc(n, t, i, o);
  if (i && !rl(i, r)) {
    let l = !1, a = "select";
    return n.inputState.lastSelectionTime > Date.now() - 50 && (n.inputState.lastSelectionOrigin == "select" && (l = !0), a = n.inputState.lastSelectionOrigin, a == "select.pointer" && (i = Op(s.facet(oo).map((h) => h(n)), i))), n.dispatch({ selection: i, scrollIntoView: l, userEvent: a }), !0;
  } else
    return !1;
}
function cc(n, e, t, i = -1) {
  if (se.ios && n.inputState.flushIOSKey(e))
    return !0;
  let s = n.state.selection.main;
  if (se.android && (e.to == s.to && // GBoard will sometimes remove a space it just inserted
  // after a completion when you press enter
  (e.from == s.from || e.from == s.from - 1 && n.state.sliceDoc(e.from, s.from) == " ") && e.insert.length == 1 && e.insert.lines == 2 && As(n.contentDOM, "Enter", 13) || (e.from == s.from - 1 && e.to == s.to && e.insert.length == 0 || i == 8 && e.insert.length < e.to - e.from && e.to > s.head) && As(n.contentDOM, "Backspace", 8) || e.from == s.from && e.to == s.to + 1 && e.insert.length == 0 && As(n.contentDOM, "Delete", 46)))
    return !0;
  let r = e.insert.toString();
  n.inputState.composing >= 0 && n.inputState.composing++;
  let o, l = () => o || (o = k0(n, e, t));
  return n.state.facet(sp).some((a) => a(n, e.from, e.to, r, l)) || n.dispatch(l()), !0;
}
function k0(n, e, t) {
  let i, s = n.state, r = s.selection.main, o = -1;
  if (e.from == e.to && e.from < r.from || e.from > r.to) {
    let a = e.from < r.from ? -1 : 1, h = a < 0 ? r.from : r.to, c = Mr(s.facet(oo).map((f) => f(n)), h, a);
    e.from == c && (o = c);
  }
  if (o > -1)
    i = {
      changes: e,
      selection: B.cursor(e.from + e.insert.length, -1)
    };
  else if (e.from >= r.from && e.to <= r.to && e.to - e.from >= (r.to - r.from) / 3 && (!t || t.main.empty && t.main.from == e.from + e.insert.length) && n.inputState.composing < 0) {
    let a = r.from < e.from ? s.sliceDoc(r.from, e.from) : "", h = r.to > e.to ? s.sliceDoc(e.to, r.to) : "";
    i = s.replaceSelection(n.state.toText(a + e.insert.sliceString(0, void 0, n.state.lineBreak) + h));
  } else {
    let a = s.changes(e), h = t && t.main.to <= a.newLength ? t.main : void 0;
    if (s.selection.ranges.length > 1 && (n.inputState.composing >= 0 || n.inputState.compositionPendingChange) && e.to <= r.to + 10 && e.to >= r.to - 10) {
      let c = n.state.sliceDoc(e.from, e.to), f, d = t && pp(n, t.main.head);
      if (d) {
        let O = e.insert.length - (e.to - e.from);
        f = { from: d.from, to: d.to - O };
      } else
        f = n.state.doc.lineAt(r.head);
      let p = r.to - e.to;
      i = s.changeByRange((O) => {
        if (O.from == r.from && O.to == r.to)
          return { changes: a, range: h || O.map(a) };
        let g = O.to - p, m = g - c.length;
        if (n.state.sliceDoc(m, g) != c || // Unfortunately, there's no way to make multiple
        // changes in the same node work without aborting
        // composition, so cursors in the composition range are
        // ignored.
        g >= f.from && m <= f.to)
          return { range: O };
        let v = s.changes({ from: m, to: g, insert: e.insert }), x = O.to - r.to;
        return {
          changes: v,
          range: h ? B.range(Math.max(0, h.anchor + x), Math.max(0, h.head + x)) : O.map(v)
        };
      });
    } else
      i = {
        changes: a,
        selection: h && s.selection.replaceRange(h)
      };
  }
  let l = "input.type";
  return (n.composing || n.inputState.compositionPendingChange && n.inputState.compositionEndedAt > Date.now() - 50) && (n.inputState.compositionPendingChange = !1, l += ".compose", n.inputState.compositionFirstChange && (l += ".start", n.inputState.compositionFirstChange = !1)), s.update(i, { userEvent: l, scrollIntoView: !0 });
}
function vp(n, e, t, i) {
  let s = Math.min(n.length, e.length), r = 0;
  for (; r < s && n.charCodeAt(r) == e.charCodeAt(r); )
    r++;
  if (r == s && n.length == e.length)
    return null;
  let o = n.length, l = e.length;
  for (; o > 0 && l > 0 && n.charCodeAt(o - 1) == e.charCodeAt(l - 1); )
    o--, l--;
  if (i == "end") {
    let a = Math.max(0, r - Math.min(o, l));
    t -= o + a - r;
  }
  if (o < r && n.length < e.length) {
    let a = t <= r && t >= o ? r - t : 0;
    r -= a, l = r + (l - o), o = r;
  } else if (l < r) {
    let a = t <= r && t >= l ? r - t : 0;
    r -= a, o = r + (o - l), l = r;
  }
  return { from: r, toA: o, toB: l };
}
function $0(n) {
  let e = [];
  if (n.root.activeElement != n.contentDOM)
    return e;
  let { anchorNode: t, anchorOffset: i, focusNode: s, focusOffset: r } = n.observer.selectionRange;
  return t && (e.push(new yf(t, i)), (s != t || r != i) && e.push(new yf(s, r))), e;
}
function P0(n, e) {
  if (n.length == 0)
    return null;
  let t = n[0].pos, i = n.length == 2 ? n[1].pos : t;
  return t > -1 && i > -1 ? B.single(t + e, i + e) : null;
}
function rl(n, e) {
  return e.head == n.main.head && e.anchor == n.main.anchor;
}
class _0 {
  setSelectionOrigin(e) {
    this.lastSelectionOrigin = e, this.lastSelectionTime = Date.now();
  }
  constructor(e) {
    this.view = e, this.lastKeyCode = 0, this.lastKeyTime = 0, this.touchActive = !1, this.lastTouchTime = 0, this.lastTouchX = 0, this.lastTouchY = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.lastWheelEvent = 0, this.pendingIOSKey = void 0, this.lastIOSMomentumScroll = 0, this.tabFocusMode = -1, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.handlers = /* @__PURE__ */ Object.create(null), this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = !1, this.compositionPendingChange = !1, this.insertingText = "", this.insertingTextAt = 0, this.mouseSelection = null, this.draggedContent = null, this.handleEvent = this.handleEvent.bind(this), this.notifiedFocused = e.hasFocus, se.safari && e.contentDOM.addEventListener("input", () => null), se.gecko && q0(e.contentDOM.ownerDocument);
  }
  handleEvent(e) {
    !L0(this.view, e) || this.ignoreDuringComposition(e) || e.type == "keydown" && this.keydown(e) || (this.view.updateState != 0 ? Promise.resolve().then(() => this.runHandlers(e.type, e)) : this.runHandlers(e.type, e));
  }
  runHandlers(e, t) {
    let i = this.handlers[e];
    if (i) {
      for (let s of i.observers)
        s(this.view, t);
      for (let s of i.handlers) {
        if (t.defaultPrevented)
          break;
        if (s(this.view, t)) {
          t.preventDefault();
          break;
        }
      }
    }
  }
  ensureHandlers(e) {
    let t = Z0(e), i = this.handlers, s = this.view.contentDOM;
    for (let r in t)
      if (r != "scroll") {
        let o = !t[r].handlers.length, l = i[r];
        l && o != !l.handlers.length && (s.removeEventListener(r, this.handleEvent), l = null), l || s.addEventListener(r, this.handleEvent, { passive: o });
      }
    for (let r in i)
      r != "scroll" && !t[r] && s.removeEventListener(r, this.handleEvent);
    this.handlers = t;
  }
  keydown(e) {
    if (this.lastKeyCode = e.keyCode, this.lastKeyTime = Date.now(), e.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode))
      return !0;
    if (this.tabFocusMode > 0 && e.keyCode != 27 && yp.indexOf(e.keyCode) < 0 && (this.tabFocusMode = -1), se.android && se.chrome && !e.synthetic && (e.keyCode == 13 || e.keyCode == 8))
      return this.view.observer.delayAndroidKey(e.key, e.keyCode), !0;
    if (se.ios && !e.synthetic && !e.altKey && !e.metaKey && (bp.some((t) => t.keyCode == e.keyCode) && !e.ctrlKey || C0.indexOf(e.key) > -1 && e.ctrlKey)) {
      let t = { ctrlKey: e.ctrlKey, altKey: e.altKey, metaKey: e.metaKey, shiftKey: e.shiftKey };
      return t.shiftKey && se.ios && !/^(off|none)$/.test(this.view.contentDOM.autocapitalize) && T0(this.view.win) && (t.shiftKey = !1), this.pendingIOSKey = { key: e.key, keyCode: e.keyCode, mods: t }, setTimeout(() => this.flushIOSKey(), 250), !0;
    }
    return e.keyCode != 229 && this.view.observer.forceFlush(), !1;
  }
  flushIOSKey(e) {
    let t = this.pendingIOSKey;
    return !t || t.key == "Enter" && e && e.from < e.to && /^\S+$/.test(e.insert.toString()) ? !1 : (this.pendingIOSKey = void 0, As(this.view.contentDOM, t.key, t.keyCode, t.mods));
  }
  ignoreDuringComposition(e) {
    return !/^key/.test(e.type) || e.synthetic ? !1 : this.composing > 0 ? !0 : se.safari && !se.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100 ? (this.compositionPendingKey = !1, !0) : !1;
  }
  startMouseSelection(e) {
    this.mouseSelection && this.mouseSelection.destroy(), this.mouseSelection = e;
  }
  update(e) {
    this.view.observer.update(e), this.mouseSelection && this.mouseSelection.update(e), this.draggedContent && e.docChanged && (this.draggedContent = this.draggedContent.map(e.changes)), e.transactions.length && (this.lastKeyCode = this.lastSelectionTime = 0);
  }
  destroy() {
    this.mouseSelection && this.mouseSelection.destroy();
  }
}
function T0(n) {
  return n.visualViewport ? n.visualViewport.height * n.visualViewport.scale / n.document.documentElement.clientHeight < 0.85 : !1;
}
function wf(n, e) {
  return (t, i) => {
    try {
      return e.call(n, i, t);
    } catch (s) {
      ni(t.state, s);
    }
  };
}
function Z0(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(i) {
    return e[i] || (e[i] = { observers: [], handlers: [] });
  }
  for (let i of n) {
    let s = i.spec, r = s && s.plugin.domEventHandlers, o = s && s.plugin.domEventObservers;
    if (r)
      for (let l in r) {
        let a = r[l];
        a && t(l).handlers.push(wf(i.value, a));
      }
    if (o)
      for (let l in o) {
        let a = o[l];
        a && t(l).observers.push(wf(i.value, a));
      }
  }
  for (let i in Ri)
    t(i).handlers.push(Ri[i]);
  for (let i in zt)
    t(i).observers.push(zt[i]);
  return e;
}
const bp = [
  { key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" },
  { key: "Enter", keyCode: 13, inputType: "insertParagraph" },
  { key: "Enter", keyCode: 13, inputType: "insertLineBreak" },
  { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }
], C0 = "dthko", yp = [16, 17, 18, 20, 91, 92, 224, 225], yo = 6;
function wo(n) {
  return Math.max(0, n) * 0.7 + 8;
}
function A0(n, e) {
  return Math.max(Math.abs(n.clientX - e.clientX), Math.abs(n.clientY - e.clientY));
}
class R0 {
  constructor(e, t, i, s) {
    this.view = e, this.startEvent = t, this.style = i, this.mustSelect = s, this.scrollSpeed = { x: 0, y: 0 }, this.scrolling = -1, this.lastEvent = t, this.scrollParents = qd(e.contentDOM), this.atoms = e.state.facet(oo).map((o) => o(e));
    let r = e.contentDOM.ownerDocument;
    r.addEventListener("mousemove", this.move = this.move.bind(this)), r.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = t.shiftKey, this.multiple = e.state.facet(Xe.allowMultipleSelections) && M0(e, t), this.dragging = E0(e, t) && Sp(t) == 1 ? null : !1;
  }
  start(e) {
    this.dragging === !1 && this.select(e);
  }
  move(e) {
    if (e.buttons == 0)
      return this.destroy();
    if (this.dragging || this.dragging == null && A0(this.startEvent, e) < 10)
      return;
    this.select(this.lastEvent = e);
    let t = 0, i = 0, s = 0, r = 0, o = this.view.win.innerWidth, l = this.view.win.innerHeight;
    this.scrollParents.x && ({ left: s, right: o } = this.scrollParents.x.getBoundingClientRect()), this.scrollParents.y && ({ top: r, bottom: l } = this.scrollParents.y.getBoundingClientRect());
    let a = hc(this.view);
    e.clientX - a.left <= s + yo ? t = -wo(s - e.clientX) : e.clientX + a.right >= o - yo && (t = wo(e.clientX - o)), e.clientY - a.top <= r + yo ? i = -wo(r - e.clientY) : e.clientY + a.bottom >= l - yo && (i = wo(e.clientY - l)), this.setScrollSpeed(t, i);
  }
  up(e) {
    this.dragging == null && this.select(this.lastEvent), this.dragging || e.preventDefault(), this.destroy();
  }
  destroy() {
    this.setScrollSpeed(0, 0);
    let e = this.view.contentDOM.ownerDocument;
    e.removeEventListener("mousemove", this.move), e.removeEventListener("mouseup", this.up), this.view.inputState.mouseSelection = this.view.inputState.draggedContent = null;
  }
  setScrollSpeed(e, t) {
    this.scrollSpeed = { x: e, y: t }, e || t ? this.scrolling < 0 && (this.scrolling = setInterval(() => this.scroll(), 50)) : this.scrolling > -1 && (clearInterval(this.scrolling), this.scrolling = -1);
  }
  scroll() {
    let { x: e, y: t } = this.scrollSpeed;
    e && this.scrollParents.x && (this.scrollParents.x.scrollLeft += e, e = 0), t && this.scrollParents.y && (this.scrollParents.y.scrollTop += t, t = 0), (e || t) && this.view.win.scrollBy(e, t), this.dragging === !1 && this.select(this.lastEvent);
  }
  select(e) {
    let { view: t } = this, i = Op(this.atoms, this.style.get(e, this.extend, this.multiple));
    (this.mustSelect || !i.eq(t.state.selection, this.dragging === !1)) && this.view.dispatch({
      selection: i,
      userEvent: "select.pointer"
    }), this.mustSelect = !1;
  }
  update(e) {
    e.transactions.some((t) => t.isUserEvent("input.type")) ? this.destroy() : this.style.update(e) && setTimeout(() => this.select(this.lastEvent), 20);
  }
}
function M0(n, e) {
  let t = n.state.facet(ep);
  return t.length ? t[0](e) : se.mac ? e.metaKey : e.ctrlKey;
}
function X0(n, e) {
  let t = n.state.facet(tp);
  return t.length ? t[0](e) : se.mac ? !e.altKey : !e.ctrlKey;
}
function E0(n, e) {
  let { main: t } = n.state.selection;
  if (t.empty)
    return !1;
  let i = Ir(n.root);
  if (!i || i.rangeCount == 0)
    return !0;
  let s = i.getRangeAt(0).getClientRects();
  for (let r = 0; r < s.length; r++) {
    let o = s[r];
    if (o.left <= e.clientX && o.right >= e.clientX && o.top <= e.clientY && o.bottom >= e.clientY)
      return !0;
  }
  return !1;
}
function L0(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target, i; t != n.contentDOM; t = t.parentNode)
    if (!t || t.nodeType == 11 || (i = st.get(t)) && i.isWidget() && !i.isHidden && i.widget.ignoreEvent(e))
      return !1;
  return !0;
}
const Ri = /* @__PURE__ */ Object.create(null), zt = /* @__PURE__ */ Object.create(null), wp = se.ie && se.ie_version < 15 || se.ios && se.webkit_version < 604;
function j0(n) {
  let e = n.dom.parentNode;
  if (!e)
    return;
  let t = e.appendChild(document.createElement("textarea"));
  t.style.cssText = "position: fixed; left: -10000px; top: 10px", t.focus(), setTimeout(() => {
    n.focus(), t.remove(), xp(n, t.value);
  }, 50);
}
function Xl(n, e, t) {
  for (let i of n.facet(e))
    t = i(t, n);
  return t;
}
function xp(n, e) {
  e = Xl(n.state, rc, e);
  let { state: t } = n, i, s = 1, r = t.toText(e), o = r.lines == t.selection.ranges.length;
  if (mh != null && t.selection.ranges.every((a) => a.empty) && mh == r.toString()) {
    let a = -1;
    i = t.changeByRange((h) => {
      let c = t.doc.lineAt(h.from);
      if (c.from == a)
        return { range: h };
      a = c.from;
      let f = t.toText((o ? r.line(s++).text : e) + t.lineBreak);
      return {
        changes: { from: c.from, insert: f },
        range: B.cursor(h.from + f.length)
      };
    });
  } else o ? i = t.changeByRange((a) => {
    let h = r.line(s++);
    return {
      changes: { from: a.from, to: a.to, insert: h.text },
      range: B.cursor(a.from + h.length)
    };
  }) : i = t.replaceSelection(r);
  n.dispatch(i, {
    userEvent: "input.paste",
    scrollIntoView: !0
  });
}
zt.scroll = (n) => {
  let e = n.inputState;
  e.lastScrollTop = n.scrollDOM.scrollTop, e.lastScrollLeft = n.scrollDOM.scrollLeft, se.ios && !e.touchActive && (e.lastIOSMomentumScroll = Date.now());
};
zt.wheel = zt.mousewheel = (n) => {
  n.inputState.lastWheelEvent = Date.now();
};
Ri.keydown = (n, e) => (n.inputState.setSelectionOrigin("select"), e.keyCode == 27 && n.inputState.tabFocusMode != 0 && (n.inputState.tabFocusMode = Date.now() + 2e3), !1);
zt.touchstart = (n, e) => {
  let t = n.inputState, i = e.targetTouches[0];
  t.touchActive = !0, t.lastTouchTime = Date.now(), i && (t.lastTouchX = i.clientX, t.lastTouchY = i.clientY), t.setSelectionOrigin("select.pointer");
};
zt.touchmove = (n) => {
  n.inputState.setSelectionOrigin("select.pointer");
};
zt.touchend = (n, e) => {
  n.inputState.touchActive = !1;
};
Ri.mousedown = (n, e) => {
  if (n.observer.flush(), n.inputState.lastTouchTime > Date.now() - 2e3)
    return !1;
  let t = null;
  for (let i of n.state.facet(ip))
    if (t = i(n, e), t)
      break;
  if (!t && e.button == 0 && (t = D0(n, e)), t) {
    let i = !n.hasFocus;
    n.inputState.startMouseSelection(new R0(n, e, t, i)), i && n.observer.ignore(() => {
      Bd(n.contentDOM);
      let r = n.root.activeElement;
      r && !r.contains(n.contentDOM) && r.blur();
    });
    let s = n.inputState.mouseSelection;
    if (s)
      return s.start(e), s.dragging === !1;
  } else
    n.inputState.setSelectionOrigin("select.pointer");
  return !1;
};
function xf(n, e, t, i) {
  if (i == 1)
    return B.cursor(e, t);
  if (i == 2)
    return p0(n.state, e, t);
  {
    let s = n.docView.lineAt(e, t), r = n.state.doc.lineAt(s ? s.posAtEnd : e), o = s ? s.posAtStart : r.from, l = s ? s.posAtEnd : r.to;
    return l < n.state.doc.length && l == r.to && l++, B.undirectionalRange(o, l);
  }
}
const z0 = se.ie && se.ie_version <= 11;
let Sf = null, Qf = 0, kf = 0;
function Sp(n) {
  if (!z0)
    return n.detail;
  let e = Sf, t = kf;
  return Sf = n, kf = Date.now(), Qf = !e || t > Date.now() - 400 && Math.abs(e.clientX - n.clientX) < 2 && Math.abs(e.clientY - n.clientY) < 2 ? (Qf + 1) % 3 : 1;
}
function D0(n, e) {
  let t = n.posAndSideAtCoords({ x: e.clientX, y: e.clientY }, !1), i = Sp(e), s = n.state.selection;
  return {
    update(r) {
      r.docChanged && (t.pos = r.changes.mapPos(t.pos), s = s.map(r.changes));
    },
    get(r, o, l) {
      let a = n.posAndSideAtCoords({ x: r.clientX, y: r.clientY }, !1), h, c = xf(n, a.pos, a.assoc, i);
      if (t.pos != a.pos && !o) {
        let f = xf(n, t.pos, t.assoc, i), d = Math.min(f.from, c.from), p = Math.max(f.to, c.to);
        c = d < c.from ? B.range(d, p, c.assoc) : B.range(p, d, c.assoc);
      }
      return o ? s.replaceRange(s.main.extend(c.from, c.to, c.assoc)) : l && i == 1 && s.ranges.length > 1 && (h = I0(s, a.pos)) ? h : l ? s.addRange(c) : B.create([c]);
    }
  };
}
function I0(n, e) {
  for (let t = 0; t < n.ranges.length; t++) {
    let { from: i, to: s } = n.ranges[t];
    if (i <= e && s >= e)
      return B.create(n.ranges.slice(0, t).concat(n.ranges.slice(t + 1)), n.mainIndex == t ? 0 : n.mainIndex - (n.mainIndex > t ? 1 : 0));
  }
  return null;
}
Ri.dragstart = (n, e) => {
  let { selection: { main: t } } = n.state;
  if (e.target.draggable) {
    let s = n.docView.tile.nearest(e.target);
    if (s && s.isWidget()) {
      let r = s.posAtStart, o = r + s.length;
      (r >= t.to || o <= t.from) && (t = B.undirectionalRange(r, o));
    }
  }
  let { inputState: i } = n;
  return i.mouseSelection && (i.mouseSelection.dragging = !0), i.draggedContent = t, e.dataTransfer && (e.dataTransfer.setData("Text", Xl(n.state, oc, n.state.sliceDoc(t.from, t.to))), e.dataTransfer.effectAllowed = "copyMove"), !1;
};
Ri.dragend = (n) => (n.inputState.draggedContent = null, !1);
function $f(n, e, t, i) {
  if (t = Xl(n.state, rc, t), !t)
    return;
  let s = n.posAtCoords({ x: e.clientX, y: e.clientY }, !1), { draggedContent: r } = n.inputState, o = i && r && X0(n, e) ? { from: r.from, to: r.to } : null, l = { from: s, insert: t }, a = n.state.changes(o ? [o, l] : l);
  n.focus(), n.dispatch({
    changes: a,
    selection: { anchor: a.mapPos(s, -1), head: a.mapPos(s, 1) },
    userEvent: o ? "move.drop" : "input.drop"
  }), n.inputState.draggedContent = null;
}
Ri.drop = (n, e) => {
  if (!e.dataTransfer)
    return !1;
  if (n.state.readOnly)
    return !0;
  let t = e.dataTransfer.files;
  if (t && t.length) {
    let i = Array(t.length), s = 0, r = () => {
      ++s == t.length && $f(n, e, i.filter((o) => o != null).join(n.state.lineBreak), !1);
    };
    for (let o = 0; o < t.length; o++) {
      let l = new FileReader();
      l.onerror = r, l.onload = () => {
        /[\x00-\x08\x0e-\x1f]{2}/.test(l.result) || (i[o] = l.result), r();
      }, l.readAsText(t[o]);
    }
    return !0;
  } else {
    let i = e.dataTransfer.getData("Text");
    if (i)
      return $f(n, e, i, !0), !0;
  }
  return !1;
};
Ri.paste = (n, e) => {
  if (n.state.readOnly)
    return !0;
  n.observer.flush();
  let t = wp ? null : e.clipboardData;
  return t ? (xp(n, t.getData("text/plain") || t.getData("text/uri-list")), !0) : (j0(n), !1);
};
function W0(n, e) {
  let t = n.dom.parentNode;
  if (!t)
    return;
  let i = t.appendChild(document.createElement("textarea"));
  i.style.cssText = "position: fixed; left: -10000px; top: 10px", i.value = e, i.focus(), i.selectionEnd = e.length, i.selectionStart = 0, setTimeout(() => {
    i.remove(), n.focus();
  }, 50);
}
function Y0(n) {
  let e = [], t = [], i = !1;
  for (let s of n.selection.ranges)
    s.empty || (e.push(n.sliceDoc(s.from, s.to)), t.push(s));
  if (!e.length) {
    let s = -1;
    for (let { from: r } of n.selection.ranges) {
      let o = n.doc.lineAt(r);
      o.number > s && (e.push(o.text), t.push({ from: o.from, to: Math.min(n.doc.length, o.to + 1) })), s = o.number;
    }
    i = !0;
  }
  return { text: Xl(n, oc, e.join(n.lineBreak)), ranges: t, linewise: i };
}
let mh = null;
Ri.copy = Ri.cut = (n, e) => {
  if (!Cr(n.contentDOM, n.observer.selectionRange))
    return !1;
  let { text: t, ranges: i, linewise: s } = Y0(n.state);
  if (!t && !s)
    return !1;
  mh = s ? t : null, e.type == "cut" && !n.state.readOnly && n.dispatch({
    changes: i,
    scrollIntoView: !0,
    userEvent: "delete.cut"
  });
  let r = wp ? null : e.clipboardData;
  return r ? (r.clearData(), r.setData("text/plain", t), !0) : (W0(n, t), !1);
};
const Qp = /* @__PURE__ */ mn.define();
function kp(n, e) {
  let t = [];
  for (let i of n.facet(rp)) {
    let s = i(n, e);
    s && t.push(s);
  }
  return t.length ? n.update({ effects: t, annotations: Qp.of(!0) }) : null;
}
function $p(n) {
  setTimeout(() => {
    let e = n.hasFocus;
    if (e != n.inputState.notifiedFocused) {
      let t = kp(n.state, e);
      t ? n.dispatch(t) : n.update([]);
    }
  }, 10);
}
zt.focus = (n) => {
  n.inputState.lastFocusTime = Date.now(), !n.scrollDOM.scrollTop && (n.inputState.lastScrollTop || n.inputState.lastScrollLeft) && (n.scrollDOM.scrollTop = n.inputState.lastScrollTop, n.scrollDOM.scrollLeft = n.inputState.lastScrollLeft), $p(n);
};
zt.blur = (n) => {
  n.observer.clearSelectionRange(), $p(n);
};
zt.compositionstart = zt.compositionupdate = (n) => {
  n.observer.editContext || (n.inputState.compositionFirstChange == null && (n.inputState.compositionFirstChange = !0), n.inputState.composing < 0 && (n.inputState.composing = 0));
};
zt.compositionend = (n) => {
  n.observer.editContext || (n.inputState.composing = -1, n.inputState.compositionEndedAt = Date.now(), n.inputState.compositionPendingKey = !0, n.inputState.compositionPendingChange = n.observer.pendingRecords().length > 0, n.inputState.compositionFirstChange = null, se.chrome && se.android ? n.observer.flushSoon() : n.inputState.compositionPendingChange ? Promise.resolve().then(() => n.observer.flush()) : setTimeout(() => {
    n.inputState.composing < 0 && n.docView.hasComposition && n.update([]);
  }, 50));
};
zt.contextmenu = (n) => {
  n.inputState.lastContextMenu = Date.now();
};
Ri.beforeinput = (n, e) => {
  var t, i;
  if ((e.inputType == "insertText" || e.inputType == "insertCompositionText") && (n.inputState.insertingText = e.data, n.inputState.insertingTextAt = Date.now()), e.inputType == "insertReplacementText" && n.observer.editContext) {
    let r = (t = e.dataTransfer) === null || t === void 0 ? void 0 : t.getData("text/plain"), o = e.getTargetRanges();
    if (r && o.length) {
      let l = o[0], a = n.posAtDOM(l.startContainer, l.startOffset), h = n.posAtDOM(l.endContainer, l.endOffset);
      return cc(n, { from: a, to: h, insert: n.state.toText(r) }, null), !0;
    }
  }
  let s;
  if (se.chrome && se.android && (s = bp.find((r) => r.inputType == e.inputType)) && (n.observer.delayAndroidKey(s.key, s.keyCode), s.key == "Backspace" || s.key == "Delete")) {
    let r = ((i = window.visualViewport) === null || i === void 0 ? void 0 : i.height) || 0;
    setTimeout(() => {
      var o;
      (((o = window.visualViewport) === null || o === void 0 ? void 0 : o.height) || 0) > r + 10 && n.hasFocus && (n.contentDOM.blur(), n.focus());
    }, 100);
  }
  return se.ios && e.inputType == "deleteContentForward" && n.observer.flushSoon(), se.safari && e.inputType == "insertText" && n.inputState.composing >= 0 && setTimeout(() => zt.compositionend(n, e), 20), !1;
};
const Pf = /* @__PURE__ */ new Set();
function q0(n) {
  Pf.has(n) || (Pf.add(n), n.addEventListener("copy", () => {
  }), n.addEventListener("cut", () => {
  }));
}
const _f = ["pre-wrap", "normal", "pre-line", "break-spaces"];
let Js = !1;
function Tf() {
  Js = !1;
}
class B0 {
  constructor(e) {
    this.lineWrapping = e, this.doc = Re.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30;
  }
  heightForGap(e, t) {
    let i = this.doc.lineAt(t).number - this.doc.lineAt(e).number + 1;
    return this.lineWrapping && (i += Math.max(0, Math.ceil((t - e - i * this.lineLength * 0.5) / this.lineLength))), this.lineHeight * i;
  }
  heightForLine(e) {
    return this.lineWrapping ? (1 + Math.max(0, Math.ceil((e - this.lineLength) / Math.max(1, this.lineLength - 5)))) * this.lineHeight : this.lineHeight;
  }
  setDoc(e) {
    return this.doc = e, this;
  }
  mustRefreshForWrapping(e) {
    return _f.indexOf(e) > -1 != this.lineWrapping;
  }
  mustRefreshForHeights(e) {
    let t = !1;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      s < 0 ? i++ : this.heightSamples[Math.floor(s * 10)] || (t = !0, this.heightSamples[Math.floor(s * 10)] = !0);
    }
    return t;
  }
  refresh(e, t, i, s, r, o) {
    let l = _f.indexOf(e) > -1, a = Math.abs(t - this.lineHeight) > 0.3 || this.lineWrapping != l;
    if (this.lineWrapping = l, this.lineHeight = t, this.charWidth = i, this.textHeight = s, this.lineLength = r, a) {
      this.heightSamples = {};
      for (let h = 0; h < o.length; h++) {
        let c = o[h];
        c < 0 ? h++ : this.heightSamples[Math.floor(c * 10)] = !0;
      }
    }
    return a;
  }
}
class V0 {
  constructor(e, t) {
    this.from = e, this.heights = t, this.index = 0;
  }
  get more() {
    return this.index < this.heights.length;
  }
}
class Pi {
  /**
  @internal
  */
  constructor(e, t, i, s, r) {
    this.from = e, this.length = t, this.top = i, this.height = s, this._content = r;
  }
  /**
  The type of element this is. When querying lines, this may be
  an array of all the blocks that make up the line.
  */
  get type() {
    return typeof this._content == "number" ? yi.Text : Array.isArray(this._content) ? this._content : this._content.type;
  }
  /**
  The end of the element as a document position.
  */
  get to() {
    return this.from + this.length;
  }
  /**
  The bottom position of the element.
  */
  get bottom() {
    return this.top + this.height;
  }
  /**
  If this is a widget block, this will return the widget
  associated with it.
  */
  get widget() {
    return this._content instanceof fs ? this._content.widget : null;
  }
  /**
  If this is a textblock, this holds the number of line breaks
  that appear in widgets inside the block.
  */
  get widgetLineBreaks() {
    return typeof this._content == "number" ? this._content : 0;
  }
  /**
  @internal
  */
  join(e) {
    let t = (Array.isArray(this._content) ? this._content : [this]).concat(Array.isArray(e._content) ? e._content : [e]);
    return new Pi(this.from, this.length + e.length, this.top, this.height + e.height, t);
  }
}
var Be = /* @__PURE__ */ (function(n) {
  return n[n.ByPos = 0] = "ByPos", n[n.ByHeight = 1] = "ByHeight", n[n.ByPosNoHeight = 2] = "ByPosNoHeight", n;
})(Be || (Be = {}));
const qo = 1e-3;
class jt {
  constructor(e, t, i = 2) {
    this.length = e, this.height = t, this.flags = i;
  }
  get outdated() {
    return (this.flags & 2) > 0;
  }
  set outdated(e) {
    this.flags = (e ? 2 : 0) | this.flags & -3;
  }
  setHeight(e) {
    this.height != e && (Math.abs(this.height - e) > qo && (Js = !0), this.height = e);
  }
  // Base case is to replace a leaf node, which simply builds a tree
  // from the new nodes and returns that (HeightMapBranch and
  // HeightMapGap override this to actually use from/to)
  replace(e, t, i) {
    return jt.of(i);
  }
  // Again, these are base cases, and are overridden for branch and gap nodes.
  decomposeLeft(e, t) {
    t.push(this);
  }
  decomposeRight(e, t) {
    t.push(this);
  }
  applyChanges(e, t, i, s) {
    let r = this, o = i.doc;
    for (let l = s.length - 1; l >= 0; l--) {
      let { fromA: a, toA: h, fromB: c, toB: f } = s[l], d = r.lineAt(a, Be.ByPosNoHeight, i.setDoc(t), 0, 0), p = d.to >= h ? d : r.lineAt(h, Be.ByPosNoHeight, i, 0, 0);
      for (f += p.to - h, h = p.to; l > 0 && d.from <= s[l - 1].toA; )
        a = s[l - 1].fromA, c = s[l - 1].fromB, l--, a < d.from && (d = r.lineAt(a, Be.ByPosNoHeight, i, 0, 0));
      c += d.from - a, a = d.from;
      let O = fc.build(i.setDoc(o), e, c, f);
      r = ol(r, r.replace(a, h, O));
    }
    return r.updateHeight(i, 0);
  }
  static empty() {
    return new ii(0, 0, 0);
  }
  // nodes uses null values to indicate the position of line breaks.
  // There are never line breaks at the start or end of the array, or
  // two line breaks next to each other, and the array isn't allowed
  // to be empty (same restrictions as return value from the builder).
  static of(e) {
    if (e.length == 1)
      return e[0];
    let t = 0, i = e.length, s = 0, r = 0;
    for (; ; )
      if (t == i)
        if (s > r * 2) {
          let l = e[t - 1];
          l.break ? e.splice(--t, 1, l.left, null, l.right) : e.splice(--t, 1, l.left, l.right), i += 1 + l.break, s -= l.size;
        } else if (r > s * 2) {
          let l = e[i];
          l.break ? e.splice(i, 1, l.left, null, l.right) : e.splice(i, 1, l.left, l.right), i += 2 + l.break, r -= l.size;
        } else
          break;
      else if (s < r) {
        let l = e[t++];
        l && (s += l.size);
      } else {
        let l = e[--i];
        l && (r += l.size);
      }
    let o = 0;
    return e[t - 1] == null ? (o = 1, t--) : e[t] == null && (o = 1, i++), new G0(jt.of(e.slice(0, t)), o, jt.of(e.slice(i)));
  }
}
function ol(n, e) {
  return n == e ? n : (n.constructor != e.constructor && (Js = !0), e);
}
jt.prototype.size = 1;
const N0 = /* @__PURE__ */ We.replace({});
class Pp extends jt {
  constructor(e, t, i) {
    super(e, t), this.deco = i, this.spaceAbove = 0;
  }
  mainBlock(e, t) {
    return new Pi(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.deco || 0);
  }
  blockAt(e, t, i, s) {
    return this.spaceAbove && e < i + this.spaceAbove ? new Pi(s, 0, i, this.spaceAbove, N0) : this.mainBlock(i, s);
  }
  lineAt(e, t, i, s, r) {
    let o = this.mainBlock(s, r);
    return this.spaceAbove ? this.blockAt(0, i, s, r).join(o) : o;
  }
  forEachLine(e, t, i, s, r, o) {
    e <= r + this.length && t >= r && o(this.lineAt(0, Be.ByPos, i, s, r));
  }
  setMeasuredHeight(e) {
    let t = e.heights[e.index++];
    t < 0 ? (this.spaceAbove = -t, t = e.heights[e.index++]) : this.spaceAbove = 0, this.setHeight(t);
  }
  updateHeight(e, t = 0, i = !1, s) {
    return s && s.from <= t && s.more && this.setMeasuredHeight(s), this.outdated = !1, this;
  }
  toString() {
    return `block(${this.length})`;
  }
}
class ii extends Pp {
  constructor(e, t, i) {
    super(e, t, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0, this.spaceAbove = i;
  }
  mainBlock(e, t) {
    return new Pi(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.breaks);
  }
  replace(e, t, i) {
    let s = i[0];
    return i.length == 1 && (s instanceof ii || s instanceof yt && s.flags & 4) && Math.abs(this.length - s.length) < 10 ? (s instanceof yt ? s = new ii(s.length, this.height, this.spaceAbove) : s.height = this.height, this.outdated || (s.outdated = !1), s) : jt.of(i);
  }
  updateHeight(e, t = 0, i = !1, s) {
    return s && s.from <= t && s.more ? this.setMeasuredHeight(s) : (i || this.outdated) && (this.spaceAbove = 0, this.setHeight(Math.max(this.widgetHeight, e.heightForLine(this.length - this.collapsed)) + this.breaks * e.lineHeight)), this.outdated = !1, this;
  }
  toString() {
    return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
  }
}
class yt extends jt {
  constructor(e) {
    super(e, 0);
  }
  heightMetrics(e, t) {
    let i = e.doc.lineAt(t).number, s = e.doc.lineAt(t + this.length).number, r = s - i + 1, o, l = 0;
    if (e.lineWrapping) {
      let a = Math.min(this.height, e.lineHeight * r);
      o = a / r, this.length > r + 1 && (l = (this.height - a) / (this.length - r - 1));
    } else
      o = this.height / r;
    return { firstLine: i, lastLine: s, perLine: o, perChar: l };
  }
  blockAt(e, t, i, s) {
    let { firstLine: r, lastLine: o, perLine: l, perChar: a } = this.heightMetrics(t, s);
    if (t.lineWrapping) {
      let h = s + (e < t.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (e - i) / this.height)) * this.length)), c = t.doc.lineAt(h), f = l + c.length * a, d = Math.max(i, e - f / 2);
      return new Pi(c.from, c.length, d, f, 0);
    } else {
      let h = Math.max(0, Math.min(o - r, Math.floor((e - i) / l))), { from: c, length: f } = t.doc.line(r + h);
      return new Pi(c, f, i + l * h, l, 0);
    }
  }
  lineAt(e, t, i, s, r) {
    if (t == Be.ByHeight)
      return this.blockAt(e, i, s, r);
    if (t == Be.ByPosNoHeight) {
      let { from: p, to: O } = i.doc.lineAt(e);
      return new Pi(p, O - p, 0, 0, 0);
    }
    let { firstLine: o, perLine: l, perChar: a } = this.heightMetrics(i, r), h = i.doc.lineAt(e), c = l + h.length * a, f = h.number - o, d = s + l * f + a * (h.from - r - f);
    return new Pi(h.from, h.length, Math.max(s, Math.min(d, s + this.height - c)), c, 0);
  }
  forEachLine(e, t, i, s, r, o) {
    e = Math.max(e, r), t = Math.min(t, r + this.length);
    let { firstLine: l, perLine: a, perChar: h } = this.heightMetrics(i, r);
    for (let c = e, f = s; c <= t; ) {
      let d = i.doc.lineAt(c);
      if (c == e) {
        let O = d.number - l;
        f += a * O + h * (e - r - O);
      }
      let p = a + h * d.length;
      o(new Pi(d.from, d.length, f, p, 0)), f += p, c = d.to + 1;
    }
  }
  replace(e, t, i) {
    let s = this.length - t;
    if (s > 0) {
      let r = i[i.length - 1];
      r instanceof yt ? i[i.length - 1] = new yt(r.length + s) : i.push(null, new yt(s - 1));
    }
    if (e > 0) {
      let r = i[0];
      r instanceof yt ? i[0] = new yt(e + r.length) : i.unshift(new yt(e - 1), null);
    }
    return jt.of(i);
  }
  decomposeLeft(e, t) {
    t.push(new yt(e - 1), null);
  }
  decomposeRight(e, t) {
    t.push(null, new yt(this.length - e - 1));
  }
  updateHeight(e, t = 0, i = !1, s) {
    let r = t + this.length;
    if (s && s.from <= t + this.length && s.more) {
      let o = [], l = Math.max(t, s.from), a = -1;
      for (s.from > t && o.push(new yt(s.from - t - 1).updateHeight(e, t)); l <= r && s.more; ) {
        let c = e.doc.lineAt(l).length;
        o.length && o.push(null);
        let f = s.heights[s.index++], d = 0;
        f < 0 && (d = -f, f = s.heights[s.index++]), a == -1 ? a = f : Math.abs(f - a) >= qo && (a = -2);
        let p = new ii(c, f, d);
        p.outdated = !1, o.push(p), l += c + 1;
      }
      l <= r && o.push(null, new yt(r - l).updateHeight(e, l));
      let h = jt.of(o);
      return (a < 0 || Math.abs(h.height - this.height) >= qo || Math.abs(a - this.heightMetrics(e, t).perLine) >= qo) && (Js = !0), ol(this, h);
    } else (i || this.outdated) && (this.setHeight(e.heightForGap(t, t + this.length)), this.outdated = !1);
    return this;
  }
  toString() {
    return `gap(${this.length})`;
  }
}
class G0 extends jt {
  constructor(e, t, i) {
    super(e.length + t + i.length, e.height + i.height, t | (e.outdated || i.outdated ? 2 : 0)), this.left = e, this.right = i, this.size = e.size + i.size;
  }
  get break() {
    return this.flags & 1;
  }
  blockAt(e, t, i, s) {
    let r = i + this.left.height;
    return e < r ? this.left.blockAt(e, t, i, s) : this.right.blockAt(e, t, r, s + this.left.length + this.break);
  }
  lineAt(e, t, i, s, r) {
    let o = s + this.left.height, l = r + this.left.length + this.break, a = t == Be.ByHeight ? e < o : e < l, h = a ? this.left.lineAt(e, t, i, s, r) : this.right.lineAt(e, t, i, o, l);
    if (this.break || (a ? h.to < l : h.from > l))
      return h;
    let c = t == Be.ByPosNoHeight ? Be.ByPosNoHeight : Be.ByPos;
    return a ? h.join(this.right.lineAt(l, c, i, o, l)) : this.left.lineAt(l, c, i, s, r).join(h);
  }
  forEachLine(e, t, i, s, r, o) {
    let l = s + this.left.height, a = r + this.left.length + this.break;
    if (this.break)
      e < a && this.left.forEachLine(e, t, i, s, r, o), t >= a && this.right.forEachLine(e, t, i, l, a, o);
    else {
      let h = this.lineAt(a, Be.ByPos, i, s, r);
      e < h.from && this.left.forEachLine(e, h.from - 1, i, s, r, o), h.to >= e && h.from <= t && o(h), t > h.to && this.right.forEachLine(h.to + 1, t, i, l, a, o);
    }
  }
  replace(e, t, i) {
    let s = this.left.length + this.break;
    if (t < s)
      return this.balanced(this.left.replace(e, t, i), this.right);
    if (e > this.left.length)
      return this.balanced(this.left, this.right.replace(e - s, t - s, i));
    let r = [];
    e > 0 && this.decomposeLeft(e, r);
    let o = r.length;
    for (let l of i)
      r.push(l);
    if (e > 0 && Zf(r, o - 1), t < this.length) {
      let l = r.length;
      this.decomposeRight(t, r), Zf(r, l);
    }
    return jt.of(r);
  }
  decomposeLeft(e, t) {
    let i = this.left.length;
    if (e <= i)
      return this.left.decomposeLeft(e, t);
    t.push(this.left), this.break && (i++, e >= i && t.push(null)), e > i && this.right.decomposeLeft(e - i, t);
  }
  decomposeRight(e, t) {
    let i = this.left.length, s = i + this.break;
    if (e >= s)
      return this.right.decomposeRight(e - s, t);
    e < i && this.left.decomposeRight(e, t), this.break && e < s && t.push(null), t.push(this.right);
  }
  balanced(e, t) {
    return e.size > 2 * t.size || t.size > 2 * e.size ? jt.of(this.break ? [e, null, t] : [e, t]) : (this.left = ol(this.left, e), this.right = ol(this.right, t), this.setHeight(e.height + t.height), this.outdated = e.outdated || t.outdated, this.size = e.size + t.size, this.length = e.length + this.break + t.length, this);
  }
  updateHeight(e, t = 0, i = !1, s) {
    let { left: r, right: o } = this, l = t + r.length + this.break, a = null;
    return s && s.from <= t + r.length && s.more ? a = r = r.updateHeight(e, t, i, s) : r.updateHeight(e, t, i), s && s.from <= l + o.length && s.more ? a = o = o.updateHeight(e, l, i, s) : o.updateHeight(e, l, i), a ? this.balanced(r, o) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
  }
  toString() {
    return this.left + (this.break ? " " : "-") + this.right;
  }
}
function Zf(n, e) {
  let t, i;
  n[e] == null && (t = n[e - 1]) instanceof yt && (i = n[e + 1]) instanceof yt && n.splice(e - 1, 3, new yt(t.length + 1 + i.length));
}
const U0 = 5;
class fc {
  constructor(e, t) {
    this.pos = e, this.oracle = t, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = e;
  }
  get isCovered() {
    return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
  }
  span(e, t) {
    if (this.lineStart > -1) {
      let i = Math.min(t, this.lineEnd), s = this.nodes[this.nodes.length - 1];
      s instanceof ii ? s.length += i - this.pos : (i > this.pos || !this.isCovered) && this.nodes.push(new ii(i - this.pos, -1, 0)), this.writtenTo = i, t > i && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
    }
    this.pos = t;
  }
  point(e, t, i) {
    if (e < t || i.heightRelevant) {
      let s = i.widget ? i.widget.estimatedHeight : 0, r = i.widget ? i.widget.lineBreaks : 0;
      s < 0 && (s = this.oracle.lineHeight);
      let o = t - e;
      i.block ? this.addBlock(new Pp(o, s, i)) : (o || r || s >= U0) && this.addLineDeco(s, r, o);
    } else t > e && this.span(e, t);
    this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
  }
  enterLine() {
    if (this.lineStart > -1)
      return;
    let { from: e, to: t } = this.oracle.doc.lineAt(this.pos);
    this.lineStart = e, this.lineEnd = t, this.writtenTo < e && ((this.writtenTo < e - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, e - 1)), this.nodes.push(null)), this.pos > e && this.nodes.push(new ii(this.pos - e, -1, 0)), this.writtenTo = this.pos;
  }
  blankContent(e, t) {
    let i = new yt(t - e);
    return this.oracle.doc.lineAt(e).to == t && (i.flags |= 4), i;
  }
  ensureLine() {
    this.enterLine();
    let e = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
    if (e instanceof ii)
      return e;
    let t = new ii(0, -1, 0);
    return this.nodes.push(t), t;
  }
  addBlock(e) {
    this.enterLine();
    let t = e.deco;
    t && t.startSide > 0 && !this.isCovered && this.ensureLine(), this.nodes.push(e), this.writtenTo = this.pos = this.pos + e.length, t && t.endSide > 0 && (this.covering = e);
  }
  addLineDeco(e, t, i) {
    let s = this.ensureLine();
    s.length += i, s.collapsed += i, s.widgetHeight = Math.max(s.widgetHeight, e), s.breaks += t, this.writtenTo = this.pos = this.pos + i;
  }
  finish(e) {
    let t = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
    this.lineStart > -1 && !(t instanceof ii) && !this.isCovered ? this.nodes.push(new ii(0, -1, 0)) : (this.writtenTo < this.pos || t == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
    let i = e;
    for (let s of this.nodes)
      s instanceof ii && s.updateHeight(this.oracle, i), i += s ? s.length : 1;
    return this.nodes;
  }
  // Always called with a region that on both sides either stretches
  // to a line break or the end of the document.
  // The returned array uses null to indicate line breaks, but never
  // starts or ends in a line break, or has multiple line breaks next
  // to each other.
  static build(e, t, i, s) {
    let r = new fc(i, e);
    return Le.spans(t, i, s, r, 0), r.finish(i);
  }
}
function F0(n, e, t) {
  let i = new H0();
  return Le.compare(n, e, t, i, 0), i.changes;
}
class H0 {
  constructor() {
    this.changes = [];
  }
  compareRange() {
  }
  comparePoint(e, t, i, s) {
    (e < t || i && i.heightRelevant || s && s.heightRelevant) && Cs(e, t, this.changes, 5);
  }
}
function K0(n, e) {
  let t = n.getBoundingClientRect(), i = n.ownerDocument, s = i.defaultView || window, r = Math.max(0, t.left), o = Math.min(s.innerWidth, t.right), l = Math.max(0, t.top), a = Math.min(s.innerHeight, t.bottom);
  for (let h = n.parentNode; h && h != i.body; )
    if (h.nodeType == 1) {
      let c = h, f = window.getComputedStyle(c);
      if ((c.scrollHeight > c.clientHeight || c.scrollWidth > c.clientWidth) && f.overflow != "visible") {
        let d = c.getBoundingClientRect();
        r = Math.max(r, d.left), o = Math.min(o, d.right), l = Math.max(l, d.top), a = Math.min(h == n.parentNode ? s.innerHeight : a, d.bottom);
      }
      h = f.position == "absolute" || f.position == "fixed" ? c.offsetParent : c.parentNode;
    } else if (h.nodeType == 11)
      h = h.host;
    else
      break;
  return {
    left: r - t.left,
    right: Math.max(r, o) - t.left,
    top: l - (t.top + e),
    bottom: Math.max(l, a) - (t.top + e)
  };
}
function J0(n) {
  let e = n.getBoundingClientRect(), t = n.ownerDocument.defaultView || window;
  return e.left < t.innerWidth && e.right > 0 && e.top < t.innerHeight && e.bottom > 0;
}
function e1(n, e) {
  let t = n.getBoundingClientRect();
  return {
    left: 0,
    right: t.right - t.left,
    top: e,
    bottom: t.bottom - (t.top + e)
  };
}
class ha {
  constructor(e, t, i, s) {
    this.from = e, this.to = t, this.size = i, this.displaySize = s;
  }
  static same(e, t) {
    if (e.length != t.length)
      return !1;
    for (let i = 0; i < e.length; i++) {
      let s = e[i], r = t[i];
      if (s.from != r.from || s.to != r.to || s.size != r.size)
        return !1;
    }
    return !0;
  }
  draw(e, t) {
    return We.replace({
      widget: new t1(this.displaySize * (t ? e.scaleY : e.scaleX), t)
    }).range(this.from, this.to);
  }
}
class t1 extends or {
  constructor(e, t) {
    super(), this.size = e, this.vertical = t;
  }
  eq(e) {
    return e.size == this.size && e.vertical == this.vertical;
  }
  toDOM() {
    let e = document.createElement("div");
    return this.vertical ? e.style.height = this.size + "px" : (e.style.width = this.size + "px", e.style.height = "2px", e.style.display = "inline-block"), e;
  }
  get estimatedHeight() {
    return this.vertical ? this.size : -1;
  }
}
class Cf {
  constructor(e, t) {
    this.view = e, this.state = t, this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 }, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scaleX = 1, this.scaleY = 1, this.scrollOffset = 0, this.scrolledToBottom = !1, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = Af, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = nt.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1;
    let i = t.facet(lc).some((s) => typeof s != "function" && s.class == "cm-lineWrapping");
    this.heightOracle = new B0(i), this.stateDeco = Rf(t), this.heightMap = jt.empty().applyChanges(this.stateDeco, Re.empty, this.heightOracle.setDoc(t.doc), [new di(0, 0, 0, t.doc.length)]);
    for (let s = 0; s < 2 && (this.viewport = this.getViewport(0, null), !!this.updateForViewport()); s++)
      ;
    this.updateViewportLines(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = We.set(this.lineGaps.map((s) => s.draw(this, !1))), this.scrollParent = e.scrollDOM, this.computeVisibleRanges();
  }
  updateForViewport() {
    let e = [this.viewport], { main: t } = this.state.selection;
    for (let i = 0; i <= 1; i++) {
      let s = i ? t.head : t.anchor;
      if (!e.some(({ from: r, to: o }) => s >= r && s <= o)) {
        let { from: r, to: o } = this.lineBlockAt(s);
        e.push(new xo(r, o));
      }
    }
    return this.viewports = e.sort((i, s) => i.from - s.from), this.updateScaler();
  }
  updateScaler() {
    let e = this.scaler;
    return this.scaler = this.heightMap.height <= 7e6 ? Af : new uc(this.heightOracle, this.heightMap, this.viewports), e.eq(this.scaler) ? 0 : 2;
  }
  updateViewportLines() {
    this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (e) => {
      this.viewportLines.push(wr(e, this.scaler));
    });
  }
  update(e, t = null) {
    this.state = e.state;
    let i = this.stateDeco;
    this.stateDeco = Rf(this.state);
    let s = e.changedRanges, r = di.extendWithRanges(s, F0(i, this.stateDeco, e ? e.changes : pt.empty(this.state.doc.length))), o = this.heightMap.height, l = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollOffset);
    Tf(), this.heightMap = this.heightMap.applyChanges(this.stateDeco, e.startState.doc, this.heightOracle.setDoc(this.state.doc), r), (this.heightMap.height != o || Js) && (e.flags |= 2), l ? (this.scrollAnchorPos = e.changes.mapPos(l.from, -1), this.scrollAnchorHeight = l.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = o);
    let a = r.length ? this.mapViewport(this.viewport, e.changes) : this.viewport;
    (t && (t.range.head < a.from || t.range.head > a.to) || !this.viewportIsAppropriate(a)) && (a = this.getViewport(0, t));
    let h = a.from != this.viewport.from || a.to != this.viewport.to;
    this.viewport = a, e.flags |= this.updateForViewport(), (h || !e.changes.empty || e.flags & 2) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, e.changes))), e.flags |= this.computeVisibleRanges(e.changes), t && (this.scrollTarget = t), !this.mustEnforceCursorAssoc && (e.selectionSet || e.focusChanged) && e.view.lineWrapping && e.state.selection.main.empty && e.state.selection.main.assoc && !e.state.facet(Bv) && (this.mustEnforceCursorAssoc = !0);
  }
  measure() {
    let { view: e } = this, t = e.contentDOM, i = window.getComputedStyle(t), s = this.heightOracle, r = i.whiteSpace;
    this.defaultTextDirection = i.direction == "rtl" ? nt.RTL : nt.LTR;
    let o = this.heightOracle.mustRefreshForWrapping(r) || this.mustMeasureContent === "refresh", l = t.getBoundingClientRect(), a = o || this.mustMeasureContent || this.contentDOMHeight != l.height;
    this.contentDOMHeight = l.height, this.mustMeasureContent = !1;
    let h = 0, c = 0;
    if (l.width && l.height) {
      let { scaleX: C, scaleY: R } = Yd(t, l);
      (C > 5e-3 && Math.abs(this.scaleX - C) > 5e-3 || R > 5e-3 && Math.abs(this.scaleY - R) > 5e-3) && (this.scaleX = C, this.scaleY = R, h |= 16, o = a = !0);
    }
    let f = (parseInt(i.paddingTop) || 0) * this.scaleY, d = (parseInt(i.paddingBottom) || 0) * this.scaleY;
    (this.paddingTop != f || this.paddingBottom != d) && (this.paddingTop = f, this.paddingBottom = d, h |= 18), this.editorWidth != e.scrollDOM.clientWidth && (s.lineWrapping && (a = !0), this.editorWidth = e.scrollDOM.clientWidth, h |= 16);
    let p = qd(this.view.contentDOM, !1).y;
    p != this.scrollParent && (this.scrollParent = p, this.scrollAnchorHeight = -1, this.scrollOffset = 0);
    let O = this.getScrollOffset();
    this.scrollOffset != O && (this.scrollAnchorHeight = -1, this.scrollOffset = O), this.scrolledToBottom = Vd(this.scrollParent || e.win);
    let g = (this.printing ? e1 : K0)(t, this.paddingTop), m = g.top - this.pixelViewport.top, v = g.bottom - this.pixelViewport.bottom;
    this.pixelViewport = g;
    let x = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
    if (x != this.inView && (this.inView = x, x && (a = !0)), !this.inView && !this.scrollTarget && !J0(e.dom))
      return 0;
    let S = l.width;
    if ((this.contentDOMWidth != S || this.editorHeight != e.scrollDOM.clientHeight) && (this.contentDOMWidth = l.width, this.editorHeight = e.scrollDOM.clientHeight, h |= 16), a) {
      let C = e.docView.measureVisibleLineHeights(this.viewport);
      if (s.mustRefreshForHeights(C) && (o = !0), o || s.lineWrapping && Math.abs(S - this.contentDOMWidth) > s.charWidth) {
        let { lineHeight: R, charWidth: X, textHeight: H } = e.docView.measureTextSize();
        o = R > 0 && s.refresh(r, R, X, H, Math.max(5, S / X), C), o && (e.docView.minWidth = 0, h |= 16);
      }
      m > 0 && v > 0 ? c = Math.max(m, v) : m < 0 && v < 0 && (c = Math.min(m, v)), Tf();
      for (let R of this.viewports) {
        let X = R.from == this.viewport.from ? C : e.docView.measureVisibleLineHeights(R);
        this.heightMap = (o ? jt.empty().applyChanges(this.stateDeco, Re.empty, this.heightOracle, [new di(0, 0, 0, e.state.doc.length)]) : this.heightMap).updateHeight(s, 0, o, new V0(R.from, X));
      }
      Js && (h |= 2);
    }
    let _ = !this.viewportIsAppropriate(this.viewport, c) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
    return _ && (h & 2 && (h |= this.updateScaler()), this.viewport = this.getViewport(c, this.scrollTarget), h |= this.updateForViewport()), (h & 2 || _) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(o ? [] : this.lineGaps, e)), h |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, e.docView.enforceCursorAssoc()), h;
  }
  get visibleTop() {
    return this.scaler.fromDOM(this.pixelViewport.top);
  }
  get visibleBottom() {
    return this.scaler.fromDOM(this.pixelViewport.bottom);
  }
  getViewport(e, t) {
    let i = 0.5 - Math.max(-0.5, Math.min(0.5, e / 1e3 / 2)), s = this.heightMap, r = this.heightOracle, { visibleTop: o, visibleBottom: l } = this, a = new xo(s.lineAt(o - i * 1e3, Be.ByHeight, r, 0, 0).from, s.lineAt(l + (1 - i) * 1e3, Be.ByHeight, r, 0, 0).to);
    if (t) {
      let { head: h } = t.range;
      if (h < a.from || h > a.to) {
        let c = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), f = s.lineAt(h, Be.ByPos, r, 0, 0), d;
        t.y == "center" ? d = (f.top + f.bottom) / 2 - c / 2 : t.y == "start" || t.y == "nearest" && h < a.from ? d = f.top : d = f.bottom - c, a = new xo(s.lineAt(d - 1e3 / 2, Be.ByHeight, r, 0, 0).from, s.lineAt(d + c + 1e3 / 2, Be.ByHeight, r, 0, 0).to);
      }
    }
    return a;
  }
  mapViewport(e, t) {
    let i = t.mapPos(e.from, -1), s = t.mapPos(e.to, 1);
    return new xo(this.heightMap.lineAt(i, Be.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(s, Be.ByPos, this.heightOracle, 0, 0).to);
  }
  // Checks if a given viewport covers the visible part of the
  // document and not too much beyond that.
  viewportIsAppropriate({ from: e, to: t }, i = 0) {
    if (!this.inView)
      return !0;
    let { top: s } = this.heightMap.lineAt(e, Be.ByPos, this.heightOracle, 0, 0), { bottom: r } = this.heightMap.lineAt(t, Be.ByPos, this.heightOracle, 0, 0), { visibleTop: o, visibleBottom: l } = this;
    return (e == 0 || s <= o - Math.max(10, Math.min(
      -i,
      250
      /* VP.MaxCoverMargin */
    ))) && (t == this.state.doc.length || r >= l + Math.max(10, Math.min(
      i,
      250
      /* VP.MaxCoverMargin */
    ))) && s > o - 2 * 1e3 && r < l + 2 * 1e3;
  }
  mapLineGaps(e, t) {
    if (!e.length || t.empty)
      return e;
    let i = [];
    for (let s of e)
      t.touchesRange(s.from, s.to) || i.push(new ha(t.mapPos(s.from), t.mapPos(s.to), s.size, s.displaySize));
    return i;
  }
  // Computes positions in the viewport where the start or end of a
  // line should be hidden, trying to reuse existing line gaps when
  // appropriate to avoid unneccesary redraws.
  // Uses crude character-counting for the positioning and sizing,
  // since actual DOM coordinates aren't always available and
  // predictable. Relies on generous margins (see LG.Margin) to hide
  // the artifacts this might produce from the user.
  ensureLineGaps(e, t) {
    let i = this.heightOracle.lineWrapping, s = i ? 1e4 : 2e3, r = s >> 1, o = s << 1;
    if (this.defaultTextDirection != nt.LTR && !i)
      return [];
    let l = [], a = (c, f, d, p) => {
      if (f - c < r)
        return;
      let O = this.state.selection.main, g = [O.from];
      O.empty || g.push(O.to);
      for (let v of g)
        if (v > c && v < f) {
          a(c, v - 10, d, p), a(v + 10, f, d, p);
          return;
        }
      let m = n1(e, (v) => v.from >= d.from && v.to <= d.to && Math.abs(v.from - c) < r && Math.abs(v.to - f) < r && !g.some((x) => v.from < x && v.to > x));
      if (!m) {
        if (f < d.to && t && i && t.visibleRanges.some((S) => S.from <= f && S.to >= f)) {
          let S = t.moveToLineBoundary(B.cursor(f), !1, !0).head;
          S > c && (f = S);
        }
        let v = this.gapSize(d, c, f, p), x = i || v < 2e6 ? v : 2e6;
        m = new ha(c, f, v, x);
      }
      l.push(m);
    }, h = (c) => {
      if (c.length < o || c.type != yi.Text)
        return;
      let f = i1(c.from, c.to, this.stateDeco);
      if (f.total < o)
        return;
      let d = this.scrollTarget ? this.scrollTarget.range.head : null, p, O;
      if (i) {
        let g = s / this.heightOracle.lineLength * this.heightOracle.lineHeight, m, v;
        if (d != null) {
          let x = Qo(f, d), S = ((this.visibleBottom - this.visibleTop) / 2 + g) / c.height;
          m = x - S, v = x + S;
        } else
          m = (this.visibleTop - c.top - g) / c.height, v = (this.visibleBottom - c.top + g) / c.height;
        p = So(f, m), O = So(f, v);
      } else {
        let g = f.total * this.heightOracle.charWidth, m = s * this.heightOracle.charWidth, v = 0;
        if (g > 2e6)
          for (let R of e)
            R.from >= c.from && R.from < c.to && R.size != R.displaySize && R.from * this.heightOracle.charWidth + v < this.pixelViewport.left && (v = R.size - R.displaySize);
        let x = this.pixelViewport.left + v, S = this.pixelViewport.right + v, _, C;
        if (d != null) {
          let R = Qo(f, d), X = ((S - x) / 2 + m) / g;
          _ = R - X, C = R + X;
        } else
          _ = (x - m) / g, C = (S + m) / g;
        p = So(f, _), O = So(f, C);
      }
      p > c.from && a(c.from, p, c, f), O < c.to && a(O, c.to, c, f);
    };
    for (let c of this.viewportLines)
      Array.isArray(c.type) ? c.type.forEach(h) : h(c);
    return l;
  }
  gapSize(e, t, i, s) {
    let r = Qo(s, i) - Qo(s, t);
    return this.heightOracle.lineWrapping ? e.height * r : s.total * this.heightOracle.charWidth * r;
  }
  updateLineGaps(e) {
    ha.same(e, this.lineGaps) || (this.lineGaps = e, this.lineGapDeco = We.set(e.map((t) => t.draw(this, this.heightOracle.lineWrapping))));
  }
  computeVisibleRanges(e) {
    let t = this.stateDeco;
    this.lineGaps.length && (t = t.concat(this.lineGapDeco));
    let i = [];
    Le.spans(t, this.viewport.from, this.viewport.to, {
      span(r, o) {
        i.push({ from: r, to: o });
      },
      point() {
      }
    }, 20);
    let s = 0;
    if (i.length != this.visibleRanges.length)
      s = 12;
    else
      for (let r = 0; r < i.length && !(s & 8); r++) {
        let o = this.visibleRanges[r], l = i[r];
        (o.from != l.from || o.to != l.to) && (s |= 4, e && e.mapPos(o.from, -1) == l.from && e.mapPos(o.to, 1) == l.to || (s |= 8));
      }
    return this.visibleRanges = i, s;
  }
  lineBlockAt(e) {
    return e >= this.viewport.from && e <= this.viewport.to && this.viewportLines.find((t) => t.from <= e && t.to >= e) || wr(this.heightMap.lineAt(e, Be.ByPos, this.heightOracle, 0, 0), this.scaler);
  }
  lineBlockAtHeight(e) {
    return e >= this.viewportLines[0].top && e <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((t) => t.top <= e && t.bottom >= e) || wr(this.heightMap.lineAt(this.scaler.fromDOM(e), Be.ByHeight, this.heightOracle, 0, 0), this.scaler);
  }
  getScrollOffset() {
    return (this.scrollParent == this.view.scrollDOM ? this.scrollParent.scrollTop : (this.scrollParent ? this.scrollParent.getBoundingClientRect().top : 0) - this.view.contentDOM.getBoundingClientRect().top) * this.scaleY;
  }
  scrollAnchorAt(e) {
    let t = this.lineBlockAtHeight(e + 8);
    return t.from >= this.viewport.from || this.viewportLines[0].top - e > 200 ? t : this.viewportLines[0];
  }
  elementAtHeight(e) {
    return wr(this.heightMap.blockAt(this.scaler.fromDOM(e), this.heightOracle, 0, 0), this.scaler);
  }
  get docHeight() {
    return this.scaler.toDOM(this.heightMap.height);
  }
  get contentHeight() {
    return this.docHeight + this.paddingTop + this.paddingBottom;
  }
}
class xo {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
function i1(n, e, t) {
  let i = [], s = n, r = 0;
  return Le.spans(t, n, e, {
    span() {
    },
    point(o, l) {
      o > s && (i.push({ from: s, to: o }), r += o - s), s = l;
    }
  }, 20), s < e && (i.push({ from: s, to: e }), r += e - s), { total: r, ranges: i };
}
function So({ total: n, ranges: e }, t) {
  if (t <= 0)
    return e[0].from;
  if (t >= 1)
    return e[e.length - 1].to;
  let i = Math.floor(n * t);
  for (let s = 0; ; s++) {
    let { from: r, to: o } = e[s], l = o - r;
    if (i <= l)
      return r + i;
    i -= l;
  }
}
function Qo(n, e) {
  let t = 0;
  for (let { from: i, to: s } of n.ranges) {
    if (e <= s) {
      t += e - i;
      break;
    }
    t += s - i;
  }
  return t / n.total;
}
function n1(n, e) {
  for (let t of n)
    if (e(t))
      return t;
}
const Af = {
  toDOM(n) {
    return n;
  },
  fromDOM(n) {
    return n;
  },
  scale: 1,
  eq(n) {
    return n == this;
  }
};
function Rf(n) {
  let e = n.facet(Al).filter((i) => typeof i != "function"), t = n.facet(ac).filter((i) => typeof i != "function");
  return t.length && e.push(Le.join(t)), e;
}
class uc {
  constructor(e, t, i) {
    let s = 0, r = 0, o = 0;
    this.viewports = i.map(({ from: l, to: a }) => {
      let h = t.lineAt(l, Be.ByPos, e, 0, 0).top, c = t.lineAt(a, Be.ByPos, e, 0, 0).bottom;
      return s += c - h, { from: l, to: a, top: h, bottom: c, domTop: 0, domBottom: 0 };
    }), this.scale = (7e6 - s) / (t.height - s);
    for (let l of this.viewports)
      l.domTop = o + (l.top - r) * this.scale, o = l.domBottom = l.domTop + (l.bottom - l.top), r = l.bottom;
  }
  toDOM(e) {
    for (let t = 0, i = 0, s = 0; ; t++) {
      let r = t < this.viewports.length ? this.viewports[t] : null;
      if (!r || e < r.top)
        return s + (e - i) * this.scale;
      if (e <= r.bottom)
        return r.domTop + (e - r.top);
      i = r.bottom, s = r.domBottom;
    }
  }
  fromDOM(e) {
    for (let t = 0, i = 0, s = 0; ; t++) {
      let r = t < this.viewports.length ? this.viewports[t] : null;
      if (!r || e < r.domTop)
        return i + (e - s) / this.scale;
      if (e <= r.domBottom)
        return r.top + (e - r.domTop);
      i = r.bottom, s = r.domBottom;
    }
  }
  eq(e) {
    return e instanceof uc ? this.scale == e.scale && this.viewports.length == e.viewports.length && this.viewports.every((t, i) => t.from == e.viewports[i].from && t.to == e.viewports[i].to) : !1;
  }
}
function wr(n, e) {
  if (e.scale == 1)
    return n;
  let t = e.toDOM(n.top), i = e.toDOM(n.bottom);
  return new Pi(n.from, n.length, t, i - t, Array.isArray(n._content) ? n._content.map((s) => wr(s, e)) : n._content);
}
const ko = /* @__PURE__ */ me.define({ combine: (n) => n.join(" ") }), vh = /* @__PURE__ */ me.define({ combine: (n) => n.indexOf(!0) > -1 }), bh = /* @__PURE__ */ Fs.newName(), _p = /* @__PURE__ */ Fs.newName(), Tp = /* @__PURE__ */ Fs.newName(), Zp = { "&light": "." + _p, "&dark": "." + Tp };
function yh(n, e, t) {
  return new Fs(e, {
    finish(i) {
      return /&/.test(i) ? i.replace(/&\w*/, (s) => {
        if (s == "&")
          return n;
        if (!t || !t[s])
          throw new RangeError(`Unsupported selector: ${s}`);
        return t[s];
      }) : n + " " + i;
    }
  });
}
const s1 = /* @__PURE__ */ yh("." + bh, {
  "&": {
    position: "relative !important",
    boxSizing: "border-box",
    "&.cm-focused": {
      // Provide a simple default outline to make sure a focused
      // editor is visually distinct. Can't leave the default behavior
      // because that will apply to the content element, which is
      // inside the scrollable container and doesn't include the
      // gutters. We also can't use an 'auto' outline, since those
      // are, for some reason, drawn behind the element content, which
      // will cause things like the active line background to cover
      // the outline (#297).
      outline: "1px dotted #212121"
    },
    display: "flex !important",
    flexDirection: "column"
  },
  ".cm-scroller": {
    display: "flex !important",
    alignItems: "flex-start !important",
    fontFamily: "monospace",
    lineHeight: 1.4,
    height: "100%",
    overflowX: "auto",
    position: "relative",
    zIndex: 0,
    overflowAnchor: "none"
  },
  ".cm-content": {
    margin: 0,
    flexGrow: 2,
    flexShrink: 0,
    display: "block",
    whiteSpace: "pre",
    wordWrap: "normal",
    // Issue #456
    boxSizing: "border-box",
    minHeight: "100%",
    padding: "4px 0",
    outline: "none",
    "&[contenteditable=true]": {
      WebkitUserModify: "read-write-plaintext-only"
    }
  },
  ".cm-lineWrapping": {
    whiteSpace_fallback: "pre-wrap",
    // For IE
    whiteSpace: "break-spaces",
    wordBreak: "break-word",
    // For Safari, which doesn't support overflow-wrap: anywhere
    overflowWrap: "anywhere",
    flexShrink: 1
  },
  "&light .cm-content": { caretColor: "black" },
  "&dark .cm-content": { caretColor: "white" },
  ".cm-line": {
    display: "block",
    padding: "0 2px 0 6px"
  },
  ".cm-layer": {
    userSelect: "none",
    // #1708
    position: "absolute",
    left: 0,
    top: 0,
    contain: "size style",
    "& > *": {
      position: "absolute"
    }
  },
  "&light .cm-selectionBackground": {
    background: "#d9d9d9"
  },
  "&dark .cm-selectionBackground": {
    background: "#222"
  },
  "&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#d7d4f0"
  },
  "&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#233"
  },
  ".cm-cursorLayer": {
    pointerEvents: "none"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer": {
    animation: "steps(1) cm-blink 1.2s infinite"
  },
  // Two animations defined so that we can switch between them to
  // restart the animation without forcing another style
  // recomputation.
  "@keyframes cm-blink": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  "@keyframes cm-blink2": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  ".cm-cursor, .cm-dropCursor": {
    borderLeft: "1.2px solid black",
    marginLeft: "-0.6px",
    pointerEvents: "none"
  },
  ".cm-cursor": {
    display: "none"
  },
  "&dark .cm-cursor": {
    borderLeftColor: "#ddd"
  },
  ".cm-selectionHandle": {
    backgroundColor: "currentColor",
    width: "1.5px"
  },
  ".cm-selectionHandle-start::before, .cm-selectionHandle-end::before": {
    content: '""',
    backgroundColor: "inherit",
    borderRadius: "50%",
    width: "8px",
    height: "8px",
    position: "absolute",
    left: "-3.25px"
  },
  ".cm-selectionHandle-start::before": { top: "-8px" },
  ".cm-selectionHandle-end::before": { bottom: "-8px" },
  ".cm-dropCursor": {
    position: "absolute"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor": {
    display: "block"
  },
  ".cm-iso": {
    unicodeBidi: "isolate"
  },
  ".cm-announced": {
    position: "fixed",
    top: "-10000px"
  },
  "@media print": {
    ".cm-announced": { display: "none" }
  },
  "&light .cm-activeLine": { backgroundColor: "#cceeff44" },
  "&dark .cm-activeLine": { backgroundColor: "#99eeff33" },
  "&light .cm-specialChar": { color: "red" },
  "&dark .cm-specialChar": { color: "#f78" },
  ".cm-gutters": {
    flexShrink: 0,
    display: "flex",
    height: "100%",
    boxSizing: "border-box",
    zIndex: 200
  },
  ".cm-gutters-before": { insetInlineStart: 0 },
  ".cm-gutters-after": { insetInlineEnd: 0 },
  "&light .cm-gutters": {
    backgroundColor: "#f5f5f5",
    color: "#6c6c6c",
    border: "0px solid #ddd",
    "&.cm-gutters-before": { borderRightWidth: "1px" },
    "&.cm-gutters-after": { borderLeftWidth: "1px" }
  },
  "&dark .cm-gutters": {
    backgroundColor: "#333338",
    color: "#ccc"
  },
  ".cm-gutter": {
    display: "flex !important",
    // Necessary -- prevents margin collapsing
    flexDirection: "column",
    flexShrink: 0,
    boxSizing: "border-box",
    minHeight: "100%",
    overflow: "hidden"
  },
  ".cm-gutterElement": {
    boxSizing: "border-box"
  },
  ".cm-lineNumbers .cm-gutterElement": {
    padding: "0 3px 0 5px",
    minWidth: "20px",
    textAlign: "right",
    whiteSpace: "nowrap"
  },
  "&light .cm-activeLineGutter": {
    backgroundColor: "#e2f2ff"
  },
  "&dark .cm-activeLineGutter": {
    backgroundColor: "#222227"
  },
  ".cm-panels": {
    boxSizing: "border-box",
    position: "sticky",
    left: 0,
    right: 0,
    zIndex: 300
  },
  "&light .cm-panels": {
    backgroundColor: "#f5f5f5",
    color: "black"
  },
  "&light .cm-panels-top": {
    borderBottom: "1px solid #ddd"
  },
  "&light .cm-panels-bottom": {
    borderTop: "1px solid #ddd"
  },
  "&dark .cm-panels": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-dialog": {
    padding: "2px 19px 4px 6px",
    position: "relative",
    "& label": { fontSize: "80%" }
  },
  ".cm-dialog-close": {
    position: "absolute",
    top: "3px",
    right: "4px",
    backgroundColor: "inherit",
    border: "none",
    font: "inherit",
    fontSize: "14px",
    padding: "0"
  },
  ".cm-tab": {
    display: "inline-block",
    overflow: "hidden",
    verticalAlign: "bottom"
  },
  ".cm-widgetBuffer": {
    verticalAlign: "text-top",
    height: "1em",
    width: 0,
    display: "inline"
  },
  ".cm-placeholder": {
    color: "#888",
    display: "inline-block",
    verticalAlign: "top",
    userSelect: "none"
  },
  ".cm-highlightSpace": {
    backgroundImage: "radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",
    backgroundPosition: "center"
  },
  ".cm-highlightTab": {
    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,
    backgroundSize: "auto 100%",
    backgroundPosition: "right 90%",
    backgroundRepeat: "no-repeat"
  },
  ".cm-trailingSpace": {
    backgroundColor: "#ff332255"
  },
  ".cm-button": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    padding: ".2em 1em",
    borderRadius: "1px"
  },
  "&light .cm-button": {
    backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)"
    }
  },
  "&dark .cm-button": {
    backgroundImage: "linear-gradient(#393939, #111)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#111, #333)"
    }
  },
  ".cm-textfield": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    border: "1px solid silver",
    padding: ".2em .5em"
  },
  "&light .cm-textfield": {
    backgroundColor: "white"
  },
  "&dark .cm-textfield": {
    border: "1px solid #555",
    backgroundColor: "inherit"
  }
}, Zp), r1 = {
  childList: !0,
  characterData: !0,
  subtree: !0,
  attributes: !0,
  characterDataOldValue: !0
}, ca = se.ie && se.ie_version <= 11;
class o1 {
  constructor(e) {
    this.view = e, this.active = !1, this.editContext = null, this.selectionRange = new Rv(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.printQuery = null, this.parentCheck = -1, this.dom = e.contentDOM, this.observer = new MutationObserver((t) => {
      for (let i of t)
        this.queue.push(i);
      (se.ie && se.ie_version <= 11 || se.ios && e.composing) && t.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), window.EditContext && se.android && e.constructor.EDIT_CONTEXT !== !1 && // Chrome <126 doesn't support inverted selections in edit context (#1392)
    !(se.chrome && se.chrome_version < 126) && (this.editContext = new a1(e), e.state.facet(an) && (e.contentDOM.editContext = this.editContext.editContext)), ca && (this.onCharData = (t) => {
      this.queue.push({
        target: t.target,
        type: "characterData",
        oldValue: t.prevValue
      }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this), this.onResize = this.onResize.bind(this), this.onPrint = this.onPrint.bind(this), this.onScroll = this.onScroll.bind(this), window.matchMedia && (this.printQuery = window.matchMedia("print")), typeof ResizeObserver == "function" && (this.resizeScroll = new ResizeObserver(() => {
      var t;
      ((t = this.view.docView) === null || t === void 0 ? void 0 : t.lastUpdate) < Date.now() - 75 && this.onResize();
    }), this.resizeScroll.observe(e.scrollDOM)), this.addWindowListeners(this.win = e.win), this.start(), typeof IntersectionObserver == "function" && (this.intersection = new IntersectionObserver((t) => {
      this.parentCheck < 0 && (this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3)), t.length > 0 && t[t.length - 1].intersectionRatio > 0 != this.intersecting && (this.intersecting = !this.intersecting, this.intersecting != this.view.inView && this.onScrollChanged(document.createEvent("Event")));
    }, { threshold: [0, 1e-3] }), this.intersection.observe(this.dom), this.gapIntersection = new IntersectionObserver((t) => {
      t.length > 0 && t[t.length - 1].intersectionRatio > 0 && this.onScrollChanged(document.createEvent("Event"));
    }, {})), this.listenForScroll(), this.readSelectionRange();
  }
  onScrollChanged(e) {
    this.view.inputState.runHandlers("scroll", e), this.intersecting && this.view.measure();
  }
  onScroll(e) {
    this.intersecting && this.flush(!1), this.editContext && this.view.requestMeasure(this.editContext.measureReq), this.onScrollChanged(e);
  }
  onResize() {
    this.resizeTimeout < 0 && (this.resizeTimeout = setTimeout(() => {
      this.resizeTimeout = -1, this.view.requestMeasure();
    }, 50));
  }
  onPrint(e) {
    (e.type == "change" || !e.type) && !e.matches || (this.view.viewState.printing = !0, this.view.measure(), setTimeout(() => {
      this.view.viewState.printing = !1, this.view.requestMeasure();
    }, 500));
  }
  updateGaps(e) {
    if (this.gapIntersection && (e.length != this.gaps.length || this.gaps.some((t, i) => t != e[i]))) {
      this.gapIntersection.disconnect();
      for (let t of e)
        this.gapIntersection.observe(t);
      this.gaps = e;
    }
  }
  onSelectionChange(e) {
    let t = this.selectionChanged;
    if (!this.readSelectionRange() || this.delayedAndroidKey)
      return;
    let { view: i } = this, s = this.selectionRange;
    if (i.state.facet(an) ? i.root.activeElement != this.dom : !Cr(this.dom, s))
      return;
    let r = s.anchorNode && i.docView.tile.nearest(s.anchorNode);
    if (r && r.isWidget() && r.widget.ignoreEvent(e)) {
      t || (this.selectionChanged = !1);
      return;
    }
    (se.ie && se.ie_version <= 11 || se.android && se.chrome) && !i.state.selection.main.empty && // (Selection.isCollapsed isn't reliable on IE)
    s.focusNode && Rr(s.focusNode, s.focusOffset, s.anchorNode, s.anchorOffset) ? this.flushSoon() : this.flush(!1);
  }
  readSelectionRange() {
    let { view: e } = this, t = Ir(e.root);
    if (!t)
      return !1;
    let i = se.safari && e.root.nodeType == 11 && e.root.activeElement == this.dom && l1(this.view, t) || t;
    if (!i || this.selectionRange.eq(i))
      return !1;
    let s = Cr(this.dom, i);
    return s && !this.selectionChanged && e.inputState.lastFocusTime > Date.now() - 200 && e.inputState.lastTouchTime < Date.now() - 300 && Xv(this.dom, i) ? (this.view.inputState.lastFocusTime = 0, e.docView.updateSelection(), !1) : (this.selectionRange.setRange(i), s && (this.selectionChanged = !0), !0);
  }
  setSelectionRange(e, t) {
    this.selectionRange.set(e.node, e.offset, t.node, t.offset), this.selectionChanged = !1;
  }
  clearSelectionRange() {
    this.selectionRange.set(null, 0, null, 0);
  }
  listenForScroll() {
    this.parentCheck = -1;
    let e = 0, t = null;
    for (let i = this.dom; i; )
      if (i.nodeType == 1)
        !t && e < this.scrollTargets.length && this.scrollTargets[e] == i ? e++ : t || (t = this.scrollTargets.slice(0, e)), t && t.push(i), i = i.assignedSlot || i.parentNode;
      else if (i.nodeType == 11)
        i = i.host;
      else
        break;
    if (e < this.scrollTargets.length && !t && (t = this.scrollTargets.slice(0, e)), t) {
      for (let i of this.scrollTargets)
        i.removeEventListener("scroll", this.onScroll);
      for (let i of this.scrollTargets = t)
        i.addEventListener("scroll", this.onScroll);
    }
  }
  ignore(e) {
    if (!this.active)
      return e();
    try {
      return this.stop(), e();
    } finally {
      this.start(), this.clear();
    }
  }
  start() {
    this.active || (this.observer.observe(this.dom, r1), ca && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = !0);
  }
  stop() {
    this.active && (this.active = !1, this.observer.disconnect(), ca && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
  }
  // Throw away any pending changes
  clear() {
    this.processRecords(), this.queue.length = 0, this.selectionChanged = !1;
  }
  // Chrome Android, especially in combination with GBoard, not only
  // doesn't reliably fire regular key events, but also often
  // surrounds the effect of enter or backspace with a bunch of
  // composition events that, when interrupted, cause text duplication
  // or other kinds of corruption. This hack makes the editor back off
  // from handling DOM changes for a moment when such a key is
  // detected (via beforeinput or keydown), and then tries to flush
  // them or, if that has no effect, dispatches the given key.
  delayAndroidKey(e, t) {
    var i;
    if (!this.delayedAndroidKey) {
      let s = () => {
        let r = this.delayedAndroidKey;
        r && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = r.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && r.force && As(this.dom, r.key, r.keyCode));
      };
      this.flushingAndroidKey = this.view.win.requestAnimationFrame(s);
    }
    (!this.delayedAndroidKey || e == "Enter") && (this.delayedAndroidKey = {
      key: e,
      keyCode: t,
      // Only run the key handler when no changes are detected if
      // this isn't coming right after another change, in which case
      // it is probably part of a weird chain of updates, and should
      // be ignored if it returns the DOM to its previous state.
      force: this.lastChange < Date.now() - 50 || !!(!((i = this.delayedAndroidKey) === null || i === void 0) && i.force)
    });
  }
  clearDelayedAndroidKey() {
    this.win.cancelAnimationFrame(this.flushingAndroidKey), this.delayedAndroidKey = null, this.flushingAndroidKey = -1;
  }
  flushSoon() {
    this.delayedFlush < 0 && (this.delayedFlush = this.view.win.requestAnimationFrame(() => {
      this.delayedFlush = -1, this.flush();
    }));
  }
  forceFlush() {
    this.delayedFlush >= 0 && (this.view.win.cancelAnimationFrame(this.delayedFlush), this.delayedFlush = -1), this.flush();
  }
  pendingRecords() {
    for (let e of this.observer.takeRecords())
      this.queue.push(e);
    return this.queue;
  }
  processRecords() {
    let e = this.pendingRecords();
    e.length && (this.queue = []);
    let t = -1, i = -1, s = !1;
    for (let r of e) {
      let o = this.readMutation(r);
      o && (o.typeOver && (s = !0), t == -1 ? { from: t, to: i } = o : (t = Math.min(o.from, t), i = Math.max(o.to, i)));
    }
    return { from: t, to: i, typeOver: s };
  }
  readChange() {
    let { from: e, to: t, typeOver: i } = this.processRecords(), s = this.selectionChanged && Cr(this.dom, this.selectionRange);
    if (e < 0 && !s)
      return null;
    e > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1;
    let r = new Q0(this.view, e, t, i);
    return this.view.docView.domChanged = { newSel: r.newSel ? r.newSel.main : null }, r;
  }
  // Apply pending changes, if any
  flush(e = !0) {
    if (this.delayedFlush >= 0 || this.delayedAndroidKey)
      return !1;
    e && this.readSelectionRange();
    let t = this.readChange();
    if (!t)
      return this.view.requestMeasure(), !1;
    let i = this.view.state, s = mp(this.view, t);
    return this.view.state == i && (t.domChanged || t.newSel && !rl(this.view.state.selection, t.newSel.main)) && this.view.update([]), s;
  }
  readMutation(e) {
    let t = this.view.docView.tile.nearest(e.target);
    if (!t || t.isWidget())
      return null;
    if (t.markDirty(e.type == "attributes"), e.type == "childList") {
      let i = Mf(t, e.previousSibling || e.target.previousSibling, -1), s = Mf(t, e.nextSibling || e.target.nextSibling, 1);
      return {
        from: i ? t.posAfter(i) : t.posAtStart,
        to: s ? t.posBefore(s) : t.posAtEnd,
        typeOver: !1
      };
    } else return e.type == "characterData" ? { from: t.posAtStart, to: t.posAtEnd, typeOver: e.target.nodeValue == e.oldValue } : null;
  }
  setWindow(e) {
    e != this.win && (this.removeWindowListeners(this.win), this.win = e, this.addWindowListeners(this.win));
  }
  addWindowListeners(e) {
    e.addEventListener("resize", this.onResize), this.printQuery ? this.printQuery.addEventListener ? this.printQuery.addEventListener("change", this.onPrint) : this.printQuery.addListener(this.onPrint) : e.addEventListener("beforeprint", this.onPrint), e.addEventListener("scroll", this.onScroll), e.document.addEventListener("selectionchange", this.onSelectionChange);
  }
  removeWindowListeners(e) {
    e.removeEventListener("scroll", this.onScroll), e.removeEventListener("resize", this.onResize), this.printQuery ? this.printQuery.removeEventListener ? this.printQuery.removeEventListener("change", this.onPrint) : this.printQuery.removeListener(this.onPrint) : e.removeEventListener("beforeprint", this.onPrint), e.document.removeEventListener("selectionchange", this.onSelectionChange);
  }
  update(e) {
    this.editContext && (this.editContext.update(e), e.startState.facet(an) != e.state.facet(an) && (e.view.contentDOM.editContext = e.state.facet(an) ? this.editContext.editContext : null));
  }
  destroy() {
    var e, t, i;
    this.stop(), (e = this.intersection) === null || e === void 0 || e.disconnect(), (t = this.gapIntersection) === null || t === void 0 || t.disconnect(), (i = this.resizeScroll) === null || i === void 0 || i.disconnect();
    for (let s of this.scrollTargets)
      s.removeEventListener("scroll", this.onScroll);
    this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey), this.editContext && (this.view.contentDOM.editContext = null, this.editContext.destroy());
  }
}
function Mf(n, e, t) {
  for (; e; ) {
    let i = st.get(e);
    if (i && i.parent == n)
      return i;
    let s = e.parentNode;
    e = s != n.dom ? s : t > 0 ? e.nextSibling : e.previousSibling;
  }
  return null;
}
function Xf(n, e) {
  let t = e.startContainer, i = e.startOffset, s = e.endContainer, r = e.endOffset, o = n.docView.domAtPos(n.state.selection.main.anchor, 1);
  return Rr(o.node, o.offset, s, r) && ([t, i, s, r] = [s, r, t, i]), { anchorNode: t, anchorOffset: i, focusNode: s, focusOffset: r };
}
function l1(n, e) {
  if (e.getComposedRanges) {
    let s = e.getComposedRanges(n.root)[0];
    if (s)
      return Xf(n, s);
  }
  let t = null;
  function i(s) {
    s.preventDefault(), s.stopImmediatePropagation(), t = s.getTargetRanges()[0];
  }
  return n.contentDOM.addEventListener("beforeinput", i, !0), n.dom.ownerDocument.execCommand("indent"), n.contentDOM.removeEventListener("beforeinput", i, !0), t ? Xf(n, t) : null;
}
class a1 {
  constructor(e) {
    this.from = 0, this.to = 0, this.pendingContextChange = null, this.handlers = /* @__PURE__ */ Object.create(null), this.composing = null, this.resetRange(e.state);
    let t = this.editContext = new window.EditContext({
      text: e.state.doc.sliceString(this.from, this.to),
      selectionStart: this.toContextPos(Math.max(this.from, Math.min(this.to, e.state.selection.main.anchor))),
      selectionEnd: this.toContextPos(e.state.selection.main.head)
    });
    this.handlers.textupdate = (i) => {
      let s = e.state.selection.main, { anchor: r, head: o } = s, l = this.toEditorPos(i.updateRangeStart), a = this.toEditorPos(i.updateRangeEnd);
      e.inputState.composing >= 0 && !this.composing && (this.composing = { contextBase: i.updateRangeStart, editorBase: l, drifted: !1 });
      let h = a - l > i.text.length;
      l == this.from && r < this.from ? l = r : a == this.to && r > this.to && (a = r);
      let c = vp(e.state.sliceDoc(l, a), i.text, (h ? s.from : s.to) - l, h ? "end" : null);
      if (!c) {
        let d = B.single(this.toEditorPos(i.selectionStart), this.toEditorPos(i.selectionEnd));
        rl(d, s) || e.dispatch({ selection: d, userEvent: "select" });
        return;
      }
      let f = {
        from: c.from + l,
        to: c.toA + l,
        insert: Re.of(i.text.slice(c.from, c.toB).split(`
`))
      };
      if ((se.mac || se.android) && f.from == o - 1 && /^\. ?$/.test(i.text) && e.contentDOM.getAttribute("autocorrect") == "off" && (f = { from: l, to: a, insert: Re.of([i.text.replace(".", " ")]) }), this.pendingContextChange = f, !e.state.readOnly) {
        let d = this.to - this.from + (f.to - f.from + f.insert.length);
        cc(e, f, B.single(this.toEditorPos(i.selectionStart, d), this.toEditorPos(i.selectionEnd, d)));
      }
      this.pendingContextChange && (this.revertPending(e.state), this.setSelection(e.state)), f.from < f.to && !f.insert.length && e.inputState.composing >= 0 && !/[\\p{Alphabetic}\\p{Number}_]/.test(t.text.slice(Math.max(0, i.updateRangeStart - 1), Math.min(t.text.length, i.updateRangeStart + 1))) && this.handlers.compositionend(i);
    }, this.handlers.characterboundsupdate = (i) => {
      let s = [], r = null;
      for (let o = this.toEditorPos(i.rangeStart), l = this.toEditorPos(i.rangeEnd); o < l; o++) {
        let a = e.coordsForChar(o);
        r = a && new DOMRect(a.left, a.top, a.right - a.left, a.bottom - a.top) || r || new DOMRect(), s.push(r);
      }
      t.updateCharacterBounds(i.rangeStart, s);
    }, this.handlers.textformatupdate = (i) => {
      let s = [];
      for (let r of i.getTextFormats()) {
        let o = r.underlineStyle, l = r.underlineThickness;
        if (!/none/i.test(o) && !/none/i.test(l)) {
          let a = this.toEditorPos(r.rangeStart), h = this.toEditorPos(r.rangeEnd);
          if (a < h) {
            let c = `text-decoration: underline ${/^[a-z]/.test(o) ? o + " " : o == "Dashed" ? "dashed " : o == "Squiggle" ? "wavy " : ""}${/thin/i.test(l) ? 1 : 2}px`;
            s.push(We.mark({ attributes: { style: c } }).range(a, h));
          }
        }
      }
      e.dispatch({ effects: ap.of(We.set(s)) });
    }, this.handlers.compositionstart = () => {
      e.inputState.composing < 0 && (e.inputState.composing = 0, e.inputState.compositionFirstChange = !0);
    }, this.handlers.compositionend = () => {
      if (e.inputState.composing = -1, e.inputState.compositionFirstChange = null, this.composing) {
        let { drifted: i } = this.composing;
        this.composing = null, i && this.reset(e.state);
      }
    };
    for (let i in this.handlers)
      t.addEventListener(i, this.handlers[i]);
    this.measureReq = { read: (i) => {
      let s = Ir(i.root);
      s && s.rangeCount && this.editContext.updateSelectionBounds(s.getRangeAt(0).getBoundingClientRect());
    } };
  }
  applyEdits(e) {
    let t = 0, i = !1, s = this.pendingContextChange;
    return e.changes.iterChanges((r, o, l, a, h) => {
      if (i)
        return;
      let c = h.length - (o - r);
      if (s && o >= s.to)
        if (s.from == r && s.to == o && s.insert.eq(h)) {
          s = this.pendingContextChange = null, t += c, this.to += c;
          return;
        } else
          s = null, this.revertPending(e.state);
      if (r += t, o += t, o <= this.from)
        this.from += c, this.to += c;
      else if (r < this.to) {
        if (r < this.from || o > this.to || this.to - this.from + h.length > 3e4) {
          i = !0;
          return;
        }
        this.editContext.updateText(this.toContextPos(r), this.toContextPos(o), h.toString()), this.to += c;
      }
      t += c;
    }), s && !i && this.revertPending(e.state), !i;
  }
  update(e) {
    let t = this.pendingContextChange, i = e.startState.selection.main;
    this.composing && (this.composing.drifted || !e.changes.touchesRange(i.from, i.to) && e.transactions.some((s) => !s.isUserEvent("input.type") && s.changes.touchesRange(this.from, this.to))) ? (this.composing.drifted = !0, this.composing.editorBase = e.changes.mapPos(this.composing.editorBase)) : !this.applyEdits(e) || !this.rangeIsValid(e.state) ? (this.pendingContextChange = null, this.reset(e.state)) : (e.docChanged || e.selectionSet || t) && this.setSelection(e.state), (e.geometryChanged || e.docChanged || e.selectionSet) && e.view.requestMeasure(this.measureReq);
  }
  resetRange(e) {
    let { head: t } = e.selection.main;
    this.from = Math.max(
      0,
      t - 1e4
      /* CxVp.Margin */
    ), this.to = Math.min(
      e.doc.length,
      t + 1e4
      /* CxVp.Margin */
    );
  }
  reset(e) {
    this.resetRange(e), this.editContext.updateText(0, this.editContext.text.length, e.doc.sliceString(this.from, this.to)), this.setSelection(e);
  }
  revertPending(e) {
    let t = this.pendingContextChange;
    this.pendingContextChange = null, this.editContext.updateText(this.toContextPos(t.from), this.toContextPos(t.from + t.insert.length), e.doc.sliceString(t.from, t.to));
  }
  setSelection(e) {
    let { main: t } = e.selection, i = this.toContextPos(Math.max(this.from, Math.min(this.to, t.anchor))), s = this.toContextPos(t.head);
    (this.editContext.selectionStart != i || this.editContext.selectionEnd != s) && this.editContext.updateSelection(i, s);
  }
  rangeIsValid(e) {
    let { head: t } = e.selection.main;
    return !(this.from > 0 && t - this.from < 500 || this.to < e.doc.length && this.to - t < 500 || this.to - this.from > 1e4 * 3);
  }
  toEditorPos(e, t = this.to - this.from) {
    e = Math.min(e, t);
    let i = this.composing;
    return i && i.drifted ? i.editorBase + (e - i.contextBase) : e + this.from;
  }
  toContextPos(e) {
    let t = this.composing;
    return t && t.drifted ? t.contextBase + (e - t.editorBase) : e - this.from;
  }
  destroy() {
    for (let e in this.handlers)
      this.editContext.removeEventListener(e, this.handlers[e]);
  }
}
class ge {
  /**
  The current editor state.
  */
  get state() {
    return this.viewState.state;
  }
  /**
  To be able to display large documents without consuming too much
  memory or overloading the browser, CodeMirror only draws the
  code that is visible (plus a margin around it) to the DOM. This
  property tells you the extent of the current drawn viewport, in
  document positions.
  */
  get viewport() {
    return this.viewState.viewport;
  }
  /**
  When there are, for example, large collapsed ranges in the
  viewport, its size can be a lot bigger than the actual visible
  content. Thus, if you are doing something like styling the
  content in the viewport, it is preferable to only do so for
  these ranges, which are the subset of the viewport that is
  actually drawn.
  */
  get visibleRanges() {
    return this.viewState.visibleRanges;
  }
  /**
  Returns false when the editor is entirely scrolled out of view
  or otherwise hidden.
  */
  get inView() {
    return this.viewState.inView;
  }
  /**
  Indicates whether the user is currently composing text via
  [IME](https://en.wikipedia.org/wiki/Input_method), and at least
  one change has been made in the current composition.
  */
  get composing() {
    return !!this.inputState && this.inputState.composing > 0;
  }
  /**
  Indicates whether the user is currently in composing state. Note
  that on some platforms, like Android, this will be the case a
  lot, since just putting the cursor on a word starts a
  composition there.
  */
  get compositionStarted() {
    return !!this.inputState && this.inputState.composing >= 0;
  }
  /**
  The document or shadow root that the view lives in.
  */
  get root() {
    return this._root;
  }
  /**
  @internal
  */
  get win() {
    return this.dom.ownerDocument.defaultView || window;
  }
  /**
  Construct a new view. You'll want to either provide a `parent`
  option, or put `view.dom` into your document after creating a
  view, so that the user can see the editor.
  */
  constructor(e = {}) {
    var t;
    this.plugins = [], this.pluginMap = /* @__PURE__ */ new Map(), this.editorAttrs = {}, this.contentAttrs = {}, this.bidiCache = [], this.destroyed = !1, this.updateState = 2, this.measureScheduled = -1, this.measureRequests = [], this.contentDOM = document.createElement("div"), this.scrollDOM = document.createElement("div"), this.scrollDOM.tabIndex = -1, this.scrollDOM.className = "cm-scroller", this.scrollDOM.appendChild(this.contentDOM), this.announceDOM = document.createElement("div"), this.announceDOM.className = "cm-announced", this.announceDOM.setAttribute("aria-live", "polite"), this.dom = document.createElement("div"), this.dom.appendChild(this.announceDOM), this.dom.appendChild(this.scrollDOM), e.parent && e.parent.appendChild(this.dom);
    let { dispatch: i } = e;
    this.dispatchTransactions = e.dispatchTransactions || i && ((s) => s.forEach((r) => i(r, this))) || ((s) => this.update(s)), this.dispatch = this.dispatch.bind(this), this._root = e.root || Mv(e.parent) || document, this.viewState = new Cf(this, e.state || Xe.create(e)), e.scrollTo && e.scrollTo.is(bo) && (this.viewState.scrollTarget = e.scrollTo.value.clip(this.viewState.state)), this.plugins = this.state.facet($s).map((s) => new sa(s));
    for (let s of this.plugins)
      s.update(this);
    this.observer = new o1(this), this.inputState = new _0(this), this.inputState.ensureHandlers(this.plugins), this.docView = new vf(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), !((t = document.fonts) === null || t === void 0) && t.ready && document.fonts.ready.then(() => {
      this.viewState.mustMeasureContent = "refresh", this.requestMeasure();
    });
  }
  dispatch(...e) {
    let t = e.length == 1 && e[0] instanceof ut ? e : e.length == 1 && Array.isArray(e[0]) ? e[0] : [this.state.update(...e)];
    this.dispatchTransactions(t, this);
  }
  /**
  Update the view for the given array of transactions. This will
  update the visible document and selection to match the state
  produced by the transactions, and notify view plugins of the
  change. You should usually call
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead, which uses this
  as a primitive.
  */
  update(e) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
    let t = !1, i = !1, s, r = this.state;
    for (let d of e) {
      if (d.startState != r)
        throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
      r = d.state;
    }
    if (this.destroyed) {
      this.viewState.state = r;
      return;
    }
    let o = this.hasFocus, l = 0, a = null;
    e.some((d) => d.annotation(Qp)) ? (this.inputState.notifiedFocused = o, l = 1) : o != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = o, a = kp(r, o), a || (l = 1));
    let h = this.observer.delayedAndroidKey, c = null;
    if (h ? (this.observer.clearDelayedAndroidKey(), c = this.observer.readChange(), (c && !this.state.doc.eq(r.doc) || !this.state.selection.eq(r.selection)) && (c = null)) : this.observer.clear(), r.facet(Xe.phrases) != this.state.facet(Xe.phrases))
      return this.setState(r);
    s = il.create(this, r, e), s.flags |= l;
    let f = this.viewState.scrollTarget;
    try {
      this.updateState = 2;
      for (let d of e) {
        if (f && (f = f.map(d.changes)), d.scrollIntoView) {
          let { main: p } = d.state.selection, { x: O, y: g } = this.state.facet(ge.cursorScrollMargin);
          f = new Rs(p.empty ? p : B.cursor(p.head, p.head > p.anchor ? -1 : 1), "nearest", "nearest", g, O);
        }
        for (let p of d.effects)
          p.is(bo) && (f = p.value.clip(this.state));
      }
      this.viewState.update(s, f), this.bidiCache = ll.update(this.bidiCache, s.changes), s.empty || (this.updatePlugins(s), this.inputState.update(s)), t = this.docView.update(s), this.state.facet(yr) != this.styleModules && this.mountStyles(), i = this.updateAttrs(), this.showAnnouncements(e), this.docView.updateSelection(t, e.some((d) => d.isUserEvent("select.pointer")));
    } finally {
      this.updateState = 0;
    }
    if (s.startState.facet(ko) != s.state.facet(ko) && (this.viewState.mustMeasureContent = !0), (t || i || f || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), t && this.docViewUpdate(), !s.empty)
      for (let d of this.state.facet(ph))
        try {
          d(s);
        } catch (p) {
          ni(this.state, p, "update listener");
        }
    (a || c) && Promise.resolve().then(() => {
      a && this.state == a.startState && this.dispatch(a), c && !mp(this, c) && h.force && As(this.contentDOM, h.key, h.keyCode);
    });
  }
  /**
  Reset the view to the given state. (This will cause the entire
  document to be redrawn and all view plugins to be reinitialized,
  so you should probably only use it when the new state isn't
  derived from the old state. Otherwise, use
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead.)
  */
  setState(e) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
    if (this.destroyed) {
      this.viewState.state = e;
      return;
    }
    this.updateState = 2;
    let t = this.hasFocus;
    try {
      for (let i of this.plugins)
        i.destroy(this);
      this.viewState = new Cf(this, e), this.plugins = e.facet($s).map((i) => new sa(i)), this.pluginMap.clear();
      for (let i of this.plugins)
        i.update(this);
      this.docView.destroy(), this.docView = new vf(this), this.inputState.ensureHandlers(this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
    } finally {
      this.updateState = 0;
    }
    t && this.focus(), this.requestMeasure();
  }
  updatePlugins(e) {
    let t = e.startState.facet($s), i = e.state.facet($s);
    if (t != i) {
      let s = [];
      for (let r of i) {
        let o = t.indexOf(r);
        if (o < 0)
          s.push(new sa(r));
        else {
          let l = this.plugins[o];
          l.mustUpdate = e, s.push(l);
        }
      }
      for (let r of this.plugins)
        r.mustUpdate != e && r.destroy(this);
      this.plugins = s, this.pluginMap.clear();
    } else
      for (let s of this.plugins)
        s.mustUpdate = e;
    for (let s = 0; s < this.plugins.length; s++)
      this.plugins[s].update(this);
    t != i && this.inputState.ensureHandlers(this.plugins);
  }
  docViewUpdate() {
    for (let e of this.plugins) {
      let t = e.value;
      if (t && t.docViewUpdate)
        try {
          t.docViewUpdate(this);
        } catch (i) {
          ni(this.state, i, "doc view update listener");
        }
    }
  }
  /**
  @internal
  */
  measure(e = !0) {
    if (this.destroyed)
      return;
    if (this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.observer.delayedAndroidKey) {
      this.measureScheduled = -1, this.requestMeasure();
      return;
    }
    this.measureScheduled = 0, e && this.observer.forceFlush();
    let t = null, i = this.viewState.scrollParent, s = this.viewState.getScrollOffset(), { scrollAnchorPos: r, scrollAnchorHeight: o } = this.viewState;
    Math.abs(s - this.viewState.scrollOffset) > 1 && (o = -1), this.viewState.scrollAnchorHeight = -1;
    try {
      for (let l = 0; ; l++) {
        if (o < 0)
          if (Vd(i || this.win))
            r = -1, o = this.viewState.heightMap.height;
          else {
            let p = this.viewState.scrollAnchorAt(s);
            r = p.from, o = p.top;
          }
        this.updateState = 1;
        let a = this.viewState.measure();
        if (!a && !this.measureRequests.length && this.viewState.scrollTarget == null)
          break;
        if (l > 5) {
          console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
          break;
        }
        let h = [];
        a & 4 || ([this.measureRequests, h] = [h, this.measureRequests]);
        let c = h.map((p) => {
          try {
            return p.read(this);
          } catch (O) {
            return ni(this.state, O), Ef;
          }
        }), f = il.create(this, this.state, []), d = !1;
        f.flags |= a, t ? t.flags |= a : t = f, this.updateState = 2, f.empty || (this.updatePlugins(f), this.inputState.update(f), this.updateAttrs(), d = this.docView.update(f), d && this.docViewUpdate());
        for (let p = 0; p < h.length; p++)
          if (c[p] != Ef)
            try {
              let O = h[p];
              O.write && O.write(c[p], this);
            } catch (O) {
              ni(this.state, O);
            }
        if (d && this.docView.updateSelection(!0), !f.viewportChanged && this.measureRequests.length == 0) {
          if (this.viewState.editorHeight)
            if (this.viewState.scrollTarget) {
              this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, o = -1;
              continue;
            } else {
              let O = ((r < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(r).top) - o) / this.scaleY;
              if ((O > 1 || O < -1) && !(se.ios && this.inputState.lastIOSMomentumScroll > Date.now() - 100) && (i == this.scrollDOM || this.hasFocus || Math.max(this.inputState.lastWheelEvent, this.inputState.lastTouchTime) > Date.now() - 100)) {
                s = s + O, i ? i.scrollTop += O : this.win.scrollBy(0, O), o = -1;
                continue;
              }
            }
          break;
        }
      }
    } finally {
      this.updateState = 0, this.measureScheduled = -1;
    }
    if (t && !t.empty)
      for (let l of this.state.facet(ph))
        l(t);
  }
  /**
  Get the CSS classes for the currently active editor themes.
  */
  get themeClasses() {
    return bh + " " + (this.state.facet(vh) ? Tp : _p) + " " + this.state.facet(ko);
  }
  updateAttrs() {
    let e = Lf(this, hp, {
      class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
    }), t = {
      spellcheck: "false",
      autocorrect: "off",
      autocapitalize: "off",
      writingsuggestions: "false",
      translate: "no",
      contenteditable: this.state.facet(an) ? "true" : "false",
      class: "cm-content",
      style: `${se.tabSize}: ${this.state.tabSize}`,
      role: "textbox",
      "aria-multiline": "true"
    };
    this.state.readOnly && (t["aria-readonly"] = "true"), Lf(this, lc, t);
    let i = this.observer.ignore(() => {
      let s = uf(this.contentDOM, this.contentAttrs, t), r = uf(this.dom, this.editorAttrs, e);
      return s || r;
    });
    return this.editorAttrs = e, this.contentAttrs = t, i;
  }
  showAnnouncements(e) {
    let t = !0;
    for (let i of e)
      for (let s of i.effects)
        if (s.is(ge.announce)) {
          t && (this.announceDOM.textContent = ""), t = !1;
          let r = this.announceDOM.appendChild(document.createElement("div"));
          r.textContent = s.value;
        }
  }
  mountStyles() {
    this.styleModules = this.state.facet(yr);
    let e = this.state.facet(ge.cspNonce);
    Fs.mount(this.root, this.styleModules.concat(s1).reverse(), e ? { nonce: e } : void 0);
  }
  readMeasured() {
    if (this.updateState == 2)
      throw new Error("Reading the editor layout isn't allowed during an update");
    this.updateState == 0 && this.measureScheduled > -1 && this.measure(!1);
  }
  /**
  Schedule a layout measurement, optionally providing callbacks to
  do custom DOM measuring followed by a DOM write phase. Using
  this is preferable reading DOM layout directly from, for
  example, an event handler, because it'll make sure measuring and
  drawing done by other components is synchronized, avoiding
  unnecessary DOM layout computations.
  */
  requestMeasure(e) {
    if (this.measureScheduled < 0 && (this.measureScheduled = this.win.requestAnimationFrame(() => this.measure())), e) {
      if (this.measureRequests.indexOf(e) > -1)
        return;
      if (e.key != null) {
        for (let t = 0; t < this.measureRequests.length; t++)
          if (this.measureRequests[t].key === e.key) {
            this.measureRequests[t] = e;
            return;
          }
      }
      this.measureRequests.push(e);
    }
  }
  /**
  Get the value of a specific plugin, if present. Note that
  plugins that crash can be dropped from a view, so even when you
  know you registered a given plugin, it is recommended to check
  the return value of this method.
  */
  plugin(e) {
    let t = this.pluginMap.get(e);
    return (t === void 0 || t && t.plugin != e) && this.pluginMap.set(e, t = this.plugins.find((i) => i.plugin == e) || null), t && t.update(this).value;
  }
  /**
  The top position of the document, in screen coordinates. This
  may be negative when the editor is scrolled down. Points
  directly to the top of the first line, not above the padding.
  */
  get documentTop() {
    return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
  }
  /**
  Reports the padding above and below the document.
  */
  get documentPadding() {
    return { top: this.viewState.paddingTop, bottom: this.viewState.paddingBottom };
  }
  /**
  If the editor is transformed with CSS, this provides the scale
  along the X axis. Otherwise, it will just be 1. Note that
  transforms other than translation and scaling are not supported.
  */
  get scaleX() {
    return this.viewState.scaleX;
  }
  /**
  Provide the CSS transformed scale along the Y axis.
  */
  get scaleY() {
    return this.viewState.scaleY;
  }
  /**
  Find the text line or block widget at the given vertical
  position (which is interpreted as relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop)).
  */
  elementAtHeight(e) {
    return this.readMeasured(), this.viewState.elementAtHeight(e);
  }
  /**
  Find the line block (see
  [`lineBlockAt`](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt)) at the given
  height, again interpreted relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop).
  */
  lineBlockAtHeight(e) {
    return this.readMeasured(), this.viewState.lineBlockAtHeight(e);
  }
  /**
  Get the extent and vertical position of all [line
  blocks](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt) in the viewport. Positions
  are relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop);
  */
  get viewportLineBlocks() {
    return this.viewState.viewportLines;
  }
  /**
  Find the line block around the given document position. A line
  block is a range delimited on both sides by either a
  non-[hidden](https://codemirror.net/6/docs/ref/#view.Decoration^replace) line break, or the
  start/end of the document. It will usually just hold a line of
  text, but may be broken into multiple textblocks by block
  widgets.
  */
  lineBlockAt(e) {
    return this.viewState.lineBlockAt(e);
  }
  /**
  The editor's total content height.
  */
  get contentHeight() {
    return this.viewState.contentHeight;
  }
  /**
  Move a cursor position by [grapheme
  cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak). `forward` determines whether
  the motion is away from the line start, or towards it. In
  bidirectional text, the line is traversed in visual order, using
  the editor's [text direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection).
  When the start position was the last one on the line, the
  returned position will be across the line break. If there is no
  further line, the original position is returned.
  
  By default, this method moves over a single cluster. The
  optional `by` argument can be used to move across more. It will
  be called with the first cluster as argument, and should return
  a predicate that determines, for each subsequent cluster,
  whether it should also be moved over.
  */
  moveByChar(e, t, i) {
    return aa(this, e, bf(this, e, t, i));
  }
  /**
  Move a cursor position across the next group of either
  [letters](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) or non-letter
  non-whitespace characters.
  */
  moveByGroup(e, t) {
    return aa(this, e, bf(this, e, t, (i) => v0(this, e.head, i)));
  }
  /**
  Get the cursor position visually at the start or end of a line.
  Note that this may differ from the _logical_ position at its
  start or end (which is simply at `line.from`/`line.to`) if text
  at the start or end goes against the line's base text direction.
  */
  visualLineSide(e, t) {
    let i = this.bidiSpans(e), s = this.textDirectionAt(e.from), r = i[t ? i.length - 1 : 0];
    return B.cursor(r.side(t, s) + e.from, r.forward(!t, s) ? 1 : -1);
  }
  /**
  Move to the next line boundary in the given direction. If
  `includeWrap` is true, line wrapping is on, and there is a
  further wrap point on the current line, the wrap point will be
  returned. Otherwise this function will return the start or end
  of the line.
  */
  moveToLineBoundary(e, t, i = !0) {
    return m0(this, e, t, i);
  }
  /**
  Move a cursor position vertically. When `distance` isn't given,
  it defaults to moving to the next line (including wrapped
  lines). Otherwise, `distance` should provide a positive distance
  in pixels.
  
  When `start` has a
  [`goalColumn`](https://codemirror.net/6/docs/ref/#state.SelectionRange.goalColumn), the vertical
  motion will use that as a target horizontal position. Otherwise,
  the cursor's own horizontal position is used. The returned
  cursor will have its goal column set to whichever column was
  used.
  */
  moveVertically(e, t, i) {
    return aa(this, e, b0(this, e, t, i));
  }
  /**
  Find the DOM parent node and offset (child offset if `node` is
  an element, character offset when it is a text node) at the
  given document position.
  
  Note that for positions that aren't currently in
  `visibleRanges`, the resulting DOM position isn't necessarily
  meaningful (it may just point before or after a placeholder
  element).
  */
  domAtPos(e, t = 1) {
    return this.docView.domAtPos(e, t);
  }
  /**
  Find the document position at the given DOM node. Can be useful
  for associating positions with DOM events. Will raise an error
  when `node` isn't part of the editor content.
  */
  posAtDOM(e, t = 0) {
    return this.docView.posFromDOM(e, t);
  }
  posAtCoords(e, t = !0) {
    this.readMeasured();
    let i = gh(this, e, t);
    return i && i.pos;
  }
  posAndSideAtCoords(e, t = !0) {
    return this.readMeasured(), gh(this, e, t);
  }
  /**
  Get the screen coordinates at the given document position.
  `side` determines whether the coordinates are based on the
  element before (-1) or after (1) the position (if no element is
  available on the given side, the method will transparently use
  another strategy to get reasonable coordinates).
  */
  coordsAtPos(e, t = 1) {
    this.readMeasured();
    let i = this.state.doc.lineAt(e), s = this.bidiSpans(i), r = s[Vi.find(s, e - i.from, -1, t)];
    return this.docView.coordsAt(e, t, r.dir == nt.RTL);
  }
  /**
  Return the rectangle around a given character. If `pos` does not
  point in front of a character that is in the viewport and
  rendered (i.e. not replaced, not a line break), this will return
  null. For space characters that are a line wrap point, this will
  return the position before the line break.
  */
  coordsForChar(e) {
    return this.readMeasured(), this.docView.coordsForChar(e);
  }
  /**
  The default width of a character in the editor. May not
  accurately reflect the width of all characters (given variable
  width fonts or styling of invididual ranges).
  */
  get defaultCharacterWidth() {
    return this.viewState.heightOracle.charWidth;
  }
  /**
  The default height of a line in the editor. May not be accurate
  for all lines.
  */
  get defaultLineHeight() {
    return this.viewState.heightOracle.lineHeight;
  }
  /**
  The text direction
  ([`direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)
  CSS property) of the editor's content element.
  */
  get textDirection() {
    return this.viewState.defaultTextDirection;
  }
  /**
  Find the text direction of the block at the given position, as
  assigned by CSS. If
  [`perLineTextDirection`](https://codemirror.net/6/docs/ref/#view.EditorView^perLineTextDirection)
  isn't enabled, or the given position is outside of the viewport,
  this will always return the same as
  [`textDirection`](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection). Note that
  this may trigger a DOM layout.
  */
  textDirectionAt(e) {
    return !this.state.facet(op) || e < this.viewport.from || e > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(e));
  }
  /**
  Whether this editor [wraps lines](https://codemirror.net/6/docs/ref/#view.EditorView.lineWrapping)
  (as determined by the
  [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
  CSS property of its content element).
  */
  get lineWrapping() {
    return this.viewState.heightOracle.lineWrapping;
  }
  /**
  Returns the bidirectional text structure of the given line
  (which should be in the current document) as an array of span
  objects. The order of these spans matches the [text
  direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection)—if that is
  left-to-right, the leftmost spans come first, otherwise the
  rightmost spans come first.
  */
  bidiSpans(e) {
    if (e.length > h1)
      return Kd(e.length);
    let t = this.textDirectionAt(e.from), i;
    for (let r of this.bidiCache)
      if (r.from == e.from && r.dir == t && (r.fresh || Hd(r.isolates, i = Of(this, e))))
        return r.order;
    i || (i = Of(this, e));
    let s = Wv(e.text, t, i);
    return this.bidiCache.push(new ll(e.from, e.to, t, i, !0, s)), s;
  }
  /**
  Check whether the editor has focus.
  */
  get hasFocus() {
    var e;
    return (this.dom.ownerDocument.hasFocus() || se.safari && ((e = this.inputState) === null || e === void 0 ? void 0 : e.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
  }
  /**
  Put focus on the editor.
  */
  focus() {
    this.observer.ignore(() => {
      Bd(this.contentDOM), this.docView.updateSelection();
    });
  }
  /**
  Update the [root](https://codemirror.net/6/docs/ref/##view.EditorViewConfig.root) in which the editor lives. This is only
  necessary when moving the editor's existing DOM to a new window or shadow root.
  */
  setRoot(e) {
    this._root != e && (this._root = e, this.observer.setWindow((e.nodeType == 9 ? e : e.ownerDocument).defaultView || window), this.mountStyles());
  }
  /**
  Clean up this editor view, removing its element from the
  document, unregistering event handlers, and notifying
  plugins. The view instance can no longer be used after
  calling this.
  */
  destroy() {
    this.root.activeElement == this.contentDOM && this.contentDOM.blur();
    for (let e of this.plugins)
      e.destroy(this);
    this.plugins = [], this.inputState.destroy(), this.docView.destroy(), this.dom.remove(), this.observer.destroy(), this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.destroyed = !0;
  }
  /**
  Returns an effect that can be
  [added](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) to a transaction to
  cause it to scroll the given position or range into view.
  */
  static scrollIntoView(e, t = {}) {
    var i, s, r, o;
    return bo.of(new Rs(typeof e == "number" ? B.cursor(e) : e, (i = t.y) !== null && i !== void 0 ? i : "nearest", (s = t.x) !== null && s !== void 0 ? s : "nearest", (r = t.yMargin) !== null && r !== void 0 ? r : 5, (o = t.xMargin) !== null && o !== void 0 ? o : 5));
  }
  /**
  Return an effect that resets the editor to its current (at the
  time this method was called) scroll position. Note that this
  only affects the editor's own scrollable element, not parents.
  See also
  [`EditorViewConfig.scrollTo`](https://codemirror.net/6/docs/ref/#view.EditorViewConfig.scrollTo).
  
  The effect should be used with a document identical to the one
  it was created for. Failing to do so is not an error, but may
  not scroll to the expected position. You can
  [map](https://codemirror.net/6/docs/ref/#state.StateEffect.map) the effect to account for changes.
  */
  scrollSnapshot() {
    let { scrollTop: e, scrollLeft: t } = this.scrollDOM, i = this.viewState.scrollAnchorAt(e);
    return bo.of(new Rs(B.cursor(i.from), "start", "start", i.top - e, t, !0));
  }
  /**
  Enable or disable tab-focus mode, which disables key bindings
  for Tab and Shift-Tab, letting the browser's default
  focus-changing behavior go through instead. This is useful to
  prevent trapping keyboard users in your editor.
  
  Without argument, this toggles the mode. With a boolean, it
  enables (true) or disables it (false). Given a number, it
  temporarily enables the mode until that number of milliseconds
  have passed or another non-Tab key is pressed.
  */
  setTabFocusMode(e) {
    e == null ? this.inputState.tabFocusMode = this.inputState.tabFocusMode < 0 ? 0 : -1 : typeof e == "boolean" ? this.inputState.tabFocusMode = e ? 0 : -1 : this.inputState.tabFocusMode != 0 && (this.inputState.tabFocusMode = Date.now() + e);
  }
  /**
  Returns an extension that can be used to add DOM event handlers.
  The value should be an object mapping event names to handler
  functions. For any given event, such functions are ordered by
  extension precedence, and the first handler to return true will
  be assumed to have handled that event, and no other handlers or
  built-in behavior will be activated for it. These are registered
  on the [content element](https://codemirror.net/6/docs/ref/#view.EditorView.contentDOM), except
  for `scroll` handlers, which will be called any time the
  editor's [scroll element](https://codemirror.net/6/docs/ref/#view.EditorView.scrollDOM) or one of
  its parent nodes is scrolled.
  */
  static domEventHandlers(e) {
    return Ki.define(() => ({}), { eventHandlers: e });
  }
  /**
  Create an extension that registers DOM event observers. Contrary
  to event [handlers](https://codemirror.net/6/docs/ref/#view.EditorView^domEventHandlers),
  observers can't be prevented from running by a higher-precedence
  handler returning true. They also don't prevent other handlers
  and observers from running when they return true, and should not
  call `preventDefault`.
  */
  static domEventObservers(e) {
    return Ki.define(() => ({}), { eventObservers: e });
  }
  /**
  Create a theme extension. The first argument can be a
  [`style-mod`](https://code.haverbeke.berlin/marijn/style-mod#documentation)
  style spec providing the styles for the theme. These will be
  prefixed with a generated class for the style.
  
  Because the selectors will be prefixed with a scope class, rule
  that directly match the editor's [wrapper
  element](https://codemirror.net/6/docs/ref/#view.EditorView.dom)—to which the scope class will be
  added—need to be explicitly differentiated by adding an `&` to
  the selector for that element—for example
  `&.cm-focused`.
  
  When `dark` is set to true, the theme will be marked as dark,
  which will cause the `&dark` rules from [base
  themes](https://codemirror.net/6/docs/ref/#view.EditorView^baseTheme) to be used (as opposed to
  `&light` when a light theme is active).
  */
  static theme(e, t) {
    let i = Fs.newName(), s = [ko.of(i), yr.of(yh(`.${i}`, e))];
    return t && t.dark && s.push(vh.of(!0)), s;
  }
  /**
  Create an extension that adds styles to the base theme. Like
  with [`theme`](https://codemirror.net/6/docs/ref/#view.EditorView^theme), use `&` to indicate the
  place of the editor wrapper element when directly targeting
  that. You can also use `&dark` or `&light` instead to only
  target editors with a dark or light theme.
  */
  static baseTheme(e) {
    return no.lowest(yr.of(yh("." + bh, e, Zp)));
  }
  /**
  Retrieve an editor view instance from the view's DOM
  representation.
  */
  static findFromDOM(e) {
    var t;
    let i = e.querySelector(".cm-content"), s = i && st.get(i) || st.get(e);
    return ((t = s == null ? void 0 : s.root) === null || t === void 0 ? void 0 : t.view) || null;
  }
}
ge.styleModule = yr;
ge.inputHandler = sp;
ge.clipboardInputFilter = rc;
ge.clipboardOutputFilter = oc;
ge.scrollHandler = lp;
ge.focusChangeEffect = rp;
ge.perLineTextDirection = op;
ge.exceptionSink = np;
ge.updateListener = ph;
ge.editable = an;
ge.mouseSelectionStyle = ip;
ge.dragMovesSelection = tp;
ge.clickAddsSelectionRange = ep;
ge.decorations = Al;
ge.blockWrappers = cp;
ge.outerDecorations = ac;
ge.atomicRanges = oo;
ge.bidiIsolatedRanges = fp;
ge.cursorScrollMargin = /* @__PURE__ */ me.define({
  combine: (n) => {
    let e = 5, t = 5;
    for (let i of n)
      typeof i == "number" ? e = t = i : { x: e, y: t } = i;
    return { x: e, y: t };
  }
});
ge.scrollMargins = up;
ge.darkTheme = vh;
ge.cspNonce = /* @__PURE__ */ me.define({ combine: (n) => n.length ? n[0] : "" });
ge.contentAttributes = lc;
ge.editorAttributes = hp;
ge.lineWrapping = /* @__PURE__ */ ge.contentAttributes.of({ class: "cm-lineWrapping" });
ge.announce = /* @__PURE__ */ ze.define();
const h1 = 4096, Ef = {};
class ll {
  constructor(e, t, i, s, r, o) {
    this.from = e, this.to = t, this.dir = i, this.isolates = s, this.fresh = r, this.order = o;
  }
  static update(e, t) {
    if (t.empty && !e.some((r) => r.fresh))
      return e;
    let i = [], s = e.length ? e[e.length - 1].dir : nt.LTR;
    for (let r = Math.max(0, e.length - 10); r < e.length; r++) {
      let o = e[r];
      o.dir == s && !t.touchesRange(o.from, o.to) && i.push(new ll(t.mapPos(o.from, 1), t.mapPos(o.to, -1), o.dir, o.isolates, !1, o.order));
    }
    return i;
  }
}
function Lf(n, e, t) {
  for (let i = n.state.facet(e), s = i.length - 1; s >= 0; s--) {
    let r = i[s], o = typeof r == "function" ? r(n) : r;
    o && ic(o, t);
  }
  return t;
}
const c1 = se.mac ? "mac" : se.windows ? "win" : se.linux ? "linux" : "key";
function f1(n, e) {
  const t = n.split(/-(?!$)/);
  let i = t[t.length - 1];
  i == "Space" && (i = " ");
  let s, r, o, l;
  for (let a = 0; a < t.length - 1; ++a) {
    const h = t[a];
    if (/^(cmd|meta|m)$/i.test(h))
      l = !0;
    else if (/^a(lt)?$/i.test(h))
      s = !0;
    else if (/^(c|ctrl|control)$/i.test(h))
      r = !0;
    else if (/^s(hift)?$/i.test(h))
      o = !0;
    else if (/^mod$/i.test(h))
      e == "mac" ? l = !0 : r = !0;
    else
      throw new Error("Unrecognized modifier name: " + h);
  }
  return s && (i = "Alt-" + i), r && (i = "Ctrl-" + i), l && (i = "Meta-" + i), o && (i = "Shift-" + i), i;
}
function $o(n, e, t) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t !== !1 && e.shiftKey && (n = "Shift-" + n), n;
}
const u1 = /* @__PURE__ */ no.default(/* @__PURE__ */ ge.domEventHandlers({
  keydown(n, e) {
    return g1(d1(e.state), n, e, "editor");
  }
})), El = /* @__PURE__ */ me.define({ enables: u1 }), jf = /* @__PURE__ */ new WeakMap();
function d1(n) {
  let e = n.facet(El), t = jf.get(e);
  return t || jf.set(e, t = O1(e.reduce((i, s) => i.concat(s), []))), t;
}
let kn = null;
const p1 = 4e3;
function O1(n, e = c1) {
  let t = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), s = (o, l) => {
    let a = i[o];
    if (a == null)
      i[o] = l;
    else if (a != l)
      throw new Error("Key binding " + o + " is used both as a regular binding and as a multi-stroke prefix");
  }, r = (o, l, a, h, c) => {
    var f, d;
    let p = t[o] || (t[o] = /* @__PURE__ */ Object.create(null)), O = l.split(/ (?!$)/).map((v) => f1(v, e));
    for (let v = 1; v < O.length; v++) {
      let x = O.slice(0, v).join(" ");
      s(x, !0), p[x] || (p[x] = {
        preventDefault: !0,
        stopPropagation: !1,
        run: [(S) => {
          let _ = kn = { view: S, prefix: x, scope: o };
          return setTimeout(() => {
            kn == _ && (kn = null);
          }, p1), !0;
        }]
      });
    }
    let g = O.join(" ");
    s(g, !1);
    let m = p[g] || (p[g] = {
      preventDefault: !1,
      stopPropagation: !1,
      run: ((d = (f = p._any) === null || f === void 0 ? void 0 : f.run) === null || d === void 0 ? void 0 : d.slice()) || []
    });
    a && m.run.push(a), h && (m.preventDefault = !0), c && (m.stopPropagation = !0);
  };
  for (let o of n) {
    let l = o.scope ? o.scope.split(" ") : ["editor"];
    if (o.any)
      for (let h of l) {
        let c = t[h] || (t[h] = /* @__PURE__ */ Object.create(null));
        c._any || (c._any = { preventDefault: !1, stopPropagation: !1, run: [] });
        let { any: f } = o;
        for (let d in c)
          c[d].run.push((p) => f(p, wh));
      }
    let a = o[e] || o.key;
    if (a)
      for (let h of l)
        r(h, a, o.run, o.preventDefault, o.stopPropagation), o.shift && r(h, "Shift-" + a, o.shift, o.preventDefault, o.stopPropagation);
  }
  return t;
}
let wh = null;
function g1(n, e, t, i) {
  wh = e;
  let s = Pv(e), r = In(s, 0), o = xs(r) == s.length && s != " ", l = "", a = !1, h = !1, c = !1;
  kn && kn.view == t && kn.scope == i && (l = kn.prefix + " ", yp.indexOf(e.keyCode) < 0 && (h = !0, kn = null));
  let f = /* @__PURE__ */ new Set(), d = (m) => {
    if (m) {
      for (let v of m.run)
        if (!f.has(v) && (f.add(v), v(t)))
          return m.stopPropagation && (c = !0), !0;
      m.preventDefault && (m.stopPropagation && (c = !0), h = !0);
    }
    return !1;
  }, p = n[i], O, g;
  return p && (d(p[l + $o(s, e, !o)]) ? a = !0 : o && (e.altKey || e.metaKey || e.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
  !(se.windows && e.ctrlKey && e.altKey) && // Alt-combinations on macOS tend to be typed characters
  !(se.mac && e.altKey && !(e.ctrlKey || e.metaKey)) && (O = En[e.keyCode]) && O != s ? (d(p[l + $o(O, e, !0)]) || e.shiftKey && (g = zr[e.keyCode]) != s && g != O && d(p[l + $o(g, e, !1)])) && (a = !0) : o && e.shiftKey && d(p[l + $o(s, e, !0)]) && (a = !0), !a && d(p._any) && (a = !0)), h && (a = !0), a && c && e.stopPropagation(), wh = null, a;
}
class m1 extends or {
  constructor(e) {
    super(), this.content = e;
  }
  toDOM(e) {
    let t = document.createElement("span");
    return t.className = "cm-placeholder", t.style.pointerEvents = "none", t.appendChild(typeof this.content == "string" ? document.createTextNode(this.content) : typeof this.content == "function" ? this.content(e) : this.content.cloneNode(!0)), t.setAttribute("aria-hidden", "true"), t;
  }
  coordsAt(e) {
    let t = e.firstChild ? Ar(e.firstChild) : [];
    if (!t.length)
      return null;
    let i = window.getComputedStyle(e.parentNode), s = Wr(t[0], i.direction != "rtl"), r = parseInt(i.lineHeight);
    return s.bottom - s.top > r * 1.5 ? { left: s.left, right: s.right, top: s.top, bottom: s.top + r } : s;
  }
  ignoreEvent() {
    return !1;
  }
}
function v1(n) {
  let e = Ki.fromClass(class {
    constructor(t) {
      this.view = t, this.placeholder = n ? We.set([We.widget({ widget: new m1(n), side: 1 }).range(0)]) : We.none;
    }
    get decorations() {
      return this.view.state.doc.length ? We.none : this.placeholder;
    }
  }, { decorations: (t) => t.decorations });
  return typeof n == "string" ? [
    e,
    ge.contentAttributes.of({ "aria-placeholder": n })
  ] : e;
}
const Po = "-10000px";
class b1 {
  constructor(e, t, i, s) {
    this.facet = t, this.createTooltipView = i, this.removeTooltipView = s, this.input = e.state.facet(t), this.tooltips = this.input.filter((o) => o);
    let r = null;
    this.tooltipViews = this.tooltips.map((o) => r = i(o, r));
  }
  update(e, t) {
    var i;
    let s = e.state.facet(this.facet), r = s.filter((a) => a);
    if (s === this.input) {
      for (let a of this.tooltipViews)
        a.update && a.update(e);
      return !1;
    }
    let o = [], l = t ? [] : null;
    for (let a = 0; a < r.length; a++) {
      let h = r[a], c = -1;
      if (h) {
        for (let f = 0; f < this.tooltips.length; f++) {
          let d = this.tooltips[f];
          d && d.create == h.create && (c = f);
        }
        if (c < 0)
          o[a] = this.createTooltipView(h, a ? o[a - 1] : null), l && (l[a] = !!h.above);
        else {
          let f = o[a] = this.tooltipViews[c];
          l && (l[a] = t[c]), f.update && f.update(e);
        }
      }
    }
    for (let a of this.tooltipViews)
      o.indexOf(a) < 0 && (this.removeTooltipView(a), (i = a.destroy) === null || i === void 0 || i.call(a));
    return t && (l.forEach((a, h) => t[h] = a), t.length = l.length), this.input = s, this.tooltips = r, this.tooltipViews = o, !0;
  }
}
function y1(n) {
  let e = n.dom.ownerDocument.documentElement;
  return { top: 0, left: 0, bottom: e.clientHeight, right: e.clientWidth };
}
const fa = /* @__PURE__ */ me.define({
  combine: (n) => {
    var e, t, i;
    return {
      position: se.ios ? "absolute" : ((e = n.find((s) => s.position)) === null || e === void 0 ? void 0 : e.position) || "fixed",
      parent: ((t = n.find((s) => s.parent)) === null || t === void 0 ? void 0 : t.parent) || null,
      tooltipSpace: ((i = n.find((s) => s.tooltipSpace)) === null || i === void 0 ? void 0 : i.tooltipSpace) || y1
    };
  }
}), zf = /* @__PURE__ */ new WeakMap(), Cp = /* @__PURE__ */ Ki.fromClass(class {
  constructor(n) {
    this.view = n, this.above = [], this.inView = !0, this.madeAbsolute = !1, this.lastTransaction = 0, this.measureTimeout = -1;
    let e = n.state.facet(fa);
    this.position = e.position, this.parent = e.parent, this.classes = n.themeClasses, this.createContainer(), this.measureReq = { read: this.readMeasure.bind(this), write: this.writeMeasure.bind(this), key: this }, this.resizeObserver = typeof ResizeObserver == "function" ? new ResizeObserver(() => this.measureSoon()) : null, this.manager = new b1(n, Ap, (t, i) => this.createTooltip(t, i), (t) => {
      this.resizeObserver && this.resizeObserver.unobserve(t.dom), t.dom.remove();
    }), this.above = this.manager.tooltips.map((t) => !!t.above), this.intersectionObserver = typeof IntersectionObserver == "function" ? new IntersectionObserver((t) => {
      Date.now() > this.lastTransaction - 50 && t.length > 0 && t[t.length - 1].intersectionRatio < 1 && this.measureSoon();
    }, { threshold: [1] }) : null, this.observeIntersection(), n.win.addEventListener("resize", this.measureSoon = this.measureSoon.bind(this)), this.maybeMeasure();
  }
  createContainer() {
    this.parent ? (this.container = document.createElement("div"), this.container.style.position = "relative", this.container.className = this.view.themeClasses, this.parent.appendChild(this.container)) : this.container = this.view.dom;
  }
  observeIntersection() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      for (let n of this.manager.tooltipViews)
        this.intersectionObserver.observe(n.dom);
    }
  }
  measureSoon() {
    this.measureTimeout < 0 && (this.measureTimeout = setTimeout(() => {
      this.measureTimeout = -1, this.maybeMeasure();
    }, 50));
  }
  update(n) {
    n.transactions.length && (this.lastTransaction = Date.now());
    let e = this.manager.update(n, this.above);
    e && this.observeIntersection();
    let t = e || n.geometryChanged, i = n.state.facet(fa);
    if (i.position != this.position && !this.madeAbsolute) {
      this.position = i.position;
      for (let s of this.manager.tooltipViews)
        s.dom.style.position = this.position;
      t = !0;
    }
    if (i.parent != this.parent) {
      this.parent && this.container.remove(), this.parent = i.parent, this.createContainer();
      for (let s of this.manager.tooltipViews)
        this.container.appendChild(s.dom);
      t = !0;
    } else this.parent && this.view.themeClasses != this.classes && (this.classes = this.container.className = this.view.themeClasses);
    t && this.maybeMeasure();
  }
  createTooltip(n, e) {
    let t = n.create(this.view), i = e ? e.dom : null;
    if (t.dom.classList.add("cm-tooltip"), n.arrow && !t.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")) {
      let s = document.createElement("div");
      s.className = "cm-tooltip-arrow", t.dom.appendChild(s);
    }
    return t.dom.style.position = this.position, t.dom.style.top = Po, t.dom.style.left = "0px", this.container.insertBefore(t.dom, i), t.mount && t.mount(this.view), this.resizeObserver && this.resizeObserver.observe(t.dom), t;
  }
  destroy() {
    var n, e, t;
    this.view.win.removeEventListener("resize", this.measureSoon);
    for (let i of this.manager.tooltipViews)
      i.dom.remove(), (n = i.destroy) === null || n === void 0 || n.call(i);
    this.parent && this.container.remove(), (e = this.resizeObserver) === null || e === void 0 || e.disconnect(), (t = this.intersectionObserver) === null || t === void 0 || t.disconnect(), clearTimeout(this.measureTimeout);
  }
  readMeasure() {
    let n = 1, e = 1, t = !1;
    if (this.position == "fixed" && this.manager.tooltipViews.length) {
      let { dom: r } = this.manager.tooltipViews[0];
      if (se.safari) {
        let o = r.getBoundingClientRect();
        t = Math.abs(o.top + 1e4) > 1 || Math.abs(o.left) > 1;
      } else
        t = !!r.offsetParent && r.offsetParent != this.container.ownerDocument.body;
    }
    if (t || this.position == "absolute")
      if (this.parent) {
        let r = this.parent.getBoundingClientRect();
        r.width && r.height && (n = r.width / this.parent.offsetWidth, e = r.height / this.parent.offsetHeight);
      } else
        ({ scaleX: n, scaleY: e } = this.view.viewState);
    let i = this.view.scrollDOM.getBoundingClientRect(), s = hc(this.view);
    return {
      visible: {
        left: i.left + s.left,
        top: i.top + s.top,
        right: i.right - s.right,
        bottom: i.bottom - s.bottom
      },
      parent: this.parent ? this.container.getBoundingClientRect() : this.view.dom.getBoundingClientRect(),
      pos: this.manager.tooltips.map((r, o) => {
        let l = this.manager.tooltipViews[o];
        return l.getCoords ? l.getCoords(r.pos) : this.view.coordsAtPos(r.pos);
      }),
      size: this.manager.tooltipViews.map(({ dom: r }) => r.getBoundingClientRect()),
      space: this.view.state.facet(fa).tooltipSpace(this.view),
      scaleX: n,
      scaleY: e,
      makeAbsolute: t
    };
  }
  writeMeasure(n) {
    var e;
    if (n.makeAbsolute) {
      this.madeAbsolute = !0, this.position = "absolute";
      for (let l of this.manager.tooltipViews)
        l.dom.style.position = "absolute";
    }
    let { visible: t, space: i, scaleX: s, scaleY: r } = n, o = [];
    for (let l = 0; l < this.manager.tooltips.length; l++) {
      let a = this.manager.tooltips[l], h = this.manager.tooltipViews[l], { dom: c } = h, f = n.pos[l], d = n.size[l];
      if (!f || a.clip !== !1 && (f.bottom <= Math.max(t.top, i.top) || f.top >= Math.min(t.bottom, i.bottom) || f.right < Math.max(t.left, i.left) - 0.1 || f.left > Math.min(t.right, i.right) + 0.1)) {
        c.style.top = Po;
        continue;
      }
      let p = a.arrow ? h.dom.querySelector(".cm-tooltip-arrow") : null, O = p ? 7 : 0, g = d.right - d.left, m = (e = zf.get(h)) !== null && e !== void 0 ? e : d.bottom - d.top, v = h.offset || x1, x = this.view.textDirection == nt.LTR, S = d.width > i.right - i.left ? x ? i.left : i.right - d.width : x ? Math.max(i.left, Math.min(f.left - (p ? 14 : 0) + v.x, i.right - g)) : Math.min(Math.max(i.left, f.left - g + (p ? 14 : 0) - v.x), i.right - g), _ = this.above[l];
      !a.strictSide && (_ ? f.top - m - O - v.y < i.top : f.bottom + m + O + v.y > i.bottom) && _ == i.bottom - f.bottom > f.top - i.top && (_ = this.above[l] = !_);
      let C = (_ ? f.top - i.top : i.bottom - f.bottom) - O;
      if (C < m && h.resize !== !1) {
        if (C < this.view.defaultLineHeight) {
          c.style.top = Po;
          continue;
        }
        zf.set(h, m), c.style.height = (m = C) / r + "px";
      } else c.style.height && (c.style.height = "");
      let R = _ ? f.top - m - O - v.y : f.bottom + O + v.y, X = S + g;
      if (h.overlap !== !0)
        for (let H of o)
          H.left < X && H.right > S && H.top < R + m && H.bottom > R && (R = _ ? H.top - m - 2 - O : H.bottom + O + 2);
      if (this.position == "absolute" ? (c.style.top = (R - n.parent.top) / r + "px", Df(c, (S - n.parent.left) / s)) : (c.style.top = R / r + "px", Df(c, S / s)), p) {
        let H = f.left + (x ? v.x : -v.x) - (S + 14 - 7);
        p.style.left = H / s + "px";
      }
      h.overlap !== !0 && o.push({ left: S, top: R, right: X, bottom: R + m }), c.classList.toggle("cm-tooltip-above", _), c.classList.toggle("cm-tooltip-below", !_), h.positioned && h.positioned(n.space);
    }
  }
  maybeMeasure() {
    if (this.manager.tooltips.length && (this.view.inView && this.view.requestMeasure(this.measureReq), this.inView != this.view.inView && (this.inView = this.view.inView, !this.inView)))
      for (let n of this.manager.tooltipViews)
        n.dom.style.top = Po;
  }
}, {
  eventObservers: {
    scroll() {
      this.maybeMeasure();
    }
  }
});
function Df(n, e) {
  let t = parseInt(n.style.left, 10);
  (isNaN(t) || Math.abs(e - t) > 1) && (n.style.left = e + "px");
}
const w1 = /* @__PURE__ */ ge.baseTheme({
  ".cm-tooltip": {
    zIndex: 500,
    boxSizing: "border-box"
  },
  "&light .cm-tooltip": {
    border: "1px solid #bbb",
    backgroundColor: "#f5f5f5"
  },
  "&light .cm-tooltip-section:not(:first-child)": {
    borderTop: "1px solid #bbb"
  },
  "&dark .cm-tooltip": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-tooltip-arrow": {
    height: "7px",
    width: "14px",
    position: "absolute",
    zIndex: -1,
    overflow: "hidden",
    "&:before, &:after": {
      content: "''",
      position: "absolute",
      width: 0,
      height: 0,
      borderLeft: "7px solid transparent",
      borderRight: "7px solid transparent"
    },
    ".cm-tooltip-above &": {
      bottom: "-7px",
      "&:before": {
        borderTop: "7px solid #bbb"
      },
      "&:after": {
        borderTop: "7px solid #f5f5f5",
        bottom: "1px"
      }
    },
    ".cm-tooltip-below &": {
      top: "-7px",
      "&:before": {
        borderBottom: "7px solid #bbb"
      },
      "&:after": {
        borderBottom: "7px solid #f5f5f5",
        top: "1px"
      }
    }
  },
  "&dark .cm-tooltip .cm-tooltip-arrow": {
    "&:before": {
      borderTopColor: "#333338",
      borderBottomColor: "#333338"
    },
    "&:after": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    }
  }
}), x1 = { x: 0, y: 0 }, Ap = /* @__PURE__ */ me.define({
  enables: [Cp, w1]
});
function Rp(n, e) {
  let t = n.plugin(Cp);
  if (!t)
    return null;
  let i = t.manager.tooltips.indexOf(e);
  return i < 0 ? null : t.manager.tooltipViews[i];
}
class er extends Xn {
  /**
  @internal
  */
  compare(e) {
    return this == e || this.constructor == e.constructor && this.eq(e);
  }
  /**
  Compare this marker to another marker of the same type.
  */
  eq(e) {
    return !1;
  }
  /**
  Called if the marker has a `toDOM` method and its representation
  was removed from a gutter.
  */
  destroy(e) {
  }
}
er.prototype.elementClass = "";
er.prototype.toDOM = void 0;
er.prototype.mapMode = Xt.TrackBefore;
er.prototype.startSide = er.prototype.endSide = -1;
er.prototype.point = !0;
const Mp = 1024;
let S1 = 0;
class ua {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
class Te {
  /**
  Create a new node prop type.
  */
  constructor(e = {}) {
    this.id = S1++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
      throw new Error("This node type doesn't define a deserialize function");
    }), this.combine = e.combine || null;
  }
  /**
  This is meant to be used with
  [`NodeSet.extend`](#common.NodeSet.extend) or
  [`LRParser.configure`](#lr.ParserConfig.props) to compute
  prop values for each node type in the set. Takes a [match
  object](#common.NodeType^match) or function that returns undefined
  if the node type doesn't get this prop, and the prop's value if
  it does.
  */
  add(e) {
    if (this.perNode)
      throw new RangeError("Can't add per-node props to node types");
    return typeof e != "function" && (e = Ft.match(e)), (t) => {
      let i = e(t);
      return i === void 0 ? null : [this, i];
    };
  }
}
Te.closedBy = new Te({ deserialize: (n) => n.split(" ") });
Te.openedBy = new Te({ deserialize: (n) => n.split(" ") });
Te.group = new Te({ deserialize: (n) => n.split(" ") });
Te.isolate = new Te({ deserialize: (n) => {
  if (n && n != "rtl" && n != "ltr" && n != "auto")
    throw new RangeError("Invalid value for isolate: " + n);
  return n || "auto";
} });
Te.contextHash = new Te({ perNode: !0 });
Te.lookAhead = new Te({ perNode: !0 });
Te.mounted = new Te({ perNode: !0 });
class Xr {
  constructor(e, t, i, s = !1) {
    this.tree = e, this.overlay = t, this.parser = i, this.bracketed = s;
  }
  /**
  @internal
  */
  static get(e) {
    return e && e.props && e.props[Te.mounted.id];
  }
}
const Q1 = /* @__PURE__ */ Object.create(null);
class Ft {
  /**
  @internal
  */
  constructor(e, t, i, s = 0) {
    this.name = e, this.props = t, this.id = i, this.flags = s;
  }
  /**
  Define a node type.
  */
  static define(e) {
    let t = e.props && e.props.length ? /* @__PURE__ */ Object.create(null) : Q1, i = (e.top ? 1 : 0) | (e.skipped ? 2 : 0) | (e.error ? 4 : 0) | (e.name == null ? 8 : 0), s = new Ft(e.name || "", t, e.id, i);
    if (e.props) {
      for (let r of e.props)
        if (Array.isArray(r) || (r = r(s)), r) {
          if (r[0].perNode)
            throw new RangeError("Can't store a per-node prop on a node type");
          t[r[0].id] = r[1];
        }
    }
    return s;
  }
  /**
  Retrieves a node prop for this type. Will return `undefined` if
  the prop isn't present on this node.
  */
  prop(e) {
    return this.props[e.id];
  }
  /**
  True when this is the top node of a grammar.
  */
  get isTop() {
    return (this.flags & 1) > 0;
  }
  /**
  True when this node is produced by a skip rule.
  */
  get isSkipped() {
    return (this.flags & 2) > 0;
  }
  /**
  Indicates whether this is an error node.
  */
  get isError() {
    return (this.flags & 4) > 0;
  }
  /**
  When true, this node type doesn't correspond to a user-declared
  named node, for example because it is used to cache repetition.
  */
  get isAnonymous() {
    return (this.flags & 8) > 0;
  }
  /**
  Returns true when this node's name or one of its
  [groups](#common.NodeProp^group) matches the given string.
  */
  is(e) {
    if (typeof e == "string") {
      if (this.name == e)
        return !0;
      let t = this.prop(Te.group);
      return t ? t.indexOf(e) > -1 : !1;
    }
    return this.id == e;
  }
  /**
  Create a function from node types to arbitrary values by
  specifying an object whose property names are node or
  [group](#common.NodeProp^group) names. Often useful with
  [`NodeProp.add`](#common.NodeProp.add). You can put multiple
  names, separated by spaces, in a single property name to map
  multiple node names to a single value.
  */
  static match(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e)
      for (let s of i.split(" "))
        t[s] = e[i];
    return (i) => {
      for (let s = i.prop(Te.group), r = -1; r < (s ? s.length : 0); r++) {
        let o = t[r < 0 ? i.name : s[r]];
        if (o)
          return o;
      }
    };
  }
}
Ft.none = new Ft(
  "",
  /* @__PURE__ */ Object.create(null),
  0,
  8
  /* NodeFlag.Anonymous */
);
class dc {
  /**
  Create a set with the given types. The `id` property of each
  type should correspond to its position within the array.
  */
  constructor(e) {
    this.types = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].id != t)
        throw new RangeError("Node type ids should correspond to array positions when creating a node set");
  }
  /**
  Create a copy of this set with some node properties added. The
  arguments to this method can be created with
  [`NodeProp.add`](#common.NodeProp.add).
  */
  extend(...e) {
    let t = [];
    for (let i of this.types) {
      let s = null;
      for (let r of e) {
        let o = r(i);
        if (o) {
          s || (s = Object.assign({}, i.props));
          let l = o[1], a = o[0];
          a.combine && a.id in s && (l = a.combine(s[a.id], l)), s[a.id] = l;
        }
      }
      t.push(s ? new Ft(i.name, s, i.id, i.flags) : i);
    }
    return new dc(t);
  }
}
const _o = /* @__PURE__ */ new WeakMap(), If = /* @__PURE__ */ new WeakMap();
var Je;
(function(n) {
  n[n.ExcludeBuffers = 1] = "ExcludeBuffers", n[n.IncludeAnonymous = 2] = "IncludeAnonymous", n[n.IgnoreMounts = 4] = "IgnoreMounts", n[n.IgnoreOverlays = 8] = "IgnoreOverlays", n[n.EnterBracketed = 16] = "EnterBracketed";
})(Je || (Je = {}));
class at {
  /**
  Construct a new tree. See also [`Tree.build`](#common.Tree^build).
  */
  constructor(e, t, i, s, r) {
    if (this.type = e, this.children = t, this.positions = i, this.length = s, this.props = null, r && r.length) {
      this.props = /* @__PURE__ */ Object.create(null);
      for (let [o, l] of r)
        this.props[typeof o == "number" ? o : o.id] = l;
    }
  }
  /**
  @internal
  */
  toString() {
    let e = Xr.get(this);
    if (e && !e.overlay)
      return e.tree.toString();
    let t = "";
    for (let i of this.children) {
      let s = i.toString();
      s && (t && (t += ","), t += s);
    }
    return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (t.length ? "(" + t + ")" : "") : t;
  }
  /**
  Get a [tree cursor](#common.TreeCursor) positioned at the top of
  the tree. Mode can be used to [control](#common.IterMode) which
  nodes the cursor visits.
  */
  cursor(e = 0) {
    return new Sh(this.topNode, e);
  }
  /**
  Get a [tree cursor](#common.TreeCursor) pointing into this tree
  at the given position and side (see
  [`moveTo`](#common.TreeCursor.moveTo).
  */
  cursorAt(e, t = 0, i = 0) {
    let s = _o.get(this) || this.topNode, r = new Sh(s);
    return r.moveTo(e, t), _o.set(this, r._tree), r;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) object for the top of the
  tree.
  */
  get topNode() {
    return new Ut(this, 0, 0, null);
  }
  /**
  Get the [syntax node](#common.SyntaxNode) at the given position.
  If `side` is -1, this will move into nodes that end at the
  position. If 1, it'll move into nodes that start at the
  position. With 0, it'll only enter nodes that cover the position
  from both sides.
  
  Note that this will not enter
  [overlays](#common.MountedTree.overlay), and you often want
  [`resolveInner`](#common.Tree.resolveInner) instead.
  */
  resolve(e, t = 0) {
    let i = qr(_o.get(this) || this.topNode, e, t, !1);
    return _o.set(this, i), i;
  }
  /**
  Like [`resolve`](#common.Tree.resolve), but will enter
  [overlaid](#common.MountedTree.overlay) nodes, producing a syntax node
  pointing into the innermost overlaid tree at the given position
  (with parent links going through all parent structure, including
  the host trees).
  */
  resolveInner(e, t = 0) {
    let i = qr(If.get(this) || this.topNode, e, t, !0);
    return If.set(this, i), i;
  }
  /**
  In some situations, it can be useful to iterate through all
  nodes around a position, including those in overlays that don't
  directly cover the position. This method gives you an iterator
  that will produce all nodes, from small to big, around the given
  position.
  */
  resolveStack(e, t = 0) {
    return P1(this, e, t);
  }
  /**
  Iterate over the tree and its children, calling `enter` for any
  node that touches the `from`/`to` region (if given) before
  running over such a node's children, and `leave` (if given) when
  leaving the node. When `enter` returns `false`, that node will
  not have its children iterated over (or `leave` called).
  */
  iterate(e) {
    let { enter: t, leave: i, from: s = 0, to: r = this.length } = e, o = e.mode || 0, l = (o & Je.IncludeAnonymous) > 0;
    for (let a = this.cursor(o | Je.IncludeAnonymous); ; ) {
      let h = !1;
      if (a.from <= r && a.to >= s && (!l && a.type.isAnonymous || t(a) !== !1)) {
        if (a.firstChild())
          continue;
        h = !0;
      }
      for (; h && i && (l || !a.type.isAnonymous) && i(a), !a.nextSibling(); ) {
        if (!a.parent())
          return;
        h = !0;
      }
    }
  }
  /**
  Get the value of the given [node prop](#common.NodeProp) for this
  node. Works with both per-node and per-type props.
  */
  prop(e) {
    return e.perNode ? this.props ? this.props[e.id] : void 0 : this.type.prop(e);
  }
  /**
  Returns the node's [per-node props](#common.NodeProp.perNode) in a
  format that can be passed to the [`Tree`](#common.Tree)
  constructor.
  */
  get propValues() {
    let e = [];
    if (this.props)
      for (let t in this.props)
        e.push([+t, this.props[t]]);
    return e;
  }
  /**
  Balance the direct children of this tree, producing a copy of
  which may have children grouped into subtrees with type
  [`NodeType.none`](#common.NodeType^none).
  */
  balance(e = {}) {
    return this.children.length <= 8 ? this : gc(Ft.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, i, s) => new at(this.type, t, i, s, this.propValues), e.makeTree || ((t, i, s) => new at(Ft.none, t, i, s)));
  }
  /**
  Build a tree from a postfix-ordered buffer of node information,
  or a cursor over such a buffer.
  */
  static build(e) {
    return _1(e);
  }
}
at.empty = new at(Ft.none, [], [], 0);
class pc {
  constructor(e, t) {
    this.buffer = e, this.index = t;
  }
  get id() {
    return this.buffer[this.index - 4];
  }
  get start() {
    return this.buffer[this.index - 3];
  }
  get end() {
    return this.buffer[this.index - 2];
  }
  get size() {
    return this.buffer[this.index - 1];
  }
  get pos() {
    return this.index;
  }
  next() {
    this.index -= 4;
  }
  fork() {
    return new pc(this.buffer, this.index);
  }
}
class jn {
  /**
  Create a tree buffer.
  */
  constructor(e, t, i) {
    this.buffer = e, this.length = t, this.set = i;
  }
  /**
  @internal
  */
  get type() {
    return Ft.none;
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    for (let t = 0; t < this.buffer.length; )
      e.push(this.childString(t)), t = this.buffer[t + 3];
    return e.join(",");
  }
  /**
  @internal
  */
  childString(e) {
    let t = this.buffer[e], i = this.buffer[e + 3], s = this.set.types[t], r = s.name;
    if (/\W/.test(r) && !s.isError && (r = JSON.stringify(r)), e += 4, i == e)
      return r;
    let o = [];
    for (; e < i; )
      o.push(this.childString(e)), e = this.buffer[e + 3];
    return r + "(" + o.join(",") + ")";
  }
  /**
  @internal
  */
  findChild(e, t, i, s, r) {
    let { buffer: o } = this, l = -1;
    for (let a = e; a != t && !(Xp(r, s, o[a + 1], o[a + 2]) && (l = a, i > 0)); a = o[a + 3])
      ;
    return l;
  }
  /**
  @internal
  */
  slice(e, t, i) {
    let s = this.buffer, r = new Uint16Array(t - e), o = 0;
    for (let l = e, a = 0; l < t; ) {
      r[a++] = s[l++], r[a++] = s[l++] - i;
      let h = r[a++] = s[l++] - i;
      r[a++] = s[l++] - e, o = Math.max(o, h);
    }
    return new jn(r, o, this.set);
  }
}
function Xp(n, e, t, i) {
  switch (n) {
    case -2:
      return t < e;
    case -1:
      return i >= e && t < e;
    case 0:
      return t < e && i > e;
    case 1:
      return t <= e && i > e;
    case 2:
      return i > e;
    case 4:
      return !0;
  }
}
function qr(n, e, t, i) {
  for (var s; n.from == n.to || (t < 1 ? n.from >= e : n.from > e) || (t > -1 ? n.to <= e : n.to < e); ) {
    let o = !i && n instanceof Ut && n.index < 0 ? null : n.parent;
    if (!o)
      return n;
    n = o;
  }
  let r = i ? 0 : Je.IgnoreOverlays;
  if (i)
    for (let o = n, l = o.parent; l; o = l, l = o.parent)
      o instanceof Ut && o.index < 0 && ((s = l.enter(e, t, r)) === null || s === void 0 ? void 0 : s.from) != o.from && (n = l);
  for (; ; ) {
    let o = n.enter(e, t, r);
    if (!o)
      return n;
    n = o;
  }
}
class Ep {
  cursor(e = 0) {
    return new Sh(this, e);
  }
  getChild(e, t = null, i = null) {
    let s = Wf(this, e, t, i);
    return s.length ? s[0] : null;
  }
  getChildren(e, t = null, i = null) {
    return Wf(this, e, t, i);
  }
  resolve(e, t = 0) {
    return qr(this, e, t, !1);
  }
  resolveInner(e, t = 0) {
    return qr(this, e, t, !0);
  }
  matchContext(e) {
    return xh(this.parent, e);
  }
  enterUnfinishedNodesBefore(e) {
    let t = this.childBefore(e), i = this;
    for (; t; ) {
      let s = t.lastChild;
      if (!s || s.to != t.to)
        break;
      s.type.isError && s.from == s.to ? (i = t, t = s.prevSibling) : t = s;
    }
    return i;
  }
  get node() {
    return this;
  }
  get next() {
    return this.parent;
  }
}
class Ut extends Ep {
  constructor(e, t, i, s) {
    super(), this._tree = e, this.from = t, this.index = i, this._parent = s;
  }
  get type() {
    return this._tree.type;
  }
  get name() {
    return this._tree.type.name;
  }
  get to() {
    return this.from + this._tree.length;
  }
  nextChild(e, t, i, s, r = 0) {
    for (let o = this; ; ) {
      for (let { children: l, positions: a } = o._tree, h = t > 0 ? l.length : -1; e != h; e += t) {
        let c = l[e], f = a[e] + o.from, d;
        if (!(!(r & Je.EnterBracketed && c instanceof at && (d = Xr.get(c)) && !d.overlay && d.bracketed && i >= f && i <= f + c.length) && !Xp(s, i, f, f + c.length))) {
          if (c instanceof jn) {
            if (r & Je.ExcludeBuffers)
              continue;
            let p = c.findChild(0, c.buffer.length, t, i - f, s);
            if (p > -1)
              return new Ni(new k1(o, c, e, f), null, p);
          } else if (r & Je.IncludeAnonymous || !c.type.isAnonymous || Oc(c)) {
            let p;
            if (!(r & Je.IgnoreMounts) && (p = Xr.get(c)) && !p.overlay)
              return new Ut(p.tree, f, e, o);
            let O = new Ut(c, f, e, o);
            return r & Je.IncludeAnonymous || !O.type.isAnonymous ? O : O.nextChild(t < 0 ? c.children.length - 1 : 0, t, i, s, r);
          }
        }
      }
      if (r & Je.IncludeAnonymous || !o.type.isAnonymous || (o.index >= 0 ? e = o.index + t : e = t < 0 ? -1 : o._parent._tree.children.length, o = o._parent, !o))
        return null;
    }
  }
  get firstChild() {
    return this.nextChild(
      0,
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(e) {
    return this.nextChild(
      0,
      1,
      e,
      2
      /* Side.After */
    );
  }
  childBefore(e) {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  prop(e) {
    return this._tree.prop(e);
  }
  enter(e, t, i = 0) {
    let s;
    if (!(i & Je.IgnoreOverlays) && (s = Xr.get(this._tree)) && s.overlay) {
      let r = e - this.from, o = i & Je.EnterBracketed && s.bracketed;
      for (let { from: l, to: a } of s.overlay)
        if ((t > 0 || o ? l <= r : l < r) && (t < 0 || o ? a >= r : a > r))
          return new Ut(s.tree, s.overlay[0].from + this.from, -1, this);
    }
    return this.nextChild(0, 1, e, t, i);
  }
  nextSignificantParent() {
    let e = this;
    for (; e.type.isAnonymous && e._parent; )
      e = e._parent;
    return e;
  }
  get parent() {
    return this._parent ? this._parent.nextSignificantParent() : null;
  }
  get nextSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index + 1,
      1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  get prevSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  get tree() {
    return this._tree;
  }
  toTree() {
    return this._tree;
  }
  /**
  @internal
  */
  toString() {
    return this._tree.toString();
  }
}
function Wf(n, e, t, i) {
  let s = n.cursor(), r = [];
  if (!s.firstChild())
    return r;
  if (t != null) {
    for (let o = !1; !o; )
      if (o = s.type.is(t), !s.nextSibling())
        return r;
  }
  for (; ; ) {
    if (i != null && s.type.is(i))
      return r;
    if (s.type.is(e) && r.push(s.node), !s.nextSibling())
      return i == null ? r : [];
  }
}
function xh(n, e, t = e.length - 1) {
  for (let i = n; t >= 0; i = i.parent) {
    if (!i)
      return !1;
    if (!i.type.isAnonymous) {
      if (e[t] && e[t] != i.name)
        return !1;
      t--;
    }
  }
  return !0;
}
class k1 {
  constructor(e, t, i, s) {
    this.parent = e, this.buffer = t, this.index = i, this.start = s;
  }
}
class Ni extends Ep {
  get name() {
    return this.type.name;
  }
  get from() {
    return this.context.start + this.context.buffer.buffer[this.index + 1];
  }
  get to() {
    return this.context.start + this.context.buffer.buffer[this.index + 2];
  }
  constructor(e, t, i) {
    super(), this.context = e, this._parent = t, this.index = i, this.type = e.buffer.set.types[e.buffer.buffer[i]];
  }
  child(e, t, i) {
    let { buffer: s } = this.context, r = s.findChild(this.index + 4, s.buffer[this.index + 3], e, t - this.context.start, i);
    return r < 0 ? null : new Ni(this.context, this, r);
  }
  get firstChild() {
    return this.child(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.child(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(e) {
    return this.child(
      1,
      e,
      2
      /* Side.After */
    );
  }
  childBefore(e) {
    return this.child(
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  prop(e) {
    return this.type.prop(e);
  }
  enter(e, t, i = 0) {
    if (i & Je.ExcludeBuffers)
      return null;
    let { buffer: s } = this.context, r = s.findChild(this.index + 4, s.buffer[this.index + 3], t > 0 ? 1 : -1, e - this.context.start, t);
    return r < 0 ? null : new Ni(this.context, this, r);
  }
  get parent() {
    return this._parent || this.context.parent.nextSignificantParent();
  }
  externalSibling(e) {
    return this._parent ? null : this.context.parent.nextChild(
      this.context.index + e,
      e,
      0,
      4
      /* Side.DontCare */
    );
  }
  get nextSibling() {
    let { buffer: e } = this.context, t = e.buffer[this.index + 3];
    return t < (this._parent ? e.buffer[this._parent.index + 3] : e.buffer.length) ? new Ni(this.context, this._parent, t) : this.externalSibling(1);
  }
  get prevSibling() {
    let { buffer: e } = this.context, t = this._parent ? this._parent.index + 4 : 0;
    return this.index == t ? this.externalSibling(-1) : new Ni(this.context, this._parent, e.findChild(
      t,
      this.index,
      -1,
      0,
      4
      /* Side.DontCare */
    ));
  }
  get tree() {
    return null;
  }
  toTree() {
    let e = [], t = [], { buffer: i } = this.context, s = this.index + 4, r = i.buffer[this.index + 3];
    if (r > s) {
      let o = i.buffer[this.index + 1];
      e.push(i.slice(s, r, o)), t.push(0);
    }
    return new at(this.type, e, t, this.to - this.from);
  }
  /**
  @internal
  */
  toString() {
    return this.context.buffer.childString(this.index);
  }
}
function Lp(n) {
  if (!n.length)
    return null;
  let e = 0, t = n[0];
  for (let r = 1; r < n.length; r++) {
    let o = n[r];
    (o.from > t.from || o.to < t.to) && (t = o, e = r);
  }
  let i = t instanceof Ut && t.index < 0 ? null : t.parent, s = n.slice();
  return i ? s[e] = i : s.splice(e, 1), new $1(s, t);
}
class $1 {
  constructor(e, t) {
    this.heads = e, this.node = t;
  }
  get next() {
    return Lp(this.heads);
  }
}
function P1(n, e, t) {
  let i = n.resolveInner(e, t), s = null;
  for (let r = i instanceof Ut ? i : i.context.parent; r; r = r.parent)
    if (r.index < 0) {
      let o = r.parent;
      (s || (s = [i])).push(o.resolve(e, t)), r = o;
    } else {
      let o = Xr.get(r.tree);
      if (o && o.overlay && o.overlay[0].from <= e && o.overlay[o.overlay.length - 1].to >= e) {
        let l = new Ut(o.tree, o.overlay[0].from + r.from, -1, r);
        (s || (s = [i])).push(qr(l, e, t, !1));
      }
    }
  return s ? Lp(s) : i;
}
class Sh {
  /**
  Shorthand for `.type.name`.
  */
  get name() {
    return this.type.name;
  }
  /**
  @internal
  */
  constructor(e, t = 0) {
    if (this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, this.mode = t & ~Je.EnterBracketed, e instanceof Ut)
      this.yieldNode(e);
    else {
      this._tree = e.context.parent, this.buffer = e.context;
      for (let i = e._parent; i; i = i._parent)
        this.stack.unshift(i.index);
      this.bufferNode = e, this.yieldBuf(e.index);
    }
  }
  yieldNode(e) {
    return e ? (this._tree = e, this.type = e.type, this.from = e.from, this.to = e.to, !0) : !1;
  }
  yieldBuf(e, t) {
    this.index = e;
    let { start: i, buffer: s } = this.buffer;
    return this.type = t || s.set.types[s.buffer[e]], this.from = i + s.buffer[e + 1], this.to = i + s.buffer[e + 2], !0;
  }
  /**
  @internal
  */
  yield(e) {
    return e ? e instanceof Ut ? (this.buffer = null, this.yieldNode(e)) : (this.buffer = e.context, this.yieldBuf(e.index, e.type)) : !1;
  }
  /**
  @internal
  */
  toString() {
    return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
  }
  /**
  @internal
  */
  enterChild(e, t, i) {
    if (!this.buffer)
      return this.yield(this._tree.nextChild(e < 0 ? this._tree._tree.children.length - 1 : 0, e, t, i, this.mode));
    let { buffer: s } = this.buffer, r = s.findChild(this.index + 4, s.buffer[this.index + 3], e, t - this.buffer.start, i);
    return r < 0 ? !1 : (this.stack.push(this.index), this.yieldBuf(r));
  }
  /**
  Move the cursor to this node's first child. When this returns
  false, the node has no child, and the cursor has not been moved.
  */
  firstChild() {
    return this.enterChild(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /**
  Move the cursor to this node's last child.
  */
  lastChild() {
    return this.enterChild(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /**
  Move the cursor to the first child that ends after `pos`.
  */
  childAfter(e) {
    return this.enterChild(
      1,
      e,
      2
      /* Side.After */
    );
  }
  /**
  Move to the last child that starts before `pos`.
  */
  childBefore(e) {
    return this.enterChild(
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  /**
  Move the cursor to the child around `pos`. If side is -1 the
  child may end at that position, when 1 it may start there. This
  will also enter [overlaid](#common.MountedTree.overlay)
  [mounted](#common.NodeProp^mounted) trees unless `overlays` is
  set to false.
  */
  enter(e, t, i = this.mode) {
    return this.buffer ? i & Je.ExcludeBuffers ? !1 : this.enterChild(1, e, t) : this.yield(this._tree.enter(e, t, i));
  }
  /**
  Move to the node's parent node, if this isn't the top node.
  */
  parent() {
    if (!this.buffer)
      return this.yieldNode(this.mode & Je.IncludeAnonymous ? this._tree._parent : this._tree.parent);
    if (this.stack.length)
      return this.yieldBuf(this.stack.pop());
    let e = this.mode & Je.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
    return this.buffer = null, this.yieldNode(e);
  }
  /**
  @internal
  */
  sibling(e) {
    if (!this.buffer)
      return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + e, e, 0, 4, this.mode)) : !1;
    let { buffer: t } = this.buffer, i = this.stack.length - 1;
    if (e < 0) {
      let s = i < 0 ? 0 : this.stack[i] + 4;
      if (this.index != s)
        return this.yieldBuf(t.findChild(
          s,
          this.index,
          -1,
          0,
          4
          /* Side.DontCare */
        ));
    } else {
      let s = t.buffer[this.index + 3];
      if (s < (i < 0 ? t.buffer.length : t.buffer[this.stack[i] + 3]))
        return this.yieldBuf(s);
    }
    return i < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + e, e, 0, 4, this.mode)) : !1;
  }
  /**
  Move to this node's next sibling, if any.
  */
  nextSibling() {
    return this.sibling(1);
  }
  /**
  Move to this node's previous sibling, if any.
  */
  prevSibling() {
    return this.sibling(-1);
  }
  atLastNode(e) {
    let t, i, { buffer: s } = this;
    if (s) {
      if (e > 0) {
        if (this.index < s.buffer.buffer.length)
          return !1;
      } else
        for (let r = 0; r < this.index; r++)
          if (s.buffer.buffer[r + 3] < this.index)
            return !1;
      ({ index: t, parent: i } = s);
    } else
      ({ index: t, _parent: i } = this._tree);
    for (; i; { index: t, _parent: i } = i)
      if (t > -1)
        for (let r = t + e, o = e < 0 ? -1 : i._tree.children.length; r != o; r += e) {
          let l = i._tree.children[r];
          if (this.mode & Je.IncludeAnonymous || l instanceof jn || !l.type.isAnonymous || Oc(l))
            return !1;
        }
    return !0;
  }
  move(e, t) {
    if (t && this.enterChild(
      e,
      0,
      4
      /* Side.DontCare */
    ))
      return !0;
    for (; ; ) {
      if (this.sibling(e))
        return !0;
      if (this.atLastNode(e) || !this.parent())
        return !1;
    }
  }
  /**
  Move to the next node in a
  [pre-order](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR)
  traversal, going from a node to its first child or, if the
  current node is empty or `enter` is false, its next sibling or
  the next sibling of the first parent node that has one.
  */
  next(e = !0) {
    return this.move(1, e);
  }
  /**
  Move to the next node in a last-to-first pre-order traversal. A
  node is followed by its last child or, if it has none, its
  previous sibling or the previous sibling of the first parent
  node that has one.
  */
  prev(e = !0) {
    return this.move(-1, e);
  }
  /**
  Move the cursor to the innermost node that covers `pos`. If
  `side` is -1, it will enter nodes that end at `pos`. If it is 1,
  it will enter nodes that start at `pos`.
  */
  moveTo(e, t = 0) {
    for (; (this.from == this.to || (t < 1 ? this.from >= e : this.from > e) || (t > -1 ? this.to <= e : this.to < e)) && this.parent(); )
      ;
    for (; this.enterChild(1, e, t); )
      ;
    return this;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) at the cursor's current
  position.
  */
  get node() {
    if (!this.buffer)
      return this._tree;
    let e = this.bufferNode, t = null, i = 0;
    if (e && e.context == this.buffer)
      e: for (let s = this.index, r = this.stack.length; r >= 0; ) {
        for (let o = e; o; o = o._parent)
          if (o.index == s) {
            if (s == this.index)
              return o;
            t = o, i = r + 1;
            break e;
          }
        s = this.stack[--r];
      }
    for (let s = i; s < this.stack.length; s++)
      t = new Ni(this.buffer, t, this.stack[s]);
    return this.bufferNode = new Ni(this.buffer, t, this.index);
  }
  /**
  Get the [tree](#common.Tree) that represents the current node, if
  any. Will return null when the node is in a [tree
  buffer](#common.TreeBuffer).
  */
  get tree() {
    return this.buffer ? null : this._tree._tree;
  }
  /**
  Iterate over the current node and all its descendants, calling
  `enter` when entering a node and `leave`, if given, when leaving
  one. When `enter` returns `false`, any children of that node are
  skipped, and `leave` isn't called for it.
  */
  iterate(e, t) {
    for (let i = 0; ; ) {
      let s = !1;
      if (this.type.isAnonymous || e(this) !== !1) {
        if (this.firstChild()) {
          i++;
          continue;
        }
        this.type.isAnonymous || (s = !0);
      }
      for (; ; ) {
        if (s && t && t(this), s = this.type.isAnonymous, !i)
          return;
        if (this.nextSibling())
          break;
        this.parent(), i--, s = !0;
      }
    }
  }
  /**
  Test whether the current node matches a given context—a sequence
  of direct parent node names. Empty strings in the context array
  are treated as wildcards.
  */
  matchContext(e) {
    if (!this.buffer)
      return xh(this.node.parent, e);
    let { buffer: t } = this.buffer, { types: i } = t.set;
    for (let s = e.length - 1, r = this.stack.length - 1; s >= 0; r--) {
      if (r < 0)
        return xh(this._tree, e, s);
      let o = i[t.buffer[this.stack[r]]];
      if (!o.isAnonymous) {
        if (e[s] && e[s] != o.name)
          return !1;
        s--;
      }
    }
    return !0;
  }
}
function Oc(n) {
  return n.children.some((e) => e instanceof jn || !e.type.isAnonymous || Oc(e));
}
function _1(n) {
  var e;
  let { buffer: t, nodeSet: i, maxBufferLength: s = Mp, reused: r = [], minRepeatType: o = i.types.length } = n, l = Array.isArray(t) ? new pc(t, t.length) : t, a = i.types, h = 0, c = 0;
  function f(C, R, X, H, D, j) {
    let { id: M, start: Q, end: T, size: E } = l, Z = c, P = h;
    if (E < 0)
      if (l.next(), E == -1) {
        let z = r[M];
        X.push(z), H.push(Q - C);
        return;
      } else if (E == -3) {
        h = M;
        return;
      } else if (E == -4) {
        c = M;
        return;
      } else
        throw new RangeError(`Unrecognized record size: ${E}`);
    let N = a[M], oe, q, G = Q - C;
    if (T - Q <= s && (q = m(l.pos - R, D))) {
      let z = new Uint16Array(q.size - q.skip), K = l.pos - q.size, le = z.length;
      for (; l.pos > K; )
        le = v(q.start, z, le);
      oe = new jn(z, T - q.start, i), G = q.start - C;
    } else {
      let z = l.pos - E;
      l.next();
      let K = [], le = [], ae = M >= o ? M : -1, ve = 0, fe = T;
      for (; l.pos > z; )
        ae >= 0 && l.id == ae && l.size >= 0 ? (l.end <= fe - s && (O(K, le, Q, ve, l.end, fe, ae, Z, P), ve = K.length, fe = l.end), l.next()) : j > 2500 ? d(Q, z, K, le) : f(Q, z, K, le, ae, j + 1);
      if (ae >= 0 && ve > 0 && ve < K.length && O(K, le, Q, ve, Q, fe, ae, Z, P), K.reverse(), le.reverse(), ae > -1 && ve > 0) {
        let ce = p(N, P);
        oe = gc(N, K, le, 0, K.length, 0, T - Q, ce, ce);
      } else
        oe = g(N, K, le, T - Q, Z - T, P);
    }
    X.push(oe), H.push(G);
  }
  function d(C, R, X, H) {
    let D = [], j = 0, M = -1;
    for (; l.pos > R; ) {
      let { id: Q, start: T, end: E, size: Z } = l;
      if (Z > 4)
        l.next();
      else {
        if (M > -1 && T < M)
          break;
        M < 0 && (M = E - s), D.push(Q, T, E), j++, l.next();
      }
    }
    if (j) {
      let Q = new Uint16Array(j * 4), T = D[D.length - 2];
      for (let E = D.length - 3, Z = 0; E >= 0; E -= 3)
        Q[Z++] = D[E], Q[Z++] = D[E + 1] - T, Q[Z++] = D[E + 2] - T, Q[Z++] = Z;
      X.push(new jn(Q, D[2] - T, i)), H.push(T - C);
    }
  }
  function p(C, R) {
    return (X, H, D) => {
      let j = 0, M = X.length - 1, Q, T;
      if (M >= 0 && (Q = X[M]) instanceof at) {
        if (!M && Q.type == C && Q.length == D)
          return Q;
        (T = Q.prop(Te.lookAhead)) && (j = H[M] + Q.length + T);
      }
      return g(C, X, H, D, j, R);
    };
  }
  function O(C, R, X, H, D, j, M, Q, T) {
    let E = [], Z = [];
    for (; C.length > H; )
      E.push(C.pop()), Z.push(R.pop() + X - D);
    C.push(g(i.types[M], E, Z, j - D, Q - j, T)), R.push(D - X);
  }
  function g(C, R, X, H, D, j, M) {
    if (j) {
      let Q = [Te.contextHash, j];
      M = M ? [Q].concat(M) : [Q];
    }
    if (D > 25) {
      let Q = [Te.lookAhead, D];
      M = M ? [Q].concat(M) : [Q];
    }
    return new at(C, R, X, H, M);
  }
  function m(C, R) {
    let X = l.fork(), H = 0, D = 0, j = 0, M = X.end - s, Q = { size: 0, start: 0, skip: 0 };
    e: for (let T = X.pos - C; X.pos > T; ) {
      let E = X.size;
      if (X.id == R && E >= 0) {
        Q.size = H, Q.start = D, Q.skip = j, j += 4, H += 4, X.next();
        continue;
      }
      let Z = X.pos - E;
      if (E < 0 || Z < T || X.start < M)
        break;
      let P = X.id >= o ? 4 : 0, N = X.start;
      for (X.next(); X.pos > Z; ) {
        if (X.size < 0)
          if (X.size == -3 || X.size == -4)
            P += 4;
          else
            break e;
        else X.id >= o && (P += 4);
        X.next();
      }
      D = N, H += E, j += P;
    }
    return (R < 0 || H == C) && (Q.size = H, Q.start = D, Q.skip = j), Q.size > 4 ? Q : void 0;
  }
  function v(C, R, X) {
    let { id: H, start: D, end: j, size: M } = l;
    if (l.next(), M >= 0 && H < o) {
      let Q = X;
      if (M > 4) {
        let T = l.pos - (M - 4);
        for (; l.pos > T; )
          X = v(C, R, X);
      }
      R[--X] = Q, R[--X] = j - C, R[--X] = D - C, R[--X] = H;
    } else M == -3 ? h = H : M == -4 && (c = H);
    return X;
  }
  let x = [], S = [];
  for (; l.pos > 0; )
    f(n.start || 0, n.bufferStart || 0, x, S, -1, 0);
  let _ = (e = n.length) !== null && e !== void 0 ? e : x.length ? S[0] + x[0].length : 0;
  return new at(a[n.topID], x.reverse(), S.reverse(), _);
}
const Yf = /* @__PURE__ */ new WeakMap();
function Bo(n, e) {
  if (!n.isAnonymous || e instanceof jn || e.type != n)
    return 1;
  let t = Yf.get(e);
  if (t == null) {
    t = 1;
    for (let i of e.children) {
      if (i.type != n || !(i instanceof at)) {
        t = 1;
        break;
      }
      t += Bo(n, i);
    }
    Yf.set(e, t);
  }
  return t;
}
function gc(n, e, t, i, s, r, o, l, a) {
  let h = 0;
  for (let O = i; O < s; O++)
    h += Bo(n, e[O]);
  let c = Math.ceil(
    h * 1.5 / 8
    /* Balance.BranchFactor */
  ), f = [], d = [];
  function p(O, g, m, v, x) {
    for (let S = m; S < v; ) {
      let _ = S, C = g[S], R = Bo(n, O[S]);
      for (S++; S < v; S++) {
        let X = Bo(n, O[S]);
        if (R + X >= c)
          break;
        R += X;
      }
      if (S == _ + 1) {
        if (R > c) {
          let X = O[_];
          p(X.children, X.positions, 0, X.children.length, g[_] + x);
          continue;
        }
        f.push(O[_]);
      } else {
        let X = g[S - 1] + O[S - 1].length - C;
        f.push(gc(n, O, g, _, S, C, X, null, a));
      }
      d.push(C + x - r);
    }
  }
  return p(e, t, i, s, 0), (l || a)(f, d, o);
}
class T1 {
  constructor() {
    this.map = /* @__PURE__ */ new WeakMap();
  }
  setBuffer(e, t, i) {
    let s = this.map.get(e);
    s || this.map.set(e, s = /* @__PURE__ */ new Map()), s.set(t, i);
  }
  getBuffer(e, t) {
    let i = this.map.get(e);
    return i && i.get(t);
  }
  /**
  Set the value for this syntax node.
  */
  set(e, t) {
    e instanceof Ni ? this.setBuffer(e.context.buffer, e.index, t) : e instanceof Ut && this.map.set(e.tree, t);
  }
  /**
  Retrieve value for this syntax node, if it exists in the map.
  */
  get(e) {
    return e instanceof Ni ? this.getBuffer(e.context.buffer, e.index) : e instanceof Ut ? this.map.get(e.tree) : void 0;
  }
  /**
  Set the value for the node that a cursor currently points to.
  */
  cursorSet(e, t) {
    e.buffer ? this.setBuffer(e.buffer.buffer, e.index, t) : this.map.set(e.tree, t);
  }
  /**
  Retrieve the value for the node that a cursor currently points
  to.
  */
  cursorGet(e) {
    return e.buffer ? this.getBuffer(e.buffer.buffer, e.index) : this.map.get(e.tree);
  }
}
class ss {
  /**
  Construct a tree fragment. You'll usually want to use
  [`addTree`](#common.TreeFragment^addTree) and
  [`applyChanges`](#common.TreeFragment^applyChanges) instead of
  calling this directly.
  */
  constructor(e, t, i, s, r = !1, o = !1) {
    this.from = e, this.to = t, this.tree = i, this.offset = s, this.open = (r ? 1 : 0) | (o ? 2 : 0);
  }
  /**
  Whether the start of the fragment represents the start of a
  parse, or the end of a change. (In the second case, it may not
  be safe to reuse some nodes at the start, depending on the
  parsing algorithm.)
  */
  get openStart() {
    return (this.open & 1) > 0;
  }
  /**
  Whether the end of the fragment represents the end of a
  full-document parse, or the start of a change.
  */
  get openEnd() {
    return (this.open & 2) > 0;
  }
  /**
  Create a set of fragments from a freshly parsed tree, or update
  an existing set of fragments by replacing the ones that overlap
  with a tree with content from the new tree. When `partial` is
  true, the parse is treated as incomplete, and the resulting
  fragment has [`openEnd`](#common.TreeFragment.openEnd) set to
  true.
  */
  static addTree(e, t = [], i = !1) {
    let s = [new ss(0, e.length, e, 0, !1, i)];
    for (let r of t)
      r.to > e.length && s.push(r);
    return s;
  }
  /**
  Apply a set of edits to an array of fragments, removing or
  splitting fragments as necessary to remove edited ranges, and
  adjusting offsets for fragments that moved.
  */
  static applyChanges(e, t, i = 128) {
    if (!t.length)
      return e;
    let s = [], r = 1, o = e.length ? e[0] : null;
    for (let l = 0, a = 0, h = 0; ; l++) {
      let c = l < t.length ? t[l] : null, f = c ? c.fromA : 1e9;
      if (f - a >= i)
        for (; o && o.from < f; ) {
          let d = o;
          if (a >= d.from || f <= d.to || h) {
            let p = Math.max(d.from, a) - h, O = Math.min(d.to, f) - h;
            d = p >= O ? null : new ss(p, O, d.tree, d.offset + h, l > 0, !!c);
          }
          if (d && s.push(d), o.to > f)
            break;
          o = r < e.length ? e[r++] : null;
        }
      if (!c)
        break;
      a = c.toA, h = c.toA - c.toB;
    }
    return s;
  }
}
class jp {
  /**
  Start a parse, returning a [partial parse](#common.PartialParse)
  object. [`fragments`](#common.TreeFragment) can be passed in to
  make the parse incremental.
  
  By default, the entire input is parsed. You can pass `ranges`,
  which should be a sorted array of non-empty, non-overlapping
  ranges, to parse only those ranges. The tree returned in that
  case will start at `ranges[0].from`.
  */
  startParse(e, t, i) {
    return typeof e == "string" && (e = new Z1(e)), i = i ? i.length ? i.map((s) => new ua(s.from, s.to)) : [new ua(0, 0)] : [new ua(0, e.length)], this.createParse(e, t || [], i);
  }
  /**
  Run a full parse, returning the resulting tree.
  */
  parse(e, t, i) {
    let s = this.startParse(e, t, i);
    for (; ; ) {
      let r = s.advance();
      if (r)
        return r;
    }
  }
}
class Z1 {
  constructor(e) {
    this.string = e;
  }
  get length() {
    return this.string.length;
  }
  chunk(e) {
    return this.string.slice(e);
  }
  get lineChunks() {
    return !1;
  }
  read(e, t) {
    return this.string.slice(e, t);
  }
}
new Te({ perNode: !0 });
let C1 = 0;
class ui {
  /**
  @internal
  */
  constructor(e, t, i, s) {
    this.name = e, this.set = t, this.base = i, this.modified = s, this.id = C1++;
  }
  toString() {
    let { name: e } = this;
    for (let t of this.modified)
      t.name && (e = `${t.name}(${e})`);
    return e;
  }
  static define(e, t) {
    let i = typeof e == "string" ? e : "?";
    if (e instanceof ui && (t = e), t != null && t.base)
      throw new Error("Can not derive from a modified tag");
    let s = new ui(i, [], null, []);
    if (s.set.push(s), t)
      for (let r of t.set)
        s.set.push(r);
    return s;
  }
  /**
  Define a tag _modifier_, which is a function that, given a tag,
  will return a tag that is a subtag of the original. Applying the
  same modifier to a twice tag will return the same value (`m1(t1)
  == m1(t1)`) and applying multiple modifiers will, regardless or
  order, produce the same tag (`m1(m2(t1)) == m2(m1(t1))`).
  
  When multiple modifiers are applied to a given base tag, each
  smaller set of modifiers is registered as a parent, so that for
  example `m1(m2(m3(t1)))` is a subtype of `m1(m2(t1))`,
  `m1(m3(t1)`, and so on.
  */
  static defineModifier(e) {
    let t = new al(e);
    return (i) => i.modified.indexOf(t) > -1 ? i : al.get(i.base || i, i.modified.concat(t).sort((s, r) => s.id - r.id));
  }
}
let A1 = 0;
class al {
  constructor(e) {
    this.name = e, this.instances = [], this.id = A1++;
  }
  static get(e, t) {
    if (!t.length)
      return e;
    let i = t[0].instances.find((l) => l.base == e && R1(t, l.modified));
    if (i)
      return i;
    let s = [], r = new ui(e.name, s, e, t);
    for (let l of t)
      l.instances.push(r);
    let o = M1(t);
    for (let l of e.set)
      if (!l.modified.length)
        for (let a of o)
          s.push(al.get(l, a));
    return r;
  }
}
function R1(n, e) {
  return n.length == e.length && n.every((t, i) => t == e[i]);
}
function M1(n) {
  let e = [[]];
  for (let t = 0; t < n.length; t++)
    for (let i = 0, s = e.length; i < s; i++)
      e.push(e[i].concat(n[t]));
  return e.sort((t, i) => i.length - t.length);
}
function zp(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let i = n[t];
    Array.isArray(i) || (i = [i]);
    for (let s of t.split(" "))
      if (s) {
        let r = [], o = 2, l = s;
        for (let f = 0; ; ) {
          if (l == "..." && f > 0 && f + 3 == s.length) {
            o = 1;
            break;
          }
          let d = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(l);
          if (!d)
            throw new RangeError("Invalid path: " + s);
          if (r.push(d[0] == "*" ? "" : d[0][0] == '"' ? JSON.parse(d[0]) : d[0]), f += d[0].length, f == s.length)
            break;
          let p = s[f++];
          if (f == s.length && p == "!") {
            o = 0;
            break;
          }
          if (p != "/")
            throw new RangeError("Invalid path: " + s);
          l = s.slice(f);
        }
        let a = r.length - 1, h = r[a];
        if (!h)
          throw new RangeError("Invalid path: " + s);
        let c = new hl(i, o, a > 0 ? r.slice(0, a) : null);
        e[h] = c.sort(e[h]);
      }
  }
  return X1.add(e);
}
const X1 = new Te({
  combine(n, e) {
    let t, i, s;
    for (; n || e; ) {
      if (!n || e && n.depth >= e.depth ? (s = e, e = e.next) : (s = n, n = n.next), t && t.mode == s.mode && !s.context && !t.context)
        continue;
      let r = new hl(s.tags, s.mode, s.context);
      t ? t.next = r : i = r, t = r;
    }
    return i;
  }
});
class hl {
  constructor(e, t, i, s) {
    this.tags = e, this.mode = t, this.context = i, this.next = s;
  }
  get opaque() {
    return this.mode == 0;
  }
  get inherit() {
    return this.mode == 1;
  }
  sort(e) {
    return !e || e.depth < this.depth ? (this.next = e, this) : (e.next = this.sort(e.next), e);
  }
  get depth() {
    return this.context ? this.context.length : 0;
  }
}
hl.empty = new hl([], 2, null);
function E1(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r of n)
    if (!Array.isArray(r.tag))
      t[r.tag.id] = r.class;
    else
      for (let o of r.tag)
        t[o.id] = r.class;
  let { scope: i, all: s = null } = {};
  return {
    style: (r) => {
      let o = s;
      for (let l of r)
        for (let a of l.set) {
          let h = t[a.id];
          if (h) {
            o = o ? o + " " + h : h;
            break;
          }
        }
      return o;
    },
    scope: i
  };
}
const te = ui.define, To = te(), xn = te(), qf = te(xn), Bf = te(xn), Sn = te(), Zo = te(Sn), da = te(Sn), zi = te(), Dn = te(zi), Li = te(), ji = te(), Qh = te(), ur = te(Qh), Co = te(), W = {
  /**
  A comment.
  */
  comment: To,
  /**
  A line [comment](#highlight.tags.comment).
  */
  lineComment: te(To),
  /**
  A block [comment](#highlight.tags.comment).
  */
  blockComment: te(To),
  /**
  A documentation [comment](#highlight.tags.comment).
  */
  docComment: te(To),
  /**
  Any kind of identifier.
  */
  name: xn,
  /**
  The [name](#highlight.tags.name) of a variable.
  */
  variableName: te(xn),
  /**
  A type [name](#highlight.tags.name).
  */
  typeName: qf,
  /**
  A tag name (subtag of [`typeName`](#highlight.tags.typeName)).
  */
  tagName: te(qf),
  /**
  A property or field [name](#highlight.tags.name).
  */
  propertyName: Bf,
  /**
  An attribute name (subtag of [`propertyName`](#highlight.tags.propertyName)).
  */
  attributeName: te(Bf),
  /**
  The [name](#highlight.tags.name) of a class.
  */
  className: te(xn),
  /**
  A label [name](#highlight.tags.name).
  */
  labelName: te(xn),
  /**
  A namespace [name](#highlight.tags.name).
  */
  namespace: te(xn),
  /**
  The [name](#highlight.tags.name) of a macro.
  */
  macroName: te(xn),
  /**
  A literal value.
  */
  literal: Sn,
  /**
  A string [literal](#highlight.tags.literal).
  */
  string: Zo,
  /**
  A documentation [string](#highlight.tags.string).
  */
  docString: te(Zo),
  /**
  A character literal (subtag of [string](#highlight.tags.string)).
  */
  character: te(Zo),
  /**
  An attribute value (subtag of [string](#highlight.tags.string)).
  */
  attributeValue: te(Zo),
  /**
  A number [literal](#highlight.tags.literal).
  */
  number: da,
  /**
  An integer [number](#highlight.tags.number) literal.
  */
  integer: te(da),
  /**
  A floating-point [number](#highlight.tags.number) literal.
  */
  float: te(da),
  /**
  A boolean [literal](#highlight.tags.literal).
  */
  bool: te(Sn),
  /**
  Regular expression [literal](#highlight.tags.literal).
  */
  regexp: te(Sn),
  /**
  An escape [literal](#highlight.tags.literal), for example a
  backslash escape in a string.
  */
  escape: te(Sn),
  /**
  A color [literal](#highlight.tags.literal).
  */
  color: te(Sn),
  /**
  A URL [literal](#highlight.tags.literal).
  */
  url: te(Sn),
  /**
  A language keyword.
  */
  keyword: Li,
  /**
  The [keyword](#highlight.tags.keyword) for the self or this
  object.
  */
  self: te(Li),
  /**
  The [keyword](#highlight.tags.keyword) for null.
  */
  null: te(Li),
  /**
  A [keyword](#highlight.tags.keyword) denoting some atomic value.
  */
  atom: te(Li),
  /**
  A [keyword](#highlight.tags.keyword) that represents a unit.
  */
  unit: te(Li),
  /**
  A modifier [keyword](#highlight.tags.keyword).
  */
  modifier: te(Li),
  /**
  A [keyword](#highlight.tags.keyword) that acts as an operator.
  */
  operatorKeyword: te(Li),
  /**
  A control-flow related [keyword](#highlight.tags.keyword).
  */
  controlKeyword: te(Li),
  /**
  A [keyword](#highlight.tags.keyword) that defines something.
  */
  definitionKeyword: te(Li),
  /**
  A [keyword](#highlight.tags.keyword) related to defining or
  interfacing with modules.
  */
  moduleKeyword: te(Li),
  /**
  An operator.
  */
  operator: ji,
  /**
  An [operator](#highlight.tags.operator) that dereferences something.
  */
  derefOperator: te(ji),
  /**
  Arithmetic-related [operator](#highlight.tags.operator).
  */
  arithmeticOperator: te(ji),
  /**
  Logical [operator](#highlight.tags.operator).
  */
  logicOperator: te(ji),
  /**
  Bit [operator](#highlight.tags.operator).
  */
  bitwiseOperator: te(ji),
  /**
  Comparison [operator](#highlight.tags.operator).
  */
  compareOperator: te(ji),
  /**
  [Operator](#highlight.tags.operator) that updates its operand.
  */
  updateOperator: te(ji),
  /**
  [Operator](#highlight.tags.operator) that defines something.
  */
  definitionOperator: te(ji),
  /**
  Type-related [operator](#highlight.tags.operator).
  */
  typeOperator: te(ji),
  /**
  Control-flow [operator](#highlight.tags.operator).
  */
  controlOperator: te(ji),
  /**
  Program or markup punctuation.
  */
  punctuation: Qh,
  /**
  [Punctuation](#highlight.tags.punctuation) that separates
  things.
  */
  separator: te(Qh),
  /**
  Bracket-style [punctuation](#highlight.tags.punctuation).
  */
  bracket: ur,
  /**
  Angle [brackets](#highlight.tags.bracket) (usually `<` and `>`
  tokens).
  */
  angleBracket: te(ur),
  /**
  Square [brackets](#highlight.tags.bracket) (usually `[` and `]`
  tokens).
  */
  squareBracket: te(ur),
  /**
  Parentheses (usually `(` and `)` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  paren: te(ur),
  /**
  Braces (usually `{` and `}` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  brace: te(ur),
  /**
  Content, for example plain text in XML or markup documents.
  */
  content: zi,
  /**
  [Content](#highlight.tags.content) that represents a heading.
  */
  heading: Dn,
  /**
  A level 1 [heading](#highlight.tags.heading).
  */
  heading1: te(Dn),
  /**
  A level 2 [heading](#highlight.tags.heading).
  */
  heading2: te(Dn),
  /**
  A level 3 [heading](#highlight.tags.heading).
  */
  heading3: te(Dn),
  /**
  A level 4 [heading](#highlight.tags.heading).
  */
  heading4: te(Dn),
  /**
  A level 5 [heading](#highlight.tags.heading).
  */
  heading5: te(Dn),
  /**
  A level 6 [heading](#highlight.tags.heading).
  */
  heading6: te(Dn),
  /**
  A prose [content](#highlight.tags.content) separator (such as a horizontal rule).
  */
  contentSeparator: te(zi),
  /**
  [Content](#highlight.tags.content) that represents a list.
  */
  list: te(zi),
  /**
  [Content](#highlight.tags.content) that represents a quote.
  */
  quote: te(zi),
  /**
  [Content](#highlight.tags.content) that is emphasized.
  */
  emphasis: te(zi),
  /**
  [Content](#highlight.tags.content) that is styled strong.
  */
  strong: te(zi),
  /**
  [Content](#highlight.tags.content) that is part of a link.
  */
  link: te(zi),
  /**
  [Content](#highlight.tags.content) that is styled as code or
  monospace.
  */
  monospace: te(zi),
  /**
  [Content](#highlight.tags.content) that has a strike-through
  style.
  */
  strikethrough: te(zi),
  /**
  Inserted text in a change-tracking format.
  */
  inserted: te(),
  /**
  Deleted text.
  */
  deleted: te(),
  /**
  Changed text.
  */
  changed: te(),
  /**
  An invalid or unsyntactic element.
  */
  invalid: te(),
  /**
  Metadata or meta-instruction.
  */
  meta: Co,
  /**
  [Metadata](#highlight.tags.meta) that applies to the entire
  document.
  */
  documentMeta: te(Co),
  /**
  [Metadata](#highlight.tags.meta) that annotates or adds
  attributes to a given syntactic element.
  */
  annotation: te(Co),
  /**
  Processing instruction or preprocessor directive. Subtag of
  [meta](#highlight.tags.meta).
  */
  processingInstruction: te(Co),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that a
  given element is being defined. Expected to be used with the
  various [name](#highlight.tags.name) tags.
  */
  definition: ui.defineModifier("definition"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that
  something is constant. Mostly expected to be used with
  [variable names](#highlight.tags.variableName).
  */
  constant: ui.defineModifier("constant"),
  /**
  [Modifier](#highlight.Tag^defineModifier) used to indicate that
  a [variable](#highlight.tags.variableName) or [property
  name](#highlight.tags.propertyName) is being called or defined
  as a function.
  */
  function: ui.defineModifier("function"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that can be applied to
  [names](#highlight.tags.name) to indicate that they belong to
  the language's standard environment.
  */
  standard: ui.defineModifier("standard"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates a given
  [names](#highlight.tags.name) is local to some scope.
  */
  local: ui.defineModifier("local"),
  /**
  A generic variant [modifier](#highlight.Tag^defineModifier) that
  can be used to tag language-specific alternative variants of
  some common tag. It is recommended for themes to define special
  forms of at least the [string](#highlight.tags.string) and
  [variable name](#highlight.tags.variableName) tags, since those
  come up a lot.
  */
  special: ui.defineModifier("special")
};
for (let n in W) {
  let e = W[n];
  e instanceof ui && (e.name = n);
}
E1([
  { tag: W.link, class: "tok-link" },
  { tag: W.heading, class: "tok-heading" },
  { tag: W.emphasis, class: "tok-emphasis" },
  { tag: W.strong, class: "tok-strong" },
  { tag: W.keyword, class: "tok-keyword" },
  { tag: W.atom, class: "tok-atom" },
  { tag: W.bool, class: "tok-bool" },
  { tag: W.url, class: "tok-url" },
  { tag: W.labelName, class: "tok-labelName" },
  { tag: W.inserted, class: "tok-inserted" },
  { tag: W.deleted, class: "tok-deleted" },
  { tag: W.literal, class: "tok-literal" },
  { tag: W.string, class: "tok-string" },
  { tag: W.number, class: "tok-number" },
  { tag: [W.regexp, W.escape, W.special(W.string)], class: "tok-string2" },
  { tag: W.variableName, class: "tok-variableName" },
  { tag: W.local(W.variableName), class: "tok-variableName tok-local" },
  { tag: W.definition(W.variableName), class: "tok-variableName tok-definition" },
  { tag: W.special(W.variableName), class: "tok-variableName2" },
  { tag: W.definition(W.propertyName), class: "tok-propertyName tok-definition" },
  { tag: W.typeName, class: "tok-typeName" },
  { tag: W.namespace, class: "tok-namespace" },
  { tag: W.className, class: "tok-className" },
  { tag: W.macroName, class: "tok-macroName" },
  { tag: W.propertyName, class: "tok-propertyName" },
  { tag: W.operator, class: "tok-operator" },
  { tag: W.comment, class: "tok-comment" },
  { tag: W.meta, class: "tok-meta" },
  { tag: W.invalid, class: "tok-invalid" },
  { tag: W.punctuation, class: "tok-punctuation" }
]);
var pa;
const xr = /* @__PURE__ */ new Te();
function Dp(n) {
  return me.define({
    combine: n ? (e) => e.concat(n) : void 0
  });
}
const mc = /* @__PURE__ */ new Te();
class Gi {
  /**
  Construct a language object. If you need to invoke this
  directly, first define a data facet with
  [`defineLanguageFacet`](https://codemirror.net/6/docs/ref/#language.defineLanguageFacet), and then
  configure your parser to [attach](https://codemirror.net/6/docs/ref/#language.languageDataProp) it
  to the language's outer syntax node.
  */
  constructor(e, t, i = [], s = "") {
    this.data = e, this.name = s, Xe.prototype.hasOwnProperty("tree") || Object.defineProperty(Xe.prototype, "tree", { get() {
      return Si(this);
    } }), this.parser = t, this.extension = [
      ir.of(this),
      Xe.languageData.of((r, o, l) => {
        let a = Vf(r, o, l), h = a.type.prop(xr);
        if (!h)
          return [];
        let c = r.facet(h), f = a.type.prop(mc);
        if (f) {
          let d = a.resolve(o - a.from, l);
          for (let p of f)
            if (p.test(d, r)) {
              let O = r.facet(p.facet);
              return p.type == "replace" ? O : O.concat(c);
            }
        }
        return c;
      })
    ].concat(i);
  }
  /**
  Query whether this language is active at the given position.
  */
  isActiveAt(e, t, i = -1) {
    return Vf(e, t, i).type.prop(xr) == this.data;
  }
  /**
  Find the document regions that were parsed using this language.
  The returned regions will _include_ any nested languages rooted
  in this language, when those exist.
  */
  findRegions(e) {
    let t = e.facet(ir);
    if ((t == null ? void 0 : t.data) == this.data)
      return [{ from: 0, to: e.doc.length }];
    if (!t || !t.allowsNesting)
      return [];
    let i = [], s = (r, o) => {
      if (r.prop(xr) == this.data) {
        i.push({ from: o, to: o + r.length });
        return;
      }
      let l = r.prop(Te.mounted);
      if (l) {
        if (l.tree.prop(xr) == this.data) {
          if (l.overlay)
            for (let a of l.overlay)
              i.push({ from: a.from + o, to: a.to + o });
          else
            i.push({ from: o, to: o + r.length });
          return;
        } else if (l.overlay) {
          let a = i.length;
          if (s(l.tree, l.overlay[0].from + o), i.length > a)
            return;
        }
      }
      for (let a = 0; a < r.children.length; a++) {
        let h = r.children[a];
        h instanceof at && s(h, r.positions[a] + o);
      }
    };
    return s(Si(e), 0), i;
  }
  /**
  Indicates whether this language allows nested languages. The
  default implementation returns true.
  */
  get allowsNesting() {
    return !0;
  }
}
Gi.setState = /* @__PURE__ */ ze.define();
function Vf(n, e, t) {
  let i = n.facet(ir), s = Si(n).topNode;
  if (!i || i.allowsNesting)
    for (let r = s; r; r = r.enter(e, t, Je.ExcludeBuffers | Je.EnterBracketed))
      r.type.isTop && (s = r);
  return s;
}
class cl extends Gi {
  constructor(e, t, i) {
    super(e, t, [], i), this.parser = t;
  }
  /**
  Define a language from a parser.
  */
  static define(e) {
    let t = Dp(e.languageData);
    return new cl(t, e.parser.configure({
      props: [xr.add((i) => i.isTop ? t : void 0)]
    }), e.name);
  }
  /**
  Create a new instance of this language with a reconfigured
  version of its parser and optionally a new name.
  */
  configure(e, t) {
    return new cl(this.data, this.parser.configure(e), t || this.name);
  }
  get allowsNesting() {
    return this.parser.hasWrappers();
  }
}
function Si(n) {
  let e = n.field(Gi.state, !1);
  return e ? e.tree : at.empty;
}
class L1 {
  /**
  Create an input object for the given document.
  */
  constructor(e) {
    this.doc = e, this.cursorPos = 0, this.string = "", this.cursor = e.iter();
  }
  get length() {
    return this.doc.length;
  }
  syncTo(e) {
    return this.string = this.cursor.next(e - this.cursorPos).value, this.cursorPos = e + this.string.length, this.cursorPos - this.string.length;
  }
  chunk(e) {
    return this.syncTo(e), this.string;
  }
  get lineChunks() {
    return !0;
  }
  read(e, t) {
    let i = this.cursorPos - this.string.length;
    return e < i || t >= this.cursorPos ? this.doc.sliceString(e, t) : this.string.slice(e - i, t - i);
  }
}
let dr = null;
class fl {
  constructor(e, t, i = [], s, r, o, l, a) {
    this.parser = e, this.state = t, this.fragments = i, this.tree = s, this.treeLen = r, this.viewport = o, this.skipped = l, this.scheduleOn = a, this.parse = null, this.tempSkipped = [];
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new fl(e, t, [], at.empty, 0, i, [], null);
  }
  startParse() {
    return this.parser.startParse(new L1(this.state.doc), this.fragments);
  }
  /**
  @internal
  */
  work(e, t) {
    return t != null && t >= this.state.doc.length && (t = void 0), this.tree != at.empty && this.isDone(t ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
      var i;
      if (typeof e == "number") {
        let s = Date.now() + e;
        e = () => Date.now() > s;
      }
      for (this.parse || (this.parse = this.startParse()), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t); ; ) {
        let s = this.parse.advance();
        if (s)
          if (this.fragments = this.withoutTempSkipped(ss.addTree(s, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (i = this.parse.stoppedAt) !== null && i !== void 0 ? i : this.state.doc.length, this.tree = s, this.parse = null, this.treeLen < (t ?? this.state.doc.length))
            this.parse = this.startParse();
          else
            return !0;
        if (e())
          return !1;
      }
    });
  }
  /**
  @internal
  */
  takeTree() {
    let e, t;
    this.parse && (e = this.parse.parsedPos) >= this.treeLen && ((this.parse.stoppedAt == null || this.parse.stoppedAt > e) && this.parse.stopAt(e), this.withContext(() => {
      for (; !(t = this.parse.advance()); )
        ;
    }), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(ss.addTree(this.tree, this.fragments, !0)), this.parse = null);
  }
  withContext(e) {
    let t = dr;
    dr = this;
    try {
      return e();
    } finally {
      dr = t;
    }
  }
  withoutTempSkipped(e) {
    for (let t; t = this.tempSkipped.pop(); )
      e = Nf(e, t.from, t.to);
    return e;
  }
  /**
  @internal
  */
  changes(e, t) {
    let { fragments: i, tree: s, treeLen: r, viewport: o, skipped: l } = this;
    if (this.takeTree(), !e.empty) {
      let a = [];
      if (e.iterChangedRanges((h, c, f, d) => a.push({ fromA: h, toA: c, fromB: f, toB: d })), i = ss.applyChanges(i, a), s = at.empty, r = 0, o = { from: e.mapPos(o.from, -1), to: e.mapPos(o.to, 1) }, this.skipped.length) {
        l = [];
        for (let h of this.skipped) {
          let c = e.mapPos(h.from, 1), f = e.mapPos(h.to, -1);
          c < f && l.push({ from: c, to: f });
        }
      }
    }
    return new fl(this.parser, t, i, s, r, o, l, this.scheduleOn);
  }
  /**
  @internal
  */
  updateViewport(e) {
    if (this.viewport.from == e.from && this.viewport.to == e.to)
      return !1;
    this.viewport = e;
    let t = this.skipped.length;
    for (let i = 0; i < this.skipped.length; i++) {
      let { from: s, to: r } = this.skipped[i];
      s < e.to && r > e.from && (this.fragments = Nf(this.fragments, s, r), this.skipped.splice(i--, 1));
    }
    return this.skipped.length >= t ? !1 : (this.reset(), !0);
  }
  /**
  @internal
  */
  reset() {
    this.parse && (this.takeTree(), this.parse = null);
  }
  /**
  Notify the parse scheduler that the given region was skipped
  because it wasn't in view, and the parse should be restarted
  when it comes into view.
  */
  skipUntilInView(e, t) {
    this.skipped.push({ from: e, to: t });
  }
  /**
  Returns a parser intended to be used as placeholder when
  asynchronously loading a nested parser. It'll skip its input and
  mark it as not-really-parsed, so that the next update will parse
  it again.
  
  When `until` is given, a reparse will be scheduled when that
  promise resolves.
  */
  static getSkippingParser(e) {
    return new class extends jp {
      createParse(t, i, s) {
        let r = s[0].from, o = s[s.length - 1].to;
        return {
          parsedPos: r,
          advance() {
            let a = dr;
            if (a) {
              for (let h of s)
                a.tempSkipped.push(h);
              e && (a.scheduleOn = a.scheduleOn ? Promise.all([a.scheduleOn, e]) : e);
            }
            return this.parsedPos = o, new at(Ft.none, [], [], o - r);
          },
          stoppedAt: null,
          stopAt() {
          }
        };
      }
    }();
  }
  /**
  @internal
  */
  isDone(e) {
    e = Math.min(e, this.state.doc.length);
    let t = this.fragments;
    return this.treeLen >= e && t.length && t[0].from == 0 && t[0].to >= e;
  }
  /**
  Get the context for the current parse, or `null` if no editor
  parse is in progress.
  */
  static get() {
    return dr;
  }
}
function Nf(n, e, t) {
  return ss.applyChanges(n, [{ fromA: e, toA: t, fromB: e, toB: t }]);
}
class tr {
  constructor(e) {
    this.context = e, this.tree = e.tree;
  }
  apply(e) {
    if (!e.docChanged && this.tree == this.context.tree)
      return this;
    let t = this.context.changes(e.changes, e.state), i = this.context.treeLen == e.startState.doc.length ? void 0 : Math.max(e.changes.mapPos(this.context.treeLen), t.viewport.to);
    return t.work(20, i) || t.takeTree(), new tr(t);
  }
  static init(e) {
    let t = Math.min(3e3, e.doc.length), i = fl.create(e.facet(ir).parser, e, { from: 0, to: t });
    return i.work(20, t) || i.takeTree(), new tr(i);
  }
}
Gi.state = /* @__PURE__ */ tn.define({
  create: tr.init,
  update(n, e) {
    for (let t of e.effects)
      if (t.is(Gi.setState))
        return t.value;
    return e.startState.facet(ir) != e.state.facet(ir) ? tr.init(e.state) : n.apply(e);
  }
});
let Ip = (n) => {
  let e = setTimeout(
    () => n(),
    500
    /* Work.MaxPause */
  );
  return () => clearTimeout(e);
};
typeof requestIdleCallback < "u" && (Ip = (n) => {
  let e = -1, t = setTimeout(
    () => {
      e = requestIdleCallback(n, {
        timeout: 400
        /* Work.MinPause */
      });
    },
    100
    /* Work.MinPause */
  );
  return () => e < 0 ? clearTimeout(t) : cancelIdleCallback(e);
});
const Oa = typeof navigator < "u" && (!((pa = navigator.scheduling) === null || pa === void 0) && pa.isInputPending) ? () => navigator.scheduling.isInputPending() : null, j1 = /* @__PURE__ */ Ki.fromClass(class {
  constructor(e) {
    this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
  }
  update(e) {
    let t = this.view.state.field(Gi.state).context;
    (t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), (e.docChanged || e.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t);
  }
  scheduleWork() {
    if (this.working)
      return;
    let { state: e } = this.view, t = e.field(Gi.state);
    (t.tree != t.context.tree || !t.context.isDone(e.doc.length)) && (this.working = Ip(this.work));
  }
  work(e) {
    this.working = null;
    let t = Date.now();
    if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0)
      return;
    let { state: i, viewport: { to: s } } = this.view, r = i.field(Gi.state);
    if (r.tree == r.context.tree && r.context.isDone(
      s + 1e5
      /* Work.MaxParseAhead */
    ))
      return;
    let o = Date.now() + Math.min(this.chunkBudget, 100, e && !Oa ? Math.max(25, e.timeRemaining() - 5) : 1e9), l = r.context.treeLen < s && i.doc.length > s + 1e3, a = r.context.work(() => Oa && Oa() || Date.now() > o, s + (l ? 0 : 1e5));
    this.chunkBudget -= Date.now() - t, (a || this.chunkBudget <= 0) && (r.context.takeTree(), this.view.dispatch({ effects: Gi.setState.of(new tr(r.context)) })), this.chunkBudget > 0 && !(a && !l) && this.scheduleWork(), this.checkAsyncSchedule(r.context);
  }
  checkAsyncSchedule(e) {
    e.scheduleOn && (this.workScheduled++, e.scheduleOn.then(() => this.scheduleWork()).catch((t) => ni(this.view.state, t)).then(() => this.workScheduled--), e.scheduleOn = null);
  }
  destroy() {
    this.working && this.working();
  }
  isWorking() {
    return !!(this.working || this.workScheduled > 0);
  }
}, {
  eventHandlers: { focus() {
    this.scheduleWork();
  } }
}), ir = /* @__PURE__ */ me.define({
  combine(n) {
    return n.length ? n[0] : null;
  },
  enables: (n) => [
    Gi.state,
    j1,
    ge.contentAttributes.compute([n], (e) => {
      let t = e.facet(n);
      return t && t.name ? { "data-language": t.name } : {};
    })
  ]
});
class z1 {
  /**
  Create a language support object.
  */
  constructor(e, t = []) {
    this.language = e, this.support = t, this.extension = [e, t];
  }
}
const D1 = /* @__PURE__ */ me.define(), Ll = /* @__PURE__ */ me.define({
  combine: (n) => {
    if (!n.length)
      return "  ";
    let e = n[0];
    if (!e || /\S/.test(e) || Array.from(e).some((t) => t != e[0]))
      throw new Error("Invalid indent unit: " + JSON.stringify(n[0]));
    return e;
  }
});
function ul(n) {
  let e = n.facet(Ll);
  return e.charCodeAt(0) == 9 ? n.tabSize * e.length : e.length;
}
function dl(n, e) {
  let t = "", i = n.tabSize, s = n.facet(Ll)[0];
  if (s == "	") {
    for (; e >= i; )
      t += "	", e -= i;
    s = " ";
  }
  for (let r = 0; r < e; r++)
    t += s;
  return t;
}
function Wp(n, e) {
  n instanceof Xe && (n = new jl(n));
  for (let i of n.state.facet(D1)) {
    let s = i(n, e);
    if (s !== void 0)
      return s;
  }
  let t = Si(n.state);
  return t.length >= e ? I1(n, t, e) : null;
}
class jl {
  /**
  Create an indent context.
  */
  constructor(e, t = {}) {
    this.state = e, this.options = t, this.unit = ul(e);
  }
  /**
  Get a description of the line at the given position, taking
  [simulated line
  breaks](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  into account. If there is such a break at `pos`, the `bias`
  argument determines whether the part of the line line before or
  after the break is used.
  */
  lineAt(e, t = 1) {
    let i = this.state.doc.lineAt(e), { simulateBreak: s, simulateDoubleBreak: r } = this.options;
    return s != null && s >= i.from && s <= i.to ? r && s == e ? { text: "", from: e } : (t < 0 ? s < e : s <= e) ? { text: i.text.slice(s - i.from), from: s } : { text: i.text.slice(0, s - i.from), from: i.from } : i;
  }
  /**
  Get the text directly after `pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  textAfterPos(e, t = 1) {
    if (this.options.simulateDoubleBreak && e == this.options.simulateBreak)
      return "";
    let { text: i, from: s } = this.lineAt(e, t);
    return i.slice(e - s, Math.min(i.length, e + 100 - s));
  }
  /**
  Find the column for the given position.
  */
  column(e, t = 1) {
    let { text: i, from: s } = this.lineAt(e, t), r = this.countColumn(i, e - s), o = this.options.overrideIndentation ? this.options.overrideIndentation(s) : -1;
    return o > -1 && (r += o - this.countColumn(i, i.search(/\S|$/))), r;
  }
  /**
  Find the column position (taking tabs into account) of the given
  position in the given string.
  */
  countColumn(e, t = e.length) {
    return Zl(e, this.state.tabSize, t);
  }
  /**
  Find the indentation column of the line at the given point.
  */
  lineIndent(e, t = 1) {
    let { text: i, from: s } = this.lineAt(e, t), r = this.options.overrideIndentation;
    if (r) {
      let o = r(s);
      if (o > -1)
        return o;
    }
    return this.countColumn(i, i.search(/\S|$/));
  }
  /**
  Returns the [simulated line
  break](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  for this context, if any.
  */
  get simulatedBreak() {
    return this.options.simulateBreak || null;
  }
}
const Yp = /* @__PURE__ */ new Te();
function I1(n, e, t) {
  let i = e.resolveStack(t), s = e.resolveInner(t, -1).resolve(t, 0).enterUnfinishedNodesBefore(t);
  if (s != i.node) {
    let r = [];
    for (let o = s; o && !(o.from < i.node.from || o.to > i.node.to || o.from == i.node.from && o.type == i.node.type); o = o.parent)
      r.push(o);
    for (let o = r.length - 1; o >= 0; o--)
      i = { node: r[o], next: i };
  }
  return qp(i, n, t);
}
function qp(n, e, t) {
  for (let i = n; i; i = i.next) {
    let s = Y1(i.node);
    if (s)
      return s(vc.create(e, t, i));
  }
  return 0;
}
function W1(n) {
  return n.pos == n.options.simulateBreak && n.options.simulateDoubleBreak;
}
function Y1(n) {
  let e = n.type.prop(Yp);
  if (e)
    return e;
  let t = n.firstChild, i;
  if (t && (i = t.type.prop(Te.closedBy))) {
    let s = n.lastChild, r = s && i.indexOf(s.name) > -1;
    return (o) => Bp(o, !0, 1, void 0, r && !W1(o) ? s.from : void 0);
  }
  return n.parent == null ? q1 : null;
}
function q1() {
  return 0;
}
class vc extends jl {
  constructor(e, t, i) {
    super(e.state, e.options), this.base = e, this.pos = t, this.context = i;
  }
  /**
  The syntax tree node to which the indentation strategy
  applies.
  */
  get node() {
    return this.context.node;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new vc(e, t, i);
  }
  /**
  Get the text directly after `this.pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  get textAfter() {
    return this.textAfterPos(this.pos);
  }
  /**
  Get the indentation at the reference line for `this.node`, which
  is the line on which it starts, unless there is a node that is
  _not_ a parent of this node covering the start of that line. If
  so, the line at the start of that node is tried, again skipping
  on if it is covered by another such node.
  */
  get baseIndent() {
    return this.baseIndentFor(this.node);
  }
  /**
  Get the indentation for the reference line of the given node
  (see [`baseIndent`](https://codemirror.net/6/docs/ref/#language.TreeIndentContext.baseIndent)).
  */
  baseIndentFor(e) {
    let t = this.state.doc.lineAt(e.from);
    for (; ; ) {
      let i = e.resolve(t.from);
      for (; i.parent && i.parent.from == i.from; )
        i = i.parent;
      if (B1(i, e))
        break;
      t = this.state.doc.lineAt(i.from);
    }
    return this.lineIndent(t.from);
  }
  /**
  Continue looking for indentations in the node's parent nodes,
  and return the result of that.
  */
  continue() {
    return qp(this.context.next, this.base, this.pos);
  }
}
function B1(n, e) {
  for (let t = e; t; t = t.parent)
    if (n == t)
      return !0;
  return !1;
}
function V1(n) {
  let e = n.node, t = e.childAfter(e.from), i = e.lastChild;
  if (!t)
    return null;
  let s = n.options.simulateBreak, r = n.state.doc.lineAt(t.from), o = s == null || s <= r.from ? r.to : Math.min(r.to, s);
  for (let l = t.to; ; ) {
    let a = e.childAfter(l);
    if (!a || a == i)
      return null;
    if (!a.type.isSkipped) {
      if (a.from >= o)
        return null;
      let h = /^ */.exec(r.text.slice(t.to - r.from))[0].length;
      return { from: t.from, to: t.to + h };
    }
    l = a.to;
  }
}
function N1({ closing: n, align: e = !0, units: t = 1 }) {
  return (i) => Bp(i, e, t, n);
}
function Bp(n, e, t, i, s) {
  let r = n.textAfter, o = r.match(/^\s*/)[0].length, l = i && r.slice(o, o + i.length) == i || s == n.pos + o, a = e ? V1(n) : null;
  return a ? l ? n.column(a.from) : n.column(a.to) : n.baseIndent + (l ? 0 : n.unit * t);
}
const G1 = (n) => n.baseIndent;
function ga({ except: n, units: e = 1 } = {}) {
  return (t) => {
    let i = n && n.test(t.textAfter);
    return t.baseIndent + (i ? 0 : e * t.unit);
  };
}
const U1 = /* @__PURE__ */ new Te();
function F1(n) {
  let e = n.firstChild, t = n.lastChild;
  return e && e.to < t.from ? { from: e.to, to: t.type.isError ? n.to : t.from } : null;
}
const H1 = /* @__PURE__ */ ge.baseTheme({
  "&.cm-focused .cm-matchingBracket": { backgroundColor: "#328c8252" },
  "&.cm-focused .cm-nonmatchingBracket": { backgroundColor: "#bb555544" }
}), Vp = 1e4, Np = "()[]{}", Gp = /* @__PURE__ */ me.define({
  combine(n) {
    return Jh(n, {
      afterCursor: !0,
      brackets: Np,
      maxScanDistance: Vp,
      renderMatch: eb
    });
  }
}), K1 = /* @__PURE__ */ We.mark({ class: "cm-matchingBracket" }), J1 = /* @__PURE__ */ We.mark({ class: "cm-nonmatchingBracket" });
function eb(n) {
  let e = [], t = n.matched ? K1 : J1;
  return e.push(t.range(n.start.from, n.start.to)), n.end && e.push(t.range(n.end.from, n.end.to)), e;
}
function Gf(n) {
  let e = [], t = n.facet(Gp);
  for (let i of n.selection.ranges) {
    if (!i.empty)
      continue;
    let s = Ui(n, i.head, -1, t) || i.head > 0 && Ui(n, i.head - 1, 1, t) || t.afterCursor && (Ui(n, i.head, 1, t) || i.head < n.doc.length && Ui(n, i.head + 1, -1, t));
    s && (e = e.concat(t.renderMatch(s, n)));
  }
  return We.set(e, !0);
}
const tb = /* @__PURE__ */ Ki.fromClass(class {
  constructor(n) {
    this.paused = !1, this.decorations = Gf(n.state);
  }
  update(n) {
    (n.docChanged || n.selectionSet || this.paused) && (n.view.composing ? (this.decorations = this.decorations.map(n.changes), this.paused = !0) : (this.decorations = Gf(n.state), this.paused = !1));
  }
}, {
  decorations: (n) => n.decorations
}), ib = [
  tb,
  H1
];
function nb(n = {}) {
  return [Gp.of(n), ib];
}
const sb = /* @__PURE__ */ new Te();
function kh(n, e, t) {
  let i = n.prop(e < 0 ? Te.openedBy : Te.closedBy);
  if (i)
    return i;
  if (n.name.length == 1) {
    let s = t.indexOf(n.name);
    if (s > -1 && s % 2 == (e < 0 ? 1 : 0))
      return [t[s + e]];
  }
  return null;
}
function $h(n) {
  let e = n.type.prop(sb);
  return e ? e(n.node) : n;
}
function Ui(n, e, t, i = {}) {
  let s = i.maxScanDistance || Vp, r = i.brackets || Np, o = Si(n), l = o.resolveInner(e, t);
  for (let a = l; a; a = a.parent) {
    let h = kh(a.type, t, r);
    if (h && a.from < a.to) {
      let c = $h(a);
      if (c && (t > 0 ? e >= c.from && e < c.to : e > c.from && e <= c.to))
        return rb(n, e, t, a, c, h, r);
    }
  }
  return ob(n, e, t, o, l.type, s, r);
}
function rb(n, e, t, i, s, r, o) {
  let l = i.parent, a = { from: s.from, to: s.to }, h = 0, c = l == null ? void 0 : l.cursor();
  if (c && (t < 0 ? c.childBefore(i.from) : c.childAfter(i.to)))
    do
      if (t < 0 ? c.to <= i.from : c.from >= i.to) {
        if (h == 0 && r.indexOf(c.type.name) > -1 && c.from < c.to) {
          let f = $h(c);
          return { start: a, end: f ? { from: f.from, to: f.to } : void 0, matched: !0 };
        } else if (kh(c.type, t, o))
          h++;
        else if (kh(c.type, -t, o)) {
          if (h == 0) {
            let f = $h(c);
            return {
              start: a,
              end: f && f.from < f.to ? { from: f.from, to: f.to } : void 0,
              matched: !1
            };
          }
          h--;
        }
      }
    while (t < 0 ? c.prevSibling() : c.nextSibling());
  return { start: a, matched: !1 };
}
function ob(n, e, t, i, s, r, o) {
  if (t < 0 ? !e : e == n.doc.length)
    return null;
  let l = t < 0 ? n.sliceDoc(e - 1, e) : n.sliceDoc(e, e + 1), a = o.indexOf(l);
  if (a < 0 || a % 2 == 0 != t > 0)
    return null;
  let h = { from: t < 0 ? e - 1 : e, to: t > 0 ? e + 1 : e }, c = n.doc.iterRange(e, t > 0 ? n.doc.length : 0), f = 0;
  for (let d = 0; !c.next().done && d <= r; ) {
    let p = c.value;
    t < 0 && (d += p.length);
    let O = e + d * t;
    for (let g = t > 0 ? 0 : p.length - 1, m = t > 0 ? p.length : -1; g != m; g += t) {
      let v = o.indexOf(p[g]);
      if (!(v < 0 || i.resolveInner(O + g, 1).type != s))
        if (v % 2 == 0 == t > 0)
          f++;
        else {
          if (f == 1)
            return { start: h, end: { from: O + g, to: O + g + 1 }, matched: v >> 1 == a >> 1 };
          f--;
        }
    }
    t > 0 && (d += p.length);
  }
  return c.done ? { start: h, matched: !1 } : null;
}
const lb = /* @__PURE__ */ Object.create(null), Uf = [Ft.none], Ff = [], Hf = /* @__PURE__ */ Object.create(null), ab = /* @__PURE__ */ Object.create(null);
for (let [n, e] of [
  ["variable", "variableName"],
  ["variable-2", "variableName.special"],
  ["string-2", "string.special"],
  ["def", "variableName.definition"],
  ["tag", "tagName"],
  ["attribute", "attributeName"],
  ["type", "typeName"],
  ["builtin", "variableName.standard"],
  ["qualifier", "modifier"],
  ["error", "invalid"],
  ["header", "heading"],
  ["property", "propertyName"]
])
  ab[n] = /* @__PURE__ */ hb(lb, e);
function ma(n, e) {
  Ff.indexOf(n) > -1 || (Ff.push(n), console.warn(e));
}
function hb(n, e) {
  let t = [];
  for (let l of e.split(" ")) {
    let a = [];
    for (let h of l.split(".")) {
      let c = n[h] || W[h];
      c ? typeof c == "function" ? a.length ? a = a.map(c) : ma(h, `Modifier ${h} used at start of tag`) : a.length ? ma(h, `Tag ${h} used as modifier`) : a = Array.isArray(c) ? c : [c] : ma(h, `Unknown highlighting tag ${h}`);
    }
    for (let h of a)
      t.push(h);
  }
  if (!t.length)
    return 0;
  let i = e.replace(/ /g, "_"), s = i + " " + t.map((l) => l.id), r = Hf[s];
  if (r)
    return r.id;
  let o = Hf[s] = Ft.define({
    id: Uf.length,
    name: i,
    props: [zp({ [i]: t })]
  });
  return Uf.push(o), o.id;
}
nt.RTL, nt.LTR;
const cb = (n) => {
  let { state: e } = n, t = e.doc.lineAt(e.selection.main.from), i = yc(n.state, t.from);
  return i.line ? fb(n) : i.block ? db(n) : !1;
};
function bc(n, e) {
  return ({ state: t, dispatch: i }) => {
    if (t.readOnly)
      return !1;
    let s = n(e, t);
    return s ? (i(t.update(s)), !0) : !1;
  };
}
const fb = /* @__PURE__ */ bc(
  gb,
  0
  /* CommentOption.Toggle */
), ub = /* @__PURE__ */ bc(
  Up,
  0
  /* CommentOption.Toggle */
), db = /* @__PURE__ */ bc(
  (n, e) => Up(n, e, Ob(e)),
  0
  /* CommentOption.Toggle */
);
function yc(n, e) {
  let t = n.languageDataAt("commentTokens", e, 1);
  return t.length ? t[0] : {};
}
const pr = 50;
function pb(n, { open: e, close: t }, i, s) {
  let r = n.sliceDoc(i - pr, i), o = n.sliceDoc(s, s + pr), l = /\s*$/.exec(r)[0].length, a = /^\s*/.exec(o)[0].length, h = r.length - l;
  if (r.slice(h - e.length, h) == e && o.slice(a, a + t.length) == t)
    return {
      open: { pos: i - l, margin: l && 1 },
      close: { pos: s + a, margin: a && 1 }
    };
  let c, f;
  s - i <= 2 * pr ? c = f = n.sliceDoc(i, s) : (c = n.sliceDoc(i, i + pr), f = n.sliceDoc(s - pr, s));
  let d = /^\s*/.exec(c)[0].length, p = /\s*$/.exec(f)[0].length, O = f.length - p - t.length;
  return c.slice(d, d + e.length) == e && f.slice(O, O + t.length) == t ? {
    open: {
      pos: i + d + e.length,
      margin: /\s/.test(c.charAt(d + e.length)) ? 1 : 0
    },
    close: {
      pos: s - p - t.length,
      margin: /\s/.test(f.charAt(O - 1)) ? 1 : 0
    }
  } : null;
}
function Ob(n) {
  let e = [];
  for (let t of n.selection.ranges) {
    let i = n.doc.lineAt(t.from), s = t.to <= i.to ? i : n.doc.lineAt(t.to);
    s.from > i.from && s.from == t.to && (s = t.to == i.to + 1 ? i : n.doc.lineAt(t.to - 1));
    let r = e.length - 1;
    r >= 0 && e[r].to > i.from ? e[r].to = s.to : e.push({ from: i.from + /^\s*/.exec(i.text)[0].length, to: s.to });
  }
  return e;
}
function Up(n, e, t = e.selection.ranges) {
  let i = t.map((r) => yc(e, r.from).block);
  if (!i.every((r) => r))
    return null;
  let s = t.map((r, o) => pb(e, i[o], r.from, r.to));
  if (n != 2 && !s.every((r) => r))
    return { changes: e.changes(t.map((r, o) => s[o] ? [] : [{ from: r.from, insert: i[o].open + " " }, { from: r.to, insert: " " + i[o].close }])) };
  if (n != 1 && s.some((r) => r)) {
    let r = [];
    for (let o = 0, l; o < s.length; o++)
      if (l = s[o]) {
        let a = i[o], { open: h, close: c } = l;
        r.push({ from: h.pos - a.open.length, to: h.pos + h.margin }, { from: c.pos - c.margin, to: c.pos + a.close.length });
      }
    return { changes: r };
  }
  return null;
}
function gb(n, e, t = e.selection.ranges) {
  let i = [], s = -1;
  e: for (let { from: r, to: o } of t) {
    let l = i.length, a = 1e9, h;
    for (let c = r; c <= o; ) {
      let f = e.doc.lineAt(c);
      if (h == null && (h = yc(e, f.from).line, !h))
        continue e;
      if (f.from > s && (r == o || o > f.from)) {
        s = f.from;
        let d = /^\s*/.exec(f.text)[0].length, p = d == f.length, O = f.text.slice(d, d + h.length) == h ? d : -1;
        d < f.text.length && d < a && (a = d), i.push({ line: f, comment: O, token: h, indent: d, empty: p, single: !1 });
      }
      c = f.to + 1;
    }
    if (a < 1e9)
      for (let c = l; c < i.length; c++)
        i[c].indent < i[c].line.text.length && (i[c].indent = a);
    i.length == l + 1 && (i[l].single = !0);
  }
  if (n != 2 && i.some((r) => r.comment < 0 && (!r.empty || r.single))) {
    let r = [];
    for (let { line: l, token: a, indent: h, empty: c, single: f } of i)
      (f || !c) && r.push({ from: l.from + h, insert: a + " " });
    let o = e.changes(r);
    return { changes: o, selection: e.selection.map(o, 1) };
  } else if (n != 1 && i.some((r) => r.comment >= 0)) {
    let r = [];
    for (let { line: o, comment: l, token: a } of i)
      if (l >= 0) {
        let h = o.from + l, c = h + a.length;
        o.text[c - o.from] == " " && c++, r.push({ from: h, to: c });
      }
    return { changes: r };
  }
  return null;
}
const Ph = /* @__PURE__ */ mn.define(), mb = /* @__PURE__ */ mn.define(), vb = /* @__PURE__ */ me.define(), Fp = /* @__PURE__ */ me.define({
  combine(n) {
    return Jh(n, {
      minDepth: 100,
      newGroupDelay: 500,
      joinToEvent: (e, t) => t
    }, {
      minDepth: Math.max,
      newGroupDelay: Math.min,
      joinToEvent: (e, t) => (i, s) => e(i, s) || t(i, s)
    });
  }
}), Hp = /* @__PURE__ */ tn.define({
  create() {
    return Fi.empty;
  },
  update(n, e) {
    let t = e.state.facet(Fp), i = e.annotation(Ph);
    if (i) {
      let a = Nt.fromTransaction(e, i.selection), h = i.side, c = h == 0 ? n.undone : n.done;
      return a ? c = pl(c, c.length, t.minDepth, a) : c = eO(c, e.startState.selection), new Fi(h == 0 ? i.rest : c, h == 0 ? c : i.rest);
    }
    let s = e.annotation(mb);
    if ((s == "full" || s == "before") && (n = n.isolate()), e.annotation(ut.addToHistory) === !1)
      return e.changes.empty ? n : n.addMapping(e.changes.desc);
    let r = Nt.fromTransaction(e), o = e.annotation(ut.time), l = e.annotation(ut.userEvent);
    return r ? n = n.addChanges(r, o, l, t, e) : e.selection && (n = n.addSelection(e.startState.selection, o, l, t.newGroupDelay)), (s == "full" || s == "after") && (n = n.isolate()), n;
  },
  toJSON(n) {
    return { done: n.done.map((e) => e.toJSON()), undone: n.undone.map((e) => e.toJSON()) };
  },
  fromJSON(n) {
    return new Fi(n.done.map(Nt.fromJSON), n.undone.map(Nt.fromJSON));
  }
});
function bb(n = {}) {
  return [
    Hp,
    Fp.of(n),
    ge.domEventHandlers({
      beforeinput(e, t) {
        let i = e.inputType == "historyUndo" ? Kp : e.inputType == "historyRedo" ? _h : null;
        return i ? (e.preventDefault(), i(t)) : !1;
      }
    })
  ];
}
function zl(n, e) {
  return function({ state: t, dispatch: i }) {
    if (!e && t.readOnly)
      return !1;
    let s = t.field(Hp, !1);
    if (!s)
      return !1;
    let r = s.pop(n, t, e);
    return r ? (i(r), !0) : !1;
  };
}
const Kp = /* @__PURE__ */ zl(0, !1), _h = /* @__PURE__ */ zl(1, !1), yb = /* @__PURE__ */ zl(0, !0), wb = /* @__PURE__ */ zl(1, !0);
class Nt {
  constructor(e, t, i, s, r) {
    this.changes = e, this.effects = t, this.mapped = i, this.startSelection = s, this.selectionsAfter = r;
  }
  setSelAfter(e) {
    return new Nt(this.changes, this.effects, this.mapped, this.startSelection, e);
  }
  toJSON() {
    var e, t, i;
    return {
      changes: (e = this.changes) === null || e === void 0 ? void 0 : e.toJSON(),
      mapped: (t = this.mapped) === null || t === void 0 ? void 0 : t.toJSON(),
      startSelection: (i = this.startSelection) === null || i === void 0 ? void 0 : i.toJSON(),
      selectionsAfter: this.selectionsAfter.map((s) => s.toJSON())
    };
  }
  static fromJSON(e) {
    return new Nt(e.changes && pt.fromJSON(e.changes), [], e.mapped && Hi.fromJSON(e.mapped), e.startSelection && B.fromJSON(e.startSelection), e.selectionsAfter.map(B.fromJSON));
  }
  // This does not check `addToHistory` and such, it assumes the
  // transaction needs to be converted to an item. Returns null when
  // there are no changes or effects in the transaction.
  static fromTransaction(e, t) {
    let i = pi;
    for (let s of e.startState.facet(vb)) {
      let r = s(e);
      r.length && (i = i.concat(r));
    }
    return !i.length && e.changes.empty ? null : new Nt(e.changes.invert(e.startState.doc), i, void 0, t || e.startState.selection, pi);
  }
  static selection(e) {
    return new Nt(void 0, pi, void 0, void 0, e);
  }
}
function pl(n, e, t, i) {
  let s = e + 1 > t + 20 ? e - t - 1 : 0, r = n.slice(s, e);
  return r.push(i), r;
}
function xb(n, e) {
  let t = [], i = !1;
  return n.iterChangedRanges((s, r) => t.push(s, r)), e.iterChangedRanges((s, r, o, l) => {
    for (let a = 0; a < t.length; ) {
      let h = t[a++], c = t[a++];
      l >= h && o <= c && (i = !0);
    }
  }), i;
}
function Sb(n, e) {
  return n.ranges.length == e.ranges.length && n.ranges.filter((t, i) => t.empty != e.ranges[i].empty).length === 0;
}
function Jp(n, e) {
  return n.length ? e.length ? n.concat(e) : n : e;
}
const pi = [], Qb = 200;
function eO(n, e) {
  if (n.length) {
    let t = n[n.length - 1], i = t.selectionsAfter.slice(Math.max(0, t.selectionsAfter.length - Qb));
    return i.length && i[i.length - 1].eq(e) ? n : (i.push(e), pl(n, n.length - 1, 1e9, t.setSelAfter(i)));
  } else
    return [Nt.selection([e])];
}
function kb(n) {
  let e = n[n.length - 1], t = n.slice();
  return t[n.length - 1] = e.setSelAfter(e.selectionsAfter.slice(0, e.selectionsAfter.length - 1)), t;
}
function va(n, e) {
  if (!n.length)
    return n;
  let t = n.length, i = pi;
  for (; t; ) {
    let s = $b(n[t - 1], e, i);
    if (s.changes && !s.changes.empty || s.effects.length) {
      let r = n.slice(0, t);
      return r[t - 1] = s, r;
    } else
      e = s.mapped, t--, i = s.selectionsAfter;
  }
  return i.length ? [Nt.selection(i)] : pi;
}
function $b(n, e, t) {
  let i = Jp(n.selectionsAfter.length ? n.selectionsAfter.map((l) => l.map(e)) : pi, t);
  if (!n.changes)
    return Nt.selection(i);
  let s = n.changes.map(e), r = e.mapDesc(n.changes, !0), o = n.mapped ? n.mapped.composeDesc(r) : r;
  return new Nt(s, ze.mapEffects(n.effects, e), o, n.startSelection.map(r), i);
}
const Pb = /^(input\.type|delete)($|\.)/;
class Fi {
  constructor(e, t, i = 0, s = void 0) {
    this.done = e, this.undone = t, this.prevTime = i, this.prevUserEvent = s;
  }
  isolate() {
    return this.prevTime ? new Fi(this.done, this.undone) : this;
  }
  addChanges(e, t, i, s, r) {
    let o = this.done, l = o[o.length - 1];
    return l && l.changes && !l.changes.empty && e.changes && (!i || Pb.test(i)) && (!l.selectionsAfter.length && t - this.prevTime < s.newGroupDelay && s.joinToEvent(r, xb(l.changes, e.changes)) || // For compose (but not compose.start) events, always join with previous event
    i == "input.type.compose") ? o = pl(o, o.length - 1, s.minDepth, new Nt(e.changes.compose(l.changes), Jp(ze.mapEffects(e.effects, l.changes), l.effects), l.mapped, l.startSelection, pi)) : o = pl(o, o.length, s.minDepth, e), new Fi(o, pi, t, i);
  }
  addSelection(e, t, i, s) {
    let r = this.done.length ? this.done[this.done.length - 1].selectionsAfter : pi;
    return r.length > 0 && t - this.prevTime < s && i == this.prevUserEvent && i && /^select($|\.)/.test(i) && Sb(r[r.length - 1], e) ? this : new Fi(eO(this.done, e), this.undone, t, i);
  }
  addMapping(e) {
    return new Fi(va(this.done, e), va(this.undone, e), this.prevTime, this.prevUserEvent);
  }
  pop(e, t, i) {
    let s = e == 0 ? this.done : this.undone;
    if (s.length == 0)
      return null;
    let r = s[s.length - 1], o = r.selectionsAfter[0] || (r.startSelection ? r.startSelection.map(r.changes.invertedDesc, 1) : t.selection);
    if (i && r.selectionsAfter.length)
      return t.update({
        selection: r.selectionsAfter[r.selectionsAfter.length - 1],
        annotations: Ph.of({ side: e, rest: kb(s), selection: o }),
        userEvent: e == 0 ? "select.undo" : "select.redo",
        scrollIntoView: !0
      });
    if (r.changes) {
      let l = s.length == 1 ? pi : s.slice(0, s.length - 1);
      return r.mapped && (l = va(l, r.mapped)), t.update({
        changes: r.changes,
        selection: r.startSelection,
        effects: r.effects,
        annotations: Ph.of({ side: e, rest: l, selection: o }),
        filter: !1,
        userEvent: e == 0 ? "undo" : "redo",
        scrollIntoView: !0
      });
    } else
      return null;
  }
}
Fi.empty = /* @__PURE__ */ new Fi(pi, pi);
const _b = [
  { key: "Mod-z", run: Kp, preventDefault: !0 },
  { key: "Mod-y", mac: "Mod-Shift-z", run: _h, preventDefault: !0 },
  { linux: "Ctrl-Shift-z", run: _h, preventDefault: !0 },
  { key: "Mod-u", run: yb, preventDefault: !0 },
  { key: "Alt-u", mac: "Mod-Shift-u", run: wb, preventDefault: !0 }
];
function lr(n, e) {
  return B.create(n.ranges.map(e), n.mainIndex);
}
function Mi(n, e) {
  return n.update({ selection: e, scrollIntoView: !0, userEvent: "select" });
}
function Xi({ state: n, dispatch: e }, t) {
  let i = lr(n.selection, t);
  return i.eq(n.selection, !0) ? !1 : (e(Mi(n, i)), !0);
}
function Dl(n, e) {
  return B.cursor(e ? n.to : n.from);
}
function tO(n, e) {
  return Xi(n, (t) => t.empty ? n.moveByChar(t, e) : Dl(t, e));
}
function Zt(n) {
  return n.textDirectionAt(n.state.selection.main.head) == nt.LTR;
}
const iO = (n) => tO(n, !Zt(n)), nO = (n) => tO(n, Zt(n));
function sO(n, e) {
  return Xi(n, (t) => t.empty ? n.moveByGroup(t, e) : Dl(t, e));
}
const Tb = (n) => sO(n, !Zt(n)), Zb = (n) => sO(n, Zt(n));
function Cb(n, e, t) {
  if (e.type.prop(t))
    return !0;
  let i = e.to - e.from;
  return i && (i > 2 || /[^\s,.;:]/.test(n.sliceDoc(e.from, e.to))) || e.firstChild;
}
function Il(n, e, t) {
  let i = Si(n).resolveInner(e.head), s = t ? Te.closedBy : Te.openedBy;
  for (let a = e.head; ; ) {
    let h = t ? i.childAfter(a) : i.childBefore(a);
    if (!h)
      break;
    Cb(n, h, s) ? i = h : a = t ? h.to : h.from;
  }
  let r = i.type.prop(s), o, l;
  return r && (o = t ? Ui(n, i.from, 1) : Ui(n, i.to, -1)) && o.matched ? l = t ? o.end.to : o.end.from : l = t ? i.to : i.from, B.cursor(l, t ? -1 : 1);
}
const Ab = (n) => Xi(n, (e) => Il(n.state, e, !Zt(n))), Rb = (n) => Xi(n, (e) => Il(n.state, e, Zt(n)));
function rO(n, e) {
  return Xi(n, (t) => {
    if (!t.empty)
      return Dl(t, e);
    let i = n.moveVertically(t, e);
    return i.head != t.head ? i : n.moveToLineBoundary(t, e);
  });
}
const oO = (n) => rO(n, !1), lO = (n) => rO(n, !0);
function aO(n) {
  let e = n.scrollDOM.clientHeight < n.scrollDOM.scrollHeight - 2, t = 0, i = 0, s;
  if (e) {
    for (let r of n.state.facet(ge.scrollMargins)) {
      let o = r(n);
      o != null && o.top && (t = Math.max(o == null ? void 0 : o.top, t)), o != null && o.bottom && (i = Math.max(o == null ? void 0 : o.bottom, i));
    }
    s = n.scrollDOM.clientHeight - t - i;
  } else
    s = (n.dom.ownerDocument.defaultView || window).innerHeight;
  return {
    marginTop: t,
    marginBottom: i,
    selfScroll: e,
    height: Math.max(n.defaultLineHeight, s - 5)
  };
}
function hO(n, e) {
  let t = aO(n), { state: i } = n, s = lr(i.selection, (o) => o.empty ? n.moveVertically(o, e, t.height) : Dl(o, e));
  if (s.eq(i.selection))
    return !1;
  let r;
  if (t.selfScroll) {
    let o = n.coordsAtPos(i.selection.main.head), l = n.scrollDOM.getBoundingClientRect(), a = l.top + t.marginTop, h = l.bottom - t.marginBottom;
    o && o.top > a && o.bottom < h && (r = ge.scrollIntoView(s.main.head, { y: "start", yMargin: o.top - a }));
  }
  return n.dispatch(Mi(i, s), { effects: r }), !0;
}
const Kf = (n) => hO(n, !1), Th = (n) => hO(n, !0);
function zn(n, e, t) {
  let i = n.lineBlockAt(e.head), s = n.moveToLineBoundary(e, t);
  if (s.head == e.head && s.head != (t ? i.to : i.from) && (s = n.moveToLineBoundary(e, t, !1)), !t && s.head == i.from && i.length) {
    let r = /^\s*/.exec(n.state.sliceDoc(i.from, Math.min(i.from + 100, i.to)))[0].length;
    r && e.head != i.from + r && (s = B.cursor(i.from + r));
  }
  return s;
}
const Mb = (n) => Xi(n, (e) => zn(n, e, !0)), Xb = (n) => Xi(n, (e) => zn(n, e, !1)), Eb = (n) => Xi(n, (e) => zn(n, e, !Zt(n))), Lb = (n) => Xi(n, (e) => zn(n, e, Zt(n))), jb = (n) => Xi(n, (e) => B.cursor(n.lineBlockAt(e.head).from, 1)), zb = (n) => Xi(n, (e) => B.cursor(n.lineBlockAt(e.head).to, -1));
function Db(n, e, t) {
  let i = !1, s = lr(n.selection, (r) => {
    let o = Ui(n, r.head, -1) || Ui(n, r.head, 1) || r.head > 0 && Ui(n, r.head - 1, 1) || r.head < n.doc.length && Ui(n, r.head + 1, -1);
    if (!o || !o.end)
      return r;
    i = !0;
    let l = o.start.from == r.head ? o.end.to : o.end.from;
    return B.cursor(l);
  });
  return i ? (e(Mi(n, s)), !0) : !1;
}
const Ib = ({ state: n, dispatch: e }) => Db(n, e);
function Qi(n, e, t) {
  let i = lr(n.state.selection, (s) => {
    s.undirectional && s.head >= s.anchor != e && (s = B.range(s.head, s.anchor));
    let r = t(s);
    return B.range(s.anchor, r.head, r.goalColumn, r.bidiLevel || void 0, r.assoc);
  });
  return i.eq(n.state.selection) ? !1 : (n.dispatch(Mi(n.state, i)), !0);
}
function cO(n, e) {
  return Qi(n, e, (t) => n.moveByChar(t, e));
}
const fO = (n) => cO(n, !Zt(n)), uO = (n) => cO(n, Zt(n));
function dO(n, e) {
  return Qi(n, e, (t) => n.moveByGroup(t, e));
}
const Wb = (n) => dO(n, !Zt(n)), Yb = (n) => dO(n, Zt(n)), qb = (n) => {
  let e = !Zt(n);
  return Qi(n, e, (t) => Il(n.state, t, e));
}, Bb = (n) => {
  let e = Zt(n);
  return Qi(n, e, (t) => Il(n.state, t, e));
};
function pO(n, e) {
  return Qi(n, e, (t) => n.moveVertically(t, e));
}
const OO = (n) => pO(n, !1), gO = (n) => pO(n, !0);
function mO(n, e) {
  return Qi(n, e, (t) => n.moveVertically(t, e, aO(n).height));
}
const Jf = (n) => mO(n, !1), eu = (n) => mO(n, !0), Vb = (n) => Qi(n, !0, (e) => zn(n, e, !0)), Nb = (n) => Qi(n, !1, (e) => zn(n, e, !1)), Gb = (n) => {
  let e = !Zt(n);
  return Qi(n, e, (t) => zn(n, t, e));
}, Ub = (n) => {
  let e = Zt(n);
  return Qi(n, e, (t) => zn(n, t, e));
}, Fb = (n) => Qi(n, !1, (e) => B.cursor(n.lineBlockAt(e.head).from)), Hb = (n) => Qi(n, !0, (e) => B.cursor(n.lineBlockAt(e.head).to)), tu = ({ state: n, dispatch: e }) => (e(Mi(n, { anchor: 0 })), !0), iu = ({ state: n, dispatch: e }) => (e(Mi(n, { anchor: n.doc.length })), !0), nu = ({ state: n, dispatch: e }) => (e(Mi(n, { anchor: n.selection.main.anchor, head: 0 })), !0), su = ({ state: n, dispatch: e }) => (e(Mi(n, { anchor: n.selection.main.anchor, head: n.doc.length })), !0), Kb = ({ state: n, dispatch: e }) => (e(n.update({ selection: { anchor: 0, head: n.doc.length }, userEvent: "select" })), !0), Jb = ({ state: n, dispatch: e }) => {
  let t = Wl(n).map(({ from: i, to: s }) => B.range(i, Math.min(s + 1, n.doc.length)));
  return e(n.update({ selection: B.create(t), userEvent: "select" })), !0;
}, ey = ({ state: n, dispatch: e }) => {
  let t = lr(n.selection, (i) => {
    let s = Si(n), r = s.resolveStack(i.from, 1);
    if (i.empty) {
      let o = s.resolveStack(i.from, -1);
      o.node.from >= r.node.from && o.node.to <= r.node.to && (r = o);
    }
    for (let o = r; o; o = o.next) {
      let { node: l } = o;
      if ((l.from < i.from && l.to >= i.to || l.to > i.to && l.from <= i.from) && o.next)
        return B.range(l.to, l.from);
    }
    return i;
  });
  return t.eq(n.selection) ? !1 : (e(Mi(n, t)), !0);
};
function vO(n, e) {
  let { state: t } = n, i = t.selection, s = t.selection.ranges.slice();
  for (let r of t.selection.ranges) {
    let o = t.doc.lineAt(r.head);
    if (e ? o.to < n.state.doc.length : o.from > 0)
      for (let l = r; ; ) {
        let a = n.moveVertically(l, e);
        if (a.head < o.from || a.head > o.to) {
          s.some((h) => h.head == a.head) || s.push(a);
          break;
        } else {
          if (a.head == l.head)
            break;
          l = a;
        }
      }
  }
  return s.length == i.ranges.length ? !1 : (n.dispatch(Mi(t, B.create(s, s.length - 1))), !0);
}
const ty = (n) => vO(n, !1), iy = (n) => vO(n, !0), ny = ({ state: n, dispatch: e }) => {
  let t = n.selection, i = null;
  return t.ranges.length > 1 ? i = B.create([t.main]) : t.main.empty || (i = B.create([B.cursor(t.main.head)])), i ? (e(Mi(n, i)), !0) : !1;
};
function lo(n, e) {
  if (n.state.readOnly)
    return !1;
  let t = "delete.selection", { state: i } = n, s = i.changeByRange((r) => {
    let { from: o, to: l } = r;
    if (o == l) {
      let a = e(r);
      a < o ? (t = "delete.backward", a = Ao(n, a, !1)) : a > o && (t = "delete.forward", a = Ao(n, a, !0)), o = Math.min(o, a), l = Math.max(l, a);
    } else
      o = Ao(n, o, !1), l = Ao(n, l, !0);
    return o == l ? { range: r } : { changes: { from: o, to: l }, range: B.cursor(o, o < r.head ? -1 : 1) };
  });
  return s.changes.empty ? !1 : (n.dispatch(i.update(s, {
    scrollIntoView: !0,
    userEvent: t,
    effects: t == "delete.selection" ? ge.announce.of(i.phrase("Selection deleted")) : void 0
  })), !0);
}
function Ao(n, e, t) {
  if (n instanceof ge)
    for (let i of n.state.facet(ge.atomicRanges).map((s) => s(n)))
      i.between(e, e, (s, r) => {
        s < e && r > e && (e = t ? r : s);
      });
  return e;
}
const bO = (n, e, t) => lo(n, (i) => {
  let s = i.from, { state: r } = n, o = r.doc.lineAt(s), l, a;
  if (t && !e && s > o.from && s < o.from + 200 && !/[^ \t]/.test(l = o.text.slice(0, s - o.from))) {
    if (l[l.length - 1] == "	")
      return s - 1;
    let h = Zl(l, r.tabSize), c = h % ul(r) || ul(r);
    for (let f = 0; f < c && l[l.length - 1 - f] == " "; f++)
      s--;
    a = s;
  } else
    a = _t(o.text, s - o.from, e, e) + o.from, a == s && o.number != (e ? r.doc.lines : 1) ? a += e ? 1 : -1 : !e && /[\ufe00-\ufe0f]/.test(o.text.slice(a - o.from, s - o.from)) && (a = _t(o.text, a - o.from, !1, !1) + o.from);
  return a;
}), Zh = (n) => bO(n, !1, !0), yO = (n) => bO(n, !0, !1), wO = (n, e) => lo(n, (t) => {
  let i = t.head, { state: s } = n, r = s.doc.lineAt(i), o = s.charCategorizer(i);
  for (let l = null; ; ) {
    if (i == (e ? r.to : r.from)) {
      i == t.head && r.number != (e ? s.doc.lines : 1) && (i += e ? 1 : -1);
      break;
    }
    let a = _t(r.text, i - r.from, e) + r.from, h = r.text.slice(Math.min(i, a) - r.from, Math.max(i, a) - r.from), c = o(h);
    if (l != null && c != l)
      break;
    (h != " " || i != t.head) && (l = c), i = a;
  }
  return i;
}), xO = (n) => wO(n, !1), sy = (n) => wO(n, !0), ry = (n) => lo(n, (e) => {
  let t = n.lineBlockAt(e.head).to;
  return e.head < t ? t : Math.min(n.state.doc.length, e.head + 1);
}), oy = (n) => lo(n, (e) => {
  let t = n.moveToLineBoundary(e, !1).head;
  return e.head > t ? t : Math.max(0, e.head - 1);
}), ly = (n) => lo(n, (e) => {
  let t = n.moveToLineBoundary(e, !0).head;
  return e.head < t ? t : Math.min(n.state.doc.length, e.head + 1);
}), ay = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = n.changeByRange((i) => ({
    changes: { from: i.from, to: i.to, insert: Re.of(["", ""]) },
    range: B.cursor(i.from)
  }));
  return e(n.update(t, { scrollIntoView: !0, userEvent: "input" })), !0;
}, hy = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = n.changeByRange((i) => {
    if (!i.empty || i.from == 0 || i.from == n.doc.length)
      return { range: i };
    let s = i.from, r = n.doc.lineAt(s), o = s == r.from ? s - 1 : _t(r.text, s - r.from, !1) + r.from, l = s == r.to ? s + 1 : _t(r.text, s - r.from, !0) + r.from;
    return {
      changes: { from: o, to: l, insert: n.doc.slice(s, l).append(n.doc.slice(o, s)) },
      range: B.cursor(l)
    };
  });
  return t.changes.empty ? !1 : (e(n.update(t, { scrollIntoView: !0, userEvent: "move.character" })), !0);
};
function Wl(n) {
  let e = [], t = -1;
  for (let i of n.selection.ranges) {
    let s = n.doc.lineAt(i.from), r = n.doc.lineAt(i.to);
    if (!i.empty && i.to == r.from && (r = n.doc.lineAt(i.to - 1)), t >= s.number) {
      let o = e[e.length - 1];
      o.to = r.to, o.ranges.push(i);
    } else
      e.push({ from: s.from, to: r.to, ranges: [i] });
    t = r.number + 1;
  }
  return e;
}
function SO(n, e, t) {
  if (n.readOnly)
    return !1;
  let i = [], s = [];
  for (let r of Wl(n)) {
    if (t ? r.to == n.doc.length : r.from == 0)
      continue;
    let o = n.doc.lineAt(t ? r.to + 1 : r.from - 1), l = o.length + 1;
    if (t) {
      i.push({ from: r.to, to: o.to }, { from: r.from, insert: o.text + n.lineBreak });
      for (let a of r.ranges)
        s.push(B.range(Math.min(n.doc.length, a.anchor + l), Math.min(n.doc.length, a.head + l)));
    } else {
      i.push({ from: o.from, to: r.from }, { from: r.to, insert: n.lineBreak + o.text });
      for (let a of r.ranges)
        s.push(B.range(a.anchor - l, a.head - l));
    }
  }
  return i.length ? (e(n.update({
    changes: i,
    scrollIntoView: !0,
    selection: B.create(s, n.selection.mainIndex),
    userEvent: "move.line"
  })), !0) : !1;
}
const cy = ({ state: n, dispatch: e }) => SO(n, e, !1), fy = ({ state: n, dispatch: e }) => SO(n, e, !0);
function QO(n, e, t) {
  if (n.readOnly)
    return !1;
  let i = [];
  for (let r of Wl(n))
    t ? i.push({ from: r.from, insert: n.doc.slice(r.from, r.to) + n.lineBreak }) : i.push({ from: r.to, insert: n.lineBreak + n.doc.slice(r.from, r.to) });
  let s = n.changes(i);
  return e(n.update({
    changes: s,
    selection: n.selection.map(s, t ? 1 : -1),
    scrollIntoView: !0,
    userEvent: "input.copyline"
  })), !0;
}
const uy = ({ state: n, dispatch: e }) => QO(n, e, !1), dy = ({ state: n, dispatch: e }) => QO(n, e, !0), py = (n) => {
  if (n.state.readOnly)
    return !1;
  let { state: e } = n, t = e.changes(Wl(e).map(({ from: s, to: r }) => (s > 0 ? s-- : r < e.doc.length && r++, { from: s, to: r }))), i = lr(e.selection, (s) => {
    let r;
    if (n.lineWrapping) {
      let o = n.lineBlockAt(s.head), l = n.coordsAtPos(s.head, s.assoc || 1);
      l && (r = o.bottom + n.documentTop - l.bottom + n.defaultLineHeight / 2);
    }
    return n.moveVertically(s, !0, r);
  }).map(t);
  return n.dispatch({ changes: t, selection: i, scrollIntoView: !0, userEvent: "delete.line" }), !0;
};
function Oy(n, e) {
  if (/\(\)|\[\]|\{\}/.test(n.sliceDoc(e - 1, e + 1)))
    return { from: e, to: e };
  let t = Si(n).resolveInner(e), i = t.childBefore(e), s = t.childAfter(e), r;
  return i && s && i.to <= e && s.from >= e && (r = i.type.prop(Te.closedBy)) && r.indexOf(s.name) > -1 && n.doc.lineAt(i.to).from == n.doc.lineAt(s.from).from && !/\S/.test(n.sliceDoc(i.to, s.from)) ? { from: i.to, to: s.from } : null;
}
const ru = /* @__PURE__ */ kO(!1), gy = /* @__PURE__ */ kO(!0);
function kO(n) {
  return ({ state: e, dispatch: t }) => {
    if (e.readOnly)
      return !1;
    let i = e.changeByRange((s) => {
      let { from: r, to: o } = s, l = e.doc.lineAt(r), a = !n && r == o && Oy(e, r);
      n && (r = o = (o <= l.to ? l : e.doc.lineAt(o)).to);
      let h = new jl(e, { simulateBreak: r, simulateDoubleBreak: !!a }), c = Wp(h, r);
      for (c == null && (c = Zl(/^\s*/.exec(e.doc.lineAt(r).text)[0], e.tabSize)); o < l.to && /\s/.test(l.text[o - l.from]); )
        o++;
      a ? { from: r, to: o } = a : r > l.from && r < l.from + 100 && !/\S/.test(l.text.slice(0, r)) && (r = l.from);
      let f = ["", dl(e, c)];
      return a && f.push(dl(e, h.lineIndent(l.from, -1))), {
        changes: { from: r, to: o, insert: Re.of(f) },
        range: B.cursor(r + 1 + f[1].length)
      };
    });
    return t(e.update(i, { scrollIntoView: !0, userEvent: "input" })), !0;
  };
}
function wc(n, e) {
  let t = -1;
  return n.changeByRange((i) => {
    let s = [];
    for (let o = i.from; o <= i.to; ) {
      let l = n.doc.lineAt(o);
      l.number > t && (i.empty || i.to > l.from) && (e(l, s, i), t = l.number), o = l.to + 1;
    }
    let r = n.changes(s);
    return {
      changes: s,
      range: B.range(r.mapPos(i.anchor, 1), r.mapPos(i.head, 1))
    };
  });
}
const my = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = /* @__PURE__ */ Object.create(null), i = new jl(n, { overrideIndentation: (r) => {
    let o = t[r];
    return o ?? -1;
  } }), s = wc(n, (r, o, l) => {
    let a = Wp(i, r.from);
    if (a == null)
      return;
    /\S/.test(r.text) || (a = 0);
    let h = /^\s*/.exec(r.text)[0], c = dl(n, a);
    (h != c || l.from < r.from + h.length) && (t[r.from] = a, o.push({ from: r.from, to: r.from + h.length, insert: c }));
  });
  return s.changes.empty || e(n.update(s, { userEvent: "indent" })), !0;
}, vy = ({ state: n, dispatch: e }) => n.readOnly ? !1 : (e(n.update(wc(n, (t, i) => {
  i.push({ from: t.from, insert: n.facet(Ll) });
}), { userEvent: "input.indent" })), !0), by = ({ state: n, dispatch: e }) => n.readOnly ? !1 : (e(n.update(wc(n, (t, i) => {
  let s = /^\s*/.exec(t.text)[0];
  if (!s)
    return;
  let r = Zl(s, n.tabSize), o = 0, l = dl(n, Math.max(0, r - ul(n)));
  for (; o < s.length && o < l.length && s.charCodeAt(o) == l.charCodeAt(o); )
    o++;
  i.push({ from: t.from + o, to: t.from + s.length, insert: l.slice(o) });
}), { userEvent: "delete.dedent" })), !0), yy = (n) => (n.setTabFocusMode(), !0), wy = [
  { key: "Ctrl-b", run: iO, shift: fO, preventDefault: !0 },
  { key: "Ctrl-f", run: nO, shift: uO },
  { key: "Ctrl-p", run: oO, shift: OO },
  { key: "Ctrl-n", run: lO, shift: gO },
  { key: "Ctrl-a", run: jb, shift: Fb },
  { key: "Ctrl-e", run: zb, shift: Hb },
  { key: "Ctrl-d", run: yO },
  { key: "Ctrl-h", run: Zh },
  { key: "Ctrl-k", run: ry },
  { key: "Ctrl-Alt-h", run: xO },
  { key: "Ctrl-o", run: ay },
  { key: "Ctrl-t", run: hy },
  { key: "Ctrl-v", run: Th }
], xy = /* @__PURE__ */ [
  { key: "ArrowLeft", run: iO, shift: fO, preventDefault: !0 },
  { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: Tb, shift: Wb, preventDefault: !0 },
  { mac: "Cmd-ArrowLeft", run: Eb, shift: Gb, preventDefault: !0 },
  { key: "ArrowRight", run: nO, shift: uO, preventDefault: !0 },
  { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: Zb, shift: Yb, preventDefault: !0 },
  { mac: "Cmd-ArrowRight", run: Lb, shift: Ub, preventDefault: !0 },
  { key: "ArrowUp", run: oO, shift: OO, preventDefault: !0 },
  { mac: "Cmd-ArrowUp", run: tu, shift: nu },
  { mac: "Ctrl-ArrowUp", run: Kf, shift: Jf },
  { key: "ArrowDown", run: lO, shift: gO, preventDefault: !0 },
  { mac: "Cmd-ArrowDown", run: iu, shift: su },
  { mac: "Ctrl-ArrowDown", run: Th, shift: eu },
  { key: "PageUp", run: Kf, shift: Jf },
  { key: "PageDown", run: Th, shift: eu },
  { key: "Home", run: Xb, shift: Nb, preventDefault: !0 },
  { key: "Mod-Home", run: tu, shift: nu },
  { key: "End", run: Mb, shift: Vb, preventDefault: !0 },
  { key: "Mod-End", run: iu, shift: su },
  { key: "Enter", run: ru, shift: ru },
  { key: "Mod-a", run: Kb },
  { key: "Backspace", run: Zh, shift: Zh, preventDefault: !0 },
  { key: "Delete", run: yO, preventDefault: !0 },
  { key: "Mod-Backspace", mac: "Alt-Backspace", run: xO, preventDefault: !0 },
  { key: "Mod-Delete", mac: "Alt-Delete", run: sy, preventDefault: !0 },
  { mac: "Mod-Backspace", run: oy, preventDefault: !0 },
  { mac: "Mod-Delete", run: ly, preventDefault: !0 }
].concat(/* @__PURE__ */ wy.map((n) => ({ mac: n.key, run: n.run, shift: n.shift }))), Sy = /* @__PURE__ */ [
  { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: Ab, shift: qb },
  { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: Rb, shift: Bb },
  { key: "Alt-ArrowUp", run: cy },
  { key: "Shift-Alt-ArrowUp", run: uy },
  { key: "Alt-ArrowDown", run: fy },
  { key: "Shift-Alt-ArrowDown", run: dy },
  { key: "Mod-Alt-ArrowUp", run: ty },
  { key: "Mod-Alt-ArrowDown", run: iy },
  { key: "Escape", run: ny },
  { key: "Mod-Enter", run: gy },
  { key: "Alt-l", mac: "Ctrl-l", run: Jb },
  { key: "Mod-i", run: ey, preventDefault: !0 },
  { key: "Mod-[", run: by },
  { key: "Mod-]", run: vy },
  { key: "Mod-Alt-\\", run: my },
  { key: "Shift-Mod-k", run: py },
  { key: "Shift-Mod-\\", run: Ib },
  { key: "Mod-/", run: cb },
  { key: "Alt-A", run: ub },
  { key: "Ctrl-m", mac: "Shift-Alt-m", run: yy }
].concat(xy);
class Ol {
  /**
  @internal
  */
  constructor(e, t, i, s, r, o, l, a, h, c = 0, f) {
    this.p = e, this.stack = t, this.state = i, this.reducePos = s, this.pos = r, this.score = o, this.buffer = l, this.bufferBase = a, this.curContext = h, this.lookAhead = c, this.parent = f;
  }
  /**
  @internal
  */
  toString() {
    return `[${this.stack.filter((e, t) => t % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
  }
  // Start an empty stack
  /**
  @internal
  */
  static start(e, t, i = 0) {
    let s = e.parser.context;
    return new Ol(e, [], t, i, i, 0, [], 0, s ? new ou(s, s.start) : null, 0, null);
  }
  /**
  The stack's current [context](#lr.ContextTracker) value, if
  any. Its type will depend on the context tracker's type
  parameter, or it will be `null` if there is no context
  tracker.
  */
  get context() {
    return this.curContext ? this.curContext.context : null;
  }
  // Push a state onto the stack, tracking its start position as well
  // as the buffer base at that point.
  /**
  @internal
  */
  pushState(e, t) {
    this.stack.push(this.state, t, this.bufferBase + this.buffer.length), this.state = e;
  }
  // Apply a reduce action
  /**
  @internal
  */
  reduce(e) {
    var t;
    let i = e >> 19, s = e & 65535, { parser: r } = this.p, o = this.reducePos < this.pos - 25 && this.setLookAhead(this.pos), l = r.dynamicPrecedence(s);
    if (l && (this.score += l), i == 0) {
      s < r.minRepeatTerm && this.reducePos < this.pos && (this.reducePos = this.pos), this.pushState(r.getGoto(this.state, s, !0), this.reducePos), s < r.minRepeatTerm && this.storeNode(s, this.reducePos, this.reducePos, o ? 8 : 4, !0), this.reduceContext(s, this.reducePos);
      return;
    }
    let a = this.stack.length - (i - 1) * 3 - (e & 262144 ? 6 : 0), h = a ? this.stack[a - 2] : this.p.ranges[0].from;
    s < r.minRepeatTerm && h == this.reducePos && this.reducePos < this.pos && (this.reducePos = this.pos);
    let c = this.reducePos - h;
    c >= 2e3 && !(!((t = this.p.parser.nodeSet.types[s]) === null || t === void 0) && t.isAnonymous) && (h == this.p.lastBigReductionStart ? (this.p.bigReductionCount++, this.p.lastBigReductionSize = c) : this.p.lastBigReductionSize < c && (this.p.bigReductionCount = 1, this.p.lastBigReductionStart = h, this.p.lastBigReductionSize = c));
    let f = a ? this.stack[a - 1] : 0, d = this.bufferBase + this.buffer.length - f;
    if (s < r.minRepeatTerm || e & 131072) {
      let p = r.stateFlag(
        this.state,
        1
        /* StateFlag.Skipped */
      ) ? this.pos : this.reducePos;
      this.storeNode(s, h, p, d + 4, !0);
    }
    if (e & 262144)
      this.state = this.stack[a];
    else {
      let p = this.stack[a - 3];
      this.state = r.getGoto(p, s, !0);
    }
    for (; this.stack.length > a; )
      this.stack.pop();
    this.reduceContext(s, h);
  }
  // Shift a value into the buffer
  /**
  @internal
  */
  storeNode(e, t, i, s = 4, r = !1) {
    if (e == 0 && (!this.stack.length || this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)) {
      let o = this.buffer.length;
      if (o > 0 && this.buffer[o - 4] == 0 && this.buffer[o - 1] > -1) {
        if (t == i)
          return;
        if (this.buffer[o - 2] >= t) {
          this.buffer[o - 2] = i;
          return;
        }
      }
    }
    if (!r || this.pos == i)
      this.buffer.push(e, t, i, s);
    else {
      let o = this.buffer.length;
      if (o > 0 && (this.buffer[o - 4] != 0 || this.buffer[o - 1] < 0)) {
        let l = !1;
        for (let a = o; a > 0 && this.buffer[a - 2] > i; a -= 4)
          if (this.buffer[a - 1] >= 0) {
            l = !0;
            break;
          }
        if (l)
          for (; o > 0 && this.buffer[o - 2] > i; )
            this.buffer[o] = this.buffer[o - 4], this.buffer[o + 1] = this.buffer[o - 3], this.buffer[o + 2] = this.buffer[o - 2], this.buffer[o + 3] = this.buffer[o - 1], o -= 4, s > 4 && (s -= 4);
      }
      this.buffer[o] = e, this.buffer[o + 1] = t, this.buffer[o + 2] = i, this.buffer[o + 3] = s;
    }
  }
  // Apply a shift action
  /**
  @internal
  */
  shift(e, t, i, s) {
    if (e & 131072)
      this.pushState(e & 65535, this.pos);
    else if ((e & 262144) == 0) {
      let r = e, { parser: o } = this.p;
      this.pos = s;
      let l = o.stateFlag(
        r,
        1
        /* StateFlag.Skipped */
      );
      !l && (s > i || t <= o.maxNode) && (this.reducePos = s), this.pushState(r, l ? i : Math.min(i, this.reducePos)), this.shiftContext(t, i), t <= o.maxNode && this.buffer.push(t, i, s, 4);
    } else
      this.pos = s, this.shiftContext(t, i), t <= this.p.parser.maxNode && this.buffer.push(t, i, s, 4);
  }
  // Apply an action
  /**
  @internal
  */
  apply(e, t, i, s) {
    e & 65536 ? this.reduce(e) : this.shift(e, t, i, s);
  }
  // Add a prebuilt (reused) node into the buffer.
  /**
  @internal
  */
  useNode(e, t) {
    let i = this.p.reused.length - 1;
    (i < 0 || this.p.reused[i] != e) && (this.p.reused.push(e), i++);
    let s = this.pos;
    this.reducePos = this.pos = s + e.length, this.pushState(t, s), this.buffer.push(
      i,
      s,
      this.reducePos,
      -1
      /* size == -1 means this is a reused value */
    ), this.curContext && this.updateContext(this.curContext.tracker.reuse(this.curContext.context, e, this, this.p.stream.reset(this.pos - e.length)));
  }
  // Split the stack. Due to the buffer sharing and the fact
  // that `this.stack` tends to stay quite shallow, this isn't very
  // expensive.
  /**
  @internal
  */
  split() {
    let e = this, t = e.buffer.length;
    for (t && e.buffer[t - 4] == 0 && (t -= 4); t > 0 && e.buffer[t - 2] > e.reducePos; )
      t -= 4;
    let i = e.buffer.slice(t), s = e.bufferBase + t;
    for (; e && s == e.bufferBase; )
      e = e.parent;
    return new Ol(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, i, s, this.curContext, this.lookAhead, e);
  }
  // Try to recover from an error by 'deleting' (ignoring) one token.
  /**
  @internal
  */
  recoverByDelete(e, t) {
    let i = e <= this.p.parser.maxNode;
    i && this.storeNode(e, this.pos, t, 4), this.storeNode(0, this.pos, t, i ? 8 : 4), this.pos = this.reducePos = t, this.score -= 190;
  }
  /**
  Check if the given term would be able to be shifted (optionally
  after some reductions) on this stack. This can be useful for
  external tokenizers that want to make sure they only provide a
  given token when it applies.
  */
  canShift(e) {
    for (let t = new Qy(this); ; ) {
      let i = this.p.parser.stateSlot(
        t.state,
        4
        /* ParseState.DefaultReduce */
      ) || this.p.parser.hasAction(t.state, e);
      if (i == 0)
        return !1;
      if ((i & 65536) == 0)
        return !0;
      t.reduce(i);
    }
  }
  // Apply up to Recover.MaxNext recovery actions that conceptually
  // inserts some missing token or rule.
  /**
  @internal
  */
  recoverByInsert(e) {
    if (this.stack.length >= 300)
      return [];
    let t = this.p.parser.nextStates(this.state);
    if (t.length > 8 || this.stack.length >= 120) {
      let s = [];
      for (let r = 0, o; r < t.length; r += 2)
        (o = t[r + 1]) != this.state && this.p.parser.hasAction(o, e) && s.push(t[r], o);
      if (this.stack.length < 120)
        for (let r = 0; s.length < 8 && r < t.length; r += 2) {
          let o = t[r + 1];
          s.some((l, a) => a & 1 && l == o) || s.push(t[r], o);
        }
      t = s;
    }
    let i = [];
    for (let s = 0; s < t.length && i.length < 4; s += 2) {
      let r = t[s + 1];
      if (r == this.state)
        continue;
      let o = this.split();
      o.pushState(r, this.pos), o.storeNode(0, o.pos, o.pos, 4, !0), o.shiftContext(t[s], this.pos), o.reducePos = this.pos, o.score -= 200, i.push(o);
    }
    return i;
  }
  // Force a reduce, if possible. Return false if that can't
  // be done.
  /**
  @internal
  */
  forceReduce() {
    let { parser: e } = this.p, t = e.stateSlot(
      this.state,
      5
      /* ParseState.ForcedReduce */
    );
    if ((t & 65536) == 0)
      return !1;
    if (!e.validAction(this.state, t)) {
      let i = t >> 19, s = t & 65535, r = this.stack.length - i * 3;
      if (r < 0 || e.getGoto(this.stack[r], s, !1) < 0) {
        let o = this.findForcedReduction();
        if (o == null)
          return !1;
        t = o;
      }
      this.storeNode(0, this.pos, this.pos, 4, !0), this.score -= 100;
    }
    return this.reducePos = this.pos, this.reduce(t), !0;
  }
  /**
  Try to scan through the automaton to find some kind of reduction
  that can be applied. Used when the regular ForcedReduce field
  isn't a valid action. @internal
  */
  findForcedReduction() {
    let { parser: e } = this.p, t = [], i = (s, r) => {
      if (!t.includes(s))
        return t.push(s), e.allActions(s, (o) => {
          if (!(o & 393216)) if (o & 65536) {
            let l = (o >> 19) - r;
            if (l > 1) {
              let a = o & 65535, h = this.stack.length - l * 3;
              if (h >= 0 && e.getGoto(this.stack[h], a, !1) >= 0)
                return l << 19 | 65536 | a;
            }
          } else {
            let l = i(o, r + 1);
            if (l != null)
              return l;
          }
        });
    };
    return i(this.state, 0);
  }
  /**
  @internal
  */
  forceAll() {
    for (; !this.p.parser.stateFlag(
      this.state,
      2
      /* StateFlag.Accepting */
    ); )
      if (!this.forceReduce()) {
        this.storeNode(0, this.pos, this.pos, 4, !0);
        break;
      }
    return this;
  }
  /**
  Check whether this state has no further actions (assumed to be a direct descendant of the
  top state, since any other states must be able to continue
  somehow). @internal
  */
  get deadEnd() {
    if (this.stack.length != 3)
      return !1;
    let { parser: e } = this.p;
    return e.data[e.stateSlot(
      this.state,
      1
      /* ParseState.Actions */
    )] == 65535 && !e.stateSlot(
      this.state,
      4
      /* ParseState.DefaultReduce */
    );
  }
  /**
  Restart the stack (put it back in its start state). Only safe
  when this.stack.length == 3 (state is directly below the top
  state). @internal
  */
  restart() {
    this.storeNode(0, this.pos, this.pos, 4, !0), this.state = this.stack[0], this.stack.length = 0;
  }
  /**
  @internal
  */
  sameState(e) {
    if (this.state != e.state || this.stack.length != e.stack.length)
      return !1;
    for (let t = 0; t < this.stack.length; t += 3)
      if (this.stack[t] != e.stack[t])
        return !1;
    return !0;
  }
  /**
  Get the parser used by this stack.
  */
  get parser() {
    return this.p.parser;
  }
  /**
  Test whether a given dialect (by numeric ID, as exported from
  the terms file) is enabled.
  */
  dialectEnabled(e) {
    return this.p.parser.dialect.flags[e];
  }
  shiftContext(e, t) {
    this.curContext && this.updateContext(this.curContext.tracker.shift(this.curContext.context, e, this, this.p.stream.reset(t)));
  }
  reduceContext(e, t) {
    this.curContext && this.updateContext(this.curContext.tracker.reduce(this.curContext.context, e, this, this.p.stream.reset(t)));
  }
  /**
  @internal
  */
  emitContext() {
    let e = this.buffer.length - 1;
    (e < 0 || this.buffer[e] != -3) && this.buffer.push(this.curContext.hash, this.pos, this.pos, -3);
  }
  /**
  @internal
  */
  emitLookAhead() {
    let e = this.buffer.length - 1;
    (e < 0 || this.buffer[e] != -4) && this.buffer.push(this.lookAhead, this.pos, this.pos, -4);
  }
  updateContext(e) {
    if (e != this.curContext.context) {
      let t = new ou(this.curContext.tracker, e);
      t.hash != this.curContext.hash && this.emitContext(), this.curContext = t;
    }
  }
  /**
  @internal
  */
  setLookAhead(e) {
    return e <= this.lookAhead ? !1 : (this.emitLookAhead(), this.lookAhead = e, !0);
  }
  /**
  @internal
  */
  close() {
    this.curContext && this.curContext.tracker.strict && this.emitContext(), this.lookAhead > 0 && this.emitLookAhead();
  }
}
class ou {
  constructor(e, t) {
    this.tracker = e, this.context = t, this.hash = e.strict ? e.hash(t) : 0;
  }
}
class Qy {
  constructor(e) {
    this.start = e, this.state = e.state, this.stack = e.stack, this.base = this.stack.length;
  }
  reduce(e) {
    let t = e & 65535, i = e >> 19;
    i == 0 ? (this.stack == this.start.stack && (this.stack = this.stack.slice()), this.stack.push(this.state, 0, 0), this.base += 3) : this.base -= (i - 1) * 3;
    let s = this.start.p.parser.getGoto(this.stack[this.base - 3], t, !0);
    this.state = s;
  }
}
class gl {
  constructor(e, t, i) {
    this.stack = e, this.pos = t, this.index = i, this.buffer = e.buffer, this.index == 0 && this.maybeNext();
  }
  static create(e, t = e.bufferBase + e.buffer.length) {
    return new gl(e, t, t - e.bufferBase);
  }
  maybeNext() {
    let e = this.stack.parent;
    e != null && (this.index = this.stack.bufferBase - e.bufferBase, this.stack = e, this.buffer = e.buffer);
  }
  get id() {
    return this.buffer[this.index - 4];
  }
  get start() {
    return this.buffer[this.index - 3];
  }
  get end() {
    return this.buffer[this.index - 2];
  }
  get size() {
    return this.buffer[this.index - 1];
  }
  next() {
    this.index -= 4, this.pos -= 4, this.index == 0 && this.maybeNext();
  }
  fork() {
    return new gl(this.stack, this.pos, this.index);
  }
}
function Sr(n, e = Uint16Array) {
  if (typeof n != "string")
    return n;
  let t = null;
  for (let i = 0, s = 0; i < n.length; ) {
    let r = 0;
    for (; ; ) {
      let o = n.charCodeAt(i++), l = !1;
      if (o == 126) {
        r = 65535;
        break;
      }
      o >= 92 && o--, o >= 34 && o--;
      let a = o - 32;
      if (a >= 46 && (a -= 46, l = !0), r += a, l)
        break;
      r *= 46;
    }
    t ? t[s++] = r : t = new e(r);
  }
  return t;
}
class Vo {
  constructor() {
    this.start = -1, this.value = -1, this.end = -1, this.extended = -1, this.lookAhead = 0, this.mask = 0, this.context = 0;
  }
}
const lu = new Vo();
class ky {
  /**
  @internal
  */
  constructor(e, t) {
    this.input = e, this.ranges = t, this.chunk = "", this.chunkOff = 0, this.chunk2 = "", this.chunk2Pos = 0, this.next = -1, this.token = lu, this.rangeIndex = 0, this.pos = this.chunkPos = t[0].from, this.range = t[0], this.end = t[t.length - 1].to, this.readNext();
  }
  /**
  @internal
  */
  resolveOffset(e, t) {
    let i = this.range, s = this.rangeIndex, r = this.pos + e;
    for (; r < i.from; ) {
      if (!s)
        return null;
      let o = this.ranges[--s];
      r -= i.from - o.to, i = o;
    }
    for (; t < 0 ? r > i.to : r >= i.to; ) {
      if (s == this.ranges.length - 1)
        return null;
      let o = this.ranges[++s];
      r += o.from - i.to, i = o;
    }
    return r;
  }
  /**
  @internal
  */
  clipPos(e) {
    if (e >= this.range.from && e < this.range.to)
      return e;
    for (let t of this.ranges)
      if (t.to > e)
        return Math.max(e, t.from);
    return this.end;
  }
  /**
  Look at a code unit near the stream position. `.peek(0)` equals
  `.next`, `.peek(-1)` gives you the previous character, and so
  on.
  
  Note that looking around during tokenizing creates dependencies
  on potentially far-away content, which may reduce the
  effectiveness incremental parsing—when looking forward—or even
  cause invalid reparses when looking backward more than 25 code
  units, since the library does not track lookbehind.
  */
  peek(e) {
    let t = this.chunkOff + e, i, s;
    if (t >= 0 && t < this.chunk.length)
      i = this.pos + e, s = this.chunk.charCodeAt(t);
    else {
      let r = this.resolveOffset(e, 1);
      if (r == null)
        return -1;
      if (i = r, i >= this.chunk2Pos && i < this.chunk2Pos + this.chunk2.length)
        s = this.chunk2.charCodeAt(i - this.chunk2Pos);
      else {
        let o = this.rangeIndex, l = this.range;
        for (; l.to <= i; )
          l = this.ranges[++o];
        this.chunk2 = this.input.chunk(this.chunk2Pos = i), i + this.chunk2.length > l.to && (this.chunk2 = this.chunk2.slice(0, l.to - i)), s = this.chunk2.charCodeAt(0);
      }
    }
    return i >= this.token.lookAhead && (this.token.lookAhead = i + 1), s;
  }
  /**
  Accept a token. By default, the end of the token is set to the
  current stream position, but you can pass an offset (relative to
  the stream position) to change that.
  */
  acceptToken(e, t = 0) {
    let i = t ? this.resolveOffset(t, -1) : this.pos;
    if (i == null || i < this.token.start)
      throw new RangeError("Token end out of bounds");
    this.token.value = e, this.token.end = i;
  }
  /**
  Accept a token ending at a specific given position.
  */
  acceptTokenTo(e, t) {
    this.token.value = e, this.token.end = t;
  }
  getChunk() {
    if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
      let { chunk: e, chunkPos: t } = this;
      this.chunk = this.chunk2, this.chunkPos = this.chunk2Pos, this.chunk2 = e, this.chunk2Pos = t, this.chunkOff = this.pos - this.chunkPos;
    } else {
      this.chunk2 = this.chunk, this.chunk2Pos = this.chunkPos;
      let e = this.input.chunk(this.pos), t = this.pos + e.length;
      this.chunk = t > this.range.to ? e.slice(0, this.range.to - this.pos) : e, this.chunkPos = this.pos, this.chunkOff = 0;
    }
  }
  readNext() {
    return this.chunkOff >= this.chunk.length && (this.getChunk(), this.chunkOff == this.chunk.length) ? this.next = -1 : this.next = this.chunk.charCodeAt(this.chunkOff);
  }
  /**
  Move the stream forward N (defaults to 1) code units. Returns
  the new value of [`next`](#lr.InputStream.next).
  */
  advance(e = 1) {
    for (this.chunkOff += e; this.pos + e >= this.range.to; ) {
      if (this.rangeIndex == this.ranges.length - 1)
        return this.setDone();
      e -= this.range.to - this.pos, this.range = this.ranges[++this.rangeIndex], this.pos = this.range.from;
    }
    return this.pos += e, this.pos >= this.token.lookAhead && (this.token.lookAhead = this.pos + 1), this.readNext();
  }
  setDone() {
    return this.pos = this.chunkPos = this.end, this.range = this.ranges[this.rangeIndex = this.ranges.length - 1], this.chunk = "", this.next = -1;
  }
  /**
  @internal
  */
  reset(e, t) {
    if (t ? (this.token = t, t.start = e, t.lookAhead = e + 1, t.value = t.extended = -1) : this.token = lu, this.pos != e) {
      if (this.pos = e, e == this.end)
        return this.setDone(), this;
      for (; e < this.range.from; )
        this.range = this.ranges[--this.rangeIndex];
      for (; e >= this.range.to; )
        this.range = this.ranges[++this.rangeIndex];
      e >= this.chunkPos && e < this.chunkPos + this.chunk.length ? this.chunkOff = e - this.chunkPos : (this.chunk = "", this.chunkOff = 0), this.readNext();
    }
    return this;
  }
  /**
  @internal
  */
  read(e, t) {
    if (e >= this.chunkPos && t <= this.chunkPos + this.chunk.length)
      return this.chunk.slice(e - this.chunkPos, t - this.chunkPos);
    if (e >= this.chunk2Pos && t <= this.chunk2Pos + this.chunk2.length)
      return this.chunk2.slice(e - this.chunk2Pos, t - this.chunk2Pos);
    if (e >= this.range.from && t <= this.range.to)
      return this.input.read(e, t);
    let i = "";
    for (let s of this.ranges) {
      if (s.from >= t)
        break;
      s.to > e && (i += this.input.read(Math.max(s.from, e), Math.min(s.to, t)));
    }
    return i;
  }
}
class Ms {
  constructor(e, t) {
    this.data = e, this.id = t;
  }
  token(e, t) {
    let { parser: i } = t.p;
    $O(this.data, e, t, this.id, i.data, i.tokenPrecTable);
  }
}
Ms.prototype.contextual = Ms.prototype.fallback = Ms.prototype.extend = !1;
class Ch {
  constructor(e, t, i) {
    this.precTable = t, this.elseToken = i, this.data = typeof e == "string" ? Sr(e) : e;
  }
  token(e, t) {
    let i = e.pos, s = 0;
    for (; ; ) {
      let r = e.next < 0, o = e.resolveOffset(1, 1);
      if ($O(this.data, e, t, 0, this.data, this.precTable), e.token.value > -1)
        break;
      if (this.elseToken == null)
        return;
      if (r || s++, o == null)
        break;
      e.reset(o, e.token);
    }
    s && (e.reset(i, e.token), e.acceptToken(this.elseToken, s));
  }
}
Ch.prototype.contextual = Ms.prototype.fallback = Ms.prototype.extend = !1;
class ao {
  /**
  Create a tokenizer. The first argument is the function that,
  given an input stream, scans for the types of tokens it
  recognizes at the stream's position, and calls
  [`acceptToken`](#lr.InputStream.acceptToken) when it finds
  one.
  */
  constructor(e, t = {}) {
    this.token = e, this.contextual = !!t.contextual, this.fallback = !!t.fallback, this.extend = !!t.extend;
  }
}
function $O(n, e, t, i, s, r) {
  let o = 0, l = 1 << i, { dialect: a } = t.p.parser;
  e: for (; (l & n[o]) != 0; ) {
    let h = n[o + 1];
    for (let p = o + 3; p < h; p += 2)
      if ((n[p + 1] & l) > 0) {
        let O = n[p];
        if (a.allows(O) && (e.token.value == -1 || e.token.value == O || $y(O, e.token.value, s, r))) {
          e.acceptToken(O);
          break;
        }
      }
    let c = e.next, f = 0, d = n[o + 2];
    if (e.next < 0 && d > f && n[h + d * 3 - 3] == 65535) {
      o = n[h + d * 3 - 1];
      continue e;
    }
    for (; f < d; ) {
      let p = f + d >> 1, O = h + p + (p << 1), g = n[O], m = n[O + 1] || 65536;
      if (c < g)
        d = p;
      else if (c >= m)
        f = p + 1;
      else {
        o = n[O + 2], e.advance();
        continue e;
      }
    }
    break;
  }
}
function au(n, e, t) {
  for (let i = e, s; (s = n[i]) != 65535; i++)
    if (s == t)
      return i - e;
  return -1;
}
function $y(n, e, t, i) {
  let s = au(t, i, e);
  return s < 0 || au(t, i, n) < s;
}
const Ht = typeof process < "u" && process.env && /\bparse\b/.test(process.env.LOG);
let ba = null;
function hu(n, e, t) {
  let i = n.cursor(Je.IncludeAnonymous);
  for (i.moveTo(e); ; )
    if (!(t < 0 ? i.childBefore(e) : i.childAfter(e)))
      for (; ; ) {
        if ((t < 0 ? i.to < e : i.from > e) && !i.type.isError)
          return t < 0 ? Math.max(0, Math.min(
            i.to - 1,
            e - 25
            /* Lookahead.Margin */
          )) : Math.min(n.length, Math.max(
            i.from + 1,
            e + 25
            /* Lookahead.Margin */
          ));
        if (t < 0 ? i.prevSibling() : i.nextSibling())
          break;
        if (!i.parent())
          return t < 0 ? 0 : n.length;
      }
}
class Py {
  constructor(e, t) {
    this.fragments = e, this.nodeSet = t, this.i = 0, this.fragment = null, this.safeFrom = -1, this.safeTo = -1, this.trees = [], this.start = [], this.index = [], this.nextFragment();
  }
  nextFragment() {
    let e = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
    if (e) {
      for (this.safeFrom = e.openStart ? hu(e.tree, e.from + e.offset, 1) - e.offset : e.from, this.safeTo = e.openEnd ? hu(e.tree, e.to + e.offset, -1) - e.offset : e.to; this.trees.length; )
        this.trees.pop(), this.start.pop(), this.index.pop();
      this.trees.push(e.tree), this.start.push(-e.offset), this.index.push(0), this.nextStart = this.safeFrom;
    } else
      this.nextStart = 1e9;
  }
  // `pos` must be >= any previously given `pos` for this cursor
  nodeAt(e) {
    if (e < this.nextStart)
      return null;
    for (; this.fragment && this.safeTo <= e; )
      this.nextFragment();
    if (!this.fragment)
      return null;
    for (; ; ) {
      let t = this.trees.length - 1;
      if (t < 0)
        return this.nextFragment(), null;
      let i = this.trees[t], s = this.index[t];
      if (s == i.children.length) {
        this.trees.pop(), this.start.pop(), this.index.pop();
        continue;
      }
      let r = i.children[s], o = this.start[t] + i.positions[s];
      if (o > e)
        return this.nextStart = o, null;
      if (r instanceof at) {
        if (o == e) {
          if (o < this.safeFrom)
            return null;
          let l = o + r.length;
          if (l <= this.safeTo) {
            let a = r.prop(Te.lookAhead);
            if (!a || l + a < this.fragment.to)
              return r;
          }
        }
        this.index[t]++, o + r.length >= Math.max(this.safeFrom, e) && (this.trees.push(r), this.start.push(o), this.index.push(0));
      } else
        this.index[t]++, this.nextStart = o + r.length;
    }
  }
}
class _y {
  constructor(e, t) {
    this.stream = t, this.tokens = [], this.mainToken = null, this.actions = [], this.tokens = e.tokenizers.map((i) => new Vo());
  }
  getActions(e) {
    let t = 0, i = null, { parser: s } = e.p, { tokenizers: r } = s, o = s.stateSlot(
      e.state,
      3
      /* ParseState.TokenizerMask */
    ), l = e.curContext ? e.curContext.hash : 0, a = 0;
    for (let h = 0; h < r.length; h++) {
      if ((1 << h & o) == 0)
        continue;
      let c = r[h], f = this.tokens[h];
      if (!(i && !c.fallback) && ((c.contextual || f.start != e.pos || f.mask != o || f.context != l) && (this.updateCachedToken(f, c, e), f.mask = o, f.context = l), f.lookAhead > f.end + 25 && (a = Math.max(f.lookAhead, a)), f.value != 0)) {
        let d = t;
        if (f.extended > -1 && (t = this.addActions(e, f.extended, f.end, t)), t = this.addActions(e, f.value, f.end, t), !c.extend && (i = f, t > d))
          break;
      }
    }
    for (; this.actions.length > t; )
      this.actions.pop();
    return a && e.setLookAhead(a), !i && e.pos == this.stream.end && (i = new Vo(), i.value = e.p.parser.eofTerm, i.start = i.end = e.pos, t = this.addActions(e, i.value, i.end, t)), this.mainToken = i, this.actions;
  }
  getMainToken(e) {
    if (this.mainToken)
      return this.mainToken;
    let t = new Vo(), { pos: i, p: s } = e;
    return t.start = i, t.end = Math.min(i + 1, s.stream.end), t.value = i == s.stream.end ? s.parser.eofTerm : 0, t;
  }
  updateCachedToken(e, t, i) {
    let s = this.stream.clipPos(i.pos);
    if (t.token(this.stream.reset(s, e), i), e.value > -1) {
      let { parser: r } = i.p;
      for (let o = 0; o < r.specialized.length; o++)
        if (r.specialized[o] == e.value) {
          let l = r.specializers[o](this.stream.read(e.start, e.end), i);
          if (l >= 0 && i.p.parser.dialect.allows(l >> 1)) {
            (l & 1) == 0 ? e.value = l >> 1 : e.extended = l >> 1;
            break;
          }
        }
    } else
      e.value = 0, e.end = this.stream.clipPos(s + 1);
  }
  putAction(e, t, i, s) {
    for (let r = 0; r < s; r += 3)
      if (this.actions[r] == e)
        return s;
    return this.actions[s++] = e, this.actions[s++] = t, this.actions[s++] = i, s;
  }
  addActions(e, t, i, s) {
    let { state: r } = e, { parser: o } = e.p, { data: l } = o;
    for (let a = 0; a < 2; a++)
      for (let h = o.stateSlot(
        r,
        a ? 2 : 1
        /* ParseState.Actions */
      ); ; h += 3) {
        if (l[h] == 65535)
          if (l[h + 1] == 1)
            h = nn(l, h + 2);
          else {
            s == 0 && l[h + 1] == 2 && (s = this.putAction(nn(l, h + 2), t, i, s));
            break;
          }
        l[h] == t && (s = this.putAction(nn(l, h + 1), t, i, s));
      }
    return s;
  }
}
class Ty {
  constructor(e, t, i, s) {
    this.parser = e, this.input = t, this.ranges = s, this.recovering = 0, this.nextStackID = 9812, this.minStackPos = 0, this.reused = [], this.stoppedAt = null, this.lastBigReductionStart = -1, this.lastBigReductionSize = 0, this.bigReductionCount = 0, this.stream = new ky(t, s), this.tokens = new _y(e, this.stream), this.topTerm = e.top[1];
    let { from: r } = s[0];
    this.stacks = [Ol.start(this, e.top[0], r)], this.fragments = i.length && this.stream.end - r > e.bufferLength * 4 ? new Py(i, e.nodeSet) : null;
  }
  get parsedPos() {
    return this.minStackPos;
  }
  // Move the parser forward. This will process all parse stacks at
  // `this.pos` and try to advance them to a further position. If no
  // stack for such a position is found, it'll start error-recovery.
  //
  // When the parse is finished, this will return a syntax tree. When
  // not, it returns `null`.
  advance() {
    let e = this.stacks, t = this.minStackPos, i = this.stacks = [], s, r;
    if (this.bigReductionCount > 300 && e.length == 1) {
      let [o] = e;
      for (; o.forceReduce() && o.stack.length && o.stack[o.stack.length - 2] >= this.lastBigReductionStart; )
        ;
      this.bigReductionCount = this.lastBigReductionSize = 0;
    }
    for (let o = 0; o < e.length; o++) {
      let l = e[o];
      for (; ; ) {
        if (this.tokens.mainToken = null, l.pos > t)
          i.push(l);
        else {
          if (this.advanceStack(l, i, e))
            continue;
          {
            s || (s = [], r = []), s.push(l);
            let a = this.tokens.getMainToken(l);
            r.push(a.value, a.end);
          }
        }
        break;
      }
    }
    if (!i.length) {
      let o = s && Ay(s);
      if (o)
        return Ht && console.log("Finish with " + this.stackID(o)), this.stackToTree(o);
      if (this.parser.strict)
        throw Ht && s && console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none")), new SyntaxError("No parse at " + t);
      this.recovering || (this.recovering = 5);
    }
    if (this.recovering && s) {
      let o = this.stoppedAt != null && s[0].pos > this.stoppedAt ? s[0] : this.runRecovery(s, r, i);
      if (o)
        return Ht && console.log("Force-finish " + this.stackID(o)), this.stackToTree(o.forceAll());
    }
    if (this.recovering) {
      let o = this.recovering == 1 ? 1 : this.recovering * 3;
      if (i.length > o)
        for (i.sort((l, a) => a.score - l.score); i.length > o; )
          i.pop();
      i.some((l) => l.reducePos > t) && this.recovering--;
    } else if (i.length > 1) {
      e: for (let o = 0; o < i.length - 1; o++) {
        let l = i[o];
        for (let a = o + 1; a < i.length; a++) {
          let h = i[a];
          if (l.sameState(h) || l.buffer.length > 500 && h.buffer.length > 500)
            if ((l.score - h.score || l.buffer.length - h.buffer.length) > 0)
              i.splice(a--, 1);
            else {
              i.splice(o--, 1);
              continue e;
            }
        }
      }
      i.length > 12 && (i.sort((o, l) => l.score - o.score), i.splice(
        12,
        i.length - 12
        /* Rec.MaxStackCount */
      ));
    }
    this.minStackPos = i[0].pos;
    for (let o = 1; o < i.length; o++)
      i[o].pos < this.minStackPos && (this.minStackPos = i[o].pos);
    return null;
  }
  stopAt(e) {
    if (this.stoppedAt != null && this.stoppedAt < e)
      throw new RangeError("Can't move stoppedAt forward");
    this.stoppedAt = e;
  }
  // Returns an updated version of the given stack, or null if the
  // stack can't advance normally. When `split` and `stacks` are
  // given, stacks split off by ambiguous operations will be pushed to
  // `split`, or added to `stacks` if they move `pos` forward.
  advanceStack(e, t, i) {
    let s = e.pos, { parser: r } = this, o = Ht ? this.stackID(e) + " -> " : "";
    if (this.stoppedAt != null && s > this.stoppedAt)
      return e.forceReduce() ? e : null;
    if (this.fragments) {
      let h = e.curContext && e.curContext.tracker.strict, c = h ? e.curContext.hash : 0;
      for (let f = this.fragments.nodeAt(s); f; ) {
        let d = this.parser.nodeSet.types[f.type.id] == f.type ? r.getGoto(e.state, f.type.id) : -1;
        if (d > -1 && f.length && (!h || (f.prop(Te.contextHash) || 0) == c))
          return e.useNode(f, d), Ht && console.log(o + this.stackID(e) + ` (via reuse of ${r.getName(f.type.id)})`), !0;
        if (!(f instanceof at) || f.children.length == 0 || f.positions[0] > 0)
          break;
        let p = f.children[0];
        if (p instanceof at && f.positions[0] == 0)
          f = p;
        else
          break;
      }
    }
    let l = r.stateSlot(
      e.state,
      4
      /* ParseState.DefaultReduce */
    );
    if (l > 0)
      return e.reduce(l), Ht && console.log(o + this.stackID(e) + ` (via always-reduce ${r.getName(
        l & 65535
        /* Action.ValueMask */
      )})`), !0;
    if (e.stack.length >= 8400)
      for (; e.stack.length > 6e3 && e.forceReduce(); )
        ;
    let a = this.tokens.getActions(e);
    for (let h = 0; h < a.length; ) {
      let c = a[h++], f = a[h++], d = a[h++], p = h == a.length || !i, O = p ? e : e.split(), g = this.tokens.mainToken;
      if (O.apply(c, f, g ? g.start : O.pos, d), Ht && console.log(o + this.stackID(O) + ` (via ${(c & 65536) == 0 ? "shift" : `reduce of ${r.getName(
        c & 65535
        /* Action.ValueMask */
      )}`} for ${r.getName(f)} @ ${s}${O == e ? "" : ", split"})`), p)
        return !0;
      O.pos > s ? t.push(O) : i.push(O);
    }
    return !1;
  }
  // Advance a given stack forward as far as it will go. Returns the
  // (possibly updated) stack if it got stuck, or null if it moved
  // forward and was given to `pushStackDedup`.
  advanceFully(e, t) {
    let i = e.pos;
    for (; ; ) {
      if (!this.advanceStack(e, null, null))
        return !1;
      if (e.pos > i)
        return cu(e, t), !0;
    }
  }
  runRecovery(e, t, i) {
    let s = null, r = !1;
    for (let o = 0; o < e.length; o++) {
      let l = e[o], a = t[o << 1], h = t[(o << 1) + 1], c = Ht ? this.stackID(l) + " -> " : "";
      if (l.deadEnd && (r || (r = !0, l.restart(), Ht && console.log(c + this.stackID(l) + " (restarted)"), this.advanceFully(l, i))))
        continue;
      let f = l.split(), d = c;
      for (let p = 0; p < 10 && f.forceReduce() && (Ht && console.log(d + this.stackID(f) + " (via force-reduce)"), !this.advanceFully(f, i)); p++)
        Ht && (d = this.stackID(f) + " -> ");
      for (let p of l.recoverByInsert(a))
        Ht && console.log(c + this.stackID(p) + " (via recover-insert)"), this.advanceFully(p, i);
      this.stream.end > l.pos ? (h == l.pos && (h++, a = 0), l.recoverByDelete(a, h), Ht && console.log(c + this.stackID(l) + ` (via recover-delete ${this.parser.getName(a)})`), cu(l, i)) : (!s || s.score < f.score) && (s = f);
    }
    return s;
  }
  // Convert the stack's buffer to a syntax tree.
  stackToTree(e) {
    return e.close(), at.build({
      buffer: gl.create(e),
      nodeSet: this.parser.nodeSet,
      topID: this.topTerm,
      maxBufferLength: this.parser.bufferLength,
      reused: this.reused,
      start: this.ranges[0].from,
      length: e.pos - this.ranges[0].from,
      minRepeatType: this.parser.minRepeatTerm
    });
  }
  stackID(e) {
    let t = (ba || (ba = /* @__PURE__ */ new WeakMap())).get(e);
    return t || ba.set(e, t = String.fromCodePoint(this.nextStackID++)), t + e;
  }
}
function cu(n, e) {
  for (let t = 0; t < e.length; t++) {
    let i = e[t];
    if (i.pos == n.pos && i.sameState(n)) {
      e[t].score < n.score && (e[t] = n);
      return;
    }
  }
  e.push(n);
}
class Zy {
  constructor(e, t, i) {
    this.source = e, this.flags = t, this.disabled = i;
  }
  allows(e) {
    return !this.disabled || this.disabled[e] == 0;
  }
}
const ya = (n) => n;
class Cy {
  /**
  Define a context tracker.
  */
  constructor(e) {
    this.start = e.start, this.shift = e.shift || ya, this.reduce = e.reduce || ya, this.reuse = e.reuse || ya, this.hash = e.hash || (() => 0), this.strict = e.strict !== !1;
  }
}
class ml extends jp {
  /**
  @internal
  */
  constructor(e) {
    if (super(), this.wrappers = [], e.version != 14)
      throw new RangeError(`Parser version (${e.version}) doesn't match runtime version (14)`);
    let t = e.nodeNames.split(" ");
    this.minRepeatTerm = t.length;
    for (let l = 0; l < e.repeatNodeCount; l++)
      t.push("");
    let i = Object.keys(e.topRules).map((l) => e.topRules[l][1]), s = [];
    for (let l = 0; l < t.length; l++)
      s.push([]);
    function r(l, a, h) {
      s[l].push([a, a.deserialize(String(h))]);
    }
    if (e.nodeProps)
      for (let l of e.nodeProps) {
        let a = l[0];
        typeof a == "string" && (a = Te[a]);
        for (let h = 1; h < l.length; ) {
          let c = l[h++];
          if (c >= 0)
            r(c, a, l[h++]);
          else {
            let f = l[h + -c];
            for (let d = -c; d > 0; d--)
              r(l[h++], a, f);
            h++;
          }
        }
      }
    this.nodeSet = new dc(t.map((l, a) => Ft.define({
      name: a >= this.minRepeatTerm ? void 0 : l,
      id: a,
      props: s[a],
      top: i.indexOf(a) > -1,
      error: a == 0,
      skipped: e.skippedNodes && e.skippedNodes.indexOf(a) > -1
    }))), e.propSources && (this.nodeSet = this.nodeSet.extend(...e.propSources)), this.strict = !1, this.bufferLength = Mp;
    let o = Sr(e.tokenData);
    this.context = e.context, this.specializerSpecs = e.specialized || [], this.specialized = new Uint16Array(this.specializerSpecs.length);
    for (let l = 0; l < this.specializerSpecs.length; l++)
      this.specialized[l] = this.specializerSpecs[l].term;
    this.specializers = this.specializerSpecs.map(fu), this.states = Sr(e.states, Uint32Array), this.data = Sr(e.stateData), this.goto = Sr(e.goto), this.maxTerm = e.maxTerm, this.tokenizers = e.tokenizers.map((l) => typeof l == "number" ? new Ms(o, l) : l), this.topRules = e.topRules, this.dialects = e.dialects || {}, this.dynamicPrecedences = e.dynamicPrecedences || null, this.tokenPrecTable = e.tokenPrec, this.termNames = e.termNames || null, this.maxNode = this.nodeSet.types.length - 1, this.dialect = this.parseDialect(), this.top = this.topRules[Object.keys(this.topRules)[0]];
  }
  createParse(e, t, i) {
    let s = new Ty(this, e, t, i);
    for (let r of this.wrappers)
      s = r(s, e, t, i);
    return s;
  }
  /**
  Get a goto table entry @internal
  */
  getGoto(e, t, i = !1) {
    let s = this.goto;
    if (t >= s[0])
      return -1;
    for (let r = s[t + 1]; ; ) {
      let o = s[r++], l = o & 1, a = s[r++];
      if (l && i)
        return a;
      for (let h = r + (o >> 1); r < h; r++)
        if (s[r] == e)
          return a;
      if (l)
        return -1;
    }
  }
  /**
  Check if this state has an action for a given terminal @internal
  */
  hasAction(e, t) {
    let i = this.data;
    for (let s = 0; s < 2; s++)
      for (let r = this.stateSlot(
        e,
        s ? 2 : 1
        /* ParseState.Actions */
      ), o; ; r += 3) {
        if ((o = i[r]) == 65535)
          if (i[r + 1] == 1)
            o = i[r = nn(i, r + 2)];
          else {
            if (i[r + 1] == 2)
              return nn(i, r + 2);
            break;
          }
        if (o == t || o == 0)
          return nn(i, r + 1);
      }
    return 0;
  }
  /**
  @internal
  */
  stateSlot(e, t) {
    return this.states[e * 6 + t];
  }
  /**
  @internal
  */
  stateFlag(e, t) {
    return (this.stateSlot(
      e,
      0
      /* ParseState.Flags */
    ) & t) > 0;
  }
  /**
  @internal
  */
  validAction(e, t) {
    return !!this.allActions(e, (i) => i == t ? !0 : null);
  }
  /**
  @internal
  */
  allActions(e, t) {
    let i = this.stateSlot(
      e,
      4
      /* ParseState.DefaultReduce */
    ), s = i ? t(i) : void 0;
    for (let r = this.stateSlot(
      e,
      1
      /* ParseState.Actions */
    ); s == null; r += 3) {
      if (this.data[r] == 65535)
        if (this.data[r + 1] == 1)
          r = nn(this.data, r + 2);
        else
          break;
      s = t(nn(this.data, r + 1));
    }
    return s;
  }
  /**
  Get the states that can follow this one through shift actions or
  goto jumps. @internal
  */
  nextStates(e) {
    let t = [];
    for (let i = this.stateSlot(
      e,
      1
      /* ParseState.Actions */
    ); ; i += 3) {
      if (this.data[i] == 65535)
        if (this.data[i + 1] == 1)
          i = nn(this.data, i + 2);
        else
          break;
      if ((this.data[i + 2] & 1) == 0) {
        let s = this.data[i + 1];
        t.some((r, o) => o & 1 && r == s) || t.push(this.data[i], s);
      }
    }
    return t;
  }
  /**
  Configure the parser. Returns a new parser instance that has the
  given settings modified. Settings not provided in `config` are
  kept from the original parser.
  */
  configure(e) {
    let t = Object.assign(Object.create(ml.prototype), this);
    if (e.props && (t.nodeSet = this.nodeSet.extend(...e.props)), e.top) {
      let i = this.topRules[e.top];
      if (!i)
        throw new RangeError(`Invalid top rule name ${e.top}`);
      t.top = i;
    }
    return e.tokenizers && (t.tokenizers = this.tokenizers.map((i) => {
      let s = e.tokenizers.find((r) => r.from == i);
      return s ? s.to : i;
    })), e.specializers && (t.specializers = this.specializers.slice(), t.specializerSpecs = this.specializerSpecs.map((i, s) => {
      let r = e.specializers.find((l) => l.from == i.external);
      if (!r)
        return i;
      let o = Object.assign(Object.assign({}, i), { external: r.to });
      return t.specializers[s] = fu(o), o;
    })), e.contextTracker && (t.context = e.contextTracker), e.dialect && (t.dialect = this.parseDialect(e.dialect)), e.strict != null && (t.strict = e.strict), e.wrap && (t.wrappers = t.wrappers.concat(e.wrap)), e.bufferLength != null && (t.bufferLength = e.bufferLength), t;
  }
  /**
  Tells you whether any [parse wrappers](#lr.ParserConfig.wrap)
  are registered for this parser.
  */
  hasWrappers() {
    return this.wrappers.length > 0;
  }
  /**
  Returns the name associated with a given term. This will only
  work for all terms when the parser was generated with the
  `--names` option. By default, only the names of tagged terms are
  stored.
  */
  getName(e) {
    return this.termNames ? this.termNames[e] : String(e <= this.maxNode && this.nodeSet.types[e].name || e);
  }
  /**
  The eof term id is always allocated directly after the node
  types. @internal
  */
  get eofTerm() {
    return this.maxNode + 1;
  }
  /**
  The type of top node produced by the parser.
  */
  get topNode() {
    return this.nodeSet.types[this.top[1]];
  }
  /**
  @internal
  */
  dynamicPrecedence(e) {
    let t = this.dynamicPrecedences;
    return t == null ? 0 : t[e] || 0;
  }
  /**
  @internal
  */
  parseDialect(e) {
    let t = Object.keys(this.dialects), i = t.map(() => !1);
    if (e)
      for (let r of e.split(" ")) {
        let o = t.indexOf(r);
        o >= 0 && (i[o] = !0);
      }
    let s = null;
    for (let r = 0; r < t.length; r++)
      if (!i[r])
        for (let o = this.dialects[t[r]], l; (l = this.data[o++]) != 65535; )
          (s || (s = new Uint8Array(this.maxTerm + 1)))[l] = 1;
    return new Zy(e, i, s);
  }
  /**
  Used by the output of the parser generator. Not available to
  user code. @hide
  */
  static deserialize(e) {
    return new ml(e);
  }
}
function nn(n, e) {
  return n[e] | n[e + 1] << 16;
}
function Ay(n) {
  let e = null;
  for (let t of n) {
    let i = t.p.stoppedAt;
    (t.pos == t.p.stream.end || i != null && t.pos > i) && t.p.parser.stateFlag(
      t.state,
      2
      /* StateFlag.Accepting */
    ) && (!e || e.score < t.score) && (e = t);
  }
  return e;
}
function fu(n) {
  if (n.external) {
    let e = n.extend ? 1 : 0;
    return (t, i) => n.external(t, i) << 1 | e;
  }
  return n.get;
}
const Ry = 316, My = 317, uu = 1, Xy = 2, Ey = 3, Ly = 4, jy = 318, zy = 320, Dy = 321, Iy = 5, Wy = 6, Yy = 0, Ah = [
  9,
  10,
  11,
  12,
  13,
  32,
  133,
  160,
  5760,
  8192,
  8193,
  8194,
  8195,
  8196,
  8197,
  8198,
  8199,
  8200,
  8201,
  8202,
  8232,
  8233,
  8239,
  8287,
  12288
], PO = 125, qy = 59, Rh = 47, By = 42, Vy = 43, Ny = 45, Gy = 60, Uy = 44, Fy = 63, Hy = 46, Ky = 91, Jy = new Cy({
  start: !1,
  shift(n, e) {
    return e == Iy || e == Wy || e == zy ? n : e == Dy;
  },
  strict: !1
}), ew = new ao((n, e) => {
  let { next: t } = n;
  (t == PO || t == -1 || e.context) && n.acceptToken(jy);
}, { contextual: !0, fallback: !0 }), tw = new ao((n, e) => {
  let { next: t } = n, i;
  Ah.indexOf(t) > -1 || t == Rh && ((i = n.peek(1)) == Rh || i == By) || t != PO && t != qy && t != -1 && !e.context && n.acceptToken(Ry);
}, { contextual: !0 }), iw = new ao((n, e) => {
  n.next == Ky && !e.context && n.acceptToken(My);
}, { contextual: !0 }), nw = new ao((n, e) => {
  let { next: t } = n;
  if (t == Vy || t == Ny) {
    if (n.advance(), t == n.next) {
      n.advance();
      let i = !e.context && e.canShift(uu);
      n.acceptToken(i ? uu : Xy);
    }
  } else t == Fy && n.peek(1) == Hy && (n.advance(), n.advance(), (n.next < 48 || n.next > 57) && n.acceptToken(Ey));
}, { contextual: !0 });
function wa(n, e) {
  return n >= 65 && n <= 90 || n >= 97 && n <= 122 || n == 95 || n >= 192 || !e && n >= 48 && n <= 57;
}
const sw = new ao((n, e) => {
  if (n.next != Gy || !e.dialectEnabled(Yy) || (n.advance(), n.next == Rh)) return;
  let t = 0;
  for (; Ah.indexOf(n.next) > -1; )
    n.advance(), t++;
  if (wa(n.next, !0)) {
    for (n.advance(), t++; wa(n.next, !1); )
      n.advance(), t++;
    for (; Ah.indexOf(n.next) > -1; )
      n.advance(), t++;
    if (n.next == Uy) return;
    for (let i = 0; ; i++) {
      if (i == 7) {
        if (!wa(n.next, !0)) return;
        break;
      }
      if (n.next != "extends".charCodeAt(i)) break;
      n.advance(), t++;
    }
  }
  n.acceptToken(Ly, -t);
}), rw = zp({
  "get set async static": W.modifier,
  "for while do if else switch try catch finally return throw break continue default case defer": W.controlKeyword,
  "in of await yield void typeof delete instanceof as satisfies": W.operatorKeyword,
  "let var const using function class extends": W.definitionKeyword,
  "import export from": W.moduleKeyword,
  "with debugger new": W.keyword,
  TemplateString: W.special(W.string),
  super: W.atom,
  BooleanLiteral: W.bool,
  this: W.self,
  null: W.null,
  Star: W.modifier,
  VariableName: W.variableName,
  "CallExpression/VariableName TaggedTemplateExpression/VariableName": W.function(W.variableName),
  VariableDefinition: W.definition(W.variableName),
  Label: W.labelName,
  PropertyName: W.propertyName,
  PrivatePropertyName: W.special(W.propertyName),
  "CallExpression/MemberExpression/PropertyName": W.function(W.propertyName),
  "FunctionDeclaration/VariableDefinition": W.function(W.definition(W.variableName)),
  "ClassDeclaration/VariableDefinition": W.definition(W.className),
  "NewExpression/VariableName": W.className,
  PropertyDefinition: W.definition(W.propertyName),
  PrivatePropertyDefinition: W.definition(W.special(W.propertyName)),
  UpdateOp: W.updateOperator,
  "LineComment Hashbang": W.lineComment,
  BlockComment: W.blockComment,
  Number: W.number,
  String: W.string,
  Escape: W.escape,
  ArithOp: W.arithmeticOperator,
  LogicOp: W.logicOperator,
  BitOp: W.bitwiseOperator,
  CompareOp: W.compareOperator,
  RegExp: W.regexp,
  Equals: W.definitionOperator,
  Arrow: W.function(W.punctuation),
  ": Spread": W.punctuation,
  "( )": W.paren,
  "[ ]": W.squareBracket,
  "{ }": W.brace,
  "InterpolationStart InterpolationEnd": W.special(W.brace),
  ".": W.derefOperator,
  ", ;": W.separator,
  "@": W.meta,
  TypeName: W.typeName,
  TypeDefinition: W.definition(W.typeName),
  "type enum interface implements namespace module declare": W.definitionKeyword,
  "abstract global Privacy readonly override": W.modifier,
  "is keyof unique infer asserts": W.operatorKeyword,
  JSXAttributeValue: W.attributeValue,
  JSXText: W.content,
  "JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag": W.angleBracket,
  "JSXIdentifier JSXNameSpacedName": W.tagName,
  "JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName": W.attributeName,
  "JSXBuiltin/JSXIdentifier": W.standard(W.tagName)
}), ow = { __proto__: null, export: 20, as: 25, from: 33, default: 36, async: 41, function: 42, in: 52, out: 55, const: 56, extends: 60, this: 64, true: 72, false: 72, null: 84, void: 88, typeof: 92, super: 108, new: 142, delete: 154, yield: 163, await: 167, class: 172, public: 235, private: 235, protected: 235, readonly: 237, instanceof: 256, satisfies: 259, import: 292, keyof: 349, unique: 353, infer: 359, asserts: 395, is: 397, abstract: 417, implements: 419, type: 421, let: 424, var: 426, using: 429, interface: 435, enum: 439, namespace: 445, module: 447, declare: 451, global: 455, defer: 471, for: 476, of: 485, while: 488, with: 492, do: 496, if: 500, else: 502, switch: 506, case: 512, try: 518, catch: 522, finally: 526, return: 530, throw: 534, break: 538, continue: 542, debugger: 546 }, lw = { __proto__: null, async: 129, get: 131, set: 133, declare: 195, public: 197, private: 197, protected: 197, static: 199, abstract: 201, override: 203, readonly: 209, accessor: 211, new: 401 }, aw = { __proto__: null, "<": 193 }, hw = ml.deserialize({
  version: 14,
  states: "$F|Q%TQlOOO%[QlOOO'_QpOOP(lO`OOO*zQ!0MxO'#CiO+RO#tO'#CjO+aO&jO'#CjO+oO#@ItO'#DaO.QQlO'#DgO.bQlO'#DrO%[QlO'#DzO0fQlO'#ESOOQ!0Lf'#E['#E[O1PQ`O'#EXOOQO'#Ep'#EpOOQO'#Il'#IlO1XQ`O'#GsO1dQ`O'#EoO1iQ`O'#EoO3hQ!0MxO'#JrO6[Q!0MxO'#JsO6uQ`O'#F]O6zQ,UO'#FtOOQ!0Lf'#Ff'#FfO7VO7dO'#FfO9XQMhO'#F|O9`Q`O'#F{OOQ!0Lf'#Js'#JsOOQ!0Lb'#Jr'#JrO9eQ`O'#GwOOQ['#K_'#K_O9pQ`O'#IYO9uQ!0LrO'#IZOOQ['#J`'#J`OOQ['#I_'#I_Q`QlOOQ`QlOOO9}Q!L^O'#DvO:UQlO'#EOO:]QlO'#EQO9kQ`O'#GsO:dQMhO'#CoO:rQ`O'#EnO:}Q`O'#EyO;hQMhO'#FeO;xQ`O'#GsOOQO'#K`'#K`O;}Q`O'#K`O<]Q`O'#G{O<]Q`O'#G|O<]Q`O'#HOO9kQ`O'#HRO=SQ`O'#HUO>kQ`O'#CeO>{Q`O'#HcO?TQ`O'#HiO?TQ`O'#HkO`QlO'#HmO?TQ`O'#HoO?TQ`O'#HrO?YQ`O'#HxO?_Q!0LsO'#IOO%[QlO'#IQO?jQ!0LsO'#ISO?uQ!0LsO'#IUO9uQ!0LrO'#IWO@QQ!0MxO'#CiOASQpO'#DlQOQ`OOO%[QlO'#EQOAjQ`O'#ETO:dQMhO'#EnOAuQ`O'#EnOBQQ!bO'#FeOOQ['#Cg'#CgOOQ!0Lb'#Dq'#DqOOQ!0Lb'#Jv'#JvO%[QlO'#JvOOQO'#Jy'#JyOOQO'#Ih'#IhOCQQpO'#EgOOQ!0Lb'#Ef'#EfOOQ!0Lb'#J}'#J}OC|Q!0MSO'#EgODWQpO'#EWOOQO'#Jx'#JxODlQpO'#JyOEyQpO'#EWODWQpO'#EgPFWO&2DjO'#CbPOOO)CD})CD}OOOO'#I`'#I`OFcO#tO,59UOOQ!0Lh,59U,59UOOOO'#Ia'#IaOFqO&jO,59UOGPQ!L^O'#DcOOOO'#Ic'#IcOGWO#@ItO,59{OOQ!0Lf,59{,59{OGfQlO'#IdOGyQ`O'#JtOIxQ!fO'#JtO+}QlO'#JtOJPQ`O,5:ROJgQ`O'#EpOJtQ`O'#KTOKPQ`O'#KSOKPQ`O'#KSOKXQ`O,5;^OK^Q`O'#KROOQ!0Ln,5:^,5:^OKeQlO,5:^OMcQ!0MxO,5:fONSQ`O,5:nONmQ!0LrO'#KQONtQ`O'#KPO9eQ`O'#KPO! YQ`O'#KPO! bQ`O,5;]O! gQ`O'#KPO!#lQ!fO'#JsOOQ!0Lh'#Ci'#CiO%[QlO'#ESO!$[Q!fO,5:sOOQS'#Jz'#JzOOQO-E<j-E<jO9kQ`O,5=_O!$rQ`O,5=_O!$wQlO,5;ZO!&zQMhO'#EkO!(eQ`O,5;ZO!(jQlO'#DyO!(tQpO,5;dO!(|QpO,5;dO%[QlO,5;dOOQ['#FT'#FTOOQ['#FV'#FVO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eOOQ['#FZ'#FZO!)[QlO,5;tOOQ!0Lf,5;y,5;yOOQ!0Lf,5;z,5;zOOQ!0Lf,5;|,5;|O%[QlO'#IpO!+_Q!0LrO,5<iO%[QlO,5;eO!&zQMhO,5;eO!+|QMhO,5;eO!-nQMhO'#E^O%[QlO,5;wOOQ!0Lf,5;{,5;{O!-uQ,UO'#FjO!.rQ,UO'#KXO!.^Q,UO'#KXO!.yQ,UO'#KXOOQO'#KX'#KXO!/_Q,UO,5<SOOOW,5<`,5<`O!/pQlO'#FvOOOW'#Io'#IoO7VO7dO,5<QO!/wQ,UO'#FxOOQ!0Lf,5<Q,5<QO!0hQ$IUO'#CyOOQ!0Lh'#C}'#C}O!0{O#@ItO'#DRO!1iQMjO,5<eO!1pQ`O,5<hO!3YQ(CWO'#GXO!3jQ`O'#GYO!3oQ`O'#GYO!5_Q(CWO'#G^O!6dQpO'#GbOOQO'#Gn'#GnO!,TQMhO'#GmOOQO'#Gp'#GpO!,TQMhO'#GoO!7VQ$IUO'#JlOOQ!0Lh'#Jl'#JlO!7aQ`O'#JkO!7oQ`O'#JjO!7wQ`O'#CuOOQ!0Lh'#C{'#C{O!8YQ`O'#C}OOQ!0Lh'#DV'#DVOOQ!0Lh'#DX'#DXO!8_Q`O,5<eO1SQ`O'#DZO!,TQMhO'#GPO!,TQMhO'#GRO!8gQ`O'#GTO!8lQ`O'#GUO!3oQ`O'#G[O!,TQMhO'#GaO<]Q`O'#JkO!8qQ`O'#EqO!9`Q`O,5<gOOQ!0Lb'#Cr'#CrO!9hQ`O'#ErO!:bQpO'#EsOOQ!0Lb'#KR'#KRO!:iQ!0LrO'#KaO9uQ!0LrO,5=cO`QlO,5>tOOQ['#Jh'#JhOOQ[,5>u,5>uOOQ[-E<]-E<]O!<hQ!0MxO,5:bO!:]QpO,5:`O!?RQ!0MxO,5:jO%[QlO,5:jO!AiQ!0MxO,5:lOOQO,5@z,5@zO!BYQMhO,5=_O!BhQ!0LrO'#JiO9`Q`O'#JiO!ByQ!0LrO,59ZO!CUQpO,59ZO!C^QMhO,59ZO:dQMhO,59ZO!CiQ`O,5;ZO!CqQ`O'#HbO!DVQ`O'#KdO%[QlO,5;}O!:]QpO,5<PO!D_Q`O,5=zO!DdQ`O,5=zO!DiQ`O,5=zO!DwQ`O,5=zO9uQ!0LrO,5=zO<]Q`O,5=jOOQO'#Cy'#CyO!EOQpO,5=gO!EWQMhO,5=hO!EcQ`O,5=jO!EhQ!bO,5=mO!EpQ`O'#K`O?YQ`O'#HWO9kQ`O'#HYO!EuQ`O'#HYO:dQMhO'#H[O!EzQ`O'#H[OOQ[,5=p,5=pO!FPQ`O'#H]O!FbQ`O'#CoO!FgQ`O,59PO!FqQ`O,59PO!HvQlO,59POOQ[,59P,59PO!IWQ!0LrO,59PO%[QlO,59PO!KcQlO'#HeOOQ['#Hf'#HfOOQ['#Hg'#HgO`QlO,5=}O!KyQ`O,5=}O`QlO,5>TO`QlO,5>VO!LOQ`O,5>XO`QlO,5>ZO!LTQ`O,5>^O!LYQlO,5>dOOQ[,5>j,5>jO%[QlO,5>jO9uQ!0LrO,5>lOOQ[,5>n,5>nO#!dQ`O,5>nOOQ[,5>p,5>pO#!dQ`O,5>pOOQ[,5>r,5>rO##QQpO'#D_O%[QlO'#JvO##sQpO'#JvO##}QpO'#DmO#$`QpO'#DmO#&qQlO'#DmO#&xQ`O'#JuO#'QQ`O,5:WO#'VQ`O'#EtO#'eQ`O'#KUO#'mQ`O,5;_O#'rQpO'#DmO#(PQpO'#EVOOQ!0Lf,5:o,5:oO%[QlO,5:oO#(WQ`O,5:oO?YQ`O,5;YO!CUQpO,5;YO!C^QMhO,5;YO:dQMhO,5;YO#(`Q`O,5@bO#(eQ07dO,5:sOOQO-E<f-E<fO#)kQ!0MSO,5;RODWQpO,5:rO#)uQpO,5:rODWQpO,5;RO!ByQ!0LrO,5:rOOQ!0Lb'#Ej'#EjOOQO,5;R,5;RO%[QlO,5;RO#*SQ!0LrO,5;RO#*_Q!0LrO,5;RO!CUQpO,5:rOOQO,5;X,5;XO#*mQ!0LrO,5;RPOOO'#I^'#I^P#+RO&2DjO,58|POOO,58|,58|OOOO-E<^-E<^OOQ!0Lh1G.p1G.pOOOO-E<_-E<_OOOO,59},59}O#+^Q!bO,59}OOOO-E<a-E<aOOQ!0Lf1G/g1G/gO#+cQ!fO,5?OO+}QlO,5?OOOQO,5?U,5?UO#+mQlO'#IdOOQO-E<b-E<bO#+zQ`O,5@`O#,SQ!fO,5@`O#,ZQ`O,5@nOOQ!0Lf1G/m1G/mO%[QlO,5@oO#,cQ`O'#IjOOQO-E<h-E<hO#,ZQ`O,5@nOOQ!0Lb1G0x1G0xOOQ!0Ln1G/x1G/xOOQ!0Ln1G0Y1G0YO%[QlO,5@lO#,wQ!0LrO,5@lO#-YQ!0LrO,5@lO#-aQ`O,5@kO9eQ`O,5@kO#-iQ`O,5@kO#-wQ`O'#ImO#-aQ`O,5@kOOQ!0Lb1G0w1G0wO!(tQpO,5:uO!)PQpO,5:uOOQS,5:w,5:wO#.iQdO,5:wO#.qQMhO1G2yO9kQ`O1G2yOOQ!0Lf1G0u1G0uO#/PQ!0MxO1G0uO#0UQ!0MvO,5;VOOQ!0Lh'#GW'#GWO#0rQ!0MzO'#JlO!$wQlO1G0uO#2}Q!fO'#JwO%[QlO'#JwO#3XQ`O,5:eOOQ!0Lh'#D_'#D_OOQ!0Lf1G1O1G1OO%[QlO1G1OOOQ!0Lf1G1f1G1fO#3^Q`O1G1OO#5rQ!0MxO1G1PO#5yQ!0MxO1G1PO#8aQ!0MxO1G1PO#8hQ!0MxO1G1PO#;OQ!0MxO1G1PO#=fQ!0MxO1G1PO#=mQ!0MxO1G1PO#=tQ!0MxO1G1PO#@[Q!0MxO1G1PO#@cQ!0MxO1G1PO#BpQ?MtO'#CiO#DkQ?MtO1G1`O#DrQ?MtO'#JsO#EVQ!0MxO,5?[OOQ!0Lb-E<n-E<nO#GdQ!0MxO1G1PO#HaQ!0MzO1G1POOQ!0Lf1G1P1G1PO#IdQMjO'#J|O#InQ`O,5:xO#IsQ!0MxO1G1cO#JgQ,UO,5<WO#JoQ,UO,5<XO#JwQ,UO'#FoO#K`Q`O'#FnOOQO'#KY'#KYOOQO'#In'#InO#KeQ,UO1G1nOOQ!0Lf1G1n1G1nOOOW1G1y1G1yO#KvQ?MtO'#JrO#LQQ`O,5<bO!)[QlO,5<bOOOW-E<m-E<mOOQ!0Lf1G1l1G1lO#LVQpO'#KXOOQ!0Lf,5<d,5<dO#L_QpO,5<dO#LdQMhO'#DTOOOO'#Ib'#IbO#LkO#@ItO,59mOOQ!0Lh,59m,59mO%[QlO1G2PO!8lQ`O'#IrO#LvQ`O,5<zOOQ!0Lh,5<w,5<wO!,TQMhO'#IuO#MdQMjO,5=XO!,TQMhO'#IwO#NVQMjO,5=ZO!&zQMhO,5=]OOQO1G2S1G2SO#NaQ!dO'#CrO#NtQ(CWO'#ErO$ |QpO'#GbO$!dQ!dO,5<sO$!kQ`O'#K[O9eQ`O'#K[O$!yQ`O,5<uO$#aQ!dO'#C{O!,TQMhO,5<tO$#kQ`O'#GZO$$PQ`O,5<tO$$UQ!dO'#GWO$$cQ!dO'#K]O$$mQ`O'#K]O!&zQMhO'#K]O$$rQ`O,5<xO$$wQlO'#JvO$%RQpO'#GcO#$`QpO'#GcO$%dQ`O'#GgO!3oQ`O'#GkO$%iQ!0LrO'#ItO$%tQpO,5<|OOQ!0Lp,5<|,5<|O$%{QpO'#GcO$&YQpO'#GdO$&kQpO'#GdO$&pQMjO,5=XO$'QQMjO,5=ZOOQ!0Lh,5=^,5=^O!,TQMhO,5@VO!,TQMhO,5@VO$'bQ`O'#IyO$'vQ`O,5@UO$(OQ`O,59aOOQ!0Lh,59i,59iO$(TQ`O,5@VO$)TQ$IYO,59uOOQ!0Lh'#Jp'#JpO$)vQMjO,5<kO$*iQMjO,5<mO@zQ`O,5<oOOQ!0Lh,5<p,5<pO$*sQ`O,5<vO$*xQMjO,5<{O$+YQ`O'#KPO!$wQlO1G2RO$+_Q`O1G2RO9eQ`O'#KSO9eQ`O'#EtO%[QlO'#EtO9eQ`O'#I{O$+dQ!0LrO,5@{OOQ[1G2}1G2}OOQ[1G4`1G4`OOQ!0Lf1G/|1G/|OOQ!0Lf1G/z1G/zO$-fQ!0MxO1G0UOOQ[1G2y1G2yO!&zQMhO1G2yO%[QlO1G2yO#.tQ`O1G2yO$/jQMhO'#EkOOQ!0Lb,5@T,5@TO$/wQ!0LrO,5@TOOQ[1G.u1G.uO!ByQ!0LrO1G.uO!CUQpO1G.uO!C^QMhO1G.uO$0YQ`O1G0uO$0_Q`O'#CiO$0jQ`O'#KeO$0rQ`O,5=|O$0wQ`O'#KeO$0|Q`O'#KeO$1[Q`O'#JRO$1jQ`O,5AOO$1rQ!fO1G1iOOQ!0Lf1G1k1G1kO9kQ`O1G3fO@zQ`O1G3fO$1yQ`O1G3fO$2OQ`O1G3fO!DiQ`O1G3fO9uQ!0LrO1G3fOOQ[1G3f1G3fO!EcQ`O1G3UO!&zQMhO1G3RO$2TQ`O1G3ROOQ[1G3S1G3SO!&zQMhO1G3SO$2YQ`O1G3SO$2bQpO'#HQOOQ[1G3U1G3UO!6_QpO'#I}O!EhQ!bO1G3XOOQ[1G3X1G3XOOQ[,5=r,5=rO$2jQMhO,5=tO9kQ`O,5=tO$%dQ`O,5=vO9`Q`O,5=vO!CUQpO,5=vO!C^QMhO,5=vO:dQMhO,5=vO$2xQ`O'#KcO$3TQ`O,5=wOOQ[1G.k1G.kO$3YQ!0LrO1G.kO@zQ`O1G.kO$3eQ`O1G.kO9uQ!0LrO1G.kO$5mQ!fO,5AQO$5zQ`O,5AQO9eQ`O,5AQO$6VQlO,5>PO$6^Q`O,5>POOQ[1G3i1G3iO`QlO1G3iOOQ[1G3o1G3oOOQ[1G3q1G3qO?TQ`O1G3sO$6cQlO1G3uO$:gQlO'#HtOOQ[1G3x1G3xO$:tQ`O'#HzO?YQ`O'#H|OOQ[1G4O1G4OO$:|QlO1G4OO9uQ!0LrO1G4UOOQ[1G4W1G4WOOQ!0Lb'#G_'#G_O9uQ!0LrO1G4YO9uQ!0LrO1G4[O$?TQ`O,5@bO!)[QlO,5;`O9eQ`O,5;`O?YQ`O,5:XO!)[QlO,5:XO!CUQpO,5:XO$?YQ?MtO,5:XOOQO,5;`,5;`O$?dQpO'#IeO$?zQ`O,5@aOOQ!0Lf1G/r1G/rO$@SQpO'#IkO$@^Q`O,5@pOOQ!0Lb1G0y1G0yO#$`QpO,5:XOOQO'#Ig'#IgO$@fQpO,5:qOOQ!0Ln,5:q,5:qO#(ZQ`O1G0ZOOQ!0Lf1G0Z1G0ZO%[QlO1G0ZOOQ!0Lf1G0t1G0tO?YQ`O1G0tO!CUQpO1G0tO!C^QMhO1G0tOOQ!0Lb1G5|1G5|O!ByQ!0LrO1G0^OOQO1G0m1G0mO%[QlO1G0mO$@mQ!0LrO1G0mO$@xQ!0LrO1G0mO!CUQpO1G0^ODWQpO1G0^O$AWQ!0LrO1G0mOOQO1G0^1G0^O$AlQ!0MxO1G0mPOOO-E<[-E<[POOO1G.h1G.hOOOO1G/i1G/iO$AvQ!bO,5<iO$BOQ!fO1G4jOOQO1G4p1G4pO%[QlO,5?OO$BYQ`O1G5zO$BbQ`O1G6YO$BjQ!fO1G6ZO9eQ`O,5?UO$BtQ!0MxO1G6WO%[QlO1G6WO$CUQ!0LrO1G6WO$CgQ`O1G6VO$CgQ`O1G6VO9eQ`O1G6VO$CoQ`O,5?XO9eQ`O,5?XOOQO,5?X,5?XO$DTQ`O,5?XO$+YQ`O,5?XOOQO-E<k-E<kOOQS1G0a1G0aOOQS1G0c1G0cO#.lQ`O1G0cOOQ[7+(e7+(eO!&zQMhO7+(eO%[QlO7+(eO$DcQ`O7+(eO$DnQMhO7+(eO$D|Q!0MzO,5=XO$GXQ!0MzO,5=ZO$IdQ!0MzO,5=XO$KuQ!0MzO,5=ZO$NWQ!0MzO,59uO%!]Q!0MzO,5<kO%$hQ!0MzO,5<mO%&sQ!0MzO,5<{OOQ!0Lf7+&a7+&aO%)UQ!0MxO7+&aO%)xQlO'#IfO%*VQ`O,5@cO%*_Q!fO,5@cOOQ!0Lf1G0P1G0PO%*iQ`O7+&jOOQ!0Lf7+&j7+&jO%*nQ?MtO,5:fO%[QlO7+&zO%*xQ?MtO,5:bO%+VQ?MtO,5:jO%+aQ?MtO,5:lO%+kQMhO'#IiO%+uQ`O,5@hOOQ!0Lh1G0d1G0dOOQO1G1r1G1rOOQO1G1s1G1sO%+}Q!jO,5<ZO!)[QlO,5<YOOQO-E<l-E<lOOQ!0Lf7+'Y7+'YOOOW7+'e7+'eOOOW1G1|1G1|O%,YQ`O1G1|OOQ!0Lf1G2O1G2OOOOO,59o,59oO%,_Q!dO,59oOOOO-E<`-E<`OOQ!0Lh1G/X1G/XO%,fQ!0MxO7+'kOOQ!0Lh,5?^,5?^O%-YQMhO1G2fP%-aQ`O'#IrPOQ!0Lh-E<p-E<pO%-}QMjO,5?aOOQ!0Lh-E<s-E<sO%.pQMjO,5?cOOQ!0Lh-E<u-E<uO%.zQ!dO1G2wO%/RQ!dO'#CrO%/iQMhO'#KSO$$wQlO'#JvOOQ!0Lh1G2_1G2_O%/sQ`O'#IqO%0[Q`O,5@vO%0[Q`O,5@vO%0dQ`O,5@vO%0oQ`O,5@vOOQO1G2a1G2aO%0}QMjO1G2`O$+YQ`O'#K[O!,TQMhO1G2`O%1_Q(CWO'#IsO%1lQ`O,5@wO!&zQMhO,5@wO%1tQ!dO,5@wOOQ!0Lh1G2d1G2dO%4UQ!fO'#CiO%4`Q`O,5=POOQ!0Lb,5<},5<}O%4hQpO,5<}OOQ!0Lb,5=O,5=OOCwQ`O,5<}O%4sQpO,5<}OOQ!0Lb,5=R,5=RO$+YQ`O,5=VOOQO,5?`,5?`OOQO-E<r-E<rOOQ!0Lp1G2h1G2hO#$`QpO,5<}O$$wQlO,5=PO%5RQ`O,5=OO%5^QpO,5=OO!,TQMhO'#IuO%6WQMjO1G2sO!,TQMhO'#IwO%6yQMjO1G2uO%7TQMjO1G5qO%7_QMjO1G5qOOQO,5?e,5?eOOQO-E<w-E<wOOQO1G.{1G.{O!,TQMhO1G5qO!,TQMhO1G5qO!:]QpO,59wO%[QlO,59wOOQ!0Lh,5<j,5<jO%7lQ`O1G2ZO!,TQMhO1G2bO%7qQ!0MxO7+'mOOQ!0Lf7+'m7+'mO!$wQlO7+'mO%8eQ`O,5;`OOQ!0Lb,5?g,5?gOOQ!0Lb-E<y-E<yO%8jQ!dO'#K^O#(ZQ`O7+(eO4UQ!fO7+(eO$DfQ`O7+(eO%8tQ!0MvO'#CiO%9XQ!0MvO,5=SO%9lQ`O,5=SO%9tQ`O,5=SOOQ!0Lb1G5o1G5oOOQ[7+$a7+$aO!ByQ!0LrO7+$aO!CUQpO7+$aO!$wQlO7+&aO%9yQ`O'#JQO%:bQ`O,5APOOQO1G3h1G3hO9kQ`O,5APO%:bQ`O,5APO%:jQ`O,5APOOQO,5?m,5?mOOQO-E=P-E=POOQ!0Lf7+'T7+'TO%:oQ`O7+)QO9uQ!0LrO7+)QO9kQ`O7+)QO@zQ`O7+)QO%:tQ`O7+)QOOQ[7+)Q7+)QOOQ[7+(p7+(pO%:yQ!0MvO7+(mO!&zQMhO7+(mO!E^Q`O7+(nOOQ[7+(n7+(nO!&zQMhO7+(nO%;TQ`O'#KbO%;`Q`O,5=lOOQO,5?i,5?iOOQO-E<{-E<{OOQ[7+(s7+(sO%<rQpO'#HZOOQ[1G3`1G3`O!&zQMhO1G3`O%[QlO1G3`O%<yQ`O1G3`O%=UQMhO1G3`O9uQ!0LrO1G3bO$%dQ`O1G3bO9`Q`O1G3bO!CUQpO1G3bO!C^QMhO1G3bO%=dQ`O'#JPO%=xQ`O,5@}O%>QQpO,5@}OOQ!0Lb1G3c1G3cOOQ[7+$V7+$VO@zQ`O7+$VO9uQ!0LrO7+$VO%>]Q`O7+$VO%[QlO1G6lO%[QlO1G6mO%>bQ!0LrO1G6lO%>lQlO1G3kO%>sQ`O1G3kO%>xQlO1G3kOOQ[7+)T7+)TO9uQ!0LrO7+)_O`QlO7+)aOOQ['#Kh'#KhOOQ['#JS'#JSO%?PQlO,5>`OOQ[,5>`,5>`O%[QlO'#HuO%?^Q`O'#HwOOQ[,5>f,5>fO9eQ`O,5>fOOQ[,5>h,5>hOOQ[7+)j7+)jOOQ[7+)p7+)pOOQ[7+)t7+)tOOQ[7+)v7+)vO%?cQpO1G5|O%?}Q?MtO1G0zO%@XQ`O1G0zOOQO1G/s1G/sO%@dQ?MtO1G/sO?YQ`O1G/sO!)[QlO'#DmOOQO,5?P,5?POOQO-E<c-E<cOOQO,5?V,5?VOOQO-E<i-E<iO!CUQpO1G/sOOQO-E<e-E<eOOQ!0Ln1G0]1G0]OOQ!0Lf7+%u7+%uO#(ZQ`O7+%uOOQ!0Lf7+&`7+&`O?YQ`O7+&`O!CUQpO7+&`OOQO7+%x7+%xO$AlQ!0MxO7+&XOOQO7+&X7+&XO%[QlO7+&XO%@nQ!0LrO7+&XO!ByQ!0LrO7+%xO!CUQpO7+%xO%@yQ!0LrO7+&XO%AXQ!0MxO7++rO%[QlO7++rO%AiQ`O7++qO%AiQ`O7++qOOQO1G4s1G4sO9eQ`O1G4sO%AqQ`O1G4sOOQS7+%}7+%}O#(ZQ`O<<LPO4UQ!fO<<LPO%BPQ`O<<LPOOQ[<<LP<<LPO!&zQMhO<<LPO%[QlO<<LPO%BXQ`O<<LPO%BdQ!0MzO,5?aO%DoQ!0MzO,5?cO%FzQ!0MzO1G2`O%I]Q!0MzO1G2sO%KhQ!0MzO1G2uO%MsQ!fO,5?QO%[QlO,5?QOOQO-E<d-E<dO%M}Q`O1G5}OOQ!0Lf<<JU<<JUO%NVQ?MtO1G0uO&!^Q?MtO1G1PO&!eQ?MtO1G1PO&$fQ?MtO1G1PO&$mQ?MtO1G1PO&&nQ?MtO1G1PO&(oQ?MtO1G1PO&(vQ?MtO1G1PO&(}Q?MtO1G1PO&+OQ?MtO1G1PO&+VQ?MtO1G1PO&+^Q!0MxO<<JfO&-UQ?MtO1G1PO&.RQ?MvO1G1PO&/UQ?MvO'#JlO&1[Q?MtO1G1cO&1iQ?MtO1G0UO&1sQMjO,5?TOOQO-E<g-E<gO!)[QlO'#FqOOQO'#KZ'#KZOOQO1G1u1G1uO&1}Q`O1G1tO&2SQ?MtO,5?[OOOW7+'h7+'hOOOO1G/Z1G/ZO&2^Q!dO1G4xOOQ!0Lh7+(Q7+(QP!&zQMhO,5?^O!,TQMhO7+(cO&2eQ`O,5?]O9eQ`O,5?]O$+YQ`O,5?]OOQO-E<o-E<oO&2sQ`O1G6bO&2sQ`O1G6bO&2{Q`O1G6bO&3WQMjO7+'zO&3hQ!dO,5?_O&3rQ`O,5?_O!&zQMhO,5?_OOQO-E<q-E<qO&3wQ!dO1G6cO&4RQ`O1G6cO&4ZQ`O1G2kO!&zQMhO1G2kOOQ!0Lb1G2i1G2iOOQ!0Lb1G2j1G2jO%4hQpO1G2iO!CUQpO1G2iOCwQ`O1G2iOOQ!0Lb1G2q1G2qO&4`QpO1G2iO&4nQ`O1G2kO$+YQ`O1G2jOCwQ`O1G2jO$$wQlO1G2kO&4vQ`O1G2jO&5jQMjO,5?aOOQ!0Lh-E<t-E<tO&6]QMjO,5?cOOQ!0Lh-E<v-E<vO!,TQMhO7++]O&6gQMjO7++]O&6qQMjO7++]OOQ!0Lh1G/c1G/cO&7OQ`O1G/cOOQ!0Lh7+'u7+'uO&7TQMjO7+'|O&7eQ!0MxO<<KXOOQ!0Lf<<KX<<KXO&8XQ`O1G0zO!&zQMhO'#IzO&8^Q`O,5@xO&:`Q!fO<<LPO!&zQMhO1G2nO&:gQ!0LrO1G2nOOQ[<<G{<<G{O!ByQ!0LrO<<G{O&:xQ!0MxO<<I{OOQ!0Lf<<I{<<I{OOQO,5?l,5?lO&;lQ`O,5?lO&;qQ`O,5?lOOQO-E=O-E=OO&<PQ`O1G6kO&<PQ`O1G6kO9kQ`O1G6kO@zQ`O<<LlOOQ[<<Ll<<LlO&<XQ`O<<LlO9uQ!0LrO<<LlO9kQ`O<<LlOOQ[<<LX<<LXO%:yQ!0MvO<<LXOOQ[<<LY<<LYO!E^Q`O<<LYO&<^QpO'#I|O&<iQ`O,5@|O!)[QlO,5@|OOQ[1G3W1G3WOOQO'#JO'#JOO9uQ!0LrO'#JOO&<qQpO,5=uOOQ[,5=u,5=uO&<xQpO'#EgO&=PQpO'#GeO&=UQ`O7+(zO&=ZQ`O7+(zOOQ[7+(z7+(zO!&zQMhO7+(zO%[QlO7+(zO&=cQ`O7+(zOOQ[7+(|7+(|O9uQ!0LrO7+(|O$%dQ`O7+(|O9`Q`O7+(|O!CUQpO7+(|O&=nQ`O,5?kOOQO-E<}-E<}OOQO'#H^'#H^O&=yQ`O1G6iO9uQ!0LrO<<GqOOQ[<<Gq<<GqO@zQ`O<<GqO&>RQ`O7+,WO&>WQ`O7+,XO%[QlO7+,WO%[QlO7+,XOOQ[7+)V7+)VO&>]Q`O7+)VO&>bQlO7+)VO&>iQ`O7+)VOOQ[<<Ly<<LyOOQ[<<L{<<L{OOQ[-E=Q-E=QOOQ[1G3z1G3zO&>nQ`O,5>aOOQ[,5>c,5>cO&>sQ`O1G4QO9eQ`O7+&fO!)[QlO7+&fOOQO7+%_7+%_O&>xQ?MtO1G6ZO?YQ`O7+%_OOQ!0Lf<<Ia<<IaOOQ!0Lf<<Iz<<IzO?YQ`O<<IzOOQO<<Is<<IsO$AlQ!0MxO<<IsO%[QlO<<IsOOQO<<Id<<IdO!ByQ!0LrO<<IdO&?SQ!0LrO<<IsO&?_Q!0MxO<= ^O&?oQ`O<= ]OOQO7+*_7+*_O9eQ`O7+*_OOQ[ANAkANAkO&?wQ!fOANAkO!&zQMhOANAkO#(ZQ`OANAkO4UQ!fOANAkO&@OQ`OANAkO%[QlOANAkO&@WQ!0MzO7+'zO&BiQ!0MzO,5?aO&DtQ!0MzO,5?cO&GPQ!0MzO7+'|O&IbQ!fO1G4lO&IlQ?MtO7+&aO&KpQ?MvO,5=XO&MwQ?MvO,5=ZO&NXQ?MvO,5=XO&NiQ?MvO,5=ZO&NyQ?MvO,59uO'#PQ?MvO,5<kO'%SQ?MvO,5<mO''hQ?MvO,5<{O')^Q?MtO7+'kO')kQ?MtO7+'mO')xQ`O,5<]OOQO7+'`7+'`OOQ!0Lh7+*d7+*dO')}QMjO<<K}OOQO1G4w1G4wO'*UQ`O1G4wO'*aQ`O1G4wO'*oQ`O7++|O'*oQ`O7++|O!&zQMhO1G4yO'*wQ!dO1G4yO'+RQ`O7++}O'+ZQ`O7+(VO'+fQ!dO7+(VOOQ!0Lb7+(T7+(TOOQ!0Lb7+(U7+(UO!CUQpO7+(TOCwQ`O7+(TO'+pQ`O7+(VO!&zQMhO7+(VO$+YQ`O7+(UO'+uQ`O7+(VOCwQ`O7+(UO'+}QMjO<<NwO!,TQMhO<<NwOOQ!0Lh7+$}7+$}O',XQ!dO,5?fOOQO-E<x-E<xO',cQ!0MvO7+(YO!&zQMhO7+(YOOQ[AN=gAN=gO9kQ`O1G5WOOQO1G5W1G5WO',sQ`O1G5WO',xQ`O7+,VO',xQ`O7+,VO9uQ!0LrOANBWO@zQ`OANBWOOQ[ANBWANBWO'-QQ`OANBWOOQ[ANAsANAsOOQ[ANAtANAtO'-VQ`O,5?hOOQO-E<z-E<zO'-bQ?MtO1G6hOOQO,5?j,5?jOOQO-E<|-E<|OOQ[1G3a1G3aO'-lQ`O,5=POOQ[<<Lf<<LfO!&zQMhO<<LfO&=UQ`O<<LfO'-qQ`O<<LfO%[QlO<<LfOOQ[<<Lh<<LhO9uQ!0LrO<<LhO$%dQ`O<<LhO9`Q`O<<LhO'-yQpO1G5VO'.UQ`O7+,TOOQ[AN=]AN=]O9uQ!0LrOAN=]OOQ[<= r<= rOOQ[<= s<= sO'.^Q`O<= rO'.cQ`O<= sOOQ[<<Lq<<LqO'.hQ`O<<LqO'.mQlO<<LqOOQ[1G3{1G3{O?YQ`O7+)lO'.tQ`O<<JQO'/PQ?MtO<<JQOOQO<<Hy<<HyOOQ!0LfAN?fAN?fOOQOAN?_AN?_O$AlQ!0MxOAN?_OOQOAN?OAN?OO%[QlOAN?_OOQO<<My<<MyOOQ[G27VG27VO!&zQMhOG27VO#(ZQ`OG27VO'/ZQ!fOG27VO4UQ!fOG27VO'/bQ`OG27VO'/jQ?MtO<<JfO'/wQ?MvO1G2`O'1mQ?MvO,5?aO'3pQ?MvO,5?cO'5sQ?MvO1G2sO'7vQ?MvO1G2uO'9yQ?MtO<<KXO':WQ?MtO<<I{OOQO1G1w1G1wO!,TQMhOANAiOOQO7+*c7+*cO':eQ`O7+*cO':pQ`O<= hO':xQ!dO7+*eOOQ!0Lb<<Kq<<KqO$+YQ`O<<KqOCwQ`O<<KqO';SQ`O<<KqO!&zQMhO<<KqOOQ!0Lb<<Ko<<KoO!CUQpO<<KoO';_Q!dO<<KqOOQ!0Lb<<Kp<<KpO';iQ`O<<KqO!&zQMhO<<KqO$+YQ`O<<KpO';nQMjOANDcO';xQ!0MvO<<KtOOQO7+*r7+*rO9kQ`O7+*rO'<YQ`O<= qOOQ[G27rG27rO9uQ!0LrOG27rO@zQ`OG27rO!)[QlO1G5SO'<bQ`O7+,SO'<jQ`O1G2kO&=UQ`OANBQOOQ[ANBQANBQO!&zQMhOANBQO'<oQ`OANBQOOQ[ANBSANBSO9uQ!0LrOANBSO$%dQ`OANBSOOQO'#H_'#H_OOQO7+*q7+*qOOQ[G22wG22wOOQ[ANE^ANE^OOQ[ANE_ANE_OOQ[ANB]ANB]O'<wQ`OANB]OOQ[<<MW<<MWO!)[QlOAN?lOOQOG24yG24yO$AlQ!0MxOG24yO#(ZQ`OLD,qOOQ[LD,qLD,qO!&zQMhOLD,qO'<|Q!fOLD,qO'=TQ?MvO7+'zO'>yQ?MvO,5?aO'@|Q?MvO,5?cO'CPQ?MvO7+'|O'DuQMjOG27TOOQO<<M}<<M}OOQ!0LbANA]ANA]O$+YQ`OANA]OCwQ`OANA]O'EVQ!dOANA]OOQ!0LbANAZANAZO'E^Q`OANA]O!&zQMhOANA]O'EiQ!dOANA]OOQ!0LbANA[ANA[OOQO<<N^<<N^OOQ[LD-^LD-^O9uQ!0LrOLD-^O'EsQ?MtO7+*nOOQO'#Gf'#GfOOQ[G27lG27lO&=UQ`OG27lO!&zQMhOG27lOOQ[G27nG27nO9uQ!0LrOG27nOOQ[G27wG27wO'E}Q?MtOG25WOOQOLD*eLD*eOOQ[!$(!]!$(!]O#(ZQ`O!$(!]O!&zQMhO!$(!]O'FXQ!0MzOG27TOOQ!0LbG26wG26wO$+YQ`OG26wO'HjQ`OG26wOCwQ`OG26wO'HuQ!dOG26wO!&zQMhOG26wOOQ[!$(!x!$(!xOOQ[LD-WLD-WO&=UQ`OLD-WOOQ[LD-YLD-YOOQ[!)9Ew!)9EwO#(ZQ`O!)9EwOOQ!0LbLD,cLD,cO$+YQ`OLD,cOCwQ`OLD,cO'H|Q`OLD,cO'IXQ!dOLD,cOOQ[!$(!r!$(!rOOQ[!.K;c!.K;cO'I`Q?MvOG27TOOQ!0Lb!$( }!$( }O$+YQ`O!$( }OCwQ`O!$( }O'KUQ`O!$( }OOQ!0Lb!)9Ei!)9EiO$+YQ`O!)9EiOCwQ`O!)9EiOOQ!0Lb!.K;T!.K;TO$+YQ`O!.K;TOOQ!0Lb!4/0o!4/0oO!)[QlO'#DzO1PQ`O'#EXO'KaQ!fO'#JrO'KhQ!L^O'#DvO'KoQlO'#EOO'KvQ!fO'#CiO'N^Q!fO'#CiO!)[QlO'#EQO'NnQlO,5;ZO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO'#IpO(!qQ`O,5<iO!)[QlO,5;eO(!yQMhO,5;eO($dQMhO,5;eO!)[QlO,5;wO!&zQMhO'#GmO(!yQMhO'#GmO!&zQMhO'#GoO(!yQMhO'#GoO1SQ`O'#DZO1SQ`O'#DZO!&zQMhO'#GPO(!yQMhO'#GPO!&zQMhO'#GRO(!yQMhO'#GRO!&zQMhO'#GaO(!yQMhO'#GaO!)[QlO,5:jO($kQpO'#D_O($uQpO'#JvO!)[QlO,5@oO'NnQlO1G0uO(%PQ?MtO'#CiO!)[QlO1G2PO!&zQMhO'#IuO(!yQMhO'#IuO!&zQMhO'#IwO(!yQMhO'#IwO(%ZQ!dO'#CrO!&zQMhO,5<tO(!yQMhO,5<tO'NnQlO1G2RO!)[QlO7+&zO!&zQMhO1G2`O(!yQMhO1G2`O!&zQMhO'#IuO(!yQMhO'#IuO!&zQMhO'#IwO(!yQMhO'#IwO!&zQMhO1G2bO(!yQMhO1G2bO'NnQlO7+'mO'NnQlO7+&aO!&zQMhOANAiO(!yQMhOANAiO(%nQ`O'#EoO(%sQ`O'#EoO(%{Q`O'#F]O(&QQ`O'#EyO(&VQ`O'#KTO(&bQ`O'#KRO(&mQ`O,5;ZO(&rQMjO,5<eO(&yQ`O'#GYO('OQ`O'#GYO('TQ`O,5<eO(']Q`O,5<gO('eQ`O,5;ZO('mQ?MtO1G1`O('tQ`O,5<tO('yQ`O,5<tO((OQ`O,5<vO((TQ`O,5<vO((YQ`O1G2RO((_Q`O1G0uO((dQMjO<<K}O((kQMjO<<K}O((rQMhO'#F|O9`Q`O'#F{OAuQ`O'#EnO!)[QlO,5;tO!3oQ`O'#GYO!3oQ`O'#GYO!3oQ`O'#G[O!3oQ`O'#G[O!,TQMhO7+(cO!,TQMhO7+(cO%.zQ!dO1G2wO%.zQ!dO1G2wO!&zQMhO,5=]O!&zQMhO,5=]",
  stateData: "()x~O'|OS'}OSTOS(ORQ~OPYOQYOSfOY!VOaqOdzOeyOl!POpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!uwO!xxO!|]O$W|O$niO%h}O%j!QO%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO%y!UO&W!WO&^!XO&`!YO&b!ZO&d![O&g!]O&m!^O&s!_O&u!`O&w!aO&y!bO&{!cO(TSO(VTO(YUO(aVO(o[O~OWtO~P`OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oa!wOs!nO!S!oO!b!yO!c!vO!d!vO!|<VO#T!pO#U!pO#V!xO#W!pO#X!pO#[!zO#]!zO(U!lO(VTO(YUO(e!mO(o!sO~O(O!{O~OP]XR]X[]Xa]Xj]Xr]X!Q]X!S]X!]]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X'z]X(a]X(r]X(y]X(z]X~O!g%RX~P(qO_!}O(V#PO(W!}O(X#PO~O_#QO(X#PO(Y#PO(Z#QO~Ox#SO!U#TO(b#TO(c#VO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T<ZO(VTO(YUO(aVO(o[O~O![#ZO!]#WO!Y(hP!Y(vP~P+}O!^#cO~P`OPYOQYOSfOd!jOe!iOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(VTO(YUO(aVO(o[O~Op#mO![#iO!|]O#i#lO#j#iO(T<[O!k(sP~P.iO!l#oO(T#nO~O!x#sO!|]O%h#tO~O#k#uO~O!g#vO#k#uO~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!]$_O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~Oa(fX'z(fX'w(fX!k(fX!Y(fX!_(fX%i(fX!g(fX~P1qO#S$dO#`$eO$Q$eOP(gXR(gX[(gXj(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX!_(gX%i(gX~Oa(gX'z(gX'w(gX!Y(gX!k(gXv(gX!g(gX~P4UO#`$eO~O$]$hO$_$gO$f$mO~OSfO!_$nO$i$oO$k$qO~Oh%VOj%dOk%dOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#j%cO$W%`O$t%^O$v%_O$y%aO(T$sO(VTO(YUO(a$uO(y$}O(z%POg(^P~Ol%[O~P7eO!l%eO~O!S%hO!_%iO(T%gO~O!g%mO~Oa%nO'z%nO~O!Q%rO~P%[O(U!lO~P%[O%n%vO~P%[Oh%VO!l%eO(T%gO(U!lO~Oe%}O!l%eO(T%gO~Oj$RO~O!_&PO(T%gO(U!lO(VTO(YUO`)WP~O!Q&SO!l&RO%j&VO&T&WO~P;SO!x#sO~O%s&YO!S)SX!_)SX(T)SX~O(T&ZO~Ol!PO!u&`O%j!QO%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO~Od&eOe&dO!x&bO%h&cO%{&aO~P<bOd&hOeyOl!PO!_&gO!u&`O!xxO!|]O%h}O%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO%y!UO~Ob&kO#`&nO%j&iO(U!lO~P=gO!l&oO!u&sO~O!l#oO~O!_XO~Oa%nO'x&{O'z%nO~Oa%nO'x'OO'z%nO~Oa%nO'x'QO'z%nO~O'w]X!Y]Xv]X!k]X&[]X!_]X%i]X!g]X~P(qO!b'_O!c'WO!d'WO(U!lO(VTO(YUO~Os'UO!S'TO!['XO(e'SO!^(iP!^(xP~P@nOn'bO!_'`O(T%gO~Oe'gO!l%eO(T%gO~O!Q&SO!l&RO~Os!nO!S!oO!|<VO#T!pO#U!pO#W!pO#X!pO(U!lO(VTO(YUO(e!mO(o!sO~O!b'mO!c'lO!d'lO#V!pO#['nO#]'nO~PBYOa%nOh%VO!g#vO!l%eO'z%nO(r'pO~O!p'tO#`'rO~PChOs!nO!S!oO(VTO(YUO(e!mO(o!sO~O!_XOs(mX!S(mX!b(mX!c(mX!d(mX!|(mX#T(mX#U(mX#V(mX#W(mX#X(mX#[(mX#](mX(U(mX(V(mX(Y(mX(e(mX(o(mX~O!c'lO!d'lO(U!lO~PDWO(P'xO(Q'xO(R'zO~O_!}O(V'|O(W!}O(X'|O~O_#QO(X'|O(Y'|O(Z#QO~Ov(OO~P%[Ox#SO!U#TO(b#TO(c(RO~O![(TO!Y'WX!Y'^X!]'WX!]'^X~P+}O!](VO!Y(hX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!](VO!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~O!Y(hX~PHRO!Y([O~O!Y(uX!](uX!g(uX!k(uX(r(uX~O#`(uX#k#dX!^(uX~PJUO#`(]O!Y(wX!](wX~O!](^O!Y(vX~O!Y(aO~O#`$eO~PJUO!^(bO~P`OR#zO!Q#yO!S#{O!l#xO(aVOP!na[!naj!nar!na!]!na!p!na#R!na#n!na#o!na#p!na#q!na#r!na#s!na#t!na#u!na#v!na#x!na#z!na#{!na(r!na(y!na(z!na~Oa!na'z!na'w!na!Y!na!k!nav!na!_!na%i!na!g!na~PKlO!k(cO~O!g#vO#`(dO(r'pO!](tXa(tX'z(tX~O!k(tX~PNXO!S%hO!_%iO!|]O#i(iO#j(hO(T%gO~O!](jO!k(sX~O!k(lO~O!S%hO!_%iO#j(hO(T%gO~OP(gXR(gX[(gXj(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX~O!g#vO!k(gX~P! uOR(nO!Q(mO!l#xO#S$dO!|!{a!S!{a~O!x!{a%h!{a!_!{a#i!{a#j!{a(T!{a~P!#vO!x(rO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~O#k(xO~O![(zO!k(kP~P%[O(e(|O(o[O~O!S)OO!l#xO(e(|O(o[O~OP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_!eO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(T)]O(VTO(YUO(aVO(o[O~O!]$_Oa$qa'z$qa'w$qa!k$qa!Y$qa!_$qa%i$qa!g$qa~Ol)dO~P!&zOh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#j%cO$W%`O$t%^O$v%_O$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~Og(pP~P!,TO!Q)iO!g)hO!_$^X$Z$^X$]$^X$_$^X$f$^X~O!g)hO!_({X$Z({X$]({X$_({X$f({X~O!Q)iO~P!.^O!Q)iO!_({X$Z({X$]({X$_({X$f({X~O!_)kO$Z)oO$])jO$_)jO$f)pO~O![)sO~P!)[O$]$hO$_$gO$f)wO~On$zX!Q$zX#S$zX'y$zX(y$zX(z$zX~OgmXg$zXnmX!]mX#`mX~P!0SOx)yO(b)zO(c)|O~On*VO!Q*OO'y*PO(y$}O(z%PO~Og)}O~P!1WOg*WO~Oh%VOr%XOs$tOt$tOz%YO|%ZO!O<sO!S*YO!_*ZO!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(VTO(YUO(a$uO(y$}O(z%PO~Op*`O![*^O(T*XO!k)OP~P!1uO#k*aO~O!l*bO~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(T*dO(VTO(YUO(a$uO(y$}O(z%PO~O![*gO!Y)PP~P!3tOr*sOs!nO!S*iO!b*qO!c*kO!d*kO!l*bO#[*rO%`*mO(U!lO(VTO(YUO(e!mO~O!^*pO~P!5iO#S$dOn(`X!Q(`X'y(`X(y(`X(z(`X!](`X#`(`X~Og(`X$O(`X~P!6kOn*xO#`*wOg(_X!](_X~O!]*yOg(^X~Oj%dOk%dOl%dO(T&ZOg(^P~Os*|O~Og)}O(T&ZO~O!l+SO~O(T(vO~Op+WO!S%hO![#iO!_%iO!|]O#i#lO#j#iO(T%gO!k(sP~O!g#vO#k+XO~O!S%hO![+ZO!](^O!_%iO(T%gO!Y(vP~Os'[O!S+]O![+[O(VTO(YUO(e(|O~O!^(xP~P!9|O!]+^Oa)TX'z)TX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~Oa!ja!]!ja'z!ja'w!ja!Y!ja!k!jav!ja!_!ja%i!ja!g!ja~P!:tOR#zO!Q#yO!S#{O!l#xO(aVOP!ra[!raj!rar!ra!]!ra!p!ra#R!ra#n!ra#o!ra#p!ra#q!ra#r!ra#s!ra#t!ra#u!ra#v!ra#x!ra#z!ra#{!ra(r!ra(y!ra(z!ra~Oa!ra'z!ra'w!ra!Y!ra!k!rav!ra!_!ra%i!ra!g!ra~P!=[OR#zO!Q#yO!S#{O!l#xO(aVOP!ta[!taj!tar!ta!]!ta!p!ta#R!ta#n!ta#o!ta#p!ta#q!ta#r!ta#s!ta#t!ta#u!ta#v!ta#x!ta#z!ta#{!ta(r!ta(y!ta(z!ta~Oa!ta'z!ta'w!ta!Y!ta!k!tav!ta!_!ta%i!ta!g!ta~P!?rOh%VOn+gO!_'`O%i+fO~O!g+iOa(]X!_(]X'z(]X!](]X~Oa%nO!_XO'z%nO~Oh%VO!l%eO~Oh%VO!l%eO(T%gO~O!g#vO#k(xO~Ob+tO%j+uO(T+qO(VTO(YUO!^)XP~O!]+vO`)WX~O[+zO~O`+{O~O!_&PO(T%gO(U!lO`)WP~O%j,OO~P;SOh%VO#`,SO~Oh%VOn,VO!_$|O~O!_,XO~O!Q,ZO!_XO~O%n%vO~O!x,`O~Oe,eO~Ob,fO(T#nO(VTO(YUO!^)VP~Oe%}O~O%j!QO(T&ZO~P=gO[,kO`,jO~OPYOQYOSfOdzOeyOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!iuO!lZO!oYO!pYO!qYO!svO!xxO!|]O$niO%h}O(VTO(YUO(aVO(o[O~O!_!eO!u!gO$W!kO(T!dO~P!FyO`,jOa%nO'z%nO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oa,pOl!OO!uwO%l!OO%m!OO%n!OO~P!IcO!l&oO~O&^,vO~O!_,xO~O&o,zO&q,{OP&laQ&laS&laY&laa&lad&lae&lal&lap&lar&las&lat&laz&la|&la!O&la!S&la!W&la!X&la!_&la!i&la!l&la!o&la!p&la!q&la!s&la!u&la!x&la!|&la$W&la$n&la%h&la%j&la%l&la%m&la%n&la%q&la%s&la%v&la%w&la%y&la&W&la&^&la&`&la&b&la&d&la&g&la&m&la&s&la&u&la&w&la&y&la&{&la'w&la(T&la(V&la(Y&la(a&la(o&la!^&la&e&lab&la&j&la~O(T-QO~Oh!eX!]!RX!^!RX!g!RX!g!eX!l!eX#`!RX~O!]!eX!^!eX~P#!iO!g-VO#`-UOh(jX!]#hX!^#hX!g(jX!l(jX~O!](jX!^(jX~P##[Oh%VO!g-XO!l%eO!]!aX!^!aX~Os!nO!S!oO(VTO(YUO(e!mO~OP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_!eO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(VTO(YUO(aVO(o[O~O(T=QO~P#$qO!]-]O!^(iX~O!^-_O~O!g-VO#`-UO!]#hX!^#hX~O!]-`O!^(xX~O!^-bO~O!c-cO!d-cO(U!lO~P#$`O!^-fO~P'_On-iO!_'`O~O!Y-nO~Os!{a!b!{a!c!{a!d!{a#T!{a#U!{a#V!{a#W!{a#X!{a#[!{a#]!{a(U!{a(V!{a(Y!{a(e!{a(o!{a~P!#vO!p-sO#`-qO~PChO!c-uO!d-uO(U!lO~PDWOa%nO#`-qO'z%nO~Oa%nO!g#vO#`-qO'z%nO~Oa%nO!g#vO!p-sO#`-qO'z%nO(r'pO~O(P'xO(Q'xO(R-zO~Ov-{O~O!Y'Wa!]'Wa~P!:tO![.PO!Y'WX!]'WX~P%[O!](VO!Y(ha~O!Y(ha~PHRO!](^O!Y(va~O!S%hO![.TO!_%iO(T%gO!Y'^X!]'^X~O#`.VO!](ta!k(taa(ta'z(ta~O!g#vO~P#,wO!](jO!k(sa~O!S%hO!_%iO#j.ZO(T%gO~Op.`O!S%hO![.]O!_%iO!|]O#i._O#j.]O(T%gO!]'aX!k'aX~OR.dO!l#xO~Oh%VOn.gO!_'`O%i.fO~Oa#ci!]#ci'z#ci'w#ci!Y#ci!k#civ#ci!_#ci%i#ci!g#ci~P!:tOn>]O!Q*OO'y*PO(y$}O(z%PO~O#k#_aa#_a#`#_a'z#_a!]#_a!k#_a!_#_a!Y#_a~P#/sO#k(`XP(`XR(`X[(`Xa(`Xj(`Xr(`X!S(`X!l(`X!p(`X#R(`X#n(`X#o(`X#p(`X#q(`X#r(`X#s(`X#t(`X#u(`X#v(`X#x(`X#z(`X#{(`X'z(`X(a(`X(r(`X!k(`X!Y(`X'w(`Xv(`X!_(`X%i(`X!g(`X~P!6kO!].tO!k(kX~P!:tO!k.wO~O!Y.yO~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(aVO[#mia#mij#mir#mi!]#mi#R#mi#o#mi#p#mi#q#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#n#mi~P#3cO#n$OO~P#3cOP$[OR#zOr$aO!Q#yO!S#{O!l#xO!p$[O#n$OO#o$PO#p$PO#q$PO(aVO[#mia#mij#mi!]#mi#R#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#r#mi~P#6QO#r$QO~P#6QOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO(aVOa#mi!]#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#v#mi~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO(aVO(z#}Oa#mi!]#mi#z#mi#{#mi'z#mi(r#mi(y#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#x$UO~P#;VO#x#mi~P#;VO#v$SO~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO(aVO(y#|O(z#}Oa#mi!]#mi#{#mi'z#mi(r#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#z#mi~P#={O#z$WO~P#={OP]XR]X[]Xj]Xr]X!Q]X!S]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X!]]X!^]X~O$O]X~P#@jOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO#x<eO#z<gO#{<hO(aVO(r$YO(y#|O(z#}O~O$O.{O~P#BwO#S$dO#`<nO$Q<nO$O(gX!^(gX~P! uOa'da!]'da'z'da'w'da!k'da!Y'dav'da!_'da%i'da!g'da~P!:tO[#mia#mij#mir#mi!]#mi#R#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#n$OO#o$PO#p$PO#q$PO(aVO(y#mi(z#mi~P#EyOn>]O!Q*OO'y*PO(y$}O(z%POP#miR#mi!S#mi!l#mi!p#mi#n#mi#o#mi#p#mi#q#mi(a#mi~P#EyO!]/POg(pX~P!1WOg/RO~Oa$Pi!]$Pi'z$Pi'w$Pi!Y$Pi!k$Piv$Pi!_$Pi%i$Pi!g$Pi~P!:tO$]/SO$_/SO~O$]/TO$_/TO~O!g)hO#`/UO!_$cX$Z$cX$]$cX$_$cX$f$cX~O![/VO~O!_)kO$Z/XO$])jO$_)jO$f/YO~O!]<iO!^(fX~P#BwO!^/ZO~O!g)hO$f({X~O$f/]O~Ov/^O~P!&zOx)yO(b)zO(c/aO~O!S/dO~O(y$}On%aa!Q%aa'y%aa(z%aa!]%aa#`%aa~Og%aa$O%aa~P#L{O(z%POn%ca!Q%ca'y%ca(y%ca!]%ca#`%ca~Og%ca$O%ca~P#MnO!]fX!gfX!kfX!k$zX(rfX~P!0SOp%WO![/mO!](^O(T/lO!Y(vP!Y)PP~P!1uOr*sO!b*qO!c*kO!d*kO!l*bO#[*rO%`*mO(U!lO(VTO(YUO~Os<}O!S/nO![+[O!^*pO(e<|O!^(xP~P$ [O!k/oO~P#/sO!]/pO!g#vO(r'pO!k)OX~O!k/uO~OnoX!QoX'yoX(yoX(zoX~O!g#vO!koX~P$#OOp/wO!S%hO![*^O!_%iO(T%gO!k)OP~O#k/xO~O!Y$zX!]$zX!g%RX~P!0SO!]/yO!Y)PX~P#/sO!g/{O~O!Y/}O~OpkO(T0OO~P.iOh%VOr0TO!g#vO!l%eO(r'pO~O!g+iO~Oa%nO!]0XO'z%nO~O!^0ZO~P!5iO!c0[O!d0[O(U!lO~P#$`Os!nO!S0]O(VTO(YUO(e!mO~O#[0_O~Og%aa!]%aa#`%aa$O%aa~P!1WOg%ca!]%ca#`%ca$O%ca~P!1WOj%dOk%dOl%dO(T&ZOg'mX!]'mX~O!]*yOg(^a~Og0hO~On0jO#`0iOg(_a!](_a~OR0kO!Q0kO!S0lO#S$dOn}a'y}a(y}a(z}a!]}a#`}a~Og}a$O}a~P$(cO!Q*OO'y*POn$sa(y$sa(z$sa!]$sa#`$sa~Og$sa$O$sa~P$)_O!Q*OO'y*POn$ua(y$ua(z$ua!]$ua#`$ua~Og$ua$O$ua~P$*QO#k0oO~Og%Ta!]%Ta#`%Ta$O%Ta~P!1WO!g#vO~O#k0rO~O!]+^Oa)Ta'z)Ta~OR#zO!Q#yO!S#{O!l#xO(aVOP!ri[!rij!rir!ri!]!ri!p!ri#R!ri#n!ri#o!ri#p!ri#q!ri#r!ri#s!ri#t!ri#u!ri#v!ri#x!ri#z!ri#{!ri(r!ri(y!ri(z!ri~Oa!ri'z!ri'w!ri!Y!ri!k!riv!ri!_!ri%i!ri!g!ri~P$+oOh%VOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(VTO(YUO(a$uO(y$}O(z%PO~Op0{O%]0|O(T0zO~P$.VO!g+iOa(]a!_(]a'z(]a!](]a~O#k1SO~O[]X!]fX!^fX~O!]1TO!^)XX~O!^1VO~O[1WO~Ob1YO(T+qO(VTO(YUO~O!_&PO(T%gO`'uX!]'uX~O!]+vO`)Wa~O!k1]O~P!:tO[1`O~O`1aO~O#`1fO~On1iO!_$|O~O(e(|O!^)UP~Oh%VOn1rO!_1oO%i1qO~O[1|O!]1zO!^)VX~O!^1}O~O`2POa%nO'z%nO~O(T#nO(VTO(YUO~O#S$dO#`$eO$Q$eOP(gXR(gX[(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX~Oj2SO&[2TOa(gX~P$3pOj2SO#`$eO&[2TO~Oa2VO~P%[Oa2XO~O&e2[OP&ciQ&ciS&ciY&cia&cid&cie&cil&cip&cir&cis&cit&ciz&ci|&ci!O&ci!S&ci!W&ci!X&ci!_&ci!i&ci!l&ci!o&ci!p&ci!q&ci!s&ci!u&ci!x&ci!|&ci$W&ci$n&ci%h&ci%j&ci%l&ci%m&ci%n&ci%q&ci%s&ci%v&ci%w&ci%y&ci&W&ci&^&ci&`&ci&b&ci&d&ci&g&ci&m&ci&s&ci&u&ci&w&ci&y&ci&{&ci'w&ci(T&ci(V&ci(Y&ci(a&ci(o&ci!^&cib&ci&j&ci~Ob2bO!^2`O&j2aO~P`O!_XO!l2dO~O&q,{OP&liQ&liS&liY&lia&lid&lie&lil&lip&lir&lis&lit&liz&li|&li!O&li!S&li!W&li!X&li!_&li!i&li!l&li!o&li!p&li!q&li!s&li!u&li!x&li!|&li$W&li$n&li%h&li%j&li%l&li%m&li%n&li%q&li%s&li%v&li%w&li%y&li&W&li&^&li&`&li&b&li&d&li&g&li&m&li&s&li&u&li&w&li&y&li&{&li'w&li(T&li(V&li(Y&li(a&li(o&li!^&li&e&lib&li&j&li~O!Y2jO~O!]!aa!^!aa~P#BwOs!nO!S!oO![2pO(e!mO!]'XX!^'XX~P@nO!]-]O!^(ia~O!]'_X!^'_X~P!9|O!]-`O!^(xa~O!^2wO~P'_Oa%nO#`3QO'z%nO~Oa%nO!g#vO#`3QO'z%nO~Oa%nO!g#vO!p3UO#`3QO'z%nO(r'pO~Oa%nO'z%nO~P!:tO!]$_Ov$qa~O!Y'Wi!]'Wi~P!:tO!](VO!Y(hi~O!](^O!Y(vi~O!Y(wi!](wi~P!:tO!](ti!k(tia(ti'z(ti~P!:tO#`3WO!](ti!k(tia(ti'z(ti~O!](jO!k(si~O!S%hO!_%iO!|]O#i3]O#j3[O(T%gO~O!S%hO!_%iO#j3[O(T%gO~On3dO!_'`O%i3cO~Oh%VOn3dO!_'`O%i3cO~O#k%aaP%aaR%aa[%aaa%aaj%aar%aa!S%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa'z%aa(a%aa(r%aa!k%aa!Y%aa'w%aav%aa!_%aa%i%aa!g%aa~P#L{O#k%caP%caR%ca[%caa%caj%car%ca!S%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca'z%ca(a%ca(r%ca!k%ca!Y%ca'w%cav%ca!_%ca%i%ca!g%ca~P#MnO#k%aaP%aaR%aa[%aaa%aaj%aar%aa!S%aa!]%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa'z%aa(a%aa(r%aa!k%aa!Y%aa'w%aa#`%aav%aa!_%aa%i%aa!g%aa~P#/sO#k%caP%caR%ca[%caa%caj%car%ca!S%ca!]%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca'z%ca(a%ca(r%ca!k%ca!Y%ca'w%ca#`%cav%ca!_%ca%i%ca!g%ca~P#/sO#k}aP}a[}aa}aj}ar}a!l}a!p}a#R}a#n}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#x}a#z}a#{}a'z}a(a}a(r}a!k}a!Y}a'w}av}a!_}a%i}a!g}a~P$(cO#k$saP$saR$sa[$saa$saj$sar$sa!S$sa!l$sa!p$sa#R$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#t$sa#u$sa#v$sa#x$sa#z$sa#{$sa'z$sa(a$sa(r$sa!k$sa!Y$sa'w$sav$sa!_$sa%i$sa!g$sa~P$)_O#k$uaP$uaR$ua[$uaa$uaj$uar$ua!S$ua!l$ua!p$ua#R$ua#n$ua#o$ua#p$ua#q$ua#r$ua#s$ua#t$ua#u$ua#v$ua#x$ua#z$ua#{$ua'z$ua(a$ua(r$ua!k$ua!Y$ua'w$uav$ua!_$ua%i$ua!g$ua~P$*QO#k%TaP%TaR%Ta[%Taa%Taj%Tar%Ta!S%Ta!]%Ta!l%Ta!p%Ta#R%Ta#n%Ta#o%Ta#p%Ta#q%Ta#r%Ta#s%Ta#t%Ta#u%Ta#v%Ta#x%Ta#z%Ta#{%Ta'z%Ta(a%Ta(r%Ta!k%Ta!Y%Ta'w%Ta#`%Tav%Ta!_%Ta%i%Ta!g%Ta~P#/sOa#cq!]#cq'z#cq'w#cq!Y#cq!k#cqv#cq!_#cq%i#cq!g#cq~P!:tO![3lO!]'YX!k'YX~P%[O!].tO!k(ka~O!].tO!k(ka~P!:tO!Y3oO~O$O!na!^!na~PKlO$O!ja!]!ja!^!ja~P#BwO$O!ra!^!ra~P!=[O$O!ta!^!ta~P!?rOg']X!]']X~P!,TO!]/POg(pa~OSfO!_4TO$d4UO~O!^4YO~Ov4ZO~P#/sOa$mq!]$mq'z$mq'w$mq!Y$mq!k$mqv$mq!_$mq%i$mq!g$mq~P!:tO!Y4]O~P!&zO!S4^O~O!Q*OO'y*PO(z%POn'ia(y'ia!]'ia#`'ia~Og'ia$O'ia~P%-fO!Q*OO'y*POn'ka(y'ka(z'ka!]'ka#`'ka~Og'ka$O'ka~P%.XO(r$YO~P#/sO!YfX!Y$zX!]fX!]$zX!g%RX#`fX~P!0SOp%WO(T=WO~P!1uOp4bO!S%hO![4aO!_%iO(T%gO!]'eX!k'eX~O!]/pO!k)Oa~O!]/pO!g#vO!k)Oa~O!]/pO!g#vO(r'pO!k)Oa~Og$|i!]$|i#`$|i$O$|i~P!1WO![4jO!Y'gX!]'gX~P!3tO!]/yO!Y)Pa~O!]/yO!Y)Pa~P#/sOP]XR]X[]Xj]Xr]X!Q]X!S]X!Y]X!]]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X~Oj%YX!g%YX~P%2OOj4oO!g#vO~Oh%VO!g#vO!l%eO~Oh%VOr4tO!l%eO(r'pO~Or4yO!g#vO(r'pO~Os!nO!S4zO(VTO(YUO(e!mO~O(y$}On%ai!Q%ai'y%ai(z%ai!]%ai#`%ai~Og%ai$O%ai~P%5oO(z%POn%ci!Q%ci'y%ci(y%ci!]%ci#`%ci~Og%ci$O%ci~P%6bOg(_i!](_i~P!1WO#`5QOg(_i!](_i~P!1WO!k5VO~Oa$oq!]$oq'z$oq'w$oq!Y$oq!k$oqv$oq!_$oq%i$oq!g$oq~P!:tO!Y5ZO~O!]5[O!_)QX~P#/sOa$zX!_$zX%^]X'z$zX!]$zX~P!0SO%^5_OaoX!_oX'zoX!]oX~P$#OOp5`O(T#nO~O%^5_O~Ob5fO%j5gO(T+qO(VTO(YUO!]'tX!^'tX~O!]1TO!^)Xa~O[5kO~O`5lO~O[5pO~Oa%nO'z%nO~P#/sO!]5uO#`5wO!^)UX~O!^5xO~Or6OOs!nO!S*iO!b!yO!c!vO!d!vO!|<VO#T!pO#U!pO#V!pO#W!pO#X!pO#[5}O#]!zO(U!lO(VTO(YUO(e!mO(o!sO~O!^5|O~P%;eOn6TO!_1oO%i6SO~Oh%VOn6TO!_1oO%i6SO~Ob6[O(T#nO(VTO(YUO!]'sX!^'sX~O!]1zO!^)Va~O(VTO(YUO(e6^O~O`6bO~Oj6eO&[6fO~PNXO!k6gO~P%[Oa6iO~Oa6iO~P%[Ob2bO!^6nO&j2aO~P`O!g6pO~O!g6rOh(ji!](ji!^(ji!g(ji!l(jir(ji(r(ji~O!]#hi!^#hi~P#BwO#`6sO!]#hi!^#hi~O!]!ai!^!ai~P#BwOa%nO#`6|O'z%nO~Oa%nO!g#vO#`6|O'z%nO~O!](tq!k(tqa(tq'z(tq~P!:tO!](jO!k(sq~O!S%hO!_%iO#j7TO(T%gO~O!_'`O%i7WO~On7[O!_'`O%i7WO~O#k'iaP'iaR'ia['iaa'iaj'iar'ia!S'ia!l'ia!p'ia#R'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#v'ia#x'ia#z'ia#{'ia'z'ia(a'ia(r'ia!k'ia!Y'ia'w'iav'ia!_'ia%i'ia!g'ia~P%-fO#k'kaP'kaR'ka['kaa'kaj'kar'ka!S'ka!l'ka!p'ka#R'ka#n'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#x'ka#z'ka#{'ka'z'ka(a'ka(r'ka!k'ka!Y'ka'w'kav'ka!_'ka%i'ka!g'ka~P%.XO#k$|iP$|iR$|i[$|ia$|ij$|ir$|i!S$|i!]$|i!l$|i!p$|i#R$|i#n$|i#o$|i#p$|i#q$|i#r$|i#s$|i#t$|i#u$|i#v$|i#x$|i#z$|i#{$|i'z$|i(a$|i(r$|i!k$|i!Y$|i'w$|i#`$|iv$|i!_$|i%i$|i!g$|i~P#/sO#k%aiP%aiR%ai[%aia%aij%air%ai!S%ai!l%ai!p%ai#R%ai#n%ai#o%ai#p%ai#q%ai#r%ai#s%ai#t%ai#u%ai#v%ai#x%ai#z%ai#{%ai'z%ai(a%ai(r%ai!k%ai!Y%ai'w%aiv%ai!_%ai%i%ai!g%ai~P%5oO#k%ciP%ciR%ci[%cia%cij%cir%ci!S%ci!l%ci!p%ci#R%ci#n%ci#o%ci#p%ci#q%ci#r%ci#s%ci#t%ci#u%ci#v%ci#x%ci#z%ci#{%ci'z%ci(a%ci(r%ci!k%ci!Y%ci'w%civ%ci!_%ci%i%ci!g%ci~P%6bO!]'Ya!k'Ya~P!:tO!].tO!k(ki~O$O#ci!]#ci!^#ci~P#BwOP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(aVO[#mij#mir#mi#R#mi#o#mi#p#mi#q#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#n#mi~P%NdO#n<_O~P%NdOP$[OR#zOr<kO!Q#yO!S#{O!l#xO!p$[O#n<_O#o<`O#p<`O#q<`O(aVO[#mij#mi#R#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#r#mi~P&!lO#r<aO~P&!lOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO(aVO#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#v#mi~P&$tOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO(aVO(z#}O#z#mi#{#mi$O#mi(r#mi(y#mi!]#mi!^#mi~O#x<eO~P&&uO#x#mi~P&&uO#v<cO~P&$tOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO#x<eO(aVO(y#|O(z#}O#{#mi$O#mi(r#mi!]#mi!^#mi~O#z#mi~P&)UO#z<gO~P&)UOa#|y!]#|y'z#|y'w#|y!Y#|y!k#|yv#|y!_#|y%i#|y!g#|y~P!:tO[#mij#mir#mi#R#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi!]#mi!^#mi~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#n<_O#o<`O#p<`O#q<`O(aVO(y#mi(z#mi~P&,QOn>^O!Q*OO'y*PO(y$}O(z%POP#miR#mi!S#mi!l#mi!p#mi#n#mi#o#mi#p#mi#q#mi(a#mi~P&,QO#S$dOP(`XR(`X[(`Xj(`Xn(`Xr(`X!Q(`X!S(`X!l(`X!p(`X#R(`X#n(`X#o(`X#p(`X#q(`X#r(`X#s(`X#t(`X#u(`X#v(`X#x(`X#z(`X#{(`X$O(`X'y(`X(a(`X(r(`X(y(`X(z(`X!](`X!^(`X~O$O$Pi!]$Pi!^$Pi~P#BwO$O!ri!^!ri~P$+oOg']a!]']a~P!1WO!^7nO~O!]'da!^'da~P#BwO!Y7oO~P#/sO!g#vO(r'pO!]'ea!k'ea~O!]/pO!k)Oi~O!]/pO!g#vO!k)Oi~Og$|q!]$|q#`$|q$O$|q~P!1WO!Y'ga!]'ga~P#/sO!g7vO~O!]/yO!Y)Pi~P#/sO!]/yO!Y)Pi~O!Y7yO~Oh%VOr8OO!l%eO(r'pO~Oj8QO!g#vO~Or8TO!g#vO(r'pO~O!Q*OO'y*PO(z%POn'ja(y'ja!]'ja#`'ja~Og'ja$O'ja~P&5RO!Q*OO'y*POn'la(y'la(z'la!]'la#`'la~Og'la$O'la~P&5tOg(_q!](_q~P!1WO#`8VOg(_q!](_q~P!1WO!Y8WO~Og%Oq!]%Oq#`%Oq$O%Oq~P!1WOa$oy!]$oy'z$oy'w$oy!Y$oy!k$oyv$oy!_$oy%i$oy!g$oy~P!:tO!g6rO~O!]5[O!_)Qa~O!_'`OP$TaR$Ta[$Taj$Tar$Ta!Q$Ta!S$Ta!]$Ta!l$Ta!p$Ta#R$Ta#n$Ta#o$Ta#p$Ta#q$Ta#r$Ta#s$Ta#t$Ta#u$Ta#v$Ta#x$Ta#z$Ta#{$Ta(a$Ta(r$Ta(y$Ta(z$Ta~O%i7WO~P&8fO%^8[Oa%[i!_%[i'z%[i!]%[i~Oa#cy!]#cy'z#cy'w#cy!Y#cy!k#cyv#cy!_#cy%i#cy!g#cy~P!:tO[8^O~Ob8`O(T+qO(VTO(YUO~O!]1TO!^)Xi~O`8dO~O(e(|O!]'pX!^'pX~O!]5uO!^)Ua~O!^8nO~P%;eO(o!sO~P$&YO#[8oO~O!_1oO~O!_1oO%i8qO~On8tO!_1oO%i8qO~O[8yO!]'sa!^'sa~O!]1zO!^)Vi~O!k8}O~O!k9OO~O!k9RO~O!k9RO~P%[Oa9TO~O!g9UO~O!k9VO~O!](wi!^(wi~P#BwOa%nO#`9_O'z%nO~O!](ty!k(tya(ty'z(ty~P!:tO!](jO!k(sy~O%i9bO~P&8fO!_'`O%i9bO~O#k$|qP$|qR$|q[$|qa$|qj$|qr$|q!S$|q!]$|q!l$|q!p$|q#R$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#t$|q#u$|q#v$|q#x$|q#z$|q#{$|q'z$|q(a$|q(r$|q!k$|q!Y$|q'w$|q#`$|qv$|q!_$|q%i$|q!g$|q~P#/sO#k'jaP'jaR'ja['jaa'jaj'jar'ja!S'ja!l'ja!p'ja#R'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#x'ja#z'ja#{'ja'z'ja(a'ja(r'ja!k'ja!Y'ja'w'jav'ja!_'ja%i'ja!g'ja~P&5RO#k'laP'laR'la['laa'laj'lar'la!S'la!l'la!p'la#R'la#n'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#x'la#z'la#{'la'z'la(a'la(r'la!k'la!Y'la'w'lav'la!_'la%i'la!g'la~P&5tO#k%OqP%OqR%Oq[%Oqa%Oqj%Oqr%Oq!S%Oq!]%Oq!l%Oq!p%Oq#R%Oq#n%Oq#o%Oq#p%Oq#q%Oq#r%Oq#s%Oq#t%Oq#u%Oq#v%Oq#x%Oq#z%Oq#{%Oq'z%Oq(a%Oq(r%Oq!k%Oq!Y%Oq'w%Oq#`%Oqv%Oq!_%Oq%i%Oq!g%Oq~P#/sO!]'Yi!k'Yi~P!:tO$O#cq!]#cq!^#cq~P#BwO(y$}OP%aaR%aa[%aaj%aar%aa!S%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa$O%aa(a%aa(r%aa!]%aa!^%aa~On%aa!Q%aa'y%aa(z%aa~P&IyO(z%POP%caR%ca[%caj%car%ca!S%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca$O%ca(a%ca(r%ca!]%ca!^%ca~On%ca!Q%ca'y%ca(y%ca~P&LQOn>^O!Q*OO'y*PO(z%PO~P&IyOn>^O!Q*OO'y*PO(y$}O~P&LQOR0kO!Q0kO!S0lO#S$dOP}a[}aj}an}ar}a!l}a!p}a#R}a#n}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#x}a#z}a#{}a$O}a'y}a(a}a(r}a(y}a(z}a!]}a!^}a~O!Q*OO'y*POP$saR$sa[$saj$san$sar$sa!S$sa!l$sa!p$sa#R$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#t$sa#u$sa#v$sa#x$sa#z$sa#{$sa$O$sa(a$sa(r$sa(y$sa(z$sa!]$sa!^$sa~O!Q*OO'y*POP$uaR$ua[$uaj$uan$uar$ua!S$ua!l$ua!p$ua#R$ua#n$ua#o$ua#p$ua#q$ua#r$ua#s$ua#t$ua#u$ua#v$ua#x$ua#z$ua#{$ua$O$ua(a$ua(r$ua(y$ua(z$ua!]$ua!^$ua~On>^O!Q*OO'y*PO(y$}O(z%PO~OP%TaR%Ta[%Taj%Tar%Ta!S%Ta!l%Ta!p%Ta#R%Ta#n%Ta#o%Ta#p%Ta#q%Ta#r%Ta#s%Ta#t%Ta#u%Ta#v%Ta#x%Ta#z%Ta#{%Ta$O%Ta(a%Ta(r%Ta!]%Ta!^%Ta~P''VO$O$mq!]$mq!^$mq~P#BwO$O$oq!]$oq!^$oq~P#BwO!^9oO~O$O9pO~P!1WO!g#vO!]'ei!k'ei~O!g#vO(r'pO!]'ei!k'ei~O!]/pO!k)Oq~O!Y'gi!]'gi~P#/sO!]/yO!Y)Pq~Or9wO!g#vO(r'pO~O[9yO!Y9xO~P#/sO!Y9xO~Oj:PO!g#vO~Og(_y!](_y~P!1WO!]'na!_'na~P#/sOa%[q!_%[q'z%[q!]%[q~P#/sO[:UO~O!]1TO!^)Xq~O`:YO~O#`:ZO!]'pa!^'pa~O!]5uO!^)Ui~P#BwO!S:]O~O!_1oO%i:`O~O(VTO(YUO(e:eO~O!]1zO!^)Vq~O!k:hO~O!k:iO~O!k:jO~O!k:jO~P%[O#`:mO!]#hy!^#hy~O!]#hy!^#hy~P#BwO%i:rO~P&8fO!_'`O%i:rO~O$O#|y!]#|y!^#|y~P#BwOP$|iR$|i[$|ij$|ir$|i!S$|i!l$|i!p$|i#R$|i#n$|i#o$|i#p$|i#q$|i#r$|i#s$|i#t$|i#u$|i#v$|i#x$|i#z$|i#{$|i$O$|i(a$|i(r$|i!]$|i!^$|i~P''VO!Q*OO'y*PO(z%POP'iaR'ia['iaj'ian'iar'ia!S'ia!l'ia!p'ia#R'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#v'ia#x'ia#z'ia#{'ia$O'ia(a'ia(r'ia(y'ia!]'ia!^'ia~O!Q*OO'y*POP'kaR'ka['kaj'kan'kar'ka!S'ka!l'ka!p'ka#R'ka#n'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#x'ka#z'ka#{'ka$O'ka(a'ka(r'ka(y'ka(z'ka!]'ka!^'ka~O(y$}OP%aiR%ai[%aij%ain%air%ai!Q%ai!S%ai!l%ai!p%ai#R%ai#n%ai#o%ai#p%ai#q%ai#r%ai#s%ai#t%ai#u%ai#v%ai#x%ai#z%ai#{%ai$O%ai'y%ai(a%ai(r%ai(z%ai!]%ai!^%ai~O(z%POP%ciR%ci[%cij%cin%cir%ci!Q%ci!S%ci!l%ci!p%ci#R%ci#n%ci#o%ci#p%ci#q%ci#r%ci#s%ci#t%ci#u%ci#v%ci#x%ci#z%ci#{%ci$O%ci'y%ci(a%ci(r%ci(y%ci!]%ci!^%ci~O$O$oy!]$oy!^$oy~P#BwO$O#cy!]#cy!^#cy~P#BwO!g#vO!]'eq!k'eq~O!]/pO!k)Oy~O!Y'gq!]'gq~P#/sOr:|O!g#vO(r'pO~O[;QO!Y;PO~P#/sO!Y;PO~Og(_!R!](_!R~P!1WOa%[y!_%[y'z%[y!]%[y~P#/sO!]1TO!^)Xy~O!]5uO!^)Uq~O(T;XO~O!_1oO%i;[O~O!k;_O~O%i;dO~P&8fOP$|qR$|q[$|qj$|qr$|q!S$|q!l$|q!p$|q#R$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#t$|q#u$|q#v$|q#x$|q#z$|q#{$|q$O$|q(a$|q(r$|q!]$|q!^$|q~P''VO!Q*OO'y*PO(z%POP'jaR'ja['jaj'jan'jar'ja!S'ja!l'ja!p'ja#R'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#x'ja#z'ja#{'ja$O'ja(a'ja(r'ja(y'ja!]'ja!^'ja~O!Q*OO'y*POP'laR'la['laj'lan'lar'la!S'la!l'la!p'la#R'la#n'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#x'la#z'la#{'la$O'la(a'la(r'la(y'la(z'la!]'la!^'la~OP%OqR%Oq[%Oqj%Oqr%Oq!S%Oq!l%Oq!p%Oq#R%Oq#n%Oq#o%Oq#p%Oq#q%Oq#r%Oq#s%Oq#t%Oq#u%Oq#v%Oq#x%Oq#z%Oq#{%Oq$O%Oq(a%Oq(r%Oq!]%Oq!^%Oq~P''VOg%e!Z!]%e!Z#`%e!Z$O%e!Z~P!1WO!Y;hO~P#/sOr;iO!g#vO(r'pO~O[;kO!Y;hO~P#/sO!]'pq!^'pq~P#BwO!]#h!Z!^#h!Z~P#BwO#k%e!ZP%e!ZR%e!Z[%e!Za%e!Zj%e!Zr%e!Z!S%e!Z!]%e!Z!l%e!Z!p%e!Z#R%e!Z#n%e!Z#o%e!Z#p%e!Z#q%e!Z#r%e!Z#s%e!Z#t%e!Z#u%e!Z#v%e!Z#x%e!Z#z%e!Z#{%e!Z'z%e!Z(a%e!Z(r%e!Z!k%e!Z!Y%e!Z'w%e!Z#`%e!Zv%e!Z!_%e!Z%i%e!Z!g%e!Z~P#/sOr;tO!g#vO(r'pO~O!Y;uO~P#/sOr;|O!g#vO(r'pO~O!Y;}O~P#/sOP%e!ZR%e!Z[%e!Zj%e!Zr%e!Z!S%e!Z!l%e!Z!p%e!Z#R%e!Z#n%e!Z#o%e!Z#p%e!Z#q%e!Z#r%e!Z#s%e!Z#t%e!Z#u%e!Z#v%e!Z#x%e!Z#z%e!Z#{%e!Z$O%e!Z(a%e!Z(r%e!Z!]%e!Z!^%e!Z~P''VOr<QO!g#vO(r'pO~Ov(fX~P1qO!Q%rO~P!)[O(U!lO~P!)[O!YfX!]fX#`fX~P%2OOP]XR]X[]Xj]Xr]X!Q]X!S]X!]]X!]fX!l]X!p]X#R]X#S]X#`]X#`fX#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X~O!gfX!k]X!kfX(rfX~P'LTOP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_XO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(T)]O(VTO(YUO(aVO(o[O~O!]<iO!^$qa~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<tO!S${O!_$|O!i>WO!l$xO#j<zO$W%`O$t<vO$v<xO$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~Ol)dO~P(!yOr!eX(r!eX~P#!iOr(jX(r(jX~P##[O!^]X!^fX~P'LTO!YfX!Y$zX!]fX!]$zX#`fX~P!0SO#k<^O~O!g#vO#k<^O~O#`<nO~Oj<bO~O#`=OO!](wX!^(wX~O#`<nO!](uX!^(uX~O#k=PO~Og=RO~P!1WO#k=XO~O#k=YO~Og=RO(T&ZO~O!g#vO#k=ZO~O!g#vO#k=PO~O$O=[O~P#BwO#k=]O~O#k=^O~O#k=cO~O#k=dO~O#k=eO~O#k=fO~O$O=gO~P!1WO$O=hO~P!1WOl=sO~P7eOk#S#T#U#W#X#[#i#j#u$n$t$v$y%]%^%h%i%j%q%s%v%w%y%{~(OT#o!X'|(U#ps#n#qr!Q'}$]'}(T$_(e~",
  goto: "$9Y)]PPPPPP)^PP)aP)rP+W/]PPPP6mPP7TPP=QPPP@tPA^PA^PPPA^PCfPA^PA^PA^PCjPCoPD^PIWPPPI[PPPPI[L_PPPLeMVPI[PI[PP! eI[PPPI[PI[P!#lI[P!'S!(X!(bP!)U!)Y!)U!,gPPPPPPP!-W!(XPP!-h!/YP!2iI[I[!2n!5z!:h!:h!>gPPP!>oI[PPPPPPPPP!BOP!C]PPI[!DnPI[PI[I[I[I[I[PI[!FQP!I[P!LbP!Lf!Lp!Lt!LtP!IXP!Lx!LxP#!OP#!SI[PI[#!Y#%_CjA^PA^PA^A^P#&lA^A^#)OA^#+vA^#.SA^A^#.r#1W#1W#1]#1f#1W#1qPP#1WPA^#2ZA^#6YA^A^6mPPP#:_PPP#:x#:xP#:xP#;`#:xPP#;fP#;]P#;]#;y#;]#<e#<k#<n)aP#<q)aP#<z#<z#<zP)aP)aP)aP)aPP)aP#=Q#=TP#=T)aP#=XP#=[P)aP)aP)aP)aP)aP)a)aPP#=b#=h#=s#=y#>P#>V#>]#>k#>q#>{#?R#?]#?c#?s#?y#@k#@}#AT#AZ#Ai#BO#Cs#DR#DY#Et#FS#Gt#HS#HY#H`#Hf#Hp#Hv#H|#IW#Ij#IpPPPPPPPPPPP#IvPPPPPPP#Jk#Mx$ b$ i$ qPPP$']P$'f$*_$0x$0{$1O$1}$2Q$2X$2aP$2g$2jP$3W$3[$4S$5b$5g$5}PP$6S$6Y$6^$6a$6e$6i$7e$7|$8e$8i$8l$8o$8y$8|$9Q$9UR!|RoqOXst!Z#d%m&r&t&u&w,s,x2[2_Y!vQ'`-e1o5{Q%tvQ%|yQ&T|Q&j!VS'W!e-]Q'f!iS'l!r!yU*k$|*Z*oQ+o%}S+|&V&WQ,d&dQ-c'_Q-m'gQ-u'mQ0[*qQ1b,OQ1y,eR<{<Y%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+],p,s,x-i-q.P.V.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3l4z6T6e6f6i6|8t9T9_S#q]<V!r)_$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SU+P%]<s<tQ+t&PQ,f&gQ,m&oQ0x+gQ0}+iQ1Y+uQ2R,kQ3`.gQ5`0|Q5f1TQ6[1zQ7Y3dQ8`5gR9e7['QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S!S!nQ!r!v!y!z$|'W'_'`'l'm'n*k*o*q*r-]-c-e-u0[0_1o5{5}%[$ti#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^Q&X|Q'U!eS'[%i-`Q+t&PQ,P&WQ,f&gQ0n+SQ1Y+uQ1_+{Q2Q,jQ2R,kQ5f1TQ5o1aQ6[1zQ6_1|Q6`2PQ8`5gQ8c5lQ8|6bQ:X8dQ:f8yQ;V:YR<}*ZrnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_R,h&k&z^OPXYstuvwz!Z!`!g!j!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'b'r(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>R>S[#]WZ#W#Z'X(T!b%jm#h#i#l$x%e%h(^(h(i(j*Y*^*b+Z+[+^,o-V.T.Z.[.]._/m/p2d3[3]4a6r7TQ%wxQ%{yW&Q|&V&W,OQ&_!TQ'c!hQ'e!iQ(q#sS+n%|%}Q+r&PQ,_&bQ,c&dS-l'f'gQ.i(rQ1R+oQ1X+uQ1Z+vQ1^+zQ1t,`S1x,d,eQ2|-mQ5e1TQ5i1WQ5n1`Q6Z1yQ8_5gQ8b5kQ8f5pQ:T8^R;T:U!U$zi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y!^%yy!i!u%{%|%}'V'e'f'g'k'u*j+n+o-Y-l-m-t0R0U1R2u2|3T4r4s4v7}9{Q+h%wQ,T&[Q,W&]Q,b&dQ.h(qQ1s,_U1w,c,d,eQ3e.iQ6U1tS6Y1x1yQ8x6Z#f>T#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^o>U<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hW%Ti%V*y>PS&[!Q&iQ&]!RQ&^!SU*}%[%d=sR,R&Y%]%Si#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^T)z$u){V+P%]<s<tW'[!e%i*Z-`S(}#y#zQ+c%rQ+y&SS.b(m(nQ1j,XQ5T0kR8i5u'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S$i$^c#Y#e%q%s%u(S(Y(t(y)R)S)T)U)V)W)X)Y)Z)[)^)`)b)g)q+d+x-Z-x-}.S.U.s.v.z.|.}/O/b0p2k2n3O3V3k3p3q3r3s3t3u3v3w3x3y3z3{3|4P4Q4X5X5c6u6{7Q7a7b7k7l8k9X9]9g9m9n:o;W;`<W=vT#TV#U'RkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ'Y!eR2q-]!W!nQ!e!r!v!y!z$|'W'_'`'l'm'n*Z*k*o*q*r-]-c-e-u0[0_1o5{5}R1l,ZnqOXst!Z#d%m&r&t&u&w,s,x2[2_Q&y!^Q'v!xS(s#u<^Q+l%zQ,]&_Q,^&aQ-j'dQ-w'oS.r(x=PS0q+X=ZQ1P+mQ1n,[Q2c,zQ2e,{Q2m-WQ2z-kQ2}-oS5Y0r=eQ5a1QS5d1S=fQ6t2oQ6x2{Q6}3SQ8]5bQ9Y6vQ9Z6yQ9^7OR:l9V$d$]c#Y#e%s%u(S(Y(t(y)R)S)T)U)V)W)X)Y)Z)[)^)`)b)g)q+d+x-Z-x-}.S.U.s.v.z.}/O/b0p2k2n3O3V3k3p3q3r3s3t3u3v3w3x3y3z3{3|4P4Q4X5X5c6u6{7Q7a7b7k7l8k9X9]9g9m9n:o;W;`<W=vS(o#p'iQ)P#zS+b%q.|S.c(n(pR3^.d'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SS#q]<VQ&t!XQ&u!YQ&w![Q&x!]R2Z,vQ'a!hQ+e%wQ-h'cS.e(q+hQ2x-gW3b.h.i0w0yQ6w2yW7U3_3a3e5^U9a7V7X7ZU:q9c9d9fS;b:p:sQ;p;cR;x;qU!wQ'`-eT5y1o5{!Q_OXZ`st!V!Z#d#h%e%m&i&k&r&t&u&w(j,s,x.[2[2_]!pQ!r'`-e1o5{T#q]<V%^{OPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_S(}#y#zS.b(m(n!s=l$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SU$fd)_,mS(p#p'iU*v%R(w4OU0m+O.n7gQ5^0xQ7V3`Q9d7YR:s9em!tQ!r!v!y!z'`'l'm'n-e-u1o5{5}Q't!uS(f#g2US-s'k'wQ/s*]Q0R*jQ3U-vQ4f/tQ4r0TQ4s0UQ4x0^Q7r4`S7}4t4vS8R4y4{Q9r7sQ9v7yQ9{8OQ:Q8TS:{9w9xS;g:|;PS;s;h;iS;{;t;uS<P;|;}R<S<QQ#wbQ's!uS(e#g2US(g#m+WQ+Y%fQ+j%xQ+p&OU-r'k't'wQ.W(fU/r*]*`/wQ0S*jQ0V*lQ1O+kQ1u,aS3R-s-vQ3Z.`S4e/s/tQ4n0PS4q0R0^Q4u0WQ6W1vQ7P3US7q4`4bQ7u4fU7|4r4x4{Q8P4wQ8v6XS9q7r7sQ9u7yQ9}8RQ:O8SQ:c8wQ:y9rS:z9v9xQ;S:QQ;^:dS;f:{;PS;r;g;hS;z;s;uS<O;{;}Q<R<PQ<T<SQ=o=jQ={=tR=|=uV!wQ'`-e%^aOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_S#wz!j!r=i$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SR=o>R%^bOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_Q%fj!^%xy!i!u%{%|%}'V'e'f'g'k'u*j+n+o-Y-l-m-t0R0U1R2u2|3T4r4s4v7}9{S&Oz!jQ+k%yQ,a&dW1v,b,c,d,eU6X1w1x1yS8w6Y6ZQ:d8x!r=j$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ=t>QR=u>R%QeOPXYstuvw!Z!`!g!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_Y#bWZ#W#Z(T!b%jm#h#i#l$x%e%h(^(h(i(j*Y*^*b+Z+[+^,o-V.T.Z.[.]._/m/p2d3[3]4a6r7TQ,n&o!p=k$Z$n)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SR=n'XU']!e%i*ZR2s-`%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+],p,s,x-i-q.P.V.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3l4z6T6e6f6i6|8t9T9_!r)_$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ,m&oQ0x+gQ3`.gQ7Y3dR9e7[!b$Tc#Y%q(S(Y(t(y)Z)[)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<W!P<d)^)q-Z.|2k2n3p3y3z4P4X6u7b7k7l8k9X9g9m9n;W;`=v!f$Vc#Y%q(S(Y(t(y)W)X)Z)[)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<W!T<f)^)q-Z.|2k2n3p3v3w3y3z4P4X6u7b7k7l8k9X9g9m9n;W;`=v!^$Zc#Y%q(S(Y(t(y)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<WQ4_/kz>S)^)q-Z.|2k2n3p4P4X6u7b7k7l8k9X9g9m9n;W;`=vQ>X>ZR>Y>['QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SS$oh$pR4U/U'XgOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/U/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>ST$kf$qQ$ifS)j$l)nR)v$qT$jf$qT)l$l)n'XhOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/U/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>ST$oh$pQ$rhR)u$p%^jOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_!s>Q$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S#glOPXZst!Z!`!o#S#d#o#{$n%m&k&n&o&r&t&u&w&{'T'b)O)s*i+]+g,p,s,x-i.g/V/n0]0l1r2S2T2V2X2[2_2a3d4T4z6T6e6f6i7[8t9T!U%Ri$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y#f(w#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^Q+T%aQ/c*Oo4O<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!U$yi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>YQ*c$zU*l$|*Z*oQ+U%bQ0W*m#f=q#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n=r<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hQ=w>TQ=x>UQ=y>VR=z>W!U%Ri$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y#f(w#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^o4O<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hnoOXst!Z#d%m&r&t&u&w,s,x2[2_S*f${*YQ-R'OQ-S'QR4i/y%[%Si#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^Q,U&]Q1h,WQ5s1gR8h5tV*n$|*Z*oU*n$|*Z*oT5z1o5{S0P*i/nQ4w0]T8S4z:]Q+j%xQ0V*lQ1O+kQ1u,aQ6W1vQ8v6XQ:c8wR;^:d!U%Oi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Yx*R$v)e*S*u+V/v0d0e4R4g5R5S5W7p8U:R:x=p=}>OS0`*t0a#f<o#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n<p<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!d=S(u)c*[*e.j.m.q/_/k/|0v1e3h4[4h4l5r7]7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[`=T3}7c7f7j9h:t:w;yS=_.l3iT=`7e9k!U%Qi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y|*T$v)e*U*t+V/g/v0d0e4R4g4|5R5S5W7p8U:R:x=p=}>OS0b*u0c#f<q#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n<r<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!h=U(u)c*[*e.k.l.q/_/k/|0v1e3f3h4[4h4l5r7]7^7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[d=V3}7d7e7j9h9i:t:u:w;yS=a.m3jT=b7f9lrnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_Q&f!UR,p&ornOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_R&f!UQ,Y&^R1d,RsnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_Q1p,_S6R1s1tU8p6P6Q6US:_8r8sS;Y:^:aQ;m;ZR;w;nQ&m!VR,i&iR6_1|R:f8yW&Q|&V&W,OR1Z+vQ&r!WR,s&sR,y&xT2],x2_R,}&yQ,|&yR2f,}Q'y!{R-y'ySsOtQ#dXT%ps#dQ#OTR'{#OQ#RUR'}#RQ){$uR/`){Q#UVR(Q#UQ#XWU(W#X(X.QQ(X#YR.Q(YQ-^'YR2r-^Q.u(yS3m.u3nR3n.vQ-e'`R2v-eY!rQ'`-e1o5{R'j!rQ/Q)eR4S/QU#_W%h*YU(_#_(`.RQ(`#`R.R(ZQ-a']R2t-at`OXst!V!Z#d%m&i&k&r&t&u&w,s,x2[2_S#hZ%eU#r`#h.[R.[(jQ(k#jQ.X(gW.a(k.X3X7RQ3X.YR7R3YQ)n$lR/W)nQ$phR)t$pQ$`cU)a$`-|<jQ-|<WR<j)qQ/q*]W4c/q4d7t9sU4d/r/s/tS7t4e4fR9s7u$e*Q$v(u)c)e*[*e*t*u+Q+R+V.l.m.o.p.q/_/g/i/k/v/|0d0e0v1e3f3g3h3}4R4[4g4h4l4|5O5R5S5W5r7]7^7_7`7e7f7h7i7j7p7w7z8U8X8Z9h9i9j9t9|:R:S:t:u:v:w:x:};R;e;j;v;y=p=}>O>Z>[Q/z*eU4k/z4m7xQ4m/|R7x4lS*o$|*ZR0Y*ox*S$v)e*t*u+V/v0d0e4R4g5R5S5W7p8U:R:x=p=}>O!d.j(u)c*[*e.l.m.q/_/k/|0v1e3h4[4h4l5r7]7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[U/h*S.j7ca7c3}7e7f7j9h:t:w;yQ0a*tQ3i.lU4}0a3i9kR9k7e|*U$v)e*t*u+V/g/v0d0e4R4g4|5R5S5W7p8U:R:x=p=}>O!h.k(u)c*[*e.l.m.q/_/k/|0v1e3f3h4[4h4l5r7]7^7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[U/j*U.k7de7d3}7e7f7j9h9i:t:u:w;yQ0c*uQ3j.mU5P0c3j9lR9l7fQ*z%UR0g*zQ5]0vR8Y5]Q+_%kR0u+_Q5v1jS8j5v:[R:[8kQ,[&_R1m,[Q5{1oR8m5{Q1{,fS6]1{8zR8z6_Q1U+rW5h1U5j8a:VQ5j1XQ8a5iR:V8bQ+w&QR1[+wQ2_,xR6m2_YrOXst#dQ&v!ZQ+a%mQ,r&rQ,t&tQ,u&uQ,w&wQ2Y,sS2],x2_R6l2[Q%opQ&z!_Q&}!aQ'P!bQ'R!cQ'q!uQ+`%lQ+l%zQ,Q&XQ,h&mQ-P&|W-p'k's't'wQ-w'oQ0X*nQ1P+mQ1c,PS2O,i,lQ2g-OQ2h-RQ2i-SQ2}-oW3P-r-s-v-xQ5a1QQ5m1_Q5q1eQ6V1uQ6a2QQ6k2ZU6z3O3R3UQ6}3SQ8]5bQ8e5oQ8g5rQ8l5zQ8u6WQ8{6`S9[6{7PQ9^7OQ:W8cQ:b8vQ:g8|Q:n9]Q;U:XQ;]:cQ;a:oQ;l;VR;o;^Q%zyQ'd!iQ'o!uU+m%{%|%}Q-W'VU-k'e'f'gS-o'k'uQ0Q*jS1Q+n+oQ2o-YS2{-l-mQ3S-tS4p0R0UQ5b1RQ6v2uQ6y2|Q7O3TU7{4r4s4vQ9z7}R;O9{S$wi>PR*{%VU%Ui%V>PR0f*yQ$viS(u#v+iS)c$b$cQ)e$dQ*[$xS*e${*YQ*t%OQ*u%QQ+Q%^Q+R%_Q+V%cQ.l<oQ.m<qQ.o<uQ.p<wQ.q<yQ/_)yQ/g*RQ/i*TQ/k*VQ/v*aS/|*g/mQ0d*wQ0e*xl0v+f,V.f1i1q3c6S7W8q9b:`:r;[;dQ1e,SQ3f=SQ3g=UQ3h=XS3}<l<mQ4R/PS4[/d4^Q4g/xQ4h/yQ4l/{Q4|0`Q5O0bQ5R0iQ5S0jQ5W0oQ5r1fQ7]=]Q7^=_Q7_=aQ7`=cQ7e<pQ7f<rQ7h<vQ7i<xQ7j<zQ7p4_Q7w4jQ7z4oQ8U5QQ8X5[Q8Z5_Q9h=YQ9i=TQ9j=VQ9t7vQ9|8QQ:R8VQ:S8[Q:t=^Q:u=`Q:v=bQ:w=dQ:x9pQ:}9yQ;R:PQ;e=gQ;j;QQ;v;kQ;y=hQ=p>PQ=}>XQ>O>YQ>Z>]R>[>^Q+O%]Q.n<sR7g<tnpOXst!Z#d%m&r&t&u&w,s,x2[2_Q!fPS#fZ#oQ&|!`W'h!o*i0]4zQ(P#SQ)Q#{Q)r$nS,l&k&nQ,q&oQ-O&{S-T'T/nQ-g'bQ.x)OQ/[)sQ0s+]Q0y+gQ2W,pQ2y-iQ3a.gQ4W/VQ5U0lQ6Q1rQ6c2SQ6d2TQ6h2VQ6j2XQ6o2aQ7Z3dQ7m4TQ8s6TQ9P6eQ9Q6fQ9S6iQ9f7[Q:a8tR:k9T#[cOPXZst!Z!`!o#d#o#{%m&k&n&o&r&t&u&w&{'T'b)O*i+]+g,p,s,x-i.g/n0]0l1r2S2T2V2X2[2_2a3d4z6T6e6f6i7[8t9TQ#YWQ#eYQ%quQ%svS%uw!gS(S#W(VQ(Y#ZQ(t#uQ(y#xQ)R$OQ)S$PQ)T$QQ)U$RQ)V$SQ)W$TQ)X$UQ)Y$VQ)Z$WQ)[$XQ)^$ZQ)`$_Q)b$aQ)g$eW)q$n)s/V4TQ+d%tQ+x&RS-Z'X2pQ-x'rS-}(T.PQ.S(]Q.U(dQ.s(xQ.v(zQ.z<UQ.|<XQ.}<YQ/O<]Q/b)}Q0p+XQ2k-UQ2n-XQ3O-qQ3V.VQ3k.tQ3p<^Q3q<_Q3r<`Q3s<aQ3t<bQ3u<cQ3v<dQ3w<eQ3x<fQ3y<gQ3z<hQ3{.{Q3|<kQ4P<nQ4Q<{Q4X<iQ5X0rQ5c1SQ6u=OQ6{3QQ7Q3WQ7a3lQ7b=PQ7k=RQ7l=ZQ8k5wQ9X6sQ9]6|Q9g=[Q9m=eQ9n=fQ:o9_Q;W:ZQ;`:mQ<W#SR=v>SR#[WR'Z!el!tQ!r!v!y!z'`'l'm'n-e-u1o5{5}S'V!e-]U*j$|*Z*oS-Y'W'_S0U*k*qQ0^*rQ2u-cQ4v0[R4{0_R({#xQ!fQT-d'`-e]!qQ!r'`-e1o5{Q#p]R'i<VR)f$dY!uQ'`-e1o5{Q'k!rS'u!v!yS'w!z5}S-t'l'mQ-v'nR3T-uT#kZ%eS#jZ%eS%km,oU(g#h#i#lS.Y(h(iQ.^(jQ0t+^Q3Y.ZU3Z.[.]._S7S3[3]R9`7Td#^W#W#Z%h(T(^*Y+Z.T/mr#gZm#h#i#l%e(h(i(j+^.Z.[.]._3[3]7TS*]$x*bQ/t*^Q2U,oQ2l-VQ4`/pQ6q2dQ7s4aQ9W6rT=m'X+[V#aW%h*YU#`W%h*YS(U#W(^U(Z#Z+Z/mS-['X+[T.O(T.TV'^!e%i*ZQ$lfR)x$qT)m$l)nR4V/UT*_$x*bT*h${*YQ0w+fQ1g,VQ3_.fQ5t1iQ6P1qQ7X3cQ8r6SQ9c7WQ:^8qQ:p9bQ;Z:`Q;c:rQ;n;[R;q;dnqOXst!Z#d%m&r&t&u&w,s,x2[2_Q&l!VR,h&itmOXst!U!V!Z#d%m&i&r&t&u&w,s,x2[2_R,o&oT%lm,oR1k,XR,g&gQ&U|S+}&V&WR1^,OR+s&PT&p!W&sT&q!W&sT2^,x2_",
  nodeNames: "⚠ ArithOp ArithOp ?. JSXStartTag LineComment BlockComment Script Hashbang ExportDeclaration export Star as VariableName String Escape from ; default FunctionDeclaration async function VariableDefinition > < TypeParamList in out const TypeDefinition extends ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation InterpolationStart NullType null VoidType void TypeofType typeof MemberExpression . PropertyName [ TemplateString Escape Interpolation super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewTarget new NewExpression ) ( ArgList UnaryExpression delete LogicOp BitOp YieldExpression yield AwaitExpression await ParenthesizedExpression ClassExpression class ClassBody MethodDeclaration Decorator @ MemberExpression PrivatePropertyName CallExpression TypeArgList CompareOp < declare Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly accessor Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof satisfies CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression InstantiationExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXSelfClosingTag JSXIdentifier JSXBuiltin JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast < ArrowFunction TypeParamList SequenceExpression InstantiationExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature PropertyDefinition CallSignature TypePredicate asserts is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var using TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration defer ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement SingleExpression SingleClassItem",
  maxTerm: 380,
  context: Jy,
  nodeProps: [
    ["isolate", -8, 5, 6, 14, 37, 39, 51, 53, 55, ""],
    ["group", -26, 9, 17, 19, 68, 207, 211, 215, 216, 218, 221, 224, 234, 237, 243, 245, 247, 249, 252, 258, 264, 266, 268, 270, 272, 274, 275, "Statement", -34, 13, 14, 32, 35, 36, 42, 51, 54, 55, 57, 62, 70, 72, 76, 80, 82, 84, 85, 110, 111, 120, 121, 136, 139, 141, 142, 143, 144, 145, 147, 148, 167, 169, 171, "Expression", -23, 31, 33, 37, 41, 43, 45, 173, 175, 177, 178, 180, 181, 182, 184, 185, 186, 188, 189, 190, 201, 203, 205, 206, "Type", -3, 88, 103, 109, "ClassItem"],
    ["openedBy", 23, "<", 38, "InterpolationStart", 56, "[", 60, "{", 73, "(", 160, "JSXStartCloseTag"],
    ["closedBy", -2, 24, 168, ">", 40, "InterpolationEnd", 50, "]", 61, "}", 74, ")", 165, "JSXEndTag"]
  ],
  propSources: [rw],
  skippedNodes: [0, 5, 6, 278],
  repeatNodeCount: 37,
  tokenData: "$Fq07[R!bOX%ZXY+gYZ-yZ[+g[]%Z]^.c^p%Zpq+gqr/mrs3cst:_tuEruvJSvwLkwx! Yxy!'iyz!(sz{!)}{|!,q|}!.O}!O!,q!O!P!/Y!P!Q!9j!Q!R#:O!R![#<_![!]#I_!]!^#Jk!^!_#Ku!_!`$![!`!a$$v!a!b$*T!b!c$,r!c!}Er!}#O$-|#O#P$/W#P#Q$4o#Q#R$5y#R#SEr#S#T$7W#T#o$8b#o#p$<r#p#q$=h#q#r$>x#r#s$@U#s$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$I|Er$I|$I}$Dk$I}$JO$Dk$JO$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr(n%d_$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&j&hT$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c&j&zP;=`<%l&c'|'U]$i&j(Z!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!b(SU(Z!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!b(iP;=`<%l'}'|(oP;=`<%l&}'[(y]$i&j(WpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rp)wU(WpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)rp*^P;=`<%l)r'[*dP;=`<%l(r#S*nX(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g#S+^P;=`<%l*g(n+dP;=`<%l%Z07[+rq$i&j(Wp(Z!b'|0/lOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p$f%Z$f$g+g$g#BY%Z#BY#BZ+g#BZ$IS%Z$IS$I_+g$I_$JT%Z$JT$JU+g$JU$KV%Z$KV$KW+g$KW&FU%Z&FU&FV+g&FV;'S%Z;'S;=`+a<%l?HT%Z?HT?HU+g?HUO%Z07[.ST(X#S$i&j'}0/lO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c07[.n_$i&j(Wp(Z!b'}0/lOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)3p/x`$i&j!p),Q(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW1V`#v(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`2X!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW2d_#v(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At3l_(V':f$i&j(Z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k(^4r_$i&j(Z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k&z5vX$i&jOr5qrs6cs!^5q!^!_6y!_#o5q#o#p6y#p;'S5q;'S;=`7h<%lO5q&z6jT$d`$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c`6|TOr6yrs7]s;'S6y;'S;=`7b<%lO6y`7bO$d``7eP;=`<%l6y&z7kP;=`<%l5q(^7w]$d`$i&j(Z!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!r8uZ(Z!bOY8pYZ6yZr8prs9hsw8pwx6yx#O8p#O#P6y#P;'S8p;'S;=`:R<%lO8p!r9oU$d`(Z!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!r:UP;=`<%l8p(^:[P;=`<%l4k%9[:hh$i&j(Wp(Z!bOY%ZYZ&cZq%Zqr<Srs&}st%ZtuCruw%Zwx(rx!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr(r<__WS$i&j(Wp(Z!bOY<SYZ&cZr<Srs=^sw<Swx@nx!^<S!^!_Bm!_#O<S#O#P>`#P#o<S#o#pBm#p;'S<S;'S;=`Cl<%lO<S(Q=g]WS$i&j(Z!bOY=^YZ&cZw=^wx>`x!^=^!^!_?q!_#O=^#O#P>`#P#o=^#o#p?q#p;'S=^;'S;=`@h<%lO=^&n>gXWS$i&jOY>`YZ&cZ!^>`!^!_?S!_#o>`#o#p?S#p;'S>`;'S;=`?k<%lO>`S?XSWSOY?SZ;'S?S;'S;=`?e<%lO?SS?hP;=`<%l?S&n?nP;=`<%l>`!f?xWWS(Z!bOY?qZw?qwx?Sx#O?q#O#P?S#P;'S?q;'S;=`@b<%lO?q!f@eP;=`<%l?q(Q@kP;=`<%l=^'`@w]WS$i&j(WpOY@nYZ&cZr@nrs>`s!^@n!^!_Ap!_#O@n#O#P>`#P#o@n#o#pAp#p;'S@n;'S;=`Bg<%lO@ntAwWWS(WpOYApZrAprs?Ss#OAp#O#P?S#P;'SAp;'S;=`Ba<%lOAptBdP;=`<%lAp'`BjP;=`<%l@n#WBvYWS(Wp(Z!bOYBmZrBmrs?qswBmwxApx#OBm#O#P?S#P;'SBm;'S;=`Cf<%lOBm#WCiP;=`<%lBm(rCoP;=`<%l<S%9[C}i$i&j(o%1l(Wp(Z!bOY%ZYZ&cZr%Zrs&}st%ZtuCruw%Zwx(rx!Q%Z!Q![Cr![!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr%9[EoP;=`<%lCr07[FRk$i&j(Wp(Z!b$]#t(T,2j(e$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr+dHRk$i&j(Wp(Z!b$]#tOY%ZYZ&cZr%Zrs&}st%ZtuGvuw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Gv![!^%Z!^!_*g!_!c%Z!c!}Gv!}#O%Z#O#P&c#P#R%Z#R#SGv#S#T%Z#T#oGv#o#p*g#p$g%Z$g;'SGv;'S;=`Iv<%lOGv+dIyP;=`<%lGv07[JPP;=`<%lEr(KWJ_`$i&j(Wp(Z!b#p(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWKl_$i&j$Q(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,#xLva(z+JY$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sv%ZvwM{wx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWNW`$i&j#z(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At! c_(Y';W$i&j(WpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b'l!!i_$i&j(WpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b&z!#mX$i&jOw!#hwx6cx!^!#h!^!_!$Y!_#o!#h#o#p!$Y#p;'S!#h;'S;=`!$r<%lO!#h`!$]TOw!$Ywx7]x;'S!$Y;'S;=`!$l<%lO!$Y`!$oP;=`<%l!$Y&z!$uP;=`<%l!#h'l!%R]$d`$i&j(WpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r!Q!&PZ(WpOY!%zYZ!$YZr!%zrs!$Ysw!%zwx!&rx#O!%z#O#P!$Y#P;'S!%z;'S;=`!']<%lO!%z!Q!&yU$d`(WpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)r!Q!'`P;=`<%l!%z'l!'fP;=`<%l!!b/5|!'t_!l/.^$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#&U!)O_!k!Lf$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z-!n!*[b$i&j(Wp(Z!b(U%&f#q(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rxz%Zz{!+d{!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW!+o`$i&j(Wp(Z!b#n(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;x!,|`$i&j(Wp(Z!br+4YOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,$U!.Z_!]+Jf$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!/ec$i&j(Wp(Z!b!Q.2^OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!0p!P!Q%Z!Q![!3Y![!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!0ya$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!2O!P!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!2Z_![!L^$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!3eg$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!3Y![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S!3Y#S#X%Z#X#Y!4|#Y#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!5Vg$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx{%Z{|!6n|}%Z}!O!6n!O!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!6wc$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!8_c$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!9uf$i&j(Wp(Z!b#o(ChOY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcxz!;Zz{#-}{!P!;Z!P!Q#/d!Q!^!;Z!^!_#(i!_!`#7S!`!a#8i!a!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z?O!;fb$i&j(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z>^!<w`$i&j(Z!b!X7`OY!<nYZ&cZw!<nwx!=yx!P!<n!P!Q!Eq!Q!^!<n!^!_!Gr!_!}!<n!}#O!KS#O#P!Dy#P#o!<n#o#p!Gr#p;'S!<n;'S;=`!L]<%lO!<n<z!>Q^$i&j!X7`OY!=yYZ&cZ!P!=y!P!Q!>|!Q!^!=y!^!_!@c!_!}!=y!}#O!CW#O#P!Dy#P#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!?Td$i&j!X7`O!^&c!_#W&c#W#X!>|#X#Z&c#Z#[!>|#[#]&c#]#^!>|#^#a&c#a#b!>|#b#g&c#g#h!>|#h#i&c#i#j!>|#j#k!>|#k#m&c#m#n!>|#n#o&c#p;'S&c;'S;=`&w<%lO&c7`!@hX!X7`OY!@cZ!P!@c!P!Q!AT!Q!}!@c!}#O!Ar#O#P!Bq#P;'S!@c;'S;=`!CQ<%lO!@c7`!AYW!X7`#W#X!AT#Z#[!AT#]#^!AT#a#b!AT#g#h!AT#i#j!AT#j#k!AT#m#n!AT7`!AuVOY!ArZ#O!Ar#O#P!B[#P#Q!@c#Q;'S!Ar;'S;=`!Bk<%lO!Ar7`!B_SOY!ArZ;'S!Ar;'S;=`!Bk<%lO!Ar7`!BnP;=`<%l!Ar7`!BtSOY!@cZ;'S!@c;'S;=`!CQ<%lO!@c7`!CTP;=`<%l!@c<z!C][$i&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#O!CW#O#P!DR#P#Q!=y#Q#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DWX$i&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DvP;=`<%l!CW<z!EOX$i&jOY!=yYZ&cZ!^!=y!^!_!@c!_#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!EnP;=`<%l!=y>^!Ezl$i&j(Z!b!X7`OY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#W&}#W#X!Eq#X#Z&}#Z#[!Eq#[#]&}#]#^!Eq#^#a&}#a#b!Eq#b#g&}#g#h!Eq#h#i&}#i#j!Eq#j#k!Eq#k#m&}#m#n!Eq#n#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}8r!GyZ(Z!b!X7`OY!GrZw!Grwx!@cx!P!Gr!P!Q!Hl!Q!}!Gr!}#O!JU#O#P!Bq#P;'S!Gr;'S;=`!J|<%lO!Gr8r!Hse(Z!b!X7`OY'}Zw'}x#O'}#P#W'}#W#X!Hl#X#Z'}#Z#[!Hl#[#]'}#]#^!Hl#^#a'}#a#b!Hl#b#g'}#g#h!Hl#h#i'}#i#j!Hl#j#k!Hl#k#m'}#m#n!Hl#n;'S'};'S;=`(f<%lO'}8r!JZX(Z!bOY!JUZw!JUwx!Arx#O!JU#O#P!B[#P#Q!Gr#Q;'S!JU;'S;=`!Jv<%lO!JU8r!JyP;=`<%l!JU8r!KPP;=`<%l!Gr>^!KZ^$i&j(Z!bOY!KSYZ&cZw!KSwx!CWx!^!KS!^!_!JU!_#O!KS#O#P!DR#P#Q!<n#Q#o!KS#o#p!JU#p;'S!KS;'S;=`!LV<%lO!KS>^!LYP;=`<%l!KS>^!L`P;=`<%l!<n=l!Ll`$i&j(Wp!X7`OY!LcYZ&cZr!Lcrs!=ys!P!Lc!P!Q!Mn!Q!^!Lc!^!_# o!_!}!Lc!}#O#%P#O#P!Dy#P#o!Lc#o#p# o#p;'S!Lc;'S;=`#&Y<%lO!Lc=l!Mwl$i&j(Wp!X7`OY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#W(r#W#X!Mn#X#Z(r#Z#[!Mn#[#](r#]#^!Mn#^#a(r#a#b!Mn#b#g(r#g#h!Mn#h#i(r#i#j!Mn#j#k!Mn#k#m(r#m#n!Mn#n#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r8Q# vZ(Wp!X7`OY# oZr# ors!@cs!P# o!P!Q#!i!Q!}# o!}#O#$R#O#P!Bq#P;'S# o;'S;=`#$y<%lO# o8Q#!pe(Wp!X7`OY)rZr)rs#O)r#P#W)r#W#X#!i#X#Z)r#Z#[#!i#[#])r#]#^#!i#^#a)r#a#b#!i#b#g)r#g#h#!i#h#i)r#i#j#!i#j#k#!i#k#m)r#m#n#!i#n;'S)r;'S;=`*Z<%lO)r8Q#$WX(WpOY#$RZr#$Rrs!Ars#O#$R#O#P!B[#P#Q# o#Q;'S#$R;'S;=`#$s<%lO#$R8Q#$vP;=`<%l#$R8Q#$|P;=`<%l# o=l#%W^$i&j(WpOY#%PYZ&cZr#%Prs!CWs!^#%P!^!_#$R!_#O#%P#O#P!DR#P#Q!Lc#Q#o#%P#o#p#$R#p;'S#%P;'S;=`#&S<%lO#%P=l#&VP;=`<%l#%P=l#&]P;=`<%l!Lc?O#&kn$i&j(Wp(Z!b!X7`OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#W%Z#W#X#&`#X#Z%Z#Z#[#&`#[#]%Z#]#^#&`#^#a%Z#a#b#&`#b#g%Z#g#h#&`#h#i%Z#i#j#&`#j#k#&`#k#m%Z#m#n#&`#n#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z9d#(r](Wp(Z!b!X7`OY#(iZr#(irs!Grsw#(iwx# ox!P#(i!P!Q#)k!Q!}#(i!}#O#+`#O#P!Bq#P;'S#(i;'S;=`#,`<%lO#(i9d#)th(Wp(Z!b!X7`OY*gZr*grs'}sw*gwx)rx#O*g#P#W*g#W#X#)k#X#Z*g#Z#[#)k#[#]*g#]#^#)k#^#a*g#a#b#)k#b#g*g#g#h#)k#h#i*g#i#j#)k#j#k#)k#k#m*g#m#n#)k#n;'S*g;'S;=`+Z<%lO*g9d#+gZ(Wp(Z!bOY#+`Zr#+`rs!JUsw#+`wx#$Rx#O#+`#O#P!B[#P#Q#(i#Q;'S#+`;'S;=`#,Y<%lO#+`9d#,]P;=`<%l#+`9d#,cP;=`<%l#(i?O#,o`$i&j(Wp(Z!bOY#,fYZ&cZr#,frs!KSsw#,fwx#%Px!^#,f!^!_#+`!_#O#,f#O#P!DR#P#Q!;Z#Q#o#,f#o#p#+`#p;'S#,f;'S;=`#-q<%lO#,f?O#-tP;=`<%l#,f?O#-zP;=`<%l!;Z07[#.[b$i&j(Wp(Z!b(O0/l!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z07[#/o_$i&j(Wp(Z!bT0/lOY#/dYZ&cZr#/drs#0nsw#/dwx#4Ox!^#/d!^!_#5}!_#O#/d#O#P#1p#P#o#/d#o#p#5}#p;'S#/d;'S;=`#6|<%lO#/d06j#0w]$i&j(Z!bT0/lOY#0nYZ&cZw#0nwx#1px!^#0n!^!_#3R!_#O#0n#O#P#1p#P#o#0n#o#p#3R#p;'S#0n;'S;=`#3x<%lO#0n05W#1wX$i&jT0/lOY#1pYZ&cZ!^#1p!^!_#2d!_#o#1p#o#p#2d#p;'S#1p;'S;=`#2{<%lO#1p0/l#2iST0/lOY#2dZ;'S#2d;'S;=`#2u<%lO#2d0/l#2xP;=`<%l#2d05W#3OP;=`<%l#1p01O#3YW(Z!bT0/lOY#3RZw#3Rwx#2dx#O#3R#O#P#2d#P;'S#3R;'S;=`#3r<%lO#3R01O#3uP;=`<%l#3R06j#3{P;=`<%l#0n05x#4X]$i&j(WpT0/lOY#4OYZ&cZr#4Ors#1ps!^#4O!^!_#5Q!_#O#4O#O#P#1p#P#o#4O#o#p#5Q#p;'S#4O;'S;=`#5w<%lO#4O00^#5XW(WpT0/lOY#5QZr#5Qrs#2ds#O#5Q#O#P#2d#P;'S#5Q;'S;=`#5q<%lO#5Q00^#5tP;=`<%l#5Q05x#5zP;=`<%l#4O01p#6WY(Wp(Z!bT0/lOY#5}Zr#5}rs#3Rsw#5}wx#5Qx#O#5}#O#P#2d#P;'S#5};'S;=`#6v<%lO#5}01p#6yP;=`<%l#5}07[#7PP;=`<%l#/d)3h#7ab$i&j$Q(Ch(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;ZAt#8vb$Z#t$i&j(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z'Ad#:Zp$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#U%Z#U#V#?i#V#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#d#Bq#d#l%Z#l#m#Es#m#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#<jk$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#>j_$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#?rd$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#A]f$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Bzc$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Dbe$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#E|g$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Gpi$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x#Il_!g$b$i&j$O)Lv(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)[#Jv_al$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f#LS^h#)`#R-<U(Wp(Z!b$n7`OY*gZr*grs'}sw*gwx)rx!P*g!P!Q#MO!Q!^*g!^!_#Mt!_!`$ f!`#O*g#P;'S*g;'S;=`+Z<%lO*g(n#MXX$k&j(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El#M}Z#r(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx!_*g!_!`#Np!`#O*g#P;'S*g;'S;=`+Z<%lO*g(El#NyX$Q(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El$ oX#s(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g*)x$!ga#`*!Y$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`!a$#l!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(K[$#w_#k(Cl$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x$%Vag!*r#s(Ch$f#|$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`$&[!`!a$'f!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$&g_#s(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$'qa#r(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`!a$(v!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$)R`#r(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(Kd$*`a(r(Ct$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!a%Z!a!b$+e!b#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$+p`$i&j#{(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#`$,}_!|$Ip$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f$.X_!S0,v$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(n$/]Z$i&jO!^$0O!^!_$0f!_#i$0O#i#j$0k#j#l$0O#l#m$2^#m#o$0O#o#p$0f#p;'S$0O;'S;=`$4i<%lO$0O(n$0VT_#S$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#S$0kO_#S(n$0p[$i&jO!Q&c!Q![$1f![!^&c!_!c&c!c!i$1f!i#T&c#T#Z$1f#Z#o&c#o#p$3|#p;'S&c;'S;=`&w<%lO&c(n$1kZ$i&jO!Q&c!Q![$2^![!^&c!_!c&c!c!i$2^!i#T&c#T#Z$2^#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$2cZ$i&jO!Q&c!Q![$3U![!^&c!_!c&c!c!i$3U!i#T&c#T#Z$3U#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$3ZZ$i&jO!Q&c!Q![$0O![!^&c!_!c&c!c!i$0O!i#T&c#T#Z$0O#Z#o&c#p;'S&c;'S;=`&w<%lO&c#S$4PR!Q![$4Y!c!i$4Y#T#Z$4Y#S$4]S!Q![$4Y!c!i$4Y#T#Z$4Y#q#r$0f(n$4lP;=`<%l$0O#1[$4z_!Y#)l$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$6U`#x(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;p$7c_$i&j(Wp(Z!b(a+4QOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$8qk$i&j(Wp(Z!b(T,2j$_#t(e$I[OY%ZYZ&cZr%Zrs&}st%Ztu$8buw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$8b![!^%Z!^!_*g!_!c%Z!c!}$8b!}#O%Z#O#P&c#P#R%Z#R#S$8b#S#T%Z#T#o$8b#o#p*g#p$g%Z$g;'S$8b;'S;=`$<l<%lO$8b+d$:qk$i&j(Wp(Z!b$_#tOY%ZYZ&cZr%Zrs&}st%Ztu$:fuw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$:f![!^%Z!^!_*g!_!c%Z!c!}$:f!}#O%Z#O#P&c#P#R%Z#R#S$:f#S#T%Z#T#o$:f#o#p*g#p$g%Z$g;'S$:f;'S;=`$<f<%lO$:f+d$<iP;=`<%l$:f07[$<oP;=`<%l$8b#Jf$<{X!_#Hb(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g,#x$=sa(y+JY$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p#q$+e#q;'S%Z;'S;=`+a<%lO%Z)>v$?V_!^(CdvBr$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z?O$@a_!q7`$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$Aq|$i&j(Wp(Z!b'|0/l$]#t(T,2j(e$I[OX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr07[$D|k$i&j(Wp(Z!b'}0/l$]#t(T,2j(e$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr",
  tokenizers: [tw, iw, nw, sw, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, ew, new Ch("$S~RRtu[#O#Pg#S#T#|~_P#o#pb~gOx~~jVO#i!P#i#j!U#j#l!P#l#m!q#m;'S!P;'S;=`#v<%lO!P~!UO!U~~!XS!Q![!e!c!i!e#T#Z!e#o#p#Z~!hR!Q![!q!c!i!q#T#Z!q~!tR!Q![!}!c!i!}#T#Z!}~#QR!Q![!P!c!i!P#T#Z!P~#^R!Q![#g!c!i#g#T#Z#g~#jS!Q![#g!c!i#g#T#Z#g#q#r!P~#yP;=`<%l!P~$RO(c~~", 141, 340), new Ch("j~RQYZXz{^~^O(Q~~aP!P!Qd~iO(R~~", 25, 323)],
  topRules: { Script: [0, 7], SingleExpression: [1, 276], SingleClassItem: [2, 277] },
  dialects: { jsx: 0, ts: 15175 },
  dynamicPrecedences: { 80: 1, 82: 1, 94: 1, 169: 1, 199: 1 },
  specialized: [{ term: 327, get: (n) => ow[n] || -1 }, { term: 343, get: (n) => lw[n] || -1 }, { term: 95, get: (n) => aw[n] || -1 }],
  tokenPrec: 15201
});
class _O {
  /**
  Create a new completion context. (Mostly useful for testing
  completion sources—in the editor, the extension will create
  these for you.)
  */
  constructor(e, t, i, s) {
    this.state = e, this.pos = t, this.explicit = i, this.view = s, this.abortListeners = [], this.abortOnDocChange = !1;
  }
  /**
  Get the extent, content, and (if there is a token) type of the
  token before `this.pos`.
  */
  tokenBefore(e) {
    let t = Si(this.state).resolveInner(this.pos, -1);
    for (; t && e.indexOf(t.name) < 0; )
      t = t.parent;
    return t ? {
      from: t.from,
      to: this.pos,
      text: this.state.sliceDoc(t.from, this.pos),
      type: t.type
    } : null;
  }
  /**
  Get the match of the given expression directly before the
  cursor.
  */
  matchBefore(e) {
    let t = this.state.doc.lineAt(this.pos), i = Math.max(t.from, this.pos - 250), s = t.text.slice(i - t.from, this.pos - t.from), r = s.search(TO(e, !1));
    return r < 0 ? null : { from: i + r, to: this.pos, text: s.slice(r) };
  }
  /**
  Yields true when the query has been aborted. Can be useful in
  asynchronous queries to avoid doing work that will be ignored.
  */
  get aborted() {
    return this.abortListeners == null;
  }
  /**
  Allows you to register abort handlers, which will be called when
  the query is
  [aborted](https://codemirror.net/6/docs/ref/#autocomplete.CompletionContext.aborted).
  
  By default, running queries will not be aborted for regular
  typing or backspacing, on the assumption that they are likely to
  return a result with a
  [`validFor`](https://codemirror.net/6/docs/ref/#autocomplete.CompletionResult.validFor) field that
  allows the result to be used after all. Passing `onDocChange:
  true` will cause this query to be aborted for any document
  change.
  */
  addEventListener(e, t, i) {
    e == "abort" && this.abortListeners && (this.abortListeners.push(t), i && i.onDocChange && (this.abortOnDocChange = !0));
  }
}
function du(n) {
  let e = Object.keys(n).join(""), t = /\w/.test(e);
  return t && (e = e.replace(/\w/g, "")), `[${t ? "\\w" : ""}${e.replace(/[^\w\s]/g, "\\$&")}]`;
}
function cw(n) {
  let e = /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null);
  for (let { label: s } of n) {
    e[s[0]] = !0;
    for (let r = 1; r < s.length; r++)
      t[s[r]] = !0;
  }
  let i = du(e) + du(t) + "*$";
  return [new RegExp("^" + i), new RegExp(i)];
}
function xc(n) {
  let e = n.map((s) => typeof s == "string" ? { label: s } : s), [t, i] = e.every((s) => /^\w+$/.test(s.label)) ? [/\w*$/, /\w+$/] : cw(e);
  return (s) => {
    let r = s.matchBefore(i);
    return r || s.explicit ? { from: r ? r.from : s.pos, options: e, validFor: t } : null;
  };
}
function fw(n, e) {
  return (t) => {
    for (let i = Si(t.state).resolveInner(t.pos, -1); i; i = i.parent) {
      if (n.indexOf(i.name) > -1)
        return null;
      if (i.type.isTop)
        break;
    }
    return e(t);
  };
}
class pu {
  constructor(e, t, i, s) {
    this.completion = e, this.source = t, this.match = i, this.score = s;
  }
}
function rs(n) {
  return n.selection.main.from;
}
function TO(n, e) {
  var t;
  let { source: i } = n, s = e && i[0] != "^", r = i[i.length - 1] != "$";
  return !s && !r ? n : new RegExp(`${s ? "^" : ""}(?:${i})${r ? "$" : ""}`, (t = n.flags) !== null && t !== void 0 ? t : n.ignoreCase ? "i" : "");
}
const Sc = /* @__PURE__ */ mn.define();
function uw(n, e, t, i) {
  let { main: s } = n.selection, r = t - s.from, o = i - s.from;
  return {
    ...n.changeByRange((l) => {
      if (l != s && t != i && n.sliceDoc(l.from + r, l.from + o) != n.sliceDoc(t, i))
        return { range: l };
      let a = n.toText(e);
      return {
        changes: { from: l.from + r, to: i == s.from ? l.to : l.from + o, insert: a },
        range: B.cursor(l.from + r + a.length)
      };
    }),
    scrollIntoView: !0,
    userEvent: "input.complete"
  };
}
const Ou = /* @__PURE__ */ new WeakMap();
function dw(n) {
  if (!Array.isArray(n))
    return n;
  let e = Ou.get(n);
  return e || Ou.set(n, e = xc(n)), e;
}
const vl = /* @__PURE__ */ ze.define(), Br = /* @__PURE__ */ ze.define();
class pw {
  constructor(e) {
    this.pattern = e, this.chars = [], this.folded = [], this.any = [], this.precise = [], this.byWord = [], this.score = 0, this.matched = [];
    for (let t = 0; t < e.length; ) {
      let i = In(e, t), s = xs(i);
      this.chars.push(i);
      let r = e.slice(t, t + s), o = r.toUpperCase();
      this.folded.push(In(o == r ? r.toLowerCase() : o, 0)), t += s;
    }
    this.astral = e.length != this.chars.length;
  }
  ret(e, t) {
    return this.score = e, this.matched = t, this;
  }
  // Matches a given word (completion) against the pattern (input).
  // Will return a boolean indicating whether there was a match and,
  // on success, set `this.score` to the score, `this.matched` to an
  // array of `from, to` pairs indicating the matched parts of `word`.
  //
  // The score is a number that is more negative the worse the match
  // is. See `Penalty` above.
  match(e) {
    if (this.pattern.length == 0)
      return this.ret(-100, []);
    if (e.length < this.pattern.length)
      return null;
    let { chars: t, folded: i, any: s, precise: r, byWord: o } = this;
    if (t.length == 1) {
      let x = In(e, 0), S = xs(x), _ = S == e.length ? 0 : -100;
      if (x != t[0]) if (x == i[0])
        _ += -200;
      else
        return null;
      return this.ret(_, [0, S]);
    }
    let l = e.indexOf(this.pattern);
    if (l == 0)
      return this.ret(e.length == this.pattern.length ? 0 : -100, [0, this.pattern.length]);
    let a = t.length, h = 0;
    if (l < 0) {
      for (let x = 0, S = Math.min(e.length, 200); x < S && h < a; ) {
        let _ = In(e, x);
        (_ == t[h] || _ == i[h]) && (s[h++] = x), x += xs(_);
      }
      if (h < a)
        return null;
    }
    let c = 0, f = 0, d = !1, p = 0, O = -1, g = -1, m = /[a-z]/.test(e), v = !0;
    for (let x = 0, S = Math.min(e.length, 200), _ = 0; x < S && f < a; ) {
      let C = In(e, x);
      l < 0 && (c < a && C == t[c] && (r[c++] = x), p < a && (C == t[p] || C == i[p] ? (p == 0 && (O = x), g = x + 1, p++) : p = 0));
      let R, X = C < 255 ? C >= 48 && C <= 57 || C >= 97 && C <= 122 ? 2 : C >= 65 && C <= 90 ? 1 : 0 : (R = cv(C)) != R.toLowerCase() ? 1 : R != R.toUpperCase() ? 2 : 0;
      (!x || X == 1 && m || _ == 0 && X != 0) && (t[f] == C || i[f] == C && (d = !0) ? o[f++] = x : o.length && (v = !1)), _ = X, x += xs(C);
    }
    return f == a && o[0] == 0 && v ? this.result(-100 + (d ? -200 : 0), o, e) : p == a && O == 0 ? this.ret(-200 - e.length + (g == e.length ? 0 : -100), [0, g]) : l > -1 ? this.ret(-700 - e.length, [l, l + this.pattern.length]) : p == a ? this.ret(-900 - e.length, [O, g]) : f == a ? this.result(-100 + (d ? -200 : 0) + -700 + (v ? 0 : -1100), o, e) : t.length == 2 ? null : this.result((s[0] ? -700 : 0) + -200 + -1100, s, e);
  }
  result(e, t, i) {
    let s = [], r = 0;
    for (let o of t) {
      let l = o + (this.astral ? xs(In(i, o)) : 1);
      r && s[r - 1] == o ? s[r - 1] = l : (s[r++] = o, s[r++] = l);
    }
    return this.ret(e - i.length, s);
  }
}
class Ow {
  constructor(e) {
    this.pattern = e, this.matched = [], this.score = 0, this.folded = e.toLowerCase();
  }
  match(e) {
    if (e.length < this.pattern.length)
      return null;
    let t = e.slice(0, this.pattern.length), i = t == this.pattern ? 0 : t.toLowerCase() == this.folded ? -200 : null;
    return i == null ? null : (this.matched = [0, t.length], this.score = i + (e.length == this.pattern.length ? 0 : -100), this);
  }
}
const vt = /* @__PURE__ */ me.define({
  combine(n) {
    return Jh(n, {
      activateOnTyping: !0,
      activateOnCompletion: () => !1,
      activateOnTypingDelay: 100,
      selectOnOpen: !0,
      override: null,
      closeOnBlur: !0,
      maxRenderedOptions: 100,
      defaultKeymap: !0,
      tooltipClass: () => "",
      optionClass: () => "",
      aboveCursor: !1,
      icons: !0,
      addToOptions: [],
      positionInfo: gw,
      filterStrict: !1,
      compareCompletions: (e, t) => (e.sortText || e.label).localeCompare(t.sortText || t.label),
      interactionDelay: 75,
      updateSyncTime: 100
    }, {
      defaultKeymap: (e, t) => e && t,
      closeOnBlur: (e, t) => e && t,
      icons: (e, t) => e && t,
      tooltipClass: (e, t) => (i) => gu(e(i), t(i)),
      optionClass: (e, t) => (i) => gu(e(i), t(i)),
      addToOptions: (e, t) => e.concat(t),
      filterStrict: (e, t) => e || t
    });
  }
});
function gu(n, e) {
  return n ? e ? n + " " + e : n : e;
}
function gw(n, e, t, i, s, r) {
  let o = n.textDirection == nt.RTL, l = o, a = !1, h = "top", c, f, d = e.left - s.left, p = s.right - e.right, O = i.right - i.left, g = i.bottom - i.top;
  if (l && d < Math.min(O, p) ? l = !1 : !l && p < Math.min(O, d) && (l = !0), O <= (l ? d : p))
    c = Math.max(s.top, Math.min(t.top, s.bottom - g)) - e.top, f = Math.min(400, l ? d : p);
  else {
    a = !0, f = Math.min(
      400,
      (o ? e.right : s.right - e.left) - 30
      /* Info.Margin */
    );
    let x = s.bottom - e.bottom;
    x >= g || x > e.top ? c = t.bottom - e.top : (h = "bottom", c = e.bottom - t.top);
  }
  let m = (e.bottom - e.top) / r.offsetHeight, v = (e.right - e.left) / r.offsetWidth;
  return {
    style: `${h}: ${c / m}px; max-width: ${f / v}px`,
    class: "cm-completionInfo-" + (a ? o ? "left-narrow" : "right-narrow" : l ? "left" : "right")
  };
}
const Qc = /* @__PURE__ */ ze.define();
function mw(n) {
  let e = n.addToOptions.slice();
  return n.icons && e.push({
    render(t) {
      let i = document.createElement("div");
      return i.classList.add("cm-completionIcon"), t.type && i.classList.add(...t.type.split(/\s+/g).map((s) => "cm-completionIcon-" + s)), i.setAttribute("aria-hidden", "true"), i;
    },
    position: 20
  }), e.push({
    render(t, i, s, r) {
      let o = document.createElement("span");
      o.className = "cm-completionLabel";
      let l = t.displayLabel || t.label, a = 0;
      for (let h = 0; h < r.length; ) {
        let c = r[h++], f = r[h++];
        c > a && o.appendChild(document.createTextNode(l.slice(a, c)));
        let d = o.appendChild(document.createElement("span"));
        d.appendChild(document.createTextNode(l.slice(c, f))), d.className = "cm-completionMatchedText", a = f;
      }
      return a < l.length && o.appendChild(document.createTextNode(l.slice(a))), o;
    },
    position: 50
  }, {
    render(t) {
      if (!t.detail)
        return null;
      let i = document.createElement("span");
      return i.className = "cm-completionDetail", i.textContent = t.detail, i;
    },
    position: 80
  }), e.sort((t, i) => t.position - i.position).map((t) => t.render);
}
function xa(n, e, t) {
  if (n <= t)
    return { from: 0, to: n };
  if (e < 0 && (e = 0), e <= n >> 1) {
    let s = Math.floor(e / t);
    return { from: s * t, to: (s + 1) * t };
  }
  let i = Math.ceil((n - e) / t);
  return { from: n - i * t, to: n - (i - 1) * t };
}
class vw {
  constructor(e, t, i) {
    this.view = e, this.stateField = t, this.applyCompletion = i, this.info = null, this.infoDestroy = null, this.placeInfoReq = {
      read: () => this.measureInfo(),
      write: (a) => this.placeInfo(a),
      key: this
    }, this.space = null, this.currentClass = "";
    let s = e.state.field(t), { options: r, selected: o } = s.open, l = e.state.facet(vt);
    this.optionContent = mw(l), this.optionClass = l.optionClass, this.tooltipClass = l.tooltipClass, this.range = xa(r.length, o, l.maxRenderedOptions), this.dom = document.createElement("div"), this.dom.className = "cm-tooltip-autocomplete", this.updateTooltipClass(e.state), this.dom.addEventListener("mousedown", (a) => {
      let { options: h } = e.state.field(t).open;
      for (let c = a.target, f; c && c != this.dom; c = c.parentNode)
        if (c.nodeName == "LI" && (f = /-(\d+)$/.exec(c.id)) && +f[1] < h.length) {
          this.applyCompletion(e, h[+f[1]]), a.preventDefault();
          return;
        }
      if (a.target == this.list) {
        let c = this.list.classList.contains("cm-completionListIncompleteTop") && a.clientY < this.list.firstChild.getBoundingClientRect().top ? this.range.from - 1 : this.list.classList.contains("cm-completionListIncompleteBottom") && a.clientY > this.list.lastChild.getBoundingClientRect().bottom ? this.range.to : null;
        c != null && (e.dispatch({ effects: Qc.of(c) }), a.preventDefault());
      }
    }), this.dom.addEventListener("focusout", (a) => {
      let h = e.state.field(this.stateField, !1);
      h && h.tooltip && e.state.facet(vt).closeOnBlur && a.relatedTarget != e.contentDOM && e.dispatch({ effects: Br.of(null) });
    }), this.showOptions(r, s.id);
  }
  mount() {
    this.updateSel();
  }
  showOptions(e, t) {
    this.list && this.list.remove(), this.list = this.dom.appendChild(this.createListBox(e, t, this.range)), this.list.addEventListener("scroll", () => {
      this.info && this.view.requestMeasure(this.placeInfoReq);
    });
  }
  update(e) {
    var t;
    let i = e.state.field(this.stateField), s = e.startState.field(this.stateField);
    if (this.updateTooltipClass(e.state), i != s) {
      let { options: r, selected: o, disabled: l } = i.open;
      (!s.open || s.open.options != r) && (this.range = xa(r.length, o, e.state.facet(vt).maxRenderedOptions), this.showOptions(r, i.id)), this.updateSel(), l != ((t = s.open) === null || t === void 0 ? void 0 : t.disabled) && this.dom.classList.toggle("cm-tooltip-autocomplete-disabled", !!l);
    }
  }
  updateTooltipClass(e) {
    let t = this.tooltipClass(e);
    if (t != this.currentClass) {
      for (let i of this.currentClass.split(" "))
        i && this.dom.classList.remove(i);
      for (let i of t.split(" "))
        i && this.dom.classList.add(i);
      this.currentClass = t;
    }
  }
  positioned(e) {
    this.space = e, this.info && this.view.requestMeasure(this.placeInfoReq);
  }
  updateSel() {
    let e = this.view.state.field(this.stateField), t = e.open;
    (t.selected > -1 && t.selected < this.range.from || t.selected >= this.range.to) && (this.range = xa(t.options.length, t.selected, this.view.state.facet(vt).maxRenderedOptions), this.showOptions(t.options, e.id));
    let i = this.updateSelectedOption(t.selected);
    if (i) {
      this.destroyInfo();
      let { completion: s } = t.options[t.selected], { info: r } = s;
      if (!r)
        return;
      let o = typeof r == "string" ? document.createTextNode(r) : r(s);
      if (!o)
        return;
      "then" in o ? o.then((l) => {
        l && this.view.state.field(this.stateField, !1) == e && this.addInfoPane(l, s);
      }).catch((l) => ni(this.view.state, l, "completion info")) : (this.addInfoPane(o, s), i.setAttribute("aria-describedby", this.info.id));
    }
  }
  addInfoPane(e, t) {
    this.destroyInfo();
    let i = this.info = document.createElement("div");
    if (i.className = "cm-tooltip cm-completionInfo", i.id = "cm-completionInfo-" + Math.floor(Math.random() * 65535).toString(16), e.nodeType != null)
      i.appendChild(e), this.infoDestroy = null;
    else {
      let { dom: s, destroy: r } = e;
      i.appendChild(s), this.infoDestroy = r || null;
    }
    this.dom.appendChild(i), this.view.requestMeasure(this.placeInfoReq);
  }
  updateSelectedOption(e) {
    let t = null;
    for (let i = this.list.firstChild, s = this.range.from; i; i = i.nextSibling, s++)
      i.nodeName != "LI" || !i.id ? s-- : s == e ? i.hasAttribute("aria-selected") || (i.setAttribute("aria-selected", "true"), t = i) : i.hasAttribute("aria-selected") && (i.removeAttribute("aria-selected"), i.removeAttribute("aria-describedby"));
    return t && yw(this.list, t), t;
  }
  measureInfo() {
    let e = this.dom.querySelector("[aria-selected]");
    if (!e || !this.info)
      return null;
    let t = this.dom.getBoundingClientRect(), i = this.info.getBoundingClientRect(), s = e.getBoundingClientRect(), r = this.space;
    if (!r) {
      let o = this.dom.ownerDocument.documentElement;
      r = { left: 0, top: 0, right: o.clientWidth, bottom: o.clientHeight };
    }
    return s.top > Math.min(r.bottom, t.bottom) - 10 || s.bottom < Math.max(r.top, t.top) + 10 ? null : this.view.state.facet(vt).positionInfo(this.view, t, s, i, r, this.dom);
  }
  placeInfo(e) {
    this.info && (e ? (e.style && (this.info.style.cssText = e.style), this.info.className = "cm-tooltip cm-completionInfo " + (e.class || "")) : this.info.style.cssText = "top: -1e6px");
  }
  createListBox(e, t, i) {
    const s = document.createElement("ul");
    s.id = t, s.setAttribute("role", "listbox"), s.setAttribute("aria-expanded", "true"), s.setAttribute("aria-label", this.view.state.phrase("Completions")), s.addEventListener("mousedown", (o) => {
      o.target == s && o.preventDefault();
    });
    let r = null;
    for (let o = i.from; o < i.to; o++) {
      let { completion: l, match: a } = e[o], { section: h } = l;
      if (h) {
        let d = typeof h == "string" ? h : h.name;
        if (d != r && (o > i.from || i.from == 0))
          if (r = d, typeof h != "string" && h.header)
            s.appendChild(h.header(h));
          else {
            let p = s.appendChild(document.createElement("completion-section"));
            p.textContent = d;
          }
      }
      const c = s.appendChild(document.createElement("li"));
      c.id = t + "-" + o, c.setAttribute("role", "option");
      let f = this.optionClass(l);
      f && (c.className = f);
      for (let d of this.optionContent) {
        let p = d(l, this.view.state, this.view, a);
        p && c.appendChild(p);
      }
    }
    return i.from && s.classList.add("cm-completionListIncompleteTop"), i.to < e.length && s.classList.add("cm-completionListIncompleteBottom"), s;
  }
  destroyInfo() {
    this.info && (this.infoDestroy && this.infoDestroy(), this.info.remove(), this.info = null);
  }
  destroy() {
    this.destroyInfo();
  }
}
function bw(n, e) {
  return (t) => new vw(t, n, e);
}
function yw(n, e) {
  let t = n.getBoundingClientRect(), i = e.getBoundingClientRect(), s = t.height / n.offsetHeight;
  i.top < t.top ? n.scrollTop -= (t.top - i.top) / s : i.bottom > t.bottom && (n.scrollTop += (i.bottom - t.bottom) / s);
}
function mu(n) {
  return (n.boost || 0) * 100 + (n.apply ? 10 : 0) + (n.info ? 5 : 0) + (n.type ? 1 : 0);
}
function ww(n, e) {
  let t = [], i = null, s = null, r = (c) => {
    t.push(c);
    let { section: f } = c.completion;
    if (f) {
      i || (i = []);
      let d = typeof f == "string" ? f : f.name;
      i.some((p) => p.name == d) || i.push(typeof f == "string" ? { name: d } : f);
    }
  }, o = e.facet(vt);
  for (let c of n)
    if (c.hasResult()) {
      let f = c.result.getMatch;
      if (c.result.filter === !1)
        for (let d of c.result.options)
          r(new pu(d, c.source, f ? f(d) : [], 1e9 - t.length));
      else {
        let d = e.sliceDoc(c.from, c.to), p, O = o.filterStrict ? new Ow(d) : new pw(d);
        for (let g of c.result.options)
          if (p = O.match(g.label)) {
            let m = g.displayLabel ? f ? f(g, p.matched) : [] : p.matched, v = p.score + (g.boost || 0);
            if (r(new pu(g, c.source, m, v)), typeof g.section == "object" && g.section.rank === "dynamic") {
              let { name: x } = g.section;
              s || (s = /* @__PURE__ */ Object.create(null)), s[x] = Math.max(v, s[x] || -1e9);
            }
          }
      }
    }
  if (i) {
    let c = /* @__PURE__ */ Object.create(null), f = 0, d = (p, O) => (p.rank === "dynamic" && O.rank === "dynamic" ? s[O.name] - s[p.name] : 0) || (typeof p.rank == "number" ? p.rank : 1e9) - (typeof O.rank == "number" ? O.rank : 1e9) || (p.name < O.name ? -1 : 1);
    for (let p of i.sort(d))
      f -= 1e5, c[p.name] = f;
    for (let p of t) {
      let { section: O } = p.completion;
      O && (p.score += c[typeof O == "string" ? O : O.name]);
    }
  }
  let l = [], a = null, h = o.compareCompletions;
  for (let c of t.sort((f, d) => d.score - f.score || h(f.completion, d.completion))) {
    let f = c.completion;
    !a || a.label != f.label || a.detail != f.detail || a.type != null && f.type != null && a.type != f.type || a.apply != f.apply || a.boost != f.boost ? l.push(c) : mu(c.completion) > mu(a) && (l[l.length - 1] = c), a = c.completion;
  }
  return l;
}
class Ps {
  constructor(e, t, i, s, r, o) {
    this.options = e, this.attrs = t, this.tooltip = i, this.timestamp = s, this.selected = r, this.disabled = o;
  }
  setSelected(e, t) {
    return e == this.selected || e >= this.options.length ? this : new Ps(this.options, vu(t, e), this.tooltip, this.timestamp, e, this.disabled);
  }
  static build(e, t, i, s, r, o) {
    if (s && !o && e.some((h) => h.isPending))
      return s.setDisabled();
    let l = ww(e, t);
    if (!l.length)
      return s && e.some((h) => h.isPending) ? s.setDisabled() : null;
    let a = t.facet(vt).selectOnOpen ? 0 : -1;
    if (s && s.selected != a && s.selected != -1) {
      let h = s.options[s.selected].completion;
      for (let c = 0; c < l.length; c++)
        if (l[c].completion == h) {
          a = c;
          break;
        }
    }
    return new Ps(l, vu(i, a), {
      pos: e.reduce((h, c) => c.hasResult() ? Math.min(h, c.from) : h, 1e8),
      create: Pw,
      above: r.aboveCursor
    }, s ? s.timestamp : Date.now(), a, !1);
  }
  map(e) {
    return new Ps(this.options, this.attrs, { ...this.tooltip, pos: e.mapPos(this.tooltip.pos) }, this.timestamp, this.selected, this.disabled);
  }
  setDisabled() {
    return new Ps(this.options, this.attrs, this.tooltip, this.timestamp, this.selected, !0);
  }
}
class bl {
  constructor(e, t, i) {
    this.active = e, this.id = t, this.open = i;
  }
  static start() {
    return new bl(kw, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
  }
  update(e) {
    let { state: t } = e, i = t.facet(vt), r = (i.override || t.languageDataAt("autocomplete", rs(t)).map(dw)).map((a) => (this.active.find((c) => c.source == a) || new Oi(
      a,
      this.active.some(
        (c) => c.state != 0
        /* State.Inactive */
      ) ? 1 : 0
      /* State.Inactive */
    )).update(e, i));
    r.length == this.active.length && r.every((a, h) => a == this.active[h]) && (r = this.active);
    let o = this.open, l = e.effects.some((a) => a.is(kc));
    o && e.docChanged && (o = o.map(e.changes)), e.selection || r.some((a) => a.hasResult() && e.changes.touchesRange(a.from, a.to)) || !xw(r, this.active) || l ? o = Ps.build(r, t, this.id, o, i, l) : o && o.disabled && !r.some((a) => a.isPending) && (o = null), !o && r.every((a) => !a.isPending) && r.some((a) => a.hasResult()) && (r = r.map((a) => a.hasResult() ? new Oi(
      a.source,
      0
      /* State.Inactive */
    ) : a));
    for (let a of e.effects)
      a.is(Qc) && (o = o && o.setSelected(a.value, this.id));
    return r == this.active && o == this.open ? this : new bl(r, this.id, o);
  }
  get tooltip() {
    return this.open ? this.open.tooltip : null;
  }
  get attrs() {
    return this.open ? this.open.attrs : this.active.length ? Sw : Qw;
  }
}
function xw(n, e) {
  if (n == e)
    return !0;
  for (let t = 0, i = 0; ; ) {
    for (; t < n.length && !n[t].hasResult(); )
      t++;
    for (; i < e.length && !e[i].hasResult(); )
      i++;
    let s = t == n.length, r = i == e.length;
    if (s || r)
      return s == r;
    if (n[t++].result != e[i++].result)
      return !1;
  }
}
const Sw = {
  "aria-autocomplete": "list"
}, Qw = {};
function vu(n, e) {
  let t = {
    "aria-autocomplete": "list",
    "aria-haspopup": "listbox",
    "aria-controls": n
  };
  return e > -1 && (t["aria-activedescendant"] = n + "-" + e), t;
}
const kw = [];
function ZO(n, e) {
  if (n.isUserEvent("input.complete")) {
    let i = n.annotation(Sc);
    if (i && e.activateOnCompletion(i))
      return 12;
  }
  let t = n.isUserEvent("input.type");
  return t && e.activateOnTyping ? 5 : t ? 1 : n.isUserEvent("delete.backward") ? 2 : n.selection ? 8 : n.docChanged ? 16 : 0;
}
class Oi {
  constructor(e, t, i = !1) {
    this.source = e, this.state = t, this.explicit = i;
  }
  hasResult() {
    return !1;
  }
  get isPending() {
    return this.state == 1;
  }
  update(e, t) {
    let i = ZO(e, t), s = this;
    (i & 8 || i & 16 && this.touches(e)) && (s = new Oi(
      s.source,
      0
      /* State.Inactive */
    )), i & 4 && s.state == 0 && (s = new Oi(
      this.source,
      1
      /* State.Pending */
    )), s = s.updateFor(e, i);
    for (let r of e.effects)
      if (r.is(vl))
        s = new Oi(s.source, 1, r.value);
      else if (r.is(Br))
        s = new Oi(
          s.source,
          0
          /* State.Inactive */
        );
      else if (r.is(kc))
        for (let o of r.value)
          o.source == s.source && (s = o);
    return s;
  }
  updateFor(e, t) {
    return this.map(e.changes);
  }
  map(e) {
    return this;
  }
  touches(e) {
    return e.changes.touchesRange(rs(e.state));
  }
}
class Xs extends Oi {
  constructor(e, t, i, s, r, o) {
    super(e, 3, t), this.limit = i, this.result = s, this.from = r, this.to = o;
  }
  hasResult() {
    return !0;
  }
  updateFor(e, t) {
    var i;
    if (!(t & 3))
      return this.map(e.changes);
    let s = this.result;
    s.map && !e.changes.empty && (s = s.map(s, e.changes));
    let r = e.changes.mapPos(this.from), o = e.changes.mapPos(this.to, 1), l = rs(e.state);
    if (l > o || !s || t & 2 && (rs(e.startState) == this.from || l < this.limit))
      return new Oi(
        this.source,
        t & 4 ? 1 : 0
        /* State.Inactive */
      );
    let a = e.changes.mapPos(this.limit);
    return $w(s.validFor, e.state, r, o) ? new Xs(this.source, this.explicit, a, s, r, o) : s.update && (s = s.update(s, r, o, new _O(e.state, l, !1))) ? new Xs(this.source, this.explicit, a, s, s.from, (i = s.to) !== null && i !== void 0 ? i : rs(e.state)) : new Oi(this.source, 1, this.explicit);
  }
  map(e) {
    if (e.empty)
      return this;
    let t = this.result.map ? this.result.map(this.result, e) : this.result;
    return t ? new Xs(this.source, this.explicit, e.mapPos(this.limit), t, e.mapPos(this.from), e.mapPos(this.to, 1)) : new Oi(
      this.source,
      0
      /* State.Inactive */
    );
  }
  touches(e) {
    return e.changes.touchesRange(this.from, this.to);
  }
}
function $w(n, e, t, i) {
  if (!n)
    return !1;
  let s = e.sliceDoc(t, i);
  return typeof n == "function" ? n(s, t, i, e) : TO(n, !0).test(s);
}
const kc = /* @__PURE__ */ ze.define({
  map(n, e) {
    return n.map((t) => t.map(e));
  }
}), qt = /* @__PURE__ */ tn.define({
  create() {
    return bl.start();
  },
  update(n, e) {
    return n.update(e);
  },
  provide: (n) => [
    Ap.from(n, (e) => e.tooltip),
    ge.contentAttributes.from(n, (e) => e.attrs)
  ]
});
function $c(n, e) {
  const t = e.completion.apply || e.completion.label;
  let i = n.state.field(qt).active.find((s) => s.source == e.source);
  return i instanceof Xs ? (typeof t == "string" ? n.dispatch({
    ...uw(n.state, t, i.from, i.to),
    annotations: Sc.of(e.completion)
  }) : t(n, e.completion, i.from, i.to), !0) : !1;
}
const Pw = /* @__PURE__ */ bw(qt, $c);
function Ro(n, e = "option") {
  return (t) => {
    let i = t.state.field(qt, !1);
    if (!i || !i.open || i.open.disabled || Date.now() - i.open.timestamp < t.state.facet(vt).interactionDelay)
      return !1;
    let s = 1, r;
    e == "page" && (r = Rp(t, i.open.tooltip)) && (s = Math.max(2, Math.floor(r.dom.offsetHeight / r.dom.querySelector("li").offsetHeight) - 1));
    let { length: o } = i.open.options, l = i.open.selected > -1 ? i.open.selected + s * (n ? 1 : -1) : n ? 0 : o - 1;
    return l < 0 ? l = e == "page" ? 0 : o - 1 : l >= o && (l = e == "page" ? o - 1 : 0), t.dispatch({ effects: Qc.of(l) }), !0;
  };
}
const _w = (n) => {
  let e = n.state.field(qt, !1);
  return n.state.readOnly || !e || !e.open || e.open.selected < 0 || e.open.disabled || Date.now() - e.open.timestamp < n.state.facet(vt).interactionDelay ? !1 : $c(n, e.open.options[e.open.selected]);
}, Sa = (n) => n.state.field(qt, !1) ? (n.dispatch({ effects: vl.of(!0) }), !0) : !1, Tw = (n) => {
  let e = n.state.field(qt, !1);
  return !e || !e.active.some(
    (t) => t.state != 0
    /* State.Inactive */
  ) ? !1 : (n.dispatch({ effects: Br.of(null) }), !0);
};
class Zw {
  constructor(e, t) {
    this.active = e, this.context = t, this.time = Date.now(), this.updates = [], this.done = void 0;
  }
}
const Cw = 50, Aw = 1e3, Rw = /* @__PURE__ */ Ki.fromClass(class {
  constructor(n) {
    this.view = n, this.debounceUpdate = -1, this.running = [], this.debounceAccept = -1, this.pendingStart = !1, this.composing = 0;
    for (let e of n.state.field(qt).active)
      e.isPending && this.startQuery(e);
  }
  update(n) {
    let e = n.state.field(qt), t = n.state.facet(vt);
    if (!n.selectionSet && !n.docChanged && n.startState.field(qt) == e)
      return;
    let i = n.transactions.some((r) => {
      let o = ZO(r, t);
      return o & 8 || (r.selection || r.docChanged) && !(o & 3);
    });
    for (let r = 0; r < this.running.length; r++) {
      let o = this.running[r];
      if (i || o.context.abortOnDocChange && n.docChanged || o.updates.length + n.transactions.length > Cw && Date.now() - o.time > Aw) {
        for (let l of o.context.abortListeners)
          try {
            l();
          } catch (a) {
            ni(this.view.state, a);
          }
        o.context.abortListeners = null, this.running.splice(r--, 1);
      } else
        o.updates.push(...n.transactions);
    }
    this.debounceUpdate > -1 && clearTimeout(this.debounceUpdate), n.transactions.some((r) => r.effects.some((o) => o.is(vl))) && (this.pendingStart = !0);
    let s = this.pendingStart ? 50 : t.activateOnTypingDelay;
    if (this.debounceUpdate = e.active.some((r) => r.isPending && !this.running.some((o) => o.active.source == r.source)) ? setTimeout(() => this.startUpdate(), s) : -1, this.composing != 0)
      for (let r of n.transactions)
        r.isUserEvent("input.type") ? this.composing = 2 : this.composing == 2 && r.selection && (this.composing = 3);
  }
  startUpdate() {
    this.debounceUpdate = -1, this.pendingStart = !1;
    let { state: n } = this.view, e = n.field(qt);
    for (let t of e.active)
      t.isPending && !this.running.some((i) => i.active.source == t.source) && this.startQuery(t);
    this.running.length && e.open && e.open.disabled && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(vt).updateSyncTime));
  }
  startQuery(n) {
    let { state: e } = this.view, t = rs(e), i = new _O(e, t, n.explicit, this.view), s = new Zw(n, i);
    this.running.push(s), Promise.resolve(n.source(i)).then((r) => {
      s.context.aborted || (s.done = r || null, this.scheduleAccept());
    }, (r) => {
      this.view.dispatch({ effects: Br.of(null) }), ni(this.view.state, r);
    });
  }
  scheduleAccept() {
    this.running.every((n) => n.done !== void 0) ? this.accept() : this.debounceAccept < 0 && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(vt).updateSyncTime));
  }
  // For each finished query in this.running, try to create a result
  // or, if appropriate, restart the query.
  accept() {
    var n;
    this.debounceAccept > -1 && clearTimeout(this.debounceAccept), this.debounceAccept = -1;
    let e = [], t = this.view.state.facet(vt), i = this.view.state.field(qt);
    for (let s = 0; s < this.running.length; s++) {
      let r = this.running[s];
      if (r.done === void 0)
        continue;
      if (this.running.splice(s--, 1), r.done) {
        let l = rs(r.updates.length ? r.updates[0].startState : this.view.state), a = Math.min(l, r.done.from + (r.active.explicit ? 0 : 1)), h = new Xs(r.active.source, r.active.explicit, a, r.done, r.done.from, (n = r.done.to) !== null && n !== void 0 ? n : l);
        for (let c of r.updates)
          h = h.update(c, t);
        if (h.hasResult()) {
          e.push(h);
          continue;
        }
      }
      let o = i.active.find((l) => l.source == r.active.source);
      if (o && o.isPending)
        if (r.done == null) {
          let l = new Oi(
            r.active.source,
            0
            /* State.Inactive */
          );
          for (let a of r.updates)
            l = l.update(a, t);
          l.isPending || e.push(l);
        } else
          this.startQuery(o);
    }
    (e.length || i.open && i.open.disabled) && this.view.dispatch({ effects: kc.of(e) });
  }
}, {
  eventHandlers: {
    blur(n) {
      let e = this.view.state.field(qt, !1);
      if (e && e.tooltip && this.view.state.facet(vt).closeOnBlur) {
        let t = e.open && Rp(this.view, e.open.tooltip);
        (!t || !t.dom.contains(n.relatedTarget)) && setTimeout(() => this.view.dispatch({ effects: Br.of(null) }), 10);
      }
    },
    compositionstart() {
      this.composing = 1;
    },
    compositionend() {
      this.composing == 3 && setTimeout(() => this.view.dispatch({ effects: vl.of(!1) }), 20), this.composing = 0;
    }
  }
}), Mw = typeof navigator == "object" && /* @__PURE__ */ /Win/.test(navigator.platform), Xw = /* @__PURE__ */ no.highest(/* @__PURE__ */ ge.domEventHandlers({
  keydown(n, e) {
    let t = e.state.field(qt, !1);
    if (!t || !t.open || t.open.disabled || t.open.selected < 0 || n.key.length > 1 || n.ctrlKey && !(Mw && n.altKey) || n.metaKey)
      return !1;
    let i = t.open.options[t.open.selected], s = t.active.find((o) => o.source == i.source), r = i.completion.commitCharacters || s.result.commitCharacters;
    return r && r.indexOf(n.key) > -1 && $c(e, i), !1;
  }
})), CO = /* @__PURE__ */ ge.baseTheme({
  ".cm-tooltip.cm-tooltip-autocomplete": {
    "& > ul": {
      fontFamily: "monospace",
      whiteSpace: "nowrap",
      overflow: "hidden auto",
      maxWidth_fallback: "700px",
      maxWidth: "min(700px, 95vw)",
      minWidth: "250px",
      maxHeight: "10em",
      height: "100%",
      listStyle: "none",
      margin: 0,
      padding: 0,
      "& > li, & > completion-section": {
        padding: "1px 3px",
        lineHeight: 1.2
      },
      "& > li": {
        overflowX: "hidden",
        textOverflow: "ellipsis",
        cursor: "pointer"
      },
      "& > completion-section": {
        display: "list-item",
        borderBottom: "1px solid silver",
        paddingLeft: "0.5em",
        opacity: 0.7
      }
    }
  },
  "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#17c",
    color: "white"
  },
  "&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#777"
  },
  "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#347",
    color: "white"
  },
  "&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#444"
  },
  ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
    content: '"···"',
    opacity: 0.5,
    display: "block",
    textAlign: "center",
    cursor: "pointer"
  },
  ".cm-tooltip.cm-completionInfo": {
    position: "absolute",
    padding: "3px 9px",
    width: "max-content",
    maxWidth: "400px",
    boxSizing: "border-box",
    whiteSpace: "pre-line"
  },
  ".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
  ".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
  ".cm-completionInfo.cm-completionInfo-left-narrow": { right: "30px" },
  ".cm-completionInfo.cm-completionInfo-right-narrow": { left: "30px" },
  "&light .cm-snippetField": { backgroundColor: "#00000022" },
  "&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
  ".cm-snippetFieldPosition": {
    verticalAlign: "text-top",
    width: 0,
    height: "1.15em",
    display: "inline-block",
    margin: "0 -0.7px -.7em",
    borderLeft: "1.4px dotted #888"
  },
  ".cm-completionMatchedText": {
    textDecoration: "underline"
  },
  ".cm-completionDetail": {
    marginLeft: "0.5em",
    fontStyle: "italic"
  },
  ".cm-completionIcon": {
    fontSize: "90%",
    width: ".8em",
    display: "inline-block",
    textAlign: "center",
    paddingRight: ".6em",
    opacity: "0.6",
    boxSizing: "content-box"
  },
  ".cm-completionIcon-function, .cm-completionIcon-method": {
    "&:after": { content: "'ƒ'" }
  },
  ".cm-completionIcon-class": {
    "&:after": { content: "'○'" }
  },
  ".cm-completionIcon-interface": {
    "&:after": { content: "'◌'" }
  },
  ".cm-completionIcon-variable": {
    "&:after": { content: "'𝑥'" }
  },
  ".cm-completionIcon-constant": {
    "&:after": { content: "'𝐶'" }
  },
  ".cm-completionIcon-type": {
    "&:after": { content: "'𝑡'" }
  },
  ".cm-completionIcon-enum": {
    "&:after": { content: "'∪'" }
  },
  ".cm-completionIcon-property": {
    "&:after": { content: "'□'" }
  },
  ".cm-completionIcon-keyword": {
    "&:after": { content: "'🔑︎'" }
    // Disable emoji rendering
  },
  ".cm-completionIcon-namespace": {
    "&:after": { content: "'▢'" }
  },
  ".cm-completionIcon-text": {
    "&:after": { content: "'abc'", fontSize: "50%", verticalAlign: "middle" }
  }
});
class Ew {
  constructor(e, t, i, s) {
    this.field = e, this.line = t, this.from = i, this.to = s;
  }
}
class Pc {
  constructor(e, t, i) {
    this.field = e, this.from = t, this.to = i;
  }
  map(e) {
    let t = e.mapPos(this.from, -1, Xt.TrackDel), i = e.mapPos(this.to, 1, Xt.TrackDel);
    return t == null || i == null ? null : new Pc(this.field, t, i);
  }
}
class _c {
  constructor(e, t) {
    this.lines = e, this.fieldPositions = t;
  }
  instantiate(e, t) {
    let i = [], s = [t], r = e.doc.lineAt(t), o = /^\s*/.exec(r.text)[0];
    for (let a of this.lines) {
      if (i.length) {
        let h = o, c = /^\t*/.exec(a)[0].length;
        for (let f = 0; f < c; f++)
          h += e.facet(Ll);
        s.push(t + h.length - c), a = h + a.slice(c);
      }
      i.push(a), t += a.length + 1;
    }
    let l = this.fieldPositions.map((a) => new Pc(a.field, s[a.line] + a.from, s[a.line] + a.to));
    return { text: i, ranges: l };
  }
  static parse(e) {
    let t = [], i = [], s = [], r;
    for (let o of e.split(/\r\n?|\n/)) {
      for (; r = /[#$]\{(?:(\d+)(?::([^{}]*))?|((?:\\[{}]|[^{}])*))\}/.exec(o); ) {
        let l = r[1] ? +r[1] : null, a = r[2] || r[3] || "", h = -1;
        l === 0 && (l = 1e9);
        let c = a.replace(/\\[{}]/g, (f) => f[1]);
        for (let f = 0; f < t.length; f++)
          (l != null ? t[f].seq == l : c && t[f].name == c) && (h = f);
        if (h < 0) {
          let f = 0;
          for (; f < t.length && (l == null || t[f].seq != null && t[f].seq < l); )
            f++;
          t.splice(f, 0, { seq: l, name: c }), h = f;
          for (let d of s)
            d.field >= h && d.field++;
        }
        for (let f of s)
          if (f.line == i.length && f.from > r.index) {
            let d = r[2] ? 3 + (r[1] || "").length : 2;
            f.from -= d, f.to -= d;
          }
        s.push(new Ew(h, i.length, r.index, r.index + c.length)), o = o.slice(0, r.index) + a + o.slice(r.index + r[0].length);
      }
      o = o.replace(/\\([{}])/g, (l, a, h) => {
        for (let c of s)
          c.line == i.length && c.from > h && (c.from--, c.to--);
        return a;
      }), i.push(o);
    }
    return new _c(i, s);
  }
}
let Lw = /* @__PURE__ */ We.widget({ widget: /* @__PURE__ */ new class extends or {
  toDOM() {
    let n = document.createElement("span");
    return n.className = "cm-snippetFieldPosition", n;
  }
  ignoreEvent() {
    return !1;
  }
}() }), jw = /* @__PURE__ */ We.mark({ class: "cm-snippetField" });
class ar {
  constructor(e, t) {
    this.ranges = e, this.active = t, this.deco = We.set(e.map((i) => (i.from == i.to ? Lw : jw).range(i.from, i.to)), !0);
  }
  map(e) {
    let t = [];
    for (let i of this.ranges) {
      let s = i.map(e);
      if (!s)
        return null;
      t.push(s);
    }
    return new ar(t, this.active);
  }
  selectionInsideField(e) {
    return e.ranges.every((t) => this.ranges.some((i) => i.field == this.active && i.from <= t.from && i.to >= t.to));
  }
}
const ho = /* @__PURE__ */ ze.define({
  map(n, e) {
    return n && n.map(e);
  }
}), zw = /* @__PURE__ */ ze.define(), Vr = /* @__PURE__ */ tn.define({
  create() {
    return null;
  },
  update(n, e) {
    for (let t of e.effects) {
      if (t.is(ho))
        return t.value;
      if (t.is(zw) && n)
        return new ar(n.ranges, t.value);
    }
    return n && e.docChanged && (n = n.map(e.changes)), n && e.selection && !n.selectionInsideField(e.selection) && (n = null), n;
  },
  provide: (n) => ge.decorations.from(n, (e) => e ? e.deco : We.none)
});
function Tc(n, e) {
  return B.create(n.filter((t) => t.field == e).map((t) => B.range(t.from, t.to)));
}
function Dw(n) {
  let e = _c.parse(n);
  return (t, i, s, r) => {
    let { text: o, ranges: l } = e.instantiate(t.state, s), { main: a } = t.state.selection, h = {
      changes: { from: s, to: r == a.from ? a.to : r, insert: Re.of(o) },
      scrollIntoView: !0,
      annotations: i ? [Sc.of(i), ut.userEvent.of("input.complete")] : void 0
    };
    if (l.length && (h.selection = Tc(l, 0)), l.some((c) => c.field > 0)) {
      let c = new ar(l, 0), f = h.effects = [ho.of(c)];
      t.state.field(Vr, !1) === void 0 && f.push(ze.appendConfig.of([Vr, Bw, Vw, CO]));
    }
    t.dispatch(t.state.update(h));
  };
}
function AO(n) {
  return ({ state: e, dispatch: t }) => {
    let i = e.field(Vr, !1);
    if (!i || n < 0 && i.active == 0)
      return !1;
    let s = i.active + n, r = n > 0 && !i.ranges.some((o) => o.field == s + n);
    return t(e.update({
      selection: Tc(i.ranges, s),
      effects: ho.of(r ? null : new ar(i.ranges, s)),
      scrollIntoView: !0
    })), !0;
  };
}
const Iw = ({ state: n, dispatch: e }) => n.field(Vr, !1) ? (e(n.update({ effects: ho.of(null) })), !0) : !1, Ww = /* @__PURE__ */ AO(1), Yw = /* @__PURE__ */ AO(-1), qw = [
  { key: "Tab", run: Ww, shift: Yw },
  { key: "Escape", run: Iw }
], bu = /* @__PURE__ */ me.define({
  combine(n) {
    return n.length ? n[0] : qw;
  }
}), Bw = /* @__PURE__ */ no.highest(/* @__PURE__ */ El.compute([bu], (n) => n.facet(bu)));
function It(n, e) {
  return { ...e, apply: Dw(n) };
}
const Vw = /* @__PURE__ */ ge.domEventHandlers({
  mousedown(n, e) {
    let t = e.state.field(Vr, !1), i;
    if (!t || (i = e.posAtCoords({ x: n.clientX, y: n.clientY })) == null)
      return !1;
    let s = t.ranges.find((r) => r.from <= i && r.to >= i);
    return !s || s.field == t.active ? !1 : (e.dispatch({
      selection: Tc(t.ranges, s.field),
      effects: ho.of(t.ranges.some((r) => r.field > s.field) ? new ar(t.ranges, s.field) : null),
      scrollIntoView: !0
    }), !0);
  }
}), RO = /* @__PURE__ */ new class extends Xn {
}();
RO.startSide = 1;
RO.endSide = -1;
function Nw(n = {}) {
  return [
    Xw,
    qt,
    vt.of(n),
    Rw,
    Uw,
    CO
  ];
}
const Gw = [
  { key: "Ctrl-Space", run: Sa },
  { mac: "Alt-`", run: Sa },
  { mac: "Alt-i", run: Sa },
  { key: "Escape", run: Tw },
  { key: "ArrowDown", run: /* @__PURE__ */ Ro(!0) },
  { key: "ArrowUp", run: /* @__PURE__ */ Ro(!1) },
  { key: "PageDown", run: /* @__PURE__ */ Ro(!0, "page") },
  { key: "PageUp", run: /* @__PURE__ */ Ro(!1, "page") },
  { key: "Enter", run: _w }
], Uw = /* @__PURE__ */ no.highest(/* @__PURE__ */ El.computeN([vt], (n) => n.facet(vt).defaultKeymap ? [Gw] : [])), MO = [
  /* @__PURE__ */ It("function ${name}(${params}) {\n	${}\n}", {
    label: "function",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ It("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ It("for (let ${name} of ${collection}) {\n	${}\n}", {
    label: "for",
    detail: "of loop",
    type: "keyword"
  }),
  /* @__PURE__ */ It("do {\n	${}\n} while (${})", {
    label: "do",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ It("while (${}) {\n	${}\n}", {
    label: "while",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ It(`try {
	\${}
} catch (\${error}) {
	\${}
}`, {
    label: "try",
    detail: "/ catch block",
    type: "keyword"
  }),
  /* @__PURE__ */ It("if (${}) {\n	${}\n}", {
    label: "if",
    detail: "block",
    type: "keyword"
  }),
  /* @__PURE__ */ It(`if (\${}) {
	\${}
} else {
	\${}
}`, {
    label: "if",
    detail: "/ else block",
    type: "keyword"
  }),
  /* @__PURE__ */ It(`class \${name} {
	constructor(\${params}) {
		\${}
	}
}`, {
    label: "class",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ It('import {${names}} from "${module}"\n${}', {
    label: "import",
    detail: "named",
    type: "keyword"
  }),
  /* @__PURE__ */ It('import ${name} from "${module}"\n${}', {
    label: "import",
    detail: "default",
    type: "keyword"
  })
], Fw = /* @__PURE__ */ MO.concat([
  /* @__PURE__ */ It("interface ${name} {\n	${}\n}", {
    label: "interface",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ It("type ${name} = ${type}", {
    label: "type",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ It("enum ${name} {\n	${}\n}", {
    label: "enum",
    detail: "definition",
    type: "keyword"
  })
]), yu = /* @__PURE__ */ new T1(), XO = /* @__PURE__ */ new Set([
  "Script",
  "Block",
  "FunctionExpression",
  "FunctionDeclaration",
  "ArrowFunction",
  "MethodDeclaration",
  "ForStatement"
]);
function Or(n) {
  return (e, t) => {
    let i = e.node.getChild("VariableDefinition");
    return i && t(i, n), !0;
  };
}
const Hw = ["FunctionDeclaration"], Kw = {
  FunctionDeclaration: /* @__PURE__ */ Or("function"),
  ClassDeclaration: /* @__PURE__ */ Or("class"),
  ClassExpression: () => !0,
  EnumDeclaration: /* @__PURE__ */ Or("constant"),
  TypeAliasDeclaration: /* @__PURE__ */ Or("type"),
  NamespaceDeclaration: /* @__PURE__ */ Or("namespace"),
  VariableDefinition(n, e) {
    n.matchContext(Hw) || e(n, "variable");
  },
  TypeDefinition(n, e) {
    e(n, "type");
  },
  __proto__: null
};
function EO(n, e) {
  let t = yu.get(e);
  if (t)
    return t;
  let i = [], s = !0;
  function r(o, l) {
    let a = n.sliceString(o.from, o.to);
    i.push({ label: a, type: l });
  }
  return e.cursor(Je.IncludeAnonymous).iterate((o) => {
    if (s)
      s = !1;
    else if (o.name) {
      let l = Kw[o.name];
      if (l && l(o, r) || XO.has(o.name))
        return !1;
    } else if (o.to - o.from > 8192) {
      for (let l of EO(n, o.node))
        i.push(l);
      return !1;
    }
  }), yu.set(e, i), i;
}
const wu = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/, LO = [
  "TemplateString",
  "String",
  "RegExp",
  "LineComment",
  "BlockComment",
  "VariableDefinition",
  "TypeDefinition",
  "Label",
  "PropertyDefinition",
  "PropertyName",
  "PrivatePropertyDefinition",
  "PrivatePropertyName",
  "JSXText",
  "JSXAttributeValue",
  "JSXOpenTag",
  "JSXCloseTag",
  "JSXSelfClosingTag",
  ".",
  "?."
];
function Jw(n) {
  let e = Si(n.state).resolveInner(n.pos, -1);
  if (LO.indexOf(e.name) > -1)
    return null;
  let t = e.name == "VariableName" || e.to - e.from < 20 && wu.test(n.state.sliceDoc(e.from, e.to));
  if (!t && !n.explicit)
    return null;
  let i = [];
  for (let s = e; s; s = s.parent)
    XO.has(s.name) && (i = i.concat(EO(n.state.doc, s)));
  return {
    options: i,
    from: t ? e.from : n.pos,
    validFor: wu
  };
}
const os = /* @__PURE__ */ cl.define({
  name: "javascript",
  parser: /* @__PURE__ */ hw.configure({
    props: [
      /* @__PURE__ */ Yp.add({
        IfStatement: /* @__PURE__ */ ga({ except: /^\s*({|else\b)/ }),
        TryStatement: /* @__PURE__ */ ga({ except: /^\s*({|catch\b|finally\b)/ }),
        LabeledStatement: G1,
        SwitchBody: (n) => {
          let e = n.textAfter, t = /^\s*\}/.test(e), i = /^\s*(case|default)\b/.test(e);
          return n.baseIndent + (t ? 0 : i ? 1 : 2) * n.unit;
        },
        Block: /* @__PURE__ */ N1({ closing: "}" }),
        ArrowFunction: (n) => n.baseIndent + n.unit,
        "TemplateString BlockComment": () => null,
        "Statement Property": /* @__PURE__ */ ga({ except: /^\s*{/ }),
        JSXElement(n) {
          let e = /^\s*<\//.test(n.textAfter);
          return n.lineIndent(n.node.from) + (e ? 0 : n.unit);
        },
        JSXEscape(n) {
          let e = /\s*\}/.test(n.textAfter);
          return n.lineIndent(n.node.from) + (e ? 0 : n.unit);
        },
        "JSXOpenTag JSXSelfClosingTag"(n) {
          return n.column(n.node.from) + n.unit;
        }
      }),
      /* @__PURE__ */ U1.add({
        "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType": F1,
        BlockComment(n) {
          return { from: n.from + 2, to: n.to - 2 };
        },
        JSXElement(n) {
          let e = n.firstChild;
          if (!e || e.name == "JSXSelfClosingTag")
            return null;
          let t = n.lastChild;
          return { from: e.to, to: t.type.isError ? n.to : t.from };
        },
        "JSXSelfClosingTag JSXOpenTag"(n) {
          var e;
          let t = (e = n.firstChild) === null || e === void 0 ? void 0 : e.nextSibling, i = n.lastChild;
          return !t || t.type.isError ? null : { from: t.to, to: i.type.isError ? n.to : i.from };
        }
      })
    ]
  }),
  languageData: {
    closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] },
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
    wordChars: "$"
  }
}), jO = {
  test: (n) => /^JSX/.test(n.name),
  facet: /* @__PURE__ */ Dp({ commentTokens: { block: { open: "{/*", close: "*/}" } } })
}, ex = /* @__PURE__ */ os.configure({ dialect: "ts" }, "typescript"), tx = /* @__PURE__ */ os.configure({
  dialect: "jsx",
  props: [/* @__PURE__ */ mc.add((n) => n.isTop ? [jO] : void 0)]
}), ix = /* @__PURE__ */ os.configure({
  dialect: "jsx ts",
  props: [/* @__PURE__ */ mc.add((n) => n.isTop ? [jO] : void 0)]
}, "typescript");
let zO = (n) => ({ label: n, type: "keyword" });
const DO = /* @__PURE__ */ "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map(zO), nx = /* @__PURE__ */ DO.concat(/* @__PURE__ */ ["declare", "implements", "private", "protected", "public"].map(zO));
function sx(n = {}) {
  let e = n.jsx ? n.typescript ? ix : tx : n.typescript ? ex : os, t = n.typescript ? Fw.concat(nx) : MO.concat(DO);
  return new z1(e, [
    os.data.of({
      autocomplete: fw(LO, xc(t))
    }),
    os.data.of({
      autocomplete: Jw
    }),
    n.jsx ? lx : []
  ]);
}
function rx(n) {
  for (; ; ) {
    if (n.name == "JSXOpenTag" || n.name == "JSXSelfClosingTag" || n.name == "JSXFragmentTag")
      return n;
    if (n.name == "JSXEscape" || !n.parent)
      return null;
    n = n.parent;
  }
}
function xu(n, e, t = n.length) {
  for (let i = e == null ? void 0 : e.firstChild; i; i = i.nextSibling)
    if (i.name == "JSXIdentifier" || i.name == "JSXBuiltin" || i.name == "JSXNamespacedName" || i.name == "JSXMemberExpression")
      return n.sliceString(i.from, Math.min(i.to, t));
  return "";
}
const ox = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), lx = /* @__PURE__ */ ge.inputHandler.of((n, e, t, i, s) => {
  if ((ox ? n.composing : n.compositionStarted) || n.state.readOnly || e != t || i != ">" && i != "/" || !os.isActiveAt(n.state, e, -1))
    return !1;
  let r = s(), { state: o } = r, l = o.changeByRange((a) => {
    var h;
    let { head: c } = a, f = Si(o).resolveInner(c - 1, -1), d;
    if (f.name == "JSXStartTag" && (f = f.parent), !(o.doc.sliceString(c - 1, c) != i || f.name == "JSXAttributeValue" && f.to > c)) {
      if (i == ">" && f.name == "JSXFragmentTag")
        return { range: a, changes: { from: c, insert: "</>" } };
      if (i == "/" && f.name == "JSXStartCloseTag") {
        let p = f.parent, O = p.parent;
        if (O && p.from == c - 2 && ((d = xu(o.doc, O.firstChild, c)) || ((h = O.firstChild) === null || h === void 0 ? void 0 : h.name) == "JSXFragmentTag")) {
          let g = `${d}>`;
          return { range: B.cursor(c + g.length, -1), changes: { from: c, insert: g } };
        }
      } else if (i == ">") {
        let p = rx(f);
        if (p && p.name == "JSXOpenTag" && !/^\/?>|^<\//.test(o.doc.sliceString(c, c + 2)) && (d = xu(o.doc, p, c)))
          return { range: a, changes: { from: c, insert: `</${d}>` } };
      }
    }
    return { range: a };
  });
  return l.changes.empty ? !1 : (n.dispatch([
    r,
    o.update(l, { userEvent: "input.complete", scrollIntoView: !0 })
  ]), !0);
});
var ax = /* @__PURE__ */ L('<div class="expr-editor svelte-c939oi"><div class="expr-cm svelte-c939oi"></div> <div class="expr-actions svelte-c939oi"><span class="expr-hint svelte-c939oi">JSONata</span> <button class="eval-btn svelte-c939oi" title="Evaluate against last run context">▶ Evaluate</button></div></div>');
function hx(n, e) {
  kt(e, !1);
  let t = ft(e, "value", 12, ""), i = ft(e, "placeholder", 8, "JSONata expression..."), s = ft(e, "fieldName", 8, ""), r = ft(e, "contextKeys", 24, () => []);
  const o = md(), l = [
    "$sum",
    "$count",
    "$max",
    "$min",
    "$average",
    "$map",
    "$filter",
    "$reduce",
    "$sort",
    "$reverse",
    "$distinct",
    "$append",
    "$exists",
    "$type",
    "$string",
    "$number",
    "$boolean",
    "$length",
    "$substring",
    "$split",
    "$join",
    "$trim",
    "$uppercase",
    "$lowercase",
    "$contains",
    "$match",
    "$replace",
    "$now",
    "$fromMillis",
    "$toMillis"
  ];
  let a = /* @__PURE__ */ U(), h = /* @__PURE__ */ U();
  function c() {
    const v = [
      ...l.map((x) => ({ label: x, type: "function" })),
      ...r().map((x) => ({ label: x, type: "variable" }))
    ];
    return xc(v);
  }
  function f() {
    return [
      bb(),
      El.of([...Sy, ..._b]),
      nb(),
      sx(),
      Nw({ override: [c()] }),
      v1(i()),
      ge.lineWrapping,
      ge.updateListener.of((v) => {
        v.docChanged && (t(v.state.doc.toString()), o("change", t()));
      }),
      ge.theme({
        "&": {
          fontSize: "0.75rem",
          backgroundColor: "#0d1117",
          border: "1px solid #374151",
          borderRadius: "4px"
        },
        "&.cm-focused": { outline: "none", borderColor: "#f59e0b" },
        ".cm-content": {
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
          caretColor: "#f59e0b",
          padding: "6px 8px"
        },
        ".cm-scroller": { minHeight: "3.5em" },
        ".cm-gutters": { display: "none" }
      })
    ];
  }
  ms(() => {
    k(h, new ge({
      state: Xe.create({ doc: t(), extensions: f() }),
      parent: u(a)
    }));
  }), gd(() => {
    var v;
    (v = u(h)) == null || v.destroy();
  });
  function d() {
    o("evaluate", t());
  }
  lt(() => (u(h), Ee(t())), () => {
    u(h) && t() !== u(h).state.doc.toString() && u(h).dispatch({
      changes: { from: 0, to: u(h).state.doc.length, insert: t() }
    });
  }), en(), Tt();
  var p = ax(), O = y(p);
  Fh(O, (v) => k(a, v), () => u(a));
  var g = w(O, 2), m = w(y(g), 2);
  F(() => Fe(O, "data-field", s())), ie("click", m, d), A(n, p), $t();
}
var cx = /* @__PURE__ */ L('<input type="text" placeholder="connection ID" class="svelte-awrrrl"/>'), fx = /* @__PURE__ */ L("<option> </option>"), ux = /* @__PURE__ */ L('<div class="hint svelte-awrrrl"> </div>'), dx = /* @__PURE__ */ L('<select class="svelte-awrrrl"><option>— select a connection —</option><!></select> <!>', 1);
function px(n, e) {
  kt(e, !1);
  let t = ft(e, "value", 8, ""), i = ft(e, "service", 8, void 0), s = ft(e, "onChange", 8), r = /* @__PURE__ */ U([]), o = /* @__PURE__ */ U(!1);
  ms(async () => {
    try {
      const f = await fetch("/api/integrations/connections");
      if (!f.ok) throw new Error(String(f.status));
      const d = await f.json();
      k(r, i() ? d.filter((p) => p.service === i()) : d);
    } catch {
      k(o, !0);
    }
  }), Tt();
  var l = pn(), a = Ve(l);
  {
    var h = (f) => {
      var d = cx();
      F(() => br(d, t())), ie("input", d, (p) => s()(p.target.value)), A(f, d);
    }, c = (f) => {
      var d = dx(), p = Ve(d), O = y(p);
      O.value = O.__value = "";
      var g = w(O);
      Ue(g, 1, () => u(r), Ge, (S, _) => {
        var C = fx(), R = y(C), X = {};
        F(() => {
          V(R, `${u(_), b(() => u(_).displayName) ?? ""} (${u(_), b(() => u(_).service) ?? ""}${u(_), b(() => u(_).status !== "active" ? ` — ${u(_).status}` : "") ?? ""})`), X !== (X = (u(_), b(() => u(_).id))) && (C.value = (C.__value = (u(_), b(() => u(_).id))) ?? "");
        }), A(S, C);
      });
      var m;
      bd(p);
      var v = w(p, 2);
      {
        var x = (S) => {
          var _ = ux(), C = y(_);
          F(() => V(C, `No ${i() ?? "integration" ?? ""} connections. Create one in Admin → Integration Connections.`)), A(S, _);
        };
        ee(v, (S) => {
          u(r), b(() => u(r).length === 0) && S(x);
        });
      }
      F(() => {
        m !== (m = t()) && (p.value = (p.__value = t()) ?? "", Gh(p, t()));
      }), ie("change", p, (S) => s()(S.target.value)), A(f, d);
    };
    ee(a, (f) => {
      u(o) ? f(h) : f(c, -1);
    });
  }
  A(n, l), $t();
}
var Ox = /* @__PURE__ */ L('<textarea rows="4" class="svelte-b5q3h1"></textarea>'), gx = /* @__PURE__ */ L('<input type="text" placeholder="comma-separated values" class="svelte-b5q3h1"/>'), mx = /* @__PURE__ */ L('<input type="checkbox" style="width:auto" class="svelte-b5q3h1"/>'), vx = /* @__PURE__ */ L('<div class="eval-result svelte-b5q3h1"> </div>'), bx = /* @__PURE__ */ L('<!> <!> <button class="mode-toggle-btn svelte-b5q3h1">← Value Picker mode</button>', 1), yx = /* @__PURE__ */ L('<button class="picker-btn svelte-b5q3h1" title="Reference upstream node output">↗</button>'), wx = /* @__PURE__ */ L('<button class="picker-option svelte-b5q3h1"><span class="picker-node svelte-b5q3h1"> </span> <span class="picker-ref svelte-b5q3h1"> </span></button>'), xx = /* @__PURE__ */ L('<div class="picker-dropdown svelte-b5q3h1"><div class="picker-label svelte-b5q3h1">Insert reference to:</div> <!></div>'), Sx = /* @__PURE__ */ L('<div class="field-with-picker svelte-b5q3h1"><input type="text" class="svelte-b5q3h1"/> <!> <button class="expr-toggle-btn svelte-b5q3h1" title="Switch to JSONata expression editor">ƒ</button></div> <!>', 1), Qx = /* @__PURE__ */ L('<div class="form-group svelte-b5q3h1"><label class="svelte-b5q3h1"> </label> <!></div>'), kx = /* @__PURE__ */ L('<div class="panel-section svelte-b5q3h1"><div class="panel-header svelte-b5q3h1"><span> </span> <button class="close-btn svelte-b5q3h1">✕</button></div> <div class="form-group svelte-b5q3h1"><label class="svelte-b5q3h1">Label</label> <input type="text" class="svelte-b5q3h1"/></div> <!> <button class="btn-danger svelte-b5q3h1">Remove node</button></div>');
function $x(n, e) {
  kt(e, !1);
  const t = () => St(_r, "$nodeTypes", s), i = () => St(Et, "$graph", s), [s, r] = gn(), o = /* @__PURE__ */ U(), l = /* @__PURE__ */ U(), a = /* @__PURE__ */ U();
  let h = ft(e, "node", 8), c = /* @__PURE__ */ U(null), f = /* @__PURE__ */ U(
    null
    // field currently in expression editor mode
  ), d = /* @__PURE__ */ U(
    {}
    // fieldKey → eval result
  );
  function p(T) {
    var P, N;
    const E = t().find((oe) => oe.type === T.type), Z = (N = (P = E == null ? void 0 : E.schema) == null ? void 0 : P.output) == null ? void 0 : N.properties;
    return Z && Object.keys(Z).length > 0 ? Object.keys(Z) : ["output"];
  }
  async function O(T, E) {
    try {
      const P = await (await fetch("/studio/evaluate-expression", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression: E })
      })).json();
      k(d, {
        ...u(d),
        [T]: P.error ? `Error: ${P.error}` : JSON.stringify(P.result)
      });
    } catch {
      k(d, { ...u(d), [T]: "Request failed" });
    }
  }
  function g(T, E) {
    Et.update((Z) => ({
      ...Z,
      nodes: {
        ...Z.nodes,
        [h().id]: { ...h(), config: { ...h().config, [T]: E } }
      }
    }));
  }
  function m(T) {
    Et.update((E) => ({
      ...E,
      nodes: { ...E.nodes, [h().id]: { ...h(), label: T } }
    }));
  }
  function v() {
    Et.update((T) => {
      const E = { ...T.nodes };
      return delete E[h().id], {
        ...T,
        nodes: E,
        edges: T.edges.filter((Z) => Z.from !== h().id && Z.to !== h().id)
      };
    }), Mn.set(null);
  }
  function x(T) {
    return h().config[T] ?? void 0;
  }
  function S(T, E, Z) {
    g(T, `$.${Z}`), k(c, null);
  }
  lt(() => (t(), Ee(h())), () => {
    k(o, t().find((T) => T.type === h().type));
  }), lt(() => u(o), () => {
    var T, E, Z;
    k(l, ((Z = (E = (T = u(o)) == null ? void 0 : T.schema) == null ? void 0 : E.config) == null ? void 0 : Z.properties) ?? {});
  }), lt(() => (i(), Ee(h())), () => {
    k(a, Object.values(i().nodes).filter((T) => i().edges.some((E) => E.to === h().id && E.from === T.id)));
  }), lt(() => Ee(h()), () => {
    var T;
    (T = h()) != null && T.id && (k(f, null), k(d, {}), k(c, null));
  }), en(), Tt();
  var _ = kx(), C = y(_), R = y(C), X = y(R), H = w(R, 2), D = w(C, 2), j = w(y(D), 2), M = w(D, 2);
  Ue(
    M,
    1,
    () => (u(l), b(() => Object.entries(u(l)))),
    Ge,
    (T, E) => {
      var Z = /* @__PURE__ */ Vs(() => gg(u(E), 2));
      let P = () => u(Z)[0], N = () => u(Z)[1];
      var oe = Qx(), q = y(oe), G = y(q), z = w(q, 2);
      {
        var K = (ce) => {
          {
            let ue = /* @__PURE__ */ mt(() => (P(), b(() => String(x(P()) ?? ""))));
            px(ce, {
              get value() {
                return u(ue);
              },
              get service() {
                return N(), b(() => N().service);
              },
              onChange: (ye) => g(P(), ye)
            });
          }
        }, le = (ce) => {
          var ue = Ox();
          F((ye) => br(ue, ye), [
            () => (P(), b(() => JSON.stringify(x(P()) ?? {}, null, 2)))
          ]), ie("blur", ue, (ye) => {
            try {
              g(P(), JSON.parse(ye.target.value));
            } catch {
            }
          }), A(ce, ue);
        }, ae = (ce) => {
          var ue = gx();
          F((ye) => br(ue, ye), [
            () => (P(), b(() => Array.isArray(x(P())) ? x(P()).join(", ") : String(x(P()) ?? "")))
          ]), ie("input", ue, (ye) => g(P(), ye.target.value.split(",").map((Ze) => Ze.trim()).filter(Boolean))), A(ce, ue);
        }, ve = (ce) => {
          var ue = mx();
          F((ye) => zm(ue, ye), [() => (P(), b(() => !!x(P())))]), ie("change", ue, (ye) => g(P(), ye.target.checked)), A(ce, ue);
        }, fe = (ce) => {
          var ue = pn(), ye = Ve(ue);
          {
            var Ze = (I) => {
              var ne = bx(), de = Ve(ne);
              {
                let ke = /* @__PURE__ */ mt(() => (P(), b(() => String(x(P()) ?? "")))), $e = /* @__PURE__ */ mt(() => (u(a), b(() => u(a).flatMap(p))));
                hx(de, {
                  get value() {
                    return u(ke);
                  },
                  get fieldName() {
                    return P();
                  },
                  get contextKeys() {
                    return u($e);
                  },
                  $$events: {
                    change: (re) => g(P(), re.detail),
                    evaluate: (re) => O(P(), re.detail)
                  }
                });
              }
              var Qe = w(de, 2);
              {
                var tt = (ke) => {
                  var $e = vx(), re = y($e);
                  F((pe) => V(re, pe), [
                    () => (u(d), P(), b(() => String(u(d)[P()])))
                  ]), A(ke, $e);
                };
                ee(Qe, (ke) => {
                  u(d), P(), b(() => u(d)[P()]) && ke(tt);
                });
              }
              var He = w(Qe, 2);
              ie("click", He, () => {
                k(f, null), k(d, { ...u(d), [P()]: void 0 });
              }), A(I, ne);
            }, Y = (I) => {
              var ne = Sx(), de = Ve(ne), Qe = y(de), tt = w(Qe, 2);
              {
                var He = (pe) => {
                  var we = yx();
                  ie("click", we, () => {
                    k(c, u(c) === P() ? null : P());
                  }), A(pe, we);
                };
                ee(tt, (pe) => {
                  u(a), b(() => u(a).length > 0) && pe(He);
                });
              }
              var ke = w(tt, 2), $e = w(de, 2);
              {
                var re = (pe) => {
                  var we = xx(), Ye = w(y(we), 2);
                  Ue(Ye, 1, () => u(a), Ge, (Ot, gt) => {
                    var ht = pn(), J = Ve(ht);
                    Ue(
                      J,
                      1,
                      () => (u(gt), b(() => p(u(gt)))),
                      Ge,
                      (he, be) => {
                        var je = wx(), it = y(je), Ce = y(it), De = w(it, 2), Ke = y(De);
                        F(() => {
                          V(Ce, (u(gt), b(() => u(gt).label ?? u(gt).id))), V(Ke, `$.${u(be) ?? ""}`);
                        }), ie("click", je, () => S(P(), u(gt).id, u(be))), A(he, je);
                      }
                    ), A(Ot, ht);
                  }), A(pe, we);
                };
                ee($e, (pe) => {
                  u(c), P(), u(a), b(() => u(c) === P() && u(a).length > 0) && pe(re);
                });
              }
              F((pe) => br(Qe, pe), [
                () => (P(), b(() => String(x(P()) ?? "")))
              ]), ie("input", Qe, (pe) => g(P(), pe.target.value)), ie("click", ke, () => {
                k(f, P()), k(c, null);
              }), A(I, ne);
            };
            ee(ye, (I) => {
              u(f) === P() ? I(Ze) : I(Y, -1);
            });
          }
          A(ce, ue);
        };
        ee(z, (ce) => {
          N(), b(() => N().format === "connection") ? ce(K) : (N(), b(() => N().type === "object") ? ce(le, 1) : (N(), b(() => N().type === "array") ? ce(ae, 2) : (N(), b(() => N().type === "boolean") ? ce(ve, 3) : ce(fe, -1))));
        });
      }
      F(() => V(G, (N(), P(), b(() => N().description ?? P())))), A(T, oe);
    }
  );
  var Q = w(M, 2);
  F(() => {
    V(X, `Node: ${Ee(h()), b(() => h().type) ?? ""}`), br(j, (Ee(h()), b(() => h().label ?? "")));
  }), ie("click", H, () => Mn.set(null)), ie("input", j, (T) => m(T.target.value)), ie("click", Q, v), A(n, _), $t(), r();
}
var Px = /* @__PURE__ */ L('<div class="agent-name svelte-5tjmbm"> </div> <div> </div>', 1), _x = /* @__PURE__ */ L('<div class="status-msg svelte-5tjmbm"> </div>'), Tx = /* @__PURE__ */ L('<div class="status-msg svelte-5tjmbm"> </div>'), Zx = /* @__PURE__ */ L('<div class="status-msg svelte-5tjmbm"> </div>'), Cx = /* @__PURE__ */ L('<button class="btn-revert svelte-5tjmbm"> </button> <!>', 1), Ax = /* @__PURE__ */ L('<span class="trigger-filter svelte-5tjmbm"> </span>'), Rx = /* @__PURE__ */ L('<div class="trigger-row svelte-5tjmbm"><div class="trigger-info svelte-5tjmbm"><span class="trigger-service svelte-5tjmbm"> </span> <!> <code class="trigger-url svelte-5tjmbm"> </code></div> <button class="trigger-remove svelte-5tjmbm" title="Remove trigger">✕</button></div>'), Mx = /* @__PURE__ */ L('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Registered Triggers</label> <!></div>'), Xx = /* @__PURE__ */ L("<option> </option>"), Ex = /* @__PURE__ */ L('<div class="status-msg svelte-5tjmbm"> </div>'), Lx = /* @__PURE__ */ L(`<!> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Service</label> <select class="svelte-5tjmbm"><option>— select a service —</option><!></select></div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Event Filter (optional)</label> <input type="text" placeholder="e.g. app_mention — blank for all events" class="svelte-5tjmbm"/></div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Signing Secret</label> <input type="password" placeholder="the service's webhook signing secret" class="svelte-5tjmbm"/> <div class="field-hint svelte-5tjmbm">Used to verify inbound event signatures. Never displayed after registration.</div></div> <button class="btn-save svelte-5tjmbm"> </button> <!>`, 1), jx = /* @__PURE__ */ L('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Cron Expression</label> <input type="text" placeholder="0 * * * * (every hour)" class="svelte-5tjmbm"/> <div class="field-hint svelte-5tjmbm">Standard cron format: minute hour day month weekday</div></div>'), zx = /* @__PURE__ */ L('<div class="webhook-url svelte-5tjmbm"><code class="svelte-5tjmbm"> </code> <div class="field-hint svelte-5tjmbm">POST your payload to this URL. No auth headers required.</div></div>'), Dx = /* @__PURE__ */ L('<div class="field-hint svelte-5tjmbm">Publish the agent to generate the webhook URL.</div>'), Ix = /* @__PURE__ */ L('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Webhook URL</label> <!></div>'), Wx = /* @__PURE__ */ L('<div class="status-msg svelte-5tjmbm"> </div>'), Yx = /* @__PURE__ */ L('<div class="panel-section svelte-5tjmbm"><div class="panel-header svelte-5tjmbm">Agent</div> <!> <div class="btn-row svelte-5tjmbm"><button class="btn-draft svelte-5tjmbm"> </button> <button class="btn-publish svelte-5tjmbm"> </button></div> <!> <!> <!></div> <div class="panel-section svelte-5tjmbm"><div class="panel-header svelte-5tjmbm">Trigger Config</div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Trigger Type</label> <select class="svelte-5tjmbm"><option>REST API</option><option>Scheduled (Cron)</option><option>Webhook</option><option>Integration Event</option></select></div> <!> <!> <!> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Description</label> <input type="text" placeholder="What does this agent do?" class="svelte-5tjmbm"/></div> <button class="btn-save svelte-5tjmbm"> </button> <!></div>', 1);
function qx(n, e) {
  kt(e, !1);
  const t = () => St(Et, "$graph", r), i = () => St(ws, "$agentConfig", r), s = () => St(Io, "$agent", r), [r, o] = gn();
  let l = ft(e, "agentId", 8), a = /* @__PURE__ */ U(!1), h = /* @__PURE__ */ U(""), c = /* @__PURE__ */ U(!1), f = /* @__PURE__ */ U(""), d = /* @__PURE__ */ U(!1), p = /* @__PURE__ */ U(""), O = /* @__PURE__ */ U(!1), g = /* @__PURE__ */ U(""), m = /* @__PURE__ */ U([]), v = /* @__PURE__ */ U([]), x = /* @__PURE__ */ U(""), S = /* @__PURE__ */ U(""), _ = /* @__PURE__ */ U(""), C = /* @__PURE__ */ U(""), R = /* @__PURE__ */ U(!1);
  ms(async () => {
    try {
      const [J, he] = await Promise.all([
        fetch("/api/integrations"),
        fetch("/api/integrations/triggers")
      ]);
      if (J.ok) {
        const be = await J.json();
        k(m, be.filter((je) => je.hasTrigger));
      }
      if (he.ok) {
        const be = await he.json();
        k(v, be.filter((je) => je.agentId === l()));
      }
    } catch {
    }
  });
  async function X() {
    k(R, !0), k(C, "");
    try {
      const J = await fetch("/api/integrations/triggers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: u(x),
          agentId: l(),
          eventFilter: u(S) || void 0,
          secret: u(_)
        })
      });
      if (!J.ok) throw new Error("Registration failed");
      const he = await J.json();
      k(v, [...u(v), he]), k(_, ""), k(S, ""), k(C, "✓ Trigger registered");
    } catch (J) {
      k(C, "✗ " + (J instanceof Error ? J.message : "Error"));
    } finally {
      k(R, !1);
    }
  }
  async function H(J) {
    try {
      const he = await fetch(`/api/integrations/triggers/${J}`, { method: "DELETE" });
      (he.ok || he.status === 204) && k(v, u(v).filter((be) => be.id !== J));
    } catch {
    }
  }
  async function D() {
    k(a, !0), k(h, "");
    try {
      const J = JSON.stringify(t());
      if (!(await fetch(`/api/agents/${l()}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ graphJson: J })
      })).ok) throw new Error("Publish failed");
      k(h, "✓ Published");
      const be = await fetch(`/api/agents/${l()}`);
      be.ok && Io.set(await be.json());
    } catch (J) {
      k(h, "✗ " + (J instanceof Error ? J.message : "Error"));
    } finally {
      k(a, !1);
    }
  }
  async function j() {
    k(d, !0), k(p, "");
    try {
      if (!(await fetch(`/api/agents/${l()}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftGraphJson: JSON.stringify(t()) })
      })).ok) throw new Error("Save failed");
      k(p, "✓ Draft saved");
    } catch (J) {
      k(p, "✗ " + (J instanceof Error ? J.message : "Error"));
    } finally {
      k(d, !1);
    }
  }
  async function M() {
    k(O, !0), k(g, "");
    try {
      const J = await fetch(`/api/agents/${l()}/draft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (!J.ok) throw new Error("Revert failed");
      Io.set(await J.json()), k(g, "✓ Reverted to draft");
    } catch (J) {
      k(g, "✗ " + (J instanceof Error ? J.message : "Error"));
    } finally {
      k(O, !1);
    }
  }
  async function Q() {
    k(c, !0), k(f, "");
    try {
      const J = { type: i().triggerType };
      if (i().triggerType === "cron" && (J.expression = i().cronExpression), !(await fetch(`/api/agents/${l()}/config`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ triggerConfig: J })
      })).ok) throw new Error("Save failed");
      if (k(f, "✓ Saved"), i().triggerType === "webhook") {
        const be = await fetch(`/api/agents/${l()}/config`);
        if (be.ok) {
          const je = await be.json();
          ws.update((it) => {
            var Ce;
            return { ...it, webhookUrl: ((Ce = je.triggerConfig) == null ? void 0 : Ce.webhookUrl) ?? "" };
          });
        }
      }
    } catch (J) {
      k(f, "✗ " + (J instanceof Error ? J.message : "Error"));
    } finally {
      k(c, !1);
    }
  }
  Tt();
  var T = Yx(), E = Ve(T), Z = w(y(E), 2);
  {
    var P = (J) => {
      var he = Px(), be = Ve(he), je = y(be), it = w(be, 2), Ce = y(it);
      F(() => {
        V(je, (s(), b(() => s().name))), bi(it, 1, `agent-status status-${s(), b(() => s().status) ?? ""}`, "svelte-5tjmbm"), V(Ce, (s(), b(() => s().status)));
      }), A(J, he);
    };
    ee(Z, (J) => {
      s() && J(P);
    });
  }
  var N = w(Z, 2), oe = y(N), q = y(oe), G = w(oe, 2), z = y(G), K = w(N, 2);
  {
    var le = (J) => {
      var he = _x(), be = y(he);
      F(() => V(be, u(p))), A(J, he);
    };
    ee(K, (J) => {
      u(p) && J(le);
    });
  }
  var ae = w(K, 2);
  {
    var ve = (J) => {
      var he = Tx(), be = y(he);
      F(() => V(be, u(h))), A(J, he);
    };
    ee(ae, (J) => {
      u(h) && J(ve);
    });
  }
  var fe = w(ae, 2);
  {
    var ce = (J) => {
      var he = Cx(), be = Ve(he), je = y(be), it = w(be, 2);
      {
        var Ce = (De) => {
          var Ke = Zx(), qe = y(Ke);
          F(() => V(qe, u(g))), A(De, Ke);
        };
        ee(it, (De) => {
          u(g) && De(Ce);
        });
      }
      F(() => {
        be.disabled = u(O), V(je, u(O) ? "Reverting…" : "Revert to Draft");
      }), ie("click", be, M), A(J, he);
    };
    ee(fe, (J) => {
      s(), b(() => {
        var he;
        return ((he = s()) == null ? void 0 : he.status) === "active";
      }) && J(ce);
    });
  }
  var ue = w(E, 2), ye = w(y(ue), 2), Ze = w(y(ye), 2), Y = y(Ze);
  Y.value = Y.__value = "rest";
  var I = w(Y);
  I.value = I.__value = "cron";
  var ne = w(I);
  ne.value = ne.__value = "webhook";
  var de = w(ne);
  de.value = de.__value = "integration";
  var Qe = w(ye, 2);
  {
    var tt = (J) => {
      var he = Lx(), be = Ve(he);
      {
        var je = (At) => {
          var si = Mx(), vn = w(y(si), 2);
          Ue(vn, 1, () => u(v), Ge, (Yl, ri) => {
            var Cc = Rx(), Ac = y(Cc), Rc = y(Ac), VO = y(Rc), Mc = w(Rc, 2);
            {
              var NO = (ql) => {
                var Xc = Ax(), HO = y(Xc);
                F(() => V(HO, (u(ri), b(() => u(ri).eventFilter)))), A(ql, Xc);
              };
              ee(Mc, (ql) => {
                u(ri), b(() => u(ri).eventFilter) && ql(NO);
              });
            }
            var GO = w(Mc, 2), UO = y(GO), FO = w(Ac, 2);
            F(() => {
              V(VO, (u(ri), b(() => u(ri).service))), V(UO, (u(ri), b(() => u(ri).url)));
            }), ie("click", FO, () => H(u(ri).id)), A(Yl, Cc);
          }), A(At, si);
        };
        ee(be, (At) => {
          u(v), b(() => u(v).length > 0) && At(je);
        });
      }
      var it = w(be, 2), Ce = w(y(it), 2), De = y(Ce);
      De.value = De.__value = "";
      var Ke = w(De);
      Ue(Ke, 1, () => u(m), Ge, (At, si) => {
        var vn = Xx(), Yl = y(vn), ri = {};
        F(() => {
          V(Yl, (u(si), b(() => u(si).displayName))), ri !== (ri = (u(si), b(() => u(si).service))) && (vn.value = (vn.__value = (u(si), b(() => u(si).service))) ?? "");
        }), A(At, vn);
      });
      var qe = w(it, 2), Ct = w(y(qe), 2), Zc = w(qe, 2), WO = w(y(Zc), 2), co = w(Zc, 2), YO = y(co), qO = w(co, 2);
      {
        var BO = (At) => {
          var si = Ex(), vn = y(si);
          F(() => V(vn, u(C))), A(At, si);
        };
        ee(qO, (At) => {
          u(C) && At(BO);
        });
      }
      F(() => {
        co.disabled = u(R) || !u(x) || !u(_), V(YO, u(R) ? "Registering…" : "Register Trigger");
      }), qa(Ce, () => u(x), (At) => k(x, At)), Bt(Ct, () => u(S), (At) => k(S, At)), Bt(WO, () => u(_), (At) => k(_, At)), ie("click", co, X), A(J, he);
    };
    ee(Qe, (J) => {
      i(), b(() => i().triggerType === "integration") && J(tt);
    });
  }
  var He = w(Qe, 2);
  {
    var ke = (J) => {
      var he = jx(), be = w(y(he), 2);
      Bt(be, () => i().cronExpression, (je) => Vl(ws, b(i).cronExpression = je, b(i))), A(J, he);
    };
    ee(He, (J) => {
      i(), b(() => i().triggerType === "cron") && J(ke);
    });
  }
  var $e = w(He, 2);
  {
    var re = (J) => {
      var he = Ix(), be = w(y(he), 2);
      {
        var je = (Ce) => {
          var De = zx(), Ke = y(De), qe = y(Ke);
          F(() => V(qe, (i(), b(() => i().webhookUrl)))), A(Ce, De);
        }, it = (Ce) => {
          var De = Dx();
          A(Ce, De);
        };
        ee(be, (Ce) => {
          i(), b(() => i().webhookUrl) ? Ce(je) : Ce(it, -1);
        });
      }
      A(J, he);
    };
    ee($e, (J) => {
      i(), b(() => i().triggerType === "webhook") && J(re);
    });
  }
  var pe = w($e, 2), we = w(y(pe), 2), Ye = w(pe, 2), Ot = y(Ye), gt = w(Ye, 2);
  {
    var ht = (J) => {
      var he = Wx(), be = y(he);
      F(() => V(be, u(f))), A(J, he);
    };
    ee(gt, (J) => {
      u(f) && J(ht);
    });
  }
  F(() => {
    oe.disabled = u(d), V(q, u(d) ? "Saving…" : "Save Draft"), G.disabled = u(a), V(z, u(a) ? "Publishing…" : "Publish"), Ye.disabled = u(c), V(Ot, u(c) ? "Saving…" : "Save");
  }), ie("click", oe, j), ie("click", G, D), qa(Ze, () => i().triggerType, (J) => Vl(ws, b(i).triggerType = J, b(i))), Bt(we, () => i().description, (J) => Vl(ws, b(i).description = J, b(i))), ie("click", Ye, Q), A(n, T), $t(), o();
}
const oi = Os({
  runId: null,
  status: "idle",
  output: null,
  error: null,
  steps: []
});
var Bx = /* @__PURE__ */ L('<button class="btn-stop svelte-gqobos">■ Stop</button>'), Vx = /* @__PURE__ */ L('<pre class="result-json svelte-gqobos"> </pre>'), Nx = /* @__PURE__ */ L('<div class="result-error svelte-gqobos"> </div>'), Gx = /* @__PURE__ */ L('<button class="traj-toggle svelte-gqobos"> </button>'), Ux = /* @__PURE__ */ L('<div class="traj-thought svelte-gqobos"><span class="traj-label svelte-gqobos">Thought</span> </div>'), Fx = /* @__PURE__ */ L('<div class="traj-action svelte-gqobos"><span class="traj-label svelte-gqobos">Action</span> </div>'), Hx = /* @__PURE__ */ L('<div class="traj-obs svelte-gqobos"><span class="traj-label svelte-gqobos">Obs</span> </div>'), Kx = /* @__PURE__ */ L('<div class="traj-step svelte-gqobos"><span class="traj-iter svelte-gqobos"> </span> <!> <!> <!></div>'), Jx = /* @__PURE__ */ L('<div class="trajectory-block svelte-gqobos"></div>'), eS = /* @__PURE__ */ L('<div><span class="step-type svelte-gqobos"> </span> <span> </span> <!></div> <!>', 1), tS = /* @__PURE__ */ L('<div class="steps-header svelte-gqobos"> </div> <!>', 1), iS = /* @__PURE__ */ L('<div><div class="result-status svelte-gqobos"> </div> <!> <!></div> <!>', 1), nS = /* @__PURE__ */ L('<div class="panel-section svelte-gqobos"><div class="panel-header svelte-gqobos">Test Run</div> <div class="form-group svelte-gqobos"><label class="svelte-gqobos">Input (JSON)</label> <textarea rows="4" class="svelte-gqobos"></textarea></div> <div class="run-controls svelte-gqobos"><button class="btn-run svelte-gqobos"> </button> <!></div> <!></div>');
function sS(n, e) {
  kt(e, !1);
  const t = () => St(oi, "$runState", i), [i, s] = gn();
  let r = ft(e, "agentId", 8), o = /* @__PURE__ */ U("{}"), l = /* @__PURE__ */ U(!1), a = null;
  const h = /* @__PURE__ */ new Set(["core:react", "core:planner"]);
  let c = /* @__PURE__ */ U([]), f = /* @__PURE__ */ U(
    null
    // nodeId
  );
  async function d(D) {
    try {
      const j = await fetch(`/api/telemetry/trajectory/${D}`);
      if (!j.ok) return;
      const M = await j.json();
      k(c, M.trajectories ?? []);
    } catch {
    }
  }
  function p() {
    a && (a.close(), a = null), k(l, !1);
  }
  async function O() {
    var M;
    p(), k(l, !0), oi.set({
      runId: null,
      status: "running",
      output: null,
      error: null,
      steps: []
    });
    let D;
    try {
      D = JSON.parse(u(o));
    } catch {
      oi.set({
        runId: null,
        status: "failed",
        output: null,
        error: "Invalid JSON input",
        steps: []
      }), k(l, !1);
      return;
    }
    let j;
    try {
      const Q = await fetch(`/api/agents/${r()}/runs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: D, mode: "async" })
      });
      if (!Q.ok) {
        const E = await Q.json();
        throw new Error(((M = E == null ? void 0 : E.error) == null ? void 0 : M.message) ?? `HTTP ${Q.status}`);
      }
      j = (await Q.json()).runId;
    } catch (Q) {
      oi.set({
        runId: null,
        status: "failed",
        output: null,
        error: String(Q),
        steps: []
      }), k(l, !1);
      return;
    }
    oi.update((Q) => ({ ...Q, runId: j })), a = new EventSource(`/api/agents/${r()}/runs/${j}/stream`), a.addEventListener("node.started", (Q) => {
      const T = JSON.parse(Q.data);
      oi.update((E) => ({
        ...E,
        steps: [
          ...E.steps.filter((Z) => Z.nodeId !== T.nodeId),
          {
            id: T.nodeId,
            nodeId: T.nodeId,
            nodeType: T.nodeType,
            stepId: T.stepId,
            status: "running",
            startedAt: (/* @__PURE__ */ new Date()).toISOString(),
            completedAt: void 0,
            input: null,
            output: null,
            error: null
          }
        ]
      }));
    }), a.addEventListener("node.completed", (Q) => {
      const T = JSON.parse(Q.data);
      oi.update((E) => ({
        ...E,
        steps: E.steps.map((Z) => Z.nodeId === T.nodeId ? {
          ...Z,
          status: "complete",
          completedAt: (/* @__PURE__ */ new Date()).toISOString(),
          output: T.outputs
        } : Z)
      }));
    }), a.addEventListener("node.failed", (Q) => {
      const T = JSON.parse(Q.data);
      oi.update((E) => ({
        ...E,
        steps: E.steps.map((Z) => Z.nodeId === T.nodeId ? {
          ...Z,
          status: "failed",
          completedAt: (/* @__PURE__ */ new Date()).toISOString(),
          error: T.error
        } : Z)
      }));
    }), a.addEventListener("run.completed", (Q) => {
      const T = JSON.parse(Q.data);
      oi.update((E) => ({ ...E, status: "completed", output: T.output })), p(), d(j);
    }), a.addEventListener("run.failed", (Q) => {
      const T = JSON.parse(Q.data);
      oi.update((E) => ({ ...E, status: "failed", error: T.error.message })), p();
    }), a.addEventListener("run.suspended", () => {
      oi.update((Q) => ({
        ...Q,
        status: "failed",
        error: "Run suspended — awaiting human review"
      })), p();
    }), a.onerror = () => {
      u(l) && (oi.update((Q) => ({
        ...Q,
        status: Q.status === "running" ? "failed" : Q.status,
        error: Q.error ?? "Stream connection lost"
      })), p());
    };
  }
  Tt();
  var g = nS(), m = w(y(g), 2), v = w(y(m), 2), x = w(m, 2), S = y(x), _ = y(S), C = w(S, 2);
  {
    var R = (D) => {
      var j = Bx();
      ie("click", j, p), A(D, j);
    };
    ee(C, (D) => {
      u(l) && D(R);
    });
  }
  var X = w(x, 2);
  {
    var H = (D) => {
      var j = iS(), M = Ve(j), Q = y(M), T = y(Q), E = w(Q, 2);
      {
        var Z = (G) => {
          var z = Vx(), K = y(z);
          F((le) => V(K, le), [
            () => (t(), b(() => JSON.stringify(t().output, null, 2)))
          ]), A(G, z);
        };
        ee(E, (G) => {
          t(), b(() => t().output) && G(Z);
        });
      }
      var P = w(E, 2);
      {
        var N = (G) => {
          var z = Nx(), K = y(z);
          F(() => V(K, (t(), b(() => t().error)))), A(G, z);
        };
        ee(P, (G) => {
          t(), b(() => t().error) && G(N);
        });
      }
      var oe = w(M, 2);
      {
        var q = (G) => {
          var z = tS(), K = Ve(z), le = y(K), ae = w(K, 2);
          Ue(ae, 1, () => (t(), b(() => t().steps)), Ge, (ve, fe) => {
            var ce = eS(), ue = Ve(ce), ye = y(ue), Ze = y(ye), Y = w(ye, 2), I = y(Y), ne = w(Y, 2);
            {
              var de = (ke) => {
                const $e = /* @__PURE__ */ mt(() => (u(c), u(fe), b(() => u(c).filter((Ye) => Ye.stepId === u(fe).stepId))));
                var re = pn(), pe = Ve(re);
                {
                  var we = (Ye) => {
                    var Ot = Gx(), gt = y(Ot);
                    F(() => V(gt, `▶ Trajectory (${Ee(u($e)), b(() => u($e).length) ?? ""} steps)`)), ie("click", Ot, () => k(f, u(f) === u(fe).nodeId ? null : u(fe).nodeId)), A(Ye, Ot);
                  };
                  ee(pe, (Ye) => {
                    Ee(u($e)), b(() => u($e).length > 0) && Ye(we);
                  });
                }
                A(ke, re);
              }, Qe = /* @__PURE__ */ Vs(() => (u(fe), t(), b(() => h.has(u(fe).nodeType) && t().status !== "running")));
              ee(ne, (ke) => {
                u(Qe) && ke(de);
              });
            }
            var tt = w(ue, 2);
            {
              var He = (ke) => {
                const $e = /* @__PURE__ */ mt(() => (u(c), u(fe), b(() => u(c).filter((pe) => pe.stepId === u(fe).stepId))));
                var re = Jx();
                Ue(re, 5, () => u($e), Ge, (pe, we) => {
                  var Ye = Kx(), Ot = y(Ye), gt = y(Ot), ht = w(Ot, 2);
                  {
                    var J = (Ce) => {
                      var De = Ux(), Ke = w(y(De));
                      F(() => V(Ke, ` ${u(we), b(() => u(we).thought) ?? ""}`)), A(Ce, De);
                    };
                    ee(ht, (Ce) => {
                      u(we), b(() => u(we).thought) && Ce(J);
                    });
                  }
                  var he = w(ht, 2);
                  {
                    var be = (Ce) => {
                      var De = Fx(), Ke = w(y(De));
                      F(() => V(Ke, ` ${u(we), b(() => u(we).action) ?? ""}`)), A(Ce, De);
                    };
                    ee(he, (Ce) => {
                      u(we), b(() => u(we).action) && Ce(be);
                    });
                  }
                  var je = w(he, 2);
                  {
                    var it = (Ce) => {
                      var De = Hx(), Ke = w(y(De));
                      F(() => V(Ke, ` ${u(we), b(() => u(we).observation) ?? ""}`)), A(Ce, De);
                    };
                    ee(je, (Ce) => {
                      u(we), b(() => u(we).observation) && Ce(it);
                    });
                  }
                  F(() => V(gt, `Iter ${u(we), b(() => u(we).iteration) ?? ""}`)), A(pe, Ye);
                }), A(ke, re);
              };
              ee(tt, (ke) => {
                u(f), u(fe), b(() => u(f) === u(fe).nodeId) && ke(He);
              });
            }
            F(() => {
              bi(ue, 1, `step step-${u(fe), b(() => u(fe).status) ?? ""}`, "svelte-gqobos"), V(Ze, (u(fe), b(() => u(fe).nodeType))), bi(Y, 1, `step-badge badge-${u(fe), b(() => u(fe).status) ?? ""}`, "svelte-gqobos"), V(I, (u(fe), b(() => u(fe).status)));
            }), A(ve, ce);
          }), F(() => V(le, `Steps (${t(), b(() => t().steps.length) ?? ""})`)), A(G, z);
        };
        ee(oe, (G) => {
          t(), b(() => t().steps.length > 0) && G(q);
        });
      }
      F(
        (G) => {
          bi(M, 1, `run-result status-${t(), b(() => t().status) ?? ""}`, "svelte-gqobos"), V(T, G);
        },
        [
          () => (t(), b(() => t().status.toUpperCase()))
        ]
      ), A(D, j);
    };
    ee(X, (D) => {
      t(), b(() => t().status !== "idle") && D(H);
    });
  }
  F(() => {
    S.disabled = u(l), V(_, u(l) ? "Running…" : "▶ Run");
  }), Bt(v, () => u(o), (D) => k(o, D)), ie("click", S, O), A(n, g), $t(), s();
}
const IO = Os([]);
let Qa = !1;
async function rS() {
  if (!Qa) {
    Qa = !0;
    try {
      const n = await fetch("/api/integrations/connections");
      if (!n.ok) throw new Error(String(n.status));
      IO.set(await n.json());
    } catch {
      Qa = !1;
    }
  }
}
var oS = /* @__PURE__ */ L('<span class="badge badge-error svelte-do6mn6"> </span>'), lS = /* @__PURE__ */ L('<span class="badge badge-warn svelte-do6mn6"> </span>'), aS = /* @__PURE__ */ L('<div class="issue issue-error svelte-do6mn6" role="button" tabindex="0"><span class="issue-icon svelte-do6mn6">✗</span> <span class="issue-msg svelte-do6mn6"> </span></div>'), hS = /* @__PURE__ */ L('<div class="issue issue-warning svelte-do6mn6" role="button" tabindex="0"><span class="issue-icon svelte-do6mn6">⚠</span> <span class="issue-msg svelte-do6mn6"> </span></div>'), cS = /* @__PURE__ */ L('<label class="ack-label svelte-do6mn6"><input type="checkbox" class="svelte-do6mn6"/> Acknowledge warnings and allow publish</label>'), fS = /* @__PURE__ */ L('<div class="lint-panel svelte-do6mn6"><div class="lint-header svelte-do6mn6"><span class="lint-title svelte-do6mn6">Graph Issues</span> <!> <!></div> <div class="issue-list svelte-do6mn6"><!> <!></div> <!></div>');
function uS(n, e) {
  kt(e, !1);
  const t = () => St(Et, "$graph", r), i = () => St(_r, "$nodeTypes", r), s = () => St(IO, "$connections", r), [r, o] = gn(), l = /* @__PURE__ */ U(), a = /* @__PURE__ */ U(), h = /* @__PURE__ */ U(), c = /* @__PURE__ */ U();
  let f = /* @__PURE__ */ U(!1);
  ms(() => {
    rS();
  });
  function d(S) {
    const _ = [], C = /* @__PURE__ */ new Map();
    for (const D of S.edges) {
      const j = C.get(D.from) ?? [];
      j.push(D.to), C.set(D.from, j);
    }
    const R = /* @__PURE__ */ new Map();
    function X(D) {
      var j;
      R.set(D, "visiting");
      for (const M of C.get(D) ?? [])
        if (R.get(M) === "visiting") {
          const Q = S.nodes[D];
          (Q == null ? void 0 : Q.type) !== "core:loop" && _.push({
            severity: "error",
            message: `Cycle edge from "${(Q == null ? void 0 : Q.label) ?? D}" to "${((j = S.nodes[M]) == null ? void 0 : j.label) ?? M}" is only legal when the source is a core:loop node — the engine silently skips it otherwise`,
            nodeId: D
          });
        } else R.has(M) || X(M);
      R.set(D, "done");
    }
    const H = S.entry ?? Object.keys(S.nodes)[0];
    return H && S.nodes[H] && X(H), _;
  }
  function p(S, _, C) {
    var H, D;
    const R = [], X = new Set(C.map((j) => j.id));
    for (const j of Object.values(S.nodes)) {
      const M = _.find((T) => T.type === j.type), Q = (D = (H = M == null ? void 0 : M.schema) == null ? void 0 : H.config) == null ? void 0 : D.properties;
      if (Q)
        for (const [T, E] of Object.entries(Q)) {
          if (E.format !== "connection") continue;
          const Z = j.config[T];
          (!Z || !X.has(String(Z))) && R.push({
            severity: "error",
            message: `Node "${j.label ?? j.id}" is missing a valid ${E.service ?? "integration"} connection for "${T}"`,
            nodeId: j.id
          });
        }
    }
    return R;
  }
  function O(S, _, C) {
    const R = [], X = Object.values(S.nodes), H = S.edges, D = new Set(_.map((Z) => Z.type));
    if (X.length === 0)
      return R.push({
        severity: "error",
        message: "Graph is empty — add at least a Start and End node"
      }), R;
    for (const Z of X)
      D.size > 0 && !D.has(Z.type) && R.push({
        severity: "error",
        message: `Node "${Z.label ?? Z.id}" has unknown type "${Z.type}"`,
        nodeId: Z.id
      });
    const j = S.entry ?? Object.keys(S.nodes)[0];
    S.nodes[j] || R.push({ severity: "error", message: "No entry node defined" });
    const M = /* @__PURE__ */ new Set(), Q = [j];
    for (; Q.length > 0; ) {
      const Z = Q.shift();
      if (!M.has(Z)) {
        M.add(Z);
        for (const P of H)
          P.from === Z && !M.has(P.to) && Q.push(P.to);
      }
    }
    for (const Z of X)
      M.has(Z.id) || R.push({
        severity: "warning",
        message: `Node "${Z.label ?? Z.id}" is unreachable from the entry node`,
        nodeId: Z.id
      });
    for (const Z of X) {
      const P = H.filter((q) => q.from === Z.id);
      if (P.length === 0) continue;
      const N = P.some((q) => q.type === "conditional"), oe = P.some((q) => q.type === "fallback" || q.type === "unconditional");
      N && !oe && R.push({
        severity: "warning",
        message: `Node "${Z.label ?? Z.id}" has conditional edges but no fallback — some inputs may go unhandled`,
        nodeId: Z.id
      });
    }
    const T = /* @__PURE__ */ new Set(["core:end", "core:stop"]);
    for (const Z of X) {
      if (T.has(Z.type)) continue;
      H.filter((N) => N.from === Z.id).length === 0 && R.push({
        severity: "warning",
        message: `Node "${Z.label ?? Z.id}" has no outbound edges and is not a terminal node`,
        nodeId: Z.id
      });
    }
    const E = S.toolEdges ?? [];
    for (const Z of X) {
      if (Z.type === "core:tool") {
        const P = H.filter((oe) => oe.from === Z.id);
        P.length !== 1 && R.push({
          severity: "error",
          message: `Tool node "${Z.label ?? Z.id}" must have exactly one outbound flow edge (has ${P.length})`,
          nodeId: Z.id
        }), E.filter((oe) => oe.from === Z.id).length === 0 && R.push({
          severity: "error",
          message: `Tool node "${Z.label ?? Z.id}" must be connected to an agent node via a tool edge`,
          nodeId: Z.id
        });
      }
      (Z.type === "core:tool-call" || Z.type === "core:react") && E.filter((N) => N.to === Z.id).length === 0 && R.push({
        severity: "warning",
        message: `Agent node "${Z.label ?? Z.id}" (${Z.type}) has no tools connected — it will only be able to generate text without tool invocations`,
        nodeId: Z.id
      });
    }
    return R.push(...d(S)), R.push(...p(S, _, C)), R;
  }
  function g(S) {
    if (!S) return;
    const _ = t().nodes[S];
    _ && Mn.set(_);
  }
  lt(() => (t(), i(), s()), () => {
    k(l, O(t(), i(), s()));
  }), lt(() => u(l), () => {
    k(a, u(l).filter((S) => S.severity === "error"));
  }), lt(() => u(l), () => {
    k(h, u(l).filter((S) => S.severity === "warning"));
  }), lt(() => (u(a), u(h), u(f)), () => {
    k(c, u(a).length === 0 && (u(h).length === 0 || u(f)));
  }), en(), Tt();
  var m = pn(), v = Ve(m);
  {
    var x = (S) => {
      var _ = fS(), C = y(_), R = w(y(C), 2);
      {
        var X = (Z) => {
          var P = oS(), N = y(P);
          F(() => V(N, `${u(a), b(() => u(a).length) ?? ""} error${u(a), b(() => u(a).length !== 1 ? "s" : "") ?? ""}`)), A(Z, P);
        };
        ee(R, (Z) => {
          u(a), b(() => u(a).length > 0) && Z(X);
        });
      }
      var H = w(R, 2);
      {
        var D = (Z) => {
          var P = lS(), N = y(P);
          F(() => V(N, `${u(h), b(() => u(h).length) ?? ""} warning${u(h), b(() => u(h).length !== 1 ? "s" : "") ?? ""}`)), A(Z, P);
        };
        ee(H, (Z) => {
          u(h), b(() => u(h).length > 0) && Z(D);
        });
      }
      var j = w(C, 2), M = y(j);
      Ue(M, 1, () => u(a), Ge, (Z, P) => {
        var N = aS(), oe = w(y(N), 2), q = y(oe);
        F(() => V(q, (u(P), b(() => u(P).message)))), ie("click", N, () => g(u(P).nodeId)), ie("keydown", N, (G) => G.key === "Enter" && g(u(P).nodeId)), A(Z, N);
      });
      var Q = w(M, 2);
      Ue(Q, 1, () => u(h), Ge, (Z, P) => {
        var N = hS(), oe = w(y(N), 2), q = y(oe);
        F(() => V(q, (u(P), b(() => u(P).message)))), ie("click", N, () => g(u(P).nodeId)), ie("keydown", N, (G) => G.key === "Enter" && g(u(P).nodeId)), A(Z, N);
      });
      var T = w(j, 2);
      {
        var E = (Z) => {
          var P = cS(), N = y(P);
          yd(N, () => u(f), (oe) => k(f, oe)), A(Z, P);
        };
        ee(T, (Z) => {
          u(a), u(h), b(() => u(a).length === 0 && u(h).length > 0) && Z(E);
        });
      }
      A(S, _);
    };
    ee(v, (S) => {
      u(l), b(() => u(l).length > 0) && S(x);
    });
  }
  A(n, m), $t(), o();
}
var dS = /* @__PURE__ */ L('<p class="empty-state svelte-28mxb5">No tools connected.<br/>Connect <code class="svelte-28mxb5">core:tool</code> or <code class="svelte-28mxb5">core:mcp-client</code> nodes via tool edges.</p>'), pS = /* @__PURE__ */ L('<span class="tool-desc svelte-28mxb5"> </span>'), OS = /* @__PURE__ */ L('<li class="tool-item svelte-28mxb5"><span class="tool-name svelte-28mxb5"> </span> <span class="tool-source svelte-28mxb5"> </span> <!></li>'), gS = /* @__PURE__ */ L('<ul class="tool-list svelte-28mxb5"></ul>'), mS = /* @__PURE__ */ L('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Name</span><code class="svelte-28mxb5"> </code></div>'), vS = /* @__PURE__ */ L('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Description</span><span class="svelte-28mxb5"> </span></div>'), bS = /* @__PURE__ */ L('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Connected to</span> <span class="svelte-28mxb5"> </span></div>'), yS = /* @__PURE__ */ L('<div class="tool-detail svelte-28mxb5"><!> <!> <!></div>'), wS = /* @__PURE__ */ L('<p class="empty-state svelte-28mxb5">Select an agent node (<code class="svelte-28mxb5">core:tool-call</code>, <code class="svelte-28mxb5">core:react</code>) or a tool node to inspect its tools.</p>'), xS = /* @__PURE__ */ L('<div class="tool-panel svelte-28mxb5"><div class="panel-header svelte-28mxb5">TOOLS</div> <!></div>');
function SS(n, e) {
  kt(e, !1);
  const t = () => St(Mn, "$selectedNode", s), i = () => St(Et, "$graph", s), [s, r] = gn(), o = /* @__PURE__ */ U(), l = /* @__PURE__ */ U(), a = /* @__PURE__ */ U(), h = /* @__PURE__ */ U(), c = /* @__PURE__ */ U(), f = /* @__PURE__ */ new Set(["core:tool", "core:mcp-client"]), d = /* @__PURE__ */ new Set(["core:tool-call", "core:react"]);
  lt(() => t(), () => {
    var _;
    k(o, ((_ = t()) == null ? void 0 : _.id) ?? null);
  }), lt(() => t(), () => {
    var _;
    k(l, ((_ = t()) == null ? void 0 : _.type) ?? null);
  }), lt(() => (u(o), u(l), i()), () => {
    k(a, u(o) && d.has(u(l) ?? "") ? (i().toolEdges ?? []).filter((_) => _.to === u(o)).map((_) => ({ edge: _, node: i().nodes[_.from] })).filter((_) => _.node !== void 0) : []);
  }), lt(() => (u(o), u(l), t()), () => {
    var _;
    k(h, u(o) && f.has(u(l) ?? "") ? (_ = t()) == null ? void 0 : _.config : null);
  }), lt(() => (u(o), u(l), i()), () => {
    k(c, u(o) && f.has(u(l) ?? "") ? (i().toolEdges ?? []).filter((_) => _.from === u(o)).map((_) => i().nodes[_.to]).filter(Boolean) : []);
  }), en(), Tt();
  var p = xS(), O = w(y(p), 2);
  {
    var g = (_) => {
      var C = pn(), R = Ve(C);
      {
        var X = (D) => {
          var j = dS();
          A(D, j);
        }, H = (D) => {
          var j = gS();
          Ue(j, 5, () => u(a), Ge, (M, Q) => {
            let T = () => u(Q).node;
            var E = OS(), Z = y(E), P = y(Z), N = w(Z, 2), oe = y(N), q = w(N, 2);
            {
              var G = (z) => {
                var K = pS(), le = y(K);
                F((ae) => V(le, ae), [
                  () => (T(), b(() => String(T().config.description)))
                ]), A(z, K);
              };
              ee(q, (z) => {
                T(), b(() => {
                  var K;
                  return (K = T().config) == null ? void 0 : K.description;
                }) && z(G);
              });
            }
            F(
              (z) => {
                V(P, z), V(oe, (T(), b(() => T().type === "core:mcp-client" ? "MCP" : "Graph")));
              },
              [
                () => (T(), b(() => {
                  var z;
                  return String(((z = T().config) == null ? void 0 : z.name) ?? T().type);
                }))
              ]
            ), A(M, E);
          }), A(D, j);
        };
        ee(R, (D) => {
          u(a), b(() => u(a).length === 0) ? D(X) : D(H, -1);
        });
      }
      A(_, C);
    }, m = /* @__PURE__ */ Vs(() => (u(l), b(() => d.has(u(l) ?? "")))), v = (_) => {
      var C = yS(), R = y(C);
      {
        var X = (Q) => {
          var T = mS(), E = w(y(T)), Z = y(E);
          F((P) => V(Z, P), [
            () => (u(h), b(() => String(u(h).name)))
          ]), A(Q, T);
        };
        ee(R, (Q) => {
          u(h), b(() => u(h).name) && Q(X);
        });
      }
      var H = w(R, 2);
      {
        var D = (Q) => {
          var T = vS(), E = w(y(T)), Z = y(E);
          F((P) => V(Z, P), [
            () => (u(h), b(() => String(u(h).description)))
          ]), A(Q, T);
        };
        ee(H, (Q) => {
          u(h), b(() => u(h).description) && Q(D);
        });
      }
      var j = w(H, 2);
      {
        var M = (Q) => {
          var T = bS(), E = w(y(T), 2), Z = y(E);
          F((P) => V(Z, P), [
            () => (u(c), b(() => u(c).map((P) => (P == null ? void 0 : P.label) ?? (P == null ? void 0 : P.id)).join(", ")))
          ]), A(Q, T);
        };
        ee(j, (Q) => {
          u(c), b(() => u(c).length > 0) && Q(M);
        });
      }
      A(_, C);
    }, x = /* @__PURE__ */ Vs(() => (u(l), u(h), b(() => f.has(u(l) ?? "") && u(h)))), S = (_) => {
      var C = wS();
      A(_, C);
    };
    ee(O, (_) => {
      u(m) ? _(g) : u(x) ? _(v, 1) : _(S, -1);
    });
  }
  A(n, p), $t(), r();
}
var QS = /* @__PURE__ */ L('<div class="rationale svelte-1grl4xd"> </div>'), kS = /* @__PURE__ */ L('<code class="target svelte-1grl4xd"> </code>'), $S = /* @__PURE__ */ L('<span class="data-preview svelte-1grl4xd"> </span>'), PS = /* @__PURE__ */ L('<label class="patch-row svelte-1grl4xd"><input type="checkbox"/> <span class="op-label svelte-1grl4xd"> </span> <!> <!></label>'), _S = /* @__PURE__ */ L('<div class="proposal-card svelte-1grl4xd"><div class="proposal-header svelte-1grl4xd"><span class="complexity-badge svelte-1grl4xd"> </span> <span class="proposal-desc svelte-1grl4xd"> </span></div> <!> <div class="patches-list svelte-1grl4xd"></div> <div class="proposal-actions svelte-1grl4xd"><button class="btn-text svelte-1grl4xd">Accept All</button> <button class="btn-text svelte-1grl4xd">Reject All</button> <span class="spacer svelte-1grl4xd"></span> <button class="btn-secondary svelte-1grl4xd">Dismiss</button> <button class="btn-primary svelte-1grl4xd">Apply</button></div></div>');
function TS(n, e) {
  kt(e, !1);
  let t = ft(e, "proposal", 8);
  const i = md();
  let s = /* @__PURE__ */ U({});
  function r() {
    k(s, Object.fromEntries(t().patches.map((D, j) => [j, !0])));
  }
  function o() {
    k(s, Object.fromEntries(t().patches.map((D, j) => [j, !1])));
  }
  function l() {
    const D = t().patches.filter((j, M) => u(s)[M]);
    i("apply", { ...t(), patches: D });
  }
  function a() {
    i("reject");
  }
  const h = {
    targeted: "#22c55e",
    structural: "#f59e0b",
    replacement: "#ef4444"
  };
  function c(D) {
    return {
      add_node: "+ Add node",
      update_node: "~ Update node",
      delete_node: "− Delete node",
      add_edge: "+ Add edge",
      delete_edge: "− Delete edge",
      add_tool_edge: "+ Add tool edge"
    }[D] ?? D;
  }
  lt(() => Ee(t()), () => {
    k(s, Object.fromEntries(t().patches.map((D, j) => [j, !0])));
  }), en(), Tt();
  var f = _S(), d = y(f), p = y(d), O = y(p), g = w(p, 2), m = y(g), v = w(d, 2);
  {
    var x = (D) => {
      var j = QS(), M = y(j);
      F(() => V(M, (Ee(t()), b(() => t().rationale)))), A(D, j);
    };
    ee(v, (D) => {
      Ee(t()), b(() => t().rationale) && D(x);
    });
  }
  var S = w(v, 2);
  Ue(
    S,
    5,
    () => (Ee(t()), b(() => t().patches)),
    Ge,
    (D, j, M) => {
      var Q = PS(), T = y(Q), E = w(T, 2), Z = y(E), P = w(E, 2);
      {
        var N = (z) => {
          var K = kS(), le = y(K);
          F(() => V(le, (u(j), b(() => u(j).target)))), A(z, K);
        };
        ee(P, (z) => {
          u(j), b(() => u(j).target) && z(N);
        });
      }
      var oe = w(P, 2);
      {
        var q = (z) => {
          var K = $S(), le = y(K);
          F((ae) => V(le, `${ae ?? ""}…`), [
            () => (u(j), b(() => JSON.stringify(u(j).data).slice(0, 60)))
          ]), A(z, K);
        }, G = /* @__PURE__ */ Vs(() => (u(j), b(() => u(j).data && Object.keys(u(j).data).length > 0)));
        ee(oe, (z) => {
          u(G) && z(q);
        });
      }
      F((z) => V(Z, z), [
        () => (u(j), b(() => c(u(j).op)))
      ]), yd(T, () => u(s)[M], (z) => wn(s, u(s)[M] = z)), A(D, Q);
    }
  );
  var _ = w(S, 2), C = y(_), R = w(C, 2), X = w(R, 4), H = w(X, 2);
  F(() => {
    vd(p, `color: ${Ee(t()), b(() => h[t().complexity]) ?? ""}`), V(O, (Ee(t()), b(() => t().complexity))), V(m, (Ee(t()), b(() => t().description)));
  }), ie("click", C, r), ie("click", R, o), ie("click", X, a), ie("click", H, l), A(n, f), $t();
}
var ZS = /* @__PURE__ */ L('<button class="icon-btn svelte-vtqea" title="History">⏱</button>'), CS = /* @__PURE__ */ L('<div><span class="msg-content svelte-vtqea"> </span></div>'), AS = /* @__PURE__ */ L('<div class="history-view svelte-vtqea"><div class="history-header svelte-vtqea"><span class="svelte-vtqea">Conversation History</span> <button class="icon-btn svelte-vtqea">✕</button></div> <div class="messages-list svelte-vtqea"></div></div>'), RS = /* @__PURE__ */ L('<div class="empty-state svelte-vtqea">Ask Caal to explain, improve, or modify this agent graph.</div>'), MS = /* @__PURE__ */ L('<button class="node-chip svelte-vtqea"> </button>'), XS = /* @__PURE__ */ L('<span class="svelte-vtqea"> </span>'), ES = /* @__PURE__ */ L('<div class="msg-content svelte-vtqea"></div>'), LS = /* @__PURE__ */ L('<span class="msg-content svelte-vtqea"> </span>'), jS = /* @__PURE__ */ L("<div><!></div>"), zS = /* @__PURE__ */ L('<div class="message assistant thinking svelte-vtqea"><span class="dot svelte-vtqea"></span><span class="dot svelte-vtqea"></span><span class="dot svelte-vtqea"></span></div>'), DS = /* @__PURE__ */ L('<button class="quick-btn svelte-vtqea"> </button>'), IS = /* @__PURE__ */ L('<div class="messages-list svelte-vtqea"><!> <!> <!></div> <!> <div class="quick-actions svelte-vtqea"></div> <div class="input-area svelte-vtqea"><textarea class="caal-input svelte-vtqea" placeholder="Ask Caal… (Enter to send, Shift+Enter for newline)"></textarea> <button class="send-btn svelte-vtqea">➤</button></div>', 1), WS = /* @__PURE__ */ L('<div><div class="caal-header svelte-vtqea"><span class="caal-title svelte-vtqea"><span class="caal-dot svelte-vtqea"></span> Caal AI</span> <div class="header-actions svelte-vtqea"><!> <button class="icon-btn svelte-vtqea"> </button></div></div> <!></div>');
function YS(n, e) {
  kt(e, !1);
  const t = () => St(Et, "$graph", s), i = () => St(Mn, "$selectedNode", s), [s, r] = gn();
  ft(e, "agentId", 8);
  let o = /* @__PURE__ */ U([]), l = /* @__PURE__ */ U(""), a = /* @__PURE__ */ U(!1), h = /* @__PURE__ */ U(null), c = /* @__PURE__ */ U(null), f = /* @__PURE__ */ U(!0), d = /* @__PURE__ */ U(!1), p = /* @__PURE__ */ U([]), O = /* @__PURE__ */ U();
  const g = [
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
  async function m(z, K) {
    if (!z.trim() || u(a)) return;
    const le = { role: "user", content: z, timestamp: Date.now() };
    k(o, [...u(o), le]), k(l, ""), k(a, !0), R();
    try {
      const ae = {
        ...t(),
        authoringMode: t().authoringMode ?? "studio"
      }, ve = {
        message: z,
        graphState: ae,
        selectedNodeIds: i() ? [i().id] : [],
        sessionId: u(c) ?? void 0,
        intent: K ?? v(z)
      }, fe = await fetch("/api/v1/caal/invoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ve)
      });
      if (!fe.ok) throw new Error(`Caal invoke failed: ${fe.status}`);
      const ce = await fe.json();
      ce.sessionId && k(c, ce.sessionId);
      const ue = ce.output ?? {}, ye = {
        role: "assistant",
        content: ue.content ?? "",
        nodeReferences: ue.nodeReferences ?? [],
        proposal: ue.proposal,
        canvasHighlight: ue.canvasHighlight,
        canvasFocus: ue.canvasFocus,
        timestamp: Date.now()
      };
      k(o, [...u(o), ye]), ue.proposal && k(h, ue.proposal), ue.canvasHighlight && x(ue.canvasHighlight), ue.canvasFocus && S(ue.canvasFocus);
    } catch (ae) {
      const ve = {
        role: "assistant",
        content: `Error: ${ae.message}`,
        timestamp: Date.now()
      };
      k(o, [...u(o), ve]);
    } finally {
      k(a, !1), R();
    }
  }
  function v(z) {
    const K = z.toLowerCase();
    return /\b(add|create|remove|delete|update|change|modify|rename|move|connect|disconnect)\b/.test(K) ? "modify" : /\b(suggest|improve|optimize|better|recommend|enhance)\b/.test(K) ? "suggest" : "question";
  }
  function x(z) {
    window.dispatchEvent(new CustomEvent("caal:canvas-highlight", { detail: z }));
  }
  function S(z) {
    window.dispatchEvent(new CustomEvent("caal:canvas-focus", { detail: z }));
  }
  function _(z) {
    window.dispatchEvent(new CustomEvent("caal:canvas-focus", { detail: { nodeId: z, zoom: 1.5 } })), window.dispatchEvent(new CustomEvent("caal:canvas-highlight", {
      detail: { nodeIds: [z], color: "#F59E0B", durationMs: 2e3 }
    }));
  }
  function C(z) {
    const K = [], le = /\[\[([^\]]+)\]\]/g;
    let ae = 0, ve;
    for (; (ve = le.exec(z)) !== null; )
      ve.index > ae && K.push({ type: "text", value: z.slice(ae, ve.index) }), K.push({ type: "chip", value: ve[1] }), ae = ve.index + ve[0].length;
    return ae < z.length && K.push({ type: "text", value: z.slice(ae) }), K;
  }
  function R() {
    requestAnimationFrame(() => {
      u(O) && wn(O, u(O).scrollTop = u(O).scrollHeight);
    });
  }
  function X(z) {
    z.key === "Enter" && !z.shiftKey && (z.preventDefault(), m(u(l)));
  }
  async function H() {
    var z;
    if (u(c))
      try {
        const K = await fetch(`/api/v1/caal/sessions/${encodeURIComponent(u(c))}`);
        if (K.ok) {
          const le = await K.json();
          k(p, ((z = le.contextEntries) == null ? void 0 : z.messages) ?? []), k(d, !0);
        }
      } catch {
      }
  }
  function D(z) {
    const K = z.detail;
    window.dispatchEvent(new CustomEvent("caal:apply-proposal", { detail: K })), k(h, null), k(o, [
      ...u(o),
      {
        role: "assistant",
        content: `Proposal "${K.description}" accepted and applied to graph.`,
        timestamp: Date.now()
      }
    ]);
  }
  function j() {
    k(h, null);
  }
  Tt();
  var M = WS();
  let Q;
  var T = y(M), E = w(y(T), 2), Z = y(E);
  {
    var P = (z) => {
      var K = ZS();
      ie("click", K, H), A(z, K);
    };
    ee(Z, (z) => {
      u(c) && z(P);
    });
  }
  var N = w(Z, 2), oe = y(N), q = w(T, 2);
  {
    var G = (z) => {
      var K = pn(), le = Ve(K);
      {
        var ae = (fe) => {
          var ce = AS(), ue = y(ce), ye = w(y(ue), 2), Ze = w(ue, 2);
          Ue(Ze, 5, () => u(p), Ge, (Y, I) => {
            var ne = CS(), de = y(ne), Qe = y(de);
            F(() => {
              bi(ne, 1, `message ${u(I), b(() => u(I).role) ?? ""}`, "svelte-vtqea"), V(Qe, (u(I), b(() => u(I).content)));
            }), A(Y, ne);
          }), ie("click", ye, () => k(d, !1)), A(fe, ce);
        }, ve = (fe) => {
          var ce = IS(), ue = Ve(ce), ye = y(ue);
          {
            var Ze = (re) => {
              var pe = RS();
              A(re, pe);
            };
            ee(ye, (re) => {
              u(o), b(() => u(o).length === 0) && re(Ze);
            });
          }
          var Y = w(ye, 2);
          Ue(Y, 1, () => u(o), Ge, (re, pe) => {
            var we = jS(), Ye = y(we);
            {
              var Ot = (ht) => {
                var J = ES();
                Ue(
                  J,
                  5,
                  () => (u(pe), b(() => C(u(pe).content))),
                  Ge,
                  (he, be) => {
                    var je = pn(), it = Ve(je);
                    {
                      var Ce = (Ke) => {
                        var qe = MS(), Ct = y(qe);
                        F(() => V(Ct, (u(be), b(() => u(be).value)))), ie("click", qe, () => _(u(be).value)), A(Ke, qe);
                      }, De = (Ke) => {
                        var qe = XS(), Ct = y(qe);
                        F(() => V(Ct, (u(be), b(() => u(be).value)))), A(Ke, qe);
                      };
                      ee(it, (Ke) => {
                        u(be), b(() => u(be).type === "chip") ? Ke(Ce) : Ke(De, -1);
                      });
                    }
                    A(he, je);
                  }
                ), A(ht, J);
              }, gt = (ht) => {
                var J = LS(), he = y(J);
                F(() => V(he, (u(pe), b(() => u(pe).content)))), A(ht, J);
              };
              ee(Ye, (ht) => {
                u(pe), b(() => u(pe).role === "assistant") ? ht(Ot) : ht(gt, -1);
              });
            }
            F(() => bi(we, 1, `message ${u(pe), b(() => u(pe).role) ?? ""}`, "svelte-vtqea")), A(re, we);
          });
          var I = w(Y, 2);
          {
            var ne = (re) => {
              var pe = zS();
              A(re, pe);
            };
            ee(I, (re) => {
              u(a) && re(ne);
            });
          }
          Fh(ue, (re) => k(O, re), () => u(O));
          var de = w(ue, 2);
          {
            var Qe = (re) => {
              TS(re, {
                get proposal() {
                  return u(h);
                },
                $$events: { apply: D, reject: j }
              });
            };
            ee(de, (re) => {
              u(h) && re(Qe);
            });
          }
          var tt = w(de, 2);
          Ue(tt, 5, () => g, Ge, (re, pe) => {
            var we = DS(), Ye = y(we);
            F(() => {
              we.disabled = u(a), V(Ye, (u(pe), b(() => u(pe).label)));
            }), ie("click", we, () => m(u(pe).prompt, u(pe).intent)), A(re, we);
          });
          var He = w(tt, 2), ke = y(He);
          Fe(ke, "rows", 2);
          var $e = w(ke, 2);
          F(
            (re) => {
              ke.disabled = u(a), $e.disabled = re;
            },
            [
              () => (u(a), u(l), b(() => u(a) || !u(l).trim()))
            ]
          ), Bt(ke, () => u(l), (re) => k(l, re)), ie("keydown", ke, X), ie("click", $e, () => m(u(l))), A(fe, ce);
        };
        ee(le, (fe) => {
          u(d) ? fe(ae) : fe(ve, -1);
        });
      }
      A(z, K);
    };
    ee(q, (z) => {
      u(f) && z(G);
    });
  }
  F(() => {
    Q = bi(M, 1, "caal-panel svelte-vtqea", null, Q, { collapsed: !u(f) }), V(oe, u(f) ? "▼" : "▲");
  }), ie("click", N, () => k(f, !u(f))), A(n, M), $t(), r();
}
var qS = /* @__PURE__ */ L('<span class="sync-time svelte-ra0acr"> </span>'), BS = /* @__PURE__ */ L('<div class="code-banner svelte-ra0acr"><span class="icon svelte-ra0acr">⟨/⟩</span> <div class="text svelte-ra0acr"><span class="label svelte-ra0acr">Code-defined agent</span> <span class="handle svelte-ra0acr"> </span></div> <!> <a class="sync-link svelte-ra0acr" href="/admin/system/sync">Sync log</a></div>');
function VS(n, e) {
  kt(e, !1);
  let t = ft(e, "handle", 8), i = ft(e, "lastSyncAt", 8, null);
  Tt();
  var s = BS(), r = w(y(s), 2), o = w(y(r), 2), l = y(o), a = w(r, 2);
  {
    var h = (c) => {
      var f = qS(), d = y(f);
      F((p) => V(d, `Synced ${p ?? ""}`), [
        () => (Ee(i()), b(() => new Date(i()).toLocaleTimeString()))
      ]), A(c, f);
    };
    ee(a, (c) => {
      i() && c(h);
    });
  }
  F(() => V(l, t())), A(n, s), $t();
}
var NS = /* @__PURE__ */ L('<div class="loading svelte-1pzk804">Loading…</div>'), GS = /* @__PURE__ */ L('<div class="error svelte-1pzk804"> </div>'), US = /* @__PURE__ */ L('<div class="empty svelte-1pzk804">No context entries yet.</div>'), FS = /* @__PURE__ */ L('<span class="count svelte-1pzk804"> </span>'), HS = /* @__PURE__ */ L('<div class="entry svelte-1pzk804"><div class="entry-header svelte-1pzk804"><code class="entry-key svelte-1pzk804"> </code> <span class="acc-type svelte-1pzk804"> </span> <!> <span class="tokens svelte-1pzk804"> </span></div> <pre class="entry-value svelte-1pzk804"> </pre></div>'), KS = /* @__PURE__ */ L('<div class="entries svelte-1pzk804"></div>'), JS = /* @__PURE__ */ L('<div class="panel-body svelte-1pzk804"><div class="session-id-row svelte-1pzk804"><span class="label svelte-1pzk804">Session</span> <code class="sid svelte-1pzk804"> </code> <button class="refresh-btn svelte-1pzk804">↻</button></div> <!></div>'), eQ = /* @__PURE__ */ L('<div class="session-panel svelte-1pzk804"><button class="panel-header svelte-1pzk804"><span>Session Context</span> <span class="toggle svelte-1pzk804"> </span></button> <!></div>');
function tQ(n, e) {
  kt(e, !1);
  let t = ft(e, "agentId", 8), i = ft(e, "sessionId", 8, null), s = /* @__PURE__ */ U(!1), r = /* @__PURE__ */ U(!1), o = /* @__PURE__ */ U([]), l = /* @__PURE__ */ U(null);
  async function a() {
    if (!(!t() || !i())) {
      k(r, !0), k(l, null);
      try {
        const O = await fetch(`/api/v1/agents/${t()}/sessions/${encodeURIComponent(i())}`);
        if (!O.ok) throw new Error(`${O.status}`);
        const g = await O.json();
        k(o, Object.entries(g.contextEntries ?? {}).map(([m, v]) => ({
          key: m,
          value: v.value,
          accumulationType: v.accumulationType,
          count: Array.isArray(v.value) ? v.value.length : void 0
        })));
      } catch (O) {
        k(l, O.message);
      } finally {
        k(r, !1);
      }
    }
  }
  function h(O) {
    return Math.ceil(JSON.stringify(O).length / 4);
  }
  function c(O) {
    const g = JSON.stringify(O, null, 2);
    return g.length > 200 ? g.slice(0, 200) + "…" : g;
  }
  lt(() => (Ee(i()), u(s)), () => {
    i() && u(s) && a();
  }), en(), Tt();
  var f = pn(), d = Ve(f);
  {
    var p = (O) => {
      var g = eQ(), m = y(g), v = w(y(m), 2), x = y(v), S = w(m, 2);
      {
        var _ = (C) => {
          var R = JS(), X = y(R), H = w(y(X), 2), D = y(H), j = w(H, 2), M = w(X, 2);
          {
            var Q = (P) => {
              var N = NS();
              A(P, N);
            }, T = (P) => {
              var N = GS(), oe = y(N);
              F(() => V(oe, u(l))), A(P, N);
            }, E = (P) => {
              var N = US();
              A(P, N);
            }, Z = (P) => {
              var N = KS();
              Ue(N, 5, () => u(o), Ge, (oe, q) => {
                var G = HS(), z = y(G), K = y(z), le = y(K), ae = w(K, 2), ve = y(ae), fe = w(ae, 2);
                {
                  var ce = (I) => {
                    var ne = FS(), de = y(ne);
                    F(() => V(de, `${u(q), b(() => u(q).count) ?? ""} items`)), A(I, ne);
                  };
                  ee(fe, (I) => {
                    u(q), b(() => u(q).count !== void 0) && I(ce);
                  });
                }
                var ue = w(fe, 2), ye = y(ue), Ze = w(z, 2), Y = y(Ze);
                F(
                  (I, ne) => {
                    V(le, (u(q), b(() => u(q).key))), V(ve, (u(q), b(() => u(q).accumulationType))), V(ye, `~${I ?? ""}t`), V(Y, ne);
                  },
                  [
                    () => (u(q), b(() => h(u(q).value))),
                    () => (u(q), b(() => c(u(q).value)))
                  ]
                ), A(oe, G);
              }), A(P, N);
            };
            ee(M, (P) => {
              u(r) ? P(Q) : u(l) ? P(T, 1) : (u(o), b(() => u(o).length === 0) ? P(E, 2) : P(Z, -1));
            });
          }
          F(() => {
            V(D, i()), j.disabled = u(r);
          }), ie("click", j, a), A(C, R);
        };
        ee(S, (C) => {
          u(s) && C(_);
        });
      }
      F(() => V(x, u(s) ? "▼" : "▶")), ie("click", m, () => {
        k(s, !u(s));
      }), A(O, g);
    };
    ee(d, (O) => {
      i() && O(p);
    });
  }
  A(n, f), $t();
}
var iQ = /* @__PURE__ */ L('<div class="loading svelte-ojvpsl">Loading…</div>'), nQ = /* @__PURE__ */ L('<div class="error svelte-ojvpsl"> </div>'), sQ = /* @__PURE__ */ L('<div class="empty svelte-ojvpsl">No prompts defined.</div>'), rQ = /* @__PURE__ */ L('<span class="active-label svelte-ojvpsl">active</span>'), oQ = /* @__PURE__ */ L('<button class="promote-btn svelte-ojvpsl">Promote</button>'), lQ = /* @__PURE__ */ L('<button class="diff-btn svelte-ojvpsl">Diff</button>'), aQ = /* @__PURE__ */ L('<div><span class="vnum svelte-ojvpsl"> </span> <!> <!> <span class="version-date svelte-ojvpsl"> </span></div> <pre class="version-preview svelte-ojvpsl"> </pre>', 1), hQ = /* @__PURE__ */ L('<div class="versions-list svelte-ojvpsl"></div>'), cQ = /* @__PURE__ */ L('<div class="prompt-item svelte-ojvpsl"><button class="prompt-name svelte-ojvpsl"><span></span> <span> </span> <span class="version-count svelte-ojvpsl"> </span> <span class="chevron svelte-ojvpsl"> </span></button> <!></div>'), fQ = /* @__PURE__ */ L('<div class="prompts-list svelte-ojvpsl"></div>'), uQ = /* @__PURE__ */ L('<div class="panel-body svelte-ojvpsl"><!> <button class="new-btn svelte-ojvpsl">+ New Version</button></div>'), dQ = /* @__PURE__ */ L('<div class="modal-overlay svelte-ojvpsl"><div class="modal svelte-ojvpsl"><h3 class="svelte-ojvpsl">New Prompt Version</h3> <label class="svelte-ojvpsl">Prompt Name <input placeholder="e.g. system-prompt" class="svelte-ojvpsl"/></label> <label class="svelte-ojvpsl">Content <textarea placeholder="Prompt content…" class="svelte-ojvpsl"></textarea></label> <div class="modal-actions svelte-ojvpsl"><button class="btn-secondary svelte-ojvpsl">Cancel</button> <button class="btn-primary svelte-ojvpsl">Create</button></div></div></div>'), pQ = /* @__PURE__ */ L('<div class="modal-overlay svelte-ojvpsl"><div class="modal diff-modal svelte-ojvpsl"><h3 class="svelte-ojvpsl"> </h3> <div class="diff-grid svelte-ojvpsl"><div class="diff-col svelte-ojvpsl"><div class="diff-label svelte-ojvpsl"> </div> <pre class="svelte-ojvpsl"> </pre></div> <div class="diff-col svelte-ojvpsl"><div class="diff-label svelte-ojvpsl"> </div> <pre class="svelte-ojvpsl"> </pre></div></div> <div class="modal-actions svelte-ojvpsl"><button class="btn-secondary svelte-ojvpsl">Close</button> <button class="btn-primary svelte-ojvpsl"> </button></div></div></div>'), OQ = /* @__PURE__ */ L('<div class="prompt-panel svelte-ojvpsl"><button class="panel-header svelte-ojvpsl"><span>Prompt Versions</span> <span class="toggle svelte-ojvpsl"> </span></button> <!></div> <!> <!>', 1);
function gQ(n, e) {
  kt(e, !1), ft(e, "agentId", 8);
  let t = /* @__PURE__ */ U(!1), i = /* @__PURE__ */ U(!1), s = /* @__PURE__ */ U([]), r = /* @__PURE__ */ U(/* @__PURE__ */ new Set()), o = /* @__PURE__ */ U(""), l = /* @__PURE__ */ U(""), a = /* @__PURE__ */ U(!1), h = /* @__PURE__ */ U(null), c = /* @__PURE__ */ U(null);
  async function f() {
    k(i, !0), k(c, null);
    try {
      const Q = await fetch("/api/v1/prompts");
      if (!Q.ok) throw new Error(`${Q.status}`);
      const T = await Q.json();
      k(s, T.map((E) => ({ name: E.name, activeVersion: E, versions: [] })));
    } catch (Q) {
      k(c, Q.message);
    } finally {
      k(i, !1);
    }
  }
  async function d(Q) {
    const T = await fetch(`/api/v1/prompts/${encodeURIComponent(Q)}/versions`);
    if (!T.ok) throw new Error(`${T.status}`);
    const E = await T.json();
    k(s, u(s).map((Z) => Z.name === Q ? { ...Z, versions: E } : Z));
  }
  async function p(Q, T) {
    try {
      const E = await fetch(`/api/v1/prompts/${encodeURIComponent(Q)}/versions/${T}/promote`, { method: "POST" });
      if (!E.ok) throw new Error(`${E.status}`);
      await f(), u(r).has(Q) && await d(Q);
    } catch (E) {
      k(c, E.message);
    }
  }
  async function O() {
    if (!(!u(o) || !u(l)))
      try {
        const Q = await fetch("/api/v1/prompts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: u(o),
            content: u(l)
          })
        });
        if (!Q.ok) throw new Error(`${Q.status}`);
        const T = u(o);
        k(a, !1), k(o, ""), k(l, ""), await f(), u(r).has(T) && await d(T);
      } catch (Q) {
        k(c, Q.message);
      }
  }
  async function g(Q) {
    if (u(r).has(Q)) {
      u(r).delete(Q), k(r, new Set(u(r)));
      return;
    }
    u(r).add(Q), k(r, new Set(u(r)));
    try {
      await d(Q);
    } catch (T) {
      k(c, T.message);
    }
  }
  function m(Q, T, E) {
    k(h, { name: Q, v1: T, v2: E });
  }
  lt(() => (u(t), u(s)), () => {
    u(t) && u(s).length === 0 && f();
  }), en(), Tt();
  var v = OQ(), x = Ve(v), S = y(x), _ = w(y(S), 2), C = y(_), R = w(S, 2);
  {
    var X = (Q) => {
      var T = uQ(), E = y(T);
      {
        var Z = (G) => {
          var z = iQ();
          A(G, z);
        }, P = (G) => {
          var z = nQ(), K = y(z);
          F(() => V(K, u(c))), A(G, z);
        }, N = (G) => {
          var z = sQ();
          A(G, z);
        }, oe = (G) => {
          var z = fQ();
          Ue(z, 5, () => u(s), Ge, (K, le) => {
            var ae = cQ(), ve = y(ae), fe = y(ve);
            let ce;
            var ue = w(fe, 2), ye = y(ue), Ze = w(ue, 2), Y = y(Ze), I = w(Ze, 2), ne = y(I), de = w(ve, 2);
            {
              var Qe = (He) => {
                var ke = hQ();
                Ue(ke, 5, () => (u(le), b(() => u(le).versions ?? [])), Ge, ($e, re) => {
                  var pe = aQ(), we = Ve(pe);
                  let Ye;
                  var Ot = y(we), gt = y(Ot), ht = w(Ot, 2);
                  {
                    var J = (qe) => {
                      var Ct = rQ();
                      A(qe, Ct);
                    }, he = (qe) => {
                      var Ct = oQ();
                      ie("click", Ct, () => p(u(le).name, u(re).id)), A(qe, Ct);
                    };
                    ee(ht, (qe) => {
                      u(re), b(() => u(re).isActive) ? qe(J) : qe(he, -1);
                    });
                  }
                  var be = w(ht, 2);
                  {
                    var je = (qe) => {
                      var Ct = lQ();
                      ie("click", Ct, () => m(u(le).name, u(le).activeVersion, u(re))), A(qe, Ct);
                    };
                    ee(be, (qe) => {
                      u(le), u(re), b(() => u(le).activeVersion && !u(re).isActive) && qe(je);
                    });
                  }
                  var it = w(be, 2), Ce = y(it), De = w(we, 2), Ke = y(De);
                  F(
                    (qe, Ct) => {
                      Ye = bi(we, 1, "version-row svelte-ojvpsl", null, Ye, { active: u(re).isActive }), V(gt, `v${u(re), b(() => u(re).versionNumber) ?? ""}`), V(Ce, qe), V(Ke, `${Ct ?? ""}${u(re), b(() => u(re).content.length > 120 ? "…" : "") ?? ""}`);
                    },
                    [
                      () => (u(re), b(() => new Date(u(re).createdAt).toLocaleDateString())),
                      () => (u(re), b(() => u(re).content.slice(0, 120)))
                    ]
                  ), A($e, pe);
                }), A(He, ke);
              }, tt = /* @__PURE__ */ Vs(() => (u(r), u(le), b(() => u(r).has(u(le).name))));
              ee(de, (He) => {
                u(tt) && He(Qe);
              });
            }
            F(
              (He) => {
                ce = bi(fe, 1, "active-dot svelte-ojvpsl", null, ce, { active: u(le).activeVersion !== null }), V(ye, (u(le), b(() => u(le).name))), V(Y, `v${u(le), b(() => {
                  var ke;
                  return ((ke = u(le).activeVersion) == null ? void 0 : ke.versionNumber) ?? "—";
                }) ?? ""}`), V(ne, He);
              },
              [
                () => (u(r), u(le), b(() => u(r).has(u(le).name) ? "▼" : "▶"))
              ]
            ), ie("click", ve, () => g(u(le).name)), A(K, ae);
          }), A(G, z);
        };
        ee(E, (G) => {
          u(i) ? G(Z) : u(c) ? G(P, 1) : (u(s), b(() => u(s).length === 0) ? G(N, 2) : G(oe, -1));
        });
      }
      var q = w(E, 2);
      ie("click", q, () => k(a, !0)), A(Q, T);
    };
    ee(R, (Q) => {
      u(t) && Q(X);
    });
  }
  var H = w(x, 2);
  {
    var D = (Q) => {
      var T = dQ(), E = y(T), Z = w(y(E), 2), P = w(y(Z)), N = w(Z, 2), oe = w(y(N));
      Fe(oe, "rows", 6);
      var q = w(N, 2), G = y(q), z = w(G, 2);
      Bt(P, () => u(o), (K) => k(o, K)), Bt(oe, () => u(l), (K) => k(l, K)), ie("click", G, () => k(a, !1)), ie("click", z, O), ie("click", T, Ba(() => k(a, !1))), A(Q, T);
    };
    ee(H, (Q) => {
      u(a) && Q(D);
    });
  }
  var j = w(H, 2);
  {
    var M = (Q) => {
      var T = pQ(), E = y(T), Z = y(E), P = y(Z), N = w(Z, 2), oe = y(N), q = y(oe), G = y(q), z = w(q, 2), K = y(z), le = w(oe, 2), ae = y(le), ve = y(ae), fe = w(ae, 2), ce = y(fe), ue = w(N, 2), ye = y(ue), Ze = w(ye, 2), Y = y(Ze);
      F(() => {
        V(P, `Diff: ${u(h), b(() => u(h).name) ?? ""}`), V(G, `Active (v${u(h), b(() => u(h).v1.versionNumber) ?? ""})`), V(K, (u(h), b(() => u(h).v1.content))), V(ve, `v${u(h), b(() => u(h).v2.versionNumber) ?? ""}`), V(ce, (u(h), b(() => u(h).v2.content))), V(Y, `Promote v${u(h), b(() => u(h).v2.versionNumber) ?? ""}`);
      }), ie("click", ye, () => k(h, null)), ie("click", Ze, () => {
        p(u(h).name, u(h).v2.id), k(h, null);
      }), ie("click", T, Ba(() => k(h, null))), A(Q, T);
    };
    ee(j, (Q) => {
      u(h) && Q(M);
    });
  }
  F(() => V(C, u(t) ? "▼" : "▶")), ie("click", S, () => {
    k(t, !u(t));
  }), A(n, v), $t();
}
var mQ = /* @__PURE__ */ L('<span class="badge svelte-1bw2oss"> </span>'), vQ = /* @__PURE__ */ L("<div> <!></div>"), bQ = /* @__PURE__ */ L('<div class="loading svelte-1bw2oss">Loading…</div>'), yQ = /* @__PURE__ */ L('<div class="error svelte-1bw2oss"> </div>'), wQ = /* @__PURE__ */ L('<div class="empty svelte-1bw2oss">No test cases yet.</div>'), xQ = /* @__PURE__ */ L('<span class="running-indicator svelte-1bw2oss">⟳</span>'), SQ = /* @__PURE__ */ L('<div class="case-row svelte-1bw2oss"><span></span> <span class="case-name svelte-1bw2oss"> </span> <span class="assertion-count svelte-1bw2oss"> </span> <!> <button class="delete-btn svelte-1bw2oss">✕</button></div>'), QQ = /* @__PURE__ */ L('<div class="cases-list svelte-1bw2oss"></div>'), kQ = /* @__PURE__ */ L('<div class="panel-body svelte-1bw2oss"><!> <!> <div class="panel-actions svelte-1bw2oss"><button class="new-btn svelte-1bw2oss">+ New Test</button> <button class="run-btn svelte-1bw2oss"> </button></div></div>'), $Q = /* @__PURE__ */ L('<input placeholder="Expected value (JSON or string)" class="svelte-1bw2oss"/>'), PQ = /* @__PURE__ */ L('<label class="inline svelte-1bw2oss">Threshold <input type="number" min="0" max="1" step="0.05" style="width: 70px;" class="svelte-1bw2oss"/></label>'), _Q = /* @__PURE__ */ L('<div class="modal-overlay svelte-1bw2oss"><div class="modal svelte-1bw2oss"><h3 class="svelte-1bw2oss">New Test Case</h3> <label class="svelte-1bw2oss">Name <input placeholder="Test case name" class="svelte-1bw2oss"/></label> <label class="svelte-1bw2oss">Input JSON <textarea class="mono svelte-1bw2oss"></textarea></label> <div class="assertion-builder svelte-1bw2oss"><div class="assertion-header svelte-1bw2oss">Assertion</div> <div class="assertion-row svelte-1bw2oss"><select class="svelte-1bw2oss"><option>Exact Match</option><option>Schema</option><option>Score Threshold</option></select> <input placeholder="Output key, e.g. output.text" class="svelte-1bw2oss"/></div> <!></div> <div class="modal-actions svelte-1bw2oss"><button class="btn-secondary svelte-1bw2oss">Cancel</button> <button class="btn-primary svelte-1bw2oss">Create</button></div></div></div>'), TQ = /* @__PURE__ */ L('<div class="test-panel svelte-1bw2oss"><button class="panel-header svelte-1bw2oss"><span>Test Cases</span> <!> <span class="toggle svelte-1bw2oss"> </span></button> <!></div> <!>', 1);
function ZQ(n, e) {
  kt(e, !1);
  let t = ft(e, "agentId", 8), i = /* @__PURE__ */ U(!1), s = /* @__PURE__ */ U(!1), r = /* @__PURE__ */ U(!1), o = /* @__PURE__ */ U([]), l = /* @__PURE__ */ U(null), a = /* @__PURE__ */ U(!1), h = /* @__PURE__ */ U(null), c = /* @__PURE__ */ U({
    name: "",
    inputJson: `{
  
}`,
    assertionType: "exact_match",
    assertionKey: "",
    assertionExpected: "",
    assertionThreshold: 0.8
  });
  async function f() {
    if (t()) {
      k(s, !0), k(h, null);
      try {
        const M = await fetch(`/api/v1/agents/${t()}/test-cases`);
        if (!M.ok) throw new Error(`${M.status}`);
        const Q = await M.json();
        k(o, Q.testCases ?? []);
      } catch (M) {
        k(h, M.message);
      } finally {
        k(s, !1);
      }
    }
  }
  async function d() {
    k(r, !0), k(l, null), k(h, null);
    try {
      const M = await fetch(`/api/v1/agents/${t()}/test-cases/run`, { method: "POST" });
      if (!M.ok) throw new Error(`${M.status}`);
      k(l, await M.json()), await f();
    } catch (M) {
      k(h, M.message);
    } finally {
      k(r, !1);
    }
  }
  async function p() {
    try {
      const M = {
        type: u(c).assertionType,
        key: u(c).assertionKey
      };
      if (u(c).assertionType === "exact_match")
        try {
          M.expected = JSON.parse(u(c).assertionExpected);
        } catch {
          M.expected = u(c).assertionExpected;
        }
      else u(c).assertionType === "evaluate_score" && (M.threshold = u(c).assertionThreshold);
      const Q = await fetch(`/api/v1/agents/${t()}/test-cases`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: u(c).name,
          inputJson: u(c).inputJson,
          assertionsJson: JSON.stringify([M])
        })
      });
      if (!Q.ok) throw new Error(`${Q.status}`);
      k(a, !1), k(c, {
        name: "",
        inputJson: `{
  
}`,
        assertionType: "exact_match",
        assertionKey: "",
        assertionExpected: "",
        assertionThreshold: 0.8
      }), await f();
    } catch (M) {
      k(h, M.message);
    }
  }
  async function O(M) {
    try {
      await fetch(`/api/v1/agents/${t()}/test-cases/${M}`, { method: "DELETE" }), await f();
    } catch {
    }
  }
  function g(M) {
    return `${M.passed}/${M.total}`;
  }
  lt(() => (u(i), u(o), u(s)), () => {
    u(i) && u(o).length === 0 && !u(s) && f();
  }), en(), Tt();
  var m = TQ(), v = Ve(m), x = y(v), S = w(y(x), 2);
  {
    var _ = (M) => {
      var Q = mQ(), T = y(Q);
      F(() => V(T, (u(o), b(() => u(o).length)))), A(M, Q);
    };
    ee(S, (M) => {
      u(o), b(() => u(o).length > 0) && M(_);
    });
  }
  var C = w(S, 2), R = y(C), X = w(x, 2);
  {
    var H = (M) => {
      var Q = kQ(), T = y(Q);
      {
        var E = (ae) => {
          var ve = vQ();
          let fe;
          var ce = y(ve), ue = w(ce);
          {
            var ye = (Ze) => {
              var Y = wm();
              F(() => V(Y, `— ${u(l), b(() => u(l).failed) ?? ""} failed`)), A(Ze, Y);
            };
            ee(ue, (Ze) => {
              u(l), b(() => u(l).failed > 0) && Ze(ye);
            });
          }
          F(
            (Ze) => {
              fe = bi(ve, 1, "suite-summary svelte-1bw2oss", null, fe, {
                passed: u(l).failed === 0,
                failed: u(l).failed > 0
              }), V(ce, `Suite: ${Ze ?? ""} passed `);
            },
            [
              () => (u(l), b(() => g(u(l))))
            ]
          ), A(ae, ve);
        };
        ee(T, (ae) => {
          u(l) && ae(E);
        });
      }
      var Z = w(T, 2);
      {
        var P = (ae) => {
          var ve = bQ();
          A(ae, ve);
        }, N = (ae) => {
          var ve = yQ(), fe = y(ve);
          F(() => V(fe, u(h))), A(ae, ve);
        }, oe = (ae) => {
          var ve = wQ();
          A(ae, ve);
        }, q = (ae) => {
          var ve = QQ();
          Ue(ve, 5, () => u(o), Ge, (fe, ce) => {
            const ue = /* @__PURE__ */ mt(() => (u(l), u(ce), b(() => {
              var $e, re;
              return (re = ($e = u(l)) == null ? void 0 : $e.results) == null ? void 0 : re.find((pe) => pe.id === u(ce).id);
            })));
            var ye = SQ(), Ze = y(ye);
            let Y;
            var I = w(Ze, 2), ne = y(I), de = w(I, 2), Qe = y(de), tt = w(de, 2);
            {
              var He = ($e) => {
                var re = xQ();
                A($e, re);
              };
              ee(tt, ($e) => {
                u(r) && $e(He);
              });
            }
            var ke = w(tt, 2);
            F(() => {
              var $e, re, pe, we;
              Y = bi(Ze, 1, "status-dot svelte-1bw2oss", null, Y, {
                pass: (($e = u(ue)) == null ? void 0 : $e.passed) === !0 || ((re = u(ce).lastResult) == null ? void 0 : re.passed) === !0,
                fail: ((pe = u(ue)) == null ? void 0 : pe.passed) === !1 || ((we = u(ce).lastResult) == null ? void 0 : we.passed) === !1
              }), V(ne, (u(ce), b(() => u(ce).name))), V(Qe, `${u(ce), b(() => (u(ce).assertions ?? []).length) ?? ""} assertions`);
            }), ie("click", ke, () => O(u(ce).id)), A(fe, ye);
          }), A(ae, ve);
        };
        ee(Z, (ae) => {
          u(s) ? ae(P) : u(h) ? ae(N, 1) : (u(o), b(() => u(o).length === 0) ? ae(oe, 2) : ae(q, -1));
        });
      }
      var G = w(Z, 2), z = y(G), K = w(z, 2), le = y(K);
      F(() => {
        K.disabled = (u(r), u(o), b(() => u(r) || u(o).length === 0)), V(le, u(r) ? "Running…" : "Run Suite");
      }), ie("click", z, () => k(a, !0)), ie("click", K, d), A(M, Q);
    };
    ee(X, (M) => {
      u(i) && M(H);
    });
  }
  var D = w(v, 2);
  {
    var j = (M) => {
      var Q = _Q(), T = y(Q), E = w(y(T), 2), Z = w(y(E)), P = w(E, 2), N = w(y(P));
      Fe(N, "rows", 5);
      var oe = w(P, 2), q = w(y(oe), 2), G = y(q), z = y(G);
      z.value = z.__value = "exact_match";
      var K = w(z);
      K.value = K.__value = "schema";
      var le = w(K);
      le.value = le.__value = "evaluate_score";
      var ae = w(G, 2), ve = w(q, 2);
      {
        var fe = (Y) => {
          var I = $Q();
          Bt(I, () => u(c).assertionExpected, (ne) => wn(c, u(c).assertionExpected = ne)), A(Y, I);
        }, ce = (Y) => {
          var I = PQ(), ne = w(y(I));
          Bt(ne, () => u(c).assertionThreshold, (de) => wn(c, u(c).assertionThreshold = de)), A(Y, I);
        };
        ee(ve, (Y) => {
          u(c), b(() => u(c).assertionType === "exact_match") ? Y(fe) : (u(c), b(() => u(c).assertionType === "evaluate_score") && Y(ce, 1));
        });
      }
      var ue = w(oe, 2), ye = y(ue), Ze = w(ye, 2);
      F(() => Ze.disabled = (u(c), b(() => !u(c).name))), Bt(Z, () => u(c).name, (Y) => wn(c, u(c).name = Y)), Bt(N, () => u(c).inputJson, (Y) => wn(c, u(c).inputJson = Y)), qa(G, () => u(c).assertionType, (Y) => wn(c, u(c).assertionType = Y)), Bt(ae, () => u(c).assertionKey, (Y) => wn(c, u(c).assertionKey = Y)), ie("click", ye, () => k(a, !1)), ie("click", Ze, p), ie("click", Q, Ba(() => k(a, !1))), A(M, Q);
    };
    ee(D, (M) => {
      u(a) && M(j);
    });
  }
  F(() => V(R, u(i) ? "▼" : "▶")), ie("click", x, () => {
    k(i, !u(i));
  }), A(n, m), $t();
}
var CQ = /* @__PURE__ */ L('<div class="studio svelte-13r820j"><aside><!></aside> <main class="canvas-area svelte-13r820j"><!> <!></main> <aside class="panel svelte-13r820j"><!> <!> <!> <!> <!> <!> <!> <!></aside></div>');
function AQ(n, e) {
  kt(e, !1);
  const t = () => St(Mn, "$selectedNode", i), [i, s] = gn();
  let r = ft(e, "agentId", 8), o = /* @__PURE__ */ U(!1), l = /* @__PURE__ */ U(""), a = /* @__PURE__ */ U(null), h = /* @__PURE__ */ U(null);
  ms(async () => {
    if (r()) {
      try {
        const [P, N, oe] = await Promise.all([
          fetch(`/api/agents/${r()}`),
          fetch(`/api/agents/${r()}/versions`),
          fetch(`/api/agents/${r()}/config`)
        ]);
        let q = null;
        if (P.ok && (q = await P.json(), Io.set(q), k(o, (q == null ? void 0 : q.authoringMode) === "code-defined"), k(l, (q == null ? void 0 : q.handle) ?? ""), u(o) && k(a, (q == null ? void 0 : q.updatedAt) ?? null)), (q == null ? void 0 : q.status) === "draft" && q.draftGraphJson)
          Et.set(JSON.parse(q.draftGraphJson));
        else if (N.ok) {
          const G = await N.json();
          if (G.length > 0) {
            const z = G[G.length - 1];
            Et.set(JSON.parse(z.graphJson ?? "{}"));
          }
        }
        if (oe.ok) {
          const z = (await oe.json()).triggerConfig ?? {};
          ws.set({
            triggerType: z.type ?? "rest",
            description: "",
            cronExpression: z.expression ?? "",
            webhookUrl: z.webhookUrl ?? ""
          });
        }
      } catch {
      }
      window.addEventListener("caal:canvas-highlight", c), window.addEventListener("caal:canvas-focus", f), window.addEventListener("caal:apply-proposal", d);
    }
  });
  function c(P) {
    const N = P.detail;
    window.dispatchEvent(new CustomEvent("canvas:highlight", { detail: N }));
  }
  function f(P) {
    const N = P.detail;
    window.dispatchEvent(new CustomEvent("canvas:focus", { detail: N }));
  }
  function d(P) {
    const N = P.detail;
    Et.update((oe) => {
      const q = structuredClone(oe);
      for (const G of N.patches)
        if (G.op === "add_node" && G.data) {
          const z = G.data;
          q.nodes[z.id] = z;
        } else if (G.op === "update_node" && G.target && G.data) {
          const z = q.nodes[G.target];
          z && (q.nodes[G.target] = { ...z, ...G.data });
        } else G.op === "delete_node" && G.target ? delete q.nodes[G.target] : G.op === "add_edge" && G.data ? q.edges = [...q.edges ?? [], G.data] : G.op === "add_tool_edge" && G.data && (q.toolEdges = [...q.toolEdges ?? [], G.data]);
      return q;
    });
  }
  Tt();
  var p = CQ(), O = y(p);
  let g;
  var m = y(O);
  iv(m, {
    get readonly() {
      return u(o);
    }
  });
  var v = w(O, 2), x = y(v);
  {
    var S = (P) => {
      VS(P, {
        get handle() {
          return u(l);
        },
        get lastSyncAt() {
          return u(a);
        }
      });
    };
    ee(x, (P) => {
      u(o) && P(S);
    });
  }
  var _ = w(x, 2);
  Hm(_, {
    get agentId() {
      return r();
    },
    get readonly() {
      return u(o);
    }
  });
  var C = w(v, 2), R = y(C);
  {
    var X = (P) => {
      $x(P, {
        get node() {
          return t();
        },
        get readonly() {
          return u(o);
        }
      });
    }, H = (P) => {
      qx(P, {
        get agentId() {
          return r();
        },
        get readonly() {
          return u(o);
        }
      });
    };
    ee(R, (P) => {
      t() ? P(X) : P(H, -1);
    });
  }
  var D = w(R, 2);
  uS(D, {});
  var j = w(D, 2);
  SS(j, {});
  var M = w(j, 2);
  sS(M, {
    get agentId() {
      return r();
    },
    $$events: { sessionId: (P) => k(h, P.detail) }
  });
  var Q = w(M, 2);
  tQ(Q, {
    get agentId() {
      return r();
    },
    get sessionId() {
      return u(h);
    }
  });
  var T = w(Q, 2);
  gQ(T, {
    get agentId() {
      return r();
    }
  });
  var E = w(T, 2);
  ZQ(E, {
    get agentId() {
      return r();
    }
  });
  var Z = w(E, 2);
  YS(Z, {
    get agentId() {
      return r();
    }
  }), F(() => g = bi(O, 1, "palette svelte-13r820j", null, g, { readonly: u(o) })), A(n, p), $t(), s();
}
const ka = document.getElementById("canvas-mount");
if (ka) {
  const n = ka.getAttribute("data-agent-id") ?? "";
  Qm(AQ, { target: ka, props: { agentId: n } });
}
