var bm = Object.defineProperty;
var vf = (i) => {
  throw TypeError(i);
};
var ym = (i, e, t) => e in i ? bm(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var Dt = (i, e, t) => ym(i, typeof e != "symbol" ? e + "" : e, t), ua = (i, e, t) => e.has(i) || vf("Cannot " + t);
var _ = (i, e, t) => (ua(i, e, "read from private field"), t ? t.call(i) : e.get(i)), xe = (i, e, t) => e.has(i) ? vf("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), we = (i, e, t, n) => (ua(i, e, "write to private field"), n ? n.call(i, t) : e.set(i, t), t), Ce = (i, e, t) => (ua(i, e, "access private method"), t);
var yd;
typeof window < "u" && ((yd = window.__svelte ?? (window.__svelte = {})).v ?? (yd.v = /* @__PURE__ */ new Set())).add("5");
let fr = !1, wm = !1;
function xm() {
  fr = !0;
}
xm();
const Sm = 1, km = 2, Sd = 4, Qm = 8, $m = 16, _m = 1, Pm = 2, Tm = 4, Zm = 8, Cm = 16, kd = 1, Em = 2, gt = Symbol("uninitialized"), Qd = "http://www.w3.org/1999/xhtml", $d = !1;
var Il = Array.isArray, Am = Array.prototype.indexOf, is = Array.prototype.includes, Dl = Array.from, _d = Object.defineProperty, As = Object.getOwnPropertyDescriptor, Pd = Object.getOwnPropertyDescriptors, Rm = Object.prototype, Mm = Array.prototype, cc = Object.getPrototypeOf, bf = Object.isExtensible;
const ns = () => {
};
function Xm(i) {
  return i();
}
function eh(i) {
  for (var e = 0; e < i.length; e++)
    i[e]();
}
function Td() {
  var i, e, t = new Promise((n, s) => {
    i = n, e = s;
  });
  return { promise: t, resolve: i, reject: e };
}
function jm(i, e) {
  if (Array.isArray(i))
    return i;
  if (!(Symbol.iterator in i))
    return Array.from(i);
  const t = [];
  for (const n of i)
    if (t.push(n), t.length === e) break;
  return t;
}
const Pt = 2, Gs = 4, uo = 8, Zd = 1 << 24, Ti = 16, Ei = 32, Mn = 64, th = 128, mi = 512, dt = 1024, xt = 2048, Ai = 4096, jt = 8192, vi = 16384, vs = 32768, ih = 1 << 25, Us = 65536, rl = 1 << 17, Lm = 1 << 18, ur = 1 << 19, Cd = 1 << 20, Vi = 1 << 25, cs = 65536, ol = 1 << 21, Rs = 1 << 22, An = 1 << 23, un = Symbol("$state"), Im = Symbol("legacy props"), Dm = Symbol(""), Vo = Symbol("attributes"), nh = Symbol("class"), sh = Symbol("style"), $r = Symbol("text"), Bo = Symbol("form reset"), zl = new class extends Error {
  constructor() {
    super(...arguments);
    Dt(this, "name", "StaleReactionError");
    Dt(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var wd;
const zm = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((wd = globalThis.document) != null && wd.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function fc(i) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function Nm() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Ym(i, e, t) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function Wm(i) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function qm() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Vm(i) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Bm() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Gm(i) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function Um() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Fm() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Hm() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Km() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function Jm() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function ev() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function tv() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Ed(i) {
  return i === this.v;
}
function uc(i, e) {
  return i != i ? e == e : i !== e || i !== null && typeof i == "object" || typeof i == "function";
}
function Ad(i) {
  return !uc(i, this.v);
}
let He = null;
function Fs(i) {
  He = i;
}
function St(i, e = !1, t) {
  He = {
    p: He,
    i: !1,
    c: null,
    e: null,
    s: i,
    x: null,
    r: (
      /** @type {Effect} */
      ke
    ),
    l: fr && !e ? { s: null, u: null, $: [] } : null
  };
}
function kt(i) {
  var e = (
    /** @type {ComponentContext} */
    He
  ), t = e.e;
  if (t !== null) {
    e.e = null;
    for (var n of t)
      tp(n);
  }
  return e.i = !0, He = e.p, /** @type {T} */
  {};
}
function po() {
  return !fr || He !== null && He.l === null;
}
let Bn = [];
function Rd() {
  var i = Bn;
  Bn = [], eh(i);
}
function Rn(i) {
  if (Bn.length === 0 && !Xr) {
    var e = Bn;
    queueMicrotask(() => {
      e === Bn && Rd();
    });
  }
  Bn.push(i);
}
function iv() {
  for (; Bn.length > 0; )
    Rd();
}
function Md(i) {
  var e = ke;
  if (e === null)
    return $e.f |= An, i;
  if ((e.f & vs) === 0 && (e.f & Gs) === 0)
    throw i;
  Cn(i, e);
}
function Cn(i, e) {
  for (; e !== null; ) {
    if ((e.f & th) !== 0) {
      if ((e.f & vs) === 0)
        throw i;
      try {
        e.b.error(i);
        return;
      } catch (t) {
        i = t;
      }
    }
    e = e.parent;
  }
  throw i;
}
const nv = -7169;
function st(i, e) {
  i.f = i.f & nv | e;
}
function dc(i) {
  (i.f & mi) !== 0 || i.deps === null ? st(i, dt) : st(i, Ai);
}
function Xd(i) {
  if (i !== null)
    for (const e of i)
      (e.f & Pt) === 0 || (e.f & cs) === 0 || (e.f ^= cs, Xd(
        /** @type {Derived} */
        e.deps
      ));
}
function jd(i, e, t) {
  (i.f & xt) !== 0 ? e.add(i) : (i.f & Ai) !== 0 && t.add(i), Xd(i.deps), st(i, dt);
}
function Ld(i, e, t) {
  if (i == null)
    return e(void 0), ns;
  const n = b(
    () => i.subscribe(
      e,
      // @ts-expect-error
      t
    )
  );
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
const Ss = [];
function zn(i, e = ns) {
  let t = null;
  const n = /* @__PURE__ */ new Set();
  function s(l) {
    if (uc(i, l) && (i = l, t)) {
      const a = !Ss.length;
      for (const h of n)
        h[1](), Ss.push(h, i);
      if (a) {
        for (let h = 0; h < Ss.length; h += 2)
          Ss[h][0](Ss[h + 1]);
        Ss.length = 0;
      }
    }
  }
  function r(l) {
    s(l(
      /** @type {T} */
      i
    ));
  }
  function o(l, a = ns) {
    const h = [l, a];
    return n.add(h), n.size === 1 && (t = e(s, r) || ns), l(
      /** @type {T} */
      i
    ), () => {
      n.delete(h), n.size === 0 && t && (t(), t = null);
    };
  }
  return { set: s, update: r, subscribe: o };
}
function Id(i) {
  let e;
  return Ld(i, (t) => e = t)(), e;
}
let rh = !1, ko = !1, oh = Symbol("unmounted");
function vt(i, e, t) {
  const n = t[e] ?? (t[e] = {
    store: null,
    source: /* @__PURE__ */ K(void 0),
    unsubscribe: ns
  });
  if (n.store !== i && !(oh in t))
    if (n.unsubscribe(), n.store = i ?? null, i == null)
      n.source.v = void 0, n.unsubscribe = ns;
    else {
      var s = !0;
      n.unsubscribe = Ld(i, (r) => {
        s ? n.source.v = r : k(n.source, r);
      }), s = !1;
    }
  return i && oh in t ? Id(i) : u(n.source);
}
function vn() {
  const i = {};
  function e() {
    Yl(() => {
      for (var t in i)
        i[t].unsubscribe();
      _d(i, oh, {
        enumerable: !1,
        value: !0
      });
    });
  }
  return [i, e];
}
function sv(i, e) {
  rh = !0;
  try {
    i.set(e);
  } finally {
    rh = !1;
  }
}
function da(i, e, t) {
  return sv(i, t), e;
}
function rv(i) {
  var e = ko;
  try {
    return ko = !1, [i(), ko];
  } finally {
    ko = e;
  }
}
let pa = null, ks = null, Oe = null, Mr = null, $t = null, lh = null, Xr = !1, Oa = !1, Ts = null, Go = null;
var yf = 0;
let ov = 1;
var Ns, Pn, Fn, Ys, Ws, Hn, qs, on, oo, Jt, lo, Tn, zi, Ni, Vs, Kn, Me, ah, _r, hh, Dd, zd, Uo, lv, ch, Qs;
const Xl = class Xl {
  constructor() {
    xe(this, Me);
    Dt(this, "id", ov++);
    /** True as soon as `#process` was called */
    xe(this, Ns, !1);
    Dt(this, "linked", !0);
    /** @type {Batch | null} */
    xe(this, Pn, null);
    /** @type {Batch | null} */
    xe(this, Fn, null);
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
    xe(this, Ys, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    xe(this, Ws, /* @__PURE__ */ new Set());
    /**
     * Callbacks that should run only when a fork is committed.
     * @type {Set<(batch: Batch) => void>}
     */
    xe(this, Hn, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    xe(this, qs, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    xe(this, on, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    xe(this, oo, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    xe(this, Jt, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    xe(this, lo, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    xe(this, Tn, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    xe(this, zi, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    xe(this, Ni, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    xe(this, Vs, /* @__PURE__ */ new Set());
    Dt(this, "is_fork", !1);
    xe(this, Kn, !1);
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(e) {
    _(this, Ni).has(e) || _(this, Ni).set(e, { d: [], m: [] }), _(this, Vs).delete(e);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(e, t = (n) => this.schedule(n)) {
    var n = _(this, Ni).get(e);
    if (n) {
      _(this, Ni).delete(e);
      for (var s of n.d)
        st(s, xt), t(s);
      for (s of n.m)
        st(s, Ai), t(s);
    }
    _(this, Vs).add(e);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(e, t, n = !1) {
    e.v !== gt && !this.previous.has(e) && this.previous.set(e, e.v), (e.f & An) === 0 && (this.current.set(e, [t, n]), $t == null || $t.set(e, t)), this.is_fork || (e.v = t);
  }
  activate() {
    Oe = this;
  }
  deactivate() {
    Oe = null, $t = null;
  }
  flush() {
    try {
      Oa = !0, Oe = this, Ce(this, Me, _r).call(this);
    } finally {
      yf = 0, lh = null, Ts = null, Go = null, Oa = !1, Oe = null, $t = null, ss.clear();
    }
  }
  discard() {
    for (const e of _(this, Ws)) e(this);
    _(this, Ws).clear(), _(this, Hn).clear(), Ce(this, Me, Qs).call(this);
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(e) {
    _(this, lo).push(e);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(e, t) {
    if (we(this, qs, _(this, qs) + 1), e) {
      let n = _(this, on).get(t) ?? 0;
      _(this, on).set(t, n + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(e, t) {
    if (we(this, qs, _(this, qs) - 1), e) {
      let n = _(this, on).get(t) ?? 0;
      n === 1 ? _(this, on).delete(t) : _(this, on).set(t, n - 1);
    }
    _(this, Kn) || (we(this, Kn, !0), Rn(() => {
      we(this, Kn, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(e, t) {
    for (const n of e)
      _(this, Tn).add(n);
    for (const n of t)
      _(this, zi).add(n);
    e.clear(), t.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(e) {
    _(this, Ys).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(e) {
    _(this, Ws).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  on_fork_commit(e) {
    _(this, Hn).add(e);
  }
  run_fork_commit_callbacks() {
    for (const e of _(this, Hn)) e(this);
    _(this, Hn).clear();
  }
  settled() {
    return (_(this, oo) ?? we(this, oo, Td())).promise;
  }
  static ensure() {
    var e;
    if (Oe === null) {
      const t = Oe = new Xl();
      Ce(e = t, Me, ch).call(e), !Oa && !Xr && Rn(() => {
        _(t, Ns) || t.flush();
      });
    }
    return Oe;
  }
  apply() {
    {
      $t = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(e) {
    var s;
    if (lh = e, (s = e.b) != null && s.is_pending && (e.f & (Gs | uo | Zd)) !== 0 && (e.f & vs) === 0) {
      e.b.defer_effect(e);
      return;
    }
    for (var t = e; t.parent !== null; ) {
      t = t.parent;
      var n = t.f;
      if (Ts !== null && t === ke && ($e === null || ($e.f & Pt) === 0) && !rh)
        return;
      if ((n & (Mn | Ei)) !== 0) {
        if ((n & dt) === 0)
          return;
        t.f ^= dt;
      }
    }
    _(this, Jt).push(t);
  }
};
Ns = new WeakMap(), Pn = new WeakMap(), Fn = new WeakMap(), Ys = new WeakMap(), Ws = new WeakMap(), Hn = new WeakMap(), qs = new WeakMap(), on = new WeakMap(), oo = new WeakMap(), Jt = new WeakMap(), lo = new WeakMap(), Tn = new WeakMap(), zi = new WeakMap(), Ni = new WeakMap(), Vs = new WeakMap(), Kn = new WeakMap(), Me = new WeakSet(), ah = function() {
  if (this.is_fork) return !0;
  for (const n of _(this, on).keys()) {
    for (var e = n, t = !1; e.parent !== null; ) {
      if (_(this, Ni).has(e)) {
        t = !0;
        break;
      }
      e = e.parent;
    }
    if (!t)
      return !0;
  }
  return !1;
}, _r = function() {
  var a, h, c, f;
  if (we(this, Ns, !0), yf++ > 1e3 && (Ce(this, Me, Qs).call(this), hv()), !Ce(this, Me, ah).call(this)) {
    for (const d of _(this, Tn))
      _(this, zi).delete(d), st(d, xt), this.schedule(d);
    for (const d of _(this, zi))
      st(d, Ai), this.schedule(d);
  }
  const e = _(this, Jt);
  we(this, Jt, []), this.apply();
  var t = Ts = [], n = [], s = Go = [];
  for (const d of e)
    try {
      Ce(this, Me, hh).call(this, d, t, n);
    } catch (p) {
      throw Wd(d), p;
    }
  if (Oe = null, s.length > 0) {
    var r = Xl.ensure();
    for (const d of s)
      r.schedule(d);
  }
  if (Ts = null, Go = null, Ce(this, Me, ah).call(this)) {
    Ce(this, Me, Uo).call(this, n), Ce(this, Me, Uo).call(this, t);
    for (const [d, p] of _(this, Ni))
      Yd(d, p);
    s.length > 0 && /** @type {unknown} */
    Ce(a = Oe, Me, _r).call(a);
    return;
  }
  const o = Ce(this, Me, Dd).call(this);
  if (o) {
    Ce(h = o, Me, zd).call(h, this);
    return;
  }
  _(this, Tn).clear(), _(this, zi).clear();
  for (const d of _(this, Ys)) d(this);
  _(this, Ys).clear(), Mr = this, wf(n), wf(t), Mr = null, (c = _(this, oo)) == null || c.resolve();
  var l = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    Oe
  );
  if (this.linked && _(this, qs) === 0 && Ce(this, Me, Qs).call(this), _(this, Jt).length > 0) {
    l === null && (l = this, Ce(this, Me, ch).call(this));
    const d = l;
    _(d, Jt).push(..._(this, Jt).filter((p) => !_(d, Jt).includes(p)));
  }
  l !== null && Ce(f = l, Me, _r).call(f);
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
hh = function(e, t, n) {
  e.f ^= dt;
  for (var s = e.first; s !== null; ) {
    var r = s.f, o = (r & (Ei | Mn)) !== 0, l = o && (r & dt) !== 0, a = l || (r & jt) !== 0 || _(this, Ni).has(s);
    if (!a && s.fn !== null) {
      o ? s.f ^= dt : (r & Gs) !== 0 ? t.push(s) : dr(s) && ((r & Ti) !== 0 && _(this, zi).add(s), ps(s));
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
}, Dd = function() {
  for (var e = _(this, Pn); e !== null; ) {
    if (!e.is_fork) {
      for (const [t, [, n]] of this.current)
        if (e.current.has(t) && !n)
          return e;
    }
    e = _(e, Pn);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
zd = function(e) {
  var n;
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
        if ((o & Pt) !== 0)
          t(
            /** @type {Derived} */
            a
          );
        else {
          var l = (
            /** @type {Effect} */
            a
          );
          o & (Rs | Ti) && !this.async_deriveds.has(l) && (_(this, zi).delete(l), st(l, xt), this.schedule(l));
        }
      }
  };
  for (const s of this.current.keys())
    t(s);
  this.oncommit(() => e.discard()), Ce(n = e, Me, Qs).call(n), Oe = this, Ce(this, Me, _r).call(this);
}, /**
 * @param {Effect[]} effects
 */
Uo = function(e) {
  for (var t = 0; t < e.length; t += 1)
    jd(e[t], _(this, Tn), _(this, zi));
}, lv = function() {
  var c;
  Ce(this, Me, Qs).call(this);
  for (let f = pa; f !== null; f = _(f, Fn)) {
    var e = f.id < this.id, t = [];
    for (const [d, [p, O]] of this.current) {
      if (f.current.has(d)) {
        var n = (
          /** @type {[any, boolean]} */
          f.current.get(d)[0]
        );
        if (e && p !== n)
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
    if (_(f, Ns)) {
      var s = [...f.current.keys()].filter((d) => !this.current.has(d));
      if (s.length === 0)
        e && f.discard();
      else if (t.length > 0) {
        if (e)
          for (const d of _(this, Vs))
            f.unskip_effect(d, (p) => {
              var O;
              (p.f & (Ti | Rs)) !== 0 ? f.schedule(p) : Ce(O = f, Me, Uo).call(O, [p]);
            });
        f.activate();
        var r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
        for (var l of t)
          Nd(l, s, r, o);
        o = /* @__PURE__ */ new Map();
        var a = [...f.current.keys()].filter(
          (d) => this.current.has(d) ? (
            /** @type {[any, boolean]} */
            this.current.get(d)[0] !== d.v
          ) : !0
        );
        if (a.length > 0)
          for (const d of _(this, lo))
            (d.f & (vi | jt | rl)) === 0 && pc(d, a, o) && ((d.f & (Rs | Ti)) !== 0 ? (st(d, xt), f.schedule(d)) : _(f, Tn).add(d));
        if (_(f, Jt).length > 0 && !_(f, Kn)) {
          f.apply();
          for (var h of _(f, Jt))
            Ce(c = f, Me, hh).call(c, h, [], []);
          we(f, Jt, []);
        }
        f.deactivate();
      }
    }
  }
}, ch = function() {
  ks === null ? pa = ks = this : (we(ks, Fn, this), we(this, Pn, ks)), ks = this;
}, Qs = function() {
  var e = _(this, Pn), t = _(this, Fn);
  e === null ? pa = t : we(e, Fn, t), t === null ? ks = e : we(t, Pn, e), this.linked = !1;
};
let fs = Xl;
function av(i) {
  var e = Xr;
  Xr = !0;
  try {
    for (var t; ; ) {
      if (iv(), Oe === null)
        return (
          /** @type {T} */
          t
        );
      Oe.flush();
    }
  } finally {
    Xr = e;
  }
}
function hv() {
  try {
    Bm();
  } catch (i) {
    Cn(i, lh);
  }
}
let $i = null;
function wf(i) {
  var e = i.length;
  if (e !== 0) {
    for (var t = 0; t < e; ) {
      var n = i[t++];
      if ((n.f & (vi | jt)) === 0 && dr(n) && ($i = /* @__PURE__ */ new Set(), ps(n), n.deps === null && n.first === null && n.nodes === null && n.teardown === null && n.ac === null && np(n), ($i == null ? void 0 : $i.size) > 0)) {
        ss.clear();
        for (const s of $i) {
          if ((s.f & (vi | jt)) !== 0) continue;
          const r = [s];
          let o = s.parent;
          for (; o !== null; )
            $i.has(o) && ($i.delete(o), r.push(o)), o = o.parent;
          for (let l = r.length - 1; l >= 0; l--) {
            const a = r[l];
            (a.f & (vi | jt)) === 0 && ps(a);
          }
        }
        $i.clear();
      }
    }
    $i = null;
  }
}
function Nd(i, e, t, n) {
  if (!t.has(i) && (t.add(i), i.reactions !== null))
    for (const s of i.reactions) {
      const r = s.f;
      (r & Pt) !== 0 ? Nd(
        /** @type {Derived} */
        s,
        e,
        t,
        n
      ) : (r & (Rs | Ti)) !== 0 && (r & xt) === 0 && pc(s, e, n) && (st(s, xt), Oc(
        /** @type {Effect} */
        s
      ));
    }
}
function pc(i, e, t) {
  const n = t.get(i);
  if (n !== void 0) return n;
  if (i.deps !== null)
    for (const s of i.deps) {
      if (is.call(e, s))
        return !0;
      if ((s.f & Pt) !== 0 && pc(
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
  return t.set(i, !1), !1;
}
function Oc(i) {
  Oe.schedule(i);
}
function Yd(i, e) {
  if (!((i.f & Ei) !== 0 && (i.f & dt) !== 0)) {
    (i.f & xt) !== 0 ? e.d.push(i) : (i.f & Ai) !== 0 && e.m.push(i), st(i, dt);
    for (var t = i.first; t !== null; )
      Yd(t, e), t = t.next;
  }
}
function Wd(i) {
  st(i, dt);
  for (var e = i.first; e !== null; )
    Wd(e), e = e.next;
}
function cv(i) {
  let e = 0, t = ds(0), n;
  return () => {
    vc() && (u(t), bs(() => (e === 0 && (n = b(() => i(() => jr(t)))), e += 1, () => {
      Rn(() => {
        e -= 1, e === 0 && (n == null || n(), n = void 0, jr(t));
      });
    })));
  };
}
var fv = Us | ur;
function uv(i, e, t, n) {
  new dv(i, e, t, n);
}
var hi, hc, ci, Jn, Nt, fi, Rt, ei, ln, es, Zn, Bs, ao, ho, an, jl, ht, pv, Ov, gv, fh, Fo, Ho, uh, dh;
class dv {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(e, t, n, s) {
    xe(this, ht);
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
    xe(this, hi);
    /** @type {TemplateNode | null} */
    xe(this, hc, null);
    /** @type {BoundaryProps} */
    xe(this, ci);
    /** @type {((anchor: Node) => void)} */
    xe(this, Jn);
    /** @type {Effect} */
    xe(this, Nt);
    /** @type {Effect | null} */
    xe(this, fi, null);
    /** @type {Effect | null} */
    xe(this, Rt, null);
    /** @type {Effect | null} */
    xe(this, ei, null);
    /** @type {DocumentFragment | null} */
    xe(this, ln, null);
    xe(this, es, 0);
    xe(this, Zn, 0);
    xe(this, Bs, !1);
    /** @type {Set<Effect>} */
    xe(this, ao, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    xe(this, ho, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    xe(this, an, null);
    xe(this, jl, cv(() => (we(this, an, ds(_(this, es))), () => {
      we(this, an, null);
    })));
    var r;
    we(this, hi, e), we(this, ci, t), we(this, Jn, (o) => {
      var l = (
        /** @type {Effect} */
        ke
      );
      l.b = this, l.f |= th, n(o);
    }), this.parent = /** @type {Effect} */
    ke.b, this.transform_error = s ?? ((r = this.parent) == null ? void 0 : r.transform_error) ?? ((o) => o), we(this, Nt, bc(() => {
      Ce(this, ht, fh).call(this);
    }, fv));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(e) {
    jd(e, _(this, ao), _(this, ho));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!_(this, ci).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(e, t) {
    Ce(this, ht, uh).call(this, e, t), we(this, es, _(this, es) + e), !(!_(this, an) || _(this, Bs)) && (we(this, Bs, !0), Rn(() => {
      we(this, Bs, !1), _(this, an) && Ks(_(this, an), _(this, es));
    }));
  }
  get_effect_pending() {
    return _(this, jl).call(this), u(
      /** @type {Source<number>} */
      _(this, an)
    );
  }
  /** @param {unknown} error */
  error(e) {
    if (!_(this, ci).onerror && !_(this, ci).failed)
      throw e;
    Oe != null && Oe.is_fork ? (_(this, fi) && Oe.skip_effect(_(this, fi)), _(this, Rt) && Oe.skip_effect(_(this, Rt)), _(this, ei) && Oe.skip_effect(_(this, ei)), Oe.on_fork_commit(() => {
      Ce(this, ht, dh).call(this, e);
    })) : Ce(this, ht, dh).call(this, e);
  }
}
hi = new WeakMap(), hc = new WeakMap(), ci = new WeakMap(), Jn = new WeakMap(), Nt = new WeakMap(), fi = new WeakMap(), Rt = new WeakMap(), ei = new WeakMap(), ln = new WeakMap(), es = new WeakMap(), Zn = new WeakMap(), Bs = new WeakMap(), ao = new WeakMap(), ho = new WeakMap(), an = new WeakMap(), jl = new WeakMap(), ht = new WeakSet(), pv = function() {
  try {
    we(this, fi, ui(() => _(this, Jn).call(this, _(this, hi))));
  } catch (e) {
    this.error(e);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
Ov = function(e) {
  const t = _(this, ci).failed;
  t && we(this, ei, ui(() => {
    t(
      _(this, hi),
      () => e,
      () => () => {
      }
    );
  }));
}, gv = function() {
  const e = _(this, ci).pending;
  e && (this.is_pending = !0, we(this, Rt, ui(() => e(_(this, hi)))), Rn(() => {
    var t = we(this, ln, document.createDocumentFragment()), n = dn();
    t.append(n), we(this, fi, Ce(this, ht, Ho).call(this, () => ui(() => _(this, Jn).call(this, n)))), _(this, Zn) === 0 && (_(this, hi).before(t), we(this, ln, null), rs(
      /** @type {Effect} */
      _(this, Rt),
      () => {
        we(this, Rt, null);
      }
    ), Ce(this, ht, Fo).call(
      this,
      /** @type {Batch} */
      Oe
    ));
  }));
}, fh = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), we(this, Zn, 0), we(this, es, 0), we(this, fi, ui(() => {
      _(this, Jn).call(this, _(this, hi));
    })), _(this, Zn) > 0) {
      var e = we(this, ln, document.createDocumentFragment());
      xc(_(this, fi), e);
      const t = (
        /** @type {(anchor: Node) => void} */
        _(this, ci).pending
      );
      we(this, Rt, ui(() => t(_(this, hi))));
    } else
      Ce(this, ht, Fo).call(
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
Fo = function(e) {
  this.is_pending = !1, e.transfer_effects(_(this, ao), _(this, ho));
}, /**
 * @template T
 * @param {() => T} fn
 */
Ho = function(e) {
  var t = ke, n = $e, s = He;
  xi(_(this, Nt)), wi(_(this, Nt)), Fs(_(this, Nt).ctx);
  try {
    return fs.ensure(), e();
  } catch (r) {
    return Md(r), null;
  } finally {
    xi(t), wi(n), Fs(s);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
uh = function(e, t) {
  var n;
  if (!this.has_pending_snippet()) {
    this.parent && Ce(n = this.parent, ht, uh).call(n, e, t);
    return;
  }
  we(this, Zn, _(this, Zn) + e), _(this, Zn) === 0 && (Ce(this, ht, Fo).call(this, t), _(this, Rt) && rs(_(this, Rt), () => {
    we(this, Rt, null);
  }), _(this, ln) && (_(this, hi).before(_(this, ln)), we(this, ln, null)));
}, /**
 * @param {unknown} error
 */
dh = function(e) {
  _(this, fi) && (Gt(_(this, fi)), we(this, fi, null)), _(this, Rt) && (Gt(_(this, Rt)), we(this, Rt, null)), _(this, ei) && (Gt(_(this, ei)), we(this, ei, null));
  var t = _(this, ci).onerror;
  let n = _(this, ci).failed;
  var s = !1, r = !1;
  const o = () => {
    if (s) {
      tv();
      return;
    }
    s = !0, r && Km(), _(this, ei) !== null && rs(_(this, ei), () => {
      we(this, ei, null);
    }), Ce(this, ht, Ho).call(this, () => {
      Ce(this, ht, fh).call(this);
    });
  }, l = (a) => {
    try {
      r = !0, t == null || t(a, o), r = !1;
    } catch (h) {
      Cn(h, _(this, Nt) && _(this, Nt).parent);
    }
    n && we(this, ei, Ce(this, ht, Ho).call(this, () => {
      try {
        return ui(() => {
          var h = (
            /** @type {Effect} */
            ke
          );
          h.b = this, h.f |= th, n(
            _(this, hi),
            () => a,
            () => o
          );
        });
      } catch (h) {
        return Cn(
          h,
          /** @type {Effect} */
          _(this, Nt).parent
        ), null;
      }
    }));
  };
  Rn(() => {
    var a;
    try {
      a = this.transform_error(e);
    } catch (h) {
      Cn(h, _(this, Nt) && _(this, Nt).parent);
      return;
    }
    a !== null && typeof a == "object" && typeof /** @type {any} */
    a.then == "function" ? a.then(
      l,
      /** @param {unknown} e */
      (h) => Cn(h, _(this, Nt) && _(this, Nt).parent)
    ) : l(a);
  });
};
function mv(i, e, t, n) {
  const s = po() ? Hs : yt;
  var r = i.filter((d) => !d.settled);
  if (t.length === 0 && r.length === 0) {
    n(e.map(s));
    return;
  }
  var o = (
    /** @type {Effect} */
    ke
  ), l = vv(), a = r.length === 1 ? r[0].promise : r.length > 1 ? Promise.all(r.map((d) => d.promise)) : null;
  function h(d) {
    if ((o.f & vi) === 0) {
      l();
      try {
        n(d);
      } catch (p) {
        Cn(p, o);
      }
      ll();
    }
  }
  var c = qd();
  if (t.length === 0) {
    a.then(() => h(e.map(s))).finally(c);
    return;
  }
  function f() {
    Promise.all(t.map((d) => /* @__PURE__ */ bv(d))).then((d) => h([...e.map(s), ...d])).catch((d) => Cn(d, o)).finally(c);
  }
  a ? a.then(() => {
    l(), f(), ll();
  }) : f();
}
function vv() {
  var i = (
    /** @type {Effect} */
    ke
  ), e = $e, t = He, n = (
    /** @type {Batch} */
    Oe
  );
  return function(r = !0) {
    xi(i), wi(e), Fs(t), r && (i.f & vi) === 0 && (n == null || n.activate(), n == null || n.apply());
  };
}
function ll(i = !0) {
  xi(null), wi(null), Fs(null), i && (Oe == null || Oe.deactivate());
}
function qd() {
  var i = (
    /** @type {Effect} */
    ke
  ), e = (
    /** @type {Boundary} */
    i.b
  ), t = (
    /** @type {Batch} */
    Oe
  ), n = e.is_rendered();
  return e.update_pending_count(1, t), t.increment(n, i), () => {
    e.update_pending_count(-1, t), t.decrement(n, i);
  };
}
// @__NO_SIDE_EFFECTS__
function Hs(i) {
  var e = Pt | xt;
  return ke !== null && (ke.f |= ur), {
    ctx: He,
    deps: null,
    effects: null,
    equals: Ed,
    f: e,
    fn: i,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      gt
    ),
    wv: 0,
    parent: ke,
    ac: null
  };
}
const Qo = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function bv(i, e, t) {
  let n = (
    /** @type {Effect | null} */
    ke
  );
  n === null && Nm();
  var s = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), r = ds(
    /** @type {V} */
    gt
  ), o = !$e, l = /* @__PURE__ */ new Set();
  return Cv(() => {
    var p;
    var a = (
      /** @type {Effect} */
      ke
    ), h = Td();
    s = h.promise;
    try {
      Promise.resolve(i()).then(h.resolve, (O) => {
        O !== zl && h.reject(O);
      }).finally(ll);
    } catch (O) {
      h.reject(O), ll();
    }
    var c = (
      /** @type {Batch} */
      Oe
    );
    if (o) {
      if ((a.f & vs) !== 0)
        var f = qd();
      if (
        /** @type {Boundary} */
        n.b.is_rendered()
      )
        (p = c.async_deriveds.get(a)) == null || p.reject(Qo);
      else
        for (const O of l.values())
          O.reject(Qo);
      l.add(h), c.async_deriveds.set(a, h);
    }
    const d = (O, g = void 0) => {
      f == null || f(), l.delete(h), g !== Qo && (c.activate(), g ? (r.f |= An, Ks(r, g)) : ((r.f & An) !== 0 && (r.f ^= An), Ks(r, O)), c.deactivate());
    };
    h.promise.then(d, (O) => d(null, O || "unknown"));
  }), Yl(() => {
    for (const a of l)
      a.reject(Qo);
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
function us(i) {
  const e = /* @__PURE__ */ Hs(i);
  return op(e), e;
}
// @__NO_SIDE_EFFECTS__
function yt(i) {
  const e = /* @__PURE__ */ Hs(i);
  return e.equals = Ad, e;
}
function yv(i) {
  var e = i.effects;
  if (e !== null) {
    i.effects = null;
    for (var t = 0; t < e.length; t += 1)
      Gt(
        /** @type {Effect} */
        e[t]
      );
  }
}
function gc(i) {
  var e, t = ke, n = i.parent;
  if (!On && n !== null && i.v !== gt && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (n.f & (vi | jt)) !== 0)
    return Jm(), i.v;
  xi(n);
  try {
    i.f &= ~cs, yv(i), e = cp(i);
  } finally {
    xi(t);
  }
  return e;
}
function Vd(i) {
  var e = gc(i);
  if (!i.equals(e) && (i.wv = ap(), (!(Oe != null && Oe.is_fork) || i.deps === null) && (Oe !== null ? (Oe.capture(i, e, !0), Mr == null || Mr.capture(i, e, !0)) : i.v = e, i.deps === null))) {
    st(i, dt);
    return;
  }
  On || ($t !== null ? (vc() || Oe != null && Oe.is_fork) && $t.set(i, e) : dc(i));
}
function wv(i) {
  var e, t;
  if (i.effects !== null)
    for (const n of i.effects)
      (n.teardown || n.ac) && ((e = n.teardown) == null || e.call(n), (t = n.ac) == null || t.abort(zl), n.fn !== null && (n.teardown = ns), n.ac = null, Br(n, 0), yc(n));
}
function Bd(i) {
  if (i.effects !== null)
    for (const e of i.effects)
      e.teardown && e.fn !== null && ps(e);
}
let al = /* @__PURE__ */ new Set();
const ss = /* @__PURE__ */ new Map();
let Gd = !1;
function ds(i, e) {
  var t = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: i,
    reactions: null,
    equals: Ed,
    rv: 0,
    wv: 0
  };
  return t;
}
// @__NO_SIDE_EFFECTS__
function wn(i, e) {
  const t = ds(i);
  return op(t), t;
}
// @__NO_SIDE_EFFECTS__
function K(i, e = !1, t = !0) {
  var s;
  const n = ds(i);
  return e || (n.equals = Ad), fr && t && He !== null && He.l !== null && ((s = He.l).s ?? (s.s = [])).push(n), n;
}
function Sn(i, e) {
  return k(
    i,
    b(() => u(i))
  ), e;
}
function k(i, e, t = !1) {
  $e !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Zi || ($e.f & rl) !== 0) && po() && ($e.f & (Pt | Ti | Rs | rl)) !== 0 && (bi === null || !is.call(bi, i)) && Hm();
  let n = t ? Zs(e) : e;
  return Ks(i, n, Go);
}
function Ks(i, e, t = null) {
  if (!i.equals(e)) {
    ss.set(i, On ? e : i.v);
    var n = fs.ensure();
    if (n.capture(i, e), (i.f & Pt) !== 0) {
      const s = (
        /** @type {Derived} */
        i
      );
      (i.f & xt) !== 0 && gc(s), $t === null && dc(s);
    }
    i.wv = ap(), Ud(i, xt, t), po() && ke !== null && (ke.f & dt) !== 0 && (ke.f & (Ei | Mn)) === 0 && (ai === null ? Rv([i]) : ai.push(i)), !n.is_fork && al.size > 0 && !Gd && xv();
  }
  return e;
}
function xv() {
  Gd = !1;
  for (const i of al) {
    (i.f & dt) !== 0 && st(i, Ai);
    let e;
    try {
      e = dr(i);
    } catch {
      e = !0;
    }
    e && ps(i);
  }
  al.clear();
}
function jr(i) {
  k(i, i.v + 1);
}
function Ud(i, e, t) {
  var n = i.reactions;
  if (n !== null)
    for (var s = po(), r = n.length, o = 0; o < r; o++) {
      var l = n[o], a = l.f;
      if (!(!s && l === ke)) {
        var h = (a & xt) === 0;
        if (h && st(l, e), (a & rl) !== 0)
          al.add(
            /** @type {Effect} */
            l
          );
        else if ((a & Pt) !== 0) {
          var c = (
            /** @type {Derived} */
            l
          );
          $t == null || $t.delete(c), (a & cs) === 0 && (a & mi && (ke === null || (ke.f & ol) === 0) && (l.f |= cs), Ud(c, Ai, t));
        } else if (h) {
          var f = (
            /** @type {Effect} */
            l
          );
          (a & Ti) !== 0 && $i !== null && $i.add(f), t !== null ? t.push(f) : Oc(f);
        }
      }
    }
}
function Zs(i) {
  if (typeof i != "object" || i === null || un in i)
    return i;
  const e = cc(i);
  if (e !== Rm && e !== Mm)
    return i;
  var t = /* @__PURE__ */ new Map(), n = Il(i), s = /* @__PURE__ */ wn(0), r = os, o = (l) => {
    if (os === r)
      return l();
    var a = $e, h = os;
    wi(null), $f(r);
    var c = l();
    return wi(a), $f(h), c;
  };
  return n && t.set("length", /* @__PURE__ */ wn(
    /** @type {any[]} */
    i.length
  )), new Proxy(
    /** @type {any} */
    i,
    {
      defineProperty(l, a, h) {
        (!("value" in h) || h.configurable === !1 || h.enumerable === !1 || h.writable === !1) && Um();
        var c = t.get(a);
        return c === void 0 ? o(() => {
          var f = /* @__PURE__ */ wn(h.value);
          return t.set(a, f), f;
        }) : k(c, h.value, !0), !0;
      },
      deleteProperty(l, a) {
        var h = t.get(a);
        if (h === void 0) {
          if (a in l) {
            const c = o(() => /* @__PURE__ */ wn(gt));
            t.set(a, c), jr(s);
          }
        } else
          k(h, gt), jr(s);
        return !0;
      },
      get(l, a, h) {
        var p;
        if (a === un)
          return i;
        var c = t.get(a), f = a in l;
        if (c === void 0 && (!f || (p = As(l, a)) != null && p.writable) && (c = o(() => {
          var O = Zs(f ? l[a] : gt), g = /* @__PURE__ */ wn(O);
          return g;
        }), t.set(a, c)), c !== void 0) {
          var d = u(c);
          return d === gt ? void 0 : d;
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
          if (f !== void 0 && d !== gt)
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
        if (a === un)
          return !0;
        var h = t.get(a), c = h !== void 0 && h.v !== gt || Reflect.has(l, a);
        if (h !== void 0 || ke !== null && (!c || (d = As(l, a)) != null && d.writable)) {
          h === void 0 && (h = o(() => {
            var p = c ? Zs(l[a]) : gt, O = /* @__PURE__ */ wn(p);
            return O;
          }), t.set(a, h));
          var f = u(h);
          if (f === gt)
            return !1;
        }
        return c;
      },
      set(l, a, h, c) {
        var $;
        var f = t.get(a), d = a in l;
        if (n && a === "length")
          for (var p = h; p < /** @type {Source<number>} */
          f.v; p += 1) {
            var O = t.get(p + "");
            O !== void 0 ? k(O, gt) : p in l && (O = o(() => /* @__PURE__ */ wn(gt)), t.set(p + "", O));
          }
        if (f === void 0)
          (!d || ($ = As(l, a)) != null && $.writable) && (f = o(() => /* @__PURE__ */ wn(void 0)), k(f, Zs(h)), t.set(a, f));
        else {
          d = f.v !== gt;
          var g = o(() => Zs(h));
          k(f, g);
        }
        var m = Reflect.getOwnPropertyDescriptor(l, a);
        if (m != null && m.set && m.set.call(c, h), !d) {
          if (n && typeof a == "string") {
            var v = (
              /** @type {Source<number>} */
              t.get("length")
            ), y = Number(a);
            Number.isInteger(y) && y >= v.v && k(v, y + 1);
          }
          jr(s);
        }
        return !0;
      },
      ownKeys(l) {
        u(s);
        var a = Reflect.ownKeys(l).filter((f) => {
          var d = t.get(f);
          return d === void 0 || d.v !== gt;
        });
        for (var [h, c] of t)
          c.v !== gt && !(h in l) && a.push(h);
        return a;
      },
      setPrototypeOf() {
        Fm();
      }
    }
  );
}
function xf(i) {
  try {
    if (i !== null && typeof i == "object" && un in i)
      return i[un];
  } catch {
  }
  return i;
}
function Sv(i, e) {
  return Object.is(xf(i), xf(e));
}
var Sf, Fd, Hd, Kd;
function kv() {
  if (Sf === void 0) {
    Sf = window, Fd = /Firefox/.test(navigator.userAgent);
    var i = Element.prototype, e = Node.prototype, t = Text.prototype;
    Hd = As(e, "firstChild").get, Kd = As(e, "nextSibling").get, bf(i) && (i[nh] = void 0, i[Vo] = null, i[sh] = void 0, i.__e = void 0), bf(t) && (t[$r] = void 0);
  }
}
function dn(i = "") {
  return document.createTextNode(i);
}
// @__NO_SIDE_EFFECTS__
function hn(i) {
  return (
    /** @type {TemplateNode | null} */
    Hd.call(i)
  );
}
// @__NO_SIDE_EFFECTS__
function Oo(i) {
  return (
    /** @type {TemplateNode | null} */
    Kd.call(i)
  );
}
function x(i, e) {
  return /* @__PURE__ */ hn(i);
}
function Fe(i, e = !1) {
  {
    var t = /* @__PURE__ */ hn(i);
    return t instanceof Comment && t.data === "" ? /* @__PURE__ */ Oo(t) : t;
  }
}
function w(i, e = 1, t = !1) {
  let n = i;
  for (; e--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ Oo(n);
  return n;
}
function Qv(i) {
  i.textContent = "";
}
function Jd() {
  return !1;
}
function $v(i, e, t) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(Qd, i, void 0)
  );
}
let kf = !1;
function _v() {
  kf || (kf = !0, document.addEventListener(
    "reset",
    (i) => {
      Promise.resolve().then(() => {
        var e;
        if (!i.defaultPrevented)
          for (
            const t of
            /**@type {HTMLFormElement} */
            i.target.elements
          )
            (e = t[Bo]) == null || e.call(t);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function Nl(i) {
  var e = $e, t = ke;
  wi(null), xi(null);
  try {
    return i();
  } finally {
    wi(e), xi(t);
  }
}
function mc(i, e, t, n = t) {
  i.addEventListener(e, () => Nl(t));
  const s = (
    /** @type {any} */
    i[Bo]
  );
  s ? i[Bo] = () => {
    s(), n(!0);
  } : i[Bo] = () => n(!0), _v();
}
function ep(i) {
  ke === null && ($e === null && Vm(), qm()), On && Wm();
}
function Pv(i, e) {
  var t = e.last;
  t === null ? e.last = e.first = i : (t.next = i, i.prev = t, e.last = i);
}
function tn(i, e) {
  var t = ke;
  t !== null && (t.f & jt) !== 0 && (i |= jt);
  var n = {
    ctx: He,
    deps: null,
    nodes: null,
    f: i | xt | mi,
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
  Oe == null || Oe.register_created_effect(n);
  var s = n;
  if ((i & Gs) !== 0)
    Ts !== null ? Ts.push(n) : fs.ensure().schedule(n);
  else if (e !== null) {
    try {
      ps(n);
    } catch (o) {
      throw Gt(n), o;
    }
    s.deps === null && s.teardown === null && s.nodes === null && s.first === s.last && // either `null`, or a singular child
    (s.f & ur) === 0 && (s = s.first, (i & Ti) !== 0 && (i & Us) !== 0 && s !== null && (s.f |= Us));
  }
  if (s !== null && (s.parent = t, t !== null && Pv(s, t), $e !== null && ($e.f & Pt) !== 0 && (i & Mn) === 0)) {
    var r = (
      /** @type {Derived} */
      $e
    );
    (r.effects ?? (r.effects = [])).push(s);
  }
  return n;
}
function vc() {
  return $e !== null && !Zi;
}
function Yl(i) {
  const e = tn(uo, null);
  return st(e, dt), e.teardown = i, e;
}
function ph(i) {
  ep();
  var e = (
    /** @type {Effect} */
    ke.f
  ), t = !$e && (e & Ei) !== 0 && (e & vs) === 0;
  if (t) {
    var n = (
      /** @type {ComponentContext} */
      He
    );
    (n.e ?? (n.e = [])).push(i);
  } else
    return tp(i);
}
function tp(i) {
  return tn(Gs | Cd, i);
}
function Tv(i) {
  return ep(), tn(uo | Cd, i);
}
function Zv(i) {
  fs.ensure();
  const e = tn(Mn | ur, i);
  return (t = {}) => new Promise((n) => {
    t.outro ? rs(e, () => {
      Gt(e), n(void 0);
    }) : (Gt(e), n(void 0));
  });
}
function Wl(i) {
  return tn(Gs, i);
}
function ot(i, e) {
  var t = (
    /** @type {ComponentContextLegacy} */
    He
  ), n = { effect: null, ran: !1, deps: i };
  t.l.$.push(n), n.effect = bs(() => {
    if (i(), !n.ran) {
      n.ran = !0;
      var s = (
        /** @type {Effect} */
        ke
      );
      try {
        xi(s.parent), b(e);
      } finally {
        xi(s);
      }
    }
  });
}
function nn() {
  var i = (
    /** @type {ComponentContextLegacy} */
    He
  );
  bs(() => {
    for (var e of i.l.$) {
      e.deps();
      var t = e.effect;
      (t.f & dt) !== 0 && t.deps !== null && st(t, Ai), dr(t) && ps(t), e.ran = !1;
    }
  });
}
function Cv(i) {
  return tn(Rs | ur, i);
}
function bs(i, e = 0) {
  return tn(uo | e, i);
}
function F(i, e = [], t = [], n = []) {
  mv(n, e, t, (s) => {
    tn(uo, () => i(...s.map(u)));
  });
}
function bc(i, e = 0) {
  var t = tn(Ti | e, i);
  return t;
}
function ui(i) {
  return tn(Ei | ur, i);
}
function ip(i) {
  var e = i.teardown;
  if (e !== null) {
    const t = On, n = $e;
    Qf(!0), wi(null);
    try {
      e.call(null);
    } finally {
      Qf(t), wi(n);
    }
  }
}
function yc(i, e = !1) {
  var t = i.first;
  for (i.first = i.last = null; t !== null; ) {
    const s = t.ac;
    s !== null && Nl(() => {
      s.abort(zl);
    });
    var n = t.next;
    (t.f & Mn) !== 0 ? t.parent = null : Gt(t, e), t = n;
  }
}
function Ev(i) {
  for (var e = i.first; e !== null; ) {
    var t = e.next;
    (e.f & Ei) === 0 && Gt(e), e = t;
  }
}
function Gt(i, e = !0) {
  var t = !1;
  (e || (i.f & Lm) !== 0) && i.nodes !== null && i.nodes.end !== null && (Av(
    i.nodes.start,
    /** @type {TemplateNode} */
    i.nodes.end
  ), t = !0), st(i, ih), yc(i, e && !t), Br(i, 0);
  var n = i.nodes && i.nodes.t;
  if (n !== null)
    for (const r of n)
      r.stop();
  ip(i), i.f ^= ih, i.f |= vi;
  var s = i.parent;
  s !== null && s.first !== null && np(i), i.next = i.prev = i.teardown = i.ctx = i.deps = i.fn = i.nodes = i.ac = i.b = null;
}
function Av(i, e) {
  for (; i !== null; ) {
    var t = i === e ? null : /* @__PURE__ */ Oo(i);
    i.remove(), i = t;
  }
}
function np(i) {
  var e = i.parent, t = i.prev, n = i.next;
  t !== null && (t.next = n), n !== null && (n.prev = t), e !== null && (e.first === i && (e.first = n), e.last === i && (e.last = t));
}
function rs(i, e, t = !0) {
  var n = [];
  sp(i, n, !0);
  var s = () => {
    t && Gt(i), e && e();
  }, r = n.length;
  if (r > 0) {
    var o = () => --r || s();
    for (var l of n)
      l.out(o);
  } else
    s();
}
function sp(i, e, t) {
  if ((i.f & jt) === 0) {
    i.f ^= jt;
    var n = i.nodes && i.nodes.t;
    if (n !== null)
      for (const l of n)
        (l.is_global || t) && e.push(l);
    for (var s = i.first; s !== null; ) {
      var r = s.next;
      if ((s.f & Mn) === 0) {
        var o = (s.f & Us) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (s.f & Ei) !== 0 && (i.f & Ti) !== 0;
        sp(s, e, o ? t : !1);
      }
      s = r;
    }
  }
}
function wc(i) {
  rp(i, !0);
}
function rp(i, e) {
  if ((i.f & jt) !== 0) {
    i.f ^= jt, (i.f & dt) === 0 && (st(i, xt), fs.ensure().schedule(i));
    for (var t = i.first; t !== null; ) {
      var n = t.next, s = (t.f & Us) !== 0 || (t.f & Ei) !== 0;
      rp(t, s ? e : !1), t = n;
    }
    var r = i.nodes && i.nodes.t;
    if (r !== null)
      for (const o of r)
        (o.is_global || e) && o.in();
  }
}
function xc(i, e) {
  if (i.nodes)
    for (var t = i.nodes.start, n = i.nodes.end; t !== null; ) {
      var s = t === n ? null : /* @__PURE__ */ Oo(t);
      e.append(t), t = s;
    }
}
let Ko = !1, On = !1;
function Qf(i) {
  On = i;
}
let $e = null, Zi = !1;
function wi(i) {
  $e = i;
}
let ke = null;
function xi(i) {
  ke = i;
}
let bi = null;
function op(i) {
  $e !== null && (bi === null ? bi = [i] : bi.push(i));
}
let Yt = null, Kt = 0, ai = null;
function Rv(i) {
  ai = i;
}
let lp = 1, Gn = 0, os = Gn;
function $f(i) {
  os = i;
}
function ap() {
  return ++lp;
}
function dr(i) {
  var e = i.f;
  if ((e & xt) !== 0)
    return !0;
  if (e & Pt && (i.f &= ~cs), (e & Ai) !== 0) {
    for (var t = (
      /** @type {Value[]} */
      i.deps
    ), n = t.length, s = 0; s < n; s++) {
      var r = t[s];
      if (dr(
        /** @type {Derived} */
        r
      ) && Vd(
        /** @type {Derived} */
        r
      ), r.wv > i.wv)
        return !0;
    }
    (e & mi) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    $t === null && st(i, dt);
  }
  return !1;
}
function hp(i, e, t = !0) {
  var n = i.reactions;
  if (n !== null && !(bi !== null && is.call(bi, i)))
    for (var s = 0; s < n.length; s++) {
      var r = n[s];
      (r.f & Pt) !== 0 ? hp(
        /** @type {Derived} */
        r,
        e,
        !1
      ) : e === r && (t ? st(r, xt) : (r.f & dt) !== 0 && st(r, Ai), Oc(
        /** @type {Effect} */
        r
      ));
    }
}
function cp(i) {
  var g;
  var e = Yt, t = Kt, n = ai, s = $e, r = bi, o = He, l = Zi, a = os, h = i.f;
  Yt = /** @type {null | Value[]} */
  null, Kt = 0, ai = null, $e = (h & (Ei | Mn)) === 0 ? i : null, bi = null, Fs(i.ctx), Zi = !1, os = ++Gn, i.ac !== null && (Nl(() => {
    i.ac.abort(zl);
  }), i.ac = null);
  try {
    i.f |= ol;
    var c = (
      /** @type {Function} */
      i.fn
    ), f = c();
    i.f |= vs;
    var d = i.deps, p = Oe == null ? void 0 : Oe.is_fork;
    if (Yt !== null) {
      var O;
      if (p || Br(i, Kt), d !== null && Kt > 0)
        for (d.length = Kt + Yt.length, O = 0; O < Yt.length; O++)
          d[Kt + O] = Yt[O];
      else
        i.deps = d = Yt;
      if (vc() && (i.f & mi) !== 0)
        for (O = Kt; O < d.length; O++)
          ((g = d[O]).reactions ?? (g.reactions = [])).push(i);
    } else !p && d !== null && Kt < d.length && (Br(i, Kt), d.length = Kt);
    if (po() && ai !== null && !Zi && d !== null && (i.f & (Pt | Ai | xt)) === 0)
      for (O = 0; O < /** @type {Source[]} */
      ai.length; O++)
        hp(
          ai[O],
          /** @type {Effect} */
          i
        );
    if (s !== null && s !== i) {
      if (Gn++, s.deps !== null)
        for (let m = 0; m < t; m += 1)
          s.deps[m].rv = Gn;
      if (e !== null)
        for (const m of e)
          m.rv = Gn;
      ai !== null && (n === null ? n = ai : n.push(.../** @type {Source[]} */
      ai));
    }
    return (i.f & An) !== 0 && (i.f ^= An), f;
  } catch (m) {
    return Md(m);
  } finally {
    i.f ^= ol, Yt = e, Kt = t, ai = n, $e = s, bi = r, Fs(o), Zi = l, os = a;
  }
}
function Mv(i, e) {
  let t = e.reactions;
  if (t !== null) {
    var n = Am.call(t, i);
    if (n !== -1) {
      var s = t.length - 1;
      s === 0 ? t = e.reactions = null : (t[n] = t[s], t.pop());
    }
  }
  if (t === null && (e.f & Pt) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Yt === null || !is.call(Yt, e))) {
    var r = (
      /** @type {Derived} */
      e
    );
    (r.f & mi) !== 0 && (r.f ^= mi, r.f &= ~cs), r.v !== gt && dc(r), wv(r), Br(r, 0);
  }
}
function Br(i, e) {
  var t = i.deps;
  if (t !== null)
    for (var n = e; n < t.length; n++)
      Mv(i, t[n]);
}
function ps(i) {
  var e = i.f;
  if ((e & vi) === 0) {
    st(i, dt);
    var t = ke, n = Ko;
    ke = i, Ko = !0;
    try {
      (e & (Ti | Zd)) !== 0 ? Ev(i) : yc(i), ip(i);
      var s = cp(i);
      i.teardown = typeof s == "function" ? s : null, i.wv = lp;
      var r;
      $d && wm && (i.f & xt) !== 0 && i.deps;
    } finally {
      Ko = n, ke = t;
    }
  }
}
async function Xv() {
  await Promise.resolve(), av();
}
function u(i) {
  var e = i.f, t = (e & Pt) !== 0;
  if ($e !== null && !Zi) {
    var n = ke !== null && (ke.f & vi) !== 0;
    if (!n && (bi === null || !is.call(bi, i))) {
      var s = $e.deps;
      if (($e.f & ol) !== 0)
        i.rv < Gn && (i.rv = Gn, Yt === null && s !== null && s[Kt] === i ? Kt++ : Yt === null ? Yt = [i] : Yt.push(i));
      else {
        $e.deps ?? ($e.deps = []), is.call($e.deps, i) || $e.deps.push(i);
        var r = i.reactions;
        r === null ? i.reactions = [$e] : is.call(r, $e) || r.push($e);
      }
    }
  }
  if (On && ss.has(i))
    return ss.get(i);
  if (t) {
    var o = (
      /** @type {Derived} */
      i
    );
    if (On) {
      var l = o.v;
      return ((o.f & dt) === 0 && o.reactions !== null || up(o)) && (l = gc(o)), ss.set(o, l), l;
    }
    var a = (o.f & mi) === 0 && !Zi && $e !== null && (Ko || ($e.f & mi) !== 0), h = (o.f & vs) === 0;
    dr(o) && (a && (o.f |= mi), Vd(o)), a && !h && (Bd(o), fp(o));
  }
  if ($t != null && $t.has(i))
    return $t.get(i);
  if ((i.f & An) !== 0)
    throw i.v;
  return i.v;
}
function fp(i) {
  if (i.f |= mi, i.deps !== null)
    for (const e of i.deps)
      (e.reactions ?? (e.reactions = [])).push(i), (e.f & Pt) !== 0 && (e.f & mi) === 0 && (Bd(
        /** @type {Derived} */
        e
      ), fp(
        /** @type {Derived} */
        e
      ));
}
function up(i) {
  if (i.v === gt) return !0;
  if (i.deps === null) return !1;
  for (const e of i.deps)
    if (ss.has(e) || (e.f & Pt) !== 0 && up(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function b(i) {
  var e = Zi;
  try {
    return Zi = !0, i();
  } finally {
    Zi = e;
  }
}
function Le(i) {
  if (!(typeof i != "object" || !i || i instanceof EventTarget)) {
    if (un in i)
      Oh(i);
    else if (!Array.isArray(i))
      for (let e in i) {
        const t = i[e];
        typeof t == "object" && t && un in t && Oh(t);
      }
  }
}
function Oh(i, e = /* @__PURE__ */ new Set()) {
  if (typeof i == "object" && i !== null && // We don't want to traverse DOM elements
  !(i instanceof EventTarget) && !e.has(i)) {
    e.add(i), i instanceof Date && i.getTime();
    for (let n in i)
      try {
        Oh(i[n], e);
      } catch {
      }
    const t = cc(i);
    if (t !== Object.prototype && t !== Array.prototype && t !== Map.prototype && t !== Set.prototype && t !== Date.prototype) {
      const n = Pd(t);
      for (let s in n) {
        const r = n[s].get;
        if (r)
          try {
            r.call(i);
          } catch {
          }
      }
    }
  }
}
const $o = Symbol("events"), jv = /* @__PURE__ */ new Set(), _f = /* @__PURE__ */ new Set();
function Lv(i, e, t, n = {}) {
  function s(r) {
    if (n.capture || gh.call(e, r), !r.cancelBubble)
      return Nl(() => t == null ? void 0 : t.call(this, r));
  }
  return i.startsWith("pointer") || i.startsWith("touch") || i === "wheel" ? Rn(() => {
    e.addEventListener(i, s, n);
  }) : e.addEventListener(i, s, n), s;
}
function ne(i, e, t, n, s) {
  var r = { capture: n, passive: s }, o = Lv(i, e, t, r);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && Yl(() => {
    e.removeEventListener(i, o, r);
  });
}
let Pf = null;
function gh(i) {
  var m, v;
  var e = this, t = (
    /** @type {Node} */
    e.ownerDocument
  ), n = i.type, s = ((m = i.composedPath) == null ? void 0 : m.call(i)) || [], r = (
    /** @type {null | Element} */
    s[0] || i.target
  );
  Pf = i;
  var o = 0, l = Pf === i && i[$o];
  if (l) {
    var a = s.indexOf(l);
    if (a !== -1 && (e === document || e === /** @type {any} */
    window)) {
      i[$o] = e;
      return;
    }
    var h = s.indexOf(e);
    if (h === -1)
      return;
    a <= h && (o = a);
  }
  if (r = /** @type {Element} */
  s[o] || i.target, r !== e) {
    _d(i, "currentTarget", {
      configurable: !0,
      get() {
        return r || t;
      }
    });
    var c = $e, f = ke;
    wi(null), xi(null);
    try {
      for (var d, p = []; r !== null; ) {
        var O = r.assignedSlot || r.parentNode || /** @type {any} */
        r.host || null;
        try {
          var g = (v = r[$o]) == null ? void 0 : v[n];
          g != null && (!/** @type {any} */
          r.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          i.target === r) && g.call(r, i);
        } catch (y) {
          d ? p.push(y) : d = y;
        }
        if (i.cancelBubble || O === e || O === null)
          break;
        r = O;
      }
      if (d) {
        for (let y of p)
          queueMicrotask(() => {
            throw y;
          });
        throw d;
      }
    } finally {
      i[$o] = e, delete i.currentTarget, wi(c), xi(f);
    }
  }
}
var xd;
const ga = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((xd = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : xd.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (i) => i
  })
);
function Iv(i) {
  return (
    /** @type {string} */
    (ga == null ? void 0 : ga.createHTML(i)) ?? i
  );
}
function dp(i) {
  var e = $v("template");
  return e.innerHTML = Iv(i.replaceAll("<!>", "<!---->")), e.content;
}
function Js(i, e) {
  var t = (
    /** @type {Effect} */
    ke
  );
  t.nodes === null && (t.nodes = { start: i, end: e, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function D(i, e) {
  var t = (e & kd) !== 0, n = (e & Em) !== 0, s, r = !i.startsWith("<!>");
  return () => {
    s === void 0 && (s = dp(r ? i : "<!>" + i), t || (s = /** @type {TemplateNode} */
    /* @__PURE__ */ hn(s)));
    var o = (
      /** @type {TemplateNode} */
      n || Fd ? document.importNode(s, !0) : s.cloneNode(!0)
    );
    if (t) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ hn(o)
      ), a = (
        /** @type {TemplateNode} */
        o.lastChild
      );
      Js(l, a);
    } else
      Js(o, o);
    return o;
  };
}
// @__NO_SIDE_EFFECTS__
function Dv(i, e, t = "svg") {
  var n = !i.startsWith("<!>"), s = (e & kd) !== 0, r = `<${t}>${n ? i : "<!>" + i}</${t}>`, o;
  return () => {
    if (!o) {
      var l = (
        /** @type {DocumentFragment} */
        dp(r)
      ), a = (
        /** @type {Element} */
        /* @__PURE__ */ hn(l)
      );
      if (s)
        for (o = document.createDocumentFragment(); /* @__PURE__ */ hn(a); )
          o.appendChild(
            /** @type {TemplateNode} */
            /* @__PURE__ */ hn(a)
          );
      else
        o = /** @type {Element} */
        /* @__PURE__ */ hn(a);
    }
    var h = (
      /** @type {TemplateNode} */
      o.cloneNode(!0)
    );
    if (s) {
      var c = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ hn(h)
      ), f = (
        /** @type {TemplateNode} */
        h.lastChild
      );
      Js(c, f);
    } else
      Js(h, h);
    return h;
  };
}
// @__NO_SIDE_EFFECTS__
function go(i, e) {
  return /* @__PURE__ */ Dv(i, e, "svg");
}
function zv(i = "") {
  {
    var e = dn(i + "");
    return Js(e, e), e;
  }
}
function gn() {
  var i = document.createDocumentFragment(), e = document.createComment(""), t = dn();
  return i.append(e, t), Js(e, t), i;
}
function R(i, e) {
  i !== null && i.before(
    /** @type {Node} */
    e
  );
}
const Nv = ["touchstart", "touchmove"];
function Yv(i) {
  return Nv.includes(i);
}
function G(i, e) {
  var t = e == null ? "" : typeof e == "object" ? `${e}` : e;
  t !== /** @type {any} */
  (i[$r] ?? (i[$r] = i.nodeValue)) && (i[$r] = t, i.nodeValue = `${t}`);
}
function Wv(i, e) {
  return qv(i, e);
}
const _o = /* @__PURE__ */ new Map();
function qv(i, { target: e, anchor: t, props: n = {}, events: s, context: r, intro: o = !0, transformError: l }) {
  kv();
  var a = void 0, h = Zv(() => {
    var c = t ?? e.appendChild(dn());
    uv(
      /** @type {TemplateNode} */
      c,
      {
        pending: () => {
        }
      },
      (p) => {
        St({});
        var O = (
          /** @type {ComponentContext} */
          He
        );
        r && (O.c = r), s && (n.$$events = s), a = i(p, n) || {}, kt();
      },
      l
    );
    var f = /* @__PURE__ */ new Set(), d = (p) => {
      for (var O = 0; O < p.length; O++) {
        var g = p[O];
        if (!f.has(g)) {
          f.add(g);
          var m = Yv(g);
          for (const $ of [e, document]) {
            var v = _o.get($);
            v === void 0 && (v = /* @__PURE__ */ new Map(), _o.set($, v));
            var y = v.get(g);
            y === void 0 ? ($.addEventListener(g, gh, { passive: m }), v.set(g, 1)) : v.set(g, y + 1);
          }
        }
      }
    };
    return d(Dl(jv)), _f.add(d), () => {
      var m;
      for (var p of f)
        for (const v of [e, document]) {
          var O = (
            /** @type {Map<string, number>} */
            _o.get(v)
          ), g = (
            /** @type {number} */
            O.get(p)
          );
          --g == 0 ? (v.removeEventListener(p, gh), O.delete(p), O.size === 0 && _o.delete(v)) : O.set(p, g);
        }
      _f.delete(d), c !== t && ((m = c.parentNode) == null || m.removeChild(c));
    };
  });
  return Vv.set(a, h), a;
}
let Vv = /* @__PURE__ */ new WeakMap();
var _i, Yi, ti, ts, co, fo, Ll;
class Bv {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(e, t = !0) {
    /** @type {TemplateNode} */
    Dt(this, "anchor");
    /** @type {Map<Batch, Key>} */
    xe(this, _i, /* @__PURE__ */ new Map());
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
    xe(this, Yi, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    xe(this, ti, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    xe(this, ts, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    xe(this, co, !0);
    /**
     * @param {Batch} batch
     */
    xe(this, fo, (e) => {
      if (_(this, _i).has(e)) {
        var t = (
          /** @type {Key} */
          _(this, _i).get(e)
        ), n = _(this, Yi).get(t);
        if (n)
          wc(n), _(this, ts).delete(t);
        else {
          var s = _(this, ti).get(t);
          s && (_(this, Yi).set(t, s.effect), _(this, ti).delete(t), s.fragment.lastChild.remove(), this.anchor.before(s.fragment), n = s.effect);
        }
        for (const [r, o] of _(this, _i)) {
          if (_(this, _i).delete(r), r === e)
            break;
          const l = _(this, ti).get(o);
          l && (Gt(l.effect), _(this, ti).delete(o));
        }
        for (const [r, o] of _(this, Yi)) {
          if (r === t || _(this, ts).has(r)) continue;
          const l = () => {
            if (Array.from(_(this, _i).values()).includes(r)) {
              var h = document.createDocumentFragment();
              xc(o, h), h.append(dn()), _(this, ti).set(r, { effect: o, fragment: h });
            } else
              Gt(o);
            _(this, ts).delete(r), _(this, Yi).delete(r);
          };
          _(this, co) || !n ? (_(this, ts).add(r), rs(o, l, !1)) : l();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    xe(this, Ll, (e) => {
      _(this, _i).delete(e);
      const t = Array.from(_(this, _i).values());
      for (const [n, s] of _(this, ti))
        t.includes(n) || (Gt(s.effect), _(this, ti).delete(n));
    });
    this.anchor = e, we(this, co, t);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(e, t) {
    var n = (
      /** @type {Batch} */
      Oe
    ), s = Jd();
    if (t && !_(this, Yi).has(e) && !_(this, ti).has(e))
      if (s) {
        var r = document.createDocumentFragment(), o = dn();
        r.append(o), _(this, ti).set(e, {
          effect: ui(() => t(o)),
          fragment: r
        });
      } else
        _(this, Yi).set(
          e,
          ui(() => t(this.anchor))
        );
    if (_(this, _i).set(n, e), s) {
      for (const [l, a] of _(this, Yi))
        l === e ? n.unskip_effect(a) : n.skip_effect(a);
      for (const [l, a] of _(this, ti))
        l === e ? n.unskip_effect(a.effect) : n.skip_effect(a.effect);
      n.oncommit(_(this, fo)), n.ondiscard(_(this, Ll));
    } else
      _(this, fo).call(this, n);
  }
}
_i = new WeakMap(), Yi = new WeakMap(), ti = new WeakMap(), ts = new WeakMap(), co = new WeakMap(), fo = new WeakMap(), Ll = new WeakMap();
function ys(i) {
  He === null && fc(), fr && He.l !== null ? Uv(He).m.push(i) : ph(() => {
    const e = b(i);
    if (typeof e == "function") return (
      /** @type {() => void} */
      e
    );
  });
}
function pp(i) {
  He === null && fc(), ys(() => () => b(i));
}
function Gv(i, e, { bubbles: t = !1, cancelable: n = !1 } = {}) {
  return new CustomEvent(i, { detail: e, bubbles: t, cancelable: n });
}
function Sc() {
  const i = He;
  return i === null && fc(), (e, t, n) => {
    var r;
    const s = (
      /** @type {Record<string, Function | Function[]>} */
      (r = i.s.$$events) == null ? void 0 : r[
        /** @type {string} */
        e
      ]
    );
    if (s) {
      const o = Il(s) ? s.slice() : [s], l = Gv(
        /** @type {string} */
        e,
        t,
        n
      );
      for (const a of o)
        a.call(i.x, l);
      return !l.defaultPrevented;
    }
    return !0;
  };
}
function Uv(i) {
  var e = (
    /** @type {ComponentContextLegacy} */
    i.l
  );
  return e.u ?? (e.u = { a: [], b: [], m: [] });
}
function te(i, e, t = !1) {
  var n = new Bv(i), s = t ? Us : 0;
  function r(o, l) {
    n.ensure(o, l);
  }
  bc(() => {
    var o = !1;
    e((l, a = 0) => {
      o = !0, r(a, l);
    }), o || r(-1, null);
  }, s);
}
function Je(i, e) {
  return e;
}
function Fv(i, e, t) {
  for (var n = [], s = e.length, r, o = e.length, l = 0; l < s; l++) {
    let f = e[l];
    rs(
      f,
      () => {
        if (r) {
          if (r.pending.delete(f), r.done.add(f), r.pending.size === 0) {
            var d = (
              /** @type {Set<EachOutroGroup>} */
              i.outrogroups
            );
            mh(i, Dl(r.done)), d.delete(r), d.size === 0 && (i.outrogroups = null);
          }
        } else
          o -= 1;
      },
      !1
    );
  }
  if (o === 0) {
    var a = n.length === 0 && t !== null;
    if (a) {
      var h = (
        /** @type {Element} */
        t
      ), c = (
        /** @type {Element} */
        h.parentNode
      );
      Qv(c), c.append(h), i.items.clear();
    }
    mh(i, e, !a);
  } else
    r = {
      pending: new Set(e),
      done: /* @__PURE__ */ new Set()
    }, (i.outrogroups ?? (i.outrogroups = /* @__PURE__ */ new Set())).add(r);
}
function mh(i, e, t = !0) {
  var n;
  if (i.pending.size > 0) {
    n = /* @__PURE__ */ new Set();
    for (const o of i.pending.values())
      for (const l of o)
        n.add(
          /** @type {EachItem} */
          i.items.get(l).e
        );
  }
  for (var s = 0; s < e.length; s++) {
    var r = e[s];
    if (n != null && n.has(r)) {
      r.f |= Vi;
      const o = document.createDocumentFragment();
      xc(r, o);
    } else
      Gt(e[s], t);
  }
}
var Tf;
function et(i, e, t, n, s, r = null) {
  var o = i, l = /* @__PURE__ */ new Map(), a = (e & Sd) !== 0;
  if (a) {
    var h = (
      /** @type {Element} */
      i
    );
    o = h.appendChild(dn());
  }
  var c = null, f = /* @__PURE__ */ yt(() => {
    var $ = t();
    return Il($) ? $ : $ == null ? [] : Dl($);
  }), d, p = /* @__PURE__ */ new Map(), O = !0;
  function g($) {
    (y.effect.f & vi) === 0 && (y.pending.delete($), y.fallback = c, Hv(y, d, o, e, n), c !== null && (d.length === 0 ? (c.f & Vi) === 0 ? wc(c) : (c.f ^= Vi, Pr(c, null, o)) : rs(c, () => {
      c = null;
    })));
  }
  function m($) {
    y.pending.delete($);
  }
  var v = bc(() => {
    d = /** @type {V[]} */
    u(f);
    for (var $ = d.length, Z = /* @__PURE__ */ new Set(), E = (
      /** @type {Batch} */
      Oe
    ), M = Jd(), A = 0; A < $; A += 1) {
      var Y = d[A], L = n(Y, A), X = O ? null : l.get(L);
      X ? (X.v && Ks(X.v, Y), X.i && Ks(X.i, A), M && E.unskip_effect(X.e)) : (X = Kv(
        l,
        O ? o : Tf ?? (Tf = dn()),
        Y,
        L,
        A,
        s,
        e,
        t
      ), O || (X.e.f |= Vi), l.set(L, X)), Z.add(L);
    }
    if ($ === 0 && r && !c && (O ? c = ui(() => r(o)) : (c = ui(() => r(Tf ?? (Tf = dn()))), c.f |= Vi)), $ > Z.size && Ym(), !O)
      if (p.set(E, Z), M) {
        for (const [j, S] of l)
          Z.has(j) || E.skip_effect(S.e);
        E.oncommit(g), E.ondiscard(m);
      } else
        g(E);
    u(f);
  }), y = { effect: v, items: l, pending: p, outrogroups: null, fallback: c };
  O = !1;
}
function br(i) {
  for (; i !== null && (i.f & Ei) === 0; )
    i = i.next;
  return i;
}
function Hv(i, e, t, n, s) {
  var X, j, S, T, I, P, Q, q, ae;
  var r = (n & Qm) !== 0, o = e.length, l = i.items, a = br(i.effect.first), h, c = null, f, d = [], p = [], O, g, m, v;
  if (r)
    for (v = 0; v < o; v += 1)
      O = e[v], g = s(O, v), m = /** @type {EachItem} */
      l.get(g).e, (m.f & Vi) === 0 && ((j = (X = m.nodes) == null ? void 0 : X.a) == null || j.measure(), (f ?? (f = /* @__PURE__ */ new Set())).add(m));
  for (v = 0; v < o; v += 1) {
    if (O = e[v], g = s(O, v), m = /** @type {EachItem} */
    l.get(g).e, i.outrogroups !== null)
      for (const V of i.outrogroups)
        V.pending.delete(m), V.done.delete(m);
    if ((m.f & jt) !== 0 && (wc(m), r && ((T = (S = m.nodes) == null ? void 0 : S.a) == null || T.unfix(), (f ?? (f = /* @__PURE__ */ new Set())).delete(m))), (m.f & Vi) !== 0)
      if (m.f ^= Vi, m === a)
        Pr(m, null, t);
      else {
        var y = c ? c.next : a;
        m === i.effect.last && (i.effect.last = m.prev), m.prev && (m.prev.next = m.next), m.next && (m.next.prev = m.prev), xn(i, c, m), xn(i, m, y), Pr(m, y, t), c = m, d = [], p = [], a = br(c.next);
        continue;
      }
    if (m !== a) {
      if (h !== void 0 && h.has(m)) {
        if (d.length < p.length) {
          var $ = p[0], Z;
          c = $.prev;
          var E = d[0], M = d[d.length - 1];
          for (Z = 0; Z < d.length; Z += 1)
            Pr(d[Z], $, t);
          for (Z = 0; Z < p.length; Z += 1)
            h.delete(p[Z]);
          xn(i, E.prev, M.next), xn(i, c, E), xn(i, M, $), a = $, c = M, v -= 1, d = [], p = [];
        } else
          h.delete(m), Pr(m, a, t), xn(i, m.prev, m.next), xn(i, m, c === null ? i.effect.first : c.next), xn(i, c, m), c = m;
        continue;
      }
      for (d = [], p = []; a !== null && a !== m; )
        (h ?? (h = /* @__PURE__ */ new Set())).add(a), p.push(a), a = br(a.next);
      if (a === null)
        continue;
    }
    (m.f & Vi) === 0 && d.push(m), c = m, a = br(m.next);
  }
  if (i.outrogroups !== null) {
    for (const V of i.outrogroups)
      V.pending.size === 0 && (mh(i, Dl(V.done)), (I = i.outrogroups) == null || I.delete(V));
    i.outrogroups.size === 0 && (i.outrogroups = null);
  }
  if (a !== null || h !== void 0) {
    var A = [];
    if (h !== void 0)
      for (m of h)
        (m.f & jt) === 0 && A.push(m);
    for (; a !== null; )
      (a.f & jt) === 0 && a !== i.fallback && A.push(a), a = br(a.next);
    var Y = A.length;
    if (Y > 0) {
      var L = (n & Sd) !== 0 && o === 0 ? t : null;
      if (r) {
        for (v = 0; v < Y; v += 1)
          (Q = (P = A[v].nodes) == null ? void 0 : P.a) == null || Q.measure();
        for (v = 0; v < Y; v += 1)
          (ae = (q = A[v].nodes) == null ? void 0 : q.a) == null || ae.fix();
      }
      Fv(i, A, L);
    }
  }
  r && Rn(() => {
    var V, H;
    if (f !== void 0)
      for (m of f)
        (H = (V = m.nodes) == null ? void 0 : V.a) == null || H.apply();
  });
}
function Kv(i, e, t, n, s, r, o, l) {
  var a = (o & Sm) !== 0 ? (o & $m) === 0 ? /* @__PURE__ */ K(t, !1, !1) : ds(t) : null, h = (o & km) !== 0 ? ds(s) : null;
  return {
    v: a,
    i: h,
    e: ui(() => (r(e, a ?? t, h ?? s, l), () => {
      i.delete(n);
    }))
  };
}
function Pr(i, e, t) {
  if (i.nodes)
    for (var n = i.nodes.start, s = i.nodes.end, r = e && (e.f & Vi) === 0 ? (
      /** @type {EffectNodes} */
      e.nodes.start
    ) : t; n !== null; ) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Oo(n)
      );
      if (r.before(n), n === s)
        return;
      n = o;
    }
}
function xn(i, e, t) {
  e === null ? i.effect.first = t : e.next = t, t === null ? i.effect.last = e : t.prev = e;
}
function Jv(i, e, t) {
  Wl(() => {
    var n = b(() => e(i, t == null ? void 0 : t()) || {});
    if (t && (n != null && n.update)) {
      var s = !1, r = (
        /** @type {any} */
        {}
      );
      bs(() => {
        var o = t();
        Le(o), s && uc(r, o) && (r = o, n.update(o));
      }), s = !0;
    }
    if (n != null && n.destroy)
      return () => (
        /** @type {Function} */
        n.destroy()
      );
  });
}
const Zf = [...` 	
\r\f \v\uFEFF`];
function e0(i, e, t) {
  var n = i == null ? "" : "" + i;
  if (e && (n = n ? n + " " + e : e), t) {
    for (var s of Object.keys(t))
      if (t[s])
        n = n ? n + " " + s : s;
      else if (n.length)
        for (var r = s.length, o = 0; (o = n.indexOf(s, o)) >= 0; ) {
          var l = o + r;
          (o === 0 || Zf.includes(n[o - 1])) && (l === n.length || Zf.includes(n[l])) ? n = (o === 0 ? "" : n.substring(0, o)) + n.substring(l + 1) : o = l;
        }
  }
  return n === "" ? null : n;
}
function t0(i, e) {
  return i == null ? null : String(i);
}
function si(i, e, t, n, s, r) {
  var o = (
    /** @type {any} */
    i[nh]
  );
  if (o !== t || o === void 0) {
    var l = e0(t, n, r);
    l == null ? i.removeAttribute("class") : i.className = l, i[nh] = t;
  } else if (r && s !== r)
    for (var a in r) {
      var h = !!r[a];
      (s == null || h !== !!s[a]) && i.classList.toggle(a, h);
    }
  return r;
}
function Op(i, e, t, n) {
  var s = (
    /** @type {any} */
    i[sh]
  );
  if (s !== e) {
    var r = t0(e);
    r == null ? i.removeAttribute("style") : i.style.cssText = r, i[sh] = e;
  }
  return n;
}
function kc(i, e, t = !1) {
  if (i.multiple) {
    if (e == null)
      return;
    if (!Il(e))
      return ev();
    for (var n of i.options)
      n.selected = e.includes(Lr(n));
    return;
  }
  for (n of i.options) {
    var s = Lr(n);
    if (Sv(s, e)) {
      n.selected = !0;
      return;
    }
  }
  (!t || e !== void 0) && (i.selectedIndex = -1);
}
function gp(i) {
  var e = new MutationObserver(() => {
    kc(i, i.__value);
  });
  e.observe(i, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), Yl(() => {
    e.disconnect();
  });
}
function vh(i, e, t = e) {
  var n = /* @__PURE__ */ new WeakSet(), s = !0;
  mc(i, "change", (r) => {
    var o = r ? "[selected]" : ":checked", l;
    if (i.multiple)
      l = [].map.call(i.querySelectorAll(o), Lr);
    else {
      var a = i.querySelector(o) ?? // will fall back to first non-disabled option if no option is selected
      i.querySelector("option:not([disabled])");
      l = a && Lr(a);
    }
    t(l), i.__value = l, Oe !== null && n.add(Oe);
  }), Wl(() => {
    var r = e();
    if (i === document.activeElement) {
      var o = (
        /** @type {Batch} */
        Oe
      );
      if (n.has(o))
        return;
    }
    if (kc(i, r, s), s && r === void 0) {
      var l = i.querySelector(":checked");
      l !== null && (r = Lr(l), t(r));
    }
    i.__value = r, s = !1;
  }), gp(i);
}
function Lr(i) {
  return "__value" in i ? i.__value : i.value;
}
const i0 = Symbol("is custom element"), n0 = Symbol("is html"), s0 = zm ? "progress" : "PROGRESS";
function Tr(i, e) {
  var t = Qc(i);
  t.value === (t.value = // treat null and undefined the same for the initial value
  e ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  i.value === e && (e !== 0 || i.nodeName !== s0) || (i.value = e ?? "");
}
function r0(i, e) {
  var t = Qc(i);
  t.checked !== (t.checked = // treat null and undefined the same for the initial value
  e ?? void 0) && (i.checked = e);
}
function Ge(i, e, t, n) {
  var s = Qc(i);
  s[e] !== (s[e] = t) && (e === "loading" && (i[Dm] = t), t == null ? i.removeAttribute(e) : typeof t != "string" && o0(i).includes(e) ? i[e] = t : i.setAttribute(e, t));
}
function Qc(i) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    i[Vo] ?? (i[Vo] = {
      [i0]: i.nodeName.includes("-"),
      [n0]: i.namespaceURI === Qd
    })
  );
}
var Cf = /* @__PURE__ */ new Map();
function o0(i) {
  var e = i.getAttribute("is") || i.nodeName, t = Cf.get(e);
  if (t) return t;
  Cf.set(e, t = []);
  for (var n, s = i, r = Element.prototype; r !== s; ) {
    n = Pd(s);
    for (var o in n)
      n[o].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      o !== "innerHTML" && o !== "textContent" && o !== "innerText" && t.push(o);
    s = cc(s);
  }
  return t;
}
function qt(i, e, t = e) {
  var n = /* @__PURE__ */ new WeakSet();
  mc(i, "input", async (s) => {
    var r = s ? i.defaultValue : i.value;
    if (r = ma(i) ? va(r) : r, t(r), Oe !== null && n.add(Oe), await Xv(), r !== (r = e())) {
      var o = i.selectionStart, l = i.selectionEnd, a = i.value.length;
      if (i.value = r ?? "", l !== null) {
        var h = i.value.length;
        o === l && l === a && h > a ? (i.selectionStart = h, i.selectionEnd = h) : (i.selectionStart = o, i.selectionEnd = Math.min(l, h));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  b(e) == null && i.value && (t(ma(i) ? va(i.value) : i.value), Oe !== null && n.add(Oe)), bs(() => {
    var s = e();
    if (i === document.activeElement) {
      var r = (
        /** @type {Batch} */
        Oe
      );
      if (n.has(r))
        return;
    }
    ma(i) && s === va(i.value) || i.type === "date" && !s && !i.value || s !== i.value && (i.value = s ?? "");
  });
}
function mp(i, e, t = e) {
  mc(i, "change", (n) => {
    var s = n ? i.defaultChecked : i.checked;
    t(s);
  }), // If we are hydrating and the value has since changed,
  // then use the update value from the input instead.
  // If defaultChecked is set, then checked == defaultChecked
  b(e) == null && t(i.checked), bs(() => {
    var n = e();
    i.checked = !!n;
  });
}
function ma(i) {
  var e = i.type;
  return e === "number" || e === "range";
}
function va(i) {
  return i === "" ? null : +i;
}
function ba(i, e) {
  return i === e || (i == null ? void 0 : i[un]) === e;
}
function $c(i = {}, e, t, n) {
  var s = (
    /** @type {ComponentContext} */
    He.r
  ), r = (
    /** @type {Effect} */
    ke
  );
  return Wl(() => {
    var o, l;
    return bs(() => {
      o = l, l = [], b(() => {
        ba(t(...l), i) || (e(i, ...l), o && ba(t(...o), i) && e(null, ...o));
      });
    }), () => {
      let a = r;
      for (; a !== s && a.parent !== null && a.parent.f & ih; )
        a = a.parent;
      const h = () => {
        l && ba(t(...l), i) && e(null, ...l);
      }, c = a.teardown;
      a.teardown = () => {
        h(), c == null || c();
      };
    };
  }), i;
}
function bh(i) {
  return function(...e) {
    var t = (
      /** @type {Event} */
      e[0]
    );
    t.target === this && (i == null || i.apply(this, e));
  };
}
function ya(i) {
  return function(...e) {
    var t = (
      /** @type {Event} */
      e[0]
    );
    return t.stopPropagation(), i == null ? void 0 : i.apply(this, e);
  };
}
function Tt(i = !1) {
  const e = (
    /** @type {ComponentContextLegacy} */
    He
  ), t = e.l.u;
  if (!t) return;
  let n = () => Le(e.s);
  if (i) {
    let s = 0, r = (
      /** @type {Record<string, any>} */
      {}
    );
    const o = /* @__PURE__ */ Hs(() => {
      let l = !1;
      const a = e.s;
      for (const h in a)
        a[h] !== r[h] && (r[h] = a[h], l = !0);
      return l && s++, s;
    });
    n = () => u(o);
  }
  t.b.length && Tv(() => {
    Ef(e, n), eh(t.b);
  }), ph(() => {
    const s = b(() => t.m.map(Xm));
    return () => {
      for (const r of s)
        typeof r == "function" && r();
    };
  }), t.a.length && ph(() => {
    Ef(e, n), eh(t.a);
  });
}
function Ef(i, e) {
  if (i.l.s)
    for (const t of i.l.s) u(t);
  e();
}
function it(i, e, t, n) {
  var Z;
  var s = !fr || (t & Pm) !== 0, r = (t & Zm) !== 0, o = (t & Cm) !== 0, l = (
    /** @type {V} */
    n
  ), a = !0, h = (
    /** @type {Derived<V> | undefined} */
    void 0
  ), c = () => o && s ? (h ?? (h = /* @__PURE__ */ Hs(
    /** @type {() => V} */
    n
  )), u(h)) : (a && (a = !1, l = o ? b(
    /** @type {() => V} */
    n
  ) : (
    /** @type {V} */
    n
  )), l);
  let f;
  if (r) {
    var d = un in i || Im in i;
    f = ((Z = As(i, e)) == null ? void 0 : Z.set) ?? (d && e in i ? (E) => i[e] = E : void 0);
  }
  var p, O = !1;
  r ? [p, O] = rv(() => (
    /** @type {V} */
    i[e]
  )) : p = /** @type {V} */
  i[e], p === void 0 && n !== void 0 && (p = c(), f && (s && Gm(), f(p)));
  var g;
  if (s ? g = () => {
    var E = (
      /** @type {V} */
      i[e]
    );
    return E === void 0 ? c() : (a = !0, E);
  } : g = () => {
    var E = (
      /** @type {V} */
      i[e]
    );
    return E !== void 0 && (l = /** @type {V} */
    void 0), E === void 0 ? l : E;
  }, s && (t & Tm) === 0)
    return g;
  if (f) {
    var m = i.$$legacy;
    return (
      /** @type {() => V} */
      (function(E, M) {
        return arguments.length > 0 ? ((!s || !M || m || O) && f(M ? g() : E), E) : g();
      })
    );
  }
  var v = !1, y = ((t & _m) !== 0 ? Hs : yt)(() => (v = !1, g()));
  r && u(y);
  var $ = (
    /** @type {Effect} */
    ke
  );
  return (
    /** @type {() => V} */
    (function(E, M) {
      if (arguments.length > 0) {
        const A = M ? u(y) : s && r ? Zs(E) : E;
        return k(y, A), v = !0, l !== void 0 && (l = A), E;
      }
      return On && v || ($.f & vi) !== 0 ? y.v : u(y);
    })
  );
}
const er = 160, tr = 40, hl = 24;
function l0(i, e, t) {
  return i.x < e.x + e.w + t && i.x + i.w + t > e.x && i.y < e.y + e.h + t && i.y + i.h + t > e.y;
}
function Af(i) {
  return { x: i.x, y: i.y, w: er, h: tr };
}
function Rf(i, e, t) {
  const n = Af(e);
  for (const s of Object.values(i.nodes))
    if (!(t && s.id === t) && s.position && l0(n, Af(s.position), hl))
      return !0;
  return !1;
}
const a0 = er / 4, h0 = 40;
function vp(i, e, t) {
  if (!Rf(i, e, t)) return e;
  for (let s = 1; s <= h0; s++) {
    const r = s * a0, o = [
      { x: e.x + r, y: e.y },
      { x: e.x - r, y: e.y },
      { x: e.x, y: e.y + r },
      { x: e.x, y: e.y - r },
      { x: e.x + r, y: e.y + r },
      { x: e.x + r, y: e.y - r },
      { x: e.x - r, y: e.y + r },
      { x: e.x - r, y: e.y - r }
    ];
    for (const l of o)
      if (!Rf(i, l, t)) return l;
  }
  let n = e.y;
  for (const s of Object.values(i.nodes))
    t && s.id === t || s.position && (n = Math.max(n, s.position.y + tr));
  return { x: e.x, y: n + hl };
}
const pt = zn({ nodes: {}, edges: [], toolEdges: [] }), Xn = zn(null), Jo = zn(null), $s = zn({
  triggerType: "rest",
  description: "",
  cronExpression: "",
  webhookUrl: ""
});
function c0(i) {
  pt.update((e) => ({ ...e, edges: [...e.edges, i] }));
}
function bp(i, e, t) {
  const n = `${i.replace(/:/g, "_")}_${Date.now()}`;
  return pt.update((s) => ({
    ...s,
    nodes: {
      ...s.nodes,
      [n]: { id: n, type: i, label: e, config: {}, position: vp(s, t) }
    }
  })), n;
}
function f0(i, e) {
  pt.update((t) => ({
    ...t,
    nodes: {
      ...t.nodes,
      [i]: { ...t.nodes[i], position: vp(t, e, i) }
    }
  }));
}
var yp = Object.defineProperty, u0 = (i, e, t) => e in i ? yp(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, d0 = (i, e) => {
  for (var t in e) yp(i, t, { get: e[t], enumerable: !0 });
}, p0 = (i, e, t) => u0(i, e + "", t), O0 = {};
d0(O0, { Graph: () => ki, alg: () => _c, json: () => xp, version: () => v0 });
var g0 = Object.defineProperty, wp = (i, e) => {
  for (var t in e) g0(i, t, { get: e[t], enumerable: !0 });
}, ki = class {
  constructor(i) {
    this._isDirected = !0, this._isMultigraph = !1, this._isCompound = !1, this._nodes = {}, this._in = {}, this._preds = {}, this._out = {}, this._sucs = {}, this._edgeObjs = {}, this._edgeLabels = {}, this._nodeCount = 0, this._edgeCount = 0, this._defaultNodeLabelFn = () => {
    }, this._defaultEdgeLabelFn = () => {
    }, i && (this._isDirected = "directed" in i ? i.directed : !0, this._isMultigraph = "multigraph" in i ? i.multigraph : !1, this._isCompound = "compound" in i ? i.compound : !1), this._isCompound && (this._parent = {}, this._children = {}, this._children["\0"] = {});
  }
  isDirected() {
    return this._isDirected;
  }
  isMultigraph() {
    return this._isMultigraph;
  }
  isCompound() {
    return this._isCompound;
  }
  setGraph(i) {
    return this._label = i, this;
  }
  graph() {
    return this._label;
  }
  setDefaultNodeLabel(i) {
    return typeof i != "function" ? this._defaultNodeLabelFn = () => i : this._defaultNodeLabelFn = i, this;
  }
  nodeCount() {
    return this._nodeCount;
  }
  nodes() {
    return Object.keys(this._nodes);
  }
  sources() {
    return this.nodes().filter((i) => Object.keys(this._in[i]).length === 0);
  }
  sinks() {
    return this.nodes().filter((i) => Object.keys(this._out[i]).length === 0);
  }
  setNodes(i, e) {
    return i.forEach((t) => {
      e !== void 0 ? this.setNode(t, e) : this.setNode(t);
    }), this;
  }
  setNode(i, e) {
    return i in this._nodes ? (arguments.length > 1 && (this._nodes[i] = e), this) : (this._nodes[i] = arguments.length > 1 ? e : this._defaultNodeLabelFn(i), this._isCompound && (this._parent[i] = "\0", this._children[i] = {}, this._children["\0"][i] = !0), this._in[i] = {}, this._preds[i] = {}, this._out[i] = {}, this._sucs[i] = {}, ++this._nodeCount, this);
  }
  node(i) {
    return this._nodes[i];
  }
  hasNode(i) {
    return i in this._nodes;
  }
  removeNode(i) {
    if (i in this._nodes) {
      let e = (t) => this.removeEdge(this._edgeObjs[t]);
      delete this._nodes[i], this._isCompound && (this._removeFromParentsChildList(i), delete this._parent[i], this.children(i).forEach((t) => {
        this.setParent(t);
      }), delete this._children[i]), Object.keys(this._in[i]).forEach(e), delete this._in[i], delete this._preds[i], Object.keys(this._out[i]).forEach(e), delete this._out[i], delete this._sucs[i], --this._nodeCount;
    }
    return this;
  }
  setParent(i, e) {
    if (!this._isCompound) throw new Error("Cannot set parent in a non-compound graph");
    if (e === void 0) e = "\0";
    else {
      e += "";
      for (let t = e; t !== void 0; t = this.parent(t)) if (t === i) throw new Error("Setting " + e + " as parent of " + i + " would create a cycle");
      this.setNode(e);
    }
    return this.setNode(i), this._removeFromParentsChildList(i), this._parent[i] = e, this._children[e][i] = !0, this;
  }
  parent(i) {
    if (this._isCompound) {
      let e = this._parent[i];
      if (e !== "\0") return e;
    }
  }
  children(i = "\0") {
    if (this._isCompound) {
      let e = this._children[i];
      if (e) return Object.keys(e);
    } else {
      if (i === "\0") return this.nodes();
      if (this.hasNode(i)) return [];
    }
    return [];
  }
  predecessors(i) {
    let e = this._preds[i];
    if (e) return Object.keys(e);
  }
  successors(i) {
    let e = this._sucs[i];
    if (e) return Object.keys(e);
  }
  neighbors(i) {
    let e = this.predecessors(i);
    if (e) {
      let t = new Set(e);
      for (let n of this.successors(i)) t.add(n);
      return Array.from(t.values());
    }
  }
  isLeaf(i) {
    let e;
    return this.isDirected() ? e = this.successors(i) : e = this.neighbors(i), e.length === 0;
  }
  filterNodes(i) {
    let e = new this.constructor({ directed: this._isDirected, multigraph: this._isMultigraph, compound: this._isCompound });
    e.setGraph(this.graph()), Object.entries(this._nodes).forEach(([s, r]) => {
      i(s) && e.setNode(s, r);
    }), Object.values(this._edgeObjs).forEach((s) => {
      e.hasNode(s.v) && e.hasNode(s.w) && e.setEdge(s, this.edge(s));
    });
    let t = {}, n = (s) => {
      let r = this.parent(s);
      return !r || e.hasNode(r) ? (t[s] = r ?? void 0, r ?? void 0) : r in t ? t[r] : n(r);
    };
    return this._isCompound && e.nodes().forEach((s) => e.setParent(s, n(s))), e;
  }
  setDefaultEdgeLabel(i) {
    return typeof i != "function" ? this._defaultEdgeLabelFn = () => i : this._defaultEdgeLabelFn = i, this;
  }
  edgeCount() {
    return this._edgeCount;
  }
  edges() {
    return Object.values(this._edgeObjs);
  }
  setPath(i, e) {
    return i.reduce((t, n) => (e !== void 0 ? this.setEdge(t, n, e) : this.setEdge(t, n), n)), this;
  }
  setEdge(i, e, t, n) {
    let s, r, o, l, a = !1;
    typeof i == "object" && i !== null && "v" in i ? (s = i.v, r = i.w, o = i.name, arguments.length === 2 && (l = e, a = !0)) : (s = i, r = e, o = n, arguments.length > 2 && (l = t, a = !0)), s = "" + s, r = "" + r, o !== void 0 && (o = "" + o);
    let h = Zr(this._isDirected, s, r, o);
    if (h in this._edgeLabels) return a && (this._edgeLabels[h] = l), this;
    if (o !== void 0 && !this._isMultigraph) throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(s), this.setNode(r), this._edgeLabels[h] = a ? l : this._defaultEdgeLabelFn(s, r, o);
    let c = m0(this._isDirected, s, r, o);
    return s = c.v, r = c.w, Object.freeze(c), this._edgeObjs[h] = c, Mf(this._preds[r], s), Mf(this._sucs[s], r), this._in[r][h] = c, this._out[s][h] = c, this._edgeCount++, this;
  }
  edge(i, e, t) {
    let n = arguments.length === 1 ? wa(this._isDirected, i) : Zr(this._isDirected, i, e, t);
    return this._edgeLabels[n];
  }
  edgeAsObj(i, e, t) {
    let n = arguments.length === 1 ? this.edge(i) : this.edge(i, e, t);
    return typeof n != "object" ? { label: n } : n;
  }
  hasEdge(i, e, t) {
    return (arguments.length === 1 ? wa(this._isDirected, i) : Zr(this._isDirected, i, e, t)) in this._edgeLabels;
  }
  removeEdge(i, e, t) {
    let n = arguments.length === 1 ? wa(this._isDirected, i) : Zr(this._isDirected, i, e, t), s = this._edgeObjs[n];
    if (s) {
      let r = s.v, o = s.w;
      delete this._edgeLabels[n], delete this._edgeObjs[n], Xf(this._preds[o], r), Xf(this._sucs[r], o), delete this._in[o][n], delete this._out[r][n], this._edgeCount--;
    }
    return this;
  }
  inEdges(i, e) {
    return this.isDirected() ? this.filterEdges(this._in[i], i, e) : this.nodeEdges(i, e);
  }
  outEdges(i, e) {
    return this.isDirected() ? this.filterEdges(this._out[i], i, e) : this.nodeEdges(i, e);
  }
  nodeEdges(i, e) {
    if (i in this._nodes) return this.filterEdges({ ...this._in[i], ...this._out[i] }, i, e);
  }
  _removeFromParentsChildList(i) {
    delete this._children[this._parent[i]][i];
  }
  filterEdges(i, e, t) {
    if (!i) return;
    let n = Object.values(i);
    return t ? n.filter((s) => s.v === e && s.w === t || s.v === t && s.w === e) : n;
  }
};
function Mf(i, e) {
  i[e] ? i[e]++ : i[e] = 1;
}
function Xf(i, e) {
  i[e] !== void 0 && !--i[e] && delete i[e];
}
function Zr(i, e, t, n) {
  let s = "" + e, r = "" + t;
  if (!i && s > r) {
    let o = s;
    s = r, r = o;
  }
  return s + "" + r + "" + (n === void 0 ? "\0" : n);
}
function m0(i, e, t, n) {
  let s = "" + e, r = "" + t;
  if (!i && s > r) {
    let l = s;
    s = r, r = l;
  }
  let o = { v: s, w: r };
  return n && (o.name = n), o;
}
function wa(i, e) {
  return Zr(i, e.v, e.w, e.name);
}
var v0 = "4.0.1", xp = {};
wp(xp, { read: () => x0, write: () => b0 });
function b0(i) {
  let e = { options: { directed: i.isDirected(), multigraph: i.isMultigraph(), compound: i.isCompound() }, nodes: y0(i), edges: w0(i) }, t = i.graph();
  return t !== void 0 && (e.value = structuredClone(t)), e;
}
function y0(i) {
  return i.nodes().map((e) => {
    let t = i.node(e), n = i.parent(e), s = { v: e };
    return t !== void 0 && (s.value = t), n !== void 0 && (s.parent = n), s;
  });
}
function w0(i) {
  return i.edges().map((e) => {
    let t = i.edge(e), n = { v: e.v, w: e.w };
    return e.name !== void 0 && (n.name = e.name), t !== void 0 && (n.value = t), n;
  });
}
function x0(i) {
  let e = new ki(i.options);
  return i.value !== void 0 && e.setGraph(i.value), i.nodes.forEach((t) => {
    e.setNode(t.v, t.value), t.parent && e.setParent(t.v, t.parent);
  }), i.edges.forEach((t) => {
    e.setEdge({ v: t.v, w: t.w, name: t.name }, t.value);
  }), e;
}
var _c = {};
wp(_c, { CycleException: () => fl, bellmanFord: () => Sp, components: () => Q0, dijkstra: () => cl, dijkstraAll: () => P0, findCycles: () => T0, floydWarshall: () => C0, isAcyclic: () => A0, postorder: () => M0, preorder: () => X0, prim: () => j0, shortestPaths: () => L0, tarjan: () => Qp, topsort: () => $p });
var S0 = () => 1;
function Sp(i, e, t, n) {
  return k0(i, String(e), t || S0, n || function(s) {
    return i.outEdges(s);
  });
}
function k0(i, e, t, n) {
  let s = {}, r, o = 0, l = i.nodes(), a = function(f) {
    let d = t(f);
    s[f.v].distance + d < s[f.w].distance && (s[f.w] = { distance: s[f.v].distance + d, predecessor: f.v }, r = !0);
  }, h = function() {
    l.forEach(function(f) {
      n(f).forEach(function(d) {
        let p = d.v === f ? d.v : d.w, O = p === d.v ? d.w : d.v;
        a({ v: p, w: O });
      });
    });
  };
  l.forEach(function(f) {
    let d = f === e ? 0 : Number.POSITIVE_INFINITY;
    s[f] = { distance: d, predecessor: "" };
  });
  let c = l.length;
  for (let f = 1; f < c && (r = !1, o++, h(), !!r); f++) ;
  if (o === c - 1 && (r = !1, h(), r)) throw new Error("The graph contains a negative weight cycle");
  return s;
}
function Q0(i) {
  let e = {}, t = [], n;
  function s(r) {
    r in e || (e[r] = !0, n.push(r), i.successors(r).forEach(s), i.predecessors(r).forEach(s));
  }
  return i.nodes().forEach(function(r) {
    n = [], s(r), n.length && t.push(n);
  }), t;
}
var kp = class {
  constructor() {
    this._arr = [], this._keyIndices = {};
  }
  size() {
    return this._arr.length;
  }
  keys() {
    return this._arr.map((i) => i.key);
  }
  has(i) {
    return i in this._keyIndices;
  }
  priority(i) {
    let e = this._keyIndices[i];
    if (e !== void 0) return this._arr[e].priority;
  }
  min() {
    if (this.size() === 0) throw new Error("Queue underflow");
    return this._arr[0].key;
  }
  add(i, e) {
    let t = this._keyIndices, n = String(i);
    if (!(n in t)) {
      let s = this._arr, r = s.length;
      return t[n] = r, s.push({ key: n, priority: e }), this._decrease(r), !0;
    }
    return !1;
  }
  removeMin() {
    this._swap(0, this._arr.length - 1);
    let i = this._arr.pop();
    return delete this._keyIndices[i.key], this._heapify(0), i.key;
  }
  decrease(i, e) {
    let t = this._keyIndices[i];
    if (t === void 0) throw new Error(`Key not found: ${i}`);
    let n = this._arr[t].priority;
    if (e > n) throw new Error(`New priority is greater than current priority. Key: ${i} Old: ${n} New: ${e}`);
    this._arr[t].priority = e, this._decrease(t);
  }
  _heapify(i) {
    let e = this._arr, t = 2 * i, n = t + 1, s = i;
    t < e.length && (s = e[t].priority < e[s].priority ? t : s, n < e.length && (s = e[n].priority < e[s].priority ? n : s), s !== i && (this._swap(i, s), this._heapify(s)));
  }
  _decrease(i) {
    let e = this._arr, t = e[i].priority, n;
    for (; i !== 0 && (n = i >> 1, !(e[n].priority < t)); ) this._swap(i, n), i = n;
  }
  _swap(i, e) {
    let t = this._arr, n = this._keyIndices, s = t[i], r = t[e];
    t[i] = r, t[e] = s, n[r.key] = i, n[s.key] = e;
  }
}, $0 = () => 1;
function cl(i, e, t, n) {
  let s = function(r) {
    return i.outEdges(r);
  };
  return _0(i, String(e), t || $0, n || s);
}
function _0(i, e, t, n) {
  let s = {}, r = new kp(), o, l, a = function(h) {
    let c = h.v !== o ? h.v : h.w, f = s[c], d = t(h), p = l.distance + d;
    if (d < 0) throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + h + " Weight: " + d);
    p < f.distance && (f.distance = p, f.predecessor = o, r.decrease(c, p));
  };
  for (i.nodes().forEach(function(h) {
    let c = h === e ? 0 : Number.POSITIVE_INFINITY;
    s[h] = { distance: c, predecessor: "" }, r.add(h, c);
  }); r.size() > 0 && (o = r.removeMin(), l = s[o], l.distance !== Number.POSITIVE_INFINITY); ) n(o).forEach(a);
  return s;
}
function P0(i, e, t) {
  return i.nodes().reduce(function(n, s) {
    return n[s] = cl(i, s, e, t), n;
  }, {});
}
function Qp(i) {
  let e = 0, t = [], n = {}, s = [];
  function r(o) {
    let l = n[o] = { onStack: !0, lowlink: e, index: e++ };
    if (t.push(o), i.successors(o).forEach(function(a) {
      a in n ? n[a].onStack && (l.lowlink = Math.min(l.lowlink, n[a].index)) : (r(a), l.lowlink = Math.min(l.lowlink, n[a].lowlink));
    }), l.lowlink === l.index) {
      let a = [], h;
      do
        h = t.pop(), n[h].onStack = !1, a.push(h);
      while (o !== h);
      s.push(a);
    }
  }
  return i.nodes().forEach(function(o) {
    o in n || r(o);
  }), s;
}
function T0(i) {
  return Qp(i).filter(function(e) {
    return e.length > 1 || e.length === 1 && i.hasEdge(e[0], e[0]);
  });
}
var Z0 = () => 1;
function C0(i, e, t) {
  return E0(i, e || Z0, t || function(n) {
    return i.outEdges(n);
  });
}
function E0(i, e, t) {
  let n = {}, s = i.nodes();
  return s.forEach(function(r) {
    n[r] = {}, n[r][r] = { distance: 0, predecessor: "" }, s.forEach(function(o) {
      r !== o && (n[r][o] = { distance: Number.POSITIVE_INFINITY, predecessor: "" });
    }), t(r).forEach(function(o) {
      let l = o.v === r ? o.w : o.v, a = e(o);
      n[r][l] = { distance: a, predecessor: r };
    });
  }), s.forEach(function(r) {
    let o = n[r];
    s.forEach(function(l) {
      let a = n[l];
      s.forEach(function(h) {
        let c = a[r], f = o[h], d = a[h], p = c.distance + f.distance;
        p < d.distance && (d.distance = p, d.predecessor = f.predecessor);
      });
    });
  }), n;
}
var fl = class extends Error {
  constructor(...i) {
    super(...i);
  }
};
function $p(i) {
  let e = {}, t = {}, n = [];
  function s(r) {
    if (r in t) throw new fl();
    r in e || (t[r] = !0, e[r] = !0, i.predecessors(r).forEach(s), delete t[r], n.push(r));
  }
  if (i.sinks().forEach(s), Object.keys(e).length !== i.nodeCount()) throw new fl();
  return n;
}
function A0(i) {
  try {
    $p(i);
  } catch (e) {
    if (e instanceof fl) return !1;
    throw e;
  }
  return !0;
}
function R0(i, e, t, n, s) {
  Array.isArray(e) || (e = [e]);
  let r = ((l) => {
    var a;
    return (a = i.isDirected() ? i.successors(l) : i.neighbors(l)) != null ? a : [];
  }), o = {};
  return e.forEach(function(l) {
    if (!i.hasNode(l)) throw new Error("Graph does not have node: " + l);
    s = _p(i, l, t === "post", o, r, n, s);
  }), s;
}
function _p(i, e, t, n, s, r, o) {
  return e in n || (n[e] = !0, t || (o = r(o, e)), s(e).forEach(function(l) {
    o = _p(i, l, t, n, s, r, o);
  }), t && (o = r(o, e))), o;
}
function Pp(i, e, t) {
  return R0(i, e, t, function(n, s) {
    return n.push(s), n;
  }, []);
}
function M0(i, e) {
  return Pp(i, e, "post");
}
function X0(i, e) {
  return Pp(i, e, "pre");
}
function j0(i, e) {
  let t = new ki(), n = {}, s = new kp(), r;
  function o(a) {
    let h = a.v === r ? a.w : a.v, c = s.priority(h);
    if (c !== void 0) {
      let f = e(a);
      f < c && (n[h] = r, s.decrease(h, f));
    }
  }
  if (i.nodeCount() === 0) return t;
  i.nodes().forEach(function(a) {
    s.add(a, Number.POSITIVE_INFINITY), t.setNode(a);
  }), s.decrease(i.nodes()[0], 0);
  let l = !1;
  for (; s.size() > 0; ) {
    if (r = s.removeMin(), r in n) t.setEdge(r, n[r]);
    else {
      if (l) throw new Error("Input graph is not connected: " + i);
      l = !0;
    }
    i.nodeEdges(r).forEach(o);
  }
  return t;
}
function L0(i, e, t, n) {
  return I0(i, e, t, n ?? ((s) => {
    let r = i.outEdges(s);
    return r ?? [];
  }));
}
function I0(i, e, t, n) {
  if (t === void 0) return cl(i, e, t, n);
  let s = !1, r = i.nodes();
  for (let o = 0; o < r.length; o++) {
    let l = n(r[o]);
    for (let a = 0; a < l.length; a++) {
      let h = l[a], c = h.v === r[o] ? h.v : h.w, f = c === h.v ? h.w : h.v;
      t({ v: c, w: f }) < 0 && (s = !0);
    }
    if (s) return Sp(i, e, t, n);
  }
  return cl(i, e, t, n);
}
function pr(i, e, t, n) {
  let s = n;
  for (; i.hasNode(s); ) s = Pc(n);
  return t.dummy = e, i.setNode(s, t), s;
}
function D0(i) {
  let e = new ki().setGraph(i.graph());
  return i.nodes().forEach((t) => e.setNode(t, i.node(t))), i.edges().forEach((t) => {
    let n = e.edge(t.v, t.w) || { weight: 0, minlen: 1 }, s = i.edge(t);
    e.setEdge(t.v, t.w, { weight: n.weight + s.weight, minlen: Math.max(n.minlen, s.minlen) });
  }), e;
}
function Tp(i) {
  let e = new ki({ multigraph: i.isMultigraph() }).setGraph(i.graph());
  return i.nodes().forEach((t) => {
    i.children(t).length || e.setNode(t, i.node(t));
  }), i.edges().forEach((t) => {
    e.setEdge(t, i.edge(t));
  }), e;
}
function jf(i, e) {
  let t = i.x, n = i.y, s = e.x - t, r = e.y - n, o = i.width / 2, l = i.height / 2;
  if (!s && !r) throw new Error("Not possible to find intersection inside of the rectangle");
  let a, h;
  return Math.abs(r) * o > Math.abs(s) * l ? (r < 0 && (l = -l), a = l * s / r, h = l) : (s < 0 && (o = -o), a = o, h = o * r / s), { x: t + a, y: n + h };
}
function ql(i) {
  let e = Gr(Cp(i) + 1).map(() => []);
  return i.nodes().forEach((t) => {
    let n = i.node(t), s = n.rank;
    s !== void 0 && (e[s] || (e[s] = []), e[s][n.order] = t);
  }), e;
}
function z0(i) {
  let e = i.nodes().map((n) => {
    let s = i.node(n).rank;
    return s === void 0 ? Number.MAX_VALUE : s;
  }), t = Bi(Math.min, e);
  i.nodes().forEach((n) => {
    let s = i.node(n);
    Object.hasOwn(s, "rank") && (s.rank -= t);
  });
}
function N0(i) {
  let e = i.nodes().map((o) => i.node(o).rank).filter((o) => o !== void 0), t = Bi(Math.min, e), n = [];
  i.nodes().forEach((o) => {
    let l = i.node(o).rank - t;
    n[l] || (n[l] = []), n[l].push(o);
  });
  let s = 0, r = i.graph().nodeRankFactor;
  Array.from(n).forEach((o, l) => {
    o === void 0 && l % r !== 0 ? --s : o !== void 0 && s && o.forEach((a) => i.node(a).rank += s);
  });
}
function Lf(i, e, t, n) {
  let s = { width: 0, height: 0 };
  return arguments.length >= 4 && (s.rank = t, s.order = n), pr(i, "border", s, e);
}
function Y0(i, e = Zp) {
  let t = [];
  for (let n = 0; n < i.length; n += e) {
    let s = i.slice(n, n + e);
    t.push(s);
  }
  return t;
}
var Zp = 65535;
function Bi(i, e) {
  if (e.length > Zp) {
    let t = Y0(e);
    return i(...t.map((n) => i(...n)));
  } else return i(...e);
}
function Cp(i) {
  let e = i.nodes().map((t) => {
    let n = i.node(t).rank;
    return n === void 0 ? Number.MIN_VALUE : n;
  });
  return Bi(Math.max, e);
}
function W0(i, e) {
  let t = { lhs: [], rhs: [] };
  return i.forEach((n) => {
    e(n) ? t.lhs.push(n) : t.rhs.push(n);
  }), t;
}
function q0(i, e) {
  let t = Date.now();
  try {
    return e();
  } finally {
    console.log(i + " time: " + (Date.now() - t) + "ms");
  }
}
function V0(i, e) {
  return e();
}
var B0 = 0;
function Pc(i) {
  let e = ++B0;
  return i + ("" + e);
}
function Gr(i, e, t = 1) {
  e == null && (e = i, i = 0);
  let n = (r) => r < e;
  t < 0 && (n = (r) => e < r);
  let s = [];
  for (let r = i; n(r); r += t) s.push(r);
  return s;
}
function ul(i, e) {
  let t = {};
  for (let n of e) i[n] !== void 0 && (t[n] = i[n]);
  return t;
}
function Vl(i, e) {
  let t;
  return typeof e == "string" ? t = (n) => n[e] : t = e, Object.entries(i).reduce((n, [s, r]) => (n[s] = t(r, s), n), {});
}
function G0(i, e) {
  return i.reduce((t, n, s) => (t[n] = e[s], t), {});
}
var Bl = "\0", U0 = class {
  constructor() {
    p0(this, "_sentinel");
    let i = {};
    i._next = i._prev = i, this._sentinel = i;
  }
  dequeue() {
    let i = this._sentinel, e = i._prev;
    if (e !== i) return If(e), e;
  }
  enqueue(i) {
    let e = this._sentinel;
    i._prev && i._next && If(i), i._next = e._next, e._next._prev = i, e._next = i, i._prev = e;
  }
  toString() {
    let i = [], e = this._sentinel, t = e._prev;
    for (; t !== e; ) i.push(JSON.stringify(t, F0)), t = t._prev;
    return "[" + i.join(", ") + "]";
  }
};
function If(i) {
  i._prev._next = i._next, i._next._prev = i._prev, delete i._next, delete i._prev;
}
function F0(i, e) {
  if (i !== "_next" && i !== "_prev") return e;
}
var H0 = U0, K0 = () => 1;
function J0(i, e) {
  if (i.nodeCount() <= 1) return [];
  let t = tb(i, e || K0);
  return eb(t.graph, t.buckets, t.zeroIdx).flatMap((n) => i.outEdges(n.v, n.w) || []);
}
function eb(i, e, t) {
  var n;
  let s = [], r = e[e.length - 1], o = e[0], l;
  for (; i.nodeCount(); ) {
    for (; l = o.dequeue(); ) xa(i, e, t, l);
    for (; l = r.dequeue(); ) xa(i, e, t, l);
    if (i.nodeCount()) {
      for (let a = e.length - 2; a > 0; --a) if (l = (n = e[a]) == null ? void 0 : n.dequeue(), l) {
        s = s.concat(xa(i, e, t, l, !0) || []);
        break;
      }
    }
  }
  return s;
}
function xa(i, e, t, n, s) {
  let r = [], o = s ? r : void 0;
  return (i.inEdges(n.v) || []).forEach((l) => {
    let a = i.edge(l), h = i.node(l.v);
    s && r.push({ v: l.v, w: l.w }), h.out -= a, yh(e, t, h);
  }), (i.outEdges(n.v) || []).forEach((l) => {
    let a = i.edge(l), h = l.w, c = i.node(h);
    c.in -= a, yh(e, t, c);
  }), i.removeNode(n.v), o;
}
function tb(i, e) {
  let t = new ki(), n = 0, s = 0;
  i.nodes().forEach((l) => {
    t.setNode(l, { v: l, in: 0, out: 0 });
  }), i.edges().forEach((l) => {
    let a = t.edge(l.v, l.w) || 0, h = e(l), c = a + h;
    t.setEdge(l.v, l.w, c);
    let f = t.node(l.v), d = t.node(l.w);
    s = Math.max(s, f.out += h), n = Math.max(n, d.in += h);
  });
  let r = ib(s + n + 3).map(() => new H0()), o = n + 1;
  return t.nodes().forEach((l) => {
    yh(r, o, t.node(l));
  }), { graph: t, buckets: r, zeroIdx: o };
}
function yh(i, e, t) {
  var n, s, r;
  t.out ? t.in ? (r = i[t.out - t.in + e]) == null || r.enqueue(t) : (s = i[i.length - 1]) == null || s.enqueue(t) : (n = i[0]) == null || n.enqueue(t);
}
function ib(i) {
  let e = [];
  for (let t = 0; t < i; t++) e.push(t);
  return e;
}
function nb(i) {
  (i.graph().acyclicer === "greedy" ? J0(i, e(i)) : sb(i)).forEach((t) => {
    let n = i.edge(t);
    i.removeEdge(t), n.forwardName = t.name, n.reversed = !0, i.setEdge(t.w, t.v, n, Pc("rev"));
  });
  function e(t) {
    return (n) => t.edge(n).weight;
  }
}
function sb(i) {
  let e = [], t = {}, n = {};
  function s(r) {
    Object.hasOwn(n, r) || (n[r] = !0, t[r] = !0, i.outEdges(r).forEach((o) => {
      Object.hasOwn(t, o.w) ? e.push(o) : s(o.w);
    }), delete t[r]);
  }
  return i.nodes().forEach(s), e;
}
function rb(i) {
  i.edges().forEach((e) => {
    let t = i.edge(e);
    if (t.reversed) {
      i.removeEdge(e);
      let n = t.forwardName;
      delete t.reversed, delete t.forwardName, i.setEdge(e.w, e.v, t, n);
    }
  });
}
function ob(i) {
  i.graph().dummyChains = [], i.edges().forEach((e) => lb(i, e));
}
function lb(i, e) {
  let t = e.v, n = i.node(t).rank, s = e.w, r = i.node(s).rank, o = e.name, l = i.edge(e), a = l.labelRank;
  if (r === n + 1) return;
  i.removeEdge(e);
  let h, c, f;
  for (f = 0, ++n; n < r; ++f, ++n) l.points = [], c = { width: 0, height: 0, edgeLabel: l, edgeObj: e, rank: n }, h = pr(i, "edge", c, "_d"), n === a && (c.width = l.width, c.height = l.height, c.dummy = "edge-label", c.labelpos = l.labelpos), i.setEdge(t, h, { weight: l.weight }, o), f === 0 && i.graph().dummyChains.push(h), t = h;
  i.setEdge(t, s, { weight: l.weight }, o);
}
function ab(i) {
  i.graph().dummyChains.forEach((e) => {
    let t = i.node(e), n = t.edgeLabel, s;
    for (i.setEdge(t.edgeObj, n); t.dummy; ) s = i.successors(e)[0], i.removeNode(e), n.points.push({ x: t.x, y: t.y }), t.dummy === "edge-label" && (n.x = t.x, n.y = t.y, n.width = t.width, n.height = t.height), e = s, t = i.node(e);
  });
}
function Tc(i) {
  let e = {};
  function t(n) {
    let s = i.node(n);
    if (Object.hasOwn(e, n)) return s.rank;
    e[n] = !0;
    let r = i.outEdges(n), o = r ? r.map((a) => a == null ? Number.POSITIVE_INFINITY : t(a.w) - i.edge(a).minlen) : [], l = Bi(Math.min, o);
    return l === Number.POSITIVE_INFINITY && (l = 0), s.rank = l;
  }
  i.sources().forEach(t);
}
function ir(i, e) {
  return i.node(e.w).rank - i.node(e.v).rank - i.edge(e).minlen;
}
var Ep = hb;
function hb(i) {
  let e = new ki({ directed: !1 }), t = i.nodes();
  if (t.length === 0) throw new Error("Graph must have at least one node");
  let n = t[0], s = i.nodeCount();
  e.setNode(n, {});
  let r, o;
  for (; cb(e, i) < s && (r = fb(e, i), !!r); ) o = e.hasNode(r.v) ? ir(i, r) : -ir(i, r), ub(e, i, o);
  return e;
}
function cb(i, e) {
  function t(n) {
    let s = e.nodeEdges(n);
    s && s.forEach((r) => {
      let o = r.v, l = n === o ? r.w : o;
      !i.hasNode(l) && !ir(e, r) && (i.setNode(l, {}), i.setEdge(n, l, {}), t(l));
    });
  }
  return i.nodes().forEach(t), i.nodeCount();
}
function fb(i, e) {
  return e.edges().reduce((t, n) => {
    let s = Number.POSITIVE_INFINITY;
    return i.hasNode(n.v) !== i.hasNode(n.w) && (s = ir(e, n)), s < t[0] ? [s, n] : t;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function ub(i, e, t) {
  i.nodes().forEach((n) => e.node(n).rank += t);
}
var { preorder: db, postorder: pb } = _c, Ob = ws;
ws.initLowLimValues = Cc;
ws.initCutValues = Zc;
ws.calcCutValue = Ap;
ws.leaveEdge = Mp;
ws.enterEdge = Xp;
ws.exchangeEdges = jp;
function ws(i) {
  i = D0(i), Tc(i);
  let e = Ep(i);
  Cc(e), Zc(e, i);
  let t, n;
  for (; t = Mp(e); ) n = Xp(e, i, t), jp(e, i, t, n);
}
function Zc(i, e) {
  let t = pb(i, i.nodes());
  t = t.slice(0, t.length - 1), t.forEach((n) => gb(i, e, n));
}
function gb(i, e, t) {
  let n = i.node(t).parent, s = i.edge(t, n);
  s.cutvalue = Ap(i, e, t);
}
function Ap(i, e, t) {
  let n = i.node(t).parent, s = !0, r = e.edge(t, n), o = 0;
  r || (s = !1, r = e.edge(n, t)), o = r.weight;
  let l = e.nodeEdges(t);
  return l && l.forEach((a) => {
    let h = a.v === t, c = h ? a.w : a.v;
    if (c !== n) {
      let f = h === s, d = e.edge(a).weight;
      if (o += f ? d : -d, vb(i, t, c)) {
        let p = i.edge(t, c).cutvalue;
        o += f ? -p : p;
      }
    }
  }), o;
}
function Cc(i, e) {
  arguments.length < 2 && (e = i.nodes()[0]), Rp(i, {}, 1, e);
}
function Rp(i, e, t, n, s) {
  let r = t, o = i.node(n);
  e[n] = !0;
  let l = i.neighbors(n);
  return l && l.forEach((a) => {
    Object.hasOwn(e, a) || (t = Rp(i, e, t, a, n));
  }), o.low = r, o.lim = t++, s ? o.parent = s : delete o.parent, t;
}
function Mp(i) {
  return i.edges().find((e) => i.edge(e).cutvalue < 0);
}
function Xp(i, e, t) {
  let n = t.v, s = t.w;
  e.hasEdge(n, s) || (n = t.w, s = t.v);
  let r = i.node(n), o = i.node(s), l = r, a = !1;
  return r.lim > o.lim && (l = o, a = !0), e.edges().filter((h) => a === Df(i, i.node(h.v), l) && a !== Df(i, i.node(h.w), l)).reduce((h, c) => ir(e, c) < ir(e, h) ? c : h);
}
function jp(i, e, t, n) {
  let s = t.v, r = t.w;
  i.removeEdge(s, r), i.setEdge(n.v, n.w, {}), Cc(i), Zc(i, e), mb(i, e);
}
function mb(i, e) {
  let t = i.nodes().find((s) => !i.node(s).parent);
  if (!t) return;
  let n = db(i, [t]);
  n = n.slice(1), n.forEach((s) => {
    let r = i.node(s).parent, o = e.edge(s, r), l = !1;
    o || (o = e.edge(r, s), l = !0), e.node(s).rank = e.node(r).rank + (l ? o.minlen : -o.minlen);
  });
}
function vb(i, e, t) {
  return i.hasEdge(e, t);
}
function Df(i, e, t) {
  return t.low <= e.lim && e.lim <= t.lim;
}
var bb = yb;
function yb(i) {
  let e = i.graph().ranker;
  if (typeof e == "function") return e(i);
  switch (e) {
    case "network-simplex":
      zf(i);
      break;
    case "tight-tree":
      xb(i);
      break;
    case "longest-path":
      wb(i);
      break;
    case "none":
      break;
    default:
      zf(i);
  }
}
var wb = Tc;
function xb(i) {
  Tc(i), Ep(i);
}
function zf(i) {
  Ob(i);
}
var Sb = kb;
function kb(i) {
  let e = $b(i);
  i.graph().dummyChains.forEach((t) => {
    let n = i.node(t), s = n.edgeObj, r = Qb(i, e, s.v, s.w), o = r.path, l = r.lca, a = 0, h = o[a], c = !0;
    for (; t !== s.w; ) {
      if (n = i.node(t), c) {
        for (; (h = o[a]) !== l && i.node(h).maxRank < n.rank; ) a++;
        h === l && (c = !1);
      }
      if (!c) {
        for (; a < o.length - 1 && i.node(o[a + 1]).minRank <= n.rank; ) a++;
        h = o[a];
      }
      h !== void 0 && i.setParent(t, h), t = i.successors(t)[0];
    }
  });
}
function Qb(i, e, t, n) {
  let s = [], r = [], o = Math.min(e[t].low, e[n].low), l = Math.max(e[t].lim, e[n].lim), a;
  a = t;
  do
    a = i.parent(a), s.push(a);
  while (a && (e[a].low > o || l > e[a].lim));
  let h = a, c = n;
  for (; (c = i.parent(c)) !== h; ) r.push(c);
  return { path: s.concat(r.reverse()), lca: h };
}
function $b(i) {
  let e = {}, t = 0;
  function n(s) {
    let r = t;
    i.children(s).forEach(n), e[s] = { low: r, lim: t++ };
  }
  return i.children(Bl).forEach(n), e;
}
function _b(i) {
  let e = pr(i, "root", {}, "_root"), t = Pb(i), n = Object.values(t), s = Bi(Math.max, n) - 1, r = 2 * s + 1;
  i.graph().nestingRoot = e, i.edges().forEach((l) => i.edge(l).minlen *= r);
  let o = Tb(i) + 1;
  i.children(Bl).forEach((l) => Lp(i, e, r, o, s, t, l)), i.graph().nodeRankFactor = r;
}
function Lp(i, e, t, n, s, r, o) {
  var l;
  let a = i.children(o);
  if (!a.length) {
    o !== e && i.setEdge(e, o, { weight: 0, minlen: t });
    return;
  }
  let h = Lf(i, "_bt"), c = Lf(i, "_bb"), f = i.node(o);
  i.setParent(h, o), f.borderTop = h, i.setParent(c, o), f.borderBottom = c, a.forEach((d) => {
    var p;
    Lp(i, e, t, n, s, r, d);
    let O = i.node(d), g = O.borderTop ? O.borderTop : d, m = O.borderBottom ? O.borderBottom : d, v = O.borderTop ? n : 2 * n, y = g !== m ? 1 : s - ((p = r[o]) != null ? p : 0) + 1;
    i.setEdge(h, g, { weight: v, minlen: y, nestingEdge: !0 }), i.setEdge(m, c, { weight: v, minlen: y, nestingEdge: !0 });
  }), i.parent(o) || i.setEdge(e, h, { weight: 0, minlen: s + ((l = r[o]) != null ? l : 0) });
}
function Pb(i) {
  let e = {};
  function t(n, s) {
    let r = i.children(n);
    r && r.length && r.forEach((o) => t(o, s + 1)), e[n] = s;
  }
  return i.children(Bl).forEach((n) => t(n, 1)), e;
}
function Tb(i) {
  return i.edges().reduce((e, t) => e + i.edge(t).weight, 0);
}
function Zb(i) {
  let e = i.graph();
  i.removeNode(e.nestingRoot), delete e.nestingRoot, i.edges().forEach((t) => {
    i.edge(t).nestingEdge && i.removeEdge(t);
  });
}
var Cb = Eb;
function Eb(i) {
  function e(t) {
    let n = i.children(t), s = i.node(t);
    if (n.length && n.forEach(e), Object.hasOwn(s, "minRank")) {
      s.borderLeft = [], s.borderRight = [];
      for (let r = s.minRank, o = s.maxRank + 1; r < o; ++r) Nf(i, "borderLeft", "_bl", t, s, r), Nf(i, "borderRight", "_br", t, s, r);
    }
  }
  i.children(Bl).forEach(e);
}
function Nf(i, e, t, n, s, r) {
  let o = { width: 0, height: 0, rank: r, borderType: e }, l = s[e][r - 1], a = pr(i, "border", o, t);
  s[e][r] = a, i.setParent(a, n), l && i.setEdge(l, a, { weight: 1 });
}
function Ab(i) {
  var e;
  let t = (e = i.graph().rankdir) == null ? void 0 : e.toLowerCase();
  (t === "lr" || t === "rl") && Ip(i);
}
function Rb(i) {
  var e;
  let t = (e = i.graph().rankdir) == null ? void 0 : e.toLowerCase();
  (t === "bt" || t === "rl") && Mb(i), (t === "lr" || t === "rl") && (Xb(i), Ip(i));
}
function Ip(i) {
  i.nodes().forEach((e) => Yf(i.node(e))), i.edges().forEach((e) => Yf(i.edge(e)));
}
function Yf(i) {
  let e = i.width;
  i.width = i.height, i.height = e;
}
function Mb(i) {
  i.nodes().forEach((e) => Sa(i.node(e))), i.edges().forEach((e) => {
    var t;
    let n = i.edge(e);
    (t = n.points) == null || t.forEach(Sa), Object.hasOwn(n, "y") && Sa(n);
  });
}
function Sa(i) {
  i.y = -i.y;
}
function Xb(i) {
  i.nodes().forEach((e) => ka(i.node(e))), i.edges().forEach((e) => {
    var t;
    let n = i.edge(e);
    (t = n.points) == null || t.forEach(ka), Object.hasOwn(n, "x") && ka(n);
  });
}
function ka(i) {
  let e = i.x;
  i.x = i.y, i.y = e;
}
function jb(i) {
  let e = {}, t = i.nodes().filter((l) => !i.children(l).length), n = t.map((l) => i.node(l).rank), s = Bi(Math.max, n), r = Gr(s + 1).map(() => []);
  function o(l) {
    if (e[l]) return;
    e[l] = !0;
    let a = i.node(l);
    r[a.rank].push(l);
    let h = i.successors(l);
    h && h.forEach(o);
  }
  return t.sort((l, a) => i.node(l).rank - i.node(a).rank).forEach(o), r;
}
function Lb(i, e) {
  let t = 0;
  for (let n = 1; n < e.length; ++n) t += Ib(i, e[n - 1], e[n]);
  return t;
}
function Ib(i, e, t) {
  let n = G0(t, t.map((h, c) => c)), s = e.flatMap((h) => {
    let c = i.outEdges(h);
    return c ? c.map((f) => ({ pos: n[f.w], weight: i.edge(f).weight })).sort((f, d) => f.pos - d.pos) : [];
  }), r = 1;
  for (; r < t.length; ) r <<= 1;
  let o = 2 * r - 1;
  r -= 1;
  let l = new Array(o).fill(0), a = 0;
  return s.forEach((h) => {
    let c = h.pos + r;
    l[c] += h.weight;
    let f = 0;
    for (; c > 0; ) c % 2 && (f += l[c + 1]), c = c - 1 >> 1, l[c] += h.weight;
    a += h.weight * f;
  }), a;
}
function Db(i, e = []) {
  return e.map((t) => {
    let n = i.inEdges(t);
    if (!n || !n.length) return { v: t };
    {
      let s = n.reduce((r, o) => {
        let l = i.edge(o), a = i.node(o.v);
        return { sum: r.sum + l.weight * a.order, weight: r.weight + l.weight };
      }, { sum: 0, weight: 0 });
      return { v: t, barycenter: s.sum / s.weight, weight: s.weight };
    }
  });
}
function zb(i, e) {
  let t = {};
  i.forEach((s, r) => {
    let o = { indegree: 0, in: [], out: [], vs: [s.v], i: r };
    s.barycenter !== void 0 && (o.barycenter = s.barycenter, o.weight = s.weight), t[s.v] = o;
  }), e.edges().forEach((s) => {
    let r = t[s.v], o = t[s.w];
    r !== void 0 && o !== void 0 && (o.indegree++, r.out.push(o));
  });
  let n = Object.values(t).filter((s) => !s.indegree);
  return Nb(n);
}
function Nb(i) {
  let e = [];
  function t(s) {
    return (r) => {
      r.merged || (r.barycenter === void 0 || s.barycenter === void 0 || r.barycenter >= s.barycenter) && Yb(s, r);
    };
  }
  function n(s) {
    return (r) => {
      r.in.push(s), --r.indegree === 0 && i.push(r);
    };
  }
  for (; i.length; ) {
    let s = i.pop();
    e.push(s), s.in.reverse().forEach(t(s)), s.out.forEach(n(s));
  }
  return e.filter((s) => !s.merged).map((s) => ul(s, ["vs", "i", "barycenter", "weight"]));
}
function Yb(i, e) {
  let t = 0, n = 0;
  i.weight && (t += i.barycenter * i.weight, n += i.weight), e.weight && (t += e.barycenter * e.weight, n += e.weight), i.vs = e.vs.concat(i.vs), i.barycenter = t / n, i.weight = n, i.i = Math.min(e.i, i.i), e.merged = !0;
}
function Wb(i, e) {
  let t = W0(i, (c) => Object.hasOwn(c, "barycenter")), n = t.lhs, s = t.rhs.sort((c, f) => f.i - c.i), r = [], o = 0, l = 0, a = 0;
  n.sort(qb(!!e)), a = Wf(r, s, a), n.forEach((c) => {
    a += c.vs.length, r.push(c.vs), o += c.barycenter * c.weight, l += c.weight, a = Wf(r, s, a);
  });
  let h = { vs: r.flat(1) };
  return l && (h.barycenter = o / l, h.weight = l), h;
}
function Wf(i, e, t) {
  let n;
  for (; e.length && (n = e[e.length - 1]).i <= t; ) e.pop(), i.push(n.vs), t++;
  return t;
}
function qb(i) {
  return (e, t) => e.barycenter < t.barycenter ? -1 : e.barycenter > t.barycenter ? 1 : i ? t.i - e.i : e.i - t.i;
}
function Dp(i, e, t, n) {
  let s = i.children(e), r = i.node(e), o = r ? r.borderLeft : void 0, l = r ? r.borderRight : void 0, a = {};
  o && (s = s.filter((d) => d !== o && d !== l));
  let h = Db(i, s);
  h.forEach((d) => {
    if (i.children(d.v).length) {
      let p = Dp(i, d.v, t, n);
      a[d.v] = p, Object.hasOwn(p, "barycenter") && Bb(d, p);
    }
  });
  let c = zb(h, t);
  Vb(c, a);
  let f = Wb(c, n);
  if (o && l) {
    f.vs = [o, f.vs, l].flat(1);
    let d = i.predecessors(o);
    if (d && d.length) {
      let p = i.node(d[0]), O = i.predecessors(l), g = i.node(O[0]);
      Object.hasOwn(f, "barycenter") || (f.barycenter = 0, f.weight = 0), f.barycenter = (f.barycenter * f.weight + p.order + g.order) / (f.weight + 2), f.weight += 2;
    }
  }
  return f;
}
function Vb(i, e) {
  i.forEach((t) => {
    t.vs = t.vs.flatMap((n) => e[n] ? e[n].vs : n);
  });
}
function Bb(i, e) {
  i.barycenter !== void 0 ? (i.barycenter = (i.barycenter * i.weight + e.barycenter * e.weight) / (i.weight + e.weight), i.weight += e.weight) : (i.barycenter = e.barycenter, i.weight = e.weight);
}
function Gb(i, e, t, n) {
  n || (n = i.nodes());
  let s = Ub(i), r = new ki({ compound: !0 }).setGraph({ root: s }).setDefaultNodeLabel((o) => i.node(o));
  return n.forEach((o) => {
    let l = i.node(o), a = i.parent(o);
    if (l.rank === e || l.minRank <= e && e <= l.maxRank) {
      r.setNode(o), r.setParent(o, a || s);
      let h = i[t](o);
      h && h.forEach((c) => {
        let f = c.v === o ? c.w : c.v, d = r.edge(f, o), p = d !== void 0 ? d.weight : 0;
        r.setEdge(f, o, { weight: i.edge(c).weight + p });
      }), Object.hasOwn(l, "minRank") && r.setNode(o, { borderLeft: l.borderLeft[e], borderRight: l.borderRight[e] });
    }
  }), r;
}
function Ub(i) {
  let e;
  for (; i.hasNode(e = Pc("_root")); ) ;
  return e;
}
function Fb(i, e, t) {
  let n = {}, s;
  t.forEach((r) => {
    let o = i.parent(r), l, a;
    for (; o; ) {
      if (l = i.parent(o), l ? (a = n[l], n[l] = o) : (a = s, s = o), a && a !== o) {
        e.setEdge(a, o);
        return;
      }
      o = l;
    }
  });
}
function zp(i, e = {}) {
  if (typeof e.customOrder == "function") {
    e.customOrder(i, zp);
    return;
  }
  let t = Cp(i), n = qf(i, Gr(1, t + 1), "inEdges"), s = qf(i, Gr(t - 1, -1, -1), "outEdges"), r = jb(i);
  if (Vf(i, r), e.disableOptimalOrderHeuristic) return;
  let o = Number.POSITIVE_INFINITY, l, a = e.constraints || [];
  for (let h = 0, c = 0; c < 4; ++h, ++c) {
    Hb(h % 2 ? n : s, h % 4 >= 2, a), r = ql(i);
    let f = Lb(i, r);
    f < o ? (c = 0, l = Object.assign({}, r), o = f) : f === o && (l = structuredClone(r));
  }
  Vf(i, l);
}
function qf(i, e, t) {
  let n = /* @__PURE__ */ new Map(), s = (r, o) => {
    n.has(r) || n.set(r, []), n.get(r).push(o);
  };
  for (let r of i.nodes()) {
    let o = i.node(r);
    if (typeof o.rank == "number" && s(o.rank, r), typeof o.minRank == "number" && typeof o.maxRank == "number") for (let l = o.minRank; l <= o.maxRank; l++) l !== o.rank && s(l, r);
  }
  return e.map(function(r) {
    return Gb(i, r, t, n.get(r) || []);
  });
}
function Hb(i, e, t) {
  let n = new ki();
  i.forEach(function(s) {
    t.forEach((l) => n.setEdge(l.left, l.right));
    let r = s.graph().root, o = Dp(s, r, n, e);
    o.vs.forEach((l, a) => s.node(l).order = a), Fb(s, n, o.vs);
  });
}
function Vf(i, e) {
  Object.values(e).forEach((t) => t.forEach((n, s) => i.node(n).order = s));
}
function Kb(i, e) {
  let t = {};
  function n(s, r) {
    let o = 0, l = 0, a = s.length, h = r[r.length - 1];
    return r.forEach((c, f) => {
      let d = e1(i, c), p = d ? i.node(d).order : a;
      (d || c === h) && (r.slice(l, f + 1).forEach((O) => {
        let g = i.predecessors(O);
        g && g.forEach((m) => {
          let v = i.node(m), y = v.order;
          (y < o || p < y) && !(v.dummy && i.node(O).dummy) && Np(t, m, O);
        });
      }), l = f + 1, o = p);
    }), r;
  }
  return e.length && e.reduce(n), t;
}
function Jb(i, e) {
  let t = {};
  function n(r, o, l, a, h) {
    Gr(o, l).forEach((c) => {
      let f = r[c];
      if (f !== void 0 && i.node(f).dummy) {
        let d = i.predecessors(f);
        d && d.forEach((p) => {
          if (p === void 0) return;
          let O = i.node(p);
          O.dummy && (O.order < a || O.order > h) && Np(t, p, f);
        });
      }
    });
  }
  function s(r, o) {
    let l = -1, a = -1, h = 0;
    return o.forEach((c, f) => {
      if (i.node(c).dummy === "border") {
        let d = i.predecessors(c);
        if (d && d.length) {
          let p = d[0];
          if (p === void 0) return;
          a = i.node(p).order, n(o, h, f, l, a), h = f, l = a;
        }
      }
      n(o, h, o.length, a, r.length);
    }), o;
  }
  return e.length && e.reduce(s), t;
}
function e1(i, e) {
  if (i.node(e).dummy) {
    let t = i.predecessors(e);
    if (t) return t.find((n) => i.node(n).dummy);
  }
}
function Np(i, e, t) {
  if (e > t) {
    let s = e;
    e = t, t = s;
  }
  let n = i[e];
  n || (i[e] = n = {}), n[t] = !0;
}
function t1(i, e, t) {
  if (e > t) {
    let s = e;
    e = t, t = s;
  }
  let n = i[e];
  return n !== void 0 && Object.hasOwn(n, t);
}
function i1(i, e, t, n) {
  let s = {}, r = {}, o = {};
  return e.forEach((l) => {
    l.forEach((a, h) => {
      s[a] = a, r[a] = a, o[a] = h;
    });
  }), e.forEach((l) => {
    let a = -1;
    l.forEach((h) => {
      let c = n(h);
      if (c && c.length) {
        let f = c.sort((p, O) => {
          let g = o[p], m = o[O];
          return (g !== void 0 ? g : 0) - (m !== void 0 ? m : 0);
        }), d = (f.length - 1) / 2;
        for (let p = Math.floor(d), O = Math.ceil(d); p <= O; ++p) {
          let g = f[p];
          if (g === void 0) continue;
          let m = o[g];
          if (m !== void 0 && r[h] === h && a < m && !t1(t, h, g)) {
            let v = s[g];
            v !== void 0 && (r[g] = h, r[h] = s[h] = v, a = m);
          }
        }
      }
    });
  }), { root: s, align: r };
}
function n1(i, e, t, n, s = !1) {
  let r = {}, o = s1(i, e, t, s), l = s ? "borderLeft" : "borderRight";
  function a(p, O) {
    let g = o.nodes().slice(), m = {}, v = g.pop();
    for (; v; ) {
      if (m[v]) p(v);
      else {
        m[v] = !0, g.push(v);
        for (let y of O(v)) g.push(y);
      }
      v = g.pop();
    }
  }
  function h(p) {
    let O = o.inEdges(p);
    O ? r[p] = O.reduce((g, m) => {
      var v;
      let y = (v = r[m.v]) != null ? v : 0, $ = o.edge(m);
      return Math.max(g, y + ($ !== void 0 ? $ : 0));
    }, 0) : r[p] = 0;
  }
  function c(p) {
    let O = o.outEdges(p), g = Number.POSITIVE_INFINITY;
    O && (g = O.reduce((v, y) => {
      let $ = r[y.w], Z = o.edge(y);
      return Math.min(v, ($ !== void 0 ? $ : 0) - (Z !== void 0 ? Z : 0));
    }, Number.POSITIVE_INFINITY));
    let m = i.node(p);
    g !== Number.POSITIVE_INFINITY && m.borderType !== l && (r[p] = Math.max(r[p] !== void 0 ? r[p] : 0, g));
  }
  function f(p) {
    return o.predecessors(p) || [];
  }
  function d(p) {
    return o.successors(p) || [];
  }
  return a(h, f), a(c, d), Object.keys(n).forEach((p) => {
    var O;
    let g = t[p];
    g !== void 0 && (r[p] = (O = r[g]) != null ? O : 0);
  }), r;
}
function s1(i, e, t, n) {
  let s = new ki(), r = i.graph(), o = h1(r.nodesep, r.edgesep, n);
  return e.forEach((l) => {
    let a;
    l.forEach((h) => {
      let c = t[h];
      if (c !== void 0) {
        if (s.setNode(c), a !== void 0) {
          let f = t[a];
          if (f !== void 0) {
            let d = s.edge(f, c);
            s.setEdge(f, c, Math.max(o(i, h, a), d || 0));
          }
        }
        a = h;
      }
    });
  }), s;
}
function r1(i, e) {
  return Object.values(e).reduce((t, n) => {
    let s = Number.NEGATIVE_INFINITY, r = Number.POSITIVE_INFINITY;
    Object.entries(n).forEach(([l, a]) => {
      let h = c1(i, l) / 2;
      s = Math.max(a + h, s), r = Math.min(a - h, r);
    });
    let o = s - r;
    return o < t[0] && (t = [o, n]), t;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function o1(i, e) {
  let t = Object.values(e), n = Bi(Math.min, t), s = Bi(Math.max, t);
  ["u", "d"].forEach((r) => {
    ["l", "r"].forEach((o) => {
      let l = r + o, a = i[l];
      if (!a || a === e) return;
      let h = Object.values(a), c = n - Bi(Math.min, h);
      o !== "l" && (c = s - Bi(Math.max, h)), c && (i[l] = Vl(a, (f) => f + c));
    });
  });
}
function l1(i, e = void 0) {
  let t = i.ul;
  return t ? Vl(t, (n, s) => {
    var r, o;
    if (e) {
      let a = e.toLowerCase(), h = i[a];
      if (h && h[s] !== void 0) return h[s];
    }
    let l = Object.values(i).map((a) => {
      let h = a[s];
      return h !== void 0 ? h : 0;
    }).sort((a, h) => a - h);
    return (((r = l[1]) != null ? r : 0) + ((o = l[2]) != null ? o : 0)) / 2;
  }) : {};
}
function a1(i) {
  let e = ql(i), t = Object.assign(Kb(i, e), Jb(i, e)), n = {}, s;
  ["u", "d"].forEach((o) => {
    s = o === "u" ? e : Object.values(e).reverse(), ["l", "r"].forEach((l) => {
      l === "r" && (s = s.map((c) => Object.values(c).reverse()));
      let a = i1(i, s, t, (c) => (o === "u" ? i.predecessors(c) : i.successors(c)) || []), h = n1(i, s, a.root, a.align, l === "r");
      l === "r" && (h = Vl(h, (c) => -c)), n[o + l] = h;
    });
  });
  let r = r1(i, n);
  return o1(n, r), l1(n, i.graph().align);
}
function h1(i, e, t) {
  return (n, s, r) => {
    let o = n.node(s), l = n.node(r), a = 0, h;
    if (a += o.width / 2, Object.hasOwn(o, "labelpos")) switch (o.labelpos.toLowerCase()) {
      case "l":
        h = -o.width / 2;
        break;
      case "r":
        h = o.width / 2;
        break;
    }
    if (h && (a += t ? h : -h), h = void 0, a += (o.dummy ? e : i) / 2, a += (l.dummy ? e : i) / 2, a += l.width / 2, Object.hasOwn(l, "labelpos")) switch (l.labelpos.toLowerCase()) {
      case "l":
        h = l.width / 2;
        break;
      case "r":
        h = -l.width / 2;
        break;
    }
    return h && (a += t ? h : -h), a;
  };
}
function c1(i, e) {
  return i.node(e).width;
}
function f1(i) {
  i = Tp(i), u1(i), Object.entries(a1(i)).forEach(([e, t]) => i.node(e).x = t);
}
function u1(i) {
  let e = ql(i), t = i.graph(), n = t.ranksep, s = t.rankalign, r = 0;
  e.forEach((o) => {
    let l = o.reduce((a, h) => {
      var c;
      let f = (c = i.node(h).height) != null ? c : 0;
      return a > f ? a : f;
    }, 0);
    o.forEach((a) => {
      let h = i.node(a);
      s === "top" ? h.y = r + h.height / 2 : s === "bottom" ? h.y = r + l - h.height / 2 : h.y = r + l / 2;
    }), r += l + n;
  });
}
function d1(i, e = {}) {
  let t = e.debugTiming ? q0 : V0;
  return t("layout", () => {
    let n = t("  buildLayoutGraph", () => S1(i));
    return t("  runLayout", () => p1(n, t, e)), t("  updateInputGraph", () => O1(i, n)), n;
  });
}
function p1(i, e, t) {
  e("    makeSpaceForEdgeLabels", () => k1(i)), e("    removeSelfEdges", () => A1(i)), e("    acyclic", () => nb(i)), e("    nestingGraph.run", () => _b(i)), e("    rank", () => bb(Tp(i))), e("    injectEdgeLabelProxies", () => Q1(i)), e("    removeEmptyRanks", () => N0(i)), e("    nestingGraph.cleanup", () => Zb(i)), e("    normalizeRanks", () => z0(i)), e("    assignRankMinMax", () => $1(i)), e("    removeEdgeLabelProxies", () => _1(i)), e("    normalize.run", () => ob(i)), e("    parentDummyChains", () => Sb(i)), e("    addBorderSegments", () => Cb(i)), e("    order", () => zp(i, t)), e("    insertSelfEdges", () => R1(i)), e("    adjustCoordinateSystem", () => Ab(i)), e("    position", () => f1(i)), e("    positionSelfEdges", () => M1(i)), e("    removeBorderNodes", () => E1(i)), e("    normalize.undo", () => ab(i)), e("    fixupEdgeLabelCoords", () => Z1(i)), e("    undoCoordinateSystem", () => Rb(i)), e("    translateGraph", () => P1(i)), e("    assignNodeIntersects", () => T1(i)), e("    reversePoints", () => C1(i)), e("    acyclic.undo", () => rb(i));
}
function O1(i, e) {
  i.nodes().forEach((t) => {
    let n = i.node(t), s = e.node(t);
    n && (n.x = s.x, n.y = s.y, n.order = s.order, n.rank = s.rank, e.children(t).length && (n.width = s.width, n.height = s.height));
  }), i.edges().forEach((t) => {
    let n = i.edge(t), s = e.edge(t);
    n.points = s.points, Object.hasOwn(s, "x") && (n.x = s.x, n.y = s.y);
  }), i.graph().width = e.graph().width, i.graph().height = e.graph().height;
}
var g1 = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], m1 = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "TB", rankalign: "center" }, v1 = ["acyclicer", "ranker", "rankdir", "align", "rankalign"], b1 = ["width", "height", "rank"], Bf = { width: 0, height: 0 }, y1 = ["minlen", "weight", "width", "height", "labeloffset"], w1 = { minlen: 1, weight: 1, width: 0, height: 0, labeloffset: 10, labelpos: "r" }, x1 = ["labelpos"];
function S1(i) {
  let e = new ki({ multigraph: !0, compound: !0 }), t = $a(i.graph());
  return e.setGraph(Object.assign({}, m1, Qa(t, g1), ul(t, v1))), i.nodes().forEach((n) => {
    let s = $a(i.node(n)), r = Qa(s, b1);
    Object.keys(Bf).forEach((l) => {
      r[l] === void 0 && (r[l] = Bf[l]);
    }), e.setNode(n, r);
    let o = i.parent(n);
    o !== void 0 && e.setParent(n, o);
  }), i.edges().forEach((n) => {
    let s = $a(i.edge(n));
    e.setEdge(n, Object.assign({}, w1, Qa(s, y1), ul(s, x1)));
  }), e;
}
function k1(i) {
  let e = i.graph();
  e.ranksep /= 2, i.edges().forEach((t) => {
    let n = i.edge(t);
    n.minlen *= 2, n.labelpos.toLowerCase() !== "c" && (e.rankdir === "TB" || e.rankdir === "BT" ? n.width += n.labeloffset : n.height += n.labeloffset);
  });
}
function Q1(i) {
  i.edges().forEach((e) => {
    let t = i.edge(e);
    if (t.width && t.height) {
      let n = i.node(e.v), s = { rank: (i.node(e.w).rank - n.rank) / 2 + n.rank, e };
      pr(i, "edge-proxy", s, "_ep");
    }
  });
}
function $1(i) {
  let e = 0;
  i.nodes().forEach((t) => {
    let n = i.node(t);
    n.borderTop && (n.minRank = i.node(n.borderTop).rank, n.maxRank = i.node(n.borderBottom).rank, e = Math.max(e, n.maxRank));
  }), i.graph().maxRank = e;
}
function _1(i) {
  i.nodes().forEach((e) => {
    let t = i.node(e);
    if (t.dummy === "edge-proxy") {
      let n = t;
      i.edge(n.e).labelRank = t.rank, i.removeNode(e);
    }
  });
}
function P1(i) {
  let e = Number.POSITIVE_INFINITY, t = 0, n = Number.POSITIVE_INFINITY, s = 0, r = i.graph(), o = r.marginx || 0, l = r.marginy || 0;
  function a(h) {
    let c = h.x, f = h.y, d = h.width, p = h.height;
    e = Math.min(e, c - d / 2), t = Math.max(t, c + d / 2), n = Math.min(n, f - p / 2), s = Math.max(s, f + p / 2);
  }
  i.nodes().forEach((h) => a(i.node(h))), i.edges().forEach((h) => {
    let c = i.edge(h);
    Object.hasOwn(c, "x") && a(c);
  }), e -= o, n -= l, i.nodes().forEach((h) => {
    let c = i.node(h);
    c.x -= e, c.y -= n;
  }), i.edges().forEach((h) => {
    let c = i.edge(h);
    c.points.forEach((f) => {
      f.x -= e, f.y -= n;
    }), Object.hasOwn(c, "x") && (c.x -= e), Object.hasOwn(c, "y") && (c.y -= n);
  }), r.width = t - e + o, r.height = s - n + l;
}
function T1(i) {
  i.edges().forEach((e) => {
    let t = i.edge(e), n = i.node(e.v), s = i.node(e.w), r, o;
    t.points ? (r = t.points[0], o = t.points[t.points.length - 1]) : (t.points = [], r = s, o = n), t.points.unshift(jf(n, r)), t.points.push(jf(s, o));
  });
}
function Z1(i) {
  i.edges().forEach((e) => {
    let t = i.edge(e);
    if (Object.hasOwn(t, "x")) switch ((t.labelpos === "l" || t.labelpos === "r") && (t.width -= t.labeloffset), t.labelpos) {
      case "l":
        t.x -= t.width / 2 + t.labeloffset;
        break;
      case "r":
        t.x += t.width / 2 + t.labeloffset;
        break;
    }
  });
}
function C1(i) {
  i.edges().forEach((e) => {
    let t = i.edge(e);
    t.reversed && t.points.reverse();
  });
}
function E1(i) {
  i.nodes().forEach((e) => {
    if (i.children(e).length) {
      let t = i.node(e), n = i.node(t.borderTop), s = i.node(t.borderBottom), r = i.node(t.borderLeft[t.borderLeft.length - 1]), o = i.node(t.borderRight[t.borderRight.length - 1]);
      t.width = Math.abs(o.x - r.x), t.height = Math.abs(s.y - n.y), t.x = r.x + t.width / 2, t.y = n.y + t.height / 2;
    }
  }), i.nodes().forEach((e) => {
    i.node(e).dummy === "border" && i.removeNode(e);
  });
}
function A1(i) {
  i.edges().forEach((e) => {
    if (e.v === e.w) {
      let t = i.node(e.v);
      t.selfEdges || (t.selfEdges = []), t.selfEdges.push({ e, label: i.edge(e) }), i.removeEdge(e);
    }
  });
}
function R1(i) {
  ql(i).forEach((e) => {
    let t = 0;
    e.forEach((n, s) => {
      let r = i.node(n);
      r.order = s + t, (r.selfEdges || []).forEach((o) => {
        pr(i, "selfedge", { width: o.label.width, height: o.label.height, rank: r.rank, order: s + ++t, e: o.e, label: o.label }, "_se");
      }), delete r.selfEdges;
    });
  });
}
function M1(i) {
  i.nodes().forEach((e) => {
    let t = i.node(e);
    if (t.dummy === "selfedge") {
      let n = t, s = i.node(n.e.v), r = s.x + s.width / 2, o = s.y, l = t.x - r, a = s.height / 2;
      i.setEdge(n.e, n.label), i.removeNode(e), n.label.points = [{ x: r + 2 * l / 3, y: o - a }, { x: r + 5 * l / 6, y: o - a }, { x: r + l, y: o }, { x: r + 5 * l / 6, y: o + a }, { x: r + 2 * l / 3, y: o + a }], n.label.x = t.x, n.label.y = t.y;
    }
  });
}
function Qa(i, e) {
  return Vl(ul(i, e), Number);
}
function $a(i) {
  let e = {};
  return i && Object.entries(i).forEach(([t, n]) => {
    typeof t == "string" && (t = t.toLowerCase()), e[t] = n;
  }), e;
}
/*! For license information please see dagre.esm.js.LEGAL.txt */
function X1(i) {
  const e = new ki({ multigraph: !0 });
  e.setGraph({
    rankdir: "LR",
    nodesep: hl,
    ranksep: hl * 2,
    marginx: 40,
    marginy: 40
  }), e.setDefaultEdgeLabel(() => ({}));
  for (const n of Object.values(i.nodes))
    e.setNode(n.id, { width: er, height: tr });
  for (const n of i.edges)
    i.nodes[n.from] && i.nodes[n.to] && e.setEdge(n.from, n.to);
  d1(e);
  const t = {};
  for (const [n, s] of Object.entries(i.nodes)) {
    const r = e.node(n);
    t[n] = r ? { ...s, position: { x: r.x - er / 2, y: r.y - tr / 2 } } : s;
  }
  return { ...i, nodes: t };
}
const Gl = zn(!1);
let Ms = null, Ur = !1, Gf = !1;
pt.subscribe(() => {
  if (!Gf) {
    Gf = !0;
    return;
  }
  Ur || Ms && (Ms = null, Gl.set(!1));
});
function j1() {
  Ms = structuredClone(Id(pt)), Ur = !0, pt.update((i) => X1(i)), Ur = !1, Gl.set(!0);
}
function _a() {
  if (!Ms) return;
  const i = Ms;
  Ur = !0, pt.set(i), Ur = !1, Ms = null, Gl.set(!1);
}
var L1 = /* @__PURE__ */ D('<button class="toolbar-btn toolbar-btn-undo svelte-x8b01c">Undo Auto Placement</button>'), I1 = /* @__PURE__ */ D('<div class="canvas-toolbar svelte-x8b01c"><button class="toolbar-btn svelte-x8b01c">Auto Placement</button> <!></div>');
function D1(i, e) {
  St(e, !1);
  let t = it(e, "readonly", 8, !1), n = it(e, "canUndo", 8, !1);
  const s = Sc();
  Tt();
  var r = I1(), o = x(r), l = w(o, 2);
  {
    var a = (h) => {
      var c = L1();
      ne("click", c, () => s("undo")), R(h, c);
    };
    te(l, (h) => {
      n() && !t() && h(a);
    });
  }
  F(() => o.disabled = t()), ne("click", o, () => s("autoPlacement")), R(i, r), kt();
}
var z1 = /* @__PURE__ */ go('<line stroke-width="2" marker-end="url(#arrow)"></line>'), N1 = /* @__PURE__ */ go('<line stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.8"></line>'), Y1 = /* @__PURE__ */ go('<circle cx="148" cy="8" r="8" fill="#f59e0b"></circle><text x="148" y="12" fill="#000" font-size="8" font-family="monospace" text-anchor="middle"> </text>', 1), W1 = /* @__PURE__ */ go('<g style="cursor:pointer" role="button" tabindex="0"><rect width="160" height="40" rx="6"></rect><text x="12" y="14" fill="#94a3b8" font-size="9" font-family="monospace"> </text><text x="12" y="29" fill="#e2e8f0" font-size="12" font-family="system-ui"> </text><!><circle cx="160" cy="20" r="5" class="port port-out"></circle><circle cx="0" cy="20" r="5" class="port port-in"></circle></g>'), q1 = /* @__PURE__ */ go('<line stroke="#7c6af7" stroke-width="1.5" stroke-dasharray="6,3" pointer-events="none"></line>'), V1 = /* @__PURE__ */ D('<input class="picker-input svelte-1lehbkp" type="text" placeholder="JSONata expression"/> <button class="picker-btn picker-add svelte-1lehbkp">Add</button>', 1), B1 = /* @__PURE__ */ D('<div class="edge-picker svelte-1lehbkp"><button class="picker-btn svelte-1lehbkp">Unconditional</button> <button class="picker-btn svelte-1lehbkp">Fallback</button> <button class="picker-btn svelte-1lehbkp">Conditional</button> <!> <button class="picker-btn picker-cancel svelte-1lehbkp">Cancel</button></div>'), G1 = /* @__PURE__ */ D('<div class="empty-hint svelte-1lehbkp">Drag nodes from the palette to build your agent graph</div>'), U1 = /* @__PURE__ */ D('<div class="canvas-wrap svelte-1lehbkp" role="presentation"><!> <svg style="width:100%;height:100%"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#7c6af7"></path></marker></defs><!><!><!><!></svg> <!> <!></div>');
function F1(i, e) {
  St(e, !1);
  const t = () => vt(pt, "$graph", r), n = () => vt(Gl, "$canUndoAutoPlacement", r), s = () => vt(Xn, "$selectedNode", r), [r, o] = vn(), l = /* @__PURE__ */ K();
  it(e, "agentId", 8);
  let a = it(e, "readonly", 8, !1);
  const h = "application/x-magicaal-node-type", c = /* @__PURE__ */ new Set(["core:tool", "core:mcp-client"]), f = /* @__PURE__ */ new Set(["core:tool-call", "core:react"]);
  let d = /* @__PURE__ */ K([]), p = /* @__PURE__ */ K([]), O = /* @__PURE__ */ K([]), g = null, m = { x: 0, y: 0 }, v = /* @__PURE__ */ K(), y = /* @__PURE__ */ K({ x: 0, y: 0, w: 1e3, h: 600 }), $ = !1, Z = { mx: 0, my: 0, vbx: 0, vby: 0 }, E = /* @__PURE__ */ K(null), M = /* @__PURE__ */ K({ x: 0, y: 0 }), A = /* @__PURE__ */ K(null), Y = /* @__PURE__ */ K({ x: 0, y: 0 }), L = /* @__PURE__ */ K(""), X = /* @__PURE__ */ K(!1);
  function j(N) {
    Xn.set(N);
  }
  function S(N) {
    const C = t().nodes[N];
    return (C == null ? void 0 : C.position) ?? { x: 100, y: 100 };
  }
  function T(N, C) {
    const U = u(v).createSVGPoint();
    U.x = N, U.y = C;
    const se = U.matrixTransform(u(v).getScreenCTM().inverse());
    return { x: se.x, y: se.y };
  }
  function I(N, C) {
    return N.addEventListener("wheel", C, { passive: !1 }), {
      destroy() {
        N.removeEventListener("wheel", C);
      }
    };
  }
  function P(N) {
    N.preventDefault();
    const C = N.deltaY > 0 ? 1.1 : 0.9, U = u(v).getBoundingClientRect(), se = (N.clientX - U.left) / U.width * u(y).w + u(y).x, be = (N.clientY - U.top) / U.height * u(y).h + u(y).y;
    k(y, {
      x: se - (se - u(y).x) * C,
      y: be - (be - u(y).y) * C,
      w: u(y).w * C,
      h: u(y).h * C
    });
  }
  function Q(N) {
    const C = N.target;
    C.closest("g") || C.tagName === "circle" || ($ = !0, Z = {
      mx: N.clientX,
      my: N.clientY,
      vbx: u(y).x,
      vby: u(y).y
    });
  }
  function q(N, C) {
    if (a()) return;
    const U = T(N.clientX, N.clientY), se = C.position ?? { x: 100, y: 100 };
    g = C, m = { x: U.x - se.x, y: U.y - se.y };
  }
  function ae(N, C) {
    if (a()) return;
    const U = T(N.clientX, N.clientY);
    k(E, { fromNodeId: C, x: U.x, y: U.y }), k(M, U);
  }
  function V(N) {
    if (u(E) && u(E).fromNodeId !== N) {
      const C = u(v).getBoundingClientRect();
      k(Y, {
        x: (u(M).x - u(y).x) / u(y).w * C.width,
        y: (u(M).y - u(y).y) / u(y).h * C.height
      }), k(A, { from: u(E).fromNodeId, to: N });
    }
    k(E, null);
  }
  function H(N) {
    if ($) {
      const C = u(y).w / u(v).clientWidth, U = u(y).h / u(v).clientHeight;
      k(y, {
        ...u(y),
        x: Z.vbx - (N.clientX - Z.mx) * C,
        y: Z.vby - (N.clientY - Z.my) * U
      });
    }
    if (g) {
      const C = T(N.clientX, N.clientY), U = g.id;
      pt.update((se) => ({
        ...se,
        nodes: {
          ...se.nodes,
          [U]: {
            ...se.nodes[U],
            position: { x: C.x - m.x, y: C.y - m.y }
          }
        }
      }));
    }
    u(E) && k(M, T(N.clientX, N.clientY));
  }
  function z() {
    var N;
    if (g) {
      const C = (N = t().nodes[g.id]) == null ? void 0 : N.position;
      C && f0(g.id, C);
    }
    $ = !1, g = null, k(E, null);
  }
  function ee(N) {
    N.preventDefault(), !a() && N.dataTransfer && (N.dataTransfer.dropEffect = "copy");
  }
  function he(N) {
    var Pe;
    if (N.preventDefault(), a()) return;
    const C = (Pe = N.dataTransfer) == null ? void 0 : Pe.getData(h);
    if (!C) return;
    const { type: U, name: se } = JSON.parse(C), be = T(N.clientX, N.clientY), Ke = {
      x: be.x - er / 2,
      y: be.y - tr / 2
    };
    bp(U, se, Ke);
  }
  function ce() {
    const N = Object.values(t().nodes).map((Pe) => Pe.position).filter((Pe) => !!Pe);
    if (N.length === 0) return;
    const C = 60, U = Math.min(...N.map((Pe) => Pe.x)) - C, se = Math.min(...N.map((Pe) => Pe.y)) - C, be = Math.max(...N.map((Pe) => Pe.x + er)) + C, Ke = Math.max(...N.map((Pe) => Pe.y + tr)) + C;
    k(y, {
      x: U,
      y: se,
      w: Math.max(be - U, 200),
      h: Math.max(Ke - se, 150)
    });
  }
  function ue() {
    j1(), ce();
  }
  function le(N, C) {
    if (a() || !u(A)) return;
    const U = {
      id: `e-${Date.now()}`,
      from: u(A).from,
      to: u(A).to,
      type: N,
      ...C ? { condition: C } : {}
    };
    c0(U), k(A, null), k(X, !1), k(L, "");
  }
  ot(() => t(), () => {
    k(d, Object.values(t().nodes)), k(p, t().edges), k(O, t().toolEdges ?? []);
  }), ot(() => u(O), () => {
    k(l, u(O).reduce(
      (N, C) => (N[C.to] = (N[C.to] ?? 0) + 1, N),
      {}
    ));
  }), nn(), Tt();
  var oe = U1(), fe = x(oe);
  D1(fe, {
    get readonly() {
      return a();
    },
    get canUndo() {
      return n();
    },
    $$events: {
      autoPlacement: ue,
      undo(...N) {
        _a == null || _a.apply(this, N);
      }
    }
  });
  var ve = w(fe, 2), Te = w(x(ve));
  et(Te, 1, () => u(p), Je, (N, C) => {
    const U = /* @__PURE__ */ yt(() => (u(C), b(() => S(u(C).from)))), se = /* @__PURE__ */ yt(() => (u(C), b(() => S(u(C).to))));
    var be = z1();
    F(() => {
      Ge(be, "x1", (Le(u(U)), b(() => u(U).x + 160))), Ge(be, "y1", (Le(u(U)), b(() => u(U).y + 20))), Ge(be, "x2", (Le(u(se)), b(() => u(se).x))), Ge(be, "y2", (Le(u(se)), b(() => u(se).y + 20))), Ge(be, "stroke", (u(C), b(() => u(C).type === "fallback" ? "#94a3b8" : "#7c6af7"))), Ge(be, "stroke-dasharray", (u(C), b(() => u(C).type === "fallback" ? "4" : "0")));
    }), R(N, be);
  });
  var ye = w(Te);
  et(ye, 1, () => u(O), Je, (N, C) => {
    const U = /* @__PURE__ */ yt(() => (u(C), b(() => S(u(C).from)))), se = /* @__PURE__ */ yt(() => (u(C), b(() => S(u(C).to))));
    var be = N1();
    F(() => {
      Ge(be, "x1", (Le(u(U)), b(() => u(U).x + 160))), Ge(be, "y1", (Le(u(U)), b(() => u(U).y + 20))), Ge(be, "x2", (Le(u(se)), b(() => u(se).x))), Ge(be, "y2", (Le(u(se)), b(() => u(se).y + 20)));
    }), R(N, be);
  });
  var Se = w(ye);
  et(Se, 1, () => u(d), Je, (N, C) => {
    const U = /* @__PURE__ */ yt(() => (u(C), b(() => u(C).position ?? { x: 100, y: 100 }))), se = /* @__PURE__ */ yt(() => (u(C), b(() => c.has(u(C).type)))), be = /* @__PURE__ */ yt(() => (u(C), b(() => f.has(u(C).type)))), Ke = /* @__PURE__ */ yt(() => (s(), u(C), b(() => {
      var ze;
      return ((ze = s()) == null ? void 0 : ze.id) === u(C).id;
    }))), Pe = /* @__PURE__ */ yt(() => (u(l), u(C), b(() => u(l)[u(C).id] ?? 0)));
    var Ve = W1(), J = x(Ve), de = w(J), pe = x(de), Re = w(de), tt = x(Re), Qe = w(Re);
    {
      var je = (ze) => {
        var vr = Y1(), ha = w(Fe(vr)), xs = x(ha);
        F(() => G(xs, u(Pe))), R(ze, vr);
      };
      te(Qe, (ze) => {
        u(be) && u(Pe) > 0 && ze(je);
      });
    }
    var Be = w(Qe), De = w(Be);
    F(() => {
      Ge(Ve, "transform", `translate(${Le(u(U)), b(() => u(U).x) ?? ""},${Le(u(U)), b(() => u(U).y) ?? ""})`), Ge(J, "fill", u(Ke) ? u(se) ? "#2d1f00" : "#312e7a" : u(se) ? "#1e1600" : "#1e2035"), Ge(J, "stroke", u(Ke) ? u(se) ? "#f59e0b" : "#7c6af7" : u(se) ? "#b45309" : "#2d3148"), Ge(J, "stroke-width", u(se) ? "2" : "1.5"), G(pe, (u(C), b(() => u(C).type))), G(tt, (u(C), b(() => u(C).label ?? u(C).id)));
    }), ne("mousedown", Be, ya((ze) => ae(ze, u(C).id))), ne("mouseup", De, ya(() => V(u(C).id))), ne("click", Ve, () => j(u(C))), ne("keydown", Ve, (ze) => ze.key === "Enter" && j(u(C))), ne("mousedown", Ve, ya((ze) => q(ze, u(C)))), R(N, Ve);
  });
  var Ee = w(Se);
  {
    var qe = (N) => {
      var C = q1();
      F(() => {
        Ge(C, "x1", (u(E), b(() => u(E).x))), Ge(C, "y1", (u(E), b(() => u(E).y))), Ge(C, "x2", (u(M), b(() => u(M).x))), Ge(C, "y2", (u(M), b(() => u(M).y)));
      }), R(N, C);
    };
    te(Ee, (N) => {
      u(E) && N(qe);
    });
  }
  $c(ve, (N) => k(v, N), () => u(v)), Jv(ve, (N, C) => I == null ? void 0 : I(N, C), () => P), Wl(() => ne("mousedown", ve, Q));
  var rt = w(ve, 2);
  {
    var bt = (N) => {
      var C = B1(), U = x(C), se = w(U, 2), be = w(se, 2), Ke = w(be, 2);
      {
        var Pe = (J) => {
          var de = V1(), pe = Fe(de), Re = w(pe, 2);
          qt(pe, () => u(L), (tt) => k(L, tt)), ne("click", Re, () => le("conditional", u(L))), R(J, de);
        };
        te(Ke, (J) => {
          u(X) && J(Pe);
        });
      }
      var Ve = w(Ke, 2);
      F(() => Op(C, `left:${u(Y), b(() => u(Y).x) ?? ""}px;top:${u(Y), b(() => u(Y).y) ?? ""}px`)), ne("click", U, () => le("unconditional")), ne("click", se, () => le("fallback")), ne("click", be, () => {
        k(X, !u(X));
      }), ne("click", Ve, () => {
        k(A, null), k(X, !1);
      }), R(N, C);
    };
    te(rt, (N) => {
      u(A) && N(bt);
    });
  }
  var ut = w(rt, 2);
  {
    var Ze = (N) => {
      var C = G1();
      R(N, C);
    };
    te(ut, (N) => {
      u(d), b(() => u(d).length === 0) && N(Ze);
    });
  }
  F(() => Ge(ve, "viewBox", `${u(y), b(() => u(y).x) ?? ""} ${u(y), b(() => u(y).y) ?? ""} ${u(y), b(() => u(y).w) ?? ""} ${u(y), b(() => u(y).h) ?? ""}`)), ne("mousemove", oe, H), ne("mouseup", oe, z), ne("mouseleave", oe, z), ne("dragover", oe, ee), ne("drop", oe, he), R(i, oe), kt(), o();
}
const Ir = zn([]), Ec = zn([]);
let Pa = !1;
async function Yp() {
  if (!Pa) {
    Pa = !0;
    try {
      const i = await fetch("/api/integrations/connections");
      if (!i.ok) throw new Error(String(i.status));
      Ec.set(await i.json());
    } catch {
      Pa = !1;
    }
  }
}
var H1 = /* @__PURE__ */ D('<span class="not-connected-badge svelte-142uvrg">not connected</span>'), K1 = /* @__PURE__ */ D('<button><span class="node-name svelte-142uvrg"> <!></span> <span class="node-type svelte-142uvrg"> </span></button>'), J1 = /* @__PURE__ */ D('<a class="marketplace-link svelte-142uvrg">Browse Marketplace →</a>'), ey = /* @__PURE__ */ D('<div class="category-header svelte-142uvrg"> </div> <!> <!>', 1), ty = /* @__PURE__ */ D('<div class="palette svelte-142uvrg"><div class="palette-header svelte-142uvrg">Nodes</div> <!></div>');
function iy(i, e) {
  St(e, !1);
  const t = () => vt(Ir, "$nodeTypes", s), n = () => vt(Ec, "$connections", s), [s, r] = vn(), o = /* @__PURE__ */ K(), l = /* @__PURE__ */ K();
  let a = it(e, "readonly", 8, !1);
  const h = "application/x-magicaal-node-type", c = 3e4;
  let f = null, d = "", p = /* @__PURE__ */ K(!1);
  const O = {
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
  function g(A) {
    const Y = /* @__PURE__ */ new Map();
    for (const L of A) {
      const X = L.meta.category ?? "other";
      Y.has(X) || Y.set(X, []), Y.get(X).push(L);
    }
    return Array.from(Y.entries()).map(([L, X]) => ({
      category: L,
      label: O[L] ?? L,
      items: X
    }));
  }
  async function m() {
    try {
      const A = await fetch("/api/nodes");
      if (!A.ok) return;
      const Y = await A.json(), L = Y.map((X) => X.type).sort().join(",");
      L !== d && (d = L, Ir.set(Y));
    } catch {
      t().length === 0 && Ir.set([
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
  function v(A) {
    var L, X;
    const Y = (X = (L = A.schema) == null ? void 0 : L.config) == null ? void 0 : X.properties;
    if (Y) {
      for (const j of Object.values(Y))
        if (j.format === "connection") return j.service;
    }
  }
  function y(A, Y) {
    const L = v(A);
    return L ? !Y.has(L) : !1;
  }
  ys(async () => {
    await m(), Yp(), f = setInterval(m, c);
    try {
      const A = await fetch("/api/system/config");
      if (A.ok) {
        const Y = await A.json();
        k(p, Y.marketplaceEnabled === !0);
      }
    } catch {
    }
  }), pp(() => {
    f && clearInterval(f);
  });
  function $(A, Y) {
    a() || bp(A, Y, { x: 200, y: 200 });
  }
  function Z(A, Y, L) {
    var X;
    if (a()) {
      A.preventDefault();
      return;
    }
    (X = A.dataTransfer) == null || X.setData(h, JSON.stringify({ type: Y, name: L })), A.dataTransfer && (A.dataTransfer.effectAllowed = "copy");
  }
  ot(() => t(), () => {
    k(o, g(t()));
  }), ot(() => n(), () => {
    k(l, new Set(n().map((A) => A.service)));
  }), nn(), Tt();
  var E = ty(), M = w(x(E), 2);
  et(M, 1, () => u(o), Je, (A, Y) => {
    var L = ey(), X = Fe(L), j = x(X), S = w(X, 2);
    et(S, 1, () => (u(Y), b(() => u(Y).items)), Je, (P, Q) => {
      var q = K1();
      let ae;
      var V = x(q), H = x(V), z = w(H);
      {
        var ee = (le) => {
          var oe = H1();
          F((fe) => Ge(oe, "title", `No ${fe ?? ""} connection configured`), [
            () => (u(Q), b(() => v(u(Q))))
          ]), R(le, oe);
        }, he = /* @__PURE__ */ us(() => (u(Q), u(l), b(() => y(u(Q), u(l)))));
        te(z, (le) => {
          u(he) && le(ee);
        });
      }
      var ce = w(V, 2), ue = x(ce);
      F(() => {
        ae = si(q, 1, "palette-item svelte-142uvrg", null, ae, { readonly: a() }), q.disabled = a(), Ge(q, "draggable", !a()), G(H, `${u(Q), b(() => u(Q).meta.name) ?? ""} `), G(ue, (u(Q), b(() => u(Q).type)));
      }), ne("dragstart", q, (le) => Z(le, u(Q).type, u(Q).meta.name)), ne("click", q, () => $(u(Q).type, u(Q).meta.name)), R(P, q);
    });
    var T = w(S, 2);
    {
      var I = (P) => {
        var Q = J1();
        F(() => Ge(Q, "href", `/admin/marketplace?category=${u(Y), b(() => u(Y).category) ?? ""}`)), R(P, Q);
      };
      te(T, (P) => {
        u(p) && P(I);
      });
    }
    F(() => G(j, (u(Y), b(() => u(Y).label)))), R(A, L);
  }), R(i, E), kt(), r();
}
let wh = [], Wp = [];
(() => {
  let i = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((e) => e ? parseInt(e, 36) : 1);
  for (let e = 0, t = 0; e < i.length; e++)
    (e % 2 ? Wp : wh).push(t = t + i[e]);
})();
function ny(i) {
  if (i < 768) return !1;
  for (let e = 0, t = wh.length; ; ) {
    let n = e + t >> 1;
    if (i < wh[n]) t = n;
    else if (i >= Wp[n]) e = n + 1;
    else return !0;
    if (e == t) return !1;
  }
}
function Uf(i) {
  return i >= 127462 && i <= 127487;
}
const Ff = 8205;
function sy(i, e, t = !0, n = !0) {
  return (t ? qp : ry)(i, e, n);
}
function qp(i, e, t) {
  if (e == i.length) return e;
  e && Vp(i.charCodeAt(e)) && Bp(i.charCodeAt(e - 1)) && e--;
  let n = Ta(i, e);
  for (e += Hf(n); e < i.length; ) {
    let s = Ta(i, e);
    if (n == Ff || s == Ff || t && ny(s))
      e += Hf(s), n = s;
    else if (Uf(s)) {
      let r = 0, o = e - 2;
      for (; o >= 0 && Uf(Ta(i, o)); )
        r++, o -= 2;
      if (r % 2 == 0) break;
      e += 2;
    } else
      break;
  }
  return e;
}
function ry(i, e, t) {
  for (; e > 1; ) {
    let n = qp(i, e - 2, t);
    if (n < e) return n;
    e--;
  }
  return 0;
}
function Ta(i, e) {
  let t = i.charCodeAt(e);
  if (!Bp(t) || e + 1 == i.length) return t;
  let n = i.charCodeAt(e + 1);
  return Vp(n) ? (t - 55296 << 10) + (n - 56320) + 65536 : t;
}
function Vp(i) {
  return i >= 56320 && i < 57344;
}
function Bp(i) {
  return i >= 55296 && i < 56320;
}
function Hf(i) {
  return i < 65536 ? 1 : 2;
}
let Ae = class Gp {
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
  replace(e, t, n) {
    [e, t] = nr(this, e, t);
    let s = [];
    return this.decompose(
      0,
      e,
      s,
      2
      /* Open.To */
    ), n.length && n.decompose(
      0,
      n.length,
      s,
      3
      /* Open.To */
    ), this.decompose(
      t,
      this.length,
      s,
      1
      /* Open.From */
    ), Wi.from(s, this.length - (t - e) + n.length);
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
    [e, t] = nr(this, e, t);
    let n = [];
    return this.decompose(e, t, n, 0), Wi.from(n, t - e);
  }
  /**
  Test whether this text is equal to another instance.
  */
  eq(e) {
    if (e == this)
      return !0;
    if (e.length != this.length || e.lines != this.lines)
      return !1;
    let t = this.scanIdentical(e, 1), n = this.length - this.scanIdentical(e, -1), s = new Dr(this), r = new Dr(e);
    for (let o = t, l = t; ; ) {
      if (s.next(o), r.next(o), o = 0, s.lineBreak != r.lineBreak || s.done != r.done || s.value != r.value)
        return !1;
      if (l += s.value.length, s.done || l >= n)
        return !0;
    }
  }
  /**
  Iterate over the text. When `dir` is `-1`, iteration happens
  from end to start. This will return lines and the breaks between
  them as separate strings.
  */
  iter(e = 1) {
    return new Dr(this, e);
  }
  /**
  Iterate over a range of the text. When `from` > `to`, the
  iterator will run in reverse.
  */
  iterRange(e, t = this.length) {
    return new Up(this, e, t);
  }
  /**
  Return a cursor that iterates over the given range of lines,
  _without_ returning the line breaks between, and yielding empty
  strings for empty lines.
  
  When `from` and `to` are given, they should be 1-based line numbers.
  */
  iterLines(e, t) {
    let n;
    if (e == null)
      n = this.iter();
    else {
      t == null && (t = this.lines + 1);
      let s = this.line(e).from;
      n = this.iterRange(s, Math.max(s, t == this.lines + 1 ? this.length : t <= 1 ? 0 : this.line(t - 1).to));
    }
    return new Fp(n);
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
    return e.length == 1 && !e[0] ? Gp.empty : e.length <= 32 ? new ct(e) : Wi.from(ct.split(e, []));
  }
};
class ct extends Ae {
  constructor(e, t = oy(e)) {
    super(), this.text = e, this.length = t;
  }
  get lines() {
    return this.text.length;
  }
  get children() {
    return null;
  }
  lineInner(e, t, n, s) {
    for (let r = 0; ; r++) {
      let o = this.text[r], l = s + o.length;
      if ((t ? n : l) >= e)
        return new ly(s, l, n, o);
      s = l + 1, n++;
    }
  }
  decompose(e, t, n, s) {
    let r = e <= 0 && t >= this.length ? this : new ct(Kf(this.text, e, t), Math.min(t, this.length) - Math.max(0, e));
    if (s & 1) {
      let o = n.pop(), l = el(r.text, o.text.slice(), 0, r.length);
      if (l.length <= 32)
        n.push(new ct(l, o.length + r.length));
      else {
        let a = l.length >> 1;
        n.push(new ct(l.slice(0, a)), new ct(l.slice(a)));
      }
    } else
      n.push(r);
  }
  replace(e, t, n) {
    if (!(n instanceof ct))
      return super.replace(e, t, n);
    [e, t] = nr(this, e, t);
    let s = el(this.text, el(n.text, Kf(this.text, 0, e)), t), r = this.length + n.length - (t - e);
    return s.length <= 32 ? new ct(s, r) : Wi.from(ct.split(s, []), r);
  }
  sliceString(e, t = this.length, n = `
`) {
    [e, t] = nr(this, e, t);
    let s = "";
    for (let r = 0, o = 0; r <= t && o < this.text.length; o++) {
      let l = this.text[o], a = r + l.length;
      r > e && o && (s += n), e < a && t > r && (s += l.slice(Math.max(0, e - r), t - r)), r = a + 1;
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
    let n = [], s = -1;
    for (let r of e)
      n.push(r), s += r.length + 1, n.length == 32 && (t.push(new ct(n, s)), n = [], s = -1);
    return s > -1 && t.push(new ct(n, s)), t;
  }
}
class Wi extends Ae {
  constructor(e, t) {
    super(), this.children = e, this.length = t, this.lines = 0;
    for (let n of e)
      this.lines += n.lines;
  }
  lineInner(e, t, n, s) {
    for (let r = 0; ; r++) {
      let o = this.children[r], l = s + o.length, a = n + o.lines - 1;
      if ((t ? a : l) >= e)
        return o.lineInner(e, t, n, s);
      s = l + 1, n = a + 1;
    }
  }
  decompose(e, t, n, s) {
    for (let r = 0, o = 0; o <= t && r < this.children.length; r++) {
      let l = this.children[r], a = o + l.length;
      if (e <= a && t >= o) {
        let h = s & ((o <= e ? 1 : 0) | (a >= t ? 2 : 0));
        o >= e && a <= t && !h ? n.push(l) : l.decompose(e - o, t - o, n, h);
      }
      o = a + 1;
    }
  }
  replace(e, t, n) {
    if ([e, t] = nr(this, e, t), n.lines < this.lines)
      for (let s = 0, r = 0; s < this.children.length; s++) {
        let o = this.children[s], l = r + o.length;
        if (e >= r && t <= l) {
          let a = o.replace(e - r, t - r, n), h = this.lines - o.lines + a.lines;
          if (a.lines < h >> 4 && a.lines > h >> 6) {
            let c = this.children.slice();
            return c[s] = a, new Wi(c, this.length - (t - e) + n.length);
          }
          return super.replace(r, l, a);
        }
        r = l + 1;
      }
    return super.replace(e, t, n);
  }
  sliceString(e, t = this.length, n = `
`) {
    [e, t] = nr(this, e, t);
    let s = "";
    for (let r = 0, o = 0; r < this.children.length && o <= t; r++) {
      let l = this.children[r], a = o + l.length;
      o > e && r && (s += n), e < a && t > o && (s += l.sliceString(e - o, t - o, n)), o = a + 1;
    }
    return s;
  }
  flatten(e) {
    for (let t of this.children)
      t.flatten(e);
  }
  scanIdentical(e, t) {
    if (!(e instanceof Wi))
      return 0;
    let n = 0, [s, r, o, l] = t > 0 ? [0, 0, this.children.length, e.children.length] : [this.children.length - 1, e.children.length - 1, -1, -1];
    for (; ; s += t, r += t) {
      if (s == o || r == l)
        return n;
      let a = this.children[s], h = e.children[r];
      if (a != h)
        return n + a.scanIdentical(h, t);
      n += a.length + 1;
    }
  }
  static from(e, t = e.reduce((n, s) => n + s.length + 1, -1)) {
    let n = 0;
    for (let p of e)
      n += p.lines;
    if (n < 32) {
      let p = [];
      for (let O of e)
        O.flatten(p);
      return new ct(p, t);
    }
    let s = Math.max(
      32,
      n >> 5
      /* Tree.BranchShift */
    ), r = s << 1, o = s >> 1, l = [], a = 0, h = -1, c = [];
    function f(p) {
      let O;
      if (p.lines > r && p instanceof Wi)
        for (let g of p.children)
          f(g);
      else p.lines > o && (a > o || !a) ? (d(), l.push(p)) : p instanceof ct && a && (O = c[c.length - 1]) instanceof ct && p.lines + O.lines <= 32 ? (a += p.lines, h += p.length + 1, c[c.length - 1] = new ct(O.text.concat(p.text), O.length + 1 + p.length)) : (a + p.lines > s && d(), a += p.lines, h += p.length + 1, c.push(p));
    }
    function d() {
      a != 0 && (l.push(c.length == 1 ? c[0] : Wi.from(c, h)), h = -1, a = c.length = 0);
    }
    for (let p of e)
      f(p);
    return d(), l.length == 1 ? l[0] : new Wi(l, t);
  }
}
Ae.empty = /* @__PURE__ */ new ct([""], 0);
function oy(i) {
  let e = -1;
  for (let t of i)
    e += t.length + 1;
  return e;
}
function el(i, e, t = 0, n = 1e9) {
  for (let s = 0, r = 0, o = !0; r < i.length && s <= n; r++) {
    let l = i[r], a = s + l.length;
    a >= t && (a > n && (l = l.slice(0, n - s)), s < t && (l = l.slice(t - s)), o ? (e[e.length - 1] += l, o = !1) : e.push(l)), s = a + 1;
  }
  return e;
}
function Kf(i, e, t) {
  return el(i, [""], e, t);
}
class Dr {
  constructor(e, t = 1) {
    this.dir = t, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [e], this.offsets = [t > 0 ? 1 : (e instanceof ct ? e.text.length : e.children.length) << 1];
  }
  nextInner(e, t) {
    for (this.done = this.lineBreak = !1; ; ) {
      let n = this.nodes.length - 1, s = this.nodes[n], r = this.offsets[n], o = r >> 1, l = s instanceof ct ? s.text.length : s.children.length;
      if (o == (t > 0 ? l : 0)) {
        if (n == 0)
          return this.done = !0, this.value = "", this;
        t > 0 && this.offsets[n - 1]++, this.nodes.pop(), this.offsets.pop();
      } else if ((r & 1) == (t > 0 ? 0 : 1)) {
        if (this.offsets[n] += t, e == 0)
          return this.lineBreak = !0, this.value = `
`, this;
        e--;
      } else if (s instanceof ct) {
        let a = s.text[o + (t < 0 ? -1 : 0)];
        if (this.offsets[n] += t, a.length > Math.max(0, e))
          return this.value = e == 0 ? a : t > 0 ? a.slice(e) : a.slice(0, a.length - e), this;
        e -= a.length;
      } else {
        let a = s.children[o + (t < 0 ? -1 : 0)];
        e > a.length ? (e -= a.length, this.offsets[n] += t) : (t < 0 && this.offsets[n]--, this.nodes.push(a), this.offsets.push(t > 0 ? 1 : (a instanceof ct ? a.text.length : a.children.length) << 1));
      }
    }
  }
  next(e = 0) {
    return e < 0 && (this.nextInner(-e, -this.dir), e = this.value.length), this.nextInner(e, this.dir);
  }
}
class Up {
  constructor(e, t, n) {
    this.value = "", this.done = !1, this.cursor = new Dr(e, t > n ? -1 : 1), this.pos = t > n ? e.length : 0, this.from = Math.min(t, n), this.to = Math.max(t, n);
  }
  nextInner(e, t) {
    if (t < 0 ? this.pos <= this.from : this.pos >= this.to)
      return this.value = "", this.done = !0, this;
    e += Math.max(0, t < 0 ? this.pos - this.to : this.from - this.pos);
    let n = t < 0 ? this.pos - this.from : this.to - this.pos;
    e > n && (e = n), n -= e;
    let { value: s } = this.cursor.next(e);
    return this.pos += (s.length + e) * t, this.value = s.length <= n ? s : t < 0 ? s.slice(s.length - n) : s.slice(0, n), this.done = !this.value, this;
  }
  next(e = 0) {
    return e < 0 ? e = Math.max(e, this.from - this.pos) : e > 0 && (e = Math.min(e, this.to - this.pos)), this.nextInner(e, this.cursor.dir);
  }
  get lineBreak() {
    return this.cursor.lineBreak && this.value != "";
  }
}
class Fp {
  constructor(e) {
    this.inner = e, this.afterBreak = !0, this.value = "", this.done = !1;
  }
  next(e = 0) {
    let { done: t, lineBreak: n, value: s } = this.inner.next(e);
    return t && this.afterBreak ? (this.value = "", this.afterBreak = !1) : t ? (this.done = !0, this.value = "") : n ? this.afterBreak ? this.value = "" : (this.afterBreak = !0, this.next()) : (this.value = s, this.afterBreak = !1), this;
  }
  get lineBreak() {
    return !1;
  }
}
typeof Symbol < "u" && (Ae.prototype[Symbol.iterator] = function() {
  return this.iter();
}, Dr.prototype[Symbol.iterator] = Up.prototype[Symbol.iterator] = Fp.prototype[Symbol.iterator] = function() {
  return this;
});
class ly {
  /**
  @internal
  */
  constructor(e, t, n, s) {
    this.from = e, this.to = t, this.number = n, this.text = s;
  }
  /**
  The length of the line (not including any line break after it).
  */
  get length() {
    return this.to - this.from;
  }
}
function nr(i, e, t) {
  return e = Math.max(0, Math.min(i.length, e)), [e, Math.max(e, Math.min(i.length, t))];
}
function Ct(i, e, t = !0, n = !0) {
  return sy(i, e, t, n);
}
function ay(i) {
  return i >= 56320 && i < 57344;
}
function hy(i) {
  return i >= 55296 && i < 56320;
}
function Wn(i, e) {
  let t = i.charCodeAt(e);
  if (!hy(t) || e + 1 == i.length)
    return t;
  let n = i.charCodeAt(e + 1);
  return ay(n) ? (t - 55296 << 10) + (n - 56320) + 65536 : t;
}
function cy(i) {
  return i <= 65535 ? String.fromCharCode(i) : (i -= 65536, String.fromCharCode((i >> 10) + 55296, (i & 1023) + 56320));
}
function _s(i) {
  return i < 65536 ? 1 : 2;
}
const xh = /\r\n?|\n/;
var Xt = /* @__PURE__ */ (function(i) {
  return i[i.Simple = 0] = "Simple", i[i.TrackDel = 1] = "TrackDel", i[i.TrackBefore = 2] = "TrackBefore", i[i.TrackAfter = 3] = "TrackAfter", i;
})(Xt || (Xt = {}));
class Ji {
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
      let n = this.sections[t + 1];
      e += n < 0 ? this.sections[t] : n;
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
    for (let t = 0, n = 0, s = 0; t < this.sections.length; ) {
      let r = this.sections[t++], o = this.sections[t++];
      o < 0 ? (e(n, s, r), s += r) : s += o, n += r;
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
    Sh(this, e, t);
  }
  /**
  Get a description of the inverted form of these changes.
  */
  get invertedDesc() {
    let e = [];
    for (let t = 0; t < this.sections.length; ) {
      let n = this.sections[t++], s = this.sections[t++];
      s < 0 ? e.push(n, s) : e.push(s, n);
    }
    return new Ji(e);
  }
  /**
  Compute the combined effect of applying another set of changes
  after this one. The length of the document after this set should
  match the length before `other`.
  */
  composeDesc(e) {
    return this.empty ? e : e.empty ? this : Hp(this, e);
  }
  /**
  Map this description, which should start with the same document
  as `other`, over another set of changes, so that it can be
  applied after it. When `before` is true, map as if the changes
  in `this` happened before the ones in `other`.
  */
  mapDesc(e, t = !1) {
    return e.empty ? this : kh(this, e, t);
  }
  mapPos(e, t = -1, n = Xt.Simple) {
    let s = 0, r = 0;
    for (let o = 0; o < this.sections.length; ) {
      let l = this.sections[o++], a = this.sections[o++], h = s + l;
      if (a < 0) {
        if (h > e)
          return r + (e - s);
        r += l;
      } else {
        if (n != Xt.Simple && h >= e && (n == Xt.TrackDel && s < e && h > e || n == Xt.TrackBefore && s < e || n == Xt.TrackAfter && h > e))
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
    for (let n = 0, s = 0; n < this.sections.length && s <= t; ) {
      let r = this.sections[n++], o = this.sections[n++], l = s + r;
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
      let n = this.sections[t++], s = this.sections[t++];
      e += (e ? " " : "") + n + (s >= 0 ? ":" + s : "");
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
    return new Ji(e);
  }
  /**
  @internal
  */
  static create(e) {
    return new Ji(e);
  }
}
class mt extends Ji {
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
    return Sh(this, (t, n, s, r, o) => e = e.replace(s, s + (n - t), o), !1), e;
  }
  mapDesc(e, t = !1) {
    return kh(this, e, t, !0);
  }
  /**
  Given the document as it existed _before_ the changes, return a
  change set that represents the inverse of this set, which could
  be used to go from the document created by the changes back to
  the document as it existed before the changes.
  */
  invert(e) {
    let t = this.sections.slice(), n = [];
    for (let s = 0, r = 0; s < t.length; s += 2) {
      let o = t[s], l = t[s + 1];
      if (l >= 0) {
        t[s] = l, t[s + 1] = o;
        let a = s >> 1;
        for (; n.length < a; )
          n.push(Ae.empty);
        n.push(o ? e.slice(r, r + o) : Ae.empty);
      }
      r += o;
    }
    return new mt(t, n);
  }
  /**
  Combine two subsequent change sets into a single set. `other`
  must start in the document produced by `this`. If `this` goes
  `docA` → `docB` and `other` represents `docB` → `docC`, the
  returned value will represent the change `docA` → `docC`.
  */
  compose(e) {
    return this.empty ? e : e.empty ? this : Hp(this, e, !0);
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
    return e.empty ? this : kh(this, e, t, !0);
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
    Sh(this, e, t);
  }
  /**
  Get a [change description](https://codemirror.net/6/docs/ref/#state.ChangeDesc) for this change
  set.
  */
  get desc() {
    return Ji.create(this.sections);
  }
  /**
  @internal
  */
  filter(e) {
    let t = [], n = [], s = [], r = new Fr(this);
    e: for (let o = 0, l = 0; ; ) {
      let a = o == e.length ? 1e9 : e[o++];
      for (; l < a || l == a && r.len == 0; ) {
        if (r.done)
          break e;
        let c = Math.min(r.len, a - l);
        Zt(s, c, -1);
        let f = r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0;
        Zt(t, c, f), f > 0 && En(n, t, r.text), r.forward(c), l += c;
      }
      let h = e[o++];
      for (; l < h; ) {
        if (r.done)
          break e;
        let c = Math.min(r.len, h - l);
        Zt(t, c, -1), Zt(s, c, r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0), r.forward(c), l += c;
      }
    }
    return {
      changes: new mt(t, n),
      filtered: Ji.create(s)
    };
  }
  /**
  Serialize this change set to a JSON-representable value.
  */
  toJSON() {
    let e = [];
    for (let t = 0; t < this.sections.length; t += 2) {
      let n = this.sections[t], s = this.sections[t + 1];
      s < 0 ? e.push(n) : s == 0 ? e.push([n]) : e.push([n].concat(this.inserted[t >> 1].toJSON()));
    }
    return e;
  }
  /**
  Create a change set for the given changes, for a document of the
  given length, using `lineSep` as line separator.
  */
  static of(e, t, n) {
    let s = [], r = [], o = 0, l = null;
    function a(c = !1) {
      if (!c && !s.length)
        return;
      o < t && Zt(s, t - o, -1);
      let f = new mt(s, r);
      l = l ? l.compose(f.map(l)) : f, s = [], r = [], o = 0;
    }
    function h(c) {
      if (Array.isArray(c))
        for (let f of c)
          h(f);
      else if (c instanceof mt) {
        if (c.length != t)
          throw new RangeError(`Mismatched change set length (got ${c.length}, expected ${t})`);
        a(), l = l ? l.compose(c.map(l)) : c;
      } else {
        let { from: f, to: d = f, insert: p } = c;
        if (f > d || f < 0 || d > t)
          throw new RangeError(`Invalid change range ${f} to ${d} (in doc of length ${t})`);
        let O = p ? typeof p == "string" ? Ae.of(p.split(n || xh)) : p : Ae.empty, g = O.length;
        if (f == d && g == 0)
          return;
        f < o && a(), f > o && Zt(s, f - o, -1), Zt(s, d - f, g), En(r, s, O), o = d;
      }
    }
    return h(e), a(!l), l;
  }
  /**
  Create an empty changeset of the given length.
  */
  static empty(e) {
    return new mt(e ? [e, -1] : [], []);
  }
  /**
  Create a changeset from its JSON representation (as produced by
  [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeSet.toJSON).
  */
  static fromJSON(e) {
    if (!Array.isArray(e))
      throw new RangeError("Invalid JSON representation of ChangeSet");
    let t = [], n = [];
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
          for (; n.length < s; )
            n.push(Ae.empty);
          n[s] = Ae.of(r.slice(1)), t.push(r[0], n[s].length);
        }
      }
    }
    return new mt(t, n);
  }
  /**
  @internal
  */
  static createSet(e, t) {
    return new mt(e, t);
  }
}
function Zt(i, e, t, n = !1) {
  if (e == 0 && t <= 0)
    return;
  let s = i.length - 2;
  s >= 0 && t <= 0 && t == i[s + 1] ? i[s] += e : s >= 0 && e == 0 && i[s] == 0 ? i[s + 1] += t : n ? (i[s] += e, i[s + 1] += t) : i.push(e, t);
}
function En(i, e, t) {
  if (t.length == 0)
    return;
  let n = e.length - 2 >> 1;
  if (n < i.length)
    i[i.length - 1] = i[i.length - 1].append(t);
  else {
    for (; i.length < n; )
      i.push(Ae.empty);
    i.push(t);
  }
}
function Sh(i, e, t) {
  let n = i.inserted;
  for (let s = 0, r = 0, o = 0; o < i.sections.length; ) {
    let l = i.sections[o++], a = i.sections[o++];
    if (a < 0)
      s += l, r += l;
    else {
      let h = s, c = r, f = Ae.empty;
      for (; h += l, c += a, a && n && (f = f.append(n[o - 2 >> 1])), !(t || o == i.sections.length || i.sections[o + 1] < 0); )
        l = i.sections[o++], a = i.sections[o++];
      e(s, h, r, c, f), s = h, r = c;
    }
  }
}
function kh(i, e, t, n = !1) {
  let s = [], r = n ? [] : null, o = new Fr(i), l = new Fr(e);
  for (let a = -1; ; ) {
    if (o.done && l.len || l.done && o.len)
      throw new Error("Mismatched change set lengths");
    if (o.ins == -1 && l.ins == -1) {
      let h = Math.min(o.len, l.len);
      Zt(s, h, -1), o.forward(h), l.forward(h);
    } else if (l.ins >= 0 && (o.ins < 0 || a == o.i || o.off == 0 && (l.len < o.len || l.len == o.len && !t))) {
      let h = l.len;
      for (Zt(s, l.ins, -1); h; ) {
        let c = Math.min(o.len, h);
        o.ins >= 0 && a < o.i && o.len <= c && (Zt(s, 0, o.ins), r && En(r, s, o.text), a = o.i), o.forward(c), h -= c;
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
      Zt(s, h, a < o.i ? o.ins : 0), r && a < o.i && En(r, s, o.text), a = o.i, o.forward(o.len - c);
    } else {
      if (o.done && l.done)
        return r ? mt.createSet(s, r) : Ji.create(s);
      throw new Error("Mismatched change set lengths");
    }
  }
}
function Hp(i, e, t = !1) {
  let n = [], s = t ? [] : null, r = new Fr(i), o = new Fr(e);
  for (let l = !1; ; ) {
    if (r.done && o.done)
      return s ? mt.createSet(n, s) : Ji.create(n);
    if (r.ins == 0)
      Zt(n, r.len, 0, l), r.next();
    else if (o.len == 0 && !o.done)
      Zt(n, 0, o.ins, l), s && En(s, n, o.text), o.next();
    else {
      if (r.done || o.done)
        throw new Error("Mismatched change set lengths");
      {
        let a = Math.min(r.len2, o.len), h = n.length;
        if (r.ins == -1) {
          let c = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
          Zt(n, a, c, l), s && c && En(s, n, o.text);
        } else o.ins == -1 ? (Zt(n, r.off ? 0 : r.len, a, l), s && En(s, n, r.textBit(a))) : (Zt(n, r.off ? 0 : r.len, o.off ? 0 : o.ins, l), s && !o.off && En(s, n, o.text));
        l = (r.ins > a || o.ins >= 0 && o.len > a) && (l || n.length > h), r.forward2(a), o.forward(a);
      }
    }
  }
}
class Fr {
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
    return t >= e.length ? Ae.empty : e[t];
  }
  textBit(e) {
    let { inserted: t } = this.set, n = this.i - 2 >> 1;
    return n >= t.length && !e ? Ae.empty : t[n].slice(this.off, e == null ? void 0 : this.off + e);
  }
  forward(e) {
    e == this.len ? this.next() : (this.len -= e, this.off += e);
  }
  forward2(e) {
    this.ins == -1 ? this.forward(e) : e == this.ins ? this.next() : (this.ins -= e, this.off += e);
  }
}
class $n {
  constructor(e, t, n, s) {
    this.from = e, this.to = t, this.flags = n, this.goalColumn = s;
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
    let n, s;
    return this.empty ? n = s = e.mapPos(this.from, t) : (n = e.mapPos(this.from, 1), s = e.mapPos(this.to, -1)), n == this.from && s == this.to ? this : new $n(n, s, this.flags, this.goalColumn);
  }
  /**
  Extend this range to cover at least `from` to `to`.
  */
  extend(e, t = e, n = 0) {
    if (e <= this.anchor && t >= this.anchor)
      return B.range(e, t, void 0, void 0, n);
    let s = Math.abs(e - this.anchor) > Math.abs(t - this.anchor) ? e : t;
    return B.range(this.anchor, s, void 0, void 0, n);
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
  static create(e, t, n, s) {
    return new $n(e, t, n, s);
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
    return e.empty ? this : B.create(this.ranges.map((n) => n.map(e, t)), this.mainIndex);
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
    for (let n = 0; n < this.ranges.length; n++)
      if (!this.ranges[n].eq(e.ranges[n], t))
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
    let n = this.ranges.slice();
    return n[t] = e, B.create(n, this.mainIndex);
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
    return new B(e.ranges.map((t) => $n.fromJSON(t)), e.main);
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
    for (let n = 0, s = 0; s < e.length; s++) {
      let r = e[s];
      if (r.empty ? r.from <= n : r.from < n)
        return B.normalized(e.slice(), t);
      n = r.to;
    }
    return new B(e, t);
  }
  /**
  Create a cursor selection range at the given position. You can
  safely ignore the optional arguments in most situations.
  */
  static cursor(e, t = 0, n, s) {
    return $n.create(e, e, (t == 0 ? 0 : t < 0 ? 8 : 16) | (n == null ? 7 : Math.min(6, n)), s);
  }
  /**
  Create a selection range.
  */
  static range(e, t, n, s, r) {
    let o = s == null ? 7 : Math.min(6, s);
    return !r && e != t && (r = t < e ? 1 : -1), r && (o |= r < 0 ? 8 : 16), t < e ? $n.create(t, e, o | 32, n) : $n.create(e, t, o, n);
  }
  /**
  Create an [undirectional](https://codemirror.net/6/docs/ref/#state.SelectionRange.undirectional)
  selection range.
  */
  static undirectionalRange(e, t) {
    return $n.create(e, t, 64, void 0);
  }
  /**
  @internal
  */
  static normalized(e, t = 0) {
    let n = e[t];
    e.sort((s, r) => s.from - r.from), t = e.indexOf(n);
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
function Kp(i, e) {
  for (let t of i.ranges)
    if (t.to > e)
      throw new RangeError("Selection points outside of document");
}
let Ac = 0;
class me {
  constructor(e, t, n, s, r) {
    this.combine = e, this.compareInput = t, this.compare = n, this.isStatic = s, this.id = Ac++, this.default = e([]), this.extensions = typeof r == "function" ? r(this) : r;
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
    return new me(e.combine || ((t) => t), e.compareInput || ((t, n) => t === n), e.compare || (e.combine ? (t, n) => t === n : Rc), !!e.static, e.enables);
  }
  /**
  Returns an extension that adds the given value to this facet.
  */
  of(e) {
    return new tl([], this, 0, e);
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
    return new tl(e, this, 1, t);
  }
  /**
  Create an extension that computes zero or more values for this
  facet from a state.
  */
  computeN(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new tl(e, this, 2, t);
  }
  from(e, t) {
    return t || (t = (n) => n), this.compute([e], (n) => t(n.field(e)));
  }
}
function Rc(i, e) {
  return i == e || i.length == e.length && i.every((t, n) => t === e[n]);
}
class tl {
  constructor(e, t, n, s) {
    this.dependencies = e, this.facet = t, this.type = n, this.value = s, this.id = Ac++;
  }
  dynamicSlot(e) {
    var t;
    let n = this.value, s = this.facet.compareInput, r = this.id, o = e[r] >> 1, l = this.type == 2, a = !1, h = !1, c = [];
    for (let f of this.dependencies)
      f == "doc" ? a = !0 : f == "selection" ? h = !0 : (((t = e[f.id]) !== null && t !== void 0 ? t : 1) & 1) == 0 && c.push(e[f.id]);
    return {
      create(f) {
        return f.values[o] = n(f), 1;
      },
      update(f, d) {
        if (a && d.docChanged || h && (d.docChanged || d.selection) || Qh(f, c)) {
          let p = n(f);
          if (l ? !Jf(p, f.values[o], s) : !s(p, f.values[o]))
            return f.values[o] = p, 1;
        }
        return 0;
      },
      reconfigure: (f, d) => {
        let p, O = d.config.address[r];
        if (O != null) {
          let g = pl(d, O);
          if (this.dependencies.every((m) => m instanceof me ? d.facet(m) === f.facet(m) : m instanceof sn ? d.field(m, !1) == f.field(m, !1) : !0) || (l ? Jf(p = n(f), g, s) : s(p = n(f), g)))
            return f.values[o] = g, 0;
        } else
          p = n(f);
        return f.values[o] = p, 1;
      }
    };
  }
  get extension() {
    return this;
  }
}
function Jf(i, e, t) {
  if (i.length != e.length)
    return !1;
  for (let n = 0; n < i.length; n++)
    if (!t(i[n], e[n]))
      return !1;
  return !0;
}
function Qh(i, e) {
  let t = !1;
  for (let n of e)
    zr(i, n) & 1 && (t = !0);
  return t;
}
function fy(i, e, t) {
  let n = t.map((a) => i[a.id]), s = t.map((a) => a.type), r = n.filter((a) => !(a & 1)), o = i[e.id] >> 1;
  function l(a) {
    let h = [];
    for (let c = 0; c < n.length; c++) {
      let f = pl(a, n[c]);
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
      for (let h of n)
        zr(a, h);
      return a.values[o] = l(a), 1;
    },
    update(a, h) {
      if (!Qh(a, r))
        return 0;
      let c = l(a);
      return e.compare(c, a.values[o]) ? 0 : (a.values[o] = c, 1);
    },
    reconfigure(a, h) {
      let c = Qh(a, n), f = h.config.facets[e.id], d = h.facet(e);
      if (f && !c && Rc(t, f))
        return a.values[o] = d, 0;
      let p = l(a);
      return e.compare(p, d) ? (a.values[o] = d, 0) : (a.values[o] = p, 1);
    }
  };
}
const Po = /* @__PURE__ */ me.define({ static: !0 });
class sn {
  constructor(e, t, n, s, r) {
    this.id = e, this.createF = t, this.updateF = n, this.compareF = s, this.spec = r, this.provides = void 0;
  }
  /**
  Define a state field.
  */
  static define(e) {
    let t = new sn(Ac++, e.create, e.update, e.compare || ((n, s) => n === s), e);
    return e.provide && (t.provides = e.provide(t)), t;
  }
  create(e) {
    let t = e.facet(Po).find((n) => n.field == this);
    return ((t == null ? void 0 : t.create) || this.createF)(e);
  }
  /**
  @internal
  */
  slot(e) {
    let t = e[this.id] >> 1;
    return {
      create: (n) => (n.values[t] = this.create(n), 1),
      update: (n, s) => {
        let r = n.values[t], o = this.updateF(r, s);
        return this.compareF(r, o) ? 0 : (n.values[t] = o, 1);
      },
      reconfigure: (n, s) => {
        let r = n.facet(Po), o = s.facet(Po), l;
        return (l = r.find((a) => a.field == this)) && l != o.find((a) => a.field == this) ? (n.values[t] = l.create(n), 1) : s.config.address[this.id] != null ? (n.values[t] = s.field(this), 0) : (n.values[t] = this.create(n), 1);
      }
    };
  }
  /**
  Returns an extension that enables this field and overrides the
  way it is initialized. Can be useful when you need to provide a
  non-default starting value for the field.
  */
  init(e) {
    return [this, Po.of({ field: this, create: e })];
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
const Vn = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
function yr(i) {
  return (e) => new Jp(e, i);
}
const mo = {
  /**
  The highest precedence level, for extensions that should end up
  near the start of the precedence ordering.
  */
  highest: /* @__PURE__ */ yr(Vn.highest),
  /**
  A higher-than-default precedence, for extensions that should
  come before those with default precedence.
  */
  high: /* @__PURE__ */ yr(Vn.high),
  /**
  The default precedence, which is also used for extensions
  without an explicit precedence.
  */
  default: /* @__PURE__ */ yr(Vn.default),
  /**
  A lower-than-default precedence.
  */
  low: /* @__PURE__ */ yr(Vn.low),
  /**
  The lowest precedence level. Meant for things that should end up
  near the end of the extension order.
  */
  lowest: /* @__PURE__ */ yr(Vn.lowest)
};
class Jp {
  constructor(e, t) {
    this.inner = e, this.prec = t;
  }
  get extension() {
    return this;
  }
}
class Ul {
  /**
  Create an instance of this compartment to add to your [state
  configuration](https://codemirror.net/6/docs/ref/#state.EditorStateConfig.extensions).
  */
  of(e) {
    return new $h(this, e);
  }
  /**
  Create an [effect](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) that
  reconfigures this compartment.
  */
  reconfigure(e) {
    return Ul.reconfigure.of({ compartment: this, extension: e });
  }
  /**
  Get the current content of the compartment in the state, or
  `undefined` if it isn't present.
  */
  get(e) {
    return e.config.compartments.get(this);
  }
}
class $h {
  constructor(e, t) {
    this.compartment = e, this.inner = t;
  }
  get extension() {
    return this;
  }
}
class dl {
  constructor(e, t, n, s, r, o) {
    for (this.base = e, this.compartments = t, this.dynamicSlots = n, this.address = s, this.staticValues = r, this.facets = o, this.statusTemplate = []; this.statusTemplate.length < n.length; )
      this.statusTemplate.push(
        0
        /* SlotStatus.Unresolved */
      );
  }
  staticFacet(e) {
    let t = this.address[e.id];
    return t == null ? e.default : this.staticValues[t >> 1];
  }
  static resolve(e, t, n) {
    let s = [], r = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ new Map();
    for (let d of uy(e, t, o))
      d instanceof sn ? s.push(d) : (r[d.facet.id] || (r[d.facet.id] = [])).push(d);
    let l = /* @__PURE__ */ Object.create(null), a = [], h = [];
    for (let d of s)
      l[d.id] = h.length << 1, h.push((p) => d.slot(p));
    let c = n == null ? void 0 : n.config.facets;
    for (let d in r) {
      let p = r[d], O = p[0].facet, g = c && c[d] || [];
      if (p.every(
        (m) => m.type == 0
        /* Provider.Static */
      ))
        if (l[O.id] = a.length << 1 | 1, Rc(g, p))
          a.push(n.facet(O));
        else {
          let m = O.combine(p.map((v) => v.value));
          a.push(n && O.compare(m, n.facet(O)) ? n.facet(O) : m);
        }
      else {
        for (let m of p)
          m.type == 0 ? (l[m.id] = a.length << 1 | 1, a.push(m.value)) : (l[m.id] = h.length << 1, h.push((v) => m.dynamicSlot(v)));
        l[O.id] = h.length << 1, h.push((m) => fy(m, O, p));
      }
    }
    let f = h.map((d) => d(l));
    return new dl(e, o, f, l, a, r);
  }
}
function uy(i, e, t) {
  let n = [[], [], [], [], []], s = /* @__PURE__ */ new Map();
  function r(o, l) {
    let a = s.get(o);
    if (a != null) {
      if (a <= l)
        return;
      let h = n[a].indexOf(o);
      h > -1 && n[a].splice(h, 1), o instanceof $h && t.delete(o.compartment);
    }
    if (s.set(o, l), Array.isArray(o))
      for (let h of o)
        r(h, l);
    else if (o instanceof $h) {
      if (t.has(o.compartment))
        throw new RangeError("Duplicate use of compartment in extensions");
      let h = e.get(o.compartment) || o.inner;
      t.set(o.compartment, h), r(h, l);
    } else if (o instanceof Jp)
      r(o.inner, o.prec);
    else if (o instanceof sn)
      n[l].push(o), o.provides && r(o.provides, l);
    else if (o instanceof tl)
      n[l].push(o), o.facet.extensions && r(o.facet.extensions, Vn.default);
    else {
      let h = o.extension;
      if (!h)
        throw new Error(`Unrecognized extension value in extension set (${o}).`);
      if (h == o)
        throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
      r(h, l);
    }
  }
  return r(i, Vn.default), n.reduce((o, l) => o.concat(l));
}
function zr(i, e) {
  if (e & 1)
    return 2;
  let t = e >> 1, n = i.status[t];
  if (n == 4)
    throw new Error("Cyclic dependency between fields and/or facets");
  if (n & 2)
    return n;
  i.status[t] = 4;
  let s = i.computeSlot(i, i.config.dynamicSlots[t]);
  return i.status[t] = 2 | s;
}
function pl(i, e) {
  return e & 1 ? i.config.staticValues[e >> 1] : i.values[e >> 1];
}
const eO = /* @__PURE__ */ me.define(), _h = /* @__PURE__ */ me.define({
  combine: (i) => i.some((e) => e),
  static: !0
}), tO = /* @__PURE__ */ me.define({
  combine: (i) => i.length ? i[0] : void 0,
  static: !0
}), iO = /* @__PURE__ */ me.define(), nO = /* @__PURE__ */ me.define(), sO = /* @__PURE__ */ me.define(), rO = /* @__PURE__ */ me.define({
  combine: (i) => i.length ? i[0] : !1
});
class bn {
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
    return new dy();
  }
}
class dy {
  /**
  Create an instance of this annotation.
  */
  of(e) {
    return new bn(this, e);
  }
}
class py {
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
    return new Ne(this, e);
  }
}
class Ne {
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
    return t === void 0 ? void 0 : t == this.value ? this : new Ne(this.type, t);
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
    return new py(e.map || ((t) => t));
  }
  /**
  Map an array of effects through a change set.
  */
  static mapEffects(e, t) {
    if (!e.length)
      return e;
    let n = [];
    for (let s of e) {
      let r = s.map(t);
      r && n.push(r);
    }
    return n;
  }
}
Ne.reconfigure = /* @__PURE__ */ Ne.define();
Ne.appendConfig = /* @__PURE__ */ Ne.define();
class Ot {
  constructor(e, t, n, s, r, o) {
    this.startState = e, this.changes = t, this.selection = n, this.effects = s, this.annotations = r, this.scrollIntoView = o, this._doc = null, this._state = null, n && Kp(n, t.newLength), r.some((l) => l.type == Ot.time) || (this.annotations = r.concat(Ot.time.of(Date.now())));
  }
  /**
  @internal
  */
  static create(e, t, n, s, r, o) {
    return new Ot(e, t, n, s, r, o);
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
    let t = this.annotation(Ot.userEvent);
    return !!(t && (t == e || t.length > e.length && t.slice(0, e.length) == e && t[e.length] == "."));
  }
}
Ot.time = /* @__PURE__ */ bn.define();
Ot.userEvent = /* @__PURE__ */ bn.define();
Ot.addToHistory = /* @__PURE__ */ bn.define();
Ot.remote = /* @__PURE__ */ bn.define();
function Oy(i, e) {
  let t = [];
  for (let n = 0, s = 0; ; ) {
    let r, o;
    if (n < i.length && (s == e.length || e[s] >= i[n]))
      r = i[n++], o = i[n++];
    else if (s < e.length)
      r = e[s++], o = e[s++];
    else
      return t;
    !t.length || t[t.length - 1] < r ? t.push(r, o) : t[t.length - 1] < o && (t[t.length - 1] = o);
  }
}
function oO(i, e, t) {
  var n;
  let s, r, o;
  return t ? (s = e.changes, r = mt.empty(e.changes.length), o = i.changes.compose(e.changes)) : (s = e.changes.map(i.changes), r = i.changes.mapDesc(e.changes, !0), o = i.changes.compose(s)), {
    changes: o,
    selection: e.selection ? e.selection.map(r) : (n = i.selection) === null || n === void 0 ? void 0 : n.map(s),
    effects: Ne.mapEffects(i.effects, s).concat(Ne.mapEffects(e.effects, r)),
    annotations: i.annotations.length ? i.annotations.concat(e.annotations) : e.annotations,
    scrollIntoView: i.scrollIntoView || e.scrollIntoView
  };
}
function Ph(i, e, t) {
  let n = e.selection, s = Xs(e.annotations);
  return e.userEvent && (s = s.concat(Ot.userEvent.of(e.userEvent))), {
    changes: e.changes instanceof mt ? e.changes : mt.of(e.changes || [], t, i.facet(tO)),
    selection: n && (n instanceof B ? n : B.single(n.anchor, n.head)),
    effects: Xs(e.effects),
    annotations: s,
    scrollIntoView: !!e.scrollIntoView
  };
}
function lO(i, e, t) {
  let n = Ph(i, e.length ? e[0] : {}, i.doc.length);
  e.length && e[0].filter === !1 && (t = !1);
  for (let r = 1; r < e.length; r++) {
    e[r].filter === !1 && (t = !1);
    let o = !!e[r].sequential;
    n = oO(n, Ph(i, e[r], o ? n.changes.newLength : i.doc.length), o);
  }
  let s = Ot.create(i, n.changes, n.selection, n.effects, n.annotations, n.scrollIntoView);
  return my(t ? gy(s) : s);
}
function gy(i) {
  let e = i.startState, t = !0;
  for (let s of e.facet(iO)) {
    let r = s(i);
    if (r === !1) {
      t = !1;
      break;
    }
    Array.isArray(r) && (t = t === !0 ? r : Oy(t, r));
  }
  if (t !== !0) {
    let s, r;
    if (t === !1)
      r = i.changes.invertedDesc, s = mt.empty(e.doc.length);
    else {
      let o = i.changes.filter(t);
      s = o.changes, r = o.filtered.mapDesc(o.changes).invertedDesc;
    }
    i = Ot.create(e, s, i.selection && i.selection.map(r), Ne.mapEffects(i.effects, r), i.annotations, i.scrollIntoView);
  }
  let n = e.facet(nO);
  for (let s = n.length - 1; s >= 0; s--) {
    let r = n[s](i);
    r instanceof Ot ? i = r : Array.isArray(r) && r.length == 1 && r[0] instanceof Ot ? i = r[0] : i = lO(e, Xs(r), !1);
  }
  return i;
}
function my(i) {
  let e = i.startState, t = e.facet(sO), n = i;
  for (let s = t.length - 1; s >= 0; s--) {
    let r = t[s](i);
    r && Object.keys(r).length && (n = oO(n, Ph(e, r, i.changes.newLength), !0));
  }
  return n == i ? i : Ot.create(e, i.changes, i.selection, n.effects, n.annotations, n.scrollIntoView);
}
const vy = [];
function Xs(i) {
  return i == null ? vy : Array.isArray(i) ? i : [i];
}
var fn = /* @__PURE__ */ (function(i) {
  return i[i.Word = 0] = "Word", i[i.Space = 1] = "Space", i[i.Other = 2] = "Other", i;
})(fn || (fn = {}));
const by = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
let Th;
try {
  Th = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
} catch {
}
function yy(i) {
  if (Th)
    return Th.test(i);
  for (let e = 0; e < i.length; e++) {
    let t = i[e];
    if (/\w/.test(t) || t > "" && (t.toUpperCase() != t.toLowerCase() || by.test(t)))
      return !0;
  }
  return !1;
}
function wy(i) {
  return (e) => {
    if (!/\S/.test(e))
      return fn.Space;
    if (yy(e))
      return fn.Word;
    for (let t = 0; t < i.length; t++)
      if (e.indexOf(i[t]) > -1)
        return fn.Word;
    return fn.Other;
  };
}
class Xe {
  constructor(e, t, n, s, r, o) {
    this.config = e, this.doc = t, this.selection = n, this.values = s, this.status = e.statusTemplate.slice(), this.computeSlot = r, o && (o._state = this);
    for (let l = 0; l < this.config.dynamicSlots.length; l++)
      zr(this, l << 1);
    this.computeSlot = null;
  }
  field(e, t = !0) {
    let n = this.config.address[e.id];
    if (n == null) {
      if (t)
        throw new RangeError("Field is not present in this state");
      return;
    }
    return zr(this, n), pl(this, n);
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
    return lO(this, e, !0);
  }
  /**
  @internal
  */
  applyTransaction(e) {
    let t = this.config, { base: n, compartments: s } = t;
    for (let l of e.effects)
      l.is(Ul.reconfigure) ? (t && (s = /* @__PURE__ */ new Map(), t.compartments.forEach((a, h) => s.set(h, a)), t = null), s.set(l.value.compartment, l.value.extension)) : l.is(Ne.reconfigure) ? (t = null, n = l.value) : l.is(Ne.appendConfig) && (t = null, n = Xs(n).concat(l.value));
    let r;
    t ? r = e.startState.values.slice() : (t = dl.resolve(n, s, this), r = new Xe(t, this.doc, this.selection, t.dynamicSlots.map(() => null), (a, h) => h.reconfigure(a, this), null).values);
    let o = e.startState.facet(_h) ? e.newSelection : e.newSelection.asSingle();
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
    let t = this.selection, n = e(t.ranges[0]), s = this.changes(n.changes), r = [n.range], o = Xs(n.effects);
    for (let l = 1; l < t.ranges.length; l++) {
      let a = e(t.ranges[l]), h = this.changes(a.changes), c = h.map(s);
      for (let d = 0; d < l; d++)
        r[d] = r[d].map(c);
      let f = s.mapDesc(h, !0);
      r.push(a.range.map(f)), s = s.compose(c), o = Ne.mapEffects(o, c).concat(Ne.mapEffects(Xs(a.effects), f));
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
    return e instanceof mt ? e : mt.of(e, this.doc.length, this.facet(Xe.lineSeparator));
  }
  /**
  Using the state's [line
  separator](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator), create a
  [`Text`](https://codemirror.net/6/docs/ref/#state.Text) instance from the given string.
  */
  toText(e) {
    return Ae.of(e.split(this.facet(Xe.lineSeparator) || xh));
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
    return t == null ? e.default : (zr(this, t), pl(this, t));
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
      for (let n in e) {
        let s = e[n];
        s instanceof sn && this.config.address[s.id] != null && (t[n] = s.spec.toJSON(this.field(e[n]), this));
      }
    return t;
  }
  /**
  Deserialize a state from its JSON representation. When custom
  fields should be deserialized, pass the same object you passed
  to [`toJSON`](https://codemirror.net/6/docs/ref/#state.EditorState.toJSON) when serializing as
  third argument.
  */
  static fromJSON(e, t = {}, n) {
    if (!e || typeof e.doc != "string")
      throw new RangeError("Invalid JSON representation for EditorState");
    let s = [];
    if (n) {
      for (let r in n)
        if (Object.prototype.hasOwnProperty.call(e, r)) {
          let o = n[r], l = e[r];
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
    let t = dl.resolve(e.extensions || [], /* @__PURE__ */ new Map()), n = e.doc instanceof Ae ? e.doc : Ae.of((e.doc || "").split(t.staticFacet(Xe.lineSeparator) || xh)), s = e.selection ? e.selection instanceof B ? e.selection : B.single(e.selection.anchor, e.selection.head) : B.single(0);
    return Kp(s, n.length), t.staticFacet(_h) || (s = s.asSingle()), new Xe(t, n, s, t.dynamicSlots.map(() => null), (r, o) => o.create(r), null);
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
    return this.facet(rO);
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
    for (let n of this.facet(Xe.phrases))
      if (Object.prototype.hasOwnProperty.call(n, e)) {
        e = n[e];
        break;
      }
    return t.length && (e = e.replace(/\$(\$|\d*)/g, (n, s) => {
      if (s == "$")
        return "$";
      let r = +(s || 1);
      return !r || r > t.length ? n : t[r - 1];
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
  languageDataAt(e, t, n = -1) {
    let s = [];
    for (let r of this.facet(eO))
      for (let o of r(this, t, n))
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
    return wy(t.length ? t[0] : "");
  }
  /**
  Find the word at the given position, meaning the range
  containing all [word](https://codemirror.net/6/docs/ref/#state.CharCategory.Word) characters
  around it. If no word characters are adjacent to the position,
  this returns null.
  */
  wordAt(e) {
    let { text: t, from: n, length: s } = this.doc.lineAt(e), r = this.charCategorizer(e), o = e - n, l = e - n;
    for (; o > 0; ) {
      let a = Ct(t, o, !1);
      if (r(t.slice(a, o)) != fn.Word)
        break;
      o = a;
    }
    for (; l < s; ) {
      let a = Ct(t, l);
      if (r(t.slice(l, a)) != fn.Word)
        break;
      l = a;
    }
    return o == l ? null : B.range(o + n, l + n);
  }
}
Xe.allowMultipleSelections = _h;
Xe.tabSize = /* @__PURE__ */ me.define({
  combine: (i) => i.length ? i[0] : 4
});
Xe.lineSeparator = tO;
Xe.readOnly = rO;
Xe.phrases = /* @__PURE__ */ me.define({
  compare(i, e) {
    let t = Object.keys(i), n = Object.keys(e);
    return t.length == n.length && t.every((s) => i[s] == e[s]);
  }
});
Xe.languageData = eO;
Xe.changeFilter = iO;
Xe.transactionFilter = nO;
Xe.transactionExtender = sO;
Ul.reconfigure = /* @__PURE__ */ Ne.define();
function Mc(i, e, t = {}) {
  let n = {};
  for (let s of i)
    for (let r of Object.keys(s)) {
      let o = s[r], l = n[r];
      if (l === void 0)
        n[r] = o;
      else if (!(l === o || o === void 0)) if (Object.hasOwnProperty.call(t, r))
        n[r] = t[r](l, o);
      else
        throw new Error("Config merge conflict for field " + r);
    }
  for (let s in e)
    n[s] === void 0 && (n[s] = e[s]);
  return n;
}
class jn {
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
    return Zh.create(e, t, this);
  }
}
jn.prototype.startSide = jn.prototype.endSide = 0;
jn.prototype.point = !1;
jn.prototype.mapMode = Xt.TrackDel;
function Xc(i, e) {
  return i == e || i.constructor == e.constructor && i.eq(e);
}
let Zh = class aO {
  constructor(e, t, n) {
    this.from = e, this.to = t, this.value = n;
  }
  /**
  @internal
  */
  static create(e, t, n) {
    return new aO(e, t, n);
  }
};
function Ch(i, e) {
  return i.from - e.from || i.value.startSide - e.value.startSide;
}
class jc {
  constructor(e, t, n, s) {
    this.from = e, this.to = t, this.value = n, this.maxPoint = s;
  }
  get length() {
    return this.to[this.to.length - 1];
  }
  // Find the index of the given position and side. Use the ranges'
  // `from` pos when `end == false`, `to` when `end == true`.
  findIndex(e, t, n, s = 0) {
    let r = n ? this.to : this.from;
    for (let o = s, l = r.length; ; ) {
      if (o == l)
        return o;
      let a = o + l >> 1, h = r[a] - e || (n ? this.value[a].endSide : this.value[a].startSide) - t;
      if (a == o)
        return h >= 0 ? o : l;
      h >= 0 ? l = a : o = a + 1;
    }
  }
  between(e, t, n, s) {
    for (let r = this.findIndex(t, -1e9, !0), o = this.findIndex(n, 1e9, !1, r); r < o; r++)
      if (s(this.from[r] + e, this.to[r] + e, this.value[r]) === !1)
        return !1;
  }
  map(e, t) {
    let n = [], s = [], r = [], o = -1, l = -1;
    for (let a = 0; a < this.value.length; a++) {
      let h = this.value[a], c = this.from[a] + e, f = this.to[a] + e, d, p;
      if (c == f) {
        let O = t.mapPos(c, h.startSide, h.mapMode);
        if (O == null || (d = p = O, h.startSide != h.endSide && (p = t.mapPos(c, h.endSide), p < d)))
          continue;
      } else if (d = t.mapPos(c, h.startSide), p = t.mapPos(f, h.endSide), d > p || d == p && h.startSide > 0 && h.endSide <= 0)
        continue;
      (p - d || h.endSide - h.startSide) < 0 || (o < 0 && (o = d), h.point && (l = Math.max(l, p - d)), n.push(h), s.push(d - o), r.push(p - o));
    }
    return { mapped: n.length ? new jc(s, r, n, l) : null, pos: o };
  }
}
class Ie {
  constructor(e, t, n, s) {
    this.chunkPos = e, this.chunk = t, this.nextLayer = n, this.maxPoint = s;
  }
  /**
  @internal
  */
  static create(e, t, n, s) {
    return new Ie(e, t, n, s);
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
    let { add: t = [], sort: n = !1, filterFrom: s = 0, filterTo: r = this.length } = e, o = e.filter;
    if (t.length == 0 && !o)
      return this;
    if (n && (t = t.slice().sort(Ch)), this.isEmpty)
      return t.length ? Ie.of(t) : this;
    let l = new hO(this, null, -1).goto(0), a = 0, h = [], c = new Ol();
    for (; l.value || a < t.length; )
      if (a < t.length && (l.from - t[a].from || l.startSide - t[a].value.startSide) >= 0) {
        let f = t[a++];
        c.addInner(f.from, f.to, f.value) || h.push(f);
      } else l.rangeIndex == 1 && l.chunkIndex < this.chunk.length && (a == t.length || this.chunkEnd(l.chunkIndex) < t[a].from) && (!o || s > this.chunkEnd(l.chunkIndex) || r < this.chunkPos[l.chunkIndex]) && c.addChunk(this.chunkPos[l.chunkIndex], this.chunk[l.chunkIndex]) ? l.nextChunk() : ((!o || s > l.to || r < l.from || o(l.from, l.to, l.value)) && (c.addInner(l.from, l.to, l.value) || h.push(Zh.create(l.from, l.to, l.value))), l.next());
    return c.finishInner(this.nextLayer.isEmpty && !h.length ? Ie.empty : this.nextLayer.update({ add: h, filter: o, filterFrom: s, filterTo: r }));
  }
  /**
  Map this range set through a set of changes, return the new set.
  */
  map(e) {
    if (e.empty || this.isEmpty)
      return this;
    let t = [], n = [], s = -1;
    for (let o = 0; o < this.chunk.length; o++) {
      let l = this.chunkPos[o], a = this.chunk[o], h = e.touchesRange(l, l + a.length);
      if (h === !1)
        s = Math.max(s, a.maxPoint), t.push(a), n.push(e.mapPos(l));
      else if (h === !0) {
        let { mapped: c, pos: f } = a.map(l, e);
        c && (s = Math.max(s, c.maxPoint), t.push(c), n.push(f));
      }
    }
    let r = this.nextLayer.map(e);
    return t.length == 0 ? r : new Ie(n, t, r || Ie.empty, s);
  }
  /**
  Iterate over the ranges that touch the region `from` to `to`,
  calling `f` for each. There is no guarantee that the ranges will
  be reported in any specific order. When the callback returns
  `false`, iteration stops.
  */
  between(e, t, n) {
    if (!this.isEmpty) {
      for (let s = 0; s < this.chunk.length; s++) {
        let r = this.chunkPos[s], o = this.chunk[s];
        if (t >= r && e <= r + o.length && o.between(r, e - r, t - r, n) === !1)
          return;
      }
      this.nextLayer.between(e, t, n);
    }
  }
  /**
  Iterate over the ranges in this set, in order, including all
  ranges that end at or after `from`.
  */
  iter(e = 0) {
    return Hr.from([this]).goto(e);
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
    return Hr.from(e).goto(t);
  }
  /**
  Iterate over two groups of sets, calling methods on `comparator`
  to notify it of possible differences.
  */
  static compare(e, t, n, s, r = -1) {
    let o = e.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= r), l = t.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= r), a = eu(o, l, n), h = new wr(o, a, r), c = new wr(l, a, r);
    n.iterGaps((f, d, p) => tu(h, f, c, d, p, s)), n.empty && n.length == 0 && tu(h, 0, c, 0, 0, s);
  }
  /**
  Compare the contents of two groups of range sets, returning true
  if they are equivalent in the given range.
  */
  static eq(e, t, n = 0, s) {
    s == null && (s = 999999999);
    let r = e.filter((c) => !c.isEmpty && t.indexOf(c) < 0), o = t.filter((c) => !c.isEmpty && e.indexOf(c) < 0);
    if (r.length != o.length)
      return !1;
    if (!r.length)
      return !0;
    let l = eu(r, o), a = new wr(r, l, 0).goto(n), h = new wr(o, l, 0).goto(n);
    for (; ; ) {
      if (a.to != h.to || !Eh(a.active, h.active) || a.point && (!h.point || !Xc(a.point, h.point)))
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
  static spans(e, t, n, s, r = -1) {
    let o = new wr(e, null, r).goto(t), l = t, a = o.openStart;
    for (; ; ) {
      let h = Math.min(o.to, n);
      if (o.point) {
        let c = o.activeForPoint(o.to), f = o.pointFrom < t ? c.length + 1 : o.point.startSide < 0 ? c.length : Math.min(c.length, a);
        s.point(l, h, o.point, c, f, o.pointRank), a = Math.min(o.openEnd(h), c.length);
      } else h > l && (s.span(l, h, o.active, a), a = o.openEnd(h));
      if (o.to > n)
        return a + (o.point && o.to > n ? 1 : 0);
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
    let n = new Ol();
    for (let s of e instanceof Zh ? [e] : t ? xy(e) : e)
      n.add(s.from, s.to, s.value);
    return n.finish();
  }
  /**
  Join an array of range sets into a single set.
  */
  static join(e) {
    if (!e.length)
      return Ie.empty;
    let t = e[e.length - 1];
    for (let n = e.length - 2; n >= 0; n--)
      for (let s = e[n]; s != Ie.empty; s = s.nextLayer)
        t = new Ie(s.chunkPos, s.chunk, t, Math.max(s.maxPoint, t.maxPoint));
    return t;
  }
}
Ie.empty = /* @__PURE__ */ new Ie([], [], null, -1);
function xy(i) {
  if (i.length > 1)
    for (let e = i[0], t = 1; t < i.length; t++) {
      let n = i[t];
      if (Ch(e, n) > 0)
        return i.slice().sort(Ch);
      e = n;
    }
  return i;
}
Ie.empty.nextLayer = Ie.empty;
class Ol {
  finishChunk(e) {
    this.chunks.push(new jc(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, e && (this.from = [], this.to = [], this.value = []);
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
  add(e, t, n) {
    this.addInner(e, t, n) || (this.nextLayer || (this.nextLayer = new Ol())).add(e, t, n);
  }
  /**
  @internal
  */
  addInner(e, t, n) {
    let s = e - this.lastTo || n.startSide - this.last.endSide;
    if (s <= 0 && (e - this.lastFrom || n.startSide - this.last.startSide) < 0)
      throw new Error("Ranges must be added sorted by `from` position and `startSide`");
    return s < 0 ? !1 : (this.from.length == 250 && this.finishChunk(!0), this.chunkStart < 0 && (this.chunkStart = e), this.from.push(e - this.chunkStart), this.to.push(t - this.chunkStart), this.last = n, this.lastFrom = e, this.lastTo = t, this.value.push(n), n.point && (this.maxPoint = Math.max(this.maxPoint, t - e)), !0);
  }
  /**
  @internal
  */
  addChunk(e, t) {
    if ((e - this.lastTo || t.value[0].startSide - this.last.endSide) < 0)
      return !1;
    this.from.length && this.finishChunk(!0), this.setMaxPoint = Math.max(this.setMaxPoint, t.maxPoint), this.chunks.push(t), this.chunkPos.push(e);
    let n = t.value.length - 1;
    return this.last = t.value[n], this.lastFrom = t.from[n] + e, this.lastTo = t.to[n] + e, !0;
  }
  /**
  Finish the range set. Returns the new set. The builder can't be
  used anymore after this has been called.
  */
  finish() {
    return this.finishInner(Ie.empty);
  }
  /**
  @internal
  */
  finishInner(e) {
    if (this.from.length && this.finishChunk(!1), this.chunks.length == 0)
      return e;
    let t = Ie.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(e) : e, this.setMaxPoint);
    return this.from = null, t;
  }
}
function eu(i, e, t) {
  let n = /* @__PURE__ */ new Map();
  for (let r of i)
    for (let o = 0; o < r.chunk.length; o++)
      r.chunk[o].maxPoint <= 0 && n.set(r.chunk[o], r.chunkPos[o]);
  let s = /* @__PURE__ */ new Set();
  for (let r of e)
    for (let o = 0; o < r.chunk.length; o++) {
      let l = n.get(r.chunk[o]);
      l != null && (t ? t.mapPos(l) : l) == r.chunkPos[o] && !(t != null && t.touchesRange(l, l + r.chunk[o].length)) && s.add(r.chunk[o]);
    }
  return s;
}
class hO {
  constructor(e, t, n, s = 0) {
    this.layer = e, this.skip = t, this.minPoint = n, this.rank = s;
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
  gotoInner(e, t, n) {
    for (; this.chunkIndex < this.layer.chunk.length; ) {
      let s = this.layer.chunk[this.chunkIndex];
      if (!(this.skip && this.skip.has(s) || this.layer.chunkEnd(this.chunkIndex) < e || s.maxPoint < this.minPoint))
        break;
      this.chunkIndex++, n = !1;
    }
    if (this.chunkIndex < this.layer.chunk.length) {
      let s = this.layer.chunk[this.chunkIndex].findIndex(e - this.layer.chunkPos[this.chunkIndex], t, !0);
      (!n || this.rangeIndex < s) && this.setRangeIndex(s);
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
        let e = this.layer.chunkPos[this.chunkIndex], t = this.layer.chunk[this.chunkIndex], n = e + t.from[this.rangeIndex];
        if (this.from = n, this.to = e + t.to[this.rangeIndex], this.value = t.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint)
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
class Hr {
  constructor(e) {
    this.heap = e;
  }
  static from(e, t = null, n = -1) {
    let s = [];
    for (let r = 0; r < e.length; r++)
      for (let o = e[r]; !o.isEmpty; o = o.nextLayer)
        o.maxPoint >= n && s.push(new hO(o, t, n, r));
    return s.length == 1 ? s[0] : new Hr(s);
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  goto(e, t = -1e9) {
    for (let n of this.heap)
      n.goto(e, t);
    for (let n = this.heap.length >> 1; n >= 0; n--)
      Za(this.heap, n);
    return this.next(), this;
  }
  forward(e, t) {
    for (let n of this.heap)
      n.forward(e, t);
    for (let n = this.heap.length >> 1; n >= 0; n--)
      Za(this.heap, n);
    (this.to - e || this.value.endSide - t) < 0 && this.next();
  }
  next() {
    if (this.heap.length == 0)
      this.from = this.to = 1e9, this.value = null, this.rank = -1;
    else {
      let e = this.heap[0];
      this.from = e.from, this.to = e.to, this.value = e.value, this.rank = e.rank, e.value && e.next(), Za(this.heap, 0);
    }
  }
}
function Za(i, e) {
  for (let t = i[e]; ; ) {
    let n = (e << 1) + 1;
    if (n >= i.length)
      break;
    let s = i[n];
    if (n + 1 < i.length && s.compare(i[n + 1]) >= 0 && (s = i[n + 1], n++), t.compare(s) < 0)
      break;
    i[n] = t, i[e] = s, e = n;
  }
}
class wr {
  constructor(e, t, n) {
    this.minPoint = n, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = Hr.from(e, t, n);
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
    To(this.active, e), To(this.activeTo, e), To(this.activeRank, e), this.minActive = iu(this.active, this.activeTo);
  }
  addActive(e) {
    let t = 0, { value: n, to: s, rank: r } = this.cursor;
    for (; t < this.activeRank.length && (r - this.activeRank[t] || s - this.activeTo[t]) > 0; )
      t++;
    Zo(this.active, t, n), Zo(this.activeTo, t, s), Zo(this.activeRank, t, r), e && Zo(e, t, this.cursor.from), this.minActive = iu(this.active, this.activeTo);
  }
  // After calling this, if `this.point` != null, the next range is a
  // point. Otherwise, it's a regular range, covered by `this.active`.
  next() {
    let e = this.to, t = this.point;
    this.point = null;
    let n = this.openStart < 0 ? [] : null;
    for (; ; ) {
      let s = this.minActive;
      if (s > -1 && (this.activeTo[s] - this.cursor.from || this.active[s].endSide - this.cursor.startSide) < 0) {
        if (this.activeTo[s] > e) {
          this.to = this.activeTo[s], this.endSide = this.active[s].endSide;
          break;
        }
        this.removeActive(s), n && To(n, s);
      } else if (this.cursor.value)
        if (this.cursor.from > e) {
          this.to = this.cursor.from, this.endSide = this.cursor.startSide;
          break;
        } else {
          let r = this.cursor.value;
          if (!r.point)
            this.addActive(n), this.cursor.next();
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
    if (n) {
      this.openStart = 0;
      for (let s = n.length - 1; s >= 0 && n[s] < e; s--)
        this.openStart++;
    }
  }
  activeForPoint(e) {
    if (!this.active.length)
      return this.active;
    let t = [];
    for (let n = this.active.length - 1; n >= 0 && !(this.activeRank[n] < this.pointRank); n--)
      (this.activeTo[n] > e || this.activeTo[n] == e && this.active[n].endSide >= this.point.endSide) && t.push(this.active[n]);
    return t.reverse();
  }
  openEnd(e) {
    let t = 0;
    for (let n = this.activeTo.length - 1; n >= 0 && this.activeTo[n] > e; n--)
      t++;
    return t;
  }
}
function tu(i, e, t, n, s, r) {
  i.goto(e), t.goto(n);
  let o = n + s, l = n, a = n - e, h = !!r.boundChange;
  for (let c = !1; ; ) {
    let f = i.to + a - t.to, d = f || i.endSide - t.endSide, p = d < 0 ? i.to + a : t.to, O = Math.min(p, o);
    if (i.point || t.point ? (i.point && t.point && Xc(i.point, t.point) && Eh(i.activeForPoint(i.to), t.activeForPoint(t.to)) || r.comparePoint(l, O, i.point, t.point), c = !1) : (c && r.boundChange(l), O > l && !Eh(i.active, t.active) && r.compareRange(l, O, i.active, t.active), h && O < o && (f || i.openEnd(p) != t.openEnd(p)) && (c = !0)), p > o)
      break;
    l = p, d <= 0 && i.next(), d >= 0 && t.next();
  }
}
function Eh(i, e) {
  if (i.length != e.length)
    return !1;
  for (let t = 0; t < i.length; t++)
    if (i[t] != e[t] && !Xc(i[t], e[t]))
      return !1;
  return !0;
}
function To(i, e) {
  for (let t = e, n = i.length - 1; t < n; t++)
    i[t] = i[t + 1];
  i.pop();
}
function Zo(i, e, t) {
  for (let n = i.length - 1; n >= e; n--)
    i[n + 1] = i[n];
  i[e] = t;
}
function iu(i, e) {
  let t = -1, n = 1e9;
  for (let s = 0; s < e.length; s++)
    (e[s] - n || i[s].endSide - i[t].endSide) < 0 && (t = s, n = e[s]);
  return t;
}
function Fl(i, e, t = i.length) {
  let n = 0;
  for (let s = 0; s < t && s < i.length; )
    i.charCodeAt(s) == 9 ? (n += e - n % e, s++) : (n++, s = Ct(i, s));
  return n;
}
function Sy(i, e, t, n) {
  for (let s = 0, r = 0; ; ) {
    if (r >= e)
      return s;
    if (s == i.length)
      break;
    r += i.charCodeAt(s) == 9 ? t - r % t : 1, s = Ct(i, s);
  }
  return i.length;
}
const Ah = "ͼ", nu = typeof Symbol > "u" ? "__" + Ah : Symbol.for(Ah), Rh = typeof Symbol > "u" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet"), su = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {};
class sr {
  // :: (Object<Style>, ?{finish: ?(string) → string})
  // Create a style module from the given spec.
  //
  // When `finish` is given, it is called on regular (non-`@`)
  // selectors (after `&` expansion) to compute the final selector.
  constructor(e, t) {
    this.rules = [];
    let { finish: n } = t || {};
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
      (c.length || d) && a.push((n && !f && !h ? o.map(n) : o).join(", ") + " {" + c.join(" ") + "}");
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
    let e = su[nu] || 1;
    return su[nu] = e + 1, Ah + e.toString(36);
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
  static mount(e, t, n) {
    let s = e[Rh], r = n && n.nonce;
    s ? r && s.setNonce(r) : s = new ky(e, r), s.mount(Array.isArray(t) ? t : [t], e);
  }
}
let ru = /* @__PURE__ */ new Map();
class ky {
  constructor(e, t) {
    let n = e.ownerDocument || e, s = n.defaultView;
    if (!e.head && e.adoptedStyleSheets && s.CSSStyleSheet) {
      let r = ru.get(n);
      if (r) return e[Rh] = r;
      this.sheet = new s.CSSStyleSheet(), ru.set(n, this);
    } else
      this.styleTag = n.createElement("style"), t && this.styleTag.setAttribute("nonce", t);
    this.modules = [], e[Rh] = this;
  }
  mount(e, t) {
    let n = this.sheet, s = 0, r = 0;
    for (let o = 0; o < e.length; o++) {
      let l = e[o], a = this.modules.indexOf(l);
      if (a < r && a > -1 && (this.modules.splice(a, 1), r--, a = -1), a == -1) {
        if (this.modules.splice(r++, 0, l), n) for (let h = 0; h < l.rules.length; h++)
          n.insertRule(l.rules[h], s++);
      } else {
        for (; r < a; ) s += this.modules[r++].rules.length;
        s += l.rules.length, r++;
      }
    }
    if (n)
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
var Ln = {
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
}, Kr = {
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
}, Qy = typeof navigator < "u" && /Mac/.test(navigator.platform), $y = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var _t = 0; _t < 10; _t++) Ln[48 + _t] = Ln[96 + _t] = String(_t);
for (var _t = 1; _t <= 24; _t++) Ln[_t + 111] = "F" + _t;
for (var _t = 65; _t <= 90; _t++)
  Ln[_t] = String.fromCharCode(_t + 32), Kr[_t] = String.fromCharCode(_t);
for (var Ca in Ln) Kr.hasOwnProperty(Ca) || (Kr[Ca] = Ln[Ca]);
function _y(i) {
  var e = Qy && i.metaKey && i.shiftKey && !i.ctrlKey && !i.altKey || $y && i.shiftKey && i.key && i.key.length == 1 || i.key == "Unidentified", t = !e && i.key || (i.shiftKey ? Kr : Ln)[i.keyCode] || i.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
let Mt = typeof navigator < "u" ? navigator : { userAgent: "", vendor: "", platform: "" }, Mh = typeof document < "u" ? document : { documentElement: { style: {} } };
const Xh = /* @__PURE__ */ /Edge\/(\d+)/.exec(Mt.userAgent), cO = /* @__PURE__ */ /MSIE \d/.test(Mt.userAgent), jh = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Mt.userAgent), Hl = !!(cO || jh || Xh), ou = !Hl && /* @__PURE__ */ /gecko\/(\d+)/i.test(Mt.userAgent), Ea = !Hl && /* @__PURE__ */ /Chrome\/(\d+)/.exec(Mt.userAgent), lu = "webkitFontSmoothing" in Mh.documentElement.style, Lh = !Hl && /* @__PURE__ */ /Apple Computer/.test(Mt.vendor), au = Lh && (/* @__PURE__ */ /Mobile\/\w+/.test(Mt.userAgent) || Mt.maxTouchPoints > 2);
var re = {
  mac: au || /* @__PURE__ */ /Mac/.test(Mt.platform),
  windows: /* @__PURE__ */ /Win/.test(Mt.platform),
  linux: /* @__PURE__ */ /Linux|X11/.test(Mt.platform),
  ie: Hl,
  ie_version: cO ? Mh.documentMode || 6 : jh ? +jh[1] : Xh ? +Xh[1] : 0,
  gecko: ou,
  gecko_version: ou ? +(/* @__PURE__ */ /Firefox\/(\d+)/.exec(Mt.userAgent) || [0, 0])[1] : 0,
  chrome: !!Ea,
  chrome_version: Ea ? +Ea[1] : 0,
  ios: au,
  android: /* @__PURE__ */ /Android\b/.test(Mt.userAgent),
  webkit: lu,
  webkit_version: lu ? +(/* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(Mt.userAgent) || [0, 0])[1] : 0,
  safari: Lh,
  safari_version: Lh ? +(/* @__PURE__ */ /\bVersion\/(\d+(\.\d+)?)/.exec(Mt.userAgent) || [0, 0])[1] : 0,
  tabSize: Mh.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
};
function Lc(i, e) {
  for (let t in i)
    t == "class" && e.class ? e.class += " " + i.class : t == "style" && e.style ? e.style += ";" + i.style : e[t] = i[t];
  return e;
}
const gl = /* @__PURE__ */ Object.create(null);
function Ic(i, e, t) {
  if (i == e)
    return !0;
  i || (i = gl), e || (e = gl);
  let n = Object.keys(i), s = Object.keys(e);
  if (n.length - 0 != s.length - 0)
    return !1;
  for (let r of n)
    if (r != t && (s.indexOf(r) == -1 || i[r] !== e[r]))
      return !1;
  return !0;
}
function Py(i, e) {
  for (let t = i.attributes.length - 1; t >= 0; t--) {
    let n = i.attributes[t].name;
    e[n] == null && i.removeAttribute(n);
  }
  for (let t in e) {
    let n = e[t];
    t == "style" ? i.style.cssText = n : i.getAttribute(t) != n && i.setAttribute(t, n);
  }
}
function hu(i, e, t) {
  let n = !1;
  if (e)
    for (let s in e)
      t && s in t || (n = !0, s == "style" ? i.style.cssText = "" : i.removeAttribute(s));
  if (t)
    for (let s in t)
      e && e[s] == t[s] || (n = !0, s == "style" ? i.style.cssText = t[s] : i.setAttribute(s, t[s]));
  return n;
}
function Ty(i) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t = 0; t < i.attributes.length; t++) {
    let n = i.attributes[t];
    e[n.name] = n.value;
  }
  return e;
}
class Or {
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
  updateDOM(e, t, n) {
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
  coordsAt(e, t, n) {
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
var yi = /* @__PURE__ */ (function(i) {
  return i[i.Text = 0] = "Text", i[i.WidgetBefore = 1] = "WidgetBefore", i[i.WidgetAfter = 2] = "WidgetAfter", i[i.WidgetRange = 3] = "WidgetRange", i;
})(yi || (yi = {}));
class We extends jn {
  constructor(e, t, n, s) {
    super(), this.startSide = e, this.endSide = t, this.widget = n, this.spec = s;
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
    return new vo(e);
  }
  /**
  Create a widget decoration, which displays a DOM element at the
  given position.
  */
  static widget(e) {
    let t = Math.max(-1e4, Math.min(1e4, e.side || 0)), n = !!e.block;
    return t += n && !e.inlineOrder ? t > 0 ? 3e8 : -4e8 : t > 0 ? 1e8 : -1e8, new Os(e, t, t, n, e.widget || null, !1);
  }
  /**
  Create a replace decoration which replaces the given range with
  a widget, or simply hides it.
  */
  static replace(e) {
    let t = !!e.block, n, s;
    if (e.isBlockGap)
      n = -5e8, s = 4e8;
    else {
      let { start: r, end: o } = fO(e, t);
      n = (r ? t ? -3e8 : -1 : 5e8) - 1, s = (o ? t ? 2e8 : 1 : -6e8) + 1;
    }
    return new Os(e, n, s, t, e.widget || null, !0);
  }
  /**
  Create a line decoration, which can add DOM attributes to the
  line starting at the given position.
  */
  static line(e) {
    return new bo(e);
  }
  /**
  Build a [`DecorationSet`](https://codemirror.net/6/docs/ref/#view.DecorationSet) from the given
  decorated range or ranges. If the ranges aren't already sorted,
  pass `true` for `sort` to make the library sort them for you.
  */
  static set(e, t = !1) {
    return Ie.of(e, t);
  }
  /**
  @internal
  */
  hasHeight() {
    return this.widget ? this.widget.estimatedHeight > -1 : !1;
  }
}
We.none = Ie.empty;
class vo extends We {
  constructor(e) {
    let { start: t, end: n } = fO(e);
    super(t ? -1 : 5e8, n ? 1 : -6e8, null, e), this.tagName = e.tagName || "span", this.attrs = e.class && e.attributes ? Lc(e.attributes, { class: e.class }) : e.class ? { class: e.class } : e.attributes || gl;
  }
  eq(e) {
    return this == e || e instanceof vo && this.tagName == e.tagName && Ic(this.attrs, e.attrs);
  }
  range(e, t = e) {
    if (e >= t)
      throw new RangeError("Mark decorations may not be empty");
    return super.range(e, t);
  }
}
vo.prototype.point = !1;
class bo extends We {
  constructor(e) {
    super(-2e8, -2e8, null, e);
  }
  eq(e) {
    return e instanceof bo && this.spec.class == e.spec.class && Ic(this.spec.attributes, e.spec.attributes);
  }
  range(e, t = e) {
    if (t != e)
      throw new RangeError("Line decoration ranges must be zero-length");
    return super.range(e, t);
  }
}
bo.prototype.mapMode = Xt.TrackBefore;
bo.prototype.point = !0;
class Os extends We {
  constructor(e, t, n, s, r, o) {
    super(t, n, r, e), this.block = s, this.isReplace = o, this.mapMode = s ? t <= 0 ? Xt.TrackBefore : Xt.TrackAfter : Xt.TrackDel;
  }
  // Only relevant when this.block == true
  get type() {
    return this.startSide != this.endSide ? yi.WidgetRange : this.startSide <= 0 ? yi.WidgetBefore : yi.WidgetAfter;
  }
  get heightRelevant() {
    return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
  }
  eq(e) {
    return e instanceof Os && Zy(this.widget, e.widget) && this.block == e.block && this.startSide == e.startSide && this.endSide == e.endSide;
  }
  range(e, t = e) {
    if (this.isReplace && (e > t || e == t && this.startSide > 0 && this.endSide <= 0))
      throw new RangeError("Invalid range for replacement decoration");
    if (!this.isReplace && t != e)
      throw new RangeError("Widget decorations can only have zero-length ranges");
    return super.range(e, t);
  }
}
Os.prototype.point = !0;
function fO(i, e = !1) {
  let { inclusiveStart: t, inclusiveEnd: n } = i;
  return t == null && (t = i.inclusive), n == null && (n = i.inclusive), { start: t ?? e, end: n ?? e };
}
function Zy(i, e) {
  return i == e || !!(i && e && i.compare(e));
}
function js(i, e, t, n = 0) {
  let s = t.length - 1;
  s >= 0 && t[s] + n >= i ? t[s] = Math.max(t[s], e) : t.push(i, e);
}
class Jr extends jn {
  constructor(e, t, n) {
    super(), this.tagName = e, this.attributes = t, this.rank = n;
  }
  eq(e) {
    return e == this || e instanceof Jr && this.tagName == e.tagName && Ic(this.attributes, e.attributes);
  }
  /**
  Create a block wrapper object with the given tag name and
  attributes.
  */
  static create(e) {
    return new Jr(e.tagName, e.attributes || gl, e.rank == null ? 50 : Math.max(0, Math.min(e.rank, 100)));
  }
  /**
  Create a range set from the given block wrapper ranges.
  */
  static set(e, t = !1) {
    return Ie.of(e, t);
  }
}
Jr.prototype.startSide = Jr.prototype.endSide = -1;
function eo(i) {
  let e;
  return i.nodeType == 11 ? e = i.getSelection ? i : i.ownerDocument : e = i, e.getSelection();
}
function Ih(i, e) {
  return e ? i == e || i.contains(e.nodeType != 1 ? e.parentNode : e) : !1;
}
function Nr(i, e) {
  if (!e.anchorNode)
    return !1;
  try {
    return Ih(i, e.anchorNode);
  } catch {
    return !1;
  }
}
function Yr(i) {
  return i.nodeType == 3 ? io(i, 0, i.nodeValue.length).getClientRects() : i.nodeType == 1 ? i.getClientRects() : [];
}
function Wr(i, e, t, n) {
  return t ? cu(i, e, t, n, -1) || cu(i, e, t, n, 1) : !1;
}
function In(i) {
  for (var e = 0; ; e++)
    if (i = i.previousSibling, !i)
      return e;
}
function ml(i) {
  return i.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(i.nodeName);
}
function cu(i, e, t, n, s) {
  for (; ; ) {
    if (i == t && e == n)
      return !0;
    if (e == (s < 0 ? 0 : mn(i))) {
      if (i.nodeName == "DIV")
        return !1;
      let r = i.parentNode;
      if (!r || r.nodeType != 1)
        return !1;
      e = In(i) + (s < 0 ? 0 : 1), i = r;
    } else if (i.nodeType == 1) {
      if (i = i.childNodes[e + (s < 0 ? -1 : 0)], i.nodeType == 1 && i.contentEditable == "false")
        return !1;
      e = s < 0 ? mn(i) : 0;
    } else
      return !1;
  }
}
function mn(i) {
  return i.nodeType == 3 ? i.nodeValue.length : i.childNodes.length;
}
function to(i, e) {
  let { left: t, right: n } = i;
  if (t == n)
    return i;
  let s = e ? t : n;
  return { left: s, right: s, top: i.top, bottom: i.bottom };
}
function Cy(i) {
  let e = i.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: i.innerWidth,
    top: 0,
    bottom: i.innerHeight
  };
}
function uO(i, e) {
  let t = e.width / i.offsetWidth, n = e.height / i.offsetHeight;
  return (t > 0.995 && t < 1.005 || !isFinite(t) || Math.abs(e.width - i.offsetWidth) < 1) && (t = 1), (n > 0.995 && n < 1.005 || !isFinite(n) || Math.abs(e.height - i.offsetHeight) < 1) && (n = 1), { scaleX: t, scaleY: n };
}
function Ey(i, e, t, n, s, r, o, l) {
  let a = i.ownerDocument, h = a.defaultView || window;
  for (let c = i, f = !1; c && !f; )
    if (c.nodeType == 1) {
      let d, p = c == a.body, O = 1, g = 1;
      if (p)
        d = Cy(h);
      else {
        if (/^(fixed|sticky)$/.test(getComputedStyle(c).position) && (f = !0), c.scrollHeight <= c.clientHeight && c.scrollWidth <= c.clientWidth) {
          c = c.assignedSlot || c.parentNode;
          continue;
        }
        let y = c.getBoundingClientRect();
        ({ scaleX: O, scaleY: g } = uO(c, y)), d = {
          left: y.left,
          right: y.left + c.clientWidth * O,
          top: y.top,
          bottom: y.top + c.clientHeight * g
        };
      }
      let m = 0, v = 0;
      if (s == "nearest")
        e.top < d.top + o ? (v = e.top - (d.top + o), t > 0 && e.bottom > d.bottom + v && (v = e.bottom - d.bottom + o)) : e.bottom > d.bottom - o && (v = e.bottom - d.bottom + o, t < 0 && e.top - v < d.top && (v = e.top - (d.top + o)));
      else {
        let y = e.bottom - e.top, $ = d.bottom - d.top;
        v = (s == "center" && y <= $ ? e.top + y / 2 - $ / 2 : s == "start" || s == "center" && t < 0 ? e.top - o : e.bottom - $ + o) - d.top;
      }
      if (n == "nearest" ? e.left < d.left + r ? (m = e.left - (d.left + r), t > 0 && e.right > d.right + m && (m = e.right - d.right + r)) : e.right > d.right - r && (m = e.right - d.right + r, t < 0 && e.left < d.left + m && (m = e.left - (d.left + r))) : m = (n == "center" ? e.left + (e.right - e.left) / 2 - (d.right - d.left) / 2 : n == "start" == l ? e.left - r : e.right - (d.right - d.left) + r) - d.left, m || v)
        if (p)
          h.scrollBy(m, v);
        else {
          let y = 0, $ = 0;
          if (v) {
            let Z = c.scrollTop;
            c.scrollTop += v / g, $ = (c.scrollTop - Z) * g;
          }
          if (m) {
            let Z = c.scrollLeft;
            c.scrollLeft += m / O, y = (c.scrollLeft - Z) * O;
          }
          e = {
            left: e.left - y,
            top: e.top - $,
            right: e.right - y,
            bottom: e.bottom - $
          }, y && Math.abs(y - m) < 1 && (n = "nearest"), $ && Math.abs($ - v) < 1 && (s = "nearest");
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
function dO(i, e = !0) {
  let t = i.ownerDocument, n = null, s = null;
  for (let r = i.parentNode; r && !(r == t.body || (!e || n) && s); )
    if (r.nodeType == 1)
      !s && r.scrollHeight > r.clientHeight && (s = r), e && !n && r.scrollWidth > r.clientWidth && (n = r), r = r.assignedSlot || r.parentNode;
    else if (r.nodeType == 11)
      r = r.host;
    else
      break;
  return { x: n, y: s };
}
class Ay {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  eq(e) {
    return this.anchorNode == e.anchorNode && this.anchorOffset == e.anchorOffset && this.focusNode == e.focusNode && this.focusOffset == e.focusOffset;
  }
  setRange(e) {
    let { anchorNode: t, focusNode: n } = e;
    this.set(t, Math.min(e.anchorOffset, t ? mn(t) : 0), n, Math.min(e.focusOffset, n ? mn(n) : 0));
  }
  set(e, t, n, s) {
    this.anchorNode = e, this.anchorOffset = t, this.focusNode = n, this.focusOffset = s;
  }
}
let qn = null;
re.safari && re.safari_version >= 26 && (qn = !1);
function pO(i) {
  if (i.setActive)
    return i.setActive();
  if (qn)
    return i.focus(qn);
  let e = [];
  for (let t = i; t && (e.push(t, t.scrollTop, t.scrollLeft), t != t.ownerDocument); t = t.parentNode)
    ;
  if (i.focus(qn == null ? {
    get preventScroll() {
      return qn = { preventScroll: !0 }, !0;
    }
  } : void 0), !qn) {
    qn = !1;
    for (let t = 0; t < e.length; ) {
      let n = e[t++], s = e[t++], r = e[t++];
      n.scrollTop != s && (n.scrollTop = s), n.scrollLeft != r && (n.scrollLeft = r);
    }
  }
}
let fu;
function io(i, e, t = e) {
  let n = fu || (fu = document.createRange());
  return n.setEnd(i, t), n.setStart(i, e), n;
}
function Ls(i, e, t, n) {
  let s = { key: e, code: e, keyCode: t, which: t, cancelable: !0 };
  n && ({ altKey: s.altKey, ctrlKey: s.ctrlKey, shiftKey: s.shiftKey, metaKey: s.metaKey } = n);
  let r = new KeyboardEvent("keydown", s);
  r.synthetic = !0, i.dispatchEvent(r);
  let o = new KeyboardEvent("keyup", s);
  return o.synthetic = !0, i.dispatchEvent(o), r.defaultPrevented || o.defaultPrevented;
}
function Ry(i) {
  for (; i; ) {
    if (i && (i.nodeType == 9 || i.nodeType == 11 && i.host))
      return i;
    i = i.assignedSlot || i.parentNode;
  }
  return null;
}
function My(i, e) {
  let t = e.focusNode, n = e.focusOffset;
  if (!t || e.anchorNode != t || e.anchorOffset != n)
    return !1;
  for (n = Math.min(n, mn(t)); ; )
    if (n) {
      if (t.nodeType != 1)
        return !1;
      let s = t.childNodes[n - 1];
      s.contentEditable == "false" ? n-- : (t = s, n = mn(t));
    } else {
      if (t == i)
        return !0;
      n = In(t), t = t.parentNode;
    }
}
function OO(i) {
  return i instanceof Window ? i.pageYOffset > Math.max(0, i.document.documentElement.scrollHeight - i.innerHeight - 4) : i.scrollTop > Math.max(1, i.scrollHeight - i.clientHeight - 4);
}
function gO(i, e) {
  for (let t = i, n = e; ; ) {
    if (t.nodeType == 3 && n > 0)
      return { node: t, offset: n };
    if (t.nodeType == 1 && n > 0) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[n - 1], n = mn(t);
    } else if (t.parentNode && !ml(t))
      n = In(t), t = t.parentNode;
    else
      return null;
  }
}
function mO(i, e) {
  for (let t = i, n = e; ; ) {
    if (t.nodeType == 3 && n < t.nodeValue.length)
      return { node: t, offset: n };
    if (t.nodeType == 1 && n < t.childNodes.length) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[n], n = 0;
    } else if (t.parentNode && !ml(t))
      n = In(t) + 1, t = t.parentNode;
    else
      return null;
  }
}
class Ci {
  constructor(e, t, n = !0) {
    this.node = e, this.offset = t, this.precise = n;
  }
  static before(e, t) {
    return new Ci(e.parentNode, In(e), t);
  }
  static after(e, t) {
    return new Ci(e.parentNode, In(e) + 1, t);
  }
}
var lt = /* @__PURE__ */ (function(i) {
  return i[i.LTR = 0] = "LTR", i[i.RTL = 1] = "RTL", i;
})(lt || (lt = {}));
const gs = lt.LTR, Dc = lt.RTL;
function vO(i) {
  let e = [];
  for (let t = 0; t < i.length; t++)
    e.push(1 << +i[t]);
  return e;
}
const Xy = /* @__PURE__ */ vO("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), jy = /* @__PURE__ */ vO("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), Dh = /* @__PURE__ */ Object.create(null), ji = [];
for (let i of ["()", "[]", "{}"]) {
  let e = /* @__PURE__ */ i.charCodeAt(0), t = /* @__PURE__ */ i.charCodeAt(1);
  Dh[e] = t, Dh[t] = -e;
}
function bO(i) {
  return i <= 247 ? Xy[i] : 1424 <= i && i <= 1524 ? 2 : 1536 <= i && i <= 1785 ? jy[i - 1536] : 1774 <= i && i <= 2220 ? 4 : 8192 <= i && i <= 8204 ? 256 : 64336 <= i && i <= 65023 ? 4 : 1;
}
const Ly = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
class Gi {
  /**
  The direction of this span.
  */
  get dir() {
    return this.level % 2 ? Dc : gs;
  }
  /**
  @internal
  */
  constructor(e, t, n) {
    this.from = e, this.to = t, this.level = n;
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
  static find(e, t, n, s) {
    let r = -1;
    for (let o = 0; o < e.length; o++) {
      let l = e[o];
      if (l.from <= t && l.to >= t) {
        if (l.level == n)
          return o;
        (r < 0 || (s != 0 ? s < 0 ? l.from < t : l.to > t : e[r].level > l.level)) && (r = o);
      }
    }
    if (r < 0)
      throw new RangeError("Index out of range");
    return r;
  }
}
function yO(i, e) {
  if (i.length != e.length)
    return !1;
  for (let t = 0; t < i.length; t++) {
    let n = i[t], s = e[t];
    if (n.from != s.from || n.to != s.to || n.direction != s.direction || !yO(n.inner, s.inner))
      return !1;
  }
  return !0;
}
const Ye = [];
function Iy(i, e, t, n, s) {
  for (let r = 0; r <= n.length; r++) {
    let o = r ? n[r - 1].to : e, l = r < n.length ? n[r].from : t, a = r ? 256 : s;
    for (let h = o, c = a, f = a; h < l; h++) {
      let d = bO(i.charCodeAt(h));
      d == 512 ? d = c : d == 8 && f == 4 && (d = 16), Ye[h] = d == 4 ? 2 : d, d & 7 && (f = d), c = d;
    }
    for (let h = o, c = a, f = a; h < l; h++) {
      let d = Ye[h];
      if (d == 128)
        h < l - 1 && c == Ye[h + 1] && c & 24 ? d = Ye[h] = c : Ye[h] = 256;
      else if (d == 64) {
        let p = h + 1;
        for (; p < l && Ye[p] == 64; )
          p++;
        let O = h && c == 8 || p < t && Ye[p] == 8 ? f == 1 ? 1 : 8 : 256;
        for (let g = h; g < p; g++)
          Ye[g] = O;
        h = p - 1;
      } else d == 8 && f == 1 && (Ye[h] = 1);
      c = d, d & 7 && (f = d);
    }
  }
}
function Dy(i, e, t, n, s) {
  let r = s == 1 ? 2 : 1;
  for (let o = 0, l = 0, a = 0; o <= n.length; o++) {
    let h = o ? n[o - 1].to : e, c = o < n.length ? n[o].from : t;
    for (let f = h, d, p, O; f < c; f++)
      if (p = Dh[d = i.charCodeAt(f)])
        if (p < 0) {
          for (let g = l - 3; g >= 0; g -= 3)
            if (ji[g + 1] == -p) {
              let m = ji[g + 2], v = m & 2 ? s : m & 4 ? m & 1 ? r : s : 0;
              v && (Ye[f] = Ye[ji[g]] = v), l = g;
              break;
            }
        } else {
          if (ji.length == 189)
            break;
          ji[l++] = f, ji[l++] = d, ji[l++] = a;
        }
      else if ((O = Ye[f]) == 2 || O == 1) {
        let g = O == s;
        a = g ? 0 : 1;
        for (let m = l - 3; m >= 0; m -= 3) {
          let v = ji[m + 2];
          if (v & 2)
            break;
          if (g)
            ji[m + 2] |= 2;
          else {
            if (v & 4)
              break;
            ji[m + 2] |= 4;
          }
        }
      }
  }
}
function zy(i, e, t, n) {
  for (let s = 0, r = n; s <= t.length; s++) {
    let o = s ? t[s - 1].to : i, l = s < t.length ? t[s].from : e;
    for (let a = o; a < l; ) {
      let h = Ye[a];
      if (h == 256) {
        let c = a + 1;
        for (; ; )
          if (c == l) {
            if (s == t.length)
              break;
            c = t[s++].to, l = s < t.length ? t[s].from : e;
          } else if (Ye[c] == 256)
            c++;
          else
            break;
        let f = r == 1, d = (c < e ? Ye[c] : n) == 1, p = f == d ? f ? 1 : 2 : n;
        for (let O = c, g = s, m = g ? t[g - 1].to : i; O > a; )
          O == m && (O = t[--g].from, m = g ? t[g - 1].to : i), Ye[--O] = p;
        a = c;
      } else
        r = h, a++;
    }
  }
}
function zh(i, e, t, n, s, r, o) {
  let l = n % 2 ? 2 : 1;
  if (n % 2 == s % 2)
    for (let a = e, h = 0; a < t; ) {
      let c = !0, f = !1;
      if (h == r.length || a < r[h].from) {
        let g = Ye[a];
        g != l && (c = !1, f = g == 16);
      }
      let d = !c && l == 1 ? [] : null, p = c ? n : n + 1, O = a;
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
                if (Ye[m] == l)
                  break e;
                break;
              }
            }
          if (h++, d)
            d.push(g);
          else {
            g.from > a && o.push(new Gi(a, g.from, p));
            let m = g.direction == gs != !(p % 2);
            Nh(i, m ? n + 1 : n, s, g.inner, g.from, g.to, o), a = g.to;
          }
          O = g.to;
        } else {
          if (O == t || (c ? Ye[O] != l : Ye[O] == l))
            break;
          O++;
        }
      d ? zh(i, a, O, n + 1, s, d, o) : a < O && o.push(new Gi(a, O, p)), a = O;
    }
  else
    for (let a = t, h = r.length; a > e; ) {
      let c = !0, f = !1;
      if (!h || a > r[h - 1].to) {
        let g = Ye[a - 1];
        g != l && (c = !1, f = g == 16);
      }
      let d = !c && l == 1 ? [] : null, p = c ? n : n + 1, O = a;
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
                if (Ye[m - 1] == l)
                  break e;
                break;
              }
            }
          if (d)
            d.push(g);
          else {
            g.to < a && o.push(new Gi(g.to, a, p));
            let m = g.direction == gs != !(p % 2);
            Nh(i, m ? n + 1 : n, s, g.inner, g.from, g.to, o), a = g.from;
          }
          O = g.from;
        } else {
          if (O == e || (c ? Ye[O - 1] != l : Ye[O - 1] == l))
            break;
          O--;
        }
      d ? zh(i, O, a, n + 1, s, d, o) : O < a && o.push(new Gi(O, a, p)), a = O;
    }
}
function Nh(i, e, t, n, s, r, o) {
  let l = e % 2 ? 2 : 1;
  Iy(i, s, r, n, l), Dy(i, s, r, n, l), zy(s, r, n, l), zh(i, s, r, e, t, n, o);
}
function Ny(i, e, t) {
  if (!i)
    return [new Gi(0, 0, e == Dc ? 1 : 0)];
  if (e == gs && !t.length && !Ly.test(i))
    return wO(i.length);
  if (t.length)
    for (; i.length > Ye.length; )
      Ye[Ye.length] = 256;
  let n = [], s = e == gs ? 0 : 1;
  return Nh(i, s, s, t, 0, i.length, n), n;
}
function wO(i) {
  return [new Gi(0, i, 0)];
}
let xO = "";
function Yy(i, e, t, n, s) {
  var r;
  let o = n.head - i.from, l = Gi.find(e, o, (r = n.bidiLevel) !== null && r !== void 0 ? r : -1, n.assoc), a = e[l], h = a.side(s, t);
  if (o == h) {
    let d = l += s ? 1 : -1;
    if (d < 0 || d >= e.length)
      return null;
    a = e[l = d], o = a.side(!s, t), h = a.side(s, t);
  }
  let c = Ct(i.text, o, a.forward(s, t));
  (c < a.from || c > a.to) && (c = h), xO = i.text.slice(Math.min(o, c), Math.max(o, c));
  let f = l == (s ? e.length - 1 : 0) ? null : e[l + (s ? 1 : -1)];
  return f && c == h && f.level + (s ? 0 : 1) < a.level ? B.cursor(f.side(!s, t) + i.from, f.forward(s, t) ? 1 : -1, f.level) : B.cursor(c + i.from, a.forward(s, t) ? -1 : 1, a.level);
}
function Wy(i, e, t) {
  for (let n = e; n < t; n++) {
    let s = bO(i.charCodeAt(n));
    if (s == 1)
      return gs;
    if (s == 2 || s == 4)
      return Dc;
  }
  return gs;
}
const SO = /* @__PURE__ */ me.define(), kO = /* @__PURE__ */ me.define(), QO = /* @__PURE__ */ me.define(), $O = /* @__PURE__ */ me.define(), Yh = /* @__PURE__ */ me.define(), _O = /* @__PURE__ */ me.define(), PO = /* @__PURE__ */ me.define(), zc = /* @__PURE__ */ me.define(), Nc = /* @__PURE__ */ me.define(), TO = /* @__PURE__ */ me.define({
  combine: (i) => i.some((e) => e)
}), qy = /* @__PURE__ */ me.define({
  combine: (i) => i.some((e) => e)
}), ZO = /* @__PURE__ */ me.define();
class Is {
  constructor(e, t, n, s, r, o = !1) {
    this.range = e, this.y = t, this.x = n, this.yMargin = s, this.xMargin = r, this.isSnapshot = o;
  }
  map(e) {
    return e.empty ? this : new Is(this.range.map(e), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
  clip(e) {
    return this.range.to <= e.doc.length ? this : new Is(B.cursor(e.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
}
const Co = /* @__PURE__ */ Ne.define({ map: (i, e) => i.map(e) }), CO = /* @__PURE__ */ Ne.define();
function ni(i, e, t) {
  let n = i.facet($O);
  n.length ? n[0](e) : window.onerror && window.onerror(String(e), t, void 0, void 0, e) || (t ? console.error(t + ":", e) : console.error(e));
}
const cn = /* @__PURE__ */ me.define({ combine: (i) => i.length ? i[0] : !0 });
let Vy = 0;
const Cs = /* @__PURE__ */ me.define({
  combine(i) {
    return i.filter((e, t) => {
      for (let n = 0; n < t; n++)
        if (i[n].plugin == e.plugin)
          return !1;
      return !0;
    });
  }
});
class en {
  constructor(e, t, n, s, r) {
    this.id = e, this.create = t, this.domEventHandlers = n, this.domEventObservers = s, this.baseExtensions = r(this), this.extension = this.baseExtensions.concat(Cs.of({ plugin: this, arg: void 0 }));
  }
  /**
  Create an extension for this plugin with the given argument.
  */
  of(e) {
    return this.baseExtensions.concat(Cs.of({ plugin: this, arg: e }));
  }
  /**
  Define a plugin from a constructor function that creates the
  plugin's value, given an editor view.
  */
  static define(e, t) {
    const { eventHandlers: n, eventObservers: s, provide: r, decorations: o } = t || {};
    return new en(Vy++, e, n, s, (l) => {
      let a = [];
      return o && a.push(Kl.of((h) => {
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
    return en.define((n, s) => new e(n, s), t);
  }
}
class Aa {
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
          } catch (n) {
            if (ni(t.state, n, "CodeMirror plugin crashed"), this.value.destroy)
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
      } catch (n) {
        ni(e.state, n, "CodeMirror plugin crashed");
      }
  }
  deactivate() {
    this.spec = this.value = null;
  }
}
const EO = /* @__PURE__ */ me.define(), Yc = /* @__PURE__ */ me.define(), Kl = /* @__PURE__ */ me.define(), AO = /* @__PURE__ */ me.define(), Wc = /* @__PURE__ */ me.define(), yo = /* @__PURE__ */ me.define(), RO = /* @__PURE__ */ me.define();
function uu(i, e) {
  let t = i.state.facet(RO);
  if (!t.length)
    return t;
  let n = t.map((r) => r instanceof Function ? r(i) : r), s = [];
  return Ie.spans(n, e.from, e.to, {
    point() {
    },
    span(r, o, l, a) {
      let h = r - e.from, c = o - e.from, f = s;
      for (let d = l.length - 1; d >= 0; d--, a--) {
        let p = l[d].spec.bidiIsolate, O;
        if (p == null && (p = Wy(e.text, h, c)), a > 0 && f.length && (O = f[f.length - 1]).to == h && O.direction == p)
          O.to = c, f = O.inner;
        else {
          let g = { from: h, to: c, direction: p, inner: [] };
          f.push(g), f = g.inner;
        }
      }
    }
  }), s;
}
const MO = /* @__PURE__ */ me.define();
function qc(i) {
  let e = 0, t = 0, n = 0, s = 0;
  for (let r of i.state.facet(MO)) {
    let o = r(i);
    o && (o.left != null && (e = Math.max(e, o.left)), o.right != null && (t = Math.max(t, o.right)), o.top != null && (n = Math.max(n, o.top)), o.bottom != null && (s = Math.max(s, o.bottom)));
  }
  return { left: e, right: t, top: n, bottom: s };
}
const Cr = /* @__PURE__ */ me.define();
class pi {
  constructor(e, t, n, s) {
    this.fromA = e, this.toA = t, this.fromB = n, this.toB = s;
  }
  join(e) {
    return new pi(Math.min(this.fromA, e.fromA), Math.max(this.toA, e.toA), Math.min(this.fromB, e.fromB), Math.max(this.toB, e.toB));
  }
  addToSet(e) {
    let t = e.length, n = this;
    for (; t > 0; t--) {
      let s = e[t - 1];
      if (!(s.fromA > n.toA)) {
        if (s.toA < n.fromA)
          break;
        n = n.join(s), e.splice(t - 1, 1);
      }
    }
    return e.splice(t, 0, n), e;
  }
  // Extend a set to cover all the content in `ranges`, which is a
  // flat array with each pair of numbers representing fromB/toB
  // positions. These pairs are generated in unchanged ranges, so the
  // offset between doc A and doc B is the same for their start and
  // end points.
  static extendWithRanges(e, t) {
    if (t.length == 0)
      return e;
    let n = [];
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
      n.push(new pi(c, d, h, f));
    }
    return n;
  }
}
class vl {
  constructor(e, t, n) {
    this.view = e, this.state = t, this.transactions = n, this.flags = 0, this.startState = e.state, this.changes = mt.empty(this.startState.doc.length);
    for (let r of n)
      this.changes = this.changes.compose(r.changes);
    let s = [];
    this.changes.iterChangedRanges((r, o, l, a) => s.push(new pi(r, o, l, a))), this.changedRanges = s;
  }
  /**
  @internal
  */
  static create(e, t, n) {
    return new vl(e, t, n);
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
const By = [];
class at {
  constructor(e, t, n = 0) {
    this.dom = e, this.length = t, this.flags = n, this.parent = null, e.cmTile = this;
  }
  get breakAfter() {
    return this.flags & 1;
  }
  get children() {
    return By;
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
      t && Py(this.dom, t);
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
    let n = t;
    for (let s of this.children) {
      if (s == e)
        return n;
      n += s.length + s.breakAfter;
    }
    throw new RangeError("Invalid child in posBefore");
  }
  posAfter(e) {
    return this.posBefore(e) + e.length;
  }
  covers(e) {
    return !0;
  }
  coordsIn(e, t, n) {
    return null;
  }
  domPosFor(e, t) {
    let n = In(this.dom), s = this.length ? e > 0 : t > 0;
    return new Ci(this.parent.dom, n + (s ? 1 : 0), e == 0 || e == this.length);
  }
  markDirty(e) {
    this.flags &= -3, e && (this.flags |= 4), this.parent && this.parent.flags & 2 && this.parent.markDirty(!1);
  }
  get overrideDOMText() {
    return null;
  }
  get root() {
    for (let e = this; e; e = e.parent)
      if (e instanceof ea)
        return e;
    return null;
  }
  static get(e) {
    return e.cmTile;
  }
}
class Jl extends at {
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
    let t = this.dom, n = null, s, r = (e == null ? void 0 : e.node) == t ? e : null, o = 0;
    for (let l of this.children) {
      if (l.sync(e), o += l.length + l.breakAfter, s = n ? n.nextSibling : t.firstChild, r && s != l.dom && (r.written = !0), l.dom.parentNode == t)
        for (; s && s != l.dom; )
          s = du(s);
      else
        t.insertBefore(l.dom, s);
      n = l.dom;
    }
    for (s = n ? n.nextSibling : t.firstChild, r && s && (r.written = !0); s; )
      s = du(s);
    this.length = o;
  }
}
function du(i) {
  let e = i.nextSibling;
  return i.parentNode.removeChild(i), e;
}
class ea extends Jl {
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
      let t = at.get(e);
      if (t && this.owns(t))
        return t;
      e = e.parentNode;
    }
  }
  blockTiles(e) {
    for (let t = [], n = this, s = 0, r = 0; ; )
      if (s == n.children.length) {
        if (!t.length)
          return;
        n = n.parent, n.breakAfter && r++, s = t.pop();
      } else {
        let o = n.children[s++];
        if (o instanceof pn)
          t.push(s), n = o, s = 0;
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
    let n, s = -1, r, o = -1;
    if (this.blockTiles((l, a) => {
      let h = a + l.length;
      if (e >= a && e <= h) {
        if (l.isWidget() && t >= -1 && t <= 1) {
          if (l.flags & 32)
            return !0;
          l.flags & 16 && (n = void 0);
        }
        (a < e || e == h && (t < -1 ? l.length : l.covers(1))) && (!n || !l.isWidget() && n.isWidget()) && (n = l, s = e - a), (h > e || e == a && (t > 1 ? l.length : l.covers(-1))) && (!r || !l.isWidget() && r.isWidget()) && (r = l, o = e - a);
      }
    }), !n && !r)
      throw new Error("No tile at position " + e);
    return n && t < 0 || !r ? { tile: n, offset: s } : { tile: r, offset: o };
  }
}
class pn extends Jl {
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
    let n = new pn(t || document.createElement(e.tagName), e);
    return t || (n.flags |= 4), n;
  }
}
class rr extends Jl {
  constructor(e, t) {
    super(e), this.attrs = t;
  }
  isLine() {
    return !0;
  }
  static start(e, t, n) {
    let s = new rr(t || document.createElement("div"), e);
    return (!t || !n) && (s.flags |= 4), s;
  }
  get domAttrs() {
    return this.attrs;
  }
  // Find the tile associated with a given position in this line.
  resolveInline(e, t, n) {
    let s = null, r = -1, o = null, l = -1;
    function a(c, f) {
      for (let d = 0, p = 0; d < c.children.length && p <= f; d++) {
        let O = c.children[d], g = p + O.length;
        g >= f && (O.isComposite() ? a(O, f - p) : (!o || o.isHidden && (t > 0 && !(o.flags & 32) || n && Uy(o, O))) && (g > f || O.flags & 32) ? (o = O, l = f - p) : (p < f || O.flags & 16 && !O.isHidden) && (s = O, r = f - p)), p = g;
      }
    }
    a(this, e);
    let h = (t < 0 ? s : o) || s || o;
    return h ? { tile: h, offset: h == s ? r : l } : null;
  }
  coordsIn(e, t, n) {
    let s = this.resolveInline(e, t, !0);
    return s ? s.tile.coordsIn(Math.max(0, s.offset), t, n) : Gy(this);
  }
  domIn(e, t) {
    let n = this.resolveInline(e, t);
    if (n) {
      let { tile: s, offset: r } = n;
      if (this.dom.contains(s.dom))
        return s.isText() ? new Ci(s.dom, Math.min(s.dom.nodeValue.length, r)) : s.domPosFor(r, s.flags & 16 ? 1 : s.flags & 32 ? -1 : t);
      let o = n.tile.parent, l = !1;
      for (let a of o.children) {
        if (l)
          return new Ci(a.dom, 0);
        a == n.tile && (l = !0);
      }
    }
    return new Ci(this.dom, 0);
  }
}
function Gy(i) {
  let e = i.dom.lastChild;
  if (!e)
    return i.dom.getBoundingClientRect();
  let t = Yr(e);
  return t[t.length - 1] || null;
}
function Uy(i, e) {
  let t = i.coordsIn(0, 1), n = e.coordsIn(0, 1);
  return t && n && n.top < t.bottom;
}
class Vt extends Jl {
  constructor(e, t) {
    super(e), this.mark = t;
  }
  get domAttrs() {
    return this.mark.attrs;
  }
  static of(e, t) {
    let n = new Vt(t || document.createElement(e.tagName), e);
    return t || (n.flags |= 4), n;
  }
}
class Un extends at {
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
  coordsIn(e, t, n) {
    let s = this.dom.nodeValue.length;
    e > s && (e = s);
    let r = e, o = e, l = 0;
    e == 0 && t < 0 || e == s && t >= 0 ? re.chrome || re.gecko || (e ? (r--, l = 1) : o < s && (o++, l = -1)) : t < 0 ? r-- : o < s && o++;
    let a = io(this.dom, r, o).getClientRects();
    if (!a.length)
      return null;
    let h = a[(l ? l < 0 : t >= 0) ? 0 : a.length - 1];
    return re.safari && !l && h.width == 0 && (h = Array.prototype.find.call(a, (c) => c.width) || h), n == null ? h : to(h, (l ? l > 0 : t < 0) == n);
  }
  static of(e, t) {
    let n = new Un(t || document.createTextNode(e), e);
    return t || (n.flags |= 2), n;
  }
}
class ms extends at {
  constructor(e, t, n, s) {
    super(e, t, s), this.widget = n;
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
  coordsInWidget(e, t, n) {
    let s = this.widget.coordsAt(this.dom, e, t);
    if (s)
      return s;
    if (n)
      return to(this.dom.getBoundingClientRect(), this.length ? e == 0 : t <= 0);
    {
      let r = this.dom.getClientRects(), o = null;
      if (!r.length)
        return null;
      let l = this.flags & 16 ? !0 : this.flags & 32 ? !1 : e > 0;
      for (let a = l ? r.length - 1 : 0; o = r[a], !(e > 0 ? a == 0 : a == r.length - 1 || o.top < o.bottom); a += l ? -1 : 1)
        ;
      return to(o, !l);
    }
  }
  get overrideDOMText() {
    if (!this.length)
      return Ae.empty;
    let { root: e } = this;
    if (!e)
      return Ae.empty;
    let t = this.posAtStart;
    return e.view.state.doc.slice(t, t + this.length);
  }
  destroy() {
    super.destroy(), this.widget.destroy(this.dom);
  }
  static of(e, t, n, s, r) {
    return r || (r = e.toDOM(t), e.editable || (r.contentEditable = "false")), new ms(r, n, e, s);
  }
}
class bl extends at {
  constructor(e) {
    let t = document.createElement("img");
    t.className = "cm-widgetBuffer", t.setAttribute("aria-hidden", "true"), super(t, 0, e);
  }
  get isHidden() {
    return !0;
  }
  get overrideDOMText() {
    return Ae.empty;
  }
  coordsIn(e, t, n) {
    let s = this.dom.getBoundingClientRect();
    return n == null ? s : to(s, t > 0 == n);
  }
}
class Fy {
  constructor(e) {
    this.index = 0, this.beforeBreak = !1, this.parents = [], this.tile = e;
  }
  // Advance by the given distance. If side is -1, stop leaving or
  // entering tiles, or skipping zero-length tiles, once the distance
  // has been traversed. When side is 1, leave, enter, or skip
  // everything at the end position.
  advance(e, t, n) {
    let { tile: s, index: r, beforeBreak: o, parents: l } = this;
    for (; e || t > 0; )
      if (s.isComposite())
        if (o) {
          if (!e)
            break;
          n && n.break(), e--, o = !1;
        } else if (r == s.children.length) {
          if (!e && !l.length)
            break;
          n && n.leave(s), o = !!s.breakAfter, { tile: s, index: r } = l.pop(), r++;
        } else {
          let a = s.children[r], h = a.breakAfter;
          (t > 0 ? a.length <= e : a.length < e) && (!n || n.skip(a, 0, a.length) !== !1 || !a.isComposite) ? (o = !!h, r++, e -= a.length) : (l.push({ tile: s, index: r }), s = a, r = 0, n && a.isComposite() && n.enter(a));
        }
      else if (r == s.length)
        o = !!s.breakAfter, { tile: s, index: r } = l.pop(), r++;
      else if (e) {
        let a = Math.min(e, s.length - r);
        n && n.skip(s, r, r + a), e -= a, r += a;
      } else
        break;
    return this.tile = s, this.index = r, this.beforeBreak = o, this;
  }
  get root() {
    return this.parents.length ? this.parents[0].tile : this.tile;
  }
}
class Hy {
  constructor(e, t, n, s) {
    this.from = e, this.to = t, this.wrapper = n, this.rank = s;
  }
}
class Ky {
  constructor(e, t, n) {
    this.cache = e, this.root = t, this.blockWrappers = n, this.curLine = null, this.lastBlock = null, this.afterWidget = null, this.pos = 0, this.wrappers = [], this.wrapperPos = 0;
  }
  addText(e, t, n, s) {
    var r;
    this.flushBuffer();
    let o = this.ensureMarks(t, n), l = o.lastChild;
    if (l && l.isText() && !(l.flags & 8) && l.length + e.length < 512) {
      this.cache.reused.set(
        l,
        2
        /* Reused.DOM */
      );
      let a = o.children[o.children.length - 1] = new Un(l.dom, l.text + e);
      a.parent = o;
    } else
      o.append(s || Un.of(e, (r = this.cache.find(Un)) === null || r === void 0 ? void 0 : r.dom));
    this.pos += e.length, this.afterWidget = null;
  }
  addComposition(e, t) {
    let n = this.curLine;
    n.dom != t.line.dom && (n.setDOM(this.cache.reused.has(t.line) ? Ra(t.line.dom) : t.line.dom), this.cache.reused.set(
      t.line,
      2
      /* Reused.DOM */
    ));
    let s = n;
    for (let l = t.marks.length - 1; l >= 0; l--) {
      let a = t.marks[l], h = s.lastChild;
      if (h instanceof Vt && h.mark.eq(a.mark))
        h.dom != a.dom && h.setDOM(Ra(a.dom)), s = h;
      else {
        if (this.cache.reused.get(a)) {
          let f = at.get(a.dom);
          f && f.setDOM(Ra(a.dom));
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
    let r = at.get(e.text);
    r && this.cache.reused.set(
      r,
      2
      /* Reused.DOM */
    );
    let o = new Un(e.text, e.text.nodeValue);
    o.flags |= 8, this.pos = e.range.toB, s.append(o);
  }
  addInlineWidget(e, t, n) {
    let s = this.afterWidget && e.flags & 48 && (this.afterWidget.flags & 48) == (e.flags & 48);
    s || this.flushBuffer();
    let r = this.ensureMarks(t, n);
    !s && !(e.flags & 16) && r.append(this.getBuffer(1)), r.append(e), this.pos += e.length, this.afterWidget = e;
  }
  addMark(e, t, n) {
    this.flushBuffer(), this.ensureMarks(t, n).append(e), this.pos += e.length, this.afterWidget = null;
  }
  addBlockWidget(e) {
    this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
  }
  continueWidget(e) {
    let t = this.afterWidget || this.lastBlock;
    t.length += e, this.pos += e;
  }
  addLineStart(e, t) {
    var n;
    e || (e = XO);
    let s = rr.start(e, t || ((n = this.cache.find(rr)) === null || n === void 0 ? void 0 : n.dom), !!t);
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
    var n;
    let s = this.curLine;
    for (let r = e.length - 1; r >= 0; r--) {
      let o = e[r], l;
      if (t > 0 && (l = s.lastChild) && l instanceof Vt && l.mark.eq(o))
        s = l, t--;
      else {
        let a = Vt.of(o, (n = this.cache.find(Vt, (h) => h.mark.eq(o))) === null || n === void 0 ? void 0 : n.dom);
        s.append(a), s = a, t = 0;
      }
    }
    return s;
  }
  endLine() {
    if (this.curLine) {
      this.flushBuffer();
      let e = this.curLine.lastChild;
      (!e || !pu(this.curLine, !1) || e.dom.nodeName != "BR" && e.isWidget() && !(re.ios && pu(this.curLine, !0))) && this.curLine.append(this.cache.findWidget(
        Ma,
        0,
        32
        /* TileFlag.After */
      ) || new ms(
        Ma.toDOM(),
        0,
        Ma,
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
        let t = e.rank * 102 + e.value.rank, n = new Hy(e.from, e.to, e.value, t), s = this.wrappers.length;
        for (; s > 0 && (this.wrappers[s - 1].rank - n.rank || this.wrappers[s - 1].to - n.to) < 0; )
          s--;
        this.wrappers.splice(s, 0, n);
      }
    this.wrapperPos = this.pos;
  }
  getBlockPos() {
    var e;
    this.updateBlockWrappers();
    let t = this.root;
    for (let n of this.wrappers) {
      let s = t.lastChild;
      if (n.from < this.pos && s instanceof pn && s.wrapper.eq(n.wrapper))
        t = s;
      else {
        let r = pn.of(n.wrapper, (e = this.cache.find(pn, (o) => o.wrapper.eq(n.wrapper))) === null || e === void 0 ? void 0 : e.dom);
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
    let t = 2 | (e < 0 ? 16 : 32), n = this.cache.find(
      bl,
      void 0,
      1
      /* Reused.Full */
    );
    return n && (n.flags = t), n || new bl(t);
  }
  flushBuffer() {
    this.afterWidget && !(this.afterWidget.flags & 32) && (this.afterWidget.parent.append(this.getBuffer(-1)), this.afterWidget = null);
  }
}
class Jy {
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
    let t = Math.min(this.text.length, this.textOff + e), n = this.text.slice(this.textOff, t);
    return this.textOff = t, n;
  }
}
const yl = [ms, rr, Un, Vt, bl, pn, ea];
for (let i = 0; i < yl.length; i++)
  yl[i].bucket = i;
class ew {
  constructor(e) {
    this.view = e, this.buckets = yl.map(() => []), this.index = yl.map(() => 0), this.reused = /* @__PURE__ */ new Map();
  }
  // Put a tile in the cache.
  add(e) {
    let t = e.constructor.bucket, n = this.buckets[t];
    n.length < 6 ? n.push(e) : n[
      this.index[t] = (this.index[t] + 1) % 6
      /* C.Bucket */
    ] = e;
  }
  find(e, t, n = 2) {
    let s = e.bucket, r = this.buckets[s], o = this.index[s];
    for (let l = 0; l < r.length; l++) {
      let a = (l + o) % r.length, h = r[a];
      if ((!t || t(h)) && !this.reused.has(h))
        return r.splice(a, 1), a < o && this.index[s]--, this.reused.set(h, n), h;
    }
    return null;
  }
  findWidget(e, t, n) {
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
          return s.splice(r, 1), r < this.index[0] && this.index[0]--, l.widget == e && l.length == t && (l.flags & 497) == n ? (this.reused.set(
            l,
            1
            /* Reused.Full */
          ), l) : (this.reused.set(
            l,
            2
            /* Reused.DOM */
          ), new ms(l.dom, t, e, l.flags & -498 | n));
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
class tw {
  constructor(e, t, n, s, r) {
    this.view = e, this.decorations = s, this.disallowBlockEffectsFor = r, this.openWidget = !1, this.openMarks = 0, this.cache = new ew(e), this.text = new Jy(e.state.doc), this.builder = new Ky(this.cache, new ea(e, e.contentDOM), Ie.iter(n)), this.cache.reused.set(
      t,
      2
      /* Reused.DOM */
    ), this.old = new Fy(t), this.reuseWalker = {
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
    let n = t && this.getCompositionContext(t.text);
    for (let s = 0, r = 0, o = 0; ; ) {
      let l = o < e.length ? e[o++] : null, a = l ? l.fromA : this.old.root.length;
      if (a > s) {
        let h = a - s;
        this.preserve(h, !o, !l), s = a, r += h;
      }
      if (!l)
        break;
      t && l.fromA <= t.range.fromA && l.toA >= t.range.toA ? (this.forward(l.fromA, t.range.fromA, t.range.fromA < t.range.toA ? 1 : -1), this.emit(r, t.range.fromB), this.builder.flushBuffer(), this.cache.clear(), this.builder.addComposition(t, n), this.text.skip(t.range.toB - t.range.fromB), this.forward(t.range.fromA, l.toA), this.emit(t.range.toB, l.toB)) : (this.forward(l.fromA, l.toA), this.emit(r, l.toB)), r = l.toB, s = l.toA;
    }
    return this.builder.curLine && this.builder.endLine(), this.builder.root;
  }
  preserve(e, t, n) {
    let s = sw(this.old), r = this.openMarks;
    this.old.advance(e, n ? 1 : -1, {
      skip: (o, l, a) => {
        if (o.isWidget())
          if (this.openWidget)
            this.builder.continueWidget(a - l);
          else {
            let h = a > 0 || l < o.length ? ms.of(o.widget, this.view, a - l, o.flags & 496, this.cache.maybeReuse(o)) : this.cache.reuse(o);
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
        else if (o instanceof bl)
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
    let n = null, s = this.builder, r = -1, o = Ie.spans(this.decorations, e, t, {
      point: (l, a, h, c, f, d) => {
        if (h instanceof Os) {
          if (this.disallowBlockEffectsFor[d]) {
            if (h.block)
              throw new RangeError("Block decorations may not be specified via plugins");
            if (a > this.view.state.doc.lineAt(l).to)
              throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
          }
          if (r = c.length, f > c.length)
            s.continueWidget(a - l);
          else {
            let p = h.widget || (h.block ? or.block : or.inline), O = iw(h), g = this.cache.findWidget(p, a - l, O) || ms.of(p, this.view, a - l, O);
            h.block ? (h.startSide > 0 && s.addLineStartIfNotCovered(n), s.addBlockWidget(g)) : (s.ensureLine(n), s.addInlineWidget(g, c, f));
          }
          n = null;
        } else
          n = nw(n, h);
        a > l && this.text.skip(a - l);
      },
      span: (l, a, h, c) => {
        for (let f = l; f < a; ) {
          let d = this.text.next(Math.min(512, a - f));
          d == null ? (s.addLineStartIfNotCovered(n), s.addBreak(), f++) : (s.ensureLine(n), s.addText(d, h, f == l ? c : h.length), f += d.length), n = null;
        }
        r = h.length;
      }
    });
    r > -1 && (this.openWidget = o > r), this.openWidget || s.addLineStartIfNotCovered(n), this.openMarks = o;
  }
  forward(e, t, n = 1) {
    t - e <= 10 ? this.old.advance(t - e, n, this.reuseWalker) : (this.old.advance(5, -1, this.reuseWalker), this.old.advance(t - e - 10, -1), this.old.advance(5, n, this.reuseWalker));
  }
  getCompositionContext(e) {
    let t = [], n = null;
    for (let s = e.parentNode; ; s = s.parentNode) {
      let r = at.get(s);
      if (s == this.view.contentDOM)
        break;
      r instanceof Vt ? t.push(r) : r != null && r.isLine() ? n = r : r instanceof pn || (s.nodeName == "DIV" && !n && s != this.view.contentDOM ? n = new rr(s, XO) : n || t.push(Vt.of(new vo({ tagName: s.nodeName.toLowerCase(), attributes: Ty(s) }), s)));
    }
    return { line: n, marks: t };
  }
}
function pu(i, e) {
  let t = (n) => {
    for (let s of n.children)
      if ((e ? s.isText() : s.length) || t(s))
        return !0;
    return !1;
  };
  return t(i);
}
function iw(i) {
  let e = i.isReplace ? (i.startSide < 0 ? 64 : 0) | (i.endSide > 0 ? 128 : 0) : i.startSide > 0 ? 32 : 16;
  return i.block && (e |= 256), e;
}
const XO = { class: "cm-line" };
function nw(i, e) {
  let t = e.spec.attributes, n = e.spec.class;
  return !t && !n || (i || (i = { class: "cm-line" }), t && Lc(t, i), n && (i.class += " " + n)), i;
}
function sw(i) {
  let e = [];
  for (let t = i.parents.length; t > 1; t--) {
    let n = t == i.parents.length ? i.tile : i.parents[t].tile;
    n instanceof Vt && e.push(n.mark);
  }
  return e;
}
function Ra(i) {
  let e = at.get(i);
  return e && e.setDOM(i.cloneNode()), i;
}
class or extends Or {
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
or.inline = /* @__PURE__ */ new or("span");
or.block = /* @__PURE__ */ new or("div");
const Ma = /* @__PURE__ */ new class extends Or {
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
class Ou {
  constructor(e) {
    this.view = e, this.decorations = [], this.blockWrappers = [], this.dynamicDecorationMap = [!1], this.domChanged = null, this.hasComposition = null, this.editContextFormatting = We.none, this.lastCompositionAfterCursor = !1, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.updateDeco(), this.tile = new ea(e, e.contentDOM), this.updateInner([new pi(0, 0, 0, e.state.doc.length)], null);
  }
  // Update the document view to a given state.
  update(e) {
    var t;
    let n = e.changedRanges;
    this.minWidth > 0 && n.length && (n.every(({ fromA: c, toA: f }) => f < this.minWidthFrom || c > this.minWidthTo) ? (this.minWidthFrom = e.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = e.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.updateEditContextFormatting(e);
    let s = -1;
    this.view.inputState.composing >= 0 && !this.view.observer.editContext && (!((t = this.domChanged) === null || t === void 0) && t.newSel ? s = this.domChanged.newSel.head : !dw(e.changes, this.hasComposition) && !e.selectionSet && (s = e.state.selection.main.head));
    let r = s > -1 ? ow(this.view, e.changes, s) : null;
    if (this.domChanged = null, this.hasComposition) {
      let { from: c, to: f } = this.hasComposition;
      n = new pi(c, f, e.changes.mapPos(c, -1), e.changes.mapPos(f, 1)).addToSet(n.slice());
    }
    this.hasComposition = r ? { from: r.range.fromB, to: r.range.toB } : null, (re.ie || re.chrome) && !r && e && e.state.doc.lines != e.startState.doc.lines && (this.forceSelection = !0);
    let o = this.decorations, l = this.blockWrappers;
    this.updateDeco();
    let a = hw(o, this.decorations, e.changes);
    a.length && (n = pi.extendWithRanges(n, a));
    let h = fw(l, this.blockWrappers, e.changes);
    return h.length && (n = pi.extendWithRanges(n, h)), r && !n.some((c) => c.fromA <= r.range.fromA && c.toA >= r.range.toA) && (n = r.range.addToSet(n.slice())), this.tile.flags & 2 && n.length == 0 ? !1 : (this.updateInner(n, r), e.transactions.length && (this.lastUpdate = Date.now()), !0);
  }
  // Used by update and the constructor do perform the actual DOM
  // update
  updateInner(e, t) {
    this.view.viewState.mustMeasureContent = !0;
    let { observer: n } = this.view;
    n.ignore(() => {
      if (t || e.length) {
        let o = this.tile, l = new tw(this.view, o, this.blockWrappers, this.decorations, this.dynamicDecorationMap);
        t && at.get(t.text) && l.cache.reused.set(
          at.get(t.text),
          2
          /* Reused.DOM */
        ), this.tile = l.run(e, t), Wh(o, l.cache.reused);
      }
      this.tile.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px", this.tile.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
      let r = re.chrome || re.ios ? { node: n.selectionRange.focusNode, written: !1 } : void 0;
      this.tile.sync(r), r && (r.written || n.selectionRange.focusNode != r.node || !this.tile.dom.contains(r.node)) && (this.forceSelection = !0), this.tile.dom.style.height = "";
    });
    let s = [];
    if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length)
      for (let r of this.tile.children)
        r.isWidget() && r.widget instanceof Xa && s.push(r.dom);
    n.updateGaps(s);
  }
  updateEditContextFormatting(e) {
    this.editContextFormatting = this.editContextFormatting.map(e.changes);
    for (let t of e.transactions)
      for (let n of t.effects)
        n.is(CO) && (this.editContextFormatting = n.value);
  }
  // Sync the DOM selection to this.state.selection
  updateSelection(e = !1, t = !1) {
    (e || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange();
    let { dom: n } = this.tile, s = this.view.root.activeElement, r = s == n, o = !r && !(this.view.state.facet(cn) || n.tabIndex > -1) && Nr(n, this.view.observer.selectionRange) && !(s && n.contains(s));
    if (!(r || t || o))
      return;
    let l = this.forceSelection;
    this.forceSelection = !1;
    let a = this.view.state.selection.main, h, c;
    if (a.empty ? c = h = this.inlineDOMNearPos(a.anchor, a.assoc || 1) : (c = this.inlineDOMNearPos(a.head, a.head == a.from ? 1 : -1), h = this.inlineDOMNearPos(a.anchor, a.anchor == a.from ? 1 : -1)), re.gecko && a.empty && !this.hasComposition && rw(h)) {
      let d = document.createTextNode("");
      this.view.observer.ignore(() => h.node.insertBefore(d, h.node.childNodes[h.offset] || null)), h = c = new Ci(d, 0), l = !0;
    }
    let f = this.view.observer.selectionRange;
    (l || !f.focusNode || (!Wr(h.node, h.offset, f.anchorNode, f.anchorOffset) || !Wr(c.node, c.offset, f.focusNode, f.focusOffset)) && !this.suppressWidgetCursorChange(f, a)) && (this.view.observer.ignore(() => {
      re.android && re.chrome && n.contains(f.focusNode) && uw(f.focusNode, n) && (n.blur(), n.focus({ preventScroll: !0 }));
      let d = eo(this.view.root);
      if (d) if (a.empty) {
        if (re.gecko) {
          let p = lw(h.node, h.offset);
          if (p && p != 3) {
            let O = (p == 1 ? gO : mO)(h.node, h.offset);
            O && (h = new Ci(O.node, O.offset));
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
      o && this.view.root.activeElement == n && (n.blur(), s && s.focus());
    }), this.view.observer.setSelectionRange(h, c)), this.impreciseAnchor = h.precise ? null : new Ci(f.anchorNode, f.anchorOffset), this.impreciseHead = c.precise ? null : new Ci(f.focusNode, f.focusOffset);
  }
  // If a zero-length widget is inserted next to the cursor during
  // composition, avoid moving it across it and disrupting the
  // composition.
  suppressWidgetCursorChange(e, t) {
    return this.hasComposition && t.empty && Wr(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset) && this.posFromDOM(e.focusNode, e.focusOffset) == t.head;
  }
  enforceCursorAssoc() {
    if (this.hasComposition)
      return;
    let { view: e } = this, t = e.state.selection.main, n = eo(e.root), { anchorNode: s, anchorOffset: r } = e.observer.selectionRange;
    if (!n || !t.empty || !t.assoc || !n.modify)
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
    n.collapse(c.node, c.offset), n.modify("move", t.assoc < 0 ? "forward" : "backward", "lineboundary"), e.observer.readSelectionRange();
    let f = e.observer.selectionRange;
    e.docView.posFromDOM(f.anchorNode, f.anchorOffset) != t.from && n.collapse(s, r);
  }
  posFromDOM(e, t) {
    let n = this.tile.nearest(e);
    if (!n)
      return this.tile.dom.compareDocumentPosition(e) & 2 ? 0 : this.view.state.doc.length;
    let s = n.posAtStart;
    if (n.isComposite()) {
      let r;
      if (e == n.dom)
        r = n.dom.childNodes[t];
      else {
        let o = mn(e) == 0 ? 0 : t == 0 ? -1 : 1;
        for (; ; ) {
          let l = e.parentNode;
          if (l == n.dom)
            break;
          o == 0 && l.firstChild != l.lastChild && (e == l.firstChild ? o = -1 : o = 1), e = l;
        }
        o < 0 ? r = e : r = e.nextSibling;
      }
      if (r == n.dom.firstChild)
        return s;
      for (; r && !at.get(r); )
        r = r.nextSibling;
      if (!r)
        return s + n.length;
      for (let o = 0, l = s; ; o++) {
        let a = n.children[o];
        if (a.dom == r)
          return l;
        l += a.length + a.breakAfter;
      }
    } else return n.isText() ? e == n.dom ? s + t : s + (t ? n.length : 0) : s;
  }
  domAtPos(e, t) {
    let { tile: n, offset: s } = this.tile.resolveBlock(e, t);
    return n.isWidget() ? n.domPosFor(s, t) : n.domIn(s, t);
  }
  inlineDOMNearPos(e, t) {
    let n, s = -1, r = !1, o, l = -1, a = !1;
    return this.tile.blockTiles((h, c) => {
      if (h.isWidget()) {
        if (h.flags & 32 && c >= e)
          return !0;
        h.flags & 16 && (r = !0);
      } else {
        let f = c + h.length;
        if (c <= e && (n = h, s = e - c, r = f < e), f >= e && !o && (o = h, l = e - c, a = c > e), c > e && o)
          return !0;
      }
    }), !n && !o ? this.domAtPos(e, t) : (r && o ? n = null : a && n && (o = null), n && t < 0 || !o ? n.domIn(s, t) : o.domIn(l, t));
  }
  // Get the coord of the element at the given side of the given
  // position. If rtl is given, flatten it using that text direction.
  coordsAt(e, t, n) {
    let { tile: s, offset: r } = this.tile.resolveBlock(e, t);
    return s.isWidget() ? s.widget instanceof Xa ? null : s.coordsInWidget(r, t, !0) : s.coordsIn(r, t, n);
  }
  lineAt(e, t) {
    let { tile: n } = this.tile.resolveBlock(e, t);
    return n.isLine() ? n : null;
  }
  coordsForChar(e) {
    let { tile: t, offset: n } = this.tile.resolveBlock(e, 1);
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
        let l = Ct(r.text, o);
        if (l == o)
          return null;
        let a = io(r.dom, o, l).getClientRects();
        for (let h = 0; h < a.length; h++) {
          let c = a[h];
          if (h == a.length - 1 || c.top < c.bottom && c.left < c.right)
            return c;
        }
      }
      return null;
    }
    return s(t, n);
  }
  measureVisibleLineHeights(e) {
    let t = [], { from: n, to: s } = e, r = this.view.contentDOM.clientWidth, o = r > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, l = -1, a = this.view.textDirection == lt.LTR, h = 0, c = (f, d, p) => {
      for (let O = 0; O < f.children.length && !(d > s); O++) {
        let g = f.children[O], m = d + g.length, v = g.dom.getBoundingClientRect(), { height: y } = v;
        if (p && !O && (h += v.top - p.top), g instanceof pn)
          m > n && c(g, d, v);
        else if (d >= n && (h > 0 && t.push(-h), t.push(y + h), h = 0, o)) {
          let $ = g.dom.lastChild, Z = $ ? Yr($) : [];
          if (Z.length) {
            let E = Z[Z.length - 1], M = a ? E.right - v.left : v.right - E.left;
            M > l && (l = M, this.minWidth = r, this.minWidthFrom = d, this.minWidthTo = m);
          }
        }
        p && O == f.children.length - 1 && (h += p.bottom - v.bottom), d = m + g.breakAfter;
      }
    };
    return c(this.tile, 0, null), t;
  }
  textDirectionAt(e) {
    let { tile: t } = this.tile.resolveBlock(e, 1);
    return getComputedStyle(t.dom).direction == "rtl" ? lt.RTL : lt.LTR;
  }
  measureTextSize() {
    let e = this.tile.blockTiles((o) => {
      if (o.isLine() && o.children.length && o.length <= 20) {
        let l = 0, a;
        for (let h of o.children) {
          if (!h.isText() || /[^ -~]/.test(h.text))
            return;
          let c = Yr(h.dom);
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
    let t = document.createElement("div"), n, s, r;
    return t.className = "cm-line", t.style.width = "99999px", t.style.position = "absolute", t.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
      this.tile.dom.appendChild(t);
      let o = Yr(t.firstChild)[0];
      n = t.getBoundingClientRect().height, s = o && o.width ? o.width / 27 : 7, r = o && o.height ? o.height : n, t.remove();
    }), { lineHeight: n, charWidth: s, textHeight: r };
  }
  computeBlockGapDeco() {
    let e = [], t = this.view.viewState;
    for (let n = 0, s = 0; ; s++) {
      let r = s == t.viewports.length ? null : t.viewports[s], o = r ? r.from - 1 : this.view.state.doc.length;
      if (o > n) {
        let l = (t.lineBlockAt(o).bottom - t.lineBlockAt(n).top) / this.view.scaleY;
        e.push(We.replace({
          widget: new Xa(l),
          block: !0,
          inclusive: !0,
          isBlockGap: !0
        }).range(n, o));
      }
      if (!r)
        break;
      n = r.to + 1;
    }
    return We.set(e);
  }
  updateDeco() {
    let e = 1, t = this.view.state.facet(Kl).map((r) => (this.dynamicDecorationMap[e++] = typeof r == "function") ? r(this.view) : r), n = !1, s = this.view.state.facet(Wc).map((r, o) => {
      let l = typeof r == "function";
      return l && (n = !0), l ? r(this.view) : r;
    });
    for (s.length && (this.dynamicDecorationMap[e++] = n, t.push(Ie.join(s))), this.decorations = [
      this.editContextFormatting,
      ...t,
      this.computeBlockGapDeco(),
      this.view.viewState.lineGapDeco
    ]; e < this.decorations.length; )
      this.dynamicDecorationMap[e++] = !1;
    this.blockWrappers = this.view.state.facet(AO).map((r) => typeof r == "function" ? r(this.view) : r);
  }
  scrollIntoView(e) {
    if (e.isSnapshot) {
      let h = this.view.viewState.lineBlockAt(e.range.head);
      this.view.scrollDOM.scrollTop = h.top - e.yMargin, this.view.scrollDOM.scrollLeft = e.xMargin;
      return;
    }
    for (let h of this.view.state.facet(ZO))
      try {
        if (h(this.view, e.range, e))
          return !0;
      } catch (c) {
        ni(this.view.state, c, "scroll handler");
      }
    let { range: t } = e, n = this.coordsAt(t.head, t.assoc || (t.head > t.anchor ? -1 : 1)), s;
    if (!n)
      return;
    !t.empty && (s = this.coordsAt(t.anchor, t.anchor > t.head ? -1 : 1)) && (n = {
      left: Math.min(n.left, s.left),
      top: Math.min(n.top, s.top),
      right: Math.max(n.right, s.right),
      bottom: Math.max(n.bottom, s.bottom)
    });
    let r = qc(this.view), o = {
      left: n.left - r.left,
      top: n.top - r.top,
      right: n.right + r.right,
      bottom: n.bottom + r.bottom
    }, { offsetWidth: l, offsetHeight: a } = this.view.scrollDOM;
    if (Ey(this.view.scrollDOM, o, t.head < t.anchor ? -1 : 1, e.x, e.y, Math.max(Math.min(e.xMargin, l), -l), Math.max(Math.min(e.yMargin, a), -a), this.view.textDirection == lt.LTR), window.visualViewport && window.innerHeight - window.visualViewport.height > 1 && (n.top > window.pageYOffset + window.visualViewport.offsetTop + window.visualViewport.height || n.bottom < window.pageYOffset + window.visualViewport.offsetTop)) {
      let h = this.view.docView.lineAt(t.head, 1);
      h && h.dom.scrollIntoView({ block: "nearest" });
    }
  }
  lineHasWidget(e) {
    let t = (n) => n.isWidget() || n.children.some(t);
    return t(this.tile.resolveBlock(e, 1).tile);
  }
  destroy() {
    Wh(this.tile);
  }
}
function Wh(i, e) {
  let t = e == null ? void 0 : e.get(i);
  if (t != 1) {
    t == null && i.destroy();
    for (let n of i.children)
      Wh(n, e);
  }
}
function rw(i) {
  return i.node.nodeType == 1 && i.node.firstChild && (i.offset == 0 || i.node.childNodes[i.offset - 1].contentEditable == "false") && (i.offset == i.node.childNodes.length || i.node.childNodes[i.offset].contentEditable == "false");
}
function jO(i, e) {
  let t = i.observer.selectionRange;
  if (!t.focusNode)
    return null;
  let n = gO(t.focusNode, t.focusOffset), s = mO(t.focusNode, t.focusOffset), r = n || s;
  if (s && n && s.node != n.node) {
    let l = at.get(s.node);
    if (!l || l.isText() && l.text != s.node.nodeValue)
      r = s;
    else if (i.docView.lastCompositionAfterCursor) {
      let a = at.get(n.node);
      !a || a.isText() && a.text != n.node.nodeValue || (r = s);
    }
  }
  if (i.docView.lastCompositionAfterCursor = r != n, !r)
    return null;
  let o = e - r.offset;
  return { from: o, to: o + r.node.nodeValue.length, node: r.node };
}
function ow(i, e, t) {
  let n = jO(i, t);
  if (!n)
    return null;
  let { node: s, from: r, to: o } = n, l = s.nodeValue;
  if (/[\n\r]/.test(l) || i.state.doc.sliceString(n.from, n.to) != l)
    return null;
  let a = e.invertedDesc;
  return { range: new pi(a.mapPos(r), a.mapPos(o), r, o), text: s };
}
function lw(i, e) {
  return i.nodeType != 1 ? 0 : (e && i.childNodes[e - 1].contentEditable == "false" ? 1 : 0) | (e < i.childNodes.length && i.childNodes[e].contentEditable == "false" ? 2 : 0);
}
let aw = class {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    js(e, t, this.changes);
  }
  comparePoint(e, t) {
    js(e, t, this.changes);
  }
  boundChange(e) {
    js(e, e, this.changes);
  }
};
function hw(i, e, t) {
  let n = new aw();
  return Ie.compare(i, e, t, n), n.changes;
}
class cw {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    js(e, t, this.changes);
  }
  comparePoint() {
  }
  boundChange(e) {
    js(e, e, this.changes);
  }
}
function fw(i, e, t) {
  let n = new cw();
  return Ie.compare(i, e, t, n), n.changes;
}
function uw(i, e) {
  for (let t = i; t && t != e; t = t.assignedSlot || t.parentNode)
    if (t.nodeType == 1 && t.contentEditable == "false")
      return !0;
  return !1;
}
function dw(i, e) {
  let t = !1;
  return e && i.iterChangedRanges((n, s) => {
    n < e.to && s > e.from && (t = !0);
  }), t;
}
class Xa extends Or {
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
function pw(i, e, t = 1) {
  let n = i.charCategorizer(e), s = i.doc.lineAt(e), r = e - s.from;
  if (s.length == 0)
    return B.cursor(e);
  r == 0 ? t = 1 : r == s.length && (t = -1);
  let o = r, l = r;
  t < 0 ? o = Ct(s.text, r, !1) : l = Ct(s.text, r);
  let a = n(s.text.slice(o, l));
  for (; o > 0; ) {
    let h = Ct(s.text, o, !1);
    if (n(s.text.slice(h, o)) != a)
      break;
    o = h;
  }
  for (; l < s.length; ) {
    let h = Ct(s.text, l);
    if (n(s.text.slice(l, h)) != a)
      break;
    l = h;
  }
  return B.undirectionalRange(o + s.from, l + s.from);
}
function Ow(i, e, t, n, s) {
  let r = Math.round((n - e.left) * i.defaultCharacterWidth);
  if (i.lineWrapping && t.height > i.defaultLineHeight * 1.5) {
    let l = i.viewState.heightOracle.textHeight, a = Math.floor((s - t.top - (i.defaultLineHeight - l) * 0.5) / l);
    r += a * i.viewState.heightOracle.lineLength;
  }
  let o = i.state.sliceDoc(t.from, t.to);
  return t.from + Sy(o, r, i.state.tabSize);
}
function gw(i, e, t) {
  let n = i.lineBlockAt(e);
  if (Array.isArray(n.type)) {
    let s;
    for (let r of n.type) {
      if (r.from > e)
        break;
      if (!(r.to < e)) {
        if (r.from < e && r.to > e)
          return r;
        (!s || r.type == yi.Text && (s.type != r.type || (t < 0 ? r.from < e : r.to > e))) && (s = r);
      }
    }
    return s || n;
  }
  return n;
}
function mw(i, e, t, n) {
  let s = gw(i, e.head, e.assoc || -1), r = !n || s.type != yi.Text || !(i.lineWrapping || s.widgetLineBreaks) ? null : i.coordsAtPos(e.assoc < 0 && e.head > s.from ? e.head - 1 : e.head);
  if (r) {
    let o = i.dom.getBoundingClientRect(), l = i.textDirectionAt(s.from), a = i.posAtCoords({
      x: t == (l == lt.LTR) ? o.right - 1 : o.left + 1,
      y: (r.top + r.bottom) / 2
    });
    if (a != null)
      return B.cursor(a, t ? -1 : 1);
  }
  return B.cursor(t ? s.to : s.from, t ? -1 : 1);
}
function gu(i, e, t, n) {
  let s = i.state.doc.lineAt(e.head), r = i.bidiSpans(s), o = i.textDirectionAt(s.from);
  for (let l = e, a = null; ; ) {
    let h = Yy(s, r, o, l, t), c = xO;
    if (!h) {
      if (s.number == (t ? i.state.doc.lines : 1))
        return l;
      c = `
`, s = i.state.doc.line(s.number + (t ? 1 : -1)), r = i.bidiSpans(s), h = i.visualLineSide(s, !t);
    }
    if (a) {
      if (!a(c))
        return l;
    } else {
      if (!n)
        return h;
      a = n(c);
    }
    l = h;
  }
}
function vw(i, e, t) {
  let n = i.state.charCategorizer(e), s = n(t);
  return (r) => {
    let o = n(r);
    return s == fn.Space && (s = o), s == o;
  };
}
function bw(i, e, t, n) {
  let s = e.head, r = t ? 1 : -1;
  if (s == (t ? i.state.doc.length : 0))
    return B.cursor(s, e.assoc);
  let o = e.goalColumn, l, a = i.contentDOM.getBoundingClientRect(), h = i.coordsAtPos(s, e.assoc || ((e.empty ? t : e.head == e.from) ? 1 : -1)), c = i.documentTop;
  if (h)
    o == null && (o = h.left - a.left), l = r < 0 ? h.top : h.bottom;
  else {
    let O = i.viewState.lineBlockAt(s);
    o == null && (o = Math.min(a.right - a.left, i.defaultCharacterWidth * (s - O.from))), l = (r < 0 ? O.top : O.bottom) + c;
  }
  let f = a.left + o, d = i.viewState.heightOracle.textHeight >> 1, p = n ?? d;
  for (let O = 0; ; O += d) {
    let g = l + (p + O) * r, m = qh(i, { x: f, y: g }, !1, r);
    if (t ? g > a.bottom : g < a.top)
      return B.cursor(m.pos, m.assoc);
    let v = i.coordsAtPos(m.pos, m.assoc), y = v ? (v.top + v.bottom) / 2 : 0;
    if (!v || (t ? y > l : y < l))
      return B.cursor(m.pos, m.assoc, void 0, o);
  }
}
function qr(i, e, t) {
  for (; ; ) {
    let n = 0;
    for (let s of i)
      s.between(e - 1, e + 1, (r, o, l) => {
        if (e > r && e < o) {
          let a = n || t || (e - r < o - e ? -1 : 1);
          e = a < 0 ? r : o, n = a;
        }
      });
    if (!n)
      return e;
  }
}
function LO(i, e) {
  let t = null;
  for (let n = 0; n < e.ranges.length; n++) {
    let s = e.ranges[n], r = null;
    if (s.empty) {
      let o = qr(i, s.from, 0);
      o != s.from && (r = B.cursor(o, -1));
    } else {
      let o = qr(i, s.from, -1), l = qr(i, s.to, 1);
      (o != s.from || l != s.to) && (s.undirectional ? r = B.undirectionalRange(s.from, s.to) : r = B.range(s.from == s.anchor ? o : l, s.from == s.head ? o : l));
    }
    r && (t || (t = e.ranges.slice()), t[n] = r);
  }
  return t ? B.create(t, e.mainIndex) : e;
}
function ja(i, e, t) {
  let n = qr(i.state.facet(yo).map((s) => s(i)), t.from, e.head > t.from ? -1 : 1);
  return n == t.from ? t : B.cursor(n, n < t.from ? 1 : -1);
}
class qi {
  constructor(e, t) {
    this.pos = e, this.assoc = t;
  }
}
function qh(i, e, t, n) {
  let s = i.contentDOM.getBoundingClientRect(), r = s.top + i.viewState.paddingTop, { x: o, y: l } = e, a = l - r, h;
  for (; ; ) {
    if (a < 0)
      return new qi(0, 1);
    if (a > i.viewState.docHeight)
      return new qi(i.state.doc.length, -1);
    if (h = i.elementAtHeight(a), n == null)
      break;
    if (h.type == yi.Text) {
      if (n < 0 ? h.to < i.viewport.from : h.from > i.viewport.to)
        break;
      let d = i.docView.coordsAt(n < 0 ? h.from : h.to, n > 0 ? -1 : 1);
      if (d && (n < 0 ? d.top <= a + r : d.bottom >= a + r))
        break;
    }
    let f = i.viewState.heightOracle.textHeight / 2;
    a = n > 0 ? h.bottom + f : h.top - f;
  }
  if (i.viewport.from >= h.to || i.viewport.to <= h.from) {
    if (t)
      return null;
    if (h.type == yi.Text) {
      let f = Ow(i, s, h, o, l);
      return new qi(f, f == h.from ? 1 : -1);
    }
  }
  if (h.type != yi.Text)
    return a < (h.top + h.bottom) / 2 ? new qi(h.from, 1) : new qi(h.to, -1);
  let c = i.docView.lineAt(h.from, 2);
  return (!c || c.length != h.length) && (c = i.docView.lineAt(h.from, -2)), new yw(i, o, l, i.textDirectionAt(h.from)).scanTile(c, h.from);
}
class yw {
  constructor(e, t, n, s) {
    this.view = e, this.x = t, this.y = n, this.baseDir = s, this.line = null, this.spans = null;
  }
  bidiSpansAt(e) {
    return (!this.line || this.line.from > e || this.line.to < e) && (this.line = this.view.state.doc.lineAt(e), this.spans = this.view.bidiSpans(this.line)), this;
  }
  baseDirAt(e, t) {
    let { line: n, spans: s } = this.bidiSpansAt(e);
    return s[Gi.find(s, e - n.from, -1, t)].level == this.baseDir;
  }
  dirAt(e, t) {
    let { line: n, spans: s } = this.bidiSpansAt(e);
    return s[Gi.find(s, e - n.from, -1, t)].dir;
  }
  // Used to short-circuit bidi tests for content with a uniform direction
  bidiIn(e, t) {
    let { spans: n, line: s } = this.bidiSpansAt(e);
    return n.length > 1 || n.length && (n[0].level != this.baseDir || n[0].to + s.from < t);
  }
  // Scan through the rectangles for the content of a tile with inline
  // content, looking for one that overlaps the queried position
  // vertically and is closest horizontally. The caller is responsible
  // for dividing its content into N pieces, and pass an array with
  // N+1 positions (including the position after the last piece). For
  // a text tile, these will be character clusters, for a composite
  // tile, these will be child tiles.
  scan(e, t, n = !1) {
    let s = 0, r = e.length - 1, o = /* @__PURE__ */ new Set(), l = this.bidiIn(e[0], e[r]), a, h, c = -1, f = 1e9, d;
    e: for (; s < r; ) {
      let O = r - s, g = s + r >> 1;
      t: if (o.has(g)) {
        let v = s + Math.floor(Math.random() * O);
        for (let y = 0; y < O; y++) {
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
          let y = m[v], $ = 0;
          if (!(y.width == 0 && m.length > 1)) {
            if (y.bottom < this.y)
              (!a || a.bottom < y.bottom) && (a = y), $ = 1;
            else if (y.top > this.y)
              (!h || h.top > y.top) && (h = y), $ = -1;
            else {
              let Z = y.left > this.x ? this.x - y.left : y.right < this.x ? this.x - y.right : 0, E = Math.abs(Z);
              E < f && (c = g, f = E, d = y), Z && ($ = Z < 0 == (this.baseDir == lt.LTR) ? -1 : 1);
            }
            $ == -1 && (!l || this.baseDirAt(e[g], 1)) ? r = g : $ == 1 && (!l || this.baseDirAt(e[g + 1], -1)) && (s = g + 1);
          }
        }
    }
    if (!d) {
      if (!h && !a)
        return { i: e[0], after: !1 };
      let O = a && (!h || this.y - a.bottom < h.top - this.y) ? a : h;
      return this.y = (O.top + O.bottom) / 2, this.scan(e, t, !0);
    }
    if (f && !n) {
      let { top: O, bottom: g } = d;
      if (a && a.bottom > (O + O + g) / 3)
        return this.y = a.bottom - 1, this.scan(e, t, !0);
      if (h && h.top < (O + g + g) / 3)
        return this.y = h.top + 1, this.scan(e, t, !0);
    }
    let p = (l ? this.dirAt(e[c], 1) : this.baseDir) == lt.LTR;
    return {
      i: c,
      // Test whether x is closes to the start or end of this element
      after: this.x > (d.left + d.right) / 2 == p
    };
  }
  scanText(e, t) {
    let n = [];
    for (let r = 0; r < e.length; r = Ct(e.text, r))
      n.push(t + r);
    n.push(t + e.length);
    let s = this.scan(n, (r) => {
      let o = n[r] - t, l = n[r + 1] - t;
      return io(e.dom, o, l).getClientRects();
    });
    return s.after ? new qi(n[s.i + 1], -1) : new qi(n[s.i], 1);
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
    let n = [t];
    for (let l = 0, a = t; l < e.children.length; l++)
      n.push(a += e.children[l].length);
    let s = this.scan(n, (l) => {
      let a = e.children[l];
      return a.flags & 48 ? null : (a.dom.nodeType == 1 ? a.dom : io(a.dom, 0, a.length)).getClientRects();
    }), r = e.children[s.i], o = n[s.i];
    return r.isText() ? this.scanText(r, o) : r.isComposite() ? this.scanTile(r, o) : s.after ? new qi(n[s.i + 1], -1) : new qi(o, 1);
  }
}
const Ps = "￿";
class ww {
  constructor(e, t) {
    this.points = e, this.view = t, this.text = "", this.lineSeparator = t.state.facet(Xe.lineSeparator);
  }
  append(e) {
    this.text += e;
  }
  lineBreak() {
    this.text += Ps;
  }
  readRange(e, t) {
    if (!e)
      return this;
    let n = e.parentNode;
    for (let s = e; ; ) {
      this.findPointBefore(n, s);
      let r = this.text.length;
      this.readNode(s);
      let o = at.get(s), l = s.nextSibling;
      if (l == t) {
        o != null && o.breakAfter && !l && n != this.view.contentDOM && this.lineBreak();
        break;
      }
      let a = at.get(l);
      (o && a ? o.breakAfter : (o ? o.breakAfter : ml(s)) || ml(l) && (s.nodeName != "BR" || o != null && o.isWidget()) && this.text.length > r) && !Sw(l, t) && this.lineBreak(), s = l;
    }
    return this.findPointBefore(n, t), this;
  }
  readTextNode(e) {
    let t = e.nodeValue;
    for (let n of this.points)
      n.node == e && (n.pos = this.text.length + Math.min(n.offset, t.length));
    for (let n = 0, s = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
      let r = -1, o = 1, l;
      if (this.lineSeparator ? (r = t.indexOf(this.lineSeparator, n), o = this.lineSeparator.length) : (l = s.exec(t)) && (r = l.index, o = l[0].length), this.append(t.slice(n, r < 0 ? t.length : r)), r < 0)
        break;
      if (this.lineBreak(), o > 1)
        for (let a of this.points)
          a.node == e && a.pos > this.text.length && (a.pos -= o - 1);
      n = r + o;
    }
  }
  readNode(e) {
    let t = at.get(e), n = t && t.overrideDOMText;
    if (n != null) {
      this.findPointInside(e, n.length);
      for (let s = n.iter(); !s.next().done; )
        s.lineBreak ? this.lineBreak() : this.append(s.value);
    } else e.nodeType == 3 ? this.readTextNode(e) : e.nodeName == "BR" ? e.nextSibling && this.lineBreak() : e.nodeType == 1 && this.readRange(e.firstChild, null);
  }
  findPointBefore(e, t) {
    for (let n of this.points)
      n.node == e && e.childNodes[n.offset] == t && (n.pos = this.text.length);
  }
  findPointInside(e, t) {
    for (let n of this.points)
      (e.nodeType == 3 ? n.node == e : e.contains(n.node)) && (n.pos = this.text.length + (xw(e, n.node, n.offset) ? t : 0));
  }
}
function xw(i, e, t) {
  for (; ; ) {
    if (!e || t < mn(e))
      return !1;
    if (e == i)
      return !0;
    t = In(e) + 1, e = e.parentNode;
  }
}
function Sw(i, e) {
  let t;
  for (; !(i == e || !i); i = i.nextSibling) {
    let n = at.get(i);
    if (!(n != null && n.isWidget()))
      return !1;
    n && (t || (t = [])).push(n);
  }
  if (t)
    for (let n of t) {
      let s = n.overrideDOMText;
      if (s != null && s.length)
        return !1;
    }
  return !0;
}
class mu {
  constructor(e, t) {
    this.node = e, this.offset = t, this.pos = -1;
  }
}
class kw {
  constructor(e, t, n, s) {
    this.typeOver = s, this.bounds = null, this.text = "", this.domChanged = t > -1;
    let { impreciseHead: r, impreciseAnchor: o } = e.docView, l = e.state.selection;
    if (e.state.readOnly && t > -1)
      this.newSel = null;
    else if (t > -1 && (this.bounds = IO(e.docView.tile, t, n, 0))) {
      let a = r || o ? [] : $w(e), h = new ww(a, e);
      h.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = h.text, this.newSel = _w(a, this.bounds.from);
    } else {
      let a = e.observer.selectionRange, h = r && r.node == a.focusNode && r.offset == a.focusOffset || !Ih(e.contentDOM, a.focusNode) ? l.main.head : e.docView.posFromDOM(a.focusNode, a.focusOffset), c = o && o.node == a.anchorNode && o.offset == a.anchorOffset || !Ih(e.contentDOM, a.anchorNode) ? l.main.anchor : e.docView.posFromDOM(a.anchorNode, a.anchorOffset), f = e.viewport;
      if ((re.ios || re.chrome) && h != c && Math.min(h, c) <= l.main.from && Math.max(h, c) >= l.main.to && (f.from > 0 || f.to < e.state.doc.length)) {
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
function IO(i, e, t, n) {
  if (i.isComposite()) {
    let s = -1, r = -1, o = -1, l = -1;
    for (let a = 0, h = n, c = n; a < i.children.length; a++) {
      let f = i.children[a], d = h + f.length;
      if (h < e && d > t)
        return IO(f, e, t, h);
      if (d >= e && s == -1 && (s = a, r = h), h > t && f.dom.parentNode == i.dom) {
        o = a, l = c;
        break;
      }
      c = d, h = d + f.breakAfter;
    }
    return {
      from: r,
      to: l < 0 ? n + i.length : l,
      startDOM: (s ? i.children[s - 1].dom.nextSibling : null) || i.dom.firstChild,
      endDOM: o < i.children.length && o >= 0 ? i.children[o].dom : null
    };
  } else return i.isText() ? { from: n, to: n + i.length, startDOM: i.dom, endDOM: i.dom.nextSibling } : null;
}
function DO(i, e) {
  let t, { newSel: n } = e, { state: s } = i, r = s.selection.main, o = i.inputState.lastKeyTime > Date.now() - 100 ? i.inputState.lastKeyCode : -1;
  if (e.bounds) {
    let { from: l, to: a } = e.bounds, h = r.from, c = null;
    (o === 8 || re.android && e.text.length < a - l) && (h = r.to, c = "end");
    let f = s.doc.sliceString(l, a, Ps), d, p;
    !r.empty && r.from >= l && r.to <= a && (e.typeOver || f != e.text) && f.slice(0, r.from - l) == e.text.slice(0, r.from - l) && f.slice(r.to - l) == e.text.slice(d = e.text.length - (f.length - (r.to - l))) ? t = {
      from: r.from,
      to: r.to,
      insert: Ae.of(e.text.slice(r.from - l, d).split(Ps))
    } : (p = zO(f, e.text, h - l, c)) && (re.chrome && o == 13 && p.toB == p.from + 2 && e.text.slice(p.from, p.toB) == Ps + Ps && p.toB--, t = {
      from: l + p.from,
      to: l + p.toA,
      insert: Ae.of(e.text.slice(p.from, p.toB).split(Ps))
    });
  } else n && (!i.hasFocus && s.facet(cn) || wl(n, r)) && (n = null);
  if (!t && !n)
    return !1;
  if ((re.mac || re.android) && t && t.from == t.to && t.from == r.head - 1 && /^\. ?$/.test(t.insert.toString()) && i.contentDOM.getAttribute("autocorrect") == "off" ? (n && t.insert.length == 2 && (n = B.single(n.main.anchor - 1, n.main.head - 1)), t = { from: t.from, to: t.to, insert: Ae.of([t.insert.toString().replace(".", " ")]) }) : s.doc.lineAt(r.from).to < r.to && i.docView.lineHasWidget(r.to) && i.inputState.insertingTextAt > Date.now() - 50 ? t = {
    from: r.from,
    to: r.to,
    insert: s.toText(i.inputState.insertingText)
  } : re.chrome && t && t.from == t.to && t.from == r.head && t.insert.toString() == `
 ` && i.lineWrapping && (n && (n = B.single(n.main.anchor - 1, n.main.head - 1)), t = { from: r.from, to: r.to, insert: Ae.of([" "]) }), t)
    return Vc(i, t, n, o);
  if (n && !wl(n, r)) {
    let l = !1, a = "select";
    return i.inputState.lastSelectionTime > Date.now() - 50 && (i.inputState.lastSelectionOrigin == "select" && (l = !0), a = i.inputState.lastSelectionOrigin, a == "select.pointer" && (n = LO(s.facet(yo).map((h) => h(i)), n))), i.dispatch({ selection: n, scrollIntoView: l, userEvent: a }), !0;
  } else
    return !1;
}
function Vc(i, e, t, n = -1) {
  if (re.ios && i.inputState.flushIOSKey(e))
    return !0;
  let s = i.state.selection.main;
  if (re.android && (e.to == s.to && // GBoard will sometimes remove a space it just inserted
  // after a completion when you press enter
  (e.from == s.from || e.from == s.from - 1 && i.state.sliceDoc(e.from, s.from) == " ") && e.insert.length == 1 && e.insert.lines == 2 && Ls(i.contentDOM, "Enter", 13) || (e.from == s.from - 1 && e.to == s.to && e.insert.length == 0 || n == 8 && e.insert.length < e.to - e.from && e.to > s.head) && Ls(i.contentDOM, "Backspace", 8) || e.from == s.from && e.to == s.to + 1 && e.insert.length == 0 && Ls(i.contentDOM, "Delete", 46)))
    return !0;
  let r = e.insert.toString();
  i.inputState.composing >= 0 && i.inputState.composing++;
  let o, l = () => o || (o = Qw(i, e, t));
  return i.state.facet(_O).some((a) => a(i, e.from, e.to, r, l)) || i.dispatch(l()), !0;
}
function Qw(i, e, t) {
  let n, s = i.state, r = s.selection.main, o = -1;
  if (e.from == e.to && e.from < r.from || e.from > r.to) {
    let a = e.from < r.from ? -1 : 1, h = a < 0 ? r.from : r.to, c = qr(s.facet(yo).map((f) => f(i)), h, a);
    e.from == c && (o = c);
  }
  if (o > -1)
    n = {
      changes: e,
      selection: B.cursor(e.from + e.insert.length, -1)
    };
  else if (e.from >= r.from && e.to <= r.to && e.to - e.from >= (r.to - r.from) / 3 && (!t || t.main.empty && t.main.from == e.from + e.insert.length) && i.inputState.composing < 0) {
    let a = r.from < e.from ? s.sliceDoc(r.from, e.from) : "", h = r.to > e.to ? s.sliceDoc(e.to, r.to) : "";
    n = s.replaceSelection(i.state.toText(a + e.insert.sliceString(0, void 0, i.state.lineBreak) + h));
  } else {
    let a = s.changes(e), h = t && t.main.to <= a.newLength ? t.main : void 0;
    if (s.selection.ranges.length > 1 && (i.inputState.composing >= 0 || i.inputState.compositionPendingChange) && e.to <= r.to + 10 && e.to >= r.to - 10) {
      let c = i.state.sliceDoc(e.from, e.to), f, d = t && jO(i, t.main.head);
      if (d) {
        let O = e.insert.length - (e.to - e.from);
        f = { from: d.from, to: d.to - O };
      } else
        f = i.state.doc.lineAt(r.head);
      let p = r.to - e.to;
      n = s.changeByRange((O) => {
        if (O.from == r.from && O.to == r.to)
          return { changes: a, range: h || O.map(a) };
        let g = O.to - p, m = g - c.length;
        if (i.state.sliceDoc(m, g) != c || // Unfortunately, there's no way to make multiple
        // changes in the same node work without aborting
        // composition, so cursors in the composition range are
        // ignored.
        g >= f.from && m <= f.to)
          return { range: O };
        let v = s.changes({ from: m, to: g, insert: e.insert }), y = O.to - r.to;
        return {
          changes: v,
          range: h ? B.range(Math.max(0, h.anchor + y), Math.max(0, h.head + y)) : O.map(v)
        };
      });
    } else
      n = {
        changes: a,
        selection: h && s.selection.replaceRange(h)
      };
  }
  let l = "input.type";
  return (i.composing || i.inputState.compositionPendingChange && i.inputState.compositionEndedAt > Date.now() - 50) && (i.inputState.compositionPendingChange = !1, l += ".compose", i.inputState.compositionFirstChange && (l += ".start", i.inputState.compositionFirstChange = !1)), s.update(n, { userEvent: l, scrollIntoView: !0 });
}
function zO(i, e, t, n) {
  let s = Math.min(i.length, e.length), r = 0;
  for (; r < s && i.charCodeAt(r) == e.charCodeAt(r); )
    r++;
  if (r == s && i.length == e.length)
    return null;
  let o = i.length, l = e.length;
  for (; o > 0 && l > 0 && i.charCodeAt(o - 1) == e.charCodeAt(l - 1); )
    o--, l--;
  if (n == "end") {
    let a = Math.max(0, r - Math.min(o, l));
    t -= o + a - r;
  }
  if (o < r && i.length < e.length) {
    let a = t <= r && t >= o ? r - t : 0;
    r -= a, l = r + (l - o), o = r;
  } else if (l < r) {
    let a = t <= r && t >= l ? r - t : 0;
    r -= a, o = r + (o - l), l = r;
  }
  return { from: r, toA: o, toB: l };
}
function $w(i) {
  let e = [];
  if (i.root.activeElement != i.contentDOM)
    return e;
  let { anchorNode: t, anchorOffset: n, focusNode: s, focusOffset: r } = i.observer.selectionRange;
  return t && (e.push(new mu(t, n)), (s != t || r != n) && e.push(new mu(s, r))), e;
}
function _w(i, e) {
  if (i.length == 0)
    return null;
  let t = i[0].pos, n = i.length == 2 ? i[1].pos : t;
  return t > -1 && n > -1 ? B.single(t + e, n + e) : null;
}
function wl(i, e) {
  return e.head == i.main.head && e.anchor == i.main.anchor;
}
class Pw {
  setSelectionOrigin(e) {
    this.lastSelectionOrigin = e, this.lastSelectionTime = Date.now();
  }
  constructor(e) {
    this.view = e, this.lastKeyCode = 0, this.lastKeyTime = 0, this.touchActive = !1, this.lastTouchTime = 0, this.lastTouchX = 0, this.lastTouchY = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.lastWheelEvent = 0, this.pendingIOSKey = void 0, this.lastIOSMomentumScroll = 0, this.tabFocusMode = -1, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.handlers = /* @__PURE__ */ Object.create(null), this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = !1, this.compositionPendingChange = !1, this.insertingText = "", this.insertingTextAt = 0, this.mouseSelection = null, this.draggedContent = null, this.handleEvent = this.handleEvent.bind(this), this.notifiedFocused = e.hasFocus, re.safari && e.contentDOM.addEventListener("input", () => null), re.gecko && Ww(e.contentDOM.ownerDocument);
  }
  handleEvent(e) {
    !jw(this.view, e) || this.ignoreDuringComposition(e) || e.type == "keydown" && this.keydown(e) || (this.view.updateState != 0 ? Promise.resolve().then(() => this.runHandlers(e.type, e)) : this.runHandlers(e.type, e));
  }
  runHandlers(e, t) {
    let n = this.handlers[e];
    if (n) {
      for (let s of n.observers)
        s(this.view, t);
      for (let s of n.handlers) {
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
    let t = Zw(e), n = this.handlers, s = this.view.contentDOM;
    for (let r in t)
      if (r != "scroll") {
        let o = !t[r].handlers.length, l = n[r];
        l && o != !l.handlers.length && (s.removeEventListener(r, this.handleEvent), l = null), l || s.addEventListener(r, this.handleEvent, { passive: o });
      }
    for (let r in n)
      r != "scroll" && !t[r] && s.removeEventListener(r, this.handleEvent);
    this.handlers = t;
  }
  keydown(e) {
    if (this.lastKeyCode = e.keyCode, this.lastKeyTime = Date.now(), e.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode))
      return !0;
    if (this.tabFocusMode > 0 && e.keyCode != 27 && YO.indexOf(e.keyCode) < 0 && (this.tabFocusMode = -1), re.android && re.chrome && !e.synthetic && (e.keyCode == 13 || e.keyCode == 8))
      return this.view.observer.delayAndroidKey(e.key, e.keyCode), !0;
    if (re.ios && !e.synthetic && !e.altKey && !e.metaKey && (NO.some((t) => t.keyCode == e.keyCode) && !e.ctrlKey || Cw.indexOf(e.key) > -1 && e.ctrlKey)) {
      let t = { ctrlKey: e.ctrlKey, altKey: e.altKey, metaKey: e.metaKey, shiftKey: e.shiftKey };
      return t.shiftKey && re.ios && !/^(off|none)$/.test(this.view.contentDOM.autocapitalize) && Tw(this.view.win) && (t.shiftKey = !1), this.pendingIOSKey = { key: e.key, keyCode: e.keyCode, mods: t }, setTimeout(() => this.flushIOSKey(), 250), !0;
    }
    return e.keyCode != 229 && this.view.observer.forceFlush(), !1;
  }
  flushIOSKey(e) {
    let t = this.pendingIOSKey;
    return !t || t.key == "Enter" && e && e.from < e.to && /^\S+$/.test(e.insert.toString()) ? !1 : (this.pendingIOSKey = void 0, Ls(this.view.contentDOM, t.key, t.keyCode, t.mods));
  }
  ignoreDuringComposition(e) {
    return !/^key/.test(e.type) || e.synthetic ? !1 : this.composing > 0 ? !0 : re.safari && !re.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100 ? (this.compositionPendingKey = !1, !0) : !1;
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
function Tw(i) {
  return i.visualViewport ? i.visualViewport.height * i.visualViewport.scale / i.document.documentElement.clientHeight < 0.85 : !1;
}
function vu(i, e) {
  return (t, n) => {
    try {
      return e.call(i, n, t);
    } catch (s) {
      ni(t.state, s);
    }
  };
}
function Zw(i) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(n) {
    return e[n] || (e[n] = { observers: [], handlers: [] });
  }
  for (let n of i) {
    let s = n.spec, r = s && s.plugin.domEventHandlers, o = s && s.plugin.domEventObservers;
    if (r)
      for (let l in r) {
        let a = r[l];
        a && t(l).handlers.push(vu(n.value, a));
      }
    if (o)
      for (let l in o) {
        let a = o[l];
        a && t(l).observers.push(vu(n.value, a));
      }
  }
  for (let n in Ri)
    t(n).handlers.push(Ri[n]);
  for (let n in It)
    t(n).observers.push(It[n]);
  return e;
}
const NO = [
  { key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" },
  { key: "Enter", keyCode: 13, inputType: "insertParagraph" },
  { key: "Enter", keyCode: 13, inputType: "insertLineBreak" },
  { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }
], Cw = "dthko", YO = [16, 17, 18, 20, 91, 92, 224, 225], Eo = 6;
function Ao(i) {
  return Math.max(0, i) * 0.7 + 8;
}
function Ew(i, e) {
  return Math.max(Math.abs(i.clientX - e.clientX), Math.abs(i.clientY - e.clientY));
}
class Aw {
  constructor(e, t, n, s) {
    this.view = e, this.startEvent = t, this.style = n, this.mustSelect = s, this.scrollSpeed = { x: 0, y: 0 }, this.scrolling = -1, this.lastEvent = t, this.scrollParents = dO(e.contentDOM), this.atoms = e.state.facet(yo).map((o) => o(e));
    let r = e.contentDOM.ownerDocument;
    r.addEventListener("mousemove", this.move = this.move.bind(this)), r.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = t.shiftKey, this.multiple = e.state.facet(Xe.allowMultipleSelections) && Rw(e, t), this.dragging = Xw(e, t) && VO(t) == 1 ? null : !1;
  }
  start(e) {
    this.dragging === !1 && this.select(e);
  }
  move(e) {
    if (e.buttons == 0)
      return this.destroy();
    if (this.dragging || this.dragging == null && Ew(this.startEvent, e) < 10)
      return;
    this.select(this.lastEvent = e);
    let t = 0, n = 0, s = 0, r = 0, o = this.view.win.innerWidth, l = this.view.win.innerHeight;
    this.scrollParents.x && ({ left: s, right: o } = this.scrollParents.x.getBoundingClientRect()), this.scrollParents.y && ({ top: r, bottom: l } = this.scrollParents.y.getBoundingClientRect());
    let a = qc(this.view);
    e.clientX - a.left <= s + Eo ? t = -Ao(s - e.clientX) : e.clientX + a.right >= o - Eo && (t = Ao(e.clientX - o)), e.clientY - a.top <= r + Eo ? n = -Ao(r - e.clientY) : e.clientY + a.bottom >= l - Eo && (n = Ao(e.clientY - l)), this.setScrollSpeed(t, n);
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
    let { view: t } = this, n = LO(this.atoms, this.style.get(e, this.extend, this.multiple));
    (this.mustSelect || !n.eq(t.state.selection, this.dragging === !1)) && this.view.dispatch({
      selection: n,
      userEvent: "select.pointer"
    }), this.mustSelect = !1;
  }
  update(e) {
    e.transactions.some((t) => t.isUserEvent("input.type")) ? this.destroy() : this.style.update(e) && setTimeout(() => this.select(this.lastEvent), 20);
  }
}
function Rw(i, e) {
  let t = i.state.facet(SO);
  return t.length ? t[0](e) : re.mac ? e.metaKey : e.ctrlKey;
}
function Mw(i, e) {
  let t = i.state.facet(kO);
  return t.length ? t[0](e) : re.mac ? !e.altKey : !e.ctrlKey;
}
function Xw(i, e) {
  let { main: t } = i.state.selection;
  if (t.empty)
    return !1;
  let n = eo(i.root);
  if (!n || n.rangeCount == 0)
    return !0;
  let s = n.getRangeAt(0).getClientRects();
  for (let r = 0; r < s.length; r++) {
    let o = s[r];
    if (o.left <= e.clientX && o.right >= e.clientX && o.top <= e.clientY && o.bottom >= e.clientY)
      return !0;
  }
  return !1;
}
function jw(i, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target, n; t != i.contentDOM; t = t.parentNode)
    if (!t || t.nodeType == 11 || (n = at.get(t)) && n.isWidget() && !n.isHidden && n.widget.ignoreEvent(e))
      return !1;
  return !0;
}
const Ri = /* @__PURE__ */ Object.create(null), It = /* @__PURE__ */ Object.create(null), WO = re.ie && re.ie_version < 15 || re.ios && re.webkit_version < 604;
function Lw(i) {
  let e = i.dom.parentNode;
  if (!e)
    return;
  let t = e.appendChild(document.createElement("textarea"));
  t.style.cssText = "position: fixed; left: -10000px; top: 10px", t.focus(), setTimeout(() => {
    i.focus(), t.remove(), qO(i, t.value);
  }, 50);
}
function ta(i, e, t) {
  for (let n of i.facet(e))
    t = n(t, i);
  return t;
}
function qO(i, e) {
  e = ta(i.state, zc, e);
  let { state: t } = i, n, s = 1, r = t.toText(e), o = r.lines == t.selection.ranges.length;
  if (Vh != null && t.selection.ranges.every((a) => a.empty) && Vh == r.toString()) {
    let a = -1;
    n = t.changeByRange((h) => {
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
  } else o ? n = t.changeByRange((a) => {
    let h = r.line(s++);
    return {
      changes: { from: a.from, to: a.to, insert: h.text },
      range: B.cursor(a.from + h.length)
    };
  }) : n = t.replaceSelection(r);
  i.dispatch(n, {
    userEvent: "input.paste",
    scrollIntoView: !0
  });
}
It.scroll = (i) => {
  let e = i.inputState;
  e.lastScrollTop = i.scrollDOM.scrollTop, e.lastScrollLeft = i.scrollDOM.scrollLeft, re.ios && !e.touchActive && (e.lastIOSMomentumScroll = Date.now());
};
It.wheel = It.mousewheel = (i) => {
  i.inputState.lastWheelEvent = Date.now();
};
Ri.keydown = (i, e) => (i.inputState.setSelectionOrigin("select"), e.keyCode == 27 && i.inputState.tabFocusMode != 0 && (i.inputState.tabFocusMode = Date.now() + 2e3), !1);
It.touchstart = (i, e) => {
  let t = i.inputState, n = e.targetTouches[0];
  t.touchActive = !0, t.lastTouchTime = Date.now(), n && (t.lastTouchX = n.clientX, t.lastTouchY = n.clientY), t.setSelectionOrigin("select.pointer");
};
It.touchmove = (i) => {
  i.inputState.setSelectionOrigin("select.pointer");
};
It.touchend = (i, e) => {
  i.inputState.touchActive = !1;
};
Ri.mousedown = (i, e) => {
  if (i.observer.flush(), i.inputState.lastTouchTime > Date.now() - 2e3)
    return !1;
  let t = null;
  for (let n of i.state.facet(QO))
    if (t = n(i, e), t)
      break;
  if (!t && e.button == 0 && (t = Dw(i, e)), t) {
    let n = !i.hasFocus;
    i.inputState.startMouseSelection(new Aw(i, e, t, n)), n && i.observer.ignore(() => {
      pO(i.contentDOM);
      let r = i.root.activeElement;
      r && !r.contains(i.contentDOM) && r.blur();
    });
    let s = i.inputState.mouseSelection;
    if (s)
      return s.start(e), s.dragging === !1;
  } else
    i.inputState.setSelectionOrigin("select.pointer");
  return !1;
};
function bu(i, e, t, n) {
  if (n == 1)
    return B.cursor(e, t);
  if (n == 2)
    return pw(i.state, e, t);
  {
    let s = i.docView.lineAt(e, t), r = i.state.doc.lineAt(s ? s.posAtEnd : e), o = s ? s.posAtStart : r.from, l = s ? s.posAtEnd : r.to;
    return l < i.state.doc.length && l == r.to && l++, B.undirectionalRange(o, l);
  }
}
const Iw = re.ie && re.ie_version <= 11;
let yu = null, wu = 0, xu = 0;
function VO(i) {
  if (!Iw)
    return i.detail;
  let e = yu, t = xu;
  return yu = i, xu = Date.now(), wu = !e || t > Date.now() - 400 && Math.abs(e.clientX - i.clientX) < 2 && Math.abs(e.clientY - i.clientY) < 2 ? (wu + 1) % 3 : 1;
}
function Dw(i, e) {
  let t = i.posAndSideAtCoords({ x: e.clientX, y: e.clientY }, !1), n = VO(e), s = i.state.selection;
  return {
    update(r) {
      r.docChanged && (t.pos = r.changes.mapPos(t.pos), s = s.map(r.changes));
    },
    get(r, o, l) {
      let a = i.posAndSideAtCoords({ x: r.clientX, y: r.clientY }, !1), h, c = bu(i, a.pos, a.assoc, n);
      if (t.pos != a.pos && !o) {
        let f = bu(i, t.pos, t.assoc, n), d = Math.min(f.from, c.from), p = Math.max(f.to, c.to);
        c = d < c.from ? B.range(d, p, c.assoc) : B.range(p, d, c.assoc);
      }
      return o ? s.replaceRange(s.main.extend(c.from, c.to, c.assoc)) : l && n == 1 && s.ranges.length > 1 && (h = zw(s, a.pos)) ? h : l ? s.addRange(c) : B.create([c]);
    }
  };
}
function zw(i, e) {
  for (let t = 0; t < i.ranges.length; t++) {
    let { from: n, to: s } = i.ranges[t];
    if (n <= e && s >= e)
      return B.create(i.ranges.slice(0, t).concat(i.ranges.slice(t + 1)), i.mainIndex == t ? 0 : i.mainIndex - (i.mainIndex > t ? 1 : 0));
  }
  return null;
}
Ri.dragstart = (i, e) => {
  let { selection: { main: t } } = i.state;
  if (e.target.draggable) {
    let s = i.docView.tile.nearest(e.target);
    if (s && s.isWidget()) {
      let r = s.posAtStart, o = r + s.length;
      (r >= t.to || o <= t.from) && (t = B.undirectionalRange(r, o));
    }
  }
  let { inputState: n } = i;
  return n.mouseSelection && (n.mouseSelection.dragging = !0), n.draggedContent = t, e.dataTransfer && (e.dataTransfer.setData("Text", ta(i.state, Nc, i.state.sliceDoc(t.from, t.to))), e.dataTransfer.effectAllowed = "copyMove"), !1;
};
Ri.dragend = (i) => (i.inputState.draggedContent = null, !1);
function Su(i, e, t, n) {
  if (t = ta(i.state, zc, t), !t)
    return;
  let s = i.posAtCoords({ x: e.clientX, y: e.clientY }, !1), { draggedContent: r } = i.inputState, o = n && r && Mw(i, e) ? { from: r.from, to: r.to } : null, l = { from: s, insert: t }, a = i.state.changes(o ? [o, l] : l);
  i.focus(), i.dispatch({
    changes: a,
    selection: { anchor: a.mapPos(s, -1), head: a.mapPos(s, 1) },
    userEvent: o ? "move.drop" : "input.drop"
  }), i.inputState.draggedContent = null;
}
Ri.drop = (i, e) => {
  if (!e.dataTransfer)
    return !1;
  if (i.state.readOnly)
    return !0;
  let t = e.dataTransfer.files;
  if (t && t.length) {
    let n = Array(t.length), s = 0, r = () => {
      ++s == t.length && Su(i, e, n.filter((o) => o != null).join(i.state.lineBreak), !1);
    };
    for (let o = 0; o < t.length; o++) {
      let l = new FileReader();
      l.onerror = r, l.onload = () => {
        /[\x00-\x08\x0e-\x1f]{2}/.test(l.result) || (n[o] = l.result), r();
      }, l.readAsText(t[o]);
    }
    return !0;
  } else {
    let n = e.dataTransfer.getData("Text");
    if (n)
      return Su(i, e, n, !0), !0;
  }
  return !1;
};
Ri.paste = (i, e) => {
  if (i.state.readOnly)
    return !0;
  i.observer.flush();
  let t = WO ? null : e.clipboardData;
  return t ? (qO(i, t.getData("text/plain") || t.getData("text/uri-list")), !0) : (Lw(i), !1);
};
function Nw(i, e) {
  let t = i.dom.parentNode;
  if (!t)
    return;
  let n = t.appendChild(document.createElement("textarea"));
  n.style.cssText = "position: fixed; left: -10000px; top: 10px", n.value = e, n.focus(), n.selectionEnd = e.length, n.selectionStart = 0, setTimeout(() => {
    n.remove(), i.focus();
  }, 50);
}
function Yw(i) {
  let e = [], t = [], n = !1;
  for (let s of i.selection.ranges)
    s.empty || (e.push(i.sliceDoc(s.from, s.to)), t.push(s));
  if (!e.length) {
    let s = -1;
    for (let { from: r } of i.selection.ranges) {
      let o = i.doc.lineAt(r);
      o.number > s && (e.push(o.text), t.push({ from: o.from, to: Math.min(i.doc.length, o.to + 1) })), s = o.number;
    }
    n = !0;
  }
  return { text: ta(i, Nc, e.join(i.lineBreak)), ranges: t, linewise: n };
}
let Vh = null;
Ri.copy = Ri.cut = (i, e) => {
  if (!Nr(i.contentDOM, i.observer.selectionRange))
    return !1;
  let { text: t, ranges: n, linewise: s } = Yw(i.state);
  if (!t && !s)
    return !1;
  Vh = s ? t : null, e.type == "cut" && !i.state.readOnly && i.dispatch({
    changes: n,
    scrollIntoView: !0,
    userEvent: "delete.cut"
  });
  let r = WO ? null : e.clipboardData;
  return r ? (r.clearData(), r.setData("text/plain", t), !0) : (Nw(i, t), !1);
};
const BO = /* @__PURE__ */ bn.define();
function GO(i, e) {
  let t = [];
  for (let n of i.facet(PO)) {
    let s = n(i, e);
    s && t.push(s);
  }
  return t.length ? i.update({ effects: t, annotations: BO.of(!0) }) : null;
}
function UO(i) {
  setTimeout(() => {
    let e = i.hasFocus;
    if (e != i.inputState.notifiedFocused) {
      let t = GO(i.state, e);
      t ? i.dispatch(t) : i.update([]);
    }
  }, 10);
}
It.focus = (i) => {
  i.inputState.lastFocusTime = Date.now(), !i.scrollDOM.scrollTop && (i.inputState.lastScrollTop || i.inputState.lastScrollLeft) && (i.scrollDOM.scrollTop = i.inputState.lastScrollTop, i.scrollDOM.scrollLeft = i.inputState.lastScrollLeft), UO(i);
};
It.blur = (i) => {
  i.observer.clearSelectionRange(), UO(i);
};
It.compositionstart = It.compositionupdate = (i) => {
  i.observer.editContext || (i.inputState.compositionFirstChange == null && (i.inputState.compositionFirstChange = !0), i.inputState.composing < 0 && (i.inputState.composing = 0));
};
It.compositionend = (i) => {
  i.observer.editContext || (i.inputState.composing = -1, i.inputState.compositionEndedAt = Date.now(), i.inputState.compositionPendingKey = !0, i.inputState.compositionPendingChange = i.observer.pendingRecords().length > 0, i.inputState.compositionFirstChange = null, re.chrome && re.android ? i.observer.flushSoon() : i.inputState.compositionPendingChange ? Promise.resolve().then(() => i.observer.flush()) : setTimeout(() => {
    i.inputState.composing < 0 && i.docView.hasComposition && i.update([]);
  }, 50));
};
It.contextmenu = (i) => {
  i.inputState.lastContextMenu = Date.now();
};
Ri.beforeinput = (i, e) => {
  var t, n;
  if ((e.inputType == "insertText" || e.inputType == "insertCompositionText") && (i.inputState.insertingText = e.data, i.inputState.insertingTextAt = Date.now()), e.inputType == "insertReplacementText" && i.observer.editContext) {
    let r = (t = e.dataTransfer) === null || t === void 0 ? void 0 : t.getData("text/plain"), o = e.getTargetRanges();
    if (r && o.length) {
      let l = o[0], a = i.posAtDOM(l.startContainer, l.startOffset), h = i.posAtDOM(l.endContainer, l.endOffset);
      return Vc(i, { from: a, to: h, insert: i.state.toText(r) }, null), !0;
    }
  }
  let s;
  if (re.chrome && re.android && (s = NO.find((r) => r.inputType == e.inputType)) && (i.observer.delayAndroidKey(s.key, s.keyCode), s.key == "Backspace" || s.key == "Delete")) {
    let r = ((n = window.visualViewport) === null || n === void 0 ? void 0 : n.height) || 0;
    setTimeout(() => {
      var o;
      (((o = window.visualViewport) === null || o === void 0 ? void 0 : o.height) || 0) > r + 10 && i.hasFocus && (i.contentDOM.blur(), i.focus());
    }, 100);
  }
  return re.ios && e.inputType == "deleteContentForward" && i.observer.flushSoon(), re.safari && e.inputType == "insertText" && i.inputState.composing >= 0 && setTimeout(() => It.compositionend(i, e), 20), !1;
};
const ku = /* @__PURE__ */ new Set();
function Ww(i) {
  ku.has(i) || (ku.add(i), i.addEventListener("copy", () => {
  }), i.addEventListener("cut", () => {
  }));
}
const Qu = ["pre-wrap", "normal", "pre-line", "break-spaces"];
let lr = !1;
function $u() {
  lr = !1;
}
class qw {
  constructor(e) {
    this.lineWrapping = e, this.doc = Ae.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30;
  }
  heightForGap(e, t) {
    let n = this.doc.lineAt(t).number - this.doc.lineAt(e).number + 1;
    return this.lineWrapping && (n += Math.max(0, Math.ceil((t - e - n * this.lineLength * 0.5) / this.lineLength))), this.lineHeight * n;
  }
  heightForLine(e) {
    return this.lineWrapping ? (1 + Math.max(0, Math.ceil((e - this.lineLength) / Math.max(1, this.lineLength - 5)))) * this.lineHeight : this.lineHeight;
  }
  setDoc(e) {
    return this.doc = e, this;
  }
  mustRefreshForWrapping(e) {
    return Qu.indexOf(e) > -1 != this.lineWrapping;
  }
  mustRefreshForHeights(e) {
    let t = !1;
    for (let n = 0; n < e.length; n++) {
      let s = e[n];
      s < 0 ? n++ : this.heightSamples[Math.floor(s * 10)] || (t = !0, this.heightSamples[Math.floor(s * 10)] = !0);
    }
    return t;
  }
  refresh(e, t, n, s, r, o) {
    let l = Qu.indexOf(e) > -1, a = Math.abs(t - this.lineHeight) > 0.3 || this.lineWrapping != l;
    if (this.lineWrapping = l, this.lineHeight = t, this.charWidth = n, this.textHeight = s, this.lineLength = r, a) {
      this.heightSamples = {};
      for (let h = 0; h < o.length; h++) {
        let c = o[h];
        c < 0 ? h++ : this.heightSamples[Math.floor(c * 10)] = !0;
      }
    }
    return a;
  }
}
class Vw {
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
  constructor(e, t, n, s, r) {
    this.from = e, this.length = t, this.top = n, this.height = s, this._content = r;
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
    return this._content instanceof Os ? this._content.widget : null;
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
var Ue = /* @__PURE__ */ (function(i) {
  return i[i.ByPos = 0] = "ByPos", i[i.ByHeight = 1] = "ByHeight", i[i.ByPosNoHeight = 2] = "ByPosNoHeight", i;
})(Ue || (Ue = {}));
const il = 1e-3;
class Lt {
  constructor(e, t, n = 2) {
    this.length = e, this.height = t, this.flags = n;
  }
  get outdated() {
    return (this.flags & 2) > 0;
  }
  set outdated(e) {
    this.flags = (e ? 2 : 0) | this.flags & -3;
  }
  setHeight(e) {
    this.height != e && (Math.abs(this.height - e) > il && (lr = !0), this.height = e);
  }
  // Base case is to replace a leaf node, which simply builds a tree
  // from the new nodes and returns that (HeightMapBranch and
  // HeightMapGap override this to actually use from/to)
  replace(e, t, n) {
    return Lt.of(n);
  }
  // Again, these are base cases, and are overridden for branch and gap nodes.
  decomposeLeft(e, t) {
    t.push(this);
  }
  decomposeRight(e, t) {
    t.push(this);
  }
  applyChanges(e, t, n, s) {
    let r = this, o = n.doc;
    for (let l = s.length - 1; l >= 0; l--) {
      let { fromA: a, toA: h, fromB: c, toB: f } = s[l], d = r.lineAt(a, Ue.ByPosNoHeight, n.setDoc(t), 0, 0), p = d.to >= h ? d : r.lineAt(h, Ue.ByPosNoHeight, n, 0, 0);
      for (f += p.to - h, h = p.to; l > 0 && d.from <= s[l - 1].toA; )
        a = s[l - 1].fromA, c = s[l - 1].fromB, l--, a < d.from && (d = r.lineAt(a, Ue.ByPosNoHeight, n, 0, 0));
      c += d.from - a, a = d.from;
      let O = Bc.build(n.setDoc(o), e, c, f);
      r = xl(r, r.replace(a, h, O));
    }
    return r.updateHeight(n, 0);
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
    let t = 0, n = e.length, s = 0, r = 0;
    for (; ; )
      if (t == n)
        if (s > r * 2) {
          let l = e[t - 1];
          l.break ? e.splice(--t, 1, l.left, null, l.right) : e.splice(--t, 1, l.left, l.right), n += 1 + l.break, s -= l.size;
        } else if (r > s * 2) {
          let l = e[n];
          l.break ? e.splice(n, 1, l.left, null, l.right) : e.splice(n, 1, l.left, l.right), n += 2 + l.break, r -= l.size;
        } else
          break;
      else if (s < r) {
        let l = e[t++];
        l && (s += l.size);
      } else {
        let l = e[--n];
        l && (r += l.size);
      }
    let o = 0;
    return e[t - 1] == null ? (o = 1, t--) : e[t] == null && (o = 1, n++), new Gw(Lt.of(e.slice(0, t)), o, Lt.of(e.slice(n)));
  }
}
function xl(i, e) {
  return i == e ? i : (i.constructor != e.constructor && (lr = !0), e);
}
Lt.prototype.size = 1;
const Bw = /* @__PURE__ */ We.replace({});
class FO extends Lt {
  constructor(e, t, n) {
    super(e, t), this.deco = n, this.spaceAbove = 0;
  }
  mainBlock(e, t) {
    return new Pi(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.deco || 0);
  }
  blockAt(e, t, n, s) {
    return this.spaceAbove && e < n + this.spaceAbove ? new Pi(s, 0, n, this.spaceAbove, Bw) : this.mainBlock(n, s);
  }
  lineAt(e, t, n, s, r) {
    let o = this.mainBlock(s, r);
    return this.spaceAbove ? this.blockAt(0, n, s, r).join(o) : o;
  }
  forEachLine(e, t, n, s, r, o) {
    e <= r + this.length && t >= r && o(this.lineAt(0, Ue.ByPos, n, s, r));
  }
  setMeasuredHeight(e) {
    let t = e.heights[e.index++];
    t < 0 ? (this.spaceAbove = -t, t = e.heights[e.index++]) : this.spaceAbove = 0, this.setHeight(t);
  }
  updateHeight(e, t = 0, n = !1, s) {
    return s && s.from <= t && s.more && this.setMeasuredHeight(s), this.outdated = !1, this;
  }
  toString() {
    return `block(${this.length})`;
  }
}
class ii extends FO {
  constructor(e, t, n) {
    super(e, t, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0, this.spaceAbove = n;
  }
  mainBlock(e, t) {
    return new Pi(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.breaks);
  }
  replace(e, t, n) {
    let s = n[0];
    return n.length == 1 && (s instanceof ii || s instanceof Qt && s.flags & 4) && Math.abs(this.length - s.length) < 10 ? (s instanceof Qt ? s = new ii(s.length, this.height, this.spaceAbove) : s.height = this.height, this.outdated || (s.outdated = !1), s) : Lt.of(n);
  }
  updateHeight(e, t = 0, n = !1, s) {
    return s && s.from <= t && s.more ? this.setMeasuredHeight(s) : (n || this.outdated) && (this.spaceAbove = 0, this.setHeight(Math.max(this.widgetHeight, e.heightForLine(this.length - this.collapsed)) + this.breaks * e.lineHeight)), this.outdated = !1, this;
  }
  toString() {
    return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
  }
}
class Qt extends Lt {
  constructor(e) {
    super(e, 0);
  }
  heightMetrics(e, t) {
    let n = e.doc.lineAt(t).number, s = e.doc.lineAt(t + this.length).number, r = s - n + 1, o, l = 0;
    if (e.lineWrapping) {
      let a = Math.min(this.height, e.lineHeight * r);
      o = a / r, this.length > r + 1 && (l = (this.height - a) / (this.length - r - 1));
    } else
      o = this.height / r;
    return { firstLine: n, lastLine: s, perLine: o, perChar: l };
  }
  blockAt(e, t, n, s) {
    let { firstLine: r, lastLine: o, perLine: l, perChar: a } = this.heightMetrics(t, s);
    if (t.lineWrapping) {
      let h = s + (e < t.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (e - n) / this.height)) * this.length)), c = t.doc.lineAt(h), f = l + c.length * a, d = Math.max(n, e - f / 2);
      return new Pi(c.from, c.length, d, f, 0);
    } else {
      let h = Math.max(0, Math.min(o - r, Math.floor((e - n) / l))), { from: c, length: f } = t.doc.line(r + h);
      return new Pi(c, f, n + l * h, l, 0);
    }
  }
  lineAt(e, t, n, s, r) {
    if (t == Ue.ByHeight)
      return this.blockAt(e, n, s, r);
    if (t == Ue.ByPosNoHeight) {
      let { from: p, to: O } = n.doc.lineAt(e);
      return new Pi(p, O - p, 0, 0, 0);
    }
    let { firstLine: o, perLine: l, perChar: a } = this.heightMetrics(n, r), h = n.doc.lineAt(e), c = l + h.length * a, f = h.number - o, d = s + l * f + a * (h.from - r - f);
    return new Pi(h.from, h.length, Math.max(s, Math.min(d, s + this.height - c)), c, 0);
  }
  forEachLine(e, t, n, s, r, o) {
    e = Math.max(e, r), t = Math.min(t, r + this.length);
    let { firstLine: l, perLine: a, perChar: h } = this.heightMetrics(n, r);
    for (let c = e, f = s; c <= t; ) {
      let d = n.doc.lineAt(c);
      if (c == e) {
        let O = d.number - l;
        f += a * O + h * (e - r - O);
      }
      let p = a + h * d.length;
      o(new Pi(d.from, d.length, f, p, 0)), f += p, c = d.to + 1;
    }
  }
  replace(e, t, n) {
    let s = this.length - t;
    if (s > 0) {
      let r = n[n.length - 1];
      r instanceof Qt ? n[n.length - 1] = new Qt(r.length + s) : n.push(null, new Qt(s - 1));
    }
    if (e > 0) {
      let r = n[0];
      r instanceof Qt ? n[0] = new Qt(e + r.length) : n.unshift(new Qt(e - 1), null);
    }
    return Lt.of(n);
  }
  decomposeLeft(e, t) {
    t.push(new Qt(e - 1), null);
  }
  decomposeRight(e, t) {
    t.push(null, new Qt(this.length - e - 1));
  }
  updateHeight(e, t = 0, n = !1, s) {
    let r = t + this.length;
    if (s && s.from <= t + this.length && s.more) {
      let o = [], l = Math.max(t, s.from), a = -1;
      for (s.from > t && o.push(new Qt(s.from - t - 1).updateHeight(e, t)); l <= r && s.more; ) {
        let c = e.doc.lineAt(l).length;
        o.length && o.push(null);
        let f = s.heights[s.index++], d = 0;
        f < 0 && (d = -f, f = s.heights[s.index++]), a == -1 ? a = f : Math.abs(f - a) >= il && (a = -2);
        let p = new ii(c, f, d);
        p.outdated = !1, o.push(p), l += c + 1;
      }
      l <= r && o.push(null, new Qt(r - l).updateHeight(e, l));
      let h = Lt.of(o);
      return (a < 0 || Math.abs(h.height - this.height) >= il || Math.abs(a - this.heightMetrics(e, t).perLine) >= il) && (lr = !0), xl(this, h);
    } else (n || this.outdated) && (this.setHeight(e.heightForGap(t, t + this.length)), this.outdated = !1);
    return this;
  }
  toString() {
    return `gap(${this.length})`;
  }
}
class Gw extends Lt {
  constructor(e, t, n) {
    super(e.length + t + n.length, e.height + n.height, t | (e.outdated || n.outdated ? 2 : 0)), this.left = e, this.right = n, this.size = e.size + n.size;
  }
  get break() {
    return this.flags & 1;
  }
  blockAt(e, t, n, s) {
    let r = n + this.left.height;
    return e < r ? this.left.blockAt(e, t, n, s) : this.right.blockAt(e, t, r, s + this.left.length + this.break);
  }
  lineAt(e, t, n, s, r) {
    let o = s + this.left.height, l = r + this.left.length + this.break, a = t == Ue.ByHeight ? e < o : e < l, h = a ? this.left.lineAt(e, t, n, s, r) : this.right.lineAt(e, t, n, o, l);
    if (this.break || (a ? h.to < l : h.from > l))
      return h;
    let c = t == Ue.ByPosNoHeight ? Ue.ByPosNoHeight : Ue.ByPos;
    return a ? h.join(this.right.lineAt(l, c, n, o, l)) : this.left.lineAt(l, c, n, s, r).join(h);
  }
  forEachLine(e, t, n, s, r, o) {
    let l = s + this.left.height, a = r + this.left.length + this.break;
    if (this.break)
      e < a && this.left.forEachLine(e, t, n, s, r, o), t >= a && this.right.forEachLine(e, t, n, l, a, o);
    else {
      let h = this.lineAt(a, Ue.ByPos, n, s, r);
      e < h.from && this.left.forEachLine(e, h.from - 1, n, s, r, o), h.to >= e && h.from <= t && o(h), t > h.to && this.right.forEachLine(h.to + 1, t, n, l, a, o);
    }
  }
  replace(e, t, n) {
    let s = this.left.length + this.break;
    if (t < s)
      return this.balanced(this.left.replace(e, t, n), this.right);
    if (e > this.left.length)
      return this.balanced(this.left, this.right.replace(e - s, t - s, n));
    let r = [];
    e > 0 && this.decomposeLeft(e, r);
    let o = r.length;
    for (let l of n)
      r.push(l);
    if (e > 0 && _u(r, o - 1), t < this.length) {
      let l = r.length;
      this.decomposeRight(t, r), _u(r, l);
    }
    return Lt.of(r);
  }
  decomposeLeft(e, t) {
    let n = this.left.length;
    if (e <= n)
      return this.left.decomposeLeft(e, t);
    t.push(this.left), this.break && (n++, e >= n && t.push(null)), e > n && this.right.decomposeLeft(e - n, t);
  }
  decomposeRight(e, t) {
    let n = this.left.length, s = n + this.break;
    if (e >= s)
      return this.right.decomposeRight(e - s, t);
    e < n && this.left.decomposeRight(e, t), this.break && e < s && t.push(null), t.push(this.right);
  }
  balanced(e, t) {
    return e.size > 2 * t.size || t.size > 2 * e.size ? Lt.of(this.break ? [e, null, t] : [e, t]) : (this.left = xl(this.left, e), this.right = xl(this.right, t), this.setHeight(e.height + t.height), this.outdated = e.outdated || t.outdated, this.size = e.size + t.size, this.length = e.length + this.break + t.length, this);
  }
  updateHeight(e, t = 0, n = !1, s) {
    let { left: r, right: o } = this, l = t + r.length + this.break, a = null;
    return s && s.from <= t + r.length && s.more ? a = r = r.updateHeight(e, t, n, s) : r.updateHeight(e, t, n), s && s.from <= l + o.length && s.more ? a = o = o.updateHeight(e, l, n, s) : o.updateHeight(e, l, n), a ? this.balanced(r, o) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
  }
  toString() {
    return this.left + (this.break ? " " : "-") + this.right;
  }
}
function _u(i, e) {
  let t, n;
  i[e] == null && (t = i[e - 1]) instanceof Qt && (n = i[e + 1]) instanceof Qt && i.splice(e - 1, 3, new Qt(t.length + 1 + n.length));
}
const Uw = 5;
class Bc {
  constructor(e, t) {
    this.pos = e, this.oracle = t, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = e;
  }
  get isCovered() {
    return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
  }
  span(e, t) {
    if (this.lineStart > -1) {
      let n = Math.min(t, this.lineEnd), s = this.nodes[this.nodes.length - 1];
      s instanceof ii ? s.length += n - this.pos : (n > this.pos || !this.isCovered) && this.nodes.push(new ii(n - this.pos, -1, 0)), this.writtenTo = n, t > n && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
    }
    this.pos = t;
  }
  point(e, t, n) {
    if (e < t || n.heightRelevant) {
      let s = n.widget ? n.widget.estimatedHeight : 0, r = n.widget ? n.widget.lineBreaks : 0;
      s < 0 && (s = this.oracle.lineHeight);
      let o = t - e;
      n.block ? this.addBlock(new FO(o, s, n)) : (o || r || s >= Uw) && this.addLineDeco(s, r, o);
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
    let n = new Qt(t - e);
    return this.oracle.doc.lineAt(e).to == t && (n.flags |= 4), n;
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
  addLineDeco(e, t, n) {
    let s = this.ensureLine();
    s.length += n, s.collapsed += n, s.widgetHeight = Math.max(s.widgetHeight, e), s.breaks += t, this.writtenTo = this.pos = this.pos + n;
  }
  finish(e) {
    let t = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
    this.lineStart > -1 && !(t instanceof ii) && !this.isCovered ? this.nodes.push(new ii(0, -1, 0)) : (this.writtenTo < this.pos || t == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
    let n = e;
    for (let s of this.nodes)
      s instanceof ii && s.updateHeight(this.oracle, n), n += s ? s.length : 1;
    return this.nodes;
  }
  // Always called with a region that on both sides either stretches
  // to a line break or the end of the document.
  // The returned array uses null to indicate line breaks, but never
  // starts or ends in a line break, or has multiple line breaks next
  // to each other.
  static build(e, t, n, s) {
    let r = new Bc(n, e);
    return Ie.spans(t, n, s, r, 0), r.finish(n);
  }
}
function Fw(i, e, t) {
  let n = new Hw();
  return Ie.compare(i, e, t, n, 0), n.changes;
}
class Hw {
  constructor() {
    this.changes = [];
  }
  compareRange() {
  }
  comparePoint(e, t, n, s) {
    (e < t || n && n.heightRelevant || s && s.heightRelevant) && js(e, t, this.changes, 5);
  }
}
function Kw(i, e) {
  let t = i.getBoundingClientRect(), n = i.ownerDocument, s = n.defaultView || window, r = Math.max(0, t.left), o = Math.min(s.innerWidth, t.right), l = Math.max(0, t.top), a = Math.min(s.innerHeight, t.bottom);
  for (let h = i.parentNode; h && h != n.body; )
    if (h.nodeType == 1) {
      let c = h, f = window.getComputedStyle(c);
      if ((c.scrollHeight > c.clientHeight || c.scrollWidth > c.clientWidth) && f.overflow != "visible") {
        let d = c.getBoundingClientRect();
        r = Math.max(r, d.left), o = Math.min(o, d.right), l = Math.max(l, d.top), a = Math.min(h == i.parentNode ? s.innerHeight : a, d.bottom);
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
function Jw(i) {
  let e = i.getBoundingClientRect(), t = i.ownerDocument.defaultView || window;
  return e.left < t.innerWidth && e.right > 0 && e.top < t.innerHeight && e.bottom > 0;
}
function ex(i, e) {
  let t = i.getBoundingClientRect();
  return {
    left: 0,
    right: t.right - t.left,
    top: e,
    bottom: t.bottom - (t.top + e)
  };
}
class La {
  constructor(e, t, n, s) {
    this.from = e, this.to = t, this.size = n, this.displaySize = s;
  }
  static same(e, t) {
    if (e.length != t.length)
      return !1;
    for (let n = 0; n < e.length; n++) {
      let s = e[n], r = t[n];
      if (s.from != r.from || s.to != r.to || s.size != r.size)
        return !1;
    }
    return !0;
  }
  draw(e, t) {
    return We.replace({
      widget: new tx(this.displaySize * (t ? e.scaleY : e.scaleX), t)
    }).range(this.from, this.to);
  }
}
class tx extends Or {
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
class Pu {
  constructor(e, t) {
    this.view = e, this.state = t, this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 }, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scaleX = 1, this.scaleY = 1, this.scrollOffset = 0, this.scrolledToBottom = !1, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = Tu, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = lt.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1;
    let n = t.facet(Yc).some((s) => typeof s != "function" && s.class == "cm-lineWrapping");
    this.heightOracle = new qw(n), this.stateDeco = Zu(t), this.heightMap = Lt.empty().applyChanges(this.stateDeco, Ae.empty, this.heightOracle.setDoc(t.doc), [new pi(0, 0, 0, t.doc.length)]);
    for (let s = 0; s < 2 && (this.viewport = this.getViewport(0, null), !!this.updateForViewport()); s++)
      ;
    this.updateViewportLines(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = We.set(this.lineGaps.map((s) => s.draw(this, !1))), this.scrollParent = e.scrollDOM, this.computeVisibleRanges();
  }
  updateForViewport() {
    let e = [this.viewport], { main: t } = this.state.selection;
    for (let n = 0; n <= 1; n++) {
      let s = n ? t.head : t.anchor;
      if (!e.some(({ from: r, to: o }) => s >= r && s <= o)) {
        let { from: r, to: o } = this.lineBlockAt(s);
        e.push(new Ro(r, o));
      }
    }
    return this.viewports = e.sort((n, s) => n.from - s.from), this.updateScaler();
  }
  updateScaler() {
    let e = this.scaler;
    return this.scaler = this.heightMap.height <= 7e6 ? Tu : new Gc(this.heightOracle, this.heightMap, this.viewports), e.eq(this.scaler) ? 0 : 2;
  }
  updateViewportLines() {
    this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (e) => {
      this.viewportLines.push(Er(e, this.scaler));
    });
  }
  update(e, t = null) {
    this.state = e.state;
    let n = this.stateDeco;
    this.stateDeco = Zu(this.state);
    let s = e.changedRanges, r = pi.extendWithRanges(s, Fw(n, this.stateDeco, e ? e.changes : mt.empty(this.state.doc.length))), o = this.heightMap.height, l = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollOffset);
    $u(), this.heightMap = this.heightMap.applyChanges(this.stateDeco, e.startState.doc, this.heightOracle.setDoc(this.state.doc), r), (this.heightMap.height != o || lr) && (e.flags |= 2), l ? (this.scrollAnchorPos = e.changes.mapPos(l.from, -1), this.scrollAnchorHeight = l.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = o);
    let a = r.length ? this.mapViewport(this.viewport, e.changes) : this.viewport;
    (t && (t.range.head < a.from || t.range.head > a.to) || !this.viewportIsAppropriate(a)) && (a = this.getViewport(0, t));
    let h = a.from != this.viewport.from || a.to != this.viewport.to;
    this.viewport = a, e.flags |= this.updateForViewport(), (h || !e.changes.empty || e.flags & 2) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, e.changes))), e.flags |= this.computeVisibleRanges(e.changes), t && (this.scrollTarget = t), !this.mustEnforceCursorAssoc && (e.selectionSet || e.focusChanged) && e.view.lineWrapping && e.state.selection.main.empty && e.state.selection.main.assoc && !e.state.facet(qy) && (this.mustEnforceCursorAssoc = !0);
  }
  measure() {
    let { view: e } = this, t = e.contentDOM, n = window.getComputedStyle(t), s = this.heightOracle, r = n.whiteSpace;
    this.defaultTextDirection = n.direction == "rtl" ? lt.RTL : lt.LTR;
    let o = this.heightOracle.mustRefreshForWrapping(r) || this.mustMeasureContent === "refresh", l = t.getBoundingClientRect(), a = o || this.mustMeasureContent || this.contentDOMHeight != l.height;
    this.contentDOMHeight = l.height, this.mustMeasureContent = !1;
    let h = 0, c = 0;
    if (l.width && l.height) {
      let { scaleX: E, scaleY: M } = uO(t, l);
      (E > 5e-3 && Math.abs(this.scaleX - E) > 5e-3 || M > 5e-3 && Math.abs(this.scaleY - M) > 5e-3) && (this.scaleX = E, this.scaleY = M, h |= 16, o = a = !0);
    }
    let f = (parseInt(n.paddingTop) || 0) * this.scaleY, d = (parseInt(n.paddingBottom) || 0) * this.scaleY;
    (this.paddingTop != f || this.paddingBottom != d) && (this.paddingTop = f, this.paddingBottom = d, h |= 18), this.editorWidth != e.scrollDOM.clientWidth && (s.lineWrapping && (a = !0), this.editorWidth = e.scrollDOM.clientWidth, h |= 16);
    let p = dO(this.view.contentDOM, !1).y;
    p != this.scrollParent && (this.scrollParent = p, this.scrollAnchorHeight = -1, this.scrollOffset = 0);
    let O = this.getScrollOffset();
    this.scrollOffset != O && (this.scrollAnchorHeight = -1, this.scrollOffset = O), this.scrolledToBottom = OO(this.scrollParent || e.win);
    let g = (this.printing ? ex : Kw)(t, this.paddingTop), m = g.top - this.pixelViewport.top, v = g.bottom - this.pixelViewport.bottom;
    this.pixelViewport = g;
    let y = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
    if (y != this.inView && (this.inView = y, y && (a = !0)), !this.inView && !this.scrollTarget && !Jw(e.dom))
      return 0;
    let $ = l.width;
    if ((this.contentDOMWidth != $ || this.editorHeight != e.scrollDOM.clientHeight) && (this.contentDOMWidth = l.width, this.editorHeight = e.scrollDOM.clientHeight, h |= 16), a) {
      let E = e.docView.measureVisibleLineHeights(this.viewport);
      if (s.mustRefreshForHeights(E) && (o = !0), o || s.lineWrapping && Math.abs($ - this.contentDOMWidth) > s.charWidth) {
        let { lineHeight: M, charWidth: A, textHeight: Y } = e.docView.measureTextSize();
        o = M > 0 && s.refresh(r, M, A, Y, Math.max(5, $ / A), E), o && (e.docView.minWidth = 0, h |= 16);
      }
      m > 0 && v > 0 ? c = Math.max(m, v) : m < 0 && v < 0 && (c = Math.min(m, v)), $u();
      for (let M of this.viewports) {
        let A = M.from == this.viewport.from ? E : e.docView.measureVisibleLineHeights(M);
        this.heightMap = (o ? Lt.empty().applyChanges(this.stateDeco, Ae.empty, this.heightOracle, [new pi(0, 0, 0, e.state.doc.length)]) : this.heightMap).updateHeight(s, 0, o, new Vw(M.from, A));
      }
      lr && (h |= 2);
    }
    let Z = !this.viewportIsAppropriate(this.viewport, c) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
    return Z && (h & 2 && (h |= this.updateScaler()), this.viewport = this.getViewport(c, this.scrollTarget), h |= this.updateForViewport()), (h & 2 || Z) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(o ? [] : this.lineGaps, e)), h |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, e.docView.enforceCursorAssoc()), h;
  }
  get visibleTop() {
    return this.scaler.fromDOM(this.pixelViewport.top);
  }
  get visibleBottom() {
    return this.scaler.fromDOM(this.pixelViewport.bottom);
  }
  getViewport(e, t) {
    let n = 0.5 - Math.max(-0.5, Math.min(0.5, e / 1e3 / 2)), s = this.heightMap, r = this.heightOracle, { visibleTop: o, visibleBottom: l } = this, a = new Ro(s.lineAt(o - n * 1e3, Ue.ByHeight, r, 0, 0).from, s.lineAt(l + (1 - n) * 1e3, Ue.ByHeight, r, 0, 0).to);
    if (t) {
      let { head: h } = t.range;
      if (h < a.from || h > a.to) {
        let c = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), f = s.lineAt(h, Ue.ByPos, r, 0, 0), d;
        t.y == "center" ? d = (f.top + f.bottom) / 2 - c / 2 : t.y == "start" || t.y == "nearest" && h < a.from ? d = f.top : d = f.bottom - c, a = new Ro(s.lineAt(d - 1e3 / 2, Ue.ByHeight, r, 0, 0).from, s.lineAt(d + c + 1e3 / 2, Ue.ByHeight, r, 0, 0).to);
      }
    }
    return a;
  }
  mapViewport(e, t) {
    let n = t.mapPos(e.from, -1), s = t.mapPos(e.to, 1);
    return new Ro(this.heightMap.lineAt(n, Ue.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(s, Ue.ByPos, this.heightOracle, 0, 0).to);
  }
  // Checks if a given viewport covers the visible part of the
  // document and not too much beyond that.
  viewportIsAppropriate({ from: e, to: t }, n = 0) {
    if (!this.inView)
      return !0;
    let { top: s } = this.heightMap.lineAt(e, Ue.ByPos, this.heightOracle, 0, 0), { bottom: r } = this.heightMap.lineAt(t, Ue.ByPos, this.heightOracle, 0, 0), { visibleTop: o, visibleBottom: l } = this;
    return (e == 0 || s <= o - Math.max(10, Math.min(
      -n,
      250
      /* VP.MaxCoverMargin */
    ))) && (t == this.state.doc.length || r >= l + Math.max(10, Math.min(
      n,
      250
      /* VP.MaxCoverMargin */
    ))) && s > o - 2 * 1e3 && r < l + 2 * 1e3;
  }
  mapLineGaps(e, t) {
    if (!e.length || t.empty)
      return e;
    let n = [];
    for (let s of e)
      t.touchesRange(s.from, s.to) || n.push(new La(t.mapPos(s.from), t.mapPos(s.to), s.size, s.displaySize));
    return n;
  }
  // Computes positions in the viewport where the start or end of a
  // line should be hidden, trying to reuse existing line gaps when
  // appropriate to avoid unneccesary redraws.
  // Uses crude character-counting for the positioning and sizing,
  // since actual DOM coordinates aren't always available and
  // predictable. Relies on generous margins (see LG.Margin) to hide
  // the artifacts this might produce from the user.
  ensureLineGaps(e, t) {
    let n = this.heightOracle.lineWrapping, s = n ? 1e4 : 2e3, r = s >> 1, o = s << 1;
    if (this.defaultTextDirection != lt.LTR && !n)
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
      let m = nx(e, (v) => v.from >= d.from && v.to <= d.to && Math.abs(v.from - c) < r && Math.abs(v.to - f) < r && !g.some((y) => v.from < y && v.to > y));
      if (!m) {
        if (f < d.to && t && n && t.visibleRanges.some(($) => $.from <= f && $.to >= f)) {
          let $ = t.moveToLineBoundary(B.cursor(f), !1, !0).head;
          $ > c && (f = $);
        }
        let v = this.gapSize(d, c, f, p), y = n || v < 2e6 ? v : 2e6;
        m = new La(c, f, v, y);
      }
      l.push(m);
    }, h = (c) => {
      if (c.length < o || c.type != yi.Text)
        return;
      let f = ix(c.from, c.to, this.stateDeco);
      if (f.total < o)
        return;
      let d = this.scrollTarget ? this.scrollTarget.range.head : null, p, O;
      if (n) {
        let g = s / this.heightOracle.lineLength * this.heightOracle.lineHeight, m, v;
        if (d != null) {
          let y = Xo(f, d), $ = ((this.visibleBottom - this.visibleTop) / 2 + g) / c.height;
          m = y - $, v = y + $;
        } else
          m = (this.visibleTop - c.top - g) / c.height, v = (this.visibleBottom - c.top + g) / c.height;
        p = Mo(f, m), O = Mo(f, v);
      } else {
        let g = f.total * this.heightOracle.charWidth, m = s * this.heightOracle.charWidth, v = 0;
        if (g > 2e6)
          for (let M of e)
            M.from >= c.from && M.from < c.to && M.size != M.displaySize && M.from * this.heightOracle.charWidth + v < this.pixelViewport.left && (v = M.size - M.displaySize);
        let y = this.pixelViewport.left + v, $ = this.pixelViewport.right + v, Z, E;
        if (d != null) {
          let M = Xo(f, d), A = (($ - y) / 2 + m) / g;
          Z = M - A, E = M + A;
        } else
          Z = (y - m) / g, E = ($ + m) / g;
        p = Mo(f, Z), O = Mo(f, E);
      }
      p > c.from && a(c.from, p, c, f), O < c.to && a(O, c.to, c, f);
    };
    for (let c of this.viewportLines)
      Array.isArray(c.type) ? c.type.forEach(h) : h(c);
    return l;
  }
  gapSize(e, t, n, s) {
    let r = Xo(s, n) - Xo(s, t);
    return this.heightOracle.lineWrapping ? e.height * r : s.total * this.heightOracle.charWidth * r;
  }
  updateLineGaps(e) {
    La.same(e, this.lineGaps) || (this.lineGaps = e, this.lineGapDeco = We.set(e.map((t) => t.draw(this, this.heightOracle.lineWrapping))));
  }
  computeVisibleRanges(e) {
    let t = this.stateDeco;
    this.lineGaps.length && (t = t.concat(this.lineGapDeco));
    let n = [];
    Ie.spans(t, this.viewport.from, this.viewport.to, {
      span(r, o) {
        n.push({ from: r, to: o });
      },
      point() {
      }
    }, 20);
    let s = 0;
    if (n.length != this.visibleRanges.length)
      s = 12;
    else
      for (let r = 0; r < n.length && !(s & 8); r++) {
        let o = this.visibleRanges[r], l = n[r];
        (o.from != l.from || o.to != l.to) && (s |= 4, e && e.mapPos(o.from, -1) == l.from && e.mapPos(o.to, 1) == l.to || (s |= 8));
      }
    return this.visibleRanges = n, s;
  }
  lineBlockAt(e) {
    return e >= this.viewport.from && e <= this.viewport.to && this.viewportLines.find((t) => t.from <= e && t.to >= e) || Er(this.heightMap.lineAt(e, Ue.ByPos, this.heightOracle, 0, 0), this.scaler);
  }
  lineBlockAtHeight(e) {
    return e >= this.viewportLines[0].top && e <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((t) => t.top <= e && t.bottom >= e) || Er(this.heightMap.lineAt(this.scaler.fromDOM(e), Ue.ByHeight, this.heightOracle, 0, 0), this.scaler);
  }
  getScrollOffset() {
    return (this.scrollParent == this.view.scrollDOM ? this.scrollParent.scrollTop : (this.scrollParent ? this.scrollParent.getBoundingClientRect().top : 0) - this.view.contentDOM.getBoundingClientRect().top) * this.scaleY;
  }
  scrollAnchorAt(e) {
    let t = this.lineBlockAtHeight(e + 8);
    return t.from >= this.viewport.from || this.viewportLines[0].top - e > 200 ? t : this.viewportLines[0];
  }
  elementAtHeight(e) {
    return Er(this.heightMap.blockAt(this.scaler.fromDOM(e), this.heightOracle, 0, 0), this.scaler);
  }
  get docHeight() {
    return this.scaler.toDOM(this.heightMap.height);
  }
  get contentHeight() {
    return this.docHeight + this.paddingTop + this.paddingBottom;
  }
}
class Ro {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
function ix(i, e, t) {
  let n = [], s = i, r = 0;
  return Ie.spans(t, i, e, {
    span() {
    },
    point(o, l) {
      o > s && (n.push({ from: s, to: o }), r += o - s), s = l;
    }
  }, 20), s < e && (n.push({ from: s, to: e }), r += e - s), { total: r, ranges: n };
}
function Mo({ total: i, ranges: e }, t) {
  if (t <= 0)
    return e[0].from;
  if (t >= 1)
    return e[e.length - 1].to;
  let n = Math.floor(i * t);
  for (let s = 0; ; s++) {
    let { from: r, to: o } = e[s], l = o - r;
    if (n <= l)
      return r + n;
    n -= l;
  }
}
function Xo(i, e) {
  let t = 0;
  for (let { from: n, to: s } of i.ranges) {
    if (e <= s) {
      t += e - n;
      break;
    }
    t += s - n;
  }
  return t / i.total;
}
function nx(i, e) {
  for (let t of i)
    if (e(t))
      return t;
}
const Tu = {
  toDOM(i) {
    return i;
  },
  fromDOM(i) {
    return i;
  },
  scale: 1,
  eq(i) {
    return i == this;
  }
};
function Zu(i) {
  let e = i.facet(Kl).filter((n) => typeof n != "function"), t = i.facet(Wc).filter((n) => typeof n != "function");
  return t.length && e.push(Ie.join(t)), e;
}
class Gc {
  constructor(e, t, n) {
    let s = 0, r = 0, o = 0;
    this.viewports = n.map(({ from: l, to: a }) => {
      let h = t.lineAt(l, Ue.ByPos, e, 0, 0).top, c = t.lineAt(a, Ue.ByPos, e, 0, 0).bottom;
      return s += c - h, { from: l, to: a, top: h, bottom: c, domTop: 0, domBottom: 0 };
    }), this.scale = (7e6 - s) / (t.height - s);
    for (let l of this.viewports)
      l.domTop = o + (l.top - r) * this.scale, o = l.domBottom = l.domTop + (l.bottom - l.top), r = l.bottom;
  }
  toDOM(e) {
    for (let t = 0, n = 0, s = 0; ; t++) {
      let r = t < this.viewports.length ? this.viewports[t] : null;
      if (!r || e < r.top)
        return s + (e - n) * this.scale;
      if (e <= r.bottom)
        return r.domTop + (e - r.top);
      n = r.bottom, s = r.domBottom;
    }
  }
  fromDOM(e) {
    for (let t = 0, n = 0, s = 0; ; t++) {
      let r = t < this.viewports.length ? this.viewports[t] : null;
      if (!r || e < r.domTop)
        return n + (e - s) / this.scale;
      if (e <= r.domBottom)
        return r.top + (e - r.domTop);
      n = r.bottom, s = r.domBottom;
    }
  }
  eq(e) {
    return e instanceof Gc ? this.scale == e.scale && this.viewports.length == e.viewports.length && this.viewports.every((t, n) => t.from == e.viewports[n].from && t.to == e.viewports[n].to) : !1;
  }
}
function Er(i, e) {
  if (e.scale == 1)
    return i;
  let t = e.toDOM(i.top), n = e.toDOM(i.bottom);
  return new Pi(i.from, i.length, t, n - t, Array.isArray(i._content) ? i._content.map((s) => Er(s, e)) : i._content);
}
const jo = /* @__PURE__ */ me.define({ combine: (i) => i.join(" ") }), Bh = /* @__PURE__ */ me.define({ combine: (i) => i.indexOf(!0) > -1 }), Gh = /* @__PURE__ */ sr.newName(), HO = /* @__PURE__ */ sr.newName(), KO = /* @__PURE__ */ sr.newName(), JO = { "&light": "." + HO, "&dark": "." + KO };
function Uh(i, e, t) {
  return new sr(e, {
    finish(n) {
      return /&/.test(n) ? n.replace(/&\w*/, (s) => {
        if (s == "&")
          return i;
        if (!t || !t[s])
          throw new RangeError(`Unsupported selector: ${s}`);
        return t[s];
      }) : i + " " + n;
    }
  });
}
const sx = /* @__PURE__ */ Uh("." + Gh, {
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
}, JO), rx = {
  childList: !0,
  characterData: !0,
  subtree: !0,
  attributes: !0,
  characterDataOldValue: !0
}, Ia = re.ie && re.ie_version <= 11;
class ox {
  constructor(e) {
    this.view = e, this.active = !1, this.editContext = null, this.selectionRange = new Ay(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.printQuery = null, this.parentCheck = -1, this.dom = e.contentDOM, this.observer = new MutationObserver((t) => {
      for (let n of t)
        this.queue.push(n);
      (re.ie && re.ie_version <= 11 || re.ios && e.composing) && t.some((n) => n.type == "childList" && n.removedNodes.length || n.type == "characterData" && n.oldValue.length > n.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), window.EditContext && re.android && e.constructor.EDIT_CONTEXT !== !1 && // Chrome <126 doesn't support inverted selections in edit context (#1392)
    !(re.chrome && re.chrome_version < 126) && (this.editContext = new ax(e), e.state.facet(cn) && (e.contentDOM.editContext = this.editContext.editContext)), Ia && (this.onCharData = (t) => {
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
    if (this.gapIntersection && (e.length != this.gaps.length || this.gaps.some((t, n) => t != e[n]))) {
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
    let { view: n } = this, s = this.selectionRange;
    if (n.state.facet(cn) ? n.root.activeElement != this.dom : !Nr(this.dom, s))
      return;
    let r = s.anchorNode && n.docView.tile.nearest(s.anchorNode);
    if (r && r.isWidget() && r.widget.ignoreEvent(e)) {
      t || (this.selectionChanged = !1);
      return;
    }
    (re.ie && re.ie_version <= 11 || re.android && re.chrome) && !n.state.selection.main.empty && // (Selection.isCollapsed isn't reliable on IE)
    s.focusNode && Wr(s.focusNode, s.focusOffset, s.anchorNode, s.anchorOffset) ? this.flushSoon() : this.flush(!1);
  }
  readSelectionRange() {
    let { view: e } = this, t = eo(e.root);
    if (!t)
      return !1;
    let n = re.safari && e.root.nodeType == 11 && e.root.activeElement == this.dom && lx(this.view, t) || t;
    if (!n || this.selectionRange.eq(n))
      return !1;
    let s = Nr(this.dom, n);
    return s && !this.selectionChanged && e.inputState.lastFocusTime > Date.now() - 200 && e.inputState.lastTouchTime < Date.now() - 300 && My(this.dom, n) ? (this.view.inputState.lastFocusTime = 0, e.docView.updateSelection(), !1) : (this.selectionRange.setRange(n), s && (this.selectionChanged = !0), !0);
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
    for (let n = this.dom; n; )
      if (n.nodeType == 1)
        !t && e < this.scrollTargets.length && this.scrollTargets[e] == n ? e++ : t || (t = this.scrollTargets.slice(0, e)), t && t.push(n), n = n.assignedSlot || n.parentNode;
      else if (n.nodeType == 11)
        n = n.host;
      else
        break;
    if (e < this.scrollTargets.length && !t && (t = this.scrollTargets.slice(0, e)), t) {
      for (let n of this.scrollTargets)
        n.removeEventListener("scroll", this.onScroll);
      for (let n of this.scrollTargets = t)
        n.addEventListener("scroll", this.onScroll);
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
    this.active || (this.observer.observe(this.dom, rx), Ia && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = !0);
  }
  stop() {
    this.active && (this.active = !1, this.observer.disconnect(), Ia && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
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
    var n;
    if (!this.delayedAndroidKey) {
      let s = () => {
        let r = this.delayedAndroidKey;
        r && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = r.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && r.force && Ls(this.dom, r.key, r.keyCode));
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
      force: this.lastChange < Date.now() - 50 || !!(!((n = this.delayedAndroidKey) === null || n === void 0) && n.force)
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
    let t = -1, n = -1, s = !1;
    for (let r of e) {
      let o = this.readMutation(r);
      o && (o.typeOver && (s = !0), t == -1 ? { from: t, to: n } = o : (t = Math.min(o.from, t), n = Math.max(o.to, n)));
    }
    return { from: t, to: n, typeOver: s };
  }
  readChange() {
    let { from: e, to: t, typeOver: n } = this.processRecords(), s = this.selectionChanged && Nr(this.dom, this.selectionRange);
    if (e < 0 && !s)
      return null;
    e > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1;
    let r = new kw(this.view, e, t, n);
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
    let n = this.view.state, s = DO(this.view, t);
    return this.view.state == n && (t.domChanged || t.newSel && !wl(this.view.state.selection, t.newSel.main)) && this.view.update([]), s;
  }
  readMutation(e) {
    let t = this.view.docView.tile.nearest(e.target);
    if (!t || t.isWidget())
      return null;
    if (t.markDirty(e.type == "attributes"), e.type == "childList") {
      let n = Cu(t, e.previousSibling || e.target.previousSibling, -1), s = Cu(t, e.nextSibling || e.target.nextSibling, 1);
      return {
        from: n ? t.posAfter(n) : t.posAtStart,
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
    this.editContext && (this.editContext.update(e), e.startState.facet(cn) != e.state.facet(cn) && (e.view.contentDOM.editContext = e.state.facet(cn) ? this.editContext.editContext : null));
  }
  destroy() {
    var e, t, n;
    this.stop(), (e = this.intersection) === null || e === void 0 || e.disconnect(), (t = this.gapIntersection) === null || t === void 0 || t.disconnect(), (n = this.resizeScroll) === null || n === void 0 || n.disconnect();
    for (let s of this.scrollTargets)
      s.removeEventListener("scroll", this.onScroll);
    this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey), this.editContext && (this.view.contentDOM.editContext = null, this.editContext.destroy());
  }
}
function Cu(i, e, t) {
  for (; e; ) {
    let n = at.get(e);
    if (n && n.parent == i)
      return n;
    let s = e.parentNode;
    e = s != i.dom ? s : t > 0 ? e.nextSibling : e.previousSibling;
  }
  return null;
}
function Eu(i, e) {
  let t = e.startContainer, n = e.startOffset, s = e.endContainer, r = e.endOffset, o = i.docView.domAtPos(i.state.selection.main.anchor, 1);
  return Wr(o.node, o.offset, s, r) && ([t, n, s, r] = [s, r, t, n]), { anchorNode: t, anchorOffset: n, focusNode: s, focusOffset: r };
}
function lx(i, e) {
  if (e.getComposedRanges) {
    let s = e.getComposedRanges(i.root)[0];
    if (s)
      return Eu(i, s);
  }
  let t = null;
  function n(s) {
    s.preventDefault(), s.stopImmediatePropagation(), t = s.getTargetRanges()[0];
  }
  return i.contentDOM.addEventListener("beforeinput", n, !0), i.dom.ownerDocument.execCommand("indent"), i.contentDOM.removeEventListener("beforeinput", n, !0), t ? Eu(i, t) : null;
}
class ax {
  constructor(e) {
    this.from = 0, this.to = 0, this.pendingContextChange = null, this.handlers = /* @__PURE__ */ Object.create(null), this.composing = null, this.resetRange(e.state);
    let t = this.editContext = new window.EditContext({
      text: e.state.doc.sliceString(this.from, this.to),
      selectionStart: this.toContextPos(Math.max(this.from, Math.min(this.to, e.state.selection.main.anchor))),
      selectionEnd: this.toContextPos(e.state.selection.main.head)
    });
    this.handlers.textupdate = (n) => {
      let s = e.state.selection.main, { anchor: r, head: o } = s, l = this.toEditorPos(n.updateRangeStart), a = this.toEditorPos(n.updateRangeEnd);
      e.inputState.composing >= 0 && !this.composing && (this.composing = { contextBase: n.updateRangeStart, editorBase: l, drifted: !1 });
      let h = a - l > n.text.length;
      l == this.from && r < this.from ? l = r : a == this.to && r > this.to && (a = r);
      let c = zO(e.state.sliceDoc(l, a), n.text, (h ? s.from : s.to) - l, h ? "end" : null);
      if (!c) {
        let d = B.single(this.toEditorPos(n.selectionStart), this.toEditorPos(n.selectionEnd));
        wl(d, s) || e.dispatch({ selection: d, userEvent: "select" });
        return;
      }
      let f = {
        from: c.from + l,
        to: c.toA + l,
        insert: Ae.of(n.text.slice(c.from, c.toB).split(`
`))
      };
      if ((re.mac || re.android) && f.from == o - 1 && /^\. ?$/.test(n.text) && e.contentDOM.getAttribute("autocorrect") == "off" && (f = { from: l, to: a, insert: Ae.of([n.text.replace(".", " ")]) }), this.pendingContextChange = f, !e.state.readOnly) {
        let d = this.to - this.from + (f.to - f.from + f.insert.length);
        Vc(e, f, B.single(this.toEditorPos(n.selectionStart, d), this.toEditorPos(n.selectionEnd, d)));
      }
      this.pendingContextChange && (this.revertPending(e.state), this.setSelection(e.state)), f.from < f.to && !f.insert.length && e.inputState.composing >= 0 && !/[\\p{Alphabetic}\\p{Number}_]/.test(t.text.slice(Math.max(0, n.updateRangeStart - 1), Math.min(t.text.length, n.updateRangeStart + 1))) && this.handlers.compositionend(n);
    }, this.handlers.characterboundsupdate = (n) => {
      let s = [], r = null;
      for (let o = this.toEditorPos(n.rangeStart), l = this.toEditorPos(n.rangeEnd); o < l; o++) {
        let a = e.coordsForChar(o);
        r = a && new DOMRect(a.left, a.top, a.right - a.left, a.bottom - a.top) || r || new DOMRect(), s.push(r);
      }
      t.updateCharacterBounds(n.rangeStart, s);
    }, this.handlers.textformatupdate = (n) => {
      let s = [];
      for (let r of n.getTextFormats()) {
        let o = r.underlineStyle, l = r.underlineThickness;
        if (!/none/i.test(o) && !/none/i.test(l)) {
          let a = this.toEditorPos(r.rangeStart), h = this.toEditorPos(r.rangeEnd);
          if (a < h) {
            let c = `text-decoration: underline ${/^[a-z]/.test(o) ? o + " " : o == "Dashed" ? "dashed " : o == "Squiggle" ? "wavy " : ""}${/thin/i.test(l) ? 1 : 2}px`;
            s.push(We.mark({ attributes: { style: c } }).range(a, h));
          }
        }
      }
      e.dispatch({ effects: CO.of(We.set(s)) });
    }, this.handlers.compositionstart = () => {
      e.inputState.composing < 0 && (e.inputState.composing = 0, e.inputState.compositionFirstChange = !0);
    }, this.handlers.compositionend = () => {
      if (e.inputState.composing = -1, e.inputState.compositionFirstChange = null, this.composing) {
        let { drifted: n } = this.composing;
        this.composing = null, n && this.reset(e.state);
      }
    };
    for (let n in this.handlers)
      t.addEventListener(n, this.handlers[n]);
    this.measureReq = { read: (n) => {
      let s = eo(n.root);
      s && s.rangeCount && this.editContext.updateSelectionBounds(s.getRangeAt(0).getBoundingClientRect());
    } };
  }
  applyEdits(e) {
    let t = 0, n = !1, s = this.pendingContextChange;
    return e.changes.iterChanges((r, o, l, a, h) => {
      if (n)
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
          n = !0;
          return;
        }
        this.editContext.updateText(this.toContextPos(r), this.toContextPos(o), h.toString()), this.to += c;
      }
      t += c;
    }), s && !n && this.revertPending(e.state), !n;
  }
  update(e) {
    let t = this.pendingContextChange, n = e.startState.selection.main;
    this.composing && (this.composing.drifted || !e.changes.touchesRange(n.from, n.to) && e.transactions.some((s) => !s.isUserEvent("input.type") && s.changes.touchesRange(this.from, this.to))) ? (this.composing.drifted = !0, this.composing.editorBase = e.changes.mapPos(this.composing.editorBase)) : !this.applyEdits(e) || !this.rangeIsValid(e.state) ? (this.pendingContextChange = null, this.reset(e.state)) : (e.docChanged || e.selectionSet || t) && this.setSelection(e.state), (e.geometryChanged || e.docChanged || e.selectionSet) && e.view.requestMeasure(this.measureReq);
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
    let { main: t } = e.selection, n = this.toContextPos(Math.max(this.from, Math.min(this.to, t.anchor))), s = this.toContextPos(t.head);
    (this.editContext.selectionStart != n || this.editContext.selectionEnd != s) && this.editContext.updateSelection(n, s);
  }
  rangeIsValid(e) {
    let { head: t } = e.selection.main;
    return !(this.from > 0 && t - this.from < 500 || this.to < e.doc.length && this.to - t < 500 || this.to - this.from > 1e4 * 3);
  }
  toEditorPos(e, t = this.to - this.from) {
    e = Math.min(e, t);
    let n = this.composing;
    return n && n.drifted ? n.editorBase + (e - n.contextBase) : e + this.from;
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
    let { dispatch: n } = e;
    this.dispatchTransactions = e.dispatchTransactions || n && ((s) => s.forEach((r) => n(r, this))) || ((s) => this.update(s)), this.dispatch = this.dispatch.bind(this), this._root = e.root || Ry(e.parent) || document, this.viewState = new Pu(this, e.state || Xe.create(e)), e.scrollTo && e.scrollTo.is(Co) && (this.viewState.scrollTarget = e.scrollTo.value.clip(this.viewState.state)), this.plugins = this.state.facet(Cs).map((s) => new Aa(s));
    for (let s of this.plugins)
      s.update(this);
    this.observer = new ox(this), this.inputState = new Pw(this), this.inputState.ensureHandlers(this.plugins), this.docView = new Ou(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), !((t = document.fonts) === null || t === void 0) && t.ready && document.fonts.ready.then(() => {
      this.viewState.mustMeasureContent = "refresh", this.requestMeasure();
    });
  }
  dispatch(...e) {
    let t = e.length == 1 && e[0] instanceof Ot ? e : e.length == 1 && Array.isArray(e[0]) ? e[0] : [this.state.update(...e)];
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
    let t = !1, n = !1, s, r = this.state;
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
    e.some((d) => d.annotation(BO)) ? (this.inputState.notifiedFocused = o, l = 1) : o != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = o, a = GO(r, o), a || (l = 1));
    let h = this.observer.delayedAndroidKey, c = null;
    if (h ? (this.observer.clearDelayedAndroidKey(), c = this.observer.readChange(), (c && !this.state.doc.eq(r.doc) || !this.state.selection.eq(r.selection)) && (c = null)) : this.observer.clear(), r.facet(Xe.phrases) != this.state.facet(Xe.phrases))
      return this.setState(r);
    s = vl.create(this, r, e), s.flags |= l;
    let f = this.viewState.scrollTarget;
    try {
      this.updateState = 2;
      for (let d of e) {
        if (f && (f = f.map(d.changes)), d.scrollIntoView) {
          let { main: p } = d.state.selection, { x: O, y: g } = this.state.facet(ge.cursorScrollMargin);
          f = new Is(p.empty ? p : B.cursor(p.head, p.head > p.anchor ? -1 : 1), "nearest", "nearest", g, O);
        }
        for (let p of d.effects)
          p.is(Co) && (f = p.value.clip(this.state));
      }
      this.viewState.update(s, f), this.bidiCache = Sl.update(this.bidiCache, s.changes), s.empty || (this.updatePlugins(s), this.inputState.update(s)), t = this.docView.update(s), this.state.facet(Cr) != this.styleModules && this.mountStyles(), n = this.updateAttrs(), this.showAnnouncements(e), this.docView.updateSelection(t, e.some((d) => d.isUserEvent("select.pointer")));
    } finally {
      this.updateState = 0;
    }
    if (s.startState.facet(jo) != s.state.facet(jo) && (this.viewState.mustMeasureContent = !0), (t || n || f || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), t && this.docViewUpdate(), !s.empty)
      for (let d of this.state.facet(Yh))
        try {
          d(s);
        } catch (p) {
          ni(this.state, p, "update listener");
        }
    (a || c) && Promise.resolve().then(() => {
      a && this.state == a.startState && this.dispatch(a), c && !DO(this, c) && h.force && Ls(this.contentDOM, h.key, h.keyCode);
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
      for (let n of this.plugins)
        n.destroy(this);
      this.viewState = new Pu(this, e), this.plugins = e.facet(Cs).map((n) => new Aa(n)), this.pluginMap.clear();
      for (let n of this.plugins)
        n.update(this);
      this.docView.destroy(), this.docView = new Ou(this), this.inputState.ensureHandlers(this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
    } finally {
      this.updateState = 0;
    }
    t && this.focus(), this.requestMeasure();
  }
  updatePlugins(e) {
    let t = e.startState.facet(Cs), n = e.state.facet(Cs);
    if (t != n) {
      let s = [];
      for (let r of n) {
        let o = t.indexOf(r);
        if (o < 0)
          s.push(new Aa(r));
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
    t != n && this.inputState.ensureHandlers(this.plugins);
  }
  docViewUpdate() {
    for (let e of this.plugins) {
      let t = e.value;
      if (t && t.docViewUpdate)
        try {
          t.docViewUpdate(this);
        } catch (n) {
          ni(this.state, n, "doc view update listener");
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
    let t = null, n = this.viewState.scrollParent, s = this.viewState.getScrollOffset(), { scrollAnchorPos: r, scrollAnchorHeight: o } = this.viewState;
    Math.abs(s - this.viewState.scrollOffset) > 1 && (o = -1), this.viewState.scrollAnchorHeight = -1;
    try {
      for (let l = 0; ; l++) {
        if (o < 0)
          if (OO(n || this.win))
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
            return ni(this.state, O), Au;
          }
        }), f = vl.create(this, this.state, []), d = !1;
        f.flags |= a, t ? t.flags |= a : t = f, this.updateState = 2, f.empty || (this.updatePlugins(f), this.inputState.update(f), this.updateAttrs(), d = this.docView.update(f), d && this.docViewUpdate());
        for (let p = 0; p < h.length; p++)
          if (c[p] != Au)
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
              if ((O > 1 || O < -1) && !(re.ios && this.inputState.lastIOSMomentumScroll > Date.now() - 100) && (n == this.scrollDOM || this.hasFocus || Math.max(this.inputState.lastWheelEvent, this.inputState.lastTouchTime) > Date.now() - 100)) {
                s = s + O, n ? n.scrollTop += O : this.win.scrollBy(0, O), o = -1;
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
      for (let l of this.state.facet(Yh))
        l(t);
  }
  /**
  Get the CSS classes for the currently active editor themes.
  */
  get themeClasses() {
    return Gh + " " + (this.state.facet(Bh) ? KO : HO) + " " + this.state.facet(jo);
  }
  updateAttrs() {
    let e = Ru(this, EO, {
      class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
    }), t = {
      spellcheck: "false",
      autocorrect: "off",
      autocapitalize: "off",
      writingsuggestions: "false",
      translate: "no",
      contenteditable: this.state.facet(cn) ? "true" : "false",
      class: "cm-content",
      style: `${re.tabSize}: ${this.state.tabSize}`,
      role: "textbox",
      "aria-multiline": "true"
    };
    this.state.readOnly && (t["aria-readonly"] = "true"), Ru(this, Yc, t);
    let n = this.observer.ignore(() => {
      let s = hu(this.contentDOM, this.contentAttrs, t), r = hu(this.dom, this.editorAttrs, e);
      return s || r;
    });
    return this.editorAttrs = e, this.contentAttrs = t, n;
  }
  showAnnouncements(e) {
    let t = !0;
    for (let n of e)
      for (let s of n.effects)
        if (s.is(ge.announce)) {
          t && (this.announceDOM.textContent = ""), t = !1;
          let r = this.announceDOM.appendChild(document.createElement("div"));
          r.textContent = s.value;
        }
  }
  mountStyles() {
    this.styleModules = this.state.facet(Cr);
    let e = this.state.facet(ge.cspNonce);
    sr.mount(this.root, this.styleModules.concat(sx).reverse(), e ? { nonce: e } : void 0);
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
    return (t === void 0 || t && t.plugin != e) && this.pluginMap.set(e, t = this.plugins.find((n) => n.plugin == e) || null), t && t.update(this).value;
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
  moveByChar(e, t, n) {
    return ja(this, e, gu(this, e, t, n));
  }
  /**
  Move a cursor position across the next group of either
  [letters](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) or non-letter
  non-whitespace characters.
  */
  moveByGroup(e, t) {
    return ja(this, e, gu(this, e, t, (n) => vw(this, e.head, n)));
  }
  /**
  Get the cursor position visually at the start or end of a line.
  Note that this may differ from the _logical_ position at its
  start or end (which is simply at `line.from`/`line.to`) if text
  at the start or end goes against the line's base text direction.
  */
  visualLineSide(e, t) {
    let n = this.bidiSpans(e), s = this.textDirectionAt(e.from), r = n[t ? n.length - 1 : 0];
    return B.cursor(r.side(t, s) + e.from, r.forward(!t, s) ? 1 : -1);
  }
  /**
  Move to the next line boundary in the given direction. If
  `includeWrap` is true, line wrapping is on, and there is a
  further wrap point on the current line, the wrap point will be
  returned. Otherwise this function will return the start or end
  of the line.
  */
  moveToLineBoundary(e, t, n = !0) {
    return mw(this, e, t, n);
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
  moveVertically(e, t, n) {
    return ja(this, e, bw(this, e, t, n));
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
    let n = qh(this, e, t);
    return n && n.pos;
  }
  posAndSideAtCoords(e, t = !0) {
    return this.readMeasured(), qh(this, e, t);
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
    let n = this.state.doc.lineAt(e), s = this.bidiSpans(n), r = s[Gi.find(s, e - n.from, -1, t)];
    return this.docView.coordsAt(e, t, r.dir == lt.RTL);
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
    return !this.state.facet(TO) || e < this.viewport.from || e > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(e));
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
    if (e.length > hx)
      return wO(e.length);
    let t = this.textDirectionAt(e.from), n;
    for (let r of this.bidiCache)
      if (r.from == e.from && r.dir == t && (r.fresh || yO(r.isolates, n = uu(this, e))))
        return r.order;
    n || (n = uu(this, e));
    let s = Ny(e.text, t, n);
    return this.bidiCache.push(new Sl(e.from, e.to, t, n, !0, s)), s;
  }
  /**
  Check whether the editor has focus.
  */
  get hasFocus() {
    var e;
    return (this.dom.ownerDocument.hasFocus() || re.safari && ((e = this.inputState) === null || e === void 0 ? void 0 : e.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
  }
  /**
  Put focus on the editor.
  */
  focus() {
    this.observer.ignore(() => {
      pO(this.contentDOM), this.docView.updateSelection();
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
    var n, s, r, o;
    return Co.of(new Is(typeof e == "number" ? B.cursor(e) : e, (n = t.y) !== null && n !== void 0 ? n : "nearest", (s = t.x) !== null && s !== void 0 ? s : "nearest", (r = t.yMargin) !== null && r !== void 0 ? r : 5, (o = t.xMargin) !== null && o !== void 0 ? o : 5));
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
    let { scrollTop: e, scrollLeft: t } = this.scrollDOM, n = this.viewState.scrollAnchorAt(e);
    return Co.of(new Is(B.cursor(n.from), "start", "start", n.top - e, t, !0));
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
    return en.define(() => ({}), { eventHandlers: e });
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
    return en.define(() => ({}), { eventObservers: e });
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
    let n = sr.newName(), s = [jo.of(n), Cr.of(Uh(`.${n}`, e))];
    return t && t.dark && s.push(Bh.of(!0)), s;
  }
  /**
  Create an extension that adds styles to the base theme. Like
  with [`theme`](https://codemirror.net/6/docs/ref/#view.EditorView^theme), use `&` to indicate the
  place of the editor wrapper element when directly targeting
  that. You can also use `&dark` or `&light` instead to only
  target editors with a dark or light theme.
  */
  static baseTheme(e) {
    return mo.lowest(Cr.of(Uh("." + Gh, e, JO)));
  }
  /**
  Retrieve an editor view instance from the view's DOM
  representation.
  */
  static findFromDOM(e) {
    var t;
    let n = e.querySelector(".cm-content"), s = n && at.get(n) || at.get(e);
    return ((t = s == null ? void 0 : s.root) === null || t === void 0 ? void 0 : t.view) || null;
  }
}
ge.styleModule = Cr;
ge.inputHandler = _O;
ge.clipboardInputFilter = zc;
ge.clipboardOutputFilter = Nc;
ge.scrollHandler = ZO;
ge.focusChangeEffect = PO;
ge.perLineTextDirection = TO;
ge.exceptionSink = $O;
ge.updateListener = Yh;
ge.editable = cn;
ge.mouseSelectionStyle = QO;
ge.dragMovesSelection = kO;
ge.clickAddsSelectionRange = SO;
ge.decorations = Kl;
ge.blockWrappers = AO;
ge.outerDecorations = Wc;
ge.atomicRanges = yo;
ge.bidiIsolatedRanges = RO;
ge.cursorScrollMargin = /* @__PURE__ */ me.define({
  combine: (i) => {
    let e = 5, t = 5;
    for (let n of i)
      typeof n == "number" ? e = t = n : { x: e, y: t } = n;
    return { x: e, y: t };
  }
});
ge.scrollMargins = MO;
ge.darkTheme = Bh;
ge.cspNonce = /* @__PURE__ */ me.define({ combine: (i) => i.length ? i[0] : "" });
ge.contentAttributes = Yc;
ge.editorAttributes = EO;
ge.lineWrapping = /* @__PURE__ */ ge.contentAttributes.of({ class: "cm-lineWrapping" });
ge.announce = /* @__PURE__ */ Ne.define();
const hx = 4096, Au = {};
class Sl {
  constructor(e, t, n, s, r, o) {
    this.from = e, this.to = t, this.dir = n, this.isolates = s, this.fresh = r, this.order = o;
  }
  static update(e, t) {
    if (t.empty && !e.some((r) => r.fresh))
      return e;
    let n = [], s = e.length ? e[e.length - 1].dir : lt.LTR;
    for (let r = Math.max(0, e.length - 10); r < e.length; r++) {
      let o = e[r];
      o.dir == s && !t.touchesRange(o.from, o.to) && n.push(new Sl(t.mapPos(o.from, 1), t.mapPos(o.to, -1), o.dir, o.isolates, !1, o.order));
    }
    return n;
  }
}
function Ru(i, e, t) {
  for (let n = i.state.facet(e), s = n.length - 1; s >= 0; s--) {
    let r = n[s], o = typeof r == "function" ? r(i) : r;
    o && Lc(o, t);
  }
  return t;
}
const cx = re.mac ? "mac" : re.windows ? "win" : re.linux ? "linux" : "key";
function fx(i, e) {
  const t = i.split(/-(?!$)/);
  let n = t[t.length - 1];
  n == "Space" && (n = " ");
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
  return s && (n = "Alt-" + n), r && (n = "Ctrl-" + n), l && (n = "Meta-" + n), o && (n = "Shift-" + n), n;
}
function Lo(i, e, t) {
  return e.altKey && (i = "Alt-" + i), e.ctrlKey && (i = "Ctrl-" + i), e.metaKey && (i = "Meta-" + i), t !== !1 && e.shiftKey && (i = "Shift-" + i), i;
}
const ux = /* @__PURE__ */ mo.default(/* @__PURE__ */ ge.domEventHandlers({
  keydown(i, e) {
    return gx(dx(e.state), i, e, "editor");
  }
})), ia = /* @__PURE__ */ me.define({ enables: ux }), Mu = /* @__PURE__ */ new WeakMap();
function dx(i) {
  let e = i.facet(ia), t = Mu.get(e);
  return t || Mu.set(e, t = Ox(e.reduce((n, s) => n.concat(s), []))), t;
}
let _n = null;
const px = 4e3;
function Ox(i, e = cx) {
  let t = /* @__PURE__ */ Object.create(null), n = /* @__PURE__ */ Object.create(null), s = (o, l) => {
    let a = n[o];
    if (a == null)
      n[o] = l;
    else if (a != l)
      throw new Error("Key binding " + o + " is used both as a regular binding and as a multi-stroke prefix");
  }, r = (o, l, a, h, c) => {
    var f, d;
    let p = t[o] || (t[o] = /* @__PURE__ */ Object.create(null)), O = l.split(/ (?!$)/).map((v) => fx(v, e));
    for (let v = 1; v < O.length; v++) {
      let y = O.slice(0, v).join(" ");
      s(y, !0), p[y] || (p[y] = {
        preventDefault: !0,
        stopPropagation: !1,
        run: [($) => {
          let Z = _n = { view: $, prefix: y, scope: o };
          return setTimeout(() => {
            _n == Z && (_n = null);
          }, px), !0;
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
  for (let o of i) {
    let l = o.scope ? o.scope.split(" ") : ["editor"];
    if (o.any)
      for (let h of l) {
        let c = t[h] || (t[h] = /* @__PURE__ */ Object.create(null));
        c._any || (c._any = { preventDefault: !1, stopPropagation: !1, run: [] });
        let { any: f } = o;
        for (let d in c)
          c[d].run.push((p) => f(p, Fh));
      }
    let a = o[e] || o.key;
    if (a)
      for (let h of l)
        r(h, a, o.run, o.preventDefault, o.stopPropagation), o.shift && r(h, "Shift-" + a, o.shift, o.preventDefault, o.stopPropagation);
  }
  return t;
}
let Fh = null;
function gx(i, e, t, n) {
  Fh = e;
  let s = _y(e), r = Wn(s, 0), o = _s(r) == s.length && s != " ", l = "", a = !1, h = !1, c = !1;
  _n && _n.view == t && _n.scope == n && (l = _n.prefix + " ", YO.indexOf(e.keyCode) < 0 && (h = !0, _n = null));
  let f = /* @__PURE__ */ new Set(), d = (m) => {
    if (m) {
      for (let v of m.run)
        if (!f.has(v) && (f.add(v), v(t)))
          return m.stopPropagation && (c = !0), !0;
      m.preventDefault && (m.stopPropagation && (c = !0), h = !0);
    }
    return !1;
  }, p = i[n], O, g;
  return p && (d(p[l + Lo(s, e, !o)]) ? a = !0 : o && (e.altKey || e.metaKey || e.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
  !(re.windows && e.ctrlKey && e.altKey) && // Alt-combinations on macOS tend to be typed characters
  !(re.mac && e.altKey && !(e.ctrlKey || e.metaKey)) && (O = Ln[e.keyCode]) && O != s ? (d(p[l + Lo(O, e, !0)]) || e.shiftKey && (g = Kr[e.keyCode]) != s && g != O && d(p[l + Lo(g, e, !1)])) && (a = !0) : o && e.shiftKey && d(p[l + Lo(s, e, !0)]) && (a = !0), !a && d(p._any) && (a = !0)), h && (a = !0), a && c && e.stopPropagation(), Fh = null, a;
}
class mx extends Or {
  constructor(e) {
    super(), this.content = e;
  }
  toDOM(e) {
    let t = document.createElement("span");
    return t.className = "cm-placeholder", t.style.pointerEvents = "none", t.appendChild(typeof this.content == "string" ? document.createTextNode(this.content) : typeof this.content == "function" ? this.content(e) : this.content.cloneNode(!0)), t.setAttribute("aria-hidden", "true"), t;
  }
  coordsAt(e) {
    let t = e.firstChild ? Yr(e.firstChild) : [];
    if (!t.length)
      return null;
    let n = window.getComputedStyle(e.parentNode), s = to(t[0], n.direction != "rtl"), r = parseInt(n.lineHeight);
    return s.bottom - s.top > r * 1.5 ? { left: s.left, right: s.right, top: s.top, bottom: s.top + r } : s;
  }
  ignoreEvent() {
    return !1;
  }
}
function vx(i) {
  let e = en.fromClass(class {
    constructor(t) {
      this.view = t, this.placeholder = i ? We.set([We.widget({ widget: new mx(i), side: 1 }).range(0)]) : We.none;
    }
    get decorations() {
      return this.view.state.doc.length ? We.none : this.placeholder;
    }
  }, { decorations: (t) => t.decorations });
  return typeof i == "string" ? [
    e,
    ge.contentAttributes.of({ "aria-placeholder": i })
  ] : e;
}
const Io = "-10000px";
class bx {
  constructor(e, t, n, s) {
    this.facet = t, this.createTooltipView = n, this.removeTooltipView = s, this.input = e.state.facet(t), this.tooltips = this.input.filter((o) => o);
    let r = null;
    this.tooltipViews = this.tooltips.map((o) => r = n(o, r));
  }
  update(e, t) {
    var n;
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
      o.indexOf(a) < 0 && (this.removeTooltipView(a), (n = a.destroy) === null || n === void 0 || n.call(a));
    return t && (l.forEach((a, h) => t[h] = a), t.length = l.length), this.input = s, this.tooltips = r, this.tooltipViews = o, !0;
  }
}
function yx(i) {
  let e = i.dom.ownerDocument.documentElement;
  return { top: 0, left: 0, bottom: e.clientHeight, right: e.clientWidth };
}
const Da = /* @__PURE__ */ me.define({
  combine: (i) => {
    var e, t, n;
    return {
      position: re.ios ? "absolute" : ((e = i.find((s) => s.position)) === null || e === void 0 ? void 0 : e.position) || "fixed",
      parent: ((t = i.find((s) => s.parent)) === null || t === void 0 ? void 0 : t.parent) || null,
      tooltipSpace: ((n = i.find((s) => s.tooltipSpace)) === null || n === void 0 ? void 0 : n.tooltipSpace) || yx
    };
  }
}), Xu = /* @__PURE__ */ new WeakMap(), eg = /* @__PURE__ */ en.fromClass(class {
  constructor(i) {
    this.view = i, this.above = [], this.inView = !0, this.madeAbsolute = !1, this.lastTransaction = 0, this.measureTimeout = -1;
    let e = i.state.facet(Da);
    this.position = e.position, this.parent = e.parent, this.classes = i.themeClasses, this.createContainer(), this.measureReq = { read: this.readMeasure.bind(this), write: this.writeMeasure.bind(this), key: this }, this.resizeObserver = typeof ResizeObserver == "function" ? new ResizeObserver(() => this.measureSoon()) : null, this.manager = new bx(i, tg, (t, n) => this.createTooltip(t, n), (t) => {
      this.resizeObserver && this.resizeObserver.unobserve(t.dom), t.dom.remove();
    }), this.above = this.manager.tooltips.map((t) => !!t.above), this.intersectionObserver = typeof IntersectionObserver == "function" ? new IntersectionObserver((t) => {
      Date.now() > this.lastTransaction - 50 && t.length > 0 && t[t.length - 1].intersectionRatio < 1 && this.measureSoon();
    }, { threshold: [1] }) : null, this.observeIntersection(), i.win.addEventListener("resize", this.measureSoon = this.measureSoon.bind(this)), this.maybeMeasure();
  }
  createContainer() {
    this.parent ? (this.container = document.createElement("div"), this.container.style.position = "relative", this.container.className = this.view.themeClasses, this.parent.appendChild(this.container)) : this.container = this.view.dom;
  }
  observeIntersection() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      for (let i of this.manager.tooltipViews)
        this.intersectionObserver.observe(i.dom);
    }
  }
  measureSoon() {
    this.measureTimeout < 0 && (this.measureTimeout = setTimeout(() => {
      this.measureTimeout = -1, this.maybeMeasure();
    }, 50));
  }
  update(i) {
    i.transactions.length && (this.lastTransaction = Date.now());
    let e = this.manager.update(i, this.above);
    e && this.observeIntersection();
    let t = e || i.geometryChanged, n = i.state.facet(Da);
    if (n.position != this.position && !this.madeAbsolute) {
      this.position = n.position;
      for (let s of this.manager.tooltipViews)
        s.dom.style.position = this.position;
      t = !0;
    }
    if (n.parent != this.parent) {
      this.parent && this.container.remove(), this.parent = n.parent, this.createContainer();
      for (let s of this.manager.tooltipViews)
        this.container.appendChild(s.dom);
      t = !0;
    } else this.parent && this.view.themeClasses != this.classes && (this.classes = this.container.className = this.view.themeClasses);
    t && this.maybeMeasure();
  }
  createTooltip(i, e) {
    let t = i.create(this.view), n = e ? e.dom : null;
    if (t.dom.classList.add("cm-tooltip"), i.arrow && !t.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")) {
      let s = document.createElement("div");
      s.className = "cm-tooltip-arrow", t.dom.appendChild(s);
    }
    return t.dom.style.position = this.position, t.dom.style.top = Io, t.dom.style.left = "0px", this.container.insertBefore(t.dom, n), t.mount && t.mount(this.view), this.resizeObserver && this.resizeObserver.observe(t.dom), t;
  }
  destroy() {
    var i, e, t;
    this.view.win.removeEventListener("resize", this.measureSoon);
    for (let n of this.manager.tooltipViews)
      n.dom.remove(), (i = n.destroy) === null || i === void 0 || i.call(n);
    this.parent && this.container.remove(), (e = this.resizeObserver) === null || e === void 0 || e.disconnect(), (t = this.intersectionObserver) === null || t === void 0 || t.disconnect(), clearTimeout(this.measureTimeout);
  }
  readMeasure() {
    let i = 1, e = 1, t = !1;
    if (this.position == "fixed" && this.manager.tooltipViews.length) {
      let { dom: r } = this.manager.tooltipViews[0];
      if (re.safari) {
        let o = r.getBoundingClientRect();
        t = Math.abs(o.top + 1e4) > 1 || Math.abs(o.left) > 1;
      } else
        t = !!r.offsetParent && r.offsetParent != this.container.ownerDocument.body;
    }
    if (t || this.position == "absolute")
      if (this.parent) {
        let r = this.parent.getBoundingClientRect();
        r.width && r.height && (i = r.width / this.parent.offsetWidth, e = r.height / this.parent.offsetHeight);
      } else
        ({ scaleX: i, scaleY: e } = this.view.viewState);
    let n = this.view.scrollDOM.getBoundingClientRect(), s = qc(this.view);
    return {
      visible: {
        left: n.left + s.left,
        top: n.top + s.top,
        right: n.right - s.right,
        bottom: n.bottom - s.bottom
      },
      parent: this.parent ? this.container.getBoundingClientRect() : this.view.dom.getBoundingClientRect(),
      pos: this.manager.tooltips.map((r, o) => {
        let l = this.manager.tooltipViews[o];
        return l.getCoords ? l.getCoords(r.pos) : this.view.coordsAtPos(r.pos);
      }),
      size: this.manager.tooltipViews.map(({ dom: r }) => r.getBoundingClientRect()),
      space: this.view.state.facet(Da).tooltipSpace(this.view),
      scaleX: i,
      scaleY: e,
      makeAbsolute: t
    };
  }
  writeMeasure(i) {
    var e;
    if (i.makeAbsolute) {
      this.madeAbsolute = !0, this.position = "absolute";
      for (let l of this.manager.tooltipViews)
        l.dom.style.position = "absolute";
    }
    let { visible: t, space: n, scaleX: s, scaleY: r } = i, o = [];
    for (let l = 0; l < this.manager.tooltips.length; l++) {
      let a = this.manager.tooltips[l], h = this.manager.tooltipViews[l], { dom: c } = h, f = i.pos[l], d = i.size[l];
      if (!f || a.clip !== !1 && (f.bottom <= Math.max(t.top, n.top) || f.top >= Math.min(t.bottom, n.bottom) || f.right < Math.max(t.left, n.left) - 0.1 || f.left > Math.min(t.right, n.right) + 0.1)) {
        c.style.top = Io;
        continue;
      }
      let p = a.arrow ? h.dom.querySelector(".cm-tooltip-arrow") : null, O = p ? 7 : 0, g = d.right - d.left, m = (e = Xu.get(h)) !== null && e !== void 0 ? e : d.bottom - d.top, v = h.offset || xx, y = this.view.textDirection == lt.LTR, $ = d.width > n.right - n.left ? y ? n.left : n.right - d.width : y ? Math.max(n.left, Math.min(f.left - (p ? 14 : 0) + v.x, n.right - g)) : Math.min(Math.max(n.left, f.left - g + (p ? 14 : 0) - v.x), n.right - g), Z = this.above[l];
      !a.strictSide && (Z ? f.top - m - O - v.y < n.top : f.bottom + m + O + v.y > n.bottom) && Z == n.bottom - f.bottom > f.top - n.top && (Z = this.above[l] = !Z);
      let E = (Z ? f.top - n.top : n.bottom - f.bottom) - O;
      if (E < m && h.resize !== !1) {
        if (E < this.view.defaultLineHeight) {
          c.style.top = Io;
          continue;
        }
        Xu.set(h, m), c.style.height = (m = E) / r + "px";
      } else c.style.height && (c.style.height = "");
      let M = Z ? f.top - m - O - v.y : f.bottom + O + v.y, A = $ + g;
      if (h.overlap !== !0)
        for (let Y of o)
          Y.left < A && Y.right > $ && Y.top < M + m && Y.bottom > M && (M = Z ? Y.top - m - 2 - O : Y.bottom + O + 2);
      if (this.position == "absolute" ? (c.style.top = (M - i.parent.top) / r + "px", ju(c, ($ - i.parent.left) / s)) : (c.style.top = M / r + "px", ju(c, $ / s)), p) {
        let Y = f.left + (y ? v.x : -v.x) - ($ + 14 - 7);
        p.style.left = Y / s + "px";
      }
      h.overlap !== !0 && o.push({ left: $, top: M, right: A, bottom: M + m }), c.classList.toggle("cm-tooltip-above", Z), c.classList.toggle("cm-tooltip-below", !Z), h.positioned && h.positioned(i.space);
    }
  }
  maybeMeasure() {
    if (this.manager.tooltips.length && (this.view.inView && this.view.requestMeasure(this.measureReq), this.inView != this.view.inView && (this.inView = this.view.inView, !this.inView)))
      for (let i of this.manager.tooltipViews)
        i.dom.style.top = Io;
  }
}, {
  eventObservers: {
    scroll() {
      this.maybeMeasure();
    }
  }
});
function ju(i, e) {
  let t = parseInt(i.style.left, 10);
  (isNaN(t) || Math.abs(e - t) > 1) && (i.style.left = e + "px");
}
const wx = /* @__PURE__ */ ge.baseTheme({
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
}), xx = { x: 0, y: 0 }, tg = /* @__PURE__ */ me.define({
  enables: [eg, wx]
});
function ig(i, e) {
  let t = i.plugin(eg);
  if (!t)
    return null;
  let n = t.manager.tooltips.indexOf(e);
  return n < 0 ? null : t.manager.tooltipViews[n];
}
class ar extends jn {
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
ar.prototype.elementClass = "";
ar.prototype.toDOM = void 0;
ar.prototype.mapMode = Xt.TrackBefore;
ar.prototype.startSide = ar.prototype.endSide = -1;
ar.prototype.point = !0;
const ng = 1024;
let Sx = 0;
class za {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
class _e {
  /**
  Create a new node prop type.
  */
  constructor(e = {}) {
    this.id = Sx++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
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
      let n = e(t);
      return n === void 0 ? null : [this, n];
    };
  }
}
_e.closedBy = new _e({ deserialize: (i) => i.split(" ") });
_e.openedBy = new _e({ deserialize: (i) => i.split(" ") });
_e.group = new _e({ deserialize: (i) => i.split(" ") });
_e.isolate = new _e({ deserialize: (i) => {
  if (i && i != "rtl" && i != "ltr" && i != "auto")
    throw new RangeError("Invalid value for isolate: " + i);
  return i || "auto";
} });
_e.contextHash = new _e({ perNode: !0 });
_e.lookAhead = new _e({ perNode: !0 });
_e.mounted = new _e({ perNode: !0 });
class Vr {
  constructor(e, t, n, s = !1) {
    this.tree = e, this.overlay = t, this.parser = n, this.bracketed = s;
  }
  /**
  @internal
  */
  static get(e) {
    return e && e.props && e.props[_e.mounted.id];
  }
}
const kx = /* @__PURE__ */ Object.create(null);
class Ft {
  /**
  @internal
  */
  constructor(e, t, n, s = 0) {
    this.name = e, this.props = t, this.id = n, this.flags = s;
  }
  /**
  Define a node type.
  */
  static define(e) {
    let t = e.props && e.props.length ? /* @__PURE__ */ Object.create(null) : kx, n = (e.top ? 1 : 0) | (e.skipped ? 2 : 0) | (e.error ? 4 : 0) | (e.name == null ? 8 : 0), s = new Ft(e.name || "", t, e.id, n);
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
      let t = this.prop(_e.group);
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
    for (let n in e)
      for (let s of n.split(" "))
        t[s] = e[n];
    return (n) => {
      for (let s = n.prop(_e.group), r = -1; r < (s ? s.length : 0); r++) {
        let o = t[r < 0 ? n.name : s[r]];
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
class Uc {
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
    for (let n of this.types) {
      let s = null;
      for (let r of e) {
        let o = r(n);
        if (o) {
          s || (s = Object.assign({}, n.props));
          let l = o[1], a = o[0];
          a.combine && a.id in s && (l = a.combine(s[a.id], l)), s[a.id] = l;
        }
      }
      t.push(s ? new Ft(n.name, s, n.id, n.flags) : n);
    }
    return new Uc(t);
  }
}
const Do = /* @__PURE__ */ new WeakMap(), Lu = /* @__PURE__ */ new WeakMap();
var nt;
(function(i) {
  i[i.ExcludeBuffers = 1] = "ExcludeBuffers", i[i.IncludeAnonymous = 2] = "IncludeAnonymous", i[i.IgnoreMounts = 4] = "IgnoreMounts", i[i.IgnoreOverlays = 8] = "IgnoreOverlays", i[i.EnterBracketed = 16] = "EnterBracketed";
})(nt || (nt = {}));
class ft {
  /**
  Construct a new tree. See also [`Tree.build`](#common.Tree^build).
  */
  constructor(e, t, n, s, r) {
    if (this.type = e, this.children = t, this.positions = n, this.length = s, this.props = null, r && r.length) {
      this.props = /* @__PURE__ */ Object.create(null);
      for (let [o, l] of r)
        this.props[typeof o == "number" ? o : o.id] = l;
    }
  }
  /**
  @internal
  */
  toString() {
    let e = Vr.get(this);
    if (e && !e.overlay)
      return e.tree.toString();
    let t = "";
    for (let n of this.children) {
      let s = n.toString();
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
    return new Kh(this.topNode, e);
  }
  /**
  Get a [tree cursor](#common.TreeCursor) pointing into this tree
  at the given position and side (see
  [`moveTo`](#common.TreeCursor.moveTo).
  */
  cursorAt(e, t = 0, n = 0) {
    let s = Do.get(this) || this.topNode, r = new Kh(s);
    return r.moveTo(e, t), Do.set(this, r._tree), r;
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
    let n = no(Do.get(this) || this.topNode, e, t, !1);
    return Do.set(this, n), n;
  }
  /**
  Like [`resolve`](#common.Tree.resolve), but will enter
  [overlaid](#common.MountedTree.overlay) nodes, producing a syntax node
  pointing into the innermost overlaid tree at the given position
  (with parent links going through all parent structure, including
  the host trees).
  */
  resolveInner(e, t = 0) {
    let n = no(Lu.get(this) || this.topNode, e, t, !0);
    return Lu.set(this, n), n;
  }
  /**
  In some situations, it can be useful to iterate through all
  nodes around a position, including those in overlays that don't
  directly cover the position. This method gives you an iterator
  that will produce all nodes, from small to big, around the given
  position.
  */
  resolveStack(e, t = 0) {
    return _x(this, e, t);
  }
  /**
  Iterate over the tree and its children, calling `enter` for any
  node that touches the `from`/`to` region (if given) before
  running over such a node's children, and `leave` (if given) when
  leaving the node. When `enter` returns `false`, that node will
  not have its children iterated over (or `leave` called).
  */
  iterate(e) {
    let { enter: t, leave: n, from: s = 0, to: r = this.length } = e, o = e.mode || 0, l = (o & nt.IncludeAnonymous) > 0;
    for (let a = this.cursor(o | nt.IncludeAnonymous); ; ) {
      let h = !1;
      if (a.from <= r && a.to >= s && (!l && a.type.isAnonymous || t(a) !== !1)) {
        if (a.firstChild())
          continue;
        h = !0;
      }
      for (; h && n && (l || !a.type.isAnonymous) && n(a), !a.nextSibling(); ) {
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
    return this.children.length <= 8 ? this : Kc(Ft.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, n, s) => new ft(this.type, t, n, s, this.propValues), e.makeTree || ((t, n, s) => new ft(Ft.none, t, n, s)));
  }
  /**
  Build a tree from a postfix-ordered buffer of node information,
  or a cursor over such a buffer.
  */
  static build(e) {
    return Px(e);
  }
}
ft.empty = new ft(Ft.none, [], [], 0);
class Fc {
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
    return new Fc(this.buffer, this.index);
  }
}
class Dn {
  /**
  Create a tree buffer.
  */
  constructor(e, t, n) {
    this.buffer = e, this.length = t, this.set = n;
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
    let t = this.buffer[e], n = this.buffer[e + 3], s = this.set.types[t], r = s.name;
    if (/\W/.test(r) && !s.isError && (r = JSON.stringify(r)), e += 4, n == e)
      return r;
    let o = [];
    for (; e < n; )
      o.push(this.childString(e)), e = this.buffer[e + 3];
    return r + "(" + o.join(",") + ")";
  }
  /**
  @internal
  */
  findChild(e, t, n, s, r) {
    let { buffer: o } = this, l = -1;
    for (let a = e; a != t && !(sg(r, s, o[a + 1], o[a + 2]) && (l = a, n > 0)); a = o[a + 3])
      ;
    return l;
  }
  /**
  @internal
  */
  slice(e, t, n) {
    let s = this.buffer, r = new Uint16Array(t - e), o = 0;
    for (let l = e, a = 0; l < t; ) {
      r[a++] = s[l++], r[a++] = s[l++] - n;
      let h = r[a++] = s[l++] - n;
      r[a++] = s[l++] - e, o = Math.max(o, h);
    }
    return new Dn(r, o, this.set);
  }
}
function sg(i, e, t, n) {
  switch (i) {
    case -2:
      return t < e;
    case -1:
      return n >= e && t < e;
    case 0:
      return t < e && n > e;
    case 1:
      return t <= e && n > e;
    case 2:
      return n > e;
    case 4:
      return !0;
  }
}
function no(i, e, t, n) {
  for (var s; i.from == i.to || (t < 1 ? i.from >= e : i.from > e) || (t > -1 ? i.to <= e : i.to < e); ) {
    let o = !n && i instanceof Ut && i.index < 0 ? null : i.parent;
    if (!o)
      return i;
    i = o;
  }
  let r = n ? 0 : nt.IgnoreOverlays;
  if (n)
    for (let o = i, l = o.parent; l; o = l, l = o.parent)
      o instanceof Ut && o.index < 0 && ((s = l.enter(e, t, r)) === null || s === void 0 ? void 0 : s.from) != o.from && (i = l);
  for (; ; ) {
    let o = i.enter(e, t, r);
    if (!o)
      return i;
    i = o;
  }
}
class rg {
  cursor(e = 0) {
    return new Kh(this, e);
  }
  getChild(e, t = null, n = null) {
    let s = Iu(this, e, t, n);
    return s.length ? s[0] : null;
  }
  getChildren(e, t = null, n = null) {
    return Iu(this, e, t, n);
  }
  resolve(e, t = 0) {
    return no(this, e, t, !1);
  }
  resolveInner(e, t = 0) {
    return no(this, e, t, !0);
  }
  matchContext(e) {
    return Hh(this.parent, e);
  }
  enterUnfinishedNodesBefore(e) {
    let t = this.childBefore(e), n = this;
    for (; t; ) {
      let s = t.lastChild;
      if (!s || s.to != t.to)
        break;
      s.type.isError && s.from == s.to ? (n = t, t = s.prevSibling) : t = s;
    }
    return n;
  }
  get node() {
    return this;
  }
  get next() {
    return this.parent;
  }
}
class Ut extends rg {
  constructor(e, t, n, s) {
    super(), this._tree = e, this.from = t, this.index = n, this._parent = s;
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
  nextChild(e, t, n, s, r = 0) {
    for (let o = this; ; ) {
      for (let { children: l, positions: a } = o._tree, h = t > 0 ? l.length : -1; e != h; e += t) {
        let c = l[e], f = a[e] + o.from, d;
        if (!(!(r & nt.EnterBracketed && c instanceof ft && (d = Vr.get(c)) && !d.overlay && d.bracketed && n >= f && n <= f + c.length) && !sg(s, n, f, f + c.length))) {
          if (c instanceof Dn) {
            if (r & nt.ExcludeBuffers)
              continue;
            let p = c.findChild(0, c.buffer.length, t, n - f, s);
            if (p > -1)
              return new Ui(new Qx(o, c, e, f), null, p);
          } else if (r & nt.IncludeAnonymous || !c.type.isAnonymous || Hc(c)) {
            let p;
            if (!(r & nt.IgnoreMounts) && (p = Vr.get(c)) && !p.overlay)
              return new Ut(p.tree, f, e, o);
            let O = new Ut(c, f, e, o);
            return r & nt.IncludeAnonymous || !O.type.isAnonymous ? O : O.nextChild(t < 0 ? c.children.length - 1 : 0, t, n, s, r);
          }
        }
      }
      if (r & nt.IncludeAnonymous || !o.type.isAnonymous || (o.index >= 0 ? e = o.index + t : e = t < 0 ? -1 : o._parent._tree.children.length, o = o._parent, !o))
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
  enter(e, t, n = 0) {
    let s;
    if (!(n & nt.IgnoreOverlays) && (s = Vr.get(this._tree)) && s.overlay) {
      let r = e - this.from, o = n & nt.EnterBracketed && s.bracketed;
      for (let { from: l, to: a } of s.overlay)
        if ((t > 0 || o ? l <= r : l < r) && (t < 0 || o ? a >= r : a > r))
          return new Ut(s.tree, s.overlay[0].from + this.from, -1, this);
    }
    return this.nextChild(0, 1, e, t, n);
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
function Iu(i, e, t, n) {
  let s = i.cursor(), r = [];
  if (!s.firstChild())
    return r;
  if (t != null) {
    for (let o = !1; !o; )
      if (o = s.type.is(t), !s.nextSibling())
        return r;
  }
  for (; ; ) {
    if (n != null && s.type.is(n))
      return r;
    if (s.type.is(e) && r.push(s.node), !s.nextSibling())
      return n == null ? r : [];
  }
}
function Hh(i, e, t = e.length - 1) {
  for (let n = i; t >= 0; n = n.parent) {
    if (!n)
      return !1;
    if (!n.type.isAnonymous) {
      if (e[t] && e[t] != n.name)
        return !1;
      t--;
    }
  }
  return !0;
}
class Qx {
  constructor(e, t, n, s) {
    this.parent = e, this.buffer = t, this.index = n, this.start = s;
  }
}
class Ui extends rg {
  get name() {
    return this.type.name;
  }
  get from() {
    return this.context.start + this.context.buffer.buffer[this.index + 1];
  }
  get to() {
    return this.context.start + this.context.buffer.buffer[this.index + 2];
  }
  constructor(e, t, n) {
    super(), this.context = e, this._parent = t, this.index = n, this.type = e.buffer.set.types[e.buffer.buffer[n]];
  }
  child(e, t, n) {
    let { buffer: s } = this.context, r = s.findChild(this.index + 4, s.buffer[this.index + 3], e, t - this.context.start, n);
    return r < 0 ? null : new Ui(this.context, this, r);
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
  enter(e, t, n = 0) {
    if (n & nt.ExcludeBuffers)
      return null;
    let { buffer: s } = this.context, r = s.findChild(this.index + 4, s.buffer[this.index + 3], t > 0 ? 1 : -1, e - this.context.start, t);
    return r < 0 ? null : new Ui(this.context, this, r);
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
    return t < (this._parent ? e.buffer[this._parent.index + 3] : e.buffer.length) ? new Ui(this.context, this._parent, t) : this.externalSibling(1);
  }
  get prevSibling() {
    let { buffer: e } = this.context, t = this._parent ? this._parent.index + 4 : 0;
    return this.index == t ? this.externalSibling(-1) : new Ui(this.context, this._parent, e.findChild(
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
    let e = [], t = [], { buffer: n } = this.context, s = this.index + 4, r = n.buffer[this.index + 3];
    if (r > s) {
      let o = n.buffer[this.index + 1];
      e.push(n.slice(s, r, o)), t.push(0);
    }
    return new ft(this.type, e, t, this.to - this.from);
  }
  /**
  @internal
  */
  toString() {
    return this.context.buffer.childString(this.index);
  }
}
function og(i) {
  if (!i.length)
    return null;
  let e = 0, t = i[0];
  for (let r = 1; r < i.length; r++) {
    let o = i[r];
    (o.from > t.from || o.to < t.to) && (t = o, e = r);
  }
  let n = t instanceof Ut && t.index < 0 ? null : t.parent, s = i.slice();
  return n ? s[e] = n : s.splice(e, 1), new $x(s, t);
}
class $x {
  constructor(e, t) {
    this.heads = e, this.node = t;
  }
  get next() {
    return og(this.heads);
  }
}
function _x(i, e, t) {
  let n = i.resolveInner(e, t), s = null;
  for (let r = n instanceof Ut ? n : n.context.parent; r; r = r.parent)
    if (r.index < 0) {
      let o = r.parent;
      (s || (s = [n])).push(o.resolve(e, t)), r = o;
    } else {
      let o = Vr.get(r.tree);
      if (o && o.overlay && o.overlay[0].from <= e && o.overlay[o.overlay.length - 1].to >= e) {
        let l = new Ut(o.tree, o.overlay[0].from + r.from, -1, r);
        (s || (s = [n])).push(no(l, e, t, !1));
      }
    }
  return s ? og(s) : n;
}
class Kh {
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
    if (this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, this.mode = t & ~nt.EnterBracketed, e instanceof Ut)
      this.yieldNode(e);
    else {
      this._tree = e.context.parent, this.buffer = e.context;
      for (let n = e._parent; n; n = n._parent)
        this.stack.unshift(n.index);
      this.bufferNode = e, this.yieldBuf(e.index);
    }
  }
  yieldNode(e) {
    return e ? (this._tree = e, this.type = e.type, this.from = e.from, this.to = e.to, !0) : !1;
  }
  yieldBuf(e, t) {
    this.index = e;
    let { start: n, buffer: s } = this.buffer;
    return this.type = t || s.set.types[s.buffer[e]], this.from = n + s.buffer[e + 1], this.to = n + s.buffer[e + 2], !0;
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
  enterChild(e, t, n) {
    if (!this.buffer)
      return this.yield(this._tree.nextChild(e < 0 ? this._tree._tree.children.length - 1 : 0, e, t, n, this.mode));
    let { buffer: s } = this.buffer, r = s.findChild(this.index + 4, s.buffer[this.index + 3], e, t - this.buffer.start, n);
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
  enter(e, t, n = this.mode) {
    return this.buffer ? n & nt.ExcludeBuffers ? !1 : this.enterChild(1, e, t) : this.yield(this._tree.enter(e, t, n));
  }
  /**
  Move to the node's parent node, if this isn't the top node.
  */
  parent() {
    if (!this.buffer)
      return this.yieldNode(this.mode & nt.IncludeAnonymous ? this._tree._parent : this._tree.parent);
    if (this.stack.length)
      return this.yieldBuf(this.stack.pop());
    let e = this.mode & nt.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
    return this.buffer = null, this.yieldNode(e);
  }
  /**
  @internal
  */
  sibling(e) {
    if (!this.buffer)
      return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + e, e, 0, 4, this.mode)) : !1;
    let { buffer: t } = this.buffer, n = this.stack.length - 1;
    if (e < 0) {
      let s = n < 0 ? 0 : this.stack[n] + 4;
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
      if (s < (n < 0 ? t.buffer.length : t.buffer[this.stack[n] + 3]))
        return this.yieldBuf(s);
    }
    return n < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + e, e, 0, 4, this.mode)) : !1;
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
    let t, n, { buffer: s } = this;
    if (s) {
      if (e > 0) {
        if (this.index < s.buffer.buffer.length)
          return !1;
      } else
        for (let r = 0; r < this.index; r++)
          if (s.buffer.buffer[r + 3] < this.index)
            return !1;
      ({ index: t, parent: n } = s);
    } else
      ({ index: t, _parent: n } = this._tree);
    for (; n; { index: t, _parent: n } = n)
      if (t > -1)
        for (let r = t + e, o = e < 0 ? -1 : n._tree.children.length; r != o; r += e) {
          let l = n._tree.children[r];
          if (this.mode & nt.IncludeAnonymous || l instanceof Dn || !l.type.isAnonymous || Hc(l))
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
    let e = this.bufferNode, t = null, n = 0;
    if (e && e.context == this.buffer)
      e: for (let s = this.index, r = this.stack.length; r >= 0; ) {
        for (let o = e; o; o = o._parent)
          if (o.index == s) {
            if (s == this.index)
              return o;
            t = o, n = r + 1;
            break e;
          }
        s = this.stack[--r];
      }
    for (let s = n; s < this.stack.length; s++)
      t = new Ui(this.buffer, t, this.stack[s]);
    return this.bufferNode = new Ui(this.buffer, t, this.index);
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
    for (let n = 0; ; ) {
      let s = !1;
      if (this.type.isAnonymous || e(this) !== !1) {
        if (this.firstChild()) {
          n++;
          continue;
        }
        this.type.isAnonymous || (s = !0);
      }
      for (; ; ) {
        if (s && t && t(this), s = this.type.isAnonymous, !n)
          return;
        if (this.nextSibling())
          break;
        this.parent(), n--, s = !0;
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
      return Hh(this.node.parent, e);
    let { buffer: t } = this.buffer, { types: n } = t.set;
    for (let s = e.length - 1, r = this.stack.length - 1; s >= 0; r--) {
      if (r < 0)
        return Hh(this._tree, e, s);
      let o = n[t.buffer[this.stack[r]]];
      if (!o.isAnonymous) {
        if (e[s] && e[s] != o.name)
          return !1;
        s--;
      }
    }
    return !0;
  }
}
function Hc(i) {
  return i.children.some((e) => e instanceof Dn || !e.type.isAnonymous || Hc(e));
}
function Px(i) {
  var e;
  let { buffer: t, nodeSet: n, maxBufferLength: s = ng, reused: r = [], minRepeatType: o = n.types.length } = i, l = Array.isArray(t) ? new Fc(t, t.length) : t, a = n.types, h = 0, c = 0;
  function f(E, M, A, Y, L, X) {
    let { id: j, start: S, end: T, size: I } = l, P = c, Q = h;
    if (I < 0)
      if (l.next(), I == -1) {
        let z = r[j];
        A.push(z), Y.push(S - E);
        return;
      } else if (I == -3) {
        h = j;
        return;
      } else if (I == -4) {
        c = j;
        return;
      } else
        throw new RangeError(`Unrecognized record size: ${I}`);
    let q = a[j], ae, V, H = S - E;
    if (T - S <= s && (V = m(l.pos - M, L))) {
      let z = new Uint16Array(V.size - V.skip), ee = l.pos - V.size, he = z.length;
      for (; l.pos > ee; )
        he = v(V.start, z, he);
      ae = new Dn(z, T - V.start, n), H = V.start - E;
    } else {
      let z = l.pos - I;
      l.next();
      let ee = [], he = [], ce = j >= o ? j : -1, ue = 0, le = T;
      for (; l.pos > z; )
        ce >= 0 && l.id == ce && l.size >= 0 ? (l.end <= le - s && (O(ee, he, S, ue, l.end, le, ce, P, Q), ue = ee.length, le = l.end), l.next()) : X > 2500 ? d(S, z, ee, he) : f(S, z, ee, he, ce, X + 1);
      if (ce >= 0 && ue > 0 && ue < ee.length && O(ee, he, S, ue, S, le, ce, P, Q), ee.reverse(), he.reverse(), ce > -1 && ue > 0) {
        let oe = p(q, Q);
        ae = Kc(q, ee, he, 0, ee.length, 0, T - S, oe, oe);
      } else
        ae = g(q, ee, he, T - S, P - T, Q);
    }
    A.push(ae), Y.push(H);
  }
  function d(E, M, A, Y) {
    let L = [], X = 0, j = -1;
    for (; l.pos > M; ) {
      let { id: S, start: T, end: I, size: P } = l;
      if (P > 4)
        l.next();
      else {
        if (j > -1 && T < j)
          break;
        j < 0 && (j = I - s), L.push(S, T, I), X++, l.next();
      }
    }
    if (X) {
      let S = new Uint16Array(X * 4), T = L[L.length - 2];
      for (let I = L.length - 3, P = 0; I >= 0; I -= 3)
        S[P++] = L[I], S[P++] = L[I + 1] - T, S[P++] = L[I + 2] - T, S[P++] = P;
      A.push(new Dn(S, L[2] - T, n)), Y.push(T - E);
    }
  }
  function p(E, M) {
    return (A, Y, L) => {
      let X = 0, j = A.length - 1, S, T;
      if (j >= 0 && (S = A[j]) instanceof ft) {
        if (!j && S.type == E && S.length == L)
          return S;
        (T = S.prop(_e.lookAhead)) && (X = Y[j] + S.length + T);
      }
      return g(E, A, Y, L, X, M);
    };
  }
  function O(E, M, A, Y, L, X, j, S, T) {
    let I = [], P = [];
    for (; E.length > Y; )
      I.push(E.pop()), P.push(M.pop() + A - L);
    E.push(g(n.types[j], I, P, X - L, S - X, T)), M.push(L - A);
  }
  function g(E, M, A, Y, L, X, j) {
    if (X) {
      let S = [_e.contextHash, X];
      j = j ? [S].concat(j) : [S];
    }
    if (L > 25) {
      let S = [_e.lookAhead, L];
      j = j ? [S].concat(j) : [S];
    }
    return new ft(E, M, A, Y, j);
  }
  function m(E, M) {
    let A = l.fork(), Y = 0, L = 0, X = 0, j = A.end - s, S = { size: 0, start: 0, skip: 0 };
    e: for (let T = A.pos - E; A.pos > T; ) {
      let I = A.size;
      if (A.id == M && I >= 0) {
        S.size = Y, S.start = L, S.skip = X, X += 4, Y += 4, A.next();
        continue;
      }
      let P = A.pos - I;
      if (I < 0 || P < T || A.start < j)
        break;
      let Q = A.id >= o ? 4 : 0, q = A.start;
      for (A.next(); A.pos > P; ) {
        if (A.size < 0)
          if (A.size == -3 || A.size == -4)
            Q += 4;
          else
            break e;
        else A.id >= o && (Q += 4);
        A.next();
      }
      L = q, Y += I, X += Q;
    }
    return (M < 0 || Y == E) && (S.size = Y, S.start = L, S.skip = X), S.size > 4 ? S : void 0;
  }
  function v(E, M, A) {
    let { id: Y, start: L, end: X, size: j } = l;
    if (l.next(), j >= 0 && Y < o) {
      let S = A;
      if (j > 4) {
        let T = l.pos - (j - 4);
        for (; l.pos > T; )
          A = v(E, M, A);
      }
      M[--A] = S, M[--A] = X - E, M[--A] = L - E, M[--A] = Y;
    } else j == -3 ? h = Y : j == -4 && (c = Y);
    return A;
  }
  let y = [], $ = [];
  for (; l.pos > 0; )
    f(i.start || 0, i.bufferStart || 0, y, $, -1, 0);
  let Z = (e = i.length) !== null && e !== void 0 ? e : y.length ? $[0] + y[0].length : 0;
  return new ft(a[i.topID], y.reverse(), $.reverse(), Z);
}
const Du = /* @__PURE__ */ new WeakMap();
function nl(i, e) {
  if (!i.isAnonymous || e instanceof Dn || e.type != i)
    return 1;
  let t = Du.get(e);
  if (t == null) {
    t = 1;
    for (let n of e.children) {
      if (n.type != i || !(n instanceof ft)) {
        t = 1;
        break;
      }
      t += nl(i, n);
    }
    Du.set(e, t);
  }
  return t;
}
function Kc(i, e, t, n, s, r, o, l, a) {
  let h = 0;
  for (let O = n; O < s; O++)
    h += nl(i, e[O]);
  let c = Math.ceil(
    h * 1.5 / 8
    /* Balance.BranchFactor */
  ), f = [], d = [];
  function p(O, g, m, v, y) {
    for (let $ = m; $ < v; ) {
      let Z = $, E = g[$], M = nl(i, O[$]);
      for ($++; $ < v; $++) {
        let A = nl(i, O[$]);
        if (M + A >= c)
          break;
        M += A;
      }
      if ($ == Z + 1) {
        if (M > c) {
          let A = O[Z];
          p(A.children, A.positions, 0, A.children.length, g[Z] + y);
          continue;
        }
        f.push(O[Z]);
      } else {
        let A = g[$ - 1] + O[$ - 1].length - E;
        f.push(Kc(i, O, g, Z, $, E, A, null, a));
      }
      d.push(E + y - r);
    }
  }
  return p(e, t, n, s, 0), (l || a)(f, d, o);
}
class Tx {
  constructor() {
    this.map = /* @__PURE__ */ new WeakMap();
  }
  setBuffer(e, t, n) {
    let s = this.map.get(e);
    s || this.map.set(e, s = /* @__PURE__ */ new Map()), s.set(t, n);
  }
  getBuffer(e, t) {
    let n = this.map.get(e);
    return n && n.get(t);
  }
  /**
  Set the value for this syntax node.
  */
  set(e, t) {
    e instanceof Ui ? this.setBuffer(e.context.buffer, e.index, t) : e instanceof Ut && this.map.set(e.tree, t);
  }
  /**
  Retrieve value for this syntax node, if it exists in the map.
  */
  get(e) {
    return e instanceof Ui ? this.getBuffer(e.context.buffer, e.index) : e instanceof Ut ? this.map.get(e.tree) : void 0;
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
class ls {
  /**
  Construct a tree fragment. You'll usually want to use
  [`addTree`](#common.TreeFragment^addTree) and
  [`applyChanges`](#common.TreeFragment^applyChanges) instead of
  calling this directly.
  */
  constructor(e, t, n, s, r = !1, o = !1) {
    this.from = e, this.to = t, this.tree = n, this.offset = s, this.open = (r ? 1 : 0) | (o ? 2 : 0);
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
  static addTree(e, t = [], n = !1) {
    let s = [new ls(0, e.length, e, 0, !1, n)];
    for (let r of t)
      r.to > e.length && s.push(r);
    return s;
  }
  /**
  Apply a set of edits to an array of fragments, removing or
  splitting fragments as necessary to remove edited ranges, and
  adjusting offsets for fragments that moved.
  */
  static applyChanges(e, t, n = 128) {
    if (!t.length)
      return e;
    let s = [], r = 1, o = e.length ? e[0] : null;
    for (let l = 0, a = 0, h = 0; ; l++) {
      let c = l < t.length ? t[l] : null, f = c ? c.fromA : 1e9;
      if (f - a >= n)
        for (; o && o.from < f; ) {
          let d = o;
          if (a >= d.from || f <= d.to || h) {
            let p = Math.max(d.from, a) - h, O = Math.min(d.to, f) - h;
            d = p >= O ? null : new ls(p, O, d.tree, d.offset + h, l > 0, !!c);
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
class lg {
  /**
  Start a parse, returning a [partial parse](#common.PartialParse)
  object. [`fragments`](#common.TreeFragment) can be passed in to
  make the parse incremental.
  
  By default, the entire input is parsed. You can pass `ranges`,
  which should be a sorted array of non-empty, non-overlapping
  ranges, to parse only those ranges. The tree returned in that
  case will start at `ranges[0].from`.
  */
  startParse(e, t, n) {
    return typeof e == "string" && (e = new Zx(e)), n = n ? n.length ? n.map((s) => new za(s.from, s.to)) : [new za(0, 0)] : [new za(0, e.length)], this.createParse(e, t || [], n);
  }
  /**
  Run a full parse, returning the resulting tree.
  */
  parse(e, t, n) {
    let s = this.startParse(e, t, n);
    for (; ; ) {
      let r = s.advance();
      if (r)
        return r;
    }
  }
}
class Zx {
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
new _e({ perNode: !0 });
let Cx = 0;
class di {
  /**
  @internal
  */
  constructor(e, t, n, s) {
    this.name = e, this.set = t, this.base = n, this.modified = s, this.id = Cx++;
  }
  toString() {
    let { name: e } = this;
    for (let t of this.modified)
      t.name && (e = `${t.name}(${e})`);
    return e;
  }
  static define(e, t) {
    let n = typeof e == "string" ? e : "?";
    if (e instanceof di && (t = e), t != null && t.base)
      throw new Error("Can not derive from a modified tag");
    let s = new di(n, [], null, []);
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
    let t = new kl(e);
    return (n) => n.modified.indexOf(t) > -1 ? n : kl.get(n.base || n, n.modified.concat(t).sort((s, r) => s.id - r.id));
  }
}
let Ex = 0;
class kl {
  constructor(e) {
    this.name = e, this.instances = [], this.id = Ex++;
  }
  static get(e, t) {
    if (!t.length)
      return e;
    let n = t[0].instances.find((l) => l.base == e && Ax(t, l.modified));
    if (n)
      return n;
    let s = [], r = new di(e.name, s, e, t);
    for (let l of t)
      l.instances.push(r);
    let o = Rx(t);
    for (let l of e.set)
      if (!l.modified.length)
        for (let a of o)
          s.push(kl.get(l, a));
    return r;
  }
}
function Ax(i, e) {
  return i.length == e.length && i.every((t, n) => t == e[n]);
}
function Rx(i) {
  let e = [[]];
  for (let t = 0; t < i.length; t++)
    for (let n = 0, s = e.length; n < s; n++)
      e.push(e[n].concat(i[t]));
  return e.sort((t, n) => n.length - t.length);
}
function ag(i) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in i) {
    let n = i[t];
    Array.isArray(n) || (n = [n]);
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
        let c = new Ql(n, o, a > 0 ? r.slice(0, a) : null);
        e[h] = c.sort(e[h]);
      }
  }
  return Mx.add(e);
}
const Mx = new _e({
  combine(i, e) {
    let t, n, s;
    for (; i || e; ) {
      if (!i || e && i.depth >= e.depth ? (s = e, e = e.next) : (s = i, i = i.next), t && t.mode == s.mode && !s.context && !t.context)
        continue;
      let r = new Ql(s.tags, s.mode, s.context);
      t ? t.next = r : n = r, t = r;
    }
    return n;
  }
});
class Ql {
  constructor(e, t, n, s) {
    this.tags = e, this.mode = t, this.context = n, this.next = s;
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
Ql.empty = new Ql([], 2, null);
function Xx(i, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r of i)
    if (!Array.isArray(r.tag))
      t[r.tag.id] = r.class;
    else
      for (let o of r.tag)
        t[o.id] = r.class;
  let { scope: n, all: s = null } = {};
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
    scope: n
  };
}
const ie = di.define, zo = ie(), kn = ie(), zu = ie(kn), Nu = ie(kn), Qn = ie(), No = ie(Qn), Na = ie(Qn), Di = ie(), Yn = ie(Di), Li = ie(), Ii = ie(), Jh = ie(), xr = ie(Jh), Yo = ie(), W = {
  /**
  A comment.
  */
  comment: zo,
  /**
  A line [comment](#highlight.tags.comment).
  */
  lineComment: ie(zo),
  /**
  A block [comment](#highlight.tags.comment).
  */
  blockComment: ie(zo),
  /**
  A documentation [comment](#highlight.tags.comment).
  */
  docComment: ie(zo),
  /**
  Any kind of identifier.
  */
  name: kn,
  /**
  The [name](#highlight.tags.name) of a variable.
  */
  variableName: ie(kn),
  /**
  A type [name](#highlight.tags.name).
  */
  typeName: zu,
  /**
  A tag name (subtag of [`typeName`](#highlight.tags.typeName)).
  */
  tagName: ie(zu),
  /**
  A property or field [name](#highlight.tags.name).
  */
  propertyName: Nu,
  /**
  An attribute name (subtag of [`propertyName`](#highlight.tags.propertyName)).
  */
  attributeName: ie(Nu),
  /**
  The [name](#highlight.tags.name) of a class.
  */
  className: ie(kn),
  /**
  A label [name](#highlight.tags.name).
  */
  labelName: ie(kn),
  /**
  A namespace [name](#highlight.tags.name).
  */
  namespace: ie(kn),
  /**
  The [name](#highlight.tags.name) of a macro.
  */
  macroName: ie(kn),
  /**
  A literal value.
  */
  literal: Qn,
  /**
  A string [literal](#highlight.tags.literal).
  */
  string: No,
  /**
  A documentation [string](#highlight.tags.string).
  */
  docString: ie(No),
  /**
  A character literal (subtag of [string](#highlight.tags.string)).
  */
  character: ie(No),
  /**
  An attribute value (subtag of [string](#highlight.tags.string)).
  */
  attributeValue: ie(No),
  /**
  A number [literal](#highlight.tags.literal).
  */
  number: Na,
  /**
  An integer [number](#highlight.tags.number) literal.
  */
  integer: ie(Na),
  /**
  A floating-point [number](#highlight.tags.number) literal.
  */
  float: ie(Na),
  /**
  A boolean [literal](#highlight.tags.literal).
  */
  bool: ie(Qn),
  /**
  Regular expression [literal](#highlight.tags.literal).
  */
  regexp: ie(Qn),
  /**
  An escape [literal](#highlight.tags.literal), for example a
  backslash escape in a string.
  */
  escape: ie(Qn),
  /**
  A color [literal](#highlight.tags.literal).
  */
  color: ie(Qn),
  /**
  A URL [literal](#highlight.tags.literal).
  */
  url: ie(Qn),
  /**
  A language keyword.
  */
  keyword: Li,
  /**
  The [keyword](#highlight.tags.keyword) for the self or this
  object.
  */
  self: ie(Li),
  /**
  The [keyword](#highlight.tags.keyword) for null.
  */
  null: ie(Li),
  /**
  A [keyword](#highlight.tags.keyword) denoting some atomic value.
  */
  atom: ie(Li),
  /**
  A [keyword](#highlight.tags.keyword) that represents a unit.
  */
  unit: ie(Li),
  /**
  A modifier [keyword](#highlight.tags.keyword).
  */
  modifier: ie(Li),
  /**
  A [keyword](#highlight.tags.keyword) that acts as an operator.
  */
  operatorKeyword: ie(Li),
  /**
  A control-flow related [keyword](#highlight.tags.keyword).
  */
  controlKeyword: ie(Li),
  /**
  A [keyword](#highlight.tags.keyword) that defines something.
  */
  definitionKeyword: ie(Li),
  /**
  A [keyword](#highlight.tags.keyword) related to defining or
  interfacing with modules.
  */
  moduleKeyword: ie(Li),
  /**
  An operator.
  */
  operator: Ii,
  /**
  An [operator](#highlight.tags.operator) that dereferences something.
  */
  derefOperator: ie(Ii),
  /**
  Arithmetic-related [operator](#highlight.tags.operator).
  */
  arithmeticOperator: ie(Ii),
  /**
  Logical [operator](#highlight.tags.operator).
  */
  logicOperator: ie(Ii),
  /**
  Bit [operator](#highlight.tags.operator).
  */
  bitwiseOperator: ie(Ii),
  /**
  Comparison [operator](#highlight.tags.operator).
  */
  compareOperator: ie(Ii),
  /**
  [Operator](#highlight.tags.operator) that updates its operand.
  */
  updateOperator: ie(Ii),
  /**
  [Operator](#highlight.tags.operator) that defines something.
  */
  definitionOperator: ie(Ii),
  /**
  Type-related [operator](#highlight.tags.operator).
  */
  typeOperator: ie(Ii),
  /**
  Control-flow [operator](#highlight.tags.operator).
  */
  controlOperator: ie(Ii),
  /**
  Program or markup punctuation.
  */
  punctuation: Jh,
  /**
  [Punctuation](#highlight.tags.punctuation) that separates
  things.
  */
  separator: ie(Jh),
  /**
  Bracket-style [punctuation](#highlight.tags.punctuation).
  */
  bracket: xr,
  /**
  Angle [brackets](#highlight.tags.bracket) (usually `<` and `>`
  tokens).
  */
  angleBracket: ie(xr),
  /**
  Square [brackets](#highlight.tags.bracket) (usually `[` and `]`
  tokens).
  */
  squareBracket: ie(xr),
  /**
  Parentheses (usually `(` and `)` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  paren: ie(xr),
  /**
  Braces (usually `{` and `}` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  brace: ie(xr),
  /**
  Content, for example plain text in XML or markup documents.
  */
  content: Di,
  /**
  [Content](#highlight.tags.content) that represents a heading.
  */
  heading: Yn,
  /**
  A level 1 [heading](#highlight.tags.heading).
  */
  heading1: ie(Yn),
  /**
  A level 2 [heading](#highlight.tags.heading).
  */
  heading2: ie(Yn),
  /**
  A level 3 [heading](#highlight.tags.heading).
  */
  heading3: ie(Yn),
  /**
  A level 4 [heading](#highlight.tags.heading).
  */
  heading4: ie(Yn),
  /**
  A level 5 [heading](#highlight.tags.heading).
  */
  heading5: ie(Yn),
  /**
  A level 6 [heading](#highlight.tags.heading).
  */
  heading6: ie(Yn),
  /**
  A prose [content](#highlight.tags.content) separator (such as a horizontal rule).
  */
  contentSeparator: ie(Di),
  /**
  [Content](#highlight.tags.content) that represents a list.
  */
  list: ie(Di),
  /**
  [Content](#highlight.tags.content) that represents a quote.
  */
  quote: ie(Di),
  /**
  [Content](#highlight.tags.content) that is emphasized.
  */
  emphasis: ie(Di),
  /**
  [Content](#highlight.tags.content) that is styled strong.
  */
  strong: ie(Di),
  /**
  [Content](#highlight.tags.content) that is part of a link.
  */
  link: ie(Di),
  /**
  [Content](#highlight.tags.content) that is styled as code or
  monospace.
  */
  monospace: ie(Di),
  /**
  [Content](#highlight.tags.content) that has a strike-through
  style.
  */
  strikethrough: ie(Di),
  /**
  Inserted text in a change-tracking format.
  */
  inserted: ie(),
  /**
  Deleted text.
  */
  deleted: ie(),
  /**
  Changed text.
  */
  changed: ie(),
  /**
  An invalid or unsyntactic element.
  */
  invalid: ie(),
  /**
  Metadata or meta-instruction.
  */
  meta: Yo,
  /**
  [Metadata](#highlight.tags.meta) that applies to the entire
  document.
  */
  documentMeta: ie(Yo),
  /**
  [Metadata](#highlight.tags.meta) that annotates or adds
  attributes to a given syntactic element.
  */
  annotation: ie(Yo),
  /**
  Processing instruction or preprocessor directive. Subtag of
  [meta](#highlight.tags.meta).
  */
  processingInstruction: ie(Yo),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that a
  given element is being defined. Expected to be used with the
  various [name](#highlight.tags.name) tags.
  */
  definition: di.defineModifier("definition"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that
  something is constant. Mostly expected to be used with
  [variable names](#highlight.tags.variableName).
  */
  constant: di.defineModifier("constant"),
  /**
  [Modifier](#highlight.Tag^defineModifier) used to indicate that
  a [variable](#highlight.tags.variableName) or [property
  name](#highlight.tags.propertyName) is being called or defined
  as a function.
  */
  function: di.defineModifier("function"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that can be applied to
  [names](#highlight.tags.name) to indicate that they belong to
  the language's standard environment.
  */
  standard: di.defineModifier("standard"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates a given
  [names](#highlight.tags.name) is local to some scope.
  */
  local: di.defineModifier("local"),
  /**
  A generic variant [modifier](#highlight.Tag^defineModifier) that
  can be used to tag language-specific alternative variants of
  some common tag. It is recommended for themes to define special
  forms of at least the [string](#highlight.tags.string) and
  [variable name](#highlight.tags.variableName) tags, since those
  come up a lot.
  */
  special: di.defineModifier("special")
};
for (let i in W) {
  let e = W[i];
  e instanceof di && (e.name = i);
}
Xx([
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
var Ya;
const Ar = /* @__PURE__ */ new _e();
function hg(i) {
  return me.define({
    combine: i ? (e) => e.concat(i) : void 0
  });
}
const Jc = /* @__PURE__ */ new _e();
class Fi {
  /**
  Construct a language object. If you need to invoke this
  directly, first define a data facet with
  [`defineLanguageFacet`](https://codemirror.net/6/docs/ref/#language.defineLanguageFacet), and then
  configure your parser to [attach](https://codemirror.net/6/docs/ref/#language.languageDataProp) it
  to the language's outer syntax node.
  */
  constructor(e, t, n = [], s = "") {
    this.data = e, this.name = s, Xe.prototype.hasOwnProperty("tree") || Object.defineProperty(Xe.prototype, "tree", { get() {
      return Si(this);
    } }), this.parser = t, this.extension = [
      cr.of(this),
      Xe.languageData.of((r, o, l) => {
        let a = Yu(r, o, l), h = a.type.prop(Ar);
        if (!h)
          return [];
        let c = r.facet(h), f = a.type.prop(Jc);
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
    ].concat(n);
  }
  /**
  Query whether this language is active at the given position.
  */
  isActiveAt(e, t, n = -1) {
    return Yu(e, t, n).type.prop(Ar) == this.data;
  }
  /**
  Find the document regions that were parsed using this language.
  The returned regions will _include_ any nested languages rooted
  in this language, when those exist.
  */
  findRegions(e) {
    let t = e.facet(cr);
    if ((t == null ? void 0 : t.data) == this.data)
      return [{ from: 0, to: e.doc.length }];
    if (!t || !t.allowsNesting)
      return [];
    let n = [], s = (r, o) => {
      if (r.prop(Ar) == this.data) {
        n.push({ from: o, to: o + r.length });
        return;
      }
      let l = r.prop(_e.mounted);
      if (l) {
        if (l.tree.prop(Ar) == this.data) {
          if (l.overlay)
            for (let a of l.overlay)
              n.push({ from: a.from + o, to: a.to + o });
          else
            n.push({ from: o, to: o + r.length });
          return;
        } else if (l.overlay) {
          let a = n.length;
          if (s(l.tree, l.overlay[0].from + o), n.length > a)
            return;
        }
      }
      for (let a = 0; a < r.children.length; a++) {
        let h = r.children[a];
        h instanceof ft && s(h, r.positions[a] + o);
      }
    };
    return s(Si(e), 0), n;
  }
  /**
  Indicates whether this language allows nested languages. The
  default implementation returns true.
  */
  get allowsNesting() {
    return !0;
  }
}
Fi.setState = /* @__PURE__ */ Ne.define();
function Yu(i, e, t) {
  let n = i.facet(cr), s = Si(i).topNode;
  if (!n || n.allowsNesting)
    for (let r = s; r; r = r.enter(e, t, nt.ExcludeBuffers | nt.EnterBracketed))
      r.type.isTop && (s = r);
  return s;
}
class $l extends Fi {
  constructor(e, t, n) {
    super(e, t, [], n), this.parser = t;
  }
  /**
  Define a language from a parser.
  */
  static define(e) {
    let t = hg(e.languageData);
    return new $l(t, e.parser.configure({
      props: [Ar.add((n) => n.isTop ? t : void 0)]
    }), e.name);
  }
  /**
  Create a new instance of this language with a reconfigured
  version of its parser and optionally a new name.
  */
  configure(e, t) {
    return new $l(this.data, this.parser.configure(e), t || this.name);
  }
  get allowsNesting() {
    return this.parser.hasWrappers();
  }
}
function Si(i) {
  let e = i.field(Fi.state, !1);
  return e ? e.tree : ft.empty;
}
class jx {
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
    let n = this.cursorPos - this.string.length;
    return e < n || t >= this.cursorPos ? this.doc.sliceString(e, t) : this.string.slice(e - n, t - n);
  }
}
let Sr = null;
class _l {
  constructor(e, t, n = [], s, r, o, l, a) {
    this.parser = e, this.state = t, this.fragments = n, this.tree = s, this.treeLen = r, this.viewport = o, this.skipped = l, this.scheduleOn = a, this.parse = null, this.tempSkipped = [];
  }
  /**
  @internal
  */
  static create(e, t, n) {
    return new _l(e, t, [], ft.empty, 0, n, [], null);
  }
  startParse() {
    return this.parser.startParse(new jx(this.state.doc), this.fragments);
  }
  /**
  @internal
  */
  work(e, t) {
    return t != null && t >= this.state.doc.length && (t = void 0), this.tree != ft.empty && this.isDone(t ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
      var n;
      if (typeof e == "number") {
        let s = Date.now() + e;
        e = () => Date.now() > s;
      }
      for (this.parse || (this.parse = this.startParse()), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t); ; ) {
        let s = this.parse.advance();
        if (s)
          if (this.fragments = this.withoutTempSkipped(ls.addTree(s, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (n = this.parse.stoppedAt) !== null && n !== void 0 ? n : this.state.doc.length, this.tree = s, this.parse = null, this.treeLen < (t ?? this.state.doc.length))
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
    }), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(ls.addTree(this.tree, this.fragments, !0)), this.parse = null);
  }
  withContext(e) {
    let t = Sr;
    Sr = this;
    try {
      return e();
    } finally {
      Sr = t;
    }
  }
  withoutTempSkipped(e) {
    for (let t; t = this.tempSkipped.pop(); )
      e = Wu(e, t.from, t.to);
    return e;
  }
  /**
  @internal
  */
  changes(e, t) {
    let { fragments: n, tree: s, treeLen: r, viewport: o, skipped: l } = this;
    if (this.takeTree(), !e.empty) {
      let a = [];
      if (e.iterChangedRanges((h, c, f, d) => a.push({ fromA: h, toA: c, fromB: f, toB: d })), n = ls.applyChanges(n, a), s = ft.empty, r = 0, o = { from: e.mapPos(o.from, -1), to: e.mapPos(o.to, 1) }, this.skipped.length) {
        l = [];
        for (let h of this.skipped) {
          let c = e.mapPos(h.from, 1), f = e.mapPos(h.to, -1);
          c < f && l.push({ from: c, to: f });
        }
      }
    }
    return new _l(this.parser, t, n, s, r, o, l, this.scheduleOn);
  }
  /**
  @internal
  */
  updateViewport(e) {
    if (this.viewport.from == e.from && this.viewport.to == e.to)
      return !1;
    this.viewport = e;
    let t = this.skipped.length;
    for (let n = 0; n < this.skipped.length; n++) {
      let { from: s, to: r } = this.skipped[n];
      s < e.to && r > e.from && (this.fragments = Wu(this.fragments, s, r), this.skipped.splice(n--, 1));
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
    return new class extends lg {
      createParse(t, n, s) {
        let r = s[0].from, o = s[s.length - 1].to;
        return {
          parsedPos: r,
          advance() {
            let a = Sr;
            if (a) {
              for (let h of s)
                a.tempSkipped.push(h);
              e && (a.scheduleOn = a.scheduleOn ? Promise.all([a.scheduleOn, e]) : e);
            }
            return this.parsedPos = o, new ft(Ft.none, [], [], o - r);
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
    return Sr;
  }
}
function Wu(i, e, t) {
  return ls.applyChanges(i, [{ fromA: e, toA: t, fromB: e, toB: t }]);
}
class hr {
  constructor(e) {
    this.context = e, this.tree = e.tree;
  }
  apply(e) {
    if (!e.docChanged && this.tree == this.context.tree)
      return this;
    let t = this.context.changes(e.changes, e.state), n = this.context.treeLen == e.startState.doc.length ? void 0 : Math.max(e.changes.mapPos(this.context.treeLen), t.viewport.to);
    return t.work(20, n) || t.takeTree(), new hr(t);
  }
  static init(e) {
    let t = Math.min(3e3, e.doc.length), n = _l.create(e.facet(cr).parser, e, { from: 0, to: t });
    return n.work(20, t) || n.takeTree(), new hr(n);
  }
}
Fi.state = /* @__PURE__ */ sn.define({
  create: hr.init,
  update(i, e) {
    for (let t of e.effects)
      if (t.is(Fi.setState))
        return t.value;
    return e.startState.facet(cr) != e.state.facet(cr) ? hr.init(e.state) : i.apply(e);
  }
});
let cg = (i) => {
  let e = setTimeout(
    () => i(),
    500
    /* Work.MaxPause */
  );
  return () => clearTimeout(e);
};
typeof requestIdleCallback < "u" && (cg = (i) => {
  let e = -1, t = setTimeout(
    () => {
      e = requestIdleCallback(i, {
        timeout: 400
        /* Work.MinPause */
      });
    },
    100
    /* Work.MinPause */
  );
  return () => e < 0 ? clearTimeout(t) : cancelIdleCallback(e);
});
const Wa = typeof navigator < "u" && (!((Ya = navigator.scheduling) === null || Ya === void 0) && Ya.isInputPending) ? () => navigator.scheduling.isInputPending() : null, Lx = /* @__PURE__ */ en.fromClass(class {
  constructor(e) {
    this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
  }
  update(e) {
    let t = this.view.state.field(Fi.state).context;
    (t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), (e.docChanged || e.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t);
  }
  scheduleWork() {
    if (this.working)
      return;
    let { state: e } = this.view, t = e.field(Fi.state);
    (t.tree != t.context.tree || !t.context.isDone(e.doc.length)) && (this.working = cg(this.work));
  }
  work(e) {
    this.working = null;
    let t = Date.now();
    if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0)
      return;
    let { state: n, viewport: { to: s } } = this.view, r = n.field(Fi.state);
    if (r.tree == r.context.tree && r.context.isDone(
      s + 1e5
      /* Work.MaxParseAhead */
    ))
      return;
    let o = Date.now() + Math.min(this.chunkBudget, 100, e && !Wa ? Math.max(25, e.timeRemaining() - 5) : 1e9), l = r.context.treeLen < s && n.doc.length > s + 1e3, a = r.context.work(() => Wa && Wa() || Date.now() > o, s + (l ? 0 : 1e5));
    this.chunkBudget -= Date.now() - t, (a || this.chunkBudget <= 0) && (r.context.takeTree(), this.view.dispatch({ effects: Fi.setState.of(new hr(r.context)) })), this.chunkBudget > 0 && !(a && !l) && this.scheduleWork(), this.checkAsyncSchedule(r.context);
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
}), cr = /* @__PURE__ */ me.define({
  combine(i) {
    return i.length ? i[0] : null;
  },
  enables: (i) => [
    Fi.state,
    Lx,
    ge.contentAttributes.compute([i], (e) => {
      let t = e.facet(i);
      return t && t.name ? { "data-language": t.name } : {};
    })
  ]
});
class Ix {
  /**
  Create a language support object.
  */
  constructor(e, t = []) {
    this.language = e, this.support = t, this.extension = [e, t];
  }
}
const Dx = /* @__PURE__ */ me.define(), na = /* @__PURE__ */ me.define({
  combine: (i) => {
    if (!i.length)
      return "  ";
    let e = i[0];
    if (!e || /\S/.test(e) || Array.from(e).some((t) => t != e[0]))
      throw new Error("Invalid indent unit: " + JSON.stringify(i[0]));
    return e;
  }
});
function Pl(i) {
  let e = i.facet(na);
  return e.charCodeAt(0) == 9 ? i.tabSize * e.length : e.length;
}
function Tl(i, e) {
  let t = "", n = i.tabSize, s = i.facet(na)[0];
  if (s == "	") {
    for (; e >= n; )
      t += "	", e -= n;
    s = " ";
  }
  for (let r = 0; r < e; r++)
    t += s;
  return t;
}
function fg(i, e) {
  i instanceof Xe && (i = new sa(i));
  for (let n of i.state.facet(Dx)) {
    let s = n(i, e);
    if (s !== void 0)
      return s;
  }
  let t = Si(i.state);
  return t.length >= e ? zx(i, t, e) : null;
}
class sa {
  /**
  Create an indent context.
  */
  constructor(e, t = {}) {
    this.state = e, this.options = t, this.unit = Pl(e);
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
    let n = this.state.doc.lineAt(e), { simulateBreak: s, simulateDoubleBreak: r } = this.options;
    return s != null && s >= n.from && s <= n.to ? r && s == e ? { text: "", from: e } : (t < 0 ? s < e : s <= e) ? { text: n.text.slice(s - n.from), from: s } : { text: n.text.slice(0, s - n.from), from: n.from } : n;
  }
  /**
  Get the text directly after `pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  textAfterPos(e, t = 1) {
    if (this.options.simulateDoubleBreak && e == this.options.simulateBreak)
      return "";
    let { text: n, from: s } = this.lineAt(e, t);
    return n.slice(e - s, Math.min(n.length, e + 100 - s));
  }
  /**
  Find the column for the given position.
  */
  column(e, t = 1) {
    let { text: n, from: s } = this.lineAt(e, t), r = this.countColumn(n, e - s), o = this.options.overrideIndentation ? this.options.overrideIndentation(s) : -1;
    return o > -1 && (r += o - this.countColumn(n, n.search(/\S|$/))), r;
  }
  /**
  Find the column position (taking tabs into account) of the given
  position in the given string.
  */
  countColumn(e, t = e.length) {
    return Fl(e, this.state.tabSize, t);
  }
  /**
  Find the indentation column of the line at the given point.
  */
  lineIndent(e, t = 1) {
    let { text: n, from: s } = this.lineAt(e, t), r = this.options.overrideIndentation;
    if (r) {
      let o = r(s);
      if (o > -1)
        return o;
    }
    return this.countColumn(n, n.search(/\S|$/));
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
const ug = /* @__PURE__ */ new _e();
function zx(i, e, t) {
  let n = e.resolveStack(t), s = e.resolveInner(t, -1).resolve(t, 0).enterUnfinishedNodesBefore(t);
  if (s != n.node) {
    let r = [];
    for (let o = s; o && !(o.from < n.node.from || o.to > n.node.to || o.from == n.node.from && o.type == n.node.type); o = o.parent)
      r.push(o);
    for (let o = r.length - 1; o >= 0; o--)
      n = { node: r[o], next: n };
  }
  return dg(n, i, t);
}
function dg(i, e, t) {
  for (let n = i; n; n = n.next) {
    let s = Yx(n.node);
    if (s)
      return s(ef.create(e, t, n));
  }
  return 0;
}
function Nx(i) {
  return i.pos == i.options.simulateBreak && i.options.simulateDoubleBreak;
}
function Yx(i) {
  let e = i.type.prop(ug);
  if (e)
    return e;
  let t = i.firstChild, n;
  if (t && (n = t.type.prop(_e.closedBy))) {
    let s = i.lastChild, r = s && n.indexOf(s.name) > -1;
    return (o) => pg(o, !0, 1, void 0, r && !Nx(o) ? s.from : void 0);
  }
  return i.parent == null ? Wx : null;
}
function Wx() {
  return 0;
}
class ef extends sa {
  constructor(e, t, n) {
    super(e.state, e.options), this.base = e, this.pos = t, this.context = n;
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
  static create(e, t, n) {
    return new ef(e, t, n);
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
      let n = e.resolve(t.from);
      for (; n.parent && n.parent.from == n.from; )
        n = n.parent;
      if (qx(n, e))
        break;
      t = this.state.doc.lineAt(n.from);
    }
    return this.lineIndent(t.from);
  }
  /**
  Continue looking for indentations in the node's parent nodes,
  and return the result of that.
  */
  continue() {
    return dg(this.context.next, this.base, this.pos);
  }
}
function qx(i, e) {
  for (let t = e; t; t = t.parent)
    if (i == t)
      return !0;
  return !1;
}
function Vx(i) {
  let e = i.node, t = e.childAfter(e.from), n = e.lastChild;
  if (!t)
    return null;
  let s = i.options.simulateBreak, r = i.state.doc.lineAt(t.from), o = s == null || s <= r.from ? r.to : Math.min(r.to, s);
  for (let l = t.to; ; ) {
    let a = e.childAfter(l);
    if (!a || a == n)
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
function Bx({ closing: i, align: e = !0, units: t = 1 }) {
  return (n) => pg(n, e, t, i);
}
function pg(i, e, t, n, s) {
  let r = i.textAfter, o = r.match(/^\s*/)[0].length, l = n && r.slice(o, o + n.length) == n || s == i.pos + o, a = e ? Vx(i) : null;
  return a ? l ? i.column(a.from) : i.column(a.to) : i.baseIndent + (l ? 0 : i.unit * t);
}
const Gx = (i) => i.baseIndent;
function qa({ except: i, units: e = 1 } = {}) {
  return (t) => {
    let n = i && i.test(t.textAfter);
    return t.baseIndent + (n ? 0 : e * t.unit);
  };
}
const Ux = /* @__PURE__ */ new _e();
function Fx(i) {
  let e = i.firstChild, t = i.lastChild;
  return e && e.to < t.from ? { from: e.to, to: t.type.isError ? i.to : t.from } : null;
}
const Hx = /* @__PURE__ */ ge.baseTheme({
  "&.cm-focused .cm-matchingBracket": { backgroundColor: "#328c8252" },
  "&.cm-focused .cm-nonmatchingBracket": { backgroundColor: "#bb555544" }
}), Og = 1e4, gg = "()[]{}", mg = /* @__PURE__ */ me.define({
  combine(i) {
    return Mc(i, {
      afterCursor: !0,
      brackets: gg,
      maxScanDistance: Og,
      renderMatch: eS
    });
  }
}), Kx = /* @__PURE__ */ We.mark({ class: "cm-matchingBracket" }), Jx = /* @__PURE__ */ We.mark({ class: "cm-nonmatchingBracket" });
function eS(i) {
  let e = [], t = i.matched ? Kx : Jx;
  return e.push(t.range(i.start.from, i.start.to)), i.end && e.push(t.range(i.end.from, i.end.to)), e;
}
function qu(i) {
  let e = [], t = i.facet(mg);
  for (let n of i.selection.ranges) {
    if (!n.empty)
      continue;
    let s = Hi(i, n.head, -1, t) || n.head > 0 && Hi(i, n.head - 1, 1, t) || t.afterCursor && (Hi(i, n.head, 1, t) || n.head < i.doc.length && Hi(i, n.head + 1, -1, t));
    s && (e = e.concat(t.renderMatch(s, i)));
  }
  return We.set(e, !0);
}
const tS = /* @__PURE__ */ en.fromClass(class {
  constructor(i) {
    this.paused = !1, this.decorations = qu(i.state);
  }
  update(i) {
    (i.docChanged || i.selectionSet || this.paused) && (i.view.composing ? (this.decorations = this.decorations.map(i.changes), this.paused = !0) : (this.decorations = qu(i.state), this.paused = !1));
  }
}, {
  decorations: (i) => i.decorations
}), iS = [
  tS,
  Hx
];
function nS(i = {}) {
  return [mg.of(i), iS];
}
const sS = /* @__PURE__ */ new _e();
function ec(i, e, t) {
  let n = i.prop(e < 0 ? _e.openedBy : _e.closedBy);
  if (n)
    return n;
  if (i.name.length == 1) {
    let s = t.indexOf(i.name);
    if (s > -1 && s % 2 == (e < 0 ? 1 : 0))
      return [t[s + e]];
  }
  return null;
}
function tc(i) {
  let e = i.type.prop(sS);
  return e ? e(i.node) : i;
}
function Hi(i, e, t, n = {}) {
  let s = n.maxScanDistance || Og, r = n.brackets || gg, o = Si(i), l = o.resolveInner(e, t);
  for (let a = l; a; a = a.parent) {
    let h = ec(a.type, t, r);
    if (h && a.from < a.to) {
      let c = tc(a);
      if (c && (t > 0 ? e >= c.from && e < c.to : e > c.from && e <= c.to))
        return rS(i, e, t, a, c, h, r);
    }
  }
  return oS(i, e, t, o, l.type, s, r);
}
function rS(i, e, t, n, s, r, o) {
  let l = n.parent, a = { from: s.from, to: s.to }, h = 0, c = l == null ? void 0 : l.cursor();
  if (c && (t < 0 ? c.childBefore(n.from) : c.childAfter(n.to)))
    do
      if (t < 0 ? c.to <= n.from : c.from >= n.to) {
        if (h == 0 && r.indexOf(c.type.name) > -1 && c.from < c.to) {
          let f = tc(c);
          return { start: a, end: f ? { from: f.from, to: f.to } : void 0, matched: !0 };
        } else if (ec(c.type, t, o))
          h++;
        else if (ec(c.type, -t, o)) {
          if (h == 0) {
            let f = tc(c);
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
function oS(i, e, t, n, s, r, o) {
  if (t < 0 ? !e : e == i.doc.length)
    return null;
  let l = t < 0 ? i.sliceDoc(e - 1, e) : i.sliceDoc(e, e + 1), a = o.indexOf(l);
  if (a < 0 || a % 2 == 0 != t > 0)
    return null;
  let h = { from: t < 0 ? e - 1 : e, to: t > 0 ? e + 1 : e }, c = i.doc.iterRange(e, t > 0 ? i.doc.length : 0), f = 0;
  for (let d = 0; !c.next().done && d <= r; ) {
    let p = c.value;
    t < 0 && (d += p.length);
    let O = e + d * t;
    for (let g = t > 0 ? 0 : p.length - 1, m = t > 0 ? p.length : -1; g != m; g += t) {
      let v = o.indexOf(p[g]);
      if (!(v < 0 || n.resolveInner(O + g, 1).type != s))
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
const lS = /* @__PURE__ */ Object.create(null), Vu = [Ft.none], Bu = [], Gu = /* @__PURE__ */ Object.create(null), aS = /* @__PURE__ */ Object.create(null);
for (let [i, e] of [
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
  aS[i] = /* @__PURE__ */ hS(lS, e);
function Va(i, e) {
  Bu.indexOf(i) > -1 || (Bu.push(i), console.warn(e));
}
function hS(i, e) {
  let t = [];
  for (let l of e.split(" ")) {
    let a = [];
    for (let h of l.split(".")) {
      let c = i[h] || W[h];
      c ? typeof c == "function" ? a.length ? a = a.map(c) : Va(h, `Modifier ${h} used at start of tag`) : a.length ? Va(h, `Tag ${h} used as modifier`) : a = Array.isArray(c) ? c : [c] : Va(h, `Unknown highlighting tag ${h}`);
    }
    for (let h of a)
      t.push(h);
  }
  if (!t.length)
    return 0;
  let n = e.replace(/ /g, "_"), s = n + " " + t.map((l) => l.id), r = Gu[s];
  if (r)
    return r.id;
  let o = Gu[s] = Ft.define({
    id: Vu.length,
    name: n,
    props: [ag({ [n]: t })]
  });
  return Vu.push(o), o.id;
}
lt.RTL, lt.LTR;
const cS = (i) => {
  let { state: e } = i, t = e.doc.lineAt(e.selection.main.from), n = nf(i.state, t.from);
  return n.line ? fS(i) : n.block ? dS(i) : !1;
};
function tf(i, e) {
  return ({ state: t, dispatch: n }) => {
    if (t.readOnly)
      return !1;
    let s = i(e, t);
    return s ? (n(t.update(s)), !0) : !1;
  };
}
const fS = /* @__PURE__ */ tf(
  gS,
  0
  /* CommentOption.Toggle */
), uS = /* @__PURE__ */ tf(
  vg,
  0
  /* CommentOption.Toggle */
), dS = /* @__PURE__ */ tf(
  (i, e) => vg(i, e, OS(e)),
  0
  /* CommentOption.Toggle */
);
function nf(i, e) {
  let t = i.languageDataAt("commentTokens", e, 1);
  return t.length ? t[0] : {};
}
const kr = 50;
function pS(i, { open: e, close: t }, n, s) {
  let r = i.sliceDoc(n - kr, n), o = i.sliceDoc(s, s + kr), l = /\s*$/.exec(r)[0].length, a = /^\s*/.exec(o)[0].length, h = r.length - l;
  if (r.slice(h - e.length, h) == e && o.slice(a, a + t.length) == t)
    return {
      open: { pos: n - l, margin: l && 1 },
      close: { pos: s + a, margin: a && 1 }
    };
  let c, f;
  s - n <= 2 * kr ? c = f = i.sliceDoc(n, s) : (c = i.sliceDoc(n, n + kr), f = i.sliceDoc(s - kr, s));
  let d = /^\s*/.exec(c)[0].length, p = /\s*$/.exec(f)[0].length, O = f.length - p - t.length;
  return c.slice(d, d + e.length) == e && f.slice(O, O + t.length) == t ? {
    open: {
      pos: n + d + e.length,
      margin: /\s/.test(c.charAt(d + e.length)) ? 1 : 0
    },
    close: {
      pos: s - p - t.length,
      margin: /\s/.test(f.charAt(O - 1)) ? 1 : 0
    }
  } : null;
}
function OS(i) {
  let e = [];
  for (let t of i.selection.ranges) {
    let n = i.doc.lineAt(t.from), s = t.to <= n.to ? n : i.doc.lineAt(t.to);
    s.from > n.from && s.from == t.to && (s = t.to == n.to + 1 ? n : i.doc.lineAt(t.to - 1));
    let r = e.length - 1;
    r >= 0 && e[r].to > n.from ? e[r].to = s.to : e.push({ from: n.from + /^\s*/.exec(n.text)[0].length, to: s.to });
  }
  return e;
}
function vg(i, e, t = e.selection.ranges) {
  let n = t.map((r) => nf(e, r.from).block);
  if (!n.every((r) => r))
    return null;
  let s = t.map((r, o) => pS(e, n[o], r.from, r.to));
  if (i != 2 && !s.every((r) => r))
    return { changes: e.changes(t.map((r, o) => s[o] ? [] : [{ from: r.from, insert: n[o].open + " " }, { from: r.to, insert: " " + n[o].close }])) };
  if (i != 1 && s.some((r) => r)) {
    let r = [];
    for (let o = 0, l; o < s.length; o++)
      if (l = s[o]) {
        let a = n[o], { open: h, close: c } = l;
        r.push({ from: h.pos - a.open.length, to: h.pos + h.margin }, { from: c.pos - c.margin, to: c.pos + a.close.length });
      }
    return { changes: r };
  }
  return null;
}
function gS(i, e, t = e.selection.ranges) {
  let n = [], s = -1;
  e: for (let { from: r, to: o } of t) {
    let l = n.length, a = 1e9, h;
    for (let c = r; c <= o; ) {
      let f = e.doc.lineAt(c);
      if (h == null && (h = nf(e, f.from).line, !h))
        continue e;
      if (f.from > s && (r == o || o > f.from)) {
        s = f.from;
        let d = /^\s*/.exec(f.text)[0].length, p = d == f.length, O = f.text.slice(d, d + h.length) == h ? d : -1;
        d < f.text.length && d < a && (a = d), n.push({ line: f, comment: O, token: h, indent: d, empty: p, single: !1 });
      }
      c = f.to + 1;
    }
    if (a < 1e9)
      for (let c = l; c < n.length; c++)
        n[c].indent < n[c].line.text.length && (n[c].indent = a);
    n.length == l + 1 && (n[l].single = !0);
  }
  if (i != 2 && n.some((r) => r.comment < 0 && (!r.empty || r.single))) {
    let r = [];
    for (let { line: l, token: a, indent: h, empty: c, single: f } of n)
      (f || !c) && r.push({ from: l.from + h, insert: a + " " });
    let o = e.changes(r);
    return { changes: o, selection: e.selection.map(o, 1) };
  } else if (i != 1 && n.some((r) => r.comment >= 0)) {
    let r = [];
    for (let { line: o, comment: l, token: a } of n)
      if (l >= 0) {
        let h = o.from + l, c = h + a.length;
        o.text[c - o.from] == " " && c++, r.push({ from: h, to: c });
      }
    return { changes: r };
  }
  return null;
}
const ic = /* @__PURE__ */ bn.define(), mS = /* @__PURE__ */ bn.define(), vS = /* @__PURE__ */ me.define(), bg = /* @__PURE__ */ me.define({
  combine(i) {
    return Mc(i, {
      minDepth: 100,
      newGroupDelay: 500,
      joinToEvent: (e, t) => t
    }, {
      minDepth: Math.max,
      newGroupDelay: Math.min,
      joinToEvent: (e, t) => (n, s) => e(n, s) || t(n, s)
    });
  }
}), yg = /* @__PURE__ */ sn.define({
  create() {
    return Ki.empty;
  },
  update(i, e) {
    let t = e.state.facet(bg), n = e.annotation(ic);
    if (n) {
      let a = Bt.fromTransaction(e, n.selection), h = n.side, c = h == 0 ? i.undone : i.done;
      return a ? c = Zl(c, c.length, t.minDepth, a) : c = Sg(c, e.startState.selection), new Ki(h == 0 ? n.rest : c, h == 0 ? c : n.rest);
    }
    let s = e.annotation(mS);
    if ((s == "full" || s == "before") && (i = i.isolate()), e.annotation(Ot.addToHistory) === !1)
      return e.changes.empty ? i : i.addMapping(e.changes.desc);
    let r = Bt.fromTransaction(e), o = e.annotation(Ot.time), l = e.annotation(Ot.userEvent);
    return r ? i = i.addChanges(r, o, l, t, e) : e.selection && (i = i.addSelection(e.startState.selection, o, l, t.newGroupDelay)), (s == "full" || s == "after") && (i = i.isolate()), i;
  },
  toJSON(i) {
    return { done: i.done.map((e) => e.toJSON()), undone: i.undone.map((e) => e.toJSON()) };
  },
  fromJSON(i) {
    return new Ki(i.done.map(Bt.fromJSON), i.undone.map(Bt.fromJSON));
  }
});
function bS(i = {}) {
  return [
    yg,
    bg.of(i),
    ge.domEventHandlers({
      beforeinput(e, t) {
        let n = e.inputType == "historyUndo" ? wg : e.inputType == "historyRedo" ? nc : null;
        return n ? (e.preventDefault(), n(t)) : !1;
      }
    })
  ];
}
function ra(i, e) {
  return function({ state: t, dispatch: n }) {
    if (!e && t.readOnly)
      return !1;
    let s = t.field(yg, !1);
    if (!s)
      return !1;
    let r = s.pop(i, t, e);
    return r ? (n(r), !0) : !1;
  };
}
const wg = /* @__PURE__ */ ra(0, !1), nc = /* @__PURE__ */ ra(1, !1), yS = /* @__PURE__ */ ra(0, !0), wS = /* @__PURE__ */ ra(1, !0);
class Bt {
  constructor(e, t, n, s, r) {
    this.changes = e, this.effects = t, this.mapped = n, this.startSelection = s, this.selectionsAfter = r;
  }
  setSelAfter(e) {
    return new Bt(this.changes, this.effects, this.mapped, this.startSelection, e);
  }
  toJSON() {
    var e, t, n;
    return {
      changes: (e = this.changes) === null || e === void 0 ? void 0 : e.toJSON(),
      mapped: (t = this.mapped) === null || t === void 0 ? void 0 : t.toJSON(),
      startSelection: (n = this.startSelection) === null || n === void 0 ? void 0 : n.toJSON(),
      selectionsAfter: this.selectionsAfter.map((s) => s.toJSON())
    };
  }
  static fromJSON(e) {
    return new Bt(e.changes && mt.fromJSON(e.changes), [], e.mapped && Ji.fromJSON(e.mapped), e.startSelection && B.fromJSON(e.startSelection), e.selectionsAfter.map(B.fromJSON));
  }
  // This does not check `addToHistory` and such, it assumes the
  // transaction needs to be converted to an item. Returns null when
  // there are no changes or effects in the transaction.
  static fromTransaction(e, t) {
    let n = Oi;
    for (let s of e.startState.facet(vS)) {
      let r = s(e);
      r.length && (n = n.concat(r));
    }
    return !n.length && e.changes.empty ? null : new Bt(e.changes.invert(e.startState.doc), n, void 0, t || e.startState.selection, Oi);
  }
  static selection(e) {
    return new Bt(void 0, Oi, void 0, void 0, e);
  }
}
function Zl(i, e, t, n) {
  let s = e + 1 > t + 20 ? e - t - 1 : 0, r = i.slice(s, e);
  return r.push(n), r;
}
function xS(i, e) {
  let t = [], n = !1;
  return i.iterChangedRanges((s, r) => t.push(s, r)), e.iterChangedRanges((s, r, o, l) => {
    for (let a = 0; a < t.length; ) {
      let h = t[a++], c = t[a++];
      l >= h && o <= c && (n = !0);
    }
  }), n;
}
function SS(i, e) {
  return i.ranges.length == e.ranges.length && i.ranges.filter((t, n) => t.empty != e.ranges[n].empty).length === 0;
}
function xg(i, e) {
  return i.length ? e.length ? i.concat(e) : i : e;
}
const Oi = [], kS = 200;
function Sg(i, e) {
  if (i.length) {
    let t = i[i.length - 1], n = t.selectionsAfter.slice(Math.max(0, t.selectionsAfter.length - kS));
    return n.length && n[n.length - 1].eq(e) ? i : (n.push(e), Zl(i, i.length - 1, 1e9, t.setSelAfter(n)));
  } else
    return [Bt.selection([e])];
}
function QS(i) {
  let e = i[i.length - 1], t = i.slice();
  return t[i.length - 1] = e.setSelAfter(e.selectionsAfter.slice(0, e.selectionsAfter.length - 1)), t;
}
function Ba(i, e) {
  if (!i.length)
    return i;
  let t = i.length, n = Oi;
  for (; t; ) {
    let s = $S(i[t - 1], e, n);
    if (s.changes && !s.changes.empty || s.effects.length) {
      let r = i.slice(0, t);
      return r[t - 1] = s, r;
    } else
      e = s.mapped, t--, n = s.selectionsAfter;
  }
  return n.length ? [Bt.selection(n)] : Oi;
}
function $S(i, e, t) {
  let n = xg(i.selectionsAfter.length ? i.selectionsAfter.map((l) => l.map(e)) : Oi, t);
  if (!i.changes)
    return Bt.selection(n);
  let s = i.changes.map(e), r = e.mapDesc(i.changes, !0), o = i.mapped ? i.mapped.composeDesc(r) : r;
  return new Bt(s, Ne.mapEffects(i.effects, e), o, i.startSelection.map(r), n);
}
const _S = /^(input\.type|delete)($|\.)/;
class Ki {
  constructor(e, t, n = 0, s = void 0) {
    this.done = e, this.undone = t, this.prevTime = n, this.prevUserEvent = s;
  }
  isolate() {
    return this.prevTime ? new Ki(this.done, this.undone) : this;
  }
  addChanges(e, t, n, s, r) {
    let o = this.done, l = o[o.length - 1];
    return l && l.changes && !l.changes.empty && e.changes && (!n || _S.test(n)) && (!l.selectionsAfter.length && t - this.prevTime < s.newGroupDelay && s.joinToEvent(r, xS(l.changes, e.changes)) || // For compose (but not compose.start) events, always join with previous event
    n == "input.type.compose") ? o = Zl(o, o.length - 1, s.minDepth, new Bt(e.changes.compose(l.changes), xg(Ne.mapEffects(e.effects, l.changes), l.effects), l.mapped, l.startSelection, Oi)) : o = Zl(o, o.length, s.minDepth, e), new Ki(o, Oi, t, n);
  }
  addSelection(e, t, n, s) {
    let r = this.done.length ? this.done[this.done.length - 1].selectionsAfter : Oi;
    return r.length > 0 && t - this.prevTime < s && n == this.prevUserEvent && n && /^select($|\.)/.test(n) && SS(r[r.length - 1], e) ? this : new Ki(Sg(this.done, e), this.undone, t, n);
  }
  addMapping(e) {
    return new Ki(Ba(this.done, e), Ba(this.undone, e), this.prevTime, this.prevUserEvent);
  }
  pop(e, t, n) {
    let s = e == 0 ? this.done : this.undone;
    if (s.length == 0)
      return null;
    let r = s[s.length - 1], o = r.selectionsAfter[0] || (r.startSelection ? r.startSelection.map(r.changes.invertedDesc, 1) : t.selection);
    if (n && r.selectionsAfter.length)
      return t.update({
        selection: r.selectionsAfter[r.selectionsAfter.length - 1],
        annotations: ic.of({ side: e, rest: QS(s), selection: o }),
        userEvent: e == 0 ? "select.undo" : "select.redo",
        scrollIntoView: !0
      });
    if (r.changes) {
      let l = s.length == 1 ? Oi : s.slice(0, s.length - 1);
      return r.mapped && (l = Ba(l, r.mapped)), t.update({
        changes: r.changes,
        selection: r.startSelection,
        effects: r.effects,
        annotations: ic.of({ side: e, rest: l, selection: o }),
        filter: !1,
        userEvent: e == 0 ? "undo" : "redo",
        scrollIntoView: !0
      });
    } else
      return null;
  }
}
Ki.empty = /* @__PURE__ */ new Ki(Oi, Oi);
const PS = [
  { key: "Mod-z", run: wg, preventDefault: !0 },
  { key: "Mod-y", mac: "Mod-Shift-z", run: nc, preventDefault: !0 },
  { linux: "Ctrl-Shift-z", run: nc, preventDefault: !0 },
  { key: "Mod-u", run: yS, preventDefault: !0 },
  { key: "Alt-u", mac: "Mod-Shift-u", run: wS, preventDefault: !0 }
];
function gr(i, e) {
  return B.create(i.ranges.map(e), i.mainIndex);
}
function Mi(i, e) {
  return i.update({ selection: e, scrollIntoView: !0, userEvent: "select" });
}
function Xi({ state: i, dispatch: e }, t) {
  let n = gr(i.selection, t);
  return n.eq(i.selection, !0) ? !1 : (e(Mi(i, n)), !0);
}
function oa(i, e) {
  return B.cursor(e ? i.to : i.from);
}
function kg(i, e) {
  return Xi(i, (t) => t.empty ? i.moveByChar(t, e) : oa(t, e));
}
function Et(i) {
  return i.textDirectionAt(i.state.selection.main.head) == lt.LTR;
}
const Qg = (i) => kg(i, !Et(i)), $g = (i) => kg(i, Et(i));
function _g(i, e) {
  return Xi(i, (t) => t.empty ? i.moveByGroup(t, e) : oa(t, e));
}
const TS = (i) => _g(i, !Et(i)), ZS = (i) => _g(i, Et(i));
function CS(i, e, t) {
  if (e.type.prop(t))
    return !0;
  let n = e.to - e.from;
  return n && (n > 2 || /[^\s,.;:]/.test(i.sliceDoc(e.from, e.to))) || e.firstChild;
}
function la(i, e, t) {
  let n = Si(i).resolveInner(e.head), s = t ? _e.closedBy : _e.openedBy;
  for (let a = e.head; ; ) {
    let h = t ? n.childAfter(a) : n.childBefore(a);
    if (!h)
      break;
    CS(i, h, s) ? n = h : a = t ? h.to : h.from;
  }
  let r = n.type.prop(s), o, l;
  return r && (o = t ? Hi(i, n.from, 1) : Hi(i, n.to, -1)) && o.matched ? l = t ? o.end.to : o.end.from : l = t ? n.to : n.from, B.cursor(l, t ? -1 : 1);
}
const ES = (i) => Xi(i, (e) => la(i.state, e, !Et(i))), AS = (i) => Xi(i, (e) => la(i.state, e, Et(i)));
function Pg(i, e) {
  return Xi(i, (t) => {
    if (!t.empty)
      return oa(t, e);
    let n = i.moveVertically(t, e);
    return n.head != t.head ? n : i.moveToLineBoundary(t, e);
  });
}
const Tg = (i) => Pg(i, !1), Zg = (i) => Pg(i, !0);
function Cg(i) {
  let e = i.scrollDOM.clientHeight < i.scrollDOM.scrollHeight - 2, t = 0, n = 0, s;
  if (e) {
    for (let r of i.state.facet(ge.scrollMargins)) {
      let o = r(i);
      o != null && o.top && (t = Math.max(o == null ? void 0 : o.top, t)), o != null && o.bottom && (n = Math.max(o == null ? void 0 : o.bottom, n));
    }
    s = i.scrollDOM.clientHeight - t - n;
  } else
    s = (i.dom.ownerDocument.defaultView || window).innerHeight;
  return {
    marginTop: t,
    marginBottom: n,
    selfScroll: e,
    height: Math.max(i.defaultLineHeight, s - 5)
  };
}
function Eg(i, e) {
  let t = Cg(i), { state: n } = i, s = gr(n.selection, (o) => o.empty ? i.moveVertically(o, e, t.height) : oa(o, e));
  if (s.eq(n.selection))
    return !1;
  let r;
  if (t.selfScroll) {
    let o = i.coordsAtPos(n.selection.main.head), l = i.scrollDOM.getBoundingClientRect(), a = l.top + t.marginTop, h = l.bottom - t.marginBottom;
    o && o.top > a && o.bottom < h && (r = ge.scrollIntoView(s.main.head, { y: "start", yMargin: o.top - a }));
  }
  return i.dispatch(Mi(n, s), { effects: r }), !0;
}
const Uu = (i) => Eg(i, !1), sc = (i) => Eg(i, !0);
function Nn(i, e, t) {
  let n = i.lineBlockAt(e.head), s = i.moveToLineBoundary(e, t);
  if (s.head == e.head && s.head != (t ? n.to : n.from) && (s = i.moveToLineBoundary(e, t, !1)), !t && s.head == n.from && n.length) {
    let r = /^\s*/.exec(i.state.sliceDoc(n.from, Math.min(n.from + 100, n.to)))[0].length;
    r && e.head != n.from + r && (s = B.cursor(n.from + r));
  }
  return s;
}
const RS = (i) => Xi(i, (e) => Nn(i, e, !0)), MS = (i) => Xi(i, (e) => Nn(i, e, !1)), XS = (i) => Xi(i, (e) => Nn(i, e, !Et(i))), jS = (i) => Xi(i, (e) => Nn(i, e, Et(i))), LS = (i) => Xi(i, (e) => B.cursor(i.lineBlockAt(e.head).from, 1)), IS = (i) => Xi(i, (e) => B.cursor(i.lineBlockAt(e.head).to, -1));
function DS(i, e, t) {
  let n = !1, s = gr(i.selection, (r) => {
    let o = Hi(i, r.head, -1) || Hi(i, r.head, 1) || r.head > 0 && Hi(i, r.head - 1, 1) || r.head < i.doc.length && Hi(i, r.head + 1, -1);
    if (!o || !o.end)
      return r;
    n = !0;
    let l = o.start.from == r.head ? o.end.to : o.end.from;
    return B.cursor(l);
  });
  return n ? (e(Mi(i, s)), !0) : !1;
}
const zS = ({ state: i, dispatch: e }) => DS(i, e);
function Qi(i, e, t) {
  let n = gr(i.state.selection, (s) => {
    s.undirectional && s.head >= s.anchor != e && (s = B.range(s.head, s.anchor));
    let r = t(s);
    return B.range(s.anchor, r.head, r.goalColumn, r.bidiLevel || void 0, r.assoc);
  });
  return n.eq(i.state.selection) ? !1 : (i.dispatch(Mi(i.state, n)), !0);
}
function Ag(i, e) {
  return Qi(i, e, (t) => i.moveByChar(t, e));
}
const Rg = (i) => Ag(i, !Et(i)), Mg = (i) => Ag(i, Et(i));
function Xg(i, e) {
  return Qi(i, e, (t) => i.moveByGroup(t, e));
}
const NS = (i) => Xg(i, !Et(i)), YS = (i) => Xg(i, Et(i)), WS = (i) => {
  let e = !Et(i);
  return Qi(i, e, (t) => la(i.state, t, e));
}, qS = (i) => {
  let e = Et(i);
  return Qi(i, e, (t) => la(i.state, t, e));
};
function jg(i, e) {
  return Qi(i, e, (t) => i.moveVertically(t, e));
}
const Lg = (i) => jg(i, !1), Ig = (i) => jg(i, !0);
function Dg(i, e) {
  return Qi(i, e, (t) => i.moveVertically(t, e, Cg(i).height));
}
const Fu = (i) => Dg(i, !1), Hu = (i) => Dg(i, !0), VS = (i) => Qi(i, !0, (e) => Nn(i, e, !0)), BS = (i) => Qi(i, !1, (e) => Nn(i, e, !1)), GS = (i) => {
  let e = !Et(i);
  return Qi(i, e, (t) => Nn(i, t, e));
}, US = (i) => {
  let e = Et(i);
  return Qi(i, e, (t) => Nn(i, t, e));
}, FS = (i) => Qi(i, !1, (e) => B.cursor(i.lineBlockAt(e.head).from)), HS = (i) => Qi(i, !0, (e) => B.cursor(i.lineBlockAt(e.head).to)), Ku = ({ state: i, dispatch: e }) => (e(Mi(i, { anchor: 0 })), !0), Ju = ({ state: i, dispatch: e }) => (e(Mi(i, { anchor: i.doc.length })), !0), ed = ({ state: i, dispatch: e }) => (e(Mi(i, { anchor: i.selection.main.anchor, head: 0 })), !0), td = ({ state: i, dispatch: e }) => (e(Mi(i, { anchor: i.selection.main.anchor, head: i.doc.length })), !0), KS = ({ state: i, dispatch: e }) => (e(i.update({ selection: { anchor: 0, head: i.doc.length }, userEvent: "select" })), !0), JS = ({ state: i, dispatch: e }) => {
  let t = aa(i).map(({ from: n, to: s }) => B.range(n, Math.min(s + 1, i.doc.length)));
  return e(i.update({ selection: B.create(t), userEvent: "select" })), !0;
}, ek = ({ state: i, dispatch: e }) => {
  let t = gr(i.selection, (n) => {
    let s = Si(i), r = s.resolveStack(n.from, 1);
    if (n.empty) {
      let o = s.resolveStack(n.from, -1);
      o.node.from >= r.node.from && o.node.to <= r.node.to && (r = o);
    }
    for (let o = r; o; o = o.next) {
      let { node: l } = o;
      if ((l.from < n.from && l.to >= n.to || l.to > n.to && l.from <= n.from) && o.next)
        return B.range(l.to, l.from);
    }
    return n;
  });
  return t.eq(i.selection) ? !1 : (e(Mi(i, t)), !0);
};
function zg(i, e) {
  let { state: t } = i, n = t.selection, s = t.selection.ranges.slice();
  for (let r of t.selection.ranges) {
    let o = t.doc.lineAt(r.head);
    if (e ? o.to < i.state.doc.length : o.from > 0)
      for (let l = r; ; ) {
        let a = i.moveVertically(l, e);
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
  return s.length == n.ranges.length ? !1 : (i.dispatch(Mi(t, B.create(s, s.length - 1))), !0);
}
const tk = (i) => zg(i, !1), ik = (i) => zg(i, !0), nk = ({ state: i, dispatch: e }) => {
  let t = i.selection, n = null;
  return t.ranges.length > 1 ? n = B.create([t.main]) : t.main.empty || (n = B.create([B.cursor(t.main.head)])), n ? (e(Mi(i, n)), !0) : !1;
};
function wo(i, e) {
  if (i.state.readOnly)
    return !1;
  let t = "delete.selection", { state: n } = i, s = n.changeByRange((r) => {
    let { from: o, to: l } = r;
    if (o == l) {
      let a = e(r);
      a < o ? (t = "delete.backward", a = Wo(i, a, !1)) : a > o && (t = "delete.forward", a = Wo(i, a, !0)), o = Math.min(o, a), l = Math.max(l, a);
    } else
      o = Wo(i, o, !1), l = Wo(i, l, !0);
    return o == l ? { range: r } : { changes: { from: o, to: l }, range: B.cursor(o, o < r.head ? -1 : 1) };
  });
  return s.changes.empty ? !1 : (i.dispatch(n.update(s, {
    scrollIntoView: !0,
    userEvent: t,
    effects: t == "delete.selection" ? ge.announce.of(n.phrase("Selection deleted")) : void 0
  })), !0);
}
function Wo(i, e, t) {
  if (i instanceof ge)
    for (let n of i.state.facet(ge.atomicRanges).map((s) => s(i)))
      n.between(e, e, (s, r) => {
        s < e && r > e && (e = t ? r : s);
      });
  return e;
}
const Ng = (i, e, t) => wo(i, (n) => {
  let s = n.from, { state: r } = i, o = r.doc.lineAt(s), l, a;
  if (t && !e && s > o.from && s < o.from + 200 && !/[^ \t]/.test(l = o.text.slice(0, s - o.from))) {
    if (l[l.length - 1] == "	")
      return s - 1;
    let h = Fl(l, r.tabSize), c = h % Pl(r) || Pl(r);
    for (let f = 0; f < c && l[l.length - 1 - f] == " "; f++)
      s--;
    a = s;
  } else
    a = Ct(o.text, s - o.from, e, e) + o.from, a == s && o.number != (e ? r.doc.lines : 1) ? a += e ? 1 : -1 : !e && /[\ufe00-\ufe0f]/.test(o.text.slice(a - o.from, s - o.from)) && (a = Ct(o.text, a - o.from, !1, !1) + o.from);
  return a;
}), rc = (i) => Ng(i, !1, !0), Yg = (i) => Ng(i, !0, !1), Wg = (i, e) => wo(i, (t) => {
  let n = t.head, { state: s } = i, r = s.doc.lineAt(n), o = s.charCategorizer(n);
  for (let l = null; ; ) {
    if (n == (e ? r.to : r.from)) {
      n == t.head && r.number != (e ? s.doc.lines : 1) && (n += e ? 1 : -1);
      break;
    }
    let a = Ct(r.text, n - r.from, e) + r.from, h = r.text.slice(Math.min(n, a) - r.from, Math.max(n, a) - r.from), c = o(h);
    if (l != null && c != l)
      break;
    (h != " " || n != t.head) && (l = c), n = a;
  }
  return n;
}), qg = (i) => Wg(i, !1), sk = (i) => Wg(i, !0), rk = (i) => wo(i, (e) => {
  let t = i.lineBlockAt(e.head).to;
  return e.head < t ? t : Math.min(i.state.doc.length, e.head + 1);
}), ok = (i) => wo(i, (e) => {
  let t = i.moveToLineBoundary(e, !1).head;
  return e.head > t ? t : Math.max(0, e.head - 1);
}), lk = (i) => wo(i, (e) => {
  let t = i.moveToLineBoundary(e, !0).head;
  return e.head < t ? t : Math.min(i.state.doc.length, e.head + 1);
}), ak = ({ state: i, dispatch: e }) => {
  if (i.readOnly)
    return !1;
  let t = i.changeByRange((n) => ({
    changes: { from: n.from, to: n.to, insert: Ae.of(["", ""]) },
    range: B.cursor(n.from)
  }));
  return e(i.update(t, { scrollIntoView: !0, userEvent: "input" })), !0;
}, hk = ({ state: i, dispatch: e }) => {
  if (i.readOnly)
    return !1;
  let t = i.changeByRange((n) => {
    if (!n.empty || n.from == 0 || n.from == i.doc.length)
      return { range: n };
    let s = n.from, r = i.doc.lineAt(s), o = s == r.from ? s - 1 : Ct(r.text, s - r.from, !1) + r.from, l = s == r.to ? s + 1 : Ct(r.text, s - r.from, !0) + r.from;
    return {
      changes: { from: o, to: l, insert: i.doc.slice(s, l).append(i.doc.slice(o, s)) },
      range: B.cursor(l)
    };
  });
  return t.changes.empty ? !1 : (e(i.update(t, { scrollIntoView: !0, userEvent: "move.character" })), !0);
};
function aa(i) {
  let e = [], t = -1;
  for (let n of i.selection.ranges) {
    let s = i.doc.lineAt(n.from), r = i.doc.lineAt(n.to);
    if (!n.empty && n.to == r.from && (r = i.doc.lineAt(n.to - 1)), t >= s.number) {
      let o = e[e.length - 1];
      o.to = r.to, o.ranges.push(n);
    } else
      e.push({ from: s.from, to: r.to, ranges: [n] });
    t = r.number + 1;
  }
  return e;
}
function Vg(i, e, t) {
  if (i.readOnly)
    return !1;
  let n = [], s = [];
  for (let r of aa(i)) {
    if (t ? r.to == i.doc.length : r.from == 0)
      continue;
    let o = i.doc.lineAt(t ? r.to + 1 : r.from - 1), l = o.length + 1;
    if (t) {
      n.push({ from: r.to, to: o.to }, { from: r.from, insert: o.text + i.lineBreak });
      for (let a of r.ranges)
        s.push(B.range(Math.min(i.doc.length, a.anchor + l), Math.min(i.doc.length, a.head + l)));
    } else {
      n.push({ from: o.from, to: r.from }, { from: r.to, insert: i.lineBreak + o.text });
      for (let a of r.ranges)
        s.push(B.range(a.anchor - l, a.head - l));
    }
  }
  return n.length ? (e(i.update({
    changes: n,
    scrollIntoView: !0,
    selection: B.create(s, i.selection.mainIndex),
    userEvent: "move.line"
  })), !0) : !1;
}
const ck = ({ state: i, dispatch: e }) => Vg(i, e, !1), fk = ({ state: i, dispatch: e }) => Vg(i, e, !0);
function Bg(i, e, t) {
  if (i.readOnly)
    return !1;
  let n = [];
  for (let r of aa(i))
    t ? n.push({ from: r.from, insert: i.doc.slice(r.from, r.to) + i.lineBreak }) : n.push({ from: r.to, insert: i.lineBreak + i.doc.slice(r.from, r.to) });
  let s = i.changes(n);
  return e(i.update({
    changes: s,
    selection: i.selection.map(s, t ? 1 : -1),
    scrollIntoView: !0,
    userEvent: "input.copyline"
  })), !0;
}
const uk = ({ state: i, dispatch: e }) => Bg(i, e, !1), dk = ({ state: i, dispatch: e }) => Bg(i, e, !0), pk = (i) => {
  if (i.state.readOnly)
    return !1;
  let { state: e } = i, t = e.changes(aa(e).map(({ from: s, to: r }) => (s > 0 ? s-- : r < e.doc.length && r++, { from: s, to: r }))), n = gr(e.selection, (s) => {
    let r;
    if (i.lineWrapping) {
      let o = i.lineBlockAt(s.head), l = i.coordsAtPos(s.head, s.assoc || 1);
      l && (r = o.bottom + i.documentTop - l.bottom + i.defaultLineHeight / 2);
    }
    return i.moveVertically(s, !0, r);
  }).map(t);
  return i.dispatch({ changes: t, selection: n, scrollIntoView: !0, userEvent: "delete.line" }), !0;
};
function Ok(i, e) {
  if (/\(\)|\[\]|\{\}/.test(i.sliceDoc(e - 1, e + 1)))
    return { from: e, to: e };
  let t = Si(i).resolveInner(e), n = t.childBefore(e), s = t.childAfter(e), r;
  return n && s && n.to <= e && s.from >= e && (r = n.type.prop(_e.closedBy)) && r.indexOf(s.name) > -1 && i.doc.lineAt(n.to).from == i.doc.lineAt(s.from).from && !/\S/.test(i.sliceDoc(n.to, s.from)) ? { from: n.to, to: s.from } : null;
}
const id = /* @__PURE__ */ Gg(!1), gk = /* @__PURE__ */ Gg(!0);
function Gg(i) {
  return ({ state: e, dispatch: t }) => {
    if (e.readOnly)
      return !1;
    let n = e.changeByRange((s) => {
      let { from: r, to: o } = s, l = e.doc.lineAt(r), a = !i && r == o && Ok(e, r);
      i && (r = o = (o <= l.to ? l : e.doc.lineAt(o)).to);
      let h = new sa(e, { simulateBreak: r, simulateDoubleBreak: !!a }), c = fg(h, r);
      for (c == null && (c = Fl(/^\s*/.exec(e.doc.lineAt(r).text)[0], e.tabSize)); o < l.to && /\s/.test(l.text[o - l.from]); )
        o++;
      a ? { from: r, to: o } = a : r > l.from && r < l.from + 100 && !/\S/.test(l.text.slice(0, r)) && (r = l.from);
      let f = ["", Tl(e, c)];
      return a && f.push(Tl(e, h.lineIndent(l.from, -1))), {
        changes: { from: r, to: o, insert: Ae.of(f) },
        range: B.cursor(r + 1 + f[1].length)
      };
    });
    return t(e.update(n, { scrollIntoView: !0, userEvent: "input" })), !0;
  };
}
function sf(i, e) {
  let t = -1;
  return i.changeByRange((n) => {
    let s = [];
    for (let o = n.from; o <= n.to; ) {
      let l = i.doc.lineAt(o);
      l.number > t && (n.empty || n.to > l.from) && (e(l, s, n), t = l.number), o = l.to + 1;
    }
    let r = i.changes(s);
    return {
      changes: s,
      range: B.range(r.mapPos(n.anchor, 1), r.mapPos(n.head, 1))
    };
  });
}
const mk = ({ state: i, dispatch: e }) => {
  if (i.readOnly)
    return !1;
  let t = /* @__PURE__ */ Object.create(null), n = new sa(i, { overrideIndentation: (r) => {
    let o = t[r];
    return o ?? -1;
  } }), s = sf(i, (r, o, l) => {
    let a = fg(n, r.from);
    if (a == null)
      return;
    /\S/.test(r.text) || (a = 0);
    let h = /^\s*/.exec(r.text)[0], c = Tl(i, a);
    (h != c || l.from < r.from + h.length) && (t[r.from] = a, o.push({ from: r.from, to: r.from + h.length, insert: c }));
  });
  return s.changes.empty || e(i.update(s, { userEvent: "indent" })), !0;
}, vk = ({ state: i, dispatch: e }) => i.readOnly ? !1 : (e(i.update(sf(i, (t, n) => {
  n.push({ from: t.from, insert: i.facet(na) });
}), { userEvent: "input.indent" })), !0), bk = ({ state: i, dispatch: e }) => i.readOnly ? !1 : (e(i.update(sf(i, (t, n) => {
  let s = /^\s*/.exec(t.text)[0];
  if (!s)
    return;
  let r = Fl(s, i.tabSize), o = 0, l = Tl(i, Math.max(0, r - Pl(i)));
  for (; o < s.length && o < l.length && s.charCodeAt(o) == l.charCodeAt(o); )
    o++;
  n.push({ from: t.from + o, to: t.from + s.length, insert: l.slice(o) });
}), { userEvent: "delete.dedent" })), !0), yk = (i) => (i.setTabFocusMode(), !0), wk = [
  { key: "Ctrl-b", run: Qg, shift: Rg, preventDefault: !0 },
  { key: "Ctrl-f", run: $g, shift: Mg },
  { key: "Ctrl-p", run: Tg, shift: Lg },
  { key: "Ctrl-n", run: Zg, shift: Ig },
  { key: "Ctrl-a", run: LS, shift: FS },
  { key: "Ctrl-e", run: IS, shift: HS },
  { key: "Ctrl-d", run: Yg },
  { key: "Ctrl-h", run: rc },
  { key: "Ctrl-k", run: rk },
  { key: "Ctrl-Alt-h", run: qg },
  { key: "Ctrl-o", run: ak },
  { key: "Ctrl-t", run: hk },
  { key: "Ctrl-v", run: sc }
], xk = /* @__PURE__ */ [
  { key: "ArrowLeft", run: Qg, shift: Rg, preventDefault: !0 },
  { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: TS, shift: NS, preventDefault: !0 },
  { mac: "Cmd-ArrowLeft", run: XS, shift: GS, preventDefault: !0 },
  { key: "ArrowRight", run: $g, shift: Mg, preventDefault: !0 },
  { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: ZS, shift: YS, preventDefault: !0 },
  { mac: "Cmd-ArrowRight", run: jS, shift: US, preventDefault: !0 },
  { key: "ArrowUp", run: Tg, shift: Lg, preventDefault: !0 },
  { mac: "Cmd-ArrowUp", run: Ku, shift: ed },
  { mac: "Ctrl-ArrowUp", run: Uu, shift: Fu },
  { key: "ArrowDown", run: Zg, shift: Ig, preventDefault: !0 },
  { mac: "Cmd-ArrowDown", run: Ju, shift: td },
  { mac: "Ctrl-ArrowDown", run: sc, shift: Hu },
  { key: "PageUp", run: Uu, shift: Fu },
  { key: "PageDown", run: sc, shift: Hu },
  { key: "Home", run: MS, shift: BS, preventDefault: !0 },
  { key: "Mod-Home", run: Ku, shift: ed },
  { key: "End", run: RS, shift: VS, preventDefault: !0 },
  { key: "Mod-End", run: Ju, shift: td },
  { key: "Enter", run: id, shift: id },
  { key: "Mod-a", run: KS },
  { key: "Backspace", run: rc, shift: rc, preventDefault: !0 },
  { key: "Delete", run: Yg, preventDefault: !0 },
  { key: "Mod-Backspace", mac: "Alt-Backspace", run: qg, preventDefault: !0 },
  { key: "Mod-Delete", mac: "Alt-Delete", run: sk, preventDefault: !0 },
  { mac: "Mod-Backspace", run: ok, preventDefault: !0 },
  { mac: "Mod-Delete", run: lk, preventDefault: !0 }
].concat(/* @__PURE__ */ wk.map((i) => ({ mac: i.key, run: i.run, shift: i.shift }))), Sk = /* @__PURE__ */ [
  { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: ES, shift: WS },
  { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: AS, shift: qS },
  { key: "Alt-ArrowUp", run: ck },
  { key: "Shift-Alt-ArrowUp", run: uk },
  { key: "Alt-ArrowDown", run: fk },
  { key: "Shift-Alt-ArrowDown", run: dk },
  { key: "Mod-Alt-ArrowUp", run: tk },
  { key: "Mod-Alt-ArrowDown", run: ik },
  { key: "Escape", run: nk },
  { key: "Mod-Enter", run: gk },
  { key: "Alt-l", mac: "Ctrl-l", run: JS },
  { key: "Mod-i", run: ek, preventDefault: !0 },
  { key: "Mod-[", run: bk },
  { key: "Mod-]", run: vk },
  { key: "Mod-Alt-\\", run: mk },
  { key: "Shift-Mod-k", run: pk },
  { key: "Shift-Mod-\\", run: zS },
  { key: "Mod-/", run: cS },
  { key: "Alt-A", run: uS },
  { key: "Ctrl-m", mac: "Shift-Alt-m", run: yk }
].concat(xk);
class Cl {
  /**
  @internal
  */
  constructor(e, t, n, s, r, o, l, a, h, c = 0, f) {
    this.p = e, this.stack = t, this.state = n, this.reducePos = s, this.pos = r, this.score = o, this.buffer = l, this.bufferBase = a, this.curContext = h, this.lookAhead = c, this.parent = f;
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
  static start(e, t, n = 0) {
    let s = e.parser.context;
    return new Cl(e, [], t, n, n, 0, [], 0, s ? new nd(s, s.start) : null, 0, null);
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
    let n = e >> 19, s = e & 65535, { parser: r } = this.p, o = this.reducePos < this.pos - 25 && this.setLookAhead(this.pos), l = r.dynamicPrecedence(s);
    if (l && (this.score += l), n == 0) {
      s < r.minRepeatTerm && this.reducePos < this.pos && (this.reducePos = this.pos), this.pushState(r.getGoto(this.state, s, !0), this.reducePos), s < r.minRepeatTerm && this.storeNode(s, this.reducePos, this.reducePos, o ? 8 : 4, !0), this.reduceContext(s, this.reducePos);
      return;
    }
    let a = this.stack.length - (n - 1) * 3 - (e & 262144 ? 6 : 0), h = a ? this.stack[a - 2] : this.p.ranges[0].from;
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
  storeNode(e, t, n, s = 4, r = !1) {
    if (e == 0 && (!this.stack.length || this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)) {
      let o = this.buffer.length;
      if (o > 0 && this.buffer[o - 4] == 0 && this.buffer[o - 1] > -1) {
        if (t == n)
          return;
        if (this.buffer[o - 2] >= t) {
          this.buffer[o - 2] = n;
          return;
        }
      }
    }
    if (!r || this.pos == n)
      this.buffer.push(e, t, n, s);
    else {
      let o = this.buffer.length;
      if (o > 0 && (this.buffer[o - 4] != 0 || this.buffer[o - 1] < 0)) {
        let l = !1;
        for (let a = o; a > 0 && this.buffer[a - 2] > n; a -= 4)
          if (this.buffer[a - 1] >= 0) {
            l = !0;
            break;
          }
        if (l)
          for (; o > 0 && this.buffer[o - 2] > n; )
            this.buffer[o] = this.buffer[o - 4], this.buffer[o + 1] = this.buffer[o - 3], this.buffer[o + 2] = this.buffer[o - 2], this.buffer[o + 3] = this.buffer[o - 1], o -= 4, s > 4 && (s -= 4);
      }
      this.buffer[o] = e, this.buffer[o + 1] = t, this.buffer[o + 2] = n, this.buffer[o + 3] = s;
    }
  }
  // Apply a shift action
  /**
  @internal
  */
  shift(e, t, n, s) {
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
      !l && (s > n || t <= o.maxNode) && (this.reducePos = s), this.pushState(r, l ? n : Math.min(n, this.reducePos)), this.shiftContext(t, n), t <= o.maxNode && this.buffer.push(t, n, s, 4);
    } else
      this.pos = s, this.shiftContext(t, n), t <= this.p.parser.maxNode && this.buffer.push(t, n, s, 4);
  }
  // Apply an action
  /**
  @internal
  */
  apply(e, t, n, s) {
    e & 65536 ? this.reduce(e) : this.shift(e, t, n, s);
  }
  // Add a prebuilt (reused) node into the buffer.
  /**
  @internal
  */
  useNode(e, t) {
    let n = this.p.reused.length - 1;
    (n < 0 || this.p.reused[n] != e) && (this.p.reused.push(e), n++);
    let s = this.pos;
    this.reducePos = this.pos = s + e.length, this.pushState(t, s), this.buffer.push(
      n,
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
    let n = e.buffer.slice(t), s = e.bufferBase + t;
    for (; e && s == e.bufferBase; )
      e = e.parent;
    return new Cl(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, n, s, this.curContext, this.lookAhead, e);
  }
  // Try to recover from an error by 'deleting' (ignoring) one token.
  /**
  @internal
  */
  recoverByDelete(e, t) {
    let n = e <= this.p.parser.maxNode;
    n && this.storeNode(e, this.pos, t, 4), this.storeNode(0, this.pos, t, n ? 8 : 4), this.pos = this.reducePos = t, this.score -= 190;
  }
  /**
  Check if the given term would be able to be shifted (optionally
  after some reductions) on this stack. This can be useful for
  external tokenizers that want to make sure they only provide a
  given token when it applies.
  */
  canShift(e) {
    for (let t = new kk(this); ; ) {
      let n = this.p.parser.stateSlot(
        t.state,
        4
        /* ParseState.DefaultReduce */
      ) || this.p.parser.hasAction(t.state, e);
      if (n == 0)
        return !1;
      if ((n & 65536) == 0)
        return !0;
      t.reduce(n);
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
    let n = [];
    for (let s = 0; s < t.length && n.length < 4; s += 2) {
      let r = t[s + 1];
      if (r == this.state)
        continue;
      let o = this.split();
      o.pushState(r, this.pos), o.storeNode(0, o.pos, o.pos, 4, !0), o.shiftContext(t[s], this.pos), o.reducePos = this.pos, o.score -= 200, n.push(o);
    }
    return n;
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
      let n = t >> 19, s = t & 65535, r = this.stack.length - n * 3;
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
    let { parser: e } = this.p, t = [], n = (s, r) => {
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
            let l = n(o, r + 1);
            if (l != null)
              return l;
          }
        });
    };
    return n(this.state, 0);
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
      let t = new nd(this.curContext.tracker, e);
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
class nd {
  constructor(e, t) {
    this.tracker = e, this.context = t, this.hash = e.strict ? e.hash(t) : 0;
  }
}
class kk {
  constructor(e) {
    this.start = e, this.state = e.state, this.stack = e.stack, this.base = this.stack.length;
  }
  reduce(e) {
    let t = e & 65535, n = e >> 19;
    n == 0 ? (this.stack == this.start.stack && (this.stack = this.stack.slice()), this.stack.push(this.state, 0, 0), this.base += 3) : this.base -= (n - 1) * 3;
    let s = this.start.p.parser.getGoto(this.stack[this.base - 3], t, !0);
    this.state = s;
  }
}
class El {
  constructor(e, t, n) {
    this.stack = e, this.pos = t, this.index = n, this.buffer = e.buffer, this.index == 0 && this.maybeNext();
  }
  static create(e, t = e.bufferBase + e.buffer.length) {
    return new El(e, t, t - e.bufferBase);
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
    return new El(this.stack, this.pos, this.index);
  }
}
function Rr(i, e = Uint16Array) {
  if (typeof i != "string")
    return i;
  let t = null;
  for (let n = 0, s = 0; n < i.length; ) {
    let r = 0;
    for (; ; ) {
      let o = i.charCodeAt(n++), l = !1;
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
class sl {
  constructor() {
    this.start = -1, this.value = -1, this.end = -1, this.extended = -1, this.lookAhead = 0, this.mask = 0, this.context = 0;
  }
}
const sd = new sl();
class Qk {
  /**
  @internal
  */
  constructor(e, t) {
    this.input = e, this.ranges = t, this.chunk = "", this.chunkOff = 0, this.chunk2 = "", this.chunk2Pos = 0, this.next = -1, this.token = sd, this.rangeIndex = 0, this.pos = this.chunkPos = t[0].from, this.range = t[0], this.end = t[t.length - 1].to, this.readNext();
  }
  /**
  @internal
  */
  resolveOffset(e, t) {
    let n = this.range, s = this.rangeIndex, r = this.pos + e;
    for (; r < n.from; ) {
      if (!s)
        return null;
      let o = this.ranges[--s];
      r -= n.from - o.to, n = o;
    }
    for (; t < 0 ? r > n.to : r >= n.to; ) {
      if (s == this.ranges.length - 1)
        return null;
      let o = this.ranges[++s];
      r += o.from - n.to, n = o;
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
    let t = this.chunkOff + e, n, s;
    if (t >= 0 && t < this.chunk.length)
      n = this.pos + e, s = this.chunk.charCodeAt(t);
    else {
      let r = this.resolveOffset(e, 1);
      if (r == null)
        return -1;
      if (n = r, n >= this.chunk2Pos && n < this.chunk2Pos + this.chunk2.length)
        s = this.chunk2.charCodeAt(n - this.chunk2Pos);
      else {
        let o = this.rangeIndex, l = this.range;
        for (; l.to <= n; )
          l = this.ranges[++o];
        this.chunk2 = this.input.chunk(this.chunk2Pos = n), n + this.chunk2.length > l.to && (this.chunk2 = this.chunk2.slice(0, l.to - n)), s = this.chunk2.charCodeAt(0);
      }
    }
    return n >= this.token.lookAhead && (this.token.lookAhead = n + 1), s;
  }
  /**
  Accept a token. By default, the end of the token is set to the
  current stream position, but you can pass an offset (relative to
  the stream position) to change that.
  */
  acceptToken(e, t = 0) {
    let n = t ? this.resolveOffset(t, -1) : this.pos;
    if (n == null || n < this.token.start)
      throw new RangeError("Token end out of bounds");
    this.token.value = e, this.token.end = n;
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
    if (t ? (this.token = t, t.start = e, t.lookAhead = e + 1, t.value = t.extended = -1) : this.token = sd, this.pos != e) {
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
    let n = "";
    for (let s of this.ranges) {
      if (s.from >= t)
        break;
      s.to > e && (n += this.input.read(Math.max(s.from, e), Math.min(s.to, t)));
    }
    return n;
  }
}
class Ds {
  constructor(e, t) {
    this.data = e, this.id = t;
  }
  token(e, t) {
    let { parser: n } = t.p;
    Ug(this.data, e, t, this.id, n.data, n.tokenPrecTable);
  }
}
Ds.prototype.contextual = Ds.prototype.fallback = Ds.prototype.extend = !1;
class oc {
  constructor(e, t, n) {
    this.precTable = t, this.elseToken = n, this.data = typeof e == "string" ? Rr(e) : e;
  }
  token(e, t) {
    let n = e.pos, s = 0;
    for (; ; ) {
      let r = e.next < 0, o = e.resolveOffset(1, 1);
      if (Ug(this.data, e, t, 0, this.data, this.precTable), e.token.value > -1)
        break;
      if (this.elseToken == null)
        return;
      if (r || s++, o == null)
        break;
      e.reset(o, e.token);
    }
    s && (e.reset(n, e.token), e.acceptToken(this.elseToken, s));
  }
}
oc.prototype.contextual = Ds.prototype.fallback = Ds.prototype.extend = !1;
class xo {
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
function Ug(i, e, t, n, s, r) {
  let o = 0, l = 1 << n, { dialect: a } = t.p.parser;
  e: for (; (l & i[o]) != 0; ) {
    let h = i[o + 1];
    for (let p = o + 3; p < h; p += 2)
      if ((i[p + 1] & l) > 0) {
        let O = i[p];
        if (a.allows(O) && (e.token.value == -1 || e.token.value == O || $k(O, e.token.value, s, r))) {
          e.acceptToken(O);
          break;
        }
      }
    let c = e.next, f = 0, d = i[o + 2];
    if (e.next < 0 && d > f && i[h + d * 3 - 3] == 65535) {
      o = i[h + d * 3 - 1];
      continue e;
    }
    for (; f < d; ) {
      let p = f + d >> 1, O = h + p + (p << 1), g = i[O], m = i[O + 1] || 65536;
      if (c < g)
        d = p;
      else if (c >= m)
        f = p + 1;
      else {
        o = i[O + 2], e.advance();
        continue e;
      }
    }
    break;
  }
}
function rd(i, e, t) {
  for (let n = e, s; (s = i[n]) != 65535; n++)
    if (s == t)
      return n - e;
  return -1;
}
function $k(i, e, t, n) {
  let s = rd(t, n, e);
  return s < 0 || rd(t, n, i) < s;
}
const Ht = typeof process < "u" && process.env && /\bparse\b/.test(process.env.LOG);
let Ga = null;
function od(i, e, t) {
  let n = i.cursor(nt.IncludeAnonymous);
  for (n.moveTo(e); ; )
    if (!(t < 0 ? n.childBefore(e) : n.childAfter(e)))
      for (; ; ) {
        if ((t < 0 ? n.to < e : n.from > e) && !n.type.isError)
          return t < 0 ? Math.max(0, Math.min(
            n.to - 1,
            e - 25
            /* Lookahead.Margin */
          )) : Math.min(i.length, Math.max(
            n.from + 1,
            e + 25
            /* Lookahead.Margin */
          ));
        if (t < 0 ? n.prevSibling() : n.nextSibling())
          break;
        if (!n.parent())
          return t < 0 ? 0 : i.length;
      }
}
class _k {
  constructor(e, t) {
    this.fragments = e, this.nodeSet = t, this.i = 0, this.fragment = null, this.safeFrom = -1, this.safeTo = -1, this.trees = [], this.start = [], this.index = [], this.nextFragment();
  }
  nextFragment() {
    let e = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
    if (e) {
      for (this.safeFrom = e.openStart ? od(e.tree, e.from + e.offset, 1) - e.offset : e.from, this.safeTo = e.openEnd ? od(e.tree, e.to + e.offset, -1) - e.offset : e.to; this.trees.length; )
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
      let n = this.trees[t], s = this.index[t];
      if (s == n.children.length) {
        this.trees.pop(), this.start.pop(), this.index.pop();
        continue;
      }
      let r = n.children[s], o = this.start[t] + n.positions[s];
      if (o > e)
        return this.nextStart = o, null;
      if (r instanceof ft) {
        if (o == e) {
          if (o < this.safeFrom)
            return null;
          let l = o + r.length;
          if (l <= this.safeTo) {
            let a = r.prop(_e.lookAhead);
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
class Pk {
  constructor(e, t) {
    this.stream = t, this.tokens = [], this.mainToken = null, this.actions = [], this.tokens = e.tokenizers.map((n) => new sl());
  }
  getActions(e) {
    let t = 0, n = null, { parser: s } = e.p, { tokenizers: r } = s, o = s.stateSlot(
      e.state,
      3
      /* ParseState.TokenizerMask */
    ), l = e.curContext ? e.curContext.hash : 0, a = 0;
    for (let h = 0; h < r.length; h++) {
      if ((1 << h & o) == 0)
        continue;
      let c = r[h], f = this.tokens[h];
      if (!(n && !c.fallback) && ((c.contextual || f.start != e.pos || f.mask != o || f.context != l) && (this.updateCachedToken(f, c, e), f.mask = o, f.context = l), f.lookAhead > f.end + 25 && (a = Math.max(f.lookAhead, a)), f.value != 0)) {
        let d = t;
        if (f.extended > -1 && (t = this.addActions(e, f.extended, f.end, t)), t = this.addActions(e, f.value, f.end, t), !c.extend && (n = f, t > d))
          break;
      }
    }
    for (; this.actions.length > t; )
      this.actions.pop();
    return a && e.setLookAhead(a), !n && e.pos == this.stream.end && (n = new sl(), n.value = e.p.parser.eofTerm, n.start = n.end = e.pos, t = this.addActions(e, n.value, n.end, t)), this.mainToken = n, this.actions;
  }
  getMainToken(e) {
    if (this.mainToken)
      return this.mainToken;
    let t = new sl(), { pos: n, p: s } = e;
    return t.start = n, t.end = Math.min(n + 1, s.stream.end), t.value = n == s.stream.end ? s.parser.eofTerm : 0, t;
  }
  updateCachedToken(e, t, n) {
    let s = this.stream.clipPos(n.pos);
    if (t.token(this.stream.reset(s, e), n), e.value > -1) {
      let { parser: r } = n.p;
      for (let o = 0; o < r.specialized.length; o++)
        if (r.specialized[o] == e.value) {
          let l = r.specializers[o](this.stream.read(e.start, e.end), n);
          if (l >= 0 && n.p.parser.dialect.allows(l >> 1)) {
            (l & 1) == 0 ? e.value = l >> 1 : e.extended = l >> 1;
            break;
          }
        }
    } else
      e.value = 0, e.end = this.stream.clipPos(s + 1);
  }
  putAction(e, t, n, s) {
    for (let r = 0; r < s; r += 3)
      if (this.actions[r] == e)
        return s;
    return this.actions[s++] = e, this.actions[s++] = t, this.actions[s++] = n, s;
  }
  addActions(e, t, n, s) {
    let { state: r } = e, { parser: o } = e.p, { data: l } = o;
    for (let a = 0; a < 2; a++)
      for (let h = o.stateSlot(
        r,
        a ? 2 : 1
        /* ParseState.Actions */
      ); ; h += 3) {
        if (l[h] == 65535)
          if (l[h + 1] == 1)
            h = rn(l, h + 2);
          else {
            s == 0 && l[h + 1] == 2 && (s = this.putAction(rn(l, h + 2), t, n, s));
            break;
          }
        l[h] == t && (s = this.putAction(rn(l, h + 1), t, n, s));
      }
    return s;
  }
}
class Tk {
  constructor(e, t, n, s) {
    this.parser = e, this.input = t, this.ranges = s, this.recovering = 0, this.nextStackID = 9812, this.minStackPos = 0, this.reused = [], this.stoppedAt = null, this.lastBigReductionStart = -1, this.lastBigReductionSize = 0, this.bigReductionCount = 0, this.stream = new Qk(t, s), this.tokens = new Pk(e, this.stream), this.topTerm = e.top[1];
    let { from: r } = s[0];
    this.stacks = [Cl.start(this, e.top[0], r)], this.fragments = n.length && this.stream.end - r > e.bufferLength * 4 ? new _k(n, e.nodeSet) : null;
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
    let e = this.stacks, t = this.minStackPos, n = this.stacks = [], s, r;
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
          n.push(l);
        else {
          if (this.advanceStack(l, n, e))
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
    if (!n.length) {
      let o = s && Ek(s);
      if (o)
        return Ht && console.log("Finish with " + this.stackID(o)), this.stackToTree(o);
      if (this.parser.strict)
        throw Ht && s && console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none")), new SyntaxError("No parse at " + t);
      this.recovering || (this.recovering = 5);
    }
    if (this.recovering && s) {
      let o = this.stoppedAt != null && s[0].pos > this.stoppedAt ? s[0] : this.runRecovery(s, r, n);
      if (o)
        return Ht && console.log("Force-finish " + this.stackID(o)), this.stackToTree(o.forceAll());
    }
    if (this.recovering) {
      let o = this.recovering == 1 ? 1 : this.recovering * 3;
      if (n.length > o)
        for (n.sort((l, a) => a.score - l.score); n.length > o; )
          n.pop();
      n.some((l) => l.reducePos > t) && this.recovering--;
    } else if (n.length > 1) {
      e: for (let o = 0; o < n.length - 1; o++) {
        let l = n[o];
        for (let a = o + 1; a < n.length; a++) {
          let h = n[a];
          if (l.sameState(h) || l.buffer.length > 500 && h.buffer.length > 500)
            if ((l.score - h.score || l.buffer.length - h.buffer.length) > 0)
              n.splice(a--, 1);
            else {
              n.splice(o--, 1);
              continue e;
            }
        }
      }
      n.length > 12 && (n.sort((o, l) => l.score - o.score), n.splice(
        12,
        n.length - 12
        /* Rec.MaxStackCount */
      ));
    }
    this.minStackPos = n[0].pos;
    for (let o = 1; o < n.length; o++)
      n[o].pos < this.minStackPos && (this.minStackPos = n[o].pos);
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
  advanceStack(e, t, n) {
    let s = e.pos, { parser: r } = this, o = Ht ? this.stackID(e) + " -> " : "";
    if (this.stoppedAt != null && s > this.stoppedAt)
      return e.forceReduce() ? e : null;
    if (this.fragments) {
      let h = e.curContext && e.curContext.tracker.strict, c = h ? e.curContext.hash : 0;
      for (let f = this.fragments.nodeAt(s); f; ) {
        let d = this.parser.nodeSet.types[f.type.id] == f.type ? r.getGoto(e.state, f.type.id) : -1;
        if (d > -1 && f.length && (!h || (f.prop(_e.contextHash) || 0) == c))
          return e.useNode(f, d), Ht && console.log(o + this.stackID(e) + ` (via reuse of ${r.getName(f.type.id)})`), !0;
        if (!(f instanceof ft) || f.children.length == 0 || f.positions[0] > 0)
          break;
        let p = f.children[0];
        if (p instanceof ft && f.positions[0] == 0)
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
      let c = a[h++], f = a[h++], d = a[h++], p = h == a.length || !n, O = p ? e : e.split(), g = this.tokens.mainToken;
      if (O.apply(c, f, g ? g.start : O.pos, d), Ht && console.log(o + this.stackID(O) + ` (via ${(c & 65536) == 0 ? "shift" : `reduce of ${r.getName(
        c & 65535
        /* Action.ValueMask */
      )}`} for ${r.getName(f)} @ ${s}${O == e ? "" : ", split"})`), p)
        return !0;
      O.pos > s ? t.push(O) : n.push(O);
    }
    return !1;
  }
  // Advance a given stack forward as far as it will go. Returns the
  // (possibly updated) stack if it got stuck, or null if it moved
  // forward and was given to `pushStackDedup`.
  advanceFully(e, t) {
    let n = e.pos;
    for (; ; ) {
      if (!this.advanceStack(e, null, null))
        return !1;
      if (e.pos > n)
        return ld(e, t), !0;
    }
  }
  runRecovery(e, t, n) {
    let s = null, r = !1;
    for (let o = 0; o < e.length; o++) {
      let l = e[o], a = t[o << 1], h = t[(o << 1) + 1], c = Ht ? this.stackID(l) + " -> " : "";
      if (l.deadEnd && (r || (r = !0, l.restart(), Ht && console.log(c + this.stackID(l) + " (restarted)"), this.advanceFully(l, n))))
        continue;
      let f = l.split(), d = c;
      for (let p = 0; p < 10 && f.forceReduce() && (Ht && console.log(d + this.stackID(f) + " (via force-reduce)"), !this.advanceFully(f, n)); p++)
        Ht && (d = this.stackID(f) + " -> ");
      for (let p of l.recoverByInsert(a))
        Ht && console.log(c + this.stackID(p) + " (via recover-insert)"), this.advanceFully(p, n);
      this.stream.end > l.pos ? (h == l.pos && (h++, a = 0), l.recoverByDelete(a, h), Ht && console.log(c + this.stackID(l) + ` (via recover-delete ${this.parser.getName(a)})`), ld(l, n)) : (!s || s.score < f.score) && (s = f);
    }
    return s;
  }
  // Convert the stack's buffer to a syntax tree.
  stackToTree(e) {
    return e.close(), ft.build({
      buffer: El.create(e),
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
    let t = (Ga || (Ga = /* @__PURE__ */ new WeakMap())).get(e);
    return t || Ga.set(e, t = String.fromCodePoint(this.nextStackID++)), t + e;
  }
}
function ld(i, e) {
  for (let t = 0; t < e.length; t++) {
    let n = e[t];
    if (n.pos == i.pos && n.sameState(i)) {
      e[t].score < i.score && (e[t] = i);
      return;
    }
  }
  e.push(i);
}
class Zk {
  constructor(e, t, n) {
    this.source = e, this.flags = t, this.disabled = n;
  }
  allows(e) {
    return !this.disabled || this.disabled[e] == 0;
  }
}
const Ua = (i) => i;
class Ck {
  /**
  Define a context tracker.
  */
  constructor(e) {
    this.start = e.start, this.shift = e.shift || Ua, this.reduce = e.reduce || Ua, this.reuse = e.reuse || Ua, this.hash = e.hash || (() => 0), this.strict = e.strict !== !1;
  }
}
class Al extends lg {
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
    let n = Object.keys(e.topRules).map((l) => e.topRules[l][1]), s = [];
    for (let l = 0; l < t.length; l++)
      s.push([]);
    function r(l, a, h) {
      s[l].push([a, a.deserialize(String(h))]);
    }
    if (e.nodeProps)
      for (let l of e.nodeProps) {
        let a = l[0];
        typeof a == "string" && (a = _e[a]);
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
    this.nodeSet = new Uc(t.map((l, a) => Ft.define({
      name: a >= this.minRepeatTerm ? void 0 : l,
      id: a,
      props: s[a],
      top: n.indexOf(a) > -1,
      error: a == 0,
      skipped: e.skippedNodes && e.skippedNodes.indexOf(a) > -1
    }))), e.propSources && (this.nodeSet = this.nodeSet.extend(...e.propSources)), this.strict = !1, this.bufferLength = ng;
    let o = Rr(e.tokenData);
    this.context = e.context, this.specializerSpecs = e.specialized || [], this.specialized = new Uint16Array(this.specializerSpecs.length);
    for (let l = 0; l < this.specializerSpecs.length; l++)
      this.specialized[l] = this.specializerSpecs[l].term;
    this.specializers = this.specializerSpecs.map(ad), this.states = Rr(e.states, Uint32Array), this.data = Rr(e.stateData), this.goto = Rr(e.goto), this.maxTerm = e.maxTerm, this.tokenizers = e.tokenizers.map((l) => typeof l == "number" ? new Ds(o, l) : l), this.topRules = e.topRules, this.dialects = e.dialects || {}, this.dynamicPrecedences = e.dynamicPrecedences || null, this.tokenPrecTable = e.tokenPrec, this.termNames = e.termNames || null, this.maxNode = this.nodeSet.types.length - 1, this.dialect = this.parseDialect(), this.top = this.topRules[Object.keys(this.topRules)[0]];
  }
  createParse(e, t, n) {
    let s = new Tk(this, e, t, n);
    for (let r of this.wrappers)
      s = r(s, e, t, n);
    return s;
  }
  /**
  Get a goto table entry @internal
  */
  getGoto(e, t, n = !1) {
    let s = this.goto;
    if (t >= s[0])
      return -1;
    for (let r = s[t + 1]; ; ) {
      let o = s[r++], l = o & 1, a = s[r++];
      if (l && n)
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
    let n = this.data;
    for (let s = 0; s < 2; s++)
      for (let r = this.stateSlot(
        e,
        s ? 2 : 1
        /* ParseState.Actions */
      ), o; ; r += 3) {
        if ((o = n[r]) == 65535)
          if (n[r + 1] == 1)
            o = n[r = rn(n, r + 2)];
          else {
            if (n[r + 1] == 2)
              return rn(n, r + 2);
            break;
          }
        if (o == t || o == 0)
          return rn(n, r + 1);
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
    return !!this.allActions(e, (n) => n == t ? !0 : null);
  }
  /**
  @internal
  */
  allActions(e, t) {
    let n = this.stateSlot(
      e,
      4
      /* ParseState.DefaultReduce */
    ), s = n ? t(n) : void 0;
    for (let r = this.stateSlot(
      e,
      1
      /* ParseState.Actions */
    ); s == null; r += 3) {
      if (this.data[r] == 65535)
        if (this.data[r + 1] == 1)
          r = rn(this.data, r + 2);
        else
          break;
      s = t(rn(this.data, r + 1));
    }
    return s;
  }
  /**
  Get the states that can follow this one through shift actions or
  goto jumps. @internal
  */
  nextStates(e) {
    let t = [];
    for (let n = this.stateSlot(
      e,
      1
      /* ParseState.Actions */
    ); ; n += 3) {
      if (this.data[n] == 65535)
        if (this.data[n + 1] == 1)
          n = rn(this.data, n + 2);
        else
          break;
      if ((this.data[n + 2] & 1) == 0) {
        let s = this.data[n + 1];
        t.some((r, o) => o & 1 && r == s) || t.push(this.data[n], s);
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
    let t = Object.assign(Object.create(Al.prototype), this);
    if (e.props && (t.nodeSet = this.nodeSet.extend(...e.props)), e.top) {
      let n = this.topRules[e.top];
      if (!n)
        throw new RangeError(`Invalid top rule name ${e.top}`);
      t.top = n;
    }
    return e.tokenizers && (t.tokenizers = this.tokenizers.map((n) => {
      let s = e.tokenizers.find((r) => r.from == n);
      return s ? s.to : n;
    })), e.specializers && (t.specializers = this.specializers.slice(), t.specializerSpecs = this.specializerSpecs.map((n, s) => {
      let r = e.specializers.find((l) => l.from == n.external);
      if (!r)
        return n;
      let o = Object.assign(Object.assign({}, n), { external: r.to });
      return t.specializers[s] = ad(o), o;
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
    let t = Object.keys(this.dialects), n = t.map(() => !1);
    if (e)
      for (let r of e.split(" ")) {
        let o = t.indexOf(r);
        o >= 0 && (n[o] = !0);
      }
    let s = null;
    for (let r = 0; r < t.length; r++)
      if (!n[r])
        for (let o = this.dialects[t[r]], l; (l = this.data[o++]) != 65535; )
          (s || (s = new Uint8Array(this.maxTerm + 1)))[l] = 1;
    return new Zk(e, n, s);
  }
  /**
  Used by the output of the parser generator. Not available to
  user code. @hide
  */
  static deserialize(e) {
    return new Al(e);
  }
}
function rn(i, e) {
  return i[e] | i[e + 1] << 16;
}
function Ek(i) {
  let e = null;
  for (let t of i) {
    let n = t.p.stoppedAt;
    (t.pos == t.p.stream.end || n != null && t.pos > n) && t.p.parser.stateFlag(
      t.state,
      2
      /* StateFlag.Accepting */
    ) && (!e || e.score < t.score) && (e = t);
  }
  return e;
}
function ad(i) {
  if (i.external) {
    let e = i.extend ? 1 : 0;
    return (t, n) => i.external(t, n) << 1 | e;
  }
  return i.get;
}
const Ak = 316, Rk = 317, hd = 1, Mk = 2, Xk = 3, jk = 4, Lk = 318, Ik = 320, Dk = 321, zk = 5, Nk = 6, Yk = 0, lc = [
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
], Fg = 125, Wk = 59, ac = 47, qk = 42, Vk = 43, Bk = 45, Gk = 60, Uk = 44, Fk = 63, Hk = 46, Kk = 91, Jk = new Ck({
  start: !1,
  shift(i, e) {
    return e == zk || e == Nk || e == Ik ? i : e == Dk;
  },
  strict: !1
}), eQ = new xo((i, e) => {
  let { next: t } = i;
  (t == Fg || t == -1 || e.context) && i.acceptToken(Lk);
}, { contextual: !0, fallback: !0 }), tQ = new xo((i, e) => {
  let { next: t } = i, n;
  lc.indexOf(t) > -1 || t == ac && ((n = i.peek(1)) == ac || n == qk) || t != Fg && t != Wk && t != -1 && !e.context && i.acceptToken(Ak);
}, { contextual: !0 }), iQ = new xo((i, e) => {
  i.next == Kk && !e.context && i.acceptToken(Rk);
}, { contextual: !0 }), nQ = new xo((i, e) => {
  let { next: t } = i;
  if (t == Vk || t == Bk) {
    if (i.advance(), t == i.next) {
      i.advance();
      let n = !e.context && e.canShift(hd);
      i.acceptToken(n ? hd : Mk);
    }
  } else t == Fk && i.peek(1) == Hk && (i.advance(), i.advance(), (i.next < 48 || i.next > 57) && i.acceptToken(Xk));
}, { contextual: !0 });
function Fa(i, e) {
  return i >= 65 && i <= 90 || i >= 97 && i <= 122 || i == 95 || i >= 192 || !e && i >= 48 && i <= 57;
}
const sQ = new xo((i, e) => {
  if (i.next != Gk || !e.dialectEnabled(Yk) || (i.advance(), i.next == ac)) return;
  let t = 0;
  for (; lc.indexOf(i.next) > -1; )
    i.advance(), t++;
  if (Fa(i.next, !0)) {
    for (i.advance(), t++; Fa(i.next, !1); )
      i.advance(), t++;
    for (; lc.indexOf(i.next) > -1; )
      i.advance(), t++;
    if (i.next == Uk) return;
    for (let n = 0; ; n++) {
      if (n == 7) {
        if (!Fa(i.next, !0)) return;
        break;
      }
      if (i.next != "extends".charCodeAt(n)) break;
      i.advance(), t++;
    }
  }
  i.acceptToken(jk, -t);
}), rQ = ag({
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
}), oQ = { __proto__: null, export: 20, as: 25, from: 33, default: 36, async: 41, function: 42, in: 52, out: 55, const: 56, extends: 60, this: 64, true: 72, false: 72, null: 84, void: 88, typeof: 92, super: 108, new: 142, delete: 154, yield: 163, await: 167, class: 172, public: 235, private: 235, protected: 235, readonly: 237, instanceof: 256, satisfies: 259, import: 292, keyof: 349, unique: 353, infer: 359, asserts: 395, is: 397, abstract: 417, implements: 419, type: 421, let: 424, var: 426, using: 429, interface: 435, enum: 439, namespace: 445, module: 447, declare: 451, global: 455, defer: 471, for: 476, of: 485, while: 488, with: 492, do: 496, if: 500, else: 502, switch: 506, case: 512, try: 518, catch: 522, finally: 526, return: 530, throw: 534, break: 538, continue: 542, debugger: 546 }, lQ = { __proto__: null, async: 129, get: 131, set: 133, declare: 195, public: 197, private: 197, protected: 197, static: 199, abstract: 201, override: 203, readonly: 209, accessor: 211, new: 401 }, aQ = { __proto__: null, "<": 193 }, hQ = Al.deserialize({
  version: 14,
  states: "$F|Q%TQlOOO%[QlOOO'_QpOOP(lO`OOO*zQ!0MxO'#CiO+RO#tO'#CjO+aO&jO'#CjO+oO#@ItO'#DaO.QQlO'#DgO.bQlO'#DrO%[QlO'#DzO0fQlO'#ESOOQ!0Lf'#E['#E[O1PQ`O'#EXOOQO'#Ep'#EpOOQO'#Il'#IlO1XQ`O'#GsO1dQ`O'#EoO1iQ`O'#EoO3hQ!0MxO'#JrO6[Q!0MxO'#JsO6uQ`O'#F]O6zQ,UO'#FtOOQ!0Lf'#Ff'#FfO7VO7dO'#FfO9XQMhO'#F|O9`Q`O'#F{OOQ!0Lf'#Js'#JsOOQ!0Lb'#Jr'#JrO9eQ`O'#GwOOQ['#K_'#K_O9pQ`O'#IYO9uQ!0LrO'#IZOOQ['#J`'#J`OOQ['#I_'#I_Q`QlOOQ`QlOOO9}Q!L^O'#DvO:UQlO'#EOO:]QlO'#EQO9kQ`O'#GsO:dQMhO'#CoO:rQ`O'#EnO:}Q`O'#EyO;hQMhO'#FeO;xQ`O'#GsOOQO'#K`'#K`O;}Q`O'#K`O<]Q`O'#G{O<]Q`O'#G|O<]Q`O'#HOO9kQ`O'#HRO=SQ`O'#HUO>kQ`O'#CeO>{Q`O'#HcO?TQ`O'#HiO?TQ`O'#HkO`QlO'#HmO?TQ`O'#HoO?TQ`O'#HrO?YQ`O'#HxO?_Q!0LsO'#IOO%[QlO'#IQO?jQ!0LsO'#ISO?uQ!0LsO'#IUO9uQ!0LrO'#IWO@QQ!0MxO'#CiOASQpO'#DlQOQ`OOO%[QlO'#EQOAjQ`O'#ETO:dQMhO'#EnOAuQ`O'#EnOBQQ!bO'#FeOOQ['#Cg'#CgOOQ!0Lb'#Dq'#DqOOQ!0Lb'#Jv'#JvO%[QlO'#JvOOQO'#Jy'#JyOOQO'#Ih'#IhOCQQpO'#EgOOQ!0Lb'#Ef'#EfOOQ!0Lb'#J}'#J}OC|Q!0MSO'#EgODWQpO'#EWOOQO'#Jx'#JxODlQpO'#JyOEyQpO'#EWODWQpO'#EgPFWO&2DjO'#CbPOOO)CD})CD}OOOO'#I`'#I`OFcO#tO,59UOOQ!0Lh,59U,59UOOOO'#Ia'#IaOFqO&jO,59UOGPQ!L^O'#DcOOOO'#Ic'#IcOGWO#@ItO,59{OOQ!0Lf,59{,59{OGfQlO'#IdOGyQ`O'#JtOIxQ!fO'#JtO+}QlO'#JtOJPQ`O,5:ROJgQ`O'#EpOJtQ`O'#KTOKPQ`O'#KSOKPQ`O'#KSOKXQ`O,5;^OK^Q`O'#KROOQ!0Ln,5:^,5:^OKeQlO,5:^OMcQ!0MxO,5:fONSQ`O,5:nONmQ!0LrO'#KQONtQ`O'#KPO9eQ`O'#KPO! YQ`O'#KPO! bQ`O,5;]O! gQ`O'#KPO!#lQ!fO'#JsOOQ!0Lh'#Ci'#CiO%[QlO'#ESO!$[Q!fO,5:sOOQS'#Jz'#JzOOQO-E<j-E<jO9kQ`O,5=_O!$rQ`O,5=_O!$wQlO,5;ZO!&zQMhO'#EkO!(eQ`O,5;ZO!(jQlO'#DyO!(tQpO,5;dO!(|QpO,5;dO%[QlO,5;dOOQ['#FT'#FTOOQ['#FV'#FVO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eOOQ['#FZ'#FZO!)[QlO,5;tOOQ!0Lf,5;y,5;yOOQ!0Lf,5;z,5;zOOQ!0Lf,5;|,5;|O%[QlO'#IpO!+_Q!0LrO,5<iO%[QlO,5;eO!&zQMhO,5;eO!+|QMhO,5;eO!-nQMhO'#E^O%[QlO,5;wOOQ!0Lf,5;{,5;{O!-uQ,UO'#FjO!.rQ,UO'#KXO!.^Q,UO'#KXO!.yQ,UO'#KXOOQO'#KX'#KXO!/_Q,UO,5<SOOOW,5<`,5<`O!/pQlO'#FvOOOW'#Io'#IoO7VO7dO,5<QO!/wQ,UO'#FxOOQ!0Lf,5<Q,5<QO!0hQ$IUO'#CyOOQ!0Lh'#C}'#C}O!0{O#@ItO'#DRO!1iQMjO,5<eO!1pQ`O,5<hO!3YQ(CWO'#GXO!3jQ`O'#GYO!3oQ`O'#GYO!5_Q(CWO'#G^O!6dQpO'#GbOOQO'#Gn'#GnO!,TQMhO'#GmOOQO'#Gp'#GpO!,TQMhO'#GoO!7VQ$IUO'#JlOOQ!0Lh'#Jl'#JlO!7aQ`O'#JkO!7oQ`O'#JjO!7wQ`O'#CuOOQ!0Lh'#C{'#C{O!8YQ`O'#C}OOQ!0Lh'#DV'#DVOOQ!0Lh'#DX'#DXO!8_Q`O,5<eO1SQ`O'#DZO!,TQMhO'#GPO!,TQMhO'#GRO!8gQ`O'#GTO!8lQ`O'#GUO!3oQ`O'#G[O!,TQMhO'#GaO<]Q`O'#JkO!8qQ`O'#EqO!9`Q`O,5<gOOQ!0Lb'#Cr'#CrO!9hQ`O'#ErO!:bQpO'#EsOOQ!0Lb'#KR'#KRO!:iQ!0LrO'#KaO9uQ!0LrO,5=cO`QlO,5>tOOQ['#Jh'#JhOOQ[,5>u,5>uOOQ[-E<]-E<]O!<hQ!0MxO,5:bO!:]QpO,5:`O!?RQ!0MxO,5:jO%[QlO,5:jO!AiQ!0MxO,5:lOOQO,5@z,5@zO!BYQMhO,5=_O!BhQ!0LrO'#JiO9`Q`O'#JiO!ByQ!0LrO,59ZO!CUQpO,59ZO!C^QMhO,59ZO:dQMhO,59ZO!CiQ`O,5;ZO!CqQ`O'#HbO!DVQ`O'#KdO%[QlO,5;}O!:]QpO,5<PO!D_Q`O,5=zO!DdQ`O,5=zO!DiQ`O,5=zO!DwQ`O,5=zO9uQ!0LrO,5=zO<]Q`O,5=jOOQO'#Cy'#CyO!EOQpO,5=gO!EWQMhO,5=hO!EcQ`O,5=jO!EhQ!bO,5=mO!EpQ`O'#K`O?YQ`O'#HWO9kQ`O'#HYO!EuQ`O'#HYO:dQMhO'#H[O!EzQ`O'#H[OOQ[,5=p,5=pO!FPQ`O'#H]O!FbQ`O'#CoO!FgQ`O,59PO!FqQ`O,59PO!HvQlO,59POOQ[,59P,59PO!IWQ!0LrO,59PO%[QlO,59PO!KcQlO'#HeOOQ['#Hf'#HfOOQ['#Hg'#HgO`QlO,5=}O!KyQ`O,5=}O`QlO,5>TO`QlO,5>VO!LOQ`O,5>XO`QlO,5>ZO!LTQ`O,5>^O!LYQlO,5>dOOQ[,5>j,5>jO%[QlO,5>jO9uQ!0LrO,5>lOOQ[,5>n,5>nO#!dQ`O,5>nOOQ[,5>p,5>pO#!dQ`O,5>pOOQ[,5>r,5>rO##QQpO'#D_O%[QlO'#JvO##sQpO'#JvO##}QpO'#DmO#$`QpO'#DmO#&qQlO'#DmO#&xQ`O'#JuO#'QQ`O,5:WO#'VQ`O'#EtO#'eQ`O'#KUO#'mQ`O,5;_O#'rQpO'#DmO#(PQpO'#EVOOQ!0Lf,5:o,5:oO%[QlO,5:oO#(WQ`O,5:oO?YQ`O,5;YO!CUQpO,5;YO!C^QMhO,5;YO:dQMhO,5;YO#(`Q`O,5@bO#(eQ07dO,5:sOOQO-E<f-E<fO#)kQ!0MSO,5;RODWQpO,5:rO#)uQpO,5:rODWQpO,5;RO!ByQ!0LrO,5:rOOQ!0Lb'#Ej'#EjOOQO,5;R,5;RO%[QlO,5;RO#*SQ!0LrO,5;RO#*_Q!0LrO,5;RO!CUQpO,5:rOOQO,5;X,5;XO#*mQ!0LrO,5;RPOOO'#I^'#I^P#+RO&2DjO,58|POOO,58|,58|OOOO-E<^-E<^OOQ!0Lh1G.p1G.pOOOO-E<_-E<_OOOO,59},59}O#+^Q!bO,59}OOOO-E<a-E<aOOQ!0Lf1G/g1G/gO#+cQ!fO,5?OO+}QlO,5?OOOQO,5?U,5?UO#+mQlO'#IdOOQO-E<b-E<bO#+zQ`O,5@`O#,SQ!fO,5@`O#,ZQ`O,5@nOOQ!0Lf1G/m1G/mO%[QlO,5@oO#,cQ`O'#IjOOQO-E<h-E<hO#,ZQ`O,5@nOOQ!0Lb1G0x1G0xOOQ!0Ln1G/x1G/xOOQ!0Ln1G0Y1G0YO%[QlO,5@lO#,wQ!0LrO,5@lO#-YQ!0LrO,5@lO#-aQ`O,5@kO9eQ`O,5@kO#-iQ`O,5@kO#-wQ`O'#ImO#-aQ`O,5@kOOQ!0Lb1G0w1G0wO!(tQpO,5:uO!)PQpO,5:uOOQS,5:w,5:wO#.iQdO,5:wO#.qQMhO1G2yO9kQ`O1G2yOOQ!0Lf1G0u1G0uO#/PQ!0MxO1G0uO#0UQ!0MvO,5;VOOQ!0Lh'#GW'#GWO#0rQ!0MzO'#JlO!$wQlO1G0uO#2}Q!fO'#JwO%[QlO'#JwO#3XQ`O,5:eOOQ!0Lh'#D_'#D_OOQ!0Lf1G1O1G1OO%[QlO1G1OOOQ!0Lf1G1f1G1fO#3^Q`O1G1OO#5rQ!0MxO1G1PO#5yQ!0MxO1G1PO#8aQ!0MxO1G1PO#8hQ!0MxO1G1PO#;OQ!0MxO1G1PO#=fQ!0MxO1G1PO#=mQ!0MxO1G1PO#=tQ!0MxO1G1PO#@[Q!0MxO1G1PO#@cQ!0MxO1G1PO#BpQ?MtO'#CiO#DkQ?MtO1G1`O#DrQ?MtO'#JsO#EVQ!0MxO,5?[OOQ!0Lb-E<n-E<nO#GdQ!0MxO1G1PO#HaQ!0MzO1G1POOQ!0Lf1G1P1G1PO#IdQMjO'#J|O#InQ`O,5:xO#IsQ!0MxO1G1cO#JgQ,UO,5<WO#JoQ,UO,5<XO#JwQ,UO'#FoO#K`Q`O'#FnOOQO'#KY'#KYOOQO'#In'#InO#KeQ,UO1G1nOOQ!0Lf1G1n1G1nOOOW1G1y1G1yO#KvQ?MtO'#JrO#LQQ`O,5<bO!)[QlO,5<bOOOW-E<m-E<mOOQ!0Lf1G1l1G1lO#LVQpO'#KXOOQ!0Lf,5<d,5<dO#L_QpO,5<dO#LdQMhO'#DTOOOO'#Ib'#IbO#LkO#@ItO,59mOOQ!0Lh,59m,59mO%[QlO1G2PO!8lQ`O'#IrO#LvQ`O,5<zOOQ!0Lh,5<w,5<wO!,TQMhO'#IuO#MdQMjO,5=XO!,TQMhO'#IwO#NVQMjO,5=ZO!&zQMhO,5=]OOQO1G2S1G2SO#NaQ!dO'#CrO#NtQ(CWO'#ErO$ |QpO'#GbO$!dQ!dO,5<sO$!kQ`O'#K[O9eQ`O'#K[O$!yQ`O,5<uO$#aQ!dO'#C{O!,TQMhO,5<tO$#kQ`O'#GZO$$PQ`O,5<tO$$UQ!dO'#GWO$$cQ!dO'#K]O$$mQ`O'#K]O!&zQMhO'#K]O$$rQ`O,5<xO$$wQlO'#JvO$%RQpO'#GcO#$`QpO'#GcO$%dQ`O'#GgO!3oQ`O'#GkO$%iQ!0LrO'#ItO$%tQpO,5<|OOQ!0Lp,5<|,5<|O$%{QpO'#GcO$&YQpO'#GdO$&kQpO'#GdO$&pQMjO,5=XO$'QQMjO,5=ZOOQ!0Lh,5=^,5=^O!,TQMhO,5@VO!,TQMhO,5@VO$'bQ`O'#IyO$'vQ`O,5@UO$(OQ`O,59aOOQ!0Lh,59i,59iO$(TQ`O,5@VO$)TQ$IYO,59uOOQ!0Lh'#Jp'#JpO$)vQMjO,5<kO$*iQMjO,5<mO@zQ`O,5<oOOQ!0Lh,5<p,5<pO$*sQ`O,5<vO$*xQMjO,5<{O$+YQ`O'#KPO!$wQlO1G2RO$+_Q`O1G2RO9eQ`O'#KSO9eQ`O'#EtO%[QlO'#EtO9eQ`O'#I{O$+dQ!0LrO,5@{OOQ[1G2}1G2}OOQ[1G4`1G4`OOQ!0Lf1G/|1G/|OOQ!0Lf1G/z1G/zO$-fQ!0MxO1G0UOOQ[1G2y1G2yO!&zQMhO1G2yO%[QlO1G2yO#.tQ`O1G2yO$/jQMhO'#EkOOQ!0Lb,5@T,5@TO$/wQ!0LrO,5@TOOQ[1G.u1G.uO!ByQ!0LrO1G.uO!CUQpO1G.uO!C^QMhO1G.uO$0YQ`O1G0uO$0_Q`O'#CiO$0jQ`O'#KeO$0rQ`O,5=|O$0wQ`O'#KeO$0|Q`O'#KeO$1[Q`O'#JRO$1jQ`O,5AOO$1rQ!fO1G1iOOQ!0Lf1G1k1G1kO9kQ`O1G3fO@zQ`O1G3fO$1yQ`O1G3fO$2OQ`O1G3fO!DiQ`O1G3fO9uQ!0LrO1G3fOOQ[1G3f1G3fO!EcQ`O1G3UO!&zQMhO1G3RO$2TQ`O1G3ROOQ[1G3S1G3SO!&zQMhO1G3SO$2YQ`O1G3SO$2bQpO'#HQOOQ[1G3U1G3UO!6_QpO'#I}O!EhQ!bO1G3XOOQ[1G3X1G3XOOQ[,5=r,5=rO$2jQMhO,5=tO9kQ`O,5=tO$%dQ`O,5=vO9`Q`O,5=vO!CUQpO,5=vO!C^QMhO,5=vO:dQMhO,5=vO$2xQ`O'#KcO$3TQ`O,5=wOOQ[1G.k1G.kO$3YQ!0LrO1G.kO@zQ`O1G.kO$3eQ`O1G.kO9uQ!0LrO1G.kO$5mQ!fO,5AQO$5zQ`O,5AQO9eQ`O,5AQO$6VQlO,5>PO$6^Q`O,5>POOQ[1G3i1G3iO`QlO1G3iOOQ[1G3o1G3oOOQ[1G3q1G3qO?TQ`O1G3sO$6cQlO1G3uO$:gQlO'#HtOOQ[1G3x1G3xO$:tQ`O'#HzO?YQ`O'#H|OOQ[1G4O1G4OO$:|QlO1G4OO9uQ!0LrO1G4UOOQ[1G4W1G4WOOQ!0Lb'#G_'#G_O9uQ!0LrO1G4YO9uQ!0LrO1G4[O$?TQ`O,5@bO!)[QlO,5;`O9eQ`O,5;`O?YQ`O,5:XO!)[QlO,5:XO!CUQpO,5:XO$?YQ?MtO,5:XOOQO,5;`,5;`O$?dQpO'#IeO$?zQ`O,5@aOOQ!0Lf1G/r1G/rO$@SQpO'#IkO$@^Q`O,5@pOOQ!0Lb1G0y1G0yO#$`QpO,5:XOOQO'#Ig'#IgO$@fQpO,5:qOOQ!0Ln,5:q,5:qO#(ZQ`O1G0ZOOQ!0Lf1G0Z1G0ZO%[QlO1G0ZOOQ!0Lf1G0t1G0tO?YQ`O1G0tO!CUQpO1G0tO!C^QMhO1G0tOOQ!0Lb1G5|1G5|O!ByQ!0LrO1G0^OOQO1G0m1G0mO%[QlO1G0mO$@mQ!0LrO1G0mO$@xQ!0LrO1G0mO!CUQpO1G0^ODWQpO1G0^O$AWQ!0LrO1G0mOOQO1G0^1G0^O$AlQ!0MxO1G0mPOOO-E<[-E<[POOO1G.h1G.hOOOO1G/i1G/iO$AvQ!bO,5<iO$BOQ!fO1G4jOOQO1G4p1G4pO%[QlO,5?OO$BYQ`O1G5zO$BbQ`O1G6YO$BjQ!fO1G6ZO9eQ`O,5?UO$BtQ!0MxO1G6WO%[QlO1G6WO$CUQ!0LrO1G6WO$CgQ`O1G6VO$CgQ`O1G6VO9eQ`O1G6VO$CoQ`O,5?XO9eQ`O,5?XOOQO,5?X,5?XO$DTQ`O,5?XO$+YQ`O,5?XOOQO-E<k-E<kOOQS1G0a1G0aOOQS1G0c1G0cO#.lQ`O1G0cOOQ[7+(e7+(eO!&zQMhO7+(eO%[QlO7+(eO$DcQ`O7+(eO$DnQMhO7+(eO$D|Q!0MzO,5=XO$GXQ!0MzO,5=ZO$IdQ!0MzO,5=XO$KuQ!0MzO,5=ZO$NWQ!0MzO,59uO%!]Q!0MzO,5<kO%$hQ!0MzO,5<mO%&sQ!0MzO,5<{OOQ!0Lf7+&a7+&aO%)UQ!0MxO7+&aO%)xQlO'#IfO%*VQ`O,5@cO%*_Q!fO,5@cOOQ!0Lf1G0P1G0PO%*iQ`O7+&jOOQ!0Lf7+&j7+&jO%*nQ?MtO,5:fO%[QlO7+&zO%*xQ?MtO,5:bO%+VQ?MtO,5:jO%+aQ?MtO,5:lO%+kQMhO'#IiO%+uQ`O,5@hOOQ!0Lh1G0d1G0dOOQO1G1r1G1rOOQO1G1s1G1sO%+}Q!jO,5<ZO!)[QlO,5<YOOQO-E<l-E<lOOQ!0Lf7+'Y7+'YOOOW7+'e7+'eOOOW1G1|1G1|O%,YQ`O1G1|OOQ!0Lf1G2O1G2OOOOO,59o,59oO%,_Q!dO,59oOOOO-E<`-E<`OOQ!0Lh1G/X1G/XO%,fQ!0MxO7+'kOOQ!0Lh,5?^,5?^O%-YQMhO1G2fP%-aQ`O'#IrPOQ!0Lh-E<p-E<pO%-}QMjO,5?aOOQ!0Lh-E<s-E<sO%.pQMjO,5?cOOQ!0Lh-E<u-E<uO%.zQ!dO1G2wO%/RQ!dO'#CrO%/iQMhO'#KSO$$wQlO'#JvOOQ!0Lh1G2_1G2_O%/sQ`O'#IqO%0[Q`O,5@vO%0[Q`O,5@vO%0dQ`O,5@vO%0oQ`O,5@vOOQO1G2a1G2aO%0}QMjO1G2`O$+YQ`O'#K[O!,TQMhO1G2`O%1_Q(CWO'#IsO%1lQ`O,5@wO!&zQMhO,5@wO%1tQ!dO,5@wOOQ!0Lh1G2d1G2dO%4UQ!fO'#CiO%4`Q`O,5=POOQ!0Lb,5<},5<}O%4hQpO,5<}OOQ!0Lb,5=O,5=OOCwQ`O,5<}O%4sQpO,5<}OOQ!0Lb,5=R,5=RO$+YQ`O,5=VOOQO,5?`,5?`OOQO-E<r-E<rOOQ!0Lp1G2h1G2hO#$`QpO,5<}O$$wQlO,5=PO%5RQ`O,5=OO%5^QpO,5=OO!,TQMhO'#IuO%6WQMjO1G2sO!,TQMhO'#IwO%6yQMjO1G2uO%7TQMjO1G5qO%7_QMjO1G5qOOQO,5?e,5?eOOQO-E<w-E<wOOQO1G.{1G.{O!,TQMhO1G5qO!,TQMhO1G5qO!:]QpO,59wO%[QlO,59wOOQ!0Lh,5<j,5<jO%7lQ`O1G2ZO!,TQMhO1G2bO%7qQ!0MxO7+'mOOQ!0Lf7+'m7+'mO!$wQlO7+'mO%8eQ`O,5;`OOQ!0Lb,5?g,5?gOOQ!0Lb-E<y-E<yO%8jQ!dO'#K^O#(ZQ`O7+(eO4UQ!fO7+(eO$DfQ`O7+(eO%8tQ!0MvO'#CiO%9XQ!0MvO,5=SO%9lQ`O,5=SO%9tQ`O,5=SOOQ!0Lb1G5o1G5oOOQ[7+$a7+$aO!ByQ!0LrO7+$aO!CUQpO7+$aO!$wQlO7+&aO%9yQ`O'#JQO%:bQ`O,5APOOQO1G3h1G3hO9kQ`O,5APO%:bQ`O,5APO%:jQ`O,5APOOQO,5?m,5?mOOQO-E=P-E=POOQ!0Lf7+'T7+'TO%:oQ`O7+)QO9uQ!0LrO7+)QO9kQ`O7+)QO@zQ`O7+)QO%:tQ`O7+)QOOQ[7+)Q7+)QOOQ[7+(p7+(pO%:yQ!0MvO7+(mO!&zQMhO7+(mO!E^Q`O7+(nOOQ[7+(n7+(nO!&zQMhO7+(nO%;TQ`O'#KbO%;`Q`O,5=lOOQO,5?i,5?iOOQO-E<{-E<{OOQ[7+(s7+(sO%<rQpO'#HZOOQ[1G3`1G3`O!&zQMhO1G3`O%[QlO1G3`O%<yQ`O1G3`O%=UQMhO1G3`O9uQ!0LrO1G3bO$%dQ`O1G3bO9`Q`O1G3bO!CUQpO1G3bO!C^QMhO1G3bO%=dQ`O'#JPO%=xQ`O,5@}O%>QQpO,5@}OOQ!0Lb1G3c1G3cOOQ[7+$V7+$VO@zQ`O7+$VO9uQ!0LrO7+$VO%>]Q`O7+$VO%[QlO1G6lO%[QlO1G6mO%>bQ!0LrO1G6lO%>lQlO1G3kO%>sQ`O1G3kO%>xQlO1G3kOOQ[7+)T7+)TO9uQ!0LrO7+)_O`QlO7+)aOOQ['#Kh'#KhOOQ['#JS'#JSO%?PQlO,5>`OOQ[,5>`,5>`O%[QlO'#HuO%?^Q`O'#HwOOQ[,5>f,5>fO9eQ`O,5>fOOQ[,5>h,5>hOOQ[7+)j7+)jOOQ[7+)p7+)pOOQ[7+)t7+)tOOQ[7+)v7+)vO%?cQpO1G5|O%?}Q?MtO1G0zO%@XQ`O1G0zOOQO1G/s1G/sO%@dQ?MtO1G/sO?YQ`O1G/sO!)[QlO'#DmOOQO,5?P,5?POOQO-E<c-E<cOOQO,5?V,5?VOOQO-E<i-E<iO!CUQpO1G/sOOQO-E<e-E<eOOQ!0Ln1G0]1G0]OOQ!0Lf7+%u7+%uO#(ZQ`O7+%uOOQ!0Lf7+&`7+&`O?YQ`O7+&`O!CUQpO7+&`OOQO7+%x7+%xO$AlQ!0MxO7+&XOOQO7+&X7+&XO%[QlO7+&XO%@nQ!0LrO7+&XO!ByQ!0LrO7+%xO!CUQpO7+%xO%@yQ!0LrO7+&XO%AXQ!0MxO7++rO%[QlO7++rO%AiQ`O7++qO%AiQ`O7++qOOQO1G4s1G4sO9eQ`O1G4sO%AqQ`O1G4sOOQS7+%}7+%}O#(ZQ`O<<LPO4UQ!fO<<LPO%BPQ`O<<LPOOQ[<<LP<<LPO!&zQMhO<<LPO%[QlO<<LPO%BXQ`O<<LPO%BdQ!0MzO,5?aO%DoQ!0MzO,5?cO%FzQ!0MzO1G2`O%I]Q!0MzO1G2sO%KhQ!0MzO1G2uO%MsQ!fO,5?QO%[QlO,5?QOOQO-E<d-E<dO%M}Q`O1G5}OOQ!0Lf<<JU<<JUO%NVQ?MtO1G0uO&!^Q?MtO1G1PO&!eQ?MtO1G1PO&$fQ?MtO1G1PO&$mQ?MtO1G1PO&&nQ?MtO1G1PO&(oQ?MtO1G1PO&(vQ?MtO1G1PO&(}Q?MtO1G1PO&+OQ?MtO1G1PO&+VQ?MtO1G1PO&+^Q!0MxO<<JfO&-UQ?MtO1G1PO&.RQ?MvO1G1PO&/UQ?MvO'#JlO&1[Q?MtO1G1cO&1iQ?MtO1G0UO&1sQMjO,5?TOOQO-E<g-E<gO!)[QlO'#FqOOQO'#KZ'#KZOOQO1G1u1G1uO&1}Q`O1G1tO&2SQ?MtO,5?[OOOW7+'h7+'hOOOO1G/Z1G/ZO&2^Q!dO1G4xOOQ!0Lh7+(Q7+(QP!&zQMhO,5?^O!,TQMhO7+(cO&2eQ`O,5?]O9eQ`O,5?]O$+YQ`O,5?]OOQO-E<o-E<oO&2sQ`O1G6bO&2sQ`O1G6bO&2{Q`O1G6bO&3WQMjO7+'zO&3hQ!dO,5?_O&3rQ`O,5?_O!&zQMhO,5?_OOQO-E<q-E<qO&3wQ!dO1G6cO&4RQ`O1G6cO&4ZQ`O1G2kO!&zQMhO1G2kOOQ!0Lb1G2i1G2iOOQ!0Lb1G2j1G2jO%4hQpO1G2iO!CUQpO1G2iOCwQ`O1G2iOOQ!0Lb1G2q1G2qO&4`QpO1G2iO&4nQ`O1G2kO$+YQ`O1G2jOCwQ`O1G2jO$$wQlO1G2kO&4vQ`O1G2jO&5jQMjO,5?aOOQ!0Lh-E<t-E<tO&6]QMjO,5?cOOQ!0Lh-E<v-E<vO!,TQMhO7++]O&6gQMjO7++]O&6qQMjO7++]OOQ!0Lh1G/c1G/cO&7OQ`O1G/cOOQ!0Lh7+'u7+'uO&7TQMjO7+'|O&7eQ!0MxO<<KXOOQ!0Lf<<KX<<KXO&8XQ`O1G0zO!&zQMhO'#IzO&8^Q`O,5@xO&:`Q!fO<<LPO!&zQMhO1G2nO&:gQ!0LrO1G2nOOQ[<<G{<<G{O!ByQ!0LrO<<G{O&:xQ!0MxO<<I{OOQ!0Lf<<I{<<I{OOQO,5?l,5?lO&;lQ`O,5?lO&;qQ`O,5?lOOQO-E=O-E=OO&<PQ`O1G6kO&<PQ`O1G6kO9kQ`O1G6kO@zQ`O<<LlOOQ[<<Ll<<LlO&<XQ`O<<LlO9uQ!0LrO<<LlO9kQ`O<<LlOOQ[<<LX<<LXO%:yQ!0MvO<<LXOOQ[<<LY<<LYO!E^Q`O<<LYO&<^QpO'#I|O&<iQ`O,5@|O!)[QlO,5@|OOQ[1G3W1G3WOOQO'#JO'#JOO9uQ!0LrO'#JOO&<qQpO,5=uOOQ[,5=u,5=uO&<xQpO'#EgO&=PQpO'#GeO&=UQ`O7+(zO&=ZQ`O7+(zOOQ[7+(z7+(zO!&zQMhO7+(zO%[QlO7+(zO&=cQ`O7+(zOOQ[7+(|7+(|O9uQ!0LrO7+(|O$%dQ`O7+(|O9`Q`O7+(|O!CUQpO7+(|O&=nQ`O,5?kOOQO-E<}-E<}OOQO'#H^'#H^O&=yQ`O1G6iO9uQ!0LrO<<GqOOQ[<<Gq<<GqO@zQ`O<<GqO&>RQ`O7+,WO&>WQ`O7+,XO%[QlO7+,WO%[QlO7+,XOOQ[7+)V7+)VO&>]Q`O7+)VO&>bQlO7+)VO&>iQ`O7+)VOOQ[<<Ly<<LyOOQ[<<L{<<L{OOQ[-E=Q-E=QOOQ[1G3z1G3zO&>nQ`O,5>aOOQ[,5>c,5>cO&>sQ`O1G4QO9eQ`O7+&fO!)[QlO7+&fOOQO7+%_7+%_O&>xQ?MtO1G6ZO?YQ`O7+%_OOQ!0Lf<<Ia<<IaOOQ!0Lf<<Iz<<IzO?YQ`O<<IzOOQO<<Is<<IsO$AlQ!0MxO<<IsO%[QlO<<IsOOQO<<Id<<IdO!ByQ!0LrO<<IdO&?SQ!0LrO<<IsO&?_Q!0MxO<= ^O&?oQ`O<= ]OOQO7+*_7+*_O9eQ`O7+*_OOQ[ANAkANAkO&?wQ!fOANAkO!&zQMhOANAkO#(ZQ`OANAkO4UQ!fOANAkO&@OQ`OANAkO%[QlOANAkO&@WQ!0MzO7+'zO&BiQ!0MzO,5?aO&DtQ!0MzO,5?cO&GPQ!0MzO7+'|O&IbQ!fO1G4lO&IlQ?MtO7+&aO&KpQ?MvO,5=XO&MwQ?MvO,5=ZO&NXQ?MvO,5=XO&NiQ?MvO,5=ZO&NyQ?MvO,59uO'#PQ?MvO,5<kO'%SQ?MvO,5<mO''hQ?MvO,5<{O')^Q?MtO7+'kO')kQ?MtO7+'mO')xQ`O,5<]OOQO7+'`7+'`OOQ!0Lh7+*d7+*dO')}QMjO<<K}OOQO1G4w1G4wO'*UQ`O1G4wO'*aQ`O1G4wO'*oQ`O7++|O'*oQ`O7++|O!&zQMhO1G4yO'*wQ!dO1G4yO'+RQ`O7++}O'+ZQ`O7+(VO'+fQ!dO7+(VOOQ!0Lb7+(T7+(TOOQ!0Lb7+(U7+(UO!CUQpO7+(TOCwQ`O7+(TO'+pQ`O7+(VO!&zQMhO7+(VO$+YQ`O7+(UO'+uQ`O7+(VOCwQ`O7+(UO'+}QMjO<<NwO!,TQMhO<<NwOOQ!0Lh7+$}7+$}O',XQ!dO,5?fOOQO-E<x-E<xO',cQ!0MvO7+(YO!&zQMhO7+(YOOQ[AN=gAN=gO9kQ`O1G5WOOQO1G5W1G5WO',sQ`O1G5WO',xQ`O7+,VO',xQ`O7+,VO9uQ!0LrOANBWO@zQ`OANBWOOQ[ANBWANBWO'-QQ`OANBWOOQ[ANAsANAsOOQ[ANAtANAtO'-VQ`O,5?hOOQO-E<z-E<zO'-bQ?MtO1G6hOOQO,5?j,5?jOOQO-E<|-E<|OOQ[1G3a1G3aO'-lQ`O,5=POOQ[<<Lf<<LfO!&zQMhO<<LfO&=UQ`O<<LfO'-qQ`O<<LfO%[QlO<<LfOOQ[<<Lh<<LhO9uQ!0LrO<<LhO$%dQ`O<<LhO9`Q`O<<LhO'-yQpO1G5VO'.UQ`O7+,TOOQ[AN=]AN=]O9uQ!0LrOAN=]OOQ[<= r<= rOOQ[<= s<= sO'.^Q`O<= rO'.cQ`O<= sOOQ[<<Lq<<LqO'.hQ`O<<LqO'.mQlO<<LqOOQ[1G3{1G3{O?YQ`O7+)lO'.tQ`O<<JQO'/PQ?MtO<<JQOOQO<<Hy<<HyOOQ!0LfAN?fAN?fOOQOAN?_AN?_O$AlQ!0MxOAN?_OOQOAN?OAN?OO%[QlOAN?_OOQO<<My<<MyOOQ[G27VG27VO!&zQMhOG27VO#(ZQ`OG27VO'/ZQ!fOG27VO4UQ!fOG27VO'/bQ`OG27VO'/jQ?MtO<<JfO'/wQ?MvO1G2`O'1mQ?MvO,5?aO'3pQ?MvO,5?cO'5sQ?MvO1G2sO'7vQ?MvO1G2uO'9yQ?MtO<<KXO':WQ?MtO<<I{OOQO1G1w1G1wO!,TQMhOANAiOOQO7+*c7+*cO':eQ`O7+*cO':pQ`O<= hO':xQ!dO7+*eOOQ!0Lb<<Kq<<KqO$+YQ`O<<KqOCwQ`O<<KqO';SQ`O<<KqO!&zQMhO<<KqOOQ!0Lb<<Ko<<KoO!CUQpO<<KoO';_Q!dO<<KqOOQ!0Lb<<Kp<<KpO';iQ`O<<KqO!&zQMhO<<KqO$+YQ`O<<KpO';nQMjOANDcO';xQ!0MvO<<KtOOQO7+*r7+*rO9kQ`O7+*rO'<YQ`O<= qOOQ[G27rG27rO9uQ!0LrOG27rO@zQ`OG27rO!)[QlO1G5SO'<bQ`O7+,SO'<jQ`O1G2kO&=UQ`OANBQOOQ[ANBQANBQO!&zQMhOANBQO'<oQ`OANBQOOQ[ANBSANBSO9uQ!0LrOANBSO$%dQ`OANBSOOQO'#H_'#H_OOQO7+*q7+*qOOQ[G22wG22wOOQ[ANE^ANE^OOQ[ANE_ANE_OOQ[ANB]ANB]O'<wQ`OANB]OOQ[<<MW<<MWO!)[QlOAN?lOOQOG24yG24yO$AlQ!0MxOG24yO#(ZQ`OLD,qOOQ[LD,qLD,qO!&zQMhOLD,qO'<|Q!fOLD,qO'=TQ?MvO7+'zO'>yQ?MvO,5?aO'@|Q?MvO,5?cO'CPQ?MvO7+'|O'DuQMjOG27TOOQO<<M}<<M}OOQ!0LbANA]ANA]O$+YQ`OANA]OCwQ`OANA]O'EVQ!dOANA]OOQ!0LbANAZANAZO'E^Q`OANA]O!&zQMhOANA]O'EiQ!dOANA]OOQ!0LbANA[ANA[OOQO<<N^<<N^OOQ[LD-^LD-^O9uQ!0LrOLD-^O'EsQ?MtO7+*nOOQO'#Gf'#GfOOQ[G27lG27lO&=UQ`OG27lO!&zQMhOG27lOOQ[G27nG27nO9uQ!0LrOG27nOOQ[G27wG27wO'E}Q?MtOG25WOOQOLD*eLD*eOOQ[!$(!]!$(!]O#(ZQ`O!$(!]O!&zQMhO!$(!]O'FXQ!0MzOG27TOOQ!0LbG26wG26wO$+YQ`OG26wO'HjQ`OG26wOCwQ`OG26wO'HuQ!dOG26wO!&zQMhOG26wOOQ[!$(!x!$(!xOOQ[LD-WLD-WO&=UQ`OLD-WOOQ[LD-YLD-YOOQ[!)9Ew!)9EwO#(ZQ`O!)9EwOOQ!0LbLD,cLD,cO$+YQ`OLD,cOCwQ`OLD,cO'H|Q`OLD,cO'IXQ!dOLD,cOOQ[!$(!r!$(!rOOQ[!.K;c!.K;cO'I`Q?MvOG27TOOQ!0Lb!$( }!$( }O$+YQ`O!$( }OCwQ`O!$( }O'KUQ`O!$( }OOQ!0Lb!)9Ei!)9EiO$+YQ`O!)9EiOCwQ`O!)9EiOOQ!0Lb!.K;T!.K;TO$+YQ`O!.K;TOOQ!0Lb!4/0o!4/0oO!)[QlO'#DzO1PQ`O'#EXO'KaQ!fO'#JrO'KhQ!L^O'#DvO'KoQlO'#EOO'KvQ!fO'#CiO'N^Q!fO'#CiO!)[QlO'#EQO'NnQlO,5;ZO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO'#IpO(!qQ`O,5<iO!)[QlO,5;eO(!yQMhO,5;eO($dQMhO,5;eO!)[QlO,5;wO!&zQMhO'#GmO(!yQMhO'#GmO!&zQMhO'#GoO(!yQMhO'#GoO1SQ`O'#DZO1SQ`O'#DZO!&zQMhO'#GPO(!yQMhO'#GPO!&zQMhO'#GRO(!yQMhO'#GRO!&zQMhO'#GaO(!yQMhO'#GaO!)[QlO,5:jO($kQpO'#D_O($uQpO'#JvO!)[QlO,5@oO'NnQlO1G0uO(%PQ?MtO'#CiO!)[QlO1G2PO!&zQMhO'#IuO(!yQMhO'#IuO!&zQMhO'#IwO(!yQMhO'#IwO(%ZQ!dO'#CrO!&zQMhO,5<tO(!yQMhO,5<tO'NnQlO1G2RO!)[QlO7+&zO!&zQMhO1G2`O(!yQMhO1G2`O!&zQMhO'#IuO(!yQMhO'#IuO!&zQMhO'#IwO(!yQMhO'#IwO!&zQMhO1G2bO(!yQMhO1G2bO'NnQlO7+'mO'NnQlO7+&aO!&zQMhOANAiO(!yQMhOANAiO(%nQ`O'#EoO(%sQ`O'#EoO(%{Q`O'#F]O(&QQ`O'#EyO(&VQ`O'#KTO(&bQ`O'#KRO(&mQ`O,5;ZO(&rQMjO,5<eO(&yQ`O'#GYO('OQ`O'#GYO('TQ`O,5<eO(']Q`O,5<gO('eQ`O,5;ZO('mQ?MtO1G1`O('tQ`O,5<tO('yQ`O,5<tO((OQ`O,5<vO((TQ`O,5<vO((YQ`O1G2RO((_Q`O1G0uO((dQMjO<<K}O((kQMjO<<K}O((rQMhO'#F|O9`Q`O'#F{OAuQ`O'#EnO!)[QlO,5;tO!3oQ`O'#GYO!3oQ`O'#GYO!3oQ`O'#G[O!3oQ`O'#G[O!,TQMhO7+(cO!,TQMhO7+(cO%.zQ!dO1G2wO%.zQ!dO1G2wO!&zQMhO,5=]O!&zQMhO,5=]",
  stateData: "()x~O'|OS'}OSTOS(ORQ~OPYOQYOSfOY!VOaqOdzOeyOl!POpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!uwO!xxO!|]O$W|O$niO%h}O%j!QO%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO%y!UO&W!WO&^!XO&`!YO&b!ZO&d![O&g!]O&m!^O&s!_O&u!`O&w!aO&y!bO&{!cO(TSO(VTO(YUO(aVO(o[O~OWtO~P`OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oa!wOs!nO!S!oO!b!yO!c!vO!d!vO!|<VO#T!pO#U!pO#V!xO#W!pO#X!pO#[!zO#]!zO(U!lO(VTO(YUO(e!mO(o!sO~O(O!{O~OP]XR]X[]Xa]Xj]Xr]X!Q]X!S]X!]]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X'z]X(a]X(r]X(y]X(z]X~O!g%RX~P(qO_!}O(V#PO(W!}O(X#PO~O_#QO(X#PO(Y#PO(Z#QO~Ox#SO!U#TO(b#TO(c#VO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T<ZO(VTO(YUO(aVO(o[O~O![#ZO!]#WO!Y(hP!Y(vP~P+}O!^#cO~P`OPYOQYOSfOd!jOe!iOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(VTO(YUO(aVO(o[O~Op#mO![#iO!|]O#i#lO#j#iO(T<[O!k(sP~P.iO!l#oO(T#nO~O!x#sO!|]O%h#tO~O#k#uO~O!g#vO#k#uO~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!]$_O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~Oa(fX'z(fX'w(fX!k(fX!Y(fX!_(fX%i(fX!g(fX~P1qO#S$dO#`$eO$Q$eOP(gXR(gX[(gXj(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX!_(gX%i(gX~Oa(gX'z(gX'w(gX!Y(gX!k(gXv(gX!g(gX~P4UO#`$eO~O$]$hO$_$gO$f$mO~OSfO!_$nO$i$oO$k$qO~Oh%VOj%dOk%dOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#j%cO$W%`O$t%^O$v%_O$y%aO(T$sO(VTO(YUO(a$uO(y$}O(z%POg(^P~Ol%[O~P7eO!l%eO~O!S%hO!_%iO(T%gO~O!g%mO~Oa%nO'z%nO~O!Q%rO~P%[O(U!lO~P%[O%n%vO~P%[Oh%VO!l%eO(T%gO(U!lO~Oe%}O!l%eO(T%gO~Oj$RO~O!_&PO(T%gO(U!lO(VTO(YUO`)WP~O!Q&SO!l&RO%j&VO&T&WO~P;SO!x#sO~O%s&YO!S)SX!_)SX(T)SX~O(T&ZO~Ol!PO!u&`O%j!QO%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO~Od&eOe&dO!x&bO%h&cO%{&aO~P<bOd&hOeyOl!PO!_&gO!u&`O!xxO!|]O%h}O%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO%y!UO~Ob&kO#`&nO%j&iO(U!lO~P=gO!l&oO!u&sO~O!l#oO~O!_XO~Oa%nO'x&{O'z%nO~Oa%nO'x'OO'z%nO~Oa%nO'x'QO'z%nO~O'w]X!Y]Xv]X!k]X&[]X!_]X%i]X!g]X~P(qO!b'_O!c'WO!d'WO(U!lO(VTO(YUO~Os'UO!S'TO!['XO(e'SO!^(iP!^(xP~P@nOn'bO!_'`O(T%gO~Oe'gO!l%eO(T%gO~O!Q&SO!l&RO~Os!nO!S!oO!|<VO#T!pO#U!pO#W!pO#X!pO(U!lO(VTO(YUO(e!mO(o!sO~O!b'mO!c'lO!d'lO#V!pO#['nO#]'nO~PBYOa%nOh%VO!g#vO!l%eO'z%nO(r'pO~O!p'tO#`'rO~PChOs!nO!S!oO(VTO(YUO(e!mO(o!sO~O!_XOs(mX!S(mX!b(mX!c(mX!d(mX!|(mX#T(mX#U(mX#V(mX#W(mX#X(mX#[(mX#](mX(U(mX(V(mX(Y(mX(e(mX(o(mX~O!c'lO!d'lO(U!lO~PDWO(P'xO(Q'xO(R'zO~O_!}O(V'|O(W!}O(X'|O~O_#QO(X'|O(Y'|O(Z#QO~Ov(OO~P%[Ox#SO!U#TO(b#TO(c(RO~O![(TO!Y'WX!Y'^X!]'WX!]'^X~P+}O!](VO!Y(hX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!](VO!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~O!Y(hX~PHRO!Y([O~O!Y(uX!](uX!g(uX!k(uX(r(uX~O#`(uX#k#dX!^(uX~PJUO#`(]O!Y(wX!](wX~O!](^O!Y(vX~O!Y(aO~O#`$eO~PJUO!^(bO~P`OR#zO!Q#yO!S#{O!l#xO(aVOP!na[!naj!nar!na!]!na!p!na#R!na#n!na#o!na#p!na#q!na#r!na#s!na#t!na#u!na#v!na#x!na#z!na#{!na(r!na(y!na(z!na~Oa!na'z!na'w!na!Y!na!k!nav!na!_!na%i!na!g!na~PKlO!k(cO~O!g#vO#`(dO(r'pO!](tXa(tX'z(tX~O!k(tX~PNXO!S%hO!_%iO!|]O#i(iO#j(hO(T%gO~O!](jO!k(sX~O!k(lO~O!S%hO!_%iO#j(hO(T%gO~OP(gXR(gX[(gXj(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX~O!g#vO!k(gX~P! uOR(nO!Q(mO!l#xO#S$dO!|!{a!S!{a~O!x!{a%h!{a!_!{a#i!{a#j!{a(T!{a~P!#vO!x(rO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~O#k(xO~O![(zO!k(kP~P%[O(e(|O(o[O~O!S)OO!l#xO(e(|O(o[O~OP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_!eO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(T)]O(VTO(YUO(aVO(o[O~O!]$_Oa$qa'z$qa'w$qa!k$qa!Y$qa!_$qa%i$qa!g$qa~Ol)dO~P!&zOh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#j%cO$W%`O$t%^O$v%_O$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~Og(pP~P!,TO!Q)iO!g)hO!_$^X$Z$^X$]$^X$_$^X$f$^X~O!g)hO!_({X$Z({X$]({X$_({X$f({X~O!Q)iO~P!.^O!Q)iO!_({X$Z({X$]({X$_({X$f({X~O!_)kO$Z)oO$])jO$_)jO$f)pO~O![)sO~P!)[O$]$hO$_$gO$f)wO~On$zX!Q$zX#S$zX'y$zX(y$zX(z$zX~OgmXg$zXnmX!]mX#`mX~P!0SOx)yO(b)zO(c)|O~On*VO!Q*OO'y*PO(y$}O(z%PO~Og)}O~P!1WOg*WO~Oh%VOr%XOs$tOt$tOz%YO|%ZO!O<sO!S*YO!_*ZO!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(VTO(YUO(a$uO(y$}O(z%PO~Op*`O![*^O(T*XO!k)OP~P!1uO#k*aO~O!l*bO~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(T*dO(VTO(YUO(a$uO(y$}O(z%PO~O![*gO!Y)PP~P!3tOr*sOs!nO!S*iO!b*qO!c*kO!d*kO!l*bO#[*rO%`*mO(U!lO(VTO(YUO(e!mO~O!^*pO~P!5iO#S$dOn(`X!Q(`X'y(`X(y(`X(z(`X!](`X#`(`X~Og(`X$O(`X~P!6kOn*xO#`*wOg(_X!](_X~O!]*yOg(^X~Oj%dOk%dOl%dO(T&ZOg(^P~Os*|O~Og)}O(T&ZO~O!l+SO~O(T(vO~Op+WO!S%hO![#iO!_%iO!|]O#i#lO#j#iO(T%gO!k(sP~O!g#vO#k+XO~O!S%hO![+ZO!](^O!_%iO(T%gO!Y(vP~Os'[O!S+]O![+[O(VTO(YUO(e(|O~O!^(xP~P!9|O!]+^Oa)TX'z)TX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~Oa!ja!]!ja'z!ja'w!ja!Y!ja!k!jav!ja!_!ja%i!ja!g!ja~P!:tOR#zO!Q#yO!S#{O!l#xO(aVOP!ra[!raj!rar!ra!]!ra!p!ra#R!ra#n!ra#o!ra#p!ra#q!ra#r!ra#s!ra#t!ra#u!ra#v!ra#x!ra#z!ra#{!ra(r!ra(y!ra(z!ra~Oa!ra'z!ra'w!ra!Y!ra!k!rav!ra!_!ra%i!ra!g!ra~P!=[OR#zO!Q#yO!S#{O!l#xO(aVOP!ta[!taj!tar!ta!]!ta!p!ta#R!ta#n!ta#o!ta#p!ta#q!ta#r!ta#s!ta#t!ta#u!ta#v!ta#x!ta#z!ta#{!ta(r!ta(y!ta(z!ta~Oa!ta'z!ta'w!ta!Y!ta!k!tav!ta!_!ta%i!ta!g!ta~P!?rOh%VOn+gO!_'`O%i+fO~O!g+iOa(]X!_(]X'z(]X!](]X~Oa%nO!_XO'z%nO~Oh%VO!l%eO~Oh%VO!l%eO(T%gO~O!g#vO#k(xO~Ob+tO%j+uO(T+qO(VTO(YUO!^)XP~O!]+vO`)WX~O[+zO~O`+{O~O!_&PO(T%gO(U!lO`)WP~O%j,OO~P;SOh%VO#`,SO~Oh%VOn,VO!_$|O~O!_,XO~O!Q,ZO!_XO~O%n%vO~O!x,`O~Oe,eO~Ob,fO(T#nO(VTO(YUO!^)VP~Oe%}O~O%j!QO(T&ZO~P=gO[,kO`,jO~OPYOQYOSfOdzOeyOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!iuO!lZO!oYO!pYO!qYO!svO!xxO!|]O$niO%h}O(VTO(YUO(aVO(o[O~O!_!eO!u!gO$W!kO(T!dO~P!FyO`,jOa%nO'z%nO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oa,pOl!OO!uwO%l!OO%m!OO%n!OO~P!IcO!l&oO~O&^,vO~O!_,xO~O&o,zO&q,{OP&laQ&laS&laY&laa&lad&lae&lal&lap&lar&las&lat&laz&la|&la!O&la!S&la!W&la!X&la!_&la!i&la!l&la!o&la!p&la!q&la!s&la!u&la!x&la!|&la$W&la$n&la%h&la%j&la%l&la%m&la%n&la%q&la%s&la%v&la%w&la%y&la&W&la&^&la&`&la&b&la&d&la&g&la&m&la&s&la&u&la&w&la&y&la&{&la'w&la(T&la(V&la(Y&la(a&la(o&la!^&la&e&lab&la&j&la~O(T-QO~Oh!eX!]!RX!^!RX!g!RX!g!eX!l!eX#`!RX~O!]!eX!^!eX~P#!iO!g-VO#`-UOh(jX!]#hX!^#hX!g(jX!l(jX~O!](jX!^(jX~P##[Oh%VO!g-XO!l%eO!]!aX!^!aX~Os!nO!S!oO(VTO(YUO(e!mO~OP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_!eO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(VTO(YUO(aVO(o[O~O(T=QO~P#$qO!]-]O!^(iX~O!^-_O~O!g-VO#`-UO!]#hX!^#hX~O!]-`O!^(xX~O!^-bO~O!c-cO!d-cO(U!lO~P#$`O!^-fO~P'_On-iO!_'`O~O!Y-nO~Os!{a!b!{a!c!{a!d!{a#T!{a#U!{a#V!{a#W!{a#X!{a#[!{a#]!{a(U!{a(V!{a(Y!{a(e!{a(o!{a~P!#vO!p-sO#`-qO~PChO!c-uO!d-uO(U!lO~PDWOa%nO#`-qO'z%nO~Oa%nO!g#vO#`-qO'z%nO~Oa%nO!g#vO!p-sO#`-qO'z%nO(r'pO~O(P'xO(Q'xO(R-zO~Ov-{O~O!Y'Wa!]'Wa~P!:tO![.PO!Y'WX!]'WX~P%[O!](VO!Y(ha~O!Y(ha~PHRO!](^O!Y(va~O!S%hO![.TO!_%iO(T%gO!Y'^X!]'^X~O#`.VO!](ta!k(taa(ta'z(ta~O!g#vO~P#,wO!](jO!k(sa~O!S%hO!_%iO#j.ZO(T%gO~Op.`O!S%hO![.]O!_%iO!|]O#i._O#j.]O(T%gO!]'aX!k'aX~OR.dO!l#xO~Oh%VOn.gO!_'`O%i.fO~Oa#ci!]#ci'z#ci'w#ci!Y#ci!k#civ#ci!_#ci%i#ci!g#ci~P!:tOn>]O!Q*OO'y*PO(y$}O(z%PO~O#k#_aa#_a#`#_a'z#_a!]#_a!k#_a!_#_a!Y#_a~P#/sO#k(`XP(`XR(`X[(`Xa(`Xj(`Xr(`X!S(`X!l(`X!p(`X#R(`X#n(`X#o(`X#p(`X#q(`X#r(`X#s(`X#t(`X#u(`X#v(`X#x(`X#z(`X#{(`X'z(`X(a(`X(r(`X!k(`X!Y(`X'w(`Xv(`X!_(`X%i(`X!g(`X~P!6kO!].tO!k(kX~P!:tO!k.wO~O!Y.yO~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(aVO[#mia#mij#mir#mi!]#mi#R#mi#o#mi#p#mi#q#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#n#mi~P#3cO#n$OO~P#3cOP$[OR#zOr$aO!Q#yO!S#{O!l#xO!p$[O#n$OO#o$PO#p$PO#q$PO(aVO[#mia#mij#mi!]#mi#R#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#r#mi~P#6QO#r$QO~P#6QOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO(aVOa#mi!]#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#v#mi~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO(aVO(z#}Oa#mi!]#mi#z#mi#{#mi'z#mi(r#mi(y#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#x$UO~P#;VO#x#mi~P#;VO#v$SO~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO(aVO(y#|O(z#}Oa#mi!]#mi#{#mi'z#mi(r#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#z#mi~P#={O#z$WO~P#={OP]XR]X[]Xj]Xr]X!Q]X!S]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X!]]X!^]X~O$O]X~P#@jOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO#x<eO#z<gO#{<hO(aVO(r$YO(y#|O(z#}O~O$O.{O~P#BwO#S$dO#`<nO$Q<nO$O(gX!^(gX~P! uOa'da!]'da'z'da'w'da!k'da!Y'dav'da!_'da%i'da!g'da~P!:tO[#mia#mij#mir#mi!]#mi#R#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#n$OO#o$PO#p$PO#q$PO(aVO(y#mi(z#mi~P#EyOn>]O!Q*OO'y*PO(y$}O(z%POP#miR#mi!S#mi!l#mi!p#mi#n#mi#o#mi#p#mi#q#mi(a#mi~P#EyO!]/POg(pX~P!1WOg/RO~Oa$Pi!]$Pi'z$Pi'w$Pi!Y$Pi!k$Piv$Pi!_$Pi%i$Pi!g$Pi~P!:tO$]/SO$_/SO~O$]/TO$_/TO~O!g)hO#`/UO!_$cX$Z$cX$]$cX$_$cX$f$cX~O![/VO~O!_)kO$Z/XO$])jO$_)jO$f/YO~O!]<iO!^(fX~P#BwO!^/ZO~O!g)hO$f({X~O$f/]O~Ov/^O~P!&zOx)yO(b)zO(c/aO~O!S/dO~O(y$}On%aa!Q%aa'y%aa(z%aa!]%aa#`%aa~Og%aa$O%aa~P#L{O(z%POn%ca!Q%ca'y%ca(y%ca!]%ca#`%ca~Og%ca$O%ca~P#MnO!]fX!gfX!kfX!k$zX(rfX~P!0SOp%WO![/mO!](^O(T/lO!Y(vP!Y)PP~P!1uOr*sO!b*qO!c*kO!d*kO!l*bO#[*rO%`*mO(U!lO(VTO(YUO~Os<}O!S/nO![+[O!^*pO(e<|O!^(xP~P$ [O!k/oO~P#/sO!]/pO!g#vO(r'pO!k)OX~O!k/uO~OnoX!QoX'yoX(yoX(zoX~O!g#vO!koX~P$#OOp/wO!S%hO![*^O!_%iO(T%gO!k)OP~O#k/xO~O!Y$zX!]$zX!g%RX~P!0SO!]/yO!Y)PX~P#/sO!g/{O~O!Y/}O~OpkO(T0OO~P.iOh%VOr0TO!g#vO!l%eO(r'pO~O!g+iO~Oa%nO!]0XO'z%nO~O!^0ZO~P!5iO!c0[O!d0[O(U!lO~P#$`Os!nO!S0]O(VTO(YUO(e!mO~O#[0_O~Og%aa!]%aa#`%aa$O%aa~P!1WOg%ca!]%ca#`%ca$O%ca~P!1WOj%dOk%dOl%dO(T&ZOg'mX!]'mX~O!]*yOg(^a~Og0hO~On0jO#`0iOg(_a!](_a~OR0kO!Q0kO!S0lO#S$dOn}a'y}a(y}a(z}a!]}a#`}a~Og}a$O}a~P$(cO!Q*OO'y*POn$sa(y$sa(z$sa!]$sa#`$sa~Og$sa$O$sa~P$)_O!Q*OO'y*POn$ua(y$ua(z$ua!]$ua#`$ua~Og$ua$O$ua~P$*QO#k0oO~Og%Ta!]%Ta#`%Ta$O%Ta~P!1WO!g#vO~O#k0rO~O!]+^Oa)Ta'z)Ta~OR#zO!Q#yO!S#{O!l#xO(aVOP!ri[!rij!rir!ri!]!ri!p!ri#R!ri#n!ri#o!ri#p!ri#q!ri#r!ri#s!ri#t!ri#u!ri#v!ri#x!ri#z!ri#{!ri(r!ri(y!ri(z!ri~Oa!ri'z!ri'w!ri!Y!ri!k!riv!ri!_!ri%i!ri!g!ri~P$+oOh%VOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(VTO(YUO(a$uO(y$}O(z%PO~Op0{O%]0|O(T0zO~P$.VO!g+iOa(]a!_(]a'z(]a!](]a~O#k1SO~O[]X!]fX!^fX~O!]1TO!^)XX~O!^1VO~O[1WO~Ob1YO(T+qO(VTO(YUO~O!_&PO(T%gO`'uX!]'uX~O!]+vO`)Wa~O!k1]O~P!:tO[1`O~O`1aO~O#`1fO~On1iO!_$|O~O(e(|O!^)UP~Oh%VOn1rO!_1oO%i1qO~O[1|O!]1zO!^)VX~O!^1}O~O`2POa%nO'z%nO~O(T#nO(VTO(YUO~O#S$dO#`$eO$Q$eOP(gXR(gX[(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX~Oj2SO&[2TOa(gX~P$3pOj2SO#`$eO&[2TO~Oa2VO~P%[Oa2XO~O&e2[OP&ciQ&ciS&ciY&cia&cid&cie&cil&cip&cir&cis&cit&ciz&ci|&ci!O&ci!S&ci!W&ci!X&ci!_&ci!i&ci!l&ci!o&ci!p&ci!q&ci!s&ci!u&ci!x&ci!|&ci$W&ci$n&ci%h&ci%j&ci%l&ci%m&ci%n&ci%q&ci%s&ci%v&ci%w&ci%y&ci&W&ci&^&ci&`&ci&b&ci&d&ci&g&ci&m&ci&s&ci&u&ci&w&ci&y&ci&{&ci'w&ci(T&ci(V&ci(Y&ci(a&ci(o&ci!^&cib&ci&j&ci~Ob2bO!^2`O&j2aO~P`O!_XO!l2dO~O&q,{OP&liQ&liS&liY&lia&lid&lie&lil&lip&lir&lis&lit&liz&li|&li!O&li!S&li!W&li!X&li!_&li!i&li!l&li!o&li!p&li!q&li!s&li!u&li!x&li!|&li$W&li$n&li%h&li%j&li%l&li%m&li%n&li%q&li%s&li%v&li%w&li%y&li&W&li&^&li&`&li&b&li&d&li&g&li&m&li&s&li&u&li&w&li&y&li&{&li'w&li(T&li(V&li(Y&li(a&li(o&li!^&li&e&lib&li&j&li~O!Y2jO~O!]!aa!^!aa~P#BwOs!nO!S!oO![2pO(e!mO!]'XX!^'XX~P@nO!]-]O!^(ia~O!]'_X!^'_X~P!9|O!]-`O!^(xa~O!^2wO~P'_Oa%nO#`3QO'z%nO~Oa%nO!g#vO#`3QO'z%nO~Oa%nO!g#vO!p3UO#`3QO'z%nO(r'pO~Oa%nO'z%nO~P!:tO!]$_Ov$qa~O!Y'Wi!]'Wi~P!:tO!](VO!Y(hi~O!](^O!Y(vi~O!Y(wi!](wi~P!:tO!](ti!k(tia(ti'z(ti~P!:tO#`3WO!](ti!k(tia(ti'z(ti~O!](jO!k(si~O!S%hO!_%iO!|]O#i3]O#j3[O(T%gO~O!S%hO!_%iO#j3[O(T%gO~On3dO!_'`O%i3cO~Oh%VOn3dO!_'`O%i3cO~O#k%aaP%aaR%aa[%aaa%aaj%aar%aa!S%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa'z%aa(a%aa(r%aa!k%aa!Y%aa'w%aav%aa!_%aa%i%aa!g%aa~P#L{O#k%caP%caR%ca[%caa%caj%car%ca!S%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca'z%ca(a%ca(r%ca!k%ca!Y%ca'w%cav%ca!_%ca%i%ca!g%ca~P#MnO#k%aaP%aaR%aa[%aaa%aaj%aar%aa!S%aa!]%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa'z%aa(a%aa(r%aa!k%aa!Y%aa'w%aa#`%aav%aa!_%aa%i%aa!g%aa~P#/sO#k%caP%caR%ca[%caa%caj%car%ca!S%ca!]%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca'z%ca(a%ca(r%ca!k%ca!Y%ca'w%ca#`%cav%ca!_%ca%i%ca!g%ca~P#/sO#k}aP}a[}aa}aj}ar}a!l}a!p}a#R}a#n}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#x}a#z}a#{}a'z}a(a}a(r}a!k}a!Y}a'w}av}a!_}a%i}a!g}a~P$(cO#k$saP$saR$sa[$saa$saj$sar$sa!S$sa!l$sa!p$sa#R$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#t$sa#u$sa#v$sa#x$sa#z$sa#{$sa'z$sa(a$sa(r$sa!k$sa!Y$sa'w$sav$sa!_$sa%i$sa!g$sa~P$)_O#k$uaP$uaR$ua[$uaa$uaj$uar$ua!S$ua!l$ua!p$ua#R$ua#n$ua#o$ua#p$ua#q$ua#r$ua#s$ua#t$ua#u$ua#v$ua#x$ua#z$ua#{$ua'z$ua(a$ua(r$ua!k$ua!Y$ua'w$uav$ua!_$ua%i$ua!g$ua~P$*QO#k%TaP%TaR%Ta[%Taa%Taj%Tar%Ta!S%Ta!]%Ta!l%Ta!p%Ta#R%Ta#n%Ta#o%Ta#p%Ta#q%Ta#r%Ta#s%Ta#t%Ta#u%Ta#v%Ta#x%Ta#z%Ta#{%Ta'z%Ta(a%Ta(r%Ta!k%Ta!Y%Ta'w%Ta#`%Tav%Ta!_%Ta%i%Ta!g%Ta~P#/sOa#cq!]#cq'z#cq'w#cq!Y#cq!k#cqv#cq!_#cq%i#cq!g#cq~P!:tO![3lO!]'YX!k'YX~P%[O!].tO!k(ka~O!].tO!k(ka~P!:tO!Y3oO~O$O!na!^!na~PKlO$O!ja!]!ja!^!ja~P#BwO$O!ra!^!ra~P!=[O$O!ta!^!ta~P!?rOg']X!]']X~P!,TO!]/POg(pa~OSfO!_4TO$d4UO~O!^4YO~Ov4ZO~P#/sOa$mq!]$mq'z$mq'w$mq!Y$mq!k$mqv$mq!_$mq%i$mq!g$mq~P!:tO!Y4]O~P!&zO!S4^O~O!Q*OO'y*PO(z%POn'ia(y'ia!]'ia#`'ia~Og'ia$O'ia~P%-fO!Q*OO'y*POn'ka(y'ka(z'ka!]'ka#`'ka~Og'ka$O'ka~P%.XO(r$YO~P#/sO!YfX!Y$zX!]fX!]$zX!g%RX#`fX~P!0SOp%WO(T=WO~P!1uOp4bO!S%hO![4aO!_%iO(T%gO!]'eX!k'eX~O!]/pO!k)Oa~O!]/pO!g#vO!k)Oa~O!]/pO!g#vO(r'pO!k)Oa~Og$|i!]$|i#`$|i$O$|i~P!1WO![4jO!Y'gX!]'gX~P!3tO!]/yO!Y)Pa~O!]/yO!Y)Pa~P#/sOP]XR]X[]Xj]Xr]X!Q]X!S]X!Y]X!]]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X~Oj%YX!g%YX~P%2OOj4oO!g#vO~Oh%VO!g#vO!l%eO~Oh%VOr4tO!l%eO(r'pO~Or4yO!g#vO(r'pO~Os!nO!S4zO(VTO(YUO(e!mO~O(y$}On%ai!Q%ai'y%ai(z%ai!]%ai#`%ai~Og%ai$O%ai~P%5oO(z%POn%ci!Q%ci'y%ci(y%ci!]%ci#`%ci~Og%ci$O%ci~P%6bOg(_i!](_i~P!1WO#`5QOg(_i!](_i~P!1WO!k5VO~Oa$oq!]$oq'z$oq'w$oq!Y$oq!k$oqv$oq!_$oq%i$oq!g$oq~P!:tO!Y5ZO~O!]5[O!_)QX~P#/sOa$zX!_$zX%^]X'z$zX!]$zX~P!0SO%^5_OaoX!_oX'zoX!]oX~P$#OOp5`O(T#nO~O%^5_O~Ob5fO%j5gO(T+qO(VTO(YUO!]'tX!^'tX~O!]1TO!^)Xa~O[5kO~O`5lO~O[5pO~Oa%nO'z%nO~P#/sO!]5uO#`5wO!^)UX~O!^5xO~Or6OOs!nO!S*iO!b!yO!c!vO!d!vO!|<VO#T!pO#U!pO#V!pO#W!pO#X!pO#[5}O#]!zO(U!lO(VTO(YUO(e!mO(o!sO~O!^5|O~P%;eOn6TO!_1oO%i6SO~Oh%VOn6TO!_1oO%i6SO~Ob6[O(T#nO(VTO(YUO!]'sX!^'sX~O!]1zO!^)Va~O(VTO(YUO(e6^O~O`6bO~Oj6eO&[6fO~PNXO!k6gO~P%[Oa6iO~Oa6iO~P%[Ob2bO!^6nO&j2aO~P`O!g6pO~O!g6rOh(ji!](ji!^(ji!g(ji!l(jir(ji(r(ji~O!]#hi!^#hi~P#BwO#`6sO!]#hi!^#hi~O!]!ai!^!ai~P#BwOa%nO#`6|O'z%nO~Oa%nO!g#vO#`6|O'z%nO~O!](tq!k(tqa(tq'z(tq~P!:tO!](jO!k(sq~O!S%hO!_%iO#j7TO(T%gO~O!_'`O%i7WO~On7[O!_'`O%i7WO~O#k'iaP'iaR'ia['iaa'iaj'iar'ia!S'ia!l'ia!p'ia#R'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#v'ia#x'ia#z'ia#{'ia'z'ia(a'ia(r'ia!k'ia!Y'ia'w'iav'ia!_'ia%i'ia!g'ia~P%-fO#k'kaP'kaR'ka['kaa'kaj'kar'ka!S'ka!l'ka!p'ka#R'ka#n'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#x'ka#z'ka#{'ka'z'ka(a'ka(r'ka!k'ka!Y'ka'w'kav'ka!_'ka%i'ka!g'ka~P%.XO#k$|iP$|iR$|i[$|ia$|ij$|ir$|i!S$|i!]$|i!l$|i!p$|i#R$|i#n$|i#o$|i#p$|i#q$|i#r$|i#s$|i#t$|i#u$|i#v$|i#x$|i#z$|i#{$|i'z$|i(a$|i(r$|i!k$|i!Y$|i'w$|i#`$|iv$|i!_$|i%i$|i!g$|i~P#/sO#k%aiP%aiR%ai[%aia%aij%air%ai!S%ai!l%ai!p%ai#R%ai#n%ai#o%ai#p%ai#q%ai#r%ai#s%ai#t%ai#u%ai#v%ai#x%ai#z%ai#{%ai'z%ai(a%ai(r%ai!k%ai!Y%ai'w%aiv%ai!_%ai%i%ai!g%ai~P%5oO#k%ciP%ciR%ci[%cia%cij%cir%ci!S%ci!l%ci!p%ci#R%ci#n%ci#o%ci#p%ci#q%ci#r%ci#s%ci#t%ci#u%ci#v%ci#x%ci#z%ci#{%ci'z%ci(a%ci(r%ci!k%ci!Y%ci'w%civ%ci!_%ci%i%ci!g%ci~P%6bO!]'Ya!k'Ya~P!:tO!].tO!k(ki~O$O#ci!]#ci!^#ci~P#BwOP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(aVO[#mij#mir#mi#R#mi#o#mi#p#mi#q#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#n#mi~P%NdO#n<_O~P%NdOP$[OR#zOr<kO!Q#yO!S#{O!l#xO!p$[O#n<_O#o<`O#p<`O#q<`O(aVO[#mij#mi#R#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#r#mi~P&!lO#r<aO~P&!lOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO(aVO#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#v#mi~P&$tOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO(aVO(z#}O#z#mi#{#mi$O#mi(r#mi(y#mi!]#mi!^#mi~O#x<eO~P&&uO#x#mi~P&&uO#v<cO~P&$tOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO#x<eO(aVO(y#|O(z#}O#{#mi$O#mi(r#mi!]#mi!^#mi~O#z#mi~P&)UO#z<gO~P&)UOa#|y!]#|y'z#|y'w#|y!Y#|y!k#|yv#|y!_#|y%i#|y!g#|y~P!:tO[#mij#mir#mi#R#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi!]#mi!^#mi~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#n<_O#o<`O#p<`O#q<`O(aVO(y#mi(z#mi~P&,QOn>^O!Q*OO'y*PO(y$}O(z%POP#miR#mi!S#mi!l#mi!p#mi#n#mi#o#mi#p#mi#q#mi(a#mi~P&,QO#S$dOP(`XR(`X[(`Xj(`Xn(`Xr(`X!Q(`X!S(`X!l(`X!p(`X#R(`X#n(`X#o(`X#p(`X#q(`X#r(`X#s(`X#t(`X#u(`X#v(`X#x(`X#z(`X#{(`X$O(`X'y(`X(a(`X(r(`X(y(`X(z(`X!](`X!^(`X~O$O$Pi!]$Pi!^$Pi~P#BwO$O!ri!^!ri~P$+oOg']a!]']a~P!1WO!^7nO~O!]'da!^'da~P#BwO!Y7oO~P#/sO!g#vO(r'pO!]'ea!k'ea~O!]/pO!k)Oi~O!]/pO!g#vO!k)Oi~Og$|q!]$|q#`$|q$O$|q~P!1WO!Y'ga!]'ga~P#/sO!g7vO~O!]/yO!Y)Pi~P#/sO!]/yO!Y)Pi~O!Y7yO~Oh%VOr8OO!l%eO(r'pO~Oj8QO!g#vO~Or8TO!g#vO(r'pO~O!Q*OO'y*PO(z%POn'ja(y'ja!]'ja#`'ja~Og'ja$O'ja~P&5RO!Q*OO'y*POn'la(y'la(z'la!]'la#`'la~Og'la$O'la~P&5tOg(_q!](_q~P!1WO#`8VOg(_q!](_q~P!1WO!Y8WO~Og%Oq!]%Oq#`%Oq$O%Oq~P!1WOa$oy!]$oy'z$oy'w$oy!Y$oy!k$oyv$oy!_$oy%i$oy!g$oy~P!:tO!g6rO~O!]5[O!_)Qa~O!_'`OP$TaR$Ta[$Taj$Tar$Ta!Q$Ta!S$Ta!]$Ta!l$Ta!p$Ta#R$Ta#n$Ta#o$Ta#p$Ta#q$Ta#r$Ta#s$Ta#t$Ta#u$Ta#v$Ta#x$Ta#z$Ta#{$Ta(a$Ta(r$Ta(y$Ta(z$Ta~O%i7WO~P&8fO%^8[Oa%[i!_%[i'z%[i!]%[i~Oa#cy!]#cy'z#cy'w#cy!Y#cy!k#cyv#cy!_#cy%i#cy!g#cy~P!:tO[8^O~Ob8`O(T+qO(VTO(YUO~O!]1TO!^)Xi~O`8dO~O(e(|O!]'pX!^'pX~O!]5uO!^)Ua~O!^8nO~P%;eO(o!sO~P$&YO#[8oO~O!_1oO~O!_1oO%i8qO~On8tO!_1oO%i8qO~O[8yO!]'sa!^'sa~O!]1zO!^)Vi~O!k8}O~O!k9OO~O!k9RO~O!k9RO~P%[Oa9TO~O!g9UO~O!k9VO~O!](wi!^(wi~P#BwOa%nO#`9_O'z%nO~O!](ty!k(tya(ty'z(ty~P!:tO!](jO!k(sy~O%i9bO~P&8fO!_'`O%i9bO~O#k$|qP$|qR$|q[$|qa$|qj$|qr$|q!S$|q!]$|q!l$|q!p$|q#R$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#t$|q#u$|q#v$|q#x$|q#z$|q#{$|q'z$|q(a$|q(r$|q!k$|q!Y$|q'w$|q#`$|qv$|q!_$|q%i$|q!g$|q~P#/sO#k'jaP'jaR'ja['jaa'jaj'jar'ja!S'ja!l'ja!p'ja#R'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#x'ja#z'ja#{'ja'z'ja(a'ja(r'ja!k'ja!Y'ja'w'jav'ja!_'ja%i'ja!g'ja~P&5RO#k'laP'laR'la['laa'laj'lar'la!S'la!l'la!p'la#R'la#n'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#x'la#z'la#{'la'z'la(a'la(r'la!k'la!Y'la'w'lav'la!_'la%i'la!g'la~P&5tO#k%OqP%OqR%Oq[%Oqa%Oqj%Oqr%Oq!S%Oq!]%Oq!l%Oq!p%Oq#R%Oq#n%Oq#o%Oq#p%Oq#q%Oq#r%Oq#s%Oq#t%Oq#u%Oq#v%Oq#x%Oq#z%Oq#{%Oq'z%Oq(a%Oq(r%Oq!k%Oq!Y%Oq'w%Oq#`%Oqv%Oq!_%Oq%i%Oq!g%Oq~P#/sO!]'Yi!k'Yi~P!:tO$O#cq!]#cq!^#cq~P#BwO(y$}OP%aaR%aa[%aaj%aar%aa!S%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa$O%aa(a%aa(r%aa!]%aa!^%aa~On%aa!Q%aa'y%aa(z%aa~P&IyO(z%POP%caR%ca[%caj%car%ca!S%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca$O%ca(a%ca(r%ca!]%ca!^%ca~On%ca!Q%ca'y%ca(y%ca~P&LQOn>^O!Q*OO'y*PO(z%PO~P&IyOn>^O!Q*OO'y*PO(y$}O~P&LQOR0kO!Q0kO!S0lO#S$dOP}a[}aj}an}ar}a!l}a!p}a#R}a#n}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#x}a#z}a#{}a$O}a'y}a(a}a(r}a(y}a(z}a!]}a!^}a~O!Q*OO'y*POP$saR$sa[$saj$san$sar$sa!S$sa!l$sa!p$sa#R$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#t$sa#u$sa#v$sa#x$sa#z$sa#{$sa$O$sa(a$sa(r$sa(y$sa(z$sa!]$sa!^$sa~O!Q*OO'y*POP$uaR$ua[$uaj$uan$uar$ua!S$ua!l$ua!p$ua#R$ua#n$ua#o$ua#p$ua#q$ua#r$ua#s$ua#t$ua#u$ua#v$ua#x$ua#z$ua#{$ua$O$ua(a$ua(r$ua(y$ua(z$ua!]$ua!^$ua~On>^O!Q*OO'y*PO(y$}O(z%PO~OP%TaR%Ta[%Taj%Tar%Ta!S%Ta!l%Ta!p%Ta#R%Ta#n%Ta#o%Ta#p%Ta#q%Ta#r%Ta#s%Ta#t%Ta#u%Ta#v%Ta#x%Ta#z%Ta#{%Ta$O%Ta(a%Ta(r%Ta!]%Ta!^%Ta~P''VO$O$mq!]$mq!^$mq~P#BwO$O$oq!]$oq!^$oq~P#BwO!^9oO~O$O9pO~P!1WO!g#vO!]'ei!k'ei~O!g#vO(r'pO!]'ei!k'ei~O!]/pO!k)Oq~O!Y'gi!]'gi~P#/sO!]/yO!Y)Pq~Or9wO!g#vO(r'pO~O[9yO!Y9xO~P#/sO!Y9xO~Oj:PO!g#vO~Og(_y!](_y~P!1WO!]'na!_'na~P#/sOa%[q!_%[q'z%[q!]%[q~P#/sO[:UO~O!]1TO!^)Xq~O`:YO~O#`:ZO!]'pa!^'pa~O!]5uO!^)Ui~P#BwO!S:]O~O!_1oO%i:`O~O(VTO(YUO(e:eO~O!]1zO!^)Vq~O!k:hO~O!k:iO~O!k:jO~O!k:jO~P%[O#`:mO!]#hy!^#hy~O!]#hy!^#hy~P#BwO%i:rO~P&8fO!_'`O%i:rO~O$O#|y!]#|y!^#|y~P#BwOP$|iR$|i[$|ij$|ir$|i!S$|i!l$|i!p$|i#R$|i#n$|i#o$|i#p$|i#q$|i#r$|i#s$|i#t$|i#u$|i#v$|i#x$|i#z$|i#{$|i$O$|i(a$|i(r$|i!]$|i!^$|i~P''VO!Q*OO'y*PO(z%POP'iaR'ia['iaj'ian'iar'ia!S'ia!l'ia!p'ia#R'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#v'ia#x'ia#z'ia#{'ia$O'ia(a'ia(r'ia(y'ia!]'ia!^'ia~O!Q*OO'y*POP'kaR'ka['kaj'kan'kar'ka!S'ka!l'ka!p'ka#R'ka#n'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#x'ka#z'ka#{'ka$O'ka(a'ka(r'ka(y'ka(z'ka!]'ka!^'ka~O(y$}OP%aiR%ai[%aij%ain%air%ai!Q%ai!S%ai!l%ai!p%ai#R%ai#n%ai#o%ai#p%ai#q%ai#r%ai#s%ai#t%ai#u%ai#v%ai#x%ai#z%ai#{%ai$O%ai'y%ai(a%ai(r%ai(z%ai!]%ai!^%ai~O(z%POP%ciR%ci[%cij%cin%cir%ci!Q%ci!S%ci!l%ci!p%ci#R%ci#n%ci#o%ci#p%ci#q%ci#r%ci#s%ci#t%ci#u%ci#v%ci#x%ci#z%ci#{%ci$O%ci'y%ci(a%ci(r%ci(y%ci!]%ci!^%ci~O$O$oy!]$oy!^$oy~P#BwO$O#cy!]#cy!^#cy~P#BwO!g#vO!]'eq!k'eq~O!]/pO!k)Oy~O!Y'gq!]'gq~P#/sOr:|O!g#vO(r'pO~O[;QO!Y;PO~P#/sO!Y;PO~Og(_!R!](_!R~P!1WOa%[y!_%[y'z%[y!]%[y~P#/sO!]1TO!^)Xy~O!]5uO!^)Uq~O(T;XO~O!_1oO%i;[O~O!k;_O~O%i;dO~P&8fOP$|qR$|q[$|qj$|qr$|q!S$|q!l$|q!p$|q#R$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#t$|q#u$|q#v$|q#x$|q#z$|q#{$|q$O$|q(a$|q(r$|q!]$|q!^$|q~P''VO!Q*OO'y*PO(z%POP'jaR'ja['jaj'jan'jar'ja!S'ja!l'ja!p'ja#R'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#x'ja#z'ja#{'ja$O'ja(a'ja(r'ja(y'ja!]'ja!^'ja~O!Q*OO'y*POP'laR'la['laj'lan'lar'la!S'la!l'la!p'la#R'la#n'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#x'la#z'la#{'la$O'la(a'la(r'la(y'la(z'la!]'la!^'la~OP%OqR%Oq[%Oqj%Oqr%Oq!S%Oq!l%Oq!p%Oq#R%Oq#n%Oq#o%Oq#p%Oq#q%Oq#r%Oq#s%Oq#t%Oq#u%Oq#v%Oq#x%Oq#z%Oq#{%Oq$O%Oq(a%Oq(r%Oq!]%Oq!^%Oq~P''VOg%e!Z!]%e!Z#`%e!Z$O%e!Z~P!1WO!Y;hO~P#/sOr;iO!g#vO(r'pO~O[;kO!Y;hO~P#/sO!]'pq!^'pq~P#BwO!]#h!Z!^#h!Z~P#BwO#k%e!ZP%e!ZR%e!Z[%e!Za%e!Zj%e!Zr%e!Z!S%e!Z!]%e!Z!l%e!Z!p%e!Z#R%e!Z#n%e!Z#o%e!Z#p%e!Z#q%e!Z#r%e!Z#s%e!Z#t%e!Z#u%e!Z#v%e!Z#x%e!Z#z%e!Z#{%e!Z'z%e!Z(a%e!Z(r%e!Z!k%e!Z!Y%e!Z'w%e!Z#`%e!Zv%e!Z!_%e!Z%i%e!Z!g%e!Z~P#/sOr;tO!g#vO(r'pO~O!Y;uO~P#/sOr;|O!g#vO(r'pO~O!Y;}O~P#/sOP%e!ZR%e!Z[%e!Zj%e!Zr%e!Z!S%e!Z!l%e!Z!p%e!Z#R%e!Z#n%e!Z#o%e!Z#p%e!Z#q%e!Z#r%e!Z#s%e!Z#t%e!Z#u%e!Z#v%e!Z#x%e!Z#z%e!Z#{%e!Z$O%e!Z(a%e!Z(r%e!Z!]%e!Z!^%e!Z~P''VOr<QO!g#vO(r'pO~Ov(fX~P1qO!Q%rO~P!)[O(U!lO~P!)[O!YfX!]fX#`fX~P%2OOP]XR]X[]Xj]Xr]X!Q]X!S]X!]]X!]fX!l]X!p]X#R]X#S]X#`]X#`fX#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X~O!gfX!k]X!kfX(rfX~P'LTOP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_XO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(T)]O(VTO(YUO(aVO(o[O~O!]<iO!^$qa~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<tO!S${O!_$|O!i>WO!l$xO#j<zO$W%`O$t<vO$v<xO$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~Ol)dO~P(!yOr!eX(r!eX~P#!iOr(jX(r(jX~P##[O!^]X!^fX~P'LTO!YfX!Y$zX!]fX!]$zX#`fX~P!0SO#k<^O~O!g#vO#k<^O~O#`<nO~Oj<bO~O#`=OO!](wX!^(wX~O#`<nO!](uX!^(uX~O#k=PO~Og=RO~P!1WO#k=XO~O#k=YO~Og=RO(T&ZO~O!g#vO#k=ZO~O!g#vO#k=PO~O$O=[O~P#BwO#k=]O~O#k=^O~O#k=cO~O#k=dO~O#k=eO~O#k=fO~O$O=gO~P!1WO$O=hO~P!1WOl=sO~P7eOk#S#T#U#W#X#[#i#j#u$n$t$v$y%]%^%h%i%j%q%s%v%w%y%{~(OT#o!X'|(U#ps#n#qr!Q'}$]'}(T$_(e~",
  goto: "$9Y)]PPPPPP)^PP)aP)rP+W/]PPPP6mPP7TPP=QPPP@tPA^PA^PPPA^PCfPA^PA^PA^PCjPCoPD^PIWPPPI[PPPPI[L_PPPLeMVPI[PI[PP! eI[PPPI[PI[P!#lI[P!'S!(X!(bP!)U!)Y!)U!,gPPPPPPP!-W!(XPP!-h!/YP!2iI[I[!2n!5z!:h!:h!>gPPP!>oI[PPPPPPPPP!BOP!C]PPI[!DnPI[PI[I[I[I[I[PI[!FQP!I[P!LbP!Lf!Lp!Lt!LtP!IXP!Lx!LxP#!OP#!SI[PI[#!Y#%_CjA^PA^PA^A^P#&lA^A^#)OA^#+vA^#.SA^A^#.r#1W#1W#1]#1f#1W#1qPP#1WPA^#2ZA^#6YA^A^6mPPP#:_PPP#:x#:xP#:xP#;`#:xPP#;fP#;]P#;]#;y#;]#<e#<k#<n)aP#<q)aP#<z#<z#<zP)aP)aP)aP)aPP)aP#=Q#=TP#=T)aP#=XP#=[P)aP)aP)aP)aP)aP)a)aPP#=b#=h#=s#=y#>P#>V#>]#>k#>q#>{#?R#?]#?c#?s#?y#@k#@}#AT#AZ#Ai#BO#Cs#DR#DY#Et#FS#Gt#HS#HY#H`#Hf#Hp#Hv#H|#IW#Ij#IpPPPPPPPPPPP#IvPPPPPPP#Jk#Mx$ b$ i$ qPPP$']P$'f$*_$0x$0{$1O$1}$2Q$2X$2aP$2g$2jP$3W$3[$4S$5b$5g$5}PP$6S$6Y$6^$6a$6e$6i$7e$7|$8e$8i$8l$8o$8y$8|$9Q$9UR!|RoqOXst!Z#d%m&r&t&u&w,s,x2[2_Y!vQ'`-e1o5{Q%tvQ%|yQ&T|Q&j!VS'W!e-]Q'f!iS'l!r!yU*k$|*Z*oQ+o%}S+|&V&WQ,d&dQ-c'_Q-m'gQ-u'mQ0[*qQ1b,OQ1y,eR<{<Y%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+],p,s,x-i-q.P.V.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3l4z6T6e6f6i6|8t9T9_S#q]<V!r)_$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SU+P%]<s<tQ+t&PQ,f&gQ,m&oQ0x+gQ0}+iQ1Y+uQ2R,kQ3`.gQ5`0|Q5f1TQ6[1zQ7Y3dQ8`5gR9e7['QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S!S!nQ!r!v!y!z$|'W'_'`'l'm'n*k*o*q*r-]-c-e-u0[0_1o5{5}%[$ti#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^Q&X|Q'U!eS'[%i-`Q+t&PQ,P&WQ,f&gQ0n+SQ1Y+uQ1_+{Q2Q,jQ2R,kQ5f1TQ5o1aQ6[1zQ6_1|Q6`2PQ8`5gQ8c5lQ8|6bQ:X8dQ:f8yQ;V:YR<}*ZrnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_R,h&k&z^OPXYstuvwz!Z!`!g!j!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'b'r(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>R>S[#]WZ#W#Z'X(T!b%jm#h#i#l$x%e%h(^(h(i(j*Y*^*b+Z+[+^,o-V.T.Z.[.]._/m/p2d3[3]4a6r7TQ%wxQ%{yW&Q|&V&W,OQ&_!TQ'c!hQ'e!iQ(q#sS+n%|%}Q+r&PQ,_&bQ,c&dS-l'f'gQ.i(rQ1R+oQ1X+uQ1Z+vQ1^+zQ1t,`S1x,d,eQ2|-mQ5e1TQ5i1WQ5n1`Q6Z1yQ8_5gQ8b5kQ8f5pQ:T8^R;T:U!U$zi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y!^%yy!i!u%{%|%}'V'e'f'g'k'u*j+n+o-Y-l-m-t0R0U1R2u2|3T4r4s4v7}9{Q+h%wQ,T&[Q,W&]Q,b&dQ.h(qQ1s,_U1w,c,d,eQ3e.iQ6U1tS6Y1x1yQ8x6Z#f>T#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^o>U<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hW%Ti%V*y>PS&[!Q&iQ&]!RQ&^!SU*}%[%d=sR,R&Y%]%Si#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^T)z$u){V+P%]<s<tW'[!e%i*Z-`S(}#y#zQ+c%rQ+y&SS.b(m(nQ1j,XQ5T0kR8i5u'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S$i$^c#Y#e%q%s%u(S(Y(t(y)R)S)T)U)V)W)X)Y)Z)[)^)`)b)g)q+d+x-Z-x-}.S.U.s.v.z.|.}/O/b0p2k2n3O3V3k3p3q3r3s3t3u3v3w3x3y3z3{3|4P4Q4X5X5c6u6{7Q7a7b7k7l8k9X9]9g9m9n:o;W;`<W=vT#TV#U'RkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ'Y!eR2q-]!W!nQ!e!r!v!y!z$|'W'_'`'l'm'n*Z*k*o*q*r-]-c-e-u0[0_1o5{5}R1l,ZnqOXst!Z#d%m&r&t&u&w,s,x2[2_Q&y!^Q'v!xS(s#u<^Q+l%zQ,]&_Q,^&aQ-j'dQ-w'oS.r(x=PS0q+X=ZQ1P+mQ1n,[Q2c,zQ2e,{Q2m-WQ2z-kQ2}-oS5Y0r=eQ5a1QS5d1S=fQ6t2oQ6x2{Q6}3SQ8]5bQ9Y6vQ9Z6yQ9^7OR:l9V$d$]c#Y#e%s%u(S(Y(t(y)R)S)T)U)V)W)X)Y)Z)[)^)`)b)g)q+d+x-Z-x-}.S.U.s.v.z.}/O/b0p2k2n3O3V3k3p3q3r3s3t3u3v3w3x3y3z3{3|4P4Q4X5X5c6u6{7Q7a7b7k7l8k9X9]9g9m9n:o;W;`<W=vS(o#p'iQ)P#zS+b%q.|S.c(n(pR3^.d'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SS#q]<VQ&t!XQ&u!YQ&w![Q&x!]R2Z,vQ'a!hQ+e%wQ-h'cS.e(q+hQ2x-gW3b.h.i0w0yQ6w2yW7U3_3a3e5^U9a7V7X7ZU:q9c9d9fS;b:p:sQ;p;cR;x;qU!wQ'`-eT5y1o5{!Q_OXZ`st!V!Z#d#h%e%m&i&k&r&t&u&w(j,s,x.[2[2_]!pQ!r'`-e1o5{T#q]<V%^{OPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_S(}#y#zS.b(m(n!s=l$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SU$fd)_,mS(p#p'iU*v%R(w4OU0m+O.n7gQ5^0xQ7V3`Q9d7YR:s9em!tQ!r!v!y!z'`'l'm'n-e-u1o5{5}Q't!uS(f#g2US-s'k'wQ/s*]Q0R*jQ3U-vQ4f/tQ4r0TQ4s0UQ4x0^Q7r4`S7}4t4vS8R4y4{Q9r7sQ9v7yQ9{8OQ:Q8TS:{9w9xS;g:|;PS;s;h;iS;{;t;uS<P;|;}R<S<QQ#wbQ's!uS(e#g2US(g#m+WQ+Y%fQ+j%xQ+p&OU-r'k't'wQ.W(fU/r*]*`/wQ0S*jQ0V*lQ1O+kQ1u,aS3R-s-vQ3Z.`S4e/s/tQ4n0PS4q0R0^Q4u0WQ6W1vQ7P3US7q4`4bQ7u4fU7|4r4x4{Q8P4wQ8v6XS9q7r7sQ9u7yQ9}8RQ:O8SQ:c8wQ:y9rS:z9v9xQ;S:QQ;^:dS;f:{;PS;r;g;hS;z;s;uS<O;{;}Q<R<PQ<T<SQ=o=jQ={=tR=|=uV!wQ'`-e%^aOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_S#wz!j!r=i$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SR=o>R%^bOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_Q%fj!^%xy!i!u%{%|%}'V'e'f'g'k'u*j+n+o-Y-l-m-t0R0U1R2u2|3T4r4s4v7}9{S&Oz!jQ+k%yQ,a&dW1v,b,c,d,eU6X1w1x1yS8w6Y6ZQ:d8x!r=j$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ=t>QR=u>R%QeOPXYstuvw!Z!`!g!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_Y#bWZ#W#Z(T!b%jm#h#i#l$x%e%h(^(h(i(j*Y*^*b+Z+[+^,o-V.T.Z.[.]._/m/p2d3[3]4a6r7TQ,n&o!p=k$Z$n)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SR=n'XU']!e%i*ZR2s-`%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+],p,s,x-i-q.P.V.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3l4z6T6e6f6i6|8t9T9_!r)_$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ,m&oQ0x+gQ3`.gQ7Y3dR9e7[!b$Tc#Y%q(S(Y(t(y)Z)[)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<W!P<d)^)q-Z.|2k2n3p3y3z4P4X6u7b7k7l8k9X9g9m9n;W;`=v!f$Vc#Y%q(S(Y(t(y)W)X)Z)[)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<W!T<f)^)q-Z.|2k2n3p3v3w3y3z4P4X6u7b7k7l8k9X9g9m9n;W;`=v!^$Zc#Y%q(S(Y(t(y)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<WQ4_/kz>S)^)q-Z.|2k2n3p4P4X6u7b7k7l8k9X9g9m9n;W;`=vQ>X>ZR>Y>['QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SS$oh$pR4U/U'XgOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/U/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>ST$kf$qQ$ifS)j$l)nR)v$qT$jf$qT)l$l)n'XhOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/U/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>ST$oh$pQ$rhR)u$p%^jOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_!s>Q$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S#glOPXZst!Z!`!o#S#d#o#{$n%m&k&n&o&r&t&u&w&{'T'b)O)s*i+]+g,p,s,x-i.g/V/n0]0l1r2S2T2V2X2[2_2a3d4T4z6T6e6f6i7[8t9T!U%Ri$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y#f(w#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^Q+T%aQ/c*Oo4O<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!U$yi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>YQ*c$zU*l$|*Z*oQ+U%bQ0W*m#f=q#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n=r<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hQ=w>TQ=x>UQ=y>VR=z>W!U%Ri$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y#f(w#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^o4O<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hnoOXst!Z#d%m&r&t&u&w,s,x2[2_S*f${*YQ-R'OQ-S'QR4i/y%[%Si#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^Q,U&]Q1h,WQ5s1gR8h5tV*n$|*Z*oU*n$|*Z*oT5z1o5{S0P*i/nQ4w0]T8S4z:]Q+j%xQ0V*lQ1O+kQ1u,aQ6W1vQ8v6XQ:c8wR;^:d!U%Oi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Yx*R$v)e*S*u+V/v0d0e4R4g5R5S5W7p8U:R:x=p=}>OS0`*t0a#f<o#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n<p<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!d=S(u)c*[*e.j.m.q/_/k/|0v1e3h4[4h4l5r7]7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[`=T3}7c7f7j9h:t:w;yS=_.l3iT=`7e9k!U%Qi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y|*T$v)e*U*t+V/g/v0d0e4R4g4|5R5S5W7p8U:R:x=p=}>OS0b*u0c#f<q#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n<r<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!h=U(u)c*[*e.k.l.q/_/k/|0v1e3f3h4[4h4l5r7]7^7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[d=V3}7d7e7j9h9i:t:u:w;yS=a.m3jT=b7f9lrnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_Q&f!UR,p&ornOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_R&f!UQ,Y&^R1d,RsnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_Q1p,_S6R1s1tU8p6P6Q6US:_8r8sS;Y:^:aQ;m;ZR;w;nQ&m!VR,i&iR6_1|R:f8yW&Q|&V&W,OR1Z+vQ&r!WR,s&sR,y&xT2],x2_R,}&yQ,|&yR2f,}Q'y!{R-y'ySsOtQ#dXT%ps#dQ#OTR'{#OQ#RUR'}#RQ){$uR/`){Q#UVR(Q#UQ#XWU(W#X(X.QQ(X#YR.Q(YQ-^'YR2r-^Q.u(yS3m.u3nR3n.vQ-e'`R2v-eY!rQ'`-e1o5{R'j!rQ/Q)eR4S/QU#_W%h*YU(_#_(`.RQ(`#`R.R(ZQ-a']R2t-at`OXst!V!Z#d%m&i&k&r&t&u&w,s,x2[2_S#hZ%eU#r`#h.[R.[(jQ(k#jQ.X(gW.a(k.X3X7RQ3X.YR7R3YQ)n$lR/W)nQ$phR)t$pQ$`cU)a$`-|<jQ-|<WR<j)qQ/q*]W4c/q4d7t9sU4d/r/s/tS7t4e4fR9s7u$e*Q$v(u)c)e*[*e*t*u+Q+R+V.l.m.o.p.q/_/g/i/k/v/|0d0e0v1e3f3g3h3}4R4[4g4h4l4|5O5R5S5W5r7]7^7_7`7e7f7h7i7j7p7w7z8U8X8Z9h9i9j9t9|:R:S:t:u:v:w:x:};R;e;j;v;y=p=}>O>Z>[Q/z*eU4k/z4m7xQ4m/|R7x4lS*o$|*ZR0Y*ox*S$v)e*t*u+V/v0d0e4R4g5R5S5W7p8U:R:x=p=}>O!d.j(u)c*[*e.l.m.q/_/k/|0v1e3h4[4h4l5r7]7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[U/h*S.j7ca7c3}7e7f7j9h:t:w;yQ0a*tQ3i.lU4}0a3i9kR9k7e|*U$v)e*t*u+V/g/v0d0e4R4g4|5R5S5W7p8U:R:x=p=}>O!h.k(u)c*[*e.l.m.q/_/k/|0v1e3f3h4[4h4l5r7]7^7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[U/j*U.k7de7d3}7e7f7j9h9i:t:u:w;yQ0c*uQ3j.mU5P0c3j9lR9l7fQ*z%UR0g*zQ5]0vR8Y5]Q+_%kR0u+_Q5v1jS8j5v:[R:[8kQ,[&_R1m,[Q5{1oR8m5{Q1{,fS6]1{8zR8z6_Q1U+rW5h1U5j8a:VQ5j1XQ8a5iR:V8bQ+w&QR1[+wQ2_,xR6m2_YrOXst#dQ&v!ZQ+a%mQ,r&rQ,t&tQ,u&uQ,w&wQ2Y,sS2],x2_R6l2[Q%opQ&z!_Q&}!aQ'P!bQ'R!cQ'q!uQ+`%lQ+l%zQ,Q&XQ,h&mQ-P&|W-p'k's't'wQ-w'oQ0X*nQ1P+mQ1c,PS2O,i,lQ2g-OQ2h-RQ2i-SQ2}-oW3P-r-s-v-xQ5a1QQ5m1_Q5q1eQ6V1uQ6a2QQ6k2ZU6z3O3R3UQ6}3SQ8]5bQ8e5oQ8g5rQ8l5zQ8u6WQ8{6`S9[6{7PQ9^7OQ:W8cQ:b8vQ:g8|Q:n9]Q;U:XQ;]:cQ;a:oQ;l;VR;o;^Q%zyQ'd!iQ'o!uU+m%{%|%}Q-W'VU-k'e'f'gS-o'k'uQ0Q*jS1Q+n+oQ2o-YS2{-l-mQ3S-tS4p0R0UQ5b1RQ6v2uQ6y2|Q7O3TU7{4r4s4vQ9z7}R;O9{S$wi>PR*{%VU%Ui%V>PR0f*yQ$viS(u#v+iS)c$b$cQ)e$dQ*[$xS*e${*YQ*t%OQ*u%QQ+Q%^Q+R%_Q+V%cQ.l<oQ.m<qQ.o<uQ.p<wQ.q<yQ/_)yQ/g*RQ/i*TQ/k*VQ/v*aS/|*g/mQ0d*wQ0e*xl0v+f,V.f1i1q3c6S7W8q9b:`:r;[;dQ1e,SQ3f=SQ3g=UQ3h=XS3}<l<mQ4R/PS4[/d4^Q4g/xQ4h/yQ4l/{Q4|0`Q5O0bQ5R0iQ5S0jQ5W0oQ5r1fQ7]=]Q7^=_Q7_=aQ7`=cQ7e<pQ7f<rQ7h<vQ7i<xQ7j<zQ7p4_Q7w4jQ7z4oQ8U5QQ8X5[Q8Z5_Q9h=YQ9i=TQ9j=VQ9t7vQ9|8QQ:R8VQ:S8[Q:t=^Q:u=`Q:v=bQ:w=dQ:x9pQ:}9yQ;R:PQ;e=gQ;j;QQ;v;kQ;y=hQ=p>PQ=}>XQ>O>YQ>Z>]R>[>^Q+O%]Q.n<sR7g<tnpOXst!Z#d%m&r&t&u&w,s,x2[2_Q!fPS#fZ#oQ&|!`W'h!o*i0]4zQ(P#SQ)Q#{Q)r$nS,l&k&nQ,q&oQ-O&{S-T'T/nQ-g'bQ.x)OQ/[)sQ0s+]Q0y+gQ2W,pQ2y-iQ3a.gQ4W/VQ5U0lQ6Q1rQ6c2SQ6d2TQ6h2VQ6j2XQ6o2aQ7Z3dQ7m4TQ8s6TQ9P6eQ9Q6fQ9S6iQ9f7[Q:a8tR:k9T#[cOPXZst!Z!`!o#d#o#{%m&k&n&o&r&t&u&w&{'T'b)O*i+]+g,p,s,x-i.g/n0]0l1r2S2T2V2X2[2_2a3d4z6T6e6f6i7[8t9TQ#YWQ#eYQ%quQ%svS%uw!gS(S#W(VQ(Y#ZQ(t#uQ(y#xQ)R$OQ)S$PQ)T$QQ)U$RQ)V$SQ)W$TQ)X$UQ)Y$VQ)Z$WQ)[$XQ)^$ZQ)`$_Q)b$aQ)g$eW)q$n)s/V4TQ+d%tQ+x&RS-Z'X2pQ-x'rS-}(T.PQ.S(]Q.U(dQ.s(xQ.v(zQ.z<UQ.|<XQ.}<YQ/O<]Q/b)}Q0p+XQ2k-UQ2n-XQ3O-qQ3V.VQ3k.tQ3p<^Q3q<_Q3r<`Q3s<aQ3t<bQ3u<cQ3v<dQ3w<eQ3x<fQ3y<gQ3z<hQ3{.{Q3|<kQ4P<nQ4Q<{Q4X<iQ5X0rQ5c1SQ6u=OQ6{3QQ7Q3WQ7a3lQ7b=PQ7k=RQ7l=ZQ8k5wQ9X6sQ9]6|Q9g=[Q9m=eQ9n=fQ:o9_Q;W:ZQ;`:mQ<W#SR=v>SR#[WR'Z!el!tQ!r!v!y!z'`'l'm'n-e-u1o5{5}S'V!e-]U*j$|*Z*oS-Y'W'_S0U*k*qQ0^*rQ2u-cQ4v0[R4{0_R({#xQ!fQT-d'`-e]!qQ!r'`-e1o5{Q#p]R'i<VR)f$dY!uQ'`-e1o5{Q'k!rS'u!v!yS'w!z5}S-t'l'mQ-v'nR3T-uT#kZ%eS#jZ%eS%km,oU(g#h#i#lS.Y(h(iQ.^(jQ0t+^Q3Y.ZU3Z.[.]._S7S3[3]R9`7Td#^W#W#Z%h(T(^*Y+Z.T/mr#gZm#h#i#l%e(h(i(j+^.Z.[.]._3[3]7TS*]$x*bQ/t*^Q2U,oQ2l-VQ4`/pQ6q2dQ7s4aQ9W6rT=m'X+[V#aW%h*YU#`W%h*YS(U#W(^U(Z#Z+Z/mS-['X+[T.O(T.TV'^!e%i*ZQ$lfR)x$qT)m$l)nR4V/UT*_$x*bT*h${*YQ0w+fQ1g,VQ3_.fQ5t1iQ6P1qQ7X3cQ8r6SQ9c7WQ:^8qQ:p9bQ;Z:`Q;c:rQ;n;[R;q;dnqOXst!Z#d%m&r&t&u&w,s,x2[2_Q&l!VR,h&itmOXst!U!V!Z#d%m&i&r&t&u&w,s,x2[2_R,o&oT%lm,oR1k,XR,g&gQ&U|S+}&V&WR1^,OR+s&PT&p!W&sT&q!W&sT2^,x2_",
  nodeNames: "⚠ ArithOp ArithOp ?. JSXStartTag LineComment BlockComment Script Hashbang ExportDeclaration export Star as VariableName String Escape from ; default FunctionDeclaration async function VariableDefinition > < TypeParamList in out const TypeDefinition extends ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation InterpolationStart NullType null VoidType void TypeofType typeof MemberExpression . PropertyName [ TemplateString Escape Interpolation super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewTarget new NewExpression ) ( ArgList UnaryExpression delete LogicOp BitOp YieldExpression yield AwaitExpression await ParenthesizedExpression ClassExpression class ClassBody MethodDeclaration Decorator @ MemberExpression PrivatePropertyName CallExpression TypeArgList CompareOp < declare Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly accessor Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof satisfies CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression InstantiationExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXSelfClosingTag JSXIdentifier JSXBuiltin JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast < ArrowFunction TypeParamList SequenceExpression InstantiationExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature PropertyDefinition CallSignature TypePredicate asserts is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var using TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration defer ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement SingleExpression SingleClassItem",
  maxTerm: 380,
  context: Jk,
  nodeProps: [
    ["isolate", -8, 5, 6, 14, 37, 39, 51, 53, 55, ""],
    ["group", -26, 9, 17, 19, 68, 207, 211, 215, 216, 218, 221, 224, 234, 237, 243, 245, 247, 249, 252, 258, 264, 266, 268, 270, 272, 274, 275, "Statement", -34, 13, 14, 32, 35, 36, 42, 51, 54, 55, 57, 62, 70, 72, 76, 80, 82, 84, 85, 110, 111, 120, 121, 136, 139, 141, 142, 143, 144, 145, 147, 148, 167, 169, 171, "Expression", -23, 31, 33, 37, 41, 43, 45, 173, 175, 177, 178, 180, 181, 182, 184, 185, 186, 188, 189, 190, 201, 203, 205, 206, "Type", -3, 88, 103, 109, "ClassItem"],
    ["openedBy", 23, "<", 38, "InterpolationStart", 56, "[", 60, "{", 73, "(", 160, "JSXStartCloseTag"],
    ["closedBy", -2, 24, 168, ">", 40, "InterpolationEnd", 50, "]", 61, "}", 74, ")", 165, "JSXEndTag"]
  ],
  propSources: [rQ],
  skippedNodes: [0, 5, 6, 278],
  repeatNodeCount: 37,
  tokenData: "$Fq07[R!bOX%ZXY+gYZ-yZ[+g[]%Z]^.c^p%Zpq+gqr/mrs3cst:_tuEruvJSvwLkwx! Yxy!'iyz!(sz{!)}{|!,q|}!.O}!O!,q!O!P!/Y!P!Q!9j!Q!R#:O!R![#<_![!]#I_!]!^#Jk!^!_#Ku!_!`$![!`!a$$v!a!b$*T!b!c$,r!c!}Er!}#O$-|#O#P$/W#P#Q$4o#Q#R$5y#R#SEr#S#T$7W#T#o$8b#o#p$<r#p#q$=h#q#r$>x#r#s$@U#s$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$I|Er$I|$I}$Dk$I}$JO$Dk$JO$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr(n%d_$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&j&hT$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c&j&zP;=`<%l&c'|'U]$i&j(Z!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!b(SU(Z!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!b(iP;=`<%l'}'|(oP;=`<%l&}'[(y]$i&j(WpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rp)wU(WpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)rp*^P;=`<%l)r'[*dP;=`<%l(r#S*nX(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g#S+^P;=`<%l*g(n+dP;=`<%l%Z07[+rq$i&j(Wp(Z!b'|0/lOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p$f%Z$f$g+g$g#BY%Z#BY#BZ+g#BZ$IS%Z$IS$I_+g$I_$JT%Z$JT$JU+g$JU$KV%Z$KV$KW+g$KW&FU%Z&FU&FV+g&FV;'S%Z;'S;=`+a<%l?HT%Z?HT?HU+g?HUO%Z07[.ST(X#S$i&j'}0/lO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c07[.n_$i&j(Wp(Z!b'}0/lOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)3p/x`$i&j!p),Q(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW1V`#v(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`2X!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW2d_#v(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At3l_(V':f$i&j(Z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k(^4r_$i&j(Z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k&z5vX$i&jOr5qrs6cs!^5q!^!_6y!_#o5q#o#p6y#p;'S5q;'S;=`7h<%lO5q&z6jT$d`$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c`6|TOr6yrs7]s;'S6y;'S;=`7b<%lO6y`7bO$d``7eP;=`<%l6y&z7kP;=`<%l5q(^7w]$d`$i&j(Z!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!r8uZ(Z!bOY8pYZ6yZr8prs9hsw8pwx6yx#O8p#O#P6y#P;'S8p;'S;=`:R<%lO8p!r9oU$d`(Z!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!r:UP;=`<%l8p(^:[P;=`<%l4k%9[:hh$i&j(Wp(Z!bOY%ZYZ&cZq%Zqr<Srs&}st%ZtuCruw%Zwx(rx!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr(r<__WS$i&j(Wp(Z!bOY<SYZ&cZr<Srs=^sw<Swx@nx!^<S!^!_Bm!_#O<S#O#P>`#P#o<S#o#pBm#p;'S<S;'S;=`Cl<%lO<S(Q=g]WS$i&j(Z!bOY=^YZ&cZw=^wx>`x!^=^!^!_?q!_#O=^#O#P>`#P#o=^#o#p?q#p;'S=^;'S;=`@h<%lO=^&n>gXWS$i&jOY>`YZ&cZ!^>`!^!_?S!_#o>`#o#p?S#p;'S>`;'S;=`?k<%lO>`S?XSWSOY?SZ;'S?S;'S;=`?e<%lO?SS?hP;=`<%l?S&n?nP;=`<%l>`!f?xWWS(Z!bOY?qZw?qwx?Sx#O?q#O#P?S#P;'S?q;'S;=`@b<%lO?q!f@eP;=`<%l?q(Q@kP;=`<%l=^'`@w]WS$i&j(WpOY@nYZ&cZr@nrs>`s!^@n!^!_Ap!_#O@n#O#P>`#P#o@n#o#pAp#p;'S@n;'S;=`Bg<%lO@ntAwWWS(WpOYApZrAprs?Ss#OAp#O#P?S#P;'SAp;'S;=`Ba<%lOAptBdP;=`<%lAp'`BjP;=`<%l@n#WBvYWS(Wp(Z!bOYBmZrBmrs?qswBmwxApx#OBm#O#P?S#P;'SBm;'S;=`Cf<%lOBm#WCiP;=`<%lBm(rCoP;=`<%l<S%9[C}i$i&j(o%1l(Wp(Z!bOY%ZYZ&cZr%Zrs&}st%ZtuCruw%Zwx(rx!Q%Z!Q![Cr![!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr%9[EoP;=`<%lCr07[FRk$i&j(Wp(Z!b$]#t(T,2j(e$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr+dHRk$i&j(Wp(Z!b$]#tOY%ZYZ&cZr%Zrs&}st%ZtuGvuw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Gv![!^%Z!^!_*g!_!c%Z!c!}Gv!}#O%Z#O#P&c#P#R%Z#R#SGv#S#T%Z#T#oGv#o#p*g#p$g%Z$g;'SGv;'S;=`Iv<%lOGv+dIyP;=`<%lGv07[JPP;=`<%lEr(KWJ_`$i&j(Wp(Z!b#p(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWKl_$i&j$Q(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,#xLva(z+JY$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sv%ZvwM{wx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWNW`$i&j#z(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At! c_(Y';W$i&j(WpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b'l!!i_$i&j(WpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b&z!#mX$i&jOw!#hwx6cx!^!#h!^!_!$Y!_#o!#h#o#p!$Y#p;'S!#h;'S;=`!$r<%lO!#h`!$]TOw!$Ywx7]x;'S!$Y;'S;=`!$l<%lO!$Y`!$oP;=`<%l!$Y&z!$uP;=`<%l!#h'l!%R]$d`$i&j(WpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r!Q!&PZ(WpOY!%zYZ!$YZr!%zrs!$Ysw!%zwx!&rx#O!%z#O#P!$Y#P;'S!%z;'S;=`!']<%lO!%z!Q!&yU$d`(WpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)r!Q!'`P;=`<%l!%z'l!'fP;=`<%l!!b/5|!'t_!l/.^$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#&U!)O_!k!Lf$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z-!n!*[b$i&j(Wp(Z!b(U%&f#q(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rxz%Zz{!+d{!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW!+o`$i&j(Wp(Z!b#n(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;x!,|`$i&j(Wp(Z!br+4YOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,$U!.Z_!]+Jf$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!/ec$i&j(Wp(Z!b!Q.2^OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!0p!P!Q%Z!Q![!3Y![!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!0ya$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!2O!P!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!2Z_![!L^$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!3eg$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!3Y![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S!3Y#S#X%Z#X#Y!4|#Y#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!5Vg$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx{%Z{|!6n|}%Z}!O!6n!O!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!6wc$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!8_c$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!9uf$i&j(Wp(Z!b#o(ChOY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcxz!;Zz{#-}{!P!;Z!P!Q#/d!Q!^!;Z!^!_#(i!_!`#7S!`!a#8i!a!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z?O!;fb$i&j(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z>^!<w`$i&j(Z!b!X7`OY!<nYZ&cZw!<nwx!=yx!P!<n!P!Q!Eq!Q!^!<n!^!_!Gr!_!}!<n!}#O!KS#O#P!Dy#P#o!<n#o#p!Gr#p;'S!<n;'S;=`!L]<%lO!<n<z!>Q^$i&j!X7`OY!=yYZ&cZ!P!=y!P!Q!>|!Q!^!=y!^!_!@c!_!}!=y!}#O!CW#O#P!Dy#P#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!?Td$i&j!X7`O!^&c!_#W&c#W#X!>|#X#Z&c#Z#[!>|#[#]&c#]#^!>|#^#a&c#a#b!>|#b#g&c#g#h!>|#h#i&c#i#j!>|#j#k!>|#k#m&c#m#n!>|#n#o&c#p;'S&c;'S;=`&w<%lO&c7`!@hX!X7`OY!@cZ!P!@c!P!Q!AT!Q!}!@c!}#O!Ar#O#P!Bq#P;'S!@c;'S;=`!CQ<%lO!@c7`!AYW!X7`#W#X!AT#Z#[!AT#]#^!AT#a#b!AT#g#h!AT#i#j!AT#j#k!AT#m#n!AT7`!AuVOY!ArZ#O!Ar#O#P!B[#P#Q!@c#Q;'S!Ar;'S;=`!Bk<%lO!Ar7`!B_SOY!ArZ;'S!Ar;'S;=`!Bk<%lO!Ar7`!BnP;=`<%l!Ar7`!BtSOY!@cZ;'S!@c;'S;=`!CQ<%lO!@c7`!CTP;=`<%l!@c<z!C][$i&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#O!CW#O#P!DR#P#Q!=y#Q#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DWX$i&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DvP;=`<%l!CW<z!EOX$i&jOY!=yYZ&cZ!^!=y!^!_!@c!_#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!EnP;=`<%l!=y>^!Ezl$i&j(Z!b!X7`OY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#W&}#W#X!Eq#X#Z&}#Z#[!Eq#[#]&}#]#^!Eq#^#a&}#a#b!Eq#b#g&}#g#h!Eq#h#i&}#i#j!Eq#j#k!Eq#k#m&}#m#n!Eq#n#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}8r!GyZ(Z!b!X7`OY!GrZw!Grwx!@cx!P!Gr!P!Q!Hl!Q!}!Gr!}#O!JU#O#P!Bq#P;'S!Gr;'S;=`!J|<%lO!Gr8r!Hse(Z!b!X7`OY'}Zw'}x#O'}#P#W'}#W#X!Hl#X#Z'}#Z#[!Hl#[#]'}#]#^!Hl#^#a'}#a#b!Hl#b#g'}#g#h!Hl#h#i'}#i#j!Hl#j#k!Hl#k#m'}#m#n!Hl#n;'S'};'S;=`(f<%lO'}8r!JZX(Z!bOY!JUZw!JUwx!Arx#O!JU#O#P!B[#P#Q!Gr#Q;'S!JU;'S;=`!Jv<%lO!JU8r!JyP;=`<%l!JU8r!KPP;=`<%l!Gr>^!KZ^$i&j(Z!bOY!KSYZ&cZw!KSwx!CWx!^!KS!^!_!JU!_#O!KS#O#P!DR#P#Q!<n#Q#o!KS#o#p!JU#p;'S!KS;'S;=`!LV<%lO!KS>^!LYP;=`<%l!KS>^!L`P;=`<%l!<n=l!Ll`$i&j(Wp!X7`OY!LcYZ&cZr!Lcrs!=ys!P!Lc!P!Q!Mn!Q!^!Lc!^!_# o!_!}!Lc!}#O#%P#O#P!Dy#P#o!Lc#o#p# o#p;'S!Lc;'S;=`#&Y<%lO!Lc=l!Mwl$i&j(Wp!X7`OY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#W(r#W#X!Mn#X#Z(r#Z#[!Mn#[#](r#]#^!Mn#^#a(r#a#b!Mn#b#g(r#g#h!Mn#h#i(r#i#j!Mn#j#k!Mn#k#m(r#m#n!Mn#n#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r8Q# vZ(Wp!X7`OY# oZr# ors!@cs!P# o!P!Q#!i!Q!}# o!}#O#$R#O#P!Bq#P;'S# o;'S;=`#$y<%lO# o8Q#!pe(Wp!X7`OY)rZr)rs#O)r#P#W)r#W#X#!i#X#Z)r#Z#[#!i#[#])r#]#^#!i#^#a)r#a#b#!i#b#g)r#g#h#!i#h#i)r#i#j#!i#j#k#!i#k#m)r#m#n#!i#n;'S)r;'S;=`*Z<%lO)r8Q#$WX(WpOY#$RZr#$Rrs!Ars#O#$R#O#P!B[#P#Q# o#Q;'S#$R;'S;=`#$s<%lO#$R8Q#$vP;=`<%l#$R8Q#$|P;=`<%l# o=l#%W^$i&j(WpOY#%PYZ&cZr#%Prs!CWs!^#%P!^!_#$R!_#O#%P#O#P!DR#P#Q!Lc#Q#o#%P#o#p#$R#p;'S#%P;'S;=`#&S<%lO#%P=l#&VP;=`<%l#%P=l#&]P;=`<%l!Lc?O#&kn$i&j(Wp(Z!b!X7`OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#W%Z#W#X#&`#X#Z%Z#Z#[#&`#[#]%Z#]#^#&`#^#a%Z#a#b#&`#b#g%Z#g#h#&`#h#i%Z#i#j#&`#j#k#&`#k#m%Z#m#n#&`#n#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z9d#(r](Wp(Z!b!X7`OY#(iZr#(irs!Grsw#(iwx# ox!P#(i!P!Q#)k!Q!}#(i!}#O#+`#O#P!Bq#P;'S#(i;'S;=`#,`<%lO#(i9d#)th(Wp(Z!b!X7`OY*gZr*grs'}sw*gwx)rx#O*g#P#W*g#W#X#)k#X#Z*g#Z#[#)k#[#]*g#]#^#)k#^#a*g#a#b#)k#b#g*g#g#h#)k#h#i*g#i#j#)k#j#k#)k#k#m*g#m#n#)k#n;'S*g;'S;=`+Z<%lO*g9d#+gZ(Wp(Z!bOY#+`Zr#+`rs!JUsw#+`wx#$Rx#O#+`#O#P!B[#P#Q#(i#Q;'S#+`;'S;=`#,Y<%lO#+`9d#,]P;=`<%l#+`9d#,cP;=`<%l#(i?O#,o`$i&j(Wp(Z!bOY#,fYZ&cZr#,frs!KSsw#,fwx#%Px!^#,f!^!_#+`!_#O#,f#O#P!DR#P#Q!;Z#Q#o#,f#o#p#+`#p;'S#,f;'S;=`#-q<%lO#,f?O#-tP;=`<%l#,f?O#-zP;=`<%l!;Z07[#.[b$i&j(Wp(Z!b(O0/l!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z07[#/o_$i&j(Wp(Z!bT0/lOY#/dYZ&cZr#/drs#0nsw#/dwx#4Ox!^#/d!^!_#5}!_#O#/d#O#P#1p#P#o#/d#o#p#5}#p;'S#/d;'S;=`#6|<%lO#/d06j#0w]$i&j(Z!bT0/lOY#0nYZ&cZw#0nwx#1px!^#0n!^!_#3R!_#O#0n#O#P#1p#P#o#0n#o#p#3R#p;'S#0n;'S;=`#3x<%lO#0n05W#1wX$i&jT0/lOY#1pYZ&cZ!^#1p!^!_#2d!_#o#1p#o#p#2d#p;'S#1p;'S;=`#2{<%lO#1p0/l#2iST0/lOY#2dZ;'S#2d;'S;=`#2u<%lO#2d0/l#2xP;=`<%l#2d05W#3OP;=`<%l#1p01O#3YW(Z!bT0/lOY#3RZw#3Rwx#2dx#O#3R#O#P#2d#P;'S#3R;'S;=`#3r<%lO#3R01O#3uP;=`<%l#3R06j#3{P;=`<%l#0n05x#4X]$i&j(WpT0/lOY#4OYZ&cZr#4Ors#1ps!^#4O!^!_#5Q!_#O#4O#O#P#1p#P#o#4O#o#p#5Q#p;'S#4O;'S;=`#5w<%lO#4O00^#5XW(WpT0/lOY#5QZr#5Qrs#2ds#O#5Q#O#P#2d#P;'S#5Q;'S;=`#5q<%lO#5Q00^#5tP;=`<%l#5Q05x#5zP;=`<%l#4O01p#6WY(Wp(Z!bT0/lOY#5}Zr#5}rs#3Rsw#5}wx#5Qx#O#5}#O#P#2d#P;'S#5};'S;=`#6v<%lO#5}01p#6yP;=`<%l#5}07[#7PP;=`<%l#/d)3h#7ab$i&j$Q(Ch(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;ZAt#8vb$Z#t$i&j(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z'Ad#:Zp$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#U%Z#U#V#?i#V#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#d#Bq#d#l%Z#l#m#Es#m#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#<jk$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#>j_$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#?rd$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#A]f$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Bzc$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Dbe$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#E|g$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Gpi$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x#Il_!g$b$i&j$O)Lv(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)[#Jv_al$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f#LS^h#)`#R-<U(Wp(Z!b$n7`OY*gZr*grs'}sw*gwx)rx!P*g!P!Q#MO!Q!^*g!^!_#Mt!_!`$ f!`#O*g#P;'S*g;'S;=`+Z<%lO*g(n#MXX$k&j(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El#M}Z#r(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx!_*g!_!`#Np!`#O*g#P;'S*g;'S;=`+Z<%lO*g(El#NyX$Q(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El$ oX#s(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g*)x$!ga#`*!Y$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`!a$#l!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(K[$#w_#k(Cl$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x$%Vag!*r#s(Ch$f#|$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`$&[!`!a$'f!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$&g_#s(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$'qa#r(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`!a$(v!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$)R`#r(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(Kd$*`a(r(Ct$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!a%Z!a!b$+e!b#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$+p`$i&j#{(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#`$,}_!|$Ip$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f$.X_!S0,v$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(n$/]Z$i&jO!^$0O!^!_$0f!_#i$0O#i#j$0k#j#l$0O#l#m$2^#m#o$0O#o#p$0f#p;'S$0O;'S;=`$4i<%lO$0O(n$0VT_#S$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#S$0kO_#S(n$0p[$i&jO!Q&c!Q![$1f![!^&c!_!c&c!c!i$1f!i#T&c#T#Z$1f#Z#o&c#o#p$3|#p;'S&c;'S;=`&w<%lO&c(n$1kZ$i&jO!Q&c!Q![$2^![!^&c!_!c&c!c!i$2^!i#T&c#T#Z$2^#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$2cZ$i&jO!Q&c!Q![$3U![!^&c!_!c&c!c!i$3U!i#T&c#T#Z$3U#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$3ZZ$i&jO!Q&c!Q![$0O![!^&c!_!c&c!c!i$0O!i#T&c#T#Z$0O#Z#o&c#p;'S&c;'S;=`&w<%lO&c#S$4PR!Q![$4Y!c!i$4Y#T#Z$4Y#S$4]S!Q![$4Y!c!i$4Y#T#Z$4Y#q#r$0f(n$4lP;=`<%l$0O#1[$4z_!Y#)l$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$6U`#x(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;p$7c_$i&j(Wp(Z!b(a+4QOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$8qk$i&j(Wp(Z!b(T,2j$_#t(e$I[OY%ZYZ&cZr%Zrs&}st%Ztu$8buw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$8b![!^%Z!^!_*g!_!c%Z!c!}$8b!}#O%Z#O#P&c#P#R%Z#R#S$8b#S#T%Z#T#o$8b#o#p*g#p$g%Z$g;'S$8b;'S;=`$<l<%lO$8b+d$:qk$i&j(Wp(Z!b$_#tOY%ZYZ&cZr%Zrs&}st%Ztu$:fuw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$:f![!^%Z!^!_*g!_!c%Z!c!}$:f!}#O%Z#O#P&c#P#R%Z#R#S$:f#S#T%Z#T#o$:f#o#p*g#p$g%Z$g;'S$:f;'S;=`$<f<%lO$:f+d$<iP;=`<%l$:f07[$<oP;=`<%l$8b#Jf$<{X!_#Hb(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g,#x$=sa(y+JY$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p#q$+e#q;'S%Z;'S;=`+a<%lO%Z)>v$?V_!^(CdvBr$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z?O$@a_!q7`$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$Aq|$i&j(Wp(Z!b'|0/l$]#t(T,2j(e$I[OX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr07[$D|k$i&j(Wp(Z!b'}0/l$]#t(T,2j(e$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr",
  tokenizers: [tQ, iQ, nQ, sQ, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, eQ, new oc("$S~RRtu[#O#Pg#S#T#|~_P#o#pb~gOx~~jVO#i!P#i#j!U#j#l!P#l#m!q#m;'S!P;'S;=`#v<%lO!P~!UO!U~~!XS!Q![!e!c!i!e#T#Z!e#o#p#Z~!hR!Q![!q!c!i!q#T#Z!q~!tR!Q![!}!c!i!}#T#Z!}~#QR!Q![!P!c!i!P#T#Z!P~#^R!Q![#g!c!i#g#T#Z#g~#jS!Q![#g!c!i#g#T#Z#g#q#r!P~#yP;=`<%l!P~$RO(c~~", 141, 340), new oc("j~RQYZXz{^~^O(Q~~aP!P!Qd~iO(R~~", 25, 323)],
  topRules: { Script: [0, 7], SingleExpression: [1, 276], SingleClassItem: [2, 277] },
  dialects: { jsx: 0, ts: 15175 },
  dynamicPrecedences: { 80: 1, 82: 1, 94: 1, 169: 1, 199: 1 },
  specialized: [{ term: 327, get: (i) => oQ[i] || -1 }, { term: 343, get: (i) => lQ[i] || -1 }, { term: 95, get: (i) => aQ[i] || -1 }],
  tokenPrec: 15201
});
class Hg {
  /**
  Create a new completion context. (Mostly useful for testing
  completion sources—in the editor, the extension will create
  these for you.)
  */
  constructor(e, t, n, s) {
    this.state = e, this.pos = t, this.explicit = n, this.view = s, this.abortListeners = [], this.abortOnDocChange = !1;
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
    let t = this.state.doc.lineAt(this.pos), n = Math.max(t.from, this.pos - 250), s = t.text.slice(n - t.from, this.pos - t.from), r = s.search(Kg(e, !1));
    return r < 0 ? null : { from: n + r, to: this.pos, text: s.slice(r) };
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
  addEventListener(e, t, n) {
    e == "abort" && this.abortListeners && (this.abortListeners.push(t), n && n.onDocChange && (this.abortOnDocChange = !0));
  }
}
function cd(i) {
  let e = Object.keys(i).join(""), t = /\w/.test(e);
  return t && (e = e.replace(/\w/g, "")), `[${t ? "\\w" : ""}${e.replace(/[^\w\s]/g, "\\$&")}]`;
}
function cQ(i) {
  let e = /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null);
  for (let { label: s } of i) {
    e[s[0]] = !0;
    for (let r = 1; r < s.length; r++)
      t[s[r]] = !0;
  }
  let n = cd(e) + cd(t) + "*$";
  return [new RegExp("^" + n), new RegExp(n)];
}
function rf(i) {
  let e = i.map((s) => typeof s == "string" ? { label: s } : s), [t, n] = e.every((s) => /^\w+$/.test(s.label)) ? [/\w*$/, /\w+$/] : cQ(e);
  return (s) => {
    let r = s.matchBefore(n);
    return r || s.explicit ? { from: r ? r.from : s.pos, options: e, validFor: t } : null;
  };
}
function fQ(i, e) {
  return (t) => {
    for (let n = Si(t.state).resolveInner(t.pos, -1); n; n = n.parent) {
      if (i.indexOf(n.name) > -1)
        return null;
      if (n.type.isTop)
        break;
    }
    return e(t);
  };
}
class fd {
  constructor(e, t, n, s) {
    this.completion = e, this.source = t, this.match = n, this.score = s;
  }
}
function as(i) {
  return i.selection.main.from;
}
function Kg(i, e) {
  var t;
  let { source: n } = i, s = e && n[0] != "^", r = n[n.length - 1] != "$";
  return !s && !r ? i : new RegExp(`${s ? "^" : ""}(?:${n})${r ? "$" : ""}`, (t = i.flags) !== null && t !== void 0 ? t : i.ignoreCase ? "i" : "");
}
const of = /* @__PURE__ */ bn.define();
function uQ(i, e, t, n) {
  let { main: s } = i.selection, r = t - s.from, o = n - s.from;
  return {
    ...i.changeByRange((l) => {
      if (l != s && t != n && i.sliceDoc(l.from + r, l.from + o) != i.sliceDoc(t, n))
        return { range: l };
      let a = i.toText(e);
      return {
        changes: { from: l.from + r, to: n == s.from ? l.to : l.from + o, insert: a },
        range: B.cursor(l.from + r + a.length)
      };
    }),
    scrollIntoView: !0,
    userEvent: "input.complete"
  };
}
const ud = /* @__PURE__ */ new WeakMap();
function dQ(i) {
  if (!Array.isArray(i))
    return i;
  let e = ud.get(i);
  return e || ud.set(i, e = rf(i)), e;
}
const Rl = /* @__PURE__ */ Ne.define(), so = /* @__PURE__ */ Ne.define();
class pQ {
  constructor(e) {
    this.pattern = e, this.chars = [], this.folded = [], this.any = [], this.precise = [], this.byWord = [], this.score = 0, this.matched = [];
    for (let t = 0; t < e.length; ) {
      let n = Wn(e, t), s = _s(n);
      this.chars.push(n);
      let r = e.slice(t, t + s), o = r.toUpperCase();
      this.folded.push(Wn(o == r ? r.toLowerCase() : o, 0)), t += s;
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
    let { chars: t, folded: n, any: s, precise: r, byWord: o } = this;
    if (t.length == 1) {
      let y = Wn(e, 0), $ = _s(y), Z = $ == e.length ? 0 : -100;
      if (y != t[0]) if (y == n[0])
        Z += -200;
      else
        return null;
      return this.ret(Z, [0, $]);
    }
    let l = e.indexOf(this.pattern);
    if (l == 0)
      return this.ret(e.length == this.pattern.length ? 0 : -100, [0, this.pattern.length]);
    let a = t.length, h = 0;
    if (l < 0) {
      for (let y = 0, $ = Math.min(e.length, 200); y < $ && h < a; ) {
        let Z = Wn(e, y);
        (Z == t[h] || Z == n[h]) && (s[h++] = y), y += _s(Z);
      }
      if (h < a)
        return null;
    }
    let c = 0, f = 0, d = !1, p = 0, O = -1, g = -1, m = /[a-z]/.test(e), v = !0;
    for (let y = 0, $ = Math.min(e.length, 200), Z = 0; y < $ && f < a; ) {
      let E = Wn(e, y);
      l < 0 && (c < a && E == t[c] && (r[c++] = y), p < a && (E == t[p] || E == n[p] ? (p == 0 && (O = y), g = y + 1, p++) : p = 0));
      let M, A = E < 255 ? E >= 48 && E <= 57 || E >= 97 && E <= 122 ? 2 : E >= 65 && E <= 90 ? 1 : 0 : (M = cy(E)) != M.toLowerCase() ? 1 : M != M.toUpperCase() ? 2 : 0;
      (!y || A == 1 && m || Z == 0 && A != 0) && (t[f] == E || n[f] == E && (d = !0) ? o[f++] = y : o.length && (v = !1)), Z = A, y += _s(E);
    }
    return f == a && o[0] == 0 && v ? this.result(-100 + (d ? -200 : 0), o, e) : p == a && O == 0 ? this.ret(-200 - e.length + (g == e.length ? 0 : -100), [0, g]) : l > -1 ? this.ret(-700 - e.length, [l, l + this.pattern.length]) : p == a ? this.ret(-900 - e.length, [O, g]) : f == a ? this.result(-100 + (d ? -200 : 0) + -700 + (v ? 0 : -1100), o, e) : t.length == 2 ? null : this.result((s[0] ? -700 : 0) + -200 + -1100, s, e);
  }
  result(e, t, n) {
    let s = [], r = 0;
    for (let o of t) {
      let l = o + (this.astral ? _s(Wn(n, o)) : 1);
      r && s[r - 1] == o ? s[r - 1] = l : (s[r++] = o, s[r++] = l);
    }
    return this.ret(e - n.length, s);
  }
}
class OQ {
  constructor(e) {
    this.pattern = e, this.matched = [], this.score = 0, this.folded = e.toLowerCase();
  }
  match(e) {
    if (e.length < this.pattern.length)
      return null;
    let t = e.slice(0, this.pattern.length), n = t == this.pattern ? 0 : t.toLowerCase() == this.folded ? -200 : null;
    return n == null ? null : (this.matched = [0, t.length], this.score = n + (e.length == this.pattern.length ? 0 : -100), this);
  }
}
const wt = /* @__PURE__ */ me.define({
  combine(i) {
    return Mc(i, {
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
      positionInfo: gQ,
      filterStrict: !1,
      compareCompletions: (e, t) => (e.sortText || e.label).localeCompare(t.sortText || t.label),
      interactionDelay: 75,
      updateSyncTime: 100
    }, {
      defaultKeymap: (e, t) => e && t,
      closeOnBlur: (e, t) => e && t,
      icons: (e, t) => e && t,
      tooltipClass: (e, t) => (n) => dd(e(n), t(n)),
      optionClass: (e, t) => (n) => dd(e(n), t(n)),
      addToOptions: (e, t) => e.concat(t),
      filterStrict: (e, t) => e || t
    });
  }
});
function dd(i, e) {
  return i ? e ? i + " " + e : i : e;
}
function gQ(i, e, t, n, s, r) {
  let o = i.textDirection == lt.RTL, l = o, a = !1, h = "top", c, f, d = e.left - s.left, p = s.right - e.right, O = n.right - n.left, g = n.bottom - n.top;
  if (l && d < Math.min(O, p) ? l = !1 : !l && p < Math.min(O, d) && (l = !0), O <= (l ? d : p))
    c = Math.max(s.top, Math.min(t.top, s.bottom - g)) - e.top, f = Math.min(400, l ? d : p);
  else {
    a = !0, f = Math.min(
      400,
      (o ? e.right : s.right - e.left) - 30
      /* Info.Margin */
    );
    let y = s.bottom - e.bottom;
    y >= g || y > e.top ? c = t.bottom - e.top : (h = "bottom", c = e.bottom - t.top);
  }
  let m = (e.bottom - e.top) / r.offsetHeight, v = (e.right - e.left) / r.offsetWidth;
  return {
    style: `${h}: ${c / m}px; max-width: ${f / v}px`,
    class: "cm-completionInfo-" + (a ? o ? "left-narrow" : "right-narrow" : l ? "left" : "right")
  };
}
const lf = /* @__PURE__ */ Ne.define();
function mQ(i) {
  let e = i.addToOptions.slice();
  return i.icons && e.push({
    render(t) {
      let n = document.createElement("div");
      return n.classList.add("cm-completionIcon"), t.type && n.classList.add(...t.type.split(/\s+/g).map((s) => "cm-completionIcon-" + s)), n.setAttribute("aria-hidden", "true"), n;
    },
    position: 20
  }), e.push({
    render(t, n, s, r) {
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
      let n = document.createElement("span");
      return n.className = "cm-completionDetail", n.textContent = t.detail, n;
    },
    position: 80
  }), e.sort((t, n) => t.position - n.position).map((t) => t.render);
}
function Ha(i, e, t) {
  if (i <= t)
    return { from: 0, to: i };
  if (e < 0 && (e = 0), e <= i >> 1) {
    let s = Math.floor(e / t);
    return { from: s * t, to: (s + 1) * t };
  }
  let n = Math.ceil((i - e) / t);
  return { from: i - n * t, to: i - (n - 1) * t };
}
class vQ {
  constructor(e, t, n) {
    this.view = e, this.stateField = t, this.applyCompletion = n, this.info = null, this.infoDestroy = null, this.placeInfoReq = {
      read: () => this.measureInfo(),
      write: (a) => this.placeInfo(a),
      key: this
    }, this.space = null, this.currentClass = "";
    let s = e.state.field(t), { options: r, selected: o } = s.open, l = e.state.facet(wt);
    this.optionContent = mQ(l), this.optionClass = l.optionClass, this.tooltipClass = l.tooltipClass, this.range = Ha(r.length, o, l.maxRenderedOptions), this.dom = document.createElement("div"), this.dom.className = "cm-tooltip-autocomplete", this.updateTooltipClass(e.state), this.dom.addEventListener("mousedown", (a) => {
      let { options: h } = e.state.field(t).open;
      for (let c = a.target, f; c && c != this.dom; c = c.parentNode)
        if (c.nodeName == "LI" && (f = /-(\d+)$/.exec(c.id)) && +f[1] < h.length) {
          this.applyCompletion(e, h[+f[1]]), a.preventDefault();
          return;
        }
      if (a.target == this.list) {
        let c = this.list.classList.contains("cm-completionListIncompleteTop") && a.clientY < this.list.firstChild.getBoundingClientRect().top ? this.range.from - 1 : this.list.classList.contains("cm-completionListIncompleteBottom") && a.clientY > this.list.lastChild.getBoundingClientRect().bottom ? this.range.to : null;
        c != null && (e.dispatch({ effects: lf.of(c) }), a.preventDefault());
      }
    }), this.dom.addEventListener("focusout", (a) => {
      let h = e.state.field(this.stateField, !1);
      h && h.tooltip && e.state.facet(wt).closeOnBlur && a.relatedTarget != e.contentDOM && e.dispatch({ effects: so.of(null) });
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
    let n = e.state.field(this.stateField), s = e.startState.field(this.stateField);
    if (this.updateTooltipClass(e.state), n != s) {
      let { options: r, selected: o, disabled: l } = n.open;
      (!s.open || s.open.options != r) && (this.range = Ha(r.length, o, e.state.facet(wt).maxRenderedOptions), this.showOptions(r, n.id)), this.updateSel(), l != ((t = s.open) === null || t === void 0 ? void 0 : t.disabled) && this.dom.classList.toggle("cm-tooltip-autocomplete-disabled", !!l);
    }
  }
  updateTooltipClass(e) {
    let t = this.tooltipClass(e);
    if (t != this.currentClass) {
      for (let n of this.currentClass.split(" "))
        n && this.dom.classList.remove(n);
      for (let n of t.split(" "))
        n && this.dom.classList.add(n);
      this.currentClass = t;
    }
  }
  positioned(e) {
    this.space = e, this.info && this.view.requestMeasure(this.placeInfoReq);
  }
  updateSel() {
    let e = this.view.state.field(this.stateField), t = e.open;
    (t.selected > -1 && t.selected < this.range.from || t.selected >= this.range.to) && (this.range = Ha(t.options.length, t.selected, this.view.state.facet(wt).maxRenderedOptions), this.showOptions(t.options, e.id));
    let n = this.updateSelectedOption(t.selected);
    if (n) {
      this.destroyInfo();
      let { completion: s } = t.options[t.selected], { info: r } = s;
      if (!r)
        return;
      let o = typeof r == "string" ? document.createTextNode(r) : r(s);
      if (!o)
        return;
      "then" in o ? o.then((l) => {
        l && this.view.state.field(this.stateField, !1) == e && this.addInfoPane(l, s);
      }).catch((l) => ni(this.view.state, l, "completion info")) : (this.addInfoPane(o, s), n.setAttribute("aria-describedby", this.info.id));
    }
  }
  addInfoPane(e, t) {
    this.destroyInfo();
    let n = this.info = document.createElement("div");
    if (n.className = "cm-tooltip cm-completionInfo", n.id = "cm-completionInfo-" + Math.floor(Math.random() * 65535).toString(16), e.nodeType != null)
      n.appendChild(e), this.infoDestroy = null;
    else {
      let { dom: s, destroy: r } = e;
      n.appendChild(s), this.infoDestroy = r || null;
    }
    this.dom.appendChild(n), this.view.requestMeasure(this.placeInfoReq);
  }
  updateSelectedOption(e) {
    let t = null;
    for (let n = this.list.firstChild, s = this.range.from; n; n = n.nextSibling, s++)
      n.nodeName != "LI" || !n.id ? s-- : s == e ? n.hasAttribute("aria-selected") || (n.setAttribute("aria-selected", "true"), t = n) : n.hasAttribute("aria-selected") && (n.removeAttribute("aria-selected"), n.removeAttribute("aria-describedby"));
    return t && yQ(this.list, t), t;
  }
  measureInfo() {
    let e = this.dom.querySelector("[aria-selected]");
    if (!e || !this.info)
      return null;
    let t = this.dom.getBoundingClientRect(), n = this.info.getBoundingClientRect(), s = e.getBoundingClientRect(), r = this.space;
    if (!r) {
      let o = this.dom.ownerDocument.documentElement;
      r = { left: 0, top: 0, right: o.clientWidth, bottom: o.clientHeight };
    }
    return s.top > Math.min(r.bottom, t.bottom) - 10 || s.bottom < Math.max(r.top, t.top) + 10 ? null : this.view.state.facet(wt).positionInfo(this.view, t, s, n, r, this.dom);
  }
  placeInfo(e) {
    this.info && (e ? (e.style && (this.info.style.cssText = e.style), this.info.className = "cm-tooltip cm-completionInfo " + (e.class || "")) : this.info.style.cssText = "top: -1e6px");
  }
  createListBox(e, t, n) {
    const s = document.createElement("ul");
    s.id = t, s.setAttribute("role", "listbox"), s.setAttribute("aria-expanded", "true"), s.setAttribute("aria-label", this.view.state.phrase("Completions")), s.addEventListener("mousedown", (o) => {
      o.target == s && o.preventDefault();
    });
    let r = null;
    for (let o = n.from; o < n.to; o++) {
      let { completion: l, match: a } = e[o], { section: h } = l;
      if (h) {
        let d = typeof h == "string" ? h : h.name;
        if (d != r && (o > n.from || n.from == 0))
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
    return n.from && s.classList.add("cm-completionListIncompleteTop"), n.to < e.length && s.classList.add("cm-completionListIncompleteBottom"), s;
  }
  destroyInfo() {
    this.info && (this.infoDestroy && this.infoDestroy(), this.info.remove(), this.info = null);
  }
  destroy() {
    this.destroyInfo();
  }
}
function bQ(i, e) {
  return (t) => new vQ(t, i, e);
}
function yQ(i, e) {
  let t = i.getBoundingClientRect(), n = e.getBoundingClientRect(), s = t.height / i.offsetHeight;
  n.top < t.top ? i.scrollTop -= (t.top - n.top) / s : n.bottom > t.bottom && (i.scrollTop += (n.bottom - t.bottom) / s);
}
function pd(i) {
  return (i.boost || 0) * 100 + (i.apply ? 10 : 0) + (i.info ? 5 : 0) + (i.type ? 1 : 0);
}
function wQ(i, e) {
  let t = [], n = null, s = null, r = (c) => {
    t.push(c);
    let { section: f } = c.completion;
    if (f) {
      n || (n = []);
      let d = typeof f == "string" ? f : f.name;
      n.some((p) => p.name == d) || n.push(typeof f == "string" ? { name: d } : f);
    }
  }, o = e.facet(wt);
  for (let c of i)
    if (c.hasResult()) {
      let f = c.result.getMatch;
      if (c.result.filter === !1)
        for (let d of c.result.options)
          r(new fd(d, c.source, f ? f(d) : [], 1e9 - t.length));
      else {
        let d = e.sliceDoc(c.from, c.to), p, O = o.filterStrict ? new OQ(d) : new pQ(d);
        for (let g of c.result.options)
          if (p = O.match(g.label)) {
            let m = g.displayLabel ? f ? f(g, p.matched) : [] : p.matched, v = p.score + (g.boost || 0);
            if (r(new fd(g, c.source, m, v)), typeof g.section == "object" && g.section.rank === "dynamic") {
              let { name: y } = g.section;
              s || (s = /* @__PURE__ */ Object.create(null)), s[y] = Math.max(v, s[y] || -1e9);
            }
          }
      }
    }
  if (n) {
    let c = /* @__PURE__ */ Object.create(null), f = 0, d = (p, O) => (p.rank === "dynamic" && O.rank === "dynamic" ? s[O.name] - s[p.name] : 0) || (typeof p.rank == "number" ? p.rank : 1e9) - (typeof O.rank == "number" ? O.rank : 1e9) || (p.name < O.name ? -1 : 1);
    for (let p of n.sort(d))
      f -= 1e5, c[p.name] = f;
    for (let p of t) {
      let { section: O } = p.completion;
      O && (p.score += c[typeof O == "string" ? O : O.name]);
    }
  }
  let l = [], a = null, h = o.compareCompletions;
  for (let c of t.sort((f, d) => d.score - f.score || h(f.completion, d.completion))) {
    let f = c.completion;
    !a || a.label != f.label || a.detail != f.detail || a.type != null && f.type != null && a.type != f.type || a.apply != f.apply || a.boost != f.boost ? l.push(c) : pd(c.completion) > pd(a) && (l[l.length - 1] = c), a = c.completion;
  }
  return l;
}
class Es {
  constructor(e, t, n, s, r, o) {
    this.options = e, this.attrs = t, this.tooltip = n, this.timestamp = s, this.selected = r, this.disabled = o;
  }
  setSelected(e, t) {
    return e == this.selected || e >= this.options.length ? this : new Es(this.options, Od(t, e), this.tooltip, this.timestamp, e, this.disabled);
  }
  static build(e, t, n, s, r, o) {
    if (s && !o && e.some((h) => h.isPending))
      return s.setDisabled();
    let l = wQ(e, t);
    if (!l.length)
      return s && e.some((h) => h.isPending) ? s.setDisabled() : null;
    let a = t.facet(wt).selectOnOpen ? 0 : -1;
    if (s && s.selected != a && s.selected != -1) {
      let h = s.options[s.selected].completion;
      for (let c = 0; c < l.length; c++)
        if (l[c].completion == h) {
          a = c;
          break;
        }
    }
    return new Es(l, Od(n, a), {
      pos: e.reduce((h, c) => c.hasResult() ? Math.min(h, c.from) : h, 1e8),
      create: _Q,
      above: r.aboveCursor
    }, s ? s.timestamp : Date.now(), a, !1);
  }
  map(e) {
    return new Es(this.options, this.attrs, { ...this.tooltip, pos: e.mapPos(this.tooltip.pos) }, this.timestamp, this.selected, this.disabled);
  }
  setDisabled() {
    return new Es(this.options, this.attrs, this.tooltip, this.timestamp, this.selected, !0);
  }
}
class Ml {
  constructor(e, t, n) {
    this.active = e, this.id = t, this.open = n;
  }
  static start() {
    return new Ml(QQ, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
  }
  update(e) {
    let { state: t } = e, n = t.facet(wt), r = (n.override || t.languageDataAt("autocomplete", as(t)).map(dQ)).map((a) => (this.active.find((c) => c.source == a) || new gi(
      a,
      this.active.some(
        (c) => c.state != 0
        /* State.Inactive */
      ) ? 1 : 0
      /* State.Inactive */
    )).update(e, n));
    r.length == this.active.length && r.every((a, h) => a == this.active[h]) && (r = this.active);
    let o = this.open, l = e.effects.some((a) => a.is(af));
    o && e.docChanged && (o = o.map(e.changes)), e.selection || r.some((a) => a.hasResult() && e.changes.touchesRange(a.from, a.to)) || !xQ(r, this.active) || l ? o = Es.build(r, t, this.id, o, n, l) : o && o.disabled && !r.some((a) => a.isPending) && (o = null), !o && r.every((a) => !a.isPending) && r.some((a) => a.hasResult()) && (r = r.map((a) => a.hasResult() ? new gi(
      a.source,
      0
      /* State.Inactive */
    ) : a));
    for (let a of e.effects)
      a.is(lf) && (o = o && o.setSelected(a.value, this.id));
    return r == this.active && o == this.open ? this : new Ml(r, this.id, o);
  }
  get tooltip() {
    return this.open ? this.open.tooltip : null;
  }
  get attrs() {
    return this.open ? this.open.attrs : this.active.length ? SQ : kQ;
  }
}
function xQ(i, e) {
  if (i == e)
    return !0;
  for (let t = 0, n = 0; ; ) {
    for (; t < i.length && !i[t].hasResult(); )
      t++;
    for (; n < e.length && !e[n].hasResult(); )
      n++;
    let s = t == i.length, r = n == e.length;
    if (s || r)
      return s == r;
    if (i[t++].result != e[n++].result)
      return !1;
  }
}
const SQ = {
  "aria-autocomplete": "list"
}, kQ = {};
function Od(i, e) {
  let t = {
    "aria-autocomplete": "list",
    "aria-haspopup": "listbox",
    "aria-controls": i
  };
  return e > -1 && (t["aria-activedescendant"] = i + "-" + e), t;
}
const QQ = [];
function Jg(i, e) {
  if (i.isUserEvent("input.complete")) {
    let n = i.annotation(of);
    if (n && e.activateOnCompletion(n))
      return 12;
  }
  let t = i.isUserEvent("input.type");
  return t && e.activateOnTyping ? 5 : t ? 1 : i.isUserEvent("delete.backward") ? 2 : i.selection ? 8 : i.docChanged ? 16 : 0;
}
class gi {
  constructor(e, t, n = !1) {
    this.source = e, this.state = t, this.explicit = n;
  }
  hasResult() {
    return !1;
  }
  get isPending() {
    return this.state == 1;
  }
  update(e, t) {
    let n = Jg(e, t), s = this;
    (n & 8 || n & 16 && this.touches(e)) && (s = new gi(
      s.source,
      0
      /* State.Inactive */
    )), n & 4 && s.state == 0 && (s = new gi(
      this.source,
      1
      /* State.Pending */
    )), s = s.updateFor(e, n);
    for (let r of e.effects)
      if (r.is(Rl))
        s = new gi(s.source, 1, r.value);
      else if (r.is(so))
        s = new gi(
          s.source,
          0
          /* State.Inactive */
        );
      else if (r.is(af))
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
    return e.changes.touchesRange(as(e.state));
  }
}
class zs extends gi {
  constructor(e, t, n, s, r, o) {
    super(e, 3, t), this.limit = n, this.result = s, this.from = r, this.to = o;
  }
  hasResult() {
    return !0;
  }
  updateFor(e, t) {
    var n;
    if (!(t & 3))
      return this.map(e.changes);
    let s = this.result;
    s.map && !e.changes.empty && (s = s.map(s, e.changes));
    let r = e.changes.mapPos(this.from), o = e.changes.mapPos(this.to, 1), l = as(e.state);
    if (l > o || !s || t & 2 && (as(e.startState) == this.from || l < this.limit))
      return new gi(
        this.source,
        t & 4 ? 1 : 0
        /* State.Inactive */
      );
    let a = e.changes.mapPos(this.limit);
    return $Q(s.validFor, e.state, r, o) ? new zs(this.source, this.explicit, a, s, r, o) : s.update && (s = s.update(s, r, o, new Hg(e.state, l, !1))) ? new zs(this.source, this.explicit, a, s, s.from, (n = s.to) !== null && n !== void 0 ? n : as(e.state)) : new gi(this.source, 1, this.explicit);
  }
  map(e) {
    if (e.empty)
      return this;
    let t = this.result.map ? this.result.map(this.result, e) : this.result;
    return t ? new zs(this.source, this.explicit, e.mapPos(this.limit), t, e.mapPos(this.from), e.mapPos(this.to, 1)) : new gi(
      this.source,
      0
      /* State.Inactive */
    );
  }
  touches(e) {
    return e.changes.touchesRange(this.from, this.to);
  }
}
function $Q(i, e, t, n) {
  if (!i)
    return !1;
  let s = e.sliceDoc(t, n);
  return typeof i == "function" ? i(s, t, n, e) : Kg(i, !0).test(s);
}
const af = /* @__PURE__ */ Ne.define({
  map(i, e) {
    return i.map((t) => t.map(e));
  }
}), Wt = /* @__PURE__ */ sn.define({
  create() {
    return Ml.start();
  },
  update(i, e) {
    return i.update(e);
  },
  provide: (i) => [
    tg.from(i, (e) => e.tooltip),
    ge.contentAttributes.from(i, (e) => e.attrs)
  ]
});
function hf(i, e) {
  const t = e.completion.apply || e.completion.label;
  let n = i.state.field(Wt).active.find((s) => s.source == e.source);
  return n instanceof zs ? (typeof t == "string" ? i.dispatch({
    ...uQ(i.state, t, n.from, n.to),
    annotations: of.of(e.completion)
  }) : t(i, e.completion, n.from, n.to), !0) : !1;
}
const _Q = /* @__PURE__ */ bQ(Wt, hf);
function qo(i, e = "option") {
  return (t) => {
    let n = t.state.field(Wt, !1);
    if (!n || !n.open || n.open.disabled || Date.now() - n.open.timestamp < t.state.facet(wt).interactionDelay)
      return !1;
    let s = 1, r;
    e == "page" && (r = ig(t, n.open.tooltip)) && (s = Math.max(2, Math.floor(r.dom.offsetHeight / r.dom.querySelector("li").offsetHeight) - 1));
    let { length: o } = n.open.options, l = n.open.selected > -1 ? n.open.selected + s * (i ? 1 : -1) : i ? 0 : o - 1;
    return l < 0 ? l = e == "page" ? 0 : o - 1 : l >= o && (l = e == "page" ? o - 1 : 0), t.dispatch({ effects: lf.of(l) }), !0;
  };
}
const PQ = (i) => {
  let e = i.state.field(Wt, !1);
  return i.state.readOnly || !e || !e.open || e.open.selected < 0 || e.open.disabled || Date.now() - e.open.timestamp < i.state.facet(wt).interactionDelay ? !1 : hf(i, e.open.options[e.open.selected]);
}, Ka = (i) => i.state.field(Wt, !1) ? (i.dispatch({ effects: Rl.of(!0) }), !0) : !1, TQ = (i) => {
  let e = i.state.field(Wt, !1);
  return !e || !e.active.some(
    (t) => t.state != 0
    /* State.Inactive */
  ) ? !1 : (i.dispatch({ effects: so.of(null) }), !0);
};
class ZQ {
  constructor(e, t) {
    this.active = e, this.context = t, this.time = Date.now(), this.updates = [], this.done = void 0;
  }
}
const CQ = 50, EQ = 1e3, AQ = /* @__PURE__ */ en.fromClass(class {
  constructor(i) {
    this.view = i, this.debounceUpdate = -1, this.running = [], this.debounceAccept = -1, this.pendingStart = !1, this.composing = 0;
    for (let e of i.state.field(Wt).active)
      e.isPending && this.startQuery(e);
  }
  update(i) {
    let e = i.state.field(Wt), t = i.state.facet(wt);
    if (!i.selectionSet && !i.docChanged && i.startState.field(Wt) == e)
      return;
    let n = i.transactions.some((r) => {
      let o = Jg(r, t);
      return o & 8 || (r.selection || r.docChanged) && !(o & 3);
    });
    for (let r = 0; r < this.running.length; r++) {
      let o = this.running[r];
      if (n || o.context.abortOnDocChange && i.docChanged || o.updates.length + i.transactions.length > CQ && Date.now() - o.time > EQ) {
        for (let l of o.context.abortListeners)
          try {
            l();
          } catch (a) {
            ni(this.view.state, a);
          }
        o.context.abortListeners = null, this.running.splice(r--, 1);
      } else
        o.updates.push(...i.transactions);
    }
    this.debounceUpdate > -1 && clearTimeout(this.debounceUpdate), i.transactions.some((r) => r.effects.some((o) => o.is(Rl))) && (this.pendingStart = !0);
    let s = this.pendingStart ? 50 : t.activateOnTypingDelay;
    if (this.debounceUpdate = e.active.some((r) => r.isPending && !this.running.some((o) => o.active.source == r.source)) ? setTimeout(() => this.startUpdate(), s) : -1, this.composing != 0)
      for (let r of i.transactions)
        r.isUserEvent("input.type") ? this.composing = 2 : this.composing == 2 && r.selection && (this.composing = 3);
  }
  startUpdate() {
    this.debounceUpdate = -1, this.pendingStart = !1;
    let { state: i } = this.view, e = i.field(Wt);
    for (let t of e.active)
      t.isPending && !this.running.some((n) => n.active.source == t.source) && this.startQuery(t);
    this.running.length && e.open && e.open.disabled && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(wt).updateSyncTime));
  }
  startQuery(i) {
    let { state: e } = this.view, t = as(e), n = new Hg(e, t, i.explicit, this.view), s = new ZQ(i, n);
    this.running.push(s), Promise.resolve(i.source(n)).then((r) => {
      s.context.aborted || (s.done = r || null, this.scheduleAccept());
    }, (r) => {
      this.view.dispatch({ effects: so.of(null) }), ni(this.view.state, r);
    });
  }
  scheduleAccept() {
    this.running.every((i) => i.done !== void 0) ? this.accept() : this.debounceAccept < 0 && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(wt).updateSyncTime));
  }
  // For each finished query in this.running, try to create a result
  // or, if appropriate, restart the query.
  accept() {
    var i;
    this.debounceAccept > -1 && clearTimeout(this.debounceAccept), this.debounceAccept = -1;
    let e = [], t = this.view.state.facet(wt), n = this.view.state.field(Wt);
    for (let s = 0; s < this.running.length; s++) {
      let r = this.running[s];
      if (r.done === void 0)
        continue;
      if (this.running.splice(s--, 1), r.done) {
        let l = as(r.updates.length ? r.updates[0].startState : this.view.state), a = Math.min(l, r.done.from + (r.active.explicit ? 0 : 1)), h = new zs(r.active.source, r.active.explicit, a, r.done, r.done.from, (i = r.done.to) !== null && i !== void 0 ? i : l);
        for (let c of r.updates)
          h = h.update(c, t);
        if (h.hasResult()) {
          e.push(h);
          continue;
        }
      }
      let o = n.active.find((l) => l.source == r.active.source);
      if (o && o.isPending)
        if (r.done == null) {
          let l = new gi(
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
    (e.length || n.open && n.open.disabled) && this.view.dispatch({ effects: af.of(e) });
  }
}, {
  eventHandlers: {
    blur(i) {
      let e = this.view.state.field(Wt, !1);
      if (e && e.tooltip && this.view.state.facet(wt).closeOnBlur) {
        let t = e.open && ig(this.view, e.open.tooltip);
        (!t || !t.dom.contains(i.relatedTarget)) && setTimeout(() => this.view.dispatch({ effects: so.of(null) }), 10);
      }
    },
    compositionstart() {
      this.composing = 1;
    },
    compositionend() {
      this.composing == 3 && setTimeout(() => this.view.dispatch({ effects: Rl.of(!1) }), 20), this.composing = 0;
    }
  }
}), RQ = typeof navigator == "object" && /* @__PURE__ */ /Win/.test(navigator.platform), MQ = /* @__PURE__ */ mo.highest(/* @__PURE__ */ ge.domEventHandlers({
  keydown(i, e) {
    let t = e.state.field(Wt, !1);
    if (!t || !t.open || t.open.disabled || t.open.selected < 0 || i.key.length > 1 || i.ctrlKey && !(RQ && i.altKey) || i.metaKey)
      return !1;
    let n = t.open.options[t.open.selected], s = t.active.find((o) => o.source == n.source), r = n.completion.commitCharacters || s.result.commitCharacters;
    return r && r.indexOf(i.key) > -1 && hf(e, n), !1;
  }
})), em = /* @__PURE__ */ ge.baseTheme({
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
class XQ {
  constructor(e, t, n, s) {
    this.field = e, this.line = t, this.from = n, this.to = s;
  }
}
class cf {
  constructor(e, t, n) {
    this.field = e, this.from = t, this.to = n;
  }
  map(e) {
    let t = e.mapPos(this.from, -1, Xt.TrackDel), n = e.mapPos(this.to, 1, Xt.TrackDel);
    return t == null || n == null ? null : new cf(this.field, t, n);
  }
}
class ff {
  constructor(e, t) {
    this.lines = e, this.fieldPositions = t;
  }
  instantiate(e, t) {
    let n = [], s = [t], r = e.doc.lineAt(t), o = /^\s*/.exec(r.text)[0];
    for (let a of this.lines) {
      if (n.length) {
        let h = o, c = /^\t*/.exec(a)[0].length;
        for (let f = 0; f < c; f++)
          h += e.facet(na);
        s.push(t + h.length - c), a = h + a.slice(c);
      }
      n.push(a), t += a.length + 1;
    }
    let l = this.fieldPositions.map((a) => new cf(a.field, s[a.line] + a.from, s[a.line] + a.to));
    return { text: n, ranges: l };
  }
  static parse(e) {
    let t = [], n = [], s = [], r;
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
          if (f.line == n.length && f.from > r.index) {
            let d = r[2] ? 3 + (r[1] || "").length : 2;
            f.from -= d, f.to -= d;
          }
        s.push(new XQ(h, n.length, r.index, r.index + c.length)), o = o.slice(0, r.index) + a + o.slice(r.index + r[0].length);
      }
      o = o.replace(/\\([{}])/g, (l, a, h) => {
        for (let c of s)
          c.line == n.length && c.from > h && (c.from--, c.to--);
        return a;
      }), n.push(o);
    }
    return new ff(n, s);
  }
}
let jQ = /* @__PURE__ */ We.widget({ widget: /* @__PURE__ */ new class extends Or {
  toDOM() {
    let i = document.createElement("span");
    return i.className = "cm-snippetFieldPosition", i;
  }
  ignoreEvent() {
    return !1;
  }
}() }), LQ = /* @__PURE__ */ We.mark({ class: "cm-snippetField" });
class mr {
  constructor(e, t) {
    this.ranges = e, this.active = t, this.deco = We.set(e.map((n) => (n.from == n.to ? jQ : LQ).range(n.from, n.to)), !0);
  }
  map(e) {
    let t = [];
    for (let n of this.ranges) {
      let s = n.map(e);
      if (!s)
        return null;
      t.push(s);
    }
    return new mr(t, this.active);
  }
  selectionInsideField(e) {
    return e.ranges.every((t) => this.ranges.some((n) => n.field == this.active && n.from <= t.from && n.to >= t.to));
  }
}
const So = /* @__PURE__ */ Ne.define({
  map(i, e) {
    return i && i.map(e);
  }
}), IQ = /* @__PURE__ */ Ne.define(), ro = /* @__PURE__ */ sn.define({
  create() {
    return null;
  },
  update(i, e) {
    for (let t of e.effects) {
      if (t.is(So))
        return t.value;
      if (t.is(IQ) && i)
        return new mr(i.ranges, t.value);
    }
    return i && e.docChanged && (i = i.map(e.changes)), i && e.selection && !i.selectionInsideField(e.selection) && (i = null), i;
  },
  provide: (i) => ge.decorations.from(i, (e) => e ? e.deco : We.none)
});
function uf(i, e) {
  return B.create(i.filter((t) => t.field == e).map((t) => B.range(t.from, t.to)));
}
function DQ(i) {
  let e = ff.parse(i);
  return (t, n, s, r) => {
    let { text: o, ranges: l } = e.instantiate(t.state, s), { main: a } = t.state.selection, h = {
      changes: { from: s, to: r == a.from ? a.to : r, insert: Ae.of(o) },
      scrollIntoView: !0,
      annotations: n ? [of.of(n), Ot.userEvent.of("input.complete")] : void 0
    };
    if (l.length && (h.selection = uf(l, 0)), l.some((c) => c.field > 0)) {
      let c = new mr(l, 0), f = h.effects = [So.of(c)];
      t.state.field(ro, !1) === void 0 && f.push(Ne.appendConfig.of([ro, qQ, VQ, em]));
    }
    t.dispatch(t.state.update(h));
  };
}
function tm(i) {
  return ({ state: e, dispatch: t }) => {
    let n = e.field(ro, !1);
    if (!n || i < 0 && n.active == 0)
      return !1;
    let s = n.active + i, r = i > 0 && !n.ranges.some((o) => o.field == s + i);
    return t(e.update({
      selection: uf(n.ranges, s),
      effects: So.of(r ? null : new mr(n.ranges, s)),
      scrollIntoView: !0
    })), !0;
  };
}
const zQ = ({ state: i, dispatch: e }) => i.field(ro, !1) ? (e(i.update({ effects: So.of(null) })), !0) : !1, NQ = /* @__PURE__ */ tm(1), YQ = /* @__PURE__ */ tm(-1), WQ = [
  { key: "Tab", run: NQ, shift: YQ },
  { key: "Escape", run: zQ }
], gd = /* @__PURE__ */ me.define({
  combine(i) {
    return i.length ? i[0] : WQ;
  }
}), qQ = /* @__PURE__ */ mo.highest(/* @__PURE__ */ ia.compute([gd], (i) => i.facet(gd)));
function zt(i, e) {
  return { ...e, apply: DQ(i) };
}
const VQ = /* @__PURE__ */ ge.domEventHandlers({
  mousedown(i, e) {
    let t = e.state.field(ro, !1), n;
    if (!t || (n = e.posAtCoords({ x: i.clientX, y: i.clientY })) == null)
      return !1;
    let s = t.ranges.find((r) => r.from <= n && r.to >= n);
    return !s || s.field == t.active ? !1 : (e.dispatch({
      selection: uf(t.ranges, s.field),
      effects: So.of(t.ranges.some((r) => r.field > s.field) ? new mr(t.ranges, s.field) : null),
      scrollIntoView: !0
    }), !0);
  }
}), im = /* @__PURE__ */ new class extends jn {
}();
im.startSide = 1;
im.endSide = -1;
function BQ(i = {}) {
  return [
    MQ,
    Wt,
    wt.of(i),
    AQ,
    UQ,
    em
  ];
}
const GQ = [
  { key: "Ctrl-Space", run: Ka },
  { mac: "Alt-`", run: Ka },
  { mac: "Alt-i", run: Ka },
  { key: "Escape", run: TQ },
  { key: "ArrowDown", run: /* @__PURE__ */ qo(!0) },
  { key: "ArrowUp", run: /* @__PURE__ */ qo(!1) },
  { key: "PageDown", run: /* @__PURE__ */ qo(!0, "page") },
  { key: "PageUp", run: /* @__PURE__ */ qo(!1, "page") },
  { key: "Enter", run: PQ }
], UQ = /* @__PURE__ */ mo.highest(/* @__PURE__ */ ia.computeN([wt], (i) => i.facet(wt).defaultKeymap ? [GQ] : [])), nm = [
  /* @__PURE__ */ zt("function ${name}(${params}) {\n	${}\n}", {
    label: "function",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ zt("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ zt("for (let ${name} of ${collection}) {\n	${}\n}", {
    label: "for",
    detail: "of loop",
    type: "keyword"
  }),
  /* @__PURE__ */ zt("do {\n	${}\n} while (${})", {
    label: "do",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ zt("while (${}) {\n	${}\n}", {
    label: "while",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ zt(`try {
	\${}
} catch (\${error}) {
	\${}
}`, {
    label: "try",
    detail: "/ catch block",
    type: "keyword"
  }),
  /* @__PURE__ */ zt("if (${}) {\n	${}\n}", {
    label: "if",
    detail: "block",
    type: "keyword"
  }),
  /* @__PURE__ */ zt(`if (\${}) {
	\${}
} else {
	\${}
}`, {
    label: "if",
    detail: "/ else block",
    type: "keyword"
  }),
  /* @__PURE__ */ zt(`class \${name} {
	constructor(\${params}) {
		\${}
	}
}`, {
    label: "class",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ zt('import {${names}} from "${module}"\n${}', {
    label: "import",
    detail: "named",
    type: "keyword"
  }),
  /* @__PURE__ */ zt('import ${name} from "${module}"\n${}', {
    label: "import",
    detail: "default",
    type: "keyword"
  })
], FQ = /* @__PURE__ */ nm.concat([
  /* @__PURE__ */ zt("interface ${name} {\n	${}\n}", {
    label: "interface",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ zt("type ${name} = ${type}", {
    label: "type",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ zt("enum ${name} {\n	${}\n}", {
    label: "enum",
    detail: "definition",
    type: "keyword"
  })
]), md = /* @__PURE__ */ new Tx(), sm = /* @__PURE__ */ new Set([
  "Script",
  "Block",
  "FunctionExpression",
  "FunctionDeclaration",
  "ArrowFunction",
  "MethodDeclaration",
  "ForStatement"
]);
function Qr(i) {
  return (e, t) => {
    let n = e.node.getChild("VariableDefinition");
    return n && t(n, i), !0;
  };
}
const HQ = ["FunctionDeclaration"], KQ = {
  FunctionDeclaration: /* @__PURE__ */ Qr("function"),
  ClassDeclaration: /* @__PURE__ */ Qr("class"),
  ClassExpression: () => !0,
  EnumDeclaration: /* @__PURE__ */ Qr("constant"),
  TypeAliasDeclaration: /* @__PURE__ */ Qr("type"),
  NamespaceDeclaration: /* @__PURE__ */ Qr("namespace"),
  VariableDefinition(i, e) {
    i.matchContext(HQ) || e(i, "variable");
  },
  TypeDefinition(i, e) {
    e(i, "type");
  },
  __proto__: null
};
function rm(i, e) {
  let t = md.get(e);
  if (t)
    return t;
  let n = [], s = !0;
  function r(o, l) {
    let a = i.sliceString(o.from, o.to);
    n.push({ label: a, type: l });
  }
  return e.cursor(nt.IncludeAnonymous).iterate((o) => {
    if (s)
      s = !1;
    else if (o.name) {
      let l = KQ[o.name];
      if (l && l(o, r) || sm.has(o.name))
        return !1;
    } else if (o.to - o.from > 8192) {
      for (let l of rm(i, o.node))
        n.push(l);
      return !1;
    }
  }), md.set(e, n), n;
}
const vd = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/, om = [
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
function JQ(i) {
  let e = Si(i.state).resolveInner(i.pos, -1);
  if (om.indexOf(e.name) > -1)
    return null;
  let t = e.name == "VariableName" || e.to - e.from < 20 && vd.test(i.state.sliceDoc(e.from, e.to));
  if (!t && !i.explicit)
    return null;
  let n = [];
  for (let s = e; s; s = s.parent)
    sm.has(s.name) && (n = n.concat(rm(i.state.doc, s)));
  return {
    options: n,
    from: t ? e.from : i.pos,
    validFor: vd
  };
}
const hs = /* @__PURE__ */ $l.define({
  name: "javascript",
  parser: /* @__PURE__ */ hQ.configure({
    props: [
      /* @__PURE__ */ ug.add({
        IfStatement: /* @__PURE__ */ qa({ except: /^\s*({|else\b)/ }),
        TryStatement: /* @__PURE__ */ qa({ except: /^\s*({|catch\b|finally\b)/ }),
        LabeledStatement: Gx,
        SwitchBody: (i) => {
          let e = i.textAfter, t = /^\s*\}/.test(e), n = /^\s*(case|default)\b/.test(e);
          return i.baseIndent + (t ? 0 : n ? 1 : 2) * i.unit;
        },
        Block: /* @__PURE__ */ Bx({ closing: "}" }),
        ArrowFunction: (i) => i.baseIndent + i.unit,
        "TemplateString BlockComment": () => null,
        "Statement Property": /* @__PURE__ */ qa({ except: /^\s*{/ }),
        JSXElement(i) {
          let e = /^\s*<\//.test(i.textAfter);
          return i.lineIndent(i.node.from) + (e ? 0 : i.unit);
        },
        JSXEscape(i) {
          let e = /\s*\}/.test(i.textAfter);
          return i.lineIndent(i.node.from) + (e ? 0 : i.unit);
        },
        "JSXOpenTag JSXSelfClosingTag"(i) {
          return i.column(i.node.from) + i.unit;
        }
      }),
      /* @__PURE__ */ Ux.add({
        "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType": Fx,
        BlockComment(i) {
          return { from: i.from + 2, to: i.to - 2 };
        },
        JSXElement(i) {
          let e = i.firstChild;
          if (!e || e.name == "JSXSelfClosingTag")
            return null;
          let t = i.lastChild;
          return { from: e.to, to: t.type.isError ? i.to : t.from };
        },
        "JSXSelfClosingTag JSXOpenTag"(i) {
          var e;
          let t = (e = i.firstChild) === null || e === void 0 ? void 0 : e.nextSibling, n = i.lastChild;
          return !t || t.type.isError ? null : { from: t.to, to: n.type.isError ? i.to : n.from };
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
}), lm = {
  test: (i) => /^JSX/.test(i.name),
  facet: /* @__PURE__ */ hg({ commentTokens: { block: { open: "{/*", close: "*/}" } } })
}, e$ = /* @__PURE__ */ hs.configure({ dialect: "ts" }, "typescript"), t$ = /* @__PURE__ */ hs.configure({
  dialect: "jsx",
  props: [/* @__PURE__ */ Jc.add((i) => i.isTop ? [lm] : void 0)]
}), i$ = /* @__PURE__ */ hs.configure({
  dialect: "jsx ts",
  props: [/* @__PURE__ */ Jc.add((i) => i.isTop ? [lm] : void 0)]
}, "typescript");
let am = (i) => ({ label: i, type: "keyword" });
const hm = /* @__PURE__ */ "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map(am), n$ = /* @__PURE__ */ hm.concat(/* @__PURE__ */ ["declare", "implements", "private", "protected", "public"].map(am));
function s$(i = {}) {
  let e = i.jsx ? i.typescript ? i$ : t$ : i.typescript ? e$ : hs, t = i.typescript ? FQ.concat(n$) : nm.concat(hm);
  return new Ix(e, [
    hs.data.of({
      autocomplete: fQ(om, rf(t))
    }),
    hs.data.of({
      autocomplete: JQ
    }),
    i.jsx ? l$ : []
  ]);
}
function r$(i) {
  for (; ; ) {
    if (i.name == "JSXOpenTag" || i.name == "JSXSelfClosingTag" || i.name == "JSXFragmentTag")
      return i;
    if (i.name == "JSXEscape" || !i.parent)
      return null;
    i = i.parent;
  }
}
function bd(i, e, t = i.length) {
  for (let n = e == null ? void 0 : e.firstChild; n; n = n.nextSibling)
    if (n.name == "JSXIdentifier" || n.name == "JSXBuiltin" || n.name == "JSXNamespacedName" || n.name == "JSXMemberExpression")
      return i.sliceString(n.from, Math.min(n.to, t));
  return "";
}
const o$ = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), l$ = /* @__PURE__ */ ge.inputHandler.of((i, e, t, n, s) => {
  if ((o$ ? i.composing : i.compositionStarted) || i.state.readOnly || e != t || n != ">" && n != "/" || !hs.isActiveAt(i.state, e, -1))
    return !1;
  let r = s(), { state: o } = r, l = o.changeByRange((a) => {
    var h;
    let { head: c } = a, f = Si(o).resolveInner(c - 1, -1), d;
    if (f.name == "JSXStartTag" && (f = f.parent), !(o.doc.sliceString(c - 1, c) != n || f.name == "JSXAttributeValue" && f.to > c)) {
      if (n == ">" && f.name == "JSXFragmentTag")
        return { range: a, changes: { from: c, insert: "</>" } };
      if (n == "/" && f.name == "JSXStartCloseTag") {
        let p = f.parent, O = p.parent;
        if (O && p.from == c - 2 && ((d = bd(o.doc, O.firstChild, c)) || ((h = O.firstChild) === null || h === void 0 ? void 0 : h.name) == "JSXFragmentTag")) {
          let g = `${d}>`;
          return { range: B.cursor(c + g.length, -1), changes: { from: c, insert: g } };
        }
      } else if (n == ">") {
        let p = r$(f);
        if (p && p.name == "JSXOpenTag" && !/^\/?>|^<\//.test(o.doc.sliceString(c, c + 2)) && (d = bd(o.doc, p, c)))
          return { range: a, changes: { from: c, insert: `</${d}>` } };
      }
    }
    return { range: a };
  });
  return l.changes.empty ? !1 : (i.dispatch([
    r,
    o.update(l, { userEvent: "input.complete", scrollIntoView: !0 })
  ]), !0);
});
var a$ = /* @__PURE__ */ D('<div class="expr-editor svelte-c939oi"><div class="expr-cm svelte-c939oi"></div> <div class="expr-actions svelte-c939oi"><span class="expr-hint svelte-c939oi">JSONata</span> <button class="eval-btn svelte-c939oi" title="Evaluate against last run context">▶ Evaluate</button></div></div>');
function h$(i, e) {
  St(e, !1);
  let t = it(e, "value", 12, ""), n = it(e, "placeholder", 8, "JSONata expression..."), s = it(e, "fieldName", 8, ""), r = it(e, "contextKeys", 24, () => []);
  const o = Sc(), l = [
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
  let a = /* @__PURE__ */ K(), h = /* @__PURE__ */ K();
  function c() {
    const v = [
      ...l.map((y) => ({ label: y, type: "function" })),
      ...r().map((y) => ({ label: y, type: "variable" }))
    ];
    return rf(v);
  }
  function f() {
    return [
      bS(),
      ia.of([...Sk, ...PS]),
      nS(),
      s$(),
      BQ({ override: [c()] }),
      vx(n()),
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
  ys(() => {
    k(h, new ge({
      state: Xe.create({ doc: t(), extensions: f() }),
      parent: u(a)
    }));
  }), pp(() => {
    var v;
    (v = u(h)) == null || v.destroy();
  });
  function d() {
    o("evaluate", t());
  }
  ot(() => (u(h), Le(t())), () => {
    u(h) && t() !== u(h).state.doc.toString() && u(h).dispatch({
      changes: { from: 0, to: u(h).state.doc.length, insert: t() }
    });
  }), nn(), Tt();
  var p = a$(), O = x(p);
  $c(O, (v) => k(a, v), () => u(a));
  var g = w(O, 2), m = w(x(g), 2);
  F(() => Ge(O, "data-field", s())), ne("click", m, d), R(i, p), kt();
}
var c$ = /* @__PURE__ */ D('<input type="text" placeholder="connection ID" class="svelte-awrrrl"/>'), f$ = /* @__PURE__ */ D("<option> </option>"), u$ = /* @__PURE__ */ D('<div class="hint svelte-awrrrl"> </div>'), d$ = /* @__PURE__ */ D('<select class="svelte-awrrrl"><option>— select a connection —</option><!></select> <!>', 1);
function p$(i, e) {
  St(e, !1);
  let t = it(e, "value", 8, ""), n = it(e, "service", 8, void 0), s = it(e, "onChange", 8), r = /* @__PURE__ */ K([]), o = /* @__PURE__ */ K(!1);
  ys(async () => {
    try {
      const f = await fetch("/api/integrations/connections");
      if (!f.ok) throw new Error(String(f.status));
      const d = await f.json();
      k(r, n() ? d.filter((p) => p.service === n()) : d);
    } catch {
      k(o, !0);
    }
  }), Tt();
  var l = gn(), a = Fe(l);
  {
    var h = (f) => {
      var d = c$();
      F(() => Tr(d, t())), ne("input", d, (p) => s()(p.target.value)), R(f, d);
    }, c = (f) => {
      var d = d$(), p = Fe(d), O = x(p);
      O.value = O.__value = "";
      var g = w(O);
      et(g, 1, () => u(r), Je, ($, Z) => {
        var E = f$(), M = x(E), A = {};
        F(() => {
          G(M, `${u(Z), b(() => u(Z).displayName) ?? ""} (${u(Z), b(() => u(Z).service) ?? ""}${u(Z), b(() => u(Z).status !== "active" ? ` — ${u(Z).status}` : "") ?? ""})`), A !== (A = (u(Z), b(() => u(Z).id))) && (E.value = (E.__value = (u(Z), b(() => u(Z).id))) ?? "");
        }), R($, E);
      });
      var m;
      gp(p);
      var v = w(p, 2);
      {
        var y = ($) => {
          var Z = u$(), E = x(Z);
          F(() => G(E, `No ${n() ?? "integration" ?? ""} connections. Create one in Admin → Integration Connections.`)), R($, Z);
        };
        te(v, ($) => {
          u(r), b(() => u(r).length === 0) && $(y);
        });
      }
      F(() => {
        m !== (m = t()) && (p.value = (p.__value = t()) ?? "", kc(p, t()));
      }), ne("change", p, ($) => s()($.target.value)), R(f, d);
    };
    te(a, (f) => {
      u(o) ? f(h) : f(c, -1);
    });
  }
  R(i, l), kt();
}
var O$ = /* @__PURE__ */ D('<textarea rows="4" class="svelte-b5q3h1"></textarea>'), g$ = /* @__PURE__ */ D('<input type="text" placeholder="comma-separated values" class="svelte-b5q3h1"/>'), m$ = /* @__PURE__ */ D('<input type="checkbox" style="width:auto" class="svelte-b5q3h1"/>'), v$ = /* @__PURE__ */ D('<div class="eval-result svelte-b5q3h1"> </div>'), b$ = /* @__PURE__ */ D('<!> <!> <button class="mode-toggle-btn svelte-b5q3h1">← Value Picker mode</button>', 1), y$ = /* @__PURE__ */ D('<button class="picker-btn svelte-b5q3h1" title="Reference upstream node output">↗</button>'), w$ = /* @__PURE__ */ D('<button class="picker-option svelte-b5q3h1"><span class="picker-node svelte-b5q3h1"> </span> <span class="picker-ref svelte-b5q3h1"> </span></button>'), x$ = /* @__PURE__ */ D('<div class="picker-dropdown svelte-b5q3h1"><div class="picker-label svelte-b5q3h1">Insert reference to:</div> <!></div>'), S$ = /* @__PURE__ */ D('<div class="field-with-picker svelte-b5q3h1"><input type="text" class="svelte-b5q3h1"/> <!> <button class="expr-toggle-btn svelte-b5q3h1" title="Switch to JSONata expression editor">ƒ</button></div> <!>', 1), k$ = /* @__PURE__ */ D('<div class="form-group svelte-b5q3h1"><label class="svelte-b5q3h1"> </label> <!></div>'), Q$ = /* @__PURE__ */ D('<div class="panel-section svelte-b5q3h1"><div class="panel-header svelte-b5q3h1"><span> </span> <button class="close-btn svelte-b5q3h1">✕</button></div> <div class="form-group svelte-b5q3h1"><label class="svelte-b5q3h1">Label</label> <input type="text" class="svelte-b5q3h1"/></div> <!> <button class="btn-danger svelte-b5q3h1">Remove node</button></div>');
function $$(i, e) {
  St(e, !1);
  const t = () => vt(Ir, "$nodeTypes", s), n = () => vt(pt, "$graph", s), [s, r] = vn(), o = /* @__PURE__ */ K(), l = /* @__PURE__ */ K(), a = /* @__PURE__ */ K();
  let h = it(e, "node", 8), c = /* @__PURE__ */ K(null), f = /* @__PURE__ */ K(
    null
    // field currently in expression editor mode
  ), d = /* @__PURE__ */ K(
    {}
    // fieldKey → eval result
  );
  function p(T) {
    var Q, q;
    const I = t().find((ae) => ae.type === T.type), P = (q = (Q = I == null ? void 0 : I.schema) == null ? void 0 : Q.output) == null ? void 0 : q.properties;
    return P && Object.keys(P).length > 0 ? Object.keys(P) : ["output"];
  }
  async function O(T, I) {
    try {
      const Q = await (await fetch("/studio/evaluate-expression", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression: I })
      })).json();
      k(d, {
        ...u(d),
        [T]: Q.error ? `Error: ${Q.error}` : JSON.stringify(Q.result)
      });
    } catch {
      k(d, { ...u(d), [T]: "Request failed" });
    }
  }
  function g(T, I) {
    pt.update((P) => ({
      ...P,
      nodes: {
        ...P.nodes,
        [h().id]: { ...h(), config: { ...h().config, [T]: I } }
      }
    }));
  }
  function m(T) {
    pt.update((I) => ({
      ...I,
      nodes: { ...I.nodes, [h().id]: { ...h(), label: T } }
    }));
  }
  function v() {
    pt.update((T) => {
      const I = { ...T.nodes };
      return delete I[h().id], {
        ...T,
        nodes: I,
        edges: T.edges.filter((P) => P.from !== h().id && P.to !== h().id)
      };
    }), Xn.set(null);
  }
  function y(T) {
    return h().config[T] ?? void 0;
  }
  function $(T, I, P) {
    g(T, `$.${P}`), k(c, null);
  }
  ot(() => (t(), Le(h())), () => {
    k(o, t().find((T) => T.type === h().type));
  }), ot(() => u(o), () => {
    var T, I, P;
    k(l, ((P = (I = (T = u(o)) == null ? void 0 : T.schema) == null ? void 0 : I.config) == null ? void 0 : P.properties) ?? {});
  }), ot(() => (n(), Le(h())), () => {
    k(a, Object.values(n().nodes).filter((T) => n().edges.some((I) => I.to === h().id && I.from === T.id)));
  }), ot(() => Le(h()), () => {
    var T;
    (T = h()) != null && T.id && (k(f, null), k(d, {}), k(c, null));
  }), nn(), Tt();
  var Z = Q$(), E = x(Z), M = x(E), A = x(M), Y = w(M, 2), L = w(E, 2), X = w(x(L), 2), j = w(L, 2);
  et(
    j,
    1,
    () => (u(l), b(() => Object.entries(u(l)))),
    Je,
    (T, I) => {
      var P = /* @__PURE__ */ us(() => jm(u(I), 2));
      let Q = () => u(P)[0], q = () => u(P)[1];
      var ae = k$(), V = x(ae), H = x(V), z = w(V, 2);
      {
        var ee = (oe) => {
          {
            let fe = /* @__PURE__ */ yt(() => (Q(), b(() => String(y(Q()) ?? ""))));
            p$(oe, {
              get value() {
                return u(fe);
              },
              get service() {
                return q(), b(() => q().service);
              },
              onChange: (ve) => g(Q(), ve)
            });
          }
        }, he = (oe) => {
          var fe = O$();
          F((ve) => Tr(fe, ve), [
            () => (Q(), b(() => JSON.stringify(y(Q()) ?? {}, null, 2)))
          ]), ne("blur", fe, (ve) => {
            try {
              g(Q(), JSON.parse(ve.target.value));
            } catch {
            }
          }), R(oe, fe);
        }, ce = (oe) => {
          var fe = g$();
          F((ve) => Tr(fe, ve), [
            () => (Q(), b(() => Array.isArray(y(Q())) ? y(Q()).join(", ") : String(y(Q()) ?? "")))
          ]), ne("input", fe, (ve) => g(Q(), ve.target.value.split(",").map((Te) => Te.trim()).filter(Boolean))), R(oe, fe);
        }, ue = (oe) => {
          var fe = m$();
          F((ve) => r0(fe, ve), [() => (Q(), b(() => !!y(Q())))]), ne("change", fe, (ve) => g(Q(), ve.target.checked)), R(oe, fe);
        }, le = (oe) => {
          var fe = gn(), ve = Fe(fe);
          {
            var Te = (Se) => {
              var Ee = b$(), qe = Fe(Ee);
              {
                let Ze = /* @__PURE__ */ yt(() => (Q(), b(() => String(y(Q()) ?? "")))), N = /* @__PURE__ */ yt(() => (u(a), b(() => u(a).flatMap(p))));
                h$(qe, {
                  get value() {
                    return u(Ze);
                  },
                  get fieldName() {
                    return Q();
                  },
                  get contextKeys() {
                    return u(N);
                  },
                  $$events: {
                    change: (C) => g(Q(), C.detail),
                    evaluate: (C) => O(Q(), C.detail)
                  }
                });
              }
              var rt = w(qe, 2);
              {
                var bt = (Ze) => {
                  var N = v$(), C = x(N);
                  F((U) => G(C, U), [
                    () => (u(d), Q(), b(() => String(u(d)[Q()])))
                  ]), R(Ze, N);
                };
                te(rt, (Ze) => {
                  u(d), Q(), b(() => u(d)[Q()]) && Ze(bt);
                });
              }
              var ut = w(rt, 2);
              ne("click", ut, () => {
                k(f, null), k(d, { ...u(d), [Q()]: void 0 });
              }), R(Se, Ee);
            }, ye = (Se) => {
              var Ee = S$(), qe = Fe(Ee), rt = x(qe), bt = w(rt, 2);
              {
                var ut = (U) => {
                  var se = y$();
                  ne("click", se, () => {
                    k(c, u(c) === Q() ? null : Q());
                  }), R(U, se);
                };
                te(bt, (U) => {
                  u(a), b(() => u(a).length > 0) && U(ut);
                });
              }
              var Ze = w(bt, 2), N = w(qe, 2);
              {
                var C = (U) => {
                  var se = x$(), be = w(x(se), 2);
                  et(be, 1, () => u(a), Je, (Ke, Pe) => {
                    var Ve = gn(), J = Fe(Ve);
                    et(
                      J,
                      1,
                      () => (u(Pe), b(() => p(u(Pe)))),
                      Je,
                      (de, pe) => {
                        var Re = w$(), tt = x(Re), Qe = x(tt), je = w(tt, 2), Be = x(je);
                        F(() => {
                          G(Qe, (u(Pe), b(() => u(Pe).label ?? u(Pe).id))), G(Be, `$.${u(pe) ?? ""}`);
                        }), ne("click", Re, () => $(Q(), u(Pe).id, u(pe))), R(de, Re);
                      }
                    ), R(Ke, Ve);
                  }), R(U, se);
                };
                te(N, (U) => {
                  u(c), Q(), u(a), b(() => u(c) === Q() && u(a).length > 0) && U(C);
                });
              }
              F((U) => Tr(rt, U), [
                () => (Q(), b(() => String(y(Q()) ?? "")))
              ]), ne("input", rt, (U) => g(Q(), U.target.value)), ne("click", Ze, () => {
                k(f, Q()), k(c, null);
              }), R(Se, Ee);
            };
            te(ve, (Se) => {
              u(f) === Q() ? Se(Te) : Se(ye, -1);
            });
          }
          R(oe, fe);
        };
        te(z, (oe) => {
          q(), b(() => q().format === "connection") ? oe(ee) : (q(), b(() => q().type === "object") ? oe(he, 1) : (q(), b(() => q().type === "array") ? oe(ce, 2) : (q(), b(() => q().type === "boolean") ? oe(ue, 3) : oe(le, -1))));
        });
      }
      F(() => G(H, (q(), Q(), b(() => q().description ?? Q())))), R(T, ae);
    }
  );
  var S = w(j, 2);
  F(() => {
    G(A, `Node: ${Le(h()), b(() => h().type) ?? ""}`), Tr(X, (Le(h()), b(() => h().label ?? "")));
  }), ne("click", Y, () => Xn.set(null)), ne("input", X, (T) => m(T.target.value)), ne("click", S, v), R(i, Z), kt(), r();
}
var _$ = /* @__PURE__ */ D('<div class="agent-name svelte-5tjmbm"> </div> <div> </div>', 1), P$ = /* @__PURE__ */ D('<div class="status-msg svelte-5tjmbm"> </div>'), T$ = /* @__PURE__ */ D('<div class="status-msg svelte-5tjmbm"> </div>'), Z$ = /* @__PURE__ */ D('<div class="status-msg svelte-5tjmbm"> </div>'), C$ = /* @__PURE__ */ D('<button class="btn-revert svelte-5tjmbm"> </button> <!>', 1), E$ = /* @__PURE__ */ D('<span class="trigger-filter svelte-5tjmbm"> </span>'), A$ = /* @__PURE__ */ D('<div class="trigger-row svelte-5tjmbm"><div class="trigger-info svelte-5tjmbm"><span class="trigger-service svelte-5tjmbm"> </span> <!> <code class="trigger-url svelte-5tjmbm"> </code></div> <button class="trigger-remove svelte-5tjmbm" title="Remove trigger">✕</button></div>'), R$ = /* @__PURE__ */ D('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Registered Triggers</label> <!></div>'), M$ = /* @__PURE__ */ D("<option> </option>"), X$ = /* @__PURE__ */ D('<div class="status-msg svelte-5tjmbm"> </div>'), j$ = /* @__PURE__ */ D(`<!> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Service</label> <select class="svelte-5tjmbm"><option>— select a service —</option><!></select></div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Event Filter (optional)</label> <input type="text" placeholder="e.g. app_mention — blank for all events" class="svelte-5tjmbm"/></div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Signing Secret</label> <input type="password" placeholder="the service's webhook signing secret" class="svelte-5tjmbm"/> <div class="field-hint svelte-5tjmbm">Used to verify inbound event signatures. Never displayed after registration.</div></div> <button class="btn-save svelte-5tjmbm"> </button> <!>`, 1), L$ = /* @__PURE__ */ D('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Cron Expression</label> <input type="text" placeholder="0 * * * * (every hour)" class="svelte-5tjmbm"/> <div class="field-hint svelte-5tjmbm">Standard cron format: minute hour day month weekday</div></div>'), I$ = /* @__PURE__ */ D('<div class="webhook-url svelte-5tjmbm"><code class="svelte-5tjmbm"> </code> <div class="field-hint svelte-5tjmbm">POST your payload to this URL. No auth headers required.</div></div>'), D$ = /* @__PURE__ */ D('<div class="field-hint svelte-5tjmbm">Publish the agent to generate the webhook URL.</div>'), z$ = /* @__PURE__ */ D('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Webhook URL</label> <!></div>'), N$ = /* @__PURE__ */ D('<div class="status-msg svelte-5tjmbm"> </div>'), Y$ = /* @__PURE__ */ D('<div class="panel-section svelte-5tjmbm"><div class="panel-header svelte-5tjmbm">Agent</div> <!> <div class="btn-row svelte-5tjmbm"><button class="btn-draft svelte-5tjmbm"> </button> <button class="btn-publish svelte-5tjmbm"> </button></div> <!> <!> <!></div> <div class="panel-section svelte-5tjmbm"><div class="panel-header svelte-5tjmbm">Trigger Config</div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Trigger Type</label> <select class="svelte-5tjmbm"><option>REST API</option><option>Scheduled (Cron)</option><option>Webhook</option><option>Integration Event</option></select></div> <!> <!> <!> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Description</label> <input type="text" placeholder="What does this agent do?" class="svelte-5tjmbm"/></div> <button class="btn-save svelte-5tjmbm"> </button> <!></div>', 1);
function W$(i, e) {
  St(e, !1);
  const t = () => vt(pt, "$graph", r), n = () => vt($s, "$agentConfig", r), s = () => vt(Jo, "$agent", r), [r, o] = vn();
  let l = it(e, "agentId", 8), a = /* @__PURE__ */ K(!1), h = /* @__PURE__ */ K(""), c = /* @__PURE__ */ K(!1), f = /* @__PURE__ */ K(""), d = /* @__PURE__ */ K(!1), p = /* @__PURE__ */ K(""), O = /* @__PURE__ */ K(!1), g = /* @__PURE__ */ K(""), m = /* @__PURE__ */ K([]), v = /* @__PURE__ */ K([]), y = /* @__PURE__ */ K(""), $ = /* @__PURE__ */ K(""), Z = /* @__PURE__ */ K(""), E = /* @__PURE__ */ K(""), M = /* @__PURE__ */ K(!1);
  ys(async () => {
    try {
      const [J, de] = await Promise.all([
        fetch("/api/integrations"),
        fetch("/api/integrations/triggers")
      ]);
      if (J.ok) {
        const pe = await J.json();
        k(m, pe.filter((Re) => Re.hasTrigger));
      }
      if (de.ok) {
        const pe = await de.json();
        k(v, pe.filter((Re) => Re.agentId === l()));
      }
    } catch {
    }
  });
  async function A() {
    k(M, !0), k(E, "");
    try {
      const J = await fetch("/api/integrations/triggers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: u(y),
          agentId: l(),
          eventFilter: u($) || void 0,
          secret: u(Z)
        })
      });
      if (!J.ok) throw new Error("Registration failed");
      const de = await J.json();
      k(v, [...u(v), de]), k(Z, ""), k($, ""), k(E, "✓ Trigger registered");
    } catch (J) {
      k(E, "✗ " + (J instanceof Error ? J.message : "Error"));
    } finally {
      k(M, !1);
    }
  }
  async function Y(J) {
    try {
      const de = await fetch(`/api/integrations/triggers/${J}`, { method: "DELETE" });
      (de.ok || de.status === 204) && k(v, u(v).filter((pe) => pe.id !== J));
    } catch {
    }
  }
  async function L() {
    k(a, !0), k(h, "");
    try {
      const J = JSON.stringify(t());
      if (!(await fetch(`/api/agents/${l()}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ graphJson: J })
      })).ok) throw new Error("Publish failed");
      k(h, "✓ Published");
      const pe = await fetch(`/api/agents/${l()}`);
      pe.ok && Jo.set(await pe.json());
    } catch (J) {
      k(h, "✗ " + (J instanceof Error ? J.message : "Error"));
    } finally {
      k(a, !1);
    }
  }
  async function X() {
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
  async function j() {
    k(O, !0), k(g, "");
    try {
      const J = await fetch(`/api/agents/${l()}/draft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (!J.ok) throw new Error("Revert failed");
      Jo.set(await J.json()), k(g, "✓ Reverted to draft");
    } catch (J) {
      k(g, "✗ " + (J instanceof Error ? J.message : "Error"));
    } finally {
      k(O, !1);
    }
  }
  async function S() {
    k(c, !0), k(f, "");
    try {
      const J = { type: n().triggerType };
      if (n().triggerType === "cron" && (J.expression = n().cronExpression), !(await fetch(`/api/agents/${l()}/config`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ triggerConfig: J })
      })).ok) throw new Error("Save failed");
      if (k(f, "✓ Saved"), n().triggerType === "webhook") {
        const pe = await fetch(`/api/agents/${l()}/config`);
        if (pe.ok) {
          const Re = await pe.json();
          $s.update((tt) => {
            var Qe;
            return { ...tt, webhookUrl: ((Qe = Re.triggerConfig) == null ? void 0 : Qe.webhookUrl) ?? "" };
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
  var T = Y$(), I = Fe(T), P = w(x(I), 2);
  {
    var Q = (J) => {
      var de = _$(), pe = Fe(de), Re = x(pe), tt = w(pe, 2), Qe = x(tt);
      F(() => {
        G(Re, (s(), b(() => s().name))), si(tt, 1, `agent-status status-${s(), b(() => s().status) ?? ""}`, "svelte-5tjmbm"), G(Qe, (s(), b(() => s().status)));
      }), R(J, de);
    };
    te(P, (J) => {
      s() && J(Q);
    });
  }
  var q = w(P, 2), ae = x(q), V = x(ae), H = w(ae, 2), z = x(H), ee = w(q, 2);
  {
    var he = (J) => {
      var de = P$(), pe = x(de);
      F(() => G(pe, u(p))), R(J, de);
    };
    te(ee, (J) => {
      u(p) && J(he);
    });
  }
  var ce = w(ee, 2);
  {
    var ue = (J) => {
      var de = T$(), pe = x(de);
      F(() => G(pe, u(h))), R(J, de);
    };
    te(ce, (J) => {
      u(h) && J(ue);
    });
  }
  var le = w(ce, 2);
  {
    var oe = (J) => {
      var de = C$(), pe = Fe(de), Re = x(pe), tt = w(pe, 2);
      {
        var Qe = (je) => {
          var Be = Z$(), De = x(Be);
          F(() => G(De, u(g))), R(je, Be);
        };
        te(tt, (je) => {
          u(g) && je(Qe);
        });
      }
      F(() => {
        pe.disabled = u(O), G(Re, u(O) ? "Reverting…" : "Revert to Draft");
      }), ne("click", pe, j), R(J, de);
    };
    te(le, (J) => {
      s(), b(() => {
        var de;
        return ((de = s()) == null ? void 0 : de.status) === "active";
      }) && J(oe);
    });
  }
  var fe = w(I, 2), ve = w(x(fe), 2), Te = w(x(ve), 2), ye = x(Te);
  ye.value = ye.__value = "rest";
  var Se = w(ye);
  Se.value = Se.__value = "cron";
  var Ee = w(Se);
  Ee.value = Ee.__value = "webhook";
  var qe = w(Ee);
  qe.value = qe.__value = "integration";
  var rt = w(ve, 2);
  {
    var bt = (J) => {
      var de = j$(), pe = Fe(de);
      {
        var Re = (At) => {
          var ri = R$(), yn = w(x(ri), 2);
          et(yn, 1, () => u(v), Je, (ca, oi) => {
            var df = A$(), pf = x(df), Of = x(pf), dm = x(Of), gf = w(Of, 2);
            {
              var pm = (fa) => {
                var mf = E$(), vm = x(mf);
                F(() => G(vm, (u(oi), b(() => u(oi).eventFilter)))), R(fa, mf);
              };
              te(gf, (fa) => {
                u(oi), b(() => u(oi).eventFilter) && fa(pm);
              });
            }
            var Om = w(gf, 2), gm = x(Om), mm = w(pf, 2);
            F(() => {
              G(dm, (u(oi), b(() => u(oi).service))), G(gm, (u(oi), b(() => u(oi).url)));
            }), ne("click", mm, () => Y(u(oi).id)), R(ca, df);
          }), R(At, ri);
        };
        te(pe, (At) => {
          u(v), b(() => u(v).length > 0) && At(Re);
        });
      }
      var tt = w(pe, 2), Qe = w(x(tt), 2), je = x(Qe);
      je.value = je.__value = "";
      var Be = w(je);
      et(Be, 1, () => u(m), Je, (At, ri) => {
        var yn = M$(), ca = x(yn), oi = {};
        F(() => {
          G(ca, (u(ri), b(() => u(ri).displayName))), oi !== (oi = (u(ri), b(() => u(ri).service))) && (yn.value = (yn.__value = (u(ri), b(() => u(ri).service))) ?? "");
        }), R(At, yn);
      });
      var De = w(tt, 2), ze = w(x(De), 2), vr = w(De, 2), ha = w(x(vr), 2), xs = w(vr, 2), cm = x(xs), fm = w(xs, 2);
      {
        var um = (At) => {
          var ri = X$(), yn = x(ri);
          F(() => G(yn, u(E))), R(At, ri);
        };
        te(fm, (At) => {
          u(E) && At(um);
        });
      }
      F(() => {
        xs.disabled = u(M) || !u(y) || !u(Z), G(cm, u(M) ? "Registering…" : "Register Trigger");
      }), vh(Qe, () => u(y), (At) => k(y, At)), qt(ze, () => u($), (At) => k($, At)), qt(ha, () => u(Z), (At) => k(Z, At)), ne("click", xs, A), R(J, de);
    };
    te(rt, (J) => {
      n(), b(() => n().triggerType === "integration") && J(bt);
    });
  }
  var ut = w(rt, 2);
  {
    var Ze = (J) => {
      var de = L$(), pe = w(x(de), 2);
      qt(pe, () => n().cronExpression, (Re) => da($s, b(n).cronExpression = Re, b(n))), R(J, de);
    };
    te(ut, (J) => {
      n(), b(() => n().triggerType === "cron") && J(Ze);
    });
  }
  var N = w(ut, 2);
  {
    var C = (J) => {
      var de = z$(), pe = w(x(de), 2);
      {
        var Re = (Qe) => {
          var je = I$(), Be = x(je), De = x(Be);
          F(() => G(De, (n(), b(() => n().webhookUrl)))), R(Qe, je);
        }, tt = (Qe) => {
          var je = D$();
          R(Qe, je);
        };
        te(pe, (Qe) => {
          n(), b(() => n().webhookUrl) ? Qe(Re) : Qe(tt, -1);
        });
      }
      R(J, de);
    };
    te(N, (J) => {
      n(), b(() => n().triggerType === "webhook") && J(C);
    });
  }
  var U = w(N, 2), se = w(x(U), 2), be = w(U, 2), Ke = x(be), Pe = w(be, 2);
  {
    var Ve = (J) => {
      var de = N$(), pe = x(de);
      F(() => G(pe, u(f))), R(J, de);
    };
    te(Pe, (J) => {
      u(f) && J(Ve);
    });
  }
  F(() => {
    ae.disabled = u(d), G(V, u(d) ? "Saving…" : "Save Draft"), H.disabled = u(a), G(z, u(a) ? "Publishing…" : "Publish"), be.disabled = u(c), G(Ke, u(c) ? "Saving…" : "Save");
  }), ne("click", ae, X), ne("click", H, L), vh(Te, () => n().triggerType, (J) => da($s, b(n).triggerType = J, b(n))), qt(se, () => n().description, (J) => da($s, b(n).description = J, b(n))), ne("click", be, S), R(i, T), kt(), o();
}
const li = zn({
  runId: null,
  status: "idle",
  output: null,
  error: null,
  steps: []
});
var q$ = /* @__PURE__ */ D('<button class="btn-stop svelte-gqobos">■ Stop</button>'), V$ = /* @__PURE__ */ D('<pre class="result-json svelte-gqobos"> </pre>'), B$ = /* @__PURE__ */ D('<div class="result-error svelte-gqobos"> </div>'), G$ = /* @__PURE__ */ D('<button class="traj-toggle svelte-gqobos"> </button>'), U$ = /* @__PURE__ */ D('<div class="traj-thought svelte-gqobos"><span class="traj-label svelte-gqobos">Thought</span> </div>'), F$ = /* @__PURE__ */ D('<div class="traj-action svelte-gqobos"><span class="traj-label svelte-gqobos">Action</span> </div>'), H$ = /* @__PURE__ */ D('<div class="traj-obs svelte-gqobos"><span class="traj-label svelte-gqobos">Obs</span> </div>'), K$ = /* @__PURE__ */ D('<div class="traj-step svelte-gqobos"><span class="traj-iter svelte-gqobos"> </span> <!> <!> <!></div>'), J$ = /* @__PURE__ */ D('<div class="trajectory-block svelte-gqobos"></div>'), e_ = /* @__PURE__ */ D('<div><span class="step-type svelte-gqobos"> </span> <span> </span> <!></div> <!>', 1), t_ = /* @__PURE__ */ D('<div class="steps-header svelte-gqobos"> </div> <!>', 1), i_ = /* @__PURE__ */ D('<div><div class="result-status svelte-gqobos"> </div> <!> <!></div> <!>', 1), n_ = /* @__PURE__ */ D('<div class="panel-section svelte-gqobos"><div class="panel-header svelte-gqobos">Test Run</div> <div class="form-group svelte-gqobos"><label class="svelte-gqobos">Input (JSON)</label> <textarea rows="4" class="svelte-gqobos"></textarea></div> <div class="run-controls svelte-gqobos"><button class="btn-run svelte-gqobos"> </button> <!></div> <!></div>');
function s_(i, e) {
  St(e, !1);
  const t = () => vt(li, "$runState", n), [n, s] = vn();
  let r = it(e, "agentId", 8), o = /* @__PURE__ */ K("{}"), l = /* @__PURE__ */ K(!1), a = null;
  const h = /* @__PURE__ */ new Set(["core:react", "core:planner"]);
  let c = /* @__PURE__ */ K([]), f = /* @__PURE__ */ K(
    null
    // nodeId
  );
  async function d(L) {
    try {
      const X = await fetch(`/api/telemetry/trajectory/${L}`);
      if (!X.ok) return;
      const j = await X.json();
      k(c, j.trajectories ?? []);
    } catch {
    }
  }
  function p() {
    a && (a.close(), a = null), k(l, !1);
  }
  async function O() {
    var j;
    p(), k(l, !0), li.set({
      runId: null,
      status: "running",
      output: null,
      error: null,
      steps: []
    });
    let L;
    try {
      L = JSON.parse(u(o));
    } catch {
      li.set({
        runId: null,
        status: "failed",
        output: null,
        error: "Invalid JSON input",
        steps: []
      }), k(l, !1);
      return;
    }
    let X;
    try {
      const S = await fetch(`/api/agents/${r()}/runs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: L, mode: "async" })
      });
      if (!S.ok) {
        const I = await S.json();
        throw new Error(((j = I == null ? void 0 : I.error) == null ? void 0 : j.message) ?? `HTTP ${S.status}`);
      }
      X = (await S.json()).runId;
    } catch (S) {
      li.set({
        runId: null,
        status: "failed",
        output: null,
        error: String(S),
        steps: []
      }), k(l, !1);
      return;
    }
    li.update((S) => ({ ...S, runId: X })), a = new EventSource(`/api/agents/${r()}/runs/${X}/stream`), a.addEventListener("node.started", (S) => {
      const T = JSON.parse(S.data);
      li.update((I) => ({
        ...I,
        steps: [
          ...I.steps.filter((P) => P.nodeId !== T.nodeId),
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
    }), a.addEventListener("node.completed", (S) => {
      const T = JSON.parse(S.data);
      li.update((I) => ({
        ...I,
        steps: I.steps.map((P) => P.nodeId === T.nodeId ? {
          ...P,
          status: "complete",
          completedAt: (/* @__PURE__ */ new Date()).toISOString(),
          output: T.outputs
        } : P)
      }));
    }), a.addEventListener("node.failed", (S) => {
      const T = JSON.parse(S.data);
      li.update((I) => ({
        ...I,
        steps: I.steps.map((P) => P.nodeId === T.nodeId ? {
          ...P,
          status: "failed",
          completedAt: (/* @__PURE__ */ new Date()).toISOString(),
          error: T.error
        } : P)
      }));
    }), a.addEventListener("run.completed", (S) => {
      const T = JSON.parse(S.data);
      li.update((I) => ({ ...I, status: "completed", output: T.output })), p(), d(X);
    }), a.addEventListener("run.failed", (S) => {
      const T = JSON.parse(S.data);
      li.update((I) => ({ ...I, status: "failed", error: T.error.message })), p();
    }), a.addEventListener("run.suspended", () => {
      li.update((S) => ({
        ...S,
        status: "failed",
        error: "Run suspended — awaiting human review"
      })), p();
    }), a.onerror = () => {
      u(l) && (li.update((S) => ({
        ...S,
        status: S.status === "running" ? "failed" : S.status,
        error: S.error ?? "Stream connection lost"
      })), p());
    };
  }
  Tt();
  var g = n_(), m = w(x(g), 2), v = w(x(m), 2), y = w(m, 2), $ = x(y), Z = x($), E = w($, 2);
  {
    var M = (L) => {
      var X = q$();
      ne("click", X, p), R(L, X);
    };
    te(E, (L) => {
      u(l) && L(M);
    });
  }
  var A = w(y, 2);
  {
    var Y = (L) => {
      var X = i_(), j = Fe(X), S = x(j), T = x(S), I = w(S, 2);
      {
        var P = (H) => {
          var z = V$(), ee = x(z);
          F((he) => G(ee, he), [
            () => (t(), b(() => JSON.stringify(t().output, null, 2)))
          ]), R(H, z);
        };
        te(I, (H) => {
          t(), b(() => t().output) && H(P);
        });
      }
      var Q = w(I, 2);
      {
        var q = (H) => {
          var z = B$(), ee = x(z);
          F(() => G(ee, (t(), b(() => t().error)))), R(H, z);
        };
        te(Q, (H) => {
          t(), b(() => t().error) && H(q);
        });
      }
      var ae = w(j, 2);
      {
        var V = (H) => {
          var z = t_(), ee = Fe(z), he = x(ee), ce = w(ee, 2);
          et(ce, 1, () => (t(), b(() => t().steps)), Je, (ue, le) => {
            var oe = e_(), fe = Fe(oe), ve = x(fe), Te = x(ve), ye = w(ve, 2), Se = x(ye), Ee = w(ye, 2);
            {
              var qe = (Ze) => {
                const N = /* @__PURE__ */ yt(() => (u(c), u(le), b(() => u(c).filter((be) => be.stepId === u(le).stepId))));
                var C = gn(), U = Fe(C);
                {
                  var se = (be) => {
                    var Ke = G$(), Pe = x(Ke);
                    F(() => G(Pe, `▶ Trajectory (${Le(u(N)), b(() => u(N).length) ?? ""} steps)`)), ne("click", Ke, () => k(f, u(f) === u(le).nodeId ? null : u(le).nodeId)), R(be, Ke);
                  };
                  te(U, (be) => {
                    Le(u(N)), b(() => u(N).length > 0) && be(se);
                  });
                }
                R(Ze, C);
              }, rt = /* @__PURE__ */ us(() => (u(le), t(), b(() => h.has(u(le).nodeType) && t().status !== "running")));
              te(Ee, (Ze) => {
                u(rt) && Ze(qe);
              });
            }
            var bt = w(fe, 2);
            {
              var ut = (Ze) => {
                const N = /* @__PURE__ */ yt(() => (u(c), u(le), b(() => u(c).filter((U) => U.stepId === u(le).stepId))));
                var C = J$();
                et(C, 5, () => u(N), Je, (U, se) => {
                  var be = K$(), Ke = x(be), Pe = x(Ke), Ve = w(Ke, 2);
                  {
                    var J = (Qe) => {
                      var je = U$(), Be = w(x(je));
                      F(() => G(Be, ` ${u(se), b(() => u(se).thought) ?? ""}`)), R(Qe, je);
                    };
                    te(Ve, (Qe) => {
                      u(se), b(() => u(se).thought) && Qe(J);
                    });
                  }
                  var de = w(Ve, 2);
                  {
                    var pe = (Qe) => {
                      var je = F$(), Be = w(x(je));
                      F(() => G(Be, ` ${u(se), b(() => u(se).action) ?? ""}`)), R(Qe, je);
                    };
                    te(de, (Qe) => {
                      u(se), b(() => u(se).action) && Qe(pe);
                    });
                  }
                  var Re = w(de, 2);
                  {
                    var tt = (Qe) => {
                      var je = H$(), Be = w(x(je));
                      F(() => G(Be, ` ${u(se), b(() => u(se).observation) ?? ""}`)), R(Qe, je);
                    };
                    te(Re, (Qe) => {
                      u(se), b(() => u(se).observation) && Qe(tt);
                    });
                  }
                  F(() => G(Pe, `Iter ${u(se), b(() => u(se).iteration) ?? ""}`)), R(U, be);
                }), R(Ze, C);
              };
              te(bt, (Ze) => {
                u(f), u(le), b(() => u(f) === u(le).nodeId) && Ze(ut);
              });
            }
            F(() => {
              si(fe, 1, `step step-${u(le), b(() => u(le).status) ?? ""}`, "svelte-gqobos"), G(Te, (u(le), b(() => u(le).nodeType))), si(ye, 1, `step-badge badge-${u(le), b(() => u(le).status) ?? ""}`, "svelte-gqobos"), G(Se, (u(le), b(() => u(le).status)));
            }), R(ue, oe);
          }), F(() => G(he, `Steps (${t(), b(() => t().steps.length) ?? ""})`)), R(H, z);
        };
        te(ae, (H) => {
          t(), b(() => t().steps.length > 0) && H(V);
        });
      }
      F(
        (H) => {
          si(j, 1, `run-result status-${t(), b(() => t().status) ?? ""}`, "svelte-gqobos"), G(T, H);
        },
        [
          () => (t(), b(() => t().status.toUpperCase()))
        ]
      ), R(L, X);
    };
    te(A, (L) => {
      t(), b(() => t().status !== "idle") && L(Y);
    });
  }
  F(() => {
    $.disabled = u(l), G(Z, u(l) ? "Running…" : "▶ Run");
  }), qt(v, () => u(o), (L) => k(o, L)), ne("click", $, O), R(i, g), kt(), s();
}
var r_ = /* @__PURE__ */ D('<span class="badge badge-error svelte-do6mn6"> </span>'), o_ = /* @__PURE__ */ D('<span class="badge badge-warn svelte-do6mn6"> </span>'), l_ = /* @__PURE__ */ D('<div class="issue issue-error svelte-do6mn6" role="button" tabindex="0"><span class="issue-icon svelte-do6mn6">✗</span> <span class="issue-msg svelte-do6mn6"> </span></div>'), a_ = /* @__PURE__ */ D('<div class="issue issue-warning svelte-do6mn6" role="button" tabindex="0"><span class="issue-icon svelte-do6mn6">⚠</span> <span class="issue-msg svelte-do6mn6"> </span></div>'), h_ = /* @__PURE__ */ D('<label class="ack-label svelte-do6mn6"><input type="checkbox" class="svelte-do6mn6"/> Acknowledge warnings and allow publish</label>'), c_ = /* @__PURE__ */ D('<div class="lint-panel svelte-do6mn6"><div class="lint-header svelte-do6mn6"><span class="lint-title svelte-do6mn6">Graph Issues</span> <!> <!></div> <div class="issue-list svelte-do6mn6"><!> <!></div> <!></div>');
function f_(i, e) {
  St(e, !1);
  const t = () => vt(pt, "$graph", r), n = () => vt(Ir, "$nodeTypes", r), s = () => vt(Ec, "$connections", r), [r, o] = vn(), l = /* @__PURE__ */ K(), a = /* @__PURE__ */ K(), h = /* @__PURE__ */ K(), c = /* @__PURE__ */ K();
  let f = /* @__PURE__ */ K(!1);
  ys(() => {
    Yp();
  });
  function d($) {
    const Z = [], E = /* @__PURE__ */ new Map();
    for (const L of $.edges) {
      const X = E.get(L.from) ?? [];
      X.push(L.to), E.set(L.from, X);
    }
    const M = /* @__PURE__ */ new Map();
    function A(L) {
      var X;
      M.set(L, "visiting");
      for (const j of E.get(L) ?? [])
        if (M.get(j) === "visiting") {
          const S = $.nodes[L];
          (S == null ? void 0 : S.type) !== "core:loop" && Z.push({
            severity: "error",
            message: `Cycle edge from "${(S == null ? void 0 : S.label) ?? L}" to "${((X = $.nodes[j]) == null ? void 0 : X.label) ?? j}" is only legal when the source is a core:loop node — the engine silently skips it otherwise`,
            nodeId: L
          });
        } else M.has(j) || A(j);
      M.set(L, "done");
    }
    const Y = $.entry ?? Object.keys($.nodes)[0];
    return Y && $.nodes[Y] && A(Y), Z;
  }
  function p($, Z, E) {
    var Y, L;
    const M = [], A = new Set(E.map((X) => X.id));
    for (const X of Object.values($.nodes)) {
      const j = Z.find((T) => T.type === X.type), S = (L = (Y = j == null ? void 0 : j.schema) == null ? void 0 : Y.config) == null ? void 0 : L.properties;
      if (S)
        for (const [T, I] of Object.entries(S)) {
          if (I.format !== "connection") continue;
          const P = X.config[T];
          (!P || !A.has(String(P))) && M.push({
            severity: "error",
            message: `Node "${X.label ?? X.id}" is missing a valid ${I.service ?? "integration"} connection for "${T}"`,
            nodeId: X.id
          });
        }
    }
    return M;
  }
  function O($, Z, E) {
    const M = [], A = Object.values($.nodes), Y = $.edges, L = new Set(Z.map((P) => P.type));
    if (A.length === 0)
      return M.push({
        severity: "error",
        message: "Graph is empty — add at least a Start and End node"
      }), M;
    for (const P of A)
      L.size > 0 && !L.has(P.type) && M.push({
        severity: "error",
        message: `Node "${P.label ?? P.id}" has unknown type "${P.type}"`,
        nodeId: P.id
      });
    const X = $.entry ?? Object.keys($.nodes)[0];
    $.nodes[X] || M.push({ severity: "error", message: "No entry node defined" });
    const j = /* @__PURE__ */ new Set(), S = [X];
    for (; S.length > 0; ) {
      const P = S.shift();
      if (!j.has(P)) {
        j.add(P);
        for (const Q of Y)
          Q.from === P && !j.has(Q.to) && S.push(Q.to);
      }
    }
    for (const P of A)
      j.has(P.id) || M.push({
        severity: "warning",
        message: `Node "${P.label ?? P.id}" is unreachable from the entry node`,
        nodeId: P.id
      });
    for (const P of A) {
      const Q = Y.filter((V) => V.from === P.id);
      if (Q.length === 0) continue;
      const q = Q.some((V) => V.type === "conditional"), ae = Q.some((V) => V.type === "fallback" || V.type === "unconditional");
      q && !ae && M.push({
        severity: "warning",
        message: `Node "${P.label ?? P.id}" has conditional edges but no fallback — some inputs may go unhandled`,
        nodeId: P.id
      });
    }
    const T = /* @__PURE__ */ new Set(["core:end", "core:stop"]);
    for (const P of A) {
      if (T.has(P.type)) continue;
      Y.filter((q) => q.from === P.id).length === 0 && M.push({
        severity: "warning",
        message: `Node "${P.label ?? P.id}" has no outbound edges and is not a terminal node`,
        nodeId: P.id
      });
    }
    const I = $.toolEdges ?? [];
    for (const P of A) {
      if (P.type === "core:tool") {
        const Q = Y.filter((ae) => ae.from === P.id);
        Q.length !== 1 && M.push({
          severity: "error",
          message: `Tool node "${P.label ?? P.id}" must have exactly one outbound flow edge (has ${Q.length})`,
          nodeId: P.id
        }), I.filter((ae) => ae.from === P.id).length === 0 && M.push({
          severity: "error",
          message: `Tool node "${P.label ?? P.id}" must be connected to an agent node via a tool edge`,
          nodeId: P.id
        });
      }
      (P.type === "core:tool-call" || P.type === "core:react") && I.filter((q) => q.to === P.id).length === 0 && M.push({
        severity: "warning",
        message: `Agent node "${P.label ?? P.id}" (${P.type}) has no tools connected — it will only be able to generate text without tool invocations`,
        nodeId: P.id
      });
    }
    return M.push(...d($)), M.push(...p($, Z, E)), M;
  }
  function g($) {
    if (!$) return;
    const Z = t().nodes[$];
    Z && Xn.set(Z);
  }
  ot(() => (t(), n(), s()), () => {
    k(l, O(t(), n(), s()));
  }), ot(() => u(l), () => {
    k(a, u(l).filter(($) => $.severity === "error"));
  }), ot(() => u(l), () => {
    k(h, u(l).filter(($) => $.severity === "warning"));
  }), ot(() => (u(a), u(h), u(f)), () => {
    k(c, u(a).length === 0 && (u(h).length === 0 || u(f)));
  }), nn(), Tt();
  var m = gn(), v = Fe(m);
  {
    var y = ($) => {
      var Z = c_(), E = x(Z), M = w(x(E), 2);
      {
        var A = (P) => {
          var Q = r_(), q = x(Q);
          F(() => G(q, `${u(a), b(() => u(a).length) ?? ""} error${u(a), b(() => u(a).length !== 1 ? "s" : "") ?? ""}`)), R(P, Q);
        };
        te(M, (P) => {
          u(a), b(() => u(a).length > 0) && P(A);
        });
      }
      var Y = w(M, 2);
      {
        var L = (P) => {
          var Q = o_(), q = x(Q);
          F(() => G(q, `${u(h), b(() => u(h).length) ?? ""} warning${u(h), b(() => u(h).length !== 1 ? "s" : "") ?? ""}`)), R(P, Q);
        };
        te(Y, (P) => {
          u(h), b(() => u(h).length > 0) && P(L);
        });
      }
      var X = w(E, 2), j = x(X);
      et(j, 1, () => u(a), Je, (P, Q) => {
        var q = l_(), ae = w(x(q), 2), V = x(ae);
        F(() => G(V, (u(Q), b(() => u(Q).message)))), ne("click", q, () => g(u(Q).nodeId)), ne("keydown", q, (H) => H.key === "Enter" && g(u(Q).nodeId)), R(P, q);
      });
      var S = w(j, 2);
      et(S, 1, () => u(h), Je, (P, Q) => {
        var q = a_(), ae = w(x(q), 2), V = x(ae);
        F(() => G(V, (u(Q), b(() => u(Q).message)))), ne("click", q, () => g(u(Q).nodeId)), ne("keydown", q, (H) => H.key === "Enter" && g(u(Q).nodeId)), R(P, q);
      });
      var T = w(X, 2);
      {
        var I = (P) => {
          var Q = h_(), q = x(Q);
          mp(q, () => u(f), (ae) => k(f, ae)), R(P, Q);
        };
        te(T, (P) => {
          u(a), u(h), b(() => u(a).length === 0 && u(h).length > 0) && P(I);
        });
      }
      R($, Z);
    };
    te(v, ($) => {
      u(l), b(() => u(l).length > 0) && $(y);
    });
  }
  R(i, m), kt(), o();
}
var u_ = /* @__PURE__ */ D('<p class="empty-state svelte-28mxb5">No tools connected.<br/>Connect <code class="svelte-28mxb5">core:tool</code> or <code class="svelte-28mxb5">core:mcp-client</code> nodes via tool edges.</p>'), d_ = /* @__PURE__ */ D('<span class="tool-desc svelte-28mxb5"> </span>'), p_ = /* @__PURE__ */ D('<li class="tool-item svelte-28mxb5"><span class="tool-name svelte-28mxb5"> </span> <span class="tool-source svelte-28mxb5"> </span> <!></li>'), O_ = /* @__PURE__ */ D('<ul class="tool-list svelte-28mxb5"></ul>'), g_ = /* @__PURE__ */ D('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Name</span><code class="svelte-28mxb5"> </code></div>'), m_ = /* @__PURE__ */ D('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Description</span><span class="svelte-28mxb5"> </span></div>'), v_ = /* @__PURE__ */ D('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Connected to</span> <span class="svelte-28mxb5"> </span></div>'), b_ = /* @__PURE__ */ D('<div class="tool-detail svelte-28mxb5"><!> <!> <!></div>'), y_ = /* @__PURE__ */ D('<p class="empty-state svelte-28mxb5">Select an agent node (<code class="svelte-28mxb5">core:tool-call</code>, <code class="svelte-28mxb5">core:react</code>) or a tool node to inspect its tools.</p>'), w_ = /* @__PURE__ */ D('<div class="tool-panel svelte-28mxb5"><div class="panel-header svelte-28mxb5">TOOLS</div> <!></div>');
function x_(i, e) {
  St(e, !1);
  const t = () => vt(Xn, "$selectedNode", s), n = () => vt(pt, "$graph", s), [s, r] = vn(), o = /* @__PURE__ */ K(), l = /* @__PURE__ */ K(), a = /* @__PURE__ */ K(), h = /* @__PURE__ */ K(), c = /* @__PURE__ */ K(), f = /* @__PURE__ */ new Set(["core:tool", "core:mcp-client"]), d = /* @__PURE__ */ new Set(["core:tool-call", "core:react"]);
  ot(() => t(), () => {
    var Z;
    k(o, ((Z = t()) == null ? void 0 : Z.id) ?? null);
  }), ot(() => t(), () => {
    var Z;
    k(l, ((Z = t()) == null ? void 0 : Z.type) ?? null);
  }), ot(() => (u(o), u(l), n()), () => {
    k(a, u(o) && d.has(u(l) ?? "") ? (n().toolEdges ?? []).filter((Z) => Z.to === u(o)).map((Z) => ({ edge: Z, node: n().nodes[Z.from] })).filter((Z) => Z.node !== void 0) : []);
  }), ot(() => (u(o), u(l), t()), () => {
    var Z;
    k(h, u(o) && f.has(u(l) ?? "") ? (Z = t()) == null ? void 0 : Z.config : null);
  }), ot(() => (u(o), u(l), n()), () => {
    k(c, u(o) && f.has(u(l) ?? "") ? (n().toolEdges ?? []).filter((Z) => Z.from === u(o)).map((Z) => n().nodes[Z.to]).filter(Boolean) : []);
  }), nn(), Tt();
  var p = w_(), O = w(x(p), 2);
  {
    var g = (Z) => {
      var E = gn(), M = Fe(E);
      {
        var A = (L) => {
          var X = u_();
          R(L, X);
        }, Y = (L) => {
          var X = O_();
          et(X, 5, () => u(a), Je, (j, S) => {
            let T = () => u(S).node;
            var I = p_(), P = x(I), Q = x(P), q = w(P, 2), ae = x(q), V = w(q, 2);
            {
              var H = (z) => {
                var ee = d_(), he = x(ee);
                F((ce) => G(he, ce), [
                  () => (T(), b(() => String(T().config.description)))
                ]), R(z, ee);
              };
              te(V, (z) => {
                T(), b(() => {
                  var ee;
                  return (ee = T().config) == null ? void 0 : ee.description;
                }) && z(H);
              });
            }
            F(
              (z) => {
                G(Q, z), G(ae, (T(), b(() => T().type === "core:mcp-client" ? "MCP" : "Graph")));
              },
              [
                () => (T(), b(() => {
                  var z;
                  return String(((z = T().config) == null ? void 0 : z.name) ?? T().type);
                }))
              ]
            ), R(j, I);
          }), R(L, X);
        };
        te(M, (L) => {
          u(a), b(() => u(a).length === 0) ? L(A) : L(Y, -1);
        });
      }
      R(Z, E);
    }, m = /* @__PURE__ */ us(() => (u(l), b(() => d.has(u(l) ?? "")))), v = (Z) => {
      var E = b_(), M = x(E);
      {
        var A = (S) => {
          var T = g_(), I = w(x(T)), P = x(I);
          F((Q) => G(P, Q), [
            () => (u(h), b(() => String(u(h).name)))
          ]), R(S, T);
        };
        te(M, (S) => {
          u(h), b(() => u(h).name) && S(A);
        });
      }
      var Y = w(M, 2);
      {
        var L = (S) => {
          var T = m_(), I = w(x(T)), P = x(I);
          F((Q) => G(P, Q), [
            () => (u(h), b(() => String(u(h).description)))
          ]), R(S, T);
        };
        te(Y, (S) => {
          u(h), b(() => u(h).description) && S(L);
        });
      }
      var X = w(Y, 2);
      {
        var j = (S) => {
          var T = v_(), I = w(x(T), 2), P = x(I);
          F((Q) => G(P, Q), [
            () => (u(c), b(() => u(c).map((Q) => (Q == null ? void 0 : Q.label) ?? (Q == null ? void 0 : Q.id)).join(", ")))
          ]), R(S, T);
        };
        te(X, (S) => {
          u(c), b(() => u(c).length > 0) && S(j);
        });
      }
      R(Z, E);
    }, y = /* @__PURE__ */ us(() => (u(l), u(h), b(() => f.has(u(l) ?? "") && u(h)))), $ = (Z) => {
      var E = y_();
      R(Z, E);
    };
    te(O, (Z) => {
      u(m) ? Z(g) : u(y) ? Z(v, 1) : Z($, -1);
    });
  }
  R(i, p), kt(), r();
}
var S_ = /* @__PURE__ */ D('<div class="rationale svelte-1grl4xd"> </div>'), k_ = /* @__PURE__ */ D('<code class="target svelte-1grl4xd"> </code>'), Q_ = /* @__PURE__ */ D('<span class="data-preview svelte-1grl4xd"> </span>'), $_ = /* @__PURE__ */ D('<label class="patch-row svelte-1grl4xd"><input type="checkbox"/> <span class="op-label svelte-1grl4xd"> </span> <!> <!></label>'), __ = /* @__PURE__ */ D('<div class="proposal-card svelte-1grl4xd"><div class="proposal-header svelte-1grl4xd"><span class="complexity-badge svelte-1grl4xd"> </span> <span class="proposal-desc svelte-1grl4xd"> </span></div> <!> <div class="patches-list svelte-1grl4xd"></div> <div class="proposal-actions svelte-1grl4xd"><button class="btn-text svelte-1grl4xd">Accept All</button> <button class="btn-text svelte-1grl4xd">Reject All</button> <span class="spacer svelte-1grl4xd"></span> <button class="btn-secondary svelte-1grl4xd">Dismiss</button> <button class="btn-primary svelte-1grl4xd">Apply</button></div></div>');
function P_(i, e) {
  St(e, !1);
  let t = it(e, "proposal", 8);
  const n = Sc();
  let s = /* @__PURE__ */ K({});
  function r() {
    k(s, Object.fromEntries(t().patches.map((L, X) => [X, !0])));
  }
  function o() {
    k(s, Object.fromEntries(t().patches.map((L, X) => [X, !1])));
  }
  function l() {
    const L = t().patches.filter((X, j) => u(s)[j]);
    n("apply", { ...t(), patches: L });
  }
  function a() {
    n("reject");
  }
  const h = {
    targeted: "#22c55e",
    structural: "#f59e0b",
    replacement: "#ef4444"
  };
  function c(L) {
    return {
      add_node: "+ Add node",
      update_node: "~ Update node",
      delete_node: "− Delete node",
      add_edge: "+ Add edge",
      delete_edge: "− Delete edge",
      add_tool_edge: "+ Add tool edge"
    }[L] ?? L;
  }
  ot(() => Le(t()), () => {
    k(s, Object.fromEntries(t().patches.map((L, X) => [X, !0])));
  }), nn(), Tt();
  var f = __(), d = x(f), p = x(d), O = x(p), g = w(p, 2), m = x(g), v = w(d, 2);
  {
    var y = (L) => {
      var X = S_(), j = x(X);
      F(() => G(j, (Le(t()), b(() => t().rationale)))), R(L, X);
    };
    te(v, (L) => {
      Le(t()), b(() => t().rationale) && L(y);
    });
  }
  var $ = w(v, 2);
  et(
    $,
    5,
    () => (Le(t()), b(() => t().patches)),
    Je,
    (L, X, j) => {
      var S = $_(), T = x(S), I = w(T, 2), P = x(I), Q = w(I, 2);
      {
        var q = (z) => {
          var ee = k_(), he = x(ee);
          F(() => G(he, (u(X), b(() => u(X).target)))), R(z, ee);
        };
        te(Q, (z) => {
          u(X), b(() => u(X).target) && z(q);
        });
      }
      var ae = w(Q, 2);
      {
        var V = (z) => {
          var ee = Q_(), he = x(ee);
          F((ce) => G(he, `${ce ?? ""}…`), [
            () => (u(X), b(() => JSON.stringify(u(X).data).slice(0, 60)))
          ]), R(z, ee);
        }, H = /* @__PURE__ */ us(() => (u(X), b(() => u(X).data && Object.keys(u(X).data).length > 0)));
        te(ae, (z) => {
          u(H) && z(V);
        });
      }
      F((z) => G(P, z), [
        () => (u(X), b(() => c(u(X).op)))
      ]), mp(T, () => u(s)[j], (z) => Sn(s, u(s)[j] = z)), R(L, S);
    }
  );
  var Z = w($, 2), E = x(Z), M = w(E, 2), A = w(M, 4), Y = w(A, 2);
  F(() => {
    Op(p, `color: ${Le(t()), b(() => h[t().complexity]) ?? ""}`), G(O, (Le(t()), b(() => t().complexity))), G(m, (Le(t()), b(() => t().description)));
  }), ne("click", E, r), ne("click", M, o), ne("click", A, a), ne("click", Y, l), R(i, f), kt();
}
var T_ = /* @__PURE__ */ D('<button class="icon-btn svelte-vtqea" title="History">⏱</button>'), Z_ = /* @__PURE__ */ D('<div><span class="msg-content svelte-vtqea"> </span></div>'), C_ = /* @__PURE__ */ D('<div class="history-view svelte-vtqea"><div class="history-header svelte-vtqea"><span class="svelte-vtqea">Conversation History</span> <button class="icon-btn svelte-vtqea">✕</button></div> <div class="messages-list svelte-vtqea"></div></div>'), E_ = /* @__PURE__ */ D('<div class="empty-state svelte-vtqea">Ask Caal to explain, improve, or modify this agent graph.</div>'), A_ = /* @__PURE__ */ D('<button class="node-chip svelte-vtqea"> </button>'), R_ = /* @__PURE__ */ D('<span class="svelte-vtqea"> </span>'), M_ = /* @__PURE__ */ D('<div class="msg-content svelte-vtqea"></div>'), X_ = /* @__PURE__ */ D('<span class="msg-content svelte-vtqea"> </span>'), j_ = /* @__PURE__ */ D("<div><!></div>"), L_ = /* @__PURE__ */ D('<div class="message assistant thinking svelte-vtqea"><span class="dot svelte-vtqea"></span><span class="dot svelte-vtqea"></span><span class="dot svelte-vtqea"></span></div>'), I_ = /* @__PURE__ */ D('<button class="quick-btn svelte-vtqea"> </button>'), D_ = /* @__PURE__ */ D('<div class="messages-list svelte-vtqea"><!> <!> <!></div> <!> <div class="quick-actions svelte-vtqea"></div> <div class="input-area svelte-vtqea"><textarea class="caal-input svelte-vtqea" placeholder="Ask Caal… (Enter to send, Shift+Enter for newline)"></textarea> <button class="send-btn svelte-vtqea">➤</button></div>', 1), z_ = /* @__PURE__ */ D('<div><div class="caal-header svelte-vtqea"><span class="caal-title svelte-vtqea"><span class="caal-dot svelte-vtqea"></span> Caal AI</span> <div class="header-actions svelte-vtqea"><!> <button class="icon-btn svelte-vtqea"> </button></div></div> <!></div>');
function N_(i, e) {
  St(e, !1);
  const t = () => vt(pt, "$graph", s), n = () => vt(Xn, "$selectedNode", s), [s, r] = vn();
  it(e, "agentId", 8);
  let o = /* @__PURE__ */ K([]), l = /* @__PURE__ */ K(""), a = /* @__PURE__ */ K(!1), h = /* @__PURE__ */ K(null), c = /* @__PURE__ */ K(null), f = /* @__PURE__ */ K(!0), d = /* @__PURE__ */ K(!1), p = /* @__PURE__ */ K([]), O = /* @__PURE__ */ K();
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
  async function m(z, ee) {
    if (!z.trim() || u(a)) return;
    const he = { role: "user", content: z, timestamp: Date.now() };
    k(o, [...u(o), he]), k(l, ""), k(a, !0), M();
    try {
      const ce = {
        ...t(),
        authoringMode: t().authoringMode ?? "studio"
      }, ue = {
        message: z,
        graphState: ce,
        selectedNodeIds: n() ? [n().id] : [],
        sessionId: u(c) ?? void 0,
        intent: ee ?? v(z)
      }, le = await fetch("/api/v1/caal/invoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ue)
      });
      if (!le.ok) throw new Error(`Caal invoke failed: ${le.status}`);
      const oe = await le.json();
      oe.sessionId && k(c, oe.sessionId);
      const fe = oe.output ?? {}, ve = {
        role: "assistant",
        content: fe.content ?? "",
        nodeReferences: fe.nodeReferences ?? [],
        proposal: fe.proposal,
        canvasHighlight: fe.canvasHighlight,
        canvasFocus: fe.canvasFocus,
        timestamp: Date.now()
      };
      k(o, [...u(o), ve]), fe.proposal && k(h, fe.proposal), fe.canvasHighlight && y(fe.canvasHighlight), fe.canvasFocus && $(fe.canvasFocus);
    } catch (ce) {
      const ue = {
        role: "assistant",
        content: `Error: ${ce.message}`,
        timestamp: Date.now()
      };
      k(o, [...u(o), ue]);
    } finally {
      k(a, !1), M();
    }
  }
  function v(z) {
    const ee = z.toLowerCase();
    return /\b(add|create|remove|delete|update|change|modify|rename|move|connect|disconnect)\b/.test(ee) ? "modify" : /\b(suggest|improve|optimize|better|recommend|enhance)\b/.test(ee) ? "suggest" : "question";
  }
  function y(z) {
    window.dispatchEvent(new CustomEvent("caal:canvas-highlight", { detail: z }));
  }
  function $(z) {
    window.dispatchEvent(new CustomEvent("caal:canvas-focus", { detail: z }));
  }
  function Z(z) {
    window.dispatchEvent(new CustomEvent("caal:canvas-focus", { detail: { nodeId: z, zoom: 1.5 } })), window.dispatchEvent(new CustomEvent("caal:canvas-highlight", {
      detail: { nodeIds: [z], color: "#F59E0B", durationMs: 2e3 }
    }));
  }
  function E(z) {
    const ee = [], he = /\[\[([^\]]+)\]\]/g;
    let ce = 0, ue;
    for (; (ue = he.exec(z)) !== null; )
      ue.index > ce && ee.push({ type: "text", value: z.slice(ce, ue.index) }), ee.push({ type: "chip", value: ue[1] }), ce = ue.index + ue[0].length;
    return ce < z.length && ee.push({ type: "text", value: z.slice(ce) }), ee;
  }
  function M() {
    requestAnimationFrame(() => {
      u(O) && Sn(O, u(O).scrollTop = u(O).scrollHeight);
    });
  }
  function A(z) {
    z.key === "Enter" && !z.shiftKey && (z.preventDefault(), m(u(l)));
  }
  async function Y() {
    var z;
    if (u(c))
      try {
        const ee = await fetch(`/api/v1/caal/sessions/${encodeURIComponent(u(c))}`);
        if (ee.ok) {
          const he = await ee.json();
          k(p, ((z = he.contextEntries) == null ? void 0 : z.messages) ?? []), k(d, !0);
        }
      } catch {
      }
  }
  function L(z) {
    const ee = z.detail;
    window.dispatchEvent(new CustomEvent("caal:apply-proposal", { detail: ee })), k(h, null), k(o, [
      ...u(o),
      {
        role: "assistant",
        content: `Proposal "${ee.description}" accepted and applied to graph.`,
        timestamp: Date.now()
      }
    ]);
  }
  function X() {
    k(h, null);
  }
  Tt();
  var j = z_();
  let S;
  var T = x(j), I = w(x(T), 2), P = x(I);
  {
    var Q = (z) => {
      var ee = T_();
      ne("click", ee, Y), R(z, ee);
    };
    te(P, (z) => {
      u(c) && z(Q);
    });
  }
  var q = w(P, 2), ae = x(q), V = w(T, 2);
  {
    var H = (z) => {
      var ee = gn(), he = Fe(ee);
      {
        var ce = (le) => {
          var oe = C_(), fe = x(oe), ve = w(x(fe), 2), Te = w(fe, 2);
          et(Te, 5, () => u(p), Je, (ye, Se) => {
            var Ee = Z_(), qe = x(Ee), rt = x(qe);
            F(() => {
              si(Ee, 1, `message ${u(Se), b(() => u(Se).role) ?? ""}`, "svelte-vtqea"), G(rt, (u(Se), b(() => u(Se).content)));
            }), R(ye, Ee);
          }), ne("click", ve, () => k(d, !1)), R(le, oe);
        }, ue = (le) => {
          var oe = D_(), fe = Fe(oe), ve = x(fe);
          {
            var Te = (C) => {
              var U = E_();
              R(C, U);
            };
            te(ve, (C) => {
              u(o), b(() => u(o).length === 0) && C(Te);
            });
          }
          var ye = w(ve, 2);
          et(ye, 1, () => u(o), Je, (C, U) => {
            var se = j_(), be = x(se);
            {
              var Ke = (Ve) => {
                var J = M_();
                et(
                  J,
                  5,
                  () => (u(U), b(() => E(u(U).content))),
                  Je,
                  (de, pe) => {
                    var Re = gn(), tt = Fe(Re);
                    {
                      var Qe = (Be) => {
                        var De = A_(), ze = x(De);
                        F(() => G(ze, (u(pe), b(() => u(pe).value)))), ne("click", De, () => Z(u(pe).value)), R(Be, De);
                      }, je = (Be) => {
                        var De = R_(), ze = x(De);
                        F(() => G(ze, (u(pe), b(() => u(pe).value)))), R(Be, De);
                      };
                      te(tt, (Be) => {
                        u(pe), b(() => u(pe).type === "chip") ? Be(Qe) : Be(je, -1);
                      });
                    }
                    R(de, Re);
                  }
                ), R(Ve, J);
              }, Pe = (Ve) => {
                var J = X_(), de = x(J);
                F(() => G(de, (u(U), b(() => u(U).content)))), R(Ve, J);
              };
              te(be, (Ve) => {
                u(U), b(() => u(U).role === "assistant") ? Ve(Ke) : Ve(Pe, -1);
              });
            }
            F(() => si(se, 1, `message ${u(U), b(() => u(U).role) ?? ""}`, "svelte-vtqea")), R(C, se);
          });
          var Se = w(ye, 2);
          {
            var Ee = (C) => {
              var U = L_();
              R(C, U);
            };
            te(Se, (C) => {
              u(a) && C(Ee);
            });
          }
          $c(fe, (C) => k(O, C), () => u(O));
          var qe = w(fe, 2);
          {
            var rt = (C) => {
              P_(C, {
                get proposal() {
                  return u(h);
                },
                $$events: { apply: L, reject: X }
              });
            };
            te(qe, (C) => {
              u(h) && C(rt);
            });
          }
          var bt = w(qe, 2);
          et(bt, 5, () => g, Je, (C, U) => {
            var se = I_(), be = x(se);
            F(() => {
              se.disabled = u(a), G(be, (u(U), b(() => u(U).label)));
            }), ne("click", se, () => m(u(U).prompt, u(U).intent)), R(C, se);
          });
          var ut = w(bt, 2), Ze = x(ut);
          Ge(Ze, "rows", 2);
          var N = w(Ze, 2);
          F(
            (C) => {
              Ze.disabled = u(a), N.disabled = C;
            },
            [
              () => (u(a), u(l), b(() => u(a) || !u(l).trim()))
            ]
          ), qt(Ze, () => u(l), (C) => k(l, C)), ne("keydown", Ze, A), ne("click", N, () => m(u(l))), R(le, oe);
        };
        te(he, (le) => {
          u(d) ? le(ce) : le(ue, -1);
        });
      }
      R(z, ee);
    };
    te(V, (z) => {
      u(f) && z(H);
    });
  }
  F(() => {
    S = si(j, 1, "caal-panel svelte-vtqea", null, S, { collapsed: !u(f) }), G(ae, u(f) ? "▼" : "▲");
  }), ne("click", q, () => k(f, !u(f))), R(i, j), kt(), r();
}
var Y_ = /* @__PURE__ */ D('<span class="sync-time svelte-ra0acr"> </span>'), W_ = /* @__PURE__ */ D('<div class="code-banner svelte-ra0acr"><span class="icon svelte-ra0acr">⟨/⟩</span> <div class="text svelte-ra0acr"><span class="label svelte-ra0acr">Code-defined agent</span> <span class="handle svelte-ra0acr"> </span></div> <!> <a class="sync-link svelte-ra0acr" href="/admin/system/sync">Sync log</a></div>');
function q_(i, e) {
  St(e, !1);
  let t = it(e, "handle", 8), n = it(e, "lastSyncAt", 8, null);
  Tt();
  var s = W_(), r = w(x(s), 2), o = w(x(r), 2), l = x(o), a = w(r, 2);
  {
    var h = (c) => {
      var f = Y_(), d = x(f);
      F((p) => G(d, `Synced ${p ?? ""}`), [
        () => (Le(n()), b(() => new Date(n()).toLocaleTimeString()))
      ]), R(c, f);
    };
    te(a, (c) => {
      n() && c(h);
    });
  }
  F(() => G(l, t())), R(i, s), kt();
}
var V_ = /* @__PURE__ */ D('<div class="loading svelte-1pzk804">Loading…</div>'), B_ = /* @__PURE__ */ D('<div class="error svelte-1pzk804"> </div>'), G_ = /* @__PURE__ */ D('<div class="empty svelte-1pzk804">No context entries yet.</div>'), U_ = /* @__PURE__ */ D('<span class="count svelte-1pzk804"> </span>'), F_ = /* @__PURE__ */ D('<div class="entry svelte-1pzk804"><div class="entry-header svelte-1pzk804"><code class="entry-key svelte-1pzk804"> </code> <span class="acc-type svelte-1pzk804"> </span> <!> <span class="tokens svelte-1pzk804"> </span></div> <pre class="entry-value svelte-1pzk804"> </pre></div>'), H_ = /* @__PURE__ */ D('<div class="entries svelte-1pzk804"></div>'), K_ = /* @__PURE__ */ D('<div class="panel-body svelte-1pzk804"><div class="session-id-row svelte-1pzk804"><span class="label svelte-1pzk804">Session</span> <code class="sid svelte-1pzk804"> </code> <button class="refresh-btn svelte-1pzk804">↻</button></div> <!></div>'), J_ = /* @__PURE__ */ D('<div class="session-panel svelte-1pzk804"><button class="panel-header svelte-1pzk804"><span>Session Context</span> <span class="toggle svelte-1pzk804"> </span></button> <!></div>');
function eP(i, e) {
  St(e, !1);
  let t = it(e, "agentId", 8), n = it(e, "sessionId", 8, null), s = /* @__PURE__ */ K(!1), r = /* @__PURE__ */ K(!1), o = /* @__PURE__ */ K([]), l = /* @__PURE__ */ K(null);
  async function a() {
    if (!(!t() || !n())) {
      k(r, !0), k(l, null);
      try {
        const O = await fetch(`/api/v1/agents/${t()}/sessions/${encodeURIComponent(n())}`);
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
  ot(() => (Le(n()), u(s)), () => {
    n() && u(s) && a();
  }), nn(), Tt();
  var f = gn(), d = Fe(f);
  {
    var p = (O) => {
      var g = J_(), m = x(g), v = w(x(m), 2), y = x(v), $ = w(m, 2);
      {
        var Z = (E) => {
          var M = K_(), A = x(M), Y = w(x(A), 2), L = x(Y), X = w(Y, 2), j = w(A, 2);
          {
            var S = (Q) => {
              var q = V_();
              R(Q, q);
            }, T = (Q) => {
              var q = B_(), ae = x(q);
              F(() => G(ae, u(l))), R(Q, q);
            }, I = (Q) => {
              var q = G_();
              R(Q, q);
            }, P = (Q) => {
              var q = H_();
              et(q, 5, () => u(o), Je, (ae, V) => {
                var H = F_(), z = x(H), ee = x(z), he = x(ee), ce = w(ee, 2), ue = x(ce), le = w(ce, 2);
                {
                  var oe = (Se) => {
                    var Ee = U_(), qe = x(Ee);
                    F(() => G(qe, `${u(V), b(() => u(V).count) ?? ""} items`)), R(Se, Ee);
                  };
                  te(le, (Se) => {
                    u(V), b(() => u(V).count !== void 0) && Se(oe);
                  });
                }
                var fe = w(le, 2), ve = x(fe), Te = w(z, 2), ye = x(Te);
                F(
                  (Se, Ee) => {
                    G(he, (u(V), b(() => u(V).key))), G(ue, (u(V), b(() => u(V).accumulationType))), G(ve, `~${Se ?? ""}t`), G(ye, Ee);
                  },
                  [
                    () => (u(V), b(() => h(u(V).value))),
                    () => (u(V), b(() => c(u(V).value)))
                  ]
                ), R(ae, H);
              }), R(Q, q);
            };
            te(j, (Q) => {
              u(r) ? Q(S) : u(l) ? Q(T, 1) : (u(o), b(() => u(o).length === 0) ? Q(I, 2) : Q(P, -1));
            });
          }
          F(() => {
            G(L, n()), X.disabled = u(r);
          }), ne("click", X, a), R(E, M);
        };
        te($, (E) => {
          u(s) && E(Z);
        });
      }
      F(() => G(y, u(s) ? "▼" : "▶")), ne("click", m, () => {
        k(s, !u(s));
      }), R(O, g);
    };
    te(d, (O) => {
      n() && O(p);
    });
  }
  R(i, f), kt();
}
var tP = /* @__PURE__ */ D('<div class="loading svelte-ojvpsl">Loading…</div>'), iP = /* @__PURE__ */ D('<div class="error svelte-ojvpsl"> </div>'), nP = /* @__PURE__ */ D('<div class="empty svelte-ojvpsl">No prompts defined.</div>'), sP = /* @__PURE__ */ D('<span class="active-label svelte-ojvpsl">active</span>'), rP = /* @__PURE__ */ D('<button class="promote-btn svelte-ojvpsl">Promote</button>'), oP = /* @__PURE__ */ D('<button class="diff-btn svelte-ojvpsl">Diff</button>'), lP = /* @__PURE__ */ D('<div><span class="vnum svelte-ojvpsl"> </span> <!> <!> <span class="version-date svelte-ojvpsl"> </span></div> <pre class="version-preview svelte-ojvpsl"> </pre>', 1), aP = /* @__PURE__ */ D('<div class="versions-list svelte-ojvpsl"></div>'), hP = /* @__PURE__ */ D('<div class="prompt-item svelte-ojvpsl"><button class="prompt-name svelte-ojvpsl"><span></span> <span> </span> <span class="version-count svelte-ojvpsl"> </span> <span class="chevron svelte-ojvpsl"> </span></button> <!></div>'), cP = /* @__PURE__ */ D('<div class="prompts-list svelte-ojvpsl"></div>'), fP = /* @__PURE__ */ D('<div class="panel-body svelte-ojvpsl"><!> <button class="new-btn svelte-ojvpsl">+ New Version</button></div>'), uP = /* @__PURE__ */ D('<div class="modal-overlay svelte-ojvpsl"><div class="modal svelte-ojvpsl"><h3 class="svelte-ojvpsl">New Prompt Version</h3> <label class="svelte-ojvpsl">Prompt Name <input placeholder="e.g. system-prompt" class="svelte-ojvpsl"/></label> <label class="svelte-ojvpsl">Content <textarea placeholder="Prompt content…" class="svelte-ojvpsl"></textarea></label> <div class="modal-actions svelte-ojvpsl"><button class="btn-secondary svelte-ojvpsl">Cancel</button> <button class="btn-primary svelte-ojvpsl">Create</button></div></div></div>'), dP = /* @__PURE__ */ D('<div class="modal-overlay svelte-ojvpsl"><div class="modal diff-modal svelte-ojvpsl"><h3 class="svelte-ojvpsl"> </h3> <div class="diff-grid svelte-ojvpsl"><div class="diff-col svelte-ojvpsl"><div class="diff-label svelte-ojvpsl"> </div> <pre class="svelte-ojvpsl"> </pre></div> <div class="diff-col svelte-ojvpsl"><div class="diff-label svelte-ojvpsl"> </div> <pre class="svelte-ojvpsl"> </pre></div></div> <div class="modal-actions svelte-ojvpsl"><button class="btn-secondary svelte-ojvpsl">Close</button> <button class="btn-primary svelte-ojvpsl"> </button></div></div></div>'), pP = /* @__PURE__ */ D('<div class="prompt-panel svelte-ojvpsl"><button class="panel-header svelte-ojvpsl"><span>Prompt Versions</span> <span class="toggle svelte-ojvpsl"> </span></button> <!></div> <!> <!>', 1);
function OP(i, e) {
  St(e, !1), it(e, "agentId", 8);
  let t = /* @__PURE__ */ K(!1), n = /* @__PURE__ */ K(!1), s = /* @__PURE__ */ K([]), r = /* @__PURE__ */ K(/* @__PURE__ */ new Set()), o = /* @__PURE__ */ K(""), l = /* @__PURE__ */ K(""), a = /* @__PURE__ */ K(!1), h = /* @__PURE__ */ K(null), c = /* @__PURE__ */ K(null);
  async function f() {
    k(n, !0), k(c, null);
    try {
      const S = await fetch("/api/v1/prompts");
      if (!S.ok) throw new Error(`${S.status}`);
      const T = await S.json();
      k(s, T.map((I) => ({ name: I.name, activeVersion: I, versions: [] })));
    } catch (S) {
      k(c, S.message);
    } finally {
      k(n, !1);
    }
  }
  async function d(S) {
    const T = await fetch(`/api/v1/prompts/${encodeURIComponent(S)}/versions`);
    if (!T.ok) throw new Error(`${T.status}`);
    const I = await T.json();
    k(s, u(s).map((P) => P.name === S ? { ...P, versions: I } : P));
  }
  async function p(S, T) {
    try {
      const I = await fetch(`/api/v1/prompts/${encodeURIComponent(S)}/versions/${T}/promote`, { method: "POST" });
      if (!I.ok) throw new Error(`${I.status}`);
      await f(), u(r).has(S) && await d(S);
    } catch (I) {
      k(c, I.message);
    }
  }
  async function O() {
    if (!(!u(o) || !u(l)))
      try {
        const S = await fetch("/api/v1/prompts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: u(o),
            content: u(l)
          })
        });
        if (!S.ok) throw new Error(`${S.status}`);
        const T = u(o);
        k(a, !1), k(o, ""), k(l, ""), await f(), u(r).has(T) && await d(T);
      } catch (S) {
        k(c, S.message);
      }
  }
  async function g(S) {
    if (u(r).has(S)) {
      u(r).delete(S), k(r, new Set(u(r)));
      return;
    }
    u(r).add(S), k(r, new Set(u(r)));
    try {
      await d(S);
    } catch (T) {
      k(c, T.message);
    }
  }
  function m(S, T, I) {
    k(h, { name: S, v1: T, v2: I });
  }
  ot(() => (u(t), u(s)), () => {
    u(t) && u(s).length === 0 && f();
  }), nn(), Tt();
  var v = pP(), y = Fe(v), $ = x(y), Z = w(x($), 2), E = x(Z), M = w($, 2);
  {
    var A = (S) => {
      var T = fP(), I = x(T);
      {
        var P = (H) => {
          var z = tP();
          R(H, z);
        }, Q = (H) => {
          var z = iP(), ee = x(z);
          F(() => G(ee, u(c))), R(H, z);
        }, q = (H) => {
          var z = nP();
          R(H, z);
        }, ae = (H) => {
          var z = cP();
          et(z, 5, () => u(s), Je, (ee, he) => {
            var ce = hP(), ue = x(ce), le = x(ue);
            let oe;
            var fe = w(le, 2), ve = x(fe), Te = w(fe, 2), ye = x(Te), Se = w(Te, 2), Ee = x(Se), qe = w(ue, 2);
            {
              var rt = (ut) => {
                var Ze = aP();
                et(Ze, 5, () => (u(he), b(() => u(he).versions ?? [])), Je, (N, C) => {
                  var U = lP(), se = Fe(U);
                  let be;
                  var Ke = x(se), Pe = x(Ke), Ve = w(Ke, 2);
                  {
                    var J = (De) => {
                      var ze = sP();
                      R(De, ze);
                    }, de = (De) => {
                      var ze = rP();
                      ne("click", ze, () => p(u(he).name, u(C).id)), R(De, ze);
                    };
                    te(Ve, (De) => {
                      u(C), b(() => u(C).isActive) ? De(J) : De(de, -1);
                    });
                  }
                  var pe = w(Ve, 2);
                  {
                    var Re = (De) => {
                      var ze = oP();
                      ne("click", ze, () => m(u(he).name, u(he).activeVersion, u(C))), R(De, ze);
                    };
                    te(pe, (De) => {
                      u(he), u(C), b(() => u(he).activeVersion && !u(C).isActive) && De(Re);
                    });
                  }
                  var tt = w(pe, 2), Qe = x(tt), je = w(se, 2), Be = x(je);
                  F(
                    (De, ze) => {
                      be = si(se, 1, "version-row svelte-ojvpsl", null, be, { active: u(C).isActive }), G(Pe, `v${u(C), b(() => u(C).versionNumber) ?? ""}`), G(Qe, De), G(Be, `${ze ?? ""}${u(C), b(() => u(C).content.length > 120 ? "…" : "") ?? ""}`);
                    },
                    [
                      () => (u(C), b(() => new Date(u(C).createdAt).toLocaleDateString())),
                      () => (u(C), b(() => u(C).content.slice(0, 120)))
                    ]
                  ), R(N, U);
                }), R(ut, Ze);
              }, bt = /* @__PURE__ */ us(() => (u(r), u(he), b(() => u(r).has(u(he).name))));
              te(qe, (ut) => {
                u(bt) && ut(rt);
              });
            }
            F(
              (ut) => {
                oe = si(le, 1, "active-dot svelte-ojvpsl", null, oe, { active: u(he).activeVersion !== null }), G(ve, (u(he), b(() => u(he).name))), G(ye, `v${u(he), b(() => {
                  var Ze;
                  return ((Ze = u(he).activeVersion) == null ? void 0 : Ze.versionNumber) ?? "—";
                }) ?? ""}`), G(Ee, ut);
              },
              [
                () => (u(r), u(he), b(() => u(r).has(u(he).name) ? "▼" : "▶"))
              ]
            ), ne("click", ue, () => g(u(he).name)), R(ee, ce);
          }), R(H, z);
        };
        te(I, (H) => {
          u(n) ? H(P) : u(c) ? H(Q, 1) : (u(s), b(() => u(s).length === 0) ? H(q, 2) : H(ae, -1));
        });
      }
      var V = w(I, 2);
      ne("click", V, () => k(a, !0)), R(S, T);
    };
    te(M, (S) => {
      u(t) && S(A);
    });
  }
  var Y = w(y, 2);
  {
    var L = (S) => {
      var T = uP(), I = x(T), P = w(x(I), 2), Q = w(x(P)), q = w(P, 2), ae = w(x(q));
      Ge(ae, "rows", 6);
      var V = w(q, 2), H = x(V), z = w(H, 2);
      qt(Q, () => u(o), (ee) => k(o, ee)), qt(ae, () => u(l), (ee) => k(l, ee)), ne("click", H, () => k(a, !1)), ne("click", z, O), ne("click", T, bh(() => k(a, !1))), R(S, T);
    };
    te(Y, (S) => {
      u(a) && S(L);
    });
  }
  var X = w(Y, 2);
  {
    var j = (S) => {
      var T = dP(), I = x(T), P = x(I), Q = x(P), q = w(P, 2), ae = x(q), V = x(ae), H = x(V), z = w(V, 2), ee = x(z), he = w(ae, 2), ce = x(he), ue = x(ce), le = w(ce, 2), oe = x(le), fe = w(q, 2), ve = x(fe), Te = w(ve, 2), ye = x(Te);
      F(() => {
        G(Q, `Diff: ${u(h), b(() => u(h).name) ?? ""}`), G(H, `Active (v${u(h), b(() => u(h).v1.versionNumber) ?? ""})`), G(ee, (u(h), b(() => u(h).v1.content))), G(ue, `v${u(h), b(() => u(h).v2.versionNumber) ?? ""}`), G(oe, (u(h), b(() => u(h).v2.content))), G(ye, `Promote v${u(h), b(() => u(h).v2.versionNumber) ?? ""}`);
      }), ne("click", ve, () => k(h, null)), ne("click", Te, () => {
        p(u(h).name, u(h).v2.id), k(h, null);
      }), ne("click", T, bh(() => k(h, null))), R(S, T);
    };
    te(X, (S) => {
      u(h) && S(j);
    });
  }
  F(() => G(E, u(t) ? "▼" : "▶")), ne("click", $, () => {
    k(t, !u(t));
  }), R(i, v), kt();
}
var gP = /* @__PURE__ */ D('<span class="badge svelte-1bw2oss"> </span>'), mP = /* @__PURE__ */ D("<div> <!></div>"), vP = /* @__PURE__ */ D('<div class="loading svelte-1bw2oss">Loading…</div>'), bP = /* @__PURE__ */ D('<div class="error svelte-1bw2oss"> </div>'), yP = /* @__PURE__ */ D('<div class="empty svelte-1bw2oss">No test cases yet.</div>'), wP = /* @__PURE__ */ D('<span class="running-indicator svelte-1bw2oss">⟳</span>'), xP = /* @__PURE__ */ D('<div class="case-row svelte-1bw2oss"><span></span> <span class="case-name svelte-1bw2oss"> </span> <span class="assertion-count svelte-1bw2oss"> </span> <!> <button class="delete-btn svelte-1bw2oss">✕</button></div>'), SP = /* @__PURE__ */ D('<div class="cases-list svelte-1bw2oss"></div>'), kP = /* @__PURE__ */ D('<div class="panel-body svelte-1bw2oss"><!> <!> <div class="panel-actions svelte-1bw2oss"><button class="new-btn svelte-1bw2oss">+ New Test</button> <button class="run-btn svelte-1bw2oss"> </button></div></div>'), QP = /* @__PURE__ */ D('<input placeholder="Expected value (JSON or string)" class="svelte-1bw2oss"/>'), $P = /* @__PURE__ */ D('<label class="inline svelte-1bw2oss">Threshold <input type="number" min="0" max="1" step="0.05" style="width: 70px;" class="svelte-1bw2oss"/></label>'), _P = /* @__PURE__ */ D('<div class="modal-overlay svelte-1bw2oss"><div class="modal svelte-1bw2oss"><h3 class="svelte-1bw2oss">New Test Case</h3> <label class="svelte-1bw2oss">Name <input placeholder="Test case name" class="svelte-1bw2oss"/></label> <label class="svelte-1bw2oss">Input JSON <textarea class="mono svelte-1bw2oss"></textarea></label> <div class="assertion-builder svelte-1bw2oss"><div class="assertion-header svelte-1bw2oss">Assertion</div> <div class="assertion-row svelte-1bw2oss"><select class="svelte-1bw2oss"><option>Exact Match</option><option>Schema</option><option>Score Threshold</option></select> <input placeholder="Output key, e.g. output.text" class="svelte-1bw2oss"/></div> <!></div> <div class="modal-actions svelte-1bw2oss"><button class="btn-secondary svelte-1bw2oss">Cancel</button> <button class="btn-primary svelte-1bw2oss">Create</button></div></div></div>'), PP = /* @__PURE__ */ D('<div class="test-panel svelte-1bw2oss"><button class="panel-header svelte-1bw2oss"><span>Test Cases</span> <!> <span class="toggle svelte-1bw2oss"> </span></button> <!></div> <!>', 1);
function TP(i, e) {
  St(e, !1);
  let t = it(e, "agentId", 8), n = /* @__PURE__ */ K(!1), s = /* @__PURE__ */ K(!1), r = /* @__PURE__ */ K(!1), o = /* @__PURE__ */ K([]), l = /* @__PURE__ */ K(null), a = /* @__PURE__ */ K(!1), h = /* @__PURE__ */ K(null), c = /* @__PURE__ */ K({
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
        const j = await fetch(`/api/v1/agents/${t()}/test-cases`);
        if (!j.ok) throw new Error(`${j.status}`);
        const S = await j.json();
        k(o, S.testCases ?? []);
      } catch (j) {
        k(h, j.message);
      } finally {
        k(s, !1);
      }
    }
  }
  async function d() {
    k(r, !0), k(l, null), k(h, null);
    try {
      const j = await fetch(`/api/v1/agents/${t()}/test-cases/run`, { method: "POST" });
      if (!j.ok) throw new Error(`${j.status}`);
      k(l, await j.json()), await f();
    } catch (j) {
      k(h, j.message);
    } finally {
      k(r, !1);
    }
  }
  async function p() {
    try {
      const j = {
        type: u(c).assertionType,
        key: u(c).assertionKey
      };
      if (u(c).assertionType === "exact_match")
        try {
          j.expected = JSON.parse(u(c).assertionExpected);
        } catch {
          j.expected = u(c).assertionExpected;
        }
      else u(c).assertionType === "evaluate_score" && (j.threshold = u(c).assertionThreshold);
      const S = await fetch(`/api/v1/agents/${t()}/test-cases`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: u(c).name,
          inputJson: u(c).inputJson,
          assertionsJson: JSON.stringify([j])
        })
      });
      if (!S.ok) throw new Error(`${S.status}`);
      k(a, !1), k(c, {
        name: "",
        inputJson: `{
  
}`,
        assertionType: "exact_match",
        assertionKey: "",
        assertionExpected: "",
        assertionThreshold: 0.8
      }), await f();
    } catch (j) {
      k(h, j.message);
    }
  }
  async function O(j) {
    try {
      await fetch(`/api/v1/agents/${t()}/test-cases/${j}`, { method: "DELETE" }), await f();
    } catch {
    }
  }
  function g(j) {
    return `${j.passed}/${j.total}`;
  }
  ot(() => (u(n), u(o), u(s)), () => {
    u(n) && u(o).length === 0 && !u(s) && f();
  }), nn(), Tt();
  var m = PP(), v = Fe(m), y = x(v), $ = w(x(y), 2);
  {
    var Z = (j) => {
      var S = gP(), T = x(S);
      F(() => G(T, (u(o), b(() => u(o).length)))), R(j, S);
    };
    te($, (j) => {
      u(o), b(() => u(o).length > 0) && j(Z);
    });
  }
  var E = w($, 2), M = x(E), A = w(y, 2);
  {
    var Y = (j) => {
      var S = kP(), T = x(S);
      {
        var I = (ce) => {
          var ue = mP();
          let le;
          var oe = x(ue), fe = w(oe);
          {
            var ve = (Te) => {
              var ye = zv();
              F(() => G(ye, `— ${u(l), b(() => u(l).failed) ?? ""} failed`)), R(Te, ye);
            };
            te(fe, (Te) => {
              u(l), b(() => u(l).failed > 0) && Te(ve);
            });
          }
          F(
            (Te) => {
              le = si(ue, 1, "suite-summary svelte-1bw2oss", null, le, {
                passed: u(l).failed === 0,
                failed: u(l).failed > 0
              }), G(oe, `Suite: ${Te ?? ""} passed `);
            },
            [
              () => (u(l), b(() => g(u(l))))
            ]
          ), R(ce, ue);
        };
        te(T, (ce) => {
          u(l) && ce(I);
        });
      }
      var P = w(T, 2);
      {
        var Q = (ce) => {
          var ue = vP();
          R(ce, ue);
        }, q = (ce) => {
          var ue = bP(), le = x(ue);
          F(() => G(le, u(h))), R(ce, ue);
        }, ae = (ce) => {
          var ue = yP();
          R(ce, ue);
        }, V = (ce) => {
          var ue = SP();
          et(ue, 5, () => u(o), Je, (le, oe) => {
            const fe = /* @__PURE__ */ yt(() => (u(l), u(oe), b(() => {
              var N, C;
              return (C = (N = u(l)) == null ? void 0 : N.results) == null ? void 0 : C.find((U) => U.id === u(oe).id);
            })));
            var ve = xP(), Te = x(ve);
            let ye;
            var Se = w(Te, 2), Ee = x(Se), qe = w(Se, 2), rt = x(qe), bt = w(qe, 2);
            {
              var ut = (N) => {
                var C = wP();
                R(N, C);
              };
              te(bt, (N) => {
                u(r) && N(ut);
              });
            }
            var Ze = w(bt, 2);
            F(() => {
              var N, C, U, se;
              ye = si(Te, 1, "status-dot svelte-1bw2oss", null, ye, {
                pass: ((N = u(fe)) == null ? void 0 : N.passed) === !0 || ((C = u(oe).lastResult) == null ? void 0 : C.passed) === !0,
                fail: ((U = u(fe)) == null ? void 0 : U.passed) === !1 || ((se = u(oe).lastResult) == null ? void 0 : se.passed) === !1
              }), G(Ee, (u(oe), b(() => u(oe).name))), G(rt, `${u(oe), b(() => (u(oe).assertions ?? []).length) ?? ""} assertions`);
            }), ne("click", Ze, () => O(u(oe).id)), R(le, ve);
          }), R(ce, ue);
        };
        te(P, (ce) => {
          u(s) ? ce(Q) : u(h) ? ce(q, 1) : (u(o), b(() => u(o).length === 0) ? ce(ae, 2) : ce(V, -1));
        });
      }
      var H = w(P, 2), z = x(H), ee = w(z, 2), he = x(ee);
      F(() => {
        ee.disabled = (u(r), u(o), b(() => u(r) || u(o).length === 0)), G(he, u(r) ? "Running…" : "Run Suite");
      }), ne("click", z, () => k(a, !0)), ne("click", ee, d), R(j, S);
    };
    te(A, (j) => {
      u(n) && j(Y);
    });
  }
  var L = w(v, 2);
  {
    var X = (j) => {
      var S = _P(), T = x(S), I = w(x(T), 2), P = w(x(I)), Q = w(I, 2), q = w(x(Q));
      Ge(q, "rows", 5);
      var ae = w(Q, 2), V = w(x(ae), 2), H = x(V), z = x(H);
      z.value = z.__value = "exact_match";
      var ee = w(z);
      ee.value = ee.__value = "schema";
      var he = w(ee);
      he.value = he.__value = "evaluate_score";
      var ce = w(H, 2), ue = w(V, 2);
      {
        var le = (ye) => {
          var Se = QP();
          qt(Se, () => u(c).assertionExpected, (Ee) => Sn(c, u(c).assertionExpected = Ee)), R(ye, Se);
        }, oe = (ye) => {
          var Se = $P(), Ee = w(x(Se));
          qt(Ee, () => u(c).assertionThreshold, (qe) => Sn(c, u(c).assertionThreshold = qe)), R(ye, Se);
        };
        te(ue, (ye) => {
          u(c), b(() => u(c).assertionType === "exact_match") ? ye(le) : (u(c), b(() => u(c).assertionType === "evaluate_score") && ye(oe, 1));
        });
      }
      var fe = w(ae, 2), ve = x(fe), Te = w(ve, 2);
      F(() => Te.disabled = (u(c), b(() => !u(c).name))), qt(P, () => u(c).name, (ye) => Sn(c, u(c).name = ye)), qt(q, () => u(c).inputJson, (ye) => Sn(c, u(c).inputJson = ye)), vh(H, () => u(c).assertionType, (ye) => Sn(c, u(c).assertionType = ye)), qt(ce, () => u(c).assertionKey, (ye) => Sn(c, u(c).assertionKey = ye)), ne("click", ve, () => k(a, !1)), ne("click", Te, p), ne("click", S, bh(() => k(a, !1))), R(j, S);
    };
    te(L, (j) => {
      u(a) && j(X);
    });
  }
  F(() => G(M, u(n) ? "▼" : "▶")), ne("click", y, () => {
    k(n, !u(n));
  }), R(i, m), kt();
}
var ZP = /* @__PURE__ */ D('<div class="studio svelte-13r820j"><aside><!></aside> <main class="canvas-area svelte-13r820j"><!> <!></main> <aside class="panel svelte-13r820j"><!> <!> <!> <!> <!> <!> <!> <!></aside></div>');
function CP(i, e) {
  St(e, !1);
  const t = () => vt(Xn, "$selectedNode", n), [n, s] = vn();
  let r = it(e, "agentId", 8), o = /* @__PURE__ */ K(!1), l = /* @__PURE__ */ K(""), a = /* @__PURE__ */ K(null), h = /* @__PURE__ */ K(null);
  ys(async () => {
    if (r()) {
      try {
        const [Q, q, ae] = await Promise.all([
          fetch(`/api/agents/${r()}`),
          fetch(`/api/agents/${r()}/versions`),
          fetch(`/api/agents/${r()}/config`)
        ]);
        let V = null;
        if (Q.ok && (V = await Q.json(), Jo.set(V), k(o, (V == null ? void 0 : V.authoringMode) === "code-defined"), k(l, (V == null ? void 0 : V.handle) ?? ""), u(o) && k(a, (V == null ? void 0 : V.updatedAt) ?? null)), V != null && V.draftGraphJson)
          pt.set(JSON.parse(V.draftGraphJson));
        else if (q.ok) {
          const H = await q.json();
          if (H.length > 0) {
            const z = H[H.length - 1];
            pt.set(JSON.parse(z.graphJson ?? "{}"));
          }
        }
        if (ae.ok) {
          const z = (await ae.json()).triggerConfig ?? {};
          $s.set({
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
  function c(Q) {
    const q = Q.detail;
    window.dispatchEvent(new CustomEvent("canvas:highlight", { detail: q }));
  }
  function f(Q) {
    const q = Q.detail;
    window.dispatchEvent(new CustomEvent("canvas:focus", { detail: q }));
  }
  function d(Q) {
    const q = Q.detail;
    pt.update((ae) => {
      const V = structuredClone(ae);
      for (const H of q.patches)
        if (H.op === "add_node" && H.data) {
          const z = H.data;
          V.nodes[z.id] = z;
        } else if (H.op === "update_node" && H.target && H.data) {
          const z = V.nodes[H.target];
          z && (V.nodes[H.target] = { ...z, ...H.data });
        } else H.op === "delete_node" && H.target ? delete V.nodes[H.target] : H.op === "add_edge" && H.data ? V.edges = [...V.edges ?? [], H.data] : H.op === "add_tool_edge" && H.data && (V.toolEdges = [...V.toolEdges ?? [], H.data]);
      return V;
    });
  }
  Tt();
  var p = ZP(), O = x(p);
  let g;
  var m = x(O);
  iy(m, {
    get readonly() {
      return u(o);
    }
  });
  var v = w(O, 2), y = x(v);
  {
    var $ = (Q) => {
      q_(Q, {
        get handle() {
          return u(l);
        },
        get lastSyncAt() {
          return u(a);
        }
      });
    };
    te(y, (Q) => {
      u(o) && Q($);
    });
  }
  var Z = w(y, 2);
  F1(Z, {
    get agentId() {
      return r();
    },
    get readonly() {
      return u(o);
    }
  });
  var E = w(v, 2), M = x(E);
  {
    var A = (Q) => {
      $$(Q, {
        get node() {
          return t();
        },
        get readonly() {
          return u(o);
        }
      });
    }, Y = (Q) => {
      W$(Q, {
        get agentId() {
          return r();
        },
        get readonly() {
          return u(o);
        }
      });
    };
    te(M, (Q) => {
      t() ? Q(A) : Q(Y, -1);
    });
  }
  var L = w(M, 2);
  f_(L, {});
  var X = w(L, 2);
  x_(X, {});
  var j = w(X, 2);
  s_(j, {
    get agentId() {
      return r();
    },
    $$events: { sessionId: (Q) => k(h, Q.detail) }
  });
  var S = w(j, 2);
  eP(S, {
    get agentId() {
      return r();
    },
    get sessionId() {
      return u(h);
    }
  });
  var T = w(S, 2);
  OP(T, {
    get agentId() {
      return r();
    }
  });
  var I = w(T, 2);
  TP(I, {
    get agentId() {
      return r();
    }
  });
  var P = w(I, 2);
  N_(P, {
    get agentId() {
      return r();
    }
  }), F(() => g = si(O, 1, "palette svelte-13r820j", null, g, { readonly: u(o) })), R(i, p), kt(), s();
}
const Ja = document.getElementById("canvas-mount");
if (Ja) {
  const i = Ja.getAttribute("data-agent-id") ?? "";
  Wv(CP, { target: Ja, props: { agentId: i } });
}
